/* TAVERNA — «Sotto la Rocca», galleria 2: la taverna.
   Loop: Tapper (ricerca/41.7 ★★★) — servo al cliente la frase inglese che risponde a ciò che chiede, prima che arrivi in fondo al bancone.
   Registro visivo: R10 Fiera e baraccone (ricerca/42). Motore comune: kaio-engine.js. Espone window.TAVERNA. */
(function(){
const G={};
const W=420,H=910,LT=160,LHT=126,TY=664,ENDX=W-124;
const FONT='"Baloo 2","Nunito","Trebuchet MS",system-ui,sans-serif',SLAB='"Alfa Slab One","Baloo 2",serif';
const SLOTS=[[14,676],[220,676],[14,792],[220,792]],CW=186,CH=104;
G.W=W;G.H=H;
function shuffle(a){a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));const t=a[i];a[i]=a[j];a[j]=t}return a}
const PALS=[{hat:'#C0392B',body:'#E67E22',skin:'#F2C9A0'},{hat:'#6C3FA0',body:'#4B2A7A',skin:'#F2C9A0',tall:true},{hat:'#9AA5B1',body:'#5D6D7E',skin:'#F2C9A0'},
 {hat:'#2E8B57',body:'#1D4E89',skin:'#D9A066',hood:true},{hat:'#FFC72C',body:'#C8102E',skin:'#8D5524'},{hat:'#1D4E89',body:'#2E8B57',skin:'#F2C9A0',beard:'#C0392B'}];

/* Capitoli: una meccanica nuova ciascuno. lanes banconi · cards frasi sul vassoio · sim clienti insieme · need clienti da servire · walk px/s · arrive s */
const CFG=[
 {lanes:1,cards:2,sim:1,need:4,walk:11,arrive:5.5},
 {lanes:2,cards:3,sim:2,need:5,walk:12,arrive:5},
 {lanes:3,cards:3,sim:2,need:6,walk:13,arrive:4.5},
 {lanes:3,cards:4,sim:3,need:6,walk:14,arrive:4,change:true},
 {lanes:4,cards:4,sim:3,need:7,walk:15,arrive:3.6},
 {lanes:4,cards:4,sim:4,need:8,walk:17,arrive:3.2,change:true}];
const CHT=[['Il primo cliente','The first customer'],['Due banconi','Two counters'],['La fila','The queue'],['Il ripensamento','Second thoughts'],['Il vassoio pieno','The full tray'],['La serata intera','The whole evening']];
G.LESS=[['Saluti e presentazioni','Greetings'],['Frasi essenziali','Essential phrases'],['Verbi di ogni giorno','Everyday verbs']];
G.CH=CFG.map((c,i)=>({t:CHT[i],titles:[1,2,3,4,5].map(n=>['Turno '+n,'Round '+n]),beats:[0,1,2,3,4].map(b=>Object.assign({b},c,{need:c.need+Math.floor(b/2),walk:c.walk*(b===4?.92:1+b*.05)}))}));

G.TX={it:{
 wrong:['Non è quello che ha chiesto.','Hai servito «{pick}», ma il cliente voleva dire «{it}»: in inglese si dice «{word}».','Le frasi si imparano intere, come si servono: leggi il fumetto, poi cerca la frase che dice la stessa cosa.'],
 change:['Il cliente ha cambiato idea.','Ora nel fumetto c\'è «{it}»: la frase da servire è «{word}», non «{pick}».','Si serve quello che chiede adesso, non quello che aveva chiesto entrando.'],
 lost:['Tre clienti sono andati via.','Le frasi di stasera erano tutte sul vassoio: quando un cliente entra, la sua frase compare lì.','Guarda il bancone più affollato per primo: chi è più vicino alla cassa è chi aspetta da più tempo.'],
 hint:'trascina la frase sul bancone del cliente · da tastiera: ← → frase, ↑ ↓ bancone, spazio'},
 en:{
 wrong:['That is not what they asked for.','You served "{pick}", but the customer meant "{it}": in English that is "{word}".','Phrases are learned whole, the way they are served: read the bubble, then find the phrase that says the same thing.'],
 change:['The customer changed their mind.','The bubble now says "{it}": the phrase to serve is "{word}", not "{pick}".','Serve what they ask for now, not what they asked for when they came in.'],
 lost:['Three customers left.','Tonight\'s phrases were all on the tray: when a customer walks in, their phrase appears there.','Look at the busiest counter first: the one nearest the till has waited longest.'],
 hint:'drag the phrase onto the customer\'s counter · keyboard: ← → phrase, ↑ ↓ counter, space'}};

G.init=function(self){self.parts=[];self.cust=[];self.cards=[];self.drag=null;self.slide=null;self.mctx=document.createElement('canvas').getContext('2d');self.keepLane=0;self.keepY=0;self.t=0;self.sel=-1;self.klane=0};
G.reset=function(self,beat){const c=self.cfg=self.BEATS[beat],ci=self.state.chapter||0;
 self.parts=[];self.cust=[];self.cards=[];self.drag=null;self.slide=null;self.t=0;self.served=0;self.lost=0;self.spawnT=1.2;self.sel=-1;self.klane=0;self.keepLane=0;self.keepY=LT;self.doneT=0;self.finished=false;self.coachKind=null;self.nid=0;
 const D=self.DATA,les=D?D.lessons[Math.floor(ci/2)%D.lessons.length]:null;self.items=les?les.items:[];
 let q=[];while(q.length<c.need&&self.items.length)q=q.concat(shuffle(self.items));self.queue=q.slice(0,c.need)};

function present(self){return self.cust.filter(k=>!k.served&&!k.gone)}
function freeSlot(self){for(let i=0;i<4;i++)if(!self.cards.some(k=>k.slot===i))return i;return -1}
function addCard(self,item){if(self.cards.some(k=>k.item===item))return;const s=freeSlot(self);if(s<0||self.cards.length>=self.cfg.cards)return;
 self.cards.push({item,slot:s,x:SLOTS[s][0],y:SLOTS[s][1],tx:SLOTS[s][0],ty:SLOTS[s][1],pop:1,glow:0})}
function topUp(self){const need=present(self).map(k=>k.item);
 for(const it of need){if(self.cards.some(k=>k.item===it))continue;
  if(self.cards.length>=self.cfg.cards){const f=self.cards.filter(k=>need.indexOf(k.item)<0)[0];if(f)self.cards=self.cards.filter(k=>k!==f)}
  addCard(self,it)}
 const used=self.cards.map(k=>k.item);const pool=shuffle(self.items.filter(it=>used.indexOf(it)<0));
 while(self.cards.length<self.cfg.cards&&pool.length)addCard(self,pool.shift())}
function prune(self){const need=present(self).map(k=>k.item),keepFill=Math.max(1,self.cfg.cards-need.length);let fill=0;
 self.cards=self.cards.filter(k=>{if(need.indexOf(k.item)>=0)return true;if(fill<keepFill){fill++;return true}return false})}
function spawn(self){const item=self.queue.shift();if(!item)return;const lanes=[];for(let i=0;i<self.cfg.lanes;i++)if(!self.cust.some(k=>k.lane===i&&!k.gone&&!k.served&&k.x<80))lanes.push(i);
 const lane=lanes.length?lanes[Math.floor(Math.random()*lanes.length)]:Math.floor(Math.random()*self.cfg.lanes);
 self.cust.push({id:self.nid++,item,lane,x:-30,speed:self.cfg.walk*(.92+Math.random()*.16),served:false,gone:false,wrong:0,pal:PALS[Math.floor(Math.random()*PALS.length)],walk:Math.random()*6,shake:0,
  change:self.cfg.change&&Math.random()<.45?(.35+Math.random()*.2):0,heart:0});
 topUp(self);KAIO.snd(self,'click',{hz:1200,v:.2})}

function serve(self,card,lane){const k=present(self).filter(c=>c.lane===lane).sort((a,b)=>b.x-a.x)[0];if(!k||self.slide)return false;
 self.cards=self.cards.filter(c=>c!==card);self.sel=-1;self.keepLane=lane;
 self.slide={card,k,t:0,fx:W-96,fy:laneY(lane)+70};KAIO.snd(self,'whoosh');return true}
function resolve(self){const s=self.slide,k=s.k,card=s.card;self.slide=null;
 if(k.gone||k.served){returnCard(self,card);return}
 if(card.item===k.item){k.served=true;k.heart=1;self.served++;KAIO.snd(self,'pop',{hz:520});KAIO.snd(self,'chime',{notes:[784,1046]});
  KAIO.burst(self.parts,k.x,laneY(k.lane)+40,14,'#FFD700',{up:120,v0:40,v1:160,r:1.6});G.say(self,k.item.en);self.setState({step:self.served});
  prune(self);topUp(self);if(self.served>=self.cfg.need){self.finished=true;self.doneT=1.4}}
 else{k.wrong++;k.shake=1;self.hitstop=50;KAIO.snd(self,'thud');KAIO.burst(self.parts,k.x,laneY(k.lane)+60,6,'#FFB347',{up:30,v0:40,v1:120,r:1.2});
  returnCard(self,card);
  if(k.wrong>=2){const ok=self.cards.filter(c=>c.item===k.item)[0];if(ok)ok.glow=1}
  if(k.wrong>=3){self.coachKind='wrong';self.setState({coach:{kind:'wrong',pick:card.item.en,word:k.item.en,it:k.item.it}})}}}
function returnCard(self,card){if(self.cards.some(k=>k.item===card.item))return;let s=freeSlot(self);
 if(s<0){const need=present(self).map(k=>k.item);const f=self.cards.filter(k=>need.indexOf(k.item)<0)[0];if(f){self.cards=self.cards.filter(k=>k!==f);s=f.slot}}
 if(s<0)return;card.slot=s;card.tx=SLOTS[s][0];card.ty=SLOTS[s][1];card.x=W-96-CW/2;card.y=laneY(self.keepLane)+40;self.cards.push(card)}
function laneY(i){return LT+i*LHT}

G.update=function(self,dt){self.t+=dt;const c=self.cfg;if(!c)return;
 if(!self.finished){self.spawnT-=dt;if(self.spawnT<=0&&self.queue.length&&present(self).length<c.sim&&!self.slide){spawn(self);self.spawnT=c.arrive}}
 for(const k of self.cust){k.shake=Math.max(0,k.shake-dt*2.2);k.heart=Math.max(0,k.heart-dt*.9);
  if(k.served){k.x+=90*dt;if(k.x>W+40)k.gone=true;continue}
  if(k.gone){continue}
  k.x+=k.speed*dt;k.walk+=dt;
  if(k.change&&k.x>ENDX*k.change){k.change=0;const alt=shuffle(self.items.filter(it=>it!==k.item))[0];if(alt){k.wasItem=k.item;k.item=alt;k.shake=1;k.changed=1;KAIO.snd(self,'tone',{from:700,to:420});prune(self);topUp(self)}}
  if(k.x>=ENDX){k.gone=true;self.lost++;KAIO.snd(self,'fall');KAIO.burst(self.parts,k.x,laneY(k.lane)+30,8,'#9AA5B1',{up:40,v0:20,v1:60,r:1.4});self.queue.push(shuffle(self.items)[0]);prune(self);topUp(self);
   if(self.lost>=3){self.coachKind='lost';self.setState({coach:{kind:'lost'}})}}}
 self.cust=self.cust.filter(k=>!k.gone);
 for(const cd of self.cards){cd.pop=Math.max(0,cd.pop-dt*3);if(self.drag&&self.drag.card===cd)continue;cd.x+=(cd.tx-cd.x)*Math.min(1,dt*10);cd.y+=(cd.ty-cd.y)*Math.min(1,dt*10)}
 if(self.slide){const s=self.slide;s.t+=dt;if(s.t>=.5)resolve(self)}
 self.keepY+=((laneY(self.keepLane))-self.keepY)*Math.min(1,dt*7);
 self.parts=KAIO.parts(self.parts,dt,520);
 if(self.doneT>0){self.doneT-=dt;if(self.doneT<=0){self.doneT=0;self.setState({done:true})}}};
G.rebuild=function(self){self.cust=[];self.cards=[];self.slide=null;self.lost=0;self.served=0;self.spawnT=1;self.setState({step:0});
 let q=[];while(q.length<self.cfg.need&&self.items.length)q=q.concat(shuffle(self.items));self.queue=q.slice(0,self.cfg.need)};

/* input: trascina la carta sul bancone, oppure tocca la carta e poi il bancone */
function cardAt(self,p){for(let i=self.cards.length-1;i>=0;i--){const c=self.cards[i];if(p.x>=c.x&&p.x<=c.x+CW&&p.y>=c.y&&p.y<=c.y+CH)return c}return null}
function laneAt(self,p){if(p.y<LT||p.y>LT+self.cfg.lanes*LHT)return -1;return Math.floor((p.y-LT)/LHT)}
G.down=function(self,p){if(self.finished)return;const c=cardAt(self,p);
 if(c){self.drag={card:c,ox:p.x-c.x,oy:p.y-c.y,x0:p.x,y0:p.y,moved:false};self.cards=self.cards.filter(k=>k!==c).concat([c]);KAIO.snd(self,'click',{hz:1600,v:.2});return}
 const ln=laneAt(self,p);if(ln>=0&&self.sel>=0&&self.cards[self.sel]){if(serve(self,self.cards[self.sel],ln))return;KAIO.snd(self,'click',{hz:500,v:.12})}};
G.drag=function(self,q,p){const d=self.drag;if(!d)return;if(Math.abs(p.x-d.x0)+Math.abs(p.y-d.y0)>8)d.moved=true;d.card.x=p.x-d.ox;d.card.y=p.y-d.oy};
G.up=function(self,p){const d=self.drag;if(!d)return;self.drag=null;const c=d.card;
 if(!d.moved){const i=self.cards.indexOf(c);self.sel=self.sel===i?-1:i;c.x=c.tx;c.y=c.ty;return}
 const ln=laneAt(self,p);
 if(ln>=0&&serve(self,c,ln))return;
 c.x=c.tx;c.y=c.ty;KAIO.snd(self,'click',{hz:500,v:.12})};
G.key=function(self,e){if(self.finished)return;const n=self.cards.length;self.kbUsed=true;
 if(e.key==='ArrowLeft'){self.sel=n?((self.sel<0?0:self.sel)-1+n)%n:-1;e.preventDefault()}
 else if(e.key==='ArrowRight'){self.sel=n?((self.sel<0?-1:self.sel)+1)%n:-1;e.preventDefault()}
 else if(e.key==='ArrowUp'){self.klane=(self.klane-1+self.cfg.lanes)%self.cfg.lanes;e.preventDefault()}
 else if(e.key==='ArrowDown'){self.klane=(self.klane+1)%self.cfg.lanes;e.preventDefault()}
 else if(e.key===' '||e.key==='Enter'){e.preventDefault();if(self.sel>=0&&self.cards[self.sel])serve(self,self.cards[self.sel],self.klane)}
 else if(/^[1-4]$/.test(e.key)){const i=parseInt(e.key,10)-1;if(self.cards[i])self.sel=i}};

G.say=function(self,text){if(self.state.muted||!window.speechSynthesis||!text)return;try{const u=new SpeechSynthesisUtterance(text.replace(/\.\.\./g,''));u.lang='en-GB';u.rate=.95;
 const vs=speechSynthesis.getVoices();const v=vs.filter(v=>/^en[-_](GB|US)/i.test(v.lang))[0]||vs.filter(v=>/^en/i.test(v.lang))[0];if(v)u.voice=v;speechSynthesis.cancel();speechSynthesis.speak(u)}catch(e){}};

/* ---------- disegno ---------- */
function lines(x,text,maxW,maxL){const words=text.split(' '),out=[];let line='';for(const w of words){const t=line?line+' '+w:w;if(x.measureText(t).width>maxW&&line){out.push(line);line=w}else line=t}if(line)out.push(line);
 if(out.length>maxL){out.length=maxL;let l=out[maxL-1];while(x.measureText(l+'…').width>maxW&&l.length>1)l=l.slice(0,-1);out[maxL-1]=l+'…'}return out}
function drawAwning(x,t){for(let i=0,k=0;i<W+28;i+=28,k++){x.fillStyle=k%2?'#FFF4D6':'#C8102E';x.fillRect(i,0,28,58)}
 for(let i=0,k=0;i<W+28;i+=28,k++){x.fillStyle=k%2?'#FFF4D6':'#C8102E';x.beginPath();x.arc(i+14,58,14,0,Math.PI);x.fill()}
 x.fillStyle='rgba(0,0,0,.25)';x.fillRect(0,72,W,6);
 x.strokeStyle='#2A1A10';x.lineWidth=1.5;x.beginPath();x.moveTo(0,80);for(let i=18;i<W;i+=36)x.quadraticCurveTo(i,86,i+18,80);x.stroke();
 for(let i=18;i<W;i+=36){x.shadowColor='#FFB300';x.shadowBlur=12;x.fillStyle='#FFE9A8';x.beginPath();x.arc(i,85,5,0,6.283);x.fill()}x.shadowBlur=0}
function drawSign(self,x){x.strokeStyle='#8B5A2B';x.lineWidth=2;x.beginPath();x.moveTo(170,72);x.lineTo(176,96);x.moveTo(250,72);x.lineTo(244,96);x.stroke();
 x.fillStyle='#5A3A22';KAIO.rr(x,150,94,120,36,6);x.fill();x.fillStyle='#A0623A';KAIO.rr(x,154,98,112,28,4);x.fill();
 x.fillStyle='#FFF4D6';x.font='20px '+SLAB;x.textAlign='center';x.textBaseline='middle';x.fillText(self.served+' / '+(self.cfg?self.cfg.need:0),210,113);
 for(let i=0;i<3;i++){const mx=330+i*26,lost=i<self.lost;x.fillStyle=lost?'#3A2A1E':'#FFF4D6';KAIO.rr(x,mx,102,16,20,3);x.fill();x.strokeStyle=lost?'#3A2A1E':'#FFF4D6';x.lineWidth=3;x.beginPath();x.arc(mx+18,112,5,-1.3,1.3);x.stroke();
  if(!lost){x.fillStyle='#FFB300';x.fillRect(mx+2,108,12,12)}}}
function drawLane(self,x,i){const y=laneY(i);x.fillStyle='#3A2314';x.fillRect(0,y,W,LHT);x.fillStyle='rgba(0,0,0,.18)';for(let k=0;k<W;k+=34)x.fillRect(k,y,1.5,LHT);
 x.fillStyle='#6B4226';x.fillRect(0,y+10,W,70);x.fillStyle='rgba(0,0,0,.12)';x.fillRect(0,y+10,W,4);
 x.fillStyle='#4A2C17';x.fillRect(W-70,y+6,70,74);x.fillStyle='#E0B15E';for(let k=0;k<3;k++){x.fillRect(W-58+k*20,y+26,6,18);x.fillRect(W-62+k*20,y+22,14,6)}}
function drawCounter(self,x,i){const y=laneY(i);x.fillStyle='#B8794A';x.fillRect(0,y+72,W,28);x.fillStyle='rgba(0,0,0,.14)';x.fillRect(0,y+86,W,1.5);for(let k=20;k<W;k+=120)x.fillRect(k,y+72,1.5,28);
 x.fillStyle='#7A4A2A';x.fillRect(0,y+100,W,20);x.fillStyle='#E0B15E';x.fillRect(0,y+100,W,3);x.fillStyle='rgba(0,0,0,.3)';x.fillRect(0,y+120,W,6)}
function drawFig(x,px,py,pal,face,walk,apron){x.save();x.translate(px,py);x.scale(face,1);const bob=walk?Math.sin(walk*9)*1.5:0;x.translate(0,bob);
 x.fillStyle='#2A2A2A';x.fillRect(-8,-10,6,10);x.fillRect(2,-10,6,10);
 x.fillStyle=pal.body;KAIO.rr(x,-11,-30,22,21,4);x.fill();if(apron){x.fillStyle='#FFF4D6';x.fillRect(-7,-24,14,15)}
 x.fillStyle=pal.skin;x.fillRect(-14,-28,4,12);x.fillRect(10,-28,4,12);
 x.fillStyle=pal.skin;KAIO.rr(x,-8,-46,16,16,5);x.fill();x.fillStyle='#1B1B1B';x.fillRect(1,-40,2,2.5);x.fillRect(5,-40,2,2.5);
 if(pal.beard){x.fillStyle=pal.beard;KAIO.rr(x,-8,-36,16,8,3);x.fill()}
 x.fillStyle=pal.hat;if(pal.hood){KAIO.rr(x,-10,-50,20,10,4);x.fill();x.fillRect(-10,-46,4,14);x.fillRect(6,-46,4,14)}
 else if(pal.tall){x.beginPath();x.moveTo(-11,-46);x.lineTo(0,-68);x.lineTo(11,-46);x.fill();x.fillRect(-12,-48,24,4)}
 else{KAIO.rr(x,-10,-52,20,9,3);x.fill();x.fillRect(-10,-45,20,2)}
 x.restore()}
function drawBubble(x,k,y){x.font='700 13px '+FONT;const ls=lines(x,k.item.it,170,2);const w=Math.max(...ls.map(l=>x.measureText(l).width))+22,h=ls.length*17+14;
 let bx=Math.min(W-w-4,Math.max(4,k.x-w/2+(k.shake?(Math.random()*2-1)*6*k.shake:0))),by=y-70-h;
 x.fillStyle='#FFFFFF';x.strokeStyle='#1D4E89';x.lineWidth=2;KAIO.rr(x,bx,by,w,h,9);x.fill();x.stroke();
 x.fillStyle='#FFFFFF';x.beginPath();x.moveTo(k.x-6,by+h-1);x.lineTo(k.x+6,by+h-1);x.lineTo(k.x,by+h+8);x.closePath();x.fill();
 x.fillStyle='#1D4E89';x.textAlign='center';x.textBaseline='middle';ls.forEach((l,i)=>x.fillText(l,bx+w/2,by+7+8.5+i*17))}
function drawHeart(x,cx,cy,s){x.fillStyle='#C8102E';x.beginPath();x.arc(cx-s*.5,cy-s*.3,s*.55,0,6.283);x.arc(cx+s*.5,cy-s*.3,s*.55,0,6.283);x.fill();x.beginPath();x.moveTo(cx-s*1.02,cy-s*.1);x.lineTo(cx+s*1.02,cy-s*.1);x.lineTo(cx,cy+s);x.closePath();x.fill()}
function drawCard(x,c,scale,sel,t){const s=scale||1,w=CW*s,h=CH*s,pop=c.pop?1+.08*c.pop:1;x.save();x.translate(c.x+w/2,c.y+h/2+(sel?-6:0));x.scale(pop,pop);
 if(sel||c.glow){x.shadowColor=c.glow?'#FFB300':'rgba(0,0,0,.6)';x.shadowBlur=c.glow?16+6*Math.sin(t*6):18}
 x.fillStyle='#FFF4D6';KAIO.rr(x,-w/2,-h/2,w,h,8*s);x.fill();x.shadowBlur=0;
 x.strokeStyle='#C8102E';x.lineWidth=3*s;KAIO.rr(x,-w/2+3*s,-h/2+3*s,w-6*s,h-6*s,6*s);x.stroke();x.strokeStyle='#1D4E89';x.lineWidth=1*s;KAIO.rr(x,-w/2+9*s,-h/2+9*s,w-18*s,h-18*s,4*s);x.stroke();
 x.fillStyle='#1D4E89';x.font='700 '+Math.round(16*s)+'px '+FONT;x.textAlign='center';x.textBaseline='middle';const ls=lines(x,c.item.en,w-30*s,2);ls.forEach((l,i)=>x.fillText(l,0,(i-(ls.length-1)/2)*19*s));
 x.restore()}
G.draw=function(self,x){x.setTransform(self.sc,0,0,self.sc,0,0);x.clearRect(0,0,W,H);const c=self.cfg||CFG[0];
 x.fillStyle='#2A1A10';x.fillRect(0,0,W,H);
 for(let i=0;i<c.lanes;i++)drawLane(self,x,i);
 for(let i=c.lanes;i<4;i++){const y=laneY(i);x.fillStyle='#1E120A';x.fillRect(0,y,W,LHT);x.fillStyle='rgba(255,244,214,.06)';for(let k=8;k<W;k+=40)x.fillRect(k,y+60,24,3)}
 for(const k of self.cust){if(k.gone&&!k.served)continue;const y=laneY(k.lane)+84;drawFig(x,k.x,y,k.pal,1,k.served?k.walk+self.t:k.walk,false);
  if(k.served&&k.heart>0){x.globalAlpha=Math.min(1,k.heart*1.5);drawHeart(x,k.x,y-72-(1-k.heart)*30,7);x.globalAlpha=1}}
 for(let i=0;i<c.lanes;i++)drawCounter(self,x,i);
 if(self.kbUsed&&self.sel>=0&&self.cards[self.sel]){x.fillStyle='rgba(255,233,168,.16)';x.fillRect(0,laneY(self.klane)+10,W-70,70)}
 drawFig(x,W-34,self.keepY+96,{hat:'#FFF4D6',body:'#1D4E89',skin:'#F2C9A0'},-1,0,true);
 if(self.slide){const s=self.slide,k=Math.min(1,s.t/.5),e=1-Math.pow(1-k,3),cx=s.fx+(s.k.x+10-s.fx)*e,cy=laneY(s.k.lane)+52;x.save();s.card.x=cx-CW*.42/2;s.card.y=cy-CH*.42/2;drawCard(x,s.card,.42,false,self.t);x.restore()}
 x.fillStyle='#3A2314';x.fillRect(0,TY,W,H-TY);x.fillStyle='#4A2C17';KAIO.rr(x,6,TY+4,W-12,H-TY-10,14);x.fill();x.fillStyle='rgba(0,0,0,.2)';x.fillRect(6,TY+4,W-12,3);
 self.cards.forEach((cd,i)=>{if(self.drag&&self.drag.card===cd)return;drawCard(x,cd,1,i===self.sel,self.t)});
 if(self.drag)drawCard(x,self.drag.card,1,true,self.t);
 KAIO.drawParts(x,self.parts);
 drawAwning(x,self.t);drawSign(self,x);
 for(const k of self.cust){if(!k.served&&!k.gone)drawBubble(x,k,laneY(k.lane)+84)}};
window.TAVERNA=G;
})();
