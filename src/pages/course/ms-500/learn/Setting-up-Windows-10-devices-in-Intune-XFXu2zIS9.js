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
      course: {"contentOrder":["cpchjBLkC","KKkBOVuS4","bzotoOjEe","cg_vxOX9L","uYCIPbnMC","7CpqFkPZU","rZzausKJ1","ky5W0Lz5P","i9pJIjTNH","S1hQgFOMV","2QfoI2HxY","V1en9Iugh","nAAIvNbtk","2S9jn0aLr","FldNualGC","NFQ6rYFeQ","rK48f6iM2","RHW1API2s","z8EMM9Eu_","Kye_yNLxA","EnPyp7ukN","6HUOr7qbL","GCOOUsSBT","GG4cMY8pK","z0qPG6v4T","LEyZMWBSt","7MQ3wE4wP","sH_Ee1DW1","vLweLmxZf","NsF7No40f","IsPGsme8w","wv2PbXnhI","7gR3L122b","ZyKX3Idjs","MAjW0a2_p","XFXu2zIS9","_LL9VqGZO","qDRA4jjoN","62t_7oiZx"],"audience":"Anyone who wants to learn about securing Microsoft 365","description":"Learn, prepare and training for the Microsoft Microsoft Office 365 Exam MS-500: Microsoft 365 Security Administration MS-500 exam","title":"Training for MS-500: Microsoft Office 365 Security Admin","sections":[{"id":"qwJW5VrBW","title":"Introduction","order":0},{"order":1,"id":"AFV_acckJ","title":"Securing identity and access to Microsoft 365"},{"title":"Securing Microsoft 365, clouds, and on-premises environments","order":2,"id":"QScYfSu74"},{"title":"Protecting your environment from accidental and malicious data loss","id":"YhftdGIRX","order":3},{"title":"Protecting User devices using Intune","order":4,"id":"l0DxUuonW"}],"id":"MS-500"},
      article: {"datePublished":"2022/6/20","title":"Setting up Windows 10 devices in Intune","images":["https://i.ibb.co/1XbTJ8n/Auto-enroll-Windows-in-Intune.png","https://i.ibb.co/gjXKgrp/Open-Settings-on-Windows-computer.png","https://i.ibb.co/fqpJV7z/accounts-button.png","https://i.ibb.co/3vL0pvV/Connect-Windows-10-to-Azure-AD.png","https://i.ibb.co/WDXKVjW/configure-device-options.png","https://i.ibb.co/C0B6mNX/enter-your-global-admin-credentials.png","https://i.ibb.co/1r2tRWm/Windows-10-or-later-domain-joined-devices.png","https://i.ibb.co/x7QWR3b/SCP-Configuration.png"],"type":"article","description":"Manually and automatically syncing Windows devices to Intune","article":{"entityMap":{"0":{"type":"IMAGE","data":{"alt":"Auto-enroll Windows devices in Intune","alignment":"none","height":"auto","width":"auto","src":"https://i.ibb.co/1XbTJ8n/Auto-enroll-Windows-in-Intune.png"},"mutability":"MUTABLE"},"1":{"data":{"src":"https://i.ibb.co/gjXKgrp/Open-Settings-on-Windows-computer.png","alt":"How to open settings on a Windows computer","width":"auto","alignment":"none","height":"auto"},"type":"IMAGE","mutability":"MUTABLE"},"2":{"mutability":"MUTABLE","data":{"width":"auto","alignment":"none","height":"auto","src":"https://i.ibb.co/fqpJV7z/accounts-button.png","alt":"Accounts"},"type":"IMAGE"},"3":{"data":{"alignment":"none","width":"auto","alt":"Connect your Windows 10 device to Intune","src":"https://i.ibb.co/3vL0pvV/Connect-Windows-10-to-Azure-AD.png","height":"auto"},"mutability":"MUTABLE","type":"IMAGE"},"4":{"mutability":"MUTABLE","data":{"alt":"Configure device options","height":"auto","width":"auto","src":"https://i.ibb.co/WDXKVjW/configure-device-options.png","alignment":"none"},"type":"IMAGE"},"5":{"mutability":"MUTABLE","data":{"height":"auto","alt":"Enter your global admin credentials","alignment":"none","width":"auto","src":"https://i.ibb.co/C0B6mNX/enter-your-global-admin-credentials.png"},"type":"IMAGE"},"6":{"mutability":"MUTABLE","type":"IMAGE","data":{"src":"https://i.ibb.co/1r2tRWm/Windows-10-or-later-domain-joined-devices.png","height":"auto","width":"auto","alt":"Windows 10 or later domain-joined devices","alignment":"none"}},"7":{"mutability":"MUTABLE","type":"IMAGE","data":{"width":"auto","alignment":"none","alt":"SCP Configuration","src":"https://i.ibb.co/x7QWR3b/SCP-Configuration.png","height":"auto"}}},"blocks":[{"depth":0,"type":"unstyled","text":"You will see questions about Microsoft Intune, configuration profiles, and compliance policies. You won't see any questions about how to set up a device in Intune but I thought it was important for you to see so I've created a lesson. If you already set up Intune to work with Windows devices or are only concerned about passing the MS-500 feel free to skip this lesson.","entityRanges":[],"inlineStyleRanges":[],"data":{},"key":"epena"},{"inlineStyleRanges":[],"depth":0,"text":"There are three common ways to join a Windows computer to Intune.","data":{},"entityRanges":[],"key":"1sr0d","type":"unstyled"},{"depth":0,"inlineStyleRanges":[],"data":{},"entityRanges":[],"key":"45lc1","text":"First, manually. In short, you tell the Windows computer to join.","type":"unordered-list-item"},{"depth":0,"text":"Second, automatically through the domain. In short, we can sync all the domain-joined devices to Azure AD and then tell Azure AD to join all the computers to Intune.","inlineStyleRanges":[],"type":"unordered-list-item","entityRanges":[],"key":"42aoi","data":{}},{"depth":0,"inlineStyleRanges":[],"type":"unordered-list-item","text":"Third, by using AutoPilot. We won't be reviewing Autopilot in this lesson.","data":{},"entityRanges":[],"key":"9vtgv"},{"depth":0,"type":"unstyled","inlineStyleRanges":[],"data":{},"key":"72ukh","text":"Before we can do anything, there's a bit of configuration to do on the back end. We'll need to configure a user scope. The user scope will tell which Azure AD joined computers should receive Intune.","entityRanges":[]},{"depth":0,"data":{},"inlineStyleRanges":[],"type":"header-two","key":"63lan","text":"How to configure auto-enrollment","entityRanges":[]},{"text":"1. Go to Microsoft Endpoint Manager admin center > Devices > Enroll devices > Windows enrollment > Automatic Enrollment. Set the MDM user scope to All. Click Save.","key":"8rlb1","data":{},"inlineStyleRanges":[{"offset":9,"style":"BOLD","length":39},{"style":"BOLD","length":8,"offset":51},{"length":14,"style":"BOLD","offset":61},{"offset":78,"style":"BOLD","length":18},{"length":20,"offset":99,"style":"BOLD"},{"style":"BOLD","length":14,"offset":129},{"length":3,"offset":147,"style":"BOLD"},{"style":"BOLD","length":4,"offset":158}],"type":"unstyled","entityRanges":[],"depth":0},{"text":" ","depth":0,"data":{},"inlineStyleRanges":[],"entityRanges":[{"offset":0,"key":0,"length":1}],"type":"atomic","key":"ctd68"},{"entityRanges":[],"data":{},"text":"How to manually join a Windows computer to Intune","type":"header-two","key":"bter2","depth":0,"inlineStyleRanges":[]},{"type":"unstyled","key":"603eu","depth":0,"inlineStyleRanges":[],"text":"First things first. Let's manually join a Windows computer to Azure AD and then let Azure AD automatically join the computer to Intune.","entityRanges":[],"data":{}},{"data":{},"text":"1. On the Windows device you want to join click Start menu > Settings.","depth":0,"type":"unstyled","entityRanges":[],"inlineStyleRanges":[],"key":"fnusv"},{"entityRanges":[{"length":1,"key":1,"offset":0}],"depth":0,"inlineStyleRanges":[],"text":" ","key":"385si","type":"atomic","data":{}},{"entityRanges":[],"depth":0,"inlineStyleRanges":[],"type":"unstyled","data":{},"text":"2. Click Accounts.","key":"5ha9b"},{"entityRanges":[{"length":1,"offset":0,"key":2}],"depth":0,"text":" ","type":"atomic","key":"f01tl","inlineStyleRanges":[],"data":{}},{"data":{},"inlineStyleRanges":[{"style":"BOLD","offset":9,"length":21},{"length":7,"style":"BOLD","offset":33},{"style":"BOLD","offset":53,"length":35},{"style":"BOLD","offset":103,"length":10}],"depth":0,"entityRanges":[],"key":"bgqk0","text":"3. Click Access work or school > Connect. Enter your Microsoft 365 username and password. Complete the MFA prompt if required.","type":"unstyled"},{"entityRanges":[{"length":1,"key":3,"offset":0}],"inlineStyleRanges":[],"type":"atomic","key":"9olt7","text":" ","depth":0,"data":{}},{"text":"That's it! Simply wait 15 minutes or so and you'll see the device in the Endpoint Manager admin center.","inlineStyleRanges":[],"data":{},"depth":0,"type":"unstyled","entityRanges":[],"key":"creto"},{"inlineStyleRanges":[],"entityRanges":[],"depth":0,"text":"How to sync all your computers from the domain to Intune","data":{},"key":"d8isf","type":"header-two"},{"depth":0,"data":{},"key":"d36q0","text":"Since we have auto-enrollment configured in Intune any devices that show up in Azure AD will automatically be enrolled in Intune. So how about we sync all of our domain-joined computers to Azure AD?","type":"unstyled","inlineStyleRanges":[],"entityRanges":[]},{"key":"7g2ca","type":"unstyled","entityRanges":[],"inlineStyleRanges":[],"depth":0,"text":"1. Log on to the server that is running AD Connect.","data":{}},{"depth":0,"inlineStyleRanges":[],"text":"2. Run the Azure AD Connect wizard. (typically it's an icon on the desktop but its default location is \"C:\\Program Files\\Microsoft Azure Active Directory Connect\\AzureADConnect.exe\"","entityRanges":[],"data":{},"key":"46bjp","type":"unstyled"},{"entityRanges":[],"text":"3. Click Configure.","depth":0,"inlineStyleRanges":[{"style":"BOLD","offset":9,"length":9}],"type":"unstyled","key":"6t84v","data":{}},{"inlineStyleRanges":[{"length":24,"style":"BOLD","offset":9},{"length":4,"style":"BOLD","offset":36}],"text":"4. Click Configure device options > Next.","key":"6td21","data":{},"entityRanges":[],"type":"unstyled","depth":0},{"text":" ","key":"6htsq","entityRanges":[{"offset":0,"key":4,"length":1}],"depth":0,"data":{},"inlineStyleRanges":[],"type":"atomic"},{"key":"71l4o","depth":0,"inlineStyleRanges":[{"offset":9,"style":"BOLD","length":5},{"offset":54,"style":"BOLD","length":9},{"length":8,"offset":67,"style":"BOLD"},{"style":"BOLD","length":4,"offset":83}],"type":"unstyled","data":{},"text":"5. Click Next > Enter your Microsoft 365 global admin username and password. Click Next.","entityRanges":[]},{"data":{},"entityRanges":[{"length":1,"offset":0,"key":5}],"inlineStyleRanges":[],"key":"5pcv8","text":" ","type":"atomic","depth":0},{"type":"unstyled","data":{},"inlineStyleRanges":[{"style":"BOLD","offset":10,"length":30},{"offset":59,"style":"BOLD","length":4},{"offset":75,"style":"BOLD","length":41},{"style":"BOLD","length":4,"offset":133}],"key":"19c6t","entityRanges":[],"depth":0,"text":"6. Verify Configure Hybrid Azure AD join is checked. Click Next. Check the Windows 10 or later domain-joined devices checkbox. Click Next."},{"text":" ","depth":0,"key":"7tfd9","entityRanges":[{"offset":0,"key":6,"length":1}],"data":{},"type":"atomic","inlineStyleRanges":[]},{"key":"d8jse","text":"7. Check the box next to your forest. Set the Authentication Service to Azure Active Directory. Click Add. Enter your on-premises Enterprise admin credentials. Click OK. Click Next.","entityRanges":[],"data":{},"depth":0,"type":"unstyled","inlineStyleRanges":[{"offset":17,"length":19,"style":"BOLD"},{"offset":46,"style":"BOLD","length":22},{"length":22,"style":"BOLD","offset":72},{"offset":102,"length":3,"style":"BOLD"},{"style":"BOLD","offset":118,"length":40},{"offset":166,"length":2,"style":"BOLD"},{"style":"BOLD","length":4,"offset":176}]},{"type":"atomic","key":"pbph","inlineStyleRanges":[],"data":{},"entityRanges":[{"key":7,"length":1,"offset":0}],"text":" ","depth":0},{"text":"8. Click Configure. Click Exit.","inlineStyleRanges":[{"style":"BOLD","offset":9,"length":9},{"style":"BOLD","offset":26,"length":4}],"key":"eh8nt","data":{},"depth":0,"type":"unstyled","entityRanges":[]},{"key":"9jjc6","data":{},"entityRanges":[],"text":"That should be it. During the next sync, you should see all the devices sync from your on-premises AD to Azure AD.","depth":0,"type":"unstyled","inlineStyleRanges":[]}]},"slug":"Setting-up-Windows-10-devices-in-Intune-XFXu2zIS9","publish":true,"featuredImage":"https://i.ibb.co/WDXKVjW/configure-device-options.png","id":"XFXu2zIS9","sectionId":"l0DxUuonW"},
      articles: [{"id":"cpchjBLkC","sectionId":"qwJW5VrBW","slug":"Whats-in-this-course-cpchjBLkC","title":"What's in this course?","featuredImage":"https://i.ibb.co/zFs9Vfb/microsoft365-security-administrator-associate-600x600.png"},{"id":"KKkBOVuS4","sectionId":"qwJW5VrBW","slug":"Creating-a-free-Microsoft-365-tenant-for-practice-KKkBOVuS4","title":"Creating a free Microsoft 365 tenant for practice","featuredImage":"https://i.ibb.co/F07sjQJ/microsoft-365-e5-trial.png"},{"id":"bzotoOjEe","sectionId":"qwJW5VrBW","slug":"Managing-the-Microsoft-365-tenant-Introduction-to-the-admin-centers-bzotoOjEe","title":"Managing the Microsoft 365 tenant - Introduction to the admin centers","featuredImage":"https://i.ibb.co/f1cr4zt/Microsoft-365-admin-centers.png"},{"id":"cg_vxOX9L","sectionId":"qwJW5VrBW","slug":"Managing-Microsoft-365-through-PowerShell-cg_vxOX9L","title":"Managing Microsoft 365 through PowerShell","featuredImage":"https://i.ibb.co/HV13YF6/install-microsoft-365-powershell-modules.png"},{"id":"uYCIPbnMC","sectionId":"AFV_acckJ","slug":"How-to-create-users-in-Microsoft-365-Cloud-Only-uYCIPbnMC","title":"How to create users in Microsoft 365 Cloud Only","featuredImage":"https://i.ibb.co/Wnt5Q43/View-Microsoft-365-Users.png"},{"id":"7CpqFkPZU","sectionId":"AFV_acckJ","slug":"Creating-and-managing-admins-through-roles-7CpqFkPZU","title":"Creating and managing admins through roles","featuredImage":"https://i.ibb.co/kySL4HQ/Roles-and-administrators.png"},{"id":"rZzausKJ1","sectionId":"AFV_acckJ","slug":"Time-limited-admin-roles-in-Microsoft-365-rZzausKJ1","title":"Time limited admin roles in Microsoft 365","featuredImage":"https://i.ibb.co/nDvjyPD/select-member-to-add-to-PIM-role.png"},{"id":"ky5W0Lz5P","sectionId":"AFV_acckJ","slug":"Whats-AD-Connect-ky5W0Lz5P","title":"What's AD Connect","featuredImage":"https://i.ibb.co/7nDqr9x/Whats-AD-Connect.png"},{"id":"i9pJIjTNH","sectionId":"AFV_acckJ","slug":"Protecting-Passwords-in-Microsoft-365-i9pJIjTNH","title":"Protecting Passwords in Microsoft 365","featuredImage":"https://i.ibb.co/DLD4G4q/access-smart-lockout-settings.png"},{"id":"S1hQgFOMV","sectionId":"AFV_acckJ","slug":"Creating-and-managing-users-through-groups-S1hQgFOMV","title":"Creating and managing users through groups","featuredImage":"https://i.ibb.co/nmmC28M/add-a-group-microsoft-365.png"},{"id":"2QfoI2HxY","sectionId":"AFV_acckJ","slug":"Securing-and-implementing-enterprise-applications-2QfoI2HxY","title":"Securing and implementing enterprise applications","featuredImage":"https://i.ibb.co/C2mp69m/disable-user-consent.png"},{"id":"V1en9Iugh","sectionId":"AFV_acckJ","slug":"Whats-a-conditional-access-policy-V1en9Iugh","title":"What's a conditional access policy?","featuredImage":"https://i.ibb.co/DQm1sY0/Create-conditional-access-policy.png"},{"id":"nAAIvNbtk","sectionId":"AFV_acckJ","slug":"The-many-ways-to-implement-multi-factor-authentication-MFA-in-Microsoft-365-nAAIvNbtk","title":"The many ways to implement multi-factor authentication (MFA) in Microsoft 365","featuredImage":"https://i.ibb.co/P1P0wNY/microsoft-365-manage-security-defaults.png"},{"id":"2S9jn0aLr","sectionId":"AFV_acckJ","slug":"Implement-Self-service-password-reset-in-Microsoft-365-2S9jn0aLr","title":"Implement Self-service password reset in Microsoft 365","featuredImage":"https://i.ibb.co/58y9JVg/write-back-passwords-to-on-premises-directory.png"},{"id":"FldNualGC","sectionId":"AFV_acckJ","slug":"Locking-down-your-Microsoft-365-tenant-from-Microsoft-engineers-FldNualGC","title":"Locking down your Microsoft 365 tenant from Microsoft engineers","featuredImage":"https://i.ibb.co/DCmpnT9/Enable-Customer-Lockbox.png"},{"id":"NFQ6rYFeQ","sectionId":"AFV_acckJ","slug":"Implementing-intelligent-security-using-risk-policies-in-Microsoft-365-NFQ6rYFeQ","title":"Implementing intelligent security using risk policies in Microsoft 365","featuredImage":"https://i.ibb.co/0cyQJ7j/Risk-Detections.png"},{"id":"rK48f6iM2","sectionId":"AFV_acckJ","slug":"Automating-Access-Review-in-Microsoft-365-rK48f6iM2","title":"Automating Access Review in Microsoft 365","featuredImage":"https://i.ibb.co/Xsxvz6Z/new-access-review.png"},{"id":"RHW1API2s","sectionId":"AFV_acckJ","slug":"Just-in-time-approval-and-notification-for-admin-roles-in-Microsoft-365-RHW1API2s","title":"Just in time, approval and notification for admin roles in Microsoft 365","featuredImage":"https://i.ibb.co/dcb6XFN/Activate-a-Role.png"},{"id":"z8EMM9Eu_","sectionId":"QScYfSu74","slug":"Whats-Microsoft-365-Defender-z8EMM9Eu_","title":"What's Microsoft 365 Defender?","featuredImage":"https://i.ibb.co/MDMyDQt/Microsoft-Defender.png"},{"id":"Kye_yNLxA","sectionId":"QScYfSu74","slug":"Whats-Microsoft-Defender-for-identity-Kye_yNLxA","title":"What's Microsoft Defender for identity?","featuredImage":"https://i.ibb.co/bQDBh0Y/Defender-for-Identity-Timeline.png"},{"id":"EnPyp7ukN","sectionId":"QScYfSu74","slug":"Whats-Microsoft-Defender-for-Office-365-EnPyp7ukN","title":"What's Microsoft Defender for Office 365?","featuredImage":"https://i.ibb.co/WcwKY2G/Microsoft-365-incidents-and-alerts.png"},{"id":"6HUOr7qbL","sectionId":"QScYfSu74","slug":"Protect-your-email-environment-from-malicious-actors-6HUOr7qbL","title":"Protect your email and Office environment from malicious actors","featuredImage":"https://i.ibb.co/Df0KQVp/Reports.png"},{"id":"GCOOUsSBT","sectionId":"QScYfSu74","slug":"Protecting-email-against-phishing-attacks-GCOOUsSBT","title":"Protecting email against phishing attacks","featuredImage":"https://i.ibb.co/GCjZHWg/edit-actions.png"},{"id":"GG4cMY8pK","sectionId":"QScYfSu74","slug":"Simulating-attacks-with-Microsoft-365-GG4cMY8pK","title":"Simulating attacks with Microsoft 365","featuredImage":"https://i.ibb.co/NyvnbMK/simulation-overview-view-users-circled.png"},{"id":"z0qPG6v4T","sectionId":"QScYfSu74","slug":"Protecting-Windows-10-and-other-devices-with-Microsoft-Defender-for-Endpoint-z0qPG6v4T","title":"Protecting Windows 10 and other devices with Microsoft Defender for Endpoint","featuredImage":"https://i.ibb.co/T47Xhyh/enable-endpoint-connections.png"},{"id":"LEyZMWBSt","sectionId":"QScYfSu74","slug":"Collect-detect-investigate-and-respond-to-security-threats-using-Microsoft-Sentinel-LEyZMWBSt","title":"Collect, detect, investigate, and respond to security threats using Microsoft Sentinel","featuredImage":"https://i.ibb.co/qN9XsKj/Add-Workbook.png"},{"id":"7MQ3wE4wP","sectionId":"QScYfSu74","slug":"Implement-and-manage-Microsoft-Defender-for-Cloud-Apps-7MQ3wE4wP","title":"Implement and manage Microsoft Defender for Cloud Apps","featuredImage":"https://i.ibb.co/7g7LvFg/office-365-cloud-apps-settings.png"},{"id":"sH_Ee1DW1","sectionId":"QScYfSu74","slug":"Auditing-sign-ins-and-other-actions-in-Microsoft-365-sH_Ee1DW1","title":"Auditing sign-ins and other actions in Microsoft 365","featuredImage":"https://i.ibb.co/BqMw3jZ/Start-recording-user-and-admin-activity.png"},{"id":"vLweLmxZf","sectionId":"YhftdGIRX","slug":"How-to-classify-data-using-labels-in-Microsoft-365-vLweLmxZf","title":"How to classify data using labels in Microsoft 365","featuredImage":"https://i.ibb.co/k9nhWS5/Choose-protection-settings-for-files-and-emails.png"},{"id":"NsF7No40f","sectionId":"YhftdGIRX","slug":"Creating-and-managing-data-retention-to-conform-to-compliance-NsF7No40f","title":"Creating and managing data retention to conform to compliance","featuredImage":"https://i.ibb.co/yqC0ZdY/New-Retention-Policy.png"},{"id":"IsPGsme8w","sectionId":"YhftdGIRX","slug":"Preventing-accidental-and-malicious-data-loss-with-DLP-policies-IsPGsme8w","title":"Preventing accidental and malicious data loss with DLP policies","featuredImage":"https://i.ibb.co/n8WcqKM/Create-a-DLP-policy.png"},{"id":"wv2PbXnhI","sectionId":"YhftdGIRX","slug":"Everything-you-need-to-know-about-securing-SharePoint-Online-for-the-MS-500-wv2PbXnhI","title":"Everything you need to know about securing SharePoint Online for the MS-500","featuredImage":"https://i.ibb.co/Gk9NjSH/Share-Point-Online-Warning.png"},{"id":"7gR3L122b","sectionId":"l0DxUuonW","slug":"Introduction-to-Intune-7gR3L122b","title":"Introduction to Intune","featuredImage":"https://i.ibb.co/Fq3N8BX/Endpoint-Manager-Admin-Center.png"},{"id":"ZyKX3Idjs","sectionId":"l0DxUuonW","slug":"Setting-up-Android-Devices-ZyKX3Idjs","title":"Setting up Android Devices","featuredImage":"https://i.ibb.co/m0BYhL2/Connect-Intune-to-Google-Play.png"},{"id":"MAjW0a2_p","sectionId":"l0DxUuonW","slug":"Setting-up-Apple--iOS-devices-in-Intune-MAjW0a2_p","title":"Setting up Apple / iOS devices in Intune","featuredImage":"https://i.ibb.co/X7Ffb2B/Setup-Apple-Enrollment-in-Intune.png"},{"id":"XFXu2zIS9","sectionId":"l0DxUuonW","slug":"Setting-up-Windows-10-devices-in-Intune-XFXu2zIS9","title":"Setting up Windows 10 devices in Intune","featuredImage":"https://i.ibb.co/WDXKVjW/configure-device-options.png"},{"id":"_LL9VqGZO","sectionId":"l0DxUuonW","slug":"How-to-manage-devices-using-Intune-_LL9VqGZO","title":"How to manage devices using Intune","featuredImage":"https://i.ibb.co/HPQ2m8t/Create-an-endpoint-protection-profile.png"},{"id":"qDRA4jjoN","sectionId":"l0DxUuonW","slug":"Understanding-compliance-policies-qDRA4jjoN","title":"Understanding compliance policies","featuredImage":"https://i.ibb.co/N3Qk57v/Create-a-compliance-policy.png"},{"id":"62t_7oiZx","sectionId":"l0DxUuonW","slug":"Restricting-and-managing-apps-on-user-devices-62t_7oiZx","title":"Restricting and managing apps on user devices","featuredImage":"https://i.ibb.co/PCVRKDf/Add-an-Android-app-to-Intune.png"}],
      articleHtml: `<p>You will see questions about Microsoft Intune, configuration profiles, and compliance policies. You won't see any questions about how to set up a device in Intune but I thought it was important for you to see so I've created a lesson. If you already set up Intune to work with Windows devices or are only concerned about passing the MS-500 feel free to skip this lesson.</p>
<p>There are three common ways to join a Windows computer to Intune.</p>
<ul>
<li>First, manually. In short, you tell the Windows computer to join.</li>
<li>Second, automatically through the domain. In short, we can sync all the domain-joined devices to Azure AD and then tell Azure AD to join all the computers to Intune.</li>
<li>Third, by using AutoPilot. We won't be reviewing Autopilot in this lesson.</li>
</ul>
<p>Before we can do anything, there's a bit of configuration to do on the back end. We'll need to configure a user scope. The user scope will tell which Azure AD joined computers should receive Intune.</p>
<h2>How to configure auto-enrollment</h2>
<p>1. Go to <strong>Microsoft Endpoint Manager admin center</strong> &gt; <strong>Devices </strong>&gt; <strong>Enroll devices</strong> &gt; <strong>Windows enrollment</strong> &gt; <strong>Automatic Enrollment</strong>. Set the <strong>MDM user scope</strong> to <strong>All</strong>. Click <strong>Save</strong>.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/1XbTJ8n/Auto-enroll-Windows-in-Intune.png" alt="Auto-enroll Windows devices in Intune" style="height: auto;width: auto"/></div>
<h2>How to manually join a Windows computer to Intune</h2>
<p>First things first. Let's manually join a Windows computer to Azure AD and then let Azure AD automatically join the computer to Intune.</p>
<p>1. On the Windows device you want to join click Start menu &gt; Settings.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/gjXKgrp/Open-Settings-on-Windows-computer.png" alt="How to open settings on a Windows computer" style="height: auto;width: auto"/></div>
<p>2. Click Accounts.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/fqpJV7z/accounts-button.png" alt="Accounts" style="height: auto;width: auto"/></div>
<p>3. Click <strong>Access work or school</strong> &gt; <strong>Connect</strong>. Enter your <strong>Microsoft 365 username and password</strong>. Complete the <strong>MFA prompt</strong> if required.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/3vL0pvV/Connect-Windows-10-to-Azure-AD.png" alt="Connect your Windows 10 device to Intune" style="height: auto;width: auto"/></div>
<p>That's it! Simply wait 15 minutes or so and you'll see the device in the Endpoint Manager admin center.</p>
<h2>How to sync all your computers from the domain to Intune</h2>
<p>Since we have auto-enrollment configured in Intune any devices that show up in Azure AD will automatically be enrolled in Intune. So how about we sync all of our domain-joined computers to Azure AD?</p>
<p>1. Log on to the server that is running AD Connect.</p>
<p>2. Run the Azure AD Connect wizard. (typically it's an icon on the desktop but its default location is "C:\\Program Files\\Microsoft Azure Active Directory Connect\\AzureADConnect.exe"</p>
<p>3. Click <strong>Configure</strong>.</p>
<p>4. Click <strong>Configure device options</strong> &gt; <strong>Next</strong>.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/WDXKVjW/configure-device-options.png" alt="Configure device options" style="height: auto;width: auto"/></div>
<p>5. Click <strong>Next </strong>&gt; Enter your Microsoft 365 global admin <strong>username </strong>and <strong>password</strong>. Click <strong>Next</strong>.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/C0B6mNX/enter-your-global-admin-credentials.png" alt="Enter your global admin credentials" style="height: auto;width: auto"/></div>
<p>6. Verify <strong>Configure Hybrid Azure AD join</strong> is checked. Click <strong>Next</strong>. Check the <strong>Windows 10 or later domain-joined devices</strong> checkbox. Click <strong>Next</strong>.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/1r2tRWm/Windows-10-or-later-domain-joined-devices.png" alt="Windows 10 or later domain-joined devices" style="height: auto;width: auto"/></div>
<p>7. Check the box <strong>next to your forest</strong>. Set the <strong>Authentication Service</strong> to <strong>Azure Active Directory</strong>. Click <strong>Add</strong>. Enter your <strong>on-premises Enterprise admin credentials</strong>. Click <strong>OK</strong>. Click <strong>Next</strong>.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/x7QWR3b/SCP-Configuration.png" alt="SCP Configuration" style="height: auto;width: auto"/></div>
<p>8. Click <strong>Configure</strong>. Click <strong>Exit</strong>.</p>
<p>That should be it. During the next sync, you should see all the devices sync from your on-premises AD to Azure AD.</p>
`,
      nextContentSlug: 'How-to-manage-devices-using-Intune-_LL9VqGZO',
      previousContentSlug: 'Setting-up-Apple--iOS-devices-in-Intune-MAjW0a2_p',
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
