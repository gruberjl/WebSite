(self.webpackChunkWebSite=self.webpackChunkWebSite||[]).push([[2357],{62881:function(e){function t(e,t,n){var r,a,o,i,s;function c(){var l=Date.now()-i;l<t&&l>=0?r=setTimeout(c,t-l):(r=null,n||(s=e.apply(o,a),o=a=null))}null==t&&(t=100);var l=function(){o=this,a=arguments,i=Date.now();var l=n&&!r;return r||(r=setTimeout(c,t)),l&&(s=e.apply(o,a),o=a=null),s};return l.clear=function(){r&&(clearTimeout(r),r=null)},l.flush=function(){r&&(s=e.apply(o,a),o=a=null,clearTimeout(r),r=null)},l}t.debounce=t,e.exports=t},19902:function(e,t,n){"use strict";n.d(t,{Z:function(){return J}});var r=n(67294),a=n(4942),o=n(45987),i=n(75900),s=n.n(i),c=n(42586),l=n(77822),u=Math.pow(2,31)-1;function d(e,t,n){var r=n-Date.now();e.current=r<=u?setTimeout(t,r):setTimeout((function(){return d(e,t,n)}),u)}function h(){var e=(0,c.Z)(),t=(0,r.useRef)();return(0,l.Z)((function(){return clearTimeout(t.current)})),(0,r.useMemo)((function(){var n=function(){return clearTimeout(t.current)};return{set:function(r,a){void 0===a&&(a=0),e()&&(n(),a<=u?t.current=setTimeout(r,a):d(t,r,Date.now()+a))},clear:n}}),[])}var p,f=n(5160),m=n(563),b=n(85893);function g(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function v(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?g(Object(n),!0).forEach((function(t){(0,a.Z)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):g(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var y=(p={},(0,a.Z)(p,f.d0,"showing"),(0,a.Z)(p,f.Ix,"showing show"),p),O=r.forwardRef((function(e,t){return(0,b.jsx)(m.Z,v(v({},e),{},{ref:t,transitionClasses:y}))}));O.displayName="ToastFade";var E=O,S=n(64762),Z=n(99541),w=n(9655),C=r.createContext({onClose:function(){}}),j=["bsPrefix","closeLabel","closeVariant","closeButton","className","children"];function P(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function x(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?P(Object(n),!0).forEach((function(t){(0,a.Z)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):P(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var D=r.forwardRef((function(e,t){var n=e.bsPrefix,a=e.closeLabel,i=e.closeVariant,c=e.closeButton,l=e.className,u=e.children,d=(0,o.Z)(e,j);n=(0,Z.vE)(n,"toast-header");var h=(0,r.useContext)(C),p=(0,S.Z)((function(e){null==h||null==h.onClose||h.onClose(e)}));return(0,b.jsxs)("div",x(x({ref:t},d),{},{className:s()(n,l),children:[u,c&&(0,b.jsx)(w.Z,{"aria-label":a,variant:i,onClick:p,"data-dismiss":"toast"})]}))}));D.displayName="ToastHeader",D.defaultProps={closeLabel:"Close",closeButton:!0};var T=D,k=(0,n(38870).Z)("toast-body"),N=["bsPrefix","className","transition","show","animation","delay","autohide","onClose","bg"];function I(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function R(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?I(Object(n),!0).forEach((function(t){(0,a.Z)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):I(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var F=r.forwardRef((function(e,t){var n=e.bsPrefix,a=e.className,i=e.transition,c=void 0===i?E:i,l=e.show,u=void 0===l||l,d=e.animation,p=void 0===d||d,f=e.delay,m=void 0===f?5e3:f,g=e.autohide,v=void 0!==g&&g,y=e.onClose,O=e.bg,S=(0,o.Z)(e,N);n=(0,Z.vE)(n,"toast");var w=(0,r.useRef)(m),j=(0,r.useRef)(y);(0,r.useEffect)((function(){w.current=m,j.current=y}),[m,y]);var P=h(),x=!(!v||!u),D=(0,r.useCallback)((function(){x&&(null==j.current||j.current())}),[x]);(0,r.useEffect)((function(){P.set(D,w.current)}),[P,D]);var T=(0,r.useMemo)((function(){return{onClose:y}}),[y]),k=!(!c||!p),I=(0,b.jsx)("div",R(R({},S),{},{ref:t,className:s()(n,a,O&&"bg-".concat(O),!k&&(u?"show":"hide")),role:"alert","aria-live":"assertive","aria-atomic":"true"}));return(0,b.jsx)(C.Provider,{value:T,children:k&&c?(0,b.jsx)(c,{in:u,unmountOnExit:!0,children:I}):I})}));F.displayName="Toast";var B=Object.assign(F,{Body:k,Header:T}),J=function(e){var t=e.text,n=(0,r.useState)(!1),a=n[0],o=n[1];return r.useEffect((function(){""!==t&&o(!0)}),[t]),r.createElement("div",{className:"toast-holder"},r.createElement(B,{onClose:function(){return o(!1)},show:a,delay:3e3,autohide:!0},r.createElement(B.Body,null,t)))}},22943:function(e,t,n){"use strict";n.r(t);var r=n(15861),a=n(97326),o=n(94578),i=n(87757),s=n.n(i),c=n(67294),l=n(37787),u=n(33639),d=n(20994),h=n(51708),p=n(7408),f=n(46594),m=n(37841),b=n(19902),g=n(43248),v=n(2555),y=n(62881),O=n.n(y),E={padding:"3px"},S={display:"inline-block",height:"64px",marginLeft:"12px",marginRight:"12px",border:"1px solid transparent"},Z={display:"inline-block",height:"64px",marginLeft:"12px",marginRight:"12px",border:"1px solid #666"},w=function(e){function t(t){var n;(n=e.call(this,t)||this).setCourse=n.setCourse.bind((0,a.Z)(n)),n.setContent=n.setContent.bind((0,a.Z)(n)),n.setEditorState=n.setEditorState.bind((0,a.Z)(n)),n.save=n.save.bind((0,a.Z)(n)),n.setTitle=n.setTitle.bind((0,a.Z)(n)),n.setDescription=n.setDescription.bind((0,a.Z)(n)),n.selectFeaturedImage=n.selectFeaturedImage.bind((0,a.Z)(n)),n.handlePublishChange=n.handlePublishChange.bind((0,a.Z)(n)),n.setSlug=n.setSlug.bind((0,a.Z)(n));var r=new URLSearchParams(t.location.search);return n.state={course:{},content:{id:r.get("contentId"),type:"article",article:g.EditorState.createEmpty(),title:"",images:[],description:"",featuredImage:"",publish:!1,slug:""},courseId:r.get("courseId"),editorState:g.EditorState.createEmpty(),alert:""},n.debounceSave=O()(n.save,5e3),n}(0,o.Z)(t,e);var n=t.prototype;return n.componentDidMount=function(){(0,m.QT)("courses",this.state.courseId).then(this.setCourse),(0,m.QT)("courses/"+this.state.courseId+"/contents",this.state.content.id).then(this.setContent)},n.setCourse=function(e){this.setState({course:e})},n.setContent=function(e){e.publish||(e.publish=!1),this.setState({content:e,editorState:g.EditorState.createWithContent((0,g.convertFromRaw)(e.article))})},n.setEditorState=function(e){this.setState({editorState:e}),this.debounceSave()},n.save=function(){var e=this,t=JSON.parse(JSON.stringify(this.state.content));t.article=JSON.parse(JSON.stringify((0,g.convertToRaw)(this.state.editorState.getCurrentContent()))),(0,m.MF)("courses/"+this.state.course.id+"/contents",t),this.setState({alert:"Content saved"}),setTimeout((function(){e.setState({alert:""})}),3e3)},n.setSlug=function(e){var t=this.state.content,n=e.target.value.split(" ").join("-");n=n.replace("-"+this.state.content.id,""),n=encodeURI(n).replace(/[^\w-]+/g,"")+"-"+this.state.content.id,t.slug=n,this.setState({content:t})},n.setTitle=function(e){var t=this.state.content;t.title=e.target.value,this.setState({content:t})},n.setDescription=function(e){var t=this.state.content;t.description=e.target.value,this.setState({content:t})},n.selectFeaturedImage=function(e){var t=this;return function(){var n=t.state.content;n.featuredImage=e,t.setState({content:n})}},n.handlePublishChange=function(e){var t=e.target,n="checkbox"===t.type?t.checked:t.value,r=this.state.content;if(r.publish=n,r.publish){var a=new Date,o=a.getUTCMonth()+1,i=a.getUTCDate(),s=a.getUTCFullYear();r.datePublished=s+"/"+o+"/"+i}this.setState({content:r})},n.render=function(){var e=this,t=function(){var t=(0,r.Z)(s().mark((function t(n){var r,a,o,i;return s().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return(r=new FormData).append("image",n),t.prev=2,t.next=5,fetch("https://api.imgbb.com/1/upload?key=9cfb93e196063ad9f35c823c94231095",{method:"POST",body:r,headers:{Accept:"application/json"}});case 5:return a=t.sent,t.next=8,a.json();case 8:return o=t.sent,(i=JSON.parse(JSON.stringify(e.state.content))).images.push(o.data.url),e.setState({content:i}),t.abrupt("return",{data:{link:o.data.url}});case 15:t.prev=15,t.t0=t.catch(2),e.setState({alert:t.t0});case 18:case"end":return t.stop()}}),t,null,[[2,15]])})));return function(e){return t.apply(this,arguments)}}();return c.createElement(l.Z,{title:"Edit Content"},c.createElement("main",null,c.createElement(u.Z,null,c.createElement(d.Z,null,c.createElement(h.Z,null,c.createElement(h.Z.Group,{controlId:"formBasicTitle"},c.createElement(d.Z,null,c.createElement(p.Z,{className:"margin12"},c.createElement(h.Z.Control,{type:"text",placeholder:"Title",size:"lg",value:this.state.content.title,onChange:this.setTitle}))),c.createElement(d.Z,null,c.createElement(p.Z,{className:"margin12"},c.createElement(h.Z.Control,{type:"text",placeholder:"Slug",value:this.state.content.slug,onChange:this.setSlug}))),c.createElement(d.Z,null,c.createElement(p.Z,{className:"margin12"},c.createElement(h.Z.Control,{as:"textarea",placeholder:"Description",value:this.state.content.description,onChange:this.setDescription}))),c.createElement("div",null,c.createElement(d.Z,null,c.createElement(p.Z,{className:"margin12"},c.createElement("h2",null,"Select Featured Image"))),this.state.content.images.map((function(t,n){return c.createElement("div",{role:"button",tabIndex:"-1",key:n,style:e.state.content.featuredImage===t?Z:S,onClick:e.selectFeaturedImage(t)},c.createElement("img",{src:t,height:"64px",alt:"",style:E}))}))),c.createElement(d.Z,{className:"margin12"},c.createElement(p.Z,null,v.Editor?c.createElement(v.Editor,{editorState:this.state.editorState,onEditorStateChange:this.setEditorState,toolbar:{inline:{inDropdown:!0},list:{inDropdown:!0},textAlign:{inDropdown:!0},link:{inDropdown:!0},history:{inDropdown:!0},image:{uploadCallback:t,alt:{present:!0,mandatory:!0}}}}):c.createElement("div",null))),c.createElement(d.Z,null,c.createElement(p.Z,null,c.createElement(h.Z.Check,{label:"Publish?",name:"publish",id:"Publish",onChange:this.handlePublishChange,checked:this.state.content.publish})),c.createElement(p.Z,null,c.createElement(f.Z,{onClick:this.save},"Save")))))))),c.createElement(b.Z,{text:this.state.alert}))},t}(c.Component);t.default=w}}]);
//# sourceMappingURL=component---src-pages-course-edit-content-js-33fdcd80ca11ae8c60d7.js.map