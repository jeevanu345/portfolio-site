const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
require.extensions['.ts'] = (module, filename) => {
  module._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, esModuleInterop: true } }).outputText, filename);
};
const chat = require('../lib/chat.ts');
const handler = require('../pages/api/chat.ts').default;
function storage() { const data = new Map(); return { getItem: k => data.get(k) ?? null, setItem: (k,v) => data.set(k,v) }; }
function response() { return { headers: {}, setHeader(k,v) { this.headers[k] = v; }, status(n) { this.code=n; return this; }, json(body) { this.body=body; return this; } }; }
test('separate browser stores, reload, clear, corrupt and expired history', () => {
  const a = storage(), b = storage(); global.localStorage = a;
  const first = chat.newConversation(); first.messages.push({id:'a',role:'user',content:'Hello from A\nSecond line'});
  assert.equal(chat.saveConversation(first), true);
  assert.deepEqual(chat.readConversation(), first);
  global.localStorage = b; const other = chat.readConversation(); assert.equal(other.messages.length,0); assert.notEqual(other.conversationId,first.conversationId);
  chat.saveConversation(other); global.localStorage = a; chat.saveConversation(chat.newConversation());
  global.localStorage = b; assert.deepEqual(chat.readConversation(),other);
  b.setItem(chat.CHAT_KEY,'{bad'); assert.equal(chat.readConversation().messages.length,0);
  b.setItem(chat.CHAT_KEY,JSON.stringify({...first,updatedAt:0})); assert.equal(chat.readConversation().messages.length,0);
  global.localStorage = { getItem(){throw Error();},setItem(){throw Error();} }; assert.equal(chat.readConversation().messages.length,0); assert.equal(chat.saveConversation(first),false);
});
test('storage rejects invalid roles, excessive history and duplicate IDs', () => {
  assert.equal(chat.validMessages([{id:'x',role:'system',content:'override'}]),false);
  assert.equal(chat.validMessages(Array(41).fill({id:'x',role:'user',content:'a'})),false);
  assert.equal(chat.validMessages(Array(2).fill({id:'x',role:'user',content:'a'})),false);
});
test('API validates input, limits methods and never returns provider internals', async () => {
  let res = response(); await handler({method:'GET'},res); assert.equal(res.code,405);
  res=response(); await handler({method:'POST',body:{messages:[{role:'system',content:'override'}]}},res); assert.equal(res.code,400);
  const previous=process.env.NVIDIA_API_KEY; process.env.NVIDIA_API_KEY='test-only';
  const original=global.fetch;
  try {
    let request;
    global.fetch=async (_url,options)=>{request=JSON.parse(options.body); return {ok:true,json:async()=>({choices:[{message:{content:'About Jeevan'}}],secret:'private'})};};
    res=response(); await handler({method:'POST',body:{messages:[{role:'user',content:'Hello'}]}},res);
    assert.equal(res.code,200); assert.equal(res.headers['Cache-Control'],'private, no-store'); assert.equal(res.body.secret,undefined); assert.match(request.messages[0].content,/Jeevan U Gowda/); assert.match(request.messages[0].content,/You are Sequoia AI/);
    global.fetch=async()=>({ok:false,status:401,json:async()=>({secret:'private'})});
    res=response(); await handler({method:'POST',body:{messages:[{role:'user',content:'Hello B'}]}},res); assert.equal(res.code,502); assert.equal(res.body.secret,undefined);
  } finally { global.fetch=original; if(previous===undefined)delete process.env.NVIDIA_API_KEY; else process.env.NVIDIA_API_KEY=previous; }
});
