import { SubheadingProps } from '@/interface/subheading';

const Subheading: React.FC<SubheadingProps> = ({ children, ...rest }) => {
  return <span {...rest}>{children}</span>;
};

export default Subheading;
