"use strict";(self.webpackChunkWebSite=self.webpackChunkWebSite||[]).push([[4378],{58167:function(e,t,n){n.r(t);var s=n(42982),a=n(97326),i=n(94578),o=n(67294),r=n(37787),l=n(33639),u=n(20994),d=n(7408),c=n(46594),m=n(51708),h=n(68203),g=n(8169),p=n(25444),w=n(37841),E=n(71192),y=n.n(E),f={marginTop:"14px",marginBottom:"14px",display:"flex"},x={display:"flex",alignItems:"center",justifyContent:"center"},S={marginTop:"24px"},v={marginTop:"24px"},Z=function(e){function t(t){var n;(n=e.call(this,t)||this).setUid=n.setUid.bind((0,a.Z)(n)),n.handleCorrectAnswerChange=n.handleCorrectAnswerChange.bind((0,a.Z)(n)),n.toggleShowAnswer=n.toggleShowAnswer.bind((0,a.Z)(n)),n.toggleShowQuestions=n.toggleShowQuestions.bind((0,a.Z)(n)),n.gotoQuestion=n.gotoQuestion.bind((0,a.Z)(n)),n.toggleEndExam=n.toggleEndExam.bind((0,a.Z)(n)),n.endExam=n.endExam.bind((0,a.Z)(n));var s=new URLSearchParams(t.location.search);return n.state={questions:{},uid:"",testId:s.get("testId"),test:{},question:{answers:[{value:"Enable In-Place Archiving for the mailbox of User1",isCorrectAnswer:!1},{value:"From the Security & Compliance, perform a content search of the mailbox of User1",isCorrectAnswer:!1},{isCorrectAnswer:!0,value:"Place a Litigation Hold on the mailbox of User1"},{value:"Configure message delivery restrictions for the mailbox of User1",isCorrectAnswer:!1}],id:"Vtdx16cCp",question:{entityMap:{},blocks:[{entityRanges:[],depth:0,key:"9jr76",type:"unstyled",data:{},inlineStyleRanges:[],text:"Your company has a Microsoft 365 subscription that includes a user named User1."},{entityRanges:[],depth:0,key:"dvut0",data:{},inlineStyleRanges:[],text:"You suspect that User1 sent email messages to a competitor detailing company secrets.",type:"unstyled"},{type:"unstyled",data:{},entityRanges:[],inlineStyleRanges:[],key:"334h",depth:0,text:"You need to recommend a solution to ensure that you can review any email messages sent by User1 to the competitor, including sent items that were deleted."},{inlineStyleRanges:[],key:"53var",type:"unstyled",text:"What should you include in the recommendation? ",entityRanges:[],depth:0,data:{}}]},references:{entityMap:{0:{data:{url:"https://www.gitbit.org/course/ms-500/learn/Creating-and-managing-data-retention-to-conform-to-compliance-NsF7No40f",targetOption:"_blank"},type:"LINK",mutability:"MUTABLE"}},blocks:[{key:"blhm1",type:"unstyled",depth:0,text:"The litigation hold will retain everything in the mailbox (including items deleted and modified). The litigation hold also retains the archive mailbox.",inlineStyleRanges:[],entityRanges:[],data:{}},{depth:0,entityRanges:[{length:114,key:0,offset:0}],inlineStyleRanges:[],type:"unstyled",data:{},text:"https://www.gitbit.org/course/ms-500/learn/Creating-and-managing-data-retention-to-conform-to-compliance-NsF7No40f",key:"ec0u0"}]}},previousQuestionId:"",nextQuestionId:"",questionId:"Vtdx16cCp",questionIdx:"",questionHtml:"<p>Your company has a Microsoft 365 subscription that includes a user named User1.</p>\n<p>You suspect that User1 sent email messages to a competitor detailing company secrets.</p>\n<p>You need to recommend a solution to ensure that you can review any email messages sent by User1 to the competitor, including sent items that were deleted.</p>\n<p>What should you include in the recommendation?&nbsp;</p>\n",questionText:"Your company has a Microsoft 365 subscription that includes a user named User1. You suspect that User1 sent email messages to a competitor detailing company secrets. You need to recommend a solution to ensure that you can review any email messages sent by User1 to the competitor, including sent items that were deleted. What should you include in the recommendation? ",referencesHtml:'<p>The litigation hold will retain everything in the mailbox (including items deleted and modified). The litigation hold also retains the archive mailbox.</p>\n<p><a href="https://www.gitbit.org/course/ms-500/learn/Creating-and-managing-data-retention-to-conform-to-compliance-NsF7No40f" target="_blank">https://www.gitbit.org/course/ms-500/learn/Creating-and-managing-data-retention-to-conform-to-compliance-NsF7No40f</a></p>\n',selectedAnswer:[],answerShown:!1,questionsShown:!1,endExamShown:!1,endExamText:"Are you sure you want to end the exam?"},n.state.jsonLd={datePublished:"9-8-2021",keywords:["Microsoft","Microsoft 365","Office 365","MS-500","Microsoft 365 Security Administration"],mainEntity:{"@type":"Question",name:n.state.questionText.substring(0,150),text:n.state.questionText,answerCount:n.state.question.answers?n.state.question.answers.length:0,dateCreated:"2021-09-08T16:52:31Z",author:{"@type":"Person",name:"John Gruber",url:"https://medium.com/@gruberjl"}}},n.state.question.answers&&(n.state.jsonLd.mainEntity.acceptedAnswer={"@type":"Answer",text:n.state.question.answers?n.state.question.answers.filter((function(e){return e.isCorrectAnswer})).map((function(e){return e.value})).join("; "):"None",author:{type:"Person",name:"John Gruber",url:"https://medium.com/@gruberjl"},upvoteCount:1,dateCreated:"2021-09-08T16:52:31Z"}),n}(0,i.Z)(t,e);var n=t.prototype;return n.componentDidMount=function(){"undefined"!=typeof window&&(this.onAuthStateChangedListener=(0,w.Aj)(this.setUid))},n.componentWillUnmount=function(){this.onAuthStateChangedListener()},n.setUid=function(e){var t=this;e&&(this.setState({uid:e.uid}),this.state.testId?(0,w.QT)("users/"+this.state.uid+"/tests",this.state.testId).then((function(e){var n,s,a,i="",o="",r=!1,l=t.state.selectedAnswer;e.questions.forEach((function(e,u){r&&(o=e.id,r=!1),t.state.questionId===e.id&&(r=!0,n=e,a=u+1,s&&(i=s.id),n.answered&&(l=n.answered)),s=e})),(0,w.QT)("Tests/MS-500/Questions",n.id).then((function(e){var n=y()(e.question),s=y()(e.references);t.setState({question:e,questionHtml:n,referencesHtml:s})})),t.setState({test:e,questionIdx:a,nextQuestionId:o,previousQuestionId:i,selectedAnswer:l})})):(0,w.QT)("Tests/MS-500/Questions",this.state.questionId).then((function(e){var n=y()(e.question),s=y()(e.references);t.setState({question:e,questionHtml:n,referencesHtml:s})})))},n.handleCorrectAnswerChange=function(e){var t=this,n=e.target.dataset.index,a=e.target,i=(0,s.Z)(this.state.selectedAnswer);if(a.checked)i.push(n);else{var o=i.indexOf(""+n);i.splice(o,1)}if(this.setState({selectedAnswer:i}),this.state.testId){var r=Object.assign({},this.state.test);r.questions=r.questions.map((function(e){return e.id===t.state.questionId&&(e.answered=i),e})),(0,w.MF)("users/"+this.state.uid+"/tests",r),this.setState({test:r})}},n.toggleShowAnswer=function(){var e=!this.state.answerShown;this.setState({answerShown:e})},n.toggleShowQuestions=function(){var e=!this.state.questionsShown;this.setState({questionsShown:e})},n.toggleEndExam=function(){var e=!this.state.endExamShown;this.setState({endExamShown:e})},n.gotoQuestion=function(e){var t=this;return function(){(0,p.navigate)("/course/ms-500/question/"+e+"?testId="+t.state.testId)}},n.endExam=function(){var e=this,t=this.state.test;t.isComplete=!0,(0,w.MF)("users/"+this.state.uid+"/tests",t).then((function(){(0,p.navigate)("/tests/summary?testId="+e.state.testId)}))},n.render=function(){var e=this,t=this.state.question.answers?this.state.question.answers:[];return t=(0,s.Z)(t).map((function(t,n){return t.isSelected=e.state.selectedAnswer.includes(""+n),t.optionStyles=Object.assign({},f),e.state.answerShown&&t.isCorrectAnswer&&(t.optionStyles.background="green"),t})),o.createElement(r.Z,{jsonLdType:"QAPage",jsonLd:this.state.jsonLd,title:this.state.questionText,description:this.state.questionText},o.createElement("main",null,o.createElement("div",null,o.createElement(l.Z,null,o.createElement(u.Z,null,o.createElement(d.Z,{md:6,xs:12,lg:8},o.createElement("h1",null,"Question ",this.state.questionIdx)),o.createElement(d.Z,{md:6,xs:12,lg:4,className:"flex-space-between"}," ",""!==this.state.previousQuestionId?o.createElement(c.Z,{as:p.Link,to:"/course/ms-500/question/"+this.state.previousQuestionId+"?testId="+this.state.testId},"Previous Question"):"",""!==this.state.nextQuestionId?o.createElement(c.Z,{as:p.Link,to:"/course/ms-500/question/"+this.state.nextQuestionId+"?testId="+this.state.testId},"Next Question"):this.state.testId?o.createElement(c.Z,{onClick:this.toggleEndExam,variant:"warning"},"End Exam"):"")),o.createElement(u.Z,{className:"img-width-100"},""!==this.state.questionHtml?o.createElement("div",{dangerouslySetInnerHTML:{__html:this.state.questionHtml}}):""),o.createElement(u.Z,null,t.map((function(t,n){return o.createElement("div",{style:t.optionStyles,key:n},o.createElement(m.Z.Check,{type:"checkbox",name:"AnswerCheck"+n,id:"AnswerCheck"+n,"data-index":n,inline:!0,style:x,checked:e.state.selectedAnswer.includes(""+n),onChange:e.handleCorrectAnswerChange}),o.createElement("label",{htmlFor:"AnswerCheck"+n},t.value))}))),o.createElement(u.Z,null,o.createElement(d.Z,null,this.state.answerShown?o.createElement("div",{style:S,dangerouslySetInnerHTML:{__html:this.state.referencesHtml}}):"")),o.createElement(u.Z,{className:"align-right"},o.createElement(d.Z,{md:6,xs:12,lg:8}),o.createElement(d.Z,{md:6,xs:12,lg:4,className:"flex-space-between"}," ",""!==this.state.previousQuestionId?o.createElement(c.Z,{as:p.Link,to:"/course/ms-500/question/"+this.state.previousQuestionId+"?testId="+this.state.testId},"Previous Question"):"",""!==this.state.nextQuestionId?o.createElement(c.Z,{as:p.Link,to:"/course/ms-500/question/"+this.state.nextQuestionId+"?testId="+this.state.testId},"Next Question"):this.state.testId?o.createElement(c.Z,{onClick:this.toggleEndExam,variant:"warning"},"End Exam"):"")),o.createElement(u.Z,null,o.createElement(d.Z,{xs:12,md:6},o.createElement(c.Z,{onClick:this.toggleShowAnswer,style:v},this.state.answerShown?o.createElement("span",null,"Hide Answer"):o.createElement("span",null,"Show Answer"))),this.state.testId?o.createElement(d.Z,{xs:12,md:6,className:"align-right"},o.createElement(c.Z,{onClick:this.toggleShowQuestions,style:v},this.state.questionsShown?o.createElement("span",null,"Hide Question List"):o.createElement("span",null,"Show Question List"))):""),this.state.testId?o.createElement(u.Z,null,o.createElement(d.Z,{className:"align-right"},o.createElement(c.Z,{onClick:this.toggleEndExam,variant:"warning",style:v},"End Exam"))):"")),o.createElement(h.Z,{show:this.state.questionsShown,onHide:this.toggleShowQuestions},o.createElement(h.Z.Header,null,o.createElement(h.Z.Title,null,"Showing Test Questions")),o.createElement(h.Z.Body,null,o.createElement(g.Z,{striped:!0,bordered:!0,hover:!0},o.createElement("thead",null,o.createElement("tr",null,o.createElement("th",null,"#"),o.createElement("th",null,"Answer"))),o.createElement("tbody",null,this.state.test&&this.state.test.questions?this.state.test.questions.map((function(t,n){return o.createElement("tr",{key:n,onClick:e.gotoQuestion(t.id),className:"cursor-pointer"},o.createElement("td",null,n+1),o.createElement("td",null,t.answered))})):""))),o.createElement(h.Z.Footer,null,o.createElement(c.Z,{variant:"primary",onClick:this.toggleShowQuestions},"Close"))),o.createElement(h.Z,{show:this.state.endExamShown,onHide:this.toggleEndExam},o.createElement(h.Z.Header,null,o.createElement(h.Z.Title,null,"Are you sure?")),o.createElement(h.Z.Body,null,this.state.endExamText),o.createElement(h.Z.Footer,null,o.createElement(c.Z,{variant:"primary",onClick:this.endExam},"Yes"),o.createElement(c.Z,{variant:"secondary",onClick:this.toggleEndExam},"No")))))},t}(o.Component);t.default=Z}}]);
//# sourceMappingURL=component---src-pages-course-ms-500-question-vtdx-16-c-cp-js-37f92ef673f83dfd6c22.js.map