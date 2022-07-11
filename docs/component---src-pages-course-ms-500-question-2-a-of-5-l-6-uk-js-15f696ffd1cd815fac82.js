"use strict";(self.webpackChunkWebSite=self.webpackChunkWebSite||[]).push([[4716],{78499:function(e,t,n){n.r(t);var s=n(42982),a=n(97326),i=n(94578),o=n(67294),r=n(78278),l=n(33639),u=n(20994),c=n(7408),d=n(46594),h=n(51708),m=n(68203),p=n(8169),g=n(25444),w=n(37841),y=n(71192),E=n.n(y),f={marginTop:"14px",marginBottom:"14px",display:"flex"},x={display:"flex",alignItems:"center",justifyContent:"center"},b={marginTop:"24px"},C={marginTop:"24px"},S=function(e){function t(t){var n;(n=e.call(this,t)||this).setUid=n.setUid.bind((0,a.Z)(n)),n.handleCorrectAnswerChange=n.handleCorrectAnswerChange.bind((0,a.Z)(n)),n.toggleShowAnswer=n.toggleShowAnswer.bind((0,a.Z)(n)),n.toggleShowQuestions=n.toggleShowQuestions.bind((0,a.Z)(n)),n.gotoQuestion=n.gotoQuestion.bind((0,a.Z)(n)),n.toggleEndExam=n.toggleEndExam.bind((0,a.Z)(n)),n.endExam=n.endExam.bind((0,a.Z)(n));var s=new URLSearchParams(t.location.search);return n.state={questions:{},uid:"",testId:s.get("testId"),test:{},question:{answers:[{isCorrectAnswer:!1,value:"Yes"},{value:"No",isCorrectAnswer:!0}],id:"2aOF5l6UK",question:{entityMap:{},blocks:[{data:{},entityRanges:[],depth:0,type:"unstyled",text:"You have a Microsoft 365 tenant. You create a label named CompanyConfidential in the Microsoft Compliance admin center. You publish CompanyConfidential to a global policy.",key:"7q6b3",inlineStyleRanges:[]},{type:"unstyled",text:"A user protects an email message by using CompanyConfidential and sends the label to several external recipients. The external recipients report that they cannot open the email message.",data:{},key:"cmpff",inlineStyleRanges:[],entityRanges:[],depth:0},{inlineStyleRanges:[],text:"You need to ensure that the external recipients can open protected email messages sent to them.",type:"unstyled",depth:0,data:{},entityRanges:[],key:"ccint"},{data:{},key:"3tria",inlineStyleRanges:[],type:"unstyled",depth:0,text:"You modify the content expiration settings of the label.",entityRanges:[]},{inlineStyleRanges:[],entityRanges:[],data:{},key:"5hsq1",depth:0,text:"Does that meet the goal?",type:"unstyled"}]},references:{entityMap:{0:{mutability:"MUTABLE",data:{targetOption:"_blank",url:"https://www.gitbit.org/course/ms-500/learn/How-to-classify-data-using-labels-in-Microsoft-365-vLweLmxZf"},type:"LINK"}},blocks:[{entityRanges:[],key:"coq2j",inlineStyleRanges:[],text:'It\'s most likely the "Assign permissions" are set on the label. If the correct answer was content expiration the question would state "the user sent the email on day X. The recipient attempted to open the email on day Y."',type:"unstyled",depth:0,data:{}},{key:"47otm",entityRanges:[{offset:0,length:103,key:0}],inlineStyleRanges:[],depth:0,type:"unstyled",text:"https://www.gitbit.org/course/ms-500/learn/How-to-classify-data-using-labels-in-Microsoft-365-vLweLmxZf ",data:{}}]}},previousQuestionId:"",nextQuestionId:"",questionId:"2aOF5l6UK",questionIdx:"",questionHtml:"<p>You have a Microsoft 365 tenant. You create a label named CompanyConfidential in the Microsoft Compliance admin center. You publish CompanyConfidential to a global policy.</p>\n<p>A user protects an email message by using CompanyConfidential and sends the label to several external recipients. The external recipients report that they cannot open the email message.</p>\n<p>You need to ensure that the external recipients can open protected email messages sent to them.</p>\n<p>You modify the content expiration settings of the label.</p>\n<p>Does that meet the goal?</p>\n",questionText:"You have a Microsoft 365 tenant. You create a label named CompanyConfidential in the Microsoft Compliance admin center. You publish CompanyConfidential to a global policy. A user protects an email message by using CompanyConfidential and sends the label to several external recipients. The external recipients report that they cannot open the email message. You need to ensure that the external recipients can open protected email messages sent to them. You modify the content expiration settings of the label. Does that meet the goal?",referencesHtml:'<p>It\'s most likely the "Assign permissions" are set on the label. If the correct answer was content expiration the question would state "the user sent the email on day X. The recipient attempted to open the email on day Y."</p>\n<p><a href="https://www.gitbit.org/course/ms-500/learn/How-to-classify-data-using-labels-in-Microsoft-365-vLweLmxZf" target="_blank">https://www.gitbit.org/course/ms-500/learn/How-to-classify-data-using-labels-in-Microsoft-365-vLweLmxZf</a>&nbsp;</p>\n',selectedAnswer:[],answerShown:!1,questionsShown:!1,endExamShown:!1,endExamText:"Are you sure you want to end the exam?"},n.state.jsonLd={datePublished:"9-8-2021",keywords:["Microsoft","Microsoft 365","Office 365","MS-500","Microsoft 365 Security Administration"],mainEntity:{"@type":"Question",name:n.state.questionText.substring(0,150),text:n.state.questionText,answerCount:n.state.question.answers?n.state.question.answers.length:0,dateCreated:"2021-09-08T16:52:31Z",author:{"@type":"Person",name:"John Gruber",url:"https://medium.com/@gruberjl"}}},n.state.question.answers&&(n.state.jsonLd.mainEntity.acceptedAnswer={"@type":"Answer",text:n.state.question.answers?n.state.question.answers.filter((function(e){return e.isCorrectAnswer})).map((function(e){return e.value})).join("; "):"None",author:{type:"Person",name:"John Gruber",url:"https://medium.com/@gruberjl"},upvoteCount:1,dateCreated:"2021-09-08T16:52:31Z"}),n}(0,i.Z)(t,e);var n=t.prototype;return n.componentDidMount=function(){"undefined"!=typeof window&&(this.onAuthStateChangedListener=(0,w.Aj)(this.setUid))},n.componentWillUnmount=function(){this.onAuthStateChangedListener()},n.setUid=function(e){var t=this;e&&(this.setState({uid:e.uid}),this.state.testId?(0,w.QT)("users/"+this.state.uid+"/tests",this.state.testId).then((function(e){var n,s,a,i="",o="",r=!1,l=t.state.selectedAnswer;e.questions.forEach((function(e,u){r&&(o=e.id,r=!1),t.state.questionId===e.id&&(r=!0,n=e,a=u+1,s&&(i=s.id),n.answered&&(l=n.answered)),s=e})),(0,w.QT)("Tests/MS-500/Questions",n.id).then((function(e){var n=E()(e.question),s=E()(e.references);t.setState({question:e,questionHtml:n,referencesHtml:s})})),t.setState({test:e,questionIdx:a,nextQuestionId:o,previousQuestionId:i,selectedAnswer:l})})):(0,w.QT)("Tests/MS-500/Questions",this.state.questionId).then((function(e){var n=E()(e.question),s=E()(e.references);t.setState({question:e,questionHtml:n,referencesHtml:s})})))},n.handleCorrectAnswerChange=function(e){var t=this,n=e.target.dataset.index,a=e.target,i=(0,s.Z)(this.state.selectedAnswer);if(a.checked)i.push(n);else{var o=i.indexOf(""+n);i.splice(o,1)}if(this.setState({selectedAnswer:i}),this.state.testId){var r=Object.assign({},this.state.test);r.questions=r.questions.map((function(e){return e.id===t.state.questionId&&(e.answered=i),e})),(0,w.MF)("users/"+this.state.uid+"/tests",r),this.setState({test:r})}},n.toggleShowAnswer=function(){var e=!this.state.answerShown;this.setState({answerShown:e})},n.toggleShowQuestions=function(){var e=!this.state.questionsShown;this.setState({questionsShown:e})},n.toggleEndExam=function(){var e=!this.state.endExamShown;this.setState({endExamShown:e})},n.gotoQuestion=function(e){var t=this;return function(){(0,g.navigate)("/course/ms-500/question/"+e+"?testId="+t.state.testId)}},n.endExam=function(){var e=this,t=this.state.test;t.isComplete=!0,(0,w.MF)("users/"+this.state.uid+"/tests",t).then((function(){(0,g.navigate)("/tests/summary?testId="+e.state.testId)}))},n.render=function(){var e=this,t=this.state.question.answers?this.state.question.answers:[];return t=(0,s.Z)(t).map((function(t,n){return t.isSelected=e.state.selectedAnswer.includes(""+n),t.optionStyles=Object.assign({},f),e.state.answerShown&&t.isCorrectAnswer&&(t.optionStyles.background="green"),t})),o.createElement(r.Z,{jsonLdType:"QAPage",jsonLd:this.state.jsonLd,title:this.state.questionText,description:this.state.questionText},o.createElement("main",null,o.createElement("div",null,o.createElement(l.Z,null,o.createElement(u.Z,null,o.createElement(c.Z,{md:6,xs:12,lg:8},o.createElement("h1",null,"Question ",this.state.questionIdx)),o.createElement(c.Z,{md:6,xs:12,lg:4,className:"flex-space-between"}," ",""!==this.state.previousQuestionId?o.createElement(d.Z,{as:g.Link,to:"/course/ms-500/question/"+this.state.previousQuestionId+"?testId="+this.state.testId},"Previous Question"):"",""!==this.state.nextQuestionId?o.createElement(d.Z,{as:g.Link,to:"/course/ms-500/question/"+this.state.nextQuestionId+"?testId="+this.state.testId},"Next Question"):this.state.testId?o.createElement(d.Z,{onClick:this.toggleEndExam,variant:"warning"},"End Exam"):"")),o.createElement(u.Z,{className:"img-width-100"},""!==this.state.questionHtml?o.createElement("div",{dangerouslySetInnerHTML:{__html:this.state.questionHtml}}):""),o.createElement(u.Z,null,t.map((function(t,n){return o.createElement("div",{style:t.optionStyles,key:n},o.createElement(h.Z.Check,{type:"checkbox",name:"AnswerCheck"+n,id:"AnswerCheck"+n,"data-index":n,inline:!0,style:x,checked:e.state.selectedAnswer.includes(""+n),onChange:e.handleCorrectAnswerChange}),o.createElement("label",{htmlFor:"AnswerCheck"+n},t.value))}))),o.createElement(u.Z,null,o.createElement(c.Z,null,this.state.answerShown?o.createElement("div",{style:b,dangerouslySetInnerHTML:{__html:this.state.referencesHtml}}):"")),o.createElement(u.Z,{className:"align-right"},o.createElement(c.Z,{md:6,xs:12,lg:8}),o.createElement(c.Z,{md:6,xs:12,lg:4,className:"flex-space-between"}," ",""!==this.state.previousQuestionId?o.createElement(d.Z,{as:g.Link,to:"/course/ms-500/question/"+this.state.previousQuestionId+"?testId="+this.state.testId},"Previous Question"):"",""!==this.state.nextQuestionId?o.createElement(d.Z,{as:g.Link,to:"/course/ms-500/question/"+this.state.nextQuestionId+"?testId="+this.state.testId},"Next Question"):this.state.testId?o.createElement(d.Z,{onClick:this.toggleEndExam,variant:"warning"},"End Exam"):"")),o.createElement(u.Z,null,o.createElement(c.Z,{xs:12,md:6},o.createElement(d.Z,{onClick:this.toggleShowAnswer,style:C},this.state.answerShown?o.createElement("span",null,"Hide Answer"):o.createElement("span",null,"Show Answer"))),this.state.testId?o.createElement(c.Z,{xs:12,md:6,className:"align-right"},o.createElement(d.Z,{onClick:this.toggleShowQuestions,style:C},this.state.questionsShown?o.createElement("span",null,"Hide Question List"):o.createElement("span",null,"Show Question List"))):""),this.state.testId?o.createElement(u.Z,null,o.createElement(c.Z,{className:"align-right"},o.createElement(d.Z,{onClick:this.toggleEndExam,variant:"warning",style:C},"End Exam"))):"")),o.createElement(m.Z,{show:this.state.questionsShown,onHide:this.toggleShowQuestions},o.createElement(m.Z.Header,null,o.createElement(m.Z.Title,null,"Showing Test Questions")),o.createElement(m.Z.Body,null,o.createElement(p.Z,{striped:!0,bordered:!0,hover:!0},o.createElement("thead",null,o.createElement("tr",null,o.createElement("th",null,"#"),o.createElement("th",null,"Answer"))),o.createElement("tbody",null,this.state.test&&this.state.test.questions?this.state.test.questions.map((function(t,n){return o.createElement("tr",{key:n,onClick:e.gotoQuestion(t.id),className:"cursor-pointer"},o.createElement("td",null,n+1),o.createElement("td",null,t.answered))})):""))),o.createElement(m.Z.Footer,null,o.createElement(d.Z,{variant:"primary",onClick:this.toggleShowQuestions},"Close"))),o.createElement(m.Z,{show:this.state.endExamShown,onHide:this.toggleEndExam},o.createElement(m.Z.Header,null,o.createElement(m.Z.Title,null,"Are you sure?")),o.createElement(m.Z.Body,null,this.state.endExamText),o.createElement(m.Z.Footer,null,o.createElement(d.Z,{variant:"primary",onClick:this.endExam},"Yes"),o.createElement(d.Z,{variant:"secondary",onClick:this.toggleEndExam},"No")))))},t}(o.Component);t.default=S}}]);
//# sourceMappingURL=component---src-pages-course-ms-500-question-2-a-of-5-l-6-uk-js-15f696ffd1cd815fac82.js.map