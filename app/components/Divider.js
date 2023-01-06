import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export const Divider = ({text}) => {
  return (
    <View style={styles.container}>
      <View style={styles.line} />
      <View>
        <Text style={styles.text}>{text ? text : 'o'}</Text>
      </View>
      <View style={styles.line} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flexDirection: 'row', alignItems: 'center', marginVertical:10},
  line: {flex: 1, height: 1, backgroundColor: 'white'},
  text: {
    marginHorizontal: 5,
    textAlign: 'center',
    color: 'white',
    fontSize: 18,
    lineHeight: 18.29,
  },
});