/* ============ Word-Master-Harvey · 界面 ============ */
const ICON = n => '<svg><use href="#i-' + n + '"/></svg>';
const isEnglishUI = () => !!(Store.state && Store.state.settings && Store.state.settings.language === 'en');
const tr = (zh, en) => isEnglishUI() ? en : zh;
const unitTitle = title => isEnglishUI() && title === '课本单词' ? 'Textbook Words' : title;
function say(id) { const w = Store.byId(id); if (w) speak(w.w); }

const UI = {
  unit: 1,
  mode: 'units',
  tab: 'units',
  wordQuery: '',
  wordUnit: 0,
  drillScope: 'unit',
  calendarOffset: 0,
  impTab: 'excel',  // excel | image | text
  _impRows: null,   // Excel 解析后的二维数组
  _ocrText: '',     // 图片 OCR 后的文字

  init() {
    Store.load();
    document.documentElement.lang = isEnglishUI() ? 'en' : 'zh-CN';
    Store.currentUnit();
    this.renderSide();
    this.bindModes();
    this.unit = Store.currentUnit();
    this.render();
    // 跨零点自动刷新
    setInterval(() => { this.renderSide(); }, 60000);
  },

  bindModes() {
    $$('#modes button').forEach(b => b.onclick = () => { this.mode = b.dataset.m; this.render(); this.toggleModes(); });
  },
  toggleModes() {
    $$('#modes button').forEach(b => b.classList.toggle('on', b.dataset.m === this.mode));
  },

  goUnit(u) {
    Store.unit = u; this.unit = u;
    this.mode = this.tab === 'tests' ? 'drill' : 'learn';
    this.drillScope = 'unit';
    this.renderSide(); this.render();
  },
  goTab(tab) {
    this.tab = tab;
    this.goMode({units:'units', words:'words', tests:'tests', me:'me'}[tab]);
  },
  view_units() { return this.unitHub(false); },
  view_tests() { return this.unitHub(true); },
  weeklyChallenge(compact) {
    const w = Store.weekInfo();
    const done = Math.min(w.activeDays, w.target);
    return `<div class="weekly-challenge ${compact ? 'compact' : ''}">
      <div class="weekly-icon">🏆</div><div class="weekly-copy"><strong>${tr('本周打卡挑战','Weekly Check-in Quest')}</strong>
      <span>${w.rewarded ? tr('已完成！100 金币已到账','Complete! 100 coins collected') : tr(`一周学习 ${w.target} 天，奖励 ${WEEKLY_REWARD_COINS} 金币`,`Learn on ${w.target} days this week to earn ${WEEKLY_REWARD_COINS} coins`)}</span></div>
      <div class="weekly-days" aria-label="${done}/${w.target}">${Array.from({length:w.target}, (_,i) => `<i class="${i < done ? 'on' : ''}">${i < done ? '✓' : i + 1}</i>`).join('')}</div>
      <b class="weekly-prize">${w.rewarded ? tr('已领取','Collected') : `${done}/${w.target} · 🪙 +${WEEKLY_REWARD_COINS}`}</b>
    </div>`;
  },
  weeklyRewardEarnedHtml() {
    const reward = Store.takeWeeklyRewardNotice();
    if (!reward) return '';
    return `<div class="reward-earned weekly-earned"><img src="assets/word-explorer-fox.png" alt="${tr('小狐狸送来每周奖励','Fox brings the weekly reward')}"><div><span>${tr('本周打卡挑战完成！','Weekly quest complete!')}</span><strong>🪙 +${reward.coins}</strong><small>${tr('金币总数','Total coins')} ${reward.total}</small></div></div>`;
  },
  unitHub(test) {
    const o = Store.statOverview();
    return `<div class="welcome-card"><div class="welcome-copy"><span class="eyebrow">${test ? 'READY, SET, GO!' : 'WORD EXPLORER'}</span>
      <h2>${test ? tr('来赢下今天的金币！', 'Let’s win some coins!') : 'Hi, ' + esc(Store.state.settings.name || 'Harvey') + ' 👋'}</h2>
      <p>${test ? tr(`每个单元首次通关可获得 ${UNIT_REWARD_COINS} 枚金币。`, `Earn ${UNIT_REWARD_COINS} coins the first time you pass each unit.`) : tr('和小狐狸一起发现新单词，完成单元还能赢金币！', 'Discover new words with Foxy and earn coins!')}</p>
      <div class="hub-stats"><span><b>${o.mastered}</b>${tr('会的单词','Words learned')}</span><span><b>${o.coins}</b>${tr('我的金币','My coins')}</span><span><b>${o.unitsDone}/${o.unitsTotal}</b>${tr('已通关','Units passed')}</span></div></div>
      <img class="welcome-mascot" src="assets/word-explorer-fox.png" alt="${tr('拿着单词书和金币的小狐狸','Fox mascot holding a book and a coin')}"></div>
      ${this.weeklyRewardEarnedHtml()}${this.weeklyChallenge(false)}
      <div class="section-label"><h2>${test ? tr('单元测试','Unit Tests') : tr('我的单元','My Units')}</h2><span>${Store.unitList().length} ${tr('个单元 · 自由选择','units · Pick any one')}</span></div>
      <div class="unit-grid">${Store.unitList().map(u => `<button class="unit-tile" onclick="UI.goUnit(${u.u})">
      <span class="unit-number">${String(u.u).padStart(2,'0')}</span><span class="unit-state">${u.rewarded ? tr('🪙 已获得','🪙 Collected') : u.checked ? tr('✓ 已通关','✓ Passed') : test ? tr('开始测试 ↗','Start test ↗') : u.learning || u.mastered ? tr('继续学习 ↗','Keep learning ↗') : tr('开始学习 ↗','Start learning ↗')}</span>
      <h3>${esc(u.name)}</h3><p>${esc(unitTitle(u.title) || tr('等待导入','Waiting for words'))}</p>
      <div class="unit-progress"><i style="width:${u.pct}%"></i></div><small><span>${u.mastered}/${u.total} ${tr('已掌握','mastered')}</span><span class="unit-coin">🪙 +${UNIT_REWARD_COINS}</span></small></button>`).join('')}</div>`;
  },
  view_words() {
    return `<div class="search-box">${ICON('search')}<input aria-label="${tr('搜索词库','Search word library')}" placeholder="${tr('搜索单词或中文释义','Search a word or meaning')}" value="${esc(this.wordQuery)}" oninput="UI.wordQuery=this.value;UI.renderWordResults()"></div>
    <div class="chips library-filters"><button class="chip ${!this.wordUnit?'on':''}" onclick="UI.wordUnit=0;UI.render()">${tr('全部','All')}</button>${Store.unitList().map(u=>`<button class="chip ${this.wordUnit===u.u?'on':''}" onclick="UI.wordUnit=${u.u};UI.render()">${esc(u.name)}</button>`).join('')}</div><div id="wordResults">${this.wordResults()}</div>`;
  },
  wordResults() {
    const q = this.wordQuery.trim().toLowerCase();
    const words = Store.state.words.filter(w=>(!this.wordUnit || w.u===this.wordUnit) && (!q || w.w.toLowerCase().includes(q) || w.cn.includes(q)));
    return `<p class="muted">${tr(`共 ${words.length} 个单词 · 点击查看详情`,`${words.length} words · Tap for details`)}</p><div class="wordgrid">${words.map(w=>this.wcard(w)).join('') || `<div class="card center muted">${tr('没有找到匹配的单词','No matching words')}</div>`}</div>`;
  },
  renderWordResults() { $('#wordResults').innerHTML = this.wordResults(); },
  view_me() {
    const o = Store.statOverview();
    return `<div class="profile-card"><div class="avatar">${esc((Store.state.settings.name || 'H').slice(0,1).toUpperCase())}</div><div><h2>${esc(Store.state.settings.name || 'Harvey')}</h2><p class="muted">${tr('每一点进步，都值得记录','Every little step is worth celebrating')}</p></div></div>
    <div class="coin-card"><img src="assets/word-explorer-fox.png" alt="${tr('小狐狸金币伙伴','Fox coin buddy')}"><div><span>${tr('我的金币宝箱','My Coin Chest')}</span><strong>🪙 ${o.coins}</strong><small>${tr(`已领取 ${Store.state.rewards.claimedUnits.length} 个单元奖励、${Store.state.rewards.claimedWeeks.length} 个每周奖励`,`${Store.state.rewards.claimedUnits.length} unit and ${Store.state.rewards.claimedWeeks.length} weekly rewards collected`)}</small></div></div>
    ${this.weeklyChallenge(true)}
    <div class="profile-actions"><button class="btn" onclick="UI.goMode('stats')">${ICON('chart')} ${tr('学习统计','My Progress')}</button><button class="btn ghost" onclick="UI.goMode('set')">${ICON('gear')} ${tr('设置','Settings')}</button><button class="btn ghost" onclick="UI.goMode('review')">${ICON('flip')} ${tr('到期复习','Review')}</button></div>${this.view_stats()}`;
  },

  renderSide() {
    const ul = $('#unitList');
    ul.innerHTML = Store.unitList().map(u => {
      const C = 2 * Math.PI * 16;
      const off = C * (1 - u.pct / 100);
      const ring = u.total === 0
        ? `<div class="urings"><div style="width:28px;height:28px;border-radius:50%;background:#eef2f7"></div></div>`
        : `<div class="urings"><svg width="34" height="34" viewBox="0 0 34 34">
            <circle cx="17" cy="17" r="16" stroke="#e8edf5" stroke-width="4" fill="none"/>
            <circle cx="17" cy="17" r="16" stroke="${u.checked ? '#22c55e' : '#2f7cf6'}" stroke-width="4" fill="none" stroke-linecap="round"
              stroke-dasharray="${C.toFixed(1)}" stroke-dashoffset="${off.toFixed(1)}"/>
          </svg><b>${u.pct}%</b></div>`;
      return `<button class="uitem ${u.u === this.unit ? 'on' : ''} ${u.checked ? 'done' : ''}" onclick="UI.goUnit(${u.u})">
        ${ring}
        <div style="flex:1;min-width:0">
          <div class="uname">${esc(u.name)}${u.total ? ` · <span class="muted" style="font-weight:400">${u.mastered}/${u.total}</span>` : ''}</div>
          <div class="utitle">${esc(unitTitle(u.title) || (u.total === 0 ? tr('等待导入','Waiting for words') : ''))}</div>
        </div>
        <span class="ugo">${u.u}</span>
      </button>`;
    }).join('');
    // 顶栏快数据
    const o = Store.statOverview();
    $('#qsMastered').textContent = o.mastered;
    $('#qsLearn').textContent = o.learning;
    $('#qsUnits').textContent = `${o.unitsDone}/${o.unitsTotal}`;
    $('#qsMasteredLabel').textContent = tr('已掌握','Mastered');
    $('#qsLearnLabel').textContent = tr('学习中','Learning');
    $('#qsUnitsLabel').textContent = tr('通关','Passed');
    $('#brandSubtitle').textContent = tr('给 Harvey 的单词书',"Harvey's Word Book");
    $('#sideHint').textContent = tr('所有单元都能随时打开，不受顺序限制。完成「学新词 + 练一练 ≥70%」即标记该单元通关。','Open any unit at any time. Learn its words and score 70% or more to pass.');
  },

  top() {
    const u = Store.unitInfo(Store.unit);
    $('#mTitle').textContent = u.name + (u.total ? ` · ${u.mastered}/${u.total} ${tr('已掌握','mastered')}` : '');
    $('#mSub').textContent = u.total ? (unitTitle(u.title) + tr(` · ${u.newCount} 个待学 · 已通关 ${u.checked ? '✓' : '未'}`,` · ${u.newCount} to learn · ${u.checked ? 'Passed ✓' : 'Not passed'}`)) : tr('本单元还没导入单词','No words have been added to this unit');
    const pages = isEnglishUI()
      ? {units:['',''],tests:['',''],words:['',''],me:['',''],stats:['My Progress','See how you grow every day'],set:['Settings','Make learning work for you'],review:['Review','Practice at the right time']}
      : {units:['',''],tests:['',''],words:['',''],me:['',''],stats:['学习统计','记录每一天的成长'],set:['设置','让学习更适合你'],review:['到期复习','温故知新，记得更牢']};
    if (pages[this.mode]) { $('#mTitle').textContent=pages[this.mode][0]; $('#mSub').textContent=pages[this.mode][1]; }
    const root = ['units','tests','words','me'].includes(this.mode);
    $('.mhead').classList.toggle('root-head', root);
    $('#pageBack').hidden = root;
    $('#modes').hidden = !['learn','drill'].includes(this.mode);
    $$('#tabbar button').forEach(b => { b.classList.toggle('on',b.dataset.tab===this.tab); b.setAttribute('aria-current',b.dataset.tab===this.tab?'page':'false'); });
    $('#coinCount').textContent = Store.state.rewards.coins;
    $('.coin-wallet').title = tr('奖励金币','Reward coins');
    $('#pageBack').setAttribute('aria-label', tr('返回','Back'));
    $('#tabbar').setAttribute('aria-label', tr('主导航','Main navigation'));
    $('#languageToggle').textContent = isEnglishUI() ? '中文' : 'EN';
    $('#languageToggle').setAttribute('aria-label', isEnglishUI() ? '切换到中文' : 'Switch to English');
    const tabLabels = isEnglishUI() ? {units:'Units',words:'Words',tests:'Tests',me:'Me'} : {units:'单元',words:'词库',tests:'测试',me:'我的'};
    $$('#tabbar button').forEach(b => { const s = $('span', b); if (s) s.textContent = tabLabels[b.dataset.tab]; });
    const modeLabels = isEnglishUI() ? {learn:'Learn',drill:'Practice'} : {learn:'学单词',drill:'练一练'};
    $$('#modes button').forEach(b => b.textContent = modeLabels[b.dataset.m]);
    this.toggleModes();
  },

  toggleLanguage() {
    Store.state.settings.language = isEnglishUI() ? 'zh' : 'en';
    Store.state.settings.languageChoiceVersion = 1;
    Store.save();
    document.documentElement.lang = isEnglishUI() ? 'en' : 'zh-CN';
    this.renderSide(); this.render();
  },

  render() {
    this.top();
    const v = $('#view');
    v.innerHTML = this['view_' + this.mode] ? this['view_' + this.mode]() : '';
  },

  /* ================= 学单词 ================= */
  view_learn() {
    const info = Store.unitInfo(Store.unit);
    const words = Store.unitWords(Store.unit);
    if (info.total === 0) {
      return `<div class="card center">
        <div style="font-size:46px">📚</div>
        <div class="h2 mt8">${tr('本单元还没有单词','No words in this unit yet')}</div>
        <div class="muted">${esc(info.desc || tr('家长导入单词后，Harvey 就能开始学习这一单元。','Ask a parent to add words, then start learning.'))}</div>
        <button class="btn lg mt16" onclick="UI.goMode('set')">${tr('去导入单词','Add words')}</button>
      </div>`;
    }
    const newCount = info.newCount;
    let html = `<div class="card">
      <div class="between">
        <div>
          <div class="h2" style="margin:0">${esc(unitTitle(info.title))}</div>
          <div class="muted mt8">${tr(`共 ${info.total} 个词 · 已掌握 ${info.mastered} · 学习中 ${info.learning} · 待学 ${info.newCount}`,`${info.total} words · ${info.mastered} mastered · ${info.learning} learning · ${info.newCount} new`)}${info.checked ? ` · <span style="color:var(--success);font-weight:800">${tr('✓ 已通关','✓ Passed')}</span>` : ''}</div>
        </div>
        <div style="display:flex;gap:8px;flex-wrap:wrap">
          ${newCount ? `<button class="btn lg" onclick="UI.startLearn(false)">${tr(`学 ${newCount} 个新词`,`Learn ${newCount} new words`)}</button>` : ''}
          <button class="btn lg ${newCount ? 'ghost' : ''}" onclick="UI.startLearn(true)">${tr('再过一遍本单元','Review this unit')}</button>
          ${info.checked ? `<button class="btn ghost" onclick="UI.forceNext()">${tr('下一单元','Next unit')} →</button>` : ''}
        </div>
      </div>
      ${info.checked ? '' : `<div class="muted mt12">${tr(`提示：所有单元都能随时打开。先「学 ${info.newCount} 个新词」认识单词，再「练一练」巩固（≥${PASS_RATE}% 标记本单元通关）。`,`Tip: Learn the ${info.newCount} new words, then practice. Score ${PASS_RATE}% or more to pass.`)}</div>`}
    </div>`;
    html += `<div class="card">
      <div class="between mb8"><div class="h3" style="margin:0">${tr('本单元词表','Words in this unit')}</div>
        <div class="muted">${info.mastered}/${info.total} ${tr('已掌握','mastered')}</div></div>
      <div class="wordgrid">${words.map(w => this.wcard(w)).join('') || `<div class="muted">${tr('空','Empty')}</div>`}</div>
    </div>`;
    return html;
  },

  wcard(w) {
    const parts = (w.parts || []).map(p => `<span class="m-piece ${p.k}">${esc(p.p)}</span>`).join('<span class="m-plus">+</span>');
    const stat = w.status === 'mastered' ? `<span class="pill mastered">${tr('已掌握','Mastered')}</span>`
      : w.status === 'learning' ? `<span class="pill learning">${tr('学习中','Learning')}</span>`
      : `<span class="pill new">${tr('未学','New')}</span>`;
    return `<div class="wcard" onclick="UI.detailSheet('${w.id}')">
      <div class="w-big">${esc(w.w)}</div>
      <div class="w-ph">${esc(w.ph || tr('音标待补充','IPA coming soon'))}</div>
      <div class="w-cn">${esc(w.cn)}${w.pos ? ` <span class="pos">${esc(w.pos)}</span>` : ''}</div>
      <div class="w-parts">${parts || ''}</div>
      <div class="w-status">${stat}<button class="iconbtn" aria-label="${esc(tr('听发音：','Listen to ') + w.w)}" onclick="event.stopPropagation();say('${w.id}')">${ICON('sound')}</button></div>
    </div>`;
  },

  formationTitle(w) {
    const en = { root:'Root Story', affix:'Affixes and Word Building', compound:'Compound Word', origin:'Word Origin', base:'Base Word', phrase:'Phrase or Short Form' };
    return isEnglishUI() ? (en[w.formationKind] || 'How This Word Is Built') : (FORMATION_KIND[w.formationKind] || '词根与构词讲解');
  },
  formationSources(w) {
    const urls = (w.formationSources || []).filter(url => typeof url === 'string' && /^https:\/\/(www\.)?(etymonline\.com|dictionary\.cambridge\.org)\//.test(url));
    return urls.length ? `<div class="formation-sources">${tr('参考：','Sources: ')}${urls.map(url => `<a href="${esc(url)}" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation()">${url.includes('etymonline.com') ? tr('词源词典','Etymology Dictionary') : tr('剑桥词典','Cambridge Dictionary')}</a>`).join(' · ')}</div>` : '';
  },
  detailSheet(id) {
    const w = Store.byId(id); if (!w) return;
    const parts = (w.parts || []).map(p => `<span class="m-piece ${p.k}">${esc(p.p)}<small style="opacity:.7;font-weight:600"> · ${esc((PART_KIND[p.k] || PART_KIND.word).label)}</small></span>`).join('<span class="m-plus">+</span>');
    const partsGloss = (w.parts || []).map(p => `<span class="m-piece ${p.k}">${esc(p.p)}</span> = <b>${esc(p.g)}</b>`).join(' &nbsp; ');
    const fam = (w.fam || []).map(f => `<span class="fam-chip"><b>${esc(f.w)}</b><span>${esc(f.cn)}</span></span>`).join('');
    this.sheet(tr('单词详情','Word Details'), `<div class="detail">
      <div class="sec" style="text-align:center">
        <div style="font-size:36px;font-weight:900">${esc(w.w)}</div>
        <div class="muted">${esc(w.ph || tr('音标待补充','IPA coming soon'))}</div>
        <div style="font-size:18px;font-weight:800;margin-top:6px">${esc(w.cn)}${w.pos ? ` <span class="pos">${esc(w.pos)}</span>` : ''}</div>
        <button class="soundbtn mt8" onclick="say('${w.id}')">${ICON('sound')} ${tr('听发音','Listen')}</button>
      </div>
      <div class="sec">
        <h4>${tr('词素拆分','Word Parts')}</h4>
        <div style="font-size:18px;text-align:center;padding:8px 0">${parts || `<span class="muted">${tr('按完整词形学习，见下方讲解','Learn this as a whole word. See the note below.')}</span>`}</div>
        <div class="muted center mt8">${partsGloss}</div>
      </div>
      ${w.story ? `<div class="sec"><h4>${esc(this.formationTitle(w))}</h4>
        <div class="story">${esc(w.story)}</div>
        ${w.storyEn ? `<div class="story">${esc(w.storyEn)}</div>` : ''}
        ${this.formationSources(w)}
      </div>` : ''}
      ${w.ex ? `<div class="sec"><h4>${tr('例句','Example')}</h4>
        <div class="story" style="background:rgba(47,124,246,.06)"><b style="color:var(--accent)">${esc(w.ex)}</b></div>
        ${w.ec ? `<div class="story" style="background:rgba(34,197,94,.06)">${esc(w.ec)}</div>` : ''}
      </div>` : ''}
      ${fam ? `<div class="sec"><h4>${tr('同根词与相关表达','Word Family')}</h4><div class="fam-list">${fam}</div></div>` : ''}
    </div>`);
  },

  /* ---- 学习卡片（沉浸式，带词根拆分） ---- */
  startLearn(reviewMode) {
    const list = reviewMode
      ? Store.unitWords(Store.unit).filter(w => w.status !== 'mastered')
      : Store.todoLearn(Store.unit);
    if (!list.length) { toast(reviewMode ? tr('本单元所有词都掌握了，棒极了','Amazing! You mastered every word in this unit.') : tr('本单元的新词已经学完啦','You learned all the new words!')); return; }
    this.learnQueue = list.map(w => ({ id: w.id, again: 0 }));
    this.learnIdx = 0; this.learnMax = list.length * 2; this.reviewMode = !!reviewMode;
    this.renderLearn();
  },

  renderLearn() {
    const g = $('#game');
    if (this.learnIdx >= this.learnQueue.length || this.learnIdx >= this.learnMax) return this.finishLearn();
    const w = Store.byId(this.learnQueue[this.learnIdx].id);
    if (!w) { this.learnIdx++; return this.renderLearn(); }
    const partsBig = (w.parts || []).map(p => `<span class="m-piece ${p.k}" style="font-size:20px; padding:4px 10px">${esc(p.p)}</span>`).join('<span class="m-plus" style="font-size:18px">+</span>');
    const partsSmall = (w.parts || []).map(p => `<span style="display:inline-block;margin:0 6px"><span class="m-piece ${p.k}">${esc(p.p)}</span> = <small>${esc(p.g)}</small></span>`).join('');
    const fam = (w.fam || []).slice(0, 4).map(f => `<span class="fam-chip"><b>${esc(f.w)}</b><span>${esc(f.cn)}</span></span>`).join('');
    g.innerHTML = `<div class="q-head">
        <button class="iconbtn" aria-label="${tr('退出学习','Leave learning')}" onclick="UI.quitLearn()">${ICON('back')}</button>
        <div class="bar"><i style="width:${Math.round(this.learnIdx / this.learnQueue.length * 100)}%"></i></div>
        <div class="muted" style="font-weight:700">${this.learnIdx + 1}/${this.learnQueue.length}</div>
      </div>
      <div class="flip" id="flip" tabindex="0" role="button" aria-label="${tr('翻转单词卡片','Flip word card')}" onkeydown="if(event.target===this && (event.key==='Enter' || event.key===' ')){event.preventDefault();UI.flip()}" onclick="UI.flip()">
        <div class="flip-inner">
          <div class="face">
            <div class="w-big">${esc(w.w)}</div>
            <div class="w-ph">${esc(w.ph || tr('音标待补充','IPA coming soon'))}</div>
            <div class="parts-big">${partsBig || ''}</div>
            <button class="soundbtn mt16" onclick="event.stopPropagation();say('${w.id}')">${ICON('sound')} ${tr('听发音','Listen')}</button>
            <div class="tapme mt8">${tr('点击卡片看中文 · 词根讲解','Tap the card for meaning and word parts')}</div>
          </div>
          <div class="face back">
            <div class="w-backtitle">${esc(w.w)}</div>
            <div class="w-ph">${esc(w.ph || tr('音标待补充','IPA coming soon'))}</div>
            <button class="soundbtn" onclick="event.stopPropagation();say('${w.id}')">${ICON('sound')} ${tr('听发音','Listen')}</button>
            <div class="w-mean">${esc(w.cn)}</div>
            <h4 class="card-section-title">${tr('词根拆解','Word Parts')}</h4><div class="parts-big mt8" style="font-size:14px">${partsSmall}</div>
            ${w.story ? `<div class="w-ex mt8" style="text-align:left"><b style="color:var(--accent);font-style:normal">${esc(this.formationTitle(w))}: ${esc(isEnglishUI() && w.storyEn ? w.storyEn : w.story)}</b></div>${this.formationSources(w)}` : `<div class="w-ex mt8">${tr('整词 / 短语记忆：暂无已核实的词根拆解，先结合发音和中文意思记忆。','Whole-word learning: remember this word with its sound, meaning, and example.')}</div>`}
            <h4 class="card-section-title">${tr('例句','Example')}</h4><div class="w-ex"><i>${esc(w.ex || tr('例句待补充','Example coming soon'))}</i>${w.ec ? `<p>${esc(w.ec)}</p>` : ''}</div>
            ${fam ? `<div class="fam-list mt8">${fam}</div>` : ''}
          </div>
        </div>
      </div>
      <div class="row mt8" style="gap:10px;max-width:520px;margin:14px auto 0">
        <button class="btn red" style="flex:1" onclick="UI.learnNext(false)">${tr('还不认识','Not yet')}</button>
        <button class="btn green" style="flex:1" onclick="UI.learnNext(true)">${tr('我记住了','Got it!')}</button>
      </div>`;
    g.classList.add('show');
    if (Store.state.settings.autoSpeak) speak(w.w);
  },

  flip() { $('#flip').classList.toggle('on'); },

  learnNext(ok) {
    const item = this.learnQueue[this.learnIdx];
    Store.markLearned(item.id);
    if (!ok) { item.again++; if (item.again <= 1) this.learnQueue.push({ id: item.id, again: 1 }); }
    this.learnIdx++;
    this.renderLearn();
  },

  quitLearn() {
    $('#game').classList.remove('show'); $('#game').innerHTML = '';
    this.reviewMode = false;
    this.renderSide(); this.render();
  },

  finishLearn() {
    const u = Store.unitInfo(Store.unit);
    const n = new Set(this.learnQueue.map(w => w.id)).size;
    const g = $('#game');
    const msg = u.newCount === 0 ? tr('本单元的新词都学完了','All new words are done!') : (this.reviewMode ? tr('已复习完本单元','Unit review complete!') : tr('新词学完啦','New words complete!'));
    const weeklyReward = this.weeklyRewardEarnedHtml();
    g.innerHTML = `<div class="card result mt24">
      <div style="font-size:46px">🎉</div>
      <div class="h2 mt8">${esc(msg)}</div>
      <div class="muted">${this.reviewMode ? tr(`复习了 ${n} 个词`,`Reviewed ${n} words`) : tr(`今天学了 ${n} 个新词`,`Learned ${n} new words today`)}</div>
      ${weeklyReward}
      ${u.newCount === 0 && !u.checked ? `<button class="btn lg block mt16" onclick="UI.quitLearn();UI.goMode('drill');UI.startDrill()">${tr(`马上去练一练（≥${PASS_RATE}% 即标记本单元通关）`,`Practice now — score ${PASS_RATE}% to pass`)}</button>`
        : u.newCount === 0 && u.checked ? `<button class="btn lg block mt16" onclick="UI.forceNext()">${tr('进入下一单元','Go to the next unit')} →</button>`
        : `<button class="btn gray block mt12" onclick="UI.quitLearn()">${tr('先休息一下','Take a break')}</button>`}
    </div>`;
    this.reviewMode = false;
  },

  startDrill() { this.drillScope = 'unit'; this.render(); },

  forceNext() {
    const u = Store.unitInfo(Store.unit);
    const next = Store.unitList().find(x => x.u === u.u + 1);
    if (next) this.goUnit(next.u);
    else toast(tr('已经是最后一个单元啦','This is the last unit!'));
  },

  /* ================= 练一练 ================= */
  view_drill() {
    const info = Store.unitInfo(Store.unit);
    const scopes = {
      unit: { name: tr('本单元单词','This unit'), get: () => Store.unitWords(Store.unit).filter(w => w.status !== 'new') },
      review: { name: tr('到期复习（跨单元）','Due for review'), get: () => Store.reviewDue() },
      learned: { name: tr('已学全部','All learned'), get: () => Store.state.words.filter(w => w.status !== 'new') },
      wrong: { name: tr('错词本','Tricky words'), get: () => Store.state.words.filter(w => w.wrong > 0 && w.status !== 'mastered').sort((a, b) => b.wrong - a.wrong) },
      all: { name: tr('全词库','All words'), get: () => Store.state.words.slice() }
    };
    const cur = scopes[this.drillScope] || scopes.unit;
    const words = cur.get();
    let html = `<div class="card">
      <div class="h2">${tr('练一练','Practice')} · ${esc(info.name)}</div>
      <div class="chips">${Object.entries(scopes).map(([k, v]) => `<button class="chip ${this.drillScope === k ? 'on' : ''}" onclick="UI.setDrillScope('${k}')">${esc(v.name)}</button>`).join('')}</div>
      <div class="muted">${tr(`当前范围可用单词：`,`Words ready: `)}<b>${words.length}</b>${words.length < 2 ? tr('（太少了，先去学新词）',' — learn more words first') : ''}</div>
    </div>`;
    html += `<div class="game-grid">${Object.keys(GAMES).map(k => {
      const g = GAMES[k];
      const n = Math.min(g.size, k === 'root' ? words.filter(w => (w.parts || []).some(p => p.p && p.g)).length : words.length);
      return `<button class="game-card" onclick="UI.play('${k}',${n})">
        <div class="ico" style="background:${g.color}">${g.icon}</div>
        <div style="flex:1"><b>${esc(isEnglishUI() ? g.nameEn : g.name)}</b><p>${esc(isEnglishUI() ? g.descEn : g.desc)}</p></div>
        <div class="muted">${n} ${tr('题','questions')}</div>
      </button>`;
    }).join('')}</div>`;
    html += `<div class="card"><div class="h3">${tr('答题规则','How it works')}</div>
      <div class="muted">${tr(`每答对 1 次，下次复习间隔自动拉长（1 → 2 → 4 → 7 → 15 → 30 天）；答错立即归零重来。累计答对 5 次 = 已掌握。完成本单元所有单词的学习 + 1 次练习 ≥ ${PASS_RATE}% = 本单元通关。各单元均可自由打开，不受顺序限制。`,`Each correct answer makes the next review wait longer: 1, 2, 4, 7, 15, then 30 days. Five correct answers master a word. Learn every word and score ${PASS_RATE}% or more to pass the unit.`)}</div></div>`;
    return html;
  },
  setDrillScope(s) { this.drillScope = s; this.render(); },
  play(type, n) {
    if (n < 1) { toast(tr('没有可用题目，先去学新词或换个范围','No questions yet. Learn some words or choose another group.')); return; }
    const scopes = {
      unit: () => Store.unitWords(Store.unit).filter(w => w.status !== 'new'),
      review: () => Store.reviewDue(),
      learned: () => Store.state.words.filter(w => w.status !== 'new'),
      wrong: () => Store.state.words.filter(w => w.wrong > 0 && w.status !== 'mastered'),
      all: () => Store.state.words.slice()
    };
    const ws = (scopes[this.drillScope] || scopes.unit)();
    Quiz.open(type, ws, () => { this.renderSide(); this.render(); }, this.drillScope === 'unit' ? { unit: Store.unit } : {});
  },

  /* ================= 复习 ================= */
  view_review() {
    const due = Store.reviewDue();
    const units = Store.unitList().filter(u => u.total > 0);
    let html = `<div class="card">
      <div class="between"><div class="h2">${tr('复习','Review')}</div>
        <div class="muted">${tr('已到期','Ready')} <b style="color:var(--accent)">${due.length}</b></div></div>
      <div class="muted">${tr('「艾宾浩斯」自动安排：每个词按 1 / 2 / 4 / 7 / 15 / 30 天复习，答错就回到第 1 天。','Smart review brings words back after 1, 2, 4, 7, 15, and 30 days. A wrong answer starts the cycle again.')}</div>
      ${due.length >= 2
        ? `<button class="btn lg block mt12" onclick="UI.reviewAll()">${tr(`开始复习 ${due.length} 个到期词`,`Review ${due.length} words`)}</button>`
        : `<div class="center muted mt12">${due.length === 0 ? tr('所有词都在掌握中，继续保持！','All caught up. Great job!') : tr('到期单词只有 1 个，去练一练里做题巩固吧','One word is ready. Practice it in a game!')}</div>`}
    </div>`;
    html += `<div class="card">
      <div class="h3">${tr('按单元回顾','Review by unit')}</div>
      <div class="chips">${units.map(u => `<button class="chip ${u.u === Store.unit ? 'on' : ''}" onclick="UI.reviewUnit(${u.u})">${esc(u.name)} · ${u.mastered}/${u.total}</button>`).join('')}</div>
      <div class="muted mt8">${tr('点击进入某个单元，复习该单元所有学过的词。','Choose a unit to review its learned words.')}</div>
    </div>`;
    return html;
  },
  reviewAll() {
    const due = Store.reviewDue();
    if (due.length < 2) { toast(tr('到期单词太少','Not enough words are due yet')); return; }
    this.drillScope = 'review'; this.goMode('drill');
  },
  reviewUnit(u) {
    Store.unit = u; this.unit = u; this.drillScope = 'unit'; this.goMode('drill'); this.renderSide();
  },

  /* ================= 统计 ================= */
  view_stats() {
    const o = Store.statOverview();
    const tiles = [
      { v: o.mastered, lab: tr(`已掌握 / ${o.total}`,`Mastered / ${o.total}`) },
      { v: o.learning, lab: tr('学习中','Learning') },
      { v: o.pct + '%', lab: tr('总掌握率','Mastery') },
      { v: o.accuracy + '%', lab: tr(`正确率（${o.right + o.wrong} 题）`,`Accuracy (${o.right + o.wrong})`) },
      { v: o.unitsDone, lab: tr(`单元通关 / ${o.unitsTotal}`,`Units passed / ${o.unitsTotal}`) },
      { v: o.days, lab: tr('活跃天数','Active days') },
      { v: o.fresh, lab: tr('待学新词','New words') }
    ];
    return `<div class="stats-layout"><div class="stat-row">${tiles.slice(0, 4).map(t => `<div class="stat-tile"><b>${t.v}</b><div class="lab">${esc(t.lab)}</div></div>`).join('')}</div>
    <div class="stat-row">${tiles.slice(4).map(t => `<div class="stat-tile"><b>${t.v}</b><div class="lab">${esc(t.lab)}</div></div>`).join('')}</div>
    <div class="chart-card"><h3>${tr('各单元掌握进度','Progress by Unit')}</h3>${Charts.unitBars()}</div>
    <div class="chart-card"><h3>${tr('近 14 天学词量','Words Learned · 14 Days')}</h3>${Charts.dailyBars()}</div>
    <div class="chart-card"><h3>${tr('累计掌握趋势','Mastery Over Time')}</h3>${Charts.trend()}</div>
    <div class="chart-card"><h3>${tr('正确率分布','Answer Accuracy')}</h3>${Charts.accuracyRing()}</div>
    <div class="chart-card calendar-card">${Charts.calendar()}</div>
    ${o.total === 0 ? `<div class="card center muted">${tr('导入单词并开始学习后，这里会显示 Harvey 的进步曲线',"Add words and start learning to see Harvey's progress here")}</div>` : ''}</div>`;
  },

  /* ================= 设置 ================= */
  view_set() {
    const s = Store.state.settings;
    return `<div class="card">
      <div class="h2">${tr('设置','Settings')}</div>
      <div class="field"><label>${tr('界面语言','App Language')}</label>
        <select onchange="UI.setLanguage(this.value)">
          <option value="zh" ${s.language !== 'en' ? 'selected' : ''}>中文</option>
          <option value="en" ${s.language === 'en' ? 'selected' : ''}>English</option>
        </select></div>
      <div class="field"><label>${tr('发音口音','Voice Accent')}</label>
        <select onchange="UI.set('accent',this.value)">
          <option value="us" ${s.accent === 'us' ? 'selected' : ''}>${tr('美音','American')} en-US</option>
          <option value="uk" ${s.accent === 'uk' ? 'selected' : ''}>${tr('英音','British')} en-GB</option>
        </select></div>
      <div class="field"><label>${tr('朗读语速','Voice Speed')} ${s.rate}</label>
        <input type="range" min="0.6" max="1.2" step="0.1" value="${s.rate}" oninput="UI.set('rate',this.value);this.previousElementSibling.textContent=(isEnglishUI()?'Voice Speed ':'朗读语速 ')+this.value"></div>
      <div class="field"><label>${tr('Harvey 的名字',"Learner's Name")}</label>
        <input value="${esc(s.name)}" onchange="UI.set('name',this.value)"></div>
      <button class="btn ghost block" onclick="UI.toggleAutoSpeak()">${s.autoSpeak ? tr('关闭自动朗读','Turn Auto Read Off') : tr('开启自动朗读','Turn Auto Read On')}</button>
    </div>

    <div class="card">
      <div class="between"><div class="h2">${tr('单词库导入','Add Words')}</div>
        <div class="muted">${Store.state.words.length} ${tr('个词','words')}</div></div>
      <div class="muted mb12">${tr('家长可上传 Excel / 图片更新各单元单词，也支持手动粘贴。Excel 列建议含：Unit、单词、词性、中文释义（音标 / 例句可选）。','Parents can add words with Excel, an image, or pasted text. Suggested columns: Unit, word, part of speech, Chinese meaning, IPA, and example.')}</div>
      <div class="chips" id="impTabs">
        <button class="chip ${this.impTab === 'excel' ? 'on' : ''}" onclick="UI.setImpTab('excel')">${tr('上传 Excel','Upload Excel')}</button>
        <button class="chip ${this.impTab === 'image' ? 'on' : ''}" onclick="UI.setImpTab('image')">${tr('上传图片','Upload Image')}</button>
        <button class="chip ${this.impTab === 'text' ? 'on' : ''}" onclick="UI.setImpTab('text')">${tr('手动粘贴','Paste Text')}</button>
      </div>
      <div id="impPanel">${this.impPanelHtml()}</div>
    </div>

    <div class="card">
      <div class="h2">${tr('数据备份','Data Backup')}</div>
      <div class="muted mb12">${tr('所有学习记录保存在浏览器 localStorage。换设备前记得导出备份。','Learning records are saved in this browser. Export a backup before changing devices.')}</div>
      <div class="row" style="gap:10px;margin-bottom:10px">
        <button class="btn gray" style="flex:1" onclick="UI.exportSheet()">${ICON('download')} ${tr('导出','Export')}</button>
        <button class="btn gray" style="flex:1" onclick="UI.importDataSheet()">${ICON('upload')} ${tr('导入','Import')}</button>
      </div>
      <button class="btn gray block" onclick="UI.resetUnit()">${tr('重置当前单元进度','Reset This Unit')}</button>
      <button class="btn red block mt8" onclick="UI.resetAll()">${tr('重置全部进度','Reset All Progress')}</button>
    </div>

    <div class="card"><div class="h2">${tr('使用建议','Learning Tips')}</div>
      <div class="muted">${tr(`1. 先选一个 Unit，点击「学 N 个新词」按词根讲解法逐个认识<br>2. 翻卡时看词素拆分，理解单词为什么由这些字母组成<br>3. 学完进入「练一练」做 1 局练习，得分 ≥ ${PASS_RATE}% 即标记本单元通关（各单元均可随时打开，不限顺序）<br>4. 定期打开「复习」巩固到期单词，让艾宾浩斯循环滚动起来`,`1. Pick a unit and learn its new words.<br>2. Flip each card to see the meaning, word parts, and example.<br>3. Play a practice game and score ${PASS_RATE}% or more to pass.<br>4. Visit Review often to keep words fresh.`)}</div></div>`;
  },

  set(k, v) { Store.state.settings[k] = v; Store.save(); this.render(); },
  changeCalendarMonth(delta) { this.calendarOffset = Math.min(0, this.calendarOffset + delta); this.render(); },
  setLanguage(v) { Store.state.settings.language = v === 'en' ? 'en' : 'zh'; Store.state.settings.languageChoiceVersion = 1; Store.save(); document.documentElement.lang = isEnglishUI() ? 'en' : 'zh-CN'; this.renderSide(); this.render(); },
  toggleAutoSpeak() { Store.state.settings.autoSpeak = Store.state.settings.autoSpeak ? 0 : 1; Store.save(); this.render(); },

  importWords() {
    const u = +$('#impUnit').value;
    const txt = $('#impList').value;
    if (!txt.trim()) { toast(tr('请先粘贴单词','Paste some words first')); return; }
    const list = [];
    txt.split(/\n+/).forEach(line => {
      line = line.trim(); if (!line) return;
      const parts = line.split(/\s+/).map(s => s.trim()).filter(Boolean);
      if (parts.length < 2) return;
      const w = parts[0].replace(/^\d+[.、)]\s*/, '');
      if (!/^[A-Za-z][A-Za-z\-']*$/.test(w)) return;
      const ph = parts[1] && parts[1].startsWith('/') ? parts[1] : '';
      const rest = ph ? parts.slice(2) : parts.slice(1);
      let cn = '', ex = '';
      // 兜底：取最后一段为英文例句（不含中文），其余为中文
      if (rest.length >= 2 && /[A-Za-z]{3,}/.test(rest[rest.length - 1]) && !/[\u4e00-\u9fa5]/.test(rest[rest.length - 1])) { ex = rest.pop(); }
      cn = rest.join(' ');
      if (!cn) return;
      list.push({ w, ph, cn, ex });
    });
    if (!list.length) { toast(tr('没有识别到单词，请检查格式','No words found. Check the format.')); return; }
    const n = Store.addMany(list, u);
    toast(tr('导入到 Unit ' + u + '：新增 ' + n + '（重复 ' + (list.length - n) + '）','Added to Unit ' + u + ': ' + n + ' new, ' + (list.length - n) + ' duplicates'));
    this.renderSide(); this.render();
  },

  /* ================= 单词库导入（Excel / 图片 / 文本） ================= */
  setImpTab(t) { this.impTab = t; this.render(); },

  impPanelHtml() {
    if (this.impTab === 'excel') {
      const list = this._impRows ? this.parseExcelToWords(this._impRows, Store.unit) : [];
      const prev = list.length ? this._impPrevHtml(list)
        : `<div class="muted">${tr('选择一个 .xlsx / .xls / .csv，自动识别「Unit / 单词 / 词性 / 中文释义」列；没有 Unit 列时，全部导入到下方所选单元。','Choose an .xlsx, .xls, or .csv file. Columns are detected automatically; rows without a Unit go to the unit selected below.')}</div>`;
      return `<div class="field"><label>${tr('选择 Excel / CSV 文件','Choose an Excel / CSV file')}</label>
        <input type="file" id="impFile" accept=".xlsx,.xls,.csv" onchange="UI.onExcelFile(this)"></div>
        <div id="impPreview">${prev}</div>
        <div class="field"><label>${tr('表格没有 Unit 列时，全部导入到','If there is no Unit column, add everything to')}</label>
          <select id="impExcelUnit">${Store.unitList().map(u => `<option value="${u.u}" ${u.u === Store.unit ? 'selected' : ''}>${esc(u.name)} · ${u.total} ${tr('词','words')}</option>`).join('')}</select></div>`;
    }
    if (this.impTab === 'image') {
      return `<div class="field"><label>${tr('上传单词表照片（自动 OCR 识别）','Upload a word-list image (OCR)')}</label>
          <input type="file" id="impImg" accept="image/*" onchange="UI.onImageFile(this)"></div>
        <div id="impOcrStatus" class="muted mb8">${tr('支持课本截图 / 照片。识别后可在下方修改，再解析导入。首次识别需联网下载模型。','Use a textbook screenshot or photo. You can edit the detected text before importing.')}</div>
        <div class="field"><label>${tr('识别文字（可手动修改）','Detected text (editable)')}</label>
          <textarea id="impOcrText" placeholder="city n. 城市&#10;tourist n. 旅行者">${esc(this._ocrText || '')}</textarea></div>
        <div class="field"><label>${tr('默认导入单元（照片中含「Unit X」行会自动分组）','Default unit')}</label>
          <select id="impImgUnit">${Store.unitList().map(u => `<option value="${u.u}" ${u.u === Store.unit ? 'selected' : ''}>${esc(u.name)} · ${u.total} ${tr('词','words')}</option>`).join('')}</select></div>
        <button class="btn lg block" onclick="UI.importOcrText()">${tr('解析并导入','Read and Import')}</button>`;
    }
    // 手动粘贴
    return `<div class="field"><label>${tr('导入到单元','Add to unit')}</label>
        <select id="impUnit">${Store.unitList().map(u => `<option value="${u.u}" ${u.u === Store.unit ? 'selected' : ''}>${esc(u.name)} · ${u.total} ${tr('词','words')}${u.total === 0 ? tr('（空）',' (empty)') : ''}</option>`).join('')}</select></div>
      <div class="field"><label>${tr('单词列表（每行一个，格式：英文 音标 中文 例句）','Word list (one per line: English, IPA, Chinese meaning, example)')}</label>
        <textarea id="impList" placeholder="apple /ˈæpl/ 苹果 I like apples.&#10;banana /bəˈnɑːnə/ 香蕉 Monkeys like bananas.">${esc(this._impText || '')}</textarea></div>
      <button class="btn lg block" onclick="UI.importWords()">${tr('导入到选中单元','Add to Selected Unit')}</button>`;
  },

  _impPrevHtml(list) {
    const byUnit = {}; list.forEach(o => byUnit[o.u] = (byUnit[o.u] || 0) + 1);
    const keys = Object.keys(byUnit).sort((a, b) => a - b);
    return `<div class="muted mb8">${tr(`识别到 ${list.length} 个单词，分布：`,`Found ${list.length} words: `)}${keys.map(k => 'Unit ' + k + ': ' + byUnit[k]).join(', ')}</div>
      <div class="imp-prev">${list.slice(0, 40).map(o => `<span class="imp-chip">${esc(o.w)} <i>${esc(o.pos || '')}</i> ${esc(o.cn)}</span>`).join('')}${list.length > 40 ? ' …' : ''}</div>
      <div class="row mt12" style="gap:10px">
        <button class="btn gray" onclick="UI.clearImp()">${tr('重新选择','Choose Again')}</button>
        <button class="btn lg" style="flex:1" onclick="UI.doImportExcel()">${tr(`导入 ${list.length} 个单词`,`Import ${list.length} Words`)}</button>
      </div>`;
  },
  clearImp() { this._impRows = null; this.render(); },

  onExcelFile(input) {
    const f = input.files && input.files[0];
    if (!f) return;
    if (typeof XLSX === 'undefined') { toast(tr('Excel 解析库未加载，请检查网络后重试','Excel reader did not load. Check your connection and try again.')); return; }
    const reader = new FileReader();
    reader.onload = e => {
      try {
        const wb = XLSX.read(e.target.result, { type: 'array' });
        const ws = wb.Sheets[wb.SheetNames[0]];
        const rows = XLSX.utils.sheet_to_json(ws, { header: 1, defval: '' });
        this._impRows = rows;
        this.render();
        const list = this.parseExcelToWords(rows, Store.unit);
        toast(list.length ? tr('识别到 ' + list.length + ' 个单词','Found ' + list.length + ' words') : tr('没有识别到单词，请检查表格格式','No words found. Check the spreadsheet format.'));
      } catch (err) { toast(tr('读取失败：','Could not read file: ') + err.message); }
    };
    reader.readAsArrayBuffer(f);
  },
  doImportExcel() {
    if (!this._impRows) { toast(tr('请先选择文件','Choose a file first')); return; }
    const u = +($('#impExcelUnit') ? $('#impExcelUnit').value : Store.unit);
    const list = this.parseExcelToWords(this._impRows, u);
    if (!list.length) { toast(tr('没有识别到单词','No words found')); return; }
    const r = Store.importParsed(list);
    toast(tr('导入完成：新增 ' + r.added + '，更新 ' + r.updated,'Import complete: ' + r.added + ' added, ' + r.updated + ' updated'));
    this._impRows = null; this.renderSide(); this.render();
  },

  // 解析 Excel 二维数组 → [{u,w,pos,cn,ph,ex}]
  parseExcelToWords(rows, defaultUnit) {
    const nameMap = h => {
      const s = String(h || '').trim().toLowerCase();
      if (s === 'unit' || s === '单元') return 'unit';                       // 课次列
      if (/单元序号|序号|编号|index|no\.?$|^no$/.test(s)) return 'seq';     // 单元内序号，忽略
      if (/单词|短语|word|vocab/.test(s)) return 'word';
      if (/词性|pos|part of speech/.test(s)) return 'pos';
      if (/音标|phon|ipa/.test(s)) return 'ph';
      if (/中文|释义|意思|meaning|翻译/.test(s)) return 'cn';
      if (/例句|example|sent/.test(s)) return 'ex';
      return null;
    };
    let hi = -1, header = null;
    for (let i = 0; i < rows.length; i++) {
      const mapped = rows[i].map(nameMap).filter(Boolean);
      if (mapped.length >= 2 && mapped.includes('word') && (mapped.includes('cn') || mapped.includes('unit'))) { hi = i; header = rows[i].map(nameMap); break; }
    }
    const list = [];
    const start = hi < 0 ? 0 : hi + 1;
    for (let i = start; i < rows.length; i++) {
      const r = rows[i]; if (!r || !r.length) continue;
      const obj = { u: defaultUnit || this.unit, w: '', pos: '', cn: '', ph: '', ex: '' };
      if (hi >= 0) header.forEach((k, ci) => { if (k && r[ci] != null) obj[k === 'word' ? 'w' : k] = String(r[ci]).trim(); });
      else { obj.w = String(r[0] || '').trim(); obj.pos = String(r[1] || '').trim(); obj.cn = String(r[2] || '').trim(); }
      if (obj.unit) { const m = String(obj.unit).match(/(\d+)/); if (m) obj.u = +m[1]; }
      obj.w = (obj.w || '').replace(/^\d+[.、)]\s*/, '').trim();
      if (!obj.w || !/^[A-Za-z][A-Za-z\-' ]*$/.test(obj.w)) continue;
      if (!obj.cn) continue;
      list.push({ u: obj.u, w: obj.w, pos: obj.pos || '', cn: obj.cn, ph: obj.ph || '', ex: obj.ex || '' });
    }
    return list;
  },

  // 图片 OCR → 解析为单词
  _loadTesseract(cb) {
    if (window.Tesseract) return cb();
    const s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/npm/tesseract.js@4/dist/tesseract.min.js';
    s.onload = cb;
    s.onerror = () => toast(tr('识别库加载失败，请检查网络','OCR could not load. Check your connection.'));
    document.head.appendChild(s);
  },
  onImageFile(input) {
    const f = input.files && input.files[0];
    if (!f) return;
    this._loadTesseract(() => {
      const st = $('#impOcrStatus');
      if (st) st.textContent = tr('识别中…请稍候（首次需下载识别模型）','Reading image… please wait');
      Tesseract.recognize(f, 'eng+chi_sim', {
        logger: m => { if (st && m.status === 'recognizing text') st.textContent = tr('识别中 ','Reading image ') + Math.round(m.progress * 100) + '%'; }
      }).then(({ data }) => {
        this._ocrText = data.text;
        const t = $('#impOcrText'); if (t) t.value = data.text;
        if (st) st.textContent = tr('识别完成，可手动修改后点「解析并导入」。','Image read. Edit the text if needed, then import.');
      }).catch(err => { if (st) st.textContent = tr('识别失败：','Could not read image: ') + err.message + tr('（可手动粘贴文字）',' (you can paste text instead)'); });
    });
  },
  importOcrText() {
    const txt = $('#impOcrText').value;
    const u = +($('#impImgUnit') ? $('#impImgUnit').value : Store.unit);
    if (!txt.trim()) { toast(tr('请先识别或粘贴文字','Read an image or paste text first')); return; }
    const list = this.parseTextToWords(txt, u);
    if (!list.length) { toast(tr('没有识别到单词，请检查格式（每行：英文 词性 中文）','No words found. Use one word, part of speech, and Chinese meaning per line.')); return; }
    const r = Store.importParsed(list);
    toast(tr('导入完成：新增 ' + r.added + '，更新 ' + r.updated,'Import complete: ' + r.added + ' added, ' + r.updated + ' updated'));
    this._ocrText = ''; this.renderSide(); this.render();
  },
  parseTextToWords(text, defaultUnit) {
    const list = []; let u = defaultUnit || this.unit;
    text.split(/\n+/).forEach(line => {
      line = line.trim(); if (!line) return;
      const h = line.match(/^unit\s*(\d+)/i);
      if (h) { u = +h[1]; return; }
      const o = this.parseWordLine(line);
      if (o) list.push(Object.assign({ u }, o));
    });
    return list;
  },
  // 单行解析：英文（可含短语） + 可选词性 + 中文释义
  parseWordLine(line) {
    line = line.replace(/^\d+[.、)]\s*/, '').trim(); if (!line) return null;
    const posRe = /^(n\.|v\.|adj\.|adv\.|prep\.|conj\.|pron\.|int\.|phrase|abbr\.|num\.|art\.)$/i;
    const toks = line.split(/\s+/).filter(Boolean); if (!toks.length) return null;
    const wp = []; let i = 0;
    while (i < toks.length) {
      const tk = toks[i];
      if (posRe.test(tk)) break;
      if (/[一-鿿]/.test(tk)) break;
      if (/^[A-Za-z][A-Za-z\-']*$/.test(tk)) { wp.push(tk); i++; } else break;
    }
    if (!wp.length) return null;
    const word = wp.join(' ');
    let pos = '', cn = '';
    if (i < toks.length && posRe.test(toks[i])) { pos = toks[i]; i++; }
    cn = toks.slice(i).join(' ').replace(/\s+/g, ' ').trim();
    if (!cn) return null;
    return { w: word, pos, cn };
  },

  resetUnit() {
    if (!confirm(tr('重置当前单元的学习进度？单词不会被删除。','Reset progress for this unit? The words will stay.'))) return;
    Store.resetUnit(Store.unit); toast(tr('已重置','Unit reset')); this.renderSide(); this.render();
  },
  resetAll() {
    if (!confirm(tr('重置全部学习进度？所有单元的掌握状态都会清空。','Reset all learning progress? Mastery for every unit will be cleared.'))) return;
    Store.resetAll(); toast(tr('已全部重置','All progress reset')); this.renderSide(); this.render();
  },

  exportSheet() {
    const txt = Store.exportJSON();
    this.sheet(tr('导出备份','Export Backup'), `<div class="muted mb12">${tr('复制下面内容保存到备忘录或微信收藏。','Copy this text or download it as a backup file.')}</div>
      <div class="field"><textarea id="exp" readonly>${esc(txt)}</textarea></div>
      <div class="row" style="gap:10px">
        <button class="btn gray" style="flex:1" onclick="UI.copy()">${tr('复制','Copy')}</button>
        <button class="btn" style="flex:1" onclick="UI.download()">${tr('下载','Download')}</button>
      </div>`);
  },
  copy() { const t = $('#exp'); t.removeAttribute('readonly'); t.select(); t.setSelectionRange(0, 999999); try { document.execCommand('copy'); toast(tr('已复制','Copied')); } catch (e) { toast(tr('请手动选择','Please select and copy manually')); } t.setAttribute('readonly', ''); },
  download() { const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([Store.exportJSON()], { type: 'application/json' })); a.download = 'WordMasterHarvey_' + dayStr() + '.json'; a.click(); toast(tr('已下载','Downloaded')); },
  importDataSheet() {
    this.sheet(tr('导入备份','Import Backup'), `<div class="muted mb12">${tr('粘贴之前导出的 JSON 内容，会按单词去合并。','Paste a previously exported JSON backup. Words will be merged safely.')}</div>
      <div class="field"><textarea id="impJson" placeholder='{"v":2,"words":[…]}'></textarea></div>
      <div class="row" style="gap:10px">
        <button class="btn gray" style="flex:1" onclick="UI.closeSheet()">${tr('取消','Cancel')}</button>
        <button class="btn" style="flex:1" onclick="UI.doImportData()">${tr('导入','Import')}</button>
      </div>`);
  },
  doImportData() {
    try {
      const n = Store.importJSON($('#impJson').value);
      toast(tr('成功导入 ' + n + ' 个新词','Imported ' + n + ' new words'));
      this.closeSheet(); this.renderSide(); this.render();
    } catch (e) { toast(tr('导入失败：','Import failed: ') + e.message); }
  },

  /* ================= 弹层 ================= */
  sheet(title, body) {
    const m = $('#modal'); m.innerHTML = `<div class="mask" onclick="if(event.target===this)UI.closeSheet()"><div class="sheet"><h3>${esc(title)}</h3>${body}</div></div>`;
    m.classList.add('show');
  },
  closeSheet() { $('#modal').classList.remove('show'); $('#modal').innerHTML = ''; },

  goMode(m) {
    this.mode = m; this.toggleModes(); this.render();
  }
};

/* ================= 手写 SVG 图表 ================= */
const Charts = {
  // 各单元掌握进度（横向条）
  unitBars() {
    const units = Store.unitList().filter(u => u.total > 0);
    if (!units.length) return `<div class="muted center">${tr('还没有单词','No words yet')}</div>`;
    const W = 600, H = 28 * units.length + 20, pad = 8;
    const max = Math.max(1, ...units.map(u => u.total));
    const rows = units.map((u, i) => {
      const y = 14 + i * 28;
      const w = (u.mastered / max) * (W - 200);
      const wL = (u.learning / max) * (W - 200);
      const color = u.checked ? '#22c55e' : '#2f7cf6';
      return `
        <text x="6" y="${y + 4}" font-size="11" fill="#7d879c" style="font-weight:700">${esc(u.name)}</text>
        <rect x="60" y="${y - 10}" width="${W - 200}" height="14" rx="7" fill="#eef2f7"/>
        <rect x="${60 + w}" y="${y - 10}" width="${Math.max(0, wL)}" height="14" rx="7" fill="#ffb020" opacity=".55"/>
        <rect x="60" y="${y - 10}" width="${Math.max(0, w)}" height="14" rx="7" fill="${color}"/>
        <text x="${W - 130}" y="${y + 4}" font-size="11" fill="#1a2236" style="font-weight:800">${u.mastered}/${u.total}</text>
        <text x="${W - 70}" y="${y + 4}" font-size="11" fill="${color}" style="font-weight:800">${u.pct}%</text>`;
    }).join('');
    return `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto">${rows}<text x="6" y="${H - 2}" font-size="10" fill="#aab2c2">${tr('橙色=学习中，蓝色/绿色=已掌握','Orange = learning, blue/green = mastered')}</text></svg>`;
  },
  // 近 14 天学词量
  dailyBars() {
    const st = Store.state.stats;
    const days = st.days.slice(-14);
    const days14 = [];
    for (let i = 13; i >= 0; i--) days14.push(addDays(dayStr(), -i));
    const map = Object.fromEntries(days.map(d => [d.d, d]));
    const max = Math.max(1, ...days14.map(d => (map[d] && map[d].learned) || 0));
    const W = 600, H = 160, pad = 20, barW = (W - 2 * pad) / 14 - 6;
    const bars = days14.map((d, i) => {
      const v = (map[d] && map[d].learned) || 0;
      const h = (v / max) * (H - 40);
      const x = pad + i * ((W - 2 * pad) / 14);
      const y = H - 24 - h;
      return `<rect x="${x}" y="${y}" width="${barW}" height="${h}" rx="3" fill="${v ? '#2f7cf6' : '#e8edf5'}"/><text x="${x + barW / 2}" y="${H - 8}" font-size="9" fill="#7d879c" text-anchor="middle">${d.slice(5)}</text>`;
    }).join('');
    return `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto">${bars}</svg>`;
  },
  // 累计掌握趋势
  trend() {
    const st = Store.state.stats;
    if (st.days.length < 2) return `<div class="muted center">${tr('再多学几天就能看到曲线啦','Keep learning to see your progress line')}</div>`;
    const total = Store.totalCount();
    const max = Math.max(1, total);
    const W = 600, H = 160, pad = 20;
    const step = (W - 2 * pad) / Math.max(1, st.days.length - 1);
    const pts = st.days.map((d, i) => [pad + i * step, H - 24 - (d.m / max) * (H - 40)]);
    const path = pts.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' ');
    const area = path + ` L${pts[pts.length - 1][0].toFixed(1)},${H - 24} L${pts[0][0].toFixed(1)},${H - 24} Z`;
    return `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto">
      <path d="${area}" fill="rgba(47,124,246,.15)"/>
      <path d="${path}" fill="none" stroke="#2f7cf6" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
      ${pts.map(p => `<circle cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="3" fill="#2f7cf6"/>`).join('')}
      <text x="${W - 6}" y="${H - 30}" font-size="10" fill="#7d879c" text-anchor="end">${tr(`当前 ${st.days[st.days.length - 1].m} 词`,`${st.days[st.days.length - 1].m} words now`)}</text>
    </svg>`;
  },
  // 正确率环形
  accuracyRing() {
    const r = Store.state.stats.right, w = Store.state.stats.wrong;
    const total = r + w;
    if (!total) return `<div class="muted center">${tr('做完练习后这里会出现数据','Play a game to see your results')}</div>`;
    const acc = r / total;
    const C = 2 * Math.PI * 60, off = C * (1 - acc);
    return `<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:280px;height:auto;display:block;margin:0 auto">
      <circle cx="100" cy="80" r="60" stroke="#e8edf5" stroke-width="16" fill="none"/>
      <circle cx="100" cy="80" r="60" stroke="#22c55e" stroke-width="16" fill="none" stroke-linecap="round"
        stroke-dasharray="${C.toFixed(1)}" stroke-dashoffset="${off.toFixed(1)}" transform="rotate(-90 100 80)"/>
      <text x="100" y="76" text-anchor="middle" font-size="28" font-weight="900" fill="#1a2236">${Math.round(acc * 100)}%</text>
      <text x="100" y="98" text-anchor="middle" font-size="11" fill="#7d879c">${tr('正确率','Accuracy')}</text>
      <text x="40" y="148" font-size="11" fill="#22c55e" font-weight="700">${tr('对','Right')} ${r}</text>
      <text x="160" y="148" font-size="11" fill="#ef4444" font-weight="700" text-anchor="end">${tr('错','Wrong')} ${w}</text>
    </svg>`;
  },
  // 按自然月展示真实日期；有学习或答题记录即视为当天打卡。
  calendar() {
    const st = Store.state.stats;
    const now = new Date();
    const view = new Date(now.getFullYear(), now.getMonth() + UI.calendarOffset, 1);
    const year = view.getFullYear(), month = view.getMonth();
    const firstWeekday = view.getDay();
    const count = new Date(year, month + 1, 0).getDate();
    const today = dayStr(now), started = st.started || today;
    const records = Object.fromEntries(st.days.map(d => [d.d, d]));
    const weekdays = isEnglishUI() ? ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'] : ['日','一','二','三','四','五','六'];
    const monthLabel = new Intl.DateTimeFormat(isEnglishUI() ? 'en-US' : 'zh-CN', { year:'numeric', month:'long' }).format(view);
    const cells = Array.from({ length:firstWeekday }, () => '<div class="calendar-day outside" aria-hidden="true"></div>');
    for (let n = 1; n <= count; n++) {
      const date = dayStr(new Date(year, month, n));
      const rec = records[date];
      const active = !!(rec && ((rec.learned || 0) + (rec.right || 0) + (rec.wrong || 0) > 0));
      const future = date > today;
      const missed = !active && !future && date >= started;
      const classes = ['calendar-day', active ? 'checked' : missed ? 'missed' : future ? 'future' : 'before-start', date === today ? 'today' : ''].filter(Boolean).join(' ');
      const mark = active ? '<span class="calendar-mark" aria-hidden="true">✓</span>' : missed ? '<span class="calendar-mark" aria-hidden="true">–</span>' : '';
      const label = active ? tr('已打卡','checked in') : missed ? tr('未打卡','not checked in') : future ? tr('未来日期','future date') : tr('尚未开始','before tracking started');
      cells.push(`<div class="${classes}" title="${date} · ${label}" aria-label="${date} · ${label}"><span class="calendar-number">${n}</span>${mark}</div>`);
    }
    return `<div class="calendar-head"><div><h3>${tr('学习日历','Learning Calendar')}</h3><p>${tr('每天完成学词或练习，就会自动打卡。','Learn words or finish practice to check in for the day.')}</p></div>
      <div class="calendar-nav"><button onclick="UI.changeCalendarMonth(-1)" aria-label="${tr('上个月','Previous month')}">‹</button><strong>${esc(monthLabel)}</strong><button onclick="UI.changeCalendarMonth(1)" ${UI.calendarOffset >= 0 ? 'disabled' : ''} aria-label="${tr('下个月','Next month')}">›</button></div></div>
      <div class="calendar-grid">${weekdays.map(w => `<div class="calendar-weekday">${w}</div>`).join('')}${cells.join('')}</div>
      <div class="calendar-legend"><span><i class="checked">✓</i>${tr('已学习','Checked in')}</span><span><i class="missed">–</i>${tr('未学习','No learning')}</span><span><i class="today"></i>${tr('今天','Today')}</span></div>`;
  }
};

UI.init();
