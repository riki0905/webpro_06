const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));

app.get("/hello1", (req, res) => {
  const message1 = "Hello world";
  const message2 = "Bon jour";
  res.render('show', { greet1:message1, greet2:message2});
});

app.get("/hello2", (req, res) => {
  res.render('show', { greet1:"Hello world", greet2:"Bon jour"});
});

app.get("/icon", (req, res) => {
  res.render('icon', { filename:"./public/Apple_logo_black.svg", alt:"Apple Logo"});
});

app.get("/luck", (req, res) => {
  const num = Math.floor( Math.random() * 6 + 1 );
  let luck = '';
  if( num==1 ) luck = '大吉';
  else if( num==2 ) luck = '中吉';
  else if (num == 3) luck = '小吉';
  else if (num == 4) luck = '吉';
  else if (num == 5) luck = '末吉';
  else if (num == 6) luck = '凶';
  console.log( 'あなたの運勢は' + luck + 'です' );
  res.render( 'luck', {number:num, luck:luck} );
});

app.get("/janken", (req, res) => {
  let hand = req.query.hand;
  let win = Number( req.query.win );
  let total = Number( req.query.total );
  console.log( {hand, win, total});
  const num = Math.floor( Math.random() * 3 + 1 );
  let cpu = '';
  if( num==1 ) cpu = 'グー';
  else if( num==2 ) cpu = 'チョキ';
  else cpu = 'パー';
  // ここに勝敗の判定を入れる
  
  let judgement = '';
  if (hand === cpu) {
    judgement = 'あいこ'; // 引き分け
  } else if (
    (hand === 'グー' && cpu === 'チョキ') ||
    (hand === 'チョキ' && cpu === 'パー') ||
    (hand === 'パー' && cpu === 'グー')
  ) {
    judgement = '勝ち';
    win += 1; // 勝利数を増加
  } else {
    judgement = '負け';
  }



  total += 1

  
  const display = {
    your: hand,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total,
  };
  res.render( 'janken', display );
});


app.get("/count", (req, res) => {
  const input = req.query.input || "";
  const length = input.length;
  res.render("count", { input, length });
});


// 直方体の体積計算の関数
function calculateV(length, width, height) {
  return length * width * height;
}




app.get("/", (req, res) => {
  res.render("cuboid");
});

// 直方体の体積計算
app.get("/cuboid", (req, res) => {
  const length = parseFloat(req.query.length);
  const width = parseFloat(req.query.width);
  const height = parseFloat(req.query.height);

  let volume = null;
  let error = null;

  // チェック
  if (isNaN(length) || isNaN(width) || isNaN(height)) {
    error = "長さ(cm)，幅(cm)，高さ(cm)を正しく入力してください．";
  } else if (length <= 0 || width <= 0 || height <= 0) {
    error = "長さ，幅，高さは正の数でなければなりません．";
  } else {
    // 体積を計算
    volume = calculateV(length, width, height);
  }

  
  res.render("cuboid", { volume, error });
});




app.listen(8080, () => console.log("Example app listening on port 8080!"));