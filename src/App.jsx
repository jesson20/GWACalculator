import React, { useState, useEffect } from 'react';
import GWADisplay from './components/GWADisplay';
import InputSet from './components/InputSet';
import ActionButtons from './components/ActionButtons';

function App() {
  const [inputSets, setInputSets] = useState(() => {
    const storedInputSets = localStorage.getItem('inputSets');
    return storedInputSets ? JSON.parse(storedInputSets) : [{ id: 1, units: '', grades: '' }];
  });
  const [gwa, setGwa] = useState(null);

  useEffect(() => {
    localStorage.setItem('inputSets', JSON.stringify(inputSets));
    calculateGrade(); // Add this line to calculate whenever inputSets changes
  }, [inputSets]);

  const handleAddInputSet = () => {
    const newInputSet = { id: Date.now(), units: '', grades: '' };
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
    let hasValidInputs = false;

    inputSets.forEach(inputSet => {
      const units = parseFloat(inputSet.units);
      const grades = parseFloat(inputSet.grades);
      
      if (!isNaN(units) && !isNaN(grades)) {
        totalUnits += units;
        totalGrades += (grades * units);
        hasValidInputs = true;
      }
    });

    if (hasValidInputs && totalUnits > 0) {
      const GWA = totalGrades / totalUnits;
      setGwa(GWA.toFixed(4));
    } else {
      setGwa(null);
    }
  };

  return (
    <div className="max-h-screen bg-white box-border lg:mx-36">
      <h2 className='text-l mx-3 my-3 pb-5 lg:text-4xl lg:my-6 text-center'>
        Get your <span className='text-lime-400'>General Weighted Average</span> here!
      </h2>

      <GWADisplay gwa={gwa} />

      <div className="p-4 lg:mx-96">
        <div className='flex flex-wrap lg:block'>
          {inputSets.map(inputSet => (
            <InputSet
              key={inputSet.id}
              id={inputSet.id}
              units={inputSet.units}
              grades={inputSet.grades}
              onInputChange={handleInputChange}
              onRemove={handleRemoveInputSet}
            />
          ))}
        </div>

        <ActionButtons onAdd={handleAddInputSet} />
      </div>
    </div>
  );
}

export default App;