var express = require('express');
var router = express.Router();
const request = require('request');

var _city, _cityarea;

router.get("/set_data", (req, res) => {
    _city = req.query.city;
    _cityarea = req.query.cityarea;
    console.log("   [success] set city data !! city: " + _city + ", cityarea: " + _cityarea);
});

router.get('/get_data', (req, res) => {
    res.send({city:_city, cityarea:_cityarea});
    console.log("   [success] get city data !! city: " + _city + ", cityarea: " + _cityarea);
});

module.exports = router;