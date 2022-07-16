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
      course: {"title":"Training for MS-500: Microsoft Office 365 Security Admin","id":"MS-500","contentOrder":["cpchjBLkC","KKkBOVuS4","bzotoOjEe","cg_vxOX9L","uYCIPbnMC","7CpqFkPZU","rZzausKJ1","ky5W0Lz5P","i9pJIjTNH","S1hQgFOMV","2QfoI2HxY","V1en9Iugh","nAAIvNbtk","2S9jn0aLr","FldNualGC","NFQ6rYFeQ","rK48f6iM2","RHW1API2s","z8EMM9Eu_","Kye_yNLxA","EnPyp7ukN","6HUOr7qbL","GCOOUsSBT","GG4cMY8pK","z0qPG6v4T","LEyZMWBSt","7MQ3wE4wP","sH_Ee1DW1","vLweLmxZf","NsF7No40f","IsPGsme8w","wv2PbXnhI","7gR3L122b","ZyKX3Idjs","MAjW0a2_p","XFXu2zIS9","_LL9VqGZO","qDRA4jjoN","62t_7oiZx"],"description":"Learn, prepare and training for the Microsoft Microsoft Office 365 Exam MS-500: Microsoft 365 Security Administration MS-500 exam","sections":[{"title":"Introduction","id":"qwJW5VrBW","order":0},{"order":1,"title":"Securing identity and access to Microsoft 365","id":"AFV_acckJ"},{"order":2,"title":"Securing Microsoft 365, clouds, and on-premises environments","id":"QScYfSu74"},{"title":"Protecting your environment from accidental and malicious data loss","order":3,"id":"YhftdGIRX"},{"order":4,"id":"l0DxUuonW","title":"Protecting User devices using Intune"}],"audience":"Anyone who wants to learn about securing Microsoft 365"},
      article: {"featuredImage":"https://i.ibb.co/MDMyDQt/Microsoft-Defender.png","article":{"entityMap":{"0":{"type":"IMAGE","data":{"alignment":"none","width":"auto","height":"auto","src":"https://i.ibb.co/MDMyDQt/Microsoft-Defender.png","alt":"Microsoft Defender"},"mutability":"MUTABLE"},"1":{"mutability":"MUTABLE","data":{"alt":"Microsoft Defender for Office 365","width":"auto","src":"https://i.ibb.co/nznXdXd/Microsoft-Defender-for-Office-365.png","alignment":"none","height":"auto"},"type":"IMAGE"},"2":{"data":{"width":"auto","alt":"Microsoft Defender for Endpoint","alignment":"none","height":"auto","src":"https://i.ibb.co/vvDtZ8n/Microsoft-Defender-for-Endpoint.png"},"mutability":"MUTABLE","type":"IMAGE"},"3":{"mutability":"MUTABLE","data":{"src":"https://i.ibb.co/26Vmy9V/Microsoft-Defender-for-Identity.png","alignment":"none","width":"auto","height":"auto","alt":"Microsoft Defender for Identity"},"type":"IMAGE"},"4":{"data":{"height":"auto","alt":"Microsoft Defender for Cloud Apps","width":"auto","alignment":"none","src":"https://i.ibb.co/qDkQcfX/Microsoft-Defender-for-Cloud-Apps.png"},"type":"IMAGE","mutability":"MUTABLE"}},"blocks":[{"inlineStyleRanges":[],"text":"","data":{},"entityRanges":[],"depth":0,"type":"unstyled","key":"8gppo"},{"key":"1venf","text":" ","type":"atomic","entityRanges":[{"length":1,"key":0,"offset":0}],"depth":0,"inlineStyleRanges":[],"data":{}},{"text":"Microsoft 365 Defender is a suite of security technology to detect security risks, investigate attacks, and prevent harmful activities. It includes several security solutions including Microsoft Defender for Endpoint, Microsoft Defender for Office 365, Microsoft Defender for Identity, Microsoft Defender Advanced Threat Protection (Microsoft Defender ATP), and Microsoft Defender for Cloud Apps formally known as Microsoft Cloud App Security. But typically, when someone says \"What's Microsoft 365 Defender?\" they are referring to the Microsoft 365 Defender portal.","type":"unstyled","entityRanges":[],"data":{},"key":"28dm3","depth":0,"inlineStyleRanges":[]},{"entityRanges":[],"data":{},"depth":0,"text":"Microsoft Defender for Office 365","key":"2a0gn","inlineStyleRanges":[],"type":"header-two"},{"key":"c8500","entityRanges":[{"key":1,"length":1,"offset":0}],"type":"atomic","inlineStyleRanges":[],"text":" ","data":{},"depth":0},{"depth":0,"text":"We won't go into all the features you can access for Microsoft Defender for Office 365 because it isn't all covered on the MS-500 test and quite simply, it's a lot. Plus, some of the sections I've broken into different articles. But let's cover some of the basics.","type":"unstyled","key":"ehqsn","entityRanges":[],"data":{},"inlineStyleRanges":[]},{"depth":0,"inlineStyleRanges":[],"data":{},"entityRanges":[],"key":"dptns","type":"header-three","text":"What is Defender for Office 365?"},{"entityRanges":[],"depth":0,"key":"74ncu","inlineStyleRanges":[],"text":"Every Office 365 subscription comes with some security functionality. Depending on your subscriptions is depending on how many additional security capabilities you'll receive. In Defender for Office 365, there are three main packages tied to your subscription type:","data":{},"type":"unstyled"},{"data":{},"inlineStyleRanges":[],"key":"bu7ob","type":"unordered-list-item","text":"Exchange Online Protection (EOP)","depth":0,"entityRanges":[]},{"entityRanges":[],"data":{},"depth":0,"type":"unordered-list-item","key":"199md","text":"Microsoft Defender for Office 365 Plan 1 (Defender for Office P1)","inlineStyleRanges":[]},{"text":"Microsoft Defender for Office 365 Plan 2 (Defender for Office P2)","inlineStyleRanges":[],"depth":0,"data":{},"type":"unordered-list-item","entityRanges":[],"key":"fog2d"},{"inlineStyleRanges":[],"key":"1ubl6","text":"Exchange Online Protection","depth":0,"type":"header-three","entityRanges":[],"data":{}},{"key":"1c16m","text":"Exchange Online Protection is available to every license that has an Exchange Online mailbox license. In short, it's the basic security package you receive with a Microsoft 365 mailbox. It protects against spam, phishing attacks, malware, and bulk mail. It has spoof intelligence, impersonation detection, and quarantine capabilities. You also get access to the Audit logs and message trace.","data":{},"type":"unstyled","inlineStyleRanges":[],"depth":0,"entityRanges":[]},{"entityRanges":[],"depth":0,"inlineStyleRanges":[],"key":"418lc","type":"header-three","data":{},"text":"Defender for Office P1"},{"type":"unstyled","key":"6t9gm","text":"Defender for Office P1 has all the capabilities of Exchange Online Protection plus some more. For example, you'll get access to safe attachments, safe links, Defender for Office 365 protection for SharePoint Online, Teams, and OneDrive for Business. User and domain impersonation protection, alerts, and SIEM integration API for alerts and detections.","entityRanges":[],"data":{},"depth":0,"inlineStyleRanges":[]},{"data":{},"type":"header-three","depth":0,"inlineStyleRanges":[],"entityRanges":[],"key":"22ob3","text":"Defender for Office P2"},{"depth":0,"text":"Defender for Office P2 includes everything that Defender for Office P1 includes (including the Exchange Online Protection) plus more. You'll gain access to the Threat Explorer, Threat Trackers, and Campaign views. You'll also gain access to Automated Investigation and Response (AIR) capabilities.","data":{},"inlineStyleRanges":[],"entityRanges":[],"key":"f6met","type":"unstyled"},{"data":{},"entityRanges":[],"key":"esga0","inlineStyleRanges":[],"text":"What's Microsoft Defender for Endpoint?","depth":0,"type":"header-two"},{"inlineStyleRanges":[],"type":"atomic","key":"a8rrv","data":{},"depth":0,"entityRanges":[{"offset":0,"key":2,"length":1}],"text":" "},{"key":"4t0l4","text":"Formally known as Windows Defender Advanced Threat Protection (ATP) then later known as Microsoft Defender Advanced Threat Protection (ATP). Microsoft Defender for Endpoint is Microsoft's complete endpoint security package. Microsoft Defender for Endpoint offers security for clients, servers, mobile devices, and network devices. Offering attack surface reduction, detection, and response to threats and automated investigation and remediation.","type":"unstyled","depth":0,"data":{},"inlineStyleRanges":[{"length":27,"offset":107,"style":"color-rgb(33,37,41)"},{"style":"bgcolor-rgb(255,255,255)","length":27,"offset":107},{"length":27,"offset":107,"style":"fontsize-16"},{"length":27,"style":"fontfamily-system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", \"Liberation Sans\", sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji","offset":107}],"entityRanges":[]},{"key":"1irbc","entityRanges":[],"text":"Microsoft Defender for Endpoint is available in the following licenses:","depth":0,"type":"unstyled","inlineStyleRanges":[],"data":{}},{"inlineStyleRanges":[],"entityRanges":[],"text":"Microsoft Defender for Endpoint Plan 1 (P1)","depth":0,"type":"unordered-list-item","key":"6p3gk","data":{}},{"inlineStyleRanges":[{"offset":0,"length":43,"style":"color-rgb(33,37,41)"},{"style":"bgcolor-rgb(255,255,255)","length":43,"offset":0},{"style":"fontsize-16","length":43,"offset":0},{"style":"fontfamily-system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", \"Liberation Sans\", sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji","length":43,"offset":0}],"key":"3ctec","text":"Microsoft Defender for Endpoint Plan 2 (P2)","depth":0,"entityRanges":[],"data":{},"type":"unordered-list-item"},{"entityRanges":[],"data":{"margin-left":"1.5em"},"text":"Microsoft Defender for Endpoint P1 is included as part of Microsoft 365 E3/A3 licenses","key":"5p0ui","type":"unordered-list-item","depth":0,"inlineStyleRanges":[{"offset":0,"style":"color-rgb(33,37,41)","length":34},{"offset":0,"style":"bgcolor-rgb(255,255,255)","length":34},{"style":"fontsize-16","length":34,"offset":0},{"length":34,"offset":0,"style":"fontfamily-system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", \"Liberation Sans\", sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji"}]},{"entityRanges":[],"key":"22m8u","text":"Microsoft Defender for Endpoint P2 is available as part of the following plans: Windows 11 Enterprise E5/A5, Windows 10 Enterprise E5/A5, Microsoft 365 E5/A5/G5 (which includes Windows 10 or Windows 11 Enterprise E5), Microsoft 365 E5/A5/G5/F5 Security, Microsoft 365 F5 Security & Compliance","data":{},"type":"unordered-list-item","depth":0,"inlineStyleRanges":[]},{"entityRanges":[],"depth":0,"text":"What's Microsoft Defender for Identity?","key":"tqg1","type":"header-two","data":{},"inlineStyleRanges":[]},{"key":"6m0cp","depth":0,"data":{},"entityRanges":[{"key":3,"length":1,"offset":0}],"type":"atomic","inlineStyleRanges":[],"text":" "},{"data":{},"depth":0,"entityRanges":[],"type":"unstyled","key":"73h3t","inlineStyleRanges":[],"text":"Formally known as Azure Advanced Threat Protection or Azure ATP for short. Microsoft Defender for Identity also replaces Microsoft Advanced Threat Analytics (ATA). Microsoft Defender for Identity is Microsoft 365's solution for your on-premises Active Directory security. It uses a variety of signals to detect advanced threats. It can detect compromised identities, and malicious actions targeting your organization. In short, you install a small piece of software on your Active Directory (AD) servers and then Microsoft will collect a lot of security-related information and show you alerts in the Microsoft 365 portal."},{"text":"Microsoft Defender for Identity is available with the following licenses:","entityRanges":[],"type":"unstyled","depth":0,"data":{},"inlineStyleRanges":[],"key":"2s87f"},{"depth":0,"entityRanges":[],"data":{},"key":"cj3np","inlineStyleRanges":[],"text":"Enterprise Mobility + Security E5/A5 (EMS E5 & EMS A5)","type":"unordered-list-item"},{"key":"etoqg","type":"unordered-list-item","inlineStyleRanges":[],"data":{},"entityRanges":[],"depth":0,"text":"Microsoft 365 E5/A5/G5"},{"inlineStyleRanges":[],"text":"Microsoft 365 E5/A5/G5/F5 Security","depth":0,"entityRanges":[],"key":"3h2rm","data":{},"type":"unordered-list-item"},{"text":"Microsoft F5 Security & Compliance","depth":0,"key":"m3v5","entityRanges":[],"type":"unordered-list-item","data":{},"inlineStyleRanges":[]},{"data":{},"type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"key":"9mmst","text":"Microsoft Defender for Identity (standalone license)","entityRanges":[]},{"type":"header-two","entityRanges":[],"depth":0,"data":{},"text":"What's Microsoft Defender for Cloud Apps?","key":"8ta8u","inlineStyleRanges":[]},{"inlineStyleRanges":[],"data":{},"key":"eshbt","depth":0,"text":" ","entityRanges":[{"key":4,"offset":0,"length":1}],"type":"atomic"},{"key":"7ere8","text":"Formally known as Microsoft Cloud App Security, Microsoft Defender for Cloud Apps is a Cloud Access Security Broker (CASB). In short, it will pull in data from other cloud apps/firewalls so you can see what cloud apps your users are using, how much they are using them, and apply policies to limit their use.","inlineStyleRanges":[{"offset":87,"style":"color-rgb(23,23,23)","length":221},{"style":"bgcolor-rgb(255,255,255)","offset":87,"length":221},{"length":221,"style":"fontsize-16","offset":87},{"style":"fontfamily-Segoe UI\", SegoeUI, \"Helvetica Neue\", Helvetica, Arial, sans-serif","offset":87,"length":221}],"type":"unstyled","entityRanges":[],"data":{},"depth":0},{"inlineStyleRanges":[{"style":"color-rgb(33,37,41)","length":75,"offset":0},{"offset":0,"style":"bgcolor-rgb(255,255,255)","length":75},{"offset":0,"length":75,"style":"fontsize-16"},{"length":75,"style":"fontfamily-system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", \"Liberation Sans\", sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji","offset":0}],"type":"unstyled","data":{},"text":"Microsoft Defender for Cloud Apps is available with the following licenses:","depth":0,"entityRanges":[],"key":"e0k54"},{"inlineStyleRanges":[{"style":"color-rgb(33,37,41)","offset":0,"length":16},{"length":16,"offset":0,"style":"bgcolor-rgb(255,255,255)"},{"length":16,"style":"fontsize-16","offset":0},{"style":"fontfamily-system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", \"Liberation Sans\", sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji","length":16,"offset":0}],"text":"Microsoft 365 E5","data":{},"entityRanges":[],"key":"b8hhe","depth":0,"type":"unordered-list-item"},{"key":"5ei20","type":"unordered-list-item","data":{},"inlineStyleRanges":[],"entityRanges":[],"depth":0,"text":"Microsoft 365 E5 Security"},{"entityRanges":[],"key":"cc99v","inlineStyleRanges":[],"depth":0,"text":"Microsoft 365 E5 Compliance","data":{},"type":"unordered-list-item"},{"type":"unordered-list-item","key":"dq0vg","data":{},"entityRanges":[],"inlineStyleRanges":[],"depth":0,"text":"Enterprise Mobility + Security E5 (EMS E5)"},{"key":"33uvi","text":"Microsoft Cloud App Security (standalone license)","entityRanges":[],"depth":0,"type":"unordered-list-item","inlineStyleRanges":[],"data":{}},{"depth":0,"key":"fka90","type":"unordered-list-item","entityRanges":[],"inlineStyleRanges":[],"data":{},"text":"Microsoft 365 Education A3/A5"},{"text":"Office 365 E5","inlineStyleRanges":[],"entityRanges":[],"type":"unordered-list-item","depth":0,"data":{},"key":"4erls"},{"depth":0,"inlineStyleRanges":[],"type":"unstyled","key":"4lsen","text":"","data":{},"entityRanges":[]}]},"slug":"Whats-Microsoft-365-Defender-z8EMM9Eu_","type":"article","publish":true,"title":"What's Microsoft 365 Defender?","sectionId":"QScYfSu74","datePublished":"2022/5/26","id":"z8EMM9Eu_","description":"Microsoft 365 Defender is a suite of security technology to detect security risks, investigate attacks, and prevent harmful activities.","images":["https://i.ibb.co/0mYRcpQ/incidents.png","https://i.ibb.co/YQkzpMx/microsoft-secure-score.png","https://i.ibb.co/SRGRqjL/secure-score.png","https://i.ibb.co/W2Rkc3c/view-resolution-information.png","https://i.ibb.co/MDMyDQt/Microsoft-Defender.png","https://i.ibb.co/nznXdXd/Microsoft-Defender-for-Office-365.png","https://i.ibb.co/vvDtZ8n/Microsoft-Defender-for-Endpoint.png","https://i.ibb.co/26Vmy9V/Microsoft-Defender-for-Identity.png","https://i.ibb.co/qDkQcfX/Microsoft-Defender-for-Cloud-Apps.png","https://i.ibb.co/qDkQcfX/Microsoft-Defender-for-Cloud-Apps.png"]},
      articles: [{"id":"cpchjBLkC","sectionId":"qwJW5VrBW","slug":"Whats-in-this-course-cpchjBLkC","title":"What's in this course?","featuredImage":"https://i.ibb.co/zFs9Vfb/microsoft365-security-administrator-associate-600x600.png"},{"id":"KKkBOVuS4","sectionId":"qwJW5VrBW","slug":"Creating-a-free-Microsoft-365-tenant-for-practice-KKkBOVuS4","title":"Creating a free Microsoft 365 tenant for practice","featuredImage":"https://i.ibb.co/F07sjQJ/microsoft-365-e5-trial.png"},{"id":"bzotoOjEe","sectionId":"qwJW5VrBW","slug":"Managing-the-Microsoft-365-tenant-Introduction-to-the-admin-centers-bzotoOjEe","title":"Managing the Microsoft 365 tenant - Introduction to the admin centers","featuredImage":"https://i.ibb.co/f1cr4zt/Microsoft-365-admin-centers.png"},{"id":"cg_vxOX9L","sectionId":"qwJW5VrBW","slug":"Managing-Microsoft-365-through-PowerShell-cg_vxOX9L","title":"Managing Microsoft 365 through PowerShell","featuredImage":"https://i.ibb.co/HV13YF6/install-microsoft-365-powershell-modules.png"},{"id":"uYCIPbnMC","sectionId":"AFV_acckJ","slug":"How-to-create-users-in-Microsoft-365-Cloud-Only-uYCIPbnMC","title":"How to create users in Microsoft 365 Cloud Only","featuredImage":"https://i.ibb.co/Wnt5Q43/View-Microsoft-365-Users.png"},{"id":"7CpqFkPZU","sectionId":"AFV_acckJ","slug":"Creating-and-managing-admins-through-roles-7CpqFkPZU","title":"Creating and managing admins through roles","featuredImage":"https://i.ibb.co/kySL4HQ/Roles-and-administrators.png"},{"id":"rZzausKJ1","sectionId":"AFV_acckJ","slug":"Time-limited-admin-roles-in-Microsoft-365-rZzausKJ1","title":"Time limited admin roles in Microsoft 365","featuredImage":"https://i.ibb.co/nDvjyPD/select-member-to-add-to-PIM-role.png"},{"id":"ky5W0Lz5P","sectionId":"AFV_acckJ","slug":"Whats-AD-Connect-ky5W0Lz5P","title":"What's AD Connect","featuredImage":"https://i.ibb.co/7nDqr9x/Whats-AD-Connect.png"},{"id":"i9pJIjTNH","sectionId":"AFV_acckJ","slug":"Protecting-Passwords-in-Microsoft-365-i9pJIjTNH","title":"Protecting Passwords in Microsoft 365","featuredImage":"https://i.ibb.co/DLD4G4q/access-smart-lockout-settings.png"},{"id":"S1hQgFOMV","sectionId":"AFV_acckJ","slug":"Creating-and-managing-users-through-groups-S1hQgFOMV","title":"Creating and managing users through groups","featuredImage":"https://i.ibb.co/nmmC28M/add-a-group-microsoft-365.png"},{"id":"2QfoI2HxY","sectionId":"AFV_acckJ","slug":"Securing-and-implementing-enterprise-applications-2QfoI2HxY","title":"Securing and implementing enterprise applications","featuredImage":"https://i.ibb.co/C2mp69m/disable-user-consent.png"},{"id":"V1en9Iugh","sectionId":"AFV_acckJ","slug":"Whats-a-conditional-access-policy-V1en9Iugh","title":"What's a conditional access policy?","featuredImage":"https://i.ibb.co/DQm1sY0/Create-conditional-access-policy.png"},{"id":"nAAIvNbtk","sectionId":"AFV_acckJ","slug":"The-many-ways-to-implement-multi-factor-authentication-MFA-in-Microsoft-365-nAAIvNbtk","title":"The many ways to implement multi-factor authentication (MFA) in Microsoft 365","featuredImage":"https://i.ibb.co/P1P0wNY/microsoft-365-manage-security-defaults.png"},{"id":"2S9jn0aLr","sectionId":"AFV_acckJ","slug":"Implement-Self-service-password-reset-in-Microsoft-365-2S9jn0aLr","title":"Implement Self-service password reset in Microsoft 365","featuredImage":"https://i.ibb.co/58y9JVg/write-back-passwords-to-on-premises-directory.png"},{"id":"FldNualGC","sectionId":"AFV_acckJ","slug":"Locking-down-your-Microsoft-365-tenant-from-Microsoft-engineers-FldNualGC","title":"Locking down your Microsoft 365 tenant from Microsoft engineers","featuredImage":"https://i.ibb.co/DCmpnT9/Enable-Customer-Lockbox.png"},{"id":"NFQ6rYFeQ","sectionId":"AFV_acckJ","slug":"Implementing-intelligent-security-using-risk-policies-in-Microsoft-365-NFQ6rYFeQ","title":"Implementing intelligent security using risk policies in Microsoft 365","featuredImage":"https://i.ibb.co/0cyQJ7j/Risk-Detections.png"},{"id":"rK48f6iM2","sectionId":"AFV_acckJ","slug":"Automating-Access-Review-in-Microsoft-365-rK48f6iM2","title":"Automating Access Review in Microsoft 365","featuredImage":"https://i.ibb.co/Xsxvz6Z/new-access-review.png"},{"id":"RHW1API2s","sectionId":"AFV_acckJ","slug":"Just-in-time-approval-and-notification-for-admin-roles-in-Microsoft-365-RHW1API2s","title":"Just in time, approval and notification for admin roles in Microsoft 365","featuredImage":"https://i.ibb.co/dcb6XFN/Activate-a-Role.png"},{"id":"z8EMM9Eu_","sectionId":"QScYfSu74","slug":"Whats-Microsoft-365-Defender-z8EMM9Eu_","title":"What's Microsoft 365 Defender?","featuredImage":"https://i.ibb.co/MDMyDQt/Microsoft-Defender.png"},{"id":"Kye_yNLxA","sectionId":"QScYfSu74","slug":"Whats-Microsoft-Defender-for-identity-Kye_yNLxA","title":"What's Microsoft Defender for identity?","featuredImage":"https://i.ibb.co/bQDBh0Y/Defender-for-Identity-Timeline.png"},{"id":"EnPyp7ukN","sectionId":"QScYfSu74","slug":"Whats-Microsoft-Defender-for-Office-365-EnPyp7ukN","title":"What's Microsoft Defender for Office 365?","featuredImage":"https://i.ibb.co/WcwKY2G/Microsoft-365-incidents-and-alerts.png"},{"id":"6HUOr7qbL","sectionId":"QScYfSu74","slug":"Protect-your-email-environment-from-malicious-actors-6HUOr7qbL","title":"Protect your email and Office environment from malicious actors","featuredImage":"https://i.ibb.co/Df0KQVp/Reports.png"},{"id":"GCOOUsSBT","sectionId":"QScYfSu74","slug":"Protecting-email-against-phishing-attacks-GCOOUsSBT","title":"Protecting email against phishing attacks","featuredImage":"https://i.ibb.co/GCjZHWg/edit-actions.png"},{"id":"GG4cMY8pK","sectionId":"QScYfSu74","slug":"Simulating-attacks-with-Microsoft-365-GG4cMY8pK","title":"Simulating attacks with Microsoft 365","featuredImage":"https://i.ibb.co/NyvnbMK/simulation-overview-view-users-circled.png"},{"id":"z0qPG6v4T","sectionId":"QScYfSu74","slug":"Protecting-Windows-10-and-other-devices-with-Microsoft-Defender-for-Endpoint-z0qPG6v4T","title":"Protecting Windows 10 and other devices with Microsoft Defender for Endpoint","featuredImage":"https://i.ibb.co/T47Xhyh/enable-endpoint-connections.png"},{"id":"LEyZMWBSt","sectionId":"QScYfSu74","slug":"Collect-detect-investigate-and-respond-to-security-threats-using-Microsoft-Sentinel-LEyZMWBSt","title":"Collect, detect, investigate, and respond to security threats using Microsoft Sentinel","featuredImage":"https://i.ibb.co/qN9XsKj/Add-Workbook.png"},{"id":"7MQ3wE4wP","sectionId":"QScYfSu74","slug":"Implement-and-manage-Microsoft-Defender-for-Cloud-Apps-7MQ3wE4wP","title":"Implement and manage Microsoft Defender for Cloud Apps","featuredImage":"https://i.ibb.co/7g7LvFg/office-365-cloud-apps-settings.png"},{"id":"sH_Ee1DW1","sectionId":"QScYfSu74","slug":"Auditing-sign-ins-and-other-actions-in-Microsoft-365-sH_Ee1DW1","title":"Auditing sign-ins and other actions in Microsoft 365","featuredImage":"https://i.ibb.co/BqMw3jZ/Start-recording-user-and-admin-activity.png"},{"id":"vLweLmxZf","sectionId":"YhftdGIRX","slug":"How-to-classify-data-using-labels-in-Microsoft-365-vLweLmxZf","title":"How to classify data using labels in Microsoft 365","featuredImage":"https://i.ibb.co/k9nhWS5/Choose-protection-settings-for-files-and-emails.png"},{"id":"NsF7No40f","sectionId":"YhftdGIRX","slug":"Creating-and-managing-data-retention-to-conform-to-compliance-NsF7No40f","title":"Creating and managing data retention to conform to compliance","featuredImage":"https://i.ibb.co/yqC0ZdY/New-Retention-Policy.png"},{"id":"IsPGsme8w","sectionId":"YhftdGIRX","slug":"Preventing-accidental-and-malicious-data-loss-with-DLP-policies-IsPGsme8w","title":"Preventing accidental and malicious data loss with DLP policies","featuredImage":"https://i.ibb.co/n8WcqKM/Create-a-DLP-policy.png"},{"id":"wv2PbXnhI","sectionId":"YhftdGIRX","slug":"Everything-you-need-to-know-about-securing-SharePoint-Online-for-the-MS-500-wv2PbXnhI","title":"Everything you need to know about securing SharePoint Online for the MS-500","featuredImage":"https://i.ibb.co/Gk9NjSH/Share-Point-Online-Warning.png"},{"id":"7gR3L122b","sectionId":"l0DxUuonW","slug":"Introduction-to-Intune-7gR3L122b","title":"Introduction to Intune","featuredImage":"https://i.ibb.co/Fq3N8BX/Endpoint-Manager-Admin-Center.png"},{"id":"ZyKX3Idjs","sectionId":"l0DxUuonW","slug":"Setting-up-Android-Devices-ZyKX3Idjs","title":"Setting up Android Devices","featuredImage":"https://i.ibb.co/m0BYhL2/Connect-Intune-to-Google-Play.png"},{"id":"MAjW0a2_p","sectionId":"l0DxUuonW","slug":"Setting-up-Apple--iOS-devices-in-Intune-MAjW0a2_p","title":"Setting up Apple / iOS devices in Intune","featuredImage":"https://i.ibb.co/X7Ffb2B/Setup-Apple-Enrollment-in-Intune.png"},{"id":"XFXu2zIS9","sectionId":"l0DxUuonW","slug":"Setting-up-Windows-10-devices-in-Intune-XFXu2zIS9","title":"Setting up Windows 10 devices in Intune","featuredImage":"https://i.ibb.co/WDXKVjW/configure-device-options.png"},{"id":"_LL9VqGZO","sectionId":"l0DxUuonW","slug":"How-to-manage-devices-using-Intune-_LL9VqGZO","title":"How to manage devices using Intune","featuredImage":"https://i.ibb.co/HPQ2m8t/Create-an-endpoint-protection-profile.png"},{"id":"qDRA4jjoN","sectionId":"l0DxUuonW","slug":"Understanding-compliance-policies-qDRA4jjoN","title":"Understanding compliance policies","featuredImage":"https://i.ibb.co/N3Qk57v/Create-a-compliance-policy.png"},{"id":"62t_7oiZx","sectionId":"l0DxUuonW","slug":"Restricting-and-managing-apps-on-user-devices-62t_7oiZx","title":"Restricting and managing apps on user devices","featuredImage":"https://i.ibb.co/PCVRKDf/Add-an-Android-app-to-Intune.png"}],
      articleHtml: `<p></p>
<div style="text-align:none;"><img src="https://i.ibb.co/MDMyDQt/Microsoft-Defender.png" alt="Microsoft Defender" style="height: auto;width: auto"/></div>
<p>Microsoft 365 Defender is a suite of security technology to detect security risks, investigate attacks, and prevent harmful activities. It includes several security solutions including Microsoft Defender for Endpoint, Microsoft Defender for Office 365, Microsoft Defender for Identity, Microsoft Defender Advanced Threat Protection (Microsoft Defender ATP), and Microsoft Defender for Cloud Apps formally known as Microsoft Cloud App Security. But typically, when someone says "What's Microsoft 365 Defender?" they are referring to the Microsoft 365 Defender portal.</p>
<h2>Microsoft Defender for Office 365</h2>
<div style="text-align:none;"><img src="https://i.ibb.co/nznXdXd/Microsoft-Defender-for-Office-365.png" alt="Microsoft Defender for Office 365" style="height: auto;width: auto"/></div>
<p>We won't go into all the features you can access for Microsoft Defender for Office 365 because it isn't all covered on the MS-500 test and quite simply, it's a lot. Plus, some of the sections I've broken into different articles. But let's cover some of the basics.</p>
<h3>What is Defender for Office 365?</h3>
<p>Every Office 365 subscription comes with some security functionality. Depending on your subscriptions is depending on how many additional security capabilities you'll receive. In Defender for Office 365, there are three main packages tied to your subscription type:</p>
<ul>
<li>Exchange Online Protection (EOP)</li>
<li>Microsoft Defender for Office 365 Plan 1 (Defender for Office P1)</li>
<li>Microsoft Defender for Office 365 Plan 2 (Defender for Office P2)</li>
</ul>
<h3>Exchange Online Protection</h3>
<p>Exchange Online Protection is available to every license that has an Exchange Online mailbox license. In short, it's the basic security package you receive with a Microsoft 365 mailbox. It protects against spam, phishing attacks, malware, and bulk mail. It has spoof intelligence, impersonation detection, and quarantine capabilities. You also get access to the Audit logs and message trace.</p>
<h3>Defender for Office P1</h3>
<p>Defender for Office P1 has all the capabilities of Exchange Online Protection plus some more. For example, you'll get access to safe attachments, safe links, Defender for Office 365 protection for SharePoint Online, Teams, and OneDrive for Business. User and domain impersonation protection, alerts, and SIEM integration API for alerts and detections.</p>
<h3>Defender for Office P2</h3>
<p>Defender for Office P2 includes everything that Defender for Office P1 includes (including the Exchange Online Protection) plus more. You'll gain access to the Threat Explorer, Threat Trackers, and Campaign views. You'll also gain access to Automated Investigation and Response (AIR) capabilities.</p>
<h2>What's Microsoft Defender for Endpoint?</h2>
<div style="text-align:none;"><img src="https://i.ibb.co/vvDtZ8n/Microsoft-Defender-for-Endpoint.png" alt="Microsoft Defender for Endpoint" style="height: auto;width: auto"/></div>
<p>Formally known as Windows Defender Advanced Threat Protection (ATP) then later known as Microsoft Defender <span style="color: rgb(33,37,41);background-color: rgb(255,255,255);font-size: 16px;font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;">Advanced Threat Protection </span>(ATP). Microsoft Defender for Endpoint is Microsoft's complete endpoint security package. Microsoft Defender for Endpoint offers security for clients, servers, mobile devices, and network devices. Offering attack surface reduction, detection, and response to threats and automated investigation and remediation.</p>
<p>Microsoft Defender for Endpoint is available in the following licenses:</p>
<ul>
<li>Microsoft Defender for Endpoint Plan 1 (P1)</li>
<li><span style="color: rgb(33,37,41);background-color: rgb(255,255,255);font-size: 16px;font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;">Microsoft Defender for Endpoint Plan 2 (P2)</span></li>
<li style="margin-left:1.5em;"><span style="color: rgb(33,37,41);background-color: rgb(255,255,255);font-size: 16px;font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;">Microsoft Defender for Endpoint P1</span> is included as part of Microsoft 365 E3/A3 licenses</li>
<li>Microsoft Defender for Endpoint P2 is available as part of the following plans: Windows 11 Enterprise E5/A5, Windows 10 Enterprise E5/A5, Microsoft 365 E5/A5/G5 (which includes Windows 10 or Windows 11 Enterprise E5), Microsoft 365 E5/A5/G5/F5 Security, Microsoft 365 F5 Security &amp; Compliance</li>
</ul>
<h2>What's Microsoft Defender for Identity?</h2>
<div style="text-align:none;"><img src="https://i.ibb.co/26Vmy9V/Microsoft-Defender-for-Identity.png" alt="Microsoft Defender for Identity" style="height: auto;width: auto"/></div>
<p>Formally known as Azure Advanced Threat Protection or Azure ATP for short. Microsoft Defender for Identity also replaces Microsoft Advanced Threat Analytics (ATA). Microsoft Defender for Identity is Microsoft 365's solution for your on-premises Active Directory security. It uses a variety of signals to detect advanced threats. It can detect compromised identities, and malicious actions targeting your organization. In short, you install a small piece of software on your Active Directory (AD) servers and then Microsoft will collect a lot of security-related information and show you alerts in the Microsoft 365 portal.</p>
<p>Microsoft Defender for Identity is available with the following licenses:</p>
<ul>
<li>Enterprise Mobility + Security E5/A5 (EMS E5 &amp; EMS A5)</li>
<li>Microsoft 365 E5/A5/G5</li>
<li>Microsoft 365 E5/A5/G5/F5 Security</li>
<li>Microsoft F5 Security &amp; Compliance</li>
<li>Microsoft Defender for Identity (standalone license)</li>
</ul>
<h2>What's Microsoft Defender for Cloud Apps?</h2>
<div style="text-align:none;"><img src="https://i.ibb.co/qDkQcfX/Microsoft-Defender-for-Cloud-Apps.png" alt="Microsoft Defender for Cloud Apps" style="height: auto;width: auto"/></div>
<p>Formally known as Microsoft Cloud App Security, Microsoft Defender for Cloud Apps is a <span style="color: rgb(23,23,23);background-color: rgb(255,255,255);font-size: 16px;font-family: Segoe UI", SegoeUI, "Helvetica Neue", Helvetica, Arial, sans-serif;">Cloud Access Security Broker (CASB). In short, it will pull in data from other cloud apps/firewalls so you can see what cloud apps your users are using, how much they are using them, and apply policies to limit their use.</span></p>
<p><span style="color: rgb(33,37,41);background-color: rgb(255,255,255);font-size: 16px;font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;">Microsoft Defender for Cloud Apps is available with the following licenses:</span></p>
<ul>
<li><span style="color: rgb(33,37,41);background-color: rgb(255,255,255);font-size: 16px;font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;">Microsoft 365 E5</span></li>
<li>Microsoft 365 E5 Security</li>
<li>Microsoft 365 E5 Compliance</li>
<li>Enterprise Mobility + Security E5 (EMS E5)</li>
<li>Microsoft Cloud App Security (standalone license)</li>
<li>Microsoft 365 Education A3/A5</li>
<li>Office 365 E5</li>
</ul>
<p></p>
`,
      nextContentSlug: 'Whats-Microsoft-Defender-for-identity-Kye_yNLxA',
      previousContentSlug: 'Just-in-time-approval-and-notification-for-admin-roles-in-Microsoft-365-RHW1API2s',
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
