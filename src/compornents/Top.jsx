import { useState } from "react/cjs/react.production.min"

const Kakeibo=({onAddKakeibo})=>{
    const [amount, setAmount]=useState('');
    const [category, setCategory]=useState('選択してください');
    const [date,setdate]=useState('');

    const categoryData=['食費','交通費','娯楽','その他'];
    const selectChange=()=>{
        setCategory(target.value);
    }


    const handleAddKakeibo = () => {
        onAddKakeibo(amount);
        setTransaction('');
      };

    return(
        <>
  <h1>家計簿アプリ</h1>
  <div class="form">
      <form action="/submit" method="post">
        <div class="">
            <div class="price">
                <label for="amount">金額:</label>
                <input type="number" id="amount" name="amount"  required/>{{amount}}
            </div>
            <div id="category" class="category">
                <label for="category">カテゴリ:</label>
                <select id="category" value={category} required>
                  <option value="">食費</option>
                  <option value="交通費">交通費</option>
                  <option value="娯楽">娯楽</option>
                  <option value="その他">その他</option>
                </select>
            </div>
        <div id="date" class="date">
            <label for="date">日付:</label>
            <input type="text" id="date" name="date" required/>
        </div>
        </div>
        <div class="btn">
            <button id="registerBtn" onClick={handleAddKakeibo} type="submit">登録</button>
        </div>
      </form>
  </div>
</>
    )


}