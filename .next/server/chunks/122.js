"use strict";exports.id=122,exports.ids=[122],exports.modules={48789:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.getKeyIndexes=t.hasFlag=t.exists=t.list=void 0;let n=function(e){return e&&e.__esModule?e:{default:e}}(r(18262));t.list=Object.keys(n.default);let i={};function s(e){"string"!=typeof e&&(e=String(e));let t=e.indexOf("->");return -1===t?e.length:t}t.list.forEach(e=>{i[e]=n.default[e].flags.reduce(function(e,t){return e[t]=!0,e},{})}),t.exists=function(e){return!!n.default[e]},t.hasFlag=function(e,t){if(!i[e])throw Error("Unknown command "+e);return!!i[e][t]},t.getKeyIndexes=function(e,t,r){let i=n.default[e];if(!i)throw Error("Unknown command "+e);if(!Array.isArray(t))throw Error("Expect args to be an array");let a=[],o=!!(r&&r.parseExternalKey),l=(e,t)=>{let r=[],n=Number(e[t]);for(let e=0;e<n;e++)r.push(e+t+1);return r},u=(e,t,r)=>{for(let n=t;n<e.length-1;n+=1)if(String(e[n]).toLowerCase()===r.toLowerCase())return n+1;return null};switch(e){case"zunionstore":case"zinterstore":case"zdiffstore":a.push(0,...l(t,1));break;case"eval":case"evalsha":case"eval_ro":case"evalsha_ro":case"fcall":case"fcall_ro":case"blmpop":case"bzmpop":a.push(...l(t,1));break;case"sintercard":case"lmpop":case"zunion":case"zinter":case"zmpop":case"zintercard":case"zdiff":a.push(...l(t,0));break;case"georadius":{a.push(0);let e=u(t,5,"STORE");e&&a.push(e);let r=u(t,5,"STOREDIST");r&&a.push(r);break}case"georadiusbymember":{a.push(0);let e=u(t,4,"STORE");e&&a.push(e);let r=u(t,4,"STOREDIST");r&&a.push(r);break}case"sort":case"sort_ro":a.push(0);for(let e=1;e<t.length-1;e++){let r=t[e];if("string"!=typeof r)continue;let n=r.toUpperCase();"GET"===n?(e+=1,"#"!==(r=t[e])&&(o?a.push([e,s(r)]):a.push(e))):"BY"===n?(e+=1,o?a.push([e,s(t[e])]):a.push(e)):"STORE"===n&&(e+=1,a.push(e))}break;case"migrate":if(""===t[2])for(let e=5;e<t.length-1;e++){let r=t[e];if("string"==typeof r&&"KEYS"===r.toUpperCase()){for(let r=e+1;r<t.length;r++)a.push(r);break}}else a.push(2);break;case"xreadgroup":case"xread":for(let r="xread"===e?0:3;r<t.length-1;r++)if("STREAMS"===String(t[r]).toUpperCase()){for(let e=r+1;e<=r+(t.length-1-r)/2;e++)a.push(e);break}break;default:if(i.step>0){let e=i.keyStart-1,r=i.keyStop>0?i.keyStop:t.length+i.keyStop+1;for(let t=e;t<r;t+=i.step)a.push(t)}}return a}},45872:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.createFileSystemAdapter=t.FILE_SYSTEM_ADAPTER=void 0;let n=r(57147);t.FILE_SYSTEM_ADAPTER={lstat:n.lstat,stat:n.stat,lstatSync:n.lstatSync,statSync:n.statSync,readdir:n.readdir,readdirSync:n.readdirSync},t.createFileSystemAdapter=function(e){return void 0===e?t.FILE_SYSTEM_ADAPTER:Object.assign(Object.assign({},t.FILE_SYSTEM_ADAPTER),e)}},11646:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.IS_SUPPORT_READDIR_WITH_FILE_TYPES=void 0;let r=process.versions.node.split(".");if(void 0===r[0]||void 0===r[1])throw Error(`Unexpected behavior. The 'process.versions.node' variable has invalid value: ${process.versions.node}`);let n=Number.parseInt(r[0],10),i=Number.parseInt(r[1],10);t.IS_SUPPORT_READDIR_WITH_FILE_TYPES=n>10||10===n&&i>=10},25801:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Settings=t.scandirSync=t.scandir=void 0;let n=r(99578),i=r(62122),s=r(28322);function a(e={}){return e instanceof s.default?e:new s.default(e)}t.Settings=s.default,t.scandir=function(e,t,r){if("function"==typeof t){n.read(e,a(),t);return}n.read(e,a(t),r)},t.scandirSync=function(e,t){let r=a(t);return i.read(e,r)}},99578:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.readdir=t.readdirWithFileTypes=t.read=void 0;let n=r(96494),i=r(33751),s=r(11646),a=r(88591),o=r(22351);function l(e,t,r){t.fs.readdir(e,{withFileTypes:!0},(n,s)=>{if(null!==n){r(n);return}let l=s.map(r=>({dirent:r,name:r.name,path:o.joinPathSegments(e,r.name,t.pathSegmentSeparator)}));if(!t.followSymbolicLinks){r(null,l);return}let u=l.map(e=>r=>{if(!e.dirent.isSymbolicLink()){r(null,e);return}t.fs.stat(e.path,(n,i)=>{if(null!==n){if(t.throwErrorOnBrokenSymbolicLink){r(n);return}r(null,e);return}e.dirent=a.fs.createDirentFromStats(e.name,i),r(null,e)})});i(u,(e,t)=>{if(null!==e){r(e);return}r(null,t)})})}function u(e,t,r){t.fs.readdir(e,(s,l)=>{if(null!==s){r(s);return}let u=l.map(r=>{let i=o.joinPathSegments(e,r,t.pathSegmentSeparator);return e=>{n.stat(i,t.fsStatSettings,(n,s)=>{if(null!==n){e(n);return}let o={name:r,path:i,dirent:a.fs.createDirentFromStats(r,s)};t.stats&&(o.stats=s),e(null,o)})}});i(u,(e,t)=>{if(null!==e){r(e);return}r(null,t)})})}t.read=function(e,t,r){if(!t.stats&&s.IS_SUPPORT_READDIR_WITH_FILE_TYPES){l(e,t,r);return}u(e,t,r)},t.readdirWithFileTypes=l,t.readdir=u},22351:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.joinPathSegments=void 0,t.joinPathSegments=function(e,t,r){return e.endsWith(r)?e+t:e+r+t}},62122:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.readdir=t.readdirWithFileTypes=t.read=void 0;let n=r(96494),i=r(11646),s=r(88591),a=r(22351);function o(e,t){let r=t.fs.readdirSync(e,{withFileTypes:!0});return r.map(r=>{let n={dirent:r,name:r.name,path:a.joinPathSegments(e,r.name,t.pathSegmentSeparator)};if(n.dirent.isSymbolicLink()&&t.followSymbolicLinks)try{let e=t.fs.statSync(n.path);n.dirent=s.fs.createDirentFromStats(n.name,e)}catch(e){if(t.throwErrorOnBrokenSymbolicLink)throw e}return n})}function l(e,t){let r=t.fs.readdirSync(e);return r.map(r=>{let i=a.joinPathSegments(e,r,t.pathSegmentSeparator),o=n.statSync(i,t.fsStatSettings),l={name:r,path:i,dirent:s.fs.createDirentFromStats(r,o)};return t.stats&&(l.stats=o),l})}t.read=function(e,t){return!t.stats&&i.IS_SUPPORT_READDIR_WITH_FILE_TYPES?o(e,t):l(e,t)},t.readdirWithFileTypes=o,t.readdir=l},28322:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0});let n=r(71017),i=r(96494),s=r(45872);class a{constructor(e={}){this._options=e,this.followSymbolicLinks=this._getValue(this._options.followSymbolicLinks,!1),this.fs=s.createFileSystemAdapter(this._options.fs),this.pathSegmentSeparator=this._getValue(this._options.pathSegmentSeparator,n.sep),this.stats=this._getValue(this._options.stats,!1),this.throwErrorOnBrokenSymbolicLink=this._getValue(this._options.throwErrorOnBrokenSymbolicLink,!0),this.fsStatSettings=new i.Settings({followSymbolicLink:this.followSymbolicLinks,fs:this.fs,throwErrorOnBrokenSymbolicLink:this.throwErrorOnBrokenSymbolicLink})}_getValue(e,t){return null!=e?e:t}}t.default=a},87885:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.createDirentFromStats=void 0;class r{constructor(e,t){this.name=e,this.isBlockDevice=t.isBlockDevice.bind(t),this.isCharacterDevice=t.isCharacterDevice.bind(t),this.isDirectory=t.isDirectory.bind(t),this.isFIFO=t.isFIFO.bind(t),this.isFile=t.isFile.bind(t),this.isSocket=t.isSocket.bind(t),this.isSymbolicLink=t.isSymbolicLink.bind(t)}}t.createDirentFromStats=function(e,t){return new r(e,t)}},88591:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.fs=void 0;let n=r(87885);t.fs=n},98270:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.createFileSystemAdapter=t.FILE_SYSTEM_ADAPTER=void 0;let n=r(57147);t.FILE_SYSTEM_ADAPTER={lstat:n.lstat,stat:n.stat,lstatSync:n.lstatSync,statSync:n.statSync},t.createFileSystemAdapter=function(e){return void 0===e?t.FILE_SYSTEM_ADAPTER:Object.assign(Object.assign({},t.FILE_SYSTEM_ADAPTER),e)}},96494:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.statSync=t.stat=t.Settings=void 0;let n=r(30090),i=r(50676),s=r(14);function a(e={}){return e instanceof s.default?e:new s.default(e)}t.Settings=s.default,t.stat=function(e,t,r){if("function"==typeof t){n.read(e,a(),t);return}n.read(e,a(t),r)},t.statSync=function(e,t){let r=a(t);return i.read(e,r)}},30090:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.read=void 0,t.read=function(e,t,r){t.fs.lstat(e,(n,i)=>{if(null!==n){r(n);return}if(!i.isSymbolicLink()||!t.followSymbolicLink){r(null,i);return}t.fs.stat(e,(e,n)=>{if(null!==e){if(t.throwErrorOnBrokenSymbolicLink){r(e);return}r(null,i);return}t.markSymbolicLink&&(n.isSymbolicLink=()=>!0),r(null,n)})})}},50676:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.read=void 0,t.read=function(e,t){let r=t.fs.lstatSync(e);if(!r.isSymbolicLink()||!t.followSymbolicLink)return r;try{let r=t.fs.statSync(e);return t.markSymbolicLink&&(r.isSymbolicLink=()=>!0),r}catch(e){if(!t.throwErrorOnBrokenSymbolicLink)return r;throw e}}},14:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0});let n=r(98270);class i{constructor(e={}){this._options=e,this.followSymbolicLink=this._getValue(this._options.followSymbolicLink,!0),this.fs=n.createFileSystemAdapter(this._options.fs),this.markSymbolicLink=this._getValue(this._options.markSymbolicLink,!1),this.throwErrorOnBrokenSymbolicLink=this._getValue(this._options.throwErrorOnBrokenSymbolicLink,!0)}_getValue(e,t){return null!=e?e:t}}t.default=i},54087:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Settings=t.walkStream=t.walkSync=t.walk=void 0;let n=r(50504),i=r(83860),s=r(63207),a=r(52737);function o(e={}){return e instanceof a.default?e:new a.default(e)}t.Settings=a.default,t.walk=function(e,t,r){if("function"==typeof t){new n.default(e,o()).read(t);return}new n.default(e,o(t)).read(r)},t.walkSync=function(e,t){let r=o(t),n=new s.default(e,r);return n.read()},t.walkStream=function(e,t){let r=o(t),n=new i.default(e,r);return n.read()}},50504:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0});let n=r(61655);class i{constructor(e,t){this._root=e,this._settings=t,this._reader=new n.default(this._root,this._settings),this._storage=[]}read(e){this._reader.onError(t=>{e(t)}),this._reader.onEntry(e=>{this._storage.push(e)}),this._reader.onEnd(()=>{e(null,this._storage)}),this._reader.read()}}t.default=i},83860:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0});let n=r(12781),i=r(61655);class s{constructor(e,t){this._root=e,this._settings=t,this._reader=new i.default(this._root,this._settings),this._stream=new n.Readable({objectMode:!0,read:()=>{},destroy:()=>{this._reader.isDestroyed||this._reader.destroy()}})}read(){return this._reader.onError(e=>{this._stream.emit("error",e)}),this._reader.onEntry(e=>{this._stream.push(e)}),this._reader.onEnd(()=>{this._stream.push(null)}),this._reader.read(),this._stream}}t.default=s},63207:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0});let n=r(52251);class i{constructor(e,t){this._root=e,this._settings=t,this._reader=new n.default(this._root,this._settings)}read(){return this._reader.read()}}t.default=i},61655:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0});let n=r(82361),i=r(25801),s=r(58141),a=r(49727),o=r(93779);class l extends o.default{constructor(e,t){super(e,t),this._settings=t,this._scandir=i.scandir,this._emitter=new n.EventEmitter,this._queue=s(this._worker.bind(this),this._settings.concurrency),this._isFatalError=!1,this._isDestroyed=!1,this._queue.drain=()=>{this._isFatalError||this._emitter.emit("end")}}read(){return this._isFatalError=!1,this._isDestroyed=!1,setImmediate(()=>{this._pushToQueue(this._root,this._settings.basePath)}),this._emitter}get isDestroyed(){return this._isDestroyed}destroy(){if(this._isDestroyed)throw Error("The reader is already destroyed");this._isDestroyed=!0,this._queue.killAndDrain()}onEntry(e){this._emitter.on("entry",e)}onError(e){this._emitter.once("error",e)}onEnd(e){this._emitter.once("end",e)}_pushToQueue(e,t){this._queue.push({directory:e,base:t},e=>{null!==e&&this._handleError(e)})}_worker(e,t){this._scandir(e.directory,this._settings.fsScandirSettings,(r,n)=>{if(null!==r){t(r,void 0);return}for(let t of n)this._handleEntry(t,e.base);t(null,void 0)})}_handleError(e){!this._isDestroyed&&a.isFatalError(this._settings,e)&&(this._isFatalError=!0,this._isDestroyed=!0,this._emitter.emit("error",e))}_handleEntry(e,t){if(this._isDestroyed||this._isFatalError)return;let r=e.path;void 0!==t&&(e.path=a.joinPathSegments(t,e.name,this._settings.pathSegmentSeparator)),a.isAppliedFilter(this._settings.entryFilter,e)&&this._emitEntry(e),e.dirent.isDirectory()&&a.isAppliedFilter(this._settings.deepFilter,e)&&this._pushToQueue(r,void 0===t?void 0:e.path)}_emitEntry(e){this._emitter.emit("entry",e)}}t.default=l},49727:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.joinPathSegments=t.replacePathSegmentSeparator=t.isAppliedFilter=t.isFatalError=void 0,t.isFatalError=function(e,t){return null===e.errorFilter||!e.errorFilter(t)},t.isAppliedFilter=function(e,t){return null===e||e(t)},t.replacePathSegmentSeparator=function(e,t){return e.split(/[/\\]/).join(t)},t.joinPathSegments=function(e,t,r){return""===e?t:e.endsWith(r)?e+t:e+r+t}},93779:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0});let n=r(49727);class i{constructor(e,t){this._root=e,this._settings=t,this._root=n.replacePathSegmentSeparator(e,t.pathSegmentSeparator)}}t.default=i},52251:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0});let n=r(25801),i=r(49727),s=r(93779);class a extends s.default{constructor(){super(...arguments),this._scandir=n.scandirSync,this._storage=[],this._queue=new Set}read(){return this._pushToQueue(this._root,this._settings.basePath),this._handleQueue(),this._storage}_pushToQueue(e,t){this._queue.add({directory:e,base:t})}_handleQueue(){for(let e of this._queue.values())this._handleDirectory(e.directory,e.base)}_handleDirectory(e,t){try{let r=this._scandir(e,this._settings.fsScandirSettings);for(let e of r)this._handleEntry(e,t)}catch(e){this._handleError(e)}}_handleError(e){if(i.isFatalError(this._settings,e))throw e}_handleEntry(e,t){let r=e.path;void 0!==t&&(e.path=i.joinPathSegments(t,e.name,this._settings.pathSegmentSeparator)),i.isAppliedFilter(this._settings.entryFilter,e)&&this._pushToStorage(e),e.dirent.isDirectory()&&i.isAppliedFilter(this._settings.deepFilter,e)&&this._pushToQueue(r,void 0===t?void 0:e.path)}_pushToStorage(e){this._storage.push(e)}}t.default=a},52737:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0});let n=r(71017),i=r(25801);class s{constructor(e={}){this._options=e,this.basePath=this._getValue(this._options.basePath,void 0),this.concurrency=this._getValue(this._options.concurrency,Number.POSITIVE_INFINITY),this.deepFilter=this._getValue(this._options.deepFilter,null),this.entryFilter=this._getValue(this._options.entryFilter,null),this.errorFilter=this._getValue(this._options.errorFilter,null),this.pathSegmentSeparator=this._getValue(this._options.pathSegmentSeparator,n.sep),this.fsScandirSettings=new i.Settings({followSymbolicLinks:this._options.followSymbolicLinks,fs:this._options.fs,pathSegmentSeparator:this._options.pathSegmentSeparator,stats:this._options.stats,throwErrorOnBrokenSymbolicLink:this._options.throwErrorOnBrokenSymbolicLink})}_getValue(e,t){return null!=e?e:t}}t.default=s},5001:e=>{function t(e,t,i){e instanceof RegExp&&(e=r(e,i)),t instanceof RegExp&&(t=r(t,i));var s=n(e,t,i);return s&&{start:s[0],end:s[1],pre:i.slice(0,s[0]),body:i.slice(s[0]+e.length,s[1]),post:i.slice(s[1]+t.length)}}function r(e,t){var r=t.match(e);return r?r[0]:null}function n(e,t,r){var n,i,s,a,o,l=r.indexOf(e),u=r.indexOf(t,l+1),c=l;if(l>=0&&u>0){if(e===t)return[l,u];for(n=[],s=r.length;c>=0&&!o;)c==l?(n.push(c),l=r.indexOf(e,c+1)):1==n.length?o=[n.pop(),u]:((i=n.pop())<s&&(s=i,a=u),u=r.indexOf(t,c+1)),c=l<u&&l>=0?l:u;n.length&&(o=[s,a])}return o}e.exports=t,t.range=n},45792:(e,t,r)=>{let n=r(59711),i=r(16984),s=r(91320),a=r(80206),o=(e,t={})=>{let r=[];if(Array.isArray(e))for(let n of e){let e=o.create(n,t);Array.isArray(e)?r.push(...e):r.push(e)}else r=[].concat(o.create(e,t));return t&&!0===t.expand&&!0===t.nodupes&&(r=[...new Set(r)]),r};o.parse=(e,t={})=>a(e,t),o.stringify=(e,t={})=>"string"==typeof e?n(o.parse(e,t),t):n(e,t),o.compile=(e,t={})=>("string"==typeof e&&(e=o.parse(e,t)),i(e,t)),o.expand=(e,t={})=>{"string"==typeof e&&(e=o.parse(e,t));let r=s(e,t);return!0===t.noempty&&(r=r.filter(Boolean)),!0===t.nodupes&&(r=[...new Set(r)]),r},o.create=(e,t={})=>""===e||e.length<3?[e]:!0!==t.expand?o.compile(e,t):o.expand(e,t),e.exports=o},16984:(e,t,r)=>{let n=r(26526),i=r(1512);e.exports=(e,t={})=>{let r=(e,s={})=>{let a=i.isInvalidBrace(s),o=!0===e.invalid&&!0===t.escapeInvalid,l=!0===a||!0===o,u=!0===t.escapeInvalid?"\\":"",c="";if(!0===e.isOpen||!0===e.isClose)return u+e.value;if("open"===e.type)return l?u+e.value:"(";if("close"===e.type)return l?u+e.value:")";if("comma"===e.type)return"comma"===e.prev.type?"":l?e.value:"|";if(e.value)return e.value;if(e.nodes&&e.ranges>0){let r=i.reduce(e.nodes),s=n(...r,{...t,wrap:!1,toRegex:!0});if(0!==s.length)return r.length>1&&s.length>1?`(${s})`:s}if(e.nodes)for(let t of e.nodes)c+=r(t,e);return c};return r(e)}},46773:e=>{e.exports={MAX_LENGTH:65536,CHAR_0:"0",CHAR_9:"9",CHAR_UPPERCASE_A:"A",CHAR_LOWERCASE_A:"a",CHAR_UPPERCASE_Z:"Z",CHAR_LOWERCASE_Z:"z",CHAR_LEFT_PARENTHESES:"(",CHAR_RIGHT_PARENTHESES:")",CHAR_ASTERISK:"*",CHAR_AMPERSAND:"&",CHAR_AT:"@",CHAR_BACKSLASH:"\\",CHAR_BACKTICK:"`",CHAR_CARRIAGE_RETURN:"\r",CHAR_CIRCUMFLEX_ACCENT:"^",CHAR_COLON:":",CHAR_COMMA:",",CHAR_DOLLAR:"$",CHAR_DOT:".",CHAR_DOUBLE_QUOTE:'"',CHAR_EQUAL:"=",CHAR_EXCLAMATION_MARK:"!",CHAR_FORM_FEED:"\f",CHAR_FORWARD_SLASH:"/",CHAR_HASH:"#",CHAR_HYPHEN_MINUS:"-",CHAR_LEFT_ANGLE_BRACKET:"<",CHAR_LEFT_CURLY_BRACE:"{",CHAR_LEFT_SQUARE_BRACKET:"[",CHAR_LINE_FEED:"\n",CHAR_NO_BREAK_SPACE:"\xa0",CHAR_PERCENT:"%",CHAR_PLUS:"+",CHAR_QUESTION_MARK:"?",CHAR_RIGHT_ANGLE_BRACKET:">",CHAR_RIGHT_CURLY_BRACE:"}",CHAR_RIGHT_SQUARE_BRACKET:"]",CHAR_SEMICOLON:";",CHAR_SINGLE_QUOTE:"'",CHAR_SPACE:" ",CHAR_TAB:"	",CHAR_UNDERSCORE:"_",CHAR_VERTICAL_LINE:"|",CHAR_ZERO_WIDTH_NOBREAK_SPACE:"\uFEFF"}},91320:(e,t,r)=>{let n=r(26526),i=r(59711),s=r(1512),a=(e="",t="",r=!1)=>{let n=[];if(e=[].concat(e),!(t=[].concat(t)).length)return e;if(!e.length)return r?s.flatten(t).map(e=>`{${e}}`):t;for(let i of e)if(Array.isArray(i))for(let e of i)n.push(a(e,t,r));else for(let e of t)!0===r&&"string"==typeof e&&(e=`{${e}}`),n.push(Array.isArray(e)?a(i,e,r):i+e);return s.flatten(n)};e.exports=(e,t={})=>{let r=void 0===t.rangeLimit?1e3:t.rangeLimit,o=(e,l={})=>{e.queue=[];let u=l,c=l.queue;for(;"brace"!==u.type&&"root"!==u.type&&u.parent;)c=(u=u.parent).queue;if(e.invalid||e.dollar){c.push(a(c.pop(),i(e,t)));return}if("brace"===e.type&&!0!==e.invalid&&2===e.nodes.length){c.push(a(c.pop(),["{}"]));return}if(e.nodes&&e.ranges>0){let o=s.reduce(e.nodes);if(s.exceedsLimit(...o,t.step,r))throw RangeError("expanded array length exceeds range limit. Use options.rangeLimit to increase or disable the limit.");let l=n(...o,t);0===l.length&&(l=i(e,t)),c.push(a(c.pop(),l)),e.nodes=[];return}let d=s.encloseBrace(e),h=e.queue,p=e;for(;"brace"!==p.type&&"root"!==p.type&&p.parent;)h=(p=p.parent).queue;for(let t=0;t<e.nodes.length;t++){let r=e.nodes[t];if("comma"===r.type&&"brace"===e.type){1===t&&h.push(""),h.push("");continue}if("close"===r.type){c.push(a(c.pop(),h,d));continue}if(r.value&&"open"!==r.type){h.push(a(h.pop(),r.value));continue}r.nodes&&o(r,e)}return h};return s.flatten(o(e))}},80206:(e,t,r)=>{let n=r(59711),{MAX_LENGTH:i,CHAR_BACKSLASH:s,CHAR_BACKTICK:a,CHAR_COMMA:o,CHAR_DOT:l,CHAR_LEFT_PARENTHESES:u,CHAR_RIGHT_PARENTHESES:c,CHAR_LEFT_CURLY_BRACE:d,CHAR_RIGHT_CURLY_BRACE:h,CHAR_LEFT_SQUARE_BRACKET:p,CHAR_RIGHT_SQUARE_BRACKET:f,CHAR_DOUBLE_QUOTE:y,CHAR_SINGLE_QUOTE:m,CHAR_NO_BREAK_SPACE:g,CHAR_ZERO_WIDTH_NOBREAK_SPACE:b}=r(46773);e.exports=(e,t={})=>{let r;if("string"!=typeof e)throw TypeError("Expected a string");let S=t||{},v="number"==typeof S.maxLength?Math.min(i,S.maxLength):i;if(e.length>v)throw SyntaxError(`Input length (${e.length}), exceeds max characters (${v})`);let E={type:"root",input:e,nodes:[]},k=[E],K=E,w=E,I=0,x=e.length,A=0,T=0,j=()=>e[A++],R=e=>{if("text"===e.type&&"dot"===w.type&&(w.type="text"),w&&"text"===w.type&&"text"===e.type){w.value+=e.value;return}return K.nodes.push(e),e.parent=K,e.prev=w,w=e,e};for(R({type:"bos"});A<x;)if(K=k[k.length-1],(r=j())!==b&&r!==g){if(r===s){R({type:"text",value:(t.keepEscaping?r:"")+j()});continue}if(r===f){R({type:"text",value:"\\"+r});continue}if(r===p){let e;for(I++;A<x&&(e=j());){if(r+=e,e===p){I++;continue}if(e===s){r+=j();continue}if(e===f&&0==--I)break}R({type:"text",value:r});continue}if(r===u){K=R({type:"paren",nodes:[]}),k.push(K),R({type:"text",value:r});continue}if(r===c){if("paren"!==K.type){R({type:"text",value:r});continue}K=k.pop(),R({type:"text",value:r}),K=k[k.length-1];continue}if(r===y||r===m||r===a){let e,n=r;for(!0!==t.keepQuotes&&(r="");A<x&&(e=j());){if(e===s){r+=e+j();continue}if(e===n){!0===t.keepQuotes&&(r+=e);break}r+=e}R({type:"text",value:r});continue}if(r===d){T++,K=R({type:"brace",open:!0,close:!1,dollar:w.value&&"$"===w.value.slice(-1)||!0===K.dollar,depth:T,commas:0,ranges:0,nodes:[]}),k.push(K),R({type:"open",value:r});continue}if(r===h){if("brace"!==K.type){R({type:"text",value:r});continue}(K=k.pop()).close=!0,R({type:"close",value:r}),T--,K=k[k.length-1];continue}if(r===o&&T>0){if(K.ranges>0){K.ranges=0;let e=K.nodes.shift();K.nodes=[e,{type:"text",value:n(K)}]}R({type:"comma",value:r}),K.commas++;continue}if(r===l&&T>0&&0===K.commas){let e=K.nodes;if(0===T||0===e.length){R({type:"text",value:r});continue}if("dot"===w.type){if(K.range=[],w.value+=r,w.type="range",3!==K.nodes.length&&5!==K.nodes.length){K.invalid=!0,K.ranges=0,w.type="text";continue}K.ranges++,K.args=[];continue}if("range"===w.type){e.pop();let t=e[e.length-1];t.value+=w.value+r,w=t,K.ranges--;continue}R({type:"dot",value:r});continue}R({type:"text",value:r})}do if("root"!==(K=k.pop()).type){K.nodes.forEach(e=>{e.nodes||("open"===e.type&&(e.isOpen=!0),"close"===e.type&&(e.isClose=!0),e.nodes||(e.type="text"),e.invalid=!0)});let e=k[k.length-1],t=e.nodes.indexOf(K);e.nodes.splice(t,1,...K.nodes)}while(k.length>0);return R({type:"eos"}),E}},59711:(e,t,r)=>{let n=r(1512);e.exports=(e,t={})=>{let r=(e,i={})=>{let s=t.escapeInvalid&&n.isInvalidBrace(i),a=!0===e.invalid&&!0===t.escapeInvalid,o="";if(e.value)return(s||a)&&n.isOpenOrClose(e)?"\\"+e.value:e.value;if(e.value)return e.value;if(e.nodes)for(let t of e.nodes)o+=r(t);return o};return r(e)}},1512:(e,t)=>{t.isInteger=e=>"number"==typeof e?Number.isInteger(e):"string"==typeof e&&""!==e.trim()&&Number.isInteger(Number(e)),t.find=(e,t)=>e.nodes.find(e=>e.type===t),t.exceedsLimit=(e,r,n=1,i)=>!!(!1!==i&&t.isInteger(e)&&t.isInteger(r))&&(Number(r)-Number(e))/Number(n)>=i,t.escapeNode=(e,t=0,r)=>{let n=e.nodes[t];n&&(r&&n.type===r||"open"===n.type||"close"===n.type)&&!0!==n.escaped&&(n.value="\\"+n.value,n.escaped=!0)},t.encloseBrace=e=>"brace"===e.type&&e.commas>>0+e.ranges>>0==0&&(e.invalid=!0,!0),t.isInvalidBrace=e=>"brace"===e.type&&(!0===e.invalid||!!e.dollar||(e.commas>>0+e.ranges>>0==0||!0!==e.open||!0!==e.close)&&(e.invalid=!0,!0)),t.isOpenOrClose=e=>"open"===e.type||"close"===e.type||!0===e.open||!0===e.close,t.reduce=e=>e.reduce((e,t)=>("text"===t.type&&e.push(t.value),"range"===t.type&&(t.type="text"),e),[]),t.flatten=(...e)=>{let t=[],r=e=>{for(let n=0;n<e.length;n++){let i=e[n];Array.isArray(i)?r(i,t):void 0!==i&&t.push(i)}return t};return r(e),t}},85288:(e,t,r)=>{r.d(t,{x:()=>n});class n{static normalize(e){return Number.isFinite(e)?{type:"fixed",delay:e}:e||void 0}static calculate(e,t,r,i,s){if(e){let a=function(e,t){if(e.type in n.builtinStrategies)return n.builtinStrategies[e.type](e.delay);if(t)return t;throw Error(`Unknown backoff strategy ${e.type}.
      If a custom backoff strategy is used, specify it when the queue is created.`)}(e,s);return a(t,e.type,r,i)}}}n.builtinStrategies={fixed:function(e){return function(){return e}},exponential:function(e){return function(t){return Math.round(Math.pow(2,t-1)*e)}}}},63313:(e,t,r)=>{r.d(t,{Z:()=>p});var n=r(71017),i=r(32081),s=r(71267),a=r(41808),o=r(70344),l=r(82361);let u={1:"Uncaught Fatal Exception",2:"Unused",3:"Internal JavaScript Parse Error",4:"Internal JavaScript Evaluation Failure",5:"Fatal Error",6:"Non-function Internal Exception Handler",7:"Internal Exception Handler Run-Time Failure",8:"Unused",9:"Invalid Argument",10:"Internal JavaScript Run-Time Failure",12:"Invalid Debug Argument",13:"Unfinished Top-Level Await"};class c extends l.EventEmitter{constructor(e,t,r={useWorkerThreads:!1}){super(),this.mainFile=e,this.processFile=t,this.opts=r,this._exitCode=null,this._signalCode=null,this._killed=!1}get pid(){if(this.childProcess)return this.childProcess.pid;if(this.worker)return this.worker.threadId;throw Error("No child process or worker thread")}get exitCode(){return this._exitCode}get signalCode(){return this._signalCode}get killed(){return this.childProcess?this.childProcess.killed:this._killed}async init(){let e;let t=await h(process.execArgv);this.opts.useWorkerThreads?this.worker=e=new s.Worker(this.mainFile,{execArgv:t,stdin:!0,stdout:!0,stderr:!0}):this.childProcess=e=(0,i.fork)(this.mainFile,[],{execArgv:t,stdio:"pipe"}),e.on("exit",(t,r)=>{this._exitCode=t,r=void 0===r?null:r,this._signalCode=r,this._killed=!0,this.emit("exit",t,r),e.removeAllListeners(),this.removeAllListeners()}),e.on("error",(...e)=>this.emit("error",...e)),e.on("message",(...e)=>this.emit("message",...e)),e.on("close",(...e)=>this.emit("close",...e)),e.stdout.pipe(process.stdout),e.stderr.pipe(process.stderr),await this.initChild()}async send(e){return new Promise((t,r)=>{this.childProcess?this.childProcess.send(e,e=>{e?r(e):t()}):this.worker?t(this.worker.postMessage(e)):t()})}killProcess(e="SIGKILL"){this.childProcess?this.childProcess.kill(e):this.worker&&this.worker.terminate()}async kill(e="SIGKILL",t){var r;if(this.hasProcessExited())return;let n=(r=this.childProcess||this.worker,new Promise(e=>{r.once("exit",()=>e())}));if(this.killProcess(e),void 0!==t&&(0===t||isFinite(t))){let e=setTimeout(()=>{this.hasProcessExited()||this.killProcess("SIGKILL")},t);await n,clearTimeout(e)}await n}async initChild(){let e=new Promise((e,t)=>{let r=i=>{if(i.cmd===o.d$.InitCompleted)e();else if(i.cmd===o.d$.InitFailed){let e=Error();e.stack=i.err.stack,e.message=i.err.message,t(e)}this.off("message",r),this.off("close",n)},n=(e,i)=>{e>128&&(e-=128);let s=u[e]||`Unknown exit code ${e}`;t(Error(`Error initializing child: ${s} and signal ${i}`)),this.off("message",r),this.off("close",n)};this.on("message",r),this.on("close",n)});await this.send({cmd:o.uv.Init,value:this.processFile}),await e}hasProcessExited(){return!!(null!==this.exitCode||this.signalCode)}}let d=async()=>new Promise(e=>{let t=(0,a.createServer)();t.listen(0,()=>{let{port:r}=t.address();t.close(()=>e(r))})}),h=async e=>{let t=[],r=[];for(let n=0;n<e.length;n++){let i=e[n];if(-1===i.indexOf("--inspect"))t.push(i);else{let e=i.split("=")[0],t=await d();r.push(`${e}=${t}`)}}return t.concat(r)};class p{constructor({mainFile:e=n.join(process.cwd(),"dist/cjs/classes/main.js"),useWorkerThreads:t}){this.retained={},this.free={},this.opts={mainFile:e,useWorkerThreads:t}}async retain(e){let t=this.getFree(e).pop();if(t)return this.retained[t.pid]=t,t;(t=new c(this.opts.mainFile,e,{useWorkerThreads:this.opts.useWorkerThreads})).on("exit",this.remove.bind(this,t));try{return await t.init(),this.retained[t.pid]=t,t}catch(e){throw console.error(e),this.release(t),e}}release(e){delete this.retained[e.pid],this.getFree(e.processFile).push(e)}remove(e){delete this.retained[e.pid];let t=this.getFree(e.processFile),r=t.indexOf(e);r>-1&&t.splice(r,1)}async kill(e,t="SIGKILL"){return this.remove(e),e.kill(t,3e4)}async clean(){let e=Object.values(this.retained).concat(this.getAllFree());this.retained={},this.free={},await Promise.all(e.map(e=>this.kill(e,"SIGTERM")))}getFree(e){return this.free[e]=this.free[e]||[]}getAllFree(){return Object.values(this.free).reduce((e,t)=>e.concat(t),[])}}},84929:(e,t,r)=>{r.d(t,{o:()=>f});var n=r(87175),i=r(52626),s=r.n(i),a=r(73837),o=r(11699),l=r(85288),u=r(34676);class c extends Error{constructor(e){super(e),this.name=this.constructor.name,Object.setPrototypeOf(this,new.target.prototype)}}let d=(0,a.debuglog)("bull"),h={fpof:"failParentOnFailure",idof:"ignoreDependencyOnFailure",kl:"keepLogs",rdof:"removeDependencyOnFailure"},p=s()(h);class f{constructor(e,t,r,i={},s){this.queue=e,this.name=t,this.data=r,this.opts=i,this.id=s,this.progress=0,this.returnvalue=null,this.stacktrace=null,this.attemptsStarted=0,this.attemptsMade=0;let a=this.opts,{repeatJobKey:c}=a,d=(0,n._T)(a,["repeatJobKey"]);this.opts=Object.assign({attempts:0,delay:0},d),this.delay=this.opts.delay,this.repeatJobKey=c,this.timestamp=i.timestamp?i.timestamp:Date.now(),this.opts.backoff=l.x.normalize(i.backoff),this.parentKey=(0,o.pV)(i.parent),this.parent=i.parent?{id:i.parent.id,queueKey:i.parent.queue}:void 0,this.toKey=e.toKey.bind(e),this.scripts=new u.K(e),this.queueQualifiedName=e.qualifiedName}static async create(e,t,r,n){let i=await e.client,s=new this(e,t,r,n,n&&n.jobId);return s.id=await s.addJob(i,{parentKey:s.parentKey,parentDependenciesKey:s.parentKey?`${s.parentKey}:dependencies`:""}),s}static async createBulk(e,t){let r=await e.client,n=t.map(t=>{var r;return new this(e,t.name,t.data,t.opts,null===(r=t.opts)||void 0===r?void 0:r.jobId)}),i=r.multi();for(let e of n)e.addJob(i,{parentKey:e.parentKey,parentDependenciesKey:e.parentKey?`${e.parentKey}:dependencies`:""});let s=await i.exec();for(let e=0;e<s.length;++e){let[t,r]=s[e];if(t)throw t;n[e].id=r}return n}static fromJSON(e,t,r){let n=JSON.parse(t.data||"{}"),i=f.optsFromJSON(t.opts),s=new this(e,t.name,n,i,t.id||r);return s.progress=JSON.parse(t.progress||"0"),s.delay=parseInt(t.delay),s.timestamp=parseInt(t.timestamp),t.finishedOn&&(s.finishedOn=parseInt(t.finishedOn)),t.processedOn&&(s.processedOn=parseInt(t.processedOn)),t.rjk&&(s.repeatJobKey=t.rjk),s.failedReason=t.failedReason,s.attemptsStarted=parseInt(t.ats||"0"),s.attemptsMade=parseInt(t.attemptsMade||t.atm||"0"),s.stacktrace=function(e){let t=(0,o.Y3)(JSON.parse,JSON,[e]);return t!==o.TJ&&t instanceof Array?t:[]}(t.stacktrace),"string"==typeof t.returnvalue&&(s.returnvalue=y(t.returnvalue)),t.parentKey&&(s.parentKey=t.parentKey),t.parent&&(s.parent=JSON.parse(t.parent)),t.pb&&(s.processedBy=t.pb),s}static optsFromJSON(e){let t=JSON.parse(e||"{}"),r=Object.entries(t),n={};for(let e of r){let[t,r]=e;h[t]?n[h[t]]=r:n[t]=r}return n}static async fromId(e,t){if(t){let r=await e.client,n=await r.hgetall(e.toKey(t));return(0,o.xb)(n)?void 0:this.fromJSON(e,n,t)}}static async addJobLog(e,t,r,n){let i=await e.client,s=e.toKey(t)+":logs",a=i.multi();a.rpush(s,r),n&&a.ltrim(s,-n,-1);let o=await a.exec();return n?Math.min(n,o[0][1]):o[0][1]}toJSON(){let{queue:e,scripts:t}=this,r=(0,n._T)(this,["queue","scripts"]);return r}asJSON(){return{id:this.id,name:this.name,data:JSON.stringify(void 0===this.data?{}:this.data),opts:this.optsAsJSON(this.opts),parent:this.parent?Object.assign({},this.parent):void 0,parentKey:this.parentKey,progress:this.progress,attemptsMade:this.attemptsMade,attemptsStarted:this.attemptsStarted,finishedOn:this.finishedOn,processedOn:this.processedOn,timestamp:this.timestamp,failedReason:JSON.stringify(this.failedReason),stacktrace:JSON.stringify(this.stacktrace),repeatJobKey:this.repeatJobKey,returnvalue:JSON.stringify(this.returnvalue)}}optsAsJSON(e={}){let t=Object.entries(e),r={};for(let e of t){let[t,n]=e;p[t]?r[p[t]]=n:r[t]=n}return r}asJSONSandbox(){return Object.assign(Object.assign({},this.asJSON()),{queueName:this.queueName,prefix:this.prefix})}updateData(e){return this.data=e,this.scripts.updateData(this,e)}async updateProgress(e){this.progress=e,await this.scripts.updateProgress(this.id,e),this.queue.emit("progress",this,e)}async log(e){return f.addJobLog(this.queue,this.id,e,this.opts.keepLogs)}async removeChildDependency(){let e=await this.scripts.removeChildDependency(this.id,this.parentKey);return!!e&&(this.parent=void 0,this.parentKey=void 0,!0)}async clearLogs(e){let t=await this.queue.client,r=this.toKey(this.id)+":logs";e?await t.ltrim(r,-e,-1):await t.del(r)}async remove({removeChildren:e=!0}={}){await this.queue.waitUntilReady();let t=this.queue,r=await this.scripts.remove(this.id,e);if(r)t.emit("removed",this);else throw Error(`Job ${this.id} could not be removed because it is locked by another worker`)}extendLock(e,t){return this.scripts.extendLock(this.id,e,t)}async moveToCompleted(e,t,r=!0){await this.queue.waitUntilReady(),this.returnvalue=e||void 0;let n=(0,o.Y3)(JSON.stringify,JSON,[e]);if(n===o.TJ)throw o.TJ.value;let i=this.scripts.moveToCompletedArgs(this,n,this.opts.removeOnComplete,t,r),s=await this.scripts.moveToFinished(this.id,i);return this.finishedOn=i[this.scripts.moveToFinishedKeys.length+1],this.attemptsMade+=1,s}async moveToFailed(e,t,r=!1){let n,i,s;let a=await this.queue.client,o=null==e?void 0:e.message,u=this.queue;this.failedReason=o;let d=a.multi();this.saveStacktrace(d,e);let h=!1;if(!(this.attemptsMade+1<this.opts.attempts)||this.discarded||e instanceof c||"UnrecoverableError"==e.name)h=!0;else{let r=u.opts;if(-1===(s=await l.x.calculate(this.opts.backoff,this.attemptsMade+1,e,this,r.settings&&r.settings.backoffStrategy)))h=!0;else if(s){let e=this.scripts.moveToDelayedArgs(this.id,Date.now()+s,t,s);d.moveToDelayed(e),n="delayed"}else d.retryJob(this.scripts.retryJobArgs(this.id,this.opts.lifo,t)),n="retryJob"}if(h){let e=this.scripts.moveToFailedArgs(this,o,this.opts.removeOnFail,t,r);d.moveToFinished(e),i=e[this.scripts.moveToFinishedKeys.length+1],n="failed"}let p=await d.exec(),f=p.find(e=>e[0]);if(f)throw Error(`Error "moveToFailed" with command ${n}: ${f}`);let y=p[p.length-1][1];if(y<0)throw this.scripts.finishedErrors({code:y,jobId:this.id,command:n,state:"active"});i&&"number"==typeof i&&(this.finishedOn=i),s&&"number"==typeof s&&(this.delay=s),this.attemptsMade+=1}isCompleted(){return this.isInZSet("completed")}isFailed(){return this.isInZSet("failed")}isDelayed(){return this.isInZSet("delayed")}isWaitingChildren(){return this.isInZSet("waiting-children")}isActive(){return this.isInList("active")}async isWaiting(){return await this.isInList("wait")||await this.isInList("paused")}get queueName(){return this.queue.name}get prefix(){return this.queue.opts.prefix}getState(){return this.scripts.getState(this.id)}async changeDelay(e){await this.scripts.changeDelay(this.id,e),this.delay=e}async changePriority(e){await this.scripts.changePriority(this.id,e.priority,e.lifo)}async getChildrenValues(){let e=await this.queue.client,t=await e.hgetall(this.toKey(`${this.id}:processed`));if(t)return(0,o.WE)(t)}async getFailedChildrenValues(){let e=await this.queue.client;return e.hgetall(this.toKey(`${this.id}:failed`))}async getDependencies(e={}){let t=await this.queue.client,r=t.multi();if(e.processed||e.unprocessed){let t={cursor:0,count:20};if(e.processed){let n=Object.assign(Object.assign({},t),e.processed);r.hscan(this.toKey(`${this.id}:processed`),n.cursor,"COUNT",n.count)}if(e.unprocessed){let n=Object.assign(Object.assign({},t),e.unprocessed);r.sscan(this.toKey(`${this.id}:dependencies`),n.cursor,"COUNT",n.count)}let[n,i]=await r.exec(),[s,a=[]]=e.processed?n[1]:[],[o,l=[]]=e.unprocessed?e.processed?i[1]:n[1]:[],u={};for(let e=0;e<a.length;++e)e%2&&(u[a[e-1]]=JSON.parse(a[e]));return Object.assign(Object.assign({},s?{processed:u,nextProcessedCursor:Number(s)}:{}),o?{unprocessed:l,nextUnprocessedCursor:Number(o)}:{})}{r.hgetall(this.toKey(`${this.id}:processed`)),r.smembers(this.toKey(`${this.id}:dependencies`));let[[e,t],[n,i]]=await r.exec(),s=(0,o.WE)(t);return{processed:s,unprocessed:i}}}async getDependenciesCount(e={}){let t=await this.queue.client,r=t.multi(),n=e.processed||e.unprocessed?e:{processed:!0,unprocessed:!0};n.processed&&r.hlen(this.toKey(`${this.id}:processed`)),n.unprocessed&&r.scard(this.toKey(`${this.id}:dependencies`));let[[i,s]=[],[a,o]=[]]=await r.exec(),l=n.processed?s:void 0,u=n.unprocessed?n.processed?o:s:void 0;return Object.assign(Object.assign({},n.processed?{processed:l}:{}),n.unprocessed?{unprocessed:u}:{})}async waitUntilFinished(e,t){await this.queue.waitUntilReady();let r=this.id;return new Promise(async(n,i)=>{let s;function a(e){c(),n(e.returnvalue)}function o(e){c(),i(Error(e.failedReason||e))}t&&(s=setTimeout(()=>o(`Job wait ${this.name} timed out before finishing, no finish notification arrived after ${t}ms (id=${r})`),t));let l=`completed:${r}`,u=`failed:${r}`;e.on(l,a),e.on(u,o),this.queue.on("closing",o);let c=()=>{clearInterval(s),e.removeListener(l,a),e.removeListener(u,o),this.queue.removeListener("closing",o)};await e.waitUntilReady();let[d,h]=await this.scripts.isFinished(r,!0);0!=d&&(-1==d||2==d?o({failedReason:h}):a({returnvalue:y(h)}))})}async moveToDelayed(e,t){let r=e-Date.now(),n=await this.scripts.moveToDelayed(this.id,e,r>0?r:0,t,{skipAttempt:!0});return n}async moveToWaitingChildren(e,t={}){let r=await this.scripts.moveToWaitingChildren(this.id,e,t);return r}async promote(){let e=this.id;await this.scripts.promote(e),this.delay=0}retry(e="failed"){return this.failedReason=null,this.finishedOn=null,this.processedOn=null,this.returnvalue=null,this.scripts.reprocessJob(this,e)}discard(){this.discarded=!0}async isInZSet(e){let t=await this.queue.client,r=await t.zscore(this.queue.toKey(e),this.id);return null!==r}async isInList(e){return this.scripts.isJobInList(this.queue.toKey(e),this.id)}addJob(e,t){let r=this.asJSON();return this.validateOptions(r),this.scripts.addJob(e,r,r.opts,this.id,t)}validateOptions(e){var t;let r=this.opts.sizeLimit&&(0,o.iF)(e.data)>this.opts.sizeLimit;if(r)throw Error(`The size of job ${this.name} exceeds the limit ${this.opts.sizeLimit} bytes`);if(this.opts.delay&&this.opts.repeat&&!(null===(t=this.opts.repeat)||void 0===t?void 0:t.count))throw Error("Delay and repeat options could not be used together");if(this.opts.removeDependencyOnFailure&&this.opts.failParentOnFailure)throw Error("RemoveDependencyOnFailure and failParentOnFailure options can not be used together");if(`${parseInt(this.id,10)}`===this.id)throw Error("Custom Ids cannot be integers");if(this.opts.priority){if(Math.trunc(this.opts.priority)!==this.opts.priority)throw Error("Priority should not be float");if(this.opts.priority>2097152)throw Error("Priority should be between 0 and 2097152")}}saveStacktrace(e,t){this.stacktrace=this.stacktrace||[],(null==t?void 0:t.stack)&&(this.stacktrace.push(t.stack),this.opts.stackTraceLimit&&(this.stacktrace=this.stacktrace.slice(0,this.opts.stackTraceLimit)));let r=this.scripts.saveStacktraceArgs(this.id,JSON.stringify(this.stacktrace),null==t?void 0:t.message);e.saveStacktrace(r)}}function y(e){let t=(0,o.Y3)(JSON.parse,JSON,[e]);if(t!==o.TJ)return t;d("corrupted returnvalue: "+e,t)}},61743:(e,t,r)=>{r.d(t,{W:()=>u});var n=r(82361),i=r(11699),s=r(63709),a=r(84929);class o{constructor(e="bull"){this.prefix=e}getKeys(e){let t={};return["","active","wait","waiting-children","paused","id","delayed","prioritized","stalled-check","completed","failed","stalled","repeat","limiter","meta","events","pc","marker"].forEach(r=>{t[r]=this.toKey(e,r)}),t}toKey(e,t){return`${this.getQueueQualifiedName(e)}:${t}`}getQueueQualifiedName(e){return`${this.prefix}:${e}`}}var l=r(34676);class u extends n.EventEmitter{constructor(e,t={connection:{}},r=s.Z){if(super(),this.name=e,this.opts=t,this.closed=!1,this.opts=Object.assign({prefix:"bull"},t),!e)throw Error("Queue name must be provided");this.connection=new r(t.connection,(0,i.Y1)(t.connection),t.blockingConnection,t.skipVersionCheck),this.connection.on("error",e=>this.emit("error",e)),this.connection.on("close",()=>{this.closing||this.emit("ioredis:close")});let n=new o(t.prefix);this.qualifiedName=n.getQueueQualifiedName(e),this.keys=n.getKeys(e),this.toKey=t=>n.toKey(e,t),this.scripts=new l.K(this)}get client(){return this.connection.client}get redisVersion(){return this.connection.redisVersion}get Job(){return a.o}emit(e,...t){try{return super.emit(e,...t)}catch(e){try{return super.emit("error",e)}catch(e){return console.error(e),!1}}}waitUntilReady(){return this.client}base64Name(){return Buffer.from(this.name).toString("base64")}clientName(e=""){let t=this.base64Name();return`${this.opts.prefix}:${t}${e}`}async close(){this.closing||(this.closing=this.connection.close()),await this.closing,this.closed=!0}disconnect(){return this.connection.disconnect()}async checkConnectionError(e,t=i.yf){try{return await e()}catch(e){if((0,i.Zm)(e)&&this.emit("error",e),this.closing||!t)return;await (0,i.gw)(t)}}}},63709:(e,t,r)=>{r.d(t,{Z:()=>eI});var n={};r.r(n),r.d(n,{addDelayedJob:()=>c,addParentJob:()=>h,addPrioritizedJob:()=>f,addStandardJob:()=>m,changeDelay:()=>b,changePriority:()=>v,cleanJobsInSet:()=>k,drain:()=>w,extendLock:()=>x,getCounts:()=>T,getRanges:()=>R,getState:()=>C,getStateV2:()=>P,isFinished:()=>M,isJobInList:()=>L,moveJobFromActiveToWait:()=>V,moveJobsToWait:()=>G,moveStalledJobsToWait:()=>Y,moveToActive:()=>z,moveToDelayed:()=>W,moveToFinished:()=>U,moveToWaitingChildren:()=>Z,obliterate:()=>ee,paginate:()=>er,pause:()=>ei,promote:()=>ea,releaseLock:()=>el,removeChildDependency:()=>ec,removeJob:()=>eh,removeRepeatable:()=>ef,reprocessJob:()=>em,retryJob:()=>eb,saveStacktrace:()=>ev,updateData:()=>ek,updateProgress:()=>ew});var i=r(82361),s=r(26277),a=r.n(s),o=r(27132),l=r(11699);let u=`--[[
  Adds a delayed job to the queue by doing the following:
    - Increases the job counter if needed.
    - Creates a new job key with the job data.
    - computes timestamp.
    - adds to delayed zset.
    - Emits a global event 'delayed' if the job is delayed.
    Input:
      KEYS[1] 'marker',
      KEYS[2] 'meta'
      KEYS[3] 'id'
      KEYS[4] 'delayed'
      KEYS[5] 'completed'
      KEYS[6] events stream key
      ARGV[1] msgpacked arguments array
            [1]  key prefix,
            [2]  custom id (use custom instead of one generated automatically)
            [3]  name
            [4]  timestamp
            [5]  parentKey?
          x [6]  waitChildrenKey key.
            [7]  parent dependencies key.
            [8]  parent? {id, queueKey}
            [9]  repeat job key
      ARGV[2] Json stringified job data
      ARGV[3] msgpacked options
      Output:
        jobId  - OK
        -5     - Missing parent key
]]
local metaKey = KEYS[2]
local idKey = KEYS[3]
local delayedKey = KEYS[4]
local completedKey = KEYS[5]
local eventsKey = KEYS[6]
local jobId
local jobIdKey
local rcall = redis.call
local args = cmsgpack.unpack(ARGV[1])
local data = ARGV[2]
local parentKey = args[5]
local repeatJobKey = args[9]
local parent = args[8]
local parentData
-- Includes
--[[
  Add delay marker if needed.
]]
-- Includes
--[[
  Function to return the next delayed job timestamp.
]]
local function getNextDelayedTimestamp(delayedKey)
  local result = rcall("ZRANGE", delayedKey, 0, 0, "WITHSCORES")
  if #result then
    local nextTimestamp = tonumber(result[2])
    if (nextTimestamp ~= nil) then 
      nextTimestamp = nextTimestamp / 0x1000
    end
    return nextTimestamp
  end
end
local function addDelayMarkerIfNeeded(markerKey, delayedKey)
    local nextTimestamp = getNextDelayedTimestamp(delayedKey)
    if nextTimestamp ~= nil then
        -- Replace the score of the marker with the newest known
        -- next timestamp.
        rcall("ZADD", markerKey, nextTimestamp, "1")
    end
end
--[[
  Function to get max events value or set by default 10000.
]]
local function getOrSetMaxEvents(metaKey)
    local maxEvents = rcall("HGET", metaKey, "opts.maxLenEvents")
    if not maxEvents then
        maxEvents = 10000
        rcall("HSET", metaKey, "opts.maxLenEvents", maxEvents)
    end
    return maxEvents
end
--[[
  Function to handle the case when job is duplicated.
]]
-- Includes
--[[
    This function is used to update the parent's dependencies if the job
    is already completed and about to be ignored. The parent must get its
    dependencies updated to avoid the parent job being stuck forever in 
    the waiting-children state.
]]
-- Includes
--[[
  Validate and move or add dependencies to parent.
]]
-- Includes
--[[
  Validate and move parent to active if needed.
]]
-- Includes
--[[
  Function to add job in target list and add marker if needed.
]]
-- Includes
--[[
  Add marker if needed when a job is available.
]]
local function addBaseMarkerIfNeeded(markerKey, isPaused)
  if not isPaused then
    rcall("ZADD", markerKey, 0, "0")
  end  
end
local function addJobInTargetList(targetKey, markerKey, pushCmd, isPaused, jobId)
  rcall(pushCmd, targetKey, jobId)
  addBaseMarkerIfNeeded(markerKey, isPaused)
end
--[[
  Function to add job considering priority.
]]
-- Includes
local function addJobWithPriority(markerKey, prioritizedKey, priority, jobId, priorityCounterKey, isPaused)
  local prioCounter = rcall("INCR", priorityCounterKey)
  local score = priority * 0x100000000 + bit.band(prioCounter, 0xffffffffffff)
  rcall("ZADD", prioritizedKey, score, jobId)
  addBaseMarkerIfNeeded(markerKey, isPaused)
end
--[[
  Function to check for the meta.paused key to decide if we are paused or not
  (since an empty list and !EXISTS are not really the same).
]]
local function isQueuePaused(queueMetaKey)
    return rcall("HEXISTS", queueMetaKey, "paused") == 1
end
--[[
  Function to check for the meta.paused key to decide if we are paused or not
  (since an empty list and !EXISTS are not really the same).
]]
local function getTargetQueueList(queueMetaKey, waitKey, pausedKey)
  if rcall("HEXISTS", queueMetaKey, "paused") ~= 1 then
    return waitKey, false
  else
    return pausedKey, true
  end
end
local function moveParentToWaitIfNeeded(parentQueueKey, parentDependenciesKey,
                                        parentKey, parentId, timestamp)
    local isParentActive = rcall("ZSCORE",
                                 parentQueueKey .. ":waiting-children", parentId)
    if rcall("SCARD", parentDependenciesKey) == 0 and isParentActive then
        rcall("ZREM", parentQueueKey .. ":waiting-children", parentId)
        local parentWaitKey = parentQueueKey .. ":wait"
        local parentPausedKey = parentQueueKey .. ":paused"
        local parentMetaKey = parentQueueKey .. ":meta"
        local parentMarkerKey = parentQueueKey .. ":marker"
        local jobAttributes = rcall("HMGET", parentKey, "priority", "delay")
        local priority = tonumber(jobAttributes[1]) or 0
        local delay = tonumber(jobAttributes[2]) or 0
        if delay > 0 then
            local delayedTimestamp = tonumber(timestamp) + delay
            local score = delayedTimestamp * 0x1000
            local parentDelayedKey = parentQueueKey .. ":delayed"
            rcall("ZADD", parentDelayedKey, score, parentId)
            rcall("XADD", parentQueueKey .. ":events", "*", "event", "delayed",
                  "jobId", parentId, "delay", delayedTimestamp)
            addDelayMarkerIfNeeded(parentMarkerKey, parentDelayedKey)
        else
            if priority == 0 then
                local parentTarget, isParentPaused =
                    getTargetQueueList(parentMetaKey, parentWaitKey,
                                       parentPausedKey)
                addJobInTargetList(parentTarget, parentMarkerKey, "RPUSH", isParentPaused, parentId)
            else
                local isPaused = isQueuePaused(parentMetaKey)
                addJobWithPriority(parentMarkerKey,
                                   parentQueueKey .. ":prioritized", priority,
                                   parentId, parentQueueKey .. ":pc", isPaused)
            end
            rcall("XADD", parentQueueKey .. ":events", "*", "event", "waiting",
                  "jobId", parentId, "prev", "waiting-children")
        end
    end
end
local function updateParentDepsIfNeeded(parentKey, parentQueueKey, parentDependenciesKey,
  parentId, jobIdKey, returnvalue, timestamp )
  local processedSet = parentKey .. ":processed"
  rcall("HSET", processedSet, jobIdKey, returnvalue)
  moveParentToWaitIfNeeded(parentQueueKey, parentDependenciesKey, parentKey, parentId, timestamp)
end
local function updateExistingJobsParent(parentKey, parent, parentData,
                                        parentDependenciesKey, completedKey,
                                        jobIdKey, jobId, timestamp)
    if parentKey ~= nil then
        if rcall("ZSCORE", completedKey, jobId) ~= false then
            local returnvalue = rcall("HGET", jobIdKey, "returnvalue")
            updateParentDepsIfNeeded(parentKey, parent['queueKey'],
                                     parentDependenciesKey, parent['id'],
                                     jobIdKey, returnvalue, timestamp)
        else
            if parentDependenciesKey ~= nil then
                rcall("SADD", parentDependenciesKey, jobIdKey)
            end
        end
        rcall("HMSET", jobIdKey, "parentKey", parentKey, "parent", parentData)
    end
end
local function handleDuplicatedJob(jobKey, jobId, currentParentKey, currentParent,
  parentData, parentDependenciesKey, completedKey, eventsKey, maxEvents, timestamp)
  local existedParentKey = rcall("HGET", jobKey, "parentKey")
  if not existedParentKey then
    updateExistingJobsParent(currentParentKey, currentParent, parentData,
      parentDependenciesKey, completedKey, jobKey,
      jobId, timestamp)
  else
    if currentParentKey ~= nil and currentParentKey ~= existedParentKey
      and (rcall("EXISTS", existedParentKey) == 1) then
      return -7
    end
  end
  rcall("XADD", eventsKey, "MAXLEN", "~", maxEvents, "*", "event",
    "duplicated", "jobId", jobId)
  return jobId .. "" -- convert to string
end
--[[
  Function to store a job
]]
local function storeJob(eventsKey, jobIdKey, jobId, name, data, opts, timestamp,
                        parentKey, parentData, repeatJobKey)
    local jsonOpts = cjson.encode(opts)
    local delay = opts['delay'] or 0
    local priority = opts['priority'] or 0
    local optionalValues = {}
    if parentKey ~= nil then
        table.insert(optionalValues, "parentKey")
        table.insert(optionalValues, parentKey)
        table.insert(optionalValues, "parent")
        table.insert(optionalValues, parentData)
    end
    if repeatJobKey ~= nil then
        table.insert(optionalValues, "rjk")
        table.insert(optionalValues, repeatJobKey)
    end
    rcall("HMSET", jobIdKey, "name", name, "data", data, "opts", jsonOpts,
          "timestamp", timestamp, "delay", delay, "priority", priority,
          unpack(optionalValues))
    rcall("XADD", eventsKey, "*", "event", "added", "jobId", jobId, "name", name)
    return delay, priority
end
if parentKey ~= nil then
    if rcall("EXISTS", parentKey) ~= 1 then return -5 end
    parentData = cjson.encode(parent)
end
local jobCounter = rcall("INCR", idKey)
local maxEvents = getOrSetMaxEvents(metaKey)
local opts = cmsgpack.unpack(ARGV[3])
local parentDependenciesKey = args[7]
local timestamp = args[4]
if args[2] == "" then
    jobId = jobCounter
    jobIdKey = args[1] .. jobId
else
    jobId = args[2]
    jobIdKey = args[1] .. jobId
    if rcall("EXISTS", jobIdKey) == 1 then
        return handleDuplicatedJob(jobIdKey, jobId, parentKey, parent,
            parentData, parentDependenciesKey, completedKey, eventsKey,
            maxEvents, timestamp)
    end
end
-- Store the job.
local delay, priority = storeJob(eventsKey, jobIdKey, jobId, args[3], ARGV[2],
                                 opts, timestamp, parentKey, parentData,
                                 repeatJobKey)
-- Compute delayed timestamp and the score.
local delayedTimestamp = (delay > 0 and (timestamp + delay)) or 0
local score = delayedTimestamp * 0x1000 + bit.band(jobCounter, 0xfff)
rcall("ZADD", delayedKey, score, jobId)
rcall("XADD", eventsKey, "MAXLEN", "~", maxEvents, "*", "event", "delayed",
      "jobId", jobId, "delay", delayedTimestamp)
-- mark that a delayed job is available
local isPaused = isQueuePaused(metaKey)
if not isPaused then
    local markerKey = KEYS[1]
    addDelayMarkerIfNeeded(markerKey, delayedKey)
end
-- Check if this job is a child of another job, if so add it to the parents dependencies
if parentDependenciesKey ~= nil then
    rcall("SADD", parentDependenciesKey, jobIdKey)
end
return jobId .. "" -- convert to string
`,c={name:"addDelayedJob",content:u,keys:6},d=`--[[
  Adds a parent job to the queue by doing the following:
    - Increases the job counter if needed.
    - Creates a new job key with the job data.
    - adds the job to the waiting-children zset
    Input:
      KEYS[1] 'meta'
      KEYS[2] 'id'
      KEYS[3] 'completed'
      KEYS[4] events stream key
      ARGV[1] msgpacked arguments array
            [1]  key prefix,
            [2]  custom id (will not generate one automatically)
            [3]  name
            [4]  timestamp
            [5]  parentKey?
            [6]  waitChildrenKey key.
            [7]  parent dependencies key.
            [8]  parent? {id, queueKey}
            [9]  repeat job key
      ARGV[2] Json stringified job data
      ARGV[3] msgpacked options
      Output:
        jobId  - OK
        -5     - Missing parent key
]]
local metaKey = KEYS[1]
local idKey = KEYS[2]
local completedKey = KEYS[3]
local eventsKey = KEYS[4]
local jobId
local jobIdKey
local rcall = redis.call
local args = cmsgpack.unpack(ARGV[1])
local data = ARGV[2]
local opts = cmsgpack.unpack(ARGV[3])
local parentKey = args[5]
local repeatJobKey = args[9]
local parent = args[8]
local parentData
-- Includes
--[[
  Function to get max events value or set by default 10000.
]]
local function getOrSetMaxEvents(metaKey)
    local maxEvents = rcall("HGET", metaKey, "opts.maxLenEvents")
    if not maxEvents then
        maxEvents = 10000
        rcall("HSET", metaKey, "opts.maxLenEvents", maxEvents)
    end
    return maxEvents
end
--[[
  Function to handle the case when job is duplicated.
]]
-- Includes
--[[
    This function is used to update the parent's dependencies if the job
    is already completed and about to be ignored. The parent must get its
    dependencies updated to avoid the parent job being stuck forever in 
    the waiting-children state.
]]
-- Includes
--[[
  Validate and move or add dependencies to parent.
]]
-- Includes
--[[
  Validate and move parent to active if needed.
]]
-- Includes
--[[
  Add delay marker if needed.
]]
-- Includes
--[[
  Function to return the next delayed job timestamp.
]]
local function getNextDelayedTimestamp(delayedKey)
  local result = rcall("ZRANGE", delayedKey, 0, 0, "WITHSCORES")
  if #result then
    local nextTimestamp = tonumber(result[2])
    if (nextTimestamp ~= nil) then 
      nextTimestamp = nextTimestamp / 0x1000
    end
    return nextTimestamp
  end
end
local function addDelayMarkerIfNeeded(markerKey, delayedKey)
    local nextTimestamp = getNextDelayedTimestamp(delayedKey)
    if nextTimestamp ~= nil then
        -- Replace the score of the marker with the newest known
        -- next timestamp.
        rcall("ZADD", markerKey, nextTimestamp, "1")
    end
end
--[[
  Function to add job in target list and add marker if needed.
]]
-- Includes
--[[
  Add marker if needed when a job is available.
]]
local function addBaseMarkerIfNeeded(markerKey, isPaused)
  if not isPaused then
    rcall("ZADD", markerKey, 0, "0")
  end  
end
local function addJobInTargetList(targetKey, markerKey, pushCmd, isPaused, jobId)
  rcall(pushCmd, targetKey, jobId)
  addBaseMarkerIfNeeded(markerKey, isPaused)
end
--[[
  Function to add job considering priority.
]]
-- Includes
local function addJobWithPriority(markerKey, prioritizedKey, priority, jobId, priorityCounterKey, isPaused)
  local prioCounter = rcall("INCR", priorityCounterKey)
  local score = priority * 0x100000000 + bit.band(prioCounter, 0xffffffffffff)
  rcall("ZADD", prioritizedKey, score, jobId)
  addBaseMarkerIfNeeded(markerKey, isPaused)
end
--[[
  Function to check for the meta.paused key to decide if we are paused or not
  (since an empty list and !EXISTS are not really the same).
]]
local function isQueuePaused(queueMetaKey)
    return rcall("HEXISTS", queueMetaKey, "paused") == 1
end
--[[
  Function to check for the meta.paused key to decide if we are paused or not
  (since an empty list and !EXISTS are not really the same).
]]
local function getTargetQueueList(queueMetaKey, waitKey, pausedKey)
  if rcall("HEXISTS", queueMetaKey, "paused") ~= 1 then
    return waitKey, false
  else
    return pausedKey, true
  end
end
local function moveParentToWaitIfNeeded(parentQueueKey, parentDependenciesKey,
                                        parentKey, parentId, timestamp)
    local isParentActive = rcall("ZSCORE",
                                 parentQueueKey .. ":waiting-children", parentId)
    if rcall("SCARD", parentDependenciesKey) == 0 and isParentActive then
        rcall("ZREM", parentQueueKey .. ":waiting-children", parentId)
        local parentWaitKey = parentQueueKey .. ":wait"
        local parentPausedKey = parentQueueKey .. ":paused"
        local parentMetaKey = parentQueueKey .. ":meta"
        local parentMarkerKey = parentQueueKey .. ":marker"
        local jobAttributes = rcall("HMGET", parentKey, "priority", "delay")
        local priority = tonumber(jobAttributes[1]) or 0
        local delay = tonumber(jobAttributes[2]) or 0
        if delay > 0 then
            local delayedTimestamp = tonumber(timestamp) + delay
            local score = delayedTimestamp * 0x1000
            local parentDelayedKey = parentQueueKey .. ":delayed"
            rcall("ZADD", parentDelayedKey, score, parentId)
            rcall("XADD", parentQueueKey .. ":events", "*", "event", "delayed",
                  "jobId", parentId, "delay", delayedTimestamp)
            addDelayMarkerIfNeeded(parentMarkerKey, parentDelayedKey)
        else
            if priority == 0 then
                local parentTarget, isParentPaused =
                    getTargetQueueList(parentMetaKey, parentWaitKey,
                                       parentPausedKey)
                addJobInTargetList(parentTarget, parentMarkerKey, "RPUSH", isParentPaused, parentId)
            else
                local isPaused = isQueuePaused(parentMetaKey)
                addJobWithPriority(parentMarkerKey,
                                   parentQueueKey .. ":prioritized", priority,
                                   parentId, parentQueueKey .. ":pc", isPaused)
            end
            rcall("XADD", parentQueueKey .. ":events", "*", "event", "waiting",
                  "jobId", parentId, "prev", "waiting-children")
        end
    end
end
local function updateParentDepsIfNeeded(parentKey, parentQueueKey, parentDependenciesKey,
  parentId, jobIdKey, returnvalue, timestamp )
  local processedSet = parentKey .. ":processed"
  rcall("HSET", processedSet, jobIdKey, returnvalue)
  moveParentToWaitIfNeeded(parentQueueKey, parentDependenciesKey, parentKey, parentId, timestamp)
end
local function updateExistingJobsParent(parentKey, parent, parentData,
                                        parentDependenciesKey, completedKey,
                                        jobIdKey, jobId, timestamp)
    if parentKey ~= nil then
        if rcall("ZSCORE", completedKey, jobId) ~= false then
            local returnvalue = rcall("HGET", jobIdKey, "returnvalue")
            updateParentDepsIfNeeded(parentKey, parent['queueKey'],
                                     parentDependenciesKey, parent['id'],
                                     jobIdKey, returnvalue, timestamp)
        else
            if parentDependenciesKey ~= nil then
                rcall("SADD", parentDependenciesKey, jobIdKey)
            end
        end
        rcall("HMSET", jobIdKey, "parentKey", parentKey, "parent", parentData)
    end
end
local function handleDuplicatedJob(jobKey, jobId, currentParentKey, currentParent,
  parentData, parentDependenciesKey, completedKey, eventsKey, maxEvents, timestamp)
  local existedParentKey = rcall("HGET", jobKey, "parentKey")
  if not existedParentKey then
    updateExistingJobsParent(currentParentKey, currentParent, parentData,
      parentDependenciesKey, completedKey, jobKey,
      jobId, timestamp)
  else
    if currentParentKey ~= nil and currentParentKey ~= existedParentKey
      and (rcall("EXISTS", existedParentKey) == 1) then
      return -7
    end
  end
  rcall("XADD", eventsKey, "MAXLEN", "~", maxEvents, "*", "event",
    "duplicated", "jobId", jobId)
  return jobId .. "" -- convert to string
end
--[[
  Function to store a job
]]
local function storeJob(eventsKey, jobIdKey, jobId, name, data, opts, timestamp,
                        parentKey, parentData, repeatJobKey)
    local jsonOpts = cjson.encode(opts)
    local delay = opts['delay'] or 0
    local priority = opts['priority'] or 0
    local optionalValues = {}
    if parentKey ~= nil then
        table.insert(optionalValues, "parentKey")
        table.insert(optionalValues, parentKey)
        table.insert(optionalValues, "parent")
        table.insert(optionalValues, parentData)
    end
    if repeatJobKey ~= nil then
        table.insert(optionalValues, "rjk")
        table.insert(optionalValues, repeatJobKey)
    end
    rcall("HMSET", jobIdKey, "name", name, "data", data, "opts", jsonOpts,
          "timestamp", timestamp, "delay", delay, "priority", priority,
          unpack(optionalValues))
    rcall("XADD", eventsKey, "*", "event", "added", "jobId", jobId, "name", name)
    return delay, priority
end
if parentKey ~= nil then
    if rcall("EXISTS", parentKey) ~= 1 then return -5 end
    parentData = cjson.encode(parent)
end
local jobCounter = rcall("INCR", idKey)
local maxEvents = getOrSetMaxEvents(metaKey)
local parentDependenciesKey = args[7]
local timestamp = args[4]
if args[2] == "" then
    jobId = jobCounter
    jobIdKey = args[1] .. jobId
else
    jobId = args[2]
    jobIdKey = args[1] .. jobId
    if rcall("EXISTS", jobIdKey) == 1 then
        return handleDuplicatedJob(jobIdKey, jobId, parentKey, parent,
            parentData, parentDependenciesKey, completedKey, eventsKey,
            maxEvents, timestamp)
    end
end
-- Store the job.
storeJob(eventsKey, jobIdKey, jobId, args[3], ARGV[2], opts, timestamp,
         parentKey, parentData, repeatJobKey)
local waitChildrenKey = args[6]
rcall("ZADD", waitChildrenKey, timestamp, jobId)
rcall("XADD", eventsKey, "MAXLEN", "~", maxEvents, "*", "event",
      "waiting-children", "jobId", jobId)
-- Check if this job is a child of another job, if so add it to the parents dependencies
if parentDependenciesKey ~= nil then
    rcall("SADD", parentDependenciesKey, jobIdKey)
end
return jobId .. "" -- convert to string
`,h={name:"addParentJob",content:d,keys:4},p=`--[[
  Adds a priotitized job to the queue by doing the following:
    - Increases the job counter if needed.
    - Creates a new job key with the job data.
    - Adds the job to the "added" list so that workers gets notified.
    Input:
      KEYS[1] 'marker',
      KEYS[2] 'meta'
      KEYS[3] 'id'
      KEYS[4] 'prioritized'
      KEYS[5] 'completed'
      KEYS[6] events stream key
      KEYS[7] 'pc' priority counter
      ARGV[1] msgpacked arguments array
            [1]  key prefix,
            [2]  custom id (will not generate one automatically)
            [3]  name
            [4]  timestamp
            [5]  parentKey?
            [6]  waitChildrenKey key.
            [7]  parent dependencies key.
            [8]  parent? {id, queueKey}
            [9]  repeat job key
      ARGV[2] Json stringified job data
      ARGV[3] msgpacked options
      Output:
        jobId  - OK
        -5     - Missing parent key
]] 
local metaKey = KEYS[2]
local idKey = KEYS[3]
local priorityKey = KEYS[4]
local completedKey = KEYS[5]
local eventsKey = KEYS[6]
local priorityCounterKey = KEYS[7]
local jobId
local jobIdKey
local rcall = redis.call
local args = cmsgpack.unpack(ARGV[1])
local data = ARGV[2]
local opts = cmsgpack.unpack(ARGV[3])
local parentKey = args[5]
local repeatJobKey = args[9]
local parent = args[8]
local parentData
-- Includes
--[[
  Function to add job considering priority.
]]
-- Includes
--[[
  Add marker if needed when a job is available.
]]
local function addBaseMarkerIfNeeded(markerKey, isPaused)
  if not isPaused then
    rcall("ZADD", markerKey, 0, "0")
  end  
end
local function addJobWithPriority(markerKey, prioritizedKey, priority, jobId, priorityCounterKey, isPaused)
  local prioCounter = rcall("INCR", priorityCounterKey)
  local score = priority * 0x100000000 + bit.band(prioCounter, 0xffffffffffff)
  rcall("ZADD", prioritizedKey, score, jobId)
  addBaseMarkerIfNeeded(markerKey, isPaused)
end
--[[
  Function to store a job
]]
local function storeJob(eventsKey, jobIdKey, jobId, name, data, opts, timestamp,
                        parentKey, parentData, repeatJobKey)
    local jsonOpts = cjson.encode(opts)
    local delay = opts['delay'] or 0
    local priority = opts['priority'] or 0
    local optionalValues = {}
    if parentKey ~= nil then
        table.insert(optionalValues, "parentKey")
        table.insert(optionalValues, parentKey)
        table.insert(optionalValues, "parent")
        table.insert(optionalValues, parentData)
    end
    if repeatJobKey ~= nil then
        table.insert(optionalValues, "rjk")
        table.insert(optionalValues, repeatJobKey)
    end
    rcall("HMSET", jobIdKey, "name", name, "data", data, "opts", jsonOpts,
          "timestamp", timestamp, "delay", delay, "priority", priority,
          unpack(optionalValues))
    rcall("XADD", eventsKey, "*", "event", "added", "jobId", jobId, "name", name)
    return delay, priority
end
--[[
  Function to get max events value or set by default 10000.
]]
local function getOrSetMaxEvents(metaKey)
    local maxEvents = rcall("HGET", metaKey, "opts.maxLenEvents")
    if not maxEvents then
        maxEvents = 10000
        rcall("HSET", metaKey, "opts.maxLenEvents", maxEvents)
    end
    return maxEvents
end
--[[
  Function to handle the case when job is duplicated.
]]
-- Includes
--[[
    This function is used to update the parent's dependencies if the job
    is already completed and about to be ignored. The parent must get its
    dependencies updated to avoid the parent job being stuck forever in 
    the waiting-children state.
]]
-- Includes
--[[
  Validate and move or add dependencies to parent.
]]
-- Includes
--[[
  Validate and move parent to active if needed.
]]
-- Includes
--[[
  Add delay marker if needed.
]]
-- Includes
--[[
  Function to return the next delayed job timestamp.
]]
local function getNextDelayedTimestamp(delayedKey)
  local result = rcall("ZRANGE", delayedKey, 0, 0, "WITHSCORES")
  if #result then
    local nextTimestamp = tonumber(result[2])
    if (nextTimestamp ~= nil) then 
      nextTimestamp = nextTimestamp / 0x1000
    end
    return nextTimestamp
  end
end
local function addDelayMarkerIfNeeded(markerKey, delayedKey)
    local nextTimestamp = getNextDelayedTimestamp(delayedKey)
    if nextTimestamp ~= nil then
        -- Replace the score of the marker with the newest known
        -- next timestamp.
        rcall("ZADD", markerKey, nextTimestamp, "1")
    end
end
--[[
  Function to add job in target list and add marker if needed.
]]
-- Includes
local function addJobInTargetList(targetKey, markerKey, pushCmd, isPaused, jobId)
  rcall(pushCmd, targetKey, jobId)
  addBaseMarkerIfNeeded(markerKey, isPaused)
end
--[[
  Function to check for the meta.paused key to decide if we are paused or not
  (since an empty list and !EXISTS are not really the same).
]]
local function isQueuePaused(queueMetaKey)
    return rcall("HEXISTS", queueMetaKey, "paused") == 1
end
--[[
  Function to check for the meta.paused key to decide if we are paused or not
  (since an empty list and !EXISTS are not really the same).
]]
local function getTargetQueueList(queueMetaKey, waitKey, pausedKey)
  if rcall("HEXISTS", queueMetaKey, "paused") ~= 1 then
    return waitKey, false
  else
    return pausedKey, true
  end
end
local function moveParentToWaitIfNeeded(parentQueueKey, parentDependenciesKey,
                                        parentKey, parentId, timestamp)
    local isParentActive = rcall("ZSCORE",
                                 parentQueueKey .. ":waiting-children", parentId)
    if rcall("SCARD", parentDependenciesKey) == 0 and isParentActive then
        rcall("ZREM", parentQueueKey .. ":waiting-children", parentId)
        local parentWaitKey = parentQueueKey .. ":wait"
        local parentPausedKey = parentQueueKey .. ":paused"
        local parentMetaKey = parentQueueKey .. ":meta"
        local parentMarkerKey = parentQueueKey .. ":marker"
        local jobAttributes = rcall("HMGET", parentKey, "priority", "delay")
        local priority = tonumber(jobAttributes[1]) or 0
        local delay = tonumber(jobAttributes[2]) or 0
        if delay > 0 then
            local delayedTimestamp = tonumber(timestamp) + delay
            local score = delayedTimestamp * 0x1000
            local parentDelayedKey = parentQueueKey .. ":delayed"
            rcall("ZADD", parentDelayedKey, score, parentId)
            rcall("XADD", parentQueueKey .. ":events", "*", "event", "delayed",
                  "jobId", parentId, "delay", delayedTimestamp)
            addDelayMarkerIfNeeded(parentMarkerKey, parentDelayedKey)
        else
            if priority == 0 then
                local parentTarget, isParentPaused =
                    getTargetQueueList(parentMetaKey, parentWaitKey,
                                       parentPausedKey)
                addJobInTargetList(parentTarget, parentMarkerKey, "RPUSH", isParentPaused, parentId)
            else
                local isPaused = isQueuePaused(parentMetaKey)
                addJobWithPriority(parentMarkerKey,
                                   parentQueueKey .. ":prioritized", priority,
                                   parentId, parentQueueKey .. ":pc", isPaused)
            end
            rcall("XADD", parentQueueKey .. ":events", "*", "event", "waiting",
                  "jobId", parentId, "prev", "waiting-children")
        end
    end
end
local function updateParentDepsIfNeeded(parentKey, parentQueueKey, parentDependenciesKey,
  parentId, jobIdKey, returnvalue, timestamp )
  local processedSet = parentKey .. ":processed"
  rcall("HSET", processedSet, jobIdKey, returnvalue)
  moveParentToWaitIfNeeded(parentQueueKey, parentDependenciesKey, parentKey, parentId, timestamp)
end
local function updateExistingJobsParent(parentKey, parent, parentData,
                                        parentDependenciesKey, completedKey,
                                        jobIdKey, jobId, timestamp)
    if parentKey ~= nil then
        if rcall("ZSCORE", completedKey, jobId) ~= false then
            local returnvalue = rcall("HGET", jobIdKey, "returnvalue")
            updateParentDepsIfNeeded(parentKey, parent['queueKey'],
                                     parentDependenciesKey, parent['id'],
                                     jobIdKey, returnvalue, timestamp)
        else
            if parentDependenciesKey ~= nil then
                rcall("SADD", parentDependenciesKey, jobIdKey)
            end
        end
        rcall("HMSET", jobIdKey, "parentKey", parentKey, "parent", parentData)
    end
end
local function handleDuplicatedJob(jobKey, jobId, currentParentKey, currentParent,
  parentData, parentDependenciesKey, completedKey, eventsKey, maxEvents, timestamp)
  local existedParentKey = rcall("HGET", jobKey, "parentKey")
  if not existedParentKey then
    updateExistingJobsParent(currentParentKey, currentParent, parentData,
      parentDependenciesKey, completedKey, jobKey,
      jobId, timestamp)
  else
    if currentParentKey ~= nil and currentParentKey ~= existedParentKey
      and (rcall("EXISTS", existedParentKey) == 1) then
      return -7
    end
  end
  rcall("XADD", eventsKey, "MAXLEN", "~", maxEvents, "*", "event",
    "duplicated", "jobId", jobId)
  return jobId .. "" -- convert to string
end
if parentKey ~= nil then
    if rcall("EXISTS", parentKey) ~= 1 then return -5 end
    parentData = cjson.encode(parent)
end
local jobCounter = rcall("INCR", idKey)
local maxEvents = getOrSetMaxEvents(metaKey)
local parentDependenciesKey = args[7]
local timestamp = args[4]
if args[2] == "" then
    jobId = jobCounter
    jobIdKey = args[1] .. jobId
else
    jobId = args[2]
    jobIdKey = args[1] .. jobId
    if rcall("EXISTS", jobIdKey) == 1 then
        return handleDuplicatedJob(jobIdKey, jobId, parentKey, parent,
            parentData, parentDependenciesKey, completedKey, eventsKey,
            maxEvents, timestamp)
    end
end
-- Store the job.
local delay, priority = storeJob(eventsKey, jobIdKey, jobId, args[3], ARGV[2],
                                 opts, timestamp, parentKey, parentData,
                                 repeatJobKey)
-- Add the job to the prioritized set
local isPause = isQueuePaused(metaKey)
addJobWithPriority( KEYS[1], priorityKey, priority, jobId, priorityCounterKey, isPause)
-- Emit waiting event
rcall("XADD", eventsKey, "MAXLEN", "~", maxEvents, "*", "event", "waiting",
      "jobId", jobId)
-- Check if this job is a child of another job, if so add it to the parents dependencies
if parentDependenciesKey ~= nil then
    rcall("SADD", parentDependenciesKey, jobIdKey)
end
return jobId .. "" -- convert to string
`,f={name:"addPrioritizedJob",content:p,keys:7},y=`--[[
  Adds a job to the queue by doing the following:
    - Increases the job counter if needed.
    - Creates a new job key with the job data.
    - if delayed:
      - computes timestamp.
      - adds to delayed zset.
      - Emits a global event 'delayed' if the job is delayed.
    - if not delayed
      - Adds the jobId to the wait/paused list in one of three ways:
         - LIFO
         - FIFO
         - prioritized.
      - Adds the job to the "added" list so that workers gets notified.
    Input:
      KEYS[1] 'wait',
      KEYS[2] 'paused'
      KEYS[3] 'meta'
      KEYS[4] 'id'
      KEYS[5] 'completed'
      KEYS[6] events stream key
      KEYS[7] marker key
      ARGV[1] msgpacked arguments array
            [1]  key prefix,
            [2]  custom id (will not generate one automatically)
            [3]  name
            [4]  timestamp
            [5]  parentKey?
            [6]  waitChildrenKey key.
            [7]  parent dependencies key.
            [8]  parent? {id, queueKey}
            [9]  repeat job key
      ARGV[2] Json stringified job data
      ARGV[3] msgpacked options
      Output:
        jobId  - OK
        -5     - Missing parent key
]]
local eventsKey = KEYS[6]
local jobId
local jobIdKey
local rcall = redis.call
local args = cmsgpack.unpack(ARGV[1])
local data = ARGV[2]
local opts = cmsgpack.unpack(ARGV[3])
local parentKey = args[5]
local repeatJobKey = args[9]
local parent = args[8]
local parentData
-- Includes
--[[
  Function to add job in target list and add marker if needed.
]]
-- Includes
--[[
  Add marker if needed when a job is available.
]]
local function addBaseMarkerIfNeeded(markerKey, isPaused)
  if not isPaused then
    rcall("ZADD", markerKey, 0, "0")
  end  
end
local function addJobInTargetList(targetKey, markerKey, pushCmd, isPaused, jobId)
  rcall(pushCmd, targetKey, jobId)
  addBaseMarkerIfNeeded(markerKey, isPaused)
end
--[[
  Function to get max events value or set by default 10000.
]]
local function getOrSetMaxEvents(metaKey)
    local maxEvents = rcall("HGET", metaKey, "opts.maxLenEvents")
    if not maxEvents then
        maxEvents = 10000
        rcall("HSET", metaKey, "opts.maxLenEvents", maxEvents)
    end
    return maxEvents
end
--[[
  Function to check for the meta.paused key to decide if we are paused or not
  (since an empty list and !EXISTS are not really the same).
]]
local function getTargetQueueList(queueMetaKey, waitKey, pausedKey)
  if rcall("HEXISTS", queueMetaKey, "paused") ~= 1 then
    return waitKey, false
  else
    return pausedKey, true
  end
end
--[[
  Function to handle the case when job is duplicated.
]]
-- Includes
--[[
    This function is used to update the parent's dependencies if the job
    is already completed and about to be ignored. The parent must get its
    dependencies updated to avoid the parent job being stuck forever in 
    the waiting-children state.
]]
-- Includes
--[[
  Validate and move or add dependencies to parent.
]]
-- Includes
--[[
  Validate and move parent to active if needed.
]]
-- Includes
--[[
  Add delay marker if needed.
]]
-- Includes
--[[
  Function to return the next delayed job timestamp.
]]
local function getNextDelayedTimestamp(delayedKey)
  local result = rcall("ZRANGE", delayedKey, 0, 0, "WITHSCORES")
  if #result then
    local nextTimestamp = tonumber(result[2])
    if (nextTimestamp ~= nil) then 
      nextTimestamp = nextTimestamp / 0x1000
    end
    return nextTimestamp
  end
end
local function addDelayMarkerIfNeeded(markerKey, delayedKey)
    local nextTimestamp = getNextDelayedTimestamp(delayedKey)
    if nextTimestamp ~= nil then
        -- Replace the score of the marker with the newest known
        -- next timestamp.
        rcall("ZADD", markerKey, nextTimestamp, "1")
    end
end
--[[
  Function to add job considering priority.
]]
-- Includes
local function addJobWithPriority(markerKey, prioritizedKey, priority, jobId, priorityCounterKey, isPaused)
  local prioCounter = rcall("INCR", priorityCounterKey)
  local score = priority * 0x100000000 + bit.band(prioCounter, 0xffffffffffff)
  rcall("ZADD", prioritizedKey, score, jobId)
  addBaseMarkerIfNeeded(markerKey, isPaused)
end
--[[
  Function to check for the meta.paused key to decide if we are paused or not
  (since an empty list and !EXISTS are not really the same).
]]
local function isQueuePaused(queueMetaKey)
    return rcall("HEXISTS", queueMetaKey, "paused") == 1
end
local function moveParentToWaitIfNeeded(parentQueueKey, parentDependenciesKey,
                                        parentKey, parentId, timestamp)
    local isParentActive = rcall("ZSCORE",
                                 parentQueueKey .. ":waiting-children", parentId)
    if rcall("SCARD", parentDependenciesKey) == 0 and isParentActive then
        rcall("ZREM", parentQueueKey .. ":waiting-children", parentId)
        local parentWaitKey = parentQueueKey .. ":wait"
        local parentPausedKey = parentQueueKey .. ":paused"
        local parentMetaKey = parentQueueKey .. ":meta"
        local parentMarkerKey = parentQueueKey .. ":marker"
        local jobAttributes = rcall("HMGET", parentKey, "priority", "delay")
        local priority = tonumber(jobAttributes[1]) or 0
        local delay = tonumber(jobAttributes[2]) or 0
        if delay > 0 then
            local delayedTimestamp = tonumber(timestamp) + delay
            local score = delayedTimestamp * 0x1000
            local parentDelayedKey = parentQueueKey .. ":delayed"
            rcall("ZADD", parentDelayedKey, score, parentId)
            rcall("XADD", parentQueueKey .. ":events", "*", "event", "delayed",
                  "jobId", parentId, "delay", delayedTimestamp)
            addDelayMarkerIfNeeded(parentMarkerKey, parentDelayedKey)
        else
            if priority == 0 then
                local parentTarget, isParentPaused =
                    getTargetQueueList(parentMetaKey, parentWaitKey,
                                       parentPausedKey)
                addJobInTargetList(parentTarget, parentMarkerKey, "RPUSH", isParentPaused, parentId)
            else
                local isPaused = isQueuePaused(parentMetaKey)
                addJobWithPriority(parentMarkerKey,
                                   parentQueueKey .. ":prioritized", priority,
                                   parentId, parentQueueKey .. ":pc", isPaused)
            end
            rcall("XADD", parentQueueKey .. ":events", "*", "event", "waiting",
                  "jobId", parentId, "prev", "waiting-children")
        end
    end
end
local function updateParentDepsIfNeeded(parentKey, parentQueueKey, parentDependenciesKey,
  parentId, jobIdKey, returnvalue, timestamp )
  local processedSet = parentKey .. ":processed"
  rcall("HSET", processedSet, jobIdKey, returnvalue)
  moveParentToWaitIfNeeded(parentQueueKey, parentDependenciesKey, parentKey, parentId, timestamp)
end
local function updateExistingJobsParent(parentKey, parent, parentData,
                                        parentDependenciesKey, completedKey,
                                        jobIdKey, jobId, timestamp)
    if parentKey ~= nil then
        if rcall("ZSCORE", completedKey, jobId) ~= false then
            local returnvalue = rcall("HGET", jobIdKey, "returnvalue")
            updateParentDepsIfNeeded(parentKey, parent['queueKey'],
                                     parentDependenciesKey, parent['id'],
                                     jobIdKey, returnvalue, timestamp)
        else
            if parentDependenciesKey ~= nil then
                rcall("SADD", parentDependenciesKey, jobIdKey)
            end
        end
        rcall("HMSET", jobIdKey, "parentKey", parentKey, "parent", parentData)
    end
end
local function handleDuplicatedJob(jobKey, jobId, currentParentKey, currentParent,
  parentData, parentDependenciesKey, completedKey, eventsKey, maxEvents, timestamp)
  local existedParentKey = rcall("HGET", jobKey, "parentKey")
  if not existedParentKey then
    updateExistingJobsParent(currentParentKey, currentParent, parentData,
      parentDependenciesKey, completedKey, jobKey,
      jobId, timestamp)
  else
    if currentParentKey ~= nil and currentParentKey ~= existedParentKey
      and (rcall("EXISTS", existedParentKey) == 1) then
      return -7
    end
  end
  rcall("XADD", eventsKey, "MAXLEN", "~", maxEvents, "*", "event",
    "duplicated", "jobId", jobId)
  return jobId .. "" -- convert to string
end
--[[
  Function to store a job
]]
local function storeJob(eventsKey, jobIdKey, jobId, name, data, opts, timestamp,
                        parentKey, parentData, repeatJobKey)
    local jsonOpts = cjson.encode(opts)
    local delay = opts['delay'] or 0
    local priority = opts['priority'] or 0
    local optionalValues = {}
    if parentKey ~= nil then
        table.insert(optionalValues, "parentKey")
        table.insert(optionalValues, parentKey)
        table.insert(optionalValues, "parent")
        table.insert(optionalValues, parentData)
    end
    if repeatJobKey ~= nil then
        table.insert(optionalValues, "rjk")
        table.insert(optionalValues, repeatJobKey)
    end
    rcall("HMSET", jobIdKey, "name", name, "data", data, "opts", jsonOpts,
          "timestamp", timestamp, "delay", delay, "priority", priority,
          unpack(optionalValues))
    rcall("XADD", eventsKey, "*", "event", "added", "jobId", jobId, "name", name)
    return delay, priority
end
if parentKey ~= nil then
    if rcall("EXISTS", parentKey) ~= 1 then return -5 end
    parentData = cjson.encode(parent)
end
local jobCounter = rcall("INCR", KEYS[4])
local metaKey = KEYS[3]
local maxEvents = getOrSetMaxEvents(metaKey)
local parentDependenciesKey = args[7]
local timestamp = args[4]
if args[2] == "" then
    jobId = jobCounter
    jobIdKey = args[1] .. jobId
else
    jobId = args[2]
    jobIdKey = args[1] .. jobId
    if rcall("EXISTS", jobIdKey) == 1 then
        return handleDuplicatedJob(jobIdKey, jobId, parentKey, parent,
            parentData, parentDependenciesKey, KEYS[5], eventsKey,
            maxEvents, timestamp)
    end
end
-- Store the job.
storeJob(eventsKey, jobIdKey, jobId, args[3], ARGV[2], opts, timestamp,
         parentKey, parentData, repeatJobKey)
local target, paused = getTargetQueueList(metaKey, KEYS[1], KEYS[2])
-- LIFO or FIFO
local pushCmd = opts['lifo'] and 'RPUSH' or 'LPUSH'
addJobInTargetList(target, KEYS[7], pushCmd, paused, jobId)
-- Emit waiting event
rcall("XADD", eventsKey, "MAXLEN", "~", maxEvents, "*", "event", "waiting",
      "jobId", jobId)
-- Check if this job is a child of another job, if so add it to the parents dependencies
if parentDependenciesKey ~= nil then
    rcall("SADD", parentDependenciesKey, jobIdKey)
end
return jobId .. "" -- convert to string
`,m={name:"addStandardJob",content:y,keys:7},g=`--[[
  Change job delay when it is in delayed set.
  Input:
    KEYS[1] delayed key
    KEYS[2] meta key
    KEYS[3] marker key
    KEYS[4] events stream
    ARGV[1] delay
    ARGV[2] delayedTimestamp
    ARGV[3] the id of the job
    ARGV[4] job key
  Output:
    0 - OK
   -1 - Missing job.
   -3 - Job not in delayed set.
  Events:
    - delayed key.
]]
local rcall = redis.call
-- Includes
--[[
  Add delay marker if needed.
]]
-- Includes
--[[
  Function to return the next delayed job timestamp.
]]
local function getNextDelayedTimestamp(delayedKey)
  local result = rcall("ZRANGE", delayedKey, 0, 0, "WITHSCORES")
  if #result then
    local nextTimestamp = tonumber(result[2])
    if (nextTimestamp ~= nil) then 
      nextTimestamp = nextTimestamp / 0x1000
    end
    return nextTimestamp
  end
end
local function addDelayMarkerIfNeeded(markerKey, delayedKey)
    local nextTimestamp = getNextDelayedTimestamp(delayedKey)
    if nextTimestamp ~= nil then
        -- Replace the score of the marker with the newest known
        -- next timestamp.
        rcall("ZADD", markerKey, nextTimestamp, "1")
    end
end
--[[
  Function to get max events value or set by default 10000.
]]
local function getOrSetMaxEvents(metaKey)
    local maxEvents = rcall("HGET", metaKey, "opts.maxLenEvents")
    if not maxEvents then
        maxEvents = 10000
        rcall("HSET", metaKey, "opts.maxLenEvents", maxEvents)
    end
    return maxEvents
end
--[[
  Function to check for the meta.paused key to decide if we are paused or not
  (since an empty list and !EXISTS are not really the same).
]]
local function isQueuePaused(queueMetaKey)
    return rcall("HEXISTS", queueMetaKey, "paused") == 1
end
if rcall("EXISTS", ARGV[4]) == 1 then
  local jobId = ARGV[3]
  local score = tonumber(ARGV[2])
  local delayedTimestamp = (score / 0x1000)
  local numRemovedElements = rcall("ZREM", KEYS[1], jobId)
  if numRemovedElements < 1 then
    return -3
  end
  rcall("HSET", ARGV[4], "delay", tonumber(ARGV[1]))
  rcall("ZADD", KEYS[1], score, jobId)
  local maxEvents = getOrSetMaxEvents(KEYS[2])
  rcall("XADD", KEYS[4], "MAXLEN", "~", maxEvents, "*", "event", "delayed",
    "jobId", jobId, "delay", delayedTimestamp)
  -- mark that a delayed job is available
  local isPaused = isQueuePaused(KEYS[2])
  if not isPaused then
    addDelayMarkerIfNeeded(KEYS[3], KEYS[1])
  end
  return 0
else
  return -1
end`,b={name:"changeDelay",content:g,keys:4},S=`--[[
  Change job priority
  Input:
    KEYS[1] 'wait',
    KEYS[2] 'paused'
    KEYS[3] 'meta'
    KEYS[4] 'prioritized'
    KEYS[5] 'pc' priority counter
    KEYS[6] 'marker'
    ARGV[1] priority value
    ARGV[2] job key
    ARGV[3] job id
    ARGV[4] lifo
    Output:
       0  - OK
      -1  - Missing job
]]
local jobKey = ARGV[2]
local jobId = ARGV[3]
local priority = tonumber(ARGV[1])
local rcall = redis.call
-- Includes
--[[
  Function to check for the meta.paused key to decide if we are paused or not
  (since an empty list and !EXISTS are not really the same).
]]
local function isQueuePaused(queueMetaKey)
    return rcall("HEXISTS", queueMetaKey, "paused") == 1
end
--[[
  Function to add job considering priority.
]]
-- Includes
--[[
  Add marker if needed when a job is available.
]]
local function addBaseMarkerIfNeeded(markerKey, isPaused)
  if not isPaused then
    rcall("ZADD", markerKey, 0, "0")
  end  
end
local function addJobWithPriority(markerKey, prioritizedKey, priority, jobId, priorityCounterKey, isPaused)
  local prioCounter = rcall("INCR", priorityCounterKey)
  local score = priority * 0x100000000 + bit.band(prioCounter, 0xffffffffffff)
  rcall("ZADD", prioritizedKey, score, jobId)
  addBaseMarkerIfNeeded(markerKey, isPaused)
end
if rcall("EXISTS", jobKey) == 1 then
    local metaKey = KEYS[3]
    local isPaused = isQueuePaused(metaKey)
    local markerKey = KEYS[6]
    local prioritizedKey = KEYS[4]
    -- Re-add with the new priority
    if rcall("ZREM", KEYS[4], jobId) > 0 then
        addJobWithPriority(markerKey, prioritizedKey, priority, jobId, KEYS[5],
                           isPaused)
        -- If the new priority is 0, then just leave the job where it is in the wait list.
    elseif priority > 0 then
        -- Job is already in the wait list, we need to re-add it with the new priority.
        local target = isPaused and KEYS[2] or KEYS[1]
        local numRemovedElements = rcall("LREM", target, -1, jobId)
        if numRemovedElements > 0 then
            addJobWithPriority(markerKey, prioritizedKey, priority, jobId,
                               KEYS[5], isPaused)
        end
    end
    rcall("HSET", jobKey, "priority", priority)
    return 0
else
    return -1
end
`,v={name:"changePriority",content:S,keys:6},E=`--[[
  Remove jobs from the specific set.
  Input:
    KEYS[1]  set key,
    KEYS[2]  events stream key
    ARGV[1]  jobKey prefix
    ARGV[2]  timestamp
    ARGV[3]  limit the number of jobs to be removed. 0 is unlimited
    ARGV[4]  set name, can be any of 'wait', 'active', 'paused', 'delayed', 'completed', or 'failed'
]]
local rcall = redis.call
local rangeStart = 0
local rangeEnd = -1
local limit = tonumber(ARGV[3])
-- If we're only deleting _n_ items, avoid retrieving all items
-- for faster performance
--
-- Start from the tail of the list, since that's where oldest elements
-- are generally added for FIFO lists
if limit > 0 then
  rangeStart = -1 - limit + 1
  rangeEnd = -1
end
-- Includes
--[[
  Function to clean job list.
  Returns jobIds and deleted count number.
]]
-- Includes
--[[
  Function to get the latest saved timestamp.
]]
local function getTimestamp(jobKey, attributes)
  if #attributes == 1 then
    return rcall("HGET", jobKey, attributes[1])
  end
  local jobTs
  for _, ts in ipairs(rcall("HMGET", jobKey, unpack(attributes))) do
    if (ts) then
      jobTs = ts
      break
    end
  end
  return jobTs
end
--[[
  Function to remove job.
]]
-- Includes
--[[
  Function to remove job keys.
]]
local function removeJobKeys(jobKey)
  return rcall("DEL", jobKey, jobKey .. ':logs',
    jobKey .. ':dependencies', jobKey .. ':processed', jobKey .. ':failed')
end
--[[
  Check if this job has a parent. If so we will just remove it from
  the parent child list, but if it is the last child we should move the parent to "wait/paused"
  which requires code from "moveToFinished"
]]
-- Includes
--[[
  Function to add job in target list and add marker if needed.
]]
-- Includes
--[[
  Add marker if needed when a job is available.
]]
local function addBaseMarkerIfNeeded(markerKey, isPaused)
  if not isPaused then
    rcall("ZADD", markerKey, 0, "0")
  end  
end
local function addJobInTargetList(targetKey, markerKey, pushCmd, isPaused, jobId)
  rcall(pushCmd, targetKey, jobId)
  addBaseMarkerIfNeeded(markerKey, isPaused)
end
--[[
  Functions to destructure job key.
  Just a bit of warning, these functions may be a bit slow and affect performance significantly.
]]
local getJobIdFromKey = function (jobKey)
  return string.match(jobKey, ".*:(.*)")
end
local getJobKeyPrefix = function (jobKey, jobId)
  return string.sub(jobKey, 0, #jobKey - #jobId)
end
--[[
  Function to check for the meta.paused key to decide if we are paused or not
  (since an empty list and !EXISTS are not really the same).
]]
local function getTargetQueueList(queueMetaKey, waitKey, pausedKey)
  if rcall("HEXISTS", queueMetaKey, "paused") ~= 1 then
    return waitKey, false
  else
    return pausedKey, true
  end
end
local function moveParentToWait(parentPrefix, parentId, emitEvent)
  local parentTarget, isPaused = getTargetQueueList(parentPrefix .. "meta", parentPrefix .. "wait",
    parentPrefix .. "paused")
  addJobInTargetList(parentTarget, parentPrefix .. "marker", "RPUSH", isPaused, parentId)
  if emitEvent then
    local parentEventStream = parentPrefix .. "events"
    rcall("XADD", parentEventStream, "*", "event", "waiting", "jobId", parentId, "prev", "waiting-children")
  end
end
local function removeParentDependencyKey(jobKey, hard, parentKey, baseKey)
  if parentKey then
    local parentDependenciesKey = parentKey .. ":dependencies"
    local result = rcall("SREM", parentDependenciesKey, jobKey)
    if result > 0 then
      local pendingDependencies = rcall("SCARD", parentDependenciesKey)
      if pendingDependencies == 0 then
        local parentId = getJobIdFromKey(parentKey)
        local parentPrefix = getJobKeyPrefix(parentKey, parentId)
        local numRemovedElements = rcall("ZREM", parentPrefix .. "waiting-children", parentId)
        if numRemovedElements == 1 then
          if hard then -- remove parent in same queue
            if parentPrefix == baseKey then
              removeParentDependencyKey(parentKey, hard, nil, baseKey)
              removeJobKeys(parentKey)
            else
              moveParentToWait(parentPrefix, parentId)
            end
          else
            moveParentToWait(parentPrefix, parentId, true)
          end
        end
      end
      return true
    end
  else
    local missedParentKey = rcall("HGET", jobKey, "parentKey")
    if( (type(missedParentKey) == "string") and missedParentKey ~= ""
      and (rcall("EXISTS", missedParentKey) == 1)) then
      local parentDependenciesKey = missedParentKey .. ":dependencies"
      local result = rcall("SREM", parentDependenciesKey, jobKey)
      if result > 0 then
        local pendingDependencies = rcall("SCARD", parentDependenciesKey)
        if pendingDependencies == 0 then
          local parentId = getJobIdFromKey(missedParentKey)
          local parentPrefix = getJobKeyPrefix(missedParentKey, parentId)
          local numRemovedElements = rcall("ZREM", parentPrefix .. "waiting-children", parentId)
          if numRemovedElements == 1 then
            if hard then
              if parentPrefix == baseKey then
                removeParentDependencyKey(missedParentKey, hard, nil, baseKey)
                removeJobKeys(missedParentKey)
              else
                moveParentToWait(parentPrefix, parentId)
              end
            else
              moveParentToWait(parentPrefix, parentId, true)
            end
          end
        end
        return true
      end
    end
  end
  return false
end
local function removeJob(jobId, hard, baseKey)
  local jobKey = baseKey .. jobId
  removeParentDependencyKey(jobKey, hard, nil, baseKey)
  removeJobKeys(jobKey)
end
local function cleanList(listKey, jobKeyPrefix, rangeStart, rangeEnd,
  timestamp, isWaiting)
  local jobs = rcall("LRANGE", listKey, rangeStart, rangeEnd)
  local deleted = {}
  local deletedCount = 0
  local jobTS
  local deletionMarker = ''
  local jobIdsLen = #jobs
  for i, job in ipairs(jobs) do
    if limit > 0 and deletedCount >= limit then
      break
    end
    local jobKey = jobKeyPrefix .. job
    if (isWaiting or rcall("EXISTS", jobKey .. ":lock") == 0) then
      -- Find the right timestamp of the job to compare to maxTimestamp:
      -- * finishedOn says when the job was completed, but it isn't set unless the job has actually completed
      -- * processedOn represents when the job was last attempted, but it doesn't get populated until
      --   the job is first tried
      -- * timestamp is the original job submission time
      -- Fetch all three of these (in that order) and use the first one that is set so that we'll leave jobs
      -- that have been active within the grace period:
      jobTS = getTimestamp(jobKey, {"finishedOn", "processedOn", "timestamp"})
      if (not jobTS or jobTS <= timestamp) then
        -- replace the entry with a deletion marker; the actual deletion will
        -- occur at the end of the script
        rcall("LSET", listKey, rangeEnd - jobIdsLen + i, deletionMarker)
        removeJob(job, true, jobKeyPrefix)
        deletedCount = deletedCount + 1
        table.insert(deleted, job)
      end
    end
  end
  rcall("LREM", listKey, 0, deletionMarker)
  return {deleted, deletedCount}
end
--[[
  Function to clean job set.
  Returns jobIds and deleted count number.
]]
-- Includes
--[[
  Function to loop in batches.
  Just a bit of warning, some commands as ZREM
  could receive a maximum of 7000 parameters per call.
]]
local function batches(n, batchSize)
  local i = 0
  return function()
    local from = i * batchSize + 1
    i = i + 1
    if (from <= n) then
      local to = math.min(from + batchSize - 1, n)
      return from, to
    end
  end
end
--[[
  We use ZRANGEBYSCORE to make the case where we're deleting a limited number
  of items in a sorted set only run a single iteration. If we simply used
  ZRANGE, we may take a long time traversing through jobs that are within the
  grace period.
]]
local function getJobsInZset(zsetKey, rangeEnd, limit)
  if limit > 0 then
    return rcall("ZRANGEBYSCORE", zsetKey, 0, rangeEnd, "LIMIT", 0, limit)
  else
    return rcall("ZRANGEBYSCORE", zsetKey, 0, rangeEnd)
  end
end
local function cleanSet(setKey, jobKeyPrefix, rangeEnd, timestamp, limit, attributes, isFinished)
  local jobs = getJobsInZset(setKey, rangeEnd, limit)
  local deleted = {}
  local deletedCount = 0
  local jobTS
  for i, job in ipairs(jobs) do
    if limit > 0 and deletedCount >= limit then
      break
    end
    local jobKey = jobKeyPrefix .. job
    if isFinished then
      removeJob(job, true, jobKeyPrefix)
      deletedCount = deletedCount + 1
      table.insert(deleted, job)
    else
      -- * finishedOn says when the job was completed, but it isn't set unless the job has actually completed
      jobTS = getTimestamp(jobKey, attributes)
      if (not jobTS or jobTS <= timestamp) then
        removeJob(job, true, jobKeyPrefix)
        deletedCount = deletedCount + 1
        table.insert(deleted, job)
      end
    end
  end
  if(#deleted > 0) then
    for from, to in batches(#deleted, 7000) do
      rcall("ZREM", setKey, unpack(deleted, from, to))
    end
  end
  return {deleted, deletedCount}
end
local result
if ARGV[4] == "active" then
  result = cleanList(KEYS[1], ARGV[1], rangeStart, rangeEnd, ARGV[2], false)
elseif ARGV[4] == "delayed" then
  rangeEnd = "+inf"
  result = cleanSet(KEYS[1], ARGV[1], rangeEnd, ARGV[2], limit,
                    {"processedOn", "timestamp"}, false)
elseif ARGV[4] == "prioritized" then
  rangeEnd = "+inf"
  result = cleanSet(KEYS[1], ARGV[1], rangeEnd, ARGV[2], limit,
                    {"timestamp"}, false)
elseif ARGV[4] == "wait" or ARGV[4] == "paused" then
  result = cleanList(KEYS[1], ARGV[1], rangeStart, rangeEnd, ARGV[2], true)
else
  rangeEnd = ARGV[2]
  result = cleanSet(KEYS[1], ARGV[1], rangeEnd, ARGV[2], limit,
                    {"finishedOn"}, true)
end
rcall("XADD", KEYS[2], "*", "event", "cleaned", "count", result[2])
return result[1]
`,k={name:"cleanJobsInSet",content:E,keys:2},K=`--[[
  Drains the queue, removes all jobs that are waiting
  or delayed, but not active, completed or failed
  Input:
    KEYS[1] 'wait',
    KEYS[2] 'paused'
    KEYS[3] 'delayed'
    KEYS[4] 'prioritized'
    ARGV[1]  queue key prefix
]]
local rcall = redis.call
local queueBaseKey = ARGV[1]
--[[
  Functions to remove jobs.
]]
-- Includes
--[[
  Functions to remove jobs.
]]
-- Includes
--[[
  Function to remove job.
]]
-- Includes
--[[
  Function to remove job keys.
]]
local function removeJobKeys(jobKey)
  return rcall("DEL", jobKey, jobKey .. ':logs',
    jobKey .. ':dependencies', jobKey .. ':processed', jobKey .. ':failed')
end
--[[
  Check if this job has a parent. If so we will just remove it from
  the parent child list, but if it is the last child we should move the parent to "wait/paused"
  which requires code from "moveToFinished"
]]
-- Includes
--[[
  Function to add job in target list and add marker if needed.
]]
-- Includes
--[[
  Add marker if needed when a job is available.
]]
local function addBaseMarkerIfNeeded(markerKey, isPaused)
  if not isPaused then
    rcall("ZADD", markerKey, 0, "0")
  end  
end
local function addJobInTargetList(targetKey, markerKey, pushCmd, isPaused, jobId)
  rcall(pushCmd, targetKey, jobId)
  addBaseMarkerIfNeeded(markerKey, isPaused)
end
--[[
  Functions to destructure job key.
  Just a bit of warning, these functions may be a bit slow and affect performance significantly.
]]
local getJobIdFromKey = function (jobKey)
  return string.match(jobKey, ".*:(.*)")
end
local getJobKeyPrefix = function (jobKey, jobId)
  return string.sub(jobKey, 0, #jobKey - #jobId)
end
--[[
  Function to check for the meta.paused key to decide if we are paused or not
  (since an empty list and !EXISTS are not really the same).
]]
local function getTargetQueueList(queueMetaKey, waitKey, pausedKey)
  if rcall("HEXISTS", queueMetaKey, "paused") ~= 1 then
    return waitKey, false
  else
    return pausedKey, true
  end
end
local function moveParentToWait(parentPrefix, parentId, emitEvent)
  local parentTarget, isPaused = getTargetQueueList(parentPrefix .. "meta", parentPrefix .. "wait",
    parentPrefix .. "paused")
  addJobInTargetList(parentTarget, parentPrefix .. "marker", "RPUSH", isPaused, parentId)
  if emitEvent then
    local parentEventStream = parentPrefix .. "events"
    rcall("XADD", parentEventStream, "*", "event", "waiting", "jobId", parentId, "prev", "waiting-children")
  end
end
local function removeParentDependencyKey(jobKey, hard, parentKey, baseKey)
  if parentKey then
    local parentDependenciesKey = parentKey .. ":dependencies"
    local result = rcall("SREM", parentDependenciesKey, jobKey)
    if result > 0 then
      local pendingDependencies = rcall("SCARD", parentDependenciesKey)
      if pendingDependencies == 0 then
        local parentId = getJobIdFromKey(parentKey)
        local parentPrefix = getJobKeyPrefix(parentKey, parentId)
        local numRemovedElements = rcall("ZREM", parentPrefix .. "waiting-children", parentId)
        if numRemovedElements == 1 then
          if hard then -- remove parent in same queue
            if parentPrefix == baseKey then
              removeParentDependencyKey(parentKey, hard, nil, baseKey)
              removeJobKeys(parentKey)
            else
              moveParentToWait(parentPrefix, parentId)
            end
          else
            moveParentToWait(parentPrefix, parentId, true)
          end
        end
      end
      return true
    end
  else
    local missedParentKey = rcall("HGET", jobKey, "parentKey")
    if( (type(missedParentKey) == "string") and missedParentKey ~= ""
      and (rcall("EXISTS", missedParentKey) == 1)) then
      local parentDependenciesKey = missedParentKey .. ":dependencies"
      local result = rcall("SREM", parentDependenciesKey, jobKey)
      if result > 0 then
        local pendingDependencies = rcall("SCARD", parentDependenciesKey)
        if pendingDependencies == 0 then
          local parentId = getJobIdFromKey(missedParentKey)
          local parentPrefix = getJobKeyPrefix(missedParentKey, parentId)
          local numRemovedElements = rcall("ZREM", parentPrefix .. "waiting-children", parentId)
          if numRemovedElements == 1 then
            if hard then
              if parentPrefix == baseKey then
                removeParentDependencyKey(missedParentKey, hard, nil, baseKey)
                removeJobKeys(missedParentKey)
              else
                moveParentToWait(parentPrefix, parentId)
              end
            else
              moveParentToWait(parentPrefix, parentId, true)
            end
          end
        end
        return true
      end
    end
  end
  return false
end
local function removeJob(jobId, hard, baseKey)
  local jobKey = baseKey .. jobId
  removeParentDependencyKey(jobKey, hard, nil, baseKey)
  removeJobKeys(jobKey)
end
local function removeJobs(keys, hard, baseKey, max)
  for i, key in ipairs(keys) do
    removeJob(key, hard, baseKey)
  end
  return max - #keys
end
local function getListItems(keyName, max)
  return rcall('LRANGE', keyName, 0, max - 1)
end
local function removeListJobs(keyName, hard, baseKey, max)
  local jobs = getListItems(keyName, max)
  local count = removeJobs(jobs, hard, baseKey, max)
  rcall("LTRIM", keyName, #jobs, -1)
  return count
end
-- Includes
--[[
  Function to loop in batches.
  Just a bit of warning, some commands as ZREM
  could receive a maximum of 7000 parameters per call.
]]
local function batches(n, batchSize)
  local i = 0
  return function()
    local from = i * batchSize + 1
    i = i + 1
    if (from <= n) then
      local to = math.min(from + batchSize - 1, n)
      return from, to
    end
  end
end
--[[
  Function to get ZSet items.
]]
local function getZSetItems(keyName, max)
  return rcall('ZRANGE', keyName, 0, max - 1)
end
local function removeZSetJobs(keyName, hard, baseKey, max)
  local jobs = getZSetItems(keyName, max)
  local count = removeJobs(jobs, hard, baseKey, max)
  if(#jobs > 0) then
    for from, to in batches(#jobs, 7000) do
      rcall("ZREM", keyName, unpack(jobs, from, to))
    end
  end
  return count
end
removeListJobs(KEYS[1], true, queueBaseKey, 0) --wait
removeListJobs(KEYS[2], true, queueBaseKey, 0) --paused
if KEYS[3] ~= "" then
  removeZSetJobs(KEYS[3], true, queueBaseKey, 0) --delayed
end
removeZSetJobs(KEYS[4], true, queueBaseKey, 0) --prioritized
`,w={name:"drain",content:K,keys:4},I=`--[[
  Extend lock and removes the job from the stalled set.
  Input:
    KEYS[1] 'lock',
    KEYS[2] 'stalled'
    ARGV[1]  token
    ARGV[2]  lock duration in milliseconds
    ARGV[3]  jobid
  Output:
    "1" if lock extented succesfully.
]]
local rcall = redis.call
if rcall("GET", KEYS[1]) == ARGV[1] then
  --   if rcall("SET", KEYS[1], ARGV[1], "PX", ARGV[2], "XX") then
  if rcall("SET", KEYS[1], ARGV[1], "PX", ARGV[2]) then
    rcall("SREM", KEYS[2], ARGV[3])
    return 1
  end
end
return 0
`,x={name:"extendLock",content:I,keys:2},A=`--[[
  Get counts per provided states
    Input:
      KEYS[1]    'prefix'
      ARGV[1...] types
]]
local rcall = redis.call;
local prefix = KEYS[1]
local results = {}
for i = 1, #ARGV do
  local stateKey = prefix .. ARGV[i]
  if ARGV[i] == "wait" or ARGV[i] == "paused" then
    -- Markers in waitlist DEPRECATED in v5: Remove in v6.
    local marker = rcall("LINDEX", stateKey, -1)
    if marker and string.sub(marker, 1, 2) == "0:" then
      local count = rcall("LLEN", stateKey)
      if count > 1 then
        rcall("RPOP", stateKey)
        results[#results+1] = count-1
      else
        results[#results+1] = 0
      end
    else
      results[#results+1] = rcall("LLEN", stateKey)
    end
  elseif ARGV[i] == "active" then
    results[#results+1] = rcall("LLEN", stateKey)
  else
    results[#results+1] = rcall("ZCARD", stateKey)
  end
end
return results
`,T={name:"getCounts",content:A,keys:1},j=`--[[
  Get job ids per provided states
    Input:
      KEYS[1]    'prefix'
      ARGV[1]    start
      ARGV[2]    end
      ARGV[3]    asc
      ARGV[4...] types
]]
local rcall = redis.call
local prefix = KEYS[1]
local rangeStart = tonumber(ARGV[1])
local rangeEnd = tonumber(ARGV[2])
local asc = ARGV[3]
local results = {}
local function getRangeInList(listKey, asc, rangeStart, rangeEnd, results)
  if asc == "1" then
    local modifiedRangeStart
    local modifiedRangeEnd
    if rangeStart == -1 then
      modifiedRangeStart = 0
    else
      modifiedRangeStart = -(rangeStart + 1)
    end
    if rangeEnd == -1 then
      modifiedRangeEnd = 0
    else
      modifiedRangeEnd = -(rangeEnd + 1)
    end
    results[#results+1] = rcall("LRANGE", listKey,
      modifiedRangeEnd,
      modifiedRangeStart)
  else
    results[#results+1] = rcall("LRANGE", listKey, rangeStart, rangeEnd)
  end
end
for i = 4, #ARGV do
  local stateKey = prefix .. ARGV[i]
  if ARGV[i] == "wait" or ARGV[i] == "paused" then
    -- Markers in waitlist DEPRECATED in v5: Remove in v6.
    local marker = rcall("LINDEX", stateKey, -1)
    if marker and string.sub(marker, 1, 2) == "0:" then
      local count = rcall("LLEN", stateKey)
      if count > 1 then
        rcall("RPOP", stateKey)
        getRangeInList(stateKey, asc, rangeStart, rangeEnd, results)
      else
        results[#results+1] = {}
      end
    else
      getRangeInList(stateKey, asc, rangeStart, rangeEnd, results)
    end
  elseif ARGV[i] == "active" then
    getRangeInList(stateKey, asc, rangeStart, rangeEnd, results)
  else
    if asc == "1" then
      results[#results+1] = rcall("ZRANGE", stateKey, rangeStart, rangeEnd)
    else
      results[#results+1] = rcall("ZREVRANGE", stateKey, rangeStart, rangeEnd)
    end
  end
end
return results
`,R={name:"getRanges",content:j,keys:1},_=`--[[
  Get a job state
  Input: 
    KEYS[1] 'completed' key,
    KEYS[2] 'failed' key
    KEYS[3] 'delayed' key
    KEYS[4] 'active' key
    KEYS[5] 'wait' key
    KEYS[6] 'paused' key
    KEYS[7] 'waiting-children' key
    KEYS[8] 'prioritized' key
    ARGV[1] job id
  Output:
    'completed'
    'failed'
    'delayed'
    'active'
    'prioritized'
    'waiting'
    'waiting-children'
    'unknown'
]]
local rcall = redis.call
if rcall("ZSCORE", KEYS[1], ARGV[1]) ~= false then
  return "completed"
end
if rcall("ZSCORE", KEYS[2], ARGV[1]) ~= false then
  return "failed"
end
if rcall("ZSCORE", KEYS[3], ARGV[1]) ~= false then
  return "delayed"
end
if rcall("ZSCORE", KEYS[8], ARGV[1]) ~= false then
  return "prioritized"
end
-- Includes
--[[
  Functions to check if a item belongs to a list.
]]
local function checkItemInList(list, item)
  for _, v in pairs(list) do
    if v == item then
      return 1
    end
  end
  return nil
end
local active_items = rcall("LRANGE", KEYS[4] , 0, -1)
if checkItemInList(active_items, ARGV[1]) ~= nil then
  return "active"
end
local wait_items = rcall("LRANGE", KEYS[5] , 0, -1)
if checkItemInList(wait_items, ARGV[1]) ~= nil then
  return "waiting"
end
local paused_items = rcall("LRANGE", KEYS[6] , 0, -1)
if checkItemInList(paused_items, ARGV[1]) ~= nil then
  return "waiting"
end
if rcall("ZSCORE", KEYS[7], ARGV[1]) ~= false then
  return "waiting-children"
end
return "unknown"
`,C={name:"getState",content:_,keys:8},O=`--[[
  Get a job state
  Input: 
    KEYS[1] 'completed' key,
    KEYS[2] 'failed' key
    KEYS[3] 'delayed' key
    KEYS[4] 'active' key
    KEYS[5] 'wait' key
    KEYS[6] 'paused' key
    KEYS[7] 'waiting-children' key
    KEYS[8] 'prioritized' key
    ARGV[1] job id
  Output:
    'completed'
    'failed'
    'delayed'
    'active'
    'waiting'
    'waiting-children'
    'unknown'
]]
local rcall = redis.call
if rcall("ZSCORE", KEYS[1], ARGV[1]) ~= false then
  return "completed"
end
if rcall("ZSCORE", KEYS[2], ARGV[1]) ~= false then
  return "failed"
end
if rcall("ZSCORE", KEYS[3], ARGV[1]) ~= false then
  return "delayed"
end
if rcall("ZSCORE", KEYS[8], ARGV[1]) ~= false then
  return "prioritized"
end
if rcall("LPOS", KEYS[4] , ARGV[1]) ~= false then
  return "active"
end
if rcall("LPOS", KEYS[5] , ARGV[1]) ~= false then
  return "waiting"
end
if rcall("LPOS", KEYS[6] , ARGV[1]) ~= false then
  return "waiting"
end
if rcall("ZSCORE", KEYS[7] , ARGV[1]) ~= false then
  return "waiting-children"
end
return "unknown"
`,P={name:"getStateV2",content:O,keys:8},D=`--[[
  Checks if a job is finished (.i.e. is in the completed or failed set)
  Input: 
    KEYS[1] completed key
    KEYS[2] failed key
    KEYS[3] job key
    ARGV[1] job id
    ARGV[2] return value?
  Output:
    0 - Not finished.
    1 - Completed.
    2 - Failed.
   -1 - Missing job. 
]]
local rcall = redis.call
if rcall("EXISTS", KEYS[3]) ~= 1 then
  if ARGV[2] == "1" then
    return {-1,"Missing key for job " .. KEYS[3] .. ". isFinished"}
  end  
  return -1
end
if rcall("ZSCORE", KEYS[1], ARGV[1]) ~= false then
  if ARGV[2] == "1" then
    local returnValue = rcall("HGET", KEYS[3], "returnvalue")
    return {1,returnValue}
  end
  return 1
end
if rcall("ZSCORE", KEYS[2], ARGV[1]) ~= false then
  if ARGV[2] == "1" then
    local failedReason = rcall("HGET", KEYS[3], "failedReason")
    return {2,failedReason}
  end
  return 2
end
if ARGV[2] == "1" then
  return {0}
end
return 0
`,M={name:"isFinished",content:D,keys:3},N=`--[[
  Checks if job is in a given list.
  Input:
    KEYS[1]
    ARGV[1]
  Output:
    1 if element found in the list.
]]
-- Includes
--[[
  Functions to check if a item belongs to a list.
]]
local function checkItemInList(list, item)
  for _, v in pairs(list) do
    if v == item then
      return 1
    end
  end
  return nil
end
local items = redis.call("LRANGE", KEYS[1] , 0, -1)
return checkItemInList(items, ARGV[1])
`,L={name:"isJobInList",content:N,keys:1},F=`--[[
  Function to move job from active state to wait.
  Input:
    KEYS[1]  active key
    KEYS[2]  wait key
    KEYS[3]  stalled key
    KEYS[4]  job lock key
    KEYS[5]  paused key
    KEYS[6]  meta key
    KEYS[7]  limiter key
    KEYS[8]  prioritized key
    KEYS[9]  marker key
    KEYS[10] event key
    ARGV[1] job id
    ARGV[2] lock token
    ARGV[3] job id key
]]
local rcall = redis.call
-- Includes
--[[
  Function to add job in target list and add marker if needed.
]]
-- Includes
--[[
  Add marker if needed when a job is available.
]]
local function addBaseMarkerIfNeeded(markerKey, isPaused)
  if not isPaused then
    rcall("ZADD", markerKey, 0, "0")
  end  
end
local function addJobInTargetList(targetKey, markerKey, pushCmd, isPaused, jobId)
  rcall(pushCmd, targetKey, jobId)
  addBaseMarkerIfNeeded(markerKey, isPaused)
end
--[[
  Function to push back job considering priority in front of same prioritized jobs.
]]
local function pushBackJobWithPriority(prioritizedKey, priority, jobId)
  -- in order to put it at front of same prioritized jobs
  -- we consider prioritized counter as 0
  local score = priority * 0x100000000
  rcall("ZADD", prioritizedKey, score, jobId)
end
--[[
  Function to get max events value or set by default 10000.
]]
local function getOrSetMaxEvents(metaKey)
    local maxEvents = rcall("HGET", metaKey, "opts.maxLenEvents")
    if not maxEvents then
        maxEvents = 10000
        rcall("HSET", metaKey, "opts.maxLenEvents", maxEvents)
    end
    return maxEvents
end
--[[
  Function to check for the meta.paused key to decide if we are paused or not
  (since an empty list and !EXISTS are not really the same).
]]
local function getTargetQueueList(queueMetaKey, waitKey, pausedKey)
  if rcall("HEXISTS", queueMetaKey, "paused") ~= 1 then
    return waitKey, false
  else
    return pausedKey, true
  end
end
local jobId = ARGV[1]
local token = ARGV[2]
local lockKey = KEYS[4]
local lockToken = rcall("GET", lockKey)
local pttl = rcall("PTTL", KEYS[7])
if lockToken == token then
  local metaKey = KEYS[6]
  local removed = rcall("LREM", KEYS[1], 1, jobId)
  if removed > 0 then
    local target, isPaused = getTargetQueueList(metaKey, KEYS[2], KEYS[5])
    rcall("SREM", KEYS[3], jobId)
    local priority = tonumber(rcall("HGET", ARGV[3], "priority")) or 0
    if priority > 0 then
      pushBackJobWithPriority(KEYS[8], priority, jobId)
    else
      addJobInTargetList(target, KEYS[9], "RPUSH", isPaused, jobId)
    end
    rcall("DEL", lockKey)
    local maxEvents = getOrSetMaxEvents(metaKey)
    -- Emit waiting event
    rcall("XADD", KEYS[10], "MAXLEN", "~", maxEvents, "*", "event", "waiting",
      "jobId", jobId)
  end
end
return pttl
`,V={name:"moveJobFromActiveToWait",content:F,keys:10},J=`--[[
  Move completed, failed or delayed jobs to wait.
  Note: Does not support jobs with priorities.
  Input:
    KEYS[1] base key
    KEYS[2] events stream
    KEYS[3] state key (failed, completed, delayed)
    KEYS[4] 'wait'
    KEYS[5] 'paused'
    KEYS[6] 'meta'
    KEYS[7] 'marker'
    ARGV[1] count
    ARGV[2] timestamp
    ARGV[3] prev state
  Output:
    1  means the operation is not completed
    0  means the operation is completed
]]
local maxCount = tonumber(ARGV[1])
local timestamp = tonumber(ARGV[2])
local rcall = redis.call;
-- Includes
--[[
  Add marker if needed when a job is available.
]]
local function addBaseMarkerIfNeeded(markerKey, isPaused)
  if not isPaused then
    rcall("ZADD", markerKey, 0, "0")
  end  
end
--[[
  Function to loop in batches.
  Just a bit of warning, some commands as ZREM
  could receive a maximum of 7000 parameters per call.
]]
local function batches(n, batchSize)
  local i = 0
  return function()
    local from = i * batchSize + 1
    i = i + 1
    if (from <= n) then
      local to = math.min(from + batchSize - 1, n)
      return from, to
    end
  end
end
--[[
  Function to get max events value or set by default 10000.
]]
local function getOrSetMaxEvents(metaKey)
    local maxEvents = rcall("HGET", metaKey, "opts.maxLenEvents")
    if not maxEvents then
        maxEvents = 10000
        rcall("HSET", metaKey, "opts.maxLenEvents", maxEvents)
    end
    return maxEvents
end
--[[
  Function to check for the meta.paused key to decide if we are paused or not
  (since an empty list and !EXISTS are not really the same).
]]
local function getTargetQueueList(queueMetaKey, waitKey, pausedKey)
  if rcall("HEXISTS", queueMetaKey, "paused") ~= 1 then
    return waitKey, false
  else
    return pausedKey, true
  end
end
local metaKey = KEYS[6]
local target, paused = getTargetQueueList(metaKey, KEYS[4], KEYS[5])
local jobs = rcall('ZRANGEBYSCORE', KEYS[3], 0, timestamp, 'LIMIT', 0, maxCount)
if (#jobs > 0) then
    if ARGV[3] == "failed" then
        for i, key in ipairs(jobs) do
            local jobKey = KEYS[1] .. key
            rcall("HDEL", jobKey, "finishedOn", "processedOn", "failedReason")
        end
    elseif ARGV[3] == "completed" then
        for i, key in ipairs(jobs) do
            local jobKey = KEYS[1] .. key
            rcall("HDEL", jobKey, "finishedOn", "processedOn", "returnvalue")
        end
    end
    local maxEvents = getOrSetMaxEvents(metaKey)
    for i, key in ipairs(jobs) do
        -- Emit waiting event
        rcall("XADD", KEYS[2], "MAXLEN", "~", maxEvents, "*", "event",
              "waiting", "jobId", key, "prev", ARGV[3]);
    end
    for from, to in batches(#jobs, 7000) do
        rcall("ZREM", KEYS[3], unpack(jobs, from, to))
        rcall("LPUSH", target, unpack(jobs, from, to))
    end
    addBaseMarkerIfNeeded(KEYS[7], paused)
end
maxCount = maxCount - #jobs
if (maxCount <= 0) then return 1 end
return 0
`,G={name:"moveJobsToWait",content:J,keys:7},$=`--[[
  Move stalled jobs to wait.
    Input:
      KEYS[1] 'stalled' (SET)
      KEYS[2] 'wait',   (LIST)
      KEYS[3] 'active', (LIST)
      KEYS[4] 'failed', (ZSET)
      KEYS[5] 'stalled-check', (KEY)
      KEYS[6] 'meta', (KEY)
      KEYS[7] 'paused', (LIST)
      KEYS[8] 'marker'
      KEYS[9] 'event stream' (STREAM)
      ARGV[1]  Max stalled job count
      ARGV[2]  queue.toKey('')
      ARGV[3]  timestamp
      ARGV[4]  max check time
    Events:
      'stalled' with stalled job id.
]]
local rcall = redis.call
-- Includes
--[[
  Function to add job in target list and add marker if needed.
]]
-- Includes
--[[
  Add marker if needed when a job is available.
]]
local function addBaseMarkerIfNeeded(markerKey, isPaused)
  if not isPaused then
    rcall("ZADD", markerKey, 0, "0")
  end  
end
local function addJobInTargetList(targetKey, markerKey, pushCmd, isPaused, jobId)
  rcall(pushCmd, targetKey, jobId)
  addBaseMarkerIfNeeded(markerKey, isPaused)
end
--[[
  Function to loop in batches.
  Just a bit of warning, some commands as ZREM
  could receive a maximum of 7000 parameters per call.
]]
local function batches(n, batchSize)
  local i = 0
  return function()
    local from = i * batchSize + 1
    i = i + 1
    if (from <= n) then
      local to = math.min(from + batchSize - 1, n)
      return from, to
    end
  end
end
--[[
  Function to check for the meta.paused key to decide if we are paused or not
  (since an empty list and !EXISTS are not really the same).
]]
local function getTargetQueueList(queueMetaKey, waitKey, pausedKey)
  if rcall("HEXISTS", queueMetaKey, "paused") ~= 1 then
    return waitKey, false
  else
    return pausedKey, true
  end
end
--[[
  Function to remove job.
]]
-- Includes
--[[
  Function to remove job keys.
]]
local function removeJobKeys(jobKey)
  return rcall("DEL", jobKey, jobKey .. ':logs',
    jobKey .. ':dependencies', jobKey .. ':processed', jobKey .. ':failed')
end
--[[
  Check if this job has a parent. If so we will just remove it from
  the parent child list, but if it is the last child we should move the parent to "wait/paused"
  which requires code from "moveToFinished"
]]
-- Includes
--[[
  Functions to destructure job key.
  Just a bit of warning, these functions may be a bit slow and affect performance significantly.
]]
local getJobIdFromKey = function (jobKey)
  return string.match(jobKey, ".*:(.*)")
end
local getJobKeyPrefix = function (jobKey, jobId)
  return string.sub(jobKey, 0, #jobKey - #jobId)
end
local function moveParentToWait(parentPrefix, parentId, emitEvent)
  local parentTarget, isPaused = getTargetQueueList(parentPrefix .. "meta", parentPrefix .. "wait",
    parentPrefix .. "paused")
  addJobInTargetList(parentTarget, parentPrefix .. "marker", "RPUSH", isPaused, parentId)
  if emitEvent then
    local parentEventStream = parentPrefix .. "events"
    rcall("XADD", parentEventStream, "*", "event", "waiting", "jobId", parentId, "prev", "waiting-children")
  end
end
local function removeParentDependencyKey(jobKey, hard, parentKey, baseKey)
  if parentKey then
    local parentDependenciesKey = parentKey .. ":dependencies"
    local result = rcall("SREM", parentDependenciesKey, jobKey)
    if result > 0 then
      local pendingDependencies = rcall("SCARD", parentDependenciesKey)
      if pendingDependencies == 0 then
        local parentId = getJobIdFromKey(parentKey)
        local parentPrefix = getJobKeyPrefix(parentKey, parentId)
        local numRemovedElements = rcall("ZREM", parentPrefix .. "waiting-children", parentId)
        if numRemovedElements == 1 then
          if hard then -- remove parent in same queue
            if parentPrefix == baseKey then
              removeParentDependencyKey(parentKey, hard, nil, baseKey)
              removeJobKeys(parentKey)
            else
              moveParentToWait(parentPrefix, parentId)
            end
          else
            moveParentToWait(parentPrefix, parentId, true)
          end
        end
      end
      return true
    end
  else
    local missedParentKey = rcall("HGET", jobKey, "parentKey")
    if( (type(missedParentKey) == "string") and missedParentKey ~= ""
      and (rcall("EXISTS", missedParentKey) == 1)) then
      local parentDependenciesKey = missedParentKey .. ":dependencies"
      local result = rcall("SREM", parentDependenciesKey, jobKey)
      if result > 0 then
        local pendingDependencies = rcall("SCARD", parentDependenciesKey)
        if pendingDependencies == 0 then
          local parentId = getJobIdFromKey(missedParentKey)
          local parentPrefix = getJobKeyPrefix(missedParentKey, parentId)
          local numRemovedElements = rcall("ZREM", parentPrefix .. "waiting-children", parentId)
          if numRemovedElements == 1 then
            if hard then
              if parentPrefix == baseKey then
                removeParentDependencyKey(missedParentKey, hard, nil, baseKey)
                removeJobKeys(missedParentKey)
              else
                moveParentToWait(parentPrefix, parentId)
              end
            else
              moveParentToWait(parentPrefix, parentId, true)
            end
          end
        end
        return true
      end
    end
  end
  return false
end
local function removeJob(jobId, hard, baseKey)
  local jobKey = baseKey .. jobId
  removeParentDependencyKey(jobKey, hard, nil, baseKey)
  removeJobKeys(jobKey)
end
--[[
  Functions to remove jobs by max age.
]]
-- Includes
local function removeJobsByMaxAge(timestamp, maxAge, targetSet, prefix)
  local start = timestamp - maxAge * 1000
  local jobIds = rcall("ZREVRANGEBYSCORE", targetSet, start, "-inf")
  for i, jobId in ipairs(jobIds) do
    removeJob(jobId, false, prefix)
  end
  rcall("ZREMRANGEBYSCORE", targetSet, "-inf", start)
end
--[[
  Functions to remove jobs by max count.
]]
-- Includes
local function removeJobsByMaxCount(maxCount, targetSet, prefix)
  local start = maxCount
  local jobIds = rcall("ZREVRANGE", targetSet, start, -1)
  for i, jobId in ipairs(jobIds) do
    removeJob(jobId, false, prefix)
  end
  rcall("ZREMRANGEBYRANK", targetSet, 0, -(maxCount + 1))
end
--[[
  Function to trim events, default 10000.
]]
-- Includes
--[[
  Function to get max events value or set by default 10000.
]]
local function getOrSetMaxEvents(metaKey)
    local maxEvents = rcall("HGET", metaKey, "opts.maxLenEvents")
    if not maxEvents then
        maxEvents = 10000
        rcall("HSET", metaKey, "opts.maxLenEvents", maxEvents)
    end
    return maxEvents
end
local function trimEvents(metaKey, eventStreamKey)
  local maxEvents = getOrSetMaxEvents(metaKey)
  if maxEvents ~= false then
    rcall("XTRIM", eventStreamKey, "MAXLEN", "~", maxEvents)
  else
    rcall("XTRIM", eventStreamKey, "MAXLEN", "~", 10000)
  end
end
local stalledKey = KEYS[1]
local waitKey = KEYS[2]
local activeKey = KEYS[3]
local failedKey = KEYS[4]
local stalledCheckKey = KEYS[5]
local metaKey = KEYS[6]
local pausedKey = KEYS[7]
local markerKey = KEYS[8]
local eventStreamKey = KEYS[9]
local maxStalledJobCount = ARGV[1]
local queueKeyPrefix = ARGV[2]
local timestamp = ARGV[3]
local maxCheckTime = ARGV[4]
if rcall("EXISTS", stalledCheckKey) == 1 then return {{}, {}} end
rcall("SET", stalledCheckKey, timestamp, "PX", maxCheckTime)
-- Trim events before emiting them to avoid trimming events emitted in this script
trimEvents(metaKey, eventStreamKey)
-- Move all stalled jobs to wait
local stalling = rcall('SMEMBERS', stalledKey)
local stalled = {}
local failed = {}
if (#stalling > 0) then
    rcall('DEL', stalledKey)
    local MAX_STALLED_JOB_COUNT = tonumber(maxStalledJobCount)
    -- Remove from active list
    for i, jobId in ipairs(stalling) do
        -- Markers in waitlist DEPRECATED in v5: Remove in v6.
        if string.sub(jobId, 1, 2) == "0:" then
            -- If the jobId is a delay marker ID we just remove it.
            rcall("LREM", activeKey, 1, jobId)
        else
            local jobKey = queueKeyPrefix .. jobId
            -- Check that the lock is also missing, then we can handle this job as really stalled.
            if (rcall("EXISTS", jobKey .. ":lock") == 0) then
                --  Remove from the active queue.
                local removed = rcall("LREM", activeKey, 1, jobId)
                if (removed > 0) then
                    -- If this job has been stalled too many times, such as if it crashes the worker, then fail it.
                    local stalledCount =
                        rcall("HINCRBY", jobKey, "stalledCounter", 1)
                    if (stalledCount > MAX_STALLED_JOB_COUNT) then
                        local rawOpts = rcall("HGET", jobKey, "opts")
                        local opts = cjson.decode(rawOpts)
                        local removeOnFailType = type(opts["removeOnFail"])
                        rcall("ZADD", failedKey, timestamp, jobId)
                        local failedReason =
                            "job stalled more than allowable limit"
                        rcall("HMSET", jobKey, "failedReason", failedReason,
                              "finishedOn", timestamp)
                        rcall("XADD", eventStreamKey, "*", "event",
                              "failed", "jobId", jobId, 'prev', 'active',
                              'failedReason', failedReason)
                        if removeOnFailType == "number" then
                            removeJobsByMaxCount(opts["removeOnFail"],
                                                  failedKey, queueKeyPrefix)
                        elseif removeOnFailType == "boolean" then
                            if opts["removeOnFail"] then
                                removeJob(jobId, false, queueKeyPrefix)
                                rcall("ZREM", failedKey, jobId)
                            end
                        elseif removeOnFailType ~= "nil" then
                            local maxAge = opts["removeOnFail"]["age"]
                            local maxCount = opts["removeOnFail"]["count"]
                            if maxAge ~= nil then
                                removeJobsByMaxAge(timestamp, maxAge,
                                                    failedKey, queueKeyPrefix)
                            end
                            if maxCount ~= nil and maxCount > 0 then
                                removeJobsByMaxCount(maxCount, failedKey,
                                                      queueKeyPrefix)
                            end
                        end
                        table.insert(failed, jobId)
                    else
                        local target, isPaused=
                            getTargetQueueList(metaKey, waitKey, pausedKey)
                        -- Move the job back to the wait queue, to immediately be picked up by a waiting worker.
                        addJobInTargetList(target, markerKey, "RPUSH", isPaused, jobId)
                        rcall("XADD", eventStreamKey, "*", "event",
                              "waiting", "jobId", jobId, 'prev', 'active')
                        -- Emit the stalled event
                        rcall("XADD", eventStreamKey, "*", "event",
                              "stalled", "jobId", jobId)
                        table.insert(stalled, jobId)
                    end
                end
            end
        end
    end
end
-- Mark potentially stalled jobs
local active = rcall('LRANGE', activeKey, 0, -1)
if (#active > 0) then
    for from, to in batches(#active, 7000) do
        rcall('SADD', stalledKey, unpack(active, from, to))
    end
end
return {failed, stalled}`,Y={name:"moveStalledJobsToWait",content:$,keys:9},B=`--[[
  Move next job to be processed to active, lock it and fetch its data. The job
  may be delayed, in that case we need to move it to the delayed set instead.
  This operation guarantees that the worker owns the job during the lock
  expiration time. The worker is responsible of keeping the lock fresh
  so that no other worker picks this job again.
  Input:
    KEYS[1] wait key
    KEYS[2] active key
    KEYS[3] prioritized key
    KEYS[4] stream events key
    KEYS[5] stalled key
    -- Rate limiting
    KEYS[6] rate limiter key
    KEYS[7] delayed key
    -- Delayed jobs
    KEYS[8] paused key
    KEYS[9] meta key
    KEYS[10] pc priority counter
    -- Marker
    KEYS[11] marker key
    -- Arguments
    ARGV[1] key prefix
    ARGV[2] timestamp
    ARGV[3] opts
    opts - token - lock token
    opts - lockDuration
    opts - limiter
]]
local rcall = redis.call
local waitKey = KEYS[1]
local activeKey = KEYS[2]
local eventStreamKey = KEYS[4]
local rateLimiterKey = KEYS[6]
local delayedKey = KEYS[7]
local opts = cmsgpack.unpack(ARGV[3])
-- Includes
--[[
  Function to return the next delayed job timestamp.
]]
local function getNextDelayedTimestamp(delayedKey)
  local result = rcall("ZRANGE", delayedKey, 0, 0, "WITHSCORES")
  if #result then
    local nextTimestamp = tonumber(result[2])
    if (nextTimestamp ~= nil) then 
      nextTimestamp = nextTimestamp / 0x1000
    end
    return nextTimestamp
  end
end
--[[
  Function to get current rate limit ttl.
]]
local function getRateLimitTTL(maxJobs, rateLimiterKey)
  if maxJobs and maxJobs <= tonumber(rcall("GET", rateLimiterKey) or 0) then
    local pttl = rcall("PTTL", rateLimiterKey)
    if pttl == 0 then
      rcall("DEL", rateLimiterKey)
    end
    if pttl > 0 then
      return pttl
    end
  end
  return 0
end
--[[
  Function to check for the meta.paused key to decide if we are paused or not
  (since an empty list and !EXISTS are not really the same).
]]
local function getTargetQueueList(queueMetaKey, waitKey, pausedKey)
  if rcall("HEXISTS", queueMetaKey, "paused") ~= 1 then
    return waitKey, false
  else
    return pausedKey, true
  end
end
--[[
  Function to move job from prioritized state to active.
]]
local function moveJobFromPriorityToActive(priorityKey, activeKey, priorityCounterKey)
  local prioritizedJob = rcall("ZPOPMIN", priorityKey)
  if #prioritizedJob > 0 then
    rcall("LPUSH", activeKey, prioritizedJob[1])
    return prioritizedJob[1]
  else
    rcall("DEL", priorityCounterKey)
  end
end
--[[
  Function to move job from wait state to active.
  Input:
    opts - token - lock token
    opts - lockDuration
    opts - limiter
]]
local function prepareJobForProcessing(keyPrefix, rateLimiterKey, eventStreamKey,
    jobId, processedOn, maxJobs, opts)
  local jobKey = keyPrefix .. jobId
  -- Check if we need to perform rate limiting.
  if maxJobs then
    local jobCounter = tonumber(rcall("INCR", rateLimiterKey))
    if jobCounter == 1 then
      local limiterDuration = opts['limiter'] and opts['limiter']['duration']
      local integerDuration = math.floor(math.abs(limiterDuration))
      rcall("PEXPIRE", rateLimiterKey, integerDuration)
    end
  end
  local lockKey = jobKey .. ':lock'
  -- get a lock
  if opts['token'] ~= "0" then
    rcall("SET", lockKey, opts['token'], "PX", opts['lockDuration'])
  end
  if opts['name'] then
    -- Set "processedBy" field to the worker name
    rcall("HSET", jobKey, "pb", opts['name'])
  end
  rcall("XADD", eventStreamKey, "*", "event", "active", "jobId", jobId, "prev", "waiting")
  rcall("HSET", jobKey, "processedOn", processedOn)
  rcall("HINCRBY", jobKey, "ats", 1)
  return {rcall("HGETALL", jobKey), jobId, 0, 0} -- get job data
end
--[[
  Updates the delay set, by moving delayed jobs that should
  be processed now to "wait".
     Events:
      'waiting'
]]
-- Includes
--[[
  Function to add job in target list and add marker if needed.
]]
-- Includes
--[[
  Add marker if needed when a job is available.
]]
local function addBaseMarkerIfNeeded(markerKey, isPaused)
  if not isPaused then
    rcall("ZADD", markerKey, 0, "0")
  end  
end
local function addJobInTargetList(targetKey, markerKey, pushCmd, isPaused, jobId)
  rcall(pushCmd, targetKey, jobId)
  addBaseMarkerIfNeeded(markerKey, isPaused)
end
--[[
  Function to add job considering priority.
]]
-- Includes
local function addJobWithPriority(markerKey, prioritizedKey, priority, jobId, priorityCounterKey, isPaused)
  local prioCounter = rcall("INCR", priorityCounterKey)
  local score = priority * 0x100000000 + bit.band(prioCounter, 0xffffffffffff)
  rcall("ZADD", prioritizedKey, score, jobId)
  addBaseMarkerIfNeeded(markerKey, isPaused)
end
-- Try to get as much as 1000 jobs at once
local function promoteDelayedJobs(delayedKey, markerKey, targetKey, prioritizedKey,
                                  eventStreamKey, prefix, timestamp, priorityCounterKey, isPaused)
    local jobs = rcall("ZRANGEBYSCORE", delayedKey, 0, (timestamp + 1) * 0x1000, "LIMIT", 0, 1000)
    if (#jobs > 0) then
        rcall("ZREM", delayedKey, unpack(jobs))
        for _, jobId in ipairs(jobs) do
            local jobKey = prefix .. jobId
            local priority =
                tonumber(rcall("HGET", jobKey, "priority")) or 0
            if priority == 0 then
                -- LIFO or FIFO
                addJobInTargetList(targetKey, markerKey, "LPUSH", isPaused, jobId)
            else
                addJobWithPriority(markerKey, prioritizedKey, priority,
                  jobId, priorityCounterKey, isPaused)
            end
            -- Emit waiting event
            rcall("XADD", eventStreamKey, "*", "event", "waiting", "jobId",
                  jobId, "prev", "delayed")
            rcall("HSET", jobKey, "delay", 0)
        end
    end
end
local target, paused = getTargetQueueList(KEYS[9], waitKey, KEYS[8])
-- Check if there are delayed jobs that we can move to wait.
local markerKey = KEYS[11]
promoteDelayedJobs(delayedKey, markerKey, target, KEYS[3], eventStreamKey, ARGV[1],
                   ARGV[2], KEYS[10], paused)
local maxJobs = tonumber(opts['limiter'] and opts['limiter']['max'])
local expireTime = getRateLimitTTL(maxJobs, rateLimiterKey)
-- Check if we are rate limited first.
if expireTime > 0 then return {0, 0, expireTime, 0} end
-- paused queue
if paused then return {0, 0, 0, 0} end
-- no job ID, try non-blocking move from wait to active
local jobId = rcall("RPOPLPUSH", waitKey, activeKey)
-- Markers in waitlist DEPRECATED in v5: Will be completely removed in v6.
if jobId and string.sub(jobId, 1, 2) == "0:" then
    rcall("LREM", activeKey, 1, jobId)
    jobId = rcall("RPOPLPUSH", waitKey, activeKey)
end
if jobId then
    return prepareJobForProcessing(ARGV[1], rateLimiterKey, eventStreamKey, jobId, ARGV[2],
                                   maxJobs, opts)
else
    jobId = moveJobFromPriorityToActive(KEYS[3], activeKey, KEYS[10])
    if jobId then
        return prepareJobForProcessing(ARGV[1], rateLimiterKey, eventStreamKey, jobId, ARGV[2],
                                       maxJobs, opts)
    end
end
-- Return the timestamp for the next delayed job if any.
local nextTimestamp = getNextDelayedTimestamp(delayedKey)
if (nextTimestamp ~= nil) then return {0, 0, 0, nextTimestamp} end
return {0, 0, 0, 0}
`,z={name:"moveToActive",content:B,keys:11},H=`--[[
  Moves job from active to delayed set.
  Input:
    KEYS[1] marker key
    KEYS[2] active key
    KEYS[3] prioritized key
    KEYS[4] delayed key
    KEYS[5] job key
    KEYS[6] events stream
    KEYS[7] meta key
    ARGV[1] key prefix
    ARGV[2] timestamp
    ARGV[3] delayedTimestamp
    ARGV[4] the id of the job
    ARGV[5] queue token
    ARGV[6] delay value
    ARGV[7] skip attempt
  Output:
    0 - OK
   -1 - Missing job.
   -3 - Job not in active set.
  Events:
    - delayed key.
]]
local rcall = redis.call
-- Includes
--[[
  Add delay marker if needed.
]]
-- Includes
--[[
  Function to return the next delayed job timestamp.
]]
local function getNextDelayedTimestamp(delayedKey)
  local result = rcall("ZRANGE", delayedKey, 0, 0, "WITHSCORES")
  if #result then
    local nextTimestamp = tonumber(result[2])
    if (nextTimestamp ~= nil) then 
      nextTimestamp = nextTimestamp / 0x1000
    end
    return nextTimestamp
  end
end
local function addDelayMarkerIfNeeded(markerKey, delayedKey)
    local nextTimestamp = getNextDelayedTimestamp(delayedKey)
    if nextTimestamp ~= nil then
        -- Replace the score of the marker with the newest known
        -- next timestamp.
        rcall("ZADD", markerKey, nextTimestamp, "1")
    end
end
--[[
  Function to get max events value or set by default 10000.
]]
local function getOrSetMaxEvents(metaKey)
    local maxEvents = rcall("HGET", metaKey, "opts.maxLenEvents")
    if not maxEvents then
        maxEvents = 10000
        rcall("HSET", metaKey, "opts.maxLenEvents", maxEvents)
    end
    return maxEvents
end
--[[
  Function to check for the meta.paused key to decide if we are paused or not
  (since an empty list and !EXISTS are not really the same).
]]
local function isQueuePaused(queueMetaKey)
    return rcall("HEXISTS", queueMetaKey, "paused") == 1
end
local jobKey = KEYS[5]
local metaKey = KEYS[7]
if rcall("EXISTS", jobKey) == 1 then
    local delayedKey = KEYS[4]
    if ARGV[5] ~= "0" then
        local lockKey = jobKey .. ':lock'
        if rcall("GET", lockKey) == ARGV[5] then
            rcall("DEL", lockKey)
        else
            return -2
        end
    end
    local jobId = ARGV[4]
    local score = tonumber(ARGV[3])
    local delayedTimestamp = (score / 0x1000)
    local numRemovedElements = rcall("LREM", KEYS[2], -1, jobId)
    if numRemovedElements < 1 then return -3 end
    if ARGV[7] == "0" then
        rcall("HINCRBY", jobKey, "atm", 1)
    end
    rcall("HSET", jobKey, "delay", ARGV[6])
    local maxEvents = getOrSetMaxEvents(metaKey)
    rcall("ZADD", delayedKey, score, jobId)
    rcall("XADD", KEYS[6], "MAXLEN", "~", maxEvents, "*", "event", "delayed",
          "jobId", jobId, "delay", delayedTimestamp)
    -- Check if we need to push a marker job to wake up sleeping workers.
    local isPaused = isQueuePaused(metaKey)
    if not isPaused then
        local markerKey = KEYS[1]
        addDelayMarkerIfNeeded(markerKey, delayedKey)
    end
    return 0
else
    return -1
end
`,W={name:"moveToDelayed",content:H,keys:7},q=`--[[
  Move job from active to a finished status (completed o failed)
  A job can only be moved to completed if it was active.
  The job must be locked before it can be moved to a finished status,
  and the lock must be released in this script.
    Input:
      KEYS[1] wait key
      KEYS[2] active key
      KEYS[3] prioritized key
      KEYS[4] event stream key
      KEYS[5] stalled key
      -- Rate limiting
      KEYS[6] rate limiter key
      KEYS[7] delayed key
      KEYS[8] paused key
      KEYS[9] meta key
      KEYS[10] pc priority counter
      KEYS[11] completed/failed key
      KEYS[12] jobId key
      KEYS[13] metrics key
      KEYS[14] marker key
      ARGV[1]  jobId
      ARGV[2]  timestamp
      ARGV[3]  msg property returnvalue / failedReason
      ARGV[4]  return value / failed reason
      ARGV[5]  target (completed/failed)
      ARGV[6]  fetch next?
      ARGV[7]  keys prefix
      ARGV[8]  opts
      opts - token - lock token
      opts - keepJobs
      opts - lockDuration - lock duration in milliseconds
      opts - attempts max attempts
      opts - maxMetricsSize
      opts - fpof - fail parent on fail
      opts - idof - ignore dependency on fail
      opts - rdof - remove dependency on fail
    Output:
      0 OK
      -1 Missing key.
      -2 Missing lock.
      -3 Job not in active set
      -4 Job has pending dependencies
      -6 Lock is not owned by this client
    Events:
      'completed/failed'
]]
local rcall = redis.call
--- Includes
--[[
  Functions to collect metrics based on a current and previous count of jobs.
  Granualarity is fixed at 1 minute.
]] 
--[[
  Function to loop in batches.
  Just a bit of warning, some commands as ZREM
  could receive a maximum of 7000 parameters per call.
]]
local function batches(n, batchSize)
  local i = 0
  return function()
    local from = i * batchSize + 1
    i = i + 1
    if (from <= n) then
      local to = math.min(from + batchSize - 1, n)
      return from, to
    end
  end
end
local function collectMetrics(metaKey, dataPointsList, maxDataPoints,
                                 timestamp)
    -- Increment current count
    local count = rcall("HINCRBY", metaKey, "count", 1) - 1
    -- Compute how many data points we need to add to the list, N.
    local prevTS = rcall("HGET", metaKey, "prevTS")
    if not prevTS then
        -- If prevTS is nil, set it to the current timestamp
        rcall("HSET", metaKey, "prevTS", timestamp, "prevCount", 0)
        return
    end
    local N = math.floor((timestamp - prevTS) / 60000)
    if N > 0 then
        local delta = count - rcall("HGET", metaKey, "prevCount")
        -- If N > 1, add N-1 zeros to the list
        if N > 1 then
            local points = {}
            points[1] = delta
            for i = 2, N do
                points[i] = 0
            end
            for from, to in batches(#points, 7000) do
                rcall("LPUSH", dataPointsList, unpack(points, from, to))
            end
        else
            -- LPUSH delta to the list
            rcall("LPUSH", dataPointsList, delta)
        end
        -- LTRIM to keep list to its max size
        rcall("LTRIM", dataPointsList, 0, maxDataPoints - 1)
        -- update prev count with current count
        rcall("HSET", metaKey, "prevCount", count, "prevTS", timestamp)
    end
end
--[[
  Function to return the next delayed job timestamp.
]]
local function getNextDelayedTimestamp(delayedKey)
  local result = rcall("ZRANGE", delayedKey, 0, 0, "WITHSCORES")
  if #result then
    local nextTimestamp = tonumber(result[2])
    if (nextTimestamp ~= nil) then 
      nextTimestamp = nextTimestamp / 0x1000
    end
    return nextTimestamp
  end
end
--[[
  Function to get current rate limit ttl.
]]
local function getRateLimitTTL(maxJobs, rateLimiterKey)
  if maxJobs and maxJobs <= tonumber(rcall("GET", rateLimiterKey) or 0) then
    local pttl = rcall("PTTL", rateLimiterKey)
    if pttl == 0 then
      rcall("DEL", rateLimiterKey)
    end
    if pttl > 0 then
      return pttl
    end
  end
  return 0
end
--[[
  Function to check for the meta.paused key to decide if we are paused or not
  (since an empty list and !EXISTS are not really the same).
]]
local function getTargetQueueList(queueMetaKey, waitKey, pausedKey)
  if rcall("HEXISTS", queueMetaKey, "paused") ~= 1 then
    return waitKey, false
  else
    return pausedKey, true
  end
end
--[[
  Function to move job from prioritized state to active.
]]
local function moveJobFromPriorityToActive(priorityKey, activeKey, priorityCounterKey)
  local prioritizedJob = rcall("ZPOPMIN", priorityKey)
  if #prioritizedJob > 0 then
    rcall("LPUSH", activeKey, prioritizedJob[1])
    return prioritizedJob[1]
  else
    rcall("DEL", priorityCounterKey)
  end
end
--[[
  Function to recursively move from waitingChildren to failed.
]]
-- Includes
--[[
  Validate and move parent to active if needed.
]]
-- Includes
--[[
  Add delay marker if needed.
]]
-- Includes
local function addDelayMarkerIfNeeded(markerKey, delayedKey)
    local nextTimestamp = getNextDelayedTimestamp(delayedKey)
    if nextTimestamp ~= nil then
        -- Replace the score of the marker with the newest known
        -- next timestamp.
        rcall("ZADD", markerKey, nextTimestamp, "1")
    end
end
--[[
  Function to add job in target list and add marker if needed.
]]
-- Includes
--[[
  Add marker if needed when a job is available.
]]
local function addBaseMarkerIfNeeded(markerKey, isPaused)
  if not isPaused then
    rcall("ZADD", markerKey, 0, "0")
  end  
end
local function addJobInTargetList(targetKey, markerKey, pushCmd, isPaused, jobId)
  rcall(pushCmd, targetKey, jobId)
  addBaseMarkerIfNeeded(markerKey, isPaused)
end
--[[
  Function to add job considering priority.
]]
-- Includes
local function addJobWithPriority(markerKey, prioritizedKey, priority, jobId, priorityCounterKey, isPaused)
  local prioCounter = rcall("INCR", priorityCounterKey)
  local score = priority * 0x100000000 + bit.band(prioCounter, 0xffffffffffff)
  rcall("ZADD", prioritizedKey, score, jobId)
  addBaseMarkerIfNeeded(markerKey, isPaused)
end
--[[
  Function to check for the meta.paused key to decide if we are paused or not
  (since an empty list and !EXISTS are not really the same).
]]
local function isQueuePaused(queueMetaKey)
    return rcall("HEXISTS", queueMetaKey, "paused") == 1
end
local function moveParentToWaitIfNeeded(parentQueueKey, parentDependenciesKey,
                                        parentKey, parentId, timestamp)
    local isParentActive = rcall("ZSCORE",
                                 parentQueueKey .. ":waiting-children", parentId)
    if rcall("SCARD", parentDependenciesKey) == 0 and isParentActive then
        rcall("ZREM", parentQueueKey .. ":waiting-children", parentId)
        local parentWaitKey = parentQueueKey .. ":wait"
        local parentPausedKey = parentQueueKey .. ":paused"
        local parentMetaKey = parentQueueKey .. ":meta"
        local parentMarkerKey = parentQueueKey .. ":marker"
        local jobAttributes = rcall("HMGET", parentKey, "priority", "delay")
        local priority = tonumber(jobAttributes[1]) or 0
        local delay = tonumber(jobAttributes[2]) or 0
        if delay > 0 then
            local delayedTimestamp = tonumber(timestamp) + delay
            local score = delayedTimestamp * 0x1000
            local parentDelayedKey = parentQueueKey .. ":delayed"
            rcall("ZADD", parentDelayedKey, score, parentId)
            rcall("XADD", parentQueueKey .. ":events", "*", "event", "delayed",
                  "jobId", parentId, "delay", delayedTimestamp)
            addDelayMarkerIfNeeded(parentMarkerKey, parentDelayedKey)
        else
            if priority == 0 then
                local parentTarget, isParentPaused =
                    getTargetQueueList(parentMetaKey, parentWaitKey,
                                       parentPausedKey)
                addJobInTargetList(parentTarget, parentMarkerKey, "RPUSH", isParentPaused, parentId)
            else
                local isPaused = isQueuePaused(parentMetaKey)
                addJobWithPriority(parentMarkerKey,
                                   parentQueueKey .. ":prioritized", priority,
                                   parentId, parentQueueKey .. ":pc", isPaused)
            end
            rcall("XADD", parentQueueKey .. ":events", "*", "event", "waiting",
                  "jobId", parentId, "prev", "waiting-children")
        end
    end
end
local function moveParentFromWaitingChildrenToFailed( parentQueueKey, parentKey, parentId, jobIdKey, timestamp)
  if rcall("ZREM", parentQueueKey .. ":waiting-children", parentId) == 1 then
    rcall("ZADD", parentQueueKey .. ":failed", timestamp, parentId)
    local failedReason = "child " .. jobIdKey .. " failed"
    rcall("HMSET", parentKey, "failedReason", failedReason, "finishedOn", timestamp)
    rcall("XADD", parentQueueKey .. ":events", "*", "event", "failed", "jobId", parentId, "failedReason",
      failedReason, "prev", "waiting-children")
    local rawParentData = rcall("HGET", parentKey, "parent")
    if rawParentData ~= false then
      local parentData = cjson.decode(rawParentData)
      if parentData['fpof'] then
        moveParentFromWaitingChildrenToFailed(
          parentData['queueKey'],
          parentData['queueKey'] .. ':' .. parentData['id'],
          parentData['id'],
          parentKey,
          timestamp
        )
      elseif parentData['rdof'] then
        local grandParentKey = parentData['queueKey'] .. ':' .. parentData['id']
        local grandParentDependenciesSet = grandParentKey .. ":dependencies"
        if rcall("SREM", grandParentDependenciesSet, parentKey) == 1 then
          moveParentToWaitIfNeeded(parentData['queueKey'], grandParentDependenciesSet,
            grandParentKey, parentData['id'], timestamp)
        end
      end
    end
  end
end
--[[
  Function to move job from wait state to active.
  Input:
    opts - token - lock token
    opts - lockDuration
    opts - limiter
]]
local function prepareJobForProcessing(keyPrefix, rateLimiterKey, eventStreamKey,
    jobId, processedOn, maxJobs, opts)
  local jobKey = keyPrefix .. jobId
  -- Check if we need to perform rate limiting.
  if maxJobs then
    local jobCounter = tonumber(rcall("INCR", rateLimiterKey))
    if jobCounter == 1 then
      local limiterDuration = opts['limiter'] and opts['limiter']['duration']
      local integerDuration = math.floor(math.abs(limiterDuration))
      rcall("PEXPIRE", rateLimiterKey, integerDuration)
    end
  end
  local lockKey = jobKey .. ':lock'
  -- get a lock
  if opts['token'] ~= "0" then
    rcall("SET", lockKey, opts['token'], "PX", opts['lockDuration'])
  end
  if opts['name'] then
    -- Set "processedBy" field to the worker name
    rcall("HSET", jobKey, "pb", opts['name'])
  end
  rcall("XADD", eventStreamKey, "*", "event", "active", "jobId", jobId, "prev", "waiting")
  rcall("HSET", jobKey, "processedOn", processedOn)
  rcall("HINCRBY", jobKey, "ats", 1)
  return {rcall("HGETALL", jobKey), jobId, 0, 0} -- get job data
end
--[[
  Updates the delay set, by moving delayed jobs that should
  be processed now to "wait".
     Events:
      'waiting'
]]
-- Includes
-- Try to get as much as 1000 jobs at once
local function promoteDelayedJobs(delayedKey, markerKey, targetKey, prioritizedKey,
                                  eventStreamKey, prefix, timestamp, priorityCounterKey, isPaused)
    local jobs = rcall("ZRANGEBYSCORE", delayedKey, 0, (timestamp + 1) * 0x1000, "LIMIT", 0, 1000)
    if (#jobs > 0) then
        rcall("ZREM", delayedKey, unpack(jobs))
        for _, jobId in ipairs(jobs) do
            local jobKey = prefix .. jobId
            local priority =
                tonumber(rcall("HGET", jobKey, "priority")) or 0
            if priority == 0 then
                -- LIFO or FIFO
                addJobInTargetList(targetKey, markerKey, "LPUSH", isPaused, jobId)
            else
                addJobWithPriority(markerKey, prioritizedKey, priority,
                  jobId, priorityCounterKey, isPaused)
            end
            -- Emit waiting event
            rcall("XADD", eventStreamKey, "*", "event", "waiting", "jobId",
                  jobId, "prev", "delayed")
            rcall("HSET", jobKey, "delay", 0)
        end
    end
end
--[[
  Function to remove job keys.
]]
local function removeJobKeys(jobKey)
  return rcall("DEL", jobKey, jobKey .. ':logs',
    jobKey .. ':dependencies', jobKey .. ':processed', jobKey .. ':failed')
end
--[[
  Functions to remove jobs by max age.
]]
-- Includes
--[[
  Function to remove job.
]]
-- Includes
--[[
  Check if this job has a parent. If so we will just remove it from
  the parent child list, but if it is the last child we should move the parent to "wait/paused"
  which requires code from "moveToFinished"
]]
-- Includes
--[[
  Functions to destructure job key.
  Just a bit of warning, these functions may be a bit slow and affect performance significantly.
]]
local getJobIdFromKey = function (jobKey)
  return string.match(jobKey, ".*:(.*)")
end
local getJobKeyPrefix = function (jobKey, jobId)
  return string.sub(jobKey, 0, #jobKey - #jobId)
end
local function moveParentToWait(parentPrefix, parentId, emitEvent)
  local parentTarget, isPaused = getTargetQueueList(parentPrefix .. "meta", parentPrefix .. "wait",
    parentPrefix .. "paused")
  addJobInTargetList(parentTarget, parentPrefix .. "marker", "RPUSH", isPaused, parentId)
  if emitEvent then
    local parentEventStream = parentPrefix .. "events"
    rcall("XADD", parentEventStream, "*", "event", "waiting", "jobId", parentId, "prev", "waiting-children")
  end
end
local function removeParentDependencyKey(jobKey, hard, parentKey, baseKey)
  if parentKey then
    local parentDependenciesKey = parentKey .. ":dependencies"
    local result = rcall("SREM", parentDependenciesKey, jobKey)
    if result > 0 then
      local pendingDependencies = rcall("SCARD", parentDependenciesKey)
      if pendingDependencies == 0 then
        local parentId = getJobIdFromKey(parentKey)
        local parentPrefix = getJobKeyPrefix(parentKey, parentId)
        local numRemovedElements = rcall("ZREM", parentPrefix .. "waiting-children", parentId)
        if numRemovedElements == 1 then
          if hard then -- remove parent in same queue
            if parentPrefix == baseKey then
              removeParentDependencyKey(parentKey, hard, nil, baseKey)
              removeJobKeys(parentKey)
            else
              moveParentToWait(parentPrefix, parentId)
            end
          else
            moveParentToWait(parentPrefix, parentId, true)
          end
        end
      end
      return true
    end
  else
    local missedParentKey = rcall("HGET", jobKey, "parentKey")
    if( (type(missedParentKey) == "string") and missedParentKey ~= ""
      and (rcall("EXISTS", missedParentKey) == 1)) then
      local parentDependenciesKey = missedParentKey .. ":dependencies"
      local result = rcall("SREM", parentDependenciesKey, jobKey)
      if result > 0 then
        local pendingDependencies = rcall("SCARD", parentDependenciesKey)
        if pendingDependencies == 0 then
          local parentId = getJobIdFromKey(missedParentKey)
          local parentPrefix = getJobKeyPrefix(missedParentKey, parentId)
          local numRemovedElements = rcall("ZREM", parentPrefix .. "waiting-children", parentId)
          if numRemovedElements == 1 then
            if hard then
              if parentPrefix == baseKey then
                removeParentDependencyKey(missedParentKey, hard, nil, baseKey)
                removeJobKeys(missedParentKey)
              else
                moveParentToWait(parentPrefix, parentId)
              end
            else
              moveParentToWait(parentPrefix, parentId, true)
            end
          end
        end
        return true
      end
    end
  end
  return false
end
local function removeJob(jobId, hard, baseKey)
  local jobKey = baseKey .. jobId
  removeParentDependencyKey(jobKey, hard, nil, baseKey)
  removeJobKeys(jobKey)
end
local function removeJobsByMaxAge(timestamp, maxAge, targetSet, prefix)
  local start = timestamp - maxAge * 1000
  local jobIds = rcall("ZREVRANGEBYSCORE", targetSet, start, "-inf")
  for i, jobId in ipairs(jobIds) do
    removeJob(jobId, false, prefix)
  end
  rcall("ZREMRANGEBYSCORE", targetSet, "-inf", start)
end
--[[
  Functions to remove jobs by max count.
]]
-- Includes
local function removeJobsByMaxCount(maxCount, targetSet, prefix)
  local start = maxCount
  local jobIds = rcall("ZREVRANGE", targetSet, start, -1)
  for i, jobId in ipairs(jobIds) do
    removeJob(jobId, false, prefix)
  end
  rcall("ZREMRANGEBYRANK", targetSet, 0, -(maxCount + 1))
end
--[[
  Function to trim events, default 10000.
]]
-- Includes
--[[
  Function to get max events value or set by default 10000.
]]
local function getOrSetMaxEvents(metaKey)
    local maxEvents = rcall("HGET", metaKey, "opts.maxLenEvents")
    if not maxEvents then
        maxEvents = 10000
        rcall("HSET", metaKey, "opts.maxLenEvents", maxEvents)
    end
    return maxEvents
end
local function trimEvents(metaKey, eventStreamKey)
  local maxEvents = getOrSetMaxEvents(metaKey)
  if maxEvents ~= false then
    rcall("XTRIM", eventStreamKey, "MAXLEN", "~", maxEvents)
  else
    rcall("XTRIM", eventStreamKey, "MAXLEN", "~", 10000)
  end
end
--[[
  Validate and move or add dependencies to parent.
]]
-- Includes
local function updateParentDepsIfNeeded(parentKey, parentQueueKey, parentDependenciesKey,
  parentId, jobIdKey, returnvalue, timestamp )
  local processedSet = parentKey .. ":processed"
  rcall("HSET", processedSet, jobIdKey, returnvalue)
  moveParentToWaitIfNeeded(parentQueueKey, parentDependenciesKey, parentKey, parentId, timestamp)
end
local jobIdKey = KEYS[12]
if rcall("EXISTS", jobIdKey) == 1 then -- // Make sure job exists
    local opts = cmsgpack.unpack(ARGV[8])
    local token = opts['token']
    local attempts = opts['attempts']
    local maxMetricsSize = opts['maxMetricsSize']
    local maxCount = opts['keepJobs']['count']
    local maxAge = opts['keepJobs']['age']
    if token ~= "0" then
        local lockKey = jobIdKey .. ':lock'
        local lockToken = rcall("GET", lockKey)
        if lockToken == token then
            rcall("DEL", lockKey)
            rcall("SREM", KEYS[5], ARGV[1])
        else
            if lockToken then
                -- Lock exists but token does not match
                return -6
            else
                -- Lock is missing completely
                return -2
            end
        end
    end
    if rcall("SCARD", jobIdKey .. ":dependencies") ~= 0 then -- // Make sure it does not have pending dependencies
        return -4
    end
    local parentReferences = rcall("HMGET", jobIdKey, "parentKey", "parent")
    local parentKey = parentReferences[1] or ""
    local parentId = ""
    local parentQueueKey = ""
    if parentReferences[2] ~= false then
        local jsonDecodedParent = cjson.decode(parentReferences[2])
        parentId = jsonDecodedParent['id']
        parentQueueKey = jsonDecodedParent['queueKey']
    end
    local jobId = ARGV[1]
    local timestamp = ARGV[2]
    -- Remove from active list (if not active we shall return error)
    local numRemovedElements = rcall("LREM", KEYS[2], -1, jobId)
    if (numRemovedElements < 1) then return -3 end
    local eventStreamKey = KEYS[4]
    local metaKey = KEYS[9]
    -- Trim events before emiting them to avoid trimming events emitted in this script
    trimEvents(metaKey, eventStreamKey)
    -- If job has a parent we need to
    -- 1) remove this job id from parents dependencies
    -- 2) move the job Id to parent "processed" set
    -- 3) push the results into parent "results" list
    -- 4) if parent's dependencies is empty, then move parent to "wait/paused". Note it may be a different queue!.
    if parentId == "" and parentKey ~= "" then
        parentId = getJobIdFromKey(parentKey)
        parentQueueKey = getJobKeyPrefix(parentKey, ":" .. parentId)
    end
    if parentId ~= "" then
        if ARGV[5] == "completed" then
            local dependenciesSet = parentKey .. ":dependencies"
            if rcall("SREM", dependenciesSet, jobIdKey) == 1 then
                updateParentDepsIfNeeded(parentKey, parentQueueKey,
                                         dependenciesSet, parentId, jobIdKey,
                                         ARGV[4], timestamp)
            end
        else
            if opts['fpof'] then
                moveParentFromWaitingChildrenToFailed(parentQueueKey, parentKey,
                                                      parentId, jobIdKey,
                                                      timestamp)
            elseif opts['idof'] or opts['rdof'] then
                local dependenciesSet = parentKey .. ":dependencies"
                if rcall("SREM", dependenciesSet, jobIdKey) == 1 then
                    moveParentToWaitIfNeeded(parentQueueKey, dependenciesSet,
                                             parentKey, parentId, timestamp)
                    if opts['idof'] then
                        local failedSet = parentKey .. ":failed"
                        rcall("HSET", failedSet, jobIdKey, ARGV[4])
                    end
                end
            end
        end
    end
    local attemptsMade = rcall("HINCRBY", jobIdKey, "atm", 1)
    -- Remove job?
    if maxCount ~= 0 then
        local targetSet = KEYS[11]
        -- Add to complete/failed set
        rcall("ZADD", targetSet, timestamp, jobId)
        rcall("HMSET", jobIdKey, ARGV[3], ARGV[4], "finishedOn", timestamp)
        -- "returnvalue" / "failedReason" and "finishedOn"
        -- Remove old jobs?
        local prefix = ARGV[7]
        if maxAge ~= nil then
            removeJobsByMaxAge(timestamp, maxAge, targetSet, prefix)
        end
        if maxCount ~= nil and maxCount > 0 then
            removeJobsByMaxCount(maxCount, targetSet, prefix)
        end
    else
        removeJobKeys(jobIdKey)
        if parentKey ~= "" then
            -- TODO: when a child is removed when finished, result or failure in parent
            -- must not be deleted, those value references should be deleted when the parent
            -- is deleted
            removeParentDependencyKey(jobIdKey, false, parentKey)
        end
    end
    rcall("XADD", eventStreamKey, "*", "event", ARGV[5], "jobId", jobId, ARGV[3],
          ARGV[4])
    if ARGV[5] == "failed" then
        if tonumber(attemptsMade) >= tonumber(attempts) then
            rcall("XADD", eventStreamKey, "*", "event", "retries-exhausted", "jobId",
                  jobId, "attemptsMade", attemptsMade)
        end
    end
    -- Collect metrics
    if maxMetricsSize ~= "" then
        collectMetrics(KEYS[13], KEYS[13] .. ':data', maxMetricsSize, timestamp)
    end
    -- Try to get next job to avoid an extra roundtrip if the queue is not closing,
    -- and not rate limited.
    if (ARGV[6] == "1") then
        local target, paused = getTargetQueueList(metaKey, KEYS[1], KEYS[8])
        -- Check if there are delayed jobs that can be promoted
        promoteDelayedJobs(KEYS[7], KEYS[14], target, KEYS[3], eventStreamKey, ARGV[7],
                           timestamp, KEYS[10], paused)
        local maxJobs = tonumber(opts['limiter'] and opts['limiter']['max'])
        -- Check if we are rate limited first.
        local expireTime = getRateLimitTTL(maxJobs, KEYS[6])
        if expireTime > 0 then return {0, 0, expireTime, 0} end
        -- paused queue
        if paused then return {0, 0, 0, 0} end
        jobId = rcall("RPOPLPUSH", KEYS[1], KEYS[2])
        if jobId then
            -- Markers in waitlist DEPRECATED in v5: Remove in v6.
            if string.sub(jobId, 1, 2) == "0:" then
                rcall("LREM", KEYS[2], 1, jobId)
                -- If jobId is special ID 0:delay (delay greater than 0), then there is no job to process
                -- but if ID is 0:0, then there is at least 1 prioritized job to process
                if jobId == "0:0" then
                    jobId = moveJobFromPriorityToActive(KEYS[3], KEYS[2],
                                                        KEYS[10])
                    return prepareJobForProcessing(ARGV[7], KEYS[6], eventStreamKey, jobId,
                                                   timestamp, maxJobs,
                                                   opts)
                end
            else
                return prepareJobForProcessing(ARGV[7], KEYS[6], eventStreamKey, jobId,
                                               timestamp, maxJobs,
                                               opts)
            end
        else
            jobId = moveJobFromPriorityToActive(KEYS[3], KEYS[2], KEYS[10])
            if jobId then
                return prepareJobForProcessing(ARGV[7], KEYS[6], eventStreamKey, jobId,
                                               timestamp, maxJobs,
                                               opts)
            end
        end
        -- Return the timestamp for the next delayed job if any.
        local nextTimestamp = getNextDelayedTimestamp(KEYS[7])
        if nextTimestamp ~= nil then
            -- The result is guaranteed to be positive, since the
            -- ZRANGEBYSCORE command would have return a job otherwise.
            return {0, 0, 0, nextTimestamp}
        end
    end
    local waitLen = rcall("LLEN", KEYS[1])
    if waitLen == 0 then
        local activeLen = rcall("LLEN", KEYS[2])
        if activeLen == 0 then
            local prioritizedLen = rcall("ZCARD", KEYS[3])
            if prioritizedLen == 0 then
                rcall("XADD", eventStreamKey, "*", "event", "drained")
            end
        end
    end
    return 0
else
    return -1
end
`,U={name:"moveToFinished",content:q,keys:14},Q=`--[[
  Moves job from active to waiting children set.
  Input:
    KEYS[1] lock key
    KEYS[2] active key
    KEYS[3] waitChildrenKey key
    KEYS[4] job key
    ARGV[1] token
    ARGV[2] child key
    ARGV[3] timestamp
    ARGV[4] the id of the job
  Output:
    0 - OK
    1 - There are not pending dependencies.
   -1 - Missing job.
   -2 - Missing lock
   -3 - Job not in active set
]]
local rcall = redis.call
local function moveToWaitingChildren (activeKey, waitingChildrenKey, jobId, timestamp,
    lockKey, jobKey, token)
  if token ~= "0" then
    if rcall("GET", lockKey) == token then
      rcall("DEL", lockKey)
    else
      return -2
    end
  end
  local score = tonumber(timestamp)
  local numRemovedElements = rcall("LREM", activeKey, -1, jobId)
  if(numRemovedElements < 1) then
    return -3
  end
  rcall("ZADD", waitingChildrenKey, score, jobId)
  return 0
end
if rcall("EXISTS", KEYS[4]) == 1 then
  if ARGV[2] ~= "" then
    if rcall("SISMEMBER", KEYS[4] .. ":dependencies", ARGV[2]) ~= 0 then
      return moveToWaitingChildren(KEYS[2], KEYS[3], ARGV[4], ARGV[3], KEYS[1], KEYS[4],
        ARGV[1])
    end
    return 1
  else
    if rcall("SCARD", KEYS[4] .. ":dependencies") ~= 0 then 
      return moveToWaitingChildren(KEYS[2], KEYS[3], ARGV[4], ARGV[3], KEYS[1], KEYS[4],
        ARGV[1])
    end
    return 1
  end
end
return -1
`,Z={name:"moveToWaitingChildren",content:Q,keys:4},X=`--[[
  Completely obliterates a queue and all of its contents
  Input:
    KEYS[1] meta
    KEYS[2] base
    ARGV[1] count
    ARGV[2] force
]]
-- This command completely destroys a queue including all of its jobs, current or past 
-- leaving no trace of its existence. Since this script needs to iterate to find all the job
-- keys, consider that this call may be slow for very large queues.
-- The queue needs to be "paused" or it will return an error
-- If the queue has currently active jobs then the script by default will return error,
-- however this behaviour can be overrided using the 'force' option.
local maxCount = tonumber(ARGV[1])
local baseKey = KEYS[2]
local rcall = redis.call
-- Includes
--[[
  Functions to remove jobs.
]]
-- Includes
--[[
  Function to remove job.
]]
-- Includes
--[[
  Function to remove job keys.
]]
local function removeJobKeys(jobKey)
  return rcall("DEL", jobKey, jobKey .. ':logs',
    jobKey .. ':dependencies', jobKey .. ':processed', jobKey .. ':failed')
end
--[[
  Check if this job has a parent. If so we will just remove it from
  the parent child list, but if it is the last child we should move the parent to "wait/paused"
  which requires code from "moveToFinished"
]]
-- Includes
--[[
  Function to add job in target list and add marker if needed.
]]
-- Includes
--[[
  Add marker if needed when a job is available.
]]
local function addBaseMarkerIfNeeded(markerKey, isPaused)
  if not isPaused then
    rcall("ZADD", markerKey, 0, "0")
  end  
end
local function addJobInTargetList(targetKey, markerKey, pushCmd, isPaused, jobId)
  rcall(pushCmd, targetKey, jobId)
  addBaseMarkerIfNeeded(markerKey, isPaused)
end
--[[
  Functions to destructure job key.
  Just a bit of warning, these functions may be a bit slow and affect performance significantly.
]]
local getJobIdFromKey = function (jobKey)
  return string.match(jobKey, ".*:(.*)")
end
local getJobKeyPrefix = function (jobKey, jobId)
  return string.sub(jobKey, 0, #jobKey - #jobId)
end
--[[
  Function to check for the meta.paused key to decide if we are paused or not
  (since an empty list and !EXISTS are not really the same).
]]
local function getTargetQueueList(queueMetaKey, waitKey, pausedKey)
  if rcall("HEXISTS", queueMetaKey, "paused") ~= 1 then
    return waitKey, false
  else
    return pausedKey, true
  end
end
local function moveParentToWait(parentPrefix, parentId, emitEvent)
  local parentTarget, isPaused = getTargetQueueList(parentPrefix .. "meta", parentPrefix .. "wait",
    parentPrefix .. "paused")
  addJobInTargetList(parentTarget, parentPrefix .. "marker", "RPUSH", isPaused, parentId)
  if emitEvent then
    local parentEventStream = parentPrefix .. "events"
    rcall("XADD", parentEventStream, "*", "event", "waiting", "jobId", parentId, "prev", "waiting-children")
  end
end
local function removeParentDependencyKey(jobKey, hard, parentKey, baseKey)
  if parentKey then
    local parentDependenciesKey = parentKey .. ":dependencies"
    local result = rcall("SREM", parentDependenciesKey, jobKey)
    if result > 0 then
      local pendingDependencies = rcall("SCARD", parentDependenciesKey)
      if pendingDependencies == 0 then
        local parentId = getJobIdFromKey(parentKey)
        local parentPrefix = getJobKeyPrefix(parentKey, parentId)
        local numRemovedElements = rcall("ZREM", parentPrefix .. "waiting-children", parentId)
        if numRemovedElements == 1 then
          if hard then -- remove parent in same queue
            if parentPrefix == baseKey then
              removeParentDependencyKey(parentKey, hard, nil, baseKey)
              removeJobKeys(parentKey)
            else
              moveParentToWait(parentPrefix, parentId)
            end
          else
            moveParentToWait(parentPrefix, parentId, true)
          end
        end
      end
      return true
    end
  else
    local missedParentKey = rcall("HGET", jobKey, "parentKey")
    if( (type(missedParentKey) == "string") and missedParentKey ~= ""
      and (rcall("EXISTS", missedParentKey) == 1)) then
      local parentDependenciesKey = missedParentKey .. ":dependencies"
      local result = rcall("SREM", parentDependenciesKey, jobKey)
      if result > 0 then
        local pendingDependencies = rcall("SCARD", parentDependenciesKey)
        if pendingDependencies == 0 then
          local parentId = getJobIdFromKey(missedParentKey)
          local parentPrefix = getJobKeyPrefix(missedParentKey, parentId)
          local numRemovedElements = rcall("ZREM", parentPrefix .. "waiting-children", parentId)
          if numRemovedElements == 1 then
            if hard then
              if parentPrefix == baseKey then
                removeParentDependencyKey(missedParentKey, hard, nil, baseKey)
                removeJobKeys(missedParentKey)
              else
                moveParentToWait(parentPrefix, parentId)
              end
            else
              moveParentToWait(parentPrefix, parentId, true)
            end
          end
        end
        return true
      end
    end
  end
  return false
end
local function removeJob(jobId, hard, baseKey)
  local jobKey = baseKey .. jobId
  removeParentDependencyKey(jobKey, hard, nil, baseKey)
  removeJobKeys(jobKey)
end
local function removeJobs(keys, hard, baseKey, max)
  for i, key in ipairs(keys) do
    removeJob(key, hard, baseKey)
  end
  return max - #keys
end
--[[
  Functions to remove jobs.
]]
-- Includes
local function getListItems(keyName, max)
  return rcall('LRANGE', keyName, 0, max - 1)
end
local function removeListJobs(keyName, hard, baseKey, max)
  local jobs = getListItems(keyName, max)
  local count = removeJobs(jobs, hard, baseKey, max)
  rcall("LTRIM", keyName, #jobs, -1)
  return count
end
-- Includes
--[[
  Function to loop in batches.
  Just a bit of warning, some commands as ZREM
  could receive a maximum of 7000 parameters per call.
]]
local function batches(n, batchSize)
  local i = 0
  return function()
    local from = i * batchSize + 1
    i = i + 1
    if (from <= n) then
      local to = math.min(from + batchSize - 1, n)
      return from, to
    end
  end
end
--[[
  Function to get ZSet items.
]]
local function getZSetItems(keyName, max)
  return rcall('ZRANGE', keyName, 0, max - 1)
end
local function removeZSetJobs(keyName, hard, baseKey, max)
  local jobs = getZSetItems(keyName, max)
  local count = removeJobs(jobs, hard, baseKey, max)
  if(#jobs > 0) then
    for from, to in batches(#jobs, 7000) do
      rcall("ZREM", keyName, unpack(jobs, from, to))
    end
  end
  return count
end
local function removeLockKeys(keys)
  for i, key in ipairs(keys) do
    rcall("DEL", baseKey .. key .. ':lock')
  end
end
-- 1) Check if paused, if not return with error.
if rcall("HEXISTS", KEYS[1], "paused") ~= 1 then
  return -1 -- Error, NotPaused
end
-- 2) Check if there are active jobs, if there are and not "force" return error.
local activeKey = baseKey .. 'active'
local activeJobs = getListItems(activeKey, maxCount)
if (#activeJobs > 0) then
  if(ARGV[2] == "") then 
    return -2 -- Error, ExistActiveJobs
  end
end
removeLockKeys(activeJobs)
maxCount = removeJobs(activeJobs, true, baseKey, maxCount)
rcall("LTRIM", activeKey, #activeJobs, -1)
if(maxCount <= 0) then
  return 1
end
local delayedKey = baseKey .. 'delayed'
maxCount = removeZSetJobs(delayedKey, true, baseKey, maxCount)
if(maxCount <= 0) then
  return 1
end
local completedKey = baseKey .. 'completed'
maxCount = removeZSetJobs(completedKey, true, baseKey, maxCount)
if(maxCount <= 0) then
  return 1
end
local waitKey = baseKey .. 'paused'
maxCount = removeListJobs(waitKey, true, baseKey, maxCount)
if(maxCount <= 0) then
  return 1
end
local prioritizedKey = baseKey .. 'prioritized'
maxCount = removeZSetJobs(prioritizedKey, true, baseKey, maxCount)
if(maxCount <= 0) then
  return 1
end
local failedKey = baseKey .. 'failed'
maxCount = removeZSetJobs(failedKey, true, baseKey, maxCount)
if(maxCount <= 0) then
  return 1
end
if(maxCount > 0) then
  rcall("DEL",
    baseKey .. 'events',
    baseKey .. 'delay', 
    baseKey .. 'stalled-check',
    baseKey .. 'stalled',
    baseKey .. 'id',
    baseKey .. 'pc',
    baseKey .. 'meta',
    baseKey .. 'repeat',
    baseKey .. 'metrics:completed',
    baseKey .. 'metrics:completed:data',
    baseKey .. 'metrics:failed',
    baseKey .. 'metrics:failed:data')
  return 0
else
  return 1
end
`,ee={name:"obliterate",content:X,keys:2},et=`--[[
    Paginate a set or hash
    Input:
      KEYS[1] key pointing to the set or hash to be paginated.
      ARGV[1]  page start offset
      ARGV[2]  page end offset (-1 for all the elements)
      ARGV[3]  cursor
      ARGV[4]  offset
      ARGV[5]  max iterations
      ARGV[6]  fetch jobs?
    Output:
      [cursor, offset, items, numItems]
]]
local rcall = redis.call
-- Includes
--[[
  Function to achieve pagination for a set or hash.
  This function simulates pagination in the most efficient way possible
  for a set using sscan or hscan.
  The main limitation is that sets are not order preserving, so the
  pagination is not stable. This means that if the set is modified
  between pages, the same element may appear in different pages.
]] -- Maximum number of elements to be returned by sscan per iteration.
local maxCount = 100
-- Finds the cursor, and returns the first elements available for the requested page.
local function findPage(key, command, pageStart, pageSize, cursor, offset,
                        maxIterations, fetchJobs)
    local items = {}
    local jobs = {}
    local iterations = 0
    repeat
        -- Iterate over the set using sscan/hscan.
        local result = rcall(command, key, cursor, "COUNT", maxCount)
        cursor = result[1]
        local members = result[2]
        local step = 1
        if command == "HSCAN" then
            step = 2
        end
        if #members == 0 then
            -- If the result is empty, we can return the result.
            return cursor, offset, items, jobs
        end
        local chunkStart = offset
        local chunkEnd = offset + #members / step
        local pageEnd = pageStart + pageSize
        if chunkEnd < pageStart then
            -- If the chunk is before the page, we can skip it.
            offset = chunkEnd
        elseif chunkStart > pageEnd then
            -- If the chunk is after the page, we can return the result.
            return cursor, offset, items, jobs
        else
            -- If the chunk is overlapping the page, we need to add the elements to the result.
            for i = 1, #members, step do
                if offset >= pageEnd then
                    return cursor, offset, items, jobs
                end
                if offset >= pageStart then
                    local index = #items + 1
                    if fetchJobs ~= nil then
                        jobs[#jobs+1] = rcall("HGETALL", members[i])
                    end
                    if step == 2 then
                        items[index] = {members[i], members[i + 1]}
                    else
                        items[index] = members[i]
                    end
                end
                offset = offset + 1
            end
        end
        iterations = iterations + 1
    until cursor == "0" or iterations >= maxIterations
    return cursor, offset, items, jobs
end
local key = KEYS[1]
local scanCommand = "SSCAN"
local countCommand = "SCARD"
local type = rcall("TYPE", key)["ok"]
if type == "none" then
    return {0, 0, {}, 0}
elseif type == "hash" then
    scanCommand = "HSCAN"
    countCommand = "HLEN"
elseif type ~= "set" then
    return
        redis.error_reply("Pagination is only supported for sets and hashes.")
end
local numItems = rcall(countCommand, key)
local startOffset = tonumber(ARGV[1])
local endOffset = tonumber(ARGV[2])
if endOffset == -1 then 
  endOffset = numItems
end
local pageSize = (endOffset - startOffset) + 1
local cursor, offset, items, jobs = findPage(key, scanCommand, startOffset,
                                       pageSize, ARGV[3], tonumber(ARGV[4]),
                                       tonumber(ARGV[5]), ARGV[6])
return {cursor, offset, items, numItems, jobs}
`,er={name:"paginate",content:et,keys:1},en=`--[[
  Pauses or resumes a queue globably.
  Input:
    KEYS[1] 'wait' or 'paused''
    KEYS[2] 'paused' or 'wait'
    KEYS[3] 'meta'
    KEYS[4] 'prioritized'
    KEYS[5] events stream key
    KEYS[6] 'delayed'
    KEYS|7] 'marker'
    ARGV[1] 'paused' or 'resumed'
  Event:
    publish paused or resumed event.
]]
local rcall = redis.call
-- Includes
--[[
  Add delay marker if needed.
]]
-- Includes
--[[
  Function to return the next delayed job timestamp.
]]
local function getNextDelayedTimestamp(delayedKey)
  local result = rcall("ZRANGE", delayedKey, 0, 0, "WITHSCORES")
  if #result then
    local nextTimestamp = tonumber(result[2])
    if (nextTimestamp ~= nil) then 
      nextTimestamp = nextTimestamp / 0x1000
    end
    return nextTimestamp
  end
end
local function addDelayMarkerIfNeeded(markerKey, delayedKey)
    local nextTimestamp = getNextDelayedTimestamp(delayedKey)
    if nextTimestamp ~= nil then
        -- Replace the score of the marker with the newest known
        -- next timestamp.
        rcall("ZADD", markerKey, nextTimestamp, "1")
    end
end
local markerKey = KEYS[7]
local hasJobs = rcall("EXISTS", KEYS[1]) == 1
--TODO: check this logic to be reused when changing a delay
if hasJobs then rcall("RENAME", KEYS[1], KEYS[2]) end
if ARGV[1] == "paused" then
    rcall("HSET", KEYS[3], "paused", 1)
    rcall("DEL", markerKey)
else
    rcall("HDEL", KEYS[3], "paused")
    if hasJobs or rcall("ZCARD", KEYS[4]) > 0 then
        -- Add marker if there are waiting or priority jobs
        rcall("ZADD", markerKey, 0, "0")
    else
        addDelayMarkerIfNeeded(markerKey, KEYS[6])
    end
end
rcall("XADD", KEYS[5], "*", "event", ARGV[1]);
`,ei={name:"pause",content:en,keys:7},es=`--[[
  Promotes a job that is currently "delayed" to the "waiting" state
    Input:
      KEYS[1] 'delayed'
      KEYS[2] 'wait'
      KEYS[3] 'paused'
      KEYS[4] 'meta'
      KEYS[5] 'prioritized'
      KEYS[6] 'pc' priority counter
      KEYS[7] 'event stream'
      KEYS[8] 'marker'
      ARGV[1]  queue.toKey('')
      ARGV[2]  jobId
    Output:
       0 - OK
      -3 - Job not in delayed zset.
    Events:
      'waiting'
]]
local rcall = redis.call
local jobId = ARGV[2]
-- Includes
--[[
  Function to add job in target list and add marker if needed.
]]
-- Includes
--[[
  Add marker if needed when a job is available.
]]
local function addBaseMarkerIfNeeded(markerKey, isPaused)
  if not isPaused then
    rcall("ZADD", markerKey, 0, "0")
  end  
end
local function addJobInTargetList(targetKey, markerKey, pushCmd, isPaused, jobId)
  rcall(pushCmd, targetKey, jobId)
  addBaseMarkerIfNeeded(markerKey, isPaused)
end
--[[
  Function to add job considering priority.
]]
-- Includes
local function addJobWithPriority(markerKey, prioritizedKey, priority, jobId, priorityCounterKey, isPaused)
  local prioCounter = rcall("INCR", priorityCounterKey)
  local score = priority * 0x100000000 + bit.band(prioCounter, 0xffffffffffff)
  rcall("ZADD", prioritizedKey, score, jobId)
  addBaseMarkerIfNeeded(markerKey, isPaused)
end
--[[
  Function to check for the meta.paused key to decide if we are paused or not
  (since an empty list and !EXISTS are not really the same).
]]
local function getTargetQueueList(queueMetaKey, waitKey, pausedKey)
  if rcall("HEXISTS", queueMetaKey, "paused") ~= 1 then
    return waitKey, false
  else
    return pausedKey, true
  end
end
if rcall("ZREM", KEYS[1], jobId) == 1 then
    local jobKey = ARGV[1] .. jobId
    local priority = tonumber(rcall("HGET", jobKey, "priority")) or 0
    local metaKey = KEYS[4]
    -- Remove delayed "marker" from the wait list if there is any.
    -- Since we are adding a job we do not need the marker anymore.
    -- Markers in waitlist DEPRECATED in v5: Remove in v6.
    local target, paused = getTargetQueueList(metaKey, KEYS[2], KEYS[3])
    local marker = rcall("LINDEX", target, 0)
    if marker and string.sub(marker, 1, 2) == "0:" then rcall("LPOP", target) end
    if priority == 0 then
        -- LIFO or FIFO
        addJobInTargetList(target, KEYS[8], "LPUSH", paused, jobId)
    else
        addJobWithPriority(KEYS[8], KEYS[5], priority, jobId, KEYS[6], paused)
    end
    -- Emit waiting event (wait..ing@token)
    rcall("XADD", KEYS[7], "*", "event", "waiting", "jobId", jobId, "prev",
          "delayed");
    rcall("HSET", jobKey, "delay", 0)
    return 0
else
    return -3
end
`,ea={name:"promote",content:es,keys:8},eo=`--[[
  Release lock
    Input:
      KEYS[1] 'lock',
      ARGV[1]  token
      ARGV[2]  lock duration in milliseconds
    Output:
      "OK" if lock extented succesfully.
]]
local rcall = redis.call
if rcall("GET", KEYS[1]) == ARGV[1] then
  return rcall("DEL", KEYS[1])
else
  return 0
end
`,el={name:"releaseLock",content:eo,keys:1},eu=`--[[
  Break parent-child dependency by removing
  child reference from parent
  Input:
    KEYS[1] 'key' prefix,
    ARGV[1] job key
    ARGV[2] parent key
    Output:
       0  - OK
       1  - There is not relationship.
      -1  - Missing job key
      -5  - Missing parent key
]]
local rcall = redis.call
local jobKey = ARGV[1]
local parentKey = ARGV[2]
-- Includes
--[[
  Check if this job has a parent. If so we will just remove it from
  the parent child list, but if it is the last child we should move the parent to "wait/paused"
  which requires code from "moveToFinished"
]]
-- Includes
--[[
  Function to add job in target list and add marker if needed.
]]
-- Includes
--[[
  Add marker if needed when a job is available.
]]
local function addBaseMarkerIfNeeded(markerKey, isPaused)
  if not isPaused then
    rcall("ZADD", markerKey, 0, "0")
  end  
end
local function addJobInTargetList(targetKey, markerKey, pushCmd, isPaused, jobId)
  rcall(pushCmd, targetKey, jobId)
  addBaseMarkerIfNeeded(markerKey, isPaused)
end
--[[
  Functions to destructure job key.
  Just a bit of warning, these functions may be a bit slow and affect performance significantly.
]]
local getJobIdFromKey = function (jobKey)
  return string.match(jobKey, ".*:(.*)")
end
local getJobKeyPrefix = function (jobKey, jobId)
  return string.sub(jobKey, 0, #jobKey - #jobId)
end
--[[
  Function to check for the meta.paused key to decide if we are paused or not
  (since an empty list and !EXISTS are not really the same).
]]
local function getTargetQueueList(queueMetaKey, waitKey, pausedKey)
  if rcall("HEXISTS", queueMetaKey, "paused") ~= 1 then
    return waitKey, false
  else
    return pausedKey, true
  end
end
--[[
  Function to remove job keys.
]]
local function removeJobKeys(jobKey)
  return rcall("DEL", jobKey, jobKey .. ':logs',
    jobKey .. ':dependencies', jobKey .. ':processed', jobKey .. ':failed')
end
local function moveParentToWait(parentPrefix, parentId, emitEvent)
  local parentTarget, isPaused = getTargetQueueList(parentPrefix .. "meta", parentPrefix .. "wait",
    parentPrefix .. "paused")
  addJobInTargetList(parentTarget, parentPrefix .. "marker", "RPUSH", isPaused, parentId)
  if emitEvent then
    local parentEventStream = parentPrefix .. "events"
    rcall("XADD", parentEventStream, "*", "event", "waiting", "jobId", parentId, "prev", "waiting-children")
  end
end
local function removeParentDependencyKey(jobKey, hard, parentKey, baseKey)
  if parentKey then
    local parentDependenciesKey = parentKey .. ":dependencies"
    local result = rcall("SREM", parentDependenciesKey, jobKey)
    if result > 0 then
      local pendingDependencies = rcall("SCARD", parentDependenciesKey)
      if pendingDependencies == 0 then
        local parentId = getJobIdFromKey(parentKey)
        local parentPrefix = getJobKeyPrefix(parentKey, parentId)
        local numRemovedElements = rcall("ZREM", parentPrefix .. "waiting-children", parentId)
        if numRemovedElements == 1 then
          if hard then -- remove parent in same queue
            if parentPrefix == baseKey then
              removeParentDependencyKey(parentKey, hard, nil, baseKey)
              removeJobKeys(parentKey)
            else
              moveParentToWait(parentPrefix, parentId)
            end
          else
            moveParentToWait(parentPrefix, parentId, true)
          end
        end
      end
      return true
    end
  else
    local missedParentKey = rcall("HGET", jobKey, "parentKey")
    if( (type(missedParentKey) == "string") and missedParentKey ~= ""
      and (rcall("EXISTS", missedParentKey) == 1)) then
      local parentDependenciesKey = missedParentKey .. ":dependencies"
      local result = rcall("SREM", parentDependenciesKey, jobKey)
      if result > 0 then
        local pendingDependencies = rcall("SCARD", parentDependenciesKey)
        if pendingDependencies == 0 then
          local parentId = getJobIdFromKey(missedParentKey)
          local parentPrefix = getJobKeyPrefix(missedParentKey, parentId)
          local numRemovedElements = rcall("ZREM", parentPrefix .. "waiting-children", parentId)
          if numRemovedElements == 1 then
            if hard then
              if parentPrefix == baseKey then
                removeParentDependencyKey(missedParentKey, hard, nil, baseKey)
                removeJobKeys(missedParentKey)
              else
                moveParentToWait(parentPrefix, parentId)
              end
            else
              moveParentToWait(parentPrefix, parentId, true)
            end
          end
        end
        return true
      end
    end
  end
  return false
end
if rcall("EXISTS", jobKey) ~= 1 then return -1 end
if rcall("EXISTS", parentKey) ~= 1 then return -5 end
if removeParentDependencyKey(jobKey, false, parentKey, KEYS[1]) then
  rcall("HDEL", jobKey, "parentKey", "parent")
  return 0
else
  return 1
end`,ec={name:"removeChildDependency",content:eu,keys:1},ed=`--[[
    Remove a job from all the queues it may be in as well as all its data.
    In order to be able to remove a job, it cannot be active.
    Input:
      KEYS[1] queue prefix
      ARGV[1] jobId
      ARGV[2] remove children
    Events:
      'removed'
]]
local rcall = redis.call
-- Includes
--[[
  Functions to destructure job key.
  Just a bit of warning, these functions may be a bit slow and affect performance significantly.
]]
local getJobIdFromKey = function (jobKey)
  return string.match(jobKey, ".*:(.*)")
end
local getJobKeyPrefix = function (jobKey, jobId)
  return string.sub(jobKey, 0, #jobKey - #jobId)
end
--[[
  Function to get max events value or set by default 10000.
]]
local function getOrSetMaxEvents(metaKey)
    local maxEvents = rcall("HGET", metaKey, "opts.maxLenEvents")
    if not maxEvents then
        maxEvents = 10000
        rcall("HSET", metaKey, "opts.maxLenEvents", maxEvents)
    end
    return maxEvents
end
--[[
  Function to recursively check if there are no locks
  on the jobs to be removed.
  returns:
    boolean
]]
local function isLocked( prefix, jobId, removeChildren)
  local jobKey = prefix .. jobId;
  -- Check if this job is locked
  local lockKey = jobKey .. ':lock'
  local lock = rcall("GET", lockKey)
  if not lock then
    if removeChildren == "1" then
      local dependencies = rcall("SMEMBERS", jobKey .. ":dependencies")
      if (#dependencies > 0) then
        for i, childJobKey in ipairs(dependencies) do
          -- We need to get the jobId for this job.
          local childJobId = getJobIdFromKey(childJobKey)
          local childJobPrefix = getJobKeyPrefix(childJobKey, childJobId)
          local result = isLocked( childJobPrefix, childJobId, removeChildren )
          if result then
            return true
          end
        end
      end
    end
    return false
  end
  return true
end
--[[
  Function to remove from any state.
  returns:
    prev state
]]
local function removeJobFromAnyState( prefix, jobId)
  -- We start with the ZSCORE checks, since they have O(1) complexity
  if rcall("ZSCORE", prefix .. "completed", jobId) then
    rcall("ZREM", prefix .. "completed", jobId)
    return "completed"
  elseif rcall("ZSCORE", prefix .. "waiting-children", jobId) then
    rcall("ZREM", prefix .. "waiting-children", jobId)
    return "waiting-children"
  elseif rcall("ZSCORE", prefix .. "delayed", jobId) then
    rcall("ZREM", prefix .. "delayed", jobId)
    return "delayed"
  elseif rcall("ZSCORE", prefix .. "failed", jobId) then
    rcall("ZREM", prefix .. "failed", jobId)
    return "failed"
  elseif rcall("ZSCORE", prefix .. "prioritized", jobId) then
    rcall("ZREM", prefix .. "prioritized", jobId)
    return "prioritized"
  -- We remove only 1 element from the list, since we assume they are not added multiple times
  elseif rcall("LREM", prefix .. "wait", 1, jobId) == 1 then
    return "wait"
  elseif rcall("LREM", prefix .. "paused", 1, jobId) == 1 then
    return "paused"
  elseif rcall("LREM", prefix .. "active", 1, jobId) == 1 then
    return "active"
  end
  return "unknown"
end
--[[
  Function to remove job keys.
]]
local function removeJobKeys(jobKey)
  return rcall("DEL", jobKey, jobKey .. ':logs',
    jobKey .. ':dependencies', jobKey .. ':processed', jobKey .. ':failed')
end
--[[
  Check if this job has a parent. If so we will just remove it from
  the parent child list, but if it is the last child we should move the parent to "wait/paused"
  which requires code from "moveToFinished"
]]
-- Includes
--[[
  Function to add job in target list and add marker if needed.
]]
-- Includes
--[[
  Add marker if needed when a job is available.
]]
local function addBaseMarkerIfNeeded(markerKey, isPaused)
  if not isPaused then
    rcall("ZADD", markerKey, 0, "0")
  end  
end
local function addJobInTargetList(targetKey, markerKey, pushCmd, isPaused, jobId)
  rcall(pushCmd, targetKey, jobId)
  addBaseMarkerIfNeeded(markerKey, isPaused)
end
--[[
  Function to check for the meta.paused key to decide if we are paused or not
  (since an empty list and !EXISTS are not really the same).
]]
local function getTargetQueueList(queueMetaKey, waitKey, pausedKey)
  if rcall("HEXISTS", queueMetaKey, "paused") ~= 1 then
    return waitKey, false
  else
    return pausedKey, true
  end
end
local function moveParentToWait(parentPrefix, parentId, emitEvent)
  local parentTarget, isPaused = getTargetQueueList(parentPrefix .. "meta", parentPrefix .. "wait",
    parentPrefix .. "paused")
  addJobInTargetList(parentTarget, parentPrefix .. "marker", "RPUSH", isPaused, parentId)
  if emitEvent then
    local parentEventStream = parentPrefix .. "events"
    rcall("XADD", parentEventStream, "*", "event", "waiting", "jobId", parentId, "prev", "waiting-children")
  end
end
local function removeParentDependencyKey(jobKey, hard, parentKey, baseKey)
  if parentKey then
    local parentDependenciesKey = parentKey .. ":dependencies"
    local result = rcall("SREM", parentDependenciesKey, jobKey)
    if result > 0 then
      local pendingDependencies = rcall("SCARD", parentDependenciesKey)
      if pendingDependencies == 0 then
        local parentId = getJobIdFromKey(parentKey)
        local parentPrefix = getJobKeyPrefix(parentKey, parentId)
        local numRemovedElements = rcall("ZREM", parentPrefix .. "waiting-children", parentId)
        if numRemovedElements == 1 then
          if hard then -- remove parent in same queue
            if parentPrefix == baseKey then
              removeParentDependencyKey(parentKey, hard, nil, baseKey)
              removeJobKeys(parentKey)
            else
              moveParentToWait(parentPrefix, parentId)
            end
          else
            moveParentToWait(parentPrefix, parentId, true)
          end
        end
      end
      return true
    end
  else
    local missedParentKey = rcall("HGET", jobKey, "parentKey")
    if( (type(missedParentKey) == "string") and missedParentKey ~= ""
      and (rcall("EXISTS", missedParentKey) == 1)) then
      local parentDependenciesKey = missedParentKey .. ":dependencies"
      local result = rcall("SREM", parentDependenciesKey, jobKey)
      if result > 0 then
        local pendingDependencies = rcall("SCARD", parentDependenciesKey)
        if pendingDependencies == 0 then
          local parentId = getJobIdFromKey(missedParentKey)
          local parentPrefix = getJobKeyPrefix(missedParentKey, parentId)
          local numRemovedElements = rcall("ZREM", parentPrefix .. "waiting-children", parentId)
          if numRemovedElements == 1 then
            if hard then
              if parentPrefix == baseKey then
                removeParentDependencyKey(missedParentKey, hard, nil, baseKey)
                removeJobKeys(missedParentKey)
              else
                moveParentToWait(parentPrefix, parentId)
              end
            else
              moveParentToWait(parentPrefix, parentId, true)
            end
          end
        end
        return true
      end
    end
  end
  return false
end
local function removeJob( prefix, jobId, parentKey, removeChildren)
    local jobKey = prefix .. jobId;
    removeParentDependencyKey(jobKey, false, parentKey)
    if removeChildren == "1" then
        -- Check if this job has children
        -- If so, we are going to try to remove the children recursively in deep first way because
        -- if some job is locked we must exit with and error.
        --local countProcessed = rcall("HLEN", jobKey .. ":processed")
        local processed = rcall("HGETALL", jobKey .. ":processed")
        if (#processed > 0) then
            for i = 1, #processed, 2 do
                local childJobId = getJobIdFromKey(processed[i])
                local childJobPrefix = getJobKeyPrefix(processed[i], childJobId)
                removeJob( childJobPrefix, childJobId, jobKey, removeChildren )
            end
        end
        local dependencies = rcall("SMEMBERS", jobKey .. ":dependencies")
        if (#dependencies > 0) then
            for i, childJobKey in ipairs(dependencies) do
                -- We need to get the jobId for this job.
                local childJobId = getJobIdFromKey(childJobKey)
                local childJobPrefix = getJobKeyPrefix(childJobKey, childJobId)
                removeJob( childJobPrefix, childJobId, jobKey, removeChildren )
            end
        end
        local failed = rcall("HGETALL", jobKey .. ":failed")
        if (#failed > 0) then
            for i = 1, #failed, 2 do
                local childJobId = getJobIdFromKey(failed[i])
                local childJobPrefix = getJobKeyPrefix(failed[i], childJobId)
                removeJob( childJobPrefix, childJobId, jobKey, removeChildren )
            end
        end
    end
    local prev = removeJobFromAnyState(prefix, jobId)
    if removeJobKeys(jobKey) > 0 then
        local maxEvents = getOrSetMaxEvents(prefix .. "meta")
        rcall("XADD", prefix .. "events", "MAXLEN", "~", maxEvents, "*", "event", "removed",
            "jobId", jobId, "prev", prev)
    end
end
local prefix = KEYS[1]
if not isLocked(prefix, ARGV[1], ARGV[2]) then
    removeJob(prefix, ARGV[1], nil, ARGV[2])
    return 1
end
return 0
`,eh={name:"removeJob",content:ed,keys:1},ep=`--[[
  Removes a repeatable job
  Input:
    KEYS[1] repeat jobs key
    KEYS[2] delayed jobs key
    ARGV[1] repeat job id
    ARGV[2] repeat job key
    ARGV[3] queue key
  Output:
    0 - OK
    1 - Missing repeat job
  Events:
    'removed'
]]
local rcall = redis.call
local millis = rcall("ZSCORE", KEYS[1], ARGV[2])
if(millis) then
  -- Delete next programmed job.
  local repeatJobId = ARGV[1] .. millis
  if(rcall("ZREM", KEYS[2], repeatJobId) == 1) then
    rcall("DEL", ARGV[3] .. repeatJobId)
    rcall("XADD", ARGV[3] .. "events", "*", "event", "removed", "jobId", repeatJobId, "prev", "delayed");
  end
end
if(rcall("ZREM", KEYS[1], ARGV[2]) == 1) then
  return 0
end
return 1
`,ef={name:"removeRepeatable",content:ep,keys:2},ey=`--[[
  Attempts to reprocess a job
  Input:
    KEYS[1] job key
    KEYS[2] events stream
    KEYS[3] job state
    KEYS[4] wait key
    KEYS[5] meta
    KEYS[6] paused key
    KEYS[7] marker key
    ARGV[1] job.id
    ARGV[2] (job.opts.lifo ? 'R' : 'L') + 'PUSH'
    ARGV[3] propVal - failedReason/returnvalue
    ARGV[4] prev state - failed/completed
  Output:
     1 means the operation was a success
    -1 means the job does not exist
    -3 means the job was not found in the expected set.
]]
local rcall = redis.call;
-- Includes
--[[
  Function to add job in target list and add marker if needed.
]]
-- Includes
--[[
  Add marker if needed when a job is available.
]]
local function addBaseMarkerIfNeeded(markerKey, isPaused)
  if not isPaused then
    rcall("ZADD", markerKey, 0, "0")
  end  
end
local function addJobInTargetList(targetKey, markerKey, pushCmd, isPaused, jobId)
  rcall(pushCmd, targetKey, jobId)
  addBaseMarkerIfNeeded(markerKey, isPaused)
end
--[[
  Function to get max events value or set by default 10000.
]]
local function getOrSetMaxEvents(metaKey)
    local maxEvents = rcall("HGET", metaKey, "opts.maxLenEvents")
    if not maxEvents then
        maxEvents = 10000
        rcall("HSET", metaKey, "opts.maxLenEvents", maxEvents)
    end
    return maxEvents
end
--[[
  Function to check for the meta.paused key to decide if we are paused or not
  (since an empty list and !EXISTS are not really the same).
]]
local function getTargetQueueList(queueMetaKey, waitKey, pausedKey)
  if rcall("HEXISTS", queueMetaKey, "paused") ~= 1 then
    return waitKey, false
  else
    return pausedKey, true
  end
end
if rcall("EXISTS", KEYS[1]) == 1 then
  local jobId = ARGV[1]
  if (rcall("ZREM", KEYS[3], jobId) == 1) then
    rcall("HDEL", KEYS[1], "finishedOn", "processedOn", ARGV[3])
    local target, isPaused = getTargetQueueList(KEYS[5], KEYS[4], KEYS[6])
    addJobInTargetList(target, KEYS[7], ARGV[2], isPaused, jobId)
    local maxEvents = getOrSetMaxEvents(KEYS[5])
    -- Emit waiting event
    rcall("XADD", KEYS[2], "MAXLEN", "~", maxEvents, "*", "event", "waiting",
      "jobId", jobId, "prev", ARGV[4]);
    return 1
  else
    return -3
  end
else
  return -1
end
`,em={name:"reprocessJob",content:ey,keys:7},eg=`--[[
  Retries a failed job by moving it back to the wait queue.
    Input:
      KEYS[1]  'active',
      KEYS[2]  'wait'
      KEYS[3]  'paused'
      KEYS[4]  job key
      KEYS[5]  'meta'
      KEYS[6]  events stream
      KEYS[7]  delayed key
      KEYS[8]  prioritized key
      KEYS[9]  'pc' priority counter
      KEYS[10] 'marker'
      ARGV[1]  key prefix
      ARGV[2]  timestamp
      ARGV[3]  pushCmd
      ARGV[4]  jobId
      ARGV[5]  token
    Events:
      'waiting'
    Output:
     0  - OK
     -1 - Missing key
     -2 - Missing lock
]]
local rcall = redis.call
-- Includes
--[[
  Function to add job considering priority.
]]
-- Includes
--[[
  Add marker if needed when a job is available.
]]
local function addBaseMarkerIfNeeded(markerKey, isPaused)
  if not isPaused then
    rcall("ZADD", markerKey, 0, "0")
  end  
end
local function addJobWithPriority(markerKey, prioritizedKey, priority, jobId, priorityCounterKey, isPaused)
  local prioCounter = rcall("INCR", priorityCounterKey)
  local score = priority * 0x100000000 + bit.band(prioCounter, 0xffffffffffff)
  rcall("ZADD", prioritizedKey, score, jobId)
  addBaseMarkerIfNeeded(markerKey, isPaused)
end
--[[
  Function to get max events value or set by default 10000.
]]
local function getOrSetMaxEvents(metaKey)
    local maxEvents = rcall("HGET", metaKey, "opts.maxLenEvents")
    if not maxEvents then
        maxEvents = 10000
        rcall("HSET", metaKey, "opts.maxLenEvents", maxEvents)
    end
    return maxEvents
end
--[[
  Function to check for the meta.paused key to decide if we are paused or not
  (since an empty list and !EXISTS are not really the same).
]]
local function getTargetQueueList(queueMetaKey, waitKey, pausedKey)
  if rcall("HEXISTS", queueMetaKey, "paused") ~= 1 then
    return waitKey, false
  else
    return pausedKey, true
  end
end
--[[
  Updates the delay set, by moving delayed jobs that should
  be processed now to "wait".
     Events:
      'waiting'
]]
-- Includes
--[[
  Function to add job in target list and add marker if needed.
]]
-- Includes
local function addJobInTargetList(targetKey, markerKey, pushCmd, isPaused, jobId)
  rcall(pushCmd, targetKey, jobId)
  addBaseMarkerIfNeeded(markerKey, isPaused)
end
-- Try to get as much as 1000 jobs at once
local function promoteDelayedJobs(delayedKey, markerKey, targetKey, prioritizedKey,
                                  eventStreamKey, prefix, timestamp, priorityCounterKey, isPaused)
    local jobs = rcall("ZRANGEBYSCORE", delayedKey, 0, (timestamp + 1) * 0x1000, "LIMIT", 0, 1000)
    if (#jobs > 0) then
        rcall("ZREM", delayedKey, unpack(jobs))
        for _, jobId in ipairs(jobs) do
            local jobKey = prefix .. jobId
            local priority =
                tonumber(rcall("HGET", jobKey, "priority")) or 0
            if priority == 0 then
                -- LIFO or FIFO
                addJobInTargetList(targetKey, markerKey, "LPUSH", isPaused, jobId)
            else
                addJobWithPriority(markerKey, prioritizedKey, priority,
                  jobId, priorityCounterKey, isPaused)
            end
            -- Emit waiting event
            rcall("XADD", eventStreamKey, "*", "event", "waiting", "jobId",
                  jobId, "prev", "delayed")
            rcall("HSET", jobKey, "delay", 0)
        end
    end
end
local target, paused = getTargetQueueList(KEYS[5], KEYS[2], KEYS[3])
local markerKey = KEYS[10]
-- Check if there are delayed jobs that we can move to wait.
-- test example: when there are delayed jobs between retries
promoteDelayedJobs(KEYS[7], markerKey, target, KEYS[8], KEYS[6], ARGV[1], ARGV[2], KEYS[9], paused)
if rcall("EXISTS", KEYS[4]) == 1 then
  if ARGV[5] ~= "0" then
    local lockKey = KEYS[4] .. ':lock'
    if rcall("GET", lockKey) == ARGV[5] then
      rcall("DEL", lockKey)
    else
      return -2
    end
  end
  rcall("LREM", KEYS[1], 0, ARGV[4])
  local priority = tonumber(rcall("HGET", KEYS[4], "priority")) or 0
  -- Standard or priority add
  if priority == 0 then
    rcall(ARGV[3], target, ARGV[4])
    -- TODO: check if we need to add marker in this case too
  else
    addJobWithPriority(markerKey, KEYS[8], priority, ARGV[4], KEYS[9], paused)
  end
  rcall("HINCRBY", KEYS[4], "atm", 1)
  local maxEvents = getOrSetMaxEvents(KEYS[5])
  -- Emit waiting event
  rcall("XADD", KEYS[6], "MAXLEN", "~", maxEvents, "*", "event", "waiting",
    "jobId", ARGV[4], "prev", "failed")
  return 0
else
  return -1
end
`,eb={name:"retryJob",content:eg,keys:10},eS=`--[[
  Save stacktrace and failedReason.
  Input:
    KEYS[1] job key
    ARGV[1]  stacktrace
    ARGV[2]  failedReason
  Output:
     0 - OK
    -1 - Missing key
]]
local rcall = redis.call
if rcall("EXISTS", KEYS[1]) == 1 then
  rcall("HMSET", KEYS[1], "stacktrace", ARGV[1], "failedReason", ARGV[2])
  return 0
else
  return -1
end
`,ev={name:"saveStacktrace",content:eS,keys:1},eE=`--[[
  Update job data
  Input:
    KEYS[1] Job id key
    ARGV[1] data
  Output:
    0 - OK
   -1 - Missing job.
]]
local rcall = redis.call
if rcall("EXISTS",KEYS[1]) == 1 then -- // Make sure job exists
  rcall("HSET", KEYS[1], "data", ARGV[1])
  return 0
else
  return -1
end
`,ek={name:"updateData",content:eE,keys:1},eK=`--[[
  Update job progress
  Input:
    KEYS[1] Job id key
    KEYS[2] event stream key
    KEYS[3] meta key
    ARGV[1] id
    ARGV[2] progress
  Output:
     0 - OK
    -1 - Missing job.
  Event:
    progress(jobId, progress)
]]
local rcall = redis.call
-- Includes
--[[
  Function to get max events value or set by default 10000.
]]
local function getOrSetMaxEvents(metaKey)
    local maxEvents = rcall("HGET", metaKey, "opts.maxLenEvents")
    if not maxEvents then
        maxEvents = 10000
        rcall("HSET", metaKey, "opts.maxLenEvents", maxEvents)
    end
    return maxEvents
end
if rcall("EXISTS", KEYS[1]) == 1 then -- // Make sure job exists
    local maxEvents = getOrSetMaxEvents(KEYS[3])
    rcall("HSET", KEYS[1], "progress", ARGV[2])
    rcall("XADD", KEYS[2], "MAXLEN", "~", maxEvents, "*", "event", "progress",
          "jobId", ARGV[1], "data", ARGV[2]);
    return 0
else
    return -1
end
`,ew={name:"updateProgress",content:eK,keys:3};class eI extends i.EventEmitter{constructor(e,t=!1,r=!0,n=!1){if(super(),this.shared=t,this.blocking=r,this.capabilities={canDoubleTimeout:!1},this.status="initializing",(0,l.Y1)(e)){if(this._client=e,this._client.options.keyPrefix)throw Error("BullMQ: ioredis does not support ioredis prefixes, use the prefix option instead.");(0,l.OV)(this._client)?this.opts=this._client.options.redisOptions:this.opts=this._client.options,this.checkBlockingOptions("BullMQ: Your redis options maxRetriesPerRequest must be null.",this.opts,!0)}else this.checkBlockingOptions("BullMQ: WARNING! Your redis options maxRetriesPerRequest must be null and will be overridden by BullMQ.",e),this.opts=Object.assign({port:6379,host:"127.0.0.1",retryStrategy:function(e){return Math.max(Math.min(Math.exp(e),2e4),1e3)}},e),this.blocking&&(this.opts.maxRetriesPerRequest=null);this.skipVersionCheck=n||!!(this.opts&&this.opts.skipVersionCheck),this.handleClientError=e=>{this.emit("error",e)},this.handleClientClose=()=>{this.emit("close")},this.handleClientReady=()=>{this.emit("ready")},this.initializing=this.init(),this.initializing.catch(e=>this.emit("error",e))}checkBlockingOptions(e,t,r=!1){if(this.blocking&&t&&t.maxRetriesPerRequest){if(r)throw Error(e);console.error(e)}}static async waitUntilReady(e){let t,r,n;if("ready"!==e.status){if("wait"===e.status)return e.connect();if("end"===e.status)throw Error(o.CONNECTION_CLOSED_ERROR_MSG);try{await new Promise((i,s)=>{let a;n=e=>{a=e},t=()=>{i()},r=()=>{s(a||Error(o.CONNECTION_CLOSED_ERROR_MSG))},(0,l.xP)(e,3),e.once("ready",t),e.on("end",r),e.once("error",n)})}finally{e.removeListener("end",r),e.removeListener("error",n),e.removeListener("ready",t),(0,l.LG)(e,3)}}}get client(){return this.initializing}loadCommands(e){let t=e||n;for(let e in t)this._client[t[e].name]||this._client.defineCommand(t[e].name,{numberOfKeys:t[e].keys,lua:t[e].content})}async init(){if(this._client||(this._client=new(a())(this.opts)),(0,l.xP)(this._client,3),this._client.on("error",this.handleClientError),this._client.on("close",this.handleClientClose),this._client.on("ready",this.handleClientReady),await eI.waitUntilReady(this._client),this.loadCommands(),this.version=await this.getRedisVersion(),!0!==this.skipVersionCheck&&!this.closing){if((0,l.J3)(this.version,eI.minimumVersion))throw Error(`Redis version needs to be greater or equal than ${eI.minimumVersion} Current: ${this.version}`);(0,l.J3)(this.version,eI.recommendedMinimumVersion)&&console.warn(`It is highly recommended to use a minimum Redis version of ${eI.recommendedMinimumVersion}
           Current: ${this.version}`)}return this.capabilities={canDoubleTimeout:!(0,l.J3)(this.version,"6.0.0")},this.status="ready",this._client}async disconnect(e=!0){let t=await this.client;if("end"!==t.status){let r,n;if(!e)return t.disconnect();let i=new Promise((e,i)=>{(0,l.xP)(t,2),t.once("end",e),t.once("error",i),r=e,n=i});t.disconnect();try{await i}finally{(0,l.LG)(t,2),t.removeListener("end",r),t.removeListener("error",n)}}}async reconnect(){let e=await this.client;return e.connect()}async close(){if(!this.closing){let e=this.status;this.status="closing",this.closing=!0;try{"ready"===e&&await this.initializing,this.shared||("initializing"==e?this._client.disconnect():await this._client.quit(),this._client.status="end")}catch(e){if((0,l.Zm)(e))throw e}finally{this._client.off("error",this.handleClientError),this._client.off("close",this.handleClientClose),this._client.off("ready",this.handleClientReady),(0,l.LG)(this._client,3),this.removeAllListeners(),this.status="closed"}}}async getRedisVersion(){let e;let t=await this._client.info(),r="redis_version:",n="maxmemory_policy:",i=t.split("\r\n");for(let t=0;t<i.length;t++){if(0===i[t].indexOf(n)){let e=i[t].substr(n.length);"noeviction"!==e&&console.warn(`IMPORTANT! Eviction policy is ${e}. It should be "noeviction"`)}0===i[t].indexOf(r)&&(e=i[t].substr(r.length))}return e}get redisVersion(){return this.version}}eI.minimumVersion="5.0.0",eI.recommendedMinimumVersion="6.2.0"},51306:(e,t,r)=>{r.d(t,{w:()=>o});var n=r(87175),i=r(95347),s=r(6113),a=r(61743);class o extends a.W{constructor(e,t,r){super(e,t,r),this.repeatStrategy=t.settings&&t.settings.repeatStrategy||u,this.repeatKeyHashAlgorithm=t.settings&&t.settings.repeatKeyHashAlgorithm||"md5"}async addNextRepeatableJob(e,t,r,i){var s;let a=Object.assign({},r.repeat);null!==(s=a.pattern)&&void 0!==s||(a.pattern=a.cron),delete a.cron;let o=r.prevMillis||0,u=a.count?a.count+1:1;if(void 0!==a.limit&&u>a.limit)return;let c=Date.now();if(a.endDate,c>new Date(a.endDate).getTime())return;c=o<c?c:o;let d=await this.repeatStrategy(c,a,e),h=a.pattern,p=!!((a.every||h)&&a.immediately),f=p?c-d:void 0;if(d){!o&&r.jobId&&(a.jobId=r.jobId);let s=l(e,a),c=!0;if(!i){let e=await this.client;c=!!await e.zscore(this.keys.repeat,s)}let{immediately:h}=a,y=(0,n._T)(a,["immediately"]);if(c)return this.createNextJob(e,d,s,Object.assign(Object.assign({},r),{repeat:Object.assign({offset:f},y)}),t,u,p)}}async createNextJob(e,t,r,n,i,s,a){let o=await this.client,l=this.getRepeatJobId({name:e,nextMillis:t,namespace:this.hash(r),jobId:n.repeat.jobId,key:n.repeat.key}),u=Date.now(),c=t+(n.repeat.offset?n.repeat.offset:0)-u,d=Object.assign(Object.assign({},n),{jobId:l,delay:c<0||a?0:c,timestamp:u,prevMillis:t,repeatJobKey:r});return d.repeat=Object.assign(Object.assign({},n.repeat),{count:s}),await o.zadd(this.keys.repeat,t.toString(),r),this.Job.create(this,e,i,d)}async removeRepeatable(e,t,r){let n=l(e,Object.assign(Object.assign({},t),{jobId:r})),i=this.getRepeatJobId({name:e,nextMillis:"",namespace:this.hash(n),jobId:null!=r?r:t.jobId,key:t.key});return this.scripts.removeRepeatable(i,n)}async removeRepeatableByKey(e){let t=this.keyToData(e),r=this.getRepeatJobId({name:t.name,nextMillis:"",namespace:this.hash(e),jobId:t.id});return this.scripts.removeRepeatable(r,e)}keyToData(e,t){let r=e.split(":"),n=r.slice(4).join(":")||null;return{key:e,name:r[0],id:r[1]||null,endDate:parseInt(r[2])||null,tz:r[3]||null,pattern:n,next:t}}async getRepeatableJobs(e=0,t=-1,r=!1){let n=await this.client,i=this.keys.repeat,s=r?await n.zrange(i,e,t,"WITHSCORES"):await n.zrevrange(i,e,t,"WITHSCORES"),a=[];for(let e=0;e<s.length;e+=2)a.push(this.keyToData(s[e],parseInt(s[e+1])));return a}async getRepeatableCount(){let e=await this.client;return e.zcard(this.toKey("repeat"))}hash(e){return(0,s.createHash)(this.repeatKeyHashAlgorithm).update(e).digest("hex")}getRepeatJobId({name:e,nextMillis:t,namespace:r,jobId:n,key:i}){let s=null!=i?i:this.hash(`${e}${n||""}${r}`);return`repeat:${s}:${t}`}}function l(e,t){let r=t.endDate?new Date(t.endDate).getTime():"",n=t.tz||"",i=t.pattern,s=i||String(t.every)||"",a=t.jobId?t.jobId:"";return`${e}:${a}:${r}:${n}:${s}`}let u=(e,t)=>{let r=t.pattern;if(r&&t.every)throw Error("Both .pattern and .every options are defined for this repeatable job");if(t.every)return Math.floor(e/t.every)*t.every+(t.immediately?0:t.every);let n=new Date(t.startDate&&new Date(t.startDate)>new Date(e)?t.startDate:e),s=(0,i.parseExpression)(r,Object.assign(Object.assign({},t),{currentDate:n}));try{return s.next().getTime()}catch(e){}}},22968:(e,t,r)=>{r.d(t,{Z:()=>i});var n=r(70344);let i=(e,t)=>async function(r,i){let s,a;let o=await t.retain(e);await o.send({cmd:n.uv.Start,job:r.asJSONSandbox(),token:i});let l=new Promise((e,t)=>{s=async i=>{var s,a;switch(i.cmd){case n.d$.Completed:e(i.value);break;case n.d$.Failed:case n.d$.Error:{let e=Error();Object.assign(e,i.value),t(e);break}case n.d$.Progress:await r.updateProgress(i.value);break;case n.d$.Log:await r.log(i.value);break;case n.d$.MoveToDelayed:await r.moveToDelayed(null===(s=i.value)||void 0===s?void 0:s.timestamp,null===(a=i.value)||void 0===a?void 0:a.token);break;case n.d$.Update:await r.updateData(i.value)}},a=(e,r)=>{t(Error("Unexpected exit code: "+e+" signal: "+r))},o.on("message",s),o.on("exit",a)});try{return await l,l}finally{o.off("message",s),o.off("exit",a),null!==o.exitCode||/SIG.*/.test(`${o.signalCode}`)?t.remove(o):t.release(o)}}},34676:(e,t,r)=>{let n,i,s,a,o,l,u,c,d,h,p,f;r.d(t,{K:()=>e0});try{y=new TextDecoder}catch(e){}var y,m,g,b,S,v,E,k,K,w,I,x=0;let A=[];var T=A,j=0,R={},_=0,C=0,O=[],P={useRecords:!1,mapsAsObjects:!0};class D{}let M=new D;M.name="MessagePack 0xC1";var N=!1,L=2;try{Function("")}catch(e){L=1/0}class F{constructor(e){e&&(!1===e.useRecords&&void 0===e.mapsAsObjects&&(e.mapsAsObjects=!0),!e.sequential||!1===e.trusted||(e.trusted=!0,e.structures||!1==e.useRecords||(e.structures=[],e.maxSharedStructures||(e.maxSharedStructures=0))),e.structures?e.structures.sharedLength=e.structures.length:e.getStructures&&((e.structures=[]).uninitialized=!0,e.structures.sharedLength=0),e.int64AsNumber&&(e.int64AsType="number")),Object.assign(this,e)}unpack(e,t){if(m)return ef(()=>(ey(),this?this.unpack(e,t):F.prototype.unpack.call(P,e,t)));e.buffer||e.constructor!==ArrayBuffer||(e="undefined"!=typeof Buffer?Buffer.from(e):new Uint8Array(e)),"object"==typeof t?(g=t.end||e.length,x=t.start||0):(x=0,g=t>-1?t:e.length),j=0,C=0,S=null,T=A,v=null,m=e;try{k=e.dataView||(e.dataView=new DataView(e.buffer,e.byteOffset,e.byteLength))}catch(t){if(m=null,e instanceof Uint8Array)throw t;throw Error("Source must be a Uint8Array or Buffer but was a "+(e&&"object"==typeof e?e.constructor.name:typeof e))}return this instanceof F?(R=this,this.structures?b=this.structures:(!b||b.length>0)&&(b=[])):(R=P,(!b||b.length>0)&&(b=[])),V(t)}unpackMultiple(e,t){let r,n=0;try{N=!0;let i=e.length,s=this?this.unpack(e,i):eg.unpack(e,i);if(t){if(!1===t(s,n,x))return;for(;x<i;)if(n=x,!1===t(V(),n,x))return}else{for(r=[s];x<i;)n=x,r.push(V());return r}}catch(e){throw e.lastPosition=n,e.values=r,e}finally{N=!1,ey()}}_mergeStructures(e,t){w&&(e=w.call(this,e)),Object.isFrozen(e=e||[])&&(e=e.map(e=>e.slice(0)));for(let t=0,r=e.length;t<r;t++){let r=e[t];r&&(r.isShared=!0,t>=32&&(r.highByte=t-32>>5))}for(let r in e.sharedLength=e.length,t||[])if(r>=0){let n=e[r],i=t[r];i&&(n&&((e.restoreStructures||(e.restoreStructures=[]))[r]=n),e[r]=i)}return this.structures=e}decode(e,t){return this.unpack(e,t)}}function V(e){try{let t;if(!R.trusted&&!N){let e=b.sharedLength||0;e<b.length&&(b.length=e)}if(R.randomAccessStructure&&m[x]<64&&m[x]>=32&&K?(t=K(m,x,g,R),m=null,!(e&&e.lazy)&&t&&(t=t.toJSON()),x=g):t=G(),v&&(x=v.postBundlePosition,v=null),N&&(b.restoreStructures=null),x==g)b&&b.restoreStructures&&J(),b=null,m=null,E&&(E=null);else if(x>g)throw Error("Unexpected end of MessagePack data");else if(!N){let e;try{e=JSON.stringify(t,(e,t)=>"bigint"==typeof t?`${t}n`:t).slice(0,100)}catch(t){e="(JSON view not available "+t+")"}throw Error("Data read, but end of buffer not reached "+e)}return t}catch(e){throw b&&b.restoreStructures&&J(),ey(),(e instanceof RangeError||e.message.startsWith("Unexpected end of buffer")||x>g)&&(e.incomplete=!0),e}}function J(){for(let e in b.restoreStructures)b[e]=b.restoreStructures[e];b.restoreStructures=null}function G(){let e=m[x++];if(e<160){if(e<128){if(e<64)return e;{let t=b[63&e]||R.getStructures&&z()[63&e];return t?(t.read||(t.read=Y(t,63&e)),t.read()):e}}if(e<144){if(e-=128,R.mapsAsObjects){let t={};for(let r=0;r<e;r++){let e=eo();"__proto__"===e&&(e="__proto_"),t[e]=G()}return t}{let t=new Map;for(let r=0;r<e;r++)t.set(G(),G());return t}}{let t=Array(e-=144);for(let r=0;r<e;r++)t[r]=G();return R.freezeData?Object.freeze(t):t}}if(e<192){let t=e-160;if(C>=x)return S.slice(x-_,(x+=t)-_);if(0==C&&g<140){let e=t<16?er(t):et(t);if(null!=e)return e}return H(t)}{let t;switch(e){case 192:return null;case 193:if(v){if((t=G())>0)return v[1].slice(v.position1,v.position1+=t);return v[0].slice(v.position0,v.position0-=t)}return M;case 194:return!1;case 195:return!0;case 196:if(void 0===(t=m[x++]))throw Error("Unexpected end of buffer");return ei(t);case 197:return t=k.getUint16(x),x+=2,ei(t);case 198:return t=k.getUint32(x),x+=4,ei(t);case 199:return es(m[x++]);case 200:return t=k.getUint16(x),x+=2,es(t);case 201:return t=k.getUint32(x),x+=4,es(t);case 202:if(t=k.getFloat32(x),R.useFloat32>2){let e=em[(127&m[x])<<1|m[x+1]>>7];return x+=4,(e*t+(t>0?.5:-.5)>>0)/e}return x+=4,t;case 203:return t=k.getFloat64(x),x+=8,t;case 204:return m[x++];case 205:return t=k.getUint16(x),x+=2,t;case 206:return t=k.getUint32(x),x+=4,t;case 207:return"number"===R.int64AsType?t=4294967296*k.getUint32(x)+k.getUint32(x+4):"string"===R.int64AsType?t=k.getBigUint64(x).toString():"auto"===R.int64AsType?(t=k.getBigUint64(x))<=BigInt(2)<<BigInt(52)&&(t=Number(t)):t=k.getBigUint64(x),x+=8,t;case 208:return k.getInt8(x++);case 209:return t=k.getInt16(x),x+=2,t;case 210:return t=k.getInt32(x),x+=4,t;case 211:return"number"===R.int64AsType?t=4294967296*k.getInt32(x)+k.getUint32(x+4):"string"===R.int64AsType?t=k.getBigInt64(x).toString():"auto"===R.int64AsType?(t=k.getBigInt64(x))>=BigInt(-2)<<BigInt(52)&&t<=BigInt(2)<<BigInt(52)&&(t=Number(t)):t=k.getBigInt64(x),x+=8,t;case 212:if(114==(t=m[x++]))return eu(63&m[x++]);{let e=O[t];if(e){if(e.read)return x++,e.read(G());if(e.noBuffer)return x++,e();return e(m.subarray(x,++x))}throw Error("Unknown extension "+t)}case 213:if(114==(t=m[x]))return x++,eu(63&m[x++],m[x++]);return es(2);case 214:return es(4);case 215:return es(8);case 216:return es(16);case 217:if(t=m[x++],C>=x)return S.slice(x-_,(x+=t)-_);return W(t);case 218:if(t=k.getUint16(x),x+=2,C>=x)return S.slice(x-_,(x+=t)-_);return q(t);case 219:if(t=k.getUint32(x),x+=4,C>=x)return S.slice(x-_,(x+=t)-_);return U(t);case 220:return t=k.getUint16(x),x+=2,Z(t);case 221:return t=k.getUint32(x),x+=4,Z(t);case 222:return t=k.getUint16(x),x+=2,X(t);case 223:return t=k.getUint32(x),x+=4,X(t);default:if(e>=224)return e-256;if(void 0===e){let e=Error("Unexpected end of MessagePack data");throw e.incomplete=!0,e}throw Error("Unknown MessagePack token "+e)}}}let $=/^[a-zA-Z_$][a-zA-Z\d_$]*$/;function Y(e,t){function r(){if(r.count++>L){let r=e.read=Function("r","return function(){return "+(R.freezeData?"Object.freeze":"")+"({"+e.map(e=>"__proto__"===e?"__proto_:r()":$.test(e)?e+":r()":"["+JSON.stringify(e)+"]:r()").join(",")+"})}")(G);return 0===e.highByte&&(e.read=B(t,e.read)),r()}let n={};for(let t=0,r=e.length;t<r;t++){let r=e[t];"__proto__"===r&&(r="__proto_"),n[r]=G()}return R.freezeData?Object.freeze(n):n}return(r.count=0,0===e.highByte)?B(t,r):r}let B=(e,t)=>function(){let r=m[x++];if(0===r)return t();let n=e<32?-(e+(r<<5)):e+(r<<5),i=b[n]||z()[n];if(!i)throw Error("Record id is not defined for "+n);return i.read||(i.read=Y(i,e)),i.read()};function z(){let e=ef(()=>(m=null,R.getStructures()));return b=R._mergeStructures(e,b)}var H=Q,W=Q,q=Q,U=Q;function Q(e){let t;if(e<16&&(t=er(e)))return t;if(e>64&&y)return y.decode(m.subarray(x,x+=e));let r=x+e,n=[];for(t="";x<r;){let e=m[x++];if((128&e)==0)n.push(e);else if((224&e)==192){let t=63&m[x++];n.push((31&e)<<6|t)}else if((240&e)==224){let t=63&m[x++],r=63&m[x++];n.push((31&e)<<12|t<<6|r)}else if((248&e)==240){let t=63&m[x++],r=63&m[x++],i=63&m[x++],s=(7&e)<<18|t<<12|r<<6|i;s>65535&&(s-=65536,n.push(s>>>10&1023|55296),s=56320|1023&s),n.push(s)}else n.push(e);n.length>=4096&&(t+=ee.apply(String,n),n.length=0)}return n.length>0&&(t+=ee.apply(String,n)),t}function Z(e){let t=Array(e);for(let r=0;r<e;r++)t[r]=G();return R.freezeData?Object.freeze(t):t}function X(e){if(R.mapsAsObjects){let t={};for(let r=0;r<e;r++){let e=eo();"__proto__"===e&&(e="__proto_"),t[e]=G()}return t}{let t=new Map;for(let r=0;r<e;r++)t.set(G(),G());return t}}var ee=String.fromCharCode;function et(e){let t=x,r=Array(e);for(let n=0;n<e;n++){let e=m[x++];if((128&e)>0){x=t;return}r[n]=e}return ee.apply(String,r)}function er(e){if(e<4){if(e<2){if(0===e)return"";{let e=m[x++];if((128&e)>1){x-=1;return}return ee(e)}}{let t=m[x++],r=m[x++];if((128&t)>0||(128&r)>0){x-=2;return}if(e<3)return ee(t,r);let n=m[x++];if((128&n)>0){x-=3;return}return ee(t,r,n)}}{let t=m[x++],r=m[x++],n=m[x++],i=m[x++];if((128&t)>0||(128&r)>0||(128&n)>0||(128&i)>0){x-=4;return}if(e<6){if(4===e)return ee(t,r,n,i);{let e=m[x++];if((128&e)>0){x-=5;return}return ee(t,r,n,i,e)}}if(e<8){let s=m[x++],a=m[x++];if((128&s)>0||(128&a)>0){x-=6;return}if(e<7)return ee(t,r,n,i,s,a);let o=m[x++];if((128&o)>0){x-=7;return}return ee(t,r,n,i,s,a,o)}{let s=m[x++],a=m[x++],o=m[x++],l=m[x++];if((128&s)>0||(128&a)>0||(128&o)>0||(128&l)>0){x-=8;return}if(e<10){if(8===e)return ee(t,r,n,i,s,a,o,l);{let e=m[x++];if((128&e)>0){x-=9;return}return ee(t,r,n,i,s,a,o,l,e)}}if(e<12){let u=m[x++],c=m[x++];if((128&u)>0||(128&c)>0){x-=10;return}if(e<11)return ee(t,r,n,i,s,a,o,l,u,c);let d=m[x++];if((128&d)>0){x-=11;return}return ee(t,r,n,i,s,a,o,l,u,c,d)}{let u=m[x++],c=m[x++],d=m[x++],h=m[x++];if((128&u)>0||(128&c)>0||(128&d)>0||(128&h)>0){x-=12;return}if(e<14){if(12===e)return ee(t,r,n,i,s,a,o,l,u,c,d,h);{let e=m[x++];if((128&e)>0){x-=13;return}return ee(t,r,n,i,s,a,o,l,u,c,d,h,e)}}{let p=m[x++],f=m[x++];if((128&p)>0||(128&f)>0){x-=14;return}if(e<15)return ee(t,r,n,i,s,a,o,l,u,c,d,h,p,f);let y=m[x++];if((128&y)>0){x-=15;return}return ee(t,r,n,i,s,a,o,l,u,c,d,h,p,f,y)}}}}}function en(){let e,t=m[x++];if(t<192)e=t-160;else switch(t){case 217:e=m[x++];break;case 218:e=k.getUint16(x),x+=2;break;case 219:e=k.getUint32(x),x+=4;break;default:throw Error("Expected string")}return Q(e)}function ei(e){return R.copyBuffers?Uint8Array.prototype.slice.call(m,x,x+=e):m.subarray(x,x+=e)}function es(e){let t=m[x++];if(O[t]){let r;return O[t](m.subarray(x,r=x+=e),e=>{x=e;try{return G()}finally{x=r}})}throw Error("Unknown extension type "+t)}var ea=Array(4096);function eo(){let e,t=m[x++];if(!(t>=160)||!(t<192))return x--,el(G());if(t-=160,C>=x)return S.slice(x-_,(x+=t)-_);if(!(0==C&&g<180))return H(t);let r=(t<<5^(t>1?k.getUint16(x):t>0?m[x]:0))&4095,n=ea[r],i=x,s=x+t-3,a=0;if(n&&n.bytes==t){for(;i<s;){if((e=k.getUint32(i))!=n[a++]){i=1879048192;break}i+=4}for(s+=3;i<s;)if((e=m[i++])!=n[a++]){i=1879048192;break}if(i===s)return x=i,n.string;s-=3,i=x}for(n=[],ea[r]=n,n.bytes=t;i<s;)e=k.getUint32(i),n.push(e),i+=4;for(s+=3;i<s;)e=m[i++],n.push(e);let o=t<16?er(t):et(t);return null!=o?n.string=o:n.string=H(t)}function el(e){if("string"==typeof e)return e;if("number"==typeof e)return e.toString();throw Error("Invalid property type for record",typeof e)}let eu=(e,t)=>{let r=G().map(el),n=e;void 0!==t&&(e=e<32?-((t<<5)+e):(t<<5)+e,r.highByte=t);let i=b[e];return i&&(i.isShared||N)&&((b.restoreStructures||(b.restoreStructures=[]))[e]=i),b[e]=r,r.read=Y(r,n),r.read()};O[0]=()=>{},O[0].noBuffer=!0,O[66]=e=>{let t=e.length,r=BigInt(128&e[0]?e[0]-256:e[0]);for(let n=1;n<t;n++)r<<=8n,r+=BigInt(e[n]);return r};let ec={Error,TypeError,ReferenceError};O[101]=()=>{let e=G();return(ec[e[0]]||Error)(e[1])},O[105]=e=>{let t;if(!1===R.structuredClone)throw Error("Structured clone extension is disabled");let r=k.getUint32(x-4);E||(E=new Map);let n=m[x],i={target:t=n>=144&&n<160||220==n||221==n?[]:{}};E.set(r,i);let s=G();return i.used?Object.assign(t,s):(i.target=s,s)},O[112]=e=>{if(!1===R.structuredClone)throw Error("Structured clone extension is disabled");let t=k.getUint32(x-4),r=E.get(t);return r.used=!0,r.target},O[115]=()=>new Set(G());let ed=["Int8","Uint8","Uint8Clamped","Int16","Uint16","Int32","Uint32","Float32","Float64","BigInt64","BigUint64"].map(e=>e+"Array"),eh="object"==typeof globalThis?globalThis:window;O[116]=e=>{let t=e[0],r=ed[t];if(!r)throw Error("Could not find typed array for code "+t);return new eh[r](Uint8Array.prototype.slice.call(e,1).buffer)},O[120]=()=>{let e=G();return new RegExp(e[0],e[1])};let ep=[];function ef(e){I&&I();let t=g,r=x,n=j,i=_,s=C,a=S,o=T,l=E,u=v,c=new Uint8Array(m.slice(0,g)),d=b,h=b.slice(0,b.length),p=R,f=N,y=e();return g=t,x=r,j=n,_=i,C=s,S=a,T=o,E=l,v=u,m=c,N=f,(b=d).splice(0,b.length,...h),R=p,k=new DataView(m.buffer,m.byteOffset,m.byteLength),y}function ey(){m=null,E=null,b=null}O[98]=e=>{let t=(e[0]<<24)+(e[1]<<16)+(e[2]<<8)+e[3],r=x;return x+=t-e.length,v=ep,(v=[en(),en()]).position0=0,v.position1=0,v.postBundlePosition=x,x=r,G()},O[255]=e=>new Date(4==e.length?(16777216*e[0]+(e[1]<<16)+(e[2]<<8)+e[3])*1e3:8==e.length?((e[0]<<22)+(e[1]<<14)+(e[2]<<6)+(e[3]>>2))/1e6+((3&e[3])*4294967296+16777216*e[4]+(e[5]<<16)+(e[6]<<8)+e[7])*1e3:12==e.length?((e[0]<<24)+(e[1]<<16)+(e[2]<<8)+e[3])/1e6+((128&e[4]?-281474976710656:0)+1099511627776*e[6]+4294967296*e[7]+16777216*e[8]+(e[9]<<16)+(e[10]<<8)+e[11])*1e3:"invalid");let em=Array(147);for(let e=0;e<256;e++)em[e]=+("1e"+Math.floor(45.15-.30103*e));var eg=new F({useRecords:!1});eg.unpack,eg.unpackMultiple,eg.unpack;let eb=new Float32Array(1);new Uint8Array(eb.buffer,0,4);try{n=new TextEncoder}catch(e){}let eS="undefined"!=typeof Buffer,ev=eS?function(e){return Buffer.allocUnsafeSlow(e)}:Uint8Array,eE=eS?Buffer:Uint8Array,ek=eS?4294967296:2144337920,eK=0,ew=null,eI=/[\u0080-\uFFFF]/,ex=Symbol("record-id");class eA extends F{constructor(e){let t,r,d,h;super(e),this.offset=0;let p=eE.prototype.utf8Write?function(e,t){return a.utf8Write(e,t,4294967295)}:!!n&&!!n.encodeInto&&function(e,t){return n.encodeInto(e,a.subarray(t)).written},f=this;e||(e={});let y=e&&e.sequential,m=e.structures||e.saveStructures,g=e.maxSharedStructures;if(null==g&&(g=m?32:0),g>8160)throw Error("Maximum maxSharedStructure is 8160");e.structuredClone&&void 0==e.moreTypes&&(this.moreTypes=!0);let b=e.maxOwnStructures;null==b&&(b=m?32:64),this.structures||!1==e.useRecords||(this.structures=[]);let S=g>32||b+g>64,v=g+64,E=g+b+64;if(E>8256)throw Error("Maximum maxSharedStructure + maxOwnStructure is 8192");let k=[],K=0,w=0;this.pack=this.encode=function(e,n){let i;if(a||(l=(a=new ev(8192)).dataView||(a.dataView=new DataView(a.buffer,0,8192)),eK=0),(u=a.length-10)-eK<2048?(l=(a=new ev(a.length)).dataView||(a.dataView=new DataView(a.buffer,0,a.length)),u=a.length-10,eK=0):eK=eK+7&2147483640,t=eK,n&eF&&(eK+=255&n),h=f.structuredClone?new Map:null,f.bundleStrings&&"string"!=typeof e?(ew=[]).size=1/0:ew=null,d=f.structures){d.uninitialized&&(d=f._mergeStructures(f.getStructures()));let e=d.sharedLength||0;if(e>g)throw Error("Shared structures is larger than maximum shared structures, try increasing maxSharedStructures to "+d.sharedLength);if(!d.transitions){d.transitions=Object.create(null);for(let t=0;t<e;t++){let e=d[t];if(!e)continue;let r,n=d.transitions;for(let t=0,i=e.length;t<i;t++){let i=e[t];(r=n[i])||(r=n[i]=Object.create(null)),n=r}n[ex]=t+64}this.lastNamedStructuresLength=e}y||(d.nextId=e+64)}r&&(r=!1);try{f.randomAccessStructure&&e&&e.constructor&&e.constructor===Object?D(e):A(e);let r=ew;if(ew&&eR(t,A,0),h&&h.idsToInsert){let e=h.idsToInsert.sort((e,t)=>e.offset>t.offset?1:-1),n=e.length,i=-1;for(;r&&n>0;){let s=e[--n].offset+t;s<r.stringsPosition+t&&-1===i&&(i=0),s>r.position+t?i>=0&&(i+=6):(i>=0&&(l.setUint32(r.position+t,l.getUint32(r.position+t)+i),i=-1),r=r.previous,n++)}i>=0&&r&&l.setUint32(r.position+t,l.getUint32(r.position+t)+i),(eK+=6*e.length)>u&&C(eK),f.offset=eK;let s=function(e,t){let r;let n=6*t.length,i=e.length-n;for(;r=t.pop();){let t=r.offset,s=r.id;e.copyWithin(t+n,t,i);let a=t+(n-=6);e[a++]=214,e[a++]=105,e[a++]=s>>24,e[a++]=s>>16&255,e[a++]=s>>8&255,e[a++]=255&s,i=t}return e}(a.subarray(t,eK),e);return h=null,s}if(f.offset=eK,n&eN)return a.start=t,a.end=eK,a;return a.subarray(t,eK)}catch(e){throw i=e,e}finally{if(d&&(I(),r&&f.saveStructures)){let r=d.sharedLength||0,s=a.subarray(t,eK),o=e_(d,f);if(!i){if(!1===f.saveStructures(o,o.isCompatible))return f.pack(e,n);return f.lastNamedStructuresLength=r,s}}n&eL&&(eK=t)}};let I=()=>{w<10&&w++;let e=d.sharedLength||0;if(d.length>e&&!y&&(d.length=e),K>1e4)d.transitions=null,w=0,K=0,k.length>0&&(k=[]);else if(k.length>0&&!y){for(let e=0,t=k.length;e<t;e++)k[e][ex]=0;k=[]}},x=e=>{var t=e.length;t<16?a[eK++]=144|t:t<65536?(a[eK++]=220,a[eK++]=t>>8,a[eK++]=255&t):(a[eK++]=221,l.setUint32(eK,t),eK+=4);for(let r=0;r<t;r++)A(e[r])},A=e=>{eK>u&&(a=C(eK));var r,n=typeof e;if("string"===n){let n,i=e.length;if(ew&&i>=4&&i<4096){if((ew.size+=i)>21760){let e,r;let n=(ew[0]?3*ew[0].length+ew[1].length:0)+10;eK+n>u&&(a=C(eK+n)),ew.position?(r=ew,a[eK]=200,eK+=3,a[eK++]=98,e=eK-t,eK+=4,eR(t,A,0),l.setUint16(e+t-3,eK-t-e)):(a[eK++]=214,a[eK++]=98,e=eK-t,eK+=4),(ew=["",""]).previous=r,ew.size=0,ew.position=e}let r=eI.test(e);ew[r?0:1]+=e,a[eK++]=193,A(r?-i:i);return}n=i<32?1:i<256?2:i<65536?3:5;let s=3*i;if(eK+s>u&&(a=C(eK+s)),i<64||!p){let t,s,o,l=eK+n;for(t=0;t<i;t++)(s=e.charCodeAt(t))<128?a[l++]=s:(s<2048?a[l++]=s>>6|192:((64512&s)==55296&&(64512&(o=e.charCodeAt(t+1)))==56320?(s=65536+((1023&s)<<10)+(1023&o),t++,a[l++]=s>>18|240,a[l++]=s>>12&63|128):a[l++]=s>>12|224,a[l++]=s>>6&63|128),a[l++]=63&s|128);r=l-eK-n}else r=p(e,eK+n);r<32?a[eK++]=160|r:r<256?(n<2&&a.copyWithin(eK+2,eK+1,eK+1+r),a[eK++]=217,a[eK++]=r):r<65536?(n<3&&a.copyWithin(eK+3,eK+2,eK+2+r),a[eK++]=218,a[eK++]=r>>8,a[eK++]=255&r):(n<5&&a.copyWithin(eK+5,eK+3,eK+3+r),a[eK++]=219,l.setUint32(eK,r),eK+=4),eK+=r}else if("number"===n){if(e>>>0===e)e<32||e<128&&!1===this.useRecords||e<64&&!this.randomAccessStructure?a[eK++]=e:e<256?(a[eK++]=204,a[eK++]=e):e<65536?(a[eK++]=205,a[eK++]=e>>8,a[eK++]=255&e):(a[eK++]=206,l.setUint32(eK,e),eK+=4);else if(e>>0===e)e>=-32?a[eK++]=256+e:e>=-128?(a[eK++]=208,a[eK++]=e+256):e>=-32768?(a[eK++]=209,l.setInt16(eK,e),eK+=2):(a[eK++]=210,l.setInt32(eK,e),eK+=4);else{let t;if((t=this.useFloat32)>0&&e<4294967296&&e>=-2147483648){let r;if(a[eK++]=202,l.setFloat32(eK,e),t<4||(r=e*em[(127&a[eK])<<1|a[eK+1]>>7])>>0===r){eK+=4;return}eK--}a[eK++]=203,l.setFloat64(eK,e),eK+=8}}else if("object"===n||"function"===n){if(e){if(h){let r=h.get(e);if(r){if(!r.id){let e=h.idsToInsert||(h.idsToInsert=[]);r.id=e.push(r)}a[eK++]=214,a[eK++]=112,l.setUint32(eK,r.id),eK+=4;return}h.set(e,{offset:eK-t})}let o=e.constructor;if(o===Object)_(e,!0);else if(o===Array)x(e);else if(o===Map){if(this.mapAsEmptyObject)a[eK++]=128;else for(let[t,n]of((r=e.size)<16?a[eK++]=128|r:r<65536?(a[eK++]=222,a[eK++]=r>>8,a[eK++]=255&r):(a[eK++]=223,l.setUint32(eK,r),eK+=4),e))A(t),A(n)}else{for(let t=0,r=i.length;t<r;t++)if(e instanceof s[t]){let r,n=i[t];if(n.write){n.type&&(a[eK++]=212,a[eK++]=n.type,a[eK++]=0);let t=n.write.call(this,e);t===e?Array.isArray(e)?x(e):_(e):A(t);return}let s=a,o=l,c=eK;a=null;try{r=n.pack.call(this,e,e=>(a=s,s=null,(eK+=e)>u&&C(eK),{target:a,targetView:l,position:eK-e}),A)}finally{s&&(a=s,l=o,eK=c,u=a.length-10)}r&&(r.length+eK>u&&C(r.length+eK),eK=function(e,t,r,n){let i=e.length;switch(i){case 1:t[r++]=212;break;case 2:t[r++]=213;break;case 4:t[r++]=214;break;case 8:t[r++]=215;break;case 16:t[r++]=216;break;default:i<256?(t[r++]=199,t[r++]=i):(i<65536?(t[r++]=200,t[r++]=i>>8):(t[r++]=201,t[r++]=i>>24,t[r++]=i>>16&255,t[r++]=i>>8&255),t[r++]=255&i)}return t[r++]=n,t.set(e,r),r+=i}(r,a,eK,n.type));return}if(Array.isArray(e))x(e);else{if(e.toJSON){let t=e.toJSON();if(t!==e)return A(t)}if("function"===n)return A(this.writeFunction&&this.writeFunction(e));_(e,!e.hasOwnProperty)}}}else a[eK++]=192}else if("boolean"===n)a[eK++]=e?195:194;else if("bigint"===n){if(e<BigInt(1)<<BigInt(63)&&e>=-(BigInt(1)<<BigInt(63)))a[eK++]=211,l.setBigInt64(eK,e);else if(e<BigInt(1)<<BigInt(64)&&e>0)a[eK++]=207,l.setBigUint64(eK,e);else if(this.largeBigIntToFloat)a[eK++]=203,l.setFloat64(eK,Number(e));else if(this.useBigIntExtension&&e<2n**1023n&&e>-(2n**1023n)){let t;a[eK++]=199,eK++,a[eK++]=66;let r=[];do{let n=255n&e;t=(128n&n)===(e<0n?128n:0n),r.push(n),e>>=8n}while(!((0n===e||e===-1n)&&t));a[eK-2]=r.length;for(let e=r.length;e>0;)a[eK++]=Number(r[--e]);return}else throw RangeError(e+" was too large to fit in MessagePack 64-bit integer format, use useBigIntExtension or set largeBigIntToFloat to convert to float-64");eK+=8}else if("undefined"===n)this.encodeUndefinedAsNil?a[eK++]=192:(a[eK++]=212,a[eK++]=0,a[eK++]=0);else throw Error("Unknown type: "+n)},T=this.variableMapSize||this.coercibleKeyAsNumber?e=>{let t,r=Object.keys(e),n=r.length;if(n<16?a[eK++]=128|n:n<65536?(a[eK++]=222,a[eK++]=n>>8,a[eK++]=255&n):(a[eK++]=223,l.setUint32(eK,n),eK+=4),this.coercibleKeyAsNumber)for(let i=0;i<n;i++){let n=Number(t=r[i]);A(isNaN(n)?t:n),A(e[t])}else for(let i=0;i<n;i++)A(t=r[i]),A(e[t])}:(e,r)=>{a[eK++]=222;let n=eK-t;eK+=2;let i=0;for(let t in e)(r||e.hasOwnProperty(t))&&(A(t),A(e[t]),i++);a[n+++t]=i>>8,a[n+t]=255&i},j=!1===this.useRecords?T:e.progressiveRecords&&!S?(e,r)=>{let n,i,s=d.transitions||(d.transitions=Object.create(null)),o=eK++-t;for(let a in e)if(r||e.hasOwnProperty(a)){if(i=s[a])s=i;else{let r=Object.keys(e),l=s;s=d.transitions;let u=0;for(let e=0,t=r.length;e<t;e++){let t=r[e];!(i=s[t])&&(i=s[t]=Object.create(null),u++),s=i}o+t+1==eK?(eK--,O(s,r,u)):P(s,r,o,u),n=!0,s=l[a]}A(e[a])}if(!n){let r=s[ex];r?a[o+t]=r:P(s,Object.keys(e),o,0)}}:(e,t)=>{let r,n=d.transitions||(d.transitions=Object.create(null)),i=0;for(let s in e)(t||e.hasOwnProperty(s))&&(!(r=n[s])&&(r=n[s]=Object.create(null),i++),n=r);let s=n[ex];for(let r in s?s>=96&&S?(a[eK++]=(31&(s-=96))+96,a[eK++]=s>>5):a[eK++]=s:O(n,n.__keys__||Object.keys(e),i),e)(t||e.hasOwnProperty(r))&&A(e[r])},R="function"==typeof this.useRecords&&this.useRecords,_=R?(e,t)=>{R(e)?j(e,t):T(e,t)}:j,C=e=>{let r;if(e>16777216){if(e-t>ek)throw Error("Packed buffer would be larger than maximum buffer size");r=Math.min(ek,4096*Math.round(Math.max((e-t)*(e>67108864?1.25:2),4194304)/4096))}else r=(Math.max(e-t<<2,a.length-1)>>12)+1<<12;let n=new ev(r);return l=n.dataView||(n.dataView=new DataView(n.buffer,0,r)),e=Math.min(e,a.length),a.copy?a.copy(n,0,t,e):n.set(a.slice(t,e)),eK-=t,t=0,u=n.length-10,a=n},O=(e,t,n)=>{let i=d.nextId;i||(i=64),i<v&&this.shouldShareStructure&&!this.shouldShareStructure(t)?((i=d.nextOwnId)<E||(i=v),d.nextOwnId=i+1):(i>=E&&(i=v),d.nextId=i+1);let s=t.highByte=i>=96&&S?i-96>>5:-1;e[ex]=i,e.__keys__=t,d[i-64]=t,i<v?(t.isShared=!0,d.sharedLength=i-63,r=!0,s>=0?(a[eK++]=(31&i)+96,a[eK++]=s):a[eK++]=i):(s>=0?(a[eK++]=213,a[eK++]=114,a[eK++]=(31&i)+96,a[eK++]=s):(a[eK++]=212,a[eK++]=114,a[eK++]=i),n&&(K+=w*n),k.length>=b&&(k.shift()[ex]=0),k.push(e),A(t))},P=(e,r,n,i)=>{let s=a,l=eK,c=u,d=t;eK=0,t=0,(a=o)||(o=a=new ev(8192)),u=a.length-10,O(e,r,i),o=a;let h=eK;if(a=s,eK=l,u=c,t=d,h>1){let e=eK+h-1;e>u&&C(e);let r=n+t;a.copyWithin(r+h,r+1,eK),a.set(o.slice(0,h),r),eK=e}else a[n+t]=o[0]},D=(e,n)=>{let i=c(e,a,t,eK,d,C,(e,t,n)=>{if(n)return r=!0;eK=t;let i=a;return(A(e),I(),i!==a)?{position:eK,targetView:l,target:a}:eK},this);if(0===i)return _(e,!0);eK=i}}useBuffer(e){a=e,l=new DataView(a.buffer,a.byteOffset,a.byteLength),eK=0}clearSharedData(){this.structures&&(this.structures=[]),this.typedStructs&&(this.typedStructs=[])}}function eT(e,t,r,n){let i=e.byteLength;if(i+1<256){var{target:s,position:a}=r(4+i);s[a++]=199,s[a++]=i+1}else if(i+1<65536){var{target:s,position:a}=r(5+i);s[a++]=200,s[a++]=i+1>>8,s[a++]=i+1&255}else{var{target:s,position:a,targetView:o}=r(7+i);s[a++]=201,o.setUint32(a,i+1),a+=4}s[a++]=116,s[a++]=t,s.set(new Uint8Array(e.buffer,e.byteOffset,e.byteLength),a)}function ej(e,t){let r=e.byteLength;if(r<256){var n,i,{target:n,position:i}=t(r+2);n[i++]=196,n[i++]=r}else if(r<65536){var{target:n,position:i}=t(r+3);n[i++]=197,n[i++]=r>>8,n[i++]=255&r}else{var{target:n,position:i,targetView:s}=t(r+5);n[i++]=198,s.setUint32(i,r),i+=4}n.set(e,i)}function eR(e,t,r){if(ew.length>0){l.setUint32(ew.position+e,eK+r-ew.position-e),ew.stringsPosition=eK-e;let n=ew;ew=null,t(n[0]),t(n[1])}}function e_(e,t){return e.isCompatible=e=>{let r=!e||(t.lastNamedStructuresLength||0)===e.length;return r||t._mergeStructures(e),r},e}s=[Date,Set,Error,RegExp,ArrayBuffer,Object.getPrototypeOf(Uint8Array.prototype).constructor,D],i=[{pack(e,t,r){let n=e.getTime()/1e3;if((this.useTimestamp32||0===e.getMilliseconds())&&n>=0&&n<4294967296){let{target:e,targetView:r,position:i}=t(6);e[i++]=214,e[i++]=255,r.setUint32(i,n)}else if(n>0&&n<4294967296){let{target:r,targetView:i,position:s}=t(10);r[s++]=215,r[s++]=255,i.setUint32(s,4e6*e.getMilliseconds()+(n/1e3/4294967296>>0)),i.setUint32(s+4,n)}else if(isNaN(n)){if(this.onInvalidDate)return t(0),r(this.onInvalidDate());let{target:e,targetView:n,position:i}=t(3);e[i++]=212,e[i++]=255,e[i++]=255}else{let{target:r,targetView:i,position:s}=t(15);r[s++]=199,r[s++]=12,r[s++]=255,i.setUint32(s,1e6*e.getMilliseconds()),i.setBigInt64(s+4,BigInt(Math.floor(n)))}}},{pack(e,t,r){if(this.setAsEmptyObject)return t(0),r({});let n=Array.from(e),{target:i,position:s}=t(this.moreTypes?3:0);this.moreTypes&&(i[s++]=212,i[s++]=115,i[s++]=0),r(n)}},{pack(e,t,r){let{target:n,position:i}=t(this.moreTypes?3:0);this.moreTypes&&(n[i++]=212,n[i++]=101,n[i++]=0),r([e.name,e.message])}},{pack(e,t,r){let{target:n,position:i}=t(this.moreTypes?3:0);this.moreTypes&&(n[i++]=212,n[i++]=120,n[i++]=0),r([e.source,e.flags])}},{pack(e,t){this.moreTypes?eT(e,16,t):ej(eS?Buffer.from(e):new Uint8Array(e),t)}},{pack(e,t){let r=e.constructor;r!==eE&&this.moreTypes?eT(e,ed.indexOf(r.name),t):ej(e,t)}},{pack(e,t){let{target:r,position:n}=t(1);r[n]=193}}];let eC=new eA({useRecords:!1});eC.pack,eC.pack;let{NEVER:eO,ALWAYS:eP,DECIMAL_ROUND:eD,DECIMAL_FIT:eM}={NEVER:0,ALWAYS:1,DECIMAL_ROUND:3,DECIMAL_FIT:4},eN=512,eL=1024,eF=2048,eV=["num","object","string","ascii"];eV[16]="date";let eJ=[!1,!0,!0,!1,!1,!0,!0,!1];try{Function(""),d=!0}catch(e){}let eG="undefined"!=typeof Buffer;try{p=new TextEncoder}catch(e){}let e$=eG?function(e,t,r){return e.utf8Write(t,r,4294967295)}:!!p&&!!p.encodeInto&&function(e,t,r){return p.encodeInto(t,e.subarray(r)).written};function eY(e,t,r,n){let i;return(i=e.ascii8||e.num8)?(r.setInt8(t,n,!0),h=t+1,i):(i=e.string16||e.object16)?(r.setInt16(t,n,!0),h=t+2,i):(i=e.num32)?(r.setUint32(t,3758096640+n,!0),h=t+4,i):(i=e.num64)?(r.setFloat64(t,NaN,!0),r.setInt8(t,n),h=t+8,i):void(h=t)}function eB(e,t,r){let n=eV[t]+(r<<3),i=e[n]||(e[n]=Object.create(null));return i.__type=t,i.__size=r,i.__parent=e,i}Symbol("type"),Symbol("parent"),c=function e(t,r,n,i,s,a,o,l){let u,c=l.typedStructs||(l.typedStructs=[]),d=r.dataView,p=(c.lastStringStart||100)+i,f=r.length-10,y=i;i>f&&(d=(r=a(i)).dataView,i-=n,y-=n,p-=n,n=0,f=r.length-10);let m,g=p,b=c.transitions||(c.transitions=Object.create(null)),S=c.nextId||c.length,v=S<15?1:S<240?2:S<61440?3:S<15728640?4:0;if(0===v)return 0;i+=v;let E=[],k=0;for(let e in t){let s=t[e],l=b[e];switch(l||(b[e]=l={key:e,parent:b,enumerationOffset:0,ascii0:null,ascii8:null,num8:null,string16:null,object16:null,num32:null,float64:null,date64:null}),i>f&&(d=(r=a(i)).dataView,i-=n,y-=n,p-=n,g-=n,n=0,f=r.length-10),typeof s){case"number":if(S<200||!l.num64){if(s>>0===s&&s<536870912&&s>-520093696){s<246&&s>=0&&(l.num8&&!(S>200&&l.num32)||s<32&&!l.num32)?(b=l.num8||eB(l,0,1),r[i++]=s):(b=l.num32||eB(l,0,4),d.setUint32(i,s,!0),i+=4);break}if(s<4294967296&&s>=-2147483648&&(d.setFloat32(i,s,!0),eJ[r[i+3]>>>5])){let e;if((e=s*em[(127&r[i+3])<<1|r[i+2]>>7])>>0===e){b=l.num32||eB(l,0,4),i+=4;break}}}b=l.num64||eB(l,0,8),d.setFloat64(i,s,!0),i+=8;break;case"string":let v,K=s.length;if(m=g-p,(K<<2)+g>f&&(d=(r=a((K<<2)+g)).dataView,i-=n,y-=n,p-=n,g-=n,n=0,f=r.length-10),K>65280+m>>2){E.push(e,s,i-y);break}let w=g;if(K<64){let e,t,n;for(e=0;e<K;e++)(t=s.charCodeAt(e))<128?r[g++]=t:(t<2048?(v=!0,r[g++]=t>>6|192):((64512&t)==55296&&(64512&(n=s.charCodeAt(e+1)))==56320?(v=!0,t=65536+((1023&t)<<10)+(1023&n),e++,r[g++]=t>>18|240,r[g++]=t>>12&63|128):(v=!0,r[g++]=t>>12|224),r[g++]=t>>6&63|128),r[g++]=63&t|128)}else g+=e$(r,s,g),v=g-w>K;if(m<160||m<246&&(l.ascii8||l.string8)){if(v)(b=l.string8)||(c.length>10&&(b=l.ascii8)?(b.__type=2,l.ascii8=null,l.string8=b,o(null,0,!0)):b=eB(l,2,1));else if(0!==m||u)(b=l.ascii8)||c.length>10&&(b=l.string8)||(b=eB(l,3,1));else{u=!0,b=l.ascii0||eB(l,3,0);break}r[i++]=m}else b=l.string16||eB(l,2,2),d.setUint16(i,m,!0),i+=2;break;case"object":s?s.constructor===Date?(b=l.date64||eB(l,16,8),d.setFloat64(i,s.getTime(),!0),i+=8):E.push(e,s,k):(l=eY(l,i,d,-10))?(b=l,i=h):E.push(e,s,k);break;case"boolean":b=l.num8||l.ascii8||eB(l,0,1),r[i++]=s?249:248;break;case"undefined":(l=eY(l,i,d,-9))?(b=l,i=h):E.push(e,s,k);break;default:E.push(e,s,k)}k++}for(let e=0,t=E.length;e<t;){let t,s=E[e++],a=E[e++],l=E[e++],u=b[s];if(u||(b[s]=u={key:s,parent:b,enumerationOffset:l-k,ascii0:null,ascii8:null,num8:null,string16:null,object16:null,num32:null,float64:null}),a){let e;(m=g-p)<65280?(b=u.object16)?e=2:(b=u.object32)?e=4:(b=eB(u,1,2),e=2):(b=u.object32||eB(u,1,4),e=4),"object"==typeof(t=o(a,g))?(g=t.position,d=t.targetView,r=t.target,p-=n,i-=n,y-=n,n=0):g=t,2===e?(d.setUint16(i,m,!0),i+=2):(d.setUint32(i,m,!0),i+=4)}else b=u.object16||eB(u,1,2),d.setInt16(i,null===a?-10:-9,!0),i+=2;k++}let K=b[ex];if(null==K){let e;K=l.typedStructs.length;let t=[],r=b;for(;void 0!==(e=r.__type);){let n=[e,r.__size,(r=r.__parent).key];r.enumerationOffset&&n.push(r.enumerationOffset),t.push(n),r=r.parent}t.reverse(),b[ex]=K,l.typedStructs[K]=t,o(null,0,!0)}switch(v){case 1:if(K>=16)return 0;r[y]=K+32;break;case 2:if(K>=256)return 0;r[y]=56,r[y+1]=K;break;case 3:if(K>=65536)return 0;r[y]=57,d.setUint16(y+1,K,!0);break;case 4:if(K>=16777216)return 0;d.setUint32(y,(K<<8)+58,!0)}if(i<p){if(p===g)return i;r.copyWithin(i,p,g),g+=i-p,c.lastStringStart=i-y}else if(i>p)return p===g?i:(c.lastStringStart=i-y,e(t,r,n,y,s,a,o,l));return g},e_=function(e,t){if(t.typedStructs){let r=new Map;r.set("named",e),r.set("typed",t.typedStructs),e=r}let r=t.lastTypedStructuresLength||0;return e.isCompatible=e=>{let n=!0;return e instanceof Map?((e.get("named")||[]).length!==(t.lastNamedStructuresLength||0)&&(n=!1),(e.get("typed")||[]).length!==r&&(n=!1)):(e instanceof Array||Array.isArray(e))&&e.length!==(t.lastNamedStructuresLength||0)&&(n=!1),n||t._mergeStructures(e),n},t.lastTypedStructuresLength=t.typedStructs&&t.typedStructs.length,e};var ez=Symbol.for("source");function eH(e){switch(e){case 246:return null;case 247:return;case 248:return!1;case 249:return!0}throw Error("Unknown constant")}K=function(e,t,r,n){let i=e[t++]-32;if(i>=24)switch(i){case 24:i=e[t++];break;case 25:i=e[t++]+(e[t++]<<8);break;case 26:i=e[t++]+(e[t++]<<8)+(e[t++]<<16);break;case 27:i=e[t++]+(e[t++]<<8)+(e[t++]<<16)+(e[t++]<<24)}let s=n.typedStructs&&n.typedStructs[i];if(!s){if(e=Uint8Array.prototype.slice.call(e,t,r),r-=t,t=0,n._mergeStructures(n.getStructures()),!n.typedStructs)throw Error("Could not find any shared typed structures");if(n.lastTypedStructuresLength=n.typedStructs.length,!(s=n.typedStructs[i]))throw Error("Could not find typed structure "+i)}var a=s.construct;if(!a){let e;var o=(a=s.construct=function(){}).prototype;let t=[],r=0;for(let i=0,a=s.length;i<a;i++){let a,o;let[l,u,c,d]=s[i];"__proto__"===c&&(c="__proto_");let h={key:c,offset:r};switch(d?t.splice(i+d,0,h):t.push(h),u){case 0:a=()=>0;break;case 1:a=(e,t)=>{let r=e.bytes[t+h.offset];return r>=246?eH(r):r};break;case 2:a=(e,t)=>{let r=e.bytes,n=(r.dataView||(r.dataView=new DataView(r.buffer,r.byteOffset,r.byteLength))).getUint16(t+h.offset,!0);return n>=65280?eH(255&n):n};break;case 4:a=(e,t)=>{let r=e.bytes,n=(r.dataView||(r.dataView=new DataView(r.buffer,r.byteOffset,r.byteLength))).getUint32(t+h.offset,!0);return n>=4294967040?eH(255&n):n}}switch(h.getRef=a,r+=u,l){case 3:e&&!e.next&&(e.next=h),e=h,h.multiGetCount=0,o=function(e){let t=e.bytes,n=e.position,i=r+n,s=a(e,n);if("number"!=typeof s)return s;let o,l=h.next;for(;l&&"number"!=typeof(o=l.getRef(e,n));)o=null,l=l.next;return(null==o&&(o=e.bytesEnd-i),e.srcString)?e.srcString.slice(s,o):function(e,t,r){let n=m;m=e,x=t;try{return Q(r)}finally{m=n}}(t,s+i,o-s)};break;case 2:case 1:e&&!e.next&&(e.next=h),e=h,o=function(e){let t=e.position,i=r+t,s=a(e,t);if("number"!=typeof s)return s;let o=e.bytes,u,c=h.next;for(;c&&"number"!=typeof(u=c.getRef(e,t));)u=null,c=c.next;if(null==u&&(u=e.bytesEnd-i),2===l)return o.toString("utf8",s+i,u+i);f=e;try{return n.unpack(o,{start:s+i,end:u+i})}finally{f=null}};break;case 0:switch(u){case 4:o=function(e){let t=e.bytes,r=t.dataView||(t.dataView=new DataView(t.buffer,t.byteOffset,t.byteLength)),n=e.position+h.offset,i=r.getInt32(n,!0);if(i<536870912){if(i>-520093696)return i;if(i>-536870912)return eH(255&i)}let s=r.getFloat32(n,!0),a=em[(127&t[n+3])<<1|t[n+2]>>7];return(a*s+(s>0?.5:-.5)>>0)/a};break;case 8:o=function(e){let t=e.bytes,r=(t.dataView||(t.dataView=new DataView(t.buffer,t.byteOffset,t.byteLength))).getFloat64(e.position+h.offset,!0);if(isNaN(r)){let r=t[e.position+h.offset];if(r>=246)return eH(r)}return r};break;case 1:o=function(e){let t=e.bytes[e.position+h.offset];return t<246?t:eH(t)}}break;case 16:o=function(e){let t=e.bytes;return new Date((t.dataView||(t.dataView=new DataView(t.buffer,t.byteOffset,t.byteLength))).getFloat64(e.position+h.offset,!0))}}h.get=o}if(d){let e,r=[],i=[],s=0;for(let a of t){if(n.alwaysLazyProperty&&n.alwaysLazyProperty(a.key)){e=!0;continue}Object.defineProperty(o,a.key,{get:function(e){return function(){return e(this[ez])}}(a.get),enumerable:!0});let t="v"+s++;i.push(t),r.push("["+JSON.stringify(a.key)+"]:"+t+"(s)")}e&&r.push("__proto__:this");let a=Function(...i,"return function(s){return{"+r.join(",")+"}}").apply(null,t.map(e=>e.get));Object.defineProperty(o,"toJSON",{value(e){return a.call(this,this[ez])}})}else Object.defineProperty(o,"toJSON",{value(e){let r={};for(let e=0,n=t.length;e<n;e++){let n=t[e].key;r[n]=this[n]}return r}})}var l=new a;return l[ez]={bytes:e,position:t,srcString:"",bytesEnd:r},l},w=function(e){if(!(e instanceof Map))return e;let t=e.get("typed")||[];Object.isFrozen(t)&&(t=t.map(e=>e.slice(0)));let r=e.get("named"),n=Object.create(null);for(let e=0,r=t.length;e<r;e++){let r=t[e],i=n;for(let[e,t,n]of r){let r=i[n];r||(i[n]=r={key:n,parent:i,enumerationOffset:0,ascii0:null,ascii8:null,num8:null,string16:null,object16:null,num32:null,float64:null,date64:null}),i=eB(r,e,t)}i[ex]=e}return t.transitions=n,this.typedStructs=t,this.lastTypedStructuresLength=t.length,r},I=function(){f&&(f.bytes=Uint8Array.prototype.slice.call(f.bytes,f.position,f.bytesEnd),f.position=0,f.bytesEnd=f.bytes.length)},r(12781);var eW=r(98188);let eq=void 0!==process.env.MSGPACKR_NATIVE_ACCELERATION_DISABLED&&"true"===process.env.MSGPACKR_NATIVE_ACCELERATION_DISABLED.toLowerCase();if(!eq){let e;try{(e="function"==typeof require?require("msgpackr-extract"):(0,eW.createRequire)("file:///D:/harkirat/courseApp_complete_without_monorepo/courseify/node_modules/msgpackr/node-index.js")("msgpackr-extract"))&&function(e){function t(t){return function(r){let n=T[j++];if(null==n){if(v)return Q(r);let i=m.byteOffset,s=e(x-t+i,g+i,m.buffer);if("string"==typeof s)n=s,T=A;else if(j=1,C=1,void 0===(n=(T=s)[0]))throw Error("Unexpected end of buffer")}let i=n.length;return i<=r?(x+=r,n):(S=n,_=x,C=x+i,x+=r,n.slice(0,r))}}H=t(1),W=t(2),q=t(3),U=t(5)}(e.extractStrings)}catch(e){}}var eU=r(70344),eQ=r(11699);let eZ=new eA({useRecords:!1,encodeUndefinedAsNil:!0}),eX=eZ.pack;class e0{constructor(e){this.queue=e;let t=this.queue.keys;this.moveToFinishedKeys=[t.wait,t.active,t.prioritized,t.events,t.stalled,t.limiter,t.delayed,t.paused,t.meta,t.pc,void 0,void 0,void 0,void 0]}async isJobInList(e,t){let r=await this.queue.client;return Number.isInteger((0,eQ.J3)(this.queue.redisVersion,"6.0.6")?await r.isJobInList([e,t]):await r.lpos(e,t))}addDelayedJob(e,t,r,n){let i=this.queue.keys,s=[i.marker,i.meta,i.id,i.delayed,i.completed,i.events];return s.push(eX(n),t.data,r),e.addDelayedJob(s)}addPrioritizedJob(e,t,r,n){let i=this.queue.keys,s=[i.marker,i.meta,i.id,i.prioritized,i.completed,i.events,i.pc];return s.push(eX(n),t.data,r),e.addPrioritizedJob(s)}addParentJob(e,t,r,n){let i=this.queue.keys,s=[i.meta,i.id,i.completed,i.events];return s.push(eX(n),t.data,r),e.addParentJob(s)}addStandardJob(e,t,r,n){let i=this.queue.keys,s=[i.wait,i.paused,i.meta,i.id,i.completed,i.events,i.marker];return s.push(eX(n),t.data,r),e.addStandardJob(s)}async addJob(e,t,r,n,i={}){let s,a;let o=this.queue.keys,l=t.parent?Object.assign(Object.assign({},t.parent),{fpof:r.fpof,rdof:r.rdof}):null,u=[o[""],void 0!==n?n:"",t.name,t.timestamp,t.parentKey||null,i.waitChildrenKey||null,i.parentDependenciesKey||null,l,t.repeatJobKey];if(r.repeat){let e=Object.assign({},r.repeat);e.startDate&&(e.startDate=+new Date(e.startDate)),e.endDate&&(e.endDate=+new Date(e.endDate)),s=eX(Object.assign(Object.assign({},r),{repeat:e}))}else s=eX(r);if((a=i.waitChildrenKey?await this.addParentJob(e,t,s,u):r.delay?await this.addDelayedJob(e,t,s,u):r.priority?await this.addPrioritizedJob(e,t,s,u):await this.addStandardJob(e,t,s,u))<0)throw this.finishedErrors({code:a,parentKey:i.parentKey,command:"addJob"});return a}pauseArgs(e){let t="wait",r="paused";e||(t="paused",r="wait");let n=[t,r,"meta","prioritized"].map(e=>this.queue.toKey(e));return n.push(this.queue.keys.events,this.queue.keys.delayed,this.queue.keys.marker),n.concat([e?"paused":"resumed"])}async pause(e){let t=await this.queue.client,r=this.pauseArgs(e);return t.pause(r)}removeRepeatableArgs(e,t){let r=this.queue.keys,n=[r.repeat,r.delayed],i=[e,t,r[""]];return n.concat(i)}async removeRepeatable(e,t){let r=await this.queue.client,n=this.removeRepeatableArgs(e,t);return r.removeRepeatable(n)}async remove(e,t){let r=await this.queue.client,n=[""].map(e=>this.queue.toKey(e));return r.removeJob(n.concat([e,t?1:0]))}async extendLock(e,t,r,n){n=n||await this.queue.client;let i=[this.queue.toKey(e)+":lock",this.queue.keys.stalled,t,r,e];return n.extendLock(i)}async updateData(e,t){let r=await this.queue.client,n=[this.queue.toKey(e.id)],i=JSON.stringify(t),s=await r.updateData(n.concat([i]));if(s<0)throw this.finishedErrors({code:s,jobId:e.id,command:"updateData"})}async updateProgress(e,t){let r=await this.queue.client,n=[this.queue.toKey(e),this.queue.keys.events,this.queue.keys.meta],i=JSON.stringify(t),s=await r.updateProgress(n.concat([e,i]));if(s<0)throw this.finishedErrors({code:s,jobId:e,command:"updateProgress"})}moveToFinishedArgs(e,t,r,n,i,s,a,o=!0){var l,u,c,d,h,p;let f=this.queue.keys,y=this.queue.opts,m="completed"===i?y.removeOnComplete:y.removeOnFail,g=this.queue.toKey(`metrics:${i}`),b=this.moveToFinishedKeys;b[10]=f[i],b[11]=this.queue.toKey(null!==(l=e.id)&&void 0!==l?l:""),b[12]=g,b[13]=this.queue.keys.marker;let S=this.getKeepJobs(n,m),v=[e.id,a,r,void 0===t?"null":t,i,!o||this.queue.closing?0:1,f[""],eX({token:s,keepJobs:S,limiter:y.limiter,lockDuration:y.lockDuration,attempts:e.opts.attempts,maxMetricsSize:(null===(u=y.metrics)||void 0===u?void 0:u.maxDataPoints)?null===(c=y.metrics)||void 0===c?void 0:c.maxDataPoints:"",fpof:!!(null===(d=e.opts)||void 0===d?void 0:d.failParentOnFailure),idof:!!(null===(h=e.opts)||void 0===h?void 0:h.ignoreDependencyOnFailure),rdof:!!(null===(p=e.opts)||void 0===p?void 0:p.removeDependencyOnFailure)})];return b.concat(v)}getKeepJobs(e,t){return void 0===e?t||{count:e?0:-1}:"object"==typeof e?e:"number"==typeof e?{count:e}:{count:e?0:-1}}async moveToFinished(e,t){let r=await this.queue.client,n=await r.moveToFinished(t);if(n<0)throw this.finishedErrors({code:n,jobId:e,command:"moveToFinished",state:"active"});if(void 0!==n)return e1(n)}finishedErrors({code:e,jobId:t,parentKey:r,command:n,state:i}){switch(e){case eU.jK.JobNotExist:return Error(`Missing key for job ${t}. ${n}`);case eU.jK.JobLockNotExist:return Error(`Missing lock for job ${t}. ${n}`);case eU.jK.JobNotInState:return Error(`Job ${t} is not in the ${i} state. ${n}`);case eU.jK.JobPendingDependencies:return Error(`Job ${t} has pending dependencies. ${n}`);case eU.jK.ParentJobNotExist:return Error(`Missing key for parent job ${r}. ${n}`);case eU.jK.JobLockMismatch:return Error(`Lock mismatch for job ${t}. Cmd ${n} from ${i}`);case eU.jK.ParentJobCannotBeReplaced:return Error(`The parent job ${r} cannot be replaced. ${n}`);default:return Error(`Unknown code ${e} error for ${t}. ${n}`)}}drainArgs(e){let t=this.queue.keys,r=[t.wait,t.paused,e?t.delayed:"",t.prioritized],n=[t[""]];return r.concat(n)}async drain(e){let t=await this.queue.client,r=this.drainArgs(e);return t.drain(r)}removeChildDependencyArgs(e,t){let r=this.queue.keys,n=[r[""]],i=[this.queue.toKey(e),t];return n.concat(i)}async removeChildDependency(e,t){let r=await this.queue.client,n=this.removeChildDependencyArgs(e,t),i=await r.removeChildDependency(n);switch(i){case 0:return!0;case 1:return!1;default:throw this.finishedErrors({code:i,jobId:e,parentKey:t,command:"removeChildDependency"})}}getRangesArgs(e,t,r,n){let i=this.queue.keys,s=e.map(e=>"waiting"===e?"wait":e),a=[i[""]],o=[t,r,n?"1":"0",...s];return a.concat(o)}async getRanges(e,t=0,r=1,n=!1){let i=await this.queue.client,s=this.getRangesArgs(e,t,r,n);return i.getRanges(s)}getCountsArgs(e){let t=this.queue.keys,r=e.map(e=>"waiting"===e?"wait":e),n=[t[""]],i=[...r];return n.concat(i)}async getCounts(e){let t=await this.queue.client,r=this.getCountsArgs(e);return t.getCounts(r)}moveToCompletedArgs(e,t,r,n,i=!1){let s=Date.now();return this.moveToFinishedArgs(e,t,"returnvalue",r,"completed",n,s,i)}moveToFailedArgs(e,t,r,n,i=!1){let s=Date.now();return this.moveToFinishedArgs(e,t,"failedReason",r,"failed",n,s,i)}async isFinished(e,t=!1){let r=await this.queue.client,n=["completed","failed",e].map(e=>this.queue.toKey(e));return r.isFinished(n.concat([e,t?"1":""]))}async getState(e){let t=await this.queue.client,r=["completed","failed","delayed","active","wait","paused","waiting-children","prioritized"].map(e=>this.queue.toKey(e));return(0,eQ.J3)(this.queue.redisVersion,"6.0.6")?t.getState(r.concat([e])):t.getStateV2(r.concat([e]))}async changeDelay(e,t){let r=await this.queue.client,n=this.changeDelayArgs(e,t),i=await r.changeDelay(n);if(i<0)throw this.finishedErrors({code:i,jobId:e,command:"changeDelay",state:"delayed"})}changeDelayArgs(e,t){let r=Date.now()+t;r>0&&(r=4096*r+(4095&+e));let n=[this.queue.keys.delayed,this.queue.keys.meta,this.queue.keys.marker,this.queue.keys.events];return n.concat([t,JSON.stringify(r),e,this.queue.toKey(e)])}async changePriority(e,t=0,r=!1){let n=await this.queue.client,i=this.changePriorityArgs(e,t,r),s=await n.changePriority(i);if(s<0)throw this.finishedErrors({code:s,jobId:e,command:"changePriority"})}changePriorityArgs(e,t=0,r=!1){let n=[this.queue.keys.wait,this.queue.keys.paused,this.queue.keys.meta,this.queue.keys.prioritized,this.queue.keys.pc,this.queue.keys.marker];return n.concat([t,this.queue.toKey(e),e,r?1:0])}moveToDelayedArgs(e,t,r,n,i={}){(t=Math.max(0,null!=t?t:0))>0&&(t=4096*t+(4095&+e));let s=this.queue.keys,a=[s.marker,s.active,s.prioritized,s.delayed,this.queue.toKey(e),s.events,s.meta];return a.concat([this.queue.keys[""],Date.now(),JSON.stringify(t),e,r,n,i.skipAttempt?"1":"0"])}saveStacktraceArgs(e,t,r){let n=[this.queue.toKey(e)];return n.concat([t,r])}moveToWaitingChildrenArgs(e,t,r){let n=Date.now(),i=(0,eQ.pV)(r.child),s=[`${e}:lock`,"active","waiting-children",e].map(e=>this.queue.toKey(e));return s.concat([t,null!=i?i:"",JSON.stringify(n),e])}async moveToDelayed(e,t,r,n="0",i={}){let s=await this.queue.client,a=this.moveToDelayedArgs(e,t,n,r,i),o=await s.moveToDelayed(a);if(o<0)throw this.finishedErrors({code:o,jobId:e,command:"moveToDelayed",state:"active"})}async moveToWaitingChildren(e,t,r={}){let n=await this.queue.client,i=this.moveToWaitingChildrenArgs(e,t,r),s=await n.moveToWaitingChildren(i);switch(s){case 0:return!0;case 1:return!1;default:throw this.finishedErrors({code:s,jobId:e,command:"moveToWaitingChildren",state:"active"})}}async cleanJobsInSet(e,t,r=0){let n=await this.queue.client;return n.cleanJobsInSet([this.queue.toKey(e),this.queue.toKey("events"),this.queue.toKey(""),t,r,e])}retryJobArgs(e,t,r){let n=[this.queue.keys.active,this.queue.keys.wait,this.queue.keys.paused,this.queue.toKey(e),this.queue.keys.meta,this.queue.keys.events,this.queue.keys.delayed,this.queue.keys.prioritized,this.queue.keys.pc,this.queue.keys.marker];return n.concat([this.queue.toKey(""),Date.now(),(t?"R":"L")+"PUSH",e,r])}moveJobsToWaitArgs(e,t,r){let n=[this.queue.toKey(""),this.queue.keys.events,this.queue.toKey(e),this.queue.toKey("wait"),this.queue.toKey("paused"),this.queue.keys.meta,this.queue.keys.marker],i=[t,r,e];return n.concat(i)}async retryJobs(e="failed",t=1e3,r=new Date().getTime()){let n=await this.queue.client,i=this.moveJobsToWaitArgs(e,t,r);return n.moveJobsToWait(i)}async promoteJobs(e=1e3){let t=await this.queue.client,r=this.moveJobsToWaitArgs("delayed",e,Number.MAX_VALUE);return t.moveJobsToWait(r)}async reprocessJob(e,t){let r=await this.queue.client,n=[this.queue.toKey(e.id),this.queue.keys.events,this.queue.toKey(t),this.queue.keys.wait,this.queue.keys.meta,this.queue.keys.paused,this.queue.keys.marker],i=[e.id,(e.opts.lifo?"R":"L")+"PUSH","failed"===t?"failedReason":"returnvalue",t],s=await r.reprocessJob(n.concat(i));if(1!==s)throw this.finishedErrors({code:s,jobId:e.id,command:"reprocessJob",state:t})}async moveToActive(e,t,r){let n=this.queue.opts,i=this.queue.keys,s=[i.wait,i.active,i.prioritized,i.events,i.stalled,i.limiter,i.delayed,i.paused,i.meta,i.pc,i.marker],a=[i[""],Date.now(),eX({token:t,lockDuration:n.lockDuration,limiter:n.limiter,name:r})],o=await e.moveToActive(s.concat(a));return e1(o)}async promote(e){let t=await this.queue.client,r=[this.queue.keys.delayed,this.queue.keys.wait,this.queue.keys.paused,this.queue.keys.meta,this.queue.keys.prioritized,this.queue.keys.pc,this.queue.keys.events,this.queue.keys.marker],n=[this.queue.toKey(""),e],i=await t.promote(r.concat(n));if(i<0)throw this.finishedErrors({code:i,jobId:e,command:"promote",state:"delayed"})}async moveStalledJobsToWait(){let e=await this.queue.client,t=this.queue.opts,r=[this.queue.keys.stalled,this.queue.keys.wait,this.queue.keys.active,this.queue.keys.failed,this.queue.keys["stalled-check"],this.queue.keys.meta,this.queue.keys.paused,this.queue.keys.marker,this.queue.keys.events],n=[t.maxStalledCount,this.queue.toKey(""),Date.now(),t.stalledInterval];return e.moveStalledJobsToWait(r.concat(n))}async moveJobFromActiveToWait(e,t){let r=await this.queue.client,n=`${this.queue.toKey(e)}:lock`,i=[this.queue.keys.active,this.queue.keys.wait,this.queue.keys.stalled,n,this.queue.keys.paused,this.queue.keys.meta,this.queue.keys.limiter,this.queue.keys.prioritized,this.queue.keys.marker,this.queue.keys.events],s=[e,t,this.queue.toKey(e)],a=await r.moveJobFromActiveToWait(i.concat(s));return a<0?0:a}async obliterate(e){let t=await this.queue.client,r=[this.queue.keys.meta,this.queue.toKey("")],n=[e.count,e.force?"force":null],i=await t.obliterate(r.concat(n));if(i<0)switch(i){case -1:throw Error("Cannot obliterate non-paused queue");case -2:throw Error("Cannot obliterate queue with active jobs")}return i}async paginate(e,t){let r=await this.queue.client,n=[e],i=t.end>=0?t.end-t.start+1:1/0,s="0",a=0,o,l,u,c=[],d=[];do{let e=[t.start+c.length,t.end,s,a,5];t.fetchJobs&&e.push(1),[s,a,o,l,u]=await r.paginate(n.concat(e)),c=c.concat(o),u&&u.length&&(d=d.concat(u.map(eQ.VZ)))}while("0"!=s&&c.length<i);if(!(c.length&&Array.isArray(c[0])))return{cursor:s,items:c.map(e=>({id:e})),total:l,jobs:d};{let e=[];for(let t=0;t<c.length;t++){let[r,n]=c[t];try{e.push({id:r,v:JSON.parse(n)})}catch(t){e.push({id:r,err:t.message})}}return{cursor:s,items:e,total:l,jobs:d}}}}function e1(e){if(e){let t=[null,e[1],e[2],e[3]];return e[0]&&(t[0]=(0,eQ.VZ)(e[0])),t}return[]}},61389:(e,t,r)=>{r.d(t,{C:()=>Worker});var n=r(57147),i=r(57310),s=r(71017),a=r(96124),o=r(36784),l=r(11699),u=r(61743),c=r(51306),d=r(63313),h=r(84929),p=r(63709),f=r(22968);class y{constructor(e=!1){this.ignoreErrors=e,this.queue=[],this.pending=new Set,this.newPromise()}add(e){this.pending.add(e),e.then(t=>{this.pending.delete(e),0===this.queue.length&&this.resolvePromise(t),this.queue.push(t)}).catch(t=>{this.ignoreErrors&&this.queue.push(void 0),this.pending.delete(e),this.rejectPromise(t)})}async waitAll(){await Promise.all(this.pending)}numTotal(){return this.pending.size+this.queue.length}numPending(){return this.pending.size}numQueued(){return this.queue.length}resolvePromise(e){this.resolve(e),this.newPromise()}rejectPromise(e){this.reject(e),this.newPromise()}newPromise(){this.nextPromise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}async wait(){return this.nextPromise}async fetch(){if(0!==this.pending.size||0!==this.queue.length){for(;0===this.queue.length;)try{await this.wait()}catch(e){this.ignoreErrors||console.error("Unexpected Error in AsyncFifoQueue",e)}return this.queue.shift()}}}let m="bullmq:rateLimitExceeded";class g extends Error{constructor(e=m){super(e),this.name=this.constructor.name,Object.setPrototypeOf(this,new.target.prototype)}}class b extends Error{constructor(e){super(e),this.name=this.constructor.name,Object.setPrototypeOf(this,new.target.prototype)}}class S extends Error{constructor(e){super(e),this.name=this.constructor.name,Object.setPrototypeOf(this,new.target.prototype)}}e=r.hmd(e);class Worker extends u.W{static RateLimitError(){return new g}constructor(t,r,o,u){if(super(t,Object.assign(Object.assign({},o),{blockingConnection:!0}),u),this.abortDelayController=null,this.blockUntil=0,this.drained=!1,this.extendLocksTimer=null,this.limitUntil=0,this.waiting=null,this.running=!1,!o||!o.connection)throw Error("Worker requires a connection");if(this.opts=Object.assign({drainDelay:5,concurrency:1,lockDuration:3e4,maxStalledCount:1,stalledInterval:3e4,autorun:!0,runRetryDelay:15e3},this.opts),this.opts.stalledInterval<=0)throw Error("stalledInterval must be greater than 0");if(this.concurrency=this.opts.concurrency,this.opts.lockRenewTime=this.opts.lockRenewTime||this.opts.lockDuration/2,this.id=(0,a.Z)(),r){if("function"==typeof r)this.processFn=r;else{if(r instanceof i.URL){if(!n.existsSync(r))throw Error(`URL ${r} does not exist in the local file system`);r=r.href}else{let e=r+([".js",".ts",".flow",".cjs"].includes(s.extname(r))?"":".js");if(!n.existsSync(e))throw Error(`File ${e} does not exist`)}let t=s.dirname(e.filename||__filename),a=s.join(t,"main-worker.js"),o=s.join(t,"main.js"),l=this.opts.useWorkerThreads?a:o;try{n.statSync(l)}catch(t){let e=this.opts.useWorkerThreads?"main-worker.js":"main.js";l=s.join(process.cwd(),`dist/cjs/classes/${e}`),n.statSync(l)}this.childPool=new d.Z({mainFile:l,useWorkerThreads:this.opts.useWorkerThreads}),this.processFn=(0,f.Z)(r,this.childPool).bind(this)}this.opts.autorun&&this.run().catch(e=>this.emit("error",e))}let c=this.clientName()+(this.opts.name?`:w:${this.opts.name}`:"");this.blockingConnection=new p.Z((0,l.Y1)(o.connection)?o.connection.duplicate({connectionName:c}):Object.assign(Object.assign({},o.connection),{connectionName:c}),!1,!0,o.skipVersionCheck),this.blockingConnection.on("error",e=>this.emit("error",e)),this.blockingConnection.on("ready",()=>setTimeout(()=>this.emit("ready"),0))}emit(e,...t){return super.emit(e,...t)}off(e,t){return super.off(e,t),this}on(e,t){return super.on(e,t),this}once(e,t){return super.once(e,t),this}callProcessJob(e,t){return this.processFn(e,t)}createJob(e,t){return this.Job.fromJSON(this,e,t)}async waitUntilReady(){return await super.waitUntilReady(),this.blockingConnection.client}set concurrency(e){if("number"!=typeof e||e<1||!isFinite(e))throw Error("concurrency must be a finite number greater than 0");this.opts.concurrency=e}get repeat(){return new Promise(async e=>{if(!this._repeat){let e=await this.client;this._repeat=new c.w(this.name,Object.assign(Object.assign({},this.opts),{connection:e})),this._repeat.on("error",e=>this.emit.bind(this,e))}e(this._repeat)})}async run(){if(!this.processFn)throw Error("No process function is defined.");if(this.running)throw Error("Worker is already running.");try{if(this.running=!0,this.closing)return;await this.startStalledCheckTimer();let e=new Set;this.startLockExtenderTimer(e);let t=this.asyncFifoQueue=new y,r=0,n=await this.client,i=await this.blockingConnection.client;for(;!this.closing;){let s,a=t.numTotal();for(;!this.waiting&&a<this.opts.concurrency&&(!this.limitUntil||0==a);){let e=`${this.id}:${r++}`,s=this.retryIfFailed(()=>this._getNextJob(n,i,e,{block:!0}),this.opts.runRetryDelay);if(t.add(s),a=t.numTotal(),this.waiting&&a>1)break;let o=await s;if(!o&&a>1||this.blockUntil)break}do s=await t.fetch();while(!s&&t.numQueued()>0);if(s){let r=s.token;t.add(this.retryIfFailed(()=>this.processJob(s,r,()=>t.numTotal()<=this.opts.concurrency,e),this.opts.runRetryDelay))}}return this.running=!1,t.waitAll()}catch(e){throw this.running=!1,e}}async getNextJob(e,{block:t=!0}={}){return this._getNextJob(await this.client,await this.blockingConnection.client,e,{block:t})}async _getNextJob(e,t,r,{block:n=!0}={}){var i;if(this.paused){if(!n)return;await this.paused}if(!this.closing){if(!this.drained||!n||this.limitUntil||this.waiting)return this.limitUntil&&(null===(i=this.abortDelayController)||void 0===i||i.abort(),this.abortDelayController=new o.AbortController,await this.delay(this.limitUntil,this.abortDelayController)),this.moveToActive(e,r,this.opts.name);this.waiting=this.waitForJob(t,this.blockUntil);try{if(this.blockUntil=await this.waiting,this.blockUntil<=0||this.blockUntil-Date.now()<10)return this.moveToActive(e,r,this.opts.name)}catch(e){if(!(this.paused||this.closing)&&(0,l.Zm)(e))throw e}finally{this.waiting=null}}}async rateLimit(e){await this.client.then(t=>t.set(this.keys.limiter,Number.MAX_SAFE_INTEGER,"PX",e))}async moveToActive(e,t,r){let[n,i,s,a]=await this.scripts.moveToActive(e,t,r);return this.updateDelays(s,a),this.nextJobFromJobData(n,i,t)}async waitForJob(e,t){if(this.paused)return 1/0;try{if(!this.closing){let r=this.getBlockTimeout(t);r=this.blockingConnection.capabilities.canDoubleTimeout?r:Math.ceil(r),r=Math.min(r,10);let n=await e.bzpopmin(this.keys.marker,r);if(n){let[e,t,r]=n;if(t)return parseInt(r)}return 0}}catch(e){(0,l.Zm)(e)&&this.emit("error",e),this.closing||await this.delay()}finally{this.waiting=null}return 1/0}getBlockTimeout(e){let t=this.opts;if(!e)return Math.max(t.drainDelay,0);{let t=e-Date.now();return t<1?.001:t/1e3}}async delay(e,t){await (0,l.gw)(e||l.Hh,t)}updateDelays(e=0,t=0){this.limitUntil=Math.max(e,0)||0,this.blockUntil=Math.max(t,0)||0}async nextJobFromJobData(e,t,r){if(e){this.drained=!1;let n=this.createJob(e,t);if(n.token=r,n.opts.repeat){let e=await this.repeat;await e.addNextRepeatableJob(n.name,n.data,n.opts)}return n}this.drained||(this.emit("drained"),this.drained=!0)}async processJob(e,t,r=()=>!0,n){if(!e||this.closing||this.paused)return;let i=async n=>{if(!this.connection.closing){let i=await e.moveToCompleted(n,t,r()&&!(this.closing||this.paused));this.emit("completed",e,n,"active");let[s,a,o,l]=i||[];return this.updateDelays(o,l),this.nextJobFromJobData(s,a,t)}},s=async r=>{if(!this.connection.closing)try{if(r.message==m){this.limitUntil=await this.moveLimitedBackToWait(e,t);return}if(r instanceof b||"DelayedError"==r.message||r instanceof S||"WaitingChildrenError"==r.name)return;await e.moveToFailed(r,t),this.emit("failed",e,r,"active")}catch(e){this.emit("error",e)}};this.emit("active",e,"waiting");let a={job:e,ts:Date.now()};try{n.add(a);let r=await this.callProcessJob(e,t);return await i(r)}catch(e){return s(e)}finally{n.delete(a)}}async pause(e){this.paused||(this.paused=new Promise(e=>{this.resumeWorker=function(){e(),this.paused=null,this.resumeWorker=null}}),await (!e&&this.whenCurrentJobsFinished()),this.emit("paused"))}resume(){this.resumeWorker&&(this.resumeWorker(),this.emit("resumed"))}isPaused(){return!!this.paused}isRunning(){return this.running}close(e=!1){return this.closing||(this.closing=(async()=>{var t;this.emit("closing","closing queue"),null===(t=this.abortDelayController)||void 0===t||t.abort();let r="ready"==this.blockingConnection.status?await this.blockingConnection.client:null;this.resume(),await Promise.resolve().finally(()=>e||this.whenCurrentJobsFinished(!1)).finally(()=>{var t;let r=null===(t=this.childPool)||void 0===t?void 0:t.clean();if(e){null==r||r.catch(e=>{console.error(e)});return}return r}).finally(()=>clearTimeout(this.extendLocksTimer)).finally(()=>clearTimeout(this.stalledCheckTimer)).finally(()=>r&&r.disconnect()).finally(()=>this.connection.close()).finally(()=>this.emit("closed")),this.closed=!0})()),this.closing}async startStalledCheckTimer(){if(!this.opts.skipStalledCheck&&(clearTimeout(this.stalledCheckTimer),!this.closing))try{await this.checkConnectionError(()=>this.moveStalledJobsToWait()),this.stalledCheckTimer=setTimeout(async()=>{await this.startStalledCheckTimer()},this.opts.stalledInterval)}catch(e){this.emit("error",e)}}startLockExtenderTimer(e){this.opts.skipLockRenewal||(clearTimeout(this.extendLocksTimer),this.closed||(this.extendLocksTimer=setTimeout(async()=>{let t=Date.now(),r=[];for(let n of e){let{job:e,ts:i}=n;if(!i){n.ts=t;continue}i+this.opts.lockRenewTime/2<t&&(n.ts=t,r.push(e))}try{r.length&&await this.extendLocks(r)}catch(e){this.emit("error",e)}this.startLockExtenderTimer(e)},this.opts.lockRenewTime/2)))}async whenCurrentJobsFinished(e=!0){this.waiting?await this.blockingConnection.disconnect(e):e=!1,this.asyncFifoQueue&&await this.asyncFifoQueue.waitAll(),e&&await this.blockingConnection.reconnect()}async retryIfFailed(e,t){for(;;)try{return await e()}catch(e){if(this.emit("error",e),!t)return;await this.delay(t)}}async extendLocks(e){try{let t=(await this.client).multi();for(let r of e)await this.scripts.extendLock(r.id,r.token,this.opts.lockDuration,t);let r=await t.exec();for(let[e,t]of r)e&&this.emit("error",Error(`could not renew lock for job ${t}`))}catch(e){this.emit("error",e)}}async moveStalledJobsToWait(){let[e,t]=await this.scripts.moveStalledJobsToWait();t.forEach(e=>this.emit("stalled",e,"active"));let r=[];for(let t=0;t<e.length;t++)r.push(h.o.fromId(this,e[t])),(t+1)%50==0&&(this.notifyFailedJobs(await Promise.all(r)),r.length=0);this.notifyFailedJobs(await Promise.all(r))}notifyFailedJobs(e){e.forEach(e=>this.emit("failed",e,Error("job stalled more than allowable limit"),"active"))}moveLimitedBackToWait(e,t){return this.scripts.moveJobFromActiveToWait(e.id,t)}}},25904:(e,t,r)=>{r.d(t,{W:()=>eh});var n=r(6113),i=r(37909);let s=e=>{if("string"!=typeof e)throw TypeError("invalid pattern");if(e.length>65536)throw TypeError("pattern is too long")},a={"[:alnum:]":["\\p{L}\\p{Nl}\\p{Nd}",!0],"[:alpha:]":["\\p{L}\\p{Nl}",!0],"[:ascii:]":["\\x00-\\x7f",!1],"[:blank:]":["\\p{Zs}\\t",!0],"[:cntrl:]":["\\p{Cc}",!0],"[:digit:]":["\\p{Nd}",!0],"[:graph:]":["\\p{Z}\\p{C}",!0,!0],"[:lower:]":["\\p{Ll}",!0],"[:print:]":["\\p{C}",!0],"[:punct:]":["\\p{P}",!0],"[:space:]":["\\p{Z}\\t\\r\\n\\v\\f",!0],"[:upper:]":["\\p{Lu}",!0],"[:word:]":["\\p{L}\\p{Nl}\\p{Nd}\\p{Pc}",!0],"[:xdigit:]":["A-Fa-f0-9",!1]},o=e=>e.replace(/[[\]\\-]/g,"\\$&"),l=e=>e.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&"),u=e=>e.join(""),c=(e,t)=>{if("["!==e.charAt(t))throw Error("not in a brace expression");let r=[],n=[],i=t+1,s=!1,c=!1,d=!1,h=!1,p=t,f="";e:for(;i<e.length;){let l=e.charAt(i);if(("!"===l||"^"===l)&&i===t+1){h=!0,i++;continue}if("]"===l&&s&&!d){p=i+1;break}if(s=!0,"\\"===l&&!d){d=!0,i++;continue}if("["===l&&!d){for(let[s,[o,l,u]]of Object.entries(a))if(e.startsWith(s,i)){if(f)return["$.",!1,e.length-t,!0];i+=s.length,u?n.push(o):r.push(o),c=c||l;continue e}}if(d=!1,f){l>f?r.push(o(f)+"-"+o(l)):l===f&&r.push(o(l)),f="",i++;continue}if(e.startsWith("-]",i+1)){r.push(o(l+"-")),i+=2;continue}if(e.startsWith("-",i+1)){f=l,i+=2;continue}r.push(o(l)),i++}if(p<i)return["",!1,0,!1];if(!r.length&&!n.length)return["$.",!1,e.length-t,!0];if(0===n.length&&1===r.length&&/^\\?.$/.test(r[0])&&!h){let e=2===r[0].length?r[0].slice(-1):r[0];return[l(e),!1,p-t,!1]}let y="["+(h?"^":"")+u(r)+"]",m="["+(h?"":"^")+u(n)+"]",g=r.length&&n.length?"("+y+"|"+m+")":r.length?y:m;return[g,c,p-t,!0]},d=(e,{windowsPathsNoEscape:t=!1}={})=>t?e.replace(/\[([^\/\\])\]/g,"$1"):e.replace(/((?!\\).|^)\[([^\/\\])\]/g,"$1$2").replace(/\\([^\/])/g,"$1"),h=new Set(["!","?","+","*","@"]),p=e=>h.has(e),f="(?!\\.)",y=new Set(["[","."]),m=new Set(["..","."]),g=new Set("().*{}+?[]^$\\!"),b=e=>e.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&"),S="[^/]",v=S+"*?",E=S+"+?";class k{#e;#t;#r;#n;#i;#s;#a;#o;#l;#u;#c;constructor(e,t,r={}){this.#r=!1,this.#n=[],this.#o=!1,this.#c=!1,this.type=e,e&&(this.#t=!0),this.#i=t,this.#e=this.#i?this.#i.#e:this,this.#l=this.#e===this?r:this.#e.#l,this.#a=this.#e===this?[]:this.#e.#a,"!"!==e||this.#e.#o||this.#a.push(this),this.#s=this.#i?this.#i.#n.length:0}get hasMagic(){if(void 0!==this.#t)return this.#t;for(let e of this.#n)if("string"!=typeof e&&(e.type||e.hasMagic))return this.#t=!0;return this.#t}toString(){return void 0!==this.#u?this.#u:this.type?this.#u=this.type+"("+this.#n.map(e=>String(e)).join("|")+")":this.#u=this.#n.map(e=>String(e)).join("")}#d(){let e;if(this!==this.#e)throw Error("should only call on root");if(this.#o)return this;for(this.toString(),this.#o=!0;e=this.#a.pop();){if("!"!==e.type)continue;let t=e,r=t.#i;for(;r;){for(let n=t.#s+1;!r.type&&n<r.#n.length;n++)for(let t of e.#n){if("string"==typeof t)throw Error("string part in extglob AST??");t.copyIn(r.#n[n])}r=(t=r).#i}}return this}push(...e){for(let t of e)if(""!==t){if("string"!=typeof t&&!(t instanceof k&&t.#i===this))throw Error("invalid part: "+t);this.#n.push(t)}}toJSON(){let e=null===this.type?this.#n.slice().map(e=>"string"==typeof e?e:e.toJSON()):[this.type,...this.#n.map(e=>e.toJSON())];return this.isStart()&&!this.type&&e.unshift([]),this.isEnd()&&(this===this.#e||this.#e.#o&&this.#i?.type==="!")&&e.push({}),e}isStart(){if(this.#e===this)return!0;if(!this.#i?.isStart())return!1;if(0===this.#s)return!0;let e=this.#i;for(let t=0;t<this.#s;t++){let r=e.#n[t];if(!(r instanceof k&&"!"===r.type))return!1}return!0}isEnd(){if(this.#e===this||this.#i?.type==="!")return!0;if(!this.#i?.isEnd())return!1;if(!this.type)return this.#i?.isEnd();let e=this.#i?this.#i.#n.length:0;return this.#s===e-1}copyIn(e){"string"==typeof e?this.push(e):this.push(e.clone(this))}clone(e){let t=new k(this.type,e);for(let e of this.#n)t.copyIn(e);return t}static #h(e,t,r,n){let i=!1,s=!1,a=-1,o=!1;if(null===t.type){let l=r,u="";for(;l<e.length;){let r=e.charAt(l++);if(i||"\\"===r){i=!i,u+=r;continue}if(s){l===a+1?("^"===r||"!"===r)&&(o=!0):"]"!==r||l===a+2&&o||(s=!1),u+=r;continue}if("["===r){s=!0,a=l,o=!1,u+=r;continue}if(!n.noext&&p(r)&&"("===e.charAt(l)){t.push(u),u="";let i=new k(r,t);l=k.#h(e,i,l,n),t.push(i);continue}u+=r}return t.push(u),l}let l=r+1,u=new k(null,t),c=[],d="";for(;l<e.length;){let r=e.charAt(l++);if(i||"\\"===r){i=!i,d+=r;continue}if(s){l===a+1?("^"===r||"!"===r)&&(o=!0):"]"!==r||l===a+2&&o||(s=!1),d+=r;continue}if("["===r){s=!0,a=l,o=!1,d+=r;continue}if(p(r)&&"("===e.charAt(l)){u.push(d),d="";let t=new k(r,u);u.push(t),l=k.#h(e,t,l,n);continue}if("|"===r){u.push(d),d="",c.push(u),u=new k(null,t);continue}if(")"===r)return""===d&&0===t.#n.length&&(t.#c=!0),u.push(d),d="",t.push(...c,u),l;d+=r}return t.type=null,t.#t=void 0,t.#n=[e.substring(r-1)],l}static fromGlob(e,t={}){let r=new k(null,void 0,t);return k.#h(e,r,0,t),r}toMMPattern(){if(this!==this.#e)return this.#e.toMMPattern();let e=this.toString(),[t,r,n,i]=this.toRegExpSource(),s=n||this.#t||this.#l.nocase&&!this.#l.nocaseMagicOnly&&e.toUpperCase()!==e.toLowerCase();if(!s)return r;let a=(this.#l.nocase?"i":"")+(i?"u":"");return Object.assign(RegExp(`^${t}$`,a),{_src:t,_glob:e})}toRegExpSource(e){let t=e??!!this.#l.dot;if(this.#e===this&&this.#d(),!this.type){let r=this.isStart()&&this.isEnd(),n=this.#n.map(t=>{let[n,i,s,a]="string"==typeof t?k.#p(t,this.#t,r):t.toRegExpSource(e);return this.#t=this.#t||s,this.#r=this.#r||a,n}).join(""),i="";if(this.isStart()&&"string"==typeof this.#n[0]){let r=1===this.#n.length&&m.has(this.#n[0]);if(!r){let r=t&&y.has(n.charAt(0))||n.startsWith("\\.")&&y.has(n.charAt(2))||n.startsWith("\\.\\.")&&y.has(n.charAt(4)),s=!t&&!e&&y.has(n.charAt(0));i=r?"(?!(?:^|/)\\.\\.?(?:$|/))":s?f:""}}let s="";this.isEnd()&&this.#e.#o&&this.#i?.type==="!"&&(s="(?:$|\\/)");let a=i+n+s;return[a,d(n),this.#t=!!this.#t,this.#r]}let r="*"===this.type||"+"===this.type,n="!"===this.type?"(?:(?!(?:":"(?:",i=this.#f(t);if(this.isStart()&&this.isEnd()&&!i&&"!"!==this.type){let e=this.toString();return this.#n=[e],this.type=null,this.#t=void 0,[e,d(this.toString()),!1,!1]}let s=!r||e||t||!f?"":this.#f(!0);s===i&&(s=""),s&&(i=`(?:${i})(?:${s})*?`);let a="";if("!"===this.type&&this.#c)a=(this.isStart()&&!t?f:"")+E;else{let r="!"===this.type?"))"+(!this.isStart()||t||e?"":f)+v+")":"@"===this.type?")":"?"===this.type?")?":"+"===this.type&&s?")":"*"===this.type&&s?")?":`)${this.type}`;a=n+i+r}return[a,d(i),this.#t=!!this.#t,this.#r]}#f(e){return this.#n.map(t=>{if("string"==typeof t)throw Error("string type in extglob ast??");let[r,n,i,s]=t.toRegExpSource(e);return this.#r=this.#r||s,r}).filter(e=>!(this.isStart()&&this.isEnd())||!!e).join("|")}static #p(e,t,r=!1){let n=!1,i="",s=!1;for(let a=0;a<e.length;a++){let o=e.charAt(a);if(n){n=!1,i+=(g.has(o)?"\\":"")+o;continue}if("\\"===o){a===e.length-1?i+="\\\\":n=!0;continue}if("["===o){let[r,n,o,l]=c(e,a);if(o){i+=r,s=s||n,a+=o-1,t=t||l;continue}}if("*"===o){r&&"*"===e?i+=E:i+=v,t=!0;continue}if("?"===o){i+=S,t=!0;continue}i+=b(o)}return[i,d(e),!!t,s]}}let K=(e,t,r={})=>(s(t),(!!r.nocomment||"#"!==t.charAt(0))&&new Z(t,r).match(e)),w=/^\*+([^+@!?\*\[\(]*)$/,I=e=>t=>!t.startsWith(".")&&t.endsWith(e),x=e=>t=>t.endsWith(e),A=e=>(e=e.toLowerCase(),t=>!t.startsWith(".")&&t.toLowerCase().endsWith(e)),T=e=>(e=e.toLowerCase(),t=>t.toLowerCase().endsWith(e)),j=/^\*+\.\*+$/,R=e=>!e.startsWith(".")&&e.includes("."),_=e=>"."!==e&&".."!==e&&e.includes("."),C=/^\.\*+$/,O=e=>"."!==e&&".."!==e&&e.startsWith("."),P=/^\*+$/,D=e=>0!==e.length&&!e.startsWith("."),M=e=>0!==e.length&&"."!==e&&".."!==e,N=/^\?+([^+@!?\*\[\(]*)?$/,L=([e,t=""])=>{let r=G([e]);return t?(t=t.toLowerCase(),e=>r(e)&&e.toLowerCase().endsWith(t)):r},F=([e,t=""])=>{let r=$([e]);return t?(t=t.toLowerCase(),e=>r(e)&&e.toLowerCase().endsWith(t)):r},V=([e,t=""])=>{let r=$([e]);return t?e=>r(e)&&e.endsWith(t):r},J=([e,t=""])=>{let r=G([e]);return t?e=>r(e)&&e.endsWith(t):r},G=([e])=>{let t=e.length;return e=>e.length===t&&!e.startsWith(".")},$=([e])=>{let t=e.length;return e=>e.length===t&&"."!==e&&".."!==e},Y="object"==typeof process&&process?"object"==typeof process.env&&process.env&&process.env.__MINIMATCH_TESTING_PLATFORM__||process.platform:"posix",B={win32:{sep:"\\"},posix:{sep:"/"}},z="win32"===Y?B.win32.sep:B.posix.sep;K.sep=z;let H=Symbol("globstar **");K.GLOBSTAR=H,K.filter=(e,t={})=>r=>K(r,e,t);let W=(e,t={})=>Object.assign({},e,t);K.defaults=e=>{if(!e||"object"!=typeof e||!Object.keys(e).length)return K;let t=K;return Object.assign((r,n,i={})=>t(r,n,W(e,i)),{Minimatch:class extends t.Minimatch{constructor(t,r={}){super(t,W(e,r))}static defaults(r){return t.defaults(W(e,r)).Minimatch}},AST:class extends t.AST{constructor(t,r,n={}){super(t,r,W(e,n))}static fromGlob(r,n={}){return t.AST.fromGlob(r,W(e,n))}},unescape:(r,n={})=>t.unescape(r,W(e,n)),escape:(r,n={})=>t.escape(r,W(e,n)),filter:(r,n={})=>t.filter(r,W(e,n)),defaults:r=>t.defaults(W(e,r)),makeRe:(r,n={})=>t.makeRe(r,W(e,n)),braceExpand:(r,n={})=>t.braceExpand(r,W(e,n)),match:(r,n,i={})=>t.match(r,n,W(e,i)),sep:t.sep,GLOBSTAR:H})};let q=(e,t={})=>(s(e),t.nobrace||!/\{(?:(?!\{).)*\}/.test(e))?[e]:i(e);K.braceExpand=q,K.makeRe=(e,t={})=>new Z(e,t).makeRe(),K.match=(e,t,r={})=>{let n=new Z(t,r);return e=e.filter(e=>n.match(e)),n.options.nonull&&!e.length&&e.push(t),e};let U=/[?*]|[+@!]\(.*?\)|\[|\]/,Q=e=>e.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&");class Z{constructor(e,t={}){s(e),t=t||{},this.options=t,this.pattern=e,this.platform=t.platform||Y,this.isWindows="win32"===this.platform,this.windowsPathsNoEscape=!!t.windowsPathsNoEscape||!1===t.allowWindowsEscape,this.windowsPathsNoEscape&&(this.pattern=this.pattern.replace(/\\/g,"/")),this.preserveMultipleSlashes=!!t.preserveMultipleSlashes,this.regexp=null,this.negate=!1,this.nonegate=!!t.nonegate,this.comment=!1,this.empty=!1,this.partial=!!t.partial,this.nocase=!!this.options.nocase,this.windowsNoMagicRoot=void 0!==t.windowsNoMagicRoot?t.windowsNoMagicRoot:!!(this.isWindows&&this.nocase),this.globSet=[],this.globParts=[],this.set=[],this.make()}hasMagic(){if(this.options.magicalBraces&&this.set.length>1)return!0;for(let e of this.set)for(let t of e)if("string"!=typeof t)return!0;return!1}debug(...e){}make(){let e=this.pattern,t=this.options;if(!t.nocomment&&"#"===e.charAt(0)){this.comment=!0;return}if(!e){this.empty=!0;return}this.parseNegate(),this.globSet=[...new Set(this.braceExpand())],t.debug&&(this.debug=(...e)=>console.error(...e)),this.debug(this.pattern,this.globSet);let r=this.globSet.map(e=>this.slashSplit(e));this.globParts=this.preprocess(r),this.debug(this.pattern,this.globParts);let n=this.globParts.map((e,t,r)=>{if(this.isWindows&&this.windowsNoMagicRoot){let t=""===e[0]&&""===e[1]&&("?"===e[2]||!U.test(e[2]))&&!U.test(e[3]),r=/^[a-z]:/i.test(e[0]);if(t)return[...e.slice(0,4),...e.slice(4).map(e=>this.parse(e))];if(r)return[e[0],...e.slice(1).map(e=>this.parse(e))]}return e.map(e=>this.parse(e))});if(this.debug(this.pattern,n),this.set=n.filter(e=>-1===e.indexOf(!1)),this.isWindows)for(let e=0;e<this.set.length;e++){let t=this.set[e];""===t[0]&&""===t[1]&&"?"===this.globParts[e][2]&&"string"==typeof t[3]&&/^[a-z]:$/i.test(t[3])&&(t[2]="?")}this.debug(this.pattern,this.set)}preprocess(e){if(this.options.noglobstar)for(let t=0;t<e.length;t++)for(let r=0;r<e[t].length;r++)"**"===e[t][r]&&(e[t][r]="*");let{optimizationLevel:t=1}=this.options;return t>=2?(e=this.firstPhasePreProcess(e),e=this.secondPhasePreProcess(e)):e=t>=1?this.levelOneOptimize(e):this.adjascentGlobstarOptimize(e),e}adjascentGlobstarOptimize(e){return e.map(e=>{let t=-1;for(;-1!==(t=e.indexOf("**",t+1));){let r=t;for(;"**"===e[r+1];)r++;r!==t&&e.splice(t,r-t)}return e})}levelOneOptimize(e){return e.map(e=>0===(e=e.reduce((e,t)=>{let r=e[e.length-1];return"**"===t&&"**"===r||(".."===t&&r&&".."!==r&&"."!==r&&"**"!==r?e.pop():e.push(t)),e},[])).length?[""]:e)}levelTwoFileOptimize(e){Array.isArray(e)||(e=this.slashSplit(e));let t=!1;do{if(t=!1,!this.preserveMultipleSlashes){for(let r=1;r<e.length-1;r++){let n=e[r];(1!==r||""!==n||""!==e[0])&&("."===n||""===n)&&(t=!0,e.splice(r,1),r--)}"."===e[0]&&2===e.length&&("."===e[1]||""===e[1])&&(t=!0,e.pop())}let r=0;for(;-1!==(r=e.indexOf("..",r+1));){let n=e[r-1];n&&"."!==n&&".."!==n&&"**"!==n&&(t=!0,e.splice(r-1,2),r-=2)}}while(t);return 0===e.length?[""]:e}firstPhasePreProcess(e){let t=!1;do for(let r of(t=!1,e)){let n=-1;for(;-1!==(n=r.indexOf("**",n+1));){let i=n;for(;"**"===r[i+1];)i++;i>n&&r.splice(n+1,i-n);let s=r[n+1],a=r[n+2],o=r[n+3];if(".."!==s||!a||"."===a||".."===a||!o||"."===o||".."===o)continue;t=!0,r.splice(n,1);let l=r.slice(0);l[n]="**",e.push(l),n--}if(!this.preserveMultipleSlashes){for(let e=1;e<r.length-1;e++){let n=r[e];(1!==e||""!==n||""!==r[0])&&("."===n||""===n)&&(t=!0,r.splice(e,1),e--)}"."===r[0]&&2===r.length&&("."===r[1]||""===r[1])&&(t=!0,r.pop())}let i=0;for(;-1!==(i=r.indexOf("..",i+1));){let e=r[i-1];if(e&&"."!==e&&".."!==e&&"**"!==e){t=!0;let e=1===i&&"**"===r[i+1],n=e?["."]:[];r.splice(i-1,2,...n),0===r.length&&r.push(""),i-=2}}}while(t);return e}secondPhasePreProcess(e){for(let t=0;t<e.length-1;t++)for(let r=t+1;r<e.length;r++){let n=this.partsMatch(e[t],e[r],!this.preserveMultipleSlashes);n&&(e[t]=n,e[r]=[])}return e.filter(e=>e.length)}partsMatch(e,t,r=!1){let n=0,i=0,s=[],a="";for(;n<e.length&&i<t.length;)if(e[n]===t[i])s.push("b"===a?t[i]:e[n]),n++,i++;else if(r&&"**"===e[n]&&t[i]===e[n+1])s.push(e[n]),n++;else if(r&&"**"===t[i]&&e[n]===t[i+1])s.push(t[i]),i++;else if("*"===e[n]&&t[i]&&(this.options.dot||!t[i].startsWith("."))&&"**"!==t[i]){if("b"===a)return!1;a="a",s.push(e[n]),n++,i++}else{if("*"!==t[i]||!e[n]||!this.options.dot&&e[n].startsWith(".")||"**"===e[n]||"a"===a)return!1;a="b",s.push(t[i]),n++,i++}return e.length===t.length&&s}parseNegate(){if(this.nonegate)return;let e=this.pattern,t=!1,r=0;for(let n=0;n<e.length&&"!"===e.charAt(n);n++)t=!t,r++;r&&(this.pattern=e.slice(r)),this.negate=t}matchOne(e,t,r=!1){let n=this.options;if(this.isWindows){let r="string"==typeof e[0]&&/^[a-z]:$/i.test(e[0]),n=!r&&""===e[0]&&""===e[1]&&"?"===e[2]&&/^[a-z]:$/i.test(e[3]),i="string"==typeof t[0]&&/^[a-z]:$/i.test(t[0]),s=!i&&""===t[0]&&""===t[1]&&"?"===t[2]&&"string"==typeof t[3]&&/^[a-z]:$/i.test(t[3]),a=n?3:r?0:void 0,o=s?3:i?0:void 0;if("number"==typeof a&&"number"==typeof o){let[r,n]=[e[a],t[o]];r.toLowerCase()===n.toLowerCase()&&(t[o]=r,o>a?t=t.slice(o):a>o&&(e=e.slice(a)))}}let{optimizationLevel:i=1}=this.options;i>=2&&(e=this.levelTwoFileOptimize(e)),this.debug("matchOne",this,{file:e,pattern:t}),this.debug("matchOne",e.length,t.length);for(var s=0,a=0,o=e.length,l=t.length;s<o&&a<l;s++,a++){let i;this.debug("matchOne loop");var u=t[a],c=e[s];if(this.debug(t,u,c),!1===u)return!1;if(u===H){this.debug("GLOBSTAR",[t,u,c]);var d=s,h=a+1;if(h===l){for(this.debug("** at the end");s<o;s++)if("."===e[s]||".."===e[s]||!n.dot&&"."===e[s].charAt(0))return!1;return!0}for(;d<o;){var p=e[d];if(this.debug("\nglobstar while",e,d,t,h,p),this.matchOne(e.slice(d),t.slice(h),r))return this.debug("globstar found match!",d,o,p),!0;if("."===p||".."===p||!n.dot&&"."===p.charAt(0)){this.debug("dot detected!",e,d,t,h);break}this.debug("globstar swallow a segment, and continue"),d++}if(r&&(this.debug("\n>>> no match, partial?",e,d,t,h),d===o))return!0;return!1}if("string"==typeof u?(i=c===u,this.debug("string match",u,c,i)):(i=u.test(c),this.debug("pattern match",u,c,i)),!i)return!1}if(s===o&&a===l)return!0;if(s===o)return r;if(a===l)return s===o-1&&""===e[s];throw Error("wtf?")}braceExpand(){return q(this.pattern,this.options)}parse(e){let t;s(e);let r=this.options;if("**"===e)return H;if(""===e)return"";let n=null;(t=e.match(P))?n=r.dot?M:D:(t=e.match(w))?n=(r.nocase?r.dot?T:A:r.dot?x:I)(t[1]):(t=e.match(N))?n=(r.nocase?r.dot?F:L:r.dot?V:J)(t):(t=e.match(j))?n=r.dot?_:R:(t=e.match(C))&&(n=O);let i=k.fromGlob(e,this.options).toMMPattern();return n?Object.assign(i,{test:n}):i}makeRe(){if(this.regexp||!1===this.regexp)return this.regexp;let e=this.set;if(!e.length)return this.regexp=!1,this.regexp;let t=this.options,r=t.noglobstar?"[^/]*?":t.dot?"(?:(?!(?:\\/|^)(?:\\.{1,2})($|\\/)).)*?":"(?:(?!(?:\\/|^)\\.).)*?",n=new Set(t.nocase?["i"]:[]),i=e.map(e=>{let t=e.map(e=>{if(e instanceof RegExp)for(let t of e.flags.split(""))n.add(t);return"string"==typeof e?Q(e):e===H?H:e._src});return t.forEach((e,n)=>{let i=t[n+1],s=t[n-1];e===H&&s!==H&&(void 0===s?void 0!==i&&i!==H?t[n+1]="(?:\\/|"+r+"\\/)?"+i:t[n]=r:void 0===i?t[n-1]=s+"(?:\\/|"+r+")?":i!==H&&(t[n-1]=s+"(?:\\/|\\/"+r+"\\/)"+i,t[n+1]=H))}),t.filter(e=>e!==H).join("/")}).join("|"),[s,a]=e.length>1?["(?:",")"]:["",""];i="^"+s+i+a+"$",this.negate&&(i="^(?!"+i+").+$");try{this.regexp=new RegExp(i,[...n].join(""))}catch(e){this.regexp=!1}return this.regexp}slashSplit(e){return this.preserveMultipleSlashes?e.split("/"):this.isWindows&&/^\/\/[^\/]+/.test(e)?["",...e.split(/\/+/)]:e.split(/\/+/)}match(e,t=this.partial){if(this.debug("match",e,this.pattern),this.comment)return!1;if(this.empty)return""===e;if("/"===e&&t)return!0;let r=this.options;this.isWindows&&(e=e.split("\\").join("/"));let n=this.slashSplit(e);this.debug(this.pattern,"split",n);let i=this.set;this.debug(this.pattern,"set",i);let s=n[n.length-1];if(!s)for(let e=n.length-2;!s&&e>=0;e--)s=n[e];for(let e=0;e<i.length;e++){let a=i[e],o=n;r.matchBase&&1===a.length&&(o=[s]);let l=this.matchOne(o,a,t);if(l){if(r.flipNegate)return!0;return!this.negate}}return!r.flipNegate&&this.negate}static defaults(e){return K.defaults(e).Minimatch}}K.AST=k,K.Minimatch=Z,K.escape=(e,{windowsPathsNoEscape:t=!1}={})=>t?e.replace(/[?*()[\]]/g,"[$&]"):e.replace(/[?*()[\]\\]/g,"\\$&"),K.unescape=d;var X=r(1489),ee=r(71017),et=r(57147),er=r(73837);e=r.hmd(e);let en=(0,er.promisify)(et.readFile),ei=(0,er.promisify)(et.readdir),es={dot:!0,silent:!1},ea=/^[-]{2,3}[ \t]*@include[ \t]+(["'])(.+?)\1[; \t\n]*$/m,eo=/^\s*[\r\n]/gm;class el extends Error{constructor(e,t,r=[],n,i=0){super(e),this.name=this.constructor.name,Error.captureStackTrace(this,this.constructor),this.includes=r,this.line=null!=n?n:0,this.position=i}}let eu=e=>{for(let t of(Array.isArray(e)||(e=[e]),e))if(new Z(t,es).hasMagic())return!0;return!1},ec=e=>e&&["~","<"].includes(e[0]),ed=e=>eu(e);class eh{constructor(){this.pathMapper=new Map,this.clientScripts=new WeakMap,this.commandCache=new Map,this.rootPath=function(){for(let t of e.paths||[])try{let e=ee.dirname(t);return et.accessSync(t,et.constants.F_OK),e}catch(e){}return""}(),this.pathMapper.set("~",this.rootPath),this.pathMapper.set("rootDir",this.rootPath),this.pathMapper.set("base",__dirname)}addPathMapping(e,t){let r;if(ec(t))r=this.resolvePath(t);else{let e=function(){var e,t,r;let n=Error.prepareStackTrace,i="";try{Error.prepareStackTrace=(e,t)=>t;let n=Error().stack,s=null===(e=n.shift())||void 0===e?void 0:e.getFileName();for(;n.length&&(i=null!==(r=null===(t=n.shift())||void 0===t?void 0:t.getFileName())&&void 0!==r?r:"",s===i););}catch(e){}finally{Error.prepareStackTrace=n}return i}(),n=ee.dirname(e);r=ee.normalize(ee.resolve(n,t))}let n=r.length-1;r[n]===ee.sep&&(r=r.substr(0,n)),this.pathMapper.set(e,r)}resolvePath(e,t=[]){let r=e[0];if("~"===r)e=ee.join(this.rootPath,e.substr(2));else if("<"===r){let r=e.indexOf(">");if(r>0){let n=e.substring(1,r),i=this.pathMapper.get(n);if(!i)throw new el(`No path mapping found for "${n}"`,e,t);e=ee.join(i,e.substring(r+1))}}return ee.normalize(e)}async resolveDependencies(e,t,r=!1,n=[]){let i;if(t=null!=t?t:new Map,n.includes(e.path))throw new el(`circular reference: "${e.path}"`,e.path,n);function s(t,r){let i=function(e,t){let r=e.indexOf(t),n=e.slice(0,r).split("\n");return{line:n.length,column:n[n.length-1].length+t.indexOf("@include")+1}}(e.content,r);throw new el(t,e.path,n,i.line,i.column)}n.push(e.path);let a=e.content;for(;null!==(i=ea.exec(a));){let r;let[o,,l]=i,u=ec(l)?this.resolvePath(ep(l),n):ee.resolve(ee.dirname(e.path),ep(l));if(ed(u)){let e=await ey(u);r=e.map(e=>ee.resolve(e))}else r=[u];0===(r=r.filter(e=>".lua"===ee.extname(e))).length&&s(`include not found: "${l}"`,o);let c=[];for(let i=0;i<r.length;i++){let a;let u=r[i],d=e.includes.find(e=>e.path===u);d&&s(`file "${l}" already included in "${e.path}"`,o);let h=t.get(u);if(h)a=h.token;else{let{name:e,numberOfKeys:r}=ef(u),n="";try{let e=await en(u,{flag:"r"});n=e.toString()}catch(e){if("ENOENT"===e.code)s(`include not found: "${l}"`,o);else throw e}a=em(u),h={name:e,numberOfKeys:r,path:u,content:n,token:a,includes:[]},t.set(u,h)}c.push(a),e.includes.push(h),await this.resolveDependencies(h,t,!0,n)}let d=c.join("\n");a=a.replace(o,d)}e.content=a,r?t.set(e.path,e):t.set(e.name,e),n.pop()}async parseScript(e,t,r){let{name:n,numberOfKeys:i}=ef(e),s=null==r?void 0:r.get(n);if((null==s?void 0:s.content)===t)return s;let a={path:e,token:em(e),content:t,name:n,numberOfKeys:i,includes:[]};return await this.resolveDependencies(a,r),a}interpolate(e,t){t=t||new Set;let r=e.content;return e.includes.forEach(e=>{let n=t.has(e.path),i=this.interpolate(e,t),s=n?"":i;r=s?eg(r=r.replace(e.token,s),e.token,""):eg(r,e.token,""),t.add(e.path)}),r}async loadCommand(e,t){e=ee.resolve(e);let{name:r}=ef(e),n=null==t?void 0:t.get(r);if(!n){let r=(await en(e)).toString();n=await this.parseScript(e,r,t)}let i=this.interpolate(n).replace(eo,""),{name:s,numberOfKeys:a}=n;return{name:s,options:{numberOfKeys:a,lua:i}}}async loadScripts(e,t){e=ee.normalize(e||__dirname);let r=this.commandCache.get(e);if(r)return r;let n=await ei(e),i=n.filter(e=>".lua"===ee.extname(e));if(0===i.length)throw new el("No .lua files found!",e,[]);r=[],t=null!=t?t:new Map;for(let n=0;n<i.length;n++){let s=ee.join(e,i[n]),a=await this.loadCommand(s,t);r.push(a)}return this.commandCache.set(e,r),r}async load(e,t,r){let n=this.clientScripts.get(e);if(n||(n=new Set,this.clientScripts.set(e,n)),!n.has(t)){n.add(t);let i=await this.loadScripts(t,null!=r?r:new Map);i.forEach(t=>{e[t.name]||e.defineCommand(t.name,t.options)})}}clearCache(){this.commandCache.clear()}}function ep(e,t="lua"){let r=ee.extname(e);return r&&"."!==r?e:(t&&"."!==t[0]&&(t=`.${t}`),`${e}${t}`)}function ef(e){let t=ee.basename(e,".lua"),[r,n]=t.split("-"),i=n?parseInt(n,10):void 0;return{name:r,numberOfKeys:i}}async function ey(e){return X.glob(e,{dot:!0})}function em(e){return`@@${(0,n.createHash)("sha1").update(e).digest("hex")}`}function eg(e,t,r){return e.replace(RegExp(t,"g"),r)}},70344:(e,t,r)=>{var n,i,s,a;r.d(t,{uv:()=>n,jK:()=>i,d$:()=>s}),function(e){e[e.Init=0]="Init",e[e.Start=1]="Start",e[e.Stop=2]="Stop"}(n||(n={})),function(e){e[e.JobNotExist=-1]="JobNotExist",e[e.JobLockNotExist=-2]="JobLockNotExist",e[e.JobNotInState=-3]="JobNotInState",e[e.JobPendingDependencies=-4]="JobPendingDependencies",e[e.ParentJobNotExist=-5]="ParentJobNotExist",e[e.JobLockMismatch=-6]="JobLockMismatch",e[e.ParentJobCannotBeReplaced=-7]="ParentJobCannotBeReplaced"}(i||(i={})),function(e){e[e.Completed=0]="Completed",e[e.Error=1]="Error",e[e.Failed=2]="Failed",e[e.InitFailed=3]="InitFailed",e[e.InitCompleted=4]="InitCompleted",e[e.Log=5]="Log",e[e.MoveToDelayed=6]="MoveToDelayed",e[e.Progress=7]="Progress",e[e.Update=8]="Update"}(s||(s={})),function(e){e[e.ONE_MINUTE=1]="ONE_MINUTE",e[e.FIVE_MINUTES=5]="FIVE_MINUTES",e[e.FIFTEEN_MINUTES=15]="FIFTEEN_MINUTES",e[e.THIRTY_MINUTES=30]="THIRTY_MINUTES",e[e.ONE_HOUR=60]="ONE_HOUR",e[e.ONE_WEEK=10080]="ONE_WEEK",e[e.TWO_WEEKS=20160]="TWO_WEEKS",e[e.ONE_MONTH=80640]="ONE_MONTH"}(a||(a={}))},73122:(e,t,r)=>{r.d(t,{ci:()=>p,Cc:()=>f.C}),r(85288),r(63313),r(70344);var n,i,s=r(11699);(function(e){e[e.Idle=0]="Idle",e[e.Started=1]="Started",e[e.Terminating=2]="Terminating",e[e.Errored=3]="Errored"})(n||(n={})),r(82361);var a=r(1712),o=r.n(a),l=r(84929);r(63709);var u=r(61743);class c extends u.W{getJob(e){return this.Job.fromId(this,e)}commandByType(e,t,r){return e.map(e=>{e="waiting"===e?"wait":e;let n=this.toKey(e);switch(e){case"completed":case"failed":case"delayed":case"prioritized":case"repeat":case"waiting-children":return r(n,t?"zcard":"zrange");case"active":case"wait":case"paused":return r(n,t?"llen":"lrange")}})}get Job(){return l.o}sanitizeJobTypes(e){let t="string"==typeof e?[e]:e;if(Array.isArray(t)&&t.length>0){let e=[...t];return -1!==e.indexOf("waiting")&&e.push("paused"),[...new Set(e)]}return["active","completed","delayed","failed","paused","prioritized","waiting","waiting-children"]}async count(){let e=await this.getJobCountByTypes("waiting","paused","delayed","prioritized","waiting-children");return e}async getRateLimitTtl(){let e=await this.client;return e.pttl(this.keys.limiter)}async getJobCountByTypes(...e){let t=await this.getJobCounts(...e);return Object.values(t).reduce((e,t)=>e+t,0)}async getJobCounts(...e){let t=this.sanitizeJobTypes(e),r=await this.scripts.getCounts(t),n={};return r.forEach((e,r)=>{n[t[r]]=e||0}),n}getJobState(e){return this.scripts.getState(e)}getCompletedCount(){return this.getJobCountByTypes("completed")}getFailedCount(){return this.getJobCountByTypes("failed")}getDelayedCount(){return this.getJobCountByTypes("delayed")}getActiveCount(){return this.getJobCountByTypes("active")}getPrioritizedCount(){return this.getJobCountByTypes("prioritized")}getWaitingCount(){return this.getJobCountByTypes("waiting")}getWaitingChildrenCount(){return this.getJobCountByTypes("waiting-children")}getWaiting(e=0,t=-1){return this.getJobs(["waiting"],e,t,!0)}getWaitingChildren(e=0,t=-1){return this.getJobs(["waiting-children"],e,t,!0)}getActive(e=0,t=-1){return this.getJobs(["active"],e,t,!0)}getDelayed(e=0,t=-1){return this.getJobs(["delayed"],e,t,!0)}getPrioritized(e=0,t=-1){return this.getJobs(["prioritized"],e,t,!0)}getCompleted(e=0,t=-1){return this.getJobs(["completed"],e,t,!1)}getFailed(e=0,t=-1){return this.getJobs(["failed"],e,t,!1)}async getDependencies(e,t,r,n){let i=this.toKey("processed"==t?`${e}:processed`:`${e}:dependencies`),{items:s,total:a,jobs:o}=await this.scripts.paginate(i,{start:r,end:n,fetchJobs:!0});return{items:s,jobs:o,total:a}}async getRanges(e,t=0,r=1,n=!1){let i=[];this.commandByType(e,!1,(e,t)=>{switch(t){case"lrange":i.push("lrange");break;case"zrange":i.push("zrange")}});let s=await this.scripts.getRanges(e,t,r,n),a=[];return s.forEach((e,t)=>{let r=e||[];a=n&&"lrange"===i[t]?a.concat(r.reverse()):a.concat(r)}),[...new Set(a)]}async getJobs(e,t=0,r=-1,n=!1){let i=this.sanitizeJobTypes(e),s=await this.getRanges(i,t,r,n);return Promise.all(s.map(e=>this.Job.fromId(this,e)))}async getJobLogs(e,t=0,r=-1,n=!0){let i=await this.client,s=i.multi(),a=this.toKey(e+":logs");n?s.lrange(a,t,r):s.lrange(a,-(r+1),-(t+1)),s.llen(a);let o=await s.exec();return n||o[0][1].reverse(),{logs:o[0][1],count:o[1][1]}}async baseGetClients(e){let t=await this.client,r=await t.client("LIST");try{let t=this.parseClientList(r,e);return t}catch(e){if(!s.aV.test(e.message))throw e;return[]}}getWorkers(){let e=`${this.clientName()}`,t=`${this.clientName()}:w:`;return this.baseGetClients(r=>r&&(r===e||r.startsWith(t)))}async getQueueEvents(){let e=`${this.clientName()}${s.oh}`;return this.baseGetClients(t=>t===e)}async getMetrics(e,t=0,r=-1){let n=await this.client,i=this.toKey(`metrics:${e}`),s=`${i}:data`,a=n.multi();a.hmget(i,"count","prevTS","prevCount"),a.lrange(s,t,r),a.llen(s);let[o,l,u]=await a.exec(),[c,[d,h,p]]=o,[f,y]=l,[m,g]=u;if(c||f)throw c||f||m;return{meta:{count:parseInt(d||"0",10),prevTS:parseInt(h||"0",10),prevCount:parseInt(p||"0",10)},data:y,count:g}}parseClientList(e,t){let r=e.split("\n"),n=[];return r.forEach(e=>{let r={},i=e.split(" ");i.forEach(function(e){let t=e.indexOf("="),n=e.substring(0,t),i=e.substring(t+1);r[n]=i});let s=r.name;t(s)&&(r.name=this.name,r.rawname=s,n.push(r))}),n}}var d=r(96124),h=r(51306);class p extends c{constructor(e,t,r){var n;super(e,Object.assign({blockingConnection:!1},t),r),this.token=(0,d.Z)(),this.jobsOpts=null!==(n=o()(t,"defaultJobOptions"))&&void 0!==n?n:{},this.waitUntilReady().then(e=>{this.closing||e.hset(this.keys.meta,"opts.maxLenEvents",o()(t,"streams.events.maxLen",1e4))}).catch(e=>{})}emit(e,...t){return super.emit(e,...t)}off(e,t){return super.off(e,t),this}on(e,t){return super.on(e,t),this}once(e,t){return super.once(e,t),this}get defaultJobOptions(){return Object.assign({},this.jobsOpts)}get repeat(){return new Promise(async e=>{this._repeat||(this._repeat=new h.w(this.name,Object.assign(Object.assign({},this.opts),{connection:await this.client})),this._repeat.on("error",e=>this.emit.bind(this,e))),e(this._repeat)})}async add(e,t,r){if(r&&r.repeat)return(await this.repeat).addNextRepeatableJob(e,t,Object.assign(Object.assign({},this.jobsOpts),r),!0);{let n=null==r?void 0:r.jobId;if("0"==n||(null==n?void 0:n.startsWith("0:")))throw Error("JobId cannot be '0' or start with 0:");let i=await this.Job.create(this,e,t,Object.assign(Object.assign(Object.assign({},this.jobsOpts),r),{jobId:n}));return this.emit("waiting",i),i}}addBulk(e){return this.Job.createBulk(this,e.map(e=>{var t;return{name:e.name,data:e.data,opts:Object.assign(Object.assign(Object.assign({},this.jobsOpts),e.opts),{jobId:null===(t=e.opts)||void 0===t?void 0:t.jobId})}}))}async pause(){await this.scripts.pause(!0),this.emit("paused")}async close(){return!this.closing&&this._repeat&&await this._repeat.close(),super.close()}async resume(){await this.scripts.pause(!1),this.emit("resumed")}async isPaused(){let e=await this.client,t=await e.hexists(this.keys.meta,"paused");return 1===t}async getRepeatableJobs(e,t,r){return(await this.repeat).getRepeatableJobs(e,t,r)}async removeRepeatable(e,t,r){let n=await this.repeat,i=await n.removeRepeatable(e,t,r);return!i}async removeRepeatableByKey(e){let t=await this.repeat,r=await t.removeRepeatableByKey(e);return!r}remove(e,{removeChildren:t=!0}={}){return this.scripts.remove(e,t)}async updateJobProgress(e,t){return this.scripts.updateProgress(e,t)}async addJobLog(e,t,r){return l.o.addJobLog(this,e,t,r)}drain(e=!1){return this.scripts.drain(e)}async clean(e,t,r="completed"){let n=t||1/0,i=Math.min(1e4,n),s=Date.now()-e,a=0,o=[];for(;a<n;){let e=await this.scripts.cleanJobsInSet(r,s,i);if(this.emit("cleaned",e,r),a+=e.length,o.push(...e),e.length<i)break}return o}async obliterate(e){await this.pause();let t=0;do t=await this.scripts.obliterate(Object.assign({force:!1,count:1e3},e));while(t)}async retryJobs(e={}){let t=0;do t=await this.scripts.retryJobs(e.state,e.count,e.timestamp);while(t)}async promoteJobs(e={}){let t=0;do t=await this.scripts.promoteJobs(e.count);while(t)}async trimEvents(e){let t=await this.client;return t.xtrim(this.keys.events,"MAXLEN","~",e)}async removeDeprecatedPriorityKey(){let e=await this.client;return e.del(this.toKey("priority"))}}r(22968),r(34676);var f=r(61389);new(r(25904)).W,function(e){e.blocking="blocking",e.normal="normal"}(i||(i={}))},11699:(e,t,r)=>{r.d(t,{Hh:()=>b,J3:()=>v,LG:()=>f,OV:()=>h,TJ:()=>s,VZ:()=>u,WE:()=>E,Y1:()=>d,Y3:()=>a,Zm:()=>S,aV:()=>m,gw:()=>c,iF:()=>o,oh:()=>k,pV:()=>y,xP:()=>p,xb:()=>l,yf:()=>g}),r(26277);var n=r(27132),i=r(40342);let s={value:null};function a(e,t,r){try{return e.apply(t,r)}catch(e){return s.value=e,s}}function o(e){return Buffer.byteLength(e,"utf8")}function l(e){for(let t in e)if(Object.prototype.hasOwnProperty.call(e,t))return!1;return!0}function u(e){let t={};for(let r=0;r<e.length;r+=2)t[e[r]]=e[r+1];return t}function c(e,t){return new Promise(r=>{let n;let i=()=>{null==t||t.signal.removeEventListener("abort",i),clearTimeout(n),r()};n=setTimeout(i,e),null==t||t.signal.addEventListener("abort",i)})}function d(e){return!!e&&["connect","disconnect","duplicate"].every(t=>"function"==typeof e[t])}function h(e){return d(e)&&e.isCluster}function p(e,t){let r=e.getMaxListeners();e.setMaxListeners(r+t)}function f(e,t){p(e,-t)}function y(e){if(e)return`${e.queue}:${e.id}`}let m=/ERR unknown command ['`]\s*client\s*['`]/,g=5e3,b=100;function S(e){let t=`${e.message}`;return t!==n.CONNECTION_CLOSED_ERROR_MSG&&!t.includes("ECONNREFUSED")}let v=(e,t)=>{let r=i.valid(i.coerce(e));return i.lt(r,t)},E=e=>{let t={};for(let r of Object.entries(e))t[r[0]]=JSON.parse(r[1]);return t},k=":qe"},37909:(e,t,r)=>{var n=r(5001);e.exports=function(e){return e?("{}"===e.substr(0,2)&&(e="\\{\\}"+e.substr(2)),(function e(t,r){var i=[],s=n("{","}",t);if(!s)return[t];var o=s.pre,l=s.post.length?e(s.post,!1):[""];if(/\$$/.test(s.pre))for(var c=0;c<l.length;c++){var y=o+"{"+s.body+"}"+l[c];i.push(y)}else{var m=/^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(s.body),g=/^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(s.body),b=m||g,S=s.body.indexOf(",")>=0;if(!b&&!S)return s.post.match(/,.*\}/)?e(t=s.pre+"{"+s.body+a+s.post):[t];if(b)v=s.body.split(/\.\./);else if(1===(v=function e(t){if(!t)return[""];var r=[],i=n("{","}",t);if(!i)return t.split(",");var s=i.pre,a=i.body,o=i.post,l=s.split(",");l[l.length-1]+="{"+a+"}";var u=e(o);return o.length&&(l[l.length-1]+=u.shift(),l.push.apply(l,u)),r.push.apply(r,l),r}(s.body)).length&&1===(v=e(v[0],!1).map(d)).length)return l.map(function(e){return s.pre+v[0]+e});if(b){var v,E,k,K=u(v[0]),w=u(v[1]),I=Math.max(v[0].length,v[1].length),x=3==v.length?Math.abs(u(v[2])):1,A=p;w<K&&(x*=-1,A=f);var T=v.some(h);E=[];for(var j=K;A(j,w);j+=x){if(g)"\\"===(k=String.fromCharCode(j))&&(k="");else if(k=String(j),T){var R=I-k.length;if(R>0){var _=Array(R+1).join("0");k=j<0?"-"+_+k.slice(1):_+k}}E.push(k)}}else{E=[];for(var C=0;C<v.length;C++)E.push.apply(E,e(v[C],!1))}for(var C=0;C<E.length;C++)for(var c=0;c<l.length;c++){var y=o+E[C]+l[c];(!r||b||y)&&i.push(y)}}return i})(e.split("\\\\").join(i).split("\\{").join(s).split("\\}").join(a).split("\\,").join(o).split("\\.").join(l),!0).map(c)):[]};var i="\x00SLASH"+Math.random()+"\x00",s="\x00OPEN"+Math.random()+"\x00",a="\x00CLOSE"+Math.random()+"\x00",o="\x00COMMA"+Math.random()+"\x00",l="\x00PERIOD"+Math.random()+"\x00";function u(e){return parseInt(e,10)==e?parseInt(e,10):e.charCodeAt(0)}function c(e){return e.split(i).join("\\").split(s).join("{").split(a).join("}").split(o).join(",").split(l).join(".")}function d(e){return"{"+e+"}"}function h(e){return/^-?0\d/.test(e)}function p(e,t){return e<=t}function f(e,t){return e>=t}},96124:(e,t,r)=>{r.d(t,{Z:()=>u});var n=r(6113),i=r.n(n);let s={randomUUID:i().randomUUID},a=new Uint8Array(256),o=a.length,l=[];for(let e=0;e<256;++e)l.push((e+256).toString(16).slice(1));let u=function(e,t,r){if(s.randomUUID&&!t&&!e)return s.randomUUID();e=e||{};let n=e.random||(e.rng||function(){return o>a.length-16&&(i().randomFillSync(a),o=0),a.slice(o,o+=16)})();if(n[6]=15&n[6]|64,n[8]=63&n[8]|128,t){r=r||0;for(let e=0;e<16;++e)t[r+e]=n[e];return t}return function(e,t=0){return l[e[t+0]]+l[e[t+1]]+l[e[t+2]]+l[e[t+3]]+"-"+l[e[t+4]]+l[e[t+5]]+"-"+l[e[t+6]]+l[e[t+7]]+"-"+l[e[t+8]]+l[e[t+9]]+"-"+l[e[t+10]]+l[e[t+11]]+l[e[t+12]]+l[e[t+13]]+l[e[t+14]]+l[e[t+15]]}(n)}},60159:e=>{var t=[0,4129,8258,12387,16516,20645,24774,28903,33032,37161,41290,45419,49548,53677,57806,61935,4657,528,12915,8786,21173,17044,29431,25302,37689,33560,45947,41818,54205,50076,62463,58334,9314,13379,1056,5121,25830,29895,17572,21637,42346,46411,34088,38153,58862,62927,50604,54669,13907,9842,5649,1584,30423,26358,22165,18100,46939,42874,38681,34616,63455,59390,55197,51132,18628,22757,26758,30887,2112,6241,10242,14371,51660,55789,59790,63919,35144,39273,43274,47403,23285,19156,31415,27286,6769,2640,14899,10770,56317,52188,64447,60318,39801,35672,47931,43802,27814,31879,19684,23749,11298,15363,3168,7233,60846,64911,52716,56781,44330,48395,36200,40265,32407,28342,24277,20212,15891,11826,7761,3696,65439,61374,57309,53244,48923,44858,40793,36728,37256,33193,45514,41451,53516,49453,61774,57711,4224,161,12482,8419,20484,16421,28742,24679,33721,37784,41979,46042,49981,54044,58239,62302,689,4752,8947,13010,16949,21012,25207,29270,46570,42443,38312,34185,62830,58703,54572,50445,13538,9411,5280,1153,29798,25671,21540,17413,42971,47098,34713,38840,59231,63358,50973,55100,9939,14066,1681,5808,26199,30326,17941,22068,55628,51565,63758,59695,39368,35305,47498,43435,22596,18533,30726,26663,6336,2273,14466,10403,52093,56156,60223,64286,35833,39896,43963,48026,19061,23124,27191,31254,2801,6864,10931,14994,64814,60687,56684,52557,48554,44427,40424,36297,31782,27655,23652,19525,15522,11395,7392,3265,61215,65342,53085,57212,44955,49082,36825,40952,28183,32310,20053,24180,11923,16050,3793,7920],r=function(e){for(var t,r=0,n=0,i=[],s=e.length;r<s;r++)(t=e.charCodeAt(r))<128?i[n++]=t:(t<2048?i[n++]=t>>6|192:((64512&t)==55296&&r+1<e.length&&(64512&e.charCodeAt(r+1))==56320?(t=65536+((1023&t)<<10)+(1023&e.charCodeAt(++r)),i[n++]=t>>18|240,i[n++]=t>>12&63|128):i[n++]=t>>12|224,i[n++]=t>>6&63|128),i[n++]=63&t|128);return i},n=e.exports=function(e){for(var n,i=0,s=-1,a=0,o=0,l="string"==typeof e?r(e):e,u=l.length;i<u;){if(n=l[i++],-1===s)123===n&&(s=i);else if(125!==n)o=t[(n^o>>8)&255]^o<<8;else if(i-1!==s)return 16383&o;a=t[(n^a>>8)&255]^a<<8}return 16383&a};e.exports.generateMulti=function(e){for(var t=1,r=e.length,i=n(e[0]);t<r;)if(n(e[t++])!==i)return -1;return i}},20282:(e,t,r)=>{var n=r(90108);function i(e,t){var r={zone:t};if(e?e instanceof i?this._date=e._date:e instanceof Date?this._date=n.DateTime.fromJSDate(e,r):"number"==typeof e?this._date=n.DateTime.fromMillis(e,r):"string"==typeof e&&(this._date=n.DateTime.fromISO(e,r),this._date.isValid||(this._date=n.DateTime.fromRFC2822(e,r)),this._date.isValid||(this._date=n.DateTime.fromSQL(e,r)),this._date.isValid||(this._date=n.DateTime.fromFormat(e,"EEE, d MMM yyyy HH:mm:ss",r))):this._date=n.DateTime.local(),!this._date||!this._date.isValid)throw Error("CronDate: unhandled timestamp: "+JSON.stringify(e));t&&t!==this._date.zoneName&&(this._date=this._date.setZone(t))}i.prototype.addYear=function(){this._date=this._date.plus({years:1})},i.prototype.addMonth=function(){this._date=this._date.plus({months:1}).startOf("month")},i.prototype.addDay=function(){this._date=this._date.plus({days:1}).startOf("day")},i.prototype.addHour=function(){var e=this._date;this._date=this._date.plus({hours:1}).startOf("hour"),this._date<=e&&(this._date=this._date.plus({hours:1}))},i.prototype.addMinute=function(){var e=this._date;this._date=this._date.plus({minutes:1}).startOf("minute"),this._date<e&&(this._date=this._date.plus({hours:1}))},i.prototype.addSecond=function(){var e=this._date;this._date=this._date.plus({seconds:1}).startOf("second"),this._date<e&&(this._date=this._date.plus({hours:1}))},i.prototype.subtractYear=function(){this._date=this._date.minus({years:1})},i.prototype.subtractMonth=function(){this._date=this._date.minus({months:1}).endOf("month").startOf("second")},i.prototype.subtractDay=function(){this._date=this._date.minus({days:1}).endOf("day").startOf("second")},i.prototype.subtractHour=function(){var e=this._date;this._date=this._date.minus({hours:1}).endOf("hour").startOf("second"),this._date>=e&&(this._date=this._date.minus({hours:1}))},i.prototype.subtractMinute=function(){var e=this._date;this._date=this._date.minus({minutes:1}).endOf("minute").startOf("second"),this._date>e&&(this._date=this._date.minus({hours:1}))},i.prototype.subtractSecond=function(){var e=this._date;this._date=this._date.minus({seconds:1}).startOf("second"),this._date>e&&(this._date=this._date.minus({hours:1}))},i.prototype.getDate=function(){return this._date.day},i.prototype.getFullYear=function(){return this._date.year},i.prototype.getDay=function(){var e=this._date.weekday;return 7==e?0:e},i.prototype.getMonth=function(){return this._date.month-1},i.prototype.getHours=function(){return this._date.hour},i.prototype.getMinutes=function(){return this._date.minute},i.prototype.getSeconds=function(){return this._date.second},i.prototype.getMilliseconds=function(){return this._date.millisecond},i.prototype.getTime=function(){return this._date.valueOf()},i.prototype.getUTCDate=function(){return this._getUTC().day},i.prototype.getUTCFullYear=function(){return this._getUTC().year},i.prototype.getUTCDay=function(){var e=this._getUTC().weekday;return 7==e?0:e},i.prototype.getUTCMonth=function(){return this._getUTC().month-1},i.prototype.getUTCHours=function(){return this._getUTC().hour},i.prototype.getUTCMinutes=function(){return this._getUTC().minute},i.prototype.getUTCSeconds=function(){return this._getUTC().second},i.prototype.toISOString=function(){return this._date.toUTC().toISO()},i.prototype.toJSON=function(){return this._date.toJSON()},i.prototype.setDate=function(e){this._date=this._date.set({day:e})},i.prototype.setFullYear=function(e){this._date=this._date.set({year:e})},i.prototype.setDay=function(e){this._date=this._date.set({weekday:e})},i.prototype.setMonth=function(e){this._date=this._date.set({month:e+1})},i.prototype.setHours=function(e){this._date=this._date.set({hour:e})},i.prototype.setMinutes=function(e){this._date=this._date.set({minute:e})},i.prototype.setSeconds=function(e){this._date=this._date.set({second:e})},i.prototype.setMilliseconds=function(e){this._date=this._date.set({millisecond:e})},i.prototype._getUTC=function(){return this._date.toUTC()},i.prototype.toString=function(){return this.toDate().toString()},i.prototype.toDate=function(){return this._date.toJSDate()},i.prototype.isLastDayOfMonth=function(){var e=this._date.plus({days:1}).startOf("day");return this._date.month!==e.month},i.prototype.isLastWeekdayOfMonth=function(){var e=this._date.plus({days:7}).startOf("day");return this._date.month!==e.month},e.exports=i},4107:(e,t,r)=>{var n=r(20282),i=r(39945);function s(e,t){this._options=t,this._utc=t.utc||!1,this._tz=this._utc?"UTC":t.tz,this._currentDate=new n(t.currentDate,this._tz),this._startDate=t.startDate?new n(t.startDate,this._tz):null,this._endDate=t.endDate?new n(t.endDate,this._tz):null,this._isIterator=t.iterator||!1,this._hasIterated=!1,this._nthDayOfWeek=t.nthDayOfWeek||0,this.fields=s._freezeFields(e)}s.map=["second","minute","hour","dayOfMonth","month","dayOfWeek"],s.predefined={"@yearly":"0 0 1 1 *","@monthly":"0 0 1 * *","@weekly":"0 0 * * 0","@daily":"0 0 * * *","@hourly":"0 * * * *"},s.constraints=[{min:0,max:59,chars:[]},{min:0,max:59,chars:[]},{min:0,max:23,chars:[]},{min:1,max:31,chars:["L"]},{min:1,max:12,chars:[]},{min:0,max:7,chars:["L"]}],s.daysInMonth=[31,29,31,30,31,30,31,31,30,31,30,31],s.aliases={month:{jan:1,feb:2,mar:3,apr:4,may:5,jun:6,jul:7,aug:8,sep:9,oct:10,nov:11,dec:12},dayOfWeek:{sun:0,mon:1,tue:2,wed:3,thu:4,fri:5,sat:6}},s.parseDefaults=["0","*","*","*","*","*"],s.standardValidCharacters=/^[,*\d/-]+$/,s.dayOfWeekValidCharacters=/^[?,*\dL#/-]+$/,s.dayOfMonthValidCharacters=/^[?,*\dL/-]+$/,s.validCharacters={second:s.standardValidCharacters,minute:s.standardValidCharacters,hour:s.standardValidCharacters,dayOfMonth:s.dayOfMonthValidCharacters,month:s.standardValidCharacters,dayOfWeek:s.dayOfWeekValidCharacters},s._isValidConstraintChar=function(e,t){return"string"==typeof t&&e.chars.some(function(e){return t.indexOf(e)>-1})},s._parseField=function(e,t,r){switch(e){case"month":case"dayOfWeek":var n=s.aliases[e];t=t.replace(/[a-z]{3}/gi,function(e){if(void 0!==n[e=e.toLowerCase()])return n[e];throw Error('Validation error, cannot resolve alias "'+e+'"')})}if(!s.validCharacters[e].test(t))throw Error("Invalid characters, got value: "+t);function i(e){var t=e.split("/");if(t.length>2)throw Error("Invalid repeat: "+e);return t.length>1?(t[0]==+t[0]&&(t=[t[0]+"-"+r.max,t[1]]),a(t[0],t[t.length-1])):a(e,1)}function a(t,n){var i=[],s=t.split("-");if(s.length>1){if(s.length<2)return+t;if(!s[0].length){if(!s[1].length)throw Error("Invalid range: "+t);return+t}var a=+s[0],o=+s[1];if(Number.isNaN(a)||Number.isNaN(o)||a<r.min||o>r.max)throw Error("Constraint error, got range "+a+"-"+o+" expected range "+r.min+"-"+r.max);if(a>o)throw Error("Invalid range: "+t);var l=+n;if(Number.isNaN(l)||l<=0)throw Error("Constraint error, cannot repeat at every "+l+" time.");"dayOfWeek"===e&&o%7==0&&i.push(0);for(var u=a;u<=o;u++)!(-1!==i.indexOf(u))&&l>0&&l%n==0?(l=1,i.push(u)):l++;return i}return Number.isNaN(+t)?t:+t}return -1!==t.indexOf("*")?t=t.replace(/\*/g,r.min+"-"+r.max):-1!==t.indexOf("?")&&(t=t.replace(/\?/g,r.min+"-"+r.max)),function(t){var n=[];function a(t){if(t instanceof Array)for(var i=0,a=t.length;i<a;i++){var o=t[i];if(s._isValidConstraintChar(r,o)){n.push(o);continue}if("number"!=typeof o||Number.isNaN(o)||o<r.min||o>r.max)throw Error("Constraint error, got value "+o+" expected range "+r.min+"-"+r.max);n.push(o)}else{if(s._isValidConstraintChar(r,t)){n.push(t);return}var l=+t;if(Number.isNaN(l)||l<r.min||l>r.max)throw Error("Constraint error, got value "+t+" expected range "+r.min+"-"+r.max);"dayOfWeek"===e&&(l%=7),n.push(l)}}var o=t.split(",");if(!o.every(function(e){return e.length>0}))throw Error("Invalid list value format");if(o.length>1)for(var l=0,u=o.length;l<u;l++)a(i(o[l]));else a(i(t));return n.sort(s._sortCompareFn),n}(t)},s._sortCompareFn=function(e,t){var r="number"==typeof e,n="number"==typeof t;return r&&n?e-t:!r&&n?1:r&&!n?-1:e.localeCompare(t)},s._handleMaxDaysInMonth=function(e){if(1===e.month.length){var t=s.daysInMonth[e.month[0]-1];if(e.dayOfMonth[0]>t)throw Error("Invalid explicit day of month definition");return e.dayOfMonth.filter(function(e){return"L"===e||e<=t}).sort(s._sortCompareFn)}},s._freezeFields=function(e){for(var t=0,r=s.map.length;t<r;++t){var n=s.map[t],i=e[n];e[n]=Object.freeze(i)}return Object.freeze(e)},s.prototype._applyTimezoneShift=function(e,t,r){if("Month"===r||"Day"===r){var n=e.getTime();e[t+r](),n===e.getTime()&&(0===e.getMinutes()&&0===e.getSeconds()?e.addHour():59===e.getMinutes()&&59===e.getSeconds()&&e.subtractHour())}else{var i=e.getHours();e[t+r]();var s=e.getHours(),a=s-i;2===a?24!==this.fields.hour.length&&(this._dstStart=s):0===a&&0===e.getMinutes()&&0===e.getSeconds()&&24!==this.fields.hour.length&&(this._dstEnd=s)}},s.prototype._findSchedule=function(e){function t(e,t){for(var r=0,n=t.length;r<n;r++)if(t[r]>=e)return t[r]===e;return t[0]===e}function r(e){return e.length>0&&e.some(function(e){return"string"==typeof e&&e.indexOf("L")>=0})}for(var i=(e=e||!1)?"subtract":"add",a=new n(this._currentDate,this._tz),o=this._startDate,l=this._endDate,u=a.getTime(),c=0;c<1e4;){if(c++,e){if(o&&a.getTime()-o.getTime()<0)throw Error("Out of the timespan range")}else if(l&&l.getTime()-a.getTime()<0)throw Error("Out of the timespan range");var d=t(a.getDate(),this.fields.dayOfMonth);r(this.fields.dayOfMonth)&&(d=d||a.isLastDayOfMonth());var h=t(a.getDay(),this.fields.dayOfWeek);r(this.fields.dayOfWeek)&&(h=h||this.fields.dayOfWeek.some(function(e){if(!r([e]))return!1;var t=Number.parseInt(e[0])%7;if(Number.isNaN(t))throw Error("Invalid last weekday of the month expression: "+e);return a.getDay()===t&&a.isLastWeekdayOfMonth()}));var p=this.fields.dayOfMonth.length>=s.daysInMonth[a.getMonth()],f=this.fields.dayOfWeek.length===s.constraints[5].max-s.constraints[5].min+1,y=a.getHours();if(!d&&(!h||f)||!p&&f&&!d||p&&!f&&!h||this._nthDayOfWeek>0&&!function(e,t){if(t<6){if(8>e.getDate()&&1===t)return!0;var r=e.getDate()%7?1:0;return Math.floor((e.getDate()-e.getDate()%7)/7)+r===t}return!1}(a,this._nthDayOfWeek)){this._applyTimezoneShift(a,i,"Day");continue}if(!t(a.getMonth()+1,this.fields.month)){this._applyTimezoneShift(a,i,"Month");continue}if(t(y,this.fields.hour)){if(this._dstEnd===y&&!e){this._dstEnd=null,this._applyTimezoneShift(a,"add","Hour");continue}}else{if(this._dstStart!==y){this._dstStart=null,this._applyTimezoneShift(a,i,"Hour");continue}if(!t(y-1,this.fields.hour)){a[i+"Hour"]();continue}}if(!t(a.getMinutes(),this.fields.minute)){this._applyTimezoneShift(a,i,"Minute");continue}if(!t(a.getSeconds(),this.fields.second)){this._applyTimezoneShift(a,i,"Second");continue}if(u===a.getTime()){"add"===i||0===a.getMilliseconds()?this._applyTimezoneShift(a,i,"Second"):a.setMilliseconds(0);continue}break}if(c>=1e4)throw Error("Invalid expression, loop limit exceeded");return this._currentDate=new n(a,this._tz),this._hasIterated=!0,a},s.prototype.next=function(){var e=this._findSchedule();return this._isIterator?{value:e,done:!this.hasNext()}:e},s.prototype.prev=function(){var e=this._findSchedule(!0);return this._isIterator?{value:e,done:!this.hasPrev()}:e},s.prototype.hasNext=function(){var e=this._currentDate,t=this._hasIterated;try{return this._findSchedule(),!0}catch(e){return!1}finally{this._currentDate=e,this._hasIterated=t}},s.prototype.hasPrev=function(){var e=this._currentDate,t=this._hasIterated;try{return this._findSchedule(!0),!0}catch(e){return!1}finally{this._currentDate=e,this._hasIterated=t}},s.prototype.iterate=function(e,t){var r=[];if(e>=0)for(var n=0,i=e;n<i;n++)try{var s=this.next();r.push(s),t&&t(s,n)}catch(e){break}else for(var n=0,i=e;n>i;n--)try{var s=this.prev();r.push(s),t&&t(s,n)}catch(e){break}return r},s.prototype.reset=function(e){this._currentDate=new n(e||this._options.currentDate)},s.prototype.stringify=function(e){for(var t=[],r=e?0:1,n=s.map.length;r<n;++r){var a=s.map[r],o=this.fields[a],l=s.constraints[r];"dayOfMonth"===a&&1===this.fields.month.length?l={min:1,max:s.daysInMonth[this.fields.month[0]-1]}:"dayOfWeek"===a&&(l={min:0,max:6},o=7===o[o.length-1]?o.slice(0,-1):o),t.push(i(o,l.min,l.max))}return t.join(" ")},s.parse=function(e,t){var r=this;return"function"==typeof t&&(t={}),function(e,t){t||(t={}),void 0===t.currentDate&&(t.currentDate=new n(void 0,r._tz)),s.predefined[e]&&(e=s.predefined[e]);var i=[],a=(e+"").trim().split(/\s+/);if(a.length>6)throw Error("Invalid cron expression");for(var o=s.map.length-a.length,l=0,u=s.map.length;l<u;++l){var c=s.map[l],d=a[a.length>u?l:l-o];if(l<o||!d)i.push(s._parseField(c,s.parseDefaults[l],s.constraints[l]));else{var h="dayOfWeek"===c?function(e){var r=e.split("#");if(r.length>1){var n=+r[r.length-1];if(/,/.test(e))throw Error("Constraint error, invalid dayOfWeek `#` and `,` special characters are incompatible");if(/\//.test(e))throw Error("Constraint error, invalid dayOfWeek `#` and `/` special characters are incompatible");if(/-/.test(e))throw Error("Constraint error, invalid dayOfWeek `#` and `-` special characters are incompatible");if(r.length>2||Number.isNaN(n)||n<1||n>5)throw Error("Constraint error, invalid dayOfWeek occurrence number (#)");return t.nthDayOfWeek=n,r[0]}return e}(d):d;i.push(s._parseField(c,h,s.constraints[l]))}}for(var p={},l=0,u=s.map.length;l<u;l++)p[s.map[l]]=i[l];var f=s._handleMaxDaysInMonth(p);return p.dayOfMonth=f||p.dayOfMonth,new s(p,t)}(e,t)},s.fieldsToExpression=function(e,t){for(var r={},n=0,i=s.map.length;n<i;++n){var a=s.map[n],o=e[a];!function(e,t,r){if(!t)throw Error("Validation error, Field "+e+" is missing");if(0===t.length)throw Error("Validation error, Field "+e+" contains no values");for(var n=0,i=t.length;n<i;n++){var a=t[n];if(!s._isValidConstraintChar(r,a)&&("number"!=typeof a||Number.isNaN(a)||a<r.min||a>r.max))throw Error("Constraint error, got value "+a+" expected range "+r.min+"-"+r.max)}}(a,o,s.constraints[n]);for(var l=[],u=-1;++u<o.length;)l[u]=o[u];if((o=l.sort(s._sortCompareFn).filter(function(e,t,r){return!t||e!==r[t-1]})).length!==l.length)throw Error("Validation error, Field "+a+" contains duplicate values");r[a]=o}var c=s._handleMaxDaysInMonth(r);return r.dayOfMonth=c||r.dayOfMonth,new s(r,t||{})},e.exports=s},49174:e=>{function t(e){return{start:e,count:1}}function r(e,t){e.end=t,e.step=t-e.start,e.count=2}function n(e,r,n){r&&(2===r.count?(e.push(t(r.start)),e.push(t(r.end))):e.push(r)),n&&e.push(n)}e.exports=function(e){for(var i=[],s=void 0,a=0;a<e.length;a++){var o=e[a];"number"!=typeof o?(n(i,s,t(o)),s=void 0):s?1===s.count?r(s,o):s.step===o-s.end?(s.count++,s.end=o):2===s.count?(i.push(t(s.start)),r(s=t(s.end),o)):(n(i,s),s=t(o)):s=t(o)}return n(i,s),i}},39945:(e,t,r)=>{var n=r(49174);e.exports=function(e,t,r){var i=n(e);if(1===i.length){var s=i[0],a=s.step;if(1===a&&s.start===t&&s.end===r)return"*";if(1!==a&&s.start===t&&s.end===r-a+1)return"*/"+a}for(var o=[],l=0,u=i.length;l<u;++l){var c=i[l];if(1===c.count){o.push(c.start);continue}var a=c.step;if(1===c.step){o.push(c.start+"-"+c.end);continue}var d=0==c.start?c.count-1:c.count;c.step*d>c.end?o=o.concat(Array.from({length:c.end-c.start+1}).map(function(e,t){var r=c.start+t;return(r-c.start)%c.step==0?r:null}).filter(function(e){return null!=e})):c.end===r-c.step+1?o.push(c.start+"/"+c.step):o.push(c.start+"-"+c.end+"/"+c.step)}return o.join(",")}},95347:(e,t,r)=>{var n=r(4107);function i(){}i._parseEntry=function(e){var t=e.split(" ");if(6===t.length)return{interval:n.parse(e)};if(t.length>6)return{interval:n.parse(t.slice(0,6).join(" ")),command:t.slice(6,t.length)};throw Error("Invalid entry: "+e)},i.parseExpression=function(e,t){return n.parse(e,t)},i.fieldsToExpression=function(e,t){return n.fieldsToExpression(e,t)},i.parseString=function(e){for(var t=e.split("\n"),r={variables:{},expressions:[],errors:{}},n=0,s=t.length;n<s;n++){var a=t[n],o=null,l=a.trim();if(l.length>0){if(l.match(/^#/))continue;if(o=l.match(/^(.*)=(.*)$/))r.variables[o[1]]=o[2];else{var u=null;try{u=i._parseEntry("0 "+l),r.expressions.push(u.interval)}catch(e){r.errors[l]=e}}}}return r},i.parseFile=function(e,t){r(57147).readFile(e,function(e,r){if(e){t(e);return}return t(null,i.parseString(r.toString()))})},e.exports=i},59862:(e,t,r)=>{t.formatArgs=function(t){if(t[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+t[0]+(this.useColors?"%c ":" ")+"+"+e.exports.humanize(this.diff),!this.useColors)return;let r="color: "+this.color;t.splice(1,0,r,"color: inherit");let n=0,i=0;t[0].replace(/%[a-zA-Z%]/g,e=>{"%%"!==e&&(n++,"%c"===e&&(i=n))}),t.splice(i,0,r)},t.save=function(e){try{e?t.storage.setItem("debug",e):t.storage.removeItem("debug")}catch(e){}},t.load=function(){let e;try{e=t.storage.getItem("debug")}catch(e){}return!e&&"undefined"!=typeof process&&"env"in process&&(e=process.env.DEBUG),e},t.useColors=function(){return!("undefined"!=typeof navigator&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))&&("undefined"!=typeof document&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||"undefined"!=typeof navigator&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)&&parseInt(RegExp.$1,10)>=31||"undefined"!=typeof navigator&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/))},t.storage=function(){try{return localStorage}catch(e){}}(),t.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})(),t.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"],t.log=console.debug||console.log||(()=>{}),e.exports=r(11639)(t);let{formatters:n}=e.exports;n.j=function(e){try{return JSON.stringify(e)}catch(e){return"[UnexpectedJSONParseError]: "+e.message}}},11639:(e,t,r)=>{e.exports=function(e){function t(e){let r,i,s;let a=null;function o(...e){if(!o.enabled)return;let n=Number(new Date),i=n-(r||n);o.diff=i,o.prev=r,o.curr=n,r=n,e[0]=t.coerce(e[0]),"string"!=typeof e[0]&&e.unshift("%O");let s=0;e[0]=e[0].replace(/%([a-zA-Z%])/g,(r,n)=>{if("%%"===r)return"%";s++;let i=t.formatters[n];if("function"==typeof i){let t=e[s];r=i.call(o,t),e.splice(s,1),s--}return r}),t.formatArgs.call(o,e);let a=o.log||t.log;a.apply(o,e)}return o.namespace=e,o.useColors=t.useColors(),o.color=t.selectColor(e),o.extend=n,o.destroy=t.destroy,Object.defineProperty(o,"enabled",{enumerable:!0,configurable:!1,get:()=>null!==a?a:(i!==t.namespaces&&(i=t.namespaces,s=t.enabled(e)),s),set:e=>{a=e}}),"function"==typeof t.init&&t.init(o),o}function n(e,r){let n=t(this.namespace+(void 0===r?":":r)+e);return n.log=this.log,n}function i(e){return e.toString().substring(2,e.toString().length-2).replace(/\.\*\?$/,"*")}return t.debug=t,t.default=t,t.coerce=function(e){return e instanceof Error?e.stack||e.message:e},t.disable=function(){let e=[...t.names.map(i),...t.skips.map(i).map(e=>"-"+e)].join(",");return t.enable(""),e},t.enable=function(e){let r;t.save(e),t.namespaces=e,t.names=[],t.skips=[];let n=("string"==typeof e?e:"").split(/[\s,]+/),i=n.length;for(r=0;r<i;r++)n[r]&&("-"===(e=n[r].replace(/\*/g,".*?"))[0]?t.skips.push(RegExp("^"+e.slice(1)+"$")):t.names.push(RegExp("^"+e+"$")))},t.enabled=function(e){let r,n;if("*"===e[e.length-1])return!0;for(r=0,n=t.skips.length;r<n;r++)if(t.skips[r].test(e))return!1;for(r=0,n=t.names.length;r<n;r++)if(t.names[r].test(e))return!0;return!1},t.humanize=r(8605),t.destroy=function(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")},Object.keys(e).forEach(r=>{t[r]=e[r]}),t.names=[],t.skips=[],t.formatters={},t.selectColor=function(e){let r=0;for(let t=0;t<e.length;t++)r=(r<<5)-r+e.charCodeAt(t)|0;return t.colors[Math.abs(r)%t.colors.length]},t.enable(t.load()),t}},43396:(e,t,r)=>{"undefined"==typeof process||"renderer"===process.type||process.__nwjs?e.exports=r(59862):e.exports=r(6582)},6582:(e,t,r)=>{let n=r(76224),i=r(73837);t.init=function(e){e.inspectOpts={};let r=Object.keys(t.inspectOpts);for(let n=0;n<r.length;n++)e.inspectOpts[r[n]]=t.inspectOpts[r[n]]},t.log=function(...e){return process.stderr.write(i.format(...e)+"\n")},t.formatArgs=function(r){let{namespace:n,useColors:i}=this;if(i){let t=this.color,i="\x1b[3"+(t<8?t:"8;5;"+t),s=`  ${i};1m${n} \u001B[0m`;r[0]=s+r[0].split("\n").join("\n"+s),r.push(i+"m+"+e.exports.humanize(this.diff)+"\x1b[0m")}else r[0]=(t.inspectOpts.hideDate?"":new Date().toISOString()+" ")+n+" "+r[0]},t.save=function(e){e?process.env.DEBUG=e:delete process.env.DEBUG},t.load=function(){return process.env.DEBUG},t.useColors=function(){return"colors"in t.inspectOpts?!!t.inspectOpts.colors:n.isatty(process.stderr.fd)},t.destroy=i.deprecate(()=>{},"Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."),t.colors=[6,2,3,4,5,1];try{let e=r(56421);e&&(e.stderr||e).level>=2&&(t.colors=[20,21,26,27,32,33,38,39,40,41,42,43,44,45,56,57,62,63,68,69,74,75,76,77,78,79,80,81,92,93,98,99,112,113,128,129,134,135,148,149,160,161,162,163,164,165,166,167,168,169,170,171,172,173,178,179,184,185,196,197,198,199,200,201,202,203,204,205,206,207,208,209,214,215,220,221])}catch(e){}t.inspectOpts=Object.keys(process.env).filter(e=>/^debug_/i.test(e)).reduce((e,t)=>{let r=t.substring(6).toLowerCase().replace(/_([a-z])/g,(e,t)=>t.toUpperCase()),n=process.env[t];return n=!!/^(yes|on|true|enabled)$/i.test(n)||!/^(no|off|false|disabled)$/i.test(n)&&("null"===n?null:Number(n)),e[r]=n,e},{}),e.exports=r(11639)(t);let{formatters:s}=e.exports;s.o=function(e){return this.inspectOpts.colors=this.useColors,i.inspect(e,this.inspectOpts).split("\n").map(e=>e.trim()).join(" ")},s.O=function(e){return this.inspectOpts.colors=this.useColors,i.inspect(e,this.inspectOpts)}},28768:e=>{function t(e,t){var t=t||{};this._capacity=t.capacity,this._head=0,this._tail=0,Array.isArray(e)?this._fromArray(e):(this._capacityMask=3,this._list=[,,,,])}t.prototype.peekAt=function(e){var t=e;if(t===(0|t)){var r=this.size();if(!(t>=r)&&!(t<-r))return t<0&&(t+=r),t=this._head+t&this._capacityMask,this._list[t]}},t.prototype.get=function(e){return this.peekAt(e)},t.prototype.peek=function(){if(this._head!==this._tail)return this._list[this._head]},t.prototype.peekFront=function(){return this.peek()},t.prototype.peekBack=function(){return this.peekAt(-1)},Object.defineProperty(t.prototype,"length",{get:function(){return this.size()}}),t.prototype.size=function(){return this._head===this._tail?0:this._head<this._tail?this._tail-this._head:this._capacityMask+1-(this._head-this._tail)},t.prototype.unshift=function(e){if(0==arguments.length)return this.size();var t=this._list.length;return(this._head=this._head-1+t&this._capacityMask,this._list[this._head]=e,this._tail===this._head&&this._growArray(),this._capacity&&this.size()>this._capacity&&this.pop(),this._head<this._tail)?this._tail-this._head:this._capacityMask+1-(this._head-this._tail)},t.prototype.shift=function(){var e=this._head;if(e!==this._tail){var t=this._list[e];return this._list[e]=void 0,this._head=e+1&this._capacityMask,e<2&&this._tail>1e4&&this._tail<=this._list.length>>>2&&this._shrinkArray(),t}},t.prototype.push=function(e){if(0==arguments.length)return this.size();var t=this._tail;return(this._list[t]=e,this._tail=t+1&this._capacityMask,this._tail===this._head&&this._growArray(),this._capacity&&this.size()>this._capacity&&this.shift(),this._head<this._tail)?this._tail-this._head:this._capacityMask+1-(this._head-this._tail)},t.prototype.pop=function(){var e=this._tail;if(e!==this._head){var t=this._list.length;this._tail=e-1+t&this._capacityMask;var r=this._list[this._tail];return this._list[this._tail]=void 0,this._head<2&&e>1e4&&e<=t>>>2&&this._shrinkArray(),r}},t.prototype.removeOne=function(e){var t,r=e;if(r===(0|r)&&this._head!==this._tail){var n=this.size(),i=this._list.length;if(!(r>=n)&&!(r<-n)){r<0&&(r+=n),r=this._head+r&this._capacityMask;var s=this._list[r];if(e<n/2){for(t=e;t>0;t--)this._list[r]=this._list[r=r-1+i&this._capacityMask];this._list[r]=void 0,this._head=this._head+1+i&this._capacityMask}else{for(t=n-1-e;t>0;t--)this._list[r]=this._list[r=r+1+i&this._capacityMask];this._list[r]=void 0,this._tail=this._tail-1+i&this._capacityMask}return s}}},t.prototype.remove=function(e,t){var r,n,i=e,s=t;if(i===(0|i)&&this._head!==this._tail){var a=this.size(),o=this._list.length;if(!(i>=a)&&!(i<-a)&&!(t<1)){if(i<0&&(i+=a),1===t||!t)return(r=[,])[0]=this.removeOne(i),r;if(0===i&&i+t>=a)return r=this.toArray(),this.clear(),r;for(i+t>a&&(t=a-i),r=Array(t),n=0;n<t;n++)r[n]=this._list[this._head+i+n&this._capacityMask];if(i=this._head+i&this._capacityMask,e+t===a){for(this._tail=this._tail-t+o&this._capacityMask,n=t;n>0;n--)this._list[i=i+1+o&this._capacityMask]=void 0;return r}if(0===e){for(this._head=this._head+t+o&this._capacityMask,n=t-1;n>0;n--)this._list[i=i+1+o&this._capacityMask]=void 0;return r}if(i<a/2){for(this._head=this._head+e+t+o&this._capacityMask,n=e;n>0;n--)this.unshift(this._list[i=i-1+o&this._capacityMask]);for(i=this._head-1+o&this._capacityMask;s>0;)this._list[i=i-1+o&this._capacityMask]=void 0,s--;e<0&&(this._tail=i)}else{for(this._tail=i,i=i+t+o&this._capacityMask,n=a-(t+e);n>0;n--)this.push(this._list[i++]);for(i=this._tail;s>0;)this._list[i=i+1+o&this._capacityMask]=void 0,s--}return this._head<2&&this._tail>1e4&&this._tail<=o>>>2&&this._shrinkArray(),r}}},t.prototype.splice=function(e,t){var r=e;if(r===(0|r)){var n=this.size();if(r<0&&(r+=n),!(r>n)){if(!(arguments.length>2))return this.remove(r,t);var i,s,a,o=arguments.length,l=this._list.length,u=2;if(!n||r<n/2){for(i=0,s=Array(r);i<r;i++)s[i]=this._list[this._head+i&this._capacityMask];for(0===t?(a=[],r>0&&(this._head=this._head+r+l&this._capacityMask)):(a=this.remove(r,t),this._head=this._head+r+l&this._capacityMask);o>u;)this.unshift(arguments[--o]);for(i=r;i>0;i--)this.unshift(s[i-1])}else{var c=(s=Array(n-(r+t))).length;for(i=0;i<c;i++)s[i]=this._list[this._head+r+t+i&this._capacityMask];for(0===t?(a=[],r!=n&&(this._tail=this._head+r+l&this._capacityMask)):(a=this.remove(r,t),this._tail=this._tail-c+l&this._capacityMask);u<o;)this.push(arguments[u++]);for(i=0;i<c;i++)this.push(s[i])}return a}}},t.prototype.clear=function(){this._list=Array(this._list.length),this._head=0,this._tail=0},t.prototype.isEmpty=function(){return this._head===this._tail},t.prototype.toArray=function(){return this._copyArray(!1)},t.prototype._fromArray=function(e){var t=e.length,r=this._nextPowerOf2(t);this._list=Array(r),this._capacityMask=r-1,this._tail=t;for(var n=0;n<t;n++)this._list[n]=e[n]},t.prototype._copyArray=function(e,t){var r,n=this._list,i=n.length,s=this.length;if((t|=s)==s&&this._head<this._tail)return this._list.slice(this._head,this._tail);var a=Array(t),o=0;if(e||this._head>this._tail){for(r=this._head;r<i;r++)a[o++]=n[r];for(r=0;r<this._tail;r++)a[o++]=n[r]}else for(r=this._head;r<this._tail;r++)a[o++]=n[r];return a},t.prototype._growArray=function(){if(0!=this._head){var e=this._copyArray(!0,this._list.length<<1);this._tail=this._list.length,this._head=0,this._list=e}else this._tail=this._list.length,this._list.length<<=1;this._capacityMask=this._capacityMask<<1|1},t.prototype._shrinkArray=function(){this._list.length>>>=1,this._capacityMask>>>=1},t.prototype._nextPowerOf2=function(e){return Math.max(1<<Math.log(e)/Math.log(2)+1,4)},e.exports=t},12278:(e,t,r)=>{var n=r(92969),i=r(71017).posix.dirname,s="win32"===r(22037).platform(),a=/\\/g,o=/[\{\[].*[\}\]]$/,l=/(^|[^\\])([\{\[]|\([^\)]+$)/,u=/\\([\!\*\?\|\[\]\(\)\{\}])/g;e.exports=function(e,t){Object.assign({flipBackslashes:!0},t).flipBackslashes&&s&&0>e.indexOf("/")&&(e=e.replace(a,"/")),o.test(e)&&(e+="/"),e+="a";do e=i(e);while(n(e)||l.test(e));return e.replace(u,"$1")}},1489:(e,t,r)=>{let n=r(21991),i=r(65873),s=r(58357),a=r(36192),o=r(81712),l=r(37551);async function u(e,t){d(e);let r=c(e,i.default,t),n=await Promise.all(r);return l.array.flatten(n)}function c(e,t,r){let i=[].concat(e),s=new o.default(r),a=n.generate(i,s),l=new t(s);return a.map(l.read,l)}function d(e){let t=[].concat(e),r=t.every(e=>l.string.isString(e)&&!l.string.isEmpty(e));if(!r)throw TypeError("Patterns must be a string (non empty) or an array of strings")}(function(e){var t,r;function i(e,t){d(e);let r=c(e,a.default,t);return l.array.flatten(r)}function u(e,t){d(e);let r=c(e,s.default,t);return l.stream.merge(r)}e.glob=e,e.globSync=i,e.globStream=u,e.async=e,e.sync=i,e.stream=u,e.generateTasks=function(e,t){d(e);let r=[].concat(e),i=new o.default(t);return n.generate(r,i)},e.isDynamicPattern=function(e,t){d(e);let r=new o.default(t);return l.pattern.isDynamicPattern(e,r)},e.escapePath=function(e){return d(e),l.path.escape(e)},e.convertPathToPattern=function(e){return d(e),l.path.convertPathToPattern(e)},(t=e.posix||(e.posix={})).escapePath=function(e){return d(e),l.path.escapePosixPath(e)},t.convertPathToPattern=function(e){return d(e),l.path.convertPosixPathToPattern(e)},(r=e.win32||(e.win32={})).escapePath=function(e){return d(e),l.path.escapeWindowsPath(e)},r.convertPathToPattern=function(e){return d(e),l.path.convertWindowsPathToPattern(e)}})(u||(u={})),e.exports=u},21991:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.convertPatternGroupToTask=t.convertPatternGroupsToTasks=t.groupPatternsByBaseDirectory=t.getNegativePatternsAsPositive=t.getPositivePatterns=t.convertPatternsToTasks=t.generate=void 0;let n=r(37551);function i(e,t){let r=e;return t.braceExpansion&&(r=n.pattern.expandPatternsWithBraceExpansion(r)),t.baseNameMatch&&(r=r.map(e=>e.includes("/")?e:`**/${e}`)),r.map(e=>n.pattern.removeDuplicateSlashes(e))}function s(e,t,r){let i=[],s=n.pattern.getPatternsOutsideCurrentDirectory(e),a=n.pattern.getPatternsInsideCurrentDirectory(e),o=l(s),d=l(a);return i.push(...u(o,t,r)),"."in d?i.push(c(".",a,t,r)):i.push(...u(d,t,r)),i}function a(e){return n.pattern.getPositivePatterns(e)}function o(e,t){let r=n.pattern.getNegativePatterns(e).concat(t),i=r.map(n.pattern.convertToPositivePattern);return i}function l(e){return e.reduce((e,t)=>{let r=n.pattern.getBaseDirectory(t);return r in e?e[r].push(t):e[r]=[t],e},{})}function u(e,t,r){return Object.keys(e).map(n=>c(n,e[n],t,r))}function c(e,t,r,i){return{dynamic:i,positive:t,negative:r,base:e,patterns:[].concat(t,r.map(n.pattern.convertToNegativePattern))}}t.generate=function(e,t){let r=i(e,t),l=i(t.ignore,t),u=a(r),c=o(r,l),d=u.filter(e=>n.pattern.isStaticPattern(e,t)),h=u.filter(e=>n.pattern.isDynamicPattern(e,t)),p=s(d,c,!1),f=s(h,c,!0);return p.concat(f)},t.convertPatternsToTasks=s,t.getPositivePatterns=a,t.getNegativePatternsAsPositive=o,t.groupPatternsByBaseDirectory=l,t.convertPatternGroupsToTasks=u,t.convertPatternGroupToTask=c},65873:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0});let n=r(1275),i=r(87814);class s extends i.default{constructor(){super(...arguments),this._reader=new n.default(this._settings)}async read(e){let t=this._getRootDirectory(e),r=this._getReaderOptions(e),n=await this.api(t,e,r);return n.map(e=>r.transform(e))}api(e,t,r){return t.dynamic?this._reader.dynamic(e,r):this._reader.static(t.patterns,r)}}t.default=s},91024:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0});let n=r(37551),i=r(27395);class s{constructor(e,t){this._settings=e,this._micromatchOptions=t}getFilter(e,t,r){let n=this._getMatcher(t),i=this._getNegativePatternsRe(r);return t=>this._filter(e,t,n,i)}_getMatcher(e){return new i.default(e,this._settings,this._micromatchOptions)}_getNegativePatternsRe(e){let t=e.filter(n.pattern.isAffectDepthOfReadingPattern);return n.pattern.convertPatternsToRe(t,this._micromatchOptions)}_filter(e,t,r,i){if(this._isSkippedByDeep(e,t.path)||this._isSkippedSymbolicLink(t))return!1;let s=n.path.removeLeadingDotSegment(t.path);return!this._isSkippedByPositivePatterns(s,r)&&this._isSkippedByNegativePatterns(s,i)}_isSkippedByDeep(e,t){return this._settings.deep!==1/0&&this._getEntryLevel(e,t)>=this._settings.deep}_getEntryLevel(e,t){let r=t.split("/").length;if(""===e)return r;let n=e.split("/").length;return r-n}_isSkippedSymbolicLink(e){return!this._settings.followSymbolicLinks&&e.dirent.isSymbolicLink()}_isSkippedByPositivePatterns(e,t){return!this._settings.baseNameMatch&&!t.match(e)}_isSkippedByNegativePatterns(e,t){return!n.pattern.matchAny(e,t)}}t.default=s},95129:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0});let n=r(37551);class i{constructor(e,t){this._settings=e,this._micromatchOptions=t,this.index=new Map}getFilter(e,t){let r=n.pattern.convertPatternsToRe(e,this._micromatchOptions),i=n.pattern.convertPatternsToRe(t,Object.assign(Object.assign({},this._micromatchOptions),{dot:!0}));return e=>this._filter(e,r,i)}_filter(e,t,r){let i=n.path.removeLeadingDotSegment(e.path);if(this._settings.unique&&this._isDuplicateEntry(i)||this._onlyFileFilter(e)||this._onlyDirectoryFilter(e)||this._isSkippedByAbsoluteNegativePatterns(i,r))return!1;let s=e.dirent.isDirectory(),a=this._isMatchToPatterns(i,t,s)&&!this._isMatchToPatterns(i,r,s);return this._settings.unique&&a&&this._createIndexRecord(i),a}_isDuplicateEntry(e){return this.index.has(e)}_createIndexRecord(e){this.index.set(e,void 0)}_onlyFileFilter(e){return this._settings.onlyFiles&&!e.dirent.isFile()}_onlyDirectoryFilter(e){return this._settings.onlyDirectories&&!e.dirent.isDirectory()}_isSkippedByAbsoluteNegativePatterns(e,t){if(!this._settings.absolute)return!1;let r=n.path.makeAbsolute(this._settings.cwd,e);return n.pattern.matchAny(r,t)}_isMatchToPatterns(e,t,r){let i=n.pattern.matchAny(e,t);return!i&&r?n.pattern.matchAny(e+"/",t):i}}t.default=i},22112:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0});let n=r(37551);class i{constructor(e){this._settings=e}getFilter(){return e=>this._isNonFatalError(e)}_isNonFatalError(e){return n.errno.isEnoentCodeError(e)||this._settings.suppressErrors}}t.default=i},42370:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0});let n=r(37551);class i{constructor(e,t,r){this._patterns=e,this._settings=t,this._micromatchOptions=r,this._storage=[],this._fillStorage()}_fillStorage(){for(let e of this._patterns){let t=this._getPatternSegments(e),r=this._splitSegmentsIntoSections(t);this._storage.push({complete:r.length<=1,pattern:e,segments:t,sections:r})}}_getPatternSegments(e){let t=n.pattern.getPatternParts(e,this._micromatchOptions);return t.map(e=>{let t=n.pattern.isDynamicPattern(e,this._settings);return t?{dynamic:!0,pattern:e,patternRe:n.pattern.makeRe(e,this._micromatchOptions)}:{dynamic:!1,pattern:e}})}_splitSegmentsIntoSections(e){return n.array.splitWhen(e,e=>e.dynamic&&n.pattern.hasGlobStar(e.pattern))}}t.default=i},27395:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0});let n=r(42370);class i extends n.default{match(e){let t=e.split("/"),r=t.length,n=this._storage.filter(e=>!e.complete||e.segments.length>r);for(let e of n){let n=e.sections[0];if(!e.complete&&r>n.length)return!0;let i=t.every((t,r)=>{let n=e.segments[r];return!!(n.dynamic&&n.patternRe.test(t))||!n.dynamic&&n.pattern===t});if(i)return!0}return!1}}t.default=i},87814:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0});let n=r(71017),i=r(91024),s=r(95129),a=r(22112),o=r(1124);class l{constructor(e){this._settings=e,this.errorFilter=new a.default(this._settings),this.entryFilter=new s.default(this._settings,this._getMicromatchOptions()),this.deepFilter=new i.default(this._settings,this._getMicromatchOptions()),this.entryTransformer=new o.default(this._settings)}_getRootDirectory(e){return n.resolve(this._settings.cwd,e.base)}_getReaderOptions(e){let t="."===e.base?"":e.base;return{basePath:t,pathSegmentSeparator:"/",concurrency:this._settings.concurrency,deepFilter:this.deepFilter.getFilter(t,e.positive,e.negative),entryFilter:this.entryFilter.getFilter(e.positive,e.negative),errorFilter:this.errorFilter.getFilter(),followSymbolicLinks:this._settings.followSymbolicLinks,fs:this._settings.fs,stats:this._settings.stats,throwErrorOnBrokenSymbolicLink:this._settings.throwErrorOnBrokenSymbolicLink,transform:this.entryTransformer.getTransformer()}}_getMicromatchOptions(){return{dot:this._settings.dot,matchBase:this._settings.baseNameMatch,nobrace:!this._settings.braceExpansion,nocase:!this._settings.caseSensitiveMatch,noext:!this._settings.extglob,noglobstar:!this._settings.globstar,posix:!0,strictSlashes:!1}}}t.default=l},58357:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0});let n=r(12781),i=r(19329),s=r(87814);class a extends s.default{constructor(){super(...arguments),this._reader=new i.default(this._settings)}read(e){let t=this._getRootDirectory(e),r=this._getReaderOptions(e),i=this.api(t,e,r),s=new n.Readable({objectMode:!0,read:()=>{}});return i.once("error",e=>s.emit("error",e)).on("data",e=>s.emit("data",r.transform(e))).once("end",()=>s.emit("end")),s.once("close",()=>i.destroy()),s}api(e,t,r){return t.dynamic?this._reader.dynamic(e,r):this._reader.static(t.patterns,r)}}t.default=a},36192:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0});let n=r(11888),i=r(87814);class s extends i.default{constructor(){super(...arguments),this._reader=new n.default(this._settings)}read(e){let t=this._getRootDirectory(e),r=this._getReaderOptions(e),n=this.api(t,e,r);return n.map(r.transform)}api(e,t,r){return t.dynamic?this._reader.dynamic(e,r):this._reader.static(t.patterns,r)}}t.default=s},1124:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0});let n=r(37551);class i{constructor(e){this._settings=e}getTransformer(){return e=>this._transform(e)}_transform(e){let t=e.path;return(this._settings.absolute&&(t=n.path.makeAbsolute(this._settings.cwd,t),t=n.path.unixify(t)),this._settings.markDirectories&&e.dirent.isDirectory()&&(t+="/"),this._settings.objectMode)?Object.assign(Object.assign({},e),{path:t}):t}}t.default=i},1275:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0});let n=r(54087),i=r(48234),s=r(19329);class a extends i.default{constructor(){super(...arguments),this._walkAsync=n.walk,this._readerStream=new s.default(this._settings)}dynamic(e,t){return new Promise((r,n)=>{this._walkAsync(e,t,(e,t)=>{null===e?r(t):n(e)})})}async static(e,t){let r=[],n=this._readerStream.static(e,t);return new Promise((e,t)=>{n.once("error",t),n.on("data",e=>r.push(e)),n.once("end",()=>e(r))})}}t.default=a},48234:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0});let n=r(71017),i=r(96494),s=r(37551);class a{constructor(e){this._settings=e,this._fsStatSettings=new i.Settings({followSymbolicLink:this._settings.followSymbolicLinks,fs:this._settings.fs,throwErrorOnBrokenSymbolicLink:this._settings.followSymbolicLinks})}_getFullEntryPath(e){return n.resolve(this._settings.cwd,e)}_makeEntry(e,t){let r={name:t,path:t,dirent:s.fs.createDirentFromStats(t,e)};return this._settings.stats&&(r.stats=e),r}_isFatalError(e){return!s.errno.isEnoentCodeError(e)&&!this._settings.suppressErrors}}t.default=a},19329:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0});let n=r(12781),i=r(96494),s=r(54087),a=r(48234);class o extends a.default{constructor(){super(...arguments),this._walkStream=s.walkStream,this._stat=i.stat}dynamic(e,t){return this._walkStream(e,t)}static(e,t){let r=e.map(this._getFullEntryPath,this),i=new n.PassThrough({objectMode:!0});i._write=(n,s,a)=>this._getEntry(r[n],e[n],t).then(e=>{null!==e&&t.entryFilter(e)&&i.push(e),n===r.length-1&&i.end(),a()}).catch(a);for(let e=0;e<r.length;e++)i.write(e);return i}_getEntry(e,t,r){return this._getStat(e).then(e=>this._makeEntry(e,t)).catch(e=>{if(r.errorFilter(e))return null;throw e})}_getStat(e){return new Promise((t,r)=>{this._stat(e,this._fsStatSettings,(e,n)=>null===e?t(n):r(e))})}}t.default=o},11888:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0});let n=r(96494),i=r(54087),s=r(48234);class a extends s.default{constructor(){super(...arguments),this._walkSync=i.walkSync,this._statSync=n.statSync}dynamic(e,t){return this._walkSync(e,t)}static(e,t){let r=[];for(let n of e){let e=this._getFullEntryPath(n),i=this._getEntry(e,n,t);null!==i&&t.entryFilter(i)&&r.push(i)}return r}_getEntry(e,t,r){try{let r=this._getStat(e);return this._makeEntry(r,t)}catch(e){if(r.errorFilter(e))return null;throw e}}_getStat(e){return this._statSync(e,this._fsStatSettings)}}t.default=a},81712:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.DEFAULT_FILE_SYSTEM_ADAPTER=void 0;let n=r(57147),i=r(22037),s=Math.max(i.cpus().length,1);t.DEFAULT_FILE_SYSTEM_ADAPTER={lstat:n.lstat,lstatSync:n.lstatSync,stat:n.stat,statSync:n.statSync,readdir:n.readdir,readdirSync:n.readdirSync};class a{constructor(e={}){this._options=e,this.absolute=this._getValue(this._options.absolute,!1),this.baseNameMatch=this._getValue(this._options.baseNameMatch,!1),this.braceExpansion=this._getValue(this._options.braceExpansion,!0),this.caseSensitiveMatch=this._getValue(this._options.caseSensitiveMatch,!0),this.concurrency=this._getValue(this._options.concurrency,s),this.cwd=this._getValue(this._options.cwd,process.cwd()),this.deep=this._getValue(this._options.deep,1/0),this.dot=this._getValue(this._options.dot,!1),this.extglob=this._getValue(this._options.extglob,!0),this.followSymbolicLinks=this._getValue(this._options.followSymbolicLinks,!0),this.fs=this._getFileSystemMethods(this._options.fs),this.globstar=this._getValue(this._options.globstar,!0),this.ignore=this._getValue(this._options.ignore,[]),this.markDirectories=this._getValue(this._options.markDirectories,!1),this.objectMode=this._getValue(this._options.objectMode,!1),this.onlyDirectories=this._getValue(this._options.onlyDirectories,!1),this.onlyFiles=this._getValue(this._options.onlyFiles,!0),this.stats=this._getValue(this._options.stats,!1),this.suppressErrors=this._getValue(this._options.suppressErrors,!1),this.throwErrorOnBrokenSymbolicLink=this._getValue(this._options.throwErrorOnBrokenSymbolicLink,!1),this.unique=this._getValue(this._options.unique,!0),this.onlyDirectories&&(this.onlyFiles=!1),this.stats&&(this.objectMode=!0),this.ignore=[].concat(this.ignore)}_getValue(e,t){return void 0===e?t:e}_getFileSystemMethods(e={}){return Object.assign(Object.assign({},t.DEFAULT_FILE_SYSTEM_ADAPTER),e)}}t.default=a},29115:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.splitWhen=t.flatten=void 0,t.flatten=function(e){return e.reduce((e,t)=>[].concat(e,t),[])},t.splitWhen=function(e,t){let r=[[]],n=0;for(let i of e)t(i)?r[++n]=[]:r[n].push(i);return r}},66883:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.isEnoentCodeError=void 0,t.isEnoentCodeError=function(e){return"ENOENT"===e.code}},85009:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.createDirentFromStats=void 0;class r{constructor(e,t){this.name=e,this.isBlockDevice=t.isBlockDevice.bind(t),this.isCharacterDevice=t.isCharacterDevice.bind(t),this.isDirectory=t.isDirectory.bind(t),this.isFIFO=t.isFIFO.bind(t),this.isFile=t.isFile.bind(t),this.isSocket=t.isSocket.bind(t),this.isSymbolicLink=t.isSymbolicLink.bind(t)}}t.createDirentFromStats=function(e,t){return new r(e,t)}},37551:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.string=t.stream=t.pattern=t.path=t.fs=t.errno=t.array=void 0;let n=r(29115);t.array=n;let i=r(66883);t.errno=i;let s=r(85009);t.fs=s;let a=r(1810);t.path=a;let o=r(40379);t.pattern=o;let l=r(25248);t.stream=l;let u=r(22588);t.string=u},1810:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.convertPosixPathToPattern=t.convertWindowsPathToPattern=t.convertPathToPattern=t.escapePosixPath=t.escapeWindowsPath=t.escape=t.removeLeadingDotSegment=t.makeAbsolute=t.unixify=void 0;let n=r(22037),i=r(71017),s="win32"===n.platform(),a=/(\\?)([()*?[\]{|}]|^!|[!+@](?=\()|\\(?![!()*+?@[\]{|}]))/g,o=/(\\?)([()[\]{}]|^!|[!+@](?=\())/g,l=/^\\\\([.?])/,u=/\\(?![!()+@[\]{}])/g;function c(e){return e.replace(o,"\\$2")}function d(e){return e.replace(a,"\\$2")}function h(e){return c(e).replace(l,"//$1").replace(u,"/")}function p(e){return d(e)}t.unixify=function(e){return e.replace(/\\/g,"/")},t.makeAbsolute=function(e,t){return i.resolve(e,t)},t.removeLeadingDotSegment=function(e){if("."===e.charAt(0)){let t=e.charAt(1);if("/"===t||"\\"===t)return e.slice(2)}return e},t.escape=s?c:d,t.escapeWindowsPath=c,t.escapePosixPath=d,t.convertPathToPattern=s?h:p,t.convertWindowsPathToPattern=h,t.convertPosixPathToPattern=p},40379:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.removeDuplicateSlashes=t.matchAny=t.convertPatternsToRe=t.makeRe=t.getPatternParts=t.expandBraceExpansion=t.expandPatternsWithBraceExpansion=t.isAffectDepthOfReadingPattern=t.endsWithSlashGlobStar=t.hasGlobStar=t.getBaseDirectory=t.isPatternRelatedToParentDirectory=t.getPatternsOutsideCurrentDirectory=t.getPatternsInsideCurrentDirectory=t.getPositivePatterns=t.getNegativePatterns=t.isPositivePattern=t.isNegativePattern=t.convertToNegativePattern=t.convertToPositivePattern=t.isDynamicPattern=t.isStaticPattern=void 0;let n=r(71017),i=r(12278),s=r(26390),a=/[*?]|^!/,o=/\[[^[]*]/,l=/(?:^|[^!*+?@])\([^(]*\|[^|]*\)/,u=/[!*+?@]\([^(]*\)/,c=/,|\.\./,d=/(?!^)\/{2,}/g;function h(e,t={}){return!p(e,t)}function p(e,t={}){return""!==e&&!!(!1===t.caseSensitiveMatch||e.includes("\\")||a.test(e)||o.test(e)||l.test(e)||!1!==t.extglob&&u.test(e)||!1!==t.braceExpansion&&function(e){let t=e.indexOf("{");if(-1===t)return!1;let r=e.indexOf("}",t+1);if(-1===r)return!1;let n=e.slice(t,r);return c.test(n)}(e))}function f(e){return e.startsWith("!")&&"("!==e[1]}function y(e){return!f(e)}function m(e){return e.startsWith("..")||e.startsWith("./..")}function g(e){return e.endsWith("/**")}function b(e){let t=s.braces(e,{expand:!0,nodupes:!0,keepEscaping:!0});return t.sort((e,t)=>e.length-t.length),t.filter(e=>""!==e)}function S(e,t){return s.makeRe(e,t)}t.isStaticPattern=h,t.isDynamicPattern=p,t.convertToPositivePattern=function(e){return f(e)?e.slice(1):e},t.convertToNegativePattern=function(e){return"!"+e},t.isNegativePattern=f,t.isPositivePattern=y,t.getNegativePatterns=function(e){return e.filter(f)},t.getPositivePatterns=function(e){return e.filter(y)},t.getPatternsInsideCurrentDirectory=function(e){return e.filter(e=>!m(e))},t.getPatternsOutsideCurrentDirectory=function(e){return e.filter(m)},t.isPatternRelatedToParentDirectory=m,t.getBaseDirectory=function(e){return i(e,{flipBackslashes:!1})},t.hasGlobStar=function(e){return e.includes("**")},t.endsWithSlashGlobStar=g,t.isAffectDepthOfReadingPattern=function(e){let t=n.basename(e);return g(e)||h(t)},t.expandPatternsWithBraceExpansion=function(e){return e.reduce((e,t)=>e.concat(b(t)),[])},t.expandBraceExpansion=b,t.getPatternParts=function(e,t){let{parts:r}=s.scan(e,Object.assign(Object.assign({},t),{parts:!0}));return 0===r.length&&(r=[e]),r[0].startsWith("/")&&(r[0]=r[0].slice(1),r.unshift("")),r},t.makeRe=S,t.convertPatternsToRe=function(e,t){return e.map(e=>S(e,t))},t.matchAny=function(e,t){return t.some(t=>t.test(e))},t.removeDuplicateSlashes=function(e){return e.replace(d,"/")}},25248:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.merge=void 0;let n=r(65684);function i(e){e.forEach(e=>e.emit("close"))}t.merge=function(e){let t=n(e);return e.forEach(e=>{e.once("error",e=>t.emit("error",e))}),t.once("close",()=>i(e)),t.once("end",()=>i(e)),t}},22588:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.isEmpty=t.isString=void 0,t.isString=function(e){return"string"==typeof e},t.isEmpty=function(e){return""===e}},58141:(e,t,r)=>{var n=r(67745);function i(e,t,r){if("function"==typeof e&&(r=t,t=e,e=null),r<1)throw Error("fastqueue concurrency must be greater than 1");var i=n(a),o=null,l=null,u=0,c=null,d={push:function(r,n){var a=i.get();a.context=e,a.release=h,a.value=r,a.callback=n||s,a.errorHandler=c,u===d.concurrency||d.paused?l?(l.next=a,l=a):(o=a,l=a,d.saturated()):(u++,t.call(e,a.value,a.worked))},drain:s,saturated:s,pause:function(){d.paused=!0},paused:!1,concurrency:r,running:function(){return u},resume:function(){if(d.paused){d.paused=!1;for(var e=0;e<d.concurrency;e++)u++,h()}},idle:function(){return 0===u&&0===d.length()},length:function(){for(var e=o,t=0;e;)e=e.next,t++;return t},getQueue:function(){for(var e=o,t=[];e;)t.push(e.value),e=e.next;return t},unshift:function(r,n){var a=i.get();a.context=e,a.release=h,a.value=r,a.callback=n||s,u===d.concurrency||d.paused?o?(a.next=o,o=a):(o=a,l=a,d.saturated()):(u++,t.call(e,a.value,a.worked))},empty:s,kill:function(){o=null,l=null,d.drain=s},killAndDrain:function(){o=null,l=null,d.drain(),d.drain=s},error:function(e){c=e}};return d;function h(r){r&&i.release(r);var n=o;n?d.paused?u--:(l===o&&(l=null),o=n.next,n.next=null,t.call(e,n.value,n.worked),null===l&&d.empty()):0==--u&&d.drain()}}function s(){}function a(){this.value=null,this.callback=s,this.next=null,this.release=s,this.context=null,this.errorHandler=null;var e=this;this.worked=function(t,r){var n=e.callback,i=e.errorHandler,a=e.value;e.value=null,e.callback=s,e.errorHandler&&i(t,a),n.call(e.context,t,r),e.release(e)}}e.exports=i,e.exports.promise=function(e,t,r){"function"==typeof e&&(r=t,t=e,e=null);var n=i(e,function(e,r){t.call(this,e).then(function(e){r(null,e)},r)},r),a=n.push,o=n.unshift;return n.push=function(e){var t=new Promise(function(t,r){a(e,function(e,n){if(e){r(e);return}t(n)})});return t.catch(s),t},n.unshift=function(e){var t=new Promise(function(t,r){o(e,function(e,n){if(e){r(e);return}t(n)})});return t.catch(s),t},n.drained=function(){if(n.idle())return new Promise(function(e){e()});var e=n.drain;return new Promise(function(t){n.drain=function(){e(),t()}})},n}},26526:(e,t,r)=>{/*!
 * fill-range <https://github.com/jonschlinkert/fill-range>
 *
 * Copyright (c) 2014-present, Jon Schlinkert.
 * Licensed under the MIT License.
 */let n=r(73837),i=r(91822),s=e=>null!==e&&"object"==typeof e&&!Array.isArray(e),a=e=>t=>!0===e?Number(t):String(t),o=e=>"number"==typeof e||"string"==typeof e&&""!==e,l=e=>Number.isInteger(+e),u=e=>{let t=`${e}`,r=-1;if("-"===t[0]&&(t=t.slice(1)),"0"===t)return!1;for(;"0"===t[++r];);return r>0},c=(e,t,r)=>"string"==typeof e||"string"==typeof t||!0===r.stringify,d=(e,t,r)=>{if(t>0){let r="-"===e[0]?"-":"";r&&(e=e.slice(1)),e=r+e.padStart(r?t-1:t,"0")}return!1===r?String(e):e},h=(e,t)=>{let r="-"===e[0]?"-":"";for(r&&(e=e.slice(1),t--);e.length<t;)e="0"+e;return r?"-"+e:e},p=(e,t)=>{let r;e.negatives.sort((e,t)=>e<t?-1:e>t?1:0),e.positives.sort((e,t)=>e<t?-1:e>t?1:0);let n=t.capture?"":"?:",i="",s="";return(e.positives.length&&(i=e.positives.join("|")),e.negatives.length&&(s=`-(${n}${e.negatives.join("|")})`),r=i&&s?`${i}|${s}`:i||s,t.wrap)?`(${n}${r})`:r},f=(e,t,r,n)=>{if(r)return i(e,t,{wrap:!1,...n});let s=String.fromCharCode(e);if(e===t)return s;let a=String.fromCharCode(t);return`[${s}-${a}]`},y=(e,t,r)=>{if(Array.isArray(e)){let t=!0===r.wrap,n=r.capture?"":"?:";return t?`(${n}${e.join("|")})`:e.join("|")}return i(e,t,r)},m=(...e)=>RangeError("Invalid range arguments: "+n.inspect(...e)),g=(e,t,r)=>{if(!0===r.strictRanges)throw m([e,t]);return[]},b=(e,t)=>{if(!0===t.strictRanges)throw TypeError(`Expected step "${e}" to be a number`);return[]},S=(e,t,r=1,n={})=>{let i=Number(e),s=Number(t);if(!Number.isInteger(i)||!Number.isInteger(s)){if(!0===n.strictRanges)throw m([e,t]);return[]}0===i&&(i=0),0===s&&(s=0);let o=i>s,l=String(e),g=String(t),b=String(r);r=Math.max(Math.abs(r),1);let S=u(l)||u(g)||u(b),v=S?Math.max(l.length,g.length,b.length):0,E=!1===S&&!1===c(e,t,n),k=n.transform||a(E);if(n.toRegex&&1===r)return f(h(e,v),h(t,v),!0,n);let K={negatives:[],positives:[]},w=e=>K[e<0?"negatives":"positives"].push(Math.abs(e)),I=[],x=0;for(;o?i>=s:i<=s;)!0===n.toRegex&&r>1?w(i):I.push(d(k(i,x),v,E)),i=o?i-r:i+r,x++;return!0===n.toRegex?r>1?p(K,n):y(I,null,{wrap:!1,...n}):I},v=(e,t,r=1,n={})=>{if(!l(e)&&e.length>1||!l(t)&&t.length>1)return g(e,t,n);let i=n.transform||(e=>String.fromCharCode(e)),s=`${e}`.charCodeAt(0),a=`${t}`.charCodeAt(0),o=s>a,u=Math.min(s,a),c=Math.max(s,a);if(n.toRegex&&1===r)return f(u,c,!1,n);let d=[],h=0;for(;o?s>=a:s<=a;)d.push(i(s,h)),s=o?s-r:s+r,h++;return!0===n.toRegex?y(d,null,{wrap:!1,options:n}):d},E=(e,t,r,n={})=>{if(null==t&&o(e))return[e];if(!o(e)||!o(t))return g(e,t,n);if("function"==typeof r)return E(e,t,1,{transform:r});if(s(r))return E(e,t,0,r);let i={...n};return(!0===i.capture&&(i.wrap=!0),l(r=r||i.step||1))?l(e)&&l(t)?S(e,t,r,i):v(e,t,Math.max(Math.abs(r),1),i):null==r||s(r)?E(e,t,1,r):b(r,i)};e.exports=E},70145:e=>{e.exports=(e,t=process.argv)=>{let r=e.startsWith("-")?"":1===e.length?"-":"--",n=t.indexOf(r+e),i=t.indexOf("--");return -1!==n&&(-1===i||n<i)}},95869:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0});let n=r(48789),i=r(60159),s=r(13534),a=r(27132);class o{constructor(e,t=[],r={},n){if(this.name=e,this.inTransaction=!1,this.isResolved=!1,this.transformed=!1,this.replyEncoding=r.replyEncoding,this.errorStack=r.errorStack,this.args=t.flat(),this.callback=n,this.initPromise(),r.keyPrefix){let e=r.keyPrefix instanceof Buffer,t=e?r.keyPrefix:null;this._iterateKeys(n=>n instanceof Buffer?(null===t&&(t=Buffer.from(r.keyPrefix)),Buffer.concat([t,n])):e?Buffer.concat([r.keyPrefix,Buffer.from(String(n))]):r.keyPrefix+n)}r.readOnly&&(this.isReadOnly=!0)}static checkFlag(e,t){return!!this.getFlagMap()[e][t]}static setArgumentTransformer(e,t){this._transformer.argument[e]=t}static setReplyTransformer(e,t){this._transformer.reply[e]=t}static getFlagMap(){return this.flagMap||(this.flagMap=Object.keys(o.FLAGS).reduce((e,t)=>(e[t]={},o.FLAGS[t].forEach(r=>{e[t][r]=!0}),e),{})),this.flagMap}getSlot(){if(void 0===this.slot){let e=this.getKeys()[0];this.slot=null==e?null:i(e)}return this.slot}getKeys(){return this._iterateKeys()}toWritable(e){let t;let r="*"+(this.args.length+1)+"\r\n$"+Buffer.byteLength(this.name)+"\r\n"+this.name+"\r\n";if(this.bufferMode){let e=new c;e.push(r);for(let t=0;t<this.args.length;++t){let r=this.args[t];r instanceof Buffer?0===r.length?e.push("$0\r\n\r\n"):(e.push("$"+r.length+"\r\n"),e.push(r),e.push("\r\n")):e.push("$"+Buffer.byteLength(r)+"\r\n"+r+"\r\n")}t=e.toBuffer()}else{t=r;for(let e=0;e<this.args.length;++e){let r=this.args[e];t+="$"+Buffer.byteLength(r)+"\r\n"+r+"\r\n"}}return t}stringifyArguments(){for(let e=0;e<this.args.length;++e){let t=this.args[e];"string"==typeof t||(t instanceof Buffer?this.bufferMode=!0:this.args[e]=(0,a.toArg)(t))}}transformReply(e){this.replyEncoding&&(e=(0,a.convertBufferToString)(e,this.replyEncoding));let t=o._transformer.reply[this.name];return t&&(e=t(e)),e}setTimeout(e){this._commandTimeoutTimer||(this._commandTimeoutTimer=setTimeout(()=>{this.isResolved||this.reject(Error("Command timed out"))},e))}initPromise(){let e=new Promise((e,t)=>{if(!this.transformed){this.transformed=!0;let e=o._transformer.argument[this.name];e&&(this.args=e(this.args)),this.stringifyArguments()}this.resolve=this._convertValue(e),this.errorStack?this.reject=e=>{t((0,a.optimizeErrorStack)(e,this.errorStack.stack,__dirname))}:this.reject=t});this.promise=(0,s.default)(e,this.callback)}_iterateKeys(e=e=>e){if(void 0===this.keys&&(this.keys=[],(0,n.exists)(this.name))){let t=(0,n.getKeyIndexes)(this.name,this.args);for(let r of t)this.args[r]=e(this.args[r]),this.keys.push(this.args[r])}return this.keys}_convertValue(e){return t=>{try{let r=this._commandTimeoutTimer;r&&(clearTimeout(r),delete this._commandTimeoutTimer),e(this.transformReply(t)),this.isResolved=!0}catch(e){this.reject(e)}return this.promise}}}t.default=o,o.FLAGS={VALID_IN_SUBSCRIBER_MODE:["subscribe","psubscribe","unsubscribe","punsubscribe","ssubscribe","sunsubscribe","ping","quit"],VALID_IN_MONITOR_MODE:["monitor","auth"],ENTER_SUBSCRIBER_MODE:["subscribe","psubscribe","ssubscribe"],EXIT_SUBSCRIBER_MODE:["unsubscribe","punsubscribe","sunsubscribe"],WILL_DISCONNECT:["quit"]},o._transformer={argument:{},reply:{}};let l=function(e){if(1===e.length){if(e[0]instanceof Map)return(0,a.convertMapToArray)(e[0]);if("object"==typeof e[0]&&null!==e[0])return(0,a.convertObjectToArray)(e[0])}return e},u=function(e){if(2===e.length){if(e[1]instanceof Map)return[e[0]].concat((0,a.convertMapToArray)(e[1]));if("object"==typeof e[1]&&null!==e[1])return[e[0]].concat((0,a.convertObjectToArray)(e[1]))}return e};o.setArgumentTransformer("mset",l),o.setArgumentTransformer("msetnx",l),o.setArgumentTransformer("hset",u),o.setArgumentTransformer("hmset",u),o.setReplyTransformer("hgetall",function(e){if(Array.isArray(e)){let t={};for(let r=0;r<e.length;r+=2){let n=e[r],i=e[r+1];n in t?Object.defineProperty(t,n,{value:i,configurable:!0,enumerable:!0,writable:!0}):t[n]=i}return t}return e});class c{constructor(){this.length=0,this.items=[]}push(e){this.length+=Buffer.byteLength(e),this.items.push(e)}toBuffer(){let e=Buffer.allocUnsafe(this.length),t=0;for(let r of this.items){let n=Buffer.byteLength(r);Buffer.isBuffer(r)?r.copy(e,t):e.write(r,t,n),t+=n}return e}}},99601:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0});let n=r(95869),i=r(27132),s=r(67221),a=r(86276),o=(0,i.Debug)("dataHandler");class l{constructor(e,t){this.redis=e;let r=new s({stringNumbers:t.stringNumbers,returnBuffers:!0,returnError:e=>{this.returnError(e)},returnFatalError:e=>{this.returnFatalError(e)},returnReply:e=>{this.returnReply(e)}});e.stream.on("data",e=>{r.execute(e)})}returnFatalError(e){e.message+=". Please report this.",this.redis.recoverFromFatalError(e,e,{offlineQueue:!1})}returnError(e){let t=this.shiftCommand(e);t&&(e.command={name:t.command.name,args:t.command.args},this.redis.handleReconnection(e,t))}returnReply(e){if(this.handleMonitorReply(e)||this.handleSubscriberReply(e))return;let t=this.shiftCommand(e);t&&(n.default.checkFlag("ENTER_SUBSCRIBER_MODE",t.command.name)?(this.redis.condition.subscriber=new a.default,this.redis.condition.subscriber.add(t.command.name,e[1].toString()),c(t.command,e[2])||this.redis.commandQueue.unshift(t)):n.default.checkFlag("EXIT_SUBSCRIBER_MODE",t.command.name)?d(t.command,e[2])||this.redis.commandQueue.unshift(t):t.command.resolve(e))}handleSubscriberReply(e){if(!this.redis.condition.subscriber)return!1;let t=Array.isArray(e)?e[0].toString():null;switch(o('receive reply "%s" in subscriber mode',t),t){case"message":this.redis.listeners("message").length>0&&this.redis.emit("message",e[1].toString(),e[2]?e[2].toString():""),this.redis.emit("messageBuffer",e[1],e[2]);break;case"pmessage":{let t=e[1].toString();this.redis.listeners("pmessage").length>0&&this.redis.emit("pmessage",t,e[2].toString(),e[3].toString()),this.redis.emit("pmessageBuffer",t,e[2],e[3]);break}case"smessage":this.redis.listeners("smessage").length>0&&this.redis.emit("smessage",e[1].toString(),e[2]?e[2].toString():""),this.redis.emit("smessageBuffer",e[1],e[2]);break;case"ssubscribe":case"subscribe":case"psubscribe":{let r=e[1].toString();this.redis.condition.subscriber.add(t,r);let n=this.shiftCommand(e);if(!n)return;c(n.command,e[2])||this.redis.commandQueue.unshift(n);break}case"sunsubscribe":case"unsubscribe":case"punsubscribe":{let r=e[1]?e[1].toString():null;r&&this.redis.condition.subscriber.del(t,r);let n=e[2];0===Number(n)&&(this.redis.condition.subscriber=!1);let i=this.shiftCommand(e);if(!i)return;d(i.command,n)||this.redis.commandQueue.unshift(i);break}default:{let t=this.shiftCommand(e);if(!t)return;t.command.resolve(e)}}return!0}handleMonitorReply(e){if("monitoring"!==this.redis.status)return!1;let t=e.toString();if("OK"===t)return!1;let r=t.indexOf(" "),n=t.slice(0,r),i=t.indexOf('"'),s=t.slice(i+1,-1).split('" "').map(e=>e.replace(/\\"/g,'"')),a=t.slice(r+2,i-2).split(" ");return this.redis.emit("monitor",n,s,a[1],a[0]),!0}shiftCommand(e){let t=this.redis.commandQueue.shift();if(!t){let t=Error("Command queue state error. If you can reproduce this, please report it."+(e instanceof Error?` Last error: ${e.message}`:` Last reply: ${e.toString()}`));return this.redis.emit("error",t),null}return t}}t.default=l;let u=new WeakMap;function c(e,t){let r=u.has(e)?u.get(e):e.args.length;return(r-=1)<=0?(e.resolve(t),u.delete(e),!0):(u.set(e,r),!1)}function d(e,t){let r=u.has(e)?u.get(e):e.args.length;return 0===r?0===Number(t)&&(u.delete(e),e.resolve(t),!0):(r-=1)<=0?(e.resolve(t),!0):(u.set(e,r),!1)}},13261:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0});let n=r(60159),i=r(48789),s=r(13534),a=r(73837),o=r(95869),l=r(27132),u=r(23410);class c extends u.default{constructor(e){super(),this.redis=e,this.isPipeline=!0,this.replyPending=0,this._queue=[],this._result=[],this._transactions=0,this._shaToScript={},this.isCluster="Cluster"===this.redis.constructor.name||this.redis.isCluster,this.options=e.options,Object.keys(e.scriptsSet).forEach(t=>{let r=e.scriptsSet[t];this._shaToScript[r.sha]=r,this[t]=e[t],this[t+"Buffer"]=e[t+"Buffer"]}),e.addedBuiltinSet.forEach(t=>{this[t]=e[t],this[t+"Buffer"]=e[t+"Buffer"]}),this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t});let t=this;Object.defineProperty(this,"length",{get:function(){return t._queue.length}})}fillResult(e,t){if("exec"===this._queue[t].name&&Array.isArray(e[1])){let r=e[1].length;for(let n=0;n<r;n++){if(e[1][n]instanceof Error)continue;let i=this._queue[t-(r-n)];try{e[1][n]=i.transformReply(e[1][n])}catch(t){e[1][n]=t}}}if(this._result[t]=e,--this.replyPending)return;if(this.isCluster){let e,t=!0;for(let r=0;r<this._result.length;++r){let n=this._result[r][0],s=this._queue[r];if(n){if("exec"===s.name&&"EXECABORT Transaction discarded because of previous errors."===n.message)continue;if(e){if(e.name!==n.name||e.message!==n.message){t=!1;break}}else e={name:n.name,message:n.message}}else if(!s.inTransaction){let e=(0,i.exists)(s.name)&&(0,i.hasFlag)(s.name,"readonly");if(!e){t=!1;break}}}if(e&&t){let t=this,r=e.message.split(" "),n=this._queue,i=!1;this._queue=[];for(let e=0;e<n.length;++e){if("ASK"===r[0]&&!i&&"asking"!==n[e].name&&(!n[e-1]||"asking"!==n[e-1].name)){let e=new o.default("asking");e.ignore=!0,this.sendCommand(e)}n[e].initPromise(),this.sendCommand(n[e]),i=n[e].inTransaction}let s=!0;void 0===this.leftRedirections&&(this.leftRedirections={});let a=function(){t.exec()},l=this.redis;if(l.handleError(e,this.leftRedirections,{moved:function(e,n){t.preferKey=n,l.slots[r[1]]=[n],l._groupsBySlot[r[1]]=l._groupsIds[l.slots[r[1]].join(";")],l.refreshSlotsCache(),t.exec()},ask:function(e,r){t.preferKey=r,t.exec()},tryagain:a,clusterDown:a,connectionClosed:a,maxRedirections:()=>{s=!1},defaults:()=>{s=!1}}),s)return}}let r=0;for(let e=0;e<this._queue.length-r;++e)this._queue[e+r].ignore&&(r+=1),this._result[e]=this._result[e+r];this.resolve(this._result.slice(0,this._result.length-r))}sendCommand(e){this._transactions>0&&(e.inTransaction=!0);let t=this._queue.length;return e.pipelineIndex=t,e.promise.then(e=>{this.fillResult([null,e],t)}).catch(e=>{this.fillResult([e],t)}),this._queue.push(e),this}addBatch(e){let t,r,n;for(let i=0;i<e.length;++i)r=(t=e[i])[0],n=t.slice(1),this[r].apply(this,n);return this}}t.default=c;let d=c.prototype.multi;c.prototype.multi=function(){return this._transactions+=1,d.apply(this,arguments)};let h=c.prototype.execBuffer;c.prototype.execBuffer=(0,a.deprecate)(function(){return this._transactions>0&&(this._transactions-=1),h.apply(this,arguments)},"Pipeline#execBuffer: Use Pipeline#exec instead"),c.prototype.exec=function(e){let t;if(this.isCluster&&!this.redis.slots.length)return"wait"===this.redis.status&&this.redis.connect().catch(l.noop),e&&!this.nodeifiedPromise&&(this.nodeifiedPromise=!0,(0,s.default)(this.promise,e)),this.redis.delayUntilReady(t=>{if(t){this.reject(t);return}this.exec(e)}),this.promise;if(this._transactions>0)return this._transactions-=1,h.apply(this,arguments);if(this.nodeifiedPromise||(this.nodeifiedPromise=!0,(0,s.default)(this.promise,e)),this._queue.length||this.resolve([]),this.isCluster){let e=[];for(let t=0;t<this._queue.length;t++){let r=this._queue[t].getKeys();if(r.length&&e.push(r[0]),r.length&&0>n.generateMulti(r))return this.reject(Error("All the keys in a pipeline command should belong to the same slot")),this.promise}if(e.length){if((t=function(e,t){let r=n(t[0]),i=e._groupsBySlot[r];for(let r=1;r<t.length;r++)if(e._groupsBySlot[n(t[r])]!==i)return -1;return r}(this.redis,e))<0)return this.reject(Error("All keys in the pipeline should belong to the same slots allocation group")),this.promise}else t=16384*Math.random()|0}let r=this;return function(){let e,n,i=r.replyPending=r._queue.length;r.isCluster&&(e={slot:t,redis:r.redis.connectionPool.nodes.all[r.preferKey]});let s="",a={isPipeline:!0,destination:r.isCluster?e:{redis:r.redis},write(e){"string"!=typeof e?(n||(n=[]),s&&(n.push(Buffer.from(s,"utf8")),s=""),n.push(e)):s+=e,--i||(n?(s&&n.push(Buffer.from(s,"utf8")),a.destination.redis.stream.write(Buffer.concat(n))):a.destination.redis.stream.write(s),i=r._queue.length,s="",n=void 0)}};for(let t=0;t<r._queue.length;++t)r.redis.sendCommand(r._queue[t],a,e);r.promise}(),this.promise}},12858:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0});let n=r(48789),i=r(82361),s=r(13534),a=r(11610),o=r(95869),l=r(52381),u=r(33929),c=r(93114),d=r(11049),h=r(85439),p=r(70214),f=r(27132),y=r(52449),m=r(23410),g=r(91823),b=r(28768),S=(0,f.Debug)("redis");class v extends m.default{constructor(e,t,r){if(super(),this.status="wait",this.isCluster=!1,this.reconnectTimeout=null,this.connectionEpoch=0,this.retryAttempts=0,this.manuallyClosing=!1,this._autoPipelines=new Map,this._runningAutoPipelines=new Set,this.parseOptions(e,t,r),i.EventEmitter.call(this),this.resetCommandQueue(),this.resetOfflineQueue(),this.options.Connector)this.connector=new this.options.Connector(this.options);else if(this.options.sentinels){let e=new u.default(this.options);e.emitter=this,this.connector=e}else this.connector=new l.StandaloneConnector(this.options);this.options.scripts&&Object.entries(this.options.scripts).forEach(([e,t])=>{this.defineCommand(e,t)}),this.options.lazyConnect?this.setStatus("wait"):this.connect().catch(g.noop)}static createClient(...e){return new v(...e)}get autoPipelineQueueSize(){let e=0;for(let t of this._autoPipelines.values())e+=t.length;return e}connect(e){let t=new Promise((e,t)=>{if("connecting"===this.status||"connect"===this.status||"ready"===this.status){t(Error("Redis is already connecting/connected"));return}this.connectionEpoch+=1,this.setStatus("connecting");let{options:r}=this;this.condition={select:r.db,auth:r.username?[r.username,r.password]:r.password,subscriber:!1};let n=this;(0,s.default)(this.connector.connect(function(e,t){n.silentEmit(e,t)}),function(i,s){if(i){n.flushQueue(i),n.silentEmit("error",i),t(i),n.setStatus("end");return}let a=r.tls?"secureConnect":"connect";if("sentinels"in r&&r.sentinels&&!r.enableTLSForSentinelMode&&(a="connect"),n.stream=s,r.noDelay&&s.setNoDelay(!0),"number"==typeof r.keepAlive&&(s.connecting?s.once(a,()=>{s.setKeepAlive(!0,r.keepAlive)}):s.setKeepAlive(!0,r.keepAlive)),s.connecting){if(s.once(a,c.connectHandler(n)),r.connectTimeout){let e=!1;s.setTimeout(r.connectTimeout,function(){if(e)return;s.setTimeout(0),s.destroy();let t=Error("connect ETIMEDOUT");t.errorno="ETIMEDOUT",t.code="ETIMEDOUT",t.syscall="connect",c.errorHandler(n)(t)}),s.once(a,function(){e=!0,s.setTimeout(0)})}}else if(s.destroyed){let e=n.connector.firstError;e&&process.nextTick(()=>{c.errorHandler(n)(e)}),process.nextTick(c.closeHandler(n))}else process.nextTick(c.connectHandler(n));s.destroyed||(s.once("error",c.errorHandler(n)),s.once("close",c.closeHandler(n)));let o=function(){n.removeListener("close",l),e()};var l=function(){n.removeListener("ready",o),t(Error(f.CONNECTION_CLOSED_ERROR_MSG))};n.once("ready",o),n.once("close",l)})});return(0,s.default)(t,e)}disconnect(e=!1){e||(this.manuallyClosing=!0),this.reconnectTimeout&&!e&&(clearTimeout(this.reconnectTimeout),this.reconnectTimeout=null),"wait"===this.status?c.closeHandler(this)():this.connector.disconnect()}end(){this.disconnect()}duplicate(e){return new v({...this.options,...e})}get mode(){var e;return this.options.monitor?"monitor":(null===(e=this.condition)||void 0===e?void 0:e.subscriber)?"subscriber":"normal"}monitor(e){let t=this.duplicate({monitor:!0,lazyConnect:!1});return(0,s.default)(new Promise(function(e,r){t.once("error",r),t.once("monitoring",function(){e(t)})}),e)}sendCommand(e,t){var r,i;if("wait"===this.status&&this.connect().catch(g.noop),"end"===this.status)return e.reject(Error(f.CONNECTION_CLOSED_ERROR_MSG)),e.promise;if((null===(r=this.condition)||void 0===r?void 0:r.subscriber)&&!o.default.checkFlag("VALID_IN_SUBSCRIBER_MODE",e.name))return e.reject(Error("Connection in subscriber mode, only subscriber commands may be used")),e.promise;"number"==typeof this.options.commandTimeout&&e.setTimeout(this.options.commandTimeout);let s="ready"===this.status||!t&&"connect"===this.status&&(0,n.exists)(e.name)&&(0,n.hasFlag)(e.name,"loading");if(this.stream&&this.stream.writable?this.stream._writableState&&this.stream._writableState.ended&&(s=!1):s=!1,s)S.enabled&&S("write command[%s]: %d -> %s(%o)",this._getDescription(),null===(i=this.condition)||void 0===i?void 0:i.select,e.name,e.args),t?"isPipeline"in t&&t.isPipeline?t.write(e.toWritable(t.destination.redis.stream)):t.write(e.toWritable(t)):this.stream.write(e.toWritable(this.stream)),this.commandQueue.push({command:e,stream:t,select:this.condition.select}),o.default.checkFlag("WILL_DISCONNECT",e.name)&&(this.manuallyClosing=!0);else{if(!this.options.enableOfflineQueue)return e.reject(Error("Stream isn't writeable and enableOfflineQueue options is false")),e.promise;if("quit"===e.name&&0===this.offlineQueue.length)return this.disconnect(),e.resolve(Buffer.from("OK")),e.promise;S.enabled&&S("queue command[%s]: %d -> %s(%o)",this._getDescription(),this.condition.select,e.name,e.args),this.offlineQueue.push({command:e,stream:t,select:this.condition.select})}if("select"===e.name&&(0,f.isInt)(e.args[0])){let t=parseInt(e.args[0],10);this.condition.select!==t&&(this.condition.select=t,this.emit("select",t),S("switch to db [%d]",this.condition.select))}return e.promise}scanStream(e){return this.createScanStream("scan",{options:e})}scanBufferStream(e){return this.createScanStream("scanBuffer",{options:e})}sscanStream(e,t){return this.createScanStream("sscan",{key:e,options:t})}sscanBufferStream(e,t){return this.createScanStream("sscanBuffer",{key:e,options:t})}hscanStream(e,t){return this.createScanStream("hscan",{key:e,options:t})}hscanBufferStream(e,t){return this.createScanStream("hscanBuffer",{key:e,options:t})}zscanStream(e,t){return this.createScanStream("zscan",{key:e,options:t})}zscanBufferStream(e,t){return this.createScanStream("zscanBuffer",{key:e,options:t})}silentEmit(e,t){let r;return"error"===e&&(r=t,"end"===this.status||this.manuallyClosing&&r instanceof Error&&(r.message===f.CONNECTION_CLOSED_ERROR_MSG||"connect"===r.syscall||"read"===r.syscall))?void 0:this.listeners(e).length>0?this.emit.apply(this,arguments):(r&&r instanceof Error&&console.error("[ioredis] Unhandled error event:",r.stack),!1)}recoverFromFatalError(e,t,r){this.flushQueue(t,r),this.silentEmit("error",t),this.disconnect(!0)}handleReconnection(e,t){var r;let n=!1;switch(this.options.reconnectOnError&&(n=this.options.reconnectOnError(e)),n){case 1:case!0:"reconnecting"!==this.status&&this.disconnect(!0),t.command.reject(e);break;case 2:"reconnecting"!==this.status&&this.disconnect(!0),(null===(r=this.condition)||void 0===r?void 0:r.select)!==t.select&&"select"!==t.command.name&&this.select(t.select),this.sendCommand(t.command);break;default:t.command.reject(e)}}_getDescription(){let e;return e="path"in this.options&&this.options.path?this.options.path:this.stream&&this.stream.remoteAddress&&this.stream.remotePort?this.stream.remoteAddress+":"+this.stream.remotePort:"host"in this.options&&this.options.host?this.options.host+":"+this.options.port:"",this.options.connectionName&&(e+=` (${this.options.connectionName})`),e}resetCommandQueue(){this.commandQueue=new b}resetOfflineQueue(){this.offlineQueue=new b}parseOptions(...e){let t={},r=!1;for(let n=0;n<e.length;++n){let i=e[n];if(null!=i){if("object"==typeof i)(0,g.defaults)(t,i);else if("string"==typeof i)(0,g.defaults)(t,(0,f.parseURL)(i)),i.startsWith("rediss://")&&(r=!0);else if("number"==typeof i)t.port=i;else throw Error("Invalid argument "+i)}}r&&(0,g.defaults)(t,{tls:!0}),(0,g.defaults)(t,v.defaultOptions),"string"==typeof t.port&&(t.port=parseInt(t.port,10)),"string"==typeof t.db&&(t.db=parseInt(t.db,10)),this.options=(0,f.resolveTLSProfile)(t)}setStatus(e,t){S.enabled&&S("status[%s]: %s -> %s",this._getDescription(),this.status||"[empty]",e),this.status=e,process.nextTick(this.emit.bind(this,e,t))}createScanStream(e,{key:t,options:r={}}){return new h.default({objectMode:!0,key:t,redis:this,command:e,...r})}flushQueue(e,t){let r;if((t=(0,g.defaults)({},t,{offlineQueue:!0,commandQueue:!0})).offlineQueue)for(;r=this.offlineQueue.shift();)r.command.reject(e);if(t.commandQueue&&this.commandQueue.length>0)for(this.stream&&this.stream.removeAllListeners("data");r=this.commandQueue.shift();)r.command.reject(e)}_readyCheck(e){let t=this;this.info(function(r,n){if(r)return r.message&&r.message.includes("NOPERM")?(console.warn(`Skipping the ready check because INFO command fails: "${r.message}". You can disable ready check with "enableReadyCheck". More: https://github.com/luin/ioredis/wiki/Disable-ready-check.`),e(null,{})):e(r);if("string"!=typeof n)return e(null,n);let i={},s=n.split("\r\n");for(let e=0;e<s.length;++e){let[t,...r]=s[e].split(":"),n=r.join(":");n&&(i[t]=n)}if(i.loading&&"0"!==i.loading){let r=1e3*(i.loading_eta_seconds||1),n=t.options.maxLoadingRetryTime&&t.options.maxLoadingRetryTime<r?t.options.maxLoadingRetryTime:r;S("Redis server still loading, trying again in "+n+"ms"),setTimeout(function(){t._readyCheck(e)},n)}else e(null,i)}).catch(g.noop)}}v.Cluster=a.default,v.Command=o.default,v.defaultOptions=d.DEFAULT_REDIS_OPTIONS,(0,y.default)(v,i.EventEmitter),(0,p.addTransactionSupport)(v.prototype),t.default=v},85439:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0});let n=r(12781);class i extends n.Readable{constructor(e){super(e),this.opt=e,this._redisCursor="0",this._redisDrained=!1}_read(){if(this._redisDrained){this.push(null);return}let e=[this._redisCursor];this.opt.key&&e.unshift(this.opt.key),this.opt.match&&e.push("MATCH",this.opt.match),this.opt.type&&e.push("TYPE",this.opt.type),this.opt.count&&e.push("COUNT",String(this.opt.count)),this.opt.redis[this.opt.command](e,(e,t)=>{if(e){this.emit("error",e);return}this._redisCursor=t[0]instanceof Buffer?t[0].toString():t[0],"0"===this._redisCursor&&(this._redisDrained=!0),this.push(t[1])})}close(){this._redisDrained=!0}}t.default=i},90406:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0});let n=r(6113),i=r(95869),s=r(13534);class a{constructor(e,t=null,r="",s=!1){this.lua=e,this.numberOfKeys=t,this.keyPrefix=r,this.readOnly=s,this.sha=(0,n.createHash)("sha1").update(e).digest("hex");let a=this.sha,o=new WeakSet;this.Command=class extends i.default{toWritable(t){let r=this.reject;return this.reject=e=>{-1!==e.message.indexOf("NOSCRIPT")&&o.delete(t),r.call(this,e)},o.has(t)?"eval"===this.name&&(this.name="evalsha",this.args[0]=a):(o.add(t),this.name="eval",this.args[0]=e),super.toWritable(t)}}}execute(e,t,r,n){"number"==typeof this.numberOfKeys&&t.unshift(this.numberOfKeys),this.keyPrefix&&(r.keyPrefix=this.keyPrefix),this.readOnly&&(r.readOnly=!0);let i=new this.Command("evalsha",[this.sha,...t],r);return i.promise=i.promise.catch(n=>{if(-1===n.message.indexOf("NOSCRIPT"))throw n;let i=new this.Command("evalsha",[this.sha,...t],r),s=e.isPipeline?e.redis:e;return s.sendCommand(i)}),(0,s.default)(i.promise,n),e.sendCommand(i)}}t.default=a},86276:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0});class r{constructor(){this.set={subscribe:{},psubscribe:{},ssubscribe:{}}}add(e,t){this.set[n(e)][t]=!0}del(e,t){delete this.set[n(e)][t]}channels(e){return Object.keys(this.set[n(e)])}isEmpty(){return 0===this.channels("subscribe").length&&0===this.channels("psubscribe").length&&0===this.channels("ssubscribe").length}}function n(e){return"unsubscribe"===e?"subscribe":"punsubscribe"===e?"psubscribe":"sunsubscribe"===e?"ssubscribe":e}t.default=r},26459:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.executeWithAutoPipelining=t.getFirstValueInFlattenedArray=t.shouldUseAutoPipelining=t.notAllowedAutoPipelineCommands=t.kCallbacks=t.kExec=void 0;let n=r(91823),i=r(60159),s=r(13534);function a(e){for(let t=0;t<e.length;t++){let r=e[t];if("string"==typeof r)return r;if(Array.isArray(r)||(0,n.isArguments)(r)){if(0===r.length)continue;return r[0]}let i=[r].flat();if(i.length>0)return i[0]}}t.kExec=Symbol("exec"),t.kCallbacks=Symbol("callbacks"),t.notAllowedAutoPipelineCommands=["auth","info","script","quit","cluster","pipeline","multi","subscribe","psubscribe","unsubscribe","unpsubscribe","select"],t.shouldUseAutoPipelining=function(e,r,n){return r&&e.options.enableAutoPipelining&&!e.isPipeline&&!t.notAllowedAutoPipelineCommands.includes(n)&&!e.options.autoPipeliningIgnoredCommands.includes(n)},t.getFirstValueInFlattenedArray=a,t.executeWithAutoPipelining=function e(r,o,l,u,c){if(r.isCluster&&!r.slots.length)return"wait"===r.status&&r.connect().catch(n.noop),(0,s.default)(new Promise(function(t,n){r.delayUntilReady(i=>{if(i){n(i);return}e(r,o,l,u,null).then(t,n)})}),c);let d=r.options.keyPrefix||"",h=r.isCluster?r.slots[i(`${d}${a(u)}`)].join(","):"main";if(!r._autoPipelines.has(h)){let e=r.pipeline();e[t.kExec]=!1,e[t.kCallbacks]=[],r._autoPipelines.set(h,e)}let p=r._autoPipelines.get(h);p[t.kExec]||(p[t.kExec]=!0,setImmediate(function e(r,n){if(r._runningAutoPipelines.has(n)||!r._autoPipelines.has(n))return;r._runningAutoPipelines.add(n);let i=r._autoPipelines.get(n);r._autoPipelines.delete(n);let s=i[t.kCallbacks];i[t.kCallbacks]=null,i.exec(function(t,i){if(r._runningAutoPipelines.delete(n),t)for(let e=0;e<s.length;e++)process.nextTick(s[e],t);else for(let e=0;e<s.length;e++)process.nextTick(s[e],...i[e]);r._autoPipelines.has(n)&&e(r,n)})},r,h));let f=new Promise(function(e,r){p[t.kCallbacks].push(function(t,n){if(t){r(t);return}e(n)}),"call"===o&&u.unshift(l),p[o](...u)});return(0,s.default)(f,c)}},28880:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.DEFAULT_CLUSTER_OPTIONS=void 0;let n=r(9523);t.DEFAULT_CLUSTER_OPTIONS={clusterRetryStrategy:e=>Math.min(100+2*e,2e3),enableOfflineQueue:!0,enableReadyCheck:!0,scaleReads:"master",maxRedirections:16,retryDelayOnMoved:0,retryDelayOnFailover:100,retryDelayOnClusterDown:100,retryDelayOnTryAgain:100,slotsRefreshTimeout:1e3,useSRVRecords:!1,resolveSrv:n.resolveSrv,dnsLookup:n.lookup,enableAutoPipelining:!1,autoPipeliningIgnoredCommands:[]}},52365:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0});let n=r(64369),i=r(27132),s=r(12858),a=(0,i.Debug)("cluster:subscriber");class o{constructor(e,t){this.connectionPool=e,this.emitter=t,this.started=!1,this.subscriber=null,this.onSubscriberEnd=()=>{if(!this.started){a("subscriber has disconnected, but ClusterSubscriber is not started, so not reconnecting.");return}a("subscriber has disconnected, selecting a new one..."),this.selectSubscriber()},this.connectionPool.on("-node",(e,t)=>{this.started&&this.subscriber&&(0,n.getNodeKey)(this.subscriber.options)===t&&(a("subscriber has left, selecting a new one..."),this.selectSubscriber())}),this.connectionPool.on("+node",()=>{this.started&&!this.subscriber&&(a("a new node is discovered and there is no subscriber, selecting a new one..."),this.selectSubscriber())})}getInstance(){return this.subscriber}start(){this.started=!0,this.selectSubscriber(),a("started")}stop(){this.started=!1,this.subscriber&&(this.subscriber.disconnect(),this.subscriber=null),a("stopped")}selectSubscriber(){let e=this.lastActiveSubscriber;e&&(e.off("end",this.onSubscriberEnd),e.disconnect()),this.subscriber&&(this.subscriber.off("end",this.onSubscriberEnd),this.subscriber.disconnect());let t=(0,i.sample)(this.connectionPool.getNodes());if(!t){a("selecting subscriber failed since there is no node discovered in the cluster yet"),this.subscriber=null;return}let{options:r}=t;a("selected a subscriber %s:%s",r.host,r.port),this.subscriber=new s.default({port:r.port,host:r.host,username:r.username,password:r.password,enableReadyCheck:!0,connectionName:(0,n.getConnectionName)("subscriber",r.connectionName),lazyConnect:!0,tls:r.tls,retryStrategy:null}),this.subscriber.on("error",i.noop),this.subscriber.once("end",this.onSubscriberEnd);let o={subscribe:[],psubscribe:[],ssubscribe:[]};if(e){let t=e.condition||e.prevCondition;t&&t.subscriber&&(o.subscribe=t.subscriber.channels("subscribe"),o.psubscribe=t.subscriber.channels("psubscribe"),o.ssubscribe=t.subscriber.channels("ssubscribe"))}if(o.subscribe.length||o.psubscribe.length||o.ssubscribe.length){let e=0;for(let t of["subscribe","psubscribe","ssubscribe"]){let r=o[t];r.length&&(e+=1,a("%s %d channels",t,r.length),this.subscriber[t](r).then(()=>{--e||(this.lastActiveSubscriber=this.subscriber)}).catch(()=>{a("failed to %s %d channels",t,r.length)}))}}else this.lastActiveSubscriber=this.subscriber;for(let e of["message","messageBuffer","smessage","smessageBuffer"])this.subscriber.on(e,(t,r)=>{this.emitter.emit(e,t,r)});for(let e of["pmessage","pmessageBuffer"])this.subscriber.on(e,(t,r,n)=>{this.emitter.emit(e,t,r,n)})}}t.default=o},53324:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0});let n=r(82361),i=r(27132),s=r(64369),a=r(12858),o=(0,i.Debug)("cluster:connectionPool");class l extends n.EventEmitter{constructor(e){super(),this.redisOptions=e,this.nodes={all:{},master:{},slave:{}},this.specifiedOptions={}}getNodes(e="all"){let t=this.nodes[e];return Object.keys(t).map(e=>t[e])}getInstanceByKey(e){return this.nodes.all[e]}getSampleInstance(e){let t=Object.keys(this.nodes[e]),r=(0,i.sample)(t);return this.nodes[e][r]}findOrCreate(e,t=!1){let r;let n=(0,s.getNodeKey)(e);return t=!!t,this.specifiedOptions[n]?Object.assign(e,this.specifiedOptions[n]):this.specifiedOptions[n]=e,this.nodes.all[n]?(r=this.nodes.all[n]).options.readOnly!==t&&(r.options.readOnly=t,o("Change role of %s to %s",n,t?"slave":"master"),r[t?"readonly":"readwrite"]().catch(i.noop),t?(delete this.nodes.master[n],this.nodes.slave[n]=r):(delete this.nodes.slave[n],this.nodes.master[n]=r)):(o("Connecting to %s as %s",n,t?"slave":"master"),r=new a.default((0,i.defaults)({retryStrategy:null,enableOfflineQueue:!0,readOnly:t},e,this.redisOptions,{lazyConnect:!0})),this.nodes.all[n]=r,this.nodes[t?"slave":"master"][n]=r,r.once("end",()=>{this.removeNode(n),this.emit("-node",r,n),Object.keys(this.nodes.all).length||this.emit("drain")}),this.emit("+node",r,n),r.on("error",function(e){this.emit("nodeError",e,n)})),r}reset(e){o("Reset with %O",e);let t={};e.forEach(e=>{let r=(0,s.getNodeKey)(e);e.readOnly&&t[r]||(t[r]=e)}),Object.keys(this.nodes.all).forEach(e=>{t[e]||(o("Disconnect %s because the node does not hold any slot",e),this.nodes.all[e].disconnect(),this.removeNode(e))}),Object.keys(t).forEach(e=>{let r=t[e];this.findOrCreate(r,r.readOnly)})}removeNode(e){let{nodes:t}=this;t.all[e]&&(o("Remove %s from the pool",e),delete t.all[e]),delete t.master[e],delete t.slave[e]}}t.default=l},10775:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0});let n=r(27132),i=r(28768),s=(0,n.Debug)("delayqueue");class a{constructor(){this.queues={},this.timeouts={}}push(e,t,r){let n=r.callback||process.nextTick;this.queues[e]||(this.queues[e]=new i);let s=this.queues[e];s.push(t),this.timeouts[e]||(this.timeouts[e]=setTimeout(()=>{n(()=>{this.timeouts[e]=null,this.execute(e)})},r.timeout))}execute(e){let t=this.queues[e];if(!t)return;let{length:r}=t;if(r)for(s("send %d commands in %s queue",r,e),this.queues[e]=null;t.length>0;)t.shift()()}}t.default=a},11610:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0});let n=r(48789),i=r(82361),s=r(76752),a=r(13534),o=r(95869),l=r(92231),u=r(12858),c=r(85439),d=r(70214),h=r(27132),p=r(52449),f=r(23410),y=r(28880),m=r(52365),g=r(53324),b=r(10775),S=r(64369),v=r(28768),E=(0,h.Debug)("cluster"),k=new WeakSet;class K extends f.default{constructor(e,t={}){if(super(),this.slots=[],this._groupsIds={},this._groupsBySlot=Array(16384),this.isCluster=!0,this.retryAttempts=0,this.delayQueue=new b.default,this.offlineQueue=new v,this.isRefreshing=!1,this._autoPipelines=new Map,this._runningAutoPipelines=new Set,this._readyDelayedCallbacks=[],this.connectionEpoch=0,i.EventEmitter.call(this),this.startupNodes=e,this.options=(0,h.defaults)({},t,y.DEFAULT_CLUSTER_OPTIONS,this.options),this.options.redisOptions&&this.options.redisOptions.keyPrefix&&!this.options.keyPrefix&&(this.options.keyPrefix=this.options.redisOptions.keyPrefix),"function"!=typeof this.options.scaleReads&&-1===["all","master","slave"].indexOf(this.options.scaleReads))throw Error('Invalid option scaleReads "'+this.options.scaleReads+'". Expected "all", "master", "slave" or a custom function');this.connectionPool=new g.default(this.options.redisOptions),this.connectionPool.on("-node",(e,t)=>{this.emit("-node",e)}),this.connectionPool.on("+node",e=>{this.emit("+node",e)}),this.connectionPool.on("drain",()=>{this.setStatus("close")}),this.connectionPool.on("nodeError",(e,t)=>{this.emit("node error",e,t)}),this.subscriber=new m.default(this.connectionPool,this),this.options.scripts&&Object.entries(this.options.scripts).forEach(([e,t])=>{this.defineCommand(e,t)}),this.options.lazyConnect?this.setStatus("wait"):this.connect().catch(e=>{E("connecting failed: %s",e)})}connect(){return new Promise((e,t)=>{if("connecting"===this.status||"connect"===this.status||"ready"===this.status){t(Error("Redis is already connecting/connected"));return}let r=++this.connectionEpoch;this.setStatus("connecting"),this.resolveStartupNodeHostnames().then(n=>{let i;if(this.connectionEpoch!==r){E("discard connecting after resolving startup nodes because epoch not match: %d != %d",r,this.connectionEpoch),t(new s.RedisError("Connection is discarded because a new connection is made"));return}if("connecting"!==this.status){E("discard connecting after resolving startup nodes because the status changed to %s",this.status),t(new s.RedisError("Connection is aborted"));return}this.connectionPool.reset(n);let a=()=>{this.setStatus("ready"),this.retryAttempts=0,this.executeOfflineCommands(),this.resetNodesRefreshInterval(),e()},o=()=>{this.invokeReadyDelayedCallbacks(void 0),this.removeListener("close",i),this.manuallyClosing=!1,this.setStatus("connect"),this.options.enableReadyCheck?this.readyCheck((e,t)=>{e||t?(E("Ready check failed (%s). Reconnecting...",e||t),"connect"===this.status&&this.disconnect(!0)):a()}):a()};i=()=>{let e=Error("None of startup nodes is available");this.removeListener("refresh",o),this.invokeReadyDelayedCallbacks(e),t(e)},this.once("refresh",o),this.once("close",i),this.once("close",this.handleCloseEvent.bind(this)),this.refreshSlotsCache(e=>{e&&e.message===l.default.defaultMessage&&(u.default.prototype.silentEmit.call(this,"error",e),this.connectionPool.reset([]))}),this.subscriber.start()}).catch(e=>{this.setStatus("close"),this.handleCloseEvent(e),this.invokeReadyDelayedCallbacks(e),t(e)})})}disconnect(e=!1){let t=this.status;this.setStatus("disconnecting"),e||(this.manuallyClosing=!0),this.reconnectTimeout&&!e&&(clearTimeout(this.reconnectTimeout),this.reconnectTimeout=null,E("Canceled reconnecting attempts")),this.clearNodesRefreshInterval(),this.subscriber.stop(),"wait"===t?(this.setStatus("close"),this.handleCloseEvent()):this.connectionPool.reset([])}quit(e){let t=this.status;if(this.setStatus("disconnecting"),this.manuallyClosing=!0,this.reconnectTimeout&&(clearTimeout(this.reconnectTimeout),this.reconnectTimeout=null),this.clearNodesRefreshInterval(),this.subscriber.stop(),"wait"===t){let t=(0,a.default)(Promise.resolve("OK"),e);return setImmediate((function(){this.setStatus("close"),this.handleCloseEvent()}).bind(this)),t}return(0,a.default)(Promise.all(this.nodes().map(e=>e.quit().catch(e=>{if(e.message===h.CONNECTION_CLOSED_ERROR_MSG)return"OK";throw e}))).then(()=>"OK"),e)}duplicate(e=[],t={}){let r=e.length>0?e:this.startupNodes.slice(0),n=Object.assign({},this.options,t);return new K(r,n)}nodes(e="all"){if("all"!==e&&"master"!==e&&"slave"!==e)throw Error('Invalid role "'+e+'". Expected "all", "master" or "slave"');return this.connectionPool.getNodes(e)}delayUntilReady(e){this._readyDelayedCallbacks.push(e)}get autoPipelineQueueSize(){let e=0;for(let t of this._autoPipelines.values())e+=t.length;return e}refreshSlotsCache(e){if(this.isRefreshing){e&&process.nextTick(e);return}this.isRefreshing=!0;let t=this,r=t=>{this.isRefreshing=!1,e&&e(t)},n=(0,h.shuffle)(this.connectionPool.getNodes()),i=null;!function e(s){if(s===n.length){let e=new l.default(l.default.defaultMessage,i);return r(e)}let a=n[s],o=`${a.options.host}:${a.options.port}`;E("getting slot cache from %s",o),t.getInfoFromNode(a,function(n){switch(t.status){case"close":case"end":return r(Error("Cluster is disconnected."));case"disconnecting":return r(Error("Cluster is disconnecting."))}n?(t.emit("node error",n,o),i=n,e(s+1)):(t.emit("refresh"),r())})}(0)}sendCommand(e,t,r){if("wait"===this.status&&this.connect().catch(h.noop),"end"===this.status)return e.reject(Error(h.CONNECTION_CLOSED_ERROR_MSG)),e.promise;let i=this.options.scaleReads;if("master"!==i){let t=e.isReadOnly||(0,n.exists)(e.name)&&(0,n.hasFlag)(e.name,"readonly");t||(i="master")}let a=r?r.slot:e.getSlot(),l={},u=this;if(!r&&!k.has(e)){k.add(e);let t=e.reject;e.reject=function(r){let n=c.bind(null,!0);u.handleError(r,l,{moved:function(t,r){E("command %s is moved to %s",e.name,r),a=Number(t),u.slots[t]?u.slots[t][0]=r:u.slots[t]=[r],u._groupsBySlot[t]=u._groupsIds[u.slots[t].join(";")],u.connectionPool.findOrCreate(u.natMapper(r)),c(),E("refreshing slot caches... (triggered by MOVED error)"),u.refreshSlotsCache()},ask:function(t,r){E("command %s is required to ask %s:%s",e.name,r);let n=u.natMapper(r);u.connectionPool.findOrCreate(n),c(!1,`${n.host}:${n.port}`)},tryagain:n,clusterDown:n,connectionClosed:n,maxRedirections:function(r){t.call(e,r)},defaults:function(){t.call(e,r)}})}}function c(n,l){let c;if("end"===u.status){e.reject(new s.AbortError("Cluster is ended."));return}if("ready"===u.status||"cluster"===e.name){if(r&&r.redis)c=r.redis;else if(o.default.checkFlag("ENTER_SUBSCRIBER_MODE",e.name)||o.default.checkFlag("EXIT_SUBSCRIBER_MODE",e.name)){if(!(c=u.subscriber.getInstance())){e.reject(new s.AbortError("No subscriber for the cluster"));return}}else{if(!n){if("number"==typeof a&&u.slots[a]){let t=u.slots[a];if("function"==typeof i){let r=t.map(function(e){return u.connectionPool.getInstanceByKey(e)});Array.isArray(c=i(r,e))&&(c=(0,h.sample)(c)),c||(c=r[0])}else{let e;e="all"===i?(0,h.sample)(t):"slave"===i&&t.length>1?(0,h.sample)(t,1):t[0],c=u.connectionPool.getInstanceByKey(e)}}l&&(c=u.connectionPool.getInstanceByKey(l)).asking()}c||(c=("function"==typeof i?null:u.connectionPool.getSampleInstance(i))||u.connectionPool.getSampleInstance("all"))}r&&!r.redis&&(r.redis=c)}c?c.sendCommand(e,t):u.options.enableOfflineQueue?u.offlineQueue.push({command:e,stream:t,node:r}):e.reject(Error("Cluster isn't ready and enableOfflineQueue options is false"))}return c(),e.promise}sscanStream(e,t){return this.createScanStream("sscan",{key:e,options:t})}sscanBufferStream(e,t){return this.createScanStream("sscanBuffer",{key:e,options:t})}hscanStream(e,t){return this.createScanStream("hscan",{key:e,options:t})}hscanBufferStream(e,t){return this.createScanStream("hscanBuffer",{key:e,options:t})}zscanStream(e,t){return this.createScanStream("zscan",{key:e,options:t})}zscanBufferStream(e,t){return this.createScanStream("zscanBuffer",{key:e,options:t})}handleError(e,t,r){if(void 0===t.value?t.value=this.options.maxRedirections:t.value-=1,t.value<=0){r.maxRedirections(Error("Too many Cluster redirections. Last error: "+e));return}let n=e.message.split(" ");if("MOVED"===n[0]){let e=this.options.retryDelayOnMoved;e&&"number"==typeof e?this.delayQueue.push("moved",r.moved.bind(null,n[1],n[2]),{timeout:e}):r.moved(n[1],n[2])}else"ASK"===n[0]?r.ask(n[1],n[2]):"TRYAGAIN"===n[0]?this.delayQueue.push("tryagain",r.tryagain,{timeout:this.options.retryDelayOnTryAgain}):"CLUSTERDOWN"===n[0]&&this.options.retryDelayOnClusterDown>0?this.delayQueue.push("clusterdown",r.connectionClosed,{timeout:this.options.retryDelayOnClusterDown,callback:this.refreshSlotsCache.bind(this)}):e.message===h.CONNECTION_CLOSED_ERROR_MSG&&this.options.retryDelayOnFailover>0&&"ready"===this.status?this.delayQueue.push("failover",r.connectionClosed,{timeout:this.options.retryDelayOnFailover,callback:this.refreshSlotsCache.bind(this)}):r.defaults()}resetOfflineQueue(){this.offlineQueue=new v}clearNodesRefreshInterval(){this.slotsTimer&&(clearTimeout(this.slotsTimer),this.slotsTimer=null)}resetNodesRefreshInterval(){if(this.slotsTimer||!this.options.slotsRefreshInterval)return;let e=()=>{this.slotsTimer=setTimeout(()=>{E('refreshing slot caches... (triggered by "slotsRefreshInterval" option)'),this.refreshSlotsCache(()=>{e()})},this.options.slotsRefreshInterval)};e()}setStatus(e){E("status: %s -> %s",this.status||"[empty]",e),this.status=e,process.nextTick(()=>{this.emit(e)})}handleCloseEvent(e){let t;e&&E("closed because %s",e),this.manuallyClosing||"function"!=typeof this.options.clusterRetryStrategy||(t=this.options.clusterRetryStrategy.call(this,++this.retryAttempts,e)),"number"==typeof t?(this.setStatus("reconnecting"),this.reconnectTimeout=setTimeout(()=>{this.reconnectTimeout=null,E("Cluster is disconnected. Retrying after %dms",t),this.connect().catch(function(e){E("Got error %s when reconnecting. Ignoring...",e)})},t)):(this.setStatus("end"),this.flushQueue(Error("None of startup nodes is available")))}flushQueue(e){let t;for(;t=this.offlineQueue.shift();)t.command.reject(e)}executeOfflineCommands(){if(this.offlineQueue.length){let e;E("send %d commands in offline queue",this.offlineQueue.length);let t=this.offlineQueue;for(this.resetOfflineQueue();e=t.shift();)this.sendCommand(e.command,e.stream,e.node)}}natMapper(e){if(this.options.natMap&&"object"==typeof this.options.natMap){let t="string"==typeof e?e:`${e.host}:${e.port}`,r=this.options.natMap[t];if(r)return E("NAT mapping %s -> %O",t,r),Object.assign({},r)}return"string"==typeof e?(0,S.nodeKeyToRedisOptions)(e):e}getInfoFromNode(e,t){if(!e)return t(Error("Node is disconnected"));let r=e.duplicate({enableOfflineQueue:!0,enableReadyCheck:!1,retryStrategy:null,connectionName:(0,S.getConnectionName)("refresher",this.options.redisOptions&&this.options.redisOptions.connectionName)});r.on("error",h.noop),r.cluster("SLOTS",(0,h.timeout)((e,n)=>{if(r.disconnect(),e)return t(e);if("disconnecting"===this.status||"close"===this.status||"end"===this.status){E("ignore CLUSTER.SLOTS results (count: %d) since cluster status is %s",n.length,this.status),t();return}let i=[];E("cluster slots result count: %d",n.length);for(let e=0;e<n.length;++e){let t=n[e],r=t[0],s=t[1],a=[];for(let e=2;e<t.length;e++){if(!t[e][0])continue;let r=this.natMapper({host:t[e][0],port:t[e][1]});r.readOnly=2!==e,i.push(r),a.push(r.host+":"+r.port)}E("cluster slots result [%d]: slots %d~%d served by %s",e,r,s,a);for(let e=r;e<=s;e++)this.slots[e]=a}this._groupsIds=Object.create(null);let s=0;for(let e=0;e<16384;e++){let t=(this.slots[e]||[]).join(";");if(!t.length){this._groupsBySlot[e]=void 0;continue}this._groupsIds[t]||(this._groupsIds[t]=++s),this._groupsBySlot[e]=this._groupsIds[t]}this.connectionPool.reset(i),t()},this.options.slotsRefreshTimeout))}invokeReadyDelayedCallbacks(e){for(let t of this._readyDelayedCallbacks)process.nextTick(t,e);this._readyDelayedCallbacks=[]}readyCheck(e){this.cluster("INFO",(t,r)=>{let n;if(t)return e(t);if("string"!=typeof r)return e();let i=r.split("\r\n");for(let e=0;e<i.length;++e){let t=i[e].split(":");if("cluster_state"===t[0]){n=t[1];break}}"fail"===n?(E("cluster state not ok (%s)",n),e(null,n)):e()})}resolveSrv(e){return new Promise((t,r)=>{this.options.resolveSrv(e,(e,n)=>{if(e)return r(e);let i=this,s=(0,S.groupSrvRecords)(n),a=Object.keys(s).sort((e,t)=>parseInt(e)-parseInt(t));!function e(n){if(!a.length)return r(n);let o=a[0],l=s[o],u=(0,S.weightSrvRecords)(l);l.records.length||a.shift(),i.dnsLookup(u.name).then(e=>t({host:e,port:u.port}),e)}()})})}dnsLookup(e){return new Promise((t,r)=>{this.options.dnsLookup(e,(n,i)=>{n?(E("failed to resolve hostname %s to IP: %s",e,n.message),r(n)):(E("resolved hostname %s to IP %s",e,i),t(i))})})}async resolveStartupNodeHostnames(){if(!Array.isArray(this.startupNodes)||0===this.startupNodes.length)throw Error("`startupNodes` should contain at least one node.");let e=(0,S.normalizeNodeOptions)(this.startupNodes),t=(0,S.getUniqueHostnamesFromOptions)(e);if(0===t.length)return e;let r=await Promise.all(t.map((this.options.useSRVRecords?this.resolveSrv:this.dnsLookup).bind(this))),n=(0,h.zipMap)(t,r);return e.map(e=>{let t=n.get(e.host);return t?this.options.useSRVRecords?Object.assign({},e,t):Object.assign({},e,{host:t}):e})}createScanStream(e,{key:t,options:r={}}){return new c.default({objectMode:!0,key:t,redis:this,command:e,...r})}}(0,p.default)(K,i.EventEmitter),(0,d.addTransactionSupport)(K.prototype),t.default=K},64369:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.getConnectionName=t.weightSrvRecords=t.groupSrvRecords=t.getUniqueHostnamesFromOptions=t.normalizeNodeOptions=t.nodeKeyToRedisOptions=t.getNodeKey=void 0;let n=r(27132),i=r(41808);t.getNodeKey=function(e){return e.port=e.port||6379,e.host=e.host||"127.0.0.1",e.host+":"+e.port},t.nodeKeyToRedisOptions=function(e){let t=e.lastIndexOf(":");if(-1===t)throw Error(`Invalid node key ${e}`);return{host:e.slice(0,t),port:Number(e.slice(t+1))}},t.normalizeNodeOptions=function(e){return e.map(e=>{let t={};if("object"==typeof e)Object.assign(t,e);else if("string"==typeof e)Object.assign(t,(0,n.parseURL)(e));else if("number"==typeof e)t.port=e;else throw Error("Invalid argument "+e);return"string"==typeof t.port&&(t.port=parseInt(t.port,10)),delete t.db,t.port||(t.port=6379),t.host||(t.host="127.0.0.1"),(0,n.resolveTLSProfile)(t)})},t.getUniqueHostnamesFromOptions=function(e){let t={};return e.forEach(e=>{t[e.host]=!0}),Object.keys(t).filter(e=>!(0,i.isIP)(e))},t.groupSrvRecords=function(e){let t={};for(let r of e)t.hasOwnProperty(r.priority)?(t[r.priority].totalWeight+=r.weight,t[r.priority].records.push(r)):t[r.priority]={totalWeight:r.weight,records:[r]};return t},t.weightSrvRecords=function(e){if(1===e.records.length)return e.totalWeight=0,e.records.shift();let t=Math.floor(Math.random()*(e.totalWeight+e.records.length)),r=0;for(let[n,i]of e.records.entries())if((r+=1+i.weight)>t)return e.totalWeight-=i.weight,e.records.splice(n,1),i},t.getConnectionName=function(e,t){let r=`ioredis-cluster(${e})`;return t?`${r}:${t}`:r}},57859:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0});let n=r(27132),i=(0,n.Debug)("AbstractConnector");class s{constructor(e){this.connecting=!1,this.disconnectTimeout=e}check(e){return!0}disconnect(){if(this.connecting=!1,this.stream){let e=this.stream,t=setTimeout(()=>{i("stream %s:%s still open, destroying it",e.remoteAddress,e.remotePort),e.destroy()},this.disconnectTimeout);e.on("close",()=>clearTimeout(t)),e.end()}}}t.default=s},54634:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.FailoverDetector=void 0;let n=r(27132),i=(0,n.Debug)("FailoverDetector"),s="+switch-master";class a{constructor(e,t){this.isDisconnected=!1,this.connector=e,this.sentinels=t}cleanup(){for(let e of(this.isDisconnected=!0,this.sentinels))e.client.disconnect()}async subscribe(){i("Starting FailoverDetector");let e=[];for(let t of this.sentinels){let r=t.client.subscribe(s).catch(e=>{i("Failed to subscribe to failover messages on sentinel %s:%s (%s)",t.address.host||"127.0.0.1",t.address.port||26739,e.message)});e.push(r),t.client.on("message",e=>{this.isDisconnected||e!==s||this.disconnect()})}await Promise.all(e)}disconnect(){this.isDisconnected=!0,i("Failover detected, disconnecting"),this.connector.disconnect()}}t.FailoverDetector=a},88231:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0});class r{constructor(e){this.cursor=0,this.sentinels=e.slice(0)}next(){let e=this.cursor>=this.sentinels.length;return{done:e,value:e?void 0:this.sentinels[this.cursor++]}}reset(e){e&&this.sentinels.length>1&&1!==this.cursor&&this.sentinels.unshift(...this.sentinels.splice(this.cursor-1)),this.cursor=0}add(e){for(let r=0;r<this.sentinels.length;r++){var t;if(t=this.sentinels[r],(e.host||"127.0.0.1")===(t.host||"127.0.0.1")&&(e.port||26379)===(t.port||26379))return!1}return this.sentinels.push(e),!0}toString(){return`${JSON.stringify(this.sentinels)} @${this.cursor}`}}t.default=r},33929:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.SentinelIterator=void 0;let n=r(41808),i=r(27132),s=r(24404),a=r(88231);t.SentinelIterator=a.default;let o=r(57859),l=r(12858),u=r(54634),c=(0,i.Debug)("SentinelConnector");class d extends o.default{constructor(e){if(super(e.disconnectTimeout),this.options=e,this.emitter=null,this.failoverDetector=null,!this.options.sentinels.length)throw Error("Requires at least one sentinel to connect to.");if(!this.options.name)throw Error("Requires the name of master.");this.sentinelIterator=new a.default(this.options.sentinels)}check(e){let t=!e.role||this.options.role===e.role;return t||(c("role invalid, expected %s, but got %s",this.options.role,e.role),this.sentinelIterator.next(),this.sentinelIterator.next(),this.sentinelIterator.reset(!0)),t}disconnect(){super.disconnect(),this.failoverDetector&&this.failoverDetector.cleanup()}connect(e){let t;this.connecting=!0,this.retryAttempts=0;let r=async()=>{let a=this.sentinelIterator.next();if(a.done){this.sentinelIterator.reset(!1);let n="function"==typeof this.options.sentinelRetryStrategy?this.options.sentinelRetryStrategy(++this.retryAttempts):null,i="number"!=typeof n?"All sentinels are unreachable and retry is disabled.":`All sentinels are unreachable. Retrying from scratch after ${n}ms.`;t&&(i+=` Last error: ${t.message}`),c(i);let s=Error(i);if("number"==typeof n)return e("error",s),await new Promise(e=>setTimeout(e,n)),r();throw s}let o=null,l=null;try{o=await this.resolve(a.value)}catch(e){l=e}if(!this.connecting)throw Error(i.CONNECTION_CLOSED_ERROR_MSG);let u=a.value.host+":"+a.value.port;if(o)return c("resolved: %s:%s from sentinel %s",o.host,o.port,u),this.options.enableTLSForSentinelMode&&this.options.tls?(Object.assign(o,this.options.tls),this.stream=(0,s.connect)(o),this.stream.once("secureConnect",this.initFailoverDetector.bind(this))):(this.stream=(0,n.createConnection)(o),this.stream.once("connect",this.initFailoverDetector.bind(this))),this.stream.once("error",e=>{this.firstError=e}),this.stream;{let n=l?"failed to connect to sentinel "+u+" because "+l.message:"connected to sentinel "+u+" successfully, but got an invalid reply: "+o;return c(n),e("sentinelError",Error(n)),l&&(t=l),r()}};return r()}async updateSentinels(e){if(!this.options.updateSentinels)return;let t=await e.sentinel("sentinels",this.options.name);Array.isArray(t)&&(t.map(i.packObject).forEach(e=>{let t=e.flags?e.flags.split(","):[];if(-1===t.indexOf("disconnected")&&e.ip&&e.port){let t=this.sentinelNatResolve(h(e));this.sentinelIterator.add(t)&&c("adding sentinel %s:%s",t.host,t.port)}}),c("Updated internal sentinels: %s",this.sentinelIterator))}async resolveMaster(e){let t=await e.sentinel("get-master-addr-by-name",this.options.name);return await this.updateSentinels(e),this.sentinelNatResolve(Array.isArray(t)?{host:t[0],port:Number(t[1])}:null)}async resolveSlave(e){let t=await e.sentinel("slaves",this.options.name);if(!Array.isArray(t))return null;let r=t.map(i.packObject).filter(e=>e.flags&&!e.flags.match(/(disconnected|s_down|o_down)/));return this.sentinelNatResolve(function(e,t){let r;if(0===e.length)return null;if("function"==typeof t)r=t(e);else if(null!==t&&"object"==typeof t){let n=Array.isArray(t)?t:[t];n.sort((e,t)=>(e.prio||(e.prio=1),t.prio||(t.prio=1),e.prio<t.prio)?-1:e.prio>t.prio?1:0);for(let t=0;t<n.length;t++){for(let i=0;i<e.length;i++){let s=e[i];if(s.ip===n[t].ip&&s.port===n[t].port){r=s;break}}if(r)break}}return r||(r=(0,i.sample)(e)),h(r)}(r,this.options.preferredSlaves))}sentinelNatResolve(e){return e&&this.options.natMap&&this.options.natMap[`${e.host}:${e.port}`]||e}connectToSentinel(e,t){let r=new l.default({port:e.port||26379,host:e.host,username:this.options.sentinelUsername||null,password:this.options.sentinelPassword||null,family:e.family||("path"in this.options&&this.options.path?void 0:this.options.family),tls:this.options.sentinelTLS,retryStrategy:null,enableReadyCheck:!1,connectTimeout:this.options.connectTimeout,commandTimeout:this.options.sentinelCommandTimeout,...t});return r}async resolve(e){let t=this.connectToSentinel(e);t.on("error",p);try{if("slave"===this.options.role)return await this.resolveSlave(t);return await this.resolveMaster(t)}finally{t.disconnect()}}async initFailoverDetector(){var e;if(!this.options.failoverDetector)return;this.sentinelIterator.reset(!0);let t=[];for(;t.length<this.options.sentinelMaxConnections;){let{done:e,value:r}=this.sentinelIterator.next();if(e)break;let n=this.connectToSentinel(r,{lazyConnect:!0,retryStrategy:this.options.sentinelReconnectStrategy});n.on("reconnecting",()=>{var e;null===(e=this.emitter)||void 0===e||e.emit("sentinelReconnecting")}),t.push({address:r,client:n})}this.sentinelIterator.reset(!1),this.failoverDetector&&this.failoverDetector.cleanup(),this.failoverDetector=new u.FailoverDetector(this,t),await this.failoverDetector.subscribe(),null===(e=this.emitter)||void 0===e||e.emit("failoverSubscribed")}}function h(e){return{host:e.ip,port:Number(e.port)}}function p(){}t.default=d},23686:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0});let n=r(41808),i=r(24404),s=r(27132),a=r(57859);class o extends a.default{constructor(e){super(e.disconnectTimeout),this.options=e}connect(e){let t;let{options:r}=this;return this.connecting=!0,"path"in r&&r.path?t={path:r.path}:(t={},"port"in r&&null!=r.port&&(t.port=r.port),"host"in r&&null!=r.host&&(t.host=r.host),"family"in r&&null!=r.family&&(t.family=r.family)),r.tls&&Object.assign(t,r.tls),new Promise((e,a)=>{process.nextTick(()=>{if(!this.connecting){a(Error(s.CONNECTION_CLOSED_ERROR_MSG));return}try{r.tls?this.stream=(0,i.connect)(t):this.stream=(0,n.createConnection)(t)}catch(e){a(e);return}this.stream.once("error",e=>{this.firstError=e}),e(this.stream)})})}}t.default=o},52381:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.SentinelConnector=t.StandaloneConnector=void 0;let n=r(23686);t.StandaloneConnector=n.default;let i=r(33929);t.SentinelConnector=i.default},97093:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0});let r=`-----BEGIN CERTIFICATE-----
MIIDTzCCAjegAwIBAgIJAKSVpiDswLcwMA0GCSqGSIb3DQEBBQUAMD4xFjAUBgNV
BAoMDUdhcmFudGlhIERhdGExJDAiBgNVBAMMG1NTTCBDZXJ0aWZpY2F0aW9uIEF1
dGhvcml0eTAeFw0xMzEwMDExMjE0NTVaFw0yMzA5MjkxMjE0NTVaMD4xFjAUBgNV
BAoMDUdhcmFudGlhIERhdGExJDAiBgNVBAMMG1NTTCBDZXJ0aWZpY2F0aW9uIEF1
dGhvcml0eTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBALZqkh/DczWP
JnxnHLQ7QL0T4B4CDKWBKCcisriGbA6ZePWVNo4hfKQC6JrzfR+081NeD6VcWUiz
rmd+jtPhIY4c+WVQYm5PKaN6DT1imYdxQw7aqO5j2KUCEh/cznpLxeSHoTxlR34E
QwF28Wl3eg2vc5ct8LjU3eozWVk3gb7alx9mSA2SgmuX5lEQawl++rSjsBStemY2
BDwOpAMXIrdEyP/cVn8mkvi/BDs5M5G+09j0gfhyCzRWMQ7Hn71u1eolRxwVxgi3
TMn+/vTaFSqxKjgck6zuAYjBRPaHe7qLxHNr1So/Mc9nPy+3wHebFwbIcnUojwbp
4nctkWbjb2cCAwEAAaNQME4wHQYDVR0OBBYEFP1whtcrydmW3ZJeuSoKZIKjze3w
MB8GA1UdIwQYMBaAFP1whtcrydmW3ZJeuSoKZIKjze3wMAwGA1UdEwQFMAMBAf8w
DQYJKoZIhvcNAQEFBQADggEBAG2erXhwRAa7+ZOBs0B6X57Hwyd1R4kfmXcs0rta
lbPpvgULSiB+TCbf3EbhJnHGyvdCY1tvlffLjdA7HJ0PCOn+YYLBA0pTU/dyvrN6
Su8NuS5yubnt9mb13nDGYo1rnt0YRfxN+8DM3fXIVr038A30UlPX2Ou1ExFJT0MZ
uFKY6ZvLdI6/1cbgmguMlAhM+DhKyV6Sr5699LM3zqeI816pZmlREETYkGr91q7k
BpXJu/dtHaGxg1ZGu6w/PCsYGUcECWENYD4VQPd8N32JjOfu6vEgoEAwfPP+3oGp
Z4m3ewACcWOAenqflb+cQYC4PsF7qbXDmRaWrbKntOlZ3n0=
-----END CERTIFICATE-----
-----BEGIN CERTIFICATE-----
MIIGMTCCBBmgAwIBAgICEAAwDQYJKoZIhvcNAQELBQAwajELMAkGA1UEBhMCVVMx
CzAJBgNVBAgMAkNBMQswCQYDVQQHDAJDQTESMBAGA1UECgwJUmVkaXNMYWJzMS0w
KwYDVQQDDCRSZWRpc0xhYnMgUm9vdCBDZXJ0aWZpY2F0ZSBBdXRob3JpdHkwHhcN
MTgwMjI1MTUzNzM3WhcNMjgwMjIzMTUzNzM3WjBfMQswCQYDVQQGEwJVUzELMAkG
A1UECAwCQ0ExEjAQBgNVBAoMCVJlZGlzTGFiczEvMC0GA1UEAwwmUkNQIEludGVy
bWVkaWF0ZSBDZXJ0aWZpY2F0ZSBBdXRob3JpdHkwggIiMA0GCSqGSIb3DQEBAQUA
A4ICDwAwggIKAoICAQDf9dqbxc8Bq7Ctq9rWcxrGNKKHivqLAFpPq02yLPx6fsOv
Tq7GsDChAYBBc4v7Y2Ap9RD5Vs3dIhEANcnolf27QwrG9RMnnvzk8pCvp1o6zSU4
VuOE1W66/O1/7e2rVxyrnTcP7UgK43zNIXu7+tiAqWsO92uSnuMoGPGpeaUm1jym
hjWKtkAwDFSqvHY+XL5qDVBEjeUe+WHkYUg40cAXjusAqgm2hZt29c2wnVrxW25W
P0meNlzHGFdA2AC5z54iRiqj57dTfBTkHoBczQxcyw6hhzxZQ4e5I5zOKjXXEhZN
r0tA3YC14CTabKRus/JmZieyZzRgEy2oti64tmLYTqSlAD78pRL40VNoaSYetXLw
hhNsXCHgWaY6d5bLOc/aIQMAV5oLvZQKvuXAF1IDmhPA+bZbpWipp0zagf1P1H3s
UzsMdn2KM0ejzgotbtNlj5TcrVwpmvE3ktvUAuA+hi3FkVx1US+2Gsp5x4YOzJ7u
P1WPk6ShF0JgnJH2ILdj6kttTWwFzH17keSFICWDfH/+kM+k7Y1v3EXMQXE7y0T9
MjvJskz6d/nv+sQhY04xt64xFMGTnZjlJMzfQNi7zWFLTZnDD0lPowq7l3YiPoTT
t5Xky83lu0KZsZBo0WlWaDG00gLVdtRgVbcuSWxpi5BdLb1kRab66JptWjxwXQID
AQABo4HrMIHoMDoGA1UdHwQzMDEwL6AtoCuGKWh0dHBzOi8vcmwtY2Etc2VydmVy
LnJlZGlzbGFicy5jb20vdjEvY3JsMEYGCCsGAQUFBwEBBDowODA2BggrBgEFBQcw
AYYqaHR0cHM6Ly9ybC1jYS1zZXJ2ZXIucmVkaXNsYWJzLmNvbS92MS9vY3NwMB0G
A1UdDgQWBBQHar5OKvQUpP2qWt6mckzToeCOHDAfBgNVHSMEGDAWgBQi42wH6hM4
L2sujEvLM0/u8lRXTzASBgNVHRMBAf8ECDAGAQH/AgEAMA4GA1UdDwEB/wQEAwIB
hjANBgkqhkiG9w0BAQsFAAOCAgEAirEn/iTsAKyhd+pu2W3Z5NjCko4NPU0EYUbr
AP7+POK2rzjIrJO3nFYQ/LLuC7KCXG+2qwan2SAOGmqWst13Y+WHp44Kae0kaChW
vcYLXXSoGQGC8QuFSNUdaeg3RbMDYFT04dOkqufeWVccoHVxyTSg9eD8LZuHn5jw
7QDLiEECBmIJHk5Eeo2TAZrx4Yx6ufSUX5HeVjlAzqwtAqdt99uCJ/EL8bgpWbe+
XoSpvUv0SEC1I1dCAhCKAvRlIOA6VBcmzg5Am12KzkqTul12/VEFIgzqu0Zy2Jbc
AUPrYVu/+tOGXQaijy7YgwH8P8n3s7ZeUa1VABJHcxrxYduDDJBLZi+MjheUDaZ1
jQRHYevI2tlqeSBqdPKG4zBY5lS0GiAlmuze5oENt0P3XboHoZPHiqcK3VECgTVh
/BkJcuudETSJcZDmQ8YfoKfBzRQNg2sv/hwvUv73Ss51Sco8GEt2lD8uEdib1Q6z
zDT5lXJowSzOD5ZA9OGDjnSRL+2riNtKWKEqvtEG3VBJoBzu9GoxbAc7wIZLxmli
iF5a/Zf5X+UXD3s4TMmy6C4QZJpAA2egsSQCnraWO2ULhh7iXMysSkF/nzVfZn43
iqpaB8++9a37hWq14ZmOv0TJIDz//b2+KC4VFXWQ5W5QC6whsjT+OlG4p5ZYG0jo
616pxqo=
-----END CERTIFICATE-----
-----BEGIN CERTIFICATE-----
MIIFujCCA6KgAwIBAgIJAJ1aTT1lu2ScMA0GCSqGSIb3DQEBCwUAMGoxCzAJBgNV
BAYTAlVTMQswCQYDVQQIDAJDQTELMAkGA1UEBwwCQ0ExEjAQBgNVBAoMCVJlZGlz
TGFiczEtMCsGA1UEAwwkUmVkaXNMYWJzIFJvb3QgQ2VydGlmaWNhdGUgQXV0aG9y
aXR5MB4XDTE4MDIyNTE1MjA0MloXDTM4MDIyMDE1MjA0MlowajELMAkGA1UEBhMC
VVMxCzAJBgNVBAgMAkNBMQswCQYDVQQHDAJDQTESMBAGA1UECgwJUmVkaXNMYWJz
MS0wKwYDVQQDDCRSZWRpc0xhYnMgUm9vdCBDZXJ0aWZpY2F0ZSBBdXRob3JpdHkw
ggIiMA0GCSqGSIb3DQEBAQUAA4ICDwAwggIKAoICAQDLEjXy7YrbN5Waau5cd6g1
G5C2tMmeTpZ0duFAPxNU4oE3RHS5gGiok346fUXuUxbZ6QkuzeN2/2Z+RmRcJhQY
Dm0ZgdG4x59An1TJfnzKKoWj8ISmoHS/TGNBdFzXV7FYNLBuqZouqePI6ReC6Qhl
pp45huV32Q3a6IDrrvx7Wo5ZczEQeFNbCeCOQYNDdTmCyEkHqc2AGo8eoIlSTutT
ULOC7R5gzJVTS0e1hesQ7jmqHjbO+VQS1NAL4/5K6cuTEqUl+XhVhPdLWBXJQ5ag
54qhX4v+ojLzeU1R/Vc6NjMvVtptWY6JihpgplprN0Yh2556ewcXMeturcKgXfGJ
xeYzsjzXerEjrVocX5V8BNrg64NlifzTMKNOOv4fVZszq1SIHR8F9ROrqiOdh8iC
JpUbLpXH9hWCSEO6VRMB2xJoKu3cgl63kF30s77x7wLFMEHiwsQRKxooE1UhgS9K
2sO4TlQ1eWUvFvHSTVDQDlGQ6zu4qjbOpb3Q8bQwoK+ai2alkXVR4Ltxe9QlgYK3
StsnPhruzZGA0wbXdpw0bnM+YdlEm5ffSTpNIfgHeaa7Dtb801FtA71ZlH7A6TaI
SIQuUST9EKmv7xrJyx0W1pGoPOLw5T029aTjnICSLdtV9bLwysrLhIYG5bnPq78B
cS+jZHFGzD7PUVGQD01nOQIDAQABo2MwYTAdBgNVHQ4EFgQUIuNsB+oTOC9rLoxL
yzNP7vJUV08wHwYDVR0jBBgwFoAUIuNsB+oTOC9rLoxLyzNP7vJUV08wDwYDVR0T
AQH/BAUwAwEB/zAOBgNVHQ8BAf8EBAMCAYYwDQYJKoZIhvcNAQELBQADggIBAHfg
z5pMNUAKdMzK1aS1EDdK9yKz4qicILz5czSLj1mC7HKDRy8cVADUxEICis++CsCu
rYOvyCVergHQLREcxPq4rc5Nq1uj6J6649NEeh4WazOOjL4ZfQ1jVznMbGy+fJm3
3Hoelv6jWRG9iqeJZja7/1s6YC6bWymI/OY1e4wUKeNHAo+Vger7MlHV+RuabaX+
hSJ8bJAM59NCM7AgMTQpJCncrcdLeceYniGy5Q/qt2b5mJkQVkIdy4TPGGB+AXDJ
D0q3I/JDRkDUFNFdeW0js7fHdsvCR7O3tJy5zIgEV/o/BCkmJVtuwPYOrw/yOlKj
TY/U7ATAx9VFF6/vYEOMYSmrZlFX+98L6nJtwDqfLB5VTltqZ4H/KBxGE3IRSt9l
FXy40U+LnXzhhW+7VBAvyYX8GEXhHkKU8Gqk1xitrqfBXY74xKgyUSTolFSfFVgj
mcM/X4K45bka+qpkj7Kfv/8D4j6aZekwhN2ly6hhC1SmQ8qjMjpG/mrWOSSHZFmf
ybu9iD2AYHeIOkshIl6xYIa++Q/00/vs46IzAbQyriOi0XxlSMMVtPx0Q3isp+ji
n8Mq9eOuxYOEQ4of8twUkUDd528iwGtEdwf0Q01UyT84S62N8AySl1ZBKXJz6W4F
UhWfa/HQYOAPDdEjNgnVwLI23b8t0TozyCWw7q8h
-----END CERTIFICATE-----

-----BEGIN CERTIFICATE-----
MIIEjzCCA3egAwIBAgIQe55B/ALCKJDZtdNT8kD6hTANBgkqhkiG9w0BAQsFADBM
MSAwHgYDVQQLExdHbG9iYWxTaWduIFJvb3QgQ0EgLSBSMzETMBEGA1UEChMKR2xv
YmFsU2lnbjETMBEGA1UEAxMKR2xvYmFsU2lnbjAeFw0yMjAxMjYxMjAwMDBaFw0y
NTAxMjYwMDAwMDBaMFgxCzAJBgNVBAYTAkJFMRkwFwYDVQQKExBHbG9iYWxTaWdu
IG52LXNhMS4wLAYDVQQDEyVHbG9iYWxTaWduIEF0bGFzIFIzIE9WIFRMUyBDQSAy
MDIyIFEyMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAmGmg1LW9b7Lf
8zDD83yBDTEkt+FOxKJZqF4veWc5KZsQj9HfnUS2e5nj/E+JImlGPsQuoiosLuXD
BVBNAMcUFa11buFMGMeEMwiTmCXoXRrXQmH0qjpOfKgYc5gHG3BsRGaRrf7VR4eg
ofNMG9wUBw4/g/TT7+bQJdA4NfE7Y4d5gEryZiBGB/swaX6Jp/8MF4TgUmOWmalK
dZCKyb4sPGQFRTtElk67F7vU+wdGcrcOx1tDcIB0ncjLPMnaFicagl+daWGsKqTh
counQb6QJtYHa91KvCfKWocMxQ7OIbB5UARLPmC4CJ1/f8YFm35ebfzAeULYdGXu
jE9CLor0OwIDAQABo4IBXzCCAVswDgYDVR0PAQH/BAQDAgGGMB0GA1UdJQQWMBQG
CCsGAQUFBwMBBggrBgEFBQcDAjASBgNVHRMBAf8ECDAGAQH/AgEAMB0GA1UdDgQW
BBSH5Zq7a7B/t95GfJWkDBpA8HHqdjAfBgNVHSMEGDAWgBSP8Et/qC5FJK5NUPpj
move4t0bvDB7BggrBgEFBQcBAQRvMG0wLgYIKwYBBQUHMAGGImh0dHA6Ly9vY3Nw
Mi5nbG9iYWxzaWduLmNvbS9yb290cjMwOwYIKwYBBQUHMAKGL2h0dHA6Ly9zZWN1
cmUuZ2xvYmFsc2lnbi5jb20vY2FjZXJ0L3Jvb3QtcjMuY3J0MDYGA1UdHwQvMC0w
K6ApoCeGJWh0dHA6Ly9jcmwuZ2xvYmFsc2lnbi5jb20vcm9vdC1yMy5jcmwwIQYD
VR0gBBowGDAIBgZngQwBAgIwDAYKKwYBBAGgMgoBAjANBgkqhkiG9w0BAQsFAAOC
AQEAKRic9/f+nmhQU/wz04APZLjgG5OgsuUOyUEZjKVhNGDwxGTvKhyXGGAMW2B/
3bRi+aElpXwoxu3pL6fkElbX3B0BeS5LoDtxkyiVEBMZ8m+sXbocwlPyxrPbX6mY
0rVIvnuUeBH8X0L5IwfpNVvKnBIilTbcebfHyXkPezGwz7E1yhUULjJFm2bt0SdX
y+4X/WeiiYIv+fTVgZZgl+/2MKIsu/qdBJc3f3TvJ8nz+Eax1zgZmww+RSQWeOj3
15Iw6Z5FX+NwzY/Ab+9PosR5UosSeq+9HhtaxZttXG1nVh+avYPGYddWmiMT90J5
ZgKnO/Fx2hBgTxhOTMYaD312kg==
-----END CERTIFICATE-----

-----BEGIN CERTIFICATE-----
MIIDXzCCAkegAwIBAgILBAAAAAABIVhTCKIwDQYJKoZIhvcNAQELBQAwTDEgMB4G
A1UECxMXR2xvYmFsU2lnbiBSb290IENBIC0gUjMxEzARBgNVBAoTCkdsb2JhbFNp
Z24xEzARBgNVBAMTCkdsb2JhbFNpZ24wHhcNMDkwMzE4MTAwMDAwWhcNMjkwMzE4
MTAwMDAwWjBMMSAwHgYDVQQLExdHbG9iYWxTaWduIFJvb3QgQ0EgLSBSMzETMBEG
A1UEChMKR2xvYmFsU2lnbjETMBEGA1UEAxMKR2xvYmFsU2lnbjCCASIwDQYJKoZI
hvcNAQEBBQADggEPADCCAQoCggEBAMwldpB5BngiFvXAg7aEyiie/QV2EcWtiHL8
RgJDx7KKnQRfJMsuS+FggkbhUqsMgUdwbN1k0ev1LKMPgj0MK66X17YUhhB5uzsT
gHeMCOFJ0mpiLx9e+pZo34knlTifBtc+ycsmWQ1z3rDI6SYOgxXG71uL0gRgykmm
KPZpO/bLyCiR5Z2KYVc3rHQU3HTgOu5yLy6c+9C7v/U9AOEGM+iCK65TpjoWc4zd
QQ4gOsC0p6Hpsk+QLjJg6VfLuQSSaGjlOCZgdbKfd/+RFO+uIEn8rUAVSNECMWEZ
XriX7613t2Saer9fwRPvm2L7DWzgVGkWqQPabumDk3F2xmmFghcCAwEAAaNCMEAw
DgYDVR0PAQH/BAQDAgEGMA8GA1UdEwEB/wQFMAMBAf8wHQYDVR0OBBYEFI/wS3+o
LkUkrk1Q+mOai97i3Ru8MA0GCSqGSIb3DQEBCwUAA4IBAQBLQNvAUKr+yAzv95ZU
RUm7lgAJQayzE4aGKAczymvmdLm6AC2upArT9fHxD4q/c2dKg8dEe3jgr25sbwMp
jjM5RcOO5LlXbKr8EpbsU8Yt5CRsuZRj+9xTaGdWPoO4zzUhw8lo/s7awlOqzJCK
6fBdRoyV3XpYKBovHd7NADdBj+1EbddTKJd+82cEHhXXipa0095MJ6RMG3NzdvQX
mcIfeg7jLQitChws/zyrVQ4PkX4268NXSb7hLi18YIvDQVETI53O9zJrlAGomecs
Mx86OyXShkDOOyyGeMlhLxS67ttVb9+E7gUJTb0o2HLO02JQZR7rkpeDMdmztcpH
WD9f
-----END CERTIFICATE-----`;t.default={RedisCloudFixed:{ca:r},RedisCloudFlexible:{ca:r}}},92231:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0});let n=r(76752);class i extends n.RedisError{constructor(e,t){super(e),this.lastNodeError=t,Error.captureStackTrace(this,this.constructor)}get name(){return this.constructor.name}}t.default=i,i.defaultMessage="Failed to refresh slots cache."},61969:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0});let n=r(76752);class i extends n.AbortError{constructor(e){let t=`Reached the max retries per request limit (which is ${e}). Refer to "maxRetriesPerRequest" option for details.`;super(t),Error.captureStackTrace(this,this.constructor)}get name(){return this.constructor.name}}t.default=i},28325:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.MaxRetriesPerRequestError=void 0;let n=r(61969);t.MaxRetriesPerRequestError=n.default},26277:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.print=t.ReplyError=t.SentinelIterator=t.SentinelConnector=t.AbstractConnector=t.Pipeline=t.ScanStream=t.Command=t.Cluster=t.Redis=t.default=void 0,t=e.exports=r(12858).default;var n=r(12858);Object.defineProperty(t,"default",{enumerable:!0,get:function(){return n.default}});var i=r(12858);Object.defineProperty(t,"Redis",{enumerable:!0,get:function(){return i.default}});var s=r(11610);Object.defineProperty(t,"Cluster",{enumerable:!0,get:function(){return s.default}});var a=r(95869);Object.defineProperty(t,"Command",{enumerable:!0,get:function(){return a.default}});var o=r(85439);Object.defineProperty(t,"ScanStream",{enumerable:!0,get:function(){return o.default}});var l=r(13261);Object.defineProperty(t,"Pipeline",{enumerable:!0,get:function(){return l.default}});var u=r(57859);Object.defineProperty(t,"AbstractConnector",{enumerable:!0,get:function(){return u.default}});var c=r(33929);Object.defineProperty(t,"SentinelConnector",{enumerable:!0,get:function(){return c.default}}),Object.defineProperty(t,"SentinelIterator",{enumerable:!0,get:function(){return c.SentinelIterator}}),t.ReplyError=r(76752).ReplyError,Object.defineProperty(t,"Promise",{get:()=>(console.warn("ioredis v5 does not support plugging third-party Promise library anymore. Native Promise will be used."),Promise),set(e){console.warn("ioredis v5 does not support plugging third-party Promise library anymore. Native Promise will be used.")}}),t.print=function(e,t){e?console.log("Error: "+e):console.log("Reply: "+t)}},11049:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.DEFAULT_REDIS_OPTIONS=void 0,t.DEFAULT_REDIS_OPTIONS={port:6379,host:"localhost",family:4,connectTimeout:1e4,disconnectTimeout:2e3,retryStrategy:function(e){return Math.min(50*e,2e3)},keepAlive:0,noDelay:!0,connectionName:null,sentinels:null,name:null,role:"master",sentinelRetryStrategy:function(e){return Math.min(10*e,1e3)},sentinelReconnectStrategy:function(){return 6e4},natMap:null,enableTLSForSentinelMode:!1,updateSentinels:!0,failoverDetector:!1,username:null,password:null,db:0,enableOfflineQueue:!0,enableReadyCheck:!0,autoResubscribe:!0,autoResendUnfulfilledCommands:!0,lazyConnect:!1,keyPrefix:"",reconnectOnError:null,readOnly:!1,stringNumbers:!1,maxRetriesPerRequest:20,maxLoadingRetryTime:1e4,enableAutoPipelining:!1,autoPipeliningIgnoredCommands:[],sentinelMaxConnections:10}},93114:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.readyHandler=t.errorHandler=t.closeHandler=t.connectHandler=void 0;let n=r(76752),i=r(95869),s=r(28325),a=r(27132),o=r(99601),l=(0,a.Debug)("connection");function u(e){let t=new n.AbortError("Command aborted due to connection close");return t.command={name:e.name,args:e.args},t}t.connectHandler=function(e){return function(){e.setStatus("connect"),e.resetCommandQueue();let r=!1,{connectionEpoch:n}=e;e.condition.auth&&e.auth(e.condition.auth,function(t){n===e.connectionEpoch&&t&&(-1!==t.message.indexOf("no password is set")?console.warn("[WARN] Redis server does not require a password, but a password was supplied."):-1!==t.message.indexOf("without any password configured for the default user")?console.warn("[WARN] This Redis server's `default` user does not require a password, but a password was supplied"):-1!==t.message.indexOf("wrong number of arguments for 'auth' command")?console.warn("[ERROR] The server returned \"wrong number of arguments for 'auth' command\". You are probably passing both username and password to Redis version 5 or below. You should only pass the 'password' option for Redis version 5 and under."):(r=!0,e.recoverFromFatalError(t,t)))}),e.condition.select&&e.select(e.condition.select).catch(t=>{e.silentEmit("error",t)}),e.options.enableReadyCheck||t.readyHandler(e)(),new o.default(e,{stringNumbers:e.options.stringNumbers}),e.options.enableReadyCheck&&e._readyCheck(function(i,s){n===e.connectionEpoch&&(i?r||e.recoverFromFatalError(Error("Ready check failed: "+i.message),i):e.connector.check(s)?t.readyHandler(e)():e.disconnect(!0))})}},t.closeHandler=function(e){return function(){let r=e.status;if(e.setStatus("close"),e.commandQueue.length&&function(e){var t;let r=0;for(let n=0;n<e.length;){let i=null===(t=e.peekAt(n))||void 0===t?void 0:t.command,s=i.pipelineIndex;if((void 0===s||0===s)&&(r=0),void 0!==s&&s!==r++){e.remove(n,1),i.reject(u(i));continue}n++}}(e.commandQueue),e.offlineQueue.length&&function(e){var t;for(let r=0;r<e.length;){let n=null===(t=e.peekAt(r))||void 0===t?void 0:t.command;if("multi"===n.name)break;if("exec"===n.name){e.remove(r,1),n.reject(u(n));break}n.inTransaction?(e.remove(r,1),n.reject(u(n))):r++}}(e.offlineQueue),"ready"===r&&(e.prevCondition||(e.prevCondition=e.condition),e.commandQueue.length&&(e.prevCommandQueue=e.commandQueue)),e.manuallyClosing)return e.manuallyClosing=!1,l("skip reconnecting since the connection is manually closed."),t();if("function"!=typeof e.options.retryStrategy)return l("skip reconnecting because `retryStrategy` is not a function"),t();let n=e.options.retryStrategy(++e.retryAttempts);if("number"!=typeof n)return l("skip reconnecting because `retryStrategy` doesn't return a number"),t();l("reconnect in %sms",n),e.setStatus("reconnecting",n),e.reconnectTimeout=setTimeout(function(){e.reconnectTimeout=null,e.connect().catch(a.noop)},n);let{maxRetriesPerRequest:i}=e.options;if("number"==typeof i){if(i<0)l("maxRetriesPerRequest is negative, ignoring...");else{let t=e.retryAttempts%(i+1);0===t&&(l("reach maxRetriesPerRequest limitation, flushing command queue..."),e.flushQueue(new s.MaxRetriesPerRequestError(i)))}}};function t(){e.setStatus("end"),e.flushQueue(Error(a.CONNECTION_CLOSED_ERROR_MSG))}},t.errorHandler=function(e){return function(t){l("error: %s",t),e.silentEmit("error",t)}},t.readyHandler=function(e){return function(){if(e.setStatus("ready"),e.retryAttempts=0,e.options.monitor){e.call("monitor").then(()=>e.setStatus("monitoring"),t=>e.emit("error",t));let{sendCommand:t}=e;e.sendCommand=function(r){return i.default.checkFlag("VALID_IN_MONITOR_MODE",r.name)?t.call(e,r):(r.reject(Error("Connection is in monitoring mode, can't process commands.")),r.promise)},e.once("close",function(){delete e.sendCommand});return}let t=e.prevCondition?e.prevCondition.select:e.condition.select;if(e.options.connectionName&&(l("set the connection name [%s]",e.options.connectionName),e.client("setname",e.options.connectionName).catch(a.noop)),e.options.readOnly&&(l("set the connection to readonly mode"),e.readonly().catch(a.noop)),e.prevCondition){let r=e.prevCondition;if(e.prevCondition=null,r.subscriber&&e.options.autoResubscribe){e.condition.select!==t&&(l("connect to db [%d]",t),e.select(t));let n=r.subscriber.channels("subscribe");n.length&&(l("subscribe %d channels",n.length),e.subscribe(n));let i=r.subscriber.channels("psubscribe");i.length&&(l("psubscribe %d channels",i.length),e.psubscribe(i));let s=r.subscriber.channels("ssubscribe");s.length&&(l("ssubscribe %d channels",s.length),e.ssubscribe(s))}}if(e.prevCommandQueue){if(e.options.autoResendUnfulfilledCommands)for(l("resend %d unfulfilled commands",e.prevCommandQueue.length);e.prevCommandQueue.length>0;){let t=e.prevCommandQueue.shift();t.select!==e.condition.select&&"select"!==t.command.name&&e.select(t.select),e.sendCommand(t.command,t.stream)}else e.prevCommandQueue=null}if(e.offlineQueue.length){l("send %d commands in offline queue",e.offlineQueue.length);let t=e.offlineQueue;for(e.resetOfflineQueue();t.length>0;){let r=t.shift();r.select!==e.condition.select&&"select"!==r.command.name&&e.select(r.select),e.sendCommand(r.command,r.stream)}}e.condition.select!==t&&(l("connect to db [%d]",t),e.select(t))}}},70214:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.addTransactionSupport=void 0;let n=r(27132),i=r(13534),s=r(13261);t.addTransactionSupport=function(e){e.pipeline=function(e){let t=new s.default(this);return Array.isArray(e)&&t.addBatch(e),t};let{multi:t}=e;e.multi=function(e,r){if(void 0!==r||Array.isArray(e)||(r=e,e=null),r&&!1===r.pipeline)return t.call(this);let a=new s.default(this);a.multi(),Array.isArray(e)&&a.addBatch(e);let o=a.exec;a.exec=function(e){if(this.isCluster&&!this.redis.slots.length)return"wait"===this.redis.status&&this.redis.connect().catch(n.noop),(0,i.default)(new Promise((e,t)=>{this.redis.delayUntilReady(r=>{if(r){t(r);return}this.exec(a).then(e,t)})}),e);if(this._transactions>0&&o.call(a),this.nodeifiedPromise)return o.call(a);let t=o.call(a);return(0,i.default)(t.then(function(e){let t=e[e.length-1];if(void 0===t)throw Error("Pipeline cannot be used to send any commands when the `exec()` has been called on it.");if(t[0]){t[0].previousErrors=[];for(let r=0;r<e.length-1;++r)e[r][0]&&t[0].previousErrors.push(e[r][0]);throw t[0]}return(0,n.wrapMultiResult)(t[1])}),e)};let{execBuffer:l}=a;return a.execBuffer=function(e){return this._transactions>0&&l.call(a),a.exec(e)},a};let{exec:r}=e;e.exec=function(e){return(0,i.default)(r.call(this).then(function(e){return Array.isArray(e)&&(e=(0,n.wrapMultiResult)(e)),e}),e)}}},23410:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0});let n=r(48789),i=r(26459),s=r(95869),a=r(90406);class o{constructor(){this.options={},this.scriptsSet={},this.addedBuiltinSet=new Set}getBuiltinCommands(){return l.slice(0)}createBuiltinCommand(e){return{string:u(null,e,"utf8"),buffer:u(null,e,null)}}addBuiltinCommand(e){this.addedBuiltinSet.add(e),this[e]=u(e,e,"utf8"),this[e+"Buffer"]=u(e+"Buffer",e,null)}defineCommand(e,t){let r=new a.default(t.lua,t.numberOfKeys,this.options.keyPrefix,t.readOnly);this.scriptsSet[e]=r,this[e]=c(e,e,r,"utf8"),this[e+"Buffer"]=c(e+"Buffer",e,r,null)}sendCommand(e,t,r){throw Error('"sendCommand" is not implemented')}}let l=n.list.filter(e=>"monitor"!==e);function u(e,t,r){return void 0===r&&(r=t,t=null),function(...n){let a=t||n.shift(),o=n[n.length-1];"function"==typeof o?n.pop():o=void 0;let l={errorStack:this.options.showFriendlyErrorStack?Error():void 0,keyPrefix:this.options.keyPrefix,replyEncoding:r};return(0,i.shouldUseAutoPipelining)(this,e,a)?(0,i.executeWithAutoPipelining)(this,e,a,n,o):this.sendCommand(new s.default(a,n,l,o))}}function c(e,t,r,n){return function(...s){let a="function"==typeof s[s.length-1]?s.pop():void 0,o={replyEncoding:n};return(this.options.showFriendlyErrorStack&&(o.errorStack=Error()),(0,i.shouldUseAutoPipelining)(this,e,t))?(0,i.executeWithAutoPipelining)(this,e,t,s,a):r.execute(this,s,o,a)}}l.push("sentinel"),l.forEach(function(e){o.prototype[e]=u(e,e,"utf8"),o.prototype[e+"Buffer"]=u(e+"Buffer",e,null)}),o.prototype.call=u("call","utf8"),o.prototype.callBuffer=u("callBuffer",null),o.prototype.send_command=o.prototype.call,t.default=o},52449:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){Object.getOwnPropertyNames(t.prototype).forEach(r=>{Object.defineProperty(e.prototype,r,Object.getOwnPropertyDescriptor(t.prototype,r))})}},55956:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.genRedactedString=t.getStringValue=t.MAX_ARGUMENT_LENGTH=void 0;let n=r(43396);function i(e){if(null!==e)switch(typeof e){case"boolean":case"number":return;case"object":if(Buffer.isBuffer(e))return e.toString("hex");if(Array.isArray(e))return e.join(",");try{return JSON.stringify(e)}catch(e){return}case"string":return e}}function s(e,t){let{length:r}=e;return r<=t?e:e.slice(0,t)+' ... <REDACTED full-length="'+r+'">'}t.MAX_ARGUMENT_LENGTH=200,t.getStringValue=i,t.genRedactedString=s,t.default=function(e){let t=(0,n.default)(`ioredis:${e}`);function r(...e){if(t.enabled){for(let t=1;t<e.length;t++){let r=i(e[t]);"string"==typeof r&&r.length>200&&(e[t]=s(r,200))}return t.apply(null,e)}}return Object.defineProperties(r,{namespace:{get:()=>t.namespace},enabled:{get:()=>t.enabled},destroy:{get:()=>t.destroy},log:{get:()=>t.log,set(e){t.log=e}}}),r}},27132:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.noop=t.defaults=t.Debug=t.zipMap=t.CONNECTION_CLOSED_ERROR_MSG=t.shuffle=t.sample=t.resolveTLSProfile=t.parseURL=t.optimizeErrorStack=t.toArg=t.convertMapToArray=t.convertObjectToArray=t.timeout=t.packObject=t.isInt=t.wrapMultiResult=t.convertBufferToString=void 0;let n=r(57310),i=r(91823);Object.defineProperty(t,"defaults",{enumerable:!0,get:function(){return i.defaults}}),Object.defineProperty(t,"noop",{enumerable:!0,get:function(){return i.noop}});let s=r(55956);t.Debug=s.default;let a=r(97093);function o(e){let t=parseFloat(e);return!isNaN(e)&&(0|t)===t}t.convertBufferToString=function e(t,r){if(t instanceof Buffer)return t.toString(r);if(Array.isArray(t)){let n=t.length,i=Array(n);for(let s=0;s<n;++s)i[s]=t[s]instanceof Buffer&&"utf8"===r?t[s].toString():e(t[s],r);return i}return t},t.wrapMultiResult=function(e){if(!e)return null;let t=[],r=e.length;for(let n=0;n<r;++n){let r=e[n];r instanceof Error?t.push([r]):t.push([null,r])}return t},t.isInt=o,t.packObject=function(e){let t={},r=e.length;for(let n=1;n<r;n+=2)t[e[n-1]]=e[n];return t},t.timeout=function(e,t){let r=null,n=function(){r&&(clearTimeout(r),r=null,e.apply(this,arguments))};return r=setTimeout(n,t,Error("timeout")),n},t.convertObjectToArray=function(e){let t=[],r=Object.keys(e);for(let n=0,i=r.length;n<i;n++)t.push(r[n],e[r[n]]);return t},t.convertMapToArray=function(e){let t=[],r=0;return e.forEach(function(e,n){t[r]=n,t[r+1]=e,r+=2}),t},t.toArg=function(e){return null==e?"":String(e)},t.optimizeErrorStack=function(e,t,r){let n;let i=t.split("\n"),s="";for(n=1;n<i.length&&-1!==i[n].indexOf(r);++n);for(let e=n;e<i.length;++e)s+="\n"+i[e];if(e.stack){let t=e.stack.indexOf("\n");e.stack=e.stack.slice(0,t)+s}return e},t.parseURL=function(e){if(o(e))return{port:e};let t=(0,n.parse)(e,!0,!0);t.slashes||"/"===e[0]||(e="//"+e,t=(0,n.parse)(e,!0,!0));let r=t.query||{},s={};if(t.auth){let e=t.auth.indexOf(":");s.username=-1===e?t.auth:t.auth.slice(0,e),s.password=-1===e?"":t.auth.slice(e+1)}if(t.pathname&&("redis:"===t.protocol||"rediss:"===t.protocol?t.pathname.length>1&&(s.db=t.pathname.slice(1)):s.path=t.pathname),t.host&&(s.host=t.hostname),t.port&&(s.port=t.port),"string"==typeof r.family){let e=Number.parseInt(r.family,10);Number.isNaN(e)||(s.family=e)}return(0,i.defaults)(s,r),s},t.resolveTLSProfile=function(e){let t=null==e?void 0:e.tls;"string"==typeof t&&(t={profile:t});let r=a.default[null==t?void 0:t.profile];return r&&(t=Object.assign({},r,t),delete t.profile,e=Object.assign({},e,{tls:t})),e},t.sample=function(e,t=0){let r=e.length;return t>=r?null:e[t+Math.floor(Math.random()*(r-t))]},t.shuffle=function(e){let t=e.length;for(;t>0;){let r=Math.floor(Math.random()*t);t--,[e[t],e[r]]=[e[r],e[t]]}return e},t.CONNECTION_CLOSED_ERROR_MSG="Connection is closed.",t.zipMap=function(e,t){let r=new Map;return e.forEach((e,n)=>{r.set(e,t[n])}),r}},91823:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.isArguments=t.defaults=t.noop=void 0;let n=r(88040);t.defaults=n;let i=r(5101);t.isArguments=i,t.noop=function(){}},88359:e=>{/*!
 * is-extglob <https://github.com/jonschlinkert/is-extglob>
 *
 * Copyright (c) 2014-2016, Jon Schlinkert.
 * Licensed under the MIT License.
 */e.exports=function(e){var t;if("string"!=typeof e||""===e)return!1;for(;t=/(\\).|([@?!+*]\(.*\))/g.exec(e);){if(t[2])return!0;e=e.slice(t.index+t[0].length)}return!1}},92969:(e,t,r)=>{/*!
 * is-glob <https://github.com/jonschlinkert/is-glob>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */var n=r(88359),i={"{":"}","(":")","[":"]"},s=function(e){if("!"===e[0])return!0;for(var t=0,r=-2,n=-2,s=-2,a=-2,o=-2;t<e.length;){if("*"===e[t]||"?"===e[t+1]&&/[\].+)]/.test(e[t])||-1!==n&&"["===e[t]&&"]"!==e[t+1]&&(n<t&&(n=e.indexOf("]",t)),n>t&&(-1===o||o>n||-1===(o=e.indexOf("\\",t))||o>n))||-1!==s&&"{"===e[t]&&"}"!==e[t+1]&&(s=e.indexOf("}",t))>t&&(-1===(o=e.indexOf("\\",t))||o>s)||-1!==a&&"("===e[t]&&"?"===e[t+1]&&/[:!=]/.test(e[t+2])&&")"!==e[t+3]&&(a=e.indexOf(")",t))>t&&(-1===(o=e.indexOf("\\",t))||o>a)||-1!==r&&"("===e[t]&&"|"!==e[t+1]&&(r<t&&(r=e.indexOf("|",t)),-1!==r&&")"!==e[r+1]&&(a=e.indexOf(")",r))>r&&(-1===(o=e.indexOf("\\",r))||o>a)))return!0;if("\\"===e[t]){var l=e[t+1];t+=2;var u=i[l];if(u){var c=e.indexOf(u,t);-1!==c&&(t=c+1)}if("!"===e[t])return!0}else t++}return!1},a=function(e){if("!"===e[0])return!0;for(var t=0;t<e.length;){if(/[*?{}()[\]]/.test(e[t]))return!0;if("\\"===e[t]){var r=e[t+1];t+=2;var n=i[r];if(n){var s=e.indexOf(n,t);-1!==s&&(t=s+1)}if("!"===e[t])return!0}else t++}return!1};e.exports=function(e,t){if("string"!=typeof e||""===e)return!1;if(n(e))return!0;var r=s;return t&&!1===t.strict&&(r=a),r(e)}},11821:e=>{/*!
 * is-number <https://github.com/jonschlinkert/is-number>
 *
 * Copyright (c) 2014-present, Jon Schlinkert.
 * Released under the MIT License.
 */e.exports=function(e){return"number"==typeof e?e-e==0:"string"==typeof e&&""!==e.trim()&&(Number.isFinite?Number.isFinite(+e):isFinite(+e))}},88040:e=>{var t=/^(?:0|[1-9]\d*)$/;function r(e,t,r){switch(r.length){case 0:return e.call(t);case 1:return e.call(t,r[0]);case 2:return e.call(t,r[0],r[1]);case 3:return e.call(t,r[0],r[1],r[2])}return e.apply(t,r)}var n=Object.prototype,i=n.hasOwnProperty,s=n.toString,a=n.propertyIsEnumerable,o=Math.max;function l(e,t,r,s){return void 0===e||d(e,n[r])&&!i.call(s,r)?t:e}function u(e,t){return t=o(void 0===t?e.length-1:t,0),function(){for(var n=arguments,i=-1,s=o(n.length-t,0),a=Array(s);++i<s;)a[i]=n[t+i];i=-1;for(var l=Array(t+1);++i<t;)l[i]=n[i];return l[t]=a,r(e,this,l)}}function c(e,r){return!!(r=null==r?9007199254740991:r)&&("number"==typeof e||t.test(e))&&e>-1&&e%1==0&&e<r}function d(e,t){return e===t||e!=e&&t!=t}var h=Array.isArray;function p(e){var t,r;return null!=e&&"number"==typeof(t=e.length)&&t>-1&&t%1==0&&t<=9007199254740991&&!("[object Function]"==(r=f(e)?s.call(e):"")||"[object GeneratorFunction]"==r)}function f(e){var t=typeof e;return!!e&&("object"==t||"function"==t)}var y=function(e){return u(function(t,r){var n=-1,i=r.length,s=i>1?r[i-1]:void 0,a=i>2?r[2]:void 0;for(s=e.length>3&&"function"==typeof s?(i--,s):void 0,a&&function(e,t,r){if(!f(r))return!1;var n=typeof t;return("number"==n?!!(p(r)&&c(t,r.length)):"string"==n&&(t in r))&&d(r[t],e)}(r[0],r[1],a)&&(s=i<3?void 0:s,i=1),t=Object(t);++n<i;){var o=r[n];o&&e(t,o,n,s)}return t})}(function(e,t,r,o){!function(e,t,r,n){r||(r={});for(var s=-1,a=t.length;++s<a;){var o=t[s],l=n?n(r[o],e[o],o,r,e):void 0;!function(e,t,r){var n=e[t];i.call(e,t)&&d(n,r)&&(void 0!==r||t in e)||(e[t]=r)}(r,o,void 0===l?e[o]:l)}}(t,p(t)?function(e,t){var r=h(e)||e&&"object"==typeof e&&p(e)&&i.call(e,"callee")&&(!a.call(e,"callee")||"[object Arguments]"==s.call(e))?function(e,t){for(var r=-1,n=Array(e);++r<e;)n[r]=t(r);return n}(e.length,String):[],n=r.length,o=!!n;for(var l in e)(t||i.call(e,l))&&!(o&&("length"==l||c(l,n)))&&r.push(l);return r}(t,!0):function(e){if(!f(e))return function(e){var t=[];if(null!=e)for(var r in Object(e))t.push(r);return t}(e);var t,r=(t=e&&e.constructor,e===("function"==typeof t&&t.prototype||n)),s=[];for(var a in e)"constructor"==a&&(r||!i.call(e,a))||s.push(a);return s}(t),e,o)}),m=u(function(e){return e.push(void 0,l),r(y,void 0,e)});e.exports=m},5101:e=>{var t=Object.prototype,r=t.hasOwnProperty,n=t.toString,i=t.propertyIsEnumerable;e.exports=function(e){var t,s,a,o,l,u;return!!e&&"object"==typeof e&&null!=(t=e)&&"number"==typeof(s=t.length)&&s>-1&&s%1==0&&s<=9007199254740991&&!("[object Function]"==(l=typeof(o=a=t),u=o&&("object"==l||"function"==l)?n.call(a):"")||"[object GeneratorFunction]"==u)&&r.call(e,"callee")&&(!i.call(e,"callee")||"[object Arguments]"==n.call(e))}},27523:(e,t,r)=>{let n=r(57242),i=Symbol("max"),s=Symbol("length"),a=Symbol("lengthCalculator"),o=Symbol("allowStale"),l=Symbol("maxAge"),u=Symbol("dispose"),c=Symbol("noDisposeOnSet"),d=Symbol("lruList"),h=Symbol("cache"),p=Symbol("updateAgeOnGet"),f=()=>1;class y{constructor(e){if("number"==typeof e&&(e={max:e}),e||(e={}),e.max&&("number"!=typeof e.max||e.max<0))throw TypeError("max must be a non-negative number");this[i]=e.max||1/0;let t=e.length||f;if(this[a]="function"!=typeof t?f:t,this[o]=e.stale||!1,e.maxAge&&"number"!=typeof e.maxAge)throw TypeError("maxAge must be a number");this[l]=e.maxAge||0,this[u]=e.dispose,this[c]=e.noDisposeOnSet||!1,this[p]=e.updateAgeOnGet||!1,this.reset()}set max(e){if("number"!=typeof e||e<0)throw TypeError("max must be a non-negative number");this[i]=e||1/0,b(this)}get max(){return this[i]}set allowStale(e){this[o]=!!e}get allowStale(){return this[o]}set maxAge(e){if("number"!=typeof e)throw TypeError("maxAge must be a non-negative number");this[l]=e,b(this)}get maxAge(){return this[l]}set lengthCalculator(e){"function"!=typeof e&&(e=f),e!==this[a]&&(this[a]=e,this[s]=0,this[d].forEach(e=>{e.length=this[a](e.value,e.key),this[s]+=e.length})),b(this)}get lengthCalculator(){return this[a]}get length(){return this[s]}get itemCount(){return this[d].length}rforEach(e,t){t=t||this;for(let r=this[d].tail;null!==r;){let n=r.prev;E(this,e,r,t),r=n}}forEach(e,t){t=t||this;for(let r=this[d].head;null!==r;){let n=r.next;E(this,e,r,t),r=n}}keys(){return this[d].toArray().map(e=>e.key)}values(){return this[d].toArray().map(e=>e.value)}reset(){this[u]&&this[d]&&this[d].length&&this[d].forEach(e=>this[u](e.key,e.value)),this[h]=new Map,this[d]=new n,this[s]=0}dump(){return this[d].map(e=>!g(this,e)&&{k:e.key,v:e.value,e:e.now+(e.maxAge||0)}).toArray().filter(e=>e)}dumpLru(){return this[d]}set(e,t,r){if((r=r||this[l])&&"number"!=typeof r)throw TypeError("maxAge must be a number");let n=r?Date.now():0,o=this[a](t,e);if(this[h].has(e)){if(o>this[i])return S(this,this[h].get(e)),!1;let a=this[h].get(e),l=a.value;return this[u]&&!this[c]&&this[u](e,l.value),l.now=n,l.maxAge=r,l.value=t,this[s]+=o-l.length,l.length=o,this.get(e),b(this),!0}let p=new v(e,t,o,n,r);return p.length>this[i]?(this[u]&&this[u](e,t),!1):(this[s]+=p.length,this[d].unshift(p),this[h].set(e,this[d].head),b(this),!0)}has(e){if(!this[h].has(e))return!1;let t=this[h].get(e).value;return!g(this,t)}get(e){return m(this,e,!0)}peek(e){return m(this,e,!1)}pop(){let e=this[d].tail;return e?(S(this,e),e.value):null}del(e){S(this,this[h].get(e))}load(e){this.reset();let t=Date.now();for(let r=e.length-1;r>=0;r--){let n=e[r],i=n.e||0;if(0===i)this.set(n.k,n.v);else{let e=i-t;e>0&&this.set(n.k,n.v,e)}}}prune(){this[h].forEach((e,t)=>m(this,t,!1))}}let m=(e,t,r)=>{let n=e[h].get(t);if(n){let t=n.value;if(g(e,t)){if(S(e,n),!e[o])return}else r&&(e[p]&&(n.value.now=Date.now()),e[d].unshiftNode(n));return t.value}},g=(e,t)=>{if(!t||!t.maxAge&&!e[l])return!1;let r=Date.now()-t.now;return t.maxAge?r>t.maxAge:e[l]&&r>e[l]},b=e=>{if(e[s]>e[i])for(let t=e[d].tail;e[s]>e[i]&&null!==t;){let r=t.prev;S(e,t),t=r}},S=(e,t)=>{if(t){let r=t.value;e[u]&&e[u](r.key,r.value),e[s]-=r.length,e[h].delete(r.key),e[d].removeNode(t)}};class v{constructor(e,t,r,n,i){this.key=e,this.value=t,this.length=r,this.now=n,this.maxAge=i||0}}let E=(e,t,r,n)=>{let i=r.value;g(e,i)&&(S(e,r),e[o]||(i=void 0)),i&&t.call(n,i.value,i.key,e)};e.exports=y},90108:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0});class r extends Error{}class n extends r{constructor(e){super(`Invalid DateTime: ${e.toMessage()}`)}}class i extends r{constructor(e){super(`Invalid Interval: ${e.toMessage()}`)}}class s extends r{constructor(e){super(`Invalid Duration: ${e.toMessage()}`)}}class a extends r{}class o extends r{constructor(e){super(`Invalid unit ${e}`)}}class l extends r{}class u extends r{constructor(){super("Zone is an abstract class")}}let c="numeric",d="short",h="long",p={year:c,month:c,day:c},f={year:c,month:d,day:c},y={year:c,month:d,day:c,weekday:d},m={year:c,month:h,day:c},g={year:c,month:h,day:c,weekday:h},b={hour:c,minute:c},S={hour:c,minute:c,second:c},v={hour:c,minute:c,second:c,timeZoneName:d},E={hour:c,minute:c,second:c,timeZoneName:h},k={hour:c,minute:c,hourCycle:"h23"},K={hour:c,minute:c,second:c,hourCycle:"h23"},w={hour:c,minute:c,second:c,hourCycle:"h23",timeZoneName:d},I={hour:c,minute:c,second:c,hourCycle:"h23",timeZoneName:h},x={year:c,month:c,day:c,hour:c,minute:c},A={year:c,month:c,day:c,hour:c,minute:c,second:c},T={year:c,month:d,day:c,hour:c,minute:c},j={year:c,month:d,day:c,hour:c,minute:c,second:c},R={year:c,month:d,day:c,weekday:d,hour:c,minute:c},_={year:c,month:h,day:c,hour:c,minute:c,timeZoneName:d},C={year:c,month:h,day:c,hour:c,minute:c,second:c,timeZoneName:d},O={year:c,month:h,day:c,weekday:h,hour:c,minute:c,timeZoneName:h},P={year:c,month:h,day:c,weekday:h,hour:c,minute:c,second:c,timeZoneName:h};class D{get type(){throw new u}get name(){throw new u}get ianaName(){return this.name}get isUniversal(){throw new u}offsetName(e,t){throw new u}formatOffset(e,t){throw new u}offset(e){throw new u}equals(e){throw new u}get isValid(){throw new u}}let M=null;class N extends D{static get instance(){return null===M&&(M=new N),M}get type(){return"system"}get name(){return new Intl.DateTimeFormat().resolvedOptions().timeZone}get isUniversal(){return!1}offsetName(e,{format:t,locale:r}){return eq(e,t,r)}formatOffset(e,t){return eX(this.offset(e),t)}offset(e){return-new Date(e).getTimezoneOffset()}equals(e){return"system"===e.type}get isValid(){return!0}}let L={},F={year:0,month:1,day:2,era:3,hour:4,minute:5,second:6},V={};class J extends D{static create(e){return V[e]||(V[e]=new J(e)),V[e]}static resetCache(){V={},L={}}static isValidSpecifier(e){return this.isValidZone(e)}static isValidZone(e){if(!e)return!1;try{return new Intl.DateTimeFormat("en-US",{timeZone:e}).format(),!0}catch(e){return!1}}constructor(e){super(),this.zoneName=e,this.valid=J.isValidZone(e)}get type(){return"iana"}get name(){return this.zoneName}get isUniversal(){return!1}offsetName(e,{format:t,locale:r}){return eq(e,t,r,this.name)}formatOffset(e,t){return eX(this.offset(e),t)}offset(e){var t;let r=new Date(e);if(isNaN(r))return NaN;let n=(L[t=this.name]||(L[t]=new Intl.DateTimeFormat("en-US",{hour12:!1,timeZone:t,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit",era:"short"})),L[t]),[i,s,a,o,l,u,c]=n.formatToParts?function(e,t){let r=e.formatToParts(t),n=[];for(let e=0;e<r.length;e++){let{type:t,value:i}=r[e],s=F[t];"era"===t?n[s]=i:eT(s)||(n[s]=parseInt(i,10))}return n}(n,r):function(e,t){let r=e.format(t).replace(/\u200E/g,""),n=/(\d+)\/(\d+)\/(\d+) (AD|BC),? (\d+):(\d+):(\d+)/.exec(r),[,i,s,a,o,l,u,c]=n;return[a,i,s,o,l,u,c]}(n,r);"BC"===o&&(i=-Math.abs(i)+1);let d=eB({year:i,month:s,day:a,hour:24===l?0:l,minute:u,second:c,millisecond:0}),h=+r,p=h%1e3;return(d-(h-=p>=0?p:1e3+p))/6e4}equals(e){return"iana"===e.type&&e.name===this.name}get isValid(){return this.valid}}let G={},$={};function Y(e,t={}){let r=JSON.stringify([e,t]),n=$[r];return n||(n=new Intl.DateTimeFormat(e,t),$[r]=n),n}let B={},z={},H=null,W={};function q(e,t,r,n){let i=e.listingMode();return"error"===i?null:"en"===i?r(t):n(t)}class U{constructor(e,t,r){this.padTo=r.padTo||0,this.floor=r.floor||!1;let{padTo:n,floor:i,...s}=r;if(!t||Object.keys(s).length>0){let t={useGrouping:!1,...r};r.padTo>0&&(t.minimumIntegerDigits=r.padTo),this.inf=function(e,t={}){let r=JSON.stringify([e,t]),n=B[r];return n||(n=new Intl.NumberFormat(e,t),B[r]=n),n}(e,t)}}format(e){if(this.inf){let t=this.floor?Math.floor(e):e;return this.inf.format(t)}{let t=this.floor?Math.floor(e):eJ(e,3);return eN(t,this.padTo)}}}class Q{constructor(e,t,r){let n;if(this.opts=r,this.originalZone=void 0,this.opts.timeZone)this.dt=e;else if("fixed"===e.zone.type){let t=-1*(e.offset/60),r=t>=0?`Etc/GMT+${t}`:`Etc/GMT${t}`;0!==e.offset&&J.create(r).valid?(n=r,this.dt=e):(n="UTC",this.dt=0===e.offset?e:e.setZone("UTC").plus({minutes:e.offset}),this.originalZone=e.zone)}else"system"===e.zone.type?this.dt=e:"iana"===e.zone.type?(this.dt=e,n=e.zone.name):(n="UTC",this.dt=e.setZone("UTC").plus({minutes:e.offset}),this.originalZone=e.zone);let i={...this.opts};i.timeZone=i.timeZone||n,this.dtf=Y(t,i)}format(){return this.originalZone?this.formatToParts().map(({value:e})=>e).join(""):this.dtf.format(this.dt.toJSDate())}formatToParts(){let e=this.dtf.formatToParts(this.dt.toJSDate());return this.originalZone?e.map(e=>{if("timeZoneName"!==e.type)return e;{let t=this.originalZone.offsetName(this.dt.ts,{locale:this.dt.locale,format:this.opts.timeZoneName});return{...e,value:t}}}):e}resolvedOptions(){return this.dtf.resolvedOptions()}}class Z{constructor(e,t,r){this.opts={style:"long",...r},!t&&e_()&&(this.rtf=function(e,t={}){let{base:r,...n}=t,i=JSON.stringify([e,n]),s=z[i];return s||(s=new Intl.RelativeTimeFormat(e,t),z[i]=s),s}(e,r))}format(e,t){return this.rtf?this.rtf.format(e,t):function(e,t,r="always",n=!1){let i={years:["year","yr."],quarters:["quarter","qtr."],months:["month","mo."],weeks:["week","wk."],days:["day","day","days"],hours:["hour","hr."],minutes:["minute","min."],seconds:["second","sec."]},s=-1===["hours","minutes","seconds"].indexOf(e);if("auto"===r&&s){let r="days"===e;switch(t){case 1:return r?"tomorrow":`next ${i[e][0]}`;case -1:return r?"yesterday":`last ${i[e][0]}`;case 0:return r?"today":`this ${i[e][0]}`}}let a=Object.is(t,-0)||t<0,o=Math.abs(t),l=1===o,u=i[e],c=n?l?u[1]:u[2]||u[1]:l?i[e][0]:e;return a?`${o} ${c} ago`:`in ${o} ${c}`}(t,e,this.opts.numeric,"long"!==this.opts.style)}formatToParts(e,t){return this.rtf?this.rtf.formatToParts(e,t):[]}}let X={firstDay:1,minimalDays:4,weekend:[6,7]};class ee{static fromOpts(e){return ee.create(e.locale,e.numberingSystem,e.outputCalendar,e.weekSettings,e.defaultToEN)}static create(e,t,r,n,i=!1){let s=e||ep.defaultLocale,a=s||(i?"en-US":H||(H=new Intl.DateTimeFormat().resolvedOptions().locale)),o=t||ep.defaultNumberingSystem,l=r||ep.defaultOutputCalendar,u=eD(n)||ep.defaultWeekSettings;return new ee(a,o,l,u,s)}static resetCache(){H=null,$={},B={},z={}}static fromObject({locale:e,numberingSystem:t,outputCalendar:r,weekSettings:n}={}){return ee.create(e,t,r,n)}constructor(e,t,r,n,i){let[s,a,o]=function(e){let t=e.indexOf("-x-");-1!==t&&(e=e.substring(0,t));let r=e.indexOf("-u-");if(-1===r)return[e];{let t,n;try{t=Y(e).resolvedOptions(),n=e}catch(s){let i=e.substring(0,r);t=Y(i).resolvedOptions(),n=i}let{numberingSystem:i,calendar:s}=t;return[n,i,s]}}(e);this.locale=s,this.numberingSystem=t||a||null,this.outputCalendar=r||o||null,this.weekSettings=n,this.intl=function(e,t,r){return(r||t)&&(e.includes("-u-")||(e+="-u"),r&&(e+=`-ca-${r}`),t&&(e+=`-nu-${t}`)),e}(this.locale,this.numberingSystem,this.outputCalendar),this.weekdaysCache={format:{},standalone:{}},this.monthsCache={format:{},standalone:{}},this.meridiemCache=null,this.eraCache={},this.specifiedLocale=i,this.fastNumbersCached=null}get fastNumbers(){return null==this.fastNumbersCached&&(this.fastNumbersCached=(!this.numberingSystem||"latn"===this.numberingSystem)&&("latn"===this.numberingSystem||!this.locale||this.locale.startsWith("en")||"latn"===new Intl.DateTimeFormat(this.intl).resolvedOptions().numberingSystem)),this.fastNumbersCached}listingMode(){let e=this.isEnglish(),t=(null===this.numberingSystem||"latn"===this.numberingSystem)&&(null===this.outputCalendar||"gregory"===this.outputCalendar);return e&&t?"en":"intl"}clone(e){return e&&0!==Object.getOwnPropertyNames(e).length?ee.create(e.locale||this.specifiedLocale,e.numberingSystem||this.numberingSystem,e.outputCalendar||this.outputCalendar,eD(e.weekSettings)||this.weekSettings,e.defaultToEN||!1):this}redefaultToEN(e={}){return this.clone({...e,defaultToEN:!0})}redefaultToSystem(e={}){return this.clone({...e,defaultToEN:!1})}months(e,t=!1){return q(this,e,e6,()=>{let r=t?{month:e,day:"numeric"}:{month:e},n=t?"format":"standalone";return this.monthsCache[n][e]||(this.monthsCache[n][e]=function(e){let t=[];for(let r=1;r<=12;r++){let n=rF.utc(2009,r,1);t.push(e(n))}return t}(e=>this.extract(e,r,"month"))),this.monthsCache[n][e]})}weekdays(e,t=!1){return q(this,e,e8,()=>{let r=t?{weekday:e,year:"numeric",month:"long",day:"numeric"}:{weekday:e},n=t?"format":"standalone";return this.weekdaysCache[n][e]||(this.weekdaysCache[n][e]=function(e){let t=[];for(let r=1;r<=7;r++){let n=rF.utc(2016,11,13+r);t.push(e(n))}return t}(e=>this.extract(e,r,"weekday"))),this.weekdaysCache[n][e]})}meridiems(){return q(this,void 0,()=>e7,()=>{if(!this.meridiemCache){let e={hour:"numeric",hourCycle:"h12"};this.meridiemCache=[rF.utc(2016,11,13,9),rF.utc(2016,11,13,19)].map(t=>this.extract(t,e,"dayperiod"))}return this.meridiemCache})}eras(e){return q(this,e,tn,()=>{let t={era:e};return this.eraCache[e]||(this.eraCache[e]=[rF.utc(-40,1,1),rF.utc(2017,1,1)].map(e=>this.extract(e,t,"era"))),this.eraCache[e]})}extract(e,t,r){let n=this.dtFormatter(e,t),i=n.formatToParts(),s=i.find(e=>e.type.toLowerCase()===r);return s?s.value:null}numberFormatter(e={}){return new U(this.intl,e.forceSimple||this.fastNumbers,e)}dtFormatter(e,t={}){return new Q(e,this.intl,t)}relFormatter(e={}){return new Z(this.intl,this.isEnglish(),e)}listFormatter(e={}){return function(e,t={}){let r=JSON.stringify([e,t]),n=G[r];return n||(n=new Intl.ListFormat(e,t),G[r]=n),n}(this.intl,e)}isEnglish(){return"en"===this.locale||"en-us"===this.locale.toLowerCase()||new Intl.DateTimeFormat(this.intl).resolvedOptions().locale.startsWith("en-us")}getWeekSettings(){return this.weekSettings?this.weekSettings:eC()?function(e){let t=W[e];if(!t){let r=new Intl.Locale(e);t="getWeekInfo"in r?r.getWeekInfo():r.weekInfo,W[e]=t}return t}(this.locale):X}getStartOfWeek(){return this.getWeekSettings().firstDay}getMinDaysInFirstWeek(){return this.getWeekSettings().minimalDays}getWeekendDays(){return this.getWeekSettings().weekend}equals(e){return this.locale===e.locale&&this.numberingSystem===e.numberingSystem&&this.outputCalendar===e.outputCalendar}}let et=null;class er extends D{static get utcInstance(){return null===et&&(et=new er(0)),et}static instance(e){return 0===e?er.utcInstance:new er(e)}static parseSpecifier(e){if(e){let t=e.match(/^utc(?:([+-]\d{1,2})(?::(\d{2}))?)?$/i);if(t)return new er(eU(t[1],t[2]))}return null}constructor(e){super(),this.fixed=e}get type(){return"fixed"}get name(){return 0===this.fixed?"UTC":`UTC${eX(this.fixed,"narrow")}`}get ianaName(){return 0===this.fixed?"Etc/UTC":`Etc/GMT${eX(-this.fixed,"narrow")}`}offsetName(){return this.name}formatOffset(e,t){return eX(this.fixed,t)}get isUniversal(){return!0}offset(){return this.fixed}equals(e){return"fixed"===e.type&&e.fixed===this.fixed}get isValid(){return!0}}class en extends D{constructor(e){super(),this.zoneName=e}get type(){return"invalid"}get name(){return this.zoneName}get isUniversal(){return!1}offsetName(){return null}formatOffset(){return""}offset(){return NaN}equals(){return!1}get isValid(){return!1}}function ei(e,t){if(eT(e)||null===e)return t;if(e instanceof D)return e;if("string"==typeof e){let r=e.toLowerCase();return"default"===r?t:"local"===r||"system"===r?N.instance:"utc"===r||"gmt"===r?er.utcInstance:er.parseSpecifier(r)||J.create(e)}return ej(e)?er.instance(e):"object"==typeof e&&"offset"in e&&"function"==typeof e.offset?e:new en(e)}let es=()=>Date.now(),ea="system",eo=null,el=null,eu=null,ec=60,ed,eh=null;class ep{static get now(){return es}static set now(e){es=e}static set defaultZone(e){ea=e}static get defaultZone(){return ei(ea,N.instance)}static get defaultLocale(){return eo}static set defaultLocale(e){eo=e}static get defaultNumberingSystem(){return el}static set defaultNumberingSystem(e){el=e}static get defaultOutputCalendar(){return eu}static set defaultOutputCalendar(e){eu=e}static get defaultWeekSettings(){return eh}static set defaultWeekSettings(e){eh=eD(e)}static get twoDigitCutoffYear(){return ec}static set twoDigitCutoffYear(e){ec=e%100}static get throwOnInvalid(){return ed}static set throwOnInvalid(e){ed=e}static resetCaches(){ee.resetCache(),J.resetCache()}}class ef{constructor(e,t){this.reason=e,this.explanation=t}toMessage(){return this.explanation?`${this.reason}: ${this.explanation}`:this.reason}}let ey=[0,31,59,90,120,151,181,212,243,273,304,334],em=[0,31,60,91,121,152,182,213,244,274,305,335];function eg(e,t){return new ef("unit out of range",`you specified ${t} (of type ${typeof t}) as a ${e}, which is invalid`)}function eb(e,t,r){let n=new Date(Date.UTC(e,t-1,r));e<100&&e>=0&&n.setUTCFullYear(n.getUTCFullYear()-1900);let i=n.getUTCDay();return 0===i?7:i}function eS(e,t){let r=eG(e)?em:ey,n=r.findIndex(e=>e<t),i=t-r[n];return{month:n+1,day:i}}function ev(e,t){return(e-t+7)%7+1}function eE(e,t=4,r=1){let{year:n,month:i,day:s}=e,a=s+(eG(n)?em:ey)[i-1],o=ev(eb(n,i,s),r),l=Math.floor((a-o+14-t)/7),u;return l<1?l=eH(u=n-1,t,r):l>eH(n,t,r)?(u=n+1,l=1):u=n,{weekYear:u,weekNumber:l,weekday:o,...e0(e)}}function ek(e,t=4,r=1){let{weekYear:n,weekNumber:i,weekday:s}=e,a=ev(eb(n,1,t),r),o=e$(n),l=7*i+s-a-7+t,u;l<1?l+=e$(u=n-1):l>o?(u=n+1,l-=e$(n)):u=n;let{month:c,day:d}=eS(u,l);return{year:u,month:c,day:d,...e0(e)}}function eK(e){let{year:t,month:r,day:n}=e,i=n+(eG(t)?em:ey)[r-1];return{year:t,ordinal:i,...e0(e)}}function ew(e){let{year:t,ordinal:r}=e,{month:n,day:i}=eS(t,r);return{year:t,month:n,day:i,...e0(e)}}function eI(e,t){let r=!eT(e.localWeekday)||!eT(e.localWeekNumber)||!eT(e.localWeekYear);if(!r)return{minDaysInFirstWeek:4,startOfWeek:1};{let r=!eT(e.weekday)||!eT(e.weekNumber)||!eT(e.weekYear);if(r)throw new a("Cannot mix locale-based week fields with ISO-based week fields");return eT(e.localWeekday)||(e.weekday=e.localWeekday),eT(e.localWeekNumber)||(e.weekNumber=e.localWeekNumber),eT(e.localWeekYear)||(e.weekYear=e.localWeekYear),delete e.localWeekday,delete e.localWeekNumber,delete e.localWeekYear,{minDaysInFirstWeek:t.getMinDaysInFirstWeek(),startOfWeek:t.getStartOfWeek()}}}function ex(e){let t=eR(e.year),r=eM(e.month,1,12),n=eM(e.day,1,eY(e.year,e.month));return t?r?!n&&eg("day",e.day):eg("month",e.month):eg("year",e.year)}function eA(e){let{hour:t,minute:r,second:n,millisecond:i}=e,s=eM(t,0,23)||24===t&&0===r&&0===n&&0===i,a=eM(r,0,59),o=eM(n,0,59),l=eM(i,0,999);return s?a?o?!l&&eg("millisecond",i):eg("second",n):eg("minute",r):eg("hour",t)}function eT(e){return void 0===e}function ej(e){return"number"==typeof e}function eR(e){return"number"==typeof e&&e%1==0}function e_(){try{return"undefined"!=typeof Intl&&!!Intl.RelativeTimeFormat}catch(e){return!1}}function eC(){try{return"undefined"!=typeof Intl&&!!Intl.Locale&&("weekInfo"in Intl.Locale.prototype||"getWeekInfo"in Intl.Locale.prototype)}catch(e){return!1}}function eO(e,t,r){if(0!==e.length)return e.reduce((e,n)=>{let i=[t(n),n];return e&&r(e[0],i[0])===e[0]?e:i},null)[1]}function eP(e,t){return Object.prototype.hasOwnProperty.call(e,t)}function eD(e){if(null==e)return null;if("object"!=typeof e)throw new l("Week settings must be an object");if(!eM(e.firstDay,1,7)||!eM(e.minimalDays,1,7)||!Array.isArray(e.weekend)||e.weekend.some(e=>!eM(e,1,7)))throw new l("Invalid week settings");return{firstDay:e.firstDay,minimalDays:e.minimalDays,weekend:Array.from(e.weekend)}}function eM(e,t,r){return eR(e)&&e>=t&&e<=r}function eN(e,t=2){return e<0?"-"+(""+-e).padStart(t,"0"):(""+e).padStart(t,"0")}function eL(e){if(!eT(e)&&null!==e&&""!==e)return parseInt(e,10)}function eF(e){if(!eT(e)&&null!==e&&""!==e)return parseFloat(e)}function eV(e){if(!eT(e)&&null!==e&&""!==e){let t=1e3*parseFloat("0."+e);return Math.floor(t)}}function eJ(e,t,r=!1){let n=10**t;return(r?Math.trunc:Math.round)(e*n)/n}function eG(e){return e%4==0&&(e%100!=0||e%400==0)}function e$(e){return eG(e)?366:365}function eY(e,t){var r;let n=(r=t-1)-12*Math.floor(r/12)+1;return 2===n?eG(e+(t-n)/12)?29:28:[31,null,31,30,31,30,31,31,30,31,30,31][n-1]}function eB(e){let t=Date.UTC(e.year,e.month-1,e.day,e.hour,e.minute,e.second,e.millisecond);return e.year<100&&e.year>=0&&(t=new Date(t)).setUTCFullYear(e.year,e.month-1,e.day),+t}function ez(e,t,r){let n=ev(eb(e,1,t),r);return-n+t-1}function eH(e,t=4,r=1){let n=ez(e,t,r),i=ez(e+1,t,r);return(e$(e)-n+i)/7}function eW(e){return e>99?e:e>ep.twoDigitCutoffYear?1900+e:2e3+e}function eq(e,t,r,n=null){let i=new Date(e),s={hourCycle:"h23",year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"};n&&(s.timeZone=n);let a={timeZoneName:t,...s},o=new Intl.DateTimeFormat(r,a).formatToParts(i).find(e=>"timezonename"===e.type.toLowerCase());return o?o.value:null}function eU(e,t){let r=parseInt(e,10);Number.isNaN(r)&&(r=0);let n=parseInt(t,10)||0,i=r<0||Object.is(r,-0)?-n:n;return 60*r+i}function eQ(e){let t=Number(e);if("boolean"==typeof e||""===e||Number.isNaN(t))throw new l(`Invalid unit value ${e}`);return t}function eZ(e,t){let r={};for(let n in e)if(eP(e,n)){let i=e[n];if(null==i)continue;r[t(n)]=eQ(i)}return r}function eX(e,t){let r=Math.trunc(Math.abs(e/60)),n=Math.trunc(Math.abs(e%60)),i=e>=0?"+":"-";switch(t){case"short":return`${i}${eN(r,2)}:${eN(n,2)}`;case"narrow":return`${i}${r}${n>0?`:${n}`:""}`;case"techie":return`${i}${eN(r,2)}${eN(n,2)}`;default:throw RangeError(`Value format ${t} is out of range for property format`)}}function e0(e){return["hour","minute","second","millisecond"].reduce((t,r)=>(t[r]=e[r],t),{})}let e1=["January","February","March","April","May","June","July","August","September","October","November","December"],e2=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],e3=["J","F","M","A","M","J","J","A","S","O","N","D"];function e6(e){switch(e){case"narrow":return[...e3];case"short":return[...e2];case"long":return[...e1];case"numeric":return["1","2","3","4","5","6","7","8","9","10","11","12"];case"2-digit":return["01","02","03","04","05","06","07","08","09","10","11","12"];default:return null}}let e4=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],e5=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],e9=["M","T","W","T","F","S","S"];function e8(e){switch(e){case"narrow":return[...e9];case"short":return[...e5];case"long":return[...e4];case"numeric":return["1","2","3","4","5","6","7"];default:return null}}let e7=["AM","PM"],te=["Before Christ","Anno Domini"],tt=["BC","AD"],tr=["B","A"];function tn(e){switch(e){case"narrow":return[...tr];case"short":return[...tt];case"long":return[...te];default:return null}}function ti(e,t){let r="";for(let n of e)n.literal?r+=n.val:r+=t(n.val);return r}let ts={D:p,DD:f,DDD:m,DDDD:g,t:b,tt:S,ttt:v,tttt:E,T:k,TT:K,TTT:w,TTTT:I,f:x,ff:T,fff:_,ffff:O,F:A,FF:j,FFF:C,FFFF:P};class ta{static create(e,t={}){return new ta(e,t)}static parseFormat(e){let t=null,r="",n=!1,i=[];for(let s=0;s<e.length;s++){let a=e.charAt(s);"'"===a?(r.length>0&&i.push({literal:n||/^\s+$/.test(r),val:r}),t=null,r="",n=!n):n?r+=a:a===t?r+=a:(r.length>0&&i.push({literal:/^\s+$/.test(r),val:r}),r=a,t=a)}return r.length>0&&i.push({literal:n||/^\s+$/.test(r),val:r}),i}static macroTokenToFormatOpts(e){return ts[e]}constructor(e,t){this.opts=t,this.loc=e,this.systemLoc=null}formatWithSystemDefault(e,t){null===this.systemLoc&&(this.systemLoc=this.loc.redefaultToSystem());let r=this.systemLoc.dtFormatter(e,{...this.opts,...t});return r.format()}dtFormatter(e,t={}){return this.loc.dtFormatter(e,{...this.opts,...t})}formatDateTime(e,t){return this.dtFormatter(e,t).format()}formatDateTimeParts(e,t){return this.dtFormatter(e,t).formatToParts()}formatInterval(e,t){let r=this.dtFormatter(e.start,t);return r.dtf.formatRange(e.start.toJSDate(),e.end.toJSDate())}resolvedOptions(e,t){return this.dtFormatter(e,t).resolvedOptions()}num(e,t=0){if(this.opts.forceSimple)return eN(e,t);let r={...this.opts};return t>0&&(r.padTo=t),this.loc.numberFormatter(r).format(e)}formatDateTimeFromString(e,t){let r="en"===this.loc.listingMode(),n=this.loc.outputCalendar&&"gregory"!==this.loc.outputCalendar,i=(t,r)=>this.loc.extract(e,t,r),s=t=>e.isOffsetFixed&&0===e.offset&&t.allowZ?"Z":e.isValid?e.zone.formatOffset(e.ts,t.format):"",a=()=>r?e7[e.hour<12?0:1]:i({hour:"numeric",hourCycle:"h12"},"dayperiod"),o=(t,n)=>r?e6(t)[e.month-1]:i(n?{month:t}:{month:t,day:"numeric"},"month"),l=(t,n)=>r?e8(t)[e.weekday-1]:i(n?{weekday:t}:{weekday:t,month:"long",day:"numeric"},"weekday"),u=t=>{let r=ta.macroTokenToFormatOpts(t);return r?this.formatWithSystemDefault(e,r):t},c=t=>r?tn(t)[e.year<0?0:1]:i({era:t},"era");return ti(ta.parseFormat(t),t=>{switch(t){case"S":return this.num(e.millisecond);case"u":case"SSS":return this.num(e.millisecond,3);case"s":return this.num(e.second);case"ss":return this.num(e.second,2);case"uu":return this.num(Math.floor(e.millisecond/10),2);case"uuu":return this.num(Math.floor(e.millisecond/100));case"m":return this.num(e.minute);case"mm":return this.num(e.minute,2);case"h":return this.num(e.hour%12==0?12:e.hour%12);case"hh":return this.num(e.hour%12==0?12:e.hour%12,2);case"H":return this.num(e.hour);case"HH":return this.num(e.hour,2);case"Z":return s({format:"narrow",allowZ:this.opts.allowZ});case"ZZ":return s({format:"short",allowZ:this.opts.allowZ});case"ZZZ":return s({format:"techie",allowZ:this.opts.allowZ});case"ZZZZ":return e.zone.offsetName(e.ts,{format:"short",locale:this.loc.locale});case"ZZZZZ":return e.zone.offsetName(e.ts,{format:"long",locale:this.loc.locale});case"z":return e.zoneName;case"a":return a();case"d":return n?i({day:"numeric"},"day"):this.num(e.day);case"dd":return n?i({day:"2-digit"},"day"):this.num(e.day,2);case"c":case"E":return this.num(e.weekday);case"ccc":return l("short",!0);case"cccc":return l("long",!0);case"ccccc":return l("narrow",!0);case"EEE":return l("short",!1);case"EEEE":return l("long",!1);case"EEEEE":return l("narrow",!1);case"L":return n?i({month:"numeric",day:"numeric"},"month"):this.num(e.month);case"LL":return n?i({month:"2-digit",day:"numeric"},"month"):this.num(e.month,2);case"LLL":return o("short",!0);case"LLLL":return o("long",!0);case"LLLLL":return o("narrow",!0);case"M":return n?i({month:"numeric"},"month"):this.num(e.month);case"MM":return n?i({month:"2-digit"},"month"):this.num(e.month,2);case"MMM":return o("short",!1);case"MMMM":return o("long",!1);case"MMMMM":return o("narrow",!1);case"y":return n?i({year:"numeric"},"year"):this.num(e.year);case"yy":return n?i({year:"2-digit"},"year"):this.num(e.year.toString().slice(-2),2);case"yyyy":return n?i({year:"numeric"},"year"):this.num(e.year,4);case"yyyyyy":return n?i({year:"numeric"},"year"):this.num(e.year,6);case"G":return c("short");case"GG":return c("long");case"GGGGG":return c("narrow");case"kk":return this.num(e.weekYear.toString().slice(-2),2);case"kkkk":return this.num(e.weekYear,4);case"W":return this.num(e.weekNumber);case"WW":return this.num(e.weekNumber,2);case"n":return this.num(e.localWeekNumber);case"nn":return this.num(e.localWeekNumber,2);case"ii":return this.num(e.localWeekYear.toString().slice(-2),2);case"iiii":return this.num(e.localWeekYear,4);case"o":return this.num(e.ordinal);case"ooo":return this.num(e.ordinal,3);case"q":return this.num(e.quarter);case"qq":return this.num(e.quarter,2);case"X":return this.num(Math.floor(e.ts/1e3));case"x":return this.num(e.ts);default:return u(t)}})}formatDurationFromString(e,t){let r=e=>{switch(e[0]){case"S":return"millisecond";case"s":return"second";case"m":return"minute";case"h":return"hour";case"d":return"day";case"w":return"week";case"M":return"month";case"y":return"year";default:return null}},n=ta.parseFormat(t),i=n.reduce((e,{literal:t,val:r})=>t?e:e.concat(r),[]),s=e.shiftTo(...i.map(r).filter(e=>e));return ti(n,e=>{let t=r(e);return t?this.num(s.get(t),e.length):e})}}let to=/[A-Za-z_+-]{1,256}(?::?\/[A-Za-z0-9_+-]{1,256}(?:\/[A-Za-z0-9_+-]{1,256})?)?/;function tl(...e){let t=e.reduce((e,t)=>e+t.source,"");return RegExp(`^${t}$`)}function tu(...e){return t=>e.reduce(([e,r,n],i)=>{let[s,a,o]=i(t,n);return[{...e,...s},a||r,o]},[{},null,1]).slice(0,2)}function tc(e,...t){if(null==e)return[null,null];for(let[r,n]of t){let t=r.exec(e);if(t)return n(t)}return[null,null]}function td(...e){return(t,r)=>{let n;let i={};for(n=0;n<e.length;n++)i[e[n]]=eL(t[r+n]);return[i,null,r+n]}}let th=/(?:(Z)|([+-]\d\d)(?::?(\d\d))?)/,tp=`(?:${th.source}?(?:\\[(${to.source})\\])?)?`,tf=/(\d\d)(?::?(\d\d)(?::?(\d\d)(?:[.,](\d{1,30}))?)?)?/,ty=RegExp(`${tf.source}${tp}`),tm=RegExp(`(?:T${ty.source})?`),tg=td("weekYear","weekNumber","weekDay"),tb=td("year","ordinal"),tS=RegExp(`${tf.source} ?(?:${th.source}|(${to.source}))?`),tv=RegExp(`(?: ${tS.source})?`);function tE(e,t,r){let n=e[t];return eT(n)?r:eL(n)}function tk(e,t){let r={hours:tE(e,t,0),minutes:tE(e,t+1,0),seconds:tE(e,t+2,0),milliseconds:eV(e[t+3])};return[r,null,t+4]}function tK(e,t){let r=!e[t]&&!e[t+1],n=eU(e[t+1],e[t+2]),i=r?null:er.instance(n);return[{},i,t+3]}function tw(e,t){let r=e[t]?J.create(e[t]):null;return[{},r,t+1]}let tI=RegExp(`^T?${tf.source}$`),tx=/^-?P(?:(?:(-?\d{1,20}(?:\.\d{1,20})?)Y)?(?:(-?\d{1,20}(?:\.\d{1,20})?)M)?(?:(-?\d{1,20}(?:\.\d{1,20})?)W)?(?:(-?\d{1,20}(?:\.\d{1,20})?)D)?(?:T(?:(-?\d{1,20}(?:\.\d{1,20})?)H)?(?:(-?\d{1,20}(?:\.\d{1,20})?)M)?(?:(-?\d{1,20})(?:[.,](-?\d{1,20}))?S)?)?)$/;function tA(e){let[t,r,n,i,s,a,o,l,u]=e,c="-"===t[0],d=l&&"-"===l[0],h=(e,t=!1)=>void 0!==e&&(t||e&&c)?-e:e;return[{years:h(eF(r)),months:h(eF(n)),weeks:h(eF(i)),days:h(eF(s)),hours:h(eF(a)),minutes:h(eF(o)),seconds:h(eF(l),"-0"===l),milliseconds:h(eV(u),d)}]}let tT={GMT:0,EDT:-240,EST:-300,CDT:-300,CST:-360,MDT:-360,MST:-420,PDT:-420,PST:-480};function tj(e,t,r,n,i,s,a){let o={year:2===t.length?eW(eL(t)):eL(t),month:e2.indexOf(r)+1,day:eL(n),hour:eL(i),minute:eL(s)};return a&&(o.second=eL(a)),e&&(o.weekday=e.length>3?e4.indexOf(e)+1:e5.indexOf(e)+1),o}let tR=/^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|(?:([+-]\d\d)(\d\d)))$/;function t_(e){let[,t,r,n,i,s,a,o,l,u,c,d]=e,h=tj(t,i,n,r,s,a,o);return[h,new er(l?tT[l]:u?0:eU(c,d))]}let tC=/^(Mon|Tue|Wed|Thu|Fri|Sat|Sun), (\d\d) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{4}) (\d\d):(\d\d):(\d\d) GMT$/,tO=/^(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday), (\d\d)-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-(\d\d) (\d\d):(\d\d):(\d\d) GMT$/,tP=/^(Mon|Tue|Wed|Thu|Fri|Sat|Sun) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) ( \d|\d\d) (\d\d):(\d\d):(\d\d) (\d{4})$/;function tD(e){let[,t,r,n,i,s,a,o]=e,l=tj(t,i,n,r,s,a,o);return[l,er.utcInstance]}function tM(e){let[,t,r,n,i,s,a,o]=e,l=tj(t,o,r,n,i,s,a);return[l,er.utcInstance]}let tN=tl(/([+-]\d{6}|\d{4})(?:-?(\d\d)(?:-?(\d\d))?)?/,tm),tL=tl(/(\d{4})-?W(\d\d)(?:-?(\d))?/,tm),tF=tl(/(\d{4})-?(\d{3})/,tm),tV=tl(ty),tJ=tu(function(e,t){let r={year:tE(e,t),month:tE(e,t+1,1),day:tE(e,t+2,1)};return[r,null,t+3]},tk,tK,tw),tG=tu(tg,tk,tK,tw),t$=tu(tb,tk,tK,tw),tY=tu(tk,tK,tw),tB=tu(tk),tz=tl(/(\d{4})-(\d\d)-(\d\d)/,tv),tH=tl(tS),tW=tu(tk,tK,tw),tq="Invalid Duration",tU={weeks:{days:7,hours:168,minutes:10080,seconds:604800,milliseconds:6048e5},days:{hours:24,minutes:1440,seconds:86400,milliseconds:864e5},hours:{minutes:60,seconds:3600,milliseconds:36e5},minutes:{seconds:60,milliseconds:6e4},seconds:{milliseconds:1e3}},tQ={years:{quarters:4,months:12,weeks:52,days:365,hours:8760,minutes:525600,seconds:31536e3,milliseconds:31536e6},quarters:{months:3,weeks:13,days:91,hours:2184,minutes:131040,seconds:7862400,milliseconds:78624e5},months:{weeks:4,days:30,hours:720,minutes:43200,seconds:2592e3,milliseconds:2592e6},...tU},tZ={years:{quarters:4,months:12,weeks:52.1775,days:365.2425,hours:8765.82,minutes:525949.2,seconds:31556952,milliseconds:31556952e3},quarters:{months:3,weeks:13.044375,days:91.310625,hours:2191.455,minutes:131487.3,seconds:7889238,milliseconds:7889238e3},months:{weeks:30.436875/7,days:30.436875,hours:730.485,minutes:43829.1,seconds:2629746,milliseconds:2629746e3},...tU},tX=["years","quarters","months","weeks","days","hours","minutes","seconds","milliseconds"],t0=tX.slice(0).reverse();function t1(e,t,r=!1){let n={values:r?t.values:{...e.values,...t.values||{}},loc:e.loc.clone(t.loc),conversionAccuracy:t.conversionAccuracy||e.conversionAccuracy,matrix:t.matrix||e.matrix};return new t6(n)}function t2(e,t){var r;let n=null!=(r=t.milliseconds)?r:0;for(let r of t0.slice(1))t[r]&&(n+=t[r]*e[r].milliseconds);return n}function t3(e,t){let r=0>t2(e,t)?-1:1;tX.reduceRight((n,i)=>{if(eT(t[i]))return n;if(n){let s=t[n]*r,a=e[i][n],o=Math.floor(s/a);t[i]+=o*r,t[n]-=o*a*r}return i},null),tX.reduce((r,n)=>{if(eT(t[n]))return r;if(r){let i=t[r]%1;t[r]-=i,t[n]+=i*e[r][n]}return n},null)}class t6{constructor(e){let t="longterm"===e.conversionAccuracy,r=t?tZ:tQ;e.matrix&&(r=e.matrix),this.values=e.values,this.loc=e.loc||ee.create(),this.conversionAccuracy=t?"longterm":"casual",this.invalid=e.invalid||null,this.matrix=r,this.isLuxonDuration=!0}static fromMillis(e,t){return t6.fromObject({milliseconds:e},t)}static fromObject(e,t={}){if(null==e||"object"!=typeof e)throw new l(`Duration.fromObject: argument expected to be an object, got ${null===e?"null":typeof e}`);return new t6({values:eZ(e,t6.normalizeUnit),loc:ee.fromObject(t),conversionAccuracy:t.conversionAccuracy,matrix:t.matrix})}static fromDurationLike(e){if(ej(e))return t6.fromMillis(e);if(t6.isDuration(e))return e;if("object"==typeof e)return t6.fromObject(e);throw new l(`Unknown duration argument ${e} of type ${typeof e}`)}static fromISO(e,t){let[r]=tc(e,[tx,tA]);return r?t6.fromObject(r,t):t6.invalid("unparsable",`the input "${e}" can't be parsed as ISO 8601`)}static fromISOTime(e,t){let[r]=tc(e,[tI,tB]);return r?t6.fromObject(r,t):t6.invalid("unparsable",`the input "${e}" can't be parsed as ISO 8601`)}static invalid(e,t=null){if(!e)throw new l("need to specify a reason the Duration is invalid");let r=e instanceof ef?e:new ef(e,t);if(!ep.throwOnInvalid)return new t6({invalid:r});throw new s(r)}static normalizeUnit(e){let t={year:"years",years:"years",quarter:"quarters",quarters:"quarters",month:"months",months:"months",week:"weeks",weeks:"weeks",day:"days",days:"days",hour:"hours",hours:"hours",minute:"minutes",minutes:"minutes",second:"seconds",seconds:"seconds",millisecond:"milliseconds",milliseconds:"milliseconds"}[e?e.toLowerCase():e];if(!t)throw new o(e);return t}static isDuration(e){return e&&e.isLuxonDuration||!1}get locale(){return this.isValid?this.loc.locale:null}get numberingSystem(){return this.isValid?this.loc.numberingSystem:null}toFormat(e,t={}){let r={...t,floor:!1!==t.round&&!1!==t.floor};return this.isValid?ta.create(this.loc,r).formatDurationFromString(this,e):tq}toHuman(e={}){if(!this.isValid)return tq;let t=tX.map(t=>{let r=this.values[t];return eT(r)?null:this.loc.numberFormatter({style:"unit",unitDisplay:"long",...e,unit:t.slice(0,-1)}).format(r)}).filter(e=>e);return this.loc.listFormatter({type:"conjunction",style:e.listStyle||"narrow",...e}).format(t)}toObject(){return this.isValid?{...this.values}:{}}toISO(){if(!this.isValid)return null;let e="P";return 0!==this.years&&(e+=this.years+"Y"),(0!==this.months||0!==this.quarters)&&(e+=this.months+3*this.quarters+"M"),0!==this.weeks&&(e+=this.weeks+"W"),0!==this.days&&(e+=this.days+"D"),(0!==this.hours||0!==this.minutes||0!==this.seconds||0!==this.milliseconds)&&(e+="T"),0!==this.hours&&(e+=this.hours+"H"),0!==this.minutes&&(e+=this.minutes+"M"),(0!==this.seconds||0!==this.milliseconds)&&(e+=eJ(this.seconds+this.milliseconds/1e3,3)+"S"),"P"===e&&(e+="T0S"),e}toISOTime(e={}){if(!this.isValid)return null;let t=this.toMillis();if(t<0||t>=864e5)return null;e={suppressMilliseconds:!1,suppressSeconds:!1,includePrefix:!1,format:"extended",...e,includeOffset:!1};let r=rF.fromMillis(t,{zone:"UTC"});return r.toISOTime(e)}toJSON(){return this.toISO()}toString(){return this.toISO()}[Symbol.for("nodejs.util.inspect.custom")](){return this.isValid?`Duration { values: ${JSON.stringify(this.values)} }`:`Duration { Invalid, reason: ${this.invalidReason} }`}toMillis(){return this.isValid?t2(this.matrix,this.values):NaN}valueOf(){return this.toMillis()}plus(e){if(!this.isValid)return this;let t=t6.fromDurationLike(e),r={};for(let e of tX)(eP(t.values,e)||eP(this.values,e))&&(r[e]=t.get(e)+this.get(e));return t1(this,{values:r},!0)}minus(e){if(!this.isValid)return this;let t=t6.fromDurationLike(e);return this.plus(t.negate())}mapUnits(e){if(!this.isValid)return this;let t={};for(let r of Object.keys(this.values))t[r]=eQ(e(this.values[r],r));return t1(this,{values:t},!0)}get(e){return this[t6.normalizeUnit(e)]}set(e){if(!this.isValid)return this;let t={...this.values,...eZ(e,t6.normalizeUnit)};return t1(this,{values:t})}reconfigure({locale:e,numberingSystem:t,conversionAccuracy:r,matrix:n}={}){let i=this.loc.clone({locale:e,numberingSystem:t});return t1(this,{loc:i,matrix:n,conversionAccuracy:r})}as(e){return this.isValid?this.shiftTo(e).get(e):NaN}normalize(){if(!this.isValid)return this;let e=this.toObject();return t3(this.matrix,e),t1(this,{values:e},!0)}rescale(){if(!this.isValid)return this;let e=function(e){let t={};for(let[r,n]of Object.entries(e))0!==n&&(t[r]=n);return t}(this.normalize().shiftToAll().toObject());return t1(this,{values:e},!0)}shiftTo(...e){let t;if(!this.isValid||0===e.length)return this;e=e.map(e=>t6.normalizeUnit(e));let r={},n={},i=this.toObject();for(let s of tX)if(e.indexOf(s)>=0){t=s;let e=0;for(let t in n)e+=this.matrix[t][s]*n[t],n[t]=0;ej(i[s])&&(e+=i[s]);let a=Math.trunc(e);r[s]=a,n[s]=(1e3*e-1e3*a)/1e3}else ej(i[s])&&(n[s]=i[s]);for(let e in n)0!==n[e]&&(r[t]+=e===t?n[e]:n[e]/this.matrix[t][e]);return t3(this.matrix,r),t1(this,{values:r},!0)}shiftToAll(){return this.isValid?this.shiftTo("years","months","weeks","days","hours","minutes","seconds","milliseconds"):this}negate(){if(!this.isValid)return this;let e={};for(let t of Object.keys(this.values))e[t]=0===this.values[t]?0:-this.values[t];return t1(this,{values:e},!0)}get years(){return this.isValid?this.values.years||0:NaN}get quarters(){return this.isValid?this.values.quarters||0:NaN}get months(){return this.isValid?this.values.months||0:NaN}get weeks(){return this.isValid?this.values.weeks||0:NaN}get days(){return this.isValid?this.values.days||0:NaN}get hours(){return this.isValid?this.values.hours||0:NaN}get minutes(){return this.isValid?this.values.minutes||0:NaN}get seconds(){return this.isValid?this.values.seconds||0:NaN}get milliseconds(){return this.isValid?this.values.milliseconds||0:NaN}get isValid(){return null===this.invalid}get invalidReason(){return this.invalid?this.invalid.reason:null}get invalidExplanation(){return this.invalid?this.invalid.explanation:null}equals(e){if(!this.isValid||!e.isValid||!this.loc.equals(e.loc))return!1;for(let n of tX){var t,r;if(t=this.values[n],r=e.values[n],void 0===t||0===t?void 0!==r&&0!==r:t!==r)return!1}return!0}}let t4="Invalid Interval";class t5{constructor(e){this.s=e.start,this.e=e.end,this.invalid=e.invalid||null,this.isLuxonInterval=!0}static invalid(e,t=null){if(!e)throw new l("need to specify a reason the Interval is invalid");let r=e instanceof ef?e:new ef(e,t);if(!ep.throwOnInvalid)return new t5({invalid:r});throw new i(r)}static fromDateTimes(e,t){let r=rV(e),n=rV(t),i=r&&r.isValid?n&&n.isValid?n<r?t5.invalid("end before start",`The end of an interval must be after its start, but you had start=${r.toISO()} and end=${n.toISO()}`):null:t5.invalid("missing or invalid end"):t5.invalid("missing or invalid start");return null==i?new t5({start:r,end:n}):i}static after(e,t){let r=t6.fromDurationLike(t),n=rV(e);return t5.fromDateTimes(n,n.plus(r))}static before(e,t){let r=t6.fromDurationLike(t),n=rV(e);return t5.fromDateTimes(n.minus(r),n)}static fromISO(e,t){let[r,n]=(e||"").split("/",2);if(r&&n){let e,i,s,a;try{i=(e=rF.fromISO(r,t)).isValid}catch(e){i=!1}try{a=(s=rF.fromISO(n,t)).isValid}catch(e){a=!1}if(i&&a)return t5.fromDateTimes(e,s);if(i){let r=t6.fromISO(n,t);if(r.isValid)return t5.after(e,r)}else if(a){let e=t6.fromISO(r,t);if(e.isValid)return t5.before(s,e)}}return t5.invalid("unparsable",`the input "${e}" can't be parsed as ISO 8601`)}static isInterval(e){return e&&e.isLuxonInterval||!1}get start(){return this.isValid?this.s:null}get end(){return this.isValid?this.e:null}get isValid(){return null===this.invalidReason}get invalidReason(){return this.invalid?this.invalid.reason:null}get invalidExplanation(){return this.invalid?this.invalid.explanation:null}length(e="milliseconds"){return this.isValid?this.toDuration(...[e]).get(e):NaN}count(e="milliseconds",t){let r;if(!this.isValid)return NaN;let n=this.start.startOf(e,t);return Math.floor((r=(r=null!=t&&t.useLocaleWeeks?this.end.reconfigure({locale:n.locale}):this.end).startOf(e,t)).diff(n,e).get(e))+(r.valueOf()!==this.end.valueOf())}hasSame(e){return!!this.isValid&&(this.isEmpty()||this.e.minus(1).hasSame(this.s,e))}isEmpty(){return this.s.valueOf()===this.e.valueOf()}isAfter(e){return!!this.isValid&&this.s>e}isBefore(e){return!!this.isValid&&this.e<=e}contains(e){return!!this.isValid&&this.s<=e&&this.e>e}set({start:e,end:t}={}){return this.isValid?t5.fromDateTimes(e||this.s,t||this.e):this}splitAt(...e){if(!this.isValid)return[];let t=e.map(rV).filter(e=>this.contains(e)).sort((e,t)=>e.toMillis()-t.toMillis()),r=[],{s:n}=this,i=0;for(;n<this.e;){let e=t[i]||this.e,s=+e>+this.e?this.e:e;r.push(t5.fromDateTimes(n,s)),n=s,i+=1}return r}splitBy(e){let t=t6.fromDurationLike(e);if(!this.isValid||!t.isValid||0===t.as("milliseconds"))return[];let{s:r}=this,n=1,i,s=[];for(;r<this.e;){let e=this.start.plus(t.mapUnits(e=>e*n));i=+e>+this.e?this.e:e,s.push(t5.fromDateTimes(r,i)),r=i,n+=1}return s}divideEqually(e){return this.isValid?this.splitBy(this.length()/e).slice(0,e):[]}overlaps(e){return this.e>e.s&&this.s<e.e}abutsStart(e){return!!this.isValid&&+this.e==+e.s}abutsEnd(e){return!!this.isValid&&+e.e==+this.s}engulfs(e){return!!this.isValid&&this.s<=e.s&&this.e>=e.e}equals(e){return!!this.isValid&&!!e.isValid&&this.s.equals(e.s)&&this.e.equals(e.e)}intersection(e){if(!this.isValid)return this;let t=this.s>e.s?this.s:e.s,r=this.e<e.e?this.e:e.e;return t>=r?null:t5.fromDateTimes(t,r)}union(e){if(!this.isValid)return this;let t=this.s<e.s?this.s:e.s,r=this.e>e.e?this.e:e.e;return t5.fromDateTimes(t,r)}static merge(e){let[t,r]=e.sort((e,t)=>e.s-t.s).reduce(([e,t],r)=>t?t.overlaps(r)||t.abutsStart(r)?[e,t.union(r)]:[e.concat([t]),r]:[e,r],[[],null]);return r&&t.push(r),t}static xor(e){let t=null,r=0,n=[],i=e.map(e=>[{time:e.s,type:"s"},{time:e.e,type:"e"}]),s=Array.prototype.concat(...i),a=s.sort((e,t)=>e.time-t.time);for(let e of a)1===(r+="s"===e.type?1:-1)?t=e.time:(t&&+t!=+e.time&&n.push(t5.fromDateTimes(t,e.time)),t=null);return t5.merge(n)}difference(...e){return t5.xor([this].concat(e)).map(e=>this.intersection(e)).filter(e=>e&&!e.isEmpty())}toString(){return this.isValid?`[${this.s.toISO()} – ${this.e.toISO()})`:t4}[Symbol.for("nodejs.util.inspect.custom")](){return this.isValid?`Interval { start: ${this.s.toISO()}, end: ${this.e.toISO()} }`:`Interval { Invalid, reason: ${this.invalidReason} }`}toLocaleString(e=p,t={}){return this.isValid?ta.create(this.s.loc.clone(t),e).formatInterval(this):t4}toISO(e){return this.isValid?`${this.s.toISO(e)}/${this.e.toISO(e)}`:t4}toISODate(){return this.isValid?`${this.s.toISODate()}/${this.e.toISODate()}`:t4}toISOTime(e){return this.isValid?`${this.s.toISOTime(e)}/${this.e.toISOTime(e)}`:t4}toFormat(e,{separator:t=" – "}={}){return this.isValid?`${this.s.toFormat(e)}${t}${this.e.toFormat(e)}`:t4}toDuration(e,t){return this.isValid?this.e.diff(this.s,e,t):t6.invalid(this.invalidReason)}mapEndpoints(e){return t5.fromDateTimes(e(this.s),e(this.e))}}class t9{static hasDST(e=ep.defaultZone){let t=rF.now().setZone(e).set({month:12});return!e.isUniversal&&t.offset!==t.set({month:6}).offset}static isValidIANAZone(e){return J.isValidZone(e)}static normalizeZone(e){return ei(e,ep.defaultZone)}static getStartOfWeek({locale:e=null,locObj:t=null}={}){return(t||ee.create(e)).getStartOfWeek()}static getMinimumDaysInFirstWeek({locale:e=null,locObj:t=null}={}){return(t||ee.create(e)).getMinDaysInFirstWeek()}static getWeekendWeekdays({locale:e=null,locObj:t=null}={}){return(t||ee.create(e)).getWeekendDays().slice()}static months(e="long",{locale:t=null,numberingSystem:r=null,locObj:n=null,outputCalendar:i="gregory"}={}){return(n||ee.create(t,r,i)).months(e)}static monthsFormat(e="long",{locale:t=null,numberingSystem:r=null,locObj:n=null,outputCalendar:i="gregory"}={}){return(n||ee.create(t,r,i)).months(e,!0)}static weekdays(e="long",{locale:t=null,numberingSystem:r=null,locObj:n=null}={}){return(n||ee.create(t,r,null)).weekdays(e)}static weekdaysFormat(e="long",{locale:t=null,numberingSystem:r=null,locObj:n=null}={}){return(n||ee.create(t,r,null)).weekdays(e,!0)}static meridiems({locale:e=null}={}){return ee.create(e).meridiems()}static eras(e="short",{locale:t=null}={}){return ee.create(t,null,"gregory").eras(e)}static features(){return{relative:e_(),localeWeek:eC()}}}function t8(e,t){let r=e=>e.toUTC(0,{keepLocalTime:!0}).startOf("day").valueOf(),n=r(t)-r(e);return Math.floor(t6.fromMillis(n).as("days"))}let t7={arab:"[٠-٩]",arabext:"[۰-۹]",bali:"[᭐-᭙]",beng:"[০-৯]",deva:"[०-९]",fullwide:"[０-９]",gujr:"[૦-૯]",hanidec:"[〇|一|二|三|四|五|六|七|八|九]",khmr:"[០-៩]",knda:"[೦-೯]",laoo:"[໐-໙]",limb:"[᥆-᥏]",mlym:"[൦-൯]",mong:"[᠐-᠙]",mymr:"[၀-၉]",orya:"[୦-୯]",tamldec:"[௦-௯]",telu:"[౦-౯]",thai:"[๐-๙]",tibt:"[༠-༩]",latn:"\\d"},re={arab:[1632,1641],arabext:[1776,1785],bali:[6992,7001],beng:[2534,2543],deva:[2406,2415],fullwide:[65296,65303],gujr:[2790,2799],khmr:[6112,6121],knda:[3302,3311],laoo:[3792,3801],limb:[6470,6479],mlym:[3430,3439],mong:[6160,6169],mymr:[4160,4169],orya:[2918,2927],tamldec:[3046,3055],telu:[3174,3183],thai:[3664,3673],tibt:[3872,3881]},rt=t7.hanidec.replace(/[\[|\]]/g,"").split("");function rr({numberingSystem:e},t=""){return RegExp(`${t7[e||"latn"]}${t}`)}function rn(e,t=e=>e){return{regex:e,deser:([e])=>t(function(e){let t=parseInt(e,10);if(!isNaN(t))return t;t="";for(let r=0;r<e.length;r++){let n=e.charCodeAt(r);if(-1!==e[r].search(t7.hanidec))t+=rt.indexOf(e[r]);else for(let e in re){let[r,i]=re[e];n>=r&&n<=i&&(t+=n-r)}}return parseInt(t,10)}(e))}}let ri=String.fromCharCode(160),rs=`[ ${ri}]`,ra=RegExp(rs,"g");function ro(e){return e.replace(/\./g,"\\.?").replace(ra,rs)}function rl(e){return e.replace(/\./g,"").replace(ra," ").toLowerCase()}function ru(e,t){return null===e?null:{regex:RegExp(e.map(ro).join("|")),deser:([r])=>e.findIndex(e=>rl(r)===rl(e))+t}}function rc(e,t){return{regex:e,deser:([,e,t])=>eU(e,t),groups:t}}function rd(e){return{regex:e,deser:([e])=>e}}let rh={year:{"2-digit":"yy",numeric:"yyyyy"},month:{numeric:"M","2-digit":"MM",short:"MMM",long:"MMMM"},day:{numeric:"d","2-digit":"dd"},weekday:{short:"EEE",long:"EEEE"},dayperiod:"a",dayPeriod:"a",hour12:{numeric:"h","2-digit":"hh"},hour24:{numeric:"H","2-digit":"HH"},minute:{numeric:"m","2-digit":"mm"},second:{numeric:"s","2-digit":"ss"},timeZoneName:{long:"ZZZZZ",short:"ZZZ"}},rp=null;function rf(e,t){return Array.prototype.concat(...e.map(e=>(function(e,t){if(e.literal)return e;let r=ta.macroTokenToFormatOpts(e.val),n=rm(r,t);return null==n||n.includes(void 0)?e:n})(e,t)))}function ry(e,t,r){let n=rf(ta.parseFormat(r),e),i=n.map(t=>(function(e,t){let r=rr(t),n=rr(t,"{2}"),i=rr(t,"{3}"),s=rr(t,"{4}"),a=rr(t,"{6}"),o=rr(t,"{1,2}"),l=rr(t,"{1,3}"),u=rr(t,"{1,6}"),c=rr(t,"{1,9}"),d=rr(t,"{2,4}"),h=rr(t,"{4,6}"),p=e=>({regex:RegExp(e.val.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")),deser:([e])=>e,literal:!0}),f=(f=>{if(e.literal)return p(f);switch(f.val){case"G":return ru(t.eras("short"),0);case"GG":return ru(t.eras("long"),0);case"y":return rn(u);case"yy":case"kk":return rn(d,eW);case"yyyy":case"kkkk":return rn(s);case"yyyyy":return rn(h);case"yyyyyy":return rn(a);case"M":case"L":case"d":case"H":case"h":case"m":case"q":case"s":case"W":return rn(o);case"MM":case"LL":case"dd":case"HH":case"hh":case"mm":case"qq":case"ss":case"WW":return rn(n);case"MMM":return ru(t.months("short",!0),1);case"MMMM":return ru(t.months("long",!0),1);case"LLL":return ru(t.months("short",!1),1);case"LLLL":return ru(t.months("long",!1),1);case"o":case"S":return rn(l);case"ooo":case"SSS":return rn(i);case"u":return rd(c);case"uu":return rd(o);case"uuu":case"E":case"c":return rn(r);case"a":return ru(t.meridiems(),0);case"EEE":return ru(t.weekdays("short",!1),1);case"EEEE":return ru(t.weekdays("long",!1),1);case"ccc":return ru(t.weekdays("short",!0),1);case"cccc":return ru(t.weekdays("long",!0),1);case"Z":case"ZZ":return rc(RegExp(`([+-]${o.source})(?::(${n.source}))?`),2);case"ZZZ":return rc(RegExp(`([+-]${o.source})(${n.source})?`),2);case"z":return rd(/[a-z_+-/]{1,256}?/i);case" ":return rd(/[^\S\n\r]/);default:return p(f)}})(e)||{invalidReason:"missing Intl.DateTimeFormat.formatToParts support"};return f.token=e,f})(t,e)),s=i.find(e=>e.invalidReason);if(s)return{input:t,tokens:n,invalidReason:s.invalidReason};{let[e,r]=function(e){let t=e.map(e=>e.regex).reduce((e,t)=>`${e}(${t.source})`,"");return[`^${t}$`,e]}(i),s=RegExp(e,"i"),[o,l]=function(e,t,r){let n=e.match(t);if(!n)return[n,{}];{let e={},t=1;for(let i in r)if(eP(r,i)){let s=r[i],a=s.groups?s.groups+1:1;!s.literal&&s.token&&(e[s.token.val[0]]=s.deser(n.slice(t,t+a))),t+=a}return[n,e]}}(t,s,r),[u,c,d]=l?function(e){let t;let r=e=>{switch(e){case"S":return"millisecond";case"s":return"second";case"m":return"minute";case"h":case"H":return"hour";case"d":return"day";case"o":return"ordinal";case"L":case"M":return"month";case"y":return"year";case"E":case"c":return"weekday";case"W":return"weekNumber";case"k":return"weekYear";case"q":return"quarter";default:return null}},n=null;eT(e.z)||(n=J.create(e.z)),eT(e.Z)||(n||(n=new er(e.Z)),t=e.Z),eT(e.q)||(e.M=(e.q-1)*3+1),eT(e.h)||(e.h<12&&1===e.a?e.h+=12:12!==e.h||0!==e.a||(e.h=0)),0===e.G&&e.y&&(e.y=-e.y),eT(e.u)||(e.S=eV(e.u));let i=Object.keys(e).reduce((t,n)=>{let i=r(n);return i&&(t[i]=e[n]),t},{});return[i,n,t]}(l):[null,null,void 0];if(eP(l,"a")&&eP(l,"H"))throw new a("Can't include meridiem when specifying 24-hour format");return{input:t,tokens:n,regex:s,rawMatches:o,matches:l,result:u,zone:c,specificOffset:d}}}function rm(e,t){if(!e)return null;let r=ta.create(t,e),n=r.dtFormatter((rp||(rp=rF.fromMillis(1555555555555)),rp)),i=n.formatToParts(),s=n.resolvedOptions();return i.map(t=>(function(e,t,r){let{type:n,value:i}=e;if("literal"===n){let e=/^\s+$/.test(i);return{literal:!e,val:e?" ":i}}let s=t[n],a=n;"hour"===n&&(a=null!=t.hour12?t.hour12?"hour12":"hour24":null!=t.hourCycle?"h11"===t.hourCycle||"h12"===t.hourCycle?"hour12":"hour24":r.hour12?"hour12":"hour24");let o=rh[a];if("object"==typeof o&&(o=o[s]),o)return{literal:!1,val:o}})(t,e,s))}let rg="Invalid DateTime";function rb(e){return new ef("unsupported zone",`the zone "${e.name}" is not supported`)}function rS(e){return null===e.weekData&&(e.weekData=eE(e.c)),e.weekData}function rv(e){return null===e.localWeekData&&(e.localWeekData=eE(e.c,e.loc.getMinDaysInFirstWeek(),e.loc.getStartOfWeek())),e.localWeekData}function rE(e,t){let r={ts:e.ts,zone:e.zone,c:e.c,o:e.o,loc:e.loc,invalid:e.invalid};return new rF({...r,...t,old:r})}function rk(e,t,r){let n=e-6e4*t,i=r.offset(n);if(t===i)return[n,t];n-=(i-t)*6e4;let s=r.offset(n);return i===s?[n,i]:[e-6e4*Math.min(i,s),Math.max(i,s)]}function rK(e,t){e+=6e4*t;let r=new Date(e);return{year:r.getUTCFullYear(),month:r.getUTCMonth()+1,day:r.getUTCDate(),hour:r.getUTCHours(),minute:r.getUTCMinutes(),second:r.getUTCSeconds(),millisecond:r.getUTCMilliseconds()}}function rw(e,t){let r=e.o,n=e.c.year+Math.trunc(t.years),i=e.c.month+Math.trunc(t.months)+3*Math.trunc(t.quarters),s={...e.c,year:n,month:i,day:Math.min(e.c.day,eY(n,i))+Math.trunc(t.days)+7*Math.trunc(t.weeks)},a=t6.fromObject({years:t.years-Math.trunc(t.years),quarters:t.quarters-Math.trunc(t.quarters),months:t.months-Math.trunc(t.months),weeks:t.weeks-Math.trunc(t.weeks),days:t.days-Math.trunc(t.days),hours:t.hours,minutes:t.minutes,seconds:t.seconds,milliseconds:t.milliseconds}).as("milliseconds"),o=eB(s),[l,u]=rk(o,r,e.zone);return 0!==a&&(l+=a,u=e.zone.offset(l)),{ts:l,o:u}}function rI(e,t,r,n,i,s){let{setZone:a,zone:o}=r;if((!e||0===Object.keys(e).length)&&!t)return rF.invalid(new ef("unparsable",`the input "${i}" can't be parsed as ${n}`));{let n=rF.fromObject(e,{...r,zone:t||o,specificOffset:s});return a?n:n.setZone(o)}}function rx(e,t,r=!0){return e.isValid?ta.create(ee.create("en-US"),{allowZ:r,forceSimple:!0}).formatDateTimeFromString(e,t):null}function rA(e,t){let r=e.c.year>9999||e.c.year<0,n="";return r&&e.c.year>=0&&(n+="+"),n+=eN(e.c.year,r?6:4),t?n+="-"+eN(e.c.month)+"-"+eN(e.c.day):n+=eN(e.c.month)+eN(e.c.day),n}function rT(e,t,r,n,i,s){let a=eN(e.c.hour);return t?(a+=":"+eN(e.c.minute),0===e.c.millisecond&&0===e.c.second&&r||(a+=":")):a+=eN(e.c.minute),0===e.c.millisecond&&0===e.c.second&&r||(a+=eN(e.c.second),0===e.c.millisecond&&n||(a+="."+eN(e.c.millisecond,3))),i&&(e.isOffsetFixed&&0===e.offset&&!s?a+="Z":e.o<0?a+="-"+eN(Math.trunc(-e.o/60))+":"+eN(Math.trunc(-e.o%60)):a+="+"+eN(Math.trunc(e.o/60))+":"+eN(Math.trunc(e.o%60))),s&&(a+="["+e.zone.ianaName+"]"),a}let rj={month:1,day:1,hour:0,minute:0,second:0,millisecond:0},rR={weekNumber:1,weekday:1,hour:0,minute:0,second:0,millisecond:0},r_={ordinal:1,hour:0,minute:0,second:0,millisecond:0},rC=["year","month","day","hour","minute","second","millisecond"],rO=["weekYear","weekNumber","weekday","hour","minute","second","millisecond"],rP=["year","ordinal","hour","minute","second","millisecond"];function rD(e){switch(e.toLowerCase()){case"localweekday":case"localweekdays":return"localWeekday";case"localweeknumber":case"localweeknumbers":return"localWeekNumber";case"localweekyear":case"localweekyears":return"localWeekYear";default:return function(e){let t={year:"year",years:"year",month:"month",months:"month",day:"day",days:"day",hour:"hour",hours:"hour",minute:"minute",minutes:"minute",quarter:"quarter",quarters:"quarter",second:"second",seconds:"second",millisecond:"millisecond",milliseconds:"millisecond",weekday:"weekday",weekdays:"weekday",weeknumber:"weekNumber",weeksnumber:"weekNumber",weeknumbers:"weekNumber",weekyear:"weekYear",weekyears:"weekYear",ordinal:"ordinal"}[e.toLowerCase()];if(!t)throw new o(e);return t}(e)}}function rM(e,t){let r,n;let i=ei(t.zone,ep.defaultZone),s=ee.fromObject(t),a=ep.now();if(eT(e.year))r=a;else{for(let t of rC)eT(e[t])&&(e[t]=rj[t]);let t=ex(e)||eA(e);if(t)return rF.invalid(t);let s=i.offset(a);[r,n]=rk(eB(e),s,i)}return new rF({ts:r,zone:i,loc:s,o:n})}function rN(e,t,r){let n=!!eT(r.round)||r.round,i=(e,i)=>{e=eJ(e,n||r.calendary?0:2,!0);let s=t.loc.clone(r).relFormatter(r);return s.format(e,i)},s=n=>r.calendary?t.hasSame(e,n)?0:t.startOf(n).diff(e.startOf(n),n).get(n):t.diff(e,n).get(n);if(r.unit)return i(s(r.unit),r.unit);for(let e of r.units){let t=s(e);if(Math.abs(t)>=1)return i(t,e)}return i(e>t?-0:0,r.units[r.units.length-1])}function rL(e){let t={},r;return e.length>0&&"object"==typeof e[e.length-1]?(t=e[e.length-1],r=Array.from(e).slice(0,e.length-1)):r=Array.from(e),[t,r]}class rF{constructor(e){let t=e.zone||ep.defaultZone,r=e.invalid||(Number.isNaN(e.ts)?new ef("invalid input"):null)||(t.isValid?null:rb(t));this.ts=eT(e.ts)?ep.now():e.ts;let n=null,i=null;if(!r){let s=e.old&&e.old.ts===this.ts&&e.old.zone.equals(t);if(s)[n,i]=[e.old.c,e.old.o];else{let e=t.offset(this.ts);n=(r=Number.isNaN((n=rK(this.ts,e)).year)?new ef("invalid input"):null)?null:n,i=r?null:e}}this._zone=t,this.loc=e.loc||ee.create(),this.invalid=r,this.weekData=null,this.localWeekData=null,this.c=n,this.o=i,this.isLuxonDateTime=!0}static now(){return new rF({})}static local(){let[e,t]=rL(arguments),[r,n,i,s,a,o,l]=t;return rM({year:r,month:n,day:i,hour:s,minute:a,second:o,millisecond:l},e)}static utc(){let[e,t]=rL(arguments),[r,n,i,s,a,o,l]=t;return e.zone=er.utcInstance,rM({year:r,month:n,day:i,hour:s,minute:a,second:o,millisecond:l},e)}static fromJSDate(e,t={}){let r="[object Date]"===Object.prototype.toString.call(e)?e.valueOf():NaN;if(Number.isNaN(r))return rF.invalid("invalid input");let n=ei(t.zone,ep.defaultZone);return n.isValid?new rF({ts:r,zone:n,loc:ee.fromObject(t)}):rF.invalid(rb(n))}static fromMillis(e,t={}){if(ej(e))return e<-864e13||e>864e13?rF.invalid("Timestamp out of range"):new rF({ts:e,zone:ei(t.zone,ep.defaultZone),loc:ee.fromObject(t)});throw new l(`fromMillis requires a numerical input, but received a ${typeof e} with value ${e}`)}static fromSeconds(e,t={}){if(ej(e))return new rF({ts:1e3*e,zone:ei(t.zone,ep.defaultZone),loc:ee.fromObject(t)});throw new l("fromSeconds requires a numerical input")}static fromObject(e,t={}){e=e||{};let r=ei(t.zone,ep.defaultZone);if(!r.isValid)return rF.invalid(rb(r));let n=ee.fromObject(t),i=eZ(e,rD),{minDaysInFirstWeek:s,startOfWeek:o}=eI(i,n),l=ep.now(),u=eT(t.specificOffset)?r.offset(l):t.specificOffset,c=!eT(i.ordinal),d=!eT(i.year),h=!eT(i.month)||!eT(i.day),p=d||h,f=i.weekYear||i.weekNumber;if((p||c)&&f)throw new a("Can't mix weekYear/weekNumber units with year/month/day or ordinals");if(h&&c)throw new a("Can't mix ordinal dates with month/day");let y=f||i.weekday&&!p,m,g,b=rK(l,u);y?(m=rO,g=rR,b=eE(b,s,o)):c?(m=rP,g=r_,b=eK(b)):(m=rC,g=rj);let S=!1;for(let e of m){let t=i[e];eT(t)?S?i[e]=g[e]:i[e]=b[e]:S=!0}let v=y?function(e,t=4,r=1){let n=eR(e.weekYear),i=eM(e.weekNumber,1,eH(e.weekYear,t,r)),s=eM(e.weekday,1,7);return n?i?!s&&eg("weekday",e.weekday):eg("week",e.weekNumber):eg("weekYear",e.weekYear)}(i,s,o):c?function(e){let t=eR(e.year),r=eM(e.ordinal,1,e$(e.year));return t?!r&&eg("ordinal",e.ordinal):eg("year",e.year)}(i):ex(i),E=v||eA(i);if(E)return rF.invalid(E);let k=y?ek(i,s,o):c?ew(i):i,[K,w]=rk(eB(k),u,r),I=new rF({ts:K,zone:r,o:w,loc:n});return i.weekday&&p&&e.weekday!==I.weekday?rF.invalid("mismatched weekday",`you can't specify both a weekday of ${i.weekday} and a date of ${I.toISO()}`):I}static fromISO(e,t={}){let[r,n]=tc(e,[tN,tJ],[tL,tG],[tF,t$],[tV,tY]);return rI(r,n,t,"ISO 8601",e)}static fromRFC2822(e,t={}){let[r,n]=tc(e.replace(/\([^()]*\)|[\n\t]/g," ").replace(/(\s\s+)/g," ").trim(),[tR,t_]);return rI(r,n,t,"RFC 2822",e)}static fromHTTP(e,t={}){let[r,n]=tc(e,[tC,tD],[tO,tD],[tP,tM]);return rI(r,n,t,"HTTP",t)}static fromFormat(e,t,r={}){if(eT(e)||eT(t))throw new l("fromFormat requires an input string and a format");let{locale:n=null,numberingSystem:i=null}=r,s=ee.fromOpts({locale:n,numberingSystem:i,defaultToEN:!0}),[a,o,u,c]=function(e,t,r){let{result:n,zone:i,specificOffset:s,invalidReason:a}=ry(e,t,r);return[n,i,s,a]}(s,e,t);return c?rF.invalid(c):rI(a,o,r,`format ${t}`,e,u)}static fromString(e,t,r={}){return rF.fromFormat(e,t,r)}static fromSQL(e,t={}){let[r,n]=tc(e,[tz,tJ],[tH,tW]);return rI(r,n,t,"SQL",e)}static invalid(e,t=null){if(!e)throw new l("need to specify a reason the DateTime is invalid");let r=e instanceof ef?e:new ef(e,t);if(!ep.throwOnInvalid)return new rF({invalid:r});throw new n(r)}static isDateTime(e){return e&&e.isLuxonDateTime||!1}static parseFormatForOpts(e,t={}){let r=rm(e,ee.fromObject(t));return r?r.map(e=>e?e.val:null).join(""):null}static expandFormat(e,t={}){let r=rf(ta.parseFormat(e),ee.fromObject(t));return r.map(e=>e.val).join("")}get(e){return this[e]}get isValid(){return null===this.invalid}get invalidReason(){return this.invalid?this.invalid.reason:null}get invalidExplanation(){return this.invalid?this.invalid.explanation:null}get locale(){return this.isValid?this.loc.locale:null}get numberingSystem(){return this.isValid?this.loc.numberingSystem:null}get outputCalendar(){return this.isValid?this.loc.outputCalendar:null}get zone(){return this._zone}get zoneName(){return this.isValid?this.zone.name:null}get year(){return this.isValid?this.c.year:NaN}get quarter(){return this.isValid?Math.ceil(this.c.month/3):NaN}get month(){return this.isValid?this.c.month:NaN}get day(){return this.isValid?this.c.day:NaN}get hour(){return this.isValid?this.c.hour:NaN}get minute(){return this.isValid?this.c.minute:NaN}get second(){return this.isValid?this.c.second:NaN}get millisecond(){return this.isValid?this.c.millisecond:NaN}get weekYear(){return this.isValid?rS(this).weekYear:NaN}get weekNumber(){return this.isValid?rS(this).weekNumber:NaN}get weekday(){return this.isValid?rS(this).weekday:NaN}get isWeekend(){return this.isValid&&this.loc.getWeekendDays().includes(this.weekday)}get localWeekday(){return this.isValid?rv(this).weekday:NaN}get localWeekNumber(){return this.isValid?rv(this).weekNumber:NaN}get localWeekYear(){return this.isValid?rv(this).weekYear:NaN}get ordinal(){return this.isValid?eK(this.c).ordinal:NaN}get monthShort(){return this.isValid?t9.months("short",{locObj:this.loc})[this.month-1]:null}get monthLong(){return this.isValid?t9.months("long",{locObj:this.loc})[this.month-1]:null}get weekdayShort(){return this.isValid?t9.weekdays("short",{locObj:this.loc})[this.weekday-1]:null}get weekdayLong(){return this.isValid?t9.weekdays("long",{locObj:this.loc})[this.weekday-1]:null}get offset(){return this.isValid?+this.o:NaN}get offsetNameShort(){return this.isValid?this.zone.offsetName(this.ts,{format:"short",locale:this.locale}):null}get offsetNameLong(){return this.isValid?this.zone.offsetName(this.ts,{format:"long",locale:this.locale}):null}get isOffsetFixed(){return this.isValid?this.zone.isUniversal:null}get isInDST(){return!this.isOffsetFixed&&(this.offset>this.set({month:1,day:1}).offset||this.offset>this.set({month:5}).offset)}getPossibleOffsets(){if(!this.isValid||this.isOffsetFixed)return[this];let e=eB(this.c),t=this.zone.offset(e-864e5),r=this.zone.offset(e+864e5),n=this.zone.offset(e-6e4*t),i=this.zone.offset(e-6e4*r);if(n===i)return[this];let s=e-6e4*n,a=e-6e4*i,o=rK(s,n),l=rK(a,i);return o.hour===l.hour&&o.minute===l.minute&&o.second===l.second&&o.millisecond===l.millisecond?[rE(this,{ts:s}),rE(this,{ts:a})]:[this]}get isInLeapYear(){return eG(this.year)}get daysInMonth(){return eY(this.year,this.month)}get daysInYear(){return this.isValid?e$(this.year):NaN}get weeksInWeekYear(){return this.isValid?eH(this.weekYear):NaN}get weeksInLocalWeekYear(){return this.isValid?eH(this.localWeekYear,this.loc.getMinDaysInFirstWeek(),this.loc.getStartOfWeek()):NaN}resolvedLocaleOptions(e={}){let{locale:t,numberingSystem:r,calendar:n}=ta.create(this.loc.clone(e),e).resolvedOptions(this);return{locale:t,numberingSystem:r,outputCalendar:n}}toUTC(e=0,t={}){return this.setZone(er.instance(e),t)}toLocal(){return this.setZone(ep.defaultZone)}setZone(e,{keepLocalTime:t=!1,keepCalendarTime:r=!1}={}){if((e=ei(e,ep.defaultZone)).equals(this.zone))return this;if(!e.isValid)return rF.invalid(rb(e));{let i=this.ts;if(t||r){var n;let t=e.offset(this.ts),r=this.toObject();[i]=(n=e,rk(eB(r),t,n))}return rE(this,{ts:i,zone:e})}}reconfigure({locale:e,numberingSystem:t,outputCalendar:r}={}){let n=this.loc.clone({locale:e,numberingSystem:t,outputCalendar:r});return rE(this,{loc:n})}setLocale(e){return this.reconfigure({locale:e})}set(e){var t,r,n;let i;if(!this.isValid)return this;let s=eZ(e,rD),{minDaysInFirstWeek:o,startOfWeek:l}=eI(s,this.loc),u=!eT(s.weekYear)||!eT(s.weekNumber)||!eT(s.weekday),c=!eT(s.ordinal),d=!eT(s.year),h=!eT(s.month)||!eT(s.day),p=s.weekYear||s.weekNumber;if((d||h||c)&&p)throw new a("Can't mix weekYear/weekNumber units with year/month/day or ordinals");if(h&&c)throw new a("Can't mix ordinal dates with month/day");u?i=ek({...eE(this.c,o,l),...s},o,l):eT(s.ordinal)?(i={...this.toObject(),...s},eT(s.day)&&(i.day=Math.min(eY(i.year,i.month),i.day))):i=ew({...eK(this.c),...s});let[f,y]=(t=i,r=this.o,n=this.zone,rk(eB(t),r,n));return rE(this,{ts:f,o:y})}plus(e){if(!this.isValid)return this;let t=t6.fromDurationLike(e);return rE(this,rw(this,t))}minus(e){if(!this.isValid)return this;let t=t6.fromDurationLike(e).negate();return rE(this,rw(this,t))}startOf(e,{useLocaleWeeks:t=!1}={}){if(!this.isValid)return this;let r={},n=t6.normalizeUnit(e);switch(n){case"years":r.month=1;case"quarters":case"months":r.day=1;case"weeks":case"days":r.hour=0;case"hours":r.minute=0;case"minutes":r.second=0;case"seconds":r.millisecond=0}if("weeks"===n){if(t){let e=this.loc.getStartOfWeek(),{weekday:t}=this;t<e&&(r.weekNumber=this.weekNumber-1),r.weekday=e}else r.weekday=1}if("quarters"===n){let e=Math.ceil(this.month/3);r.month=(e-1)*3+1}return this.set(r)}endOf(e,t){return this.isValid?this.plus({[e]:1}).startOf(e,t).minus(1):this}toFormat(e,t={}){return this.isValid?ta.create(this.loc.redefaultToEN(t)).formatDateTimeFromString(this,e):rg}toLocaleString(e=p,t={}){return this.isValid?ta.create(this.loc.clone(t),e).formatDateTime(this):rg}toLocaleParts(e={}){return this.isValid?ta.create(this.loc.clone(e),e).formatDateTimeParts(this):[]}toISO({format:e="extended",suppressSeconds:t=!1,suppressMilliseconds:r=!1,includeOffset:n=!0,extendedZone:i=!1}={}){if(!this.isValid)return null;let s="extended"===e;return rA(this,s)+"T"+rT(this,s,t,r,n,i)}toISODate({format:e="extended"}={}){return this.isValid?rA(this,"extended"===e):null}toISOWeekDate(){return rx(this,"kkkk-'W'WW-c")}toISOTime({suppressMilliseconds:e=!1,suppressSeconds:t=!1,includeOffset:r=!0,includePrefix:n=!1,extendedZone:i=!1,format:s="extended"}={}){return this.isValid?(n?"T":"")+rT(this,"extended"===s,t,e,r,i):null}toRFC2822(){return rx(this,"EEE, dd LLL yyyy HH:mm:ss ZZZ",!1)}toHTTP(){return rx(this.toUTC(),"EEE, dd LLL yyyy HH:mm:ss 'GMT'")}toSQLDate(){return this.isValid?rA(this,!0):null}toSQLTime({includeOffset:e=!0,includeZone:t=!1,includeOffsetSpace:r=!0}={}){let n="HH:mm:ss.SSS";return(t||e)&&(r&&(n+=" "),t?n+="z":e&&(n+="ZZ")),rx(this,n,!0)}toSQL(e={}){return this.isValid?`${this.toSQLDate()} ${this.toSQLTime(e)}`:null}toString(){return this.isValid?this.toISO():rg}[Symbol.for("nodejs.util.inspect.custom")](){return this.isValid?`DateTime { ts: ${this.toISO()}, zone: ${this.zone.name}, locale: ${this.locale} }`:`DateTime { Invalid, reason: ${this.invalidReason} }`}valueOf(){return this.toMillis()}toMillis(){return this.isValid?this.ts:NaN}toSeconds(){return this.isValid?this.ts/1e3:NaN}toUnixInteger(){return this.isValid?Math.floor(this.ts/1e3):NaN}toJSON(){return this.toISO()}toBSON(){return this.toJSDate()}toObject(e={}){if(!this.isValid)return{};let t={...this.c};return e.includeConfig&&(t.outputCalendar=this.outputCalendar,t.numberingSystem=this.loc.numberingSystem,t.locale=this.loc.locale),t}toJSDate(){return new Date(this.isValid?this.ts:NaN)}diff(e,t="milliseconds",r={}){if(!this.isValid||!e.isValid)return t6.invalid("created by diffing an invalid DateTime");let n={locale:this.locale,numberingSystem:this.numberingSystem,...r},i=(Array.isArray(t)?t:[t]).map(t6.normalizeUnit),s=e.valueOf()>this.valueOf(),a=function(e,t,r,n){let[i,s,a,o]=function(e,t,r){let n,i;let s=[["years",(e,t)=>t.year-e.year],["quarters",(e,t)=>t.quarter-e.quarter+(t.year-e.year)*4],["months",(e,t)=>t.month-e.month+(t.year-e.year)*12],["weeks",(e,t)=>{let r=t8(e,t);return(r-r%7)/7}],["days",t8]],a={},o=e;for(let[l,u]of s)r.indexOf(l)>=0&&(n=l,a[l]=u(e,t),(i=o.plus(a))>t?(a[l]--,(e=o.plus(a))>t&&(i=e,a[l]--,e=o.plus(a))):e=i);return[e,a,i,n]}(e,t,r),l=t-i,u=r.filter(e=>["hours","minutes","seconds","milliseconds"].indexOf(e)>=0);0===u.length&&(a<t&&(a=i.plus({[o]:1})),a!==i&&(s[o]=(s[o]||0)+l/(a-i)));let c=t6.fromObject(s,n);return u.length>0?t6.fromMillis(l,n).shiftTo(...u).plus(c):c}(s?this:e,s?e:this,i,n);return s?a.negate():a}diffNow(e="milliseconds",t={}){return this.diff(rF.now(),e,t)}until(e){return this.isValid?t5.fromDateTimes(this,e):this}hasSame(e,t,r){if(!this.isValid)return!1;let n=e.valueOf(),i=this.setZone(e.zone,{keepLocalTime:!0});return i.startOf(t,r)<=n&&n<=i.endOf(t,r)}equals(e){return this.isValid&&e.isValid&&this.valueOf()===e.valueOf()&&this.zone.equals(e.zone)&&this.loc.equals(e.loc)}toRelative(e={}){if(!this.isValid)return null;let t=e.base||rF.fromObject({},{zone:this.zone}),r=e.padding?this<t?-e.padding:e.padding:0,n=["years","months","days","hours","minutes","seconds"],i=e.unit;return Array.isArray(e.unit)&&(n=e.unit,i=void 0),rN(t,this.plus(r),{...e,numeric:"always",units:n,unit:i})}toRelativeCalendar(e={}){return this.isValid?rN(e.base||rF.fromObject({},{zone:this.zone}),this,{...e,numeric:"auto",units:["years","months","days"],calendary:!0}):null}static min(...e){if(!e.every(rF.isDateTime))throw new l("min requires all arguments be DateTimes");return eO(e,e=>e.valueOf(),Math.min)}static max(...e){if(!e.every(rF.isDateTime))throw new l("max requires all arguments be DateTimes");return eO(e,e=>e.valueOf(),Math.max)}static fromFormatExplain(e,t,r={}){let{locale:n=null,numberingSystem:i=null}=r,s=ee.fromOpts({locale:n,numberingSystem:i,defaultToEN:!0});return ry(s,e,t)}static fromStringExplain(e,t,r={}){return rF.fromFormatExplain(e,t,r)}static get DATE_SHORT(){return p}static get DATE_MED(){return f}static get DATE_MED_WITH_WEEKDAY(){return y}static get DATE_FULL(){return m}static get DATE_HUGE(){return g}static get TIME_SIMPLE(){return b}static get TIME_WITH_SECONDS(){return S}static get TIME_WITH_SHORT_OFFSET(){return v}static get TIME_WITH_LONG_OFFSET(){return E}static get TIME_24_SIMPLE(){return k}static get TIME_24_WITH_SECONDS(){return K}static get TIME_24_WITH_SHORT_OFFSET(){return w}static get TIME_24_WITH_LONG_OFFSET(){return I}static get DATETIME_SHORT(){return x}static get DATETIME_SHORT_WITH_SECONDS(){return A}static get DATETIME_MED(){return T}static get DATETIME_MED_WITH_SECONDS(){return j}static get DATETIME_MED_WITH_WEEKDAY(){return R}static get DATETIME_FULL(){return _}static get DATETIME_FULL_WITH_SECONDS(){return C}static get DATETIME_HUGE(){return O}static get DATETIME_HUGE_WITH_SECONDS(){return P}}function rV(e){if(rF.isDateTime(e))return e;if(e&&e.valueOf&&ej(e.valueOf()))return rF.fromJSDate(e);if(e&&"object"==typeof e)return rF.fromObject(e);throw new l(`Unknown datetime argument: ${e}, of type ${typeof e}`)}t.DateTime=rF,t.Duration=t6,t.FixedOffsetZone=er,t.IANAZone=J,t.Info=t9,t.Interval=t5,t.InvalidZone=en,t.Settings=ep,t.SystemZone=N,t.VERSION="3.4.4",t.Zone=D},65684:(e,t,r)=>{let n=r(12781),i=n.PassThrough,s=Array.prototype.slice;e.exports=function(){let e=[],t=s.call(arguments),r=!1,n=t[t.length-1];n&&!Array.isArray(n)&&null==n.pipe?t.pop():n={};let a=!1!==n.end,o=!0===n.pipeError;null==n.objectMode&&(n.objectMode=!0),null==n.highWaterMark&&(n.highWaterMark=65536);let l=i(n);function u(){for(let t=0,r=arguments.length;t<r;t++)e.push(function e(t,r){if(Array.isArray(t))for(let n=0,i=t.length;n<i;n++)t[n]=e(t[n],r);else{if(!t._readableState&&t.pipe&&(t=t.pipe(i(r))),!t._readableState||!t.pause||!t.pipe)throw Error("Only readable stream can be merged.");t.pause()}return t}(arguments[t],n));return function t(){if(r)return;r=!0;let n=e.shift();if(!n){process.nextTick(c);return}Array.isArray(n)||(n=[n]);let i=n.length+1;function s(){--i>0||(r=!1,t())}for(let e=0;e<n.length;e++)!function(e){function t(){e.removeListener("merge2UnpipeEnd",t),e.removeListener("end",t),o&&e.removeListener("error",r),s()}function r(e){l.emit("error",e)}if(e._readableState.endEmitted)return s();e.on("merge2UnpipeEnd",t),e.on("end",t),o&&e.on("error",r),e.pipe(l,{end:!1}),e.resume()}(n[e]);s()}(),this}function c(){r=!1,l.emit("queueDrain"),a&&l.end()}return l.setMaxListeners(0),l.add=u,l.on("unpipe",function(e){e.emit("merge2UnpipeEnd")}),t.length&&u.apply(null,t),l}},26390:(e,t,r)=>{let n=r(73837),i=r(45792),s=r(103),a=r(90966),o=e=>""===e||"./"===e,l=(e,t,r)=>{t=[].concat(t),e=[].concat(e);let n=new Set,i=new Set,a=new Set,o=0,l=e=>{a.add(e.output),r&&r.onResult&&r.onResult(e)};for(let a=0;a<t.length;a++){let u=s(String(t[a]),{...r,onResult:l},!0),c=u.state.negated||u.state.negatedExtglob;for(let t of(c&&o++,e)){let e=u(t,!0);(c?!e.isMatch:e.isMatch)&&(c?n.add(e.output):(n.delete(e.output),i.add(e.output)))}}let u=(o===t.length?[...a]:[...i]).filter(e=>!n.has(e));if(r&&0===u.length){if(!0===r.failglob)throw Error(`No matches found for "${t.join(", ")}"`);if(!0===r.nonull||!0===r.nullglob)return r.unescape?t.map(e=>e.replace(/\\/g,"")):t}return u};l.match=l,l.matcher=(e,t)=>s(e,t),l.isMatch=(e,t,r)=>s(t,r)(e),l.any=l.isMatch,l.not=(e,t,r={})=>{t=[].concat(t).map(String);let n=new Set,i=[],s=new Set(l(e,t,{...r,onResult:e=>{r.onResult&&r.onResult(e),i.push(e.output)}}));for(let e of i)s.has(e)||n.add(e);return[...n]},l.contains=(e,t,r)=>{if("string"!=typeof e)throw TypeError(`Expected a string: "${n.inspect(e)}"`);if(Array.isArray(t))return t.some(t=>l.contains(e,t,r));if("string"==typeof t){if(o(e)||o(t))return!1;if(e.includes(t)||e.startsWith("./")&&e.slice(2).includes(t))return!0}return l.isMatch(e,t,{...r,contains:!0})},l.matchKeys=(e,t,r)=>{if(!a.isObject(e))throw TypeError("Expected the first argument to be an object");let n=l(Object.keys(e),t,r),i={};for(let t of n)i[t]=e[t];return i},l.some=(e,t,r)=>{let n=[].concat(e);for(let e of[].concat(t)){let t=s(String(e),r);if(n.some(e=>t(e)))return!0}return!1},l.every=(e,t,r)=>{let n=[].concat(e);for(let e of[].concat(t)){let t=s(String(e),r);if(!n.every(e=>t(e)))return!1}return!0},l.all=(e,t,r)=>{if("string"!=typeof e)throw TypeError(`Expected a string: "${n.inspect(e)}"`);return[].concat(t).every(t=>s(t,r)(e))},l.capture=(e,t,r)=>{let n=a.isWindows(r),i=s.makeRe(String(e),{...r,capture:!0}).exec(n?a.toPosixSlashes(t):t);if(i)return i.slice(1).map(e=>void 0===e?"":e)},l.makeRe=(...e)=>s.makeRe(...e),l.scan=(...e)=>s.scan(...e),l.parse=(e,t)=>{let r=[];for(let n of[].concat(e||[]))for(let e of i(String(n),t))r.push(s.parse(e,t));return r},l.braces=(e,t)=>{if("string"!=typeof e)throw TypeError("Expected a string");return t&&!0===t.nobrace||!/\{.*\}/.test(e)?[e]:i(e,t)},l.braceExpand=(e,t)=>{if("string"!=typeof e)throw TypeError("Expected a string");return l.braces(e,{...t,expand:!0})},e.exports=l},8605:e=>{function t(e,t,r,n){return Math.round(e/r)+" "+n+(t>=1.5*r?"s":"")}e.exports=function(e,r){r=r||{};var n,i,s=typeof e;if("string"===s&&e.length>0)return function(e){if(!((e=String(e)).length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var r=parseFloat(t[1]);switch((t[2]||"ms").toLowerCase()){case"years":case"year":case"yrs":case"yr":case"y":return 315576e5*r;case"weeks":case"week":case"w":return 6048e5*r;case"days":case"day":case"d":return 864e5*r;case"hours":case"hour":case"hrs":case"hr":case"h":return 36e5*r;case"minutes":case"minute":case"mins":case"min":case"m":return 6e4*r;case"seconds":case"second":case"secs":case"sec":case"s":return 1e3*r;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return r;default:return}}}}(e);if("number"===s&&isFinite(e))return r.long?(n=Math.abs(e))>=864e5?t(e,n,864e5,"day"):n>=36e5?t(e,n,36e5,"hour"):n>=6e4?t(e,n,6e4,"minute"):n>=1e3?t(e,n,1e3,"second"):e+" ms":(i=Math.abs(e))>=864e5?Math.round(e/864e5)+"d":i>=36e5?Math.round(e/36e5)+"h":i>=6e4?Math.round(e/6e4)+"m":i>=1e3?Math.round(e/1e3)+"s":e+"ms";throw Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))}},36784:(e,t,r)=>{let{EventEmitter:n}=r(82361);class AbortSignal{constructor(){this.eventEmitter=new n,this.onabort=null,this.aborted=!1,this.reason=void 0}toString(){return"[object AbortSignal]"}get[Symbol.toStringTag](){return"AbortSignal"}removeEventListener(e,t){this.eventEmitter.removeListener(e,t)}addEventListener(e,t){this.eventEmitter.on(e,t)}dispatchEvent(e){let t={type:e,target:this},r=`on${e}`;"function"==typeof this[r]&&this[r](t),this.eventEmitter.emit(e,t)}throwIfAborted(){if(this.aborted)throw this.reason}static abort(e){let t=new AbortController;return t.abort(),t.signal}static timeout(e){let t=new AbortController;return setTimeout(()=>t.abort(Error("TimeoutError")),e),t.signal}}class AbortController{constructor(){this.signal=new AbortSignal}abort(e){this.signal.aborted||(this.signal.aborted=!0,e?this.signal.reason=e:this.signal.reason=Error("AbortError"),this.signal.dispatchEvent("abort"))}toString(){return"[object AbortController]"}get[Symbol.toStringTag](){return"AbortController"}}e.exports={AbortController,AbortSignal}},103:(e,t,r)=>{e.exports=r(24160)},78696:(e,t,r)=>{let n=r(71017),i="[^\\\\/]",s="[^/]",a="(?:\\/|$)",o="(?:^|\\/)",l=`\\.{1,2}${a}`,u=`(?!${o}${l})`,c=`(?!\\.{0,1}${a})`,d=`(?!${l})`,h=`${s}*?`,p={DOT_LITERAL:"\\.",PLUS_LITERAL:"\\+",QMARK_LITERAL:"\\?",SLASH_LITERAL:"\\/",ONE_CHAR:"(?=.)",QMARK:s,END_ANCHOR:a,DOTS_SLASH:l,NO_DOT:"(?!\\.)",NO_DOTS:u,NO_DOT_SLASH:c,NO_DOTS_SLASH:d,QMARK_NO_DOT:"[^.\\/]",STAR:h,START_ANCHOR:o},f={...p,SLASH_LITERAL:"[\\\\/]",QMARK:i,STAR:`${i}*?`,DOTS_SLASH:"\\.{1,2}(?:[\\\\/]|$)",NO_DOT:"(?!\\.)",NO_DOTS:"(?!(?:^|[\\\\/])\\.{1,2}(?:[\\\\/]|$))",NO_DOT_SLASH:"(?!\\.{0,1}(?:[\\\\/]|$))",NO_DOTS_SLASH:"(?!\\.{1,2}(?:[\\\\/]|$))",QMARK_NO_DOT:"[^.\\\\/]",START_ANCHOR:"(?:^|[\\\\/])",END_ANCHOR:"(?:[\\\\/]|$)"};e.exports={MAX_LENGTH:65536,POSIX_REGEX_SOURCE:{alnum:"a-zA-Z0-9",alpha:"a-zA-Z",ascii:"\\x00-\\x7F",blank:" \\t",cntrl:"\\x00-\\x1F\\x7F",digit:"0-9",graph:"\\x21-\\x7E",lower:"a-z",print:"\\x20-\\x7E ",punct:"\\-!\"#$%&'()\\*+,./:;<=>?@[\\]^_`{|}~",space:" \\t\\r\\n\\v\\f",upper:"A-Z",word:"A-Za-z0-9_",xdigit:"A-Fa-f0-9"},REGEX_BACKSLASH:/\\(?![*+?^${}(|)[\]])/g,REGEX_NON_SPECIAL_CHARS:/^[^@![\].,$*+?^{}()|\\/]+/,REGEX_SPECIAL_CHARS:/[-*+?.^${}(|)[\]]/,REGEX_SPECIAL_CHARS_BACKREF:/(\\?)((\W)(\3*))/g,REGEX_SPECIAL_CHARS_GLOBAL:/([-*+?.^${}(|)[\]])/g,REGEX_REMOVE_BACKSLASH:/(?:\[.*?[^\\]\]|\\(?=.))/g,REPLACEMENTS:{"***":"*","**/**":"**","**/**/**":"**"},CHAR_0:48,CHAR_9:57,CHAR_UPPERCASE_A:65,CHAR_LOWERCASE_A:97,CHAR_UPPERCASE_Z:90,CHAR_LOWERCASE_Z:122,CHAR_LEFT_PARENTHESES:40,CHAR_RIGHT_PARENTHESES:41,CHAR_ASTERISK:42,CHAR_AMPERSAND:38,CHAR_AT:64,CHAR_BACKWARD_SLASH:92,CHAR_CARRIAGE_RETURN:13,CHAR_CIRCUMFLEX_ACCENT:94,CHAR_COLON:58,CHAR_COMMA:44,CHAR_DOT:46,CHAR_DOUBLE_QUOTE:34,CHAR_EQUAL:61,CHAR_EXCLAMATION_MARK:33,CHAR_FORM_FEED:12,CHAR_FORWARD_SLASH:47,CHAR_GRAVE_ACCENT:96,CHAR_HASH:35,CHAR_HYPHEN_MINUS:45,CHAR_LEFT_ANGLE_BRACKET:60,CHAR_LEFT_CURLY_BRACE:123,CHAR_LEFT_SQUARE_BRACKET:91,CHAR_LINE_FEED:10,CHAR_NO_BREAK_SPACE:160,CHAR_PERCENT:37,CHAR_PLUS:43,CHAR_QUESTION_MARK:63,CHAR_RIGHT_ANGLE_BRACKET:62,CHAR_RIGHT_CURLY_BRACE:125,CHAR_RIGHT_SQUARE_BRACKET:93,CHAR_SEMICOLON:59,CHAR_SINGLE_QUOTE:39,CHAR_SPACE:32,CHAR_TAB:9,CHAR_UNDERSCORE:95,CHAR_VERTICAL_LINE:124,CHAR_ZERO_WIDTH_NOBREAK_SPACE:65279,SEP:n.sep,extglobChars:e=>({"!":{type:"negate",open:"(?:(?!(?:",close:`))${e.STAR})`},"?":{type:"qmark",open:"(?:",close:")?"},"+":{type:"plus",open:"(?:",close:")+"},"*":{type:"star",open:"(?:",close:")*"},"@":{type:"at",open:"(?:",close:")"}}),globChars:e=>!0===e?f:p}},41095:(e,t,r)=>{let n=r(78696),i=r(90966),{MAX_LENGTH:s,POSIX_REGEX_SOURCE:a,REGEX_NON_SPECIAL_CHARS:o,REGEX_SPECIAL_CHARS_BACKREF:l,REPLACEMENTS:u}=n,c=(e,t)=>{if("function"==typeof t.expandRange)return t.expandRange(...e,t);e.sort();let r=`[${e.join("-")}]`;try{new RegExp(r)}catch(t){return e.map(e=>i.escapeRegex(e)).join("..")}return r},d=(e,t)=>`Missing ${e}: "${t}" - use "\\\\${t}" to match literal characters`,h=(e,t)=>{let r;if("string"!=typeof e)throw TypeError("Expected a string");e=u[e]||e;let p={...t},f="number"==typeof p.maxLength?Math.min(s,p.maxLength):s,y=e.length;if(y>f)throw SyntaxError(`Input length: ${y}, exceeds maximum allowed length: ${f}`);let m={type:"bos",value:"",output:p.prepend||""},g=[m],b=p.capture?"":"?:",S=i.isWindows(t),v=n.globChars(S),E=n.extglobChars(v),{DOT_LITERAL:k,PLUS_LITERAL:K,SLASH_LITERAL:w,ONE_CHAR:I,DOTS_SLASH:x,NO_DOT:A,NO_DOT_SLASH:T,NO_DOTS_SLASH:j,QMARK:R,QMARK_NO_DOT:_,STAR:C,START_ANCHOR:O}=v,P=e=>`(${b}(?:(?!${O}${e.dot?x:k}).)*?)`,D=p.dot?"":A,M=p.dot?R:_,N=!0===p.bash?P(p):C;p.capture&&(N=`(${N})`),"boolean"==typeof p.noext&&(p.noextglob=p.noext);let L={input:e,index:-1,start:0,dot:!0===p.dot,consumed:"",output:"",prefix:"",backtrack:!1,negated:!1,brackets:0,braces:0,parens:0,quotes:0,globstar:!1,tokens:g};y=(e=i.removePrefix(e,L)).length;let F=[],V=[],J=[],G=m,$=()=>L.index===y-1,Y=L.peek=(t=1)=>e[L.index+t],B=L.advance=()=>e[++L.index]||"",z=()=>e.slice(L.index+1),H=(e="",t=0)=>{L.consumed+=e,L.index+=t},W=e=>{L.output+=null!=e.output?e.output:e.value,H(e.value)},q=()=>{let e=1;for(;"!"===Y()&&("("!==Y(2)||"?"===Y(3));)B(),L.start++,e++;return e%2!=0&&(L.negated=!0,L.start++,!0)},U=e=>{L[e]++,J.push(e)},Q=e=>{L[e]--,J.pop()},Z=e=>{if("globstar"===G.type){let t=L.braces>0&&("comma"===e.type||"brace"===e.type),r=!0===e.extglob||F.length&&("pipe"===e.type||"paren"===e.type);"slash"===e.type||"paren"===e.type||t||r||(L.output=L.output.slice(0,-G.output.length),G.type="star",G.value="*",G.output=N,L.output+=G.output)}if(F.length&&"paren"!==e.type&&(F[F.length-1].inner+=e.value),(e.value||e.output)&&W(e),G&&"text"===G.type&&"text"===e.type){G.value+=e.value,G.output=(G.output||"")+e.value;return}e.prev=G,g.push(e),G=e},X=(e,t)=>{let r={...E[t],conditions:1,inner:""};r.prev=G,r.parens=L.parens,r.output=L.output;let n=(p.capture?"(":"")+r.open;U("parens"),Z({type:e,value:t,output:L.output?"":I}),Z({type:"paren",extglob:!0,value:B(),output:n}),F.push(r)},ee=e=>{let n,i=e.close+(p.capture?")":"");if("negate"===e.type){let r=N;if(e.inner&&e.inner.length>1&&e.inner.includes("/")&&(r=P(p)),(r!==N||$()||/^\)+$/.test(z()))&&(i=e.close=`)$))${r}`),e.inner.includes("*")&&(n=z())&&/^\.[^\\/.]+$/.test(n)){let s=h(n,{...t,fastpaths:!1}).output;i=e.close=`)${s})${r})`}"bos"===e.prev.type&&(L.negatedExtglob=!0)}Z({type:"paren",extglob:!0,value:r,output:i}),Q("parens")};if(!1!==p.fastpaths&&!/(^[*!]|[/()[\]{}"])/.test(e)){let r=!1,n=e.replace(l,(e,t,n,i,s,a)=>"\\"===i?(r=!0,e):"?"===i?t?t+i+(s?R.repeat(s.length):""):0===a?M+(s?R.repeat(s.length):""):R.repeat(n.length):"."===i?k.repeat(n.length):"*"===i?t?t+i+(s?N:""):N:t?e:`\\${e}`);return(!0===r&&(n=!0===p.unescape?n.replace(/\\/g,""):n.replace(/\\+/g,e=>e.length%2==0?"\\\\":e?"\\":"")),n===e&&!0===p.contains)?L.output=e:L.output=i.wrapOutput(n,L,t),L}for(;!$();){if("\x00"===(r=B()))continue;if("\\"===r){let e=Y();if("/"===e&&!0!==p.bash||"."===e||";"===e)continue;if(!e){Z({type:"text",value:r+="\\"});continue}let t=/^\\+/.exec(z()),n=0;if(t&&t[0].length>2&&(n=t[0].length,L.index+=n,n%2!=0&&(r+="\\")),!0===p.unescape?r=B():r+=B(),0===L.brackets){Z({type:"text",value:r});continue}}if(L.brackets>0&&("]"!==r||"["===G.value||"[^"===G.value)){if(!1!==p.posix&&":"===r){let e=G.value.slice(1);if(e.includes("[")&&(G.posix=!0,e.includes(":"))){let e=G.value.lastIndexOf("["),t=G.value.slice(0,e),r=G.value.slice(e+2),n=a[r];if(n){G.value=t+n,L.backtrack=!0,B(),m.output||1!==g.indexOf(G)||(m.output=I);continue}}}("["===r&&":"!==Y()||"-"===r&&"]"===Y())&&(r=`\\${r}`),"]"===r&&("["===G.value||"[^"===G.value)&&(r=`\\${r}`),!0===p.posix&&"!"===r&&"["===G.value&&(r="^"),G.value+=r,W({value:r});continue}if(1===L.quotes&&'"'!==r){r=i.escapeRegex(r),G.value+=r,W({value:r});continue}if('"'===r){L.quotes=1===L.quotes?0:1,!0===p.keepQuotes&&Z({type:"text",value:r});continue}if("("===r){U("parens"),Z({type:"paren",value:r});continue}if(")"===r){if(0===L.parens&&!0===p.strictBrackets)throw SyntaxError(d("opening","("));let e=F[F.length-1];if(e&&L.parens===e.parens+1){ee(F.pop());continue}Z({type:"paren",value:r,output:L.parens?")":"\\)"}),Q("parens");continue}if("["===r){if(!0!==p.nobracket&&z().includes("]"))U("brackets");else{if(!0!==p.nobracket&&!0===p.strictBrackets)throw SyntaxError(d("closing","]"));r=`\\${r}`}Z({type:"bracket",value:r});continue}if("]"===r){if(!0===p.nobracket||G&&"bracket"===G.type&&1===G.value.length){Z({type:"text",value:r,output:`\\${r}`});continue}if(0===L.brackets){if(!0===p.strictBrackets)throw SyntaxError(d("opening","["));Z({type:"text",value:r,output:`\\${r}`});continue}Q("brackets");let e=G.value.slice(1);if(!0===G.posix||"^"!==e[0]||e.includes("/")||(r=`/${r}`),G.value+=r,W({value:r}),!1===p.literalBrackets||i.hasRegexChars(e))continue;let t=i.escapeRegex(G.value);if(L.output=L.output.slice(0,-G.value.length),!0===p.literalBrackets){L.output+=t,G.value=t;continue}G.value=`(${b}${t}|${G.value})`,L.output+=G.value;continue}if("{"===r&&!0!==p.nobrace){U("braces");let e={type:"brace",value:r,output:"(",outputIndex:L.output.length,tokensIndex:L.tokens.length};V.push(e),Z(e);continue}if("}"===r){let e=V[V.length-1];if(!0===p.nobrace||!e){Z({type:"text",value:r,output:r});continue}let t=")";if(!0===e.dots){let e=g.slice(),r=[];for(let t=e.length-1;t>=0&&(g.pop(),"brace"!==e[t].type);t--)"dots"!==e[t].type&&r.unshift(e[t].value);t=c(r,p),L.backtrack=!0}if(!0!==e.comma&&!0!==e.dots){let n=L.output.slice(0,e.outputIndex),i=L.tokens.slice(e.tokensIndex);for(let s of(e.value=e.output="\\{",r=t="\\}",L.output=n,i))L.output+=s.output||s.value}Z({type:"brace",value:r,output:t}),Q("braces"),V.pop();continue}if("|"===r){F.length>0&&F[F.length-1].conditions++,Z({type:"text",value:r});continue}if(","===r){let e=r,t=V[V.length-1];t&&"braces"===J[J.length-1]&&(t.comma=!0,e="|"),Z({type:"comma",value:r,output:e});continue}if("/"===r){if("dot"===G.type&&L.index===L.start+1){L.start=L.index+1,L.consumed="",L.output="",g.pop(),G=m;continue}Z({type:"slash",value:r,output:w});continue}if("."===r){if(L.braces>0&&"dot"===G.type){"."===G.value&&(G.output=k);let e=V[V.length-1];G.type="dots",G.output+=r,G.value+=r,e.dots=!0;continue}if(L.braces+L.parens===0&&"bos"!==G.type&&"slash"!==G.type){Z({type:"text",value:r,output:k});continue}Z({type:"dot",value:r,output:k});continue}if("?"===r){let e=G&&"("===G.value;if(!e&&!0!==p.noextglob&&"("===Y()&&"?"!==Y(2)){X("qmark",r);continue}if(G&&"paren"===G.type){let e=Y(),t=r;if("<"===e&&!i.supportsLookbehinds())throw Error("Node.js v10 or higher is required for regex lookbehinds");("("!==G.value||/[!=<:]/.test(e))&&("<"!==e||/<([!=]|\w+>)/.test(z()))||(t=`\\${r}`),Z({type:"text",value:r,output:t});continue}if(!0!==p.dot&&("slash"===G.type||"bos"===G.type)){Z({type:"qmark",value:r,output:_});continue}Z({type:"qmark",value:r,output:R});continue}if("!"===r){if(!0!==p.noextglob&&"("===Y()&&("?"!==Y(2)||!/[!=<:]/.test(Y(3)))){X("negate",r);continue}if(!0!==p.nonegate&&0===L.index){q();continue}}if("+"===r){if(!0!==p.noextglob&&"("===Y()&&"?"!==Y(2)){X("plus",r);continue}if(G&&"("===G.value||!1===p.regex){Z({type:"plus",value:r,output:K});continue}if(G&&("bracket"===G.type||"paren"===G.type||"brace"===G.type)||L.parens>0){Z({type:"plus",value:r});continue}Z({type:"plus",value:K});continue}if("@"===r){if(!0!==p.noextglob&&"("===Y()&&"?"!==Y(2)){Z({type:"at",extglob:!0,value:r,output:""});continue}Z({type:"text",value:r});continue}if("*"!==r){("$"===r||"^"===r)&&(r=`\\${r}`);let e=o.exec(z());e&&(r+=e[0],L.index+=e[0].length),Z({type:"text",value:r});continue}if(G&&("globstar"===G.type||!0===G.star)){G.type="star",G.star=!0,G.value+=r,G.output=N,L.backtrack=!0,L.globstar=!0,H(r);continue}let t=z();if(!0!==p.noextglob&&/^\([^?]/.test(t)){X("star",r);continue}if("star"===G.type){if(!0===p.noglobstar){H(r);continue}let n=G.prev,i=n.prev,s="slash"===n.type||"bos"===n.type,a=i&&("star"===i.type||"globstar"===i.type);if(!0===p.bash&&(!s||t[0]&&"/"!==t[0])){Z({type:"star",value:r,output:""});continue}let o=L.braces>0&&("comma"===n.type||"brace"===n.type),l=F.length&&("pipe"===n.type||"paren"===n.type);if(!s&&"paren"!==n.type&&!o&&!l){Z({type:"star",value:r,output:""});continue}for(;"/**"===t.slice(0,3);){let r=e[L.index+4];if(r&&"/"!==r)break;t=t.slice(3),H("/**",3)}if("bos"===n.type&&$()){G.type="globstar",G.value+=r,G.output=P(p),L.output=G.output,L.globstar=!0,H(r);continue}if("slash"===n.type&&"bos"!==n.prev.type&&!a&&$()){L.output=L.output.slice(0,-(n.output+G.output).length),n.output=`(?:${n.output}`,G.type="globstar",G.output=P(p)+(p.strictSlashes?")":"|$)"),G.value+=r,L.globstar=!0,L.output+=n.output+G.output,H(r);continue}if("slash"===n.type&&"bos"!==n.prev.type&&"/"===t[0]){let e=void 0!==t[1]?"|$":"";L.output=L.output.slice(0,-(n.output+G.output).length),n.output=`(?:${n.output}`,G.type="globstar",G.output=`${P(p)}${w}|${w}${e})`,G.value+=r,L.output+=n.output+G.output,L.globstar=!0,H(r+B()),Z({type:"slash",value:"/",output:""});continue}if("bos"===n.type&&"/"===t[0]){G.type="globstar",G.value+=r,G.output=`(?:^|${w}|${P(p)}${w})`,L.output=G.output,L.globstar=!0,H(r+B()),Z({type:"slash",value:"/",output:""});continue}L.output=L.output.slice(0,-G.output.length),G.type="globstar",G.output=P(p),G.value+=r,L.output+=G.output,L.globstar=!0,H(r);continue}let n={type:"star",value:r,output:N};if(!0===p.bash){n.output=".*?",("bos"===G.type||"slash"===G.type)&&(n.output=D+n.output),Z(n);continue}if(G&&("bracket"===G.type||"paren"===G.type)&&!0===p.regex){n.output=r,Z(n);continue}(L.index===L.start||"slash"===G.type||"dot"===G.type)&&("dot"===G.type?(L.output+=T,G.output+=T):!0===p.dot?(L.output+=j,G.output+=j):(L.output+=D,G.output+=D),"*"!==Y()&&(L.output+=I,G.output+=I)),Z(n)}for(;L.brackets>0;){if(!0===p.strictBrackets)throw SyntaxError(d("closing","]"));L.output=i.escapeLast(L.output,"["),Q("brackets")}for(;L.parens>0;){if(!0===p.strictBrackets)throw SyntaxError(d("closing",")"));L.output=i.escapeLast(L.output,"("),Q("parens")}for(;L.braces>0;){if(!0===p.strictBrackets)throw SyntaxError(d("closing","}"));L.output=i.escapeLast(L.output,"{"),Q("braces")}if(!0!==p.strictSlashes&&("star"===G.type||"bracket"===G.type)&&Z({type:"maybe_slash",value:"",output:`${w}?`}),!0===L.backtrack)for(let e of(L.output="",L.tokens))L.output+=null!=e.output?e.output:e.value,e.suffix&&(L.output+=e.suffix);return L};h.fastpaths=(e,t)=>{let r={...t},a="number"==typeof r.maxLength?Math.min(s,r.maxLength):s,o=e.length;if(o>a)throw SyntaxError(`Input length: ${o}, exceeds maximum allowed length: ${a}`);e=u[e]||e;let l=i.isWindows(t),{DOT_LITERAL:c,SLASH_LITERAL:d,ONE_CHAR:h,DOTS_SLASH:p,NO_DOT:f,NO_DOTS:y,NO_DOTS_SLASH:m,STAR:g,START_ANCHOR:b}=n.globChars(l),S=r.dot?y:f,v=r.dot?m:f,E=r.capture?"":"?:",k=!0===r.bash?".*?":g;r.capture&&(k=`(${k})`);let K=e=>!0===e.noglobstar?k:`(${E}(?:(?!${b}${e.dot?p:c}).)*?)`,w=e=>{switch(e){case"*":return`${S}${h}${k}`;case".*":return`${c}${h}${k}`;case"*.*":return`${S}${k}${c}${h}${k}`;case"*/*":return`${S}${k}${d}${h}${v}${k}`;case"**":return S+K(r);case"**/*":return`(?:${S}${K(r)}${d})?${v}${h}${k}`;case"**/*.*":return`(?:${S}${K(r)}${d})?${v}${k}${c}${h}${k}`;case"**/.*":return`(?:${S}${K(r)}${d})?${c}${h}${k}`;default:{let t=/^(.*?)\.(\w+)$/.exec(e);if(!t)return;let r=w(t[1]);if(!r)return;return r+c+t[2]}}},I=i.removePrefix(e,{negated:!1,prefix:""}),x=w(I);return x&&!0!==r.strictSlashes&&(x+=`${d}?`),x},e.exports=h},24160:(e,t,r)=>{let n=r(71017),i=r(19224),s=r(41095),a=r(90966),o=r(78696),l=e=>e&&"object"==typeof e&&!Array.isArray(e),u=(e,t,r=!1)=>{if(Array.isArray(e)){let n=e.map(e=>u(e,t,r));return e=>{for(let t of n){let r=t(e);if(r)return r}return!1}}let n=l(e)&&e.tokens&&e.input;if(""===e||"string"!=typeof e&&!n)throw TypeError("Expected pattern to be a non-empty string");let i=t||{},s=a.isWindows(t),o=n?u.compileRe(e,t):u.makeRe(e,t,!1,!0),c=o.state;delete o.state;let d=()=>!1;if(i.ignore){let e={...t,ignore:null,onMatch:null,onResult:null};d=u(i.ignore,e,r)}let h=(r,n=!1)=>{let{isMatch:a,match:l,output:h}=u.test(r,o,t,{glob:e,posix:s}),p={glob:e,state:c,regex:o,posix:s,input:r,output:h,match:l,isMatch:a};return("function"==typeof i.onResult&&i.onResult(p),!1===a)?(p.isMatch=!1,!!n&&p):d(r)?("function"==typeof i.onIgnore&&i.onIgnore(p),p.isMatch=!1,!!n&&p):("function"==typeof i.onMatch&&i.onMatch(p),!n||p)};return r&&(h.state=c),h};u.test=(e,t,r,{glob:n,posix:i}={})=>{if("string"!=typeof e)throw TypeError("Expected input to be a string");if(""===e)return{isMatch:!1,output:""};let s=r||{},o=s.format||(i?a.toPosixSlashes:null),l=e===n,c=l&&o?o(e):e;return!1===l&&(l=(c=o?o(e):e)===n),(!1===l||!0===s.capture)&&(l=!0===s.matchBase||!0===s.basename?u.matchBase(e,t,r,i):t.exec(c)),{isMatch:!!l,match:l,output:c}},u.matchBase=(e,t,r,i=a.isWindows(r))=>{let s=t instanceof RegExp?t:u.makeRe(t,r);return s.test(n.basename(e))},u.isMatch=(e,t,r)=>u(t,r)(e),u.parse=(e,t)=>Array.isArray(e)?e.map(e=>u.parse(e,t)):s(e,{...t,fastpaths:!1}),u.scan=(e,t)=>i(e,t),u.compileRe=(e,t,r=!1,n=!1)=>{if(!0===r)return e.output;let i=t||{},s=i.contains?"":"^",a=i.contains?"":"$",o=`${s}(?:${e.output})${a}`;e&&!0===e.negated&&(o=`^(?!${o}).*$`);let l=u.toRegex(o,t);return!0===n&&(l.state=e),l},u.makeRe=(e,t={},r=!1,n=!1)=>{if(!e||"string"!=typeof e)throw TypeError("Expected a non-empty string");let i={negated:!1,fastpaths:!0};return!1!==t.fastpaths&&("."===e[0]||"*"===e[0])&&(i.output=s.fastpaths(e,t)),i.output||(i=s(e,t)),u.compileRe(i,t,r,n)},u.toRegex=(e,t)=>{try{let r=t||{};return new RegExp(e,r.flags||(r.nocase?"i":""))}catch(e){if(t&&!0===t.debug)throw e;return/$^/}},u.constants=o,e.exports=u},19224:(e,t,r)=>{let n=r(90966),{CHAR_ASTERISK:i,CHAR_AT:s,CHAR_BACKWARD_SLASH:a,CHAR_COMMA:o,CHAR_DOT:l,CHAR_EXCLAMATION_MARK:u,CHAR_FORWARD_SLASH:c,CHAR_LEFT_CURLY_BRACE:d,CHAR_LEFT_PARENTHESES:h,CHAR_LEFT_SQUARE_BRACKET:p,CHAR_PLUS:f,CHAR_QUESTION_MARK:y,CHAR_RIGHT_CURLY_BRACE:m,CHAR_RIGHT_PARENTHESES:g,CHAR_RIGHT_SQUARE_BRACKET:b}=r(78696),S=e=>e===c||e===a,v=e=>{!0!==e.isPrefix&&(e.depth=e.isGlobstar?1/0:1)};e.exports=(e,t)=>{let r,E;let k=t||{},K=e.length-1,w=!0===k.parts||!0===k.scanToEnd,I=[],x=[],A=[],T=e,j=-1,R=0,_=0,C=!1,O=!1,P=!1,D=!1,M=!1,N=!1,L=!1,F=!1,V=!1,J=!1,G=0,$={value:"",depth:0,isGlob:!1},Y=()=>j>=K,B=()=>T.charCodeAt(j+1),z=()=>(r=E,T.charCodeAt(++j));for(;j<K;){let e;if((E=z())===a){L=$.backslashes=!0,(E=z())===d&&(N=!0);continue}if(!0===N||E===d){for(G++;!0!==Y()&&(E=z());){if(E===a){L=$.backslashes=!0,z();continue}if(E===d){G++;continue}if(!0!==N&&E===l&&(E=z())===l||!0!==N&&E===o){if(C=$.isBrace=!0,P=$.isGlob=!0,J=!0,!0===w)continue;break}if(E===m&&0==--G){N=!1,C=$.isBrace=!0,J=!0;break}}if(!0===w)continue;break}if(E===c){if(I.push(j),x.push($),$={value:"",depth:0,isGlob:!1},!0===J)continue;if(r===l&&j===R+1){R+=2;continue}_=j+1;continue}if(!0!==k.noext){let e=E===f||E===s||E===i||E===y||E===u;if(!0===e&&B()===h){if(P=$.isGlob=!0,D=$.isExtglob=!0,J=!0,E===u&&j===R&&(V=!0),!0===w){for(;!0!==Y()&&(E=z());){if(E===a){L=$.backslashes=!0,E=z();continue}if(E===g){P=$.isGlob=!0,J=!0;break}}continue}break}}if(E===i){if(r===i&&(M=$.isGlobstar=!0),P=$.isGlob=!0,J=!0,!0===w)continue;break}if(E===y){if(P=$.isGlob=!0,J=!0,!0===w)continue;break}if(E===p){for(;!0!==Y()&&(e=z());){if(e===a){L=$.backslashes=!0,z();continue}if(e===b){O=$.isBracket=!0,P=$.isGlob=!0,J=!0;break}}if(!0===w)continue;break}if(!0!==k.nonegate&&E===u&&j===R){F=$.negated=!0,R++;continue}if(!0!==k.noparen&&E===h){if(P=$.isGlob=!0,!0===w){for(;!0!==Y()&&(E=z());){if(E===h){L=$.backslashes=!0,E=z();continue}if(E===g){J=!0;break}}continue}break}if(!0===P){if(J=!0,!0===w)continue;break}}!0===k.noext&&(D=!1,P=!1);let H=T,W="",q="";R>0&&(W=T.slice(0,R),T=T.slice(R),_-=R),H&&!0===P&&_>0?(H=T.slice(0,_),q=T.slice(_)):!0===P?(H="",q=T):H=T,H&&""!==H&&"/"!==H&&H!==T&&S(H.charCodeAt(H.length-1))&&(H=H.slice(0,-1)),!0===k.unescape&&(q&&(q=n.removeBackslashes(q)),H&&!0===L&&(H=n.removeBackslashes(H)));let U={prefix:W,input:e,start:R,base:H,glob:q,isBrace:C,isBracket:O,isGlob:P,isExtglob:D,isGlobstar:M,negated:F,negatedExtglob:V};if(!0===k.tokens&&(U.maxDepth=0,S(E)||x.push($),U.tokens=x),!0===k.parts||!0===k.tokens){let t;for(let r=0;r<I.length;r++){let n=t?t+1:R,i=I[r],s=e.slice(n,i);k.tokens&&(0===r&&0!==R?(x[r].isPrefix=!0,x[r].value=W):x[r].value=s,v(x[r]),U.maxDepth+=x[r].depth),(0!==r||""!==s)&&A.push(s),t=i}if(t&&t+1<e.length){let r=e.slice(t+1);A.push(r),k.tokens&&(x[x.length-1].value=r,v(x[x.length-1]),U.maxDepth+=x[x.length-1].depth)}U.slashes=I,U.parts=A}return U}},90966:(e,t,r)=>{let n=r(71017),i="win32"===process.platform,{REGEX_BACKSLASH:s,REGEX_REMOVE_BACKSLASH:a,REGEX_SPECIAL_CHARS:o,REGEX_SPECIAL_CHARS_GLOBAL:l}=r(78696);t.isObject=e=>null!==e&&"object"==typeof e&&!Array.isArray(e),t.hasRegexChars=e=>o.test(e),t.isRegexChar=e=>1===e.length&&t.hasRegexChars(e),t.escapeRegex=e=>e.replace(l,"\\$1"),t.toPosixSlashes=e=>e.replace(s,"/"),t.removeBackslashes=e=>e.replace(a,e=>"\\"===e?"":e),t.supportsLookbehinds=()=>{let e=process.version.slice(1).split(".").map(Number);return 3===e.length&&e[0]>=9||8===e[0]&&e[1]>=10},t.isWindows=e=>e&&"boolean"==typeof e.windows?e.windows:!0===i||"\\"===n.sep,t.escapeLast=(e,r,n)=>{let i=e.lastIndexOf(r,n);return -1===i?e:"\\"===e[i-1]?t.escapeLast(e,r,i-1):`${e.slice(0,i)}\\${e.slice(i)}`},t.removePrefix=(e,t={})=>{let r=e;return r.startsWith("./")&&(r=r.slice(2),t.prefix="./"),r},t.wrapOutput=(e,t={},r={})=>{let n=r.contains?"":"^",i=r.contains?"":"$",s=`${n}(?:${e})${i}`;return!0===t.negated&&(s=`(?:^(?!${s}).*$)`),s}},18803:e=>{/*! queue-microtask. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */let t;e.exports="function"==typeof queueMicrotask?queueMicrotask.bind(global):e=>(t||(t=Promise.resolve())).then(e).catch(e=>setTimeout(()=>{throw e},0))},76752:(e,t,r)=>{let n=r(55>process.version.charCodeAt(1)&&46===process.version.charCodeAt(2)?20268:85275);e.exports=n},85275:(e,t,r)=>{let n=r(39491);class i extends Error{get name(){return this.constructor.name}}class s extends i{constructor(e,t,r){n(t),n.strictEqual(typeof r,"number");let i=Error.stackTraceLimit;Error.stackTraceLimit=2,super(e),Error.stackTraceLimit=i,this.offset=r,this.buffer=t}get name(){return this.constructor.name}}class a extends i{constructor(e){let t=Error.stackTraceLimit;Error.stackTraceLimit=2,super(e),Error.stackTraceLimit=t}get name(){return this.constructor.name}}class o extends i{get name(){return this.constructor.name}}class l extends o{get name(){return this.constructor.name}}e.exports={RedisError:i,ParserError:s,ReplyError:a,AbortError:o,InterruptError:l}},20268:(e,t,r)=>{let n=r(39491),i=r(73837);function s(e){Object.defineProperty(this,"message",{value:e||"",configurable:!0,writable:!0}),Error.captureStackTrace(this,this.constructor)}function a(e,t,r){n(t),n.strictEqual(typeof r,"number"),Object.defineProperty(this,"message",{value:e||"",configurable:!0,writable:!0});let i=Error.stackTraceLimit;Error.stackTraceLimit=2,Error.captureStackTrace(this,this.constructor),Error.stackTraceLimit=i,this.offset=r,this.buffer=t}function o(e){Object.defineProperty(this,"message",{value:e||"",configurable:!0,writable:!0});let t=Error.stackTraceLimit;Error.stackTraceLimit=2,Error.captureStackTrace(this,this.constructor),Error.stackTraceLimit=t}function l(e){Object.defineProperty(this,"message",{value:e||"",configurable:!0,writable:!0}),Error.captureStackTrace(this,this.constructor)}function u(e){Object.defineProperty(this,"message",{value:e||"",configurable:!0,writable:!0}),Error.captureStackTrace(this,this.constructor)}i.inherits(s,Error),Object.defineProperty(s.prototype,"name",{value:"RedisError",configurable:!0,writable:!0}),i.inherits(a,s),Object.defineProperty(a.prototype,"name",{value:"ParserError",configurable:!0,writable:!0}),i.inherits(o,s),Object.defineProperty(o.prototype,"name",{value:"ReplyError",configurable:!0,writable:!0}),i.inherits(l,s),Object.defineProperty(l.prototype,"name",{value:"AbortError",configurable:!0,writable:!0}),i.inherits(u,l),Object.defineProperty(u.prototype,"name",{value:"InterruptError",configurable:!0,writable:!0}),e.exports={RedisError:s,ParserError:a,ReplyError:o,AbortError:l,InterruptError:u}},67221:(e,t,r)=>{e.exports=r(7556)},7556:(e,t,r)=>{let n=r(14300).Buffer,i=r(71576).StringDecoder,s=new i,a=r(76752),o=a.ReplyError,l=a.ParserError;var u=n.allocUnsafe(32768),c=0,d=null,h=0,p=0;function f(e){let t=e.offset,r=e.buffer,n=r.length-1;for(var i=t;i<n;)if(13===r[i++]){if(e.offset=i+1,!0===e.optionReturnBuffers)return e.buffer.slice(t,i-1);return e.buffer.toString("utf8",t,i-1)}}function y(e){let t=e.buffer.length-1;for(var r=e.offset,n=0;r<t;){let t=e.buffer[r++];if(13===t)return e.offset=r+1,n;n=10*n+(t-48)}}function m(e,t,r){e.arrayCache.push(t),e.arrayPos.push(r)}function g(e){let t=e.arrayCache.pop();var r=e.arrayPos.pop();if(e.arrayCache.length){let n=g(e);if(void 0===n){m(e,t,r);return}t[r++]=n}return b(e,t,r)}function b(e,t,r){let n=e.buffer.length;for(;r<t.length;){let i=e.offset;if(e.offset>=n){m(e,t,r);return}let s=S(e,e.buffer[e.offset++]);if(void 0===s){e.arrayCache.length||e.bufferCache.length||(e.offset=i),m(e,t,r);return}t[r]=s,r++}return t}function S(e,t){switch(t){case 36:return function(e){let t=y(e);if(void 0===t)return;if(t<0)return null;let r=e.offset+t;if(r+2>e.buffer.length){e.bigStrSize=r+2,e.totalChunkSize=e.buffer.length,e.bufferCache.push(e.buffer);return}let n=e.offset;return(e.offset=r+2,!0===e.optionReturnBuffers)?e.buffer.slice(n,r):e.buffer.toString("utf8",n,r)}(e);case 43:return f(e);case 42:return function(e){let t=y(e);if(void 0===t)return;if(t<0)return null;let r=Array(t);return b(e,r,0)}(e);case 58:return!0===e.optionStringNumbers?function(e){let t=e.buffer.length-1;var r=e.offset,n=0,i="";for(45===e.buffer[r]&&(i+="-",r++);r<t;){var s=e.buffer[r++];if(13===s)return e.offset=r+1,0!==n&&(i+=n),i;n>429496728?(i+=10*n+(s-48),n=0):48===s&&0===n?i+=0:n=10*n+(s-48)}}(e):function(e){let t=e.buffer.length-1;var r=e.offset,n=0,i=1;for(45===e.buffer[r]&&(i=-1,r++);r<t;){let t=e.buffer[r++];if(13===t)return e.offset=r+1,i*n;n=10*n+(t-48)}}(e);case 45:return function(e){var t=f(e);if(void 0!==t)return!0===e.optionReturnBuffers&&(t=t.toString()),new o(t)}(e);default:return function(e,t){let r=new l("Protocol error, got "+JSON.stringify(String.fromCharCode(t))+" as reply type byte",JSON.stringify(e.buffer),e.offset);e.buffer=null,e.returnFatalError(r)}(e,t)}}function v(){if(u.length>51200){if(1===h||p>2*h){let e=Math.floor(u.length/10),t=e<c?c:e;c=0,u=u.slice(t,u.length)}else p++,h--}else clearInterval(d),h=0,p=0,d=null}class E{constructor(e){if(!e)throw TypeError("Options are mandatory.");if("function"!=typeof e.returnError||"function"!=typeof e.returnReply)throw TypeError("The returnReply and returnError options have to be functions.");this.setReturnBuffers(!!e.returnBuffers),this.setStringNumbers(!!e.stringNumbers),this.returnError=e.returnError,this.returnFatalError=e.returnFatalError||e.returnError,this.returnReply=e.returnReply,this.reset()}reset(){this.offset=0,this.buffer=null,this.bigStrSize=0,this.totalChunkSize=0,this.bufferCache=[],this.arrayCache=[],this.arrayPos=[]}setReturnBuffers(e){if("boolean"!=typeof e)throw TypeError("The returnBuffers argument has to be a boolean");this.optionReturnBuffers=e}setStringNumbers(e){if("boolean"!=typeof e)throw TypeError("The stringNumbers argument has to be a boolean");this.optionStringNumbers=e}execute(e){if(null===this.buffer)this.buffer=e,this.offset=0;else if(0===this.bigStrSize){let t=this.buffer.length,r=t-this.offset,i=n.allocUnsafe(r+e.length);if(this.buffer.copy(i,0,this.offset,t),e.copy(i,r,0,e.length),this.buffer=i,this.offset=0,this.arrayCache.length){let e=g(this);if(void 0===e)return;this.returnReply(e)}}else if(this.totalChunkSize+e.length>=this.bigStrSize){this.bufferCache.push(e);var t=this.optionReturnBuffers?function(e){let t=e.bufferCache,r=e.offset,i=e.bigStrSize-r-2;var s=t.length,a=e.bigStrSize-e.totalChunkSize;if(e.offset=a,a<=2){if(2===s)return t[0].slice(r,t[0].length+a-2);s--,a=t[t.length-2].length+a}u.length<i+c&&(c>116391936&&(c=52428800),u=n.allocUnsafe(i*(i>78643200?2:3)+c),c=0,h++,null===d&&(d=setInterval(v,50)));let o=c;t[0].copy(u,o,r,t[0].length),c+=t[0].length-r;for(var l=1;l<s-1;l++)t[l].copy(u,c),c+=t[l].length;return t[l].copy(u,c,0,a-2),c+=a-2,u.slice(o,c)}(this):function(e){let t=e.bufferCache,r=e.offset;var n=t.length,i=e.bigStrSize-e.totalChunkSize;if(e.offset=i,i<=2){if(2===n)return t[0].toString("utf8",r,t[0].length+i-2);n--,i=t[t.length-2].length+i}for(var a=s.write(t[0].slice(r)),o=1;o<n-1;o++)a+=s.write(t[o]);return a+s.end(t[o].slice(0,i-2))}(this);if(this.bigStrSize=0,this.bufferCache=[],this.buffer=e,this.arrayCache.length&&(this.arrayCache[0][this.arrayPos[0]++]=t,void 0===(t=g(this))))return;this.returnReply(t)}else{this.bufferCache.push(e),this.totalChunkSize+=e.length;return}for(;this.offset<this.buffer.length;){let e=this.offset,t=this.buffer[this.offset++],r=S(this,t);if(void 0===r){this.arrayCache.length||this.bufferCache.length||(this.offset=e);return}45===t?this.returnError(r):this.returnReply(r)}this.buffer=null}}e.exports=E},67745:e=>{e.exports=function(e){var t=new e,r=t;return{get:function(){var n=t;return n.next?t=n.next:r=t=new e,n.next=null,n},release:function(e){r.next=e,r=e}}}},33751:(e,t,r)=>{/*! run-parallel. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */e.exports=function(e,t){let r,i,s;let a=!0;function o(e){function i(){t&&t(e,r),t=null}a?n(i):i()}function l(e,t,n){r[e]=n,(0==--i||t)&&o(t)}Array.isArray(e)?(r=[],i=e.length):(s=Object.keys(e),r={},i=s.length),i?s?s.forEach(function(t){e[t](function(e,r){l(t,e,r)})}):e.forEach(function(e,t){e(function(e,r){l(t,e,r)})}):o(null),a=!1};let n=r(18803)},94720:(e,t,r)=>{let n=Symbol("SemVer ANY");class i{static get ANY(){return n}constructor(e,t){if(t=s(t),e instanceof i){if(!!t.loose===e.loose)return e;e=e.value}u("comparator",e=e.trim().split(/\s+/).join(" "),t),this.options=t,this.loose=!!t.loose,this.parse(e),this.semver===n?this.value="":this.value=this.operator+this.semver.version,u("comp",this)}parse(e){let t=this.options.loose?a[o.COMPARATORLOOSE]:a[o.COMPARATOR],r=e.match(t);if(!r)throw TypeError(`Invalid comparator: ${e}`);this.operator=void 0!==r[1]?r[1]:"","="===this.operator&&(this.operator=""),r[2]?this.semver=new c(r[2],this.options.loose):this.semver=n}toString(){return this.value}test(e){if(u("Comparator.test",e,this.options.loose),this.semver===n||e===n)return!0;if("string"==typeof e)try{e=new c(e,this.options)}catch(e){return!1}return l(e,this.operator,this.semver,this.options)}intersects(e,t){if(!(e instanceof i))throw TypeError("a Comparator is required");return""===this.operator?""===this.value||new Range(e.value,t).test(this.value):""===e.operator?""===e.value||new Range(this.value,t).test(e.semver):!((t=s(t)).includePrerelease&&("<0.0.0-0"===this.value||"<0.0.0-0"===e.value)||!t.includePrerelease&&(this.value.startsWith("<0.0.0")||e.value.startsWith("<0.0.0")))&&!!(this.operator.startsWith(">")&&e.operator.startsWith(">")||this.operator.startsWith("<")&&e.operator.startsWith("<")||this.semver.version===e.semver.version&&this.operator.includes("=")&&e.operator.includes("=")||l(this.semver,"<",e.semver,t)&&this.operator.startsWith(">")&&e.operator.startsWith("<")||l(this.semver,">",e.semver,t)&&this.operator.startsWith("<")&&e.operator.startsWith(">"))}}e.exports=i;let s=r(66152),{safeRe:a,t:o}=r(82652),l=r(1393),u=r(22274),c=r(66956),Range=r(53703)},53703:(e,t,r)=>{class Range{constructor(e,t){if(t=s(t),e instanceof Range){if(!!t.loose===e.loose&&!!t.includePrerelease===e.includePrerelease)return e;return new Range(e.raw,t)}if(e instanceof a)return this.raw=e.value,this.set=[[e]],this.format(),this;if(this.options=t,this.loose=!!t.loose,this.includePrerelease=!!t.includePrerelease,this.raw=e.trim().split(/\s+/).join(" "),this.set=this.raw.split("||").map(e=>this.parseRange(e.trim())).filter(e=>e.length),!this.set.length)throw TypeError(`Invalid SemVer Range: ${this.raw}`);if(this.set.length>1){let e=this.set[0];if(this.set=this.set.filter(e=>!m(e[0])),0===this.set.length)this.set=[e];else if(this.set.length>1){for(let e of this.set)if(1===e.length&&g(e[0])){this.set=[e];break}}}this.format()}format(){return this.range=this.set.map(e=>e.join(" ").trim()).join("||").trim(),this.range}toString(){return this.range}parseRange(e){let t=(this.options.includePrerelease&&f)|(this.options.loose&&y),r=t+":"+e,n=i.get(r);if(n)return n;let s=this.options.loose,l=s?u[c.HYPHENRANGELOOSE]:u[c.HYPHENRANGE];o("hyphen replace",e=e.replace(l,j(this.options.includePrerelease))),o("comparator trim",e=e.replace(u[c.COMPARATORTRIM],d)),o("tilde trim",e=e.replace(u[c.TILDETRIM],h)),o("caret trim",e=e.replace(u[c.CARETTRIM],p));let g=e.split(" ").map(e=>S(e,this.options)).join(" ").split(/\s+/).map(e=>T(e,this.options));s&&(g=g.filter(e=>(o("loose invalid filter",e,this.options),!!e.match(u[c.COMPARATORLOOSE])))),o("range list",g);let b=new Map,v=g.map(e=>new a(e,this.options));for(let e of v){if(m(e))return[e];b.set(e.value,e)}b.size>1&&b.has("")&&b.delete("");let E=[...b.values()];return i.set(r,E),E}intersects(e,t){if(!(e instanceof Range))throw TypeError("a Range is required");return this.set.some(r=>b(r,t)&&e.set.some(e=>b(e,t)&&r.every(r=>e.every(e=>r.intersects(e,t)))))}test(e){if(!e)return!1;if("string"==typeof e)try{e=new l(e,this.options)}catch(e){return!1}for(let t=0;t<this.set.length;t++)if(R(this.set[t],e,this.options))return!0;return!1}}e.exports=Range;let n=r(27523),i=new n({max:1e3}),s=r(66152),a=r(94720),o=r(22274),l=r(66956),{safeRe:u,t:c,comparatorTrimReplace:d,tildeTrimReplace:h,caretTrimReplace:p}=r(82652),{FLAG_INCLUDE_PRERELEASE:f,FLAG_LOOSE:y}=r(53160),m=e=>"<0.0.0-0"===e.value,g=e=>""===e.value,b=(e,t)=>{let r=!0,n=e.slice(),i=n.pop();for(;r&&n.length;)r=n.every(e=>i.intersects(e,t)),i=n.pop();return r},S=(e,t)=>(o("comp",e,t),o("caret",e=K(e,t)),o("tildes",e=E(e,t)),o("xrange",e=I(e,t)),o("stars",e=A(e,t)),e),v=e=>!e||"x"===e.toLowerCase()||"*"===e,E=(e,t)=>e.trim().split(/\s+/).map(e=>k(e,t)).join(" "),k=(e,t)=>{let r=t.loose?u[c.TILDELOOSE]:u[c.TILDE];return e.replace(r,(t,r,n,i,s)=>{let a;return o("tilde",e,t,r,n,i,s),v(r)?a="":v(n)?a=`>=${r}.0.0 <${+r+1}.0.0-0`:v(i)?a=`>=${r}.${n}.0 <${r}.${+n+1}.0-0`:s?(o("replaceTilde pr",s),a=`>=${r}.${n}.${i}-${s} <${r}.${+n+1}.0-0`):a=`>=${r}.${n}.${i} <${r}.${+n+1}.0-0`,o("tilde return",a),a})},K=(e,t)=>e.trim().split(/\s+/).map(e=>w(e,t)).join(" "),w=(e,t)=>{o("caret",e,t);let r=t.loose?u[c.CARETLOOSE]:u[c.CARET],n=t.includePrerelease?"-0":"";return e.replace(r,(t,r,i,s,a)=>{let l;return o("caret",e,t,r,i,s,a),v(r)?l="":v(i)?l=`>=${r}.0.0${n} <${+r+1}.0.0-0`:v(s)?l="0"===r?`>=${r}.${i}.0${n} <${r}.${+i+1}.0-0`:`>=${r}.${i}.0${n} <${+r+1}.0.0-0`:a?(o("replaceCaret pr",a),l="0"===r?"0"===i?`>=${r}.${i}.${s}-${a} <${r}.${i}.${+s+1}-0`:`>=${r}.${i}.${s}-${a} <${r}.${+i+1}.0-0`:`>=${r}.${i}.${s}-${a} <${+r+1}.0.0-0`):(o("no pr"),l="0"===r?"0"===i?`>=${r}.${i}.${s}${n} <${r}.${i}.${+s+1}-0`:`>=${r}.${i}.${s}${n} <${r}.${+i+1}.0-0`:`>=${r}.${i}.${s} <${+r+1}.0.0-0`),o("caret return",l),l})},I=(e,t)=>(o("replaceXRanges",e,t),e.split(/\s+/).map(e=>x(e,t)).join(" ")),x=(e,t)=>{e=e.trim();let r=t.loose?u[c.XRANGELOOSE]:u[c.XRANGE];return e.replace(r,(r,n,i,s,a,l)=>{o("xRange",e,r,n,i,s,a,l);let u=v(i),c=u||v(s),d=c||v(a);return"="===n&&d&&(n=""),l=t.includePrerelease?"-0":"",u?r=">"===n||"<"===n?"<0.0.0-0":"*":n&&d?(c&&(s=0),a=0,">"===n?(n=">=",c?(i=+i+1,s=0):s=+s+1,a=0):"<="===n&&(n="<",c?i=+i+1:s=+s+1),"<"===n&&(l="-0"),r=`${n+i}.${s}.${a}${l}`):c?r=`>=${i}.0.0${l} <${+i+1}.0.0-0`:d&&(r=`>=${i}.${s}.0${l} <${i}.${+s+1}.0-0`),o("xRange return",r),r})},A=(e,t)=>(o("replaceStars",e,t),e.trim().replace(u[c.STAR],"")),T=(e,t)=>(o("replaceGTE0",e,t),e.trim().replace(u[t.includePrerelease?c.GTE0PRE:c.GTE0],"")),j=e=>(t,r,n,i,s,a,o,l,u,c,d,h,p)=>(r=v(n)?"":v(i)?`>=${n}.0.0${e?"-0":""}`:v(s)?`>=${n}.${i}.0${e?"-0":""}`:a?`>=${r}`:`>=${r}${e?"-0":""}`,l=v(u)?"":v(c)?`<${+u+1}.0.0-0`:v(d)?`<${u}.${+c+1}.0-0`:h?`<=${u}.${c}.${d}-${h}`:e?`<${u}.${c}.${+d+1}-0`:`<=${l}`,`${r} ${l}`.trim()),R=(e,t,r)=>{for(let r=0;r<e.length;r++)if(!e[r].test(t))return!1;if(t.prerelease.length&&!r.includePrerelease){for(let r=0;r<e.length;r++)if(o(e[r].semver),e[r].semver!==a.ANY&&e[r].semver.prerelease.length>0){let n=e[r].semver;if(n.major===t.major&&n.minor===t.minor&&n.patch===t.patch)return!0}return!1}return!0}},66956:(e,t,r)=>{let n=r(22274),{MAX_LENGTH:i,MAX_SAFE_INTEGER:s}=r(53160),{safeRe:a,t:o}=r(82652),l=r(66152),{compareIdentifiers:u}=r(21974);class c{constructor(e,t){if(t=l(t),e instanceof c){if(!!t.loose===e.loose&&!!t.includePrerelease===e.includePrerelease)return e;e=e.version}else if("string"!=typeof e)throw TypeError(`Invalid version. Must be a string. Got type "${typeof e}".`);if(e.length>i)throw TypeError(`version is longer than ${i} characters`);n("SemVer",e,t),this.options=t,this.loose=!!t.loose,this.includePrerelease=!!t.includePrerelease;let r=e.trim().match(t.loose?a[o.LOOSE]:a[o.FULL]);if(!r)throw TypeError(`Invalid Version: ${e}`);if(this.raw=e,this.major=+r[1],this.minor=+r[2],this.patch=+r[3],this.major>s||this.major<0)throw TypeError("Invalid major version");if(this.minor>s||this.minor<0)throw TypeError("Invalid minor version");if(this.patch>s||this.patch<0)throw TypeError("Invalid patch version");r[4]?this.prerelease=r[4].split(".").map(e=>{if(/^[0-9]+$/.test(e)){let t=+e;if(t>=0&&t<s)return t}return e}):this.prerelease=[],this.build=r[5]?r[5].split("."):[],this.format()}format(){return this.version=`${this.major}.${this.minor}.${this.patch}`,this.prerelease.length&&(this.version+=`-${this.prerelease.join(".")}`),this.version}toString(){return this.version}compare(e){if(n("SemVer.compare",this.version,this.options,e),!(e instanceof c)){if("string"==typeof e&&e===this.version)return 0;e=new c(e,this.options)}return e.version===this.version?0:this.compareMain(e)||this.comparePre(e)}compareMain(e){return e instanceof c||(e=new c(e,this.options)),u(this.major,e.major)||u(this.minor,e.minor)||u(this.patch,e.patch)}comparePre(e){if(e instanceof c||(e=new c(e,this.options)),this.prerelease.length&&!e.prerelease.length)return -1;if(!this.prerelease.length&&e.prerelease.length)return 1;if(!this.prerelease.length&&!e.prerelease.length)return 0;let t=0;do{let r=this.prerelease[t],i=e.prerelease[t];if(n("prerelease compare",t,r,i),void 0===r&&void 0===i)return 0;if(void 0===i)return 1;if(void 0===r)return -1;if(r===i)continue;else return u(r,i)}while(++t)}compareBuild(e){e instanceof c||(e=new c(e,this.options));let t=0;do{let r=this.build[t],i=e.build[t];if(n("prerelease compare",t,r,i),void 0===r&&void 0===i)return 0;if(void 0===i)return 1;if(void 0===r)return -1;if(r===i)continue;else return u(r,i)}while(++t)}inc(e,t,r){switch(e){case"premajor":this.prerelease.length=0,this.patch=0,this.minor=0,this.major++,this.inc("pre",t,r);break;case"preminor":this.prerelease.length=0,this.patch=0,this.minor++,this.inc("pre",t,r);break;case"prepatch":this.prerelease.length=0,this.inc("patch",t,r),this.inc("pre",t,r);break;case"prerelease":0===this.prerelease.length&&this.inc("patch",t,r),this.inc("pre",t,r);break;case"major":(0!==this.minor||0!==this.patch||0===this.prerelease.length)&&this.major++,this.minor=0,this.patch=0,this.prerelease=[];break;case"minor":(0!==this.patch||0===this.prerelease.length)&&this.minor++,this.patch=0,this.prerelease=[];break;case"patch":0===this.prerelease.length&&this.patch++,this.prerelease=[];break;case"pre":{let e=Number(r)?1:0;if(!t&&!1===r)throw Error("invalid increment argument: identifier is empty");if(0===this.prerelease.length)this.prerelease=[e];else{let n=this.prerelease.length;for(;--n>=0;)"number"==typeof this.prerelease[n]&&(this.prerelease[n]++,n=-2);if(-1===n){if(t===this.prerelease.join(".")&&!1===r)throw Error("invalid increment argument: identifier already exists");this.prerelease.push(e)}}if(t){let n=[t,e];!1===r&&(n=[t]),0===u(this.prerelease[0],t)?isNaN(this.prerelease[1])&&(this.prerelease=n):this.prerelease=n}break}default:throw Error(`invalid increment argument: ${e}`)}return this.raw=this.format(),this.build.length&&(this.raw+=`+${this.build.join(".")}`),this}}e.exports=c},95967:(e,t,r)=>{let n=r(4469);e.exports=(e,t)=>{let r=n(e.trim().replace(/^[=v]+/,""),t);return r?r.version:null}},1393:(e,t,r)=>{let n=r(16918),i=r(85917),s=r(50222),a=r(33053),o=r(66984),l=r(28967);e.exports=(e,t,r,u)=>{switch(t){case"===":return"object"==typeof e&&(e=e.version),"object"==typeof r&&(r=r.version),e===r;case"!==":return"object"==typeof e&&(e=e.version),"object"==typeof r&&(r=r.version),e!==r;case"":case"=":case"==":return n(e,r,u);case"!=":return i(e,r,u);case">":return s(e,r,u);case">=":return a(e,r,u);case"<":return o(e,r,u);case"<=":return l(e,r,u);default:throw TypeError(`Invalid operator: ${t}`)}}},80686:(e,t,r)=>{let n=r(66956),i=r(4469),{safeRe:s,t:a}=r(82652);e.exports=(e,t)=>{if(e instanceof n)return e;if("number"==typeof e&&(e=String(e)),"string"!=typeof e)return null;let r=null;if((t=t||{}).rtl){let t;for(;(t=s[a.COERCERTL].exec(e))&&(!r||r.index+r[0].length!==e.length);)r&&t.index+t[0].length===r.index+r[0].length||(r=t),s[a.COERCERTL].lastIndex=t.index+t[1].length+t[2].length;s[a.COERCERTL].lastIndex=-1}else r=e.match(s[a.COERCE]);return null===r?null:i(`${r[2]}.${r[3]||"0"}.${r[4]||"0"}`,t)}},51655:(e,t,r)=>{let n=r(66956);e.exports=(e,t,r)=>{let i=new n(e,r),s=new n(t,r);return i.compare(s)||i.compareBuild(s)}},85518:(e,t,r)=>{let n=r(41890);e.exports=(e,t)=>n(e,t,!0)},41890:(e,t,r)=>{let n=r(66956);e.exports=(e,t,r)=>new n(e,r).compare(new n(t,r))},68837:(e,t,r)=>{let n=r(4469);e.exports=(e,t)=>{let r=n(e,null,!0),i=n(t,null,!0),s=r.compare(i);if(0===s)return null;let a=s>0,o=a?r:i,l=a?i:r,u=!!o.prerelease.length,c=!!l.prerelease.length;if(c&&!u)return l.patch||l.minor?o.patch?"patch":o.minor?"minor":"major":"major";let d=u?"pre":"";return r.major!==i.major?d+"major":r.minor!==i.minor?d+"minor":r.patch!==i.patch?d+"patch":"prerelease"}},16918:(e,t,r)=>{let n=r(41890);e.exports=(e,t,r)=>0===n(e,t,r)},50222:(e,t,r)=>{let n=r(41890);e.exports=(e,t,r)=>n(e,t,r)>0},33053:(e,t,r)=>{let n=r(41890);e.exports=(e,t,r)=>n(e,t,r)>=0},60276:(e,t,r)=>{let n=r(66956);e.exports=(e,t,r,i,s)=>{"string"==typeof r&&(s=i,i=r,r=void 0);try{return new n(e instanceof n?e.version:e,r).inc(t,i,s).version}catch(e){return null}}},66984:(e,t,r)=>{let n=r(41890);e.exports=(e,t,r)=>0>n(e,t,r)},28967:(e,t,r)=>{let n=r(41890);e.exports=(e,t,r)=>0>=n(e,t,r)},45408:(e,t,r)=>{let n=r(66956);e.exports=(e,t)=>new n(e,t).major},48462:(e,t,r)=>{let n=r(66956);e.exports=(e,t)=>new n(e,t).minor},85917:(e,t,r)=>{let n=r(41890);e.exports=(e,t,r)=>0!==n(e,t,r)},4469:(e,t,r)=>{let n=r(66956);e.exports=(e,t,r=!1)=>{if(e instanceof n)return e;try{return new n(e,t)}catch(e){if(!r)return null;throw e}}},95065:(e,t,r)=>{let n=r(66956);e.exports=(e,t)=>new n(e,t).patch},98097:(e,t,r)=>{let n=r(4469);e.exports=(e,t)=>{let r=n(e,t);return r&&r.prerelease.length?r.prerelease:null}},75461:(e,t,r)=>{let n=r(41890);e.exports=(e,t,r)=>n(t,e,r)},61835:(e,t,r)=>{let n=r(51655);e.exports=(e,t)=>e.sort((e,r)=>n(r,e,t))},11190:(e,t,r)=>{let Range=r(53703);e.exports=(e,t,r)=>{try{t=new Range(t,r)}catch(e){return!1}return t.test(e)}},83082:(e,t,r)=>{let n=r(51655);e.exports=(e,t)=>e.sort((e,r)=>n(e,r,t))},99525:(e,t,r)=>{let n=r(4469);e.exports=(e,t)=>{let r=n(e,t);return r?r.version:null}},40342:(e,t,r)=>{let n=r(82652),i=r(53160),s=r(66956),a=r(21974),o=r(4469),l=r(99525),u=r(95967),c=r(60276),d=r(68837),h=r(45408),p=r(48462),f=r(95065),y=r(98097),m=r(41890),g=r(75461),b=r(85518),S=r(51655),v=r(83082),E=r(61835),k=r(50222),K=r(66984),w=r(16918),I=r(85917),x=r(33053),A=r(28967),T=r(1393),j=r(80686),R=r(94720),Range=r(53703),_=r(11190),C=r(79288),O=r(59896),P=r(86518),D=r(92078),M=r(52801),N=r(81955),L=r(61649),F=r(12569),V=r(874),J=r(39754),G=r(11900);e.exports={parse:o,valid:l,clean:u,inc:c,diff:d,major:h,minor:p,patch:f,prerelease:y,compare:m,rcompare:g,compareLoose:b,compareBuild:S,sort:v,rsort:E,gt:k,lt:K,eq:w,neq:I,gte:x,lte:A,cmp:T,coerce:j,Comparator:R,Range,satisfies:_,toComparators:C,maxSatisfying:O,minSatisfying:P,minVersion:D,validRange:M,outside:N,gtr:L,ltr:F,intersects:V,simplifyRange:J,subset:G,SemVer:s,re:n.re,src:n.src,tokens:n.t,SEMVER_SPEC_VERSION:i.SEMVER_SPEC_VERSION,RELEASE_TYPES:i.RELEASE_TYPES,compareIdentifiers:a.compareIdentifiers,rcompareIdentifiers:a.rcompareIdentifiers}},53160:e=>{let t=Number.MAX_SAFE_INTEGER||9007199254740991;e.exports={MAX_LENGTH:256,MAX_SAFE_COMPONENT_LENGTH:16,MAX_SAFE_BUILD_LENGTH:250,MAX_SAFE_INTEGER:t,RELEASE_TYPES:["major","premajor","minor","preminor","patch","prepatch","prerelease"],SEMVER_SPEC_VERSION:"2.0.0",FLAG_INCLUDE_PRERELEASE:1,FLAG_LOOSE:2}},22274:e=>{let t="object"==typeof process&&process.env&&process.env.NODE_DEBUG&&/\bsemver\b/i.test(process.env.NODE_DEBUG)?(...e)=>console.error("SEMVER",...e):()=>{};e.exports=t},21974:e=>{let t=/^[0-9]+$/,r=(e,r)=>{let n=t.test(e),i=t.test(r);return n&&i&&(e=+e,r=+r),e===r?0:n&&!i?-1:i&&!n?1:e<r?-1:1};e.exports={compareIdentifiers:r,rcompareIdentifiers:(e,t)=>r(t,e)}},66152:e=>{let t=Object.freeze({loose:!0}),r=Object.freeze({});e.exports=e=>e?"object"!=typeof e?t:e:r},82652:(e,t,r)=>{let{MAX_SAFE_COMPONENT_LENGTH:n,MAX_SAFE_BUILD_LENGTH:i,MAX_LENGTH:s}=r(53160),a=r(22274);t=e.exports={};let o=t.re=[],l=t.safeRe=[],u=t.src=[],c=t.t={},d=0,h="[a-zA-Z0-9-]",p=[["\\s",1],["\\d",s],[h,i]],f=e=>{for(let[t,r]of p)e=e.split(`${t}*`).join(`${t}{0,${r}}`).split(`${t}+`).join(`${t}{1,${r}}`);return e},y=(e,t,r)=>{let n=f(t),i=d++;a(e,i,t),c[e]=i,u[i]=t,o[i]=new RegExp(t,r?"g":void 0),l[i]=new RegExp(n,r?"g":void 0)};y("NUMERICIDENTIFIER","0|[1-9]\\d*"),y("NUMERICIDENTIFIERLOOSE","\\d+"),y("NONNUMERICIDENTIFIER",`\\d*[a-zA-Z-]${h}*`),y("MAINVERSION",`(${u[c.NUMERICIDENTIFIER]})\\.(${u[c.NUMERICIDENTIFIER]})\\.(${u[c.NUMERICIDENTIFIER]})`),y("MAINVERSIONLOOSE",`(${u[c.NUMERICIDENTIFIERLOOSE]})\\.(${u[c.NUMERICIDENTIFIERLOOSE]})\\.(${u[c.NUMERICIDENTIFIERLOOSE]})`),y("PRERELEASEIDENTIFIER",`(?:${u[c.NUMERICIDENTIFIER]}|${u[c.NONNUMERICIDENTIFIER]})`),y("PRERELEASEIDENTIFIERLOOSE",`(?:${u[c.NUMERICIDENTIFIERLOOSE]}|${u[c.NONNUMERICIDENTIFIER]})`),y("PRERELEASE",`(?:-(${u[c.PRERELEASEIDENTIFIER]}(?:\\.${u[c.PRERELEASEIDENTIFIER]})*))`),y("PRERELEASELOOSE",`(?:-?(${u[c.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${u[c.PRERELEASEIDENTIFIERLOOSE]})*))`),y("BUILDIDENTIFIER",`${h}+`),y("BUILD",`(?:\\+(${u[c.BUILDIDENTIFIER]}(?:\\.${u[c.BUILDIDENTIFIER]})*))`),y("FULLPLAIN",`v?${u[c.MAINVERSION]}${u[c.PRERELEASE]}?${u[c.BUILD]}?`),y("FULL",`^${u[c.FULLPLAIN]}$`),y("LOOSEPLAIN",`[v=\\s]*${u[c.MAINVERSIONLOOSE]}${u[c.PRERELEASELOOSE]}?${u[c.BUILD]}?`),y("LOOSE",`^${u[c.LOOSEPLAIN]}$`),y("GTLT","((?:<|>)?=?)"),y("XRANGEIDENTIFIERLOOSE",`${u[c.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`),y("XRANGEIDENTIFIER",`${u[c.NUMERICIDENTIFIER]}|x|X|\\*`),y("XRANGEPLAIN",`[v=\\s]*(${u[c.XRANGEIDENTIFIER]})(?:\\.(${u[c.XRANGEIDENTIFIER]})(?:\\.(${u[c.XRANGEIDENTIFIER]})(?:${u[c.PRERELEASE]})?${u[c.BUILD]}?)?)?`),y("XRANGEPLAINLOOSE",`[v=\\s]*(${u[c.XRANGEIDENTIFIERLOOSE]})(?:\\.(${u[c.XRANGEIDENTIFIERLOOSE]})(?:\\.(${u[c.XRANGEIDENTIFIERLOOSE]})(?:${u[c.PRERELEASELOOSE]})?${u[c.BUILD]}?)?)?`),y("XRANGE",`^${u[c.GTLT]}\\s*${u[c.XRANGEPLAIN]}$`),y("XRANGELOOSE",`^${u[c.GTLT]}\\s*${u[c.XRANGEPLAINLOOSE]}$`),y("COERCE",`(^|[^\\d])(\\d{1,${n}})(?:\\.(\\d{1,${n}}))?(?:\\.(\\d{1,${n}}))?(?:$|[^\\d])`),y("COERCERTL",u[c.COERCE],!0),y("LONETILDE","(?:~>?)"),y("TILDETRIM",`(\\s*)${u[c.LONETILDE]}\\s+`,!0),t.tildeTrimReplace="$1~",y("TILDE",`^${u[c.LONETILDE]}${u[c.XRANGEPLAIN]}$`),y("TILDELOOSE",`^${u[c.LONETILDE]}${u[c.XRANGEPLAINLOOSE]}$`),y("LONECARET","(?:\\^)"),y("CARETTRIM",`(\\s*)${u[c.LONECARET]}\\s+`,!0),t.caretTrimReplace="$1^",y("CARET",`^${u[c.LONECARET]}${u[c.XRANGEPLAIN]}$`),y("CARETLOOSE",`^${u[c.LONECARET]}${u[c.XRANGEPLAINLOOSE]}$`),y("COMPARATORLOOSE",`^${u[c.GTLT]}\\s*(${u[c.LOOSEPLAIN]})$|^$`),y("COMPARATOR",`^${u[c.GTLT]}\\s*(${u[c.FULLPLAIN]})$|^$`),y("COMPARATORTRIM",`(\\s*)${u[c.GTLT]}\\s*(${u[c.LOOSEPLAIN]}|${u[c.XRANGEPLAIN]})`,!0),t.comparatorTrimReplace="$1$2$3",y("HYPHENRANGE",`^\\s*(${u[c.XRANGEPLAIN]})\\s+-\\s+(${u[c.XRANGEPLAIN]})\\s*$`),y("HYPHENRANGELOOSE",`^\\s*(${u[c.XRANGEPLAINLOOSE]})\\s+-\\s+(${u[c.XRANGEPLAINLOOSE]})\\s*$`),y("STAR","(<|>)?=?\\s*\\*"),y("GTE0","^\\s*>=\\s*0\\.0\\.0\\s*$"),y("GTE0PRE","^\\s*>=\\s*0\\.0\\.0-0\\s*$")},61649:(e,t,r)=>{let n=r(81955);e.exports=(e,t,r)=>n(e,t,">",r)},874:(e,t,r)=>{let Range=r(53703);e.exports=(e,t,r)=>(e=new Range(e,r),t=new Range(t,r),e.intersects(t,r))},12569:(e,t,r)=>{let n=r(81955);e.exports=(e,t,r)=>n(e,t,"<",r)},59896:(e,t,r)=>{let n=r(66956),Range=r(53703);e.exports=(e,t,r)=>{let i=null,s=null,a=null;try{a=new Range(t,r)}catch(e){return null}return e.forEach(e=>{a.test(e)&&(!i||-1===s.compare(e))&&(s=new n(i=e,r))}),i}},86518:(e,t,r)=>{let n=r(66956),Range=r(53703);e.exports=(e,t,r)=>{let i=null,s=null,a=null;try{a=new Range(t,r)}catch(e){return null}return e.forEach(e=>{a.test(e)&&(!i||1===s.compare(e))&&(s=new n(i=e,r))}),i}},92078:(e,t,r)=>{let n=r(66956),Range=r(53703),i=r(50222);e.exports=(e,t)=>{e=new Range(e,t);let r=new n("0.0.0");if(e.test(r)||(r=new n("0.0.0-0"),e.test(r)))return r;r=null;for(let t=0;t<e.set.length;++t){let s=e.set[t],a=null;s.forEach(e=>{let t=new n(e.semver.version);switch(e.operator){case">":0===t.prerelease.length?t.patch++:t.prerelease.push(0),t.raw=t.format();case"":case">=":(!a||i(t,a))&&(a=t);break;case"<":case"<=":break;default:throw Error(`Unexpected operation: ${e.operator}`)}}),a&&(!r||i(r,a))&&(r=a)}return r&&e.test(r)?r:null}},81955:(e,t,r)=>{let n=r(66956),i=r(94720),{ANY:s}=i,Range=r(53703),a=r(11190),o=r(50222),l=r(66984),u=r(28967),c=r(33053);e.exports=(e,t,r,d)=>{let h,p,f,y,m;switch(e=new n(e,d),t=new Range(t,d),r){case">":h=o,p=u,f=l,y=">",m=">=";break;case"<":h=l,p=c,f=o,y="<",m="<=";break;default:throw TypeError('Must provide a hilo val of "<" or ">"')}if(a(e,t,d))return!1;for(let r=0;r<t.set.length;++r){let n=t.set[r],a=null,o=null;if(n.forEach(e=>{e.semver===s&&(e=new i(">=0.0.0")),a=a||e,o=o||e,h(e.semver,a.semver,d)?a=e:f(e.semver,o.semver,d)&&(o=e)}),a.operator===y||a.operator===m||(!o.operator||o.operator===y)&&p(e,o.semver)||o.operator===m&&f(e,o.semver))return!1}return!0}},39754:(e,t,r)=>{let n=r(11190),i=r(41890);e.exports=(e,t,r)=>{let s=[],a=null,o=null,l=e.sort((e,t)=>i(e,t,r));for(let e of l){let i=n(e,t,r);i?(o=e,a||(a=e)):(o&&s.push([a,o]),o=null,a=null)}a&&s.push([a,null]);let u=[];for(let[e,t]of s)e===t?u.push(e):t||e!==l[0]?t?e===l[0]?u.push(`<=${t}`):u.push(`${e} - ${t}`):u.push(`>=${e}`):u.push("*");let c=u.join(" || "),d="string"==typeof t.raw?t.raw:String(t);return c.length<d.length?c:t}},11900:(e,t,r)=>{let Range=r(53703),n=r(94720),{ANY:i}=n,s=r(11190),a=r(41890),o=[new n(">=0.0.0-0")],l=[new n(">=0.0.0")],u=(e,t,r)=>{let n,u,h,p,f,y,m;if(e===t)return!0;if(1===e.length&&e[0].semver===i){if(1===t.length&&t[0].semver===i)return!0;e=r.includePrerelease?o:l}if(1===t.length&&t[0].semver===i){if(r.includePrerelease)return!0;t=l}let g=new Set;for(let t of e)">"===t.operator||">="===t.operator?n=c(n,t,r):"<"===t.operator||"<="===t.operator?u=d(u,t,r):g.add(t.semver);if(g.size>1||n&&u&&((h=a(n.semver,u.semver,r))>0||0===h&&(">="!==n.operator||"<="!==u.operator)))return null;for(let e of g){if(n&&!s(e,String(n),r)||u&&!s(e,String(u),r))return null;for(let n of t)if(!s(e,String(n),r))return!1;return!0}let b=!!u&&!r.includePrerelease&&!!u.semver.prerelease.length&&u.semver,S=!!n&&!r.includePrerelease&&!!n.semver.prerelease.length&&n.semver;for(let e of(b&&1===b.prerelease.length&&"<"===u.operator&&0===b.prerelease[0]&&(b=!1),t)){if(m=m||">"===e.operator||">="===e.operator,y=y||"<"===e.operator||"<="===e.operator,n){if(S&&e.semver.prerelease&&e.semver.prerelease.length&&e.semver.major===S.major&&e.semver.minor===S.minor&&e.semver.patch===S.patch&&(S=!1),">"===e.operator||">="===e.operator){if((p=c(n,e,r))===e&&p!==n)return!1}else if(">="===n.operator&&!s(n.semver,String(e),r))return!1}if(u){if(b&&e.semver.prerelease&&e.semver.prerelease.length&&e.semver.major===b.major&&e.semver.minor===b.minor&&e.semver.patch===b.patch&&(b=!1),"<"===e.operator||"<="===e.operator){if((f=d(u,e,r))===e&&f!==u)return!1}else if("<="===u.operator&&!s(u.semver,String(e),r))return!1}if(!e.operator&&(u||n)&&0!==h)return!1}return(!n||!y||!!u||0===h)&&(!u||!m||!!n||0===h)&&!S&&!b},c=(e,t,r)=>{if(!e)return t;let n=a(e.semver,t.semver,r);return n>0?e:n<0?t:">"===t.operator&&">="===e.operator?t:e},d=(e,t,r)=>{if(!e)return t;let n=a(e.semver,t.semver,r);return n<0?e:n>0?t:"<"===t.operator&&"<="===e.operator?t:e};e.exports=(e,t,r={})=>{if(e===t)return!0;e=new Range(e,r),t=new Range(t,r);let n=!1;t:for(let i of e.set){for(let e of t.set){let t=u(i,e,r);if(n=n||null!==t,t)continue t}if(n)return!1}return!0}},79288:(e,t,r)=>{let Range=r(53703);e.exports=(e,t)=>new Range(e,t).set.map(e=>e.map(e=>e.value).join(" ").trim().split(" "))},52801:(e,t,r)=>{let Range=r(53703);e.exports=(e,t)=>{try{return new Range(e,t).range||"*"}catch(e){return null}}},13534:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0});let n=r(6737);function i(e){setTimeout(function(){throw e},0)}t.default=function(e,t,r){return"function"==typeof t&&e.then(e=>{let s;(s=void 0!==r&&Object(r).spread&&Array.isArray(e)?n.tryCatch(t).apply(void 0,[null].concat(e)):void 0===e?n.tryCatch(t)(null):n.tryCatch(t)(null,e))===n.errorObj&&i(s.e)},e=>{if(!e){let t=Error(e+"");Object.assign(t,{cause:e}),e=t}let r=n.tryCatch(t)(e);r===n.errorObj&&i(r.e)}),e}},6737:(e,t)=>{let r;function n(e,n){try{let e=r;return r=null,e.apply(this,arguments)}catch(e){return t.errorObj.e=e,t.errorObj}}Object.defineProperty(t,"__esModule",{value:!0}),t.tryCatch=t.errorObj=void 0,t.errorObj={e:{}},t.tryCatch=function(e){return r=e,n}},56421:(e,t,r)=>{let n;let i=r(22037),s=r(76224),a=r(70145),{env:o}=process;function l(e){return 0!==e&&{level:e,hasBasic:!0,has256:e>=2,has16m:e>=3}}function u(e,t){if(0===n)return 0;if(a("color=16m")||a("color=full")||a("color=truecolor"))return 3;if(a("color=256"))return 2;if(e&&!t&&void 0===n)return 0;let r=n||0;if("dumb"===o.TERM)return r;if("win32"===process.platform){let e=i.release().split(".");return Number(e[0])>=10&&Number(e[2])>=10586?Number(e[2])>=14931?3:2:1}if("CI"in o)return["TRAVIS","CIRCLECI","APPVEYOR","GITLAB_CI","GITHUB_ACTIONS","BUILDKITE"].some(e=>e in o)||"codeship"===o.CI_NAME?1:r;if("TEAMCITY_VERSION"in o)return/^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(o.TEAMCITY_VERSION)?1:0;if("truecolor"===o.COLORTERM)return 3;if("TERM_PROGRAM"in o){let e=parseInt((o.TERM_PROGRAM_VERSION||"").split(".")[0],10);switch(o.TERM_PROGRAM){case"iTerm.app":return e>=3?3:2;case"Apple_Terminal":return 2}}return/-256(color)?$/i.test(o.TERM)?2:/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(o.TERM)||"COLORTERM"in o?1:r}a("no-color")||a("no-colors")||a("color=false")||a("color=never")?n=0:(a("color")||a("colors")||a("color=true")||a("color=always"))&&(n=1),"FORCE_COLOR"in o&&(n="true"===o.FORCE_COLOR?1:"false"===o.FORCE_COLOR?0:0===o.FORCE_COLOR.length?1:Math.min(parseInt(o.FORCE_COLOR,10),3)),e.exports={supportsColor:function(e){let t=u(e,e&&e.isTTY);return l(t)},stdout:l(u(!0,s.isatty(1))),stderr:l(u(!0,s.isatty(2)))}},91822:(e,t,r)=>{/*!
 * to-regex-range <https://github.com/micromatch/to-regex-range>
 *
 * Copyright (c) 2015-present, Jon Schlinkert.
 * Released under the MIT License.
 */let n=r(11821),i=(e,t,r)=>{if(!1===n(e))throw TypeError("toRegexRange: expected the first argument to be a number");if(void 0===t||e===t)return String(e);if(!1===n(t))throw TypeError("toRegexRange: expected the second argument to be a number.");let o={relaxZeros:!0,...r};"boolean"==typeof o.strictZeros&&(o.relaxZeros=!1===o.strictZeros);let l=e+":"+t+"="+String(o.relaxZeros)+String(o.shorthand)+String(o.capture)+String(o.wrap);if(i.cache.hasOwnProperty(l))return i.cache[l].result;let u=Math.min(e,t),c=Math.max(e,t);if(1===Math.abs(u-c)){let r=e+"|"+t;return o.capture?`(${r})`:!1===o.wrap?r:`(?:${r})`}let d=h(e)||h(t),p={min:e,max:t,a:u,b:c},f=[],y=[];return d&&(p.isPadded=d,p.maxLen=String(p.max).length),u<0&&(y=s(c<0?Math.abs(c):1,Math.abs(u),p,o),u=p.a=0),c>=0&&(f=s(u,c,p,o)),p.negatives=y,p.positives=f,p.result=function(e,t,r){let n=a(e,t,"-",!1,r)||[],i=a(t,e,"",!1,r)||[],s=a(e,t,"-?",!0,r)||[];return n.concat(s).concat(i).join("|")}(y,f,o),!0===o.capture?p.result=`(${p.result})`:!1!==o.wrap&&f.length+y.length>1&&(p.result=`(?:${p.result})`),i.cache[l]=p,p.result};function s(e,t,r,n){let i,s=function(e,t){let r=1,n=1,i=u(e,1),s=new Set([t]);for(;e<=i&&i<=t;)s.add(i),r+=1,i=u(e,r);for(i=c(t+1,n)-1;e<i&&i<=t;)s.add(i),n+=1,i=c(t+1,n)-1;return(s=[...s]).sort(o),s}(e,t),a=[],l=e;for(let e=0;e<s.length;e++){let t=s[e],o=function(e,t,r){if(e===t)return{pattern:e,count:[],digits:0};let n=function(e,t){let r=[];for(let n=0;n<e.length;n++)r.push([e[n],t[n]]);return r}(e,t),i=n.length,s="",a=0;for(let e=0;e<i;e++){let[t,r]=n[e];t===r?s+=t:"0"!==t||"9"!==r?s+=`[${t}${r-t==1?"":"-"}${r}]`:a++}return a&&(s+=!0===r.shorthand?"\\d":"[0-9]"),{pattern:s,count:[a],digits:i}}(String(l),String(t),n),u="";if(!r.isPadded&&i&&i.pattern===o.pattern){i.count.length>1&&i.count.pop(),i.count.push(o.count[0]),i.string=i.pattern+d(i.count),l=t+1;continue}r.isPadded&&(u=function(e,t,r){if(!t.isPadded)return e;let n=Math.abs(t.maxLen-String(e).length),i=!1!==r.relaxZeros;switch(n){case 0:return"";case 1:return i?"0?":"0";case 2:return i?"0{0,2}":"00";default:return i?`0{0,${n}}`:`0{${n}}`}}(t,r,n)),o.string=u+o.pattern+d(o.count),a.push(o),l=t+1,i=o}return a}function a(e,t,r,n,i){let s=[];for(let i of e){let{string:e}=i;n||l(t,"string",e)||s.push(r+e),n&&l(t,"string",e)&&s.push(r+e)}return s}function o(e,t){return e>t?1:t>e?-1:0}function l(e,t,r){return e.some(e=>e[t]===r)}function u(e,t){return Number(String(e).slice(0,-t)+"9".repeat(t))}function c(e,t){return e-e%Math.pow(10,t)}function d(e){let[t=0,r=""]=e;return r||t>1?`{${t+(r?","+r:"")}}`:""}function h(e){return/^-?(0+)\d/.test(e)}i.cache={},i.clearCache=()=>i.cache={},e.exports=i},7281:e=>{e.exports=function(e){e.prototype[Symbol.iterator]=function*(){for(let e=this.head;e;e=e.next)yield e.value}}},57242:(e,t,r)=>{function n(e){var t=this;if(t instanceof n||(t=new n),t.tail=null,t.head=null,t.length=0,e&&"function"==typeof e.forEach)e.forEach(function(e){t.push(e)});else if(arguments.length>0)for(var r=0,i=arguments.length;r<i;r++)t.push(arguments[r]);return t}function Node(e,t,r,n){if(!(this instanceof Node))return new Node(e,t,r,n);this.list=n,this.value=e,t?(t.next=this,this.prev=t):this.prev=null,r?(r.prev=this,this.next=r):this.next=null}e.exports=n,n.Node=Node,n.create=n,n.prototype.removeNode=function(e){if(e.list!==this)throw Error("removing node which does not belong to this list");var t=e.next,r=e.prev;return t&&(t.prev=r),r&&(r.next=t),e===this.head&&(this.head=t),e===this.tail&&(this.tail=r),e.list.length--,e.next=null,e.prev=null,e.list=null,t},n.prototype.unshiftNode=function(e){if(e!==this.head){e.list&&e.list.removeNode(e);var t=this.head;e.list=this,e.next=t,t&&(t.prev=e),this.head=e,this.tail||(this.tail=e),this.length++}},n.prototype.pushNode=function(e){if(e!==this.tail){e.list&&e.list.removeNode(e);var t=this.tail;e.list=this,e.prev=t,t&&(t.next=e),this.tail=e,this.head||(this.head=e),this.length++}},n.prototype.push=function(){for(var e,t=0,r=arguments.length;t<r;t++)e=arguments[t],this.tail=new Node(e,this.tail,null,this),this.head||(this.head=this.tail),this.length++;return this.length},n.prototype.unshift=function(){for(var e,t=0,r=arguments.length;t<r;t++)e=arguments[t],this.head=new Node(e,null,this.head,this),this.tail||(this.tail=this.head),this.length++;return this.length},n.prototype.pop=function(){if(this.tail){var e=this.tail.value;return this.tail=this.tail.prev,this.tail?this.tail.next=null:this.head=null,this.length--,e}},n.prototype.shift=function(){if(this.head){var e=this.head.value;return this.head=this.head.next,this.head?this.head.prev=null:this.tail=null,this.length--,e}},n.prototype.forEach=function(e,t){t=t||this;for(var r=this.head,n=0;null!==r;n++)e.call(t,r.value,n,this),r=r.next},n.prototype.forEachReverse=function(e,t){t=t||this;for(var r=this.tail,n=this.length-1;null!==r;n--)e.call(t,r.value,n,this),r=r.prev},n.prototype.get=function(e){for(var t=0,r=this.head;null!==r&&t<e;t++)r=r.next;if(t===e&&null!==r)return r.value},n.prototype.getReverse=function(e){for(var t=0,r=this.tail;null!==r&&t<e;t++)r=r.prev;if(t===e&&null!==r)return r.value},n.prototype.map=function(e,t){t=t||this;for(var r=new n,i=this.head;null!==i;)r.push(e.call(t,i.value,this)),i=i.next;return r},n.prototype.mapReverse=function(e,t){t=t||this;for(var r=new n,i=this.tail;null!==i;)r.push(e.call(t,i.value,this)),i=i.prev;return r},n.prototype.reduce=function(e,t){var r,n=this.head;if(arguments.length>1)r=t;else if(this.head)n=this.head.next,r=this.head.value;else throw TypeError("Reduce of empty list with no initial value");for(var i=0;null!==n;i++)r=e(r,n.value,i),n=n.next;return r},n.prototype.reduceReverse=function(e,t){var r,n=this.tail;if(arguments.length>1)r=t;else if(this.tail)n=this.tail.prev,r=this.tail.value;else throw TypeError("Reduce of empty list with no initial value");for(var i=this.length-1;null!==n;i--)r=e(r,n.value,i),n=n.prev;return r},n.prototype.toArray=function(){for(var e=Array(this.length),t=0,r=this.head;null!==r;t++)e[t]=r.value,r=r.next;return e},n.prototype.toArrayReverse=function(){for(var e=Array(this.length),t=0,r=this.tail;null!==r;t++)e[t]=r.value,r=r.prev;return e},n.prototype.slice=function(e,t){(t=t||this.length)<0&&(t+=this.length),(e=e||0)<0&&(e+=this.length);var r=new n;if(t<e||t<0)return r;e<0&&(e=0),t>this.length&&(t=this.length);for(var i=0,s=this.head;null!==s&&i<e;i++)s=s.next;for(;null!==s&&i<t;i++,s=s.next)r.push(s.value);return r},n.prototype.sliceReverse=function(e,t){(t=t||this.length)<0&&(t+=this.length),(e=e||0)<0&&(e+=this.length);var r=new n;if(t<e||t<0)return r;e<0&&(e=0),t>this.length&&(t=this.length);for(var i=this.length,s=this.tail;null!==s&&i>t;i--)s=s.prev;for(;null!==s&&i>e;i--,s=s.prev)r.push(s.value);return r},n.prototype.splice=function(e,t,...r){e>this.length&&(e=this.length-1),e<0&&(e=this.length+e);for(var n=0,i=this.head;null!==i&&n<e;n++)i=i.next;for(var s=[],n=0;i&&n<t;n++)s.push(i.value),i=this.removeNode(i);null===i&&(i=this.tail),i!==this.head&&i!==this.tail&&(i=i.prev);for(var n=0;n<r.length;n++)i=function(e,t,r){var n=t===e.head?new Node(r,null,t,e):new Node(r,t,t.next,e);return null===n.next&&(e.tail=n),null===n.prev&&(e.head=n),e.length++,n}(this,i,r[n]);return s},n.prototype.reverse=function(){for(var e=this.head,t=this.tail,r=e;null!==r;r=r.prev){var n=r.prev;r.prev=r.next,r.next=n}return this.head=t,this.tail=e,this};try{r(7281)(n)}catch(e){}},87175:(e,t,r)=>{function n(e,t){var r={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&0>t.indexOf(n)&&(r[n]=e[n]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols)for(var i=0,n=Object.getOwnPropertySymbols(e);i<n.length;i++)0>t.indexOf(n[i])&&Object.prototype.propertyIsEnumerable.call(e,n[i])&&(r[n[i]]=e[n[i]]);return r}r.d(t,{_T:()=>n}),Object.create,Object.create,"function"==typeof SuppressedError&&SuppressedError},18262:e=>{e.exports=JSON.parse('{"acl":{"arity":-2,"flags":[],"keyStart":0,"keyStop":0,"step":0},"append":{"arity":3,"flags":["write","denyoom","fast"],"keyStart":1,"keyStop":1,"step":1},"asking":{"arity":1,"flags":["fast"],"keyStart":0,"keyStop":0,"step":0},"auth":{"arity":-2,"flags":["noscript","loading","stale","fast","no_auth","allow_busy"],"keyStart":0,"keyStop":0,"step":0},"bgrewriteaof":{"arity":1,"flags":["admin","noscript","no_async_loading"],"keyStart":0,"keyStop":0,"step":0},"bgsave":{"arity":-1,"flags":["admin","noscript","no_async_loading"],"keyStart":0,"keyStop":0,"step":0},"bitcount":{"arity":-2,"flags":["readonly"],"keyStart":1,"keyStop":1,"step":1},"bitfield":{"arity":-2,"flags":["write","denyoom"],"keyStart":1,"keyStop":1,"step":1},"bitfield_ro":{"arity":-2,"flags":["readonly","fast"],"keyStart":1,"keyStop":1,"step":1},"bitop":{"arity":-4,"flags":["write","denyoom"],"keyStart":2,"keyStop":-1,"step":1},"bitpos":{"arity":-3,"flags":["readonly"],"keyStart":1,"keyStop":1,"step":1},"blmove":{"arity":6,"flags":["write","denyoom","noscript","blocking"],"keyStart":1,"keyStop":2,"step":1},"blmpop":{"arity":-5,"flags":["write","blocking","movablekeys"],"keyStart":0,"keyStop":0,"step":0},"blpop":{"arity":-3,"flags":["write","noscript","blocking"],"keyStart":1,"keyStop":-2,"step":1},"brpop":{"arity":-3,"flags":["write","noscript","blocking"],"keyStart":1,"keyStop":-2,"step":1},"brpoplpush":{"arity":4,"flags":["write","denyoom","noscript","blocking"],"keyStart":1,"keyStop":2,"step":1},"bzmpop":{"arity":-5,"flags":["write","blocking","movablekeys"],"keyStart":0,"keyStop":0,"step":0},"bzpopmax":{"arity":-3,"flags":["write","noscript","blocking","fast"],"keyStart":1,"keyStop":-2,"step":1},"bzpopmin":{"arity":-3,"flags":["write","noscript","blocking","fast"],"keyStart":1,"keyStop":-2,"step":1},"client":{"arity":-2,"flags":[],"keyStart":0,"keyStop":0,"step":0},"cluster":{"arity":-2,"flags":[],"keyStart":0,"keyStop":0,"step":0},"command":{"arity":-1,"flags":["loading","stale"],"keyStart":0,"keyStop":0,"step":0},"config":{"arity":-2,"flags":[],"keyStart":0,"keyStop":0,"step":0},"copy":{"arity":-3,"flags":["write","denyoom"],"keyStart":1,"keyStop":2,"step":1},"dbsize":{"arity":1,"flags":["readonly","fast"],"keyStart":0,"keyStop":0,"step":0},"debug":{"arity":-2,"flags":["admin","noscript","loading","stale"],"keyStart":0,"keyStop":0,"step":0},"decr":{"arity":2,"flags":["write","denyoom","fast"],"keyStart":1,"keyStop":1,"step":1},"decrby":{"arity":3,"flags":["write","denyoom","fast"],"keyStart":1,"keyStop":1,"step":1},"del":{"arity":-2,"flags":["write"],"keyStart":1,"keyStop":-1,"step":1},"discard":{"arity":1,"flags":["noscript","loading","stale","fast","allow_busy"],"keyStart":0,"keyStop":0,"step":0},"dump":{"arity":2,"flags":["readonly"],"keyStart":1,"keyStop":1,"step":1},"echo":{"arity":2,"flags":["fast"],"keyStart":0,"keyStop":0,"step":0},"eval":{"arity":-3,"flags":["noscript","stale","skip_monitor","no_mandatory_keys","movablekeys"],"keyStart":0,"keyStop":0,"step":0},"eval_ro":{"arity":-3,"flags":["readonly","noscript","stale","skip_monitor","no_mandatory_keys","movablekeys"],"keyStart":0,"keyStop":0,"step":0},"evalsha":{"arity":-3,"flags":["noscript","stale","skip_monitor","no_mandatory_keys","movablekeys"],"keyStart":0,"keyStop":0,"step":0},"evalsha_ro":{"arity":-3,"flags":["readonly","noscript","stale","skip_monitor","no_mandatory_keys","movablekeys"],"keyStart":0,"keyStop":0,"step":0},"exec":{"arity":1,"flags":["noscript","loading","stale","skip_slowlog"],"keyStart":0,"keyStop":0,"step":0},"exists":{"arity":-2,"flags":["readonly","fast"],"keyStart":1,"keyStop":-1,"step":1},"expire":{"arity":-3,"flags":["write","fast"],"keyStart":1,"keyStop":1,"step":1},"expireat":{"arity":-3,"flags":["write","fast"],"keyStart":1,"keyStop":1,"step":1},"expiretime":{"arity":2,"flags":["readonly","fast"],"keyStart":1,"keyStop":1,"step":1},"failover":{"arity":-1,"flags":["admin","noscript","stale"],"keyStart":0,"keyStop":0,"step":0},"fcall":{"arity":-3,"flags":["noscript","stale","skip_monitor","no_mandatory_keys","movablekeys"],"keyStart":0,"keyStop":0,"step":0},"fcall_ro":{"arity":-3,"flags":["readonly","noscript","stale","skip_monitor","no_mandatory_keys","movablekeys"],"keyStart":0,"keyStop":0,"step":0},"flushall":{"arity":-1,"flags":["write"],"keyStart":0,"keyStop":0,"step":0},"flushdb":{"arity":-1,"flags":["write"],"keyStart":0,"keyStop":0,"step":0},"function":{"arity":-2,"flags":[],"keyStart":0,"keyStop":0,"step":0},"geoadd":{"arity":-5,"flags":["write","denyoom"],"keyStart":1,"keyStop":1,"step":1},"geodist":{"arity":-4,"flags":["readonly"],"keyStart":1,"keyStop":1,"step":1},"geohash":{"arity":-2,"flags":["readonly"],"keyStart":1,"keyStop":1,"step":1},"geopos":{"arity":-2,"flags":["readonly"],"keyStart":1,"keyStop":1,"step":1},"georadius":{"arity":-6,"flags":["write","denyoom","movablekeys"],"keyStart":1,"keyStop":1,"step":1},"georadius_ro":{"arity":-6,"flags":["readonly"],"keyStart":1,"keyStop":1,"step":1},"georadiusbymember":{"arity":-5,"flags":["write","denyoom","movablekeys"],"keyStart":1,"keyStop":1,"step":1},"georadiusbymember_ro":{"arity":-5,"flags":["readonly"],"keyStart":1,"keyStop":1,"step":1},"geosearch":{"arity":-7,"flags":["readonly"],"keyStart":1,"keyStop":1,"step":1},"geosearchstore":{"arity":-8,"flags":["write","denyoom"],"keyStart":1,"keyStop":2,"step":1},"get":{"arity":2,"flags":["readonly","fast"],"keyStart":1,"keyStop":1,"step":1},"getbit":{"arity":3,"flags":["readonly","fast"],"keyStart":1,"keyStop":1,"step":1},"getdel":{"arity":2,"flags":["write","fast"],"keyStart":1,"keyStop":1,"step":1},"getex":{"arity":-2,"flags":["write","fast"],"keyStart":1,"keyStop":1,"step":1},"getrange":{"arity":4,"flags":["readonly"],"keyStart":1,"keyStop":1,"step":1},"getset":{"arity":3,"flags":["write","denyoom","fast"],"keyStart":1,"keyStop":1,"step":1},"hdel":{"arity":-3,"flags":["write","fast"],"keyStart":1,"keyStop":1,"step":1},"hello":{"arity":-1,"flags":["noscript","loading","stale","fast","no_auth","allow_busy"],"keyStart":0,"keyStop":0,"step":0},"hexists":{"arity":3,"flags":["readonly","fast"],"keyStart":1,"keyStop":1,"step":1},"hget":{"arity":3,"flags":["readonly","fast"],"keyStart":1,"keyStop":1,"step":1},"hgetall":{"arity":2,"flags":["readonly"],"keyStart":1,"keyStop":1,"step":1},"hincrby":{"arity":4,"flags":["write","denyoom","fast"],"keyStart":1,"keyStop":1,"step":1},"hincrbyfloat":{"arity":4,"flags":["write","denyoom","fast"],"keyStart":1,"keyStop":1,"step":1},"hkeys":{"arity":2,"flags":["readonly"],"keyStart":1,"keyStop":1,"step":1},"hlen":{"arity":2,"flags":["readonly","fast"],"keyStart":1,"keyStop":1,"step":1},"hmget":{"arity":-3,"flags":["readonly","fast"],"keyStart":1,"keyStop":1,"step":1},"hmset":{"arity":-4,"flags":["write","denyoom","fast"],"keyStart":1,"keyStop":1,"step":1},"hrandfield":{"arity":-2,"flags":["readonly"],"keyStart":1,"keyStop":1,"step":1},"hscan":{"arity":-3,"flags":["readonly"],"keyStart":1,"keyStop":1,"step":1},"hset":{"arity":-4,"flags":["write","denyoom","fast"],"keyStart":1,"keyStop":1,"step":1},"hsetnx":{"arity":4,"flags":["write","denyoom","fast"],"keyStart":1,"keyStop":1,"step":1},"hstrlen":{"arity":3,"flags":["readonly","fast"],"keyStart":1,"keyStop":1,"step":1},"hvals":{"arity":2,"flags":["readonly"],"keyStart":1,"keyStop":1,"step":1},"incr":{"arity":2,"flags":["write","denyoom","fast"],"keyStart":1,"keyStop":1,"step":1},"incrby":{"arity":3,"flags":["write","denyoom","fast"],"keyStart":1,"keyStop":1,"step":1},"incrbyfloat":{"arity":3,"flags":["write","denyoom","fast"],"keyStart":1,"keyStop":1,"step":1},"info":{"arity":-1,"flags":["loading","stale"],"keyStart":0,"keyStop":0,"step":0},"keys":{"arity":2,"flags":["readonly"],"keyStart":0,"keyStop":0,"step":0},"lastsave":{"arity":1,"flags":["loading","stale","fast"],"keyStart":0,"keyStop":0,"step":0},"latency":{"arity":-2,"flags":[],"keyStart":0,"keyStop":0,"step":0},"lcs":{"arity":-3,"flags":["readonly"],"keyStart":1,"keyStop":2,"step":1},"lindex":{"arity":3,"flags":["readonly"],"keyStart":1,"keyStop":1,"step":1},"linsert":{"arity":5,"flags":["write","denyoom"],"keyStart":1,"keyStop":1,"step":1},"llen":{"arity":2,"flags":["readonly","fast"],"keyStart":1,"keyStop":1,"step":1},"lmove":{"arity":5,"flags":["write","denyoom"],"keyStart":1,"keyStop":2,"step":1},"lmpop":{"arity":-4,"flags":["write","movablekeys"],"keyStart":0,"keyStop":0,"step":0},"lolwut":{"arity":-1,"flags":["readonly","fast"],"keyStart":0,"keyStop":0,"step":0},"lpop":{"arity":-2,"flags":["write","fast"],"keyStart":1,"keyStop":1,"step":1},"lpos":{"arity":-3,"flags":["readonly"],"keyStart":1,"keyStop":1,"step":1},"lpush":{"arity":-3,"flags":["write","denyoom","fast"],"keyStart":1,"keyStop":1,"step":1},"lpushx":{"arity":-3,"flags":["write","denyoom","fast"],"keyStart":1,"keyStop":1,"step":1},"lrange":{"arity":4,"flags":["readonly"],"keyStart":1,"keyStop":1,"step":1},"lrem":{"arity":4,"flags":["write"],"keyStart":1,"keyStop":1,"step":1},"lset":{"arity":4,"flags":["write","denyoom"],"keyStart":1,"keyStop":1,"step":1},"ltrim":{"arity":4,"flags":["write"],"keyStart":1,"keyStop":1,"step":1},"memory":{"arity":-2,"flags":[],"keyStart":0,"keyStop":0,"step":0},"mget":{"arity":-2,"flags":["readonly","fast"],"keyStart":1,"keyStop":-1,"step":1},"migrate":{"arity":-6,"flags":["write","movablekeys"],"keyStart":3,"keyStop":3,"step":1},"module":{"arity":-2,"flags":[],"keyStart":0,"keyStop":0,"step":0},"monitor":{"arity":1,"flags":["admin","noscript","loading","stale"],"keyStart":0,"keyStop":0,"step":0},"move":{"arity":3,"flags":["write","fast"],"keyStart":1,"keyStop":1,"step":1},"mset":{"arity":-3,"flags":["write","denyoom"],"keyStart":1,"keyStop":-1,"step":2},"msetnx":{"arity":-3,"flags":["write","denyoom"],"keyStart":1,"keyStop":-1,"step":2},"multi":{"arity":1,"flags":["noscript","loading","stale","fast","allow_busy"],"keyStart":0,"keyStop":0,"step":0},"object":{"arity":-2,"flags":[],"keyStart":0,"keyStop":0,"step":0},"persist":{"arity":2,"flags":["write","fast"],"keyStart":1,"keyStop":1,"step":1},"pexpire":{"arity":-3,"flags":["write","fast"],"keyStart":1,"keyStop":1,"step":1},"pexpireat":{"arity":-3,"flags":["write","fast"],"keyStart":1,"keyStop":1,"step":1},"pexpiretime":{"arity":2,"flags":["readonly","fast"],"keyStart":1,"keyStop":1,"step":1},"pfadd":{"arity":-2,"flags":["write","denyoom","fast"],"keyStart":1,"keyStop":1,"step":1},"pfcount":{"arity":-2,"flags":["readonly"],"keyStart":1,"keyStop":-1,"step":1},"pfdebug":{"arity":3,"flags":["write","denyoom","admin"],"keyStart":2,"keyStop":2,"step":1},"pfmerge":{"arity":-2,"flags":["write","denyoom"],"keyStart":1,"keyStop":-1,"step":1},"pfselftest":{"arity":1,"flags":["admin"],"keyStart":0,"keyStop":0,"step":0},"ping":{"arity":-1,"flags":["fast"],"keyStart":0,"keyStop":0,"step":0},"psetex":{"arity":4,"flags":["write","denyoom"],"keyStart":1,"keyStop":1,"step":1},"psubscribe":{"arity":-2,"flags":["pubsub","noscript","loading","stale"],"keyStart":0,"keyStop":0,"step":0},"psync":{"arity":-3,"flags":["admin","noscript","no_async_loading","no_multi"],"keyStart":0,"keyStop":0,"step":0},"pttl":{"arity":2,"flags":["readonly","fast"],"keyStart":1,"keyStop":1,"step":1},"publish":{"arity":3,"flags":["pubsub","loading","stale","fast"],"keyStart":0,"keyStop":0,"step":0},"pubsub":{"arity":-2,"flags":[],"keyStart":0,"keyStop":0,"step":0},"punsubscribe":{"arity":-1,"flags":["pubsub","noscript","loading","stale"],"keyStart":0,"keyStop":0,"step":0},"quit":{"arity":-1,"flags":["noscript","loading","stale","fast","no_auth","allow_busy"],"keyStart":0,"keyStop":0,"step":0},"randomkey":{"arity":1,"flags":["readonly"],"keyStart":0,"keyStop":0,"step":0},"readonly":{"arity":1,"flags":["loading","stale","fast"],"keyStart":0,"keyStop":0,"step":0},"readwrite":{"arity":1,"flags":["loading","stale","fast"],"keyStart":0,"keyStop":0,"step":0},"rename":{"arity":3,"flags":["write"],"keyStart":1,"keyStop":2,"step":1},"renamenx":{"arity":3,"flags":["write","fast"],"keyStart":1,"keyStop":2,"step":1},"replconf":{"arity":-1,"flags":["admin","noscript","loading","stale","allow_busy"],"keyStart":0,"keyStop":0,"step":0},"replicaof":{"arity":3,"flags":["admin","noscript","stale","no_async_loading"],"keyStart":0,"keyStop":0,"step":0},"reset":{"arity":1,"flags":["noscript","loading","stale","fast","no_auth","allow_busy"],"keyStart":0,"keyStop":0,"step":0},"restore":{"arity":-4,"flags":["write","denyoom"],"keyStart":1,"keyStop":1,"step":1},"restore-asking":{"arity":-4,"flags":["write","denyoom","asking"],"keyStart":1,"keyStop":1,"step":1},"role":{"arity":1,"flags":["noscript","loading","stale","fast"],"keyStart":0,"keyStop":0,"step":0},"rpop":{"arity":-2,"flags":["write","fast"],"keyStart":1,"keyStop":1,"step":1},"rpoplpush":{"arity":3,"flags":["write","denyoom"],"keyStart":1,"keyStop":2,"step":1},"rpush":{"arity":-3,"flags":["write","denyoom","fast"],"keyStart":1,"keyStop":1,"step":1},"rpushx":{"arity":-3,"flags":["write","denyoom","fast"],"keyStart":1,"keyStop":1,"step":1},"sadd":{"arity":-3,"flags":["write","denyoom","fast"],"keyStart":1,"keyStop":1,"step":1},"save":{"arity":1,"flags":["admin","noscript","no_async_loading","no_multi"],"keyStart":0,"keyStop":0,"step":0},"scan":{"arity":-2,"flags":["readonly"],"keyStart":0,"keyStop":0,"step":0},"scard":{"arity":2,"flags":["readonly","fast"],"keyStart":1,"keyStop":1,"step":1},"script":{"arity":-2,"flags":[],"keyStart":0,"keyStop":0,"step":0},"sdiff":{"arity":-2,"flags":["readonly"],"keyStart":1,"keyStop":-1,"step":1},"sdiffstore":{"arity":-3,"flags":["write","denyoom"],"keyStart":1,"keyStop":-1,"step":1},"select":{"arity":2,"flags":["loading","stale","fast"],"keyStart":0,"keyStop":0,"step":0},"set":{"arity":-3,"flags":["write","denyoom"],"keyStart":1,"keyStop":1,"step":1},"setbit":{"arity":4,"flags":["write","denyoom"],"keyStart":1,"keyStop":1,"step":1},"setex":{"arity":4,"flags":["write","denyoom"],"keyStart":1,"keyStop":1,"step":1},"setnx":{"arity":3,"flags":["write","denyoom","fast"],"keyStart":1,"keyStop":1,"step":1},"setrange":{"arity":4,"flags":["write","denyoom"],"keyStart":1,"keyStop":1,"step":1},"shutdown":{"arity":-1,"flags":["admin","noscript","loading","stale","no_multi","allow_busy"],"keyStart":0,"keyStop":0,"step":0},"sinter":{"arity":-2,"flags":["readonly"],"keyStart":1,"keyStop":-1,"step":1},"sintercard":{"arity":-3,"flags":["readonly","movablekeys"],"keyStart":0,"keyStop":0,"step":0},"sinterstore":{"arity":-3,"flags":["write","denyoom"],"keyStart":1,"keyStop":-1,"step":1},"sismember":{"arity":3,"flags":["readonly","fast"],"keyStart":1,"keyStop":1,"step":1},"slaveof":{"arity":3,"flags":["admin","noscript","stale","no_async_loading"],"keyStart":0,"keyStop":0,"step":0},"slowlog":{"arity":-2,"flags":[],"keyStart":0,"keyStop":0,"step":0},"smembers":{"arity":2,"flags":["readonly"],"keyStart":1,"keyStop":1,"step":1},"smismember":{"arity":-3,"flags":["readonly","fast"],"keyStart":1,"keyStop":1,"step":1},"smove":{"arity":4,"flags":["write","fast"],"keyStart":1,"keyStop":2,"step":1},"sort":{"arity":-2,"flags":["write","denyoom","movablekeys"],"keyStart":1,"keyStop":1,"step":1},"sort_ro":{"arity":-2,"flags":["readonly","movablekeys"],"keyStart":1,"keyStop":1,"step":1},"spop":{"arity":-2,"flags":["write","fast"],"keyStart":1,"keyStop":1,"step":1},"spublish":{"arity":3,"flags":["pubsub","loading","stale","fast"],"keyStart":1,"keyStop":1,"step":1},"srandmember":{"arity":-2,"flags":["readonly"],"keyStart":1,"keyStop":1,"step":1},"srem":{"arity":-3,"flags":["write","fast"],"keyStart":1,"keyStop":1,"step":1},"sscan":{"arity":-3,"flags":["readonly"],"keyStart":1,"keyStop":1,"step":1},"ssubscribe":{"arity":-2,"flags":["pubsub","noscript","loading","stale"],"keyStart":1,"keyStop":-1,"step":1},"strlen":{"arity":2,"flags":["readonly","fast"],"keyStart":1,"keyStop":1,"step":1},"subscribe":{"arity":-2,"flags":["pubsub","noscript","loading","stale"],"keyStart":0,"keyStop":0,"step":0},"substr":{"arity":4,"flags":["readonly"],"keyStart":1,"keyStop":1,"step":1},"sunion":{"arity":-2,"flags":["readonly"],"keyStart":1,"keyStop":-1,"step":1},"sunionstore":{"arity":-3,"flags":["write","denyoom"],"keyStart":1,"keyStop":-1,"step":1},"sunsubscribe":{"arity":-1,"flags":["pubsub","noscript","loading","stale"],"keyStart":1,"keyStop":-1,"step":1},"swapdb":{"arity":3,"flags":["write","fast"],"keyStart":0,"keyStop":0,"step":0},"sync":{"arity":1,"flags":["admin","noscript","no_async_loading","no_multi"],"keyStart":0,"keyStop":0,"step":0},"time":{"arity":1,"flags":["loading","stale","fast"],"keyStart":0,"keyStop":0,"step":0},"touch":{"arity":-2,"flags":["readonly","fast"],"keyStart":1,"keyStop":-1,"step":1},"ttl":{"arity":2,"flags":["readonly","fast"],"keyStart":1,"keyStop":1,"step":1},"type":{"arity":2,"flags":["readonly","fast"],"keyStart":1,"keyStop":1,"step":1},"unlink":{"arity":-2,"flags":["write","fast"],"keyStart":1,"keyStop":-1,"step":1},"unsubscribe":{"arity":-1,"flags":["pubsub","noscript","loading","stale"],"keyStart":0,"keyStop":0,"step":0},"unwatch":{"arity":1,"flags":["noscript","loading","stale","fast","allow_busy"],"keyStart":0,"keyStop":0,"step":0},"wait":{"arity":3,"flags":["noscript"],"keyStart":0,"keyStop":0,"step":0},"watch":{"arity":-2,"flags":["noscript","loading","stale","fast","allow_busy"],"keyStart":1,"keyStop":-1,"step":1},"xack":{"arity":-4,"flags":["write","fast"],"keyStart":1,"keyStop":1,"step":1},"xadd":{"arity":-5,"flags":["write","denyoom","fast"],"keyStart":1,"keyStop":1,"step":1},"xautoclaim":{"arity":-6,"flags":["write","fast"],"keyStart":1,"keyStop":1,"step":1},"xclaim":{"arity":-6,"flags":["write","fast"],"keyStart":1,"keyStop":1,"step":1},"xdel":{"arity":-3,"flags":["write","fast"],"keyStart":1,"keyStop":1,"step":1},"xgroup":{"arity":-2,"flags":[],"keyStart":0,"keyStop":0,"step":0},"xinfo":{"arity":-2,"flags":[],"keyStart":0,"keyStop":0,"step":0},"xlen":{"arity":2,"flags":["readonly","fast"],"keyStart":1,"keyStop":1,"step":1},"xpending":{"arity":-3,"flags":["readonly"],"keyStart":1,"keyStop":1,"step":1},"xrange":{"arity":-4,"flags":["readonly"],"keyStart":1,"keyStop":1,"step":1},"xread":{"arity":-4,"flags":["readonly","blocking","movablekeys"],"keyStart":0,"keyStop":0,"step":0},"xreadgroup":{"arity":-7,"flags":["write","blocking","movablekeys"],"keyStart":0,"keyStop":0,"step":0},"xrevrange":{"arity":-4,"flags":["readonly"],"keyStart":1,"keyStop":1,"step":1},"xsetid":{"arity":-3,"flags":["write","denyoom","fast"],"keyStart":1,"keyStop":1,"step":1},"xtrim":{"arity":-4,"flags":["write"],"keyStart":1,"keyStop":1,"step":1},"zadd":{"arity":-4,"flags":["write","denyoom","fast"],"keyStart":1,"keyStop":1,"step":1},"zcard":{"arity":2,"flags":["readonly","fast"],"keyStart":1,"keyStop":1,"step":1},"zcount":{"arity":4,"flags":["readonly","fast"],"keyStart":1,"keyStop":1,"step":1},"zdiff":{"arity":-3,"flags":["readonly","movablekeys"],"keyStart":0,"keyStop":0,"step":0},"zdiffstore":{"arity":-4,"flags":["write","denyoom","movablekeys"],"keyStart":1,"keyStop":1,"step":1},"zincrby":{"arity":4,"flags":["write","denyoom","fast"],"keyStart":1,"keyStop":1,"step":1},"zinter":{"arity":-3,"flags":["readonly","movablekeys"],"keyStart":0,"keyStop":0,"step":0},"zintercard":{"arity":-3,"flags":["readonly","movablekeys"],"keyStart":0,"keyStop":0,"step":0},"zinterstore":{"arity":-4,"flags":["write","denyoom","movablekeys"],"keyStart":1,"keyStop":1,"step":1},"zlexcount":{"arity":4,"flags":["readonly","fast"],"keyStart":1,"keyStop":1,"step":1},"zmpop":{"arity":-4,"flags":["write","movablekeys"],"keyStart":0,"keyStop":0,"step":0},"zmscore":{"arity":-3,"flags":["readonly","fast"],"keyStart":1,"keyStop":1,"step":1},"zpopmax":{"arity":-2,"flags":["write","fast"],"keyStart":1,"keyStop":1,"step":1},"zpopmin":{"arity":-2,"flags":["write","fast"],"keyStart":1,"keyStop":1,"step":1},"zrandmember":{"arity":-2,"flags":["readonly"],"keyStart":1,"keyStop":1,"step":1},"zrange":{"arity":-4,"flags":["readonly"],"keyStart":1,"keyStop":1,"step":1},"zrangebylex":{"arity":-4,"flags":["readonly"],"keyStart":1,"keyStop":1,"step":1},"zrangebyscore":{"arity":-4,"flags":["readonly"],"keyStart":1,"keyStop":1,"step":1},"zrangestore":{"arity":-5,"flags":["write","denyoom"],"keyStart":1,"keyStop":2,"step":1},"zrank":{"arity":3,"flags":["readonly","fast"],"keyStart":1,"keyStop":1,"step":1},"zrem":{"arity":-3,"flags":["write","fast"],"keyStart":1,"keyStop":1,"step":1},"zremrangebylex":{"arity":4,"flags":["write"],"keyStart":1,"keyStop":1,"step":1},"zremrangebyrank":{"arity":4,"flags":["write"],"keyStart":1,"keyStop":1,"step":1},"zremrangebyscore":{"arity":4,"flags":["write"],"keyStart":1,"keyStop":1,"step":1},"zrevrange":{"arity":-4,"flags":["readonly"],"keyStart":1,"keyStop":1,"step":1},"zrevrangebylex":{"arity":-4,"flags":["readonly"],"keyStart":1,"keyStop":1,"step":1},"zrevrangebyscore":{"arity":-4,"flags":["readonly"],"keyStart":1,"keyStop":1,"step":1},"zrevrank":{"arity":3,"flags":["readonly","fast"],"keyStart":1,"keyStop":1,"step":1},"zscan":{"arity":-3,"flags":["readonly"],"keyStart":1,"keyStop":1,"step":1},"zscore":{"arity":3,"flags":["readonly","fast"],"keyStart":1,"keyStop":1,"step":1},"zunion":{"arity":-3,"flags":["readonly","movablekeys"],"keyStart":0,"keyStop":0,"step":0},"zunionstore":{"arity":-4,"flags":["write","denyoom","movablekeys"],"keyStart":1,"keyStop":1,"step":1}}')}};