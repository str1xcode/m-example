import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Animated, Text, View, TouchableOpacity, Image} from 'react-native';
import styles from './styles';
import { BaseText } from '../../components/text';
import * as alertsActions from '../../actions/alerts';

const LIFE_TIME = 3000;

class AlertItem extends React.Component {
  componentWillMount() {
    const { onRemoveSelf } = this.props;
    this._lifeTimeout = setTimeout(onRemoveSelf, LIFE_TIME);
  }

  componentWillUnmount() {
    clearTimeout(this._lifeTimeout);
  }

  render() {
    const {text, type, onPress} = this.props;
    return (
      <TouchableOpacity
        style={[styles.item, type === 'error' && styles.item_err]}
        pointerEvents='all'
        onPress={onPress}>
        <BaseText tyle={[styles.itemText, type === 'error' && styles.itemText_err]}>{text}</BaseText>
      </TouchableOpacity>
    )
  }
}

class Alerts extends React.Component {

  _onPressItem(idx) {
    const { remove } = this.props.alertsActions;
    remove(idx);
  }

  _onRemoveSelf(idx) {
    const { remove } = this.props.alertsActions;
    remove(idx);
  }

  render() {
    const list = this.props.alerts.get('list').toJS();
    const _alerts = list.map((item, idx) => (
      <AlertItem
        key={idx}
        onPress={this._onPressItem.bind(this, idx)}
        text={item.text}
        type={item.type}
        onRemoveSelf={this._onRemoveSelf.bind(this, idx)}
      />
    ));

    return (
      <View style={styles.list} pointerEvents='box-none'>
        {_alerts}
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    alerts: state.get('alerts')
  }
}

function mapDispatchToProps(dispatch) {
  return {
    alertsActions: bindActionCreators(alertsActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Alerts);
