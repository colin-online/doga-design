/*
 * @Author: 东林
 * @Date: 2022-04-23 20:42:24
 * @description: 数据函数组件
 */
import React, { FC, useRef, useState, useCallback, useEffect } from 'react';
import { isEqual } from 'lodash-es';
import classNames from 'classnames';
import ReactJson from 'react-json-view';
import useClickOutside from '../../hooks/useClickOutside';

/* 已选属性类型定义 */
export type selectProps = {
  /* 选项名称 */
  name: string;
  /* 选项名称空间 */
  namespace: Array<string>;
  /* 选项类型 */
  type: string;
  /* 选项值 */
  value: string;
};

/* 数据属性接口定义 */
export interface JsonProps {
  /* 数据源 */
  dataSource: object;
  /* 最大限制 */
  max?: number;
  /* 已选列表 */
  selectedList?: Array<selectProps>;
  /* 更新事件 */
  onChange?: (value: any) => void;
}

export const Json: FC<JsonProps> = props => {
  const { dataSource = {}, max, selectedList = [], onChange } = props || {};
  /* 组件元素 */
  const componentRef = useRef<HTMLDivElement>(null);
  /* 选项框元素 */
  const selectRef = useRef<HTMLDivElement>(null);
  /* 是否显示选项栏 */
  const [isActive, setIsActive] = useState(false);
  /* 已选项列表 */
  const [selectList, setSelectList] = useState<selectProps | any>([]);

  /* 组件样式 */
  const classes = classNames('doga-json', {});

  /* 执行选择选项操作 */
  const handleSelectClick = useCallback(
    data => {
      if (max && selectList?.length + 1 > max) return;
      const result = selectList.some((children: selectProps) => isEqual(children, data));
      if (!result) {
        setSelectList([...selectList, data]);
        if (onChange) onChange([...selectList, data]);
        setTimeout(() => {
          if (selectRef?.current) {
            selectRef.current.scrollLeft = 99999 || 0;
          }
        }, 0);
      }
    },
    [onChange, max, selectList]
  );

  /* 执行删除对应选项操作 */
  const handleDeleteClick = useCallback(
    selectIndex => {
      setSelectList([...selectList.filter((_item: any, index: any) => index !== selectIndex)]);
      if (onChange) onChange([...selectList.filter((_item: any, index: any) => index !== selectIndex)]);
    },
    [onChange, selectList]
  );

  /* 执行切换显示隐藏选项栏操作 */
  const handleIsActiveChange = useCallback(() => setIsActive(!isActive), [isActive]);

  /* 处理点击外部操作 */
  useClickOutside(componentRef, () => {
    setIsActive(false);
  });

  /* 初始化数据 */
  useEffect(() => {
    if (selectedList.length > 0) setSelectList(selectedList);
  }, [selectedList]);

  return (
    <div className={classes} ref={componentRef}>
      <div className="doga-json-select" onClick={() => handleIsActiveChange()}>
        <div className="doga-json-select-list" ref={selectRef}>
          {selectList.map((children: selectProps, index: React.Key | null | undefined) => {
            const { name } = children || {};
            return (
              <div key={index} className="doga-json-select-children">
                <span>{name}</span>
                <i
                  className="iconfont icon-close"
                  onClick={e => {
                    e.stopPropagation();
                    handleDeleteClick(index);
                  }}
                />
              </div>
            );
          })}
        </div>
        <i className={classNames('iconfont', isActive ? 'icon-up' : 'icon-down')} />
      </div>
      {isActive && (
        <div className="doga-json-container">
          <div className="doga-json-view">
            {Object.keys(dataSource).length > 0 ? (
              <ReactJson
                src={dataSource}
                indentWidth={2}
                sortKeys={true}
                quotesOnKeys={false}
                enableClipboard={false}
                displayDataTypes={false}
                displayObjectSize={false}
                collapseStringsAfterLength={false}
                onSelect={val => handleSelectClick(val)}
              />
            ) : (
              <div className="doga-json-empty">尚未关联数据源</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Json;
