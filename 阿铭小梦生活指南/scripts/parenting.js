// =============================================
// 育儿模块 v2 — 含搜索/疫苗/年龄提醒
// =============================================

let logModalType = null;
let searchDebounce = null;

function initParenting() { refreshParenting(); }

function refreshParenting() {
  renderBabyAge();
  renderTodayLog();
  renderBabyStats();
  renderCurrentStageContent();
  renderVaccinationAlerts();
  renderAgeReminders();
  renderSeasonalTips();
  renderScienceTips();
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
  if (totalDays < 28) return '0-4weeks';
  if (totalDays < 60) return '1-2months';
  return '2-3months';
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

// ---- 疫苗提醒 ----
function renderVaccinationAlerts() {
  const container = document.getElementById('vaccinationAlerts');
  if (!container) return;
  const s = Store.get('settings', {});
  const birth = parseDate(s.babyBirthDate || '2026-04-08');
  const today = new Date();
  const totalDays = Math.floor((today - birth) / 86400000);

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

  const renderSlot = (slot, type) => {
    const color = type === 'due' ? '#E05555' : type === 'soon' ? '#F5A623' : '#4CAF7D';
    const label = slot.diff === 0 ? '今天！' : slot.diff > 0 ? `${slot.diff}天后` : `${-slot.diff}天前`;
    const national = slot.vaccines.filter(v => v.type === 'national');
    const recom    = slot.vaccines.filter(v => v.type === 'recommended');
    return `
      <div class="vaccine-slot" style="border-left-color:${color}">
        <div class="vaccine-age">${slot.ageLabel} <span class="vaccine-when" style="color:${color}">${label}</span></div>
        ${national.map(v => `<div class="vaccine-item national">💉 ${v.name} ${v.dose}</div>`).join('')}
        ${recom.map(v => `<div class="vaccine-item recommended">💊 ${v.name} ${v.dose}<span class="vac-note">${v.note||''}</span></div>`).join('')}
      </div>`;
  };

  let html = '';
  if (upcoming.length) {
    html += '<div class="vac-group-title">⚠️ 近期疫苗</div>';
    upcoming.forEach(s => html += renderSlot(s, s.diff <= 7 ? 'due' : 'soon'));
  }
  if (past.length) {
    html += '<div class="vac-group-title">✅ 近期已过（请确认是否已打）</div>';
    past.forEach(s => html += renderSlot(s, 'done'));
  }
  container.innerHTML = html;
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
