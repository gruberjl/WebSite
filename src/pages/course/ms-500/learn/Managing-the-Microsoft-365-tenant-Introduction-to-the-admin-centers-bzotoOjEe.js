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
      course: {"title":"Training for MS-500: Microsoft Office 365 Security Admin","audience":"Anyone who wants to learn about securing Microsoft 365","id":"MS-500","description":"Learn, prepare and training for the Microsoft Microsoft Office 365 Exam MS-500: Microsoft 365 Security Administration MS-500 exam","sections":[{"title":"Introduction","order":0,"id":"qwJW5VrBW"},{"id":"AFV_acckJ","order":1,"title":"Securing identity and access to Microsoft 365"},{"order":2,"id":"QScYfSu74","title":"Securing Microsoft 365, clouds, and on-premises environments"},{"title":"Protecting your environment from accidental and malicious data loss","id":"YhftdGIRX","order":3},{"title":"Protecting User devices using Intune","order":4,"id":"l0DxUuonW"}],"contentOrder":["cpchjBLkC","KKkBOVuS4","bzotoOjEe","cg_vxOX9L","uYCIPbnMC","7CpqFkPZU","rZzausKJ1","ky5W0Lz5P","i9pJIjTNH","S1hQgFOMV","2QfoI2HxY","V1en9Iugh","nAAIvNbtk","2S9jn0aLr","FldNualGC","NFQ6rYFeQ","rK48f6iM2","RHW1API2s","z8EMM9Eu_","Kye_yNLxA","EnPyp7ukN","6HUOr7qbL","GCOOUsSBT","GG4cMY8pK","z0qPG6v4T","LEyZMWBSt","7MQ3wE4wP","sH_Ee1DW1","vLweLmxZf","NsF7No40f","IsPGsme8w","wv2PbXnhI","7gR3L122b","ZyKX3Idjs","MAjW0a2_p","XFXu2zIS9","_LL9VqGZO","qDRA4jjoN","62t_7oiZx"]},
      article: {"article":{"blocks":[{"inlineStyleRanges":[],"entityRanges":[],"data":{},"text":"","key":"2l8pu","type":"unstyled","depth":0},{"key":"ca697","text":" ","data":{},"inlineStyleRanges":[],"type":"atomic","entityRanges":[{"key":0,"offset":0,"length":1}],"depth":0},{"text":"Microsoft 365 management is broken down into multiple admin centers. An admin center is a website used to manage part of the tenant. For example, there's an Exchange Online admin center that can help you manage the email portion of your Microsoft 365 tenant. Another SharePoint Online admin center to help manage the SharePoint Online part of your tenant.","depth":0,"data":{},"key":"cq0tv","type":"unstyled","inlineStyleRanges":[],"entityRanges":[]},{"entityRanges":[],"inlineStyleRanges":[],"key":"5odlf","data":{},"text":"Here's a list of all the Microsoft 365 admin centers you may need.","type":"unstyled","depth":0},{"depth":0,"text":"Microsoft 365 admin center","inlineStyleRanges":[],"data":{},"entityRanges":[],"key":"43tlt","type":"header-two"},{"depth":0,"data":{},"text":"This is the primary admin center. You can access it by clicking the admin button from portal.office.com in the left pane.","key":"3oork","inlineStyleRanges":[],"entityRanges":[{"offset":86,"key":1,"length":17}],"type":"unstyled"},{"depth":0,"inlineStyleRanges":[],"key":"3mrqa","text":" ","type":"atomic","data":{},"entityRanges":[{"length":1,"offset":0,"key":2}]},{"depth":0,"text":"You can access the admin center directly by going to https://admin.microsoft.com/. From the Microsoft 365 admin center, you can create users, and groups, assign licenses, contact Microsoft support, update domain names, view the service health, or access the other admin centers.","type":"unstyled","inlineStyleRanges":[],"data":{},"key":"a0hke","entityRanges":[{"key":3,"length":28,"offset":53}]},{"text":"From the Microsoft 365 admin center, you can access the other admin centers. To access the other admin centers, perform the following:","key":"e92hf","inlineStyleRanges":[],"entityRanges":[],"data":{},"type":"unstyled","depth":0},{"inlineStyleRanges":[],"type":"ordered-list-item","text":"Click Show all in the left pane.","data":{},"depth":0,"entityRanges":[],"key":"d87jh"},{"depth":0,"key":"53g3o","data":{},"text":"Click All admin centers","inlineStyleRanges":[],"entityRanges":[],"type":"ordered-list-item"},{"inlineStyleRanges":[],"data":{},"depth":0,"text":"Azure Advanced Threat Protection (ATP) admin center","type":"header-two","entityRanges":[],"key":"4n8ms"},{"key":"7o6oc","type":"atomic","data":{},"entityRanges":[{"length":1,"offset":0,"key":4}],"text":" ","inlineStyleRanges":[],"depth":0},{"depth":0,"data":{},"text":"The Azure ATP admin center can be accessed by going to https://go.microsoft.com/fwlink/?linkid=848894 and logging in with your admin credentials.","entityRanges":[{"length":46,"offset":55,"key":5}],"key":"8q416","inlineStyleRanges":[{"offset":0,"style":"color-rgb(33,37,41)","length":145},{"length":145,"offset":0,"style":"bgcolor-rgb(255,255,255)"},{"style":"fontsize-16","length":145,"offset":0},{"offset":0,"length":145,"style":"fontfamily-system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", \"Liberation Sans\", sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji"},{"offset":55,"length":46,"style":"color-rgb(13,110,253)"},{"style":"UNDERLINE","offset":55,"length":46}],"type":"unstyled"},{"key":"b7rb5","text":"The Cloud App Security admin center is replacing the Azure ATP admin center, but it's still listed so we'll review it. The Azure ATP admin center is designed for hybrid environments where part of your organization is hosted in on-premises servers and part of your environment is hosted in Microsoft 365. Azure ATP collects, analyzes, detects, and alerts you to suspicious activity in your on-premises Active Directory environment. The Azure ATP admin center is where you can perform the following:","entityRanges":[],"data":{},"depth":0,"inlineStyleRanges":[{"style":"color-rgb(33,37,41)","length":497,"offset":0},{"length":497,"offset":0,"style":"bgcolor-rgb(255,255,255)"},{"offset":0,"length":497,"style":"fontsize-16"},{"style":"fontfamily-system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", \"Liberation Sans\", sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji","length":497,"offset":0}],"type":"unstyled"},{"type":"unordered-list-item","depth":0,"data":{"text-align":"start"},"key":"5bo7b","inlineStyleRanges":[],"entityRanges":[],"text":"View all suspicious activity"},{"entityRanges":[],"data":{},"type":"unordered-list-item","inlineStyleRanges":[],"text":"Protect user credentials stored in Active Directory (AD)","depth":0,"key":"do7ei"},{"depth":0,"text":"Supply a timeline for clear incident information\n ","inlineStyleRanges":[],"data":{},"type":"unordered-list-item","entityRanges":[],"key":"6lfuf"},{"key":"bg0l1","data":{},"depth":0,"type":"header-two","inlineStyleRanges":[],"entityRanges":[],"text":"Azure Active Directory (AD) admin center"},{"entityRanges":[{"key":6,"length":1,"offset":0}],"text":" ","data":{},"type":"atomic","depth":0,"key":"1dabt","inlineStyleRanges":[]},{"key":"733t3","data":{},"type":"unstyled","depth":0,"entityRanges":[{"key":7,"offset":73,"length":29}],"inlineStyleRanges":[],"text":"The Azure Active Directory (AD) admin center can be accessed by going to https://aad.portal.azure.com/. Azure AD is the cloud version of your on-premise AD. It's like on-premise AD on steroids. It's where you can perform the following:"},{"inlineStyleRanges":[],"data":{},"text":"Manage identity including users and groups.","type":"unordered-list-item","key":"7e9f","depth":0,"entityRanges":[]},{"depth":0,"type":"unordered-list-item","entityRanges":[],"inlineStyleRanges":[],"key":"an3bm","text":"Enable multi-factor authentication (MFA)","data":{}},{"key":"42bf5","inlineStyleRanges":[],"text":"Configure self-service password reset","type":"unordered-list-item","data":{},"entityRanges":[],"depth":0},{"entityRanges":[],"text":"Edit company branding","type":"unordered-list-item","data":{},"inlineStyleRanges":[],"key":"8va8u","depth":0},{"key":"1csbh","entityRanges":[],"type":"unordered-list-item","inlineStyleRanges":[],"text":"View user sign-ins","data":{},"depth":0},{"key":"60la5","text":"Configure conditional access policies","inlineStyleRanges":[],"type":"unordered-list-item","entityRanges":[],"data":{},"depth":0},{"type":"header-two","depth":0,"data":{},"inlineStyleRanges":[],"text":"Cloud App Security admin center","key":"6gk5v","entityRanges":[]},{"entityRanges":[{"offset":0,"key":8,"length":1}],"text":" ","inlineStyleRanges":[],"key":"9jk1e","depth":0,"data":{},"type":"atomic"},{"entityRanges":[{"key":9,"length":35,"offset":64}],"type":"unstyled","text":"The cloud app security admin center can be accessed by going to https://portal.cloudappsecurity.com. From the cloud app security admin center, you can manage unsanctioned cloud applications. From the Cloud App security admin center you can perform the following:","key":"8kipa","data":{},"depth":0,"inlineStyleRanges":[]},{"type":"unordered-list-item","depth":0,"data":{},"key":"dhpsi","inlineStyleRanges":[],"text":"Discover unauthorized cloud applications being used within your organization","entityRanges":[]},{"type":"unordered-list-item","entityRanges":[],"text":"Connect and manage authorized apps","data":{},"key":"9f0se","inlineStyleRanges":[],"depth":0},{"depth":0,"entityRanges":[],"data":{},"type":"unordered-list-item","key":"997pr","inlineStyleRanges":[],"text":"Configure policies to manage risk"},{"data":{},"type":"unordered-list-item","text":"View and manage alerts","key":"d35pl","entityRanges":[],"inlineStyleRanges":[],"depth":0},{"depth":0,"data":{},"text":"Compliance admin center","key":"37mv9","type":"header-two","entityRanges":[],"inlineStyleRanges":[]},{"depth":0,"inlineStyleRanges":[],"type":"atomic","entityRanges":[{"key":10,"offset":0,"length":1}],"key":"6l8so","text":" ","data":{}},{"data":{},"key":"d2k92","inlineStyleRanges":[],"entityRanges":[{"offset":56,"key":11,"length":41}],"depth":0,"text":"The compliance admin center can be accessed by going to https://compliance.microsoft.com/homepage. The compliance admin center is where you can manage the compliance of your tenant. You can classify data, set retention policies, and recover data. From the compliance admin center you can perform the following:","type":"unstyled"},{"depth":0,"key":"cvaog","type":"unordered-list-item","data":{},"entityRanges":[],"inlineStyleRanges":[],"text":"Create sensitivity and retention labels to retain data for as long as needed."},{"depth":0,"inlineStyleRanges":[],"type":"unordered-list-item","text":"Review intelligent reports to view where labels are being used.","key":"brc39","data":{},"entityRanges":[]},{"depth":0,"inlineStyleRanges":[],"text":"Review a detailed view of the classification trends across your tenant.","key":"9q2ar","type":"unordered-list-item","entityRanges":[],"data":{}},{"data":{},"inlineStyleRanges":[],"type":"header-two","entityRanges":[],"depth":0,"key":"cthvk","text":"Endpoint Manager admin center"},{"inlineStyleRanges":[],"type":"atomic","entityRanges":[{"key":12,"offset":0,"length":1}],"key":"fkujl","depth":0,"text":" ","data":{}},{"depth":0,"key":"ber6o","text":"The Endpoint manager admin center can be accessed by going to https://endpoint.microsoft.com/?ref=AdminCenter#home. The Endpoint manager admin center is where you can manage the end-user devices. It's where you can perform the following:","entityRanges":[{"length":52,"key":13,"offset":62}],"data":{},"inlineStyleRanges":[],"type":"unstyled"},{"text":"Enroll and configure devices","data":{},"key":"ddlnr","type":"unordered-list-item","inlineStyleRanges":[],"depth":0,"entityRanges":[]},{"text":"Distribute apps to your devices","inlineStyleRanges":[],"key":"3b8ok","type":"unordered-list-item","depth":0,"entityRanges":[],"data":{}},{"type":"unordered-list-item","text":"Monitor and set compliance requirements on devices","data":{},"inlineStyleRanges":[],"entityRanges":[],"key":"bue80","depth":0},{"text":"Exchange admin center","entityRanges":[],"type":"header-two","inlineStyleRanges":[],"data":{},"key":"9hooe","depth":0},{"data":{},"inlineStyleRanges":[],"entityRanges":[{"length":1,"key":14,"offset":0}],"key":"43fvm","depth":0,"type":"atomic","text":" "},{"entityRanges":[{"length":37,"key":15,"offset":54}],"data":{},"type":"unstyled","inlineStyleRanges":[],"depth":0,"key":"4laal","text":"The Exchange admin center can be accessed by going to https://admin.exchange.microsoft.com/. The Exchange admin center is where you manage email and everything about email. It's where you can perform the following:"},{"key":"6a45u","entityRanges":[],"depth":0,"text":"Manage user mailboxes","type":"unordered-list-item","data":{},"inlineStyleRanges":[]},{"key":"8tib9","depth":0,"data":{},"inlineStyleRanges":[],"type":"unordered-list-item","entityRanges":[],"text":"Create and manage shared/resource mailboxes"},{"key":"bf9eu","depth":0,"entityRanges":[],"inlineStyleRanges":[],"type":"unordered-list-item","data":{},"text":"Create mail flow rules"},{"inlineStyleRanges":[],"entityRanges":[],"key":"affn1","type":"unordered-list-item","text":"Perform message traces","depth":0,"data":{}},{"data":{},"depth":0,"entityRanges":[],"key":"8j0na","text":"Power Platform admin center","inlineStyleRanges":[],"type":"header-two"},{"depth":0,"text":" ","type":"atomic","data":{},"inlineStyleRanges":[],"entityRanges":[{"key":16,"length":1,"offset":0}],"key":"2srot"},{"entityRanges":[{"key":17,"offset":60,"length":42}],"text":"The Power Platform admin center can be accessed by going to https://admin.powerplatform.microsoft.com/. The Power Platform admin center is where you can manage the automation of repetitive tasks. From the Power Platform admin center you can perform the following:","key":"de7hv","depth":0,"inlineStyleRanges":[],"data":{},"type":"unstyled"},{"data":{},"key":"eko58","entityRanges":[],"depth":0,"type":"unordered-list-item","inlineStyleRanges":[],"text":"Review Power Automate analytics"},{"inlineStyleRanges":[],"text":"Review Power Apps analytics","type":"unordered-list-item","depth":0,"key":"bhu1t","entityRanges":[],"data":{}},{"key":"6j3ol","inlineStyleRanges":[],"text":"Create integrations between on-premise, Power BI, Microsoft Flow, and PowerApps.","depth":0,"data":{},"type":"unordered-list-item","entityRanges":[]},{"text":"Manage Dynamics 365 apps","entityRanges":[],"data":{},"key":"39st2","type":"unordered-list-item","inlineStyleRanges":[],"depth":0},{"text":"Microsoft 365 Apps admin center","inlineStyleRanges":[],"type":"header-two","key":"2ib2o","entityRanges":[],"depth":0,"data":{}},{"data":{},"key":"6fdpj","depth":0,"entityRanges":[{"offset":0,"key":18,"length":1}],"inlineStyleRanges":[],"text":" ","type":"atomic"},{"text":"The Microsoft 365 Apps admin center can be accessed by going to https://config.office.com/officeSettings. The Microsoft 365 Apps admin center can be used to deploy settings and configurations to users that install the Office suite on their computers. Traditionally, the configuration found in the Microsoft 365 Apps admin center would have been performed via group policy","data":{},"depth":0,"inlineStyleRanges":[],"type":"unstyled","key":"fen7v","entityRanges":[{"offset":64,"length":40,"key":19}]},{"text":"Deploy Office customization policies","depth":0,"type":"unordered-list-item","inlineStyleRanges":[],"key":"9ur51","data":{},"entityRanges":[]},{"data":{},"text":"Receive and implement security policy recommendations","key":"fi7pf","inlineStyleRanges":[],"type":"unordered-list-item","entityRanges":[],"depth":0},{"type":"unordered-list-item","depth":0,"entityRanges":[],"inlineStyleRanges":[],"text":"Create an Office Customization to deploy Office with specific configurations","data":{},"key":"5uah2"},{"depth":0,"type":"header-two","data":{},"inlineStyleRanges":[],"entityRanges":[],"key":"e4or","text":"Microsoft Stream admin center"},{"key":"44rac","depth":0,"type":"unstyled","data":{},"text":"The Microsoft Stream admin center can be accessed by going to https://web.microsoftstream.com/admin. From the Stream admin center, you can configure options for Microsoft Stream. For example, you can limit who can host live events. There are a ton of options in the admin center. Some of which are:","entityRanges":[{"key":20,"offset":62,"length":37}],"inlineStyleRanges":[]},{"key":"bqvam","depth":0,"type":"unordered-list-item","entityRanges":[],"data":{},"text":"Set Stream admins","inlineStyleRanges":[]},{"text":"Manage content on behalf of users","entityRanges":[],"type":"unordered-list-item","key":"6na0q","inlineStyleRanges":[],"depth":0,"data":{}},{"text":"Configure live events, comments, and restrict organization-wide channel creation","data":{},"type":"unordered-list-item","entityRanges":[],"key":"dlfeg","inlineStyleRanges":[],"depth":0},{"entityRanges":[],"depth":0,"text":"Power BI admin center","key":"7i08p","inlineStyleRanges":[],"type":"header-two","data":{}},{"data":{},"depth":0,"entityRanges":[{"offset":0,"key":21,"length":1}],"type":"atomic","inlineStyleRanges":[],"key":"8m6k7","text":" "},{"inlineStyleRanges":[],"text":"The Power BI admin center can be accessed by going to https://app.powerbi.com/admin-portal. The Power BI admin center is used to manage Power BI. From it, you can view usage metrics, and control how users interact with Power BI. From the Power BI admin center you can perform the following:","type":"unstyled","key":"2ifee","data":{},"depth":0,"entityRanges":[{"offset":54,"key":22,"length":36}]},{"entityRanges":[],"data":{},"text":"Configure tenant settings","depth":0,"type":"unordered-list-item","inlineStyleRanges":[],"key":"9dovk"},{"depth":0,"entityRanges":[],"key":"3acdp","data":{},"inlineStyleRanges":[],"type":"unordered-list-item","text":"Review usage metrics"},{"text":"Configure sensitivity labels","key":"5qmjj","entityRanges":[],"depth":0,"inlineStyleRanges":[],"type":"unordered-list-item","data":{}},{"inlineStyleRanges":[],"type":"unordered-list-item","entityRanges":[],"key":"cs71h","depth":0,"text":"Enable Cloud App Security integration","data":{}},{"type":"header-two","text":"Security admin center","entityRanges":[],"key":"bh6lu","depth":0,"inlineStyleRanges":[],"data":{}},{"inlineStyleRanges":[],"depth":0,"data":{},"entityRanges":[{"key":23,"offset":0,"length":1}],"text":" ","type":"atomic","key":"2ffkg"},{"key":"b3u6f","entityRanges":[{"key":24,"length":30,"offset":54}],"inlineStyleRanges":[],"type":"unstyled","text":"The Security admin center can be accessed by going to https://protection.office.com/. The Security admin center is used to get visibility, investigate, and manage the security of your Microsoft 365 tenant. From it you can perform the following:","data":{},"depth":0},{"inlineStyleRanges":[],"text":"Manage and view alerts","entityRanges":[],"key":"b96n9","depth":0,"type":"unordered-list-item","data":{}},{"type":"unordered-list-item","key":"c7u41","depth":0,"entityRanges":[],"text":"Launch simulation attacks","data":{},"inlineStyleRanges":[]},{"type":"unordered-list-item","depth":0,"data":{},"inlineStyleRanges":[],"entityRanges":[],"key":"63r9a","text":"Investigate threats"},{"text":"Configure anti-phishing, anti-spam, attachment, and link policies","inlineStyleRanges":[],"data":{},"entityRanges":[],"depth":0,"type":"unordered-list-item","key":"20j8t"},{"depth":0,"text":"SharePoint admin center","type":"header-two","key":"54l9u","entityRanges":[],"inlineStyleRanges":[],"data":{}},{"type":"atomic","key":"ee12c","text":" ","inlineStyleRanges":[],"data":{},"entityRanges":[{"offset":0,"key":25,"length":1}],"depth":0},{"depth":0,"data":{},"text":"The SharePoint admin center can be accessed by going to the Microsoft 365 admin center > Show all > All admin centers > SharePoint. From the SharePoint admin center, you can manage SharePoint sites and OneDrive sites. You can perform the following:","type":"unstyled","inlineStyleRanges":[],"key":"e0k8e","entityRanges":[]},{"depth":0,"text":"Create and manage SharePoint sites","data":{},"inlineStyleRanges":[],"key":"cdmmb","type":"unordered-list-item","entityRanges":[]},{"entityRanges":[],"type":"unordered-list-item","inlineStyleRanges":[],"key":"4hgru","text":"Configure sharing and access control","depth":0,"data":{}},{"inlineStyleRanges":[],"text":"Manage tenant-wide settings","data":{},"depth":0,"type":"unordered-list-item","entityRanges":[],"key":"79k6f"},{"data":{},"depth":0,"text":"Migrate data to SharePoint","type":"unordered-list-item","entityRanges":[],"inlineStyleRanges":[],"key":"6jf3c"},{"text":"Microsoft Teams admin center","type":"header-two","depth":0,"data":{},"entityRanges":[],"inlineStyleRanges":[],"key":"1ueoc"},{"inlineStyleRanges":[],"key":"5ifnr","data":{},"type":"atomic","entityRanges":[{"key":26,"length":1,"offset":0}],"depth":0,"text":" "},{"data":{},"inlineStyleRanges":[],"entityRanges":[{"length":34,"key":27,"offset":51}],"key":"6pfao","text":"The Teams admin center can be accessed by going to https://admin.teams.microsoft.com/. From the Microsoft Teams admin center, you can manage Microsoft Teams. From it, you can configure messaging, conferencing, and external communication options. You can perform the following:","type":"unstyled","depth":0},{"depth":0,"text":" Review relevant information about your Teams deployment","data":{},"type":"unordered-list-item","entityRanges":[],"key":"evq1k","inlineStyleRanges":[]},{"entityRanges":[],"inlineStyleRanges":[],"type":"unordered-list-item","key":"hihu","text":"View and manage Teams users","data":{},"depth":0},{"type":"unordered-list-item","data":{},"depth":0,"entityRanges":[],"key":"9hdmg","text":"Manage your Teams","inlineStyleRanges":[]},{"data":{},"inlineStyleRanges":[],"type":"unordered-list-item","entityRanges":[],"text":"Configure organization-wide settings","key":"92h8a","depth":0},{"depth":0,"entityRanges":[],"key":"5hpmt","data":{},"text":"Yammer admin center","inlineStyleRanges":[],"type":"header-two"},{"key":"fvf0j","text":" ","depth":0,"entityRanges":[{"key":28,"length":1,"offset":0}],"data":{},"inlineStyleRanges":[],"type":"atomic"},{"text":"The Yammer admin center can be accessed by going to the Microsoft 365 admin center > Show all > All admin centers > Yammer. From the Yammer admin center, you can manage your Yammer network, for example, you can set usage policies and control external network settings. You can also perform the following:","depth":0,"data":{},"entityRanges":[],"inlineStyleRanges":[],"type":"unstyled","key":"6er9g"},{"text":"Configure Yammer tenant-wide settings","type":"unordered-list-item","depth":0,"key":"d7lg2","data":{},"inlineStyleRanges":[],"entityRanges":[]},{"depth":0,"text":"Manage Yammer admins","data":{},"inlineStyleRanges":[],"key":"dlsbi","entityRanges":[],"type":"unordered-list-item"},{"depth":0,"key":"2serg","text":"Configure usage policy","type":"unordered-list-item","data":{},"inlineStyleRanges":[],"entityRanges":[]},{"key":"8etrc","text":"Manage external network access","type":"unordered-list-item","data":{},"entityRanges":[],"depth":0,"inlineStyleRanges":[]},{"key":"f9jtu","data":{},"entityRanges":[],"text":"Monitor keywords","inlineStyleRanges":[],"type":"unordered-list-item","depth":0},{"type":"unordered-list-item","depth":0,"entityRanges":[],"data":{},"key":"8gi2h","text":"Configure security settings","inlineStyleRanges":[]},{"type":"unordered-list-item","entityRanges":[],"data":{},"inlineStyleRanges":[],"text":"Export data","depth":0,"key":"3ihus"}],"entityMap":{"0":{"mutability":"MUTABLE","data":{"src":"https://i.ibb.co/f1cr4zt/Microsoft-365-admin-centers.png","alt":"Microsoft 365 admin centers","height":"auto","width":"auto","targetOption":"_blank","url":"https://portal.office.com"},"type":"IMAGE"},"1":{"type":"LINK","mutability":"MUTABLE","data":{"alt":"Microsoft 365 admin center button","width":"auto","alignment":"none","targetOption":"_blank","src":"https://i.ibb.co/9W1SvwJ/microsoft-365-admin-center.png","url":"https://portal.office.com","height":"auto"}},"2":{"type":"IMAGE","mutability":"MUTABLE","data":{"targetOption":"_blank","alt":"Microsoft 365 admin center button","alignment":"none","url":"https://admin.microsoft.com/","src":"https://i.ibb.co/9W1SvwJ/microsoft-365-admin-center.png","width":"auto","height":"auto"}},"3":{"type":"LINK","mutability":"MUTABLE","data":{"_map":{"data":{"title":"<span data-offset-key=\"fbuo1-1-0\" style=\"box-sizing: border-box;\"><span data-text=\"true\" style=\"box-sizing: border-box;\">https://go.microsoft.com/fwlink/?linkid=848894</span></span>","targetOption":"_blank","url":"https://go.microsoft.com/fwlink/?linkid=848894"},"mutability":"MUTABLE","type":"LINK"},"title":"<span data-offset-key=\"fbuo1-1-0\" style=\"box-sizing: border-box;\"><span data-text=\"true\" style=\"box-sizing: border-box;\">https://go.microsoft.com/fwlink/?linkid=848894</span></span>","targetOption":"_blank","src":"https://i.ibb.co/6sMqT1z/Azure-ATP-Icon.png","height":"auto","width":"auto","url":"https://admin.microsoft.com/","alignment":"none","alt":"Azure ATP Icon"}},"4":{"data":{"src":"https://i.ibb.co/6sMqT1z/Azure-ATP-Icon.png","title":"<span data-offset-key=\"fbuo1-1-0\" style=\"box-sizing: border-box;\"><span data-text=\"true\" style=\"box-sizing: border-box;\">https://go.microsoft.com/fwlink/?linkid=848894</span></span>","url":"https://go.microsoft.com/fwlink/?linkid=848894","alt":"Azure ATP Icon","width":"auto","height":"auto","_map":{"mutability":"MUTABLE","type":"LINK","data":{"targetOption":"_blank","url":"https://go.microsoft.com/fwlink/?linkid=848894","title":"<span data-offset-key=\"fbuo1-1-0\" style=\"box-sizing: border-box;\"><span data-text=\"true\" style=\"box-sizing: border-box;\">https://go.microsoft.com/fwlink/?linkid=848894</span></span>"}},"alignment":"none","targetOption":"_blank"},"mutability":"MUTABLE","type":"IMAGE"},"5":{"type":"LINK","mutability":"MUTABLE","data":{"width":"auto","alt":"Azure ATP icon","_map":{"data":{"url":"https://go.microsoft.com/fwlink/?linkid=848894","targetOption":"_blank","title":"<span data-offset-key=\"fbuo1-1-0\" style=\"box-sizing: border-box;\"><span data-text=\"true\" style=\"box-sizing: border-box;\">https://go.microsoft.com/fwlink/?linkid=848894</span></span>"},"type":"LINK","mutability":"MUTABLE"},"src":"https://i.ibb.co/6sMqT1z/Azure-ATP-Icon.png","targetOption":"_blank","height":"auto","alignment":"left","url":"https://go.microsoft.com/fwlink/?linkid=848894","title":"<span data-offset-key=\"fbuo1-1-0\" style=\"box-sizing: border-box;\"><span data-text=\"true\" style=\"box-sizing: border-box;\">https://go.microsoft.com/fwlink/?linkid=848894</span></span>"}},"6":{"mutability":"MUTABLE","data":{"height":"auto","alt":"Azure AD Icon","targetOption":"_blank","src":"https://i.ibb.co/HK83H6d/Azure-ad-icon.png","url":"https://aad.portal.azure.com/","width":"auto"},"type":"IMAGE"},"7":{"data":{"alt":"Cloud App Security Icon","width":"auto","height":"auto","targetOption":"_blank","url":"https://aad.portal.azure.com/","src":"https://i.ibb.co/hDbLPmR/Cloud-App-Security-admin-center-icon.png"},"type":"LINK","mutability":"MUTABLE"},"8":{"type":"IMAGE","data":{"width":"auto","alt":"Cloud App Security Icon","src":"https://i.ibb.co/hDbLPmR/Cloud-App-Security-admin-center-icon.png","targetOption":"_blank","url":"https://portal.cloudappsecurity.com","height":"auto"},"mutability":"MUTABLE"},"9":{"data":{"width":"auto","url":"https://portal.cloudappsecurity.com","src":"https://i.ibb.co/Jk3LPPL/compliance-icon.png","alt":"Compliance admin center icon","targetOption":"_blank","height":"auto"},"type":"LINK","mutability":"MUTABLE"},"10":{"mutability":"MUTABLE","type":"IMAGE","data":{"width":"auto","alt":"Compliance admin center icon","targetOption":"_blank","height":"auto","url":"https://compliance.microsoft.com/homepage","src":"https://i.ibb.co/Jk3LPPL/compliance-icon.png"}},"11":{"mutability":"MUTABLE","data":{"url":"https://compliance.microsoft.com/homepage","src":"https://i.ibb.co/89kQWVH/endpoint-icon.png","alt":"Endpoint manager compliance admin center icon","width":"auto","targetOption":"_blank","height":"auto"},"type":"LINK"},"12":{"type":"IMAGE","mutability":"MUTABLE","data":{"height":"auto","targetOption":"_blank","alt":"Endpoint manager compliance admin center icon","url":"https://endpoint.microsoft.com/?ref=AdminCenter#home","width":"auto","src":"https://i.ibb.co/89kQWVH/endpoint-icon.png"}},"13":{"mutability":"MUTABLE","type":"LINK","data":{"targetOption":"_blank","url":"https://endpoint.microsoft.com/?ref=AdminCenter#home","src":"https://i.ibb.co/9VWVrqp/exchange-icon.png","height":"auto","alt":"Exchange admin center icon","width":"auto"}},"14":{"type":"IMAGE","mutability":"MUTABLE","data":{"width":"auto","targetOption":"_blank","src":"https://i.ibb.co/9VWVrqp/exchange-icon.png","alt":"Exchange admin center icon","url":"https://admin.exchange.microsoft.com/","height":"auto"}},"15":{"mutability":"MUTABLE","type":"LINK","data":{"url":"https://admin.exchange.microsoft.com/","targetOption":"_blank","alt":"Power Automate admin center icon","width":"auto","height":"auto","src":"https://i.ibb.co/LnWj2Yb/power-automate-icon.png"}},"16":{"type":"IMAGE","mutability":"MUTABLE","data":{"url":"https://admin.powerplatform.microsoft.com/","width":"auto","height":"auto","src":"https://i.ibb.co/LnWj2Yb/power-automate-icon.png","alt":"Power Automate admin center icon","targetOption":"_blank"}},"17":{"type":"LINK","mutability":"MUTABLE","data":{"targetOption":"_blank","url":"https://admin.powerplatform.microsoft.com/","height":"auto","alt":"Microsoft 365 Apps Office configuration icon","width":"auto","src":"https://i.ibb.co/MpGbXrz/Office-install-icon.png"}},"18":{"mutability":"MUTABLE","data":{"height":"auto","url":"https://config.office.com/officeSettings","targetOption":"_blank","width":"auto","src":"https://i.ibb.co/MpGbXrz/Office-install-icon.png","alt":"Microsoft 365 Apps Office configuration icon"},"type":"IMAGE"},"19":{"mutability":"MUTABLE","data":{"src":"https://i.ibb.co/r6J58w1/Power-Bi-Admin-Center.png","width":"auto","url":"https://config.office.com/officeSettings","alt":"Power BI admin center icon","height":"auto","targetOption":"_blank"},"type":"LINK"},"20":{"mutability":"MUTABLE","data":{"height":"auto","alt":"Power BI admin center icon","url":"https://web.microsoftstream.com/admin","width":"auto","targetOption":"_blank","src":"https://i.ibb.co/r6J58w1/Power-Bi-Admin-Center.png"},"type":"LINK"},"21":{"data":{"width":"auto","src":"https://i.ibb.co/r6J58w1/Power-Bi-Admin-Center.png","height":"auto","targetOption":"_blank","url":"https://app.powerbi.com/admin-portal","alt":"Power BI admin center icon"},"type":"IMAGE","mutability":"MUTABLE"},"22":{"data":{"width":"auto","targetOption":"_blank","height":"auto","alt":"Security center admin center","url":"https://app.powerbi.com/admin-portal","src":"https://i.ibb.co/sHYV6Mz/security-admin-center-icon.png"},"type":"LINK","mutability":"MUTABLE"},"23":{"mutability":"MUTABLE","type":"IMAGE","data":{"alt":"Security center admin center","url":"https://protection.office.com/","height":"auto","width":"auto","src":"https://i.ibb.co/sHYV6Mz/security-admin-center-icon.png","targetOption":"_blank"}},"24":{"mutability":"MUTABLE","data":{"width":"auto","alt":"SharePoint admin center","url":"https://protection.office.com/","targetOption":"_blank","src":"https://i.ibb.co/M2C4Jmh/sharepoint-admin-center-icon.png","height":"auto"},"type":"LINK"},"25":{"mutability":"MUTABLE","data":{"width":"auto","targetOption":"_blank","src":"https://i.ibb.co/M2C4Jmh/sharepoint-admin-center-icon.png","alt":"SharePoint admin center","height":"auto","url":"https://admin.teams.microsoft.com/"},"type":"IMAGE"},"26":{"data":{"alt":"Microsoft Teams admin center icon","width":"auto","src":"https://i.ibb.co/dGJJV84/Teams-admin-center.png","height":"auto","url":"https://admin.teams.microsoft.com/","targetOption":"_blank"},"mutability":"MUTABLE","type":"IMAGE"},"27":{"type":"LINK","data":{"alt":"Yammer admin center icon","height":"auto","width":"auto","targetOption":"_blank","url":"https://admin.teams.microsoft.com/","src":"https://i.ibb.co/zsz8HC5/Yammer-admin-center-icon.png"},"mutability":"MUTABLE"},"28":{"mutability":"MUTABLE","data":{"alt":"Yammer admin center icon","height":"auto","width":"auto","src":"https://i.ibb.co/zsz8HC5/Yammer-admin-center-icon.png"},"type":"IMAGE"}}},"title":"Managing the Microsoft 365 tenant - Introduction to the admin centers","publish":true,"images":["https://i.ibb.co/9W1SvwJ/microsoft-365-admin-center.png","https://i.ibb.co/6sMqT1z/Azure-ATP-Icon.png","https://i.ibb.co/6sMqT1z/Azure-ATP-Icon.png","https://i.ibb.co/HK83H6d/Azure-ad-icon.png","https://i.ibb.co/Jk3LPPL/compliance-icon.png","https://i.ibb.co/89kQWVH/endpoint-icon.png","https://i.ibb.co/9VWVrqp/exchange-icon.png","https://i.ibb.co/LnWj2Yb/power-automate-icon.png","https://i.ibb.co/MpGbXrz/Office-install-icon.png","https://i.ibb.co/r6J58w1/Power-Bi-Admin-Center.png","https://i.ibb.co/sHYV6Mz/security-admin-center-icon.png","https://i.ibb.co/M2C4Jmh/sharepoint-admin-center-icon.png","https://i.ibb.co/dGJJV84/Teams-admin-center.png","https://i.ibb.co/zsz8HC5/Yammer-admin-center-icon.png","https://i.ibb.co/hDbLPmR/Cloud-App-Security-admin-center-icon.png","https://i.ibb.co/f1cr4zt/Microsoft-365-admin-centers.png"],"pushlish":true,"id":"bzotoOjEe","featuredImage":"https://i.ibb.co/f1cr4zt/Microsoft-365-admin-centers.png","datePublished":"2022/5/26","sectionId":"qwJW5VrBW","slug":"Managing-the-Microsoft-365-tenant-Introduction-to-the-admin-centers-bzotoOjEe","type":"article","description":"Everything you need to know about the portal office admin centers"},
      articles: [{"id":"cpchjBLkC","sectionId":"qwJW5VrBW","slug":"Whats-in-this-course-cpchjBLkC","title":"What's in this course?","featuredImage":"https://i.ibb.co/zFs9Vfb/microsoft365-security-administrator-associate-600x600.png"},{"id":"KKkBOVuS4","sectionId":"qwJW5VrBW","slug":"Creating-a-free-Microsoft-365-tenant-for-practice-KKkBOVuS4","title":"Creating a free Microsoft 365 tenant for practice","featuredImage":"https://i.ibb.co/F07sjQJ/microsoft-365-e5-trial.png"},{"id":"bzotoOjEe","sectionId":"qwJW5VrBW","slug":"Managing-the-Microsoft-365-tenant-Introduction-to-the-admin-centers-bzotoOjEe","title":"Managing the Microsoft 365 tenant - Introduction to the admin centers","featuredImage":"https://i.ibb.co/f1cr4zt/Microsoft-365-admin-centers.png"},{"id":"cg_vxOX9L","sectionId":"qwJW5VrBW","slug":"Managing-Microsoft-365-through-PowerShell-cg_vxOX9L","title":"Managing Microsoft 365 through PowerShell","featuredImage":"https://i.ibb.co/HV13YF6/install-microsoft-365-powershell-modules.png"},{"id":"uYCIPbnMC","sectionId":"AFV_acckJ","slug":"How-to-create-users-in-Microsoft-365-Cloud-Only-uYCIPbnMC","title":"How to create users in Microsoft 365 Cloud Only","featuredImage":"https://i.ibb.co/Wnt5Q43/View-Microsoft-365-Users.png"},{"id":"7CpqFkPZU","sectionId":"AFV_acckJ","slug":"Creating-and-managing-admins-through-roles-7CpqFkPZU","title":"Creating and managing admins through roles","featuredImage":"https://i.ibb.co/kySL4HQ/Roles-and-administrators.png"},{"id":"rZzausKJ1","sectionId":"AFV_acckJ","slug":"Time-limited-admin-roles-in-Microsoft-365-rZzausKJ1","title":"Time limited admin roles in Microsoft 365","featuredImage":"https://i.ibb.co/nDvjyPD/select-member-to-add-to-PIM-role.png"},{"id":"ky5W0Lz5P","sectionId":"AFV_acckJ","slug":"Whats-AD-Connect-ky5W0Lz5P","title":"What's AD Connect","featuredImage":"https://i.ibb.co/7nDqr9x/Whats-AD-Connect.png"},{"id":"i9pJIjTNH","sectionId":"AFV_acckJ","slug":"Protecting-Passwords-in-Microsoft-365-i9pJIjTNH","title":"Protecting Passwords in Microsoft 365","featuredImage":"https://i.ibb.co/DLD4G4q/access-smart-lockout-settings.png"},{"id":"S1hQgFOMV","sectionId":"AFV_acckJ","slug":"Creating-and-managing-users-through-groups-S1hQgFOMV","title":"Creating and managing users through groups","featuredImage":"https://i.ibb.co/nmmC28M/add-a-group-microsoft-365.png"},{"id":"2QfoI2HxY","sectionId":"AFV_acckJ","slug":"Securing-and-implementing-enterprise-applications-2QfoI2HxY","title":"Securing and implementing enterprise applications","featuredImage":"https://i.ibb.co/C2mp69m/disable-user-consent.png"},{"id":"V1en9Iugh","sectionId":"AFV_acckJ","slug":"Whats-a-conditional-access-policy-V1en9Iugh","title":"What's a conditional access policy?","featuredImage":"https://i.ibb.co/DQm1sY0/Create-conditional-access-policy.png"},{"id":"nAAIvNbtk","sectionId":"AFV_acckJ","slug":"The-many-ways-to-implement-multi-factor-authentication-MFA-in-Microsoft-365-nAAIvNbtk","title":"The many ways to implement multi-factor authentication (MFA) in Microsoft 365","featuredImage":"https://i.ibb.co/P1P0wNY/microsoft-365-manage-security-defaults.png"},{"id":"2S9jn0aLr","sectionId":"AFV_acckJ","slug":"Implement-Self-service-password-reset-in-Microsoft-365-2S9jn0aLr","title":"Implement Self-service password reset in Microsoft 365","featuredImage":"https://i.ibb.co/58y9JVg/write-back-passwords-to-on-premises-directory.png"},{"id":"FldNualGC","sectionId":"AFV_acckJ","slug":"Locking-down-your-Microsoft-365-tenant-from-Microsoft-engineers-FldNualGC","title":"Locking down your Microsoft 365 tenant from Microsoft engineers","featuredImage":"https://i.ibb.co/DCmpnT9/Enable-Customer-Lockbox.png"},{"id":"NFQ6rYFeQ","sectionId":"AFV_acckJ","slug":"Implementing-intelligent-security-using-risk-policies-in-Microsoft-365-NFQ6rYFeQ","title":"Implementing intelligent security using risk policies in Microsoft 365","featuredImage":"https://i.ibb.co/0cyQJ7j/Risk-Detections.png"},{"id":"rK48f6iM2","sectionId":"AFV_acckJ","slug":"Automating-Access-Review-in-Microsoft-365-rK48f6iM2","title":"Automating Access Review in Microsoft 365","featuredImage":"https://i.ibb.co/Xsxvz6Z/new-access-review.png"},{"id":"RHW1API2s","sectionId":"AFV_acckJ","slug":"Just-in-time-approval-and-notification-for-admin-roles-in-Microsoft-365-RHW1API2s","title":"Just in time, approval and notification for admin roles in Microsoft 365","featuredImage":"https://i.ibb.co/dcb6XFN/Activate-a-Role.png"},{"id":"z8EMM9Eu_","sectionId":"QScYfSu74","slug":"Whats-Microsoft-365-Defender-z8EMM9Eu_","title":"What's Microsoft 365 Defender?","featuredImage":"https://i.ibb.co/MDMyDQt/Microsoft-Defender.png"},{"id":"Kye_yNLxA","sectionId":"QScYfSu74","slug":"Whats-Microsoft-Defender-for-identity-Kye_yNLxA","title":"What's Microsoft Defender for identity?","featuredImage":"https://i.ibb.co/bQDBh0Y/Defender-for-Identity-Timeline.png"},{"id":"EnPyp7ukN","sectionId":"QScYfSu74","slug":"Whats-Microsoft-Defender-for-Office-365-EnPyp7ukN","title":"What's Microsoft Defender for Office 365?","featuredImage":"https://i.ibb.co/WcwKY2G/Microsoft-365-incidents-and-alerts.png"},{"id":"6HUOr7qbL","sectionId":"QScYfSu74","slug":"Protect-your-email-environment-from-malicious-actors-6HUOr7qbL","title":"Protect your email and Office environment from malicious actors","featuredImage":"https://i.ibb.co/Df0KQVp/Reports.png"},{"id":"GCOOUsSBT","sectionId":"QScYfSu74","slug":"Protecting-email-against-phishing-attacks-GCOOUsSBT","title":"Protecting email against phishing attacks","featuredImage":"https://i.ibb.co/GCjZHWg/edit-actions.png"},{"id":"GG4cMY8pK","sectionId":"QScYfSu74","slug":"Simulating-attacks-with-Microsoft-365-GG4cMY8pK","title":"Simulating attacks with Microsoft 365","featuredImage":"https://i.ibb.co/NyvnbMK/simulation-overview-view-users-circled.png"},{"id":"z0qPG6v4T","sectionId":"QScYfSu74","slug":"Protecting-Windows-10-and-other-devices-with-Microsoft-Defender-for-Endpoint-z0qPG6v4T","title":"Protecting Windows 10 and other devices with Microsoft Defender for Endpoint","featuredImage":"https://i.ibb.co/T47Xhyh/enable-endpoint-connections.png"},{"id":"LEyZMWBSt","sectionId":"QScYfSu74","slug":"Collect-detect-investigate-and-respond-to-security-threats-using-Microsoft-Sentinel-LEyZMWBSt","title":"Collect, detect, investigate, and respond to security threats using Microsoft Sentinel","featuredImage":"https://i.ibb.co/qN9XsKj/Add-Workbook.png"},{"id":"7MQ3wE4wP","sectionId":"QScYfSu74","slug":"Implement-and-manage-Microsoft-Defender-for-Cloud-Apps-7MQ3wE4wP","title":"Implement and manage Microsoft Defender for Cloud Apps","featuredImage":"https://i.ibb.co/7g7LvFg/office-365-cloud-apps-settings.png"},{"id":"sH_Ee1DW1","sectionId":"QScYfSu74","slug":"Auditing-sign-ins-and-other-actions-in-Microsoft-365-sH_Ee1DW1","title":"Auditing sign-ins and other actions in Microsoft 365","featuredImage":"https://i.ibb.co/BqMw3jZ/Start-recording-user-and-admin-activity.png"},{"id":"vLweLmxZf","sectionId":"YhftdGIRX","slug":"How-to-classify-data-using-labels-in-Microsoft-365-vLweLmxZf","title":"How to classify data using labels in Microsoft 365","featuredImage":"https://i.ibb.co/k9nhWS5/Choose-protection-settings-for-files-and-emails.png"},{"id":"NsF7No40f","sectionId":"YhftdGIRX","slug":"Creating-and-managing-data-retention-to-conform-to-compliance-NsF7No40f","title":"Creating and managing data retention to conform to compliance","featuredImage":"https://i.ibb.co/yqC0ZdY/New-Retention-Policy.png"},{"id":"IsPGsme8w","sectionId":"YhftdGIRX","slug":"Preventing-accidental-and-malicious-data-loss-with-DLP-policies-IsPGsme8w","title":"Preventing accidental and malicious data loss with DLP policies","featuredImage":"https://i.ibb.co/n8WcqKM/Create-a-DLP-policy.png"},{"id":"wv2PbXnhI","sectionId":"YhftdGIRX","slug":"Everything-you-need-to-know-about-securing-SharePoint-Online-for-the-MS-500-wv2PbXnhI","title":"Everything you need to know about securing SharePoint Online for the MS-500","featuredImage":"https://i.ibb.co/Gk9NjSH/Share-Point-Online-Warning.png"},{"id":"7gR3L122b","sectionId":"l0DxUuonW","slug":"Introduction-to-Intune-7gR3L122b","title":"Introduction to Intune","featuredImage":"https://i.ibb.co/Fq3N8BX/Endpoint-Manager-Admin-Center.png"},{"id":"ZyKX3Idjs","sectionId":"l0DxUuonW","slug":"Setting-up-Android-Devices-ZyKX3Idjs","title":"Setting up Android Devices","featuredImage":"https://i.ibb.co/m0BYhL2/Connect-Intune-to-Google-Play.png"},{"id":"MAjW0a2_p","sectionId":"l0DxUuonW","slug":"Setting-up-Apple--iOS-devices-in-Intune-MAjW0a2_p","title":"Setting up Apple / iOS devices in Intune","featuredImage":"https://i.ibb.co/X7Ffb2B/Setup-Apple-Enrollment-in-Intune.png"},{"id":"XFXu2zIS9","sectionId":"l0DxUuonW","slug":"Setting-up-Windows-10-devices-in-Intune-XFXu2zIS9","title":"Setting up Windows 10 devices in Intune","featuredImage":"https://i.ibb.co/WDXKVjW/configure-device-options.png"},{"id":"_LL9VqGZO","sectionId":"l0DxUuonW","slug":"How-to-manage-devices-using-Intune-_LL9VqGZO","title":"How to manage devices using Intune","featuredImage":"https://i.ibb.co/HPQ2m8t/Create-an-endpoint-protection-profile.png"},{"id":"qDRA4jjoN","sectionId":"l0DxUuonW","slug":"Understanding-compliance-policies-qDRA4jjoN","title":"Understanding compliance policies","featuredImage":"https://i.ibb.co/N3Qk57v/Create-a-compliance-policy.png"},{"id":"62t_7oiZx","sectionId":"l0DxUuonW","slug":"Restricting-and-managing-apps-on-user-devices-62t_7oiZx","title":"Restricting and managing apps on user devices","featuredImage":"https://i.ibb.co/PCVRKDf/Add-an-Android-app-to-Intune.png"}],
      articleHtml: `<p></p>
<img src="https://i.ibb.co/f1cr4zt/Microsoft-365-admin-centers.png" alt="Microsoft 365 admin centers" style="height: auto;width: auto"/>
<p>Microsoft 365 management is broken down into multiple admin centers. An admin center is a website used to manage part of the tenant. For example, there's an Exchange Online admin center that can help you manage the email portion of your Microsoft 365 tenant. Another SharePoint Online admin center to help manage the SharePoint Online part of your tenant.</p>
<p>Here's a list of all the Microsoft 365 admin centers you may need.</p>
<h2>Microsoft 365 admin center</h2>
<p>This is the primary admin center. You can access it by clicking the admin button from <a href="https://portal.office.com" target="_blank">portal.office.com</a> in the left pane.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/9W1SvwJ/microsoft-365-admin-center.png" alt="Microsoft 365 admin center button" style="height: auto;width: auto"/></div>
<p>You can access the admin center directly by going to <a href="https://admin.microsoft.com/" target="_blank">https://admin.microsoft.com/</a>. From the Microsoft 365 admin center, you can create users, and groups, assign licenses, contact Microsoft support, update domain names, view the service health, or access the other admin centers.</p>
<p>From the Microsoft 365 admin center, you can access the other admin centers. To access the other admin centers, perform the following:</p>
<ol>
<li>Click Show all in the left pane.</li>
<li>Click All admin centers</li>
</ol>
<h2>Azure Advanced Threat Protection (ATP) admin center</h2>
<div style="text-align:none;"><img src="https://i.ibb.co/6sMqT1z/Azure-ATP-Icon.png" alt="Azure ATP Icon" style="height: auto;width: auto"/></div>
<p><span style="color: rgb(33,37,41);background-color: rgb(255,255,255);font-size: 16px;font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;">The Azure ATP admin center can be accessed by going to </span><a href="https://go.microsoft.com/fwlink/?linkid=848894" target="_blank"><span style="color: rgb(13,110,253);background-color: rgb(255,255,255);font-size: 16px;font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;"><ins>https://go.microsoft.com/fwlink/?linkid=848894</ins></span></a><span style="color: rgb(33,37,41);background-color: rgb(255,255,255);font-size: 16px;font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;"> and logging in with your admin credentials.</span></p>
<p><span style="color: rgb(33,37,41);background-color: rgb(255,255,255);font-size: 16px;font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;">The Cloud App Security admin center is replacing the Azure ATP admin center, but it's still listed so we'll review it. The Azure ATP admin center is designed for hybrid environments where part of your organization is hosted in on-premises servers and part of your environment is hosted in Microsoft 365. Azure ATP collects, analyzes, detects, and alerts you to suspicious activity in your on-premises Active Directory environment. The Azure ATP admin center is where you can perform the following:</span></p>
<ul>
<li style="text-align:start;">View all suspicious activity</li>
<li>Protect user credentials stored in Active Directory (AD)</li>
<li>Supply a timeline for clear incident information<br>&nbsp;</li>
</ul>
<h2>Azure Active Directory (AD) admin center</h2>
<img src="https://i.ibb.co/HK83H6d/Azure-ad-icon.png" alt="Azure AD Icon" style="height: auto;width: auto"/>
<p>The Azure Active Directory (AD) admin center can be accessed by going to <a href="https://aad.portal.azure.com/" target="_blank">https://aad.portal.azure.com/</a>. Azure AD is the cloud version of your on-premise AD. It's like on-premise AD on steroids. It's where you can perform the following:</p>
<ul>
<li>Manage identity including users and groups.</li>
<li>Enable multi-factor authentication (MFA)</li>
<li>Configure self-service password reset</li>
<li>Edit company branding</li>
<li>View user sign-ins</li>
<li>Configure conditional access policies</li>
</ul>
<h2>Cloud App Security admin center</h2>
<img src="https://i.ibb.co/hDbLPmR/Cloud-App-Security-admin-center-icon.png" alt="Cloud App Security Icon" style="height: auto;width: auto"/>
<p>The cloud app security admin center can be accessed by going to <a href="https://portal.cloudappsecurity.com" target="_blank">https://portal.cloudappsecurity.com</a>. From the cloud app security admin center, you can manage unsanctioned cloud applications. From the Cloud App security admin center you can perform the following:</p>
<ul>
<li>Discover unauthorized cloud applications being used within your organization</li>
<li>Connect and manage authorized apps</li>
<li>Configure policies to manage risk</li>
<li>View and manage alerts</li>
</ul>
<h2>Compliance admin center</h2>
<img src="https://i.ibb.co/Jk3LPPL/compliance-icon.png" alt="Compliance admin center icon" style="height: auto;width: auto"/>
<p>The compliance admin center can be accessed by going to <a href="https://compliance.microsoft.com/homepage" target="_blank">https://compliance.microsoft.com/homepage</a>. The compliance admin center is where you can manage the compliance of your tenant. You can classify data, set retention policies, and recover data. From the compliance admin center you can perform the following:</p>
<ul>
<li>Create sensitivity and retention labels to retain data for as long as needed.</li>
<li>Review intelligent reports to view where labels are being used.</li>
<li>Review a detailed view of the classification trends across your tenant.</li>
</ul>
<h2>Endpoint Manager admin center</h2>
<img src="https://i.ibb.co/89kQWVH/endpoint-icon.png" alt="Endpoint manager compliance admin center icon" style="height: auto;width: auto"/>
<p>The Endpoint manager admin center can be accessed by going to <a href="https://endpoint.microsoft.com/?ref=AdminCenter#home" target="_blank">https://endpoint.microsoft.com/?ref=AdminCenter#home</a>. The Endpoint manager admin center is where you can manage the end-user devices. It's where you can perform the following:</p>
<ul>
<li>Enroll and configure devices</li>
<li>Distribute apps to your devices</li>
<li>Monitor and set compliance requirements on devices</li>
</ul>
<h2>Exchange admin center</h2>
<img src="https://i.ibb.co/9VWVrqp/exchange-icon.png" alt="Exchange admin center icon" style="height: auto;width: auto"/>
<p>The Exchange admin center can be accessed by going to <a href="https://admin.exchange.microsoft.com/" target="_blank">https://admin.exchange.microsoft.com/</a>. The Exchange admin center is where you manage email and everything about email. It's where you can perform the following:</p>
<ul>
<li>Manage user mailboxes</li>
<li>Create and manage shared/resource mailboxes</li>
<li>Create mail flow rules</li>
<li>Perform message traces</li>
</ul>
<h2>Power Platform admin center</h2>
<img src="https://i.ibb.co/LnWj2Yb/power-automate-icon.png" alt="Power Automate admin center icon" style="height: auto;width: auto"/>
<p>The Power Platform admin center can be accessed by going to <a href="https://admin.powerplatform.microsoft.com/" target="_blank">https://admin.powerplatform.microsoft.com/</a>. The Power Platform admin center is where you can manage the automation of repetitive tasks. From the Power Platform admin center you can perform the following:</p>
<ul>
<li>Review Power Automate analytics</li>
<li>Review Power Apps analytics</li>
<li>Create integrations between on-premise, Power BI, Microsoft Flow, and PowerApps.</li>
<li>Manage Dynamics 365 apps</li>
</ul>
<h2>Microsoft 365 Apps admin center</h2>
<img src="https://i.ibb.co/MpGbXrz/Office-install-icon.png" alt="Microsoft 365 Apps Office configuration icon" style="height: auto;width: auto"/>
<p>The Microsoft 365 Apps admin center can be accessed by going to <a href="https://config.office.com/officeSettings" target="_blank">https://config.office.com/officeSettings</a>. The Microsoft 365 Apps admin center can be used to deploy settings and configurations to users that install the Office suite on their computers. Traditionally, the configuration found in the Microsoft 365 Apps admin center would have been performed via group policy</p>
<ul>
<li>Deploy Office customization policies</li>
<li>Receive and implement security policy recommendations</li>
<li>Create an Office Customization to deploy Office with specific configurations</li>
</ul>
<h2>Microsoft Stream admin center</h2>
<p>The Microsoft Stream admin center can be accessed by going to <a href="https://web.microsoftstream.com/admin" target="_blank">https://web.microsoftstream.com/admin</a>. From the Stream admin center, you can configure options for Microsoft Stream. For example, you can limit who can host live events. There are a ton of options in the admin center. Some of which are:</p>
<ul>
<li>Set Stream admins</li>
<li>Manage content on behalf of users</li>
<li>Configure live events, comments, and restrict organization-wide channel creation</li>
</ul>
<h2>Power BI admin center</h2>
<img src="https://i.ibb.co/r6J58w1/Power-Bi-Admin-Center.png" alt="Power BI admin center icon" style="height: auto;width: auto"/>
<p>The Power BI admin center can be accessed by going to <a href="https://app.powerbi.com/admin-portal" target="_blank">https://app.powerbi.com/admin-portal</a>. The Power BI admin center is used to manage Power BI. From it, you can view usage metrics, and control how users interact with Power BI. From the Power BI admin center you can perform the following:</p>
<ul>
<li>Configure tenant settings</li>
<li>Review usage metrics</li>
<li>Configure sensitivity labels</li>
<li>Enable Cloud App Security integration</li>
</ul>
<h2>Security admin center</h2>
<img src="https://i.ibb.co/sHYV6Mz/security-admin-center-icon.png" alt="Security center admin center" style="height: auto;width: auto"/>
<p>The Security admin center can be accessed by going to <a href="https://protection.office.com/" target="_blank">https://protection.office.com/</a>. The Security admin center is used to get visibility, investigate, and manage the security of your Microsoft 365 tenant. From it you can perform the following:</p>
<ul>
<li>Manage and view alerts</li>
<li>Launch simulation attacks</li>
<li>Investigate threats</li>
<li>Configure anti-phishing, anti-spam, attachment, and link policies</li>
</ul>
<h2>SharePoint admin center</h2>
<img src="https://i.ibb.co/M2C4Jmh/sharepoint-admin-center-icon.png" alt="SharePoint admin center" style="height: auto;width: auto"/>
<p>The SharePoint admin center can be accessed by going to the Microsoft 365 admin center &gt; Show all &gt; All admin centers &gt; SharePoint. From the SharePoint admin center, you can manage SharePoint sites and OneDrive sites. You can perform the following:</p>
<ul>
<li>Create and manage SharePoint sites</li>
<li>Configure sharing and access control</li>
<li>Manage tenant-wide settings</li>
<li>Migrate data to SharePoint</li>
</ul>
<h2>Microsoft Teams admin center</h2>
<img src="https://i.ibb.co/dGJJV84/Teams-admin-center.png" alt="Microsoft Teams admin center icon" style="height: auto;width: auto"/>
<p>The Teams admin center can be accessed by going to <a href="https://admin.teams.microsoft.com/" target="_blank">https://admin.teams.microsoft.com/</a>. From the Microsoft Teams admin center, you can manage Microsoft Teams. From it, you can configure messaging, conferencing, and external communication options. You can perform the following:</p>
<ul>
<li>&nbsp;Review relevant information about your Teams deployment</li>
<li>View and manage Teams users</li>
<li>Manage your Teams</li>
<li>Configure organization-wide settings</li>
</ul>
<h2>Yammer admin center</h2>
<img src="https://i.ibb.co/zsz8HC5/Yammer-admin-center-icon.png" alt="Yammer admin center icon" style="height: auto;width: auto"/>
<p>The Yammer admin center can be accessed by going to the Microsoft 365 admin center &gt; Show all &gt; All admin centers &gt; Yammer. From the Yammer admin center, you can manage your Yammer network, for example, you can set usage policies and control external network settings. You can also perform the following:</p>
<ul>
<li>Configure Yammer tenant-wide settings</li>
<li>Manage Yammer admins</li>
<li>Configure usage policy</li>
<li>Manage external network access</li>
<li>Monitor keywords</li>
<li>Configure security settings</li>
<li>Export data</li>
</ul>
`,
      nextContentSlug: 'Managing-Microsoft-365-through-PowerShell-cg_vxOX9L',
      previousContentSlug: 'Creating-a-free-Microsoft-365-tenant-for-practice-KKkBOVuS4',
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
