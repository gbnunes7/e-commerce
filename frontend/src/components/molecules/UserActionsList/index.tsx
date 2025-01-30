import LinkItem from '@/components/atoms/LinkItem';
import ListItem from '@/components/atoms/ListItem';
import { CiHeart, CiShoppingCart, CiUser } from 'react-icons/ci';

const UserActionsList = () => {
  return (
    <ul className="flex text-3xl gap-2">
      <LinkItem href={'/wishlist'}>
        <ListItem>
          <CiHeart />
        </ListItem>
      </LinkItem>
      <LinkItem href={'/cart'}>
        <ListItem>
          <CiShoppingCart />
        </ListItem>
      </LinkItem>
      <LinkItem href={'/account'}>
        <ListItem>
          <CiUser />
        </ListItem>
      </LinkItem>
    </ul>
  );
};

export default UserActionsList;
