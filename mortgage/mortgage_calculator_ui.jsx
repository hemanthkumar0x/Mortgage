// File: src/App.js
import React, { useState } from 'react';
import InputForm from './components/InputForm';
import Results from './components/Results';
import './App.css';

function App() {
  const [values, setValues] = useState({ loan: '', rate: '', term: '' });
  const [monthlyPayment, setMonthlyPayment] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const calculatePayment = () => {
    const principal = parseFloat(values.loan);
    const interestRate = parseFloat(values.rate) / 100 / 12;
    const numberOfPayments = parseFloat(values.term) * 12;

    if (principal && interestRate && numberOfPayments) {
      const x = Math.pow(1 + interestRate, numberOfPayments);
      const monthly = (principal * x * interestRate) / (x - 1);
      setMonthlyPayment(monthly.toFixed(2));
    }
  };

  return (
    <div className="app-container">
      <h1>Mortgage Calculator</h1>
      <InputForm onChange={handleChange} values={values} />
      <button onClick={calculatePayment} className="calculate-btn">Calculate</button>
      {monthlyPayment && <Results payment={monthlyPayment} />}
    </div>
  );
}

export default App;

// File: src/components/InputForm.js
import React from 'react';

const InputForm = ({ onChange, values }) => {
  return (
    <form className="form-section">
      <label>
        Loan Amount:
        <input type="number" name="loan" value={values.loan} onChange={onChange} />
      </label>
      <label>
        Interest Rate (%):
        <input type="number" name="rate" value={values.rate} onChange={onChange} />
      </label>
      <label>
        Term (Years):
        <input type="number" name="term" value={values.term} onChange={onChange} />
      </label>
    </form>
  );
};

export default InputForm;

// File: src/components/Results.js
import React from 'react';

const Results = ({ payment }) => {
  return (
    <div className="results">
      <h2>Estimated Monthly Payment</h2>
      <p>${payment}</p>
    </div>
  );
};

export default Results;

// File: src/App.css
body {
  font-family: sans-serif;
  background: #f4f4f4;
  margin: 0;
  padding: 0;
}

.app-container {
  max-width: 600px;
  margin: 2rem auto;
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.form-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

input {
  padding: 0.5rem;
  font-size: 1rem;
  width: 100%;
  box-sizing: border-box;
}

.calculate-btn {
  padding: 0.75rem;
  font-size: 1rem;
  background: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 1rem;
}

.calculate-btn:hover {
  background: #0056b3;
}

.results {
  margin-top: 2rem;
  text-align: center;
}
