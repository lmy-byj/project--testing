// =============================================
// 天气模块 — 和风天气 QWeather API
// 注册免费Key: https://dev.qweather.com/
// 免费版：1000次/天，够用
// =============================================

const QWEATHER_GEO   = 'https://geoapi.qweather.com/v2/city/lookup';
const QWEATHER_7D    = 'https://devapi.qweather.com/v7/weather/7d';
const WEATHER_TTL    = 30 * 60 * 1000; // 30分钟缓存

// QWeather 图标code → emoji
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

function getWSettings() { return Store.get('weatherCfg', { key:'', cityId:'', cityName:'' }); }
function saveWSettings(s) { Store.set('weatherCfg', s); }

// ---- 初始化 ----
async function initWeather() {
  const s = getWSettings();
  if (!s.key || !s.cityId) {
    renderWeatherSetupPrompt();
    return;
  }
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

// ---- 城市搜索 ----
async function searchCity(cityName, apiKey) {
  const url = `${QWEATHER_GEO}?location=${encodeURIComponent(cityName)}&key=${apiKey}&lang=zh&number=5`;
  const res = await fetch(url);
  const json = await res.json();
  if (json.code === '401') throw new Error('API Key 无效，请检查');
  if (json.code !== '200' || !json.location?.length) throw new Error('未找到该城市，换个关键字试试');
  return json.location;
}

// ---- GPS 定位 ----
function locateGPS(apiKey) {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) { reject(new Error('浏览器不支持定位功能')); return; }
    navigator.geolocation.getCurrentPosition(async pos => {
      const { latitude: lat, longitude: lng } = pos.coords;
      const url = `${QWEATHER_GEO}?location=${lng.toFixed(4)},${lat.toFixed(4)}&key=${apiKey}&lang=zh`;
      try {
        const res = await fetch(url);
        const json = await res.json();
        if (json.code === '200' && json.location?.length) resolve(json.location[0]);
        else reject(new Error('定位解析失败，请手动输入城市'));
      } catch(e) { reject(e); }
    }, () => reject(new Error('定位被拒绝，请手动输入城市')), { timeout:8000 });
  });
}

// ---- 天气设置弹窗 ----
function openWeatherSettings() {
  const s = getWSettings();
  const modal = document.getElementById('weatherModal');
  document.getElementById('wApiKeyInput').value = s.key || '';
  document.getElementById('wCityDisplay').textContent = s.cityName ? `当前城市：${s.cityName}` : '尚未选择城市';
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
    const cities = await searchCity(cityName, key);
    statusEl.textContent = `找到 ${cities.length} 个结果，选择你的城市：`;
    resultsEl.innerHTML = cities.map((c,i) => `
      <div class="city-result-item" onclick="selectCity(${i})">
        <span class="city-name">${c.name}</span>
        <span class="city-adm">${c.adm1} · ${c.adm2}</span>
      </div>
    `).join('');
    window._citySearchResults = cities;
    document.getElementById('wApiKeyInput').dataset.key = key;
  } catch(e) {
    statusEl.textContent = '❌ ' + e.message;
  }
}

async function doLocateGPS() {
  const key = document.getElementById('wApiKeyInput').value.trim();
  const statusEl = document.getElementById('wStatusMsg');
  if (!key) { statusEl.textContent = '⚠️ 请先填写 API Key'; return; }

  statusEl.textContent = '📍 定位中，请允许浏览器访问位置...';
  try {
    const city = await locateGPS(key);
    statusEl.textContent = `✅ 定位成功：${city.name}（${city.adm1}）`;
    await applyCity(city, key);
  } catch(e) {
    statusEl.textContent = '❌ ' + e.message;
  }
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
  Store.set('wxCache', null); // 清缓存强制刷新
  document.getElementById('wCityDisplay').textContent = `当前城市：${city.name}`;
  setTimeout(() => {
    closeWeatherModal();
    loadWeather(s);
  }, 800);
}

// ---- 无Key时的提示 ----
function renderWeatherSetupPrompt() {
  const strip = document.getElementById('weatherStrip');
  if (strip) strip.innerHTML = `
    <div class="weather-setup-prompt" onclick="openWeatherSettings()">
      🌤️ 点击设置 API Key，获取真实天气 →
    </div>`;
  const el = document.getElementById('homeWeather');
  if (el) el.textContent = '点击设置天气';
}
