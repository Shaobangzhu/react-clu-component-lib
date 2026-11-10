import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { createServer } from 'node:http';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
import { chromium } from 'playwright';
const consumer=resolve(process.argv[2]); const output=resolve(process.argv[3]);
const root=resolve(consumer,'dist');await mkdir(output,{recursive:true});
const consumerPackage=JSON.parse(await readFile(resolve(consumer,'package.json'),'utf8'));
const [packageName]=Object.keys(consumerPackage.dependencies).filter(name=>!['react','react-dom'].includes(name));
assert.equal(packageName,'@shaobangzhu/clu-ui');
const installed=JSON.parse(await readFile(resolve(consumer,'node_modules',packageName,'package.json'),'utf8'));
assert.equal(installed.name,packageName);assert.equal(installed.version,'0.1.0-rc.2');assert.equal(installed.license,'MIT');assert.equal(installed.private,false);
const css=await readFile(resolve(consumer,'node_modules',packageName,'dist/styles.css'),'utf8');
await assert.rejects(readFile(resolve(consumer,'node_modules/tailwindcss/package.json')));
assert(!/@import|@font-face|@property|:root|:host|\.card\b|\.table\b/.test(css));
// Lightning CSS can merge scoped branches into :is(...). Split only at
// top-level commas, then require every branch to remain below a theme host.
function selectorList(value) {
  const parts=[];let start=0;let depth=0;let quote='';let escaped=false;
  for(let index=0;index<value.length;index++) {
    const character=value[index];
    if(escaped){escaped=false;continue;}
    if(character==='\\'){escaped=true;continue;}
    if(quote){if(character===quote)quote='';continue;}
    if(character==='"'||character==="'"){quote=character;continue;}
    if(character==='('||character==='[')depth++;
    if(character===')'||character===']'){depth--;assert(depth>=0);}
    if(character===','&&depth===0){parts.push(value.slice(start,index).trim());start=index+1;}
  }
  assert.equal(depth,0);assert.equal(quote,'');parts.push(value.slice(start).trim());return parts;
}
function assertScoped(selector) {
  if(selector.startsWith(':is(')&&selector.endsWith(')')) {
    for(const branch of selectorList(selector.slice(4,-1)))assertScoped(branch);
    return;
  }
  const host=selector.match(/^\[data-clu-theme(?:=(?:"dark"|dark))?\]/);
  assert(host,`Unscoped selector: ${selector}`);
  const remainder=selector.slice(host[0].length);
  assert(remainder===''||/^[.:[#\s>]/.test(remainder),`Invalid theme compound: ${selector}`);
  let depth=0;let quote='';
  for(let index=0;index<remainder.length;index++) {
    const character=remainder[index];
    if(quote){if(character===quote&&remainder[index-1]!=='\\')quote='';continue;}
    if(character==='"'||character==="'"){quote=character;continue;}
    if(character==='('||character==='[')depth++;
    if(character===')'||character===']')depth--;
    if(depth===0&&/[\s>+~]/.test(character)) {
      assert(!/^[+~]/.test(remainder.slice(index).trimStart()),`Selector may escape theme host: ${selector}`);
      break;
    }
  }
}
for(const invalid of ['body',':is([data-clu-theme] .clu-control,button)','[data-clu-theme]+button',':is([data-clu-theme] .clu-control)~input'])assert.throws(()=>assertScoped(invalid));
for (const rule of css.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
  const selectors=rule[1].replace(/@layer[\w\s,-]+;/g,'').trim();
  for(const selector of selectorList(selectors))assertScoped(selector);
  for(const property of rule[2].matchAll(/(--[\w-]+)\s*:/g))assert.match(property[1],/^--clu-/);
}
const mime={'.html':'text/html','.js':'text/javascript','.css':'text/css'};
const server=createServer(async(req,res)=>{
  const path=new URL(req.url,'http://localhost').pathname;
  const file=resolve(root,`.${path==='/'?'/index.html':path}`);
  if(!file.startsWith(`${root}${sep}`)){res.writeHead(403).end();return;}
  try{res.setHeader('Content-Type',mime[extname(file)]??'application/octet-stream');res.end(await readFile(file));}
  catch{res.writeHead(404).end();}
});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const browser=await chromium.launch({headless:true});const results=[];
try {
  for(const viewport of [{width:1280,height:1000},{width:390,height:844}]) for(const theme of ['light','dark']) {
    const page=await browser.newPage({viewport,deviceScaleFactor:1,locale:'en-US',timezoneId:'UTC',reducedMotion:'reduce'});
    const errors=[];page.on('pageerror',error=>errors.push(error.message));
    await page.goto(`http://127.0.0.1:${server.address().port}`);
    if(theme==='dark')await page.getByRole('button',{name:'Use dark theme',exact:true}).click();
    await page.getByRole('button',{name:'Run browser checks',exact:true}).click();
    assert.match(await page.getByRole('status').textContent(),/^PASS:/);
    const note=page.getByRole('textbox',{name:'Synthetic note',exact:true});
    await note.fill('0');assert.equal(await note.inputValue(),'0');
    await note.fill('');assert.equal(await note.inputValue(),'');
    assert(await page.getByText('Controlled note: (empty)',{exact:true}).isVisible());
    await note.fill('Synthetic controlled note');
    await page.getByRole('button',{name:'Count 0',exact:true}).focus();await page.keyboard.press('Enter');
    assert(await page.getByRole('button',{name:'Count 1',exact:true}).isVisible());
    assert.equal(await note.inputValue(),'Synthetic controlled note');
    for(const name of ['Disabled action','Pending action'])assert(await page.getByRole('button',{name,exact:true}).isDisabled());
    assert.equal(await page.getByRole('button',{name:'Pending action',exact:true}).getAttribute('aria-busy'),'true');
    await note.focus();await page.keyboard.press('Tab');
    assert(await page.getByRole('textbox',{name:'Synthetic invalid reference',exact:true}).evaluate(el=>el===el.ownerDocument.activeElement));
    assert.equal(await page.getByRole('textbox',{name:'Synthetic invalid reference',exact:true}).getAttribute('aria-invalid'),'true');
    assert(await page.getByText('Blocked action calls: 0',{exact:true}).isVisible());
    assert(await page.getByText('Not yet verified',{exact:true}).isVisible());
    assert(await page.getByText('Synthetic review error. No provider was contacted.',{exact:true}).isVisible());
    await page.getByRole('radio',{name:'Summary',exact:true}).focus();await page.keyboard.press('ArrowRight');
    assert(await page.getByRole('radio',{name:'Detail',exact:true}).isChecked());
    const next=page.getByRole('button',{name:'Next page',exact:true});await next.focus();await page.keyboard.press('Enter');
    assert(await page.getByText('Showing 11–11 of 11 items',{exact:true}).isVisible());assert(await next.isDisabled());
    assert(await page.getByRole('table',{name:'Independent packed records'}).isVisible());
    await page.getByRole('button',{name:'Run browser checks',exact:true}).click();
    assert.match(await page.getByRole('status').textContent(),/^PASS:/);
    await page.screenshot({path:resolve(output,`${viewport.width}-${theme}-consumer.png`),fullPage:true,animations:'disabled'});
    const trigger=page.getByRole('button',{name:'Open packed dialog',exact:true});await trigger.click();
    const modal=page.getByRole('textbox',{name:'Modal note',exact:true});
    assert(await modal.evaluate(el=>el===el.ownerDocument.activeElement));assert(await page.locator('dialog').evaluate(el=>el.matches(':modal')));
    await modal.fill('Synthetic preserved draft');
    await page.getByRole('button',{name:'Cancel packed dialog',exact:true}).focus();await page.keyboard.press('Tab');
    assert(await page.getByRole('button',{name:'Close dialog',exact:true}).evaluate(el=>el===el.ownerDocument.activeElement));
    await page.keyboard.press('Shift+Tab');assert(await page.getByRole('button',{name:'Cancel packed dialog',exact:true}).evaluate(el=>el===el.ownerDocument.activeElement));
    await page.keyboard.press('Escape');assert(await page.getByRole('dialog').isHidden());assert(await trigger.evaluate(el=>el===el.ownerDocument.activeElement));
    await trigger.click();assert.equal(await modal.inputValue(),'Synthetic preserved draft');
    await page.screenshot({path:resolve(output,`${viewport.width}-${theme}-dialog.png`),animations:'disabled'});
    await page.getByRole('button',{name:'Cancel packed dialog',exact:true}).click();
    const dimensions=await page.locator('html').evaluate(el=>({viewport:el.ownerDocument.defaultView.innerWidth,documentWidth:el.scrollWidth}));
    assert(dimensions.documentWidth<=dimensions.viewport);assert.deepEqual(errors,[]);
    results.push({viewport,theme,hostSentinels:12,nativeRefs:5,controlledEmptyAndZero:true,disabledLoading:true,errorUnknown:true,nativeKeyboard:true,modalRestoreAndDraft:true,dimensions});await page.close();
  }
  const integrity=`sha512-${createHash('sha512').update(await readFile(resolve(consumer,'clu.tgz'))).digest('base64')}`;
  const lockSHA256=createHash('sha256').update(await readFile(resolve(consumer,'package-lock.json'))).digest('hex');
  await writeFile(resolve(output,'browser-results.json'),JSON.stringify({integrity,lockSHA256,browserVersion:browser.version(),cssScoped:true,tailwindRequired:false,contexts:results},null,2));
  console.log('PASS exact installed tarball browser contract: four desktop/mobile light/dark contexts; host sentinels, native refs, controlled values, states, keyboard and modal.');
} finally {await browser.close();await new Promise(resolve=>server.close(resolve));}
