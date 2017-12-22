import { Animated, Text, View, Dimensions, StyleSheet } from 'react-native';
const PAGE_WIDTH = Dimensions.get('window').width;
import * as COLORS from '../../styles/colors.js';

export default StyleSheet.create({
  buttonRound: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.ORANGE,
    shadowColor: COLORS.ORANGE,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.5,
    shadowRadius: 4,
    // overflow: 'visible',
    elevation: 4,
    // borderWidth: 1,
    // borderColor: '#979797'
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    height: 46,
    borderRadius: 23,
    backgroundColor: COLORS.BLUE
  },
  buttonText: {
    fontSize: 15,
    lineHeight: 20,
    color: '#FFF'
  }
});
