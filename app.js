var express = require("express");
const cookieParser = require("cookie-parser");
var fs = require("fs");

var app = express(); //舊版router用法
var router = express.Router(); //新版router用法

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

//初始頁面載入
app.get("/", (req, res) => {
  if(req.cookies){
    tok = req.cookies['tok'];
    let data = fs.readFileSync('cookie.json');
    data= JSON.parse(data);
    for(let i=0;i<data.length;i++){
      if(data[i]['token']==tok){
        /*在這裡做登入後要處理的事*/
        res.sendFile(__dirname + "/views/home.html");
      }
    }
    res.sendFile(__dirname + "/views/home.html");
  }
  res.sendFile(__dirname + "/views/home.html");
});

//載入位於 public 目錄中的靜態檔案
app.use(express.static('public'));
app.use(express.static('views'));
//添加路由模塊
app.use(require('./routes/station'));
app.use(require('./routes/search_data'));
app.use(require('./routes/login_status'));

app.get("/get_country", (req, res) => {
  let jsonData = fs.readFileSync('country.json');
  res.send(JSON.parse(jsonData));
  //console.log("[success] get country data !!");
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
  console.log('Running on http://127.0.0.1:3000');
});