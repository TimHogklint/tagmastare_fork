import React from 'react';

function submit() {
  // Basic click
  alert('You clicked me!');
}
const Button = (props) => {
  
    return (
        <button className="btn-default"
          onClick={submit}>
          <text className="btn-text">
          {/* Set value of label to change defualt name. */}
          {props.label ?? 'Button'}</text>
        </button>
    )
}

export default Button;