/*
 * @Author: 东林
 * @Date: 2022-03-14 20:34:56
 * @description: Progress函数组件
 */
import React, { CSSProperties, FC } from 'react';

/* Progress属性接口定义 */
export interface ProgressProps {
  /* 进度 */
  percent: number;
  /* 高度 */
  strokeHeight?: number;
  /* 显示文案 */
  showText?: boolean;
  /* 样式 */
  styles?: CSSProperties;
  /* 主题 */
  theme?: any;
}

/* Progress函数组件 */
export const Progress: FC<ProgressProps> = props => {
  const { percent, strokeHeight, showText, styles, theme } = props || {};
  return (
    <div className="doga-progress-bar" style={styles}>
      <div className="doga-progress-bar-outer" style={{ height: `${strokeHeight}px` }}>
        <div className={`doga-progress-bar-inner color-${theme}`} style={{ width: `${percent}%` }}>
          {showText && <span className="inner-text">{`${percent}%`}</span>}
        </div>
      </div>
    </div>
  );
};

/* Progress默认属性 */
Progress.defaultProps = {
  strokeHeight: 15,
  showText: true,
  theme: 'primary',
};

export default Progress;
