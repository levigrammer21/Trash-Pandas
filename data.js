/* Public sheet loader and date helpers. No credentials belong in this site. */
(() => {
'use strict';
const C = window.PANDAS_CONFIG;
const tabs = ['Settings','Teams','Schedule','Roster','Announcements','Links','Sponsors','Gallery'];
const required = {Settings:['Setting','Value'],Teams:['Publish','Team'],Schedule:['Publish','Date','Opponent / Title'],Roster:['Publish','Name'],Announcements:['Publish','Title'],Links:['Publish','Label','URL'],Sponsors:['Publish','Name'],Gallery:['Publish','Image URL']};
let serial = 0;
const str = v => v == null ? '' : String(v).trim();
const yes = v => v === true || /^(true|yes|1)$/i.test(str(v));
function cleanDate(value) {
 if (typeof value === 'number' && value > 1 && Number.isFinite(value)) return new Date(Date.UTC(1899,11,30)+Math.floor(value)*86400000).toISOString().slice(0,10);
 const s = str(value); let m;
 if ((m = s.match(/^Date\((\d+),(\d+),(\d+)(?:,.*)?\)$/))) return validDate(`${m[1]}-${String(+m[2]+1).padStart(2,'0')}-${m[3].padStart(2,'0')}`);
 if ((m = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/))) return validDate(`${m[3]}-${m[1].padStart(2,'0')}-${m[2].padStart(2,'0')}`);
 return validDate(s);
}
function validDate(s) {
 if (!/^\d{4}-\d{2}-\d{2}$/.test(s)) return '';
 const d = new Date(s+'T12:00:00Z');
 return !isNaN(d) && d.toISOString().slice(0,10) === s ? s : '';
}
function cleanTime(v, period = '') {
 if(Array.isArray(v)) {const h=Number(v[0]),m=Number(v[1]);return h>=0&&h<24&&m>=0&&m<60?`${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}`:'';}
 if(typeof v==='number'&&v>=0&&v<1){const minutes=Math.round(v*1440)%1440;return `${String(Math.floor(minutes/60)).padStart(2,'0')}:${String(minutes%60).padStart(2,'0')}`;}
 const s=str(v).replace(/\./g,'');let match=s.match(/^(\d{1,2})(?::(\d{2}))?(?::\d{2})?\s*(AM|PM)?$/i);
 if(!match)return '';
 let h=+match[1],min=+(match[2]||0);const suffix=match[3]||((h>=1&&h<=12)?str(period):'');
 if(suffix){if(h<1||h>12||! /^(AM|PM)$/i.test(suffix))return '';h=h%12+(/^PM$/i.test(suffix)?12:0);}
 if(h>23||min>59)return '';
 return `${String(h).padStart(2,'0')}:${String(min).padStart(2,'0')}`;
}
function today(now = new Date()) {
 const parts = new Intl.DateTimeFormat('en-US',{timeZone:C.timezone,year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(now);
 const get = n => parts.find(p=>p.type===n).value;
 return `${get('year')}-${get('month')}-${get('day')}`;
}
function addDays(date, n) {const d = new Date(date+'T12:00:00Z');d.setUTCDate(d.getUTCDate()+n);return d.toISOString().slice(0,10);}
function zonedDate(date, time = '00:00') {
 if(!cleanDate(date) || !cleanTime(time)) return null;
 const wall = Date.parse(date+'T'+time+':00Z');let guess=wall;
 for(let i=0;i<3;i++) {
  const p = new Intl.DateTimeFormat('en-US',{timeZone:C.timezone,year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit',hourCycle:'h23'}).formatToParts(new Date(guess));
  const n = k => +p.find(x=>x.type===k).value;
  const represented = Date.UTC(n('year'),n('month')-1,n('day'),n('hour'),n('minute'),n('second'));
  const delta = wall-represented;guess+=delta;if(!delta)break;
 }
 return new Date(guess);
}
function endOfEvent(e) {
 if (!e._date) return 0;
 if(!e._time)return +zonedDate(addDays(e._date,1),'00:00');
 let end=cleanTime(e['End time'], e['AM / PM']);
 if(!end)return +zonedDate(e._date,e._time)+7200000;
 return +zonedDate(end<=e._time?addDays(e._date,1):e._date,end);
}
function upcoming(e, now=Date.now()) {return e.Status !== 'Final' && (e.Status==='Live' || (e._date && e._date>=today(new Date(now))) || endOfEvent(e)>now);}
function scores(e) {
 const a = str(e['Our score']), b = str(e['Their score']);
 return e.Type==='Game' && e.Status==='Final' && /^\d+$/.test(a) && /^\d+$/.test(b) ? [+a,+b] : null;
}
function record(events) {return events.reduce((r,e)=>{const s=scores(e);if(s)r[s[0]>s[1]?'wins':s[0]<s[1]?'losses':'ties']++;return r;},{wins:0,losses:0,ties:0});}
function loadTab(name) {
 return new Promise((resolve,reject)=>{
  const callback='__pandasSheet'+Date.now()+'_'+serial++;
  const script=document.createElement('script');let done=false;
  const timer=setTimeout(()=>finish(new Error('Sheet request timed out')),18000);
  function finish(error,value){if(done)return;done=true;clearTimeout(timer);script.remove();window[callback]=()=>{};setTimeout(()=>{delete window[callback];},60000);error?reject(error):resolve(value);}
  window[callback]=res=>{
   if(res.status!=='ok'||!res.table)return finish(new Error('Sheet unavailable: '+name));
   const cols=res.table.cols.map(c=>str(c.label));
   if(required[name].some(h=>!cols.includes(h)))return finish(new Error('Column headers changed: '+name));
   const rows=(res.table.rows||[]).map(row=>Object.fromEntries(cols.map((h,i)=>{
    const c=row.c?.[i];let value=c?.v??'';
    if(typeof value==='string' && /^Date\(/.test(value)) value=cleanDate(value);
    return [h,value];
   }))).filter(row=>Object.values(row).some(v=>v!==''&&v!==null));
   finish(null,rows);
  };
  script.onerror=()=>finish(new Error('Unable to reach Google Sheets'));
  const url=new URL(`https://docs.google.com/spreadsheets/d/${C.sheetId}/gviz/tq`);
  url.searchParams.set('sheet',name);url.searchParams.set('headers','1');url.searchParams.set('range','A1:Z5000');
  url.searchParams.set('tqx',`out:json;responseHandler:${callback}`);url.searchParams.set('_',String(Math.floor(Date.now()/C.refreshMs)));
  script.src=url.href;script.referrerPolicy='no-referrer';document.head.append(script);
 });
}
async function load() {
 const result=await Promise.allSettled(tabs.map(loadTab));
 const errors=result.map((r,i)=>r.status==='rejected'?tabs[i]:null).filter(Boolean);
 if(errors.length){const error=new Error('Could not load '+errors.join(', '));error.tabs=errors;throw error;}
 return Object.fromEntries(tabs.map((name,i)=>[name,result[i].value]));
}
function model(raw) {
 const settings=Object.fromEntries((raw.Settings||[]).filter(r=>r.Setting).map(r=>[str(r.Setting),r.Value]));
 const order=(a,b)=>(Number(a.Order)||0)-(Number(b.Order)||0);
 const teams=(raw.Teams||[]).filter(r=>yes(r.Publish)&&str(r.Team)).sort(order);
 const names=new Set(teams.map(r=>str(r.Team)));
 const publicRows=name=>(raw[name]||[]).filter(r=>yes(r.Publish)&&(!str(r.Team)||names.has(str(r.Team))));
 const schedule=publicRows('Schedule').map((r,i)=>({...r,Type:str(r.Type)||'Game',Status:str(r.Status)||'Scheduled',_date:cleanDate(r.Date),_time:cleanTime(r.Time,r['AM / PM']),_id:i})).filter(r=>r._date&&str(r['Opponent / Title'])).sort((a,b)=>(a._date+(a._time||'23:59')).localeCompare(b._date+(b._time||'23:59')));
 return {settings,teams,schedule,roster:publicRows('Roster').filter(r=>str(r.Name)).sort((a,b)=>(a.Role==='Coach')-(b.Role==='Coach')||order(a,b)||str(a.Number).localeCompare(str(b.Number),undefined,{numeric:true})),announcements:publicRows('Announcements').filter(r=>str(r.Title)),links:publicRows('Links').filter(r=>str(r.Label)).sort(order),sponsors:publicRows('Sponsors').filter(r=>str(r.Name)).sort(order),gallery:publicRows('Gallery').sort(order)};
}
function activeAnnouncement(a,day=today()) {const start=cleanDate(a['Start date']),end=cleanDate(a['End date']);return (!start||start<=day)&&(!end||end>=day);}
function ics(events, name) {
 const esc=s=>str(s).replace(/\\/g,'\\\\').replace(/\r?\n/g,'\\n').replace(/;/g,'\\;').replace(/,/g,'\\,');
 const stamp=d=>d.toISOString().replace(/[-:]/g,'').replace(/\.\d{3}/,'');
 const hash=s=>{let n=2166136261;for(const c of s){n^=c.charCodeAt(0);n=Math.imul(n,16777619);}return (n>>>0).toString(16);};
 const lines=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Trash Pandas//Team Schedule//EN','CALSCALE:GREGORIAN','METHOD:PUBLISH','X-WR-CALNAME:'+esc(name)];
 events.forEach(e=>{
  const title=e.Type==='Game'?`${str(e.Team)||name} ${e['Home / Away']==='Away'?'at':'vs'} ${e['Opponent / Title']}`:e['Opponent / Title'];
  lines.push('BEGIN:VEVENT','UID:'+hash([e.Team,e.Type,e._date,e._time,e['Opponent / Title'],e._id].join('|'))+'@trashpandas','DTSTAMP:'+stamp(new Date()),'SUMMARY:'+esc(title));
  if(e._time)lines.push('DTSTART:'+stamp(zonedDate(e._date,e._time)),'DTEND:'+stamp(new Date(endOfEvent(e))));
  else lines.push('DTSTART;VALUE=DATE:'+e._date.replace(/-/g,''),'DTEND;VALUE=DATE:'+addDays(e._date,1).replace(/-/g,''));
  lines.push('LOCATION:'+esc([e.Location,e.Address].filter(Boolean).join(', ')),'DESCRIPTION:'+esc([e.Notes,!e._time?'Time TBD — check the team schedule.':'',e['GameChanger URL']].filter(Boolean).join('\n')),'END:VEVENT');
 });
 lines.push('END:VCALENDAR');
 const encoder=new TextEncoder();
 return lines.map(line=>{let out='',length=0;for(const c of line){const bytes=encoder.encode(c).length;if(length+bytes>73){out+='\r\n ';length=1;}out+=c;length+=bytes;}return out;}).join('\r\n')+'\r\n';
}
window.PandasData={load,model,str,yes,cleanDate,cleanTime,today,addDays,zonedDate,endOfEvent,upcoming,scores,record,activeAnnouncement,ics};
})();
