// Video Channels Integration for Yuki Koyama Portfolio
// YouTube and Vimeo API Integration

// APIが利用可能かチェック
function isAPIAvailable() {
    return window.API_CONFIG && 
           window.API_CONFIG.youtube.apiKey !== 'YOUR_YOUTUBE_API_KEY_HERE' &&
           window.API_CONFIG.vimeo.accessToken !== 'YOUR_VIMEO_ACCESS_TOKEN_HERE';
}

class VideoChannelManager {
    constructor() {
        this.youtubeChannels = [
            {
                id: 'youtube-channel-1',
                channelId: 'UCagozuretotonou', // あごずれととのう
                channelHandle: '@agozuretotonou',
                statsId: 'stats-channel-1'
            },
            {
                id: 'youtube-channel-2',
                channelId: 'UCTimee_Real', // Timee Real
                channelHandle: '@Timee_Real',
                statsId: 'stats-channel-2'
            }
        ];
        
        this.vimeoUserId = 'user212766069';
        this.init();
    }

    init() {
        // Initialize when the video channels section becomes visible
        this.observeVideoSection();
    }

    observeVideoSection() {
        const videoSection = document.getElementById('video-channels');
        if (!videoSection) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.loadAllChannels();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        observer.observe(videoSection);
    }

    async loadAllChannels() {
        // Load YouTube channels
        this.youtubeChannels.forEach(channel => {
            this.loadYouTubeChannel(channel);
        });

        // Load Vimeo channel
        this.loadVimeoChannel();
    }

    async loadYouTubeChannel(channelConfig) {
        try {
            // APIが利用可能な場合は実際のデータを取得
            if (isAPIAvailable() && window.youtubeAPI) {
                await this.loadRealYouTubeData(channelConfig);
                return;
            }

            // Since we can't use YouTube API directly without API key,
            // we'll create a fallback embed using the channel handle
            const container = document.getElementById(channelConfig.id);
            const statsContainer = document.getElementById(channelConfig.statsId);
            
            if (!container) return;

            // Create YouTube channel embed
            const embedUrl = `https://www.youtube.com/embed?listType=user_uploads&list=${channelConfig.channelHandle.replace('@', '')}`;
            
            // Alternative: Use oEmbed or create a custom embed
            const embedHtml = `
                <div class="youtube-channel-embed">
                    <iframe 
                        src="https://www.youtube.com/embed/videoseries?list=UU${channelConfig.channelId.replace('UC', '')}" 
                        frameborder="0" 
                        allowfullscreen
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture">
                    </iframe>
                </div>
            `;

            // For now, create a placeholder with channel link
            container.innerHTML = `
                <div class="channel-placeholder">
                    <div class="flex flex-col items-center justify-center h-full">
                        <i class="fab fa-youtube text-red-500 text-4xl mb-4"></i>
                        <p class="text-white font-bold mb-2">${channelConfig.channelHandle}</p>
                        <a href="https://www.youtube.com/${channelConfig.channelHandle}" 
                           target="_blank" 
                           class="interactive-button text-sm">
                            <i class="fab fa-youtube mr-2"></i>
                            <span data-lang-ja="チャンネルを見る" data-lang-en="View Channel">チャンネルを見る</span>
                        </a>
                    </div>
                </div>
            `;

            // Add live status check (mock implementation)
            this.checkLiveStatus(channelConfig, statsContainer);

        } catch (error) {
            console.error('Error loading YouTube channel:', error);
            this.showChannelError(channelConfig.id, 'YouTube');
        }
    }

    // 実際のYouTube APIを使用してデータを取得
    async loadRealYouTubeData(channelConfig) {
        const container = document.getElementById(channelConfig.id);
        const statsContainer = document.getElementById(channelConfig.statsId);
        
        if (!container) return;

        try {
            // チャンネル情報を取得
            const channelInfo = await window.youtubeAPI.getChannelInfo(channelConfig.channelId);
            const latestVideo = await window.youtubeAPI.getLatestVideo(channelConfig.channelId);
            const isLive = await window.youtubeAPI.checkLiveStream(channelConfig.channelId);

            if (latestVideo) {
                // 最新動画を埋め込み
                container.innerHTML = `
                    <iframe 
                        src="https://www.youtube.com/embed/${latestVideo.id.videoId}" 
                        frameborder="0" 
                        allowfullscreen
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        class="w-full h-full">
                    </iframe>
                `;
            }

            if (channelInfo && statsContainer) {
                const subscriberCount = parseInt(channelInfo.statistics.subscriberCount).toLocaleString();
                const videoCount = parseInt(channelInfo.statistics.videoCount).toLocaleString();
                const liveIndicator = isLive ? 
                    '<span class="live-indicator" data-lang-ja="LIVE" data-lang-en="LIVE">LIVE</span>' : '';
                
                statsContainer.innerHTML = `
                    <div class="flex justify-between items-center text-sm text-gray-400">
                        <span class="subscriber-count">${subscriberCount}</span>
                        <span class="video-count">${videoCount}</span>
                        ${liveIndicator}
                    </div>
                `;
            }

        } catch (error) {
            console.error('Error loading real YouTube data:', error);
            this.showChannelError(channelConfig.id, 'YouTube');
        }
    }

    async loadVimeoChannel() {
        try {
            // APIが利用可能な場合は実際のデータを取得
            if (isAPIAvailable() && window.vimeoAPI) {
                await this.loadRealVimeoData();
                return;
            }

            const container = document.getElementById('vimeo-channel');
            if (!container) return;

            // Vimeo oEmbed API can be used without authentication for public videos
            // For now, create a placeholder with portfolio link
            container.innerHTML = `
                <div class="vimeo-placeholder">
                    <div class="flex flex-col items-center justify-center h-full">
                        <i class="fab fa-vimeo text-blue-400 text-4xl mb-4"></i>
                        <p class="text-white font-bold mb-2">Portfolio Showcase</p>
                        <a href="https://vimeo.com/${this.vimeoUserId}" 
                           target="_blank" 
                           class="interactive-button text-sm">
                            <i class="fab fa-vimeo mr-2"></i>
                            <span data-lang-ja="作品を見る" data-lang-en="View Works">作品を見る</span>
                        </a>
                    </div>
                </div>
            `;

            // Try to load latest video using Vimeo oEmbed
            this.loadLatestVimeoVideo();

        } catch (error) {
            console.error('Error loading Vimeo channel:', error);
            this.showChannelError('vimeo-channel', 'Vimeo');
        }
    }

    // 実際のVimeo APIを使用してデータを取得
    async loadRealVimeoData() {
        const container = document.getElementById('vimeo-channel');
        if (!container) return;

        try {
            const videos = await window.vimeoAPI.getUserVideos(this.vimeoUserId, 1);
            
            if (videos && videos.length > 0) {
                const latestVideo = videos[0];
                const videoId = latestVideo.uri.split('/').pop();
                
                container.innerHTML = `
                    <iframe 
                        src="https://player.vimeo.com/video/${videoId}" 
                        frameborder="0" 
                        allowfullscreen
                        class="w-full h-full">
                    </iframe>
                `;
            }
        } catch (error) {
            console.error('Error loading real Vimeo data:', error);
            this.showChannelError('vimeo-channel', 'Vimeo');
        }
    }

    async loadLatestVimeoVideo() {
        try {
            // This would require Vimeo API or oEmbed
            // For demonstration, we'll show a placeholder
            const container = document.getElementById('vimeo-channel');
            if (!container) return;

            // Mock latest video embed
            setTimeout(() => {
                container.innerHTML = `
                    <div class="vimeo-embed">
                        <div class="aspect-video bg-gray-800 rounded-lg flex items-center justify-center">
                            <div class="text-center">
                                <i class="fab fa-vimeo text-blue-400 text-3xl mb-2"></i>
                                <p class="text-gray-300 text-sm">Latest Portfolio Video</p>
                                <a href="https://vimeo.com/${this.vimeoUserId}" 
                                   target="_blank" 
                                   class="text-sky-400 hover:text-sky-300 text-sm">
                                    View on Vimeo →
                                </a>
                            </div>
                        </div>
                    </div>
                `;
            }, 1000);

        } catch (error) {
            console.error('Error loading latest Vimeo video:', error);
        }
    }

    checkLiveStatus(channelConfig, statsContainer) {
        // Mock live status check
        // In a real implementation, this would check YouTube API for live streams
        const isLive = Math.random() < 0.1; // 10% chance of being live (for demo)
        
        if (statsContainer) {
            const liveIndicator = isLive ? 
                '<span class="live-indicator" data-lang-ja="LIVE" data-lang-en="LIVE">LIVE</span>' : '';
            
            statsContainer.innerHTML = `
                <div class="flex justify-between items-center text-sm text-gray-400">
                    <span class="subscriber-count">チャンネル登録者数</span>
                    <span class="video-count">動画数</span>
                    ${liveIndicator}
                </div>
            `;
        }
    }

    showChannelError(containerId, platform) {
        const container = document.getElementById(containerId);
        if (!container) return;

        container.innerHTML = `
            <div class="error-placeholder">
                <div class="flex flex-col items-center justify-center h-full">
                    <i class="fas fa-exclamation-triangle text-yellow-500 text-2xl mb-2"></i>
                    <p class="text-gray-400 text-sm text-center">
                        <span data-lang-ja="${platform}チャンネルの読み込みに失敗しました" 
                              data-lang-en="Failed to load ${platform} channel">
                            ${platform}チャンネルの読み込みに失敗しました
                        </span>
                    </p>
                </div>
            </div>
        `;
    }

    // Method to refresh channel data
    refreshChannels() {
        this.loadAllChannels();
    }

    // Method to check for live streams periodically
    startLiveStatusMonitoring() {
        setInterval(() => {
            this.youtubeChannels.forEach(channel => {
                const statsContainer = document.getElementById(channel.statsId);
                this.checkLiveStatus(channel, statsContainer);
            });
        }, 60000); // Check every minute
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const videoManager = new VideoChannelManager();
    
    // Start live status monitoring
    videoManager.startLiveStatusMonitoring();
    
    // Make it globally available for debugging
    window.videoManager = videoManager;
});

// Export for use in other modules
window.VideoChannelManager = VideoChannelManager;