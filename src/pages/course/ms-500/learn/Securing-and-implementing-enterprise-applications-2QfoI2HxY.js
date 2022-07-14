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
      course: {"title":"Training for MS-500: Microsoft Office 365 Security Admin","id":"MS-500","sections":[{"order":0,"title":"Introduction","id":"qwJW5VrBW"},{"title":"Securing identity and access to Microsoft 365","order":1,"id":"AFV_acckJ"},{"order":2,"id":"QScYfSu74","title":"Securing Microsoft 365, clouds, and on-premises environments"},{"order":3,"title":"Protecting your environment from accidental and malicious data loss","id":"YhftdGIRX"},{"title":"Protecting User devices using Intune","order":4,"id":"l0DxUuonW"}],"audience":"Anyone who wants to learn about securing Microsoft 365","description":"Learn, prepare and training for the Microsoft Microsoft Office 365 Exam MS-500: Microsoft 365 Security Administration MS-500 exam","contentOrder":["cpchjBLkC","KKkBOVuS4","bzotoOjEe","cg_vxOX9L","uYCIPbnMC","7CpqFkPZU","rZzausKJ1","ky5W0Lz5P","i9pJIjTNH","S1hQgFOMV","2QfoI2HxY","V1en9Iugh","nAAIvNbtk","2S9jn0aLr","FldNualGC","NFQ6rYFeQ","rK48f6iM2","RHW1API2s","z8EMM9Eu_","Kye_yNLxA","EnPyp7ukN","6HUOr7qbL","GCOOUsSBT","GG4cMY8pK","z0qPG6v4T","LEyZMWBSt","7MQ3wE4wP","sH_Ee1DW1","vLweLmxZf","NsF7No40f","IsPGsme8w","wv2PbXnhI","7gR3L122b","ZyKX3Idjs","MAjW0a2_p","XFXu2zIS9","_LL9VqGZO","qDRA4jjoN","62t_7oiZx"]},
      article: {"title":"Securing and implementing enterprise applications","datePublished":"2022/5/26","images":["https://i.ibb.co/6wc4hND/3rd-party-app-consent-request.png","https://i.ibb.co/6HwM4Zg/review-app-access.png","https://i.ibb.co/3fVnBjt/enterprise-app-permissions.png","https://i.ibb.co/C2mp69m/disable-user-consent.png","https://i.ibb.co/7RN0X5v/zoho-office-login.png","https://i.ibb.co/BBN6L3x/request-app-access.png","https://i.ibb.co/Q8dh29f/admin-review-email.png","https://i.ibb.co/DbBfrF4/review-app-access-requests.png","https://i.ibb.co/wQqYW6B/review-permissions-and-consent.png","https://i.ibb.co/rxSkbBQ/approve-access.png","https://i.ibb.co/RSwm2wQ/approved-email.png","https://i.ibb.co/vsv7Cyn/allow-user-consent-for-apps.png","https://i.ibb.co/16wXQjb/add-most-used-auto-approved-permissions.png"],"article":{"blocks":[{"text":"Did you know your users can grant third-party apps consent to your Microsoft 365 tenant? By default, all users can grant third-party apps access to your company data that they have access to. Enterprise applications are a fantastic way for you and your users to extend your Microsoft 365 tenant to third-party apps, but they can leave your company vulnerable. First, let's jump in and consent to a third-party app the way a user would.","depth":0,"key":"2l5rs","inlineStyleRanges":[],"type":"unstyled","data":{},"entityRanges":[]},{"text":"Granting third-party app access to your Microsoft 365 tenant","entityRanges":[],"depth":0,"type":"header-two","data":{},"inlineStyleRanges":[],"key":"320bq"},{"data":{},"text":"1. Go to https://techcommunity.microsoft.com/ ","depth":0,"key":"aobbf","entityRanges":[{"offset":9,"length":36,"key":0}],"inlineStyleRanges":[],"type":"unstyled"},{"data":{},"inlineStyleRanges":[{"offset":9,"length":7,"style":"BOLD"}],"depth":0,"key":"a7tql","entityRanges":[],"text":"2. Click Sign in found in the top right corner.","type":"unstyled"},{"type":"unstyled","data":{},"text":"3. Sign in using your Microsoft 365 credentials.","key":"2mu87","entityRanges":[],"depth":0,"inlineStyleRanges":[]},{"depth":0,"key":"fvlr0","inlineStyleRanges":[],"type":"unstyled","entityRanges":[],"text":"4. Next, you’ll see the permissions requested page. From here you see the permissions the app would like to access in your Microsoft 365 user account.","data":{}},{"text":"If you’re an admin you’ll also see a Consent on behalf of your organization.","key":"9j6no","data":{},"type":"unstyled","entityRanges":[],"inlineStyleRanges":[{"style":"BOLD","offset":37,"length":38}],"depth":0},{"inlineStyleRanges":[{"length":6,"style":"BOLD","offset":9}],"text":"5. Click Accept.","data":{},"type":"unstyled","key":"3vqng","entityRanges":[],"depth":0},{"type":"atomic","entityRanges":[{"key":1,"length":1,"offset":0}],"text":" ","inlineStyleRanges":[],"key":"2vkkp","data":{},"depth":0},{"inlineStyleRanges":[],"entityRanges":[],"type":"unstyled","key":"28jvi","text":"That’s it. Now Microsoft’s Tech Community can sign in as your user and read your user’s profile. Now, Microsoft’s Tech community is run by Microsoft so it’s a safe app to grant access to your tenant but what about other apps?","data":{},"depth":0},{"entityRanges":[],"inlineStyleRanges":[],"key":"m19n","type":"unstyled","data":{},"text":"A malicious individual could trick your users into granting apps access to your tenant that they shouldn’t have. So, we’ll need to manage and restrict what apps users can grant access to. Before we lock down the access let’s look at the apps that already have access to your tenant.","depth":0},{"key":"5o2qi","type":"header-two","data":{},"inlineStyleRanges":[],"text":"How to view third party app access to your Microsoft 365 tenant","entityRanges":[],"depth":0},{"data":{},"inlineStyleRanges":[{"length":21,"offset":9,"style":"BOLD"},{"offset":33,"style":"BOLD","length":23}],"type":"unstyled","key":"76jvd","entityRanges":[{"key":2,"offset":33,"length":23}],"depth":0,"text":"1. Go to Azure AD admin center > Enterprise applications. "},{"entityRanges":[],"inlineStyleRanges":[{"style":"BOLD","length":24,"offset":22}],"depth":0,"data":{},"text":"2. Find and click the Microsoft Tech Community app.","key":"ca8s2","type":"unstyled"},{"data":{},"key":"d18g9","text":" ","type":"atomic","depth":0,"entityRanges":[{"offset":0,"key":3,"length":1}],"inlineStyleRanges":[]},{"text":"3. By clicking Users and groups you can review who has given permissions to the app.","type":"unstyled","key":"dpoen","data":{},"inlineStyleRanges":[{"style":"BOLD","length":16,"offset":15}],"entityRanges":[],"depth":0},{"entityRanges":[],"data":{},"depth":0,"key":"6tslr","inlineStyleRanges":[{"style":"BOLD","length":12,"offset":15},{"length":12,"style":"BOLD","offset":29}],"text":"4. By clicking Permissions > User consent you can review what permissions have been given to the app.","type":"unstyled"},{"entityRanges":[{"key":4,"length":1,"offset":0}],"data":{},"text":" ","key":"crl96","depth":0,"type":"atomic","inlineStyleRanges":[]},{"inlineStyleRanges":[],"entityRanges":[],"key":"6ht9m","depth":0,"data":{},"text":"Block users from granting access to any apps","type":"header-two"},{"text":"The best way to protect your tenant is to require admins to approve any third-party applications before a user can consent. That way users can't grant malicious apps access to your Microsoft 365 data or tenant.","data":{},"type":"unstyled","entityRanges":[],"key":"9j24l","depth":0,"inlineStyleRanges":[]},{"entityRanges":[{"key":5,"offset":59,"length":13}],"inlineStyleRanges":[{"offset":9,"length":21,"style":"BOLD"},{"length":23,"offset":33,"style":"BOLD"},{"style":"BOLD","offset":59,"length":13}],"type":"unstyled","text":"1. Go to Azure AD admin center > Enterprise applications > User settings. ","key":"1q7ej","depth":0,"data":{}},{"text":"2. Click No in Users can consent to apps accessing company data on their behalf.","key":"2spc6","inlineStyleRanges":[{"offset":9,"style":"BOLD","length":3}],"entityRanges":[],"data":{},"depth":0,"type":"unstyled"},{"entityRanges":[],"depth":0,"text":"3. Click No in Users can consent to apps accessing company data for the groups they own.","inlineStyleRanges":[{"offset":9,"style":"BOLD","length":3}],"key":"172rc","type":"unstyled","data":{}},{"inlineStyleRanges":[{"style":"BOLD","offset":9,"length":4}],"type":"unstyled","key":"c8t2t","text":"4. Click Yes next to Users can request admin consent to apps they are unable to consent to.","entityRanges":[],"depth":0,"data":{}},{"text":"5. Click Add roles. Search for global. Click Select.","type":"unstyled","depth":0,"key":"3j1e7","data":{},"entityRanges":[],"inlineStyleRanges":[{"offset":9,"length":9,"style":"BOLD"},{"style":"BOLD","offset":31,"length":6},{"style":"BOLD","length":6,"offset":45}]},{"type":"unstyled","inlineStyleRanges":[{"length":4,"style":"BOLD","offset":9}],"data":{},"entityRanges":[],"depth":0,"text":"6. Click Save.","key":"a87uu"},{"key":"ajmni","type":"atomic","depth":0,"data":{},"inlineStyleRanges":[],"text":" ","entityRanges":[{"offset":0,"key":6,"length":1}]},{"type":"unstyled","depth":0,"text":"Now, users can request access to apps and a notification will go to your global admins. Let’s look at how that would work.","key":"30djb","entityRanges":[],"data":{},"inlineStyleRanges":[]},{"key":"9q92m","data":{},"type":"header-two","inlineStyleRanges":[],"text":"Require admin approval to allow an app access to Microsoft 365","depth":0,"entityRanges":[]},{"entityRanges":[{"offset":9,"key":7,"length":32}],"inlineStyleRanges":[],"key":"8bg3u","text":"1. Go to https://www.zoho.com/signup.html ","data":{},"type":"unstyled","depth":0},{"entityRanges":[],"inlineStyleRanges":[],"depth":0,"text":"2. Click the Office button.","type":"unstyled","data":{},"key":"11n62"},{"key":"3l8oa","type":"atomic","data":{},"entityRanges":[{"length":1,"offset":0,"key":8}],"depth":0,"inlineStyleRanges":[],"text":" "},{"inlineStyleRanges":[],"entityRanges":[],"depth":0,"type":"unstyled","data":{},"text":"3. Login with a regular user account.","key":"2s6n3"},{"type":"unstyled","text":"4. Enter a justification reason and click Request approval.","data":{},"key":"4ghk9","inlineStyleRanges":[{"offset":42,"style":"BOLD","length":16}],"entityRanges":[],"depth":0},{"key":"d00v3","text":" ","type":"atomic","data":{},"entityRanges":[{"offset":0,"key":9,"length":1}],"depth":0,"inlineStyleRanges":[]},{"entityRanges":[],"key":"8q7l8","data":{},"depth":0,"text":"At this point, the admins will receive an email saying they need to review the consent. ","inlineStyleRanges":[{"style":"color-rgb(33,37,41)","length":87,"offset":0},{"offset":0,"length":87,"style":"bgcolor-rgb(255,255,255)"},{"style":"fontsize-16","offset":0,"length":87},{"style":"fontfamily-system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", \"Liberation Sans\", sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji","length":87,"offset":0}],"type":"unstyled"},{"data":{},"key":"9jfjb","depth":0,"entityRanges":[],"inlineStyleRanges":[{"length":14,"offset":9,"style":"BOLD"}],"type":"unstyled","text":"1. Click Review request."},{"entityRanges":[{"offset":0,"key":10,"length":1}],"text":" ","type":"atomic","depth":0,"inlineStyleRanges":[],"key":"4kuad","data":{}},{"entityRanges":[],"inlineStyleRanges":[],"key":"brheh","text":"2. Click the app that requests approval.","depth":0,"data":{},"type":"unstyled"},{"depth":0,"text":" ","inlineStyleRanges":[],"key":"1mjua","type":"atomic","entityRanges":[{"key":11,"length":1,"offset":0}],"data":{}},{"text":"3. Click Review permissions and consent.","key":"ccjd0","type":"unstyled","depth":0,"data":{},"entityRanges":[],"inlineStyleRanges":[{"length":30,"style":"BOLD","offset":9}]},{"inlineStyleRanges":[],"text":" ","type":"atomic","key":"aq570","depth":0,"data":{},"entityRanges":[{"key":12,"offset":0,"length":1}]},{"key":"2s505","text":"4. Click Accept.","depth":0,"entityRanges":[],"data":{},"type":"unstyled","inlineStyleRanges":[{"offset":9,"length":6,"style":"BOLD"}]},{"entityRanges":[{"offset":0,"length":1,"key":13}],"depth":0,"inlineStyleRanges":[],"key":"2ndvb","data":{},"text":" ","type":"atomic"},{"data":{},"depth":0,"type":"unstyled","inlineStyleRanges":[],"text":"Once you click to accept the user will receive an email saying the access has been approved. Then the user can go back to the third-party app and gain access using their Microsoft 365 tenant account.","entityRanges":[],"key":"6vill"},{"key":"5nl0n","inlineStyleRanges":[],"text":" ","type":"atomic","data":{},"depth":0,"entityRanges":[{"length":1,"key":14,"offset":0}]},{"data":{},"key":"cjccl","type":"header-two","inlineStyleRanges":[],"text":"Auto-approval","depth":0,"entityRanges":[]},{"depth":0,"entityRanges":[],"text":"Now you may be wondering how many requests you’ll receive. If you are in a smaller organization then chances are you won’t receive too many and you’ll be fine. If you’re in a larger organization, you may receive a lot of requests. That’s not good. You’ll be constantly approving apps even though they may not need many permissions. Let’s set up auto-approval for verified publishers that request a few permissions.","data":{},"key":"3oi9b","inlineStyleRanges":[],"type":"unstyled"},{"type":"unstyled","data":{},"depth":0,"key":"arl2s","inlineStyleRanges":[{"offset":9,"length":21,"style":"BOLD"},{"style":"BOLD","length":23,"offset":33},{"offset":59,"style":"BOLD","length":24}],"entityRanges":[{"offset":59,"length":23,"key":15}],"text":"1. Go to Azure AD admin center > Enterprise applications > Consent and permissions ."},{"data":{},"key":"7c8c5","type":"unstyled","depth":0,"entityRanges":[],"text":"2. Click Allow user consent for apps from verified publishers, for selected permissions. Click Save","inlineStyleRanges":[{"length":78,"offset":9,"style":"BOLD"},{"length":4,"style":"BOLD","offset":95}]},{"data":{},"type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":9,"length":48,"style":"BOLD"}],"text":"3. Click Select permissions to classify as minimal impact.","key":"3i9rt","entityRanges":[]},{"key":"5s3ge","text":" ","inlineStyleRanges":[],"data":{},"entityRanges":[{"key":16,"offset":0,"length":1}],"type":"atomic","depth":0},{"inlineStyleRanges":[{"offset":57,"length":29,"style":"BOLD"}],"text":"4. Click the permissions you want to auto-approve. Click Yes, add selected permissions.","type":"unstyled","key":"4m647","data":{},"depth":0,"entityRanges":[]},{"data":{},"type":"atomic","text":" ","depth":0,"key":"r0jr","inlineStyleRanges":[],"entityRanges":[{"key":17,"offset":0,"length":1}]},{"type":"unstyled","inlineStyleRanges":[],"text":"","entityRanges":[],"data":{},"depth":0,"key":"aae8f"}],"entityMap":{"0":{"mutability":"MUTABLE","type":"LINK","data":{"url":"https://techcommunity.microsoft.com/","targetOption":"_blank"}},"1":{"data":{"width":"auto","alt":"3rd party app consenting request","height":"auto","src":"https://i.ibb.co/6wc4hND/3rd-party-app-consent-request.png","alignment":"none"},"type":"IMAGE","mutability":"MUTABLE"},"2":{"data":{"url":"https://aad.portal.azure.com/#blade/Microsoft_AAD_IAM/StartboardApplicationsMenuBlade/AllApps","targetOption":"_blank"},"type":"LINK","mutability":"MUTABLE"},"3":{"mutability":"MUTABLE","data":{"alignment":"none","alt":"Review app access","height":"auto","width":"auto","src":"https://i.ibb.co/6HwM4Zg/review-app-access.png"},"type":"IMAGE"},"4":{"type":"IMAGE","mutability":"MUTABLE","data":{"width":"auto","alt":"Enterprise app permissions in Azure AD","height":"auto","alignment":"none","src":"https://i.ibb.co/3fVnBjt/enterprise-app-permissions.png"}},"5":{"data":{"url":"https://aad.portal.azure.com/#blade/Microsoft_AAD_IAM/StartboardApplicationsMenuBlade/UserSettings","targetOption":"_blank"},"type":"LINK","mutability":"MUTABLE"},"6":{"type":"IMAGE","mutability":"MUTABLE","data":{"alignment":"none","height":"auto","alt":"Disable user consent and require an admin to approve","width":"auto","src":"https://i.ibb.co/C2mp69m/disable-user-consent.png"}},"7":{"type":"LINK","mutability":"MUTABLE","data":{"targetOption":"_blank","url":"https://www.zoho.com/signup.html"}},"8":{"type":"IMAGE","mutability":"MUTABLE","data":{"alignment":"none","alt":"Zoho Office login","width":"auto","height":"auto","src":"https://i.ibb.co/7RN0X5v/zoho-office-login.png"}},"9":{"mutability":"MUTABLE","data":{"height":"auto","width":"auto","alt":"App requesting access to Microsoft 365","alignment":"none","src":"https://i.ibb.co/BBN6L3x/request-app-access.png"},"type":"IMAGE"},"10":{"data":{"alignment":"none","width":"auto","src":"https://i.ibb.co/Q8dh29f/admin-review-email.png","alt":"Admins receiving notification user wants app access","height":"auto"},"mutability":"MUTABLE","type":"IMAGE"},"11":{"data":{"alignment":"left","height":"auto","alt":"Review app access requests","width":"auto","src":"https://i.ibb.co/DbBfrF4/review-app-access-requests.png"},"mutability":"MUTABLE","type":"IMAGE"},"12":{"type":"IMAGE","data":{"alignment":"none","width":"auto","height":"auto","alt":"Review 3rd party app access request","src":"https://i.ibb.co/wQqYW6B/review-permissions-and-consent.png"},"mutability":"MUTABLE"},"13":{"mutability":"MUTABLE","type":"IMAGE","data":{"src":"https://i.ibb.co/rxSkbBQ/approve-access.png","height":"auto","alignment":"none","width":"auto","alt":"Approve access to third-party app"}},"14":{"data":{"alt":"third-party app approved","height":"auto","alignment":"none","src":"https://i.ibb.co/RSwm2wQ/approved-email.png","width":"auto"},"type":"IMAGE","mutability":"MUTABLE"},"15":{"data":{"targetOption":"_blank","url":"https://aad.portal.azure.com/#blade/Microsoft_AAD_IAM/ConsentPoliciesMenuBlade/UserSettings"},"type":"LINK","mutability":"MUTABLE"},"16":{"data":{"src":"https://i.ibb.co/vsv7Cyn/allow-user-consent-for-apps.png","alignment":"none","width":"auto","alt":"auto-approve apps with minimal impact","height":"auto"},"type":"IMAGE","mutability":"MUTABLE"},"17":{"data":{"width":"auto","alignment":"none","height":"auto","alt":"Select permissions to auto-approve","src":"https://i.ibb.co/16wXQjb/add-most-used-auto-approved-permissions.png"},"mutability":"MUTABLE","type":"IMAGE"}}},"description":"Did you know users may give malicious apps access to your Microsoft 365 tenant? Protect your organization from compromised enterprise apps.","slug":"Securing-and-implementing-enterprise-applications-2QfoI2HxY","publish":true,"type":"article","id":"2QfoI2HxY","featuredImage":"https://i.ibb.co/C2mp69m/disable-user-consent.png","sectionId":"AFV_acckJ"},
      articles: [{"id":"cpchjBLkC","sectionId":"qwJW5VrBW","slug":"Whats-in-this-course-cpchjBLkC","title":"What's in this course?","featuredImage":"https://i.ibb.co/zFs9Vfb/microsoft365-security-administrator-associate-600x600.png"},{"id":"KKkBOVuS4","sectionId":"qwJW5VrBW","slug":"Creating-a-free-Microsoft-365-tenant-for-practice-KKkBOVuS4","title":"Creating a free Microsoft 365 tenant for practice","featuredImage":"https://i.ibb.co/F07sjQJ/microsoft-365-e5-trial.png"},{"id":"bzotoOjEe","sectionId":"qwJW5VrBW","slug":"Managing-the-Microsoft-365-tenant-Introduction-to-the-admin-centers-bzotoOjEe","title":"Managing the Microsoft 365 tenant - Introduction to the admin centers","featuredImage":"https://i.ibb.co/f1cr4zt/Microsoft-365-admin-centers.png"},{"id":"cg_vxOX9L","sectionId":"qwJW5VrBW","slug":"Managing-Microsoft-365-through-PowerShell-cg_vxOX9L","title":"Managing Microsoft 365 through PowerShell","featuredImage":"https://i.ibb.co/HV13YF6/install-microsoft-365-powershell-modules.png"},{"id":"uYCIPbnMC","sectionId":"AFV_acckJ","slug":"How-to-create-users-in-Microsoft-365-Cloud-Only-uYCIPbnMC","title":"How to create users in Microsoft 365 Cloud Only","featuredImage":"https://i.ibb.co/Wnt5Q43/View-Microsoft-365-Users.png"},{"id":"7CpqFkPZU","sectionId":"AFV_acckJ","slug":"Creating-and-managing-admins-through-roles-7CpqFkPZU","title":"Creating and managing admins through roles","featuredImage":"https://i.ibb.co/kySL4HQ/Roles-and-administrators.png"},{"id":"rZzausKJ1","sectionId":"AFV_acckJ","slug":"Time-limited-admin-roles-in-Microsoft-365-rZzausKJ1","title":"Time limited admin roles in Microsoft 365","featuredImage":"https://i.ibb.co/nDvjyPD/select-member-to-add-to-PIM-role.png"},{"id":"ky5W0Lz5P","sectionId":"AFV_acckJ","slug":"Whats-AD-Connect-ky5W0Lz5P","title":"What's AD Connect","featuredImage":"https://i.ibb.co/7nDqr9x/Whats-AD-Connect.png"},{"id":"i9pJIjTNH","sectionId":"AFV_acckJ","slug":"Protecting-Passwords-in-Microsoft-365-i9pJIjTNH","title":"Protecting Passwords in Microsoft 365","featuredImage":"https://i.ibb.co/DLD4G4q/access-smart-lockout-settings.png"},{"id":"S1hQgFOMV","sectionId":"AFV_acckJ","slug":"Creating-and-managing-users-through-groups-S1hQgFOMV","title":"Creating and managing users through groups","featuredImage":"https://i.ibb.co/nmmC28M/add-a-group-microsoft-365.png"},{"id":"2QfoI2HxY","sectionId":"AFV_acckJ","slug":"Securing-and-implementing-enterprise-applications-2QfoI2HxY","title":"Securing and implementing enterprise applications","featuredImage":"https://i.ibb.co/C2mp69m/disable-user-consent.png"},{"id":"V1en9Iugh","sectionId":"AFV_acckJ","slug":"Whats-a-conditional-access-policy-V1en9Iugh","title":"What's a conditional access policy?","featuredImage":"https://i.ibb.co/DQm1sY0/Create-conditional-access-policy.png"},{"id":"nAAIvNbtk","sectionId":"AFV_acckJ","slug":"The-many-ways-to-implement-multi-factor-authentication-MFA-in-Microsoft-365-nAAIvNbtk","title":"The many ways to implement multi-factor authentication (MFA) in Microsoft 365","featuredImage":"https://i.ibb.co/P1P0wNY/microsoft-365-manage-security-defaults.png"},{"id":"2S9jn0aLr","sectionId":"AFV_acckJ","slug":"Implement-Self-service-password-reset-in-Microsoft-365-2S9jn0aLr","title":"Implement Self-service password reset in Microsoft 365","featuredImage":"https://i.ibb.co/58y9JVg/write-back-passwords-to-on-premises-directory.png"},{"id":"FldNualGC","sectionId":"AFV_acckJ","slug":"Locking-down-your-Microsoft-365-tenant-from-Microsoft-engineers-FldNualGC","title":"Locking down your Microsoft 365 tenant from Microsoft engineers","featuredImage":"https://i.ibb.co/DCmpnT9/Enable-Customer-Lockbox.png"},{"id":"NFQ6rYFeQ","sectionId":"AFV_acckJ","slug":"Implementing-intelligent-security-using-risk-policies-in-Microsoft-365-NFQ6rYFeQ","title":"Implementing intelligent security using risk policies in Microsoft 365","featuredImage":"https://i.ibb.co/0cyQJ7j/Risk-Detections.png"},{"id":"rK48f6iM2","sectionId":"AFV_acckJ","slug":"Automating-Access-Review-in-Microsoft-365-rK48f6iM2","title":"Automating Access Review in Microsoft 365","featuredImage":"https://i.ibb.co/Xsxvz6Z/new-access-review.png"},{"id":"RHW1API2s","sectionId":"AFV_acckJ","slug":"Just-in-time-approval-and-notification-for-admin-roles-in-Microsoft-365-RHW1API2s","title":"Just in time, approval and notification for admin roles in Microsoft 365","featuredImage":"https://i.ibb.co/dcb6XFN/Activate-a-Role.png"},{"id":"z8EMM9Eu_","sectionId":"QScYfSu74","slug":"Whats-Microsoft-365-Defender-z8EMM9Eu_","title":"What's Microsoft 365 Defender?","featuredImage":"https://i.ibb.co/MDMyDQt/Microsoft-Defender.png"},{"id":"Kye_yNLxA","sectionId":"QScYfSu74","slug":"Whats-Microsoft-Defender-for-identity-Kye_yNLxA","title":"What's Microsoft Defender for identity?","featuredImage":"https://i.ibb.co/bQDBh0Y/Defender-for-Identity-Timeline.png"},{"id":"EnPyp7ukN","sectionId":"QScYfSu74","slug":"Whats-Microsoft-Defender-for-Office-365-EnPyp7ukN","title":"What's Microsoft Defender for Office 365?","featuredImage":"https://i.ibb.co/WcwKY2G/Microsoft-365-incidents-and-alerts.png"},{"id":"6HUOr7qbL","sectionId":"QScYfSu74","slug":"Protect-your-email-environment-from-malicious-actors-6HUOr7qbL","title":"Protect your email and Office environment from malicious actors","featuredImage":"https://i.ibb.co/Df0KQVp/Reports.png"},{"id":"GCOOUsSBT","sectionId":"QScYfSu74","slug":"Protecting-email-against-phishing-attacks-GCOOUsSBT","title":"Protecting email against phishing attacks","featuredImage":"https://i.ibb.co/GCjZHWg/edit-actions.png"},{"id":"GG4cMY8pK","sectionId":"QScYfSu74","slug":"Simulating-attacks-with-Microsoft-365-GG4cMY8pK","title":"Simulating attacks with Microsoft 365","featuredImage":"https://i.ibb.co/NyvnbMK/simulation-overview-view-users-circled.png"},{"id":"z0qPG6v4T","sectionId":"QScYfSu74","slug":"Protecting-Windows-10-and-other-devices-with-Microsoft-Defender-for-Endpoint-z0qPG6v4T","title":"Protecting Windows 10 and other devices with Microsoft Defender for Endpoint","featuredImage":"https://i.ibb.co/T47Xhyh/enable-endpoint-connections.png"},{"id":"LEyZMWBSt","sectionId":"QScYfSu74","slug":"Collect-detect-investigate-and-respond-to-security-threats-using-Microsoft-Sentinel-LEyZMWBSt","title":"Collect, detect, investigate, and respond to security threats using Microsoft Sentinel","featuredImage":"https://i.ibb.co/qN9XsKj/Add-Workbook.png"},{"id":"7MQ3wE4wP","sectionId":"QScYfSu74","slug":"Implement-and-manage-Microsoft-Defender-for-Cloud-Apps-7MQ3wE4wP","title":"Implement and manage Microsoft Defender for Cloud Apps","featuredImage":"https://i.ibb.co/7g7LvFg/office-365-cloud-apps-settings.png"},{"id":"sH_Ee1DW1","sectionId":"QScYfSu74","slug":"Auditing-sign-ins-and-other-actions-in-Microsoft-365-sH_Ee1DW1","title":"Auditing sign-ins and other actions in Microsoft 365","featuredImage":"https://i.ibb.co/BqMw3jZ/Start-recording-user-and-admin-activity.png"},{"id":"vLweLmxZf","sectionId":"YhftdGIRX","slug":"How-to-classify-data-using-labels-in-Microsoft-365-vLweLmxZf","title":"How to classify data using labels in Microsoft 365","featuredImage":"https://i.ibb.co/k9nhWS5/Choose-protection-settings-for-files-and-emails.png"},{"id":"NsF7No40f","sectionId":"YhftdGIRX","slug":"Creating-and-managing-data-retention-to-conform-to-compliance-NsF7No40f","title":"Creating and managing data retention to conform to compliance","featuredImage":"https://i.ibb.co/yqC0ZdY/New-Retention-Policy.png"},{"id":"IsPGsme8w","sectionId":"YhftdGIRX","slug":"Preventing-accidental-and-malicious-data-loss-with-DLP-policies-IsPGsme8w","title":"Preventing accidental and malicious data loss with DLP policies","featuredImage":"https://i.ibb.co/n8WcqKM/Create-a-DLP-policy.png"},{"id":"wv2PbXnhI","sectionId":"YhftdGIRX","slug":"Everything-you-need-to-know-about-securing-SharePoint-Online-for-the-MS-500-wv2PbXnhI","title":"Everything you need to know about securing SharePoint Online for the MS-500","featuredImage":"https://i.ibb.co/Gk9NjSH/Share-Point-Online-Warning.png"},{"id":"7gR3L122b","sectionId":"l0DxUuonW","slug":"Introduction-to-Intune-7gR3L122b","title":"Introduction to Intune","featuredImage":"https://i.ibb.co/Fq3N8BX/Endpoint-Manager-Admin-Center.png"},{"id":"ZyKX3Idjs","sectionId":"l0DxUuonW","slug":"Setting-up-Android-Devices-ZyKX3Idjs","title":"Setting up Android Devices","featuredImage":"https://i.ibb.co/m0BYhL2/Connect-Intune-to-Google-Play.png"},{"id":"MAjW0a2_p","sectionId":"l0DxUuonW","slug":"Setting-up-Apple--iOS-devices-in-Intune-MAjW0a2_p","title":"Setting up Apple / iOS devices in Intune","featuredImage":"https://i.ibb.co/X7Ffb2B/Setup-Apple-Enrollment-in-Intune.png"},{"id":"XFXu2zIS9","sectionId":"l0DxUuonW","slug":"Setting-up-Windows-10-devices-in-Intune-XFXu2zIS9","title":"Setting up Windows 10 devices in Intune","featuredImage":"https://i.ibb.co/WDXKVjW/configure-device-options.png"},{"id":"_LL9VqGZO","sectionId":"l0DxUuonW","slug":"How-to-manage-devices-using-Intune-_LL9VqGZO","title":"How to manage devices using Intune","featuredImage":"https://i.ibb.co/HPQ2m8t/Create-an-endpoint-protection-profile.png"},{"id":"qDRA4jjoN","sectionId":"l0DxUuonW","slug":"Understanding-compliance-policies-qDRA4jjoN","title":"Understanding compliance policies","featuredImage":"https://i.ibb.co/N3Qk57v/Create-a-compliance-policy.png"},{"id":"62t_7oiZx","sectionId":"l0DxUuonW","slug":"Restricting-and-managing-apps-on-user-devices-62t_7oiZx","title":"Restricting and managing apps on user devices","featuredImage":"https://i.ibb.co/PCVRKDf/Add-an-Android-app-to-Intune.png"}],
      articleHtml: `<p>Did you know your users can grant third-party apps consent to your Microsoft 365 tenant? By default, all users can grant third-party apps access to your company data that they have access to. Enterprise applications are a fantastic way for you and your users to extend your Microsoft 365 tenant to third-party apps, but they can leave your company vulnerable. First, let's jump in and consent to a third-party app the way a user would.</p>
<h2>Granting third-party app access to your Microsoft 365 tenant</h2>
<p>1. Go to <a href="https://techcommunity.microsoft.com/" target="_blank">https://techcommunity.microsoft.com/</a>&nbsp;</p>
<p>2. Click <strong>Sign in</strong> found in the top right corner.</p>
<p>3. Sign in using your Microsoft 365 credentials.</p>
<p>4. Next, you’ll see the permissions requested page. From here you see the permissions the app would like to access in your Microsoft 365 user account.</p>
<p>If you’re an admin you’ll also see a <strong>Consent on behalf of your organization</strong>.</p>
<p>5. Click <strong>Accept</strong>.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/6wc4hND/3rd-party-app-consent-request.png" alt="3rd party app consenting request" style="height: auto;width: auto"/></div>
<p>That’s it. Now Microsoft’s Tech Community can sign in as your user and read your user’s profile. Now, Microsoft’s Tech community is run by Microsoft so it’s a safe app to grant access to your tenant but what about other apps?</p>
<p>A malicious individual could trick your users into granting apps access to your tenant that they shouldn’t have. So, we’ll need to manage and restrict what apps users can grant access to. Before we lock down the access let’s look at the apps that already have access to your tenant.</p>
<h2>How to view third party app access to your Microsoft 365 tenant</h2>
<p>1. Go to <strong>Azure AD admin center</strong> &gt; <a href="https://aad.portal.azure.com/#blade/Microsoft_AAD_IAM/StartboardApplicationsMenuBlade/AllApps" target="_blank"><strong>Enterprise applications</strong></a>.&nbsp;</p>
<p>2. Find and click the <strong>Microsoft Tech Community</strong> app.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/6HwM4Zg/review-app-access.png" alt="Review app access" style="height: auto;width: auto"/></div>
<p>3. By clicking <strong>Users and groups</strong> you can review who has given permissions to the app.</p>
<p>4. By clicking <strong>Permissions </strong>&gt; <strong>User consent</strong> you can review what permissions have been given to the app.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/3fVnBjt/enterprise-app-permissions.png" alt="Enterprise app permissions in Azure AD" style="height: auto;width: auto"/></div>
<h2>Block users from granting access to any apps</h2>
<p>The best way to protect your tenant is to require admins to approve any third-party applications before a user can consent. That way users can't grant malicious apps access to your Microsoft 365 data or tenant.</p>
<p>1. Go to <strong>Azure AD admin center</strong> &gt; <strong>Enterprise applications</strong> &gt; <a href="https://aad.portal.azure.com/#blade/Microsoft_AAD_IAM/StartboardApplicationsMenuBlade/UserSettings" target="_blank"><strong>User settings</strong></a>.&nbsp;</p>
<p>2. Click <strong>No </strong>in Users can consent to apps accessing company data on their behalf.</p>
<p>3. Click <strong>No </strong>in Users can consent to apps accessing company data for the groups they own.</p>
<p>4. Click <strong>Yes </strong>next to Users can request admin consent to apps they are unable to consent to.</p>
<p>5. Click <strong>Add roles</strong>. Search for <strong>global</strong>. Click <strong>Select</strong>.</p>
<p>6. Click <strong>Save</strong>.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/C2mp69m/disable-user-consent.png" alt="Disable user consent and require an admin to approve" style="height: auto;width: auto"/></div>
<p>Now, users can request access to apps and a notification will go to your global admins. Let’s look at how that would work.</p>
<h2>Require admin approval to allow an app access to Microsoft 365</h2>
<p>1. Go to <a href="https://www.zoho.com/signup.html" target="_blank">https://www.zoho.com/signup.html</a>&nbsp;</p>
<p>2. Click the Office button.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/7RN0X5v/zoho-office-login.png" alt="Zoho Office login" style="height: auto;width: auto"/></div>
<p>3. Login with a regular user account.</p>
<p>4. Enter a justification reason and click <strong>Request approval</strong>.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/BBN6L3x/request-app-access.png" alt="App requesting access to Microsoft 365" style="height: auto;width: auto"/></div>
<p><span style="color: rgb(33,37,41);background-color: rgb(255,255,255);font-size: 16px;font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;">At this point, the admins will receive an email saying they need to review the consent.</span>&nbsp;</p>
<p>1. Click <strong>Review request</strong>.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/Q8dh29f/admin-review-email.png" alt="Admins receiving notification user wants app access" style="height: auto;width: auto"/></div>
<p>2. Click the app that requests approval.</p>
<div style="text-align:left;"><img src="https://i.ibb.co/DbBfrF4/review-app-access-requests.png" alt="Review app access requests" style="height: auto;width: auto"/></div>
<p>3. Click <strong>Review permissions and consent</strong>.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/wQqYW6B/review-permissions-and-consent.png" alt="Review 3rd party app access request" style="height: auto;width: auto"/></div>
<p>4. Click <strong>Accept</strong>.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/rxSkbBQ/approve-access.png" alt="Approve access to third-party app" style="height: auto;width: auto"/></div>
<p>Once you click to accept the user will receive an email saying the access has been approved. Then the user can go back to the third-party app and gain access using their Microsoft 365 tenant account.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/RSwm2wQ/approved-email.png" alt="third-party app approved" style="height: auto;width: auto"/></div>
<h2>Auto-approval</h2>
<p>Now you may be wondering how many requests you’ll receive. If you are in a smaller organization then chances are you won’t receive too many and you’ll be fine. If you’re in a larger organization, you may receive a lot of requests. That’s not good. You’ll be constantly approving apps even though they may not need many permissions. Let’s set up auto-approval for verified publishers that request a few permissions.</p>
<p>1. Go to <strong>Azure AD admin center</strong> &gt; <strong>Enterprise applications</strong> &gt; <a href="https://aad.portal.azure.com/#blade/Microsoft_AAD_IAM/ConsentPoliciesMenuBlade/UserSettings" target="_blank"><strong>Consent and permissions</strong></a><strong> </strong>.</p>
<p>2. Click <strong>Allow user consent for apps from verified publishers, for selected permissions</strong>. Click <strong>Save</strong></p>
<p>3. Click <strong>Select permissions to classify as minimal impact</strong>.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/vsv7Cyn/allow-user-consent-for-apps.png" alt="auto-approve apps with minimal impact" style="height: auto;width: auto"/></div>
<p>4. Click the permissions you want to auto-approve. Click <strong>Yes, add selected permissions</strong>.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/16wXQjb/add-most-used-auto-approved-permissions.png" alt="Select permissions to auto-approve" style="height: auto;width: auto"/></div>
<p></p>
`,
      nextContentSlug: 'Whats-a-conditional-access-policy-V1en9Iugh',
      previousContentSlug: 'Creating-and-managing-users-through-groups-S1hQgFOMV',
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
