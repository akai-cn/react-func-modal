import React from 'react';
import './customModal.css';

export default (props: any) => {
  return (
    <div className="wrap">
      <p>提示/警告/通知</p>
      {props.children}
    </div>
  );
};
