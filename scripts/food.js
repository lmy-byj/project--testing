// =============================================
// 吃什么模块 v2 — 含浇头/配菜/卡路里/明日计划
// =============================================

let currentFood = null;
let currentCombo = null;
let selectedCategory = 'all';

function initFood() {
  renderCategoryFilter();
  renderTodayMeals();
  renderWeeklyFood();
  renderDailyCalories();
  spinFood();
}

// ---- 分类筛选 ----
function renderCategoryFilter() {
  document.getElementById('categoryFilter').querySelectorAll('.cat-btn').forEach(btn => {
    btn.onclick = () => {
      document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedCategory = btn.dataset.cat;
      toggleExtraButtons();
      spinFood();
    };
  });
}

function toggleExtraButtons() {
  const toppingBtn = document.getElementById('toppingBtn');
  const comboBtn   = document.getElementById('comboBtn');
  if (toppingBtn) toppingBtn.style.display = selectedCategory === 'noodle' ? 'inline-flex' : 'none';
  if (comboBtn)   comboBtn.style.display   = selectedCategory === 'rice'   ? 'inline-flex' : 'none';
  // hotpot and bbq: no extra buttons needed
}

function getFilteredFoods() {
  if (selectedCategory === 'all') return FOODS;
  return FOODS.filter(f => f.category === selectedCategory);
}

// ---- 随机抽签 ----
function spinFood() {
  currentCombo = null;
  document.getElementById('comboCard')?.remove();

  const foods = getFilteredFoods();
  if (!foods.length) return;
  const card = document.getElementById('foodCard');
  card.classList.add('spinning');

  setTimeout(() => {
    currentFood = foods[Math.floor(Math.random() * foods.length)];
    renderFoodCard(currentFood);
    card.classList.remove('spinning');
    card.classList.add('popped');
    setTimeout(() => card.classList.remove('popped'), 400);

    document.getElementById('confirmBtn').style.display = 'inline-flex';
    document.getElementById('planTomBtn').style.display = 'inline-flex';
    document.getElementById('mealTypeSelect').style.display = 'none';
    toggleExtraButtons();
  }, 280);
}

function renderFoodCard(food) {
  document.getElementById('foodEmoji').textContent    = food.emoji;
  document.getElementById('foodName').textContent     = food.name;
  document.getElementById('foodCategory').textContent = getCatLabel(food.category) + ' · ' + food.tag;
  document.getElementById('foodDesc').textContent     = food.desc;
  document.getElementById('foodKcal').textContent     = `🔥 约 ${food.kcal} 千卡`;
  document.getElementById('foodMeta').innerHTML = `
    <span class="meta-tag difficulty-${food.difficulty}">难度：${food.difficulty}</span>
    <span class="meta-tag">⏱ ${food.cookTime}</span>
    <span class="meta-tag">📍 ${food.location}</span>
    <span class="meta-tag">🗺 ${food.origin}</span>
  `;
}

function getCatLabel(cat) {
  return { noodle:'面食', rice:'米饭', western:'西餐', fitness:'健身餐', hotpot:'火锅', bbq:'烧烤' }[cat] || cat;
}

// ---- 浇头抽签（面食专属） ----
function spinTopping() {
  const noodle  = NOODLE_TYPES[Math.floor(Math.random() * NOODLE_TYPES.length)];
  const topping = NOODLE_TOPPINGS[Math.floor(Math.random() * NOODLE_TOPPINGS.length)];
  const total   = noodle.kcal + topping.kcal;

  currentFood = {
    name: `${noodle.name} · ${topping.name}`,
    emoji: '🍜',
    category: 'noodle', tag: '浇头搭配', kcal: total,
    desc: `${noodle.name}搭配${topping.name}——${topping.desc}`,
    difficulty: '中等', cookTime: '25min', location: '家',
    origin: '随机', shopHint: topping.shopHint || '',
  };

  const card = document.getElementById('foodCard');
  card.classList.add('spinning');
  setTimeout(() => {
    renderFoodCard(currentFood);
    card.classList.remove('spinning');
    card.classList.add('popped');
    setTimeout(() => card.classList.remove('popped'), 400);
    document.getElementById('confirmBtn').style.display = 'inline-flex';
    document.getElementById('planTomBtn').style.display = 'inline-flex';
    document.getElementById('mealTypeSelect').style.display = 'none';
  }, 280);
}

// ---- 随机配菜（米饭专属） ----
function generateRiceCombo() {
  const pick = (arr, n=1) => {
    const a = [...arr].sort(() => Math.random()-.5);
    return n === 1 ? a[0] : a.slice(0, n);
  };

  const protein  = pick(RICE_COMBOS.proteins);
  const veg1     = pick(RICE_COMBOS.vegetables);
  const veg2     = Math.random() > 0.5 ? pick(RICE_COMBOS.vegetables.filter(v => v.name !== veg1.name)) : null;
  const cold     = Math.random() > 0.5 ? pick(RICE_COMBOS.cold) : null;
  const soup     = pick(RICE_COMBOS.soups);

  const items    = [protein, veg1, veg2, cold, soup].filter(Boolean);
  const total    = items.reduce((s, i) => s + i.kcal, RICE_BASE_KCAL);
  const shopList = items.map(i => i.shopHint).filter(Boolean).join('、') || '常备食材即可';

  currentCombo = { protein, veg1, veg2, cold, soup, total, shopList };
  currentFood  = {
    name: `${protein.name}套餐`, emoji: '🍱',
    category: 'rice', tag: '随机配菜', kcal: total,
    desc: `${protein.name} + ${[veg1, veg2, cold].filter(Boolean).map(i=>i.name).join('、')} + ${soup.name}`,
    difficulty: '中等', cookTime: '45min', location: '家', origin: protein.cuisine,
    shopHint: shopList,
  };

  renderComboCard(currentCombo);
  document.getElementById('confirmBtn').style.display = 'inline-flex';
  document.getElementById('planTomBtn').style.display = 'inline-flex';
  document.getElementById('mealTypeSelect').style.display = 'none';
}

function renderComboCard(combo) {
  // 移除旧的
  document.getElementById('comboCard')?.remove();

  const rows = [
    { label:'🥩 荤菜', item: combo.protein },
    { label:'🥦 素菜', item: combo.veg1 },
    combo.veg2 ? { label:'🥬 素菜2', item: combo.veg2 } : null,
    combo.cold ? { label:'🧊 凉菜', item: combo.cold } : null,
    { label:'🍲 汤', item: combo.soup },
    { label:'🍚 米饭', item: { name:'白米饭(150g)', kcal: RICE_BASE_KCAL } },
  ].filter(Boolean);

  const div = document.createElement('div');
  div.id = 'comboCard';
  div.className = 'combo-card';
  div.innerHTML = `
    <div class="combo-title">🍱 今日配菜方案</div>
    ${rows.map(r => `
      <div class="combo-row">
        <span class="combo-label">${r.label}</span>
        <span class="combo-dish">${r.item.name}</span>
        <span class="combo-kcal">${r.item.kcal}kcal</span>
      </div>
    `).join('')}
    <div class="combo-total">合计约 ${combo.total} 千卡</div>
    ${combo.shopList !== '常备食材即可' ? `<div class="combo-shop">🛒 需购买：${combo.shopList}</div>` : ''}
    <button class="combo-reroll" onclick="generateRiceCombo()">🔄 重新配菜</button>
  `;
  document.querySelector('.food-card-container').after(div);
}

// ---- 确认 + 明日计划 ----
function confirmFood() {
  if (!currentFood) return;
  document.getElementById('confirmBtn').style.display = 'none';
  document.getElementById('mealTypeSelect').style.display = 'flex';
}

function addToMeal(mealType) {
  if (!currentFood) return;
  const today = getToday();
  let log = Store.get('mealLog', {});
  if (!log[today]) log[today] = {};
  log[today][mealType] = { name: currentFood.name, kcal: currentFood.kcal };
  Store.set('mealLog', log);

  document.getElementById('mealTypeSelect').style.display = 'none';
  document.getElementById('confirmBtn').style.display = 'inline-flex';
  renderTodayMeals();
  renderDailyCalories();
  renderHomeFoodPreview();
  showToast(`已加入${{'breakfast':'早饭','lunch':'午饭','dinner':'晚饭'}[mealType]} ✓`);
}

function clearMeal(mealType) {
  const today = getToday();
  let log = Store.get('mealLog', {});
  if (log[today]) { delete log[today][mealType]; Store.set('mealLog', log); }
  renderTodayMeals();
  renderDailyCalories();
  renderHomeFoodPreview();
}

// ---- 计划明日 ----
function planTomorrow() {
  if (!currentFood) return;
  const tomorrow = formatDate(new Date(Date.now() + 86400000));
  const shopHint = currentFood.shopHint;

  let log = Store.get('mealLog', {});
  if (!log[tomorrow]) log[tomorrow] = {};
  log[tomorrow]._plan = currentFood.name;
  Store.set('mealLog', log);

  if (shopHint) {
    let todos = Store.get('todos', {});
    if (!todos[tomorrow]) todos[tomorrow] = [];
    todos[tomorrow].push({ id: Date.now(), text: `🛒 提前购买/解冻：${shopHint}（明日：${currentFood.name}）`, done: false });
    Store.set('todos', todos);
  }
  showToast(`明日「${currentFood.name}」已加入计划${shopHint ? '，日历已添加购物提醒' : ''} ✓`);
  renderWeeklyFood();
}

// ---- 渲染今日食谱 ----
function renderTodayMeals() {
  const today = getToday();
  const meals = (Store.get('mealLog', {}))[today] || {};
  [
    { key:'breakfast', id:'breakfastContent' },
    { key:'lunch',     id:'lunchContent' },
    { key:'dinner',    id:'dinnerContent' },
  ].forEach(({ key, id }) => {
    const el = document.getElementById(id);
    if (!el) return;
    const meal = meals[key];
    if (meal) {
      el.textContent = typeof meal === 'object' ? meal.name : meal;
      el.className = 'meal-content has-meal';
    } else {
      el.textContent = '还没决定';
      el.className = 'meal-content';
    }
  });
}

// ---- 每日卡路里汇总 ----
function renderDailyCalories() {
  const el = document.getElementById('dailyCalEl');
  if (!el) return;
  const today = getToday();
  const meals = (Store.get('mealLog', {}))[today] || {};
  let total = 0;
  ['breakfast','lunch','dinner'].forEach(k => {
    const m = meals[k];
    if (m && typeof m === 'object' && m.kcal) total += m.kcal;
  });
  el.textContent = total > 0 ? `今日已记录热量：${total} 千卡` : '';
  el.className = total > 2200 ? 'daily-cal warn' : 'daily-cal';
}

// ---- 本周食谱回顾 ----
function renderWeeklyFood() {
  const container = document.getElementById('weeklyFood');
  if (!container) return;
  const mealLog = Store.get('mealLog', {});
  const today = new Date();
  const rows = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today); d.setDate(today.getDate() - i);
    const key = formatDate(d);
    const meals = mealLog[key] || {};
    const isToday = i === 0;
    const plan  = meals._plan ? `（明日计划：${meals._plan}）` : '';
    const parts = ['breakfast','lunch','dinner']
      .map(k => meals[k] ? (typeof meals[k]==='object' ? meals[k].name : meals[k]) : null)
      .filter(Boolean);
    const label = isToday ? '今天' : `周${getDayOfWeek(key)}`;
    rows.push(`<div class="weekly-row${isToday?' today-row':''}">
      <span class="weekly-day">${label}</span>
      <span class="weekly-meals">${parts.join(' / ') || plan || '—'}</span>
    </div>`);
  }
  container.innerHTML = `<div class="weekly-food-title">本周饮食回顾</div>` + rows.join('');
}

// showToast is defined in app.js
