import React from 'react';

const GWADisplay = ({ gwa }) => {
  // Format the number to exactly 2 decimal places
  const formattedGWA = gwa !== null ? 
    parseFloat(gwa).toFixed(2) : 
    '0';

  return (
    <div className="text-3xl lg:text-7xl text-center border rounded-md border-solid border-lime-600 pb-4 m-3 lg:mx-96">
      <h6 className='text-xs font-thin lg:text-xl'>GWA</h6>
      <p className='font-bold text-lime-400'>{formattedGWA}</p>
    </div>
  );
};

export default GWADisplay;