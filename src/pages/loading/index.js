import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { View, ActivityIndicator} from 'react-native';
import styles from './styles';
import * as COLORS from '../../styles/colors.js'

class Loading extends React.Component {

  render() {
    const { user, wallets, currencies, loading, nav } = this.props;
    const loaded = loading.get('loaded');
    const routeName = nav.get('state').get('routes').get(nav.get('state').get('index')).get('routeName');
    let _loading = null;
    if (routeName === 'Intro' || routeName === 'Login' || routeName === 'Register') {
      _loading = null;
    } else if (
      user.get('loading') ||
      wallets.get('loading') ||
      !loaded.includes('currencies:data') ||
      !loaded.includes('currencies:list') ||
      !loaded.includes('currencies:listRevision')
    ) {
      _loading = <View style={styles.loading}>
                  <ActivityIndicator animating={true} size={'large'} color={'#6F6F6F'}/>
                </View>
    }

    return (
      <View style={styles.overlay} pointerEvents='box-none'>
        {_loading}
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.get('user'),
    wallets: state.get('wallets'),
    currencies: state.get('currencies'),
    loading: state.get('loading'),
    nav: state.get('nav'),
  }
}

function mapDispatchToProps(dispatch) {
  return {

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Loading);
