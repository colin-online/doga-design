/*
 * @Author: 东林
 * @Date: 2022-03-14 02:22:33
 * @description: 输入框组件入口文件
 */
import { FC } from 'react';
import Input, { InputProps } from './input';
import Number, { NumberProps } from './Number';
import TextArea, { TextAreaProps } from './textArea';

export type InputComponent = FC<InputProps> & {
  TextArea: FC<TextAreaProps>;
  Number: FC<NumberProps>;
};
const TransInput = Input as InputComponent;

TransInput.TextArea = TextArea;
TransInput.Number = Number;

export default TransInput;
