import React, { memo } from 'react';
import { 
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar
} from 'react-native';

import colors from '../../styles/colors';

const StatusBarComponent = () => {


  return (
    <View>
        <SafeAreaView style={styles.statusBar}>
          <StatusBar translucent backgroundColor={colors.azure} barStyle="light-content" />
        </SafeAreaView>
      </View>
  )
}

const STATUSBAR_HEIGHT = StatusBar.currentHeight;

const styles = StyleSheet.create({
  statusBar: {
    height: STATUSBAR_HEIGHT,
    backgroundColor:colors.azure
  },
})

export default memo(StatusBarComponent);