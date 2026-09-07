/**
 * Word-Master-Harvey · 无头冒烟测试
 * 运行：node test/smoke.mjs（jsdom 装在 ~/.workbuddy/binaries/node/workspace）
 * 覆盖：初始化 · Unit 1 加载 · 词根详情 · 学单词流 · 5+1 种题型
 *       · 答对 5 次掌握 · 答错归零 · 单元通关 → 解锁下一单元
 *       · 复习到期（跨单元） · 图表渲染 · 增删词 · 导入导出 · 设置
 */
import { createRequire } from 'node:module';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const WS = '/Users/huzhengxi/.workbuddy/binaries/node/workspace/';
const require = createRequire(WS);
const { JSDOM } = require('jsdom');

let pass = 0, fail = 0, bugs = [];
const results = [];
function ok(name, cond, extra) {
  if (cond) { pass++; results.push('  ✔ ' + name); }
  else { fail++; results.push('  ✘ ' + name + (extra ? '  → ' + extra : '')); }
}
function bug(name, cond, detail) {
  if (cond) { bugs.push('  ⚠ ' + name + (detail ? '  → ' + detail : '')); return true; }
  pass++; results.push('  ✔ ' + name + '（问题已修复）'); return false;
}
function section(t) { results.push('\n[' + t + ']'); }

const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const dom = new JSDOM(html, {
  url: 'http://localhost:8777/',
  runScripts: 'outside-only',
  pretendToBeVisual: true
});
const win = dom.window;
const errors = [];
win.addEventListener('error', e => errors.push((e.error && e.error.stack) || e.message || String(e.error)));
win.confirm = () => true;
win.alert = () => { };
win.speechSynthesis = undefined;
win.navigator.vibrate = undefined;
win.document.execCommand = () => true;

const source = ['data.js', 'store.js', 'quiz.js', 'app.js']
  .map(f => fs.readFileSync(path.join(ROOT, f), 'utf8')).join('\n;\n');
try { win.eval(source + '\n;Object.assign(window,{Store,Quiz,UI,UNITS,Charts,GAMES,PART_KIND,PASS_RATE,MASTER_LEVEL,dayStr,addDays});'); }
catch (e) { errors.push('脚本执行异常: ' + e.message + '\n' + e.stack); }

const { Store, UI, Quiz, UNITS, GAMES, PART_KIND, PASS_RATE } = win;
const $ = s => win.document.querySelector(s);

/* ================= 1. 启动 ================= */
section('1. 启动与初始化');
ok('脚本运行无错误', errors.length === 0, errors.join(' | '));
ok('localStorage 可用', typeof win.localStorage === 'object');
ok('内置 10 个单元', UNITS.length === 10);
ok('Unit 1 与课本词库一致', Store.unitWords(1).length === UNITS[0].words.length);
ok('各单元与课本词库一致', UNITS.every(u => Store.unitWords(u.u).length === u.words.length));
ok('Unit 1 默认解锁', Store.isUnlocked(1) === true);
ok('Unit 2 默认开放', Store.isUnlocked(2) === true);
ok('侧栏渲染 10 个单元', $('#unitList').querySelectorAll('.uitem').length === 10);
ok('默认选中 Unit 1', UI.unit === 1);
ok('快数据块显示', $('#qsMastered').textContent === '0' && $('#qsLearn').textContent === '0');
ok('根页面不再显示重复大标题', UI.mode === 'units' && $('#mTitle').textContent === '' && $('.mhead').classList.contains('root-head'));
ok('首屏视图非空', $('#view').innerHTML.length > 500);
ok('底部主导航固定为四项', $('#tabbar').querySelectorAll('button').length === 4);
ok('首次打开默认英文界面', Store.state.settings.language === 'en' && $('#view').textContent.includes('My Units') && $('#tabbar').textContent.includes('Words'));
UI.goTab('units');
ok('单元页显示 Unit 1–10', $('#view').querySelectorAll('.unit-tile').length === 10);
UI.goTab('tests');
ok('测试页显示 Unit 1–10', $('#view').querySelectorAll('.unit-tile').length === 10);
UI.goTab('words');
ok('词库页含搜索和全部词条', !!$('#view .search-box') && $('#view').querySelectorAll('.wcard').length === Store.state.words.length);
UI.goTab('me');
ok('我的页面含统计与设置入口', $('#view').textContent.includes('My Progress') && $('#view').textContent.includes('Settings'));
UI.goTab('units');
ok('可切换到英文界面', Store.state.settings.language === 'en' && $('#view').textContent.includes('My Units') && $('#tabbar').textContent.includes('Words'));
ok('英文界面隐藏根页面大标题', $('#mTitle').textContent === '' && win.document.documentElement.lang === 'en');
ok('英文单元卡标题完成翻译', [...win.document.querySelectorAll('.unit-tile p')].every(p => p.textContent === 'Textbook Words'));
ok('英文侧栏单元标题完成翻译', [...win.document.querySelectorAll('#unitList .utitle')].every(p => p.textContent === 'Textbook Words'));
UI.goTab('tests');
ok('英文测试首页无残留课本标题', $('#view').textContent.includes('Unit Tests') && !$('#view').textContent.includes('课本单词'));
UI.goTab('me'); UI.goMode('set');
ok('英文设置页主要操作完成翻译', $('#view').textContent.includes('App Language') && $('#view').textContent.includes('Data Backup') && $('#view').textContent.includes('Add Words'));
UI.toggleLanguage();
UI.goTab('units');
ok('可切回中文界面', Store.state.settings.language === 'zh' && $('#view').textContent.includes('我的单元'));
UI.goTab('units');

/* ================= 2. 模式切换与词根详情 ================= */
section('2. 模式切换与词根详情');
for (const m of ['learn', 'drill', 'review', 'stats', 'set']) {
  UI.mode = m; UI.render();
  ok('切到「' + m + '」渲染成功', $('#view').innerHTML.length > 200);
}
UI.mode = 'learn'; UI.render();
ok('learn 视图显示词表 grid', $('#view').querySelectorAll('.wcard').length === Store.unitWords(1).length);
const w0 = Store.state.words.find(w => w.w === 'tourist');
UI.detailSheet(w0.id);
ok('词根详情弹层已弹出', $('#modal').classList.contains('show'));
ok('详情卡含词素拆分', $('#modal .sheet').innerHTML.includes('m-piece'));
ok('详情卡含中文词根讲解', w0.story && $('#modal .sheet').innerHTML.includes(w0.story.slice(0, 4)));
ok('详情卡含适龄英文例句', $('#modal .sheet').innerHTML.includes('<h4>例句</h4>') && w0.ex.length > 0);
ok('详情卡含同根词', w0.fam && $('#modal .sheet').innerHTML.includes(w0.fam[0].w));
UI.closeSheet();

/* ================= 3. 学习卡片流 ================= */
section('3. 学单词沉浸式');
UI.goUnit(1);
UI.startLearn(false);
const learnWord = Store.byId(UI.learnQueue[UI.learnIdx].id);
ok('学习卡片弹出', $('#game').classList.contains('show') && !!$('#flip'));
ok('city 显示专门的词源讲解', $('#flip').textContent.includes('词源讲解') && $('#flip').textContent.includes('civitas'));
ok('正面有大号单词', $('#flip .w-big').textContent.length > 0);
ok('学习卡正面显示音标', $('#flip .face:not(.back) .w-ph').textContent.startsWith('/'));
UI.flip();
ok('点击翻到背面', $('#flip').classList.contains('on'));
ok('背面含中文释义', $('#flip .back .w-mean').textContent.length > 0);
ok('学习卡背面显示音标与例句', $('#flip .back .w-ph').textContent.startsWith('/') && $('#flip .back').textContent.includes(learnWord.ex));
ok('学习卡相关词为独立标签', $('#flip .back .fam-list') && $('#flip .back .fam-list').querySelectorAll('.fam-chip').length >= 2);
const cssText = fs.readFileSync(path.join(ROOT, 'styles.css'), 'utf8');
ok('学习卡相关词标签具有间距与自动换行', /\.fam-list\s*\{[^}]*display:\s*flex[^}]*flex-wrap:\s*wrap[^}]*gap:\s*8px/s.test(cssText));
let g = 0;
while (UI.learnIdx < UI.learnQueue.length && g++ < 30) UI.learnNext(true);
ok('全部学完进入完成页', $('#game').innerHTML.includes('学完') || $('#game').innerHTML.includes('通关'));
UI.quitLearn();
ok('退出后视图回归 learn', !$('#game').classList.contains('show'));
ok('学完后 Unit 1 进度上升', Store.statOverview().mastered + Store.learning.length >= 10,
  'mastered=' + Store.statOverview().mastered);

/* ================= 4. 复习调度 ================= */
section('4. 艾宾浩斯调度');
const t = Store.state.words.find(w => w.status !== 'mastered');
const seq = [];
for (let i = 0; i < 5; i++) { Store.answer(t.id, true); seq.push(t.status + ':L' + t.level); }
ok('答对 5 次标记为已掌握', t.status === 'mastered', seq.join('→'));
ok('已掌握词下次复习排在 +30 天', (() => {
  const ds = (d) => { const p = n => (n < 10 ? '0' : '') + n; const x = d || new Date(); return x.getFullYear() + '-' + p(x.getMonth() + 1) + '-' + p(x.getDate()); };
  const d = Math.round((new Date(t.next + 'T00:00:00') - new Date(ds() + 'T00:00:00')) / 86400000);
  return d === 30;
})(), t.next);
const t2 = Store.state.words.find(w => w.status === 'learning' || w.status === 'new');
if (t2) {
  t2.level = 3; t2.status = 'learning'; t2.next = '';
  const ds = (d) => { const p = n => (n < 10 ? '0' : '') + n; const x = d || new Date(); return x.getFullYear() + '-' + p(x.getMonth() + 1) + '-' + p(x.getDate()); };
  Store.answer(t2.id, false);
  ok('答错清零并当天重排', t2.level === 0 && t2.next === ds());
  ok('答错计入错词', t2.wrong > 0);
}
ok('复习池可过滤跨单元', Store.reviewDue().every(w => w.status !== 'new'));
ok('到期词按 next 升序', (() => { const r = Store.reviewDue(); return r.every((w, i) => i === 0 || r[i - 1].next <= w.next); })());

/* ================= 5. 五+1 种题型 ================= */
section('5. 五+1 种题型');
const pool = Store.state.words.slice(0, 10);
for (const type of Object.keys(GAMES)) {
  Quiz.open(type, pool);
  const ok1 = $('#game').classList.contains('show') && $('#game').innerHTML.length > 50;
  ok(GAMES[type].name + ' 能开局', ok1);
  const n = type === 'match' ? Quiz.mstate.left.length : Quiz.qs.length;
  ok(GAMES[type].name + ' 题目数符合配置', n === Math.min(GAMES[type].size, type === 'root' ? pool.filter(w => w.parts.length).length : pool.length), '实际 ' + n);
  Quiz.close(true);
}
// 词根题必须能拿到 parts 含义
Quiz.open('root', pool);
const target = Quiz.qs.find(w => (w.parts || []).length) || Quiz.qs[0];
const qh = Quiz.q_root(target);
ok('词根题正面展示词素色块', /class="m-piece/.test(qh));
ok('词根题选项里至少含 4 个含义', qh.match(/data-g=/g).length === 4);
Quiz.close(true);
// 完整跑选择题直到结算
Quiz.open('choice', pool);
let step = 0;
while (Quiz.qi < Quiz.qs.length && step++ < 30) {
  Quiz.render();
  const w = Quiz.qs[Quiz.qi];
  const btn = $('#game .opt');
  Quiz.pick(btn, btn.dataset.id, w.id);
}
Quiz.result($('#game'));
ok('选择题结算页含分数', /\d+<span[^>]*>%/.test($('#game').innerHTML), $('#game').innerHTML.match(/score[^>]*>[^<]+/)?.[0]);
ok('选择题结算页含答对题数', /答对 \d+/.test($('#game').innerHTML));
Quiz.close(true);

/* ================= 6. 单元通关解锁 ================= */
section('6. 单元通关 → 解锁下一单元');
Store.resetAll();
ok('重置后 Unit 1 重新可学习', Store.todoLearn(1).length === UNITS[0].words.length);
UI.goUnit(1); UI.startLearn(false);
let k = 0; while (UI.learnIdx < UI.learnQueue.length && k++ < 30) UI.learnNext(true);
UI.quitLearn();
ok('学完后 U1 仍有未掌握词', Store.unitInfo(1).newCount === 0 && Store.unitInfo(1).mastered < 10);
// 模拟做完 10 道题：手动答题让 10 词达到 mastered
Store.unitWords(1).forEach(w => { for (let i = 0; i < 5; i++) Store.answer(w.id, true); });
ok('答题后 U1 全部掌握', Store.unitInfo(1).mastered === Store.unitWords(1).length);
const r = Store.finishUnitQuiz(1, 90);
ok('单元练习 90% 触发通关', r.passed === true && r.firstTime === true);
ok('首次通关奖励 20 枚金币', r.earnedCoins === 20 && Store.state.rewards.coins === 20);
ok('通关后下一单元解锁', Store.isUnlocked(2) === true);
ok('U1 状态 checked=true', Store.unitInfo(1).checked === true);
ok('低分（50%）不会通关', (() => { Store.resetUnit(1); const u = Store.unitWords(1); u.forEach(w => { for (let i = 0; i < 5; i++) Store.answer(w.id, true); }); return Store.finishUnitQuiz(1, 50).passed === false; })());
ok('高但未全学会（69%）不会通关', (() => { Store.resetUnit(1); const u = Store.unitWords(1); u.slice(0, 9).forEach(w => { for (let i = 0; i < 5; i++) Store.answer(w.id, true); }); return Store.finishUnitQuiz(1, 69).passed === false; })());
ok('精确 70% 通关', (() => { Store.resetUnit(1); const u = Store.unitWords(1); u.forEach(w => { for (let i = 0; i < 5; i++) Store.answer(w.id, true); }); return Store.finishUnitQuiz(1, 70).passed === true; })());
ok('重置后重复通关不重复发金币', Store.state.rewards.coins === 20 && Store.state.rewards.claimedUnits.filter(u => u === 1).length === 1);

// 旧预览可能留下不完整或错误类型的奖励字段，载入时应自愈且不丢学习记录。
const malformedRewardState = JSON.parse(win.localStorage.getItem('wordmaster.harvey.v1'));
malformedRewardState.rewards = { coins: 'bad', claimedUnits: '1' };
win.localStorage.setItem('wordmaster.harvey.v1', JSON.stringify(malformedRewardState));
Store.load();
ok('损坏的奖励字段自动修复', Store.state.rewards.coins === 20 && Array.isArray(Store.state.rewards.claimedUnits));
ok('奖励字段修复后保留通关记录', Store.unitState(1).checked && Store.state.rewards.claimedUnits.includes(1));

section('6B. 每周 5 天打卡奖励');
const weeklyCoinsBefore = Store.state.rewards.coins;
['2026-08-03','2026-08-04','2026-08-05','2026-08-06'].forEach(d => Store.state.stats.days.push({ d, learned:1, right:0, wrong:0, m:0 }));
ok('每周打卡 4 天不会提前奖励', Store.checkWeeklyReward('2026-08-06') === 0 && Store.state.rewards.coins === weeklyCoinsBefore);
Store.state.stats.days.push({ d:'2026-08-07', learned:0, right:1, wrong:0, m:0 });
ok('每周第 5 个学习日奖励 100 金币', Store.checkWeeklyReward('2026-08-07') === 100 && Store.state.rewards.coins === weeklyCoinsBefore + 100);
ok('同一周不能重复领取奖励', Store.checkWeeklyReward('2026-08-07') === 0 && Store.state.rewards.claimedWeeks.filter(w => w === '2026-08-03').length === 1);
ok('每周打卡状态正确统计 5 天', (() => { const w = Store.weekInfo('2026-08-07'); return w.activeDays === 5 && w.rewarded; })());
ok('每周奖励提供庆祝提示', UI.weeklyRewardEarnedHtml().includes('+100') && !UI.weeklyRewardEarnedHtml());
ok('每周挑战固定显示 5 个打卡位', (() => { const d = win.document.createElement('div'); d.innerHTML = UI.weeklyChallenge(false); return d.querySelectorAll('.weekly-days i').length === 5 && d.textContent.includes('100'); })());

/* ================= 7. 家长导入 ================= */
section('7. 家长导入单词');
const before = Store.unitWords(2).length;
UI.mode = 'set'; UI.impTab = 'text'; UI.render();
$('#impUnit').value = '2';
$('#impList').value = 'kite /kaɪt/ 风筝 Fly a kite with Harvey.\nzebra /ˈzebrə/ 斑马 The zebra runs fast.';
UI.importWords();
ok('导入到 Unit 2 后词数 +2', Store.unitWords(2).length === before + 2);
ok('导入词自动进入 Unit 2', Store.state.words.find(w => w.w === 'kite') && Store.state.words.find(w => w.w === 'kite').u === 2);
ok('重复词被拒绝', (() => { const n0 = Store.unitWords(2).length; Store.add({ w: 'kite', m: 'x' }, 2); return Store.unitWords(2).length === n0; })());

/* ================= 8. 数据备份 ================= */
section('8. 导出 / 导入');
const txt = Store.exportJSON();
ok('导出 JSON 包含 words/unitState/stats/settings/rewards', (() => { const o = JSON.parse(txt); return !!o.words && !!o.unitState && !!o.stats && !!o.settings && Array.isArray(o.rewards.claimedWeeks); })());
ok('导入自身不重复', Store.importJSON(txt) === 0);
ok('损坏 JSON 抛错', (() => { try { Store.importJSON('{bad'); return false; } catch (e) { return true; } })());

/* ================= 9. 图表渲染 ================= */
section('9. 统计图表与学习日历');
// 注入 5 天的学习数据，让趋势和月历都能显示真实记录
const ds5 = (off) => { const p = n => (n < 10 ? '0' : '') + n; const d = new Date(); d.setDate(d.getDate() - off); return d.getFullYear() + '-' + p(d.getMonth() + 1) + '-' + p(d.getDate()); };
Store.state.stats.days = [{ d: ds5(4), learned: 3, right: 6, wrong: 1, m: 2 }, { d: ds5(3), learned: 5, right: 9, wrong: 2, m: 5 }, { d: ds5(2), learned: 2, right: 4, wrong: 0, m: 7 }, { d: ds5(1), learned: 4, right: 8, wrong: 1, m: 9 }, { d: ds5(0), learned: 3, right: 7, wrong: 0, m: 10 }];
UI.mode = 'stats'; UI.render();
const svgs = $('#view').querySelectorAll('svg');
ok('统计页至少 3 个 SVG 图表', svgs.length >= 3, '实际 ' + svgs.length);
ok('各单元掌握条：Unit 1 进度文字', $('#view').innerHTML.includes('Unit 1'));
ok('累计掌握趋势含面积路径', /<path d="M\d/.test($('#view').innerHTML));
ok('正确率环形存在', $('#view').innerHTML.includes('transform="rotate(-90'));
ok('学习日历显示真实月份和星期', $('#view .calendar-nav strong').textContent.length > 0 && $('#view').querySelectorAll('.calendar-weekday').length === 7);
ok('学习日历显示当月日期', $('#view').querySelectorAll('.calendar-day:not(.outside)').length >= 28);
ok('有学习记录的日期显示打卡', $('#view').querySelectorAll('.calendar-day.checked .calendar-mark').length >= 1);
ok('今天在日历中单独高亮', !!$('#view .calendar-day.today'));
const thisMonthLabel = $('#view .calendar-nav strong').textContent;
UI.changeCalendarMonth(-1);
ok('学习日历可以切换月份', $('#view .calendar-nav strong').textContent !== thisMonthLabel && !$('#view .calendar-nav button:last-child').disabled);
UI.changeCalendarMonth(1);

/* ================= 10. 设置 ================= */
section('10. 设置');
UI.set('accent', 'uk'); ok('口音可改为 en-GB', Store.state.settings.accent === 'uk');
UI.set('name', '小 Harvey'); ok('昵称可改', Store.state.settings.name === '小 Harvey');
UI.toggleAutoSpeak(); ok('自动朗读可关闭', Store.state.settings.autoSpeak === 0);
UI.toggleAutoSpeak(); ok('自动朗读可开启', Store.state.settings.autoSpeak === 1);

/* ================= 11. 锁定单元不可点击 ================= */
section('11. 锁定状态');
const lockedItem = $('#unitList').querySelectorAll('.uitem.locked').length;
ok('侧栏所有单元开放', lockedItem === 0, '实际 ' + lockedItem + '（U2 已被前面的 70% 通过解锁）');
UI.goUnit(7); // 尝试进入锁定的 U7
ok('可自由进入 Unit 7', UI.unit === 7);

/* ================= 12. 无 TTS 降级 ================= */
section('12. 降级与边界');
ok('无 speechSynthesis 时 speak 不报错', (() => { try { win.speak('test'); return true; } catch (e) { return false; } })());
Quiz.open('listen', Store.state.words.slice(0, 5));
ok('听力题在无 TTS 环境仍能开局', $('#game').classList.contains('show'));
Quiz.close(true);


section('13. 功能回归');
Store.resetAll();
const city = Store.state.words.find(w => w.w === 'city');
const tourist = Store.state.words.find(w => w.w === 'tourist');
Quiz.open('root', [city, tourist]);
ok('词根题过滤无拆解词', Quiz.qs.length === 1 && Quiz.qs[0].id === tourist.id);
ok('词根题标出目标', !!$('#game .root-target') && $('#game .q-sub').textContent.includes($('#game .root-target').textContent));
const options = [...win.document.querySelectorAll('#game .opt')].map(b => b.dataset.g);
ok('词根选项无重复', new Set(options).size === options.length);
Quiz.close(true);
Quiz.open('type', [city]);
$('#tin').value = city.w;
const rights = Store.state.stats.right;
Quiz.submitType(city.id); Quiz.submitType(city.id);
ok('重复提交只计分一次', Store.state.stats.right === rights + 1 && Quiz.right === 1 && Quiz.qi === 1);
Quiz.close(true);
Quiz.open('choice', [tourist]);
const distractors = Quiz.distractors(tourist, 300, w => w);
ok('选择题排除同词同义干扰项', distractors.every(w => w.w.toLowerCase() !== tourist.w.toLowerCase() && w.cn !== tourist.cn));
ok('干扰项彼此去重', new Set(distractors.map(w => w.w.toLowerCase())).size === distractors.length);
Quiz.close(true);
Store.markLearned(tourist.id);
Store.answer(tourist.id, true);
Store.ensureUnit(11, { title: '自定义单元' });
const custom = Store.add({w: 'testword', cn: '测试词'}, 11);
Store.markLearned(custom.id);
Store.answer(custom.id, true);
const backup = Store.exportJSON();
const oldId = tourist.id;
const statsBefore = JSON.stringify(Store.state.stats);
Store.state = Store.fresh();
Store.importJSON(backup);
const restored = Store.state.words.find(w => w.w === 'tourist');
ok('备份恢复保持新 ID 关联', restored.id !== oldId && Store.unitState(1).learned.includes(restored.id));
ok('备份恢复每日统计', JSON.stringify(Store.state.stats) === statsBefore);
ok('备份恢复扩展单元元信息', Store.state.unitMeta[11].title === '自定义单元');
ok('导入自身不会重复', Store.importJSON(Store.exportJSON()) === 0);
const snapshot = Store.exportJSON();
try { Store.importJSON(JSON.stringify({words: [{w: 'valid', u: 1}, {w: 123}]})); } catch {}
ok('无效单词备份不会部分写入', Store.exportJSON() === snapshot);
restored.parts = []; restored.story = ''; restored.fam = []; Store.save();
Store.load();
ok('旧记录自动补充词根', Store.byId(restored.id).parts.length > 0 && !!Store.byId(restored.id).story);
const deleted = Store.state.words.find(w => w.w === 'city');
Store.remove(deleted.id); Store.load();
ok('删除内置词后刷新不复活', !Store.unitWords(1).some(w => w.w === 'city'));
UI.drillScope = 'all'; UI.play('choice', 10);
ok('跨单元练习不计当前单元通关', !Quiz.opts.unit);
Quiz.close(true);
UI.startLearn(false);
UI.learnQueue = [{id: restored.id, again: 0}, {id: restored.id, again: 1}];
UI.finishLearn();
ok('学习完成数量去除重复复学', $('#game').textContent.includes('1 个新词'));
UI.quitLearn();
const pairWords = Store.state.words.slice(0, 2);
Quiz.open('match', pairWords);
Quiz.tapPair(pairWords[0].id, 'L');
Quiz.tapPair(pairWords[1].id, 'R');
ok('配对答错记录在选中的英文词', Quiz.wrongWords.includes(pairWords[0].id));
Quiz.mstate.busy = false; Quiz.mstate.sel = null;
for (const w of pairWords) { Quiz.tapPair(w.id, 'L'); Quiz.tapPair(w.id, 'R'); }
Quiz.result($('#game'));
ok('配对有错题不会结算为满分', Quiz.right === 1 && $('#game .score').textContent.startsWith('50'));
Quiz.close(true);
ok('自定义单元标题用于显示', Store.unitDef(11).title === '自定义单元');
ok('最终无运行期错误', errors.length === 0, errors.join(' | '));

/* ---------- 输出 ---------- */
console.log(results.join('\n'));
if (bugs.length) { console.log('\n[⚠ 待修问题]'); console.log(bugs.join('\n')); }
console.log('\n==================================');
console.log(`通过 ${pass} 项，失败 ${fail} 项，待修问题 ${bugs.length} 个`);
if (errors.length) console.log('运行期错误：\n' + errors.join('\n'));
process.exit(fail ? 1 : 0);
