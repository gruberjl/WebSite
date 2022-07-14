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
      course: {"audience":"Anyone who wants to learn about securing Microsoft 365","title":"Training for MS-500: Microsoft Office 365 Security Admin","description":"Learn, prepare and training for the Microsoft Microsoft Office 365 Exam MS-500: Microsoft 365 Security Administration MS-500 exam","id":"MS-500","sections":[{"order":0,"id":"qwJW5VrBW","title":"Introduction"},{"title":"Securing identity and access to Microsoft 365","order":1,"id":"AFV_acckJ"},{"order":2,"title":"Securing Microsoft 365, clouds, and on-premises environments","id":"QScYfSu74"},{"id":"YhftdGIRX","title":"Protecting your environment from accidental and malicious data loss","order":3},{"order":4,"title":"Protecting User devices using Intune","id":"l0DxUuonW"}],"contentOrder":["cpchjBLkC","KKkBOVuS4","bzotoOjEe","cg_vxOX9L","uYCIPbnMC","7CpqFkPZU","rZzausKJ1","ky5W0Lz5P","i9pJIjTNH","S1hQgFOMV","2QfoI2HxY","V1en9Iugh","nAAIvNbtk","2S9jn0aLr","FldNualGC","NFQ6rYFeQ","rK48f6iM2","RHW1API2s","z8EMM9Eu_","Kye_yNLxA","EnPyp7ukN","6HUOr7qbL","GCOOUsSBT","GG4cMY8pK","z0qPG6v4T","LEyZMWBSt","7MQ3wE4wP","sH_Ee1DW1","vLweLmxZf","NsF7No40f","IsPGsme8w","wv2PbXnhI","7gR3L122b","ZyKX3Idjs","MAjW0a2_p","XFXu2zIS9","_LL9VqGZO","qDRA4jjoN","62t_7oiZx"]},
      article: {"publish":true,"type":"article","slug":"Auditing-sign-ins-and-other-actions-in-Microsoft-365-sH_Ee1DW1","datePublished":"2022/6/28","featuredImage":"https://i.ibb.co/BqMw3jZ/Start-recording-user-and-admin-activity.png","id":"sH_Ee1DW1","sectionId":"QScYfSu74","images":["https://i.ibb.co/gSn6PVP/sign-in-logs.png","https://i.ibb.co/F8FqcGJ/sign-in-logs-for-user.png","https://i.ibb.co/F8FqcGJ/sign-in-logs-for-user.png","https://i.ibb.co/DDHPKTV/activity-details.png","https://i.ibb.co/QY6q69M/location-tab.png","https://i.ibb.co/gZQ2vnG/device-info-tab.png","https://i.ibb.co/85LXdWW/Authentication-Details.png","https://i.ibb.co/2tCsbnf/conditional-access-policy-sign-in-logs.png","https://i.ibb.co/7GmvDjZ/view-audit-logs.png","https://i.ibb.co/BqMw3jZ/Start-recording-user-and-admin-activity.png"],"article":{"blocks":[{"text":"So now we have Microsoft 365 fairly secure. There's one more question you should be asking yourself? How do we audit/monitor the user's actions? Before we jump into the logs there's something you should know. There are a couple of places for auditing but we'll keep it simple and stick to the two most common. First, let's take a look at sign-in logs. Next, we'll jump into auditing the Active Directory account auditing. Finally, we'll jump into auditing all actions.","type":"unstyled","key":"4k1ep","depth":0,"entityRanges":[],"data":{},"inlineStyleRanges":[]},{"inlineStyleRanges":[],"text":"Sign-in logs","data":{},"key":"9rld5","depth":0,"type":"header-two","entityRanges":[]},{"key":"1dhu1","depth":0,"data":{},"inlineStyleRanges":[],"entityRanges":[],"text":"Sign-in logs are probably the most common logs used in Microsoft 365. From there you can see when a user logs in, what location they signed in from, and much more. Let's jump in and take a look.","type":"unstyled"},{"key":"1jgfa","data":{},"type":"header-three","entityRanges":[],"text":"How to view sign-in logs","depth":0,"inlineStyleRanges":[]},{"data":{},"inlineStyleRanges":[{"style":"BOLD","offset":9,"length":35},{"length":22,"style":"BOLD","offset":47},{"style":"BOLD","offset":72,"length":12}],"entityRanges":[{"length":12,"key":0,"offset":72}],"depth":0,"type":"unstyled","key":"dtl0m","text":"1. Go to Azure Active Directory admin center > Azure Active Directory > Sign-in logs."},{"entityRanges":[{"key":1,"length":1,"offset":0}],"depth":0,"inlineStyleRanges":[],"type":"atomic","key":"644dd","data":{},"text":" "},{"type":"unstyled","key":"4qlhl","data":{},"depth":0,"inlineStyleRanges":[],"text":"From here you can see all the sign-ins to your Microsoft 365 tenant. You can filter the log to see more particular information. Finally, you can view the same sign-in logs from Azure Active Directory admin center > Enterprise applications > Sign-in logs.","entityRanges":[]},{"depth":0,"text":"How to view sign-in logs for a user","key":"am3eg","data":{},"type":"header-three","entityRanges":[],"inlineStyleRanges":[]},{"inlineStyleRanges":[],"type":"unstyled","entityRanges":[],"data":{},"text":"Now, you can go to the sign-in logs, then add a filter for a particular user but that's a bit tedious. Since most of the time when you want to review sign-in logs you are looking at a particular user let's look at the sign-in logs another way. By having it automatically filtered for a user.","depth":0,"key":"7dggt"},{"entityRanges":[],"text":"1. Go to Azure Active Directory admin center > Users. Select the user you want to view.","depth":0,"key":"3v6ql","inlineStyleRanges":[{"offset":9,"length":35,"style":"BOLD"},{"offset":47,"style":"BOLD","length":5},{"style":"BOLD","length":15,"offset":54}],"data":{},"type":"unstyled"},{"entityRanges":[{"key":2,"length":1,"offset":0}],"data":{},"type":"atomic","depth":0,"key":"6ubvc","inlineStyleRanges":[],"text":" "},{"data":{},"text":"2. Click Sign-in logs.","key":"76uig","entityRanges":[],"depth":0,"inlineStyleRanges":[{"length":12,"style":"BOLD","offset":9}],"type":"unstyled"},{"data":{},"inlineStyleRanges":[],"type":"header-three","key":"7s3jk","depth":0,"text":"How to read the sign-in logs","entityRanges":[]},{"data":{},"text":"Now that we are at the sign-in logs let's take a look at how to read them. Before we jump into reviewing one of the logs you should know one thing. The sign-in logs will show more than one sign-in for the user. For example, if you sign into the Microsoft 365 admin center and then navigate to the Azure AD admin center you'll see at least two \"sign-ins\". That's because every time you navigate to a different app in Microsoft 365 you are re-authenticating using the same token. Now, click one of the sign-ins to view the data.","depth":0,"key":"ah773","inlineStyleRanges":[],"type":"unstyled","entityRanges":[]},{"inlineStyleRanges":[],"depth":0,"data":{},"text":"Basic info","key":"2c454","entityRanges":[],"type":"header-four"},{"depth":0,"text":"On the basic info tab, you can see, basic info on the sign-in. Surprised right? Anyway, from here you can see information like the user that the sign-in is related to, and what application they signed into.","entityRanges":[],"data":{},"inlineStyleRanges":[],"type":"unstyled","key":"cudm9"},{"key":"b72rs","depth":0,"inlineStyleRanges":[],"entityRanges":[{"offset":0,"key":3,"length":1}],"type":"atomic","data":{},"text":" "},{"entityRanges":[],"data":{},"inlineStyleRanges":[],"text":"Location","type":"header-four","key":"3ra3t","depth":0},{"entityRanges":[],"text":"On the location tab, you'll find the information on where the user logged in from. For example, you'll see the IP address and the best guess on the actual location. For example, Philadelphia, PA, US.","depth":0,"data":{},"type":"unstyled","inlineStyleRanges":[],"key":"dgb8s"},{"entityRanges":[{"key":4,"length":1,"offset":0}],"depth":0,"inlineStyleRanges":[],"key":"cnldh","type":"atomic","data":{},"text":" "},{"entityRanges":[],"data":{},"text":"Device info","key":"8h6ht","depth":0,"inlineStyleRanges":[],"type":"header-four"},{"text":"From the device info tab, you'll find information about the device. If the device is in Azure AD, you may see a device name. If the sign-in is from a browser, you'll notice the browser is located in the device info tab.","entityRanges":[],"data":{},"type":"unstyled","depth":0,"key":"1a5vn","inlineStyleRanges":[]},{"text":" ","inlineStyleRanges":[],"depth":0,"data":{},"type":"atomic","entityRanges":[{"length":1,"key":5,"offset":0}],"key":"ag6o7"},{"depth":0,"type":"header-four","key":"6uv82","inlineStyleRanges":[],"entityRanges":[],"text":"Authentication Details","data":{}},{"inlineStyleRanges":[],"type":"unstyled","data":{},"depth":0,"entityRanges":[],"text":"The authentication details tab is where you'll find information about how the user signed in. For example, if it's the actual sign-in you may see \"Password Hash Sync\" or \"Password in the cloud\". If the user is already signed in and simply connecting to another service you'll see \"Previously satisfied\"","key":"2ahih"},{"key":"2barj","inlineStyleRanges":[],"entityRanges":[{"length":1,"offset":0,"key":6}],"data":{},"type":"atomic","depth":0,"text":" "},{"inlineStyleRanges":[],"entityRanges":[],"key":"46gej","depth":0,"data":{},"type":"header-four","text":"Conditional access"},{"key":"3hgv0","depth":0,"text":"The conditional access tab will show you what conditional access policies were applied and which were not. It will also show you the status of the conditional access policy. For example, if the policy failed (and blocked the sign-in) then it will show Failure. Lastly, you can click the policy name to see information about the conditions and access controls. That way you can see why a policy failed, succeeded or didn't apply.","data":{},"type":"unstyled","inlineStyleRanges":[],"entityRanges":[]},{"key":"qbb2","inlineStyleRanges":[],"type":"atomic","data":{},"text":" ","entityRanges":[{"key":7,"length":1,"offset":0}],"depth":0},{"depth":0,"entityRanges":[],"text":"Report only","key":"5gacl","type":"header-four","data":{},"inlineStyleRanges":[]},{"key":"fa3lh","type":"unstyled","depth":0,"data":{},"inlineStyleRanges":[],"text":"The report-only tab will show you conditional access policies that are in report-only mode. They won't block the sign-in but that way you can test your conditional access policies before applying them.","entityRanges":[]},{"depth":0,"text":"Additional details","key":"1g3jb","data":{},"entityRanges":[],"inlineStyleRanges":[],"type":"header-four"},{"data":{},"entityRanges":[],"key":"8qmpk","depth":0,"text":"This tab is typically empty.","inlineStyleRanges":[],"type":"unstyled"},{"depth":0,"inlineStyleRanges":[],"type":"header-two","data":{},"key":"6dkc0","entityRanges":[],"text":"Account auditing"},{"text":"What do I mean by account auditing? Well, every time you make a change to a user account it is logged in the Azure audit logs. For example, if you update the user display name or change the licenses assigned to a user, you'll see it in the account auditing logs.","entityRanges":[],"inlineStyleRanges":[],"data":{},"key":"hoh1","type":"unstyled","depth":0},{"entityRanges":[],"depth":0,"key":"e7bp1","text":"How to view account logs for the tenant","type":"header-three","data":{},"inlineStyleRanges":[]},{"inlineStyleRanges":[],"key":"4m2c7","text":"Just like the sign-in logs except it's one option lower (or up depending on where you are)","type":"unstyled","entityRanges":[],"depth":0,"data":{}},{"type":"unstyled","text":"1. Go to Azure Active Directory admin center > Azure Active Directory > Audit logs.","key":"cjpb3","depth":0,"inlineStyleRanges":[{"length":35,"offset":9,"style":"BOLD"},{"length":22,"offset":47,"style":"BOLD"},{"style":"BOLD","length":10,"offset":72}],"entityRanges":[{"offset":72,"key":8,"length":10}],"data":{}},{"type":"atomic","inlineStyleRanges":[],"text":" ","data":{},"key":"987gc","depth":0,"entityRanges":[{"offset":0,"key":9,"length":1}]},{"inlineStyleRanges":[{"length":22,"offset":68,"style":"BOLD"},{"style":"BOLD","offset":93,"length":6},{"offset":118,"style":"BOLD","length":10}],"depth":0,"key":"97cub","text":"You can also view an individual's account auditing logs by going to Azure Active Directory > Users > Click the user > Audit Logs.","type":"unstyled","entityRanges":[{"key":10,"offset":93,"length":6}],"data":{}},{"key":"1a73s","data":{},"inlineStyleRanges":[],"text":"Auditing actions","type":"header-two","entityRanges":[],"depth":0},{"depth":0,"entityRanges":[],"inlineStyleRanges":[],"data":{},"type":"unstyled","key":"2gv39","text":"Now that you have an understanding of auditing sign-ins and Active Directory account activity let's look at how to audit all the actions in Microsoft 365. You can review almost all activities in Microsoft 365. For example, you can review when a file is accessed and by whom. You can also view changes and access mailboxes. For example, you can view when an item is sent, moved, or updated. Before we can audit activity let's enable auditing."},{"key":"39chi","depth":0,"data":{},"type":"header-three","inlineStyleRanges":[],"entityRanges":[],"text":"How to enable auditing in Microsoft 365"},{"entityRanges":[],"text":"1. Go to Microsoft 365 Defender admin center > Audit. Click Start recording user and admin activity.","inlineStyleRanges":[{"length":35,"offset":9,"style":"BOLD"},{"style":"BOLD","offset":47,"length":5},{"style":"BOLD","length":39,"offset":60}],"key":"2hkef","depth":0,"type":"unstyled","data":{}},{"data":{},"text":" ","inlineStyleRanges":[],"entityRanges":[{"length":1,"offset":0,"key":11}],"key":"c4ng9","depth":0,"type":"atomic"},{"data":{},"type":"header-three","inlineStyleRanges":[],"entityRanges":[],"key":"22r7n","depth":0,"text":"How to enable auditing on mailboxes"},{"data":{},"inlineStyleRanges":[],"depth":0,"text":"Now that auditing is enabled for the Microsoft 365 tenant let's make sure auditing is enabled in Exchange Online. First, we'll enable auditing admin actions. This is good if you need to see who read and deleted items in a mailbox. Next, we'll enable auditing for each mailbox.","entityRanges":[],"key":"dpa0o","type":"unstyled"},{"depth":0,"inlineStyleRanges":[],"entityRanges":[],"text":"How to enable admin auditing","key":"4a6s","data":{},"type":"header-four"},{"entityRanges":[],"inlineStyleRanges":[],"text":"To enable Exchange auditing we'll need to use PowerShell.","key":"bf54u","data":{},"depth":0,"type":"unstyled"},{"entityRanges":[{"offset":56,"key":12,"length":22}],"inlineStyleRanges":[{"offset":56,"length":22,"style":"BOLD"}],"depth":0,"text":"1. Open PowerShell and connect to Exchange Online using Connect-ExchangeOnline.","data":{},"type":"unstyled","key":"3bt3c"},{"depth":0,"entityRanges":[],"inlineStyleRanges":[{"style":"BOLD","length":102,"offset":30}],"key":"aev","type":"unstyled","text":"2. Run the following command \"Set-AdminAuditLogConfig -AdminAuditLogEnabled $true -AdminAuditLogCmdlets * -AdminAuditLogParameters *\"","data":{}},{"text":"3. Then run the following command \"Set-OrganizationConfig -AuditDisabled $false\"","type":"unstyled","entityRanges":[],"key":"2n90c","depth":0,"data":{},"inlineStyleRanges":[{"length":44,"offset":35,"style":"BOLD"}]},{"data":{},"type":"unstyled","key":"6t4j6","depth":0,"inlineStyleRanges":[],"entityRanges":[],"text":"Note the stars in the log cmdlets and log parameters. These indicate we are auditing all cmdlets and all parameters. We can also limit the number of cmdlets audited by changing the cmdlets to *mailbox*. This will enable auditing for all PowerShell commands that use the mailbox word. For example, Set-Mailbox, Get-Mailbox, Set-MailboxFolder, Get-MailboxFolder, etc."},{"inlineStyleRanges":[],"text":"How to enable auditing per mailbox","entityRanges":[],"key":"3uou8","depth":0,"data":{},"type":"header-four"},{"type":"unstyled","text":"Now that we've enabled auditing at the tenant level let's enable auditing on the mailbox level. Again, we'll be using Exchange Online PowerShell.","entityRanges":[],"key":"9pib6","inlineStyleRanges":[],"depth":0,"data":{}},{"data":{},"entityRanges":[{"offset":56,"key":13,"length":22}],"text":"1. Open PowerShell and connect to Exchange Online using Connect-ExchangeOnline.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":56,"style":"BOLD","length":22}],"key":"1ggk2"},{"inlineStyleRanges":[{"length":104,"style":"BOLD","offset":30}],"data":{},"text":"2. Run the following command \"Get-Mailbox -ResultSize unlimited | Set-Mailbox -AuditEnabled $true -DefaultAuditSet Admin,Delegate,Owner\"","depth":0,"entityRanges":[],"key":"fkqgl","type":"unstyled"},{"depth":0,"type":"unstyled","entityRanges":[],"data":{},"inlineStyleRanges":[],"text":"Note you can also enable auditing for one mailbox using the following command 'Set-Maibox -Identity \"User1\" -AuditEnabled $true' and replace User1 with the display name or user principal name of the account you want to enable auditing for.","key":"22ujg"}],"entityMap":{"0":{"mutability":"MUTABLE","type":"LINK","data":{"targetOption":"_blank","url":"https://aad.portal.azure.com/#blade/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/SignIns"}},"1":{"data":{"width":"auto","alt":"Sign-in logs","alignment":"none","src":"https://i.ibb.co/gSn6PVP/sign-in-logs.png","height":"auto"},"type":"IMAGE","mutability":"MUTABLE"},"2":{"data":{"height":"auto","src":"https://i.ibb.co/F8FqcGJ/sign-in-logs-for-user.png","width":"auto","alt":"Sign-in logs for user","alignment":"none"},"type":"IMAGE","mutability":"MUTABLE"},"3":{"data":{"alignment":"none","height":"auto","alt":"activity details","src":"https://i.ibb.co/DDHPKTV/activity-details.png","width":"auto"},"type":"IMAGE","mutability":"MUTABLE"},"4":{"data":{"width":"auto","alignment":"none","alt":"Location tab","src":"https://i.ibb.co/QY6q69M/location-tab.png","height":"auto"},"type":"IMAGE","mutability":"MUTABLE"},"5":{"data":{"alignment":"none","height":"auto","alt":"Device info tab","src":"https://i.ibb.co/gZQ2vnG/device-info-tab.png","width":"auto"},"type":"IMAGE","mutability":"MUTABLE"},"6":{"type":"IMAGE","mutability":"MUTABLE","data":{"alt":"Authentication Details","src":"https://i.ibb.co/85LXdWW/Authentication-Details.png","alignment":"none","height":"auto","width":"auto"}},"7":{"mutability":"MUTABLE","data":{"alt":"conditional access policy sign-in logs","src":"https://i.ibb.co/2tCsbnf/conditional-access-policy-sign-in-logs.png","width":"auto","alignment":"none","height":"auto"},"type":"IMAGE"},"8":{"data":{"targetOption":"_blank","url":"https://aad.portal.azure.com/#blade/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/Audit"},"mutability":"MUTABLE","type":"LINK"},"9":{"type":"IMAGE","data":{"alt":"View audit logs","height":"auto","src":"https://i.ibb.co/7GmvDjZ/view-audit-logs.png","width":"auto","alignment":"none"},"mutability":"MUTABLE"},"10":{"type":"LINK","mutability":"MUTABLE","data":{"url":"https://aad.portal.azure.com/#blade/Microsoft_AAD_IAM/UsersManagementMenuBlade/MsGraphUsers","targetOption":"_blank"}},"11":{"mutability":"MUTABLE","type":"IMAGE","data":{"src":"https://i.ibb.co/BqMw3jZ/Start-recording-user-and-admin-activity.png","width":"auto","alt":"Start recording user and admin activity","alignment":"none","height":"auto"}},"12":{"mutability":"MUTABLE","data":{"targetOption":"_blank","url":"https://www.gitbit.org/course/ms-500/learn/Managing-Microsoft-365-through-PowerShell-cg_vxOX9L"},"type":"LINK"},"13":{"type":"LINK","data":{"targetOption":"_blank","url":"https://www.gitbit.org/course/ms-500/learn/Managing-Microsoft-365-through-PowerShell-cg_vxOX9L"},"mutability":"MUTABLE"}}},"description":"How do we audit/monitor the user's actions? First, let's take a look at sign-in logs. Then we'll jump into auditing all actions","title":"Auditing sign-ins and other actions in Microsoft 365"},
      articles: [{"id":"cpchjBLkC","sectionId":"qwJW5VrBW","slug":"Whats-in-this-course-cpchjBLkC","title":"What's in this course?","featuredImage":"https://i.ibb.co/zFs9Vfb/microsoft365-security-administrator-associate-600x600.png"},{"id":"KKkBOVuS4","sectionId":"qwJW5VrBW","slug":"Creating-a-free-Microsoft-365-tenant-for-practice-KKkBOVuS4","title":"Creating a free Microsoft 365 tenant for practice","featuredImage":"https://i.ibb.co/F07sjQJ/microsoft-365-e5-trial.png"},{"id":"bzotoOjEe","sectionId":"qwJW5VrBW","slug":"Managing-the-Microsoft-365-tenant-Introduction-to-the-admin-centers-bzotoOjEe","title":"Managing the Microsoft 365 tenant - Introduction to the admin centers","featuredImage":"https://i.ibb.co/f1cr4zt/Microsoft-365-admin-centers.png"},{"id":"cg_vxOX9L","sectionId":"qwJW5VrBW","slug":"Managing-Microsoft-365-through-PowerShell-cg_vxOX9L","title":"Managing Microsoft 365 through PowerShell","featuredImage":"https://i.ibb.co/HV13YF6/install-microsoft-365-powershell-modules.png"},{"id":"uYCIPbnMC","sectionId":"AFV_acckJ","slug":"How-to-create-users-in-Microsoft-365-Cloud-Only-uYCIPbnMC","title":"How to create users in Microsoft 365 Cloud Only","featuredImage":"https://i.ibb.co/Wnt5Q43/View-Microsoft-365-Users.png"},{"id":"7CpqFkPZU","sectionId":"AFV_acckJ","slug":"Creating-and-managing-admins-through-roles-7CpqFkPZU","title":"Creating and managing admins through roles","featuredImage":"https://i.ibb.co/kySL4HQ/Roles-and-administrators.png"},{"id":"rZzausKJ1","sectionId":"AFV_acckJ","slug":"Time-limited-admin-roles-in-Microsoft-365-rZzausKJ1","title":"Time limited admin roles in Microsoft 365","featuredImage":"https://i.ibb.co/nDvjyPD/select-member-to-add-to-PIM-role.png"},{"id":"ky5W0Lz5P","sectionId":"AFV_acckJ","slug":"Whats-AD-Connect-ky5W0Lz5P","title":"What's AD Connect","featuredImage":"https://i.ibb.co/7nDqr9x/Whats-AD-Connect.png"},{"id":"i9pJIjTNH","sectionId":"AFV_acckJ","slug":"Protecting-Passwords-in-Microsoft-365-i9pJIjTNH","title":"Protecting Passwords in Microsoft 365","featuredImage":"https://i.ibb.co/DLD4G4q/access-smart-lockout-settings.png"},{"id":"S1hQgFOMV","sectionId":"AFV_acckJ","slug":"Creating-and-managing-users-through-groups-S1hQgFOMV","title":"Creating and managing users through groups","featuredImage":"https://i.ibb.co/nmmC28M/add-a-group-microsoft-365.png"},{"id":"2QfoI2HxY","sectionId":"AFV_acckJ","slug":"Securing-and-implementing-enterprise-applications-2QfoI2HxY","title":"Securing and implementing enterprise applications","featuredImage":"https://i.ibb.co/C2mp69m/disable-user-consent.png"},{"id":"V1en9Iugh","sectionId":"AFV_acckJ","slug":"Whats-a-conditional-access-policy-V1en9Iugh","title":"What's a conditional access policy?","featuredImage":"https://i.ibb.co/DQm1sY0/Create-conditional-access-policy.png"},{"id":"nAAIvNbtk","sectionId":"AFV_acckJ","slug":"The-many-ways-to-implement-multi-factor-authentication-MFA-in-Microsoft-365-nAAIvNbtk","title":"The many ways to implement multi-factor authentication (MFA) in Microsoft 365","featuredImage":"https://i.ibb.co/P1P0wNY/microsoft-365-manage-security-defaults.png"},{"id":"2S9jn0aLr","sectionId":"AFV_acckJ","slug":"Implement-Self-service-password-reset-in-Microsoft-365-2S9jn0aLr","title":"Implement Self-service password reset in Microsoft 365","featuredImage":"https://i.ibb.co/58y9JVg/write-back-passwords-to-on-premises-directory.png"},{"id":"FldNualGC","sectionId":"AFV_acckJ","slug":"Locking-down-your-Microsoft-365-tenant-from-Microsoft-engineers-FldNualGC","title":"Locking down your Microsoft 365 tenant from Microsoft engineers","featuredImage":"https://i.ibb.co/DCmpnT9/Enable-Customer-Lockbox.png"},{"id":"NFQ6rYFeQ","sectionId":"AFV_acckJ","slug":"Implementing-intelligent-security-using-risk-policies-in-Microsoft-365-NFQ6rYFeQ","title":"Implementing intelligent security using risk policies in Microsoft 365","featuredImage":"https://i.ibb.co/0cyQJ7j/Risk-Detections.png"},{"id":"rK48f6iM2","sectionId":"AFV_acckJ","slug":"Automating-Access-Review-in-Microsoft-365-rK48f6iM2","title":"Automating Access Review in Microsoft 365","featuredImage":"https://i.ibb.co/Xsxvz6Z/new-access-review.png"},{"id":"RHW1API2s","sectionId":"AFV_acckJ","slug":"Just-in-time-approval-and-notification-for-admin-roles-in-Microsoft-365-RHW1API2s","title":"Just in time, approval and notification for admin roles in Microsoft 365","featuredImage":"https://i.ibb.co/dcb6XFN/Activate-a-Role.png"},{"id":"z8EMM9Eu_","sectionId":"QScYfSu74","slug":"Whats-Microsoft-365-Defender-z8EMM9Eu_","title":"What's Microsoft 365 Defender?","featuredImage":"https://i.ibb.co/MDMyDQt/Microsoft-Defender.png"},{"id":"Kye_yNLxA","sectionId":"QScYfSu74","slug":"Whats-Microsoft-Defender-for-identity-Kye_yNLxA","title":"What's Microsoft Defender for identity?","featuredImage":"https://i.ibb.co/bQDBh0Y/Defender-for-Identity-Timeline.png"},{"id":"EnPyp7ukN","sectionId":"QScYfSu74","slug":"Whats-Microsoft-Defender-for-Office-365-EnPyp7ukN","title":"What's Microsoft Defender for Office 365?","featuredImage":"https://i.ibb.co/WcwKY2G/Microsoft-365-incidents-and-alerts.png"},{"id":"6HUOr7qbL","sectionId":"QScYfSu74","slug":"Protect-your-email-environment-from-malicious-actors-6HUOr7qbL","title":"Protect your email and Office environment from malicious actors","featuredImage":"https://i.ibb.co/Df0KQVp/Reports.png"},{"id":"GCOOUsSBT","sectionId":"QScYfSu74","slug":"Protecting-email-against-phishing-attacks-GCOOUsSBT","title":"Protecting email against phishing attacks","featuredImage":"https://i.ibb.co/GCjZHWg/edit-actions.png"},{"id":"GG4cMY8pK","sectionId":"QScYfSu74","slug":"Simulating-attacks-with-Microsoft-365-GG4cMY8pK","title":"Simulating attacks with Microsoft 365","featuredImage":"https://i.ibb.co/NyvnbMK/simulation-overview-view-users-circled.png"},{"id":"z0qPG6v4T","sectionId":"QScYfSu74","slug":"Protecting-Windows-10-and-other-devices-with-Microsoft-Defender-for-Endpoint-z0qPG6v4T","title":"Protecting Windows 10 and other devices with Microsoft Defender for Endpoint","featuredImage":"https://i.ibb.co/T47Xhyh/enable-endpoint-connections.png"},{"id":"LEyZMWBSt","sectionId":"QScYfSu74","slug":"Collect-detect-investigate-and-respond-to-security-threats-using-Microsoft-Sentinel-LEyZMWBSt","title":"Collect, detect, investigate, and respond to security threats using Microsoft Sentinel","featuredImage":"https://i.ibb.co/qN9XsKj/Add-Workbook.png"},{"id":"7MQ3wE4wP","sectionId":"QScYfSu74","slug":"Implement-and-manage-Microsoft-Defender-for-Cloud-Apps-7MQ3wE4wP","title":"Implement and manage Microsoft Defender for Cloud Apps","featuredImage":"https://i.ibb.co/7g7LvFg/office-365-cloud-apps-settings.png"},{"id":"sH_Ee1DW1","sectionId":"QScYfSu74","slug":"Auditing-sign-ins-and-other-actions-in-Microsoft-365-sH_Ee1DW1","title":"Auditing sign-ins and other actions in Microsoft 365","featuredImage":"https://i.ibb.co/BqMw3jZ/Start-recording-user-and-admin-activity.png"},{"id":"vLweLmxZf","sectionId":"YhftdGIRX","slug":"How-to-classify-data-using-labels-in-Microsoft-365-vLweLmxZf","title":"How to classify data using labels in Microsoft 365","featuredImage":"https://i.ibb.co/k9nhWS5/Choose-protection-settings-for-files-and-emails.png"},{"id":"NsF7No40f","sectionId":"YhftdGIRX","slug":"Creating-and-managing-data-retention-to-conform-to-compliance-NsF7No40f","title":"Creating and managing data retention to conform to compliance","featuredImage":"https://i.ibb.co/yqC0ZdY/New-Retention-Policy.png"},{"id":"IsPGsme8w","sectionId":"YhftdGIRX","slug":"Preventing-accidental-and-malicious-data-loss-with-DLP-policies-IsPGsme8w","title":"Preventing accidental and malicious data loss with DLP policies","featuredImage":"https://i.ibb.co/n8WcqKM/Create-a-DLP-policy.png"},{"id":"wv2PbXnhI","sectionId":"YhftdGIRX","slug":"Everything-you-need-to-know-about-securing-SharePoint-Online-for-the-MS-500-wv2PbXnhI","title":"Everything you need to know about securing SharePoint Online for the MS-500","featuredImage":"https://i.ibb.co/Gk9NjSH/Share-Point-Online-Warning.png"},{"id":"7gR3L122b","sectionId":"l0DxUuonW","slug":"Introduction-to-Intune-7gR3L122b","title":"Introduction to Intune","featuredImage":"https://i.ibb.co/Fq3N8BX/Endpoint-Manager-Admin-Center.png"},{"id":"ZyKX3Idjs","sectionId":"l0DxUuonW","slug":"Setting-up-Android-Devices-ZyKX3Idjs","title":"Setting up Android Devices","featuredImage":"https://i.ibb.co/m0BYhL2/Connect-Intune-to-Google-Play.png"},{"id":"MAjW0a2_p","sectionId":"l0DxUuonW","slug":"Setting-up-Apple--iOS-devices-in-Intune-MAjW0a2_p","title":"Setting up Apple / iOS devices in Intune","featuredImage":"https://i.ibb.co/X7Ffb2B/Setup-Apple-Enrollment-in-Intune.png"},{"id":"XFXu2zIS9","sectionId":"l0DxUuonW","slug":"Setting-up-Windows-10-devices-in-Intune-XFXu2zIS9","title":"Setting up Windows 10 devices in Intune","featuredImage":"https://i.ibb.co/WDXKVjW/configure-device-options.png"},{"id":"_LL9VqGZO","sectionId":"l0DxUuonW","slug":"How-to-manage-devices-using-Intune-_LL9VqGZO","title":"How to manage devices using Intune","featuredImage":"https://i.ibb.co/HPQ2m8t/Create-an-endpoint-protection-profile.png"},{"id":"qDRA4jjoN","sectionId":"l0DxUuonW","slug":"Understanding-compliance-policies-qDRA4jjoN","title":"Understanding compliance policies","featuredImage":"https://i.ibb.co/N3Qk57v/Create-a-compliance-policy.png"},{"id":"62t_7oiZx","sectionId":"l0DxUuonW","slug":"Restricting-and-managing-apps-on-user-devices-62t_7oiZx","title":"Restricting and managing apps on user devices","featuredImage":"https://i.ibb.co/PCVRKDf/Add-an-Android-app-to-Intune.png"}],
      articleHtml: `<p>So now we have Microsoft 365 fairly secure. There's one more question you should be asking yourself? How do we audit/monitor the user's actions? Before we jump into the logs there's something you should know. There are a couple of places for auditing but we'll keep it simple and stick to the two most common. First, let's take a look at sign-in logs. Next, we'll jump into auditing the Active Directory account auditing. Finally, we'll jump into auditing all actions.</p>
<h2>Sign-in logs</h2>
<p>Sign-in logs are probably the most common logs used in Microsoft 365. From there you can see when a user logs in, what location they signed in from, and much more. Let's jump in and take a look.</p>
<h3>How to view sign-in logs</h3>
<p>1. Go to <strong>Azure Active Directory admin center</strong> &gt; <strong>Azure Active Directory</strong> &gt; <a href="https://aad.portal.azure.com/#blade/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/SignIns" target="_blank"><strong>Sign-in logs</strong></a>.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/gSn6PVP/sign-in-logs.png" alt="Sign-in logs" style="height: auto;width: auto"/></div>
<p>From here you can see all the sign-ins to your Microsoft 365 tenant. You can filter the log to see more particular information. Finally, you can view the same sign-in logs from Azure Active Directory admin center &gt; Enterprise applications &gt; Sign-in logs.</p>
<h3>How to view sign-in logs for a user</h3>
<p>Now, you can go to the sign-in logs, then add a filter for a particular user but that's a bit tedious. Since most of the time when you want to review sign-in logs you are looking at a particular user let's look at the sign-in logs another way. By having it automatically filtered for a user.</p>
<p>1. Go to <strong>Azure Active Directory admin center</strong> &gt; <strong>Users</strong>. <strong>Select the user</strong> you want to view.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/F8FqcGJ/sign-in-logs-for-user.png" alt="Sign-in logs for user" style="height: auto;width: auto"/></div>
<p>2. Click <strong>Sign-in logs</strong>.</p>
<h3>How to read the sign-in logs</h3>
<p>Now that we are at the sign-in logs let's take a look at how to read them. Before we jump into reviewing one of the logs you should know one thing. The sign-in logs will show more than one sign-in for the user. For example, if you sign into the Microsoft 365 admin center and then navigate to the Azure AD admin center you'll see at least two "sign-ins". That's because every time you navigate to a different app in Microsoft 365 you are re-authenticating using the same token. Now, click one of the sign-ins to view the data.</p>
<h4>Basic info</h4>
<p>On the basic info tab, you can see, basic info on the sign-in. Surprised right? Anyway, from here you can see information like the user that the sign-in is related to, and what application they signed into.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/DDHPKTV/activity-details.png" alt="activity details" style="height: auto;width: auto"/></div>
<h4>Location</h4>
<p>On the location tab, you'll find the information on where the user logged in from. For example, you'll see the IP address and the best guess on the actual location. For example, Philadelphia, PA, US.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/QY6q69M/location-tab.png" alt="Location tab" style="height: auto;width: auto"/></div>
<h4>Device info</h4>
<p>From the device info tab, you'll find information about the device. If the device is in Azure AD, you may see a device name. If the sign-in is from a browser, you'll notice the browser is located in the device info tab.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/gZQ2vnG/device-info-tab.png" alt="Device info tab" style="height: auto;width: auto"/></div>
<h4>Authentication Details</h4>
<p>The authentication details tab is where you'll find information about how the user signed in. For example, if it's the actual sign-in you may see "Password Hash Sync" or "Password in the cloud". If the user is already signed in and simply connecting to another service you'll see "Previously satisfied"</p>
<div style="text-align:none;"><img src="https://i.ibb.co/85LXdWW/Authentication-Details.png" alt="Authentication Details" style="height: auto;width: auto"/></div>
<h4>Conditional access</h4>
<p>The conditional access tab will show you what conditional access policies were applied and which were not. It will also show you the status of the conditional access policy. For example, if the policy failed (and blocked the sign-in) then it will show Failure. Lastly, you can click the policy name to see information about the conditions and access controls. That way you can see why a policy failed, succeeded or didn't apply.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/2tCsbnf/conditional-access-policy-sign-in-logs.png" alt="conditional access policy sign-in logs" style="height: auto;width: auto"/></div>
<h4>Report only</h4>
<p>The report-only tab will show you conditional access policies that are in report-only mode. They won't block the sign-in but that way you can test your conditional access policies before applying them.</p>
<h4>Additional details</h4>
<p>This tab is typically empty.</p>
<h2>Account auditing</h2>
<p>What do I mean by account auditing? Well, every time you make a change to a user account it is logged in the Azure audit logs. For example, if you update the user display name or change the licenses assigned to a user, you'll see it in the account auditing logs.</p>
<h3>How to view account logs for the tenant</h3>
<p>Just like the sign-in logs except it's one option lower (or up depending on where you are)</p>
<p>1. Go to <strong>Azure Active Directory admin center</strong> &gt; <strong>Azure Active Directory</strong> &gt; <a href="https://aad.portal.azure.com/#blade/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/Audit" target="_blank"><strong>Audit logs</strong></a>.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/7GmvDjZ/view-audit-logs.png" alt="View audit logs" style="height: auto;width: auto"/></div>
<p>You can also view an individual's account auditing logs by going to <strong>Azure Active Directory</strong> &gt; <a href="https://aad.portal.azure.com/#blade/Microsoft_AAD_IAM/UsersManagementMenuBlade/MsGraphUsers" target="_blank"><strong>Users </strong></a>&gt; Click the user &gt; <strong>Audit Logs</strong>.</p>
<h2>Auditing actions</h2>
<p>Now that you have an understanding of auditing sign-ins and Active Directory account activity let's look at how to audit all the actions in Microsoft 365. You can review almost all activities in Microsoft 365. For example, you can review when a file is accessed and by whom. You can also view changes and access mailboxes. For example, you can view when an item is sent, moved, or updated. Before we can audit activity let's enable auditing.</p>
<h3>How to enable auditing in Microsoft 365</h3>
<p>1. Go to <strong>Microsoft 365 Defender admin center</strong> &gt; <strong>Audit</strong>. Click <strong>Start recording user and admin activity</strong>.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/BqMw3jZ/Start-recording-user-and-admin-activity.png" alt="Start recording user and admin activity" style="height: auto;width: auto"/></div>
<h3>How to enable auditing on mailboxes</h3>
<p>Now that auditing is enabled for the Microsoft 365 tenant let's make sure auditing is enabled in Exchange Online. First, we'll enable auditing admin actions. This is good if you need to see who read and deleted items in a mailbox. Next, we'll enable auditing for each mailbox.</p>
<h4>How to enable admin auditing</h4>
<p>To enable Exchange auditing we'll need to use PowerShell.</p>
<p>1. Open PowerShell and connect to Exchange Online using <a href="https://www.gitbit.org/course/ms-500/learn/Managing-Microsoft-365-through-PowerShell-cg_vxOX9L" target="_blank"><strong>Connect-ExchangeOnline</strong></a>.</p>
<p>2. Run the following command "<strong>Set-AdminAuditLogConfig -AdminAuditLogEnabled $true -AdminAuditLogCmdlets * -AdminAuditLogParameters *</strong>"</p>
<p>3. Then run the following command "<strong>Set-OrganizationConfig -AuditDisabled $false</strong>"</p>
<p>Note the stars in the log cmdlets and log parameters. These indicate we are auditing all cmdlets and all parameters. We can also limit the number of cmdlets audited by changing the cmdlets to *mailbox*. This will enable auditing for all PowerShell commands that use the mailbox word. For example, Set-Mailbox, Get-Mailbox, Set-MailboxFolder, Get-MailboxFolder, etc.</p>
<h4>How to enable auditing per mailbox</h4>
<p>Now that we've enabled auditing at the tenant level let's enable auditing on the mailbox level. Again, we'll be using Exchange Online PowerShell.</p>
<p>1. Open PowerShell and connect to Exchange Online using <a href="https://www.gitbit.org/course/ms-500/learn/Managing-Microsoft-365-through-PowerShell-cg_vxOX9L" target="_blank"><strong>Connect-ExchangeOnline</strong></a>.</p>
<p>2. Run the following command "<strong>Get-Mailbox -ResultSize unlimited | Set-Mailbox -AuditEnabled $true -DefaultAuditSet Admin,Delegate,Owne</strong>r"</p>
<p>Note you can also enable auditing for one mailbox using the following command 'Set-Maibox -Identity "User1" -AuditEnabled $true' and replace User1 with the display name or user principal name of the account you want to enable auditing for.</p>
`,
      nextContentSlug: 'How-to-classify-data-using-labels-in-Microsoft-365-vLweLmxZf',
      previousContentSlug: 'Implement-and-manage-Microsoft-Defender-for-Cloud-Apps-7MQ3wE4wP',
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
