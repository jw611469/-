var country;
//載入json檔案
$.get('/get_country', data => {
    country = data;
});

var _city, _cityarea;
$(document).ready(() => {
    $.get("/get_username", (data) => {
        if(data != ""){
            $(".enroll").html(data);
        }
    });

    $.get("/get_data", (data) => {
        _city = data.city;
        _cityarea = data.cityarea;
        $("#city").val(_city);
        
        //提取所選取縣市的鄉鎮市區資料
        var cityareaAry = country.find((item, index, array) => {
            return item.city == _city;
        });

        //加入所選取縣市的鄉鎮市區資料
        var cityarea_select = document.getElementById("cityarea");
        cityarea_select.innerHTML = "";
        for (let i = 0; i < cityareaAry.cityarea.length; i++) {
            cityarea_select.innerHTML += '<option value="' + cityareaAry.cityarea[i] + '" >' + cityareaAry.cityarea[i] + '</option>';
        }
        cityarea_select.value = _cityarea;
    });

    $.get('/get_station', (data) => {
        const rules = new RegExp("^" + _city + _cityarea);
        for (let i = 0; i < data.features.length; i++) {
            let item = data.features[i].properties;
            if (rules.test(item.address)) {
                $(".item-list").append(
                    '<div class="item" onclick="map(\'' + item.address + '\');">'
                    + '<div class="name">' + item.name + '</div>'
                    + '<div class="count_div"><span> 庫存量 :  </span> <span class="count">' + item.count + '</span></div>' 
                    + '<div class="address"> 地址 : <b>' + item.address + '</b></div>'
                    + '<div class="phone"> 電話 : <b>' + item.phone + '</b></div>'
                    + '<div class="updated"> 更新時間 : <b>' + item.updated + '</b></div>'
                    + '<div class="add-cart" type="button" onclick="ready()">加入購物車</div>'
                    + '</div>'
                );
            }
        }
    });

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

    $("#search_btn").click(()=>{
        //紀錄所選位置
        const location_rules = new RegExp("^" + $("#city").val() + $("#cityarea").val());
        //清空列表
        $(".item-list").empty();
        //載入json檔案，getJSON為jsonp跨域提取
        $.get('/get_station', (data) => {
            for(let i=0;i<data.features.length;i++){
                let item = data.features[i].properties;               
                if(location_rules.test(item.address)){
                    $(".item-list").append(
                        '<div class="item" onclick="map(\'' + item.address + '\');">'
                        + '<div class="name">' + item.name + '</div>'
                        + '<div class="count_div"><span> 庫存量 :  </span> <span class="count">' + item.count + '</span></div>' 
                        + '<div class="address"> 地址 : <b>' + item.address + '</b></div>'
                        + '<div class="phone"> 電話 : <b>' + item.phone + '</b></div>'
                        + '<div class="updated"> 更新時間 : <b>' + item.updated + '</b></div>'
                        + '<div class="add-cart" type="button" onclick="ready()">加入購物車</div>'
                        + '</div>'
                    );
                }             
            }      
        });
    });
});

function map(address){
    const pos = 'https://maps.google.com.tw/maps?&q=' + address.split("號")[0] + '號&hl=zh-TW&z=15&t=&output=embed';
    $(".map").attr("src", pos)
}

// Cart js
var cartIcon = document.querySelector("#cart-icon");
var cart = document.querySelector(".cart");
var closeCart = document.querySelector("#close-cart");

window.onload=function(){
    cartIcon.onclick = () =>{
        cart.classList.add("active");
    }
    
    closeCart.onclick = () =>{
        cart.classList.remove("active");
    }
}

if(document.readyState == "loading"){
	document.addEventListener("DOMContentLoaded", ready);
}else{
	ready();
}

// Function
function ready(){
	// Add to Cart
	var addtoCart = document.getElementsByClassName("add-cart");
	for(var i = 0; i < addtoCart.length; i++){
		var button = addtoCart[i];
		button.addEventListener("click", addCartClicked);
	}

	// Remove Item from cart
	var removeCartButtons = document.getElementsByClassName("cart-remove")
	console.log(removeCartButtons);
	for(var i = 0; i < removeCartButtons.length; i++){
		var button = removeCartButtons[i];
		button.addEventListener("click", removeCartItem);
	}
	// Quantiity Change
	var quantityInputs = document.getElementsByClassName("cart-quantity");
	for(var i = 0; i<quantityInputs.length; i++){
		var input = quantityInputs[i];
		input.addEventListener("change", quantityChanged);
	}
	// Buy Button
	//document.getElementsByClassName("btn-buy")[0].addEventListener("click", buyButtonClicked);
}

// FN Add to Cart
function addCartClicked(event){
    var num = 0;
	var button = event.target;
	var shopProducts = button.parentElement;
	var title = shopProducts.getElementsByClassName("name")[0].innerText;
	var address = shopProducts.getElementsByClassName("address")[0].innerText;
    var phone = shopProducts.getElementsByClassName("phone")[0].innerText;
    var count = shopProducts.getElementsByClassName("count")[0].innerHTML;
    if(count == num){
        alert("商品售罄，無法進行預約");
    }
    else{
        addProductToCart(title, address,phone);
        updatetotal();
        console.log(title, address, phone, count);
    }
}
var num=1;
function addProductToCart(title, address, phone){
	var cartShopBox = document.createElement("div");
	cartShopBox.classList.add("cart-box");
	var cartItems = document.getElementsByClassName("cart-content")[0];
	var cartItemsNames = document.getElementsByClassName("cart-product-title");
    var cartItemsAddress = document.getElementsByClassName("cart-address");
    var cartItemsPhone = document.getElementsByClassName("cart-phone");
    if(num == 1){
        alert("成功加入購物車");
    }
	for(var i = 0; i < cartItemsNames.length; i++){
		if(cartItemsNames[i].innerText == title){
			alert("此商品已加入購物車");
			return;
		}
        else{
            alert("成功加入購物車");
        }
	}
    num++;
	var cartBoxContent = `
						<div class="detail-box">
							<div class="cart-product-title">${title}</div>
                            <div class="cart-address">${address}</div>
                            <div class="cart-phone">${phone}</div>
							<div class="cart-price">價格: $500</div>
                            <div class="cart-quantity">數量: 1</div>
						</div>
						<i class='bx bxs-trash-alt cart-remove'></i>`;

	cartShopBox.innerHTML = cartBoxContent;
	cartItems.append(cartShopBox);
	cartShopBox.getElementsByClassName("cart-remove")[0].addEventListener("click", removeCartItem);
}



// FN Remove Items from Cart
function removeCartItem(event){
	var buttonClicked = event.target;
	buttonClicked.parentElement.remove();
	updatetotal();
}

// Quantity Change
function quantityChanged(event){
	var input = event.target;
	if(isNaN(input.value) || input.value <= 0){
		input.value = 1;
	}
	updatetotal();
}

// Update Total
function updatetotal(){
    var total = 0;
	var cartContent = document.getElementsByClassName("cart-content")[0];
    var cartBoxes = cartContent.getElementsByClassName("cart-box");
    for(var i = 0;i < cartBoxes.length; i++){
		total = total + 500;
	}
	var addCart = document.getElementsByClassName("add-cart");
    document.getElementsByClassName("total-price")[0].innerText = '$' + total;
}