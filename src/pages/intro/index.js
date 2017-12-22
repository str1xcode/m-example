import React, {Component} from 'react';
import {Animated, Text, View, Dimensions, StyleSheet, TouchableOpacity, Image} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styles from './styles';
import { NavigationActions } from 'react-navigation';
import { BaseText } from '../../components/text';
import * as COLORS from '../../styles/colors.js';

import * as userActions from '../../actions/user';
import * as menuActions from '../../actions/menu';

const PAGE_WIDTH = Dimensions.get('window').width;

class Intro extends Component {

  state = {
    scrollX: new Animated.Value(0),
  };

  componentDidMount() {
    const { init } = this.props.userActions;
    init();
  }

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



  _handlePressRegister() {
    const navigateAction = NavigationActions.navigate({
      routeName: 'Register'
    });
    this.props.navigation.dispatch(navigateAction);
  }

  _handlePressLogin() {
    const navigateAction = NavigationActions.navigate({
      routeName: 'Login'
    });
    this.props.navigation.dispatch(navigateAction);
  }

  render() {

    const positionAnimate = Animated.divide(this.state.scrollX, PAGE_WIDTH);

    const backgroundColor = positionAnimate.interpolate({
      inputRange: [0,1,2,3],
      outputRange: ['rgba(33,33,33,0)', 'rgba(33,33,33,0.3)', 'rgba(33,33,33,0.6)', 'rgba(33,33,33,0.9)']
    });

    const dotsHeight = [];
    dotsHeight[0] = positionAnimate.interpolate({
      inputRange: [0,1,2,3],
      outputRange: [15,5,5,5]
    });
    dotsHeight[1] = positionAnimate.interpolate({
      inputRange: [0,1,2,3],
      outputRange: [5,15,5,5]
    });
    dotsHeight[2] = positionAnimate.interpolate({
      inputRange: [0,1,2,3],
      outputRange: [5,5,15,5]
    });
    dotsHeight[3] = positionAnimate.interpolate({
      inputRange: [0,1,2,3],
      outputRange: [5,5,5,15]
    });

    const dotsColor = positionAnimate.interpolate({
      inputRange: [0,1,2,3],
      outputRange: [COLORS.DARK, COLORS.DARK, '#FFF', '#FFF']
    });

    const { user } = this.props;

    return (
      <View style={[styles.container, user.get('loading') && {opacity: 0}]}>
        <Animated.View style={[StyleSheet.absoluteFill, {backgroundColor}]} />

        <Animated.ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: this.state.scrollX}}}]
          )}>

            {/* screen 1 */}
            <View style={styles.page}>
              <Animated.View style={styles.frame}>
                <Animated.Image
                  source={require('@assets/images/allinone.png')}
                  style={styles.photo}
                />
              </Animated.View>

              <Animated.View
                style={[styles.card,
                  {transform: [{translateX: Animated.multiply(Animated.add(positionAnimate, -0), -300)}]}]}>
                <BaseText style={[styles.title, {color: COLORS.DARK}]}>All in one place.</BaseText>
                <BaseText style={[styles.desc, {color: COLORS.DARK}]}>Find all coins and tokens you own in one app.</BaseText>
              </Animated.View>
            </View>

            {/* screen 2 */}
            <View style={styles.page}>
              <Animated.View style={styles.frame}>
                <Animated.Image
                  source={require('@assets/images/safe.png')}
                  style={styles.photo}
                />
              </Animated.View>

              <Animated.View
                style={[styles.card,
                  {transform: [{translateX: Animated.multiply(Animated.add(positionAnimate, -1), -300)}]}]}>
                <BaseText style={[styles.title, {color: COLORS.DARK}]}>100% safe</BaseText>
                <BaseText style={[styles.desc, {color: COLORS.DARK}]}>Just add your public key, and we’ll do the rest.</BaseText>
              </Animated.View>
            </View>

            {/* screen 3 */}
            <View style={styles.page}>
              <Animated.View style={styles.frame}>
                <Animated.Image
                  source={require('@assets/images/hodlings.png')}
                  style={styles.photo}
                />
              </Animated.View>

              <Animated.View
                style={[styles.card,
                  {transform: [{translateX: Animated.multiply(Animated.add(positionAnimate, -2), -300)}]}]}>
                <BaseText style={styles.title}>Hodlings</BaseText>
                <BaseText style={styles.desc}>All your assets in BTC and USD real-time</BaseText>
              </Animated.View>
            </View>

            {/* screen 4 */}
            <View style={styles.page}>
              <Animated.View style={styles.frame}>
                <Animated.Image
                  source={require('@assets/images/donate.png')}
                  style={styles.photo}
                />
              </Animated.View>

              <Animated.View
                style={[styles.card,
                  {transform: [{translateX: Animated.multiply(Animated.add(positionAnimate, -3), -300)}]}]}>
                <BaseText style={styles.title}>Use. Test. Donate.</BaseText>
                <BaseText style={styles.desc}>We are in active development. Wait for more awesome features 😉</BaseText>
              </Animated.View>
            </View>

        </Animated.ScrollView>

        <View style={styles.dots}>
          <Animated.View style={[styles.dot, { height: dotsHeight[0], backgroundColor: dotsColor }]} />
          <Animated.View style={[styles.dot, { height: dotsHeight[1], backgroundColor: dotsColor }]} />
          <Animated.View style={[styles.dot, { height: dotsHeight[2], backgroundColor: dotsColor }]} />
          <Animated.View style={[styles.dot, { height: dotsHeight[3], backgroundColor: dotsColor }]} />
        </View>

        <View style={styles.bottom}>
          <TouchableOpacity style={styles.loginButton} onPress={this._handlePressLogin.bind(this)}>
            <BaseText style={styles.loginButtonText}>LOGIN</BaseText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.registerButton} onPress={this._handlePressRegister.bind(this)}>
            <BaseText style={styles.registerButtonText}>GET STARTED</BaseText>
          </TouchableOpacity>
        </View>

      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.get('user')
  }
}

function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(userActions, dispatch),
    menuActions: bindActionCreators(menuActions, dispatch),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Intro);
