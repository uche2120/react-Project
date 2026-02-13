import React, { useState } from 'react';
import './App.css';

function App() {
  const [display, setDisplay] = useState('0');
  const [prevValue, setPrevValue] = useState(null);
  const [operator, setOperator] = useState(null);
  const [newInput, setNewInput] = useState(false);

  // Handle digit buttons
  const handleDigit = (digit) => {
    if (display === 'Error') {
      setDisplay(digit);
      setNewInput(false);
      return;
    }
    if (newInput) {
      setDisplay(digit);
      setNewInput(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  // Handle decimal point
  const handleDecimal = () => {
    if (display === 'Error') {
      setDisplay('0.');
      setNewInput(false);
      return;
    }
    if (newInput) {
      setDisplay('0.');
      setNewInput(false);
    } else if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  // Handle operator buttons (+, -, *, /)
  const handleOperator = (op) => {
    if (display === 'Error') return;
    const current = parseFloat(display);
    if (operator && !newInput) {
      // Compute previous result before applying new operator
      const result = calculate(prevValue, current, operator);
      setDisplay(String(result));
      setPrevValue(result);
    } else {
      setPrevValue(current);
    }
    setOperator(op);
    setNewInput(true);
  };

  // Handle equals button
  const handleEquals = () => {
    if (display === 'Error') return;
    if (operator && prevValue !== null && !newInput) {
      const current = parseFloat(display);
      const result = calculate(prevValue, current, operator);
      setDisplay(String(result));
      setPrevValue(null);
      setOperator(null);
      setNewInput(true);
    }
  };

  // Clear everything
  const handleClear = () => {
    setDisplay('0');
    setPrevValue(null);
    setOperator(null);
    setNewInput(false);
  };

  // Backspace: remove last character
  const handleBackspace = () => {
    if (display === 'Error') {
      setDisplay('0');
      return;
    }
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
    }
  };

  // Calculation helper
  const calculate = (a, b, op) => {
    a = Number(a);
    b = Number(b);
    switch (op) {
      case '+': return a + b;
      case '-': return a - b;
      case '*': return a * b;
      case '/':
        if (b === 0) return 'Error';
        return a / b;
      default: return b;
    }
  };

  return (
    <div className="calculator">
      <div className="display">{display}</div>
      <div className="buttons">
        <button className="function" onClick={handleClear}>AC</button>
        <button className="function" onClick={handleBackspace}>⌫</button>
        <button className="operator" onClick={() => handleOperator('/')}>÷</button>
        <button className="operator" onClick={() => handleOperator('*')}>×</button>

        <button onClick={() => handleDigit('7')}>7</button>
        <button onClick={() => handleDigit('8')}>8</button>
        <button onClick={() => handleDigit('9')}>9</button>
        <button className="operator" onClick={() => handleOperator('-')}>−</button>

        <button onClick={() => handleDigit('4')}>4</button>
        <button onClick={() => handleDigit('5')}>5</button>
        <button onClick={() => handleDigit('6')}>6</button>
        <button className="operator" onClick={() => handleOperator('+')}>+</button>

        <button onClick={() => handleDigit('1')}>1</button>
        <button onClick={() => handleDigit('2')}>2</button>
        <button onClick={() => handleDigit('3')}>3</button>
        <button className="equals" onClick={handleEquals}>=</button>

        <button className="zero" onClick={() => handleDigit('0')}>0</button>
        <button onClick={handleDecimal}>.</button>
        {/* Empty div for grid alignment (zero spans 2 columns) */}
        <div></div>
      </div>
    </div>
  );
}

export default App;
