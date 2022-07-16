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
      article: {"images":["https://i.ibb.co/DLD4G4q/access-smart-lockout-settings.png","https://i.ibb.co/027NY26/account-is-temporarily-locked.png","https://i.ibb.co/9tBh0pR/edit-smart-lockout-settings.png","https://i.ibb.co/x6TWRmW/enable-self-service-password-reset-in-Microsoft-365.png","https://i.ibb.co/dfT6Mnj/open-password-reset-in-Azure-AD.png","https://i.ibb.co/sCkm61R/reset-a-Microsoft-365-cloud-only-user-s-password.png","https://i.ibb.co/26hSJg8/reset-user-password.png","https://i.ibb.co/DwLDNf2/self-service-password-reset-options.png","https://i.ibb.co/L8gHHXJ/set-password-to-expire-in-Microsoft-365.png","https://i.ibb.co/Wf5HpMV/Set-Msol-Dir-Sync-Feature-Feature-Enforce-Cloud-Password-Policy-For-Password-Synced-Users.png"],"id":"i9pJIjTNH","featuredImage":"https://i.ibb.co/DLD4G4q/access-smart-lockout-settings.png","article":{"entityMap":{"0":{"type":"LINK","data":{"targetOption":"_blank","url":"https://admin.microsoft.com/Adminportal/Home?source=applauncher#/Settings/SecurityPrivacy/:/Settings/L1/PasswordPolicy"},"mutability":"MUTABLE"},"1":{"type":"IMAGE","mutability":"MUTABLE","data":{"alt":"Set passwords to expire in Microsoft 365","url":"https://admin.microsoft.com/Adminportal/Home?source=applauncher#/users","alignment":"none","targetOption":"_blank","width":"auto","height":"auto","src":"https://i.ibb.co/L8gHHXJ/set-password-to-expire-in-Microsoft-365.png"}},"2":{"type":"IMAGE","data":{"targetOption":"_blank","alignment":"none","url":"https://admin.microsoft.com/Adminportal/Home?source=applauncher#/users","width":"auto","alt":"Set-MsolDirSyncFeature -Feature EnforceCloudPasswordPolicyForPasswordSyncedUsers","height":"auto","src":"https://i.ibb.co/Wf5HpMV/Set-Msol-Dir-Sync-Feature-Feature-Enforce-Cloud-Password-Policy-For-Password-Synced-Users.png"},"mutability":"MUTABLE"},"3":{"type":"LINK","data":{"targetOption":"_blank","alt":"Reset a Microsoft 365 cloud-only user's password","alignment":"left","height":"auto","width":"auto","url":"https://admin.microsoft.com/Adminportal/Home?source=applauncher#/users","src":"https://i.ibb.co/sCkm61R/reset-a-Microsoft-365-cloud-only-user-s-password.png"},"mutability":"MUTABLE"},"4":{"data":{"alignment":"none","height":"auto","url":"https://aad.portal.azure.com/#blade/Microsoft_AAD_IAM/AuthenticationMethodsMenuBlade/PasswordProtection","alt":"Reset a Microsoft 365 cloud-only user's password","width":"auto","targetOption":"_blank","src":"https://i.ibb.co/sCkm61R/reset-a-Microsoft-365-cloud-only-user-s-password.png"},"type":"IMAGE","mutability":"MUTABLE"},"5":{"type":"IMAGE","mutability":"MUTABLE","data":{"height":"auto","src":"https://i.ibb.co/26hSJg8/reset-user-password.png","alt":"Reset Microsoft 365 user password","width":"auto","url":"https://aad.portal.azure.com/#blade/Microsoft_AAD_IAM/AuthenticationMethodsMenuBlade/PasswordProtection","targetOption":"_blank","alignment":"none"}},"6":{"mutability":"MUTABLE","data":{"width":"auto","height":"auto","alignment":"none","src":"https://i.ibb.co/027NY26/account-is-temporarily-locked.png","alt":"Account is temporarily locked to prevent unauthorized use. Try again later, and if you still have trouble, contact your admin.","url":"https://aad.portal.azure.com/#blade/Microsoft_AAD_IAM/AuthenticationMethodsMenuBlade/PasswordProtection","targetOption":"_blank"},"type":"IMAGE"},"7":{"mutability":"MUTABLE","type":"IMAGE","data":{"src":"https://i.ibb.co/DLD4G4q/access-smart-lockout-settings.png","alignment":"none","width":"auto","url":"https://aad.portal.azure.com/#blade/Microsoft_AAD_IAM/AuthenticationMethodsMenuBlade/PasswordProtection","height":"auto","targetOption":"_blank","alt":"Access smart lockout settings"}},"8":{"type":"LINK","data":{"height":"auto","alignment":"left","src":"https://i.ibb.co/9tBh0pR/edit-smart-lockout-settings.png","url":"https://aad.portal.azure.com/#blade/Microsoft_AAD_IAM/AuthenticationMethodsMenuBlade/PasswordProtection","targetOption":"_blank","alt":"Edit smart lock settings","width":"auto"},"mutability":"MUTABLE"},"9":{"type":"IMAGE","mutability":"MUTABLE","data":{"height":"auto","width":"auto","url":"https://aad.portal.azure.com/#blade/Microsoft_AAD_IAM/PasswordResetMenuBlade/Properties","targetOption":"_blank","alignment":"none","src":"https://i.ibb.co/9tBh0pR/edit-smart-lockout-settings.png","alt":"Edit smart lock settings"}},"10":{"mutability":"MUTABLE","type":"LINK","data":{"height":"auto","alignment":"left","width":"auto","src":"https://i.ibb.co/dfT6Mnj/open-password-reset-in-Azure-AD.png","targetOption":"_blank","alt":"Open Password Reset options in Azure AD","url":"https://aad.portal.azure.com/#blade/Microsoft_AAD_IAM/PasswordResetMenuBlade/Properties"}},"11":{"mutability":"MUTABLE","data":{"width":"auto","height":"auto","alt":"Open Password Reset options in Azure AD","alignment":"none","src":"https://i.ibb.co/dfT6Mnj/open-password-reset-in-Azure-AD.png"},"type":"IMAGE"},"12":{"type":"IMAGE","data":{"width":"auto","alt":"Enable self service password reset","src":"https://i.ibb.co/x6TWRmW/enable-self-service-password-reset-in-Microsoft-365.png","alignment":"none","height":"auto"},"mutability":"MUTABLE"},"13":{"data":{"width":"auto","src":"https://i.ibb.co/DwLDNf2/self-service-password-reset-options.png","height":"auto","alt":"Self-service password reset options in Microsoft 365","alignment":"none"},"type":"IMAGE","mutability":"MUTABLE"}},"blocks":[{"entityRanges":[],"inlineStyleRanges":[],"text":"We all know what passwords are and how important they are to keep secret but new research on when to expire passwords may surprise you.","type":"unstyled","key":"fv46l","depth":0,"data":{}},{"text":"By default, passwords are set to never expire in Microsoft 365. Microsoft’s current research strongly shows that requiring passwords to be changed does more harm than good. They drive users to re-use passwords including updating old passwords in ways that are easily guessed and choose weaker passwords. Microsoft strongly recommends enabling multi-factor authentication. But either way, Microsoft has made it easy for you to set a password expiration policy in Microsoft 365.","entityRanges":[],"inlineStyleRanges":[],"type":"unstyled","key":"b2nok","depth":0,"data":{}},{"inlineStyleRanges":[],"data":{},"depth":0,"type":"header-two","key":"f8427","text":"Setting passwords to expire in Microsoft 365","entityRanges":[]},{"type":"unstyled","data":{},"inlineStyleRanges":[],"key":"8fov","depth":0,"entityRanges":[],"text":"To set your Microsoft 365 cloud-only accounts passwords to expire is easy."},{"inlineStyleRanges":[{"offset":6,"style":"BOLD","length":26},{"style":"BOLD","length":9,"offset":35},{"style":"BOLD","length":12,"offset":46},{"offset":60,"style":"BOLD","length":19},{"offset":82,"style":"BOLD","length":27}],"type":"ordered-list-item","key":"5o46c","data":{},"text":"Go to Microsoft 365 admin center > Settings > Org settings > Security & privacy > Password expiration policy .","depth":0,"entityRanges":[{"key":0,"length":26,"offset":82}]},{"key":"6iuqq","entityRanges":[],"type":"ordered-list-item","text":"Click Set user passwords to expire after a number of days.","depth":0,"data":{},"inlineStyleRanges":[{"length":51,"offset":6,"style":"BOLD"}]},{"entityRanges":[],"inlineStyleRanges":[{"offset":8,"style":"BOLD","length":28},{"style":"BOLD","length":47,"offset":39}],"type":"ordered-list-item","data":{},"text":"Set the Days before passwords expire & Days before a user is notified about expiration.","key":"29v0s","depth":0},{"type":"ordered-list-item","key":"4r82e","depth":0,"data":{},"inlineStyleRanges":[{"offset":6,"style":"BOLD","length":4}],"entityRanges":[],"text":"Click Save."},{"key":"tguo","type":"atomic","text":" ","depth":0,"inlineStyleRanges":[],"data":{},"entityRanges":[{"length":1,"offset":0,"key":1}]},{"depth":0,"text":"Setting passwords of synced users to expire in Microsoft 365","key":"98q2c","entityRanges":[],"type":"header-two","data":{},"inlineStyleRanges":[]},{"key":"3r3ih","entityRanges":[],"data":{},"text":"If you followed the instructions above, you’ve now set all your cloud-only accounts passwords to expire but what about the synced accounts? Synced users are set to passwords never expire in Microsoft 365. That means the password synchronized to the cloud is still valid after the on-premises password expires, in other words, the user can continue to log in to Microsoft 365 using an expired password. If a user has a synchronized account and never touches the domain, they’ll be able to continue to sign in to Microsoft 365. So now let’s set the synced accounts passwords to expire.","depth":0,"inlineStyleRanges":[],"type":"unstyled"},{"data":{},"key":"bh0t1","depth":0,"inlineStyleRanges":[{"style":"BOLD","length":19,"offset":55}],"text":"Open PowerShell and connect to Microsoft 365 using the Connect-MsolService","type":"ordered-list-item","entityRanges":[]},{"text":"Run  “Set-MsolDirSyncFeature -Feature EnforceCloudPasswordPolicyForPasswordSyncedUsers -Enable $true”","type":"ordered-list-item","depth":0,"key":"16o28","entityRanges":[],"data":{},"inlineStyleRanges":[{"style":"BOLD","offset":6,"length":94}]},{"type":"ordered-list-item","inlineStyleRanges":[{"offset":53,"length":3,"style":"BOLD"}],"text":"When prompted to continue with this operation? Click Yes.","data":{},"key":"2rj3c","entityRanges":[],"depth":0},{"data":{},"inlineStyleRanges":[],"type":"atomic","key":"65k2a","text":" ","depth":0,"entityRanges":[{"length":1,"offset":0,"key":2}]},{"type":"header-two","key":"1diln","inlineStyleRanges":[],"data":{},"entityRanges":[],"text":"Resetting passwords for cloud-only users","depth":0},{"data":{},"text":"Sometimes, users will forget their passwords. It happens. Microsoft offers two options To reset a cloud-only user's password: self-service password reset (SSPR) or an admin can reset the password for the user. To reset a password for a user perform the following:","type":"unstyled","key":"la4q","inlineStyleRanges":[],"depth":0,"entityRanges":[]},{"depth":0,"entityRanges":[{"length":12,"offset":54,"key":3}],"key":"2ok09","inlineStyleRanges":[{"length":26,"offset":17,"style":"BOLD"},{"style":"BOLD","length":6,"offset":46},{"style":"BOLD","length":12,"offset":54}],"text":"1. Log in to the Microsoft 365 admin center > Users > Active users. ","data":{},"type":"unstyled"},{"data":{},"entityRanges":[],"key":"9lea6","depth":0,"text":"2. Search for the user that needs their password reset and click on them.","type":"unstyled","inlineStyleRanges":[]},{"key":"4ghi9","text":"3. Click Reset password.","type":"unstyled","depth":0,"data":{},"inlineStyleRanges":[{"length":14,"style":"BOLD","offset":9}],"entityRanges":[]},{"depth":0,"data":{},"inlineStyleRanges":[],"type":"atomic","entityRanges":[{"length":1,"key":4,"offset":0}],"key":"1jh0k","text":" "},{"data":{},"type":"unstyled","text":"4. Select the options you want. Then click Reset password.","depth":0,"entityRanges":[],"inlineStyleRanges":[{"length":14,"offset":43,"style":"BOLD"}],"key":"6kjs"},{"inlineStyleRanges":[],"depth":0,"data":{},"type":"atomic","key":"4fobe","entityRanges":[{"offset":0,"length":1,"key":5}],"text":" "},{"entityRanges":[],"data":{},"inlineStyleRanges":[{"length":300,"style":"ITALIC","offset":0}],"text":"Important note: The password administrator can reset passwords for non-administrator users. The password administrators can also reset the passwords for the following roles: Directory readers, Guest inviter, and Password administrator. Only Global admins can reset passwords for other administrators.","type":"unstyled","depth":0,"key":"1pr0i"},{"depth":0,"data":{},"entityRanges":[],"type":"header-two","key":"c7pu4","inlineStyleRanges":[],"text":"Password lockout"},{"inlineStyleRanges":[],"type":"unstyled","key":"79k5q","text":"Microsoft has created a smart lockout system that helps lock out bad actors that try to guess your users’ passwords or use some other type of brute force method. A smart lockout can detect if it’s a valid user attempting to log in to their account and treats them differently than attempts that come from attackers. Attackers will get locked out, while your users can continue to access Microsoft 365.","depth":0,"entityRanges":[],"data":{}},{"data":{},"text":"When a user is locked out due to entering their password wrong too many times, they'll see the following message: “Your account is temporarily locked to prevent unauthorized use. Try again later, and if you still have trouble, contact your admin.”","key":"6a1nr","depth":0,"type":"unstyled","entityRanges":[],"inlineStyleRanges":[]},{"key":"dbd4n","depth":0,"data":{},"type":"atomic","inlineStyleRanges":[],"entityRanges":[{"key":6,"length":1,"offset":0}],"text":" "},{"type":"header-three","inlineStyleRanges":[],"text":"How does smart lock work?","depth":0,"data":{},"entityRanges":[],"key":"4ea0m"},{"depth":0,"data":{},"entityRanges":[],"key":"ckvm8","type":"unstyled","inlineStyleRanges":[],"text":"By default, Microsoft 365 will lock out an account for one minute after 10 failed attempts (or 3 for US Government). The account will automatically lock again after each failed sign-in attempt for one minute or longer."},{"entityRanges":[],"type":"unstyled","key":"d27lf","text":"Smart Lockout uses a familiar location vs an unfamiliar location to differentiate between a bad actor and a genuine user. Unfamiliar and familiar locations both have separate lockout counters.","data":{},"inlineStyleRanges":[],"depth":0},{"text":"Smart lockout tracks the last three bad password hashes and won't increment the lockout counter for the same password. For example, let's say a user’s password was Password321! and recently changed their password to Password543!. Then the user attempts to log into their account using Password321! three times. That would only count as one attempt.","type":"unstyled","inlineStyleRanges":[],"depth":0,"entityRanges":[],"key":"3bl07","data":{}},{"entityRanges":[],"depth":0,"key":"bri7q","data":{},"inlineStyleRanges":[{"length":176,"offset":0,"style":"ITALIC"}],"text":"Note: This does not work if you are configured using pass-through authentication since the authentication is happening in your on-premises environment and not in Microsoft 365.","type":"unstyled"},{"depth":0,"key":"aejaa","type":"unstyled","data":{},"inlineStyleRanges":[{"offset":0,"style":"BOLD","length":224}],"text":"Important: Administrators can't unlock a user's account if they've been locked out. The user must wait for the lockout duration to expire or they can use the self-service password reset (SSPR) from a trusted device/location.","entityRanges":[]},{"data":{},"entityRanges":[],"depth":0,"type":"header-three","key":"aqctm","text":"Editing the Password lockout settings","inlineStyleRanges":[]},{"inlineStyleRanges":[],"text":"The password lockout settings are simple in Microsoft 365. From the password protection settings, you can set the lockout threshold, lockout duration in seconds, and configure a banned password list. The banned password list is a custom list of passwords that your users won't be able to use when setting their passwords.  To get to the settings follow the below instructions:","key":"epbic","entityRanges":[],"type":"unstyled","depth":0,"data":{}},{"inlineStyleRanges":[{"offset":9,"style":"BOLD","length":21}],"entityRanges":[],"depth":0,"data":{},"type":"unstyled","text":"1. Go to Azure AD admin center and log in with admin credentials","key":"735j2"},{"type":"unstyled","key":"botfk","data":{},"depth":0,"inlineStyleRanges":[{"length":22,"offset":9,"style":"BOLD"},{"length":8,"style":"BOLD","offset":34},{"style":"BOLD","offset":45,"length":22}],"text":"2. Go to Azure Active Directory > Security > Authentication methods.","entityRanges":[]},{"key":"ac0eu","entityRanges":[{"key":7,"length":1,"offset":0}],"inlineStyleRanges":[],"depth":0,"type":"atomic","text":" ","data":{}},{"inlineStyleRanges":[{"offset":9,"length":19,"style":"BOLD"}],"depth":0,"text":"3. Click Password protection. ","entityRanges":[{"offset":9,"key":8,"length":19}],"data":{},"type":"unstyled","key":"foi4s"},{"entityRanges":[],"text":"4. Update the password protection policies and click Save.","key":"6s86i","depth":0,"data":{},"type":"unstyled","inlineStyleRanges":[{"offset":53,"style":"BOLD","length":4}]},{"key":"cj793","depth":0,"inlineStyleRanges":[],"text":" ","type":"atomic","entityRanges":[{"offset":0,"key":9,"length":1}],"data":{}},{"depth":0,"key":"7bern","entityRanges":[],"type":"header-two","data":{},"inlineStyleRanges":[],"text":"Self-service password reset"},{"key":"813f7","data":{},"text":"Now, I've mentioned self-service password reset (SSPR) a couple of times so I thought I should explain. SSPR allows a user to reset their password without admin intervention. You've used it before on websites. For example, if you forget your password for Twitter or another web application you can click a reset password button and it will email your password. The same thing can be set up for Microsoft 365. By default, it's disabled for your users and enabled for your admins, so let’s enable it for everyone.","inlineStyleRanges":[],"entityRanges":[],"depth":0,"type":"unstyled"},{"text":"1. Go to Azure AD and sign in with admin credentials.","type":"unstyled","data":{},"inlineStyleRanges":[{"style":"BOLD","length":8,"offset":9}],"key":"5i9d7","entityRanges":[],"depth":0},{"key":"6mmbs","text":"2. Click Azure Active Directory > Password reset  (you may need to scroll down to see it).","depth":0,"entityRanges":[{"length":14,"offset":34,"key":10}],"inlineStyleRanges":[{"offset":9,"length":22,"style":"BOLD"},{"length":15,"style":"BOLD","offset":34}],"type":"unstyled","data":{}},{"key":"foh56","entityRanges":[{"length":1,"offset":0,"key":11}],"data":{},"depth":0,"text":" ","inlineStyleRanges":[],"type":"atomic"},{"data":{},"inlineStyleRanges":[{"style":"BOLD","offset":9,"length":4},{"offset":21,"style":"BOLD","length":4}],"type":"unstyled","text":"3. Click All > click Save.","depth":0,"key":"2fval","entityRanges":[]},{"inlineStyleRanges":[],"entityRanges":[{"key":12,"offset":0,"length":1}],"depth":0,"data":{},"key":"beuar","text":" ","type":"atomic"},{"inlineStyleRanges":[],"data":{},"text":"While you’re here you should check out the other options available.","entityRanges":[],"type":"unstyled","key":"1ts1g","depth":0},{"depth":0,"data":{},"entityRanges":[{"offset":0,"key":13,"length":1}],"inlineStyleRanges":[],"text":" ","type":"atomic","key":"a4n1v"},{"depth":0,"data":{},"text":"How do you block a user from signing into Microsoft 365 when they are locked out of on-premises AD?","type":"header-two","entityRanges":[],"key":"71ppo","inlineStyleRanges":[]},{"data":{},"inlineStyleRanges":[],"text":"Now that we understand the Microsoft 365 defaults and adjusting the settings what about synchronized users? What if we have our on-premises AD tuned to just how we like it, the correct amount of password attempts gets a user locked. How do we apply our on-premises password protection to all Microsoft 365 synced users?","entityRanges":[],"depth":0,"key":"eg1jo","type":"unstyled"},{"key":"fuqlu","text":"The answer is easy, by having the users authenticate to the on-premises AD. Using Pass-through authentication every time a user wants to authenticate to your Microsoft 365 tenant they’ll have to authenticate to your on-premises environment. Then, the AD group policy will apply to their sign-ins.","data":{},"depth":0,"type":"unstyled","entityRanges":[],"inlineStyleRanges":[]},{"depth":0,"entityRanges":[],"data":{},"inlineStyleRanges":[],"text":"","key":"c6ddj","type":"unstyled"}]},"sectionId":"AFV_acckJ","slug":"Protecting-Passwords-in-Microsoft-365-i9pJIjTNH","publish":true,"description":"Password management in Microsoft 365: protection and ease of use. Simple to configure and simple to manage.","datePublished":"2022/5/26","title":"Protecting Passwords in Microsoft 365","type":"article"},
      articles: [{"id":"cpchjBLkC","sectionId":"qwJW5VrBW","slug":"Whats-in-this-course-cpchjBLkC","title":"What's in this course?","featuredImage":"https://i.ibb.co/zFs9Vfb/microsoft365-security-administrator-associate-600x600.png"},{"id":"KKkBOVuS4","sectionId":"qwJW5VrBW","slug":"Creating-a-free-Microsoft-365-tenant-for-practice-KKkBOVuS4","title":"Creating a free Microsoft 365 tenant for practice","featuredImage":"https://i.ibb.co/F07sjQJ/microsoft-365-e5-trial.png"},{"id":"bzotoOjEe","sectionId":"qwJW5VrBW","slug":"Managing-the-Microsoft-365-tenant-Introduction-to-the-admin-centers-bzotoOjEe","title":"Managing the Microsoft 365 tenant - Introduction to the admin centers","featuredImage":"https://i.ibb.co/f1cr4zt/Microsoft-365-admin-centers.png"},{"id":"cg_vxOX9L","sectionId":"qwJW5VrBW","slug":"Managing-Microsoft-365-through-PowerShell-cg_vxOX9L","title":"Managing Microsoft 365 through PowerShell","featuredImage":"https://i.ibb.co/HV13YF6/install-microsoft-365-powershell-modules.png"},{"id":"uYCIPbnMC","sectionId":"AFV_acckJ","slug":"How-to-create-users-in-Microsoft-365-Cloud-Only-uYCIPbnMC","title":"How to create users in Microsoft 365 Cloud Only","featuredImage":"https://i.ibb.co/Wnt5Q43/View-Microsoft-365-Users.png"},{"id":"7CpqFkPZU","sectionId":"AFV_acckJ","slug":"Creating-and-managing-admins-through-roles-7CpqFkPZU","title":"Creating and managing admins through roles","featuredImage":"https://i.ibb.co/kySL4HQ/Roles-and-administrators.png"},{"id":"rZzausKJ1","sectionId":"AFV_acckJ","slug":"Time-limited-admin-roles-in-Microsoft-365-rZzausKJ1","title":"Time limited admin roles in Microsoft 365","featuredImage":"https://i.ibb.co/nDvjyPD/select-member-to-add-to-PIM-role.png"},{"id":"ky5W0Lz5P","sectionId":"AFV_acckJ","slug":"Whats-AD-Connect-ky5W0Lz5P","title":"What's AD Connect","featuredImage":"https://i.ibb.co/7nDqr9x/Whats-AD-Connect.png"},{"id":"i9pJIjTNH","sectionId":"AFV_acckJ","slug":"Protecting-Passwords-in-Microsoft-365-i9pJIjTNH","title":"Protecting Passwords in Microsoft 365","featuredImage":"https://i.ibb.co/DLD4G4q/access-smart-lockout-settings.png"},{"id":"S1hQgFOMV","sectionId":"AFV_acckJ","slug":"Creating-and-managing-users-through-groups-S1hQgFOMV","title":"Creating and managing users through groups","featuredImage":"https://i.ibb.co/nmmC28M/add-a-group-microsoft-365.png"},{"id":"2QfoI2HxY","sectionId":"AFV_acckJ","slug":"Securing-and-implementing-enterprise-applications-2QfoI2HxY","title":"Securing and implementing enterprise applications","featuredImage":"https://i.ibb.co/C2mp69m/disable-user-consent.png"},{"id":"V1en9Iugh","sectionId":"AFV_acckJ","slug":"Whats-a-conditional-access-policy-V1en9Iugh","title":"What's a conditional access policy?","featuredImage":"https://i.ibb.co/DQm1sY0/Create-conditional-access-policy.png"},{"id":"nAAIvNbtk","sectionId":"AFV_acckJ","slug":"The-many-ways-to-implement-multi-factor-authentication-MFA-in-Microsoft-365-nAAIvNbtk","title":"The many ways to implement multi-factor authentication (MFA) in Microsoft 365","featuredImage":"https://i.ibb.co/P1P0wNY/microsoft-365-manage-security-defaults.png"},{"id":"2S9jn0aLr","sectionId":"AFV_acckJ","slug":"Implement-Self-service-password-reset-in-Microsoft-365-2S9jn0aLr","title":"Implement Self-service password reset in Microsoft 365","featuredImage":"https://i.ibb.co/58y9JVg/write-back-passwords-to-on-premises-directory.png"},{"id":"FldNualGC","sectionId":"AFV_acckJ","slug":"Locking-down-your-Microsoft-365-tenant-from-Microsoft-engineers-FldNualGC","title":"Locking down your Microsoft 365 tenant from Microsoft engineers","featuredImage":"https://i.ibb.co/DCmpnT9/Enable-Customer-Lockbox.png"},{"id":"NFQ6rYFeQ","sectionId":"AFV_acckJ","slug":"Implementing-intelligent-security-using-risk-policies-in-Microsoft-365-NFQ6rYFeQ","title":"Implementing intelligent security using risk policies in Microsoft 365","featuredImage":"https://i.ibb.co/0cyQJ7j/Risk-Detections.png"},{"id":"rK48f6iM2","sectionId":"AFV_acckJ","slug":"Automating-Access-Review-in-Microsoft-365-rK48f6iM2","title":"Automating Access Review in Microsoft 365","featuredImage":"https://i.ibb.co/Xsxvz6Z/new-access-review.png"},{"id":"RHW1API2s","sectionId":"AFV_acckJ","slug":"Just-in-time-approval-and-notification-for-admin-roles-in-Microsoft-365-RHW1API2s","title":"Just in time, approval and notification for admin roles in Microsoft 365","featuredImage":"https://i.ibb.co/dcb6XFN/Activate-a-Role.png"},{"id":"z8EMM9Eu_","sectionId":"QScYfSu74","slug":"Whats-Microsoft-365-Defender-z8EMM9Eu_","title":"What's Microsoft 365 Defender?","featuredImage":"https://i.ibb.co/MDMyDQt/Microsoft-Defender.png"},{"id":"Kye_yNLxA","sectionId":"QScYfSu74","slug":"Whats-Microsoft-Defender-for-identity-Kye_yNLxA","title":"What's Microsoft Defender for identity?","featuredImage":"https://i.ibb.co/bQDBh0Y/Defender-for-Identity-Timeline.png"},{"id":"EnPyp7ukN","sectionId":"QScYfSu74","slug":"Whats-Microsoft-Defender-for-Office-365-EnPyp7ukN","title":"What's Microsoft Defender for Office 365?","featuredImage":"https://i.ibb.co/WcwKY2G/Microsoft-365-incidents-and-alerts.png"},{"id":"6HUOr7qbL","sectionId":"QScYfSu74","slug":"Protect-your-email-environment-from-malicious-actors-6HUOr7qbL","title":"Protect your email and Office environment from malicious actors","featuredImage":"https://i.ibb.co/Df0KQVp/Reports.png"},{"id":"GCOOUsSBT","sectionId":"QScYfSu74","slug":"Protecting-email-against-phishing-attacks-GCOOUsSBT","title":"Protecting email against phishing attacks","featuredImage":"https://i.ibb.co/GCjZHWg/edit-actions.png"},{"id":"GG4cMY8pK","sectionId":"QScYfSu74","slug":"Simulating-attacks-with-Microsoft-365-GG4cMY8pK","title":"Simulating attacks with Microsoft 365","featuredImage":"https://i.ibb.co/NyvnbMK/simulation-overview-view-users-circled.png"},{"id":"z0qPG6v4T","sectionId":"QScYfSu74","slug":"Protecting-Windows-10-and-other-devices-with-Microsoft-Defender-for-Endpoint-z0qPG6v4T","title":"Protecting Windows 10 and other devices with Microsoft Defender for Endpoint","featuredImage":"https://i.ibb.co/T47Xhyh/enable-endpoint-connections.png"},{"id":"LEyZMWBSt","sectionId":"QScYfSu74","slug":"Collect-detect-investigate-and-respond-to-security-threats-using-Microsoft-Sentinel-LEyZMWBSt","title":"Collect, detect, investigate, and respond to security threats using Microsoft Sentinel","featuredImage":"https://i.ibb.co/qN9XsKj/Add-Workbook.png"},{"id":"7MQ3wE4wP","sectionId":"QScYfSu74","slug":"Implement-and-manage-Microsoft-Defender-for-Cloud-Apps-7MQ3wE4wP","title":"Implement and manage Microsoft Defender for Cloud Apps","featuredImage":"https://i.ibb.co/7g7LvFg/office-365-cloud-apps-settings.png"},{"id":"sH_Ee1DW1","sectionId":"QScYfSu74","slug":"Auditing-sign-ins-and-other-actions-in-Microsoft-365-sH_Ee1DW1","title":"Auditing sign-ins and other actions in Microsoft 365","featuredImage":"https://i.ibb.co/BqMw3jZ/Start-recording-user-and-admin-activity.png"},{"id":"vLweLmxZf","sectionId":"YhftdGIRX","slug":"How-to-classify-data-using-labels-in-Microsoft-365-vLweLmxZf","title":"How to classify data using labels in Microsoft 365","featuredImage":"https://i.ibb.co/k9nhWS5/Choose-protection-settings-for-files-and-emails.png"},{"id":"NsF7No40f","sectionId":"YhftdGIRX","slug":"Creating-and-managing-data-retention-to-conform-to-compliance-NsF7No40f","title":"Creating and managing data retention to conform to compliance","featuredImage":"https://i.ibb.co/yqC0ZdY/New-Retention-Policy.png"},{"id":"IsPGsme8w","sectionId":"YhftdGIRX","slug":"Preventing-accidental-and-malicious-data-loss-with-DLP-policies-IsPGsme8w","title":"Preventing accidental and malicious data loss with DLP policies","featuredImage":"https://i.ibb.co/n8WcqKM/Create-a-DLP-policy.png"},{"id":"wv2PbXnhI","sectionId":"YhftdGIRX","slug":"Everything-you-need-to-know-about-securing-SharePoint-Online-for-the-MS-500-wv2PbXnhI","title":"Everything you need to know about securing SharePoint Online for the MS-500","featuredImage":"https://i.ibb.co/Gk9NjSH/Share-Point-Online-Warning.png"},{"id":"7gR3L122b","sectionId":"l0DxUuonW","slug":"Introduction-to-Intune-7gR3L122b","title":"Introduction to Intune","featuredImage":"https://i.ibb.co/Fq3N8BX/Endpoint-Manager-Admin-Center.png"},{"id":"ZyKX3Idjs","sectionId":"l0DxUuonW","slug":"Setting-up-Android-Devices-ZyKX3Idjs","title":"Setting up Android Devices","featuredImage":"https://i.ibb.co/m0BYhL2/Connect-Intune-to-Google-Play.png"},{"id":"MAjW0a2_p","sectionId":"l0DxUuonW","slug":"Setting-up-Apple--iOS-devices-in-Intune-MAjW0a2_p","title":"Setting up Apple / iOS devices in Intune","featuredImage":"https://i.ibb.co/X7Ffb2B/Setup-Apple-Enrollment-in-Intune.png"},{"id":"XFXu2zIS9","sectionId":"l0DxUuonW","slug":"Setting-up-Windows-10-devices-in-Intune-XFXu2zIS9","title":"Setting up Windows 10 devices in Intune","featuredImage":"https://i.ibb.co/WDXKVjW/configure-device-options.png"},{"id":"_LL9VqGZO","sectionId":"l0DxUuonW","slug":"How-to-manage-devices-using-Intune-_LL9VqGZO","title":"How to manage devices using Intune","featuredImage":"https://i.ibb.co/HPQ2m8t/Create-an-endpoint-protection-profile.png"},{"id":"qDRA4jjoN","sectionId":"l0DxUuonW","slug":"Understanding-compliance-policies-qDRA4jjoN","title":"Understanding compliance policies","featuredImage":"https://i.ibb.co/N3Qk57v/Create-a-compliance-policy.png"},{"id":"62t_7oiZx","sectionId":"l0DxUuonW","slug":"Restricting-and-managing-apps-on-user-devices-62t_7oiZx","title":"Restricting and managing apps on user devices","featuredImage":"https://i.ibb.co/PCVRKDf/Add-an-Android-app-to-Intune.png"}],
      articleHtml: `<p>We all know what passwords are and how important they are to keep secret but new research on when to expire passwords may surprise you.</p>
<p>By default, passwords are set to never expire in Microsoft 365. Microsoft’s current research strongly shows that requiring passwords to be changed does more harm than good. They drive users to re-use passwords including updating old passwords in ways that are easily guessed and choose weaker passwords. Microsoft strongly recommends enabling multi-factor authentication. But either way, Microsoft has made it easy for you to set a password expiration policy in Microsoft 365.</p>
<h2>Setting passwords to expire in Microsoft 365</h2>
<p>To set your Microsoft 365 cloud-only accounts passwords to expire is easy.</p>
<ol>
<li>Go to <strong>Microsoft 365 admin center</strong> &gt; <strong>Settings </strong>&gt; <strong>Org settings</strong> &gt;<strong> Security &amp; privacy</strong> &gt; <a href="https://admin.microsoft.com/Adminportal/Home?source=applauncher#/Settings/SecurityPrivacy/:/Settings/L1/PasswordPolicy" target="_blank"><strong>Password expiration policy</strong></a><strong> </strong>.</li>
<li>Click <strong>Set user passwords to expire after a number of days</strong>.</li>
<li>Set the <strong>Days before passwords expire</strong> &amp; <strong>Days before a user is notified about expiration</strong>.</li>
<li>Click <strong>Save</strong>.</li>
</ol>
<div style="text-align:none;"><img src="https://i.ibb.co/L8gHHXJ/set-password-to-expire-in-Microsoft-365.png" alt="Set passwords to expire in Microsoft 365" style="height: auto;width: auto"/></div>
<h2>Setting passwords of synced users to expire in Microsoft 365</h2>
<p>If you followed the instructions above, you’ve now set all your cloud-only accounts passwords to expire but what about the synced accounts? Synced users are set to passwords never expire in Microsoft 365. That means the password synchronized to the cloud is still valid after the on-premises password expires, in other words, the user can continue to log in to Microsoft 365 using an expired password. If a user has a synchronized account and never touches the domain, they’ll be able to continue to sign in to Microsoft 365. So now let’s set the synced accounts passwords to expire.</p>
<ol>
<li>Open PowerShell and connect to Microsoft 365 using the <strong>Connect-MsolService</strong></li>
<li>Run  “<strong>Set-MsolDirSyncFeature -Feature EnforceCloudPasswordPolicyForPasswordSyncedUsers -Enable $true</strong>”</li>
<li>When prompted to continue with this operation? Click <strong>Yes</strong>.</li>
</ol>
<div style="text-align:none;"><img src="https://i.ibb.co/Wf5HpMV/Set-Msol-Dir-Sync-Feature-Feature-Enforce-Cloud-Password-Policy-For-Password-Synced-Users.png" alt="Set-MsolDirSyncFeature -Feature EnforceCloudPasswordPolicyForPasswordSyncedUsers" style="height: auto;width: auto"/></div>
<h2>Resetting passwords for cloud-only users</h2>
<p>Sometimes, users will forget their passwords. It happens. Microsoft offers two options To reset a cloud-only user's password: self-service password reset (SSPR) or an admin can reset the password for the user. To reset a password for a user perform the following:</p>
<p>1. Log in to the <strong>Microsoft 365 admin center</strong> &gt; <strong>Users </strong>&gt; <a href="https://admin.microsoft.com/Adminportal/Home?source=applauncher#/users" target="_blank"><strong>Active users</strong></a>.&nbsp;</p>
<p>2. Search for the user that needs their password reset and click on them.</p>
<p>3. Click <strong>Reset password</strong>.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/sCkm61R/reset-a-Microsoft-365-cloud-only-user-s-password.png" alt="Reset a Microsoft 365 cloud-only user's password" style="height: auto;width: auto"/></div>
<p>4. Select the options you want. Then click <strong>Reset password</strong>.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/26hSJg8/reset-user-password.png" alt="Reset Microsoft 365 user password" style="height: auto;width: auto"/></div>
<p><em>Important note: The password administrator can reset passwords for non-administrator users. The password administrators can also reset the passwords for the following roles: Directory readers, Guest inviter, and Password administrator. Only Global admins can reset passwords for other administrators.</em></p>
<h2>Password lockout</h2>
<p>Microsoft has created a smart lockout system that helps lock out bad actors that try to guess your users’ passwords or use some other type of brute force method. A smart lockout can detect if it’s a valid user attempting to log in to their account and treats them differently than attempts that come from attackers. Attackers will get locked out, while your users can continue to access Microsoft 365.</p>
<p>When a user is locked out due to entering their password wrong too many times, they'll see the following message: “Your account is temporarily locked to prevent unauthorized use. Try again later, and if you still have trouble, contact your admin.”</p>
<div style="text-align:none;"><img src="https://i.ibb.co/027NY26/account-is-temporarily-locked.png" alt="Account is temporarily locked to prevent unauthorized use. Try again later, and if you still have trouble, contact your admin." style="height: auto;width: auto"/></div>
<h3>How does smart lock work?</h3>
<p>By default, Microsoft 365 will lock out an account for one minute after 10 failed attempts (or 3 for US Government). The account will automatically lock again after each failed sign-in attempt for one minute or longer.</p>
<p>Smart Lockout uses a familiar location vs an unfamiliar location to differentiate between a bad actor and a genuine user. Unfamiliar and familiar locations both have separate lockout counters.</p>
<p>Smart lockout tracks the last three bad password hashes and won't increment the lockout counter for the same password. For example, let's say a user’s password was Password321! and recently changed their password to Password543!. Then the user attempts to log into their account using Password321! three times. That would only count as one attempt.</p>
<p><em>Note: This does not work if you are configured using pass-through authentication since the authentication is happening in your on-premises environment and not in Microsoft 365.</em></p>
<p><strong>Important: Administrators can't unlock a user's account if they've been locked out. The user must wait for the lockout duration to expire or they can use the self-service password reset (SSPR) from a trusted device/location.</strong></p>
<h3>Editing the Password lockout settings</h3>
<p>The password lockout settings are simple in Microsoft 365. From the password protection settings, you can set the lockout threshold, lockout duration in seconds, and configure a banned password list. The banned password list is a custom list of passwords that your users won't be able to use when setting their passwords.  To get to the settings follow the below instructions:</p>
<p>1. Go to <strong>Azure AD admin center</strong> and log in with admin credentials</p>
<p>2. Go to <strong>Azure Active Directory</strong> &gt; <strong>Security</strong> &gt; <strong>Authentication methods</strong>.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/DLD4G4q/access-smart-lockout-settings.png" alt="Access smart lockout settings" style="height: auto;width: auto"/></div>
<p>3. Click <a href="https://aad.portal.azure.com/#blade/Microsoft_AAD_IAM/AuthenticationMethodsMenuBlade/PasswordProtection" target="_blank"><strong>Password protection</strong></a>.&nbsp;</p>
<p>4. Update the password protection policies and click <strong>Save</strong>.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/9tBh0pR/edit-smart-lockout-settings.png" alt="Edit smart lock settings" style="height: auto;width: auto"/></div>
<h2>Self-service password reset</h2>
<p>Now, I've mentioned self-service password reset (SSPR) a couple of times so I thought I should explain. SSPR allows a user to reset their password without admin intervention. You've used it before on websites. For example, if you forget your password for Twitter or another web application you can click a reset password button and it will email your password. The same thing can be set up for Microsoft 365. By default, it's disabled for your users and enabled for your admins, so let’s enable it for everyone.</p>
<p>1. Go to <strong>Azure AD</strong> and sign in with admin credentials.</p>
<p>2. Click <strong>Azure Active Directory</strong> &gt; <a href="https://aad.portal.azure.com/#blade/Microsoft_AAD_IAM/PasswordResetMenuBlade/Properties" target="_blank"><strong>Password reset</strong></a><strong> </strong> (you may need to scroll down to see it).</p>
<div style="text-align:none;"><img src="https://i.ibb.co/dfT6Mnj/open-password-reset-in-Azure-AD.png" alt="Open Password Reset options in Azure AD" style="height: auto;width: auto"/></div>
<p>3. Click <strong>All </strong>&gt; click <strong>Save</strong>.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/x6TWRmW/enable-self-service-password-reset-in-Microsoft-365.png" alt="Enable self service password reset" style="height: auto;width: auto"/></div>
<p>While you’re here you should check out the other options available.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/DwLDNf2/self-service-password-reset-options.png" alt="Self-service password reset options in Microsoft 365" style="height: auto;width: auto"/></div>
<h2>How do you block a user from signing into Microsoft 365 when they are locked out of on-premises AD?</h2>
<p>Now that we understand the Microsoft 365 defaults and adjusting the settings what about synchronized users? What if we have our on-premises AD tuned to just how we like it, the correct amount of password attempts gets a user locked. How do we apply our on-premises password protection to all Microsoft 365 synced users?</p>
<p>The answer is easy, by having the users authenticate to the on-premises AD. Using Pass-through authentication every time a user wants to authenticate to your Microsoft 365 tenant they’ll have to authenticate to your on-premises environment. Then, the AD group policy will apply to their sign-ins.</p>
<p></p>
`,
      nextContentSlug: 'Creating-and-managing-users-through-groups-S1hQgFOMV',
      previousContentSlug: 'Whats-AD-Connect-ky5W0Lz5P',
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
