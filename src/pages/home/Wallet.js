import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import { BaseText } from '../../components/text';
import Swipeable from 'react-native-swipeable';
import styles from './styles';
import * as format from '../../utils/format';
import {getThemeStyle} from '../../utils/theme';

export default class Wallet extends React.Component {
  render () {
    const {onRemove, name, balance, onItemRightRelease, onPress, currencyColor, iconSource, currencyRate, currencyDynamic, total, withBTC, theme} = this.props;
    return (
      <Swipeable
        ref={(el) => this.swipeable = el}
        rightButtonWidth={100}
        rightActionActivationDistance={10}
        rightButtons={[
          <TouchableOpacity style={styles.walletDelete} onPress={onRemove}>
            <BaseText style={styles.walletDeleteText}>Delete</BaseText>
          </TouchableOpacity>
        ]}
        onRightActionRelease={onItemRightRelease}
      >
        <TouchableOpacity style={[styles.wallet, {borderLeftColor: currencyColor}]} onPress={onPress}>
          <View style={[styles.walletIconContainer, getThemeStyle(styles, 'walletIconContainer', theme)]}>
            <Image style={[styles.walletIcon, getThemeStyle(styles, 'walletIcon', theme)]} source={iconSource}/>
          </View>
          <View style={styles.walletText}>
            <View style={styles.walletTextTop}>
              <BaseText style={[styles.walletTextName, getThemeStyle(styles, 'walletTextName', theme)]}>{name}</BaseText>
              <BaseText style={[styles.walletTextTotal, getThemeStyle(styles, 'walletTextTotal', theme)]}>{format.price_currency(balance)}</BaseText>
            </View>
            <View style={styles.walletTextBottom}>
              <BaseText style={[styles.walletTextCourse, getThemeStyle(styles, 'walletTextCourse', theme)]}>
                {withBTC ? format.exchangeRate_BTC(currencyRate) : format.exchangeRate(currencyRate)}
              </BaseText>
              <BaseText style={[
                styles.walletTextDynamic,
                getThemeStyle(styles, 'walletTextDynamic', theme),
                currencyDynamic < 0 && getThemeStyle(styles, 'walletTextDynamicNegative', theme),
              ]}>
                {format.change(currencyDynamic)}
              </BaseText>
              <BaseText style={styles.walletTextTotalDollars}>
                {withBTC ? format.price_currency(total) : format.price_USD(total)}
              </BaseText>
            </View>
          </View>
        </TouchableOpacity>
      </Swipeable>
    )
  }
}

Wallet.defaultProps = {
  theme: 'DARK',
};

// TODO add propTypes
Wallet.propTypes = {
  // onRemove: PropTypes.function
  // name,
  // balance,
  // onItemRightRelease,
  // currencyColor,
  // iconSource,
  // currencyRate,
  // currencyDynamic,
  // total,
  // theme,
};
