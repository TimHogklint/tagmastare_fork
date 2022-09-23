import React from 'react';

function submit() {
  // Basic click
  alert('You clicked me!');
}
const Button = (props) => {
  
  return (
        // Supplying a classname breaks styling.
        <button className={props.className ?? 'default-btn'}
          onClick={submit}>
          <text className="btn-text">
          {/* Set value of label to change defualt name. */}
          {props.label ?? 'Button'}</text>
        </button>
    )
}

export default Button;