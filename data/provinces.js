// 省份数据管理模块
const ProvincesData = {
    // 省份列表 - 只保留天津有数据
    provinces: [
        { id: 'beijing', name: '北京市', count: 135 },
        { id: 'tianjin', name: '天津市', count: 33 },
        { id: 'hebei', name: '河北省', count: 282 },
        { id: 'shanxi', name: '山西省', count: 531 },
        { id: 'neimenggu', name: '内蒙古自治区', count: 0 },
        { id: 'liaoning', name: '辽宁省', count: 154 },
        { id: 'jilin', name: '吉林省', count: 97 },
        { id: 'heilongjiang', name: '黑龙江省', count: 70 },
        { id: 'shanghai', name: '上海市', count: 38 },
        { id: 'jiangsu', name: '江苏省', count: 257 },
        { id: 'zhejiang', name: '浙江省', count: 298 },
        { id: 'anhui', name: '安徽省', count: 0 },
        { id: 'fujian', name: '福建省', count: 177 },
        { id: 'jiangxi', name: '江西省', count: 0 },
        { id: 'shandong', name: '山东省', count: 225 },
        { id: 'henan', name: '河南省', count: 416 },
        { id: 'hubei', name: '湖北省', count: 0 },
        { id: 'hunan', name: '湖南省', count: 0 },
        { id: 'guangdong', name: '广东省', count: 128 },
        { id: 'guangxi', name: '广西壮族自治区', count: 0 },
        { id: 'hainan', name: '海南省', count: 0 },
        { id: 'chongqing', name: '重庆市', count: 64 },
        { id: 'sichuan', name: '四川省', count: 0 },
        { id: 'guizhou', name: '贵州省', count: 0 },
        { id: 'yunnan', name: '云南省', count: 0 },
        { id: 'xizang', name: '西藏自治区', count: 0 },
        { id: 'shaanxi', name: '陕西省', count: 271 },
        { id: 'gansu', name: '甘肃省', count: 0 },
        { id: 'qinghai', name: '青海省', count: 0 },
        { id: 'ningxia', name: '宁夏回族自治区', count: 0 },
        { id: 'xinjiang', name: '新疆维吾尔自治区', count: 0 },
        { id: 'taiwan', name: '台湾省', count: 0 },
        { id: 'hongkong', name: '香港特别行政区', count: 0 },
        { id: 'macao', name: '澳门特别行政区', count: 0 }
    ],

    // 跨省文物保护单位
    crossProvince: [],

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
            console.warn(`Failed to load data for ${provinceId}:`, error);
            return null;
        }
    },

    // 获取所有建筑数据
    getAllBuildings() {
        const allBuildings = [];
        
        // 收集北京数据
        if (typeof BeijingData !== 'undefined') {
            allBuildings.push(...BeijingData.getAllBuildings());
        }
        
        // 收集上海数据
        if (typeof ShanghaiData !== 'undefined') {
            allBuildings.push(...ShanghaiData.getAllBuildings());
        }
        
        // 收集天津数据
        if (typeof TianjinData !== 'undefined') {
            allBuildings.push(...TianjinData.getAllBuildings());
        }
        
        // 收集黑龙江数据
        if (typeof HeilongjiangData !== 'undefined') {
            allBuildings.push(...HeilongjiangData.getAllBuildings());
        }
        
        // 收集跨省数据
        if (typeof CrossProvinceData !== 'undefined') {
            allBuildings.push(...CrossProvinceData.getAllBuildings());
        }

        // 收集重庆数据
        if (typeof ChongqingData !== 'undefined') {
            allBuildings.push(...ChongqingData.getAllBuildings());
        }

        // 收集河北数据
        if (typeof HebeiData !== 'undefined') {
            allBuildings.push(...HebeiData.getAllBuildings());
        }

        // 收集吉林数据
        if (typeof JilinData !== 'undefined') {
            allBuildings.push(...JilinData.getAllBuildings());
        }

        // 收集山东数据
        if (typeof ShandongData !== 'undefined') {
            allBuildings.push(...ShandongData.getAllBuildings());
        }

        // 收集辽宁数据
        if (typeof LiaoningData !== 'undefined') {
            allBuildings.push(...LiaoningData.getAllBuildings());
        }

        // 收集河南数据
        if (typeof HenanData !== 'undefined') {
            allBuildings.push(...HenanData.getAllBuildings());
        }

        // 收集山西数据
        if (typeof ShanxiData !== 'undefined') {
            allBuildings.push(...ShanxiData.getAllBuildings());
        }

        // 收集江苏数据
        if (typeof JiangsuData !== 'undefined') {
            allBuildings.push(...JiangsuData.getAllBuildings());
        }

        // 收集浙江数据
        if (typeof ZhejiangData !== 'undefined') {
            allBuildings.push(...ZhejiangData.getAllBuildings());
        }

        // 收集广东数据
        if (typeof GuangdongData !== 'undefined') {
            allBuildings.push(...GuangdongData.getAllBuildings());
        }

        // 收集福建数据
        if (typeof FujianData !== 'undefined') {
            allBuildings.push(...FujianData.getAllBuildings());
        }

        // 收集陕西数据
        if (typeof ShaanxiData !== 'undefined') {
            allBuildings.push(...ShaanxiData.getAllBuildings());
        }

        return allBuildings;
    },

    // 搜索建筑 - 增强版，支持更多字段
    searchBuildings(query) {
        const allBuildings = this.getAllBuildings();
        const lowerQuery = query.toLowerCase().trim();

        if (!lowerQuery) return [];

        return allBuildings.filter(building => {
            // 基础字段搜索
            const basicMatch =
                building.name.toLowerCase().includes(lowerQuery) ||
                building.location.toLowerCase().includes(lowerQuery) ||
                building.era.toLowerCase().includes(lowerQuery) ||
                building.type.toLowerCase().includes(lowerQuery) ||
                building.districtName.toLowerCase().includes(lowerQuery) ||
                building.tags.some(tag => tag.toLowerCase().includes(lowerQuery));

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
            if (building.name.toLowerCase().includes(lowerQuery)) reasons.push('名称匹配');
            if (building.location.toLowerCase().includes(lowerQuery)) reasons.push('地点匹配');
            if (building.era.toLowerCase().includes(lowerQuery)) reasons.push('年代匹配');
            if (building.tags.some(tag => tag.toLowerCase().includes(lowerQuery))) reasons.push('标签匹配');
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

    // 获取所有标签
    getAllTags() {
        const allBuildings = this.getAllBuildings();
        const tagCount = {};
        
        allBuildings.forEach(building => {
            building.tags.forEach(tag => {
                tagCount[tag] = (tagCount[tag] || 0) + 1;
            });
        });
        
        return Object.entries(tagCount)
            .map(([name, count]) => ({ name, count }))
            .sort((a, b) => b.count - a.count);
    }
};
