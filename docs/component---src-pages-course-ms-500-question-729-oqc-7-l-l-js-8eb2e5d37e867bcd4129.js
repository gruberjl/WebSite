"use strict";(self.webpackChunkWebSite=self.webpackChunkWebSite||[]).push([[357],{98466:function(e,t,n){n.r(t);var s=n(42982),a=n(97326),i=n(94578),o=n(67294),l=n(78278),r=n(33639),u=n(20994),c=n(7408),d=n(46594),h=n(51708),m=n(68203),g=n(8169),p=n(25444),w=n(37841),y=n(71192),E=n.n(y),f={marginTop:"14px",marginBottom:"14px",display:"flex"},x={display:"flex",alignItems:"center",justifyContent:"center"},b={marginTop:"24px"},S={marginTop:"24px"},v=function(e){function t(t){var n;(n=e.call(this,t)||this).setUid=n.setUid.bind((0,a.Z)(n)),n.handleCorrectAnswerChange=n.handleCorrectAnswerChange.bind((0,a.Z)(n)),n.toggleShowAnswer=n.toggleShowAnswer.bind((0,a.Z)(n)),n.toggleShowQuestions=n.toggleShowQuestions.bind((0,a.Z)(n)),n.gotoQuestion=n.gotoQuestion.bind((0,a.Z)(n)),n.toggleEndExam=n.toggleEndExam.bind((0,a.Z)(n)),n.endExam=n.endExam.bind((0,a.Z)(n));var s=new URLSearchParams(t.location.search);return n.state={questions:{},uid:"",testId:s.get("testId"),test:{},question:{answers:[{value:"From the Security & Compliance admin center, create a label policy",isCorrectAnswer:!1},{value:"From Exchange Online PowerShell, run Start-RetentionAutoTagLearning",isCorrectAnswer:!1},{isCorrectAnswer:!0,value:"From Exchange Online PowerShell, run Start-ManagedFolderAssistant"},{isCorrectAnswer:!1,value:"From the Security & Compliance admin center, create a data loss prevention (DLP) policy"}],id:"729OQC7lL",question:{blocks:[{entityRanges:[],key:"63nes",data:{},type:"unstyled",depth:0,text:"You have a Microsoft 365 subscription.",inlineStyleRanges:[]},{type:"unstyled",inlineStyleRanges:[],key:"670mu",text:"Yesterday, you created retention labels and published the labels to Microsoft Exchange Online mailboxes.",data:{},entityRanges:[],depth:0},{key:"3jhv4",text:"You need to ensure that the labels will be available for manual assignment as soon as possible.",data:{},inlineStyleRanges:[],depth:0,entityRanges:[],type:"unstyled"},{type:"unstyled",inlineStyleRanges:[],entityRanges:[],key:"4qe14",depth:0,data:{},text:"What should you do?"}],entityMap:{}},references:{blocks:[{entityRanges:[],depth:0,inlineStyleRanges:[],type:"unstyled",data:{},text:'Run the following PowerShell Command: "Get-Mailbox -ResultSize unlimited | ?{$_.Name -notlike "DiscoverySearchMailbox*"} | %{ Start-ManagedFolderAssistant $_.UserPrincipalName }"',key:"cug0"},{data:{},depth:0,entityRanges:[],inlineStyleRanges:[],text:'Note: If you only need to publish the labels to one user immediately you can use "Start-ManagedFolderAssistant UPN" and replace UPN with the user\'s sign-in name',type:"unstyled",key:"4ce7u"},{inlineStyleRanges:[],type:"unstyled",key:"63al3",entityRanges:[{key:0,length:114,offset:0}],text:"https://www.gitbit.org/course/ms-500/learn/Creating-and-managing-data-retention-to-conform-to-compliance-NsF7No40f",data:{},depth:0},{inlineStyleRanges:[],data:{},entityRanges:[{key:1,length:105,offset:0}],text:"https://docs.microsoft.com/en-us/powershell/module/exchange/start-managedfolderassistant?view=exchange-ps",key:"9t9k7",type:"unstyled",depth:0}],entityMap:{0:{type:"LINK",data:{targetOption:"_blank",url:"https://www.gitbit.org/course/ms-500/learn/Creating-and-managing-data-retention-to-conform-to-compliance-NsF7No40f"},mutability:"MUTABLE"},1:{mutability:"MUTABLE",data:{targetOption:"_blank",url:"https://docs.microsoft.com/en-us/office365/securitycompliance/set-up-a-custom-blocked-urls-list-wtih-atp"},type:"LINK"}}}},previousQuestionId:"",nextQuestionId:"",questionId:"729OQC7lL",questionIdx:"",questionHtml:"<p>You have a Microsoft 365 subscription.</p>\n<p>Yesterday, you created retention labels and published the labels to Microsoft Exchange Online mailboxes.</p>\n<p>You need to ensure that the labels will be available for manual assignment as soon as possible.</p>\n<p>What should you do?</p>\n",questionText:"You have a Microsoft 365 subscription. Yesterday, you created retention labels and published the labels to Microsoft Exchange Online mailboxes. You need to ensure that the labels will be available for manual assignment as soon as possible. What should you do?",referencesHtml:'<p>Run the following PowerShell Command: "Get-Mailbox -ResultSize unlimited | ?{$_.Name -notlike "DiscoverySearchMailbox*"} | %{ Start-ManagedFolderAssistant $_.UserPrincipalName }"</p>\n<p>Note: If you only need to publish the labels to one user immediately you can use "Start-ManagedFolderAssistant UPN" and replace UPN with the user\'s sign-in name</p>\n<p><a href="https://www.gitbit.org/course/ms-500/learn/Creating-and-managing-data-retention-to-conform-to-compliance-NsF7No40f" target="_blank">https://www.gitbit.org/course/ms-500/learn/Creating-and-managing-data-retention-to-conform-to-compliance-NsF7No40f</a></p>\n<p><a href="https://docs.microsoft.com/en-us/office365/securitycompliance/set-up-a-custom-blocked-urls-list-wtih-atp" target="_blank">https://docs.microsoft.com/en-us/powershell/module/exchange/start-managedfolderassistant?view=exchange-ps</a></p>\n',selectedAnswer:[],answerShown:!1,questionsShown:!1,endExamShown:!1,endExamText:"Are you sure you want to end the exam?"},n.state.jsonLd={datePublished:"9-8-2021",keywords:["Microsoft","Microsoft 365","Office 365","MS-500","Microsoft 365 Security Administration"],mainEntity:{"@type":"Question",name:n.state.questionText.substring(0,150),text:n.state.questionText,answerCount:n.state.question.answers?n.state.question.answers.length:0,dateCreated:"2021-09-08T16:52:31Z",author:{"@type":"Person",name:"John Gruber",url:"https://medium.com/@gruberjl"}}},n.state.question.answers&&(n.state.jsonLd.mainEntity.acceptedAnswer={"@type":"Answer",text:n.state.question.answers?n.state.question.answers.filter((function(e){return e.isCorrectAnswer})).map((function(e){return e.value})).join("; "):"None",url:"https://www.gitbit.org/course/ms-500/question/729OQC7lL",author:{type:"Person",name:"John Gruber",url:"https://medium.com/@gruberjl"},upvoteCount:1,dateCreated:"2021-09-08T16:52:31Z"}),n}(0,i.Z)(t,e);var n=t.prototype;return n.componentDidMount=function(){"undefined"!=typeof window&&(this.onAuthStateChangedListener=(0,w.Aj)(this.setUid))},n.componentWillUnmount=function(){this.onAuthStateChangedListener()},n.setUid=function(e){var t=this;e&&(this.setState({uid:e.uid}),this.state.testId?(0,w.QT)("users/"+this.state.uid+"/tests",this.state.testId).then((function(e){var n,s,a,i="",o="",l=!1,r=t.state.selectedAnswer;e.questions.forEach((function(e,u){l&&(o=e.id,l=!1),t.state.questionId===e.id&&(l=!0,n=e,a=u+1,s&&(i=s.id),n.answered&&(r=n.answered)),s=e})),(0,w.QT)("Tests/MS-500/Questions",n.id).then((function(e){var n=E()(e.question),s=E()(e.references);t.setState({question:e,questionHtml:n,referencesHtml:s})})),t.setState({test:e,questionIdx:a,nextQuestionId:o,previousQuestionId:i,selectedAnswer:r})})):(0,w.QT)("Tests/MS-500/Questions",this.state.questionId).then((function(e){var n=E()(e.question),s=E()(e.references);t.setState({question:e,questionHtml:n,referencesHtml:s})})))},n.handleCorrectAnswerChange=function(e){var t=this,n=e.target.dataset.index,a=e.target,i=(0,s.Z)(this.state.selectedAnswer);if(a.checked)i.push(n);else{var o=i.indexOf(""+n);i.splice(o,1)}if(this.setState({selectedAnswer:i}),this.state.testId){var l=Object.assign({},this.state.test);l.questions=l.questions.map((function(e){return e.id===t.state.questionId&&(e.answered=i),e})),(0,w.MF)("users/"+this.state.uid+"/tests",l),this.setState({test:l})}},n.toggleShowAnswer=function(){var e=!this.state.answerShown;this.setState({answerShown:e})},n.toggleShowQuestions=function(){var e=!this.state.questionsShown;this.setState({questionsShown:e})},n.toggleEndExam=function(){var e=!this.state.endExamShown;this.setState({endExamShown:e})},n.gotoQuestion=function(e){var t=this;return function(){(0,p.navigate)("/course/ms-500/question/"+e+"?testId="+t.state.testId)}},n.endExam=function(){var e=this,t=this.state.test;t.isComplete=!0,(0,w.MF)("users/"+this.state.uid+"/tests",t).then((function(){(0,p.navigate)("/tests/summary?testId="+e.state.testId)}))},n.render=function(){var e=this,t=this.state.question.answers?this.state.question.answers:[];return t=(0,s.Z)(t).map((function(t,n){return t.isSelected=e.state.selectedAnswer.includes(""+n),t.optionStyles=Object.assign({},f),e.state.answerShown&&t.isCorrectAnswer&&(t.optionStyles.background="green"),t})),o.createElement(l.Z,{jsonLdType:"QAPage",jsonLd:this.state.jsonLd,title:this.state.questionText,description:this.state.questionText},o.createElement("main",null,o.createElement("div",null,o.createElement(r.Z,null,o.createElement(u.Z,null,o.createElement(c.Z,{md:6,xs:12,lg:8},o.createElement("h1",null,"Question ",this.state.questionIdx)),o.createElement(c.Z,{md:6,xs:12,lg:4,className:"flex-space-between"}," ",""!==this.state.previousQuestionId?o.createElement(d.Z,{as:p.Link,to:"/course/ms-500/question/"+this.state.previousQuestionId+"?testId="+this.state.testId},"Previous Question"):"",""!==this.state.nextQuestionId?o.createElement(d.Z,{as:p.Link,to:"/course/ms-500/question/"+this.state.nextQuestionId+"?testId="+this.state.testId},"Next Question"):this.state.testId?o.createElement(d.Z,{onClick:this.toggleEndExam,variant:"warning"},"End Exam"):"")),o.createElement(u.Z,{className:"img-width-100"},""!==this.state.questionHtml?o.createElement("div",{dangerouslySetInnerHTML:{__html:this.state.questionHtml}}):""),o.createElement(u.Z,null,t.map((function(t,n){return o.createElement("div",{style:t.optionStyles,key:n},o.createElement(h.Z.Check,{type:"checkbox",name:"AnswerCheck"+n,id:"AnswerCheck"+n,"data-index":n,inline:!0,style:x,checked:e.state.selectedAnswer.includes(""+n),onChange:e.handleCorrectAnswerChange}),o.createElement("label",{htmlFor:"AnswerCheck"+n},t.value))}))),o.createElement(u.Z,null,o.createElement(c.Z,null,this.state.answerShown?o.createElement("div",{style:b,dangerouslySetInnerHTML:{__html:this.state.referencesHtml}}):"")),o.createElement(u.Z,{className:"align-right"},o.createElement(c.Z,{md:6,xs:12,lg:8}),o.createElement(c.Z,{md:6,xs:12,lg:4,className:"flex-space-between"}," ",""!==this.state.previousQuestionId?o.createElement(d.Z,{as:p.Link,to:"/course/ms-500/question/"+this.state.previousQuestionId+"?testId="+this.state.testId},"Previous Question"):"",""!==this.state.nextQuestionId?o.createElement(d.Z,{as:p.Link,to:"/course/ms-500/question/"+this.state.nextQuestionId+"?testId="+this.state.testId},"Next Question"):this.state.testId?o.createElement(d.Z,{onClick:this.toggleEndExam,variant:"warning"},"End Exam"):"")),o.createElement(u.Z,null,o.createElement(c.Z,{xs:12,md:6},o.createElement(d.Z,{onClick:this.toggleShowAnswer,style:S},this.state.answerShown?o.createElement("span",null,"Hide Answer"):o.createElement("span",null,"Show Answer"))),this.state.testId?o.createElement(c.Z,{xs:12,md:6,className:"align-right"},o.createElement(d.Z,{onClick:this.toggleShowQuestions,style:S},this.state.questionsShown?o.createElement("span",null,"Hide Question List"):o.createElement("span",null,"Show Question List"))):""),this.state.testId?o.createElement(u.Z,null,o.createElement(c.Z,{className:"align-right"},o.createElement(d.Z,{onClick:this.toggleEndExam,variant:"warning",style:S},"End Exam"))):"")),o.createElement(m.Z,{show:this.state.questionsShown,onHide:this.toggleShowQuestions},o.createElement(m.Z.Header,null,o.createElement(m.Z.Title,null,"Showing Test Questions")),o.createElement(m.Z.Body,null,o.createElement(g.Z,{striped:!0,bordered:!0,hover:!0},o.createElement("thead",null,o.createElement("tr",null,o.createElement("th",null,"#"),o.createElement("th",null,"Answer"))),o.createElement("tbody",null,this.state.test&&this.state.test.questions?this.state.test.questions.map((function(t,n){return o.createElement("tr",{key:n,onClick:e.gotoQuestion(t.id),className:"cursor-pointer"},o.createElement("td",null,n+1),o.createElement("td",null,t.answered))})):""))),o.createElement(m.Z.Footer,null,o.createElement(d.Z,{variant:"primary",onClick:this.toggleShowQuestions},"Close"))),o.createElement(m.Z,{show:this.state.endExamShown,onHide:this.toggleEndExam},o.createElement(m.Z.Header,null,o.createElement(m.Z.Title,null,"Are you sure?")),o.createElement(m.Z.Body,null,this.state.endExamText),o.createElement(m.Z.Footer,null,o.createElement(d.Z,{variant:"primary",onClick:this.endExam},"Yes"),o.createElement(d.Z,{variant:"secondary",onClick:this.toggleEndExam},"No")))))},t}(o.Component);t.default=v}}]);
//# sourceMappingURL=component---src-pages-course-ms-500-question-729-oqc-7-l-l-js-8eb2e5d37e867bcd4129.js.map