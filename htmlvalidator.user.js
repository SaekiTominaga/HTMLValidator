// ==UserScript==
// @name        HTML Validator
// @namespace   https://w0s.jp/
// @description Nu Html Checker を利用して HTML ページのチェックを行うユーザースクリプト
// @author      SaekiTominaga
// @version     1.0.1
// ==/UserScript==
(() => {
	const CHECKER_URL = 'https://checker.html5.org/'; // バリデーターの URL

	const CLASSNAME_PLEFIX = 'htmlvalidator_'; // クラス名の接頭辞

	const ICON_LOADING_DATA = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzOCIgaGVpZ2h0PSIzOCIgdmlld0JveD0iMCAwIDM4IDM4Ij48Y2lyY2xlIGN4PSIxOSIgY3k9IjE5IiByPSIxNiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjY2NjIiBzdHJva2Utd2lkdGg9IjYiLz48cGF0aCBkPSJNMTkgMEExOSAxOSAwIDAgMSAzOCAxOUwzMyAxOUExMyAxMyAwIDAgMCAxOSA2IiBmaWxsPSIjMDAwIj48YW5pbWF0ZVRyYW5zZm9ybSB0eXBlPSJyb3RhdGUiIGF0dHJpYnV0ZU5hbWU9InRyYW5zZm9ybSIgZnJvbT0iMCAxOSAxOSIgdG89IjM2MCAxOSAxOSIgZHVyPSIxcyIgcmVwZWF0RHVyPSJpbmRlZmluaXRlIi8+PC9wYXRoPjwvc3ZnPg=='; // ロード中のアイコンデータ
	const ICON_SUCCESS_DATA = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAMAAAC5zwKfAAACc1BMVEVHcEz////5/Pn////////9/v3////S5dL9/v3////////////////9/v3///////8AfQH6/foAfQEAfQEAfQEAfQEAfQEAfQEAfAEAfAAAfQEAfQEAfQEAfQHa7NpjrWQAfQGTyJQAegAAfQGv1K8skS3D38N5u3pNo05crFwAfQEYhxkShxN6uXo7mDyu1q9nsmiZzJoThxRSp1NttW1aq1t1uXV1q3am0qcyljP///8AfQFKvkpQwVBSwlJMv0zV8dVJvklOwE5GvUZPwE9IvUjU8NRVw1Xc89zS8NLX8ddNv03Q79BXxFfO7s5UwlQAdwBcxlzC6sJZxVm96b2357fF68UAfAC66LrI7ciq46ql4aW05rQAdADK7crA6cBoy2htzWxhyGGw5bAgjSEDfwQAcACt460RhxLH7MdkyWRex15FvEWf3p930XcAegCR2pEAbQA3uDcJgwrM7syL2IuV25UAcQB70Xui4KJerV+G1YZezF5yznKY3JiC1YJVylUokikVixbJ7clVqFYmnSdAvEAqsyo9nD6b3Ztx1nFLo0xosmlYylhQxlD6/Pp+035iz2J72ntn0WeP2I+87rxq1WpLb0s9rz1wxnAzlzVTxlMbkxxJuUk0qzUhmCHO+s7A7sAuki82XDZDYUOH3Yd/v4B1k3WBo4FBtEG4w7i37bcuoy6gsKCs8ayb5ptEm0UAaAB0unTk9uSSrZLF+8Wbx5vt6+3U/9QiVSJbklvj5+Nbu1vv+u/M08y/479ZfllphWmIyoie15629ra10bWg76DD8MMAZQBlwWXM5czFzMVOtk7Y3tiotKhkpWQOTA4mMXd3AAAAOnRSTlMADBwWCColAQQgGS4TMw4Q8jzRCFHpGK674p6DX9xb/XSCQidPxTLFsqI5wt95uoyKrs7B2NOa6V7g7A/lZwAAC9RJREFUWMOdmIlTk9caxoMIyiqyiaigde/Ursv08pFEEiAVjHwhQAAS1nwhQEhIAgRCABJCiAmgrCJhd0VQhLrXOq12tE572/sn3fec70vI6u3tM+qMTPLjec57znsW1h6svaDdSGFh8fv2xcaGh4dHR4fvZbFiT5049u3ZM59++eXJM2c/P3fiFPyMxUJfYYWQm4dp8YgVHb1r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'; // メッセージがなく正常に終了したときのアイコンデータ
	const ICON_WARNING_DATA = 'data:image/png;base64,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'; // Info または Warning のみの時のアイコンデータ
	const ICON_ERROR_DATA = 'data:image/png;base64,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'; // Error がある時のアイコンデータ

	/* スタイルを CSS で設定 */
	const styleElement = document.createElement('style');
	styleElement.textContent = `
		.` + CLASSNAME_PLEFIX + `icon_button {
			margin: 0; /* for Chrome */
			padding: 0;
			border: none;
			position: fixed;
			left: 15px;
			bottom: 15px;
			color: inherit;
			background: transparent;
			font-family: inherit;
			font-size: inherit;
			font-weight: inherit;
			z-index: 2147483647;
		}

		.` + CLASSNAME_PLEFIX + `icon_button:not([disabled]) {
			cursor: pointer;
		}

		.` + CLASSNAME_PLEFIX + `icon_button:-focus {
			outline: 1px dotted;
		} /* for Firefox */

		.` + CLASSNAME_PLEFIX + `icon_button:-moz-focusring {
			outline: 1px dotted;
		} /* for Firefox */

		.` + CLASSNAME_PLEFIX + `icon_button::-moz-focus-inner {
			padding: 0;
			border: none;
		} /* for Firefox */

		.` + CLASSNAME_PLEFIX + `icon_button img {
			display: block;
			height: 40px;
			width: 40px;
		}

		.` + CLASSNAME_PLEFIX + `error_box {
			padding: 1em;
			border: 1px solid #f00;
			box-sizing: border-box;
			box-shadow: 0 0 1em #999;
			position: fixed;
			left: 20px;
			bottom: 20px;
			max-height: calc(100vh - 20px);
			color: #000;
			background: #fee;
			font-size: 14px;
			outline: none;
			overflow-y: auto;
			z-index: 2147483647;
		}

		.` + CLASSNAME_PLEFIX + `error_box[hidden] {
			display: none;
		}

		.` + CLASSNAME_PLEFIX + `error_list {
			margin-bottom: 1em;
			border-collapse: collapse;
			font-size: inherit;
		}

		.` + CLASSNAME_PLEFIX + `error_list td {
			padding: .25em .5em;
			border: 1px solid #000;
			background: #fff;
		}

		.` + CLASSNAME_PLEFIX + `error_type {
			font-weight: bold;
			text-transform: capitalize;
		}

		.` + CLASSNAME_PLEFIX + `error_line {
			text-align: right;
		}

		.` + CLASSNAME_PLEFIX + `error_message {
		}
	`;
	document.head.appendChild(styleElement);

	/* バリデート結果ボタン */
	const iconButtonWrapperElement = document.createElement('div');
	iconButtonWrapperElement.className = CLASSNAME_PLEFIX + 'icon_button_box';
	document.body.appendChild(iconButtonWrapperElement);

	const iconButtonElement = document.createElement('button');
	iconButtonElement.type = 'button';
	iconButtonElement.disabled = true;
	iconButtonElement.className = CLASSNAME_PLEFIX + 'icon_button';
	iconButtonWrapperElement.appendChild(iconButtonElement);

	const iconElement = document.createElement('img');
	iconElement.src = ICON_LOADING_DATA; // アイコンの初期表示はロード中にする
	iconElement.alt = '結果取得待ち'; // アイコンの初期表示はロード中にする
	iconButtonElement.appendChild(iconElement);

	/* アクセスしているページのソースコードを取得する */
	fetch(location, {
		  method: 'GET',
		  credentials: 'same-origin'
		}).then((response) => {
		return response.text();
	}).then((sourceCode) => {
		/* バリデートサービスへソースコードを送信する */
		const formData = new FormData();
		formData.append('out', 'json');
		formData.append('content', sourceCode);

		fetch(CHECKER_URL, {
			method: 'POST',
			body: formData
		}).then((response) => {
			/* バリデートサービスからの返答結果を取得する */
			return response.json();
		}).then((responseData) => {
			const responseMessages = responseData.messages;
			if (responseMessages.length === 0) {
				/* メッセージがない時（Success） */
				iconElement.src = ICON_SUCCESS_DATA;
				iconElement.alt = 'Success';
			} else {
				/* メッセージがある時 */
				const errorBoxElement = document.createElement('div');
				errorBoxElement.hidden = true;
				errorBoxElement.tabIndex = -1;
				errorBoxElement.className = CLASSNAME_PLEFIX + 'error_box';
				document.body.appendChild(errorBoxElement);

				const errorTableElement = document.createElement('table');
				errorTableElement.className = CLASSNAME_PLEFIX + 'error_list';
				errorBoxElement.appendChild(errorTableElement);

				const errorTbodyElement = document.createElement('tbody');
				errorTableElement.appendChild(errorTbodyElement);

				const types = [];
				for (let i = 0, len = responseMessages.length; i < len; i++) {
					const responseMessage = responseMessages[i];
					const type = responseMessage.subType !== undefined ? responseMessage.subType : responseMessage.type;
					types.push(type);

					const errorTrElement = document.createElement('tr');
					errorTbodyElement.appendChild(errorTrElement);

					const errorTypeElement = document.createElement('td');
					errorTypeElement.className = CLASSNAME_PLEFIX + 'error_type';
					errorTypeElement.textContent = type;
					errorTrElement.appendChild(errorTypeElement);

					const errorLineElement = document.createElement('td');
					errorLineElement.className = CLASSNAME_PLEFIX + 'error_line';
					errorLineElement.textContent = responseMessage.lastLine;
					errorTrElement.appendChild(errorLineElement);

					const errorMessageElement = document.createElement('td');
					errorMessageElement.className = CLASSNAME_PLEFIX + 'error_message';
					errorMessageElement.textContent = responseMessage.message;
					errorTrElement.appendChild(errorMessageElement);
				}

				/* 閉じるボタン */
				const closeButtonElement = document.createElement('button');
				closeButtonElement.type = 'button';
				closeButtonElement.className = CLASSNAME_PLEFIX + 'error_close_button';
				closeButtonElement.textContent = '閉じる';
				errorBoxElement.appendChild(closeButtonElement);

				/* バリデート結果ボタンをクリックしたらメッセージを表示する */
				iconButtonElement.addEventListener('click', () => {
					errorBoxElement.hidden = false;
					errorBoxElement.focus();
				});

				/* 閉じるボタンをクリックしたらメッセージを非表示に戻す */
				closeButtonElement.addEventListener('click', () => {
					errorBoxElement.hidden = true;
					iconButtonElement.focus();
				});

				iconButtonElement.disabled = false;
				if (!types.includes('error')) {
					/* Info または Warning のみの時 */
					iconElement.src = ICON_WARNING_DATA;
					iconElement.alt = 'Warning';
				} else {
					/* Error がある時 */
					iconElement.src = ICON_ERROR_DATA;
					iconElement.alt = 'Error';
				}
			}
		}).catch((error) => {
			console.error(error.message);
		});
	}).catch((error) => {
		console.error(error.message);
	});
})();
