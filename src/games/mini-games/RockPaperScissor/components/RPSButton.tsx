import React from 'react';

const RPSButton = ({
  handleButtonClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {},
  btnText = '',
  btnClass = '',
}) => {
  return (
    <button
      onClick={(e) => {
        handleButtonClick(e)
      }}
      className={btnClass}
    >
      {btnText}
    </button>
  );
};

export default RPSButton;
