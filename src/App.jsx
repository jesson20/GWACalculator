import React, { useState, useEffect } from 'react';
import { FaX } from 'react-icons/fa6';

function App() {
  const [inputSets, setInputSets] = useState(() => {
    const storedInputSets = localStorage.getItem('inputSets');
    return storedInputSets ? JSON.parse(storedInputSets) : [{ id: 1, units: '', grades: '' }];
  });
  const [gwa, setGwa] = useState(null);

  useEffect(() => {
    localStorage.setItem('inputSets', JSON.stringify(inputSets));
  }, [inputSets]);

  const handleAddInputSet = () => {
    const newInputSet = { id: inputSets.length + 1, units: '', grades: '' };
    setInputSets([...inputSets, newInputSet]);
  };

  const handleInputChange = (id, inputName, value) => {
    const updatedInputSets = inputSets.map(inputSet =>
      inputSet.id === id ? { ...inputSet, [inputName]: value } : inputSet
    );
    setInputSets(updatedInputSets);
  };

  const handleRemoveInputSet = (id) => {
    const updatedInputSets = inputSets.filter(inputSet => inputSet.id !== id);
    setInputSets(updatedInputSets);
  };

  const calculateGrade = () => {
    let totalUnits = 0;
    let totalGrades = 0;

    inputSets.forEach(inputSet => {
      const units = parseFloat(inputSet.units);
      const grades = parseFloat(inputSet.grades);
      if (!isNaN(units)) {
        totalUnits += units;
      }
      if (!isNaN(grades)) {
        totalGrades += (grades * units);
      }
    });

    const GWA = totalGrades / totalUnits;
    setGwa(GWA.toFixed(4));
  };

  return (
      <div className="max-h-screen bg-white box-border lg:mx-36">
        <h2 className='text-l mx-3  my-3 pb-5 lg:text-4xl lg:my-6 text-center'>Get your <span className='text-lime-400'>
          General Weighted Average</span> here!</h2>

        <div className="text-3xl lg:text-7xl text-center border rounded-md border-solid
         border-lime-600 pb-4 m-3 lg:mx-96">
         
          <h6 className='text-xs font-thin lg:text-xl'>GWA</h6>
          <p className='font-bold text-lime-400'>{gwa !== null ? gwa : 0}</p>
          
        </div>

        <div className="p-4 lg:mx-96">

          <div className='flex flex-wrap lg:block'>
            {inputSets.map(inputSet => (

              <div key={inputSet.id} className="flex">

                <button className="text-red-600 text-base pr-1 lg:text-lg" 
                onClick={() => handleRemoveInputSet(inputSet.id)}><FaX/>
                </button>
                
                <div className='flex-1 my-2 mx-1'>

                <input className='w-full flex p-2 border border-solid border-lime-600 rounded-sm text-sm lg:p-3'
                  type="number"
                  placeholder="Enter Units"
                  value={inputSet.units}
                  onChange={e => handleInputChange(inputSet.id, 'units', e.target.value)}
                />

              </div>
              
              <div className='flex-1 my-2 mx-1'>

              <input className=' w-full p-2  border border-solid border-lime-600 rounded-sm text-sm lg:p-3'
                type="number"
                placeholder="Enter Grades"
                value={inputSet.grades}
                onChange={e => handleInputChange(inputSet.id, 'grades', e.target.value)}
              />

              </div>
             
            </div>
            
          ))}

          </div>


          <div className='flex gap-5 justify-center pt-6 lg:gap-10'>

            <button  className="border-none outline-none py-2 px-4 bg-lime-800 text-white text-sm 
            cursor-pointer rounded-3xl text-center font-bold lg:py-3 lg:px-6 lg:text-lg" 
            onClick={handleAddInputSet}>
              Add
            </button>

            <button  className="border-none outline-none py-2 px-4 bg-lime-800 text-white text-sm 
            cursor-pointer rounded-3xl text-center font-bold lg:py-3 lg:px-6 lg:text-lg" 
            onClick={calculateGrade}>
              Calculate
            </button>

          </div>

        </div>

      </div>
        
  );
}

export default App;
