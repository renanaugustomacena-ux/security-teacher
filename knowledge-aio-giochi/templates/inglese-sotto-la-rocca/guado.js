/* GUADO — «Sotto la Rocca», galleria 1: il guado dei carrelli.
   Loop: Frogger (ricerca/40.8) — salto sul carrello che porta la prossima parola della frase.
   Registro visivo: R4 Terra a strati (ricerca/42). Motore comune: kaio-engine.js.
   Espone window.GUADO = {W,H,CH,LESS,STRATA,TX,init,tune,reset,rebuild,update,draw,tap,key,remeasure,say}. */
(function(){
const G={};
const W=420,H=910,SURF=262,SOIL=40,TUN=74,LH=SOIL+TUN,HUDH=160;
const STRATA=['#E0A23A','#D2691E','#8B3A1E','#4B1E4B','#2E3A5C','#1F5148','#6B2D3A','#2C2C4A'];
const FONT='"Baloo 2","Nunito","Trebuchet MS",system-ui,sans-serif';
G.W=W;G.H=H;G.STRATA=STRATA;
function shade(hex,f){const n=parseInt(hex.slice(1),16),r=Math.min(255,Math.round((n>>16)*f)),g=Math.min(255,Math.round((n>>8&255)*f)),b=Math.min(255,Math.round((n&255)*f));return '#'+((1<<24)+(r<<16)+(g<<8)+b).toString(16).slice(1)}
function shuffle(a){a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));const t=a[i];a[i]=a[j];a[j]=t}return a}
function clean(t){return t.replace(/^[^A-Za-z0-9']+|[^A-Za-z0-9']+$/g,'')}

/* Morfologia minima: forme vicine della stessa parola, con il tipo di errore che insegnano. */
const VAR={is:['are','am','was'],are:['is','am','were'],am:['is','are'],was:['were','is'],were:['was','are'],
 has:['have','had'],have:['has','had'],had:['has','have'],do:['does','did'],does:['do','did'],did:['do','does'],
 "don't":["doesn't","didn't"],"doesn't":["don't","didn't"],"isn't":["aren't","wasn't"],"can't":["couldn't","cannot"],
 a:['an','the'],an:['a','the'],the:['a','an'],
 to:['too','two'],too:['to','two'],of:['off','for'],for:['of','from'],from:['for','of'],in:['on','at'],on:['in','at'],at:['in','on'],with:['without','by'],by:['with','be'],
 he:['she','him'],she:['he','her'],his:['her','him'],her:['his','she'],i:['me','my'],my:['me','mine'],me:['my','I'],they:['them','their'],their:['they','there'],there:['their','they'],we:['us','our'],our:['us','we'],you:['your','yours'],your:['you','yours'],it:['its',"it's"],its:['it',"it's"],
 than:['then','that'],then:['than','that'],quite:['quiet','quit'],very:['vary','every'],and:['end','an'],always:['never','all ways'],usually:['usual','usually']};
const KIND={agree:['is','are','am','was','were','has','have','had','do','does','did',"don't","doesn't","isn't","can't"],article:['a','an','the'],
 prep:['to','too','of','for','from','in','on','at','with','by'],pronoun:['he','she','his','her','i','my','me','they','their','there','we','our','you','your','it','its'],
 near:['than','then','quite','very','and','always','usually']};
function kindOf(l){for(const k in KIND)if(KIND[k].indexOf(l)>=0)return k;return 'agree'}
function morph(w){const l=w.toLowerCase();if(VAR[l])return {v:VAR[l],k:kindOf(l)};const out=[];
 if(/ies$/.test(l))out.push(l.slice(0,-3)+'y');else if(/(s|x|ch|sh)es$/.test(l))out.push(l.slice(0,-2));else if(/s$/.test(l)&&l.length>3)out.push(l.slice(0,-1));
 else if(/ing$/.test(l)&&l.length>5)out.push(l.slice(0,-3),l.slice(0,-3)+'ed');else if(/ed$/.test(l)&&l.length>4)out.push(l.slice(0,-2),l.slice(0,-2)+'ing');
 else if(/y$/.test(l)&&l.length>3)out.push(l.slice(0,-1)+'ies');else if(/(s|x|ch|sh)$/.test(l))out.push(l+'es');else out.push(l+'s');
 return {v:out.filter(x=>x!==l),k:'agree'}}
function matchCase(t,ref){if(!t)return t;if(t.toLowerCase()==='i')return 'I';const up=ref[0]!==ref[0].toLowerCase();return up?t[0].toUpperCase()+t.slice(1):t[0].toLowerCase()+t.slice(1)}

/* Passi della frase: una parola (o due, nei capitoli con le coppie) + i distrattori del passo. */
function buildSteps(en,cfg,pool){const words=en.split(/\s+/).map(t=>({raw:t,lab:clean(t)})).filter(w=>w.lab);
 const steps=[];for(let i=0;i<words.length;i++){
  if(cfg.chunks&&i<words.length-1&&Math.random()<.4&&words[i].lab.length+words[i+1].lab.length<13){steps.push({words:[words[i],words[i+1]]});i++}else steps.push({words:[words[i]]})}
 steps.forEach((s,i)=>{s.lab=s.words.map(w=>w.lab).join(' ');s.n=i});
 steps.forEach(s=>{const set={};set[s.lab.toLowerCase()]=1;const ds=[];
  const add=(t,k)=>{if(!t||ds.length>=cfg.dis)return;const key=t.toLowerCase();if(set[key])return;set[key]=1;ds.push({lab:matchCase(t,s.lab),k})};
  if(s.words.length===2){add(s.words[1].lab+' '+s.words[0].lab,'chunk');const m=morph(s.words[1].lab);if(m.v[0])add(s.words[0].lab+' '+m.v[0],'chunk')}
  else{if(cfg.variants){const m=morph(s.words[0].lab);shuffle(m.v).slice(0,cfg.dis>=3?2:1).forEach(v=>add(v,m.k))}
   if(cfg.near){const l=s.words[0].lab.toLowerCase();if(VAR[l]&&KIND.near.indexOf(l)>=0)add(VAR[l][0],'near')}}
  shuffle(steps.filter(o=>o!==s).map(o=>o.lab)).forEach(o=>add(o,'order'));
  shuffle(pool).forEach(p=>add(p,'other'));
  s.dis=ds});
 return steps}

/* Un livello del sottosuolo: la galleria con i carrelli in loop. */
function measure(self,lab){const m=self.mctx;m.font='700 17px '+FONT;return Math.max(88,Math.ceil(m.measureText(lab).width)+34)}
function makeLane(self,step,i,c){
 const items=shuffle([{lab:step.lab,ok:true}].concat(step.dis.map(d=>({lab:d.lab,ok:false,k:d.k}))));
 const L={i,dir:c.alt&&(i%2===1)?-1:1,speed:c.speed*self.vel*(.9+Math.random()*.2),carts:[],y:SURF+i*LH,step,t:0,frozen:false};
 L.carts=items.map(it=>({lab:it.lab,ok:it.ok,k:it.k||'order',w:measure(self,it.lab),x:-999,s:0,jolt:0,glow:0,L}));
 const gap=58;let loop=L.carts.reduce((a,k)=>a+k.w+gap,0);L.loop=Math.max(loop,W+200);
 let s=Math.random()*L.loop;for(const k of L.carts){k.s=s;s+=k.w+gap}
 return L}
function cartHeroX(c){return c.x+(c.L.dir>0?-(c.w/2-16):(c.w/2-16))}

/* Capitoli: una meccanica nuova ciascuno (ricerca/03 §3.4, modello del Chiosco). */
const CFG=[
 {alt:false,dis:2,variants:false,chunks:false,fade:false,near:false,speed:62,oil:1.2,hint:true},
 {alt:true,dis:2,variants:false,chunks:false,fade:false,near:false,speed:66,oil:1.1},
 {alt:true,dis:2,variants:true,chunks:false,fade:false,near:false,speed:68,oil:1.05},
 {alt:true,dis:2,variants:true,chunks:true,fade:false,near:false,speed:70,oil:1},
 {alt:true,dis:2,variants:true,chunks:false,fade:true,near:false,speed:74,oil:1},
 {alt:true,dis:3,variants:true,chunks:false,fade:true,near:true,speed:78,oil:.95},
 {alt:true,dis:3,variants:true,chunks:true,fade:true,near:true,speed:90,oil:.9},
 {alt:true,dis:3,variants:true,chunks:true,fade:true,near:true,speed:96,oil:.85}];
const CHT=[['Il salto','The hop'],['Contromano','Two ways'],['La forma giusta','The right form'],['Due parole insieme','Two words at once'],['Il cartello si spegne','The sign goes dark'],['Il quarto carrello','The fourth cart'],['A raffica','Rapid fire'],['La galleria intera','The whole gallery']];
G.LESS=[['Descrivere persone','Describing people'],['Routine quotidiana','Daily routines'],['Opinioni e preferenze','Opinions and preferences'],['Cibo e vita sociale','Food and social life']];
G.CH=CFG.map((c,i)=>({t:CHT[i],titles:[1,2,3,4,5].map(n=>['Frase '+n,'Sentence '+n]),beats:[0,1,2,3,4].map(b=>Object.assign({b},c,{speed:c.speed*(b===4?.9:1+b*.03)}))}));

G.TX={it:{
 order:['L\'inglese va da sinistra a destra.','«{pick}» c\'è nella frase, ma non è ancora il suo momento: adesso tocca a «{word}».','Soggetto → verbo → il resto. Guarda cosa hai già raccolto e cerca ciò che viene subito dopo.'],
 agree:['La forma del verbo la decide il soggetto.','«{pick}» è la parola giusta nella forma sbagliata: qui serve «{word}».','Con he / she / it il verbo prende la -s (has, is, tends). Con I / you / we / they no.'],
 article:['a, an, the: tre parole piccole, tre lavori diversi.','Qui serve «{word}», non «{pick}».','a davanti a consonante, an davanti a vocale, the quando la cosa è già nota.'],
 prep:['La preposizione si impara con la parola che la segue.','Qui serve «{word}», non «{pick}».','at seven · on weekends · in the morning · for a run: impara la coppia, non la parola.'],
 pronoun:['Soggetto o possessivo?','Qui serve «{word}», non «{pick}».','he / she / they stanno prima del verbo; his / her / their stanno prima di un nome.'],
 near:['Si somigliano solo nel suono.','«{pick}» si legge quasi come «{word}», ma è un\'altra parola.','than confronta, then è il tempo · to è direzione, too è "anche" · quite è "piuttosto", quiet è "silenzioso".'],
 chunk:['Due parole, un ordine solo.','«{pick}» ha le parole giuste nell\'ordine sbagliato: si dice «{word}».','I verbi con particella tengono l\'ordine: wake up, go for, sleep in.'],
 other:['Quella parola viene da un\'altra frase.','«{pick}» non appartiene a questa frase: adesso serve «{word}».','Rileggi il cartello e cerca la parola che continua la frase, non quella che le somiglia.'],
 dark:['La lanterna si è spenta.','La frase intera era: «{en}»','Risali e riprova: i carrelli si sono rimescolati, le parole no.'],
 hint:'tocca il carrello con la parola giusta · ← → e spazio da tastiera'},
 en:{
 order:['English runs left to right.','"{pick}" is in the sentence, but not yet: "{word}" comes now.','Subject → verb → the rest. Look at what you have collected and find what comes right after.'],
 agree:['The subject decides the verb form.','"{pick}" is the right word in the wrong form: here you need "{word}".','With he / she / it the verb takes -s (has, is, tends). With I / you / we / they it does not.'],
 article:['a, an, the: three small words, three jobs.','Here you need "{word}", not "{pick}".','a before a consonant, an before a vowel, the when the thing is already known.'],
 prep:['Learn the preposition with the word that follows it.','Here you need "{word}", not "{pick}".','at seven · on weekends · in the morning · for a run: learn the pair, not the word.'],
 pronoun:['Subject or possessive?','Here you need "{word}", not "{pick}".','he / she / they go before the verb; his / her / their go before a noun.'],
 near:['They only sound alike.','"{pick}" reads almost like "{word}", but it is another word.','than compares, then is time · to is direction, too means "also" · quite is "rather", quiet is "silent".'],
 chunk:['Two words, one order.','"{pick}" has the right words in the wrong order: it is "{word}".','Particle verbs keep their order: wake up, go for, sleep in.'],
 other:['That word comes from another sentence.','"{pick}" does not belong here: now you need "{word}".','Read the sign again and look for the word that continues the sentence, not the one that resembles it.'],
 dark:['The lantern went out.','The whole sentence was: "{en}"','Climb back and try again: the carts were shuffled, the words were not.'],
 hint:'tap the cart with the right word · ← → and space on a keyboard'}};

const HERO={minatore:{hat:'#C0392B',lamp:'#FFE066',skin:'#F2C9A0',tunic:'#3B6EA5',legs:'#2A2A2A'},
 cavaliere:{hat:'#9AA5B1',lamp:'#FFE066',skin:'#F2C9A0',tunic:'#2E7D5B',legs:'#333333'},
 maga:{hat:'#6C3FA0',lamp:'#B7F0FF',skin:'#F2C9A0',tunic:'#4B2A7A',legs:'#2A2A2A',tall:true}};

G.init=function(self){self.mctx=document.createElement('canvas').getContext('2d');self.pat={};self.parts=[];self.lanes=[];self.steps=[];self.got=[];self.sent={en:'',it:''};self.cam=0;self.t=0;self.oil=1;self.fadeA=1;
 self.hero={at:0,on:null,x:W/2,y:SURF,hop:null,face:1,prev:null,pend:0,pendFn:null,sq:1};G.tune(self)};
G.tune=function(self){self.vel={lenta:.8,normale:1,veloce:1.25}[self.props.velocita]||1;self.pal=HERO[self.props.eroe]||HERO.minatore};
G.remeasure=function(self){for(const L of self.lanes)for(const c of L.carts)c.w=measure(self,c.lab)};

G.reset=function(self,beat){const c=self.cfg=self.BEATS[beat],ci=self.state.chapter||0;
 self.parts=[];self.fly=null;self.streak=0;self.sel=0;self.kb=false;self.cam=0;self.oil=1;self.t=0;self.dark=0;self.fadeA=1;self.doneT=0;self.finished=false;self.coachKind=null;
 const D=self.DATA,les=D?D.lessons[Math.floor(ci/2)%D.lessons.length]:null,item=les?les.items[((ci%2)*5+beat)%les.items.length]:null;
 self.sent=item||{en:'',it:''};
 const pool=les?les.items.filter(x=>x!==item).map(x=>x.en.split(/\s+/)).reduce((a,b)=>a.concat(b),[]).map(clean).filter(w=>w.length>2):[];
 self.steps=item?buildSteps(item.en,c,pool):[];
 self.lanes=self.steps.map((s,i)=>makeLane(self,s,i,c));
 self.N=self.lanes.length;self.depth=SURF+self.N*LH;
 self.hero={at:0,on:null,x:W/2,y:SURF,hop:null,face:1,prev:null,pend:0,pendFn:null,sq:1};
 self.got=[];self.budget=(6.5*self.N+10)*c.oil;self.strOff=beat;self.hint=c.hint&&beat===0?1:0};
G.rebuild=function(self){self.lanes=self.steps.map((s,i)=>makeLane(self,s,i,self.cfg));
 self.hero={at:0,on:null,x:W/2,y:SURF,hop:null,face:1,prev:null,pend:0,pendFn:null,sq:1};self.got=[];self.oil=1;self.dark=0;self.streak=0;self.fadeA=1;self.fly=null};

function hop(self,c,L){const h=self.hero;if(h.hop||h.pend>0||self.finished||self.dark)return;
 if(h.on)h.on.L.frozen=false;h.prev={at:h.at,on:h.on,x:h.x,y:h.y};
 h.hop={t:0,dur:.42,fx:h.x,fy:h.y,c,L};KAIO.snd(self,'whoosh');KAIO.burst(self.parts,h.x,h.y,6,'#C9A56B',{up:60,v0:30,v1:80,r:1.5})}
function hopTo(self,x,y,fn){const h=self.hero;if(h.on)h.on.L.frozen=false;h.hop={t:0,dur:.5,fx:h.x,fy:h.y,x,y,fn,arc:80};KAIO.snd(self,'whoosh')}
function land(self,hp){const h=self.hero;
 if(!hp.c){h.on=null;h.x=hp.x;h.y=hp.y;if(hp.fn)hp.fn();return}
 const c=hp.c,L=hp.L;h.on=c;L.frozen=true;h.x=cartHeroX(c);h.y=L.y+SOIL+18;
 if(hp.back){h.at=hp.at;return}
 if(c.ok){h.at=L.i+1;self.got.push(L.step.lab);self.streak=0;self.hint=0;
  KAIO.snd(self,'pop',{hz:360+h.at*40});KAIO.burst(self.parts,c.x,L.y+SOIL+18,10,'#E7C98F',{up:50,v0:40,v1:120});
  self.fly={lab:L.step.lab,x:c.x,y:L.y+SOIL+30-self.cam,t:0};
  if(h.at>=self.N){h.pend=.55;h.pendFn=()=>hopTo(self,W/2-46,self.depth+108,()=>finish(self))}}
 else{c.jolt=.5;self.hitstop=60;KAIO.snd(self,'thud');KAIO.snd(self,'click',{hz:900,v:.25});KAIO.burst(self.parts,c.x,L.y+SOIL+60,8,'#FFB347',{up:20,v0:60,v1:160,r:1.2});
  self.streak++;if(self.streak>=2){const ok=L.carts.filter(k=>k.ok)[0];if(ok)ok.glow=1}
  if(self.streak>=3){self.coachKind=c.k||'order';self.setState({coach:{kind:self.coachKind,pick:c.lab,word:L.step.lab}})}
  h.pend=.6;h.pendFn=()=>{const p=h.prev;L.frozen=false;KAIO.snd(self,'whoosh');
   if(p.on)h.hop={t:0,dur:.42,fx:h.x,fy:h.y,c:p.on,L:p.on.L,back:true,at:p.at};
   else h.hop={t:0,dur:.42,fx:h.x,fy:h.y,x:p.x,y:p.y,fn:()=>{h.at=p.at}}}}}
function finish(self){self.finished=true;KAIO.snd(self,'chime',{notes:[523,659,784,1046]});KAIO.burst(self.parts,W/2+44,self.depth+78,26,'#FFD700',{up:140,v0:60,v1:200,r:2});G.say(self,self.sent.en);self.doneT=1.5}

G.say=function(self,text){if(self.state.muted||!window.speechSynthesis||!text)return;try{const u=new SpeechSynthesisUtterance(text);u.lang='en-GB';u.rate=.92;
 const vs=speechSynthesis.getVoices();const v=vs.filter(v=>/^en[-_](GB|US)/i.test(v.lang))[0]||vs.filter(v=>/^en/i.test(v.lang))[0];if(v)u.voice=v;speechSynthesis.cancel();speechSynthesis.speak(u)}catch(e){}};

G.update=function(self,dt){self.t+=dt;const h=self.hero;
 for(const L of self.lanes){if(!L.frozen)L.t+=L.dir*L.speed*dt;for(const c of L.carts){c.jolt=Math.max(0,c.jolt-dt*1.6);c.x=((c.s+L.t)%L.loop+L.loop)%L.loop-130+c.w/2}}
 if(h.on&&!h.hop){h.x=cartHeroX(h.on);h.y=h.on.L.y+SOIL+18;h.face=h.on.L.dir}
 if(h.hop){const hp=h.hop;hp.t+=dt;const k=Math.min(1,hp.t/hp.dur),e=k*k*(3-2*k);const tx=hp.c?cartHeroX(hp.c):hp.x,ty=hp.c?hp.L.y+SOIL+18:hp.y;
  h.x=hp.fx+(tx-hp.fx)*e;h.y=hp.fy+(ty-hp.fy)*e-Math.sin(Math.PI*k)*(hp.arc||64);if(Math.abs(tx-hp.fx)>4)h.face=tx>hp.fx?1:-1;
  h.sq=k<.2?1+.15*(1-k/.2):k>.8?1-.18*((k-.8)/.2):1;
  if(k>=1){h.hop=null;h.sq=1;land(self,hp)}}
 if(h.pend>0){h.pend-=dt;if(h.pend<=0){h.pend=0;const f=h.pendFn;h.pendFn=null;if(f)f()}}
 if(!self.finished&&!self.dark&&self.N>0){self.oil-=dt/self.budget;if(self.oil<=0){self.oil=0;self.dark=1;KAIO.snd(self,'whir');self.coachKind='dark';self.setState({coach:{kind:'dark'}})}}
 if(self.fly){self.fly.t+=dt;if(self.fly.t>.5)self.fly=null}
 self.parts=KAIO.parts(self.parts,dt,420);
 const maxCam=Math.max(0,self.depth+150-H),tgt=Math.max(0,Math.min(maxCam,h.y-430));self.cam+=(tgt-self.cam)*Math.min(1,dt*5);
 if(self.doneT>0){self.doneT-=dt;if(self.doneT<=0){self.doneT=0;self.setState({done:true})}}
 if(self.cfg&&self.cfg.fade){const want=self.got.length>=3?.16:1;self.fadeA+=(want-self.fadeA)*Math.min(1,dt*2)}};

G.tap=function(self,p){const h=self.hero;if(h.hop||h.pend>0||self.finished||self.dark||h.at>=self.N)return;
 const L=self.lanes[h.at],wy=p.y+self.cam;if(Math.abs(wy-(L.y+SOIL+TUN/2))>66)return;
 let best=null,bd=1e9;for(const c of L.carts){const d=Math.abs(p.x-c.x);if(d<c.w/2+14&&d<bd){bd=d;best=c}}
 if(best){self.kb=false;hop(self,best,L)}else KAIO.snd(self,'click',{hz:500,v:.12})};
function visible(L){return L.carts.filter(c=>c.x>-c.w/2&&c.x<W+c.w/2).sort((a,b)=>a.x-b.x)}
G.key=function(self,e){const h=self.hero;if(h.at>=self.N||self.finished||self.dark)return;const L=self.lanes[h.at],vis=visible(L);if(!vis.length)return;
 if(e.key==='ArrowLeft'){self.kb=true;self.sel=(self.sel-1+vis.length)%vis.length;e.preventDefault()}
 else if(e.key==='ArrowRight'){self.kb=true;self.sel=(self.sel+1)%vis.length;e.preventDefault()}
 else if(e.key===' '||e.key==='Enter'||e.key==='ArrowDown'){e.preventDefault();hop(self,vis[Math.min(self.sel,vis.length-1)],L)}
 else if(/^[1-4]$/.test(e.key)){const i=parseInt(e.key,10)-1;if(vis[i])hop(self,vis[i],L)}};

/* ---------- disegno ---------- */
function pattern(self,x,col){if(self.pat[col])return self.pat[col];const c=document.createElement('canvas');c.width=c.height=18;const g=c.getContext('2d');g.fillStyle=shade(col,.78);
 [[3,4],[11,2],[7,11],[15,13]].forEach(p=>{g.fillRect(p[0],p[1],2,2)});return self.pat[col]=x.createPattern(c,'repeat')}
function drawSurface(self,x){const sky=x.createLinearGradient(0,0,0,SURF);sky.addColorStop(0,'#0B1026');sky.addColorStop(1,'#243063');x.fillStyle=sky;x.fillRect(0,-40,W,SURF+40);
 x.fillStyle='rgba(255,255,255,.8)';for(let i=0;i<34;i++){x.globalAlpha=.3+((i*7)%10)/14;x.fillRect((i*137)%W,HUDH+((i*71)%(SURF-HUDH-70)),1.5,1.5)}x.globalAlpha=1;
 x.fillStyle='#F3EBD3';x.beginPath();x.arc(334,196-70,17,0,6.283);x.fill();x.fillStyle='#243063';x.beginPath();x.arc(343,190-70,14,0,6.283);x.fill();
 x.fillStyle='#0A0B16';x.fillRect(18,SURF-78,132,78);x.fillRect(10,SURF-104,30,104);x.fillRect(128,SURF-116,30,116);
 for(let i=0;i<4;i++)x.fillRect(48+i*22,SURF-86,12,10);for(let i=0;i<2;i++){x.fillRect(12+i*12,SURF-112,8,10);x.fillRect(130+i*12,SURF-124,8,10)}
 x.fillStyle='#FFD27A';x.fillRect(139,SURF-94,4,6);x.fillRect(22,SURF-70,4,6);
 x.fillStyle='#3B6B3A';x.fillRect(0,SURF-8,W,8);x.fillStyle='#2F5630';for(let i=0;i<W;i+=9)x.fillRect(i,SURF-8-((i*7)%3),3,3);
 x.fillStyle='#5A3A22';x.fillRect(W/2-46,SURF-54,8,54);x.fillRect(W/2+38,SURF-54,8,54);x.fillRect(W/2-52,SURF-60,104,8);
 x.fillStyle='#3A2A1E';x.fillRect(W/2-1,SURF-52,2,14);x.fillStyle='#FFB300';x.fillRect(W/2-4,SURF-40,8,10);
 x.fillStyle='#120E0B';x.fillRect(W/2-34,SURF,68,SOIL+2)}
function drawStrata(self,x){self.lanes.forEach((L,i)=>{const col=STRATA[(i+self.strOff)%STRATA.length];x.fillStyle=col;x.fillRect(0,L.y,W,LH);x.fillStyle=pattern(self,x,col);x.fillRect(0,L.y,W,LH);
  const ty=L.y+SOIL;x.fillStyle='#120E0B';x.fillRect(0,ty,W,TUN);x.fillStyle=shade(col,.55);x.fillRect(0,ty,W,3);x.fillRect(0,ty+TUN-3,W,3);
  x.fillStyle='#3A2A1E';for(let k=6;k<W;k+=30)x.fillRect(k,ty+63,14,5);x.fillStyle='#7C7C84';x.fillRect(0,ty+62,W,2);x.fillRect(0,ty+66,W,1.5)});
 const col=STRATA[(self.N+self.strOff)%STRATA.length],y0=self.depth;x.fillStyle=col;x.fillRect(0,y0,W,170);x.fillStyle=pattern(self,x,col);x.fillRect(0,y0,W,170);
 x.fillStyle='#0F0C0A';KAIO.rr(x,44,y0+8,W-88,122,18);x.fill();x.fillStyle='#3A2A1E';x.fillRect(56,y0+108,W-112,8);
 x.fillStyle='#2A1A10';KAIO.rr(x,W-130,y0+40,52,70,[26,26,0,0]);x.fill();x.fillStyle='#5A3A22';x.fillRect(W-134,y0+40,4,70);x.fillRect(W-82,y0+40,4,70);
 x.fillStyle='#8B5A2B';x.fillRect(W/2+22,y0+80,44,28);x.fillStyle='#A0693A';KAIO.rr(x,W/2+22,y0+72,44,14,[6,6,0,0]);x.fill();x.fillStyle='#FFD700';x.fillRect(W/2+40,y0+72,8,36);x.fillStyle='#3A2A1E';x.fillRect(W/2+41,y0+86,6,8)}
function drawCart(x,c,ty,glow,sel,t){const w=c.w,jx=c.jolt?(Math.random()*2-1)*7*c.jolt:0,bx=c.x-w/2+jx,top=ty+18;
 [bx+w*.24,bx+w*.76].forEach(wx=>{x.fillStyle='#1E1E22';x.beginPath();x.arc(wx,ty+54,8,0,6.283);x.fill();x.strokeStyle='#8A8A92';x.lineWidth=1.5;x.beginPath();x.moveTo(wx-6,ty+54);x.lineTo(wx+6,ty+54);x.moveTo(wx,ty+48);x.lineTo(wx,ty+60);x.stroke()});
 x.fillStyle='#4A3A33';x.beginPath();x.moveTo(bx-3,top);x.lineTo(bx+w+3,top);x.lineTo(bx+w-6,ty+48);x.lineTo(bx+6,ty+48);x.closePath();x.fill();
 x.fillStyle='#6B5A50';x.fillRect(bx-3,top,w+6,5);
 if(glow>0){x.shadowColor='#FFD27A';x.shadowBlur=14+8*Math.sin(t*6)*glow}
 x.fillStyle='#F3E2BF';KAIO.rr(x,bx+6,top+9,w-12,24,4);x.fill();x.shadowBlur=0;
 x.fillStyle='#2B1A10';x.font='700 17px '+FONT;x.textAlign='center';x.textBaseline='middle';x.fillText(c.lab,bx+w/2,top+21+(c.jolt?(Math.random()*2-1)*2:0));
 x.fillStyle='#8B5A2B';x.fillRect(bx+9,top+12,2,2);x.fillRect(bx+w-11,top+12,2,2);
 if(sel){x.fillStyle='#FFE9A8';x.beginPath();x.moveTo(c.x-7,top-12);x.lineTo(c.x+7,top-12);x.lineTo(c.x,top-4);x.fill()}}
function drawLane(self,x,L){const h=self.hero,ty=L.y+SOIL;const vis=self.kb&&h.at===L.i?visible(L):null;const selC=vis&&vis.length?vis[Math.min(self.sel,vis.length-1)]:null;
 for(const c of L.carts){if(c.x<-c.w/2-10||c.x>W+c.w/2+10)continue;const glow=c.ok&&(c.glow||(self.hint&&L.i===0))?1:0;drawCart(x,c,ty,glow,c===selC,self.t)}
 const gl=x.createLinearGradient(0,0,70,0);gl.addColorStop(0,'rgba(8,6,4,.95)');gl.addColorStop(1,'rgba(8,6,4,0)');x.fillStyle=gl;x.fillRect(0,ty+3,70,TUN-6);
 const gr=x.createLinearGradient(W,0,W-70,0);gr.addColorStop(0,'rgba(8,6,4,.95)');gr.addColorStop(1,'rgba(8,6,4,0)');x.fillStyle=gr;x.fillRect(W-70,ty+3,70,TUN-6)}
function drawHero(x,hx,hy,face,sq,pal,t){x.save();x.translate(hx,hy);x.scale(face*(2-sq),sq);
 x.fillStyle=pal.legs;x.fillRect(-7,-8,5,8);x.fillRect(2,-8,5,8);
 x.fillStyle=pal.tunic;KAIO.rr(x,-9,-22,18,15,3);x.fill();
 x.fillStyle=pal.skin;x.fillRect(8,-18,4,8);x.fillStyle='#3A2A1E';x.fillRect(9,-10,7,9);x.fillStyle=pal.lamp;x.fillRect(10,-9,5,7);
 x.fillStyle=pal.skin;KAIO.rr(x,-7,-34,14,13,4);x.fill();x.fillStyle='#1B1B1B';x.fillRect(1,-30,2,2);x.fillRect(5,-30,2,2);
 x.fillStyle=pal.hat;KAIO.rr(x,-9,-39,18,8,3);x.fill();x.fillRect(-9,-33,18,2);if(pal.tall){x.beginPath();x.moveTo(-9,-37);x.lineTo(0,-54);x.lineTo(9,-37);x.fill()}
 x.fillStyle=pal.lamp;x.fillRect(6,-38,4,4);x.restore()}
function wrap(x,text,px,py,maxW,lh,maxL){const words=text.split(' ');let line='',n=0;for(let i=0;i<words.length;i++){const test=line?line+' '+words[i]:words[i];
  if(x.measureText(test).width>maxW&&line){x.fillText(line,px,py+n*lh);n++;line=words[i];if(n>=maxL-1){let rest=words.slice(i).join(' ');while(x.measureText(rest+'…').width>maxW&&rest.length>2)rest=rest.slice(0,-1);if(rest!==words.slice(i).join(' '))rest+='…';x.fillText(rest,px,py+n*lh);return}}else line=test}
 x.fillText(line,px,py+n*lh)}
function drawHUD(self,x){const s=self.sent;x.fillStyle='#1B130D';x.fillRect(0,0,W,HUDH);x.fillStyle='#24190F';x.fillRect(0,0,W,96);
 x.fillStyle='rgba(0,0,0,.25)';x.fillRect(0,32,W,1);x.fillRect(0,64,W,1);x.fillStyle='#6B5A3F';[14,W-16].forEach(nx=>{x.beginPath();x.arc(nx,14,2.5,0,6.283);x.fill()});
 x.globalAlpha=self.fadeA;x.fillStyle='#F6E7C8';x.font='600 19px '+FONT;x.textAlign='left';x.textBaseline='alphabetic';wrap(x,s.it||'…',20,34,W-40,25,3);x.globalAlpha=1;
 x.fillStyle='#120C08';KAIO.rr(x,12,102,W-24,46,8);x.fill();
 x.font='700 15px '+FONT;x.textAlign='left';x.textBaseline='middle';let cx=24,cy=118;self.slot=null;
 self.steps.forEach((st,i)=>{const w=x.measureText(st.lab).width;if(cx+w>W-24&&cx>24){cx=24;cy+=20}
  if(i<self.got.length){x.fillStyle='#F6E7C8';x.fillText(st.lab,cx,cy)}
  else if(i===self.got.length){x.fillStyle='rgba(255,179,0,.95)';x.fillRect(cx,cy+7,w,3);self.slot={x:cx+w/2,y:cy}}
  else{x.fillStyle='rgba(246,231,200,.22)';x.fillRect(cx,cy+7,w,2)}
  cx+=w+10});
 if(self.fly&&self.slot){const f=self.fly,k=Math.min(1,f.t/.5),e=1-Math.pow(1-k,3),fx=f.x+(self.slot.x-f.x)*e,fy=f.y+(self.slot.y-f.y)*e;
  x.globalAlpha=1-k*.4;x.fillStyle='#FFE9A8';x.font='700 17px '+FONT;x.textAlign='center';x.fillText(f.lab,fx,fy);x.globalAlpha=1}
 x.fillStyle='#3A2A1E';x.fillRect(20,153,W-52,4);const low=self.oil<.25;x.globalAlpha=low?.6+.4*Math.sin(self.t*22):1;x.fillStyle=low?'#FF9F1C':'#FFB300';x.fillRect(20,153,(W-52)*self.oil,4);x.globalAlpha=1;
 x.fillStyle='#3A2A1E';x.fillRect(W-22,148,9,12);x.fillStyle=low?'#FF9F1C':'#FFB300';x.fillRect(W-20,150,5,8)}
G.draw=function(self,x){const h=self.hero;x.setTransform(self.sc,0,0,self.sc,0,0);x.clearRect(0,0,W,H);
 x.save();x.translate(0,-self.cam);
 drawSurface(self,x);drawStrata(self,x);for(const L of self.lanes)drawLane(self,x,L);
 drawHero(x,h.x,h.y,h.face,h.sq||1,self.pal,self.t);KAIO.drawParts(x,self.parts);
 x.globalCompositeOperation='lighter';const g=x.createRadialGradient(h.x,h.y-18,10,h.x,h.y-18,170);g.addColorStop(0,'rgba(255,190,90,.28)');g.addColorStop(1,'rgba(255,190,90,0)');x.fillStyle=g;x.fillRect(h.x-170,h.y-190,340,340);x.globalCompositeOperation='source-over';
 x.restore();
 if(self.dark){x.fillStyle='rgba(0,0,0,.72)';x.fillRect(0,0,W,H)}
 drawHUD(self,x)};
window.GUADO=G;
})();
