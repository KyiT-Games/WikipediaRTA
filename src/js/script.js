const wikiFetch = async () => { //asyncで非同期処理だと宣言する
    const fetchValue = fetch(`https://ja.wikipedia.org/w/api.php?format=json&action=query&generator=random&grnnamespace=0&indexpageids&grnlimit=2&origin=*`, {
      method: "GET"
    })
      .then((value) => { //データが取得できればこっち
        return value.json(); //wikipediaからのデータをJSON形式に変換
      })
      .catch(() => { //取得に失敗すればこっち
        alert("wikipediaにうまくアクセスできないようです、、");
      });

    const valueJson = await fetchValue; //非同期処理を実行
    const articles = valueJson.query.pageids; //取得したデータを配列に格��
    console.log(articles) //必要な情報が入っている配列を取得
};

document.getElementById("myBtn").addEventListener("click", function() {
    $(".titleframe").css("display", "none");

    wikiFetch();
    $(".wikiframe").css("display", "block");
    $(".gameframe").css("display", "block");
});