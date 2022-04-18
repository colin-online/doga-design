import React, { FC } from 'react';
import classNames from 'classnames';

export interface TemplateProps {
  template: string;
}

export const Template: FC<TemplateProps> = () => {
  // const {} = props || {};
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
