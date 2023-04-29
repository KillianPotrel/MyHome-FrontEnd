import React from 'react';
import './Switch.css'

const Switch = ():JSX.Element => {
    return (
        <label className="switch">
          <input type="checkbox" />
          <span></span>
        </label>
    );
};

export default Switch;