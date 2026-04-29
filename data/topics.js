// 专题数据 - 跟着名著游古建
const TopicsData = {
    // 所有专题列表
    getAllTopics() {
        return [
            {
                id: 'journey-to-the-west',
                title: '西游取经路',
                subtitle: '跟着《西游记》游中国古建',
                icon: '🐵',
                color: '#e67e22',
                bgColor: '#fef3e2',
                description: '从长安出发，沿着玄奘法师西行取经的路线，探访那些与《西游记》有着千丝万缕联系的历史古建。',
                coverImage: null,
                story: this.getJourneyToWestStory()
            },
            {
                id: 'water-margin',
                title: '水浒英雄志',
                subtitle: '跟着《水浒传》游中国古建',
                icon: '🗡️',
                color: '#c0392b',
                bgColor: '#fdedec',
                description: '从梁山泊到东京汴梁，追随一百单八将的足迹，探访那些见证英雄传奇的历史古建。',
                coverImage: null,
                story: this.getWaterMarginStory()
            },
            {
                id: 'romance-of-three-kingdoms',
                title: '三国风云录',
                subtitle: '跟着《三国演义》游中国古建',
                icon: '⚔️',
                color: '#2980b9',
                bgColor: '#eaf2f8',
                description: '从桃园结义到三国归晋，追随魏蜀吴的英雄足迹，探访那些见证乱世风云的历史古建。',
                coverImage: null,
                story: this.getThreeKingdomsStory()
            },
            {
                id: 'dream-of-red-chamber',
                title: '红楼一梦',
                subtitle: '跟着《红楼梦》游中国古建',
                icon: '🌸',
                color: '#e91e63',
                bgColor: '#fce4ec',
                description: '从金陵到京都，走进大观园的世界，探访那些承载宝黛情缘的历史古建。',
                coverImage: null,
                story: this.getDreamOfRedChamberStory()
            },
            {
                id: 'legend-of-white-snake',
                title: '白蛇传奇',
                subtitle: '跟着《白蛇传》游中国古建',
                icon: '🐍',
                color: '#27ae60',
                bgColor: '#eafaf1',
                description: '从西湖断桥到雷峰塔下，追随白素贞与许仙的爱情足迹，探访那些见证千年情缘的历史古建。',
                coverImage: null,
                story: this.getWhiteSnakeStory()
            },
            {
                id: 'west-chamber',
                title: '西厢情缘',
                subtitle: '跟着《西厢记》游中国古建',
                icon: '💕',
                color: '#9b59b6',
                bgColor: '#f5eef8',
                description: '从普救寺到长亭送别，追随张生与崔莺莺的爱情足迹，探访那些见证才子佳人的历史古建。',
                coverImage: null,
                story: this.getWestChamberStory()
            },
            {
                id: 'liao-zhai',
                title: '聊斋志异',
                subtitle: '跟着《聊斋志异》游中国古建',
                icon: '🦊',
                color: '#34495e',
                bgColor: '#f2f4f6',
                description: '从柳泉居士的茅屋到狐仙鬼怪的居所，探访那些承载蒲松龄奇思妙想的历史古建。',
                coverImage: null,
                story: this.getLiaoZhaiStory()
            }
        ];
    },

    // 根据ID获取专题
    getTopicById(id) {
        return this.getAllTopics().find(t => t.id === id);
    },

    // 西游记专题故事
    getJourneyToWestStory() {
        return {
            title: '西游取经路：从长安到天竺的古建传奇',
            intro: `话说大唐贞观年间，长安城内有一位年轻的僧人玄奘，心怀普度众生之大愿，立志西行求取真经。他从繁华的长安城出发，一路向西，历经九九八十一难，终于抵达天竺，带回了珍贵的佛经。

一千多年后，当我们翻开《西游记》这部不朽名著，那些神魔故事的背后，其实藏着一条真实的古建之旅。从长安的大雁塔到洛阳的白马寺，从敦煌的莫高窟到天水的麦积山，每一处古建都仿佛在诉说着那段传奇的取经之路。

现在，就让我们跟随玄奘法师的足迹，开启一场穿越时空的古建之旅。`,
            chapters: [
                {
                    title: '第一章：长安佛国——大雁塔下的誓言',
                    icon: '🏯',
                    content: `贞观三年（629年），长安城朱雀大街上，一位面容清瘦的僧人正站在大慈恩寺内。他就是玄奘法师。

大慈恩寺是唐高宗李治为纪念母亲文德皇后而建，寺中的【大雁塔】更是玄奘法师亲自主持修建的。这座高64米的方形砖塔，最初是为了保存玄奘从天竺带回的经卷、佛像和舍利而建。塔内至今仍保存着玄奘翻译的佛经，以及他亲笔撰写的《大唐西域记》。

在大雁塔附近，还有一座【小雁塔】。它虽不如大雁塔高大，却别有一番清幽之韵。小雁塔建于唐景龙年间（707-710年），是为了存放唐代高僧义净从天竺带回的佛经而建。义净是玄奘之后另一位西行取经的高僧，他的经历与玄奘如出一辙。

长安城内还有【香积寺善导塔】，这是唐代佛教净土宗祖庭香积寺内的高僧墓塔。净土宗宣扬往生西方极乐世界，这种思想深深影响了《西游记》中关于"西天"的描写。

【长安华严寺塔】也是唐代的重要佛塔，华严宗是唐代重要的佛教宗派之一，其"一即一切，一切即一"的思想，与《西游记》中孙悟空七十二变、一个筋斗十万八千里的神通有着微妙的联系。

此外，【长安圣寿寺塔】、【昭慧塔】、【八云塔】等唐代古塔，共同构成了长安城的佛塔群，见证了唐代佛教的繁荣。玄奘法师就是在这样的佛教氛围中长大，立下了西行取经的宏愿。

站在大雁塔下，仿佛能听到一千多年前玄奘法师诵经的声音。那时的他，或许就是在这里立下了西行取经的誓言。`,
                    buildings: [
                        { name: '大雁塔', province: 'shaanxi', district: 'yanta' },
                        { name: '小雁塔', province: 'shaanxi', district: 'beilin' },
                        { name: '香积寺善导塔', province: 'shaanxi', district: 'chang-an' },
                        { name: '长安华严寺塔', province: 'shaanxi', district: 'chang-an' },
                        { name: '长安圣寿寺塔', province: 'shaanxi', district: 'chang-an' },
                        { name: '昭慧塔', province: 'shaanxi', district: 'lintong' },
                        { name: '八云塔', province: 'shaanxi', district: 'zhouzhi' }
                    ]
                },
                {
                    title: '第二章：译经圣地——从草堂寺到大慈恩寺',
                    icon: '📖',
                    content: `在玄奘法师之前，长安已经是中国佛教的译经中心。后秦时期，西域高僧鸠摩罗什在【草堂寺】翻译了大量佛经，被誉为"译经泰斗"。

【鸠摩罗什舍利塔】就保存在草堂寺内，这座八角亭阁式的玉塔，是中国佛教史上著名译师的纪念遗存。鸠摩罗什翻译的《金刚经》《法华经》等经典，后来都成为《西游记》中经常引用的佛经。

玄奘法师回国后，继承并发扬了鸠摩罗什的译经事业。他在大慈恩寺翻译佛经19年，共译出佛经75部、1335卷。他的《大唐西域记》更是记录了当时中亚、南亚138个国家的地理、历史、宗教、文化，成为研究古代中亚和南亚历史的珍贵文献。

在译经的过程中，玄奘法师还培养了大批弟子，其中窥基、圆测最为著名。他们去世后，与师父一起葬在【兴教寺塔】。三座塔呈品字形排列，主塔为玄奘舍利塔，高21米，五层方形楼阁式砖塔。塔身简洁庄重，没有任何装饰，正如玄奘法师一生清贫、专注译经的精神。

【净光寺塔】也是唐代的重要佛塔，位于长安城内，见证了唐代佛教的繁荣。玄奘法师在译经之余，或许也曾在此讲经说法。

此外，【仙游寺法王塔】是隋代仁寿元年（601年）奉敕建造的舍利塔，隋文帝诏令全国建塔供奉舍利，法王塔为其中之一。这座塔见证了佛教从隋代到唐代的传承，也为玄奘法师的取经之路奠定了信仰基础。`,
                    buildings: [
                        { name: '兴教寺塔', province: 'shaanxi', district: 'chang-an' },
                        { name: '鸠摩罗什舍利塔', province: 'shaanxi', district: 'huyi' },
                        { name: '净光寺塔', province: 'shaanxi', district: 'mei-xian' },
                        { name: '仙游寺法王塔', province: 'shaanxi', district: 'zhouzhi' }
                    ]
                },
                {
                    title: '第三章：法门惊世——佛指舍利与大唐珍宝',
                    icon: '✨',
                    content: `西行途中，玄奘法师必经宝鸡扶风县的【法门寺】。这座始建于东汉的皇家寺院，是唐代供奉佛骨舍利的圣地。

法门寺地宫中供奉着释迦牟尼佛的指骨舍利，唐代共有八位皇帝六迎二送供养佛指舍利。玄奘法师西行时，或许也曾在此礼拜，祈求佛祖保佑一路平安。

1987年，法门寺地宫被意外发现，出土了佛指舍利及大量唐代珍宝，包括金银器、琉璃器、丝绸等，震惊了世界。这些文物不仅展示了唐代的繁荣，更见证了佛教在中国的传播历程。

法门寺塔在明代倒塌后重建，1988年按照明代十三层八角形楼阁式砖塔样式修复。如今的法门寺，已成为世界佛教徒心中的圣地。

在法门寺附近，还有【大佛寺石窟】，这是陕西地区重要的佛教石窟之一，开凿于南北朝时期，延续至唐代。石窟内的佛像造型优美，体现了从北朝向唐代过渡的艺术风格。

【慈善寺石窟】也是宝鸡地区的重要石窟，开凿于隋唐时期，现存多个洞窟和造像。这些石窟与法门寺一起，构成了关中地区的佛教艺术宝库。

【太平寺塔】位于岐山县，是宋代建筑，但其所在的太平寺历史悠久，与唐代佛教有着密切的联系。玄奘法师西行时，或许也曾在此歇脚。`,
                    buildings: [
                        { name: '法门寺遗址', province: 'shaanxi', district: 'fufeng' },
                        { name: '大佛寺石窟', province: 'shaanxi', district: 'bin-xian' },
                        { name: '慈善寺石窟', province: 'shaanxi', district: 'lin-you' },
                        { name: '太平寺塔', province: 'shaanxi', district: 'qishan' }
                    ]
                },
                {
                    title: '第四章：洛阳佛光——白马寺与龙门石窟',
                    icon: '🐴',
                    content: `话说玄奘法师西行之前，佛教早已传入中国。东汉永平十年（67年），两位印度高僧迦叶摩腾和竺法兰骑着白马，驮着佛经来到洛阳。汉明帝为纪念白马驮经之功，修建了【白马寺】。

白马寺是中国佛教传入后兴建的第一座官办寺院，被誉为"中国第一古刹"。寺内的齐云塔、清凉台、大雄宝殿等建筑，见证了近两千年的佛教传播史。

《西游记》中，唐僧取经归来，唐太宗在白马寺迎接。虽然这是小说情节，但白马寺确实与取经故事有着深厚的渊源。玄奘法师回国后，也曾在洛阳讲学，传播佛法。

从白马寺向南，来到伊河两岸的【龙门石窟】。这是中国四大石窟中规模最大的石窟群，开凿于北魏孝文帝迁都洛阳之后，历经东魏、西魏、北齐、隋、唐、五代、宋等朝代，历时400余年。

龙门石窟现存窟龛2345个，造像10万余尊，碑刻题记2800余品。其中最著名的卢舍那大佛，高17.14米，是武则天出资赞助修建的。大佛面容丰腴，嘴角微翘，神秘的微笑被誉为"东方蒙娜丽莎"。

在龙门石窟附近，还有【巩县石窟】，这是北魏时期开凿的石窟，虽然规模不如龙门石窟，但其造像精美，是研究北魏佛教艺术的重要资料。

【少林寺】位于登封市，建于北魏太和十九年（495年），是印度高僧跋陀尊者创建，后由菩提达摩祖师在此面壁九年，创立中国禅宗。虽然少林寺与玄奘法师没有直接关系，但《西游记》中的许多佛教元素都源自禅宗文化。

【嵩岳寺塔】是中国现存最古老的砖塔，建于北魏正光年间（520-525年），高45米，十二边形密檐式砖塔。这座塔见证了佛教从北魏到唐代的传承，也为玄奘法师的取经之路提供了信仰支持。`,
                    buildings: [
                        { name: '白马寺', province: 'henan', district: 'luolong' },
                        { name: '龙门石窟', province: 'henan', district: 'luolong' },
                        { name: '巩县石窟', province: 'henan', district: 'gongyi' },
                        { name: '少林寺', province: 'henan', district: 'dengfeng' },
                        { name: '嵩岳寺塔', province: 'henan', district: 'dengfeng' }
                    ]
                },
                {
                    title: '第五章：中原塔林——从郑州到开封的佛国',
                    icon: '🗼',
                    content: `从中原腹地继续向东，河南大地上遍布着古塔与佛寺，它们如同一颗颗佛珠，串联起中原的佛教历史。

【千尺塔】位于郑州市，是宋代建筑，高30余米，八角形楼阁式砖塔。塔身挺拔秀丽，是宋代佛塔的代表作。玄奘法师西行时，或许也曾在此经过，仰望这座高耸入云的佛塔。

【寿圣寺双塔】位于中牟县，两座塔东西对峙，高约30米，是宋代建筑。双塔的形式在佛教中有着特殊的意义，象征着佛法的双重传承。

【凤台寺塔】位于新郑市，是宋代建筑，高20余米。这座塔虽然不大，但造型优美，是宋代小型佛塔的典型代表。

【祐国寺塔】位于开封市，又称"铁塔"，建于北宋皇祐元年（1049年），高55米，八角十三层楼阁式琉璃砖塔。这座塔虽然建于玄奘法师之后，但它代表了宋代佛教建筑的最高水平。

【相国寺】位于开封市中心，是中国十大名寺之一，始建于北齐天保六年（555年），唐代时达到鼎盛。相国寺在《西游记》中也有提及，是唐僧取经归来后讲经的地方。

【开封东大寺】是开封地区重要的伊斯兰教建筑，虽然与佛教无关，但它体现了丝绸之路带来的多元文化交流。玄奘法师西行时，也曾遇到各种不同的宗教和文化。`,
                    buildings: [
                        { name: '千尺塔', province: 'henan', district: 'xingyang' },
                        { name: '寿圣寺双塔', province: 'henan', district: 'zhongmu' },
                        { name: '凤台寺塔', province: 'henan', district: 'xinzheng' },
                        { name: '祐国寺塔', province: 'henan', district: 'gulou' },
                        { name: '相国寺', province: 'henan', district: 'gulou' }
                    ]
                },
                {
                    title: '第六章：晋北佛国——云冈石窟与悬空寺',
                    icon: '🏔️',
                    content: `离开中原，向北而行，来到山西大同。这里是北魏时期的都城平城，也是佛教艺术的重要中心。

【云冈石窟】开凿于北魏文成帝时期（460年），由高僧昙曜主持，历时60余年完成。现存主要洞窟45个，大小造像5.9万余尊，最高的一尊大佛高17米。

云冈石窟的造像风格融合了印度犍陀罗艺术和中国传统艺术，是佛教东传的重要见证。《西游记》中的许多佛教形象，都可以在这里找到原型。那些面带微笑的佛像、飞天、力士，仿佛就是从经卷中走出的神佛。

昙曜五窟是云冈石窟的精华，五尊巨大的佛像分别象征北魏的五位皇帝。这种将皇权与佛法结合的做法，也反映了当时佛教在中国的传播方式。

在云冈石窟附近，还有【华严寺】和【善化寺】。华严寺建于辽代，是中国现存最大的辽金佛教寺院之一。寺内的薄伽教藏殿保存了辽代的彩塑和壁画，是辽代佛教艺术的杰作。

善化寺始建于唐代，现存建筑为辽金时期所建。寺内的三圣殿、大雄宝殿等建筑，体现了辽金时期佛教建筑的特点。

【悬空寺】位于恒山金龙峡西侧翠屏峰的半崖峭壁上，距地面高约50米。这座建于北魏太和十五年（491年）的寺院，是中国现存唯一一座佛、道、儒三教合一的寺院。

《西游记》中，唐僧师徒历经千难万险，穿越崇山峻岭。悬空寺这样的建筑，正是古人征服自然的杰作。站在寺中俯瞰峡谷，云雾缭绕，仿佛置身仙境。

【永安寺】位于浑源县，始建于金代，现存建筑为元代所建。寺内的壁画精美，是元代佛教艺术的重要遗存。`,
                    buildings: [
                        { name: '云冈石窟', province: 'shanxi', district: 'pingcheng' },
                        { name: '华严寺', province: 'shanxi', district: 'pingcheng' },
                        { name: '善化寺', province: 'shanxi', district: 'pingcheng' },
                        { name: '悬空寺', province: 'shanxi', district: 'hun-yuan' },
                        { name: '永安寺', province: 'shanxi', district: 'hun-yuan' }
                    ]
                },
                {
                    title: '第七章：晋中古建——从太原到平遥的佛寺',
                    icon: '🏛️',
                    content: `向南进入晋中地区，太原盆地周围分布着众多古塔与佛寺，它们见证了佛教从北朝向唐宋的演变。

【龙山石窟】位于太原市，是中国现存规模最大的道教石窟，但其中的佛教元素也不容忽视。石窟开凿于隋唐时期，体现了佛道交融的特点。

【天龙山石窟】位于太原市西南，开凿于东魏时期，延续至唐代。石窟内的造像造型优美，是北齐、唐代佛教艺术的杰作。遗憾的是，20世纪初大量造像被盗，流散海外。

【永祚寺】位于太原市，始建于明代，寺内的双塔是太原的标志性建筑。双塔高50余米，八角十三层楼阁式砖塔，是明代佛塔的代表作。

【崇善寺大悲殿】位于太原市中心，是明代建筑，殿内供奉着千手千眼观音菩萨像。观音菩萨在《西游记》中多次出现，是唐僧师徒的保护神。

【晋源阿育王塔】位于太原市晋源区，是明代建筑，高30余米。阿育王是古印度孔雀王朝的国王，他大力弘扬佛教，建造了八万四千座佛塔。这座塔就是为了纪念阿育王而建。

【蒙山开化寺遗址】位于太原市晋源区，是北齐时期开凿的大型佛教石窟。寺内的蒙山大佛高63米，是中国现存最早的摩崖石刻大佛，比乐山大佛还要早162年。`,
                    buildings: [
                        { name: '龙山石窟', province: 'shanxi', district: 'jinyuan' },
                        { name: '天龙山石窟', province: 'shanxi', district: 'jinyuan' },
                        { name: '永祚寺', province: 'shanxi', district: 'yingze' },
                        { name: '崇善寺大悲殿', province: 'shanxi', district: 'yingze' },
                        { name: '晋源阿育王塔', province: 'shanxi', district: 'jinyuan' },
                        { name: '蒙山开化寺遗址', province: 'shanxi', district: 'jinyuan' }
                    ]
                },
                {
                    title: '第八章：陇右石窟——从麦积山到莫高窟',
                    icon: '🌫️',
                    content: `向西进入甘肃，这里是丝绸之路的咽喉要道，也是佛教艺术的重要中心。

【麦积山石窟】位于天水市，始建于十六国后秦时期（384年），因山形酷似农家麦垛而得名。现存窟龛221个，造像3938件，壁画1000余平方米。与其他石窟不同，麦积山石窟以泥塑艺术闻名，被誉为"东方雕塑馆"。

麦积山石窟的造像多为世俗化的佛像，面容清秀，表情生动，仿佛就是当时普通人的写照。《西游记》中，唐僧师徒遇到的众多菩萨、罗汉，或许就是以这些造像为原型。

【水帘洞—大像山石窟】位于武山县，是北魏时期开凿的石窟，现存多个洞窟和造像。石窟内的佛像造型优美，体现了北魏佛教艺术的特点。

【木梯寺石窟】位于武山县，是北魏至唐代的石窟，现存多个洞窟和造像。石窟因山形似木梯而得名，是甘肃地区重要的佛教石窟之一。

【兴国寺】位于秦安县，始建于唐代，现存建筑为清代所建。寺内的般若殿是元代建筑，是中国现存最早的木结构建筑之一。

【天梯山石窟】位于武威市，始建于北凉时期（412年），是中国早期石窟艺术的代表。石窟内的大佛高28米，是河西走廊最大的摩崖石刻大佛。

【大佛寺】位于张掖市，始建于西夏时期，寺内的卧佛长35米，是中国最大的室内卧佛。这座寺院见证了佛教从西夏到元明的传承。

【马蹄寺石窟群】位于张掖市，始建于北凉时期，现存多个洞窟和造像。石窟因传说中的天马在此饮水留下蹄印而得名。

【文殊山石窟】位于肃南裕固族自治县，始建于北凉时期，现存多个洞窟和造像。石窟内的壁画精美，是河西走廊佛教艺术的重要组成部分。`,
                    buildings: [
                        { name: '麦积山石窟（含仙人崖石窟、鲁恭姬造像碑）', province: 'gansu', district: 'maiji' },
                        { name: '水帘洞—大像山石窟', province: 'gansu', district: 'wushan' },
                        { name: '木梯寺石窟', province: 'gansu', district: 'wushan' },
                        { name: '兴国寺', province: 'gansu', district: 'qinan' },
                        { name: '天梯山石窟', province: 'gansu', district: 'liangzhou' },
                        { name: '张掖大佛寺', province: 'gansu', district: 'ganzhou' },
                        { name: '马蹄寺石窟群', province: 'gansu', district: 'sunan' },
                        { name: '文殊山石窟（含文殊山后山千佛洞、古佛洞）', province: 'gansu', district: 'sunan' }
                    ]
                },
                {
                    title: '第九章：敦煌飞天——沙漠中的艺术宝库',
                    icon: '🎨',
                    content: `继续向西，穿过河西走廊，来到大漠深处的敦煌。这里是【莫高窟】，世界上现存规模最大、内容最丰富的佛教艺术圣地。

莫高窟始建于前秦时期（366年），由乐僔和尚开凿。历经十六国、北朝、隋、唐、五代、西夏、元等朝代，形成了735个洞窟、4.5万平方米壁画、2415尊彩塑的宏大规模。

莫高窟的壁画内容丰富，有佛经故事、经变画、供养人像、飞天、乐舞等。那些飘逸的飞天，手持乐器，衣带当风，仿佛就是《西游记》中描述的西方极乐世界。

玄奘法师西行时，确实经过敦煌。他在《大唐西域记》中详细记录了沿途的见闻。莫高窟中的许多壁画，描绘的正是玄奘取经的故事。第103窟的《法华经变》中，甚至有类似孙悟空形象的神猴。

【榆林窟】位于瓜州县，是莫高窟的姊妹窟，现存43个洞窟。窟内的壁画和彩塑，与莫高窟一脉相承，是敦煌艺术的重要组成部分。

【西千佛洞】位于敦煌市西郊，是莫高窟的组成部分之一，现存22个洞窟。窟内的壁画和彩塑，体现了从北魏到元代的佛教艺术演变。

【五个庙石窟】位于肃北蒙古族自治县，是北魏至唐代的石窟，现存多个洞窟和造像。这些石窟虽然规模不大，但造像精美，是敦煌艺术的延伸。

【昌马石窟】位于玉门市，是北魏至唐代的石窟，现存多个洞窟和造像。石窟内的壁画和彩塑，体现了河西走廊佛教艺术的特点。`,
                    buildings: [
                        { name: '莫高窟（含西千佛洞）', province: 'gansu', district: 'dunhuang' },
                        { name: '榆林窟（含东千佛洞石窟）', province: 'gansu', district: 'guazhou' },
                        { name: '五个庙石窟', province: 'gansu', district: 'subei' },
                        { name: '昌马石窟', province: 'gansu', district: 'yumen' }
                    ]
                },
                {
                    title: '第十章：蜀道佛踪——从广元到乐山的造像',
                    icon: '🐼',
                    content: `向南越过秦岭，进入四川盆地。这里是巴蜀之地，也是佛教艺术的重要中心。

【皇泽寺摩崖造像】位于广元市，始建于北魏时期，是中国现存最早的佛教摩崖造像之一。寺内的佛像造型优美，体现了从北朝向唐代过渡的艺术风格。

【广元千佛崖摩崖造像】位于广元市，始建于北魏时期，延续至唐代。现存窟龛950余个，造像7000余尊。这些造像规模宏大，是四川地区最大的佛教摩崖造像群。

【觉苑寺】位于剑阁县，始建于唐代，现存建筑为明代所建。寺内的壁画精美，是明代佛教艺术的重要遗存。

【云岩寺】位于江油市，始建于唐代，现存建筑为清代所建。寺内的飞天藏是中国现存唯一的宋代道教转轮经藏，但其建筑形式也深受佛教影响。

【卧龙山千佛岩石窟】位于梓潼县，是唐代石窟，现存多个洞窟和造像。石窟内的佛像造型优美，体现了唐代佛教艺术的特点。

【乐山大佛】位于乐山市，是世界上最大的摩崖石刻弥勒佛坐像，高71米，开凿于唐代开元元年（713年），历时90年完成。

《西游记》中，唐僧师徒最终到达西天，面见如来佛祖。乐山大佛作为世界上最大的石刻佛像，或许就是古人心中佛祖的形象。站在大佛脚下仰望，那种震撼难以言表。

【荣县大佛石窟】位于荣县，是唐代石窟，现存大佛高36米，是世界第二大石刻佛像。这座大佛虽然不如乐山大佛高大，但其造型优美，是唐代佛教艺术的杰作。`,
                    buildings: [
                        { name: '皇泽寺摩崖造像', province: 'sichuan', district: 'chaotian' },
                        { name: '广元千佛崖摩崖造像', province: 'sichuan', district: 'chaotian' },
                        { name: '觉苑寺', province: 'sichuan', district: 'jiange' },
                        { name: '云岩寺', province: 'sichuan', district: 'jiangyou' },
                        { name: '卧龙山千佛岩石窟', province: 'sichuan', district: 'zitong' },
                        { name: '乐山大佛', province: 'sichuan', district: 'shizhong' },
                        { name: '荣县大佛石窟', province: 'sichuan', district: 'rongxian' }
                    ]
                },
                {
                    title: '第十一章：取经归来——从玉华宫到大慈恩寺',
                    icon: '📿',
                    content: `贞观十九年（645年），玄奘法师带着657部佛经回到长安。唐太宗在洛阳亲自接见了他，并下令在大慈恩寺修建大雁塔存放佛经。

在回到长安之前，玄奘法师曾在【玉华宫】翻译佛经。玉华宫位于铜川市，是唐代的皇家行宫。玄奘法师在这里翻译了《大般若经》等重要佛经。

回到长安后，玄奘法师在大慈恩寺翻译佛经19年，直到圆寂。他的弟子们将他的舍利葬在兴教寺塔，永远守望着这座他深爱的城市。

【昭仁寺大殿】位于长武县，是唐代建筑，也是中国现存最早的木结构建筑之一。这座大殿见证了唐代佛教的繁荣，也为玄奘法师的译经事业提供了支持。

【泰塔】位于旬邑县，是宋代建筑，高50余米。这座塔虽然建于玄奘法师之后，但它代表了宋代佛教建筑的水平，也是对唐代佛教传统的继承。

【泾阳崇文塔】位于泾阳县，是明代建筑，高87米，是中国现存最高的砖塔。这座塔象征着对文化的崇尚，也是对玄奘法师译经精神的传承。

【彬县开元寺塔】位于彬州市，是宋代建筑，高40余米。这座塔见证了佛教从唐代到宋代的演变，也是对玄奘法师取经事业的纪念。

十九年的西行之路，玄奘法师行程五万里，历经138个国家。他的《大唐西域记》成为研究中亚、南亚历史的珍贵文献。而《西游记》这部不朽名著，更是将这段历史演绎成了中国家喻户晓的神话故事。

今天，当我们站在大雁塔下、仰望云冈大佛、穿越敦煌壁画时，那些古老的建筑仿佛在诉说着那段传奇。它们不仅是历史的见证，更是文化的传承。

从长安到天竺，从现实到神话，这条取经之路已经走过了一千多年。而那些沿途的古建，就像一颗颗璀璨的明珠，串联起这段永恒的文化传奇。`,
                    buildings: [
                        { name: '大雁塔', province: 'shaanxi', district: 'yanta' },
                        { name: '兴教寺塔', province: 'shaanxi', district: 'chang-an' },
                        { name: '昭仁寺大殿', province: 'shaanxi', district: 'changwu' },
                        { name: '泰塔', province: 'shaanxi', district: 'xunyi' },
                        { name: '泾阳崇文塔', province: 'shaanxi', district: 'jingyang' },
                        { name: '彬县开元寺塔', province: 'shaanxi', district: 'binzhou' }
                    ]
                }
            ],
            // 故事中涉及的所有建筑汇总
            allBuildings: [
                { name: '大雁塔', province: 'shaanxi', district: 'yanta', chapter: 1 },
                { name: '小雁塔', province: 'shaanxi', district: 'beilin', chapter: 1 },
                { name: '香积寺善导塔', province: 'shaanxi', district: 'chang-an', chapter: 1 },
                { name: '长安华严寺塔', province: 'shaanxi', district: 'chang-an', chapter: 1 },
                { name: '长安圣寿寺塔', province: 'shaanxi', district: 'chang-an', chapter: 1 },
                { name: '昭慧塔', province: 'shaanxi', district: 'lintong', chapter: 1 },
                { name: '八云塔', province: 'shaanxi', district: 'zhouzhi', chapter: 1 },
                { name: '兴教寺塔', province: 'shaanxi', district: 'chang-an', chapter: 2 },
                { name: '鸠摩罗什舍利塔', province: 'shaanxi', district: 'huyi', chapter: 2 },
                { name: '净光寺塔', province: 'shaanxi', district: 'mei-xian', chapter: 2 },
                { name: '仙游寺法王塔', province: 'shaanxi', district: 'zhouzhi', chapter: 2 },
                { name: '法门寺遗址', province: 'shaanxi', district: 'fufeng', chapter: 3 },
                { name: '大佛寺石窟', province: 'shaanxi', district: 'bin-xian', chapter: 3 },
                { name: '慈善寺石窟', province: 'shaanxi', district: 'lin-you', chapter: 3 },
                { name: '太平寺塔', province: 'shaanxi', district: 'qishan', chapter: 3 },
                { name: '白马寺', province: 'henan', district: 'luolong', chapter: 4 },
                { name: '龙门石窟', province: 'henan', district: 'luolong', chapter: 4 },
                { name: '巩县石窟', province: 'henan', district: 'gongyi', chapter: 4 },
                { name: '少林寺', province: 'henan', district: 'dengfeng', chapter: 4 },
                { name: '嵩岳寺塔', province: 'henan', district: 'dengfeng', chapter: 4 },
                { name: '千尺塔', province: 'henan', district: 'xingyang', chapter: 5 },
                { name: '寿圣寺双塔', province: 'henan', district: 'zhongmu', chapter: 5 },
                { name: '凤台寺塔', province: 'henan', district: 'xinzheng', chapter: 5 },
                { name: '祐国寺塔', province: 'henan', district: 'gulou', chapter: 5 },
                { name: '相国寺', province: 'henan', district: 'gulou', chapter: 5 },
                { name: '云冈石窟', province: 'shanxi', district: 'pingcheng', chapter: 6 },
                { name: '华严寺', province: 'shanxi', district: 'pingcheng', chapter: 6 },
                { name: '善化寺', province: 'shanxi', district: 'pingcheng', chapter: 6 },
                { name: '悬空寺', province: 'shanxi', district: 'hun-yuan', chapter: 6 },
                { name: '永安寺', province: 'shanxi', district: 'hun-yuan', chapter: 6 },
                { name: '龙山石窟', province: 'shanxi', district: 'jinyuan', chapter: 7 },
                { name: '天龙山石窟', province: 'shanxi', district: 'jinyuan', chapter: 7 },
                { name: '永祚寺', province: 'shanxi', district: 'yingze', chapter: 7 },
                { name: '崇善寺大悲殿', province: 'shanxi', district: 'yingze', chapter: 7 },
                { name: '晋源阿育王塔', province: 'shanxi', district: 'jinyuan', chapter: 7 },
                { name: '蒙山开化寺遗址', province: 'shanxi', district: 'jinyuan', chapter: 7 },
                { name: '麦积山石窟（含仙人崖石窟、鲁恭姬造像碑）', province: 'gansu', district: 'maiji', chapter: 8 },
                { name: '水帘洞—大像山石窟', province: 'gansu', district: 'wushan', chapter: 8 },
                { name: '木梯寺石窟', province: 'gansu', district: 'wushan', chapter: 8 },
                { name: '兴国寺', province: 'gansu', district: 'qinan', chapter: 8 },
                { name: '天梯山石窟', province: 'gansu', district: 'liangzhou', chapter: 8 },
                { name: '张掖大佛寺', province: 'gansu', district: 'ganzhou', chapter: 8 },
                { name: '马蹄寺石窟群', province: 'gansu', district: 'sunan', chapter: 8 },
                { name: '文殊山石窟（含文殊山后山千佛洞、古佛洞）', province: 'gansu', district: 'sunan', chapter: 8 },
                { name: '莫高窟（含西千佛洞）', province: 'gansu', district: 'dunhuang', chapter: 9 },
                { name: '榆林窟（含东千佛洞石窟）', province: 'gansu', district: 'guazhou', chapter: 9 },
                { name: '五个庙石窟', province: 'gansu', district: 'subei', chapter: 9 },
                { name: '昌马石窟', province: 'gansu', district: 'yumen', chapter: 9 },
                { name: '皇泽寺摩崖造像', province: 'sichuan', district: 'chaotian', chapter: 10 },
                { name: '广元千佛崖摩崖造像', province: 'sichuan', district: 'chaotian', chapter: 10 },
                { name: '觉苑寺', province: 'sichuan', district: 'jiange', chapter: 10 },
                { name: '云岩寺', province: 'sichuan', district: 'jiangyou', chapter: 10 },
                { name: '卧龙山千佛岩石窟', province: 'sichuan', district: 'zitong', chapter: 10 },
                { name: '乐山大佛', province: 'sichuan', district: 'shizhong', chapter: 10 },
                { name: '荣县大佛石窟', province: 'sichuan', district: 'rongxian', chapter: 10 },
                { name: '昭仁寺大殿', province: 'shaanxi', district: 'changwu', chapter: 11 },
                { name: '泰塔', province: 'shaanxi', district: 'xunyi', chapter: 11 },
                { name: '泾阳崇文塔', province: 'shaanxi', district: 'jingyang', chapter: 11 },
                { name: '彬县开元寺塔', province: 'shaanxi', district: 'binzhou', chapter: 11 }
            ]
        };
    },

    // 水浒传专题故事
    getWaterMarginStory() {
        return {
            title: '水浒英雄志：从梁山泊到东京汴梁的古建传奇',
            intro: `北宋末年，朝政腐败，民不聊生。在山东梁山泊，一百零八位英雄好汉聚义，替天行道，演绎了一段荡气回肠的传奇故事。《水浒传》不仅是一部英雄史诗，更是一部宋代社会的百科全书。从梁山泊的水寨到东京汴梁的繁华，从阳谷县的市井到江州的酒楼，每一处古建都承载着那段波澜壮阔的历史。

让我们跟随宋江、武松、林冲等英雄的足迹，探访那些见证水浒传奇的历史古建。`,
            chapters: [
                {
                    title: '第一章：东京梦华——汴梁城的繁华与腐朽',
                    icon: '🏯',
                    content: `北宋东京汴梁，是当时世界上最繁华的城市之一。《水浒传》中多次提到这座城市的繁华与腐朽，正是这样的社会背景，才催生了梁山好汉的起义。

【祐国寺塔】位于开封市，又称"铁塔"，建于北宋皇祐元年（1049年），高55米。这座塔是北宋都城的重要地标，宋江等人多次在塔下商议大事。塔身由琉璃砖砌成，历经千年风雨依然屹立，见证了北宋的繁华与衰落。

【相国寺】位于开封市中心，是中国十大名寺之一，始建于北齐天保六年（555年），唐代时达到鼎盛。《水浒传》中，鲁智深曾在相国寺看守菜园，倒拔垂杨柳的故事就发生在这里。寺内的千手千眼观音菩萨像，是北宋时期的杰作。

【北宋东京城遗址】位于开封市地下，是北宋都城汴梁的遗址。虽然地面建筑已不复存在，但考古发掘出的宫殿、街道、桥梁等遗迹，依然能让人感受到当年的繁华。林冲被高俅陷害，发配沧州，就是从这座城市的城门出发的。

【延庆观】位于开封市，是元代建筑，但其所在的地理位置正是北宋皇宫的附近。这座道观见证了北宋的灭亡和元朝的建立，也是《水浒传》中英雄们命运的缩影。`,
                    buildings: [
                        { name: '祐国寺塔', province: 'henan', district: 'gulou' },
                        { name: '相国寺', province: 'henan', district: 'gulou' },
                        { name: '北宋东京城遗址（含繁塔、延庆观）', province: 'henan', district: 'gulou' }
                    ]
                },
                {
                    title: '第二章：山东豪杰——从曲阜到济南的英雄足迹',
                    icon: '⚔️',
                    content: `山东是孔孟之乡，也是水浒英雄的发源地。从曲阜的孔庙到济南的泉水，从梁山的山寨到郓城的街巷，每一处都留下了英雄的足迹。

【曲阜孔庙及孔府】位于曲阜市，是中国古代最大的孔庙，始建于公元前478年，历经各代修缮，现存建筑多为明清时期所建。孔庙大成殿高32米，是中国现存最大的木结构建筑之一。林冲被发配前，曾是八十万禁军教头，他的武艺正是源自儒家尚武精神的传承。

【孔林】位于曲阜市，是孔子及其后裔的墓地，占地200余公顷，有坟冢10万余座。林中古木参天，碑碣如林，是中国规模最大、持续年代最长、保存最完整的人造林墓群。宋江等人虽然落草为寇，但内心深处依然尊崇孔子，这种矛盾正是《水浒传》的深刻之处。

【岱庙】位于泰安市，是祭祀泰山神的庙宇，始建于汉代，现存建筑为宋代所建。天贶殿高22米，是中国现存三大宫殿式建筑之一。武松打虎后，曾在泰山脚下与兄弟们相聚，岱庙的宏伟气势正是英雄们胸怀的写照。

【泰山古建筑群】位于泰安市，包括岱庙、碧霞祠、玉皇顶等建筑。泰山是五岳之首，历代帝王在此封禅。宋江等人虽然反抗朝廷，但内心深处依然渴望被招安，这种矛盾在泰山的巍峨面前显得尤为深刻。`,
                    buildings: [
                        { name: '曲阜孔庙及孔府', province: 'shandong', district: 'qufu' },
                        { name: '孔林', province: 'shandong', district: 'qufu' },
                        { name: '岱庙', province: 'shandong', district: 'taishan' },
                        { name: '泰山古建筑群', province: 'shandong', district: 'taishan' }
                    ]
                },
                {
                    title: '第三章：梁山聚义——水泊梁山的英雄传奇',
                    icon: '🏔️',
                    content: `梁山泊位于山东省济宁市梁山县，是《水浒传》中一百零八位英雄聚义的地方。虽然当年的水泊已经干涸，但梁山的英雄传说依然流传。

【郓城观音寺塔】位于菏泽市郓城县，是宋代建筑，高30余米。郓城是宋江的故乡，这座塔见证了宋江从一个小吏到梁山首领的转变。塔身的佛像造型优美，体现了宋代佛教艺术的特点。

【棘梁山石刻】位于济宁市，是北齐至唐代的摩崖石刻，现存多个佛龛和造像。虽然这些石刻与《水浒传》没有直接关系，但它们见证了梁山地区悠久的历史，也为英雄们的故事增添了神秘色彩。

【临淄齐国故城】位于淄博市，是春秋战国时期齐国的都城遗址。临淄曾是天下最繁华的城市之一，"摩肩接踵"的典故就出自这里。这种繁华与《水浒传》中描绘的市井生活形成了有趣的对比。

【临淄墓群】位于淄博市，是春秋战国时期的古墓群，现存多座大型墓葬。这些墓葬的宏伟规模，让人联想到《水浒传》中英雄们的豪情壮志。`,
                    buildings: [
                        { name: '郓城观音寺塔', province: 'shandong', district: 'yuncheng' },
                        { name: '棘梁山石刻', province: 'shandong', district: 'liangshan' },
                        { name: '临淄齐国故城', province: 'shandong', district: 'linzi' },
                        { name: '临淄墓群', province: 'shandong', district: 'linzi' }
                    ]
                },
                {
                    title: '第四章：江南风云——从江州到杭州的征战之路',
                    icon: '🌊',
                    content: `梁山好汉接受招安后，奉命征讨方腊，从北方的梁山泊一路南下，途经江州、苏州、杭州等地，最终在杭州结束了这段传奇。

【岳阳楼】位于岳阳市，是中国三大名楼之一，始建于三国时期，现存建筑为清代所建。宋江等人南征时，曾路过岳阳楼，登楼远眺洞庭湖，感慨万千。范仲淹的"先天下之忧而忧，后天下之乐而乐"的名句，正是写于此楼。

【赤壁摩崖石刻】位于咸宁市，是三国时期赤壁之战的遗址，现存多个摩崖石刻和古建筑。虽然赤壁之战与《水浒传》无关，但宋江等人南征时，也曾在此凭吊古人，感叹历史的沧桑。

【东坡赤壁】位于黄冈市，是北宋文学家苏轼被贬黄州时游览的地方。苏轼的《赤壁赋》就写于此地。宋江等人虽然是一介武夫，但内心深处也有文人的情怀，东坡赤壁的文学气息正是他们内心世界的写照。

【六和塔】位于杭州市，是宋代建筑，高60米，是中国现存最完好的砖木结构古塔之一。宋江征讨方腊后，鲁智深在此圆寂，武松也在此出家。六和塔的钟声，仿佛是这段英雄传奇的终曲。`,
                    buildings: [
                        { name: '岳阳楼', province: 'hunan', district: 'yueyanglou' },
                        { name: '赤壁摩崖石刻', province: 'hubei', district: 'chibi' },
                        { name: '东坡赤壁', province: 'hubei', district: 'huanggang' },
                        { name: '六和塔', province: 'zhejiang', district: 'xihu' }
                    ]
                }
            ],
            allBuildings: [
                { name: '祐国寺塔', province: 'henan', district: 'gulou', chapter: 1 },
                { name: '相国寺', province: 'henan', district: 'gulou', chapter: 1 },
                { name: '北宋东京城遗址（含繁塔、延庆观）', province: 'henan', district: 'gulou', chapter: 1 },
                { name: '曲阜孔庙及孔府', province: 'shandong', district: 'qufu', chapter: 2 },
                { name: '孔林', province: 'shandong', district: 'qufu', chapter: 2 },
                { name: '岱庙', province: 'shandong', district: 'taishan', chapter: 2 },
                { name: '泰山古建筑群', province: 'shandong', district: 'taishan', chapter: 2 },
                { name: '郓城观音寺塔', province: 'shandong', district: 'yuncheng', chapter: 3 },
                { name: '棘梁山石刻', province: 'shandong', district: 'liangshan', chapter: 3 },
                { name: '临淄齐国故城', province: 'shandong', district: 'linzi', chapter: 3 },
                { name: '临淄墓群', province: 'shandong', district: 'linzi', chapter: 3 },
                { name: '岳阳楼', province: 'hunan', district: 'yueyanglou', chapter: 4 },
                { name: '赤壁摩崖石刻', province: 'hubei', district: 'chibi', chapter: 4 },
                { name: '东坡赤壁', province: 'hubei', district: 'huanggang', chapter: 4 },
                { name: '六和塔', province: 'zhejiang', district: 'xihu', chapter: 4 }
            ]
        };
    },

    // 三国演义专题故事
    getThreeKingdomsStory() {
        return {
            title: '三国风云录：从桃园结义到三国归晋的古建传奇',
            intro: `东汉末年，天下大乱，群雄并起。刘备、关羽、张飞桃园结义，开启了长达近百年的三国纷争。从成都的武侯祠到洛阳的关林，从荆州古城到白帝城托孤，每一处古建都承载着那段波澜壮阔的历史。

让我们跟随曹操、刘备、孙权的足迹，探访那些见证三国风云的历史古建。`,
            chapters: [
                {
                    title: '第一章：桃园结义——涿郡的英雄起点',
                    icon: '🍑',
                    content: `东汉末年，涿郡（今河北涿州）的桃园中，刘备、关羽、张飞三人结为兄弟，立誓"不求同年同月同日生，但求同年同月同日死"。这个简单的仪式，开启了三国时代最传奇的故事。

虽然涿州没有直接相关的古建筑，但我们可以从附近的建筑中感受到那个时代的气息。【晋祠】位于太原市，始建于西周，是为纪念晋国开国诸侯唐叔虞而建。晋祠的古老与庄严，让人联想到三国英雄们的豪情壮志。

【平遥城墙】位于晋中市，始建于西周，现存城墙为明代所建。这座城墙见证了数千年的历史变迁，也让人联想到三国时期的烽火连天。`,
                    buildings: [
                        { name: '晋祠', province: 'shanxi', district: 'jinyuan' },
                        { name: '平遥城墙', province: 'shanxi', district: 'pingyao' }
                    ]
                },
                {
                    title: '第二章：赤壁烽火——长江上的决定性战役',
                    icon: '🔥',
                    content: `建安十三年（208年），曹操率领八十万大军南下，意图一统天下。孙权和刘备联军在赤壁（今湖北赤壁市）以火攻大破曹军，奠定了三国鼎立的基础。

【赤壁摩崖石刻】位于咸宁市，是三国时期赤壁之战的遗址，现存多个摩崖石刻和古建筑。石刻上的"赤壁"二字，相传为周瑜所书，见证了那场改变历史的战役。

【东坡赤壁】位于黄冈市，虽然并非真正的赤壁之战遗址，但北宋文学家苏轼的《赤壁赋》就写于此地。"大江东去，浪淘尽，千古风流人物"，苏轼的词句让赤壁之名更加响亮。

【荆州城墙】位于荆州市，始建于三国时期，现存城墙为明清时期所建。荆州是三国时期的战略要地，关羽曾在此镇守七年。城墙上的每一块砖石，都仿佛在诉说着那段历史。

【荆州三观】位于荆州市，是道教建筑，包括太晖观、玄妙观、开元观。这些道观始建于唐代，但所在的地理位置正是三国时期荆州城的中心。关羽不仅武艺高强，还精通《春秋》，这种文武双全的特质，正是荆州古城文化底蕴的体现。`,
                    buildings: [
                        { name: '赤壁摩崖石刻', province: 'hubei', district: 'chibi' },
                        { name: '东坡赤壁', province: 'hubei', district: 'huanggang' },
                        { name: '荆州城墙', province: 'hubei', district: 'jingzhou' },
                        { name: '荆州三观', province: 'hubei', district: 'jingzhou' }
                    ]
                },
                {
                    title: '第三章：蜀汉风云——从隆中到白帝城',
                    icon: '⚔️',
                    content: `刘备三顾茅庐，请诸葛亮出山辅佐。诸葛亮在【隆中】提出了著名的"隆中对"，为刘备规划了夺取荆益、三分天下的战略。从此，蜀汉的历史拉开了序幕。

【襄阳"古隆中"】位于襄阳市，是诸葛亮隐居的地方。这里山清水秀，古木参天，正是诸葛亮"躬耕于南阳"的地方。刘备三顾茅庐的故事，就发生在这里的草庐之中。

【成都武侯祠】位于成都市，是中国唯一的君臣合祀祠庙，始建于三国时期，现存建筑为清代所建。祠内的刘备殿、诸葛亮殿、关羽殿、张飞殿等，供奉着蜀汉的英雄们。祠内的"攻心联""能攻心则反侧自消，自古知兵非好战；不审势即宽严皆误，后来治蜀要深思"，是清代赵藩所书，被誉为"天下第一联"。

【白帝城】位于重庆市奉节县，是刘备托孤的地方。章武三年（223年），刘备在夷陵之战中大败，退守白帝城，临终前将儿子刘禅托付给诸葛亮。白帝城的托孤堂，见证了这段悲壮的历史。

【白帝城遗址】位于重庆市奉节县，是白帝城的考古遗址。虽然地面建筑已不复存在，但遗址中的城墙、宫殿等遗迹，依然能让人感受到当年的悲壮。

【勉县武侯祠】位于汉中市，是诸葛亮北伐时驻扎的地方。祠内的古建筑群保存完好，是研究三国历史的重要资料。诸葛亮"鞠躬尽瘁，死而后已"的精神，正是从这里走向历史的。`,
                    buildings: [
                        { name: '襄阳"古隆中"', province: 'hubei', district: 'xiangcheng' },
                        { name: '成都武侯祠', province: 'sichuan', district: 'wuhou' },
                        { name: '白帝城', province: 'chongqing', district: 'fengjie' },
                        { name: '白帝城遗址', province: 'chongqing', district: 'fengjie' },
                        { name: '勉县武侯祠', province: 'shaanxi', district: 'mian-xian' }
                    ]
                },
                {
                    title: '第四章：魏武挥鞭——从许昌到洛阳的霸业',
                    icon: '🐎',
                    content: `曹操"挟天子以令诸侯"，以许昌为都城，建立了魏国的基业。从许昌到洛阳，从官渡到邺城，曹操的足迹遍布中原大地。

【关林】位于洛阳市，是埋葬关羽首级的地方。建安二十四年（219年），关羽在麦城被孙权部将吕蒙所杀，孙权将关羽首级送给曹操，曹操以诸侯之礼将其葬于洛阳。关林的古柏参天，殿宇巍峨，是中国三大关庙之一。

【南阳武侯祠】位于南阳市，是诸葛亮隐居时的草庐旧址。虽然诸葛亮最终选择了隆中，但南阳的草庐依然让人联想到那位"卧龙"先生。

【洛阳白马寺】位于洛阳市，是中国第一古刹。曹操虽然不信佛教，但他在洛阳时，白马寺已经是重要的文化场所。寺内的齐云塔，见证了从东汉到三国的历史变迁。

【龙门石窟】位于洛阳市，始建于北魏时期，延续至唐代。虽然龙门石窟的主要开凿时间在三国之后，但北魏时期的造像，正是三国归晋后北方文化的产物。`,
                    buildings: [
                        { name: '关林', province: 'henan', district: 'luolong' },
                        { name: '南阳武侯祠', province: 'henan', district: 'wolong' },
                        { name: '白马寺', province: 'henan', district: 'luolong' },
                        { name: '龙门石窟', province: 'henan', district: 'luolong' }
                    ]
                },
                {
                    title: '第五章：三分归晋——三国时代的终结',
                    icon: '📜',
                    content: `公元280年，晋武帝司马炎灭吴，统一全国，三国时代正式结束。从洛阳到建康，从长安到成都，三国英雄们的故事最终画上了句号。

【玉泉寺及铁塔】位于宜昌市，是三国时期关羽"玉泉山显圣"的地方。传说关羽死后，魂魄不散，在玉泉山向僧人普净求度。寺内的铁塔建于宋代，高30余米，是中国现存最高的铁塔之一。

【嵩岳寺塔】位于登封市，是中国现存最古老的砖塔，建于北魏正光年间（520-525年）。这座塔见证了从北魏到隋朝的变迁，也是三国归晋后北方佛教复兴的产物。

【少林寺】位于登封市，建于北魏太和十九年（495年）。虽然少林寺与三国没有直接关系，但它所在的嵩山地区，正是三国时期魏国的腹地。寺内的塔林，保存了历代高僧的墓塔，也让人联想到三国英雄们的归宿。`,
                    buildings: [
                        { name: '玉泉寺及铁塔', province: 'hubei', district: 'dangyang' },
                        { name: '嵩岳寺塔', province: 'henan', district: 'dengfeng' },
                        { name: '少林寺', province: 'henan', district: 'dengfeng' }
                    ]
                }
            ],
            allBuildings: [
                { name: '晋祠', province: 'shanxi', district: 'jinyuan', chapter: 1 },
                { name: '平遥城墙', province: 'shanxi', district: 'pingyao', chapter: 1 },
                { name: '赤壁摩崖石刻', province: 'hubei', district: 'chibi', chapter: 2 },
                { name: '东坡赤壁', province: 'hubei', district: 'huanggang', chapter: 2 },
                { name: '荆州城墙', province: 'hubei', district: 'jingzhou', chapter: 2 },
                { name: '荆州三观', province: 'hubei', district: 'jingzhou', chapter: 2 },
                { name: '襄阳"古隆中"', province: 'hubei', district: 'xiangcheng', chapter: 3 },
                { name: '成都武侯祠', province: 'sichuan', district: 'wuhou', chapter: 3 },
                { name: '白帝城', province: 'chongqing', district: 'fengjie', chapter: 3 },
                { name: '白帝城遗址', province: 'chongqing', district: 'fengjie', chapter: 3 },
                { name: '勉县武侯祠', province: 'shaanxi', district: 'mian-xian', chapter: 3 },
                { name: '关林', province: 'henan', district: 'luolong', chapter: 4 },
                { name: '南阳武侯祠', province: 'henan', district: 'wolong', chapter: 4 },
                { name: '白马寺', province: 'henan', district: 'luolong', chapter: 4 },
                { name: '龙门石窟', province: 'henan', district: 'luolong', chapter: 4 },
                { name: '玉泉寺及铁塔', province: 'hubei', district: 'dangyang', chapter: 5 },
                { name: '嵩岳寺塔', province: 'henan', district: 'dengfeng', chapter: 5 },
                { name: '少林寺', province: 'henan', district: 'dengfeng', chapter: 5 }
            ]
        };
    },

    // 红楼梦专题故事
    getDreamOfRedChamberStory() {
        return {
            title: '红楼一梦：从金陵到京都的园林传奇',
            intro: `"满纸荒唐言，一把辛酸泪。都云作者痴，谁解其中味。"《红楼梦》不仅是一部文学巨著，更是一部清代社会的百科全书。从金陵的江宁织造府到京都的恭王府，从大观园的亭台楼阁到苏州的园林水榭，每一处古建都承载着那段繁华与落寞交织的历史。

让我们跟随贾宝玉、林黛玉的足迹，探访那些见证红楼一梦的历史古建。`,
            chapters: [
                {
                    title: '第一章：金陵旧梦——江宁织造府的繁华',
                    icon: '🏛️',
                    content: `《红楼梦》的故事从金陵（今南京）开始。贾府的祖籍就在金陵，而曹雪芹的家族也曾担任江宁织造，掌管江南的丝绸生产。

【瞻园】位于南京市，是明代中山王徐达的府邸花园，也是清代江宁布政使司的官署。园内的假山、水池、亭台楼阁，体现了江南园林的精致与典雅。《红楼梦》中大观园的布局，或许就参考了瞻园的设计。

【南京城墙】位于南京市，始建于明代，现存城墙长35公里，是世界现存最长的古城墙。城墙上的每一块砖石，都仿佛在诉说着金陵的繁华与落寞。贾宝玉从金陵来到京都，正是沿着这条城墙内外的道路。

【灵隐寺石塔和经幢】位于杭州市，虽然与《红楼梦》没有直接关系，但江南的佛教文化深深影响了曹雪芹的创作。寺内的石塔和经幢，见证了江南佛教的繁荣，也为《红楼梦》中的宗教元素提供了背景。`,
                    buildings: [
                        { name: '瞻园', province: 'jiangsu', district: 'qinhuai' },
                        { name: '南京城墙', province: 'jiangsu', district: 'xuanwu' },
                        { name: '灵隐寺石塔和经幢', province: 'zhejiang', district: 'xihu' }
                    ]
                },
                {
                    title: '第二章：京都繁华——恭王府与大观园',
                    icon: '🌸',
                    content: `《红楼梦》的主要场景在京都（今北京）。贾府的府邸、大观园的原型，都与北京的历史建筑有着密切的联系。

【恭王府及花园】位于北京市西城区，是清代和珅的府邸，也是《红楼梦》中贾府和大观园的原型之一。府内的银安殿、嘉乐堂、锡晋斋等建筑，体现了清代王府的豪华与气派。后花园中的滴翠岩、邀月台、沁秋亭等景点，与大观园中的景致如出一辙。

【颐和园】位于北京市海淀区，是清代皇家园林，始建于乾隆年间。园内的昆明湖、万寿山、佛香阁等景观，体现了中国园林艺术的最高成就。《红楼梦》中元妃省亲的场景，或许就参考了颐和园的布局。

【圆明园遗址】位于北京市海淀区，是清代皇家园林，被誉为"万园之园"。虽然圆明园在1860年被英法联军烧毁，但遗址中的大水法、西洋楼等遗迹，依然能让人感受到当年的繁华。曹雪芹生活的时代，正是圆明园的鼎盛时期。`,
                    buildings: [
                        { name: '恭王府及花园', province: 'beijing', district: 'xicheng' },
                        { name: '颐和园', province: 'beijing', district: 'haidian' },
                        { name: '圆明园遗址', province: 'beijing', district: 'haidian' }
                    ]
                },
                {
                    title: '第三章：苏州园林——江南园林的典范',
                    icon: '🏞️',
                    content: `《红楼梦》中多次提到苏州的园林和工艺。林黛玉就是从苏州来到京都的，而贾府中的许多家具、摆设，也都是苏州工匠制作的。

【拙政园】位于苏州市，是中国四大名园之一，始建于明代正德年间。园内的远香堂、小飞虹、与谁同坐轩等景点，体现了江南园林的精致与典雅。《红楼梦》中大观园的许多景致，或许就参考了拙政园的设计。

【留园】位于苏州市，是中国四大名园之一，始建于明代嘉靖年间。园内的冠云峰、五峰仙馆、涵碧山房等景点，以建筑艺术精湛著称。留园的太湖石"冠云峰"，高6.5米，是中国现存最高的太湖石。

【网师园】位于苏州市，始建于南宋时期，是苏州最小的园林之一，但也是最为精致的。园内的殿春簃，在20世纪80年代被仿建到美国纽约大都会博物馆，成为中国园林走向世界的标志。

【狮子林】位于苏州市，始建于元代，以假山著称。园内的假山群，由太湖石堆叠而成，形态各异，仿佛一群狮子在嬉戏。乾隆皇帝曾多次游览狮子林，并在圆明园中仿建了狮子林。

【沧浪亭】位于苏州市，是苏州最古老的园林，始建于北宋时期。园内的沧浪亭、明道堂、五百名贤祠等建筑，体现了中国文人的清高与孤傲。《红楼梦》中贾宝玉的叛逆性格，或许就与这种文人精神有关。`,
                    buildings: [
                        { name: '拙政园', province: 'jiangsu', district: 'gusu' },
                        { name: '留园', province: 'jiangsu', district: 'gusu' },
                        { name: '网师园', province: 'jiangsu', district: 'gusu' },
                        { name: '狮子林', province: 'jiangsu', district: 'gusu' },
                        { name: '沧浪亭', province: 'jiangsu', district: 'gusu' }
                    ]
                },
                {
                    title: '第四章：扬州梦醒——运河边的繁华与落寞',
                    icon: '🚢',
                    content: `《红楼梦》中多次提到扬州。林黛玉的父亲林如海曾任巡盐御史，驻扎扬州。而曹雪芹的祖父曹寅，也曾担任两淮巡盐御史，与扬州有着密切的联系。

【个园】位于扬州市，是清代盐商黄至筠的私家园林，以竹石著称。园内的四季假山，用不同的石材表现春夏秋冬四季景色，是中国园林艺术的杰作。《红楼梦》中大观园的假山，或许就参考了个园的设计。

【何园】位于扬州市，是清代盐商何芷舠的私家园林，被誉为"晚清第一园"。园内的复道回廊、片石山房、水心亭等景点，体现了中西合璧的建筑风格。何园的复道回廊长1500米，是中国园林中最长的回廊。

【瘦西湖】位于扬州市，是清代皇家园林，以湖光山色著称。湖上的五亭桥、二十四桥、白塔等景点，体现了江南园林的精致与典雅。《红楼梦》中元妃省亲时乘船游湖的场景，或许就参考了瘦西湖的景致。`,
                    buildings: [
                        { name: '个园', province: 'jiangsu', district: 'guangling' },
                        { name: '何园', province: 'jiangsu', district: 'guangling' }
                    ]
                }
            ],
            allBuildings: [
                { name: '瞻园', province: 'jiangsu', district: 'qinhuai', chapter: 1 },
                { name: '南京城墙', province: 'jiangsu', district: 'xuanwu', chapter: 1 },
                { name: '灵隐寺石塔和经幢', province: 'zhejiang', district: 'xihu', chapter: 1 },
                { name: '恭王府及花园', province: 'beijing', district: 'xicheng', chapter: 2 },
                { name: '颐和园', province: 'beijing', district: 'haidian', chapter: 2 },
                { name: '圆明园遗址', province: 'beijing', district: 'haidian', chapter: 2 },
                { name: '拙政园', province: 'jiangsu', district: 'gusu', chapter: 3 },
                { name: '留园', province: 'jiangsu', district: 'gusu', chapter: 3 },
                { name: '网师园', province: 'jiangsu', district: 'gusu', chapter: 3 },
                { name: '狮子林', province: 'jiangsu', district: 'gusu', chapter: 3 },
                { name: '沧浪亭', province: 'jiangsu', district: 'gusu', chapter: 3 },
                { name: '个园', province: 'jiangsu', district: 'guangling', chapter: 4 },
                { name: '何园', province: 'jiangsu', district: 'guangling', chapter: 4 }
            ]
        };
    },

    // 白蛇传专题故事
    getWhiteSnakeStory() {
        return {
            title: '白蛇传奇：从西湖断桥到雷峰塔下的爱情传说',
            intro: `"西湖水干，江潮不起，雷峰塔倒，白蛇出世。"这是一个流传千年的爱情传说。白素贞与许仙在西湖断桥相遇，结为夫妻，却因法海的阻挠，最终被镇压在雷峰塔下。从杭州的西湖到镇江的金山，从苏州的园林到南京的城墙，每一处古建都承载着这段凄美的爱情。`,
            chapters: [
                {
                    title: '第一章：断桥相遇——西湖边的爱情起点',
                    icon: '💕',
                    content: `清明时节，西湖断桥，白素贞与许仙在细雨中相遇。一把油纸伞，牵起了这段人妖相恋的传奇。

【六和塔】位于杭州市，是宋代建筑，高60米。虽然六和塔与《白蛇传》没有直接关系，但它矗立在钱塘江畔，见证了无数的爱情故事。塔内的壁画和浮雕，也反映了宋代的民间传说。

【灵隐寺石塔和经幢】位于杭州市，是五代至宋代的建筑。灵隐寺是杭州最著名的佛寺，寺内的飞来峰造像，是中国南方佛教艺术的杰作。法海作为金山寺的和尚，他的信仰正是源自这样的佛教传统。

【保俶塔】位于杭州市，是明代建筑，高45米，矗立在宝石山上。塔身纤细挺拔，宛如一位亭亭玉立的少女，守护着西湖的宁静。白素贞与许仙在西湖边的生活，正是在这样的美景中度过的。`,
                    buildings: [
                        { name: '六和塔', province: 'zhejiang', district: 'xihu' },
                        { name: '灵隐寺石塔和经幢', province: 'zhejiang', district: 'xihu' }
                    ]
                },
                {
                    title: '第二章：水漫金山——镇江的惊涛骇浪',
                    icon: '🌊',
                    content: `法海将许仙骗至金山寺，白素贞为救丈夫，水漫金山。这场惊天动地的大战，让镇江的金山寺名垂千古。

【金山寺】虽然不在全国重点文物保护单位名单中，但【金山寺舍利塔】位于河北张家口市，是宋代建筑。这座塔虽然与镇江的金山寺没有直接关系，但它见证了佛教在中国的传播，也为法海的故事提供了背景。

【北固山】位于镇江市，是三国时期孙权建都的地方。山上的甘露寺，是刘备招亲的地方。《白蛇传》中的水漫金山，或许就发生在北固山附近的长江上。

【镇江城墙】位于镇江市，始建于三国时期，现存城墙为明清时期所建。城墙上的每一块砖石，都仿佛在诉说着那段传奇。白素贞水漫金山时，镇江城的百姓或许就站在城墙上，目睹了那场惊天动地的大战。`,
                    buildings: [
                        { name: '金山寺舍利塔', province: 'hebei', district: 'zhangjiakou' }
                    ]
                },
                {
                    title: '第三章：雷峰塔倒——西湖边的爱情终曲',
                    icon: '🏯',
                    content: `白素贞被法海镇压在雷峰塔下，许仙在塔外守候。"雷峰塔倒，西湖水干"，这个预言流传了千年，直到1924年雷峰塔真的倒塌。

【雷峰塔】虽然原塔已倒塌，但【六和塔】位于杭州市，是宋代建筑，高60米。六和塔与雷峰塔隔湖相望，共同守护着西湖的美景。塔内的壁画和浮雕，也反映了宋代的民间传说。

【净慈寺】位于杭州市，是西湖四大古刹之一。寺内的南屏晚钟，是西湖十景之一。白素贞被镇压在雷峰塔下时，净慈寺的钟声或许就是她唯一的慰藉。

【岳王庙】位于杭州市，是纪念岳飞的庙宇。虽然岳王庙与《白蛇传》没有直接关系，但它所在的地理位置，正是西湖边最热闹的地方。白素贞与许仙的故事，或许就是在这样的市井氛围中流传开来的。`,
                    buildings: [
                        { name: '六和塔', province: 'zhejiang', district: 'xihu' }
                    ]
                }
            ],
            allBuildings: [
                { name: '六和塔', province: 'zhejiang', district: 'xihu', chapter: 1 },
                { name: '灵隐寺石塔和经幢', province: 'zhejiang', district: 'xihu', chapter: 1 },
                { name: '金山寺舍利塔', province: 'hebei', district: 'zhangjiakou', chapter: 2 },
                { name: '六和塔', province: 'zhejiang', district: 'xihu', chapter: 3 }
            ]
        };
    },

    // 西厢记专题故事
    getWestChamberStory() {
        return {
            title: '西厢情缘：从普救寺到长亭送别的爱情传奇',
            intro: `"愿天下有情人都成了眷属。"《西厢记》是中国古典戏曲中最著名的爱情作品之一。张生与崔莺莺在普救寺相遇，历经磨难，最终有情人终成眷属。从山西永济的普救寺到河南洛阳的龙门石窟，从长安的大雁塔到苏州的园林，每一处古建都承载着这段才子佳人的传奇。`,
            chapters: [
                {
                    title: '第一章：普救寺中——山西永济的佛国奇缘',
                    icon: '💕',
                    content: `唐代贞元年间，书生张生赴京赶考，途经蒲州（今山西永济），借宿于【普救寺】。寺中偶遇崔相国之女莺莺，两人一见钟情，演绎了一段千古佳话。

【普救寺塔】位于运城市永济市，是明代建筑，高50米，方形十三层密檐式砖塔。这座塔原名舍利塔，因《西厢记》的故事而被称为"莺莺塔"。塔身结构奇特，具有回音效应，在塔侧击石，塔上会发出清脆的"咯哇"声，仿佛青蛙鸣叫，被誉为"普救蟾声"，是永济八景之一。

【普救寺】虽然原寺已毁，但普救寺塔依然屹立。塔下的每一块砖石，都仿佛在诉说着张生与莺莺的爱情故事。寺内的梨花深院、书斋、西厢房等建筑，都是根据《西厢记》的描述重建的。

【解州关帝庙】位于运城市，是中国最大的关帝庙。虽然关帝庙与《西厢记》没有直接关系，但它所在的运城地区，正是普救寺的所在地。关公的忠义与张生的痴情，共同构成了山西文化的双重底蕴。`,
                    buildings: [
                        { name: '普救寺塔', province: 'shanxi', district: 'yongji' }
                    ]
                },
                {
                    title: '第二章：长亭送别——离别的千古绝唱',
                    icon: '🍂',
                    content: `张生赴京赶考，崔莺莺在长亭送别。"碧云天，黄花地，西风紧，北雁南飞。晓来谁染霜林醉？总是离人泪。"这段唱词，被誉为中国古典戏曲中最美的送别场景。

【蒲津渡与蒲州故城遗址】位于运城市永济市，是唐代蒲州的渡口遗址。张生就是从这里的渡口乘船赴京的。遗址内的唐代铁牛，是中国现存最大的铁铸文物，见证了蒲州作为黄河渡口的繁华。

【鹳雀楼】位于运城市永济市，是中国四大名楼之一，始建于北周时期，现存建筑为现代重建。王之涣的"欲穷千里目，更上一层楼"就写于此楼。张生与莺莺送别时，或许也曾登楼远眺，寄托相思之情。

【永乐宫】位于运城市芮城县，是元代道教建筑，以壁画闻名。虽然永乐宫与《西厢记》没有直接关系，但它所在的运城地区，正是《西厢记》故事的发生地。宫内的《朝元图》壁画，是中国古代壁画的杰作。`,
                    buildings: [
                        { name: '普救寺塔', province: 'shanxi', district: 'yongji' }
                    ]
                },
                {
                    title: '第三章：金榜题名——长安城的团圆',
                    icon: '📜',
                    content: `张生金榜题名，回到普救寺，与崔莺莺团圆。"有情人终成眷属"，这个美好的结局，让《西厢记》成为中国古典戏曲中最受欢迎的作品之一。

【大雁塔】位于西安市，是唐代建筑，高64米。张生赴京赶考，最终在大雁塔下题名，实现了自己的理想。大雁塔下的题名碑，见证了无数士子的梦想。

【小雁塔】位于西安市，是唐代建筑，高43米。虽然小雁塔与《西厢记》没有直接关系，但它与大雁塔一起，构成了长安城的佛教景观。张生在长安城备考时，或许也曾在此游览。

【西安碑林】位于西安市，是中国最大的石碑博物馆。馆内收藏了从汉代到清代的碑石4000余方，其中包括许多唐代科举考试的题名碑。张生的名字，或许就刻在这些碑石之中。`,
                    buildings: [
                        { name: '大雁塔', province: 'shaanxi', district: 'yanta' },
                        { name: '小雁塔', province: 'shaanxi', district: 'beilin' }
                    ]
                }
            ],
            allBuildings: [
                { name: '普救寺塔', province: 'shanxi', district: 'yongji', chapter: 1 },
                { name: '大雁塔', province: 'shaanxi', district: 'yanta', chapter: 3 },
                { name: '小雁塔', province: 'shaanxi', district: 'beilin', chapter: 3 }
            ]
        };
    },

    // 聊斋志异专题故事
    getLiaoZhaiStory() {
        return {
            title: '聊斋志异：从柳泉居士的茅屋到狐仙鬼怪的居所',
            intro: `"写鬼写妖高人一等，刺贪刺虐入木三分。"《聊斋志异》是中国古典文学中最著名的志怪小说集。作者蒲松龄在山东淄川的柳泉边，听路人讲述奇闻异事，创作出了这部不朽名著。从蒲松龄的故居到各地的狐仙庙，从山东的古城到江南的园林，每一处古建都承载着那些奇诡的故事。`,
            chapters: [
                {
                    title: '第一章：柳泉居士——蒲松龄的故居与书房',
                    icon: '🦊',
                    content: `山东淄川（今淄博市淄川区），柳泉边，一座简陋的茅屋中，蒲松龄正在奋笔疾书。他一生科举不顺，却以一部《聊斋志异》名垂千古。

【蒲松龄故宅】位于淄博市淄川区，是蒲松龄出生和生活的地方。故宅内的正房、厢房、书房等建筑，保留了清代的风格。书房内的书桌、笔墨、油灯等文物，让人仿佛看到蒲松龄深夜写作的身影。

【柳泉】位于淄博市淄川区，是蒲松龄设茶听书的地方。泉边的古柳依依，泉水清澈见底。蒲松龄在此设茶摊，听路人讲述奇闻异事，收集创作素材。泉边的石碑上，刻有"柳泉"二字，相传为蒲松龄所书。

【临淄齐国故城】位于淄博市，是春秋战国时期齐国的都城遗址。临淄曾是天下最繁华的城市之一，"摩肩接踵"的典故就出自这里。蒲松龄生活的时代，临淄虽然已经衰落，但古城的遗迹依然让人感受到当年的繁华。

【周村东岳庙】位于淄博市周村区，是明代建筑。东岳庙是祭祀泰山神的庙宇，也是《聊斋志异》中许多故事的发生地。庙内的古建筑群保存完好，是研究明清建筑的重要资料。`,
                    buildings: [
                        { name: '蒲松龄故宅', province: 'shandong', district: 'zichuan' },
                        { name: '临淄齐国故城', province: 'shandong', district: 'linzi' },
                        { name: '周村东岳庙', province: 'shandong', district: 'zhoucun' }
                    ]
                },
                {
                    title: '第二章：狐仙鬼怪——山东各地的奇诡传说',
                    icon: '👻',
                    content: `《聊斋志异》中的故事，大多发生在山东各地。从济南的泉水到泰山的古庙，从曲阜的孔庙到青岛的海滨，每一处都流传着奇诡的传说。

【大明湖】位于济南市，是济南三大名胜之一。湖内的历下亭、铁公祠、北极阁等建筑，历史悠久。蒲松龄曾多次游览大明湖，湖中的荷花、柳树、亭台楼阁，都成为他创作的灵感来源。《聊斋志异》中的许多故事，都以大明湖为背景。

【趵突泉】位于济南市，是济南七十二名泉之首。泉边的泺源堂、观澜亭等建筑，始建于宋代。蒲松龄在济南求学时，曾多次在趵突泉边读书。泉水的清澈与喷涌，让他联想到了人生的起伏与变幻。

【千佛山】位于济南市，是济南三大名胜之一。山上的兴国禅寺、历山院等建筑，始建于隋唐时期。千佛山的石窟造像，是隋唐时期佛教艺术的杰作。蒲松龄在《聊斋志异》中多次提到千佛山，山中的古庙和石窟，成为狐仙鬼怪的居所。

【岱庙】位于泰安市，是祭祀泰山神的庙宇，始建于汉代，现存建筑为宋代所建。天贶殿高22米，是中国现存三大宫殿式建筑之一。泰山是五岳之首，也是鬼神聚集的地方。《聊斋志异》中的许多故事，都以泰山为背景。`,
                    buildings: [
                        { name: '临淄齐国故城', province: 'shandong', district: 'linzi' }
                    ]
                },
                {
                    title: '第三章：才子佳人——江南园林中的爱情故事',
                    icon: '💕',
                    content: `《聊斋志异》中不仅有狐仙鬼怪，还有许多才子佳人的爱情故事。这些故事的发生地，大多在江南的园林和水乡。

【拙政园】位于苏州市，是中国四大名园之一。园内的远香堂、小飞虹、与谁同坐轩等景点，体现了江南园林的精致与典雅。《聊斋志异》中的许多爱情故事，都以这样的园林为背景。

【留园】位于苏州市，是中国四大名园之一。园内的冠云峰、五峰仙馆、涵碧山房等景点，以建筑艺术精湛著称。留园的太湖石"冠云峰"，高6.5米，是中国现存最高的太湖石。这块奇石，或许就是《聊斋志异》中某块通灵宝玉的原型。

【网师园】位于苏州市，始建于南宋时期，是苏州最小的园林之一，但也是最为精致的。园内的殿春簃，在20世纪80年代被仿建到美国纽约大都会博物馆，成为中国园林走向世界的标志。《聊斋志异》中的许多故事，都以这样的精致园林为背景。

【退思园】位于苏州市吴江区，是清代建筑，以"退则思过"之意命名。园内的亭台楼阁、假山池沼，体现了江南园林的精致与典雅。《聊斋志异》中的许多故事，都以这样的水乡园林为背景。`,
                    buildings: [
                        { name: '拙政园', province: 'jiangsu', district: 'gusu' },
                        { name: '留园', province: 'jiangsu', district: 'gusu' },
                        { name: '网师园', province: 'jiangsu', district: 'gusu' },
                        { name: '退思园', province: 'jiangsu', district: 'wujiang' }
                    ]
                }
            ],
            allBuildings: [
                { name: '蒲松龄故宅', province: 'shandong', district: 'zichuan', chapter: 1 },
                { name: '临淄齐国故城', province: 'shandong', district: 'linzi', chapter: 1 },
                { name: '周村东岳庙', province: 'shandong', district: 'zhoucun', chapter: 1 },
                { name: '临淄齐国故城', province: 'shandong', district: 'linzi', chapter: 2 },
                { name: '拙政园', province: 'jiangsu', district: 'gusu', chapter: 3 },
                { name: '留园', province: 'jiangsu', district: 'gusu', chapter: 3 },
                { name: '网师园', province: 'jiangsu', district: 'gusu', chapter: 3 },
                { name: '退思园', province: 'jiangsu', district: 'wujiang', chapter: 3 }
            ]
        };
    }
};
