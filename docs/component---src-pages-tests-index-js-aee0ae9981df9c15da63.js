"use strict";(self.webpackChunkWebSite=self.webpackChunkWebSite||[]).push([[6380,8442],{8169:function(e,t,n){var r=n(4942),o=n(45987),c=n(75900),s=n.n(c),i=n(67294),a=n(99541),u=n(85893),l=["bsPrefix","className","striped","bordered","borderless","hover","size","variant","responsive"];function d(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function f(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?d(Object(n),!0).forEach((function(t){(0,r.Z)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):d(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var m=i.forwardRef((function(e,t){var n=e.bsPrefix,r=e.className,c=e.striped,i=e.bordered,d=e.borderless,m=e.hover,p=e.size,h=e.variant,b=e.responsive,v=(0,o.Z)(e,l),E=(0,a.vE)(n,"table"),y=s()(r,E,h&&"".concat(E,"-").concat(h),p&&"".concat(E,"-").concat(p),c&&"".concat(E,"-striped"),i&&"".concat(E,"-bordered"),d&&"".concat(E,"-borderless"),m&&"".concat(E,"-hover")),w=(0,u.jsx)("table",f(f({},v),{},{className:y,ref:t}));if(b){var Z="".concat(E,"-responsive");return"string"==typeof b&&(Z="".concat(Z,"-").concat(b)),(0,u.jsx)("div",{className:Z,children:w})}return w}));t.Z=m},37841:function(e,t,n){n.d(t,{zA:function(){return u},Aj:function(){return d},e5:function(){return f},Xb:function(){return m},QT:function(){return p},UU:function(){return h},MF:function(){return E},oe:function(){return v}});var r,o,c=n(83575),s=n(20400),i=n(43381),a=(0,c.ZF)({apiKey:"AIzaSyBAnWR_MHwMJtAGtisRow9dFPJQ3vUy_Vw",authDomain:"web-server-9d634.firebaseapp.com",databaseURL:"https://web-server-9d634.firebaseio.com",projectId:"web-server-9d634",storageBucket:"web-server-9d634.appspot.com",messagingSenderId:"54819552991",appId:"1:54819552991:web:bf1a4246ed6c35a98ab36a"}),u=function(){return r||(l(),r=(0,s.ad)(a)),r},l=function(){return o||(o=(0,i.v0)()),o},d=function(e){var t=l();return(0,i.Aj)(t,e)},f=function(e,t){return(0,i.e5)(l(),e,t)},m=function(e,t){return(0,i.Xb)(l(),e,t)},p=function(e,t){return(0,s.QT)((0,s.JU)(u(),e,t)).then((function(e){return e.data()}))},h=function(e){return(0,s.PL)((0,s.hJ)(u(),e)).then(b)},b=function(e){var t=[];return e.forEach((function(e){t.push(e.data())})),t},v=function(e,t){return(0,s.oe)((0,s.JU)(u(),e,t))},E=function(e,t){return(0,s.pl)((0,s.JU)(u(),e,t.id),t,{merge:!0})}},73088:function(e,t,n){n.r(t),n.d(t,{default:function(){return p}});var r=n(97326),o=n(94578),c=n(67294),s=n(33639),i=n(20994),a=n(7408),u=n(46594),l=n(8169),d=n(25444),f=n(37841),m=n(37787),p=function(e){function t(t){var n;return(n=e.call(this,t)||this).setUid=n.setUid.bind((0,r.Z)(n)),n.addDocs=n.addDocs.bind((0,r.Z)(n)),n.deleteTest=n.deleteTest.bind((0,r.Z)(n)),n.removeDoc=n.removeDoc.bind((0,r.Z)(n)),n.state={tests:[],uid:""},n}(0,o.Z)(t,e);var n=t.prototype;return n.componentDidMount=function(){"undefined"!=typeof window&&(this.onAuthStateChangedListener=(0,f.Aj)(this.setUid))},n.componentWillUnmount=function(){this.onAuthStateChangedListener()},n.setUid=function(e){e?(this.setState({uid:e.uid}),(0,f.UU)("users/"+this.state.uid+"/tests").then(this.addDocs)):(0,d.navigate)("/login")},n.addDocs=function(e){this.setState({tests:e})},n.removeDoc=function(e){var t=this.state.tests.filter((function(t){return t.id!==e}));this.setState({tests:t})},n.deleteTest=function(e){var t=this,n=e.target.dataset.id;(0,f.oe)("users/"+this.state.uid+"/tests",n).then((function(){t.removeDoc(n)})).catch((function(e){console.error("Error removing document: ",e)}))},n.render=function(){var e=this;return c.createElement(m.Z,{title:"Practice Tests to help you prepare for Microsoft 365 MS-500",description:"Practice Tests to help you prepare for Microsoft 365 MS-500"},c.createElement("main",null,c.createElement(s.Z,null,c.createElement(i.Z,null,c.createElement(a.Z,{xs:10},c.createElement("h1",null,"Tests")),c.createElement(a.Z,{xs:2,className:"text-end"},c.createElement(u.Z,{as:d.Link,to:"/tests/new"},"Start New"))),c.createElement(i.Z,null,c.createElement(a.Z,null,c.createElement(l.Z,{striped:!0,bordered:!0,hover:!0},c.createElement("thead",null,c.createElement("tr",null,c.createElement("th",null,"Course"),c.createElement("th",null,"Number of Questions"),c.createElement("th",null,"Is Complete"),c.createElement("th",null,"Delete"))),c.createElement("tbody",null,this.state.tests.map((function(t,n){return c.createElement("tr",{key:n},c.createElement("td",null,c.createElement(u.Z,{variant:"link",as:d.Link,to:"/course/ms-500/test/?testid="+t.id},"MS-500")),c.createElement("td",null,Object.keys(t.questions).length),c.createElement("td",null,t.isComplete?"Complete":"Incomplete"),c.createElement("td",null,c.createElement(u.Z,{onClick:e.deleteTest,"data-id":t.id},"Delete")))})))))))))},t}(c.Component)}}]);
//# sourceMappingURL=component---src-pages-tests-index-js-aee0ae9981df9c15da63.js.map