function allowCookie() {
  if (Cookies.get("allowCookie") == "true") {
    return true;
  } else {
    return false;
  }
}

$("#tBtn").on("click", function () {
  if (!allowCookie()) {
    $("#cookieframe").css("display", "block");
    $(".popup").css("display", "flex");
  } else {
    moveHome();
  }
  // return false;
});

$("#cBtn").on("click", function () {
  if (allowCookie() || $("#cCheckbox").prop("checked")) {
    $(".popup").css("display", "none");
    Cookies.set("allowCookie", "true");
    moveHome();
  }
  // return false;
});

document.getElementById("cCheckbox").addEventListener("change", function () {
  if ($("#cCheckbox").prop("checked")) {
    $("#cBtn").css("border", "8px double #0090bb");
    $("#cBtn").css("background-color", "#cceffa");
  } else {
    $("#cBtn").css("border", "8px double #5e606173");
    $("#cBtn").css("background-color", "#becfd47e");
  }
});
