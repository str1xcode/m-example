import { Animated, Text, View, Dimensions, StyleSheet } from 'react-native';
const PAGE_WIDTH = Dimensions.get('window').width;
const PAGE_HEIGHT = Dimensions.get('window').height;
import * as COLORS from '../../styles/colors.js'


export default StyleSheet.create({
  pageContainer: {
    height: PAGE_HEIGHT
  },
  page: {
    flex: 1,
    height: PAGE_HEIGHT,
    flexDirection: 'column',
    backgroundColor: COLORS.DARK
  },
  page__LIGHT: {
    backgroundColor: COLORS.GRAY,
  },
  top: {

  },
  topText: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    width: '100%',
    textAlign: 'center',
    fontSize: 25,
    lineHeight: 32,
    backgroundColor: 'transparent',
    color: '#FFF',
  },
  topImage: {
    width: PAGE_WIDTH,
    height: PAGE_WIDTH / 1.973684210526316,
    resizeMode: 'cover',
  },
  middle: {
    flex: 1,
    flexDirection: 'column',
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 30,
    marginBottom: 30,
  },
  social: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  facebook: {
    flex: 1,
    marginRight: 10,
  },
  google: {
    flex: 1,
    marginLeft: 10,
    backgroundColor: COLORS.RED,
  },
  inputs: {
    flex: 1,
    // flexDirection: 'column',
    justifyContent: 'center',
  },
  inputName: {
    // marginBottom: 20,
  },
  // inputName__LIGHT: {
  //   color: COLORS.DARK,
  // },
  inputPass: {

  },
  // inputPass__LIGHT: {
  //   color: COLORS.DARK,
  // },
  bottom: {
    flexDirection: 'column',
    alignItems: 'center',
    // marginTop: 20,
    marginBottom: 40,
    paddingLeft: 20,
    paddingRight: 20,
  },
  bottomText: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  bottomTextDark: {
    fontSize: 15,
    lineHeight: 18,
    color: '#6F6F6F'
  },
  bottomTextLink: {
    marginLeft: 5,
    fontSize: 15,
    lineHeight: 18,
    color: COLORS.WHITE,
    textDecorationLine: 'underline',
  },
  bottomTextLink__LIGHT: {
    color: COLORS.DARK,
  },
});
