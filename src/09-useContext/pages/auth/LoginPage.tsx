import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router';

export const LoginPage = () => {
  return (
    <div className="flex flex-col items-center min-h-screen">
      <h1 className="text-4xl font-bold">Login Page</h1>
      <hr />

      <form className="flex flex-col gap-2 my-10">
        <Input type="number" placeholder="User ID" />

        <Button type="submit">Login</Button>
      </form>

      <Link to="/about" className="hover:text-blue-500 underline text-2xl">
        <Button variant="ghost">Go to About Page</Button>
      </Link>
    </div>
  );
};
