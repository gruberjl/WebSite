(self.webpackChunkWebSite=self.webpackChunkWebSite||[]).push([[3069],{71192:function(t){t.exports=function(){"use strict";function t(t,n){if(t)for(var e in t)({}).hasOwnProperty.call(t,e)&&n(e,t[e])}function n(t){return null==t||0===t.length||0===t.trim().length}var e={unstyled:"p","header-one":"h1","header-two":"h2","header-three":"h3","header-four":"h4","header-five":"h5","header-six":"h6","unordered-list-item":"ul","ordered-list-item":"ol",blockquote:"blockquote",code:"pre"};function r(t){return t&&e[t]}function a(n){var e="";return t(n,(function(t,n){n&&(e+="".concat(t,":").concat(n,";"))})),e}function c(t,n){var e=[];if(n)for(var r=0,a=0,c=t,o=n.trigger||"#",u=n.separator||" ";c.length>0&&a>=0;)if(c[0]===o?(a=0,r=0,c=c.substr(o.length)):(a=c.indexOf(u+o))>=0&&(c=c.substr(a+(u+o).length),r+=a+u.length),a>=0){var s=c.indexOf(u)>=0?c.indexOf(u):c.length,i=c.substr(0,s);i&&i.length>0&&e.push({offset:r,length:i.length+o.length,type:"HASHTAG"}),r+=o.length}return e}function o(t,n){var e=[],r=0,a=t.entityRanges.map((function(t){return{offset:t.offset,length:t.length,key:t.key,type:"ENTITY"}}));return(a=(a=a.concat(c(t.text,n))).sort((function(t,n){return t.offset-n.offset}))).forEach((function(t){t.offset>r&&e.push({start:r,end:t.offset}),e.push({start:t.offset,end:t.offset+t.length,entityKey:t.key,type:t.type}),r=t.offset+t.length})),r<t.text.length&&e.push({start:r,end:t.text.length}),e}function u(t){return!(!(t.entityRanges.length>0)||!n(t.text)&&"atomic"!==t.type)}function s(t){var n=t.text,e=t.inlineStyleRanges,r={BOLD:new Array(n.length),ITALIC:new Array(n.length),UNDERLINE:new Array(n.length),STRIKETHROUGH:new Array(n.length),CODE:new Array(n.length),SUPERSCRIPT:new Array(n.length),SUBSCRIPT:new Array(n.length),COLOR:new Array(n.length),BGCOLOR:new Array(n.length),FONTSIZE:new Array(n.length),FONTFAMILY:new Array(n.length),length:n.length};return e&&e.length>0&&e.forEach((function(t){for(var n=t.offset,e=n+t.length,a=n;a<e;a+=1)0===t.style.indexOf("color-")?r.COLOR[a]=t.style.substring(6):0===t.style.indexOf("bgcolor-")?r.BGCOLOR[a]=t.style.substring(8):0===t.style.indexOf("fontsize-")?r.FONTSIZE[a]=t.style.substring(9):0===t.style.indexOf("fontfamily-")?r.FONTFAMILY[a]=t.style.substring(11):r[t.style]&&(r[t.style][a]=!0)})),r}function i(t,n){var e={};return t.COLOR[n]&&(e.COLOR=t.COLOR[n]),t.BGCOLOR[n]&&(e.BGCOLOR=t.BGCOLOR[n]),t.FONTSIZE[n]&&(e.FONTSIZE=t.FONTSIZE[n]),t.FONTFAMILY[n]&&(e.FONTFAMILY=t.FONTFAMILY[n]),t.UNDERLINE[n]&&(e.UNDERLINE=!0),t.ITALIC[n]&&(e.ITALIC=!0),t.BOLD[n]&&(e.BOLD=!0),t.STRIKETHROUGH[n]&&(e.STRIKETHROUGH=!0),t.CODE[n]&&(e.CODE=!0),t.SUBSCRIPT[n]&&(e.SUBSCRIPT=!0),t.SUPERSCRIPT[n]&&(e.SUPERSCRIPT=!0),e}function h(t,n,e){var r=!0;return e>0&&e<t.length?n.forEach((function(n){r=r&&t[n][e]===t[n][e-1]})):r=!1,r}function f(t,n){return"BOLD"===t?"<strong>".concat(n,"</strong>"):"ITALIC"===t?"<em>".concat(n,"</em>"):"UNDERLINE"===t?"<ins>".concat(n,"</ins>"):"STRIKETHROUGH"===t?"<del>".concat(n,"</del>"):"CODE"===t?"<code>".concat(n,"</code>"):"SUPERSCRIPT"===t?"<sup>".concat(n,"</sup>"):"SUBSCRIPT"===t?"<sub>".concat(n,"</sub>"):n}function l(t){return t&&t.length>0?t.map((function(t){switch(t){case"\n":return"<br>";case"&":return"&amp;";case"<":return"&lt;";case">":return"&gt;";default:return t}})).join(""):""}function O(t,n){if(t&&(t.COLOR||t.BGCOLOR||t.FONTSIZE||t.FONTFAMILY)){var e='style="';return t.COLOR&&(e+="color: ".concat(t.COLOR,";")),t.BGCOLOR&&(e+="background-color: ".concat(t.BGCOLOR,";")),t.FONTSIZE&&(e+="font-size: ".concat(t.FONTSIZE).concat(/^\d+$/.test(t.FONTSIZE)?"px":"",";")),t.FONTFAMILY&&(e+="font-family: ".concat(t.FONTFAMILY,";")),"<span ".concat(e+='"',">").concat(n,"</span>")}return n}function g(t,n,e,r){var a=t[n];if("function"==typeof r){var c=r(a,e);if(c)return c}if("MENTION"===a.type)return'<a href="'.concat(a.data.url,'" class="wysiwyg-mention" data-mention data-value="').concat(a.data.value,'">').concat(e,"</a>");if("LINK"===a.type){var o=a.data.targetOption||"_self";return'<a href="'.concat(a.data.url,'" target="').concat(o,'">').concat(e,"</a>")}if("IMAGE"===a.type){var u=a.data.alignment;return u&&u.length?'<div style="text-align:'.concat(u,';"><img src="').concat(a.data.src,'" alt="').concat(a.data.alt,'" style="height: ').concat(a.data.height,";width: ").concat(a.data.width,'"/></div>'):'<img src="'.concat(a.data.src,'" alt="').concat(a.data.alt,'" style="height: ').concat(a.data.height,";width: ").concat(a.data.width,'"/>')}return"EMBEDDED_LINK"===a.type?'<iframe width="'.concat(a.data.width,'" height="').concat(a.data.height,'" src="').concat(a.data.src,'" frameBorder="0"></iframe>'):e}function p(t,n,e,r){var a=[],c=Array.from(t.text);if(c.length>0)for(var o,u=s(t),f=e;f<r;f+=1)f!==e&&h(u,n,f)?(o.text.push(c[f]),o.end=f+1):(o={styles:i(u,f),text:[c[f]],start:f,end:f+1},a.push(o));return a}function y(t){if(t){for(var n=t,e=0;e<n.length&&" "===t[e];e+=1)n=n.replace(" ","&nbsp;");return n}return t}function d(t){if(t){for(var n=t,e=n.length-1;e>=0&&" "===n[e];e-=1)n="".concat(n.substring(0,e),"&nbsp;").concat(n.substring(e+1));return n}return t}function I(n){var e=n.styles,r=l(n.text);return t(e,(function(t,n){r=f(t,r)})),r}function R(t,n){var e=p(t,["BOLD","ITALIC","UNDERLINE","STRIKETHROUGH","CODE","SUPERSCRIPT","SUBSCRIPT"],n.start,n.end),r="";return e.forEach((function(t){r+=I(t)})),r=O(n.styles,r)}function T(t,n,e,r){var a=[];p(t,["COLOR","BGCOLOR","FONTSIZE","FONTFAMILY"],e.start,e.end).forEach((function(n){a.push(R(t,n))}));var c=a.join("");return"ENTITY"===e.type?void 0!==e.entityKey&&null!==e.entityKey&&(c=g(n,e.entityKey,c,r)):"HASHTAG"===e.type&&(c='<a href="'.concat(c,'" class="wysiwyg-hashtag">').concat(c,"</a>")),c}function E(t,n,e,r){var a=[],c=o(t,e);return c.forEach((function(e,o){var u=T(t,n,e,r);0===o&&(u=y(u)),o===c.length-1&&(u=d(u)),a.push(u)})),a.join("")}function v(t,n,e,c,o){var s=[];if(u(t))s.push(g(n,t.entityRanges[0].key,void 0,o));else{var i=r(t.type);if(i){s.push("<".concat(i));var h=a(t.data);h&&s.push(' style="'.concat(h,'"')),c&&s.push(' dir = "auto"'),s.push(">"),s.push(E(t,n,e,o)),s.push("</".concat(i,">"))}}return s.push("\n"),s.join("")}function L(t){return"unordered-list-item"===t||"ordered-list-item"===t}function C(t,n,e,c,o){var u,s=[],i=[];return t.forEach((function(t){var h=!1;if(u?u.type!==t.type?(s.push("</".concat(r(u.type),">\n")),s.push("<".concat(r(t.type),">\n"))):u.depth===t.depth?i&&i.length>0&&(s.push(C(i,n,e,c,o)),i=[]):(h=!0,i.push(t)):s.push("<".concat(r(t.type),">\n")),!h){s.push("<li");var f=a(t.data);f&&s.push(' style="'.concat(f,'"')),c&&s.push(' dir = "auto"'),s.push(">"),s.push(E(t,n,e,o)),s.push("</li>\n"),u=t}})),i&&i.length>0&&s.push(C(i,n,e,c,o)),s.push("</".concat(r(u.type),">\n")),s.join("")}function S(t,n,e,r){var a=[];if(t){var c=t.blocks,o=t.entityMap;if(c&&c.length>0){var u=[];if(c.forEach((function(t){if(L(t.type))u.push(t);else{if(u.length>0){var c=C(u,o,n,r);a.push(c),u=[]}var s=v(t,o,n,e,r);a.push(s)}})),u.length>0){var s=C(u,o,n,e,r);a.push(s),u=[]}}}return a.join("")}return S}()}}]);
//# sourceMappingURL=90c8f291bf21f78bdda58043d8ce47b2ef651679-2697500acafc6010a057.js.map