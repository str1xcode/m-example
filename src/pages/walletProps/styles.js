import { Animated, Text, View, Dimensions, StyleSheet } from 'react-native';
import { Header } from 'react-navigation';
const PAGE_WIDTH = Dimensions.get('window').width;
const PAGE_HEIGHT = Dimensions.get('window').height;
import * as COLORS from '../../styles/colors.js'

export default StyleSheet.create({
  pageContainer: {
    height: PAGE_HEIGHT - Header.HEIGHT
  },
  page: {
    flex: 1,
    height: PAGE_HEIGHT - Header.HEIGHT,
    flexDirection: 'column',
    backgroundColor: COLORS.DARK
  },
  page__LIGHT: {
    backgroundColor: COLORS.GRAY,
  },
  top: {
    paddingTop: 20,
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  topImage: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  topText: {
    width: '100%',
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topName: {
    fontSize: 14,
    lineHeight: 18,
    color: COLORS.WHITE,
  },
  topName__LIGHT: {
    color: COLORS.DARK,
  },
  middle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingLeft: 20,
    paddingRight: 20
  },
  field: {
    marginTop: 15,
    marginBottom: 15
  },
  bottom: {
    paddingTop: 20,
    paddingBottom: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
});
