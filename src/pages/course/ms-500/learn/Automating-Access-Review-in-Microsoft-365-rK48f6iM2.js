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
      course: {"sections":[{"title":"Introduction","order":0,"id":"qwJW5VrBW"},{"order":1,"id":"AFV_acckJ","title":"Securing identity and access to Microsoft 365"},{"title":"Securing Microsoft 365, clouds, and on-premises environments","order":2,"id":"QScYfSu74"},{"id":"YhftdGIRX","order":3,"title":"Protecting your environment from accidental and malicious data loss"},{"title":"Protecting User devices using Intune","id":"l0DxUuonW","order":4}],"contentOrder":["cpchjBLkC","KKkBOVuS4","bzotoOjEe","cg_vxOX9L","uYCIPbnMC","7CpqFkPZU","rZzausKJ1","ky5W0Lz5P","i9pJIjTNH","S1hQgFOMV","2QfoI2HxY","V1en9Iugh","nAAIvNbtk","2S9jn0aLr","FldNualGC","NFQ6rYFeQ","rK48f6iM2","RHW1API2s","z8EMM9Eu_","Kye_yNLxA","EnPyp7ukN","6HUOr7qbL","GCOOUsSBT","GG4cMY8pK","z0qPG6v4T","LEyZMWBSt","7MQ3wE4wP","sH_Ee1DW1","vLweLmxZf","NsF7No40f","IsPGsme8w","wv2PbXnhI","7gR3L122b","ZyKX3Idjs","MAjW0a2_p","XFXu2zIS9","_LL9VqGZO","qDRA4jjoN","62t_7oiZx"],"description":"Learn, prepare and training for the Microsoft Microsoft Office 365 Exam MS-500: Microsoft 365 Security Administration MS-500 exam","title":"Training for MS-500: Microsoft Office 365 Security Admin","id":"MS-500","audience":"Anyone who wants to learn about securing Microsoft 365"},
      article: {"article":{"blocks":[{"inlineStyleRanges":[],"text":"With Microsoft 365 access to your data is in motion unlike it has been before. Users can access your organization's data from personal devices and can even invite guests to collaborate. With this free-flowing access, productivity receives a big boost but so do the challenges around security. How do we make sure there aren't stale user accounts that have access to your environment that is no longer in use? Let's take another example. Let's say you have a user on the IT help desk. He has limited administrative rights to your Microsoft 365 tenant just like he's supposed to. Then he gets a transfer/promotion. Now he's in marketing. How do you make sure his administrative access has been removed?","entityRanges":[],"key":"8lvv","type":"unstyled","depth":0,"data":{}},{"type":"unstyled","key":"2nl3v","text":"The answer is simple, access review. With Azure AD access reviews you can review group memberships, access to applications, and role members. You can configure access reviews to happen regularly to make sure only the right people have access.","depth":0,"entityRanges":[],"data":{},"inlineStyleRanges":[]},{"type":"header-two","data":{},"text":"What licenses are required?","depth":0,"inlineStyleRanges":[],"entityRanges":[],"key":"5aodq"},{"key":"d9qv","type":"unstyled","depth":0,"text":"To use access review you'll need an Azure AD Premium P2 license or Enterprise Mobility + Security (EMS) E5 license.","entityRanges":[],"data":{},"inlineStyleRanges":[]},{"depth":0,"entityRanges":[],"data":{},"key":"e6neb","type":"header-two","inlineStyleRanges":[],"text":"How to setup access review for groups"},{"text":"Let's jump right into setting up access review for a group. Let's set up the group membership to be reviewed monthly. Let's have the group owners review the membership. Then let's have it automatically approve access if there is no response.","type":"unstyled","data":{},"inlineStyleRanges":[],"entityRanges":[],"key":"f51s4","depth":0},{"depth":0,"inlineStyleRanges":[{"length":35,"offset":12,"style":"BOLD"},{"offset":50,"style":"BOLD","length":22},{"length":19,"offset":75,"style":"BOLD"},{"offset":97,"style":"BOLD","length":14},{"length":17,"offset":114,"style":"BOLD"}],"entityRanges":[],"data":{},"type":"unstyled","text":"1. Log into Azure Active Directory admin center > Azure Active Directory > Identity Governance > Access reviews > New access review.","key":"39r8"},{"data":{},"type":"atomic","depth":0,"inlineStyleRanges":[],"text":" ","entityRanges":[{"length":1,"key":0,"offset":0}],"key":"458nd"},{"entityRanges":[],"depth":0,"text":"2. In Select what to review click Teams + Groups. In Review scope click Select Teams + groups. Click Select group(s). Select the group you want to review. Click Select. Click All users next to Scope. Click Next: Reviews.","type":"unstyled","data":{},"key":"cv3ou","inlineStyleRanges":[{"length":14,"offset":34,"style":"BOLD"},{"style":"BOLD","offset":53,"length":12},{"style":"BOLD","offset":72,"length":21},{"length":15,"style":"BOLD","offset":101},{"offset":161,"style":"BOLD","length":6},{"style":"BOLD","offset":175,"length":10},{"offset":206,"style":"BOLD","length":13}]},{"entityRanges":[{"key":1,"offset":0,"length":1}],"inlineStyleRanges":[],"type":"atomic","key":"ce4vk","depth":0,"text":" ","data":{}},{"depth":0,"inlineStyleRanges":[{"offset":37,"length":14,"style":"BOLD"},{"length":1,"style":"BOLD","offset":83},{"style":"BOLD","length":7,"offset":115},{"style":"BOLD","length":14,"offset":130}],"type":"unstyled","entityRanges":[],"text":"3. Set the Select reviewers field to Group owner(s). Set the duration (in days) to 7. Set the Review recurrence to Monthly. Click Next: Settings.","key":"dj416","data":{}},{"depth":0,"text":" ","entityRanges":[{"key":2,"length":1,"offset":0}],"data":{},"inlineStyleRanges":[],"key":"5btkj","type":"atomic"},{"type":"unstyled","data":{},"text":"4. Check the Auto apply results to resource. Set If reviewers don't respond to No change. Click Next: Review + Create.","depth":0,"entityRanges":[],"inlineStyleRanges":[{"offset":13,"length":30,"style":"BOLD"},{"offset":79,"length":9,"style":"BOLD"},{"style":"BOLD","offset":96,"length":21}],"key":"9s94l"},{"entityRanges":[{"offset":0,"key":3,"length":1}],"text":" ","depth":0,"type":"atomic","data":{},"inlineStyleRanges":[],"key":"ej4iu"},{"depth":0,"inlineStyleRanges":[{"offset":53,"style":"BOLD","length":6}],"text":"5. Give your access review a helpful name then click Create.","data":{},"type":"unstyled","entityRanges":[],"key":"7v6gj"},{"data":{},"depth":0,"text":" ","type":"atomic","inlineStyleRanges":[],"entityRanges":[{"key":4,"length":1,"offset":0}],"key":"213d4"},{"text":"That's it. Now the owners of the group will receive a notification asking them to review the group membership monthly. They'll have one week to respond and they can automatically remove users from the group.","type":"unstyled","depth":0,"data":{},"inlineStyleRanges":[],"entityRanges":[],"key":"ckq66"},{"text":"How to manage access review on groups","type":"header-two","key":"11f30","data":{},"inlineStyleRanges":[],"entityRanges":[],"depth":0},{"depth":0,"type":"unstyled","key":"drnl5","inlineStyleRanges":[],"entityRanges":[],"data":{},"text":"Now that the access review is configured what will the reviewers see? How do they manage the group through the access review? Not to worry, I'll explain."},{"inlineStyleRanges":[{"style":"color-rgb(33,37,41)","offset":51,"length":19},{"offset":51,"length":19,"style":"bgcolor-rgb(255,255,255)"},{"length":19,"style":"fontsize-16","offset":51},{"length":19,"offset":51,"style":"fontfamily-system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", \"Liberation Sans\", sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji"},{"style":"BOLD","length":12,"offset":57}],"entityRanges":[],"depth":0,"text":"1. The reviewers will receive the following email. Click Start review.","key":"1pckv","type":"unstyled","data":{}},{"inlineStyleRanges":[],"text":" ","entityRanges":[{"offset":0,"key":5,"length":1}],"data":{},"key":"cphgj","depth":0,"type":"atomic"},{"depth":0,"inlineStyleRanges":[{"style":"color-rgb(33,37,41)","length":45,"offset":79},{"style":"bgcolor-rgb(255,255,255)","offset":79,"length":45},{"length":45,"style":"fontsize-16","offset":79},{"length":45,"offset":79,"style":"fontfamily-system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", \"Liberation Sans\", sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji"},{"offset":85,"length":7,"style":"BOLD"},{"style":"BOLD","offset":103,"length":6},{"offset":117,"style":"BOLD","length":6}],"entityRanges":[],"key":"5snvj","text":"2. Click the checkbox next to the users that are still approved for the group. Click Approve. Give the reason. Click submit.","data":{},"type":"unstyled"},{"entityRanges":[{"key":6,"length":1,"offset":0}],"data":{},"inlineStyleRanges":[],"depth":0,"text":" ","key":"5cdge","type":"atomic"},{"data":{},"depth":0,"key":"b9p3p","entityRanges":[],"type":"unstyled","inlineStyleRanges":[{"style":"color-rgb(33,37,41)","length":125,"offset":0},{"style":"bgcolor-rgb(255,255,255)","offset":0,"length":125},{"offset":0,"length":125,"style":"fontsize-16"},{"offset":0,"style":"fontfamily-system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", \"Liberation Sans\", sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji","length":125},{"offset":89,"style":"BOLD","length":4},{"offset":104,"style":"BOLD","length":6},{"offset":118,"style":"BOLD","length":6}],"text":"3. Click the checkbox next to the users that are no longer approved for the group. Click Deny. Give the reason. Click Submit."},{"depth":0,"key":"4lboo","data":{},"type":"atomic","inlineStyleRanges":[],"entityRanges":[{"key":7,"length":1,"offset":0}],"text":" "},{"type":"unstyled","entityRanges":[],"inlineStyleRanges":[],"key":"9kc00","text":"If a user is denied you may not see the change right away. They will be removed when the review period has ended or when an administrator stops the review.","depth":0,"data":{}},{"inlineStyleRanges":[{"style":"color-rgb(33,37,41)","length":35,"offset":0},{"offset":0,"length":35,"style":"bgcolor-rgb(255,255,255)"},{"style":"fontsize-32","length":35,"offset":0},{"length":35,"offset":0,"style":"fontfamily-system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", \"Liberation Sans\", sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji"}],"depth":0,"type":"unstyled","entityRanges":[],"text":"How to setup access review on roles","key":"89d85","data":{}},{"text":"Configuring a role for access review is a bit different. The options are still about the same but there located in different spots. This time, let's configure the admins to review their access. In short, we'll be removing admin roles from any user who doesn't respond. We'll also be configuring the review to happen every 7 days.","entityRanges":[],"data":{},"inlineStyleRanges":[{"length":329,"offset":0,"style":"color-rgb(33,37,41)"},{"length":329,"offset":0,"style":"bgcolor-rgb(255,255,255)"},{"length":329,"style":"fontsize-16","offset":0},{"offset":0,"style":"fontfamily-system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", \"Liberation Sans\", sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji","length":329}],"type":"unstyled","depth":0,"key":"aho96"},{"entityRanges":[],"type":"unstyled","inlineStyleRanges":[{"offset":0,"style":"color-rgb(33,37,41)","length":106},{"length":106,"style":"bgcolor-rgb(255,255,255)","offset":0},{"style":"fontsize-16","length":106,"offset":0},{"offset":0,"length":106,"style":"fontfamily-system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", \"Liberation Sans\", sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji"},{"style":"BOLD","length":35,"offset":13},{"style":"BOLD","offset":51,"length":12},{"style":"BOLD","length":39,"offset":66}],"depth":0,"text":"1. Log in to Azure Active Directory admin center > All services > Azure AD Privileged Identity Management.","data":{},"key":"4fd2p"},{"data":{},"inlineStyleRanges":[],"entityRanges":[{"key":8,"offset":0,"length":1}],"key":"d6pjo","depth":0,"text":" ","type":"atomic"},{"type":"unstyled","data":{},"text":"2. Click Azure AD roles > Access reviews > New.","key":"62euq","entityRanges":[],"depth":0,"inlineStyleRanges":[{"style":"BOLD","offset":9,"length":14},{"length":14,"offset":26,"style":"BOLD"},{"style":"BOLD","length":3,"offset":43}]},{"data":{},"inlineStyleRanges":[],"entityRanges":[{"key":9,"offset":0,"length":1}],"depth":0,"text":" ","type":"atomic","key":"dq33m"},{"type":"unstyled","key":"aknq3","data":{},"text":"3. Set the name to \"Review User Admin Rights\". Set the Frequency to Weekly. Set the duration to 3 days. Set the End to Never. Click Select privileged role(s). Search for User Administrator. Click User Administrator. Click Done.","entityRanges":[],"inlineStyleRanges":[{"style":"BOLD","offset":11,"length":4},{"style":"BOLD","offset":20,"length":24},{"length":9,"style":"BOLD","offset":55},{"style":"BOLD","length":6,"offset":68},{"offset":84,"style":"BOLD","length":8},{"length":6,"offset":96,"style":"BOLD"},{"style":"BOLD","length":4,"offset":112},{"offset":119,"length":5,"style":"BOLD"},{"offset":132,"length":25,"style":"BOLD"},{"style":"BOLD","length":7,"offset":159},{"offset":170,"length":18,"style":"BOLD"},{"length":18,"offset":196,"style":"BOLD"},{"style":"BOLD","length":4,"offset":222}],"depth":0},{"inlineStyleRanges":[],"key":"329cl","type":"atomic","entityRanges":[{"key":10,"offset":0,"length":1}],"text":" ","depth":0,"data":{}},{"entityRanges":[],"key":"fcj70","inlineStyleRanges":[{"offset":14,"style":"BOLD","length":24},{"length":30,"style":"BOLD","offset":44},{"length":6,"style":"BOLD","offset":78},{"length":26,"style":"BOLD","offset":90},{"length":13,"offset":124,"style":"BOLD"}],"depth":0,"data":{},"text":"4. Expand the Upon completion settings. Set Auto apply results to resource to Enable. Set If reviewers don't respond select Remove access.","type":"unstyled"},{"inlineStyleRanges":[{"style":"BOLD","offset":10,"length":17},{"style":"BOLD","length":26,"offset":33},{"offset":63,"length":7,"style":"BOLD"}],"data":{},"text":"5. Expand Advanced settings. Set Require reason on approval to Disable.","entityRanges":[],"key":"27ess","depth":0,"type":"unstyled"},{"inlineStyleRanges":[{"length":5,"style":"BOLD","offset":9}],"text":"6. Click Start.","type":"unstyled","entityRanges":[],"data":{},"key":"63tho","depth":0},{"inlineStyleRanges":[],"key":"6bbu1","entityRanges":[{"offset":0,"length":1,"key":11}],"text":" ","data":{},"depth":0,"type":"atomic"},{"depth":0,"data":{},"key":"8uuek","text":"How to manage access review on roles","type":"unstyled","entityRanges":[],"inlineStyleRanges":[{"offset":0,"length":36,"style":"color-rgb(33,37,41)"},{"length":36,"style":"bgcolor-rgb(255,255,255)","offset":0},{"offset":0,"length":36,"style":"fontsize-32"},{"offset":0,"style":"fontfamily-system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", \"Liberation Sans\", sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji","length":36}]},{"entityRanges":[],"type":"unstyled","key":"1s0gv","text":"So now you're set up so admins have to approve their role access every 7 days. So what does that look like? Well, first they'll receive a similar email to the one above. Then they'll be directed to a site where they can approve their access.","depth":0,"inlineStyleRanges":[{"style":"color-rgb(33,37,41)","length":241,"offset":0},{"style":"bgcolor-rgb(255,255,255)","offset":0,"length":241},{"offset":0,"length":241,"style":"fontsize-16"},{"offset":0,"length":241,"style":"fontfamily-system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", \"Liberation Sans\", sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji"}],"data":{}},{"data":{},"depth":0,"entityRanges":[{"offset":0,"key":12,"length":1}],"text":" ","inlineStyleRanges":[],"type":"atomic","key":"48oe2"},{"key":"8sulj","entityRanges":[],"inlineStyleRanges":[],"depth":0,"data":{},"text":"","type":"unstyled"}],"entityMap":{"0":{"mutability":"MUTABLE","type":"IMAGE","data":{"height":"auto","alt":"New access review","alignment":"none","width":"auto","src":"https://i.ibb.co/Xsxvz6Z/new-access-review.png"}},"1":{"data":{"width":"auto","height":"auto","alt":"Access Review set the review type","alignment":"none","src":"https://i.ibb.co/vVKtWPh/access-review-review-type3.png"},"mutability":"MUTABLE","type":"IMAGE"},"2":{"type":"IMAGE","mutability":"MUTABLE","data":{"alt":"Access review reviews","src":"https://i.ibb.co/8z2hzWH/access-review-reviews.png","alignment":"none","height":"auto","width":"auto"}},"3":{"type":"IMAGE","mutability":"MUTABLE","data":{"height":"auto","width":"auto","src":"https://i.ibb.co/QXMkkv8/access-review-settings.png","alt":"set the access review settings","alignment":"none"}},"4":{"mutability":"MUTABLE","data":{"width":"auto","src":"https://i.ibb.co/2N1VQMQ/review-access-review-settings.png","height":"auto","alignment":"none","alt":"Review access review settings"},"type":"IMAGE"},"5":{"data":{"height":"auto","alignment":"none","alt":"Action required access review email","width":"auto","src":"https://i.ibb.co/qMnYy61/action-required-access-review-email.png"},"type":"IMAGE","mutability":"MUTABLE"},"6":{"type":"IMAGE","data":{"alignment":"none","width":"auto","height":"auto","alt":"Approve users in access review","src":"https://i.ibb.co/vX5Vxms/Approve-users.png"},"mutability":"MUTABLE"},"7":{"data":{"alt":"Deny users group access using access review","alignment":"none","height":"auto","src":"https://i.ibb.co/qNpQSRW/deny-users.png","width":"auto"},"type":"IMAGE","mutability":"MUTABLE"},"8":{"type":"IMAGE","mutability":"MUTABLE","data":{"alignment":"none","src":"https://i.ibb.co/yPtV1h3/access-azure-ad-privileged-identity-management.png","alt":"Access Azure AD Privileged Identity Management","height":"auto","width":"auto"}},"9":{"mutability":"MUTABLE","type":"IMAGE","data":{"height":"auto","width":"auto","alignment":"none","src":"https://i.ibb.co/SfjV9P0/access-review-for-roles.png","alt":"Access review for roles"}},"10":{"data":{"alt":"Setup access rights for admin roles","alignment":"none","width":"auto","height":"auto","src":"https://i.ibb.co/kBM9K3f/setup-access-review-for-admin-roles.png"},"type":"IMAGE","mutability":"MUTABLE"},"11":{"type":"IMAGE","mutability":"MUTABLE","data":{"src":"https://i.ibb.co/kBM9K3f/setup-access-review-for-admin-roles.png","alt":"upon completion settings in access review","alignment":"none","width":"auto","height":"auto"}},"12":{"mutability":"MUTABLE","data":{"alignment":"none","height":"auto","width":"auto","src":"https://i.ibb.co/ggTMpH5/Access-review-approve-role.png","alt":"Approve access review for role"},"type":"IMAGE"}}},"title":"Automating Access Review in Microsoft 365","type":"article","sectionId":"AFV_acckJ","featuredImage":"https://i.ibb.co/Xsxvz6Z/new-access-review.png","description":"With Microsoft 365 access to your data is in motion unlike it has been before. Users can access your organization's data from personal devices and can even invite guests to collaborate.","publish":true,"images":["https://i.ibb.co/Xsxvz6Z/new-access-review.png","https://i.ibb.co/W32Y480/Access-Review-Type.png","https://i.ibb.co/8z2hzWH/access-review-reviews.png","https://i.ibb.co/vVKtWPh/access-review-review-type3.png","https://i.ibb.co/QXMkkv8/access-review-settings.png","https://i.ibb.co/2N1VQMQ/review-access-review-settings.png","https://i.ibb.co/qMnYy61/action-required-access-review-email.png","https://i.ibb.co/sJ6YLYJ/Approve-users.png","https://i.ibb.co/vX5Vxms/Approve-users.png","https://i.ibb.co/qNpQSRW/deny-users.png","https://i.ibb.co/yPtV1h3/access-azure-ad-privileged-identity-management.png","https://i.ibb.co/SfjV9P0/access-review-for-roles.png","https://i.ibb.co/kBM9K3f/setup-access-review-for-admin-roles.png","https://i.ibb.co/kBM9K3f/setup-access-review-for-admin-roles.png","https://i.ibb.co/kBM9K3f/setup-access-review-for-admin-roles.png","https://i.ibb.co/ggTMpH5/Access-review-approve-role.png"],"slug":"Automating-Access-Review-in-Microsoft-365-rK48f6iM2","datePublished":"2022/5/26","id":"rK48f6iM2"},
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
