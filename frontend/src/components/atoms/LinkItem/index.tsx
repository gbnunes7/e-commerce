import { LinkProps } from '@/interface/linkitem';
import Link from 'next/link';

const LinkItem: React.FC<LinkProps> = ({
  children,
  href,
  className,
  target,
}) => {
  return (
    <Link href={href} className={className} target={target}>
      {children}
    </Link>
  );
};

export default LinkItem;
