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
      article: {"slug":"The-many-ways-to-implement-multi-factor-authentication-MFA-in-Microsoft-365-nAAIvNbtk","type":"article","featuredImage":"https://i.ibb.co/P1P0wNY/microsoft-365-manage-security-defaults.png","id":"nAAIvNbtk","datePublished":"2022/5/26","images":["https://i.ibb.co/P1P0wNY/microsoft-365-manage-security-defaults.png","https://i.ibb.co/RjswM6n/per-user-mfa.png","https://i.ibb.co/PZm5KmW/enable-per-user-mfa.png","https://i.ibb.co/S7V5dtG/enable-per-user-mfa-last-button.png","https://i.ibb.co/DQm1sY0/Create-conditional-access-policy.png","https://i.ibb.co/qxDcS5y/name-conditional-access-policy.png","https://i.ibb.co/12YyXpS/Set-Conditional-access-policy-to-all-users.png","https://i.ibb.co/T0vZjsW/conditional-access-policy-all-cloud-apps.png","https://i.ibb.co/mcCvKFG/conditional-access-policy-requiring-mfa.png","https://i.ibb.co/gRrD5Pb/MFA-Enabled.png","https://i.ibb.co/xDMnv45/keep-your-account-secure-page.png","https://i.ibb.co/gT5QZKt/scan-qr-code.png","https://i.ibb.co/VjsxsJ4/notification-approved.png","https://i.ibb.co/St4Fkrz/enter-phone-number-to-recieve-text-message.png","https://i.ibb.co/W6c37x4/enter-code-received-in-text-message.png","https://i.ibb.co/wQ44kFB/SMS-verified.png","https://i.ibb.co/TbQvJDf/Click-done.png","https://i.ibb.co/MsS22gP/install-the-authenticator-app.png","https://i.ibb.co/vDYhfBd/Setup-authenticator-app.png","https://i.ibb.co/YhvggFT/approve-sign-in.png","https://i.ibb.co/HTFhBzB/MFA-Status.png","https://i.ibb.co/gz1c3d2/per-user-mfa-settings.png"],"publish":true,"description":"There are 5 different ways to enable MFA in Microsoft 365. Learn which way is the best way in this guide.","sectionId":"AFV_acckJ","article":{"blocks":[{"type":"unstyled","entityRanges":[],"text":"There are five, count it five, separate ways to configure multifactor authentication in Microsoft 365. In this article, we will go over three of them because one of them is no longer supported and one of them uses third-party tools that are out of scope for the MS-500.","depth":0,"data":{},"inlineStyleRanges":[],"key":"6g2e4"},{"inlineStyleRanges":[],"data":{},"depth":0,"text":"Security Defaults","type":"header-two","key":"6ju97","entityRanges":[]},{"type":"unstyled","entityRanges":[],"key":"b8rd","depth":0,"data":{},"inlineStyleRanges":[],"text":"Security defaults are the latest way to enable MFA in Microsoft 365. Security defaults enable MFA across your entire tenant. That includes all of your users. There is no way to limit MFA to a select user or group with security defaults. If you created your tenant after October 22nd, 2019 security defaults are probably already enabled on your tenant. "},{"inlineStyleRanges":[],"type":"unstyled","data":{},"entityRanges":[],"key":"d3jp9","depth":0,"text":"By enabling security defaults in your Microsoft 365 tenant you're not only requiring MFA but you're also blocking legacy authentication, for example, IMAP, POP3, and basic auth."},{"text":"Security Defaults are available for all Microsoft 365 tenants regardless of your licensing.","type":"unstyled","depth":0,"data":{},"entityRanges":[],"key":"dm3ui","inlineStyleRanges":[]},{"type":"header-three","entityRanges":[],"data":{},"depth":0,"inlineStyleRanges":[],"text":"How to enable/disable security defaults","key":"3b06s"},{"depth":0,"inlineStyleRanges":[{"length":22,"offset":47,"style":"BOLD"},{"offset":72,"style":"BOLD","length":11},{"length":24,"offset":85,"style":"BOLD"},{"style":"BOLD","offset":117,"length":4},{"length":3,"style":"BOLD","offset":149},{"style":"BOLD","length":4,"offset":181}],"text":"1. Go to Azure Active Directory admin center > Azure Active Directory > Properties > Manage Security Defaults. Click Yes to enable the policy. Click No to disable the policy. Click Save.","key":"bcnkf","type":"unstyled","data":{},"entityRanges":[{"key":0,"offset":72,"length":10}]},{"entityRanges":[{"offset":0,"key":1,"length":1}],"key":"1qv2a","text":" ","type":"atomic","depth":0,"data":{},"inlineStyleRanges":[]},{"entityRanges":[],"text":"Per-user MFA","inlineStyleRanges":[],"depth":0,"key":"efs5j","data":{},"type":"header-two"},{"data":{},"entityRanges":[],"depth":0,"key":"1kh0t","inlineStyleRanges":[],"text":"Per-user MFA gives more control over who is required to use multifactor authentication, but it requires you to enable MFA for every user individually. That means every time you create a new user in Microsoft 365 you need to enable MFA for that user. But it also means you can roll out MFA to a set of users.","type":"unstyled"},{"text":"Per-user MFA is available for all Microsoft 365 tenants regardless of your licensing.","data":{},"key":"2oqlb","inlineStyleRanges":[],"entityRanges":[],"depth":0,"type":"unstyled"},{"key":"299as","type":"header-three","data":{},"entityRanges":[],"inlineStyleRanges":[],"text":"How to enable per-user MFA","depth":0},{"key":"cvfj5","data":{},"inlineStyleRanges":[{"offset":38,"style":"BOLD","length":12},{"style":"BOLD","length":27,"offset":53}],"text":"1. Go to Microsoft 365 admin center > Active users > Multi-factor authentication.","type":"unstyled","depth":0,"entityRanges":[{"key":2,"length":27,"offset":53}]},{"depth":0,"data":{},"type":"atomic","entityRanges":[{"key":3,"length":1,"offset":0}],"text":" ","key":"43ool","inlineStyleRanges":[]},{"data":{},"depth":0,"type":"unstyled","entityRanges":[],"inlineStyleRanges":[{"length":6,"offset":72,"style":"BOLD"}],"key":"1244s","text":"2. Click the check box next to a user you want to enable MFA for. Click Enable."},{"type":"atomic","key":"9h50r","depth":0,"data":{},"entityRanges":[{"offset":0,"length":1,"key":4}],"inlineStyleRanges":[],"text":" "},{"data":{},"key":"8o4ta","depth":0,"text":"3. Click enable multi-factor auth.","entityRanges":[],"type":"unstyled","inlineStyleRanges":[{"style":"BOLD","length":24,"offset":9}]},{"key":"b9mbs","type":"atomic","depth":0,"entityRanges":[{"offset":0,"length":1,"key":5}],"inlineStyleRanges":[],"text":" ","data":{}},{"key":"8cseb","data":{},"type":"header-three","inlineStyleRanges":[],"entityRanges":[],"depth":0,"text":"Understanding MFA Status"},{"data":{},"text":" ","type":"atomic","depth":0,"entityRanges":[{"key":6,"offset":0,"length":1}],"inlineStyleRanges":[],"key":"9j7ar"},{"entityRanges":[],"text":"With per-user MFA you'll notice there are three different statuses. Disabled means the user isn't required to use per-user MFA. Next, enabled means the user is required to set up their MFA at the next login. Enforced means the user has set up the MFA.","inlineStyleRanges":[{"length":8,"style":"BOLD","offset":68},{"style":"BOLD","length":8,"offset":134},{"style":"BOLD","length":9,"offset":208}],"data":{},"type":"unstyled","depth":0,"key":"1kikr"},{"inlineStyleRanges":[],"type":"header-three","data":{},"entityRanges":[],"depth":0,"key":"2q4g8","text":"How to configure the settings in per-user MFA"},{"depth":0,"inlineStyleRanges":[],"entityRanges":[{"key":7,"offset":0,"length":1}],"key":"crpdo","data":{},"type":"atomic","text":" "},{"text":"One last thing. You can configure some options in the per-user MFA. By going to service settings you'll notice a whole list of options.","type":"unstyled","entityRanges":[],"inlineStyleRanges":[],"depth":0,"key":"3ujt1","data":{}},{"data":{},"inlineStyleRanges":[{"length":14,"offset":0,"style":"BOLD"}],"text":"App passwords are a great way to allow legacy apps to continue to connect to Microsoft 365. In short, app passwords will replace the users' passwords so they can still log in to Microsoft 365 using an app that doesn't support Microsoft 365 MFA.","type":"unordered-list-item","depth":0,"key":"ela4a","entityRanges":[]},{"entityRanges":[],"depth":0,"type":"unordered-list-item","key":"22g8s","inlineStyleRanges":[{"style":"BOLD","length":12,"offset":0}],"text":"Trusted IPs are a simple way to bypass MFA when the users are coming from a certain IP address.","data":{}},{"depth":0,"entityRanges":[],"data":{},"type":"unordered-list-item","key":"5l92","inlineStyleRanges":[{"offset":0,"length":20,"style":"BOLD"},{"style":"BOLD","offset":153,"length":21}],"text":"Verification options are the options that a user can set up MFA. For example, if you don't want users to be able to receive text messages simply uncheck Text message to phone."},{"key":"2dotp","depth":0,"inlineStyleRanges":[{"style":"BOLD","offset":0,"length":23}],"data":{},"entityRanges":[],"text":"Allow users to remember will allow the users to not be prompted every time they need to re-authenticate from a device.","type":"unordered-list-item"},{"depth":0,"inlineStyleRanges":[],"text":"Conditional access policy","data":{},"entityRanges":[],"type":"header-two","key":"8mghh"},{"inlineStyleRanges":[],"data":{},"text":"The last built-in choice is via conditional access policies. Conditional access policies provide the best security defaults as well as the best per-user MFA. With conditional access policies, you can deploy MFA to a user or a group of users, so you don't have to require MFA for all users as you do with security defaults. Also, you can configure conditional access policies to include all users or all administrators, so you don't need to remember to enable MFA for every new user as you need to do with per-user MFA.","type":"unstyled","key":"aj3p7","entityRanges":[],"depth":0},{"entityRanges":[],"type":"unstyled","text":"The one downside of conditional access policies is licensing. Conditional access policies are only available for azure SD premium P1 licensed users. Conditional access policies are also available to Microsoft 365 business premium users.","inlineStyleRanges":[],"data":{},"key":"am59g","depth":0},{"data":{},"inlineStyleRanges":[],"text":"How to enable MFA using conditional access policies","entityRanges":[],"depth":0,"type":"header-three","key":"fb9eh"},{"type":"unstyled","data":{},"depth":0,"inlineStyleRanges":[{"style":"BOLD","length":12,"offset":51},{"length":27,"style":"BOLD","offset":66},{"style":"BOLD","length":10,"offset":96},{"offset":109,"style":"BOLD","length":17}],"entityRanges":[],"text":"1. log in to Azure Active Directory admin center > All services > Azure AD Conditional Access > New Policy > Create new policy.","key":"crsit"},{"depth":0,"data":{},"text":" ","entityRanges":[{"length":1,"key":8,"offset":0}],"inlineStyleRanges":[],"key":"ar1vp","type":"atomic"},{"depth":0,"entityRanges":[],"data":{},"text":"2. Enter a name of “Require MFA”","type":"unstyled","key":"8mpbh","inlineStyleRanges":[{"style":"BOLD","offset":20,"length":11}]},{"key":"fveqj","text":" ","depth":0,"type":"atomic","entityRanges":[{"key":9,"offset":0,"length":1}],"data":{},"inlineStyleRanges":[]},{"key":"713o9","data":{},"text":"3. Click 0 users or workload identities selected. Click All users.","depth":0,"entityRanges":[],"inlineStyleRanges":[{"offset":9,"style":"BOLD","length":39},{"offset":56,"style":"BOLD","length":9}],"type":"unstyled"},{"inlineStyleRanges":[],"depth":0,"type":"atomic","data":{},"entityRanges":[{"offset":0,"key":10,"length":1}],"key":"a55eo","text":" "},{"entityRanges":[],"key":"1c2a","depth":0,"data":{},"text":"4. Click No cloud apps, actions, or authentication contexts selected. Click All cloud apps.","inlineStyleRanges":[{"length":59,"offset":9,"style":"BOLD"},{"length":14,"style":"BOLD","offset":76}],"type":"unstyled"},{"key":"esojv","depth":0,"data":{},"text":" ","inlineStyleRanges":[],"entityRanges":[{"key":11,"length":1,"offset":0}],"type":"atomic"},{"entityRanges":[],"inlineStyleRanges":[{"length":19,"style":"BOLD","offset":9},{"length":35,"style":"BOLD","offset":50},{"offset":93,"length":6,"style":"BOLD"},{"style":"BOLD","offset":107,"length":2},{"length":6,"style":"BOLD","offset":139}],"text":"5. Click 0 controls selected (under Grant). Click Require multi-factor authentication. Click Select. Click On (under Enable policy). Click Create.","depth":0,"key":"62fgh","type":"unstyled","data":{}},{"depth":0,"text":" ","entityRanges":[{"key":12,"length":1,"offset":0}],"inlineStyleRanges":[],"type":"atomic","data":{},"key":"1qkma"},{"entityRanges":[],"text":"MFA Server","depth":0,"inlineStyleRanges":[],"key":"7p222","type":"header-two","data":{}},{"inlineStyleRanges":[],"depth":0,"data":{},"type":"unstyled","entityRanges":[],"key":"8u70p","text":"Another possibility to deploy multifactor authentication in Microsoft 365 is to deploy an MFA server. MFA server would be an application that's installed on any Windows 2008 R two or later server that's joined to your domain. In short, you would download the MFA server installation files from Microsoft and install the software on your server. Then with a quick configuration, you can deploy your MFA server. As of July 1st, 2019 Microsoft, no longer offers an MFA server for new deployments. So, we won't be covering the installation or configuration in this guide."},{"depth":0,"inlineStyleRanges":[],"key":"50guu","text":"Third-party options","data":{},"type":"header-two","entityRanges":[]},{"key":"954c2","inlineStyleRanges":[],"text":"Microsoft has also configured Microsoft 365 so third-party vendors can offer multifactor authentication options. Several vendors sell software or cloud-only options that can tie into Microsoft 365 and provide you with multifactor authentication. Some of those vendors are one login and duo. They won't be covering the deployment of these options in this guide because they are not covered in the MS-500.","entityRanges":[],"data":{},"depth":0,"type":"unstyled"},{"depth":0,"data":{},"key":"187ec","type":"header-two","entityRanges":[],"inlineStyleRanges":[],"text":"User experience"},{"entityRanges":[],"data":{},"key":"89t8j","depth":0,"inlineStyleRanges":[],"text":"Once MFA is enabled for a user the user will see the following prompts (either in the browser or in Outlook).","type":"unstyled"},{"depth":0,"key":"eljbq","inlineStyleRanges":[{"style":"BOLD","length":4,"offset":49}],"entityRanges":[],"data":{},"text":"1. On the More information required prompt click Next.","type":"unstyled"},{"key":"5rhr2","depth":0,"type":"atomic","entityRanges":[{"length":1,"offset":0,"key":13}],"text":" ","inlineStyleRanges":[],"data":{}},{"key":"4r4i6","entityRanges":[],"type":"unstyled","data":{},"text":"2. On Keep your account secure / start by getting the app page download Microsoft Authenticator to your mobile phone and open the app.","depth":0,"inlineStyleRanges":[]},{"entityRanges":[{"length":1,"key":14,"offset":0}],"key":"emuso","depth":0,"type":"atomic","data":{},"text":" ","inlineStyleRanges":[]},{"entityRanges":[],"key":"1lre1","type":"unstyled","inlineStyleRanges":[{"length":8,"style":"BOLD","offset":25},{"style":"BOLD","length":14,"offset":35},{"offset":52,"style":"BOLD","length":19}],"text":"3. Once in the app click I agree > Scan a QR code > While using the app.","depth":0,"data":{}},{"key":"e3llq","depth":0,"entityRanges":[{"key":15,"length":1,"offset":0}],"data":{},"type":"atomic","inlineStyleRanges":[],"text":" "},{"entityRanges":[],"text":"3. Then go back to the sign-in page and click Next.","type":"unstyled","inlineStyleRanges":[{"length":4,"style":"BOLD","offset":46}],"key":"89t62","depth":0,"data":{}},{"inlineStyleRanges":[],"entityRanges":[{"length":1,"offset":0,"key":16}],"data":{},"text":" ","type":"atomic","depth":0,"key":"52og6"},{"data":{},"depth":0,"key":"alog3","text":"3. On Scan the QR code page scan the QR code with the Microsoft authenticator app on your phone. Click Next.","type":"unstyled","entityRanges":[],"inlineStyleRanges":[{"style":"BOLD","offset":103,"length":4}]},{"type":"atomic","text":" ","key":"9c51g","data":{},"entityRanges":[{"length":1,"key":17,"offset":0}],"depth":0,"inlineStyleRanges":[]},{"depth":0,"text":"4. Approve the sign-in request on your phone.","type":"unstyled","key":"1v56f","data":{},"entityRanges":[],"inlineStyleRanges":[]},{"inlineStyleRanges":[],"entityRanges":[{"offset":0,"key":18,"length":1}],"data":{},"depth":0,"key":"3i1pp","type":"atomic","text":" "},{"entityRanges":[],"type":"unstyled","depth":0,"data":{},"text":"5. Once you see the Notification approved message click Next.","key":"7r5bf","inlineStyleRanges":[{"length":4,"offset":56,"style":"BOLD"}]},{"key":"aa6cs","text":" ","depth":0,"entityRanges":[{"key":19,"offset":0,"length":1}],"inlineStyleRanges":[],"type":"atomic","data":{}},{"depth":0,"type":"unstyled","inlineStyleRanges":[{"style":"BOLD","length":4,"offset":61}],"text":"6. on the Phone page, enter your cell phone number and click Next.","entityRanges":[],"key":"4vc6e","data":{}},{"type":"atomic","entityRanges":[{"length":1,"offset":0,"key":20}],"inlineStyleRanges":[],"depth":0,"key":"46bl0","data":{},"text":" "},{"text":"7. Enter the code texted to you in the space provided. Click Next.","entityRanges":[],"inlineStyleRanges":[{"offset":61,"length":4,"style":"BOLD"}],"depth":0,"type":"unstyled","key":"i347","data":{}},{"text":" ","key":"d6no4","data":{},"depth":0,"inlineStyleRanges":[],"type":"atomic","entityRanges":[{"length":1,"offset":0,"key":21}]},{"type":"unstyled","entityRanges":[],"data":{},"key":"ahfi","depth":0,"text":"8. Once you see SMS verified. Click Next.","inlineStyleRanges":[{"style":"BOLD","length":4,"offset":36}]},{"type":"atomic","depth":0,"entityRanges":[{"key":22,"offset":0,"length":1}],"data":{},"inlineStyleRanges":[],"text":" ","key":"9bgtr"},{"entityRanges":[],"data":{},"inlineStyleRanges":[{"offset":29,"style":"BOLD","length":4}],"depth":0,"text":"9. On the success page click Done.","key":"1ladh","type":"unstyled"},{"type":"atomic","inlineStyleRanges":[],"entityRanges":[{"key":23,"length":1,"offset":0}],"depth":0,"text":" ","key":"7tiun","data":{}},{"depth":0,"key":"8akr6","type":"unstyled","inlineStyleRanges":[],"entityRanges":[],"text":"","data":{}}],"entityMap":{"0":{"type":"LINK","data":{"url":"https://aad.portal.azure.com/#blade/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/Properties","alignment":"left","alt":"Microsoft 365 security defaults","width":"auto","targetOption":"_blank","height":"auto","src":"https://i.ibb.co/P1P0wNY/microsoft-365-manage-security-defaults.png"},"mutability":"MUTABLE"},"1":{"mutability":"MUTABLE","type":"IMAGE","data":{"src":"https://i.ibb.co/P1P0wNY/microsoft-365-manage-security-defaults.png","alt":"Microsoft 365 security defaults","height":"auto","url":"https://account.activedirectory.windowsazure.com/UserManagement/MultifactorVerification.aspx","width":"auto","alignment":"none","targetOption":"_blank"}},"2":{"data":{"url":"https://account.activedirectory.windowsazure.com/UserManagement/MultifactorVerification.aspx","targetOption":"_blank"},"type":"LINK","mutability":"MUTABLE"},"3":{"data":{"alignment":"none","alt":"Microsoft 365 Per-User MFA","height":"auto","width":"auto","src":"https://i.ibb.co/RjswM6n/per-user-mfa.png"},"mutability":"MUTABLE","type":"IMAGE"},"4":{"mutability":"MUTABLE","data":{"height":"auto","width":"auto","src":"https://i.ibb.co/PZm5KmW/enable-per-user-mfa.png","alignment":"none","alt":"Enable per-user MFA"},"type":"IMAGE"},"5":{"mutability":"MUTABLE","type":"IMAGE","data":{"width":"auto","alt":"Enable multi-factor auth","alignment":"none","height":"auto","src":"https://i.ibb.co/S7V5dtG/enable-per-user-mfa-last-button.png"}},"6":{"data":{"alt":"MFA Status in Microsoft 365","src":"https://i.ibb.co/HTFhBzB/MFA-Status.png","alignment":"none","width":"auto","height":"auto"},"type":"IMAGE","mutability":"MUTABLE"},"7":{"data":{"width":"auto","alt":"Per-User MFA Settings","height":"auto","src":"https://i.ibb.co/gz1c3d2/per-user-mfa-settings.png","alignment":"none"},"type":"IMAGE","mutability":"MUTABLE"},"8":{"type":"IMAGE","data":{"alignment":"none","src":"https://i.ibb.co/DQm1sY0/Create-conditional-access-policy.png","height":"auto","alt":"Create a conditional access policy","width":"auto"},"mutability":"MUTABLE"},"9":{"type":"IMAGE","data":{"src":"https://i.ibb.co/qxDcS5y/name-conditional-access-policy.png","height":"auto","alignment":"none","alt":"Name the conditional access Policy Require MFA","width":"auto"},"mutability":"MUTABLE"},"10":{"type":"IMAGE","mutability":"MUTABLE","data":{"alt":"Set Conditional access policy to all users","width":"auto","src":"https://i.ibb.co/12YyXpS/Set-Conditional-access-policy-to-all-users.png","height":"auto","alignment":"none"}},"11":{"type":"IMAGE","data":{"src":"https://i.ibb.co/T0vZjsW/conditional-access-policy-all-cloud-apps.png","width":"auto","height":"auto","alignment":"none","alt":"Conditional access policy all cloud apps"},"mutability":"MUTABLE"},"12":{"mutability":"MUTABLE","type":"IMAGE","data":{"alt":"Conditional access policy requiring MFA","alignment":"none","height":"auto","src":"https://i.ibb.co/mcCvKFG/conditional-access-policy-requiring-mfa.png","width":"auto"}},"13":{"data":{"alt":"MFA Enabled More information required","src":"https://i.ibb.co/gRrD5Pb/MFA-Enabled.png","height":"auto","alignment":"none","width":"auto"},"mutability":"MUTABLE","type":"IMAGE"},"14":{"mutability":"MUTABLE","type":"IMAGE","data":{"height":"auto","src":"https://i.ibb.co/MsS22gP/install-the-authenticator-app.png","alt":"Install the authentication app","width":"auto","alignment":"none"}},"15":{"data":{"alt":"Setup the authenticator app","src":"https://i.ibb.co/vDYhfBd/Setup-authenticator-app.png","height":"auto","alignment":"none","width":"auto"},"type":"IMAGE","mutability":"MUTABLE"},"16":{"data":{"width":"auto","alt":"Keep you account secure page","src":"https://i.ibb.co/xDMnv45/keep-your-account-secure-page.png","height":"auto","alignment":"none"},"mutability":"MUTABLE","type":"IMAGE"},"17":{"data":{"width":"auto","alignment":"none","alt":"Scan the QR code with your phone","height":"auto","src":"https://i.ibb.co/gT5QZKt/scan-qr-code.png"},"mutability":"MUTABLE","type":"IMAGE"},"18":{"type":"IMAGE","data":{"alt":"Approve the sign in","height":"auto","alignment":"none","width":"auto","src":"https://i.ibb.co/YhvggFT/approve-sign-in.png"},"mutability":"MUTABLE"},"19":{"type":"IMAGE","data":{"height":"auto","width":"auto","src":"https://i.ibb.co/VjsxsJ4/notification-approved.png","alignment":"none","alt":"Notification approved"},"mutability":"MUTABLE"},"20":{"data":{"height":"auto","width":"auto","alignment":"none","src":"https://i.ibb.co/St4Fkrz/enter-phone-number-to-recieve-text-message.png","alt":"Enter phone number to receive text message"},"type":"IMAGE","mutability":"MUTABLE"},"21":{"data":{"height":"auto","width":"auto","alt":"Enter the code you received in the text message","alignment":"none","src":"https://i.ibb.co/W6c37x4/enter-code-received-in-text-message.png"},"mutability":"MUTABLE","type":"IMAGE"},"22":{"data":{"width":"auto","alt":"SMS verified","src":"https://i.ibb.co/wQ44kFB/SMS-verified.png","height":"auto","alignment":"none"},"type":"IMAGE","mutability":"MUTABLE"},"23":{"type":"IMAGE","mutability":"MUTABLE","data":{"alignment":"none","height":"auto","alt":"Click done","src":"https://i.ibb.co/TbQvJDf/Click-done.png","width":"auto"}}}},"title":"The many ways to implement multi-factor authentication (MFA) in Microsoft 365"},
      articles: [{"id":"cpchjBLkC","sectionId":"qwJW5VrBW","slug":"Whats-in-this-course-cpchjBLkC","title":"What's in this course?","featuredImage":"https://i.ibb.co/zFs9Vfb/microsoft365-security-administrator-associate-600x600.png"},{"id":"KKkBOVuS4","sectionId":"qwJW5VrBW","slug":"Creating-a-free-Microsoft-365-tenant-for-practice-KKkBOVuS4","title":"Creating a free Microsoft 365 tenant for practice","featuredImage":"https://i.ibb.co/F07sjQJ/microsoft-365-e5-trial.png"},{"id":"bzotoOjEe","sectionId":"qwJW5VrBW","slug":"Managing-the-Microsoft-365-tenant-Introduction-to-the-admin-centers-bzotoOjEe","title":"Managing the Microsoft 365 tenant - Introduction to the admin centers","featuredImage":"https://i.ibb.co/f1cr4zt/Microsoft-365-admin-centers.png"},{"id":"cg_vxOX9L","sectionId":"qwJW5VrBW","slug":"Managing-Microsoft-365-through-PowerShell-cg_vxOX9L","title":"Managing Microsoft 365 through PowerShell","featuredImage":"https://i.ibb.co/HV13YF6/install-microsoft-365-powershell-modules.png"},{"id":"uYCIPbnMC","sectionId":"AFV_acckJ","slug":"How-to-create-users-in-Microsoft-365-Cloud-Only-uYCIPbnMC","title":"How to create users in Microsoft 365 Cloud Only","featuredImage":"https://i.ibb.co/Wnt5Q43/View-Microsoft-365-Users.png"},{"id":"7CpqFkPZU","sectionId":"AFV_acckJ","slug":"Creating-and-managing-admins-through-roles-7CpqFkPZU","title":"Creating and managing admins through roles","featuredImage":"https://i.ibb.co/kySL4HQ/Roles-and-administrators.png"},{"id":"rZzausKJ1","sectionId":"AFV_acckJ","slug":"Time-limited-admin-roles-in-Microsoft-365-rZzausKJ1","title":"Time limited admin roles in Microsoft 365","featuredImage":"https://i.ibb.co/nDvjyPD/select-member-to-add-to-PIM-role.png"},{"id":"ky5W0Lz5P","sectionId":"AFV_acckJ","slug":"Whats-AD-Connect-ky5W0Lz5P","title":"What's AD Connect","featuredImage":"https://i.ibb.co/7nDqr9x/Whats-AD-Connect.png"},{"id":"i9pJIjTNH","sectionId":"AFV_acckJ","slug":"Protecting-Passwords-in-Microsoft-365-i9pJIjTNH","title":"Protecting Passwords in Microsoft 365","featuredImage":"https://i.ibb.co/DLD4G4q/access-smart-lockout-settings.png"},{"id":"S1hQgFOMV","sectionId":"AFV_acckJ","slug":"Creating-and-managing-users-through-groups-S1hQgFOMV","title":"Creating and managing users through groups","featuredImage":"https://i.ibb.co/nmmC28M/add-a-group-microsoft-365.png"},{"id":"2QfoI2HxY","sectionId":"AFV_acckJ","slug":"Securing-and-implementing-enterprise-applications-2QfoI2HxY","title":"Securing and implementing enterprise applications","featuredImage":"https://i.ibb.co/C2mp69m/disable-user-consent.png"},{"id":"V1en9Iugh","sectionId":"AFV_acckJ","slug":"Whats-a-conditional-access-policy-V1en9Iugh","title":"What's a conditional access policy?","featuredImage":"https://i.ibb.co/DQm1sY0/Create-conditional-access-policy.png"},{"id":"nAAIvNbtk","sectionId":"AFV_acckJ","slug":"The-many-ways-to-implement-multi-factor-authentication-MFA-in-Microsoft-365-nAAIvNbtk","title":"The many ways to implement multi-factor authentication (MFA) in Microsoft 365","featuredImage":"https://i.ibb.co/P1P0wNY/microsoft-365-manage-security-defaults.png"},{"id":"2S9jn0aLr","sectionId":"AFV_acckJ","slug":"Implement-Self-service-password-reset-in-Microsoft-365-2S9jn0aLr","title":"Implement Self-service password reset in Microsoft 365","featuredImage":"https://i.ibb.co/58y9JVg/write-back-passwords-to-on-premises-directory.png"},{"id":"FldNualGC","sectionId":"AFV_acckJ","slug":"Locking-down-your-Microsoft-365-tenant-from-Microsoft-engineers-FldNualGC","title":"Locking down your Microsoft 365 tenant from Microsoft engineers","featuredImage":"https://i.ibb.co/DCmpnT9/Enable-Customer-Lockbox.png"},{"id":"NFQ6rYFeQ","sectionId":"AFV_acckJ","slug":"Implementing-intelligent-security-using-risk-policies-in-Microsoft-365-NFQ6rYFeQ","title":"Implementing intelligent security using risk policies in Microsoft 365","featuredImage":"https://i.ibb.co/0cyQJ7j/Risk-Detections.png"},{"id":"rK48f6iM2","sectionId":"AFV_acckJ","slug":"Automating-Access-Review-in-Microsoft-365-rK48f6iM2","title":"Automating Access Review in Microsoft 365","featuredImage":"https://i.ibb.co/Xsxvz6Z/new-access-review.png"},{"id":"RHW1API2s","sectionId":"AFV_acckJ","slug":"Just-in-time-approval-and-notification-for-admin-roles-in-Microsoft-365-RHW1API2s","title":"Just in time, approval and notification for admin roles in Microsoft 365","featuredImage":"https://i.ibb.co/dcb6XFN/Activate-a-Role.png"},{"id":"z8EMM9Eu_","sectionId":"QScYfSu74","slug":"Whats-Microsoft-365-Defender-z8EMM9Eu_","title":"What's Microsoft 365 Defender?","featuredImage":"https://i.ibb.co/MDMyDQt/Microsoft-Defender.png"},{"id":"Kye_yNLxA","sectionId":"QScYfSu74","slug":"Whats-Microsoft-Defender-for-identity-Kye_yNLxA","title":"What's Microsoft Defender for identity?","featuredImage":"https://i.ibb.co/bQDBh0Y/Defender-for-Identity-Timeline.png"},{"id":"EnPyp7ukN","sectionId":"QScYfSu74","slug":"Whats-Microsoft-Defender-for-Office-365-EnPyp7ukN","title":"What's Microsoft Defender for Office 365?","featuredImage":"https://i.ibb.co/WcwKY2G/Microsoft-365-incidents-and-alerts.png"},{"id":"6HUOr7qbL","sectionId":"QScYfSu74","slug":"Protect-your-email-environment-from-malicious-actors-6HUOr7qbL","title":"Protect your email and Office environment from malicious actors","featuredImage":"https://i.ibb.co/Df0KQVp/Reports.png"},{"id":"GCOOUsSBT","sectionId":"QScYfSu74","slug":"Protecting-email-against-phishing-attacks-GCOOUsSBT","title":"Protecting email against phishing attacks","featuredImage":"https://i.ibb.co/GCjZHWg/edit-actions.png"},{"id":"GG4cMY8pK","sectionId":"QScYfSu74","slug":"Simulating-attacks-with-Microsoft-365-GG4cMY8pK","title":"Simulating attacks with Microsoft 365","featuredImage":"https://i.ibb.co/NyvnbMK/simulation-overview-view-users-circled.png"},{"id":"z0qPG6v4T","sectionId":"QScYfSu74","slug":"Protecting-Windows-10-and-other-devices-with-Microsoft-Defender-for-Endpoint-z0qPG6v4T","title":"Protecting Windows 10 and other devices with Microsoft Defender for Endpoint","featuredImage":"https://i.ibb.co/T47Xhyh/enable-endpoint-connections.png"},{"id":"LEyZMWBSt","sectionId":"QScYfSu74","slug":"Collect-detect-investigate-and-respond-to-security-threats-using-Microsoft-Sentinel-LEyZMWBSt","title":"Collect, detect, investigate, and respond to security threats using Microsoft Sentinel","featuredImage":"https://i.ibb.co/qN9XsKj/Add-Workbook.png"},{"id":"7MQ3wE4wP","sectionId":"QScYfSu74","slug":"Implement-and-manage-Microsoft-Defender-for-Cloud-Apps-7MQ3wE4wP","title":"Implement and manage Microsoft Defender for Cloud Apps","featuredImage":"https://i.ibb.co/7g7LvFg/office-365-cloud-apps-settings.png"},{"id":"sH_Ee1DW1","sectionId":"QScYfSu74","slug":"Auditing-sign-ins-and-other-actions-in-Microsoft-365-sH_Ee1DW1","title":"Auditing sign-ins and other actions in Microsoft 365","featuredImage":"https://i.ibb.co/BqMw3jZ/Start-recording-user-and-admin-activity.png"},{"id":"vLweLmxZf","sectionId":"YhftdGIRX","slug":"How-to-classify-data-using-labels-in-Microsoft-365-vLweLmxZf","title":"How to classify data using labels in Microsoft 365","featuredImage":"https://i.ibb.co/k9nhWS5/Choose-protection-settings-for-files-and-emails.png"},{"id":"NsF7No40f","sectionId":"YhftdGIRX","slug":"Creating-and-managing-data-retention-to-conform-to-compliance-NsF7No40f","title":"Creating and managing data retention to conform to compliance","featuredImage":"https://i.ibb.co/yqC0ZdY/New-Retention-Policy.png"},{"id":"IsPGsme8w","sectionId":"YhftdGIRX","slug":"Preventing-accidental-and-malicious-data-loss-with-DLP-policies-IsPGsme8w","title":"Preventing accidental and malicious data loss with DLP policies","featuredImage":"https://i.ibb.co/n8WcqKM/Create-a-DLP-policy.png"},{"id":"wv2PbXnhI","sectionId":"YhftdGIRX","slug":"Everything-you-need-to-know-about-securing-SharePoint-Online-for-the-MS-500-wv2PbXnhI","title":"Everything you need to know about securing SharePoint Online for the MS-500","featuredImage":"https://i.ibb.co/Gk9NjSH/Share-Point-Online-Warning.png"},{"id":"7gR3L122b","sectionId":"l0DxUuonW","slug":"Introduction-to-Intune-7gR3L122b","title":"Introduction to Intune","featuredImage":"https://i.ibb.co/Fq3N8BX/Endpoint-Manager-Admin-Center.png"},{"id":"ZyKX3Idjs","sectionId":"l0DxUuonW","slug":"Setting-up-Android-Devices-ZyKX3Idjs","title":"Setting up Android Devices","featuredImage":"https://i.ibb.co/m0BYhL2/Connect-Intune-to-Google-Play.png"},{"id":"MAjW0a2_p","sectionId":"l0DxUuonW","slug":"Setting-up-Apple--iOS-devices-in-Intune-MAjW0a2_p","title":"Setting up Apple / iOS devices in Intune","featuredImage":"https://i.ibb.co/X7Ffb2B/Setup-Apple-Enrollment-in-Intune.png"},{"id":"XFXu2zIS9","sectionId":"l0DxUuonW","slug":"Setting-up-Windows-10-devices-in-Intune-XFXu2zIS9","title":"Setting up Windows 10 devices in Intune","featuredImage":"https://i.ibb.co/WDXKVjW/configure-device-options.png"},{"id":"_LL9VqGZO","sectionId":"l0DxUuonW","slug":"How-to-manage-devices-using-Intune-_LL9VqGZO","title":"How to manage devices using Intune","featuredImage":"https://i.ibb.co/HPQ2m8t/Create-an-endpoint-protection-profile.png"},{"id":"qDRA4jjoN","sectionId":"l0DxUuonW","slug":"Understanding-compliance-policies-qDRA4jjoN","title":"Understanding compliance policies","featuredImage":"https://i.ibb.co/N3Qk57v/Create-a-compliance-policy.png"},{"id":"62t_7oiZx","sectionId":"l0DxUuonW","slug":"Restricting-and-managing-apps-on-user-devices-62t_7oiZx","title":"Restricting and managing apps on user devices","featuredImage":"https://i.ibb.co/PCVRKDf/Add-an-Android-app-to-Intune.png"}],
      articleHtml: `<p>There are five, count it five, separate ways to configure multifactor authentication in Microsoft 365. In this article, we will go over three of them because one of them is no longer supported and one of them uses third-party tools that are out of scope for the MS-500.</p>
<h2>Security Defaults</h2>
<p>Security defaults are the latest way to enable MFA in Microsoft 365. Security defaults enable MFA across your entire tenant. That includes all of your users. There is no way to limit MFA to a select user or group with security defaults. If you created your tenant after October 22nd, 2019 security defaults are probably already enabled on your tenant.&nbsp;</p>
<p>By enabling security defaults in your Microsoft 365 tenant you're not only requiring MFA but you're also blocking legacy authentication, for example, IMAP, POP3, and basic auth.</p>
<p>Security Defaults are available for all Microsoft 365 tenants regardless of your licensing.</p>
<h3>How to enable/disable security defaults</h3>
<p>1. Go to Azure Active Directory admin center &gt; <strong>Azure Active Directory</strong> &gt; <a href="https://aad.portal.azure.com/#blade/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/Properties" target="_blank"><strong>Properties</strong></a><strong> </strong>&gt; <strong>Manage Security Defaults</strong>. Click <strong>Yes </strong>to enable the policy. Click <strong>No </strong>to disable the policy. Click <strong>Save</strong>.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/P1P0wNY/microsoft-365-manage-security-defaults.png" alt="Microsoft 365 security defaults" style="height: auto;width: auto"/></div>
<h2>Per-user MFA</h2>
<p>Per-user MFA gives more control over who is required to use multifactor authentication, but it requires you to enable MFA for every user individually. That means every time you create a new user in Microsoft 365 you need to enable MFA for that user. But it also means you can roll out MFA to a set of users.</p>
<p>Per-user MFA is available for all Microsoft 365 tenants regardless of your licensing.</p>
<h3>How to enable per-user MFA</h3>
<p>1. Go to Microsoft 365 admin center &gt; <strong>Active users</strong> &gt; <a href="https://account.activedirectory.windowsazure.com/UserManagement/MultifactorVerification.aspx" target="_blank"><strong>Multi-factor authentication</strong></a>.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/RjswM6n/per-user-mfa.png" alt="Microsoft 365 Per-User MFA" style="height: auto;width: auto"/></div>
<p>2. Click the check box next to a user you want to enable MFA for. Click <strong>Enable</strong>.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/PZm5KmW/enable-per-user-mfa.png" alt="Enable per-user MFA" style="height: auto;width: auto"/></div>
<p>3. Click <strong>enable multi-factor auth</strong>.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/S7V5dtG/enable-per-user-mfa-last-button.png" alt="Enable multi-factor auth" style="height: auto;width: auto"/></div>
<h3>Understanding MFA Status</h3>
<div style="text-align:none;"><img src="https://i.ibb.co/HTFhBzB/MFA-Status.png" alt="MFA Status in Microsoft 365" style="height: auto;width: auto"/></div>
<p>With per-user MFA you'll notice there are three different statuses. <strong>Disabled</strong> means the user isn't required to use per-user MFA. Next, <strong>enabled </strong>means the user is required to set up their MFA at the next login. <strong>Enforced </strong>means the user has set up the MFA.</p>
<h3>How to configure the settings in per-user MFA</h3>
<div style="text-align:none;"><img src="https://i.ibb.co/gz1c3d2/per-user-mfa-settings.png" alt="Per-User MFA Settings" style="height: auto;width: auto"/></div>
<p>One last thing. You can configure some options in the per-user MFA. By going to service settings you'll notice a whole list of options.</p>
<ul>
<li><strong>App passwords </strong>are a great way to allow legacy apps to continue to connect to Microsoft 365. In short, app passwords will replace the users' passwords so they can still log in to Microsoft 365 using an app that doesn't support Microsoft 365 MFA.</li>
<li><strong>Trusted IPs </strong>are a simple way to bypass MFA when the users are coming from a certain IP address.</li>
<li><strong>Verification options</strong> are the options that a user can set up MFA. For example, if you don't want users to be able to receive text messages simply uncheck <strong>Text message to phone</strong>.</li>
<li><strong>Allow users to remember</strong> will allow the users to not be prompted every time they need to re-authenticate from a device.</li>
</ul>
<h2>Conditional access policy</h2>
<p>The last built-in choice is via conditional access policies. Conditional access policies provide the best security defaults as well as the best per-user MFA. With conditional access policies, you can deploy MFA to a user or a group of users, so you don't have to require MFA for all users as you do with security defaults. Also, you can configure conditional access policies to include all users or all administrators, so you don't need to remember to enable MFA for every new user as you need to do with per-user MFA.</p>
<p>The one downside of conditional access policies is licensing. Conditional access policies are only available for azure SD premium P1 licensed users. Conditional access policies are also available to Microsoft 365 business premium users.</p>
<h3>How to enable MFA using conditional access policies</h3>
<p>1. log in to Azure Active Directory admin center &gt; <strong>All services</strong> &gt; <strong>Azure AD Conditional Access</strong> &gt; <strong>New Policy</strong> &gt; <strong>Create new policy</strong>.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/DQm1sY0/Create-conditional-access-policy.png" alt="Create a conditional access policy" style="height: auto;width: auto"/></div>
<p>2. Enter a name of “<strong>Require MFA</strong>”</p>
<div style="text-align:none;"><img src="https://i.ibb.co/qxDcS5y/name-conditional-access-policy.png" alt="Name the conditional access Policy Require MFA" style="height: auto;width: auto"/></div>
<p>3. Click <strong>0 users or workload identities selected</strong>. Click <strong>All users</strong>.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/12YyXpS/Set-Conditional-access-policy-to-all-users.png" alt="Set Conditional access policy to all users" style="height: auto;width: auto"/></div>
<p>4. Click <strong>No cloud apps, actions, or authentication contexts selected</strong>. Click <strong>All cloud apps</strong>.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/T0vZjsW/conditional-access-policy-all-cloud-apps.png" alt="Conditional access policy all cloud apps" style="height: auto;width: auto"/></div>
<p>5. Click <strong>0 controls selected</strong> (under Grant). Click <strong>Require multi-factor authentication</strong>. Click <strong>Select</strong>. Click <strong>On</strong> (under Enable policy). Click <strong>Create</strong>.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/mcCvKFG/conditional-access-policy-requiring-mfa.png" alt="Conditional access policy requiring MFA" style="height: auto;width: auto"/></div>
<h2>MFA Server</h2>
<p>Another possibility to deploy multifactor authentication in Microsoft 365 is to deploy an MFA server. MFA server would be an application that's installed on any Windows 2008 R two or later server that's joined to your domain. In short, you would download the MFA server installation files from Microsoft and install the software on your server. Then with a quick configuration, you can deploy your MFA server. As of July 1st, 2019 Microsoft, no longer offers an MFA server for new deployments. So, we won't be covering the installation or configuration in this guide.</p>
<h2>Third-party options</h2>
<p>Microsoft has also configured Microsoft 365 so third-party vendors can offer multifactor authentication options. Several vendors sell software or cloud-only options that can tie into Microsoft 365 and provide you with multifactor authentication. Some of those vendors are one login and duo. They won't be covering the deployment of these options in this guide because they are not covered in the MS-500.</p>
<h2>User experience</h2>
<p>Once MFA is enabled for a user the user will see the following prompts (either in the browser or in Outlook).</p>
<p>1. On the More information required prompt click <strong>Next</strong>.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/gRrD5Pb/MFA-Enabled.png" alt="MFA Enabled More information required" style="height: auto;width: auto"/></div>
<p>2. On Keep your account secure / start by getting the app page download Microsoft Authenticator to your mobile phone and open the app.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/MsS22gP/install-the-authenticator-app.png" alt="Install the authentication app" style="height: auto;width: auto"/></div>
<p>3. Once in the app click <strong>I agree </strong>&gt; <strong>Scan a QR code</strong> &gt; <strong>While using the app</strong>.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/vDYhfBd/Setup-authenticator-app.png" alt="Setup the authenticator app" style="height: auto;width: auto"/></div>
<p>3. Then go back to the sign-in page and click <strong>Next</strong>.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/xDMnv45/keep-your-account-secure-page.png" alt="Keep you account secure page" style="height: auto;width: auto"/></div>
<p>3. On Scan the QR code page scan the QR code with the Microsoft authenticator app on your phone. Click <strong>Next</strong>.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/gT5QZKt/scan-qr-code.png" alt="Scan the QR code with your phone" style="height: auto;width: auto"/></div>
<p>4. Approve the sign-in request on your phone.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/YhvggFT/approve-sign-in.png" alt="Approve the sign in" style="height: auto;width: auto"/></div>
<p>5. Once you see the Notification approved message click <strong>Next</strong>.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/VjsxsJ4/notification-approved.png" alt="Notification approved" style="height: auto;width: auto"/></div>
<p>6. on the Phone page, enter your cell phone number and click <strong>Next</strong>.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/St4Fkrz/enter-phone-number-to-recieve-text-message.png" alt="Enter phone number to receive text message" style="height: auto;width: auto"/></div>
<p>7. Enter the code texted to you in the space provided. Click <strong>Next</strong>.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/W6c37x4/enter-code-received-in-text-message.png" alt="Enter the code you received in the text message" style="height: auto;width: auto"/></div>
<p>8. Once you see SMS verified. Click <strong>Next</strong>.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/wQ44kFB/SMS-verified.png" alt="SMS verified" style="height: auto;width: auto"/></div>
<p>9. On the success page click <strong>Done</strong>.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/TbQvJDf/Click-done.png" alt="Click done" style="height: auto;width: auto"/></div>
<p></p>
`,
      nextContentSlug: 'Implement-Self-service-password-reset-in-Microsoft-365-2S9jn0aLr',
      previousContentSlug: 'Whats-a-conditional-access-policy-V1en9Iugh',
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
