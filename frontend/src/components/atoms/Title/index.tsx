import { TitleProps } from '@/interface/title';
import { JSX } from 'react';

const Title: React.FC<TitleProps> = ({ children, level, ...rest }) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  return <Tag {...rest}>{children}</Tag>;
};

export default Title;
