// index.js

const express = require('express');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/submit', (req, res) => {
  const { amount, category, date } = req.body;
  // ここでデータベースへの保存などの処理を行う

  // 仮のレスポンス
  res.send(`登録が完了しました。<br>金額: ${amount}<br>カテゴリ: ${category}<br>日付: ${date}`);
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
