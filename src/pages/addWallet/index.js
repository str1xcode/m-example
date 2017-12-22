import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Text, View, ScrollView, Image, TouchableOpacity, TouchableHighlight, TextInput} from 'react-native';
import Input from '../../components/input';
import {BaseText} from '../../components/text';
import { NavigationActions } from 'react-navigation';
import styles from './styles';
import * as COLORS from '../../styles/colors';
import _ from 'lodash';

import * as walletActions from '../../actions/wallets';
import * as currenciesActions from '../../actions/currencies';

import {getThemeStyle} from '../../utils/theme';

class AddWallet extends React.Component {

  state = {
    currencyList: this.props.currencies.get('list')
  };

  componentWillReceiveProps(nextProps) {
    const {currenciesActions, currencies} = this.props;
    const _currencies = nextProps.currencies;
    const nav = this.props.nav.toJS();
    const route = nav.state.routes[nav.state.index];
    const _nav = nextProps.nav.toJS();
    const _route = _nav.state.routes[_nav.state.index];
    if (route.routeName !== _route.routeName && _route.routeName === 'AddWallet') {
      currenciesActions.updateListWithRevision();
    }
    if (!currencies.get('list').equals(_currencies.get('list'))) {
      this.setState({currencyList: _currencies.get(list)});
    }
  }

  _onPressWallet(short) {
    const navigateAction = NavigationActions.navigate({
      routeName: 'WalletProps',
      params: {
        currency: short
      }
    });
    this.props.navigation.dispatch(navigateAction);
  }

  search() {
    const {currencies} = this.props;
    const searchKey = this.searchInput.state.text;
    const _currencyList = currencies.get('list').filter( (item) => {
      let _name = item.get('name').toLowerCase();
      let _short = item.get('short').toLowerCase();
      let _searchKey = searchKey.toLowerCase();
      return (_short.indexOf(_searchKey) !== -1) || (_name.indexOf(_searchKey) !== -1);
    });
    this.setState({currencyList: _currencyList});
  }

  render() {
    const theme = this.props.user.get('theme');
    const currencyList = this.props.currencies.get('list');

    let _currency = this.state.currencyList.map((item, idx) => {
      return (
        <TouchableOpacity style={styles.wallet} key={idx} onPress={this._onPressWallet.bind(this, item.get('short'))}>
          <View style={[styles.walletIconContainer, getThemeStyle(styles, 'walletIconContainer', theme)]}>
            <Image style={styles.walletIcon} source={{uri: item.get('normal')}}/>
          </View>
          <View style={styles.walletText}>
            <BaseText style={[styles.walletName, getThemeStyle(styles, 'walletName', theme)]}>
              {item.get('short')} - {item.get('name')}
            </BaseText>
            <Image
              source={theme === 'DARK' ? require('@assets/icons/add-white-icon.png') : require('@assets/icons/add-icon.png')}
              style={{width: 17, height: 17}}
            />
          </View>
        </TouchableOpacity>
      );
    });

    return(
      <View style={[styles.page, getThemeStyle(styles, 'page', theme)]}>
        <View style={styles.top}>
          <Input placeholder='Search ...'
            ref={(el) => this.searchInput = el}
            placeholderTextColor={COLORS.LIGHT_DARK}
            style={styles.searchInput}
            returnKeyType='search'
            onChangeText={_.debounce(this.search.bind(this), 300)}
            onSubmitEditing={this.search.bind(this)}
            focusStyle={{borderColor: COLORS.ORANGE, borderBottomColor: COLORS.ORANGE, borderWidth: 1}}
          />
        </View>
        <ScrollView style={styles.list}>
          {_currency}
        </ScrollView>
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    // wallets: state.get('wallets'),
    user: state.get('user'),
    nav: state.get('nav'),
    currencies: state.get('currencies'),
  }
}

function mapDispatchToProps(dispatch) {
  return {
    // walletActions: bindActionCreators(walletActions, dispatch),
    currenciesActions: bindActionCreators(currenciesActions, dispatch),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddWallet);
