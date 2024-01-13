'use strict';
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivision = document.getElementById('result-area');
const tweetDivision = document.getElementById('tweet-area');

assessmentButton.addEventListener(
    'click',
    () => {
      const userName = userNameInput.value;
      if (userName.length === 0) {
        // 名前が空の時は処理を終了する
        return;
      }

    // 診断結果表示エリアの作成
    resultDivision.innerText = '';
    
  // headerDivision の作成
  const headerDivision = document.createElement('div');
  headerDivision.setAttribute('class', 'card-header text-bg-primary');
  headerDivision.innerText = '診断結果';

  // bodyDivision の作成
  const bodyDivision = document.createElement('div');
  bodyDivision.setAttribute('class', 'card-body');

  const paragraph = document.createElement('p');
  paragraph.setAttribute('class', 'card-text');
  const result = assessment(userName);
  paragraph.innerText = result;
  bodyDivision.appendChild(paragraph);

  // resultDivision に Bootstrap のスタイルを適用する
  resultDivision.setAttribute('class', 'card');

  // headerDivision と bodyDivision を resultDivision に差し込む
  resultDivision.appendChild(headerDivision);
  resultDivision.appendChild(bodyDivision);

    // ツイートエリアの作成
    tweetDivision.innerText = '';
    const anchor = document.createElement('a');
    const hrefValue =
      'https://twitter.com/intent/tweet?button_hashtag=' +
      encodeURIComponent('あなたのいいところ') +
      '&ref_src=twsrc%5Etfw';
  
    anchor.setAttribute('href', hrefValue);
    anchor.setAttribute('class', 'twitter-hashtag-button');
    anchor.setAttribute('data-text', result);
    anchor.innerText = 'Tweet #あなたのいいところ';
  
    tweetDivision.appendChild(anchor);


    const script = document.createElement('script');
    script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
    tweetDivision.appendChild(script);
  }
);

userNameInput.addEventListener(
  'keydown',
  event => {
    if(event.code === 'Enter') {
      assessmentButton.dispatchEvent(new Event('click'))
    }
  }
)

const answers = [
  '{userName}の今日のラッキーアイテムは5円玉です。いいご縁がありますように!あ、でもいいご縁なら115円だから5円玉23枚持ち歩きましょう',
    '{userName}の今日のラッキーアイテムはハッピーターンです。左右に回りながら「右ターン、左ターン、ハッピーターン!!!!」と叫びましょう。ちなみに粉だけ先に味わうと天罰下りますよ',
    '{userName}の今日のラッキーアイテムは電車の座席です。乗ったら一目散に空いてる座席に座って、立ってる人たちに向かって「これがフルーツバスケットならあなたたち完全敗北ですよ？」と宣言しましょう',
    '{userName}の今日のラッキーアイテムはTwitterです。Twitterのみなさんの民度はとても良い（笑）ので、どんどんリプやdmして良い（笑）出会いをもとめていきやしょう',
    '{userName}の今日のラッキーアイテムはマイナンバーカードです。今日会う人たちとどんどん名刺交換みたいに、「私こういうものです」と言って交換していきましょうね',
    '{userName}の今日のラッキーアイテムは午後の紅茶（ストレート）です。必ず午前中に飲んでください。あえて午前に飲むという大罪を行うことにより、親鸞さんの悪人正機説を実行しましょう。罪深い人ほど救われます',
    '{userName}の今日のラッキーアイテムはからあげくんレッドです。他の味に浮気したらからあげくんから慰謝料請求きますよ。ちなみにみなさんはからあげくんは手づかみでたべますか？それともつまようじですか？',
    '{userName}の今日のラッキーアイテムは左腕です。今日すこしでも左腕がうずいたら、その場に座り込んで「新しい時代に…賭けてきた」とつぶやきましょう',
    '{userName}の今日のラッキーアイテムは置き配Okの札です。トイレの個室に入るときは忘れずにドアの前におくようにしましょう',
    '{userName}の今日のラッキーアイテムはパスポートです。書くものがないときにメモ帳代わりに使いましょう。',
    '{userName}の今日のラッキーアイテムはポケモンカードです。支払いのときにクレカの代わりに使えるかもしれません。差し込んでみましょう',
    '{userName}の今日のラッキーアイテムはお箸（1本）です。信号が変わるときや電車が動くときなどに、「ウインガーディアムレディオッサ」と唱えて構えた箸を動かしましょう'
];

/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザの名前
 * @return {string} 診断結果
 */
function assessment(userName) {
  // 全文字のコード番号を取得してそれを足し合わせる
  let sumOfCharCode = 0;
  for (let i = 0; i < userName.length; i++) {
    sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
  }

  // 文字のコード番号の合計を回答の数で割って添字の数値を求める
  const index = sumOfCharCode % answers.length;
  let result = answers[index];

  result = result.replaceAll('###userName###', userName);
  return result;
}

// テストを行う関数
function test() {
  console.log('診断結果の文章のテスト');

  //太郎
  console.log('太郎');
  console.assert(
    assessment('太郎') ===
    '太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。',
    '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
  );

  //次郎
  console.log('次郎');
  console.assert(
    assessment('次郎') ===
    '次郎のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる次郎が皆から評価されています。',
    '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
  );

  //花子
  console.log('花子');
  console.assert(
    assessment('花子') ===
    '花子のいいところはまなざしです。花子に見つめられた人は、気になって仕方がないでしょう。',
    '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
  );

  console.log('診断結果の文章のテスト終了');

  console.log('同じ名前なら、同じ結果を出力することのテスト');

  console.log('太郎');
  console.assert(
    assessment('太郎') === assessment('太郎'),
    '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。'
  )

  console.log('次郎');
  console.assert(
    assessment('次郎') === assessment('次郎'),
    '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。'
  )

  console.log('花子');
  console.assert(
    assessment('花子') === assessment('花子'),
    '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。'
  )

  console.log('同じ名前なら、同じ結果を出力することのテスト終了');
}

test();
