// =============================================
// Code.gs：Google Apps Script 後台程式
// 負責人：後台
//
// 使用方式：
// 1. 打開 Google 試算表 → 擴充功能 → Apps Script
// 2. 把這個檔案的內容貼進去
// 3. 在「專案設定 → 指令碼屬性」新增 PASSCODE（通行碼），
//    不要把通行碼寫在這個檔案裡，也不要 commit 到 GitHub
// =============================================

function checkPasscode_(code) {
  const real = PropertiesService.getScriptProperties().getProperty('PASSCODE');
  return real && code === real;
}

function json_(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

// 讀取資料：?action=students / types / records&code=通行碼
function doGet(e) {
  if (!checkPasscode_(e.parameter.code)) return json_({ error: '通行碼錯誤' });
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  if (e.parameter.action === 'students') {
    // 只回傳班級與座號，不回傳姓名
    const rows = ss.getSheetByName('學生名單').getDataRange().getValues().slice(1);
    return json_(rows.map(r => ({ class: String(r[0]), seat: r[1] })));
  }
  if (e.parameter.action === 'types') {
    const rows = ss.getSheetByName('事件類型').getDataRange().getValues().slice(1);
    return json_(rows.map(r => r[0]).filter(String));
  }
  if (e.parameter.action === 'records') {
    // TODO：讀取「事件紀錄」工作表並回傳
    return json_([]);
  }
  return json_({ error: '未知的 action' });
}

// 新增紀錄
function doPost(e) {
  const body = JSON.parse(e.postData.contents);
  if (!checkPasscode_(body.code)) return json_({ error: '通行碼錯誤' });
  // TODO：把 body.record 寫進「事件紀錄」工作表（appendRow）
  return json_({ ok: true });
}
