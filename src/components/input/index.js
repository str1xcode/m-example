import React from 'react';
import PropTypes from 'prop-types';
import { TextInput} from 'react-native';
import styles from './styles';
import * as COLORS from '../../styles/colors';
import {getThemeStyle} from '../../utils/theme';

export default class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      isFocused: false,
    }
  }

  _onChange(text) {
    const {onChangeText} = this.props;
    this.setState({text});
    if (typeof onChangeText === 'function') onChangeText(text);
  }

  _onFocus() {
    const {onFocus} = this.props;
    this.setState({isFocused: true});
    if (typeof onFocus === 'function') onFocus();
  }

  _onBlur() {
    const {onBlur} = this.props;
    this.setState({isFocused: false});
    if (typeof onBlur === 'function') onBlur();
  }

  render() {
    const {theme, focusStyle} = this.props;
    const {isFocused} = this.state;
    return (
      <TextInput
        ref={(el) => this.input = el}
        style={[
          styles.input,
          getThemeStyle(styles, 'input', theme),
          (isFocused && !focusStyle) && styles.input_focused,
          this.props.style,
          (isFocused && focusStyle) && focusStyle,
        ]}
        value={this.state.text}
        onChangeText={this._onChange.bind(this)}
        underlineColorAndroid='rgba(0,0,0,0)'
        placeholder={this.props.placeholder}
        returnKeyType={this.props.returnKeyType}
        onKeyPress={this.props.onKeyPress}
        keyboardType={this.props.keyboardType}
        onSubmitEditing={this.props.onSubmitEditing}
        autoCapitalize='none'
        blurOnSubmit={this.props.blurOnSubmit}
        placeholderTextColor={
          this.props.placeholderTextColor ||
          COLORS.DARK_GRAY
        }
        secureTextEntry={this.props.secureTextEntry || false}
        onFocus={this._onFocus.bind(this)}
        onBlur={this._onBlur.bind(this)}
      />
    )
  }
}

// TODO add propTypes
Input.propTypes = {
  onChangeText: PropTypes.func
};
