import React, { useEffect, useState } from 'react';
import './App.css';


const Kakeibo = () => {
  const [kakeibo, setKakeibo] = useState([]);
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');

  const categories = ['食費', '交通費', '娯楽', 'その他'];

  // 登録
  const handleAddKakeibo = async () => {
    //   if (!amount || !category || !date) {
    //     alert('金額、カテゴリー、日付を入力してください。');
    //     return;
    //   } 入力されていなかった場合にエラーを出したかった（バリデーション）が時間ないからしてない。

    const newKakeibo = {
      amount,
      category,
      date,
    };
    try {
      // APIのURLを入れる
      const response = await fetch('https://', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newKakeibo),
      });

      if (response.ok) {
        const result = await response.json();
        setKakeibo([...kakeibo, result]);
        setAmount('');
        setCategory('');
        setDate('');
      } else {
        alert('登録に失敗しました。');
      }
    } catch (error) {
      console.log(error, 'error')
      alert('エラーが発生しました。');
    }
  };

  //表示
  const getKakeibo = async () => {
    try {
      const response = await fetch('https://');
      const data = await response.json();
      setKakeibo(data);
    } catch (error) {
      console.log(error);
    }
  };

  //削除
  const deleteKakeibo = async (id) => {
    try {
      const res = await fetch(`https://kakeibo/${id}`, {//例
        method: 'DELETE',
      });

      if (res.ok) {
        getKakeibo();
      } else {
        alert('削除に失敗しました。');
      }
    } catch (error) {
      console.log(error);
    }
  };

  //ページの読み込みをさせることで更新（レンダリングで調べると出てくる）
  useEffect(() => {
    getKakeibo();
  }, [kakeibo]);

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
            <button onClick={() => deleteKakeibo(entry.id)}>削除</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Kakeibo;

