/* KAIO — motore comune dei giochi di livello.
   Non contiene game design: solo canvas, ciclo, input, audio, salvataggio e
   la scaffoldatura comune (pausa, lezione completata, coaching).
   Ogni gioco implementa: reset(beat), update(dt), draw(ctx).
   Riferimenti: ricerca/31 (numeri), ricerca/33 (input e piattaforma). */
(function(){
const KAIO={};

KAIO.init=function(self,o){
 try{KAIO._init(self,o)}catch(e){window.__KE='init: '+(e&&e.message);console.error('KAIO init: '+(e&&e.message))}};
KAIO._init=function(self,o){
 self.KW=o.W;self.KH=o.H;self.KEY=o.key;self.TITLES=o.titles;
 self.CH=o.chapters||[{t:o.title||['Capitolo','Chapter'],titles:o.titles,beats:o.beats}];
 let sv={};try{sv=JSON.parse(localStorage.getItem(o.key)||'{}')}catch(e){}
 const pc=parseInt(self.props.capitolo,10);
 const ci=Number.isFinite(pc)&&pc>=1&&pc<=self.CH.length?pc-1:Math.min(self.CH.length-1,sv.chapter||0);
 KAIO.useChapter(self,ci);
 const pb=parseInt(self.props.lezione,10);
 const beat=Number.isFinite(pb)&&pb>=1&&pb<=self.BEATS.length?pb-1:Math.min(self.BEATS.length-1,sv.beat||0);
 self.setState({beat,chapter:ci,lang:self.props.lingua||sv.lang||'it',muted:!!sv.muted});
 self.reset(beat);
 let el=self.cv&&self.cv.current;
 if(el&&!el.getContext)el=el.querySelector&&el.querySelector('canvas');
 if(!el||!el.getContext)return;
 self.el=el;self.ctx=el.getContext('2d');self.touch=false;self.hitstop=0;
 self.onResize=()=>{const r=el.getBoundingClientRect(),d=Math.min(window.devicePixelRatio||1,2.5);
  el.width=Math.round(r.width*d);el.height=Math.round(r.height*d);self.sc=el.width/self.KW};
 self.onResize();window.addEventListener('resize',self.onResize);
 self.ro=window.ResizeObserver?new ResizeObserver(self.onResize):null;if(self.ro)self.ro.observe(el);
 const pos=e=>{const r=el.getBoundingClientRect();return{x:(e.clientX-r.left)/r.width*self.KW,y:(e.clientY-r.top)/r.height*self.KH,t:performance.now()}};
 self.pos=pos;
 self.kDown=e=>{el.setPointerCapture&&el.setPointerCapture(e.pointerId);KAIO.audio(self);
  self.touch=e.pointerType!=='mouse';const p=pos(e);self.p0=p;self.pts=[p];self.swiped=false;self.dragging=true;
  if(self.state.coach){self.setState({coach:null});if(self.onCoachClose)self.onCoachClose();return}
  if(self.state.done){KAIO.next(self);return}
  if(o.onDown)o.onDown(p,e)};
 self.kMove=e=>{if(!self.dragging)return;const p=pos(e);const q=self.pts[self.pts.length-1];
  self.pts.push(p);if(self.pts.length>12)self.pts.shift();
  if(self.p0&&self.p0.y<20&&p.y-self.p0.y>44){self.dragging=false;self.setState({paused:true});return}
  if(o.onDrag&&q)o.onDrag(q,p);
  if(o.onSwipe&&!self.swiped&&self.p0){const dx=p.x-self.p0.x,dy=p.y-self.p0.y;
   if(Math.max(Math.abs(dx),Math.abs(dy))>28){self.swiped=true;self.p0=p;
    o.onSwipe(Math.abs(dx)>Math.abs(dy)?(dx>0?'right':'left'):(dy>0?'down':'up'))}}};
 self.kUp=e=>{if(self.dragging&&o.onUp)o.onUp(self.pts[self.pts.length-1]);self.dragging=false;self.p0=null;self.swiped=false};
 self.kTap=e=>{if(o.onTap&&!self.state.paused&&!self.state.done&&!self.state.coach)o.onTap(pos(e))};
 el.addEventListener('pointerdown',self.kDown);el.addEventListener('pointermove',self.kMove);
 if(o.onTap)el.addEventListener('click',self.kTap);
 window.addEventListener('pointerup',self.kUp);window.addEventListener('pointercancel',self.kUp);
 self.kKey=e=>{if(e.key==='Escape'){e.preventDefault();self.setState(s=>({paused:!s.paused}));return}
  if(self.state.paused||self.state.done||self.state.coach)return;
  if(o.onKey)o.onKey(e)};
 window.addEventListener('keydown',self.kKey);
 self.kFrame=t=>{const dt=Math.min(.048,(t-self.kLast)/1000);self.kLast=t;self.kSeen=t;
  try{if(!self.state.paused&&!self.state.done&&!self.state.coach){
    if(self.hitstop>0)self.hitstop-=dt*1000;else self.update(dt)}
   self.draw(self.ctx)}catch(err){if(!self.kErr){self.kErr=1;window.__KE='frame: '+(err&&err.message);console.error('KAIO frame: '+(err&&err.message))}}};
 self.kLoop=t=>{self.kFrame(t);self.kRaf=requestAnimationFrame(self.kLoop)};
 self.kLast=self.kSeen=performance.now();
 self.kRaf=requestAnimationFrame(self.kLoop);
 self.kIv=setInterval(()=>{const n=performance.now();if(n-self.kSeen>120)self.kFrame(n)},33);
 try{self.draw(self.ctx)}catch(e){window.__KE='first draw: '+(e&&e.message);console.error('KAIO first draw: '+(e&&e.message))}
};

KAIO.destroy=function(self){
 cancelAnimationFrame(self.kRaf);clearInterval(self.kIv);
 window.removeEventListener('resize',self.onResize);window.removeEventListener('keydown',self.kKey);
 window.removeEventListener('pointerup',self.kUp);window.removeEventListener('pointercancel',self.kUp);
 if(self.ro)self.ro.disconnect();if(self.ac)try{self.ac.close()}catch(e){}
};

KAIO.save=function(self,o){try{localStorage.setItem(self.KEY,JSON.stringify(Object.assign({beat:self.state.beat,chapter:self.state.chapter||0,lang:self.state.lang,muted:self.state.muted},o)))}catch(e){}};

/* Capitoli: 8 per livello, 5 beat ciascuno (ricerca/03 §3.4).
   Un gioco può passare `chapters:[{t:[it,en],beats:[…5]}]` a KAIO.init;
   i giochi che passano ancora `beats:[…5]` valgono come capitolo unico. */
KAIO.useChapter=function(self,ci){const ch=self.CH[ci];self.BEATS=ch.beats;self.TITLES=ch.titles||self.TITLES;return ch};
KAIO.goBeat=function(self,i,ci){const c=ci==null?(self.state.chapter||0):ci;
 if(c!==self.state.chapter)KAIO.useChapter(self,c);
 self.reset(i);self.setState({beat:i,chapter:c,step:0,done:false,coach:null,paused:false});KAIO.save(self,{beat:i,chapter:c})};
KAIO.goChapter=function(self,c){KAIO.goBeat(self,0,c)};
KAIO.next=function(self){
 if(self.state.beat<self.BEATS.length-1){KAIO.goBeat(self,self.state.beat+1);return}
 const c=(self.state.chapter||0)+1;
 if(c<self.CH.length)KAIO.goBeat(self,0,c);else KAIO.goBeat(self,0,0)};

/* Valori comuni per renderVals: rail dei capitoli e delle lezioni, pausa, lingua, audio. */
KAIO.vals=function(self,titles){
 const s=self.state,it=s.lang==='it',ci=s.chapter||0;
 const TT=(self.CH&&self.CH[ci]&&self.CH[ci].titles)||titles||self.TITLES||[];
 const CH=self.CH||[];
 return {cvRef:self.cv||(self.cv=React.createRef()),
  it,en:!it,pauseOpen:s.paused,doneOpen:s.done,coachOpen:!!s.coach,
  langLabel:it?'IT':'EN',audioState:s.muted?'—':'ON',
  doneHint:it?'tocca per continuare':'tap to continue',
  chapterNo:String(ci+1),chapterOf:String(CH.length||1),
  chapterTitle:(CH[ci]&&CH[ci].t)?CH[ci].t[it?0:1]:'',
  chapters:CH.map((c,i)=>({n:String(i+1),title:c.t[it?0:1],on:i===ci,go:()=>KAIO.goChapter(self,i)})),
  marks:TT.map((t,i)=>({on:i<=s.beat})),
  lessons:TT.map((t,i)=>({n:String(i+1),title:t[it?0:1],on:i===s.beat,go:()=>KAIO.goBeat(self,i)})),
  resume:()=>self.setState({paused:false}),
  toggleLang:()=>{const l=self.state.lang==='it'?'en':'it';self.setState({lang:l});KAIO.save(self,{lang:l})},
  toggleMute:()=>{const m=!self.state.muted;self.setState({muted:m});if(self.drone)self.drone.g.gain.value=m?0:self.droneVol||.02;KAIO.save(self,{muted:m})}};
};

/* Props → stato: capitolo, lezione e lingua pilotabili dai Tweaks. */
KAIO.sync=function(self,pp){
 if(pp.capitolo!==self.props.capitolo){const c=parseInt(self.props.capitolo,10);
  if(Number.isFinite(c)&&c>=1&&self.CH&&c<=self.CH.length&&c-1!==(self.state.chapter||0))KAIO.goChapter(self,c-1)}
 if(pp.lezione!==self.props.lezione){const n=parseInt(self.props.lezione,10);
  if(Number.isFinite(n)&&n>=1&&n<=self.BEATS.length&&n-1!==self.state.beat)KAIO.goBeat(self,n-1)}
 if(pp.lingua!==self.props.lingua&&self.props.lingua)self.setState({lang:self.props.lingua});
};

KAIO.audio=function(self){if(self.ac)return;try{const A=window.AudioContext||window.webkitAudioContext;self.ac=new A()}catch(e){}};
KAIO.drone=function(self,freq,type,vol,lp){if(!self.ac||self.drone)return;const ac=self.ac;
 const g=ac.createGain();g.gain.value=self.state.muted?0:vol;g.connect(ac.destination);
 const o=ac.createOscillator();o.type=type||'triangle';o.frequency.value=freq;
 let node=o;if(lp){const f=ac.createBiquadFilter();f.type='lowpass';f.frequency.value=lp;o.connect(f);node=f}
 node.connect(g);o.start();self.droneVol=vol;self.drone={o,g,f:node}};

/* Voci: click tone thud fall whoosh crash chime pop */
KAIO.snd=function(self,k,opt){const ac=self.ac;if(!ac||self.state.muted)return;
 const t=ac.currentTime,g=ac.createGain();g.connect(ac.destination);const O=opt||{};
 const noise=(len,shape)=>{const b=ac.createBufferSource(),n=ac.createBuffer(1,len,ac.sampleRate),d=n.getChannelData(0);
  for(let i=0;i<d.length;i++)d[i]=(Math.random()*2-1)*shape(i/d.length);b.buffer=n;return b};
 if(k==='click'){const b=noise(1100,p=>Math.pow(1-p,3)),f=ac.createBiquadFilter();f.type='bandpass';f.frequency.value=O.hz||1750;f.Q.value=1.1;
  b.connect(f);f.connect(g);g.gain.setValueAtTime(O.v||.45,t);g.gain.exponentialRampToValueAtTime(.001,t+.13);b.start(t)}
 else if(k==='tone'){const o=ac.createOscillator();o.type='sine';o.frequency.setValueAtTime(O.from||560,t);o.frequency.exponentialRampToValueAtTime(O.to||880,t+.09);
  o.connect(g);g.gain.setValueAtTime(O.v||.15,t);g.gain.exponentialRampToValueAtTime(.001,t+.22);o.start(t);o.stop(t+.24)}
 else if(k==='pop'){const o=ac.createOscillator();o.type='triangle';o.frequency.setValueAtTime(O.hz||420,t);o.frequency.exponentialRampToValueAtTime((O.hz||420)*1.9,t+.06);
  o.connect(g);g.gain.setValueAtTime(O.v||.14,t);g.gain.exponentialRampToValueAtTime(.001,t+.14);o.start(t);o.stop(t+.16)}
 else if(k==='thud'){const o=ac.createOscillator();o.type='sine';o.frequency.setValueAtTime(120,t);o.frequency.exponentialRampToValueAtTime(48,t+.2);
  o.connect(g);g.gain.setValueAtTime(O.v||.3,t);g.gain.exponentialRampToValueAtTime(.001,t+.3);o.start(t);o.stop(t+.32)}
 else if(k==='fall'){const o=ac.createOscillator();o.type='triangle';o.frequency.setValueAtTime(300,t);o.frequency.exponentialRampToValueAtTime(140,t+.22);
  o.connect(g);g.gain.setValueAtTime(.05,t);g.gain.exponentialRampToValueAtTime(.001,t+.26);o.start(t);o.stop(t+.28)}
 else if(k==='whoosh'){const b=noise(5200,p=>Math.sin(Math.PI*p)),f=ac.createBiquadFilter();f.type='bandpass';
  f.frequency.setValueAtTime(500,t);f.frequency.exponentialRampToValueAtTime(1900,t+.14);
  b.connect(f);f.connect(g);g.gain.setValueAtTime(.13,t);g.gain.exponentialRampToValueAtTime(.001,t+.2);b.start(t)}
 else if(k==='crash'){const b=noise(14000,p=>Math.pow(1-p,1.7)),f=ac.createBiquadFilter();f.type='lowpass';
  f.frequency.setValueAtTime(1100,t);f.frequency.exponentialRampToValueAtTime(160,t+.5);
  b.connect(f);f.connect(g);g.gain.setValueAtTime(.4,t);g.gain.exponentialRampToValueAtTime(.001,t+.6);b.start(t)}
 else if(k==='whir'){const o=ac.createOscillator();o.type='sawtooth';o.frequency.setValueAtTime(280,t);o.frequency.exponentialRampToValueAtTime(42,t+.62);
  const f=ac.createBiquadFilter();f.type='lowpass';f.frequency.value=900;o.connect(f);f.connect(g);
  g.gain.setValueAtTime(.2,t);g.gain.exponentialRampToValueAtTime(.001,t+.7);o.start(t);o.stop(t+.72)}
 else if(k==='chime'){(O.notes||[523,659,784]).forEach((hz,i)=>{const o=ac.createOscillator(),gg=ac.createGain();
   o.type='sine';o.frequency.value=hz;o.connect(gg);gg.connect(ac.destination);
   gg.gain.setValueAtTime(0,t+i*.1);gg.gain.linearRampToValueAtTime(.12,t+i*.1+.02);gg.gain.exponentialRampToValueAtTime(.001,t+i*.1+.42);
   o.start(t+i*.1);o.stop(t+i*.1+.44)})}
};

/* Particelle: un pool per gioco. */
KAIO.burst=function(arr,x,y,n,col,opt){const O=opt||{};
 for(let i=0;i<n&&arr.length<120;i++){const a=(O.a0||0)+Math.random()*(O.spread||6.283),v=(O.v0||60)+Math.random()*(O.v1||180);
  arr.push({x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v-(O.up||40),l:0,m:.4+Math.random()*.3,c:col,r:1.4+Math.random()*(O.r||2.2)})}};
KAIO.parts=function(arr,dt,grav){for(const p of arr){p.l+=dt;p.vy+=(grav||520)*dt;p.x+=p.vx*dt;p.y+=p.vy*dt;p.vx*=.98}
 return arr.filter(p=>p.l<p.m)};
KAIO.drawParts=function(x,arr){for(const p of arr){x.globalAlpha=Math.max(0,1-p.l/p.m);x.fillStyle=p.c;x.beginPath();x.arc(p.x,p.y,p.r,0,6.283);x.fill()}x.globalAlpha=1};

KAIO.rr=function(x,a,b,w,h,r){x.beginPath();if(x.roundRect)x.roundRect(a,b,w,h,r);else x.rect(a,b,w,h)};
KAIO.shake=function(x,amt){if(amt>0)x.translate((Math.random()*2-1)*5*amt,(Math.random()*2-1)*4*amt)};

window.KAIO=KAIO;
})();
