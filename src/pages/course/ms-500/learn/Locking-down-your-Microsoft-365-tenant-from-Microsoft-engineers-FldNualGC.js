import * as React from "react"
import Page from '../../../../components/page'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Accordion from 'react-bootstrap/Accordion'
import ListGroup from 'react-bootstrap/ListGroup'
import Form from 'react-bootstrap/Form'
import { Link } from "gatsby"
import {getDoc, getAllDocs, saveDoc, onAuthStateChanged} from '../../../../components/firebase'
import draftToHtml from 'draftjs-to-html'
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
 
const isBrowser = () => typeof window !== 'undefined'

const removePaddingStyle = {
  padding: '0px'
}

const marginTop24Style = {
  marginTop: '24px'
}

const listItemStyle = {
  border: 'none',
  paddingTop: '12px',
  paddingBottom: '12px'
}

const sort = (course, articles) => {
  return articles.sort((a, b) => {
    return course.contentOrder.indexOf(a.id) - course.contentOrder.indexOf(b.id)
  })
}

class ArticlePage extends React.Component {
  constructor(props) {
    super(props)
    this.trackScrolling = this.trackScrolling.bind(this)
    this.setHasCompletedContent = this.setHasCompletedContent.bind(this)

    let currentSlug = props.location.pathname.replace('/course/ms-500/learn/', '').split('/')[0]
    if (currentSlug === 'article')
      currentSlug = 'Securing-and-implementing-enterprise-applications-2QfoI2HxY'

    this.state = {
      currentSlug: currentSlug,
      isTrackScrolling: false,
      course: {"description":"Learn, prepare and training for the Microsoft Microsoft Office 365 Exam MS-500: Microsoft 365 Security Administration MS-500 exam","id":"MS-500","contentOrder":["cpchjBLkC","KKkBOVuS4","bzotoOjEe","cg_vxOX9L","uYCIPbnMC","7CpqFkPZU","rZzausKJ1","ky5W0Lz5P","i9pJIjTNH","S1hQgFOMV","2QfoI2HxY","V1en9Iugh","nAAIvNbtk","2S9jn0aLr","FldNualGC","NFQ6rYFeQ","rK48f6iM2","RHW1API2s","z8EMM9Eu_","Kye_yNLxA","EnPyp7ukN","6HUOr7qbL","GCOOUsSBT","GG4cMY8pK","z0qPG6v4T","LEyZMWBSt","7MQ3wE4wP","sH_Ee1DW1","vLweLmxZf","NsF7No40f","IsPGsme8w","wv2PbXnhI","7gR3L122b","ZyKX3Idjs","MAjW0a2_p","XFXu2zIS9","_LL9VqGZO","qDRA4jjoN","62t_7oiZx"],"audience":"Anyone who wants to learn about securing Microsoft 365","sections":[{"id":"qwJW5VrBW","title":"Introduction","order":0},{"order":1,"title":"Securing identity and access to Microsoft 365","id":"AFV_acckJ"},{"order":2,"title":"Securing Microsoft 365, clouds, and on-premises environments","id":"QScYfSu74"},{"order":3,"title":"Protecting your environment from accidental and malicious data loss","id":"YhftdGIRX"},{"id":"l0DxUuonW","order":4,"title":"Protecting User devices using Intune"}],"title":"Training for MS-500: Microsoft Office 365 Security Admin"},
      article: {"description":"Customer Lockbox is a tool built into the Microsoft 365 tenant that locks out Microsoft engineers from accessing your tenant","publish":true,"sectionId":"AFV_acckJ","article":{"entityMap":{"0":{"data":{"height":"auto","alignment":"none","width":"auto","src":"https://i.ibb.co/DCmpnT9/Enable-Customer-Lockbox.png","alt":"Enable customer lockbox"},"mutability":"MUTABLE","type":"IMAGE"},"1":{"type":"IMAGE","data":{"alt":"Customer Lockbox request email","src":"https://i.ibb.co/RzpwWs3/Customer-Lockbox-Request.png","alignment":"left","width":"auto","height":"auto"},"mutability":"MUTABLE"},"2":{"data":{"alt":"Customer Lockbox data access requests","height":"auto","src":"https://i.ibb.co/P6KjrNK/data-access-request.png","width":"auto","alignment":"left"},"mutability":"MUTABLE","type":"IMAGE"}},"blocks":[{"inlineStyleRanges":[],"data":{},"key":"42g4m","text":"I've never had any issues with Microsoft engineers accessing my data or changing my tenant without my explicit approval. Nevertheless, Microsoft has developed a way to lock out Microsoft engineers from your tenant. If you open a support ticket with Microsoft and they require access to your tenant they will need to send you an explicit request. Microsoft calls this feature Customer Lockbox.","type":"unstyled","entityRanges":[],"depth":0},{"key":"627on","inlineStyleRanges":[],"entityRanges":[],"depth":0,"text":"Customer Lockbox allows you and your admins to secure your Microsoft 365 tenant from Microsoft engineers. That's right. The engineers at the organization hosting your data won't be able to access your data. Not without your explicit permission. Once a request is approved the Microsoft engineers will only be able to access your data for a limited window. Typically, 4 hours but it may be longer or shorter depending on your service issues.","type":"unstyled","data":{}},{"entityRanges":[],"data":{},"text":"Lockbox workflow","key":"6faak","depth":0,"type":"header-two","inlineStyleRanges":[]},{"entityRanges":[],"depth":0,"text":"Before we jump into configuring Customer Lockbox let's discuss the broad strokes or take a bird's eye view of the workflow. So Let's say you've enabled Customer Lockbox. A month goes by and all of a sudden you have an issue with your Microsoft 365 tenant. Uh-oh. You open a service request with Microsoft and then they tell you they need access to your tenant. With Lockbox enabled the following will take place:","data":{},"key":"6tkm4","type":"unstyled","inlineStyleRanges":[]},{"text":"1. You open a support ticket with Microsoft.","entityRanges":[],"type":"unstyled","depth":0,"data":{},"key":"38nfe","inlineStyleRanges":[]},{"entityRanges":[],"key":"c6tmb","data":{},"text":"2. Microsoft views the request and verifies they need to access your tenant.","type":"unstyled","inlineStyleRanges":[],"depth":0},{"inlineStyleRanges":[],"text":"3. The Microsoft engineer and their manager will send the Lockbox request to you and your other Customer Lockbox admins.","entityRanges":[],"depth":0,"data":{},"key":"89t8a","type":"unstyled"},{"depth":0,"data":{},"key":"2hs2m","inlineStyleRanges":[],"type":"unstyled","text":"4. You or another admin in your organization will approve the request.","entityRanges":[]},{"data":{},"type":"unstyled","key":"3ldgf","inlineStyleRanges":[],"text":"5. The Microsoft engineer will review your tenant.","entityRanges":[],"depth":0},{"entityRanges":[],"key":"742uc","text":"6. The request will time out and the Microsoft engineer will be automatically locked out of your data again.","type":"unstyled","depth":0,"data":{},"inlineStyleRanges":[]},{"depth":0,"data":{},"text":"License requirements","key":"fco89","inlineStyleRanges":[],"entityRanges":[],"type":"header-two"},{"inlineStyleRanges":[],"text":"Your users will need one of the following licenses to enable the Customer Lockbox feature:","data":{},"type":"unstyled","entityRanges":[],"depth":0,"key":"9onng"},{"data":{},"inlineStyleRanges":[],"text":"Office 365 E5","type":"unordered-list-item","depth":0,"key":"e5mkv","entityRanges":[]},{"entityRanges":[],"key":"9aviu","inlineStyleRanges":[],"text":"Microsoft 365 E5","depth":0,"data":{},"type":"unordered-list-item"},{"type":"unordered-list-item","inlineStyleRanges":[],"depth":0,"data":{},"entityRanges":[],"text":"Microsoft 365 E5 Compliance","key":"1o357"},{"depth":0,"inlineStyleRanges":[],"type":"unordered-list-item","entityRanges":[],"text":"Office 365 Advanced Compliance","key":"4p8c5","data":{}},{"inlineStyleRanges":[],"data":{},"key":"9cori","type":"header-two","text":"Enable Customer Lockbox","entityRanges":[],"depth":0},{"key":"ad6o6","entityRanges":[],"data":{},"inlineStyleRanges":[],"text":"So now that we've reviewed the overview and talked about licensing let's get into it. How do we enable Customer Lockbox? It's pretty simple, just click the right check box and the right place.","type":"unstyled","depth":0},{"type":"unstyled","data":{},"text":"1. Log in to the Microsoft 365 admin center > Settings > Org settings > Security & privacy > Customer Lockbox.","entityRanges":[],"depth":0,"key":"5nm90","inlineStyleRanges":[{"style":"BOLD","offset":17,"length":26},{"length":8,"style":"BOLD","offset":46},{"length":12,"offset":57,"style":"BOLD"},{"offset":72,"style":"BOLD","length":18},{"offset":93,"length":16,"style":"BOLD"}]},{"data":{},"depth":0,"entityRanges":[],"text":"2. Click Require approval for all data access requests. Click Save.","type":"unstyled","inlineStyleRanges":[{"style":"BOLD","offset":9,"length":45},{"style":"BOLD","offset":62,"length":4}],"key":"36rn3"},{"inlineStyleRanges":[],"entityRanges":[{"length":1,"offset":0,"key":0}],"data":{},"type":"atomic","text":" ","key":"6i5pt","depth":0},{"data":{},"text":"Approving Customer Lockbox requests","depth":0,"inlineStyleRanges":[],"entityRanges":[],"type":"header-two","key":"72ctb"},{"type":"unstyled","key":"ebfll","text":"So now you have Customer Lockbox enabled let's talk about the Customer Lockbox requests because eventually, you'll get one... Maybe. Maybe not. Who knows. But either way, you'll need to know how to approve the requests in case you get one. So, how do you know if they have a request and how do you approve it once the request is opened?","inlineStyleRanges":[],"depth":0,"entityRanges":[],"data":{}},{"entityRanges":[],"key":"e6ttt","data":{},"type":"unstyled","inlineStyleRanges":[],"text":"In short, you'll receive an email that looks like the following:","depth":0},{"entityRanges":[{"length":1,"key":1,"offset":0}],"type":"atomic","text":" ","key":"b7cgh","depth":0,"data":{},"inlineStyleRanges":[]},{"data":{},"key":"59pnh","depth":0,"entityRanges":[],"type":"unstyled","inlineStyleRanges":[],"text":"Now that we have a Customer Lockbox request how do we approve the request so the Microsoft engineer can access our tenant and fix it? It's simple, just find the right button and click it."},{"entityRanges":[],"depth":0,"key":"e70s1","inlineStyleRanges":[{"offset":3,"style":"BOLD","length":40},{"length":7,"offset":46,"style":"BOLD"},{"offset":56,"style":"BOLD","length":25}],"type":"unstyled","text":"1. Log in to the Microsoft 365 admin center > Support > Customer Lockbox Requests.","data":{}},{"text":"2. Click the request you wish to approve.","depth":0,"entityRanges":[],"key":"9mqo5","data":{},"type":"unstyled","inlineStyleRanges":[]},{"depth":0,"type":"atomic","key":"5gbmc","entityRanges":[{"offset":0,"key":2,"length":1}],"inlineStyleRanges":[],"text":" ","data":{}},{"text":"3. Click Approve.","entityRanges":[],"type":"unstyled","inlineStyleRanges":[{"style":"BOLD","length":7,"offset":9}],"depth":0,"data":{},"key":"3oug8"}]},"slug":"Locking-down-your-Microsoft-365-tenant-from-Microsoft-engineers-FldNualGC","id":"FldNualGC","datePublished":"2022/5/26","title":"Locking down your Microsoft 365 tenant from Microsoft engineers","images":["https://i.ibb.co/P6KjrNK/data-access-request.png","https://i.ibb.co/P6KjrNK/data-access-request.png","https://i.ibb.co/RzpwWs3/Customer-Lockbox-Request.png","https://i.ibb.co/DCmpnT9/Enable-Customer-Lockbox.png"],"featuredImage":"https://i.ibb.co/DCmpnT9/Enable-Customer-Lockbox.png","type":"article"},
      articles: [{"id":"cpchjBLkC","sectionId":"qwJW5VrBW","slug":"Whats-in-this-course-cpchjBLkC","title":"What's in this course?","featuredImage":"https://i.ibb.co/zFs9Vfb/microsoft365-security-administrator-associate-600x600.png"},{"id":"KKkBOVuS4","sectionId":"qwJW5VrBW","slug":"Creating-a-free-Microsoft-365-tenant-for-practice-KKkBOVuS4","title":"Creating a free Microsoft 365 tenant for practice","featuredImage":"https://i.ibb.co/F07sjQJ/microsoft-365-e5-trial.png"},{"id":"bzotoOjEe","sectionId":"qwJW5VrBW","slug":"Managing-the-Microsoft-365-tenant-Introduction-to-the-admin-centers-bzotoOjEe","title":"Managing the Microsoft 365 tenant - Introduction to the admin centers","featuredImage":"https://i.ibb.co/f1cr4zt/Microsoft-365-admin-centers.png"},{"id":"cg_vxOX9L","sectionId":"qwJW5VrBW","slug":"Managing-Microsoft-365-through-PowerShell-cg_vxOX9L","title":"Managing Microsoft 365 through PowerShell","featuredImage":"https://i.ibb.co/HV13YF6/install-microsoft-365-powershell-modules.png"},{"id":"uYCIPbnMC","sectionId":"AFV_acckJ","slug":"How-to-create-users-in-Microsoft-365-Cloud-Only-uYCIPbnMC","title":"How to create users in Microsoft 365 Cloud Only","featuredImage":"https://i.ibb.co/Wnt5Q43/View-Microsoft-365-Users.png"},{"id":"7CpqFkPZU","sectionId":"AFV_acckJ","slug":"Creating-and-managing-admins-through-roles-7CpqFkPZU","title":"Creating and managing admins through roles","featuredImage":"https://i.ibb.co/kySL4HQ/Roles-and-administrators.png"},{"id":"rZzausKJ1","sectionId":"AFV_acckJ","slug":"Time-limited-admin-roles-in-Microsoft-365-rZzausKJ1","title":"Time limited admin roles in Microsoft 365","featuredImage":"https://i.ibb.co/nDvjyPD/select-member-to-add-to-PIM-role.png"},{"id":"ky5W0Lz5P","sectionId":"AFV_acckJ","slug":"Whats-AD-Connect-ky5W0Lz5P","title":"What's AD Connect","featuredImage":"https://i.ibb.co/7nDqr9x/Whats-AD-Connect.png"},{"id":"i9pJIjTNH","sectionId":"AFV_acckJ","slug":"Protecting-Passwords-in-Microsoft-365-i9pJIjTNH","title":"Protecting Passwords in Microsoft 365","featuredImage":"https://i.ibb.co/DLD4G4q/access-smart-lockout-settings.png"},{"id":"S1hQgFOMV","sectionId":"AFV_acckJ","slug":"Creating-and-managing-users-through-groups-S1hQgFOMV","title":"Creating and managing users through groups","featuredImage":"https://i.ibb.co/nmmC28M/add-a-group-microsoft-365.png"},{"id":"2QfoI2HxY","sectionId":"AFV_acckJ","slug":"Securing-and-implementing-enterprise-applications-2QfoI2HxY","title":"Securing and implementing enterprise applications","featuredImage":"https://i.ibb.co/C2mp69m/disable-user-consent.png"},{"id":"V1en9Iugh","sectionId":"AFV_acckJ","slug":"Whats-a-conditional-access-policy-V1en9Iugh","title":"What's a conditional access policy?","featuredImage":"https://i.ibb.co/DQm1sY0/Create-conditional-access-policy.png"},{"id":"nAAIvNbtk","sectionId":"AFV_acckJ","slug":"The-many-ways-to-implement-multi-factor-authentication-MFA-in-Microsoft-365-nAAIvNbtk","title":"The many ways to implement multi-factor authentication (MFA) in Microsoft 365","featuredImage":"https://i.ibb.co/P1P0wNY/microsoft-365-manage-security-defaults.png"},{"id":"2S9jn0aLr","sectionId":"AFV_acckJ","slug":"Implement-Self-service-password-reset-in-Microsoft-365-2S9jn0aLr","title":"Implement Self-service password reset in Microsoft 365","featuredImage":"https://i.ibb.co/58y9JVg/write-back-passwords-to-on-premises-directory.png"},{"id":"FldNualGC","sectionId":"AFV_acckJ","slug":"Locking-down-your-Microsoft-365-tenant-from-Microsoft-engineers-FldNualGC","title":"Locking down your Microsoft 365 tenant from Microsoft engineers","featuredImage":"https://i.ibb.co/DCmpnT9/Enable-Customer-Lockbox.png"},{"id":"NFQ6rYFeQ","sectionId":"AFV_acckJ","slug":"Implementing-intelligent-security-using-risk-policies-in-Microsoft-365-NFQ6rYFeQ","title":"Implementing intelligent security using risk policies in Microsoft 365","featuredImage":"https://i.ibb.co/0cyQJ7j/Risk-Detections.png"},{"id":"rK48f6iM2","sectionId":"AFV_acckJ","slug":"Automating-Access-Review-in-Microsoft-365-rK48f6iM2","title":"Automating Access Review in Microsoft 365","featuredImage":"https://i.ibb.co/Xsxvz6Z/new-access-review.png"},{"id":"RHW1API2s","sectionId":"AFV_acckJ","slug":"Just-in-time-approval-and-notification-for-admin-roles-in-Microsoft-365-RHW1API2s","title":"Just in time, approval and notification for admin roles in Microsoft 365","featuredImage":"https://i.ibb.co/dcb6XFN/Activate-a-Role.png"},{"id":"z8EMM9Eu_","sectionId":"QScYfSu74","slug":"Whats-Microsoft-365-Defender-z8EMM9Eu_","title":"What's Microsoft 365 Defender?","featuredImage":"https://i.ibb.co/MDMyDQt/Microsoft-Defender.png"},{"id":"Kye_yNLxA","sectionId":"QScYfSu74","slug":"Whats-Microsoft-Defender-for-identity-Kye_yNLxA","title":"What's Microsoft Defender for identity?","featuredImage":"https://i.ibb.co/bQDBh0Y/Defender-for-Identity-Timeline.png"},{"id":"EnPyp7ukN","sectionId":"QScYfSu74","slug":"Whats-Microsoft-Defender-for-Office-365-EnPyp7ukN","title":"What's Microsoft Defender for Office 365?","featuredImage":"https://i.ibb.co/WcwKY2G/Microsoft-365-incidents-and-alerts.png"},{"id":"6HUOr7qbL","sectionId":"QScYfSu74","slug":"Protect-your-email-environment-from-malicious-actors-6HUOr7qbL","title":"Protect your email and Office environment from malicious actors","featuredImage":"https://i.ibb.co/Df0KQVp/Reports.png"},{"id":"GCOOUsSBT","sectionId":"QScYfSu74","slug":"Protecting-email-against-phishing-attacks-GCOOUsSBT","title":"Protecting email against phishing attacks","featuredImage":"https://i.ibb.co/GCjZHWg/edit-actions.png"},{"id":"GG4cMY8pK","sectionId":"QScYfSu74","slug":"Simulating-attacks-with-Microsoft-365-GG4cMY8pK","title":"Simulating attacks with Microsoft 365","featuredImage":"https://i.ibb.co/NyvnbMK/simulation-overview-view-users-circled.png"},{"id":"z0qPG6v4T","sectionId":"QScYfSu74","slug":"Protecting-Windows-10-and-other-devices-with-Microsoft-Defender-for-Endpoint-z0qPG6v4T","title":"Protecting Windows 10 and other devices with Microsoft Defender for Endpoint","featuredImage":"https://i.ibb.co/T47Xhyh/enable-endpoint-connections.png"},{"id":"LEyZMWBSt","sectionId":"QScYfSu74","slug":"Collect-detect-investigate-and-respond-to-security-threats-using-Microsoft-Sentinel-LEyZMWBSt","title":"Collect, detect, investigate, and respond to security threats using Microsoft Sentinel","featuredImage":"https://i.ibb.co/qN9XsKj/Add-Workbook.png"},{"id":"7MQ3wE4wP","sectionId":"QScYfSu74","slug":"Implement-and-manage-Microsoft-Defender-for-Cloud-Apps-7MQ3wE4wP","title":"Implement and manage Microsoft Defender for Cloud Apps","featuredImage":"https://i.ibb.co/7g7LvFg/office-365-cloud-apps-settings.png"},{"id":"sH_Ee1DW1","sectionId":"QScYfSu74","slug":"Auditing-sign-ins-and-other-actions-in-Microsoft-365-sH_Ee1DW1","title":"Auditing sign-ins and other actions in Microsoft 365","featuredImage":"https://i.ibb.co/BqMw3jZ/Start-recording-user-and-admin-activity.png"},{"id":"vLweLmxZf","sectionId":"YhftdGIRX","slug":"How-to-classify-data-using-labels-in-Microsoft-365-vLweLmxZf","title":"How to classify data using labels in Microsoft 365","featuredImage":"https://i.ibb.co/k9nhWS5/Choose-protection-settings-for-files-and-emails.png"},{"id":"NsF7No40f","sectionId":"YhftdGIRX","slug":"Creating-and-managing-data-retention-to-conform-to-compliance-NsF7No40f","title":"Creating and managing data retention to conform to compliance","featuredImage":"https://i.ibb.co/yqC0ZdY/New-Retention-Policy.png"},{"id":"IsPGsme8w","sectionId":"YhftdGIRX","slug":"Preventing-accidental-and-malicious-data-loss-with-DLP-policies-IsPGsme8w","title":"Preventing accidental and malicious data loss with DLP policies","featuredImage":"https://i.ibb.co/n8WcqKM/Create-a-DLP-policy.png"},{"id":"wv2PbXnhI","sectionId":"YhftdGIRX","slug":"Everything-you-need-to-know-about-securing-SharePoint-Online-for-the-MS-500-wv2PbXnhI","title":"Everything you need to know about securing SharePoint Online for the MS-500","featuredImage":"https://i.ibb.co/Gk9NjSH/Share-Point-Online-Warning.png"},{"id":"7gR3L122b","sectionId":"l0DxUuonW","slug":"Introduction-to-Intune-7gR3L122b","title":"Introduction to Intune","featuredImage":"https://i.ibb.co/Fq3N8BX/Endpoint-Manager-Admin-Center.png"},{"id":"ZyKX3Idjs","sectionId":"l0DxUuonW","slug":"Setting-up-Android-Devices-ZyKX3Idjs","title":"Setting up Android Devices","featuredImage":"https://i.ibb.co/m0BYhL2/Connect-Intune-to-Google-Play.png"},{"id":"MAjW0a2_p","sectionId":"l0DxUuonW","slug":"Setting-up-Apple--iOS-devices-in-Intune-MAjW0a2_p","title":"Setting up Apple / iOS devices in Intune","featuredImage":"https://i.ibb.co/X7Ffb2B/Setup-Apple-Enrollment-in-Intune.png"},{"id":"XFXu2zIS9","sectionId":"l0DxUuonW","slug":"Setting-up-Windows-10-devices-in-Intune-XFXu2zIS9","title":"Setting up Windows 10 devices in Intune","featuredImage":"https://i.ibb.co/WDXKVjW/configure-device-options.png"},{"id":"_LL9VqGZO","sectionId":"l0DxUuonW","slug":"How-to-manage-devices-using-Intune-_LL9VqGZO","title":"How to manage devices using Intune","featuredImage":"https://i.ibb.co/HPQ2m8t/Create-an-endpoint-protection-profile.png"},{"id":"qDRA4jjoN","sectionId":"l0DxUuonW","slug":"Understanding-compliance-policies-qDRA4jjoN","title":"Understanding compliance policies","featuredImage":"https://i.ibb.co/N3Qk57v/Create-a-compliance-policy.png"},{"id":"62t_7oiZx","sectionId":"l0DxUuonW","slug":"Restricting-and-managing-apps-on-user-devices-62t_7oiZx","title":"Restricting and managing apps on user devices","featuredImage":"https://i.ibb.co/PCVRKDf/Add-an-Android-app-to-Intune.png"}],
      articleHtml: `<p>I've never had any issues with Microsoft engineers accessing my data or changing my tenant without my explicit approval. Nevertheless, Microsoft has developed a way to lock out Microsoft engineers from your tenant. If you open a support ticket with Microsoft and they require access to your tenant they will need to send you an explicit request. Microsoft calls this feature Customer Lockbox.</p>
<p>Customer Lockbox allows you and your admins to secure your Microsoft 365 tenant from Microsoft engineers. That's right. The engineers at the organization hosting your data won't be able to access your data. Not without your explicit permission. Once a request is approved the Microsoft engineers will only be able to access your data for a limited window. Typically, 4 hours but it may be longer or shorter depending on your service issues.</p>
<h2>Lockbox workflow</h2>
<p>Before we jump into configuring Customer Lockbox let's discuss the broad strokes or take a bird's eye view of the workflow. So Let's say you've enabled Customer Lockbox. A month goes by and all of a sudden you have an issue with your Microsoft 365 tenant. Uh-oh. You open a service request with Microsoft and then they tell you they need access to your tenant. With Lockbox enabled the following will take place:</p>
<p>1. You open a support ticket with Microsoft.</p>
<p>2. Microsoft views the request and verifies they need to access your tenant.</p>
<p>3. The Microsoft engineer and their manager will send the Lockbox request to you and your other Customer Lockbox admins.</p>
<p>4. You or another admin in your organization will approve the request.</p>
<p>5. The Microsoft engineer will review your tenant.</p>
<p>6. The request will time out and the Microsoft engineer will be automatically locked out of your data again.</p>
<h2>License requirements</h2>
<p>Your users will need one of the following licenses to enable the Customer Lockbox feature:</p>
<ul>
<li>Office 365 E5</li>
<li>Microsoft 365 E5</li>
<li>Microsoft 365 E5 Compliance</li>
<li>Office 365 Advanced Compliance</li>
</ul>
<h2>Enable Customer Lockbox</h2>
<p>So now that we've reviewed the overview and talked about licensing let's get into it. How do we enable Customer Lockbox? It's pretty simple, just click the right check box and the right place.</p>
<p>1. Log in to the <strong>Microsoft 365 admin center</strong> &gt; <strong>Settings</strong> &gt; <strong>Org settings</strong> &gt; <strong>Security &amp; privacy</strong> &gt; <strong>Customer Lockbox</strong>.</p>
<p>2. Click <strong>Require approval for all data access requests</strong>. Click <strong>Save</strong>.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/DCmpnT9/Enable-Customer-Lockbox.png" alt="Enable customer lockbox" style="height: auto;width: auto"/></div>
<h2>Approving Customer Lockbox requests</h2>
<p>So now you have Customer Lockbox enabled let's talk about the Customer Lockbox requests because eventually, you'll get one... Maybe. Maybe not. Who knows. But either way, you'll need to know how to approve the requests in case you get one. So, how do you know if they have a request and how do you approve it once the request is opened?</p>
<p>In short, you'll receive an email that looks like the following:</p>
<div style="text-align:left;"><img src="https://i.ibb.co/RzpwWs3/Customer-Lockbox-Request.png" alt="Customer Lockbox request email" style="height: auto;width: auto"/></div>
<p>Now that we have a Customer Lockbox request how do we approve the request so the Microsoft engineer can access our tenant and fix it? It's simple, just find the right button and click it.</p>
<p>1. <strong>Log in to the Microsoft 365 admin center</strong> &gt; <strong>Support</strong> &gt; <strong>Customer Lockbox Requests</strong>.</p>
<p>2. Click the request you wish to approve.</p>
<div style="text-align:left;"><img src="https://i.ibb.co/P6KjrNK/data-access-request.png" alt="Customer Lockbox data access requests" style="height: auto;width: auto"/></div>
<p>3. Click <strong>Approve</strong>.</p>
`,
      nextContentSlug: 'Implementing-intelligent-security-using-risk-policies-in-Microsoft-365-NFQ6rYFeQ',
      previousContentSlug: 'Implement-Self-service-password-reset-in-Microsoft-365-2S9jn0aLr',
      hasCompletedContent: false,
      userAcct: {completedContent: []}
    }
  }

  componentDidMount() {
    this.onAuthStateChangedListener = onAuthStateChanged((user) => {
      if (user) {
        getDoc('courses/MS-500/users', user.uid).then((userAcct) => {
          if (!userAcct.completedContent) {
            userAcct.completedContent = []
          }
          this.setState({userAcct})
        })
      }
    })

    if (isBrowser()) {
      document.addEventListener('scroll', this.trackScrolling)
      this.setState({isTrackScrolling: true})
    }

    if (this.state.course.COURSE) {
      getDoc('courses', 'MS-500').then((course) => {
        this.setState({course})

        if (this.state.articles[0] === 'ARTICLES') {
          getAllDocs('courses/MS-500/contents').then((articles) => {
            const contentSorted = sort(course, articles)
            this.setState({ articles: contentSorted })

            if (this.state.article.ARTICLE) {
              getDoc('courses/MS-500/contents', '2QfoI2HxY').then((article) => {
                const articleHtml = draftToHtml(article.article)

                const idx = course.contentOrder.indexOf(article.id)

                const nextContentSlug = idx < articles.length - 1 ? contentSorted[idx + 1].slug : this.state.nextContentSlug
                const previousContentSlug = idx > 0 ? contentSorted[idx - 1].slug : this.state.previousContentSlug

                this.setState({article, articleHtml, nextContentSlug, previousContentSlug})
              })
            }
          })
        }
      })
    }
  }

  componentWillUnmount() {
    if (isBrowser() && this.state.isTrackScrolling)
      document.removeEventListener('scroll', this.trackScrolling);

    this.onAuthStateChangedListener()
  }

  trackScrolling() {
    if (document.body.scrollHeight * .8 < window.innerHeight + window.scrollY) {
      this.setHasCompletedContent(true)
    }
  }

  setHasCompletedContent(val) {
    if (val === true) {
      document.removeEventListener('scroll', this.trackScrolling);
      this.setState({isTrackScrolling: false})

      if (this.state.userAcct.id) {
        const userAcct = this.state.userAcct

        if (!userAcct.completedContent.includes(this.state.article.id)) {
          userAcct.completedContent.push(this.state.article.id)
          this.setState({userAcct})
          saveDoc('courses/MS-500/users', userAcct)
        }
      }
    }
  }

  render() {
    const jsonLd = {
      headline: this.state.article.title,
      datePublished: this.state.article.datePublished,
      keywords: [
        "Microsoft",
        "Microsoft 365",
        "Office 365",
        'MS-500',
        'Microsoft 365 Security Administration'
      ],
      "author": {
        "@type": "Person",
        "name": "John Gruber",
        url: 'https://medium.com/@gruberjl'
      }
    }

    return (
      <Page jsonLdType={'BlogPosting'} jsonLd={jsonLd} image={this.state.article.featuredImage} canonical={this.props.location.href} title={this.state.article.title} description={this.state.article.description}>
        <main>
          <Container fluid>
            <Row>
              <Col lg={9}>
                <Container>
                  <h1 style={marginTop24Style}>{this.state.article.title}</h1>
                  <div dangerouslySetInnerHTML={{__html: this.state.articleHtml}} className='img-width-100 article'></div>
                  <div className='flex-space-between margin12'>
                    <Link to={ this.state.previousContentSlug === 'PREVIOUS_CONTENT' ? '/' : `/course/ms-500/learn/${this.state.previousContentSlug}` }><IoChevronBack /> Previous</Link>
                    <Link to={ this.state.nextContentSlug === 'NEXT_CONTENT' ? '/' : `/course/ms-500/learn/${this.state.nextContentSlug}` }>Next <IoChevronForward /></Link>
                  </div>
                </Container>
              </Col>
              <Col lg={3}>
                <Accordion defaultActiveKey="0">
                  {this.state.course.sections.map((section, idx) => (
                    <Accordion.Item eventKey={idx} key={idx}>
                      <Accordion.Header>{section.title}</Accordion.Header>
                      <Accordion.Body style={removePaddingStyle}>
                        <ListGroup defaultActiveKey={`/course/ms-500/learn/${this.state.currentSlug}`} variant="flush">
                          { this.state.articles.filter(article => article.sectionId === section.id).map((article, articleIdx) => (
                            <ListGroup.Item style={listItemStyle} action to={`/course/ms-500/learn/${article.slug}`} href={`/course/ms-500/learn/${article.slug}`} as={Link} key={articleIdx} className='navigation-item'>
                              <Form.Check label={article.title} checked={this.state.userAcct.completedContent.includes(article.id)} onChange={() => {}} />
                            </ListGroup.Item>
                          ))}
                        </ListGroup>
                      </Accordion.Body>
                    </Accordion.Item>
                  ))}
                </Accordion>
              </Col>
            </Row>
          </Container>
        </main>
      </Page>
    )
  }
}

export default ArticlePage
