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
      article: {"datePublished":"2022/6/17","title":"Setting up Apple / iOS devices in Intune","featuredImage":"https://i.ibb.co/X7Ffb2B/Setup-Apple-Enrollment-in-Intune.png","publish":true,"id":"MAjW0a2_p","sectionId":"l0DxUuonW","article":{"blocks":[{"key":"34hkq","type":"unstyled","inlineStyleRanges":[],"text":"You will see questions about Microsoft Intune, configuration profiles, and compliance policies. You won't see any questions about how to set up a device in Intune but I thought it was important for you to see so I've created a lesson. If you already set up Intune to work with iOS devices or are only concerned about passing the MS-500 feel free to skip this lesson.","entityRanges":[],"data":{},"depth":0},{"data":{},"type":"header-two","entityRanges":[],"key":"7ev1k","inlineStyleRanges":[],"depth":0,"text":"Configure Apple enrollment"},{"entityRanges":[],"data":{},"type":"unstyled","depth":0,"inlineStyleRanges":[],"text":"Before you can add iOS devices to Microsoft Intune you'll need to connect your Intune tenant to Apple. Setting up the Apple connector is a little more complicated than the Google side of things. But Apple doesn't have as many enrollment profiles so that's nice.","key":"5nngo"},{"entityRanges":[{"length":16,"key":0,"offset":78}],"data":{},"text":"1. Go to Microsoft Endpoint Manager admin center > Devices > Enroll devices > Apple enrollment > Apple MDM Push certificate. Click I agree > Download your CSR. Save the file to a location on your computer. Click Create your MDM push Certificate.","key":"2jq03","inlineStyleRanges":[{"length":39,"style":"BOLD","offset":9},{"style":"BOLD","offset":51,"length":7},{"length":14,"offset":61,"style":"BOLD"},{"style":"BOLD","offset":78,"length":17},{"offset":97,"length":26,"style":"BOLD"},{"style":"BOLD","length":7,"offset":131},{"style":"BOLD","offset":141,"length":17},{"offset":212,"style":"BOLD","length":32}],"type":"unstyled","depth":0},{"text":" ","type":"atomic","depth":0,"inlineStyleRanges":[],"data":{},"key":"aohis","entityRanges":[{"offset":0,"key":1,"length":1}]},{"data":{},"text":"2. Create an Apple ID and then sign in. Click Create a certificate. Click I have read and agree. Click Accept.","inlineStyleRanges":[],"entityRanges":[],"type":"unstyled","key":"evsbo","depth":0},{"key":"3vj7e","type":"atomic","inlineStyleRanges":[],"text":" ","data":{},"depth":0,"entityRanges":[{"length":1,"key":2,"offset":0}]},{"type":"unstyled","depth":0,"text":"3. Click Choose File and select the file you downloaded in step 1 (after clicking Download your CSR). Click Upload.","entityRanges":[],"key":"bob0p","inlineStyleRanges":[{"length":11,"style":"BOLD","offset":9},{"offset":108,"length":6,"style":"BOLD"}],"data":{}},{"key":"a064v","entityRanges":[{"length":1,"key":3,"offset":0}],"inlineStyleRanges":[],"type":"atomic","depth":0,"text":" ","data":{}},{"key":"foi7o","depth":0,"inlineStyleRanges":[],"type":"unstyled","data":{},"entityRanges":[],"text":"4. Click Download and save the certificate to a location on your computer. Go back to the Microsoft Endpoint Manager admin center page that we opened in step 1."},{"entityRanges":[],"key":"9q7sk","inlineStyleRanges":[{"length":8,"style":"BOLD","offset":14},{"length":6,"offset":26,"style":"BOLD"},{"offset":44,"style":"BOLD","length":13},{"length":7,"style":"BOLD","offset":64},{"length":6,"offset":133,"style":"BOLD"}],"type":"unstyled","depth":0,"data":{},"text":"5. Enter your Apple ID in step 4. Click the browse button under step 5 and select the PEM file you downloaded in step 4 above. Click Upload."},{"text":" ","depth":0,"data":{},"type":"atomic","key":"90bt2","entityRanges":[{"length":1,"offset":0,"key":4}],"inlineStyleRanges":[]},{"data":{},"text":"Once you're complete you'll see a notification saying \"Uploading your MDM push certificate\" and you'll notice the Enrollment methods and options are unlocked.","entityRanges":[],"inlineStyleRanges":[],"type":"unstyled","depth":0,"key":"1q2l9"},{"type":"header-two","depth":0,"key":"84v4d","inlineStyleRanges":[],"text":"Enrolling iOS devices","entityRanges":[],"data":{}},{"text":"Similar to Andriod devices, iOS devices can be enrolled in multiple ways (although not nearly as many options as Android has). The device can be personally owned or corporate-owned. Unlike Android, you can also have users select whether the device is corporate-owned or personally owned when setting up their device. In this guide, we'll only be covering personally owned devices.","inlineStyleRanges":[],"entityRanges":[],"depth":0,"data":{},"key":"1ai92","type":"unstyled"},{"text":"1. Open the App Store and search for Intune Company Portal. Once installed open the app.","key":"4okuo","type":"unstyled","depth":0,"data":{},"inlineStyleRanges":[{"style":"BOLD","length":9,"offset":12},{"style":"BOLD","length":21,"offset":37},{"offset":75,"length":12,"style":"BOLD"}],"entityRanges":[]},{"inlineStyleRanges":[],"depth":0,"text":" ","type":"atomic","key":"apknr","data":{},"entityRanges":[{"key":5,"offset":0,"length":1}]},{"inlineStyleRanges":[{"offset":9,"style":"BOLD","length":7}],"type":"unstyled","depth":0,"text":"2. Click Sign in. Sign in using your Microsoft 365 credentials.","entityRanges":[],"data":{},"key":"bqmc6"},{"entityRanges":[{"length":1,"offset":0,"key":6}],"data":{},"inlineStyleRanges":[],"depth":0,"type":"atomic","key":"fcnsb","text":" "},{"key":"dftg8","depth":0,"data":{},"type":"unstyled","inlineStyleRanges":[{"style":"BOLD","offset":34,"length":2},{"offset":102,"style":"BOLD","length":5}],"text":"3. On the Get notified page click OK. On the \"Comp Portal\" would like to send you notifications click Allow.","entityRanges":[]},{"key":"21dco","depth":0,"inlineStyleRanges":[],"type":"atomic","data":{},"entityRanges":[{"key":7,"length":1,"offset":0}],"text":" "},{"text":"4. Click Devices. Click the device you are currently using. Click Begin setup > Begin","entityRanges":[],"inlineStyleRanges":[{"style":"BOLD","length":7,"offset":9},{"length":11,"offset":66,"style":"BOLD"},{"length":5,"style":"BOLD","offset":80}],"key":"1eoht","depth":0,"data":{},"type":"unstyled"},{"inlineStyleRanges":[],"key":"5frlb","entityRanges":[{"key":8,"offset":0,"length":1}],"text":" ","depth":0,"data":{},"type":"atomic"},{"data":{},"entityRanges":[],"inlineStyleRanges":[{"style":"BOLD","offset":9,"length":9},{"style":"BOLD","offset":20,"length":8},{"style":"BOLD","offset":111,"length":5},{"style":"BOLD","offset":159,"length":5},{"offset":20,"style":"color-rgb(33,37,41)","length":8},{"offset":20,"style":"bgcolor-rgb(255,255,255)","length":8},{"length":8,"style":"fontsize-16","offset":20},{"offset":20,"length":8,"style":"fontfamily-system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", \"Liberation Sans\", sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji"}],"type":"unstyled","depth":0,"key":"bc3js","text":"5. Click Continue > Continue. On the \"This website is trying to download a configuration profile\" prompt click Allow. On the \"Profile Downloaded\" prompt click Close."},{"depth":0,"inlineStyleRanges":[],"text":" ","entityRanges":[{"length":1,"key":9,"offset":0}],"key":"5v07k","type":"atomic","data":{}},{"data":{},"entityRanges":[],"key":"c409e","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":9,"length":9,"style":"BOLD"},{"style":"BOLD","length":8,"offset":20},{"style":"BOLD","length":11,"offset":86}],"text":"6. Click Continue > Continue. On the How to install management profile page click the home button."},{"data":{},"key":"b95lq","type":"atomic","inlineStyleRanges":[],"depth":0,"entityRanges":[{"offset":0,"key":10,"length":1}],"text":" "},{"entityRanges":[],"data":{},"type":"unstyled","depth":0,"text":"7. Open Settings > Profile Downloaded > Install > Install > Install > Trust > Done. Click the Home button.","key":"22vnh","inlineStyleRanges":[{"style":"BOLD","offset":8,"length":9},{"style":"BOLD","length":18,"offset":19},{"length":8,"style":"BOLD","offset":40},{"style":"BOLD","offset":50,"length":8},{"offset":60,"style":"BOLD","length":7},{"offset":70,"length":6,"style":"BOLD"},{"offset":78,"style":"BOLD","length":4},{"style":"BOLD","length":4,"offset":94}]},{"key":"9v42s","type":"atomic","depth":0,"data":{},"entityRanges":[{"length":1,"offset":0,"key":11}],"inlineStyleRanges":[],"text":" "},{"entityRanges":[],"type":"unstyled","key":"ef0ie","inlineStyleRanges":[{"length":11,"offset":12,"style":"BOLD"},{"style":"BOLD","length":4,"offset":35}],"depth":0,"text":"8. Open the Comp Portal app. Click Done.","data":{}},{"depth":0,"inlineStyleRanges":[],"type":"atomic","data":{},"text":" ","entityRanges":[{"key":12,"offset":0,"length":1}],"key":"1vp0i"},{"key":"2fjst","depth":0,"data":{},"text":"","entityRanges":[],"type":"unstyled","inlineStyleRanges":[]}],"entityMap":{"0":{"data":{"url":"https://endpoint.microsoft.com/?ref=AdminCenter#blade/Microsoft_Intune_DeviceSettings/DevicesEnrollmentMenu/appleEnrollment","targetOption":"_blank"},"type":"LINK","mutability":"MUTABLE"},"1":{"mutability":"MUTABLE","data":{"alignment":"none","src":"https://i.ibb.co/X7Ffb2B/Setup-Apple-Enrollment-in-Intune.png","height":"auto","width":"auto","alt":"Setup Apple enrollment in Intune"},"type":"IMAGE"},"2":{"data":{"alt":"Create Apple push certificate","src":"https://i.ibb.co/jMDfY10/Create-Apple-Push-certificate.png","height":"auto","alignment":"none","width":"auto"},"mutability":"MUTABLE","type":"IMAGE"},"3":{"data":{"src":"https://i.ibb.co/HgHqfqy/Upload-your-CSR.png","alt":"Upload your CSR","height":"auto","width":"auto","alignment":"none"},"mutability":"MUTABLE","type":"IMAGE"},"4":{"mutability":"MUTABLE","data":{"alignment":"none","src":"https://i.ibb.co/hBJXV0P/upload-certificate-to-Intune.png","width":"auto","alt":"Upload certificate to Intune","height":"auto"},"type":"IMAGE"},"5":{"data":{"alignment":"none","height":"auto","width":"auto","alt":"Install Intune on iOS","src":"https://i.ibb.co/PZmq1Vc/install-Intune-app-on-i-OS.png"},"type":"IMAGE","mutability":"MUTABLE"},"6":{"mutability":"MUTABLE","type":"IMAGE","data":{"alignment":"none","height":"auto","width":"auto","src":"https://i.ibb.co/XZJFp5F/sign-in-to-i-OS-intune.png","alt":"Sign in to Intune on iOS"}},"7":{"type":"IMAGE","mutability":"MUTABLE","data":{"height":"auto","src":"https://i.ibb.co/ydtgWDF/Allow-notifications-in-Intune-i-OS.png","alignment":"none","width":"auto","alt":"Allow notifications in Intune iOS"}},"8":{"type":"IMAGE","data":{"width":"auto","src":"https://i.ibb.co/HXSn57B/Begin-registering-device-in-Intune.png","height":"auto","alignment":"none","alt":"Begin registering device in Intune"},"mutability":"MUTABLE"},"9":{"type":"IMAGE","mutability":"MUTABLE","data":{"alignment":"none","alt":"Download the profile on iOS","height":"auto","src":"https://i.ibb.co/Wc1y8Tf/downlaod-the-profile-on-i-OS.png","width":"auto"}},"10":{"mutability":"MUTABLE","data":{"alignment":"none","alt":"Begin installing management profile","width":"auto","src":"https://i.ibb.co/TR07fNy/Begin-installing-management-profile.png","height":"auto"},"type":"IMAGE"},"11":{"data":{"width":"auto","alignment":"none","height":"auto","alt":"Install management profile on iOS","src":"https://i.ibb.co/wRJJGbd/Install-management-profile-on-i-OS.png"},"type":"IMAGE","mutability":"MUTABLE"},"12":{"mutability":"MUTABLE","data":{"alignment":"none","height":"auto","width":"auto","src":"https://i.ibb.co/dP7cFQK/Finish-setting-up-Intune-on-i-OS.png","alt":"Finish setting up Intune on iOS"},"type":"IMAGE"}}},"slug":"Setting-up-Apple--iOS-devices-in-Intune-MAjW0a2_p","type":"article","images":["https://i.ibb.co/X7Ffb2B/Setup-Apple-Enrollment-in-Intune.png","https://i.ibb.co/jMDfY10/Create-Apple-Push-certificate.png","https://i.ibb.co/HgHqfqy/Upload-your-CSR.png","https://i.ibb.co/2Pm8v9r/Upload-your-CSR.png","https://i.ibb.co/hBJXV0P/upload-certificate-to-Intune.png","https://i.ibb.co/PZmq1Vc/install-Intune-app-on-i-OS.png","https://i.ibb.co/XZJFp5F/sign-in-to-i-OS-intune.png","https://i.ibb.co/ydtgWDF/Allow-notifications-in-Intune-i-OS.png","https://i.ibb.co/HXSn57B/Begin-registering-device-in-Intune.png","https://i.ibb.co/Wc1y8Tf/downlaod-the-profile-on-i-OS.png","https://i.ibb.co/TR07fNy/Begin-installing-management-profile.png","https://i.ibb.co/wRJJGbd/Install-management-profile-on-i-OS.png","https://i.ibb.co/dP7cFQK/Finish-setting-up-Intune-on-i-OS.png"],"description":"How to set up Apple iOS Devices in Intune."},
      articles: [{"id":"cpchjBLkC","sectionId":"qwJW5VrBW","slug":"Whats-in-this-course-cpchjBLkC","title":"What's in this course?","featuredImage":"https://i.ibb.co/zFs9Vfb/microsoft365-security-administrator-associate-600x600.png"},{"id":"KKkBOVuS4","sectionId":"qwJW5VrBW","slug":"Creating-a-free-Microsoft-365-tenant-for-practice-KKkBOVuS4","title":"Creating a free Microsoft 365 tenant for practice","featuredImage":"https://i.ibb.co/F07sjQJ/microsoft-365-e5-trial.png"},{"id":"bzotoOjEe","sectionId":"qwJW5VrBW","slug":"Managing-the-Microsoft-365-tenant-Introduction-to-the-admin-centers-bzotoOjEe","title":"Managing the Microsoft 365 tenant - Introduction to the admin centers","featuredImage":"https://i.ibb.co/f1cr4zt/Microsoft-365-admin-centers.png"},{"id":"cg_vxOX9L","sectionId":"qwJW5VrBW","slug":"Managing-Microsoft-365-through-PowerShell-cg_vxOX9L","title":"Managing Microsoft 365 through PowerShell","featuredImage":"https://i.ibb.co/HV13YF6/install-microsoft-365-powershell-modules.png"},{"id":"uYCIPbnMC","sectionId":"AFV_acckJ","slug":"How-to-create-users-in-Microsoft-365-Cloud-Only-uYCIPbnMC","title":"How to create users in Microsoft 365 Cloud Only","featuredImage":"https://i.ibb.co/Wnt5Q43/View-Microsoft-365-Users.png"},{"id":"7CpqFkPZU","sectionId":"AFV_acckJ","slug":"Creating-and-managing-admins-through-roles-7CpqFkPZU","title":"Creating and managing admins through roles","featuredImage":"https://i.ibb.co/kySL4HQ/Roles-and-administrators.png"},{"id":"rZzausKJ1","sectionId":"AFV_acckJ","slug":"Time-limited-admin-roles-in-Microsoft-365-rZzausKJ1","title":"Time limited admin roles in Microsoft 365","featuredImage":"https://i.ibb.co/nDvjyPD/select-member-to-add-to-PIM-role.png"},{"id":"ky5W0Lz5P","sectionId":"AFV_acckJ","slug":"Whats-AD-Connect-ky5W0Lz5P","title":"What's AD Connect","featuredImage":"https://i.ibb.co/7nDqr9x/Whats-AD-Connect.png"},{"id":"i9pJIjTNH","sectionId":"AFV_acckJ","slug":"Protecting-Passwords-in-Microsoft-365-i9pJIjTNH","title":"Protecting Passwords in Microsoft 365","featuredImage":"https://i.ibb.co/DLD4G4q/access-smart-lockout-settings.png"},{"id":"S1hQgFOMV","sectionId":"AFV_acckJ","slug":"Creating-and-managing-users-through-groups-S1hQgFOMV","title":"Creating and managing users through groups","featuredImage":"https://i.ibb.co/nmmC28M/add-a-group-microsoft-365.png"},{"id":"2QfoI2HxY","sectionId":"AFV_acckJ","slug":"Securing-and-implementing-enterprise-applications-2QfoI2HxY","title":"Securing and implementing enterprise applications","featuredImage":"https://i.ibb.co/C2mp69m/disable-user-consent.png"},{"id":"V1en9Iugh","sectionId":"AFV_acckJ","slug":"Whats-a-conditional-access-policy-V1en9Iugh","title":"What's a conditional access policy?","featuredImage":"https://i.ibb.co/DQm1sY0/Create-conditional-access-policy.png"},{"id":"nAAIvNbtk","sectionId":"AFV_acckJ","slug":"The-many-ways-to-implement-multi-factor-authentication-MFA-in-Microsoft-365-nAAIvNbtk","title":"The many ways to implement multi-factor authentication (MFA) in Microsoft 365","featuredImage":"https://i.ibb.co/P1P0wNY/microsoft-365-manage-security-defaults.png"},{"id":"2S9jn0aLr","sectionId":"AFV_acckJ","slug":"Implement-Self-service-password-reset-in-Microsoft-365-2S9jn0aLr","title":"Implement Self-service password reset in Microsoft 365","featuredImage":"https://i.ibb.co/58y9JVg/write-back-passwords-to-on-premises-directory.png"},{"id":"FldNualGC","sectionId":"AFV_acckJ","slug":"Locking-down-your-Microsoft-365-tenant-from-Microsoft-engineers-FldNualGC","title":"Locking down your Microsoft 365 tenant from Microsoft engineers","featuredImage":"https://i.ibb.co/DCmpnT9/Enable-Customer-Lockbox.png"},{"id":"NFQ6rYFeQ","sectionId":"AFV_acckJ","slug":"Implementing-intelligent-security-using-risk-policies-in-Microsoft-365-NFQ6rYFeQ","title":"Implementing intelligent security using risk policies in Microsoft 365","featuredImage":"https://i.ibb.co/0cyQJ7j/Risk-Detections.png"},{"id":"rK48f6iM2","sectionId":"AFV_acckJ","slug":"Automating-Access-Review-in-Microsoft-365-rK48f6iM2","title":"Automating Access Review in Microsoft 365","featuredImage":"https://i.ibb.co/Xsxvz6Z/new-access-review.png"},{"id":"RHW1API2s","sectionId":"AFV_acckJ","slug":"Just-in-time-approval-and-notification-for-admin-roles-in-Microsoft-365-RHW1API2s","title":"Just in time, approval and notification for admin roles in Microsoft 365","featuredImage":"https://i.ibb.co/dcb6XFN/Activate-a-Role.png"},{"id":"z8EMM9Eu_","sectionId":"QScYfSu74","slug":"Whats-Microsoft-365-Defender-z8EMM9Eu_","title":"What's Microsoft 365 Defender?","featuredImage":"https://i.ibb.co/MDMyDQt/Microsoft-Defender.png"},{"id":"Kye_yNLxA","sectionId":"QScYfSu74","slug":"Whats-Microsoft-Defender-for-identity-Kye_yNLxA","title":"What's Microsoft Defender for identity?","featuredImage":"https://i.ibb.co/bQDBh0Y/Defender-for-Identity-Timeline.png"},{"id":"EnPyp7ukN","sectionId":"QScYfSu74","slug":"Whats-Microsoft-Defender-for-Office-365-EnPyp7ukN","title":"What's Microsoft Defender for Office 365?","featuredImage":"https://i.ibb.co/WcwKY2G/Microsoft-365-incidents-and-alerts.png"},{"id":"6HUOr7qbL","sectionId":"QScYfSu74","slug":"Protect-your-email-environment-from-malicious-actors-6HUOr7qbL","title":"Protect your email and Office environment from malicious actors","featuredImage":"https://i.ibb.co/Df0KQVp/Reports.png"},{"id":"GCOOUsSBT","sectionId":"QScYfSu74","slug":"Protecting-email-against-phishing-attacks-GCOOUsSBT","title":"Protecting email against phishing attacks","featuredImage":"https://i.ibb.co/GCjZHWg/edit-actions.png"},{"id":"GG4cMY8pK","sectionId":"QScYfSu74","slug":"Simulating-attacks-with-Microsoft-365-GG4cMY8pK","title":"Simulating attacks with Microsoft 365","featuredImage":"https://i.ibb.co/NyvnbMK/simulation-overview-view-users-circled.png"},{"id":"z0qPG6v4T","sectionId":"QScYfSu74","slug":"Protecting-Windows-10-and-other-devices-with-Microsoft-Defender-for-Endpoint-z0qPG6v4T","title":"Protecting Windows 10 and other devices with Microsoft Defender for Endpoint","featuredImage":"https://i.ibb.co/T47Xhyh/enable-endpoint-connections.png"},{"id":"LEyZMWBSt","sectionId":"QScYfSu74","slug":"Collect-detect-investigate-and-respond-to-security-threats-using-Microsoft-Sentinel-LEyZMWBSt","title":"Collect, detect, investigate, and respond to security threats using Microsoft Sentinel","featuredImage":"https://i.ibb.co/qN9XsKj/Add-Workbook.png"},{"id":"7MQ3wE4wP","sectionId":"QScYfSu74","slug":"Implement-and-manage-Microsoft-Defender-for-Cloud-Apps-7MQ3wE4wP","title":"Implement and manage Microsoft Defender for Cloud Apps","featuredImage":"https://i.ibb.co/7g7LvFg/office-365-cloud-apps-settings.png"},{"id":"sH_Ee1DW1","sectionId":"QScYfSu74","slug":"Auditing-sign-ins-and-other-actions-in-Microsoft-365-sH_Ee1DW1","title":"Auditing sign-ins and other actions in Microsoft 365","featuredImage":"https://i.ibb.co/BqMw3jZ/Start-recording-user-and-admin-activity.png"},{"id":"vLweLmxZf","sectionId":"YhftdGIRX","slug":"How-to-classify-data-using-labels-in-Microsoft-365-vLweLmxZf","title":"How to classify data using labels in Microsoft 365","featuredImage":"https://i.ibb.co/k9nhWS5/Choose-protection-settings-for-files-and-emails.png"},{"id":"NsF7No40f","sectionId":"YhftdGIRX","slug":"Creating-and-managing-data-retention-to-conform-to-compliance-NsF7No40f","title":"Creating and managing data retention to conform to compliance","featuredImage":"https://i.ibb.co/yqC0ZdY/New-Retention-Policy.png"},{"id":"IsPGsme8w","sectionId":"YhftdGIRX","slug":"Preventing-accidental-and-malicious-data-loss-with-DLP-policies-IsPGsme8w","title":"Preventing accidental and malicious data loss with DLP policies","featuredImage":"https://i.ibb.co/n8WcqKM/Create-a-DLP-policy.png"},{"id":"wv2PbXnhI","sectionId":"YhftdGIRX","slug":"Everything-you-need-to-know-about-securing-SharePoint-Online-for-the-MS-500-wv2PbXnhI","title":"Everything you need to know about securing SharePoint Online for the MS-500","featuredImage":"https://i.ibb.co/Gk9NjSH/Share-Point-Online-Warning.png"},{"id":"7gR3L122b","sectionId":"l0DxUuonW","slug":"Introduction-to-Intune-7gR3L122b","title":"Introduction to Intune","featuredImage":"https://i.ibb.co/Fq3N8BX/Endpoint-Manager-Admin-Center.png"},{"id":"ZyKX3Idjs","sectionId":"l0DxUuonW","slug":"Setting-up-Android-Devices-ZyKX3Idjs","title":"Setting up Android Devices","featuredImage":"https://i.ibb.co/m0BYhL2/Connect-Intune-to-Google-Play.png"},{"id":"MAjW0a2_p","sectionId":"l0DxUuonW","slug":"Setting-up-Apple--iOS-devices-in-Intune-MAjW0a2_p","title":"Setting up Apple / iOS devices in Intune","featuredImage":"https://i.ibb.co/X7Ffb2B/Setup-Apple-Enrollment-in-Intune.png"},{"id":"XFXu2zIS9","sectionId":"l0DxUuonW","slug":"Setting-up-Windows-10-devices-in-Intune-XFXu2zIS9","title":"Setting up Windows 10 devices in Intune","featuredImage":"https://i.ibb.co/WDXKVjW/configure-device-options.png"},{"id":"_LL9VqGZO","sectionId":"l0DxUuonW","slug":"How-to-manage-devices-using-Intune-_LL9VqGZO","title":"How to manage devices using Intune","featuredImage":"https://i.ibb.co/HPQ2m8t/Create-an-endpoint-protection-profile.png"},{"id":"qDRA4jjoN","sectionId":"l0DxUuonW","slug":"Understanding-compliance-policies-qDRA4jjoN","title":"Understanding compliance policies","featuredImage":"https://i.ibb.co/N3Qk57v/Create-a-compliance-policy.png"},{"id":"62t_7oiZx","sectionId":"l0DxUuonW","slug":"Restricting-and-managing-apps-on-user-devices-62t_7oiZx","title":"Restricting and managing apps on user devices","featuredImage":"https://i.ibb.co/PCVRKDf/Add-an-Android-app-to-Intune.png"}],
      articleHtml: `<p>You will see questions about Microsoft Intune, configuration profiles, and compliance policies. You won't see any questions about how to set up a device in Intune but I thought it was important for you to see so I've created a lesson. If you already set up Intune to work with iOS devices or are only concerned about passing the MS-500 feel free to skip this lesson.</p>
<h2>Configure Apple enrollment</h2>
<p>Before you can add iOS devices to Microsoft Intune you'll need to connect your Intune tenant to Apple. Setting up the Apple connector is a little more complicated than the Google side of things. But Apple doesn't have as many enrollment profiles so that's nice.</p>
<p>1. Go to <strong>Microsoft Endpoint Manager admin center</strong> &gt; <strong>Devices</strong> &gt; <strong>Enroll devices</strong> &gt; <a href="https://endpoint.microsoft.com/?ref=AdminCenter#blade/Microsoft_Intune_DeviceSettings/DevicesEnrollmentMenu/appleEnrollment" target="_blank"><strong>Apple enrollment</strong></a><strong> </strong>&gt; <strong>Apple MDM Push certificate</strong>. Click <strong>I agree</strong> &gt; <strong>Download your CSR</strong>. Save the file to a location on your computer. Click <strong>Create your MDM push Certificate</strong>.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/X7Ffb2B/Setup-Apple-Enrollment-in-Intune.png" alt="Setup Apple enrollment in Intune" style="height: auto;width: auto"/></div>
<p>2. Create an Apple ID and then sign in. Click Create a certificate. Click I have read and agree. Click Accept.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/jMDfY10/Create-Apple-Push-certificate.png" alt="Create Apple push certificate" style="height: auto;width: auto"/></div>
<p>3. Click <strong>Choose File</strong> and select the file you downloaded in step 1 (after clicking Download your CSR). Click <strong>Upload</strong>.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/HgHqfqy/Upload-your-CSR.png" alt="Upload your CSR" style="height: auto;width: auto"/></div>
<p>4. Click Download and save the certificate to a location on your computer. Go back to the Microsoft Endpoint Manager admin center page that we opened in step 1.</p>
<p>5. Enter your <strong>Apple ID</strong> in <strong>step 4</strong>. Click the <strong>browse button</strong> under <strong>step 5 </strong>and select the PEM file you downloaded in step 4 above. Click <strong>Upload</strong>.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/hBJXV0P/upload-certificate-to-Intune.png" alt="Upload certificate to Intune" style="height: auto;width: auto"/></div>
<p>Once you're complete you'll see a notification saying "Uploading your MDM push certificate" and you'll notice the Enrollment methods and options are unlocked.</p>
<h2>Enrolling iOS devices</h2>
<p>Similar to Andriod devices, iOS devices can be enrolled in multiple ways (although not nearly as many options as Android has). The device can be personally owned or corporate-owned. Unlike Android, you can also have users select whether the device is corporate-owned or personally owned when setting up their device. In this guide, we'll only be covering personally owned devices.</p>
<p>1. Open the <strong>App Store</strong> and search for <strong>Intune Company Portal</strong>. Once installed <strong>open the app</strong>.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/PZmq1Vc/install-Intune-app-on-i-OS.png" alt="Install Intune on iOS" style="height: auto;width: auto"/></div>
<p>2. Click <strong>Sign in</strong>. Sign in using your Microsoft 365 credentials.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/XZJFp5F/sign-in-to-i-OS-intune.png" alt="Sign in to Intune on iOS" style="height: auto;width: auto"/></div>
<p>3. On the Get notified page click <strong>OK</strong>. On the "Comp Portal" would like to send you notifications click <strong>Allow</strong>.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/ydtgWDF/Allow-notifications-in-Intune-i-OS.png" alt="Allow notifications in Intune iOS" style="height: auto;width: auto"/></div>
<p>4. Click <strong>Devices</strong>. Click the device you are currently using. Click <strong>Begin setup</strong> &gt; <strong>Begin</strong></p>
<div style="text-align:none;"><img src="https://i.ibb.co/HXSn57B/Begin-registering-device-in-Intune.png" alt="Begin registering device in Intune" style="height: auto;width: auto"/></div>
<p>5. Click <strong>Continue </strong>&gt; <span style="color: rgb(33,37,41);background-color: rgb(255,255,255);font-size: 16px;font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;"><strong>Continue</strong></span>. On the "This website is trying to download a configuration profile" prompt click <strong>Allow</strong>. On the "Profile Downloaded" prompt click <strong>Close</strong>.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/Wc1y8Tf/downlaod-the-profile-on-i-OS.png" alt="Download the profile on iOS" style="height: auto;width: auto"/></div>
<p>6. Click <strong>Continue </strong>&gt; <strong>Continue</strong>. On the How to install management profile page click the <strong>home button</strong>.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/TR07fNy/Begin-installing-management-profile.png" alt="Begin installing management profile" style="height: auto;width: auto"/></div>
<p>7. Open <strong>Settings </strong>&gt; <strong>Profile Downloaded</strong> &gt; <strong>Install </strong>&gt; <strong>Install </strong>&gt; <strong>Install</strong> &gt; <strong>Trust </strong>&gt; <strong>Done</strong>. Click the <strong>Home</strong> button.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/wRJJGbd/Install-management-profile-on-i-OS.png" alt="Install management profile on iOS" style="height: auto;width: auto"/></div>
<p>8. Open the <strong>Comp Portal</strong> app. Click <strong>Done</strong>.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/dP7cFQK/Finish-setting-up-Intune-on-i-OS.png" alt="Finish setting up Intune on iOS" style="height: auto;width: auto"/></div>
<p></p>
`,
      nextContentSlug: 'Setting-up-Windows-10-devices-in-Intune-XFXu2zIS9',
      previousContentSlug: 'Setting-up-Android-Devices-ZyKX3Idjs',
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
