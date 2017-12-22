import React from 'react';
import PropTypes from 'prop-types';
import { Platform, Text } from 'react-native';
import styles from './styles';

export class BaseText extends React.Component {

  _getFontFamily() {
    let fontFamily = '';
    switch (this.props.fontWeight) {
      case 'thin':
        fontFamily = (Platform.OS === 'ios') ? 'SFUIDisplay-Thin' : 'Roboto-Thin';
        break;
      case 'light':
        fontFamily = (Platform.OS === 'ios') ? 'SSFUIDisplay-Light' : 'Roboto-Light';
        break;
      case 'regular':
        fontFamily = (Platform.OS === 'ios') ? 'SFUIDisplay-Regular' : 'Roboto-Regular';
        break;
      case 'medium':
        fontFamily = (Platform.OS === 'ios') ? 'SFUIDisplay-Medium' : 'Roboto-Medium';
        break;
      default:
        fontFamily = (Platform.OS === 'ios') ? 'SFUIDisplay-Regular' : 'Roboto-Regular';
    }
    return fontFamily;
  }

  render() {

    return (
      <Text style={[styles.text, {fontFamily: this._getFontFamily()}, this.props.style]}>{this.props.children}</Text>
    )
  }
}

// TODO add propTypes
BaseText.propTypes = {
  style: Text.propTypes.style
};
