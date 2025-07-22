import React from 'react';
import { FaX } from 'react-icons/fa6';

const InputSet = ({ id, subject, units, grades, onInputChange, onRemove }) => {
  return (
    <div className="flex">
      <div className='flex-1 my-2 mx-1'>
        <input 
          className='w-full flex p-2 border border-solid border-lime-600 rounded-sm text-sm lg:p-3'
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={e => onInputChange(id, 'subject', e.target.value)}
        />
      </div>
      
      <div className='flex-1 my-2 mx-1'>
        <input 
          className='w-full flex p-2 border border-solid border-lime-600 rounded-sm text-sm lg:p-3'
          type="number"
          placeholder="Units"
          value={units}
          onChange={e => onInputChange(id, 'units', e.target.value)}
        />
      </div>
      
      <div className='flex-1 my-2 mx-1'>
        <input 
          className='w-full p-2 border border-solid border-lime-600 rounded-sm text-sm lg:p-3'
          type="number"
          placeholder="Grades"
          value={grades}
          onChange={e => onInputChange(id, 'grades', e.target.value)}
        />
      </div>
      <button 
        className="text-red-600 text-base pl-1 lg:text-lg" 
        onClick={() => onRemove(id)}
      >
        <FaX/>
      </button>
    </div>
  );
};

export default InputSet;