import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Animated, Text, View, Dimensions, StyleSheet, TouchableOpacity, Image, KeyboardAvoidingView} from 'react-native';
import styles from './styles';
import { NavigationActions } from 'react-navigation';
import Input from '../../components/input';
import { BaseText } from '../../components/text';
import { Button, ButtonRound } from '../../components/buttons';

import * as userActions from '../../actions/user';

import {getThemeStyle} from '../../utils/theme';

class Loading extends Component {

  componentWillReceiveProps(nextProps) {
    const { user } = nextProps;
    if (user.get('isLogged')) {
      this._redirectToPrivate('Home');
    }
  }

  _redirectToPrivate(routeName) {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({routeName: routeName})
      ]
    });
    this.props.navigation.dispatch(resetAction);
  }

  _redirectToLogin() {
    this.props.navigation.dispatch(NavigationActions.navigate({routeName: 'Login'}));
  }

  _onSubmit() {
    const name = this.nameInput.state.text;
    const pass = this.passInput.state.text;
    const confirmPass = this.confirmPassInput.state.text;
    this.props.userActions.register(name, pass, confirmPass);
  }

  render() {
    const { keyboard, user, userActions } = this.props;
    const theme = user.get('theme');
    let social = null;
    // not implemented on backend
    // if (keyboard.get('isOpen') === false) {
      social = <View style={styles.social}>
                <Button style={styles.facebook} onPress={() => userActions.fbAuth()} text='Facebook'></Button>
                <Button style={styles.google} onPress={() => userActions.googleAuth()} text='Google+'></Button>
              </View>
    // }

    return (
      <KeyboardAvoidingView
        style={[styles.page, getThemeStyle(styles, 'page', theme)]}
        behavior='position'
        contentContainerStyle={styles.pageContainer}
      >
        <View style={styles.top}>
          <Image
            source={theme === 'DARK' ? require('@assets/images/pattern-dark.png') : require('@assets/images/pattern-light.png')}
            style={styles.topImage}
          />
          <BaseText style={styles.topText}>Create Account</BaseText>
        </View>
        <View style={styles.middle}>
          {social}
          <View style={styles.inputs}>
            <Input
              style={styles.inputName}
              placeholder='Email'
              ref={(el) => this.nameInput = el}
              returnKeyType='next'
              keyboardType='email-address'
              onSubmitEditing={() => {
                this.passInput.input.focus();
              }}
              theme={theme}
            />
            <Input
              style={styles.inputPass}
              placeholder='Password'
              secureTextEntry={true}
              ref={(el) => this.passInput = el}
              returnKeyType='next'
              onSubmitEditing={() => {
                this.confirmPassInput.input.focus();
              }}
              theme={theme}
            />
            <Input
              style={styles.inputPass}
              placeholder='Confirm Password'
              secureTextEntry={true}
              ref={(el) => this.confirmPassInput = el}
              returnKeyType='done'
              onSubmitEditing={() => {
                this._onSubmit();
              }}
              theme={theme}
            />
          </View>
        </View>
        <View style={styles.bottom}>
          <View style={styles.bottomText}>
            <BaseText style={styles.bottomTextDark}>Already have an account?</BaseText>
            <TouchableOpacity onPress={this._redirectToLogin.bind(this)}>
              <BaseText style={[styles.bottomTextLink, getThemeStyle(styles, 'bottomTextLink', theme)]}>Login</BaseText>
            </TouchableOpacity>
          </View>
          <ButtonRound icon={require('@assets/icons/arr-right-white-icon.png')} onPress={this._onSubmit.bind(this)}/>
        </View>
      </KeyboardAvoidingView>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.get('user'),
    keyboard: state.get('keyboard')
  }
}

function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(userActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Loading);
