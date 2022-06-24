var express = require('express');
var router = express.Router();
const request = require('request');
var fs = require("fs");

var username;
function getToken(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

router.post("/login", (req, res) => {
    let data = fs.readFileSync('user.json');
    data = JSON.parse(data);
    for (let i = 0; i < data.length; i++) {
        if (req.body.account == data[i]["account"]) {
            if (req.body.pwd == data[i]["password"]) {
                var tok = getToken(Math.floor(Math.random() * 20) + 10);
                res.cookie('tok', tok);
                let data2 = fs.readFileSync('cookie.json');
                data2 = JSON.parse(data2);
                data2.push({ "account": req.body.account, "token": tok });
                data2 = JSON.stringify(data2);
                fs.writeFileSync('cookie.json', data2);
                /*在這裡做登入後要處理的事*/
                username = req.body.account;
                res.redirect("search.html");
            }
        }
    }
});

router.post("/register", (req, res) => {
    let data = fs.readFileSync('user.json');
    data = JSON.parse(data);
    data.push({ "account": req.body.account, "password": req.body.password });
    data = JSON.stringify(data);
    fs.writeFileSync('user.json', data);
    username = req.body.account;
    res.redirect("search.html");
});

router.get("/get_username", (req, res) => {
    res.send(username);
});

module.exports = router;