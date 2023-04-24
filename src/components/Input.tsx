import React from 'react';

const Input = (props : any) => {
    return (
    <><label
        htmlFor={props.id}
        className="block text-sm font-medium text-gray-700"
      >
        {props.label}
      </label>
      <div className="mt-1">
        <input
          id={props.id}
          name={props.id}
          type={props.type}
          value={props.value}
          onChange={props.onChange}
          autoComplete={props.id}
          //{if(props.required) required}
          className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-amber-500 focus:outline-none focus:ring-amber-300 sm:text-sm"
        />
      </div>
    </>
    );
};

export default Input;