// components/Dice.tsx
import React from 'react';

interface DiceProps {
  face: number;
}

const Dice: React.FC<DiceProps> = ({ face }) => {
  const faces = [
    // 1
    <div key="1" className="w-16 h-16 flex items-center justify-center bg-white border-2 border-gray-500 rounded-lg relative">
      <div className="w-3 h-3 bg-black rounded-full"></div>
    </div>,
    // 2
    <div key="2" className="w-16 h-16 flex items-center justify-center bg-white border-2 border-gray-500 rounded-lg relative">
      <div className="w-3 h-3 bg-black rounded-full absolute top-2 left-2"></div>
      <div className="w-3 h-3 bg-black rounded-full absolute bottom-2 right-2"></div>
    </div>,
    // 3
    <div key="3" className="w-16 h-16 flex items-center justify-center bg-white border-2 border-gray-500 rounded-lg relative">
      <div className="w-3 h-3 bg-black rounded-full absolute top-2 left-2"></div>
      <div className="w-3 h-3 bg-black rounded-full"></div>
      <div className="w-3 h-3 bg-black rounded-full absolute bottom-2 right-2"></div>
    </div>,
    // 4
    <div key="4" className="w-16 h-16 flex items-center justify-center bg-white border-2 border-gray-500 rounded-lg relative">
      <div className="w-3 h-3 bg-black rounded-full absolute top-2 left-2"></div>
      <div className="w-3 h-3 bg-black rounded-full absolute top-2 right-2"></div>
      <div className="w-3 h-3 bg-black rounded-full absolute bottom-2 left-2"></div>
      <div className="w-3 h-3 bg-black rounded-full absolute bottom-2 right-2"></div>
    </div>,
    // 5
    <div key="5" className="w-16 h-16 flex items-center justify-center bg-white border-2 border-gray-500 rounded-lg relative">
      <div className="w-3 h-3 bg-black rounded-full absolute top-2 left-2"></div>
      <div className="w-3 h-3 bg-black rounded-full"></div>
      <div className="w-3 h-3 bg-black rounded-full absolute bottom-2 left-2"></div>
      <div className="w-3 h-3 bg-black rounded-full absolute bottom-2 right-2"></div>
      <div className="w-3 h-3 bg-black rounded-full absolute top-2 right-2"></div>
    </div>,
    // 6
    <div key="6" className="w-16 h-16 flex items-center justify-center bg-white border-2 border-gray-500 rounded-lg relative">
      <div className="w-3 h-3 bg-black rounded-full absolute top-2 left-2"></div>
      <div className="w-3 h-3 bg-black rounded-full absolute top-2 right-2"></div>
      <div className="w-3 h-3 bg-black rounded-full absolute bottom-2 left-2"></div>
      <div className="w-3 h-3 bg-black rounded-full absolute bottom-2 right-2"></div>
      <div className="w-3 h-3 bg-black rounded-full absolute top-2 center-2"></div>
      <div className="w-3 h-3 bg-black rounded-full absolute bottom-2 center-2"></div>
    </div>
  ];

  return (
    <div className="flex justify-center items-center">
      {faces[face - 1]}
    </div>
  );
};

export default Dice;
