let articlesGoal = [];

//２個ランダムに記事データを取ってくる
const wikiFetch = async () => {
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

  const valueJson = await fetchValue; //非同期処理を実行
  const articles = valueJson.query.pageids; //取得したデータを配列に格��
  const titles = [
    valueJson.query.pages[articles[0]],
    valueJson.query.pages[articles[1]],
  ];
  return [articles, titles]; //必要な情報が入っている配列を取得
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

  console.log(articles);
  target.insertAdjacentHTML("afterend", articles);

  return articles; //必要な情報が入っている配列を取得
};

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
  $("#homeframe").css("display", "none");
  wikiFetch().then((article) => {
    //then節の中に2つ読み込まれてから実行される
    console.log(article[0]);
    console.log(article[1]);

    articlesGoal = [article[1][0].title, article[1][1].title];
    console.log(articlesGoal);

    wikiLoad(article[0][0], true).then((articlehtml) => {
      //記事が読み込まれてから実行される。
      displayOnOff(false);
      $("#sgLabelA1").text(articlesGoal[0]);
      $("#sgLabelA2").text(articlesGoal[1]);
      $("#startframe").css("display", "flex");
    });
  });
}

$("#sgBtn").click(function () {
  $("#startframe").css("display", "none");
  $("#gameframe").css("display", "flex");
  $("#wikiframe").css("display", "block");
  $("#dataframe").css("display", "block");
});
