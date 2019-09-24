# HTML Validator

Nu Html Checker を利用して HTML ページのチェックを行うユーザースクリプト。

「✔ メッセージなし」「⚠ Info または Warning のみ」「❌ Error あり」によって3パターンのアイコンを表示し、さらに Info 以上のメッセージがあるときはアイコン押下でメッセージを表示します。

## 使い方

① 当ユーザースクリプトをブラウザにインストールして適当なウェブページを開くと、画面の左下に ✔ / ⚠ / ❌ のいずれかのアイコンが表示されます。

![画面キャプチャー（画面の左下に黄色い感嘆符のアイコンが表示されている）](https://user-images.githubusercontent.com/4138486/54666171-6a905980-4b2c-11e9-8448-7680b3a253a4.png)

② 開いているページの HTML に何かしらのメッセージがある場合（アイコンが ⚠ か ❌ の場合）、アイコンを押下するとバリデート結果が表示されます。バリデートは複数のサービスを使用しており、チェック結果に差異が生じることもあります。下画像の例では、「“html”開始タグに“lang”属性の設定を検討せよ」の警告は [https://validator.w3.org/nu/](https://validator.w3.org/nu/) でのチェックでのみ表示されています。

![画面キャプチャー（赤背景のブロック内に行数やメッセージが一覧表で表示されている）](https://user-images.githubusercontent.com/4138486/54666172-6a905980-4b2c-11e9-9559-dcba878f0a4a.png)

## 動作サンプル

- [サンプルページ](https://saekitominaga.github.io/HTMLValidator/sample.html)

## 注意事項

- デフォルトではブラウザで表示したすべてのページでチェックが行われてしまうので、負荷軽減のため @include や @match の設定を推奨します。
- 複数のバリデートサービスでの比較が必要ない場合は、プログラム内の定数 CHECKER_URL を編集してください。

## 対応環境

Firefox 66.0 + [Violentmonkey 2.10.3](https://addons.mozilla.org/ja/firefox/addon/violentmonkey/) で動作確認していますが、 Chrome など他ブラウザでもたぶん動くと思います。

## おことわり

- 動作原理は hokaccha 氏の [gm-html5validator](https://github.com/hokaccha/gm-html5validator) を参考にしましたが、ソースコードはゼロから書き直しています。
- ✔ / ⚠ / ❌ のアイコン画像は Clker-Free-Vector-Images 氏が [Pixabay に公開されているデータ](https://pixabay.com/ja/%E7%9B%AE%E7%9B%9B%E3%82%8A-%E3%82%A2%E3%82%B9%E3%82%BF%E3%83%AA%E3%82%B9%E3%82%AF-%E3%82%AF%E3%83%AD%E3%82%B9-%E8%B5%A4-%E7%B7%91-%E9%BB%84%E8%89%B2-%E3%83%81%E3%82%A7%E3%83%83%E3%82%AF-%E8%AD%A6%E5%91%8A-40678/) を利用しています。
