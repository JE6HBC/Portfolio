# Yuki Koyama Portfolio

## 概要
小山裕貴（Forethumb LLC代表）のポートフォリオサイトです。
映像技術とエンジニアリングを融合したインタラクティブな体験を提供します。

## 技術スタック
- HTML5 / CSS3 / JavaScript (Vanilla)
- Tailwind CSS (CDN)
- Font Awesome Icons
- Google Fonts (Noto Sans JP, Roboto)

## インタラクティブ機能
1. **Signal Processing Lab** - 放送技術で使用する信号波形のリアルタイム生成
2. **Circuit Designer** - ハードウェア設計の基礎回路構築シミュレーター
3. **Visual Effects Playground** - 映像制作用リアルタイムエフェクト体験

## GitHub Pages デプロイメント
このサイトはGitHub Pagesでの公開を前提として設計されています。

### デプロイ手順
1. GitHubリポジトリを作成
2. ファイルをリポジトリにプッシュ
3. Settings > Pages > Source を "Deploy from a branch" に設定
4. Branch を "main" (または "master") に設定
5. `https://[username].github.io/[repository-name]/` でアクセス可能

### ファイル構造
```
/
├── index.html          # メインページ
├── css/
│   └── styles.css      # カスタムスタイル
├── js/
│   ├── main.js         # メイン機能
│   ├── games.js        # インタラクティブゲーム
│   └── effects.js      # 視覚効果
├── assets/
│   └── images/         # 画像ファイル（必要に応じて）
└── README.md           # このファイル
```

## 開発者向け情報
- レスポンシブデザイン対応
- 各セクションは16:9比率でスクリーンショット撮影に最適化
- モダンブラウザ対応（ES6+）
- CDNを使用しているため、追加のビルドプロセス不要

## ライセンス
© 2024 Yuki Koyama / Forethumb LLC. All Rights Reserved.