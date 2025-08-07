# YouTube・Vimeo API設定ガイド

このガイドでは、YouTubeとVimeoのAPIを設定して、実際の動画データを表示する方法を説明します。

## 🎬 YouTube Data API v3 の設定

### 1. Google Cloud Consoleでプロジェクトを作成

1. [Google Cloud Console](https://console.cloud.google.com/) にアクセス
2. 新しいプロジェクトを作成するか、既存のプロジェクトを選択
3. 「APIとサービス」→「ライブラリ」に移動
4. "YouTube Data API v3" を検索して有効化

### 2. APIキーを作成

1. 「APIとサービス」→「認証情報」に移動
2. 「認証情報を作成」→「APIキー」を選択
3. 作成されたAPIキーをコピー
4. セキュリティのため、APIキーを制限することを推奨：
   - 「HTTPリファラー」を選択
   - あなたのドメインを追加（例：`https://yourusername.github.io/*`）

### 3. 使用制限について

- **無料枠**: 1日あたり10,000クォータユニット
- **基本的な操作のコスト**:
  - チャンネル情報取得: 1ユニット
  - 動画検索: 100ユニット
  - ライブ配信チェック: 100ユニット

## 📹 Vimeo API の設定

### 1. Vimeo Developer アカウントを作成

1. [Vimeo Developer](https://developer.vimeo.com/) にアクセス
2. Vimeoアカウントでログイン
3. 「My Apps」→「Create an App」をクリック

### 2. アプリケーションを作成

1. アプリ名と説明を入力
2. アプリのURLを入力（GitHub PagesのURL）
3. 利用規約に同意して作成

### 3. アクセストークンを取得

1. 作成したアプリの詳細ページに移動
2. 「Authentication」タブを選択
3. 「Generate a new token」をクリック
4. 必要なスコープを選択：
   - `public`: 公開動画の読み取り
   - `private`: 非公開動画の読み取り（必要に応じて）

## ⚙️ APIキーの設定方法

### 方法1: 直接ファイルに記述（開発用）

`js/api-config.js` ファイルを編集：

```javascript
const API_CONFIG = {
    youtube: {
        apiKey: 'YOUR_ACTUAL_YOUTUBE_API_KEY',  // ここに実際のAPIキーを入力
        baseUrl: 'https://www.googleapis.com/youtube/v3'
    },
    vimeo: {
        accessToken: 'YOUR_ACTUAL_VIMEO_ACCESS_TOKEN',  // ここに実際のアクセストークンを入力
        baseUrl: 'https://api.vimeo.com'
    }
};
```

### 方法2: 環境変数を使用（推奨）

GitHub Pagesでは環境変数が使用できないため、以下の方法を推奨：

1. **GitHub Secrets を使用**:
   - リポジトリの Settings → Secrets and variables → Actions
   - `YOUTUBE_API_KEY` と `VIMEO_ACCESS_TOKEN` を追加

2. **GitHub Actions でビルド時に置換**:
   ```yaml
   - name: Replace API keys
     run: |
       sed -i 's/YOUR_YOUTUBE_API_KEY_HERE/${{ secrets.YOUTUBE_API_KEY }}/g' js/api-config.js
       sed -i 's/YOUR_VIMEO_ACCESS_TOKEN_HERE/${{ secrets.VIMEO_ACCESS_TOKEN }}/g' js/api-config.js
   ```

### 方法3: 外部設定ファイル（セキュア）

```javascript
// config.js (このファイルは.gitignoreに追加)
window.API_KEYS = {
    youtube: 'your_youtube_api_key',
    vimeo: 'your_vimeo_access_token'
};
```

## 🔧 実装の確認

APIキーを設定後、以下の機能が利用可能になります：

### YouTube機能
- ✅ 最新動画の自動埋め込み
- ✅ チャンネル統計（登録者数、動画数）
- ✅ ライブ配信の検出
- ✅ リアルタイム更新

### Vimeo機能
- ✅ 最新動画の自動埋め込み
- ✅ ユーザー情報の取得
- ✅ 動画メタデータの表示

## 🚨 セキュリティ注意事項

1. **APIキーの保護**:
   - 公開リポジトリにAPIキーを直接コミットしない
   - `.gitignore` に設定ファイルを追加
   - GitHub Secretsを活用

2. **使用制限の設定**:
   - YouTube APIキーにHTTPリファラー制限を設定
   - Vimeo APIにドメイン制限を設定

3. **レート制限の考慮**:
   - API呼び出し頻度を制限
   - エラーハンドリングを実装
   - キャッシュ機能の活用

## 🔍 トラブルシューティング

### よくある問題

1. **APIキーが無効**:
   - キーが正しく設定されているか確認
   - APIが有効化されているか確認

2. **CORS エラー**:
   - GitHub Pagesのドメインが許可されているか確認
   - HTTPSを使用しているか確認

3. **クォータ超過**:
   - API使用量を確認
   - キャッシュ機能を実装

### デバッグ方法

ブラウザの開発者ツールで以下を確認：

```javascript
// APIが正しく設定されているかチェック
console.log('API Config:', window.API_CONFIG);

// YouTube APIテスト
window.youtubeAPI.getChannelInfo('UCagozuretotonou').then(console.log);

// Vimeo APIテスト
window.vimeoAPI.getUserVideos('user212766069', 1).then(console.log);
```

## 📊 使用量の監視

- [Google Cloud Console](https://console.cloud.google.com/) でYouTube APIの使用量を監視
- [Vimeo Developer Dashboard](https://developer.vimeo.com/) でVimeo APIの使用量を確認

設定完了後、ポートフォリオサイトで実際の動画データが表示されるようになります。