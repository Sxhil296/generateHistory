import { useState } from 'react';

const Form = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(inputValue);
  };

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="input" className="font-medium text-gray-700 mr-2">
        Enter four words:
      </label>
      <input
        id="input"
        type="text"
        value={inputValue}
        onChange={handleChange}
        className="border rounded-md p-2"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md ml-2">
        Generate
      </button>
    </form>
  );
};

export default Form;
