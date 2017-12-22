import { Animated, Text, View, Dimensions, StyleSheet } from 'react-native';
const PAGE_WIDTH = Dimensions.get('window').width;
import * as COLORS from '../../styles/colors.js'

export default StyleSheet.create({
  page: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: COLORS.DARK
  },
  page__LIGHT: {
    backgroundColor: COLORS.GRAY,
  },
  top: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    paddingBottom: 20
  },
  searchInput: {
    height: 40,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#FFF',
    borderWidth: 0,
    borderRadius: 20,
    color: COLORS.DARK
  },
  list: {
    flex: 1
  },
  wallet: {
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: 'row',
    alignItems: 'center',
    height: 70
  },
  walletIconContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 55,
    height: 55,
    backgroundColor: COLORS.GRAY,
    borderRadius: 27.5,
    overflow: 'visible'
  },
  walletIconContainer__LIGHT: {
    backgroundColor: 'transparent',
  },
  walletIcon: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  walletText: {
    marginLeft: 20,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
  },
  walletName: {
    fontSize: 14,
    color: COLORS.WHITE,
  },
  walletName__LIGHT: {
    color: COLORS.DARK,
  }
});
