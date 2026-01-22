import { UserContext } from '@/09-useContext/context/UserContext';
import { Button } from '@/components/ui/button';
import { use } from 'react';

export const ProfilePage = () => {
  const { user } = use(UserContext);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl">User Profile</h1>
      <hr className="my-4" />

      <pre className="my-4 w-[80%] overflow-x-auto">{JSON.stringify( user , null, 2)}</pre>

      <Button variant="destructive">Logout</Button>
    </div>
  );
};
