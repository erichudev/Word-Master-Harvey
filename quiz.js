/* ============ 练习题游戏 ============ */
const GAMES = {
  choice: { name: '快速选择', nameEn: 'Quick Pick', desc: '看中文选英文，看英文选中文', descEn: 'Match English words and Chinese meanings', icon: 'A', color: '#4c8dff', size: 10 },
  listen: { name: '听力小达人', nameEn: 'Listening Star', desc: '听发音，选出正确的单词', descEn: 'Listen and choose the right word', icon: 'B', color: '#8b5cf6', size: 8 },
  spell: { name: '字母拼拼乐', nameEn: 'Letter Builder', desc: '打乱的字母，拼出正确单词', descEn: 'Put the letters in the right order', icon: 'C', color: '#22c55e', size: 8 },
  type: { name: '拼写大挑战', nameEn: 'Spelling Challenge', desc: '看中文，完整拼出单词', descEn: 'Type the whole word', icon: 'D', color: '#ffb020', size: 8 },
  match: { name: '配对消消乐', nameEn: 'Match Up', desc: '中英文配对，全部消除即通关', descEn: 'Match every word with its meaning', icon: 'E', color: '#ff6fae', size: 6 },
  root: { name: '词根拆解', nameEn: 'Word Parts', desc: '看出词素，选出对应含义', descEn: 'Find the meaning of each word part', icon: 'F', color: '#14b8a6', size: 8 }
};

const Quiz = {
  open(type, words, onDone, opts) {
    if (type === 'root') words = (words || []).filter(w => (w.parts || []).some(p => p.p && p.g));
    if (!words || words.length < 1) { toast(tr('这个范围没有可用题目（词根练习需要构词数据）','No questions are available here. Word Parts needs formation data.')); return; }
    const g = GAMES[type];
    this.type = type; this.onDone = onDone; this.mstate = null; this.opts = opts || {};
    this.sid = (this.sid || 0) + 1;
    this.pool = shuffle(words);
    this.qs = type === 'match'
      ? this.pool.slice(0, g.size)
      : this.pool.slice(0, Math.min(g.size, words.length));
    this.settled = false; this.resultShown = false; this.qi = 0; this.right = 0; this.wrongWords = []; this.start = Date.now();
    this.render();
  },
  /* 通用干扰项：随机抽非正确单词 */
  distractors(w, n, picker) {
    const seenWords = new Set([w.w.trim().toLowerCase()]), seenMeanings = new Set([w.cn.trim()]);
    const all = shuffle(Store.state.words).filter(x => {
      const word = x.w.trim().toLowerCase(), meaning = x.cn.trim();
      if (seenWords.has(word) || seenMeanings.has(meaning)) return false;
      seenWords.add(word); seenMeanings.add(meaning); return true;
    });
    return shuffle(all).slice(0, n).map(picker);
  },
  head() {
    const total = this.qs.length;
    const pct = Math.round(this.qi / total * 100);
    return `<div class="q-head">
      <button class="iconbtn" aria-label="${tr('退出练习','Leave practice')}" onclick="Quiz.exit()"><svg viewBox="0 0 24 24" fill="none" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg></button>
      <div class="bar"><i style="width:${pct}%"></i></div>
      <div class="muted" style="font-weight:700">${this.qi + 1}/${total}</div>
    </div>`;
  },
  render() {
    const box = $('#game');
    if (this.type === 'match') return this.renderMatch(box);
    if (this.qi >= this.qs.length) return this.result(box);
    this.settled = false; this.spellBusy = false;
    const w = this.qs[this.qi];
    const body = this['q_' + this.type](w);
    box.innerHTML = this.head() + body;
    box.classList.add('show');
    if (Store.state.settings.autoSpeak && this.type !== 'listen' && this.type !== 'type') speak(w.w);
  },
  exit() {
    if (!confirm(tr('要退出本次练习吗？已答的题目会计入学习记录。','Leave this game? Answered questions will stay in your learning record.'))) return;
    this.sid = (this.sid || 0) + 1;
    $('#game').classList.remove('show'); $('#game').innerHTML = '';
    this.onDone && this.onDone({ quit: true });
  },
  /* ---------- 题型 1：选择 ---------- */
  q_choice(w) {
    const en2cn = Math.random() < 0.5;
    const opts = shuffle([w].concat(this.distractors(w, 3, o => o)));
    const q = en2cn
      ? `<div class="q-title">${esc(w.w)}</div><div class="q-sub">${esc(w.ph || '')} · ${tr('选出中文意思','Choose the meaning')}</div>`
      : `<div class="q-title">${esc(w.cn)}</div><div class="q-sub">${tr('选出对应的英文单词','Choose the English word')}</div>`;
    return `<div class="card">${q}<div class="opts">${opts.map((o, i) =>
      `<button class="opt" data-id="${o.id}" onclick="Quiz.pick(this,'${o.id}','${w.id}')">
        <span class="k">${'ABCD'[i]}</span><span>${esc(en2cn ? o.cn : o.w)}</span></button>`).join('')}
      </div></div>`;
  },
  /* ---------- 题型 2：听力 ---------- */
  q_listen(w) {
    const opts = shuffle([w].concat(this.distractors(w, 3, o => o)));
    const body = `<div class="card center">
      <div class="big-icon pulse" onclick="speak(${esc(JSON.stringify(w.w))})">
        <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M15.5 8.5a5 5 0 010 7"/><path d="M19 5a9 9 0 010 14"/></svg>
      </div>
      <div class="muted">${tr('点击喇叭再听一次','Tap the speaker to listen again')}</div>
      <div class="opts" style="text-align:left">${opts.map((o, i) =>
      `<button class="opt" data-id="${o.id}" onclick="Quiz.pick(this,'${o.id}','${w.id}',false)">
          <span class="k">${'ABCD'[i]}</span><span>${esc(o.w)}</span></button>`).join('')}
      </div></div>`;
    const sid = this.sid;
    setTimeout(() => { if (sid === this.sid) speak(w.w); }, 250);
    return body;
  },
  /* ---------- 题型 3：字母拼拼乐 ---------- */
  q_spell(w) {
    const letters = shuffle(w.w.split(''));
    return `<div class="card center">
      <div class="q-title" style="font-size:20px">${esc(w.cn)}</div>
      <div class="q-sub">${esc(w.ph || '')} · ${tr('点击字母拼出单词','Tap the letters to build the word')}</div>
      <div class="slots" id="slots">${w.w.split('').map(() => '<div class="slot empty" onclick="Quiz.undoSlot(this)"></div>').join('')}</div>
      <div class="letters" id="lets">${letters.map((c, i) =>
      `<button class="letter" data-i="${i}" onclick="Quiz.tapLetter(this,'${w.id}')">${esc(c)}</button>`).join('')}</div>
      <div class="mt16"><button class="btn gray sm" onclick="Quiz.hintSpell('${w.id}')">${tr('提示一个字母','Give me a letter')}</button></div>
    </div>`;
  },
  tapLetter(btn, id) {
    if (this.settled || this.spellBusy || btn.classList.contains('used')) return;
    btn.classList.add('used');
    const slot = $('#slots .slot.empty');
    if (!slot) return;
    slot.classList.remove('empty'); slot.textContent = btn.textContent;
    slot.dataset.i = btn.dataset.i;
    const all = $$('#slots .slot');
    if (all.length && all.every(s => !s.classList.contains('empty'))) {
      this.spellBusy = true;
      const ans = all.map(s => s.textContent).join('');
      const w = Store.byId(id);
      const sid = this.sid;
      setTimeout(() => {
        if (sid !== this.sid) return;
        if (ans.toLowerCase() === w.w.toLowerCase()) { this.feedback(true); speak(w.w); this.next(true, id); }
        else { this.spellBusy = false; this.feedback(false); speak(w.w);
          all.forEach(s => { s.classList.add('empty'); s.textContent = ''; });
          $$('#lets .letter').forEach(l => l.classList.remove('used'));
          $('#game .card').animate([{ transform: 'translateX(0)' }, { transform: 'translateX(-8px)' }, { transform: 'translateX(8px)' }, { transform: 'translateX(0)' }], { duration: 280 });
        }
      }, 220);
    }
  },
  undoSlot(s) {
    if (this.settled || this.spellBusy || s.classList.contains('empty')) return;
    const l = $('#lets .letter[data-i="' + s.dataset.i + '"]');
    if (l) l.classList.remove('used');
    s.classList.add('empty'); s.textContent = '';
  },
  hintSpell(id) {
    if (this.settled || this.spellBusy) return;
    const w = Store.byId(id);
    const slots = $$('#slots .slot');
    const idx = slots.findIndex(s => s.classList.contains('empty'));
    if (idx < 0) return;
    const btn = $$('#lets .letter').find(l => !l.classList.contains('used') && l.textContent.toLowerCase() === w.w[idx].toLowerCase());
    if (btn) { this.tapLetter(btn, id); toast(tr('提示一个字母','Here is a letter')); }
  },
  /* ---------- 题型 4：完整拼写 ---------- */
  q_type(w) {
    return `<div class="card center">
      <div class="q-title" style="font-size:22px">${esc(w.cn)}</div>
      <div class="q-sub">${esc(w.ph || '')} · ${w.w.length} ${tr('个字母','letters')} · ${tr('首字母','First letter')} <b>${w.w[0]}</b></div>
      <input class="spell-input mt16" id="tin" placeholder="${tr('在这里拼写','Type the word here')}" autocomplete="off" autocapitalize="off" spellcheck="false">
      <div class="row mt12" style="gap:8px">
        <button class="btn gray sm" style="flex:1" onclick="Quiz.giveUp('${w.id}')">${tr('看答案','Show answer')}</button>
        <button class="btn sm" style="flex:1" onclick="Quiz.submitType('${w.id}')">${tr('确定','Check')}</button>
      </div>
    </div>`;
  },
  submitType(id) {
    if (this.settled || !$('#tin') || $('#tin').disabled) return;
    const w = Store.byId(id), v = ($('#tin').value || '').trim().toLowerCase();
    if (!v) return;
    if (v === w.w.toLowerCase()) { this.feedback(true); speak(w.w); this.next(true, id); }
    else { this.feedback(false); this.next(false, id); toast(tr('正确拼写：','Correct spelling: ') + w.w); }
  },
  giveUp(id) {
    if (this.settled || !$('#tin') || $('#tin').disabled) return;
    const w = Store.byId(id);
    $('#tin').value = w.w; $('#tin').disabled = true;
    speak(w.w);
    const sid = this.sid;
    setTimeout(() => { if (sid === this.sid) this.next(false, id); }, 1100);
  },
  /* ---------- 题型 5：配对 ---------- */
  renderMatch(box) {
    if (!this.mstate) {
      const ws = this.qs;
      const left = shuffle(ws), right = shuffle(ws);
      this.mstate = { left, right, sel: null, done: [], busy: false };
    }
    const m = this.mstate;
    const cell = (w, side) => {
      const done = m.done.indexOf(w.id) >= 0;
      const sel = m.sel && m.sel.side === side && m.sel.id === w.id;
      const txt = side === 'L' ? w.w : w.cn;
      return `<button class="pcell ${done ? 'done' : ''} ${sel ? 'sel' : ''}" onclick="Quiz.tapPair('${w.id}','${side}')">${esc(txt)}</button>`;
    };
    const total = m.left.length;
    box.innerHTML = `<div class="q-head">
        <button class="iconbtn" aria-label="${tr('退出练习','Leave practice')}" onclick="Quiz.exit()"><svg viewBox="0 0 24 24" fill="none" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg></button>
        <div class="bar"><i style="width:${Math.round(m.done.length / total * 100)}%"></i></div>
        <div class="muted" style="font-weight:700">${m.done.length}/${total}</div></div>
      <div class="card"><div class="center muted mb12">${tr('把左边的英文和右边的中文配对','Match each English word with its meaning')}</div>
      <div class="pair-grid"><div>${m.left.map(w => cell(w, 'L')).join('')}</div><div>${m.right.map(w => cell(w, 'R')).join('')}</div></div></div>`;
    box.classList.add('show');
    if (m.done.length >= total) { const sid = this.sid; setTimeout(() => { if (sid === this.sid) this.result(box); }, 500); }
  },
  tapPair(id, side, word) {
    const m = this.mstate;
    if (m.busy || m.done.indexOf(id) >= 0) return;
    if (side === 'L') speak(Store.byId(id).w);
    if (!m.sel) { m.sel = { id, side }; this.renderMatch($('#game')); return; }
    if (m.sel.side === side) { m.sel = { id, side }; this.renderMatch($('#game')); return; }
    if (m.sel.id === id) {
      m.done.push(id); m.sel = null; this.feedback(!this.wrongWords.includes(id)); Store.answer(id, true);
      this.renderMatch($('#game'));
    } else {
      const failedId = side === 'L' ? id : m.sel.id;
      this.feedback(false); Store.answer(failedId, false);
      if (this.wrongWords.indexOf(failedId) < 0) this.wrongWords.push(failedId);
      m.busy = true; m.sel = { id, side }; this.renderMatch($('#game'));
      const sid = this.sid;
      setTimeout(() => { if (sid !== this.sid) return; m.busy = false; m.sel = null; this.renderMatch($('#game')); }, 700);
    }
  },
  /* ---------- 题型 6：词根拆解 ---------- */
  q_root(w) {
    const parts = w.parts && w.parts.length ? w.parts.slice() : null;
    if (!parts) return '';
    const target = pick(parts);
    // 干扰项：其它词（也包括同一词的其它 part）的 g
    const allGs = [];
    Store.state.words.forEach(o => (o.parts || []).forEach(p => allGs.push(p.g)));
    const opts = shuffle([target.g].concat(shuffle([...new Set(allGs)].filter(x => x !== target.g)).slice(0, 3)));
    this.rootTarget = target.g;
    const partsHtml = parts.map(p => `<span class="m-piece ${p.k}${p === target ? ' root-target' : ''}">${esc(p.p)}</span>`).join('<span class="m-plus">+</span>');
    return `<div class="card center">
      <div class="q-title" style="font-size:24px">${partsHtml}</div>
      <div class="q-sub">${esc(w.cn)} · ${tr('选出','Choose the meaning of')} <b>${esc(target.p)}</b></div>
      <div class="q-tip mt8">${tr('单词由','This word is made of')} <b>${parts.map(p => '<span class="m-piece ' + p.k + '">' + esc(p.p) + '</span>').join(' + ')}</b></div>
      <div class="opts mt16">${opts.map((g, i) =>
      `<button class="opt" data-g="${esc(g)}" onclick="Quiz.pickRoot(this,Quiz.rootTarget,this.dataset.g,'${w.id}')">
        <span class="k">${'ABCD'[i]}</span><span>${esc(g)}</span></button>`).join('')}
      </div>
    </div>`;
  },
  pickRoot(btn, target, chosen, id) {
    if (this.settled) return;
    const ok = target === chosen;
    $$('#game .opt').forEach(b => { b.classList.add('dim'); b.disabled = true; });
    btn.classList.remove('dim');
    if (ok) btn.classList.add('right');
    else {
      btn.classList.add('wrong');
      $$('#game .opt').forEach(b => { if (b.dataset.g === target) b.classList.add('right'); });
    }
    speak(Store.byId(id).w);
    this.feedback(ok); this.next(ok, id);
  },
  /* ---------- 通用选择处理 ---------- */
  pick(btn, id, wId, doSpeak) {
    if (this.settled) return;
    const w = Store.byId(wId), ok = id === wId;
    $$('#game .opt').forEach(b => { b.classList.add('dim'); b.disabled = true; });
    btn.classList.remove('dim');
    if (ok) btn.classList.add('right');
    else {
      btn.classList.add('wrong');
      const right = $$('#game .opt').find(b => b.dataset.id === wId);
      if (right) right.classList.add('right');
    }
    if (doSpeak !== false) speak(w.w);
    this.feedback(ok);
    this.next(ok, wId);
  },
  feedback(ok) {
    if (ok) { this.right++; try { navigator.vibrate && navigator.vibrate(15); } catch (e) { } }
  },
  next(ok, id) {
    if (this.settled) return;
    this.settled = true;
    Store.answer(id, ok);
    if (!ok && this.wrongWords.indexOf(id) < 0) this.wrongWords.push(id);
    this.qi++;
    const sid = this.sid;
    setTimeout(() => {
      if (sid !== this.sid) return;
      this.qi >= this.qs.length ? this.result($('#game')) : this.render();
    }, ok ? 700 : 1400);
  },
  /* ---------- 结果 ---------- */
  result(box) {
    if (this.resultShown) return;
    this.resultShown = true;
    const total = this.type === 'match' ? this.mstate.left.length : this.qs.length;
    const rate = total ? Math.round(this.right / total * 100) : 0;
    const star = rate >= 90 ? 3 : rate >= 70 ? 2 : rate >= 40 ? 1 : 0;
    const sec = Math.max(1, Math.round((Date.now() - this.start) / 1000));
    const wrongs = this.wrongWords.map(id => Store.byId(id)).filter(Boolean);
    const passed = this.opts && this.opts.unit ? Store.finishUnitQuiz(this.opts.unit, rate) : null;
    const weeklyReward = UI.weeklyRewardEarnedHtml();
    box.innerHTML = `<div class="card result">
      <div class="score">${rate}<span style="font-size:20px">%</span></div>
      <div class="stars">${[0, 1, 2].map(i => i < star
        ? `<svg viewBox="0 0 24 24" fill="#ffb020"><path d="M12 2l3 6.5 7 .9-5 4.8 1.2 7L12 18l-6.2 3.2L7 14.2 2 9.4l7-.9z"/></svg>`
        : `<svg viewBox="0 0 24 24" fill="none" stroke="#dbe2ec" stroke-width="1.6"><path d="M12 2l3 6.5 7 .9-5 4.8 1.2 7L12 18l-6.2 3.2L7 14.2 2 9.4l7-.9z"/></svg>`).join('')}</div>
      <div class="muted">${tr(`答对 ${this.right} / ${total} 题 · 用时 ${sec} 秒`,`${this.right} / ${total} correct · ${sec} seconds`)}</div>
      ${passed && passed.earnedCoins ? `<div class="reward-earned"><img src="assets/word-explorer-fox.png" alt="${tr('小狐狸送来通关金币','Fox brings your reward coins')}"><div><span>${tr('太棒啦，奖励到账！','Hooray! You earned a reward!')}</span><strong>🪙 +${passed.earnedCoins}</strong><small>${tr('金币总数','Total coins')} ${passed.coins}</small></div></div>` : ''}
      ${weeklyReward}
      ${passed && passed.passed ? '<div class="mt12" style="color:#22c55e;font-weight:800">' + (passed.firstTime ? tr('🎉 单元通关！','🎉 Unit passed!') : tr('✓ 单元已通关','✓ Unit already passed')) + (passed.nextUnit ? tr(' · 下一单元 Unit ',' · Unit ') + passed.nextUnit + tr(' 也随时可学',' is ready too!') : '') + '</div>' : ''}
      ${passed && !passed.passed ? `<div class="mt12 muted">${tr(`需要 ${PASS_RATE}% 以上才能标记本单元通关，再来一次吧（各单元都可随时打开）`,`Score ${PASS_RATE}% or more to pass. Try again!`)}</div>` : ''}
      ${wrongs.length ? `<div class="mt16" style="text-align:left"><div class="h3">${tr('需要再练练','Practice these again')}</div>${wrongs.slice(0, 8).map(w =>
        `<div class="witem"><div class="main">
            <div class="w">${esc(w.w)} <span class="muted">${esc(w.ph || '')}</span></div>
            <div class="m">${esc(w.cn)}${(w.parts || []).map(p => ' · <span class="m-piece ' + p.k + '">' + esc(p.p) + '</span>').join('')}</div>
          </div>
          <button class="iconbtn" aria-label="${esc(tr('听发音：','Listen to ') + w.w)}" onclick="speak(${esc(JSON.stringify(w.w))})"><svg viewBox="0 0 24 24" fill="none" stroke-width="2"><path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M15.5 8.5a5 5 0 010 7"/></svg></button></div>`).join('')}</div>` : ''}
      <div class="row mt16" style="gap:10px">
        ${wrongs.length ? `<button class="btn orange" style="flex:1" onclick="Quiz.againWrong()">${tr('只练错词','Practice tricky words')}</button>` : ''}
        <button class="btn" style="flex:1" onclick="Quiz.retry()">${tr('再来一轮','Play again')}</button>
      </div>
      <button class="btn gray block mt12" onclick="Quiz.close()">${tr('完成，返回','Done')}</button>
    </div>`;
  },
  againWrong() { const ws = this.wrongWords.map(id => Store.byId(id)).filter(Boolean); this.mstate = null; this.close(true); setTimeout(() => Quiz.open(this.type, ws, this.onDone, this.opts), 60); },
  retry() { const ws = this.pool; this.mstate = null; this.open(this.type, ws, this.onDone, this.opts); },
  close(silent) {
    this.sid = (this.sid || 0) + 1;
    $('#game').classList.remove('show'); $('#game').innerHTML = '';
    this.mstate = null;
    if (!silent && this.onDone) this.onDone({ done: true });
  }
};
