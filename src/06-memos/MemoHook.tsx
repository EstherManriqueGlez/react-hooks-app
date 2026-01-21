import { useCallback, useState } from 'react';
import { MyTitle } from './ui/MyTitle';
import { MySubTitle } from './ui/MySubTitle';

export const MemoHook = () => {
  const [title, setTitle] = useState('Hola');
  const [subTitle, setSubTitle] = useState('Mundo');

  const handleMyApiCall = useCallback(() => {
    console.log('API called ', subTitle);
  }, [subTitle]);

  return (
    <div className="bg-gradient flex flex-col gap-4">
      <h1 className="text-2xl font-thin text-white">Memo App</h1>

      <MyTitle title={title} />

      <MySubTitle subtitle={subTitle} callMyApi={handleMyApiCall} />

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"
        onClick={() => setTitle('Hello, ' + new Date().getTime())}
      >
        Cambiar Título
      </button>

      <button className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"
        // onClick={() => setSubTitle('World, ' + new Date().getTime())}
        onClick={() => setSubTitle('World')}

      >
        Cambiar Subtítulo
      </button>
    </div>
  );
};
