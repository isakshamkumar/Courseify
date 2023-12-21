import React, { ReactNode } from "react";
interface ButtonProps{
    onClick:()=>void,
    children:ReactNode
}
const Button: React.FC<ButtonProps> = ({children,onClick}) => {
  return (
    <button
      onClick={onClick}
      className="inline-block rounded bg-emerald-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-emerald-700 focus:outline-none focus:ring focus:ring-yellow-400"
    >
     {children}
    </button>
  );
};

export default Button;
