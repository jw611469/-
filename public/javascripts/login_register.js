$(document).ready(() => {
  $("#account").click(function () {
    $("account_label").show();
    $(this).attr("placeholder", "");
  });

  $("#eye").click(() => {
    if ($("#eye").attr("src") == "pic/eye-slash.png") {
      $("#eye").attr("src", "pic/eye.png");
      $("#password").attr("type", "text");
    }
    else {
      $("#eye").attr("src", "pic/eye-slash.png");
      $("#password").attr("type", "password");
    }
  });

  var flag = 0;
  var former_item;

  document.querySelectorAll(".label").forEach(item => {
    item.addEventListener("animationend", function (e) {
      item.style.cssText = "animation: ;";
      if (flag == 0 && former_item == item) item.style.cssText = "color: black; font-size: 14px; top: -67px;";
      else if (flag == 1) item.style.cssText = "color: gray; font-size: 16px; top: -50px;";
    });
  })

  document.querySelectorAll(".text_field").forEach(item => {
    var id_name = item.getAttribute("id") + "_label";
    var item_label = document.getElementById(id_name);
    item.addEventListener("click", function (e) {
      flag = 0;
      item.style.cssText = "border-color: #4378ff;";
      item_label.style.cssText = "animation: label_move 0.3s;\
                  color: black; font-size: 14px; top: -67px;";
      former_item = item_label;
    });

    item.addEventListener("blur", function (e) {
      if (this.value != "") {
        item.style.cssText = "border-color: #4378ff;";
        item_label.style.cssText = "color: #4378ff; font-size: 14px; top: -67px;";
      }
      else {
        flag = 1;
        item.style.cssText = "border-color: gray;";
        item_label.style.cssText = "animation: label_move 0.3s; \
                  animation-direction: reverse; \
                  color: gray; font-size: 16px; top: -50px;";
      }
    });
  })

});