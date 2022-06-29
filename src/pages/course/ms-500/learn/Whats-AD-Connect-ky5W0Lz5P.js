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
      course: {"sections":[{"order":0,"id":"qwJW5VrBW","title":"Introduction"},{"order":1,"title":"Securing identity and access to Microsoft 365","id":"AFV_acckJ"},{"title":"Securing Microsoft 365, clouds, and on-premises environments","order":2,"id":"QScYfSu74"},{"title":"Protecting your environment from accidental and malicious data loss","id":"YhftdGIRX","order":3},{"title":"Protecting User devices using Intune","id":"l0DxUuonW","order":4}],"description":"Learn, prepare and training for the Microsoft Microsoft Office 365 Exam MS-500: Microsoft 365 Security Administration MS-500 exam","id":"MS-500","title":"Training for MS-500: Microsoft Office 365 Security Admin","audience":"Anyone who wants to learn about securing Microsoft 365","contentOrder":["cpchjBLkC","KKkBOVuS4","bzotoOjEe","cg_vxOX9L","uYCIPbnMC","7CpqFkPZU","rZzausKJ1","ky5W0Lz5P","i9pJIjTNH","S1hQgFOMV","2QfoI2HxY","V1en9Iugh","nAAIvNbtk","2S9jn0aLr","FldNualGC","NFQ6rYFeQ","rK48f6iM2","RHW1API2s","z8EMM9Eu_","Kye_yNLxA","EnPyp7ukN","6HUOr7qbL","GCOOUsSBT","GG4cMY8pK","z0qPG6v4T","LEyZMWBSt","7MQ3wE4wP","sH_Ee1DW1","vLweLmxZf","NsF7No40f","IsPGsme8w","wv2PbXnhI","7gR3L122b","ZyKX3Idjs","MAjW0a2_p","XFXu2zIS9","_LL9VqGZO","qDRA4jjoN","62t_7oiZx"]},
      article: {"featuredImage":"https://i.ibb.co/7nDqr9x/Whats-AD-Connect.png","description":"Sync your on-premise Active Directory users to Microsoft 365. Quickly create users in Microsoft 365 and continue to sync your users from on-premise AD to Microsoft Azure Active Directory.","title":"What's AD Connect","article":{"entityMap":{"0":{"type":"IMAGE","mutability":"MUTABLE","data":{"src":"https://i.ibb.co/7nDqr9x/Whats-AD-Connect.png","width":"auto","height":"auto","url":"https://www.microsoft.com/en-us/download/details.aspx?id=47594","alt":"What's AD Connect","alignment":"none","targetOption":"_blank"}},"1":{"data":{"targetOption":"_blank","url":"https://www.microsoft.com/en-us/download/details.aspx?id=47594"},"mutability":"MUTABLE","type":"LINK"},"2":{"data":{"url":"https://docs.microsoft.com/en-us/azure/active-directory/hybrid/how-to-connect-install-roadmap","targetOption":"_blank"},"type":"LINK","mutability":"MUTABLE"},"3":{"type":"LINK","mutability":"MUTABLE","data":{"targetOption":"_blank","url":"https://docs.microsoft.com/en-us/azure/active-directory/hybrid/how-to-connect-install-express"}},"4":{"data":{"height":"auto","alt":"Unhealthy identity synchronization notification","url":"https://docs.microsoft.com/en-us/azure/active-directory/authentication/concept-registration-mfa-sspr-combined","alignment":"none","targetOption":"_blank","width":"auto","src":"https://i.ibb.co/Vw4Y5TN/Unhealthy-identity-synchronization-notification.png"},"mutability":"MUTABLE","type":"IMAGE"},"5":{"mutability":"MUTABLE","data":{"url":"https://docs.microsoft.com/en-us/azure/active-directory/authentication/concept-registration-mfa-sspr-combined","height":"auto","targetOption":"_blank","width":"auto","alignment":"none","alt":"AD Connect Error","src":"https://i.ibb.co/3CS1K7m/AD-Connect-error.png"},"type":"IMAGE"},"6":{"data":{"targetOption":"_blank","url":"https://docs.microsoft.com/en-us/azure/active-directory/authentication/concept-registration-mfa-sspr-combined"},"type":"LINK","mutability":"MUTABLE"},"7":{"mutability":"MUTABLE","data":{"url":"https://docs.microsoft.com/en-us/azure/active-directory/authentication/tutorial-enable-sspr-writeback","targetOption":"_blank"},"type":"LINK"}},"blocks":[{"data":{},"text":"Now, if you've been around Microsoft technology for a while you've heard of user accounts. It's the term they've been using for decades but recently things have become a bit more complicated. A person can have a user account in your on-premises Active Directory. They can have a user account in Microsoft 365. They can have a user account in other cloud providers as well. So now Microsoft, and the technology industry, have started separating user accounts and identities. User accounts may contain an email address, name, and other information about the person. The identity controls the authentication, for example, the username, and password.","type":"unstyled","entityRanges":[],"key":"dj096","depth":0,"inlineStyleRanges":[{"style":"color-rgb(33,37,41)","length":646,"offset":0},{"style":"bgcolor-rgb(255,255,255)","offset":0,"length":646},{"offset":0,"style":"fontsize-16","length":646},{"style":"fontfamily-system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", \"Liberation Sans\", sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji","offset":0,"length":646}]},{"depth":0,"data":{},"entityRanges":[{"key":0,"offset":0,"length":1}],"type":"atomic","inlineStyleRanges":[],"key":"78bc2","text":" "},{"inlineStyleRanges":[],"key":"72igr","entityRanges":[],"type":"header-two","depth":0,"text":"Synchronizing your on-premises Active Directory (AD) to Microsoft 365","data":{}},{"entityRanges":[],"depth":0,"text":"AD Connect Is a Microsoft application that can be installed on a domain-joined Windows Server 2016 or later server that will sync your on-premises Active Directory to Microsoft 365’s Azure Active Directory. Every time you create, update, disable, or delete a user account in your on-premises AD, AD Connect will automatically sync that change to Microsoft 365.","inlineStyleRanges":[],"key":"4u7te","type":"unstyled","data":{}},{"inlineStyleRanges":[],"entityRanges":[],"key":"9asia","type":"header-three","depth":0,"text":"Why use Azure AD Connect?","data":{}},{"type":"unstyled","key":"b4qvi","text":"Azure AD Connect makes managing users ten times easier. By allowing you and your admins to update a user account once and then have that information sync to Microsoft 365 it reduces duplicating work. When a user is terminated, you will only need to remember to disable the account in your on-premise AD and then allow that change to sync to Microsoft 365 locking the user out of your on-premise AD, as well as, Microsoft 365 and anywhere else that identity information is being used.","inlineStyleRanges":[],"entityRanges":[],"data":{},"depth":0},{"type":"header-three","depth":0,"inlineStyleRanges":[],"entityRanges":[],"text":"Synced vs cloud-only accounts","key":"gq9h","data":{}},{"text":"You may see me or other admins refer to Microsoft 365 accounts as synced or cloud-only. A synced account is a user account that is being synchronized from the on-premises AD. A cloud-only user account is a user account that is not synced from the on-premises AD. If you aren't using AD Connect, all your accounts are cloud-only. If you have installed AD Connect and have user accounts that are on-premises and being synced to the Microsoft 365 tenant then those accounts are synced.","type":"unstyled","data":{},"depth":0,"inlineStyleRanges":[],"key":"3ur5q","entityRanges":[]},{"entityRanges":[],"key":"36cgb","data":{},"depth":0,"type":"header-three","inlineStyleRanges":[],"text":"Installing AD Connect"},{"text":"Let us not waste any time discussing how to install AD Connect because it isn’t covered in the MS-500 test. Instead, I will point you to a couple of useful articles from Microsoft about installing AD Connect. Although, if you haven't installed AD Connect before I'd recommend hiring a consultant. There's a lot to consider when installing AD Connect including the user principal name, the source anchor, whether you have an on-premise Exchange server, and a slew of other requirements.","type":"unstyled","entityRanges":[],"depth":0,"data":{},"inlineStyleRanges":[],"key":"62j5j"},{"entityRanges":[{"key":1,"length":62,"offset":27}],"data":{},"type":"unstyled","text":"Azure AD Connect Download: https://www.microsoft.com/en-us/download/details.aspx?id=47594 ","inlineStyleRanges":[],"depth":0,"key":"f9gn1"},{"key":"c7dsg","inlineStyleRanges":[],"entityRanges":[{"offset":26,"length":93,"key":2}],"type":"unstyled","text":"AD Connect How-to guides: https://docs.microsoft.com/en-us/azure/active-directory/hybrid/how-to-connect-install-roadmap ","depth":0,"data":{}},{"entityRanges":[{"length":93,"offset":35,"key":3}],"depth":0,"type":"unstyled","inlineStyleRanges":[],"key":"ve3g","data":{},"text":"How to express install AD Connect: https://docs.microsoft.com/en-us/azure/active-directory/hybrid/how-to-connect-install-express "},{"data":{},"type":"header-three","inlineStyleRanges":[],"text":"User Sign-in Methods","entityRanges":[],"depth":0,"key":"ahpru"},{"key":"4e80a","type":"unstyled","text":"One part of AD connect that Microsoft does cover under the MS-500 test is the sign-in method, also known as, the sign-in options. The sign-in options dictate how your on-premises synced users will authenticate when signing into a Microsoft 365 app. For example, you can configure AD Connect to synchronize a hash of the passwords. When a user is signing into Microsoft 365 Microsoft can manage the authentication by comparing the username and password supplied by the user with the username and password hash that is synced to Microsoft 365. This is known as password hash synchronization.","inlineStyleRanges":[],"data":{},"depth":0,"entityRanges":[]},{"type":"header-four","depth":0,"data":{},"key":"3ojl0","entityRanges":[],"text":"What’s Password Hash Synchronization","inlineStyleRanges":[]},{"text":"As mentioned above, password hash synchronization will configure AD Connect to synchronize a hash of your user's passwords to Microsoft 365. It's important to note, that the password is not synchronized across your Internet and Azure is not storing your passwords. It's an encrypted hash of the password.","depth":0,"key":"82p4n","entityRanges":[],"data":{},"inlineStyleRanges":[],"type":"unstyled"},{"inlineStyleRanges":[],"key":"2iu31","depth":0,"entityRanges":[],"data":{},"text":"Password hash synchronization is also known as \"same sign-on\". It's known as same sign-on because a user will use the same credentials to sign in to your on-premise Active Directory, as well as, your Microsoft 365 environment.","type":"unstyled"},{"entityRanges":[],"key":"5d7ir","inlineStyleRanges":[],"data":{},"type":"unstyled","text":"A couple of noteworthy points on password hash synchronization:","depth":0},{"data":{},"inlineStyleRanges":[],"depth":0,"entityRanges":[],"text":"Password hash synchronization is the easiest sign-in method to support.","key":"6s37j","type":"unordered-list-item"},{"key":"djhq","data":{},"inlineStyleRanges":[],"entityRanges":[],"depth":0,"type":"unordered-list-item","text":"Password hash synchronization can be disabled in AD Connect."},{"depth":0,"data":{},"inlineStyleRanges":[],"type":"unordered-list-item","text":"Password hash synchronization doesn’t take any other servers or software. It works through AD Connect.","entityRanges":[],"key":"b449h"},{"type":"header-five","entityRanges":[],"data":{},"key":"5m9cb","text":"Limitations of password hash synchronization","depth":0,"inlineStyleRanges":[]},{"type":"unstyled","entityRanges":[],"depth":0,"text":"By default, Password hash synchronization doesn’t support the password expiration policy. if a user's password expires on-premise the user can continue to sign in to Microsoft 365 without changing their password. By default, the cloud account password is set to never expire.","key":"de0mn","data":{},"inlineStyleRanges":[]},{"type":"unstyled","data":{},"entityRanges":[],"key":"bu4va","inlineStyleRanges":[],"text":"Out of the box AD Connect does not support “user must change password at next logon”. You can however and able it but you'll also want to enable password writeback. More on password write back later in the article.","depth":0},{"depth":0,"text":"AD Connect does not support account expiration. If you use account expirations in your on-premises AD, you'll need to create a PowerShell script that disables the user account in Azure AD or use Pass-through authentication.","data":{},"entityRanges":[],"key":"7e0d9","inlineStyleRanges":[],"type":"unstyled"},{"type":"unstyled","key":"5u7cp","text":"When you reset a password in Azure AD of a synchronized user the password will be overwritten by the on-premises AD password during the next password sync cycle. ","inlineStyleRanges":[],"data":{},"entityRanges":[],"depth":0},{"text":"Leaked credential detection","entityRanges":[],"depth":0,"inlineStyleRanges":[],"key":"8grtl","type":"header-five","data":{}},{"inlineStyleRanges":[],"depth":0,"entityRanges":[],"key":"eok56","data":{},"text":"A quick side note, for Microsoft 365 to perform leaked credential detection you'll need to have password hash synchronization enabled even if your sign-in method has users signing in to your on-premises Active Directory.","type":"unstyled"},{"entityRanges":[],"depth":0,"data":{},"key":"4loin","inlineStyleRanges":[],"text":"Active Directory Federation Services (ADFS)","type":"header-four"},{"inlineStyleRanges":[],"depth":0,"text":"ADFS is a software application developed by Microsoft two provide single sign-on (SSO). With ADFS users that are authenticating to Microsoft 365 will be redirected to your ADFS servers. NDFS uses claims-based access control authorization which is a process where the user is identified by a set of claims related to their identity. The claims are packaged into a secure token by ADFS and then sent to Microsoft 365.","data":{},"type":"unstyled","entityRanges":[],"key":"9obhb"},{"key":"cagtp","depth":0,"type":"unstyled","data":{},"text":"Your ADFS servers will have requests sent to them every time a user authenticates to Microsoft 365. Because of this, it's typically recommended to have a minimum of Two ADFS servers. Since authentication can happen at the ADFS servers it's also recommended to implement ADFS proxy servers. Two ADFS proxy servers are also recommended.","entityRanges":[],"inlineStyleRanges":[]},{"entityRanges":[],"type":"unstyled","inlineStyleRanges":[],"key":"27v0k","data":{},"depth":0,"text":"A couple of quick notes on ADFS:"},{"inlineStyleRanges":[],"type":"unordered-list-item","depth":0,"text":"ADFS is one of the most complicated authentication systems available as a sign-in option for Microsoft 365.","key":"dqhii","entityRanges":[],"data":{}},{"depth":0,"entityRanges":[],"data":{},"inlineStyleRanges":[],"text":"Since your users will be authenticating to the ADFS it’s recommended to have redundant servers.","type":"unordered-list-item","key":"8hjcc"},{"type":"unordered-list-item","text":"ADFS is one of the most expensive sign-in options for Microsoft 365.","entityRanges":[],"key":"7brpc","inlineStyleRanges":[],"data":{},"depth":0},{"data":{},"entityRanges":[],"key":"9tgu8","text":"Pass-through authentication","inlineStyleRanges":[],"depth":0,"type":"header-four"},{"depth":0,"type":"unstyled","inlineStyleRanges":[],"key":"a617l","text":"Pass-through authentication (PTA) works like ADFS. With pass-through authentication users that are trying to access your Microsoft 365 environment will be passed to an on-premises server that has the PTA agent installed. Just like ADFS when a user signs in the username and password will be validated directly against your on-premises Active Directory.","data":{},"entityRanges":[]},{"depth":0,"type":"unstyled","text":"Pass-through authentication does not affect cloud-only users. When a user with a cloud-only account (an account that isn't synced from your on-premises AD) the users will still be able to log in. It's good to have at least one global admin that's a cloud-only account in case of PTA failure.","key":"3nnds","inlineStyleRanges":[],"entityRanges":[],"data":{}},{"inlineStyleRanges":[],"type":"header-three","entityRanges":[],"key":"85t92","text":"Troubleshooting AD Connect","depth":0,"data":{}},{"type":"unstyled","entityRanges":[],"text":"Troubleshooting AD Connect can be a bit complicated Because there are four places that you may need to check to view the errors (although the data is usually redundant)","depth":0,"data":{},"key":"5hq98","inlineStyleRanges":[]},{"depth":0,"data":{},"key":"a5uth","inlineStyleRanges":[],"type":"ordered-list-item","text":"Directory Sync status in the Microsoft 365 admin center.","entityRanges":[]},{"type":"ordered-list-item","depth":0,"data":{},"entityRanges":[],"key":"54ev4","text":"Sync errors in the Azure AD admin center (found under Azure Active Directory Connect health)","inlineStyleRanges":[]},{"depth":0,"data":{},"key":"87jkg","type":"ordered-list-item","entityRanges":[],"inlineStyleRanges":[],"text":"The synchronization service app on the AD Connect server"},{"key":"e4rhg","entityRanges":[],"data":{},"type":"ordered-list-item","depth":0,"inlineStyleRanges":[],"text":"The application event logs on the AD Connect server"},{"key":"ak2q","type":"header-four","entityRanges":[],"depth":0,"text":"The errors you'll receive","data":{},"inlineStyleRanges":[]},{"data":{},"inlineStyleRanges":[],"depth":0,"key":"fkj86","text":"The first thing you'll receive is an email with the subject line \"Unhealthy identity synchronization notification\".","type":"unstyled","entityRanges":[]},{"data":{},"depth":0,"entityRanges":[{"length":1,"offset":0,"key":4}],"inlineStyleRanges":[],"type":"atomic","text":" ","key":"f9b7n"},{"entityRanges":[],"type":"header-four","key":"c1fi0","data":{},"depth":0,"inlineStyleRanges":[],"text":"How to review the error"},{"data":{},"inlineStyleRanges":[{"style":"BOLD","length":22,"offset":214},{"offset":266,"style":"BOLD","length":6},{"length":6,"style":"BOLD","offset":307}],"entityRanges":[],"text":"To review the error in more detail log on to the server that has the AD Connect service running then open the Synchronization Service Manager application. From there you'll see one of the profiles with a status of Completed-export-error. Click on it. Then click the error (in the bottom right corner. Click Detail. You can also click the CN=GUID to view the account that changed and what attributes have changed.","type":"unstyled","key":"8jmhv","depth":0},{"text":" ","inlineStyleRanges":[],"data":{},"entityRanges":[{"offset":0,"length":1,"key":5}],"key":"28a4n","depth":0,"type":"atomic"},{"type":"header-three","text":"Password Writeback","entityRanges":[],"inlineStyleRanges":[],"key":"6qui","depth":0,"data":{}},{"entityRanges":[],"depth":0,"key":"7n113","text":"Remember when I said AD Connect synchronizes your on-premises Active Directory to Microsoft 365, that it's a one-way sync? Now we're getting into the exceptions. Password writeback allows admins, as well as, users to update their password in Microsoft 365 and have that password synchronized back to the on-premises Active Directory. Let's say all your users are working from home. And occasionally, a user forgets their password. Currently, they call into your IT helpdesk and the IT staff must reset the password in Active Directory manually. With password writeback those calls are history. Users can go to the Microsoft 365 portal And through their username authenticate using text messages, phone calls, or another MFA authorization and reset their passwords.","inlineStyleRanges":[],"type":"unstyled","data":{}},{"inlineStyleRanges":[],"type":"unstyled","text":"Note: Azure AD P1 licenses are needed to configure password writeback.","depth":0,"data":{},"entityRanges":[],"key":"4738e"},{"depth":0,"entityRanges":[],"key":"d20f1","data":{},"text":"Configuring password writeback is out of scope for the MS-500 but here are two Microsoft articles to help you get started: ","type":"unstyled","inlineStyleRanges":[]},{"depth":0,"text":"https://docs.microsoft.com/en-us/azure/active-directory/authentication/concept-registration-mfa-sspr-combined ","entityRanges":[{"key":6,"offset":0,"length":109}],"key":"ba1mc","inlineStyleRanges":[],"data":{},"type":"unordered-list-item"},{"inlineStyleRanges":[],"type":"unordered-list-item","entityRanges":[{"length":101,"offset":0,"key":7}],"depth":0,"text":"https://docs.microsoft.com/en-us/azure/active-directory/authentication/tutorial-enable-sspr-writeback ","key":"7bc2u","data":{}},{"key":"4vd79","type":"header-three","inlineStyleRanges":[],"data":{},"entityRanges":[],"depth":0,"text":"Other writeback options"},{"inlineStyleRanges":[],"type":"unstyled","key":"oan","depth":0,"data":{},"text":"For a while, Microsoft did allow organizations to configure user writeback where an admin could change a user's attributes in Microsoft 365 and have the attributes writeback to an on-premises environment. Today, Microsoft doesn't allow user writeback. As mentioned above, they do allow password writeback.","entityRanges":[]},{"entityRanges":[],"data":{},"text":"Microsoft also allows group writeback Where users can create and manage Microsoft 365 groups in Microsoft 365 and have those groups write back to the on-premises Active Directory.","depth":0,"inlineStyleRanges":[],"key":"67jkm","type":"unstyled"},{"depth":0,"inlineStyleRanges":[],"key":"dcg83","type":"unstyled","entityRanges":[],"data":{},"text":"Microsoft also allows device writeback. Device writeback will create a device object in the on-premises Active Directory for every Azure AD-managed device. The devices will be located in an OU called RegisteredDevices."},{"key":"buj1i","text":"Hybrid Azure AD Joined devices","type":"header-three","entityRanges":[],"inlineStyleRanges":[],"data":{},"depth":0},{"key":"1sg80","text":"Hybrid Azure AD joined devices are devices that are joined to your on-premises AD and registered with Azure AD through AD Connect. Configuring a hybrid Azure AD join will ensure that all domain-joined computers are registered in Azure AD. It’s also an important step if you want to manage your domain-joined computers using Intune.","inlineStyleRanges":[],"type":"unstyled","data":{},"depth":0,"entityRanges":[]}]},"id":"ky5W0Lz5P","slug":"Whats-AD-Connect-ky5W0Lz5P","publish":true,"images":["https://i.ibb.co/7nDqr9x/Whats-AD-Connect.png","https://i.ibb.co/Vw4Y5TN/Unhealthy-identity-synchronization-notification.png","https://i.ibb.co/3CS1K7m/AD-Connect-error.png"],"sectionId":"AFV_acckJ","type":"article","datePublished":"2022/5/26"},
      articles: [{"id":"cpchjBLkC","sectionId":"qwJW5VrBW","slug":"Whats-in-this-course-cpchjBLkC","title":"What's in this course?","featuredImage":"https://i.ibb.co/zFs9Vfb/microsoft365-security-administrator-associate-600x600.png"},{"id":"KKkBOVuS4","sectionId":"qwJW5VrBW","slug":"Creating-a-free-Microsoft-365-tenant-for-practice-KKkBOVuS4","title":"Creating a free Microsoft 365 tenant for practice","featuredImage":"https://i.ibb.co/F07sjQJ/microsoft-365-e5-trial.png"},{"id":"bzotoOjEe","sectionId":"qwJW5VrBW","slug":"Managing-the-Microsoft-365-tenant-Introduction-to-the-admin-centers-bzotoOjEe","title":"Managing the Microsoft 365 tenant - Introduction to the admin centers","featuredImage":"https://i.ibb.co/f1cr4zt/Microsoft-365-admin-centers.png"},{"id":"cg_vxOX9L","sectionId":"qwJW5VrBW","slug":"Managing-Microsoft-365-through-PowerShell-cg_vxOX9L","title":"Managing Microsoft 365 through PowerShell","featuredImage":"https://i.ibb.co/HV13YF6/install-microsoft-365-powershell-modules.png"},{"id":"uYCIPbnMC","sectionId":"AFV_acckJ","slug":"How-to-create-users-in-Microsoft-365-Cloud-Only-uYCIPbnMC","title":"How to create users in Microsoft 365 Cloud Only","featuredImage":"https://i.ibb.co/Wnt5Q43/View-Microsoft-365-Users.png"},{"id":"7CpqFkPZU","sectionId":"AFV_acckJ","slug":"Creating-and-managing-admins-through-roles-7CpqFkPZU","title":"Creating and managing admins through roles","featuredImage":"https://i.ibb.co/kySL4HQ/Roles-and-administrators.png"},{"id":"rZzausKJ1","sectionId":"AFV_acckJ","slug":"Time-limited-admin-roles-in-Microsoft-365-rZzausKJ1","title":"Time limited admin roles in Microsoft 365","featuredImage":"https://i.ibb.co/nDvjyPD/select-member-to-add-to-PIM-role.png"},{"id":"ky5W0Lz5P","sectionId":"AFV_acckJ","slug":"Whats-AD-Connect-ky5W0Lz5P","title":"What's AD Connect","featuredImage":"https://i.ibb.co/7nDqr9x/Whats-AD-Connect.png"},{"id":"i9pJIjTNH","sectionId":"AFV_acckJ","slug":"Protecting-Passwords-in-Microsoft-365-i9pJIjTNH","title":"Protecting Passwords in Microsoft 365","featuredImage":"https://i.ibb.co/DLD4G4q/access-smart-lockout-settings.png"},{"id":"S1hQgFOMV","sectionId":"AFV_acckJ","slug":"Creating-and-managing-users-through-groups-S1hQgFOMV","title":"Creating and managing users through groups","featuredImage":"https://i.ibb.co/nmmC28M/add-a-group-microsoft-365.png"},{"id":"2QfoI2HxY","sectionId":"AFV_acckJ","slug":"Securing-and-implementing-enterprise-applications-2QfoI2HxY","title":"Securing and implementing enterprise applications","featuredImage":"https://i.ibb.co/C2mp69m/disable-user-consent.png"},{"id":"V1en9Iugh","sectionId":"AFV_acckJ","slug":"Whats-a-conditional-access-policy-V1en9Iugh","title":"What's a conditional access policy?","featuredImage":"https://i.ibb.co/DQm1sY0/Create-conditional-access-policy.png"},{"id":"nAAIvNbtk","sectionId":"AFV_acckJ","slug":"The-many-ways-to-implement-multi-factor-authentication-MFA-in-Microsoft-365-nAAIvNbtk","title":"The many ways to implement multi-factor authentication (MFA) in Microsoft 365","featuredImage":"https://i.ibb.co/P1P0wNY/microsoft-365-manage-security-defaults.png"},{"id":"2S9jn0aLr","sectionId":"AFV_acckJ","slug":"Implement-Self-service-password-reset-in-Microsoft-365-2S9jn0aLr","title":"Implement Self-service password reset in Microsoft 365","featuredImage":"https://i.ibb.co/58y9JVg/write-back-passwords-to-on-premises-directory.png"},{"id":"FldNualGC","sectionId":"AFV_acckJ","slug":"Locking-down-your-Microsoft-365-tenant-from-Microsoft-engineers-FldNualGC","title":"Locking down your Microsoft 365 tenant from Microsoft engineers","featuredImage":"https://i.ibb.co/DCmpnT9/Enable-Customer-Lockbox.png"},{"id":"NFQ6rYFeQ","sectionId":"AFV_acckJ","slug":"Implementing-intelligent-security-using-risk-policies-in-Microsoft-365-NFQ6rYFeQ","title":"Implementing intelligent security using risk policies in Microsoft 365","featuredImage":"https://i.ibb.co/0cyQJ7j/Risk-Detections.png"},{"id":"rK48f6iM2","sectionId":"AFV_acckJ","slug":"Automating-Access-Review-in-Microsoft-365-rK48f6iM2","title":"Automating Access Review in Microsoft 365","featuredImage":"https://i.ibb.co/Xsxvz6Z/new-access-review.png"},{"id":"RHW1API2s","sectionId":"AFV_acckJ","slug":"Just-in-time-approval-and-notification-for-admin-roles-in-Microsoft-365-RHW1API2s","title":"Just in time, approval and notification for admin roles in Microsoft 365","featuredImage":"https://i.ibb.co/dcb6XFN/Activate-a-Role.png"},{"id":"z8EMM9Eu_","sectionId":"QScYfSu74","slug":"Whats-Microsoft-365-Defender-z8EMM9Eu_","title":"What's Microsoft 365 Defender?","featuredImage":"https://i.ibb.co/MDMyDQt/Microsoft-Defender.png"},{"id":"Kye_yNLxA","sectionId":"QScYfSu74","slug":"Whats-Microsoft-Defender-for-identity-Kye_yNLxA","title":"What's Microsoft Defender for identity?","featuredImage":"https://i.ibb.co/bQDBh0Y/Defender-for-Identity-Timeline.png"},{"id":"EnPyp7ukN","sectionId":"QScYfSu74","slug":"Whats-Microsoft-Defender-for-Office-365-EnPyp7ukN","title":"What's Microsoft Defender for Office 365?","featuredImage":"https://i.ibb.co/WcwKY2G/Microsoft-365-incidents-and-alerts.png"},{"id":"6HUOr7qbL","sectionId":"QScYfSu74","slug":"Protect-your-email-environment-from-malicious-actors-6HUOr7qbL","title":"Protect your email and Office environment from malicious actors","featuredImage":"https://i.ibb.co/Df0KQVp/Reports.png"},{"id":"GCOOUsSBT","sectionId":"QScYfSu74","slug":"Protecting-email-against-phishing-attacks-GCOOUsSBT","title":"Protecting email against phishing attacks","featuredImage":"https://i.ibb.co/GCjZHWg/edit-actions.png"},{"id":"GG4cMY8pK","sectionId":"QScYfSu74","slug":"Simulating-attacks-with-Microsoft-365-GG4cMY8pK","title":"Simulating attacks with Microsoft 365","featuredImage":"https://i.ibb.co/NyvnbMK/simulation-overview-view-users-circled.png"},{"id":"z0qPG6v4T","sectionId":"QScYfSu74","slug":"Protecting-Windows-10-and-other-devices-with-Microsoft-Defender-for-Endpoint-z0qPG6v4T","title":"Protecting Windows 10 and other devices with Microsoft Defender for Endpoint","featuredImage":"https://i.ibb.co/T47Xhyh/enable-endpoint-connections.png"},{"id":"LEyZMWBSt","sectionId":"QScYfSu74","slug":"Collect-detect-investigate-and-respond-to-security-threats-using-Microsoft-Sentinel-LEyZMWBSt","title":"Collect, detect, investigate, and respond to security threats using Microsoft Sentinel","featuredImage":"https://i.ibb.co/qN9XsKj/Add-Workbook.png"},{"id":"7MQ3wE4wP","sectionId":"QScYfSu74","slug":"Implement-and-manage-Microsoft-Defender-for-Cloud-Apps-7MQ3wE4wP","title":"Implement and manage Microsoft Defender for Cloud Apps","featuredImage":"https://i.ibb.co/7g7LvFg/office-365-cloud-apps-settings.png"},{"id":"sH_Ee1DW1","sectionId":"QScYfSu74","slug":"Auditing-sign-ins-and-other-actions-in-Microsoft-365-sH_Ee1DW1","title":"Auditing sign-ins and other actions in Microsoft 365","featuredImage":"https://i.ibb.co/BqMw3jZ/Start-recording-user-and-admin-activity.png"},{"id":"vLweLmxZf","sectionId":"YhftdGIRX","slug":"How-to-classify-data-using-labels-in-Microsoft-365-vLweLmxZf","title":"How to classify data using labels in Microsoft 365","featuredImage":"https://i.ibb.co/k9nhWS5/Choose-protection-settings-for-files-and-emails.png"},{"id":"NsF7No40f","sectionId":"YhftdGIRX","slug":"Creating-and-managing-data-retention-to-conform-to-compliance-NsF7No40f","title":"Creating and managing data retention to conform to compliance","featuredImage":"https://i.ibb.co/yqC0ZdY/New-Retention-Policy.png"},{"id":"IsPGsme8w","sectionId":"YhftdGIRX","slug":"Preventing-accidental-and-malicious-data-loss-with-DLP-policies-IsPGsme8w","title":"Preventing accidental and malicious data loss with DLP policies","featuredImage":"https://i.ibb.co/n8WcqKM/Create-a-DLP-policy.png"},{"id":"wv2PbXnhI","sectionId":"YhftdGIRX","slug":"Everything-you-need-to-know-about-securing-SharePoint-Online-for-the-MS-500-wv2PbXnhI","title":"Everything you need to know about securing SharePoint Online for the MS-500","featuredImage":"https://i.ibb.co/Gk9NjSH/Share-Point-Online-Warning.png"},{"id":"7gR3L122b","sectionId":"l0DxUuonW","slug":"Introduction-to-Intune-7gR3L122b","title":"Introduction to Intune","featuredImage":"https://i.ibb.co/Fq3N8BX/Endpoint-Manager-Admin-Center.png"},{"id":"ZyKX3Idjs","sectionId":"l0DxUuonW","slug":"Setting-up-Android-Devices-ZyKX3Idjs","title":"Setting up Android Devices","featuredImage":"https://i.ibb.co/m0BYhL2/Connect-Intune-to-Google-Play.png"},{"id":"MAjW0a2_p","sectionId":"l0DxUuonW","slug":"Setting-up-Apple--iOS-devices-in-Intune-MAjW0a2_p","title":"Setting up Apple / iOS devices in Intune","featuredImage":"https://i.ibb.co/X7Ffb2B/Setup-Apple-Enrollment-in-Intune.png"},{"id":"XFXu2zIS9","sectionId":"l0DxUuonW","slug":"Setting-up-Windows-10-devices-in-Intune-XFXu2zIS9","title":"Setting up Windows 10 devices in Intune","featuredImage":"https://i.ibb.co/WDXKVjW/configure-device-options.png"},{"id":"_LL9VqGZO","sectionId":"l0DxUuonW","slug":"How-to-manage-devices-using-Intune-_LL9VqGZO","title":"How to manage devices using Intune","featuredImage":"https://i.ibb.co/HPQ2m8t/Create-an-endpoint-protection-profile.png"},{"id":"qDRA4jjoN","sectionId":"l0DxUuonW","slug":"Understanding-compliance-policies-qDRA4jjoN","title":"Understanding compliance policies","featuredImage":"https://i.ibb.co/N3Qk57v/Create-a-compliance-policy.png"},{"id":"62t_7oiZx","sectionId":"l0DxUuonW","slug":"Restricting-and-managing-apps-on-user-devices-62t_7oiZx","title":"Restricting and managing apps on user devices","featuredImage":"https://i.ibb.co/PCVRKDf/Add-an-Android-app-to-Intune.png"}],
      articleHtml: `<p><span style="color: rgb(33,37,41);background-color: rgb(255,255,255);font-size: 16px;font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;">Now, if you've been around Microsoft technology for a while you've heard of user accounts. It's the term they've been using for decades but recently things have become a bit more complicated. A person can have a user account in your on-premises Active Directory. They can have a user account in Microsoft 365. They can have a user account in other cloud providers as well. So now Microsoft, and the technology industry, have started separating user accounts and identities. User accounts may contain an email address, name, and other information about the person. The identity controls the authentication, for example, the username, and password.</span></p>
<div style="text-align:none;"><img src="https://i.ibb.co/7nDqr9x/Whats-AD-Connect.png" alt="What's AD Connect" style="height: auto;width: auto"/></div>
<h2>Synchronizing your on-premises Active Directory (AD) to Microsoft 365</h2>
<p>AD Connect Is a Microsoft application that can be installed on a domain-joined Windows Server 2016 or later server that will sync your on-premises Active Directory to Microsoft 365’s Azure Active Directory. Every time you create, update, disable, or delete a user account in your on-premises AD, AD Connect will automatically sync that change to Microsoft 365.</p>
<h3>Why use Azure AD Connect?</h3>
<p>Azure AD Connect makes managing users ten times easier. By allowing you and your admins to update a user account once and then have that information sync to Microsoft 365 it reduces duplicating work. When a user is terminated, you will only need to remember to disable the account in your on-premise AD and then allow that change to sync to Microsoft 365 locking the user out of your on-premise AD, as well as, Microsoft 365 and anywhere else that identity information is being used.</p>
<h3>Synced vs cloud-only accounts</h3>
<p>You may see me or other admins refer to Microsoft 365 accounts as synced or cloud-only. A synced account is a user account that is being synchronized from the on-premises AD. A cloud-only user account is a user account that is not synced from the on-premises AD. If you aren't using AD Connect, all your accounts are cloud-only. If you have installed AD Connect and have user accounts that are on-premises and being synced to the Microsoft 365 tenant then those accounts are synced.</p>
<h3>Installing AD Connect</h3>
<p>Let us not waste any time discussing how to install AD Connect because it isn’t covered in the MS-500 test. Instead, I will point you to a couple of useful articles from Microsoft about installing AD Connect. Although, if you haven't installed AD Connect before I'd recommend hiring a consultant. There's a lot to consider when installing AD Connect including the user principal name, the source anchor, whether you have an on-premise Exchange server, and a slew of other requirements.</p>
<p>Azure AD Connect Download: <a href="https://www.microsoft.com/en-us/download/details.aspx?id=47594" target="_blank">https://www.microsoft.com/en-us/download/details.aspx?id=47594</a>&nbsp;</p>
<p>AD Connect How-to guides: <a href="https://docs.microsoft.com/en-us/azure/active-directory/hybrid/how-to-connect-install-roadmap" target="_blank">https://docs.microsoft.com/en-us/azure/active-directory/hybrid/how-to-connect-install-roadmap</a>&nbsp;</p>
<p>How to express install AD Connect: <a href="https://docs.microsoft.com/en-us/azure/active-directory/hybrid/how-to-connect-install-express" target="_blank">https://docs.microsoft.com/en-us/azure/active-directory/hybrid/how-to-connect-install-express</a>&nbsp;</p>
<h3>User Sign-in Methods</h3>
<p>One part of AD connect that Microsoft does cover under the MS-500 test is the sign-in method, also known as, the sign-in options. The sign-in options dictate how your on-premises synced users will authenticate when signing into a Microsoft 365 app. For example, you can configure AD Connect to synchronize a hash of the passwords. When a user is signing into Microsoft 365 Microsoft can manage the authentication by comparing the username and password supplied by the user with the username and password hash that is synced to Microsoft 365. This is known as password hash synchronization.</p>
<h4>What’s Password Hash Synchronization</h4>
<p>As mentioned above, password hash synchronization will configure AD Connect to synchronize a hash of your user's passwords to Microsoft 365. It's important to note, that the password is not synchronized across your Internet and Azure is not storing your passwords. It's an encrypted hash of the password.</p>
<p>Password hash synchronization is also known as "same sign-on". It's known as same sign-on because a user will use the same credentials to sign in to your on-premise Active Directory, as well as, your Microsoft 365 environment.</p>
<p>A couple of noteworthy points on password hash synchronization:</p>
<ul>
<li>Password hash synchronization is the easiest sign-in method to support.</li>
<li>Password hash synchronization can be disabled in AD Connect.</li>
<li>Password hash synchronization doesn’t take any other servers or software. It works through AD Connect.</li>
</ul>
<h5>Limitations of password hash synchronization</h5>
<p>By default, Password hash synchronization doesn’t support the password expiration policy. if a user's password expires on-premise the user can continue to sign in to Microsoft 365 without changing their password. By default, the cloud account password is set to never expire.</p>
<p>Out of the box AD Connect does not support “user must change password at next logon”. You can however and able it but you'll also want to enable password writeback. More on password write back later in the article.</p>
<p>AD Connect does not support account expiration. If you use account expirations in your on-premises AD, you'll need to create a PowerShell script that disables the user account in Azure AD or use Pass-through authentication.</p>
<p>When you reset a password in Azure AD of a synchronized user the password will be overwritten by the on-premises AD password during the next password sync cycle.&nbsp;</p>
<h5>Leaked credential detection</h5>
<p>A quick side note, for Microsoft 365 to perform leaked credential detection you'll need to have password hash synchronization enabled even if your sign-in method has users signing in to your on-premises Active Directory.</p>
<h4>Active Directory Federation Services (ADFS)</h4>
<p>ADFS is a software application developed by Microsoft two provide single sign-on (SSO). With ADFS users that are authenticating to Microsoft 365 will be redirected to your ADFS servers. NDFS uses claims-based access control authorization which is a process where the user is identified by a set of claims related to their identity. The claims are packaged into a secure token by ADFS and then sent to Microsoft 365.</p>
<p>Your ADFS servers will have requests sent to them every time a user authenticates to Microsoft 365. Because of this, it's typically recommended to have a minimum of Two ADFS servers. Since authentication can happen at the ADFS servers it's also recommended to implement ADFS proxy servers. Two ADFS proxy servers are also recommended.</p>
<p>A couple of quick notes on ADFS:</p>
<ul>
<li>ADFS is one of the most complicated authentication systems available as a sign-in option for Microsoft 365.</li>
<li>Since your users will be authenticating to the ADFS it’s recommended to have redundant servers.</li>
<li>ADFS is one of the most expensive sign-in options for Microsoft 365.</li>
</ul>
<h4>Pass-through authentication</h4>
<p>Pass-through authentication (PTA) works like ADFS. With pass-through authentication users that are trying to access your Microsoft 365 environment will be passed to an on-premises server that has the PTA agent installed. Just like ADFS when a user signs in the username and password will be validated directly against your on-premises Active Directory.</p>
<p>Pass-through authentication does not affect cloud-only users. When a user with a cloud-only account (an account that isn't synced from your on-premises AD) the users will still be able to log in. It's good to have at least one global admin that's a cloud-only account in case of PTA failure.</p>
<h3>Troubleshooting AD Connect</h3>
<p>Troubleshooting AD Connect can be a bit complicated Because there are four places that you may need to check to view the errors (although the data is usually redundant)</p>
<ol>
<li>Directory Sync status in the Microsoft 365 admin center.</li>
<li>Sync errors in the Azure AD admin center (found under Azure Active Directory Connect health)</li>
<li>The synchronization service app on the AD Connect server</li>
<li>The application event logs on the AD Connect server</li>
</ol>
<h4>The errors you'll receive</h4>
<p>The first thing you'll receive is an email with the subject line "Unhealthy identity synchronization notification".</p>
<div style="text-align:none;"><img src="https://i.ibb.co/Vw4Y5TN/Unhealthy-identity-synchronization-notification.png" alt="Unhealthy identity synchronization notification" style="height: auto;width: auto"/></div>
<h4>How to review the error</h4>
<p>To review the error in more detail log on to the server that has the AD Connect service running then open the Synchronization Service Manager application. From there you'll see one of the profiles with a status of <strong>Completed-export-error</strong>. Click on it. Then click the <strong>error </strong>(in the bottom right corner. Click <strong>Detail</strong>. You can also click the CN=GUID to view the account that changed and what attributes have changed.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/3CS1K7m/AD-Connect-error.png" alt="AD Connect Error" style="height: auto;width: auto"/></div>
<h3>Password Writeback</h3>
<p>Remember when I said AD Connect synchronizes your on-premises Active Directory to Microsoft 365, that it's a one-way sync? Now we're getting into the exceptions. Password writeback allows admins, as well as, users to update their password in Microsoft 365 and have that password synchronized back to the on-premises Active Directory. Let's say all your users are working from home. And occasionally, a user forgets their password. Currently, they call into your IT helpdesk and the IT staff must reset the password in Active Directory manually. With password writeback those calls are history. Users can go to the Microsoft 365 portal And through their username authenticate using text messages, phone calls, or another MFA authorization and reset their passwords.</p>
<p>Note: Azure AD P1 licenses are needed to configure password writeback.</p>
<p>Configuring password writeback is out of scope for the MS-500 but here are two Microsoft articles to help you get started:&nbsp;</p>
<ul>
<li><a href="https://docs.microsoft.com/en-us/azure/active-directory/authentication/concept-registration-mfa-sspr-combined" target="_blank">https://docs.microsoft.com/en-us/azure/active-directory/authentication/concept-registration-mfa-sspr-combined</a>&nbsp;</li>
<li><a href="https://docs.microsoft.com/en-us/azure/active-directory/authentication/tutorial-enable-sspr-writeback" target="_blank">https://docs.microsoft.com/en-us/azure/active-directory/authentication/tutorial-enable-sspr-writeback</a>&nbsp;</li>
</ul>
<h3>Other writeback options</h3>
<p>For a while, Microsoft did allow organizations to configure user writeback where an admin could change a user's attributes in Microsoft 365 and have the attributes writeback to an on-premises environment. Today, Microsoft doesn't allow user writeback. As mentioned above, they do allow password writeback.</p>
<p>Microsoft also allows group writeback Where users can create and manage Microsoft 365 groups in Microsoft 365 and have those groups write back to the on-premises Active Directory.</p>
<p>Microsoft also allows device writeback. Device writeback will create a device object in the on-premises Active Directory for every Azure AD-managed device. The devices will be located in an OU called RegisteredDevices.</p>
<h3>Hybrid Azure AD Joined devices</h3>
<p>Hybrid Azure AD joined devices are devices that are joined to your on-premises AD and registered with Azure AD through AD Connect. Configuring a hybrid Azure AD join will ensure that all domain-joined computers are registered in Azure AD. It’s also an important step if you want to manage your domain-joined computers using Intune.</p>
`,
      nextContentSlug: 'Protecting-Passwords-in-Microsoft-365-i9pJIjTNH',
      previousContentSlug: 'Time-limited-admin-roles-in-Microsoft-365-rZzausKJ1',
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
