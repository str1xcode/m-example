import * as ACTIONS from '../constants/actions';
import * as API from '../constants/api';
import Analytics from 'react-native-analytics';
import storage from '../utils/storage';
import {Platform} from 'react-native';
import {LoginManager, GraphRequest, GraphRequestManager, AccessToken} from 'react-native-fbsdk';
import {GoogleSignin} from 'react-native-google-signin';

export function register(login, pass, confirmPass) {
  return async (dispatch) => {
    try {
      if (!login || !pass) throw 'empty field';
      if (pass !== confirmPass) throw 'wrong confirm';
      let res = await fetch(API.REGISTER(login, pass));
      let data = await res.json();
      if (data.error) throw data.error;
      if (data.status = 'OK') {
        const { user } = data;
        dispatch({
          type: ACTIONS.ALERT_PUSH,
          payload: {
            type: 'info',
            text: 'account created'
          }
        });
        dispatch(auth(login, pass));
      }
    } catch (err) {
      if (typeof err === 'string') {
        dispatch({
          type: ACTIONS.ALERT_PUSH,
          payload: {
            type: 'error',
            text: err
          }
        })
      }
    }
  }
}

export function auth(login, password, platform) {
  return async (dispatch) => {
    try {
      if (!login || !password) throw 'empty field';
      const res = await fetch(API.LOGIN(login, password));
      const data = await res.json();
      if (data.error) throw data.error;
      if (data.status = 'OK') {
        const { token } = data;
        await storage.setItem('login', login);
        await storage.setItem('token', token);
        dispatch({
          type: ACTIONS.USER_UPDATE,
          payload: {
            login,
            token,
            isLogged: true
          }
        });
        Analytics.identify(login, {email: login, name: login});
      }
    } catch (err) {
      if (typeof err === 'string') {
        dispatch({
          type: ACTIONS.ALERT_PUSH,
          payload: {
            type: 'error',
            text: err
          }
        })
      }
    }
  }
}

// init user data from AsyncStorage
export function init() {
  return async (dispatch) => {
    try {
      const token = await storage.getItem('token');
      const login = await storage.getItem('login');
      const theme = await storage.getItem('theme');
      const isLogged = token ? true : false;
      dispatch({
        type: ACTIONS.USER_UPDATE,
        payload: {
          login,
          token,
          isLogged,
          loading: false,
          theme: theme ? theme : 'DARK',
        }
      });
      if (login) {
        Analytics.identify(login, {email: login, name: login});
      } else {
        Analytics.identify('NOT_REGISTERED', {email: null, name: null});
      }
    } catch(err) {

    }
  }
}

export function logout(cb) {
  return async (dispatch) => {
    try {
      await storage.setItem('login', null);
      await storage.setItem('token', null);
      dispatch({
        type: ACTIONS.USER_UPDATE,
        payload: {
          login: null,
          token: null,
          isLogged: false,
          loading: false
        }
      });
      Analytics.identify('NOT_REGISTERED', {email: null, name: null});
      if (typeof cb === 'function') cb();
    } catch (err) {

    }
  }
}

export function fbAuth() {
  return async (dispatch) => {
    try {
      const loginResponse = await LoginManager.logInWithReadPermissions(['public_profile']);
      if (!loginResponse.isCancelled) {
        const infoReq = new GraphRequest('/me',
        {parameters: {fields: {string: 'email,name,first_name,middle_name,last_name'}}},
        async (err, res) => {
          if (err) {
            throw new Error('Error fetching auth data');
          } else {
            dispatch({
              type: ACTIONS.USER_UPDATE,
              payload: {
                loading: true
              }
            });
            const accessToken = (await AccessToken.getCurrentAccessToken()).accessToken.toString();
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            const serverRes = await fetch(API.LOGIN_FB,
              {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({
                  token: accessToken,
                  email: res.email,
                  platform: Platform.OS,
                })
              }
            );
            const data = await serverRes.json();
            if (data.status === 'OK') {
              dispatch({
                type: ACTIONS.USER_UPDATE,
                payload: {
                  login: res.email,
                  token: data.token,
                  isLogged: true,
                  loading: false
                }
              });
              Analytics.identify(res.email, {email: res.email, name: res.email});
              await storage.setItem('login', res.email);
              await storage.setItem('token', data.token);
            } else {
              throw new Error(data.msg);
            }
          }
        });
        new GraphRequestManager().addRequest(infoReq).start();
      }
    } catch (err) {
      dispatch({
        type: ACTIONS.USER_UPDATE,
        payload: {
          loading: false
        }
      });
      dispatch({
        type: ACTIONS.ALERT_PUSH,
        payload: {
          type: 'error',
          text: err
        }
      });
    }
  }
}

export function setupGoogleSignin () {
  return async (dispatch) => {
    try {
      await GoogleSignin.hasPlayServices({ autoResolve: true });
      let config = {
        // webClientId: '851250328123-ncqmf9r7hb2da86l4fp5bhgiips7vb3i.apps.googleusercontent.com',
        iosClientId: '851250328123-qrbbbnm702a16e33ipist19qom6sf75t.apps.googleusercontent.com',
        offlineAccess: false,
      };
      // if (Platform.OS === 'ios') {
      //   config = Object.assign(config, {
      //     iosClientId: '851250328123-qrbbbnm702a16e33ipist19qom6sf75t.apps.googleusercontent.com',
      //   });
      // }
      await GoogleSignin.configure(config);
      const user = await GoogleSignin.currentUserAsync();
      // this.setState({user});
    }
    catch(err) {
      dispatch({
        type: ACTIONS.ALERT_PUSH,
        payload: {
          type: 'error',
          text: err.message
        }
      });
    }
  }
}

export function googleAuth() {
  return async (dispatch) => {
    try {
      dispatch({
        type: ACTIONS.USER_UPDATE,
        payload: {
          loading: true
        }
      });
      await GoogleSignin.signOut();
      const user = await GoogleSignin.signIn();
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      const res = await fetch(API.LOGIN_GOOGLE, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
          token: user.accessToken,
          email: user.email,
          platform: Platform.OS,
        })
      });
      const data = await res.json();
      if (data.status === 'OK') {
        dispatch({
          type: ACTIONS.USER_UPDATE,
          payload: {
            login: user.email,
            token: data.token,
            isLogged: true,
            loading: false
          }
        });
        Analytics.identify(user.email, {email: user.email, name: user.email});
        await storage.setItem('login', user.email);
        await storage.setItem('token', data.token);
      } else {
        throw new Error(data.msg);
      }
    } catch (err) {
      dispatch({
        type: ACTIONS.USER_UPDATE,
        payload: {
          loading: false
        }
      });
      dispatch({
        type: ACTIONS.ALERT_PUSH,
        payload: {
          type: 'error',
          text: err.message
        }
      });
    }
  }
}

export function changeTheme(name) {
  return async (dispatch) => {
    await storage.setItem('theme', name);
    dispatch({
      type: ACTIONS.USER_UPDATE,
      payload: {theme: name}
    });
  }
}
