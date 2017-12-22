import { Animated, Text, View, Dimensions, StyleSheet } from 'react-native';
const PAGE_WIDTH = Dimensions.get('window').width;
import * as COLORS from '../../styles/colors.js';

export default StyleSheet.create({
  input: {
    minHeight: 30,
    paddingBottom: 10,
    paddingTop: 10,
    fontSize: 14,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    color: '#D8D8D8'
  },
  input__LIGHT: {
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    color: COLORS.DARK,
  },
  input_focused: {
    borderBottomColor: COLORS.ORANGE,
  },
});
