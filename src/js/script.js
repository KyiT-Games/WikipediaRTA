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
    return articles; //必要な情報が入っている配列を取得
};

const wikiLoad = async (articleid) => { //asyncで非同期処理だと宣言する
  const fetchValue = fetch(`https://ja.wikipedia.org/w/api.php?action=parse&pageid=${articleid}&format=json&origin=*`, {
    method: "GET"
  })
    .then((value) => { //データが取得できればこっち
      return value.json(); //wikipediaからのデータをJSON形式に変換
    })
    .catch(() => { //取得に失敗すればこっち
      alert("wikipediaにうまくアクセスできないようです、、");
    });

  const valueJson = await fetchValue; //非同期処理を実行
  const articles = valueJson.parse.text; //取得したデータを配列に格��
  return articles; //必要な情報が入っている配列を取得
};

function displayOnOff(onoff) { //hiddenframeの表示/非表示を切り替える
  if (onoff == true){
    $(".hiddenframe").css("display", "none");
  }else{
    $(".hiddenframe").css("display", "block");
  }
}

document.getElementById("myBtn").addEventListener("click", function() {
    $(".titleframe").css("display", "none");
    
    wikiFetch().then(article => { //then節の中に2つ読み込まれてから実行される
      console.log(article);
      wikiLoad(article[0]).then(articlehtml => {  //記事が読み込まれてから実行される。
        console.log(articlehtml);
        var iframe = document.getElementById('target');
        $(".wikiframe").css("display", "block");
        $(".gameframe").css("display", "block");

      });

    });

});