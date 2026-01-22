import { useContext, useState } from 'react';
import { UserContext } from '@/09-useContext/context/UserContext';
import { Link, useNavigate } from 'react-router';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';


export const LoginPage = () => {

  const { login } = useContext(UserContext);
  const [userid, setUserid] = useState('');

  const navigation = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const result = login(+userid);

    if (!result) {
      toast.error('Login failed. User not found.');
      return;
    }

    navigation('/profile');
    // toast.success('Login successful!');
  };

  return (
    <div className="flex flex-col items-center min-h-screen">
      <h1 className="text-4xl font-bold">Login Page</h1>
      <hr />

      <form className="flex flex-col gap-2 my-10" onSubmit={handleSubmit}>
        <Input
          type="number"
          placeholder="User ID"
          value={userid}
          onChange={(event) => setUserid(event.target.value)}
        />

        <Button type="submit">Login</Button>
      </form>

      <Link to="/about" className="hover:text-blue-500 underline text-2xl">
        <Button variant="ghost">Go to About Page</Button>
      </Link>
    </div>
  );
};
