import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
} from 'react-native';
import { primary, danger, muted, gray, dark } from '../../theme';

type ButtonVariant = 'primary' | 'secondary' | 'danger';

type Props = {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
};

const variants: Record<ButtonVariant, { bg: string; text: string }> = {
  primary: { bg: primary, text: 'white' },
  secondary: { bg: muted, text: dark },
  danger: { bg: danger, text: 'white' },
};

export const Button = ({
  title,
  onPress,
  variant = 'primary',
  disabled,
  loading,
  style,
}: Props) => {
  const colors = variants[variant];
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      style={[
        styles.button,
        { backgroundColor: colors.bg, opacity: isDisabled ? 0.5 : 1 },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator size="small" color={colors.text} />
      ) : (
        <Text
          style={[
            styles.text,
            { color: isDisabled && variant !== 'primary' ? gray : colors.text },
          ]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: { fontSize: 14, fontWeight: '600', textAlign: 'center' },
});

export default Button;
