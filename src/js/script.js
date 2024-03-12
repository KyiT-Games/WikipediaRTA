//画面を隠す
function displayOnOff(onoff) {
  //hiddenframeの表示/非表示を切り替える
  if (onoff == true) {
    $("#hiddenframe").css("display", "block");
  } else {
    $("#hiddenframe").css("display", "none");
  }
}

window.addEventListener("message", (response) => {
  displayOnOff(true);
  console.log(response.data);
  wikiLoad(response.data, false).then((articlehtml) => {
    console.log(articlehtml);
    displayOnOff(false);
  });
});

function startGame() {
  displayOnOff(true);
  $("#titleframe").css("display", "none");
  wikiFetch().then((article) => {
    //then節の中に2つ読み込まれてから実行される
    console.log(article[0]);
    console.log(article[1]);

    wikiLoad(article[0][0], true).then((articlehtml) => {
      //記事が読み込まれてから実行される。
      console.log(articlehtml);
      $("#gameframe").css("display", "flex");
      $("#wikiframe").css("display", "block");
      $("#dataframe").css("display", "block");
      displayOnOff(false);
    });
  });
}

function moveHome() {
  $("#titleframe").css("display", "none");
  $("#gameframe").css("display", "none");
  $("#cookieframe").css("display", "none");
  $("#homeframe").css("display", "block");
}
