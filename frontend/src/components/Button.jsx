import React from "react";

const Button = ({ name, onClick }) => {
  return (
    <button
      className="w-[200px] h-10 flex items-center justify-center text-lg bg-gray text-white"
      onClick={onClick}
    >
      {name}
    </button>
  );
};

export default Button;
