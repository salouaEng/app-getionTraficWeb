import React from 'react';

const Card = ({ children, className, onClick }) => {
  return (
    <div className={`${className} rounded-xl`} onClick={onClick}>
      {children}
    </div>
  );
};

export default Card;
