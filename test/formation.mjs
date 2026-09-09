/** 全词库内容、旧数据升级与所有学习卡渲染回归：node test/formation.mjs */
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire('/Users/huzhengxi/.workbuddy/binaries/node/workspace/');
const { JSDOM } = require('jsdom');
const dom = new JSDOM(fs.readFileSync(path.join(root, 'index.html'), 'utf8'), {url:'http://localhost/', runScripts:'outside-only'});
const win = dom.window;
win.confirm = () => true;
const source = ['data.js','store.js','quiz.js','app.js'].map(f => fs.readFileSync(path.join(root,f),'utf8')).join('\n;\n');
win.eval(source + ';Object.assign(window,{Store,UI,Quiz,UNITS,WORD_FORMATION,FORMATION_KIND});');
const {Store,UI,Quiz,UNITS,WORD_FORMATION,FORMATION_KIND} = win;
Store.state.settings.autoSpeak = 0;
let checks = 0;
function check(label, fn) { fn(); checks++; console.log('✔ ' + label); }
const builtins = UNITS.flatMap(u => u.words);
const entries = Object.entries(WORD_FORMATION);
check('课本每一个词均有专门讲解，没有兜底文案冒充内容', () => {
  for (const w of builtins) {
    assert.ok(w.story.length >= 20, w.w);
    assert.ok(FORMATION_KIND[w.formationKind], w.w);
    assert.ok(!/暂无|待补充|尚未收录/.test(w.story), w.w);
    assert.ok(w.fam.length > 0, w.w);
  }
  assert.equal(new Set(builtins.map(w=>w.w.toLowerCase())).size, entries.length);
});
check('拆分拼回原词；无空词素、无未知类型', () => {
  for (const [word, e] of entries) {
    if (e.parts.length) assert.equal(e.parts.map(p=>p.p).join('').toLowerCase(), word, word);
    for (const p of e.parts) {
      assert.ok(p.p && p.g, word);
      assert.ok(['pre','root','suf','word'].includes(p.k), word);
    }
  }
});
check('历史词源和词根均保留具体参考来源', () => {
  for (const [w,e] of entries.filter(([,e])=>['origin','root'].includes(e.formationKind))) {
    assert.ok(e.formationSources.length > 0, w);
    assert.ok(e.formationSources.every(s=>s.startsWith('https://')),w);
  }
});
check('communicate 和 communication 覆盖共享词根及词尾变化', () => {
  assert.ok(WORD_FORMATION.communicate.story.includes('communicare'));
  assert.ok(WORD_FORMATION.communicate.parts.some(p=>p.k==='root' && p.p==='communic'));
  assert.ok(WORD_FORMATION.communication.story.includes('-ion'));
});
check('历史上的复杂词形不生成伪拆分题', () => {
  for (const w of ['history','understand','vegetable','window','distance']) assert.equal(WORD_FORMATION[w].parts.length,0,w);
  assert.ok(WORD_FORMATION.history.story.includes('不是 his + story'));
  assert.ok(WORD_FORMATION.understand.story.includes('不同解释'));
});
check('全部学习卡和详情页实际渲染讲解及相关词', () => {
  for (const w of Store.state.words) {
    UI.detailSheet(w.id);
    assert.ok(win.document.querySelector('#modal').textContent.includes(w.story),w.w);
    assert.ok(win.document.querySelector('#modal').textContent.includes(UI.formationTitle(w)),w.w);
    UI.closeSheet();
    UI.learnQueue = [{id:w.id}]; UI.learnIdx=0; UI.learnMax=1;
    UI.renderLearn(); UI.flip();
    assert.ok(win.document.querySelector('#flip .back').textContent.includes(w.story),w.w);
    assert.ok(!win.document.querySelector('#flip .back').textContent.includes('暂无已核实'),w.w);
  }
  UI.quitLearn();
});
check('Phonics 根据音标出题，不依赖词根拆解', () => {
  Quiz.open('phonics',Store.state.words);
  assert.ok(Quiz.pool.length > 28);
  for (const w of Quiz.pool) {
    const el = win.document.createElement('div'); el.innerHTML = Quiz.q_phonics(w);
    const opts = Array.from(el.querySelectorAll('.sound-option')).map(b => b.dataset.block);
    assert.equal(opts.length, 4);
    assert.equal(opts.length, new Set(opts).size, w.w);
    assert.ok(opts.includes(Quiz.soundAnswer), w.w);
    assert.ok(w.w.toLowerCase().startsWith(Quiz.soundAnswer));
  }
  Quiz.close(true);
});
check('旧浏览器数据补齐所有词，保留 ID、进度、统计和例句', () => {
  const w=Store.state.words.find(w=>w.w==='communicate');
  Store.markLearned(w.id);Store.answer(w.id,true);w.ex='We communicate every day.';
  const progress=JSON.stringify({id:w.id,status:w.status,level:w.level,next:w.next,right:w.right,ex:w.ex,stats:Store.state.stats,units:Store.state.unitState});
  for(const word of Store.state.words){word.story='';word.parts=[];word.fam=[];delete word.formationKind;delete word.formationSources;}
  Store.save();Store.load();
  const after=Store.byId(w.id);
  assert.equal(JSON.stringify({id:after.id,status:after.status,level:after.level,next:after.next,right:after.right,ex:after.ex,stats:Store.state.stats,units:Store.state.unitState}),progress);
  assert.ok(Store.state.words.every(w=>w.story && w.formationKind));
});
check('加载升级是幂等的', () => {
  const snapshot=Store.exportJSON();Store.load();assert.equal(Store.exportJSON(),snapshot);
});
check('同词跨单元、大小写不同也能获得讲解', () => {
  const w=Store.add({w:'COMMUNICATE',cn:'交流'},12);
  assert.equal(w.story,WORD_FORMATION.communicate.story);
  Store.save();Store.load();assert.equal(Store.byId(w.id).formationKind,'root');
});
check('Excel/OCR 解析结果导入后立即补资料，无需刷新', () => {
  Store.importParsed([{u:13,w:'geography',cn:'地理'}]);
  assert.ok(Store.unitWords(13)[0].story.includes('geo-'));
});
check('旧备份恢复后立即补资料，无需刷新', () => {
  Store.importJSON(JSON.stringify({words:[{u:14,w:'describe',cn:'描述',id:'old',parts:[],story:'',fam:[]}]}));
  assert.ok(Store.unitWords(14)[0].story.includes('scrib-'));
});
check('只有拆分、缺讲解的旧记录也能补齐', () => {
  const w=Store.state.words.find(w=>w.w==='communicate');
  w.story='';Store.enrichWord(w);assert.equal(w.story,WORD_FORMATION.communicate.story);
});
check('自定义讲解、词族不被升级覆盖或错误标注来源', () => {
  const w=Store.state.words.find(w=>w.w==='communicate');
  w.story='这是家长自己编写的记忆笔记';w.fam=[{w:'custom',cn:'自定义'}];
  Store.save();Store.load();
  const after=Store.byId(w.id);
  assert.equal(after.story,w.story);assert.equal(after.fam[0].w,'custom');assert.equal(after.formationSources,undefined);
});
check('未知导入词不使用后缀猜测编造词根', () => {
  const w=Store.add({w:'notarealwordation',cn:'测试'},15);
  assert.equal(w.story,'');assert.equal(w.parts.length,0);
});
check('来源链接不接受可执行地址，也不执行注入的讲解', () => {
  assert.equal(UI.formationSources({formationSources:['javascript:alert(1)']}),'');
  const w=Store.add({w:'testcontent',cn:'测试',story:'<img src=x onerror=alert(1)>'},16);
  UI.detailSheet(w.id);
  assert.equal(win.document.querySelector('#modal img'),null);
  UI.closeSheet();
});
console.log(`全词库：${builtins.length} 条记录、${entries.length} 个不同词；${checks} 组回归检查全部通过。`);
dom.window.close();
