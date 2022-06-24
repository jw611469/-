var express = require('express');
var router = express.Router();
const request = require('request');

const url = "https://www.edh.tw/opdata/covid19rapidtest.json";

router.get('/get_station', (req, res, next) => {
    //抓取資料
    request(url,function(error,response,body){
        if(!error && response.statusCode == 200){
            console.log("   [success] get station data !!");
            res.send(JSON.parse(body));    
        }
        else console.log("   [failed] errorCode: " + error.statusCode + " in /routes/station.js" );
    });
});

module.exports = router;