// 游戏数据管理器
const GameManager = {
    // 游戏分类定义
    categories: {
        tripleA: {
            id: 'tripleA',
            name: '3A大作',
            icon: '🎮',
            description: '国际级大型游戏中的中国古建场景'
        },
        openWorld: {
            id: 'openWorld',
            name: '开放世界',
            icon: '🌍',
            description: '开放世界游戏中的中式建筑与场景'
        },
        mmorpg: {
            id: 'mmorpg',
            name: '武侠网游',
            icon: '⚔️',
            description: '大型多人在线武侠游戏中的古建原型'
        },
        mobile: {
            id: 'mobile',
            name: '手游世界',
            icon: '📱',
            description: '热门手机游戏中的中国古建元素'
        }
    },

    // 游戏注册表（轻量级元数据）
    _registry: [
        {
            id: 'black-myth-wukong',
            title: '黑神话：悟空',
            subtitle: '首款国产3A大作中的千年古建',
            icon: '🐵',
            color: '#C41E3A',
            bgColor: '#FFF5F5',
            category: 'tripleA',
            description: '追随《黑神话：悟空》的游戏足迹，探访那些通过实景扫描技术完美还原的千年古建，感受虚拟与现实交融的震撼。',
            moduleName: 'GameBlackMythWukong',
            fileName: 'black-myth-wukong'
        },
        {
            id: 'genshin-impact',
            title: '原神',
            subtitle: '璃月港背后的华夏建筑之美',
            icon: '🏮',
            color: '#FF7F27',
            bgColor: '#FFF3E8',
            category: 'openWorld',
            description: '走进提瓦特大陆的璃月地区，探访那些以中国山水与古建为灵感的壮丽场景，领略米哈游如何将华夏建筑美学融入开放世界。',
            moduleName: 'GameGenshinImpact',
            fileName: 'genshin-impact'
        },
        {
            id: 'justice-online',
            title: '逆水寒',
            subtitle: '大宋汴京城里的亭台楼阁',
            icon: '🏯',
            color: '#2E7D32',
            bgColor: '#E8F5E9',
            category: 'mmorpg',
            description: '踏入《逆水寒》中繁华的北宋汴京城，探访游戏里以宋画为蓝本还原的楼阁园林，感受那个文化鼎盛时代的建筑风华。',
            moduleName: 'GameJusticeOnline',
            fileName: 'justice-online'
        },
        {
            id: 'sword-of-sixteen',
            title: '燕云十六声',
            subtitle: '五代十国乱世中的古建遗珍',
            icon: '🗡️',
            color: '#5D4037',
            bgColor: '#EFEBE9',
            category: 'openWorld',
            description: '穿越到《燕云十六声》中五代十国的乱世，探访游戏中以晚唐五代建筑为原型的场景，感受那个动荡年代的建筑艺术与历史沧桑。',
            moduleName: 'GameSwordOfSixteen',
            fileName: 'sword-of-sixteen'
        },
        {
            id: 'fate-grand-order',
            title: 'Fate/Grand Order',
            subtitle: '人智统合真国SIN中的秦皇遗产',
            icon: '🏺',
            color: '#1A237E',
            bgColor: '#E8EAF6',
            category: 'mobile',
            description: '穿越到FGO异闻带大秦帝国，探访以秦始皇陵、万里长城、兵马俑为原型的游戏场景，感受千古一帝的遗产在日本国民级手游中的奇幻再现。',
            moduleName: 'GameFateGrandOrder',
            fileName: 'fate-grand-order'
        }
    ],

    _loadedGames: new Set(),

    // 获取所有游戏（包含已加载的数据）
    getAllGames() {
        return this._registry.map(meta => {
            const module = window[meta.moduleName];
            if (module && module.story) {
                return { ...meta, story: module.story };
            }
            return meta;
        });
    },

    // 根据ID获取游戏元数据
    getGameMeta(id) {
        return this._registry.find(g => g.id === id);
    },

    // 加载游戏数据
    async loadGame(id) {
        const meta = this.getGameMeta(id);
        if (!meta) return null;

        if (this._loadedGames.has(id)) {
            return window[meta.moduleName];
        }

        if (typeof window[meta.moduleName] !== 'undefined') {
            this._loadedGames.add(id);
            return window[meta.moduleName];
        }

        try {
            await this._loadScript(`game/${meta.fileName}.js`);
            this._loadedGames.add(id);
            return window[meta.moduleName];
        } catch (error) {
            console.error(`加载游戏 ${id} 失败:`, error);
            return null;
        }
    },

    _loadScript(src) {
        return App._loadScript(src);
    },

    // 获取游戏完整数据（含游戏内容）
    async getGameWithData(id) {
        const module = await this.loadGame(id);
        if (!module) return null;

        const meta = this.getGameMeta(id);
        return {
            ...meta,
            story: module.getStory ? module.getStory() : null,
            getAllBuildings: module.getAllBuildings ? () => module.getAllBuildings() : null,
            getBuildingByName: module.getBuildingByName ? (name) => module.getBuildingByName(name) : null
        };
    }
};

window.GameManager = GameManager;
