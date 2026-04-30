// 黑神话：悟空 - 跟着游戏游中国古建
const RouteBlackMythWukong = {
    id: 'black-myth-wukong',
    title: '黑神话：悟空',
    subtitle: '跟着游戏游中国古建',
    icon: '🐵',
    color: '#C41E3A',
    bgColor: '#FFF5F5',
    description: '追随《黑神话：悟空》的游戏足迹，探访那些成为游戏场景原型的千年古建，感受虚拟与现实的交融。',

    route: {
        title: '黑神话：悟空：游戏与现实的古建之旅',
        intro: `"踏平坎坷成大道，斗罢艰险又出发。"《黑神话：悟空》是中国首款3A级单机动作角色扮演游戏，以《西游记》为蓝本，将中国传统古建筑通过数字扫描技术完美还原到游戏世界中。

游戏开发团队历时数年，走遍中国大江南北，对数十处古建筑进行实景扫描，将千年古建的精髓融入游戏场景。从山西的唐风古韵到重庆的石刻艺术，从福建的闽南风情到浙江的山野禅意，每一处场景都承载着中华文明的厚重与精美。

让我们跟随天命人的脚步，走进这些游戏场景的原型地，探访那些在游戏中重获新生的千年古建，感受虚拟与现实的奇妙交融。`,
        stops: [
            {
                title: '第一站：山西——唐风古韵的圣地',
                icon: '🏛️',
                content: `山西是《黑神话：悟空》最主要的取景地，游戏中有大量场景取材于山西的古建筑。这里保存着中国最多的唐代木构建筑，是古建爱好者的朝圣之地。

【应县木塔】位于朔州市应县，是世界上现存最古老、最高大的纯木结构楼阁式建筑，高67.31米。游戏中的佛塔场景大量参考了应县木塔的结构与细节，那层层叠叠的斗拱、精美绝伦的佛像，都在游戏中得到了完美还原。

【佛光寺】位于忻州市五台县，是中国现存最早的木构建筑之一，被梁思成称为"中国第一国宝"。游戏中的寺庙建筑大量借鉴了佛光寺的唐代建筑风格，那雄浑大气的斗拱、简洁有力的梁架，都体现了盛唐建筑的气魄。

【南禅寺】位于忻州市五台县，是中国现存最古老的木构建筑，建于唐建中三年（782年）。游戏中的小型佛殿场景参考了南禅寺大殿的结构，那古朴典雅的形制、精美细腻的彩塑，都在游戏中有所体现。

【晋祠】位于太原市晋源区，是中国现存最早的皇家祭祀园林。游戏中的水景建筑参考了晋祠的难老泉、鱼沼飞梁等景观，那流水潺潺、古木参天的意境，在游戏中得到了诗意再现。

【双林寺】位于晋中市平遥县，以彩塑艺术闻名于世，被誉为"东方彩塑艺术宝库"。游戏中的佛像、罗汉像大量参考了双林寺的彩塑造型，那栩栩如生、神态各异的形象，都在游戏中得到了数字重生。

【镇国寺】位于晋中市平遥县，其万佛殿是中国现存最早的木构建筑之一。游戏中的佛殿内部场景参考了镇国寺的结构布局，那庄严肃穆的佛像、精美绝伦的壁画，都在游戏中有所体现。`,
                buildings: [
                    { name: '佛宫寺释迦塔', province: 'shanxi', district: 'shanxi_shuozhou', embedded: null },
                    { name: '佛光寺', province: 'shanxi', district: 'shanxi_xinzhou', embedded: null },
                    { name: '南禅寺大殿', province: 'shanxi', district: 'shanxi_xinzhou', embedded: null },
                    { name: '晋祠', province: 'shanxi', district: 'shanxi_taiyuan', embedded: null },
                    { name: '双林寺', province: 'shanxi', district: 'shanxi_jinzhong', embedded: null },
                    { name: '镇国寺', province: 'shanxi', district: 'shanxi_jinzhong', embedded: null }
                ]
            },
            {
                title: '第二站：重庆——石刻艺术的殿堂',
                icon: '🗿',
                content: `重庆大足石刻是世界文化遗产，也是《黑神话：悟空》中石刻场景的重要原型。游戏中那些精美的佛像、生动的故事场景，都取材于大足石刻的艺术瑰宝。

【宝顶山摩崖造像】位于重庆市大足区，是由一代名僧赵智凤主持开凿的大型佛教密宗道场。游戏中的大型石刻场景大量参考了宝顶山的造像，那规模宏大、内容丰富的石刻群，那生动传神、精美绝伦的佛像，都在游戏中得到了数字化再现。

【北山摩崖造像】位于重庆市大足区，以雕刻细腻、精美典雅著称。游戏中的观音像、菩萨像大量参考了北山石刻的造型，那姿态优美、表情丰富的形象，都在游戏中有所体现。

【大足石刻】作为世界石窟艺术的集大成之作，其造像内容包罗万象，从佛教故事到民间传说，从诸佛菩萨到世俗人物，无所不包。游戏中的场景设计、人物造型、故事叙述，都深受大足石刻艺术的影响。`,
                buildings: [
                    { name: '宝顶山摩崖造像', province: 'chongqing', district: 'chongqing_dazu', embedded: null },
                    { name: '北山摩崖造像', province: 'chongqing', district: 'chongqing_dazu', embedded: null }
                ]
            },
            {
                title: '第三站：福建——海上佛国的遗韵',
                icon: '⚓',
                content: `福建泉州是海上丝绸之路的起点，也是《黑神话：悟空》中部分场景的原型地。游戏中那些融合了中西风格的建筑、那充满异域风情的场景，都取材于泉州的古建筑。

【开元寺】位于泉州市鲤城区，是福建省规模最大的佛教寺院，其东西塔是中国现存最高的一对宋代石塔。游戏中的佛塔、经幢等建筑元素大量参考了开元寺的东西塔，那五层八角的楼阁式石塔、那精美绝伦的浮雕造像，都在游戏中有所体现。

【清净寺】位于泉州市鲤城区，是中国现存最古老的伊斯兰教寺院。游戏中那些融合了异域风格的建筑场景，参考了清净寺的阿拉伯建筑风格，那独特的拱门、那精美的石雕，都在游戏中得到了艺术再现。

【泉州古建筑群】作为"泉州：宋元中国的世界海洋商贸中心"世界文化遗产的核心组成部分，其多元文化交融的特色在游戏中得到了充分体现。`,
                buildings: [
                    { name: '开元寺', province: 'fujian', district: 'fujian_quanzhou', embedded: null },
                    { name: '清净寺', province: 'fujian', district: 'fujian_quanzhou', embedded: null }
                ]
            },
            {
                title: '第四站：浙江——山野禅意的意境',
                icon: '🏔️',
                content: `浙江的山水之间，隐藏着许多古朴典雅的古建筑，《黑神话：悟空》中部分场景取材于浙江的山野禅寺，那清幽淡远的意境、那古朴自然的风格，都在游戏中得到了诗意呈现。

【时思寺】位于丽水市景宁畲族自治县，为宋代木构混合元代风格，内有明代钟楼及古树。游戏中的山野寺庙场景大量参考了时思寺的建筑风格，那古朴典雅的木构建筑、那清幽宁静的山林环境，都在游戏中得到了完美还原。

【杭州古建筑群】作为南宋都城，杭州保存着大量宋代建筑风格的古迹。游戏中的部分建筑元素、园林设计，都参考了杭州的古建筑风格，那精致典雅的宋式美学，在游戏中得到了充分体现。`,
                buildings: [
                    { name: '时思寺', province: 'zhejiang', district: 'zhejiang_lishui', embedded: null }
                ]
            },
            {
                title: '第五站：陕西——大唐盛世的回响',
                icon: '🏯',
                content: `陕西西安是唐朝都城长安所在地，也是《西游记》故事中唐僧取经的出发地。《黑神话：悟空》中部分场景取材于西安的古建筑，那雄浑大气的唐代建筑风格，在游戏中得到了充分体现。

【西安城墙】是中国现存规模最大、保存最完整的古代城垣。游戏中的城墙、城门等场景参考了西安城墙的形制，那高大雄伟的城墙、那气势恢宏的城楼，都在游戏中有所体现。

【大雁塔】位于西安市雁塔区，是唐代玄奘法师为保存从印度带回的佛经而主持修建的佛塔。游戏中的佛塔建筑大量参考了大雁塔的造型，那七层四方的楼阁式砖塔、那简洁有力的线条，都在游戏中得到了艺术再现。

【小雁塔】位于西安市碑林区，是唐代另一座著名佛塔。游戏中的小型佛塔场景参考了小雁塔的造型，那秀丽挺拔的身姿、那古朴典雅的风格，都在游戏中有所体现。`,
                buildings: [
                    { name: '西安城墙', province: 'shaanxi', district: 'shaanxi_xian', embedded: null },
                    { name: '大雁塔', province: 'shaanxi', district: 'shaanxi_xian', embedded: null }
                ]
            },
            {
                title: '第六站：河北——古塔名刹的荟萃',
                icon: '🏺',
                content: `河北保存着众多历史悠久的古塔名刹，《黑神话：悟空》中部分塔类建筑场景取材于河北的古塔，那千姿百态的塔式、那精美绝伦的雕刻，都在游戏中得到了数字化呈现。

【开元寺须弥塔】位于石家庄市正定县，是唐代砖塔的代表作。游戏中的须弥座式塔基、那简洁有力的塔身，都参考了开元寺须弥塔的造型。

【定县开元寺塔】位于保定市定州市，是中国现存最高的砖木结构古塔，高83.7米。游戏中的高耸入云的佛塔场景参考了定县开元寺塔的气势，那挺拔秀丽的身姿、那精美细腻的雕刻，都在游戏中有所体现。`,
                buildings: [
                    { name: '开元寺（含开元寺须弥塔、开元寺钟楼）', province: 'hebei', district: 'hebei_shijiazhuang', embedded: null },
                    { name: '定县开元寺塔', province: 'hebei', district: 'hebei_baoding', embedded: null }
                ]
            }
        ],
        allBuildings: [
            { name: '佛宫寺释迦塔', province: 'shanxi', district: 'shanxi_shuozhou', stop: 1 },
            { name: '佛光寺', province: 'shanxi', district: 'shanxi_xinzhou', stop: 1 },
            { name: '南禅寺大殿', province: 'shanxi', district: 'shanxi_xinzhou', stop: 1 },
            { name: '晋祠', province: 'shanxi', district: 'shanxi_taiyuan', stop: 1 },
            { name: '双林寺', province: 'shanxi', district: 'shanxi_jinzhong', stop: 1 },
            { name: '镇国寺', province: 'shanxi', district: 'shanxi_jinzhong', stop: 1 },
            { name: '宝顶山摩崖造像', province: 'chongqing', district: 'chongqing_dazu', stop: 2 },
            { name: '北山摩崖造像', province: 'chongqing', district: 'chongqing_dazu', stop: 2 },
            { name: '开元寺', province: 'fujian', district: 'fujian_quanzhou', stop: 3 },
            { name: '清净寺', province: 'fujian', district: 'fujian_quanzhou', stop: 3 },
            { name: '时思寺', province: 'zhejiang', district: 'zhejiang_lishui', stop: 4 },
            { name: '西安城墙', province: 'shaanxi', district: 'shaanxi_xian', stop: 5 },
            { name: '大雁塔', province: 'shaanxi', district: 'shaanxi_xian', stop: 5 },
            { name: '开元寺（含开元寺须弥塔、开元寺钟楼）', province: 'hebei', district: 'hebei_shijiazhuang', stop: 6 },
            { name: '定县开元寺塔', province: 'hebei', district: 'hebei_baoding', stop: 6 }
        ]
    },

    embeddedBuildings: {},

    getRoute() {
        return this.route;
    },

    getMeta() {
        return {
            id: this.id,
            title: this.title,
            subtitle: this.subtitle,
            icon: this.icon,
            color: this.color,
            bgColor: this.bgColor,
            description: this.description
        };
    },

    getAllBuildings() {
        return this.route.allBuildings;
    },

    getBuildingByName(name) {
        return null;
    }
};

window.RouteBlackMythWukong = RouteBlackMythWukong;
