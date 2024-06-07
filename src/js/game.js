let articlesGoal = [];
let moveCount = 0;

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
  document.getElementById("wiki").contentWindow.location.reload(true);

  // 記事タイトルからデータを取得(api.php)
  const fetchValuetitle = fetch(
    `https://ja.wikipedia.org/w/api.php?action=parse&page=${articleid}&format=json&origin=*`,
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

  const valueJson = await fetchValuetitle;
  const articles = valueJson.parse.text["*"]; //取得したデータを配列に格��

  const wikiFrame = document.getElementById("wiki");
  const target = wikiFrame.contentWindow.document.querySelector("#anker");
  moveCount = moveCount + 1;
  $("#gCounter").text(moveCount - 1);
  console.log(articles);
  target.insertAdjacentHTML("afterend", articles);

  return articles; //必要な情報が入っている配列を取得
};

// iframe内再描画
window.addEventListener("message", (response) => {
  // ゴール検出
  if (decodeURI(response.data) == articlesGoal[1]) {
    endGame();
    return 0;
  }
  wikiLoad(decodeURI(response.data));
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
  wikiFetch(difficult).then((article) => {
    articlesGoal = [article[0], article[1]];
    console.log(articlesGoal);

    wikiLoad(articlesGoal[0]).then((articlehtml) => {
      //記事が読み込まれてから実行される。
      displayOnOff(false);
      $("#sgLabelA1").text(articlesGoal[0]);
      $("#sgLabelA2").text(articlesGoal[1]);
      $("#startframe").css("display", "flex");
      $("#gGoal").text(articlesGoal[1]);
    });
  });
  saveDifficult(difficult);
}

$("#sgBtn").click(function () {
  $("#startframe").css("display", "none");
  $("#gameframe").css("display", "flex");
  $("#wikiframe").css("display", "block");
  $("#dataframe").css("display", "block");
  gTimerStart();
});
