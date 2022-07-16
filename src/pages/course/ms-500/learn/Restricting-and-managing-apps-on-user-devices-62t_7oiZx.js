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
      course: {"title":"Training for MS-500: Microsoft Office 365 Security Admin","id":"MS-500","contentOrder":["cpchjBLkC","KKkBOVuS4","bzotoOjEe","cg_vxOX9L","uYCIPbnMC","7CpqFkPZU","rZzausKJ1","ky5W0Lz5P","i9pJIjTNH","S1hQgFOMV","2QfoI2HxY","V1en9Iugh","nAAIvNbtk","2S9jn0aLr","FldNualGC","NFQ6rYFeQ","rK48f6iM2","RHW1API2s","z8EMM9Eu_","Kye_yNLxA","EnPyp7ukN","6HUOr7qbL","GCOOUsSBT","GG4cMY8pK","z0qPG6v4T","LEyZMWBSt","7MQ3wE4wP","sH_Ee1DW1","vLweLmxZf","NsF7No40f","IsPGsme8w","wv2PbXnhI","7gR3L122b","ZyKX3Idjs","MAjW0a2_p","XFXu2zIS9","_LL9VqGZO","qDRA4jjoN","62t_7oiZx"],"description":"Learn, prepare and training for the Microsoft Microsoft Office 365 Exam MS-500: Microsoft 365 Security Administration MS-500 exam","sections":[{"title":"Introduction","id":"qwJW5VrBW","order":0},{"order":1,"title":"Securing identity and access to Microsoft 365","id":"AFV_acckJ"},{"order":2,"title":"Securing Microsoft 365, clouds, and on-premises environments","id":"QScYfSu74"},{"title":"Protecting your environment from accidental and malicious data loss","order":3,"id":"YhftdGIRX"},{"order":4,"id":"l0DxUuonW","title":"Protecting User devices using Intune"}],"audience":"Anyone who wants to learn about securing Microsoft 365"},
      article: {"publish":true,"id":"62t_7oiZx","featuredImage":"https://i.ibb.co/PCVRKDf/Add-an-Android-app-to-Intune.png","sectionId":"l0DxUuonW","type":"article","datePublished":"2022/6/22","article":{"blocks":[{"entityRanges":[],"data":{},"depth":0,"type":"unstyled","inlineStyleRanges":[],"text":"Now that we have devices set up in Intune and secure how do we start deploying, managing, and securing apps? Let's start by deploying an app to an Android device.","key":"dm85i"},{"key":"332cg","depth":0,"data":{},"entityRanges":[],"text":"How to deploy an app to an Android device","inlineStyleRanges":[],"type":"header-two"},{"type":"unstyled","text":"1. Go to Microsoft Endpoint Manager admin center > Apps > Android > Add. Set App type to Manage Google Play app. Click Select.","depth":0,"entityRanges":[{"length":8,"key":0,"offset":58}],"key":"5gis3","inlineStyleRanges":[{"offset":9,"style":"BOLD","length":39},{"length":5,"offset":51,"style":"BOLD"},{"offset":58,"style":"BOLD","length":7},{"style":"BOLD","offset":68,"length":3},{"style":"BOLD","offset":77,"length":8},{"style":"BOLD","offset":89,"length":22},{"style":"BOLD","offset":119,"length":6}],"data":{}},{"depth":0,"text":" ","entityRanges":[{"offset":0,"key":1,"length":1}],"data":{},"inlineStyleRanges":[],"key":"2ija8","type":"atomic"},{"entityRanges":[],"data":{},"type":"unstyled","depth":0,"key":"co18t","inlineStyleRanges":[{"style":"BOLD","length":7,"offset":55},{"style":"BOLD","offset":77,"length":8}],"text":"2. Search for the app you want to deploy, for example, Outlook. Click on the app icon."},{"depth":0,"inlineStyleRanges":[],"key":"4gten","type":"atomic","data":{},"text":" ","entityRanges":[{"length":1,"key":2,"offset":0}]},{"inlineStyleRanges":[{"offset":9,"length":8,"style":"BOLD"},{"style":"BOLD","length":7,"offset":19},{"style":"BOLD","length":5,"offset":29},{"length":4,"offset":36,"style":"BOLD"}],"type":"unstyled","text":"3. Click Approve > Approve > Done > Sync.","entityRanges":[],"data":{},"key":"899ce","depth":0},{"inlineStyleRanges":[],"type":"atomic","data":{},"text":" ","entityRanges":[{"offset":0,"length":1,"key":3}],"key":"fk1i","depth":0},{"key":"dv4er","inlineStyleRanges":[],"type":"unstyled","depth":0,"data":{},"text":"4. Wait 15 minutes then go to Apps > Android. (If the app still isn't there click Add > Set App type to Manage Google Play app. Click Select. Search and click on the app ","entityRanges":[]},{"depth":0,"data":{},"inlineStyleRanges":[],"key":"e0uo6","entityRanges":[{"length":1,"key":4,"offset":0}],"type":"atomic","text":" "},{"depth":0,"inlineStyleRanges":[{"offset":9,"length":13,"style":"BOLD"},{"style":"BOLD","offset":106,"length":8},{"offset":122,"style":"BOLD","length":13}],"type":"unstyled","text":"5. Click Add all users (or click Add group and add the group you want to deploy the app to) located under Required. Click Review + save.","key":"5f67q","data":{},"entityRanges":[]},{"depth":0,"entityRanges":[{"length":1,"key":5,"offset":0}],"inlineStyleRanges":[],"key":"e81nj","type":"atomic","text":" ","data":{}},{"inlineStyleRanges":[{"style":"BOLD","length":4,"offset":9}],"data":{},"depth":0,"entityRanges":[],"key":"cr98s","type":"unstyled","text":"6. Click Save."},{"depth":0,"inlineStyleRanges":[],"key":"f8dis","text":"Now when the users' Android decheck-ineck in they'll receive the new app.","type":"unstyled","entityRanges":[],"data":{}},{"inlineStyleRanges":[],"key":"57chd","entityRanges":[],"depth":0,"type":"header-two","data":{},"text":"Understanding assignments"},{"depth":0,"key":"cna0j","data":{},"entityRanges":[],"type":"unstyled","text":"Did you notice you could add your groups to three different sections under Assignments: Required, Available for enrolled devices, and Available with or without enrollment. Let's discuss those three sections","inlineStyleRanges":[{"length":8,"style":"BOLD","offset":88},{"offset":98,"style":"BOLD","length":30},{"style":"BOLD","offset":134,"length":36}]},{"inlineStyleRanges":[],"depth":0,"data":{},"type":"header-three","text":"Required","key":"5n6o6","entityRanges":[]},{"type":"unstyled","depth":0,"key":"2clvh","entityRanges":[],"inlineStyleRanges":[],"text":"Required will automatically download the app to the users' devices. They won't need to download, install, or do anything. The app will automatically be downloaded and installed on the users' devices.","data":{}},{"depth":0,"data":{},"type":"header-three","inlineStyleRanges":[],"key":"ba4in","text":"Available for enrolled devices","entityRanges":[]},{"key":"d4mrp","type":"unstyled","entityRanges":[],"inlineStyleRanges":[],"depth":0,"data":{},"text":"Available for enrolled devices will make the app available in the managed play store. In short, a user can go and download/install the app onto their device but it won't happen automatically."},{"data":{},"type":"header-three","key":"6io8s","entityRanges":[],"depth":0,"inlineStyleRanges":[],"text":"Available with or without enrollment"},{"depth":0,"data":{},"type":"unstyled","entityRanges":[],"text":"Available with or without enrollment will make the app available even if the user doesn't complete the enrollment process. In short, a user can install the Intune app on their device, sign in with their credentials and then not complete the enrollment process but the app would still be available to the user.","key":"7c8h8","inlineStyleRanges":[]},{"entityRanges":[],"text":"Configuring apps with the App configuration policies","depth":0,"key":"39epg","inlineStyleRanges":[],"type":"header-two","data":{}},{"inlineStyleRanges":[],"type":"unstyled","entityRanges":[],"depth":0,"data":{},"key":"fjl4b","text":"Some apps can even be configured through Intune. For example, in the last section, we installed Outlook on every user's device. Now that the app is installed the user would need to set up their mailbox in Outlook manually or we can create an app configuration policy to configure the app for us."},{"text":"1. Go to Microsoft Endpoint Manager admin center > Apps > App configuration policy > Add > Managed devices.","depth":0,"data":{},"key":"2u4","inlineStyleRanges":[{"style":"BOLD","length":39,"offset":9},{"style":"BOLD","length":5,"offset":51},{"style":"BOLD","offset":58,"length":24},{"style":"BOLD","length":4,"offset":85},{"length":15,"style":"BOLD","offset":91}],"type":"unstyled","entityRanges":[]},{"type":"atomic","entityRanges":[{"key":6,"length":1,"offset":0}],"inlineStyleRanges":[],"key":"dlta2","text":" ","depth":0,"data":{}},{"text":"2. Set the name to Setup Outlook. Set Platform to Android Enterprise. Profile Type: All Profile Types. Click Select app. Click Microsoft Outlook. Click OK > Next.","data":{},"entityRanges":[],"key":"ctsmh","depth":0,"inlineStyleRanges":[{"length":5,"offset":11,"style":"BOLD"},{"style":"BOLD","offset":19,"length":13},{"style":"BOLD","length":9,"offset":38},{"style":"BOLD","length":18,"offset":50},{"style":"BOLD","offset":70,"length":12},{"style":"BOLD","offset":84,"length":17},{"style":"BOLD","offset":109,"length":10},{"style":"BOLD","length":17,"offset":127},{"offset":152,"style":"BOLD","length":3},{"length":4,"style":"BOLD","offset":157}],"type":"unstyled"},{"inlineStyleRanges":[],"depth":0,"data":{},"entityRanges":[{"length":1,"offset":0,"key":7}],"type":"atomic","text":" ","key":"43kdr"},{"key":"4ctvi","entityRanges":[],"inlineStyleRanges":[{"length":4,"style":"BOLD","offset":40}],"data":{},"text":"3. Set the following options then click next.","depth":0,"type":"unstyled"},{"depth":0,"entityRanges":[],"inlineStyleRanges":[{"length":26,"offset":31,"style":"BOLD"}],"type":"unstyled","data":{},"text":"Configuration settings format: Use configuration designer","key":"bnt4r"},{"entityRanges":[],"data":{},"key":"84lgj","text":"Configure email account settings: Yes","type":"unstyled","inlineStyleRanges":[{"style":"BOLD","offset":34,"length":3}],"depth":0},{"key":"6i6a2","data":{},"entityRanges":[],"inlineStyleRanges":[{"offset":21,"length":21,"style":"BOLD"}],"type":"unstyled","text":"Authentication type: Modern authentication","depth":0},{"entityRanges":[],"key":"1e6fd","depth":0,"text":"Username attribute from AAD: User Principal Name","data":{},"type":"unstyled","inlineStyleRanges":[{"length":19,"style":"BOLD","offset":29}]},{"data":{},"depth":0,"text":"Email address attribute from AAD: Primary SMTP Address","type":"unstyled","inlineStyleRanges":[{"offset":34,"style":"BOLD","length":20}],"entityRanges":[],"key":"c0csv"},{"entityRanges":[{"key":8,"length":1,"offset":0}],"inlineStyleRanges":[],"type":"atomic","text":" ","depth":0,"key":"7dauq","data":{}},{"depth":0,"key":"ccv51","type":"unstyled","inlineStyleRanges":[{"offset":9,"style":"BOLD","length":13},{"style":"BOLD","offset":120,"length":4}],"text":"4. Click Add all users or select the same group you set in the How to deploy an app to an Android device section. Click Next.","entityRanges":[],"data":{}},{"entityRanges":[],"data":{},"type":"unstyled","text":"5. Click Create.","depth":0,"key":"174cg","inlineStyleRanges":[{"style":"BOLD","offset":9,"length":6}]},{"text":"Now when an Android device syncs with Intune the user will automatically receive the Outlook app and the app will be configured for them.","depth":0,"entityRanges":[],"data":{},"key":"at59q","inlineStyleRanges":[],"type":"unstyled"},{"entityRanges":[],"depth":0,"text":"How to protect apps and isolate data","inlineStyleRanges":[],"key":"d0eip","data":{},"type":"header-two"},{"depth":0,"entityRanges":[],"text":"Now that we have Outlook installed and configured on your user devices how do we isolate and protect the company data stored in Outlook that's cached and accessible on the user device? With app protection policies of course!","key":"9spgb","data":{},"inlineStyleRanges":[],"type":"unstyled"},{"depth":0,"inlineStyleRanges":[{"offset":9,"length":39,"style":"BOLD"},{"offset":51,"length":5,"style":"BOLD"},{"offset":58,"length":21,"style":"BOLD"},{"style":"BOLD","offset":82,"length":13},{"offset":98,"length":7,"style":"BOLD"}],"type":"unstyled","text":"1. Go to Microsoft Endpoint Manager admin center > Apps > App protection policy > Create policy > Android.","entityRanges":[],"key":"4bjl3","data":{}},{"data":{},"text":" ","inlineStyleRanges":[],"key":"97n1t","depth":0,"entityRanges":[{"key":9,"length":1,"offset":0}],"type":"atomic"},{"key":"6p7ka","text":"2. Name the policy: \"Protect Microsoft Apps\". Click Next.","data":{},"entityRanges":[],"type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":21,"length":22,"style":"BOLD"},{"offset":52,"style":"BOLD","length":4}]},{"type":"unstyled","data":{},"inlineStyleRanges":[{"style":"BOLD","offset":11,"length":17},{"offset":40,"style":"BOLD","length":18},{"style":"BOLD","offset":66,"length":4}],"text":"3. Set the Target policy to dropdown to All Microsoft Apps. Click Next.","key":"fe8ji","depth":0,"entityRanges":[]},{"entityRanges":[{"key":10,"offset":0,"length":1}],"text":" ","data":{},"key":"59ukp","depth":0,"inlineStyleRanges":[],"type":"atomic"},{"text":"4. Set the following options then click Next.","entityRanges":[],"inlineStyleRanges":[{"length":4,"offset":40,"style":"BOLD"}],"depth":0,"type":"unstyled","data":{},"key":"fqcgm"},{"depth":0,"key":"619r7","text":"Backup org data to Android backup services: Block","data":{},"type":"unstyled","inlineStyleRanges":[{"length":5,"style":"BOLD","offset":44}],"entityRanges":[]},{"text":"Send org data to other apps: Policy managed apps","type":"unstyled","inlineStyleRanges":[{"style":"BOLD","length":19,"offset":29}],"entityRanges":[],"data":{},"key":"bluoa","depth":0},{"data":{},"key":"e4c7g","depth":0,"entityRanges":[],"inlineStyleRanges":[{"style":"BOLD","offset":6,"length":7}],"type":"unstyled","text":"Click Select (next to select apps to exempt)."},{"type":"unstyled","text":"Name: Webex","key":"aglbb","data":{},"inlineStyleRanges":[{"offset":6,"style":"BOLD","length":5}],"entityRanges":[],"depth":0},{"depth":0,"text":"Value: com.cisco.webex.meetings","key":"dqqen","inlineStyleRanges":[{"length":24,"offset":7,"style":"BOLD"}],"entityRanges":[],"data":{},"type":"unstyled"},{"type":"atomic","inlineStyleRanges":[],"depth":0,"text":" ","key":"1d5g4","entityRanges":[{"key":11,"length":1,"offset":0}],"data":{}},{"inlineStyleRanges":[{"style":"BOLD","length":4,"offset":41}],"type":"unstyled","depth":0,"entityRanges":[],"key":"dhflp","data":{},"text":"5. On the Access requirements page click Next."},{"inlineStyleRanges":[{"offset":40,"length":4,"style":"BOLD"}],"type":"unstyled","text":"6. On the Conditional launch page click Next.","entityRanges":[],"key":"7pdv1","data":{},"depth":0},{"inlineStyleRanges":[{"style":"BOLD","offset":166,"length":5},{"length":6,"style":"BOLD","offset":173}],"entityRanges":[],"type":"unstyled","text":"7. On the Assignments page select your group. (you can't select all users on app protection policies. You can, however, create a dynamic group with all users). Click Next > Create.","key":"1cj5r","data":{},"depth":0},{"inlineStyleRanges":[{"style":"ITALIC","length":89,"offset":0}],"depth":0,"key":"992pk","data":{},"text":"NOTE: You can't apply app protection policies to devices. They must be assigned to users.","type":"unstyled","entityRanges":[]},{"type":"unstyled","key":"1ok1u","inlineStyleRanges":[],"text":"Now your users won't be able to send data to any app that isn't managed by the policy or Webex. The users will also be required to enter a pin to access their Microsoft apps.","entityRanges":[],"data":{},"depth":0},{"type":"unstyled","key":"ahcf7","entityRanges":[],"depth":0,"data":{},"inlineStyleRanges":[],"text":"One final note, App protection policies that apply to Microsoft 365 apps, for example, Power BI, will protect apps even if the user is on an unmanaged device."},{"type":"header-two","entityRanges":[],"inlineStyleRanges":[],"depth":0,"data":{},"text":"Limit access to unmanaged devices","key":"fvnbh"},{"key":"f49bc","text":"Now, let's say not everyone in your organization will receive Intune. But you don't want those devices doing everything in Exchange Online. Maybe you want them to read email on these devices but you don't want them to download attachments or enable offline mode. Let's set that up.","type":"unstyled","inlineStyleRanges":[],"data":{},"depth":0,"entityRanges":[]},{"depth":0,"inlineStyleRanges":[],"key":"ch0oh","text":"1. create a conditional access policy with the following settings:","entityRanges":[],"data":{},"type":"unstyled"},{"inlineStyleRanges":[{"length":4,"style":"BOLD","offset":0}],"entityRanges":[],"key":"d8sg6","text":"Name: Unmanaged Devices","data":{},"depth":0,"type":"unstyled"},{"entityRanges":[],"data":{},"key":"emoth","depth":0,"inlineStyleRanges":[{"style":"BOLD","length":28,"offset":0}],"type":"unstyled","text":"Users or workload identities: Set to the group that will use unmanaged devices."},{"depth":0,"key":"966pu","entityRanges":[],"text":"Cloud apps: Office 365 Exchange Online","type":"unstyled","inlineStyleRanges":[{"length":10,"offset":0,"style":"BOLD"}],"data":{}},{"key":"758tq","type":"unstyled","entityRanges":[],"depth":0,"inlineStyleRanges":[{"offset":0,"length":7,"style":"BOLD"}],"data":{},"text":"Session: Use app-enforced restrictions"},{"depth":0,"type":"atomic","text":" ","data":{},"inlineStyleRanges":[],"entityRanges":[{"length":1,"offset":0,"key":12}],"key":"7rd31"},{"key":"oa96","data":{},"depth":0,"entityRanges":[],"inlineStyleRanges":[],"text":"2. Run the following in PowerShell:","type":"unstyled"},{"type":"code","entityRanges":[],"depth":0,"data":{},"inlineStyleRanges":[],"text":"Connect-ExchangeOnline\nNew-OwaMailboxPolicy LimitUnmanagedDevices\nSet-OwaMailboxPolicy LimitUnmanagedDevices -ConditionalAccessPolicy ReadOnly","key":"8nr43"},{"inlineStyleRanges":[],"data":{},"text":"3. Set the OWA mailbox policy on the mailboxes.","entityRanges":[],"type":"unstyled","depth":0,"key":"627ot"},{"type":"unstyled","data":{},"text":"Go to Exchange admin center > Classic Exchange admin center  > recipients > mailboxes. Select the mailbox > mailbox features > View details (under Outlook on the web). Click browse > select LimitUnmanagedDevices > OK > Save.","depth":0,"inlineStyleRanges":[{"offset":6,"style":"BOLD","length":21},{"offset":30,"length":29,"style":"BOLD"},{"offset":63,"style":"BOLD","length":11},{"style":"BOLD","length":9,"offset":76},{"style":"BOLD","length":8,"offset":98},{"offset":108,"length":16,"style":"BOLD"},{"offset":127,"style":"BOLD","length":12},{"style":"BOLD","length":7,"offset":174},{"length":22,"offset":190,"style":"BOLD"},{"style":"BOLD","offset":214,"length":3},{"offset":219,"style":"BOLD","length":4}],"entityRanges":[{"offset":30,"length":29,"key":13}],"key":"f554n"},{"text":" ","entityRanges":[{"length":1,"offset":0,"key":14}],"inlineStyleRanges":[],"type":"atomic","key":"37fr8","data":{},"depth":0},{"inlineStyleRanges":[],"text":"Windows information protection","type":"header-two","key":"5a5pq","entityRanges":[],"data":{},"depth":0},{"data":{},"type":"unstyled","key":"75jqb","text":"Windows Information Protection (WIP), formally known as enterprise data protection (EDP), helps to protect against potential data leakage without interfering with the employee's work. In short, it prevents data from leaving apps protected by an app protection policy on Windows 10 devices. It works just like the App protection policy for Android we created above. It will prevent data from leaving the protected app. There are 4 settings:","entityRanges":[],"inlineStyleRanges":[],"depth":0},{"text":"Block: Will completely block data from leaving the protected apps","depth":0,"data":{},"entityRanges":[],"inlineStyleRanges":[{"offset":0,"style":"BOLD","length":5}],"key":"c03df","type":"unordered-list-item"},{"inlineStyleRanges":[{"offset":0,"style":"BOLD","length":15}],"entityRanges":[],"key":"a8ap8","data":{},"depth":0,"type":"unordered-list-item","text":"Allow Overrides: The user will receive a prompt will moving data from a protected to a non-protected app. If the user chooses to move the data regardless of the prompt the action will be logged."},{"text":"Silent: The user will be allowed to move data from the protected apps but it will be logged.","inlineStyleRanges":[{"offset":0,"style":"BOLD","length":6}],"data":{},"entityRanges":[],"key":"6bje6","depth":0,"type":"unordered-list-item"},{"type":"unordered-list-item","key":"fauqq","data":{},"text":"Off: The user will be allowed to move data from the protected apps and the action will not be logged.","inlineStyleRanges":[{"length":3,"style":"BOLD","offset":0},{"style":"color-rgb(33,37,41)","length":96,"offset":5},{"style":"bgcolor-rgb(255,255,255)","length":96,"offset":5},{"style":"fontsize-16","length":96,"offset":5},{"offset":5,"length":96,"style":"fontfamily-system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", \"Liberation Sans\", sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji"}],"entityRanges":[],"depth":0},{"entityRanges":[],"depth":0,"text":"Just like app protection policies in Android in Windows you need to select which apps are protected. You can also exempt apps. For example, you can create a policy to protect Microsoft Teams, then you can exclude Office ProPlus. With this configuration, users won't be able to remove data from Microsoft Teams except to the Office suite.","key":"c8dnf","inlineStyleRanges":[{"style":"color-rgb(33,37,41)","length":337,"offset":0},{"offset":0,"style":"bgcolor-rgb(255,255,255)","length":337},{"length":337,"style":"fontsize-16","offset":0},{"style":"fontfamily-system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", \"Liberation Sans\", sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji","offset":0,"length":337}],"data":{},"type":"unstyled"}],"entityMap":{"0":{"type":"LINK","mutability":"MUTABLE","data":{"url":"https://endpoint.microsoft.com/?ref=AdminCenter#blade/Microsoft_Intune_DeviceSettings/AppsAndroidMenu/androidApps","targetOption":"_blank"}},"1":{"data":{"alignment":"none","src":"https://i.ibb.co/PCVRKDf/Add-an-Android-app-to-Intune.png","width":"auto","height":"auto","alt":"Add an Android app to Intune"},"type":"IMAGE","mutability":"MUTABLE"},"2":{"data":{"height":"auto","alt":"Select outlook in the app selection","alignment":"none","width":"auto","src":"https://i.ibb.co/56RM4mY/select-outlook-in-the-app-selection.png"},"type":"IMAGE","mutability":"MUTABLE"},"3":{"mutability":"MUTABLE","type":"IMAGE","data":{"width":"auto","src":"https://i.ibb.co/VvzLtY2/approve-the-app.png","alt":"Approve the app","alignment":"none","height":"auto"}},"4":{"data":{"src":"https://i.ibb.co/Q69pRsR/Assign-the-app.png","alt":"Assign the app","height":"auto","width":"auto","alignment":"none"},"mutability":"MUTABLE","type":"IMAGE"},"5":{"mutability":"MUTABLE","type":"IMAGE","data":{"alignment":"none","width":"auto","height":"auto","alt":"Assign to all users","src":"https://i.ibb.co/Ny4rpWg/Assign-to-all-users.png"}},"6":{"data":{"height":"auto","width":"auto","src":"https://i.ibb.co/98k1njW/Create-an-app-configuration-policy.png","alignment":"none","alt":"Create an app configuration policy"},"type":"IMAGE","mutability":"MUTABLE"},"7":{"data":{"alt":"Set up App Configuration policy Basics","src":"https://i.ibb.co/WPv7R5g/Set-up-App-Configuration-policy-Basics.png","alignment":"none","width":"auto","height":"auto"},"mutability":"MUTABLE","type":"IMAGE"},"8":{"mutability":"MUTABLE","data":{"height":"auto","width":"auto","alt":"Create app configuration policy - Settings","src":"https://i.ibb.co/BsXT1tZ/Create-app-configuration-policy-Settings.png","alignment":"none"},"type":"IMAGE"},"9":{"data":{"src":"https://i.ibb.co/7nmGbsm/create-an-app-protection-policy.png","alignment":"none","width":"auto","height":"auto","alt":"Create an app protection policy"},"type":"IMAGE","mutability":"MUTABLE"},"10":{"type":"IMAGE","mutability":"MUTABLE","data":{"alignment":"none","height":"auto","width":"auto","alt":"Create App protection policy - Apps","src":"https://i.ibb.co/qFPWBbn/Create-App-protection-policy-Apps.png"}},"11":{"type":"IMAGE","data":{"alt":"App protection policy - Data protection","src":"https://i.ibb.co/cy9zXyZ/App-protection-policy-Data-protection.png","height":"auto","width":"auto","alignment":"none"},"mutability":"MUTABLE"},"12":{"mutability":"MUTABLE","type":"IMAGE","data":{"alignment":"none","width":"auto","src":"https://i.ibb.co/b6KtMZt/conditional-access-policy.png","alt":"Conditional access policy","height":"auto"}},"13":{"data":{"targetOption":"_blank","url":"https://outlook.office365.com/ecp/?form=eac&mkt=en-US"},"mutability":"MUTABLE","type":"LINK"},"14":{"type":"IMAGE","data":{"alignment":"none","width":"auto","src":"https://i.ibb.co/7GtPn4V/set-owa-mailbox-policy.png","alt":"Set OWA Mailbox policy","height":"auto"},"mutability":"MUTABLE"}}},"description":"Now that we have devices set up in Intune and secure how do we start deploying, managing, and securing apps? Let's start by deploying an app to an Android device.","images":["https://i.ibb.co/PCVRKDf/Add-an-Android-app-to-Intune.png","https://i.ibb.co/56RM4mY/select-outlook-in-the-app-selection.png","https://i.ibb.co/VvzLtY2/approve-the-app.png","https://i.ibb.co/Q69pRsR/Assign-the-app.png","https://i.ibb.co/Ny4rpWg/Assign-to-all-users.png","https://i.ibb.co/98k1njW/Create-an-app-configuration-policy.png","https://i.ibb.co/WPv7R5g/Set-up-App-Configuration-policy-Basics.png","https://i.ibb.co/BsXT1tZ/Create-app-configuration-policy-Settings.png","https://i.ibb.co/7nmGbsm/create-an-app-protection-policy.png","https://i.ibb.co/qFPWBbn/Create-App-protection-policy-Apps.png","https://i.ibb.co/cy9zXyZ/App-protection-policy-Data-protection.png","https://i.ibb.co/b6KtMZt/conditional-access-policy.png","https://i.ibb.co/7GtPn4V/set-owa-mailbox-policy.png"],"slug":"Restricting-and-managing-apps-on-user-devices-62t_7oiZx","title":"Restricting and managing apps on user devices"},
      articles: [{"id":"cpchjBLkC","sectionId":"qwJW5VrBW","slug":"Whats-in-this-course-cpchjBLkC","title":"What's in this course?","featuredImage":"https://i.ibb.co/zFs9Vfb/microsoft365-security-administrator-associate-600x600.png"},{"id":"KKkBOVuS4","sectionId":"qwJW5VrBW","slug":"Creating-a-free-Microsoft-365-tenant-for-practice-KKkBOVuS4","title":"Creating a free Microsoft 365 tenant for practice","featuredImage":"https://i.ibb.co/F07sjQJ/microsoft-365-e5-trial.png"},{"id":"bzotoOjEe","sectionId":"qwJW5VrBW","slug":"Managing-the-Microsoft-365-tenant-Introduction-to-the-admin-centers-bzotoOjEe","title":"Managing the Microsoft 365 tenant - Introduction to the admin centers","featuredImage":"https://i.ibb.co/f1cr4zt/Microsoft-365-admin-centers.png"},{"id":"cg_vxOX9L","sectionId":"qwJW5VrBW","slug":"Managing-Microsoft-365-through-PowerShell-cg_vxOX9L","title":"Managing Microsoft 365 through PowerShell","featuredImage":"https://i.ibb.co/HV13YF6/install-microsoft-365-powershell-modules.png"},{"id":"uYCIPbnMC","sectionId":"AFV_acckJ","slug":"How-to-create-users-in-Microsoft-365-Cloud-Only-uYCIPbnMC","title":"How to create users in Microsoft 365 Cloud Only","featuredImage":"https://i.ibb.co/Wnt5Q43/View-Microsoft-365-Users.png"},{"id":"7CpqFkPZU","sectionId":"AFV_acckJ","slug":"Creating-and-managing-admins-through-roles-7CpqFkPZU","title":"Creating and managing admins through roles","featuredImage":"https://i.ibb.co/kySL4HQ/Roles-and-administrators.png"},{"id":"rZzausKJ1","sectionId":"AFV_acckJ","slug":"Time-limited-admin-roles-in-Microsoft-365-rZzausKJ1","title":"Time limited admin roles in Microsoft 365","featuredImage":"https://i.ibb.co/nDvjyPD/select-member-to-add-to-PIM-role.png"},{"id":"ky5W0Lz5P","sectionId":"AFV_acckJ","slug":"Whats-AD-Connect-ky5W0Lz5P","title":"What's AD Connect","featuredImage":"https://i.ibb.co/7nDqr9x/Whats-AD-Connect.png"},{"id":"i9pJIjTNH","sectionId":"AFV_acckJ","slug":"Protecting-Passwords-in-Microsoft-365-i9pJIjTNH","title":"Protecting Passwords in Microsoft 365","featuredImage":"https://i.ibb.co/DLD4G4q/access-smart-lockout-settings.png"},{"id":"S1hQgFOMV","sectionId":"AFV_acckJ","slug":"Creating-and-managing-users-through-groups-S1hQgFOMV","title":"Creating and managing users through groups","featuredImage":"https://i.ibb.co/nmmC28M/add-a-group-microsoft-365.png"},{"id":"2QfoI2HxY","sectionId":"AFV_acckJ","slug":"Securing-and-implementing-enterprise-applications-2QfoI2HxY","title":"Securing and implementing enterprise applications","featuredImage":"https://i.ibb.co/C2mp69m/disable-user-consent.png"},{"id":"V1en9Iugh","sectionId":"AFV_acckJ","slug":"Whats-a-conditional-access-policy-V1en9Iugh","title":"What's a conditional access policy?","featuredImage":"https://i.ibb.co/DQm1sY0/Create-conditional-access-policy.png"},{"id":"nAAIvNbtk","sectionId":"AFV_acckJ","slug":"The-many-ways-to-implement-multi-factor-authentication-MFA-in-Microsoft-365-nAAIvNbtk","title":"The many ways to implement multi-factor authentication (MFA) in Microsoft 365","featuredImage":"https://i.ibb.co/P1P0wNY/microsoft-365-manage-security-defaults.png"},{"id":"2S9jn0aLr","sectionId":"AFV_acckJ","slug":"Implement-Self-service-password-reset-in-Microsoft-365-2S9jn0aLr","title":"Implement Self-service password reset in Microsoft 365","featuredImage":"https://i.ibb.co/58y9JVg/write-back-passwords-to-on-premises-directory.png"},{"id":"FldNualGC","sectionId":"AFV_acckJ","slug":"Locking-down-your-Microsoft-365-tenant-from-Microsoft-engineers-FldNualGC","title":"Locking down your Microsoft 365 tenant from Microsoft engineers","featuredImage":"https://i.ibb.co/DCmpnT9/Enable-Customer-Lockbox.png"},{"id":"NFQ6rYFeQ","sectionId":"AFV_acckJ","slug":"Implementing-intelligent-security-using-risk-policies-in-Microsoft-365-NFQ6rYFeQ","title":"Implementing intelligent security using risk policies in Microsoft 365","featuredImage":"https://i.ibb.co/0cyQJ7j/Risk-Detections.png"},{"id":"rK48f6iM2","sectionId":"AFV_acckJ","slug":"Automating-Access-Review-in-Microsoft-365-rK48f6iM2","title":"Automating Access Review in Microsoft 365","featuredImage":"https://i.ibb.co/Xsxvz6Z/new-access-review.png"},{"id":"RHW1API2s","sectionId":"AFV_acckJ","slug":"Just-in-time-approval-and-notification-for-admin-roles-in-Microsoft-365-RHW1API2s","title":"Just in time, approval and notification for admin roles in Microsoft 365","featuredImage":"https://i.ibb.co/dcb6XFN/Activate-a-Role.png"},{"id":"z8EMM9Eu_","sectionId":"QScYfSu74","slug":"Whats-Microsoft-365-Defender-z8EMM9Eu_","title":"What's Microsoft 365 Defender?","featuredImage":"https://i.ibb.co/MDMyDQt/Microsoft-Defender.png"},{"id":"Kye_yNLxA","sectionId":"QScYfSu74","slug":"Whats-Microsoft-Defender-for-identity-Kye_yNLxA","title":"What's Microsoft Defender for identity?","featuredImage":"https://i.ibb.co/bQDBh0Y/Defender-for-Identity-Timeline.png"},{"id":"EnPyp7ukN","sectionId":"QScYfSu74","slug":"Whats-Microsoft-Defender-for-Office-365-EnPyp7ukN","title":"What's Microsoft Defender for Office 365?","featuredImage":"https://i.ibb.co/WcwKY2G/Microsoft-365-incidents-and-alerts.png"},{"id":"6HUOr7qbL","sectionId":"QScYfSu74","slug":"Protect-your-email-environment-from-malicious-actors-6HUOr7qbL","title":"Protect your email and Office environment from malicious actors","featuredImage":"https://i.ibb.co/Df0KQVp/Reports.png"},{"id":"GCOOUsSBT","sectionId":"QScYfSu74","slug":"Protecting-email-against-phishing-attacks-GCOOUsSBT","title":"Protecting email against phishing attacks","featuredImage":"https://i.ibb.co/GCjZHWg/edit-actions.png"},{"id":"GG4cMY8pK","sectionId":"QScYfSu74","slug":"Simulating-attacks-with-Microsoft-365-GG4cMY8pK","title":"Simulating attacks with Microsoft 365","featuredImage":"https://i.ibb.co/NyvnbMK/simulation-overview-view-users-circled.png"},{"id":"z0qPG6v4T","sectionId":"QScYfSu74","slug":"Protecting-Windows-10-and-other-devices-with-Microsoft-Defender-for-Endpoint-z0qPG6v4T","title":"Protecting Windows 10 and other devices with Microsoft Defender for Endpoint","featuredImage":"https://i.ibb.co/T47Xhyh/enable-endpoint-connections.png"},{"id":"LEyZMWBSt","sectionId":"QScYfSu74","slug":"Collect-detect-investigate-and-respond-to-security-threats-using-Microsoft-Sentinel-LEyZMWBSt","title":"Collect, detect, investigate, and respond to security threats using Microsoft Sentinel","featuredImage":"https://i.ibb.co/qN9XsKj/Add-Workbook.png"},{"id":"7MQ3wE4wP","sectionId":"QScYfSu74","slug":"Implement-and-manage-Microsoft-Defender-for-Cloud-Apps-7MQ3wE4wP","title":"Implement and manage Microsoft Defender for Cloud Apps","featuredImage":"https://i.ibb.co/7g7LvFg/office-365-cloud-apps-settings.png"},{"id":"sH_Ee1DW1","sectionId":"QScYfSu74","slug":"Auditing-sign-ins-and-other-actions-in-Microsoft-365-sH_Ee1DW1","title":"Auditing sign-ins and other actions in Microsoft 365","featuredImage":"https://i.ibb.co/BqMw3jZ/Start-recording-user-and-admin-activity.png"},{"id":"vLweLmxZf","sectionId":"YhftdGIRX","slug":"How-to-classify-data-using-labels-in-Microsoft-365-vLweLmxZf","title":"How to classify data using labels in Microsoft 365","featuredImage":"https://i.ibb.co/k9nhWS5/Choose-protection-settings-for-files-and-emails.png"},{"id":"NsF7No40f","sectionId":"YhftdGIRX","slug":"Creating-and-managing-data-retention-to-conform-to-compliance-NsF7No40f","title":"Creating and managing data retention to conform to compliance","featuredImage":"https://i.ibb.co/yqC0ZdY/New-Retention-Policy.png"},{"id":"IsPGsme8w","sectionId":"YhftdGIRX","slug":"Preventing-accidental-and-malicious-data-loss-with-DLP-policies-IsPGsme8w","title":"Preventing accidental and malicious data loss with DLP policies","featuredImage":"https://i.ibb.co/n8WcqKM/Create-a-DLP-policy.png"},{"id":"wv2PbXnhI","sectionId":"YhftdGIRX","slug":"Everything-you-need-to-know-about-securing-SharePoint-Online-for-the-MS-500-wv2PbXnhI","title":"Everything you need to know about securing SharePoint Online for the MS-500","featuredImage":"https://i.ibb.co/Gk9NjSH/Share-Point-Online-Warning.png"},{"id":"7gR3L122b","sectionId":"l0DxUuonW","slug":"Introduction-to-Intune-7gR3L122b","title":"Introduction to Intune","featuredImage":"https://i.ibb.co/Fq3N8BX/Endpoint-Manager-Admin-Center.png"},{"id":"ZyKX3Idjs","sectionId":"l0DxUuonW","slug":"Setting-up-Android-Devices-ZyKX3Idjs","title":"Setting up Android Devices","featuredImage":"https://i.ibb.co/m0BYhL2/Connect-Intune-to-Google-Play.png"},{"id":"MAjW0a2_p","sectionId":"l0DxUuonW","slug":"Setting-up-Apple--iOS-devices-in-Intune-MAjW0a2_p","title":"Setting up Apple / iOS devices in Intune","featuredImage":"https://i.ibb.co/X7Ffb2B/Setup-Apple-Enrollment-in-Intune.png"},{"id":"XFXu2zIS9","sectionId":"l0DxUuonW","slug":"Setting-up-Windows-10-devices-in-Intune-XFXu2zIS9","title":"Setting up Windows 10 devices in Intune","featuredImage":"https://i.ibb.co/WDXKVjW/configure-device-options.png"},{"id":"_LL9VqGZO","sectionId":"l0DxUuonW","slug":"How-to-manage-devices-using-Intune-_LL9VqGZO","title":"How to manage devices using Intune","featuredImage":"https://i.ibb.co/HPQ2m8t/Create-an-endpoint-protection-profile.png"},{"id":"qDRA4jjoN","sectionId":"l0DxUuonW","slug":"Understanding-compliance-policies-qDRA4jjoN","title":"Understanding compliance policies","featuredImage":"https://i.ibb.co/N3Qk57v/Create-a-compliance-policy.png"},{"id":"62t_7oiZx","sectionId":"l0DxUuonW","slug":"Restricting-and-managing-apps-on-user-devices-62t_7oiZx","title":"Restricting and managing apps on user devices","featuredImage":"https://i.ibb.co/PCVRKDf/Add-an-Android-app-to-Intune.png"}],
      articleHtml: `<p>Now that we have devices set up in Intune and secure how do we start deploying, managing, and securing apps? Let's start by deploying an app to an Android device.</p>
<h2>How to deploy an app to an Android device</h2>
<p>1. Go to <strong>Microsoft Endpoint Manager admin center</strong> &gt; <strong>Apps </strong>&gt; <a href="https://endpoint.microsoft.com/?ref=AdminCenter#blade/Microsoft_Intune_DeviceSettings/AppsAndroidMenu/androidApps" target="_blank"><strong>Android</strong> </a>&gt; <strong>Add</strong>. Set <strong>App type</strong> to <strong>Manage Google Play app</strong>. Click <strong>Select</strong>.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/PCVRKDf/Add-an-Android-app-to-Intune.png" alt="Add an Android app to Intune" style="height: auto;width: auto"/></div>
<p>2. Search for the app you want to deploy, for example, <strong>Outlook</strong>. Click on the <strong>app icon</strong>.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/56RM4mY/select-outlook-in-the-app-selection.png" alt="Select outlook in the app selection" style="height: auto;width: auto"/></div>
<p>3. Click <strong>Approve </strong>&gt; <strong>Approve</strong> &gt; <strong>Done </strong>&gt; <strong>Sync</strong>.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/VvzLtY2/approve-the-app.png" alt="Approve the app" style="height: auto;width: auto"/></div>
<p>4. Wait 15 minutes then go to Apps &gt; Android. (If the app still isn't there click Add &gt; Set App type to Manage Google Play app. Click Select. Search and click on the app&nbsp;</p>
<div style="text-align:none;"><img src="https://i.ibb.co/Q69pRsR/Assign-the-app.png" alt="Assign the app" style="height: auto;width: auto"/></div>
<p>5. Click <strong>Add all users</strong> (or click Add group and add the group you want to deploy the app to) located under <strong>Required</strong>. Click <strong>Review + save</strong>.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/Ny4rpWg/Assign-to-all-users.png" alt="Assign to all users" style="height: auto;width: auto"/></div>
<p>6. Click <strong>Save</strong>.</p>
<p>Now when the users' Android decheck-ineck in they'll receive the new app.</p>
<h2>Understanding assignments</h2>
<p>Did you notice you could add your groups to three different sections under Assignments: <strong>Required</strong>, <strong>Available for enrolled devices</strong>, and <strong>Available with or without enrollment</strong>. Let's discuss those three sections</p>
<h3>Required</h3>
<p>Required will automatically download the app to the users' devices. They won't need to download, install, or do anything. The app will automatically be downloaded and installed on the users' devices.</p>
<h3>Available for enrolled devices</h3>
<p>Available for enrolled devices will make the app available in the managed play store. In short, a user can go and download/install the app onto their device but it won't happen automatically.</p>
<h3>Available with or without enrollment</h3>
<p>Available with or without enrollment will make the app available even if the user doesn't complete the enrollment process. In short, a user can install the Intune app on their device, sign in with their credentials and then not complete the enrollment process but the app would still be available to the user.</p>
<h2>Configuring apps with the App configuration policies</h2>
<p>Some apps can even be configured through Intune. For example, in the last section, we installed Outlook on every user's device. Now that the app is installed the user would need to set up their mailbox in Outlook manually or we can create an app configuration policy to configure the app for us.</p>
<p>1. Go to <strong>Microsoft Endpoint Manager admin center</strong> &gt; <strong>Apps </strong>&gt; <strong>App configuration policy</strong> &gt; <strong>Add </strong>&gt; <strong>Managed devices</strong>.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/98k1njW/Create-an-app-configuration-policy.png" alt="Create an app configuration policy" style="height: auto;width: auto"/></div>
<p>2. Set the <strong>name </strong>to <strong>Setup Outlook</strong>. Set <strong>Platform </strong>to <strong>Android Enterprise</strong>. <strong>Profile Type</strong>: <strong>All Profile Types</strong>. Click <strong>Select app</strong>. Click <strong>Microsoft Outlook</strong>. Click <strong>OK </strong>&gt; <strong>Next</strong>.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/WPv7R5g/Set-up-App-Configuration-policy-Basics.png" alt="Set up App Configuration policy Basics" style="height: auto;width: auto"/></div>
<p>3. Set the following options then click <strong>next</strong>.</p>
<p>Configuration settings format: <strong>Use configuration designer</strong></p>
<p>Configure email account settings: <strong>Yes</strong></p>
<p>Authentication type: <strong>Modern authentication</strong></p>
<p>Username attribute from AAD: <strong>User Principal Name</strong></p>
<p>Email address attribute from AAD: <strong>Primary SMTP Address</strong></p>
<div style="text-align:none;"><img src="https://i.ibb.co/BsXT1tZ/Create-app-configuration-policy-Settings.png" alt="Create app configuration policy - Settings" style="height: auto;width: auto"/></div>
<p>4. Click <strong>Add all users</strong> or select the same group you set in the How to deploy an app to an Android device section. Click <strong>Next</strong>.</p>
<p>5. Click <strong>Create</strong>.</p>
<p>Now when an Android device syncs with Intune the user will automatically receive the Outlook app and the app will be configured for them.</p>
<h2>How to protect apps and isolate data</h2>
<p>Now that we have Outlook installed and configured on your user devices how do we isolate and protect the company data stored in Outlook that's cached and accessible on the user device? With app protection policies of course!</p>
<p>1. Go to <strong>Microsoft Endpoint Manager admin center</strong> &gt; <strong>Apps </strong>&gt; <strong>App protection policy</strong> &gt; <strong>Create policy</strong> &gt; <strong>Android</strong>.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/7nmGbsm/create-an-app-protection-policy.png" alt="Create an app protection policy" style="height: auto;width: auto"/></div>
<p>2. Name the policy: "<strong>Protect Microsoft Apps</strong>". Click <strong>Next</strong>.</p>
<p>3. Set the <strong>Target policy to </strong>dropdown to <strong>All Microsoft Apps</strong>. Click <strong>Next</strong>.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/qFPWBbn/Create-App-protection-policy-Apps.png" alt="Create App protection policy - Apps" style="height: auto;width: auto"/></div>
<p>4. Set the following options then click <strong>Next</strong>.</p>
<p>Backup org data to Android backup services: <strong>Block</strong></p>
<p>Send org data to other apps: <strong>Policy managed apps</strong></p>
<p>Click <strong>Select </strong>(next to select apps to exempt).</p>
<p>Name: <strong>Webex</strong></p>
<p>Value: <strong>com.cisco.webex.meetings</strong></p>
<div style="text-align:none;"><img src="https://i.ibb.co/cy9zXyZ/App-protection-policy-Data-protection.png" alt="App protection policy - Data protection" style="height: auto;width: auto"/></div>
<p>5. On the Access requirements page click <strong>Next</strong>.</p>
<p>6. On the Conditional launch page click <strong>Next</strong>.</p>
<p>7. On the Assignments page select your group. (you can't select all users on app protection policies. You can, however, create a dynamic group with all users). Click <strong>Next </strong>&gt; <strong>Create</strong>.</p>
<p><em>NOTE: You can't apply app protection policies to devices. They must be assigned to users.</em></p>
<p>Now your users won't be able to send data to any app that isn't managed by the policy or Webex. The users will also be required to enter a pin to access their Microsoft apps.</p>
<p>One final note, App protection policies that apply to Microsoft 365 apps, for example, Power BI, will protect apps even if the user is on an unmanaged device.</p>
<h2>Limit access to unmanaged devices</h2>
<p>Now, let's say not everyone in your organization will receive Intune. But you don't want those devices doing everything in Exchange Online. Maybe you want them to read email on these devices but you don't want them to download attachments or enable offline mode. Let's set that up.</p>
<p>1. create a conditional access policy with the following settings:</p>
<p><strong>Name</strong>: Unmanaged Devices</p>
<p><strong>Users or workload identities</strong>: Set to the group that will use unmanaged devices.</p>
<p><strong>Cloud apps</strong>: Office 365 Exchange Online</p>
<p><strong>Session</strong>: Use app-enforced restrictions</p>
<div style="text-align:none;"><img src="https://i.ibb.co/b6KtMZt/conditional-access-policy.png" alt="Conditional access policy" style="height: auto;width: auto"/></div>
<p>2. Run the following in PowerShell:</p>
<pre>Connect-ExchangeOnline<br>New-OwaMailboxPolicy LimitUnmanagedDevices<br>Set-OwaMailboxPolicy LimitUnmanagedDevices -ConditionalAccessPolicy ReadOnly</pre>
<p>3. Set the OWA mailbox policy on the mailboxes.</p>
<p>Go to <strong>Exchange admin center</strong> &gt; <a href="https://outlook.office365.com/ecp/?form=eac&mkt=en-US" target="_blank"><strong>Classic Exchange admin center</strong></a>  &gt; <strong>recipients </strong>&gt; <strong>mailboxes</strong>. Select the <strong>mailbox </strong>&gt; <strong>mailbox features</strong> &gt; <strong>View details</strong> (under Outlook on the web). Click <strong>browse </strong>&gt; select <strong>LimitUnmanagedDevices </strong>&gt; <strong>OK </strong>&gt; <strong>Save</strong>.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/7GtPn4V/set-owa-mailbox-policy.png" alt="Set OWA Mailbox policy" style="height: auto;width: auto"/></div>
<h2>Windows information protection</h2>
<p>Windows Information Protection (WIP), formally known as enterprise data protection (EDP), helps to protect against potential data leakage without interfering with the employee's work. In short, it prevents data from leaving apps protected by an app protection policy on Windows 10 devices. It works just like the App protection policy for Android we created above. It will prevent data from leaving the protected app. There are 4 settings:</p>
<ul>
<li><strong>Block</strong>: Will completely block data from leaving the protected apps</li>
<li><strong>Allow Overrides</strong>: The user will receive a prompt will moving data from a protected to a non-protected app. If the user chooses to move the data regardless of the prompt the action will be logged.</li>
<li><strong>Silent</strong>: The user will be allowed to move data from the protected apps but it will be logged.</li>
<li><strong>Off</strong>: <span style="color: rgb(33,37,41);background-color: rgb(255,255,255);font-size: 16px;font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;">The user will be allowed to move data from the protected apps and the action will not be logged.</span></li>
</ul>
<p><span style="color: rgb(33,37,41);background-color: rgb(255,255,255);font-size: 16px;font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;">Just like app protection policies in Android in Windows you need to select which apps are protected. You can also exempt apps. For example, you can create a policy to protect Microsoft Teams, then you can exclude Office ProPlus. With this configuration, users won't be able to remove data from Microsoft Teams except to the Office suite.</span></p>
`,
      nextContentSlug: 'NEXT_CONTENT',
      previousContentSlug: 'Understanding-compliance-policies-qDRA4jjoN',
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
