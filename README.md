# YouTube Trend  AND  Comments WordCloud

## 概要
YouTubeの急上昇動画のコメントを形態素解析して、コメントに含まれる使用単語の割合を出力するアプリケーション
<br>http://chou-dai-wordcloud.com/
<table>
  <tr>
    <td valign="top"><img width="100%" src="https://user-images.githubusercontent.com/89395132/203288082-d6f4f51b-08e7-4602-b13b-8741428ffbd5.png"></td>
    <td valign="top"><img width="100%" src="https://user-images.githubusercontent.com/89395132/203288275-66dc199c-aa1c-416c-be02-1e5e9063bd0c.png"></td>
  </tr>
</table>

## 目的
* Dockerを用いたコンテナ管理のWebアプリ開発の学習
* PythonでのWebアプリのバックエンド開発の学習（今後機械学習を導入したアプリを作りたいため）
* アプリ開発からデプロイまでの流れをざっくり学習
* Linux基礎知識の習得

## 技術スタック
| 分野 | 使用技術 |
| ---- | ---- |
| フロントエンド | React（Typescript）, Redux |
| バックエンド | Django REST Framework, MySQL |
| Webサーバー | Nginx
| その他 | Docker, OpenAPI, YouTubeAPI, Mecab |

## アーキテクチャ
![architecture](https://user-images.githubusercontent.com/89395132/201121319-7731660e-2445-49ee-b8ec-f75403b0a53d.png)

## 処理内容の詳細（YouTubeデータ取得のバッチ処理）
1. 毎日0:00にデータを取得するようにスケジューリング
2. YouTube APIを用いて急上昇動画を40件取得
3. 各動画に対するコメントを100件ずつ取得
4. コメントを形態素に分解して名詞・動詞・感動詞の単語を抽出
5. 抽出された単語をカウントして頻出の100単語のみ抽出
6. 動画データとコメントの頻出単語のデータをデータベースに格納
