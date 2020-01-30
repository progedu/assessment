'use strict';
const firstSelect = document.getElementById('first');
const secondSelect = document.getElementById('second');
const thirdSelect = document.getElementById('third');
const fourthSelect = document.getElementById('fourth');
const fifthSelect = document.getElementById('fifth');
const sixthSelect = document.getElementById('sixth');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');

/**
 * 指定した要素の子どもを全て除去する
 * @param {HTMLElement} element HTMLの要素
 */
function removeAllChildren(element) {
  while (element.firstChild) {
    // 子どもの要素があるかぎり除去
    element.removeChild(element.firstChild);
  }
}

assessmentButton.onclick = () => {
  const pokemon1 = firstSelect.value;
  const pokemon2 = secondSelect.value;
  const pokemon3 = thirdSelect.value;
  const pokemon4 = fourthSelect.value;
  const pokemon5 = fifthSelect.value;
  const pokemon6 = sixthSelect.value;

  // 診断結果表示エリアの作成
  removeAllChildren(resultDivided);
  const header = document.createElement('h3');
  header.innerText = '診断結果';
  resultDivided.appendChild(header);

  const paragraph = document.createElement('p');
  const result = assessment(
    pokemon1,
    pokemon2,
    pokemon3,
    pokemon4,
    pokemon5,
    pokemon6
  );
  paragraph.innerText = result;
  resultDivided.appendChild(paragraph);

  // ツイートエリアの作成
  removeAllChildren(tweetDivided);
  const anchor = document.createElement('a');
  const hrefValue =
    'https://twitter.com/intent/tweet?button_hashtag=' +
    encodeURIComponent('あなたのいいところ') +
    '&ref_src=twsrc%5Etfw';
  anchor.setAttribute('href', hrefValue);
  anchor.className = 'twitter-hashtag-button';
  anchor.setAttribute('data-text', result);
  anchor.innerText = 'Tweet #あなたのいいところ';
  tweetDivided.appendChild(anchor);

  // widgets.js の設定
  const script = document.createElement('script');
  script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
  tweetDivided.appendChild(script);
};

userNameInput.onkeydown = event => {
  if (event.key === 'Enter') {
    assessmentButton.onclick();
    //ボタンのonclick()処理を呼び出す
  }
};

/**
 * 六匹のタイプから一番苦手なタイプを返す関数
 * @param {string} pokemon1 ポケモン
 * @param {string} pokemon2 ポケモン
 * @param {string} pokemon3 ポケモン
 * @param {string} pokemon4 ポケモン
 * @param {string} pokemon5 ポケモン
 * @param {string} pokemon6 ポケモン
 * @return {string} 診断結果
 */
function assessment(
  pokemon1,
  pokemon2,
  pokemon3,
  pokemon4,
  pokemon5,
  pokemon6
) {
  const weak1 = checkType(pokemon1);
  const weak2 = checkType(pokemon2);
  const weak3 = checkType(pokemon3);
  const weak4 = checkType(pokemon4);
  const weak5 = checkType(pokemon5);
  const weak6 = checkType(pokemon6);
  var weakall = weak1.concat(weak2, weak3, weak4, weak5, weak6);
  // 配列に全て入れて、最大値を求めてそれを出力したい
  var fight = weakall.filter(function(x) {
    return x === 'かくとう';
  }).length;

  var fire = weakall.filter(function(x) {
    return x === 'ほのう';
  }).length;

  var water = weakall.filter(function(x) {
    return x === 'みず';
  }).length;

  var Thunder = weakall.filter(function(x) {
    return x === 'でんき';
  }).length;

  var grass = weakall.filter(function(x) {
    return x === 'くさ';
  }).length;

  var ice = weakall.filter(function(x) {
    return x === 'こおり';
  }).length;

  var poison = weakall.filter(function(x) {
    return x === 'どく';
  }).length;

  var Ground = weakall.filter(function(x) {
    return x === 'じめん';
  }).length;

  var wing = weakall.filter(function(x) {
    return x === 'ひこう';
  }).length;

  var psy = weakall.filter(function(x) {
    return x === 'エスパー';
  }).length;

  var insect = weakall.filter(function(x) {
    return x === 'むし';
  }).length;

  var rock = weakall.filter(function(x) {
    return x === 'いわ';
  }).length;

  var ghost = weakall.filter(function(x) {
    return x === 'ゴースト';
  }).length;

  var dragon = weakall.filter(function(x) {
    return x === 'ドラゴン';
  }).length;

  var steel = weakall.filter(function(x) {
    return x === 'はがね';
  }).length;

  var evil = weakall.filter(function(x) {
    return x === 'あく';
  }).length;

  var fairy = weakall.filter(function(x) {
    return x === 'フェアリー';
  }).length;

  return pokemon1;
}

function checkType(type) {
  if (type === 'ノーマル') {
    return ['かくとう'];
  }
  if (type === 'ほのお') {
    return ['みず', 'じめん', 'いわ'];
  }
  if (type === 'みず') {
    return ['でんき', 'くさ'];
  }
  if (type === 'でんき') {
    return ['じめん'];
  }
  if (type === 'くさ') {
    return ['ほのお', 'こおり', 'どく', 'ひこう', 'むし'];
  }
  if (type === 'こおり') {
    return ['ほのう', 'かくとう', 'いわ', 'はがね'];
  }
  if (type === 'かくとう') {
    return ['ひこう', 'エスパー', 'フェアリー'];
  }
  if (type === 'どく') {
    return ['じめん', 'エスパー'];
  }
  if (type === 'じめん') {
    return ['みず', 'くさ', 'こおり'];
  }
  if (type === 'ひこう') {
    return ['でんき', 'こおり', 'いわ'];
  }
  if (type === 'エスパー') {
    return ['むし', 'ゴースト', 'あく'];
  }
  if (type === 'むし') {
    return ['ほのう', 'ひこう', 'いわ'];
  }
  if (type === 'いわ') {
    return ['みず', 'くさ', 'かくとう', 'じめん', 'はがね'];
  }
  if (type === 'ゴースト') {
    return ['ゴースト', 'あく'];
  }
  if (type === 'ドラゴン') {
    return ['こおり', 'ドラゴン', 'フェアリー'];
  }
  if (type === 'あく') {
    return ['かくとう', 'むし', 'フェアリー'];
  }
  if (type == 'はがね') {
    return ['ほのう', 'かくとう', 'じめん'];
  }
  if (type === 'フェアリー') {
    return ['どく', 'はがね'];
  }
}
