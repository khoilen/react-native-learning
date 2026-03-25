import {
  StyleProp,
  TextProps as TextPropsRn,
  Text as TextRn,
  TextStyle,
} from 'react-native';
import { styles } from './styles';

export type TextProps = TextPropsRn & {
  align?: TextStyle['textAlign'];
  color?: string;
  style?: StyleProp<TextStyle>;
  variant?: keyof typeof styles;
};

export const Text = ({
  variant = 'body',
  color,
  align = 'left',
  style,
  children,
  ...props
}: TextProps) => {
  const textStyle = [
    styles.base,
    styles[variant],
    { textAlign: align },
    color ? { color } : null,
    style,
  ];

  return (
    <TextRn style={textStyle} {...props}>
      {children}
    </TextRn>
  );
};
