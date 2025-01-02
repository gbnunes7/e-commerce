import LinkItem from '@/components/atoms/LinkItem';
import ListItem from '@/components/atoms/ListItem';

const NavList = () => {
  return (
    <ul className="flex gap-8 text-lg">
      <LinkItem href={'/'}>
        <ListItem>Home</ListItem>
      </LinkItem>
      <LinkItem href={'/contact'}>
        <ListItem>Contact</ListItem>
      </LinkItem>
      <LinkItem href={'/about'}>
        <ListItem>About</ListItem>
      </LinkItem>
      <LinkItem href={'/login'}>
        <ListItem>Sign up</ListItem>
      </LinkItem>
    </ul>
  );
};

export default NavList;
