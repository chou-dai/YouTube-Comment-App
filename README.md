# YouTube Trend  AND  Comments WordCloud

## 概要
YouTubeの急上昇動画のコメントを形態素解析して、コメントに含まれる使用単語の割合を出力するアプリケーション
<table>
  <tr>
    <td valign="top"><img width="100%" src="https://user-images.githubusercontent.com/89395132/203288082-d6f4f51b-08e7-4602-b13b-8741428ffbd5.png"></td>
    <td valign="top"><img width="100%" src="https://user-images.githubusercontent.com/89395132/203288275-66dc199c-aa1c-416c-be02-1e5e9063bd0c.png"></td>
  </tr>
</table>

## 処理の詳細（YouTubeデータ取得のバッチ処理）
1. 毎日0:00にデータを取得するようにスケジューリング
2. YouTube APIを用いて急上昇動画を40件取得
3. 各動画に対するコメントを100件ずつ取得
4. コメントを形態素に分解して名詞・動詞・感動詞の単語を抽出
5. 抽出された単語をカウントして頻出100単語を抽出
6. 動画データとコメント頻出単語データをデータベースに格納

## 技術スタック
| 分野 | 使用技術 |
| ---- | ---- |
| フロントエンド | React(Typescript), Redux, tailwindcss, Material-UI |
| バックエンド | Django REST Framework |
| データベース | MySQL |
| Webサーバー | Nginx |
| その他 | Docker, OpenAPI, YouTubeAPI, Mecab |

## アーキテクチャ
![architecture](https://user-images.githubusercontent.com/89395132/201121319-7731660e-2445-49ee-b8ec-f75403b0a53d.png)
