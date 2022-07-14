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
      article: {"images":["https://i.ibb.co/5L6jZrq/sign-up-for-microsoft-365-free-trial.png","https://i.ibb.co/5L6jZrq/sign-up-for-microsoft-365-free-trial.png","https://i.ibb.co/F07sjQJ/microsoft-365-e5-trial.png","https://i.ibb.co/MMLchmz/tell-us-about-yourself.png","https://i.ibb.co/0ngk6BK/send-verification-code.png","https://i.ibb.co/xSYVRY1/how-youll-sign-in.png","https://i.ibb.co/xSYVRY1/how-youll-sign-in.png","https://i.ibb.co/QJXH0Dk/how-youll-sign-in-2.png"],"datePublished":"2022/5/26","slug":"Creating-a-free-Microsoft-365-tenant-for-practice-KKkBOVuS4","sectionId":"qwJW5VrBW","type":"article","title":"Creating a free Microsoft 365 tenant for practice","article":{"entityMap":{"0":{"mutability":"MUTABLE","type":"LINK","data":{"height":"auto","url":"https://click.linksynergy.com/fs-bin/click?id=iOIpmChCQh0&offerid=817940.17&type=3&subid=0","width":"auto","src":"https://i.ibb.co/F07sjQJ/microsoft-365-e5-trial.png","targetOption":"_blank","alt":"Microsoft 365 E5 Trial","alignment":"left"}},"1":{"mutability":"MUTABLE","type":"LINK","data":{"height":"auto","url":"https://click.linksynergy.com/fs-bin/click?id=iOIpmChCQh0&offerid=817940.17&type=3&subid=0","targetOption":"_blank","src":"https://i.ibb.co/MMLchmz/tell-us-about-yourself.png","alt":"Tell us about yourself form","alignment":"left","width":"auto"}},"2":{"type":"IMAGE","mutability":"MUTABLE","data":{"src":"https://i.ibb.co/F07sjQJ/microsoft-365-e5-trial.png","alt":"Microsoft 365 E5 Trial","height":"auto","alignment":"none","width":"auto","targetOption":"_blank","url":"https://click.linksynergy.com/fs-bin/click?id=iOIpmChCQh0&offerid=817940.17&type=3&subid=0"}},"3":{"type":"IMAGE","data":{"src":"https://i.ibb.co/MMLchmz/tell-us-about-yourself.png","alt":"Tell us about yourself form","width":"auto","height":"auto","alignment":"none"},"mutability":"MUTABLE"},"4":{"data":{"alignment":"none","alt":"Send verification code","src":"https://i.ibb.co/0ngk6BK/send-verification-code.png","height":"auto","width":"auto"},"type":"IMAGE","mutability":"MUTABLE"},"5":{"mutability":"MUTABLE","data":{"width":"auto","src":"https://i.ibb.co/xSYVRY1/how-youll-sign-in.png","alignment":"none","alt":"How you'll sign in","height":"auto"},"type":"IMAGE"},"6":{"data":{"alt":"How you'll sign in - enter credentials","src":"https://i.ibb.co/QJXH0Dk/how-youll-sign-in-2.png","alignment":"none","width":"auto","height":"auto"},"mutability":"MUTABLE","type":"IMAGE"}},"blocks":[{"entityRanges":[],"depth":0,"data":{},"text":"Before we can start learning how to secure Microsoft 365 we will need a test tenant. A tenant where we can implement whatever you want and test things out before implementing them in production. A place where we can perform hands-on learning in a live environment without affecting production. Fortunately, we can set up a Microsoft 365 tenant for free to try out. You only need a free email address, such as gmail.com, outlook.com, or yahoo.com, and a phone number.","type":"unstyled","key":"7famg","inlineStyleRanges":[]},{"entityRanges":[{"length":13,"offset":9,"key":0}],"inlineStyleRanges":[],"text":"1. Go to Office 365 E5     ","type":"unstyled","key":"424dd","data":{},"depth":0},{"entityRanges":[{"offset":9,"length":10,"key":1}],"text":"2. Click Free Trial","type":"unstyled","depth":0,"inlineStyleRanges":[],"key":"cims2","data":{}},{"data":{},"depth":0,"inlineStyleRanges":[],"entityRanges":[{"offset":0,"key":2,"length":1}],"key":"8ki3m","text":" ","type":"atomic"},{"inlineStyleRanges":[{"style":"BOLD","length":4,"offset":35}],"entityRanges":[],"depth":0,"data":{},"key":"c6rpj","text":"3. Enter your email address. Click Next.","type":"unstyled"},{"inlineStyleRanges":[{"style":"BOLD","length":14,"offset":9}],"data":{},"entityRanges":[],"text":"4. Click Set up account.","type":"unstyled","key":"90fvb","depth":0},{"key":"3fqj7","depth":0,"entityRanges":[],"type":"unstyled","inlineStyleRanges":[{"style":"BOLD","length":4,"offset":62}],"data":{},"text":"5. Fill out the form under Tell us about yourself. Then click Next."},{"key":"6mjuf","depth":0,"data":{},"entityRanges":[{"length":1,"key":3,"offset":0}],"type":"atomic","inlineStyleRanges":[],"text":" "},{"inlineStyleRanges":[],"type":"unstyled","key":"67j8a","data":{},"entityRanges":[],"depth":0,"text":"6. Enter your phone number and click Send verification code. Enter the code texted to you."},{"entityRanges":[{"length":1,"key":4,"offset":0}],"text":" ","inlineStyleRanges":[],"key":"b4bvf","data":{},"type":"atomic","depth":0},{"key":"6q2lc","data":{},"type":"unstyled","entityRanges":[],"inlineStyleRanges":[{"length":18,"offset":75,"style":"BOLD"},{"offset":130,"style":"BOLD","length":4}],"depth":0,"text":"7. Enter a name for your test tenant, for example, gitbittest1. Then click Check Availability. Find an available name. Then click Next."},{"type":"atomic","text":" ","key":"242v4","inlineStyleRanges":[],"entityRanges":[{"length":1,"key":5,"offset":0}],"depth":0,"data":{}},{"depth":0,"entityRanges":[],"inlineStyleRanges":[{"length":7,"offset":105,"style":"BOLD"}],"key":"e07ns","type":"unstyled","text":"8. Then enter a username, and password for your new tenant. Remember them or write them down. Then click Sign up.","data":{}},{"inlineStyleRanges":[],"entityRanges":[{"key":6,"length":1,"offset":0}],"key":"ano85","depth":0,"type":"atomic","data":{},"text":" "},{"key":"eml33","depth":0,"inlineStyleRanges":[],"type":"unstyled","data":{},"entityRanges":[],"text":"That's it. You now have a Microsoft 365 test tenant."}]},"publish":true,"description":"How to create a free Microsoft 365 tenant to test new security features and pass you MS-500","id":"KKkBOVuS4","pushlish":true,"featuredImage":"https://i.ibb.co/F07sjQJ/microsoft-365-e5-trial.png"},
      articles: [{"id":"cpchjBLkC","sectionId":"qwJW5VrBW","slug":"Whats-in-this-course-cpchjBLkC","title":"What's in this course?","featuredImage":"https://i.ibb.co/zFs9Vfb/microsoft365-security-administrator-associate-600x600.png"},{"id":"KKkBOVuS4","sectionId":"qwJW5VrBW","slug":"Creating-a-free-Microsoft-365-tenant-for-practice-KKkBOVuS4","title":"Creating a free Microsoft 365 tenant for practice","featuredImage":"https://i.ibb.co/F07sjQJ/microsoft-365-e5-trial.png"},{"id":"bzotoOjEe","sectionId":"qwJW5VrBW","slug":"Managing-the-Microsoft-365-tenant-Introduction-to-the-admin-centers-bzotoOjEe","title":"Managing the Microsoft 365 tenant - Introduction to the admin centers","featuredImage":"https://i.ibb.co/f1cr4zt/Microsoft-365-admin-centers.png"},{"id":"cg_vxOX9L","sectionId":"qwJW5VrBW","slug":"Managing-Microsoft-365-through-PowerShell-cg_vxOX9L","title":"Managing Microsoft 365 through PowerShell","featuredImage":"https://i.ibb.co/HV13YF6/install-microsoft-365-powershell-modules.png"},{"id":"uYCIPbnMC","sectionId":"AFV_acckJ","slug":"How-to-create-users-in-Microsoft-365-Cloud-Only-uYCIPbnMC","title":"How to create users in Microsoft 365 Cloud Only","featuredImage":"https://i.ibb.co/Wnt5Q43/View-Microsoft-365-Users.png"},{"id":"7CpqFkPZU","sectionId":"AFV_acckJ","slug":"Creating-and-managing-admins-through-roles-7CpqFkPZU","title":"Creating and managing admins through roles","featuredImage":"https://i.ibb.co/kySL4HQ/Roles-and-administrators.png"},{"id":"rZzausKJ1","sectionId":"AFV_acckJ","slug":"Time-limited-admin-roles-in-Microsoft-365-rZzausKJ1","title":"Time limited admin roles in Microsoft 365","featuredImage":"https://i.ibb.co/nDvjyPD/select-member-to-add-to-PIM-role.png"},{"id":"ky5W0Lz5P","sectionId":"AFV_acckJ","slug":"Whats-AD-Connect-ky5W0Lz5P","title":"What's AD Connect","featuredImage":"https://i.ibb.co/7nDqr9x/Whats-AD-Connect.png"},{"id":"i9pJIjTNH","sectionId":"AFV_acckJ","slug":"Protecting-Passwords-in-Microsoft-365-i9pJIjTNH","title":"Protecting Passwords in Microsoft 365","featuredImage":"https://i.ibb.co/DLD4G4q/access-smart-lockout-settings.png"},{"id":"S1hQgFOMV","sectionId":"AFV_acckJ","slug":"Creating-and-managing-users-through-groups-S1hQgFOMV","title":"Creating and managing users through groups","featuredImage":"https://i.ibb.co/nmmC28M/add-a-group-microsoft-365.png"},{"id":"2QfoI2HxY","sectionId":"AFV_acckJ","slug":"Securing-and-implementing-enterprise-applications-2QfoI2HxY","title":"Securing and implementing enterprise applications","featuredImage":"https://i.ibb.co/C2mp69m/disable-user-consent.png"},{"id":"V1en9Iugh","sectionId":"AFV_acckJ","slug":"Whats-a-conditional-access-policy-V1en9Iugh","title":"What's a conditional access policy?","featuredImage":"https://i.ibb.co/DQm1sY0/Create-conditional-access-policy.png"},{"id":"nAAIvNbtk","sectionId":"AFV_acckJ","slug":"The-many-ways-to-implement-multi-factor-authentication-MFA-in-Microsoft-365-nAAIvNbtk","title":"The many ways to implement multi-factor authentication (MFA) in Microsoft 365","featuredImage":"https://i.ibb.co/P1P0wNY/microsoft-365-manage-security-defaults.png"},{"id":"2S9jn0aLr","sectionId":"AFV_acckJ","slug":"Implement-Self-service-password-reset-in-Microsoft-365-2S9jn0aLr","title":"Implement Self-service password reset in Microsoft 365","featuredImage":"https://i.ibb.co/58y9JVg/write-back-passwords-to-on-premises-directory.png"},{"id":"FldNualGC","sectionId":"AFV_acckJ","slug":"Locking-down-your-Microsoft-365-tenant-from-Microsoft-engineers-FldNualGC","title":"Locking down your Microsoft 365 tenant from Microsoft engineers","featuredImage":"https://i.ibb.co/DCmpnT9/Enable-Customer-Lockbox.png"},{"id":"NFQ6rYFeQ","sectionId":"AFV_acckJ","slug":"Implementing-intelligent-security-using-risk-policies-in-Microsoft-365-NFQ6rYFeQ","title":"Implementing intelligent security using risk policies in Microsoft 365","featuredImage":"https://i.ibb.co/0cyQJ7j/Risk-Detections.png"},{"id":"rK48f6iM2","sectionId":"AFV_acckJ","slug":"Automating-Access-Review-in-Microsoft-365-rK48f6iM2","title":"Automating Access Review in Microsoft 365","featuredImage":"https://i.ibb.co/Xsxvz6Z/new-access-review.png"},{"id":"RHW1API2s","sectionId":"AFV_acckJ","slug":"Just-in-time-approval-and-notification-for-admin-roles-in-Microsoft-365-RHW1API2s","title":"Just in time, approval and notification for admin roles in Microsoft 365","featuredImage":"https://i.ibb.co/dcb6XFN/Activate-a-Role.png"},{"id":"z8EMM9Eu_","sectionId":"QScYfSu74","slug":"Whats-Microsoft-365-Defender-z8EMM9Eu_","title":"What's Microsoft 365 Defender?","featuredImage":"https://i.ibb.co/MDMyDQt/Microsoft-Defender.png"},{"id":"Kye_yNLxA","sectionId":"QScYfSu74","slug":"Whats-Microsoft-Defender-for-identity-Kye_yNLxA","title":"What's Microsoft Defender for identity?","featuredImage":"https://i.ibb.co/bQDBh0Y/Defender-for-Identity-Timeline.png"},{"id":"EnPyp7ukN","sectionId":"QScYfSu74","slug":"Whats-Microsoft-Defender-for-Office-365-EnPyp7ukN","title":"What's Microsoft Defender for Office 365?","featuredImage":"https://i.ibb.co/WcwKY2G/Microsoft-365-incidents-and-alerts.png"},{"id":"6HUOr7qbL","sectionId":"QScYfSu74","slug":"Protect-your-email-environment-from-malicious-actors-6HUOr7qbL","title":"Protect your email and Office environment from malicious actors","featuredImage":"https://i.ibb.co/Df0KQVp/Reports.png"},{"id":"GCOOUsSBT","sectionId":"QScYfSu74","slug":"Protecting-email-against-phishing-attacks-GCOOUsSBT","title":"Protecting email against phishing attacks","featuredImage":"https://i.ibb.co/GCjZHWg/edit-actions.png"},{"id":"GG4cMY8pK","sectionId":"QScYfSu74","slug":"Simulating-attacks-with-Microsoft-365-GG4cMY8pK","title":"Simulating attacks with Microsoft 365","featuredImage":"https://i.ibb.co/NyvnbMK/simulation-overview-view-users-circled.png"},{"id":"z0qPG6v4T","sectionId":"QScYfSu74","slug":"Protecting-Windows-10-and-other-devices-with-Microsoft-Defender-for-Endpoint-z0qPG6v4T","title":"Protecting Windows 10 and other devices with Microsoft Defender for Endpoint","featuredImage":"https://i.ibb.co/T47Xhyh/enable-endpoint-connections.png"},{"id":"LEyZMWBSt","sectionId":"QScYfSu74","slug":"Collect-detect-investigate-and-respond-to-security-threats-using-Microsoft-Sentinel-LEyZMWBSt","title":"Collect, detect, investigate, and respond to security threats using Microsoft Sentinel","featuredImage":"https://i.ibb.co/qN9XsKj/Add-Workbook.png"},{"id":"7MQ3wE4wP","sectionId":"QScYfSu74","slug":"Implement-and-manage-Microsoft-Defender-for-Cloud-Apps-7MQ3wE4wP","title":"Implement and manage Microsoft Defender for Cloud Apps","featuredImage":"https://i.ibb.co/7g7LvFg/office-365-cloud-apps-settings.png"},{"id":"sH_Ee1DW1","sectionId":"QScYfSu74","slug":"Auditing-sign-ins-and-other-actions-in-Microsoft-365-sH_Ee1DW1","title":"Auditing sign-ins and other actions in Microsoft 365","featuredImage":"https://i.ibb.co/BqMw3jZ/Start-recording-user-and-admin-activity.png"},{"id":"vLweLmxZf","sectionId":"YhftdGIRX","slug":"How-to-classify-data-using-labels-in-Microsoft-365-vLweLmxZf","title":"How to classify data using labels in Microsoft 365","featuredImage":"https://i.ibb.co/k9nhWS5/Choose-protection-settings-for-files-and-emails.png"},{"id":"NsF7No40f","sectionId":"YhftdGIRX","slug":"Creating-and-managing-data-retention-to-conform-to-compliance-NsF7No40f","title":"Creating and managing data retention to conform to compliance","featuredImage":"https://i.ibb.co/yqC0ZdY/New-Retention-Policy.png"},{"id":"IsPGsme8w","sectionId":"YhftdGIRX","slug":"Preventing-accidental-and-malicious-data-loss-with-DLP-policies-IsPGsme8w","title":"Preventing accidental and malicious data loss with DLP policies","featuredImage":"https://i.ibb.co/n8WcqKM/Create-a-DLP-policy.png"},{"id":"wv2PbXnhI","sectionId":"YhftdGIRX","slug":"Everything-you-need-to-know-about-securing-SharePoint-Online-for-the-MS-500-wv2PbXnhI","title":"Everything you need to know about securing SharePoint Online for the MS-500","featuredImage":"https://i.ibb.co/Gk9NjSH/Share-Point-Online-Warning.png"},{"id":"7gR3L122b","sectionId":"l0DxUuonW","slug":"Introduction-to-Intune-7gR3L122b","title":"Introduction to Intune","featuredImage":"https://i.ibb.co/Fq3N8BX/Endpoint-Manager-Admin-Center.png"},{"id":"ZyKX3Idjs","sectionId":"l0DxUuonW","slug":"Setting-up-Android-Devices-ZyKX3Idjs","title":"Setting up Android Devices","featuredImage":"https://i.ibb.co/m0BYhL2/Connect-Intune-to-Google-Play.png"},{"id":"MAjW0a2_p","sectionId":"l0DxUuonW","slug":"Setting-up-Apple--iOS-devices-in-Intune-MAjW0a2_p","title":"Setting up Apple / iOS devices in Intune","featuredImage":"https://i.ibb.co/X7Ffb2B/Setup-Apple-Enrollment-in-Intune.png"},{"id":"XFXu2zIS9","sectionId":"l0DxUuonW","slug":"Setting-up-Windows-10-devices-in-Intune-XFXu2zIS9","title":"Setting up Windows 10 devices in Intune","featuredImage":"https://i.ibb.co/WDXKVjW/configure-device-options.png"},{"id":"_LL9VqGZO","sectionId":"l0DxUuonW","slug":"How-to-manage-devices-using-Intune-_LL9VqGZO","title":"How to manage devices using Intune","featuredImage":"https://i.ibb.co/HPQ2m8t/Create-an-endpoint-protection-profile.png"},{"id":"qDRA4jjoN","sectionId":"l0DxUuonW","slug":"Understanding-compliance-policies-qDRA4jjoN","title":"Understanding compliance policies","featuredImage":"https://i.ibb.co/N3Qk57v/Create-a-compliance-policy.png"},{"id":"62t_7oiZx","sectionId":"l0DxUuonW","slug":"Restricting-and-managing-apps-on-user-devices-62t_7oiZx","title":"Restricting and managing apps on user devices","featuredImage":"https://i.ibb.co/PCVRKDf/Add-an-Android-app-to-Intune.png"}],
      articleHtml: `<p>Before we can start learning how to secure Microsoft 365 we will need a test tenant. A tenant where we can implement whatever you want and test things out before implementing them in production. A place where we can perform hands-on learning in a live environment without affecting production. Fortunately, we can set up a Microsoft 365 tenant for free to try out. You only need a free email address, such as gmail.com, outlook.com, or yahoo.com, and a phone number.</p>
<p>1. Go to <a href="https://click.linksynergy.com/fs-bin/click?id=iOIpmChCQh0&offerid=817940.17&type=3&subid=0" target="_blank">Office 365 E5</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
<p>2. Click <a href="https://click.linksynergy.com/fs-bin/click?id=iOIpmChCQh0&offerid=817940.17&type=3&subid=0" target="_blank">Free Trial</a></p>
<div style="text-align:none;"><img src="https://i.ibb.co/F07sjQJ/microsoft-365-e5-trial.png" alt="Microsoft 365 E5 Trial" style="height: auto;width: auto"/></div>
<p>3. Enter your email address. Click <strong>Next</strong>.</p>
<p>4. Click <strong>Set up account</strong>.</p>
<p>5. Fill out the form under Tell us about yourself. Then click <strong>Next</strong>.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/MMLchmz/tell-us-about-yourself.png" alt="Tell us about yourself form" style="height: auto;width: auto"/></div>
<p>6. Enter your phone number and click Send verification code. Enter the code texted to you.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/0ngk6BK/send-verification-code.png" alt="Send verification code" style="height: auto;width: auto"/></div>
<p>7. Enter a name for your test tenant, for example, gitbittest1. Then click <strong>Check Availability</strong>. Find an available name. Then click <strong>Next</strong>.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/xSYVRY1/how-youll-sign-in.png" alt="How you'll sign in" style="height: auto;width: auto"/></div>
<p>8. Then enter a username, and password for your new tenant. Remember them or write them down. Then click <strong>Sign up</strong>.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/QJXH0Dk/how-youll-sign-in-2.png" alt="How you'll sign in - enter credentials" style="height: auto;width: auto"/></div>
<p>That's it. You now have a Microsoft 365 test tenant.</p>
`,
      nextContentSlug: 'Managing-the-Microsoft-365-tenant-Introduction-to-the-admin-centers-bzotoOjEe',
      previousContentSlug: 'Whats-in-this-course-cpchjBLkC',
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
