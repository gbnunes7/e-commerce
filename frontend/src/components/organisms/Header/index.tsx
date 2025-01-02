import NavHeader from '../NavHeader';
import UserActions from '@/components/molecules/UserActions';
import Logo from '@/components/atoms/Logo';

const Header = () => {
  return (
    <header className="flex px-32 py-6 h-[100px] items-end border-b-[1px] border-gray-300 justify-between">
      <Logo />
      <NavHeader />
      <UserActions />
    </header>
  );
};

export default Header;
