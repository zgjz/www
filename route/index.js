// 路线数据管理器
const RouteManager = {
    // 路线分类定义
    categories: {
        explorer: {
            id: 'explorer',
            name: '名人足迹',
            icon: '👣',
            description: '追随历史名人的旅行足迹'
        },
        trade: {
            id: 'trade',
            name: '商贸古道',
            icon: '🐫',
            description: '古代丝绸之路与商贸通道'
        },
        culture: {
            id: 'culture',
            name: '文化交流',
            icon: '🤝',
            description: '促进文化交流与融合之路'
        },
        poetry: {
            id: 'poetry',
            name: '诗路寻踪',
            icon: '📜',
            description: '诗人笔下的壮美山河'
        },
        game: {
            id: 'game',
            name: '游戏世界',
            icon: '🎮',
            description: '游戏中的古建场景原型'
        }
    },

    // 路线注册表（轻量级元数据）
    _registry: [
        {
            id: 'xuxiake-journey',
            title: '徐霞客游记',
            subtitle: '追随游圣足迹，徒步中国山川',
            icon: '🥾',
            color: '#8B4513',
            bgColor: '#FDF5E6',
            category: 'explorer',
            description: '跟随明代旅行家徐霞客的足迹，从江南水乡到西南边陲，探访那些见证游圣传奇旅程的历史古建与自然奇观。',
            moduleName: 'RouteXuXiakeJourney',
            fileName: 'xuxiake-journey'
        },
        {
            id: 'silk-road-land',
            title: '陆上丝绸之路',
            subtitle: '穿越千年的东西方文明之路',
            icon: '🐫',
            color: '#D4A574',
            bgColor: '#FDF8F3',
            category: 'trade',
            description: '从长安出发，经河西走廊，穿越西域，抵达中亚和欧洲，探访这条连接东西方文明的千年古道上的历史遗迹。',
            moduleName: 'RouteSilkRoadLand',
            fileName: 'silk-road-land'
        },
        {
            id: 'silk-road-maritime',
            title: '海上丝绸之路',
            subtitle: '跨越海洋的文明交流之路',
            icon: '⚓',
            color: '#1E88E5',
            bgColor: '#E3F2FD',
            category: 'trade',
            description: '从泉州、广州等港口出发，穿越南海、印度洋，抵达东非和欧洲，探访这条海上文明交流通道上的历史遗迹。',
            moduleName: 'RouteSilkRoadMaritime',
            fileName: 'silk-road-maritime'
        },
        {
            id: 'tang-tubo-road',
            title: '唐蕃古道',
            subtitle: '文成公主的和平之路',
            icon: '🏔️',
            color: '#8B4513',
            bgColor: '#FDF5E6',
            category: 'culture',
            description: '从长安到拉萨，追随文成公主入藏的足迹，探访这条连接唐蕃两国的和平友好之路上的历史遗迹。',
            moduleName: 'RouteTangTuboRoad',
            fileName: 'tang-tubo-road'
        },
        {
            id: 'grand-canal',
            title: '隋唐大运河',
            subtitle: '贯通南北的千年水脉',
            icon: '🌊',
            color: '#0277BD',
            bgColor: '#E1F5FE',
            category: 'culture',
            description: '从洛阳到杭州，沿隋唐大运河探访这条贯通南北的千年水脉，见证中国古代水利工程的伟大成就。',
            moduleName: 'RouteGrandCanal',
            fileName: 'grand-canal'
        },
        {
            id: 'shudao-road',
            title: '李白蜀道',
            subtitle: '诗仙笔下的奇险之路',
            icon: '🏔️',
            color: '#5D4037',
            bgColor: '#EFEBE9',
            category: 'poetry',
            description: '从长安到成都，沿金牛道探访李白笔下的蜀道，感受"蜀道之难，难于上青天"的奇险与壮美。',
            moduleName: 'RouteShudaoRoad',
            fileName: 'shudao-road'
        },
        {
            id: 'black-myth-wukong',
            title: '黑神话：悟空',
            subtitle: '跟着游戏游中国古建',
            icon: '🐵',
            color: '#C41E3A',
            bgColor: '#FFF5F5',
            category: 'game',
            description: '追随《黑神话：悟空》的游戏足迹，探访那些成为游戏场景原型的千年古建，感受虚拟与现实的交融。',
            moduleName: 'RouteBlackMythWukong',
            fileName: 'black-myth-wukong'
        }
    ],

    _loadedRoutes: new Set(),

    // 获取所有路线元数据
    getAllRoutes() {
        return this._registry;
    },

    // 根据ID获取路线元数据
    getRouteMeta(id) {
        return this._registry.find(r => r.id === id);
    },

    // 加载路线数据
    async loadRoute(id) {
        const meta = this.getRouteMeta(id);
        if (!meta) return null;

        if (this._loadedRoutes.has(id)) {
            return window[meta.moduleName];
        }

        if (typeof window[meta.moduleName] !== 'undefined') {
            this._loadedRoutes.add(id);
            return window[meta.moduleName];
        }

        try {
            await this._loadScript(`route/${meta.fileName}.js`);
            this._loadedRoutes.add(id);
            return window[meta.moduleName];
        } catch (error) {
            console.error(`加载路线 ${id} 失败:`, error);
            return null;
        }
    },

    _loadScript(src) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    },

    // 获取路线完整数据
    async getRouteWithData(id) {
        const module = await this.loadRoute(id);
        if (!module) return null;

        const meta = this.getRouteMeta(id);
        return {
            ...meta,
            route: module.getRoute ? module.getRoute() : null,
            getAllBuildings: module.getAllBuildings ? () => module.getAllBuildings() : null,
            getBuildingByName: module.getBuildingByName ? (name) => module.getBuildingByName(name) : null
        };
    }
};

window.RouteManager = RouteManager;
