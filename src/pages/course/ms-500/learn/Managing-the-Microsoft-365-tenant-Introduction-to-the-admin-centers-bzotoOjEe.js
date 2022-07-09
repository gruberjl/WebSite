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
      article: {"description":"Everything you need to know about the portal office admin centers","article":{"blocks":[{"entityRanges":[],"text":"","key":"2l8pu","depth":0,"data":{},"inlineStyleRanges":[],"type":"unstyled"},{"type":"atomic","data":{},"inlineStyleRanges":[],"entityRanges":[{"length":1,"key":0,"offset":0}],"text":" ","key":"ca697","depth":0},{"inlineStyleRanges":[],"type":"unstyled","entityRanges":[],"key":"cq0tv","text":"Microsoft 365 management is broken down into multiple admin centers. An admin center is a website used to manage part of the tenant. For example, there's an Exchange Online admin center that can help you manage the email portion of your Microsoft 365 tenant. Another SharePoint Online admin center to help manage the SharePoint Online part of your tenant.","depth":0,"data":{}},{"type":"unstyled","inlineStyleRanges":[],"entityRanges":[],"depth":0,"key":"5odlf","data":{},"text":"Here's a list of all the Microsoft 365 admin centers you may need."},{"entityRanges":[],"depth":0,"text":"Microsoft 365 admin center","key":"43tlt","data":{},"inlineStyleRanges":[],"type":"header-two"},{"text":"This is the primary admin center. You can access it by clicking the admin button from portal.office.com in the left pane.","entityRanges":[{"key":1,"length":17,"offset":86}],"type":"unstyled","data":{},"depth":0,"inlineStyleRanges":[],"key":"3oork"},{"type":"atomic","inlineStyleRanges":[],"key":"3mrqa","text":" ","depth":0,"data":{},"entityRanges":[{"key":2,"length":1,"offset":0}]},{"data":{},"type":"unstyled","depth":0,"text":"You can access the admin center directly by going to https://admin.microsoft.com/. From the Microsoft 365 admin center, you can create users, and groups, assign licenses, contact Microsoft support, update domain names, view the service health, or access the other admin centers.","key":"a0hke","inlineStyleRanges":[],"entityRanges":[{"length":28,"key":3,"offset":53}]},{"text":"From the Microsoft 365 admin center, you can access the other admin centers. To access the other admin centers, perform the following:","key":"e92hf","data":{},"entityRanges":[],"inlineStyleRanges":[],"depth":0,"type":"unstyled"},{"inlineStyleRanges":[],"text":"Click Show all in the left pane.","type":"ordered-list-item","key":"d87jh","entityRanges":[],"depth":0,"data":{}},{"type":"ordered-list-item","depth":0,"key":"53g3o","data":{},"entityRanges":[],"inlineStyleRanges":[],"text":"Click All admin centers"},{"text":"Azure Advanced Threat Protection (ATP) admin center","inlineStyleRanges":[],"type":"header-two","key":"4n8ms","entityRanges":[],"depth":0,"data":{}},{"data":{},"inlineStyleRanges":[],"text":" ","key":"7o6oc","entityRanges":[{"length":1,"key":4,"offset":0}],"depth":0,"type":"atomic"},{"type":"unstyled","data":{},"entityRanges":[{"length":46,"key":5,"offset":55}],"depth":0,"text":"The Azure ATP admin center can be accessed by going to https://go.microsoft.com/fwlink/?linkid=848894 and logging in with your admin credentials.","key":"8q416","inlineStyleRanges":[{"offset":0,"length":145,"style":"color-rgb(33,37,41)"},{"style":"bgcolor-rgb(255,255,255)","length":145,"offset":0},{"length":145,"offset":0,"style":"fontsize-16"},{"offset":0,"style":"fontfamily-system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", \"Liberation Sans\", sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji","length":145},{"length":46,"style":"color-rgb(13,110,253)","offset":55},{"length":46,"offset":55,"style":"UNDERLINE"}]},{"type":"unstyled","entityRanges":[],"depth":0,"text":"The Cloud App Security admin center is replacing the Azure ATP admin center, but it's still listed so we'll review it. The Azure ATP admin center is designed for hybrid environments where part of your organization is hosted in on-premises servers and part of your environment is hosted in Microsoft 365. Azure ATP collects, analyzes, detects, and alerts you to suspicious activity in your on-premises Active Directory environment. The Azure ATP admin center is where you can perform the following:","key":"b7rb5","data":{},"inlineStyleRanges":[{"length":497,"offset":0,"style":"color-rgb(33,37,41)"},{"offset":0,"length":497,"style":"bgcolor-rgb(255,255,255)"},{"style":"fontsize-16","offset":0,"length":497},{"style":"fontfamily-system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", \"Liberation Sans\", sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji","length":497,"offset":0}]},{"depth":0,"key":"5bo7b","data":{"text-align":"start"},"text":"View all suspicious activity","inlineStyleRanges":[],"type":"unordered-list-item","entityRanges":[]},{"inlineStyleRanges":[],"text":"Protect user credentials stored in Active Directory (AD)","entityRanges":[],"key":"do7ei","data":{},"depth":0,"type":"unordered-list-item"},{"key":"6lfuf","inlineStyleRanges":[],"type":"unordered-list-item","entityRanges":[],"text":"Supply a timeline for clear incident information\n ","depth":0,"data":{}},{"inlineStyleRanges":[],"entityRanges":[],"type":"header-two","depth":0,"key":"bg0l1","data":{},"text":"Azure Active Directory (AD) admin center"},{"key":"1dabt","text":" ","entityRanges":[{"offset":0,"key":6,"length":1}],"type":"atomic","data":{},"depth":0,"inlineStyleRanges":[]},{"depth":0,"inlineStyleRanges":[],"entityRanges":[{"length":29,"key":7,"offset":73}],"type":"unstyled","text":"The Azure Active Directory (AD) admin center can be accessed by going to https://aad.portal.azure.com/. Azure AD is the cloud version of your on-premise AD. It's like on-premise AD on steroids. It's where you can perform the following:","key":"733t3","data":{}},{"key":"7e9f","type":"unordered-list-item","inlineStyleRanges":[],"entityRanges":[],"text":"Manage identity including users and groups.","data":{},"depth":0},{"key":"an3bm","entityRanges":[],"depth":0,"inlineStyleRanges":[],"type":"unordered-list-item","data":{},"text":"Enable multi-factor authentication (MFA)"},{"depth":0,"inlineStyleRanges":[],"key":"42bf5","data":{},"type":"unordered-list-item","text":"Configure self-service password reset","entityRanges":[]},{"depth":0,"data":{},"entityRanges":[],"type":"unordered-list-item","text":"Edit company branding","inlineStyleRanges":[],"key":"8va8u"},{"key":"1csbh","type":"unordered-list-item","entityRanges":[],"depth":0,"data":{},"text":"View user sign-ins","inlineStyleRanges":[]},{"text":"Configure conditional access policies","depth":0,"entityRanges":[],"key":"60la5","data":{},"inlineStyleRanges":[],"type":"unordered-list-item"},{"key":"6gk5v","entityRanges":[],"data":{},"text":"Cloud App Security admin center","type":"header-two","depth":0,"inlineStyleRanges":[]},{"depth":0,"key":"9jk1e","entityRanges":[{"length":1,"key":8,"offset":0}],"text":" ","type":"atomic","data":{},"inlineStyleRanges":[]},{"entityRanges":[{"key":9,"offset":64,"length":35}],"type":"unstyled","text":"The cloud app security admin center can be accessed by going to https://portal.cloudappsecurity.com. From the cloud app security admin center, you can manage unsanctioned cloud applications. From the Cloud App security admin center you can perform the following:","depth":0,"data":{},"key":"8kipa","inlineStyleRanges":[]},{"inlineStyleRanges":[],"key":"dhpsi","type":"unordered-list-item","entityRanges":[],"text":"Discover unauthorized cloud applications being used within your organization","depth":0,"data":{}},{"inlineStyleRanges":[],"key":"9f0se","text":"Connect and manage authorized apps","type":"unordered-list-item","entityRanges":[],"depth":0,"data":{}},{"key":"997pr","inlineStyleRanges":[],"type":"unordered-list-item","entityRanges":[],"text":"Configure policies to manage risk","depth":0,"data":{}},{"text":"View and manage alerts","type":"unordered-list-item","data":{},"inlineStyleRanges":[],"entityRanges":[],"key":"d35pl","depth":0},{"entityRanges":[],"type":"header-two","depth":0,"inlineStyleRanges":[],"key":"37mv9","data":{},"text":"Compliance admin center"},{"type":"atomic","data":{},"inlineStyleRanges":[],"key":"6l8so","entityRanges":[{"offset":0,"length":1,"key":10}],"text":" ","depth":0},{"text":"The compliance admin center can be accessed by going to https://compliance.microsoft.com/homepage. The compliance admin center is where you can manage the compliance of your tenant. You can classify data, set retention policies, and recover data. From the compliance admin center you can perform the following:","depth":0,"key":"d2k92","type":"unstyled","data":{},"inlineStyleRanges":[],"entityRanges":[{"offset":56,"key":11,"length":41}]},{"entityRanges":[],"data":{},"inlineStyleRanges":[],"text":"Create sensitivity and retention labels to retain data for as long as needed.","key":"cvaog","depth":0,"type":"unordered-list-item"},{"data":{},"key":"brc39","inlineStyleRanges":[],"text":"Review intelligent reports to view where labels are being used.","type":"unordered-list-item","depth":0,"entityRanges":[]},{"depth":0,"text":"Review a detailed view of the classification trends across your tenant.","type":"unordered-list-item","entityRanges":[],"inlineStyleRanges":[],"data":{},"key":"9q2ar"},{"text":"Endpoint Manager admin center","depth":0,"key":"cthvk","entityRanges":[],"type":"header-two","data":{},"inlineStyleRanges":[]},{"type":"atomic","inlineStyleRanges":[],"depth":0,"key":"fkujl","data":{},"entityRanges":[{"length":1,"key":12,"offset":0}],"text":" "},{"key":"ber6o","data":{},"type":"unstyled","depth":0,"inlineStyleRanges":[],"text":"The Endpoint manager admin center can be accessed by going to https://endpoint.microsoft.com/?ref=AdminCenter#home. The Endpoint manager admin center is where you can manage the end-user devices. It's where you can perform the following:","entityRanges":[{"key":13,"offset":62,"length":52}]},{"entityRanges":[],"type":"unordered-list-item","depth":0,"text":"Enroll and configure devices","data":{},"inlineStyleRanges":[],"key":"ddlnr"},{"text":"Distribute apps to your devices","key":"3b8ok","depth":0,"entityRanges":[],"type":"unordered-list-item","inlineStyleRanges":[],"data":{}},{"key":"bue80","type":"unordered-list-item","entityRanges":[],"inlineStyleRanges":[],"text":"Monitor and set compliance requirements on devices","depth":0,"data":{}},{"data":{},"key":"9hooe","inlineStyleRanges":[],"type":"header-two","text":"Exchange admin center","entityRanges":[],"depth":0},{"depth":0,"type":"atomic","entityRanges":[{"key":14,"length":1,"offset":0}],"text":" ","key":"43fvm","inlineStyleRanges":[],"data":{}},{"inlineStyleRanges":[],"data":{},"text":"The Exchange admin center can be accessed by going to https://admin.exchange.microsoft.com/. The Exchange admin center is where you manage email and everything about email. It's where you can perform the following:","type":"unstyled","key":"4laal","entityRanges":[{"offset":54,"length":37,"key":15}],"depth":0},{"key":"6a45u","data":{},"inlineStyleRanges":[],"entityRanges":[],"type":"unordered-list-item","text":"Manage user mailboxes","depth":0},{"type":"unordered-list-item","inlineStyleRanges":[],"text":"Create and manage shared/resource mailboxes","depth":0,"data":{},"key":"8tib9","entityRanges":[]},{"key":"bf9eu","entityRanges":[],"inlineStyleRanges":[],"depth":0,"type":"unordered-list-item","text":"Create mail flow rules","data":{}},{"depth":0,"text":"Perform message traces","type":"unordered-list-item","entityRanges":[],"inlineStyleRanges":[],"key":"affn1","data":{}},{"depth":0,"text":"Power Platform admin center","entityRanges":[],"type":"header-two","key":"8j0na","inlineStyleRanges":[],"data":{}},{"key":"2srot","data":{},"text":" ","entityRanges":[{"offset":0,"length":1,"key":16}],"inlineStyleRanges":[],"type":"atomic","depth":0},{"text":"The Power Platform admin center can be accessed by going to https://admin.powerplatform.microsoft.com/. The Power Platform admin center is where you can manage the automation of repetitive tasks. From the Power Platform admin center you can perform the following:","data":{},"key":"de7hv","entityRanges":[{"length":42,"key":17,"offset":60}],"depth":0,"inlineStyleRanges":[],"type":"unstyled"},{"text":"Review Power Automate analytics","type":"unordered-list-item","key":"eko58","entityRanges":[],"data":{},"inlineStyleRanges":[],"depth":0},{"entityRanges":[],"key":"bhu1t","depth":0,"inlineStyleRanges":[],"text":"Review Power Apps analytics","data":{},"type":"unordered-list-item"},{"text":"Create integrations between on-premise, Power BI, Microsoft Flow, and PowerApps.","inlineStyleRanges":[],"entityRanges":[],"data":{},"depth":0,"type":"unordered-list-item","key":"6j3ol"},{"type":"unordered-list-item","key":"39st2","entityRanges":[],"inlineStyleRanges":[],"text":"Manage Dynamics 365 apps","data":{},"depth":0},{"text":"Microsoft 365 Apps admin center","type":"header-two","entityRanges":[],"depth":0,"inlineStyleRanges":[],"data":{},"key":"2ib2o"},{"type":"atomic","depth":0,"text":" ","inlineStyleRanges":[],"data":{},"entityRanges":[{"length":1,"offset":0,"key":18}],"key":"6fdpj"},{"data":{},"entityRanges":[{"key":19,"length":40,"offset":64}],"depth":0,"key":"fen7v","inlineStyleRanges":[],"type":"unstyled","text":"The Microsoft 365 Apps admin center can be accessed by going to https://config.office.com/officeSettings. The Microsoft 365 Apps admin center can be used to deploy settings and configurations to users that install the Office suite on their computers. Traditionally, the configuration found in the Microsoft 365 Apps admin center would have been performed via group policy"},{"entityRanges":[],"depth":0,"data":{},"inlineStyleRanges":[],"key":"9ur51","text":"Deploy Office customization policies","type":"unordered-list-item"},{"data":{},"key":"fi7pf","text":"Receive and implement security policy recommendations","inlineStyleRanges":[],"depth":0,"type":"unordered-list-item","entityRanges":[]},{"entityRanges":[],"key":"5uah2","depth":0,"text":"Create an Office Customization to deploy Office with specific configurations","inlineStyleRanges":[],"type":"unordered-list-item","data":{}},{"text":"Microsoft Stream admin center","inlineStyleRanges":[],"depth":0,"data":{},"key":"e4or","type":"header-two","entityRanges":[]},{"key":"44rac","type":"unstyled","entityRanges":[{"length":37,"offset":62,"key":20}],"inlineStyleRanges":[],"depth":0,"text":"The Microsoft Stream admin center can be accessed by going to https://web.microsoftstream.com/admin. From the Stream admin center, you can configure options for Microsoft Stream. For example, you can limit who can host live events. There are a ton of options in the admin center. Some of which are:","data":{}},{"inlineStyleRanges":[],"text":"Set Stream admins","entityRanges":[],"key":"bqvam","type":"unordered-list-item","depth":0,"data":{}},{"type":"unordered-list-item","entityRanges":[],"key":"6na0q","inlineStyleRanges":[],"data":{},"depth":0,"text":"Manage content on behalf of users"},{"entityRanges":[],"data":{},"depth":0,"text":"Configure live events, comments, and restrict organization-wide channel creation","inlineStyleRanges":[],"key":"dlfeg","type":"unordered-list-item"},{"text":"Power BI admin center","inlineStyleRanges":[],"type":"header-two","entityRanges":[],"key":"7i08p","data":{},"depth":0},{"entityRanges":[{"offset":0,"length":1,"key":21}],"depth":0,"type":"atomic","key":"8m6k7","data":{},"inlineStyleRanges":[],"text":" "},{"entityRanges":[{"offset":54,"length":36,"key":22}],"depth":0,"type":"unstyled","inlineStyleRanges":[],"data":{},"text":"The Power BI admin center can be accessed by going to https://app.powerbi.com/admin-portal. The Power BI admin center is used to manage Power BI. From it, you can view usage metrics, and control how users interact with Power BI. From the Power BI admin center you can perform the following:","key":"2ifee"},{"data":{},"inlineStyleRanges":[],"type":"unordered-list-item","text":"Configure tenant settings","entityRanges":[],"key":"9dovk","depth":0},{"text":"Review usage metrics","data":{},"depth":0,"entityRanges":[],"inlineStyleRanges":[],"type":"unordered-list-item","key":"3acdp"},{"inlineStyleRanges":[],"entityRanges":[],"key":"5qmjj","data":{},"type":"unordered-list-item","depth":0,"text":"Configure sensitivity labels"},{"type":"unordered-list-item","key":"cs71h","data":{},"inlineStyleRanges":[],"entityRanges":[],"depth":0,"text":"Enable Cloud App Security integration"},{"data":{},"key":"bh6lu","text":"Security admin center","depth":0,"type":"header-two","entityRanges":[],"inlineStyleRanges":[]},{"data":{},"key":"2ffkg","inlineStyleRanges":[],"entityRanges":[{"length":1,"offset":0,"key":23}],"type":"atomic","depth":0,"text":" "},{"key":"b3u6f","data":{},"text":"The Security admin center can be accessed by going to https://protection.office.com/. The Security admin center is used to get visibility, investigate, and manage the security of your Microsoft 365 tenant. From it you can perform the following:","entityRanges":[{"length":30,"key":24,"offset":54}],"depth":0,"inlineStyleRanges":[],"type":"unstyled"},{"type":"unordered-list-item","key":"b96n9","inlineStyleRanges":[],"depth":0,"text":"Manage and view alerts","entityRanges":[],"data":{}},{"key":"c7u41","data":{},"entityRanges":[],"text":"Launch simulation attacks","depth":0,"type":"unordered-list-item","inlineStyleRanges":[]},{"text":"Investigate threats","depth":0,"key":"63r9a","inlineStyleRanges":[],"type":"unordered-list-item","data":{},"entityRanges":[]},{"data":{},"text":"Configure anti-phishing, anti-spam, attachment, and link policies","inlineStyleRanges":[],"depth":0,"type":"unordered-list-item","entityRanges":[],"key":"20j8t"},{"key":"54l9u","text":"SharePoint admin center","inlineStyleRanges":[],"data":{},"depth":0,"type":"header-two","entityRanges":[]},{"data":{},"entityRanges":[{"length":1,"key":25,"offset":0}],"type":"atomic","depth":0,"inlineStyleRanges":[],"key":"ee12c","text":" "},{"data":{},"type":"unstyled","key":"e0k8e","inlineStyleRanges":[],"entityRanges":[],"text":"The SharePoint admin center can be accessed by going to the Microsoft 365 admin center > Show all > All admin centers > SharePoint. From the SharePoint admin center, you can manage SharePoint sites and OneDrive sites. You can perform the following:","depth":0},{"depth":0,"text":"Create and manage SharePoint sites","entityRanges":[],"type":"unordered-list-item","data":{},"key":"cdmmb","inlineStyleRanges":[]},{"type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"key":"4hgru","text":"Configure sharing and access control","entityRanges":[],"data":{}},{"depth":0,"inlineStyleRanges":[],"text":"Manage tenant-wide settings","data":{},"type":"unordered-list-item","key":"79k6f","entityRanges":[]},{"entityRanges":[],"text":"Migrate data to SharePoint","depth":0,"inlineStyleRanges":[],"key":"6jf3c","data":{},"type":"unordered-list-item"},{"entityRanges":[],"data":{},"type":"header-two","text":"Microsoft Teams admin center","depth":0,"key":"1ueoc","inlineStyleRanges":[]},{"key":"5ifnr","text":" ","type":"atomic","inlineStyleRanges":[],"depth":0,"data":{},"entityRanges":[{"key":26,"length":1,"offset":0}]},{"inlineStyleRanges":[],"text":"The Teams admin center can be accessed by going to https://admin.teams.microsoft.com/. From the Microsoft Teams admin center, you can manage Microsoft Teams. From it, you can configure messaging, conferencing, and external communication options. You can perform the following:","entityRanges":[{"key":27,"offset":51,"length":34}],"depth":0,"key":"6pfao","type":"unstyled","data":{}},{"key":"evq1k","data":{},"entityRanges":[],"inlineStyleRanges":[],"text":" Review relevant information about your Teams deployment","type":"unordered-list-item","depth":0},{"data":{},"inlineStyleRanges":[],"type":"unordered-list-item","entityRanges":[],"depth":0,"text":"View and manage Teams users","key":"hihu"},{"inlineStyleRanges":[],"key":"9hdmg","entityRanges":[],"depth":0,"type":"unordered-list-item","text":"Manage your Teams","data":{}},{"key":"92h8a","inlineStyleRanges":[],"text":"Configure organization-wide settings","entityRanges":[],"depth":0,"data":{},"type":"unordered-list-item"},{"key":"5hpmt","type":"header-two","depth":0,"entityRanges":[],"data":{},"text":"Yammer admin center","inlineStyleRanges":[]},{"data":{},"entityRanges":[{"length":1,"key":28,"offset":0}],"type":"atomic","inlineStyleRanges":[],"key":"fvf0j","text":" ","depth":0},{"key":"6er9g","data":{},"depth":0,"inlineStyleRanges":[],"type":"unstyled","entityRanges":[],"text":"The Yammer admin center can be accessed by going to the Microsoft 365 admin center > Show all > All admin centers > Yammer. From the Yammer admin center, you can manage your Yammer network, for example, you can set usage policies and control external network settings. You can also perform the following:"},{"key":"d7lg2","depth":0,"entityRanges":[],"text":"Configure Yammer tenant-wide settings","type":"unordered-list-item","data":{},"inlineStyleRanges":[]},{"depth":0,"inlineStyleRanges":[],"key":"dlsbi","data":{},"entityRanges":[],"text":"Manage Yammer admins","type":"unordered-list-item"},{"key":"2serg","inlineStyleRanges":[],"data":{},"depth":0,"entityRanges":[],"text":"Configure usage policy","type":"unordered-list-item"},{"text":"Manage external network access","depth":0,"data":{},"inlineStyleRanges":[],"key":"8etrc","entityRanges":[],"type":"unordered-list-item"},{"type":"unordered-list-item","entityRanges":[],"depth":0,"text":"Monitor keywords","key":"f9jtu","data":{},"inlineStyleRanges":[]},{"data":{},"key":"8gi2h","depth":0,"entityRanges":[],"text":"Configure security settings","inlineStyleRanges":[],"type":"unordered-list-item"},{"text":"Export data","type":"unordered-list-item","entityRanges":[],"data":{},"inlineStyleRanges":[],"key":"3ihus","depth":0}],"entityMap":{"0":{"mutability":"MUTABLE","data":{"width":"auto","targetOption":"_blank","url":"https://portal.office.com","alt":"Microsoft 365 admin centers","src":"https://i.ibb.co/f1cr4zt/Microsoft-365-admin-centers.png","height":"auto"},"type":"IMAGE"},"1":{"mutability":"MUTABLE","data":{"width":"auto","src":"https://i.ibb.co/9W1SvwJ/microsoft-365-admin-center.png","url":"https://portal.office.com","alignment":"none","height":"auto","alt":"Microsoft 365 admin center button","targetOption":"_blank"},"type":"LINK"},"2":{"data":{"alignment":"none","url":"https://admin.microsoft.com/","width":"auto","height":"auto","src":"https://i.ibb.co/9W1SvwJ/microsoft-365-admin-center.png","alt":"Microsoft 365 admin center button","targetOption":"_blank"},"mutability":"MUTABLE","type":"IMAGE"},"3":{"mutability":"MUTABLE","type":"LINK","data":{"targetOption":"_blank","src":"https://i.ibb.co/6sMqT1z/Azure-ATP-Icon.png","title":"<span data-offset-key=\"fbuo1-1-0\" style=\"box-sizing: border-box;\"><span data-text=\"true\" style=\"box-sizing: border-box;\">https://go.microsoft.com/fwlink/?linkid=848894</span></span>","alignment":"none","alt":"Azure ATP Icon","width":"auto","height":"auto","url":"https://admin.microsoft.com/","_map":{"type":"LINK","mutability":"MUTABLE","data":{"title":"<span data-offset-key=\"fbuo1-1-0\" style=\"box-sizing: border-box;\"><span data-text=\"true\" style=\"box-sizing: border-box;\">https://go.microsoft.com/fwlink/?linkid=848894</span></span>","targetOption":"_blank","url":"https://go.microsoft.com/fwlink/?linkid=848894"}}}},"4":{"mutability":"MUTABLE","data":{"title":"<span data-offset-key=\"fbuo1-1-0\" style=\"box-sizing: border-box;\"><span data-text=\"true\" style=\"box-sizing: border-box;\">https://go.microsoft.com/fwlink/?linkid=848894</span></span>","url":"https://go.microsoft.com/fwlink/?linkid=848894","_map":{"data":{"title":"<span data-offset-key=\"fbuo1-1-0\" style=\"box-sizing: border-box;\"><span data-text=\"true\" style=\"box-sizing: border-box;\">https://go.microsoft.com/fwlink/?linkid=848894</span></span>","targetOption":"_blank","url":"https://go.microsoft.com/fwlink/?linkid=848894"},"type":"LINK","mutability":"MUTABLE"},"src":"https://i.ibb.co/6sMqT1z/Azure-ATP-Icon.png","alignment":"none","width":"auto","targetOption":"_blank","alt":"Azure ATP Icon","height":"auto"},"type":"IMAGE"},"5":{"mutability":"MUTABLE","data":{"alt":"Azure ATP icon","alignment":"left","title":"<span data-offset-key=\"fbuo1-1-0\" style=\"box-sizing: border-box;\"><span data-text=\"true\" style=\"box-sizing: border-box;\">https://go.microsoft.com/fwlink/?linkid=848894</span></span>","width":"auto","height":"auto","_map":{"mutability":"MUTABLE","type":"LINK","data":{"url":"https://go.microsoft.com/fwlink/?linkid=848894","title":"<span data-offset-key=\"fbuo1-1-0\" style=\"box-sizing: border-box;\"><span data-text=\"true\" style=\"box-sizing: border-box;\">https://go.microsoft.com/fwlink/?linkid=848894</span></span>","targetOption":"_blank"}},"src":"https://i.ibb.co/6sMqT1z/Azure-ATP-Icon.png","targetOption":"_blank","url":"https://go.microsoft.com/fwlink/?linkid=848894"},"type":"LINK"},"6":{"type":"IMAGE","mutability":"MUTABLE","data":{"targetOption":"_blank","url":"https://aad.portal.azure.com/","alt":"Azure AD Icon","height":"auto","src":"https://i.ibb.co/HK83H6d/Azure-ad-icon.png","width":"auto"}},"7":{"type":"LINK","mutability":"MUTABLE","data":{"height":"auto","url":"https://aad.portal.azure.com/","width":"auto","targetOption":"_blank","alt":"Cloud App Security Icon","src":"https://i.ibb.co/hDbLPmR/Cloud-App-Security-admin-center-icon.png"}},"8":{"type":"IMAGE","mutability":"MUTABLE","data":{"targetOption":"_blank","alt":"Cloud App Security Icon","height":"auto","url":"https://portal.cloudappsecurity.com","src":"https://i.ibb.co/hDbLPmR/Cloud-App-Security-admin-center-icon.png","width":"auto"}},"9":{"type":"LINK","mutability":"MUTABLE","data":{"url":"https://portal.cloudappsecurity.com","width":"auto","src":"https://i.ibb.co/Jk3LPPL/compliance-icon.png","targetOption":"_blank","height":"auto","alt":"Compliance admin center icon"}},"10":{"data":{"alt":"Compliance admin center icon","height":"auto","targetOption":"_blank","url":"https://compliance.microsoft.com/homepage","src":"https://i.ibb.co/Jk3LPPL/compliance-icon.png","width":"auto"},"type":"IMAGE","mutability":"MUTABLE"},"11":{"mutability":"MUTABLE","data":{"src":"https://i.ibb.co/89kQWVH/endpoint-icon.png","url":"https://compliance.microsoft.com/homepage","width":"auto","alt":"Endpoint manager compliance admin center icon","height":"auto","targetOption":"_blank"},"type":"LINK"},"12":{"data":{"src":"https://i.ibb.co/89kQWVH/endpoint-icon.png","url":"https://endpoint.microsoft.com/?ref=AdminCenter#home","alt":"Endpoint manager compliance admin center icon","width":"auto","height":"auto","targetOption":"_blank"},"type":"IMAGE","mutability":"MUTABLE"},"13":{"mutability":"MUTABLE","data":{"width":"auto","url":"https://endpoint.microsoft.com/?ref=AdminCenter#home","targetOption":"_blank","height":"auto","src":"https://i.ibb.co/9VWVrqp/exchange-icon.png","alt":"Exchange admin center icon"},"type":"LINK"},"14":{"type":"IMAGE","mutability":"MUTABLE","data":{"src":"https://i.ibb.co/9VWVrqp/exchange-icon.png","targetOption":"_blank","width":"auto","alt":"Exchange admin center icon","height":"auto","url":"https://admin.exchange.microsoft.com/"}},"15":{"mutability":"MUTABLE","data":{"height":"auto","src":"https://i.ibb.co/LnWj2Yb/power-automate-icon.png","targetOption":"_blank","alt":"Power Automate admin center icon","url":"https://admin.exchange.microsoft.com/","width":"auto"},"type":"LINK"},"16":{"data":{"alt":"Power Automate admin center icon","width":"auto","url":"https://admin.powerplatform.microsoft.com/","src":"https://i.ibb.co/LnWj2Yb/power-automate-icon.png","targetOption":"_blank","height":"auto"},"mutability":"MUTABLE","type":"IMAGE"},"17":{"type":"LINK","mutability":"MUTABLE","data":{"height":"auto","url":"https://admin.powerplatform.microsoft.com/","src":"https://i.ibb.co/MpGbXrz/Office-install-icon.png","width":"auto","alt":"Microsoft 365 Apps Office configuration icon","targetOption":"_blank"}},"18":{"data":{"width":"auto","alt":"Microsoft 365 Apps Office configuration icon","targetOption":"_blank","src":"https://i.ibb.co/MpGbXrz/Office-install-icon.png","height":"auto","url":"https://config.office.com/officeSettings"},"type":"IMAGE","mutability":"MUTABLE"},"19":{"mutability":"MUTABLE","data":{"alt":"Power BI admin center icon","height":"auto","url":"https://config.office.com/officeSettings","src":"https://i.ibb.co/r6J58w1/Power-Bi-Admin-Center.png","targetOption":"_blank","width":"auto"},"type":"LINK"},"20":{"type":"LINK","mutability":"MUTABLE","data":{"src":"https://i.ibb.co/r6J58w1/Power-Bi-Admin-Center.png","alt":"Power BI admin center icon","width":"auto","url":"https://web.microsoftstream.com/admin","height":"auto","targetOption":"_blank"}},"21":{"data":{"height":"auto","width":"auto","src":"https://i.ibb.co/r6J58w1/Power-Bi-Admin-Center.png","targetOption":"_blank","alt":"Power BI admin center icon","url":"https://app.powerbi.com/admin-portal"},"type":"IMAGE","mutability":"MUTABLE"},"22":{"type":"LINK","data":{"src":"https://i.ibb.co/sHYV6Mz/security-admin-center-icon.png","url":"https://app.powerbi.com/admin-portal","width":"auto","alt":"Security center admin center","targetOption":"_blank","height":"auto"},"mutability":"MUTABLE"},"23":{"type":"IMAGE","data":{"targetOption":"_blank","width":"auto","url":"https://protection.office.com/","height":"auto","alt":"Security center admin center","src":"https://i.ibb.co/sHYV6Mz/security-admin-center-icon.png"},"mutability":"MUTABLE"},"24":{"data":{"width":"auto","src":"https://i.ibb.co/M2C4Jmh/sharepoint-admin-center-icon.png","alt":"SharePoint admin center","url":"https://protection.office.com/","height":"auto","targetOption":"_blank"},"type":"LINK","mutability":"MUTABLE"},"25":{"type":"IMAGE","mutability":"MUTABLE","data":{"targetOption":"_blank","alt":"SharePoint admin center","url":"https://admin.teams.microsoft.com/","src":"https://i.ibb.co/M2C4Jmh/sharepoint-admin-center-icon.png","height":"auto","width":"auto"}},"26":{"data":{"width":"auto","targetOption":"_blank","alt":"Microsoft Teams admin center icon","height":"auto","src":"https://i.ibb.co/dGJJV84/Teams-admin-center.png","url":"https://admin.teams.microsoft.com/"},"type":"IMAGE","mutability":"MUTABLE"},"27":{"data":{"url":"https://admin.teams.microsoft.com/","src":"https://i.ibb.co/zsz8HC5/Yammer-admin-center-icon.png","height":"auto","targetOption":"_blank","width":"auto","alt":"Yammer admin center icon"},"type":"LINK","mutability":"MUTABLE"},"28":{"data":{"src":"https://i.ibb.co/zsz8HC5/Yammer-admin-center-icon.png","width":"auto","height":"auto","alt":"Yammer admin center icon"},"type":"IMAGE","mutability":"MUTABLE"}}},"publish":true,"type":"article","pushlish":true,"featuredImage":"https://i.ibb.co/f1cr4zt/Microsoft-365-admin-centers.png","datePublished":"2022/5/26","images":["https://i.ibb.co/9W1SvwJ/microsoft-365-admin-center.png","https://i.ibb.co/6sMqT1z/Azure-ATP-Icon.png","https://i.ibb.co/6sMqT1z/Azure-ATP-Icon.png","https://i.ibb.co/HK83H6d/Azure-ad-icon.png","https://i.ibb.co/Jk3LPPL/compliance-icon.png","https://i.ibb.co/89kQWVH/endpoint-icon.png","https://i.ibb.co/9VWVrqp/exchange-icon.png","https://i.ibb.co/LnWj2Yb/power-automate-icon.png","https://i.ibb.co/MpGbXrz/Office-install-icon.png","https://i.ibb.co/r6J58w1/Power-Bi-Admin-Center.png","https://i.ibb.co/sHYV6Mz/security-admin-center-icon.png","https://i.ibb.co/M2C4Jmh/sharepoint-admin-center-icon.png","https://i.ibb.co/dGJJV84/Teams-admin-center.png","https://i.ibb.co/zsz8HC5/Yammer-admin-center-icon.png","https://i.ibb.co/hDbLPmR/Cloud-App-Security-admin-center-icon.png","https://i.ibb.co/f1cr4zt/Microsoft-365-admin-centers.png"],"id":"bzotoOjEe","title":"Managing the Microsoft 365 tenant - Introduction to the admin centers","slug":"Managing-the-Microsoft-365-tenant-Introduction-to-the-admin-centers-bzotoOjEe","sectionId":"qwJW5VrBW"},
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
