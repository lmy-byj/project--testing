// =============================================
// 阿铭小梦生活指南 - 日历模块 v2
// =============================================

let calYear, calMonth, selectedDate;

const CAT_EMOJI = {
  '餐饮':'🍽️','购物':'🛍️','出行':'🚗','娱乐':'🎮','宝宝':'👶','其他':'📝'
};

function initCalendar() {
  const now = new Date();
  calYear = now.getFullYear();
  calMonth = now.getMonth();
  selectedDate = getToday();
  renderCalendar();
  renderWeatherStrip();
}

// ---- 渲染日历 ----
function renderCalendar() {
  if (calYear === undefined) { initCalendar(); return; }
  const titleEl = document.getElementById('calendarMonthTitle');
  titleEl.textContent = `${calYear}年 ${calMonth + 1}月`;

  const grid = document.getElementById('calendarGrid');
  grid.innerHTML = '';

  const firstDay = new Date(calYear, calMonth, 1).getDay();
  const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
  const daysInPrevMonth = new Date(calYear, calMonth, 0).getDate();
  const today = getToday();

  const todos = Store.get('todos', {});
  const expenses = Store.get('expenses', {});

  // 上月补位
  for (let i = firstDay - 1; i >= 0; i--) {
    const day = daysInPrevMonth - i;
    const cell = createDayCell(calYear, calMonth - 1, day, true);
    grid.appendChild(cell);
  }

  // 本月日期
  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${calYear}-${String(calMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    const isToday = dateStr === today;
    const isSelected = dateStr === selectedDate;
    const holiday = HOLIDAYS[dateStr];
    const dayTodos = todos[dateStr] || [];
    const hasTodos = dayTodos.length > 0;
    const hasOverdue = dateStr < today && dayTodos.some(t => !t.done);
    const hasExpense = expenses[dateStr]?.items?.length > 0;

    const cell = document.createElement('div');
    cell.className = 'cal-day' +
      (isToday ? ' today' : '') +
      (isSelected ? ' selected' : '') +
      (holiday?.type === 'holiday' ? ' holiday' : '') +
      (holiday?.type === 'workday' ? ' workday' : '') +
      (new Date(calYear, calMonth, d).getDay() === 0 || new Date(calYear, calMonth, d).getDay() === 6 ? ' weekend' : '');

    cell.innerHTML = `
      <div class="cal-day-num">${d}</div>
      ${holiday ? `<div class="cal-day-holiday">${holiday.name}</div>` : ''}
      <div class="cal-day-dots">
        ${hasTodos ? `<span class="dot ${hasOverdue ? 'dot-overdue' : 'dot-todo'}"></span>` : ''}
        ${hasExpense ? '<span class="dot dot-expense"></span>' : ''}
      </div>
    `;
    cell.onclick = () => openDayPanel(dateStr);
    grid.appendChild(cell);
  }

  // 下月补位
  const totalCells = grid.children.length;
  const remaining = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);
  for (let d = 1; d <= remaining; d++) {
    const cell = createDayCell(calYear, calMonth + 1, d, true);
    grid.appendChild(cell);
  }

  updateMonthlySummary();
}

function createDayCell(year, month, day, faded) {
  const cell = document.createElement('div');
  cell.className = 'cal-day faded';
  cell.innerHTML = `<div class="cal-day-num">${day}</div>`;
  return cell;
}

// ---- 月份切换 ----
function calendarPrevMonth() {
  calMonth--;
  if (calMonth < 0) { calMonth = 11; calYear--; }
  renderCalendar();
}

function calendarNextMonth() {
  calMonth++;
  if (calMonth > 11) { calMonth = 0; calYear++; }
  renderCalendar();
}

// ---- 天气条 ----
function renderWeatherStrip() {
  const strip = document.getElementById('weatherStrip');
  if (!strip) return;
  const weather = getCachedWeather();
  const weekDays = ['日', '一', '二', '三', '四', '五', '六'];

  strip.innerHTML = weather.map((w, i) => {
    const d = parseDate(w.date);
    const label = i === 0 ? '今天' : i === 1 ? '明天' : `周${weekDays[d.getDay()]}`;
    return `
      <div class="weather-item" onclick="openDayPanel('${w.date}')">
        <div class="weather-label">${label}</div>
        <div class="weather-emoji">${w.emoji}</div>
        <div class="weather-temp">${w.high}°<br><span>${w.low}°</span></div>
        ${w.rainProb > 30 ? `<div class="weather-rain">☂${w.rainProb}%</div>` : ''}
      </div>
    `;
  }).join('');
}

// ---- 日期详情面板 ----
function openDayPanel(dateStr) {
  selectedDate = dateStr;
  renderCalendar();

  const panel = document.getElementById('dayPanel');
  panel.style.display = 'block';

  const [y, m, d] = dateStr.split('-').map(Number);
  const weekDays = ['日', '一', '二', '三', '四', '五', '六'];
  const weekDay = weekDays[new Date(y, m - 1, d).getDay()];
  const holiday = HOLIDAYS[dateStr];
  const holidayStr = holiday ? ` · ${holiday.name}` : '';

  document.getElementById('dayPanelTitle').textContent = `${m}月${d}日 周${weekDay}${holidayStr}`;

  renderDayWeather(dateStr);
  renderHourlyWeather(dateStr);
  renderDayTodos(dateStr);
  renderDayExpenses(dateStr);

  panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function closeDayPanel() {
  document.getElementById('dayPanel').style.display = 'none';
}

function renderDayWeather(dateStr) {
  const el = document.getElementById('dayWeather');
  const weather = getCachedWeather();
  const dayWeather = weather.find(w => w.date === dateStr);

  if (!dayWeather) {
    el.innerHTML = '';
    return;
  }

  const clothingIdx = CLOTHING_ADVICE.findIndex(c => dayWeather.high <= c.maxTemp);
  const clothing = CLOTHING_ADVICE[clothingIdx >= 0 ? clothingIdx : CLOTHING_ADVICE.length - 1];
  const needUmbrella = dayWeather.rainProb > 30;

  el.innerHTML = `
    <div class="day-weather-card">
      <div class="day-weather-main">
        <span class="day-weather-emoji">${dayWeather.emoji}</span>
        <div>
          <div class="day-weather-type">${dayWeather.type}</div>
          <div class="day-weather-temp">${dayWeather.high}° / ${dayWeather.low}°</div>
        </div>
      </div>
      <div class="day-weather-tips">
        <div>👕 ${clothing.text}</div>
        ${needUmbrella ? `<div>☂️ 降水概率${dayWeather.rainProb}%，记得带伞！</div>` : ''}
      </div>
    </div>
  `;
}

// ---- 24小时天气（今日专属）----
function renderHourlyWeather(dateStr) {
  const el = document.getElementById('hourlyWeather');
  if (!el) return;

  if (dateStr !== getToday()) {
    el.style.display = 'none';
    return;
  }

  const cached = Store.get('wx24hCache', null);
  if (cached && cached.data && Date.now() - cached.ts < 3600000) {
    el.style.display = 'block';
    renderHourlyStrip(cached.data);
    return;
  }

  el.style.display = 'none';
  if (typeof load24hWeather === 'function') load24hWeather(dateStr);
}

function renderHourlyStrip(hours) {
  const el = document.getElementById('hourlyWeather');
  if (!el) return;
  el.style.display = 'block';
  el.innerHTML = '<div class="hourly-label">⏰ 今日逐小时</div>' +
    '<div class="hourly-strip">' +
    (hours || []).map(h => `
      <div class="hourly-item">
        <div class="hourly-time">${h.time}</div>
        <div class="hourly-emoji">${h.emoji}</div>
        <div class="hourly-temp">${h.temp}°</div>
      </div>
    `).join('') +
    '</div>';
}

// ---- 待办事项 ----
function renderDayTodos(dateStr) {
  const list = document.getElementById('dayTodoList');
  const todos = Store.get('todos', {});
  const items = todos[dateStr] || [];
  const today = getToday();
  const isPast = dateStr < today;

  if (items.length === 0) {
    list.innerHTML = '<div class="empty-tip">暂无待办，添加一个吧～</div>';
    return;
  }

  // 未完成排前面
  const sorted = [...items].map((t, i) => ({ ...t, _i: i }))
    .sort((a, b) => {
      if (a.done !== b.done) return a.done ? 1 : -1;
      if ((a.priority === '重要') !== (b.priority === '重要')) return a.priority === '重要' ? -1 : 1;
      return 0;
    });

  list.innerHTML = sorted.map(t => `
    <div class="todo-item ${t.done ? 'done' : ''} ${!t.done && isPast ? 'overdue' : ''}">
      <span class="todo-checkbox" onclick="toggleTodo('${dateStr}', ${t._i})">${t.done ? '✅' : '⭕'}</span>
      <div class="todo-body">
        <span class="todo-text">${t.text}</span>
        <span class="todo-badges">
          ${t.priority === '重要' ? '<span class="badge badge-important">重要</span>' : ''}
          ${!t.done && isPast ? '<span class="badge badge-overdue">过期</span>' : ''}
        </span>
      </div>
      <button class="todo-delete" onclick="deleteTodo('${dateStr}', ${t._i})">✕</button>
    </div>
  `).join('');
}

function addTodo() {
  const input = document.getElementById('newTodoInput');
  const priorityEl = document.getElementById('newTodoPriority');
  const text = input.value.trim();
  if (!text) return;

  let todos = Store.get('todos', {});
  if (!todos[selectedDate]) todos[selectedDate] = [];
  todos[selectedDate].push({
    id: Date.now(),
    text,
    done: false,
    priority: priorityEl ? priorityEl.value : '普通',
  });
  Store.set('todos', todos);

  input.value = '';
  renderDayTodos(selectedDate);
  renderCalendar();
  renderHomeTodosPreview();
}

function toggleTodo(dateStr, index) {
  let todos = Store.get('todos', {});
  if (todos[dateStr]?.[index] !== undefined) {
    todos[dateStr][index].done = !todos[dateStr][index].done;
    Store.set('todos', todos);
    renderDayTodos(dateStr);
    updateMonthlySummary();
    renderCalendar();
  }
}

function deleteTodo(dateStr, index) {
  let todos = Store.get('todos', {});
  todos[dateStr]?.splice(index, 1);
  Store.set('todos', todos);
  renderDayTodos(dateStr);
  renderCalendar();
  updateMonthlySummary();
}

// ---- 记账功能 ----
function selectExpenseCat(btn) {
  document.querySelectorAll('.exp-cat').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

function renderDayExpenses(dateStr) {
  const list = document.getElementById('dayExpenseList');
  const expenses = Store.get('expenses', {});
  const data = expenses[dateStr] || { items: [] };

  if (data.items.length === 0) {
    list.innerHTML = '<div class="empty-tip">暂无消费记录</div>';
    document.getElementById('dayExpenseTotal').textContent = '';
    return;
  }

  list.innerHTML = data.items.map((item, i) => {
    const emoji = CAT_EMOJI[item.category] || '📝';
    const label = item.category ? `${emoji} ${item.category}` : (item.desc || '消费');
    const note = item.desc && item.desc !== item.category ? ` · ${item.desc}` : '';
    return `
      <div class="expense-item">
        <span class="expense-cat-tag">${label}</span>
        ${note ? `<span class="expense-note">${note}</span>` : ''}
        <span class="expense-amount">¥${Number(item.amount).toFixed(2)}</span>
        <button class="expense-delete" onclick="deleteExpense('${dateStr}', ${i})">✕</button>
      </div>
    `;
  }).join('');

  const total = data.items.reduce((sum, item) => sum + Number(item.amount), 0);
  document.getElementById('dayExpenseTotal').textContent = `当日合计：¥${total.toFixed(2)}`;
}

function addExpense() {
  const catEl = document.querySelector('.exp-cat.active');
  const noteEl = document.getElementById('newExpenseNote');
  const amountEl = document.getElementById('newExpenseAmount');
  const amount = parseFloat(amountEl.value);

  if (!amount || amount <= 0) {
    amountEl.style.borderColor = '#E05555';
    setTimeout(() => amountEl.style.borderColor = '', 1500);
    return;
  }

  const category = catEl ? catEl.dataset.cat : '其他';

  let expenses = Store.get('expenses', {});
  if (!expenses[selectedDate]) expenses[selectedDate] = { items: [] };
  expenses[selectedDate].items.push({
    category,
    desc: noteEl ? noteEl.value.trim() : '',
    amount,
    id: Date.now(),
  });
  Store.set('expenses', expenses);

  if (noteEl) noteEl.value = '';
  amountEl.value = '';
  renderDayExpenses(selectedDate);
  renderCalendar();
  updateMonthlySummary();
}

function deleteExpense(dateStr, index) {
  let expenses = Store.get('expenses', {});
  expenses[dateStr]?.items?.splice(index, 1);
  Store.set('expenses', expenses);
  renderDayExpenses(dateStr);
  renderCalendar();
  updateMonthlySummary();
}

// ---- 月度小结 ----
function updateMonthlySummary() {
  const monthPrefix = `${calYear}-${String(calMonth + 1).padStart(2, '0')}`;
  const expenses = Store.get('expenses', {});
  const todos = Store.get('todos', {});

  let totalExpense = 0;
  let totalTodos = 0;
  let doneTodos = 0;
  const catTotals = {};

  Object.keys(expenses).filter(k => k.startsWith(monthPrefix)).forEach(k => {
    expenses[k]?.items?.forEach(item => {
      const amt = Number(item.amount);
      totalExpense += amt;
      const cat = item.category || '其他';
      catTotals[cat] = (catTotals[cat] || 0) + amt;
    });
  });

  Object.keys(todos).filter(k => k.startsWith(monthPrefix)).forEach(k => {
    const items = todos[k] || [];
    totalTodos += items.length;
    doneTodos += items.filter(t => t.done).length;
  });

  const totalEl = document.getElementById('monthlyTotal');
  const todosEl = document.getElementById('monthlyTodos');
  const catEl   = document.getElementById('monthlyCats');
  if (totalEl) totalEl.textContent = `¥${totalExpense.toFixed(2)}`;
  if (todosEl) todosEl.textContent = `${doneTodos}/${totalTodos}`;
  if (catEl && Object.keys(catTotals).length) {
    catEl.innerHTML = Object.entries(catTotals)
      .sort((a, b) => b[1] - a[1])
      .map(([cat, amt]) => `<span class="cat-summary-item">${CAT_EMOJI[cat]||'📝'} ${cat} ¥${amt.toFixed(0)}</span>`)
      .join('');
  }
}

// 支持回车添加
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('newTodoInput')?.addEventListener('keydown', e => {
    if (e.key === 'Enter') addTodo();
  });
  document.getElementById('newExpenseAmount')?.addEventListener('keydown', e => {
    if (e.key === 'Enter') addExpense();
  });
});
