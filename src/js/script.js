const apiURL = "http://127.0.0.1:8000/wikirunner/";

//画面を隠す
function displayOnOff(onoff) {
  //hiddenframeの表示/非表示を切り替える
  if (onoff == true) {
    $("#hiddenframe").css("display", "block");
  } else {
    $("#hiddenframe").css("display", "none");
  }
}
