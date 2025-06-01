
ST.themes.loadCss("style.css");

ST.hooks.onReady(() => {
  const statusRegex = /\s*📆日期：([^\n]+)\s*🕰️時間：([^\n]+)\s*📍地點：([^\n]+)\s*情緒：([^\n]+)\s*行為：([\s\S]+?)\s*著裝：([^\n]+)\s*好感：(\d+(?:\.\d+)?)%\s*\(([^)]+)\)\s*真實愛意：(\d+(?:\.\d+)?)%\s*\(([^)]+)\)\s*想法：\(([\s\S]+?)\)\s*隱藏屬性：\s*💕性慾：\(([\s\S]+?)\)\s*🍆性器：\(([\s\S]+?)\)/;

  function buildStatusHTML(match) {
    if (!match) return "";
    const [_, date, time, location, emotion, action, outfit, favor, favorText, love, loveText, thought, desire, genital] = match;

    return `
      <div class="status-container">
        <details open>
          <summary>
            <div class="status-header">
              <span>📆 ${date}</span><span style="opacity:0.5">|</span><span>🕰️ ${time}</span><span style="margin-left:auto">📍 ${location}</span>
            </div>
          </summary>
          <div class="status-content">
            <div style="margin-bottom:1rem">
              <div style="margin-bottom:0.8rem"><strong class="item-title">情緒：</strong>${emotion}</div>
              <div style="margin-bottom:0.8rem"><strong class="item-title">行為：</strong>${action}</div>
              <div style="margin-bottom:1.2rem"><strong class="item-title">著裝：</strong>${outfit}</div>
            </div>
            <div style="margin:1.4rem 0">
              <div style="margin-bottom:1.2rem">
                <div class="progress-group">
                  <span class="progress-label">好感</span>
                  <div class="progress-bar-bg">
                    <div class="progress-bar" style="width:${favor}%"></div>
                  </div>
                </div>
                <div class="progress-description">${favorText}</div>
              </div>
              <div>
                <div class="progress-group">
                  <span class="progress-label">真實愛意</span>
                  <div class="progress-bar-bg">
                    <div class="progress-bar" style="width:${love}%"></div>
                  </div>
                </div>
                <div class="progress-description">${loveText}</div>
              </div>
            </div>
            <div class="thought">
              <div class="thought-label">內心獨白</div>
              <div class="thought-text">${thought}</div>
            </div>
            <details>
              <summary class="hidden-label">隱藏屬性</summary>
              <div class="hidden-info">
                <div><strong>💕 性慾：</strong><span>${desire}</span></div>
                <div style="margin:0.6rem 0 0 0"><strong>🍆 性器：</strong><span>${genital}</span></div>
              </div>
            </details>
          </div>
        </details>
      </div>
    `;
  }

  function insertStatusBar() {
    const messages = document.querySelectorAll(".mes.text");
    messages.forEach(msg => {
      const content = msg.innerText;
      const match = content.match(statusRegex);
      if (match && !msg.querySelector(".status-container")) {
        const statusHTML = buildStatusHTML(match);
        msg.innerHTML = msg.innerHTML.replace(statusRegex, "");
        msg.insertAdjacentHTML("beforeend", statusHTML);
      }
    });
  }

  const observer = new MutationObserver(() => {
    insertStatusBar();
  });

  observer.observe(document.getElementById("chat")?.parentNode, {
    childList: true,
    subtree: true
  });

  insertStatusBar();
});
