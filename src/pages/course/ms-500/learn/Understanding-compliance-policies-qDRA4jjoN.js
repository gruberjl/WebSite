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
      article: {"datePublished":"2022/6/21","article":{"entityMap":{"0":{"data":{"url":"https://endpoint.microsoft.com/?ref=AdminCenter#blade/Microsoft_Intune_DeviceSettings/DevicesWindowsMenu/compliancePolicies","alignment":"left","width":"auto","alt":"Create a compliance policy","targetOption":"_blank","height":"auto","src":"https://i.ibb.co/N3Qk57v/Create-a-compliance-policy.png"},"type":"LINK","mutability":"MUTABLE"},"1":{"data":{"alignment":"none","height":"auto","width":"auto","src":"https://i.ibb.co/N3Qk57v/Create-a-compliance-policy.png","alt":"Create a compliance policy"},"type":"IMAGE","mutability":"MUTABLE"},"2":{"type":"IMAGE","data":{"width":"auto","alt":"Windows 10 Compliance Policy Setting Encryption","src":"https://i.ibb.co/dJwctST/Windows-10-Compliance-Policy-Settings.png","alignment":"none","height":"auto"},"mutability":"MUTABLE"},"3":{"data":{"height":"auto","alt":"Mark device noncompliant","src":"https://i.ibb.co/hggb1G1/Mark-device-noncompliant.png","width":"auto","alignment":"none"},"type":"IMAGE","mutability":"MUTABLE"},"4":{"type":"LINK","data":{"url":"https://www.gitbit.org/course/ms-500/learn/How-to-manage-devices-using-Intune-_LL9VqGZO","targetOption":"_blank"},"mutability":"MUTABLE"},"5":{"type":"IMAGE","mutability":"MUTABLE","data":{"alignment":"none","height":"auto","width":"auto","alt":"Compliance Policy Chart","src":"https://i.ibb.co/9cmqh7d/Compliance-Policy-Chart.png"}},"6":{"type":"IMAGE","mutability":"MUTABLE","data":{"width":"auto","src":"https://i.ibb.co/3vgnWJR/actions-for-noncompliance.png","height":"auto","alt":"Actions for noncompliance","alignment":"none"}},"7":{"mutability":"MUTABLE","type":"LINK","data":{"targetOption":"_blank","url":"https://endpoint.microsoft.com/?ref=AdminCenter#blade/Microsoft_Intune_DeviceSettings/DevicesComplianceMenu/policySettings"}},"8":{"type":"IMAGE","data":{"src":"https://i.ibb.co/58CHC5j/Mark-devices-with-no-compliance-policy-assigned.png","width":"auto","alt":"Mark devices with no compliance policy assigned","alignment":"none","height":"auto"},"mutability":"MUTABLE"},"9":{"type":"LINK","mutability":"MUTABLE","data":{"url":"https://aad.portal.azure.com/#blade/Microsoft_AAD_IAM/ConditionalAccessBlade/Policies","targetOption":"_blank"}},"10":{"mutability":"MUTABLE","type":"IMAGE","data":{"alt":"Add all user to conditional access policy","alignment":"none","width":"auto","src":"https://i.ibb.co/Ln5Y4sS/Add-all-users-to-conditional-access-policy.png","height":"auto"}},"11":{"type":"IMAGE","mutability":"MUTABLE","data":{"alignment":"none","alt":"Exclude break glass account from conditional access policy","height":"auto","width":"auto","src":"https://i.ibb.co/7jJpRvY/exclude-break-glass-account-from-conditional-access-policy.png"}},"12":{"mutability":"MUTABLE","data":{"src":"https://i.ibb.co/jzcgHBf/Set-cloud-apps.png","alt":"Set cloud apps","width":"auto","alignment":"none","height":"auto"},"type":"IMAGE"},"13":{"data":{"alignment":"none","width":"auto","alt":"Require device to be marked as compliant","height":"auto","src":"https://i.ibb.co/JBZX8g5/require-device-to-be-marked-as-compliant.png"},"type":"IMAGE","mutability":"MUTABLE"},"14":{"mutability":"MUTABLE","type":"LINK","data":{"targetOption":"_blank","url":"https://outlook.office365.com/ecp/?form=eac&mkt=en-US"}},"15":{"data":{"alignment":"none","alt":"Configure Microsoft 365 to quarantine mobile devices","height":"auto","width":"auto","src":"https://i.ibb.co/3CL8NQx/quarantine-mobile-devices.png"},"mutability":"MUTABLE","type":"IMAGE"},"16":{"type":"IMAGE","data":{"alignment":"none","height":"auto","width":"auto","src":"https://i.ibb.co/dB7PCN5/Your-device-is-temporarily-blocked-from-accessing-content-via-Exchange-Active-Sync-because-the-devic.png","alt":"Your device is temporarily blocked from accessing content via Exchange ActiveSync because the device has been quarantined"},"mutability":"MUTABLE"},"17":{"type":"LINK","data":{"url":"https://outlook.office365.com/ecp/?exsvurl=1&p=ActiveSyncAccess&form=eac&mkt=en-US","targetOption":"_blank"},"mutability":"MUTABLE"},"18":{"mutability":"MUTABLE","type":"IMAGE","data":{"height":"auto","width":"auto","alt":"Allow device through quarantine","src":"https://i.ibb.co/89KnxVW/Allow-device-through-quarantine.png","alignment":"none"}}},"blocks":[{"type":"unstyled","inlineStyleRanges":[],"depth":0,"key":"7aujo","data":{},"entityRanges":[],"text":"Compliance policies are a great way to verify a device is configured and secure as you expect. You don't need a compliance policy for every setting in a configuration profile but you will want one to verify certain settings like passwords and encryption or verify the machine risk level. Let's jump in and take a look."},{"depth":0,"data":{},"text":"Creating a Windows compliance policy","inlineStyleRanges":[],"key":"93h7g","type":"header-two","entityRanges":[]},{"data":{},"key":"5968d","type":"unstyled","depth":0,"text":"1. Go to Microsoft Endpoint Manager admin center > Devices > Windows > Compliance policies. Click Create Policy. Set Platform to Windows 10 and later. Click Create.","entityRanges":[{"offset":71,"key":0,"length":19}],"inlineStyleRanges":[{"length":39,"style":"BOLD","offset":9},{"length":8,"offset":51,"style":"BOLD"},{"style":"BOLD","length":8,"offset":61},{"style":"BOLD","offset":71,"length":19},{"offset":98,"style":"BOLD","length":13},{"style":"BOLD","length":9,"offset":117},{"style":"BOLD","offset":129,"length":20},{"style":"BOLD","length":6,"offset":157}]},{"type":"atomic","entityRanges":[{"offset":0,"key":1,"length":1}],"text":" ","key":"9h449","depth":0,"data":{},"inlineStyleRanges":[]},{"key":"9khhe","depth":0,"inlineStyleRanges":[{"length":28,"offset":19,"style":"BOLD"},{"style":"BOLD","length":4,"offset":55}],"text":"2. Set the name to Windows 10 Compliance Policy. Click Next.","data":{},"type":"unstyled","entityRanges":[]},{"entityRanges":[],"type":"unstyled","data":{},"depth":0,"inlineStyleRanges":[{"length":13,"style":"BOLD","offset":7},{"offset":23,"style":"BOLD","length":17},{"offset":44,"style":"BOLD","length":7},{"offset":59,"style":"BOLD","length":4}],"text":"3. Set Device Health > Require Bitlocker to Require. Click Next.","key":"8oc16"},{"data":{},"depth":0,"inlineStyleRanges":[],"key":"9ause","entityRanges":[{"length":1,"offset":0,"key":2}],"text":" ","type":"atomic"},{"depth":0,"text":"4. Set the Schedule (days after noncompliance) to 5. Click Next.","key":"dl1d9","inlineStyleRanges":[{"length":35,"offset":11,"style":"BOLD"},{"length":1,"style":"BOLD","offset":50},{"style":"BOLD","length":4,"offset":59}],"entityRanges":[],"data":{},"type":"unstyled"},{"depth":0,"key":"9h8k5","text":" ","data":{},"inlineStyleRanges":[],"type":"atomic","entityRanges":[{"length":1,"offset":0,"key":3}]},{"depth":0,"type":"unstyled","data":{},"inlineStyleRanges":[{"offset":11,"style":"BOLD","length":20},{"offset":37,"length":18,"style":"BOLD"},{"style":"BOLD","offset":63,"length":4},{"style":"BOLD","offset":75,"length":6}],"key":"u0ev","text":"5. Set the included assignments to a group or All users. Click Next. Click Create.","entityRanges":[]},{"inlineStyleRanges":[],"text":"Understanding assignments","data":{},"type":"header-two","depth":0,"key":"9dq1i","entityRanges":[]},{"type":"unstyled","data":{},"depth":0,"text":"The compliance policy assignments work the same way they do for configuration profiles. You can review the assignments in that lesson under the section \"Understanding assignments in Intune\". Remember, exclusions take precedence over inclusions. Don't mix device and user groups on the same policy. Lastly, a compliance policy created for Windows 10 won't affect Google or Apple devices. It will only affect Windows 10.","entityRanges":[{"key":4,"length":22,"offset":96}],"inlineStyleRanges":[],"key":"c95gi"},{"data":{},"key":"1doa8","depth":0,"entityRanges":[],"type":"unstyled","inlineStyleRanges":[],"text":"Let's take a quick example to make sure you're familiar with assignments."},{"depth":0,"text":"You have one Windows 10 Device named Device1. It is a member of 2 groups GroupA and GroupB. You have the 4 compliance policies in the chart below:","data":{},"type":"unstyled","inlineStyleRanges":[],"entityRanges":[],"key":"epada"},{"text":" ","inlineStyleRanges":[],"entityRanges":[{"offset":0,"key":5,"length":1}],"data":{},"depth":0,"key":"86lji","type":"atomic"},{"type":"unstyled","entityRanges":[],"inlineStyleRanges":[],"data":{},"depth":0,"text":"Which policies will apply to Device1? Policy1 and Policy2. Policy1 because it has a platform of Windows 10 and includes all devices. Policy2 because it has a platform of Windows 10 and includes GroupA. Not Policy3 because it has an exclusion of GroupB. So even though it applies to Windows 10 and GroupA the exclusion takes precedence. Not Policy4 because it applies to Android devices.","key":"b887q"},{"key":"6b41v","inlineStyleRanges":[],"data":{},"entityRanges":[],"depth":0,"text":"Understanding actions for noncompliance","type":"header-two"},{"type":"atomic","entityRanges":[{"offset":0,"key":6,"length":1}],"key":"2b6pl","data":{},"text":" ","inlineStyleRanges":[],"depth":0},{"type":"unstyled","entityRanges":[],"depth":0,"key":"84unf","text":"Compliance policies have a section that configuration profiles don't, that's the actions for noncompliance. In short, this section says \"what happens when a device is not compliant?\"","inlineStyleRanges":[{"offset":81,"length":25,"style":"BOLD"}],"data":{}},{"entityRanges":[],"type":"unstyled","inlineStyleRanges":[],"text":"You can delay how long before a device is flagged as non-compliant as we did in the compliance policy above. That's important because you can create a conditional access policy to block noncompliant devices. Let's take an example.","depth":0,"key":"3ejog","data":{}},{"type":"unstyled","entityRanges":[],"key":"gm78","text":"Let's say you create a compliance policy called Policy1 and set the Mark device noncompliant 10 days after noncompliance The policy requires an Android device to be encrypted. Then a user enrolls a device on June 1st, 2022 but the device isn't encrypted. Will the device be compliant on June 5th? What about June 11th? The device will be marked compliant on June 5th because the compliance policy will flag the device as noncompliant for 10 days. On June 11th the device will be marked as noncompliant.","depth":0,"data":{},"inlineStyleRanges":[]},{"depth":0,"data":{},"entityRanges":[],"type":"header-two","key":"6l7dt","inlineStyleRanges":[],"text":"Mark devices with no compliance policy as"},{"depth":0,"data":{},"type":"unstyled","inlineStyleRanges":[],"text":"So, what happens to a device with no compliance policy? Is it flagged as compliant or noncompliant? The question depends on how you configure your tenant. It can be either-or. Let's jump in and take a look.","entityRanges":[],"key":"6feum"},{"depth":0,"text":"1. Go to Microsoft Endpoint Manager admin center > Devices > Compliance policies > Compliance policy settings.","type":"unstyled","entityRanges":[{"length":26,"key":7,"offset":83}],"key":"6cnpo","inlineStyleRanges":[],"data":{}},{"entityRanges":[],"type":"unstyled","depth":0,"inlineStyleRanges":[{"length":13,"offset":58,"style":"BOLD"},{"offset":79,"style":"BOLD","length":4}],"data":{},"text":"2. Set Mark devices with no compliance policy assigned as Not compliant. Click Save.","key":"27cqr"},{"depth":0,"text":" ","type":"atomic","inlineStyleRanges":[],"key":"752u2","data":{},"entityRanges":[{"key":8,"offset":0,"length":1}]},{"data":{},"inlineStyleRanges":[],"type":"header-two","text":"How to block noncompliant devices","depth":0,"entityRanges":[],"key":"cbkfh"},{"entityRanges":[],"type":"unstyled","key":"a2a09","depth":0,"inlineStyleRanges":[],"text":"By now in the lessons, you should have the devices enrolled in Intune. And a compliance policy setting the devices as compliant or noncompliant. So how do we block noncompliant devices? By using a conditional access policy!","data":{}},{"key":"47lm6","data":{},"depth":0,"entityRanges":[{"key":9,"length":27,"offset":61}],"inlineStyleRanges":[{"style":"BOLD","offset":8,"length":35},{"style":"BOLD","length":12,"offset":46},{"offset":61,"style":"BOLD","length":27},{"style":"BOLD","offset":96,"length":11},{"offset":109,"style":"BOLD","length":17}],"text":"1. Open Azure Active Directory admin center > All services > Azure AD Conditional Access. Click New Policy > Create new policy.","type":"unstyled"},{"data":{},"inlineStyleRanges":[{"offset":11,"style":"BOLD","length":5},{"style":"BOLD","length":26,"offset":19},{"offset":53,"style":"BOLD","length":39},{"offset":95,"style":"BOLD","length":9}],"type":"unstyled","key":"701al","entityRanges":[],"depth":0,"text":"2. Set the name to Block noncompliant devices. Click 0 users or workload identities selected > All Users."},{"inlineStyleRanges":[],"type":"atomic","data":{},"depth":0,"key":"24b8l","text":" ","entityRanges":[{"key":10,"length":1,"offset":0}]},{"type":"unstyled","text":"","data":{},"depth":0,"inlineStyleRanges":[],"key":"33rvh","entityRanges":[]},{"text":"3. Click Exclude > Users and groups > search for your break-glass account and click on it. Click Select.","data":{},"key":"32k7v","depth":0,"type":"unstyled","inlineStyleRanges":[{"style":"BOLD","offset":9,"length":8},{"length":16,"style":"BOLD","offset":19},{"style":"BOLD","length":6,"offset":97}],"entityRanges":[]},{"type":"atomic","entityRanges":[{"key":11,"length":1,"offset":0}],"inlineStyleRanges":[],"data":{},"key":"cdlna","text":" ","depth":0},{"key":"6bt9f","type":"unstyled","text":"4. Click No cloud apps, actions, or authentication contents selected > Select apps > Office 365 > Select.","entityRanges":[],"depth":0,"data":{},"inlineStyleRanges":[{"offset":9,"length":59,"style":"BOLD"},{"length":11,"style":"BOLD","offset":71},{"style":"BOLD","length":10,"offset":85},{"style":"BOLD","length":6,"offset":98}]},{"type":"atomic","data":{},"depth":0,"inlineStyleRanges":[],"text":" ","entityRanges":[{"length":1,"offset":0,"key":12}],"key":"7kotf"},{"type":"unstyled","depth":0,"entityRanges":[],"data":{},"inlineStyleRanges":[{"offset":9,"style":"BOLD","length":19},{"style":"BOLD","length":40,"offset":57},{"length":6,"style":"BOLD","offset":105},{"style":"BOLD","length":13,"offset":119},{"offset":139,"length":2,"style":"BOLD"},{"style":"BOLD","length":6,"offset":149}],"text":"5. Click 0 controls selected located under Grant > Check Require device to be marked as compliant. Click Select. Under Enable policy click On. Click Create.","key":"cus96"},{"key":"fpni1","data":{},"text":" ","entityRanges":[{"key":13,"offset":0,"length":1}],"depth":0,"type":"atomic","inlineStyleRanges":[]},{"depth":0,"data":{},"entityRanges":[],"text":"Quarantine devices that don't have Intune","inlineStyleRanges":[],"key":"bgbco","type":"header-two"},{"depth":0,"entityRanges":[],"data":{},"inlineStyleRanges":[],"key":"1junm","text":"Now that we have devices in Intune and conditional access policies verifying the devices are compliant what about our non-managed devices? In short, what about our break glass accounts? For those, we will want to quarantine any phones that attempt to connect to Exchange Online. Let's jump in and configure quarantining for any device that isn't covered by our conditional access policy.","type":"unstyled"},{"type":"unstyled","entityRanges":[{"key":14,"length":29,"offset":33}],"depth":0,"data":{},"key":"cpngi","inlineStyleRanges":[{"length":21,"style":"BOLD","offset":9},{"length":29,"style":"BOLD","offset":33},{"style":"BOLD","length":7,"offset":65},{"style":"BOLD","length":4,"offset":74}],"text":"1. Go to Exchange admin center > Classic Exchange admin center > Mobile > Edit."},{"entityRanges":[],"depth":0,"inlineStyleRanges":[{"length":19,"style":"BOLD","offset":7},{"style":"BOLD","length":11,"offset":30},{"offset":52,"length":4,"style":"BOLD"}],"text":"2. Set Connection Settings to Quarantine then click Save.","type":"unstyled","data":{},"key":"6ihqn"},{"key":"2i8qm","depth":0,"text":" ","data":{},"inlineStyleRanges":[],"entityRanges":[{"length":1,"key":15,"offset":0}],"type":"atomic"},{"text":"How to allow a quarantined device","key":"4bchd","entityRanges":[],"inlineStyleRanges":[],"depth":0,"data":{},"type":"header-two"},{"depth":0,"type":"unstyled","entityRanges":[],"data":{},"key":"3k9u3","text":"Now when someone that's not covered by the conditional access policy attempts to log on to their email using a mobile device their device will be quarantined. In short, they won't receive email until an admin goes in and approves the device. They'll receive a message that says the following:","inlineStyleRanges":[]},{"text":"\"Your device is temporarily blocked from accessing content via Exchange ActiveSync because the device has been quarantined. You don't need to take any action. Content will automatically be downloaded as soon as access is granted by your administrator.\"","key":"2mf4f","entityRanges":[],"inlineStyleRanges":[],"depth":0,"data":{},"type":"blockquote"},{"text":" ","type":"atomic","key":"asbk8","depth":0,"entityRanges":[{"key":16,"length":1,"offset":0}],"inlineStyleRanges":[],"data":{}},{"data":{},"inlineStyleRanges":[],"depth":0,"text":"An admin will then need to allow the device to connect. To allow a quarantined device to connect perform the following:","key":"22kij","entityRanges":[],"type":"unstyled"},{"entityRanges":[{"length":29,"key":17,"offset":33}],"data":{},"inlineStyleRanges":[{"length":21,"style":"BOLD","offset":9},{"offset":33,"style":"BOLD","length":30},{"offset":66,"style":"BOLD","length":6}],"text":"1. Go to Exchange admin center > Classic Exchange admin center  > mobile.","key":"4j76c","type":"unstyled","depth":0},{"inlineStyleRanges":[{"offset":13,"style":"BOLD","length":18},{"style":"BOLD","length":5,"offset":42}],"type":"unstyled","entityRanges":[],"depth":0,"key":"cdi7e","data":{},"text":"2. Click the quarantined device and click Allow."},{"text":" ","type":"atomic","data":{},"inlineStyleRanges":[],"depth":0,"entityRanges":[{"key":18,"length":1,"offset":0}],"key":"58kl2"},{"entityRanges":[],"type":"unstyled","data":{},"depth":0,"key":"53s69","inlineStyleRanges":[],"text":""}]},"featuredImage":"https://i.ibb.co/N3Qk57v/Create-a-compliance-policy.png","publish":true,"images":["https://i.ibb.co/N3Qk57v/Create-a-compliance-policy.png","https://i.ibb.co/dJwctST/Windows-10-Compliance-Policy-Settings.png","https://i.ibb.co/hggb1G1/Mark-device-noncompliant.png","https://i.ibb.co/3vgnWJR/actions-for-noncompliance.png","https://i.ibb.co/9cmqh7d/Compliance-Policy-Chart.png","https://i.ibb.co/58CHC5j/Mark-devices-with-no-compliance-policy-assigned.png","https://i.ibb.co/Ln5Y4sS/Add-all-users-to-conditional-access-policy.png","https://i.ibb.co/7jJpRvY/exclude-break-glass-account-from-conditional-access-policy.png","https://i.ibb.co/jzcgHBf/Set-cloud-apps.png","https://i.ibb.co/JBZX8g5/require-device-to-be-marked-as-compliant.png","https://i.ibb.co/3CL8NQx/quarantine-mobile-devices.png","https://i.ibb.co/dB7PCN5/Your-device-is-temporarily-blocked-from-accessing-content-via-Exchange-Active-Sync-because-the-devic.png","https://i.ibb.co/89KnxVW/Allow-device-through-quarantine.png"],"slug":"Understanding-compliance-policies-qDRA4jjoN","title":"Understanding compliance policies","description":"Compliance policies are a great way to verify a device is configured and secure as you expect. You don't need a compliance policy for every setting in a configuration profile but you will want one to verify certain settings like passwords and encryption or verify the machine risk level.","type":"article","id":"qDRA4jjoN","sectionId":"l0DxUuonW"},
      articles: [{"id":"cpchjBLkC","sectionId":"qwJW5VrBW","slug":"Whats-in-this-course-cpchjBLkC","title":"What's in this course?","featuredImage":"https://i.ibb.co/zFs9Vfb/microsoft365-security-administrator-associate-600x600.png"},{"id":"KKkBOVuS4","sectionId":"qwJW5VrBW","slug":"Creating-a-free-Microsoft-365-tenant-for-practice-KKkBOVuS4","title":"Creating a free Microsoft 365 tenant for practice","featuredImage":"https://i.ibb.co/F07sjQJ/microsoft-365-e5-trial.png"},{"id":"bzotoOjEe","sectionId":"qwJW5VrBW","slug":"Managing-the-Microsoft-365-tenant-Introduction-to-the-admin-centers-bzotoOjEe","title":"Managing the Microsoft 365 tenant - Introduction to the admin centers","featuredImage":"https://i.ibb.co/f1cr4zt/Microsoft-365-admin-centers.png"},{"id":"cg_vxOX9L","sectionId":"qwJW5VrBW","slug":"Managing-Microsoft-365-through-PowerShell-cg_vxOX9L","title":"Managing Microsoft 365 through PowerShell","featuredImage":"https://i.ibb.co/HV13YF6/install-microsoft-365-powershell-modules.png"},{"id":"uYCIPbnMC","sectionId":"AFV_acckJ","slug":"How-to-create-users-in-Microsoft-365-Cloud-Only-uYCIPbnMC","title":"How to create users in Microsoft 365 Cloud Only","featuredImage":"https://i.ibb.co/Wnt5Q43/View-Microsoft-365-Users.png"},{"id":"7CpqFkPZU","sectionId":"AFV_acckJ","slug":"Creating-and-managing-admins-through-roles-7CpqFkPZU","title":"Creating and managing admins through roles","featuredImage":"https://i.ibb.co/kySL4HQ/Roles-and-administrators.png"},{"id":"rZzausKJ1","sectionId":"AFV_acckJ","slug":"Time-limited-admin-roles-in-Microsoft-365-rZzausKJ1","title":"Time limited admin roles in Microsoft 365","featuredImage":"https://i.ibb.co/nDvjyPD/select-member-to-add-to-PIM-role.png"},{"id":"ky5W0Lz5P","sectionId":"AFV_acckJ","slug":"Whats-AD-Connect-ky5W0Lz5P","title":"What's AD Connect","featuredImage":"https://i.ibb.co/7nDqr9x/Whats-AD-Connect.png"},{"id":"i9pJIjTNH","sectionId":"AFV_acckJ","slug":"Protecting-Passwords-in-Microsoft-365-i9pJIjTNH","title":"Protecting Passwords in Microsoft 365","featuredImage":"https://i.ibb.co/DLD4G4q/access-smart-lockout-settings.png"},{"id":"S1hQgFOMV","sectionId":"AFV_acckJ","slug":"Creating-and-managing-users-through-groups-S1hQgFOMV","title":"Creating and managing users through groups","featuredImage":"https://i.ibb.co/nmmC28M/add-a-group-microsoft-365.png"},{"id":"2QfoI2HxY","sectionId":"AFV_acckJ","slug":"Securing-and-implementing-enterprise-applications-2QfoI2HxY","title":"Securing and implementing enterprise applications","featuredImage":"https://i.ibb.co/C2mp69m/disable-user-consent.png"},{"id":"V1en9Iugh","sectionId":"AFV_acckJ","slug":"Whats-a-conditional-access-policy-V1en9Iugh","title":"What's a conditional access policy?","featuredImage":"https://i.ibb.co/DQm1sY0/Create-conditional-access-policy.png"},{"id":"nAAIvNbtk","sectionId":"AFV_acckJ","slug":"The-many-ways-to-implement-multi-factor-authentication-MFA-in-Microsoft-365-nAAIvNbtk","title":"The many ways to implement multi-factor authentication (MFA) in Microsoft 365","featuredImage":"https://i.ibb.co/P1P0wNY/microsoft-365-manage-security-defaults.png"},{"id":"2S9jn0aLr","sectionId":"AFV_acckJ","slug":"Implement-Self-service-password-reset-in-Microsoft-365-2S9jn0aLr","title":"Implement Self-service password reset in Microsoft 365","featuredImage":"https://i.ibb.co/58y9JVg/write-back-passwords-to-on-premises-directory.png"},{"id":"FldNualGC","sectionId":"AFV_acckJ","slug":"Locking-down-your-Microsoft-365-tenant-from-Microsoft-engineers-FldNualGC","title":"Locking down your Microsoft 365 tenant from Microsoft engineers","featuredImage":"https://i.ibb.co/DCmpnT9/Enable-Customer-Lockbox.png"},{"id":"NFQ6rYFeQ","sectionId":"AFV_acckJ","slug":"Implementing-intelligent-security-using-risk-policies-in-Microsoft-365-NFQ6rYFeQ","title":"Implementing intelligent security using risk policies in Microsoft 365","featuredImage":"https://i.ibb.co/0cyQJ7j/Risk-Detections.png"},{"id":"rK48f6iM2","sectionId":"AFV_acckJ","slug":"Automating-Access-Review-in-Microsoft-365-rK48f6iM2","title":"Automating Access Review in Microsoft 365","featuredImage":"https://i.ibb.co/Xsxvz6Z/new-access-review.png"},{"id":"RHW1API2s","sectionId":"AFV_acckJ","slug":"Just-in-time-approval-and-notification-for-admin-roles-in-Microsoft-365-RHW1API2s","title":"Just in time, approval and notification for admin roles in Microsoft 365","featuredImage":"https://i.ibb.co/dcb6XFN/Activate-a-Role.png"},{"id":"z8EMM9Eu_","sectionId":"QScYfSu74","slug":"Whats-Microsoft-365-Defender-z8EMM9Eu_","title":"What's Microsoft 365 Defender?","featuredImage":"https://i.ibb.co/MDMyDQt/Microsoft-Defender.png"},{"id":"Kye_yNLxA","sectionId":"QScYfSu74","slug":"Whats-Microsoft-Defender-for-identity-Kye_yNLxA","title":"What's Microsoft Defender for identity?","featuredImage":"https://i.ibb.co/bQDBh0Y/Defender-for-Identity-Timeline.png"},{"id":"EnPyp7ukN","sectionId":"QScYfSu74","slug":"Whats-Microsoft-Defender-for-Office-365-EnPyp7ukN","title":"What's Microsoft Defender for Office 365?","featuredImage":"https://i.ibb.co/WcwKY2G/Microsoft-365-incidents-and-alerts.png"},{"id":"6HUOr7qbL","sectionId":"QScYfSu74","slug":"Protect-your-email-environment-from-malicious-actors-6HUOr7qbL","title":"Protect your email and Office environment from malicious actors","featuredImage":"https://i.ibb.co/Df0KQVp/Reports.png"},{"id":"GCOOUsSBT","sectionId":"QScYfSu74","slug":"Protecting-email-against-phishing-attacks-GCOOUsSBT","title":"Protecting email against phishing attacks","featuredImage":"https://i.ibb.co/GCjZHWg/edit-actions.png"},{"id":"GG4cMY8pK","sectionId":"QScYfSu74","slug":"Simulating-attacks-with-Microsoft-365-GG4cMY8pK","title":"Simulating attacks with Microsoft 365","featuredImage":"https://i.ibb.co/NyvnbMK/simulation-overview-view-users-circled.png"},{"id":"z0qPG6v4T","sectionId":"QScYfSu74","slug":"Protecting-Windows-10-and-other-devices-with-Microsoft-Defender-for-Endpoint-z0qPG6v4T","title":"Protecting Windows 10 and other devices with Microsoft Defender for Endpoint","featuredImage":"https://i.ibb.co/T47Xhyh/enable-endpoint-connections.png"},{"id":"LEyZMWBSt","sectionId":"QScYfSu74","slug":"Collect-detect-investigate-and-respond-to-security-threats-using-Microsoft-Sentinel-LEyZMWBSt","title":"Collect, detect, investigate, and respond to security threats using Microsoft Sentinel","featuredImage":"https://i.ibb.co/qN9XsKj/Add-Workbook.png"},{"id":"7MQ3wE4wP","sectionId":"QScYfSu74","slug":"Implement-and-manage-Microsoft-Defender-for-Cloud-Apps-7MQ3wE4wP","title":"Implement and manage Microsoft Defender for Cloud Apps","featuredImage":"https://i.ibb.co/7g7LvFg/office-365-cloud-apps-settings.png"},{"id":"sH_Ee1DW1","sectionId":"QScYfSu74","slug":"Auditing-sign-ins-and-other-actions-in-Microsoft-365-sH_Ee1DW1","title":"Auditing sign-ins and other actions in Microsoft 365","featuredImage":"https://i.ibb.co/BqMw3jZ/Start-recording-user-and-admin-activity.png"},{"id":"vLweLmxZf","sectionId":"YhftdGIRX","slug":"How-to-classify-data-using-labels-in-Microsoft-365-vLweLmxZf","title":"How to classify data using labels in Microsoft 365","featuredImage":"https://i.ibb.co/k9nhWS5/Choose-protection-settings-for-files-and-emails.png"},{"id":"NsF7No40f","sectionId":"YhftdGIRX","slug":"Creating-and-managing-data-retention-to-conform-to-compliance-NsF7No40f","title":"Creating and managing data retention to conform to compliance","featuredImage":"https://i.ibb.co/yqC0ZdY/New-Retention-Policy.png"},{"id":"IsPGsme8w","sectionId":"YhftdGIRX","slug":"Preventing-accidental-and-malicious-data-loss-with-DLP-policies-IsPGsme8w","title":"Preventing accidental and malicious data loss with DLP policies","featuredImage":"https://i.ibb.co/n8WcqKM/Create-a-DLP-policy.png"},{"id":"wv2PbXnhI","sectionId":"YhftdGIRX","slug":"Everything-you-need-to-know-about-securing-SharePoint-Online-for-the-MS-500-wv2PbXnhI","title":"Everything you need to know about securing SharePoint Online for the MS-500","featuredImage":"https://i.ibb.co/Gk9NjSH/Share-Point-Online-Warning.png"},{"id":"7gR3L122b","sectionId":"l0DxUuonW","slug":"Introduction-to-Intune-7gR3L122b","title":"Introduction to Intune","featuredImage":"https://i.ibb.co/Fq3N8BX/Endpoint-Manager-Admin-Center.png"},{"id":"ZyKX3Idjs","sectionId":"l0DxUuonW","slug":"Setting-up-Android-Devices-ZyKX3Idjs","title":"Setting up Android Devices","featuredImage":"https://i.ibb.co/m0BYhL2/Connect-Intune-to-Google-Play.png"},{"id":"MAjW0a2_p","sectionId":"l0DxUuonW","slug":"Setting-up-Apple--iOS-devices-in-Intune-MAjW0a2_p","title":"Setting up Apple / iOS devices in Intune","featuredImage":"https://i.ibb.co/X7Ffb2B/Setup-Apple-Enrollment-in-Intune.png"},{"id":"XFXu2zIS9","sectionId":"l0DxUuonW","slug":"Setting-up-Windows-10-devices-in-Intune-XFXu2zIS9","title":"Setting up Windows 10 devices in Intune","featuredImage":"https://i.ibb.co/WDXKVjW/configure-device-options.png"},{"id":"_LL9VqGZO","sectionId":"l0DxUuonW","slug":"How-to-manage-devices-using-Intune-_LL9VqGZO","title":"How to manage devices using Intune","featuredImage":"https://i.ibb.co/HPQ2m8t/Create-an-endpoint-protection-profile.png"},{"id":"qDRA4jjoN","sectionId":"l0DxUuonW","slug":"Understanding-compliance-policies-qDRA4jjoN","title":"Understanding compliance policies","featuredImage":"https://i.ibb.co/N3Qk57v/Create-a-compliance-policy.png"},{"id":"62t_7oiZx","sectionId":"l0DxUuonW","slug":"Restricting-and-managing-apps-on-user-devices-62t_7oiZx","title":"Restricting and managing apps on user devices","featuredImage":"https://i.ibb.co/PCVRKDf/Add-an-Android-app-to-Intune.png"}],
      articleHtml: `<p>Compliance policies are a great way to verify a device is configured and secure as you expect. You don't need a compliance policy for every setting in a configuration profile but you will want one to verify certain settings like passwords and encryption or verify the machine risk level. Let's jump in and take a look.</p>
<h2>Creating a Windows compliance policy</h2>
<p>1. Go to <strong>Microsoft Endpoint Manager admin center</strong> &gt; <strong>Devices </strong>&gt; <strong>Windows </strong>&gt; <a href="https://endpoint.microsoft.com/?ref=AdminCenter#blade/Microsoft_Intune_DeviceSettings/DevicesWindowsMenu/compliancePolicies" target="_blank"><strong>Compliance policies</strong></a>. Click <strong>Create Policy</strong>. Set <strong>Platform </strong>to <strong>Windows 10 and later</strong>. Click <strong>Create</strong>.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/N3Qk57v/Create-a-compliance-policy.png" alt="Create a compliance policy" style="height: auto;width: auto"/></div>
<p>2. Set the name to <strong>Windows 10 Compliance Policy</strong>. Click <strong>Next</strong>.</p>
<p>3. Set <strong>Device Health</strong> &gt; <strong>Require Bitlocker</strong> to <strong>Require</strong>. Click <strong>Next</strong>.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/dJwctST/Windows-10-Compliance-Policy-Settings.png" alt="Windows 10 Compliance Policy Setting Encryption" style="height: auto;width: auto"/></div>
<p>4. Set the <strong>Schedule (days after noncompliance)</strong> to <strong>5</strong>. Click <strong>Next</strong>.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/hggb1G1/Mark-device-noncompliant.png" alt="Mark device noncompliant" style="height: auto;width: auto"/></div>
<p>5. Set the <strong>included assignments</strong> to a <strong>group or All users</strong>. Click <strong>Next</strong>. Click <strong>Create</strong>.</p>
<h2>Understanding assignments</h2>
<p>The compliance policy assignments work the same way they do for configuration profiles. You can <a href="https://www.gitbit.org/course/ms-500/learn/How-to-manage-devices-using-Intune-_LL9VqGZO" target="_blank">review the assignments</a> in that lesson under the section "Understanding assignments in Intune". Remember, exclusions take precedence over inclusions. Don't mix device and user groups on the same policy. Lastly, a compliance policy created for Windows 10 won't affect Google or Apple devices. It will only affect Windows 10.</p>
<p>Let's take a quick example to make sure you're familiar with assignments.</p>
<p>You have one Windows 10 Device named Device1. It is a member of 2 groups GroupA and GroupB. You have the 4 compliance policies in the chart below:</p>
<div style="text-align:none;"><img src="https://i.ibb.co/9cmqh7d/Compliance-Policy-Chart.png" alt="Compliance Policy Chart" style="height: auto;width: auto"/></div>
<p>Which policies will apply to Device1? Policy1 and Policy2. Policy1 because it has a platform of Windows 10 and includes all devices. Policy2 because it has a platform of Windows 10 and includes GroupA. Not Policy3 because it has an exclusion of GroupB. So even though it applies to Windows 10 and GroupA the exclusion takes precedence. Not Policy4 because it applies to Android devices.</p>
<h2>Understanding actions for noncompliance</h2>
<div style="text-align:none;"><img src="https://i.ibb.co/3vgnWJR/actions-for-noncompliance.png" alt="Actions for noncompliance" style="height: auto;width: auto"/></div>
<p>Compliance policies have a section that configuration profiles don't, that's the <strong>actions for noncompliance</strong>. In short, this section says "what happens when a device is not compliant?"</p>
<p>You can delay how long before a device is flagged as non-compliant as we did in the compliance policy above. That's important because you can create a conditional access policy to block noncompliant devices. Let's take an example.</p>
<p>Let's say you create a compliance policy called Policy1 and set the Mark device noncompliant 10 days after noncompliance The policy requires an Android device to be encrypted. Then a user enrolls a device on June 1st, 2022 but the device isn't encrypted. Will the device be compliant on June 5th? What about June 11th? The device will be marked compliant on June 5th because the compliance policy will flag the device as noncompliant for 10 days. On June 11th the device will be marked as noncompliant.</p>
<h2>Mark devices with no compliance policy as</h2>
<p>So, what happens to a device with no compliance policy? Is it flagged as compliant or noncompliant? The question depends on how you configure your tenant. It can be either-or. Let's jump in and take a look.</p>
<p>1. Go to Microsoft Endpoint Manager admin center &gt; Devices &gt; Compliance policies &gt; <a href="https://endpoint.microsoft.com/?ref=AdminCenter#blade/Microsoft_Intune_DeviceSettings/DevicesComplianceMenu/policySettings" target="_blank">Compliance policy settings</a>.</p>
<p>2. Set Mark devices with no compliance policy assigned as <strong>Not compliant</strong>. Click <strong>Save</strong>.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/58CHC5j/Mark-devices-with-no-compliance-policy-assigned.png" alt="Mark devices with no compliance policy assigned" style="height: auto;width: auto"/></div>
<h2>How to block noncompliant devices</h2>
<p>By now in the lessons, you should have the devices enrolled in Intune. And a compliance policy setting the devices as compliant or noncompliant. So how do we block noncompliant devices? By using a conditional access policy!</p>
<p>1. Open <strong>Azure Active Directory admin center</strong> &gt; <strong>All services</strong> &gt; <a href="https://aad.portal.azure.com/#blade/Microsoft_AAD_IAM/ConditionalAccessBlade/Policies" target="_blank"><strong>Azure AD Conditional Access</strong></a>. Click <strong>New Policy </strong>&gt; <strong>Create new policy</strong>.</p>
<p>2. Set the <strong>name </strong>to <strong>Block noncompliant devices</strong>. Click <strong>0 users or workload identities selected</strong> &gt; <strong>All Users</strong>.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/Ln5Y4sS/Add-all-users-to-conditional-access-policy.png" alt="Add all user to conditional access policy" style="height: auto;width: auto"/></div>
<p></p>
<p>3. Click <strong>Exclude </strong>&gt; <strong>Users and groups</strong> &gt; search for your break-glass account and click on it. Click <strong>Select</strong>.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/7jJpRvY/exclude-break-glass-account-from-conditional-access-policy.png" alt="Exclude break glass account from conditional access policy" style="height: auto;width: auto"/></div>
<p>4. Click <strong>No cloud apps, actions, or authentication contents selected</strong> &gt; <strong>Select apps</strong> &gt; <strong>Office 365</strong> &gt; <strong>Select</strong>.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/jzcgHBf/Set-cloud-apps.png" alt="Set cloud apps" style="height: auto;width: auto"/></div>
<p>5. Click <strong>0 controls selected</strong> located under Grant &gt; Check <strong>Require device to be marked as compliant</strong>. Click <strong>Select</strong>. Under <strong>Enable policy</strong> click <strong>On</strong>. Click <strong>Create</strong>.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/JBZX8g5/require-device-to-be-marked-as-compliant.png" alt="Require device to be marked as compliant" style="height: auto;width: auto"/></div>
<h2>Quarantine devices that don't have Intune</h2>
<p>Now that we have devices in Intune and conditional access policies verifying the devices are compliant what about our non-managed devices? In short, what about our break glass accounts? For those, we will want to quarantine any phones that attempt to connect to Exchange Online. Let's jump in and configure quarantining for any device that isn't covered by our conditional access policy.</p>
<p>1. Go to <strong>Exchange admin center</strong> &gt; <a href="https://outlook.office365.com/ecp/?form=eac&mkt=en-US" target="_blank"><strong>Classic Exchange admin center</strong></a> &gt; <strong>Mobile </strong>&gt; <strong>Edit</strong>.</p>
<p>2. Set <strong>Connection Settings</strong> to <strong>Quarantine </strong>then click <strong>Save</strong>.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/3CL8NQx/quarantine-mobile-devices.png" alt="Configure Microsoft 365 to quarantine mobile devices" style="height: auto;width: auto"/></div>
<h2>How to allow a quarantined device</h2>
<p>Now when someone that's not covered by the conditional access policy attempts to log on to their email using a mobile device their device will be quarantined. In short, they won't receive email until an admin goes in and approves the device. They'll receive a message that says the following:</p>
<blockquote>"Your device is temporarily blocked from accessing content via Exchange ActiveSync because the device has been quarantined. You don't need to take any action. Content will automatically be downloaded as soon as access is granted by your administrator."</blockquote>
<div style="text-align:none;"><img src="https://i.ibb.co/dB7PCN5/Your-device-is-temporarily-blocked-from-accessing-content-via-Exchange-Active-Sync-because-the-devic.png" alt="Your device is temporarily blocked from accessing content via Exchange ActiveSync because the device has been quarantined" style="height: auto;width: auto"/></div>
<p>An admin will then need to allow the device to connect. To allow a quarantined device to connect perform the following:</p>
<p>1. Go to <strong>Exchange admin center</strong> &gt; <a href="https://outlook.office365.com/ecp/?exsvurl=1&p=ActiveSyncAccess&form=eac&mkt=en-US" target="_blank"><strong>Classic Exchange admin center</strong></a><strong> </strong> &gt; <strong>mobile</strong>.</p>
<p>2. Click the <strong>quarantined device</strong> and click <strong>Allow</strong>.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/89KnxVW/Allow-device-through-quarantine.png" alt="Allow device through quarantine" style="height: auto;width: auto"/></div>
<p></p>
`,
      nextContentSlug: 'Restricting-and-managing-apps-on-user-devices-62t_7oiZx',
      previousContentSlug: 'How-to-manage-devices-using-Intune-_LL9VqGZO',
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
