import React, { useState, useEffect } from 'react';
import './App.css';

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
    <div>
      <div className="max-h-screen bg-white p-10">
        <h2 className="text-2xl">GWA Calculator</h2>
        <div className="GWAApp">
          <div className='column'>
            <h2>Units</h2>
            <h2>Grades</h2>
          </div>

          {inputSets.map(inputSet => (
            <div key={inputSet.id} className="input-container">
              <input
                type="number"
                placeholder="Enter Units"
                value={inputSet.units}
                onChange={e => handleInputChange(inputSet.id, 'units', e.target.value)}
              />
              <input
                type="number"
                placeholder="Enter Grades"
                value={inputSet.grades}
                onChange={e => handleInputChange(inputSet.id, 'grades', e.target.value)}
              />
              <button onClick={() => handleRemoveInputSet(inputSet.id)}>X</button>
            </div>
          ))}

          <div className="buttons">
            <button onClick={handleAddInputSet}>Add</button>
            <button onClick={calculateGrade}>Calculate</button>
          </div>

          <h2 className='resultTitle'>Computation Result</h2>
          <br />

          {gwa !== null && (
            <div className="result">
              <p>GWA: {gwa}</p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default App;
