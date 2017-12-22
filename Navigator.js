import React from 'react';
import {StyleSheet, View} from 'react-native';
import { bindActionCreators } from 'redux';
import { Provider, connect } from 'react-redux';
import { StackNavigator, addNavigationHelpers } from 'react-navigation';
import Intro from './src/pages/intro';
import Home from './src/pages/home';
import AddWallet from './src/pages/addWallet';
import WalletProps from './src/pages/walletProps';
import Login from './src/pages/login';
import Register from './src/pages/register';
import * as menuActions from './src/actions/menu';
import * as navActions from './src/actions/nav';
import Analytics from 'react-native-analytics';
import * as COLORS from './src/styles/colors';
import {getThemeStyle} from './src/utils/theme';

const styles = StyleSheet.create({
  header__DARK: {
    backgroundColor: COLORS.GRAY,
  },
  header__LIGHT: {
    backgroundColor: COLORS.CELLO,
  },
  title__DARK: {
    color: COLORS.DARK,
  },
  title__LIGHT: {
    color: COLORS.WHITE,
  }
});

export const Navigator = StackNavigator({
  Intro: {
    screen: Intro,
    navigationOptions: ({navigation}) => ({
      header: false
    })
  },
  Home: {
    screen: Home,
    navigationOptions: ({navigation}) => ({
      header: false
    })
  },
  AddWallet: {
    screen: AddWallet,
    navigationOptions: ({navigation, screenProps}) => {
      const {theme} = screenProps;
      return {
        title: 'Choose wallet',
        headerStyle: getThemeStyle(styles, 'header', theme),
        headerTitleStyle: getThemeStyle(styles, 'title', theme),
        headerTintColor: theme === 'DARK' ? COLORS.DARK : COLORS.WHITE,
      }
    }
  },
  WalletProps: {
    screen: WalletProps,
    navigationOptions: ({navigation, screenProps}) => {
      const {theme} = screenProps;
      return {
        title: 'Wallet details',
        headerStyle: getThemeStyle(styles, 'header', theme),
        headerTitleStyle: getThemeStyle(styles, 'title', theme),
        headerTintColor: theme === 'DARK' ? COLORS.DARK : COLORS.WHITE,
      }
    }
  },
  Login: {
    screen: Login,
    navigationOptions: ({navigation}) => ({
      header: false
    })
  },
  Register: {
    screen: Register,
    navigationOptions: ({navigation}) => ({
      header: false
    })
  }
}, {
  initialRouteName: 'Intro',
});

class AppNavigator extends React.Component {

  componentWillMount() {
    this.onNavigationStateChange();
  }

  onNavigationStateChange(state, nextState) {
    const {navActions} = this.props;
    let routeName = 'Intro';
    if (nextState) {
      routeName = nextState.routes[nextState.index].routeName;
      navActions.updateState(nextState);
    }
    this.handleActiveRoute(routeName);
  }

  handleActiveRoute(routeName) {
    const {menuActions} = this.props;
    Analytics.screen(routeName);
    switch (routeName) {
      case 'Intro':
        menuActions.update({
          open: false,
          disableGestures: true
        });
        break;
      case 'Home':
        menuActions.update({
          open: false,
          disableGestures: false
        });
        break;
      case 'AddWallet':
        menuActions.update({
          open: false,
          disableGestures: false
        });
        break;
      case 'WalletProps':
        menuActions.update({
          open: false,
          disableGestures: false
        });
        break;
      case 'Login':
        menuActions.update({
          open: false,
          disableGestures: true
        });
        break;
      case 'Register':
        menuActions.update({
          open: false,
          disableGestures: true
        });
        break;
      default:
    }
  }

  render() {
    const {user} = this.props;
    return (
      <Navigator
        ref={el => this.navigator = el}
        onNavigationStateChange={this.onNavigationStateChange.bind(this)}
        screenProps={{theme: user.get('theme')}}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.get('user'),
});

const mapDispatchToProps = (dispatch) => ({
  menuActions: bindActionCreators(menuActions, dispatch),
  navActions: bindActionCreators(navActions, dispatch),
});

export const NavigatorWithState = connect(mapStateToProps, mapDispatchToProps, null, {withRef: true})(AppNavigator);
