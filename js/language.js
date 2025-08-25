// Language Switching Functionality for Yuki Koyama Portfolio
// GitHub Pages Compatible

let currentLanguage = 'ja';

// Language data
const translations = {
    ja: {
        // Navigation
        'ABOUT': 'ABOUT',
        'INTERACTIVE': 'INTERACTIVE',
        'WORKS': 'WORKS',
        'VIDEOS': 'VIDEOS',
        'SKILLS': 'SKILLS',
        'PRICING': 'PRICING',
        'CONTACT': 'CONTACT',
        
        // Hero Section
        'Bridging': 'Bridging',
        'Worlds': 'Worlds',
        'hero-description': '技術とクリエイティブの境界を溶かし、アイデアを現実に。<br>エンジニアリングとアートを越境し、前例のないプロジェクトを実現する。',
        'Experience Interactive Demo': 'Experience Interactive Demo',
        
        // About Section
        'ABOUT ME': 'ABOUT ME',
        'profile-subtitle': '小山 裕貴 / Forethumb LLC 代表',
        'about-p1': '鹿児島に生まれ、NY留学や離島生活を経て多様な価値観を育む。筑波大学在学中にメディアアート研究、人工衛星開発、福祉用キーボード開発で技術の礎を築き、Forethumb LLCを起業。',
        'about-p2': 'ハードウェアエンジニアからキャリアを始め、テクニカルディレクター、カメラマン、経営者と、常に領域を越境。技術とクリエイティブ、理論と実践を繋ぐハブとして、複雑なプロジェクトを成功に導きます。',
        
        // Interactive Section
        'INTERACTIVE EXPERIENCE': 'INTERACTIVE EXPERIENCE',
        'interactive-subtitle': '映像技術 × エンジニアリング体験',
        'Signal Processing Lab': 'Signal Processing Lab',
        'signal-description': '放送技術で使用する信号波形をリアルタイム生成',
        'Circuit Designer': 'Circuit Designer',
        'circuit-description': 'ハードウェア設計の基礎回路をインタラクティブに構築',
        'Visual Effects Playground': 'Visual Effects Playground',
        'effects-description': '映像制作で使用するリアルタイムエフェクトを体験',
        'フルスクリーン': 'フルスクリーン',
        '終了': '終了',
        
        // Value Section
        'OUR VALUE': 'OUR VALUE',
        'value-subtitle': 'ワンストップで実現する実装力',
        'tech-fusion-title': '技術と表現の融合',
        'tech-fusion-desc': 'エンジニアリングとクリエイティブ、両言語を深く理解し、ポテンシャルを最大化する企画を立案します。',
        'implementation-title': '圧倒的な現場技術力',
        'implementation-desc': '国際展示から国家規模の放送、インフラ現場まで。多様な現場経験がプロジェクトを成功に導きます。',
        'network-title': '強力なネットワーク',
        'network-desc': '各分野のプロと連携し、企画から開発、制作、運用まで最適なチームを編成して実現します。',
        
        // Works Section
        'SELECTED WORKS': 'SELECTED WORKS',
        'works-subtitle': '主要プロジェクトタイムライン',
        'fendi-title': 'FENDI SPY スペシャルムービー (1st AC)',
        'fendi-desc': '新たなジャンルの映像に進出中。',
        'saudi-title': 'サウジアラビア国際放送中継',
        'saudi-desc': '日本側放送技術チーフコーディネーターとして、NHKテクノロジースタッフ100名以上を率い、国家プロジェクトを成功に導く。',
        'interactive-system-title': 'インタラクティブ映像・音響システム開発',
        'interactive-system-desc': '自社プロダクトとして、次世代のインタラクティブ映像・音響技術を開発中。視聴者の反応に応じてリアルタイムに変化する映像・音響体験システムの構築。2025年中に一部機能の公開を予定。',
        'ai-analysis-title': 'AI駆動消費者行動分析システム',
        'ai-analysis-desc': '動画解析とAI学習により、評価者の判断基準を反映した非ルールベースの消費者行動分析システムを開発。従来の定量的指標に加え、感性的・直感的な評価要素をAIが学習し、より人間的な消費者行動の予測を実現。',
        'vr-title': '大手通信会社VRコンテンツ検証実験',
        'vr-desc': '大手通信会社からのVRコンテンツ検証実験を受託。次世代通信技術の実証に貢献。',
        'aist-title': '産総研技術移転ベンチャーCTO',
        'aist-desc': '画像/音響センシングに関する特許の社会実装をリード。鉄道インフラ向け計測システムを開発・導入。',
        'media-art-title': 'メディアアート テクニカルディレクション',
        'media-art-desc': '落合陽一氏、藤堂高行氏など、日本を代表するアーティストの国内外の展示でテクニカルディレクションを多数担当。',
        'major-works': '主要参加作品',
        'seer-desc': '初期の電子基板設計から各種展示のテクニカルディレクションまでを担当。複雑なインタラクティブシステムの技術実装を実現。',
        'dogonaleash-desc': 'テクニカルディレクション及びプロトタイピングを担当。アイデアから実装まで、技術的実現可能性を検証しながら作品制作をサポート。',
        '作品詳細': '作品詳細',
        '国立博物館 展示技術開発スタッフ': '国立博物館 展示技術開発スタッフ',
        '国立博物館における展示技術の開発・運用に携わり、文化財の保護と最新技術を両立する展示システムを構築。来館者体験向上のためのインタラクティブ技術導入や、デジタルアーカイブシステムの開発を担当。': '国立博物館における展示技術の開発・運用に携わり、文化財の保護と最新技術を両立する展示システムを構築。来館者体験向上のためのインタラクティブ技術導入や、デジタルアーカイブシステムの開発を担当。',
        'forethumb-title': 'Forethumb LLC 設立',
        'forethumb-desc': '筑波大学在学中に起業。モールス式キーボード開発から始まり、人工衛星開発、VRコンテンツ開発など、常に新しい領域に挑戦。',
        
        // Video Channels Section
        'VIDEO CHANNELS': 'VIDEO CHANNELS',
        'video-channels-subtitle': '映像制作チャンネル & サンプル映像',
        'YouTube チャンネル': 'YouTube チャンネル',
        'youtube-role-description': '撮って出し素材納品のロケカメラマンとして参加',
        'サンプル映像': 'サンプル映像',
        'チャンネルを見る': 'チャンネルを見る',
        '作品を見る': '作品を見る',
        '全ての作品を見る': '全ての作品を見る',
        '最新動画を読み込み中...': '最新動画を読み込み中...',
        '最新映像を読み込み中...': '最新映像を読み込み中...',
        'LIVE': 'LIVE',
        
        // Skills Section
        'CORE SKILLS': 'CORE SKILLS',
        'skills-subtitle': '専門領域と技術スタック',
        'Creative & Direction': 'Creative & Direction',
        'テクニカルディレクション': 'テクニカルディレクション',
        '映像監督・撮影 (シネマ/ビデオ)': '映像監督・撮影 (シネマ/ビデオ)',
        'ライブスイッチング': 'ライブスイッチング',
        'プロジェクトマネジメント': 'プロジェクトマネジメント',
        'Hardware Engineering': 'Hardware Engineering',
        '回路・基板設計 (KiCad)': '回路・基板設計 (KiCad)',
        '組込みシステム (Arduino/M5Stack)': '組込みシステム (Arduino/M5Stack)',
        '3Dモデリング & プリンティング': '3Dモデリング & プリンティング',
        '無線技術 (2陸技)': '無線技術 (2陸技)',
        'Software Development': 'Software Development',
        '画像・音響センシング': '画像・音響センシング',
        'AIアプリケーション開発': 'AIアプリケーション開発',
        'Business': 'Business',
        '事業開発': '事業開発',
        'CTO/役員経験': 'CTO/役員経験',
        '技術コンサルティング': '技術コンサルティング',
        '特許戦略・社会実装': '特許戦略・社会実装',
        
        // Contact Section
        'GET IN TOUCH': 'GET IN TOUCH',
        'contact-subtitle': '新しい挑戦を、共に。',
        'contact-description': '「技術とクリエイティブを掛け合わせた、新しい挑戦をしたい」<br>「アイデアはあるが、どう実現すればいいかわからない」<br><br>そんな時は、ぜひお気軽にご相談ください。<br>共に情報メディアの次の可能性を切り拓きましょう。',
        
        // Visual Effects
        'テストパターン (Intensity適用なし)': 'テストパターン (Intensity適用なし)',
        'エフェクト (Intensity適用あり)': 'エフェクト (Intensity適用あり)',
        
        // Footer
        'copyright': '&copy; 2024 Yuki Koyama / Forethumb LLC. All Rights Reserved.'
    },
    
    en: {
        // Navigation
        'ABOUT': 'ABOUT',
        'INTERACTIVE': 'INTERACTIVE',
        'WORKS': 'WORKS',
        'VIDEOS': 'VIDEOS',
        'SKILLS': 'SKILLS',
        'PRICING': 'PRICING',
        'CONTACT': 'CONTACT',
        
        // Hero Section
        'Bridging': 'Bridging',
        'Worlds': 'Worlds',
        'hero-description': 'Dissolving the boundaries between technology and creativity, turning ideas into reality.<br>Crossing the borders of engineering and art to realize unprecedented projects.',
        'Experience Interactive Demo': 'Experience Interactive Demo',
        
        // About Section
        'ABOUT ME': 'ABOUT ME',
        'profile-subtitle': 'Yuki Koyama / CEO of Forethumb LLC',
        'about-p1': 'Born in Kagoshima, developed diverse perspectives through NY study abroad and island life. Built technical foundation through media art research, satellite development, and welfare keyboard development at University of Tsukuba, then founded Forethumb LLC.',
        'about-p2': 'Started career as hardware engineer, constantly crossing domains as technical director, cameraman, and business executive. Serves as a hub connecting technology and creativity, theory and practice, leading complex projects to success.',
        
        // Interactive Section
        'INTERACTIVE EXPERIENCE': 'INTERACTIVE EXPERIENCE',
        'interactive-subtitle': 'Video Technology × Engineering Experience',
        'Signal Processing Lab': 'Signal Processing Lab',
        'signal-description': 'Real-time generation of signal waveforms used in broadcast technology',
        'Circuit Designer': 'Circuit Designer',
        'circuit-description': 'Interactive construction of basic circuits for hardware design',
        'Visual Effects Playground': 'Visual Effects Playground',
        'effects-description': 'Experience real-time effects used in video production',
        'フルスクリーン': 'Fullscreen',
        '終了': 'Exit',
        
        // Value Section
        'OUR VALUE': 'OUR VALUE',
        'value-subtitle': 'One-stop Implementation Power',
        'tech-fusion-title': 'Fusion of Technology and Expression',
        'tech-fusion-desc': 'Deeply understanding both engineering and creative languages, we develop plans that maximize potential.',
        'implementation-title': 'Overwhelming Field Technology',
        'implementation-desc': 'From international exhibitions to national-scale broadcasting and infrastructure sites. Diverse field experience leads projects to success.',
        'network-title': 'Powerful Network',
        'network-desc': 'Collaborating with professionals in each field, we form optimal teams from planning to development, production, and operation.',
        
        // Video Channels Section
        'VIDEO CHANNELS': 'VIDEO CHANNELS',
        'video-channels-subtitle': 'Video Production Channels & Sample Videos',
        'YouTube チャンネル': 'YouTube Channels',
        'youtube-role-description': 'Participating as location cameraman for direct delivery footage',
        'サンプル映像': 'Sample Videos',
        'チャンネルを見る': 'View Channel',
        '作品を見る': 'View Works',
        '全ての作品を見る': 'View All Works',
        '最新動画を読み込み中...': 'Loading latest video...',
        '最新映像を読み込み中...': 'Loading latest video...',
        'LIVE': 'LIVE',
        '1st ACとして参加させていただきました。': 'Participated as 1st AC.',
        '1st ACとして参加させていただきました。': 'Participated as 1st AC.',
        
        // Works Section
        'SELECTED WORKS': 'SELECTED WORKS',
        'works-subtitle': 'Major Project Timeline',
        'fendi-title': 'FENDI SPY Special Movie (1st AC)',
        'fendi-desc': 'Expanding into new genres of video production.',
        'saudi-title': 'Saudi Arabia International Broadcasting Relay',
        'saudi-desc': 'As chief coordinator of broadcast technology on the Japanese side, led over 100 NHK technology staff to successfully complete a national project.',
        'interactive-system-title': 'Interactive Video & Audio System Development',
        'interactive-system-desc': 'Developing next-generation interactive video and audio technologies as proprietary products. Building systems for video and audio experiences that change in real-time based on viewer reactions. Partial functionality release planned for 2025.',
        'ai-analysis-title': 'AI-Driven Consumer Behavior Analysis System',
        'ai-analysis-desc': 'Developed a non-rule-based consumer behavior analysis system using video analysis and AI learning that reflects evaluator judgment criteria. In addition to traditional quantitative metrics, AI learns emotional and intuitive evaluation elements to achieve more human-like consumer behavior prediction.',
        'vr-title': 'Major Telecom Company VR Content Verification',
        'vr-desc': 'Contracted VR content verification experiments from major telecom company. Contributed to next-generation communication technology demonstration.',
        'aist-title': 'AIST Technology Transfer Venture CTO',
        'aist-desc': 'Led social implementation of patents related to image/acoustic sensing. Developed and deployed measurement systems for railway infrastructure.',
        'media-art-title': 'Media Art Technical Direction',
        'media-art-desc': 'Handled technical direction for numerous domestic and international exhibitions by leading Japanese artists including Yoichi Ochiai and Takayuki Todo.',
        'major-works': 'Major Participated Works',
        'seer-desc': 'Responsible for initial electronic circuit board design to technical direction for various exhibitions. Realized technical implementation of complex interactive systems.',
        'dogonaleash-desc': 'Responsible for technical direction and prototyping. Supported artwork creation while verifying technical feasibility from idea to implementation.',
        '作品詳細': 'View Work',
        '国立博物館 展示技術開発スタッフ': 'National Museum Exhibition Technology Development Staff',
        '国立博物館における展示技術の開発・運用に携わり、文化財の保護と最新技術を両立する展示システムを構築。来館者体験向上のためのインタラクティブ技術導入や、デジタルアーカイブシステムの開発を担当。': 'Engaged in the development and operation of exhibition technologies at national museums, building display systems that balance cultural property protection with cutting-edge technology. Responsible for introducing interactive technologies to enhance visitor experience and developing digital archive systems.',
        '国立博物館 展示技術開発スタッフ': 'National Museum Exhibition Technology Development Staff',
        '国立博物館における展示技術の開発・運用に携わり、文化財の保護と最新技術を両立する展示システムを構築。来館者体験向上のためのインタラクティブ技術導入や、デジタルアーカイブシステムの開発を担当。': 'Engaged in the development and operation of exhibition technologies at national museums, building display systems that balance cultural property protection with cutting-edge technology. Responsible for introducing interactive technologies to enhance visitor experience and developing digital archive systems.',
        'museum-title': 'National Museum Exhibition Technology Development Staff',
        'museum-desc': 'Engaged in the development and operation of exhibition technologies at national museums, building display systems that balance cultural property protection with cutting-edge technology. Responsible for introducing interactive technologies to enhance visitor experience and developing digital archive systems.',
        'forethumb-title': 'Founded Forethumb LLC',
        'forethumb-desc': 'Founded company while studying at University of Tsukuba. Started with Morse keyboard development, constantly challenging new domains including satellite development and VR content development.',
        
        // Major Works - Artists
        'by 藤堂高行': 'by Takayuki Todo',
        'by Takayuki Todo': 'by Takayuki Todo',
        
        // Tags - Small
        '電子基板設計': 'PCB Design',
        'テクニカルD': 'Technical Direction',
        'インタラクティブ': 'Interactive',
        'プロトタイピング': 'Prototyping',
        '技術検証': 'Tech Validation',
        
        // Tags - Regular
        '展示技術': 'Exhibition Tech',
        '文化財保護': 'Cultural Heritage',
        'インタラクティブシステム': 'Interactive Systems',
        'デジタルアーカイブ': 'Digital Archive',
        '起業': 'Startup',
        'ハードウェア開発': 'Hardware Dev',
        'プロダクト開発': 'Product Dev',
        
        // Skills Section
        'CORE SKILLS': 'CORE SKILLS',
        'skills-subtitle': 'Specialized Domains and Technology Stack',
        'Creative & Direction': 'Creative & Direction',
        'テクニカルディレクション': 'Technical Direction',
        '映像監督・撮影 (シネマ/ビデオ)': 'Video Direction & Shooting (Cinema/Video)',
        'ライブスイッチング': 'Live Switching',
        'プロジェクトマネジメント': 'Project Management',
        'Hardware Engineering': 'Hardware Engineering',
        '回路・基板設計 (KiCad)': 'Circuit & PCB Design (KiCad)',
        '組込みシステム (Arduino/M5Stack)': 'Embedded Systems (Arduino/M5Stack)',
        '3Dモデリング & プリンティング': '3D Modeling & Printing',
        '無線技術 (2陸技)': 'Radio Technology (2nd Land)',
        'Software Development': 'Software Development',
        '画像・音響センシング': 'Image & Audio Sensing',
        'AIアプリケーション開発': 'AI Application Development',
        'Business': 'Business',
        '事業開発': 'Business Development',
        'CTO/役員経験': 'CTO/Executive Experience',
        '技術コンサルティング': 'Technical Consulting',
        '特許戦略・社会実装': 'Patent Strategy & Social Implementation',
        
        // Contact Section
        'GET IN TOUCH': 'GET IN TOUCH',
        'contact-subtitle': 'New challenges, together.',
        'contact-description': '\'I want to take on new challenges combining technology and creativity\'<br>\'I have ideas but don\'t know how to realize them\'<br><br>In such cases, please feel free to consult with us.<br>Let\'s explore the next possibilities of information media together.',
        
        // Visual Effects
        'テストパターン (Intensity適用なし)': 'Test Patterns (No Intensity)',
        'エフェクト (Intensity適用あり)': 'Effects (With Intensity)',
        
        // Footer
        'copyright': '&copy; 2024 Yuki Koyama / Forethumb LLC. All Rights Reserved.'
    }
};

// Language switching function
window.switchLanguage = function(lang) {
    if (lang === currentLanguage) return;
    
    currentLanguage = lang;
    document.documentElement.lang = lang;
    
    // Update button states
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-pressed', 'false');
    });
    const activeButton = document.getElementById(`lang${lang.charAt(0).toUpperCase() + lang.slice(1)}`);
    activeButton.classList.add('active');
    activeButton.setAttribute('aria-pressed', 'true');
    
    // Update all elements with language attributes
    document.querySelectorAll('[data-lang-ja], [data-lang-alt-ja]').forEach(element => {
        // Handle alt attributes for images
        if (element.hasAttribute(`data-lang-alt-${lang}`)) {
            const altText = element.getAttribute(`data-lang-alt-${lang}`);
            if (altText) {
                element.setAttribute('alt', altText);
            }
        }
        
        // Handle text content
        if (element.hasAttribute(`data-lang-${lang}`)) {
            const key = element.getAttribute(`data-lang-${lang}`);
            if (key) {
                if (element.tagName === 'INPUT' && element.type === 'button') {
                    element.value = key;
                } else {
                    element.innerHTML = key;
                }
            }
        }
    });
    
    // Update aria-labels for better accessibility
    document.querySelectorAll('[data-aria-label-ja]').forEach(element => {
        const ariaLabel = element.getAttribute(`data-aria-label-${lang}`);
        if (ariaLabel) {
            element.setAttribute('aria-label', ariaLabel);
        }
    });
    
    // Update fullscreen button text if it exists
    const fullscreenBtn = document.getElementById('fullscreenBtn');
    if (fullscreenBtn) {
        const isFullscreen = document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement;
        if (isFullscreen) {
            const exitText = lang === 'en' ? 'Exit' : '終了';
            fullscreenBtn.innerHTML = `<i class="fas fa-compress mr-1"></i>${exitText}`;
            fullscreenBtn.setAttribute('aria-label', lang === 'en' ? 'Exit fullscreen mode' : 'フルスクリーンモードを終了する');
        } else {
            const fullscreenText = lang === 'en' ? 'Fullscreen' : 'フルスクリーン';
            fullscreenBtn.innerHTML = `<i class="fas fa-expand mr-1"></i>${fullscreenText}`;
            fullscreenBtn.setAttribute('aria-label', lang === 'en' ? 'Enter fullscreen mode' : 'フルスクリーンモードに切り替える');
        }
    }
    
    // Update document language
    document.documentElement.setAttribute('lang', lang);
    
    // Store language preference
    localStorage.setItem('preferred-language', lang);
}

// Initialize language on page load
document.addEventListener('DOMContentLoaded', function() {
    // Check for stored language preference
    const storedLang = localStorage.getItem('preferred-language');
    const browserLang = navigator.language.startsWith('ja') ? 'ja' : 'en';
    const initialLang = storedLang || browserLang;
    
    if (initialLang !== 'ja') {
        switchLanguage(initialLang);
    }
});