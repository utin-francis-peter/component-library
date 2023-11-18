import React from "react";

const Link = ({ children, href, icon, isPairedWithIcon }) => {
  return (
    <a
      href={href}
      className="flex items-center gap-2 cursor-pointer hover:underline text-blue-500 hover:text-blue-600">
      {children}
      {isPairedWithIcon && <i className={icon}></i>}
    </a>
  );
};

export default Link;
