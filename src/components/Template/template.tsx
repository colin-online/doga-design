import classNames from 'classnames';
import React, { FC } from 'react';

export interface TemplateProps {}

export const Template: FC<TemplateProps> = (props) => {
  const {} = props || {};
  /* 组件样式 */
  const classes = classNames('doga-template', {});

  return (
    <div className={classes}>
      {/* Template */}
      Template
    </div>
  );
};

export default Template;
