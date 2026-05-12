// =============================================
// 阿铭小梦生活指南 - 主应用控制器
// =============================================

let currentPage = 'home';
let weatherCache = null;

function initApp() {
  initDarkMode();
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
  if (page === 'calendar') renderCalendar();
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
  renderAnniversaryList();
  renderHomeTodosPreview();
  renderNotesBoard();
  renderHomeFoodPreview();
  renderShoppingList();
}

// ---- 待购清单 ----
function renderShoppingList() {
  const el = document.getElementById('homeShoppingList');
  if (!el) return;
  const items = Store.get('shoppingList', []);
  if (!items.length) {
    el.innerHTML = '<div class="empty-tip">添加超市要买的东西～</div>';
    return;
  }
  el.innerHTML = items.map((item, i) => `
    <div class="shopping-item ${item.done ? 'done' : ''}">
      <span class="shopping-check" onclick="toggleShoppingItem(${i})">${item.done ? '✅' : '⭕'}</span>
      <span class="shopping-text">${item.text}</span>
      <button class="shopping-delete" onclick="deleteShoppingItem(${i})">✕</button>
    </div>
  `).join('');
}

function addShoppingItem() {
  const input = document.getElementById('newShoppingInput');
  const text = input.value.trim();
  if (!text) return;
  const items = Store.get('shoppingList', []);
  items.push({ id: Date.now(), text, done: false });
  Store.set('shoppingList', items);
  input.value = '';
  renderShoppingList();
}

function toggleShoppingItem(index) {
  const items = Store.get('shoppingList', []);
  if (items[index]) {
    items[index].done = !items[index].done;
    Store.set('shoppingList', items);
    renderShoppingList();
  }
}

function deleteShoppingItem(index) {
  const items = Store.get('shoppingList', []);
  items.splice(index, 1);
  Store.set('shoppingList', items);
  renderShoppingList();
}

function clearDoneShoppingItems() {
  const items = Store.get('shoppingList', []).filter(i => !i.done);
  Store.set('shoppingList', items);
  renderShoppingList();
  showToast('已清除已购项目 ✓');
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

function showToast(msg) {
  let t = document.getElementById('appToast');
  if (!t) { t = document.createElement('div'); t.id='appToast'; t.className='app-toast'; document.querySelector('.app-shell').appendChild(t); }
  t.textContent = msg; t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2200);
}

// =============================================
// 深色模式
// =============================================
function initDarkMode() {
  const dark = Store.get('darkMode', false);
  if (dark) {
    document.documentElement.setAttribute('data-theme', 'dark');
    const btn = document.getElementById('darkModeBtn');
    if (btn) btn.textContent = '☀️';
  }
}

function toggleDarkMode() {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const btn = document.getElementById('darkModeBtn');
  if (isDark) {
    document.documentElement.removeAttribute('data-theme');
    Store.set('darkMode', false);
    if (btn) btn.textContent = '🌙';
    showToast('已切换为浅色模式');
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
    Store.set('darkMode', true);
    if (btn) btn.textContent = '☀️';
    showToast('已切换为深色模式');
  }
}

// =============================================
// 纪念日
// =============================================
const DEFAULT_ANNIVERSARIES = [
  { id:'a_wedding', name:'结婚纪念日', date:'2024-10-01', type:'yearly', emoji:'💍' },
  { id:'a_baby', name:'小又又生日', date:'2026-04-08', type:'yearly', emoji:'🎂' },
];

function getAnniversaries() {
  return Store.get('anniversaries', DEFAULT_ANNIVERSARIES);
}

function renderAnniversaryList() {
  const el = document.getElementById('anniversaryList');
  if (!el) return;
  const list = getAnniversaries();
  const today = new Date();
  today.setHours(0,0,0,0);

  const items = list.map(a => {
    const raw = parseDate(a.date);
    let next = new Date(today.getFullYear(), raw.getMonth(), raw.getDate());
    if (a.type === 'yearly') {
      if (next < today) next.setFullYear(next.getFullYear() + 1);
    } else {
      next = new Date(raw);
    }
    const diff = Math.round((next - today) / 86400000);
    return { ...a, diff, next };
  }).filter(a => a.diff >= 0 && a.diff <= 60)
    .sort((x, y) => x.diff - y.diff);

  if (!items.length) {
    el.innerHTML = '<div class="empty-tip">最近60天内无纪念日 🎈</div>';
    return;
  }
  el.innerHTML = items.map(a => {
    const countdownClass = a.diff === 0 ? 'anniv-countdown today' : 'anniv-countdown';
    const countdownText = a.diff === 0 ? '🎉 今天！' : `还有 ${a.diff} 天`;
    return `<div class="anniversary-item">
      <span class="anniv-icon">${a.emoji || '🎂'}</span>
      <div class="anniv-info">
        <div class="anniv-name">${a.name}</div>
        <div class="anniv-date-str">${a.date}${a.type === 'yearly' ? '（每年）' : ''}</div>
      </div>
      <span class="${countdownClass}">${countdownText}</span>
    </div>`;
  }).join('');
}

function openAnniversaryModal() {
  const modal = document.getElementById('anniversaryModal');
  if (modal) { modal.style.display = 'flex'; renderAnniversaryEditList(); }
}

function closeAnniversaryModal() {
  const modal = document.getElementById('anniversaryModal');
  if (modal) modal.style.display = 'none';
  renderAnniversaryList();
}

function renderAnniversaryEditList() {
  const el = document.getElementById('anniversaryEditList');
  if (!el) return;
  const list = getAnniversaries();
  if (!list.length) { el.innerHTML = '<div class="empty-tip" style="padding:8px 0">暂无纪念日</div>'; return; }
  el.innerHTML = list.map((a, i) => `
    <div class="anniversary-edit-item">
      <span>${a.emoji || '🎂'}</span>
      <div class="anniv-edit-info">
        <div>${a.name}</div>
        <div style="color:var(--text-light);font-size:11px">${a.date} · ${a.type === 'yearly' ? '每年' : '仅一次'}</div>
      </div>
      <button class="anniv-delete" onclick="deleteAnniversary(${i})">🗑️</button>
    </div>
  `).join('');
}

function addAnniversary() {
  const name = document.getElementById('annivNameInput')?.value.trim();
  const date = document.getElementById('annivDateInput')?.value;
  const type = document.getElementById('annivTypeInput')?.value || 'yearly';
  if (!name || !date) { showToast('请填写名称和日期'); return; }
  const list = getAnniversaries();
  const emojis = { '生日': '🎂', '纪念': '💍', '婚': '💍', '宝宝': '👶', '妈': '💗', '爸': '💪', '旅': '✈️' };
  let emoji = '🎉';
  for (const [k, v] of Object.entries(emojis)) {
    if (name.includes(k)) { emoji = v; break; }
  }
  list.push({ id: 'a_' + Date.now(), name, date, type, emoji });
  Store.set('anniversaries', list);
  document.getElementById('annivNameInput').value = '';
  document.getElementById('annivDateInput').value = '';
  renderAnniversaryEditList();
  showToast('纪念日已添加 ✓');
}

function deleteAnniversary(index) {
  const list = getAnniversaries();
  list.splice(index, 1);
  Store.set('anniversaries', list);
  renderAnniversaryEditList();
  showToast('已删除');
}

// =============================================
// 便签板
// =============================================
const NOTE_COLORS = {
  yellow: '#FFE066', pink: '#FFB3C6', blue: '#A0D2EB',
  green: '#B5EAD7', orange: '#FFDAB3'
};
let currentNoteColor = 'yellow';
let editingNoteId = null;

function renderNotesBoard() {
  const el = document.getElementById('notesBoard');
  if (!el) return;
  const notes = Store.get('notes', []);
  if (!notes.length) {
    el.innerHTML = '<div class="empty-tip">点击「新便签」记录灵感、留言～</div>';
    return;
  }
  el.innerHTML = notes.map(n => `
    <div class="note-card" style="background:${NOTE_COLORS[n.color] || NOTE_COLORS.yellow}">
      <div class="note-card-text">${escapeHtml(n.text)}</div>
      <div class="note-card-time">${n.time || ''}</div>
      <div class="note-card-actions">
        <button class="note-card-edit" onclick="editNote('${n.id}')">编辑</button>
        <button class="note-card-del" onclick="deleteNote('${n.id}')">删除</button>
      </div>
    </div>
  `).join('');
}

function escapeHtml(str) {
  return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function addNote() {
  editingNoteId = null;
  currentNoteColor = 'yellow';
  document.getElementById('noteContentInput').value = '';
  document.getElementById('noteModalTitle').textContent = '📝 新便签';
  document.querySelectorAll('.note-color-dot').forEach(d => d.classList.toggle('active', d.dataset.color === 'yellow'));
  const modal = document.getElementById('noteModal');
  if (modal) modal.style.display = 'flex';
}

function editNote(id) {
  const notes = Store.get('notes', []);
  const note = notes.find(n => n.id === id);
  if (!note) return;
  editingNoteId = id;
  currentNoteColor = note.color || 'yellow';
  document.getElementById('noteContentInput').value = note.text;
  document.getElementById('noteModalTitle').textContent = '📝 编辑便签';
  document.querySelectorAll('.note-color-dot').forEach(d => d.classList.toggle('active', d.dataset.color === currentNoteColor));
  const modal = document.getElementById('noteModal');
  if (modal) modal.style.display = 'flex';
}

function closeNoteModal() {
  const modal = document.getElementById('noteModal');
  if (modal) modal.style.display = 'none';
}

function selectNoteColor(el) {
  currentNoteColor = el.dataset.color;
  document.querySelectorAll('.note-color-dot').forEach(d => d.classList.remove('active'));
  el.classList.add('active');
}

function saveNote() {
  const text = document.getElementById('noteContentInput')?.value.trim();
  if (!text) { showToast('请输入便签内容'); return; }
  const notes = Store.get('notes', []);
  const now = new Date();
  const timeStr = `${now.getMonth()+1}/${now.getDate()} ${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
  if (editingNoteId) {
    const idx = notes.findIndex(n => n.id === editingNoteId);
    if (idx >= 0) { notes[idx].text = text; notes[idx].color = currentNoteColor; notes[idx].time = timeStr; }
  } else {
    notes.unshift({ id: 'n_' + Date.now(), text, color: currentNoteColor, time: timeStr });
  }
  Store.set('notes', notes);
  closeNoteModal();
  renderNotesBoard();
  showToast(editingNoteId ? '便签已更新 ✓' : '便签已保存 ✓');
}

function deleteNote(id) {
  const notes = Store.get('notes', []).filter(n => n.id !== id);
  Store.set('notes', notes);
  renderNotesBoard();
  showToast('便签已删除');
}

// =============================================
// 数据导出
// =============================================
function exportData() {
  const keys = ['shoppingList','todos','expenses','mealLog','babyLog','growthRecords',
    'vacStatus','notes','anniversaries','settings','weatherSettings'];
  const data = {};
  keys.forEach(k => {
    const v = Store.get(k, null);
    if (v !== null) data[k] = v;
  });
  data._exportTime = new Date().toISOString();
  data._version = '1.0';
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `阿铭小梦生活数据_${getToday()}.json`;
  a.click();
  URL.revokeObjectURL(url);
  showToast('数据已导出 📤');
}
