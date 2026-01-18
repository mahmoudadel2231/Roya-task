import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { subtle, primary } from '../../theme';

type Props = { checked: boolean; onToggle: () => void; disabled?: boolean };

export const Checkbox = ({ checked, onToggle, disabled }: Props) => (
  <TouchableOpacity onPress={onToggle} disabled={disabled} activeOpacity={0.7}>
    <View style={[styles.box, checked && styles.on, disabled && { opacity: 0.5 }]}>
      {checked && <View style={styles.check} />}
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  box: {
    width: 24, height: 24, borderRadius: 8,
    borderWidth: 2, borderColor: subtle,
    backgroundColor: 'white',
    justifyContent: 'center', alignItems: 'center',
  },
  on: { backgroundColor: primary, borderColor: primary },
  check: {
    width: 5, height: 10,
    borderRightWidth: 2, borderBottomWidth: 2,
    borderColor: 'white',
    transform: [{ rotate: '45deg' }],
    marginTop: -2,
  },
});

export default Checkbox;
