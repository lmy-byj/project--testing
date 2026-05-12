// =============================================
// 育儿模块 v2 — 含搜索/疫苗/年龄提醒/计时器
// =============================================

let logModalType = null;
let searchDebounce = null;

// =============================================
// 计时器
// =============================================
let timerInterval = null;
let timerSeconds = 0;
let timerRunning = false;
let timerType = 'eat';
let timerStartTime = null;

function openTimerModal() {
  const card = document.getElementById('timerCard');
  if (!card) return;
  card.style.display = card.style.display === 'none' ? 'block' : 'none';
  if (card.style.display === 'block') {
    renderTimerHistory();
    card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

function setTimerType(el, type) {
  timerType = type;
  document.querySelectorAll('.timer-type-btn').forEach(b => b.classList.remove('active'));
  el.classList.add('active');
}

function toggleTimer() {
  const btn = document.getElementById('timerStartBtn');
  const saveBtn = document.getElementById('timerSaveBtn');
  if (timerRunning) {
    clearInterval(timerInterval);
    timerRunning = false;
    if (btn) { btn.textContent = '▶ 继续'; btn.classList.remove('running'); }
    if (saveBtn) saveBtn.style.display = 'inline-block';
  } else {
    if (!timerStartTime) timerStartTime = new Date();
    timerInterval = setInterval(() => {
      timerSeconds++;
      updateTimerDisplay();
    }, 1000);
    timerRunning = true;
    if (btn) { btn.textContent = '⏸ 暂停'; btn.classList.add('running'); }
    if (saveBtn) saveBtn.style.display = 'none';
  }
}

function updateTimerDisplay() {
  const el = document.getElementById('timerDisplay');
  if (!el) return;
  const m = Math.floor(timerSeconds / 60);
  const s = timerSeconds % 60;
  el.textContent = `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
}

function resetTimer() {
  clearInterval(timerInterval);
  timerRunning = false;
  timerSeconds = 0;
  timerStartTime = null;
  const btn = document.getElementById('timerStartBtn');
  const saveBtn = document.getElementById('timerSaveBtn');
  if (btn) { btn.textContent = '▶ 开始'; btn.classList.remove('running'); }
  if (saveBtn) saveBtn.style.display = 'none';
  updateTimerDisplay();
}

function saveTimerRecord() {
  if (timerSeconds < 5) { showToast('计时太短，不记录'); return; }
  const typeLabels = { eat: '🍼 吃奶', sleep: '😴 睡觉', activity: '🎮 玩耍' };
  const now = new Date();
  const timeStr = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
  const today = getToday();
  const m = Math.floor(timerSeconds / 60);
  const s = timerSeconds % 60;
  const durStr = m > 0 ? `${m}分${s}秒` : `${s}秒`;

  const history = Store.get('timerHistory', []);
  history.unshift({ id: Date.now(), type: timerType, label: typeLabels[timerType], duration: timerSeconds, durStr, time: timeStr, date: today });
  if (history.length > 50) history.length = 50;
  Store.set('timerHistory', history);

  let logs = Store.get('babyLog', {});
  if (!logs[today]) logs[today] = [];
  logs[today].push({ type: timerType, label: `${typeLabels[timerType]}（${durStr}）`, time: timeStr, id: Date.now() });
  Store.set('babyLog', logs);

  showToast(`已记录 ${typeLabels[timerType]} ${durStr} ✓`);
  resetTimer();
  renderTimerHistory();
  renderTodayLog();
  renderBabyStats();
}

function renderTimerHistory() {
  const el = document.getElementById('timerHistory');
  if (!el) return;
  const history = Store.get('timerHistory', []).slice(0, 8);
  if (!history.length) { el.innerHTML = ''; return; }
  el.innerHTML = `<div class="timer-history-title">最近记录</div>` +
    history.map(h => `
      <div class="timer-history-item">
        <span class="timer-history-type">${h.label}</span>
        <span class="timer-history-dur">${h.durStr}</span>
        <span class="timer-history-time">${h.date === getToday() ? h.time : h.date + ' ' + h.time}</span>
      </div>
    `).join('');
}

function initParenting() { refreshParenting(); }

function refreshParenting() {
  renderBabyAge();
  renderTodayLog();
  renderBabyStats();
  renderCurrentStageContent();
  renderVaccinationAlerts();
  renderFullVaccineList();
  renderAgeReminders();
  renderSeasonalTips();
  renderScienceTips();
  renderGrowthRecords();
}

// ---- 宝宝年龄 ----
function calcBabyAge(birthStr) {
  const birth = parseDate(birthStr);
  const now = new Date();
  const totalDays = Math.floor((now - birth) / 86400000);
  const weeks = Math.floor(totalDays / 7);
  const days  = totalDays % 7;
  const months = Math.floor(totalDays / 30.44);
  const remDays = Math.round(totalDays - months * 30.44);
  let text;
  if (totalDays < 7) text = `${totalDays}天`;
  else if (totalDays < 30) text = `${weeks}周${days>0?days+'天':''}`;
  else if (months < 12) text = `${months}个月${remDays>0?remDays+'天':''}`;
  else { const y=Math.floor(months/12); text=`${y}岁${months%12}个月`; }
  return { totalDays, weeks, months, text };
}

function getStageKey(totalDays) {
  if (totalDays < 28)  return '0-4weeks';
  if (totalDays < 60)  return '1-2months';
  if (totalDays < 90)  return '2-3months';
  if (totalDays < 120) return '3-4months';
  return '4-6months';
}

function renderBabyAge() {
  const s = Store.get('settings', {});
  const birth = s.babyBirthDate || '2026-04-08';
  const age = calcBabyAge(birth);
  const stage = PARENTING_MILESTONES[getStageKey(age.totalDays)];
  const el1 = document.getElementById('babyAge');
  const el2 = document.getElementById('babyStage');
  if (el1) el1.textContent = `已出生 ${age.text}`;
  if (el2) el2.textContent = stage?.title || '';
}

// ---- 今日记录时间轴 ----
function renderTodayLog() {
  const today = getToday();
  const logs = ((Store.get('babyLog', {}))[today] || []).sort((a,b) => a.time.localeCompare(b.time));
  const container = document.getElementById('logTimeline');
  if (!container) return;
  if (!logs.length) { container.innerHTML = '<div class="empty-tip">今日暂无记录</div>'; return; }
  const colors = { eat:'#F5A082', sleep:'#8FBDE3', activity:'#72B340', diaper:'#F5C518' };
  container.innerHTML = logs.map(l => `
    <div class="timeline-item" style="--dot-color:${colors[l.type]||'#ccc'}">
      <div class="timeline-time">${l.time}</div>
      <div class="timeline-content">
        <span class="timeline-label">${l.label}</span>
        ${l.notes?`<span class="timeline-notes">${l.notes}</span>`:''}
        ${l.duration?`<span class="timeline-duration">⏱ ${l.duration}分钟</span>`:''}
      </div>
      <button class="timeline-delete" onclick="deleteLog('${today}',${l.id})">✕</button>
    </div>`).join('');
}

function deleteLog(date, id) {
  let logs = Store.get('babyLog', {});
  if (logs[date]) { logs[date] = logs[date].filter(l => l.id !== id); Store.set('babyLog', logs); }
  renderTodayLog(); renderBabyStats();
}

function renderBabyStats() {
  const today = getToday();
  const logs = (Store.get('babyLog', {}))[today] || [];
  const eatC   = logs.filter(l => l.type === 'eat').length;
  const diaperC= logs.filter(l => l.type === 'diaper').length;
  const sleepM = logs.filter(l => l.type === 'sleep').reduce((s,l) => s+(l.duration||0), 0);
  const e = id => document.getElementById(id);
  if (e('statEat'))    e('statEat').textContent    = `${eatC}次`;
  if (e('statSleep'))  e('statSleep').textContent  = sleepM ? `${(sleepM/60).toFixed(1)}h` : '0h';
  if (e('statDiaper')) e('statDiaper').textContent = `${diaperC}次`;
}

// ---- 里程碑 + EASY 指南 ----
function renderCurrentStageContent() {
  const s = Store.get('settings', {});
  const age = calcBabyAge(s.babyBirthDate || '2026-04-08');
  const stage = PARENTING_MILESTONES[getStageKey(age.totalDays)];
  const milEl = document.getElementById('milestonesList');
  if (milEl && stage) {
    milEl.innerHTML = stage.milestones.map(m => `<div class="milestone-item">${m}</div>`).join('');
  }
  const fmt = t => t.split('\n').filter(Boolean).map(l => `<p>${l.trim()}</p>`).join('');
  ['Eat','Activity','Sleep','You'].forEach(k => {
    const key = k === 'You' ? 'youTime' : k.toLowerCase();
    const el = document.getElementById(`easyGuide${k}`);
    if (el && EASY_GUIDE[key]) el.innerHTML = fmt(EASY_GUIDE[key].content);
  });
}

// ---- 疫苗提醒（含接种状态）----
function getVacStatus() { return Store.get('vacStatus', {}); }
function setVacStatus(abbr, done, date) {
  const st = getVacStatus();
  st[abbr] = { done, date: date || getToday() };
  Store.set('vacStatus', st);
  renderVaccinationAlerts();
  renderFullVaccineList();
}

function renderVaccinationAlerts() {
  const container = document.getElementById('vaccinationAlerts');
  if (!container) return;
  const s = Store.get('settings', {});
  const birth = parseDate(s.babyBirthDate || '2026-04-08');
  const today = new Date();
  const totalDays = Math.floor((today - birth) / 86400000);
  const st = getVacStatus();

  const upcoming = [];
  const past = [];
  VACCINATION_SCHEDULE.forEach(slot => {
    const diff = slot.ageDays - totalDays;
    if (diff >= 0 && diff <= 30) upcoming.push({ ...slot, diff });
    else if (diff < 0 && diff >= -14) past.push({ ...slot, diff });
  });

  if (!upcoming.length && !past.length) {
    container.innerHTML = '<div class="empty-tip">近期无疫苗计划</div>';
    return;
  }

  const renderVac = (v) => {
    const status = st[v.abbr];
    const isDone = status?.done;
    const typeLabel = v.type === 'national'
      ? '<span class="vac-note free-vac">免费</span>'
      : '<span class="vac-note paid-vac">自费</span>';
    const icon = v.type === 'national' ? '💉' : '💊';
    const statusBtn = `<button class="vac-status-btn ${isDone ? 'done' : ''}" onclick="toggleVacStatus('${v.abbr}', ${!isDone})">${isDone ? '✅ 已打' : '⭕ 未打'}</button>`;
    const dateHint = isDone && status.date ? `<span class="vac-date">${status.date}</span>` : '';
    return `<div class="vaccine-item ${isDone ? 'vac-done' : ''}">
      ${icon} ${v.name} ${v.dose} ${typeLabel}
      ${v.note ? `<span class="vac-note">${v.note}</span>` : ''}
      <div class="vac-status-row">${statusBtn}${dateHint}</div>
    </div>`;
  };

  const renderSlot = (slot, type) => {
    const color = type === 'due' ? '#E05555' : type === 'soon' ? '#F5A623' : '#4CAF7D';
    const label = slot.diff === 0 ? '今天！' : slot.diff > 0 ? `${slot.diff}天后` : `${-slot.diff}天前`;
    return `
      <div class="vaccine-slot" style="border-left-color:${color}">
        <div class="vaccine-age">${slot.ageLabel} <span class="vaccine-when" style="color:${color}">${label}</span></div>
        ${slot.vaccines.map(renderVac).join('')}
      </div>`;
  };

  let html = '';
  if (upcoming.length) {
    html += '<div class="vac-group-title">⚠️ 近期疫苗</div>';
    upcoming.forEach(slot => html += renderSlot(slot, slot.diff <= 7 ? 'due' : 'soon'));
  }
  if (past.length) {
    html += '<div class="vac-group-title">📅 近期已过（请确认是否已打）</div>';
    past.forEach(slot => html += renderSlot(slot, 'done'));
  }
  container.innerHTML = html;
}

function toggleVacStatus(abbr, done) {
  setVacStatus(abbr, done, getToday());
  showToast(done ? '已标记为已接种 ✓' : '已标记为未接种');
}

// 全部疫苗列表
function renderFullVaccineList() {
  const el = document.getElementById('fullVaccineList');
  if (!el) return;
  const st = getVacStatus();
  const s = Store.get('settings', {});
  const birth = parseDate(s.babyBirthDate || '2026-04-08');
  const today = new Date();
  const totalDays = Math.floor((today - birth) / 86400000);

  el.innerHTML = VACCINATION_SCHEDULE.map(slot => {
    const isPast = slot.ageDays < totalDays - 7;
    return `
      <div class="vaccine-full-slot">
        <div class="vaccine-full-age">${slot.ageLabel}</div>
        ${slot.vaccines.map(v => {
          const status = st[v.abbr];
          const isDone = status?.done;
          const typeLabel = v.type === 'national'
            ? '<span class="vac-note free-vac">免费</span>'
            : '<span class="vac-note paid-vac">自费</span>';
          return `<div class="vaccine-full-item ${isDone ? 'vac-done' : ''} ${isPast && !isDone ? 'vac-overdue' : ''}">
            <div class="vac-info">${v.type === 'national' ? '💉' : '💊'} ${v.name} ${v.dose} ${typeLabel}</div>
            <button class="vac-status-btn ${isDone ? 'done' : ''}" onclick="toggleVacStatus('${v.abbr}', ${!isDone})">${isDone ? '✅ 已打' : '⭕ 未打'}</button>
            ${isDone && status.date ? `<div class="vac-date">接种：${status.date}</div>` : ''}
          </div>`;
        }).join('')}
      </div>`;
  }).join('');
}

// ---- 年龄阶段提醒 ----
function renderAgeReminders() {
  const container = document.getElementById('ageReminders');
  if (!container) return;
  const s = Store.get('settings', {});
  const age = calcBabyAge(s.babyBirthDate || '2026-04-08');
  const totalDays = age.totalDays;

  const active = AGE_REMINDERS.filter(r => totalDays >= r.minDays && totalDays <= r.maxDays);
  if (!active.length) { container.innerHTML = '<div class="empty-tip">当前阶段无特别提醒</div>'; return; }

  container.innerHTML = active.map(r => `
    <div class="age-reminder">
      <div class="reminder-header">${r.icon} ${r.title}</div>
      <div class="reminder-desc">${r.desc}</div>
      ${r.shopping?.length ? `
        <div class="reminder-shop-title">🛒 建议准备：</div>
        <div class="reminder-shop-list">${r.shopping.map(i => `<span class="shop-tag">${i}</span>`).join('')}</div>
      ` : ''}
      ${r.tips?.length ? `<div class="reminder-tips">${r.tips.map(t => `<div>• ${t}</div>`).join('')}</div>` : ''}
    </div>`).join('');
}

// ---- 季节育儿贴士 ----
function renderSeasonalTips() {
  const el = document.getElementById('seasonalTips');
  if (!el) return;
  const month = new Date().getMonth() + 1;
  let key = 'spring';
  if (month >= 6 && month <= 8) key = 'summer';
  else if (month >= 9 && month <= 11) key = 'autumn';
  else if (month === 12 || month <= 2) key = 'winter';
  const s = SEASONAL_BABY_TIPS[key];
  el.innerHTML = `<div class="season-header">${s.icon} ${s.season}育儿提醒</div>` +
    s.tips.map(t => `<div class="season-tip">• ${t}</div>`).join('');
}

// ---- 科学贴士 ----
function renderScienceTips() {
  const el = document.getElementById('scienceTips');
  if (!el) return;
  const tips = [...SCIENCE_TIPS].sort(() => Math.random()-.5).slice(0, 4);
  el.innerHTML = tips.map(t => `
    <div class="science-tip"><span class="tip-icon">${t.icon}</span><span class="tip-text">${t.tip}</span></div>
  `).join('');
}

// ---- 搜索功能 ----
function handleParentingSearch(e) {
  clearTimeout(searchDebounce);
  searchDebounce = setTimeout(() => searchParenting(e.target.value), 300);
}

function searchParenting(query) {
  const q = (query || '').toLowerCase().trim();
  const resultsEl = document.getElementById('searchResults');
  const mainEl    = document.getElementById('parentingMain');
  if (!resultsEl || !mainEl) return;

  if (!q) { resultsEl.style.display = 'none'; mainEl.style.display = 'block'; return; }

  const results = PARENTING_QA.filter(item =>
    item.tags.some(t => t.includes(q)) ||
    item.question.toLowerCase().includes(q) ||
    item.answer.toLowerCase().includes(q) ||
    item.category.includes(q)
  );

  mainEl.style.display = 'none';
  resultsEl.style.display = 'block';

  if (!results.length) {
    resultsEl.innerHTML = `<div class="empty-tip">没有找到"${query}"相关内容，试试其他关键词</div>`;
    return;
  }

  resultsEl.innerHTML = results.map(r => `
    <div class="qa-card" onclick="toggleAnswer('${r.id}')">
      <div class="qa-category">${r.category}</div>
      <div class="qa-question">❓ ${r.question}</div>
      <div class="qa-answer" id="ans-${r.id}" style="display:none">
        <div class="qa-answer-text">${r.answer}</div>
      </div>
    </div>
  `).join('');
}

function toggleAnswer(id) {
  const el = document.getElementById('ans-' + id);
  if (el) el.style.display = el.style.display === 'none' ? 'block' : 'none';
}

// ---- 记录弹窗 ----
function openLogModal(type) {
  logModalType = type;
  const cfg = {
    eat: { title:'🍼 记录吃奶', body:`
      <div class="modal-field"><label>方式</label><div class="radio-group">
        <label><input type="radio" name="eatType" value="母乳" checked> 母乳</label>
        <label><input type="radio" name="eatType" value="配方奶"> 配方奶</label>
        <label><input type="radio" name="eatType" value="混合"> 混合</label>
      </div></div>
      <div class="modal-field"><label>时长（分钟）</label><input type="number" id="logDuration" min="1" max="60" placeholder="如 15"></div>
      <div class="modal-field"><label>奶量 ml（配方奶填）</label><input type="number" id="logAmount" placeholder="如 80"></div>
      <div class="modal-field"><label>备注</label><input type="text" id="logNotes" placeholder="可选"></div>`},
    sleep: { title:'😴 记录睡眠', body:`
      <div class="modal-field"><label>时长（分钟）</label><input type="number" id="logDuration" min="1" placeholder="如 90"></div>
      <div class="modal-field"><label>质量</label><div class="radio-group">
        <label><input type="radio" name="sleepQ" value="安稳" checked> 安稳</label>
        <label><input type="radio" name="sleepQ" value="偶有哭闹"> 偶有哭闹</label>
        <label><input type="radio" name="sleepQ" value="睡不踏实"> 睡不踏实</label>
      </div></div>
      <div class="modal-field"><label>备注</label><input type="text" id="logNotes" placeholder="可选"></div>`},
    activity: { title:'🎮 记录玩耍', body:`
      <div class="modal-field"><label>活动类型</label><div class="radio-group">
        <label><input type="radio" name="actType" value="趴趴时间" checked> 趴趴时间</label>
        <label><input type="radio" name="actType" value="追视玩具"> 追视玩具</label>
        <label><input type="radio" name="actType" value="互动说话"> 互动说话</label>
        <label><input type="radio" name="actType" value="洗澡"> 洗澡</label>
      </div></div>
      <div class="modal-field"><label>时长（分钟）</label><input type="number" id="logDuration" placeholder="如 20"></div>
      <div class="modal-field"><label>备注</label><input type="text" id="logNotes" placeholder="可选"></div>`},
    diaper: { title:'🚼 记录尿布', body:`
      <div class="modal-field"><label>类型</label><div class="radio-group">
        <label><input type="radio" name="diaperType" value="小便" checked> 💧 小便</label>
        <label><input type="radio" name="diaperType" value="大便"> 💩 大便</label>
        <label><input type="radio" name="diaperType" value="混合"> 混合</label>
      </div></div>
      <div class="modal-field"><label>颜色/状态（可选）</label><input type="text" id="logNotes" placeholder="如 黄色软便、正常"></div>`},
  };
  const c = cfg[type];
  if (!c) return;
  document.getElementById('modalTitle').textContent = c.title;
  document.getElementById('modalBody').innerHTML = c.body + `
    <div class="modal-actions">
      <button class="btn-cancel" onclick="closeLogModal()">取消</button>
      <button class="btn-save" onclick="saveLog()">保存记录</button>
    </div>`;
  document.getElementById('logModal').style.display = 'flex';
}

function closeLogModal() {
  document.getElementById('logModal').style.display = 'none';
  logModalType = null;
}

function saveLog() {
  const labels = { eat:'🍼 吃奶', sleep:'😴 睡觉', activity:'🎮 玩耍', diaper:'🚼 换尿布' };
  const now = new Date();
  const timeStr = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
  const today = getToday();

  let subType = '';
  const radioNames = { eat:'eatType', sleep:'sleepQ', activity:'actType', diaper:'diaperType' };
  const sel = document.querySelector(`input[name="${radioNames[logModalType]}"]:checked`);
  if (sel) subType = sel.value;

  const durEl = document.getElementById('logDuration');
  const noteEl = document.getElementById('logNotes');

  const entry = {
    id: Date.now(), type: logModalType,
    label: labels[logModalType] + (subType ? ` · ${subType}` : ''),
    time: timeStr,
    duration: durEl ? parseInt(durEl.value)||0 : 0,
    notes: noteEl ? noteEl.value.trim() : '',
  };

  let logs = Store.get('babyLog', {});
  if (!logs[today]) logs[today] = [];
  logs[today].push(entry);
  Store.set('babyLog', logs);

  closeLogModal();
  renderTodayLog();
  renderBabyStats();
  showToast('记录已保存 ✓');
}

// ---- 宝宝生长记录 ----
function openGrowthModal() {
  document.getElementById('growthModal').style.display = 'flex';
  const records = Store.get('growthRecords', []);
  if (records.length) {
    const last = records[records.length - 1];
    document.getElementById('growthWeightInput').value = last.weight || '';
    document.getElementById('growthHeightInput').value = last.height || '';
    document.getElementById('growthHeadInput').value = last.head || '';
  } else {
    document.getElementById('growthWeightInput').value = '';
    document.getElementById('growthHeightInput').value = '';
    document.getElementById('growthHeadInput').value = '';
  }
  document.getElementById('growthNoteInput').value = '';
}

function closeGrowthModal() {
  document.getElementById('growthModal').style.display = 'none';
}

function saveGrowthRecord() {
  const weight = parseFloat(document.getElementById('growthWeightInput').value) || 0;
  const height = parseFloat(document.getElementById('growthHeightInput').value) || 0;
  const head   = parseFloat(document.getElementById('growthHeadInput').value) || 0;
  const note   = document.getElementById('growthNoteInput').value.trim();

  if (!weight && !height) { showToast('请至少填写体重或身高'); return; }

  const records = Store.get('growthRecords', []);
  const today = getToday();
  const existing = records.findIndex(r => r.date === today);
  const entry = { date: today, weight, height, head, note, id: Date.now() };

  if (existing >= 0) records[existing] = entry;
  else records.push(entry);

  Store.set('growthRecords', records);
  closeGrowthModal();
  renderGrowthRecords();
  showToast('生长记录已保存 ✓');
}

function renderGrowthRecords() {
  const el = document.getElementById('growthRecordsList');
  if (!el) return;
  const records = Store.get('growthRecords', []).slice().reverse().slice(0, 5);
  if (!records.length) {
    el.innerHTML = '<div class="empty-tip">暂无记录，点击「记录生长」添加</div>';
    return;
  }
  el.innerHTML = records.map(r => `
    <div class="growth-record-item">
      <div class="growth-date">${r.date}</div>
      <div class="growth-values">
        ${r.weight ? `<span class="growth-val">⚖️ ${r.weight}kg</span>` : ''}
        ${r.height ? `<span class="growth-val">📏 ${r.height}cm</span>` : ''}
        ${r.head   ? `<span class="growth-val">🔵 ${r.head}cm</span>` : ''}
      </div>
      ${r.note ? `<div class="growth-note">${r.note}</div>` : ''}
    </div>
  `).join('');
}
