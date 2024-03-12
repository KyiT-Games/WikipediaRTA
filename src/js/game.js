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
