const apiURL = "http://127.0.0.1:8000/wikirunner";
const WikiAPI = "https://ja.wikipedia.org/w/api.php";
const WikiURL = "https://ja.wikipedia.org/wiki";

// REST API Version is under developing!!!
const UseREST = false;

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
      "/write/" +
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

//画面幅による内容の変更
function switchByWidth() {
  if (window.matchMedia("(max-width: 767px)").matches) {
    //スマホ処理
    $(".displayL").css("display", "none");
    $(".displayS").css("display", "block");
  } else if (window.matchMedia("(min-width:768px)").matches) {
    //PC処理
    $(".displayS").css("display", "none");
    $(".displayL").css("display", "block");
  }
}

//ロードとリサイズの両方で同じ処理を付与する
window.onload = switchByWidth;
window.onresize = switchByWidth;
