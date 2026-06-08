import React from 'react';
import currency from 'currency.js';

const CurrencyInput: React.FC = () => {
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const inputValue = event.target.value;
    const numberFromInput = parseFloat(inputValue);
    const randomValue = Math.random();
    
    if (isNaN(numberFromInput)) {
      console.log('Введите число');
      return;
    }
    
    const sum = currency(numberFromInput).add(randomValue).value;
    console.log(`${numberFromInput} + ${randomValue.toFixed(4)} = ${sum.toFixed(4)}`);
  };

  return (
    <li>
      <label htmlFor="currency-input">Калькулятор: </label>
      <input
        id="currency-input"
        type="number"
        step="any"
        placeholder="Введите число"
        onChange={handleChange}
      />
      <span style={{ marginLeft: '10px', fontSize: '12px' }}>
        (Смотри консоль F12 или Cmd + Option + J)
      </span>
    </li>
  );
};

export default CurrencyInput;
