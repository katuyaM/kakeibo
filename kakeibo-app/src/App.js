import React, { useEffect, useState } from 'react';
import './App.css';

const Kakeibo = () => {
  const [kakeibo, setKakeibo] = useState([]);
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');


  const handleAddKakeibo = () => {
    if (!amount || !category || !date) {
      alert('追加しました');
      return;
    }

    const newKakeibo = {
      amount,
      category,
      date,
    };

    setKakeibo([...kakeibo, newKakeibo]);
    setAmount('');
    setCategory('');
    setDate('');
  };

  const handleDeleteExpense = (index) => {
    const updatedKakeibo = [...kakeibo];
    updatedKakeibo.splice(index, 1);
    setKakeibo(updatedKakeibo);
  };

  return (
    <div>
      <h1>家計簿</h1>
      <div>
        <label>
          金額:
          <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          カテゴリー:
          <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          日付:
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </label>
      </div>
      <div className="center">
        <button onClick={handleAddKakeibo}>登録</button>
      </div>

      <ul>
        {kakeibo.map((expense, index) => (
          <li key={index}>
            <span>{`金額: ${expense.amount}, `}</span>
            <span>{`カテゴリー: ${expense.category}, `}</span>
            <span>{`日付: ${expense.date}`}</span>
            <button onClick={() => handleDeleteExpense(index)}>削除</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Kakeibo;
