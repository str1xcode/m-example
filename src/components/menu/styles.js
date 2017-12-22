import { Animated, Text, View, Dimensions, StyleSheet, Platform } from 'react-native';
const PAGE_WIDTH = Dimensions.get('window').width;
import * as COLORS from '../../styles/colors.js';
const window = Dimensions.get('window');

const topOffset = Platform.OS === 'ios' ? 20 : 0;

export default StyleSheet.create({
  menu: {
    flex: 1,
    width: window.width,
    height: window.height,
    // marginTop: topOffset,
    backgroundColor: COLORS.BLACK,
    paddingTop: 20 + topOffset,
  },
  menu__DARK: {
    backgroundColor: COLORS.GRAY,
  },
  menu__LIGHT: {
    backgroundColor: COLORS.CELLO,
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 15,
    paddingLeft: 30,
    // borderBottomWidth: 1,
    // borderBottomColor: COLORS.WHITE,
  },
  itemText: {
    fontSize: 20,
    lineHeight: 26,
    color: COLORS.WHITE,
    // marginLeft: 15,
  },
  itemText__DARK: {
    color: COLORS.DARK,
  },
  itemText__LIGHT: {

  },
  itemIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginRight: 20,
  },
  theme: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 64,
    padding: 15,
    paddingLeft: 30,
  },
  themeLabel: {
    fontSize: 20,
    lineHeight: 26,
    color: COLORS.WHITE,
  },
  themeLabel__DARK: {
    color: COLORS.DARK,
  },
  themeSwitch: {
    marginLeft: 20,
    marginRight: 20,
  }
});
