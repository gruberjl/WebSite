"use strict";(self.webpackChunkWebSite=self.webpackChunkWebSite||[]).push([[7014],{45596:function(e,t,s){s.r(t);var n=s(42982),i=s(97326),r=s(94578),a=s(67294),o=s(78278),l=s(33639),u=s(20994),d=s(7408),c=s(46594),h=s(51708),m=s(68203),g=s(8169),p=s(25444),w=s(37841),y=s(71192),E=s.n(y),f={marginTop:"14px",marginBottom:"14px",display:"flex"},x={display:"flex",alignItems:"center",justifyContent:"center"},v={marginTop:"24px"},S={marginTop:"24px"},Z=function(e){function t(t){var s;(s=e.call(this,t)||this).setUid=s.setUid.bind((0,i.Z)(s)),s.handleCorrectAnswerChange=s.handleCorrectAnswerChange.bind((0,i.Z)(s)),s.toggleShowAnswer=s.toggleShowAnswer.bind((0,i.Z)(s)),s.toggleShowQuestions=s.toggleShowQuestions.bind((0,i.Z)(s)),s.gotoQuestion=s.gotoQuestion.bind((0,i.Z)(s)),s.toggleEndExam=s.toggleEndExam.bind((0,i.Z)(s)),s.endExam=s.endExam.bind((0,i.Z)(s));var n=new URLSearchParams(t.location.search);return s.state={questions:{},uid:"",testId:n.get("testId"),test:{},question:{answers:[{value:"Global administrator",isCorrectAnswer:!1},{isCorrectAnswer:!1,value:"User administrator"},{isCorrectAnswer:!0,value:"Privileged role administrator"},{isCorrectAnswer:!1,value:"Security administrator"}],id:"8OiMKi9ha",question:{blocks:[{depth:0,entityRanges:[],text:"Your manager asks you to give John Gruber the ability to assign the reports reader role to other users. Your organization adheres to the principle of least privilege.",data:{},key:"f10j4",type:"unstyled",inlineStyleRanges:[]},{depth:0,text:"Which role should you assign to John Gruber?",data:{},key:"dj7o5",entityRanges:[],type:"unstyled",inlineStyleRanges:[]}],entityMap:{}},references:{entityMap:{0:{data:{url:"https://www.gitbit.org/course/ms-500/learn/Creating-and-managing-admins-through-roles-7CpqFkPZU",targetOption:"_blank"},type:"LINK",mutability:"MUTABLE"},1:{data:{url:"https://docs.microsoft.com/en-us/microsoft-365/security/office-365-security/permissions-microsoft-365-compliance-security?view=o365-worldwide",targetOption:"_blank"},type:"LINK",mutability:"MUTABLE"}},blocks:[{depth:0,key:"bfddk",text:"Users with the privileged role administrator role can manage role assignments in Azure Active Directory. They can also enable, configure, and manage the Azure AD Privileged Identity Management. The privileged role administrators can assign other users with different admin roles. They cannot manage their own role permissions. For example, if John Gruber is assigned the privileged role administrator then John Gruber can assign UserA with the reports reader role.",type:"unstyled",data:{},inlineStyleRanges:[],entityRanges:[]},{inlineStyleRanges:[],text:"https://www.gitbit.org/course/ms-500/learn/Creating-and-managing-admins-through-roles-7CpqFkPZU",depth:0,type:"unstyled",data:{},entityRanges:[{key:0,length:95,offset:0}],key:"cn28l"},{inlineStyleRanges:[],text:"https://docs.microsoft.com/en-us/microsoft-365/security/office-365-security/permissions-microsoft-365-compliance-security?view=o365-worldwide",entityRanges:[{offset:0,key:1,length:141}],type:"unstyled",key:"71uh0",data:{},depth:0}]}},previousQuestionId:"",nextQuestionId:"",questionId:"8OiMKi9ha",questionIdx:"",questionHtml:"<p>Your manager asks you to give John Gruber the ability to assign the reports reader role to other users. Your organization adheres to the principle of least privilege.</p>\n<p>Which role should you assign to John Gruber?</p>\n",questionText:"Your manager asks you to give John Gruber the ability to assign the reports reader role to other users. Your organization adheres to the principle of least privilege. Which role should you assign to John Gruber?",referencesHtml:'<p>Users with the privileged role administrator role can manage role assignments in Azure Active Directory. They can also enable, configure, and manage the Azure AD Privileged Identity Management. The privileged role administrators can assign other users with different admin roles. They cannot manage their own role permissions. For example, if John Gruber is assigned the privileged role administrator then John Gruber can assign UserA with the reports reader role.</p>\n<p><a href="https://www.gitbit.org/course/ms-500/learn/Creating-and-managing-admins-through-roles-7CpqFkPZU" target="_blank">https://www.gitbit.org/course/ms-500/learn/Creating-and-managing-admins-through-roles-7CpqFkPZU</a></p>\n<p><a href="https://docs.microsoft.com/en-us/microsoft-365/security/office-365-security/permissions-microsoft-365-compliance-security?view=o365-worldwide" target="_blank">https://docs.microsoft.com/en-us/microsoft-365/security/office-365-security/permissions-microsoft-365-compliance-security?view=o365-worldwide</a></p>\n',selectedAnswer:[],answerShown:!1,questionsShown:!1,endExamShown:!1,endExamText:"Are you sure you want to end the exam?"},s.state.jsonLd={datePublished:"9-8-2021",keywords:["Microsoft","Microsoft 365","Office 365","MS-500","Microsoft 365 Security Administration"],mainEntity:{"@type":"Question",name:s.state.questionText.substring(0,150),text:s.state.questionText,answerCount:s.state.question.answers?s.state.question.answers.length:0,dateCreated:"2021-09-08T16:52:31Z",author:{"@type":"Person",name:"John Gruber",url:"https://medium.com/@gruberjl"}}},s.state.question.answers&&(s.state.jsonLd.mainEntity.acceptedAnswer={"@type":"Answer",text:s.state.question.answers?s.state.question.answers.filter((function(e){return e.isCorrectAnswer})).map((function(e){return e.value})).join("; "):"None",url:"https://www.gitbit.org/course/ms-500/question/8OiMKi9ha",author:{type:"Person",name:"John Gruber",url:"https://medium.com/@gruberjl"},upvoteCount:1,dateCreated:"2021-09-08T16:52:31Z"}),s}(0,r.Z)(t,e);var s=t.prototype;return s.componentDidMount=function(){"undefined"!=typeof window&&(this.onAuthStateChangedListener=(0,w.Aj)(this.setUid))},s.componentWillUnmount=function(){this.onAuthStateChangedListener()},s.setUid=function(e){var t=this;e&&(this.setState({uid:e.uid}),this.state.testId?(0,w.QT)("users/"+this.state.uid+"/tests",this.state.testId).then((function(e){var s,n,i,r="",a="",o=!1,l=t.state.selectedAnswer;e.questions.forEach((function(e,u){o&&(a=e.id,o=!1),t.state.questionId===e.id&&(o=!0,s=e,i=u+1,n&&(r=n.id),s.answered&&(l=s.answered)),n=e})),(0,w.QT)("Tests/MS-500/Questions",s.id).then((function(e){var s=E()(e.question),n=E()(e.references);t.setState({question:e,questionHtml:s,referencesHtml:n})})),t.setState({test:e,questionIdx:i,nextQuestionId:a,previousQuestionId:r,selectedAnswer:l})})):(0,w.QT)("Tests/MS-500/Questions",this.state.questionId).then((function(e){var s=E()(e.question),n=E()(e.references);t.setState({question:e,questionHtml:s,referencesHtml:n})})))},s.handleCorrectAnswerChange=function(e){var t=this,s=e.target.dataset.index,i=e.target,r=(0,n.Z)(this.state.selectedAnswer);if(i.checked)r.push(s);else{var a=r.indexOf(""+s);r.splice(a,1)}if(this.setState({selectedAnswer:r}),this.state.testId){var o=Object.assign({},this.state.test);o.questions=o.questions.map((function(e){return e.id===t.state.questionId&&(e.answered=r),e})),(0,w.MF)("users/"+this.state.uid+"/tests",o),this.setState({test:o})}},s.toggleShowAnswer=function(){var e=!this.state.answerShown;this.setState({answerShown:e})},s.toggleShowQuestions=function(){var e=!this.state.questionsShown;this.setState({questionsShown:e})},s.toggleEndExam=function(){var e=!this.state.endExamShown;this.setState({endExamShown:e})},s.gotoQuestion=function(e){var t=this;return function(){(0,p.navigate)("/course/ms-500/question/"+e+"?testId="+t.state.testId)}},s.endExam=function(){var e=this,t=this.state.test;t.isComplete=!0,(0,w.MF)("users/"+this.state.uid+"/tests",t).then((function(){(0,p.navigate)("/tests/summary?testId="+e.state.testId)}))},s.render=function(){var e=this,t=this.state.question.answers?this.state.question.answers:[];return t=(0,n.Z)(t).map((function(t,s){return t.isSelected=e.state.selectedAnswer.includes(""+s),t.optionStyles=Object.assign({},f),e.state.answerShown&&t.isCorrectAnswer&&(t.optionStyles.background="green"),t})),a.createElement(o.Z,{jsonLdType:"QAPage",jsonLd:this.state.jsonLd,title:this.state.questionText,description:this.state.questionText},a.createElement("main",null,a.createElement("div",null,a.createElement(l.Z,null,a.createElement(u.Z,null,a.createElement(d.Z,{md:6,xs:12,lg:8},a.createElement("h1",null,"Question ",this.state.questionIdx)),a.createElement(d.Z,{md:6,xs:12,lg:4,className:"flex-space-between"}," ",""!==this.state.previousQuestionId?a.createElement(c.Z,{as:p.Link,to:"/course/ms-500/question/"+this.state.previousQuestionId+"?testId="+this.state.testId},"Previous Question"):"",""!==this.state.nextQuestionId?a.createElement(c.Z,{as:p.Link,to:"/course/ms-500/question/"+this.state.nextQuestionId+"?testId="+this.state.testId},"Next Question"):this.state.testId?a.createElement(c.Z,{onClick:this.toggleEndExam,variant:"warning"},"End Exam"):"")),a.createElement(u.Z,{className:"img-width-100"},""!==this.state.questionHtml?a.createElement("div",{dangerouslySetInnerHTML:{__html:this.state.questionHtml}}):""),a.createElement(u.Z,null,t.map((function(t,s){return a.createElement("div",{style:t.optionStyles,key:s},a.createElement(h.Z.Check,{type:"checkbox",name:"AnswerCheck"+s,id:"AnswerCheck"+s,"data-index":s,inline:!0,style:x,checked:e.state.selectedAnswer.includes(""+s),onChange:e.handleCorrectAnswerChange}),a.createElement("label",{htmlFor:"AnswerCheck"+s},t.value))}))),a.createElement(u.Z,null,a.createElement(d.Z,null,this.state.answerShown?a.createElement("div",{style:v,dangerouslySetInnerHTML:{__html:this.state.referencesHtml}}):"")),a.createElement(u.Z,{className:"align-right"},a.createElement(d.Z,{md:6,xs:12,lg:8}),a.createElement(d.Z,{md:6,xs:12,lg:4,className:"flex-space-between"}," ",""!==this.state.previousQuestionId?a.createElement(c.Z,{as:p.Link,to:"/course/ms-500/question/"+this.state.previousQuestionId+"?testId="+this.state.testId},"Previous Question"):"",""!==this.state.nextQuestionId?a.createElement(c.Z,{as:p.Link,to:"/course/ms-500/question/"+this.state.nextQuestionId+"?testId="+this.state.testId},"Next Question"):this.state.testId?a.createElement(c.Z,{onClick:this.toggleEndExam,variant:"warning"},"End Exam"):"")),a.createElement(u.Z,null,a.createElement(d.Z,{xs:12,md:6},a.createElement(c.Z,{onClick:this.toggleShowAnswer,style:S},this.state.answerShown?a.createElement("span",null,"Hide Answer"):a.createElement("span",null,"Show Answer"))),this.state.testId?a.createElement(d.Z,{xs:12,md:6,className:"align-right"},a.createElement(c.Z,{onClick:this.toggleShowQuestions,style:S},this.state.questionsShown?a.createElement("span",null,"Hide Question List"):a.createElement("span",null,"Show Question List"))):""),this.state.testId?a.createElement(u.Z,null,a.createElement(d.Z,{className:"align-right"},a.createElement(c.Z,{onClick:this.toggleEndExam,variant:"warning",style:S},"End Exam"))):"")),a.createElement(m.Z,{show:this.state.questionsShown,onHide:this.toggleShowQuestions},a.createElement(m.Z.Header,null,a.createElement(m.Z.Title,null,"Showing Test Questions")),a.createElement(m.Z.Body,null,a.createElement(g.Z,{striped:!0,bordered:!0,hover:!0},a.createElement("thead",null,a.createElement("tr",null,a.createElement("th",null,"#"),a.createElement("th",null,"Answer"))),a.createElement("tbody",null,this.state.test&&this.state.test.questions?this.state.test.questions.map((function(t,s){return a.createElement("tr",{key:s,onClick:e.gotoQuestion(t.id),className:"cursor-pointer"},a.createElement("td",null,s+1),a.createElement("td",null,t.answered))})):""))),a.createElement(m.Z.Footer,null,a.createElement(c.Z,{variant:"primary",onClick:this.toggleShowQuestions},"Close"))),a.createElement(m.Z,{show:this.state.endExamShown,onHide:this.toggleEndExam},a.createElement(m.Z.Header,null,a.createElement(m.Z.Title,null,"Are you sure?")),a.createElement(m.Z.Body,null,this.state.endExamText),a.createElement(m.Z.Footer,null,a.createElement(c.Z,{variant:"primary",onClick:this.endExam},"Yes"),a.createElement(c.Z,{variant:"secondary",onClick:this.toggleEndExam},"No")))))},t}(a.Component);t.default=Z}}]);
//# sourceMappingURL=component---src-pages-course-ms-500-question-8-oi-m-ki-9-ha-js-de8412bcef78b28e8721.js.map