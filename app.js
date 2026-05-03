// 主应用模块
const App = {
    // 当前状态
    state: {
        currentView: 'home',
        currentProvince: null,
        currentDistrict: null,
        currentBuildingName: null,
        currentTag: null,

        theme: localStorage.getItem('theme') || 'light'
    },

    // 缓存机制
    _cache: {
        buildingCards: new Map(),
        tagStyles: new Map(),
        protectionBadges: new Map(),
        truncatedTexts: new Map(),
        buildingByName: new Map()
    },

    // 缓存大小限制
    _cacheLimits: {
        buildingCards: 200,
        tagStyles: 100,
        protectionBadges: 50,
        truncatedTexts: 500
    },

    // 省份图标和颜色配置
    provinceStyles: {
        'beijing': { icon: '⛩️', color: '#e74c3c', bgColor: '#fdf2f2' },
        'tianjin': { icon: '⚓', color: '#3498db', bgColor: '#ebf5fb' },
        'hebei': { icon: '🏔️', color: '#2ecc71', bgColor: '#eafaf1' },
        'shanxi': { icon: '🏛️', color: '#9b59b6', bgColor: '#f5eef8' },
        'neimenggu': { icon: '🌿', color: '#1abc9c', bgColor: '#e8f8f5' },
        'liaoning': { icon: '⚙️', color: '#34495e', bgColor: '#f2f4f6' },
        'jilin': { icon: '🌲', color: '#16a085', bgColor: '#e8f6f3' },
        'heilongjiang': { icon: '❄️', color: '#2980b9', bgColor: '#eaf2f8' },
        'shanghai': { icon: '🌆', color: '#e67e22', bgColor: '#fef5e7' },
        'jiangsu': { icon: '🌊', color: '#3498db', bgColor: '#ebf5fb' },
        'zhejiang': { icon: '🏞️', color: '#27ae60', bgColor: '#eafaf1' },
        'anhui': { icon: '📜', color: '#8e44ad', bgColor: '#f5eef8' },
        'fujian': { icon: '🏝️', color: '#d35400', bgColor: '#fdf2e9' },
        'jiangxi': { icon: '🌸', color: '#c0392b', bgColor: '#fdedec' },
        'shandong': { icon: '🌅', color: '#2980b9', bgColor: '#eaf2f8' },
        'henan': { icon: '🏺', color: '#f39c12', bgColor: '#fef9e7' },
        'hubei': { icon: '🌉', color: '#e74c3c', bgColor: '#fdf2f2' },
        'hunan': { icon: '🌶️', color: '#16a085', bgColor: '#e8f6f3' },
        'guangdong': { icon: '🌺', color: '#e67e22', bgColor: '#fef5e7' },
        'guangxi': { icon: '🌴', color: '#27ae60', bgColor: '#eafaf1' },
        'hainan': { icon: '🥥', color: '#2ecc71', bgColor: '#eafaf1' },
        'chongqing': { icon: '🍲', color: '#9b59b6', bgColor: '#f5eef8' },
        'sichuan': { icon: '🐼', color: '#34495e', bgColor: '#f2f4f6' },
        'guizhou': { icon: '🌁', color: '#1abc9c', bgColor: '#e8f8f5' },
        'yunnan': { icon: '🦚', color: '#e74c3c', bgColor: '#fdf2f2' },
        'xizang': { icon: '🏔️', color: '#3498db', bgColor: '#ebf5fb' },
        'shaanxi': { icon: '🐴', color: '#8e44ad', bgColor: '#f5eef8' },
        'gansu': { icon: '🏜️', color: '#f39c12', bgColor: '#fef9e7' },
        'qinghai': { icon: '💧', color: '#2980b9', bgColor: '#eaf2f8' },
        'ningxia': { icon: '🌾', color: '#27ae60', bgColor: '#eafaf1' },
        'xinjiang': { icon: '🍇', color: '#9b59b6', bgColor: '#f5eef8' },
        'taiwan': { icon: '🏝️', color: '#e67e22', bgColor: '#fef5e7' },
        'hongkong': { icon: '🌃', color: '#34495e', bgColor: '#f2f4f6' },
        'macau': { icon: '🎰', color: '#c0392b', bgColor: '#fdedec' },
        'cross': { icon: '🗺️', color: '#16a085', bgColor: '#e8f6f3' }
    },

    // 标签图标和颜色配置 - 丰富的图标库，确保不重复
    // 中国古建筑配色方案
    colorPalette: [
        { color: '#B22222', bg: '#FDF2F2' }, // 朱红
        { color: '#8B4513', bg: '#FDF8F3' }, // 赭石
        { color: '#2F4F4F', bg: '#F0F5F5' }, // 墨绿
        { color: '#1E3A5F', bg: '#F0F4F8' }, // 黛蓝
        { color: '#DAA520', bg: '#FDF9F0' }, // 藤黄
        { color: '#708090', bg: '#F5F5F7' }  // 青灰
    ],

    tagStyles: {
        // 建筑类型
        '古建筑': { icon: '🏮' },
        '近代建筑': { icon: '🏛️' },
        '现代建筑': { icon: '🏢' },

        // 宗教建筑
        '寺庙': { icon: '🛕' },
        '教堂': { icon: '⛪' },
        '清真寺': { icon: '🕌' },
        '道观': { icon: '☯️' },
        '宗教建筑': { icon: '🕍' },
        
        // 皇家/官式建筑
        '宫殿': { icon: '👑' },
        '衙署': { icon: '⚖️' },
        '关隘': { icon: '🏔️' },
        
        // 园林景观
        '园林': { icon: '🌿' },
        '风景建筑': { icon: '🏞️' },
        '游憩建筑': { icon: '🎋' },
        
        // 墓葬遗址
        '陵墓': { icon: '🪦' },
        '古墓葬': { icon: '⚰️' },
        '遗址': { icon: '🏺' },
        '古遗址': { icon: '🗿' },
        '墓葬': { icon: '🪦' },
        
        // 石刻艺术
        '石窟': { icon: '🧘' },
        '石窟寺': { icon: '🪨' },
        '石刻': { icon: '🗿' },
        '石刻艺术': { icon: '✨' },
        '雕塑': { icon: '🎭' },
        '壁画': { icon: '🎨' },
        
        // 塔阁亭台
        '塔': { icon: '🗼' },
        '楼阁': { icon: '🏯' },
        '亭台': { icon: '⛩️' },
        '钟鼓楼': { icon: '🥁' },
        '牌坊': { icon: '🎋' },
        
        // 交通设施
        '桥梁': { icon: '🌉' },
        '城墙': { icon: '🧱' },
        '长城': { icon: '🐉' },
        '烽燧': { icon: '🔥' },
        '驿站': { icon: '📮' },
        '码头': { icon: '⚓' },
        '运河': { icon: '🌊' },
        
        // 水利设施
        '水利': { icon: '💧' },
        '水利工程': { icon: '🚰' },
        
        // 教育文化
        '书院': { icon: '📚' },
        '学堂': { icon: '🎓' },
        '教育建筑': { icon: '📖' },
        '博物馆': { icon: '🗿' },
        
        // 居住建筑
        '民居': { icon: '🏠' },
        '居住建筑': { icon: '🏘️' },
        '传统村落': { icon: '🏡' },
        '四合院': { icon: '🏚️' },
        '会馆': { icon: '🏤' },
        '祠堂': { icon: '👪' },
        
        // 商业金融
        '商业建筑': { icon: '🏪' },
        '金融建筑': { icon: '🏦' },
        '工业建筑': { icon: '🏭' },
        '工业遗产': { icon: '⚙️' },
        
        // 医疗公共
        '医疗建筑': { icon: '🏥' },
        '公共建筑': { icon: '🏬' },
        
        // 祭祀纪念
        '祭坛': { icon: '🕯️' },
        '纪念建筑': { icon: '🗽' },
        '影壁': { icon: '🧱' },
        '照壁': { icon: '🪞' },
        
        // 天文科技
        '天文': { icon: '🔭' },
        
        // 遗产类型
        '世界遗产': { icon: '🌟' },
        '自然遗产': { icon: '🌲' },
        '文化景观': { icon: '🌄' },
        '混合遗产': { icon: '🗺️' },
        
        // 历史文化
        '历史文化街区': { icon: '🏙️' },
        '名人故居': { icon: '👤' },
        '革命遗址': { icon: '✊' },
        '红色旅游': { icon: '⭐' },
        '爱国主义教育': { icon: '❤️' },
        '历史纪念': { icon: '📜' },

        // 特色类型
        '古建筑群': { icon: '🏘️' },
        '广场建筑': { icon: '⛲' },
        '意式建筑': { icon: '🏫' },
        '辽代艺术': { icon: '🎨' },
        '百货商场': { icon: '🛍️' },
        '海洋文化': { icon: '🐚' },
        '近代工业': { icon: '⚙️' },
        '思想家': { icon: '💭' },
        '历史遗产': { icon: '📜' }
    },

    // 获取标签样式（带缓存）
    getTagStyle(tagName, index) {
        // 创建缓存键
        const cacheKey = `${tagName}_${index % this.colorPalette.length}`;

        // 检查缓存
        if (this._cache.tagStyles.has(cacheKey)) {
            return this._cache.tagStyles.get(cacheKey);
        }

        const style = this.tagStyles[tagName] || { icon: '🏷️' };
        const palette = this.colorPalette[index % this.colorPalette.length];
        const result = {
            ...style,
            color: palette.color,
            bg: palette.bg
        };

        // 存入缓存，限制缓存大小
        if (this._cache.tagStyles.size >= this._cacheLimits.tagStyles) {
            const firstKey = this._cache.tagStyles.keys().next().value;
            this._cache.tagStyles.delete(firstKey);
        }
        this._cache.tagStyles.set(cacheKey, result);

        return result;
    },

    // 初始化
    init() {
        this.setupTheme();
        this.setupEventListeners();
        this.setupNavigation();
        this.render();
        this._scheduleBackgroundPreload();
    },

    _scheduleBackgroundPreload() {
        if ('requestIdleCallback' in window) {
            requestIdleCallback(() => this._preloadAllData(), { timeout: 1500 });
        } else {
            setTimeout(() => this._preloadAllData(), 100);
        }
    },

    // 数据加载完成回调
    _onDataLoadedCallbacks: [],

    // 注册数据加载完成回调
    onDataLoaded(callback) {
        if (this._allDataLoaded) {
            callback();
        } else {
            this._onDataLoadedCallbacks.push(callback);
        }
    },

    // 后台预加载数据 - 优先加载常用省份，其他按需加载
    async _preloadAllData() {
        // 优先加载的省份（数据量大且常用）
        const priorityProvinces = [
            'beijing', 'shanxi', 'henan', 'shaanxi', 'sichuan',
            'jiangsu', 'zhejiang', 'shandong', 'hebei'
        ];

        // 先加载优先省份
        for (let i = 0; i < priorityProvinces.length; i += 2) {
            const batch = priorityProvinces.slice(i, i + 2);
            await Promise.all(batch.map(id => this.loadProvinceData(id)));
            this._onDataLoadedCallbacks.forEach(cb => {
                try { cb(); } catch (e) {}
            });
        }

        // 标记核心数据已加载（足够标签和搜索使用）
        this._coreDataLoaded = true;

        // 使用 requestIdleCallback 在浏览器空闲时加载剩余数据
        const loadRemaining = async () => {
            const remaining = Object.keys(this.dataModules).filter(
                id => !priorityProvinces.includes(id) && id !== 'cross'
            );
            for (let i = 0; i < remaining.length; i += 3) {
                const batch = remaining.slice(i, i + 3);
                await Promise.all(batch.map(id => this.loadProvinceData(id)));
                this._onDataLoadedCallbacks.forEach(cb => {
                    try { cb(); } catch (e) {}
                });
            }
            this._allDataLoaded = true;
            this._onDataLoadedCallbacks.forEach(cb => {
                try { cb(); } catch (e) {}
            });
            this._onDataLoadedCallbacks = [];
        };

        if ('requestIdleCallback' in window) {
            requestIdleCallback(() => loadRemaining(), { timeout: 5000 });
        } else {
            setTimeout(loadRemaining, 2000);
        }
    },

    // 设置主题
    setupTheme() {
        document.documentElement.setAttribute('data-theme', this.state.theme);
    },

    // 切换主题
    toggleTheme() {
        this.state.theme = this.state.theme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', this.state.theme);
        localStorage.setItem('theme', this.state.theme);
    },

    // 设置事件监听
    setupEventListeners() {
        // 主题切换
        document.querySelector('.theme-toggle')?.addEventListener('click', () => {
            this.toggleTheme();
        });

        // 移动端导航切换
        document.querySelector('.nav-toggle')?.addEventListener('click', () => {
            document.querySelector('.nav-menu')?.classList.toggle('active');
        });

        // 导航链接点击事件委托（处理强制刷新）
        document.addEventListener('click', (e) => {
            const navLink = e.target.closest('.nav-link');
            if (navLink && navLink.getAttribute('data-force-render') === 'true') {
                const href = navLink.getAttribute('href');
                if (href && window.location.hash === href) {
                    e.preventDefault();
                    this.parseHash();
                    this.render();
                }
            }
        });

        // 建筑卡片点击事件委托
        document.addEventListener('click', (e) => {
            const card = e.target.closest('.building-card');
            if (card) {
                e.preventDefault();
                e.stopPropagation();
                const hashUrl = card.getAttribute('data-hash');
                if (hashUrl) {
                    window.location.hash = hashUrl;
                }
            }
        });
    },

    // 设置导航
    setupNavigation() {
        window.addEventListener('hashchange', () => {
            this.parseHash();
            this.render();
        });
        this.parseHash();
    },

    // 解析URL hash
    parseHash() {
        const hash = window.location.hash.slice(1) || 'home';
        const parts = hash.split('/');

        this.state.currentView = parts[0] || 'home';
        this.state.currentProvince = null;
        this.state.currentDistrict = null;
        this.state.currentBuildingName = null;
        this.state.currentTag = null;
        this.state.currentTopic = null;
        this.state.currentRoute = null;
        this.state.currentGame = null;

        // 处理建筑详情页URL格式
        if (this.state.currentView === 'building' && parts[1]) {
            const fullPath = decodeURIComponent(parts[1]);
            this.state.currentBuildingName = fullPath;
        } else if (this.state.currentView === 'province' && parts[1]) {
            this.state.currentProvince = parts[1];
            if (parts[2]) {
                // 如果有三个部分 (province/tianjin/heping)，则是区县页面
                this.state.currentDistrict = parts[2];
                this.state.currentView = 'district';
            }
        } else if (this.state.currentView === 'tag' && parts[1]) {
            this.state.currentTag = decodeURIComponent(parts[1]);
        } else if (this.state.currentView === 'story' && parts[1]) {
            this.state.currentTopic = decodeURIComponent(parts[1]);
        } else if (this.state.currentView === 'route' && parts[1]) {
            this.state.currentRoute = decodeURIComponent(parts[1]);
        } else if (this.state.currentView === 'game' && parts[1]) {
            this.state.currentGame = decodeURIComponent(parts[1]);
        }

        // 关闭移动端菜单
        document.querySelector('.nav-menu')?.classList.remove('active');
    },

    // 数据模块映射表
    dataModules: {
        'beijing': 'BeijingData',
        'tianjin': 'TianjinData',
        'hebei': 'HebeiData',
        'shanxi': 'ShanxiData',
        'neimenggu': 'NeimengguData',
        'liaoning': 'LiaoningData',
        'jilin': 'JilinData',
        'heilongjiang': 'HeilongjiangData',
        'shanghai': 'ShanghaiData',
        'jiangsu': 'JiangsuData',
        'zhejiang': 'ZhejiangData',
        'anhui': 'AnhuiData',
        'fujian': 'FujianData',
        'jiangxi': 'JiangxiData',
        'shandong': 'ShandongData',
        'henan': 'HenanData',
        'hubei': 'HubeiData',
        'hunan': 'HunanData',
        'guangdong': 'GuangdongData',
        'guangxi': 'GuangxiData',
        'hainan': 'HainanData',
        'chongqing': 'ChongqingData',
        'sichuan': 'SichuanData',
        'guizhou': 'GuizhouData',
        'yunnan': 'YunnanData',
        'xizang': 'XizangData',
        'shaanxi': 'ShaanxiData',
        'gansu': 'GansuData',
        'qinghai': 'QinghaiData',
        'ningxia': 'NingxiaData',
        'xinjiang': 'XinjiangData',
        'taiwan': 'TaiwanData',
        'hongkong': 'HongKongData',
        'macau': 'MacauData',
        'cross': 'CrossProvinceData'
    },

    // 已加载的模块
    _loadedModules: new Set(),

    // 脚本文件名映射（当 provinceId 和文件名不一致时使用）
    scriptFileMap: {
        'cross': 'cross-province'
    },

    // 按需加载省份数据
    async loadProvinceData(provinceId) {
        const moduleName = this.dataModules[provinceId];
        if (!moduleName) return null;

        // 如果已经加载过，直接返回
        if (this._loadedModules.has(provinceId)) {
            return window[moduleName];
        }

        // 如果已经在window中，标记为已加载
        if (typeof window[moduleName] !== 'undefined') {
            this._loadedModules.add(provinceId);
            return window[moduleName];
        }

        // 动态加载脚本
        const fileName = this.scriptFileMap[provinceId] || provinceId;
        try {
            await this._loadScript(`data/${fileName}.js?v=3`);
            this._loadedModules.add(provinceId);
            return window[moduleName];
        } catch (error) {
            return null;
        }
    },

    // 加载单个脚本
    _loadScript(src) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    },

    // 加载多个省份数据
    async loadProvinces(provinceIds) {
        const promises = provinceIds.map(id => this.loadProvinceData(id));
        await Promise.all(promises);
    },

    _resolveBuildingRef(buildingRef, extraModule) {
        if (!buildingRef) return null;
        if (buildingRef.embedded) return buildingRef.embedded;

        if (extraModule && typeof extraModule.getBuildingByName === 'function') {
            const b = extraModule.getBuildingByName(buildingRef.name);
            if (b) return b;
        }

        const moduleName = this.dataModules[buildingRef.province];
        if (moduleName && typeof window[moduleName] !== 'undefined') {
            const module = window[moduleName];
            if (module && typeof module.getBuildingByName === 'function') {
                return module.getBuildingByName(buildingRef.name);
            }
        }

        return null;
    },

    // 根据完整路径查找建筑（带名称索引缓存）
    findBuildingByFullPath(fullPath) {
        if (this._cache.buildingByName.has(fullPath)) {
            return this._cache.buildingByName.get(fullPath);
        }

        let building = null;

        for (const moduleName of Object.values(this.dataModules)) {
            if (typeof window[moduleName] !== 'undefined') {
                const module = window[moduleName];
                if (module && typeof module.getBuildingByName === 'function') {
                    building = module.getBuildingByName(fullPath);
                    if (building) break;
                }
            }
        }

        if (!building) {
            for (const storyMeta of StoryManager.getAllStories()) {
                const module = window[storyMeta.moduleName];
                if (module && typeof module.getBuildingByName === 'function') {
                    building = module.getBuildingByName(fullPath);
                    if (building) break;
                }
            }
        }

        if (!building) {
            for (const routeMeta of RouteManager.getAllRoutes()) {
                const module = window[routeMeta.moduleName];
                if (module && typeof module.getBuildingByName === 'function') {
                    building = module.getBuildingByName(fullPath);
                    if (building) break;
                }
            }
        }

        if (!building) {
            for (const gameMeta of GameManager.getAllGames()) {
                const module = window[gameMeta.moduleName];
                if (module && typeof module.getBuildingByName === 'function') {
                    building = module.getBuildingByName(fullPath);
                    if (building) break;
                }
            }
        }

        if (building) {
            this._cache.buildingByName.set(fullPath, building);
        }

        return building;
    },

    // 获取省份样式
    getProvinceStyle(provinceId) {
        return this.provinceStyles[provinceId] || { icon: '📍', color: '#3498db', bgColor: '#ebf5fb' };
    },

    // 生成建筑的hash URL
    generateBuildingHash(building) {
        // 使用中文省份名称而非拼音
        const provinceName = ProvincesData.getProvinceById(building.provinceId)?.name || building.province;
        const fullPath = `${provinceName}${building.districtName}${building.name}`;
        return `building/${encodeURIComponent(fullPath)}`;
    },

    // 导航到建筑详情
    navigateToBuilding(buildingName) {
        const hashUrl = `building/${encodeURIComponent(buildingName)}`;
        window.location.hash = hashUrl;
    },

    // 生成保护级别标识HTML（通用方法，避免重复代码）
    generateProtectionBadge(building) {
        // 创建缓存键
        const cacheKey = `${building.worldHeritage}_${building.worldHeritageYear}_${building.protectionLevel}_${building.protectionBatch}`;

        // 检查缓存
        if (this._cache.protectionBadges.has(cacheKey)) {
            return this._cache.protectionBadges.get(cacheKey);
        }

        let result = '';
        if (building.worldHeritage) {
            result = `<span class="protection-badge heritage">🌍 世界遗产${building.worldHeritageYear ? '·' + building.worldHeritageYear : ''}</span>`;
        } else if (building.protectionLevel === '全国重点文物保护单位') {
            result = `<span class="protection-badge national">${building.protectionBatch || '全国重点'}</span>`;
        }

        // 存入缓存，限制缓存大小
        if (this._cache.protectionBadges.size >= this._cacheLimits.protectionBadges) {
            const firstKey = this._cache.protectionBadges.keys().next().value;
            this._cache.protectionBadges.delete(firstKey);
        }
        this._cache.protectionBadges.set(cacheKey, result);

        return result;
    },

    // 截断文本（带缓存）
    truncateText(text, maxLength, suffix = '...') {
        if (!text) return '';
        if (text.length <= maxLength) return text;

        // 创建缓存键
        const cacheKey = `${text}_${maxLength}_${suffix}`;

        // 检查缓存
        if (this._cache.truncatedTexts.has(cacheKey)) {
            return this._cache.truncatedTexts.get(cacheKey);
        }

        const result = text.substring(0, maxLength) + suffix;

        // 存入缓存，限制缓存大小
        if (this._cache.truncatedTexts.size >= this._cacheLimits.truncatedTexts) {
            const firstKey = this._cache.truncatedTexts.keys().next().value;
            this._cache.truncatedTexts.delete(firstKey);
        }
        this._cache.truncatedTexts.set(cacheKey, result);

        return result;
    },

    // 主渲染函数
    render() {
        this.updateBreadcrumb();
        this.updateActiveNav();

        const mainContent = document.getElementById('mainContent');
        if (!mainContent) return;

        window.scrollTo(0, 0);

        switch (this.state.currentView) {
            case 'home':
                this.renderHome(mainContent);
                break;
            case 'provinces':
                this.renderProvinces(mainContent);
                break;
            case 'province':
                this.renderProvince(mainContent, this.state.currentProvince);
                break;
            case 'district':
                this.renderDistrict(mainContent, this.state.currentProvince, this.state.currentDistrict);
                break;
            case 'building':
                this.renderBuilding(mainContent, this.state.currentBuildingName);
                break;
            case 'tags':
                this.renderTags(mainContent);
                break;
            case 'tag':
                this.renderTagResults(mainContent, this.state.currentTag);
                break;
            case 'search':
                this.renderSearchPage(mainContent);
                break;
            case 'cross':
                this.renderCrossProvince(mainContent);
                break;
            case 'stories':
                this.renderTopics(mainContent);
                break;
            case 'story':
                this.renderTopicDetail(mainContent, this.state.currentTopic);
                break;
            case 'routes':
                this.renderRoutes(mainContent);
                break;
            case 'route':
                this.renderRouteDetail(mainContent, this.state.currentRoute);
                break;
            case 'games':
                this.renderGameList(mainContent);
                break;
            case 'game':
                this.renderGameDetail(mainContent, this.state.currentGame);
                break;
            default:
                this.renderHome(mainContent);
        }
    },

    // 更新面包屑导航
    updateBreadcrumb() {
        const breadcrumbList = document.getElementById('breadcrumbList');
        if (!breadcrumbList) return;

        let items = [{ name: '🏠 首页', hash: 'home' }];

        if (this.state.currentView === 'provinces') {
            items.push({ name: '🗺️ 省份', hash: 'provinces' });
        } else if (this.state.currentView === 'province' && this.state.currentProvince) {
            items.push({ name: '🗺️ 省份', hash: 'provinces' });
            const province = ProvincesData.getProvinceById(this.state.currentProvince);
            if (province) {
                const style = this.getProvinceStyle(this.state.currentProvince);
                items.push({ name: `${style.icon} ${province.name}`, hash: `province/${province.id}` });
            }
        } else if (this.state.currentView === 'district' && this.state.currentProvince && this.state.currentDistrict) {
            items.push({ name: '🗺️ 省份', hash: 'provinces' });
            const province = ProvincesData.getProvinceById(this.state.currentProvince);
            if (province) {
                const provinceStyle = this.getProvinceStyle(this.state.currentProvince);
                items.push({ name: `${provinceStyle.icon} ${province.name}`, hash: `province/${province.id}` });
                const district = this.getDistrictData(this.state.currentProvince, this.state.currentDistrict);
                if (district) {
                    items.push({ name: `📍 ${district.name}`, hash: `province/${province.id}/${district.id}` });
                }
            }
        } else if (this.state.currentView === 'building' && this.state.currentBuildingName) {
            const building = this.findBuildingByFullPath(this.state.currentBuildingName);
            if (building) {
                items.push({ name: '🗺️ 省份', hash: 'provinces' });
                const provinceStyle = this.getProvinceStyle(building.provinceId);
                items.push({ name: `${provinceStyle.icon} ${building.province}`, hash: `province/${building.provinceId}` });
                items.push({ name: `📍 ${building.districtName}`, hash: `province/${building.provinceId}/${building.district}` });
                items.push({ name: `🏛️ ${building.name}`, hash: this.generateBuildingHash(building), active: true });
            }
        } else if (this.state.currentView === 'tags') {
            items.push({ name: '🏷️ 标签', hash: 'tags' });
        } else if (this.state.currentView === 'tag') {
            items.push({ name: '🏷️ 标签', hash: 'tags' });
            const tagStyle = this.getTagStyle(this.state.currentTag, 0);
            items.push({ name: `${tagStyle.icon} ${this.state.currentTag}`, hash: `tag/${encodeURIComponent(this.state.currentTag)}`, active: true });
        } else if (this.state.currentView === 'search') {
            items.push({ name: '🔍 搜索', hash: 'search', active: true });
        } else if (this.state.currentView === 'cross') {
            items.push({ name: '🌊 跨省文物保护单位', hash: 'cross', active: true });
        } else if (this.state.currentView === 'stories') {
            items.push({ name: '📚 故事', hash: 'stories', active: true });
        } else if (this.state.currentView === 'story' && this.state.currentTopic) {
            items.push({ name: '📚 故事', hash: 'stories' });
            const topic = StoryManager.getStoryMeta(this.state.currentTopic);
            if (topic) {
                items.push({ name: `${topic.icon} ${topic.title}`, hash: `story/${topic.id}`, active: true });
            }
        } else if (this.state.currentView === 'routes') {
            items.push({ name: '🗺️ 路线', hash: 'routes', active: true });
        } else if (this.state.currentView === 'route' && this.state.currentRoute) {
            items.push({ name: '🗺️ 路线', hash: 'routes' });
            const route = RouteManager.getRouteMeta(this.state.currentRoute);
            if (route) {
                items.push({ name: `${route.icon} ${route.title}`, hash: `route/${route.id}`, active: true });
            }
        } else if (this.state.currentView === 'games') {
            items.push({ name: '🎮 游戏', hash: 'games', active: true });
        } else if (this.state.currentView === 'game' && this.state.currentGame) {
            items.push({ name: '🎮 游戏', hash: 'games' });
            const game = GameManager.getGameMeta(this.state.currentGame);
            if (game) {
                items.push({ name: `${game.icon} ${game.title}`, hash: `game/${game.id}`, active: true });
            }
        }

        breadcrumbList.innerHTML = items.map((item, index) => {
            const isLast = index === items.length - 1;
            if (isLast || item.active) {
                return `<li class="active">${item.name}</li>`;
            }
            return `<li><a href="#${item.hash}">${item.name}</a></li>`;
        }).join('');
    },

    // 更新活动导航
    updateActiveNav() {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === `#${this.state.currentView}`) {
                link.classList.add('active');
            }
        });
    },

    // 获取区县数据
    getDistrictData(provinceId, districtId) {
        const moduleName = this.dataModules[provinceId];
        if (moduleName && typeof window[moduleName] !== 'undefined') {
            const module = window[moduleName];
            if (module && module.districts && module.districts[districtId]) {
                return { id: districtId, ...module.districts[districtId] };
            }
        }
        return null;
    },

    // 渲染首页 - 异步加载数据后渲染
    async renderHome(container) {
        // 显示加载状态
        container.innerHTML = `
            <div class="container">
                <div style="text-align: center; padding: 3rem 0; color: var(--text-muted);">
                    <div style="font-size: 2rem; margin-bottom: 1rem;">🏛️</div>
                    <div>正在加载精彩内容...</div>
                </div>
            </div>
        `;

        const allTopicMetas = StoryManager.getAllStories();
        const allGameMetas = GameManager.getAllGames();
        const allRouteMetas = RouteManager.getAllRoutes();

        const selectedTopicMeta = this.shuffleArray([...allTopicMetas]).slice(0, 1)[0];
        const selectedGameMeta = this.shuffleArray([...allGameMetas]).slice(0, 1)[0];
        const selectedRouteMeta = this.shuffleArray([...allRouteMetas]).slice(0, 1)[0];

        const [topicData, gameData, routeData] = await Promise.all([
            selectedTopicMeta ? StoryManager.getStoryWithData(selectedTopicMeta.id) : Promise.resolve(null),
            selectedGameMeta ? GameManager.getGameWithData(selectedGameMeta.id) : Promise.resolve(null),
            selectedRouteMeta ? RouteManager.getRouteWithData(selectedRouteMeta.id) : Promise.resolve(null)
        ]);

        const validTopicData = topicData && topicData.story ? topicData : null;
        const validGameData = gameData && gameData.story ? gameData : null;
        const validRouteData = routeData && routeData.route && routeData.route.stops && routeData.route.stops.length > 0 ? routeData : null;

        if (!validTopicData && !validGameData && !validRouteData) {
            container.innerHTML = `
                <div class="container">
                    <div style="text-align: center; padding: 3rem 0; color: var(--text-muted);">
                        <div style="font-size: 2rem; margin-bottom: 1rem;">⚠️</div>
                        <div>加载失败，请刷新页面重试</div>
                    </div>
                </div>
            `;
            return;
        }

        const buildTopicSection = (topicData, type, index) => {
            const topicStory = topicData.story;
            const randomChapter = topicStory.chapters[Math.floor(Math.random() * topicStory.chapters.length)];
            const topicParagraphs = randomChapter.content.split('\n\n').filter(p => p.trim());
            const featuredTopicParagraphs = topicParagraphs.slice(0, 2);
            const hashPrefix = type === 'game' ? 'game' : 'story';

            return `
                <div class="home-topic-section" onclick="window.location.hash='${hashPrefix}/${topicData.id}'" style="${index > 0 ? 'margin-top: 2rem;' : ''}">
                    <div class="home-topic-header" style="display: flex; align-items: center; gap: 0.625rem; margin-bottom: 0.875rem; padding-bottom: 0.625rem; border-bottom: 2px solid ${topicData.color}30; cursor: pointer;">
                        <span style="font-size: 1.5rem;">${topicData.icon}</span>
                        <div>
                            <div style="font-size: 1.0625rem; font-weight: 700; color: var(--text-primary);">${topicData.title}</div>
                            <div style="font-size: 0.75rem; color: var(--text-muted);">${topicData.subtitle}</div>
                        </div>
                    </div>
                    <div class="home-chapter-layout">
                        <div class="home-chapter-content">
                            <h3 style="font-size: 1rem; font-weight: 700; color: var(--text-primary); margin: 0 0 0.5rem 0; display: flex; align-items: center; gap: 0.375rem;">
                                <span>${randomChapter.icon}</span>
                                ${randomChapter.title}
                            </h3>
                            <div style="font-size: 0.875rem; line-height: 1.7; color: var(--text-secondary);">
                                ${featuredTopicParagraphs.map(p => `<p style="margin: 0 0 0.5rem 0;">${p}</p>`).join('')}
                            </div>
                        </div>
                        <div class="home-featured-buildings" id="home-section-buildings-${index}">
                            <div style="flex:1;min-width:0;padding:1rem;text-align:center;color:var(--text-muted);font-size:0.875rem;">🏛️ 加载中...</div>
                        </div>
                    </div>
                </div>
            `;
        };

        const buildRouteSection = (routeData, index) => {
            const route = routeData.route;
            const randomStop = route.stops[Math.floor(Math.random() * route.stops.length)];
            const routeParagraphs = randomStop.content.split('\n\n').filter(p => p.trim());
            const featuredRouteParagraphs = routeParagraphs.slice(0, 2);

            return `
                <div class="home-route-section" onclick="window.location.hash='route/${routeData.id}'" style="margin-top: 2rem;">
                    <div class="home-topic-header" style="display: flex; align-items: center; gap: 0.625rem; margin-bottom: 0.875rem; padding-bottom: 0.625rem; border-bottom: 2px solid ${routeData.color}30; cursor: pointer;">
                        <span style="font-size: 1.5rem;">${routeData.icon}</span>
                        <div>
                            <div style="font-size: 1.0625rem; font-weight: 700; color: var(--text-primary);">${routeData.title}</div>
                            <div style="font-size: 0.75rem; color: var(--text-muted);">${routeData.subtitle}</div>
                        </div>
                    </div>
                    <div class="home-chapter-layout">
                        <div class="home-chapter-content">
                            <h3 style="font-size: 1rem; font-weight: 700; color: var(--text-primary); margin: 0 0 0.5rem 0; display: flex; align-items: center; gap: 0.375rem;">
                                <span>${randomStop.icon}</span>
                                ${randomStop.title}
                            </h3>
                            ${randomStop.poem ? `
                            <div style="background: var(--bg-secondary); border-radius: var(--radius); padding: 0.75rem; margin-bottom: 0.75rem; border-left: 3px solid ${routeData.color};">
                                <pre style="font-family: inherit; font-size: 0.8rem; line-height: 1.6; color: var(--text-primary); margin: 0; white-space: pre-wrap;">${randomStop.poem}</pre>
                            </div>
                            ` : ''}
                            <div style="font-size: 0.875rem; line-height: 1.7; color: var(--text-secondary);">
                                ${featuredRouteParagraphs.map(p => `<p style="margin: 0 0 0.5rem 0;">${p}</p>`).join('')}
                            </div>
                        </div>
                        <div class="home-featured-buildings" id="home-section-buildings-${index}">
                            <div style="flex:1;min-width:0;padding:1rem;text-align:center;color:var(--text-muted);font-size:0.875rem;">🏛️ 加载中...</div>
                        </div>
                    </div>
                </div>
            `;
        };

        let sectionsHTML = '';
        let sectionIndex = 0;
        const loadTasks = [];

        if (validGameData) {
            sectionsHTML += buildTopicSection(validGameData, 'game', sectionIndex);
            const gameStory = validGameData.story;
            const randomChapter = gameStory.chapters[Math.floor(Math.random() * gameStory.chapters.length)];
            loadTasks.push({ data: validGameData, chapter: randomChapter, containerId: `home-section-buildings-${sectionIndex}` });
            sectionIndex++;
        }

        if (validTopicData) {
            sectionsHTML += buildTopicSection(validTopicData, 'story', sectionIndex);
            const topicStory = validTopicData.story;
            const randomChapter = topicStory.chapters[Math.floor(Math.random() * topicStory.chapters.length)];
            loadTasks.push({ data: validTopicData, chapter: randomChapter, containerId: `home-section-buildings-${sectionIndex}` });
            sectionIndex++;
        }

        if (validRouteData) {
            sectionsHTML += buildRouteSection(validRouteData, sectionIndex);
            const route = validRouteData.route;
            const randomStop = route.stops[Math.floor(Math.random() * route.stops.length)];
            loadTasks.push({ data: validRouteData, chapter: randomStop, containerId: `home-section-buildings-${sectionIndex}` });
            sectionIndex++;
        }

        container.innerHTML = `
            <div class="container">
                ${sectionsHTML}
            </div>
        `;

        loadTasks.forEach(task => {
            this._loadHomeFeaturedBuildings(task.data, task.chapter, task.containerId);
        });
    },

    // 后台加载首页特色建筑卡片（用于故事或路线的单个章节/站点）
    async _loadHomeFeaturedBuildings(item, chapterOrStop, containerId) {
        // 收集需要加载的省份
        const provincesToLoad = new Set();
        if (chapterOrStop.buildings) {
            chapterOrStop.buildings.forEach(b => {
                if (b && b.province) provincesToLoad.add(b.province);
            });
        }

        // 按需加载需要的省份数据
        if (provincesToLoad.size > 0) {
            await this.loadProvinces([...provincesToLoad]);
        }

        // 填充建筑卡片
        if (chapterOrStop.buildings && chapterOrStop.buildings.length > 0) {
            const shuffledBuildings = this.shuffleArray([...chapterOrStop.buildings]);
            const featuredBuildingInfos = shuffledBuildings.slice(0, 2);
            const featuredBuildings = featuredBuildingInfos
                .map(bInfo => bInfo ? this._resolveBuildingRef(bInfo) : null)
                .filter(b => b !== null);

            const container = document.getElementById(containerId);
            if (container && featuredBuildings.length > 0) {
                container.innerHTML = featuredBuildings.map(building => `
                    <div class="home-featured-building" onclick="event.stopPropagation(); App.navigateToBuilding('${building.name}')">
                        ${this.createBuildingCard(building)}
                    </div>
                `).join('');
            } else if (container) {
                container.style.display = 'none';
            }
        }
    },

    // 渲染省份列表
    renderProvinces(container) {
        const crossStyle = this.getProvinceStyle('cross');

        container.innerHTML = `
            <div class="container">
                <h2 class="section-title"><span class="section-icon">🗺️</span> 省份</h2>
                <div class="province-grid">
                    ${ProvincesData.getAllProvinces().map(province => {
                        const style = this.getProvinceStyle(province.id);
                        return `
                        <div class="province-card ${province.count > 0 ? 'has-data' : 'no-data'}" onclick="window.location.hash='province/${province.id}'" style="border-left-color: ${style.color};">
                            <div class="province-icon" style="background: ${style.bgColor}; color: ${style.color};">${style.icon}</div>
                            <div class="province-info">
                                <div class="province-name">${province.name}</div>
                                <div class="province-count">${province.count > 0 ? province.count + '处' : '暂无数据'}</div>
                            </div>
                        </div>
                    `}).join('')}
                </div>

                <div style="margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid var(--border-light);">
                    <h3 class="section-title" style="font-size: 1rem;"><span class="section-icon">🌊</span> 跨省文物保护单位</h3>
                    <div class="province-card" onclick="window.location.hash='cross'" style="border-left-color: ${crossStyle.color}; max-width: 400px;">
                        <div class="province-icon" style="background: ${crossStyle.bgColor}; color: ${crossStyle.color};">${crossStyle.icon}</div>
                        <div class="province-info">
                            <div class="province-name">跨省文物保护单位</div>
                            <div class="province-count">点击查看全部</div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    // 渲染省份详情
    async renderProvince(container, provinceId) {
        const province = ProvincesData.getProvinceById(provinceId);
        const provinceStyle = this.getProvinceStyle(provinceId);

        if (!province || province.count === 0) {
            container.innerHTML = `
                <div class="container">
                    <div class="empty-state">
                        <div class="empty-state-icon">📋</div>
                        <div class="empty-state-title">暂无数据</div>
                        <p>${province ? province.name : '该省份'}的文物保护单位数据正在整理中</p>
                    </div>
                </div>
            `;
            return;
        }

        container.innerHTML = `
            <div class="container">
                <div style="text-align: center; padding: 3rem 0; color: var(--text-muted);">
                    <div style="font-size: 2rem; margin-bottom: 1rem;">${provinceStyle.icon}</div>
                    <div>正在加载${province.name}数据...</div>
                </div>
            </div>
        `;

        // 按需加载省份数据
        const result = await this.loadProvinceData(provinceId);

        if (!result) {
            container.innerHTML = `
                <div class="container">
                    <div class="empty-state">
                        <div class="empty-state-icon">⚠️</div>
                        <div class="empty-state-title">数据加载失败</div>
                        <p>无法加载${province.name}的数据，请刷新页面重试</p>
                    </div>
                </div>
            `;
            return;
        }

        let districts = [];
        let allBuildings = [];

        const moduleName = this.dataModules[provinceId];

        if (moduleName && typeof window[moduleName] !== 'undefined') {
            const module = window[moduleName];
            if (module && typeof module.getAllDistricts === 'function') {
                districts = module.getAllDistricts();
            }
            if (module && typeof module.getAllBuildings === 'function') {
                allBuildings = module.getAllBuildings();
            }
        }

        // 按区县分组建筑
        const buildingsByDistrict = {};
        allBuildings.forEach(b => {
            if (!buildingsByDistrict[b.district]) {
                buildingsByDistrict[b.district] = [];
            }
            buildingsByDistrict[b.district].push(b);
        });

        // 获取有数据的区县
        const districtsWithData = districts.filter(d => {
            const b = buildingsByDistrict[d.id];
            return b && b.length > 0;
        });

        // 计算每个区县的时代分布
        const getEraSummary = (buildings) => {
            const eras = {};
            buildings.forEach(b => {
                if (b.era) eras[b.era] = (eras[b.era] || 0) + 1;
            });
            return Object.entries(eras)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 7)
                .map(([era, count]) => `${era}(${count})`)
                .join(' · ');
        };

        // 计算每个区县的标签分布（随机排序）
        const getTagSummary = (buildings) => {
            const tags = new Set();
            buildings.forEach(b => {
                if (b.tags) {
                    b.tags.forEach(tag => tags.add(tag));
                }
            });
            return App.shuffleArray([...tags]).slice(0, 7);
        };

        const protectionLabel = ProvincesData.getProtectionLabel(provinceId);

        container.innerHTML = `
            <div class="container">
                <div class="province-header" style="background: linear-gradient(135deg, ${provinceStyle.bgColor} 0%, var(--bg-card) 100%); border: 1px solid ${provinceStyle.color}25;">
                    <div class="province-header-icon" style="background: ${provinceStyle.color};">${provinceStyle.icon}</div>
                    <div class="province-header-info">
                        <h2 class="section-title" style="margin: 0;">${province.name}</h2>
                        <p style="color: var(--text-secondary); margin: 0.5rem 0 0 0;">
                            共有 <strong style="color: ${provinceStyle.color};">${province.count}</strong> 处${protectionLabel}
                        </p>
                    </div>
                </div>

                <div class="district-grid-cards">
                    ${districtsWithData.map(district => {
                        const districtBuildings = buildingsByDistrict[district.id] || [];
                        const eraSummary = getEraSummary(districtBuildings);
                        const tagSummary = getTagSummary(districtBuildings);
                        const hasHeritage = districtBuildings.some(b => b.worldHeritage);
                        const shuffledBuildings = this.shuffleArray([...districtBuildings]);
                        const featuredBuildings = shuffledBuildings.slice(0, 7);
                        return `
                        <div class="district-grid-card" onclick="window.location.hash='province/${provinceId}/${district.id}'" style="border-top-color: ${provinceStyle.color};">
                            <div class="district-grid-card-header">
                                <span class="district-grid-card-name">${district.name}</span>
                                ${hasHeritage ? '<span class="district-grid-heritage">🌍</span>' : ''}
                            </div>
                            <div class="district-grid-card-count">${districtBuildings.length} 处${protectionLabel}</div>
                            ${eraSummary ? `<div class="district-grid-card-eras">${eraSummary}</div>` : ''}
                            <div class="district-grid-card-examples">
                                ${featuredBuildings.map(b => `<div class="district-grid-card-example">🏛️ ${b.name}</div>`).join('')}
                            </div>
                            <div class="district-grid-card-tags">
                                ${tagSummary.slice(0, 7).map((tag, idx) => {
                                    const tagStyle = App.getTagStyle(tag, idx);
                                    return `<span class="district-grid-tag" style="background: ${tagStyle.bg}; color: ${tagStyle.color};">${tagStyle.icon} ${tag}</span>`;
                                }).join('')}
                            </div>
                        </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
    },

    // 渲染区县详情
    async renderDistrict(container, provinceId, districtId) {
        // 按需加载省份数据
        await this.loadProvinceData(provinceId);

        const province = ProvincesData.getProvinceById(provinceId);
        const district = this.getDistrictData(provinceId, districtId);
        const provinceStyle = this.getProvinceStyle(provinceId);



        if (!district) {
            container.innerHTML = `
                <div class="container">
                    <div class="empty-state">
                        <div class="empty-state-icon">📍</div>
                        <div class="empty-state-title">未找到该区县</div>
                    </div>
                </div>
            `;
            return;
        }

        let buildings = [];
        const moduleName = this.dataModules[provinceId];
        if (moduleName && typeof window[moduleName] !== 'undefined') {
            const module = window[moduleName];
            if (module && typeof module.getBuildingsByDistrict === 'function') {
                buildings = module.getBuildingsByDistrict(districtId);
            }
        }

        const districtProtectionLabel = ProvincesData.getProtectionLabel(provinceId);

        container.innerHTML = `
            <div class="container">
                <div class="district-header" style="background: linear-gradient(135deg, ${provinceStyle.bgColor} 0%, var(--bg-card) 100%); border: 1px solid ${provinceStyle.color}25;">
                    <div class="district-header-icon" style="background: ${provinceStyle.color};">📍</div>
                    <div class="district-header-info">
                        <h2 class="section-title" style="margin: 0;">${province.name} - ${district.name}</h2>
                        <p style="color: var(--text-secondary); margin: 0.5rem 0 0 0;">
                            共有 <strong style="color: ${provinceStyle.color};">${district.count}</strong> 处${districtProtectionLabel}
                        </p>
                    </div>
                </div>

                <div class="building-grid">
                    ${buildings.map(building => this.createBuildingCard(building)).join('')}
                </div>
            </div>
        `;
    },

    // 渲染建筑详情
    async renderBuilding(container, buildingName) {
        // 先尝试查找建筑
        let building = this.findBuildingByFullPath(buildingName);

        // 如果没找到，尝试加载所有省份数据
        if (!building) {
            const allProvinces = Object.keys(this.dataModules);
            await this.loadProvinces(allProvinces);
            building = this.findBuildingByFullPath(buildingName);
        }

        if (!building) {
            container.innerHTML = `
                <div class="container">
                    <div class="empty-state">
                        <div class="empty-state-icon">🏛️</div>
                        <div class="empty-state-title">未找到该建筑</div>
                        <p>路径: ${buildingName}</p>
                    </div>
                </div>
            `;
            return;
        }

        // 处理内嵌数据的 provinceId（确保有有效的 provinceId）
        const effectiveProvinceId = building.provinceId || building.province || 'unknown';
        const provinceStyle = this.getProvinceStyle(effectiveProvinceId);

        // 获取相关建筑推荐
        const relatedBuildings = this.getRelatedBuildings(building, 4);

        container.innerHTML = `
            <div class="container">
                <article class="building-detail">
                    <header class="building-detail-header" style="border-left-color: ${provinceStyle.color};">
                        <div class="building-detail-icon" style="background: ${provinceStyle.bgColor}; color: ${provinceStyle.color};">🏛️</div>
                        <div class="building-detail-title-wrapper">
                            <h2 class="building-detail-title">${building.name}</h2>
                            <p class="building-detail-location">
                                <span class="location-icon">📍</span> ${building.location}
                                <span class="map-links-inline">
                                    <a href="https://ditu.amap.com/search?query=${encodeURIComponent(building.name)}" target="_blank" class="map-link-inline amap" title="高德地图">🗺️</a>
                                    <a href="https://www.google.com/maps/search/${encodeURIComponent(building.location)}" target="_blank" class="map-link-inline google" title="谷歌地图">🌐</a>
                                </span>
                            </p>
                        </div>
                    </header>

                    <div class="building-detail-sections">
                        <div class="building-detail-section" id="section-basic">
                            <h3><span class="section-icon">📋</span> 基本信息</h3>
                            <div class="info-grid">
                                <div class="info-item">
                                    <span class="info-label">年代</span>
                                    <span class="info-value">${building.era}</span>
                                </div>
                                <div class="info-item">
                                    <span class="info-label">类型</span>
                                    <span class="info-value">${building.type}</span>
                                </div>
                                <div class="info-item">
                                    <span class="info-label">所在地区</span>
                                    <span class="info-value">${building.province} ${building.districtName}</span>
                                </div>
                                <div class="info-item">
                                    <span class="info-label">保护级别</span>
                                    <span class="info-value">${building.protectionLevel}</span>
                                </div>
                                <div class="info-item">
                                    <span class="info-label">公布批次</span>
                                    <span class="info-value">${building.protectionBatch}</span>
                                </div>
                                ${building.worldHeritage ? `
                                <div class="info-item heritage">
                                    <span class="info-label">世界遗产</span>
                                    <span class="info-value">${building.worldHeritageYear}年列入 🌍</span>
                                </div>
                                ` : ''}
                            </div>
                        </div>

                        <div class="building-detail-section" id="section-desc">
                            <h3><span class="section-icon">✨</span> 特色介绍</h3>
                            <p class="detail-paragraph">${building.description}</p>
                        </div>

                        <div class="building-detail-section" id="section-history">
                            <h3><span class="section-icon">📜</span> 历史背景</h3>
                            <p class="detail-paragraph">${building.history}</p>
                        </div>

                        <div class="building-detail-section" id="section-arch">
                            <h3><span class="section-icon">🏗️</span> 建筑风格</h3>
                            <p class="detail-paragraph">${building.architecture}</p>
                        </div>

                        <div class="building-detail-section" id="section-features">
                            <h3><span class="section-icon">💎</span> 特色与价值</h3>
                            <p class="detail-paragraph">${building.features}</p>
                        </div>

                        ${building.sections ? `
                        <div class="building-detail-section" id="section-sections">
                            <h3><span class="section-icon">🗺️</span> 分段信息</h3>
                            <div class="sections-grid">
                                ${building.sections.map(section => `
                                    <div class="section-card">
                                        <div class="section-name">${section.name}</div>
                                        <div class="section-province">${section.province}</div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                        ` : ''}

                        <div class="building-detail-section" id="section-tags">
                            <h3><span class="section-icon">🏷️</span> 标签</h3>
                            <div class="building-detail-tags">
                                ${building.tags.map((tag, idx) => {
                                    const tagStyle = this.getTagStyle(tag, idx);
                                    return `<span class="building-detail-tag" onclick="window.location.hash='tag/${encodeURIComponent(tag)}'" style="background: ${tagStyle.bg}; color: ${tagStyle.color}; border-color: ${tagStyle.color}30;"><span class="tag-icon">${tagStyle.icon}</span> ${tag}</span>`;
                                }).join('')}
                            </div>
                        </div>

                        <div class="building-detail-section" id="section-video">
                            <h3><span class="section-icon">🎬</span> 相关视频</h3>
                            <p class="video-hint">点击下方按钮搜索「${building.name}」的短视频</p>
                            <div class="video-links">
                                <a href="https://www.douyin.com/search/${encodeURIComponent(building.name)}" target="_blank" rel="noopener" class="video-link douyin">
                                    <span class="video-link-icon">🎵</span>
                                    <span class="video-link-label">抖音</span>
                                </a>
                                <a href="https://www.xiaohongshu.com/search_result?keyword=${encodeURIComponent(building.name)}" target="_blank" rel="noopener" class="video-link xiaohongshu">
                                    <span class="video-link-icon">📕</span>
                                    <span class="video-link-label">小红书</span>
                                </a>
                                <a href="https://search.bilibili.com/all?keyword=${encodeURIComponent(building.name)}" target="_blank" rel="noopener" class="video-link bilibili">
                                    <span class="video-link-icon">📺</span>
                                    <span class="video-link-label">哔哩哔哩</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </article>

                <!-- 相关建筑推荐 -->
                ${relatedBuildings.length > 0 ? `
                <section class="related-buildings-section">
                    <h2 class="section-title"><span class="section-icon">🔗</span> 相关推荐</h2>
                    <p class="related-hint">同地区或同类型的其他文物保护单位</p>
                    <div class="building-grid">
                        ${relatedBuildings.map(b => this.createBuildingCard(b)).join('')}
                    </div>
                </section>
                ` : ''}
            </div>
        `;
    },

    // 获取相关建筑推荐
    getRelatedBuildings(building, limit = 4) {
        const allBuildings = DataLoader.getAllBuildings();
        const related = [];

        // 首先找同区县的
        const sameDistrict = allBuildings.filter(b =>
            b.district === building.district &&
            b.name !== building.name
        );
        related.push(...sameDistrict);

        // 然后找有相同标签的
        if (related.length < limit) {
            const sameTags = allBuildings.filter(b => {
                if (b.name === building.name) return false;
                if (related.some(r => r.name === b.name)) return false;
                return b.tags.some(tag => building.tags.includes(tag));
            });
            related.push(...sameTags);
        }

        // 最后找同时代的
        if (related.length < limit) {
            const sameEra = allBuildings.filter(b => {
                if (b.name === building.name) return false;
                if (related.some(r => r.name === b.name)) return false;
                return b.era === building.era;
            });
            related.push(...sameEra);
        }

        // 随机排序并返回前limit个
        return this.shuffleArray(related).slice(0, limit);
    },

    // 渲染标签页面
    renderTags(container) {
        const tags = DataLoader.getAllTags();

        // 如果数据还没加载完，显示加载状态并等待
        if (tags.length === 0) {
            container.innerHTML = `
                <div class="container">
                    <div class="loading-state" style="text-align: center; padding: 4rem 2rem;">
                        <div style="font-size: 3rem; margin-bottom: 1rem;">🔄</div>
                        <div style="font-size: 1.125rem; color: var(--text-primary); margin-bottom: 0.5rem;">数据加载中...</div>
                        <div style="font-size: 0.875rem; color: var(--text-muted);">正在加载所有省份数据，请稍候</div>
                    </div>
                </div>
            `;
            // 注册回调，数据加载完成后重新渲染
            this.onDataLoaded(() => {
                if (this.state.currentView === 'tags') {
                    this.renderTags(container);
                }
            });
            return;
        }

        const maxCount = Math.max(...tags.map(t => t.count));
        const minCount = Math.min(...tags.map(t => t.count));

        container.innerHTML = `
            <div class="container">
                <div class="tags-cloud-modern">
                    ${tags.map((tag, index) => {
                        const tagStyle = this.getTagStyle(tag.name, index);
                        // 计算字体大小 (14px - 24px)
                        const size = minCount === maxCount ? 16 : 14 + (tag.count - minCount) / (maxCount - minCount) * 10;
                        return `
                        <span class="tag-modern"
                              onclick="window.location.hash='tag/${encodeURIComponent(tag.name)}'"
                              style="font-size: ${size}px; background: ${tagStyle.bg}; color: ${tagStyle.color}; border: 1px solid ${tagStyle.color}30;">
                            <span class="tag-modern-icon">${tagStyle.icon}</span>
                            <span class="tag-modern-name">${tag.name}</span>
                            <span class="tag-modern-count" style="background: ${tagStyle.color}20;">${tag.count}</span>
                        </span>
                    `}).join('')}
                </div>
            </div>
        `;
    },

    // 渲染标签搜索结果
    renderTagResults(container, tagName) {
        const decodedTag = decodeURIComponent(tagName);
        const buildings = DataLoader.getBuildingsByTag(decodedTag);
        const tagStyle = this.getTagStyle(decodedTag, 0);

        container.innerHTML = `
            <div class="container">
                <div class="tag-header" style="background: ${tagStyle.bg}; border: 1px solid ${tagStyle.color}30;">
                    <div class="tag-header-icon" style="background: ${tagStyle.color};">${tagStyle.icon}</div>
                    <div class="tag-header-info">
                        <h2 class="section-title" style="margin: 0;">标签：${decodedTag}</h2>
                        <p style="color: var(--text-secondary); margin: 0.5rem 0 0 0;">
                            共找到 <strong style="color: ${tagStyle.color};">${buildings.length}</strong> 处相关建筑
                        </p>
                    </div>
                </div>

                ${buildings.length > 0 ? `
                    <div class="building-grid">
                        ${buildings.map(building => this.createBuildingCard(building)).join('')}
                    </div>
                ` : `
                    <div class="empty-state">
                        <div class="empty-state-icon">🏷️</div>
                        <div class="empty-state-title">未找到相关建筑</div>
                    </div>
                `}
            </div>
        `;
    },

    // 搜索防抖计时器
    _searchDebounceTimer: null,

    // 渲染搜索页面
    renderSearchPage(container) {
        container.innerHTML = `
            <div class="container">
                <div class="search-page">
                    <div class="search-page-input-wrapper">
                        <input type="text"
                               class="search-page-input"
                               placeholder="搜索建筑名称、地点、年代..."
                               id="searchPageInput"
                               autocomplete="off">
                        <button class="search-page-clear" id="searchPageClear" style="display: none;">×</button>
                    </div>

                    <div class="search-page-results" id="searchPageResults">
                        <div class="search-page-hint">
                            <p>输入关键词搜索</p>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // 绑定搜索事件
        const input = document.getElementById('searchPageInput');
        const clearBtn = document.getElementById('searchPageClear');
        const resultsContainer = document.getElementById('searchPageResults');

        if (input) {
            input.focus();
            input.addEventListener('input', (e) => {
                const query = e.target.value.trim();

                if (this._searchDebounceTimer) {
                    clearTimeout(this._searchDebounceTimer);
                }

                if (query) {
                    clearBtn.style.display = 'flex';
                    this._searchDebounceTimer = setTimeout(() => {
                        this.renderSearchPageResults(query, resultsContainer);
                    }, 300);
                } else {
                    clearBtn.style.display = 'none';
                    resultsContainer.innerHTML = `
                        <div class="search-page-hint">
                            <p>输入关键词搜索</p>
                        </div>
                    `;
                }
            });
        }

        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                input.value = '';
                clearBtn.style.display = 'none';
                resultsContainer.innerHTML = `
                    <div class="search-page-hint">
                        <p>输入关键词搜索</p>
                    </div>
                `;
                input.focus();
            });
        }
    },

    // 渲染搜索页面结果
    renderSearchPageResults(query, container) {
        const allBuildings = DataLoader.getAllBuildings();

        // 如果数据还没加载完，显示加载状态
        if (allBuildings.length === 0) {
            container.innerHTML = `
                <div class="search-page-loading" style="text-align: center; padding: 3rem 2rem;">
                    <div style="font-size: 2rem; margin-bottom: 0.75rem;">🔄</div>
                    <div style="font-size: 1rem; color: var(--text-primary);">数据加载中，请稍候...</div>
                </div>
            `;
            // 注册回调，数据加载完成后自动重新搜索
            this.onDataLoaded(() => {
                if (this.state.currentView === 'search') {
                    this.renderSearchPageResults(query, container);
                }
            });
            return;
        }

        const results = DataLoader.searchBuildings(query);

        if (results.length === 0) {
            container.innerHTML = `
                <div class="search-page-empty">
                    <div class="search-empty-icon">🔍</div>
                    <div class="search-empty-title">未找到相关建筑</div>
                    <p>请尝试其他关键词，如建筑名称、地点、年代、历史事件等</p>
                    <div class="search-tips">
                        <p>💡 搜索提示：</p>
                        <ul>
                            <li>支持搜索建筑名称、地址、年代</li>
                            <li>支持搜索建筑描述和历史背景</li>
                            <li>支持搜索标签和保护批次</li>
                        </ul>
                    </div>
                </div>
            `;
            return;
        }

        container.innerHTML = `
            <div class="search-results-count">
                找到 <strong>${results.length}</strong> 处相关建筑
                <span class="search-query-text">"${query}"</span>
            </div>
            <div class="building-grid">
                ${results.map(building => this.createSearchResultCard(building)).join('')}
            </div>
        `;
    },

    // 创建搜索结果卡片 - 带匹配原因
    createSearchResultCard(building) {
        const hashUrl = this.generateBuildingHash(building);
        const provinceStyle = this.getProvinceStyle(building.provinceId);
        const protectionBadge = this.generateProtectionBadge(building);
        const shortDesc = this.truncateText(building.description, 50);

        // 显示匹配原因
        const matchReasonsHtml = building.matchReasons ?
            `<div class="match-reasons">${building.matchReasons.map(r => `<span class="match-reason">${r}</span>`).join('')}</div>` : '';

        return `
            <div class="building-card search-result-card" data-hash="${hashUrl}" style="border-left-color: ${provinceStyle.color};">
                <div class="building-card-header" style="background: ${provinceStyle.bgColor};">
                    <div class="building-card-header-left">
                        <div class="building-province-icon" style="color: ${provinceStyle.color};">${provinceStyle.icon}</div>
                        <div class="building-district">${building.districtName}</div>
                    </div>
                    ${protectionBadge}
                </div>
                <div class="building-content">
                    <h3 class="building-title">${building.name}</h3>
                    ${matchReasonsHtml}
                    <div class="building-meta">
                        <span class="building-era">📅 ${building.era}</span>
                        <span class="building-type">${this.truncateText(building.type, 12)}</span>
                    </div>
                    <p class="building-desc">${shortDesc}</p>
                    <div class="building-tags">
                        ${building.tags.slice(0, 4).map((tag, idx) => {
                            const tagStyle = this.getTagStyle(tag, idx);
                            return `<span class="building-tag" style="background: ${tagStyle.bg}; color: ${tagStyle.color};">${tagStyle.icon} ${tag}</span>`;
                        }).join('')}
                    </div>
                </div>
            </div>
        `;
    },

    // 创建建筑卡片 - 增强版（带缓存）
    createBuildingCard(building) {
        // 使用建筑名称作为缓存键
        const cacheKey = building.name;

        // 检查缓存
        if (this._cache.buildingCards.has(cacheKey)) {
            return this._cache.buildingCards.get(cacheKey);
        }

        const hashUrl = this.generateBuildingHash(building);
        const provinceStyle = this.getProvinceStyle(building.provinceId);
        const protectionBadge = this.generateProtectionBadge(building);
        const shortDesc = this.truncateText(building.description, 60, '');

        // 获取重要标签（优先显示特色标签）
        const priorityTags = ['世界遗产', '古建筑', '近代建筑', '寺庙', '宫殿', '园林', '陵墓', '石窟', '塔', '桥梁', '革命遗址', '名人故居'];
        const sortedTags = [...building.tags].sort((a, b) => {
            const aPriority = priorityTags.indexOf(a);
            const bPriority = priorityTags.indexOf(b);
            if (aPriority !== -1 && bPriority === -1) return -1;
            if (aPriority === -1 && bPriority !== -1) return 1;
            return 0;
        });

        const cardHTML = `
            <div class="building-card" data-hash="${hashUrl}" style="border-left-color: ${provinceStyle.color};">
                <div class="building-card-header" style="background: ${provinceStyle.bgColor};">
                    <div class="building-card-header-left">
                        <div class="building-province-icon" style="color: ${provinceStyle.color};">${provinceStyle.icon}</div>
                        <div class="building-district">${building.districtName}</div>
                    </div>
                    ${protectionBadge}
                </div>
                <div class="building-content">
                    <h3 class="building-title">${building.name}</h3>
                    <div class="building-meta">
                        <span class="building-era" title="年代">📅 ${building.era}</span>
                        <span class="building-type" title="类型">${this.truncateText(building.type, 12)}</span>
                    </div>
                    <p class="building-desc">${shortDesc}</p>
                    <div class="building-tags">
                        ${sortedTags.slice(0, 5).map((tag, idx) => {
                            const tagStyle = this.getTagStyle(tag, idx);
                            return `<span class="building-tag" style="background: ${tagStyle.bg}; color: ${tagStyle.color};">${tagStyle.icon} ${tag}</span>`;
                        }).join('')}
                    </div>
                </div>
            </div>
        `;

        // 存入缓存，限制缓存大小
        if (this._cache.buildingCards.size >= this._cacheLimits.buildingCards) {
            const firstKey = this._cache.buildingCards.keys().next().value;
            this._cache.buildingCards.delete(firstKey);
        }
        this._cache.buildingCards.set(cacheKey, cardHTML);

        return cardHTML;
    },

    // 渲染跨省文物保护单位页面
    async renderCrossProvince(container) {
        // 显示加载状态
        container.innerHTML = `
            <div class="container">
                <div class="loading-state" style="text-align: center; padding: 4rem 2rem;">
                    <div style="font-size: 3rem; margin-bottom: 1rem;">🔄</div>
                    <div style="font-size: 1.125rem; color: var(--text-primary);">正在加载跨省数据...</div>
                </div>
            </div>
        `;

        // 跨省数据文件名为 cross-province.js，但模块名为 CrossProvinceData
        // 先尝试直接加载脚本
        if (!window.CrossProvinceData) {
            const result = await this.loadProvinceData('cross');
            if (!result) {
                container.innerHTML = `
                    <div class="container">
                        <div class="empty-state">
                            <div class="empty-state-icon">⚠️</div>
                            <div class="empty-state-title">加载失败</div>
                            <p>无法加载跨省文物保护单位数据</p>
                        </div>
                    </div>
                `;
                return;
            }
        }

        if (!window.CrossProvinceData || typeof window.CrossProvinceData.getAllBuildings !== 'function') {
            container.innerHTML = `
                <div class="container">
                    <div class="empty-state">
                        <div class="empty-state-icon">📋</div>
                        <div class="empty-state-title">暂无数据</div>
                        <p>跨省文物保护单位数据暂未收录</p>
                    </div>
                </div>
            `;
            return;
        }

        const crossBuildings = window.CrossProvinceData.getAllBuildings();

        container.innerHTML = `
            <div class="container">
                <h2 class="section-title"><span class="section-icon">🌊</span> 跨省文物保护单位</h2>
                <div class="building-grid">
                    ${crossBuildings.map(building => this.createBuildingCard(building)).join('')}
                </div>
            </div>
        `;
    },

    // 渲染专题列表页
    renderTopics(container) {
        const topics = StoryManager.getAllStories();
        const categories = StoryManager.categories;

        // 按分类组织故事
        const topicsByCategory = {};
        Object.keys(categories).forEach(key => {
            topicsByCategory[key] = [];
        });

        topics.forEach(topic => {
            if (topic.category && topicsByCategory[topic.category]) {
                topicsByCategory[topic.category].push(topic);
            }
        });

        container.innerHTML = `
            <div class="container">
                <h2 class="section-title"><span class="section-icon">📚</span> 故事</h2>
                <p style="color: var(--text-secondary); margin-bottom: 1.5rem;">跟着名著、传说、戏曲，开启古建之旅</p>

                ${Object.entries(categories).map(([key, category]) => {
                    const categoryTopics = topicsByCategory[key];
                    if (categoryTopics.length === 0) return '';

                    return `
                    <div class="story-category-section" style="margin-bottom: 2.5rem;">
                        <div class="story-category-header" style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem; padding-bottom: 0.75rem; border-bottom: 2px solid var(--border-light);">
                            <span style="font-size: 1.5rem;">${category.icon}</span>
                            <div>
                                <h3 style="font-size: 1.125rem; font-weight: 700; color: var(--text-primary); margin: 0;">${category.name}</h3>
                                <p style="font-size: 0.875rem; color: var(--text-muted); margin: 0.25rem 0 0 0;">${category.description}</p>
                            </div>
                            <span style="margin-left: auto; font-size: 0.875rem; color: var(--text-muted); background: var(--bg-secondary); padding: 0.25rem 0.75rem; border-radius: 9999px;">${categoryTopics.length} 个故事</span>
                        </div>
                        <div class="topics-grid">
                            ${categoryTopics.map(topic => `
                                <div class="topic-card" onclick="window.location.hash='story/${topic.id}'" style="border-left-color: ${topic.color};">
                                    <div class="topic-card-icon" style="background: ${topic.bgColor}; color: ${topic.color};">${topic.icon}</div>
                                    <div class="topic-card-content">
                                        <div class="topic-card-title">${topic.title}</div>
                                        <div class="topic-card-subtitle">${topic.subtitle}</div>
                                        <div class="topic-card-desc">${topic.description}</div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    `;
                }).join('')}
            </div>
        `;
    },

    // 渲染专题详情页
    async renderTopicDetail(container, topicId) {
        const topicData = await StoryManager.getStoryWithData(topicId);
        if (!topicData || !topicData.story) {
            container.innerHTML = `
                <div class="container">
                    <div class="empty-state">
                        <div class="empty-state-icon">📚</div>
                        <div class="empty-state-title">故事未找到</div>
                    </div>
                </div>
            `;
            return;
        }

        const story = topicData.story;

        container.innerHTML = `
            <div class="container">
                <div class="topic-detail-header" style="background: linear-gradient(135deg, ${topicData.bgColor} 0%, var(--bg-card) 100%); border: 1px solid ${topicData.color}25;">
                    <div class="topic-detail-icon" style="background: ${topicData.color};">${topicData.icon}</div>
                    <div class="topic-detail-info">
                        <h1 class="topic-detail-title">${story.title}</h1>
                        <p class="topic-detail-subtitle">${topicData.subtitle}</p>
                    </div>
                </div>

                <div class="topic-intro">
                    ${story.intro.split('\n\n').map(p => `<p>${p}</p>`).join('')}
                </div>

                <div class="topic-chapters">
                    ${story.chapters.map((chapter, index) => {
                        // 优先使用内嵌建筑数据
                        const chapterBuildings = chapter.buildings
                            .map(b => this._resolveBuildingRef(b))
                            .filter(b => b !== null);

                        return `
                        <div class="topic-chapter" id="chapter-${index}">
                            <h3 class="topic-chapter-title">
                                <span class="topic-chapter-icon">${chapter.icon}</span>
                                ${chapter.title}
                            </h3>
                            <div class="topic-chapter-content">
                                ${chapter.content.split('\n\n').map(p => `<p>${p}</p>`).join('')}
                            </div>
                            ${chapterBuildings.length > 0 ? `
                                <div class="topic-chapter-buildings">
                                    <h4 class="topic-buildings-title">🏛️ 相关古建</h4>
                                    <div class="building-grid compact">
                                        ${chapterBuildings.map(building => this.createBuildingCard(building)).join('')}
                                    </div>
                                </div>
                            ` : ''}
                        </div>
                        `;
                    }).join('')}
                </div>

                ${story.allBuildings.length > 0 ? `
                <div class="topic-all-buildings">
                    <h3 class="section-title"><span class="section-icon">🏛️</span> 故事涉及古建一览</h3>
                    <div class="building-grid">
                        ${story.allBuildings.map(b => {
                            const building = this._resolveBuildingRef(b, topicData);
                            return building ? this.createBuildingCard(building) : '';
                        }).join('')}
                    </div>
                </div>
                ` : ''}
            </div>
        `;
    },

    // 渲染路线列表页
    renderRoutes(container) {
        const routes = RouteManager.getAllRoutes();
        const categories = RouteManager.categories;

        // 按分类组织路线
        const routesByCategory = {};
        Object.keys(categories).forEach(key => {
            routesByCategory[key] = [];
        });

        routes.forEach(route => {
            if (route.category && routesByCategory[route.category]) {
                routesByCategory[route.category].push(route);
            }
        });

        container.innerHTML = `
            <div class="container">
                <h2 class="section-title"><span class="section-icon">🗺️</span> 路线</h2>
                <p style="color: var(--text-secondary); margin-bottom: 1.5rem;">追随文人雅士的足迹，探访诗中的古建</p>

                ${Object.entries(categories).map(([key, category]) => {
                    const categoryRoutes = routesByCategory[key];
                    if (categoryRoutes.length === 0) return '';

                    return `
                    <div class="story-category-section" style="margin-bottom: 2.5rem;">
                        <div class="story-category-header" style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem; padding-bottom: 0.75rem; border-bottom: 2px solid var(--border-light);">
                            <span style="font-size: 1.5rem;">${category.icon}</span>
                            <div>
                                <h3 style="font-size: 1.125rem; font-weight: 700; color: var(--text-primary); margin: 0;">${category.name}</h3>
                                <p style="font-size: 0.875rem; color: var(--text-muted); margin: 0.25rem 0 0 0;">${category.description}</p>
                            </div>
                            <span style="margin-left: auto; font-size: 0.875rem; color: var(--text-muted); background: var(--bg-secondary); padding: 0.25rem 0.75rem; border-radius: 9999px;">${categoryRoutes.length} 条路线</span>
                        </div>
                        <div class="topics-grid">
                            ${categoryRoutes.map(route => `
                                <div class="topic-card" onclick="window.location.hash='route/${route.id}'" style="border-left-color: ${route.color};">
                                    <div class="topic-card-icon" style="background: ${route.bgColor}; color: ${route.color};">${route.icon}</div>
                                    <div class="topic-card-content">
                                        <div class="topic-card-title">${route.title}</div>
                                        <div class="topic-card-subtitle">${route.subtitle}</div>
                                        <div class="topic-card-desc">${route.description}</div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    `;
                }).join('')}
            </div>
        `;
    },

    // 渲染路线详情页
    async renderRouteDetail(container, routeId) {
        const routeData = await RouteManager.getRouteWithData(routeId);
        if (!routeData) {
            container.innerHTML = `
                <div class="container">
                    <div class="empty-state">
                        <div class="empty-state-icon">🗺️</div>
                        <div class="empty-state-title">路线未找到</div>
                    </div>
                </div>
            `;
            return;
        }

        const route = routeData.route;
        const totalStops = route.stops.length;

        // 收集需要加载的省份
        const provincesToLoad = new Set();
        route.stops.forEach(stop => {
            if (stop.buildings) {
                stop.buildings.forEach(b => {
                    if (b && b.province) provincesToLoad.add(b.province);
                });
            }
        });

        // 按需加载需要的省份数据
        if (provincesToLoad.size > 0) {
            await this.loadProvinces([...provincesToLoad]);
        }

        container.innerHTML = `
            <div class="container">
                <div class="topic-detail-header" style="background: linear-gradient(135deg, ${routeData.bgColor} 0%, var(--bg-card) 100%); border: 1px solid ${routeData.color}25;">
                    <div class="topic-detail-icon" style="background: ${routeData.color};">${routeData.icon}</div>
                    <div class="topic-detail-info">
                        <h1 class="topic-detail-title">${route.title}</h1>
                        <p class="topic-detail-subtitle">${routeData.subtitle}</p>
                    </div>
                </div>

                <div class="topic-intro">
                    ${route.intro.split('\n\n').map(p => `<p>${p}</p>`).join('')}
                </div>

                <!-- 路线时间轴 -->
                <div class="route-timeline" style="position: relative; margin: 2rem 0;">
                    <!-- 连接线 -->
                    <div class="route-timeline-line" style="position: absolute; left: 24px; top: 0; bottom: 0; width: 3px; background: linear-gradient(to bottom, ${routeData.color}40, ${routeData.color}); border-radius: 3px;"></div>

                    ${route.stops.map((stop, index) => {
                        const isLast = index === totalStops - 1;
                        const isFirst = index === 0;
                        const stopBuildings = stop.buildings
                            .map(b => this._resolveBuildingRef(b, routeData))
                            .filter(b => b !== null);

                        return `
                        <div class="route-stop" style="position: relative; padding-left: 64px; margin-bottom: ${isLast ? '0' : '2rem'};">
                            <!-- 站点标记 -->
                            <div class="route-stop-marker" style="position: absolute; left: 12px; top: 0; width: 28px; height: 28px; border-radius: 50%; background: ${routeData.color}; color: white; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 700; border: 3px solid var(--bg-card); box-shadow: 0 0 0 3px ${routeData.color}40; z-index: 1;">
                                ${index + 1}
                            </div>

                            <!-- 站点内容卡片 -->
                            <div class="route-stop-card">
                                <!-- 卡片头部 -->
                                <div style="padding: 1rem 1.25rem; border-bottom: 1px solid var(--border-light); background: linear-gradient(135deg, ${routeData.bgColor}80 0%, var(--bg-card) 100%);">
                                    <div style="display: flex; align-items: center; gap: 0.625rem;">
                                        <span style="font-size: 1.25rem;">${stop.icon}</span>
                                        <div>
                                            <h3 style="font-size: 1rem; font-weight: 700; color: var(--text-primary); margin: 0;">${stop.title}</h3>
                                            ${stop.poet ? `<div style="font-size: 0.75rem; color: ${routeData.color}; margin-top: 0.25rem;">📜 ${stop.poet}</div>` : ''}
                                        </div>
                                    </div>
                                </div>

                                <!-- 诗词展示 -->
                                ${stop.poem ? `
                                <div style="padding: 1rem 1.25rem; background: var(--bg-secondary); border-bottom: 1px solid var(--border-light);">
                                    <pre style="font-family: inherit; font-size: 0.875rem; line-height: 1.8; color: var(--text-primary); margin: 0; white-space: pre-wrap;">${stop.poem}</pre>
                                </div>
                                ` : ''}

                                <!-- 内容描述 -->
                                <div style="padding: 1rem 1.25rem;">
                                    <div class="topic-chapter-content" style="font-size: 0.875rem; line-height: 1.7; color: var(--text-secondary);">
                                        ${stop.content.split('\n\n').map(p => `<p style="margin: 0 0 0.5rem 0;">${p}</p>`).join('')}
                                    </div>
                                </div>

                                <!-- 相关古建 -->
                                ${stopBuildings.length > 0 ? `
                                <div style="padding: 0 1.25rem 1rem;">
                                    <div style="font-size: 0.75rem; font-weight: 600; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.75rem;">🏛️ 相关古建</div>
                                    <div class="building-grid compact">
                                        ${stopBuildings.map(building => this.createBuildingCard(building)).join('')}
                                    </div>
                                </div>
                                ` : ''}
                            </div>

                            <!-- 下一站箭头 -->
                            ${!isLast ? `
                            <div style="display: flex; align-items: center; justify-content: center; margin-top: 1rem; margin-left: -64px;">
                                <div style="display: flex; align-items: center; gap: 0.5rem; color: ${routeData.color}; font-size: 0.75rem; font-weight: 600;">
                                    <span>↓</span>
                                    <span>前往下一站</span>
                                    <span>↓</span>
                                </div>
                            </div>
                            ` : ''}
                        </div>
                        `;
                    }).join('')}
                </div>

                ${route.allBuildings.length > 0 ? `
                <div class="topic-all-buildings">
                    <h3 class="section-title"><span class="section-icon">🏛️</span> 路线涉及古建一览</h3>
                    <div class="building-grid">
                        ${route.allBuildings.map(b => {
                            const building = this._resolveBuildingRef(b, routeData);
                            return building ? this.createBuildingCard(building) : '';
                        }).join('')}
                    </div>
                </div>
                ` : ''}
            </div>
        `;
    },

    // 渲染游戏列表页
    async renderGameList(container) {
        const games = GameManager.getAllGames();
        const categories = GameManager.categories;

        const gamesByCategory = {};
        Object.keys(categories).forEach(key => {
            gamesByCategory[key] = [];
        });

        games.forEach(game => {
            if (game.category && gamesByCategory[game.category]) {
                gamesByCategory[game.category].push(game);
            }
        });

        container.innerHTML = `
            <div class="container">
                <h2 class="section-title"><span class="section-icon">🎮</span> 游戏</h2>
                <p style="color: var(--text-secondary); margin-bottom: 1.5rem;">走进热门游戏中的中国古建场景原型，在虚拟与现实之间架起桥梁</p>

                ${Object.entries(categories).map(([key, category]) => {
                    const categoryGames = gamesByCategory[key];
                    if (categoryGames.length === 0) return '';

                    return `
                    <div class="story-category-section" style="margin-bottom: 2.5rem;">
                        <div class="story-category-header" style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem; padding-bottom: 0.75rem; border-bottom: 2px solid var(--border-light);">
                            <span style="font-size: 1.5rem;">${category.icon}</span>
                            <div>
                                <h3 style="font-size: 1.125rem; font-weight: 700; color: var(--text-primary); margin: 0;">${category.name}</h3>
                                <p style="font-size: 0.875rem; color: var(--text-muted); margin: 0.25rem 0 0 0;">${category.description}</p>
                            </div>
                            <span style="margin-left: auto; font-size: 0.875rem; color: var(--text-muted); background: var(--bg-secondary); padding: 0.25rem 0.75rem; border-radius: 9999px;">${categoryGames.length} 款游戏</span>
                        </div>
                        <div class="topics-grid">
                            ${categoryGames.map(game => `
                                <div class="topic-card" onclick="window.location.hash='game/${game.id}'" style="border-left-color: ${game.color};">
                                    <div class="topic-card-icon" style="background: ${game.bgColor}; color: ${game.color};">${game.icon}</div>
                                    <div class="topic-card-content">
                                        <div class="topic-card-title">${game.title}</div>
                                        <div class="topic-card-subtitle">${game.subtitle}</div>
                                        <div class="topic-card-desc">${game.description}</div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    `;
                }).join('')}
            </div>
        `;
    },

    // 渲染游戏详情页
    async renderGameDetail(container, gameId) {
        const gameModule = await GameManager.loadGame(gameId);
        const gameMeta = GameManager.getGameMeta(gameId);

        if (!gameModule || !gameModule.story) {
            container.innerHTML = `
                <div class="container">
                    <div class="empty-state">
                        <div class="empty-state-icon">🎮</div>
                        <div class="empty-state-title">游戏内容未找到</div>
                    </div>
                </div>
            `;
            return;
        }

        const story = gameModule.story;

        container.innerHTML = `
            <div class="container">
                <div class="topic-detail-header" style="background: linear-gradient(135deg, ${gameMeta.bgColor} 0%, var(--bg-card) 100%); border: 1px solid ${gameMeta.color}25;">
                    <div class="topic-detail-icon" style="background: ${gameMeta.color};">${gameMeta.icon}</div>
                    <div class="topic-detail-info">
                        <h1 class="topic-detail-title">${story.title}</h1>
                        <p class="topic-detail-subtitle">${gameMeta.subtitle}</p>
                    </div>
                </div>

                <div class="topic-intro">
                    ${story.intro.split('\n\n').map(p => `<p>${p}</p>`).join('')}
                </div>

                <div class="topic-chapters">
                    ${story.chapters.map((chapter, index) => {
                        const chapterBuildings = chapter.buildings
                            .map(b => this._resolveBuildingRef(b, gameMeta))
                            .filter(b => b !== null);

                        return `
                        <div class="topic-chapter" id="chapter-${index}">
                            <h3 class="topic-chapter-title">
                                <span class="topic-chapter-icon">${chapter.icon}</span>
                                ${chapter.title}
                            </h3>
                            <div class="topic-chapter-content">
                                ${chapter.content.split('\n\n').map(p => `<p>${p}</p>`).join('')}
                            </div>
                            ${chapterBuildings.length > 0 ? `
                                <div class="topic-chapter-buildings">
                                    <h4 class="topic-buildings-title">🏛️ 相关古建</h4>
                                    <div class="building-grid compact">
                                        ${chapterBuildings.map(building => this.createBuildingCard(building)).join('')}
                                    </div>
                                </div>
                            ` : ''}
                        </div>
                        `;
                    }).join('')}
                </div>

                ${story.allBuildings.length > 0 ? `
                <div class="topic-all-buildings">
                    <h3 class="section-title"><span class="section-icon">🏛️</span> 游戏涉及古建一览</h3>
                    <div class="building-grid">
                        ${story.allBuildings.map(b => {
                            const building = this._resolveBuildingRef(b, gameMeta);
                            return building ? this.createBuildingCard(building) : '';
                        }).join('')}
                    </div>
                </div>
                ` : ''}
            </div>
        `;
    },

    // 数组随机排序（返回新数组，不修改原数组）
    shuffleArray(array) {
        const arr = [...array];
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }
};

// 页面加载完成后初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => App.init());
} else {
    App.init();
}
