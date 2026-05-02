// 故事数据管理器
const StoryManager = {
    // 故事分类定义
    categories: {
        classic: {
            id: 'classic',
            name: '传统名著',
            icon: '📖',
            description: '中国古典四大名著及相关文学经典'
        },
        legend: {
            id: 'legend',
            name: '神话传说',
            icon: '🐉',
            description: '民间传说与神话故事'
        },
        opera: {
            id: 'opera',
            name: '戏曲经典',
            icon: '🎭',
            description: '中国古典戏曲与戏剧作品'
        }
    },

    // 故事注册表（轻量级元数据）
    _registry: [
        {
            id: 'journey-to-the-west',
            title: '西游取经路',
            subtitle: '跟着《西游记》游中国古建',
            icon: '🐵',
            color: '#e67e22',
            bgColor: '#fef3e2',
            category: 'classic',
            description: '从长安出发，沿着玄奘法师西行取经的路线，探访那些与《西游记》有着千丝万缕联系的历史古建。',
            moduleName: 'StoryJourneyToWest',
            fileName: 'journey-to-the-west'
        },
        {
            id: 'water-margin',
            title: '水浒英雄志',
            subtitle: '跟着《水浒传》游中国古建',
            icon: '🗡️',
            color: '#c0392b',
            bgColor: '#fdedec',
            category: 'classic',
            description: '从梁山泊到东京汴梁，追随一百单八将的足迹，探访那些见证英雄传奇的历史古建。',
            moduleName: 'StoryWaterMargin',
            fileName: 'water-margin'
        },
        {
            id: 'romance-of-three-kingdoms',
            title: '三国风云录',
            subtitle: '跟着《三国演义》游中国古建',
            icon: '⚔️',
            color: '#2980b9',
            bgColor: '#eaf2f8',
            category: 'classic',
            description: '从桃园结义到三国归晋，追随魏蜀吴的英雄足迹，探访那些见证乱世风云的历史古建。',
            moduleName: 'StoryThreeKingdoms',
            fileName: 'romance-of-three-kingdoms'
        },
        {
            id: 'dream-of-red-chamber',
            title: '红楼一梦',
            subtitle: '跟着《红楼梦》游中国古建',
            icon: '🌸',
            color: '#e91e63',
            bgColor: '#fce4ec',
            category: 'classic',
            description: '从金陵到京都，走进大观园的世界，探访那些承载宝黛情缘的历史古建。',
            moduleName: 'StoryDreamOfRedChamber',
            fileName: 'dream-of-red-chamber'
        },
        {
            id: 'liao-zhai',
            title: '聊斋志异',
            subtitle: '跟着《聊斋志异》游中国古建',
            icon: '🦊',
            color: '#34495e',
            bgColor: '#f2f4f6',
            category: 'classic',
            description: '从柳泉居士的茅屋到狐仙鬼怪的居所，探访那些承载蒲松龄奇思妙想的历史古建。',
            moduleName: 'StoryLiaoZhai',
            fileName: 'liao-zhai'
        },
        {
            id: 'legend-of-white-snake',
            title: '白蛇传奇',
            subtitle: '跟着《白蛇传》游中国古建',
            icon: '🐍',
            color: '#27ae60',
            bgColor: '#eafaf1',
            category: 'legend',
            description: '从西湖断桥到雷峰塔下，追随白素贞与许仙的爱情足迹，探访那些见证千年情缘的历史古建。',
            moduleName: 'StoryWhiteSnake',
            fileName: 'legend-of-white-snake'
        },
        {
            id: 'butterfly-lovers',
            title: '梁祝化蝶',
            subtitle: '跟着《梁山伯与祝英台》游中国古建',
            icon: '🦋',
            color: '#e91e63',
            bgColor: '#fce4ec',
            category: 'legend',
            description: '从祝英台的家乡到梁山伯的坟墓，追随这段凄美爱情的足迹，探访那些见证千古绝恋的历史古建。',
            moduleName: 'StoryButterflyLovers',
            fileName: 'butterfly-lovers'
        },
        {
            id: 'cowherd-weaver',
            title: '牛郎织女',
            subtitle: '跟着《牛郎织女》游中国古建',
            icon: '⭐',
            color: '#9c27b0',
            bgColor: '#f3e5f5',
            category: 'legend',
            description: '从银河两岸到七夕鹊桥，追随这段跨越天界的爱情传说，探访那些承载浪漫情缘的历史古建。',
            moduleName: 'StoryCowherdWeaver',
            fileName: 'cowherd-weaver'
        },
        {
            id: 'west-chamber',
            title: '西厢情缘',
            subtitle: '跟着《西厢记》游中国古建',
            icon: '💕',
            color: '#9b59b6',
            bgColor: '#f5eef8',
            category: 'opera',
            description: '从普救寺到长亭送别，追随张生与崔莺莺的爱情足迹，探访那些见证才子佳人的历史古建。',
            moduleName: 'StoryWestChamber',
            fileName: 'west-chamber'
        }
    ],

    _loadedStories: new Set(),

    // 获取所有故事（包含已加载的 story 数据）
    getAllStories() {
        return this._registry.map(meta => {
            const module = window[meta.moduleName];
            if (module && module.story) {
                return { ...meta, story: module.story };
            }
            return meta;
        });
    },

    // 根据ID获取故事元数据
    getStoryMeta(id) {
        return this._registry.find(s => s.id === id);
    },

    // 加载故事数据
    async loadStory(id) {
        const meta = this.getStoryMeta(id);
        if (!meta) return null;

        // 如果已加载，直接返回
        if (this._loadedStories.has(id)) {
            return window[meta.moduleName];
        }

        // 如果已在window中，标记为已加载
        if (typeof window[meta.moduleName] !== 'undefined') {
            this._loadedStories.add(id);
            return window[meta.moduleName];
        }

        // 动态加载独立脚本
        try {
            await this._loadScript(`story/${meta.fileName}.js`);
            this._loadedStories.add(id);
            return window[meta.moduleName];
        } catch (error) {
            console.warn(`独立故事文件 ${meta.fileName}.js 加载失败，尝试回退到 topics.js`);
        }

        // 回退：加载 data/topics.js 并从中提取故事数据
        try {
            if (typeof TopicsData === 'undefined') {
                await this._loadScript('data/topics.js');
            }
            if (typeof TopicsData !== 'undefined' && TopicsData.getTopicById) {
                const topic = TopicsData.getTopicById(id);
                if (topic) {
                    // 包装成新格式
                    const wrappedModule = this._wrapTopicData(topic);
                    window[meta.moduleName] = wrappedModule;
                    this._loadedStories.add(id);
                    return wrappedModule;
                }
            }
        } catch (error) {
            console.error(`加载故事 ${id} 失败:`, error);
        }

        return null;
    },

    // 将旧 TopicsData 格式包装为新格式
    _wrapTopicData(topic) {
        return {
            getStory() {
                return topic.story;
            },
            getAllBuildings() {
                return topic.story.allBuildings || [];
            },
            getBuildingByName(name) {
                for (const chapter of topic.story.chapters) {
                    for (const b of chapter.buildings) {
                        if (b.name === name) {
                            return b.embedded || null;
                        }
                    }
                }
                for (const b of topic.story.allBuildings || []) {
                    if (b.name === name) return b;
                }
                return null;
            }
        };
    },

    _loadScript(src) {
        return App._loadScript(src);
    },

    // 获取故事完整数据（含故事内容）
    async getStoryWithData(id) {
        const module = await this.loadStory(id);
        if (!module) return null;

        const meta = this.getStoryMeta(id);
        return {
            ...meta,
            story: module.getStory ? module.getStory() : null,
            getAllBuildings: module.getAllBuildings ? () => module.getAllBuildings() : null,
            getBuildingByName: module.getBuildingByName ? (name) => module.getBuildingByName(name) : null
        };
    }
};

window.StoryManager = StoryManager;
