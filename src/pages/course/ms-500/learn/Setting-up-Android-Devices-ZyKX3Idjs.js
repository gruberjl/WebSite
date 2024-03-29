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
      article: {"featuredImage":"https://i.ibb.co/m0BYhL2/Connect-Intune-to-Google-Play.png","description":"How to set up Android Devices in Intune.","datePublished":"2022/6/17","sectionId":"l0DxUuonW","images":["https://i.ibb.co/m0BYhL2/Connect-Intune-to-Google-Play.png","https://i.ibb.co/0MYCVd1/Configure-Google-Play-integration-to-Intune.png","https://i.ibb.co/XFMW3Rq/android-enrollment-profiles-in-intune.png","https://i.ibb.co/t4hRjRG/Android-Intune-App-Install.png","https://i.ibb.co/gPpYtnK/sign-in-to-Android-Intune.png","https://i.ibb.co/NscHw05/My-Android.png","https://i.ibb.co/2WJfSxp/This-device-is-not-managed.png","https://i.ibb.co/jDFJK9g/Set-up-Intune-on-an-Android-device.png"],"slug":"Setting-up-Android-Devices-ZyKX3Idjs","id":"ZyKX3Idjs","type":"article","publish":true,"article":{"entityMap":{"0":{"data":{"alignment":"none","height":"auto","width":"auto","alt":"Connect Intune to Google Play","src":"https://i.ibb.co/m0BYhL2/Connect-Intune-to-Google-Play.png"},"type":"IMAGE","mutability":"MUTABLE"},"1":{"data":{"alignment":"none","height":"auto","width":"auto","alt":"Screenshot after Google Play is integrated with Intune","src":"https://i.ibb.co/0MYCVd1/Configure-Google-Play-integration-to-Intune.png"},"mutability":"MUTABLE","type":"IMAGE"},"2":{"data":{"height":"auto","alignment":"none","alt":"Android enrollment profiles in Intune","width":"auto","src":"https://i.ibb.co/XFMW3Rq/android-enrollment-profiles-in-intune.png"},"mutability":"MUTABLE","type":"IMAGE"},"3":{"mutability":"MUTABLE","type":"IMAGE","data":{"alt":"Android Intune App Install","height":"auto","alignment":"none","width":"auto","src":"https://i.ibb.co/t4hRjRG/Android-Intune-App-Install.png"}},"4":{"data":{"src":"https://i.ibb.co/gPpYtnK/sign-in-to-Android-Intune.png","height":"auto","width":"auto","alt":"Sign in to Intune on your Android device","alignment":"none"},"type":"IMAGE","mutability":"MUTABLE"},"5":{"type":"IMAGE","data":{"width":"auto","height":"auto","alt":"My Android","alignment":"none","src":"https://i.ibb.co/NscHw05/My-Android.png"},"mutability":"MUTABLE"},"6":{"type":"IMAGE","mutability":"MUTABLE","data":{"alignment":"none","alt":"This device is not managed","src":"https://i.ibb.co/2WJfSxp/This-device-is-not-managed.png","height":"auto","width":"auto"}},"7":{"type":"IMAGE","mutability":"MUTABLE","data":{"alt":"Set up Intune on an Android device","alignment":"none","width":"auto","height":"auto","src":"https://i.ibb.co/jDFJK9g/Set-up-Intune-on-an-Android-device.png"}}},"blocks":[{"data":{},"inlineStyleRanges":[],"entityRanges":[],"text":"You will see questions about Microsoft Intune, configuration profiles, and compliance policies. You won't see any questions about how to set up a device in Intune but I thought it was important for you to see so I've created a lesson. If you already set up Intune to work with Android devices or are only concerned about passing the MS-500 feel free to skip this lesson.","depth":0,"key":"4li16","type":"unstyled"},{"inlineStyleRanges":[],"depth":0,"data":{},"type":"header-two","key":"7d18m","text":"Configure Android enrollment","entityRanges":[]},{"key":"52mvk","type":"unstyled","data":{},"inlineStyleRanges":[],"entityRanges":[],"depth":0,"text":"Before you can add Android devices to Microsoft Intune you'll need to connect your Intune tenant to Google."},{"entityRanges":[],"inlineStyleRanges":[{"offset":9,"length":39,"style":"BOLD"},{"style":"BOLD","offset":51,"length":8},{"style":"BOLD","length":15,"offset":61},{"style":"BOLD","offset":78,"length":18},{"offset":99,"length":19,"style":"BOLD"},{"offset":126,"length":7,"style":"BOLD"},{"offset":136,"length":28,"style":"BOLD"}],"key":"e3d5m","data":{},"text":"1. Go to Microsoft Endpoint Manager admin center > Devices > Enroll devices > Android enrollment > Managed Google Play. Click I agree > Launch Google to connect now.","depth":0,"type":"unstyled"},{"type":"atomic","key":"ffuqu","data":{},"text":" ","depth":0,"entityRanges":[{"offset":0,"key":0,"length":1}],"inlineStyleRanges":[]},{"entityRanges":[],"type":"unstyled","text":"2. Follow the prompts to sign in and set up your Android to Work account. Once you're complete you'll see a notification saying \"Managed Google Play successfully configured with tenant\" and you'll notice the Enrollment profiles are unlocked.","data":{},"depth":0,"inlineStyleRanges":[],"key":"42srd"},{"data":{},"inlineStyleRanges":[],"depth":0,"key":"fnpdp","entityRanges":[{"length":1,"offset":0,"key":1}],"type":"atomic","text":" "},{"type":"header-two","inlineStyleRanges":[],"key":"3tho1","entityRanges":[],"text":"The many ways to set up an Android device","depth":0,"data":{}},{"text":"So now we’re ready to finally set up our first Android device. Or are we? Before we can set up our first Android device, we need to discuss one last thing, how do you want to configure the device?","depth":0,"key":"9qdsg","type":"unstyled","data":{},"inlineStyleRanges":[],"entityRanges":[]},{"inlineStyleRanges":[],"entityRanges":[],"key":"f7d4i","text":"Ownership: personal vs corporate","type":"header-three","data":{},"depth":0},{"type":"unstyled","data":{},"text":"In short, Android has a couple of options. First, the device can be personally owned or corporate-owned. In short, did the user bring their own device or did the company buy the device and give it to the user? If the device is personally owned, then the device will automatically receive a work profile. In short, the user can continue to use their personal apps and device like they normally would, and the work apps go in a separate container on the phone. The device will even have a managed Google Play store app so users can download apps to the workspace. Only apps that you have allowed will show up in the managed Google Play app store.","depth":0,"entityRanges":[],"key":"e60qn","inlineStyleRanges":[]},{"inlineStyleRanges":[],"depth":0,"entityRanges":[],"key":"89ocp","text":"With corporate-owned devices a bit more information is available to the admins. Intune will collect the following information on corporate-owned devices but won’t gather the information for personally owned devices:","data":{},"type":"unstyled"},{"type":"unordered-list-item","key":"ajkae","depth":0,"entityRanges":[],"inlineStyleRanges":[],"text":"Phone number","data":{}},{"key":"f1b0t","data":{},"type":"unordered-list-item","depth":0,"entityRanges":[],"inlineStyleRanges":[],"text":"App inventory"},{"key":"60e5v","depth":0,"inlineStyleRanges":[],"text":"By default, devices enrolled in Intune are considered personally owned. To convert a device to corporate ownership you must perform one of the following:","type":"unstyled","entityRanges":[],"data":{}},{"data":{},"depth":0,"inlineStyleRanges":[],"text":"Setup up the fresh factory reset device to be corporate-owned.","entityRanges":[],"type":"unordered-list-item","key":"d6tns"},{"key":"dnnns","data":{},"entityRanges":[],"text":"Set the device serial number inside Intune prior to enrollment.","inlineStyleRanges":[],"depth":0,"type":"unordered-list-item"},{"data":{},"type":"unordered-list-item","text":"Have an Intune administrator manually convert the device from personally owned to corporate-owned.","entityRanges":[],"depth":0,"inlineStyleRanges":[],"key":"con2i"},{"type":"header-three","data":{},"text":"Android Enterprise: Corporate-owned fully managed user devices","key":"2qkld","entityRanges":[],"depth":0,"inlineStyleRanges":[]},{"inlineStyleRanges":[],"entityRanges":[],"text":"In this configuration, the device is owned by the corporation but is given to an individual. With corporate-owned fully managed user devices, there isn’t a personal / work profile on the device. There’s only a work profile. So, the user doesn’t have to understand the difference. Also, the Managed Google Play store is the only store available. So, the user cannot install apps and games on the device unless you’ve made them available in the managed Google Play store.","type":"unstyled","depth":0,"data":{},"key":"61ak"},{"inlineStyleRanges":[],"data":{},"depth":0,"key":"b0mtf","text":"Android Enterprise: Corporate-owned devices with work profile","entityRanges":[],"type":"header-three"},{"entityRanges":[],"depth":0,"data":{},"text":"In this configuration, the device is owned by the corporation but is given to an individual. With corporate-owned devices with a work profile, the device is split between the work profile and personal, just like the devices when they are personally owned devices with a work profile. If you have a mix of personally owned and corporate-owned devices I’d recommend using this policy.","type":"unstyled","key":"4vnef","inlineStyleRanges":[]},{"depth":0,"text":"Android Enterprise: Corporate-owned dedicated devices","entityRanges":[],"key":"1ohuf","data":{},"inlineStyleRanges":[],"type":"header-three"},{"depth":0,"type":"unstyled","inlineStyleRanges":[],"entityRanges":[],"key":"eeeg","data":{},"text":"Corporate-owned dedicated devices are set up for devices that do not have a personal owner. For example, you may have a tablet in the conference room that anyone that uses the conference room has access to the tablet. With corporate-owned dedicated devices, users won’t be able to install any apps on the device. The only apps that will be installed are required apps that are pushed to devices."},{"text":"How to set up corporate-owned Android devices","key":"bskrl","entityRanges":[],"depth":0,"data":{},"inlineStyleRanges":[],"type":"header-three"},{"data":{},"type":"unstyled","key":"7co7c","entityRanges":[],"inlineStyleRanges":[{"style":"BOLD","length":39,"offset":182},{"style":"BOLD","offset":224,"length":8},{"style":"BOLD","offset":234,"length":14},{"length":18,"offset":251,"style":"BOLD"}],"text":"Since setting up devices isn't covered under the MS-500 I'll be skipping this section but a quick FYI: to set up a device as corporate-owned you need to set up the enrollment. Go to Microsoft Endpoint Manager admin center > Devices > Enroll devices > Android enrollment and set up the enrollment profile you want to use.","depth":0},{"data":{},"type":"atomic","key":"pueo","inlineStyleRanges":[],"depth":0,"text":" ","entityRanges":[{"key":2,"length":1,"offset":0}]},{"entityRanges":[],"inlineStyleRanges":[],"depth":0,"text":"How to enroll an Android personally owned device","key":"de46s","type":"header-two","data":{}},{"entityRanges":[],"depth":0,"text":"Enrolling an Android personally owned device is simple. And there’s no setup on the back end. Have the user perform the following steps on their device:","key":"8kpb3","data":{},"inlineStyleRanges":[],"type":"unstyled"},{"entityRanges":[],"key":"7ce7v","type":"unstyled","depth":0,"inlineStyleRanges":[{"style":"BOLD","length":17,"offset":12},{"length":21,"offset":45,"style":"BOLD"},{"offset":68,"length":8,"style":"BOLD"}],"text":"1.\tOpen the Google Play store and search for Intune Company Portal. Install the app.","data":{}},{"text":" ","inlineStyleRanges":[],"type":"atomic","depth":0,"entityRanges":[{"key":3,"length":1,"offset":0}],"key":"1tg27","data":{}},{"text":"2.\tOnce installed, open the app. Click Sign in. Enter your company username and password. If prompted complete the MFA.","type":"unstyled","inlineStyleRanges":[{"offset":39,"style":"BOLD","length":7},{"style":"BOLD","length":29,"offset":59}],"data":{},"depth":0,"key":"9eihq","entityRanges":[]},{"inlineStyleRanges":[],"data":{},"key":"9171a","type":"atomic","text":" ","depth":0,"entityRanges":[{"offset":0,"length":1,"key":4}]},{"text":"4.\tClick Devices > My Android.","key":"8rd1l","type":"unstyled","data":{},"inlineStyleRanges":[{"style":"BOLD","offset":9,"length":8},{"style":"BOLD","length":10,"offset":19}],"entityRanges":[],"depth":0},{"inlineStyleRanges":[],"data":{},"entityRanges":[{"length":1,"key":5,"offset":0}],"type":"atomic","text":" ","key":"4stqp","depth":0},{"depth":0,"data":{},"entityRanges":[],"key":"41s4h","text":"5.\tClick This device is not managed.","type":"unstyled","inlineStyleRanges":[{"length":26,"offset":9,"style":"BOLD"}]},{"data":{},"entityRanges":[{"length":1,"offset":0,"key":6}],"inlineStyleRanges":[],"text":" ","depth":0,"key":"1eakm","type":"atomic"},{"data":{},"type":"unstyled","depth":0,"entityRanges":[],"inlineStyleRanges":[{"length":5,"style":"BOLD","offset":9},{"style":"BOLD","length":9,"offset":17},{"offset":28,"style":"BOLD","length":17},{"style":"BOLD","offset":48,"length":5},{"offset":55,"style":"BOLD","length":9},{"style":"BOLD","length":5,"offset":66},{"offset":73,"style":"BOLD","length":6}],"key":"juis","text":"6.\tClick Begin > Continue > Accept & continue > Next > Continue > Done > Got it."},{"inlineStyleRanges":[],"key":"bmk71","depth":0,"text":" ","entityRanges":[{"length":1,"offset":0,"key":7}],"data":{},"type":"atomic"},{"key":"chh5s","data":{},"depth":0,"entityRanges":[],"inlineStyleRanges":[],"type":"unstyled","text":""}]},"title":"Setting up Android Devices"},
      articles: [{"id":"cpchjBLkC","sectionId":"qwJW5VrBW","slug":"Whats-in-this-course-cpchjBLkC","title":"What's in this course?","featuredImage":"https://i.ibb.co/zFs9Vfb/microsoft365-security-administrator-associate-600x600.png"},{"id":"KKkBOVuS4","sectionId":"qwJW5VrBW","slug":"Creating-a-free-Microsoft-365-tenant-for-practice-KKkBOVuS4","title":"Creating a free Microsoft 365 tenant for practice","featuredImage":"https://i.ibb.co/F07sjQJ/microsoft-365-e5-trial.png"},{"id":"bzotoOjEe","sectionId":"qwJW5VrBW","slug":"Managing-the-Microsoft-365-tenant-Introduction-to-the-admin-centers-bzotoOjEe","title":"Managing the Microsoft 365 tenant - Introduction to the admin centers","featuredImage":"https://i.ibb.co/f1cr4zt/Microsoft-365-admin-centers.png"},{"id":"cg_vxOX9L","sectionId":"qwJW5VrBW","slug":"Managing-Microsoft-365-through-PowerShell-cg_vxOX9L","title":"Managing Microsoft 365 through PowerShell","featuredImage":"https://i.ibb.co/HV13YF6/install-microsoft-365-powershell-modules.png"},{"id":"uYCIPbnMC","sectionId":"AFV_acckJ","slug":"How-to-create-users-in-Microsoft-365-Cloud-Only-uYCIPbnMC","title":"How to create users in Microsoft 365 Cloud Only","featuredImage":"https://i.ibb.co/Wnt5Q43/View-Microsoft-365-Users.png"},{"id":"7CpqFkPZU","sectionId":"AFV_acckJ","slug":"Creating-and-managing-admins-through-roles-7CpqFkPZU","title":"Creating and managing admins through roles","featuredImage":"https://i.ibb.co/kySL4HQ/Roles-and-administrators.png"},{"id":"rZzausKJ1","sectionId":"AFV_acckJ","slug":"Time-limited-admin-roles-in-Microsoft-365-rZzausKJ1","title":"Time limited admin roles in Microsoft 365","featuredImage":"https://i.ibb.co/nDvjyPD/select-member-to-add-to-PIM-role.png"},{"id":"ky5W0Lz5P","sectionId":"AFV_acckJ","slug":"Whats-AD-Connect-ky5W0Lz5P","title":"What's AD Connect","featuredImage":"https://i.ibb.co/7nDqr9x/Whats-AD-Connect.png"},{"id":"i9pJIjTNH","sectionId":"AFV_acckJ","slug":"Protecting-Passwords-in-Microsoft-365-i9pJIjTNH","title":"Protecting Passwords in Microsoft 365","featuredImage":"https://i.ibb.co/DLD4G4q/access-smart-lockout-settings.png"},{"id":"S1hQgFOMV","sectionId":"AFV_acckJ","slug":"Creating-and-managing-users-through-groups-S1hQgFOMV","title":"Creating and managing users through groups","featuredImage":"https://i.ibb.co/nmmC28M/add-a-group-microsoft-365.png"},{"id":"2QfoI2HxY","sectionId":"AFV_acckJ","slug":"Securing-and-implementing-enterprise-applications-2QfoI2HxY","title":"Securing and implementing enterprise applications","featuredImage":"https://i.ibb.co/C2mp69m/disable-user-consent.png"},{"id":"V1en9Iugh","sectionId":"AFV_acckJ","slug":"Whats-a-conditional-access-policy-V1en9Iugh","title":"What's a conditional access policy?","featuredImage":"https://i.ibb.co/DQm1sY0/Create-conditional-access-policy.png"},{"id":"nAAIvNbtk","sectionId":"AFV_acckJ","slug":"The-many-ways-to-implement-multi-factor-authentication-MFA-in-Microsoft-365-nAAIvNbtk","title":"The many ways to implement multi-factor authentication (MFA) in Microsoft 365","featuredImage":"https://i.ibb.co/P1P0wNY/microsoft-365-manage-security-defaults.png"},{"id":"2S9jn0aLr","sectionId":"AFV_acckJ","slug":"Implement-Self-service-password-reset-in-Microsoft-365-2S9jn0aLr","title":"Implement Self-service password reset in Microsoft 365","featuredImage":"https://i.ibb.co/58y9JVg/write-back-passwords-to-on-premises-directory.png"},{"id":"FldNualGC","sectionId":"AFV_acckJ","slug":"Locking-down-your-Microsoft-365-tenant-from-Microsoft-engineers-FldNualGC","title":"Locking down your Microsoft 365 tenant from Microsoft engineers","featuredImage":"https://i.ibb.co/DCmpnT9/Enable-Customer-Lockbox.png"},{"id":"NFQ6rYFeQ","sectionId":"AFV_acckJ","slug":"Implementing-intelligent-security-using-risk-policies-in-Microsoft-365-NFQ6rYFeQ","title":"Implementing intelligent security using risk policies in Microsoft 365","featuredImage":"https://i.ibb.co/0cyQJ7j/Risk-Detections.png"},{"id":"rK48f6iM2","sectionId":"AFV_acckJ","slug":"Automating-Access-Review-in-Microsoft-365-rK48f6iM2","title":"Automating Access Review in Microsoft 365","featuredImage":"https://i.ibb.co/Xsxvz6Z/new-access-review.png"},{"id":"RHW1API2s","sectionId":"AFV_acckJ","slug":"Just-in-time-approval-and-notification-for-admin-roles-in-Microsoft-365-RHW1API2s","title":"Just in time, approval and notification for admin roles in Microsoft 365","featuredImage":"https://i.ibb.co/dcb6XFN/Activate-a-Role.png"},{"id":"z8EMM9Eu_","sectionId":"QScYfSu74","slug":"Whats-Microsoft-365-Defender-z8EMM9Eu_","title":"What's Microsoft 365 Defender?","featuredImage":"https://i.ibb.co/MDMyDQt/Microsoft-Defender.png"},{"id":"Kye_yNLxA","sectionId":"QScYfSu74","slug":"Whats-Microsoft-Defender-for-identity-Kye_yNLxA","title":"What's Microsoft Defender for identity?","featuredImage":"https://i.ibb.co/bQDBh0Y/Defender-for-Identity-Timeline.png"},{"id":"EnPyp7ukN","sectionId":"QScYfSu74","slug":"Whats-Microsoft-Defender-for-Office-365-EnPyp7ukN","title":"What's Microsoft Defender for Office 365?","featuredImage":"https://i.ibb.co/WcwKY2G/Microsoft-365-incidents-and-alerts.png"},{"id":"6HUOr7qbL","sectionId":"QScYfSu74","slug":"Protect-your-email-environment-from-malicious-actors-6HUOr7qbL","title":"Protect your email and Office environment from malicious actors","featuredImage":"https://i.ibb.co/Df0KQVp/Reports.png"},{"id":"GCOOUsSBT","sectionId":"QScYfSu74","slug":"Protecting-email-against-phishing-attacks-GCOOUsSBT","title":"Protecting email against phishing attacks","featuredImage":"https://i.ibb.co/GCjZHWg/edit-actions.png"},{"id":"GG4cMY8pK","sectionId":"QScYfSu74","slug":"Simulating-attacks-with-Microsoft-365-GG4cMY8pK","title":"Simulating attacks with Microsoft 365","featuredImage":"https://i.ibb.co/NyvnbMK/simulation-overview-view-users-circled.png"},{"id":"z0qPG6v4T","sectionId":"QScYfSu74","slug":"Protecting-Windows-10-and-other-devices-with-Microsoft-Defender-for-Endpoint-z0qPG6v4T","title":"Protecting Windows 10 and other devices with Microsoft Defender for Endpoint","featuredImage":"https://i.ibb.co/T47Xhyh/enable-endpoint-connections.png"},{"id":"LEyZMWBSt","sectionId":"QScYfSu74","slug":"Collect-detect-investigate-and-respond-to-security-threats-using-Microsoft-Sentinel-LEyZMWBSt","title":"Collect, detect, investigate, and respond to security threats using Microsoft Sentinel","featuredImage":"https://i.ibb.co/qN9XsKj/Add-Workbook.png"},{"id":"7MQ3wE4wP","sectionId":"QScYfSu74","slug":"Implement-and-manage-Microsoft-Defender-for-Cloud-Apps-7MQ3wE4wP","title":"Implement and manage Microsoft Defender for Cloud Apps","featuredImage":"https://i.ibb.co/7g7LvFg/office-365-cloud-apps-settings.png"},{"id":"sH_Ee1DW1","sectionId":"QScYfSu74","slug":"Auditing-sign-ins-and-other-actions-in-Microsoft-365-sH_Ee1DW1","title":"Auditing sign-ins and other actions in Microsoft 365","featuredImage":"https://i.ibb.co/BqMw3jZ/Start-recording-user-and-admin-activity.png"},{"id":"vLweLmxZf","sectionId":"YhftdGIRX","slug":"How-to-classify-data-using-labels-in-Microsoft-365-vLweLmxZf","title":"How to classify data using labels in Microsoft 365","featuredImage":"https://i.ibb.co/k9nhWS5/Choose-protection-settings-for-files-and-emails.png"},{"id":"NsF7No40f","sectionId":"YhftdGIRX","slug":"Creating-and-managing-data-retention-to-conform-to-compliance-NsF7No40f","title":"Creating and managing data retention to conform to compliance","featuredImage":"https://i.ibb.co/yqC0ZdY/New-Retention-Policy.png"},{"id":"IsPGsme8w","sectionId":"YhftdGIRX","slug":"Preventing-accidental-and-malicious-data-loss-with-DLP-policies-IsPGsme8w","title":"Preventing accidental and malicious data loss with DLP policies","featuredImage":"https://i.ibb.co/n8WcqKM/Create-a-DLP-policy.png"},{"id":"wv2PbXnhI","sectionId":"YhftdGIRX","slug":"Everything-you-need-to-know-about-securing-SharePoint-Online-for-the-MS-500-wv2PbXnhI","title":"Everything you need to know about securing SharePoint Online for the MS-500","featuredImage":"https://i.ibb.co/Gk9NjSH/Share-Point-Online-Warning.png"},{"id":"7gR3L122b","sectionId":"l0DxUuonW","slug":"Introduction-to-Intune-7gR3L122b","title":"Introduction to Intune","featuredImage":"https://i.ibb.co/Fq3N8BX/Endpoint-Manager-Admin-Center.png"},{"id":"ZyKX3Idjs","sectionId":"l0DxUuonW","slug":"Setting-up-Android-Devices-ZyKX3Idjs","title":"Setting up Android Devices","featuredImage":"https://i.ibb.co/m0BYhL2/Connect-Intune-to-Google-Play.png"},{"id":"MAjW0a2_p","sectionId":"l0DxUuonW","slug":"Setting-up-Apple--iOS-devices-in-Intune-MAjW0a2_p","title":"Setting up Apple / iOS devices in Intune","featuredImage":"https://i.ibb.co/X7Ffb2B/Setup-Apple-Enrollment-in-Intune.png"},{"id":"XFXu2zIS9","sectionId":"l0DxUuonW","slug":"Setting-up-Windows-10-devices-in-Intune-XFXu2zIS9","title":"Setting up Windows 10 devices in Intune","featuredImage":"https://i.ibb.co/WDXKVjW/configure-device-options.png"},{"id":"_LL9VqGZO","sectionId":"l0DxUuonW","slug":"How-to-manage-devices-using-Intune-_LL9VqGZO","title":"How to manage devices using Intune","featuredImage":"https://i.ibb.co/HPQ2m8t/Create-an-endpoint-protection-profile.png"},{"id":"qDRA4jjoN","sectionId":"l0DxUuonW","slug":"Understanding-compliance-policies-qDRA4jjoN","title":"Understanding compliance policies","featuredImage":"https://i.ibb.co/N3Qk57v/Create-a-compliance-policy.png"},{"id":"62t_7oiZx","sectionId":"l0DxUuonW","slug":"Restricting-and-managing-apps-on-user-devices-62t_7oiZx","title":"Restricting and managing apps on user devices","featuredImage":"https://i.ibb.co/PCVRKDf/Add-an-Android-app-to-Intune.png"}],
      articleHtml: `<p>You will see questions about Microsoft Intune, configuration profiles, and compliance policies. You won't see any questions about how to set up a device in Intune but I thought it was important for you to see so I've created a lesson. If you already set up Intune to work with Android devices or are only concerned about passing the MS-500 feel free to skip this lesson.</p>
<h2>Configure Android enrollment</h2>
<p>Before you can add Android devices to Microsoft Intune you'll need to connect your Intune tenant to Google.</p>
<p>1. Go to <strong>Microsoft Endpoint Manager admin center</strong> &gt; <strong>Devices </strong>&gt; <strong>Enroll devices </strong>&gt; <strong>Android enrollment</strong> &gt; <strong>Managed Google Play</strong>. Click <strong>I agree</strong> &gt; <strong>Launch Google to connect now</strong>.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/m0BYhL2/Connect-Intune-to-Google-Play.png" alt="Connect Intune to Google Play" style="height: auto;width: auto"/></div>
<p>2. Follow the prompts to sign in and set up your Android to Work account. Once you're complete you'll see a notification saying "Managed Google Play successfully configured with tenant" and you'll notice the Enrollment profiles are unlocked.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/0MYCVd1/Configure-Google-Play-integration-to-Intune.png" alt="Screenshot after Google Play is integrated with Intune" style="height: auto;width: auto"/></div>
<h2>The many ways to set up an Android device</h2>
<p>So now we’re ready to finally set up our first Android device. Or are we? Before we can set up our first Android device, we need to discuss one last thing, how do you want to configure the device?</p>
<h3>Ownership: personal vs corporate</h3>
<p>In short, Android has a couple of options. First, the device can be personally owned or corporate-owned. In short, did the user bring their own device or did the company buy the device and give it to the user? If the device is personally owned, then the device will automatically receive a work profile. In short, the user can continue to use their personal apps and device like they normally would, and the work apps go in a separate container on the phone. The device will even have a managed Google Play store app so users can download apps to the workspace. Only apps that you have allowed will show up in the managed Google Play app store.</p>
<p>With corporate-owned devices a bit more information is available to the admins. Intune will collect the following information on corporate-owned devices but won’t gather the information for personally owned devices:</p>
<ul>
<li>Phone number</li>
<li>App inventory</li>
</ul>
<p>By default, devices enrolled in Intune are considered personally owned. To convert a device to corporate ownership you must perform one of the following:</p>
<ul>
<li>Setup up the fresh factory reset device to be corporate-owned.</li>
<li>Set the device serial number inside Intune prior to enrollment.</li>
<li>Have an Intune administrator manually convert the device from personally owned to corporate-owned.</li>
</ul>
<h3>Android Enterprise: Corporate-owned fully managed user devices</h3>
<p>In this configuration, the device is owned by the corporation but is given to an individual. With corporate-owned fully managed user devices, there isn’t a personal / work profile on the device. There’s only a work profile. So, the user doesn’t have to understand the difference. Also, the Managed Google Play store is the only store available. So, the user cannot install apps and games on the device unless you’ve made them available in the managed Google Play store.</p>
<h3>Android Enterprise: Corporate-owned devices with work profile</h3>
<p>In this configuration, the device is owned by the corporation but is given to an individual. With corporate-owned devices with a work profile, the device is split between the work profile and personal, just like the devices when they are personally owned devices with a work profile. If you have a mix of personally owned and corporate-owned devices I’d recommend using this policy.</p>
<h3>Android Enterprise: Corporate-owned dedicated devices</h3>
<p>Corporate-owned dedicated devices are set up for devices that do not have a personal owner. For example, you may have a tablet in the conference room that anyone that uses the conference room has access to the tablet. With corporate-owned dedicated devices, users won’t be able to install any apps on the device. The only apps that will be installed are required apps that are pushed to devices.</p>
<h3>How to set up corporate-owned Android devices</h3>
<p>Since setting up devices isn't covered under the MS-500 I'll be skipping this section but a quick FYI: to set up a device as corporate-owned you need to set up the enrollment. Go to <strong>Microsoft Endpoint Manager admin center</strong> &gt; <strong>Devices </strong>&gt; <strong>Enroll devices</strong> &gt; <strong>Android enrollment</strong> and set up the enrollment profile you want to use.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/XFMW3Rq/android-enrollment-profiles-in-intune.png" alt="Android enrollment profiles in Intune" style="height: auto;width: auto"/></div>
<h2>How to enroll an Android personally owned device</h2>
<p>Enrolling an Android personally owned device is simple. And there’s no setup on the back end. Have the user perform the following steps on their device:</p>
<p>1.	Open the <strong>Google Play store</strong> and search for <strong>Intune Company Portal</strong>. <strong>Install </strong>the app.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/t4hRjRG/Android-Intune-App-Install.png" alt="Android Intune App Install" style="height: auto;width: auto"/></div>
<p>2.	Once installed, open the app. Click <strong>Sign in</strong>. Enter your <strong>company username and password</strong>. If prompted complete the MFA.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/gPpYtnK/sign-in-to-Android-Intune.png" alt="Sign in to Intune on your Android device" style="height: auto;width: auto"/></div>
<p>4.	Click <strong>Devices </strong>&gt; <strong>My Android</strong>.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/NscHw05/My-Android.png" alt="My Android" style="height: auto;width: auto"/></div>
<p>5.	Click <strong>This device is not managed</strong>.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/2WJfSxp/This-device-is-not-managed.png" alt="This device is not managed" style="height: auto;width: auto"/></div>
<p>6.	Click <strong>Begin</strong> &gt; <strong>Continue </strong>&gt; <strong>Accept &amp; continue</strong> &gt; <strong>Next </strong>&gt; <strong>Continue </strong>&gt; <strong>Done </strong>&gt; <strong>Got it</strong>.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/jDFJK9g/Set-up-Intune-on-an-Android-device.png" alt="Set up Intune on an Android device" style="height: auto;width: auto"/></div>
<p></p>
`,
      nextContentSlug: 'Setting-up-Apple--iOS-devices-in-Intune-MAjW0a2_p',
      previousContentSlug: 'Introduction-to-Intune-7gR3L122b',
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
