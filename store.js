/* ============ 工具 ============ */
const $ = (s, r) => (r || document).querySelector(s);
const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
const uid = () => 'w' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c =>
  ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1));[a[i], a[j]] = [a[j], a[i]]; } return a; };
const pick = a => a[Math.floor(Math.random() * a.length)];
const dayStr = d => { d = d || new Date(); const p = n => (n < 10 ? '0' : '') + n; return d.getFullYear() + '-' + p(d.getMonth() + 1) + '-' + p(d.getDate()); };
const addDays = (s, n) => { const d = new Date(s + 'T00:00:00'); d.setDate(d.getDate() + n); return dayStr(d); };
const diffDays = (a, b) => Math.round((new Date(b + 'T00:00:00') - new Date(a + 'T00:00:00')) / 86400000);

function speak(text, opts) {
  try {
    if (!window.speechSynthesis) return;
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = (Store.state.settings.accent === 'uk') ? 'en-GB' : 'en-US';
    u.rate = Number(Store.state.settings.rate) || 0.9;
    speechSynthesis.speak(u);
  } catch (e) { }
}
function toast(msg) {
  const t = document.createElement('div'); t.className = 'toast'; t.textContent = msg;
  document.body.appendChild(t); setTimeout(() => t.remove(), 1800);
}

/* ============ 存储层 ============ */
const INTERVALS = [1, 2, 4, 7, 15, 30];   // 复习间隔（天）
const MASTER_LEVEL = 5;                    // 累计答对 5 次 → 已掌握
const PASS_RATE = 70;                      // 单元通关正确率（%）
const UNIT_REWARD_COINS = 20;              // 每个单元首次通关奖励
const WEEKLY_TARGET_DAYS = 5;              // 每周打卡目标
const WEEKLY_REWARD_COINS = 100;           // 每周目标奖励
const KEY = 'wordmaster.harvey.v1';

const Store = {
  state: null,
  unit: 1,          // 当前选中的单元

  /* ---------- 载入 / 初始化 ---------- */
  freshUnit() { return { learned: [], quizDone: 0, best: 0, plays: 0, checked: false, checkedAt: '' }; },
  mk(b, u) {
    return this.enrichWord({
      id: uid(), w: b.w, ph: b.ph || '', cn: b.cn || '', pos: b.pos || '', ex: b.ex || '', ec: b.ec || '',
      parts: b.parts || [], story: b.story || '', storyEn: b.storyEn || '', fam: b.fam || [],
      u: u, src: 'builtin',
      status: 'new', level: 0, next: '', right: 0, wrong: 0, added: dayStr()
    });
  },
  // 按词形补充教学资料，兼容内置词、旧备份及任意单元导入的已知词。
  // 只补空白或与词库一致的内容；不覆盖用户自己的拆分和讲解。
  enrichWord(w) {
    const builtinUnit = UNITS.find(unit => unit.u === w.u);
    const builtin = builtinUnit && builtinUnit.words.find(item => item.w.toLowerCase() === String(w.w || '').trim().toLowerCase());
    if (builtin && !w.ph) w.ph = builtin.ph || '';
    if (builtin && !w.ex) w.ex = builtin.ex || '';
    const entry = WORD_FORMATION[String(w.w || '').trim().toLowerCase()];
    if (!entry) return w;
    const sameParts = JSON.stringify(w.parts || []) === JSON.stringify(entry.parts);
    if (!w.story && (!(w.parts || []).length || sameParts)) {
      w.parts = entry.parts.map(p => ({ ...p }));
      w.story = entry.story;
      if (!(w.fam || []).length) w.fam = entry.fam.map(f => ({ ...f }));
    }
    if (w.story === entry.story && JSON.stringify(w.parts || []) === JSON.stringify(entry.parts)) {
      w.formationKind = entry.formationKind;
      w.formationSources = entry.formationSources.slice();
    } else {
      // 修改过的内容不能沿用内置资料的分类、参考来源。
      delete w.formationKind;
      delete w.formationSources;
    }
    return w;
  },
  fresh() {
    const us = {}; UNITS.forEach(u => us[u.u] = this.freshUnit());
    return {
      words: UNITS.flatMap(u => u.words.map(b => this.mk(b, u.u))),
      unitState: us,
      unitMeta: {},
      stats: { right: 0, wrong: 0, days: [], started: dayStr() },
      rewards: { coins: 0, claimedUnits: [], claimedWeeks: [] },
      settings: { accent: 'us', rate: 0.9, autoSpeak: 1, name: 'Harvey', language: 'en', languageChoiceVersion: 1 }
    };
  },
  load() {
    let s = null;
    try { s = JSON.parse(localStorage.getItem(KEY) || 'null'); } catch (e) { }
    if (!s || !Array.isArray(s.words)) s = this.fresh();
    const hasCurrentLanguageChoice = !!(s.settings && s.settings.languageChoiceVersion === 1);
    s.settings = Object.assign({ accent: 'us', rate: 0.9, autoSpeak: 1, name: 'Harvey', language: 'en', languageChoiceVersion: 1 }, s.settings || {});
    // 旧版本曾自动写入中文；升级时统一切到新的英文默认值。之后尊重用户手动选择。
    if (!hasCurrentLanguageChoice) s.settings.language = 'en';
    s.settings.language = s.settings.language === 'en' ? 'en' : 'zh';
    s.stats = Object.assign({ right: 0, wrong: 0, days: [], started: dayStr() }, s.stats || {});
    if (!s.stats.started) s.stats.started = dayStr();
    s.unitState = (s.unitState && typeof s.unitState === 'object' && !Array.isArray(s.unitState)) ? s.unitState : {};
    s.unitMeta = s.unitMeta || {};
    // 兼容上线前的数据，以及早期预览中可能留下的不完整 rewards 字段。
    // 已通关单元视为已领取奖励，既补发金币，也避免重置后重复领取。
    const completed = Object.keys(s.unitState)
      .filter(u => s.unitState[u] && s.unitState[u].checked)
      .map(Number).filter(Number.isFinite);
    const oldRewards = (s.rewards && typeof s.rewards === 'object' && !Array.isArray(s.rewards)) ? s.rewards : {};
    const oldClaims = Array.isArray(oldRewards.claimedUnits) ? oldRewards.claimedUnits : [];
    const claimedUnits = [...new Set(oldClaims.map(Number).filter(Number.isFinite).concat(completed))];
    const claimedWeeks = [...new Set((Array.isArray(oldRewards.claimedWeeks) ? oldRewards.claimedWeeks : [])
      .filter(w => /^\d{4}-\d{2}-\d{2}$/.test(String(w))))];
    s.rewards = {
      coins: Math.max(0, Number(oldRewards.coins) || 0, claimedUnits.length * UNIT_REWARD_COINS + claimedWeeks.length * WEEKLY_REWARD_COINS),
      claimedUnits,
      claimedWeeks,
      pendingWeekly: claimedWeeks.includes(oldRewards.pendingWeekly) ? oldRewards.pendingWeekly : ''
    };
    Object.keys(s.unitState).forEach(u => {
      const st = s.unitState[u];
      if (!st || typeof st !== 'object' || Array.isArray(st)) s.unitState[u] = this.freshUnit();
      else st.learned = Array.isArray(st.learned) ? st.learned : [];
    });
    s.stats.days = Array.isArray(s.stats.days) ? s.stats.days : [];
    this.state = s;
    // 内置词库新增时自动补充；已删除的不复活
    s.deletedBuiltin = s.deletedBuiltin || [];
    const exist = new Set(s.words.map(w => w.u + '::' + w.w.toLowerCase()));
    UNITS.forEach(u => {
      u.words.forEach(b => {
        const key = u.u + '::' + b.w.toLowerCase();
        if (!exist.has(key) && !s.deletedBuiltin.includes(key)) { s.words.push(this.mk(b, u.u)); exist.add(u.u + '::' + b.w.toLowerCase()); }
      });
      if (!s.unitState[u.u]) s.unitState[u.u] = this.freshUnit();
    });
    s.words.forEach(w => this.enrichWord(w));
    // 兼容动态扩展的单元（Excel / 图片导入的第 11+ 单元）
    const refs = Object.keys(s.unitMeta).map(Number).concat(s.words.map(w => w.u || 0));
    const maxRef = refs.length ? Math.max(...refs) : 0;
    for (let u = UNITS.length + 1; u <= maxRef; u++) this.ensureUnit(u);
    // 升级时若本周已经达到 5 天，立即补发本周奖励。
    this.checkWeeklyReward(dayStr());
    this.save();
    return s;
  },
  save() { try { localStorage.setItem(KEY, JSON.stringify(this.state)); } catch (e) { toast(this.state && this.state.settings.language === 'en' ? 'Could not save: browser storage is full' : '保存失败：存储空间不足'); } },

  /* ---------- 查询 ---------- */
  byId(id) { return this.state.words.find(w => w.id === id); },
  unitWords(u) { return this.state.words.filter(w => w.u === u); },
  unitDef(u) {
    const b = UNITS.find(x => x.u === u);
    if (b) return Object.assign({}, b, (this.state.unitMeta || {})[u] || {});
    const m = (this.state.unitMeta || {})[u];
    return { u, name: (m && m.name) || ('Unit ' + u), title: (m && m.title) || '课本单词', desc: (m && m.desc) || '', words: [] };
  },
  get news() { return this.state.words.filter(w => w.status === 'new'); },
  get learning() { return this.state.words.filter(w => w.status === 'learning'); },
  get mastered() { return this.state.words.filter(w => w.status === 'mastered'); },
  masteredCount() { return this.state.words.filter(w => w.status === 'mastered').length; },
  totalCount() { return this.state.words.length; },

  /* ---------- 单元状态 ---------- */
  unitState(u) { return this.state.unitState[u] || (this.state.unitState[u] = this.freshUnit()); },
  isUnlocked() { return true; },  // 所有单元默认可自由打开，不再依赖前一单元是否通关
  unitInfo(u) {
    const def = this.unitDef(u), st = this.unitState(u);
    const ws = this.unitWords(u);
    const total = ws.length;
    const mastered = ws.filter(w => w.status === 'mastered').length;
    const learning = ws.filter(w => w.status === 'learning').length;
    const learned = st.learned.filter(id => ws.some(w => w.id === id)).length;
    return {
      u, name: def.name, title: def.title, desc: def.desc,
      total, learned, mastered, learning,
      newCount: total - learned,
      learnPct: total ? Math.round(learned / total * 100) : 0,
      pct: total ? Math.round(mastered / total * 100) : 0,
      unlocked: this.isUnlocked(u), checked: !!st.checked, quizDone: st.quizDone, best: st.best || 0,
      rewarded: this.state.rewards.claimedUnits.includes(u)
    };
  },
  unitList() {
    const set = new Set(UNITS.map(u => u.u));
    const um = this.state.unitMeta || {};
    Object.keys(um).forEach(u => set.add(+u));
    this.state.words.forEach(w => set.add(w.u));
    return [...set].sort((a, b) => a - b).map(u => this.unitInfo(u));
  },
  currentUnit() {
    // 所有单元都可自由打开，直接返回当前选中的单元（默认 Unit 1）
    return (this.unit && this.unit >= 1) ? this.unit : 1;
  },
  // 本单元还没学过的词
  todoLearn(u) { return this.unitWords(u).filter(w => w.status === 'new'); },
  // 本单元已学但还没掌握的词（可重练）
  todoSolid(u) { return this.unitWords(u).filter(w => w.status === 'learning'); },

  /* ---------- 复习（跨单元） ---------- */
  reviewDue(limitUnit) {
    const t = dayStr();
    return this.state.words
      .filter(w => w.status !== 'new' && w.next && w.next <= t)
      .filter(w => !limitUnit || w.u <= limitUnit)
      .sort((a, b) => (a.next < b.next ? -1 : 1));
  },
  reviewByUnit(u) { return this.unitWords(u).filter(w => w.status !== 'new'); },

  /* ---------- 学习 / 答题 ---------- */
  markLearned(id) {
    const w = this.byId(id); if (!w) return;
    const st = this.unitState(w.u);
    if (st.learned.indexOf(id) < 0) {
      st.learned.push(id);
      if (w.status === 'new') { w.status = 'learning'; w.level = 0; w.next = dayStr(); }
      this.touchDay(1, 0, 0);
    }
    this.save();
  },
  answer(id, ok) {
    const w = this.byId(id); if (!w) return;
    if (ok) {
      w.right++; this.state.stats.right++;
      w.level = Math.min(w.level + 1, MASTER_LEVEL);
      if (w.level >= MASTER_LEVEL) { w.status = 'mastered'; w.next = addDays(dayStr(), 30); }
      else { w.status = 'learning'; w.next = addDays(dayStr(), INTERVALS[w.level - 1] || 1); }
      this.touchDay(0, 1, 0);
    } else {
      w.wrong++; this.state.stats.wrong++;
      w.level = 0; w.status = 'learning'; w.next = dayStr();
      this.touchDay(0, 0, 1);
    }
    this.save();
  },
  // 完成一局单元练习
  finishUnitQuiz(u, rate) {
    const st = this.unitState(u), info = this.unitInfo(u);
    st.plays = (st.plays || 0) + 1; st.quizDone = (st.quizDone || 0) + 1;
    st.best = Math.max(st.best || 0, rate);
    const allLearned = info.total === 0 || this.unitWords(u).every(w => w.status !== 'new');
    const firstTime = allLearned && rate >= PASS_RATE && !st.checked;
    if (firstTime) { st.checked = true; st.checkedAt = dayStr(); }
    let earnedCoins = 0;
    if (firstTime && !this.state.rewards.claimedUnits.includes(u)) {
      this.state.rewards.claimedUnits.push(u);
      this.state.rewards.coins += UNIT_REWARD_COINS;
      earnedCoins = UNIT_REWARD_COINS;
    }
    this.touchDay(0, 0, 0);
    this.save();
    const nextU = UNITS.find(x => x.u === u + 1);
    return {
      passed: allLearned && rate >= PASS_RATE,
      firstTime, rate, allLearned, earnedCoins, coins: this.state.rewards.coins,
      nextUnit: (firstTime && nextU) ? u + 1 : null
    };
  },
  // 手动把单元标记为已通关（家长用）
  forceCheck(u) {
    const st = this.unitState(u); st.checked = true; st.checkedAt = dayStr(); this.save();
  },

  /* ---------- 每日快照（供图表） ---------- */
  weekKey(date) {
    const d = new Date((date || dayStr()) + 'T00:00:00');
    const mondayOffset = (d.getDay() + 6) % 7;
    d.setDate(d.getDate() - mondayOffset);
    return dayStr(d);
  },
  weekInfo(date) {
    const key = this.weekKey(date);
    const activeDays = new Set(this.state.stats.days.filter(d => this.weekKey(d.d) === key && ((d.learned || 0) + (d.right || 0) + (d.wrong || 0) > 0)).map(d => d.d)).size;
    return { key, activeDays, target: WEEKLY_TARGET_DAYS, rewarded: this.state.rewards.claimedWeeks.includes(key) };
  },
  checkWeeklyReward(date) {
    const info = this.weekInfo(date);
    if (info.activeDays < WEEKLY_TARGET_DAYS || info.rewarded) return 0;
    this.state.rewards.claimedWeeks.push(info.key);
    this.state.rewards.coins += WEEKLY_REWARD_COINS;
    this.state.rewards.pendingWeekly = info.key;
    return WEEKLY_REWARD_COINS;
  },
  takeWeeklyRewardNotice() {
    const week = this.state.rewards.pendingWeekly;
    if (!week) return null;
    this.state.rewards.pendingWeekly = '';
    this.save();
    return { week, coins: WEEKLY_REWARD_COINS, total: this.state.rewards.coins };
  },
  touchDay(learned, right, wrong) {
    const st = this.state.stats, t = dayStr();
    let d = st.days.find(x => x.d === t);
    if (!d) { d = { d: t, learned: 0, right: 0, wrong: 0, m: 0 }; st.days.push(d); if (st.days.length > 500) st.days = st.days.slice(-500); }
    d.learned = (d.learned || 0) + (learned || 0);
    d.right = (d.right || 0) + (right || 0);
    d.wrong = (d.wrong || 0) + (wrong || 0);
    d.m = this.masteredCount();
    this.checkWeeklyReward(t);
  },
  statOverview() {
    const st = this.state.stats;
    const total = this.totalCount(), mastered = this.masteredCount();
    const answered = st.right + st.wrong;
    return {
      total, mastered,
      learning: this.learning.length,
      fresh: this.news.length,
      pct: total ? Math.round(mastered / total * 100) : 0,
      accuracy: answered ? Math.round(st.right / answered * 100) : 0,
      right: st.right, wrong: st.wrong,
      unitsDone: this.unitList().filter(u => u.checked).length,
      unitsTotal: UNITS.length,
      days: st.days.length,
      coins: this.state.rewards.coins
    };
  },

  /* ---------- 单词增删 ---------- */
  // 动态扩展单元（Excel / 图片导入第 11+ 单元时用），并把单元元信息落到 state 以便刷新后保留
  ensureUnit(n, meta) {
    n = +n || 1;
    while (UNITS.length < n) {
      const u = UNITS.length + 1;
      UNITS.push({ u, name: 'Unit ' + u, title: (meta && meta.title) || '课本单词', desc: '', words: [] });
    }
    this.state.unitMeta = this.state.unitMeta || {};
    this.state.unitMeta[n] = Object.assign(this.state.unitMeta[n] || {}, meta || {}, { u: n });
    if (!this.state.unitState[n]) this.state.unitState[n] = this.freshUnit();
  },
  add(o, u) {
    u = u || this.unit || 1;
    if (this.unitWords(u).some(w => w.w.toLowerCase() === o.w.toLowerCase())) return null;
    const x = this.mk(o, u); x.src = 'custom';
    this.state.words.push(x); this.save(); return x;
  },
  addMany(list, u) {
    let n = 0; list.forEach(o => { if (this.add(o, u)) n++; }); return n;
  },
  // 从解析结果批量导入（Excel / 图片 / 文本通用）：按 (单元, 单词) 去重，已存在则更新字段
  importParsed(list, opts) {
    opts = opts || {};
    let added = 0, updated = 0;
    list.forEach(o => {
      if (!o || !o.w) return;
      const u = +o.u || 1;
      this.ensureUnit(u, opts.meta);
      const exist = this.state.words.find(w => w.u === u && w.w.toLowerCase() === o.w.toLowerCase());
      if (exist) {
        exist.ph = o.ph || exist.ph; exist.cn = o.cn || exist.cn; exist.pos = o.pos || exist.pos;
        exist.ex = o.ex || exist.ex; exist.ec = o.ec || exist.ec;
        if (o.parts) exist.parts = o.parts;
        if (o.story) exist.story = o.story;
        if (o.storyEn) exist.storyEn = o.storyEn;
        if (o.fam) exist.fam = o.fam;
        this.enrichWord(exist);
        updated++;
      } else {
        const x = this.mk(o, u); x.src = 'custom';
        this.state.words.push(x); added++;
      }
    });
    this.save();
    return { added, updated };
  },
  remove(id) {
    const w = this.byId(id);
    if (w && w.src === 'builtin') {
      this.state.deletedBuiltin = this.state.deletedBuiltin || [];
      this.state.deletedBuiltin.push(w.u + '::' + w.w.toLowerCase());
    }
    this.state.words = this.state.words.filter(w => w.id !== id); this.save(); },
  resetUnit(u) {
    const st = this.unitState(u);
    st.learned = []; st.quizDone = 0; st.best = 0; st.plays = 0; st.checked = false; st.checkedAt = '';
    this.unitWords(u).forEach(w => { w.status = 'new'; w.level = 0; w.next = ''; w.right = 0; w.wrong = 0; });
    this.save();
  },
  resetAll() {
    this.state.words.forEach(w => { w.status = 'new'; w.level = 0; w.next = ''; w.right = 0; w.wrong = 0; });
    UNITS.forEach(u => this.state.unitState[u.u] = this.freshUnit());
    this.state.stats = { right: 0, wrong: 0, days: [], started: dayStr() };
    this.save();
  },

  /* ---------- 备份 ---------- */
  exportJSON() {
    return JSON.stringify({ v: 3, at: dayStr(), words: this.state.words, unitState: this.state.unitState, stats: this.state.stats, rewards: this.state.rewards, settings: this.state.settings, unitMeta: this.state.unitMeta, deletedBuiltin: this.state.deletedBuiltin || [] }, null, 1);
  },
  importJSON(txt) {
    const o = JSON.parse(txt);
    if (!Array.isArray(o.words) || o.words.some(w => !w || typeof w.w !== 'string' || !w.w.trim() || !Number.isInteger(w.u || 1) || (w.u || 1) < 1 || (w.u || 1) > 1000)) throw new Error(this.state.settings.language === 'en' ? 'Invalid word data' : '单词数据格式不正确');
    const map = new Map(this.state.words.map(w => [w.u + '::' + w.w.toLowerCase(), w]));
    const ids = new Map();
    let n = 0;
    o.words.forEach(w => {
      const u = w.u || 1;
      this.ensureUnit(u, o.unitMeta && o.unitMeta[u]);
      const key = u + '::' + w.w.toLowerCase();
      let target = map.get(key);
      if (!target) { target = this.mk(w, u); target.src = w.src || 'custom'; this.state.words.push(target); map.set(key, target); n++; }
      const id = target.id;
      Object.assign(target, w, { id, u });
      this.enrichWord(target);
      if (w.id) ids.set(w.id, id);
    });
    if (o.unitState) Object.entries(o.unitState).forEach(([u, st]) => {
      if (!st || !Array.isArray(st.learned)) return;
      this.state.unitState[u] = Object.assign(this.freshUnit(), st, {
        learned: [...new Set(st.learned.map(id => ids.get(id)).filter(id => this.byId(id)?.u === +u))]
      });
    });
    if (o.stats && Array.isArray(o.stats.days)) this.state.stats = o.stats;
    if (o.rewards) {
      const importedClaims = Array.isArray(o.rewards.claimedUnits) ? o.rewards.claimedUnits : [];
      const claimed = [...new Set([...(this.state.rewards.claimedUnits || []), ...importedClaims.map(Number)])];
      const importedWeeks = Array.isArray(o.rewards.claimedWeeks) ? o.rewards.claimedWeeks.filter(w => /^\d{4}-\d{2}-\d{2}$/.test(String(w))) : [];
      const claimedWeeks = [...new Set([...(this.state.rewards.claimedWeeks || []), ...importedWeeks])];
      this.state.rewards = {
        coins: Math.max(this.state.rewards.coins || 0, Number(o.rewards.coins) || 0, claimed.length * UNIT_REWARD_COINS + claimedWeeks.length * WEEKLY_REWARD_COINS),
        claimedUnits: claimed,
        claimedWeeks
      };
    }
    if (o.settings) {
      Object.assign(this.state.settings, o.settings);
      this.state.settings.language = this.state.settings.language === 'zh' ? 'zh' : 'en';
      this.state.settings.languageChoiceVersion = 1;
    }
    if (Array.isArray(o.deletedBuiltin)) {
      this.state.deletedBuiltin = [...new Set([...(this.state.deletedBuiltin || []), ...o.deletedBuiltin])];
      this.state.words = this.state.words.filter(w => w.src !== 'builtin' || !this.state.deletedBuiltin.includes(w.u + '::' + w.w.toLowerCase()));
    }
    this.save(); return n;
  }
};
