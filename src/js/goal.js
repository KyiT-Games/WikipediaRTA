let timeEnd;
let score;

function endGame() {
  timeEnd = gTimerStop();
  const timesec = timeEnd[1].getSeconds();
  $("#askRankingFrame").css("display", "none");
  $("#gameframe").css("display", "none");
  $("#goalframe").css("display", "block");

  $("#goTime").text(timeEnd[0]);
  $("#goCounter").text(moveCount - 1);
  score = Math.round(10000000 / (timesec * 0.1 + (moveCount - 1) * 10));
  $("#goScore").text(score);
}

$("#goeExit").click(function () {
  $("#askRankingFrame").css("display", "block");
});

$("#askRankingSend").click(function () {
  sendScore(difficult, $("#askRankingName").val(), score, timeEnd[0]);
  moveHome();
});

$("#askRankingNo").click(function () {
  moveHome();
});
