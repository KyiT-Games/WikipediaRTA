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

  const fetchValueAPI = fetch(apiURL + `getarticle/` + diff, {
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
//articleidに指定されたウィキのページを取ってくる
const wikiLoad = async (articleid, title) => {
  document.getElementById("wiki").contentWindow.location.reload(true);

  //asyncで非同期処理だと宣言する
  const fetchValue = fetch(
    `https://ja.wikipedia.org/w/api.php?action=parse&pageid=${articleid}&format=json&origin=*`,
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

  let valueJson;
  if (title) {
    valueJson = await fetchValue;
  } else {
    valueJson = await fetchValuetitle;
  }

  const articles = valueJson.parse.text["*"]; //取得したデータを配列に格��

  const wikiFrame = document.getElementById("wiki");
  const target = wikiFrame.contentWindow.document.querySelector("#anker");
  moveCount = moveCount + 1;
  $("#gCounter").text(moveCount - 1);
  console.log(articles);
  target.insertAdjacentHTML("afterend", articles);

  return articles; //必要な情報が入っている配列を取得
};

window.addEventListener("message", (response) => {
  console.log(response.data);
  wikiLoad(response.data, false).then((articlehtml) => {
    console.log(articlehtml);
  });
});

function startGame() {
  displayOnOff(true);
  $("#homeframe").css("display", "none");
  moveCount = 0;
  wikiFetch(difficult).then((article) => {
    articlesGoal = [article[0], article[1]];
    console.log(articlesGoal);

    wikiLoad(articlesGoal[0], false).then((articlehtml) => {
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
});
