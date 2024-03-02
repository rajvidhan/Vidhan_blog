import React from "react";
import { useSelector } from "react-redux";

const ThemeChanger = ({ children }) => {
  const { theme } = useSelector((state) => state.theme);

  return (
    <div className={theme}>
      <div
        className={`${
          theme === "light" ? "bg-white text-black" : "bg-[rgb(16,23,42)] text-gray-200"
        } min-h-screen`}
      >
        {children}
      </div>
    </div>
  );
};

export default ThemeChanger;
