!function(){function e(){if(document.body){var e=document.body,t=document.documentElement,a=window.innerHeight,n=e.scrollHeight;if(w=0<=document.compatMode.indexOf("CSS")?t:e,s=e,f.keyboardSupport&&window.addEventListener("keydown",o,!1),p=!0,top!=self)h=!0;else if(n>a&&(e.offsetHeight<=a||t.offsetHeight<=a)){var r=!1;t.style.height="auto",setTimeout(function(){r||t.scrollHeight==document.height||(r=!0,setTimeout(function(){t.style.height=document.height+"px",r=!1},500))},10),w.offsetHeight<=a&&(a=document.createElement("div"),a.style.clear="both",e.appendChild(a))}f.fixedBackground||(e.style.backgroundAttachment="scroll",t.style.backgroundAttachment="scroll")}}function t(e,t,a,o){if(o||(o=1e3),l(t,a),1!=f.accelerationMax){var n=+new Date-k;n<f.accelerationDelta&&(n=(1+30/n)/2,n>1&&(n=Math.min(n,f.accelerationMax),t*=n,a*=n)),k=+new Date}if(b.push({x:t,y:a,lastX:0>t?.99:-.99,lastY:0>a?.99:-.99,start:+new Date}),!y){var r=e===document.body,i=function(n){n=+new Date;for(var l=0,c=0,s=0;s<b.length;s++){var d=b[s],h=n-d.start,m=h>=f.animationTime,p=m?1:h/f.animationTime;f.pulseAlgorithm&&(h=p,h>=1?p=1:0>=h?p=0:(1==f.pulseNormalize&&(f.pulseNormalize/=u(1)),p=u(h))),h=d.x*p-d.lastX>>0,p=d.y*p-d.lastY>>0,l+=h,c+=p,d.lastX+=h,d.lastY+=p,m&&(b.splice(s,1),s--)}r?window.scrollBy(l,c):(l&&(e.scrollLeft+=l),c&&(e.scrollTop+=c)),t||a||(b=[]),b.length?H(i,e,o/f.frameRate+1):y=!1};H(i,e,0),y=!0}}function a(a){p||e();var o=a.target,n=i(o);if(!n||a.defaultPrevented||"embed"===(s.nodeName||"").toLowerCase()||"embed"===(o.nodeName||"").toLowerCase()&&/\.pdf/i.test(o.src))return!0;var o=a.wheelDeltaX||0,r=a.wheelDeltaY||0;o||r||(r=a.wheelDelta||0);var l;return(l=!f.touchpadSupport)&&((l=r)?(l=Math.abs(l),g.push(l),g.shift(),clearTimeout(S),l=!(c(g[0],120)&&c(g[1],120)&&c(g[2],120))):l=void 0),l?!0:(1.2<Math.abs(o)&&(o*=f.stepSize/120),1.2<Math.abs(r)&&(r*=f.stepSize/120),t(n,-o,-r),void a.preventDefault())}function o(e){var a=e.target,o=e.ctrlKey||e.altKey||e.metaKey||e.shiftKey&&e.keyCode!==v.spacebar;if(/input|textarea|select|embed/i.test(a.nodeName)||a.isContentEditable||e.defaultPrevented||o||"button"===(a.nodeName||"").toLowerCase()&&e.keyCode===v.spacebar)return!0;var n;n=a=0;var o=i(s),r=o.clientHeight;switch(o==document.body&&(r=window.innerHeight),e.keyCode){case v.up:n=-f.arrowScroll;break;case v.down:n=f.arrowScroll;break;case v.spacebar:n=e.shiftKey?1:-1,n=-n*r*.9;break;case v.pageup:n=.9*-r;break;case v.pagedown:n=.9*r;break;case v.home:n=-o.scrollTop;break;case v.end:r=o.scrollHeight-o.scrollTop-r,n=r>0?r+10:0;break;case v.left:a=-f.arrowScroll;break;case v.right:a=f.arrowScroll;break;default:return!0}t(o,a,n),e.preventDefault()}function n(e){s=e.target}function r(e,t){for(var a=e.length;a--;)x[D(e[a])]=t;return t}function i(e){var t=[],a=w.scrollHeight;do{var o=x[D(e)];if(o)return r(t,o);if(t.push(e),a===e.scrollHeight){if(!h||w.clientHeight+10<a)return r(t,document.body)}else if(e.clientHeight+10<e.scrollHeight&&(overflow=getComputedStyle(e,"").getPropertyValue("overflow-y"),"scroll"===overflow||"auto"===overflow))return r(t,e)}while(e=e.parentNode)}function l(e,t){e=e>0?1:-1,t=t>0?1:-1,(m.x!==e||m.y!==t)&&(m.x=e,m.y=t,b=[],k=0)}function c(e,t){return Math.floor(e/t)==e/t}function u(e){var t;return e*=f.pulseScale,1>e?t=e-(1-Math.exp(-e)):(t=Math.exp(-1),--e,e=1-Math.exp(-e),t+=e*(1-t)),t*f.pulseNormalize}var s,d={frameRate:150,animationTime:400,stepSize:120,pulseAlgorithm:!0,pulseScale:8,pulseNormalize:1,accelerationDelta:20,accelerationMax:1,keyboardSupport:!0,arrowScroll:50,touchpadSupport:!0,fixedBackground:!0,excluded:""},f=d,h=!1,m={x:0,y:0},p=!1,w=document.documentElement,g=[120,120,120],v={left:37,up:38,right:39,down:40,spacebar:32,pageup:33,pagedown:34,end:35,home:36},f=d,b=[],y=!1,k=+new Date,x={};setInterval(function(){x={}},1e4);var S,D=function(){var e=0;return function(t){return t.uniqueID||(t.uniqueID=e++)}}(),H=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||function(e,t,a){window.setTimeout(e,a||1e3/60)}}(),d=/chrome/i.test(window.navigator.userAgent),M=-1!=navigator.appVersion.indexOf("Mac"),C=null;"onwheel"in document.createElement("div")?C="wheel":"onmousewheel"in document.createElement("div")&&(C="mousewheel"),C&&d&&!M&&(window.addEventListener(C,a,!1),window.addEventListener("mousedown",n,!1),window.addEventListener("load",e,!1))}();