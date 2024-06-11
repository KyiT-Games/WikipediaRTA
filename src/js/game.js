let articlesGoal = [];
let moveCount = 0;
let cacheHTML = [];

const cutWord = "##KUGIRIcut`}*{*{`*}##";

//２個ランダムに記事データを取ってくる
const wikiFetch = async (diff) => {
  //asyncで非同期処理だと宣言する 2個のページを得る。
  const fetchValue = fetch(
    `https://ja.wikipedia.org/w/api.php?format=json&action=query&generator=random&grnnamespace=0&indexpageids&grnlimit=2&origin=*`,
    {
      method: "GET",
    }
  )
    .then((value) => {
      //データが取得できればこっち
      return value.json(); //wikipediaからのデータをJSON形式に変換
    })
    .catch(() => {
      //取得に失敗すればこっち
      alert("wikipediaにうまくアクセスできないようです、、");
    });

  const fetchValueAPI = fetch(apiURL + `/getarticle/` + diff, {
    method: "GET",
  })
    .then((value) => {
      //データが取得できればこっち
      return value.json(); //wikipediaからのデータをJSON形式に変換
    })
    .catch(() => {
      //取得に失敗すればこっち
      alert("wikipediaにうまくアクセスできないようです、、");
    });

  if (diff == 0) {
    const valueJson = await fetchValue; //非同期処理を実行
    const articles = valueJson.query.pageids; //取得したデータを配列に格��
    const titles = [
      valueJson.query.pages[articles[0]].title,
      valueJson.query.pages[articles[1]].title,
    ];
    console.log(titles);
    return titles; //必要な情報が入っている配列を取得
  } else {
    const valueJson = await fetchValueAPI; //非同期処理を実行
    let article1 = valueJson[getRandomInt(valueJson.length)]; //取得したデータを配列に格��
    let article2 = valueJson[getRandomInt(valueJson.length)];
    let num = 0;

    while (article1 == article2 && num < 10) {
      article2 = valueJson[getRandomInt(valueJson.length)];
      num = num + 1;
      console.log(num);
    }

    const titles = [
      decodeURI(article1.url.substr(article1.url.indexOf("/wiki/") + 6)),
      decodeURI(article2.url.substr(article2.url.indexOf("/wiki/") + 6)),
    ];

    console.log(titles);

    return titles; //必要な情報が入っている配列を取得
  }
};
//指定されたウィキのページを取ってくる(api.php版)
const wikiLoad = async (articleid) => {
  // 記事タイトルからデータを取得(api.php)
  const fetchValuetitle = fetch(
    `https://ja.wikipedia.org/w/api.php?action=parse&page=${articleid}&format=json&origin=*`,
    {
      method: "GET",
    }
  )
    .then((value) => {
      //データが取得できればこっち
      console.log(value);
      return value.json(); //wikipediaからのデータをJSON形式に変換
    })
    .catch((e) => {
      //取得に失敗すればこっち
      alert("wikipediaにうまくアクセスできないようです、、");
    });

  const valueJson = await fetchValuetitle;
  console.log(valueJson);
  const articles = valueJson.parse.text["*"]; //取得したデータを配列に格��

  return articles; //必要な情報が入っている配列を取得
};

// iframe書き換えプログラム
function changeIframe(title, reduce = false) {
  document.getElementById("wiki").contentWindow.location.reload(true);
  // カウンター制御
  if (reduce) {
    moveCount = moveCount - 1;
  } else {
    moveCount = moveCount + 1;
  }
  $("#gCounter").text(moveCount - 1);

  const wikiFrame = document.getElementById("wiki");
  const target = wikiFrame.contentWindow.document.querySelector("#anker");
  const cacheAbility = loadCache(title);
  let html;
  if (!(cacheAbility[1] == "MISS")) {
    html = cacheAbility[0];
    target.insertAdjacentHTML("afterend", html);
    return 0;
  } else {
    wikiLoad(title).then((htmlL) => {
      html = htmlL;
      console.log("SU" + html);
      saveCache(title, html);
      target.insertAdjacentHTML("afterend", html);
      return 0;
    });
  }
}

// iframe内再描画
window.addEventListener("message", (response) => {
  // ゴール検出
  if (decodeURI(response.data) == articlesGoal[1]) {
    endGame();
    return 0;
  }
  changeIframe(decodeURI(response.data));
});

// タイマープログラム
const time = document.getElementById("gTimer");

// 開始時間
let startTime;
// 停止時間
let stopTime = 0;
// タイムアウトID
let timeoutID;

function displayTime() {
  const currentTime = new Date(Date.now() - startTime);
  const h = String(currentTime.getHours() - 9).padStart(2, "0");
  const m = String(currentTime.getMinutes()).padStart(2, "0");
  const s = String(currentTime.getSeconds()).padStart(2, "0");
  const ms = String(currentTime.getMilliseconds()).padStart(3, "0");

  time.textContent = `${h}:${m}:${s}.${ms}`;
  timeoutID = setTimeout(displayTime, 10);
}

// スタートボタンがクリックされたら時間を進める
function gTimerStart() {
  time.textContent = "00:00:00.000";
  startTime = Date.now();
  displayTime();
}

// ストップボタンがクリックされたら時間を止める
function gTimerStop() {
  clearTimeout(timeoutID);
  return [time.textContent, new Date(Date.now() - startTime)];
}

// ゲームスタート時に呼び出し
function startGame() {
  displayOnOff(true);
  $("#homeframe").css("display", "none");
  moveCount = 0;
  cacheHTML = [];
  wikiFetch(difficult).then((article) => {
    articlesGoal = [article[0], article[1]];

    changeIframe(articlesGoal[0]);
    //記事が読み込まれてから実行される。
    displayOnOff(false);
    $("#sgLabelA1").text(articlesGoal[0]);
    $("#sgLabelA2").text(articlesGoal[1]);
    $("#startframe").css("display", "flex");
    $("#gGoal").text(articlesGoal[1]);
  });
  saveDifficult(difficult);
}

//キャッシュ系
function saveCache(title, html) {
  const date = Date.now();
  localStorage.setItem(title, html + cutWord + date);
}

function loadCache(title) {
  const rawdata = localStorage.getItem(title);

  let status;
  if (rawdata == null) {
    status = "MISS";
    return [null, status];
  }

  const data = rawdata.split(cutWord);
  const differeceDate = (Date.now() - data[1]) / 86400000;
  status = "HIT";
  if (differeceDate > 10) {
    status = "EXPIRED";
  }

  return [data[0], status];
}

//ボタン系
$("#sgBtn").click(function () {
  $("#startframe").css("display", "none");
  $("#gameframe").css("display", "flex");
  $("#wikiframe").css("display", "block");
  $("#dataframe").css("display", "block");
  gTimerStart();
});

$("#gExitframe").click(function () {
  moveHome();
  gTimerStop();
});

$("#gExitframe").click(function () {
  moveHome();
  gTimerStop();
});

$("#gBackframe").click(function () {
  moveHome();
  gTimerStop();
});
