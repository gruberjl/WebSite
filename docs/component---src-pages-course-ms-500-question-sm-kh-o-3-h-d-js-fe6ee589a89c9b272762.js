"use strict";(self.webpackChunkWebSite=self.webpackChunkWebSite||[]).push([[275],{21308:function(e,t,s){s.r(t);var n=s(42982),i=s(97326),a=s(94578),o=s(67294),r=s(78278),u=s(33639),l=s(20994),c=s(7408),d=s(46594),h=s(51708),m=s(68203),g=s(8169),p=s(25444),w=s(37841),E=s(71192),y=s.n(E),f={marginTop:"14px",marginBottom:"14px",display:"flex"},v={display:"flex",alignItems:"center",justifyContent:"center"},x={marginTop:"24px"},S={marginTop:"24px"},q=function(e){function t(t){var s;(s=e.call(this,t)||this).setUid=s.setUid.bind((0,i.Z)(s)),s.handleCorrectAnswerChange=s.handleCorrectAnswerChange.bind((0,i.Z)(s)),s.toggleShowAnswer=s.toggleShowAnswer.bind((0,i.Z)(s)),s.toggleShowQuestions=s.toggleShowQuestions.bind((0,i.Z)(s)),s.gotoQuestion=s.gotoQuestion.bind((0,i.Z)(s)),s.toggleEndExam=s.toggleEndExam.bind((0,i.Z)(s)),s.endExam=s.endExam.bind((0,i.Z)(s));var n=new URLSearchParams(t.location.search);return s.state={questions:{},uid:"",testId:n.get("testId"),test:{},question:{answers:[{isCorrectAnswer:!0,value:"Go to Azure Active Directory admin center and review the sign-in logs."},{value:"From the Microsoft Defender admin center download a report.",isCorrectAnswer:!1},{isCorrectAnswer:!1,value:"Go to Azure Active Directory admin center and review the audit logs."},{isCorrectAnswer:!1,value:"Go to Azure Active Directory admin center and review the authentication methods."}],id:"smKhO3hD_",question:{blocks:[{entityRanges:[],text:"You have a Microsoft 365 tenant with Microsoft 365 E5 licenses.",key:"f6avo",inlineStyleRanges:[],data:{},type:"unstyled",depth:0},{key:"8qbsp",data:{},type:"unstyled",entityRanges:[],text:"Most of your users are required to use an authenticator app to access Microsoft 365.",inlineStyleRanges:[],depth:0},{inlineStyleRanges:[],text:"You need to view which users have used an authenticator app to access Microsoft 365.",depth:0,key:"fb7q",data:{},type:"unstyled",entityRanges:[]},{depth:0,inlineStyleRanges:[],key:"2adq3",type:"unstyled",entityRanges:[],data:{},text:"What should you do?"}],entityMap:{}},references:{blocks:[{data:{},inlineStyleRanges:[],text:"The user sign-in logs located in the Azure AD admin center provides information on the user sign-ins. The logs contain the information about the MFA authentication status.",key:"4at2l",entityRanges:[],depth:0,type:"unstyled"},{text:"Reference:",key:"ds5vt",depth:0,data:{},inlineStyleRanges:[{offset:0,style:"BOLD",length:9}],type:"unstyled",entityRanges:[]},{inlineStyleRanges:[],depth:0,text:"https://docs.microsoft.com/en-us/azure/active-directory/reports-monitoring/concept-sign-ins ",data:{},entityRanges:[{length:91,offset:0,key:0}],key:"4pavl",type:"unstyled"}],entityMap:{0:{mutability:"MUTABLE",type:"LINK",data:{targetOption:"_blank",url:"https://docs.microsoft.com/en-us/azure/active-directory/reports-monitoring/concept-sign-ins"}}}}},previousQuestionId:"",nextQuestionId:"",questionId:"smKhO3hD_",questionIdx:"",questionHtml:"<p>You have a Microsoft 365 tenant with Microsoft 365 E5 licenses.</p>\n<p>Most of your users are required to use an authenticator app to access Microsoft 365.</p>\n<p>You need to view which users have used an authenticator app to access Microsoft 365.</p>\n<p>What should you do?</p>\n",questionText:"You have a Microsoft 365 tenant with Microsoft 365 E5 licenses. Most of your users are required to use an authenticator app to access Microsoft 365. You need to view which users have used an authenticator app to access Microsoft 365. What should you do?",referencesHtml:'<p>The user sign-in logs located in the Azure AD admin center provides information on the user sign-ins. The logs contain the information about the MFA authentication status.</p>\n<p><strong>Reference</strong>:</p>\n<p><a href="https://docs.microsoft.com/en-us/azure/active-directory/reports-monitoring/concept-sign-ins" target="_blank">https://docs.microsoft.com/en-us/azure/active-directory/reports-monitoring/concept-sign-ins</a>&nbsp;</p>\n',selectedAnswer:[],answerShown:!1,questionsShown:!1,endExamShown:!1,endExamText:"Are you sure you want to end the exam?"},s.state.jsonLd={datePublished:"9-8-2021",keywords:["Microsoft","Microsoft 365","Office 365","MS-500","Microsoft 365 Security Administration"],mainEntity:{"@type":"Question",name:s.state.questionText.substring(0,150),text:s.state.questionText,answerCount:s.state.question.answers?s.state.question.answers.length:0,dateCreated:"2021-09-08T16:52:31Z",author:{"@type":"Person",name:"John Gruber",url:"https://medium.com/@gruberjl"}}},s.state.question.answers&&(s.state.jsonLd.mainEntity.acceptedAnswer={"@type":"Answer",text:s.state.question.answers?s.state.question.answers.filter((function(e){return e.isCorrectAnswer})).map((function(e){return e.value})).join("; "):"None",url:"https://www.gitbit.org/course/ms-500/question/smKhO3hD_",author:{type:"Person",name:"John Gruber",url:"https://medium.com/@gruberjl"},upvoteCount:1,dateCreated:"2021-09-08T16:52:31Z"}),s}(0,a.Z)(t,e);var s=t.prototype;return s.componentDidMount=function(){"undefined"!=typeof window&&(this.onAuthStateChangedListener=(0,w.Aj)(this.setUid))},s.componentWillUnmount=function(){this.onAuthStateChangedListener()},s.setUid=function(e){var t=this;e&&(this.setState({uid:e.uid}),this.state.testId?(0,w.QT)("users/"+this.state.uid+"/tests",this.state.testId).then((function(e){var s,n,i,a="",o="",r=!1,u=t.state.selectedAnswer;e.questions.forEach((function(e,l){r&&(o=e.id,r=!1),t.state.questionId===e.id&&(r=!0,s=e,i=l+1,n&&(a=n.id),s.answered&&(u=s.answered)),n=e})),(0,w.QT)("Tests/MS-500/Questions",s.id).then((function(e){var s=y()(e.question),n=y()(e.references);t.setState({question:e,questionHtml:s,referencesHtml:n})})),t.setState({test:e,questionIdx:i,nextQuestionId:o,previousQuestionId:a,selectedAnswer:u})})):(0,w.QT)("Tests/MS-500/Questions",this.state.questionId).then((function(e){var s=y()(e.question),n=y()(e.references);t.setState({question:e,questionHtml:s,referencesHtml:n})})))},s.handleCorrectAnswerChange=function(e){var t=this,s=e.target.dataset.index,i=e.target,a=(0,n.Z)(this.state.selectedAnswer);if(i.checked)a.push(s);else{var o=a.indexOf(""+s);a.splice(o,1)}if(this.setState({selectedAnswer:a}),this.state.testId){var r=Object.assign({},this.state.test);r.questions=r.questions.map((function(e){return e.id===t.state.questionId&&(e.answered=a),e})),(0,w.MF)("users/"+this.state.uid+"/tests",r),this.setState({test:r})}},s.toggleShowAnswer=function(){var e=!this.state.answerShown;this.setState({answerShown:e})},s.toggleShowQuestions=function(){var e=!this.state.questionsShown;this.setState({questionsShown:e})},s.toggleEndExam=function(){var e=!this.state.endExamShown;this.setState({endExamShown:e})},s.gotoQuestion=function(e){var t=this;return function(){(0,p.navigate)("/course/ms-500/question/"+e+"?testId="+t.state.testId)}},s.endExam=function(){var e=this,t=this.state.test;t.isComplete=!0,(0,w.MF)("users/"+this.state.uid+"/tests",t).then((function(){(0,p.navigate)("/tests/summary?testId="+e.state.testId)}))},s.render=function(){var e=this,t=this.state.question.answers?this.state.question.answers:[];return t=(0,n.Z)(t).map((function(t,s){return t.isSelected=e.state.selectedAnswer.includes(""+s),t.optionStyles=Object.assign({},f),e.state.answerShown&&t.isCorrectAnswer&&(t.optionStyles.background="green"),t})),o.createElement(r.Z,{jsonLdType:"QAPage",jsonLd:this.state.jsonLd,title:this.state.questionText,description:this.state.questionText},o.createElement("main",null,o.createElement("div",null,o.createElement(u.Z,null,o.createElement(l.Z,null,o.createElement(c.Z,{md:6,xs:12,lg:8},o.createElement("h1",null,"Question ",this.state.questionIdx)),o.createElement(c.Z,{md:6,xs:12,lg:4,className:"flex-space-between"}," ",""!==this.state.previousQuestionId?o.createElement(d.Z,{as:p.Link,to:"/course/ms-500/question/"+this.state.previousQuestionId+"?testId="+this.state.testId},"Previous Question"):"",""!==this.state.nextQuestionId?o.createElement(d.Z,{as:p.Link,to:"/course/ms-500/question/"+this.state.nextQuestionId+"?testId="+this.state.testId},"Next Question"):this.state.testId?o.createElement(d.Z,{onClick:this.toggleEndExam,variant:"warning"},"End Exam"):"")),o.createElement(l.Z,{className:"img-width-100"},""!==this.state.questionHtml?o.createElement("div",{dangerouslySetInnerHTML:{__html:this.state.questionHtml}}):""),o.createElement(l.Z,null,t.map((function(t,s){return o.createElement("div",{style:t.optionStyles,key:s},o.createElement(h.Z.Check,{type:"checkbox",name:"AnswerCheck"+s,id:"AnswerCheck"+s,"data-index":s,inline:!0,style:v,checked:e.state.selectedAnswer.includes(""+s),onChange:e.handleCorrectAnswerChange}),o.createElement("label",{htmlFor:"AnswerCheck"+s},t.value))}))),o.createElement(l.Z,null,o.createElement(c.Z,null,this.state.answerShown?o.createElement("div",{style:x,dangerouslySetInnerHTML:{__html:this.state.referencesHtml}}):"")),o.createElement(l.Z,{className:"align-right"},o.createElement(c.Z,{md:6,xs:12,lg:8}),o.createElement(c.Z,{md:6,xs:12,lg:4,className:"flex-space-between"}," ",""!==this.state.previousQuestionId?o.createElement(d.Z,{as:p.Link,to:"/course/ms-500/question/"+this.state.previousQuestionId+"?testId="+this.state.testId},"Previous Question"):"",""!==this.state.nextQuestionId?o.createElement(d.Z,{as:p.Link,to:"/course/ms-500/question/"+this.state.nextQuestionId+"?testId="+this.state.testId},"Next Question"):this.state.testId?o.createElement(d.Z,{onClick:this.toggleEndExam,variant:"warning"},"End Exam"):"")),o.createElement(l.Z,null,o.createElement(c.Z,{xs:12,md:6},o.createElement(d.Z,{onClick:this.toggleShowAnswer,style:S},this.state.answerShown?o.createElement("span",null,"Hide Answer"):o.createElement("span",null,"Show Answer"))),this.state.testId?o.createElement(c.Z,{xs:12,md:6,className:"align-right"},o.createElement(d.Z,{onClick:this.toggleShowQuestions,style:S},this.state.questionsShown?o.createElement("span",null,"Hide Question List"):o.createElement("span",null,"Show Question List"))):""),this.state.testId?o.createElement(l.Z,null,o.createElement(c.Z,{className:"align-right"},o.createElement(d.Z,{onClick:this.toggleEndExam,variant:"warning",style:S},"End Exam"))):"")),o.createElement(m.Z,{show:this.state.questionsShown,onHide:this.toggleShowQuestions},o.createElement(m.Z.Header,null,o.createElement(m.Z.Title,null,"Showing Test Questions")),o.createElement(m.Z.Body,null,o.createElement(g.Z,{striped:!0,bordered:!0,hover:!0},o.createElement("thead",null,o.createElement("tr",null,o.createElement("th",null,"#"),o.createElement("th",null,"Answer"))),o.createElement("tbody",null,this.state.test&&this.state.test.questions?this.state.test.questions.map((function(t,s){return o.createElement("tr",{key:s,onClick:e.gotoQuestion(t.id),className:"cursor-pointer"},o.createElement("td",null,s+1),o.createElement("td",null,t.answered))})):""))),o.createElement(m.Z.Footer,null,o.createElement(d.Z,{variant:"primary",onClick:this.toggleShowQuestions},"Close"))),o.createElement(m.Z,{show:this.state.endExamShown,onHide:this.toggleEndExam},o.createElement(m.Z.Header,null,o.createElement(m.Z.Title,null,"Are you sure?")),o.createElement(m.Z.Body,null,this.state.endExamText),o.createElement(m.Z.Footer,null,o.createElement(d.Z,{variant:"primary",onClick:this.endExam},"Yes"),o.createElement(d.Z,{variant:"secondary",onClick:this.toggleEndExam},"No")))))},t}(o.Component);t.default=q}}]);
//# sourceMappingURL=component---src-pages-course-ms-500-question-sm-kh-o-3-h-d-js-fe6ee589a89c9b272762.js.map