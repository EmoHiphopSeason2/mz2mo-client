import React from 'react';

import clsx from 'clsx';

interface TitleProps {
  title?: string;
  subTitle?: string;
  className?: React.ComponentProps<'button'>['className'];
}

const Title = ({ title, subTitle, className }: TitleProps) => {
  return (
    <div
      className={clsx(
        className,
        'flex flex-col items-center flex-1 text-white',
      )}
    >
      <span className="text-h2">{title}</span>
      <span className="text-body3">{subTitle}</span>
    </div>
  );
};

export default Title;
