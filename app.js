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

    // 获取标签样式（循环使用6种颜色）
    getTagStyle(tagName, index) {
        const style = this.tagStyles[tagName] || { icon: '🏷️' };
        const palette = this.colorPalette[index % this.colorPalette.length];
        return {
            ...style,
            color: palette.color,
            bg: palette.bg
        };
    },

    // 初始化
    init() {
        this.setupTheme();
        this.setupEventListeners();
        this.setupNavigation();
        this.render();
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
        }, true);
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
        } else if (this.state.currentView === 'topic' && parts[1]) {
            this.state.currentTopic = decodeURIComponent(parts[1]);
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
        'macao': 'MacauData',
        'cross': 'CrossProvinceData'
    },

    // 根据完整路径查找建筑
    findBuildingByFullPath(fullPath) {
        for (const [provinceId, moduleName] of Object.entries(this.dataModules)) {
            if (typeof window[moduleName] !== 'undefined') {
                const module = window[moduleName];
                if (module && typeof module.getBuildingByName === 'function') {
                    const building = module.getBuildingByName(fullPath);
                    if (building) return building;
                }
            }
        }
        return null;
    },

    // 获取省份样式
    getProvinceStyle(provinceId) {
        return this.provinceStyles[provinceId] || { icon: '📍', color: '#3498db', bgColor: '#ebf5fb' };
    },

    // 生成建筑的hash URL
    generateBuildingHash(building) {
        const fullPath = `${building.province}${building.districtName}${building.name}`;
        return `building/${encodeURIComponent(fullPath)}`;
    },

    // 导航到建筑详情
    navigateToBuilding(buildingName) {
        const hashUrl = `building/${encodeURIComponent(buildingName)}`;
        window.location.hash = hashUrl;
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
            case 'topics':
                this.renderTopics(mainContent);
                break;
            case 'topic':
                this.renderTopicDetail(mainContent, this.state.currentTopic);
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
            items.push({ name: '🗺️ 按省份浏览', hash: 'provinces' });
        } else if (this.state.currentView === 'province' && this.state.currentProvince) {
            items.push({ name: '🗺️ 按省份浏览', hash: 'provinces' });
            const province = ProvincesData.getProvinceById(this.state.currentProvince);
            if (province) {
                const style = this.getProvinceStyle(this.state.currentProvince);
                items.push({ name: `${style.icon} ${province.name}`, hash: `province/${province.id}` });
            }
        } else if (this.state.currentView === 'district' && this.state.currentProvince && this.state.currentDistrict) {
            items.push({ name: '🗺️ 按省份浏览', hash: 'provinces' });
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
                items.push({ name: '🗺️ 按省份浏览', hash: 'provinces' });
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
        } else if (this.state.currentView === 'topics') {
            items.push({ name: '📚 专题', hash: 'topics', active: true });
        } else if (this.state.currentView === 'topic' && this.state.currentTopic) {
            items.push({ name: '📚 专题', hash: 'topics' });
            const topic = TopicsData.getTopicById(this.state.currentTopic);
            if (topic) {
                items.push({ name: `${topic.icon} ${topic.title}`, hash: `topic/${topic.id}`, active: true });
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

    // 趣味标题库
    funTitles: [
        { icon: '🏛️', text: '今日邂逅的古建' },
        { icon: '🐉', text: '穿越千年的遇见' },
        { icon: '🏮', text: '檐角下的故事' },
        { icon: '📜', text: '时光里的瑰宝' },
        { icon: '🌸', text: '砖瓦间的诗意' },
        { icon: '⛩️', text: '门楣上的岁月' },
        { icon: '🎋', text: '梁枋间的记忆' },
        { icon: '🪴', text: '庭院深处的惊喜' },
        { icon: '🔔', text: '晨钟暮鼓的见证' },
        { icon: '🦅', text: '飞檐下的守望' }
    ],

    // 获取随机趣味标题
    getFunTitle() {
        const index = Math.floor(Math.random() * this.funTitles.length);
        const title = this.funTitles[index];
        return `<span class="section-icon">${title.icon}</span> ${title.text}`;
    },

    // 渲染首页
    renderHome(container) {
        const allTopics = TopicsData.getAllTopics();
        const shuffledTopics = this.shuffleArray([...allTopics]).slice(0, 3);

        container.innerHTML = `
            <div class="container">
                ${shuffledTopics.map((topic, index) => {
                    const story = topic.story;
                    const shuffledChapters = this.shuffleArray([...story.chapters]);
                    const featuredChapter = shuffledChapters[0];

                    // 随机获取两个相关建筑
                    const shuffledBuildings = this.shuffleArray([...featuredChapter.buildings]);
                    const featuredBuildingInfos = shuffledBuildings.slice(0, 2);
                    const featuredBuildings = featuredBuildingInfos.map(bInfo => {
                        if (!bInfo) return null;
                        const moduleName = this.dataModules[bInfo.province];
                        if (moduleName && typeof window[moduleName] !== 'undefined') {
                            const module = window[moduleName];
                            if (module && typeof module.getBuildingByName === 'function') {
                                return module.getBuildingByName(bInfo.name);
                            }
                        }
                        return null;
                    }).filter(b => b !== null);

                    return `
                    <div class="home-topic-section" style="margin-bottom: ${index < shuffledTopics.length - 1 ? '2.5rem' : '0'}; padding-bottom: ${index < shuffledTopics.length - 1 ? '2rem' : '0'}; border-bottom: ${index < shuffledTopics.length - 1 ? '1px solid var(--border-light)' : 'none'};" onclick="window.location.hash='topic/${topic.id}'">
                        <div class="home-topic-header" style="display: flex; align-items: center; gap: 0.625rem; margin-bottom: 0.875rem; padding-bottom: 0.625rem; border-bottom: 2px solid ${topic.color}30; cursor: pointer;">
                            <span style="font-size: 1.5rem;">${topic.icon}</span>
                            <div>
                                <div style="font-size: 1.0625rem; font-weight: 700; color: var(--text-primary);">${topic.title}</div>
                                <div style="font-size: 0.75rem; color: var(--text-muted);">${topic.subtitle}</div>
                            </div>
                        </div>

                        <div class="home-chapter-layout" style="display: flex; gap: 1rem; align-items: flex-start;">
                            <div class="home-chapter-content" style="flex: 1; min-width: 0;">
                                <h3 style="font-size: 1rem; font-weight: 700; color: var(--text-primary); margin: 0 0 0.5rem 0; display: flex; align-items: center; gap: 0.375rem;">
                                    <span>${featuredChapter.icon}</span>
                                    ${featuredChapter.title}
                                </h3>
                                <div style="font-size: 0.875rem; line-height: 1.7; color: var(--text-secondary);">
                                    ${featuredChapter.content.split('\n\n').slice(0, 2).map(p => `<p style="margin: 0 0 0.5rem 0;">${p}</p>`).join('')}
                                </div>
                            </div>

                            ${featuredBuildings.length > 0 ? `
                                <div class="home-featured-buildings" style="display: flex; flex-direction: row; gap: 0.75rem; width: 420px; flex-shrink: 0;">
                                    ${featuredBuildings.map(building => `
                                        <div class="home-featured-building" style="cursor: pointer; flex: 1; min-width: 0;" onclick="event.stopPropagation(); App.navigateToBuilding('${building.name}')">
                                            ${this.createBuildingCard(building)}
                                        </div>
                                    `).join('')}
                                </div>
                            ` : ''}
                        </div>
                    </div>
                    `;
                }).join('')}
            </div>
        `;
    },

    // 渲染省份列表
    renderProvinces(container) {
        container.innerHTML = `
            <div class="container">
                <h2 class="section-title"><span class="section-icon">🗺️</span> 按省份浏览</h2>
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
            </div>
        `;
    },

    // 渲染省份详情
    renderProvince(container, provinceId) {
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
        districts.forEach(d => {
            buildingsByDistrict[d.id] = [];
        });

        allBuildings.forEach(b => {
            if (buildingsByDistrict[b.district]) {
                buildingsByDistrict[b.district].push(b);
            }
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

        container.innerHTML = `
            <div class="container">
                <div class="province-header" style="background: linear-gradient(135deg, ${provinceStyle.bgColor} 0%, var(--bg-card) 100%); border: 1px solid ${provinceStyle.color}25;">
                    <div class="province-header-icon" style="background: ${provinceStyle.color};">${provinceStyle.icon}</div>
                    <div class="province-header-info">
                        <h2 class="section-title" style="margin: 0;">${province.name}</h2>
                        <p style="color: var(--text-secondary); margin: 0.5rem 0 0 0;">
                            共有 <strong style="color: ${provinceStyle.color};">${province.count}</strong> 处全国重点文物保护单位
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
                            <div class="district-grid-card-count">${districtBuildings.length} 处全国重点文物保护单位</div>
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
    renderDistrict(container, provinceId, districtId) {
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

        container.innerHTML = `
            <div class="container">
                <div class="district-header" style="background: linear-gradient(135deg, ${provinceStyle.bgColor} 0%, var(--bg-card) 100%); border: 1px solid ${provinceStyle.color}25;">
                    <div class="district-header-icon" style="background: ${provinceStyle.color};">📍</div>
                    <div class="district-header-info">
                        <h2 class="section-title" style="margin: 0;">${province.name} - ${district.name}</h2>
                        <p style="color: var(--text-secondary); margin: 0.5rem 0 0 0;">
                            共有 <strong style="color: ${provinceStyle.color};">${district.count}</strong> 处全国重点文物保护单位
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
    renderBuilding(container, buildingName) {
        const building = this.findBuildingByFullPath(buildingName);

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

        const provinceStyle = this.getProvinceStyle(building.provinceId);

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

        // 生成保护级别标识
        let protectionBadge = '';
        if (building.worldHeritage) {
            protectionBadge = `<span class="protection-badge heritage">🌍 世界遗产${building.worldHeritageYear ? '·' + building.worldHeritageYear : ''}</span>`;
        } else if (building.protectionLevel === '全国重点文物保护单位') {
            protectionBadge = `<span class="protection-badge national">${building.protectionBatch || '全国重点'}</span>`;
        }

        // 截断描述文字
        const shortDesc = building.description ? building.description.substring(0, 50) + '...' : '';

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
                        <span class="building-type">${building.type.length > 12 ? building.type.substring(0, 12) + '...' : building.type}</span>
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

    // 创建建筑卡片 - 增强版
    createBuildingCard(building) {
        const hashUrl = this.generateBuildingHash(building);
        const provinceStyle = this.getProvinceStyle(building.provinceId);

        // 生成保护级别标识
        let protectionBadge = '';
        if (building.worldHeritage) {
            protectionBadge = `<span class="protection-badge heritage">🌍 世界遗产${building.worldHeritageYear ? '·' + building.worldHeritageYear : ''}</span>`;
        } else if (building.protectionLevel === '全国重点文物保护单位') {
            protectionBadge = `<span class="protection-badge national">${building.protectionBatch || '全国重点'}</span>`;
        }

        // 截断描述文字 - 增加到60字
        const shortDesc = building.description ? building.description.substring(0, 60) + (building.description.length > 60 ? '...' : '') : '';

        // 获取重要标签（优先显示特色标签）
        const priorityTags = ['世界遗产', '古建筑', '近代建筑', '寺庙', '宫殿', '园林', '陵墓', '石窟', '塔', '桥梁', '革命遗址', '名人故居'];
        const sortedTags = [...building.tags].sort((a, b) => {
            const aPriority = priorityTags.indexOf(a);
            const bPriority = priorityTags.indexOf(b);
            if (aPriority !== -1 && bPriority === -1) return -1;
            if (aPriority === -1 && bPriority !== -1) return 1;
            return 0;
        });

        return `
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
                        <span class="building-type" title="类型">${building.type.length > 12 ? building.type.substring(0, 12) + '...' : building.type}</span>
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
    },

    // 渲染跨省文物保护单位页面
    renderCrossProvince(container) {
        const crossBuildings = CrossProvinceData.getAllBuildings();

        container.innerHTML = `
            <div class="container">
                <div class="building-grid">
                    ${crossBuildings.map(building => this.createBuildingCard(building)).join('')}
                </div>
            </div>
        `;
    },

    // 渲染专题列表页
    renderTopics(container) {
        const topics = TopicsData.getAllTopics();

        container.innerHTML = `
            <div class="container">
                <h2 class="section-title"><span class="section-icon">📚</span> 专题</h2>
                <p style="color: var(--text-secondary); margin-bottom: 1.5rem;">跟着名著、历史事件，开启古建之旅</p>
                <div class="topics-grid">
                    ${topics.map(topic => `
                        <div class="topic-card" onclick="window.location.hash='topic/${topic.id}'" style="border-left-color: ${topic.color};">
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
    },

    // 渲染专题详情页
    renderTopicDetail(container, topicId) {
        const topic = TopicsData.getTopicById(topicId);
        if (!topic) {
            container.innerHTML = `
                <div class="container">
                    <div class="empty-state">
                        <div class="empty-state-icon">📚</div>
                        <div class="empty-state-title">专题未找到</div>
                    </div>
                </div>
            `;
            return;
        }

        const story = topic.story;

        container.innerHTML = `
            <div class="container">
                <div class="topic-detail-header" style="background: linear-gradient(135deg, ${topic.bgColor} 0%, var(--bg-card) 100%); border: 1px solid ${topic.color}25;">
                    <div class="topic-detail-icon" style="background: ${topic.color};">${topic.icon}</div>
                    <div class="topic-detail-info">
                        <h1 class="topic-detail-title">${story.title}</h1>
                        <p class="topic-detail-subtitle">${topic.subtitle}</p>
                    </div>
                </div>

                <div class="topic-intro">
                    ${story.intro.split('\n\n').map(p => `<p>${p}</p>`).join('')}
                </div>

                <div class="topic-chapters">
                    ${story.chapters.map((chapter, index) => {
                        // 查找建筑数据
                        const chapterBuildings = chapter.buildings.map(b => {
                            const moduleName = this.dataModules[b.province];
                            if (moduleName && typeof window[moduleName] !== 'undefined') {
                                const module = window[moduleName];
                                if (module && typeof module.getBuildingByName === 'function') {
                                    const building = module.getBuildingByName(b.name);
                                    if (building) return building;
                                }
                            }
                            return null;
                        }).filter(b => b !== null);

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
                    <h3 class="section-title"><span class="section-icon">🏛️</span> 专题涉及古建一览</h3>
                    <div class="building-grid">
                        ${story.allBuildings.map(b => {
                            const moduleName = this.dataModules[b.province];
                            if (moduleName && typeof window[moduleName] !== 'undefined') {
                                const module = window[moduleName];
                                if (module && typeof module.getBuildingByName === 'function') {
                                    const building = module.getBuildingByName(b.name);
                                    if (building) return this.createBuildingCard(building);
                                }
                            }
                            return '';
                        }).join('')}
                    </div>
                </div>
                ` : ''}
            </div>
        `;
    },

    // 数组随机排序
    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
};

// 页面加载完成后初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => App.init());
} else {
    App.init();
}
