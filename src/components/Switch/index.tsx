/*
 * @Author: 东林
 * @Date: 2022-04-18 15:55:00
 * @description: 切换选择器组件入口
 */
import { FC } from 'react';
import Switch, { SwitchProps } from './switch';
import Icon, { IconProps } from './icon';
import IconMore, { IconMoreProps } from './iconMore';

export type SwitchComponent = FC<SwitchProps> & {
  Icon: FC<IconProps>;
  IconMore: FC<IconMoreProps>;
};

const TransSwitch = Switch as SwitchComponent;
TransSwitch.Icon = Icon;
TransSwitch.IconMore = IconMore;

export default TransSwitch;
