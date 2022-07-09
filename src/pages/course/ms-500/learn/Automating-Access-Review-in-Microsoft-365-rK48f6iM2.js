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
      course: {"contentOrder":["cpchjBLkC","KKkBOVuS4","bzotoOjEe","cg_vxOX9L","uYCIPbnMC","7CpqFkPZU","rZzausKJ1","ky5W0Lz5P","i9pJIjTNH","S1hQgFOMV","2QfoI2HxY","V1en9Iugh","nAAIvNbtk","2S9jn0aLr","FldNualGC","NFQ6rYFeQ","rK48f6iM2","RHW1API2s","z8EMM9Eu_","Kye_yNLxA","EnPyp7ukN","6HUOr7qbL","GCOOUsSBT","GG4cMY8pK","z0qPG6v4T","LEyZMWBSt","7MQ3wE4wP","sH_Ee1DW1","vLweLmxZf","NsF7No40f","IsPGsme8w","wv2PbXnhI","7gR3L122b","ZyKX3Idjs","MAjW0a2_p","XFXu2zIS9","_LL9VqGZO","qDRA4jjoN","62t_7oiZx"],"audience":"Anyone who wants to learn about securing Microsoft 365","title":"Training for MS-500: Microsoft Office 365 Security Admin","sections":[{"title":"Introduction","order":0,"id":"qwJW5VrBW"},{"order":1,"id":"AFV_acckJ","title":"Securing identity and access to Microsoft 365"},{"id":"QScYfSu74","order":2,"title":"Securing Microsoft 365, clouds, and on-premises environments"},{"id":"YhftdGIRX","order":3,"title":"Protecting your environment from accidental and malicious data loss"},{"title":"Protecting User devices using Intune","order":4,"id":"l0DxUuonW"}],"id":"MS-500","description":"Learn, prepare and training for the Microsoft Microsoft Office 365 Exam MS-500: Microsoft 365 Security Administration MS-500 exam"},
      article: {"article":{"blocks":[{"text":"With Microsoft 365 access to your data is in motion unlike it has been before. Users can access your organization's data from personal devices and can even invite guests to collaborate. With this free-flowing access, productivity receives a big boost but so do the challenges around security. How do we make sure there aren't stale user accounts that have access to your environment that is no longer in use? Let's take another example. Let's say you have a user on the IT help desk. He has limited administrative rights to your Microsoft 365 tenant just like he's supposed to. Then he gets a transfer/promotion. Now he's in marketing. How do you make sure his administrative access has been removed?","depth":0,"data":{},"key":"8lvv","entityRanges":[],"type":"unstyled","inlineStyleRanges":[]},{"text":"The answer is simple, access review. With Azure AD access reviews you can review group memberships, access to applications, and role members. You can configure access reviews to happen regularly to make sure only the right people have access.","key":"2nl3v","inlineStyleRanges":[],"data":{},"type":"unstyled","entityRanges":[],"depth":0},{"depth":0,"type":"header-two","entityRanges":[],"inlineStyleRanges":[],"data":{},"key":"5aodq","text":"What licenses are required?"},{"key":"d9qv","data":{},"text":"To use access review you'll need an Azure AD Premium P2 license or Enterprise Mobility + Security (EMS) E5 license.","entityRanges":[],"type":"unstyled","depth":0,"inlineStyleRanges":[]},{"type":"header-two","entityRanges":[],"depth":0,"inlineStyleRanges":[],"key":"e6neb","data":{},"text":"How to setup access review for groups"},{"inlineStyleRanges":[],"key":"f51s4","depth":0,"text":"Let's jump right into setting up access review for a group. Let's set up the group membership to be reviewed monthly. Let's have the group owners review the membership. Then let's have it automatically approve access if there is no response.","type":"unstyled","entityRanges":[],"data":{}},{"text":"1. Log into Azure Active Directory admin center > Azure Active Directory > Identity Governance > Access reviews > New access review.","type":"unstyled","inlineStyleRanges":[{"offset":12,"length":35,"style":"BOLD"},{"style":"BOLD","length":22,"offset":50},{"length":19,"offset":75,"style":"BOLD"},{"style":"BOLD","length":14,"offset":97},{"offset":114,"style":"BOLD","length":17}],"key":"39r8","data":{},"depth":0,"entityRanges":[]},{"entityRanges":[{"length":1,"key":0,"offset":0}],"type":"atomic","data":{},"text":" ","key":"458nd","depth":0,"inlineStyleRanges":[]},{"text":"2. In Select what to review click Teams + Groups. In Review scope click Select Teams + groups. Click Select group(s). Select the group you want to review. Click Select. Click All users next to Scope. Click Next: Reviews.","key":"cv3ou","entityRanges":[],"data":{},"inlineStyleRanges":[{"offset":34,"style":"BOLD","length":14},{"length":12,"style":"BOLD","offset":53},{"length":21,"offset":72,"style":"BOLD"},{"offset":101,"length":15,"style":"BOLD"},{"style":"BOLD","length":6,"offset":161},{"length":10,"offset":175,"style":"BOLD"},{"length":13,"style":"BOLD","offset":206}],"type":"unstyled","depth":0},{"data":{},"key":"ce4vk","inlineStyleRanges":[],"entityRanges":[{"key":1,"length":1,"offset":0}],"text":" ","depth":0,"type":"atomic"},{"inlineStyleRanges":[{"offset":37,"length":14,"style":"BOLD"},{"style":"BOLD","offset":83,"length":1},{"length":7,"offset":115,"style":"BOLD"},{"offset":130,"style":"BOLD","length":14}],"key":"dj416","data":{},"text":"3. Set the Select reviewers field to Group owner(s). Set the duration (in days) to 7. Set the Review recurrence to Monthly. Click Next: Settings.","entityRanges":[],"depth":0,"type":"unstyled"},{"type":"atomic","text":" ","entityRanges":[{"length":1,"offset":0,"key":2}],"data":{},"depth":0,"inlineStyleRanges":[],"key":"5btkj"},{"type":"unstyled","key":"9s94l","depth":0,"text":"4. Check the Auto apply results to resource. Set If reviewers don't respond to No change. Click Next: Review + Create.","entityRanges":[],"data":{},"inlineStyleRanges":[{"style":"BOLD","length":30,"offset":13},{"offset":79,"style":"BOLD","length":9},{"style":"BOLD","offset":96,"length":21}]},{"key":"ej4iu","text":" ","data":{},"type":"atomic","entityRanges":[{"offset":0,"length":1,"key":3}],"inlineStyleRanges":[],"depth":0},{"key":"7v6gj","entityRanges":[],"text":"5. Give your access review a helpful name then click Create.","inlineStyleRanges":[{"length":6,"style":"BOLD","offset":53}],"data":{},"depth":0,"type":"unstyled"},{"type":"atomic","text":" ","inlineStyleRanges":[],"data":{},"entityRanges":[{"length":1,"key":4,"offset":0}],"key":"213d4","depth":0},{"text":"That's it. Now the owners of the group will receive a notification asking them to review the group membership monthly. They'll have one week to respond and they can automatically remove users from the group.","key":"ckq66","depth":0,"entityRanges":[],"data":{},"type":"unstyled","inlineStyleRanges":[]},{"entityRanges":[],"inlineStyleRanges":[],"text":"How to manage access review on groups","data":{},"type":"header-two","key":"11f30","depth":0},{"data":{},"entityRanges":[],"key":"drnl5","inlineStyleRanges":[],"depth":0,"text":"Now that the access review is configured what will the reviewers see? How do they manage the group through the access review? Not to worry, I'll explain.","type":"unstyled"},{"inlineStyleRanges":[{"style":"color-rgb(33,37,41)","length":19,"offset":51},{"style":"bgcolor-rgb(255,255,255)","length":19,"offset":51},{"length":19,"style":"fontsize-16","offset":51},{"style":"fontfamily-system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", \"Liberation Sans\", sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji","offset":51,"length":19},{"style":"BOLD","length":12,"offset":57}],"text":"1. The reviewers will receive the following email. Click Start review.","entityRanges":[],"type":"unstyled","depth":0,"data":{},"key":"1pckv"},{"entityRanges":[{"key":5,"length":1,"offset":0}],"data":{},"text":" ","inlineStyleRanges":[],"depth":0,"key":"cphgj","type":"atomic"},{"entityRanges":[],"inlineStyleRanges":[{"length":45,"offset":79,"style":"color-rgb(33,37,41)"},{"length":45,"style":"bgcolor-rgb(255,255,255)","offset":79},{"style":"fontsize-16","length":45,"offset":79},{"offset":79,"length":45,"style":"fontfamily-system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", \"Liberation Sans\", sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji"},{"length":7,"offset":85,"style":"BOLD"},{"style":"BOLD","offset":103,"length":6},{"style":"BOLD","length":6,"offset":117}],"type":"unstyled","data":{},"text":"2. Click the checkbox next to the users that are still approved for the group. Click Approve. Give the reason. Click submit.","depth":0,"key":"5snvj"},{"inlineStyleRanges":[],"type":"atomic","depth":0,"data":{},"text":" ","key":"5cdge","entityRanges":[{"offset":0,"key":6,"length":1}]},{"inlineStyleRanges":[{"length":125,"offset":0,"style":"color-rgb(33,37,41)"},{"length":125,"style":"bgcolor-rgb(255,255,255)","offset":0},{"length":125,"offset":0,"style":"fontsize-16"},{"offset":0,"style":"fontfamily-system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", \"Liberation Sans\", sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji","length":125},{"length":4,"offset":89,"style":"BOLD"},{"offset":104,"length":6,"style":"BOLD"},{"length":6,"style":"BOLD","offset":118}],"key":"b9p3p","entityRanges":[],"data":{},"depth":0,"text":"3. Click the checkbox next to the users that are no longer approved for the group. Click Deny. Give the reason. Click Submit.","type":"unstyled"},{"inlineStyleRanges":[],"text":" ","entityRanges":[{"length":1,"offset":0,"key":7}],"data":{},"type":"atomic","depth":0,"key":"4lboo"},{"depth":0,"key":"9kc00","data":{},"inlineStyleRanges":[],"entityRanges":[],"type":"unstyled","text":"If a user is denied you may not see the change right away. They will be removed when the review period has ended or when an administrator stops the review."},{"text":"How to setup access review on roles","type":"unstyled","key":"89d85","data":{},"inlineStyleRanges":[{"offset":0,"length":35,"style":"color-rgb(33,37,41)"},{"style":"bgcolor-rgb(255,255,255)","length":35,"offset":0},{"offset":0,"length":35,"style":"fontsize-32"},{"style":"fontfamily-system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", \"Liberation Sans\", sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji","offset":0,"length":35}],"depth":0,"entityRanges":[]},{"data":{},"key":"aho96","depth":0,"text":"Configuring a role for access review is a bit different. The options are still about the same but there located in different spots. This time, let's configure the admins to review their access. In short, we'll be removing admin roles from any user who doesn't respond. We'll also be configuring the review to happen every 7 days.","inlineStyleRanges":[{"style":"color-rgb(33,37,41)","offset":0,"length":329},{"offset":0,"length":329,"style":"bgcolor-rgb(255,255,255)"},{"offset":0,"length":329,"style":"fontsize-16"},{"length":329,"offset":0,"style":"fontfamily-system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", \"Liberation Sans\", sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji"}],"entityRanges":[],"type":"unstyled"},{"data":{},"text":"1. Log in to Azure Active Directory admin center > All services > Azure AD Privileged Identity Management.","type":"unstyled","key":"4fd2p","inlineStyleRanges":[{"style":"color-rgb(33,37,41)","length":106,"offset":0},{"length":106,"offset":0,"style":"bgcolor-rgb(255,255,255)"},{"offset":0,"length":106,"style":"fontsize-16"},{"length":106,"offset":0,"style":"fontfamily-system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", \"Liberation Sans\", sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji"},{"offset":13,"style":"BOLD","length":35},{"length":12,"offset":51,"style":"BOLD"},{"style":"BOLD","length":39,"offset":66}],"entityRanges":[],"depth":0},{"key":"d6pjo","text":" ","type":"atomic","entityRanges":[{"key":8,"length":1,"offset":0}],"data":{},"inlineStyleRanges":[],"depth":0},{"inlineStyleRanges":[{"length":14,"offset":9,"style":"BOLD"},{"style":"BOLD","offset":26,"length":14},{"offset":43,"style":"BOLD","length":3}],"type":"unstyled","depth":0,"text":"2. Click Azure AD roles > Access reviews > New.","key":"62euq","entityRanges":[],"data":{}},{"key":"dq33m","type":"atomic","depth":0,"entityRanges":[{"length":1,"key":9,"offset":0}],"inlineStyleRanges":[],"text":" ","data":{}},{"type":"unstyled","depth":0,"key":"aknq3","entityRanges":[],"data":{},"inlineStyleRanges":[{"style":"BOLD","length":4,"offset":11},{"length":24,"offset":20,"style":"BOLD"},{"offset":55,"style":"BOLD","length":9},{"style":"BOLD","length":6,"offset":68},{"style":"BOLD","offset":84,"length":8},{"length":6,"offset":96,"style":"BOLD"},{"length":4,"offset":112,"style":"BOLD"},{"offset":119,"length":5,"style":"BOLD"},{"length":25,"offset":132,"style":"BOLD"},{"length":7,"style":"BOLD","offset":159},{"style":"BOLD","length":18,"offset":170},{"offset":196,"style":"BOLD","length":18},{"style":"BOLD","offset":222,"length":4}],"text":"3. Set the name to \"Review User Admin Rights\". Set the Frequency to Weekly. Set the duration to 3 days. Set the End to Never. Click Select privileged role(s). Search for User Administrator. Click User Administrator. Click Done."},{"depth":0,"key":"329cl","data":{},"type":"atomic","inlineStyleRanges":[],"entityRanges":[{"key":10,"offset":0,"length":1}],"text":" "},{"type":"unstyled","depth":0,"inlineStyleRanges":[{"style":"BOLD","length":24,"offset":14},{"style":"BOLD","length":30,"offset":44},{"length":6,"style":"BOLD","offset":78},{"style":"BOLD","length":26,"offset":90},{"style":"BOLD","length":13,"offset":124}],"data":{},"entityRanges":[],"key":"fcj70","text":"4. Expand the Upon completion settings. Set Auto apply results to resource to Enable. Set If reviewers don't respond select Remove access."},{"entityRanges":[],"key":"27ess","inlineStyleRanges":[{"offset":10,"length":17,"style":"BOLD"},{"offset":33,"length":26,"style":"BOLD"},{"length":7,"style":"BOLD","offset":63}],"text":"5. Expand Advanced settings. Set Require reason on approval to Disable.","data":{},"type":"unstyled","depth":0},{"type":"unstyled","depth":0,"entityRanges":[],"data":{},"inlineStyleRanges":[{"style":"BOLD","offset":9,"length":5}],"key":"63tho","text":"6. Click Start."},{"type":"atomic","key":"6bbu1","depth":0,"data":{},"inlineStyleRanges":[],"entityRanges":[{"length":1,"key":11,"offset":0}],"text":" "},{"data":{},"inlineStyleRanges":[{"length":36,"style":"color-rgb(33,37,41)","offset":0},{"length":36,"style":"bgcolor-rgb(255,255,255)","offset":0},{"length":36,"style":"fontsize-32","offset":0},{"style":"fontfamily-system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", \"Liberation Sans\", sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji","length":36,"offset":0}],"depth":0,"type":"unstyled","entityRanges":[],"text":"How to manage access review on roles","key":"8uuek"},{"inlineStyleRanges":[{"length":241,"style":"color-rgb(33,37,41)","offset":0},{"style":"bgcolor-rgb(255,255,255)","length":241,"offset":0},{"offset":0,"length":241,"style":"fontsize-16"},{"style":"fontfamily-system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", \"Liberation Sans\", sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji","offset":0,"length":241}],"depth":0,"data":{},"text":"So now you're set up so admins have to approve their role access every 7 days. So what does that look like? Well, first they'll receive a similar email to the one above. Then they'll be directed to a site where they can approve their access.","entityRanges":[],"type":"unstyled","key":"1s0gv"},{"inlineStyleRanges":[],"type":"atomic","depth":0,"key":"48oe2","data":{},"entityRanges":[{"key":12,"offset":0,"length":1}],"text":" "},{"entityRanges":[],"key":"8sulj","inlineStyleRanges":[],"data":{},"depth":0,"text":"","type":"unstyled"}],"entityMap":{"0":{"mutability":"MUTABLE","type":"IMAGE","data":{"height":"auto","alt":"New access review","width":"auto","alignment":"none","src":"https://i.ibb.co/Xsxvz6Z/new-access-review.png"}},"1":{"type":"IMAGE","data":{"alt":"Access Review set the review type","src":"https://i.ibb.co/vVKtWPh/access-review-review-type3.png","alignment":"none","height":"auto","width":"auto"},"mutability":"MUTABLE"},"2":{"data":{"src":"https://i.ibb.co/8z2hzWH/access-review-reviews.png","alignment":"none","height":"auto","width":"auto","alt":"Access review reviews"},"mutability":"MUTABLE","type":"IMAGE"},"3":{"mutability":"MUTABLE","data":{"alignment":"none","width":"auto","height":"auto","alt":"set the access review settings","src":"https://i.ibb.co/QXMkkv8/access-review-settings.png"},"type":"IMAGE"},"4":{"type":"IMAGE","data":{"src":"https://i.ibb.co/2N1VQMQ/review-access-review-settings.png","alignment":"none","alt":"Review access review settings","height":"auto","width":"auto"},"mutability":"MUTABLE"},"5":{"mutability":"MUTABLE","data":{"height":"auto","width":"auto","alt":"Action required access review email","alignment":"none","src":"https://i.ibb.co/qMnYy61/action-required-access-review-email.png"},"type":"IMAGE"},"6":{"data":{"alignment":"none","width":"auto","src":"https://i.ibb.co/vX5Vxms/Approve-users.png","alt":"Approve users in access review","height":"auto"},"type":"IMAGE","mutability":"MUTABLE"},"7":{"mutability":"MUTABLE","data":{"src":"https://i.ibb.co/qNpQSRW/deny-users.png","alignment":"none","height":"auto","width":"auto","alt":"Deny users group access using access review"},"type":"IMAGE"},"8":{"data":{"alt":"Access Azure AD Privileged Identity Management","src":"https://i.ibb.co/yPtV1h3/access-azure-ad-privileged-identity-management.png","alignment":"none","height":"auto","width":"auto"},"type":"IMAGE","mutability":"MUTABLE"},"9":{"mutability":"MUTABLE","data":{"alt":"Access review for roles","height":"auto","alignment":"none","src":"https://i.ibb.co/SfjV9P0/access-review-for-roles.png","width":"auto"},"type":"IMAGE"},"10":{"mutability":"MUTABLE","type":"IMAGE","data":{"height":"auto","src":"https://i.ibb.co/kBM9K3f/setup-access-review-for-admin-roles.png","alignment":"none","alt":"Setup access rights for admin roles","width":"auto"}},"11":{"type":"IMAGE","mutability":"MUTABLE","data":{"width":"auto","src":"https://i.ibb.co/kBM9K3f/setup-access-review-for-admin-roles.png","alignment":"none","alt":"upon completion settings in access review","height":"auto"}},"12":{"data":{"src":"https://i.ibb.co/ggTMpH5/Access-review-approve-role.png","alt":"Approve access review for role","alignment":"none","width":"auto","height":"auto"},"mutability":"MUTABLE","type":"IMAGE"}}},"id":"rK48f6iM2","title":"Automating Access Review in Microsoft 365","featuredImage":"https://i.ibb.co/Xsxvz6Z/new-access-review.png","slug":"Automating-Access-Review-in-Microsoft-365-rK48f6iM2","images":["https://i.ibb.co/Xsxvz6Z/new-access-review.png","https://i.ibb.co/W32Y480/Access-Review-Type.png","https://i.ibb.co/8z2hzWH/access-review-reviews.png","https://i.ibb.co/vVKtWPh/access-review-review-type3.png","https://i.ibb.co/QXMkkv8/access-review-settings.png","https://i.ibb.co/2N1VQMQ/review-access-review-settings.png","https://i.ibb.co/qMnYy61/action-required-access-review-email.png","https://i.ibb.co/sJ6YLYJ/Approve-users.png","https://i.ibb.co/vX5Vxms/Approve-users.png","https://i.ibb.co/qNpQSRW/deny-users.png","https://i.ibb.co/yPtV1h3/access-azure-ad-privileged-identity-management.png","https://i.ibb.co/SfjV9P0/access-review-for-roles.png","https://i.ibb.co/kBM9K3f/setup-access-review-for-admin-roles.png","https://i.ibb.co/kBM9K3f/setup-access-review-for-admin-roles.png","https://i.ibb.co/kBM9K3f/setup-access-review-for-admin-roles.png","https://i.ibb.co/ggTMpH5/Access-review-approve-role.png"],"datePublished":"2022/5/26","description":"With Microsoft 365 access to your data is in motion unlike it has been before. Users can access your organization's data from personal devices and can even invite guests to collaborate.","sectionId":"AFV_acckJ","type":"article","publish":true},
      articles: [{"id":"cpchjBLkC","sectionId":"qwJW5VrBW","slug":"Whats-in-this-course-cpchjBLkC","title":"What's in this course?","featuredImage":"https://i.ibb.co/zFs9Vfb/microsoft365-security-administrator-associate-600x600.png"},{"id":"KKkBOVuS4","sectionId":"qwJW5VrBW","slug":"Creating-a-free-Microsoft-365-tenant-for-practice-KKkBOVuS4","title":"Creating a free Microsoft 365 tenant for practice","featuredImage":"https://i.ibb.co/F07sjQJ/microsoft-365-e5-trial.png"},{"id":"bzotoOjEe","sectionId":"qwJW5VrBW","slug":"Managing-the-Microsoft-365-tenant-Introduction-to-the-admin-centers-bzotoOjEe","title":"Managing the Microsoft 365 tenant - Introduction to the admin centers","featuredImage":"https://i.ibb.co/f1cr4zt/Microsoft-365-admin-centers.png"},{"id":"cg_vxOX9L","sectionId":"qwJW5VrBW","slug":"Managing-Microsoft-365-through-PowerShell-cg_vxOX9L","title":"Managing Microsoft 365 through PowerShell","featuredImage":"https://i.ibb.co/HV13YF6/install-microsoft-365-powershell-modules.png"},{"id":"uYCIPbnMC","sectionId":"AFV_acckJ","slug":"How-to-create-users-in-Microsoft-365-Cloud-Only-uYCIPbnMC","title":"How to create users in Microsoft 365 Cloud Only","featuredImage":"https://i.ibb.co/Wnt5Q43/View-Microsoft-365-Users.png"},{"id":"7CpqFkPZU","sectionId":"AFV_acckJ","slug":"Creating-and-managing-admins-through-roles-7CpqFkPZU","title":"Creating and managing admins through roles","featuredImage":"https://i.ibb.co/kySL4HQ/Roles-and-administrators.png"},{"id":"rZzausKJ1","sectionId":"AFV_acckJ","slug":"Time-limited-admin-roles-in-Microsoft-365-rZzausKJ1","title":"Time limited admin roles in Microsoft 365","featuredImage":"https://i.ibb.co/nDvjyPD/select-member-to-add-to-PIM-role.png"},{"id":"ky5W0Lz5P","sectionId":"AFV_acckJ","slug":"Whats-AD-Connect-ky5W0Lz5P","title":"What's AD Connect","featuredImage":"https://i.ibb.co/7nDqr9x/Whats-AD-Connect.png"},{"id":"i9pJIjTNH","sectionId":"AFV_acckJ","slug":"Protecting-Passwords-in-Microsoft-365-i9pJIjTNH","title":"Protecting Passwords in Microsoft 365","featuredImage":"https://i.ibb.co/DLD4G4q/access-smart-lockout-settings.png"},{"id":"S1hQgFOMV","sectionId":"AFV_acckJ","slug":"Creating-and-managing-users-through-groups-S1hQgFOMV","title":"Creating and managing users through groups","featuredImage":"https://i.ibb.co/nmmC28M/add-a-group-microsoft-365.png"},{"id":"2QfoI2HxY","sectionId":"AFV_acckJ","slug":"Securing-and-implementing-enterprise-applications-2QfoI2HxY","title":"Securing and implementing enterprise applications","featuredImage":"https://i.ibb.co/C2mp69m/disable-user-consent.png"},{"id":"V1en9Iugh","sectionId":"AFV_acckJ","slug":"Whats-a-conditional-access-policy-V1en9Iugh","title":"What's a conditional access policy?","featuredImage":"https://i.ibb.co/DQm1sY0/Create-conditional-access-policy.png"},{"id":"nAAIvNbtk","sectionId":"AFV_acckJ","slug":"The-many-ways-to-implement-multi-factor-authentication-MFA-in-Microsoft-365-nAAIvNbtk","title":"The many ways to implement multi-factor authentication (MFA) in Microsoft 365","featuredImage":"https://i.ibb.co/P1P0wNY/microsoft-365-manage-security-defaults.png"},{"id":"2S9jn0aLr","sectionId":"AFV_acckJ","slug":"Implement-Self-service-password-reset-in-Microsoft-365-2S9jn0aLr","title":"Implement Self-service password reset in Microsoft 365","featuredImage":"https://i.ibb.co/58y9JVg/write-back-passwords-to-on-premises-directory.png"},{"id":"FldNualGC","sectionId":"AFV_acckJ","slug":"Locking-down-your-Microsoft-365-tenant-from-Microsoft-engineers-FldNualGC","title":"Locking down your Microsoft 365 tenant from Microsoft engineers","featuredImage":"https://i.ibb.co/DCmpnT9/Enable-Customer-Lockbox.png"},{"id":"NFQ6rYFeQ","sectionId":"AFV_acckJ","slug":"Implementing-intelligent-security-using-risk-policies-in-Microsoft-365-NFQ6rYFeQ","title":"Implementing intelligent security using risk policies in Microsoft 365","featuredImage":"https://i.ibb.co/0cyQJ7j/Risk-Detections.png"},{"id":"rK48f6iM2","sectionId":"AFV_acckJ","slug":"Automating-Access-Review-in-Microsoft-365-rK48f6iM2","title":"Automating Access Review in Microsoft 365","featuredImage":"https://i.ibb.co/Xsxvz6Z/new-access-review.png"},{"id":"RHW1API2s","sectionId":"AFV_acckJ","slug":"Just-in-time-approval-and-notification-for-admin-roles-in-Microsoft-365-RHW1API2s","title":"Just in time, approval and notification for admin roles in Microsoft 365","featuredImage":"https://i.ibb.co/dcb6XFN/Activate-a-Role.png"},{"id":"z8EMM9Eu_","sectionId":"QScYfSu74","slug":"Whats-Microsoft-365-Defender-z8EMM9Eu_","title":"What's Microsoft 365 Defender?","featuredImage":"https://i.ibb.co/MDMyDQt/Microsoft-Defender.png"},{"id":"Kye_yNLxA","sectionId":"QScYfSu74","slug":"Whats-Microsoft-Defender-for-identity-Kye_yNLxA","title":"What's Microsoft Defender for identity?","featuredImage":"https://i.ibb.co/bQDBh0Y/Defender-for-Identity-Timeline.png"},{"id":"EnPyp7ukN","sectionId":"QScYfSu74","slug":"Whats-Microsoft-Defender-for-Office-365-EnPyp7ukN","title":"What's Microsoft Defender for Office 365?","featuredImage":"https://i.ibb.co/WcwKY2G/Microsoft-365-incidents-and-alerts.png"},{"id":"6HUOr7qbL","sectionId":"QScYfSu74","slug":"Protect-your-email-environment-from-malicious-actors-6HUOr7qbL","title":"Protect your email and Office environment from malicious actors","featuredImage":"https://i.ibb.co/Df0KQVp/Reports.png"},{"id":"GCOOUsSBT","sectionId":"QScYfSu74","slug":"Protecting-email-against-phishing-attacks-GCOOUsSBT","title":"Protecting email against phishing attacks","featuredImage":"https://i.ibb.co/GCjZHWg/edit-actions.png"},{"id":"GG4cMY8pK","sectionId":"QScYfSu74","slug":"Simulating-attacks-with-Microsoft-365-GG4cMY8pK","title":"Simulating attacks with Microsoft 365","featuredImage":"https://i.ibb.co/NyvnbMK/simulation-overview-view-users-circled.png"},{"id":"z0qPG6v4T","sectionId":"QScYfSu74","slug":"Protecting-Windows-10-and-other-devices-with-Microsoft-Defender-for-Endpoint-z0qPG6v4T","title":"Protecting Windows 10 and other devices with Microsoft Defender for Endpoint","featuredImage":"https://i.ibb.co/T47Xhyh/enable-endpoint-connections.png"},{"id":"LEyZMWBSt","sectionId":"QScYfSu74","slug":"Collect-detect-investigate-and-respond-to-security-threats-using-Microsoft-Sentinel-LEyZMWBSt","title":"Collect, detect, investigate, and respond to security threats using Microsoft Sentinel","featuredImage":"https://i.ibb.co/qN9XsKj/Add-Workbook.png"},{"id":"7MQ3wE4wP","sectionId":"QScYfSu74","slug":"Implement-and-manage-Microsoft-Defender-for-Cloud-Apps-7MQ3wE4wP","title":"Implement and manage Microsoft Defender for Cloud Apps","featuredImage":"https://i.ibb.co/7g7LvFg/office-365-cloud-apps-settings.png"},{"id":"sH_Ee1DW1","sectionId":"QScYfSu74","slug":"Auditing-sign-ins-and-other-actions-in-Microsoft-365-sH_Ee1DW1","title":"Auditing sign-ins and other actions in Microsoft 365","featuredImage":"https://i.ibb.co/BqMw3jZ/Start-recording-user-and-admin-activity.png"},{"id":"vLweLmxZf","sectionId":"YhftdGIRX","slug":"How-to-classify-data-using-labels-in-Microsoft-365-vLweLmxZf","title":"How to classify data using labels in Microsoft 365","featuredImage":"https://i.ibb.co/k9nhWS5/Choose-protection-settings-for-files-and-emails.png"},{"id":"NsF7No40f","sectionId":"YhftdGIRX","slug":"Creating-and-managing-data-retention-to-conform-to-compliance-NsF7No40f","title":"Creating and managing data retention to conform to compliance","featuredImage":"https://i.ibb.co/yqC0ZdY/New-Retention-Policy.png"},{"id":"IsPGsme8w","sectionId":"YhftdGIRX","slug":"Preventing-accidental-and-malicious-data-loss-with-DLP-policies-IsPGsme8w","title":"Preventing accidental and malicious data loss with DLP policies","featuredImage":"https://i.ibb.co/n8WcqKM/Create-a-DLP-policy.png"},{"id":"wv2PbXnhI","sectionId":"YhftdGIRX","slug":"Everything-you-need-to-know-about-securing-SharePoint-Online-for-the-MS-500-wv2PbXnhI","title":"Everything you need to know about securing SharePoint Online for the MS-500","featuredImage":"https://i.ibb.co/Gk9NjSH/Share-Point-Online-Warning.png"},{"id":"7gR3L122b","sectionId":"l0DxUuonW","slug":"Introduction-to-Intune-7gR3L122b","title":"Introduction to Intune","featuredImage":"https://i.ibb.co/Fq3N8BX/Endpoint-Manager-Admin-Center.png"},{"id":"ZyKX3Idjs","sectionId":"l0DxUuonW","slug":"Setting-up-Android-Devices-ZyKX3Idjs","title":"Setting up Android Devices","featuredImage":"https://i.ibb.co/m0BYhL2/Connect-Intune-to-Google-Play.png"},{"id":"MAjW0a2_p","sectionId":"l0DxUuonW","slug":"Setting-up-Apple--iOS-devices-in-Intune-MAjW0a2_p","title":"Setting up Apple / iOS devices in Intune","featuredImage":"https://i.ibb.co/X7Ffb2B/Setup-Apple-Enrollment-in-Intune.png"},{"id":"XFXu2zIS9","sectionId":"l0DxUuonW","slug":"Setting-up-Windows-10-devices-in-Intune-XFXu2zIS9","title":"Setting up Windows 10 devices in Intune","featuredImage":"https://i.ibb.co/WDXKVjW/configure-device-options.png"},{"id":"_LL9VqGZO","sectionId":"l0DxUuonW","slug":"How-to-manage-devices-using-Intune-_LL9VqGZO","title":"How to manage devices using Intune","featuredImage":"https://i.ibb.co/HPQ2m8t/Create-an-endpoint-protection-profile.png"},{"id":"qDRA4jjoN","sectionId":"l0DxUuonW","slug":"Understanding-compliance-policies-qDRA4jjoN","title":"Understanding compliance policies","featuredImage":"https://i.ibb.co/N3Qk57v/Create-a-compliance-policy.png"},{"id":"62t_7oiZx","sectionId":"l0DxUuonW","slug":"Restricting-and-managing-apps-on-user-devices-62t_7oiZx","title":"Restricting and managing apps on user devices","featuredImage":"https://i.ibb.co/PCVRKDf/Add-an-Android-app-to-Intune.png"}],
      articleHtml: `<p>With Microsoft 365 access to your data is in motion unlike it has been before. Users can access your organization's data from personal devices and can even invite guests to collaborate. With this free-flowing access, productivity receives a big boost but so do the challenges around security. How do we make sure there aren't stale user accounts that have access to your environment that is no longer in use? Let's take another example. Let's say you have a user on the IT help desk. He has limited administrative rights to your Microsoft 365 tenant just like he's supposed to. Then he gets a transfer/promotion. Now he's in marketing. How do you make sure his administrative access has been removed?</p>
<p>The answer is simple, access review. With Azure AD access reviews you can review group memberships, access to applications, and role members. You can configure access reviews to happen regularly to make sure only the right people have access.</p>
<h2>What licenses are required?</h2>
<p>To use access review you'll need an Azure AD Premium P2 license or Enterprise Mobility + Security (EMS) E5 license.</p>
<h2>How to setup access review for groups</h2>
<p>Let's jump right into setting up access review for a group. Let's set up the group membership to be reviewed monthly. Let's have the group owners review the membership. Then let's have it automatically approve access if there is no response.</p>
<p>1. Log into <strong>Azure Active Directory admin center</strong> &gt; <strong>Azure Active Directory</strong> &gt; <strong>Identity Governance</strong> &gt; <strong>Access reviews</strong> &gt; <strong>New access review</strong>.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/Xsxvz6Z/new-access-review.png" alt="New access review" style="height: auto;width: auto"/></div>
<p>2. In Select what to review click <strong>Teams + Groups</strong>. In <strong>Review scope</strong> click <strong>Select Teams + groups</strong>. Click <strong>Select group(s)</strong>. Select the group you want to review. Click <strong>Select</strong>. Click <strong>All users </strong>next to Scope. Click <strong>Next: Reviews</strong>.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/vVKtWPh/access-review-review-type3.png" alt="Access Review set the review type" style="height: auto;width: auto"/></div>
<p>3. Set the Select reviewers field to <strong>Group owner(s)</strong>. Set the duration (in days) to <strong>7</strong>. Set the Review recurrence to <strong>Monthly</strong>. Click <strong>Next: Settings</strong>.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/8z2hzWH/access-review-reviews.png" alt="Access review reviews" style="height: auto;width: auto"/></div>
<p>4. Check the <strong>Auto apply results to resource</strong>. Set If reviewers don't respond to <strong>No change</strong>. Click <strong>Next: Review + Create</strong>.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/QXMkkv8/access-review-settings.png" alt="set the access review settings" style="height: auto;width: auto"/></div>
<p>5. Give your access review a helpful name then click <strong>Create</strong>.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/2N1VQMQ/review-access-review-settings.png" alt="Review access review settings" style="height: auto;width: auto"/></div>
<p>That's it. Now the owners of the group will receive a notification asking them to review the group membership monthly. They'll have one week to respond and they can automatically remove users from the group.</p>
<h2>How to manage access review on groups</h2>
<p>Now that the access review is configured what will the reviewers see? How do they manage the group through the access review? Not to worry, I'll explain.</p>
<p>1. The reviewers will receive the following email. <span style="color: rgb(33,37,41);background-color: rgb(255,255,255);font-size: 16px;font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;">Click <strong>Start review</strong>.</span></p>
<div style="text-align:none;"><img src="https://i.ibb.co/qMnYy61/action-required-access-review-email.png" alt="Action required access review email" style="height: auto;width: auto"/></div>
<p>2. Click the checkbox next to the users that are still approved for the group. <span style="color: rgb(33,37,41);background-color: rgb(255,255,255);font-size: 16px;font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;">Click <strong>Approve</strong>. Give the <strong>reason</strong>. Click <strong>submit</strong>.</span></p>
<div style="text-align:none;"><img src="https://i.ibb.co/vX5Vxms/Approve-users.png" alt="Approve users in access review" style="height: auto;width: auto"/></div>
<p><span style="color: rgb(33,37,41);background-color: rgb(255,255,255);font-size: 16px;font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;">3. Click the checkbox next to the users that are no longer approved for the group. Click <strong>Deny</strong>. Give the <strong>reason</strong>. Click <strong>Submit</strong>.</span></p>
<div style="text-align:none;"><img src="https://i.ibb.co/qNpQSRW/deny-users.png" alt="Deny users group access using access review" style="height: auto;width: auto"/></div>
<p>If a user is denied you may not see the change right away. They will be removed when the review period has ended or when an administrator stops the review.</p>
<p><span style="color: rgb(33,37,41);background-color: rgb(255,255,255);font-size: 32px;font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;">How to setup access review on roles</span></p>
<p><span style="color: rgb(33,37,41);background-color: rgb(255,255,255);font-size: 16px;font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;">Configuring a role for access review is a bit different. The options are still about the same but there located in different spots. This time, let's configure the admins to review their access. In short, we'll be removing admin roles from any user who doesn't respond. We'll also be configuring the review to happen every 7 days.</span></p>
<p><span style="color: rgb(33,37,41);background-color: rgb(255,255,255);font-size: 16px;font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;">1. Log in to <strong>Azure Active Directory admin center</strong> &gt; <strong>All services</strong> &gt; <strong>Azure AD Privileged Identity Management</strong>.</span></p>
<div style="text-align:none;"><img src="https://i.ibb.co/yPtV1h3/access-azure-ad-privileged-identity-management.png" alt="Access Azure AD Privileged Identity Management" style="height: auto;width: auto"/></div>
<p>2. Click <strong>Azure AD roles</strong> &gt; <strong>Access reviews</strong> &gt; <strong>New</strong>.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/SfjV9P0/access-review-for-roles.png" alt="Access review for roles" style="height: auto;width: auto"/></div>
<p>3. Set the <strong>name</strong> to "<strong>Review User Admin Rights</strong>". Set the <strong>Frequency</strong> to <strong>Weekly</strong>. Set the <strong>duration</strong> to <strong>3 days</strong>. Set the <strong>End </strong>to <strong>Never</strong>. Click <strong>Select privileged role(s)</strong>. <strong>Search </strong>for <strong>User Administrator</strong>. Click <strong>User Administrator</strong>. Click <strong>Done</strong>.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/kBM9K3f/setup-access-review-for-admin-roles.png" alt="Setup access rights for admin roles" style="height: auto;width: auto"/></div>
<p>4. Expand the <strong>Upon completion settings</strong>. Set <strong>Auto apply results to resource</strong> to <strong>Enable</strong>. Set <strong>If reviewers don't respond</strong> select <strong>Remove access</strong>.</p>
<p>5. Expand <strong>Advanced settings</strong>. Set <strong>Require reason on approval</strong> to <strong>Disable</strong>.</p>
<p>6. Click <strong>Start</strong>.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/kBM9K3f/setup-access-review-for-admin-roles.png" alt="upon completion settings in access review" style="height: auto;width: auto"/></div>
<p><span style="color: rgb(33,37,41);background-color: rgb(255,255,255);font-size: 32px;font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;">How to manage access review on roles</span></p>
<p><span style="color: rgb(33,37,41);background-color: rgb(255,255,255);font-size: 16px;font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;">So now you're set up so admins have to approve their role access every 7 days. So what does that look like? Well, first they'll receive a similar email to the one above. Then they'll be directed to a site where they can approve their access.</span></p>
<div style="text-align:none;"><img src="https://i.ibb.co/ggTMpH5/Access-review-approve-role.png" alt="Approve access review for role" style="height: auto;width: auto"/></div>
<p></p>
`,
      nextContentSlug: 'Just-in-time-approval-and-notification-for-admin-roles-in-Microsoft-365-RHW1API2s',
      previousContentSlug: 'Implementing-intelligent-security-using-risk-policies-in-Microsoft-365-NFQ6rYFeQ',
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
