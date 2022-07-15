"use strict";(self.webpackChunkWebSite=self.webpackChunkWebSite||[]).push([[653],{98885:function(e,t,s){s.r(t);var n=s(42982),a=s(97326),i=s(94578),o=s(67294),r=s(78278),l=s(33639),d=s(20994),u=s(7408),c=s(46594),h=s(51708),m=s(68203),p=s(8169),g=s(25444),w=s(37841),y=s(71192),f=s.n(y),E={marginTop:"14px",marginBottom:"14px",display:"flex"},x={display:"flex",alignItems:"center",justifyContent:"center"},v={marginTop:"24px"},S={marginTop:"24px"},k=function(e){function t(t){var s;(s=e.call(this,t)||this).setUid=s.setUid.bind((0,a.Z)(s)),s.handleCorrectAnswerChange=s.handleCorrectAnswerChange.bind((0,a.Z)(s)),s.toggleShowAnswer=s.toggleShowAnswer.bind((0,a.Z)(s)),s.toggleShowQuestions=s.toggleShowQuestions.bind((0,a.Z)(s)),s.gotoQuestion=s.gotoQuestion.bind((0,a.Z)(s)),s.toggleEndExam=s.toggleEndExam.bind((0,a.Z)(s)),s.endExam=s.endExam.bind((0,a.Z)(s));var n=new URLSearchParams(t.location.search);return s.state={questions:{},uid:"",testId:n.get("testId"),test:{},question:{answers:[{value:"An Azure Active Directory Authentication Library (ADAL) token.",isCorrectAnswer:!1},{value:"The public key.",isCorrectAnswer:!1},{isCorrectAnswer:!1,value:"The Username and password for a global admin account."},{value:"The URL of the Microsoft Defender for Identity admin center.",isCorrectAnswer:!0}],id:"Si5gtzjjY",question:{blocks:[{entityRanges:[],text:"A colleague has been asked to deploy several Microsoft Defender for Identity sensors.",type:"unstyled",key:"etukd",data:{},depth:0,inlineStyleRanges:[]},{inlineStyleRanges:[],text:"He's asked you to give him the Azure information required to deploy the sensors.",entityRanges:[],data:{},depth:0,key:"8orth",type:"unstyled"},{key:"aqlp3",entityRanges:[],type:"unstyled",depth:0,text:"What information should you provide?",data:{},inlineStyleRanges:[]}],entityMap:{}},references:{entityMap:{0:{data:{url:"https://www.gitbit.org/course/ms-500/learn/Whats-Microsoft-Defender-for-identity-Kye_yNLxA",targetOption:"_self"},type:"LINK",mutability:"MUTABLE"},1:{type:"LINK",data:{url:"https://docs.microsoft.com/en-us/azure-advanced-threat-protection/workspace-portal",targetOption:"_blank"},mutability:"MUTABLE"}},blocks:[{text:"The URL is specific to every tenant so the admin will need the URL: https://*instancename*.atp.azure.com. The admin will also need the installation files and the access key but both of which can be downloaded from the Microsoft Defender for Identity admin center.",data:{},depth:0,inlineStyleRanges:[],key:"67e5s",entityRanges:[],type:"unstyled"},{entityRanges:[{length:90,offset:0,key:0}],type:"unstyled",key:"bb6us",text:"https://www.gitbit.org/course/ms-500/learn/Whats-Microsoft-Defender-for-identity-Kye_yNLxA",data:{},inlineStyleRanges:[],depth:0},{text:"https://docs.microsoft.com/en-us/azure-advanced-threat-protection/workspace-portal",inlineStyleRanges:[],key:"951j7",entityRanges:[{length:82,offset:0,key:1}],depth:0,data:{},type:"unstyled"}]}},previousQuestionId:"",nextQuestionId:"",questionId:"Si5gtzjjY",questionIdx:"",questionHtml:"<p>A colleague has been asked to deploy several Microsoft Defender for Identity sensors.</p>\n<p>He's asked you to give him the Azure information required to deploy the sensors.</p>\n<p>What information should you provide?</p>\n",questionText:"A colleague has been asked to deploy several Microsoft Defender for Identity sensors. He's asked you to give him the Azure information required to deploy the sensors. What information should you provide?",referencesHtml:'<p>The URL is specific to every tenant so the admin will need the URL: https://*instancename*.atp.azure.com. The admin will also need the installation files and the access key but both of which can be downloaded from the Microsoft Defender for Identity admin center.</p>\n<p><a href="https://www.gitbit.org/course/ms-500/learn/Whats-Microsoft-Defender-for-identity-Kye_yNLxA" target="_self">https://www.gitbit.org/course/ms-500/learn/Whats-Microsoft-Defender-for-identity-Kye_yNLxA</a></p>\n<p><a href="https://docs.microsoft.com/en-us/azure-advanced-threat-protection/workspace-portal" target="_blank">https://docs.microsoft.com/en-us/azure-advanced-threat-protection/workspace-portal</a></p>\n',selectedAnswer:[],answerShown:!1,questionsShown:!1,endExamShown:!1,endExamText:"Are you sure you want to end the exam?"},s.state.jsonLd={datePublished:"9-8-2021",keywords:["Microsoft","Microsoft 365","Office 365","MS-500","Microsoft 365 Security Administration"],mainEntity:{"@type":"Question",name:s.state.questionText.substring(0,150),text:s.state.questionText,answerCount:s.state.question.answers?s.state.question.answers.length:0,dateCreated:"2021-09-08T16:52:31Z",author:{"@type":"Person",name:"John Gruber",url:"https://medium.com/@gruberjl"}}},s.state.question.answers&&(s.state.jsonLd.mainEntity.acceptedAnswer={"@type":"Answer",text:s.state.question.answers?s.state.question.answers.filter((function(e){return e.isCorrectAnswer})).map((function(e){return e.value})).join("; "):"None",url:"https://www.gitbit.org/course/ms-500/question/Si5gtzjjY",author:{type:"Person",name:"John Gruber",url:"https://medium.com/@gruberjl"},upvoteCount:1,dateCreated:"2021-09-08T16:52:31Z"}),s}(0,i.Z)(t,e);var s=t.prototype;return s.componentDidMount=function(){"undefined"!=typeof window&&(this.onAuthStateChangedListener=(0,w.Aj)(this.setUid))},s.componentWillUnmount=function(){this.onAuthStateChangedListener()},s.setUid=function(e){var t=this;e&&(this.setState({uid:e.uid}),this.state.testId?(0,w.QT)("users/"+this.state.uid+"/tests",this.state.testId).then((function(e){var s,n,a,i="",o="",r=!1,l=t.state.selectedAnswer;e.questions.forEach((function(e,d){r&&(o=e.id,r=!1),t.state.questionId===e.id&&(r=!0,s=e,a=d+1,n&&(i=n.id),s.answered&&(l=s.answered)),n=e})),(0,w.QT)("Tests/MS-500/Questions",s.id).then((function(e){var s=f()(e.question),n=f()(e.references);t.setState({question:e,questionHtml:s,referencesHtml:n})})),t.setState({test:e,questionIdx:a,nextQuestionId:o,previousQuestionId:i,selectedAnswer:l})})):(0,w.QT)("Tests/MS-500/Questions",this.state.questionId).then((function(e){var s=f()(e.question),n=f()(e.references);t.setState({question:e,questionHtml:s,referencesHtml:n})})))},s.handleCorrectAnswerChange=function(e){var t=this,s=e.target.dataset.index,a=e.target,i=(0,n.Z)(this.state.selectedAnswer);if(a.checked)i.push(s);else{var o=i.indexOf(""+s);i.splice(o,1)}if(this.setState({selectedAnswer:i}),this.state.testId){var r=Object.assign({},this.state.test);r.questions=r.questions.map((function(e){return e.id===t.state.questionId&&(e.answered=i),e})),(0,w.MF)("users/"+this.state.uid+"/tests",r),this.setState({test:r})}},s.toggleShowAnswer=function(){var e=!this.state.answerShown;this.setState({answerShown:e})},s.toggleShowQuestions=function(){var e=!this.state.questionsShown;this.setState({questionsShown:e})},s.toggleEndExam=function(){var e=!this.state.endExamShown;this.setState({endExamShown:e})},s.gotoQuestion=function(e){var t=this;return function(){(0,g.navigate)("/course/ms-500/question/"+e+"?testId="+t.state.testId)}},s.endExam=function(){var e=this,t=this.state.test;t.isComplete=!0,(0,w.MF)("users/"+this.state.uid+"/tests",t).then((function(){(0,g.navigate)("/tests/summary?testId="+e.state.testId)}))},s.render=function(){var e=this,t=this.state.question.answers?this.state.question.answers:[];return t=(0,n.Z)(t).map((function(t,s){return t.isSelected=e.state.selectedAnswer.includes(""+s),t.optionStyles=Object.assign({},E),e.state.answerShown&&t.isCorrectAnswer&&(t.optionStyles.background="green"),t})),o.createElement(r.Z,{jsonLdType:"QAPage",jsonLd:this.state.jsonLd,title:this.state.questionText,description:this.state.questionText},o.createElement("main",null,o.createElement("div",null,o.createElement(l.Z,null,o.createElement(d.Z,null,o.createElement(u.Z,{md:6,xs:12,lg:8},o.createElement("h1",null,"Question ",this.state.questionIdx)),o.createElement(u.Z,{md:6,xs:12,lg:4,className:"flex-space-between"}," ",""!==this.state.previousQuestionId?o.createElement(c.Z,{as:g.Link,to:"/course/ms-500/question/"+this.state.previousQuestionId+"?testId="+this.state.testId},"Previous Question"):"",""!==this.state.nextQuestionId?o.createElement(c.Z,{as:g.Link,to:"/course/ms-500/question/"+this.state.nextQuestionId+"?testId="+this.state.testId},"Next Question"):this.state.testId?o.createElement(c.Z,{onClick:this.toggleEndExam,variant:"warning"},"End Exam"):"")),o.createElement(d.Z,{className:"img-width-100"},""!==this.state.questionHtml?o.createElement("div",{dangerouslySetInnerHTML:{__html:this.state.questionHtml}}):""),o.createElement(d.Z,null,t.map((function(t,s){return o.createElement("div",{style:t.optionStyles,key:s},o.createElement(h.Z.Check,{type:"checkbox",name:"AnswerCheck"+s,id:"AnswerCheck"+s,"data-index":s,inline:!0,style:x,checked:e.state.selectedAnswer.includes(""+s),onChange:e.handleCorrectAnswerChange}),o.createElement("label",{htmlFor:"AnswerCheck"+s},t.value))}))),o.createElement(d.Z,null,o.createElement(u.Z,null,this.state.answerShown?o.createElement("div",{style:v,dangerouslySetInnerHTML:{__html:this.state.referencesHtml}}):"")),o.createElement(d.Z,{className:"align-right"},o.createElement(u.Z,{md:6,xs:12,lg:8}),o.createElement(u.Z,{md:6,xs:12,lg:4,className:"flex-space-between"}," ",""!==this.state.previousQuestionId?o.createElement(c.Z,{as:g.Link,to:"/course/ms-500/question/"+this.state.previousQuestionId+"?testId="+this.state.testId},"Previous Question"):"",""!==this.state.nextQuestionId?o.createElement(c.Z,{as:g.Link,to:"/course/ms-500/question/"+this.state.nextQuestionId+"?testId="+this.state.testId},"Next Question"):this.state.testId?o.createElement(c.Z,{onClick:this.toggleEndExam,variant:"warning"},"End Exam"):"")),o.createElement(d.Z,null,o.createElement(u.Z,{xs:12,md:6},o.createElement(c.Z,{onClick:this.toggleShowAnswer,style:S},this.state.answerShown?o.createElement("span",null,"Hide Answer"):o.createElement("span",null,"Show Answer"))),this.state.testId?o.createElement(u.Z,{xs:12,md:6,className:"align-right"},o.createElement(c.Z,{onClick:this.toggleShowQuestions,style:S},this.state.questionsShown?o.createElement("span",null,"Hide Question List"):o.createElement("span",null,"Show Question List"))):""),this.state.testId?o.createElement(d.Z,null,o.createElement(u.Z,{className:"align-right"},o.createElement(c.Z,{onClick:this.toggleEndExam,variant:"warning",style:S},"End Exam"))):"")),o.createElement(m.Z,{show:this.state.questionsShown,onHide:this.toggleShowQuestions},o.createElement(m.Z.Header,null,o.createElement(m.Z.Title,null,"Showing Test Questions")),o.createElement(m.Z.Body,null,o.createElement(p.Z,{striped:!0,bordered:!0,hover:!0},o.createElement("thead",null,o.createElement("tr",null,o.createElement("th",null,"#"),o.createElement("th",null,"Answer"))),o.createElement("tbody",null,this.state.test&&this.state.test.questions?this.state.test.questions.map((function(t,s){return o.createElement("tr",{key:s,onClick:e.gotoQuestion(t.id),className:"cursor-pointer"},o.createElement("td",null,s+1),o.createElement("td",null,t.answered))})):""))),o.createElement(m.Z.Footer,null,o.createElement(c.Z,{variant:"primary",onClick:this.toggleShowQuestions},"Close"))),o.createElement(m.Z,{show:this.state.endExamShown,onHide:this.toggleEndExam},o.createElement(m.Z.Header,null,o.createElement(m.Z.Title,null,"Are you sure?")),o.createElement(m.Z.Body,null,this.state.endExamText),o.createElement(m.Z.Footer,null,o.createElement(c.Z,{variant:"primary",onClick:this.endExam},"Yes"),o.createElement(c.Z,{variant:"secondary",onClick:this.toggleEndExam},"No")))))},t}(o.Component);t.default=k}}]);
//# sourceMappingURL=component---src-pages-course-ms-500-question-si-5-gtzjj-y-js-2e75511c91e2b720feb2.js.map