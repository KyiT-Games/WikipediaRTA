const apiURL = "http://127.0.0.1:8000/wikirunner/";
let difficult = 1;

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

//画面を隠す
function displayOnOff(onoff) {
  //hiddenframeの表示/非表示を切り替える
  if (onoff == true) {
    $("#hiddenframe").css("display", "block");
  } else {
    $("#hiddenframe").css("display", "none");
  }
}

const sendScore = async (diff, name, score, time) => {
  //asyncで非同期処理だと宣言する 2個のページを得る。
  const fetchValue = fetch(
    apiURL +
      "write/" +
      diff +
      "?name=" +
      name +
      "&score=" +
      score +
      "&time=" +
      time,
    {
      method: "GET",
      headers: {
        "kyit-cache-allowed": "no",
      },
    }
  )
    .then((value) => {
      //データが取得できればこっち
      return value;
    })
    .catch(() => {
      //取得に失敗すればこっち
      alert("KyiT Games APIにうまくアクセスできないようです、、");
    });
  const valueJson = await fetchValue; //非同期処理を実行
  return valueJson;
};
