// 省份数据基础模块 - 提供统一的数据访问方法
// 所有省份数据模块都可以通过 Object.assign 或扩展此模块来减少重复代码

const ProvinceDataBase = {
    // 获取所有建筑（自动添加省份信息）
    getAllBuildings() {
        return this.buildings.map(building => ({
            ...building,
            province: this.provinceName,
            provinceId: this.provinceId
        }));
    },

    // 根据区县获取建筑
    getBuildingsByDistrict(districtId) {
        return this.buildings
            .filter(b => b.district === districtId)
            .map(building => ({
                ...building,
                province: this.provinceName,
                provinceId: this.provinceId
            }));
    },

    // 根据名称获取建筑（支持短名称和完整路径）
    getBuildingByName(name) {
        // 首先尝试直接匹配名称
        let building = this.buildings.find(b => b.name === name);

        // 如果没找到，尝试匹配完整路径
        if (!building) {
            building = this.buildings.find(b => {
                const fullPath = `${this.provinceName}${b.districtName}${b.name}`;
                return fullPath === name;
            });
        }

        if (building) {
            return {
                ...building,
                province: this.provinceName,
                provinceId: this.provinceId
            };
        }
        return null;
    },

    // 获取所有区县
    getAllDistricts() {
        return Object.entries(this.districts).map(([id, data]) => ({
            id,
            ...data
        }));
    },

    // 根据ID获取区县
    getDistrictById(districtId) {
        const district = this.districts[districtId];
        return district ? { id: districtId, ...district } : null;
    },

    // 搜索建筑（支持名称、位置、描述等字段）
    searchBuildings(query) {
        const lowerQuery = query.toLowerCase().trim();
        if (!lowerQuery) return [];

        return this.buildings
            .filter(building => {
                return (building.name && building.name.toLowerCase().includes(lowerQuery)) ||
                       (building.location && building.location.toLowerCase().includes(lowerQuery)) ||
                       (building.description && building.description.toLowerCase().includes(lowerQuery)) ||
                       (building.tags && building.tags.some(tag => tag.toLowerCase().includes(lowerQuery)));
            })
            .map(building => ({
                ...building,
                province: this.provinceName,
                provinceId: this.provinceId
            }));
    },

    // 根据标签获取建筑
    getBuildingsByTag(tag) {
        return this.buildings
            .filter(b => b.tags && b.tags.includes(tag))
            .map(building => ({
                ...building,
                province: this.provinceName,
                provinceId: this.provinceId
            }));
    },

    // 获取统计信息
    getStats() {
        const eraStats = {};
        const typeStats = {};
        const tagStats = {};

        this.buildings.forEach(b => {
            // 时代统计
            if (b.era) {
                eraStats[b.era] = (eraStats[b.era] || 0) + 1;
            }
            // 类型统计
            if (b.type) {
                typeStats[b.type] = (typeStats[b.type] || 0) + 1;
            }
            // 标签统计
            if (b.tags) {
                b.tags.forEach(tag => {
                    tagStats[tag] = (tagStats[tag] || 0) + 1;
                });
            }
        });

        return {
            total: this.buildings.length,
            districts: Object.keys(this.districts).length,
            eras: eraStats,
            types: typeStats,
            tags: tagStats
        };
    }
};

// 将基础模块挂载到window对象
window.ProvinceDataBase = ProvinceDataBase;
