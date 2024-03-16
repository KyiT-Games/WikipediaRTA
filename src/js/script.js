//画面を隠す
function displayOnOff(onoff) {
  //hiddenframeの表示/非表示を切り替える
  if (onoff == true) {
    $("#hiddenframe").css("display", "block");
  } else {
    $("#hiddenframe").css("display", "none");
  }
}

function moveHome() {
  $("#titleframe").css("display", "none");
  $("#gameframe").css("display", "none");
  $("#cookieframe").css("display", "none");
  $("#homeframe").css("display", "block");
}

$("#hBtn").click(function () {
  startGame();
});

$("#hSetting").click(function () {
  $("#sContent1").css("display", "block");
  $("#sContent2").css("display", "none");
  $("#settingframe").css("display", "flex");
});

$("#sBtn4").click(function () {
  $("#sContent1").css("display", "none");
  $("#sContent2").css("display", "block");
  $("#settingframe").css("display", "flex");
});

$("#sBack1").click(function () {
  $("#sContent1").css("display", "none");
  $("#sContent2").css("display", "none");
  $("#settingframe").css("display", "none");
});

$("#sBack2").click(function () {
  $("#sContent1").css("display", "block");
  $("#sContent2").css("display", "none");
});
