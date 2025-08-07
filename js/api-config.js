// API Configuration for YouTube and Vimeo
// GitHub Pages Compatible

// API設定
const API_CONFIG = {
    youtube: {
        // YouTube Data API v3のAPIキーをここに設定
        apiKey: 'YOUR_YOUTUBE_API_KEY_HERE',
        baseUrl: 'https://www.googleapis.com/youtube/v3'
    },
    vimeo: {
        // Vimeo APIのアクセストークンをここに設定
        accessToken: 'YOUR_VIMEO_ACCESS_TOKEN_HERE',
        baseUrl: 'https://api.vimeo.com'
    }
};

// YouTube API関数
class YouTubeAPI {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseUrl = API_CONFIG.youtube.baseUrl;
    }

    // チャンネル情報を取得
    async getChannelInfo(channelId) {
        try {
            const response = await fetch(
                `${this.baseUrl}/channels?part=snippet,statistics&id=${channelId}&key=${this.apiKey}`
            );
            const data = await response.json();
            return data.items[0];
        } catch (error) {
            console.error('YouTube API Error:', error);
            return null;
        }
    }

    // チャンネルの最新動画を取得
    async getLatestVideo(channelId) {
        try {
            const response = await fetch(
                `${this.baseUrl}/search?part=snippet&channelId=${channelId}&maxResults=1&order=date&type=video&key=${this.apiKey}`
            );
            const data = await response.json();
            return data.items[0];
        } catch (error) {
            console.error('YouTube API Error:', error);
            return null;
        }
    }

    // ライブ配信をチェック
    async checkLiveStream(channelId) {
        try {
            const response = await fetch(
                `${this.baseUrl}/search?part=snippet&channelId=${channelId}&eventType=live&type=video&key=${this.apiKey}`
            );
            const data = await response.json();
            return data.items.length > 0;
        } catch (error) {
            console.error('YouTube API Error:', error);
            return false;
        }
    }
}

// Vimeo API関数
class VimeoAPI {
    constructor(accessToken) {
        this.accessToken = accessToken;
        this.baseUrl = API_CONFIG.vimeo.baseUrl;
    }

    // ユーザーの動画を取得
    async getUserVideos(userId, count = 1) {
        try {
            const response = await fetch(
                `${this.baseUrl}/users/${userId}/videos?per_page=${count}&sort=date`,
                {
                    headers: {
                        'Authorization': `Bearer ${this.accessToken}`
                    }
                }
            );
            const data = await response.json();
            return data.data;
        } catch (error) {
            console.error('Vimeo API Error:', error);
            return null;
        }
    }

    // ユーザー情報を取得
    async getUserInfo(userId) {
        try {
            const response = await fetch(
                `${this.baseUrl}/users/${userId}`,
                {
                    headers: {
                        'Authorization': `Bearer ${this.accessToken}`
                    }
                }
            );
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Vimeo API Error:', error);
            return null;
        }
    }
}

// APIインスタンスを作成
const youtubeAPI = new YouTubeAPI(API_CONFIG.youtube.apiKey);
const vimeoAPI = new VimeoAPI(API_CONFIG.vimeo.accessToken);

// グローバルに公開
window.youtubeAPI = youtubeAPI;
window.vimeoAPI = vimeoAPI;
window.API_CONFIG = API_CONFIG;