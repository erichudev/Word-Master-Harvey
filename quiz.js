/* ============ 练习题游戏 ============ */
const GAMES = {
  spell: { name: '听音拼单词', nameEn: 'Listen & Build', desc: '听一听，点字母，拼出单词', descEn: 'Listen, tap letters, and build the word', icon: '🔊', color: '#22c55e' },
  phonics: { name: 'Phonics 补音块', nameEn: 'Phonics Sound Blocks', desc: '听单词补音块，无匹配规则时练补字母', descEn: 'Fill sound blocks, or missing letters for other words', icon: '🧩', color: '#8b5cf6' },
  repair: { name: '拼写小医生', nameEn: 'Spelling Doctor', desc: '找出捣蛋字母，把单词修好', descEn: 'Find the wrong letter and fix the word', icon: '🩹', color: '#f59e0b' },
  memory: { name: '记忆闪闪卡', nameEn: 'Peek & Spell', desc: '看一眼，盖起来，听音拼出来', descEn: 'Peek, hide, and spell what you remember', icon: '✨', color: '#ec4899' }
};

const Quiz = {
  open(type, words, onDone, opts) {
    if (!GAMES[type]) return;
    words = this.available(type, words || []);
    if (!words || words.length < 1) { toast(tr('这个范围暂无适合的题目，请换个范围或玩听音拼单词','No suitable words here. Choose another group or Listen & Build.')); return; }
    this.type = type; this.onDone = onDone; this.mstate = null; this.opts = opts || {};
    this.sid = (this.sid || 0) + 1;
    this.pool = shuffle(words);
    this.qs = this.pool.slice();
    this.settled = false; this.resultShown = false; this.qi = 0; this.right = 0; this.wrongWords = []; this.start = Date.now();
    this.render();
  },
  // Match spelling AND the recorded initial phoneme; never infer sounds from word roots.
  soundBlock(w) {
    const word = w.w.toLowerCase(), ph = (w.ph || '').replace(/[\/ˈˌ\s]/g, '');
    const rules = [['sh','ʃ'], ['ch','tʃ'], ['th','θ'], ['th','ð'], ['ph','f'],
      ['b','b'], ['d','d'], ['f','f'], ['g','ɡ'], ['g','g'], ['h','h'],
      ['j','dʒ'], ['k','k'], ['l','l'], ['m','m'], ['n','n'], ['p','p'],
      ['r','r'], ['s','s'], ['t','t'], ['v','v'], ['w','w'], ['z','z'], ['c','k']];
    return rules.find(([letters, sound]) => word.startsWith(letters) && ph.startsWith(sound)) || null;
  },
  available(type, words) {
    return words.filter(w => /[a-z]/i.test(w.w));
  },
  audioPrompt(w) {
    return `<button class="btn audio-play" onclick="speak(${esc(JSON.stringify(w.w))})" aria-label="${tr('再听一次','Listen again')}">🔊 ${tr('再听一次','Listen again')}</button>
      ${!window.speechSynthesis ? `<p role="status" class="q-sub">${tr('此浏览器不支持朗读，请用支持语音的浏览器，或请家长读题。','Speech is unavailable. Use a speech-enabled browser or ask a grown-up to read the word.')}<button class="btn gray sm" onclick="Quiz.showModel()">${tr('家长读题','For grown-ups')}</button></p>` : ''}`;
  },
  showModel() {
    if (this.settled || this.spellBusy) return;
    this.assisted = true;
    $('#sound-help').textContent = this.qs[this.qi].w.toLowerCase();
  },
  q_phonics(w) {
    const block = this.soundBlock(w);
    const index = block ? 0 : pick([...w.w.matchAll(/[a-z]/gi)].map(m => m.index));
    const letters = block ? block[0] : w.w[index].toLowerCase();
    this.soundIndex = index; this.soundRule = block;
    this.soundAnswer = letters;
    // 音块题混入 sh/ch/th 等组合；补字母题只给单字母，避免与单个空位不符
    const pool = (block ? ['sh','ch','th','ph','b','d','f','m','s','t'] : 'abcdefghijklmnopqrstuvwxyz'.split('')).filter(x => x !== letters);
    const options = shuffle([letters, ...shuffle(pool).slice(0, 3)]);
    return `<div class="card center">${this.audioPrompt(w)}
      <div class="q-sub">${block ? tr('听一听，补上开头的音块','Listen and choose the missing starting sound') : tr('听音补字母：这个词练拼写','Listen and fill a letter: spelling practice')}</div>
      <div class="sound-word">${esc(w.w.slice(0, index))}<span class="sound-gap">?</span>${esc(w.w.slice(index + letters.length))}</div>
      <div class="sound-options">${options.map(x => `<button class="btn gray sound-option" data-block="${x}" onclick="Quiz.pickSound(this)">${x}</button>`).join('')}</div>
      <p id="sound-help" aria-live="polite"></p>
      <button class="btn gray sm" onclick="Quiz.showModel()">${tr('看一看单词（练习提示）','Peek at the word (practice hint)')}</button>
    </div>`;
  },
  pickSound(btn) {
    if (this.settled) return;
    const w = this.qs[this.qi], correct = btn.dataset.block === this.soundAnswer;
    $$('.sound-option').forEach(b => { b.disabled = true; if (b.dataset.block === this.soundAnswer) b.classList.add('sound-correct'); });
    btn.classList.add(correct ? 'sound-correct' : 'sound-wrong');
    $('.sound-gap').textContent = this.soundAnswer;
    $('#sound-help').textContent = this.soundRule ? `${this.soundAnswer} → /${this.soundRule[1]}/ · ${w.w.toLowerCase()}` : w.w.toLowerCase();
    speak(w.w);
    this.feedback(correct && !this.assisted); this.next(correct && !this.assisted, w.id);
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
    if (this.qi >= this.qs.length) return this.result(box);
    this.settled = false; this.spellBusy = false; this.assisted = false;
    const w = this.qs[this.qi];
    const body = this['q_' + this.type](w);
    box.innerHTML = this.head() + body;
    box.classList.add('show');
    speak(w.w);
  },
  exit() {
    if (!confirm(tr('要退出本次练习吗？已答的题目会计入学习记录。','Leave this game? Answered questions will stay in your learning record.'))) return;
    this.sid = (this.sid || 0) + 1;
    $('#game').classList.remove('show'); $('#game').innerHTML = '';
    this.onDone && this.onDone({ quit: true });
  },
  /* ---------- 题型 3：字母拼拼乐 ---------- */
  q_spell(w) {
    const letters = shuffle(w.w.toLowerCase().match(/[a-z]/g) || []);
    return `<div class="card center">
      ${this.audioPrompt(w)}
      <div class="q-sub">${tr('听一听，点字母拼单词；点已选字母可以撤回','Listen and build the word. Tap a filled slot to undo.')}</div>
      <p id="sound-help" aria-live="polite"></p>
      <div class="slots" id="slots">${w.w.split('').map(c => /[a-z]/i.test(c) ? '<button class="slot empty" onclick="Quiz.undoSlot(this)" aria-label="Undo letter"></button>' : `<span class="slot fixed">${esc(c)}</span>`).join('')}</div>
      <div class="letters" id="lets">${letters.map((c, i) =>
      `<button class="letter" data-i="${i}" onclick="Quiz.tapLetter(this,'${w.id}')">${esc(c.toLowerCase())}</button>`).join('')}</div>
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
        if (ans.toLowerCase() === w.w.toLowerCase()) { this.feedback(!this.assisted); speak(w.w); this.next(!this.assisted, id); }
        else { this.spellBusy = false; this.assisted = true; this.feedback(false); speak(w.w);
          $('#sound-help').textContent = tr('再听一次，试着重新拼！','Listen again and try once more!');
          all.filter(s => !s.classList.contains('fixed')).forEach(s => { s.classList.add('empty'); s.textContent = ''; });
          $$('#lets .letter').forEach(l => l.classList.remove('used'));
          $('#game .card').animate?.([{ transform: 'translateX(0)' }, { transform: 'translateX(-8px)' }, { transform: 'translateX(8px)' }, { transform: 'translateX(0)' }], { duration: 280 });
        }
      }, 220);
    }
  },
  undoSlot(s) {
    if (this.settled || this.spellBusy || s.classList.contains('fixed') || s.classList.contains('empty')) return;
    const l = $('#lets .letter[data-i="' + s.dataset.i + '"]');
    if (l) l.classList.remove('used');
    s.classList.add('empty'); s.textContent = '';
  },
  hintSpell(id) {
    if (this.settled || this.spellBusy) return;
    this.assisted = true;
    const w = Store.byId(id);
    const slots = $$('#slots .slot');
    const idx = slots.findIndex((s, i) => s.classList.contains('empty') || s.textContent.toLowerCase() !== w.w[i].toLowerCase());
    if (idx >= 0) slots.slice(idx).forEach(s => this.undoSlot(s));
    if (idx < 0) return;
    const btn = $$('#lets .letter').find(l => !l.classList.contains('used') && l.textContent.toLowerCase() === w.w[idx].toLowerCase());
    if (btn) { this.tapLetter(btn, id); toast(tr('提示一个字母','Here is a letter')); }
  },
  q_memory(w) {
    this.memoryHidden = false;
    return `<div class="card center">${this.audioPrompt(w)}
      <div class="q-sub">${tr('看清字母顺序，准备好后盖住它！','Look at the letters. Hide the word when you are ready!')}</div>
      <div class="sound-word">${esc(w.w)}</div><p id="sound-help" aria-live="polite"></p>
      <button class="btn" onclick="Quiz.hideMemory()">🙈 ${tr('记住了，开始拼！','Hide & spell!')}</button></div>`;
  },
  hideMemory() {
    if (this.settled || this.memoryHidden) return;
    this.memoryHidden = true;
    const w = this.qs[this.qi];
    $('#game').innerHTML = this.head() + this.q_spell(w);
    $('#sound-help').textContent = tr('凭记忆拼出来！也可以再听一次。','Build it from memory! You can listen again.');
    speak(w.w);
  },
  q_repair(w) {
    this.repairIndex = pick([...w.w.matchAll(/[a-z]/gi)].map(m => m.index));
    this.repairSelected = null;
    this.repairAnswer = w.w[this.repairIndex].toLowerCase();
    const wrong = pick('abcdefghijklmnopqrstuvwxyz'.split('').filter(c => c !== this.repairAnswer));
    const broken = w.w.slice(0, this.repairIndex) + wrong + w.w.slice(this.repairIndex + 1);
    this.repairOptions = shuffle([this.repairAnswer, ...shuffle('abcdefghijklmnopqrstuvwxyz'.split('').filter(c => c !== this.repairAnswer)).slice(0, 3)]);
    return `<div class="card center">${this.audioPrompt(w)}
      <div class="q-sub">${tr('有一个字母生病了！听一听，点出它，再换成正确字母。','One letter is wrong! Listen, tap it, then choose its replacement.')}</div>
      <div class="repair-word">${broken.split('').map((c,i) => /[a-z]/i.test(c) ? `<button class="letter repair-letter" data-index="${i}" onclick="Quiz.selectRepair(this)">${esc(c.toLowerCase())}</button>` : `<span class="repair-separator">${esc(c)}</span>`).join('')}</div>
      <div id="repair-options" class="sound-options"></div><p id="sound-help" aria-live="polite"></p>
      <button class="btn gray sm" onclick="Quiz.showModel()">${tr('看一看单词（提示）','Peek at the word (hint)')}</button></div>`;
  },
  selectRepair(btn) {
    if (this.settled) return;
    this.repairSelected = Number(btn.dataset.index);
    $$('.repair-letter').forEach(b => b.classList.toggle('repair-selected', b === btn));
    $('#repair-options').innerHTML = this.repairOptions.map(c => `<button class="btn gray sound-option" data-letter="${c}" onclick="Quiz.fixRepair(this)">${c}</button>`).join('');
  },
  fixRepair(btn) {
    if (this.settled || this.repairSelected === null) return;
    const w = this.qs[this.qi];
    if (this.repairSelected !== this.repairIndex || btn.dataset.letter !== this.repairAnswer) {
      this.assisted = true;
      $('#sound-help').textContent = tr('还没有修好，再听听，找找看！','Not fixed yet. Listen and try again!');
      speak(w.w); return;
    }
    $$('.repair-letter').forEach(b => { b.disabled = true; });
    $$('.sound-option').forEach(b => { b.disabled = true; });
    $('.repair-selected').textContent = w.w[this.repairIndex].toLowerCase();
    $('#sound-help').textContent = tr('修好啦！','Fixed! ') + ' ' + w.w.toLowerCase();
    speak(w.w); this.feedback(!this.assisted); this.next(!this.assisted, w.id);
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
    const total = this.qs.length;
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
