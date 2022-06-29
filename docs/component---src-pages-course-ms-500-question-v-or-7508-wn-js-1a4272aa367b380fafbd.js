"use strict";(self.webpackChunkWebSite=self.webpackChunkWebSite||[]).push([[3226],{69424:function(e,t,n){n.r(t);var s=n(42982),o=n(97326),i=n(94578),a=n(67294),r=n(37787),l=n(33639),u=n(20994),d=n(7408),c=n(46594),h=n(51708),m=n(68203),p=n(8169),f=n(25444),g=n(37841),w=n(71192),E=n.n(w),y={marginTop:"14px",marginBottom:"14px",display:"flex"},v={display:"flex",alignItems:"center",justifyContent:"center"},x={marginTop:"24px"},S={marginTop:"24px"},Z=function(e){function t(t){var n;(n=e.call(this,t)||this).setUid=n.setUid.bind((0,o.Z)(n)),n.handleCorrectAnswerChange=n.handleCorrectAnswerChange.bind((0,o.Z)(n)),n.toggleShowAnswer=n.toggleShowAnswer.bind((0,o.Z)(n)),n.toggleShowQuestions=n.toggleShowQuestions.bind((0,o.Z)(n)),n.gotoQuestion=n.gotoQuestion.bind((0,o.Z)(n)),n.toggleEndExam=n.toggleEndExam.bind((0,o.Z)(n)),n.endExam=n.endExam.bind((0,o.Z)(n));var s=new URLSearchParams(t.location.search);return n.state={questions:{},uid:"",testId:s.get("testId"),test:{},question:{answers:[{value:"Configure an enrollment restriction",isCorrectAnswer:!1},{isCorrectAnswer:!0,value:"Create a device configuration profile"},{isCorrectAnswer:!1,value:"Create a conditional access policy"},{isCorrectAnswer:!1,value:"Create a Windows Autopilot deployment profile"}],id:"vOR7508wn",question:{blocks:[{key:"fnci6",depth:0,type:"unstyled",inlineStyleRanges:[],data:{},entityRanges:[],text:"You have a Microsoft 365 tenant."},{entityRanges:[],type:"unstyled",depth:0,key:"cvijs",data:{},inlineStyleRanges:[],text:"You have 500 computers that run Windows 10."},{data:{},entityRanges:[],text:"You plan to monitor the computers by using Microsoft Defender for Endpoint after the computers are enrolled in Microsoft Intune.",key:"cui53",inlineStyleRanges:[],type:"unstyled",depth:0},{type:"unstyled",entityRanges:[],key:"4v75r",text:"You need to ensure that the computers connect to Microsoft Defender for Endpoint.",depth:0,data:{},inlineStyleRanges:[]},{key:"ekj0t",text:"How should you prepare Intune for Microsoft Defender for Endpoint?",type:"unstyled",depth:0,inlineStyleRanges:[],data:{},entityRanges:[]}],entityMap:{}},references:{blocks:[{key:"5t9hf",depth:0,entityRanges:[],inlineStyleRanges:[],type:"unstyled",text:"Create a device configuration profile to deploy Defender for Endpoint.",data:{}},{key:"4a27d",inlineStyleRanges:[],type:"unstyled",text:"https://www.gitbit.org/course/ms-500/learn/Protecting-Windows-10-and-other-devices-with-Microsoft-Defender-for-Endpoint-z0qPG6v4T",entityRanges:[{length:129,key:0,offset:0}],data:{},depth:0},{depth:0,entityRanges:[{offset:0,key:1,length:66}],data:{},type:"unstyled",key:"aunfb",text:"https://docs.microsoft.com/en-us/intune/advanced-threat-protection",inlineStyleRanges:[]}],entityMap:{0:{mutability:"MUTABLE",data:{url:"https://www.gitbit.org/course/ms-500/learn/Protecting-Windows-10-and-other-devices-with-Microsoft-Defender-for-Endpoint-z0qPG6v4T",targetOption:"_blank"},type:"LINK"},1:{type:"LINK",mutability:"MUTABLE",data:{url:"https://docs.microsoft.com/en-us/intune/advanced-threat-protection",targetOption:"_blank"}}}}},previousQuestionId:"",nextQuestionId:"",questionId:"vOR7508wn",questionIdx:"",questionHtml:"<p>You have a Microsoft 365 tenant.</p>\n<p>You have 500 computers that run Windows 10.</p>\n<p>You plan to monitor the computers by using Microsoft Defender for Endpoint after the computers are enrolled in Microsoft Intune.</p>\n<p>You need to ensure that the computers connect to Microsoft Defender for Endpoint.</p>\n<p>How should you prepare Intune for Microsoft Defender for Endpoint?</p>\n",questionText:"You have a Microsoft 365 tenant. You have 500 computers that run Windows 10. You plan to monitor the computers by using Microsoft Defender for Endpoint after the computers are enrolled in Microsoft Intune. You need to ensure that the computers connect to Microsoft Defender for Endpoint. How should you prepare Intune for Microsoft Defender for Endpoint?",referencesHtml:'<p>Create a device configuration profile to deploy Defender for Endpoint.</p>\n<p><a href="https://www.gitbit.org/course/ms-500/learn/Protecting-Windows-10-and-other-devices-with-Microsoft-Defender-for-Endpoint-z0qPG6v4T" target="_blank">https://www.gitbit.org/course/ms-500/learn/Protecting-Windows-10-and-other-devices-with-Microsoft-Defender-for-Endpoint-z0qPG6v4T</a></p>\n<p><a href="https://docs.microsoft.com/en-us/intune/advanced-threat-protection" target="_blank">https://docs.microsoft.com/en-us/intune/advanced-threat-protection</a></p>\n',selectedAnswer:[],answerShown:!1,questionsShown:!1,endExamShown:!1,endExamText:"Are you sure you want to end the exam?"},n.state.jsonLd={datePublished:"9-8-2021",keywords:["Microsoft","Microsoft 365","Office 365","MS-500","Microsoft 365 Security Administration"],mainEntity:{"@type":"Question",name:n.state.questionText.substring(0,150),text:n.state.questionText,answerCount:n.state.question.answers?n.state.question.answers.length:0,dateCreated:"2021-09-08T16:52:31Z",author:{"@type":"Person",name:"John Gruber",url:"https://medium.com/@gruberjl"}}},n.state.question.answers&&(n.state.jsonLd.mainEntity.acceptedAnswer={"@type":"Answer",text:n.state.question.answers?n.state.question.answers.filter((function(e){return e.isCorrectAnswer})).map((function(e){return e.value})).join("; "):"None",author:{type:"Person",name:"John Gruber",url:"https://medium.com/@gruberjl"},upvoteCount:1,dateCreated:"2021-09-08T16:52:31Z"}),n}(0,i.Z)(t,e);var n=t.prototype;return n.componentDidMount=function(){"undefined"!=typeof window&&(this.onAuthStateChangedListener=(0,g.Aj)(this.setUid))},n.componentWillUnmount=function(){this.onAuthStateChangedListener()},n.setUid=function(e){var t=this;e&&(this.setState({uid:e.uid}),this.state.testId?(0,g.QT)("users/"+this.state.uid+"/tests",this.state.testId).then((function(e){var n,s,o,i="",a="",r=!1,l=t.state.selectedAnswer;e.questions.forEach((function(e,u){r&&(a=e.id,r=!1),t.state.questionId===e.id&&(r=!0,n=e,o=u+1,s&&(i=s.id),n.answered&&(l=n.answered)),s=e})),(0,g.QT)("Tests/MS-500/Questions",n.id).then((function(e){var n=E()(e.question),s=E()(e.references);t.setState({question:e,questionHtml:n,referencesHtml:s})})),t.setState({test:e,questionIdx:o,nextQuestionId:a,previousQuestionId:i,selectedAnswer:l})})):(0,g.QT)("Tests/MS-500/Questions",this.state.questionId).then((function(e){var n=E()(e.question),s=E()(e.references);t.setState({question:e,questionHtml:n,referencesHtml:s})})))},n.handleCorrectAnswerChange=function(e){var t=this,n=e.target.dataset.index,o=e.target,i=(0,s.Z)(this.state.selectedAnswer);if(o.checked)i.push(n);else{var a=i.indexOf(""+n);i.splice(a,1)}if(this.setState({selectedAnswer:i}),this.state.testId){var r=Object.assign({},this.state.test);r.questions=r.questions.map((function(e){return e.id===t.state.questionId&&(e.answered=i),e})),(0,g.MF)("users/"+this.state.uid+"/tests",r),this.setState({test:r})}},n.toggleShowAnswer=function(){var e=!this.state.answerShown;this.setState({answerShown:e})},n.toggleShowQuestions=function(){var e=!this.state.questionsShown;this.setState({questionsShown:e})},n.toggleEndExam=function(){var e=!this.state.endExamShown;this.setState({endExamShown:e})},n.gotoQuestion=function(e){var t=this;return function(){(0,f.navigate)("/course/ms-500/question/"+e+"?testId="+t.state.testId)}},n.endExam=function(){var e=this,t=this.state.test;t.isComplete=!0,(0,g.MF)("users/"+this.state.uid+"/tests",t).then((function(){(0,f.navigate)("/tests/summary?testId="+e.state.testId)}))},n.render=function(){var e=this,t=this.state.question.answers?this.state.question.answers:[];return t=(0,s.Z)(t).map((function(t,n){return t.isSelected=e.state.selectedAnswer.includes(""+n),t.optionStyles=Object.assign({},y),e.state.answerShown&&t.isCorrectAnswer&&(t.optionStyles.background="green"),t})),a.createElement(r.Z,{jsonLdType:"QAPage",jsonLd:this.state.jsonLd,title:this.state.questionText,description:this.state.questionText},a.createElement("main",null,a.createElement("div",null,a.createElement(l.Z,null,a.createElement(u.Z,null,a.createElement(d.Z,{md:6,xs:12,lg:8},a.createElement("h1",null,"Question ",this.state.questionIdx)),a.createElement(d.Z,{md:6,xs:12,lg:4,className:"flex-space-between"}," ",""!==this.state.previousQuestionId?a.createElement(c.Z,{as:f.Link,to:"/course/ms-500/question/"+this.state.previousQuestionId+"?testId="+this.state.testId},"Previous Question"):"",""!==this.state.nextQuestionId?a.createElement(c.Z,{as:f.Link,to:"/course/ms-500/question/"+this.state.nextQuestionId+"?testId="+this.state.testId},"Next Question"):this.state.testId?a.createElement(c.Z,{onClick:this.toggleEndExam,variant:"warning"},"End Exam"):"")),a.createElement(u.Z,{className:"img-width-100"},""!==this.state.questionHtml?a.createElement("div",{dangerouslySetInnerHTML:{__html:this.state.questionHtml}}):""),a.createElement(u.Z,null,t.map((function(t,n){return a.createElement("div",{style:t.optionStyles,key:n},a.createElement(h.Z.Check,{type:"checkbox",name:"AnswerCheck"+n,id:"AnswerCheck"+n,"data-index":n,inline:!0,style:v,checked:e.state.selectedAnswer.includes(""+n),onChange:e.handleCorrectAnswerChange}),a.createElement("label",{htmlFor:"AnswerCheck"+n},t.value))}))),a.createElement(u.Z,null,a.createElement(d.Z,null,this.state.answerShown?a.createElement("div",{style:x,dangerouslySetInnerHTML:{__html:this.state.referencesHtml}}):"")),a.createElement(u.Z,{className:"align-right"},a.createElement(d.Z,{md:6,xs:12,lg:8}),a.createElement(d.Z,{md:6,xs:12,lg:4,className:"flex-space-between"}," ",""!==this.state.previousQuestionId?a.createElement(c.Z,{as:f.Link,to:"/course/ms-500/question/"+this.state.previousQuestionId+"?testId="+this.state.testId},"Previous Question"):"",""!==this.state.nextQuestionId?a.createElement(c.Z,{as:f.Link,to:"/course/ms-500/question/"+this.state.nextQuestionId+"?testId="+this.state.testId},"Next Question"):this.state.testId?a.createElement(c.Z,{onClick:this.toggleEndExam,variant:"warning"},"End Exam"):"")),a.createElement(u.Z,null,a.createElement(d.Z,{xs:12,md:6},a.createElement(c.Z,{onClick:this.toggleShowAnswer,style:S},this.state.answerShown?a.createElement("span",null,"Hide Answer"):a.createElement("span",null,"Show Answer"))),this.state.testId?a.createElement(d.Z,{xs:12,md:6,className:"align-right"},a.createElement(c.Z,{onClick:this.toggleShowQuestions,style:S},this.state.questionsShown?a.createElement("span",null,"Hide Question List"):a.createElement("span",null,"Show Question List"))):""),this.state.testId?a.createElement(u.Z,null,a.createElement(d.Z,{className:"align-right"},a.createElement(c.Z,{onClick:this.toggleEndExam,variant:"warning",style:S},"End Exam"))):"")),a.createElement(m.Z,{show:this.state.questionsShown,onHide:this.toggleShowQuestions},a.createElement(m.Z.Header,null,a.createElement(m.Z.Title,null,"Showing Test Questions")),a.createElement(m.Z.Body,null,a.createElement(p.Z,{striped:!0,bordered:!0,hover:!0},a.createElement("thead",null,a.createElement("tr",null,a.createElement("th",null,"#"),a.createElement("th",null,"Answer"))),a.createElement("tbody",null,this.state.test&&this.state.test.questions?this.state.test.questions.map((function(t,n){return a.createElement("tr",{key:n,onClick:e.gotoQuestion(t.id),className:"cursor-pointer"},a.createElement("td",null,n+1),a.createElement("td",null,t.answered))})):""))),a.createElement(m.Z.Footer,null,a.createElement(c.Z,{variant:"primary",onClick:this.toggleShowQuestions},"Close"))),a.createElement(m.Z,{show:this.state.endExamShown,onHide:this.toggleEndExam},a.createElement(m.Z.Header,null,a.createElement(m.Z.Title,null,"Are you sure?")),a.createElement(m.Z.Body,null,this.state.endExamText),a.createElement(m.Z.Footer,null,a.createElement(c.Z,{variant:"primary",onClick:this.endExam},"Yes"),a.createElement(c.Z,{variant:"secondary",onClick:this.toggleEndExam},"No")))))},t}(a.Component);t.default=Z}}]);
//# sourceMappingURL=component---src-pages-course-ms-500-question-v-or-7508-wn-js-1a4272aa367b380fafbd.js.map