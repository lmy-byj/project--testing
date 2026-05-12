// =============================================
// Firebase 云同步模块
// 把你从 Firebase 控制台拿到的 config 填入下方
// =============================================

const FIREBASE_CONFIG = {
  apiKey:            "YOUR_API_KEY",
  authDomain:        "YOUR_PROJECT.firebaseapp.com",
  projectId:         "YOUR_PROJECT_ID",
  storageBucket:     "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId:             "YOUR_APP_ID",
};

// 家庭ID — 用于区分不同家庭的数据
// 首次使用自动生成，妻子端输入相同 ID 即可共享数据
const FAMILY_ID_KEY = 'amxm_familyId';

let db = null;
let familyId = null;
let syncListeners = [];

// ---- 初始化 Firebase ----
async function initFirebase() {
  try {
    firebase.initializeApp(FIREBASE_CONFIG);
    db = firebase.firestore();
    familyId = getFamilyId();
    console.log('Firebase 已连接，家庭ID:', familyId);
    showSyncStatus('connected');
    startRealtimeSync();
  } catch (e) {
    console.warn('Firebase 初始化失败，使用本地存储:', e.message);
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
  // 重新连接，加载新家庭数据
  startRealtimeSync();
  showToast('已切换到家庭：' + id.trim());
}

// ---- 云端读写（替代 localStorage）----
const CloudStore = {
  // 写入云端（同时写本地缓存保证离线可用）
  async set(key, value) {
    localStorage.setItem('amxm_' + key, JSON.stringify(value));
    if (!db || !familyId) return;
    try {
      await db.collection('families').doc(familyId)
        .collection('data').doc(key).set({ value, updatedAt: Date.now() });
    } catch (e) {
      console.warn('云端写入失败（已保存到本地）:', e.message);
    }
  },

  // 从本地缓存读（实时监听会自动更新本地缓存）
  get(key, fallback = null) {
    try {
      const v = localStorage.getItem('amxm_' + key);
      return v ? JSON.parse(v) : fallback;
    } catch { return fallback; }
  },
};

// ---- 实时监听云端变化 ----
function startRealtimeSync() {
  // 取消旧监听
  syncListeners.forEach(unsub => unsub());
  syncListeners = [];

  if (!db || !familyId) return;

  const keys = ['todos', 'expenses', 'mealLog', 'babyLog', 'settings', 'weatherCfg'];
  keys.forEach(key => {
    const unsub = db.collection('families').doc(familyId)
      .collection('data').doc(key)
      .onSnapshot(doc => {
        if (doc.exists) {
          const data = doc.data();
          // 只有云端比本地新才覆盖
          const localRaw = localStorage.getItem('amxm_' + key);
          const localTs = localRaw ? (JSON.parse(localRaw)?._ts || 0) : 0;
          if (data.updatedAt > localTs) {
            localStorage.setItem('amxm_' + key, JSON.stringify(data.value));
            // 通知界面刷新
            onCloudDataUpdated(key);
          }
        }
      }, err => console.warn('实时监听失败:', key, err.message));
    syncListeners.push(unsub);
  });
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

// ---- 同步状态指示 ----
function showSyncStatus(status) {
  let el = document.getElementById('syncStatus');
  if (!el) {
    el = document.createElement('div');
    el.id = 'syncStatus';
    el.className = 'sync-status';
    document.querySelector('.app-header')?.appendChild(el);
  }
  const map = {
    connected: { text:'☁️', title:'云端同步中' },
    offline:   { text:'📱', title:'本地模式' },
    syncing:   { text:'🔄', title:'同步中...' },
  };
  const s = map[status] || map.offline;
  el.textContent = s.text;
  el.title = s.title;
}

// ---- 家庭码共享弹窗 ----
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

// 把默认 Store 替换为 CloudStore（调用方式不变，但写入会同步到云端）
// 注意：CloudStore.set 是 async，需要调用处 await 或忽略 Promise
const Store = CloudStore;
