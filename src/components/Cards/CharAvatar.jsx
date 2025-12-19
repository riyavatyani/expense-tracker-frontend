import React from "react";
import { getInitials } from "../../utils/helper";

const CharAvatar = ({ fullName, width, height, textSize }) => {
  return (
    <div
      className={`${width || "w-12"} ${height || "h-12"} ${
        textSize || "text-base"
      } flex items-center justify-center rounded-full bg-slate-400 text-white font-semibold`}
    >
      {getInitials(fullName || "")}
    </div>
  );
};

export default CharAvatar;
