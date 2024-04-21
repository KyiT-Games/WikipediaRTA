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
  return valueJson; //必要な情報が入っている配列を取得
};

function moveHome() {
  displayOnOff(true);

  $("#titleframe").css("display", "none");
  $("#gameframe").css("display", "none");
  $("#cookieframe").css("display", "none");
  $("#homeframe").css("display", "block");

  difficult = -1;
  const difficultTmp = loadDifficult();
  if (difficultTmp == 0) {
    document.getElementById("dsMaster").click();
    difficult = 0;
    $("#dLabel2").text("MASTER");
  } else if (difficultTmp == 1) {
    document.getElementById("dsHard").click();
    difficult = 1;
    $("#dLabel2").text("HARD");
  } else if (difficultTmp == 2) {
    document.getElementById("dsNormal").click();
    difficult = 2;
    $("#dLabel2").text("NORMAL");
  }
  displayOnOff(false);
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
  if (!(difficult == 0)) {
    $(".dsSelector").removeClass("dsSelected");
    $("#dsMaster").addClass("dsSelected");
    difficult = 0;
    loadrank(difficult);
  }
});
$("#dsHard").click(function () {
  if (!(difficult == 1)) {
    $(".dsSelector").removeClass("dsSelected");
    $("#dsHard").addClass("dsSelected");
    difficult = 1;
    loadrank(difficult);
  }
});
$("#dsNormal").click(function () {
  if (!(difficult == 2)) {
    $(".dsSelector").removeClass("dsSelected");
    $("#dsNormal").addClass("dsSelected");
    difficult = 2;
    loadrank(difficult);
  }
});

function rankAppend(a, b, c, d, e) {
  $("#ranktable2").append(
    "<tr><td>" +
      a +
      "</td><td>" +
      b +
      "</td><td>" +
      c +
      "</td><td>" +
      d +
      "</td><td>" +
      e +
      "</td></tr>"
  );
}

function loadrank(diff) {
  $('#ranktable2 tr:has("td") ').remove();
  getrank(diff).then((articles) => {
    for (let i = 0; i < articles.length; i++) {
      rankAppend(
        i + 1,
        articles[i].name,
        articles[i].score,
        articles[i].time,
        articles[i].date
      );
    }
  });
}
