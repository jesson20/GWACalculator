const ActionButtons = ({ onAdd }) => { 
  return (
    <div className='flex gap-5 justify-center pt-6 lg:gap-10'>
      <button 
        className="border-none outline-none py-2 px-4 bg-lime-800 text-white text-sm cursor-pointer rounded-3xl text-center font-bold lg:py-3 lg:px-6 lg:text-lg" 
        onClick={onAdd}
      >
        Add
      </button>
    </div>
  );
};

export default ActionButtons;