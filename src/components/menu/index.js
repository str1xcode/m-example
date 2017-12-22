import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView, View, TouchableOpacity, Image, Switch, StatusBar, Platform } from 'react-native';
import { BaseText } from '../text';
import styles from './styles';
import * as COLORS from '../../styles/colors';
import {getThemeStyle} from '../../utils/theme';

export default class Menu extends React.Component {
  render() {
    const { onItemSelected, onChangeTheme, theme } = this.props;
    return (
      <ScrollView
        scrollsToTop={false}
        style={[styles.menu, getThemeStyle(styles, 'menu', theme), this.props.styles]}
      >
        <TouchableOpacity
          onPress={() => onItemSelected('Logout')}
          style={styles.item}
        >
          <Image style={styles.itemIcon} source={require('@assets/icons/logout.png')} />
          <BaseText style={[styles.itemText, getThemeStyle(styles, 'itemText', theme)]}>Logout</BaseText>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onItemSelected('Donate')}
          style={styles.item}
        >
          <Image style={styles.itemIcon} source={require('@assets/icons/donate.png')} />
          <BaseText style={[styles.itemText, getThemeStyle(styles, 'itemText', theme)]}>Donate</BaseText>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onItemSelected('Bot')}
          style={styles.item}
        >
          <Image style={styles.itemIcon} source={require('@assets/icons/bot.png')} />
          <BaseText style={[styles.itemText, getThemeStyle(styles, 'itemText', theme)]}>Moneta-bot</BaseText>
        </TouchableOpacity>
        <View style={styles.theme}>
          <BaseText style={[styles.themeLabel, getThemeStyle(styles, 'themeLabel', theme)]}>Dark</BaseText>
          <Switch
            onValueChange={onChangeTheme}
            tintColor={COLORS.LIGHT_DARK}
            onTintColor={COLORS.GRAY}
            thumbTintColor={COLORS.ORANGE}
            style={styles.themeSwitch}
            value={theme === 'DARK' ? false : true}
          />
          <BaseText style={[styles.themeLabel, getThemeStyle(styles, 'themeLabel', theme)]}>Light</BaseText>
        </View>
      </ScrollView>
    );
  }
}

Menu.propTypes = {
  onItemSelected: PropTypes.func.isRequired,
  onChangeTheme: PropTypes.func.isRequired,
  theme: PropTypes.string.isRequired,
};
