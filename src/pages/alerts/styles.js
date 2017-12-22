import { Animated, Text, View, Dimensions, StyleSheet } from 'react-native';
const PAGE_WIDTH = Dimensions.get('window').width;
const PAGE_HEIGHT = Dimensions.get('window').height;
import * as COLORS from '../../styles/colors.js'

export default StyleSheet.create({
  list: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: PAGE_WIDTH,
    height: PAGE_HEIGHT,
    flex: 1,
    paddingTop: 50,
  },
  item: {
    width: PAGE_WIDTH - 40,
    padding: 10,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    backgroundColor: COLORS.BLUE,
    borderRadius: 10,
  },
  item_err: {
    backgroundColor: COLORS.RED,
  },
  itemText: {
    color: '#FFF',
    fontSize: 14,
    lineHeight: 18
  },
  itemText_err: {
    color: COLORS.DARK
  }
});
