import React from "react";

const ButtonWithProps = ({ buttonClassname, textButton }) => {
  return (
    <button className={`h-10 px-6 font-semibold rounded-md ${buttonClassname}`}>
      {textButton}
    </button>
  );
};

export default ButtonWithProps;
