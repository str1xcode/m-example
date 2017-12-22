import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Image } from 'react-native';
import { BaseText } from '../text';
import styles from './styles';

export class ButtonRound extends React.Component {

  _handlePress() {
    if (typeof this.props.onPress === 'function') {
      this.props.onPress();
    }
  }

  render() {
    const {theme} = this.props;
    return(
      <TouchableOpacity
        style={[styles.buttonRound, this.props.style]}
        onPress={this._handlePress.bind(this)}
      >
        <Image
          source={this.props.icon}
          style={{width: 17, height: 17, resizeMode: Image.resizeMode.contain}}
        />
      </TouchableOpacity>
    )
  }
}

// TODO add propTypes
ButtonRound.propTypes = {

};


export class Button extends React.Component {

  _handlePress() {
    if (typeof this.props.onPress === 'function') {
      this.props.onPress();
    }
  }

  render() {
    return (
      <TouchableOpacity style={[styles.button, this.props.style]} onPress={this._handlePress.bind(this)}>
        <BaseText style={styles.buttonText}>{this.props.text}</BaseText>
      </TouchableOpacity>
    )
  }
}

// TODO add propTypes
Button.propTypes = {

};
