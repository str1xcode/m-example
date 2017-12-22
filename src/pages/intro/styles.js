import { Animated, Text, View, Dimensions, StyleSheet } from 'react-native';
const PAGE_WIDTH = Dimensions.get('window').width;
const PAGE_HEIGHT = Dimensions.get('window').height;
import * as COLORS from '../../styles/colors.js'

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  shadow: {
    elevation: 16,
    shadowColor: '#000000',
    shadowOpacity: 0.5,
    shadowRadius: 20,
    shadowOffset: {
      height: 12
    },
  },
  title: {
    fontSize: 20,
    lineHeight: 27,
    color: '#fff',
    backgroundColor: 'transparent',
    textAlign: 'center'
  },

  desc: {
    fontSize: 15,
    color: '#fff',
    backgroundColor: 'transparent',
    marginTop: 20,
    lineHeight: 27,
    textAlign: 'center'
  },
  page: {
    width: PAGE_WIDTH,
  },
  card: {
    position: 'absolute',
    margin: 12,
    marginTop: 0,
    left: 0,
    top: 220 + 120,
    right: 0,
    borderRadius: 8,
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 140,
  },
  // button: {
  //   backgroundColor: 'rgba(0,0,0, 0.3)',
  //   position: 'absolute',
  //   margin: 12,
  //   marginTop: 40,
  //   left: (PAGE_WIDTH / 2) - 100,
  //   borderRadius: 50,
  //   bottom: 30,
  // },
  // buttonText: {
  //   margin: 15,
  //   marginLeft: 50,
  //   marginRight: 40,
  //   color: '#fff',
  //   fontSize: 14,
  // },
  bottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    flexDirection: 'row'
  },
  loginButton: {
    width: '50%',
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.DARK,
  },
  loginButtonText: {
    fontSize: 17,
    lineHeight: 17,
    color: '#FFF',
  },
  registerButton: {
    width: '50%',
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.GOLD,
  },
  registerButtonText: {
    fontSize: 17,
    lineHeight: 17,
    color: COLORS.DARK,
  },
  frame: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    left: PAGE_WIDTH/2 - 110,
    top: 80,
    backgroundColor: '#FFF',
    borderRadius: 110,
    width: 220,
    height: 220
  },
  photo: {
    width: 160,
    height: 160,
    resizeMode: 'contain',
    marginTop: 30
  },
  dots: {
    position: 'absolute',
    bottom: 100,
    left: PAGE_WIDTH/2 - 35,
    width: 70,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  dot: {
    width: 3,
    height: 5,
    marginLeft: 1.5,
    marginRight: 1.5,
    backgroundColor: COLORS.DARK,
  }
});
