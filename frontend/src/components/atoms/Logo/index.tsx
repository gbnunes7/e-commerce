import LinkItem from '../LinkItem';
import Title from '../Title';

const Logo = () => {
  return (
    <LinkItem href="/">
      <Title className="font-bold text-2xl" level={1}>
        Exclusive
      </Title>
    </LinkItem>
  );
};

export default Logo;
