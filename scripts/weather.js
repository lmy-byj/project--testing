// =============================================
// 天气模块 — 和风天气 QWeather API
// =============================================

const QWEATHER_7D  = 'https://devapi.qweather.com/v7/weather/7d';
const QWEATHER_24H = 'https://devapi.qweather.com/v7/weather/24h';

// 默认配置（已硬编码，无需手动设置）
const DEFAULT_KEY     = 'de7acc215bf742cb915e5bd8e2101d77';
const DEFAULT_CITY_ID = '101020100';
const DEFAULT_CITY    = '上海';

// 内置城市列表
const CITY_LIST = [
  { id:'101020100', name:'上海',    adm1:'上海' },
  { id:'101010100', name:'北京',    adm1:'北京' },
  { id:'101130101', name:'乌鲁木齐', adm1:'新疆' },
  { id:'101130301', name:'喀什',    adm1:'新疆' },
  { id:'101130401', name:'库尔勒',  adm1:'新疆' },
  { id:'101130201', name:'克拉玛依', adm1:'新疆' },
  { id:'101130601', name:'伊宁',    adm1:'新疆' },
  { id:'101110101', name:'西安',    adm1:'陕西' },
  { id:'101110201', name:'宝鸡',    adm1:'陕西' },
  { id:'101280601', name:'深圳',    adm1:'广东' },
  { id:'101280101', name:'广州',    adm1:'广东' },
  { id:'101270101', name:'成都',    adm1:'四川' },
  { id:'101210101', name:'杭州',    adm1:'浙江' },
  { id:'101190101', name:'南京',    adm1:'江苏' },
  { id:'101200101', name:'武汉',    adm1:'湖北' },
  { id:'101040100', name:'重庆',    adm1:'重庆' },
  { id:'101030100', name:'天津',    adm1:'天津' },
  { id:'101050101', name:'哈尔滨',  adm1:'黑龙江' },
  { id:'101060101', name:'长春',    adm1:'吉林' },
  { id:'101070101', name:'沈阳',    adm1:'辽宁' },
  { id:'101160101', name:'兰州',    adm1:'甘肃' },
  { id:'101150101', name:'西宁',    adm1:'青海' },
  { id:'101140101', name:'银川',    adm1:'宁夏' },
  { id:'101120101', name:'郑州',    adm1:'河南' },
  { id:'101090101', name:'石家庄',  adm1:'河北' },
  { id:'101100101', name:'太原',    adm1:'山西' },
  { id:'101080101', name:'呼和浩特', adm1:'内蒙古' },
  { id:'101230101', name:'福州',    adm1:'福建' },
  { id:'101240101', name:'南昌',    adm1:'江西' },
  { id:'101250101', name:'长沙',    adm1:'湖南' },
  { id:'101300101', name:'南宁',    adm1:'广西' },
  { id:'101310101', name:'海口',    adm1:'海南' },
  { id:'101320101', name:'贵阳',    adm1:'贵州' },
  { id:'101290101', name:'昆明',    adm1:'云南' },
];
const WEATHER_TTL = 30 * 60 * 1000;

const ICON_MAP = {
  '100':'☀️','101':'🌤️','102':'⛅','103':'🌥️','104':'☁️',
  '150':'🌙','151':'🌙','152':'🌙','153':'🌙',
  '300':'🌦️','301':'🌦️','302':'⛈️','303':'⛈️','304':'🌩️',
  '305':'🌧️','306':'🌧️','307':'🌧️','308':'💧','309':'🌫️',
  '310':'🌀','311':'🌧️','312':'🌧️','313':'🌨️','314':'🌨️',
  '315':'❄️','316':'❄️','317':'❄️','318':'❄️','399':'🌧️',
  '400':'🌨️','401':'❄️','402':'❄️','403':'🌨️','499':'❄️',
  '500':'🌫️','501':'🌫️','502':'🌫️','503':'💨','504':'💨',
};
function iconEmoji(code) { return ICON_MAP[String(code)] || '🌡️'; }

function getWSettings() {
  const s = Store.get('weatherCfg', {});
  // 自动补全默认值
  if (!s.key)    s.key    = DEFAULT_KEY;
  if (!s.cityId) s.cityId = DEFAULT_CITY_ID;
  if (!s.cityName) s.cityName = DEFAULT_CITY;
  return s;
}
function saveWSettings(s) { Store.set('weatherCfg', s); }

// ---- 初始化（自动加载，无需手动设置）----
async function initWeather() {
  const s = getWSettings();
  await loadWeather(s);
}

async function loadWeather(s) {
  const cached = Store.get('wxCache', null);
  if (cached && Date.now() - cached.ts < WEATHER_TTL) {
    weatherCache = cached.data;
    renderWeatherStrip();
    renderHomeWeather();
    return;
  }
  try {
    const url = `${QWEATHER_7D}?location=${s.cityId}&key=${s.key}&lang=zh`;
    const res = await fetch(url);
    const json = await res.json();
    if (json.code !== '200') throw new Error(json.code);

    weatherCache = json.daily.map(d => ({
      date: d.fxDate,
      type: d.textDay,
      emoji: iconEmoji(d.iconDay),
      high: parseInt(d.tempMax),
      low:  parseInt(d.tempMin),
      precip: parseFloat(d.precip || 0),
      rainProb: parseFloat(d.precip || 0) > 0 ? Math.min(95, 40 + parseFloat(d.precip)*8) : parseInt(d.humidity||0) > 80 ? 30 : 10,
      humidity: parseInt(d.humidity || 0),
      windDir: d.windDirDay,
      windScale: d.windScaleDay,
    }));

    Store.set('wxCache', { ts: Date.now(), data: weatherCache });
    renderWeatherStrip();
    renderHomeWeather();
  } catch(e) {
    console.warn('天气API失败，使用模拟数据', e.message);
    weatherCache = getMockWeather();
    renderWeatherStrip();
    renderHomeWeather();
  }
}

// ---- 24小时天气 ----
async function load24hWeather(dateStr) {
  const s = getWSettings();
  const cached = Store.get('wx24hCache', null);
  if (cached && Date.now() - cached.ts < 3600000) {
    if (typeof renderHourlyStrip === 'function') renderHourlyStrip(cached.data);
    return;
  }
  try {
    const url = `${QWEATHER_24H}?location=${s.cityId}&key=${s.key}&lang=zh`;
    const res = await fetch(url);
    const json = await res.json();
    if (json.code !== '200') throw new Error(json.code);

    const data = json.hourly.map(h => ({
      time: h.fxTime.slice(11, 16),
      emoji: iconEmoji(h.icon),
      temp: parseInt(h.temp),
      text: h.text,
    }));

    Store.set('wx24hCache', { ts: Date.now(), data });
    if (typeof renderHourlyStrip === 'function') renderHourlyStrip(data);
  } catch(e) {
    console.warn('24h天气获取失败', e.message);
  }
}

// ---- 城市搜索 ----
function searchCity(cityName) {
  const kw = cityName.trim();
  if (!kw) throw new Error('请输入城市名');
  const results = CITY_LIST.filter(c => c.name.includes(kw) || c.adm1.includes(kw));
  if (!results.length) throw new Error('未找到该城市，换个关键字试试（如：上海、乌鲁木齐）');
  return results;
}

function locateGPS() {
  return Promise.reject(new Error('GPS定位暂不支持，请手动搜索城市名'));
}

// ---- 天气设置弹窗 ----
function openWeatherSettings() {
  const s = getWSettings();
  const modal = document.getElementById('weatherModal');
  document.getElementById('wApiKeyInput').value = s.key || '';
  document.getElementById('wCityDisplay').textContent = `当前城市：${s.cityName || '未选择'}`;
  document.getElementById('wCitySearch').value = '';
  document.getElementById('wCityResults').innerHTML = '';
  document.getElementById('wStatusMsg').textContent = '';
  modal.style.display = 'flex';
}

function closeWeatherModal() {
  document.getElementById('weatherModal').style.display = 'none';
}

async function doSearchCity() {
  const key = document.getElementById('wApiKeyInput').value.trim();
  const cityName = document.getElementById('wCitySearch').value.trim();
  const statusEl = document.getElementById('wStatusMsg');
  const resultsEl = document.getElementById('wCityResults');

  if (!key) { statusEl.textContent = '⚠️ 请先填写 API Key'; return; }
  if (!cityName) { statusEl.textContent = '⚠️ 请输入城市名'; return; }

  statusEl.textContent = '🔍 搜索中...';
  resultsEl.innerHTML = '';
  try {
    const cities = searchCity(cityName);
    statusEl.textContent = `找到 ${cities.length} 个结果，选择你的城市：`;
    resultsEl.innerHTML = cities.map((c, i) => `
      <div class="city-result-item" onclick="selectCity(${i})">
        <span class="city-name">${c.name}</span>
        <span class="city-adm">${c.adm1}</span>
      </div>
    `).join('');
    window._citySearchResults = cities;
    document.getElementById('wApiKeyInput').dataset.key = key;
  } catch(e) {
    statusEl.textContent = '❌ ' + e.message;
  }
}

async function doLocateGPS() {
  const statusEl = document.getElementById('wStatusMsg');
  statusEl.textContent = '❌ GPS定位暂不支持，请手动搜索城市名';
}

async function selectCity(idx) {
  const city = window._citySearchResults?.[idx];
  const key = document.getElementById('wApiKeyInput').dataset.key || document.getElementById('wApiKeyInput').value.trim();
  if (!city || !key) return;
  document.getElementById('wStatusMsg').textContent = '✅ 已选择：' + city.name;
  await applyCity(city, key);
}

async function applyCity(city, key) {
  const s = { key, cityId: city.id, cityName: city.name };
  saveWSettings(s);
  Store.set('wxCache', null);
  Store.set('wx24hCache', null);
  document.getElementById('wCityDisplay').textContent = `当前城市：${city.name}`;
  setTimeout(() => {
    closeWeatherModal();
    loadWeather(s);
  }, 800);
}

function renderWeatherSetupPrompt() {
  const strip = document.getElementById('weatherStrip');
  if (strip) strip.innerHTML = `
    <div class="weather-setup-prompt" onclick="openWeatherSettings()">
      🌤️ 点击切换城市 →
    </div>`;
}
