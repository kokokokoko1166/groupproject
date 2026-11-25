// =============================================
// storage.js：所有讀寫資料的程式都放在這裡
// 負責人：後台
//
// 目前使用「假資料」，讓前端組員可以先做畫面。
// 等 Apps Script 完成後，把 USE_FAKE_DATA 改成 false，
// 並填入 API_URL，其他頁面不用改。
// =============================================

const USE_FAKE_DATA = true;
const API_URL = ''; // Apps Script 部署後的網址（之後再填）

// ---------- 假資料（只用座號，不放真實姓名）----------
const FAKE_STUDENTS = [
  { class: '501', seat: 1 }, { class: '501', seat: 2 }, { class: '501', seat: 3 },
  { class: '501', seat: 4 }, { class: '501', seat: 5 }, { class: '501', seat: 6 },
];
const FAKE_TYPES = ['上課講話', '離開座位', '同學衝突', '未交作業', '不禮貌', '其他'];
let fakeRecords = [
  { time: '2026-11-24 10:05', class: '501', seat: 3, period: '第二節', type: '上課講話', note: '', action: '口頭提醒', notifyParent: false },
  { time: '2026-11-24 13:40', class: '501', seat: 5, period: '第五節', type: '同學衝突', note: '與 2 號爭執', action: '分開座位並談話', notifyParent: true },
];

// ---------- 給其他頁面呼叫的函式 ----------

/** 取得學生名單 */
async function getStudents() {
  if (USE_FAKE_DATA) return FAKE_STUDENTS;
  // TODO（後台）：呼叫 API_URL 取得名單
}

/** 取得事件類型 */
async function getTypes() {
  if (USE_FAKE_DATA) return FAKE_TYPES;
  // TODO（後台）：呼叫 API_URL 取得類型
}

/** 新增一筆事件紀錄 */
async function addRecord(record) {
  if (USE_FAKE_DATA) { fakeRecords.push(record); return true; }
  // TODO（後台）：POST 到 API_URL
}

/** 取得所有事件紀錄 */
async function getRecords() {
  if (USE_FAKE_DATA) return fakeRecords;
  // TODO（後台）：呼叫 API_URL 取得紀錄
}
