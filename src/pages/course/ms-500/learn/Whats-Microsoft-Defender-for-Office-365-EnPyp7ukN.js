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
      course: {"sections":[{"title":"Introduction","order":0,"id":"qwJW5VrBW"},{"order":1,"id":"AFV_acckJ","title":"Securing identity and access to Microsoft 365"},{"title":"Securing Microsoft 365, clouds, and on-premises environments","order":2,"id":"QScYfSu74"},{"id":"YhftdGIRX","order":3,"title":"Protecting your environment from accidental and malicious data loss"},{"title":"Protecting User devices using Intune","id":"l0DxUuonW","order":4}],"contentOrder":["cpchjBLkC","KKkBOVuS4","bzotoOjEe","cg_vxOX9L","uYCIPbnMC","7CpqFkPZU","rZzausKJ1","ky5W0Lz5P","i9pJIjTNH","S1hQgFOMV","2QfoI2HxY","V1en9Iugh","nAAIvNbtk","2S9jn0aLr","FldNualGC","NFQ6rYFeQ","rK48f6iM2","RHW1API2s","z8EMM9Eu_","Kye_yNLxA","EnPyp7ukN","6HUOr7qbL","GCOOUsSBT","GG4cMY8pK","z0qPG6v4T","LEyZMWBSt","7MQ3wE4wP","sH_Ee1DW1","vLweLmxZf","NsF7No40f","IsPGsme8w","wv2PbXnhI","7gR3L122b","ZyKX3Idjs","MAjW0a2_p","XFXu2zIS9","_LL9VqGZO","qDRA4jjoN","62t_7oiZx"],"description":"Learn, prepare and training for the Microsoft Microsoft Office 365 Exam MS-500: Microsoft 365 Security Administration MS-500 exam","title":"Training for MS-500: Microsoft Office 365 Security Admin","id":"MS-500","audience":"Anyone who wants to learn about securing Microsoft 365"},
      article: {"title":"What's Microsoft Defender for Office 365?","featuredImage":"https://i.ibb.co/WcwKY2G/Microsoft-365-incidents-and-alerts.png","description":"The meat and potatoes of Microsoft 365 security. The Microsoft Defender for Office 365 secures your entire Microsoft 365 environment.","article":{"blocks":[{"text":"The meat and potatoes of Microsoft 365 security. The Microsoft Defender for Office 365 secures your entire Microsoft 365 environment. It's where you can review weaknesses in your security, review alerts and incidents, and harden your phishing/spam protection. Oddly enough, I find it to be one of the least covered admin centers in the MS-500. So we'll go over everything quickly but I'd recommend spending some time learning the admin center for yourself.","entityRanges":[],"depth":0,"data":{},"inlineStyleRanges":[],"type":"unstyled","key":"5r8mo"},{"depth":0,"text":"Incidents & alerts","data":{},"entityRanges":[],"inlineStyleRanges":[],"type":"header-two","key":"2kge9"},{"inlineStyleRanges":[],"entityRanges":[{"key":0,"offset":0,"length":1}],"key":"4r2gv","depth":0,"data":{},"text":" ","type":"atomic"},{"depth":0,"entityRanges":[{"length":12,"offset":301,"key":1}],"inlineStyleRanges":[],"text":"This is where Microsoft will alert you that it has found a security attack that may have penetrated your environment. These alerts can range from \"Unusual volume of file deletion\" to \"Honeytoken activity on endpoint\" To edit the alerts you see go to Microsoft 365 compliance admin center > Policies > Alert policy. Also, you may not see all of the alerts if auditing isn't turned on.","key":"sp63","type":"unstyled","data":{}},{"inlineStyleRanges":[],"entityRanges":[],"type":"header-three","depth":0,"data":{},"text":"How to turn auditing on","key":"4iq5c"},{"inlineStyleRanges":[],"type":"atomic","key":"dd595","text":" ","entityRanges":[{"offset":0,"key":2,"length":1}],"depth":0,"data":{}},{"text":"1. Go to Microsoft 365 compliance admin center > Audit.","type":"unstyled","entityRanges":[{"key":3,"length":5,"offset":49}],"depth":0,"data":{},"inlineStyleRanges":[],"key":"6dsos"},{"type":"unstyled","key":"493ff","data":{},"text":"2. Click Start recording user and admin activity. (If you don't see the blue bar auditing is already turned on)","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"data":{},"key":"b6uvv","depth":0,"inlineStyleRanges":[],"entityRanges":[],"type":"header-two","text":"Hunting"},{"inlineStyleRanges":[],"key":"1t1de","type":"atomic","data":{},"text":" ","depth":0,"entityRanges":[{"key":4,"offset":0,"length":1}]},{"entityRanges":[{"key":5,"offset":300,"length":67}],"data":{},"depth":0,"text":"Advanced hunting is where you can Kusto query language to explore 30 days of data across your environment. You can use the hunting section of the Microsoft 365 Defender admin center to find advanced threats in your environment. Microsoft has a number of queries already defined that you can explore. https://github.com/microsoft/Microsoft-365-Defender-Hunting-Queries","inlineStyleRanges":[],"key":"2oec","type":"unstyled"},{"type":"header-two","depth":0,"inlineStyleRanges":[],"data":{},"text":"Actions & submissions","key":"d2sfc","entityRanges":[]},{"inlineStyleRanges":[],"text":" ","type":"atomic","key":"4qkfc","entityRanges":[{"key":6,"length":1,"offset":0}],"depth":0,"data":{}},{"data":{},"text":"The Action center replaces the Office 365 Security & Compliance Center and the Action center in the Microsoft Defender Security Center. It unifies the action center for Defender for Endpoint and Defender for Office 365. The action center can be used to perform the following:","type":"unstyled","entityRanges":[],"depth":0,"inlineStyleRanges":[{"length":13,"offset":4,"style":"BOLD"},{"style":"color-rgb(23,23,23)","length":39,"offset":31},{"offset":31,"style":"bgcolor-rgb(255,255,255)","length":39},{"style":"fontsize-16","length":39,"offset":31},{"offset":31,"length":39,"style":"fontfamily-Segoe UI\", SegoeUI, \"Helvetica Neue\", Helvetica, Arial, sans-serif"}],"key":"6pmqs"},{"entityRanges":[],"depth":0,"data":{},"inlineStyleRanges":[],"key":"b8ima","type":"unordered-list-item","text":"Approve remediation (including automated remediation)"},{"data":{},"type":"unordered-list-item","entityRanges":[],"text":"Review already approved remediation actions","key":"easud","depth":0,"inlineStyleRanges":[]},{"data":{},"inlineStyleRanges":[],"type":"unordered-list-item","entityRanges":[],"key":"ada0d","depth":0,"text":"Audit completed actions"},{"key":"9mgrd","text":" ","type":"atomic","inlineStyleRanges":[],"depth":0,"entityRanges":[{"key":7,"length":1,"offset":0}],"data":{}},{"entityRanges":[],"key":"fd5fk","inlineStyleRanges":[{"length":11,"offset":4,"style":"BOLD"},{"style":"color-rgb(33,37,41)","length":246,"offset":69},{"offset":69,"length":246,"style":"bgcolor-rgb(255,255,255)"},{"style":"fontsize-16","offset":69,"length":246},{"length":246,"offset":69,"style":"fontfamily-system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", \"Liberation Sans\", sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji"}],"type":"unstyled","data":{},"depth":0,"text":"The Submissions tab is where you can submit emails, attachments, and URLs to Microsoft for scanning and updating their security. From the submissions tab, you can also see emails users submitted as Phishing attacks and then submit them to Microsoft for analysis or flag them as phishing, junk, or not threats found."},{"entityRanges":[],"depth":0,"data":{},"text":"Secure score","type":"header-two","key":"d1lvu","inlineStyleRanges":[]},{"inlineStyleRanges":[],"depth":0,"text":" ","data":{},"key":"1l7ag","entityRanges":[{"key":8,"length":1,"offset":0}],"type":"atomic"},{"data":{},"type":"unstyled","entityRanges":[],"key":"4sblc","depth":0,"inlineStyleRanges":[],"text":"The Secure score is Microsoft rating the security of your environment and making recommendations to improve it. They'll make recommendations to your Microsoft 365 environment and even your on-premises devices if you connect your devices to the Microsoft 365 Defender portal. For example, it will recommend you turn on the user risk policy which will use intelligence to determine if someone's Microsoft 365 account is being or has been maliciously compromised."},{"type":"header-two","text":"Learning hub","key":"37dpf","depth":0,"entityRanges":[],"inlineStyleRanges":[],"data":{}},{"key":"86r08","type":"atomic","entityRanges":[{"length":1,"key":9,"offset":0}],"data":{},"text":" ","depth":0,"inlineStyleRanges":[]},{"key":"9g4g6","data":{},"depth":0,"inlineStyleRanges":[],"type":"unstyled","entityRanges":[],"text":"The learning hub is a place where you can learn how to better defend your Microsoft 365 and on-premises environment. The learning hub has several links to helpful videos to guide you through the setup of different parts of the Microsoft 365 security environment."},{"key":"1o4pv","entityRanges":[],"type":"header-two","text":"Email & collaboration review","data":{},"depth":0,"inlineStyleRanges":[]},{"key":"79t4u","inlineStyleRanges":[],"text":" ","entityRanges":[{"key":10,"offset":0,"length":1}],"type":"atomic","data":{},"depth":0},{"inlineStyleRanges":[{"length":11,"style":"BOLD","offset":117},{"style":"BOLD","length":16,"offset":322}],"key":"5gcdk","text":"The email & collaboration review tab is where you can review the organization's quarantine and restricted users. The quarantine is where any message that is sent to quarantine will appear for admins. In short, if a user says they should have received an email and haven't, you can go to the quarantine to retrieve it. The restricted users' section is where you can go to unblock a user account that is blocked from sending emails. In short, if a user's account is compromised and is sending out spam Microsoft will block the account from sending emails. After you change the password, configure MFA, and train the user again you can then go to the restricted users' section to unblock their account.","depth":0,"entityRanges":[],"data":{},"type":"unstyled"},{"inlineStyleRanges":[],"key":"4kpqn","entityRanges":[],"data":{},"type":"header-two","text":"Attack simulation training","depth":0},{"entityRanges":[{"offset":0,"length":1,"key":11}],"text":" ","data":{},"key":"4ereq","depth":0,"inlineStyleRanges":[],"type":"atomic"},{"text":"The attack simulation training is where you can send setup and send fake phishing emails to your users where they can either flag it as phishing or fall victim to your fake phishing attack. If they fall victim to the fake phishing attack they can be automatically assigned a training where they can learn to spot fake phishing attacks.","depth":0,"inlineStyleRanges":[],"type":"unstyled","data":{},"entityRanges":[],"key":"2c3s1"},{"inlineStyleRanges":[],"entityRanges":[],"data":{},"text":"Policies & rules","key":"fhjjd","type":"header-two","depth":0},{"depth":0,"data":{},"inlineStyleRanges":[],"text":" ","key":"99ke2","type":"atomic","entityRanges":[{"length":1,"offset":0,"key":12}]},{"data":{},"entityRanges":[],"type":"unstyled","text":"Under policies & rules, you can set up the threat policies for your Microsoft 365 tenant. You can configure anti-phishing, anti-spam, and anti-malware policies. You can also configure your allow/blocked email addresses and domain rules. The policies & rules section is probably the most common section, it's where you can control most of the security in your environment. It's also where you can manage your alerts. You can customize who is alerted on what event.","key":"c0pmk","inlineStyleRanges":[],"depth":0},{"key":"310ip","type":"header-two","data":{},"inlineStyleRanges":[],"entityRanges":[],"depth":0,"text":"Reports"},{"text":" ","depth":0,"type":"atomic","inlineStyleRanges":[],"data":{},"entityRanges":[{"length":1,"key":13,"offset":0}],"key":"ctegv"},{"inlineStyleRanges":[],"entityRanges":[],"data":{},"depth":0,"key":"ctig0","text":"The reports section contains several security-related reports for your Microsoft 365 environment. You can review several security reports, email the reports to yourself, or schedule a report to be sent to yourself regularly. There are a ton of reports you can view but some of the most common are:","type":"unstyled"},{"text":"Users at risk","inlineStyleRanges":[],"type":"unordered-list-item","depth":0,"entityRanges":[],"key":"e97dt","data":{}},{"text":"DLP policy matches","data":{},"type":"unordered-list-item","entityRanges":[],"inlineStyleRanges":[],"key":"hiak","depth":0},{"depth":0,"type":"unordered-list-item","key":"3ilt1","inlineStyleRanges":[],"entityRanges":[],"text":"Device compliance","data":{}},{"entityRanges":[],"text":"malware status summary","key":"3b989","data":{},"inlineStyleRanges":[],"depth":0,"type":"unordered-list-item"},{"depth":0,"data":{},"type":"unordered-list-item","key":"88vfc","text":"Compromised users","inlineStyleRanges":[],"entityRanges":[]},{"entityRanges":[],"text":"Threat protection status","type":"unordered-list-item","depth":0,"data":{},"key":"5thd9","inlineStyleRanges":[]},{"key":"pn6s","type":"header-two","data":{},"entityRanges":[],"inlineStyleRanges":[],"text":"Audit","depth":0},{"depth":0,"inlineStyleRanges":[],"data":{},"key":"67sd","entityRanges":[{"offset":0,"length":1,"key":14}],"type":"atomic","text":" "},{"depth":0,"data":{},"inlineStyleRanges":[],"entityRanges":[],"type":"unstyled","text":"Auditing is a powerful place where you can access the audit logs for your entire Microsoft 365 environment. Need to find out who deleted a document or who created a group? It's no problem for the audit logs. Search across hundreds of activities across your entire Microsoft 365 tenant. Filter by time, activity, users, or location (including File, folder, or site). You can also configure the audit retention policies to tell Microsoft to hang on to up to 10 years of audit logs.","key":"9i2fu"},{"entityRanges":[],"text":"Permissions & roles","data":{},"depth":0,"inlineStyleRanges":[],"type":"header-two","key":"fnaqt"},{"text":" ","type":"atomic","depth":0,"key":"c2cnk","data":{},"entityRanges":[{"length":1,"offset":0,"key":15}],"inlineStyleRanges":[]},{"depth":0,"data":{},"type":"unstyled","inlineStyleRanges":[],"entityRanges":[],"key":"87k42","text":"The permissions and roles tab is where you can add members to roles and create custom roles. Much like the role management in the Azure AD admin center. It's the same roles! So in short, there's no point in looking into permissions & roles here since you can do it all from the Microsoft 365 admin center or the Azure AD admin center."},{"key":"1lse5","depth":0,"type":"header-two","entityRanges":[],"inlineStyleRanges":[],"data":{},"text":"Settings"},{"text":" ","key":"44gjt","depth":0,"inlineStyleRanges":[],"data":{},"entityRanges":[{"length":1,"key":16,"offset":0}],"type":"atomic"},{"data":{},"text":"The settings section is where, you guessed it, contains the settings. Depending on what licenses you have is depending on the settings you'll see.","key":"48nmn","entityRanges":[],"depth":0,"type":"unstyled","inlineStyleRanges":[]},{"key":"8a0nr","depth":0,"data":{},"inlineStyleRanges":[],"text":"More resources","type":"header-two","entityRanges":[]},{"inlineStyleRanges":[],"key":"47cdn","entityRanges":[{"offset":0,"key":17,"length":1}],"type":"atomic","text":" ","depth":0,"data":{}},{"text":"The more resources tab will link you to the other security admin centers. From Azure AD, Defender for Cloud Apps, to Microsoft Defender for Identity admin centers.","entityRanges":[],"inlineStyleRanges":[],"key":"6f9s4","type":"unstyled","data":{},"depth":0}],"entityMap":{"0":{"type":"IMAGE","mutability":"MUTABLE","data":{"url":"https://compliance.microsoft.com/alertpolicies","height":"auto","src":"https://i.ibb.co/WcwKY2G/Microsoft-365-incidents-and-alerts.png","targetOption":"_blank","alt":"Microsoft 365 incidents and alerts","width":"auto","alignment":"none"}},"1":{"data":{"alt":"Microsoft 365 Start recording user and admin activity","height":"auto","targetOption":"_blank","alignment":"left","url":"https://compliance.microsoft.com/alertpolicies","src":"https://i.ibb.co/bdVRPQS/Start-recording-user-and-admin-activity.png","width":"auto"},"mutability":"MUTABLE","type":"LINK"},"2":{"mutability":"MUTABLE","data":{"url":"https://compliance.microsoft.com/auditlogsearch","targetOption":"_blank","alt":"Microsoft 365 Start recording user and admin activity","alignment":"none","height":"auto","width":"auto","src":"https://i.ibb.co/bdVRPQS/Start-recording-user-and-admin-activity.png"},"type":"IMAGE"},"3":{"type":"LINK","data":{"targetOption":"_blank","url":"https://compliance.microsoft.com/auditlogsearch"},"mutability":"MUTABLE"},"4":{"data":{"src":"https://i.ibb.co/vzYyJLJ/microsoft-365-defender-hunting.png","width":"auto","targetOption":"_blank","url":"https://github.com/microsoft/Microsoft-365-Defender-Hunting-Queries","alignment":"none","alt":"Microsoft 365 defender hunting","height":"auto"},"type":"IMAGE","mutability":"MUTABLE"},"5":{"mutability":"MUTABLE","data":{"targetOption":"_blank","url":"https://github.com/microsoft/Microsoft-365-Defender-Hunting-Queries"},"type":"LINK"},"6":{"data":{"alignment":"none","height":"auto","width":"auto","alt":"Microsoft 365 Defender actions and submissions","src":"https://i.ibb.co/bRBczN1/microsoft-365-defender-actions-and-submissions.png"},"type":"IMAGE","mutability":"MUTABLE"},"7":{"data":{"height":"auto","src":"https://i.ibb.co/0c1xcTS/Microsoft-365-defender-submissions.png","alignment":"none","alt":"Microsoft 365 Defender submissions","width":"auto"},"mutability":"MUTABLE","type":"IMAGE"},"8":{"data":{"alignment":"none","height":"auto","alt":"Secure score","src":"https://i.ibb.co/MR4hf5t/Secure-Score.png","width":"auto"},"type":"IMAGE","mutability":"MUTABLE"},"9":{"data":{"width":"auto","alignment":"none","height":"auto","src":"https://i.ibb.co/ZzLvqcC/learning-hub.png","alt":"Microsoft 365 learning hub"},"mutability":"MUTABLE","type":"IMAGE"},"10":{"data":{"alignment":"none","src":"https://i.ibb.co/q9Nt4Wj/email-and-collaboration-review.png","alt":"Email and collaboration review","height":"auto","width":"auto"},"type":"IMAGE","mutability":"MUTABLE"},"11":{"type":"IMAGE","data":{"alignment":"none","src":"https://i.ibb.co/ZfFfxVb/attack-simulation-training.png","width":"auto","alt":"Attack simulation training","height":"auto"},"mutability":"MUTABLE"},"12":{"mutability":"MUTABLE","data":{"height":"auto","width":"auto","src":"https://i.ibb.co/0QbcJvM/Policies-and-rules.png","alignment":"none","alt":"Microsoft 365 defender policies and rules"},"type":"IMAGE"},"13":{"data":{"height":"auto","src":"https://i.ibb.co/FY7m9H1/Microsoft-365-Defender-Reports.png","width":"auto","alt":"Microsoft 365 Defender reports","alignment":"none"},"mutability":"MUTABLE","type":"IMAGE"},"14":{"mutability":"MUTABLE","data":{"alt":"Microsoft 365 audit logs","alignment":"none","width":"auto","height":"auto","src":"https://i.ibb.co/tJCZBwt/Microsoft-365-audit-logs.png"},"type":"IMAGE"},"15":{"data":{"alt":"Microsoft 365 Defender Permissions and Roles","width":"auto","alignment":"none","src":"https://i.ibb.co/vdM5BtG/Microsoft-365-Permissions-and-roles.png","height":"auto"},"type":"IMAGE","mutability":"MUTABLE"},"16":{"data":{"alignment":"none","src":"https://i.ibb.co/kBf0jbb/Microsoft-365-Defender-Settings.png","alt":"Microsoft 365 Defender Settings","width":"auto","height":"auto"},"mutability":"MUTABLE","type":"IMAGE"},"17":{"type":"IMAGE","data":{"alt":"Microsoft 365 Defender More Resources","alignment":"none","width":"auto","height":"auto","src":"https://i.ibb.co/sP6Q3DQ/Microsoft-365-Defender-More-Resources.png"},"mutability":"MUTABLE"}}},"publish":true,"datePublished":"2022/5/26","type":"article","id":"EnPyp7ukN","sectionId":"QScYfSu74","slug":"Whats-Microsoft-Defender-for-Office-365-EnPyp7ukN","images":["https://i.ibb.co/bdVRPQS/Start-recording-user-and-admin-activity.png","https://i.ibb.co/WcwKY2G/Microsoft-365-incidents-and-alerts.png","https://i.ibb.co/vzYyJLJ/microsoft-365-defender-hunting.png","https://i.ibb.co/0c1xcTS/Microsoft-365-defender-submissions.png","https://i.ibb.co/bRBczN1/microsoft-365-defender-actions-and-submissions.png","https://i.ibb.co/MR4hf5t/Secure-Score.png","https://i.ibb.co/ZzLvqcC/learning-hub.png","https://i.ibb.co/q9Nt4Wj/email-and-collaboration-review.png","https://i.ibb.co/ZfFfxVb/attack-simulation-training.png","https://i.ibb.co/0QbcJvM/Policies-and-rules.png","https://i.ibb.co/FY7m9H1/Microsoft-365-Defender-Reports.png","https://i.ibb.co/tJCZBwt/Microsoft-365-audit-logs.png","https://i.ibb.co/vdM5BtG/Microsoft-365-Permissions-and-roles.png","https://i.ibb.co/kBf0jbb/Microsoft-365-Defender-Settings.png","https://i.ibb.co/sP6Q3DQ/Microsoft-365-Defender-More-Resources.png"]},
      articles: [{"id":"cpchjBLkC","sectionId":"qwJW5VrBW","slug":"Whats-in-this-course-cpchjBLkC","title":"What's in this course?","featuredImage":"https://i.ibb.co/zFs9Vfb/microsoft365-security-administrator-associate-600x600.png"},{"id":"KKkBOVuS4","sectionId":"qwJW5VrBW","slug":"Creating-a-free-Microsoft-365-tenant-for-practice-KKkBOVuS4","title":"Creating a free Microsoft 365 tenant for practice","featuredImage":"https://i.ibb.co/F07sjQJ/microsoft-365-e5-trial.png"},{"id":"bzotoOjEe","sectionId":"qwJW5VrBW","slug":"Managing-the-Microsoft-365-tenant-Introduction-to-the-admin-centers-bzotoOjEe","title":"Managing the Microsoft 365 tenant - Introduction to the admin centers","featuredImage":"https://i.ibb.co/f1cr4zt/Microsoft-365-admin-centers.png"},{"id":"cg_vxOX9L","sectionId":"qwJW5VrBW","slug":"Managing-Microsoft-365-through-PowerShell-cg_vxOX9L","title":"Managing Microsoft 365 through PowerShell","featuredImage":"https://i.ibb.co/HV13YF6/install-microsoft-365-powershell-modules.png"},{"id":"uYCIPbnMC","sectionId":"AFV_acckJ","slug":"How-to-create-users-in-Microsoft-365-Cloud-Only-uYCIPbnMC","title":"How to create users in Microsoft 365 Cloud Only","featuredImage":"https://i.ibb.co/Wnt5Q43/View-Microsoft-365-Users.png"},{"id":"7CpqFkPZU","sectionId":"AFV_acckJ","slug":"Creating-and-managing-admins-through-roles-7CpqFkPZU","title":"Creating and managing admins through roles","featuredImage":"https://i.ibb.co/kySL4HQ/Roles-and-administrators.png"},{"id":"rZzausKJ1","sectionId":"AFV_acckJ","slug":"Time-limited-admin-roles-in-Microsoft-365-rZzausKJ1","title":"Time limited admin roles in Microsoft 365","featuredImage":"https://i.ibb.co/nDvjyPD/select-member-to-add-to-PIM-role.png"},{"id":"ky5W0Lz5P","sectionId":"AFV_acckJ","slug":"Whats-AD-Connect-ky5W0Lz5P","title":"What's AD Connect","featuredImage":"https://i.ibb.co/7nDqr9x/Whats-AD-Connect.png"},{"id":"i9pJIjTNH","sectionId":"AFV_acckJ","slug":"Protecting-Passwords-in-Microsoft-365-i9pJIjTNH","title":"Protecting Passwords in Microsoft 365","featuredImage":"https://i.ibb.co/DLD4G4q/access-smart-lockout-settings.png"},{"id":"S1hQgFOMV","sectionId":"AFV_acckJ","slug":"Creating-and-managing-users-through-groups-S1hQgFOMV","title":"Creating and managing users through groups","featuredImage":"https://i.ibb.co/nmmC28M/add-a-group-microsoft-365.png"},{"id":"2QfoI2HxY","sectionId":"AFV_acckJ","slug":"Securing-and-implementing-enterprise-applications-2QfoI2HxY","title":"Securing and implementing enterprise applications","featuredImage":"https://i.ibb.co/C2mp69m/disable-user-consent.png"},{"id":"V1en9Iugh","sectionId":"AFV_acckJ","slug":"Whats-a-conditional-access-policy-V1en9Iugh","title":"What's a conditional access policy?","featuredImage":"https://i.ibb.co/DQm1sY0/Create-conditional-access-policy.png"},{"id":"nAAIvNbtk","sectionId":"AFV_acckJ","slug":"The-many-ways-to-implement-multi-factor-authentication-MFA-in-Microsoft-365-nAAIvNbtk","title":"The many ways to implement multi-factor authentication (MFA) in Microsoft 365","featuredImage":"https://i.ibb.co/P1P0wNY/microsoft-365-manage-security-defaults.png"},{"id":"2S9jn0aLr","sectionId":"AFV_acckJ","slug":"Implement-Self-service-password-reset-in-Microsoft-365-2S9jn0aLr","title":"Implement Self-service password reset in Microsoft 365","featuredImage":"https://i.ibb.co/58y9JVg/write-back-passwords-to-on-premises-directory.png"},{"id":"FldNualGC","sectionId":"AFV_acckJ","slug":"Locking-down-your-Microsoft-365-tenant-from-Microsoft-engineers-FldNualGC","title":"Locking down your Microsoft 365 tenant from Microsoft engineers","featuredImage":"https://i.ibb.co/DCmpnT9/Enable-Customer-Lockbox.png"},{"id":"NFQ6rYFeQ","sectionId":"AFV_acckJ","slug":"Implementing-intelligent-security-using-risk-policies-in-Microsoft-365-NFQ6rYFeQ","title":"Implementing intelligent security using risk policies in Microsoft 365","featuredImage":"https://i.ibb.co/0cyQJ7j/Risk-Detections.png"},{"id":"rK48f6iM2","sectionId":"AFV_acckJ","slug":"Automating-Access-Review-in-Microsoft-365-rK48f6iM2","title":"Automating Access Review in Microsoft 365","featuredImage":"https://i.ibb.co/Xsxvz6Z/new-access-review.png"},{"id":"RHW1API2s","sectionId":"AFV_acckJ","slug":"Just-in-time-approval-and-notification-for-admin-roles-in-Microsoft-365-RHW1API2s","title":"Just in time, approval and notification for admin roles in Microsoft 365","featuredImage":"https://i.ibb.co/dcb6XFN/Activate-a-Role.png"},{"id":"z8EMM9Eu_","sectionId":"QScYfSu74","slug":"Whats-Microsoft-365-Defender-z8EMM9Eu_","title":"What's Microsoft 365 Defender?","featuredImage":"https://i.ibb.co/MDMyDQt/Microsoft-Defender.png"},{"id":"Kye_yNLxA","sectionId":"QScYfSu74","slug":"Whats-Microsoft-Defender-for-identity-Kye_yNLxA","title":"What's Microsoft Defender for identity?","featuredImage":"https://i.ibb.co/bQDBh0Y/Defender-for-Identity-Timeline.png"},{"id":"EnPyp7ukN","sectionId":"QScYfSu74","slug":"Whats-Microsoft-Defender-for-Office-365-EnPyp7ukN","title":"What's Microsoft Defender for Office 365?","featuredImage":"https://i.ibb.co/WcwKY2G/Microsoft-365-incidents-and-alerts.png"},{"id":"6HUOr7qbL","sectionId":"QScYfSu74","slug":"Protect-your-email-environment-from-malicious-actors-6HUOr7qbL","title":"Protect your email and Office environment from malicious actors","featuredImage":"https://i.ibb.co/Df0KQVp/Reports.png"},{"id":"GCOOUsSBT","sectionId":"QScYfSu74","slug":"Protecting-email-against-phishing-attacks-GCOOUsSBT","title":"Protecting email against phishing attacks","featuredImage":"https://i.ibb.co/GCjZHWg/edit-actions.png"},{"id":"GG4cMY8pK","sectionId":"QScYfSu74","slug":"Simulating-attacks-with-Microsoft-365-GG4cMY8pK","title":"Simulating attacks with Microsoft 365","featuredImage":"https://i.ibb.co/NyvnbMK/simulation-overview-view-users-circled.png"},{"id":"z0qPG6v4T","sectionId":"QScYfSu74","slug":"Protecting-Windows-10-and-other-devices-with-Microsoft-Defender-for-Endpoint-z0qPG6v4T","title":"Protecting Windows 10 and other devices with Microsoft Defender for Endpoint","featuredImage":"https://i.ibb.co/T47Xhyh/enable-endpoint-connections.png"},{"id":"LEyZMWBSt","sectionId":"QScYfSu74","slug":"Collect-detect-investigate-and-respond-to-security-threats-using-Microsoft-Sentinel-LEyZMWBSt","title":"Collect, detect, investigate, and respond to security threats using Microsoft Sentinel","featuredImage":"https://i.ibb.co/qN9XsKj/Add-Workbook.png"},{"id":"7MQ3wE4wP","sectionId":"QScYfSu74","slug":"Implement-and-manage-Microsoft-Defender-for-Cloud-Apps-7MQ3wE4wP","title":"Implement and manage Microsoft Defender for Cloud Apps","featuredImage":"https://i.ibb.co/7g7LvFg/office-365-cloud-apps-settings.png"},{"id":"sH_Ee1DW1","sectionId":"QScYfSu74","slug":"Auditing-sign-ins-and-other-actions-in-Microsoft-365-sH_Ee1DW1","title":"Auditing sign-ins and other actions in Microsoft 365","featuredImage":"https://i.ibb.co/BqMw3jZ/Start-recording-user-and-admin-activity.png"},{"id":"vLweLmxZf","sectionId":"YhftdGIRX","slug":"How-to-classify-data-using-labels-in-Microsoft-365-vLweLmxZf","title":"How to classify data using labels in Microsoft 365","featuredImage":"https://i.ibb.co/k9nhWS5/Choose-protection-settings-for-files-and-emails.png"},{"id":"NsF7No40f","sectionId":"YhftdGIRX","slug":"Creating-and-managing-data-retention-to-conform-to-compliance-NsF7No40f","title":"Creating and managing data retention to conform to compliance","featuredImage":"https://i.ibb.co/yqC0ZdY/New-Retention-Policy.png"},{"id":"IsPGsme8w","sectionId":"YhftdGIRX","slug":"Preventing-accidental-and-malicious-data-loss-with-DLP-policies-IsPGsme8w","title":"Preventing accidental and malicious data loss with DLP policies","featuredImage":"https://i.ibb.co/n8WcqKM/Create-a-DLP-policy.png"},{"id":"wv2PbXnhI","sectionId":"YhftdGIRX","slug":"Everything-you-need-to-know-about-securing-SharePoint-Online-for-the-MS-500-wv2PbXnhI","title":"Everything you need to know about securing SharePoint Online for the MS-500","featuredImage":"https://i.ibb.co/Gk9NjSH/Share-Point-Online-Warning.png"},{"id":"7gR3L122b","sectionId":"l0DxUuonW","slug":"Introduction-to-Intune-7gR3L122b","title":"Introduction to Intune","featuredImage":"https://i.ibb.co/Fq3N8BX/Endpoint-Manager-Admin-Center.png"},{"id":"ZyKX3Idjs","sectionId":"l0DxUuonW","slug":"Setting-up-Android-Devices-ZyKX3Idjs","title":"Setting up Android Devices","featuredImage":"https://i.ibb.co/m0BYhL2/Connect-Intune-to-Google-Play.png"},{"id":"MAjW0a2_p","sectionId":"l0DxUuonW","slug":"Setting-up-Apple--iOS-devices-in-Intune-MAjW0a2_p","title":"Setting up Apple / iOS devices in Intune","featuredImage":"https://i.ibb.co/X7Ffb2B/Setup-Apple-Enrollment-in-Intune.png"},{"id":"XFXu2zIS9","sectionId":"l0DxUuonW","slug":"Setting-up-Windows-10-devices-in-Intune-XFXu2zIS9","title":"Setting up Windows 10 devices in Intune","featuredImage":"https://i.ibb.co/WDXKVjW/configure-device-options.png"},{"id":"_LL9VqGZO","sectionId":"l0DxUuonW","slug":"How-to-manage-devices-using-Intune-_LL9VqGZO","title":"How to manage devices using Intune","featuredImage":"https://i.ibb.co/HPQ2m8t/Create-an-endpoint-protection-profile.png"},{"id":"qDRA4jjoN","sectionId":"l0DxUuonW","slug":"Understanding-compliance-policies-qDRA4jjoN","title":"Understanding compliance policies","featuredImage":"https://i.ibb.co/N3Qk57v/Create-a-compliance-policy.png"},{"id":"62t_7oiZx","sectionId":"l0DxUuonW","slug":"Restricting-and-managing-apps-on-user-devices-62t_7oiZx","title":"Restricting and managing apps on user devices","featuredImage":"https://i.ibb.co/PCVRKDf/Add-an-Android-app-to-Intune.png"}],
      articleHtml: `<p>The meat and potatoes of Microsoft 365 security. The Microsoft Defender for Office 365 secures your entire Microsoft 365 environment. It's where you can review weaknesses in your security, review alerts and incidents, and harden your phishing/spam protection. Oddly enough, I find it to be one of the least covered admin centers in the MS-500. So we'll go over everything quickly but I'd recommend spending some time learning the admin center for yourself.</p>
<h2>Incidents &amp; alerts</h2>
<div style="text-align:none;"><img src="https://i.ibb.co/WcwKY2G/Microsoft-365-incidents-and-alerts.png" alt="Microsoft 365 incidents and alerts" style="height: auto;width: auto"/></div>
<p>This is where Microsoft will alert you that it has found a security attack that may have penetrated your environment. These alerts can range from "Unusual volume of file deletion" to "Honeytoken activity on endpoint" To edit the alerts you see go to Microsoft 365 compliance admin center &gt; Policies &gt; <a href="https://compliance.microsoft.com/alertpolicies" target="_blank">Alert policy</a>. Also, you may not see all of the alerts if auditing isn't turned on.</p>
<h3>How to turn auditing on</h3>
<div style="text-align:none;"><img src="https://i.ibb.co/bdVRPQS/Start-recording-user-and-admin-activity.png" alt="Microsoft 365 Start recording user and admin activity" style="height: auto;width: auto"/></div>
<p>1. Go to Microsoft 365 compliance admin center &gt; <a href="https://compliance.microsoft.com/auditlogsearch" target="_blank">Audit</a>.</p>
<p>2. Click Start recording user and admin activity. (If you don't see the blue bar auditing is already turned on)</p>
<h2>Hunting</h2>
<div style="text-align:none;"><img src="https://i.ibb.co/vzYyJLJ/microsoft-365-defender-hunting.png" alt="Microsoft 365 defender hunting" style="height: auto;width: auto"/></div>
<p>Advanced hunting is where you can Kusto query language to explore 30 days of data across your environment. You can use the hunting section of the Microsoft 365 Defender admin center to find advanced threats in your environment. Microsoft has a number of queries already defined that you can explore. <a href="https://github.com/microsoft/Microsoft-365-Defender-Hunting-Queries" target="_blank">https://github.com/microsoft/Microsoft-365-Defender-Hunting-Queries</a></p>
<h2>Actions &amp; submissions</h2>
<div style="text-align:none;"><img src="https://i.ibb.co/bRBczN1/microsoft-365-defender-actions-and-submissions.png" alt="Microsoft 365 Defender actions and submissions" style="height: auto;width: auto"/></div>
<p>The <strong>Action center</strong> replaces the <span style="color: rgb(23,23,23);background-color: rgb(255,255,255);font-size: 16px;font-family: Segoe UI", SegoeUI, "Helvetica Neue", Helvetica, Arial, sans-serif;">Office 365 Security &amp; Compliance Center</span> and the Action center in the Microsoft Defender Security Center. It unifies the action center for Defender for Endpoint and Defender for Office 365. The action center can be used to perform the following:</p>
<ul>
<li>Approve remediation (including automated remediation)</li>
<li>Review already approved remediation actions</li>
<li>Audit completed actions</li>
</ul>
<div style="text-align:none;"><img src="https://i.ibb.co/0c1xcTS/Microsoft-365-defender-submissions.png" alt="Microsoft 365 Defender submissions" style="height: auto;width: auto"/></div>
<p>The <strong>Submissions</strong> tab is where you can submit emails, attachments, and <span style="color: rgb(33,37,41);background-color: rgb(255,255,255);font-size: 16px;font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;">URLs to Microsoft for scanning and updating their security. From the submissions tab, you can also see emails users submitted as Phishing attacks and then submit them to Microsoft for analysis or flag them as phishing, junk, or not threats found.</span></p>
<h2>Secure score</h2>
<div style="text-align:none;"><img src="https://i.ibb.co/MR4hf5t/Secure-Score.png" alt="Secure score" style="height: auto;width: auto"/></div>
<p>The Secure score is Microsoft rating the security of your environment and making recommendations to improve it. They'll make recommendations to your Microsoft 365 environment and even your on-premises devices if you connect your devices to the Microsoft 365 Defender portal. For example, it will recommend you turn on the user risk policy which will use intelligence to determine if someone's Microsoft 365 account is being or has been maliciously compromised.</p>
<h2>Learning hub</h2>
<div style="text-align:none;"><img src="https://i.ibb.co/ZzLvqcC/learning-hub.png" alt="Microsoft 365 learning hub" style="height: auto;width: auto"/></div>
<p>The learning hub is a place where you can learn how to better defend your Microsoft 365 and on-premises environment. The learning hub has several links to helpful videos to guide you through the setup of different parts of the Microsoft 365 security environment.</p>
<h2>Email &amp; collaboration review</h2>
<div style="text-align:none;"><img src="https://i.ibb.co/q9Nt4Wj/email-and-collaboration-review.png" alt="Email and collaboration review" style="height: auto;width: auto"/></div>
<p>The email &amp; collaboration review tab is where you can review the organization's quarantine and restricted users. The <strong>quarantine </strong>is where any message that is sent to quarantine will appear for admins. In short, if a user says they should have received an email and haven't, you can go to the quarantine to retrieve it. The <strong>restricted users</strong>' section is where you can go to unblock a user account that is blocked from sending emails. In short, if a user's account is compromised and is sending out spam Microsoft will block the account from sending emails. After you change the password, configure MFA, and train the user again you can then go to the restricted users' section to unblock their account.</p>
<h2>Attack simulation training</h2>
<div style="text-align:none;"><img src="https://i.ibb.co/ZfFfxVb/attack-simulation-training.png" alt="Attack simulation training" style="height: auto;width: auto"/></div>
<p>The attack simulation training is where you can send setup and send fake phishing emails to your users where they can either flag it as phishing or fall victim to your fake phishing attack. If they fall victim to the fake phishing attack they can be automatically assigned a training where they can learn to spot fake phishing attacks.</p>
<h2>Policies &amp; rules</h2>
<div style="text-align:none;"><img src="https://i.ibb.co/0QbcJvM/Policies-and-rules.png" alt="Microsoft 365 defender policies and rules" style="height: auto;width: auto"/></div>
<p>Under policies &amp; rules, you can set up the threat policies for your Microsoft 365 tenant. You can configure anti-phishing, anti-spam, and anti-malware policies. You can also configure your allow/blocked email addresses and domain rules. The policies &amp; rules section is probably the most common section, it's where you can control most of the security in your environment. It's also where you can manage your alerts. You can customize who is alerted on what event.</p>
<h2>Reports</h2>
<div style="text-align:none;"><img src="https://i.ibb.co/FY7m9H1/Microsoft-365-Defender-Reports.png" alt="Microsoft 365 Defender reports" style="height: auto;width: auto"/></div>
<p>The reports section contains several security-related reports for your Microsoft 365 environment. You can review several security reports, email the reports to yourself, or schedule a report to be sent to yourself regularly. There are a ton of reports you can view but some of the most common are:</p>
<ul>
<li>Users at risk</li>
<li>DLP policy matches</li>
<li>Device compliance</li>
<li>malware status summary</li>
<li>Compromised users</li>
<li>Threat protection status</li>
</ul>
<h2>Audit</h2>
<div style="text-align:none;"><img src="https://i.ibb.co/tJCZBwt/Microsoft-365-audit-logs.png" alt="Microsoft 365 audit logs" style="height: auto;width: auto"/></div>
<p>Auditing is a powerful place where you can access the audit logs for your entire Microsoft 365 environment. Need to find out who deleted a document or who created a group? It's no problem for the audit logs. Search across hundreds of activities across your entire Microsoft 365 tenant. Filter by time, activity, users, or location (including File, folder, or site). You can also configure the audit retention policies to tell Microsoft to hang on to up to 10 years of audit logs.</p>
<h2>Permissions &amp; roles</h2>
<div style="text-align:none;"><img src="https://i.ibb.co/vdM5BtG/Microsoft-365-Permissions-and-roles.png" alt="Microsoft 365 Defender Permissions and Roles" style="height: auto;width: auto"/></div>
<p>The permissions and roles tab is where you can add members to roles and create custom roles. Much like the role management in the Azure AD admin center. It's the same roles! So in short, there's no point in looking into permissions &amp; roles here since you can do it all from the Microsoft 365 admin center or the Azure AD admin center.</p>
<h2>Settings</h2>
<div style="text-align:none;"><img src="https://i.ibb.co/kBf0jbb/Microsoft-365-Defender-Settings.png" alt="Microsoft 365 Defender Settings" style="height: auto;width: auto"/></div>
<p>The settings section is where, you guessed it, contains the settings. Depending on what licenses you have is depending on the settings you'll see.</p>
<h2>More resources</h2>
<div style="text-align:none;"><img src="https://i.ibb.co/sP6Q3DQ/Microsoft-365-Defender-More-Resources.png" alt="Microsoft 365 Defender More Resources" style="height: auto;width: auto"/></div>
<p>The more resources tab will link you to the other security admin centers. From Azure AD, Defender for Cloud Apps, to Microsoft Defender for Identity admin centers.</p>
`,
      nextContentSlug: 'Protect-your-email-environment-from-malicious-actors-6HUOr7qbL',
      previousContentSlug: 'Whats-Microsoft-Defender-for-identity-Kye_yNLxA',
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
