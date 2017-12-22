import React from 'react';
import { Platform, StyleSheet, Text, View, Keyboard, Linking, StatusBar } from 'react-native';
import { bindActionCreators } from 'redux';
import { Provider, connect } from 'react-redux';
import store from './src/store'
import { NavigatorWithState } from './Navigator';
import Alerts from './src/pages/alerts';
import Loading from './src/pages/loading';
import SideMenu from 'react-native-side-menu';
import Menu from './src/components/menu';
import { NavigationActions, addNavigationHelpers } from 'react-navigation';
import * as keyboardActions from './src/actions/keyboard';
import * as userActions from './src/actions/user';
import * as menuActions from './src/actions/menu';
import * as currenciesActions from './src/actions/currencies';
import Analytics from 'react-native-analytics';
import SplashScreen from 'react-native-splash-screen'
// import { getCurrentRoute } from './src/selectors/navigate';
// hide warnings
import * as COLORS from './src/styles/colors';
console.disableYellowBox = true;

const analyticsKey = (Platform.OS === 'ios') ? 'tCCfxyxfqdLbzb4Fk0GK4ShmKeomXbjD' : 'PTr6IhVrfyUOtjZntAsGya0mJ6w0fjfW';
console.log(analyticsKey);
Analytics.setup(analyticsKey, 1);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount () {
    const { userActions, currenciesActions} = this.props;
    userActions.init();
    userActions.setupGoogleSignin();
    currenciesActions.init();
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow.bind(this));
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide.bind(this));
    // BackHandler.addEventListener('hardwareBackPress', this.backAction.bind(this));
  }

  componentDidMount() {
    SplashScreen.hide();
  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
    // BackHandler.removeEventListener('hardwareBackPress');
  }

  componentWillReceiveProps(nextProps) {

  }

  _keyboardDidShow (e) {
    const {menuActions, keyboardActions} = this.props;
    keyboardActions.update({
      isOpen: true,
      height: e.endCoordinates.height,
      width: e.endCoordinates.width,
      screenX: e.endCoordinates.screenX,
      screenY: e.endCoordinates.screenY
    });
    // menuActions.update({
    //   open: false,
    //   disableGestures: true
    // });
  }

  _keyboardDidHide (e) {
    const {menuActions, keyboardActions} = this.props;
    keyboardActions.update({
      isOpen: false,
      height: null,
      width: null,
      screenX: null,
      screenY: null
    });
    // menuActions.update({
    //   open: false,
    //   disableGestures: false
    // });
  }

  // backAction() {
  //   const {nav} = this.props;
  //   if (nav.get('index') > 0) {
  //     console.log(this.navigator.getWrappedInstance().navigator)
  //     const dispatch = this.navigator.getWrappedInstance().navigator.props.navigation.dispatch;
  //     dispatch(NavigationActions.back());
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  onMenuItemSelected (item) {
    const { userActions, menuActions } = this.props;
    const donateUrl = 'https://moneta.fund/#moneta-landing-donate';
    const botUrl = 'https://t.me/MonetaFundBot';
    if (item === 'Logout') {
      userActions.logout(() => {
        this._redirectTo('Login');
      });
    } else if (item === 'Donate') {
      Linking.canOpenURL(donateUrl).then((supported) => {
        if (supported) {
          Linking.openURL(donateUrl);
        } else {
          // console.log('can\'t open url');
        }
      })
    } else if (item === 'Bot') {
      Linking.canOpenURL(botUrl).then((supported) => {
        if (supported) {
          Linking.openURL(botUrl);
        } else {
          // console.log('can\'t open url');
        }
      })
    }
    menuActions.update({
      open: false
    });
  }

  _redirectTo(target) {
    const action = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({routeName: target})
      ]
    });
    const dispatch = this.navigator.getWrappedInstance().navigator.dispatch;
    dispatch(action);
  }

  _getStyleBar() {
    const theme = this.props.user.get('theme');
    let styleBar = 'light-content';
    if (Platform.OS === 'ios') {
      if (theme === 'DARK') {
        return 'light-content';
      } else {
        return 'dark-content';
      }
    } else {
      return 'light-content';
    }
  }

  render() {
    const { menu, keyboard, user, userActions } = this.props;
    const _menu = <Menu
      theme={user.get('theme')}
      onChangeTheme={() => {
        userActions.changeTheme(user.get('theme') === 'DARK' ? 'LIGHT' : 'DARK')
      }}
      onItemSelected={this.onMenuItemSelected.bind(this)}
    />;
    return (
      <SideMenu
        menu={_menu}
        isOpen={menu.get('open') && !keyboard.get('isOpen')}
        disableGestures={menu.get('disableGestures') || keyboard.get('isOpen')}
      >
        <View style={{
          flex: 1,
          position: 'relative',
        }}>
          <StatusBar
            barStyle={this._getStyleBar()}
            translucent={false}
            backgroundColor={Platform.OS === 'android' && user.get('theme') === 'LIGHT' ? COLORS.LIGHT_DARK : COLORS.DARK}
          />
          <NavigatorWithState
            ref={(el) => this.navigator = el}
          />
          <Alerts/>
          <Loading/>
        </View>
      </SideMenu>
    );
  }
}

function mapStateToProps(state) {
  return {
    menu: state.get('menu'),
    keyboard: state.get('keyboard'),
    user: state.get('user'),
    // nav: state.get('nav'),
    // currentRoute: getCurrentRoute(state),
  }
}

function mapDispatchToProps(dispatch) {
  return {
    keyboardActions: bindActionCreators(keyboardActions, dispatch),
    userActions: bindActionCreators(userActions, dispatch),
    menuActions: bindActionCreators(menuActions, dispatch),
    currenciesActions: bindActionCreators(currenciesActions, dispatch),
  }
}

const ConneconnectApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default class Main extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <ConneconnectApp />
      </Provider>
    )
  }
}
