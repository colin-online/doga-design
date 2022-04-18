/*
 * @Author: 东林
 * @Date: 2022-04-17 13:47:02
 * @description: 颜色选择器函数组件
 */
import React, { FC, useRef, useState, useCallback, useEffect } from 'react';
import { ChromePicker } from 'react-color';
import classNames from 'classnames';
import useClickOutside from '../../hooks/useClickOutside';

/* 颜色属性类型定义 */
export type ColorProps = {
  hex: string;
  rgba: string;
};

/* 颜色选择器属性接口定义 */
export interface ColorPickerProps {
  /* 标题 */
  title?: string;
  /* 默认颜色 */
  defaultColor?: string;
  /* 颜色列表 */
  defaultColorList?: Array<ColorProps>;
  /* 禁用透明度 */
  disableAlpha?: boolean;
  /* 更新操作 */
  onChange: (data: any) => void;
}

export const ColorPicker: FC<ColorPickerProps> = props => {
  const { title = '颜色', defaultColor = '#000000', defaultColorList = [], disableAlpha = false, onChange } = props || {};
  /* 组件元素 */
  const componentRef = useRef<HTMLDivElement>(null);
  /* 当前选中颜色选项索引 */
  const [isActive, setIsActive] = useState(false);
  /* 颜色列表 */
  const [colorList, setColorList] = useState<Array<ColorProps>>([]);
  /* 当前选中颜色选项索引 */
  const [colorIndex, setColorIndex] = useState(0);
  /* 默认颜色 */
  const [color, setColor] = useState('');
  /* 组件样式 */
  const classes = classNames('doga-color-picker', {});

  /* 执行设置默认颜色操作 */
  const handleDefaultColorChange = useCallback(() => {
    if (isActive) setIsActive(false);
    else if (defaultColorList?.length > 1) return;
    else {
      setIsActive(true);
    }
  }, [isActive, defaultColorList]);

  /* 执行重置颜色操作 */
  const handleResetColorChange = useCallback(() => {
    if (defaultColorList?.length) {
      const newColorList = JSON.parse(JSON.stringify(colorList));
      newColorList[colorIndex] = { hex: '', rgba: '' };
      setColorList(newColorList);
      if (onChange) {
        onChange({ colorList: newColorList, colorIndex });
      }
    }
    setColor('');
    setIsActive(false);
  }, [onChange, colorIndex, colorList, defaultColorList]);

  /* 执行选择颜色选项索引操作 */
  const handleColorIndexChange = useCallback(
    index => {
      if (index === colorIndex && isActive) setIsActive(false);
      else {
        setIsActive(true);
        setColorIndex(index);
        if (onChange) {
          onChange({ colorList, colorIndex: index });
        }
      }
    },
    [onChange, isActive, colorList, colorIndex]
  );

  /* 执行设置颜色操作 */
  const handleSetColorChange = useCallback(
    color => {
      const { rgb, hex } = color || {};
      const { r, g, b, a } = rgb || {};
      /* 是否存在颜色数组 */
      if (defaultColorList?.length) {
        const newColorList = JSON.parse(JSON.stringify(colorList));
        if (isActive) {
          newColorList[colorIndex].hex = hex;
          newColorList[colorIndex].rgba = `rgba(${r},${g},${b},${a})`;
          setColorList(newColorList);
          if (onChange) {
            onChange({ colorList: newColorList, colorIndex });
          }
        }
      } else {
        /* 重置当前颜色 */
        setColor(hex);
        if (onChange) {
          onChange({ colorList: [{ hex, rgba: `rgba(${r},${g},${b},${a})` }], colorIndex: 0 });
        }
      }
    },
    [onChange, isActive, colorIndex, colorList, defaultColorList]
  );

  /* 初始化默认颜色 */
  useEffect(() => {
    setColor(defaultColor);
  }, [defaultColor]);

  /* 初始化颜色列表 */
  useEffect(() => {
    setColorList(defaultColorList);
  }, [defaultColorList]);

  /* 处理点击外部操作 */
  useClickOutside(componentRef, () => {
    setIsActive(false);
  });

  return (
    <div className={classes} ref={componentRef}>
      <div className="doga-color-picker-color-title">{title}</div>
      <div className="doga-color-picker-color-group">
        {/* 默认颜色 */}
        <div className={classNames('color', 'default')} onClick={() => handleDefaultColorChange()}>
          <div style={{ backgroundColor: color }} />
        </div>
        {/* 透明颜色 */}
        <div className={classNames('color', 'default', 'transparent')} onClick={() => handleResetColorChange()} />
        {/* 颜色列表 */}
        {Boolean(defaultColorList && defaultColorList.length > 1) &&
          colorList.map((color, index) => {
            return (
              <div key={index} className="color" onClick={() => handleColorIndexChange(index)}>
                <div style={{ backgroundColor: color?.rgba }} />
              </div>
            );
          })}
      </div>
      {isActive && (
        <div className="doga-color-picker-color-popup">
          <ChromePicker disableAlpha={disableAlpha} color={colorList?.length ? colorList[colorIndex]?.rgba : color} onChange={handleSetColorChange} />
        </div>
      )}
    </div>
  );
};

export default ColorPicker;
