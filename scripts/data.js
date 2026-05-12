// =============================================
// 数据中心 v3 — 全量扩充版
// =============================================

// ---- 中国法定节假日 2025-2026 ----
const HOLIDAYS = {
  '2025-01-01':{ name:'元旦', type:'holiday' },
  '2025-01-26':{ name:'补班', type:'workday' },
  '2025-01-28':{ name:'春节', type:'holiday' },'2025-01-29':{ name:'春节', type:'holiday' },
  '2025-01-30':{ name:'春节', type:'holiday' },'2025-01-31':{ name:'春节', type:'holiday' },
  '2025-02-01':{ name:'春节', type:'holiday' },'2025-02-02':{ name:'春节', type:'holiday' },
  '2025-02-03':{ name:'春节', type:'holiday' },'2025-02-04':{ name:'春节', type:'holiday' },
  '2025-02-08':{ name:'补班', type:'workday' },
  '2025-04-04':{ name:'清明', type:'holiday' },'2025-04-05':{ name:'清明', type:'holiday' },
  '2025-04-06':{ name:'清明', type:'holiday' },'2025-04-27':{ name:'补班', type:'workday' },
  '2025-05-01':{ name:'劳动节', type:'holiday' },'2025-05-02':{ name:'劳动节', type:'holiday' },
  '2025-05-03':{ name:'劳动节', type:'holiday' },'2025-05-04':{ name:'劳动节', type:'holiday' },
  '2025-05-05':{ name:'劳动节', type:'holiday' },
  '2025-05-31':{ name:'端午', type:'holiday' },'2025-06-01':{ name:'端午', type:'holiday' },
  '2025-06-02':{ name:'端午', type:'holiday' },
  '2025-09-28':{ name:'补班', type:'workday' },
  '2025-10-01':{ name:'国庆', type:'holiday' },'2025-10-02':{ name:'国庆', type:'holiday' },
  '2025-10-03':{ name:'国庆/中秋', type:'holiday' },'2025-10-04':{ name:'中秋', type:'holiday' },
  '2025-10-05':{ name:'国庆', type:'holiday' },'2025-10-06':{ name:'国庆', type:'holiday' },
  '2025-10-07':{ name:'国庆', type:'holiday' },'2025-10-08':{ name:'国庆', type:'holiday' },
  '2025-10-11':{ name:'补班', type:'workday' },
  '2026-01-01':{ name:'元旦', type:'holiday' },'2026-01-02':{ name:'元旦', type:'holiday' },
  '2026-01-03':{ name:'元旦', type:'holiday' },
  '2026-02-15':{ name:'补班', type:'workday' },
  '2026-02-17':{ name:'春节', type:'holiday' },'2026-02-18':{ name:'春节', type:'holiday' },
  '2026-02-19':{ name:'春节', type:'holiday' },'2026-02-20':{ name:'春节', type:'holiday' },
  '2026-02-21':{ name:'春节', type:'holiday' },'2026-02-22':{ name:'春节', type:'holiday' },
  '2026-02-23':{ name:'春节', type:'holiday' },'2026-02-28':{ name:'补班', type:'workday' },
  '2026-04-05':{ name:'清明', type:'holiday' },'2026-04-06':{ name:'清明', type:'holiday' },
  '2026-04-07':{ name:'清明', type:'holiday' },
  '2026-05-01':{ name:'劳动节', type:'holiday' },'2026-05-02':{ name:'劳动节', type:'holiday' },
  '2026-05-03':{ name:'劳动节', type:'holiday' },'2026-05-04':{ name:'劳动节', type:'holiday' },
  '2026-05-05':{ name:'劳动节', type:'holiday' },
  '2026-06-19':{ name:'端午', type:'holiday' },'2026-06-20':{ name:'端午', type:'holiday' },
  '2026-06-21':{ name:'端午', type:'holiday' },
  '2026-10-01':{ name:'国庆', type:'holiday' },'2026-10-02':{ name:'国庆', type:'holiday' },
  '2026-10-03':{ name:'国庆', type:'holiday' },'2026-10-04':{ name:'国庆', type:'holiday' },
  '2026-10-05':{ name:'国庆', type:'holiday' },'2026-10-06':{ name:'国庆', type:'holiday' },
  '2026-10-07':{ name:'国庆', type:'holiday' },
};

// ---- 美食数据库（100+ 道菜）----
const FOODS = [
  // === 面食 ===
  { id:'n001', name:'油泼面', emoji:'🍜', category:'noodle', kcal:650, desc:'陕西魂！宽面铺辣椒面，滚烫热油滋啦一泼，香气冲天', difficulty:'简单', cookTime:'20min', location:'家', origin:'陕西', shopHint:'手擀面、辣椒面、花椒、蒜' },
  { id:'n002', name:'臊子面', emoji:'🍲', category:'noodle', kcal:520, desc:'岐山臊子面，酸辣香，宽汤薄面，浇了又浇', difficulty:'中等', cookTime:'45min', location:'家/外食', origin:'陕西', shopHint:'猪肉末、木耳、黄花菜、豆腐、鸡蛋' },
  { id:'n003', name:'番茄鸡蛋面', emoji:'🍅', category:'noodle', kcal:420, desc:'永远不会出错，酸甜开胃，15分钟搞定', difficulty:'简单', cookTime:'15min', location:'家', origin:'通用', shopHint:'番茄、鸡蛋' },
  { id:'n004', name:'新疆拌面（拉条子）', emoji:'🍝', category:'noodle', kcal:720, desc:'手拉面条配羊肉蔬菜浇头，劲道过瘾', difficulty:'中等', cookTime:'40min', location:'家/外食', origin:'新疆', shopHint:'高筋面粉、羊肉/牛肉、洋葱、彩椒' },
  { id:'n005', name:'新疆炒拌面', emoji:'🥘', category:'noodle', kcal:750, desc:'面条下锅翻炒，加羊肉洋葱辣椒，干香有嚼劲', difficulty:'中等', cookTime:'35min', location:'家/外食', origin:'新疆', shopHint:'拉条子面、羊肉、洋葱、辣椒' },
  { id:'n006', name:'炸酱面', emoji:'🫙', category:'noodle', kcal:680, desc:'自炒黄豆酱肉末，配各种时令小菜', difficulty:'中等', cookTime:'30min', location:'家', origin:'北方', shopHint:'猪肉末、黄豆酱/甜面酱、黄瓜丝' },
  { id:'n007', name:'葱油拌面', emoji:'🧅', category:'noodle', kcal:580, desc:'熬出焦香葱油拌细面，简单惊艳', difficulty:'简单', cookTime:'20min', location:'家', origin:'上海', shopHint:'小葱/大葱、生抽、老抽' },
  { id:'n008', name:'裤带面', emoji:'🍜', category:'noodle', kcal:700, desc:'又宽又厚的关中大面，一根面条就能吃饱！', difficulty:'中等', cookTime:'30min', location:'家/外食', origin:'陕西', shopHint:'面粉、辣椒面、蒜' },
  { id:'n009', name:'芝麻酱凉面', emoji:'🥒', category:'noodle', kcal:520, desc:'夏日首选，芝麻酱+黄瓜丝+蒜泥，清爽解暑', difficulty:'简单', cookTime:'15min', location:'家', origin:'通用', shopHint:'面条、芝麻酱、黄瓜、蒜' },
  { id:'n010', name:'麻食', emoji:'🌾', category:'noodle', kcal:460, desc:'陕西古法！面搓成小耳朵，配蔬菜炖煮，暖胃养人', difficulty:'中等', cookTime:'40min', location:'家', origin:'陕西', shopHint:'面粉、番茄、土豆、豆角' },
  { id:'n011', name:'鸡汤面', emoji:'🍗', category:'noodle', kcal:400, desc:'清鲜鸡汤做底，配青菜，冬天来一碗暖心暖胃', difficulty:'中等', cookTime:'30min', location:'家', origin:'通用', shopHint:'整鸡/鸡架、姜、青菜' },
  { id:'n012', name:'牛肉汤面', emoji:'🥩', category:'noodle', kcal:500, desc:'浓郁牛肉汤底，卤牛肉切片，配大葱香菜', difficulty:'中等', cookTime:'40min', location:'家/外食', origin:'通用', shopHint:'牛腱子（提前解冻）、香料' },
  { id:'n013', name:'酸汤水饺', emoji:'🥟', category:'noodle', kcal:480, desc:'酸辣汤底，水饺飘浮，陕西特色吃法', difficulty:'中等', cookTime:'30min', location:'家/外食', origin:'陕西', shopHint:'速冻水饺、辣椒油、陈醋' },
  { id:'n014', name:'担担面', emoji:'🌶️', category:'noodle', kcal:620, desc:'麻辣芝麻酱底，猪肉末芽菜，成都街头经典', difficulty:'中等', cookTime:'25min', location:'家/外食', origin:'川菜', shopHint:'细面、猪肉末、芝麻酱、花椒、芽菜' },
  { id:'n015', name:'螺蛳粉', emoji:'🐌', category:'noodle', kcal:550, desc:'臭臭的才好吃！酸笋木耳腐竹，上瘾神器', difficulty:'简单', cookTime:'15min', location:'家/外食', origin:'广西', shopHint:'螺蛳粉包（超市有售）' },
  { id:'n016', name:'热干面', emoji:'🍜', category:'noodle', kcal:580, desc:'武汉早餐首选，碱水面+芝麻酱，干拌过瘾', difficulty:'简单', cookTime:'15min', location:'家/外食', origin:'湖北', shopHint:'碱水面或热干面专用面、芝麻酱' },
  { id:'n017', name:'过桥米线', emoji:'🍵', category:'noodle', kcal:490, desc:'云南名吃，鲜汤烫熟各种食材，鲜美无比', difficulty:'中等', cookTime:'30min', location:'家/外食', origin:'云南', shopHint:'米线、鸡汤、鸡胸肉片、蔬菜' },
  { id:'n018', name:'重庆小面', emoji:'🌶️', category:'noodle', kcal:520, desc:'麻辣鲜香，花椒油辣子葱花，一碗搞定早餐', difficulty:'中等', cookTime:'20min', location:'家/外食', origin:'重庆', shopHint:'细面、花椒油、辣椒油、猪油' },
  { id:'n019', name:'包子+小米粥', emoji:'🥟', category:'noodle', kcal:500, desc:'蒸一锅包子配香浓小米粥，早餐晚餐都稳', difficulty:'中等', cookTime:'60min', location:'家', origin:'通用', shopHint:'面粉、小米、包子馅料' },
  { id:'n020', name:'蒸饺', emoji:'🥟', category:'noodle', kcal:440, desc:'捏一锅饺子上锅蒸，皮薄馅厚，蘸醋吃', difficulty:'中等', cookTime:'60min', location:'家', origin:'通用', shopHint:'猪肉、白菜/韭菜、面粉' },
  // === 米饭 ===
  { id:'r001', name:'番茄炒蛋+米饭', emoji:'🍳', category:'rice', kcal:500, desc:'永恒神仙搭档，不用解释', difficulty:'简单', cookTime:'20min', location:'家', origin:'通用', shopHint:'番茄、鸡蛋' },
  { id:'r002', name:'红烧肉+米饭', emoji:'🍖', category:'rice', kcal:760, desc:'炖到酥烂的五花肉，肥而不腻，米饭杀手', difficulty:'中等', cookTime:'90min', location:'家', origin:'通用', shopHint:'五花肉（解冻）、生抽、老抽、冰糖' },
  { id:'r003', name:'可乐鸡翅+米饭', emoji:'🍗', category:'rice', kcal:640, desc:'可乐收汁，甜香嫩滑，百做不厌', difficulty:'简单', cookTime:'30min', location:'家', origin:'通用', shopHint:'鸡翅（解冻）、可乐' },
  { id:'r004', name:'新疆手抓饭', emoji:'🍚', category:'rice', kcal:730, desc:'羊肉+胡萝卜+洋葱焖米饭，新疆最高礼遇', difficulty:'中等', cookTime:'60min', location:'家/外食', origin:'新疆', shopHint:'羊肉（解冻）、胡萝卜、洋葱、大米' },
  { id:'r005', name:'宫保鸡丁+米饭', emoji:'🌶️', category:'rice', kcal:600, desc:'鸡丁+花生+辣椒，酸甜微辣，经典川菜', difficulty:'中等', cookTime:'25min', location:'家/外食', origin:'川菜', shopHint:'鸡胸肉、花生、干辣椒、豆瓣酱' },
  { id:'r006', name:'土豆炖牛肉+米饭', emoji:'🥔', category:'rice', kcal:700, desc:'大块牛肉配土豆，炖到软烂入味', difficulty:'中等', cookTime:'90min', location:'家', origin:'通用', shopHint:'牛腩（解冻）、土豆、胡萝卜' },
  { id:'r007', name:'麻婆豆腐+米饭', emoji:'🌶️', category:'rice', kcal:560, desc:'麻辣鲜香，嫩豆腐在辣椒油中打滚，下饭神器', difficulty:'简单', cookTime:'20min', location:'家/外食', origin:'川菜', shopHint:'嫩豆腐、猪肉末、豆瓣酱、花椒' },
  { id:'r008', name:'蛋炒饭', emoji:'🍳', category:'rice', kcal:530, desc:'隔夜冷饭炒出锅气，加鸡蛋葱花酱油', difficulty:'简单', cookTime:'10min', location:'家', origin:'通用', shopHint:'隔夜米饭、鸡蛋、葱' },
  { id:'r009', name:'咖喱饭', emoji:'🍛', category:'rice', kcal:660, desc:'咖喱块+土豆鸡肉，香气浓郁，超满足', difficulty:'简单', cookTime:'40min', location:'家', origin:'通用', shopHint:'咖喱块、鸡腿肉（解冻）、土豆、胡萝卜' },
  { id:'r010', name:'回锅肉+米饭', emoji:'🥩', category:'rice', kcal:740, desc:'五花肉+青椒豆瓣酱，川菜扛把子', difficulty:'中等', cookTime:'30min', location:'家/外食', origin:'川菜', shopHint:'五花肉（解冻）、青蒜/青椒、豆瓣酱' },
  { id:'r011', name:'鱼香肉丝+米饭', emoji:'🐟', category:'rice', kcal:620, desc:'其实没有鱼！但酸甜咸香让人上瘾', difficulty:'中等', cookTime:'25min', location:'家/外食', origin:'川菜', shopHint:'猪里脊（解冻）、木耳、笋丝、豆瓣酱' },
  { id:'r012', name:'清蒸鱼+米饭', emoji:'🐠', category:'rice', kcal:500, desc:'葱姜蒸鱼豉油淋上去，原汁原味', difficulty:'中等', cookTime:'30min', location:'家', origin:'粤菜', shopHint:'鲜鱼/冻鱼（解冻）、葱、姜、蒸鱼豉油' },
  { id:'r013', name:'新疆大盘鸡', emoji:'🐔', category:'rice', kcal:820, desc:'整只鸡+土豆+皮带面，新疆豪爽吃法', difficulty:'中等', cookTime:'60min', location:'家/外食', origin:'新疆', shopHint:'整鸡（解冻）、土豆、辣椒、宽面条' },
  { id:'r014', name:'排骨藕汤+米饭', emoji:'🦴', category:'rice', kcal:660, desc:'炖到软烂的排骨配莲藕，汤清味鲜', difficulty:'中等', cookTime:'90min', location:'家', origin:'通用', shopHint:'猪排骨（解冻）、莲藕' },
  { id:'r015', name:'剁椒鱼头+米饭', emoji:'🌶️', category:'rice', kcal:580, desc:'剁椒蒸鱼头，鲜辣十足，湘菜灵魂', difficulty:'中等', cookTime:'35min', location:'家/外食', origin:'湘菜', shopHint:'鱼头（解冻）、剁椒、葱姜蒜' },
  { id:'r016', name:'糖醋里脊+米饭', emoji:'🍬', category:'rice', kcal:680, desc:'酸甜酥脆，老少皆宜，聚餐必备', difficulty:'中等', cookTime:'35min', location:'家/外食', origin:'家常', shopHint:'猪里脊（解冻）、番茄酱、白醋' },
  { id:'r017', name:'黄焖鸡米饭', emoji:'🐔', category:'rice', kcal:680, desc:'浓郁酱汁焖鸡块，配米饭一绝，懒人神菜', difficulty:'简单', cookTime:'40min', location:'家/外食', origin:'家常', shopHint:'鸡腿肉（解冻）、黄焖鸡料包、土豆' },
  { id:'r018', name:'水煮鱼+米饭', emoji:'🐟', category:'rice', kcal:640, desc:'花椒麻辣，鱼片嫩滑，川菜豪华版', difficulty:'中等', cookTime:'40min', location:'家/外食', origin:'川菜', shopHint:'草鱼片（解冻）、豆芽、豆瓣酱、花椒' },
  { id:'r019', name:'东坡肉+米饭', emoji:'🍖', category:'rice', kcal:780, desc:'绍兴黄酒慢炖五花肉，入口即化', difficulty:'复杂', cookTime:'120min', location:'家/外食', origin:'浙菜', shopHint:'五花肉（解冻）、黄酒、冰糖' },
  { id:'r020', name:'海南鸡饭', emoji:'🍚', category:'rice', kcal:580, desc:'白切鸡+鸡油米饭+葱姜蘸料，简单正宗', difficulty:'中等', cookTime:'50min', location:'家/外食', origin:'南洋', shopHint:'整鸡/鸡腿（解冻）、姜、葱' },
  // === 火锅/麻辣烫 ===
  { id:'h001', name:'重庆火锅', emoji:'🫕', category:'hotpot', kcal:800, desc:'牛油红汤，毛肚鸭肠虾滑，麻辣过瘾，冬天必备', difficulty:'简单', cookTime:'30min', location:'外食/家', origin:'重庆', shopHint:'火锅底料（牛油款）、各种食材' },
  { id:'h002', name:'潮汕牛肉火锅', emoji:'🥩', category:'hotpot', kcal:650, desc:'清汤锅，鲜切牛肉嫩滑，蘸沙茶酱', difficulty:'简单', cookTime:'20min', location:'外食', origin:'广东', shopHint:'新鲜牛肉片、清汤锅底、沙茶酱' },
  { id:'h003', name:'麻辣烫', emoji:'🌶️', category:'hotpot', kcal:580, desc:'自选食材涮一涮，酱料自己调，随心所欲', difficulty:'简单', cookTime:'20min', location:'外食/家', origin:'川菜', shopHint:'麻辣烫底料、各种丸子蔬菜豆腐' },
  { id:'h004', name:'冒菜', emoji:'🥘', category:'hotpot', kcal:620, desc:'一人份火锅，食材下锅过一遍再装碗', difficulty:'简单', cookTime:'20min', location:'外食', origin:'成都', shopHint:'冒菜底料、各种食材' },
  { id:'h005', name:'串串香', emoji:'🍢', category:'hotpot', kcal:700, desc:'竹签串各种食材，麻辣红汤涮，成都街头味道', difficulty:'简单', cookTime:'20min', location:'外食', origin:'成都', shopHint:'各种串串食材' },
  { id:'h006', name:'酸菜白肉锅', emoji:'🥬', category:'hotpot', kcal:560, desc:'酸菜+五花肉，东北火锅，酸爽解腻', difficulty:'简单', cookTime:'30min', location:'家', origin:'东北', shopHint:'东北酸菜、五花肉（解冻）、粉条' },
  { id:'h007', name:'番茄鱼火锅', emoji:'🍅', category:'hotpot', kcal:520, desc:'番茄清汤底，鱼片豆腐蔬菜，酸甜鲜美', difficulty:'简单', cookTime:'25min', location:'家', origin:'通用', shopHint:'番茄火锅底料、鱼片（解冻）、豆腐' },
  { id:'h008', name:'猪肚鸡火锅', emoji:'🐔', category:'hotpot', kcal:680, desc:'猪肚鸡汤底，胡椒鲜香，广东人的冬天', difficulty:'中等', cookTime:'60min', location:'外食', origin:'广东', shopHint:'猪肚（解冻）、整鸡（解冻）、白胡椒' },
  // === 烧烤 ===
  { id:'b001', name:'新疆烤羊肉串', emoji:'🍖', category:'bbq', kcal:420, desc:'孜然辣椒撒上去，炭火滋滋，新疆才是yyds', difficulty:'中等', cookTime:'30min', location:'外食/家', origin:'新疆', shopHint:'羊肉（解冻）、孜然、辣椒面、串签' },
  { id:'b002', name:'烤鸡翅', emoji:'🍗', category:'bbq', kcal:380, desc:'蜜汁腌制，烤到金黄焦脆，啤酒绝配', difficulty:'简单', cookTime:'30min', location:'家/外食', origin:'通用', shopHint:'鸡翅（解冻）、蜂蜜、酱油、孜然' },
  { id:'b003', name:'烤生蚝', emoji:'🦪', category:'bbq', kcal:180, desc:'蒜蓉粉丝烤生蚝，鲜甜多汁，海边的味道', difficulty:'简单', cookTime:'15min', location:'外食', origin:'通用', shopHint:'新鲜生蚝、蒜末、粉丝、小米辣' },
  { id:'b004', name:'韩式烤肉', emoji:'🥩', category:'bbq', kcal:560, desc:'五花肉+生菜包裹，蘸辣酱，包一口塞进嘴', difficulty:'简单', cookTime:'20min', location:'外食', origin:'韩国', shopHint:'五花肉（解冻）、生菜、辣酱' },
  { id:'b005', name:'烤玉米', emoji:'🌽', category:'bbq', kcal:200, desc:'刷黄油撒椒盐，烤到微焦，甜香扑鼻', difficulty:'简单', cookTime:'20min', location:'家/外食', origin:'通用', shopHint:'玉米、黄油、椒盐' },
  { id:'b006', name:'烤茄子', emoji:'🍆', category:'bbq', kcal:160, desc:'蒜蓉烤茄子，软糯鲜香，下酒小菜', difficulty:'简单', cookTime:'25min', location:'家/外食', origin:'通用', shopHint:'茄子、蒜、小米辣、生抽' },
  { id:'b007', name:'烤羊排', emoji:'🍖', category:'bbq', kcal:580, desc:'孜然香料腌制，烤架上滋滋作响，豪爽霸气', difficulty:'中等', cookTime:'40min', location:'外食', origin:'新疆/蒙古', shopHint:'羊排（解冻）、孜然、迷迭香' },
  { id:'b008', name:'烤鱿鱼', emoji:'🦑', category:'bbq', kcal:280, desc:'整条鱿鱼刷酱烤，嚼劲十足，配啤酒', difficulty:'简单', cookTime:'15min', location:'外食', origin:'通用', shopHint:'鱿鱼（解冻）、甜辣酱、孜然' },
  // === 西餐 ===
  { id:'w001', name:'牛排+沙拉', emoji:'🥩', category:'western', kcal:540, desc:'三分熟牛排配新鲜沙拉，蛋白质与维生素完美组合', difficulty:'中等', cookTime:'30min', location:'家/外食', origin:'西餐', shopHint:'牛排（解冻）、生菜、番茄、油醋汁' },
  { id:'w002', name:'番茄肉酱意面', emoji:'🍝', category:'western', kcal:640, desc:'经典意大利肉酱，番茄酸与肉香完美融合', difficulty:'中等', cookTime:'40min', location:'家', origin:'意大利', shopHint:'意大利面、猪肉末、番茄罐头' },
  { id:'w003', name:'奶油蘑菇意面', emoji:'🍄', category:'western', kcal:700, desc:'浓郁奶油酱配蘑菇，满满的幸福感', difficulty:'中等', cookTime:'30min', location:'家', origin:'意大利', shopHint:'意大利面、蘑菇、淡奶油、蒜' },
  { id:'w004', name:'汉堡', emoji:'🍔', category:'western', kcal:660, desc:'手工牛肉饼夹生菜番茄，配薯条', difficulty:'中等', cookTime:'30min', location:'家/外食', origin:'美式', shopHint:'牛肉末（解冻）、汉堡胚、生菜' },
  { id:'w005', name:'披萨', emoji:'🍕', category:'western', kcal:730, desc:'自制饼底或买现成，各种口味随心配', difficulty:'中等', cookTime:'45min', location:'家/外食', origin:'意大利', shopHint:'披萨饼底、番茄酱、马苏里拉奶酪' },
  { id:'w006', name:'三明治', emoji:'🥪', category:'western', kcal:400, desc:'吐司夹各种馅料，早餐午餐随意搭', difficulty:'简单', cookTime:'10min', location:'家', origin:'西餐', shopHint:'吐司、鸡蛋、生菜、番茄' },
  { id:'w007', name:'法式炖牛肉', emoji:'🥘', category:'western', kcal:660, desc:'红酒炖牛肉配蔬菜，慢炖后香气四溢', difficulty:'复杂', cookTime:'120min', location:'家', origin:'法式', shopHint:'牛腩（解冻）、红酒、迷迭香、土豆' },
  { id:'w008', name:'芝士焗饭', emoji:'🧀', category:'western', kcal:660, desc:'米饭铺番茄肉酱，盖满芝士进烤箱，拉丝爆浆', difficulty:'简单', cookTime:'30min', location:'家', origin:'西餐', shopHint:'米饭、猪肉末、番茄、马苏里拉奶酪' },
  { id:'w009', name:'日式拉面', emoji:'🍜', category:'western', kcal:680, desc:'浓郁猪骨汤，叉烧溏心蛋海苔，日本街头感', difficulty:'复杂', cookTime:'120min', location:'家/外食', origin:'日本', shopHint:'拉面、猪骨（解冻）、叉烧、溏心蛋、海苔' },
  { id:'w010', name:'寿司拼盘', emoji:'🍱', category:'western', kcal:480, desc:'金枪鱼三文鱼虾仁，一盘下去仪式感满满', difficulty:'中等', cookTime:'30min', location:'家/外食', origin:'日本', shopHint:'寿司饭、海苔、各种生鱼片、芥末酱油' },
  { id:'w011', name:'石锅拌饭', emoji:'🍚', category:'western', kcal:560, desc:'热石锅底部形成锅巴，蔬菜牛肉拌饭，韩式经典', difficulty:'中等', cookTime:'30min', location:'家/外食', origin:'韩国', shopHint:'米饭、牛肉末（解冻）、各种蔬菜、辣酱' },
  { id:'w012', name:'泰式绿咖喱', emoji:'🟢', category:'western', kcal:620, desc:'椰奶绿咖喱配鸡肉，东南亚风情，香气独特', difficulty:'中等', cookTime:'35min', location:'家', origin:'泰国', shopHint:'绿咖喱酱、椰浆、鸡腿肉（解冻）、茄子' },
  { id:'w013', name:'越南河粉', emoji:'🍵', category:'western', kcal:450, desc:'清澈牛骨汤，细嫩河粉，加薄荷罗勒，清爽', difficulty:'中等', cookTime:'60min', location:'家/外食', origin:'越南', shopHint:'河粉、牛腱子（解冻）、豆芽、薄荷' },
  { id:'w014', name:'印度咖喱鸡', emoji:'🍛', category:'western', kcal:650, desc:'香料浓郁，洋葱番茄咖喱底，配印度烤饼', difficulty:'中等', cookTime:'45min', location:'家', origin:'印度', shopHint:'鸡腿肉（解冻）、咖喱粉、椰奶、洋葱' },
  // === 健身餐 ===
  { id:'f001', name:'鸡胸肉时蔬沙拉', emoji:'🥗', category:'fitness', kcal:340, desc:'水煮鸡胸+各种蔬菜+油醋汁，高蛋白低脂', difficulty:'简单', cookTime:'20min', location:'家', origin:'健身餐', shopHint:'鸡胸肉、混合生菜、黄瓜、油醋汁' },
  { id:'f002', name:'溏心蛋藜麦碗', emoji:'🥚', category:'fitness', kcal:410, desc:'半熟蛋+鸡胸+藜麦+蔬菜，营养全面', difficulty:'简单', cookTime:'20min', location:'家', origin:'健身餐', shopHint:'鸡蛋、鸡胸肉、藜麦、混合蔬菜' },
  { id:'f003', name:'烤鸡腿+烤蔬菜', emoji:'🍗', category:'fitness', kcal:470, desc:'迷迭香烤鸡腿配彩椒洋葱，烤箱省心健康', difficulty:'简单', cookTime:'40min', location:'家', origin:'健身餐', shopHint:'鸡腿（解冻）、彩椒、洋葱、迷迭香' },
  { id:'f004', name:'牛油果吐司', emoji:'🥑', category:'fitness', kcal:370, desc:'牛油果+溏心蛋+全麦吐司，精致早餐', difficulty:'简单', cookTime:'10min', location:'家', origin:'健身餐', shopHint:'牛油果、全麦吐司、鸡蛋' },
  { id:'f005', name:'蒸蛋+蒸鱼+糙米饭', emoji:'🐟', category:'fitness', kcal:460, desc:'三蒸一饭，简单干净，健康无负担', difficulty:'简单', cookTime:'30min', location:'家', origin:'健身餐', shopHint:'鸡蛋、鲈鱼（解冻）、糙米' },
  { id:'f006', name:'希腊酸奶水果碗', emoji:'🫐', category:'fitness', kcal:280, desc:'高蛋白酸奶+蓝莓草莓坚果，轻盈早餐', difficulty:'简单', cookTime:'5min', location:'家', origin:'健身餐', shopHint:'希腊酸奶、各种水果、坚果' },
  { id:'f007', name:'金枪鱼全麦三明治', emoji:'🥪', category:'fitness', kcal:350, desc:'罐头金枪鱼+生菜+全麦面包，随手搞定午餐', difficulty:'简单', cookTime:'5min', location:'家', origin:'健身餐', shopHint:'金枪鱼罐头、全麦吐司、生菜、番茄' },
  { id:'f008', name:'虾仁西蓝花', emoji:'🦐', category:'fitness', kcal:300, desc:'虾仁高蛋白，西蓝花抗氧化，清爽家常菜', difficulty:'简单', cookTime:'15min', location:'家', origin:'健身餐', shopHint:'虾仁（解冻）、西蓝花、蒜' },
];

// ---- 面条浇头 ----
const NOODLE_TOPPINGS = [
  { id:'t001', name:'西红柿鸡蛋', emoji:'🍅', desc:'黄金搭档，汤面拌面皆宜', type:'both', kcal:110 },
  { id:'t002', name:'炸酱', emoji:'🫙', desc:'豆瓣酱炒肉末，浓香下面', type:'dry', kcal:220 },
  { id:'t003', name:'韭菜香菇', emoji:'🍄', desc:'鲜香素浇头，清爽不腻', type:'both', kcal:75 },
  { id:'t004', name:'辣椒炒肉', emoji:'🌶️', desc:'青椒+猪肉，微辣鲜香', type:'both', kcal:190 },
  { id:'t005', name:'肉臊子', emoji:'🥩', desc:'陕西岐山式，加醋加辣子', type:'both', kcal:230 },
  { id:'t006', name:'过油羊肉', emoji:'🐑', desc:'新疆拌面经典，洋葱羊肉', type:'dry', kcal:290 },
  { id:'t007', name:'素炒豆角辣椒', emoji:'🥦', desc:'新疆素拌面清爽版', type:'dry', kcal:80 },
  { id:'t008', name:'油泼辣子', emoji:'🌶️', desc:'陕西灵魂，油泼面专属', type:'dry', kcal:160 },
  { id:'t009', name:'三鲜（木耳黄花蛋）', emoji:'🥚', desc:'陕西传统臊子配料', type:'both', kcal:130 },
  { id:'t010', name:'肉末茄子', emoji:'🍆', desc:'软糯鲜香，南北皆宜', type:'both', kcal:160 },
  { id:'t011', name:'酸豆角肉末', emoji:'🟢', desc:'酸爽开胃，湘味', type:'dry', kcal:145 },
  { id:'t012', name:'麻辣肉末', emoji:'🌶️', desc:'花椒+豆瓣酱，川味香麻', type:'both', kcal:200 },
  { id:'t013', name:'荷包蛋', emoji:'🍳', desc:'最简单最治愈的选择', type:'both', kcal:90 },
  { id:'t014', name:'牛肉番茄', emoji:'🍅', desc:'牛腩炖番茄，浓郁汤底', type:'soup', kcal:200 },
  { id:'t015', name:'蒜薹炒肉', emoji:'🌿', desc:'香嫩可口，配汤面绝佳', type:'both', kcal:175 },
  { id:'t016', name:'雪菜肉末', emoji:'🥬', desc:'雪里蕻咸鲜，上海风味', type:'dry', kcal:130 },
  { id:'t017', name:'榨菜肉丝', emoji:'🟫', desc:'榨菜咸脆，猪肉丝鲜嫩', type:'both', kcal:140 },
];

const NOODLE_TYPES = [
  { name:'手擀宽面', kcal:220 },{ name:'细挂面', kcal:200 },
  { name:'新疆拉条子', kcal:280 },{ name:'空心挂面', kcal:195 },
  { name:'裤带面', kcal:250 },{ name:'刀削面', kcal:230 },
];

// ---- 米饭配菜数据库 ----
const RICE_COMBOS = {
  proteins: [
    { name:'红烧肉', emoji:'🍖', kcal:380, cuisine:'家常', shopHint:'五花肉（解冻）' },
    { name:'可乐鸡翅', emoji:'🍗', kcal:280, cuisine:'家常', shopHint:'鸡翅（解冻）、可乐' },
    { name:'宫保鸡丁', emoji:'🌶️', kcal:260, cuisine:'川菜', shopHint:'鸡胸肉、花生、干辣椒' },
    { name:'回锅肉', emoji:'🥩', kcal:340, cuisine:'川菜', shopHint:'五花肉（解冻）、青蒜' },
    { name:'鱼香肉丝', emoji:'🐟', kcal:240, cuisine:'川菜', shopHint:'猪里脊（解冻）、木耳' },
    { name:'清蒸鲈鱼', emoji:'🐠', kcal:200, cuisine:'粤菜', shopHint:'鲈鱼（解冻）' },
    { name:'红烧排骨', emoji:'🦴', kcal:360, cuisine:'家常', shopHint:'猪排骨（解冻）' },
    { name:'剁椒鱼头', emoji:'🌶️', kcal:280, cuisine:'湘菜', shopHint:'鱼头（解冻）、剁椒' },
    { name:'黄焖鸡', emoji:'🐔', kcal:290, cuisine:'家常', shopHint:'鸡腿肉（解冻）' },
    { name:'糖醋里脊', emoji:'🍬', kcal:350, cuisine:'家常', shopHint:'猪里脊（解冻）' },
    { name:'手抓羊肉', emoji:'🐑', kcal:380, cuisine:'新疆', shopHint:'羊排（解冻）' },
    { name:'三杯鸡', emoji:'🍗', kcal:310, cuisine:'台式', shopHint:'鸡腿（解冻）、九层塔' },
    { name:'土豆炖牛肉', emoji:'🥔', kcal:320, cuisine:'家常', shopHint:'牛腩（解冻）、土豆' },
    { name:'粉蒸肉', emoji:'🥩', kcal:420, cuisine:'家常', shopHint:'五花肉（解冻）、蒸肉粉' },
    { name:'蒜泥白肉', emoji:'🧄', kcal:300, cuisine:'川菜', shopHint:'五花肉（解冻）' },
    { name:'水煮鱼', emoji:'🐟', kcal:380, cuisine:'川菜', shopHint:'草鱼片（解冻）、豆芽' },
    { name:'新疆大盘鸡', emoji:'🐔', kcal:420, cuisine:'新疆', shopHint:'整鸡（解冻）、土豆' },
  ],
  vegetables: [
    { name:'炒时令青菜', emoji:'🥬', kcal:60, cuisine:'通用' },
    { name:'麻婆豆腐', emoji:'🌶️', kcal:160, cuisine:'川菜', shopHint:'嫩豆腐、豆瓣酱' },
    { name:'地三鲜', emoji:'🍆', kcal:150, cuisine:'东北菜', shopHint:'茄子、土豆、青椒' },
    { name:'干煸四季豆', emoji:'🫘', kcal:140, cuisine:'川菜', shopHint:'四季豆、猪肉末' },
    { name:'蒜蓉西兰花', emoji:'🥦', kcal:70, cuisine:'通用', shopHint:'西兰花、蒜' },
    { name:'醋溜土豆丝', emoji:'🥔', kcal:120, cuisine:'家常' },
    { name:'西红柿炒蛋', emoji:'🍳', kcal:150, cuisine:'通用' },
    { name:'蒜苔炒肉', emoji:'🌿', kcal:180, cuisine:'通用', shopHint:'蒜苔、猪肉' },
    { name:'清炒荷兰豆', emoji:'🫛', kcal:80, cuisine:'粤菜' },
    { name:'韭菜炒鸡蛋', emoji:'🥚', kcal:130, cuisine:'通用', shopHint:'韭菜、鸡蛋' },
    { name:'辣炒藕片', emoji:'🪷', kcal:110, cuisine:'湘菜', shopHint:'莲藕' },
    { name:'农家小炒肉', emoji:'🌶️', kcal:200, cuisine:'湘菜', shopHint:'猪肉、青椒' },
    { name:'蚝油生菜', emoji:'🥬', kcal:80, cuisine:'粤菜', shopHint:'生菜、蚝油' },
    { name:'虎皮青椒', emoji:'🫑', kcal:90, cuisine:'家常' },
  ],
  cold: [
    { name:'凉拌黄瓜', emoji:'🥒', kcal:40, cuisine:'通用' },
    { name:'拍黄瓜', emoji:'🥒', kcal:35, cuisine:'通用' },
    { name:'凉拌木耳', emoji:'🍄', kcal:50, cuisine:'通用' },
    { name:'口水鸡', emoji:'🐔', kcal:220, cuisine:'川菜', shopHint:'鸡腿（解冻）' },
    { name:'皮蛋豆腐', emoji:'🥚', kcal:100, cuisine:'通用', shopHint:'皮蛋、嫩豆腐' },
    { name:'凉拌豆腐', emoji:'⬜', kcal:90, cuisine:'通用' },
    { name:'夫妻肺片', emoji:'🥩', kcal:200, cuisine:'川菜' },
    { name:'凉拌粉皮', emoji:'🍜', kcal:120, cuisine:'通用', shopHint:'干粉皮' },
  ],
  soups: [
    { name:'番茄蛋花汤', emoji:'🍅', kcal:80, cuisine:'通用' },
    { name:'冬瓜排骨汤', emoji:'🍲', kcal:150, cuisine:'通用', shopHint:'冬瓜、猪排骨（解冻）' },
    { name:'紫菜蛋花汤', emoji:'🌊', kcal:60, cuisine:'通用', shopHint:'紫菜' },
    { name:'玉米排骨汤', emoji:'🌽', kcal:180, cuisine:'通用', shopHint:'玉米、猪排骨（解冻）' },
    { name:'酸辣汤', emoji:'🌶️', kcal:110, cuisine:'川菜', shopHint:'木耳、豆腐、鸡蛋' },
    { name:'西湖牛肉羹', emoji:'🥩', kcal:130, cuisine:'浙菜', shopHint:'牛肉末（解冻）' },
    { name:'菠菜豆腐汤', emoji:'🥬', kcal:80, cuisine:'通用', shopHint:'菠菜、豆腐' },
    { name:'莲藕花生汤', emoji:'🥜', kcal:200, cuisine:'粤菜', shopHint:'莲藕、花生' },
  ],
};
const RICE_BASE_KCAL = 195;

// ---- 育儿里程碑（扩充版）----
const PARENTING_MILESTONES = {
  '0-4weeks': {
    title:'新生儿期 (0-4周)',
    milestones:[
      '👁️ 能短暂注视 20-30cm 内的人脸',
      '👂 对声音有反应，听到父母声音会停哭',
      '🤜 抓握反射：碰触手心自动握紧',
      '🍼 每2-3小时需喂养一次（含夜间）',
      '😴 每天睡16-18小时，分多次小睡',
      '😭 哭声是唯一交流方式，逐渐分辨不同哭声',
      '👃 嗅觉灵敏，能识别妈妈气味',
    ],
    tips:[
      '✨ EASY程序：吃→玩→睡，每轮约2.5-3小时',
      '🚫 不要把"喂奶"作为入睡最后步骤，避免奶睡依赖',
      '🎵 白噪音（60分贝）能有效安抚新生儿',
      '🤱 母乳每侧10-20分钟，注意有效吸吮',
      '🛏️ 安全睡眠：仰卧、独立床、无枕头无毛绒玩具',
    ],
  },
  '1-2months': {
    title:'第1-2个月',
    milestones:[
      '😊 社会性微笑出现（约6-8周）',
      '👁️ 眼睛能追踪移动物体180°',
      '💬 开始发出"啊啊""咿咿"等咿呀声',
      '💪 俯卧时能短暂抬起头',
      '🤝 清醒时间延长到45-60分钟',
      '🌙 夜间可能连睡3-4小时',
      '🖐️ 双手握拳反射开始减弱',
    ],
    tips:[
      '📅 EASY：2.5-3小时一轮，逐渐稳定',
      '🎭 面对面互动是最好的玩具——说话、做表情',
      '🧸 Tummy Time每天3-4次，每次5-10分钟',
      '😴 识别困倦信号：揉眼、打哈欠、眼神涣散',
      '⚠️ 6周前后猛涨期，食量增加属正常',
    ],
  },
  '2-3months': {
    title:'第2-3个月',
    milestones:[
      '😆 笑声出现，会被逗笑！',
      '🗣️ 咿呀学语增多，会回应说话',
      '👀 认出熟悉面孔',
      '💪 俯卧能抬头45°，手臂撑起上身',
      '🖐️ 开始挥舞双手触碰目标',
      '😴 夜间睡眠逐渐延长至5-6小时',
      '🎯 手眼协调开始发育',
    ],
    tips:[
      '📅 EASY：3小时一轮，白天3-4次小睡',
      '🎵 唱歌读绘本讲故事——越早越好',
      '🪁 悬挂玩具（距眼睛30cm）刺激视觉',
      '😴 开始建立睡眠仪式：洗澡→按摩→喂奶→睡',
    ],
  },
  '3-4months': {
    title:'第3-4个月',
    milestones:[
      '🤣 大笑出现，喜欢被逗弄',
      '🙌 双手能在身体中线相触',
      '👄 开始把东西往嘴里放（出牙准备）',
      '💪 俯卧能抬头90°，撑起胸部',
      '🔄 可能开始学习翻身（从侧到仰）',
      '👁️ 对颜色和图案兴趣增加',
    ],
    tips:[
      '📅 EASY：3-3.5小时一轮，可能减少到3次白天小睡',
      '🦷 备好牙胶，出牙期流口水是正常的',
      '🎭 镜子游戏：让宝宝看自己的镜像',
      '📚 每天坚持读绘本，哪怕只有5分钟',
    ],
  },
  '4-6months': {
    title:'第4-6个月',
    milestones:[
      '🔄 能完整翻身（从仰到俯）',
      '🤲 能抓握和摇晃玩具',
      '💬 发出更多音节，开始"baba""mama"音',
      '💪 坐立时头部稳定',
      '🍴 对大人食物表现出兴趣（辅食信号）',
      '😰 可能出现认生反应',
    ],
    tips:[
      '🍴 6个月左右可引入辅食，首选强化铁米粉',
      '💉 准备好6个月的疫苗接种',
      '🪑 开始练习辅助坐立',
      '🎵 继续丰富语言环境，多描述周围事物',
    ],
  },
};

const EASY_GUIDE = {
  eat: { icon:'🍼', title:'E — 吃 (Eat)', content:`每次进食要让宝宝吃饱（不要"零食式"喂养）。\n母乳每侧10-20分钟，观察宝宝吞咽声。\n配方奶参考：每公斤体重每天约150ml。\n喂奶后竖抱10-15分钟拍嗝。\n⚠️ 关键原则：吃奶不等于睡觉，不要在半睡半醒时喂奶。` },
  activity: { icon:'🎮', title:'A — 玩 (Activity)', content:`清醒时间是大脑发育的黄金期。\n0-1月：换尿布、洗澡、抱抱、对话就是最好的活动。\n1-2月：Tummy Time、追视玩具、面对面互动。\n2-4月：悬挂玩具、镜子游戏、故事绘本。\n✨ 读懂"过度刺激"信号：转头、哭闹、眼神飘散→立刻减少刺激。` },
  sleep: { icon:'😴', title:'S — 睡 (Sleep)', content:`在宝宝"犯困但未睡着"时放入床。\n这是培养自主入睡的关键——不抱不摇！\n使用白噪音（约60分贝）帮助入睡。\n观察困倦信号：揉眼、打哈欠、眼神发呆→立刻行动。\n⚠️ 新生儿清醒超1.5-2小时通常已过度疲劳。` },
  youTime: { icon:'☕', title:'Y — 你的时光 (Your Time)', content:`宝宝睡着了，这段时间属于你！\n不要只用来做家务——照顾好自己才能更好照顾宝宝。\n喝杯热茶、小睡20分钟都有用。\n✨ 产后妈妈特别提醒：情绪波动是正常的，有感觉请说出来。\n爸爸妈妈轮流休息，不要让一方独撑。` },
};

const SCIENCE_TIPS = [
  { icon:'🤱', tip:'母乳按需哺乳是最科学的，1个月内不必严格限制频次（AAP建议）' },
  { icon:'😴', tip:'新生儿需要16-18小时睡眠，白天小睡不会影响夜间睡眠' },
  { icon:'🌡️', tip:'宝宝手脚凉不代表冷，摸后背颈部才是测温正确方法' },
  { icon:'🛏️', tip:'安全睡眠：仰卧、独立空间、无枕头，预防SIDS（美国儿科学会）' },
  { icon:'💉', tip:'按时接种疫苗，这是保护宝宝最有效的科学手段（WHO全球建议）' },
  { icon:'🧠', tip:'说话、唱歌、读书——语言输入越早越多，大脑发育越好（哈佛大学研究）' },
  { icon:'🤗', tip:'多抱抱不会"宠坏"宝宝，皮肤接触能降低应激激素（崔玉涛）' },
  { icon:'😭', tip:'哭声是语言，积极回应能建立安全依恋（依恋理论）' },
  { icon:'🚿', tip:'新生儿不需要每天洗澡，每周2-3次即可' },
  { icon:'💊', tip:'1岁前严禁食用蜂蜜（肉毒杆菌风险）' },
  { icon:'📱', tip:'2岁前应避免屏幕暴露（视频通话除外）—— AAP建议' },
  { icon:'🌡️', tip:'腋温超38°C或宝宝状态差，应及时就医' },
  { icon:'🍎', tip:'6个月起引入辅食，首选强化铁米粉，每次只引入一种新食物（WHO）' },
  { icon:'🦷', tip:'第一颗牙萌出后即可开始用软毛牙刷清洁，不用牙膏' },
  { icon:'🧘', tip:'产后抑郁很常见，妈妈的心理健康和宝宝一样重要，及时寻求支持' },
];

// ---- 育儿问答数据库（100+ 条）----
const PARENTING_QA = [
  // === 哭闹与安抚 ===
  { id:'q001', tags:['哭','哭闹','不停哭','安抚','黄昏闹'], category:'日常护理',
    question:'宝宝哭个不停怎么办？',
    answer:'按顺序排查：①饥饿（距上次喂奶超2小时）②尿布湿了 ③需要安抚/拥抱 ④过度疲劳（清醒超1.5小时）⑤胀气不适。傍晚5-8点的"黄昏闹"是新生儿常见现象，通常3个月后自然好转。5S安抚法：包裹(Swaddle)→侧/俯卧(Side)→嘘声(Shush)→摇晃(Swing)→吸吮(Suck)。' },
  { id:'q002', tags:['高声哭','尖叫','突然大哭','肠绞痛'], category:'日常护理',
    question:'宝宝突然尖声哭、像很痛怎么回事？',
    answer:'可能原因：①肠绞痛（3个月内常见，傍晚多发，双腿蜷缩）②头发/纤维缠绕手指脚趾（立即检查！）③疝气嵌顿（腹股沟有突起，需立即就医）④耳朵感染（拉扯耳朵）。若排查正常但哭声持续超2小时或伴发烧呕吐，就医。' },
  // === 睡眠 ===
  { id:'q003', tags:['奶睡','抱睡','戒奶睡','入睡习惯'], category:'睡眠',
    question:'宝宝奶睡/抱睡怎么纠正？',
    answer:'奶睡会让宝宝把"喂奶"和"入睡"绑定。纠正方法：①喂奶后不要让宝宝完全睡着，保持半清醒放入床；②使用白噪音替代安抚；③逐渐缩短喂奶到入睡的时间间隔；④保持一致的入睡仪式（洗澡→按摩→喂奶→放床）。1个月内暂不强求，2个月起开始引导。' },
  { id:'q004', tags:['睡眠','睡眠程序','睡前','仪式'], category:'睡眠',
    question:'如何建立睡眠程序？',
    answer:'固定顺序的睡前仪式帮助宝宝建立"要睡觉了"的信号联系。推荐步骤：①温水浴（5-10分钟）→ ②轻柔按摩 → ③换睡衣 → ④喂奶（保持清醒！）→ ⑤白噪音 → ⑥放入床。关键：每天相同时间、相同顺序。2个月起开始建立，3-4个月效果明显。' },
  { id:'q005', tags:['白噪音','哄睡','噪音'], category:'睡眠',
    question:'白噪音有用吗？',
    answer:'科学有效！白噪音模拟子宫内声音环境。使用建议：①音量控制在50-60分贝；②距宝宝至少1米；③整夜或只用于入睡均可；④可选择：吹风机声、风扇声、流水声、白噪音App。6个月后可逐步降低音量。' },
  { id:'q006', tags:['夜醒','夜间','醒太多','不睡整觉'], category:'睡眠',
    question:'宝宝夜醒太多怎么办？',
    answer:'0-3个月夜醒属正常（需2-3次喂奶）。减少夜醒的方法：①建立稳定的日间EASY程序；②区分"清醒"和"动静"——宝宝夜间有声音不一定是醒了；③尝试"消退法"或"逐步撤退法"（3个月后）；④确保白天摄奶量充足。3个月后可尝试拉长夜间喂奶间隔。' },
  { id:'q007', tags:['小睡','白天睡','睡眠退行','睡少'], category:'睡眠',
    question:'宝宝白天小睡很短怎么办？',
    answer:'"45分钟小睡"是常见问题——宝宝睡一个睡眠周期（约45分钟）就醒了。改善方法：①确保入睡环境够暗够安静；②使用白噪音；③在宝宝醒前10分钟轻轻安抚（5分钟法则）；④保证清醒窗口不超过年龄对应时间。需要1-2周持续训练才能看到改善。' },
  // === 喂养 ===
  { id:'q008', tags:['吃饱','奶量','是否够吃','饥饿信号'], category:'喂养',
    question:'如何判断宝宝是否吃饱了？',
    answer:'喂饱的信号：①自动松开乳头或奶嘴；②喂后满足安静；③每天至少6-8片湿尿布；④体重按预期增长（出生后每周约增150-200g）。过度喂养信号：吐奶频繁、腹部膨胀、喂奶后仍哭闹。' },
  { id:'q009', tags:['猛涨期','频繁吃奶','奶不够','三周六周'], category:'喂养',
    question:'什么是猛涨期？',
    answer:'宝宝快速发育期，通常在3周、6周、3个月、6个月出现。表现：比平时更频繁要吃奶、烦躁爱哭、睡眠变差。这是正常现象，不代表奶不够！母乳妈妈要多喂，供需会自动平衡。通常持续2-7天后恢复正常。' },
  { id:'q010', tags:['吐奶','溢奶','喷射吐奶'], category:'喂养',
    question:'宝宝吐奶怎么办？',
    answer:'溢奶（少量从嘴角流出）是正常的。预防：①喂奶后竖抱拍嗝15分钟；②不要喂完立即洗澡或摇晃；③喂奶时角度45°。需就医：①喷射性呕吐；②吐奶量很大且频繁；③体重不增长；④吐出物带血或黄绿色。' },
  { id:'q011', tags:['奶量','追奶','奶少','增加奶量'], category:'喂养',
    question:'奶量不够如何追奶？',
    answer:'科学追奶：①按需哺乳，宝宝越吸越多；②每次喂奶后排空乳房；③保证自己充分休息和水分摄入；④不要过早引入配方奶；⑤多和宝宝肌肤接触。判断奶量够不够看宝宝：每天6+片湿尿布+体重增长正常。' },
  { id:'q012', tags:['奶粉','冲泡','配方奶','温度'], category:'喂养',
    question:'奶粉如何正确冲调？',
    answer:'标准步骤：①烧开水冷却至70°C；②按说明书比例先加水后加粉；③盖好摇匀；④冷却至37°C后喂。注意：①不用矿泉水；②不要加糖；③冲好的奶粉2小时内喝完；④每次不要冲太多。' },
  { id:'q013', tags:['母乳储存','储奶','冷冻','解冻'], category:'喂养',
    question:'母乳如何储存？',
    answer:'储奶规则：室温(25°C以下)：4小时；冰箱冷藏：最长4天；冰箱冷冻：6个月。解冻方法：冷藏区缓慢解冻 或 温水浴加热（不可微波炉！）。解冻后24小时内使用，不可重新冷冻。' },
  { id:'q014', tags:['辅食','添加辅食','第一口','米粉'], category:'喂养',
    question:'什么时候开始加辅食，怎么加？',
    answer:'辅食引入时机（需同时满足）：①月龄满6个月；②能扶坐保持头部稳定；③对食物表现出兴趣；④挺舌反射消退。第一口推荐：强化铁婴儿米粉（用母乳/配方奶调成糊状）。原则：每次只引入一种新食物，观察3-5天有无过敏反应，再引入下一种。' },
  { id:'q015', tags:['安抚奶嘴','奶嘴','使用','戒断'], category:'喂养',
    question:'安抚奶嘴能用吗？',
    answer:'可以使用。好处：安抚效果好，可降低SIDS风险。注意：①母乳宝宝建议4-6周后再引入；②每次使用后消毒；③不要在奶嘴上涂糖；④6个月后逐渐减少使用。有的宝宝不接受是正常的。' },
  // === 消化与大便 ===
  { id:'q016', tags:['胀气','肠绞痛','肚子咕噜','腿蜷缩'], category:'日常护理',
    question:'宝宝胀气/肠绞痛怎么办？',
    answer:'表现：腿蜷缩、腹部鼓胀、大哭难安、放屁后好转。缓解：①顺时针腹部按摩；②飞机抱（腹部朝下趴在手臂上）；③温暖毛巾敷肚子；④喂奶后充分拍嗝；⑤母乳妈妈减少十字花科蔬菜摄入。肠绞痛通常3个月后明显改善。' },
  { id:'q017', tags:['大便','排便','便秘','次数','颜色'], category:'日常护理',
    question:'宝宝大便次数和颜色正常吗？',
    answer:'母乳宝宝：前几周可能每天3-8次，之后可能几天1次，软便都正常。配方奶宝宝：通常每天1-3次。正常颜色：黄色、芥末黄、绿色偶尔都正常。就医信号：白色/灰色（胆道问题）、黑色（出血）、连续3天不排+腹胀。' },
  { id:'q018', tags:['便秘','拉不出来','硬粪'], category:'日常护理',
    question:'宝宝便秘怎么办？',
    answer:'6个月以下宝宝：①腹部顺时针按摩；②温水泡浴；③双腿做"蹬自行车"动作。6个月以上加辅食后：①增加纤维（梨泥、西梅泥）；②保证足够水分。注意：母乳宝宝几天一次大便若软便不算便秘。需就医：超5天未排、腹胀明显、粪便带血。' },
  { id:'q019', tags:['腹泻','水便','拉肚子','次数多'], category:'健康',
    question:'宝宝腹泻怎么处理？',
    answer:'判断腹泻：比平时次数明显增多，便稀水状。处理：①继续喂奶/辅食，不要禁食；②注意补液（可用口服补液盐ORS）；③勤换尿布防尿布疹。就医：①腹泻超过3天；②便中带血；③明显脱水症状（囟门凹陷、哭无泪、6小时不尿）；④发烧超38.5°C。' },
  // === 皮肤问题 ===
  { id:'q020', tags:['湿疹','皮疹','红疹','脸上红'], category:'皮肤',
    question:'宝宝脸上长湿疹/红疹怎么办？',
    answer:'婴儿湿疹（特应性皮炎）非常常见，不传染。护理：①每天使用大量保湿霜（无香料）；②洗澡水温37°C，5-10分钟，洗后立即涂保湿；③纯棉衣物，避免过热出汗；④严重时使用儿科医生开的低效激素药膏（短期安全）。就医：合并感染（流脓）、严重影响睡眠。' },
  { id:'q021', tags:['痱子','热疹','红点','出汗'], category:'皮肤',
    question:'宝宝长痱子怎么办？',
    answer:'痱子是汗腺堵塞造成，不是湿疹。处理：①保持凉爽，减少出汗；②穿透气棉质衣物；③温水擦浴，不要用爽身粉（吸入风险）；④开空调或风扇降温。痱子通常几天后自行消退，不需要特别用药。' },
  { id:'q022', tags:['黄疸','皮肤发黄','眼白发黄'], category:'健康',
    question:'宝宝黄疸严重吗？',
    answer:'生理性黄疸：出生后2-3天出现，7-10天消退（母乳宝宝可延至2-4周），精神状态好。病理性黄疸需就医：①24小时内出现；②黄疸程度很深（蔓延到手脚）；③持续超过2周还在加深；④宝宝精神差、嗜睡、拒奶。多晒早晨阳光（隔窗无效），必要时光疗。' },
  { id:'q023', tags:['尿布疹','红屁屁','臀部红'], category:'皮肤',
    question:'宝宝红屁屁（尿布疹）怎么处理？',
    answer:'处理：①每次换尿布时彻底清洁，温水洗后晾干再换新尿布；②涂护臀膏（凡士林或氧化锌软膏）；③增加"光屁屁时间"让皮肤透气；④选更透气的尿布品牌。就医：出现白色斑点（念珠菌感染）、破皮流脓、普通护理3天无改善。' },
  { id:'q024', tags:['脂溢性皮炎','乳痂','头皮','头垢'], category:'皮肤',
    question:'宝宝头顶有厚厚的黄色结痂怎么回事？',
    answer:'乳痂（脂溢性皮炎）是很常见的现象，无需过度担心。处理方法：①洗澡前在头皮涂凡士林或婴儿油，保留30分钟软化；②用软梳轻轻梳去；③用温和婴儿洗发水洗净；④不要强行剥除。大多数4-6个月后自行改善。' },
  // === 发烧与常见病 ===
  { id:'q025', tags:['发烧','体温','测体温','退烧'], category:'健康',
    question:'宝宝发烧怎么处理？',
    answer:'3个月以下宝宝：腋温≥37.5°C立即就医！3个月以上：腋温38-38.5°C物理降温（温水擦浴）；腋温>38.5°C且精神差：退烧药（对乙酰氨基酚，按体重用量）；>39°C或伴其他症状：就医。不用酒精擦浴，不用阿司匹林。' },
  { id:'q026', tags:['感冒','鼻塞','流鼻涕','咳嗽'], category:'健康',
    question:'宝宝感冒鼻塞怎么办？',
    answer:'婴儿感冒通常7-10天自愈。缓解：①生理盐水滴鼻液软化鼻涕；②用吸鼻器（洗耳球或电动）清鼻腔；③室内保持适当湿度（加湿器）；④抬高床头略改善呼吸。就医：①高烧超39°C；②呼吸急促、困难；③拒奶超12小时；④持续超2周。6岁以下禁用感冒药。' },
  { id:'q027', tags:['耳部','揪耳朵','耳朵感染','中耳炎'], category:'健康',
    question:'宝宝一直拉扯耳朵是耳朵有问题吗？',
    answer:'4个月以下拉耳朵：通常是探索自己身体，正常。伴随以下症状需就医（可能中耳炎）：①反复发烧；②明显烦躁哭闹，夜间加重；③耳朵有分泌物流出；④近期刚感冒。注意：给宝宝喂奶时避免仰卧喂，防止奶液流入耳道引起感染。' },
  { id:'q028', tags:['眼屎','眼泪多','泪道','眼部分泌物'], category:'健康',
    question:'宝宝眼屎很多是怎么回事？',
    answer:'常见原因：①鼻泪管未完全开通（新生儿常见，通常1岁前自然开通）；②结膜炎（感染性）。处理：①用无菌纱布蘸温水从内眼角向外擦拭；②轻轻按摩内眼角（促进泪道开通）。就医：眼白发红、眼睑明显红肿、分泌物呈黄绿色脓性。' },
  { id:'q029', tags:['发烧','热性惊厥','抽搐','癫痫'], category:'急救',
    question:'宝宝发烧时突然抽搐怎么办？',
    answer:'热性惊厥：5岁以下儿童发烧时约3-5%会发生。发作时：①让宝宝侧卧防止误吸；②保持气道畅通；③不要往嘴里塞任何东西；④不要约束肢体；⑤记录发作时间。大多数2-3分钟内自行停止。停止后立即就医。超过5分钟或反复发作：拨打120。' },
  // === 急救 ===
  { id:'q030', tags:['呛奶','窒息','急救','呼吸困难'], category:'急救',
    question:'宝宝呛奶/气管进异物怎么急救？',
    answer:'如果宝宝能哭/咳嗽——轻度梗阻，让其自行咳出，不要伸手进口腔。严重梗阻（不能呼吸、脸色青紫）：婴儿海姆立克急救：①让宝宝俯趴在前臂，头低于身体；②用手掌根部在两肩胛骨之间用力拍5次；③翻转仰卧，用两指在胸骨中间向下按压5次；④交替进行直到异物排出或救援到达，同时拨打120。' },
  { id:'q031', tags:['跌落','摔落','从床上掉下来','头部碰撞'], category:'急救',
    question:'宝宝从床上掉下来怎么办？',
    answer:'立即观察：①有无意识丧失；②有无呕吐；③哭声是否正常。如果哭声正常、精神好——通常没有严重伤害，持续观察24小时。立即就医（拨120）：①意识不清；②持续呕吐超过2次；③头部明显肿胀变形；④一侧瞳孔比另一侧大；⑤持续嗜睡叫不醒。注意：不要因担心移动宝宝而延误急救。' },
  { id:'q032', tags:['烫伤','烧伤','热水烫','急救'], category:'急救',
    question:'宝宝被烫伤怎么紧急处理？',
    answer:'烫伤急救五步法：①冲——立即用流动冷水冲洗20分钟（不要用冰水）；②脱——边冲边轻柔脱去衣物，衣物粘连处剪开不要硬扯；③泡——继续浸泡冷水10分钟；④盖——用干净纱布松散覆盖；⑤送——就医。绝对不要：涂牙膏、酱油、黄油、芦荟等任何东西。' },
  { id:'q033', tags:['误吞','吃进去','异物入肚','吞咽'], category:'急救',
    question:'宝宝误吞了东西怎么办？',
    answer:'误吞后：①若宝宝能正常呼吸呼喊，先拨打中毒控制中心或去急诊；②不要催吐（特别是化学品、电池、尖锐物）；③立即就医情况：吞入纽扣电池（腐蚀性强，24小时内取出！）、尖锐物（针、骨头片）、多个磁铁、宝宝有呼吸困难。' },
  { id:'q034', tags:['溺水','进水','洗澡安全'], category:'急救',
    question:'宝宝洗澡时溺水怎么急救？',
    answer:'从水中取出后：①立即拨打120；②检查意识和呼吸；③如无呼吸立即开始CPR：婴儿CPR——30次胸外按压（两指按压胸骨下半段，深度约4cm）+ 2次人工呼吸，循环进行直到急救人员到达。即使宝宝看起来恢复正常，也必须就医（迟发性肺水肿风险）。' },
  { id:'q035', tags:['中毒','吃药','误食清洁剂'], category:'急救',
    question:'宝宝误食药物或清洁剂怎么办？',
    answer:'立即行动：①拨打120或中毒急救热线（12320）；②记录误食的东西名称、大概量、时间；③带上误食物品的包装盒去医院。不要自行催吐——腐蚀性物质（清洁剂、酸碱）催吐会造成二次伤害。保持冷静，等待医疗指示。' },
  // === 发育与成长 ===
  { id:'q036', tags:['趴趴时间','俯卧','抬头','颈部'], category:'发育',
    question:'趴趴时间(Tummy Time)怎么做？',
    answer:'从出生起即可开始（清醒且成人看护）。方法：①平铺在硬表面；②从每次2-3分钟开始；③逐渐增加到每天累计30-60分钟。好处：锻炼颈肩背肌肉，预防扁头。宝宝不喜欢：趴在父母胸腹上，或用毛巾卷垫在胸下。' },
  { id:'q037', tags:['翻身','什么时候翻身','不翻身'], category:'发育',
    question:'宝宝几个月应该会翻身？',
    answer:'翻身时间线：从仰卧到侧卧——约3-4个月；完整翻身（仰到俯）——约4-5个月；从俯到仰——约5-6个月。有的宝宝直接跳过某个方向，属正常。促进翻身：多做趴趴时间，用玩具在侧面吸引。注意：会翻身后不能继续包裹入睡（安全风险）。' },
  { id:'q038', tags:['长牙','出牙','咬东西','流口水'], category:'发育',
    question:'宝宝出牙期怎么护理？',
    answer:'出牙时间：通常6-10个月，但3个月到1岁都算正常范围。出牙症状：流口水增多、爱咬东西、轻微烦躁。缓解：①冷藏（不要冷冻）的牙胶；②用干净手指轻柔按摩牙龈；③冷毛巾让宝宝咬。出牙不会引起发烧（超38°C要排查其他原因）。牙萌出后用软毛婴儿牙刷清洁。' },
  { id:'q039', tags:['说话','语言','发音','不说话'], category:'发育',
    question:'宝宝语言发育正常吗？',
    answer:'语言里程碑参考：2个月：咿呀声；6个月：发出辅音"ba""ma"；9个月：模仿发音；12个月：1-2个有意义的词；18个月：10-20个词；2岁：50个词以上、开始组词。促进语言：①大量日常对话，描述你在做什么；②读绘本、唱歌；③减少屏幕时间。就医：9个月无咿呀声、12个月无手势、16个月无单词。' },
  { id:'q040', tags:['扶站','走路','几个月走路'], category:'发育',
    question:'宝宝几个月开始走路？',
    answer:'参考时间线：7-9个月：扶物站立；9-12个月：扶物行走；12-15个月：独立行走。正常变化范围很大，有的宝宝14-15个月才独走也完全正常。促进：不需要借助学步车（学步车反而延缓发育！）；给光脚活动机会，增强足部感觉。就医：18个月仍不能独走。' },
  { id:'q041', tags:['认生','陌生人焦虑','不让抱'], category:'发育',
    question:'宝宝突然开始认生怎么回事？',
    answer:'认生（陌生人焦虑）在6-9个月出现是认知发育的正常里程碑，说明宝宝已能区分熟悉和陌生面孔。处理建议：①不要强迫宝宝和陌生人互动；②让陌生人慢慢接近，先给玩具；③父母在场能给宝宝安全感；④通常12-18个月后逐渐好转。' },
  { id:'q042', tags:['扁头','头型','偏头','枕秃'], category:'发育',
    question:'宝宝头型偏了/扁了怎么办？',
    answer:'预防和改善：①增加趴趴时间（减少仰卧时间）；②睡觉时交替转向不同方向；③多抱抱减少躺着的时间。枕秃（后脑勺掉发）是正常现象，不是缺钙的表现。如果头型明显不对称并在3-4个月没改善，可咨询儿科医生，排除斜颈可能。' },
  { id:'q043', tags:['缺钙','补钙','维生素D','骨骼'], category:'健康',
    question:'宝宝需要补钙吗？怎么补维生素D？',
    answer:'母乳宝宝通常不需要额外补钙（母乳钙吸收率高）。但所有宝宝都需要补维生素D：①出生后数天内开始，每天400IU；②配方奶宝宝若每天喝够约1000ml配方奶，其中VD可能足够，但建议咨询医生；③补充至2岁或之后。钙缺乏引起佝偻病的核心是VD不足，不是钙少。' },
  // === 安全 ===
  { id:'q044', tags:['安全睡眠','猝死','SIDS','睡姿'], category:'安全',
    question:'怎么预防婴儿猝死综合征(SIDS)？',
    answer:'美国儿科学会安全睡眠建议：①仰卧入睡（每次）；②独立睡眠空间（同房不同床）；③硬床垫，无枕头、毛毯、毛绒玩具；④不要过热，室温18-22°C；⑤不要在宝宝睡觉区域吸烟；⑥可以使用安抚奶嘴（降低SIDS风险）；⑦母乳喂养。' },
  { id:'q045', tags:['汽车安全座椅','安全座椅','出行'], category:'安全',
    question:'婴儿应该怎么乘车？',
    answer:'必须使用合规儿童安全座椅：①新生儿至约2岁（或超过该座椅重量上限）：后向式安全座椅；②安装在后排；③确保5点式安全带贴合（胸夹在腋窝高度）；④不要穿厚棉衣坐（影响安全带贴合）。出生后从医院回家也需要安全座椅，不可怀抱乘车。' },
  // === 妈妈健康 ===
  { id:'q046', tags:['产后抑郁','情绪低落','妈妈情绪'], category:'妈妈健康',
    question:'妈妈情绪很低落/产后抑郁怎么办？',
    answer:'产后情绪波动（Baby Blues）：产后2周内，情绪低落、易哭、焦虑，属正常，通常2周内自行好转。产后抑郁：症状超过2周，严重影响日常生活，需专业帮助。迹象：持续悲伤、对宝宝缺乏感情、严重焦虑、睡眠障碍（不只因宝宝）。请告诉家人，寻求医生帮助，这不是你的错，也不是软弱的表现。' },
  { id:'q047', tags:['乳腺炎','堵奶','发烧','涨奶'], category:'妈妈健康',
    question:'妈妈堵奶/乳腺炎怎么处理？',
    answer:'堵奶：①用力喂奶或泵奶排空；②热敷+按摩帮助疏通；③调整哺乳姿势让宝宝下巴对着硬块方向。乳腺炎（堵奶+发烧+局部红热痛）：①继续哺乳（不会影响宝宝）；②大量休息、多喝水；③持续超24小时或高烧：就医使用抗生素（哺乳期安全的）。不要突然停奶，会加重。' },
  // === 疫苗 ===
  { id:'q048', tags:['打疫苗','接种反应','发烧','副作用'], category:'疫苗',
    question:'打疫苗后有什么正常反应？',
    answer:'常见正常反应：①注射部位红肿热痛（1-3天）；②低烧（38°C以下，1-2天）；③烦躁、食欲下降、嗜睡。处理：低烧+烦躁可用对乙酰氨基酚（按体重）；局部红肿冷敷。就医：高烧超39°C、连续哭闹超3小时、严重过敏反应（荨麻疹、呼吸困难——接种后30分钟内出现）。' },
  { id:'q049', tags:['自费疫苗','肺炎','轮状','是否需要打'], category:'疫苗',
    question:'自费疫苗值得打吗？哪些推荐？',
    answer:'推荐优先级高的自费疫苗：①13价肺炎球菌（PCV13）——婴儿肺炎、脑膜炎预防，强烈推荐；②轮状病毒疫苗——预防严重腹泻脱水，推荐；③Hib（流感嗜血杆菌）——预防脑膜炎肺炎，推荐。其他：流感（每年）、水痘（1岁后）。条件允许建议都打，国家免疫规划疫苗也必须按时接种。' },
];

// ---- 疫苗接种计划（免费/自费分类）----
const VACCINATION_SCHEDULE = [
  { ageDays:0, ageLabel:'出生时', vaccines:[
    { name:'乙型肝炎疫苗', dose:'第1剂', abbr:'HepB-1', type:'national', note:'出生24小时内接种' },
    { name:'卡介苗', dose:'第1剂', abbr:'BCG', type:'national', note:'预防结核病' },
  ]},
  { ageDays:30, ageLabel:'1个月', vaccines:[
    { name:'乙型肝炎疫苗', dose:'第2剂', abbr:'HepB-2', type:'national' },
  ]},
  { ageDays:60, ageLabel:'2个月', vaccines:[
    { name:'脊髓灰质炎灭活疫苗', dose:'第1剂', abbr:'IPV-1', type:'national', note:'预防脊髓灰质炎（小儿麻痹）' },
    { name:'轮状病毒疫苗', dose:'第1剂', abbr:'RV-1', type:'optional', note:'自费｜预防轮状病毒腹泻，强烈推荐' },
    { name:'Hib疫苗', dose:'第1剂', abbr:'Hib-1', type:'optional', note:'自费｜预防流感嗜血杆菌感染' },
    { name:'13价肺炎球菌疫苗', dose:'第1剂', abbr:'PCV13-1', type:'optional', note:'自费｜预防肺炎/脑膜炎，强烈推荐' },
  ]},
  { ageDays:90, ageLabel:'3个月', vaccines:[
    { name:'脊髓灰质炎减毒活疫苗', dose:'第2剂', abbr:'OPV-2', type:'national' },
    { name:'百白破疫苗', dose:'第1剂', abbr:'DTaP-1', type:'national', note:'预防百日咳、白喉、破伤风' },
    { name:'13价肺炎球菌疫苗', dose:'第2剂', abbr:'PCV13-2', type:'optional', note:'自费' },
    { name:'Hib疫苗', dose:'第2剂', abbr:'Hib-2', type:'optional', note:'自费' },
  ]},
  { ageDays:120, ageLabel:'4个月', vaccines:[
    { name:'脊髓灰质炎减毒活疫苗', dose:'第3剂', abbr:'OPV-3', type:'national' },
    { name:'百白破疫苗', dose:'第2剂', abbr:'DTaP-2', type:'national' },
    { name:'13价肺炎球菌疫苗', dose:'第3剂', abbr:'PCV13-3', type:'optional', note:'自费' },
    { name:'Hib疫苗', dose:'第3剂', abbr:'Hib-3', type:'optional', note:'自费' },
  ]},
  { ageDays:150, ageLabel:'5个月', vaccines:[
    { name:'百白破疫苗', dose:'第3剂', abbr:'DTaP-3', type:'national' },
  ]},
  { ageDays:180, ageLabel:'6个月', vaccines:[
    { name:'乙型肝炎疫苗', dose:'第3剂', abbr:'HepB-3', type:'national' },
    { name:'A群脑膜炎球菌多糖疫苗', dose:'第1剂', abbr:'MenA-1', type:'national' },
    { name:'13价肺炎球菌疫苗', dose:'第4剂', abbr:'PCV13-4', type:'optional', note:'自费' },
    { name:'流感疫苗', dose:'每年接种', abbr:'Flu', type:'optional', note:'自费｜6个月以上每年秋季接种' },
  ]},
  { ageDays:240, ageLabel:'8个月', vaccines:[
    { name:'麻疹/风疹联合疫苗', dose:'第1剂', abbr:'MR-1', type:'national' },
    { name:'乙型脑炎减毒活疫苗', dose:'第1剂', abbr:'JE-1', type:'national' },
    { name:'水痘疫苗', dose:'第1剂', abbr:'VZV-1', type:'optional', note:'自费｜部分地区已纳入免疫规划' },
  ]},
  { ageDays:270, ageLabel:'9个月', vaccines:[
    { name:'A群脑膜炎球菌多糖疫苗', dose:'第2剂', abbr:'MenA-2', type:'national' },
  ]},
  { ageDays:365, ageLabel:'12个月', vaccines:[
    { name:'水痘疫苗', dose:'第1剂（或此时接种）', abbr:'VZV-1', type:'optional', note:'自费｜1岁以上接种更佳' },
    { name:'手足口病疫苗(EV71)', dose:'第1剂', abbr:'EV71-1', type:'optional', note:'自费｜6-71月龄，预防手足口重症' },
  ]},
  { ageDays:540, ageLabel:'18个月', vaccines:[
    { name:'百白破疫苗', dose:'加强剂', abbr:'DTaP-4', type:'national' },
    { name:'麻腮风疫苗', dose:'第2剂', abbr:'MMR-2', type:'national' },
    { name:'甲型肝炎减毒活疫苗', dose:'第1剂', abbr:'HepA-1', type:'national' },
  ]},
  { ageDays:730, ageLabel:'2岁', vaccines:[
    { name:'乙型脑炎减毒活疫苗', dose:'加强剂', abbr:'JE-2', type:'national' },
    { name:'A群C群脑膜炎球菌多糖疫苗', dose:'第1剂', abbr:'MenAC-1', type:'national' },
  ]},
];

// ---- 年龄阶段提醒 ----
const AGE_REMINDERS = [
  { minDays:28, maxDays:60, icon:'☀️', title:'可以出门晒太阳了！',
    desc:'满月后可适当户外活动，阳光促进维生素D合成，有助黄疸消退',
    shopping:['婴儿推车/手推车','遮阳帽','薄包被或纱布毯','湿巾（外出备用）','隔尿垫'],
    tips:['上午10点前或下午4点后出行','避免直射阳光','每次15-20分钟，循序渐进'] },
  { minDays:40, maxDays:90, icon:'💉', title:'疫苗时间快到了',
    desc:'2个月时需接种第一批计划疫苗（IPV、可选Hib/PCV13/轮状）',
    shopping:['疫苗本/接种记录本','宝宝安抚奶嘴','退烧药备用（对乙酰氨基酚）'],
    tips:['接种前确认宝宝健康状态','接种后观察30分钟再离开','低热是正常反应，超38.5°C可用退烧药'] },
  { minDays:60, maxDays:120, icon:'🎮', title:'可以开始更多互动了',
    desc:'2-4个月宝宝开始对玩具有兴趣，是早期感统刺激的好时机',
    shopping:['黑白卡/彩色卡片','床铃/悬挂玩具（可旋转）','宝宝镜子','牙胶（早备）','绘本（0-1岁布书）'],
    tips:['Tummy Time每天累计30分钟','多说话唱歌，语言输入越早越好'] },
  { minDays:150, maxDays:220, icon:'🍴', title:'辅食准备要开始了',
    desc:'6个月左右开始加辅食，提前准备辅食工具',
    shopping:['辅食机/料理机','硅胶软勺','吸盘碗','围兜（防水）','婴儿米粉（强化铁）'],
    tips:['首选强化铁婴儿米粉','每次只引入一种新食物','观察3-5天有无过敏反应'] },
  { minDays:90, maxDays:180, icon:'🎒', title:'可以使用婴儿背带了',
    desc:'3个月后颈部有一定支撑力，可开始使用人体工学背带',
    shopping:['婴儿背带（人体工学，M型腿设计）','外出隔尿垫'],
    tips:['选支撑宝宝膝盖高于臀部的M型设计','每次使用不超过2小时','炎热天气注意散热'] },
];

// ---- 季节育儿提醒 ----
const SEASONAL_BABY_TIPS = {
  spring: { icon:'🌸', season:'春季', tips:['春季换季注意保暖，早晚温差大','春季过敏高发，注意观察宝宝有无皮疹打喷嚏','适合户外活动，多晒阳光补充VD','春季呼吸道感染高发，注意卫生'] },
  summer: { icon:'☀️', season:'夏季', tips:['防中暑：避开正午出行，保持室内通风','母乳宝宝夏天不需要额外喂水','6个月以下宝宝禁用防晒霜，用遮阳衣帽','蚊帐必备，6个月以下禁用化学驱蚊剂','空调温度不宜低于26°C，注意不要对着风口吹'] },
  autumn: { icon:'🍂', season:'秋季', tips:['昼夜温差大，注意添衣','秋燥注意宝宝嘴唇皮肤干燥（涂婴儿护肤品）','秋季是接种流感疫苗的好时机','秋季腹泻（轮状病毒）高发，注意手卫生'] },
  winter: { icon:'❄️', season:'冬季', tips:['室内保持适当湿度（40-60%），防止鼻腔干燥','外出包裹好，重点保护手、脸、耳','供暖季注意开窗通风（每天至少2次，每次15分钟）','洗澡水温38°C，洗后迅速擦干保温','冬季呼吸道感染高发，避免带宝宝去人多密闭场所'] },
};

// ---- 天气穿衣建议 ----
const CLOTHING_ADVICE = [
  { maxTemp:5, text:'❄️ 羽绒服/厚棉袄，围巾手套全副武装' },
  { maxTemp:10, text:'🧥 厚外套必备，早晚注意保暖' },
  { maxTemp:15, text:'🧣 薄外套/卫衣，早晚可以加一件' },
  { maxTemp:20, text:'👕 长袖衬衫或薄毛衣，舒适正好' },
  { maxTemp:25, text:'👚 轻薄长袖或短袖，薄外套备着' },
  { maxTemp:30, text:'👗 短袖短裤，防晒霜要抹' },
  { maxTemp:99, text:'🌞 短袖必备，出门防晒！' },
];

// ---- 模拟天气数据 ----
function getMockWeather() {
  const today = new Date();
  const types = ['晴','多云','阴','小雨','中雨','雷阵雨','阵雨'];
  const emojis = ['☀️','⛅','🌥️','🌦️','🌧️','⛈️','🌦️'];
  const result = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(today); d.setDate(today.getDate() + i);
    const ti = Math.floor(Math.random() * types.length);
    const high = Math.floor(18 + Math.random() * 14);
    const low = high - Math.floor(6 + Math.random() * 8);
    result.push({ date:formatDate(d), type:types[ti], emoji:emojis[ti],
      high, low, rainProb: ti >= 3 ? Math.floor(40 + Math.random()*55) : Math.floor(Math.random()*20),
      precip: ti >= 3 ? parseFloat((Math.random()*8).toFixed(1)) : 0 });
  }
  return result;
}

// ---- 工具函数 ----
function formatDate(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth()+1).padStart(2,'0');
  const d = String(date.getDate()).padStart(2,'0');
  return `${y}-${m}-${d}`;
}
function parseDate(str) { const [y,m,d]=str.split('-').map(Number); return new Date(y,m-1,d); }
function getToday() { return formatDate(new Date()); }
function getDayOfWeek(dateStr) { return ['日','一','二','三','四','五','六'][parseDate(dateStr).getDay()]; }

var Store = {
  get(key, fallback=null) { try { const v=localStorage.getItem('amxm_'+key); return v?JSON.parse(v):fallback; } catch { return fallback; } },
  set(key, value) { try { localStorage.setItem('amxm_'+key, JSON.stringify(value)); } catch {} },
};
