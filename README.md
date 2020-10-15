# HTML Validator

[The Nu Html Checker (v.Nu)](https://validator.github.io/validator/) を利用して HTML ページのチェックを行うユーザースクリプト。

「✔ メッセージなし」「⚠ Info または Warning のみ」「❌ Error あり」によって3パターンのアイコンを表示し、さらに Info 以上のメッセージがあるときはアイコン押下でメッセージを表示します。

## 使い方

① 当ユーザースクリプトをブラウザにインストールして適当なウェブページを開くと、画面の左下に ✔ / ⚠ / ❌ のいずれかのアイコンが表示されます。

![画面キャプチャー（画面の左下に黄色い感嘆符のアイコンが表示されている）](https://user-images.githubusercontent.com/4138486/54666171-6a905980-4b2c-11e9-8448-7680b3a253a4.png)

② 開いているページの HTML に何かしらのメッセージがある場合（アイコンが ⚠ か ❌ の場合）、アイコンを押下するとバリデート結果が表示されます。バリデートは複数のサービスを使用しており（設定でカスタマイズ可）、チェック結果に差異が生じることもあります。下画像の例では、「“html”開始タグに“lang”属性の設定を検討せよ」の警告は [https://validator.w3.org/nu/](https://validator.w3.org/nu/) でのチェックでのみ表示されています。

![画面キャプチャー（赤背景のブロック内に行数やメッセージが一覧表で表示されている）](https://user-images.githubusercontent.com/4138486/91685128-61fed800-eb94-11ea-8efd-9c52924590e7.png)

## 動作デモ

- [デモページ](https://saekitominaga.github.io/HTMLValidator/demo.html)

## 注意事項

- デフォルトではブラウザで表示したすべての HTML ページでチェックが行われてしまいます。特定のドメインやディレクトリ配下のページだけで良いのであれば、負荷軽減のため @include や @match の設定を推奨します。

## カスタマイズ

| キー | 解説 | 設定例 | 未指定時のデフォルト値 | 補足 |
|:-|:-|:-|:-|:-|
| CHECKER_URL | バリデーターの URL リスト | ['https://validator.w3.org/nu/', 'https://validator.nu/'] | ['https://validator.w3.org/nu/'] | |
| FILTER_PATTERN | 除外するエラー、警告メッセージの正規表現文字列 | .\*Unicode Normalization.*\|.\*appears to be written in.\* | なし（空文字） | [参考ページ](https://github.com/validator/validator/wiki/Message-filtering#using-the---filterpattern-option) |
| TARGET_MIME | バリデートを行うページの MIME タイプ（ 'text/html; charset=utf-8' のような引数指定は不可） | ['text/html'] | ['text/html', 'application/xhtml+xml'] | |
| CONSOLE_TITLE | Console に表示する当機能名 | 任意の文字列 | '【HTML Validator】' | |
| CLASSNAME_PLEFIX | クラス名の接頭辞 | 任意の文字列 | 'htmlvalidator-' | |

例えば [Violentmonkey](https://violentmonkey.github.io/) ではスクリプトのインストール後、「値」のタブからキーを設定することができます。

## 対応環境

Firefox 81 + [Violentmonkey 2.12.7](https://violentmonkey.github.io/) で動作確認しています。 Chrome などの他ブラウザでもたぶん動くと思います。

## おことわり

- 動作原理は hokaccha 氏の [gm-html5validator](https://github.com/hokaccha/gm-html5validator) を参考にしましたが、ソースコードはゼロから書き直しています。
- ✔ / ⚠ / ❌ のアイコン画像は Clker-Free-Vector-Images 氏が [Pixabay に公開されているデータ](https://pixabay.com/ja/%E7%9B%AE%E7%9B%9B%E3%82%8A-%E3%82%A2%E3%82%B9%E3%82%BF%E3%83%AA%E3%82%B9%E3%82%AF-%E3%82%AF%E3%83%AD%E3%82%B9-%E8%B5%A4-%E7%B7%91-%E9%BB%84%E8%89%B2-%E3%83%81%E3%82%A7%E3%83%83%E3%82%AF-%E8%AD%A6%E5%91%8A-40678/) を利用しています。
