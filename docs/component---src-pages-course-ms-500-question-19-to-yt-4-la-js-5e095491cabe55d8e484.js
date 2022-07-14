"use strict";(self.webpackChunkWebSite=self.webpackChunkWebSite||[]).push([[292],{76317:function(e,t,n){n.r(t);var s=n(42982),i=n(97326),a=n(94578),o=n(67294),r=n(78278),l=n(33639),u=n(20994),c=n(7408),d=n(46594),h=n(51708),m=n(68203),g=n(8169),w=n(25444),p=n(37841),f=n(71192),E=n.n(f),x={marginTop:"14px",marginBottom:"14px",display:"flex"},y={display:"flex",alignItems:"center",justifyContent:"center"},b={marginTop:"24px"},v={marginTop:"24px"},S=function(e){function t(t){var n;(n=e.call(this,t)||this).setUid=n.setUid.bind((0,i.Z)(n)),n.handleCorrectAnswerChange=n.handleCorrectAnswerChange.bind((0,i.Z)(n)),n.toggleShowAnswer=n.toggleShowAnswer.bind((0,i.Z)(n)),n.toggleShowQuestions=n.toggleShowQuestions.bind((0,i.Z)(n)),n.gotoQuestion=n.gotoQuestion.bind((0,i.Z)(n)),n.toggleEndExam=n.toggleEndExam.bind((0,i.Z)(n)),n.endExam=n.endExam.bind((0,i.Z)(n));var s=new URLSearchParams(t.location.search);return n.state={questions:{},uid:"",testId:s.get("testId"),test:{},question:{answers:[{isCorrectAnswer:!1,value:"Open Microsoft Azure Active Directory Connect (Azure AD Connect) and configure attribute filtering."},{isCorrectAnswer:!1,value:"Purchase a Enterprise Mobility + Security E5 license for every user."},{isCorrectAnswer:!1,value:"Open Microsoft Azure Active Directory Connect (Azure AD Connect) and select Directory extension attribute sync."},{value:"Migrate all of the mailboxes hosted on-premises Microsoft 365",isCorrectAnswer:!0}],id:"19TOYt4la",question:{blocks:[{text:"All user users have a Microsoft 365 E5 license. You have a hybrid Microsoft Exchange Server. Some of your user's mailboxes are located in Microsoft 365 while others are located in the on-premises Exchange server",inlineStyleRanges:[],entityRanges:[],key:"3bsgp",data:{},type:"unstyled",depth:0},{data:{},depth:0,entityRanges:[],key:"69ltf",text:"You are tasked with setting up and configuring Microsoft Defender for Office 365 anti-phishing policy.",inlineStyleRanges:[],type:"unstyled"},{type:"unstyled",key:"1o6pn",data:{},entityRanges:[],text:"Management has asked you to enable mailbox intelligence for all users.",depth:0,inlineStyleRanges:[]},{type:"unstyled",data:{},key:"d4hu7",depth:0,entityRanges:[],inlineStyleRanges:[],text:"What do you need to do to verify all mailboxes have mailbox intelligence enabled and working?"}],entityMap:{}},references:{blocks:[{text:"Mailbox intelligence will scan a user's mailbox to see if the user has sent or received emails from the sender of an email before. For mailbox intelligence to scan a mailbox then mailbox must be located in Microsoft 365's Exchange Online",data:{},entityRanges:[],key:"fvnj6",inlineStyleRanges:[],depth:0,type:"unstyled"},{key:"7qat6",data:{},depth:0,text:"https://www.gitbit.org/course/ms-500/learn/Protecting-email-against-phishing-attacks-GCOOUsSBT ",type:"unstyled",entityRanges:[{length:94,offset:0,key:0}],inlineStyleRanges:[]}],entityMap:{0:{data:{targetOption:"_blank",url:"https://www.gitbit.org/course/ms-500/learn/Protecting-email-against-phishing-attacks-GCOOUsSBT"},type:"LINK",mutability:"MUTABLE"}}}},previousQuestionId:"",nextQuestionId:"",questionId:"19TOYt4la",questionIdx:"",questionHtml:"<p>All user users have a Microsoft 365 E5 license. You have a hybrid Microsoft Exchange Server. Some of your user's mailboxes are located in Microsoft 365 while others are located in the on-premises Exchange server</p>\n<p>You are tasked with setting up and configuring Microsoft Defender for Office 365 anti-phishing policy.</p>\n<p>Management has asked you to enable mailbox intelligence for all users.</p>\n<p>What do you need to do to verify all mailboxes have mailbox intelligence enabled and working?</p>\n",questionText:"All user users have a Microsoft 365 E5 license. You have a hybrid Microsoft Exchange Server. Some of your user's mailboxes are located in Microsoft 365 while others are located in the on-premises Exchange server You are tasked with setting up and configuring Microsoft Defender for Office 365 anti-phishing policy. Management has asked you to enable mailbox intelligence for all users. What do you need to do to verify all mailboxes have mailbox intelligence enabled and working?",referencesHtml:'<p>Mailbox intelligence will scan a user\'s mailbox to see if the user has sent or received emails from the sender of an email before. For mailbox intelligence to scan a mailbox then mailbox must be located in Microsoft 365\'s Exchange Online</p>\n<p><a href="https://www.gitbit.org/course/ms-500/learn/Protecting-email-against-phishing-attacks-GCOOUsSBT" target="_blank">https://www.gitbit.org/course/ms-500/learn/Protecting-email-against-phishing-attacks-GCOOUsSBT</a>&nbsp;</p>\n',selectedAnswer:[],answerShown:!1,questionsShown:!1,endExamShown:!1,endExamText:"Are you sure you want to end the exam?"},n.state.jsonLd={datePublished:"9-8-2021",keywords:["Microsoft","Microsoft 365","Office 365","MS-500","Microsoft 365 Security Administration"],mainEntity:{"@type":"Question",name:n.state.questionText.substring(0,150),text:n.state.questionText,answerCount:n.state.question.answers?n.state.question.answers.length:0,dateCreated:"2021-09-08T16:52:31Z",author:{"@type":"Person",name:"John Gruber",url:"https://medium.com/@gruberjl"}}},n.state.question.answers&&(n.state.jsonLd.mainEntity.acceptedAnswer={"@type":"Answer",text:n.state.question.answers?n.state.question.answers.filter((function(e){return e.isCorrectAnswer})).map((function(e){return e.value})).join("; "):"None",url:"https://www.gitbit.org/course/ms-500/question/19TOYt4la",author:{type:"Person",name:"John Gruber",url:"https://medium.com/@gruberjl"},upvoteCount:1,dateCreated:"2021-09-08T16:52:31Z"}),n}(0,a.Z)(t,e);var n=t.prototype;return n.componentDidMount=function(){"undefined"!=typeof window&&(this.onAuthStateChangedListener=(0,p.Aj)(this.setUid))},n.componentWillUnmount=function(){this.onAuthStateChangedListener()},n.setUid=function(e){var t=this;e&&(this.setState({uid:e.uid}),this.state.testId?(0,p.QT)("users/"+this.state.uid+"/tests",this.state.testId).then((function(e){var n,s,i,a="",o="",r=!1,l=t.state.selectedAnswer;e.questions.forEach((function(e,u){r&&(o=e.id,r=!1),t.state.questionId===e.id&&(r=!0,n=e,i=u+1,s&&(a=s.id),n.answered&&(l=n.answered)),s=e})),(0,p.QT)("Tests/MS-500/Questions",n.id).then((function(e){var n=E()(e.question),s=E()(e.references);t.setState({question:e,questionHtml:n,referencesHtml:s})})),t.setState({test:e,questionIdx:i,nextQuestionId:o,previousQuestionId:a,selectedAnswer:l})})):(0,p.QT)("Tests/MS-500/Questions",this.state.questionId).then((function(e){var n=E()(e.question),s=E()(e.references);t.setState({question:e,questionHtml:n,referencesHtml:s})})))},n.handleCorrectAnswerChange=function(e){var t=this,n=e.target.dataset.index,i=e.target,a=(0,s.Z)(this.state.selectedAnswer);if(i.checked)a.push(n);else{var o=a.indexOf(""+n);a.splice(o,1)}if(this.setState({selectedAnswer:a}),this.state.testId){var r=Object.assign({},this.state.test);r.questions=r.questions.map((function(e){return e.id===t.state.questionId&&(e.answered=a),e})),(0,p.MF)("users/"+this.state.uid+"/tests",r),this.setState({test:r})}},n.toggleShowAnswer=function(){var e=!this.state.answerShown;this.setState({answerShown:e})},n.toggleShowQuestions=function(){var e=!this.state.questionsShown;this.setState({questionsShown:e})},n.toggleEndExam=function(){var e=!this.state.endExamShown;this.setState({endExamShown:e})},n.gotoQuestion=function(e){var t=this;return function(){(0,w.navigate)("/course/ms-500/question/"+e+"?testId="+t.state.testId)}},n.endExam=function(){var e=this,t=this.state.test;t.isComplete=!0,(0,p.MF)("users/"+this.state.uid+"/tests",t).then((function(){(0,w.navigate)("/tests/summary?testId="+e.state.testId)}))},n.render=function(){var e=this,t=this.state.question.answers?this.state.question.answers:[];return t=(0,s.Z)(t).map((function(t,n){return t.isSelected=e.state.selectedAnswer.includes(""+n),t.optionStyles=Object.assign({},x),e.state.answerShown&&t.isCorrectAnswer&&(t.optionStyles.background="green"),t})),o.createElement(r.Z,{jsonLdType:"QAPage",jsonLd:this.state.jsonLd,title:this.state.questionText,description:this.state.questionText},o.createElement("main",null,o.createElement("div",null,o.createElement(l.Z,null,o.createElement(u.Z,null,o.createElement(c.Z,{md:6,xs:12,lg:8},o.createElement("h1",null,"Question ",this.state.questionIdx)),o.createElement(c.Z,{md:6,xs:12,lg:4,className:"flex-space-between"}," ",""!==this.state.previousQuestionId?o.createElement(d.Z,{as:w.Link,to:"/course/ms-500/question/"+this.state.previousQuestionId+"?testId="+this.state.testId},"Previous Question"):"",""!==this.state.nextQuestionId?o.createElement(d.Z,{as:w.Link,to:"/course/ms-500/question/"+this.state.nextQuestionId+"?testId="+this.state.testId},"Next Question"):this.state.testId?o.createElement(d.Z,{onClick:this.toggleEndExam,variant:"warning"},"End Exam"):"")),o.createElement(u.Z,{className:"img-width-100"},""!==this.state.questionHtml?o.createElement("div",{dangerouslySetInnerHTML:{__html:this.state.questionHtml}}):""),o.createElement(u.Z,null,t.map((function(t,n){return o.createElement("div",{style:t.optionStyles,key:n},o.createElement(h.Z.Check,{type:"checkbox",name:"AnswerCheck"+n,id:"AnswerCheck"+n,"data-index":n,inline:!0,style:y,checked:e.state.selectedAnswer.includes(""+n),onChange:e.handleCorrectAnswerChange}),o.createElement("label",{htmlFor:"AnswerCheck"+n},t.value))}))),o.createElement(u.Z,null,o.createElement(c.Z,null,this.state.answerShown?o.createElement("div",{style:b,dangerouslySetInnerHTML:{__html:this.state.referencesHtml}}):"")),o.createElement(u.Z,{className:"align-right"},o.createElement(c.Z,{md:6,xs:12,lg:8}),o.createElement(c.Z,{md:6,xs:12,lg:4,className:"flex-space-between"}," ",""!==this.state.previousQuestionId?o.createElement(d.Z,{as:w.Link,to:"/course/ms-500/question/"+this.state.previousQuestionId+"?testId="+this.state.testId},"Previous Question"):"",""!==this.state.nextQuestionId?o.createElement(d.Z,{as:w.Link,to:"/course/ms-500/question/"+this.state.nextQuestionId+"?testId="+this.state.testId},"Next Question"):this.state.testId?o.createElement(d.Z,{onClick:this.toggleEndExam,variant:"warning"},"End Exam"):"")),o.createElement(u.Z,null,o.createElement(c.Z,{xs:12,md:6},o.createElement(d.Z,{onClick:this.toggleShowAnswer,style:v},this.state.answerShown?o.createElement("span",null,"Hide Answer"):o.createElement("span",null,"Show Answer"))),this.state.testId?o.createElement(c.Z,{xs:12,md:6,className:"align-right"},o.createElement(d.Z,{onClick:this.toggleShowQuestions,style:v},this.state.questionsShown?o.createElement("span",null,"Hide Question List"):o.createElement("span",null,"Show Question List"))):""),this.state.testId?o.createElement(u.Z,null,o.createElement(c.Z,{className:"align-right"},o.createElement(d.Z,{onClick:this.toggleEndExam,variant:"warning",style:v},"End Exam"))):"")),o.createElement(m.Z,{show:this.state.questionsShown,onHide:this.toggleShowQuestions},o.createElement(m.Z.Header,null,o.createElement(m.Z.Title,null,"Showing Test Questions")),o.createElement(m.Z.Body,null,o.createElement(g.Z,{striped:!0,bordered:!0,hover:!0},o.createElement("thead",null,o.createElement("tr",null,o.createElement("th",null,"#"),o.createElement("th",null,"Answer"))),o.createElement("tbody",null,this.state.test&&this.state.test.questions?this.state.test.questions.map((function(t,n){return o.createElement("tr",{key:n,onClick:e.gotoQuestion(t.id),className:"cursor-pointer"},o.createElement("td",null,n+1),o.createElement("td",null,t.answered))})):""))),o.createElement(m.Z.Footer,null,o.createElement(d.Z,{variant:"primary",onClick:this.toggleShowQuestions},"Close"))),o.createElement(m.Z,{show:this.state.endExamShown,onHide:this.toggleEndExam},o.createElement(m.Z.Header,null,o.createElement(m.Z.Title,null,"Are you sure?")),o.createElement(m.Z.Body,null,this.state.endExamText),o.createElement(m.Z.Footer,null,o.createElement(d.Z,{variant:"primary",onClick:this.endExam},"Yes"),o.createElement(d.Z,{variant:"secondary",onClick:this.toggleEndExam},"No")))))},t}(o.Component);t.default=S}}]);
//# sourceMappingURL=component---src-pages-course-ms-500-question-19-to-yt-4-la-js-5e095491cabe55d8e484.js.map