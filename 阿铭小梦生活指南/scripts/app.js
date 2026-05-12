// =============================================
// 阿铭小梦生活指南 - 主应用控制器
// =============================================

let currentPage = 'home';
let weatherCache = null;

function initApp() {
  updateHeaderDate();
  initSettings();
  initHome();
  initWeather(); // 天气模块（有key则拉真实数据，否则用模拟）
  initCalendar();
  initFood();
  initParenting();
}

// ---- 日期与问候语 ----
function updateHeaderDate() {
  const now = new Date();
  const weekDays = ['日', '一', '二', '三', '四', '五', '六'];
  const dateStr = `${now.getMonth() + 1}月${now.getDate()}日 周${weekDays[now.getDay()]}`;
  document.getElementById('headerDate').textContent = dateStr;

  const el = document.getElementById('homeDateDisplay');
  if (el) {
    el.textContent = `${now.getFullYear()}年${now.getMonth() + 1}月${now.getDate()}日 星期${weekDays[now.getDay()]}`;
  }

  const greetEl = document.getElementById('homeGreeting');
  if (greetEl) {
    const h = now.getHours();
    let greeting = '你好';
    if (h >= 5 && h < 9) greeting = '早上好 ☀️';
    else if (h >= 9 && h < 12) greeting = '上午好！';
    else if (h >= 12 && h < 14) greeting = '中午好 🌤️';
    else if (h >= 14 && h < 18) greeting = '下午好 🌈';
    else if (h >= 18 && h < 22) greeting = '晚上好 🌙';
    else greeting = '夜深了，早点休息 💤';
    greetEl.textContent = greeting;
  }
}

// ---- 页面导航 ----
function navigateTo(page) {
  if (currentPage === page) return;

  document.querySelector(`#page-${currentPage}`)?.classList.remove('active');
  document.querySelector(`.nav-item[data-page="${currentPage}"]`)?.classList.remove('active');

  currentPage = page;

  document.querySelector(`#page-${page}`)?.classList.add('active');
  document.querySelector(`.nav-item[data-page="${page}"]`)?.classList.add('active');

  // 切换页面时刷新内容
  if (page === 'home') refreshHome();
  if (page === 'parenting') refreshParenting();
}

// ---- 设置初始化 ----
function initSettings() {
  let settings = Store.get('settings', {});
  settings.babyBirthDate = '2026-04-08'; // 小又又出生日期
  Store.set('settings', settings);
}

// ---- 首页初始化 ----
function initHome() {
  refreshHome();
}

function refreshHome() {
  updateHeaderDate();
  renderHomeBabyAge();
  renderHomeWeather();
  renderHomeTodosPreview();
  renderHomeFoodPreview();
}

function renderHomeBabyAge() {
  const el = document.getElementById('homeBabyAge');
  if (!el) return;
  const settings = Store.get('settings', {});
  if (!settings.babyBirthDate) return;
  const age = calcBabyAge(settings.babyBirthDate);
  el.textContent = age.text;
}

function renderHomeWeather() {
  const el = document.getElementById('homeWeather');
  if (!el) return;
  const weather = getCachedWeather();
  if (weather && weather.length > 0) {
    const today = weather[0];
    el.textContent = `${today.emoji} ${today.high}°/${today.low}° ${today.type}`;
  } else {
    el.textContent = '点击设置城市';
  }
}

function renderHomeTodosPreview() {
  const el = document.getElementById('homeTodosPreview');
  if (!el) return;
  const today = getToday();
  const todos = Store.get('todos', {});
  const dayTodos = todos[today] || [];
  const pending = dayTodos.filter(t => !t.done);

  if (pending.length === 0) {
    el.innerHTML = '<div class="empty-tip">今日暂无待办 ✨</div>';
  } else {
    el.innerHTML = pending.slice(0, 3).map(t =>
      `<div class="home-todo-item">📌 ${t.text}</div>`
    ).join('') + (pending.length > 3 ? `<div class="home-todo-more">还有 ${pending.length - 3} 项...</div>` : '');
  }
}

function renderHomeFoodPreview() {
  const el = document.getElementById('homeFoodPreview');
  if (!el) return;
  const today = getToday();
  const mealLog = Store.get('mealLog', {});
  const meals = mealLog[today] || {};

  const getName = v => v ? (typeof v === 'object' ? v.name : v) : null;
  const b = getName(meals.breakfast), l = getName(meals.lunch), d = getName(meals.dinner);

  if (!b && !l && !d) {
    const r = FOODS[Math.floor(Math.random() * FOODS.length)];
    el.innerHTML = `<div class="food-preview-card"><span class="food-preview-emoji">${r.emoji}</span><span class="food-preview-name">${r.name}</span><span class="food-preview-tag">${r.origin}</span></div>`;
  } else {
    const lines = [b&&`🌅 早：${b}`, l&&`☀️ 午：${l}`, d&&`🌙 晚：${d}`].filter(Boolean);
    el.innerHTML = lines.map(t => `<div class="home-meal-item">${t}</div>`).join('');
  }
}

// ---- 首页快速记录（育儿） ----
function quickLog(type) {
  const typeMap = { eat: '🍼 吃奶', sleep: '😴 睡觉', diaper: '🚼 换尿布', activity: '🎮 玩耍' };
  const now = new Date();
  const timeStr = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
  const today = getToday();
  let logs = Store.get('babyLog', {});
  if (!logs[today]) logs[today] = [];
  logs[today].push({ type, label: typeMap[type], time: timeStr, id: Date.now() });
  Store.set('babyLog', logs);

  // 简短反馈
  const btn = event?.target?.closest('.easy-btn');
  if (btn) {
    const orig = btn.textContent;
    btn.textContent = '✓ 已记录';
    btn.style.background = '#4CAF7D';
    btn.style.color = 'white';
    setTimeout(() => {
      btn.textContent = orig;
      btn.style.background = '';
      btn.style.color = '';
    }, 1500);
  }
}

function getCachedWeather() {
  if (!weatherCache) weatherCache = getMockWeather();
  return weatherCache;
}
