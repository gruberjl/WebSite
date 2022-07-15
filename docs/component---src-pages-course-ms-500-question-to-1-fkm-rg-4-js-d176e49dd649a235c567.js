"use strict";(self.webpackChunkWebSite=self.webpackChunkWebSite||[]).push([[3172],{64009:function(e,t,n){n.r(t);var s=n(42982),a=n(97326),i=n(94578),o=n(67294),r=n(78278),l=n(33639),d=n(20994),u=n(7408),c=n(46594),h=n(51708),m=n(68203),g=n(8169),w=n(25444),p=n(37841),y=n(71192),f=n.n(y),E={marginTop:"14px",marginBottom:"14px",display:"flex"},x={display:"flex",alignItems:"center",justifyContent:"center"},b={marginTop:"24px"},S={marginTop:"24px"},v=function(e){function t(t){var n;(n=e.call(this,t)||this).setUid=n.setUid.bind((0,a.Z)(n)),n.handleCorrectAnswerChange=n.handleCorrectAnswerChange.bind((0,a.Z)(n)),n.toggleShowAnswer=n.toggleShowAnswer.bind((0,a.Z)(n)),n.toggleShowQuestions=n.toggleShowQuestions.bind((0,a.Z)(n)),n.gotoQuestion=n.gotoQuestion.bind((0,a.Z)(n)),n.toggleEndExam=n.toggleEndExam.bind((0,a.Z)(n)),n.endExam=n.endExam.bind((0,a.Z)(n));var s=new URLSearchParams(t.location.search);return n.state={questions:{},uid:"",testId:s.get("testId"),test:{},question:{answers:[{isCorrectAnswer:!1,value:"Set-AdminAuditLogConfig -AdminAuditLogEnabled $true -AdminAuditLogCmdlets *Mailbox*"},{value:'Set-Maibox -Identity "John Gruber" -AuditEnabled $true',isCorrectAnswer:!0}],id:"TO1FKMRg4",question:{entityMap:{},blocks:[{type:"unstyled",inlineStyleRanges:[],entityRanges:[],key:"7qt30",data:{},text:"Your organization has a Microsoft 365 tenant. Your organization has a user named John Gruber. Several users have full access to John Gruber's mailbox.",depth:0},{text:"A few emails that were sent to John Gruber have been read and deleted before John Gruber viewed them.",entityRanges:[],type:"unstyled",inlineStyleRanges:[],data:{},depth:0,key:"cafcm"},{type:"unstyled",data:{},text:"You've been asked to see who accessed and deleted the emails. You search the audit log in the Microsoft Defender admin center to see who read and deleted the emails but the audit logs are blank. So your manager has asked you to configure the audit logs so your can view who accessed the mailbox in the future.",entityRanges:[],inlineStyleRanges:[],depth:0,key:"2ri6"},{depth:0,inlineStyleRanges:[],key:"9ip01",text:"What Exchange PowerShell commands do you need to run to verify you can see the audit logs in the future?",entityRanges:[],type:"unstyled",data:{}}]},references:{blocks:[{entityRanges:[],text:"To enable Exchange auditing we'll need to use PowerShell.",key:"addi5",type:"unstyled",data:{},depth:0,inlineStyleRanges:[]},{entityRanges:[],inlineStyleRanges:[],key:"c980p",data:{},type:"unstyled",text:"1. Open PowerShell and connect to Exchange Online using Connect-ExchangeOnline.",depth:0},{type:"unstyled",key:"898ib",text:'2. Run the following command "Set-AdminAuditLogConfig -AdminAuditLogEnabled $true -AdminAuditLogCmdlets *Mailbox*"',inlineStyleRanges:[],depth:0,data:{},entityRanges:[]},{type:"unstyled",key:"3cjkc",text:'3. Then run the following command "Set-OrganizationConfig -AuditDisabled $false"',entityRanges:[],inlineStyleRanges:[],data:{},depth:0},{inlineStyleRanges:[],text:'You can also replace step 3 with the following: Set-Mailbox -Identity "User1 " -AuditDelegate @{Add="MailboxLogin"}',type:"unstyled",entityRanges:[],depth:0,key:"3s83k",data:{}},{inlineStyleRanges:[],entityRanges:[{offset:0,key:0,length:105}],key:"2qcvr",depth:0,text:"https://www.gitbit.org/course/ms-500/learn/Auditing-sign-ins-and-other-actions-in-Microsoft-365-sH_Ee1DW1",data:{},type:"unstyled"},{data:{},type:"unstyled",key:"cd35f",text:"https://docs.microsoft.com/en-us/powershell/module/exchange/policy-and-compliance-audit/set-adminauditlogconfig?view=exchange-ps",inlineStyleRanges:[],entityRanges:[{key:1,length:128,offset:0}],depth:0},{entityRanges:[{length:101,key:2,offset:0}],depth:0,text:"https://docs.microsoft.com/en-us/microsoft-365/compliance/enable-mailbox-auditing?view=o365-worldwide ",inlineStyleRanges:[],type:"unstyled",key:"2eq4a",data:{}}],entityMap:{0:{mutability:"MUTABLE",data:{targetOption:"_blank",url:"https://www.gitbit.org/course/ms-500/learn/Auditing-sign-ins-and-other-actions-in-Microsoft-365-sH_Ee1DW1"},type:"LINK"},1:{mutability:"MUTABLE",data:{url:"https://docs.microsoft.com/en-us/powershell/module/exchange/policy-and-compliance-audit/set-adminauditlogconfig?view=exchange-ps",targetOption:"_blank"},type:"LINK"},2:{mutability:"MUTABLE",data:{url:"https://docs.microsoft.com/en-us/microsoft-365/compliance/enable-mailbox-auditing?view=o365-worldwide",targetOption:"_blank"},type:"LINK"}}}},previousQuestionId:"",nextQuestionId:"",questionId:"TO1FKMRg4",questionIdx:"",questionHtml:"<p>Your organization has a Microsoft 365 tenant. Your organization has a user named John Gruber. Several users have full access to John Gruber's mailbox.</p>\n<p>A few emails that were sent to John Gruber have been read and deleted before John Gruber viewed them.</p>\n<p>You've been asked to see who accessed and deleted the emails. You search the audit log in the Microsoft Defender admin center to see who read and deleted the emails but the audit logs are blank. So your manager has asked you to configure the audit logs so your can view who accessed the mailbox in the future.</p>\n<p>What Exchange PowerShell commands do you need to run to verify you can see the audit logs in the future?</p>\n",questionText:"Your organization has a Microsoft 365 tenant. Your organization has a user named John Gruber. Several users have full access to John Gruber's mailbox. A few emails that were sent to John Gruber have been read and deleted before John Gruber viewed them. You've been asked to see who accessed and deleted the emails. You search the audit log in the Microsoft Defender admin center to see who read and deleted the emails but the audit logs are blank. So your manager has asked you to configure the audit logs so your can view who accessed the mailbox in the future. What Exchange PowerShell commands do you need to run to verify you can see the audit logs in the future?",referencesHtml:'<p>To enable Exchange auditing we\'ll need to use PowerShell.</p>\n<p>1. Open PowerShell and connect to Exchange Online using Connect-ExchangeOnline.</p>\n<p>2. Run the following command "Set-AdminAuditLogConfig -AdminAuditLogEnabled $true -AdminAuditLogCmdlets *Mailbox*"</p>\n<p>3. Then run the following command "Set-OrganizationConfig -AuditDisabled $false"</p>\n<p>You can also replace step 3 with the following: Set-Mailbox -Identity "User1 " -AuditDelegate @{Add="MailboxLogin"}</p>\n<p><a href="https://www.gitbit.org/course/ms-500/learn/Auditing-sign-ins-and-other-actions-in-Microsoft-365-sH_Ee1DW1" target="_blank">https://www.gitbit.org/course/ms-500/learn/Auditing-sign-ins-and-other-actions-in-Microsoft-365-sH_Ee1DW1</a></p>\n<p><a href="https://docs.microsoft.com/en-us/powershell/module/exchange/policy-and-compliance-audit/set-adminauditlogconfig?view=exchange-ps" target="_blank">https://docs.microsoft.com/en-us/powershell/module/exchange/policy-and-compliance-audit/set-adminauditlogconfig?view=exchange-ps</a></p>\n<p><a href="https://docs.microsoft.com/en-us/microsoft-365/compliance/enable-mailbox-auditing?view=o365-worldwide" target="_blank">https://docs.microsoft.com/en-us/microsoft-365/compliance/enable-mailbox-auditing?view=o365-worldwide</a>&nbsp;</p>\n',selectedAnswer:[],answerShown:!1,questionsShown:!1,endExamShown:!1,endExamText:"Are you sure you want to end the exam?"},n.state.jsonLd={datePublished:"9-8-2021",keywords:["Microsoft","Microsoft 365","Office 365","MS-500","Microsoft 365 Security Administration"],mainEntity:{"@type":"Question",name:n.state.questionText.substring(0,150),text:n.state.questionText,answerCount:n.state.question.answers?n.state.question.answers.length:0,dateCreated:"2021-09-08T16:52:31Z",author:{"@type":"Person",name:"John Gruber",url:"https://medium.com/@gruberjl"}}},n.state.question.answers&&(n.state.jsonLd.mainEntity.acceptedAnswer={"@type":"Answer",text:n.state.question.answers?n.state.question.answers.filter((function(e){return e.isCorrectAnswer})).map((function(e){return e.value})).join("; "):"None",url:"https://www.gitbit.org/course/ms-500/question/TO1FKMRg4",author:{type:"Person",name:"John Gruber",url:"https://medium.com/@gruberjl"},upvoteCount:1,dateCreated:"2021-09-08T16:52:31Z"}),n}(0,i.Z)(t,e);var n=t.prototype;return n.componentDidMount=function(){"undefined"!=typeof window&&(this.onAuthStateChangedListener=(0,p.Aj)(this.setUid))},n.componentWillUnmount=function(){this.onAuthStateChangedListener()},n.setUid=function(e){var t=this;e&&(this.setState({uid:e.uid}),this.state.testId?(0,p.QT)("users/"+this.state.uid+"/tests",this.state.testId).then((function(e){var n,s,a,i="",o="",r=!1,l=t.state.selectedAnswer;e.questions.forEach((function(e,d){r&&(o=e.id,r=!1),t.state.questionId===e.id&&(r=!0,n=e,a=d+1,s&&(i=s.id),n.answered&&(l=n.answered)),s=e})),(0,p.QT)("Tests/MS-500/Questions",n.id).then((function(e){var n=f()(e.question),s=f()(e.references);t.setState({question:e,questionHtml:n,referencesHtml:s})})),t.setState({test:e,questionIdx:a,nextQuestionId:o,previousQuestionId:i,selectedAnswer:l})})):(0,p.QT)("Tests/MS-500/Questions",this.state.questionId).then((function(e){var n=f()(e.question),s=f()(e.references);t.setState({question:e,questionHtml:n,referencesHtml:s})})))},n.handleCorrectAnswerChange=function(e){var t=this,n=e.target.dataset.index,a=e.target,i=(0,s.Z)(this.state.selectedAnswer);if(a.checked)i.push(n);else{var o=i.indexOf(""+n);i.splice(o,1)}if(this.setState({selectedAnswer:i}),this.state.testId){var r=Object.assign({},this.state.test);r.questions=r.questions.map((function(e){return e.id===t.state.questionId&&(e.answered=i),e})),(0,p.MF)("users/"+this.state.uid+"/tests",r),this.setState({test:r})}},n.toggleShowAnswer=function(){var e=!this.state.answerShown;this.setState({answerShown:e})},n.toggleShowQuestions=function(){var e=!this.state.questionsShown;this.setState({questionsShown:e})},n.toggleEndExam=function(){var e=!this.state.endExamShown;this.setState({endExamShown:e})},n.gotoQuestion=function(e){var t=this;return function(){(0,w.navigate)("/course/ms-500/question/"+e+"?testId="+t.state.testId)}},n.endExam=function(){var e=this,t=this.state.test;t.isComplete=!0,(0,p.MF)("users/"+this.state.uid+"/tests",t).then((function(){(0,w.navigate)("/tests/summary?testId="+e.state.testId)}))},n.render=function(){var e=this,t=this.state.question.answers?this.state.question.answers:[];return t=(0,s.Z)(t).map((function(t,n){return t.isSelected=e.state.selectedAnswer.includes(""+n),t.optionStyles=Object.assign({},E),e.state.answerShown&&t.isCorrectAnswer&&(t.optionStyles.background="green"),t})),o.createElement(r.Z,{jsonLdType:"QAPage",jsonLd:this.state.jsonLd,title:this.state.questionText,description:this.state.questionText},o.createElement("main",null,o.createElement("div",null,o.createElement(l.Z,null,o.createElement(d.Z,null,o.createElement(u.Z,{md:6,xs:12,lg:8},o.createElement("h1",null,"Question ",this.state.questionIdx)),o.createElement(u.Z,{md:6,xs:12,lg:4,className:"flex-space-between"}," ",""!==this.state.previousQuestionId?o.createElement(c.Z,{as:w.Link,to:"/course/ms-500/question/"+this.state.previousQuestionId+"?testId="+this.state.testId},"Previous Question"):"",""!==this.state.nextQuestionId?o.createElement(c.Z,{as:w.Link,to:"/course/ms-500/question/"+this.state.nextQuestionId+"?testId="+this.state.testId},"Next Question"):this.state.testId?o.createElement(c.Z,{onClick:this.toggleEndExam,variant:"warning"},"End Exam"):"")),o.createElement(d.Z,{className:"img-width-100"},""!==this.state.questionHtml?o.createElement("div",{dangerouslySetInnerHTML:{__html:this.state.questionHtml}}):""),o.createElement(d.Z,null,t.map((function(t,n){return o.createElement("div",{style:t.optionStyles,key:n},o.createElement(h.Z.Check,{type:"checkbox",name:"AnswerCheck"+n,id:"AnswerCheck"+n,"data-index":n,inline:!0,style:x,checked:e.state.selectedAnswer.includes(""+n),onChange:e.handleCorrectAnswerChange}),o.createElement("label",{htmlFor:"AnswerCheck"+n},t.value))}))),o.createElement(d.Z,null,o.createElement(u.Z,null,this.state.answerShown?o.createElement("div",{style:b,dangerouslySetInnerHTML:{__html:this.state.referencesHtml}}):"")),o.createElement(d.Z,{className:"align-right"},o.createElement(u.Z,{md:6,xs:12,lg:8}),o.createElement(u.Z,{md:6,xs:12,lg:4,className:"flex-space-between"}," ",""!==this.state.previousQuestionId?o.createElement(c.Z,{as:w.Link,to:"/course/ms-500/question/"+this.state.previousQuestionId+"?testId="+this.state.testId},"Previous Question"):"",""!==this.state.nextQuestionId?o.createElement(c.Z,{as:w.Link,to:"/course/ms-500/question/"+this.state.nextQuestionId+"?testId="+this.state.testId},"Next Question"):this.state.testId?o.createElement(c.Z,{onClick:this.toggleEndExam,variant:"warning"},"End Exam"):"")),o.createElement(d.Z,null,o.createElement(u.Z,{xs:12,md:6},o.createElement(c.Z,{onClick:this.toggleShowAnswer,style:S},this.state.answerShown?o.createElement("span",null,"Hide Answer"):o.createElement("span",null,"Show Answer"))),this.state.testId?o.createElement(u.Z,{xs:12,md:6,className:"align-right"},o.createElement(c.Z,{onClick:this.toggleShowQuestions,style:S},this.state.questionsShown?o.createElement("span",null,"Hide Question List"):o.createElement("span",null,"Show Question List"))):""),this.state.testId?o.createElement(d.Z,null,o.createElement(u.Z,{className:"align-right"},o.createElement(c.Z,{onClick:this.toggleEndExam,variant:"warning",style:S},"End Exam"))):"")),o.createElement(m.Z,{show:this.state.questionsShown,onHide:this.toggleShowQuestions},o.createElement(m.Z.Header,null,o.createElement(m.Z.Title,null,"Showing Test Questions")),o.createElement(m.Z.Body,null,o.createElement(g.Z,{striped:!0,bordered:!0,hover:!0},o.createElement("thead",null,o.createElement("tr",null,o.createElement("th",null,"#"),o.createElement("th",null,"Answer"))),o.createElement("tbody",null,this.state.test&&this.state.test.questions?this.state.test.questions.map((function(t,n){return o.createElement("tr",{key:n,onClick:e.gotoQuestion(t.id),className:"cursor-pointer"},o.createElement("td",null,n+1),o.createElement("td",null,t.answered))})):""))),o.createElement(m.Z.Footer,null,o.createElement(c.Z,{variant:"primary",onClick:this.toggleShowQuestions},"Close"))),o.createElement(m.Z,{show:this.state.endExamShown,onHide:this.toggleEndExam},o.createElement(m.Z.Header,null,o.createElement(m.Z.Title,null,"Are you sure?")),o.createElement(m.Z.Body,null,this.state.endExamText),o.createElement(m.Z.Footer,null,o.createElement(c.Z,{variant:"primary",onClick:this.endExam},"Yes"),o.createElement(c.Z,{variant:"secondary",onClick:this.toggleEndExam},"No")))))},t}(o.Component);t.default=v}}]);
//# sourceMappingURL=component---src-pages-course-ms-500-question-to-1-fkm-rg-4-js-d176e49dd649a235c567.js.map