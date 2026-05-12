// =============================================
// 数据中心 v2 — 含天气/食谱/育儿全量数据
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

// ---- 美食数据库（含卡路里）----
const FOODS = [
  // 面食·汤面
  { id:'n001', name:'油泼面', emoji:'🍜', category:'noodle', tag:'拌面', kcal:650,
    desc:'陕西魂！宽面条铺辣椒面，滚烫热油滋啦一泼，香气冲天', difficulty:'简单', cookTime:'20min', location:'家', origin:'陕西', shopHint:'手擀面/挂面、辣椒面、花椒、蒜' },
  { id:'n002', name:'臊子面', emoji:'🍲', category:'noodle', tag:'汤面', kcal:520,
    desc:'岐山臊子面，酸辣香，宽汤薄面，浇了又浇', difficulty:'中等', cookTime:'45min', location:'家/外食', origin:'陕西', shopHint:'猪肉末、木耳、黄花菜、豆腐、鸡蛋' },
  { id:'n003', name:'三合一', emoji:'🥣', category:'noodle', tag:'汤面', kcal:460,
    desc:'番茄+鸡蛋+豆腐，陕西家常汤面，简单舒心', difficulty:'简单', cookTime:'20min', location:'家', origin:'陕西', shopHint:'番茄、鸡蛋、嫩豆腐' },
  { id:'n004', name:'鸡汤面', emoji:'🍗', category:'noodle', tag:'汤面', kcal:400,
    desc:'清鲜鸡汤做底，配青菜，冬天来一碗暖心暖胃', difficulty:'中等', cookTime:'30min', location:'家', origin:'通用', shopHint:'整鸡/鸡架、姜、青菜' },
  { id:'n005', name:'牛肉汤面', emoji:'🥩', category:'noodle', tag:'汤面', kcal:500,
    desc:'浓郁牛肉汤底，卤牛肉切片，配大葱香菜', difficulty:'中等', cookTime:'40min', location:'家/外食', origin:'通用', shopHint:'牛腱子（提前解冻）、香料' },
  { id:'n006', name:'番茄鸡蛋面', emoji:'🍅', category:'noodle', tag:'汤面', kcal:420,
    desc:'永远不会出错，酸甜开胃，15分钟搞定', difficulty:'简单', cookTime:'15min', location:'家', origin:'通用', shopHint:'番茄、鸡蛋' },
  { id:'n007', name:'酸汤水饺', emoji:'🥟', category:'noodle', tag:'汤面', kcal:480,
    desc:'酸辣汤底，水饺飘浮，陕西特色吃法', difficulty:'中等', cookTime:'30min', location:'家/外食', origin:'陕西', shopHint:'速冻水饺/自制馅料、辣椒油、陈醋' },
  // 面食·拌面
  { id:'n008', name:'新疆拌面（拉条子）', emoji:'🍝', category:'noodle', tag:'拌面', kcal:720,
    desc:'手拉面条配羊肉蔬菜浇头，劲道过瘾', difficulty:'中等', cookTime:'40min', location:'家/外食', origin:'新疆', shopHint:'高筋面粉、羊肉/牛肉（解冻）、洋葱、彩椒' },
  { id:'n009', name:'新疆炒拌面', emoji:'🥘', category:'noodle', tag:'拌面', kcal:750,
    desc:'面条下锅翻炒，加羊肉洋葱辣椒，干香有嚼劲', difficulty:'中等', cookTime:'35min', location:'家/外食', origin:'新疆', shopHint:'拉条子面、羊肉、洋葱、辣椒' },
  { id:'n010', name:'炸酱面', emoji:'🫙', category:'noodle', tag:'拌面', kcal:680,
    desc:'自炒黄豆酱肉末，配各种时令小菜', difficulty:'中等', cookTime:'30min', location:'家', origin:'北方', shopHint:'猪肉末、黄豆酱/甜面酱、黄瓜丝' },
  { id:'n011', name:'葱油拌面', emoji:'🧅', category:'noodle', tag:'拌面', kcal:580,
    desc:'熬出焦香葱油拌细面，简单惊艳', difficulty:'简单', cookTime:'20min', location:'家', origin:'通用', shopHint:'小葱/大葱、生抽、老抽' },
  { id:'n012', name:'芝麻酱凉面', emoji:'🥒', category:'noodle', tag:'拌面', kcal:520,
    desc:'夏日首选，芝麻酱+黄瓜丝+蒜泥，清爽解暑', difficulty:'简单', cookTime:'15min', location:'家', origin:'通用', shopHint:'面条、芝麻酱、黄瓜、蒜' },
  { id:'n013', name:'麻食', emoji:'🌾', category:'noodle', tag:'特色', kcal:460,
    desc:'陕西古法！面搓成小耳朵，配蔬菜炖煮，暖胃养人', difficulty:'中等', cookTime:'40min', location:'家', origin:'陕西', shopHint:'面粉、番茄、土豆、豆角' },
  { id:'n014', name:'包子+小米粥', emoji:'🥟', category:'noodle', tag:'主食', kcal:500,
    desc:'蒸一锅包子配香浓小米粥，早餐晚餐都稳', difficulty:'中等', cookTime:'60min', location:'家', origin:'通用', shopHint:'面粉、小米、包子馅料（猪肉/白菜）' },
  { id:'n015', name:'花卷+凉菜+炒菜', emoji:'🌀', category:'noodle', tag:'主食', kcal:560,
    desc:'手工花卷配两三个菜，陕西家常饭代表', difficulty:'中等', cookTime:'45min', location:'家', origin:'陕西', shopHint:'面粉、葱花、花椒面' },
  { id:'n016', name:'蒸饺', emoji:'🥟', category:'noodle', tag:'主食', kcal:440,
    desc:'捏一锅饺子上锅蒸，皮薄馅厚，蘸醋吃', difficulty:'中等', cookTime:'60min', location:'家', origin:'通用', shopHint:'猪肉、白菜/韭菜、面粉' },
  { id:'n017', name:'裤带面', emoji:'🍜', category:'noodle', tag:'拌面', kcal:700,
    desc:'又宽又厚的关中大面，一根面条就能吃饱！', difficulty:'中等', cookTime:'30min', location:'家/外食', origin:'陕西', shopHint:'面粉、辣椒面、蒜' },
  { id:'n018', name:'拨鱼儿', emoji:'🐟', category:'noodle', tag:'特色', kcal:420,
    desc:'稀面糊拨入沸水，鱼形面块配炒菜', difficulty:'简单', cookTime:'20min', location:'家', origin:'陕西', shopHint:'面粉、番茄、鸡蛋' },
  // 米饭
  { id:'r001', name:'番茄炒蛋+米饭', emoji:'🍳', category:'rice', tag:'家常', kcal:500,
    desc:'永恒神仙搭档，不用解释', difficulty:'简单', cookTime:'20min', location:'家', origin:'通用', shopHint:'番茄、鸡蛋' },
  { id:'r002', name:'红烧肉+米饭', emoji:'🍖', category:'rice', tag:'硬菜', kcal:760,
    desc:'炖到酥烂的五花肉，肥而不腻，米饭杀手', difficulty:'中等', cookTime:'90min', location:'家', origin:'通用', shopHint:'五花肉（解冻）、生抽、老抽、冰糖' },
  { id:'r003', name:'可乐鸡翅+米饭', emoji:'🍗', category:'rice', tag:'家常', kcal:640,
    desc:'可乐收汁，甜香嫩滑，百做不厌', difficulty:'简单', cookTime:'30min', location:'家', origin:'通用', shopHint:'鸡翅（解冻）、可乐' },
  { id:'r004', name:'新疆手抓饭', emoji:'🍚', category:'rice', tag:'特色', kcal:730,
    desc:'羊肉+胡萝卜+洋葱焖米饭，新疆最高礼遇', difficulty:'中等', cookTime:'60min', location:'家/外食', origin:'新疆', shopHint:'羊肉（解冻）、胡萝卜、洋葱、大米' },
  { id:'r005', name:'宫保鸡丁+米饭', emoji:'🌶️', category:'rice', tag:'家常', kcal:600,
    desc:'鸡丁+花生+辣椒，酸甜微辣，经典川菜', difficulty:'中等', cookTime:'25min', location:'家/外食', origin:'川菜', shopHint:'鸡胸肉、花生、干辣椒、豆瓣酱' },
  { id:'r006', name:'土豆炖牛肉+米饭', emoji:'🥔', category:'rice', tag:'硬菜', kcal:700,
    desc:'大块牛肉配土豆，炖到软烂入味', difficulty:'中等', cookTime:'90min', location:'家', origin:'通用', shopHint:'牛腩（提前解冻）、土豆、胡萝卜' },
  { id:'r007', name:'麻婆豆腐+米饭', emoji:'🌶️', category:'rice', tag:'家常', kcal:560,
    desc:'麻辣鲜香，嫩豆腐在辣椒油中打滚，下饭神器', difficulty:'简单', cookTime:'20min', location:'家/外食', origin:'川菜', shopHint:'嫩豆腐、猪肉末、豆瓣酱、花椒' },
  { id:'r008', name:'蛋炒饭', emoji:'🍳', category:'rice', tag:'快手', kcal:530,
    desc:'隔夜冷饭炒出锅气，加鸡蛋葱花酱油', difficulty:'简单', cookTime:'10min', location:'家', origin:'通用', shopHint:'隔夜米饭、鸡蛋、葱' },
  { id:'r009', name:'咖喱饭', emoji:'🍛', category:'rice', tag:'家常', kcal:660,
    desc:'咖喱块+土豆鸡肉，香气浓郁，超满足', difficulty:'简单', cookTime:'40min', location:'家', origin:'通用', shopHint:'咖喱块、鸡腿肉（解冻）、土豆、胡萝卜' },
  { id:'r010', name:'回锅肉+米饭', emoji:'🥩', category:'rice', tag:'硬菜', kcal:740,
    desc:'五花肉+青椒豆瓣酱，川菜扛把子', difficulty:'中等', cookTime:'30min', location:'家/外食', origin:'川菜', shopHint:'五花肉（解冻）、青蒜/青椒、豆瓣酱' },
  { id:'r011', name:'鱼香肉丝+米饭', emoji:'🐟', category:'rice', tag:'家常', kcal:620,
    desc:'其实没有鱼！但酸甜咸香让人上瘾', difficulty:'中等', cookTime:'25min', location:'家/外食', origin:'川菜', shopHint:'猪里脊（解冻）、木耳、笋丝、豆瓣酱' },
  { id:'r012', name:'清蒸鱼+米饭', emoji:'🐠', category:'rice', tag:'硬菜', kcal:500,
    desc:'葱姜蒸鱼豉油淋上去，原汁原味', difficulty:'中等', cookTime:'30min', location:'家', origin:'粤菜', shopHint:'鲜鱼/冻鱼（解冻）、葱、姜、蒸鱼豉油' },
  { id:'r013', name:'新疆大盘鸡', emoji:'🐔', category:'rice', tag:'特色', kcal:820,
    desc:'整只鸡+土豆+皮带面，新疆豪爽吃法', difficulty:'中等', cookTime:'60min', location:'家/外食', origin:'新疆', shopHint:'整鸡（解冻）、土豆、辣椒、宽面条' },
  { id:'r014', name:'排骨藕汤+米饭', emoji:'🦴', category:'rice', tag:'硬菜', kcal:660,
    desc:'炖到软烂的排骨配莲藕，汤清味鲜', difficulty:'中等', cookTime:'90min', location:'家', origin:'通用', shopHint:'猪排骨（解冻）、莲藕' },
  // 西餐
  { id:'w001', name:'牛排+沙拉', emoji:'🥩', category:'western', tag:'硬菜', kcal:540,
    desc:'三分熟牛排配新鲜沙拉，蛋白质与维生素完美组合', difficulty:'中等', cookTime:'30min', location:'家/外食', origin:'西餐', shopHint:'牛排（提前解冻）、生菜、番茄、油醋汁' },
  { id:'w002', name:'番茄肉酱意面', emoji:'🍝', category:'western', tag:'主食', kcal:640,
    desc:'经典意大利肉酱，番茄的酸与肉香完美融合', difficulty:'中等', cookTime:'40min', location:'家', origin:'意大利', shopHint:'意大利面、猪肉末/牛肉末、番茄罐头' },
  { id:'w003', name:'奶油蘑菇意面', emoji:'🍄', category:'western', tag:'主食', kcal:700,
    desc:'浓郁奶油酱配蘑菇，满满的幸福感', difficulty:'中等', cookTime:'30min', location:'家', origin:'意大利', shopHint:'意大利面、蘑菇、淡奶油、蒜' },
  { id:'w004', name:'汉堡', emoji:'🍔', category:'western', tag:'快餐', kcal:660,
    desc:'手工牛肉饼夹生菜番茄，配薯条', difficulty:'中等', cookTime:'30min', location:'家/外食', origin:'美式', shopHint:'牛肉末（解冻）、汉堡胚、生菜' },
  { id:'w005', name:'披萨', emoji:'🍕', category:'western', tag:'主食', kcal:730,
    desc:'自制饼底或买现成，各种口味随心配', difficulty:'中等', cookTime:'45min', location:'家/外食', origin:'意大利', shopHint:'披萨饼底、番茄酱、马苏里拉奶酪、配料' },
  { id:'w006', name:'法式炖牛肉', emoji:'🥘', category:'western', tag:'硬菜', kcal:660,
    desc:'红酒炖牛肉配蔬菜，慢炖后香气四溢', difficulty:'复杂', cookTime:'120min', location:'家', origin:'法式', shopHint:'牛腩（提前解冻）、红酒、迷迭香、土豆' },
  { id:'w007', name:'三明治', emoji:'🥪', category:'western', tag:'快手', kcal:400,
    desc:'吐司夹各种馅料，早餐午餐随意搭', difficulty:'简单', cookTime:'10min', location:'家', origin:'西餐', shopHint:'吐司、鸡蛋、生菜、番茄' },
  { id:'w008', name:'鸡胸肉时蔬沙拉', emoji:'🥗', category:'fitness', tag:'健身', kcal:340,
    desc:'水煮鸡胸+各种蔬菜+油醋汁，高蛋白低脂', difficulty:'简单', cookTime:'20min', location:'家', origin:'健身餐', shopHint:'鸡胸肉、混合生菜、黄瓜、油醋汁' },
  { id:'w009', name:'溏心蛋沙拉碗', emoji:'🥚', category:'fitness', tag:'健身', kcal:410,
    desc:'半熟蛋+鸡胸+藜麦+蔬菜，营养全面', difficulty:'简单', cookTime:'20min', location:'家', origin:'健身餐', shopHint:'鸡蛋、鸡胸肉、藜麦、混合蔬菜' },
  { id:'w010', name:'烤鸡腿+烤蔬菜', emoji:'🍗', category:'fitness', tag:'健身', kcal:470,
    desc:'迷迭香烤鸡腿配彩椒洋葱，烤箱省心健康', difficulty:'简单', cookTime:'40min', location:'家', origin:'健身餐', shopHint:'鸡腿（解冻）、彩椒、洋葱、迷迭香' },
  { id:'w011', name:'牛油果吐司', emoji:'🥑', category:'fitness', tag:'健身', kcal:370,
    desc:'牛油果+溏心蛋+全麦吐司，精致早餐', difficulty:'简单', cookTime:'10min', location:'家', origin:'健身餐', shopHint:'牛油果、全麦吐司、鸡蛋' },
  { id:'w012', name:'芝士焗饭', emoji:'🧀', category:'western', tag:'主食', kcal:660,
    desc:'米饭铺番茄肉酱，盖满芝士进烤箱，拉丝爆浆', difficulty:'简单', cookTime:'30min', location:'家', origin:'西餐', shopHint:'米饭、猪肉末、番茄、马苏里拉奶酪' },
];

// ---- 面条浇头数据库 ----
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
];

// 面条类型
const NOODLE_TYPES = [
  { name:'手擀宽面', kcal:220 },{ name:'细挂面', kcal:200 },
  { name:'新疆拉条子', kcal:280 },{ name:'空心挂面', kcal:195 },
  { name:'裤带面', kcal:250 },{ name:'刀削面', kcal:230 },
];

// ---- 米饭配菜数据库（用于随机配菜） ----
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
    { name:'黄焖鸡', emoji:'🐔', kcal:290, cuisine:'家常', shopHint:'鸡腿肉（解冻）、干辣椒' },
    { name:'糖醋里脊', emoji:'🍬', kcal:350, cuisine:'家常', shopHint:'猪里脊（解冻）' },
    { name:'手抓羊肉', emoji:'🐑', kcal:380, cuisine:'新疆', shopHint:'羊排（解冻）' },
    { name:'三杯鸡', emoji:'🍗', kcal:310, cuisine:'台式', shopHint:'鸡腿（解冻）、九层塔' },
    { name:'土豆炖牛肉', emoji:'🥔', kcal:320, cuisine:'家常', shopHint:'牛腩（提前解冻）、土豆' },
    { name:'粉蒸肉', emoji:'🥩', kcal:420, cuisine:'家常', shopHint:'五花肉（解冻）、蒸肉粉' },
    { name:'蒜泥白肉', emoji:'🧄', kcal:300, cuisine:'川菜', shopHint:'五花肉（解冻）' },
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
const RICE_BASE_KCAL = 195; // 一碗米饭约195kcal

// ---- 育儿里程碑 ----
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
    ],
    tips:[
      '✨ EASY程序：吃→玩→睡，每轮约2.5-3小时',
      '🚫 不要把"喂奶"作为入睡最后步骤，避免奶睡依赖',
      '🎵 白噪音（60分贝）能有效安抚新生儿',
      '🤱 母乳每侧10-20分钟，注意有效吸吮',
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
    ],
    tips:[
      '📅 EASY：3小时一轮，白天3-4次小睡',
      '🎵 唱歌读绘本讲故事——越早越好',
      '🪁 悬挂玩具（距眼睛30cm）刺激视觉',
      '😴 开始建立睡眠仪式：洗澡→按摩→喂奶→睡',
    ],
  },
};

const EASY_GUIDE = {
  eat: { icon:'🍼', title:'E — 吃 (Eat)', content:`每次进食要让宝宝吃饱（不要"零食式"喂养）。\n母乳每侧10-20分钟，观察宝宝吞咽声。\n配方奶参考：每公斤体重每天约150ml。\n喂奶后竖抱10-15分钟拍嗝。\n⚠️ 关键原则：吃奶不等于睡觉，不要在半睡半醒时喂奶。` },
  activity: { icon:'🎮', title:'A — 玩 (Activity)', content:`清醒时间是大脑发育的黄金期。\n0-1月：换尿布、洗澡、抱抱、对话就是最好的活动。\n1-2月：Tummy Time、追视玩具、面对面互动。\n2-3月：悬挂玩具、镜子游戏、故事绘本。\n✨ 读懂"过度刺激"信号：转头、哭闹、眼神飘散→立刻减少刺激。` },
  sleep: { icon:'😴', title:'S — 睡 (Sleep)', content:`在宝宝"犯困但未睡着"时放入床。\n这是培养自主入睡的关键——不抱不摇！\n使用白噪音（约60分贝）帮助入睡。\n观察困倦信号：揉眼、打哈欠、眼神发呆→立刻行动。\n⚠️ 新生儿清醒超1.5-2小时通常已过度疲劳。` },
  youTime: { icon:'☕', title:'Y — 你的时光 (Your Time)', content:`宝宝睡着了，这段时间属于你！\n不要只用来做家务——照顾好自己才能更好照顾宝宝。\n喝杯热茶、小睡20分钟都有用。\n✨ 产后妈妈特别提醒：情绪波动是正常的，有感觉请说出来。\n爸爸妈妈轮流休息，不要让一方独撑。` },
};

const SCIENCE_TIPS = [
  { icon:'🤱', tip:'母乳按需哺乳是最科学的，1个月内不必严格限制频次' },
  { icon:'😴', tip:'新生儿需要16-18小时睡眠，白天小睡不会影响夜间睡眠' },
  { icon:'🌡️', tip:'宝宝手脚凉不代表冷，摸后背颈部才是测温正确方法' },
  { icon:'🛏️', tip:'安全睡眠：仰卧、独立空间、无枕头，预防SIDS' },
  { icon:'💉', tip:'按时接种疫苗，这是保护宝宝最有效的科学手段' },
  { icon:'🧠', tip:'说话、唱歌、读书——语言输入越早越多，大脑发育越好' },
  { icon:'🤗', tip:'多抱抱不会"宠坏"宝宝，皮肤接触能降低应激激素' },
  { icon:'😭', tip:'哭声是语言，积极回应能建立安全依恋' },
  { icon:'🚿', tip:'新生儿不需要每天洗澡，每周2-3次即可' },
  { icon:'💊', tip:'1岁前严禁食用蜂蜜（肉毒杆菌风险）' },
  { icon:'📱', tip:'2岁前应避免屏幕暴露（视频通话除外）' },
  { icon:'🌡️', tip:'腋温超38°C或宝宝状态差，应及时就医' },
];

// ---- 育儿问答数据库 ----
const PARENTING_QA = [
  { id:'q001', tags:['哭','哭闹','不停哭','安抚','黄昏闹'], category:'日常护理',
    question:'宝宝哭个不停怎么办？',
    answer:'按顺序排查：①饥饿（距上次喂奶超2小时）②尿布湿了 ③需要安抚/拥抱 ④过度疲劳（清醒超1.5小时）⑤胀气不适。傍晚5-8点的"黄昏闹"是新生儿常见现象，通常3个月后自然好转。5S安抚法：包裹(Swaddle)→侧/俯卧(Side)→嘘声(Shush)→摇晃(Swing)→吸吮(Suck)。' },
  { id:'q002', tags:['奶睡','抱睡','戒奶睡','入睡习惯'], category:'睡眠',
    question:'宝宝奶睡/抱睡怎么纠正？',
    answer:'奶睡会让宝宝把"喂奶"和"入睡"绑定，形成睡眠道具依赖。纠正方法：①喂奶后不要让宝宝完全睡着，保持半清醒放入床；②使用白噪音替代安抚；③逐渐缩短喂奶到入睡的时间间隔；④保持一致的入睡仪式（洗澡→按摩→喂奶→放床）。1个月内暂不强求，2个月起开始有意识引导。' },
  { id:'q003', tags:['吃饱','奶量','是否够吃','饥饿信号'], category:'喂养',
    question:'如何判断宝宝是否吃饱了？',
    answer:'喂饱的信号：①自动松开乳头或奶嘴；②喂后满足安静；③每天至少6-8片湿尿布；④体重按预期增长（出生后前几天会减轻，之后每周约增加150-200g）。过度喂养信号：吐奶频繁、腹部膨胀、喂奶后仍哭闹。' },
  { id:'q004', tags:['猛涨期','频繁吃奶','奶不够','三周六周'], category:'喂养',
    question:'什么是猛涨期？',
    answer:'宝宝快速发育期，通常在3周、6周、3个月、6个月出现。表现：比平时更频繁要吃奶、烦躁爱哭、睡眠变差。这是正常现象，不代表奶不够！母乳妈妈要多喂，供需会自动平衡。通常持续2-7天后恢复正常。' },
  { id:'q005', tags:['胀气','肠绞痛','肚子咕噜','腿蜷缩'], category:'日常护理',
    question:'宝宝胀气/肠绞痛怎么办？',
    answer:'表现：腿蜷缩、腹部鼓胀、大哭难安、放屁后好转。缓解方法：①顺时针腹部按摩；②飞机抱（腹部朝下趴在手臂上）；③温暖毛巾敷肚子；④喂奶后充分拍嗝；⑤母乳妈妈减少十字花科蔬菜（西兰花、卷心菜）摄入试试。肠绞痛通常3个月后明显改善。' },
  { id:'q006', tags:['黄疸','皮肤发黄','眼白发黄'], category:'健康',
    question:'宝宝黄疸严重吗？',
    answer:'生理性黄疸：出生后2-3天出现，7-10天消退（母乳宝宝可延迟至2-4周），精神状态好。病理性黄疸需就医：①24小时内出现；②黄疸程度很深（蔓延到手脚）；③持续超过2周还在加深；④宝宝精神差、嗜睡、拒奶。多晒早晨阳光（隔窗无效），必要时光疗。' },
  { id:'q007', tags:['脐带','脐部护理','脐带脱落','消毒'], category:'日常护理',
    question:'脐带如何护理？',
    answer:'①每天用75%酒精棉签擦拭脐带根部1-2次；②保持干燥，尿布折叠避开脐部；③不要用腹带包裹；④脐带通常7-15天自然脱落；⑤脱落后继续护理1周直至完全愈合。就医信号：脐部红肿、有异味、渗液或长时间不脱落。' },
  { id:'q008', tags:['吐奶','溢奶','喷射吐奶'], category:'喂养',
    question:'宝宝吐奶怎么办？',
    answer:'溢奶（少量从嘴角流出）是正常的，因为贲门括约肌发育不完善。预防：①喂奶后竖抱拍嗝15分钟；②不要喂完立即洗澡或摇晃；③喂奶时角度45°，避免平躺喂。需就医：①喷射性呕吐；②吐奶量很大且频繁；③体重不增长；④吐出物带血或黄绿色。' },
  { id:'q009', tags:['大便','排便','便秘','次数','颜色'], category:'日常护理',
    question:'宝宝大便次数和颜色正常吗？',
    answer:'母乳宝宝：前几周可能每天3-8次，之后可能几天1次，只要软便都正常。配方奶宝宝：通常每天1-3次，较成形。正常颜色：黄色、芥末黄、绿色（偶尔）都正常。就医信号：白色/灰色（胆道问题）、黑色（出血可能）、连续3天不排便+腹胀。' },
  { id:'q010', tags:['拍嗝','打嗝','嗝','喂奶后'], category:'日常护理',
    question:'如何给宝宝拍嗝？',
    answer:'三种方式：①竖抱趴肩法：宝宝趴在你肩膀上，轻拍后背；②坐抱法：宝宝坐在你腿上，一手支撑前胸，另一手轻拍后背；③趴腿法：宝宝趴在你腿上，轻拍后背。每次喂奶中途和结束后各拍一次。不是每次都能拍出嗝，没出来也没关系，竖抱保持10-15分钟即可。' },
  { id:'q011', tags:['睡眠','睡眠程序','睡前','仪式'], category:'睡眠',
    question:'如何建立睡眠程序？',
    answer:'固定顺序的睡前仪式帮助宝宝建立"要睡觉了"的信号联系。推荐步骤：①温水浴（5-10分钟）→ ②轻柔按摩 → ③换睡衣 → ④喂奶（保持清醒！）→ ⑤白噪音 → ⑥放入床。关键：每天相同时间、相同顺序。2个月起开始建立，3-4个月效果明显。' },
  { id:'q012', tags:['白噪音','哄睡','噪音'], category:'睡眠',
    question:'白噪音有用吗？',
    answer:'科学有效！白噪音模拟子宫内声音环境，对新生儿尤其有效。使用建议：①音量控制在50-60分贝（类似洗澡水声）；②距宝宝至少1米；③整夜使用或只用于入睡过渡均可；④可选择：吹风机声、风扇声、流水声、专用白噪音机/App。不必担心依赖，6个月后可逐步降低音量。' },
  { id:'q013', tags:['洗澡','多久洗','频率','沐浴'], category:'日常护理',
    question:'新生儿多久洗一次澡？',
    answer:'新生儿皮肤娇嫩，过于频繁洗澡会破坏天然皮脂屏障。建议：每周2-3次即可，其余时间用温湿毛巾擦拭面部、颈部、臀部等重点部位。洗澡水温：37-38°C（用手肘测试）。脐带未脱落前：海绵浴，避免脐部进水。洗澡时间不超过10分钟，洗后及时擦干涂保湿霜。' },
  { id:'q014', tags:['包裹','蜡烛包','包被','安全感'], category:'日常护理',
    question:'如何正确包裹宝宝？',
    answer:'包裹（Swaddling）模拟子宫环境，有助于安抚。方法：①菱形铺开包被；②上角折下约15cm；③宝宝放在中间，手臂放身侧；④一边包裹压过对边；⑤下角折起；⑥另一边收紧。注意：臀部要有活动空间（预防髋关节发育不良）；会翻身后停止使用包裹。' },
  { id:'q015', tags:['奶嘴','安抚奶嘴','使用','戒断'], category:'喂养',
    question:'安抚奶嘴能用吗？',
    answer:'可以使用，但有注意事项。好处：安抚效果好，研究显示可降低SIDS风险。注意：①母乳喂养宝宝建议4-6周后再引入（避免乳头混淆）；②每次使用后消毒；③不要在奶嘴上涂糖；④6个月后逐渐减少使用。无需强迫，有的宝宝不接受安抚奶嘴是正常的。' },
  { id:'q016', tags:['母乳储存','储奶','冷冻','解冻'], category:'喂养',
    question:'母乳如何储存？',
    answer:'储奶规则：室温(25°C以下)：4小时；冰箱冷藏：最长4天（越早使用越好）；冰箱冷冻：6个月（理想）。解冻方法：冷藏区缓慢解冻 或 温水浴加热（不可微波炉！）。使用顺序：先进先出。解冻后24小时内使用，不可重新冷冻。' },
  { id:'q017', tags:['奶量','追奶','奶少','增加奶量'], category:'喂养',
    question:'奶量不够如何追奶？',
    answer:'科学追奶：①按需哺乳，宝宝越吸越多；②每次喂奶后排空乳房（用吸奶器）；③保证自己充分休息和水分摄入；④不要过早引入配方奶（会减少宝宝吸吮刺激）；⑤多和宝宝肌肤接触。追奶汤（如花生猪脚汤）有一定效果但不是关键。判断奶量够不够看宝宝：每天6+片湿尿布+体重增长正常。' },
  { id:'q018', tags:['奶粉','冲泡','配方奶','温度'], category:'喂养',
    question:'奶粉如何正确冲调？',
    answer:'标准步骤：①烧开水冷却至70°C；②按说明书比例先加水后加粉；③盖好瓶盖摇匀；④冷却至体温（37°C，滴在手腕内侧不烫）后喂。注意：①不要用矿泉水、纯净水以外的饮用水；②不要加糖；③冲好的奶粉2小时内喝完，剩余丢弃不要加热再喝；④每次冲泡量不要超过宝宝一顿的量。' },
  { id:'q019', tags:['发烧','体温','测体温','退烧'], category:'健康',
    question:'宝宝发烧怎么处理？',
    answer:'3个月以下宝宝：腋温≥37.5°C立即就医，不建议家里观察！3个月以上宝宝：腋温38-38.5°C：物理降温（温水擦浴，温度与体温相差2-3°C）；腋温>38.5°C且宝宝精神差：退烧药（对乙酰氨基酚，按体重用量）；腋温>39°C或伴随其他症状：就医。注意：不要用酒精擦浴，不用阿司匹林。' },
  { id:'q020', tags:['趴趴时间','俯卧','抬头','颈部'], category:'发育',
    question:'趴趴时间(Tummy Time)怎么做？',
    answer:'从出生起即可开始，但要在宝宝清醒且有成人看护时进行。方法：①平铺在硬表面（不要在软床上）；②从每次2-3分钟开始；③逐渐增加到每天累计30-60分钟；④可用玩具在眼前吸引。好处：锻炼颈、肩、背部肌肉，预防扁头。宝宝不喜欢可以：趴在父母胸腹上或用毛巾卷垫在胸下。' },
];

// ---- 中国国家免疫规划疫苗（2021版） ----
const VACCINATION_SCHEDULE = [
  { ageDays:0, ageLabel:'出生时', vaccines:[
    { name:'乙型肝炎疫苗', dose:'第1剂', abbr:'HepB-1', type:'national' },
    { name:'卡介苗', dose:'第1剂', abbr:'BCG', type:'national' },
  ]},
  { ageDays:30, ageLabel:'1个月', vaccines:[
    { name:'乙型肝炎疫苗', dose:'第2剂', abbr:'HepB-2', type:'national' },
  ]},
  { ageDays:60, ageLabel:'2个月', vaccines:[
    { name:'脊髓灰质炎灭活疫苗', dose:'第1剂', abbr:'IPV-1', type:'national' },
    { name:'轮状病毒疫苗（推荐）', dose:'第1剂', abbr:'RV-1', type:'recommended', note:'自费，预防轮状病毒腹泻' },
    { name:'Hib疫苗（推荐）', dose:'第1剂', abbr:'Hib-1', type:'recommended', note:'自费，预防流感嗜血杆菌' },
  ]},
  { ageDays:90, ageLabel:'3个月', vaccines:[
    { name:'脊髓灰质炎减毒活疫苗', dose:'第2剂', abbr:'OPV-2', type:'national' },
    { name:'百白破疫苗', dose:'第1剂', abbr:'DTaP-1', type:'national' },
    { name:'13价肺炎球菌疫苗（推荐）', dose:'第1剂', abbr:'PCV13-1', type:'recommended', note:'自费，预防肺炎' },
    { name:'Hib疫苗（推荐）', dose:'第2剂', abbr:'Hib-2', type:'recommended', note:'自费' },
  ]},
  { ageDays:120, ageLabel:'4个月', vaccines:[
    { name:'脊髓灰质炎减毒活疫苗', dose:'第3剂', abbr:'OPV-3', type:'national' },
    { name:'百白破疫苗', dose:'第2剂', abbr:'DTaP-2', type:'national' },
    { name:'13价肺炎球菌疫苗（推荐）', dose:'第2剂', abbr:'PCV13-2', type:'recommended' },
    { name:'Hib疫苗（推荐）', dose:'第3剂', abbr:'Hib-3', type:'recommended' },
  ]},
  { ageDays:150, ageLabel:'5个月', vaccines:[
    { name:'百白破疫苗', dose:'第3剂', abbr:'DTaP-3', type:'national' },
  ]},
  { ageDays:180, ageLabel:'6个月', vaccines:[
    { name:'乙型肝炎疫苗', dose:'第3剂', abbr:'HepB-3', type:'national' },
    { name:'A群脑膜炎球菌多糖疫苗', dose:'第1剂', abbr:'MenA-1', type:'national' },
    { name:'流感疫苗（推荐，每年）', dose:'年度', abbr:'Flu', type:'recommended', note:'自费，每年秋季接种' },
  ]},
  { ageDays:240, ageLabel:'8个月', vaccines:[
    { name:'麻疹/风疹联合疫苗', dose:'第1剂', abbr:'MR-1', type:'national' },
    { name:'乙型脑炎减毒活疫苗', dose:'第1剂', abbr:'JE-1', type:'national' },
  ]},
  { ageDays:270, ageLabel:'9个月', vaccines:[
    { name:'A群脑膜炎球菌多糖疫苗', dose:'第2剂', abbr:'MenA-2', type:'national' },
  ]},
  { ageDays:540, ageLabel:'18个月', vaccines:[
    { name:'百白破疫苗', dose:'加强剂', abbr:'DTaP-4', type:'national' },
    { name:'麻腮风疫苗', dose:'第2剂', abbr:'MMR-2', type:'national' },
    { name:'甲型肝炎减毒活疫苗', dose:'第1剂', abbr:'HepA-1', type:'national' },
  ]},
];

// ---- 年龄阶段提醒 ----
const AGE_REMINDERS = [
  { minDays:28, maxDays:60, icon:'☀️', title:'可以出门晒太阳了！',
    desc:'满月后可以适当户外活动，阳光促进维生素D合成，有助于黄疸消退',
    shopping:['婴儿推车/手推车','遮阳帽','薄包被或纱布毯','湿巾（外出备用）','隔尿垫'],
    tips:['上午10点前或下午4点后出行','避免直射阳光','每次15-20分钟，循序渐进'] },
  { minDays:40, maxDays:90, icon:'💉', title:'疫苗时间快到了',
    desc:'2个月时需要接种第一批计划疫苗（IPV、可选Hib/PCV13/轮状）',
    shopping:['疫苗本/接种记录本','宝宝安抚奶嘴','退烧药备用（对乙酰氨基酚）'],
    tips:['接种前确认宝宝健康状态','接种后观察30分钟再离开','低热是正常反应，超38.5°C可用退烧药'] },
  { minDays:60, maxDays:120, icon:'🎮', title:'可以开始更多互动了',
    desc:'2-4个月宝宝开始对玩具有兴趣，是早期感统刺激的好时机',
    shopping:['黑白卡/彩色卡片','床铃/悬挂玩具（可旋转）','宝宝镜子','牙胶（早备）'],
    tips:['Tummy Time每天累计30分钟','多说话唱歌，语言输入越早越好'] },
  { minDays:60, maxDays:180, icon:'🌿', title:'蚊虫季节到了，做好防护',
    desc:'5-9月蚊虫活跃，6个月以下宝宝禁用化学驱蚊剂',
    shopping:['婴儿蚊帐（适配床型）','物理驱蚊风扇','宝宝专用防蚊贴（天然成分）'],
    tips:['6个月以下禁用任何化学驱蚊产品','不要用樟脑丸/风油精（有毒！）','宝宝房间安装纱窗','电蚊香加热后待散烟再抱宝宝进房'] },
  { minDays:90, maxDays:180, icon:'🎒', title:'可以使用婴儿背带了',
    desc:'3个月后颈部有一定支撑力，可以开始使用合格的人体工学背带',
    shopping:['婴儿背带（人体工学，M型腿设计）','外出隔尿垫'],
    tips:['选择支撑宝宝膝盖高于臀部的M型设计','每次使用不超过2小时','炎热天气注意散热'] },
];

// ---- 季节育儿提醒 ----
const SEASONAL_BABY_TIPS = {
  spring: { icon:'🌸', season:'春季', tips:['春季换季注意保暖，早晚温差大','春季过敏高发，注意观察宝宝有无皮疹打喷嚏','适合户外活动，多晒阳光补充VD'] },
  summer: { icon:'☀️', season:'夏季', tips:['防中暑：避开正午出行，保持室内通风','母乳宝宝夏天不需要额外喂水','6个月以下宝宝禁用防晒霜，用遮阳衣帽','蚊帐必备，禁用化学驱蚊剂'] },
  autumn: { icon:'🍂', season:'秋季', tips:['昼夜温差大，注意添衣','秋燥注意宝宝嘴唇皮肤干燥（涂橄榄油/婴儿护肤品）','秋季是接种流感疫苗的好时机'] },
  winter: { icon:'❄️', season:'冬季', tips:['室内保持适当湿度（40-60%），防止鼻腔干燥','外出包裹好，重点保护手、脸、耳','供暖季注意开窗通风','洗澡水温38°C，洗后迅速擦干保温'] },
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

// ---- 模拟天气数据（无API Key时使用） ----
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
