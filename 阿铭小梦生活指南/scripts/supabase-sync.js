// =============================================
// Supabase 云同步模块
// 把你从 Supabase 控制台拿到的配置填入下方
// =============================================

const SUPABASE_URL     = 'https://jkefeactxenfezqidyju.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_viFqcK28m8XApeqKNuDKKA_f0Dctwgj';

const FAMILY_ID_KEY = 'amxm_familyId';

let supabaseClient = null;
let familyId = null;
let syncChannel = null;

// ---- 初始化 ----
async function initSupabase() {
  try {
    supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    familyId = getFamilyId();
    console.log('Supabase 已连接，家庭ID:', familyId);
    showSyncStatus('connected');
    await pullAllData();
    startRealtimeSync();
  } catch (e) {
    console.warn('Supabase 初始化失败，使用本地存储:', e.message);
    showSyncStatus('offline');
  }
}

// ---- 家庭 ID 管理 ----
function getFamilyId() {
  let id = localStorage.getItem(FAMILY_ID_KEY);
  if (!id) {
    id = 'family_' + Math.random().toString(36).slice(2, 10);
    localStorage.setItem(FAMILY_ID_KEY, id);
  }
  return id;
}

function setFamilyId(id) {
  localStorage.setItem(FAMILY_ID_KEY, id.trim());
  familyId = id.trim();
  pullAllData().then(() => startRealtimeSync());
  showToast('已切换到家庭：' + id.trim());
}

// ---- 启动时把云端数据拉到本地 ----
async function pullAllData() {
  if (!supabaseClient || !familyId) return;
  try {
    const { data, error } = await supabaseClient
      .from('family_data')
      .select('key, value')
      .eq('family_id', familyId);
    if (error) throw error;
    (data || []).forEach(row => {
      localStorage.setItem('amxm_' + row.key, JSON.stringify(row.value));
    });
  } catch (e) {
    console.warn('拉取云端数据失败:', e.message);
  }
}

// ---- 云端读写（替代 localStorage）----
const CloudStore = {
  // 写入本地 + 同步云端
  async set(key, value) {
    localStorage.setItem('amxm_' + key, JSON.stringify(value));
    if (!supabaseClient || !familyId) return;
    try {
      await supabaseClient.from('family_data').upsert(
        { family_id: familyId, key, value, updated_at: Date.now() },
        { onConflict: 'family_id,key' }
      );
    } catch (e) {
      console.warn('云端写入失败（已保存到本地）:', e.message);
    }
  },

  // 从本地读（实时监听自动保持最新）
  get(key, fallback = null) {
    try {
      const v = localStorage.getItem('amxm_' + key);
      return v ? JSON.parse(v) : fallback;
    } catch { return fallback; }
  },
};

// ---- 实时监听云端变化 ----
function startRealtimeSync() {
  if (syncChannel) supabaseClient.removeChannel(syncChannel);
  if (!supabaseClient || !familyId) return;

  syncChannel = supabaseClient
    .channel('family-' + familyId)
    .on('postgres_changes', {
      event: '*',
      schema: 'public',
      table: 'family_data',
      filter: `family_id=eq.${familyId}`,
    }, payload => {
      const row = payload.new;
      if (!row) return;
      localStorage.setItem('amxm_' + row.key, JSON.stringify(row.value));
      onCloudDataUpdated(row.key);
    })
    .subscribe();
}

// 云端数据更新后刷新对应界面
function onCloudDataUpdated(key) {
  try {
    if (key === 'todos' || key === 'expenses') {
      if (typeof renderCalendar === 'function') renderCalendar();
      if (typeof renderHomeTodosPreview === 'function') renderHomeTodosPreview();
    }
    if (key === 'mealLog') {
      if (typeof renderTodayMeals === 'function') renderTodayMeals();
      if (typeof renderHomeFoodPreview === 'function') renderHomeFoodPreview();
    }
    if (key === 'babyLog') {
      if (typeof renderTodayLog === 'function') renderTodayLog();
      if (typeof renderBabyStats === 'function') renderBabyStats();
    }
  } catch(e) {}
}

// ---- 同步状态图标 ----
function showSyncStatus(status) {
  let el = document.getElementById('syncStatus');
  if (!el) {
    el = document.createElement('div');
    el.id = 'syncStatus';
    el.className = 'sync-status';
    document.querySelector('.app-header')?.appendChild(el);
  }
  const map = {
    connected: { text: '☁️', title: '云端同步中' },
    offline:   { text: '📱', title: '本地模式' },
    syncing:   { text: '🔄', title: '同步中...' },
  };
  const s = map[status] || map.offline;
  el.textContent = s.text;
  el.title = s.title;
}

// ---- 家庭码弹窗 ----
function openFamilyModal() {
  const modal = document.getElementById('familyModal');
  if (!modal) return;
  document.getElementById('myFamilyCode').textContent = familyId || '未初始化';
  document.getElementById('joinCodeInput').value = '';
  modal.style.display = 'flex';
}

function closeFamilyModal() {
  document.getElementById('familyModal').style.display = 'none';
}

function joinFamily() {
  const code = document.getElementById('joinCodeInput').value.trim();
  if (!code) { showToast('请输入家庭码'); return; }
  if (confirm(`确定加入家庭「${code}」？当前数据将切换为该家庭的数据。`)) {
    setFamilyId(code);
    closeFamilyModal();
  }
}

// 替换默认 Store
const Store = CloudStore;
