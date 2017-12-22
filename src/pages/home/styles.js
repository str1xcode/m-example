import { Animated, Text, View, Dimensions, StyleSheet, Platform } from 'react-native';
const PAGE_WIDTH = Dimensions.get('window').width;
const PAGE_HEIGHT = Dimensions.get('window').height;
import * as COLORS from '../../styles/colors.js'

export default StyleSheet.create({
  page: {
    backgroundColor: '#fff',
    flex: 1,
    backgroundColor: COLORS.DARK,
    width: PAGE_WIDTH,
    height: PAGE_HEIGHT

  },
  page__LIGHT: {
    backgroundColor: COLORS.GRAY,
  },
  pageInner: {

  },
  top: {
    // flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 30,
  },
  pieText: {
    position: 'absolute',
    width: 160,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'visible',
    // backgroundColor: 'red',
  },
  pieTotalBtc: {
    fontSize: 24,
    color: '#fff',
    fontFamily: Platform.OS === 'ios' ? 'SFUIDisplay-Regular' : 'Roboto-Regular',
  },
  pieTotalBtc__LIGHT: {
    color: COLORS.DARK,
  },
  pieTotalDollar: {
    fontSize: 24,
    color: '#fff',
    fontFamily: Platform.OS === 'ios' ? 'SFUIDisplay-Regular' : 'Roboto-Regular',
  },
  pieTotalDollar__LIGHT: {
    color: COLORS.DARK,
  },
  pieUp: {
    fontSize: 18,
    color: COLORS.TEXT_GREEN,
    fontFamily: Platform.OS === 'ios' ? 'SFUIDisplay-Regular' : 'Roboto-Regular',
  },
  pieUp__LIGHT: {
    color: COLORS.TEXT_GREEN_DARK,
  },
  pieDown: {
    fontSize: 18,
    color: COLORS.TEXT_GREEN,
    fontFamily: Platform.OS === 'ios' ? 'SFUIDisplay-Regular' : 'Roboto-Regular',
  },
  pieDown__LIGHT: {
    color: COLORS.TEXT_GREEN_DARK,
  },
  pieChangeNegative__DARK: {
    color: COLORS.TEXT_RED
  },
  pieChangeNegative__LIGHT: {
    color: COLORS.TEXT_RED_DARK,
  },
  list: {
    flex: 1,
    paddingBottom: 120,
  },
  wallet: {
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 5,
    marginBottom: 5,
    flexDirection: 'row',
    width: '100%',
    borderLeftWidth: 3,
    borderLeftColor: '#000',
  },
  walletDelete: {
    height: '100%',
    width: 100,
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.RED,
  },
  walletDeleteText: {
    color: '#FFF'
  },
  walletIconContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 55,
    height: 55,
    backgroundColor: COLORS.GRAY,
    borderRadius: 27.5,
    overflow: 'hidden',
  },
  walletIconContainer__LIGHT: {
    backgroundColor: 'transparent',
  },
  walletIcon: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  walletIcon__LIGHT: {
    width: 50,
    height: 50,
  },
  walletText: {
    flex: 1,
    flexDirection: 'column',
    // alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 15
  },
  walletTextTop: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    // width: '100%'
  },
  walletTextName: {
    fontSize: 15,
    lineHeight: 20,
    color: '#FFF',
    marginRight: 'auto',
  },
  walletTextName__LIGHT: {
    color: COLORS.DARK,
  },
  walletTextStatus: {
    marginLeft: 'auto',
    fontSize: 13,
    lineHeight: 13,
    color: '#999999',

  },
  walletTextTotal: {
    marginLeft: 15,
    fontSize: 16,
    lineHeight: 16,
    color: '#FFF'
  },
  walletTextTotal__LIGHT: {
    color: COLORS.DARK,
  },
  walletTextBottom: {
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  walletTextCourse: {
    fontSize: 16,
    color: COLORS.TEXT_GREEN,
    lineHeight: 16
  },
  walletTextCourse__LIGHT: {
    color: COLORS.TEXT_GREEN_DARK,
  },
  walletTextDynamic: {
    marginLeft: 15,
    fontSize: 13,
    lineHeight: 13,
    color: COLORS.TEXT_GREEN,
  },
  walletTextDynamic__LIGHT: {
    color: COLORS.TEXT_GREEN_DARK,
  },
  walletTextDynamicNegative__DARK: {
    color: COLORS.TEXT_RED,
  },
  walletTextDynamicNegative__LIGHT: {
    color: COLORS.TEXT_RED_DARK,
  },
  walletTextTotalDollars: {
    marginLeft: 'auto',
    fontSize: 14,
    lineHeight: 14,
    color: '#999999',
  },
  bottom: {
    position: 'absolute',
    left: PAGE_WIDTH/2 - 30,
    bottom: -30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
