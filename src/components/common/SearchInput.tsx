import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { border, gray, text, warningText } from '../../theme';

type Props = {
  value: string;
  onChangeText: (text: string) => void;
  onClear?: () => void;
  remainingChars?: number;
  style?: ViewStyle;
};

export const SearchInput = ({
  value,
  onChangeText,
  onClear,
  remainingChars = 0,
  style,
}: Props) => (
  <View style={[styles.container, style]}>
    <Icon name="search" size={20} color={gray} style={styles.icon} />
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder="Search products by name, description, or tag..."
      style={styles.input}
      autoCapitalize="none"
      autoCorrect={false}
    />
    {value.length > 0 && remainingChars > 0 && (
      <Text style={styles.remainingText}>{remainingChars} more characters</Text>
    )}
    {value.length > 0 && onClear && (
      <TouchableOpacity
        onPress={onClear}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Icon name="x" size={16} color={gray} />
      </TouchableOpacity>
    )}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: border,
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
  },
  icon: { marginRight: 8 },
  input: { flex: 1, fontSize: 14, color: text },
  remainingText: { fontSize: 10, color: warningText, marginRight: 8 },
});

export default SearchInput;
