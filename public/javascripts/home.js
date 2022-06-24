var country;
//載入json檔案
$.get('/get_country', data => {
    country = data;
});

$(document).ready(() => {
    $("#city").change(() => {
        var cityname = document.getElementById("city").value;
        //提取所選取縣市的鄉鎮市區資料
        var cityareaAry = country.find((item, index, array) => {
            return item.city == cityname;
        });

        //加入所選取縣市的鄉鎮市區資料
        var cityarea_select = document.getElementById("cityarea");
        cityarea_select.value = cityareaAry.cityarea[0];
        cityarea_select.innerHTML = "";
        for (let i = 0; i < cityareaAry.cityarea.length; i++) {
            cityarea_select.innerHTML += '<option value="' + cityareaAry.cityarea[i] + '" >' + cityareaAry.cityarea[i] + '</option>';
        }
    });

    $("#search_btn").click(() => {         
        var url = "/set_data?city=" + $("#city").val() + "&cityarea=" + $("#cityarea").val();
        $.get(url);
        window.location.href = 'search.html';
    });

});

