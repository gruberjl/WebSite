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
      article: {"article":{"blocks":[{"key":"5tuqs","text":"So let's talk quickly about creating users in Microsoft 365. Every user in your organization that requires a mailbox or admin role will be required to have a user account. The easiest way to add a user account is by creating a single user account in Microsoft 365.","inlineStyleRanges":[],"data":{},"entityRanges":[],"type":"unstyled","depth":0},{"key":"3fuvg","depth":0,"type":"header-two","entityRanges":[],"data":{},"inlineStyleRanges":[],"text":"Add a single user account in Microsoft 365 admin center"},{"entityRanges":[{"key":0,"length":41,"offset":9}],"key":"asogk","text":"1. Go to Microsoft 365 admin center > active users page. Log in with your admin credentials.","inlineStyleRanges":[],"type":"unstyled","data":{},"depth":0},{"key":"a8br5","type":"unstyled","entityRanges":[],"data":{},"depth":0,"text":"2. Click Add a user","inlineStyleRanges":[]},{"entityRanges":[{"key":1,"length":1,"offset":0}],"inlineStyleRanges":[],"text":" ","depth":0,"data":{},"type":"atomic","key":"5ijjp"},{"text":"3. Enter the user's first name, last name, and username. On this page, you can also select if you want to automatically create a password or require the user to change the password at first login. Then click Next.","depth":0,"data":{},"entityRanges":[],"key":"a9vvh","type":"unstyled","inlineStyleRanges":[{"length":4,"style":"BOLD","offset":208}]},{"key":"buifr","type":"atomic","inlineStyleRanges":[],"depth":0,"text":" ","entityRanges":[{"offset":0,"length":1,"key":2}],"data":{}},{"key":"c7vt0","depth":0,"entityRanges":[],"inlineStyleRanges":[{"length":4,"style":"BOLD","offset":194}],"text":"4. On the next page, you select the license assignment. Once you check the license you want to assign you can view the apps associated with the license by clicking the apps dropdown. Then click Next.","type":"unstyled","data":{}},{"data":{},"entityRanges":[{"key":3,"length":1,"offset":0}],"type":"atomic","inlineStyleRanges":[],"key":"db2ud","depth":0,"text":" "},{"depth":0,"key":"fi4in","data":{},"inlineStyleRanges":[{"style":"BOLD","offset":232,"length":4}],"entityRanges":[],"text":"5. On the Optional settings page select the admin roles you want to assign the user. More on the roles in the next lesson. On this page you can also set profile info: Job title, department, office, phone numbers, and address. Click Next.","type":"unstyled"},{"entityRanges":[],"key":"5v9p0","type":"unstyled","data":{},"text":"6. Click Finish adding.","depth":0,"inlineStyleRanges":[{"offset":9,"style":"BOLD","length":13}]},{"depth":0,"entityRanges":[],"inlineStyleRanges":[],"data":{},"text":"Add a lot of users at one time","key":"eru3i","type":"header-two"},{"depth":0,"inlineStyleRanges":[],"text":"Manually adding users can get tedious especially if you have more than 5. So next we'll download a CSV template and update it with a bunch of users then import those users in Microsoft 365.","type":"unstyled","key":"escps","entityRanges":[],"data":{}},{"inlineStyleRanges":[],"key":"e3sr4","entityRanges":[{"key":4,"length":18,"offset":25}],"depth":0,"data":{},"type":"unstyled","text":"1. Go to Microsoft 365 > Add Multiple Users."},{"text":"2. Click Download a blank CSV with the required headers.","data":{},"entityRanges":[],"depth":0,"inlineStyleRanges":[{"length":46,"style":"BOLD","offset":9}],"key":"ehogc","type":"unstyled"},{"type":"atomic","entityRanges":[{"length":1,"offset":0,"key":5}],"depth":0,"inlineStyleRanges":[],"key":"5s5ra","data":{},"text":" "},{"depth":0,"key":"cshfd","inlineStyleRanges":[],"data":{},"entityRanges":[],"type":"unstyled","text":"3. Open the file in Excel."},{"depth":0,"text":"4. Add the user information that you want uploaded and save the sheet.","inlineStyleRanges":[],"key":"7p0it","type":"unstyled","entityRanges":[],"data":{}},{"inlineStyleRanges":[],"key":"12dsj","text":" ","entityRanges":[{"key":6,"length":1,"offset":0}],"depth":0,"data":{},"type":"atomic"},{"type":"unstyled","key":"962kl","data":{},"inlineStyleRanges":[],"text":"5. Click browse and select the CSV you just updated. Then click Next.","entityRanges":[],"depth":0},{"text":" ","entityRanges":[{"length":1,"offset":0,"key":7}],"key":"89g6q","type":"atomic","depth":0,"data":{},"inlineStyleRanges":[]},{"inlineStyleRanges":[{"offset":71,"style":"BOLD","length":4}],"type":"unstyled","entityRanges":[],"text":"6.  Select the licenses you want to assign to the new users then click Next.","depth":0,"data":{},"key":"117nm"},{"entityRanges":[{"offset":0,"key":8,"length":1}],"depth":0,"text":" ","inlineStyleRanges":[],"type":"atomic","key":"4b82a","data":{}},{"key":"akvl4","depth":0,"text":"7. Click Add users.","entityRanges":[],"inlineStyleRanges":[{"style":"BOLD","length":9,"offset":9}],"type":"unstyled","data":{}},{"entityRanges":[],"key":"o5ah","text":"8. Click Download results to download a spreadsheet with the new user's usernames and password. Then click Close","depth":0,"type":"unstyled","inlineStyleRanges":[{"style":"BOLD","offset":9,"length":16}],"data":{}},{"key":"bvvuc","entityRanges":[{"length":1,"offset":0,"key":9}],"depth":0,"data":{},"inlineStyleRanges":[],"text":" ","type":"atomic"},{"data":{},"type":"header-two","key":"dl35f","entityRanges":[],"inlineStyleRanges":[],"depth":0,"text":"Add a single user to Office 365 using PowerShell"},{"text":"Alright, now that we know how to create users using the web browser let's create a user using PowerShell.","data":{},"depth":0,"type":"unstyled","entityRanges":[],"inlineStyleRanges":[],"key":"6ap8a"},{"entityRanges":[],"depth":0,"type":"unstyled","inlineStyleRanges":[],"text":"1. Run Connect-MsolService and login with your admin credentials.","key":"3caa3","data":{}},{"entityRanges":[],"inlineStyleRanges":[{"offset":7,"length":18,"style":"BOLD"}],"depth":0,"key":"5vp5l","text":"2. Run Get-MsolAccountSku. The Get-MsolAccountSku command will return the AccountSkuId which is a way to identify your license ids.","type":"unstyled","data":{}},{"depth":0,"type":"atomic","data":{},"text":" ","inlineStyleRanges":[],"entityRanges":[{"key":10,"length":1,"offset":0}],"key":"c2iaa"},{"data":{},"entityRanges":[],"text":"3. Run the following command: New-MsolUser -DisplayName \"<DisplayName>\" -FirstName <FirstName> -LastName <LastName> -UserPrincipalName <UserSignInName> -UsageLocation US -LicenseAssignment <AccountSkuId> replacing the parts in brackets with your user's information.","inlineStyleRanges":[{"length":173,"style":"BOLD","offset":30}],"type":"unstyled","key":"9gjdb","depth":0},{"entityRanges":[{"length":1,"key":11,"offset":0}],"data":{},"depth":0,"inlineStyleRanges":[],"key":"c2hca","text":" ","type":"atomic"},{"data":{},"key":"bl1fg","type":"unstyled","depth":0,"text":"That's it. You've now created a new user using PowerShell.","entityRanges":[],"inlineStyleRanges":[]},{"key":"5753m","depth":0,"type":"header-two","data":{},"inlineStyleRanges":[],"text":"How to view and edit Microsoft 365 users","entityRanges":[]},{"text":"Viewing and editing users in Microsoft 365 is as easy as pie.","entityRanges":[],"type":"unstyled","depth":0,"data":{},"inlineStyleRanges":[],"key":"rc1c"},{"type":"unstyled","key":"f3itf","depth":0,"inlineStyleRanges":[],"entityRanges":[{"key":12,"length":70,"offset":15}],"text":"1. First go to https://admin.microsoft.com/Adminportal/Home?source=applauncher#/users and sign in with your admin credentials.","data":{}},{"key":"7dujc","entityRanges":[],"inlineStyleRanges":[],"type":"unstyled","depth":0,"data":{},"text":"There's the list of users."},{"data":{},"key":"1pan7","type":"unstyled","entityRanges":[],"depth":0,"inlineStyleRanges":[{"offset":0,"length":314,"style":"color-rgb(33,37,41)"},{"length":314,"offset":0,"style":"bgcolor-rgb(255,255,255)"},{"style":"fontsize-16","length":314,"offset":0},{"style":"fontfamily-system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", \"Liberation Sans\", sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji","offset":0,"length":314}],"text":"2. To edit a user click on the user. You'll see the user's information. There you can use the tabs at the top to navigate around the user or you can click Manage username and email to update the user's sign in name or email address. Finally, click Manage contact information to edit the user's contact information."},{"type":"atomic","entityRanges":[{"key":13,"length":1,"offset":0}],"text":" ","key":"1s5ug","data":{},"depth":0,"inlineStyleRanges":[]},{"type":"unstyled","entityRanges":[],"depth":0,"text":"","inlineStyleRanges":[],"key":"d1d1o","data":{}}],"entityMap":{"0":{"mutability":"MUTABLE","type":"LINK","data":{"targetOption":"_blank","url":"https://admin.microsoft.com/Adminportal/Home?source=applauncher#/users"}},"1":{"mutability":"MUTABLE","data":{"width":"auto","height":"auto","alt":"Add a user button in Microsoft 365 admin center","alignment":"none","src":"https://i.ibb.co/9ZJ0d61/Add-User-in-Microsoft-365.png"},"type":"IMAGE"},"2":{"data":{"alt":"Microsoft 365 basic user account information","height":"auto","alignment":"none","width":"auto","src":"https://i.ibb.co/gycTqzd/basic-user-account-information.png"},"type":"IMAGE","mutability":"MUTABLE"},"3":{"mutability":"MUTABLE","type":"IMAGE","data":{"alignment":"none","alt":"Assign licenses in Microsoft 365","height":"auto","src":"https://i.ibb.co/0BwW2xG/assign-licenses.png","width":"auto"}},"4":{"type":"LINK","mutability":"MUTABLE","data":{"targetOption":"_blank","url":"https://admin.microsoft.com/Adminportal/Home?source=applauncher#/users/:/addmultipleusers"}},"5":{"data":{"alignment":"none","height":"auto","width":"auto","src":"https://i.ibb.co/QPwjHtj/download-blank-csv-to-import-users.png","alt":"Download a blank CSV file with the required headers"},"type":"IMAGE","mutability":"MUTABLE"},"6":{"data":{"alignment":"none","height":"auto","width":"auto","alt":"Microsoft 365 Users to Upload CSV","src":"https://i.ibb.co/Jxk3Xnp/users-to-upload.png"},"mutability":"MUTABLE","type":"IMAGE"},"7":{"mutability":"MUTABLE","data":{"height":"auto","width":"auto","src":"https://i.ibb.co/LJgyy10/microsoft-365-upload-csv-for-user-import.png","alignment":"none","alt":"Microsoft 365 upload users to import"},"type":"IMAGE"},"8":{"data":{"alignment":"none","src":"https://i.ibb.co/DGCxsp0/microsoft-365-select-licenses.png","height":"auto","alt":"Microsoft 365 Assign licenses to imported users","width":"auto"},"mutability":"MUTABLE","type":"IMAGE"},"9":{"data":{"alignment":"none","width":"auto","alt":"Microsoft 365 Import Users Download results","height":"auto","src":"https://i.ibb.co/wwK3m1N/microsoft-365-import-users-download-results.png"},"type":"IMAGE","mutability":"MUTABLE"},"10":{"data":{"src":"https://i.ibb.co/C2WryQD/get-msolaccountsku.png","alignment":"none","height":"auto","alt":"Get-MsolAccountSku","width":"auto"},"type":"IMAGE","mutability":"MUTABLE"},"11":{"mutability":"MUTABLE","type":"IMAGE","data":{"alt":"New-MsolUser","height":"auto","src":"https://i.ibb.co/BNtPDq9/New-Msol-User.png","width":"auto","alignment":"none"}},"12":{"mutability":"MUTABLE","data":{"url":"https://admin.microsoft.com/Adminportal/Home?source=applauncher#/users","targetOption":"_blank"},"type":"LINK"},"13":{"type":"IMAGE","data":{"alignment":"none","width":"auto","height":"auto","alt":"Microsoft 365 edit user pane","src":"https://i.ibb.co/YBTcWND/Microsoft-365-edit-user.png"},"mutability":"MUTABLE"}}},"publish":true,"images":["https://i.ibb.co/9ZJ0d61/Add-User-in-Microsoft-365.png","https://i.ibb.co/gycTqzd/basic-user-account-information.png","https://i.ibb.co/0BwW2xG/assign-licenses.png","https://i.ibb.co/QPwjHtj/download-blank-csv-to-import-users.png","https://i.ibb.co/Jxk3Xnp/users-to-upload.png","https://i.ibb.co/LJgyy10/microsoft-365-upload-csv-for-user-import.png","https://i.ibb.co/DGCxsp0/microsoft-365-select-licenses.png","https://i.ibb.co/wwK3m1N/microsoft-365-import-users-download-results.png","https://i.ibb.co/C2WryQD/get-msolaccountsku.png","https://i.ibb.co/BNtPDq9/New-Msol-User.png","https://i.ibb.co/YBTcWND/Microsoft-365-edit-user.png","https://i.ibb.co/Wnt5Q43/View-Microsoft-365-Users.png","https://i.ibb.co/Wnt5Q43/View-Microsoft-365-Users.png"],"description":"Creating users in Microsoft 365 is easy. Follow our guide to get started.","slug":"How-to-create-users-in-Microsoft-365-Cloud-Only-uYCIPbnMC","type":"article","sectionId":"AFV_acckJ","title":"How to create users in Microsoft 365 Cloud Only","datePublished":"2022/5/26","featuredImage":"https://i.ibb.co/Wnt5Q43/View-Microsoft-365-Users.png","id":"uYCIPbnMC"},
      articles: [{"id":"cpchjBLkC","sectionId":"qwJW5VrBW","slug":"Whats-in-this-course-cpchjBLkC","title":"What's in this course?","featuredImage":"https://i.ibb.co/zFs9Vfb/microsoft365-security-administrator-associate-600x600.png"},{"id":"KKkBOVuS4","sectionId":"qwJW5VrBW","slug":"Creating-a-free-Microsoft-365-tenant-for-practice-KKkBOVuS4","title":"Creating a free Microsoft 365 tenant for practice","featuredImage":"https://i.ibb.co/F07sjQJ/microsoft-365-e5-trial.png"},{"id":"bzotoOjEe","sectionId":"qwJW5VrBW","slug":"Managing-the-Microsoft-365-tenant-Introduction-to-the-admin-centers-bzotoOjEe","title":"Managing the Microsoft 365 tenant - Introduction to the admin centers","featuredImage":"https://i.ibb.co/f1cr4zt/Microsoft-365-admin-centers.png"},{"id":"cg_vxOX9L","sectionId":"qwJW5VrBW","slug":"Managing-Microsoft-365-through-PowerShell-cg_vxOX9L","title":"Managing Microsoft 365 through PowerShell","featuredImage":"https://i.ibb.co/HV13YF6/install-microsoft-365-powershell-modules.png"},{"id":"uYCIPbnMC","sectionId":"AFV_acckJ","slug":"How-to-create-users-in-Microsoft-365-Cloud-Only-uYCIPbnMC","title":"How to create users in Microsoft 365 Cloud Only","featuredImage":"https://i.ibb.co/Wnt5Q43/View-Microsoft-365-Users.png"},{"id":"7CpqFkPZU","sectionId":"AFV_acckJ","slug":"Creating-and-managing-admins-through-roles-7CpqFkPZU","title":"Creating and managing admins through roles","featuredImage":"https://i.ibb.co/kySL4HQ/Roles-and-administrators.png"},{"id":"rZzausKJ1","sectionId":"AFV_acckJ","slug":"Time-limited-admin-roles-in-Microsoft-365-rZzausKJ1","title":"Time limited admin roles in Microsoft 365","featuredImage":"https://i.ibb.co/nDvjyPD/select-member-to-add-to-PIM-role.png"},{"id":"ky5W0Lz5P","sectionId":"AFV_acckJ","slug":"Whats-AD-Connect-ky5W0Lz5P","title":"What's AD Connect","featuredImage":"https://i.ibb.co/7nDqr9x/Whats-AD-Connect.png"},{"id":"i9pJIjTNH","sectionId":"AFV_acckJ","slug":"Protecting-Passwords-in-Microsoft-365-i9pJIjTNH","title":"Protecting Passwords in Microsoft 365","featuredImage":"https://i.ibb.co/DLD4G4q/access-smart-lockout-settings.png"},{"id":"S1hQgFOMV","sectionId":"AFV_acckJ","slug":"Creating-and-managing-users-through-groups-S1hQgFOMV","title":"Creating and managing users through groups","featuredImage":"https://i.ibb.co/nmmC28M/add-a-group-microsoft-365.png"},{"id":"2QfoI2HxY","sectionId":"AFV_acckJ","slug":"Securing-and-implementing-enterprise-applications-2QfoI2HxY","title":"Securing and implementing enterprise applications","featuredImage":"https://i.ibb.co/C2mp69m/disable-user-consent.png"},{"id":"V1en9Iugh","sectionId":"AFV_acckJ","slug":"Whats-a-conditional-access-policy-V1en9Iugh","title":"What's a conditional access policy?","featuredImage":"https://i.ibb.co/DQm1sY0/Create-conditional-access-policy.png"},{"id":"nAAIvNbtk","sectionId":"AFV_acckJ","slug":"The-many-ways-to-implement-multi-factor-authentication-MFA-in-Microsoft-365-nAAIvNbtk","title":"The many ways to implement multi-factor authentication (MFA) in Microsoft 365","featuredImage":"https://i.ibb.co/P1P0wNY/microsoft-365-manage-security-defaults.png"},{"id":"2S9jn0aLr","sectionId":"AFV_acckJ","slug":"Implement-Self-service-password-reset-in-Microsoft-365-2S9jn0aLr","title":"Implement Self-service password reset in Microsoft 365","featuredImage":"https://i.ibb.co/58y9JVg/write-back-passwords-to-on-premises-directory.png"},{"id":"FldNualGC","sectionId":"AFV_acckJ","slug":"Locking-down-your-Microsoft-365-tenant-from-Microsoft-engineers-FldNualGC","title":"Locking down your Microsoft 365 tenant from Microsoft engineers","featuredImage":"https://i.ibb.co/DCmpnT9/Enable-Customer-Lockbox.png"},{"id":"NFQ6rYFeQ","sectionId":"AFV_acckJ","slug":"Implementing-intelligent-security-using-risk-policies-in-Microsoft-365-NFQ6rYFeQ","title":"Implementing intelligent security using risk policies in Microsoft 365","featuredImage":"https://i.ibb.co/0cyQJ7j/Risk-Detections.png"},{"id":"rK48f6iM2","sectionId":"AFV_acckJ","slug":"Automating-Access-Review-in-Microsoft-365-rK48f6iM2","title":"Automating Access Review in Microsoft 365","featuredImage":"https://i.ibb.co/Xsxvz6Z/new-access-review.png"},{"id":"RHW1API2s","sectionId":"AFV_acckJ","slug":"Just-in-time-approval-and-notification-for-admin-roles-in-Microsoft-365-RHW1API2s","title":"Just in time, approval and notification for admin roles in Microsoft 365","featuredImage":"https://i.ibb.co/dcb6XFN/Activate-a-Role.png"},{"id":"z8EMM9Eu_","sectionId":"QScYfSu74","slug":"Whats-Microsoft-365-Defender-z8EMM9Eu_","title":"What's Microsoft 365 Defender?","featuredImage":"https://i.ibb.co/MDMyDQt/Microsoft-Defender.png"},{"id":"Kye_yNLxA","sectionId":"QScYfSu74","slug":"Whats-Microsoft-Defender-for-identity-Kye_yNLxA","title":"What's Microsoft Defender for identity?","featuredImage":"https://i.ibb.co/bQDBh0Y/Defender-for-Identity-Timeline.png"},{"id":"EnPyp7ukN","sectionId":"QScYfSu74","slug":"Whats-Microsoft-Defender-for-Office-365-EnPyp7ukN","title":"What's Microsoft Defender for Office 365?","featuredImage":"https://i.ibb.co/WcwKY2G/Microsoft-365-incidents-and-alerts.png"},{"id":"6HUOr7qbL","sectionId":"QScYfSu74","slug":"Protect-your-email-environment-from-malicious-actors-6HUOr7qbL","title":"Protect your email and Office environment from malicious actors","featuredImage":"https://i.ibb.co/Df0KQVp/Reports.png"},{"id":"GCOOUsSBT","sectionId":"QScYfSu74","slug":"Protecting-email-against-phishing-attacks-GCOOUsSBT","title":"Protecting email against phishing attacks","featuredImage":"https://i.ibb.co/GCjZHWg/edit-actions.png"},{"id":"GG4cMY8pK","sectionId":"QScYfSu74","slug":"Simulating-attacks-with-Microsoft-365-GG4cMY8pK","title":"Simulating attacks with Microsoft 365","featuredImage":"https://i.ibb.co/NyvnbMK/simulation-overview-view-users-circled.png"},{"id":"z0qPG6v4T","sectionId":"QScYfSu74","slug":"Protecting-Windows-10-and-other-devices-with-Microsoft-Defender-for-Endpoint-z0qPG6v4T","title":"Protecting Windows 10 and other devices with Microsoft Defender for Endpoint","featuredImage":"https://i.ibb.co/T47Xhyh/enable-endpoint-connections.png"},{"id":"LEyZMWBSt","sectionId":"QScYfSu74","slug":"Collect-detect-investigate-and-respond-to-security-threats-using-Microsoft-Sentinel-LEyZMWBSt","title":"Collect, detect, investigate, and respond to security threats using Microsoft Sentinel","featuredImage":"https://i.ibb.co/qN9XsKj/Add-Workbook.png"},{"id":"7MQ3wE4wP","sectionId":"QScYfSu74","slug":"Implement-and-manage-Microsoft-Defender-for-Cloud-Apps-7MQ3wE4wP","title":"Implement and manage Microsoft Defender for Cloud Apps","featuredImage":"https://i.ibb.co/7g7LvFg/office-365-cloud-apps-settings.png"},{"id":"sH_Ee1DW1","sectionId":"QScYfSu74","slug":"Auditing-sign-ins-and-other-actions-in-Microsoft-365-sH_Ee1DW1","title":"Auditing sign-ins and other actions in Microsoft 365","featuredImage":"https://i.ibb.co/BqMw3jZ/Start-recording-user-and-admin-activity.png"},{"id":"vLweLmxZf","sectionId":"YhftdGIRX","slug":"How-to-classify-data-using-labels-in-Microsoft-365-vLweLmxZf","title":"How to classify data using labels in Microsoft 365","featuredImage":"https://i.ibb.co/k9nhWS5/Choose-protection-settings-for-files-and-emails.png"},{"id":"NsF7No40f","sectionId":"YhftdGIRX","slug":"Creating-and-managing-data-retention-to-conform-to-compliance-NsF7No40f","title":"Creating and managing data retention to conform to compliance","featuredImage":"https://i.ibb.co/yqC0ZdY/New-Retention-Policy.png"},{"id":"IsPGsme8w","sectionId":"YhftdGIRX","slug":"Preventing-accidental-and-malicious-data-loss-with-DLP-policies-IsPGsme8w","title":"Preventing accidental and malicious data loss with DLP policies","featuredImage":"https://i.ibb.co/n8WcqKM/Create-a-DLP-policy.png"},{"id":"wv2PbXnhI","sectionId":"YhftdGIRX","slug":"Everything-you-need-to-know-about-securing-SharePoint-Online-for-the-MS-500-wv2PbXnhI","title":"Everything you need to know about securing SharePoint Online for the MS-500","featuredImage":"https://i.ibb.co/Gk9NjSH/Share-Point-Online-Warning.png"},{"id":"7gR3L122b","sectionId":"l0DxUuonW","slug":"Introduction-to-Intune-7gR3L122b","title":"Introduction to Intune","featuredImage":"https://i.ibb.co/Fq3N8BX/Endpoint-Manager-Admin-Center.png"},{"id":"ZyKX3Idjs","sectionId":"l0DxUuonW","slug":"Setting-up-Android-Devices-ZyKX3Idjs","title":"Setting up Android Devices","featuredImage":"https://i.ibb.co/m0BYhL2/Connect-Intune-to-Google-Play.png"},{"id":"MAjW0a2_p","sectionId":"l0DxUuonW","slug":"Setting-up-Apple--iOS-devices-in-Intune-MAjW0a2_p","title":"Setting up Apple / iOS devices in Intune","featuredImage":"https://i.ibb.co/X7Ffb2B/Setup-Apple-Enrollment-in-Intune.png"},{"id":"XFXu2zIS9","sectionId":"l0DxUuonW","slug":"Setting-up-Windows-10-devices-in-Intune-XFXu2zIS9","title":"Setting up Windows 10 devices in Intune","featuredImage":"https://i.ibb.co/WDXKVjW/configure-device-options.png"},{"id":"_LL9VqGZO","sectionId":"l0DxUuonW","slug":"How-to-manage-devices-using-Intune-_LL9VqGZO","title":"How to manage devices using Intune","featuredImage":"https://i.ibb.co/HPQ2m8t/Create-an-endpoint-protection-profile.png"},{"id":"qDRA4jjoN","sectionId":"l0DxUuonW","slug":"Understanding-compliance-policies-qDRA4jjoN","title":"Understanding compliance policies","featuredImage":"https://i.ibb.co/N3Qk57v/Create-a-compliance-policy.png"},{"id":"62t_7oiZx","sectionId":"l0DxUuonW","slug":"Restricting-and-managing-apps-on-user-devices-62t_7oiZx","title":"Restricting and managing apps on user devices","featuredImage":"https://i.ibb.co/PCVRKDf/Add-an-Android-app-to-Intune.png"}],
      articleHtml: `<p>So let's talk quickly about creating users in Microsoft 365. Every user in your organization that requires a mailbox or admin role will be required to have a user account. The easiest way to add a user account is by creating a single user account in Microsoft 365.</p>
<h2>Add a single user account in Microsoft 365 admin center</h2>
<p>1. Go to <a href="https://admin.microsoft.com/Adminportal/Home?source=applauncher#/users" target="_blank">Microsoft 365 admin center &gt; active users</a> page. Log in with your admin credentials.</p>
<p>2. Click Add a user</p>
<div style="text-align:none;"><img src="https://i.ibb.co/9ZJ0d61/Add-User-in-Microsoft-365.png" alt="Add a user button in Microsoft 365 admin center" style="height: auto;width: auto"/></div>
<p>3. Enter the user's first name, last name, and username. On this page, you can also select if you want to automatically create a password or require the user to change the password at first login. Then click <strong>Next</strong>.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/gycTqzd/basic-user-account-information.png" alt="Microsoft 365 basic user account information" style="height: auto;width: auto"/></div>
<p>4. On the next page, you select the license assignment. Once you check the license you want to assign you can view the apps associated with the license by clicking the apps dropdown. Then click <strong>Next</strong>.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/0BwW2xG/assign-licenses.png" alt="Assign licenses in Microsoft 365" style="height: auto;width: auto"/></div>
<p>5. On the Optional settings page select the admin roles you want to assign the user. More on the roles in the next lesson. On this page you can also set profile info: Job title, department, office, phone numbers, and address. Click <strong>Next</strong>.</p>
<p>6. Click <strong>Finish adding</strong>.</p>
<h2>Add a lot of users at one time</h2>
<p>Manually adding users can get tedious especially if you have more than 5. So next we'll download a CSV template and update it with a bunch of users then import those users in Microsoft 365.</p>
<p>1. Go to Microsoft 365 &gt; <a href="https://admin.microsoft.com/Adminportal/Home?source=applauncher#/users/:/addmultipleusers" target="_blank">Add Multiple Users</a>.</p>
<p>2. Click <strong>Download a blank CSV with the required headers</strong>.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/QPwjHtj/download-blank-csv-to-import-users.png" alt="Download a blank CSV file with the required headers" style="height: auto;width: auto"/></div>
<p>3. Open the file in Excel.</p>
<p>4. Add the user information that you want uploaded and save the sheet.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/Jxk3Xnp/users-to-upload.png" alt="Microsoft 365 Users to Upload CSV" style="height: auto;width: auto"/></div>
<p>5. Click browse and select the CSV you just updated. Then click Next.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/LJgyy10/microsoft-365-upload-csv-for-user-import.png" alt="Microsoft 365 upload users to import" style="height: auto;width: auto"/></div>
<p>6.  Select the licenses you want to assign to the new users then click <strong>Next</strong>.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/DGCxsp0/microsoft-365-select-licenses.png" alt="Microsoft 365 Assign licenses to imported users" style="height: auto;width: auto"/></div>
<p>7. Click <strong>Add users</strong>.</p>
<p>8. Click <strong>Download results</strong> to download a spreadsheet with the new user's usernames and password. Then click Close</p>
<div style="text-align:none;"><img src="https://i.ibb.co/wwK3m1N/microsoft-365-import-users-download-results.png" alt="Microsoft 365 Import Users Download results" style="height: auto;width: auto"/></div>
<h2>Add a single user to Office 365 using PowerShell</h2>
<p>Alright, now that we know how to create users using the web browser let's create a user using PowerShell.</p>
<p>1. Run Connect-MsolService and login with your admin credentials.</p>
<p>2. Run <strong>Get-MsolAccountSku</strong>. The Get-MsolAccountSku command will return the AccountSkuId which is a way to identify your license ids.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/C2WryQD/get-msolaccountsku.png" alt="Get-MsolAccountSku" style="height: auto;width: auto"/></div>
<p>3. Run the following command: <strong>New-MsolUser -DisplayName "&lt;DisplayName&gt;" -FirstName &lt;FirstName&gt; -LastName &lt;LastName&gt; -UserPrincipalName &lt;UserSignInName&gt; -UsageLocation US -LicenseAssignment &lt;AccountSkuId&gt;</strong> replacing the parts in brackets with your user's information.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/BNtPDq9/New-Msol-User.png" alt="New-MsolUser" style="height: auto;width: auto"/></div>
<p>That's it. You've now created a new user using PowerShell.</p>
<h2>How to view and edit Microsoft 365 users</h2>
<p>Viewing and editing users in Microsoft 365 is as easy as pie.</p>
<p>1. First go to <a href="https://admin.microsoft.com/Adminportal/Home?source=applauncher#/users" target="_blank">https://admin.microsoft.com/Adminportal/Home?source=applauncher#/users</a> and sign in with your admin credentials.</p>
<p>There's the list of users.</p>
<p><span style="color: rgb(33,37,41);background-color: rgb(255,255,255);font-size: 16px;font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;">2. To edit a user click on the user. You'll see the user's information. There you can use the tabs at the top to navigate around the user or you can click Manage username and email to update the user's sign in name or email address. Finally, click Manage contact information to edit the user's contact information.</span></p>
<div style="text-align:none;"><img src="https://i.ibb.co/YBTcWND/Microsoft-365-edit-user.png" alt="Microsoft 365 edit user pane" style="height: auto;width: auto"/></div>
<p></p>
`,
      nextContentSlug: 'Creating-and-managing-admins-through-roles-7CpqFkPZU',
      previousContentSlug: 'Managing-Microsoft-365-through-PowerShell-cg_vxOX9L',
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
