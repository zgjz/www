// 省份数据管理模块
const ProvincesData = {
    // 省份列表
    provinces: [
        { id: 'beijing', name: '北京市', count: 135 },
        { id: 'tianjin', name: '天津市', count: 33 },
        { id: 'hebei', name: '河北省', count: 282 },
        { id: 'shanxi', name: '山西省', count: 531 },
        { id: 'neimenggu', name: '内蒙古自治区', count: 150 },
        { id: 'liaoning', name: '辽宁省', count: 154 },
        { id: 'jilin', name: '吉林省', count: 97 },
        { id: 'heilongjiang', name: '黑龙江省', count: 70 },
        { id: 'shanghai', name: '上海市', count: 38 },
        { id: 'jiangsu', name: '江苏省', count: 257 },
        { id: 'zhejiang', name: '浙江省', count: 298 },
        { id: 'anhui', name: '安徽省', count: 178 },
        { id: 'fujian', name: '福建省', count: 177 },
        { id: 'jiangxi', name: '江西省', count: 160 },
        { id: 'shandong', name: '山东省', count: 225 },
        { id: 'henan', name: '河南省', count: 416 },
        { id: 'hubei', name: '湖北省', count: 174 },
        { id: 'hunan', name: '湖南省', count: 231 },
        { id: 'guangdong', name: '广东省', count: 128 },
        { id: 'guangxi', name: '广西壮族自治区', count: 83 },
        { id: 'hainan', name: '海南省', count: 37 },
        { id: 'chongqing', name: '重庆市', count: 63 },
        { id: 'sichuan', name: '四川省', count: 287 },
        { id: 'guizhou', name: '贵州省', count: 83 },
        { id: 'yunnan', name: '云南省', count: 170 },
        { id: 'xizang', name: '西藏自治区', count: 70 },
        { id: 'shaanxi', name: '陕西省', count: 271 },
        { id: 'gansu', name: '甘肃省', count: 156 },
        { id: 'qinghai', name: '青海省', count: 51 },
        { id: 'ningxia', name: '宁夏回族自治区', count: 37 },
        { id: 'xinjiang', name: '新疆维吾尔自治区', count: 133 },
        { id: 'taiwan', name: '台湾省', count: 108 },
        { id: 'hongkong', name: '香港特别行政区', count: 151 },
        { id: 'macao', name: '澳门特别行政区', count: 140 }
    ],

    // 跨省文物保护单位列表
    crossProvince: [
        { name: '长城', type: 'cross-province' },
        { name: '大运河', type: 'cross-province' },
        { name: '丝绸之路:长安-天山廊道的路网', type: 'cross-province' },
        { name: '秦直道遗址', type: 'cross-province' },
        { name: '中东铁路建筑群', type: 'cross-province' },
        { name: '齐长城遗址', type: 'cross-province' },
        { name: '茶马古道', type: 'cross-province' }
    ],

    // 获取所有省份
    getAllProvinces() {
        return this.provinces;
    },

    // 根据ID获取省份
    getProvinceById(id) {
        return this.provinces.find(p => p.id === id);
    },

    // 获取有数据的省份
    getProvincesWithData() {
        return this.provinces.filter(p => p.count > 0);
    },

    // 获取跨省文保
    getCrossProvince() {
        return this.crossProvince;
    },

    // 更新省份文保数量
    updateProvinceCount(provinceId, count) {
        const province = this.getProvinceById(provinceId);
        if (province) {
            province.count = count;
        }
    }
};

// 数据加载管理器
const DataLoader = {
    loadedModules: new Set(),
    _allBuildingsCache: null,
    _allTagsCache: null,

    // 加载省份数据
    async loadProvinceData(provinceId) {
        if (this.loadedModules.has(provinceId)) {
            return window[`${provinceId}Data`];
        }

        try {
            const module = await import(`./${provinceId}.js`);
            this.loadedModules.add(provinceId);
            return module.default || module;
        } catch (error) {
            return null;
        }
    },

    // 已加载的数据模块列表
    dataModules: [
        'BeijingData', 'TianjinData', 'HebeiData', 'ShanxiData', 'NeimengguData',
        'LiaoningData', 'JilinData', 'HeilongjiangData', 'ShanghaiData', 'JiangsuData',
        'ZhejiangData', 'AnhuiData', 'FujianData', 'JiangxiData', 'ShandongData',
        'HenanData', 'HubeiData', 'HunanData', 'GuangdongData', 'GuangxiData',
        'HainanData', 'ChongqingData', 'SichuanData', 'GuizhouData', 'YunnanData',
        'XizangData', 'ShaanxiData', 'GansuData', 'QinghaiData', 'NingxiaData',
        'XinjiangData', 'TaiwanData', 'HongKongData', 'MacauData', 'CrossProvinceData'
    ],

    // 清除缓存
    clearCache() {
        this._allBuildingsCache = null;
        this._allTagsCache = null;
    },

    // 获取所有建筑数据（带缓存）
    getAllBuildings() {
        if (this._allBuildingsCache) {
            return this._allBuildingsCache;
        }

        const allBuildings = [];

        // 收集所有已加载模块的建筑数据
        this.dataModules.forEach(moduleName => {
            if (typeof window[moduleName] !== 'undefined') {
                const module = window[moduleName];
                if (module && typeof module.getAllBuildings === 'function') {
                    allBuildings.push(...module.getAllBuildings());
                }
            }
        });

        this._allBuildingsCache = allBuildings;
        return allBuildings;
    },

    // 搜索建筑 - 增强版，支持更多字段
    searchBuildings(query) {
        const allBuildings = this.getAllBuildings();
        const lowerQuery = query.toLowerCase().trim();

        if (!lowerQuery) return [];

        return allBuildings.filter(building => {
            // 基础字段搜索（添加空值检查）
            const basicMatch =
                (building.name && building.name.toLowerCase().includes(lowerQuery)) ||
                (building.location && building.location.toLowerCase().includes(lowerQuery)) ||
                (building.era && building.era.toLowerCase().includes(lowerQuery)) ||
                (building.type && building.type.toLowerCase().includes(lowerQuery)) ||
                (building.districtName && building.districtName.toLowerCase().includes(lowerQuery)) ||
                (building.tags && building.tags.some(tag => tag && tag.toLowerCase().includes(lowerQuery)));

            if (basicMatch) return true;

            // 扩展字段搜索（描述、历史、建筑特色）
            const extendedMatch =
                (building.description && building.description.toLowerCase().includes(lowerQuery)) ||
                (building.history && building.history.toLowerCase().includes(lowerQuery)) ||
                (building.architecture && building.architecture.toLowerCase().includes(lowerQuery)) ||
                (building.features && building.features.toLowerCase().includes(lowerQuery)) ||
                (building.protectionBatch && building.protectionBatch.toLowerCase().includes(lowerQuery));

            return extendedMatch;
        }).map(building => {
            // 添加匹配原因，用于显示
            const reasons = [];
            if (building.name && building.name.toLowerCase().includes(lowerQuery)) reasons.push('名称匹配');
            if (building.location && building.location.toLowerCase().includes(lowerQuery)) reasons.push('地点匹配');
            if (building.era && building.era.toLowerCase().includes(lowerQuery)) reasons.push('年代匹配');
            if (building.tags && building.tags.some(tag => tag && tag.toLowerCase().includes(lowerQuery))) reasons.push('标签匹配');
            if (building.description && building.description.toLowerCase().includes(lowerQuery)) reasons.push('描述匹配');
            if (building.history && building.history.toLowerCase().includes(lowerQuery)) reasons.push('历史匹配');

            return {
                ...building,
                matchReasons: reasons
            };
        });
    },

    // 根据标签获取建筑
    getBuildingsByTag(tag) {
        const allBuildings = this.getAllBuildings();
        return allBuildings.filter(building => 
            building.tags.some(t => t === tag)
        );
    },

    // 获取所有标签（带缓存）
    getAllTags() {
        if (this._allTagsCache) {
            return this._allTagsCache;
        }

        const allBuildings = this.getAllBuildings();
        const tagCount = {};

        allBuildings.forEach(building => {
            building.tags.forEach(tag => {
                tagCount[tag] = (tagCount[tag] || 0) + 1;
            });
        });

        this._allTagsCache = Object.entries(tagCount)
            .map(([name, count]) => ({ name, count }))
            .sort((a, b) => b.count - a.count);

        return this._allTagsCache;
    }
};

// 将DataLoader挂载到window对象
window.DataLoader = DataLoader;
