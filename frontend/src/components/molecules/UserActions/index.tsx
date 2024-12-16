import InputSearch from '../InputSearch';
import UserActionsList from '../UserActionsList';

const UserActions = () => {
  return (
    <div className='flex items-center'>
      <InputSearch />
      <UserActionsList />
    </div>
  );
};

export default UserActions;
