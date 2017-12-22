import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Text, View, ScrollView, Image, TouchableOpacity, TouchableHighlight, Animated, Dimensions, RefreshControl } from 'react-native';
import { NavigationActions } from 'react-navigation';
import Swipeable from 'react-native-swipeable';
import { ButtonRound } from '../../components/buttons';
import { BaseText } from '../../components/text';
import Pie from 'react-native-pie';
import * as Animatable from 'react-native-animatable'
import styles from './styles';
import * as CURRENCIES from '../../constants/currency';
import { getPortfolio } from '../../selectors/portfolio';
import Wallet from './Wallet';

import * as walletActions from '../../actions/wallets';
import * as currenciesActions from '../../actions/currencies';

import * as format from '../../utils/format';
import {getThemeStyle} from '../../utils/theme';

const PAGE_HEIGHT = Dimensions.get('window').height;

class Home extends React.Component {

  constructor() {
    super();
    this.items = [];
  }

  state = {
    scrollY: new Animated.Value(0),
    scrollYMax: null,
    currentItemIndex: null,
  };

  componentWillMount() {
    this._onRefresh();
  }

  _onAddWallet() {
    const navigateAction = NavigationActions.navigate({
      routeName: 'AddWallet'
    });
    this.props.navigation.dispatch(navigateAction);
  }

  _onRefresh() {
    const { currencies, currenciesActions} = this.props;
    const { getAll } = this.props.walletActions;
    this._recenterItems();
    getAll();
    currenciesActions.updateData();
    currenciesActions.updateListWithRevision();
  }

  _onItemRightRelease(idx) {
    for (let index in this.items) {
      const item = this.items[index].swipeable;
      if (item.state.rightButtonsOpen && index !== idx) {
        item.recenter();
      }
    }
  }

  _recenterItems() {
    for (let index in this.items) {
      const item = this.items[index].swipeable;
      if (item.state.rightButtonsOpen) {
        item.recenter();
      }
    }
  }

  _onPressTop() {
    const { wallets } = this.props;
    const { changeCurrency } = this.props.walletActions;
    if (wallets.get('currency') === 'USD') {
      changeCurrency('BTC');
    } else {
      changeCurrency('USD');
    }
    this._recenterItems();
  }

  _onRemoveWallet(walletId) {
    const { removeWallet } = this.props.walletActions;
    removeWallet(walletId);
  }

  render() {
    const { wallets, portfolio, user, currencies } = this.props;
    let pieColors = [];
    let piePercents = [];

    if (portfolio) {
      for (let key in portfolio.currency) {
        const item = portfolio.currency[key];
        pieColors.push(item.color);
        piePercents.push(item.percent);
      }
    }

    let _bottom = null;
    if (this.state.scrollYMax !== null) {
      let scrollPercent = this.state.scrollYMax > 0 ? Animated.divide(this.state.scrollY, this.state.scrollYMax) : new Animated.Value(1);
      const bottomPosition = scrollPercent.interpolate({
        inputRange: [0, 0.8, 1, 8],
        outputRange: [-30, 0, 40, 80]
      });

      _bottom = <Animated.View style={[styles.bottom, {bottom: bottomPosition}]}>
        <ButtonRound
          icon={require('@assets/icons/add-white-icon.png')}
          onPress={this._onAddWallet.bind(this)}
        />
      </Animated.View>
    }

    let _list = null;
    this.items = [];

    if (this.state.scrollYMax !== null && portfolio) {
      const { wallets } = this.props;
      if (wallets.get('currency') === 'USD') {
        _list = portfolio.wallets.map((item, idx) => {
          const _currencyIndex = currencies.get('list').findIndex( i => i.get('short') === item.currency);
          const _currency = _currencyIndex !== -1 ? currencies.get('list').get(_currencyIndex) : {};
          return (
            <Wallet
              key={idx}
              ref={(el) => this.items[idx] = el}
              onPress={() => this._recenterItems()}
              onRemove={this._onRemoveWallet.bind(this, item._id)}
              name={item.name}
              balance={item.finalBalance}
              onItemRightRelease={this._onItemRightRelease.bind(this, idx)}
              currencyColor={portfolio.currency[item.currency].color}
              iconSource={{uri: _currency.get('normal')}}
              currencyRate={portfolio.currency[item.currency].price_USD}
              currencyDynamic={portfolio.currency[item.currency].change_24h_USD}
              total={item.total_USD}
              withBTC={false}
              theme={user.get('theme')}
            />

          );
        });
      } else {
        _list = portfolio.wallets.map((item, idx) => {
          const _currencyIndex = currencies.get('list').findIndex( i => i.get('short') === item.currency);
          const _currency = _currencyIndex !== -1 ? currencies.get('list').get(_currencyIndex) : {};
          if (item.currency === 'BTC') {
            return (
              <Wallet
                key={idx}
                ref={(el) => this.items[idx] = el}
                onPress={() => this._recenterItems()}
                onRemove={this._onRemoveWallet.bind(this, item._id)}
                name={item.name}
                balance={item.finalBalance}
                onItemRightRelease={this._onItemRightRelease.bind(this, idx)}
                currencyColor={portfolio.currency[item.currency].color}
                iconSource={{uri: _currency.get('normal')}}
                currencyRate={portfolio.currency[item.currency].price_USD}
                currencyDynamic={portfolio.currency[item.currency].change_24h_USD}
                total={item.total_USD}
                withBTC={false}
                theme={user.get('theme')}
              />

            );
          } else {
            return (
              <Wallet
                key={idx}
                ref={(el) => this.items[idx] = el}
                onPress={() => this._recenterItems()}
                onRemove={this._onRemoveWallet.bind(this, item._id)}
                name={item.name}
                balance={item.finalBalance}
                onItemRightRelease={this._onItemRightRelease.bind(this, idx)}
                currencyColor={portfolio.currency[item.currency].color}
                iconSource={{uri: _currency.get('normal')}}
                currencyRate={portfolio.currency[item.currency].price_BTC}
                currencyDynamic={portfolio.currency[item.currency].change_24h_BTC}
                total={item.total_BTC}
                withBTC={true}
                theme={user.get('theme')}
              />

            );
          }
        });
      }
    }

    return (
      <View style={[styles.page, getThemeStyle(styles, 'page', user.get('theme'))]}>
        <ScrollView style={styles.pageInner}
          vertical
          // pagingEnabled
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          onContentSizeChange={(w, h)=> {
            let maxScroll = h - PAGE_HEIGHT;
            if (maxScroll < 0) {
              maxScroll = 0;
            }
            this.setState({scrollYMax: maxScroll});
          }}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}]
          )}
          refreshControl={
            <RefreshControl
              refreshing={false}
              onRefresh={this._onRefresh.bind(this)}
            />
          }
          >

          <TouchableOpacity style={styles.top}
            onPress={this._onPressTop.bind(this)}
          >
            <Pie
            radius={120}
            innerRadius={100}
            series={piePercents}
            colors={pieColors} />
            <View style={styles.pieText}>
              <Animatable.Text
                style={[
                  styles.pieUp,
                  getThemeStyle(styles, 'pieUp', user.get('theme')),
                  portfolio.change_24h_BTC < 0 && getThemeStyle(styles, 'pieChangeNegative', user.get('theme')),
                  {transform: wallets.get('currency') === 'BTC' ? [{scale: 1}] : [{scale: 0.5}]}
                  // {fontSize: wallets.get('currency') === 'BTC' ? 18 : 10}
                ]}
                transition='scale'
              >
                {format.change(portfolio.change_24h_BTC)}
              </Animatable.Text>
              <Animatable.Text
                style={[
                  styles.pieTotalBtc,
                  getThemeStyle(styles, 'pieTotalBtc', user.get('theme')),
                  {transform: wallets.get('currency') === 'BTC' ? [{scale: 1}] : [{scale: 0.7}]}
                  // {fontSize: wallets.get('currency') === 'BTC' ? 24 : 18}
                ]}
                transition='scale'
              >
                ฿{format.price_currency(portfolio.total_BTC)}
              </Animatable.Text>
              <Animatable.Text
                style={[
                  styles.pieTotalDollar,
                  getThemeStyle(styles, 'pieTotalDollar', user.get('theme')),
                  {transform: wallets.get('currency') === 'USD' ? [{scale: 1}] : [{scale: 0.7}]}
                  // {fontSize: wallets.get('currency') === 'USD' ? 24 : 18}
                ]}
                transition='scale'
              >
                {format.price_USD(portfolio.total_USD)}
              </Animatable.Text>
              <Animatable.Text
                style={[
                  styles.pieDown,
                  getThemeStyle(styles, 'pieDown', user.get('theme')),
                  portfolio.change_24h_USD < 0 && getThemeStyle(styles, 'pieChangeNegative', user.get('theme')),
                  // {fontSize: wallets.get('currency') === 'USD' ? 18 : 10}
                  {transform: wallets.get('currency') === 'USD' ? [{scale: 1}] : [{scale: 0.5}]}
                ]}
                transition='scale'
              >
                {format.change(portfolio.change_24h_USD)}
              </Animatable.Text>
            </View>
          </TouchableOpacity>
          <View style={styles.list}>
            {_list}
          </View>
        </ScrollView>
        {_bottom}
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    wallets: state.get('wallets'),
    currencies: state.get('currencies'),
    portfolio: getPortfolio(state),
    user: state.get('user'),
  }
}

function mapDispatchToProps(dispatch) {
  return {
    walletActions: bindActionCreators(walletActions, dispatch),
    currenciesActions: bindActionCreators(currenciesActions, dispatch),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
