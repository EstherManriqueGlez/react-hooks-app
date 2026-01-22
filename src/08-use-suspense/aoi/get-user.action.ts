

export interface User {
  id: number;
  name: string;
  location: string;
  role: string;
}


export const getUserAction = async (id: number) => {
  console.log('Fetching user data...');

  await new Promise((resolve) => setTimeout(resolve, 2000));

  console.log('User data fetched resolved.');

  

  return {
    id,
    name: 'Rene Manrique',
    location: 'Ottawa, Canada',
    role: 'Software Engineer',
  }
}