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
      article: {"article":{"blocks":[{"key":"5s8pf","data":{},"entityRanges":[],"inlineStyleRanges":[],"type":"unstyled","depth":0,"text":"So, you're set up with SharePoint. Users are accessing SharePoint and everything is going great but now there's a security concern. Everything use to sit on file shares inside your network. The network was secured so you didn't have to worry about your files too much. But that's not the case with SharePoint Online. With SharePoint Online, files can be accessed from anywhere at any time. Files can also be synced to your users' devices (including personal devices). Those devices can get lost, stolen, or hacked. So now we have a big issue. But have no fear, Microsoft is here! There are a ton of ways to secure your SharePoint files. You can limit what users can do. Who can share files. You can limit where the files can be accessed (including IP addresses or countries). You can even limit SharePoint access based on your managed devices! That's right, you can set up SharePoint so only authorized users using authorized devices can access your SharePoint files."},{"entityRanges":[],"inlineStyleRanges":[],"text":"Restrict external user access to your SharePoint tenant","type":"header-two","depth":0,"data":{},"key":"79ohv"},{"data":{},"text":"The first way you'll need to secure your SharePoint tenant is with who users can share files. By default, users can share their SharePoint files with anyone. They can set up a sharing link that doesn't require a password. If that link is accidentally shared with someone that it isn't supposed to be, that person can access your SharePoint files. So how do we limit sharing?","key":"3mbko","entityRanges":[],"inlineStyleRanges":[],"depth":0,"type":"unstyled"},{"text":"1. Open the SharePoint admin center > Policies > Sharing","inlineStyleRanges":[],"data":{},"depth":0,"key":"a6kdf","entityRanges":[],"type":"unstyled"},{"key":"e36pc","type":"unstyled","inlineStyleRanges":[],"data":{},"depth":0,"entityRanges":[],"text":"2. Drag the sliders under Content can be shared with to the appropriate level."},{"entityRanges":[],"key":"c0lte","data":{},"inlineStyleRanges":[{"length":4,"style":"BOLD","offset":46}],"type":"unstyled","depth":0,"text":"3. Scroll to the bottom of the page and click Save."},{"entityRanges":[{"length":1,"key":0,"offset":0}],"inlineStyleRanges":[],"text":" ","key":"7d949","depth":0,"data":{},"type":"atomic"},{"depth":0,"entityRanges":[],"type":"unstyled","inlineStyleRanges":[],"text":"From this page, you can edit the SharePoint and OneDrive sharing permissions. You can configure it to allow users to only share documents with internal users or keep it so users can share with anyone.","data":{},"key":"4jhhf"},{"depth":0,"key":"fgvi","data":{},"text":"Limit Sharing by domain","entityRanges":[],"inlineStyleRanges":[],"type":"header-three"},{"key":"516nf","type":"unstyled","depth":0,"text":"So let's say a question on the MS-500 you may see is \"How do you limit external sharing with only people in contoso.com?\" Well, it's pretty easy.","inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"ecnav","data":{},"text":"1. Open the SharePoint admin center > Policies > Sharing ","depth":0,"type":"unstyled","entityRanges":[{"offset":12,"key":1,"length":44}],"inlineStyleRanges":[]},{"text":"2. Click More external sharing settings > Limit external sharing by domain > Add domains.","entityRanges":[],"type":"unstyled","depth":0,"key":"7i26p","data":{},"inlineStyleRanges":[{"offset":9,"length":30,"style":"BOLD"},{"length":32,"offset":42,"style":"BOLD"},{"length":11,"offset":77,"style":"BOLD"}]},{"entityRanges":[],"text":"5. Click Allow only specific domains. Then enter the domain you want to be able to access your SharePoint tenant.","inlineStyleRanges":[{"length":27,"offset":9,"style":"BOLD"}],"type":"unstyled","depth":0,"data":{},"key":"745it"},{"entityRanges":[],"key":"4nkok","inlineStyleRanges":[{"style":"BOLD","offset":9,"length":4}],"depth":0,"type":"unstyled","data":{},"text":"6. Click Save"},{"data":{},"entityRanges":[{"offset":0,"key":2,"length":1}],"key":"1uc9r","type":"atomic","depth":0,"text":" ","inlineStyleRanges":[]},{"key":"b0j95","depth":0,"text":"7. Then scroll to the bottom of the page and click Save.","inlineStyleRanges":[{"length":4,"style":"BOLD","offset":51}],"type":"unstyled","data":{},"entityRanges":[]},{"entityRanges":[],"text":"Restricting downloading, printing, and syncing from unmanaged devices","data":{},"inlineStyleRanges":[],"depth":0,"key":"4p3ff","type":"header-two"},{"depth":0,"data":{},"type":"unstyled","key":"e93h6","entityRanges":[],"inlineStyleRanges":[],"text":"Okay, so now sharing is secured and users can only share with specific domains. But users can still access all the files across SharePoint and OneDrive from any device. A user may accidentally go to a shared computer, for example, at a library, and sync your company's files to the shared computer. Uh-oh. How do you prevent users from downloading, printing, and syncing files to unmanaged devices? Well, there are two ways to set it up: from the browser or PowerShell."},{"key":"8ebmn","text":"1. Go to the SharePoint admin center > Policies > Access Control","depth":0,"type":"unstyled","entityRanges":[{"offset":13,"length":51,"key":3}],"data":{},"inlineStyleRanges":[]},{"inlineStyleRanges":[{"offset":9,"style":"BOLD","length":30},{"offset":52,"style":"BOLD","length":4}],"text":"2. Click Allow limited, web-only access. Then click Save.","entityRanges":[],"data":{},"type":"unstyled","depth":0,"key":"8uca7"},{"text":" ","entityRanges":[{"offset":0,"key":4,"length":1}],"type":"atomic","inlineStyleRanges":[],"depth":0,"data":{},"key":"75qur"},{"text":"We can also make this change from PowerShell.","type":"unstyled","inlineStyleRanges":[],"key":"6qlu","entityRanges":[],"data":{},"depth":0},{"entityRanges":[],"text":"1. Connect to SharePoint Online using Connect-SPOService.","depth":0,"inlineStyleRanges":[],"data":{},"type":"unstyled","key":"73k81"},{"inlineStyleRanges":[{"length":57,"style":"BOLD","offset":30}],"key":"art49","type":"unstyled","depth":0,"entityRanges":[],"data":{},"text":"2. Run the following command: Set-SPOTenant -ConditionalAccessPolicy AllowLimitedAccess"},{"entityRanges":[{"key":5,"length":1,"offset":0}],"data":{},"inlineStyleRanges":[],"depth":0,"text":" ","type":"atomic","key":"irqg"},{"data":{},"inlineStyleRanges":[{"style":"color-rgb(33,37,41)","offset":0,"length":69},{"style":"bgcolor-rgb(255,255,255)","offset":0,"length":69},{"style":"fontsize-32","offset":0,"length":69},{"length":69,"style":"fontfamily-system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", \"Liberation Sans\", sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji","offset":0}],"depth":0,"text":"Restricting downloading, printing, and syncing from unmanaged devices per site","key":"416jg","type":"header-two","entityRanges":[]},{"entityRanges":[],"type":"unstyled","inlineStyleRanges":[],"text":"Okay, maybe you don't need to limit downloading, printing, and syncing from all your tenants. Maybe there are a couple of SharePoint sites that do need to be limited though. What do you do? First, you need to enable app-enforced restrictions on your SharePoint tenant. Then configure the site to require a managed device.","data":{},"key":"enqsl","depth":0},{"entityRanges":[],"key":"89r3g","type":"header-three","inlineStyleRanges":[],"data":{},"depth":0,"text":"Enable app enforced restrictions on the tenant"},{"data":{},"entityRanges":[],"inlineStyleRanges":[],"text":" Before we go enabling it, let's talk about what it does. The app-enforced conditional access policy will require Azure AD to pass the device information to the app that you are connecting to. So, in short, SharePoint Online will know if you're on a compliant device or not when you connect. Without further ado, let's set up the conditional access policy.","type":"unstyled","key":"8pntf","depth":0},{"key":"2s310","type":"unstyled","entityRanges":[{"key":6,"length":85,"offset":9}],"depth":0,"text":"1. Go to https://aad.portal.azure.com/#blade/Microsoft_AAD_IAM/ConditionalAccessBlade/Policies and log in with your admin credentials.","inlineStyleRanges":[],"data":{}},{"key":"84ico","data":{},"type":"unstyled","entityRanges":[],"depth":0,"inlineStyleRanges":[{"style":"BOLD","offset":9,"length":10}],"text":"2. Click New policy."},{"key":"7beh2","data":{},"depth":0,"entityRanges":[{"offset":0,"key":7,"length":1}],"text":" ","type":"atomic","inlineStyleRanges":[]},{"inlineStyleRanges":[{"length":25,"style":"BOLD","offset":28}],"data":{},"type":"unstyled","depth":0,"key":"fs971","entityRanges":[],"text":"3. Set a name, for example, app enforced restrictions."},{"text":"4. Click 0 users and groups > All users.","key":"fv1t4","entityRanges":[],"inlineStyleRanges":[{"length":18,"offset":9,"style":"BOLD"},{"length":9,"style":"BOLD","offset":30}],"depth":0,"data":{},"type":"unstyled"},{"type":"atomic","inlineStyleRanges":[],"depth":0,"text":" ","entityRanges":[{"offset":0,"length":1,"key":8}],"key":"dgk2r","data":{}},{"inlineStyleRanges":[{"offset":9,"style":"BOLD","length":59},{"style":"BOLD","length":11,"offset":71},{"length":11,"style":"BOLD","offset":90},{"length":28,"style":"BOLD","offset":127},{"offset":158,"length":6,"style":"BOLD"}],"text":"5. Click No cloud apps, actions, or authentication contexts selected > Select apps > Type SharePoint in the search box > Click Office 365 SharePoint Online > Select.","key":"5rft2","data":{},"depth":0,"entityRanges":[],"type":"unstyled"},{"data":{},"depth":0,"inlineStyleRanges":[],"entityRanges":[{"length":1,"offset":0,"key":9}],"key":"94r6e","text":" ","type":"atomic"},{"key":"1bla6","entityRanges":[],"data":{},"depth":0,"inlineStyleRanges":[{"style":"BOLD","length":21,"offset":9},{"length":14,"offset":33,"style":"BOLD"},{"style":"BOLD","length":3,"offset":69},{"style":"BOLD","length":4,"offset":93}],"text":"6. Click 0 conditions selected > Not configured (under Click apps) > Yes (under Configure) > Done.","type":"unstyled"},{"inlineStyleRanges":[],"depth":0,"type":"atomic","text":" ","data":{},"entityRanges":[{"offset":0,"length":1,"key":10}],"key":"1jtfg"},{"type":"unstyled","key":"8iubm","text":"7. Click 0 controls selected (under session) > Use app enforced restrictions > Select > On (Under Enable policy) > Create.","depth":0,"entityRanges":[],"data":{},"inlineStyleRanges":[{"style":"BOLD","length":19,"offset":9},{"style":"BOLD","length":29,"offset":47},{"style":"BOLD","length":6,"offset":79},{"style":"BOLD","offset":88,"length":3},{"style":"BOLD","offset":115,"length":6}]},{"key":"ca7pr","data":{},"inlineStyleRanges":[],"text":" ","entityRanges":[{"key":11,"length":1,"offset":0}],"depth":0,"type":"atomic"},{"data":{},"type":"unstyled","depth":0,"key":"8mbam","inlineStyleRanges":[],"entityRanges":[],"text":"That's it. Now we can configure the SharePoint Online sites that we want to limit "},{"entityRanges":[],"text":"Restricting access from unmanaged devices per site","inlineStyleRanges":[],"data":{},"key":"drcvb","depth":0,"type":"header-three"},{"depth":0,"inlineStyleRanges":[],"entityRanges":[],"key":"f18lh","text":"Perform the following steps on every SharePoint site you want to limit access to:","type":"unstyled","data":{}},{"key":"9eakb","inlineStyleRanges":[],"data":{},"text":"1. Open PowerShell and run Connect-SPOService -URL <Your SharePoint Admin URL>","depth":0,"type":"unstyled","entityRanges":[]},{"data":{},"entityRanges":[],"depth":0,"type":"unstyled","key":"bi02v","text":"2. Run Set-SPOTSite -Identity <The SharePoint site URL you want to protect> -ConditionalAccessPolicy AllowLimitedAccess","inlineStyleRanges":[]},{"inlineStyleRanges":[],"type":"atomic","entityRanges":[{"offset":0,"key":12,"length":1}],"data":{},"key":"ecr2h","depth":0,"text":" "},{"type":"unstyled","entityRanges":[],"key":"cp6vi","depth":0,"text":"That's it. The site is now protected from downloading, syncing, or printing from unmanaged devices.","inlineStyleRanges":[],"data":{}}],"entityMap":{"0":{"mutability":"MUTABLE","data":{"alignment":"none","targetOption":"_blank","width":"auto","url":"https://admin.microsoft.com/sharepoint?#/sharing","src":"https://i.ibb.co/ByQTp6G/Share-Point-Sharing-Least-Permissive.png","alt":"SharePoint sharing permissions set to least permissive","height":"auto"},"type":"IMAGE"},"1":{"mutability":"MUTABLE","data":{"alt":"SharePoint sharing permissions set to least permissive","alignment":"left","height":"auto","targetOption":"_blank","width":"auto","url":"https://admin.microsoft.com/sharepoint?#/sharing","src":"https://i.ibb.co/ByQTp6G/Share-Point-Sharing-Least-Permissive.png"},"type":"LINK"},"2":{"type":"IMAGE","mutability":"MUTABLE","data":{"alignment":"none","height":"auto","targetOption":"_blank","width":"auto","src":"https://i.ibb.co/S6Lbk8G/limit-external-sharing.png","alt":"Limit external sharing by domains in SharePoint Online","url":"https://admin.microsoft.com/Adminportal/Home?source=applauncher#/alladmincenters"}},"3":{"type":"LINK","mutability":"MUTABLE","data":{"src":"https://i.ibb.co/zFF9rZ6/limit-sharepoing-access-from-unmanaged-devices.png","alignment":"left","url":"https://admin.microsoft.com/sharepoint#/accessControl","width":"auto","height":"auto","alt":"limit SharePoint access from unmanaged devices","targetOption":"_blank"}},"4":{"type":"IMAGE","mutability":"MUTABLE","data":{"height":"auto","alt":"limit SharePoint access from unmanaged devices","src":"https://i.ibb.co/zFF9rZ6/limit-sharepoing-access-from-unmanaged-devices.png","width":"auto","url":"https://admin.microsoft.com/Adminportal/Home?source=applauncher#/alladmincenters","alignment":"none","targetOption":"_blank"}},"5":{"data":{"alignment":"none","targetOption":"_blank","height":"auto","width":"auto","alt":"C:\\Users\\john.gruber\\Downloads\\Set-SPOTenant -ConditionalAccessPolicy AllowLimitedAccess.png","url":"https://admin.microsoft.com/Adminportal/Home?source=applauncher#/alladmincenters","src":"https://i.ibb.co/fCGqR18/Set-SPOTenant-Conditional-Access-Policy-Allow-Limited-Access.png"},"type":"IMAGE","mutability":"MUTABLE"},"6":{"type":"LINK","mutability":"MUTABLE","data":{"alignment":"left","src":"https://i.ibb.co/W24gxYh/sharepoint-classic-settings-page.png","height":"auto","width":"auto","targetOption":"_blank","url":"https://aad.portal.azure.com/#blade/Microsoft_AAD_IAM/ConditionalAccessBlade/Policies","alt":"open SharePoint classic settings page"}},"7":{"data":{"height":"auto","alt":"New Conditional Access Policy","targetOption":"_blank","alignment":"none","src":"https://i.ibb.co/FDdCB72/new-conditional-access-policy.png","width":"auto","url":"https://admin.microsoft.com/Adminportal/Home?source=applauncher#/alladmincenters"},"type":"IMAGE","mutability":"MUTABLE"},"8":{"mutability":"MUTABLE","data":{"height":"auto","alignment":"none","url":"https://admin.microsoft.com/Adminportal/Home?source=applauncher#/alladmincenters","src":"https://i.ibb.co/QMPJ6W0/Set-conditional-access-policy-to-all-users.png","targetOption":"_blank","alt":"Set conditional access policy to all users","width":"auto"},"type":"IMAGE"},"9":{"data":{"alignment":"none","src":"https://i.ibb.co/582XPDq/conditional-access-policy-cloud-app-sharepoint-online.png","targetOption":"_blank","url":"https://admin.microsoft.com/Adminportal/Home?source=applauncher#/alladmincenters","alt":"C:\\Users\\john.gruber\\Downloads\\conditional access policy cloud app SharePoint online","width":"auto","height":"auto"},"mutability":"MUTABLE","type":"IMAGE"},"10":{"data":{"alt":"conditional access policy client apps all","url":"https://admin.microsoft.com/Adminportal/Home?source=applauncher#/alladmincenters","height":"auto","targetOption":"_blank","alignment":"none","width":"auto","src":"https://i.ibb.co/1LBgC3q/conditional-access-policy-client-apps-all.png"},"type":"IMAGE","mutability":"MUTABLE"},"11":{"type":"IMAGE","mutability":"MUTABLE","data":{"src":"https://i.ibb.co/kSxBLz5/conditional-access-policy-use-app-enforced-restrictions.png","alignment":"none","width":"auto","alt":"conditional access policy use app enforced restrictions","targetOption":"_blank","height":"auto","url":"https://admin.microsoft.com/Adminportal/Home?source=applauncher#/alladmincenters"}},"12":{"type":"IMAGE","mutability":"MUTABLE","data":{"url":"https://admin.microsoft.com/Adminportal/Home?source=applauncher#/alladmincenters","alt":"Limit access to SharePoint site","targetOption":"_blank","alignment":"none","height":"auto","src":"https://i.ibb.co/Kh61mvM/limit-access-to-sharepoint-site.png","width":"auto"}},"13":{"type":"LINK","mutability":"MUTABLE","data":{"src":"https://i.ibb.co/W24gxYh/sharepoint-classic-settings-page.png","width":"auto","targetOption":"_blank","alt":"open SharePoint classic settings page","height":"auto","alignment":"left","url":"https://admin.microsoft.com/Adminportal/Home?source=applauncher#/alladmincenters"}},"14":{"mutability":"MUTABLE","data":{"height":"auto","alignment":"left","alt":"open SharePoint classic settings page","src":"https://i.ibb.co/W24gxYh/sharepoint-classic-settings-page.png","width":"auto"},"type":"IMAGE"},"15":{"mutability":"MUTABLE","data":{"width":"auto","src":"https://i.ibb.co/9WDnpFM/enable-irm-in-sharepoint-tenant.png","height":"auto","alignment":"left","alt":"Enable IRM in SharePoint tenant"},"type":"IMAGE"}}},"publish":true,"slug":"Everything-you-need-to-know-about-securing-SharePoint-Online-for-the-MS-500-wv2PbXnhI","description":"How to Secure SharePoint Online to prepare for the MS-500","images":["https://i.ibb.co/W24gxYh/sharepoint-classic-settings-page.png","https://i.ibb.co/W24gxYh/sharepoint-classic-settings-page.png","https://i.ibb.co/9WDnpFM/enable-irm-in-sharepoint-tenant.png","https://i.ibb.co/S6Lbk8G/limit-external-sharing.png","https://i.ibb.co/ByQTp6G/Share-Point-Sharing-Least-Permissive.png","https://i.ibb.co/zFF9rZ6/limit-sharepoing-access-from-unmanaged-devices.png","https://i.ibb.co/fCGqR18/Set-SPOTenant-Conditional-Access-Policy-Allow-Limited-Access.png","https://i.ibb.co/FDdCB72/new-conditional-access-policy.png","https://i.ibb.co/QMPJ6W0/Set-conditional-access-policy-to-all-users.png","https://i.ibb.co/582XPDq/conditional-access-policy-cloud-app-sharepoint-online.png","https://i.ibb.co/1LBgC3q/conditional-access-policy-client-apps-all.png","https://i.ibb.co/1LBgC3q/conditional-access-policy-client-apps-all.png","https://i.ibb.co/1LBgC3q/conditional-access-policy-client-apps-all.png","https://i.ibb.co/kSxBLz5/conditional-access-policy-use-app-enforced-restrictions.png","https://i.ibb.co/Kh61mvM/limit-access-to-sharepoint-site.png","https://i.ibb.co/Gk9NjSH/Share-Point-Online-Warning.png"],"featuredImage":"https://i.ibb.co/Gk9NjSH/Share-Point-Online-Warning.png","datePublished":"2022/5/26","title":"Everything you need to know about securing SharePoint Online for the MS-500","type":"article","id":"wv2PbXnhI","sectionId":"YhftdGIRX"},
      articles: [{"id":"cpchjBLkC","sectionId":"qwJW5VrBW","slug":"Whats-in-this-course-cpchjBLkC","title":"What's in this course?","featuredImage":"https://i.ibb.co/zFs9Vfb/microsoft365-security-administrator-associate-600x600.png"},{"id":"KKkBOVuS4","sectionId":"qwJW5VrBW","slug":"Creating-a-free-Microsoft-365-tenant-for-practice-KKkBOVuS4","title":"Creating a free Microsoft 365 tenant for practice","featuredImage":"https://i.ibb.co/F07sjQJ/microsoft-365-e5-trial.png"},{"id":"bzotoOjEe","sectionId":"qwJW5VrBW","slug":"Managing-the-Microsoft-365-tenant-Introduction-to-the-admin-centers-bzotoOjEe","title":"Managing the Microsoft 365 tenant - Introduction to the admin centers","featuredImage":"https://i.ibb.co/f1cr4zt/Microsoft-365-admin-centers.png"},{"id":"cg_vxOX9L","sectionId":"qwJW5VrBW","slug":"Managing-Microsoft-365-through-PowerShell-cg_vxOX9L","title":"Managing Microsoft 365 through PowerShell","featuredImage":"https://i.ibb.co/HV13YF6/install-microsoft-365-powershell-modules.png"},{"id":"uYCIPbnMC","sectionId":"AFV_acckJ","slug":"How-to-create-users-in-Microsoft-365-Cloud-Only-uYCIPbnMC","title":"How to create users in Microsoft 365 Cloud Only","featuredImage":"https://i.ibb.co/Wnt5Q43/View-Microsoft-365-Users.png"},{"id":"7CpqFkPZU","sectionId":"AFV_acckJ","slug":"Creating-and-managing-admins-through-roles-7CpqFkPZU","title":"Creating and managing admins through roles","featuredImage":"https://i.ibb.co/kySL4HQ/Roles-and-administrators.png"},{"id":"rZzausKJ1","sectionId":"AFV_acckJ","slug":"Time-limited-admin-roles-in-Microsoft-365-rZzausKJ1","title":"Time limited admin roles in Microsoft 365","featuredImage":"https://i.ibb.co/nDvjyPD/select-member-to-add-to-PIM-role.png"},{"id":"ky5W0Lz5P","sectionId":"AFV_acckJ","slug":"Whats-AD-Connect-ky5W0Lz5P","title":"What's AD Connect","featuredImage":"https://i.ibb.co/7nDqr9x/Whats-AD-Connect.png"},{"id":"i9pJIjTNH","sectionId":"AFV_acckJ","slug":"Protecting-Passwords-in-Microsoft-365-i9pJIjTNH","title":"Protecting Passwords in Microsoft 365","featuredImage":"https://i.ibb.co/DLD4G4q/access-smart-lockout-settings.png"},{"id":"S1hQgFOMV","sectionId":"AFV_acckJ","slug":"Creating-and-managing-users-through-groups-S1hQgFOMV","title":"Creating and managing users through groups","featuredImage":"https://i.ibb.co/nmmC28M/add-a-group-microsoft-365.png"},{"id":"2QfoI2HxY","sectionId":"AFV_acckJ","slug":"Securing-and-implementing-enterprise-applications-2QfoI2HxY","title":"Securing and implementing enterprise applications","featuredImage":"https://i.ibb.co/C2mp69m/disable-user-consent.png"},{"id":"V1en9Iugh","sectionId":"AFV_acckJ","slug":"Whats-a-conditional-access-policy-V1en9Iugh","title":"What's a conditional access policy?","featuredImage":"https://i.ibb.co/DQm1sY0/Create-conditional-access-policy.png"},{"id":"nAAIvNbtk","sectionId":"AFV_acckJ","slug":"The-many-ways-to-implement-multi-factor-authentication-MFA-in-Microsoft-365-nAAIvNbtk","title":"The many ways to implement multi-factor authentication (MFA) in Microsoft 365","featuredImage":"https://i.ibb.co/P1P0wNY/microsoft-365-manage-security-defaults.png"},{"id":"2S9jn0aLr","sectionId":"AFV_acckJ","slug":"Implement-Self-service-password-reset-in-Microsoft-365-2S9jn0aLr","title":"Implement Self-service password reset in Microsoft 365","featuredImage":"https://i.ibb.co/58y9JVg/write-back-passwords-to-on-premises-directory.png"},{"id":"FldNualGC","sectionId":"AFV_acckJ","slug":"Locking-down-your-Microsoft-365-tenant-from-Microsoft-engineers-FldNualGC","title":"Locking down your Microsoft 365 tenant from Microsoft engineers","featuredImage":"https://i.ibb.co/DCmpnT9/Enable-Customer-Lockbox.png"},{"id":"NFQ6rYFeQ","sectionId":"AFV_acckJ","slug":"Implementing-intelligent-security-using-risk-policies-in-Microsoft-365-NFQ6rYFeQ","title":"Implementing intelligent security using risk policies in Microsoft 365","featuredImage":"https://i.ibb.co/0cyQJ7j/Risk-Detections.png"},{"id":"rK48f6iM2","sectionId":"AFV_acckJ","slug":"Automating-Access-Review-in-Microsoft-365-rK48f6iM2","title":"Automating Access Review in Microsoft 365","featuredImage":"https://i.ibb.co/Xsxvz6Z/new-access-review.png"},{"id":"RHW1API2s","sectionId":"AFV_acckJ","slug":"Just-in-time-approval-and-notification-for-admin-roles-in-Microsoft-365-RHW1API2s","title":"Just in time, approval and notification for admin roles in Microsoft 365","featuredImage":"https://i.ibb.co/dcb6XFN/Activate-a-Role.png"},{"id":"z8EMM9Eu_","sectionId":"QScYfSu74","slug":"Whats-Microsoft-365-Defender-z8EMM9Eu_","title":"What's Microsoft 365 Defender?","featuredImage":"https://i.ibb.co/MDMyDQt/Microsoft-Defender.png"},{"id":"Kye_yNLxA","sectionId":"QScYfSu74","slug":"Whats-Microsoft-Defender-for-identity-Kye_yNLxA","title":"What's Microsoft Defender for identity?","featuredImage":"https://i.ibb.co/bQDBh0Y/Defender-for-Identity-Timeline.png"},{"id":"EnPyp7ukN","sectionId":"QScYfSu74","slug":"Whats-Microsoft-Defender-for-Office-365-EnPyp7ukN","title":"What's Microsoft Defender for Office 365?","featuredImage":"https://i.ibb.co/WcwKY2G/Microsoft-365-incidents-and-alerts.png"},{"id":"6HUOr7qbL","sectionId":"QScYfSu74","slug":"Protect-your-email-environment-from-malicious-actors-6HUOr7qbL","title":"Protect your email and Office environment from malicious actors","featuredImage":"https://i.ibb.co/Df0KQVp/Reports.png"},{"id":"GCOOUsSBT","sectionId":"QScYfSu74","slug":"Protecting-email-against-phishing-attacks-GCOOUsSBT","title":"Protecting email against phishing attacks","featuredImage":"https://i.ibb.co/GCjZHWg/edit-actions.png"},{"id":"GG4cMY8pK","sectionId":"QScYfSu74","slug":"Simulating-attacks-with-Microsoft-365-GG4cMY8pK","title":"Simulating attacks with Microsoft 365","featuredImage":"https://i.ibb.co/NyvnbMK/simulation-overview-view-users-circled.png"},{"id":"z0qPG6v4T","sectionId":"QScYfSu74","slug":"Protecting-Windows-10-and-other-devices-with-Microsoft-Defender-for-Endpoint-z0qPG6v4T","title":"Protecting Windows 10 and other devices with Microsoft Defender for Endpoint","featuredImage":"https://i.ibb.co/T47Xhyh/enable-endpoint-connections.png"},{"id":"LEyZMWBSt","sectionId":"QScYfSu74","slug":"Collect-detect-investigate-and-respond-to-security-threats-using-Microsoft-Sentinel-LEyZMWBSt","title":"Collect, detect, investigate, and respond to security threats using Microsoft Sentinel","featuredImage":"https://i.ibb.co/qN9XsKj/Add-Workbook.png"},{"id":"7MQ3wE4wP","sectionId":"QScYfSu74","slug":"Implement-and-manage-Microsoft-Defender-for-Cloud-Apps-7MQ3wE4wP","title":"Implement and manage Microsoft Defender for Cloud Apps","featuredImage":"https://i.ibb.co/7g7LvFg/office-365-cloud-apps-settings.png"},{"id":"sH_Ee1DW1","sectionId":"QScYfSu74","slug":"Auditing-sign-ins-and-other-actions-in-Microsoft-365-sH_Ee1DW1","title":"Auditing sign-ins and other actions in Microsoft 365","featuredImage":"https://i.ibb.co/BqMw3jZ/Start-recording-user-and-admin-activity.png"},{"id":"vLweLmxZf","sectionId":"YhftdGIRX","slug":"How-to-classify-data-using-labels-in-Microsoft-365-vLweLmxZf","title":"How to classify data using labels in Microsoft 365","featuredImage":"https://i.ibb.co/k9nhWS5/Choose-protection-settings-for-files-and-emails.png"},{"id":"NsF7No40f","sectionId":"YhftdGIRX","slug":"Creating-and-managing-data-retention-to-conform-to-compliance-NsF7No40f","title":"Creating and managing data retention to conform to compliance","featuredImage":"https://i.ibb.co/yqC0ZdY/New-Retention-Policy.png"},{"id":"IsPGsme8w","sectionId":"YhftdGIRX","slug":"Preventing-accidental-and-malicious-data-loss-with-DLP-policies-IsPGsme8w","title":"Preventing accidental and malicious data loss with DLP policies","featuredImage":"https://i.ibb.co/n8WcqKM/Create-a-DLP-policy.png"},{"id":"wv2PbXnhI","sectionId":"YhftdGIRX","slug":"Everything-you-need-to-know-about-securing-SharePoint-Online-for-the-MS-500-wv2PbXnhI","title":"Everything you need to know about securing SharePoint Online for the MS-500","featuredImage":"https://i.ibb.co/Gk9NjSH/Share-Point-Online-Warning.png"},{"id":"7gR3L122b","sectionId":"l0DxUuonW","slug":"Introduction-to-Intune-7gR3L122b","title":"Introduction to Intune","featuredImage":"https://i.ibb.co/Fq3N8BX/Endpoint-Manager-Admin-Center.png"},{"id":"ZyKX3Idjs","sectionId":"l0DxUuonW","slug":"Setting-up-Android-Devices-ZyKX3Idjs","title":"Setting up Android Devices","featuredImage":"https://i.ibb.co/m0BYhL2/Connect-Intune-to-Google-Play.png"},{"id":"MAjW0a2_p","sectionId":"l0DxUuonW","slug":"Setting-up-Apple--iOS-devices-in-Intune-MAjW0a2_p","title":"Setting up Apple / iOS devices in Intune","featuredImage":"https://i.ibb.co/X7Ffb2B/Setup-Apple-Enrollment-in-Intune.png"},{"id":"XFXu2zIS9","sectionId":"l0DxUuonW","slug":"Setting-up-Windows-10-devices-in-Intune-XFXu2zIS9","title":"Setting up Windows 10 devices in Intune","featuredImage":"https://i.ibb.co/WDXKVjW/configure-device-options.png"},{"id":"_LL9VqGZO","sectionId":"l0DxUuonW","slug":"How-to-manage-devices-using-Intune-_LL9VqGZO","title":"How to manage devices using Intune","featuredImage":"https://i.ibb.co/HPQ2m8t/Create-an-endpoint-protection-profile.png"},{"id":"qDRA4jjoN","sectionId":"l0DxUuonW","slug":"Understanding-compliance-policies-qDRA4jjoN","title":"Understanding compliance policies","featuredImage":"https://i.ibb.co/N3Qk57v/Create-a-compliance-policy.png"},{"id":"62t_7oiZx","sectionId":"l0DxUuonW","slug":"Restricting-and-managing-apps-on-user-devices-62t_7oiZx","title":"Restricting and managing apps on user devices","featuredImage":"https://i.ibb.co/PCVRKDf/Add-an-Android-app-to-Intune.png"}],
      articleHtml: `<p>So, you're set up with SharePoint. Users are accessing SharePoint and everything is going great but now there's a security concern. Everything use to sit on file shares inside your network. The network was secured so you didn't have to worry about your files too much. But that's not the case with SharePoint Online. With SharePoint Online, files can be accessed from anywhere at any time. Files can also be synced to your users' devices (including personal devices). Those devices can get lost, stolen, or hacked. So now we have a big issue. But have no fear, Microsoft is here! There are a ton of ways to secure your SharePoint files. You can limit what users can do. Who can share files. You can limit where the files can be accessed (including IP addresses or countries). You can even limit SharePoint access based on your managed devices! That's right, you can set up SharePoint so only authorized users using authorized devices can access your SharePoint files.</p>
<h2>Restrict external user access to your SharePoint tenant</h2>
<p>The first way you'll need to secure your SharePoint tenant is with who users can share files. By default, users can share their SharePoint files with anyone. They can set up a sharing link that doesn't require a password. If that link is accidentally shared with someone that it isn't supposed to be, that person can access your SharePoint files. So how do we limit sharing?</p>
<p>1. Open the SharePoint admin center &gt; Policies &gt; Sharing</p>
<p>2. Drag the sliders under Content can be shared with to the appropriate level.</p>
<p>3. Scroll to the bottom of the page and click <strong>Save</strong>.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/ByQTp6G/Share-Point-Sharing-Least-Permissive.png" alt="SharePoint sharing permissions set to least permissive" style="height: auto;width: auto"/></div>
<p>From this page, you can edit the SharePoint and OneDrive sharing permissions. You can configure it to allow users to only share documents with internal users or keep it so users can share with anyone.</p>
<h3>Limit Sharing by domain</h3>
<p>So let's say a question on the MS-500 you may see is "How do you limit external sharing with only people in contoso.com?" Well, it's pretty easy.</p>
<p>1. Open the <a href="https://admin.microsoft.com/sharepoint?#/sharing" target="_blank">SharePoint admin center &gt; Policies &gt; Sharing</a>&nbsp;</p>
<p>2. Click <strong>More external sharing settings</strong> &gt; <strong>Limit external sharing by domain</strong> &gt; <strong>Add domains</strong>.</p>
<p>5. Click <strong>Allow only specific domains</strong>. Then enter the domain you want to be able to access your SharePoint tenant.</p>
<p>6. Click <strong>Save</strong></p>
<div style="text-align:none;"><img src="https://i.ibb.co/S6Lbk8G/limit-external-sharing.png" alt="Limit external sharing by domains in SharePoint Online" style="height: auto;width: auto"/></div>
<p>7. Then scroll to the bottom of the page and click <strong>Save</strong>.</p>
<h2>Restricting downloading, printing, and syncing from unmanaged devices</h2>
<p>Okay, so now sharing is secured and users can only share with specific domains. But users can still access all the files across SharePoint and OneDrive from any device. A user may accidentally go to a shared computer, for example, at a library, and sync your company's files to the shared computer. Uh-oh. How do you prevent users from downloading, printing, and syncing files to unmanaged devices? Well, there are two ways to set it up: from the browser or PowerShell.</p>
<p>1. Go to the <a href="https://admin.microsoft.com/sharepoint#/accessControl" target="_blank">SharePoint admin center &gt; Policies &gt; Access Control</a></p>
<p>2. Click <strong>Allow limited, web-only access</strong>. Then click <strong>Save</strong>.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/zFF9rZ6/limit-sharepoing-access-from-unmanaged-devices.png" alt="limit SharePoint access from unmanaged devices" style="height: auto;width: auto"/></div>
<p>We can also make this change from PowerShell.</p>
<p>1. Connect to SharePoint Online using Connect-SPOService.</p>
<p>2. Run the following command: <strong>Set-SPOTenant -ConditionalAccessPolicy AllowLimitedAccess</strong></p>
<div style="text-align:none;"><img src="https://i.ibb.co/fCGqR18/Set-SPOTenant-Conditional-Access-Policy-Allow-Limited-Access.png" alt="C:\\Users\\john.gruber\\Downloads\\Set-SPOTenant -ConditionalAccessPolicy AllowLimitedAccess.png" style="height: auto;width: auto"/></div>
<h2><span style="color: rgb(33,37,41);background-color: rgb(255,255,255);font-size: 32px;font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;">Restricting downloading, printing, and syncing from unmanaged devices</span> per site</h2>
<p>Okay, maybe you don't need to limit downloading, printing, and syncing from all your tenants. Maybe there are a couple of SharePoint sites that do need to be limited though. What do you do? First, you need to enable app-enforced restrictions on your SharePoint tenant. Then configure the site to require a managed device.</p>
<h3>Enable app enforced restrictions on the tenant</h3>
<p>&nbsp;Before we go enabling it, let's talk about what it does. The app-enforced conditional access policy will require Azure AD to pass the device information to the app that you are connecting to. So, in short, SharePoint Online will know if you're on a compliant device or not when you connect. Without further ado, let's set up the conditional access policy.</p>
<p>1. Go to <a href="https://aad.portal.azure.com/#blade/Microsoft_AAD_IAM/ConditionalAccessBlade/Policies" target="_blank">https://aad.portal.azure.com/#blade/Microsoft_AAD_IAM/ConditionalAccessBlade/Policies</a> and log in with your admin credentials.</p>
<p>2. Click <strong>New policy</strong>.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/FDdCB72/new-conditional-access-policy.png" alt="New Conditional Access Policy" style="height: auto;width: auto"/></div>
<p>3. Set a name, for example, <strong>app enforced restrictions</strong>.</p>
<p>4. Click <strong>0 users and groups</strong> &gt; <strong>All users</strong>.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/QMPJ6W0/Set-conditional-access-policy-to-all-users.png" alt="Set conditional access policy to all users" style="height: auto;width: auto"/></div>
<p>5. Click <strong>No cloud apps, actions, or authentication contexts selected</strong> &gt; <strong>Select apps</strong> &gt; Type <strong>SharePoint </strong>in the search box &gt; Click <strong>Office 365 SharePoint Online</strong> &gt; <strong>Select</strong>.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/582XPDq/conditional-access-policy-cloud-app-sharepoint-online.png" alt="C:\\Users\\john.gruber\\Downloads\\conditional access policy cloud app SharePoint online" style="height: auto;width: auto"/></div>
<p>6. Click <strong>0 conditions selected</strong> &gt; <strong>Not configured</strong> (under Click apps) &gt; <strong>Yes</strong> (under Configure) &gt; <strong>Done</strong>.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/1LBgC3q/conditional-access-policy-client-apps-all.png" alt="conditional access policy client apps all" style="height: auto;width: auto"/></div>
<p>7. Click <strong>0 controls selected</strong> (under session) &gt; <strong>Use app enforced restrictions</strong> &gt; <strong>Select</strong> &gt; <strong>On </strong>(Under Enable policy) &gt; <strong>Create</strong>.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/kSxBLz5/conditional-access-policy-use-app-enforced-restrictions.png" alt="conditional access policy use app enforced restrictions" style="height: auto;width: auto"/></div>
<p>That's it. Now we can configure the SharePoint Online sites that we want to limit&nbsp;</p>
<h3>Restricting access from unmanaged devices per site</h3>
<p>Perform the following steps on every SharePoint site you want to limit access to:</p>
<p>1. Open PowerShell and run Connect-SPOService -URL &lt;Your SharePoint Admin URL&gt;</p>
<p>2. Run Set-SPOTSite -Identity &lt;The SharePoint site URL you want to protect&gt; -ConditionalAccessPolicy AllowLimitedAccess</p>
<div style="text-align:none;"><img src="https://i.ibb.co/Kh61mvM/limit-access-to-sharepoint-site.png" alt="Limit access to SharePoint site" style="height: auto;width: auto"/></div>
<p>That's it. The site is now protected from downloading, syncing, or printing from unmanaged devices.</p>
`,
      nextContentSlug: 'Introduction-to-Intune-7gR3L122b',
      previousContentSlug: 'Preventing-accidental-and-malicious-data-loss-with-DLP-policies-IsPGsme8w',
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
