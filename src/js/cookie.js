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
    Cookies.set("allowCookie", "true", { expires: 365 });
    moveHome();
  }
  // return false;
});

document.getElementById("cCheckbox").addEventListener("change", function () {
  if ($("#cCheckbox").prop("checked")) {
    $("#cBtn").removeClass("cBtndisabled");
    $("#cBtn").addClass("btn");
  } else {
    $("#cBtn").removeClass("btn");
    $("#cBtn").addClass("cBtndisabled");
  }
});
