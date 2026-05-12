// =============================================
// 阿铭小梦生活指南 - 日历模块
// =============================================

let calYear, calMonth, selectedDate;

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
  const titleEl = document.getElementById('calendarMonthTitle');
  titleEl.textContent = `${calYear}年 ${calMonth + 1}月`;

  const grid = document.getElementById('calendarGrid');
  grid.innerHTML = '';

  const firstDay = new Date(calYear, calMonth, 1).getDay();
  const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
  const daysInPrevMonth = new Date(calYear, calMonth, 0).getDate();
  const today = getToday();

  // 获取当月所有存储数据
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
    const hasTodos = todos[dateStr]?.length > 0;
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
        ${hasTodos ? '<span class="dot dot-todo"></span>' : ''}
        ${hasExpense ? '<span class="dot dot-expense"></span>' : ''}
      </div>
    `;
    cell.onclick = () => openDayPanel(dateStr);
    grid.appendChild(cell);
  }

  // 下月补位（补齐到6行42格）
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
  renderDayTodos(dateStr);
  renderDayExpenses(dateStr);

  // 滚动到面板
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

// ---- 待办事项 ----
function renderDayTodos(dateStr) {
  const list = document.getElementById('dayTodoList');
  const todos = Store.get('todos', {});
  const items = todos[dateStr] || [];

  if (items.length === 0) {
    list.innerHTML = '<div class="empty-tip">暂无待办，添加一个吧～</div>';
    return;
  }

  list.innerHTML = items.map((t, i) => `
    <div class="todo-item ${t.done ? 'done' : ''}">
      <span class="todo-checkbox" onclick="toggleTodo('${dateStr}', ${i})">${t.done ? '✅' : '⭕'}</span>
      <span class="todo-text">${t.text}</span>
      <button class="todo-delete" onclick="deleteTodo('${dateStr}', ${i})">✕</button>
    </div>
  `).join('');
}

function addTodo() {
  const input = document.getElementById('newTodoInput');
  const text = input.value.trim();
  if (!text) return;

  let todos = Store.get('todos', {});
  if (!todos[selectedDate]) todos[selectedDate] = [];
  todos[selectedDate].push({ id: Date.now(), text, done: false });
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
function renderDayExpenses(dateStr) {
  const list = document.getElementById('dayExpenseList');
  const expenses = Store.get('expenses', {});
  const data = expenses[dateStr] || { items: [] };

  if (data.items.length === 0) {
    list.innerHTML = '<div class="empty-tip">暂无消费记录</div>';
    document.getElementById('dayExpenseTotal').textContent = '';
    return;
  }

  list.innerHTML = data.items.map((item, i) => `
    <div class="expense-item">
      <span class="expense-desc">${item.desc || '消费'}</span>
      <span class="expense-amount">¥${Number(item.amount).toFixed(2)}</span>
      <button class="expense-delete" onclick="deleteExpense('${dateStr}', ${i})">✕</button>
    </div>
  `).join('');

  const total = data.items.reduce((sum, item) => sum + Number(item.amount), 0);
  document.getElementById('dayExpenseTotal').textContent = `当日合计：¥${total.toFixed(2)}`;
}

function addExpense() {
  const descEl = document.getElementById('newExpenseDesc');
  const amountEl = document.getElementById('newExpenseAmount');
  const amount = parseFloat(amountEl.value);

  if (!amount || amount <= 0) {
    amountEl.style.borderColor = '#E05555';
    setTimeout(() => amountEl.style.borderColor = '', 1500);
    return;
  }

  let expenses = Store.get('expenses', {});
  if (!expenses[selectedDate]) expenses[selectedDate] = { items: [] };
  expenses[selectedDate].items.push({
    desc: descEl.value.trim() || '日常消费',
    amount,
    id: Date.now(),
  });
  Store.set('expenses', expenses);

  descEl.value = '';
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

  Object.keys(expenses).filter(k => k.startsWith(monthPrefix)).forEach(k => {
    expenses[k]?.items?.forEach(item => totalExpense += Number(item.amount));
  });

  Object.keys(todos).filter(k => k.startsWith(monthPrefix)).forEach(k => {
    const items = todos[k] || [];
    totalTodos += items.length;
    doneTodos += items.filter(t => t.done).length;
  });

  const totalEl = document.getElementById('monthlyTotal');
  const todosEl = document.getElementById('monthlyTodos');
  if (totalEl) totalEl.textContent = `¥${totalExpense.toFixed(2)}`;
  if (todosEl) todosEl.textContent = `${doneTodos}/${totalTodos}`;
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
