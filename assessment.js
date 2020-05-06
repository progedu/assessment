(function () {
	'use strict';
	// 厳格モード(エラーチェックを)
	const userNameInput = document.getElementById('user-name');
	const assessmentButton = document.getElementById('assessment');
	const resultDivided = document.getElementById('result-area');
	const tweetDivided = document.getElementById('tweet-area');
	
	/**
	* 指定した要素の子供をすべて除去する
	* @param {HTMLElement} element HTML要素
	*/
	function removeAllChildren(element) {
		while (element.firstChild) {
			element.removeChild(element.firstChild);
		}
	}

	assessmentButton.onclick = () => {
		const userName = userNameInput.value;
		// === 型も同じであること
		// 1 == '1' はtrueとなる
		if (userName.length === 0) {
			return;
		}

		// 診断結果表示エリアの作成
		removeAllChildren(resultDivided);
		const header = document.createElement('h3');
		header.innerText = '診断結果'
		resultDivided.appendChild(header);

		const paragraph = document.createElement('p');
		const result = assessment(userName);
		paragraph.innerText = result;
		resultDivided.appendChild(paragraph);

		// ツイートエリアの作成
		removeAllChildren(tweetDivided);
		const anchor = document.createElement('a');
		// utf-8のエンコード＆デコードツールがあると
		const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag=%E3%81%82%E3%81%AA%E3%81%9F%E3%81%AE%E3%81%84%E3%81%84%E3%81%A8%E3%81%93%E3%82%8D&text='
			+ encodeURIComponent(result);
		anchor.setAttribute('href', hrefValue);
		anchor.className = 'twitter-hashtag-button';
		anchor.innerText = 'Tweet #%E3%81%82%E3%81%AA%E3%81%9F%E3%81%AE%E3%81%84%E3%81%84%E3%81%A8%E3%81%93%E3%82%8D';
		tweetDivided.appendChild(anchor);

		twttr.widgets.load();
	};

	userNameInput.onkeydown = (event) => {
		// enter
		if (event.keyCode === 13) {
			assessmentButton.onclick();
		}
	};

	// {userName}
	const answers = [
		'{userName}のいいところは声です。',
		'{userName}のいいところはまなざしです。',
		'{userName}のいいところは情熱です。',
		'{userName}のいいところは厳しさです。',
		'{userName}のいいところは知識です。',
		'{userName}のいいところはユニークさです。',
		'{userName}のいいところは用心深さです。',
		'{userName}のいいところは見た目です。',
		'{userName}のいいところは決断力です。',
		'{userName}のいいところは思いやりです。',
		'{userName}のいいところは感受性です。',
		'{userName}のいいところは節度です。',
		'{userName}のいいところは好奇心です。',
		'{userName}のいいところは気配りです。',
		'{userName}のいいところはその全てです。',
		'{userName}のいいところは自制心です。',
		'{userName}のいいところは優しさです',
	];

	/**
	 * 名前の文字列を渡すと診断結果を返す
	 * @param {string} userName ユーザー名
	 * @return {string} 診断結果
	 * */
	function assessment(userName) {
		// let いわゆる変数宣言(スコープの外側で使用できない)
		// var はスコープ外でも使える(非推奨)
		let sumOfcharCode = 0;
		// 文字列のコード合計
		for (let i = 0; i < userName.length; i++) {
			sumOfcharCode = sumOfcharCode + userName.charCodeAt(i);
		}

		// 
		const index = sumOfcharCode % answers.length;
		let result = answers[index];

		result = result.replace(/{userName}/g, userName);
		return result;
	}

	// テストコード(TODO:実行方法)
	console.assert(
		assessment('太郎') === '太郎のいいところは決断力です。',
		'名前を置き換えていること'
	);
	console.assert(
		assessment('太郎') === assessment('太郎'),
		'入力が同じなら結果も同じであること'
	);

})();
