// 主应用模块
const App = {
    // 当前状态
    state: {
        currentView: 'home',
        currentProvince: null,
        currentDistrict: null,
        currentBuildingName: null,
        currentTag: null,
        searchQuery: '',
        theme: localStorage.getItem('theme') || 'light'
    },

    // 省份图标和颜色配置 - 每个省份选择最具代表性的图标，确保不重复
    provinceStyles: {
        'beijing': { icon: '⛩️', color: '#e74c3c', bgColor: '#fdf2f2' },    // 天安门/城楼 - 首都象征
        'tianjin': { icon: '⚓', color: '#3498db', bgColor: '#ebf5fb' },      // 港口锚 - 天津港
        'hebei': { icon: '🏔️', color: '#2ecc71', bgColor: '#eafaf1' },       // 山脉 - 燕山/太行山
        'shanxi': { icon: '🏮', color: '#9b59b6', bgColor: '#f5eef8' },      // 红灯笼 - 晋商大院
        'neimenggu': { icon: '🌿', color: '#1abc9c', bgColor: '#e8f8f5' },   // 草原 - 内蒙古草原
        'liaoning': { icon: '⚙️', color: '#34495e', bgColor: '#f2f4f6' },    // 齿轮 - 老工业基地
        'jilin': { icon: '🌲', color: '#16a085', bgColor: '#e8f6f3' },       // 森林 - 长白山
        'heilongjiang': { icon: '❄️', color: '#2980b9', bgColor: '#eaf2f8' }, // 冰雪 - 北国风光
        'shanghai': { icon: '🌆', color: '#e67e22', bgColor: '#fef5e7' },    // 摩天楼 - 国际大都市
        'jiangsu': { icon: '🛶', color: '#3498db', bgColor: '#ebf5fb' },     // 小船 - 江南水乡
        'zhejiang': { icon: '🏞️', color: '#27ae60', bgColor: '#eafaf1' },    // 山水 - 西湖/千岛湖
        'anhui': { icon: '🏯', color: '#8e44ad', bgColor: '#f5eef8' },       // 古建筑 - 徽派建筑
        'fujian': { icon: '🏝️', color: '#d35400', bgColor: '#fdf2e9' },      // 海岛 - 鼓浪屿/土楼
        'jiangxi': { icon: '🍃', color: '#c0392b', bgColor: '#fdedec' },     // 茶叶 - 景德镇/庐山
        'shandong': { icon: '🌊', color: '#2980b9', bgColor: '#eaf2f8' },    // 海浪 - 齐鲁海滨/泰山
        'henan': { icon: '🏺', color: '#f39c12', bgColor: '#fef9e7' },       // 陶罐 - 中原文化/殷墟
        'hubei': { icon: '🌉', color: '#e74c3c', bgColor: '#fdf2f2' },       // 大桥 - 武汉长江大桥
        'hunan': { icon: '📜', color: '#16a085', bgColor: '#e8f6f3' },       // 书卷 - 岳麓书院/湖湘文化
        'guangdong': { icon: '🥟', color: '#e67e22', bgColor: '#fef5e7' },    // 点心 - 粤菜/岭南文化
        'guangxi': { icon: '🏔️', color: '#27ae60', bgColor: '#eafaf1' },      // 喀斯特山 - 桂林山水
        'hainan': { icon: '🌴', color: '#2ecc71', bgColor: '#eafaf1' },      // 椰子树 - 热带海岛
        'chongqing': { icon: '🌶️', color: '#9b59b6', bgColor: '#f5eef8' },   // 辣椒 - 火锅/山城
        'sichuan': { icon: '🐼', color: '#34495e', bgColor: '#f2f4f6' },      // 大熊猫 - 国宝故乡
        'guizhou': { icon: '💧', color: '#1abc9c', bgColor: '#e8f8f5' },      // 水滴 - 黄果树瀑布
        'yunnan': { icon: '🌺', color: '#e74c3c', bgColor: '#fdf2f2' },       // 山茶花 - 彩云之南
        'xizang': { icon: '🏔️', color: '#3498db', bgColor: '#ebf5fb' },       // 雪山 - 青藏高原
        'shaanxi': { icon: '🗿', color: '#8e44ad', bgColor: '#f5eef8' },      // 兵马俑 - 千年古都
        'gansu': { icon: '🏜️', color: '#f39c12', bgColor: '#fef9e7' },       // 沙漠 - 丝绸之路
        'qinghai': { icon: '💙', color: '#2980b9', bgColor: '#eaf2f8' },      // 湖泊 - 青海湖
        'ningxia': { icon: '🕌', color: '#27ae60', bgColor: '#eafaf1' },      // 清真寺 - 回族风情
        'xinjiang': { icon: '🍇', color: '#9b59b6', bgColor: '#f5eef8' },     // 葡萄 - 瓜果之乡
        'taiwan': { icon: '🌅', color: '#e67e22', bgColor: '#fef5e7' },       // 日出 - 阿里山/日月潭
        'hongkong': { icon: '🌃', color: '#34495e', bgColor: '#f2f4f6' },     // 夜景 - 维港夜色
        'macao': { icon: '🎭', color: '#c0392b', bgColor: '#fdedec' },        // 面具 - 大三巴/博彩文化
        'cross': { icon: '🌊', color: '#16a085', bgColor: '#e8f6f3' }         // 河流 - 跨省文保
    },

    // 标签图标和颜色配置 - 丰富的图标库，确保不重复
    // 中国传统色彩配色方案 - 更丰富多样
    colorPalette: [
        { color: '#B22222', bg: '#FDF2F2' }, // 朱红
        { color: '#8B4513', bg: '#FDF8F3' }, // 赭石
        { color: '#2F4F4F', bg: '#F0F5F5' }, // 墨绿
        { color: '#1E3A5F', bg: '#F0F4F8' }, // 黛蓝
        { color: '#DAA520', bg: '#FDF9F0' }, // 藤黄
        { color: '#708090', bg: '#F5F5F7' }, // 青灰
        { color: '#8B0000', bg: '#FDF0F0' }, // 深红
        { color: '#228B22', bg: '#F0F8F0' }, // 森林绿
        { color: '#4B0082', bg: '#F5F0F8' }, // 靛蓝
        { color: '#FF8C00', bg: '#FFF5E6' }, // 深橙
        { color: '#4682B4', bg: '#F0F5FA' }, // 钢蓝
        { color: '#9932CC', bg: '#F8F0FD' }, // 深紫
        { color: '#CD853F', bg: '#FDF5ED' }, // 秘鲁棕
        { color: '#2E8B57', bg: '#F0FAF5' }, // 海绿
        { color: '#C71585', bg: '#FDF0F7' }, // 中紫红
        { color: '#008B8B', bg: '#F0F8F8' }, // 深青
        { color: '#B8860B', bg: '#FCF8E8' }, // 暗金
        { color: '#556B2F', bg: '#F5F7F0' }, // 橄榄
        { color: '#8B008B', bg: '#F8F0F8' }, // 暗洋红
        { color: '#A0522D', bg: '#FCF5F2' }, // 赭色
        { color: '#5F9EA0', bg: '#F0F7F7' }, // 海碧
        { color: '#8B4513', bg: '#FCF8F3' }, // 马鞍棕
        { color: '#483D8B', bg: '#F5F4F8' }, // 暗岩蓝
        { color: '#BDB76B', bg: '#FBFBF0' }, // 卡其
        { color: '#DC143C', bg: '#FDF0F3' }, // 绯红
        { color: '#006400', bg: '#E8F5E8' }, // 深绿
        { color: '#8A2BE2', bg: '#F6F0FD' }, // 紫罗兰
        { color: '#D2691E', bg: '#FCF3EC' }, // 巧克力
        { color: '#191970', bg: '#EEF0F8' }, // 中夜蓝
        { color: '#8B4513', bg: '#FCF5F0' }, // 土褐
        { color: '#6495ED', bg: '#F0F5FD' }, // 矢车菊
        { color: '#A52A2A', bg: '#FCF0F0' }, // 棕色
        { color: '#00CED1', bg: '#E8FAFA' }, // 深天蓝
        { color: '#FF6347', bg: '#FFF0EC' }, // 番茄红
        { color: '#3CB371', bg: '#EEF8F2' }, // 中海绿
        { color: '#9370DB', bg: '#F5F0FC' }, // 中紫
        { color: '#F4A460', bg: '#FDF7F0' }, // 沙棕
        { color: '#20B2AA', bg: '#E8FAF8' }, // 浅海绿
        { color: '#FF69B4', bg: '#FFF0F7' }, // 热粉
        { color: '#4169E1', bg: '#EEF2FD' }  // 皇家蓝
    ],

    tagStyles: {
        // ========== 建筑类型 ==========
        '古建筑': { icon: '🏯' },
        '近代建筑': { icon: '🏛️' },
        '现代建筑': { icon: '🏢' },
        '古建筑群': { icon: '🏘️' },
        '历史建筑': { icon: '📜' },
        '传统建筑': { icon: '🏮' },
        '特色建筑': { icon: '✨' },

        // ========== 宗教建筑 ==========
        '寺庙': { icon: '🛕' },
        '佛教寺院': { icon: '☸️' },
        '教堂': { icon: '⛪' },
        '天主教堂': { icon: '✝️' },
        '清真寺': { icon: '🕌' },
        '道观': { icon: '☯️' },
        '宗教建筑': { icon: '🕍' },
        '佛塔': { icon: '🗼' },
        '孔庙': { icon: '📖' },
        '文庙': { icon: '📚' },

        // ========== 皇家/官式建筑 ==========
        '宫殿': { icon: '👑' },
        '皇家宫殿': { icon: '🏰' },
        '衙署': { icon: '⚖️' },
        '官署建筑': { icon: '📋' },
        '关隘': { icon: '⛰️' },
        '帝王陵寝': { icon: '⚰️' },

        // ========== 园林景观 ==========
        '园林': { icon: '🌿' },
        '风景建筑': { icon: '🏞️' },
        '游憩建筑': { icon: '🎋' },
        '风景名胜': { icon: '🌸' },

        // ========== 墓葬遗址 ==========
        '陵墓': { icon: '🪦' },
        '古墓葬': { icon: '⚰️' },
        '墓葬': { icon: '🪦' },
        '古墓群': { icon: '🗿' },
        '名人墓': { icon: '📍' },
        '积石墓': { icon: '🪨' },
        '石棺墓': { icon: '⚱️' },
        '石棚墓': { icon: '🗻' },
        '壁画墓': { icon: '🎨' },
        '遗址': { icon: '🏺' },
        '古遗址': { icon: '🗿' },
        '古城址': { icon: '🏚️' },
        '古城遗址': { icon: '🏚️' },
        '聚落遗址': { icon: '🏘️' },
        '城址': { icon: '🏰' },
        '都城遗址': { icon: '🏛️' },
        '山城遗址': { icon: '⛰️' },
        '王城遗址': { icon: '👑' },
        '考古遗址': { icon: '🔍' },
        '洞穴遗址': { icon: '🕳️' },
        '贝丘遗址': { icon: '🐚' },

        // ========== 石刻艺术 ==========
        '石窟': { icon: '🧘' },
        '石窟寺': { icon: '🪨' },
        '石刻': { icon: '🗿' },
        '摩崖石刻': { icon: '⛰️' },
        '碑刻': { icon: '📜' },
        '石刻艺术': { icon: '✨' },
        '雕塑': { icon: '🎭' },
        '壁画': { icon: '🎨' },
        '彩塑': { icon: '🎨' },
        '造像': { icon: '🧘' },

        // ========== 塔阁亭台 ==========
        '塔': { icon: '🗼' },
        '石塔': { icon: '🗿' },
        '密檐塔': { icon: '🏛️' },
        '楼阁': { icon: '🏯' },
        '亭台': { icon: '⛩️' },
        '钟鼓楼': { icon: '🥁' },
        '牌坊': { icon: '🎋' },
        '牌楼': { icon: '🏛️' },

        // ========== 交通设施 ==========
        '桥梁': { icon: '🌉' },
        '古桥梁': { icon: '🌉' },
        '城墙': { icon: '🧱' },
        '长城': { icon: '🐉' },
        '烽燧': { icon: '🔥' },
        '驿站': { icon: '📮' },
        '码头': { icon: '⚓' },
        '运河': { icon: '🌊' },
        '铁路建筑': { icon: '🚂' },
        '交通建筑': { icon: '🚉' },
        '交通设施': { icon: '🚦' },

        // ========== 水利设施 ==========
        '水利': { icon: '💧' },
        '水利工程': { icon: '🚰' },
        '水坝': { icon: '🌊' },
        '海防遗址': { icon: '⚓' },

        // ========== 教育文化 ==========
        '书院': { icon: '📚' },
        '学堂': { icon: '🎓' },
        '教育建筑': { icon: '📖' },
        '博物馆': { icon: '🏛️' },
        '图书馆': { icon: '📚' },
        '大学': { icon: '🎓' },
        '大学校园': { icon: '🏫' },
        '石头楼': { icon: '🪨' },

        // ========== 居住建筑 ==========
        '民居': { icon: '🏠' },
        '居住建筑': { icon: '🏘️' },
        '传统村落': { icon: '🏡' },
        '四合院': { icon: '⛩️' },
        '会馆': { icon: '🏤' },
        '祠堂': { icon: '🏮' },
        '家庙': { icon: '🛐' },
        '名人故居': { icon: '👤' },
        '满族民居': { icon: '🏯' },
        '东北民居': { icon: '🏠' },
        '历史风貌': { icon: '📜' },

        // ========== 商业金融 ==========
        '商业建筑': { icon: '🏪' },
        '金融建筑': { icon: '🏦' },
        '工业建筑': { icon: '🏭' },
        '工业遗产': { icon: '⚙️' },
        '工业遗址': { icon: '🏭' },
        '近代工业': { icon: '🔧' },
        '军事工业': { icon: '⚔️' },
        '钢铁工业': { icon: '🔩' },
        '汽车工业': { icon: '🚗' },
        '酿酒遗址': { icon: '🍷' },
        '葡萄酒文化': { icon: '🍇' },
        '地下酒窖': { icon: '🍾' },
        '电影文化': { icon: '🎬' },
        '文化产业': { icon: '🎭' },
        '百货商场': { icon: '🛍️' },
        '灯塔': { icon: '💡' },
        '航海标志': { icon: '⚓' },

        // ========== 医疗公共 ==========
        '医疗建筑': { icon: '🏥' },
        '医院建筑': { icon: '🩺' },
        '公共建筑': { icon: '🏬' },
        '城市广场': { icon: '🏛️' },

        // ========== 祭祀纪念 ==========
        '祭坛': { icon: '🕯️' },
        '纪念建筑': { icon: '🛕' },
        '烈士陵园': { icon: '🌹' },
        '纪念塔': { icon: '🗼' },
        '影壁': { icon: '🧱' },
        '照壁': { icon: '🏛️' },
        '戍边楼': { icon: '🏯' },

        // ========== 天文科技 ==========
        '天文': { icon: '🔭' },
        '观象台': { icon: '🔮' },

        // ========== 遗产类型 ==========
        '世界遗产': { icon: '🌍' },
        '世界文化遗产': { icon: '🌐' },
        '自然遗产': { icon: '🌲' },
        '文化景观': { icon: '🌄' },
        '混合遗产': { icon: '🗺️' },

        // ========== 历史文化 ==========
        '历史文化街区': { icon: '🏛️' },
        '革命遗址': { icon: '✊' },
        '红色旅游': { icon: '🔴' },
        '爱国主义教育': { icon: '🇨🇳' },
        '历史纪念': { icon: '📜' },
        '党史教育': { icon: '📚' },
        '近代史': { icon: '📖' },
        '历史教育': { icon: '🎓' },
        '法治教育': { icon: '⚖️' },

        // ========== 时代特征 ==========
        '新石器时代': { icon: '🪨' },
        '旧石器时代': { icon: '⛏️' },
        '青铜时代': { icon: '⚱️' },
        '铁器时代': { icon: '⛓️' },
        '夏商周': { icon: '🏺' },
        '商周': { icon: '⚔️' },
        '东周': { icon: '📜' },
        '春秋战国': { icon: '⚔️' },
        '战国': { icon: '🗡️' },
        '秦汉': { icon: '📜' },
        '汉代': { icon: '🏛️' },
        '汉晋': { icon: '📜' },
        '唐代': { icon: '🏯' },
        '唐代建筑': { icon: '🏛️' },
        '唐代城址': { icon: '🏰' },
        '唐代造像': { icon: '🧘' },
        '辽代': { icon: '🏹' },
        '辽代建筑': { icon: '🏯' },
        '辽代艺术': { icon: '🎨' },
        '辽代墓葬': { icon: '⚰️' },
        '辽代遗址': { icon: '🏺' },
        '辽金': { icon: '⚔️' },
        '辽金遗址': { icon: '🏚️' },
        '辽金古城': { icon: '🏰' },
        '金代': { icon: '👑' },
        '金代建筑': { icon: '🏯' },
        '金代城址': { icon: '🏰' },
        '金代遗址': { icon: '🏺' },
        '金代墓葬': { icon: '⚰️' },
        '金代墓群': { icon: '🪦' },
        '金代碑刻': { icon: '📜' },
        '金代石刻': { icon: '🗿' },
        '元代': { icon: '🏇' },
        '元代城址': { icon: '🏰' },
        '明代': { icon: '🐉' },
        '明代建筑': { icon: '🏯' },
        '明代城址': { icon: '🏰' },
        '明代摩崖石刻': { icon: '⛰️' },
        '明代海西女真': { icon: '👹' },
        '清代': { icon: '🐲' },
        '清代建筑': { icon: '🏯' },
        '清代建筑群': { icon: '🏘️' },
        '清代碑刻': { icon: '📜' },
        '清代石刻': { icon: '🗿' },
        '民国时期': { icon: '🎩' },
        '民国': { icon: '🎩' },
        '民国建筑': { icon: '🏛️' },
        '近代': { icon: '🕰️' },
        '伪满': { icon: '📜' },
        '伪满建筑': { icon: '🏢' },
        '后金': { icon: '⚔️' },
        '后金遗址': { icon: '🏚️' },
        '后金都城': { icon: '🏰' },

        // ========== 地域文化 ==========
        '高句丽': { icon: '🏔️' },
        '渤海国': { icon: '⚓' },
        '夫余': { icon: '📜' },
        '东夏国': { icon: '⚔️' },
        '燕国': { icon: '⚔️' },
        '海西女真': { icon: '🏹' },
        '叶赫部': { icon: '👑' },
        '辉发部': { icon: '⚔️' },
        '乌拉部': { icon: '🏹' },
        '扈伦四部': { icon: '⚔️' },
        '满族': { icon: '🏹' },
        '满族历史': { icon: '📜' },
        '满族文化': { icon: '🎭' },
        '满族风格': { icon: '🏯' },
        '契丹': { icon: '🏹' },
        '契丹文化': { icon: '📜' },
        '女真': { icon: '⚔️' },
        '女真文字': { icon: '📜' },
        '锡伯族': { icon: '🏹' },
        '清前史迹': { icon: '📜' },
        '盛京三陵': { icon: '⚰️' },
        '玄菟郡': { icon: '📜' },
        '捺钵文化': { icon: '⛺' },

        // ========== 考古相关 ==========
        '考古遗址': { icon: '🔍' },
        '考古发掘': { icon: '⛏️' },
        '考古学文化': { icon: '📚' },
        '考古学文化命名地': { icon: '📍' },
        '十大考古新发现': { icon: '⭐' },
        '大遗址': { icon: '🏛️' },
        '考古中国': { icon: '🇨🇳' },

        // ========== 工业/科技 ==========
        '洋务运动': { icon: '⚙️' },
        '一五计划': { icon: '📊' },
        '苏式建筑': { icon: '🏭' },
        '仿德建筑': { icon: '🏛️' },
        '冶铜遗址': { icon: '🔥' },
        '矿冶遗址': { icon: '⛏️' },
        '造船遗址': { icon: '⚓' },
        '军工遗址': { icon: '💣' },
        '弹药库': { icon: '💥' },

        // ========== 战争/革命 ==========
        '抗日战争': { icon: '⚔️' },
        '九一八事变': { icon: '💥' },
        '甲午战争': { icon: '⚓' },
        '古战场': { icon: '⚔️' },
        '军事遗址': { icon: '🛡️' },
        '军事重镇': { icon: '🏰' },
        '军事要塞': { icon: '🏯' },
        '边城': { icon: '🧱' },
        '二战遗址': { icon: '💣' },
        '战俘营': { icon: '⛓️' },
        '盟军战俘营': { icon: '🇺🇸' },
        '战犯管理': { icon: '⚖️' },
        '奉系军阀': { icon: '⚔️' },
        '东北抗联': { icon: '✊' },
        '抗日根据地': { icon: '🏔️' },
        '解放战争': { icon: '🔥' },
        '革命': { icon: '✊' },

        // ========== 侵华罪证 ==========
        '侵华罪证': { icon: '⚠️' },
        '侵华': { icon: '🚫' },
        '细菌战': { icon: '🦠' },
        '劳工苦难': { icon: '⛓️' },
        '万人坑': { icon: '💀' },
        '惨案遗址': { icon: '😢' },
        '监狱建筑': { icon: '⛓️' },
        '警示遗产': { icon: '⚠️' },
        '殖民建筑': { icon: '🏛️' },
        '关东军': { icon: '💀' },
        '总督府': { icon: '🏢' },

        // ========== 建筑风格 ==========
        '哥特式': { icon: '⛪' },
        '哥特式建筑': { icon: '🏰' },
        '西式建筑': { icon: '🏛️' },
        '西式建筑群': { icon: '🏘️' },
        '欧式建筑': { icon: '🏰' },
        '俄式建筑': { icon: '🏛️' },
        '折衷主义': { icon: '🏛️' },
        '中西合璧': { icon: '☯️' },
        '官邸建筑': { icon: '🏠' },
        '近代别墅': { icon: '🏡' },
        '陵园建筑': { icon: '🪦' },
        '博物馆建筑': { icon: '🏛️' },

        // ========== 历史名人 ==========
        '张作霖': { icon: '👤' },
        '张学良': { icon: '👤' },
        '梁思成': { icon: '📐' },
        '林徽因': { icon: '✏️' },
        '陈云': { icon: '👤' },
        '雷锋': { icon: '⭐' },
        '孝庄文皇后': { icon: '👑' },
        '吴大澂': { icon: '📜' },

        // ========== 特色类型 ==========
        '广场建筑': { icon: '⛲' },
        '城市地标': { icon: '📍' },
        '海洋文化': { icon: '🐚' },
        '思想家': { icon: '💭' },
        '历史遗产': { icon: '📜' },
        '老字号': { icon: '🏮' },
        '边界碑': { icon: '🪨' },
        '中苏关系': { icon: '🇷🇺' },
        '十大名片': { icon: '🏆' },
        '城市象征': { icon: '🏙️' },
        '爱国主义': { icon: '❤️' },
        '红色文化': { icon: '🔴' },

        // ========== 材料/工艺 ==========
        '翠蓝釉瓷器': { icon: '🏺' },
        '黑陶': { icon: '🏺' },
        '蛋壳陶': { icon: '🥚' },
        '汉代画像': { icon: '🎨' },
        '细石器': { icon: '🪨' },
        '细石叶技术': { icon: '⛏️' },
        '石器工业': { icon: '🔨' },

        // ========== 宗教相关 ==========
        '四大名刹': { icon: '🏯' },
        '中国四大文庙': { icon: '📚' },
        '千佛殿': { icon: '🧘' },
        '辟支塔': { icon: '🗼' },
        '墓塔林': { icon: '🪦' },
        '四门塔': { icon: '🗼' },
        '龙虎塔': { icon: '🐉' },
        '九顶塔': { icon: '🗼' },
        '东方金字塔': { icon: '🔺' },
        '好太王碑': { icon: '📜' },
        '贞惠公主墓': { icon: '👸' },
        '贞孝公主墓': { icon: '👸' },

        // ========== 地理相关 ==========
        '盛京八景': { icon: '🌅' },
        '马蹄金': { icon: '🏆' },
        '辽东文化': { icon: '📜' },
        '辽南文化': { icon: '🌊' },
        '嫩江流域': { icon: '🌊' },
        '图们江流域': { icon: '🌊' },
        '东北第一缕炊烟': { icon: '🔥' },

        // ========== 其他 ==========
        '宝马城': { icon: '🏇' },
        '山祭遗址': { icon: '⛰️' },
        '行宫遗址': { icon: '👑' },
        '游牧民族': { icon: '🐎' },
        '旷野遗址': { icon: '🏜️' }
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
        console.log('App initializing...');
        this.setupTheme();
        this.setupEventListeners();
        this.setupNavigation();
        this.render();
        console.log('App initialized');
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
        }

        // 关闭移动端菜单
        document.querySelector('.nav-menu')?.classList.remove('active');
    },

    // 根据完整路径查找建筑
    findBuildingByFullPath(fullPath) {
        // 先查找北京数据
        if (typeof BeijingData !== 'undefined') {
            const building = BeijingData.getBuildingByName(fullPath);
            if (building) return building;
        }
        // 再查找上海数据
        if (typeof ShanghaiData !== 'undefined') {
            const building = ShanghaiData.getBuildingByName(fullPath);
            if (building) return building;
        }
        // 再查找天津数据
        if (typeof TianjinData !== 'undefined') {
            const building = TianjinData.getBuildingByName(fullPath);
            if (building) return building;
        }
        // 再查找黑龙江数据
        if (typeof HeilongjiangData !== 'undefined') {
            const building = HeilongjiangData.getBuildingByName(fullPath);
            if (building) return building;
        }
        // 再查找跨省数据
        if (typeof CrossProvinceData !== 'undefined') {
            const building = CrossProvinceData.getBuildingByName(fullPath);
            if (building) return building;
        }
        // 再查找重庆数据
        if (typeof ChongqingData !== 'undefined') {
            const building = ChongqingData.getBuildingByName(fullPath);
            if (building) return building;
        }
        // 再查找河北数据
        if (typeof HebeiData !== 'undefined') {
            const building = HebeiData.getBuildingByName(fullPath);
            if (building) return building;
        }
        // 再查找吉林数据
        if (typeof JilinData !== 'undefined') {
            const building = JilinData.getBuildingByName(fullPath);
            if (building) return building;
        }
        // 再查找山东数据
        if (typeof ShandongData !== 'undefined') {
            const building = ShandongData.getBuildingByName(fullPath);
            if (building) return building;
        }
        // 再查找辽宁数据
        if (typeof LiaoningData !== 'undefined') {
            const building = LiaoningData.getBuildingByName(fullPath);
            if (building) return building;
        }
        // 再查找河南数据
        if (typeof HenanData !== 'undefined') {
            const building = HenanData.getBuildingByName(fullPath);
            if (building) return building;
        }
        // 再查找山西数据
        if (typeof ShanxiData !== 'undefined') {
            const building = ShanxiData.getBuildingByName(fullPath);
            if (building) return building;
        }
        // 再查找江苏数据
        if (typeof JiangsuData !== 'undefined') {
            const building = JiangsuData.getBuildingByName(fullPath);
            if (building) return building;
        }
        // 再查找浙江数据
        if (typeof ZhejiangData !== 'undefined') {
            const building = ZhejiangData.getBuildingByName(fullPath);
            if (building) return building;
        }
        // 再查找广东数据
        if (typeof GuangdongData !== 'undefined') {
            const building = GuangdongData.getBuildingByName(fullPath);
            if (building) return building;
        }
        // 再查找福建数据
        if (typeof FujianData !== 'undefined') {
            const building = FujianData.getBuildingByName(fullPath);
            if (building) return building;
        }
        // 再查找陕西数据
        if (typeof ShaanxiData !== 'undefined') {
            const building = ShaanxiData.getBuildingByName(fullPath);
            if (building) return building;
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
            default:
                this.renderHome(mainContent);
        }

        // 页面切换后滚动到顶部
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
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
                if (building.provinceId === 'cross') {
                    // 跨省建筑特殊处理：首页 > 按省份浏览 > 跨省文物保护单位 > 建筑名称
                    items.push({ name: '🗺️ 按省份浏览', hash: 'provinces' });
                    items.push({ name: '🌊 跨省文物保护单位', hash: 'cross' });
                    items.push({ name: `🏛️ ${building.name}`, hash: this.generateBuildingHash(building), active: true });
                } else {
                    items.push({ name: '🗺️ 按省份浏览', hash: 'provinces' });
                    const provinceStyle = this.getProvinceStyle(building.provinceId);
                    items.push({ name: `${provinceStyle.icon} ${building.province}`, hash: `province/${building.provinceId}` });
                    items.push({ name: `📍 ${building.districtName}`, hash: `province/${building.provinceId}/${building.district}` });
                    items.push({ name: `🏛️ ${building.name}`, hash: this.generateBuildingHash(building), active: true });
                }
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

    // 获取区县数据 - 支持北京、上海、天津、黑龙江和跨省数据
    getDistrictData(provinceId, districtId) {
        if (provinceId === 'beijing' && typeof BeijingData !== 'undefined') {
            return BeijingData.districts[districtId] ? { id: districtId, ...BeijingData.districts[districtId] } : null;
        }
        if (provinceId === 'shanghai' && typeof ShanghaiData !== 'undefined') {
            return ShanghaiData.districts[districtId] ? { id: districtId, ...ShanghaiData.districts[districtId] } : null;
        }
        if (provinceId === 'tianjin' && typeof TianjinData !== 'undefined') {
            return TianjinData.districts[districtId] ? { id: districtId, ...TianjinData.districts[districtId] } : null;
        }
        if (provinceId === 'heilongjiang' && typeof HeilongjiangData !== 'undefined') {
            return HeilongjiangData.districts[districtId] ? { id: districtId, ...HeilongjiangData.districts[districtId] } : null;
        }
        if (provinceId === 'cross' && typeof CrossProvinceData !== 'undefined') {
            return CrossProvinceData.districts[districtId] ? { id: districtId, ...CrossProvinceData.districts[districtId] } : null;
        }
        if (provinceId === 'chongqing' && typeof ChongqingData !== 'undefined') {
            return ChongqingData.districts[districtId] ? { id: districtId, ...ChongqingData.districts[districtId] } : null;
        }
        if (provinceId === 'hebei' && typeof HebeiData !== 'undefined') {
            return HebeiData.districts[districtId] ? { id: districtId, ...HebeiData.districts[districtId] } : null;
        }
        if (provinceId === 'jilin' && typeof JilinData !== 'undefined') {
            return JilinData.districts[districtId] ? { id: districtId, ...JilinData.districts[districtId] } : null;
        }
        if (provinceId === 'shandong' && typeof ShandongData !== 'undefined') {
            return ShandongData.districts[districtId] ? { id: districtId, ...ShandongData.districts[districtId] } : null;
        }
        if (provinceId === 'liaoning' && typeof LiaoningData !== 'undefined') {
            return LiaoningData.districts[districtId] ? { id: districtId, ...LiaoningData.districts[districtId] } : null;
        }
        if (provinceId === 'henan' && typeof HenanData !== 'undefined') {
            return HenanData.districts[districtId] ? { id: districtId, ...HenanData.districts[districtId] } : null;
        }
        if (provinceId === 'shanxi' && typeof ShanxiData !== 'undefined') {
            return ShanxiData.districts[districtId] ? { id: districtId, ...ShanxiData.districts[districtId] } : null;
        }
        if (provinceId === 'jiangsu' && typeof JiangsuData !== 'undefined') {
            return JiangsuData.districts[districtId] ? { id: districtId, ...JiangsuData.districts[districtId] } : null;
        }
        if (provinceId === 'zhejiang' && typeof ZhejiangData !== 'undefined') {
            return ZhejiangData.districts[districtId] ? { id: districtId, ...ZhejiangData.districts[districtId] } : null;
        }
        if (provinceId === 'guangdong' && typeof GuangdongData !== 'undefined') {
            return GuangdongData.districts[districtId] ? { id: districtId, ...GuangdongData.districts[districtId] } : null;
        }
        if (provinceId === 'fujian' && typeof FujianData !== 'undefined') {
            return FujianData.districts[districtId] ? { id: districtId, ...FujianData.districts[districtId] } : null;
        }
        if (provinceId === 'shaanxi' && typeof ShaanxiData !== 'undefined') {
            return ShaanxiData.districts[districtId] ? { id: districtId, ...ShaanxiData.districts[districtId] } : null;
        }
        return null;
    },

    // 有趣的推荐标题
    getFunnyHomeTitle(tagName) {
        const titles = [
            { text: '🎲 今日随机推荐', sub: '让命运决定你的下一站' },
            { text: '🌟 今天给您推荐', sub: '精选好去处，不容错过' },
            { text: '🎁 惊喜盲盒时间', sub: '点开看看今天有什么好料' },
            { text: '✨ 每日精选', sub: '特别为你挑选的宝藏建筑' },
            { text: '🎯 猜你喜欢', sub: '根据你的品味精心挑选' },
            { text: '🍀 幸运大转盘', sub: '转到什么看什么，都是缘分' },
            { text: '🎪 今日好戏', sub: '精彩建筑正在上演' },
            { text: '🔮 神秘推荐', sub: '冥冥之中注定的相遇' },
            { text: '🌈 发现美好', sub: '带你探索未知的精彩' },
            { text: '🎨 今日主题', sub: '换个角度欣赏古建筑' },
            { text: '💫 眼前一亮', sub: '这些建筑值得一看再看' },
            { text: '🍵 茶余饭后', sub: '闲聊时的最佳谈资' },
            { text: '📸 打卡必去', sub: '拍照发朋友圈的首选' },
            { text: '🎭 穿越时光', sub: '与历史来一场浪漫邂逅' },
            { text: '🏃 说走就走', sub: '心动不如行动' }
        ];
        return titles[Math.floor(Math.random() * titles.length)];
    },

    // 渲染首页 - 随机标签主题（只选择10个以上建筑的标签）
    renderHome(container) {
        // 获取所有标签，只保留10个以上建筑的标签
        const allTags = DataLoader.getAllTags().filter(tag => tag.count >= 10);
        
        // 随机选择一个标签
        const randomTag = allTags.length > 0 ? allTags[Math.floor(Math.random() * allTags.length)] : null;
        
        // 获取该标签下的建筑
        let featured = [];
        if (randomTag) {
            const tagBuildings = DataLoader.getBuildingsByTag(randomTag.name);
            const shuffled = this.shuffleArray([...tagBuildings]);
            featured = shuffled.slice(0, 12);
        }
        
        // 如果没有符合条件的标签或标签下没有建筑，显示随机建筑
        if (featured.length === 0) {
            const allBuildings = DataLoader.getAllBuildings();
            const shuffled = this.shuffleArray([...allBuildings]);
            featured = shuffled.slice(0, 12);
        }

        // 获取标签样式
        const tagStyle = randomTag ? this.getTagStyle(randomTag.name, 0) : null;
        
        // 获取有趣的标题
        const funnyTitle = this.getFunnyHomeTitle();

        container.innerHTML = `
            <div class="container">
                <section>
                    ${randomTag ? `
                    <div class="home-tag-header">
                        <div class="home-tag-icon" style="color: ${tagStyle.color};">${tagStyle.icon}</div>
                        <div class="home-tag-info">
                            <div class="home-tag-label" style="color: ${tagStyle.color}; font-size: 0.9rem; margin-bottom: 0.25rem; font-weight: 500;">${funnyTitle.text}</div>
                            <h2 class="home-tag-title" style="margin: 0;">${randomTag.name}</h2>
                            <p class="home-tag-desc" style="margin-top: 0.25rem; font-size: 0.85rem; opacity: 0.8;">${funnyTitle.sub} · 共 ${randomTag.count} 处</p>
                        </div>
                        <a href="#tag/${encodeURIComponent(randomTag.name)}" class="home-tag-more" style="color: ${tagStyle.color};">去看看 →</a>
                    </div>
                    ` : `
                    <div class="home-section-header">
                        <div class="home-title-wrapper">
                            <span class="home-title-emoji">${funnyTitle.text.split(' ')[0]}</span>
                            <h2 class="section-title" style="margin: 0; display: inline;">${funnyTitle.text.split(' ')[1] || '精选建筑'}</h2>
                        </div>
                        <p class="home-subtitle">${funnyTitle.sub}</p>
                    </div>
                    `}
                    <div class="building-grid building-grid-small">
                        ${featured.map(building => this.createBuildingCard(building, 'small')).join('')}
                    </div>
                </section>
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

        // 处理北京数据
        if (provinceId === 'beijing' && typeof BeijingData !== 'undefined') {
            districts = BeijingData.getAllDistricts();
            allBuildings = BeijingData.getAllBuildings();
        }
        // 处理上海数据
        else if (provinceId === 'shanghai' && typeof ShanghaiData !== 'undefined') {
            districts = ShanghaiData.getAllDistricts();
            allBuildings = ShanghaiData.getAllBuildings();
        }
        // 处理天津数据
        else if (provinceId === 'tianjin' && typeof TianjinData !== 'undefined') {
            districts = TianjinData.getAllDistricts();
            allBuildings = TianjinData.getAllBuildings();
        }
        // 处理黑龙江数据
        else if (provinceId === 'heilongjiang' && typeof HeilongjiangData !== 'undefined') {
            districts = HeilongjiangData.getAllDistricts();
            allBuildings = HeilongjiangData.getAllBuildings();
        }
        // 处理重庆数据
        else if (provinceId === 'chongqing' && typeof ChongqingData !== 'undefined') {
            districts = ChongqingData.getAllDistricts();
            allBuildings = ChongqingData.getAllBuildings();
        }
        // 处理河北数据
        else if (provinceId === 'hebei' && typeof HebeiData !== 'undefined') {
            districts = HebeiData.getAllDistricts();
            allBuildings = HebeiData.getAllBuildings();
        }
        // 处理吉林数据
        else if (provinceId === 'jilin' && typeof JilinData !== 'undefined') {
            districts = JilinData.getAllDistricts();
            allBuildings = JilinData.getAllBuildings();
        }
        // 处理山东数据
        else if (provinceId === 'shandong' && typeof ShandongData !== 'undefined') {
            districts = ShandongData.getAllDistricts();
            allBuildings = ShandongData.getAllBuildings();
        }
        // 处理辽宁数据
        else if (provinceId === 'liaoning' && typeof LiaoningData !== 'undefined') {
            districts = LiaoningData.getAllDistricts();
            allBuildings = LiaoningData.getAllBuildings();
        }
        // 处理河南数据
        else if (provinceId === 'henan' && typeof HenanData !== 'undefined') {
            districts = HenanData.getAllDistricts();
            allBuildings = HenanData.getAllBuildings();
        }
        // 处理山西数据
        else if (provinceId === 'shanxi' && typeof ShanxiData !== 'undefined') {
            districts = ShanxiData.getAllDistricts();
            allBuildings = ShanxiData.getAllBuildings();
        }
        // 处理江苏数据
        else if (provinceId === 'jiangsu' && typeof JiangsuData !== 'undefined') {
            districts = JiangsuData.getAllDistricts();
            allBuildings = JiangsuData.getAllBuildings();
        }
        // 处理浙江数据
        else if (provinceId === 'zhejiang' && typeof ZhejiangData !== 'undefined') {
            districts = ZhejiangData.getAllDistricts();
            allBuildings = ZhejiangData.getAllBuildings();
        }
        // 处理广东数据
        else if (provinceId === 'guangdong' && typeof GuangdongData !== 'undefined') {
            districts = GuangdongData.getAllDistricts();
            allBuildings = GuangdongData.getAllBuildings();
        }
        // 处理福建数据
        else if (provinceId === 'fujian' && typeof FujianData !== 'undefined') {
            districts = FujianData.getAllDistricts();
            allBuildings = FujianData.getAllBuildings();
        }
        // 处理陕西数据
        else if (provinceId === 'shaanxi' && typeof ShaanxiData !== 'undefined') {
            districts = ShaanxiData.getAllDistricts();
            allBuildings = ShaanxiData.getAllBuildings();
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

                ${districts.map(district => {
                    const districtBuildings = buildingsByDistrict[district.id] || [];
                    if (districtBuildings.length === 0) return '';
                    const shuffled = this.shuffleArray([...districtBuildings]);
                    return `
                    <section class="district-section">
                        <div class="district-title-bar" onclick="window.location.hash='province/${provinceId}/${district.id}'">
                            <span class="district-name-small">${district.name}</span>
                            <span class="district-count-badge">${district.count}</span>
                        </div>
                        <div class="building-grid building-grid-medium">
                            ${shuffled.map(building => this.createBuildingCard(building, 'medium')).join('')}
                        </div>
                    </section>
                    `;
                }).join('')}
            </div>
        `;
    },

    // 计算省份统计数据
    calculateProvinceStats(buildings) {
        const stats = {
            total: buildings.length,
            worldHeritage: buildings.filter(b => b.worldHeritage).length,
            districts: new Set(buildings.map(b => b.district)).size,
            eras: new Set(buildings.map(b => b.era)).size,
            batchDistribution: []
        };

        // 计算批次分布
        const batchCount = {};
        buildings.forEach(b => {
            if (b.protectionBatch) {
                batchCount[b.protectionBatch] = (batchCount[b.protectionBatch] || 0) + 1;
            }
        });

        // 按批次顺序排序
        const batchOrder = ['第一批', '第二批', '第三批', '第四批', '第五批', '第六批', '第七批', '第八批'];
        const maxCount = Math.max(...Object.values(batchCount), 1);

        stats.batchDistribution = batchOrder
            .filter(batch => batchCount[batch])
            .map(batch => ({
                name: batch,
                count: batchCount[batch],
                percentage: (batchCount[batch] / maxCount) * 100
            }));

        return stats;
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
        // 处理北京数据
        if (provinceId === 'beijing' && typeof BeijingData !== 'undefined') {
            buildings = BeijingData.getBuildingsByDistrict(districtId);
        }
        // 处理上海数据
        else if (provinceId === 'shanghai' && typeof ShanghaiData !== 'undefined') {
            buildings = ShanghaiData.getBuildingsByDistrict(districtId);
        }
        // 处理天津数据
        else if (provinceId === 'tianjin' && typeof TianjinData !== 'undefined') {
            buildings = TianjinData.getBuildingsByDistrict(districtId);
        }
        // 处理黑龙江数据
        else if (provinceId === 'heilongjiang' && typeof HeilongjiangData !== 'undefined') {
            buildings = HeilongjiangData.getBuildingsByDistrict(districtId);
        }
        // 处理重庆数据
        else if (provinceId === 'chongqing' && typeof ChongqingData !== 'undefined') {
            buildings = ChongqingData.getBuildingsByDistrict(districtId);
        }
        // 处理河北数据
        else if (provinceId === 'hebei' && typeof HebeiData !== 'undefined') {
            buildings = HebeiData.getBuildingsByDistrict(districtId);
        }
        // 处理吉林数据
        else if (provinceId === 'jilin' && typeof JilinData !== 'undefined') {
            buildings = JilinData.getBuildingsByDistrict(districtId);
        }
        // 处理山东数据
        else if (provinceId === 'shandong' && typeof ShandongData !== 'undefined') {
            buildings = ShandongData.getBuildingsByDistrict(districtId);
        }
        // 处理辽宁数据
        else if (provinceId === 'liaoning' && typeof LiaoningData !== 'undefined') {
            buildings = LiaoningData.getBuildingsByDistrict(districtId);
        }
        // 处理河南数据
        else if (provinceId === 'henan' && typeof HenanData !== 'undefined') {
            buildings = HenanData.getBuildingsByDistrict(districtId);
        }
        // 处理山西数据
        else if (provinceId === 'shanxi' && typeof ShanxiData !== 'undefined') {
            buildings = ShanxiData.getBuildingsByDistrict(districtId);
        }
        // 处理江苏数据
        else if (provinceId === 'jiangsu' && typeof JiangsuData !== 'undefined') {
            buildings = JiangsuData.getBuildingsByDistrict(districtId);
        }
        // 处理浙江数据
        else if (provinceId === 'zhejiang' && typeof ZhejiangData !== 'undefined') {
            buildings = ZhejiangData.getBuildingsByDistrict(districtId);
        }
        // 处理广东数据
        else if (provinceId === 'guangdong' && typeof GuangdongData !== 'undefined') {
            buildings = GuangdongData.getBuildingsByDistrict(districtId);
        }
        // 处理福建数据
        else if (provinceId === 'fujian' && typeof FujianData !== 'undefined') {
            buildings = FujianData.getBuildingsByDistrict(districtId);
        }
        // 处理陕西数据
        else if (provinceId === 'shaanxi' && typeof ShaanxiData !== 'undefined') {
            buildings = ShaanxiData.getBuildingsByDistrict(districtId);
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

                <div class="building-grid building-grid-large">
                    ${buildings.map(building => this.createBuildingCard(building, 'large')).join('')}
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
                                    <span class="info-value">${building.provinceId === 'cross' ? '跨省（流经多个省份）' : building.province + ' ' + building.districtName}</span>
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

                        ${building.subSites ? `
                        <div class="building-detail-section" id="section-subsites">
                            <h3><span class="section-icon">🏛️</span> 包含子遗址</h3>
                            <div class="subsites-list">
                                ${building.subSites.map(site => `
                                    <div class="subsite-item">
                                        <span class="subsite-icon">📍</span>
                                        <span class="subsite-name">${site}</span>
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
                    <div class="building-grid building-grid-small">
                        ${relatedBuildings.map(b => this.createBuildingCard(b, 'small')).join('')}
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
        // 随机排序标签
        const shuffledTags = this.shuffleArray([...tags]);
        const maxCount = Math.max(...tags.map(t => t.count));
        const minCount = Math.min(...tags.map(t => t.count));

        container.innerHTML = `
            <div class="container">
                <div class="tags-cloud-modern">
                    ${shuffledTags.map((tag, index) => {
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
        const shuffled = this.shuffleArray([...buildings]);
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
                    <div class="building-grid building-grid-small">
                        ${shuffled.map(building => this.createBuildingCard(building, 'small')).join('')}
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
                if (query) {
                    clearBtn.style.display = 'flex';
                    this.renderSearchPageResults(query, resultsContainer);
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
            <div class="building-grid building-grid-small">
                ${results.map(building => this.createBuildingCard(building, 'small')).join('')}
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
            protectionBadge = `<span class="protection-badge national">🏛️ ${building.protectionBatch || '全国重点'}</span>`;
        }

        // 截断描述文字
        const shortDesc = building.description ? building.description.substring(0, 50) + '...' : '';

        // 显示匹配原因
        const matchReasonsHtml = building.matchReasons ?
            `<div class="match-reasons">${building.matchReasons.map(r => `<span class="match-reason">${r}</span>`).join('')}</div>` : '';

        // 显示完整的地区信息：省份+区县
        const fullLocation = `${building.province}${building.districtName}`;

        return `
            <div class="building-card search-result-card" data-hash="${hashUrl}" style="border-left-color: ${provinceStyle.color};">
                <div class="building-card-header" style="background: ${provinceStyle.bgColor};">
                    <div class="building-card-header-left">
                        <div class="building-province-icon" style="color: ${provinceStyle.color};">${provinceStyle.icon}</div>
                        <div class="building-district" title="${fullLocation}">${fullLocation}</div>
                    </div>
                    ${protectionBadge}
                </div>
                <div class="building-content">
                    <h3 class="building-title">${building.name}</h3>
                    ${matchReasonsHtml}
                    <div class="building-meta">
                        <span class="building-era">${building.era}</span>
                        <span class="building-type">${building.type.length > 12 ? building.type.substring(0, 12) + '...' : building.type}</span>
                    </div>
                    <p class="building-desc">${shortDesc}</p>
                    <div class="building-tags">
                        ${building.tags.slice(0, 3).map((tag, idx) => {
                            const tagStyle = this.getTagStyle(tag, idx);
                            return `<span class="building-tag" style="background: ${tagStyle.bg}; color: ${tagStyle.color};">${tagStyle.icon} ${tag}</span>`;
                        }).join('')}
                    </div>
                </div>
            </div>
        `;
    },

    // 创建建筑卡片 - 支持三种大小: small(首页/标签/跨省), medium(省份页), large(区县页)
    createBuildingCard(building, size = 'medium') {
        const hashUrl = this.generateBuildingHash(building);
        const provinceStyle = this.getProvinceStyle(building.provinceId);

        // 生成保护级别标识
        let protectionBadge = '';
        if (building.worldHeritage) {
            protectionBadge = `<span class="protection-badge heritage">🌍 世界遗产${building.worldHeritageYear ? '·' + building.worldHeritageYear : ''}</span>`;
        } else if (building.protectionLevel === '全国重点文物保护单位') {
            protectionBadge = `<span class="protection-badge national">🏛️ ${building.protectionBatch || '全国重点'}</span>`;
        }

        // 根据大小调整描述文字长度
        let descLength = 60;
        let tagCount = 4;
        if (size === 'small') {
            descLength = 40;
            tagCount = 2;
        } else if (size === 'large') {
            descLength = 80;
            tagCount = 6;
        }
        const shortDesc = building.description ? building.description.substring(0, descLength) + (building.description.length > descLength ? '...' : '') : '';

        // 获取重要标签（优先显示特色标签）
        const priorityTags = ['世界遗产', '古建筑', '近代建筑', '寺庙', '宫殿', '园林', '陵墓', '石窟', '塔', '桥梁', '革命遗址', '名人故居'];
        const sortedTags = [...building.tags].sort((a, b) => {
            const aPriority = priorityTags.indexOf(a);
            const bPriority = priorityTags.indexOf(b);
            if (aPriority !== -1 && bPriority === -1) return -1;
            if (aPriority === -1 && bPriority !== -1) return 1;
            return 0;
        });

        // 显示完整的地区信息：省份+区县
        const fullLocation = `${building.province}${building.districtName}`;

        return `
            <div class="building-card building-card-${size}" data-hash="${hashUrl}" style="border-left-color: ${provinceStyle.color};">
                <div class="building-card-header" style="background: ${provinceStyle.bgColor};">
                    <div class="building-card-header-left">
                        <div class="building-province-icon" style="color: ${provinceStyle.color};">${provinceStyle.icon}</div>
                        <div class="building-district" title="${fullLocation}">${fullLocation}</div>
                    </div>
                    ${protectionBadge}
                </div>
                <div class="building-content">
                    <h3 class="building-title">${building.name}</h3>
                    <div class="building-meta">
                        <span class="building-era" title="年代">${building.era}</span>
                        <span class="building-type" title="类型">${building.type.length > 12 ? building.type.substring(0, 12) + '...' : building.type}</span>
                    </div>
                    <p class="building-desc">${shortDesc}</p>
                    <div class="building-tags">
                        ${sortedTags.slice(0, tagCount).map((tag, idx) => {
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
        const crossStyle = this.getProvinceStyle('cross');

        container.innerHTML = `
            <div class="container">
                <div class="province-header" style="background: linear-gradient(135deg, ${crossStyle.bgColor} 0%, var(--bg-card) 100%); border: 1px solid ${crossStyle.color}25;">
                    <div class="province-header-icon" style="background: ${crossStyle.color};">${crossStyle.icon}</div>
                    <div class="province-header-info">
                        <h2 class="section-title" style="margin: 0;">跨省文物保护单位</h2>
                        <p style="color: var(--text-secondary); margin: 0.5rem 0 0 0;">
                            共有 <strong style="color: ${crossStyle.color};">${crossBuildings.length}</strong> 处横跨多个省份的重大文物保护单位
                        </p>
                    </div>
                </div>

                <div class="building-grid building-grid-large">
                    ${crossBuildings.map(building => this.createBuildingCard(building, 'large')).join('')}
                </div>
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
console.log('Script loaded, readyState:', document.readyState);
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        console.log('DOMContentLoaded fired');
        App.init();
    });
} else {
    console.log('DOM already loaded, initializing immediately');
    App.init();
}
