import { TextInput, type TextInputProps } from 'react-native';

import { authStyles as styles } from '@/stylesheet/auth.styles';

type CustomInputProps = TextInputProps;

export function CustomInput(props: CustomInputProps) {
  return <TextInput placeholderTextColor="rgba(240, 242, 245, 0.5)" style={styles.input} {...props} />;
}
