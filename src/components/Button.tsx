import React from 'react';
import {ButtonProps, TouchableOpacity, StyleSheet, StyleProp, ViewStyle, TextStyle, TextProps, Text} from 'react-native';
import { colors } from '../colors';

interface Props extends ButtonProps {
  style?: StyleProp<ViewStyle>,
  textStyle?: StyleProp<TextStyle>,
  TextComponent?: React.FC<TextProps>
}

const Button = (props: Props) => {

  const TextComponent = props.TextComponent || Text

  return (
    <TouchableOpacity {...props} style={[styles.button, props.style]}>
      <TextComponent style={[styles.text, props.textStyle]}>{props.title}</TextComponent>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderRadius: 10,
  },
  text: {
    color: colors.white,
    margin: 16,
    textAlign: "center",
  }
});
