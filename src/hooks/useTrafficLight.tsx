import { useState, useEffect } from "react";


const colors = {
  red: 'bg-red-500 animate-pulse',
  yellow: 'bg-yellow-500 animate-pulse',
  green: 'bg-green-500 animate-pulse',
};

// Tipamos los colores del semáforo usando keyof para mayor escalabilidad
type TrafficLightColor = keyof typeof colors;



export const useTrafficLight = () => {
  const [light, setLight] = useState<TrafficLightColor>('red');
  const [countDown, setCountDown] = useState(5);

  // countDown effect
  useEffect(() => {
    if (countDown === 0) return;

    const intervalId = setInterval(() => {
      setCountDown((prev) => prev - 1);
    }, 1000);

    // OJO: importante siempre limpiar los efectos secundarios
    return () => {
      clearInterval(intervalId);
    };
  }, [countDown]);

  // Light change color effect
  useEffect(() => {
    if (countDown > 0) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCountDown(5);

    if (light === 'red') {
      setLight('green');
      return;
    }

    if (light === 'yellow') {
      setLight('red');
      return;
    }

    if (light === 'green') {
      setLight('yellow');
      return;
    }
  }, [countDown, light]);


  return {

    // Properties / Pros
    countDown,
    colors,
    light,

    // Computed
    percentage: (countDown / 5) * 100,
    redLight: light === 'red' ? colors.red : 'bg-gray-500',
    yellowLight: light === 'yellow' ? colors.yellow : 'bg-gray-500',
    greenLight: light === 'green' ? colors.green : 'bg-gray-500',

    // Methods
  }
}
