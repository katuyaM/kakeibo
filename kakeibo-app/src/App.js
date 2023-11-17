import React, { useState } from 'react';
import './App.css';


const Kakeibo = () => {
  const [kakeibo, setKakeibo] = useState([]);
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');

  const categories = ['食費','交通費','娯楽','その他'];

  const handleAddKakeibo = async () => {
    if (!amount || !category || !date) {
      alert('金額、カテゴリー、日付を入力してください。');
      return;
    }

    const newKakeibo = {
      amount,
      category,
      date,
    };

    try {
      // APIにデータをPOST
      const response = await fetch('https://', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newKakeibo),
      });

      if (response.ok) {
        // 登録成功時の処理
        const result = await response.json();
        setKakeibo([...kakeibo, result]);
        setAmount('');
        setCategory('');
        setDate('');
      } else {
        // 登録失敗時の処理
        alert('登録に失敗しました。');
      }
    } catch (error) {
      console.log(error, 'error')
      alert('エラーが発生しました。');
    }
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
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">選択してください</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div>
        <label>
          日付:
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </label>
      </div>
      <div className='center'>
      <button onClick={handleAddKakeibo}>登録</button>
      </div>

      <ul>
        {kakeibo.map((entry, index) => (
          <li key={index}>
            <span>{`金額: ${entry.amount}, `}</span>
            <span>{`カテゴリー: ${entry.category}, `}</span>
            <span>{`日付: ${entry.date}`}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Kakeibo;

