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
      article: {"type":"article","images":["https://i.ibb.co/g47sPD6/Azure-Ad-PIM.png","https://i.ibb.co/mtw4673/PIM-Add-Assignments.png","https://i.ibb.co/MGjzT0Q/add-user-assignments.png","https://i.ibb.co/dcb6XFN/Activate-a-Role.png","https://i.ibb.co/2d73qCQ/continue.png","https://i.ibb.co/ZxxcJW0/activate-role.png","https://i.ibb.co/XzvVpkv/activate-role.png","https://i.ibb.co/g47sPD6/Azure-Ad-PIM.png","https://i.ibb.co/svCt0jy/PIM-assignments.png","https://i.ibb.co/t37zJqS/eligible-assignments.png","https://i.ibb.co/7btbR3M/active-pim-assignements.png","https://i.ibb.co/7btbR3M/active-pim-assignements.png","https://i.ibb.co/g47sPD6/Azure-Ad-PIM.png","https://i.ibb.co/h1KfLY4/PIM-settings.png","https://i.ibb.co/G55hBDT/edit-PIM-role-assignments.png","https://i.ibb.co/2nWcPxZ/edit-PIM-role-settings.png","https://i.ibb.co/2nWcPxZ/edit-PIM-role-settings.png","https://i.ibb.co/DkrH6cb/edit-PIM-role-settings-assignments.png","https://i.ibb.co/C0MtxQc/approve-pim-role-assignment-email.png","https://i.ibb.co/6Nrtpt9/approve-pim-role-assignment.png","https://i.ibb.co/GkpLRJq/approve-request-justification.png","https://i.ibb.co/1r6Sv3c/edit-PIM-role-settings-assignments.png","https://i.ibb.co/pJdHDkz/Edit-role-settings-notifications.png"],"datePublished":"2022/5/26","sectionId":"AFV_acckJ","slug":"Just-in-time-approval-and-notification-for-admin-roles-in-Microsoft-365-RHW1API2s","id":"RHW1API2s","article":{"blocks":[{"type":"unstyled","entityRanges":[],"text":"Up until now, we've worked with permanent admin role assignments. Essentially, the user account is an admin until the user account is removed from the admin role. But there's another option. Just in time privileged access. Microsoft calls this Privileged Identity Management (PIM). With PIM users only have admin roles for a limited time. And before they activate the admin role they can be required to get approval.","key":"bajq4","inlineStyleRanges":[],"data":{},"depth":0},{"entityRanges":[],"text":"Licenses required","type":"header-two","depth":0,"data":{},"inlineStyleRanges":[],"key":"6kgn9"},{"inlineStyleRanges":[],"data":{},"type":"unstyled","depth":0,"entityRanges":[],"key":"bc2cu","text":"First things first. What licenses are required to use privileged identity management? You'll need an Azure AD Premium P2 license. It's also included in the Enterprise Mobility + Security (EMS) E5 license."},{"entityRanges":[],"key":"eth4v","depth":0,"text":"Assign a role","inlineStyleRanges":[],"data":{},"type":"header-two"},{"inlineStyleRanges":[],"key":"43gj9","entityRanges":[],"data":{},"type":"unstyled","depth":0,"text":"Now let's assign a role using PIM. By default, the role can only be active for 8 hours. So let's give a user a permanent role assignment."},{"depth":0,"inlineStyleRanges":[{"length":35,"style":"BOLD","offset":9},{"style":"BOLD","length":12,"offset":47},{"length":39,"offset":62,"style":"BOLD"}],"text":"1. Go to Azure Active Directory admin center > All services > Azure AD Privileged Identity Management.","type":"unstyled","entityRanges":[],"data":{},"key":"2ieu8"},{"depth":0,"data":{},"key":"bi8jn","inlineStyleRanges":[],"text":" ","entityRanges":[{"key":0,"length":1,"offset":0}],"type":"atomic"},{"inlineStyleRanges":[{"style":"BOLD","offset":9,"length":14},{"offset":26,"length":11,"style":"BOLD"},{"style":"BOLD","length":15,"offset":40}],"entityRanges":[],"text":"2. Click Azure AD roles > Assignments > Add assignments.","depth":0,"key":"et3sg","type":"unstyled","data":{}},{"entityRanges":[{"offset":0,"length":1,"key":1}],"depth":0,"inlineStyleRanges":[],"key":"e0ate","data":{},"text":" ","type":"atomic"},{"key":"d3slc","depth":0,"inlineStyleRanges":[{"offset":9,"length":11,"style":"BOLD"},{"style":"BOLD","offset":28,"length":20},{"style":"BOLD","length":18,"offset":56},{"style":"BOLD","offset":87,"length":5},{"style":"BOLD","length":6,"offset":115},{"length":4,"offset":129,"style":"BOLD"}],"entityRanges":[],"text":"3. Under Select role select Global Administrator. Click No member selected. Select the user you want to add. Click Select. Click Next.","type":"unstyled","data":{}},{"type":"atomic","data":{},"key":"bam9n","depth":0,"entityRanges":[{"key":2,"offset":0,"length":1}],"text":" ","inlineStyleRanges":[]},{"inlineStyleRanges":[{"offset":9,"style":"BOLD","length":6}],"text":"4. Click Assign.","entityRanges":[],"depth":0,"key":"o5bp","data":{},"type":"unstyled"},{"type":"header-two","data":{},"entityRanges":[],"key":"4m9k8","depth":0,"inlineStyleRanges":[],"text":"How to activate a role assignment"},{"depth":0,"key":"a253m","entityRanges":[],"text":"Once you assign a user as an eligible role the user will receive the following email:","data":{},"type":"unstyled","inlineStyleRanges":[]},{"data":{},"entityRanges":[{"offset":0,"length":1,"key":3}],"key":"6rljl","type":"atomic","depth":0,"inlineStyleRanges":[],"text":" "},{"inlineStyleRanges":[{"offset":9,"length":21,"style":"BOLD"}],"type":"unstyled","entityRanges":[],"text":"1. Click View or activate role.","key":"bg93m","depth":0,"data":{}},{"inlineStyleRanges":[{"offset":9,"style":"BOLD","length":8}],"key":"eup6h","text":"2. Click Activate.","type":"unstyled","data":{},"depth":0,"entityRanges":[]},{"depth":0,"inlineStyleRanges":[{"offset":48,"style":"BOLD","length":8}],"entityRanges":[],"data":{},"key":"bn43e","type":"unstyled","text":"3. If additional verification is required click continue. Finish the authentication."},{"key":"r95r","depth":0,"data":{},"type":"atomic","inlineStyleRanges":[],"text":" ","entityRanges":[{"length":1,"key":4,"offset":0}]},{"data":{},"inlineStyleRanges":[{"length":6,"style":"BOLD","offset":9},{"style":"BOLD","length":8,"offset":23}],"text":"4. Set a reason. Click Activate.","entityRanges":[],"key":"9eu6o","type":"unstyled","depth":0},{"entityRanges":[{"length":1,"key":5,"offset":0}],"inlineStyleRanges":[],"depth":0,"key":"62qtv","text":" ","data":{},"type":"atomic"},{"key":"7thu2","text":"Review role assignments","entityRanges":[],"data":{},"inlineStyleRanges":[],"type":"header-two","depth":0},{"type":"unstyled","data":{},"entityRanges":[],"text":"As an admin, you may need to review who's assigned what roles. Let's take a look.","inlineStyleRanges":[],"key":"aakkc","depth":0},{"data":{},"text":"1. Go to Azure Active Directory admin center > All services > Azure AD Privileged Identity Management.","type":"unstyled","key":"5sq6d","inlineStyleRanges":[{"offset":3,"length":99,"style":"color-rgb(33,37,41)"},{"length":99,"offset":3,"style":"bgcolor-rgb(255,255,255)"},{"style":"fontsize-16","offset":3,"length":99},{"length":99,"offset":3,"style":"fontfamily-system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", \"Liberation Sans\", sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji"},{"style":"BOLD","length":35,"offset":9},{"style":"BOLD","length":12,"offset":47},{"style":"BOLD","length":39,"offset":62}],"entityRanges":[],"depth":0},{"type":"atomic","entityRanges":[{"offset":0,"key":6,"length":1}],"inlineStyleRanges":[],"text":" ","data":{},"key":"ertsa","depth":0},{"depth":0,"inlineStyleRanges":[{"style":"BOLD","offset":9,"length":14},{"length":11,"offset":26,"style":"BOLD"}],"text":"2. Click Azure AD roles > Assignments.","entityRanges":[],"type":"unstyled","data":{},"key":"54gf"},{"depth":0,"inlineStyleRanges":[],"text":" ","type":"atomic","entityRanges":[{"offset":0,"length":1,"key":7}],"key":"3ed4v","data":{}},{"entityRanges":[],"key":"dimgd","type":"unstyled","text":"Under eligible assignments, you'll see the user you added. These users have a role assigned through PIM that needs to be activated.","depth":0,"inlineStyleRanges":[],"data":{}},{"depth":0,"inlineStyleRanges":[],"data":{},"entityRanges":[{"key":8,"offset":0,"length":1}],"key":"46ksa","type":"atomic","text":" "},{"key":"39ga7","data":{},"type":"unstyled","inlineStyleRanges":[{"offset":6,"style":"BOLD","length":18}],"text":"Click Active assignments. These users currently have roles. If you look under state you'll see two different states: \"Assigned\" and \"Active\". Assigned users have the role assigned to them permanently. They'll always have admin rights. Activated roles show users that are eligible for assignment and have activated the role.","entityRanges":[],"depth":0},{"entityRanges":[{"length":1,"offset":0,"key":9}],"key":"1ogi4","depth":0,"inlineStyleRanges":[],"data":{},"text":" ","type":"atomic"},{"key":"d5v50","text":"Update Settings","data":{},"type":"header-two","entityRanges":[],"depth":0,"inlineStyleRanges":[]},{"depth":0,"entityRanges":[],"key":"dsmcb","text":"So now we've configured a user and we know how they can activate the admin role. But we've got a problem. The activation should only be 1 hour and another admin needs to approve the activation before the role is activated. Next, we'll disable the permanent assignment of the role. Finally, we'll make sure an admin is notified when the PIM role is activated.","inlineStyleRanges":[],"data":{},"type":"unstyled"},{"type":"unstyled","depth":0,"data":{},"inlineStyleRanges":[{"offset":0,"style":"color-rgb(33,37,41)","length":102},{"length":102,"style":"bgcolor-rgb(255,255,255)","offset":0},{"offset":0,"style":"fontsize-16","length":102},{"style":"fontfamily-system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", \"Liberation Sans\", sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji","offset":0,"length":102},{"style":"BOLD","offset":9,"length":35},{"length":12,"style":"BOLD","offset":47},{"style":"BOLD","length":39,"offset":62}],"text":"1. Go to Azure Active Directory admin center > All services > Azure AD Privileged Identity Management.","key":"9se3f","entityRanges":[]},{"key":"5dqav","text":" ","entityRanges":[{"offset":0,"key":10,"length":1}],"depth":0,"inlineStyleRanges":[],"type":"atomic","data":{}},{"entityRanges":[],"text":"2. Click Azure AD roles > Assignments > Settings.","inlineStyleRanges":[{"length":15,"style":"BOLD","offset":9},{"style":"BOLD","length":11,"offset":26},{"length":8,"offset":40,"style":"BOLD"}],"depth":0,"key":"hfv4","type":"unstyled","data":{}},{"depth":0,"key":"ei0mr","text":" ","type":"atomic","inlineStyleRanges":[],"data":{},"entityRanges":[{"length":1,"key":11,"offset":0}]},{"type":"unstyled","text":"3. Click Application Administrator > Edit.","data":{},"entityRanges":[],"inlineStyleRanges":[{"offset":9,"style":"BOLD","length":25},{"style":"BOLD","offset":37,"length":4}],"key":"3b3s5","depth":0},{"entityRanges":[{"key":12,"length":1,"offset":0}],"data":{},"depth":0,"type":"atomic","text":" ","key":"59j6s","inlineStyleRanges":[]},{"key":"4s6lf","depth":0,"text":"4. Set the Activation maximum duration (hours) to 1. Click Require approval to activate. Click No approver selected. Select the admin to approve. Click Select. Click Next: Assignment.","entityRanges":[],"inlineStyleRanges":[{"length":36,"style":"BOLD","offset":11},{"style":"BOLD","offset":50,"length":1},{"length":28,"style":"BOLD","offset":59},{"style":"BOLD","length":20,"offset":95},{"offset":117,"style":"BOLD","length":6},{"style":"BOLD","length":5,"offset":128},{"length":6,"style":"BOLD","offset":152},{"style":"BOLD","offset":166,"length":16}],"data":{},"type":"unstyled"},{"key":"8ok9o","text":" ","inlineStyleRanges":[],"data":{},"type":"atomic","depth":0,"entityRanges":[{"offset":0,"key":13,"length":1}]},{"data":{},"inlineStyleRanges":[{"length":33,"style":"BOLD","offset":11},{"length":18,"style":"BOLD","offset":52}],"entityRanges":[],"key":"eh9sc","type":"unstyled","text":"5. Uncheck Allow permanent active assignment. Click Next: Notification.","depth":0},{"depth":0,"text":" ","key":"cqoda","inlineStyleRanges":[],"data":{},"entityRanges":[{"length":1,"offset":0,"key":14}],"type":"atomic"},{"entityRanges":[{"length":1,"offset":3,"key":15}],"depth":0,"text":"6.  Set an email address in the Role activation alert additional recipients. Click Update.","type":"unstyled","inlineStyleRanges":[{"style":"BOLD","length":13,"offset":11},{"offset":32,"style":"BOLD","length":43},{"style":"BOLD","offset":83,"length":6}],"key":"3jaqk","data":{}},{"key":"aik7l","inlineStyleRanges":[],"entityRanges":[{"length":1,"offset":0,"key":16}],"data":{},"type":"atomic","text":" ","depth":0},{"key":"a8044","depth":0,"text":"Who can approve the admin role assignment?","inlineStyleRanges":[],"entityRanges":[],"type":"header-two","data":{}},{"type":"unstyled","depth":0,"entityRanges":[],"text":"Only global administrators and privileged role administrators can approve the admin role assignments. Let's try it now. Walk through the \"Assign a role\" steps above but this time grant someone the application administrator role. Then login with the user you made eligible for the role and activate the role following the \"How to activate a role assignment steps above\".","key":"7e4hm","data":{},"inlineStyleRanges":[]},{"data":{},"inlineStyleRanges":[],"text":"How to approve activation of a role","key":"cs53r","depth":0,"type":"header-two","entityRanges":[]},{"entityRanges":[],"type":"unstyled","text":"1. Once a user requests a role the approver will receive an email with the subject \"PIM: Review User's request to activate the Application Administrator role\". In that email, click Approve or deny request.","inlineStyleRanges":[{"style":"BOLD","offset":181,"length":23}],"key":"8rop7","depth":0,"data":{}},{"inlineStyleRanges":[],"depth":0,"key":"12a29","text":" ","entityRanges":[{"length":1,"offset":0,"key":17}],"data":{},"type":"atomic"},{"type":"unstyled","inlineStyleRanges":[{"style":"BOLD","length":7,"offset":3},{"style":"BOLD","offset":14,"length":7},{"length":9,"offset":37,"style":"BOLD"},{"style":"BOLD","length":7,"offset":70}],"text":"2. Review the request then click the checkbox next to the role. Click Approve.","entityRanges":[],"key":"4b45i","data":{},"depth":0},{"text":" ","type":"atomic","key":"9ir5","inlineStyleRanges":[],"data":{},"entityRanges":[{"length":1,"key":18,"offset":0}],"depth":0},{"data":{},"key":"57pdu","type":"unstyled","depth":0,"text":"3. Give a justification and click Confirm.","entityRanges":[],"inlineStyleRanges":[{"length":13,"offset":10,"style":"BOLD"},{"length":7,"offset":34,"style":"BOLD"}]},{"type":"atomic","inlineStyleRanges":[],"depth":0,"data":{},"text":" ","entityRanges":[{"key":19,"offset":0,"length":1}],"key":"9m6a4"},{"data":{},"depth":0,"text":"","inlineStyleRanges":[],"entityRanges":[],"key":"ce8ot","type":"unstyled"}],"entityMap":{"0":{"type":"IMAGE","mutability":"MUTABLE","data":{"alignment":"none","alt":"How to open Azure AD PIM","src":"https://i.ibb.co/g47sPD6/Azure-Ad-PIM.png","width":"auto","height":"auto"}},"1":{"mutability":"MUTABLE","data":{"alignment":"none","src":"https://i.ibb.co/mtw4673/PIM-Add-Assignments.png","height":"auto","width":"auto","alt":"Add assignments in PIM"},"type":"IMAGE"},"2":{"type":"IMAGE","data":{"width":"auto","alignment":"none","height":"auto","alt":"Add user assignments in PIM","src":"https://i.ibb.co/MGjzT0Q/add-user-assignments.png"},"mutability":"MUTABLE"},"3":{"data":{"alt":"Activate a PIM role","height":"auto","alignment":"none","width":"auto","src":"https://i.ibb.co/dcb6XFN/Activate-a-Role.png"},"type":"IMAGE","mutability":"MUTABLE"},"4":{"type":"IMAGE","data":{"height":"auto","alt":"additional-verification-click-to-continue","src":"https://i.ibb.co/2d73qCQ/continue.png","width":"auto","alignment":"left"},"mutability":"MUTABLE"},"5":{"data":{"height":"auto","alignment":"none","alt":"Activate a role","width":"auto","src":"https://i.ibb.co/XzvVpkv/activate-role.png"},"mutability":"MUTABLE","type":"IMAGE"},"6":{"type":"IMAGE","mutability":"MUTABLE","data":{"alt":"Azure AD PIM","height":"auto","alignment":"none","width":"auto","src":"https://i.ibb.co/g47sPD6/Azure-Ad-PIM.png"}},"7":{"type":"IMAGE","mutability":"MUTABLE","data":{"height":"auto","src":"https://i.ibb.co/svCt0jy/PIM-assignments.png","width":"auto","alt":"PIM assignments","alignment":"none"}},"8":{"mutability":"MUTABLE","type":"IMAGE","data":{"height":"auto","width":"auto","src":"https://i.ibb.co/t37zJqS/eligible-assignments.png","alt":"Eligible assignements","alignment":"left"}},"9":{"data":{"width":"auto","src":"https://i.ibb.co/7btbR3M/active-pim-assignements.png","alignment":"none","height":"auto","alt":"Active PIM Assignements"},"type":"IMAGE","mutability":"MUTABLE"},"10":{"type":"IMAGE","data":{"alignment":"none","height":"auto","width":"auto","alt":"Azure AD PIM roles","src":"https://i.ibb.co/g47sPD6/Azure-Ad-PIM.png"},"mutability":"MUTABLE"},"11":{"data":{"height":"auto","width":"auto","alignment":"none","src":"https://i.ibb.co/h1KfLY4/PIM-settings.png","alt":"Open PIM settings"},"type":"IMAGE","mutability":"MUTABLE"},"12":{"data":{"alignment":"none","src":"https://i.ibb.co/G55hBDT/edit-PIM-role-assignments.png","alt":"Edit PIM role assignments","height":"auto","width":"auto"},"type":"IMAGE","mutability":"MUTABLE"},"13":{"data":{"alt":"Edit PIM role settings","width":"auto","alignment":"none","height":"auto","src":"https://i.ibb.co/2nWcPxZ/edit-PIM-role-settings.png"},"type":"IMAGE","mutability":"MUTABLE"},"14":{"mutability":"MUTABLE","data":{"alt":"Edit PIM role settings assignments","height":"auto","width":"auto","src":"https://i.ibb.co/1r6Sv3c/edit-PIM-role-settings-assignments.png","alignment":"none"},"type":"IMAGE"},"15":{"type":"IMAGE","mutability":"MUTABLE","data":{"width":"auto","alt":"Edit PIM role assignments","src":"https://i.ibb.co/DkrH6cb/edit-PIM-role-settings-assignments.png","height":"auto","alignment":"left"}},"16":{"type":"IMAGE","mutability":"MUTABLE","data":{"alignment":"none","height":"auto","alt":"Edit role settings notifications","src":"https://i.ibb.co/pJdHDkz/Edit-role-settings-notifications.png","width":"auto"}},"17":{"type":"IMAGE","mutability":"MUTABLE","data":{"alignment":"none","alt":"Approve PIM role assignment email","height":"auto","width":"auto","src":"https://i.ibb.co/C0MtxQc/approve-pim-role-assignment-email.png"}},"18":{"data":{"width":"auto","src":"https://i.ibb.co/6Nrtpt9/approve-pim-role-assignment.png","alt":"Approve the PIM role assignment","height":"auto","alignment":"left"},"type":"IMAGE","mutability":"MUTABLE"},"19":{"type":"IMAGE","data":{"height":"auto","alt":"Approve request justification","src":"https://i.ibb.co/GkpLRJq/approve-request-justification.png","alignment":"none","width":"auto"},"mutability":"MUTABLE"}}},"title":"Just in time, approval and notification for admin roles in Microsoft 365","featuredImage":"https://i.ibb.co/dcb6XFN/Activate-a-Role.png","publish":true,"description":"Just in time privileged access. Microsoft calls this Privileged Identity Management (PIM). With PIM users only have admin roles for a limited time. And before they activate the admin role they can be required to get approval."},
      articles: [{"id":"cpchjBLkC","sectionId":"qwJW5VrBW","slug":"Whats-in-this-course-cpchjBLkC","title":"What's in this course?","featuredImage":"https://i.ibb.co/zFs9Vfb/microsoft365-security-administrator-associate-600x600.png"},{"id":"KKkBOVuS4","sectionId":"qwJW5VrBW","slug":"Creating-a-free-Microsoft-365-tenant-for-practice-KKkBOVuS4","title":"Creating a free Microsoft 365 tenant for practice","featuredImage":"https://i.ibb.co/F07sjQJ/microsoft-365-e5-trial.png"},{"id":"bzotoOjEe","sectionId":"qwJW5VrBW","slug":"Managing-the-Microsoft-365-tenant-Introduction-to-the-admin-centers-bzotoOjEe","title":"Managing the Microsoft 365 tenant - Introduction to the admin centers","featuredImage":"https://i.ibb.co/f1cr4zt/Microsoft-365-admin-centers.png"},{"id":"cg_vxOX9L","sectionId":"qwJW5VrBW","slug":"Managing-Microsoft-365-through-PowerShell-cg_vxOX9L","title":"Managing Microsoft 365 through PowerShell","featuredImage":"https://i.ibb.co/HV13YF6/install-microsoft-365-powershell-modules.png"},{"id":"uYCIPbnMC","sectionId":"AFV_acckJ","slug":"How-to-create-users-in-Microsoft-365-Cloud-Only-uYCIPbnMC","title":"How to create users in Microsoft 365 Cloud Only","featuredImage":"https://i.ibb.co/Wnt5Q43/View-Microsoft-365-Users.png"},{"id":"7CpqFkPZU","sectionId":"AFV_acckJ","slug":"Creating-and-managing-admins-through-roles-7CpqFkPZU","title":"Creating and managing admins through roles","featuredImage":"https://i.ibb.co/kySL4HQ/Roles-and-administrators.png"},{"id":"rZzausKJ1","sectionId":"AFV_acckJ","slug":"Time-limited-admin-roles-in-Microsoft-365-rZzausKJ1","title":"Time limited admin roles in Microsoft 365","featuredImage":"https://i.ibb.co/nDvjyPD/select-member-to-add-to-PIM-role.png"},{"id":"ky5W0Lz5P","sectionId":"AFV_acckJ","slug":"Whats-AD-Connect-ky5W0Lz5P","title":"What's AD Connect","featuredImage":"https://i.ibb.co/7nDqr9x/Whats-AD-Connect.png"},{"id":"i9pJIjTNH","sectionId":"AFV_acckJ","slug":"Protecting-Passwords-in-Microsoft-365-i9pJIjTNH","title":"Protecting Passwords in Microsoft 365","featuredImage":"https://i.ibb.co/DLD4G4q/access-smart-lockout-settings.png"},{"id":"S1hQgFOMV","sectionId":"AFV_acckJ","slug":"Creating-and-managing-users-through-groups-S1hQgFOMV","title":"Creating and managing users through groups","featuredImage":"https://i.ibb.co/nmmC28M/add-a-group-microsoft-365.png"},{"id":"2QfoI2HxY","sectionId":"AFV_acckJ","slug":"Securing-and-implementing-enterprise-applications-2QfoI2HxY","title":"Securing and implementing enterprise applications","featuredImage":"https://i.ibb.co/C2mp69m/disable-user-consent.png"},{"id":"V1en9Iugh","sectionId":"AFV_acckJ","slug":"Whats-a-conditional-access-policy-V1en9Iugh","title":"What's a conditional access policy?","featuredImage":"https://i.ibb.co/DQm1sY0/Create-conditional-access-policy.png"},{"id":"nAAIvNbtk","sectionId":"AFV_acckJ","slug":"The-many-ways-to-implement-multi-factor-authentication-MFA-in-Microsoft-365-nAAIvNbtk","title":"The many ways to implement multi-factor authentication (MFA) in Microsoft 365","featuredImage":"https://i.ibb.co/P1P0wNY/microsoft-365-manage-security-defaults.png"},{"id":"2S9jn0aLr","sectionId":"AFV_acckJ","slug":"Implement-Self-service-password-reset-in-Microsoft-365-2S9jn0aLr","title":"Implement Self-service password reset in Microsoft 365","featuredImage":"https://i.ibb.co/58y9JVg/write-back-passwords-to-on-premises-directory.png"},{"id":"FldNualGC","sectionId":"AFV_acckJ","slug":"Locking-down-your-Microsoft-365-tenant-from-Microsoft-engineers-FldNualGC","title":"Locking down your Microsoft 365 tenant from Microsoft engineers","featuredImage":"https://i.ibb.co/DCmpnT9/Enable-Customer-Lockbox.png"},{"id":"NFQ6rYFeQ","sectionId":"AFV_acckJ","slug":"Implementing-intelligent-security-using-risk-policies-in-Microsoft-365-NFQ6rYFeQ","title":"Implementing intelligent security using risk policies in Microsoft 365","featuredImage":"https://i.ibb.co/0cyQJ7j/Risk-Detections.png"},{"id":"rK48f6iM2","sectionId":"AFV_acckJ","slug":"Automating-Access-Review-in-Microsoft-365-rK48f6iM2","title":"Automating Access Review in Microsoft 365","featuredImage":"https://i.ibb.co/Xsxvz6Z/new-access-review.png"},{"id":"RHW1API2s","sectionId":"AFV_acckJ","slug":"Just-in-time-approval-and-notification-for-admin-roles-in-Microsoft-365-RHW1API2s","title":"Just in time, approval and notification for admin roles in Microsoft 365","featuredImage":"https://i.ibb.co/dcb6XFN/Activate-a-Role.png"},{"id":"z8EMM9Eu_","sectionId":"QScYfSu74","slug":"Whats-Microsoft-365-Defender-z8EMM9Eu_","title":"What's Microsoft 365 Defender?","featuredImage":"https://i.ibb.co/MDMyDQt/Microsoft-Defender.png"},{"id":"Kye_yNLxA","sectionId":"QScYfSu74","slug":"Whats-Microsoft-Defender-for-identity-Kye_yNLxA","title":"What's Microsoft Defender for identity?","featuredImage":"https://i.ibb.co/bQDBh0Y/Defender-for-Identity-Timeline.png"},{"id":"EnPyp7ukN","sectionId":"QScYfSu74","slug":"Whats-Microsoft-Defender-for-Office-365-EnPyp7ukN","title":"What's Microsoft Defender for Office 365?","featuredImage":"https://i.ibb.co/WcwKY2G/Microsoft-365-incidents-and-alerts.png"},{"id":"6HUOr7qbL","sectionId":"QScYfSu74","slug":"Protect-your-email-environment-from-malicious-actors-6HUOr7qbL","title":"Protect your email and Office environment from malicious actors","featuredImage":"https://i.ibb.co/Df0KQVp/Reports.png"},{"id":"GCOOUsSBT","sectionId":"QScYfSu74","slug":"Protecting-email-against-phishing-attacks-GCOOUsSBT","title":"Protecting email against phishing attacks","featuredImage":"https://i.ibb.co/GCjZHWg/edit-actions.png"},{"id":"GG4cMY8pK","sectionId":"QScYfSu74","slug":"Simulating-attacks-with-Microsoft-365-GG4cMY8pK","title":"Simulating attacks with Microsoft 365","featuredImage":"https://i.ibb.co/NyvnbMK/simulation-overview-view-users-circled.png"},{"id":"z0qPG6v4T","sectionId":"QScYfSu74","slug":"Protecting-Windows-10-and-other-devices-with-Microsoft-Defender-for-Endpoint-z0qPG6v4T","title":"Protecting Windows 10 and other devices with Microsoft Defender for Endpoint","featuredImage":"https://i.ibb.co/T47Xhyh/enable-endpoint-connections.png"},{"id":"LEyZMWBSt","sectionId":"QScYfSu74","slug":"Collect-detect-investigate-and-respond-to-security-threats-using-Microsoft-Sentinel-LEyZMWBSt","title":"Collect, detect, investigate, and respond to security threats using Microsoft Sentinel","featuredImage":"https://i.ibb.co/qN9XsKj/Add-Workbook.png"},{"id":"7MQ3wE4wP","sectionId":"QScYfSu74","slug":"Implement-and-manage-Microsoft-Defender-for-Cloud-Apps-7MQ3wE4wP","title":"Implement and manage Microsoft Defender for Cloud Apps","featuredImage":"https://i.ibb.co/7g7LvFg/office-365-cloud-apps-settings.png"},{"id":"sH_Ee1DW1","sectionId":"QScYfSu74","slug":"Auditing-sign-ins-and-other-actions-in-Microsoft-365-sH_Ee1DW1","title":"Auditing sign-ins and other actions in Microsoft 365","featuredImage":"https://i.ibb.co/BqMw3jZ/Start-recording-user-and-admin-activity.png"},{"id":"vLweLmxZf","sectionId":"YhftdGIRX","slug":"How-to-classify-data-using-labels-in-Microsoft-365-vLweLmxZf","title":"How to classify data using labels in Microsoft 365","featuredImage":"https://i.ibb.co/k9nhWS5/Choose-protection-settings-for-files-and-emails.png"},{"id":"NsF7No40f","sectionId":"YhftdGIRX","slug":"Creating-and-managing-data-retention-to-conform-to-compliance-NsF7No40f","title":"Creating and managing data retention to conform to compliance","featuredImage":"https://i.ibb.co/yqC0ZdY/New-Retention-Policy.png"},{"id":"IsPGsme8w","sectionId":"YhftdGIRX","slug":"Preventing-accidental-and-malicious-data-loss-with-DLP-policies-IsPGsme8w","title":"Preventing accidental and malicious data loss with DLP policies","featuredImage":"https://i.ibb.co/n8WcqKM/Create-a-DLP-policy.png"},{"id":"wv2PbXnhI","sectionId":"YhftdGIRX","slug":"Everything-you-need-to-know-about-securing-SharePoint-Online-for-the-MS-500-wv2PbXnhI","title":"Everything you need to know about securing SharePoint Online for the MS-500","featuredImage":"https://i.ibb.co/Gk9NjSH/Share-Point-Online-Warning.png"},{"id":"7gR3L122b","sectionId":"l0DxUuonW","slug":"Introduction-to-Intune-7gR3L122b","title":"Introduction to Intune","featuredImage":"https://i.ibb.co/Fq3N8BX/Endpoint-Manager-Admin-Center.png"},{"id":"ZyKX3Idjs","sectionId":"l0DxUuonW","slug":"Setting-up-Android-Devices-ZyKX3Idjs","title":"Setting up Android Devices","featuredImage":"https://i.ibb.co/m0BYhL2/Connect-Intune-to-Google-Play.png"},{"id":"MAjW0a2_p","sectionId":"l0DxUuonW","slug":"Setting-up-Apple--iOS-devices-in-Intune-MAjW0a2_p","title":"Setting up Apple / iOS devices in Intune","featuredImage":"https://i.ibb.co/X7Ffb2B/Setup-Apple-Enrollment-in-Intune.png"},{"id":"XFXu2zIS9","sectionId":"l0DxUuonW","slug":"Setting-up-Windows-10-devices-in-Intune-XFXu2zIS9","title":"Setting up Windows 10 devices in Intune","featuredImage":"https://i.ibb.co/WDXKVjW/configure-device-options.png"},{"id":"_LL9VqGZO","sectionId":"l0DxUuonW","slug":"How-to-manage-devices-using-Intune-_LL9VqGZO","title":"How to manage devices using Intune","featuredImage":"https://i.ibb.co/HPQ2m8t/Create-an-endpoint-protection-profile.png"},{"id":"qDRA4jjoN","sectionId":"l0DxUuonW","slug":"Understanding-compliance-policies-qDRA4jjoN","title":"Understanding compliance policies","featuredImage":"https://i.ibb.co/N3Qk57v/Create-a-compliance-policy.png"},{"id":"62t_7oiZx","sectionId":"l0DxUuonW","slug":"Restricting-and-managing-apps-on-user-devices-62t_7oiZx","title":"Restricting and managing apps on user devices","featuredImage":"https://i.ibb.co/PCVRKDf/Add-an-Android-app-to-Intune.png"}],
      articleHtml: `<p>Up until now, we've worked with permanent admin role assignments. Essentially, the user account is an admin until the user account is removed from the admin role. But there's another option. Just in time privileged access. Microsoft calls this Privileged Identity Management (PIM). With PIM users only have admin roles for a limited time. And before they activate the admin role they can be required to get approval.</p>
<h2>Licenses required</h2>
<p>First things first. What licenses are required to use privileged identity management? You'll need an Azure AD Premium P2 license. It's also included in the Enterprise Mobility + Security (EMS) E5 license.</p>
<h2>Assign a role</h2>
<p>Now let's assign a role using PIM. By default, the role can only be active for 8 hours. So let's give a user a permanent role assignment.</p>
<p>1. Go to <strong>Azure Active Directory admin center</strong> &gt; <strong>All services</strong> &gt; <strong>Azure AD Privileged Identity Management</strong>.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/g47sPD6/Azure-Ad-PIM.png" alt="How to open Azure AD PIM" style="height: auto;width: auto"/></div>
<p>2. Click <strong>Azure AD roles</strong> &gt; <strong>Assignments</strong> &gt; <strong>Add assignments</strong>.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/mtw4673/PIM-Add-Assignments.png" alt="Add assignments in PIM" style="height: auto;width: auto"/></div>
<p>3. Under <strong>Select role</strong> select <strong>Global Administrator</strong>. Click <strong>No member selected</strong>. Select the <strong>user </strong>you want to add. Click <strong>Select</strong>. Click <strong>Next</strong>.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/MGjzT0Q/add-user-assignments.png" alt="Add user assignments in PIM" style="height: auto;width: auto"/></div>
<p>4. Click <strong>Assign</strong>.</p>
<h2>How to activate a role assignment</h2>
<p>Once you assign a user as an eligible role the user will receive the following email:</p>
<div style="text-align:none;"><img src="https://i.ibb.co/dcb6XFN/Activate-a-Role.png" alt="Activate a PIM role" style="height: auto;width: auto"/></div>
<p>1. Click <strong>View or activate role</strong>.</p>
<p>2. Click <strong>Activate</strong>.</p>
<p>3. If additional verification is required click <strong>continue</strong>. Finish the authentication.</p>
<div style="text-align:left;"><img src="https://i.ibb.co/2d73qCQ/continue.png" alt="additional-verification-click-to-continue" style="height: auto;width: auto"/></div>
<p>4. Set a <strong>reason</strong>. Click <strong>Activate</strong>.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/XzvVpkv/activate-role.png" alt="Activate a role" style="height: auto;width: auto"/></div>
<h2>Review role assignments</h2>
<p>As an admin, you may need to review who's assigned what roles. Let's take a look.</p>
<p>1. <span style="color: rgb(33,37,41);background-color: rgb(255,255,255);font-size: 16px;font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;">Go to <strong>Azure Active Directory admin center</strong> &gt; <strong>All services</strong> &gt; <strong>Azure AD Privileged Identity Management</strong>.</span></p>
<div style="text-align:none;"><img src="https://i.ibb.co/g47sPD6/Azure-Ad-PIM.png" alt="Azure AD PIM" style="height: auto;width: auto"/></div>
<p>2. Click <strong>Azure AD roles</strong> &gt; <strong>Assignments</strong>.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/svCt0jy/PIM-assignments.png" alt="PIM assignments" style="height: auto;width: auto"/></div>
<p>Under eligible assignments, you'll see the user you added. These users have a role assigned through PIM that needs to be activated.</p>
<div style="text-align:left;"><img src="https://i.ibb.co/t37zJqS/eligible-assignments.png" alt="Eligible assignements" style="height: auto;width: auto"/></div>
<p>Click <strong>Active assignments</strong>. These users currently have roles. If you look under state you'll see two different states: "Assigned" and "Active". Assigned users have the role assigned to them permanently. They'll always have admin rights. Activated roles show users that are eligible for assignment and have activated the role.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/7btbR3M/active-pim-assignements.png" alt="Active PIM Assignements" style="height: auto;width: auto"/></div>
<h2>Update Settings</h2>
<p>So now we've configured a user and we know how they can activate the admin role. But we've got a problem. The activation should only be 1 hour and another admin needs to approve the activation before the role is activated. Next, we'll disable the permanent assignment of the role. Finally, we'll make sure an admin is notified when the PIM role is activated.</p>
<p><span style="color: rgb(33,37,41);background-color: rgb(255,255,255);font-size: 16px;font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;">1. Go to <strong>Azure Active Directory admin center</strong> &gt; <strong>All services</strong> &gt; <strong>Azure AD Privileged Identity Management</strong>.</span></p>
<div style="text-align:none;"><img src="https://i.ibb.co/g47sPD6/Azure-Ad-PIM.png" alt="Azure AD PIM roles" style="height: auto;width: auto"/></div>
<p>2. Click <strong>Azure AD roles </strong>&gt; <strong>Assignments</strong> &gt; <strong>Settings</strong>.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/h1KfLY4/PIM-settings.png" alt="Open PIM settings" style="height: auto;width: auto"/></div>
<p>3. Click <strong>Application Administrator</strong> &gt; <strong>Edit</strong>.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/G55hBDT/edit-PIM-role-assignments.png" alt="Edit PIM role assignments" style="height: auto;width: auto"/></div>
<p>4. Set the <strong>Activation maximum duration (hours) </strong>to <strong>1</strong>. Click <strong>Require approval to activate</strong>. Click <strong>No approver selected</strong>. <strong>Select</strong> the <strong>admin</strong> to approve. Click <strong>Select</strong>. Click <strong>Next: Assignment</strong>.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/2nWcPxZ/edit-PIM-role-settings.png" alt="Edit PIM role settings" style="height: auto;width: auto"/></div>
<p>5. Uncheck <strong>Allow permanent active assignment</strong>. Click <strong>Next: Notification</strong>.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/1r6Sv3c/edit-PIM-role-settings-assignments.png" alt="Edit PIM role settings assignments" style="height: auto;width: auto"/></div>
<p>6. <div style="text-align:left;"><img src="https://i.ibb.co/DkrH6cb/edit-PIM-role-settings-assignments.png" alt="Edit PIM role assignments" style="height: auto;width: auto"/></div>Set an <strong>email address</strong> in the <strong>Role activation alert additional recipients</strong>. Click <strong>Update</strong>.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/pJdHDkz/Edit-role-settings-notifications.png" alt="Edit role settings notifications" style="height: auto;width: auto"/></div>
<h2>Who can approve the admin role assignment?</h2>
<p>Only global administrators and privileged role administrators can approve the admin role assignments. Let's try it now. Walk through the "Assign a role" steps above but this time grant someone the application administrator role. Then login with the user you made eligible for the role and activate the role following the "How to activate a role assignment steps above".</p>
<h2>How to approve activation of a role</h2>
<p>1. Once a user requests a role the approver will receive an email with the subject "PIM: Review User's request to activate the Application Administrator role". In that email, click <strong>Approve or deny request</strong>.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/C0MtxQc/approve-pim-role-assignment-email.png" alt="Approve PIM role assignment email" style="height: auto;width: auto"/></div>
<p>2. <strong>Review </strong>the <strong>request</strong> then click the <strong>checkbox </strong>next to the role. Click <strong>Approve</strong>.</p>
<div style="text-align:left;"><img src="https://i.ibb.co/6Nrtpt9/approve-pim-role-assignment.png" alt="Approve the PIM role assignment" style="height: auto;width: auto"/></div>
<p>3. Give a <strong>justification</strong> and click <strong>Confirm</strong>.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/GkpLRJq/approve-request-justification.png" alt="Approve request justification" style="height: auto;width: auto"/></div>
<p></p>
`,
      nextContentSlug: 'Whats-Microsoft-365-Defender-z8EMM9Eu_',
      previousContentSlug: 'Automating-Access-Review-in-Microsoft-365-rK48f6iM2',
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
