import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Text, View, ScrollView, Image, TouchableOpacity, TextInput, KeyboardAvoidingView, Keyboard} from 'react-native';
import Input from '../../components/input';
import { ButtonRound } from '../../components/buttons';
import { BaseText } from '../../components/text';
import styles from './styles';
import * as walletActions from '../../actions/wallets';
import Analytics from 'react-native-analytics';
import { NavigationActions } from 'react-navigation';
import {getThemeStyle} from '../../utils/theme';

class WalletProps extends React.Component {

  componentWillMount () {
    Analytics.screen('WalletProps');
  }

  _onAdd(isToken) {
    const {addWallet} = this.props.walletActions;
    const currencyKey = this.props.navigation.state.params.currency;
    const walletName = this.inputName.state.text;
    const pubKey = this.inputPubKey.state.text;
    addWallet(currencyKey, pubKey, walletName, isToken, () => {
      const { navigation, nav } = this.props;
      const addWalletScreenKey = nav.get('state').get('routes').get(1).get('key');
      navigation.goBack(addWalletScreenKey);
    });
  }

  render() {
    const { wallets, user, currencies } = this.props;
    const theme = user.get('theme');
    const currencyKey = this.props.navigation.state.params.currency;
    const currencyIndex = currencies.get('list').findIndex(i => i.get('short') === currencyKey);
    const currency = currencies.get('list').get(currencyIndex) || {};
    return (
      <KeyboardAvoidingView
        style={[styles.page, getThemeStyle(styles, 'page', theme)]}
        behavior='position'
        contentContainerStyle={styles.pageContainer}
      >
        <View style={styles.top}>
          <Image style={styles.topImage} source={{uri: currency.get('retina')}}/>
          <View style={styles.topText}>
            <BaseText style={[styles.topName, getThemeStyle(styles, 'topName', theme)]}>{currency.get('short')} - {currency.get('name')}</BaseText>
          </View>
        </View>
        <View style={styles.middle}>
          <Input
            placeholder='Input name'
            ref={(el) => this.inputName = el}
            returnKeyType='next'
            onSubmitEditing={() => {
              this.inputPubKey.input.focus();
            }}
            theme={theme}
          />
          <Input
            placeholder='Input public key'
            ref={(el) => this.inputPubKey = el}
            returnKeyType='done'
            onSubmitEditing={() => {
              this._onAdd(currency.get('istoken'));
            }}
            theme={theme}
          />
        </View>
        <View style={styles.bottom}>
          <ButtonRound icon={require('@assets/icons/arr-right-white-icon.png')} onPress={() => this._onAdd(currency.get('istoken'))}/>
        </View>
      </KeyboardAvoidingView>
    )
  }
}

function mapStateToProps(state) {
  return {
    wallets: state.get('wallets'),
    nav: state.get('nav'),
    user: state.get('user'),
    currencies: state.get('currencies'),
  }
}

function mapDispatchToProps(dispatch) {
  return {
    walletActions: bindActionCreators(walletActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WalletProps);
