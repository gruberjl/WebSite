"use strict";(self.webpackChunkWebSite=self.webpackChunkWebSite||[]).push([[7137],{1980:function(e,t,n){n.r(t);var s=n(42982),a=n(97326),i=n(94578),r=n(67294),o=n(37787),l=n(33639),u=n(20994),d=n(7408),c=n(46594),h=n(51708),m=n(68203),g=n(8169),p=n(25444),w=n(37841),y=n(71192),E=n.n(y),f={marginTop:"14px",marginBottom:"14px",display:"flex"},A={display:"flex",alignItems:"center",justifyContent:"center"},x={marginTop:"24px"},v={marginTop:"24px"},S=function(e){function t(t){var n;(n=e.call(this,t)||this).setUid=n.setUid.bind((0,a.Z)(n)),n.handleCorrectAnswerChange=n.handleCorrectAnswerChange.bind((0,a.Z)(n)),n.toggleShowAnswer=n.toggleShowAnswer.bind((0,a.Z)(n)),n.toggleShowQuestions=n.toggleShowQuestions.bind((0,a.Z)(n)),n.gotoQuestion=n.gotoQuestion.bind((0,a.Z)(n)),n.toggleEndExam=n.toggleEndExam.bind((0,a.Z)(n)),n.endExam=n.endExam.bind((0,a.Z)(n));var s=new URLSearchParams(t.location.search);return n.state={questions:{},uid:"",testId:s.get("testId"),test:{},question:{answers:[{value:"Azure Active Directory",isCorrectAnswer:!0},{value:"Cloud App Security",isCorrectAnswer:!1},{value:"Security & Compliance",isCorrectAnswer:!1},{value:"Microsoft 365",isCorrectAnswer:!1}],id:"To3w-ry36",question:{blocks:[{text:"You have a Microsoft 365 subscription.",data:{},entityRanges:[],key:"7c56s",depth:0,inlineStyleRanges:[],type:"unstyled"},{entityRanges:[],data:{},type:"unstyled",inlineStyleRanges:[],text:"From the Microsoft 365 admin center, you create a new user.",key:"9g8hv",depth:0},{depth:0,inlineStyleRanges:[],text:"You plan to assign the Reports reader role to the user.",key:"dkvfi",type:"unstyled",entityRanges:[],data:{}},{data:{},depth:0,key:"cvqf4",type:"unstyled",text:"You need to view the permissions of the Reports reader role.",inlineStyleRanges:[],entityRanges:[]},{type:"unstyled",entityRanges:[],depth:0,inlineStyleRanges:[],text:"Which admin center should you use?",data:{},key:"aphun"}],entityMap:{}},references:{entityMap:{0:{data:{url:"https://www.gitbit.org/course/ms-500/learn/Creating-and-managing-admins-through-roles-7CpqFkPZU",targetOption:"_blank"},type:"LINK",mutability:"MUTABLE"},1:{type:"LINK",mutability:"MUTABLE",data:{url:"https://aad.portal.azure.com/#blade/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/RolesAndAdministrators",targetOption:"_blank"}}},blocks:[{key:"7etnr",entityRanges:[],inlineStyleRanges:[],depth:0,type:"unstyled",data:{},text:"The best place to view the rights of an admin role is Azure Active Directory."},{depth:0,data:{},inlineStyleRanges:[],key:"2ct22",type:"unstyled",entityRanges:[{length:95,key:0,offset:0}],text:"https://www.gitbit.org/course/ms-500/learn/Creating-and-managing-admins-through-roles-7CpqFkPZU"},{depth:0,text:"https://aad.portal.azure.com/#blade/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/RolesAndAdministrators > click on a role.",data:{},entityRanges:[{offset:0,key:1,length:101}],key:"dk8qi",inlineStyleRanges:[],type:"unstyled"}]}},previousQuestionId:"",nextQuestionId:"",questionId:"To3w-ry36",questionIdx:"",questionHtml:"<p>You have a Microsoft 365 subscription.</p>\n<p>From the Microsoft 365 admin center, you create a new user.</p>\n<p>You plan to assign the Reports reader role to the user.</p>\n<p>You need to view the permissions of the Reports reader role.</p>\n<p>Which admin center should you use?</p>\n",questionText:"You have a Microsoft 365 subscription. From the Microsoft 365 admin center, you create a new user. You plan to assign the Reports reader role to the user. You need to view the permissions of the Reports reader role. Which admin center should you use?",referencesHtml:'<p>The best place to view the rights of an admin role is Azure Active Directory.</p>\n<p><a href="https://www.gitbit.org/course/ms-500/learn/Creating-and-managing-admins-through-roles-7CpqFkPZU" target="_blank">https://www.gitbit.org/course/ms-500/learn/Creating-and-managing-admins-through-roles-7CpqFkPZU</a></p>\n<p><a href="https://aad.portal.azure.com/#blade/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/RolesAndAdministrators" target="_blank">https://aad.portal.azure.com/#blade/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/RolesAndAdministrators</a> &gt; click on a role.</p>\n',selectedAnswer:[],answerShown:!1,questionsShown:!1,endExamShown:!1,endExamText:"Are you sure you want to end the exam?"},n.state.jsonLd={datePublished:"9-8-2021",keywords:["Microsoft","Microsoft 365","Office 365","MS-500","Microsoft 365 Security Administration"],mainEntity:{"@type":"Question",name:n.state.questionText.substring(0,150),text:n.state.questionText,answerCount:n.state.question.answers?n.state.question.answers.length:0,dateCreated:"2021-09-08T16:52:31Z",author:{"@type":"Person",name:"John Gruber",url:"https://medium.com/@gruberjl"}}},n.state.question.answers&&(n.state.jsonLd.mainEntity.acceptedAnswer={"@type":"Answer",text:n.state.question.answers?n.state.question.answers.filter((function(e){return e.isCorrectAnswer})).map((function(e){return e.value})).join("; "):"None",author:{type:"Person",name:"John Gruber",url:"https://medium.com/@gruberjl"},upvoteCount:1,dateCreated:"2021-09-08T16:52:31Z"}),n}(0,i.Z)(t,e);var n=t.prototype;return n.componentDidMount=function(){"undefined"!=typeof window&&(this.onAuthStateChangedListener=(0,w.Aj)(this.setUid))},n.componentWillUnmount=function(){this.onAuthStateChangedListener()},n.setUid=function(e){var t=this;e&&(this.setState({uid:e.uid}),this.state.testId?(0,w.QT)("users/"+this.state.uid+"/tests",this.state.testId).then((function(e){var n,s,a,i="",r="",o=!1,l=t.state.selectedAnswer;e.questions.forEach((function(e,u){o&&(r=e.id,o=!1),t.state.questionId===e.id&&(o=!0,n=e,a=u+1,s&&(i=s.id),n.answered&&(l=n.answered)),s=e})),(0,w.QT)("Tests/MS-500/Questions",n.id).then((function(e){var n=E()(e.question),s=E()(e.references);t.setState({question:e,questionHtml:n,referencesHtml:s})})),t.setState({test:e,questionIdx:a,nextQuestionId:r,previousQuestionId:i,selectedAnswer:l})})):(0,w.QT)("Tests/MS-500/Questions",this.state.questionId).then((function(e){var n=E()(e.question),s=E()(e.references);t.setState({question:e,questionHtml:n,referencesHtml:s})})))},n.handleCorrectAnswerChange=function(e){var t=this,n=e.target.dataset.index,a=e.target,i=(0,s.Z)(this.state.selectedAnswer);if(a.checked)i.push(n);else{var r=i.indexOf(""+n);i.splice(r,1)}if(this.setState({selectedAnswer:i}),this.state.testId){var o=Object.assign({},this.state.test);o.questions=o.questions.map((function(e){return e.id===t.state.questionId&&(e.answered=i),e})),(0,w.MF)("users/"+this.state.uid+"/tests",o),this.setState({test:o})}},n.toggleShowAnswer=function(){var e=!this.state.answerShown;this.setState({answerShown:e})},n.toggleShowQuestions=function(){var e=!this.state.questionsShown;this.setState({questionsShown:e})},n.toggleEndExam=function(){var e=!this.state.endExamShown;this.setState({endExamShown:e})},n.gotoQuestion=function(e){var t=this;return function(){(0,p.navigate)("/course/ms-500/question/"+e+"?testId="+t.state.testId)}},n.endExam=function(){var e=this,t=this.state.test;t.isComplete=!0,(0,w.MF)("users/"+this.state.uid+"/tests",t).then((function(){(0,p.navigate)("/tests/summary?testId="+e.state.testId)}))},n.render=function(){var e=this,t=this.state.question.answers?this.state.question.answers:[];return t=(0,s.Z)(t).map((function(t,n){return t.isSelected=e.state.selectedAnswer.includes(""+n),t.optionStyles=Object.assign({},f),e.state.answerShown&&t.isCorrectAnswer&&(t.optionStyles.background="green"),t})),r.createElement(o.Z,{jsonLdType:"QAPage",jsonLd:this.state.jsonLd,title:this.state.questionText,description:this.state.questionText},r.createElement("main",null,r.createElement("div",null,r.createElement(l.Z,null,r.createElement(u.Z,null,r.createElement(d.Z,{md:6,xs:12,lg:8},r.createElement("h1",null,"Question ",this.state.questionIdx)),r.createElement(d.Z,{md:6,xs:12,lg:4,className:"flex-space-between"}," ",""!==this.state.previousQuestionId?r.createElement(c.Z,{as:p.Link,to:"/course/ms-500/question/"+this.state.previousQuestionId+"?testId="+this.state.testId},"Previous Question"):"",""!==this.state.nextQuestionId?r.createElement(c.Z,{as:p.Link,to:"/course/ms-500/question/"+this.state.nextQuestionId+"?testId="+this.state.testId},"Next Question"):this.state.testId?r.createElement(c.Z,{onClick:this.toggleEndExam,variant:"warning"},"End Exam"):"")),r.createElement(u.Z,{className:"img-width-100"},""!==this.state.questionHtml?r.createElement("div",{dangerouslySetInnerHTML:{__html:this.state.questionHtml}}):""),r.createElement(u.Z,null,t.map((function(t,n){return r.createElement("div",{style:t.optionStyles,key:n},r.createElement(h.Z.Check,{type:"checkbox",name:"AnswerCheck"+n,id:"AnswerCheck"+n,"data-index":n,inline:!0,style:A,checked:e.state.selectedAnswer.includes(""+n),onChange:e.handleCorrectAnswerChange}),r.createElement("label",{htmlFor:"AnswerCheck"+n},t.value))}))),r.createElement(u.Z,null,r.createElement(d.Z,null,this.state.answerShown?r.createElement("div",{style:x,dangerouslySetInnerHTML:{__html:this.state.referencesHtml}}):"")),r.createElement(u.Z,{className:"align-right"},r.createElement(d.Z,{md:6,xs:12,lg:8}),r.createElement(d.Z,{md:6,xs:12,lg:4,className:"flex-space-between"}," ",""!==this.state.previousQuestionId?r.createElement(c.Z,{as:p.Link,to:"/course/ms-500/question/"+this.state.previousQuestionId+"?testId="+this.state.testId},"Previous Question"):"",""!==this.state.nextQuestionId?r.createElement(c.Z,{as:p.Link,to:"/course/ms-500/question/"+this.state.nextQuestionId+"?testId="+this.state.testId},"Next Question"):this.state.testId?r.createElement(c.Z,{onClick:this.toggleEndExam,variant:"warning"},"End Exam"):"")),r.createElement(u.Z,null,r.createElement(d.Z,{xs:12,md:6},r.createElement(c.Z,{onClick:this.toggleShowAnswer,style:v},this.state.answerShown?r.createElement("span",null,"Hide Answer"):r.createElement("span",null,"Show Answer"))),this.state.testId?r.createElement(d.Z,{xs:12,md:6,className:"align-right"},r.createElement(c.Z,{onClick:this.toggleShowQuestions,style:v},this.state.questionsShown?r.createElement("span",null,"Hide Question List"):r.createElement("span",null,"Show Question List"))):""),this.state.testId?r.createElement(u.Z,null,r.createElement(d.Z,{className:"align-right"},r.createElement(c.Z,{onClick:this.toggleEndExam,variant:"warning",style:v},"End Exam"))):"")),r.createElement(m.Z,{show:this.state.questionsShown,onHide:this.toggleShowQuestions},r.createElement(m.Z.Header,null,r.createElement(m.Z.Title,null,"Showing Test Questions")),r.createElement(m.Z.Body,null,r.createElement(g.Z,{striped:!0,bordered:!0,hover:!0},r.createElement("thead",null,r.createElement("tr",null,r.createElement("th",null,"#"),r.createElement("th",null,"Answer"))),r.createElement("tbody",null,this.state.test&&this.state.test.questions?this.state.test.questions.map((function(t,n){return r.createElement("tr",{key:n,onClick:e.gotoQuestion(t.id),className:"cursor-pointer"},r.createElement("td",null,n+1),r.createElement("td",null,t.answered))})):""))),r.createElement(m.Z.Footer,null,r.createElement(c.Z,{variant:"primary",onClick:this.toggleShowQuestions},"Close"))),r.createElement(m.Z,{show:this.state.endExamShown,onHide:this.toggleEndExam},r.createElement(m.Z.Header,null,r.createElement(m.Z.Title,null,"Are you sure?")),r.createElement(m.Z.Body,null,this.state.endExamText),r.createElement(m.Z.Footer,null,r.createElement(c.Z,{variant:"primary",onClick:this.endExam},"Yes"),r.createElement(c.Z,{variant:"secondary",onClick:this.toggleEndExam},"No")))))},t}(r.Component);t.default=S}}]);
//# sourceMappingURL=component---src-pages-course-ms-500-question-to-3-w-ry-36-js-8cdbc23d5c5aab6ee473.js.map