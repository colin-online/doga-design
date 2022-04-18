/*
 * @Author: 东林
 * @Date: 2022-04-18 15:55:00
 * @description: 切换选择器组件入口
 */
import { FC } from 'react';
import Switch, { SwitchProps } from './switch';
import More, { MoreProps } from './more';

export type SwitchComponent = FC<SwitchProps> & {
  More: FC<MoreProps>;
};

const TransSwitch = Switch as SwitchComponent;
TransSwitch.More = More;

export default TransSwitch;
