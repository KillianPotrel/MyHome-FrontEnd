import React, { useState } from 'react';
import './Switch.css'
import { ArticleWarning } from '../api/ArticleWarning';

type SwitchProps = {
  id?: number,
  category: string,
  isChecked: boolean,
  handleClick?: any
}

const Switch = ({id, category, isChecked, handleClick} : SwitchProps):JSX.Element => {
  
    return (
        <label className="switch">
          <input id={"switch_" + category + "_"+ id} 
            name={"switch_" + category + "_"+ id} 
            type="checkbox" 
            checked={isChecked} 
            onChange={handleClick}
            />
          <span></span>
        </label>
    );
};

export default Switch;