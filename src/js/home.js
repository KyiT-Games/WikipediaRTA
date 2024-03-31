const getrank = async (difficultly) => {
  //asyncで非同期処理だと宣言する 2個のページを得る。
  const fetchValue = fetch(apiURL + difficultly, {
    method: "GET",
  })
    .then((value) => {
      //データが取得できればこっち
      return value.json(); //wikipediaからのデータをJSON形式に変換
    })
    .catch(() => {
      //取得に失敗すればこっち
      alert("KyiT Games APIにうまくアクセスできないようです、、");
    });

  const valueJson = await fetchValue; //非同期処理を実行
  const articles = valueJson.query.pageids; //取得したデータを配列に格��
  return articles; //必要な情報が入っている配列を取得
};

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

$("#dsMaster").click(function () {
  $(".dsSelector").removeClass("dsSelected");
  $("#dsMaster").addClass("dsSelected");
});
$("#dsHard").click(function () {
  $(".dsSelector").removeClass("dsSelected");
  $("#dsHard").addClass("dsSelected");
});
$("#dsNormal").click(function () {
  $(".dsSelector").removeClass("dsSelected");
  $("#dsNormal").addClass("dsSelected");
});

function rankAppend(a, b, c, d) {
  $("#ranktable2").append(
    "<tr><td>" +
      a +
      "</td><td>" +
      b +
      "</td><td>" +
      c +
      "</td><td>" +
      d +
      "</td></tr>"
  );
}

function loadrank() {
  $('#ranktable2 tr:has("td") ').empty();
}
