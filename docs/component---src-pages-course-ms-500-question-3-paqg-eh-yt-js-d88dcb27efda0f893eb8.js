"use strict";(self.webpackChunkWebSite=self.webpackChunkWebSite||[]).push([[2462],{94650:function(e,t,n){n.r(t);var s=n(42982),i=n(97326),o=n(94578),a=n(67294),r=n(37787),l=n(33639),c=n(20994),u=n(7408),d=n(46594),h=n(51708),m=n(68203),p=n(8169),w=n(25444),y=n(37841),g=n(71192),E=n.n(g),f={marginTop:"14px",marginBottom:"14px",display:"flex"},v={display:"flex",alignItems:"center",justifyContent:"center"},A={marginTop:"24px"},x={marginTop:"24px"},S=function(e){function t(t){var n;(n=e.call(this,t)||this).setUid=n.setUid.bind((0,i.Z)(n)),n.handleCorrectAnswerChange=n.handleCorrectAnswerChange.bind((0,i.Z)(n)),n.toggleShowAnswer=n.toggleShowAnswer.bind((0,i.Z)(n)),n.toggleShowQuestions=n.toggleShowQuestions.bind((0,i.Z)(n)),n.gotoQuestion=n.gotoQuestion.bind((0,i.Z)(n)),n.toggleEndExam=n.toggleEndExam.bind((0,i.Z)(n)),n.endExam=n.endExam.bind((0,i.Z)(n));var s=new URLSearchParams(t.location.search);return n.state={questions:{},uid:"",testId:s.get("testId"),test:{},question:{answers:[{isCorrectAnswer:!0,value:"From the Azure Active Directory admin center, create a new certificate"},{value:"Enable Application Proxy in Azure AD",isCorrectAnswer:!1},{isCorrectAnswer:!1,value:"From Active Directory Administrative Center, create a Dynamic Access Control policy"},{isCorrectAnswer:!1,value:"From the Azure Active Directory admin center, configure authentication methods"}],id:"3PAQGEhYt",question:{entityMap:{},blocks:[{inlineStyleRanges:[],depth:0,entityRanges:[],data:{},type:"unstyled",text:"You have a hybrid Microsoft 365 environment. All computers run Windows 10 and are managed by using Microsoft Intune.",key:"9lhm"},{inlineStyleRanges:[],depth:0,key:"8o0i7",data:{},text:"You need to create a Microsoft Azure Active Directory (Azure AD) conditional access policy that will allow only Windows 10 computers marked as compliant to establish a VPN connection to the on-premises network.",entityRanges:[],type:"unstyled"},{entityRanges:[],data:{},type:"unstyled",text:"What should you do first?",key:"74po4",depth:0,inlineStyleRanges:[]}]},references:{blocks:[{entityRanges:[],key:"br3cc",data:{},depth:0,text:"It's not very common so it's not included in the documents in this training but the correct steps are:",inlineStyleRanges:[],type:"unstyled"},{text:"1. Create root certificates for VPN authentication with Azure AD",type:"unstyled",key:"f954c",entityRanges:[],data:{},depth:0,inlineStyleRanges:[]},{depth:0,data:{},entityRanges:[],key:"28l2p",text:"2. Configure the Conditional Access policy",inlineStyleRanges:[],type:"unstyled"},{inlineStyleRanges:[],type:"unstyled",text:"3. Deploy conditional access root certificates to on-premises AD",key:"326ci",depth:0,entityRanges:[],data:{}},{entityRanges:[],data:{},key:"ativj",depth:0,inlineStyleRanges:[],type:"unstyled",text:"4. Create OMA-DM based VPNv2 Profiles to Windows 10 devices"},{entityRanges:[{key:0,length:105,offset:0}],key:"777jm",depth:0,type:"unstyled",data:{},inlineStyleRanges:[],text:"https://docs.microsoft.com/en-us/windows-server/remote/remote-access/vpn/ad-ca-vpn-connectivity-windows10"}],entityMap:{0:{mutability:"MUTABLE",type:"LINK",data:{targetOption:"_blank",url:"https://docs.microsoft.com/en-us/windows-server/remote/remote-access/vpn/ad-ca-vpn-connectivity-windows10"}}}}},previousQuestionId:"",nextQuestionId:"",questionId:"3PAQGEhYt",questionIdx:"",questionHtml:"<p>You have a hybrid Microsoft 365 environment. All computers run Windows 10 and are managed by using Microsoft Intune.</p>\n<p>You need to create a Microsoft Azure Active Directory (Azure AD) conditional access policy that will allow only Windows 10 computers marked as compliant to establish a VPN connection to the on-premises network.</p>\n<p>What should you do first?</p>\n",questionText:"You have a hybrid Microsoft 365 environment. All computers run Windows 10 and are managed by using Microsoft Intune. You need to create a Microsoft Azure Active Directory (Azure AD) conditional access policy that will allow only Windows 10 computers marked as compliant to establish a VPN connection to the on-premises network. What should you do first?",referencesHtml:'<p>It\'s not very common so it\'s not included in the documents in this training but the correct steps are:</p>\n<p>1. Create root certificates for VPN authentication with Azure AD</p>\n<p>2. Configure the Conditional Access policy</p>\n<p>3. Deploy conditional access root certificates to on-premises AD</p>\n<p>4. Create OMA-DM based VPNv2 Profiles to Windows 10 devices</p>\n<p><a href="https://docs.microsoft.com/en-us/windows-server/remote/remote-access/vpn/ad-ca-vpn-connectivity-windows10" target="_blank">https://docs.microsoft.com/en-us/windows-server/remote/remote-access/vpn/ad-ca-vpn-connectivity-windows10</a></p>\n',selectedAnswer:[],answerShown:!1,questionsShown:!1,endExamShown:!1,endExamText:"Are you sure you want to end the exam?"},n.state.jsonLd={datePublished:"9-8-2021",keywords:["Microsoft","Microsoft 365","Office 365","MS-500","Microsoft 365 Security Administration"],mainEntity:{"@type":"Question",name:n.state.questionText.substring(0,150),text:n.state.questionText,answerCount:n.state.question.answers?n.state.question.answers.length:0,dateCreated:"2021-09-08T16:52:31Z",author:{"@type":"Person",name:"John Gruber",url:"https://medium.com/@gruberjl"}}},n.state.question.answers&&(n.state.jsonLd.mainEntity.acceptedAnswer={"@type":"Answer",text:n.state.question.answers?n.state.question.answers.filter((function(e){return e.isCorrectAnswer})).map((function(e){return e.value})).join("; "):"None",author:{type:"Person",name:"John Gruber",url:"https://medium.com/@gruberjl"},upvoteCount:1,dateCreated:"2021-09-08T16:52:31Z"}),n}(0,o.Z)(t,e);var n=t.prototype;return n.componentDidMount=function(){"undefined"!=typeof window&&(this.onAuthStateChangedListener=(0,y.Aj)(this.setUid))},n.componentWillUnmount=function(){this.onAuthStateChangedListener()},n.setUid=function(e){var t=this;e&&(this.setState({uid:e.uid}),this.state.testId?(0,y.QT)("users/"+this.state.uid+"/tests",this.state.testId).then((function(e){var n,s,i,o="",a="",r=!1,l=t.state.selectedAnswer;e.questions.forEach((function(e,c){r&&(a=e.id,r=!1),t.state.questionId===e.id&&(r=!0,n=e,i=c+1,s&&(o=s.id),n.answered&&(l=n.answered)),s=e})),(0,y.QT)("Tests/MS-500/Questions",n.id).then((function(e){var n=E()(e.question),s=E()(e.references);t.setState({question:e,questionHtml:n,referencesHtml:s})})),t.setState({test:e,questionIdx:i,nextQuestionId:a,previousQuestionId:o,selectedAnswer:l})})):(0,y.QT)("Tests/MS-500/Questions",this.state.questionId).then((function(e){var n=E()(e.question),s=E()(e.references);t.setState({question:e,questionHtml:n,referencesHtml:s})})))},n.handleCorrectAnswerChange=function(e){var t=this,n=e.target.dataset.index,i=e.target,o=(0,s.Z)(this.state.selectedAnswer);if(i.checked)o.push(n);else{var a=o.indexOf(""+n);o.splice(a,1)}if(this.setState({selectedAnswer:o}),this.state.testId){var r=Object.assign({},this.state.test);r.questions=r.questions.map((function(e){return e.id===t.state.questionId&&(e.answered=o),e})),(0,y.MF)("users/"+this.state.uid+"/tests",r),this.setState({test:r})}},n.toggleShowAnswer=function(){var e=!this.state.answerShown;this.setState({answerShown:e})},n.toggleShowQuestions=function(){var e=!this.state.questionsShown;this.setState({questionsShown:e})},n.toggleEndExam=function(){var e=!this.state.endExamShown;this.setState({endExamShown:e})},n.gotoQuestion=function(e){var t=this;return function(){(0,w.navigate)("/course/ms-500/question/"+e+"?testId="+t.state.testId)}},n.endExam=function(){var e=this,t=this.state.test;t.isComplete=!0,(0,y.MF)("users/"+this.state.uid+"/tests",t).then((function(){(0,w.navigate)("/tests/summary?testId="+e.state.testId)}))},n.render=function(){var e=this,t=this.state.question.answers?this.state.question.answers:[];return t=(0,s.Z)(t).map((function(t,n){return t.isSelected=e.state.selectedAnswer.includes(""+n),t.optionStyles=Object.assign({},f),e.state.answerShown&&t.isCorrectAnswer&&(t.optionStyles.background="green"),t})),a.createElement(r.Z,{jsonLdType:"QAPage",jsonLd:this.state.jsonLd,title:this.state.questionText,description:this.state.questionText},a.createElement("main",null,a.createElement("div",null,a.createElement(l.Z,null,a.createElement(c.Z,null,a.createElement(u.Z,{md:6,xs:12,lg:8},a.createElement("h1",null,"Question ",this.state.questionIdx)),a.createElement(u.Z,{md:6,xs:12,lg:4,className:"flex-space-between"}," ",""!==this.state.previousQuestionId?a.createElement(d.Z,{as:w.Link,to:"/course/ms-500/question/"+this.state.previousQuestionId+"?testId="+this.state.testId},"Previous Question"):"",""!==this.state.nextQuestionId?a.createElement(d.Z,{as:w.Link,to:"/course/ms-500/question/"+this.state.nextQuestionId+"?testId="+this.state.testId},"Next Question"):this.state.testId?a.createElement(d.Z,{onClick:this.toggleEndExam,variant:"warning"},"End Exam"):"")),a.createElement(c.Z,{className:"img-width-100"},""!==this.state.questionHtml?a.createElement("div",{dangerouslySetInnerHTML:{__html:this.state.questionHtml}}):""),a.createElement(c.Z,null,t.map((function(t,n){return a.createElement("div",{style:t.optionStyles,key:n},a.createElement(h.Z.Check,{type:"checkbox",name:"AnswerCheck"+n,id:"AnswerCheck"+n,"data-index":n,inline:!0,style:v,checked:e.state.selectedAnswer.includes(""+n),onChange:e.handleCorrectAnswerChange}),a.createElement("label",{htmlFor:"AnswerCheck"+n},t.value))}))),a.createElement(c.Z,null,a.createElement(u.Z,null,this.state.answerShown?a.createElement("div",{style:A,dangerouslySetInnerHTML:{__html:this.state.referencesHtml}}):"")),a.createElement(c.Z,{className:"align-right"},a.createElement(u.Z,{md:6,xs:12,lg:8}),a.createElement(u.Z,{md:6,xs:12,lg:4,className:"flex-space-between"}," ",""!==this.state.previousQuestionId?a.createElement(d.Z,{as:w.Link,to:"/course/ms-500/question/"+this.state.previousQuestionId+"?testId="+this.state.testId},"Previous Question"):"",""!==this.state.nextQuestionId?a.createElement(d.Z,{as:w.Link,to:"/course/ms-500/question/"+this.state.nextQuestionId+"?testId="+this.state.testId},"Next Question"):this.state.testId?a.createElement(d.Z,{onClick:this.toggleEndExam,variant:"warning"},"End Exam"):"")),a.createElement(c.Z,null,a.createElement(u.Z,{xs:12,md:6},a.createElement(d.Z,{onClick:this.toggleShowAnswer,style:x},this.state.answerShown?a.createElement("span",null,"Hide Answer"):a.createElement("span",null,"Show Answer"))),this.state.testId?a.createElement(u.Z,{xs:12,md:6,className:"align-right"},a.createElement(d.Z,{onClick:this.toggleShowQuestions,style:x},this.state.questionsShown?a.createElement("span",null,"Hide Question List"):a.createElement("span",null,"Show Question List"))):""),this.state.testId?a.createElement(c.Z,null,a.createElement(u.Z,{className:"align-right"},a.createElement(d.Z,{onClick:this.toggleEndExam,variant:"warning",style:x},"End Exam"))):"")),a.createElement(m.Z,{show:this.state.questionsShown,onHide:this.toggleShowQuestions},a.createElement(m.Z.Header,null,a.createElement(m.Z.Title,null,"Showing Test Questions")),a.createElement(m.Z.Body,null,a.createElement(p.Z,{striped:!0,bordered:!0,hover:!0},a.createElement("thead",null,a.createElement("tr",null,a.createElement("th",null,"#"),a.createElement("th",null,"Answer"))),a.createElement("tbody",null,this.state.test&&this.state.test.questions?this.state.test.questions.map((function(t,n){return a.createElement("tr",{key:n,onClick:e.gotoQuestion(t.id),className:"cursor-pointer"},a.createElement("td",null,n+1),a.createElement("td",null,t.answered))})):""))),a.createElement(m.Z.Footer,null,a.createElement(d.Z,{variant:"primary",onClick:this.toggleShowQuestions},"Close"))),a.createElement(m.Z,{show:this.state.endExamShown,onHide:this.toggleEndExam},a.createElement(m.Z.Header,null,a.createElement(m.Z.Title,null,"Are you sure?")),a.createElement(m.Z.Body,null,this.state.endExamText),a.createElement(m.Z.Footer,null,a.createElement(d.Z,{variant:"primary",onClick:this.endExam},"Yes"),a.createElement(d.Z,{variant:"secondary",onClick:this.toggleEndExam},"No")))))},t}(a.Component);t.default=S}}]);
//# sourceMappingURL=component---src-pages-course-ms-500-question-3-paqg-eh-yt-js-d88dcb27efda0f893eb8.js.map