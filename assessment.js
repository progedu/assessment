'use strict';
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');

/* assessmentButton.onclick = function() {
    console.log('ボタンが押されました');
    // TODO 診断表示結果の作成
    // TODO ツイートエリアの作成
}; */

/**
  * 指定した要素の子どもを全て削除する
  * @param {HTMLElement} element HTMLの要素
  */
 function removeAllChildren(element) {
    while (element.firstChild) { // 子どもの要素があるかぎり削除
      element.removeChild(element.firstChild);
      console.log('削除されました');
    }
  }

assessmentButton.onclick = () => {
    const userName = userNameInput.value;
    // 名前が空のとき処理終了
    if (userName.length === 0) 
        return;
    console.log('ボタンが押されました');
    // TODO 診断表示結果の作成
    /*
    while (resultDivided.firstChild != null) // 子ども要素がある限り削除
        resultDivided.removeChild(resultDivided.firstChild);
*/
    removeAllChildren(resultDivided);
    const header = document.createElement('h3');
    header.innerText = '診断結果';
    resultDivided.appendChild(header);

    const paragraph = document.createElement('p');
    const result = assessment(userName);
    paragraph.innerText = result;
    resultDivided.appendChild(paragraph);

    // TODO ツイートエリアの作成
    removeAllChildren(tweetDivided);
    const ancher = document.createElement('a');
    const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag=' 
        + encodeURIComponent('あなたのいいところ') 
        + '&ref_src=twsrc%5Etfw';

    ancher.setAttribute('href', hrefValue);
    ancher.className = 'twitter-hashtag-button';
    ancher.setAttribute('data-text', result);
    ancher.innerText = 'Tweet #あなたのいいところ';
    tweetDivided.appendChild(ancher);

    // widgets.js の設定
    const script = document.createElement('script');
    script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
    tweetDivided.appendChild(script);
};

userNameInput.onkeydown = (event) => {
    if (event.key === 'Enter') {
      // TODO ボタンのonclick() 処理を呼び出す
      assessmentButton.onclick();
    }
  };

const ansuers = [
    '{userName}のいいところは声です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
    '{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
    '{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
    '{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。',
    '{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
    '{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
    '{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
    '{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。',
    '{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
    '{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
    '{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。',
    '{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
    '{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
    '{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
    '{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
    '{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。',
];

/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザーの名前
 * @return {string} 診断結果
 */
function assessment(userName) {
    // 全文字のコード番号を取得してそれを足し合わせる
    let sumOfCharCode = 0;
    for (let i = 0; i < userName.length; i++)
        sumOfCharCode += userName.charCodeAt(i);
    const index = sumOfCharCode % ansuers.length;
    let result = ansuers[index];
    result = result.replace(/\{userName\}/g, userName);
    return result;
}

console.log(assessment('太郎'));
console.log(assessment('次郎'));
console.log(assessment('太郎'));

// テストコード
console.assert(
    assessment('太郎') === '太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。',
    '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
);
console.assert(
    assessment('太郎') === assessment('太郎'),
    '診断結果の出力処理が正しくありません。'
);
