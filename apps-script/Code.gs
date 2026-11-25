// =============================================
// Code.gs：Google Apps Script 後台程式
// 負責人：後台
//
// 使用方式：
// 1. 打開 Google 試算表 → 擴充功能 → Apps Script
// 2. 把這個檔案的內容貼進去，按儲存
// 3. 專案設定 → 指令碼屬性 → 新增 PASSCODE（通行碼）
//    通行碼不要寫在這個檔案裡，也不要 commit 到 GitHub
// 4. 部署 → 新增部署作業 → 網頁應用程式，取得網址
//
// 試算表欄位（第一列是標題）：
//   學生名單：班級、座號、姓名、備註
//   事件類型：類型名稱
//   事件紀錄：編號、時間、班級、座號、節次、事件類型、描述、原始輸入、處理方式、是否通知家長
// =============================================

function checkPasscode_(code) {
  const real = PropertiesService.getScriptProperties().getProperty('PASSCODE');
  return real && code === real;
}

function json_(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

function rows_(sheetName) {
  return SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName)
    .getDataRange().getValues().slice(1); // 去掉標題列
}

// 讀取資料：網址?action=students｜types｜records&code=通行碼
function doGet(e) {
  if (!checkPasscode_(e.parameter.code)) return json_({ error: '通行碼錯誤' });

  if (e.parameter.action === 'students') {
    return json_(rows_('學生名單').map(r => ({ class: String(r[0]), seat: r[1], name: r[2] })));
  }
  if (e.parameter.action === 'types') {
    return json_(rows_('事件類型').map(r => r[0]).filter(String));
  }
  if (e.parameter.action === 'records') {
    // TODO（後台）：把「事件紀錄」每一列轉成
    // { id, time, class, seat, period, type, note, raw, action, notifyParent } 回傳
    return json_([]);
  }
  return json_({ error: '未知的 action' });
}

// 新增或刪除紀錄：POST 內容為 JSON { code, action: 'add'｜'delete', record }
function doPost(e) {
  const body = JSON.parse(e.postData.contents);
  if (!checkPasscode_(body.code)) return json_({ error: '通行碼錯誤' });
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('事件紀錄');

  if (body.action === 'add') {
    const r = body.record;
    // TODO（後台）：確認欄位順序與試算表一致
    sheet.appendRow([r.id, r.time, r.class, r.seat, r.period, r.type, r.note, r.raw || '', r.action, r.notifyParent ? '是' : '否']);
    return json_({ ok: true });
  }
  if (body.action === 'delete') {
    // TODO（後台）：找到編號等於 body.id 的那一列並刪除（sheet.deleteRow）
    return json_({ ok: true });
  }
  return json_({ error: '未知的 action' });
}
