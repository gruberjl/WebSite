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
      article: {"publish":true,"sectionId":"QScYfSu74","title":"Protecting email against phishing attacks","slug":"Protecting-email-against-phishing-attacks-GCOOUsSBT","id":"GCOOUsSBT","type":"article","article":{"entityMap":{"0":{"type":"LINK","data":{"url":"https://csrc.nist.gov/glossary/term/phishing","targetOption":"_blank"},"mutability":"MUTABLE"},"1":{"mutability":"MUTABLE","type":"LINK","data":{"targetOption":"_blank","url":"https://security.microsoft.com/antiphishing"}},"2":{"type":"IMAGE","data":{"alt":"Anti-phishing email settings","height":"auto","width":"auto","alignment":"none","src":"https://i.ibb.co/56sH69m/Anti-Phishing-settings.png"},"mutability":"MUTABLE"},"3":{"type":"IMAGE","data":{"alignment":"none","height":"auto","width":"auto","src":"https://i.ibb.co/Y2Krcjb/phishing-email-threshold.png","alt":"Phishing email threshold"},"mutability":"MUTABLE"},"4":{"type":"IMAGE","mutability":"MUTABLE","data":{"src":"https://i.ibb.co/1sSkMdP/impersonated-senders.png","alignment":"none","height":"auto","alt":"Blocking users from being impersonated","width":"auto"}},"5":{"mutability":"MUTABLE","data":{"alt":"Add trusted senders","src":"https://i.ibb.co/Pz8CrW9/add-trusted-senders.png","alignment":"none","height":"auto","width":"auto"},"type":"IMAGE"},"6":{"type":"IMAGE","mutability":"MUTABLE","data":{"alignment":"none","alt":"Mailbox intelligence setting","height":"auto","src":"https://i.ibb.co/wpdbkQT/mailbox-intelligence.png","width":"auto"}},"7":{"type":"IMAGE","mutability":"MUTABLE","data":{"alignment":"none","height":"auto","width":"auto","alt":"Intelligence for impersonation protection","src":"https://i.ibb.co/yBfSvs8/intelligence-for-impersonation-protection.png"}},"8":{"data":{"src":"https://i.ibb.co/b6NhKGS/spoof-intelligence.png","alignment":"none","alt":"Spoof Intelligence","width":"auto","height":"auto"},"type":"IMAGE","mutability":"MUTABLE"},"9":{"type":"IMAGE","data":{"height":"auto","width":"auto","src":"https://i.ibb.co/xgR2tcd/tenant-allow-block-spoofing-link.png","alignment":"none","alt":"Tenant allow/block list spoofing page"},"mutability":"MUTABLE"},"10":{"mutability":"MUTABLE","type":"IMAGE","data":{"width":"auto","alt":"Allow spoofing","src":"https://i.ibb.co/st5Z8tq/allow-spoofing.png","height":"auto","alignment":"none"}},"11":{"mutability":"MUTABLE","data":{"targetOption":"_blank","url":"https://security.microsoft.com/antiphishing","title":"<span data-offset-key=\"5gn2d-1-0\" style=\"box-sizing: border-box;\"><span data-text=\"true\" style=\"box-sizing: border-box;\">Anti-phishing</span></span>","_map":{"type":"LINK","mutability":"MUTABLE","data":{"targetOption":"_blank","url":"https://security.microsoft.com/antiphishing","title":"<span data-offset-key=\"5gn2d-1-0\" style=\"box-sizing: border-box;\"><span data-text=\"true\" style=\"box-sizing: border-box;\">Anti-phishing</span></span>"}}},"type":"LINK"},"12":{"data":{"height":"auto","width":"auto","alignment":"none","alt":"Edit antiphishing actions","src":"https://i.ibb.co/jWYyVNS/edit-antiphishing-actions.png"},"type":"IMAGE","mutability":"MUTABLE"},"13":{"mutability":"MUTABLE","data":{"alignment":"none","alt":"Edit antiphishing actions","width":"auto","height":"auto","src":"https://i.ibb.co/GCjZHWg/edit-actions.png"},"type":"IMAGE"},"14":{"data":{"src":"https://i.ibb.co/r27V974/first-contant-warning.png","height":"auto","width":"auto","alt":"First contact antiphishing email warning","alignment":"none"},"mutability":"MUTABLE","type":"IMAGE"},"15":{"mutability":"MUTABLE","data":{"width":"auto","alignment":"none","height":"auto","alt":"appears similar to someone who previously send you email","src":"https://i.ibb.co/567WyrD/appears-similiar-warning-message.png"},"type":"IMAGE"},"16":{"type":"IMAGE","data":{"alignment":"none","src":"https://i.ibb.co/PCHLNdd/question-mark-image.png","height":"auto","alt":"Show (?) for unauthenticated senders for spoof","width":"auto"},"mutability":"MUTABLE"},"17":{"mutability":"MUTABLE","data":{"height":"auto","alt":"Spoofing Via","alignment":"none","src":"https://i.ibb.co/0JyDW5R/spoofing-via.png","width":"auto"},"type":"IMAGE"}},"blocks":[{"inlineStyleRanges":[],"depth":0,"text":"Phishing is \"A technique for attempting to acquire sensitive data, such as bank account numbers, through a fraudulent solicitation in email or on a website, in which the perpetrator masquerades as a legitimate business or reputable person.\" - Computer Security Resource Center","data":{},"key":"c6vkr","type":"unstyled","entityRanges":[{"key":0,"offset":243,"length":33}]},{"entityRanges":[],"inlineStyleRanges":[],"type":"unstyled","depth":0,"text":"Blocking phishing attacks is a multi-part defense. Let's dig right into the settings and options to set up a defense.","data":{},"key":"8704g"},{"key":"3jjn0","entityRanges":[],"type":"header-two","data":{},"inlineStyleRanges":[],"text":"Finding the Anti-phishing settings","depth":0},{"text":"1. Open Microsoft 365 Defender > Policies & rules > Threat policies > Anti-phishing.","type":"unstyled","data":{},"entityRanges":[{"length":13,"key":1,"offset":70}],"key":"5gn2d","inlineStyleRanges":[],"depth":0},{"entityRanges":[],"key":"1rrkm","text":"2. Click the Office365 AntiPhish Default (Default) policy.","depth":0,"type":"unstyled","data":{},"inlineStyleRanges":[]},{"inlineStyleRanges":[],"data":{},"depth":0,"key":"clnt","entityRanges":[{"length":1,"offset":0,"key":2}],"type":"atomic","text":" "},{"entityRanges":[],"key":"3387o","inlineStyleRanges":[{"length":24,"offset":9,"style":"BOLD"}],"type":"unstyled","text":"3. Click Edit protection settings.","data":{},"depth":0},{"depth":0,"type":"unstyled","data":{},"text":"From here you'll see the anti-phishing settings for your environment.","entityRanges":[],"key":"5p8e5","inlineStyleRanges":[]},{"entityRanges":[],"inlineStyleRanges":[],"depth":0,"key":"5go8n","type":"header-three","text":"Phishing email threshold","data":{}},{"type":"atomic","key":"6s9h3","inlineStyleRanges":[],"data":{},"entityRanges":[{"key":3,"length":1,"offset":0}],"depth":0,"text":" "},{"depth":0,"key":"25isl","text":"The phishing email threshold controls the sensitivity for applying machine learning to messages to determine what is considered phishing. The standard level is the least restrictive which will block the least amount of phishing emails. Most aggressive will block the most phishing emails but may catch some good emails too.","entityRanges":[],"inlineStyleRanges":[],"data":{},"type":"unstyled"},{"inlineStyleRanges":[],"entityRanges":[],"depth":0,"data":{},"key":"3qpii","type":"header-three","text":"Enable users to protect"},{"inlineStyleRanges":[],"text":" ","key":"phn8","depth":0,"data":{},"entityRanges":[{"key":4,"length":1,"offset":0}],"type":"atomic"},{"key":"fs7ei","entityRanges":[],"text":"This iswebsitewebsite where you can enable anti-impersonation. In short, if your CEO's name is Ben Franklin and email is ben.franklin@gitbit.org you can add both of those to the \"Enable users to protect\" field, and then any emails from Ben.Franklin@gmail.com would be blocked from coming into your organization.","depth":0,"data":{},"type":"unstyled","inlineStyleRanges":[]},{"inlineStyleRanges":[],"text":"Add trusted senders and domains","entityRanges":[],"depth":0,"key":"ct542","data":{},"type":"header-three"},{"data":{},"key":"dggmt","type":"atomic","text":" ","inlineStyleRanges":[],"entityRanges":[{"key":5,"length":1,"offset":0}],"depth":0},{"key":"75p7v","data":{},"inlineStyleRanges":[{"offset":0,"style":"color-rgb(33,37,41)","length":357},{"offset":0,"length":357,"style":"bgcolor-rgb(255,255,255)"},{"style":"fontsize-16","offset":0,"length":357},{"offset":0,"length":357,"style":"fontfamily-system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", \"Liberation Sans\", sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji"}],"text":"So now you've set up a few users to stop impersonation attacks but now the CEO (Ben Franklin) is attempting to send emails to himself using his Gmail account (Ben.F*******@gmail.com) but he's getting blocked because Microsoft believes it's an impersonation attempt. Not to worry. We can whitelist the email using the Add trusted senders and domains section.","type":"unstyled","depth":0,"entityRanges":[]},{"key":"en33f","type":"header-three","inlineStyleRanges":[],"data":{},"text":"Mailbox Intelligence","depth":0,"entityRanges":[]},{"key":"84qsq","entityRanges":[{"key":6,"length":1,"offset":0}],"type":"atomic","depth":0,"inlineStyleRanges":[],"data":{},"text":" "},{"text":"Mailbox intelligence will also help catch acceptable impersonated users. In short, it will scan the user's mailbox to see if the user has sent or received from the user before. If they have then it won't flag the email as impersonation.","depth":0,"entityRanges":[],"inlineStyleRanges":[],"type":"unstyled","key":"3tca9","data":{}},{"inlineStyleRanges":[{"style":"ITALIC","length":251,"offset":0}],"entityRanges":[],"text":"Note: The mailbox has to be located in Microsoft 365 for Mailbox Intelligence to work. So if you have on-premises mailboxes and you want to enable mailbox intelligence for those mailboxes they'll need to be migrated to Microsoft 365's Exchange Online.","key":"90gp","data":{},"type":"unstyled","depth":0},{"inlineStyleRanges":[{"offset":0,"style":"ITALIC","length":41}],"entityRanges":[],"data":{},"text":"Intelligence for impersonation protection","type":"header-four","depth":0,"key":"a5boc"},{"text":" ","type":"atomic","data":{},"depth":0,"entityRanges":[{"length":1,"offset":0,"key":7}],"key":"bffon","inlineStyleRanges":[]},{"entityRanges":[],"key":"1burs","inlineStyleRanges":[],"data":{},"depth":0,"type":"unstyled","text":"By enabling this setting you're allowing mailbox intelligence to take action on emails it deems are impersonated emails. It's recommended to enable this setting. I'll show you where to set the actions in the section below labeled \"Setting actions to take on phishing emails\""},{"text":"Spoof Intelligence","inlineStyleRanges":[],"key":"a2a8o","depth":0,"type":"header-three","entityRanges":[],"data":{}},{"type":"atomic","entityRanges":[{"offset":0,"length":1,"key":8}],"depth":0,"data":{},"inlineStyleRanges":[],"key":"ct90u","text":" "},{"data":{},"key":"6uqq3","inlineStyleRanges":[],"entityRanges":[],"depth":0,"type":"unstyled","text":"Spoofing is the creation of an email with an incorrect sender / from address. For example, if you're mailbox is set up in Microsoft 365 and you send an email from Microsoft 365 as yourself that isn't spoofing. But if someone sends an email pretending to be you but isn't from your authorized sending environment then those emails would be considered spoofed. Enable the spoof intelligence to block emails that aren't sent from the authorized email environment."},{"data":{},"key":"21vib","text":"Allowed spoofing","type":"header-four","depth":0,"entityRanges":[],"inlineStyleRanges":[]},{"entityRanges":[],"depth":0,"type":"unstyled","text":"Sometimes, spoofing is acceptable. For example, you may receive a newsletter that comes from another email environment but isn't authorized as the sender's email server. They are actually from the sender but they aren't from their approved email environment. To allow someone to spoof perform the following:","key":"c6f06","data":{},"inlineStyleRanges":[]},{"text":"1. Click Tenant Allow/Block List Spoofing page.","data":{},"type":"unstyled","entityRanges":[],"depth":0,"inlineStyleRanges":[],"key":"6bs74"},{"data":{},"inlineStyleRanges":[],"key":"9qcm1","entityRanges":[{"offset":0,"key":9,"length":1}],"type":"atomic","depth":0,"text":" "},{"entityRanges":[],"text":"2. Click Add. Add the spoofed user and sending infrastructure to the list. Set the spoof type and click Allow / Block. Click Add.","key":"5sirm","type":"unstyled","depth":0,"data":{},"inlineStyleRanges":[{"style":"BOLD","length":3,"offset":9},{"style":"BOLD","offset":22,"length":12},{"offset":39,"length":22,"style":"BOLD"},{"style":"BOLD","offset":83,"length":10},{"length":13,"style":"BOLD","offset":104},{"length":3,"style":"BOLD","offset":125}]},{"depth":0,"type":"atomic","key":"aknrf","text":" ","data":{},"entityRanges":[{"length":1,"offset":0,"key":10}],"inlineStyleRanges":[]},{"depth":0,"data":{},"text":"Settings the antiphishing actions","key":"67jo0","inlineStyleRanges":[],"entityRanges":[],"type":"header-two"},{"data":{},"entityRanges":[],"text":"To set what happens when a phishing attempt is found perform the following:","inlineStyleRanges":[],"type":"unstyled","key":"fn0qk","depth":0},{"type":"unstyled","text":"1. Open Microsoft 365 Defender > Policies & rules > Threat policies > Anti-phishing.","inlineStyleRanges":[{"offset":0,"length":84,"style":"color-rgb(33,37,41)"},{"offset":0,"style":"bgcolor-rgb(255,255,255)","length":84},{"style":"fontsize-16","offset":0,"length":84},{"offset":0,"style":"fontfamily-system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", \"Liberation Sans\", sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji","length":84},{"offset":70,"style":"color-rgb(13,110,253)","length":13},{"length":13,"style":"UNDERLINE","offset":70}],"key":"dcvhs","depth":0,"data":{"text-align":"left"},"entityRanges":[{"key":11,"length":13,"offset":70}]},{"entityRanges":[],"data":{"text-align":"left"},"inlineStyleRanges":[{"offset":0,"style":"color-rgb(33,37,41)","length":58},{"style":"bgcolor-rgb(255,255,255)","length":58,"offset":0},{"offset":0,"length":58,"style":"fontsize-16"},{"length":58,"style":"fontfamily-system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", \"Liberation Sans\", sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji","offset":0}],"type":"unstyled","depth":0,"text":"2. Click the Office365 AntiPhish Default (Default) policy.","key":"3lb7h"},{"entityRanges":[],"key":"767pc","depth":0,"type":"unstyled","data":{},"inlineStyleRanges":[{"length":38,"offset":0,"style":"color-rgb(33,37,41)"},{"offset":0,"length":38,"style":"bgcolor-rgb(255,255,255)"},{"style":"fontsize-16","length":38,"offset":0},{"style":"fontfamily-system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", \"Liberation Sans\", sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji","length":38,"offset":0},{"length":12,"offset":25,"style":"BOLD"}],"text":"3. Scroll down and click Edit actions."},{"type":"atomic","key":"1pl5i","data":{},"text":" ","entityRanges":[{"key":12,"offset":0,"length":1}],"inlineStyleRanges":[],"depth":0},{"type":"unstyled","inlineStyleRanges":[],"text":"","depth":0,"key":"d15c5","data":{},"entityRanges":[]},{"inlineStyleRanges":[],"type":"atomic","data":{},"text":" ","depth":0,"entityRanges":[{"key":13,"length":1,"offset":0}],"key":"1n65j"},{"text":"If message is detected as an impersonated user: This is where you can set what happens when a message is sent from an impersonated user.","type":"unstyled","entityRanges":[],"key":"fa824","inlineStyleRanges":[{"length":46,"offset":0,"style":"BOLD"}],"data":{},"depth":0},{"text":"If message is detected as an impersonated domain: This is where you can set what happens when a message is sent from an impersonated domain.","inlineStyleRanges":[{"style":"BOLD","length":48,"offset":0}],"key":"8gup4","depth":0,"type":"unstyled","data":{},"entityRanges":[]},{"type":"unstyled","inlineStyleRanges":[{"style":"BOLD","offset":0,"length":52}],"data":{},"entityRanges":[],"text":"If Mailbox Intelligence detects an impersonated user: This is where you can set what happens when mailbox intelligence detects a phishing attempt. ","key":"a4fki","depth":0},{"inlineStyleRanges":[{"length":31,"offset":0,"style":"BOLD"}],"depth":0,"type":"unstyled","entityRanges":[],"data":{},"key":"58thq","text":"If message is detected as spoof: This setting allows you to handle messages that are seen as spoofs."},{"inlineStyleRanges":[],"text":"The Safety tips & indicators section shows a message in Outlook stating there may be something not safe about the emails.","entityRanges":[],"depth":0,"type":"unstyled","key":"2tlio","data":{}},{"type":"unstyled","text":"Show first contact safety tip (Recommended) setting will show a message when you receive an email the first time from a user.","entityRanges":[],"depth":0,"data":{},"inlineStyleRanges":[{"style":"BOLD","length":43,"offset":0}],"key":"1rm4l"},{"depth":0,"key":"faktu","entityRanges":[{"length":1,"offset":0,"key":14}],"data":{},"type":"atomic","inlineStyleRanges":[],"text":" "},{"data":{},"text":"Show user impersonation safety tip checkbox will show you a message when the name of the person you received an email from is similar to someone else you've received an email from. The message will read \"This sender appears to be similar to someone who previously sent you email, but may not be that person.\"","key":"dt4fu","depth":0,"entityRanges":[],"type":"unstyled","inlineStyleRanges":[{"style":"BOLD","length":34,"offset":0}]},{"key":"21e2g","depth":0,"text":" ","inlineStyleRanges":[],"type":"atomic","entityRanges":[{"offset":0,"length":1,"key":15}],"data":{}},{"key":"7mmd5","inlineStyleRanges":[{"style":"BOLD","length":36,"offset":4}],"text":"The Show domain impersonation safety tip will show a message when you receive an email from an external domain that is similar to one of your own domains. The message will read \"This sender might be impersonating a domain that's associated with your organization\"","entityRanges":[],"data":{},"type":"unstyled","depth":0},{"key":"c61bq","data":{},"depth":0,"inlineStyleRanges":[{"style":"BOLD","offset":4,"length":53}],"text":"The Show user impersonation unusual characters safety tip message will appear when there are unusual characters in the sender's email address. The message will read \nThe email address John.Gruber@Gitb1t.org includes unexpected letters or numbers. We recommend you don't interact with this message.\"","entityRanges":[],"type":"unstyled"},{"text":"The Show (?) for unauthenticated senders for spoof checkbox will add a question mark (?) to the sender's picture if the sender doesn't pass SPF or DKIM and the message fails to pass DMARC checks.","inlineStyleRanges":[{"offset":4,"style":"BOLD","length":46}],"type":"unstyled","key":"bcd9t","entityRanges":[],"depth":0,"data":{}},{"type":"atomic","entityRanges":[{"key":16,"offset":0,"length":1}],"key":"2kog2","depth":0,"inlineStyleRanges":[],"data":{},"text":" "},{"type":"unstyled","depth":0,"key":"7va6u","entityRanges":[],"inlineStyleRanges":[{"style":"BOLD","offset":4,"length":14}],"text":"The Show \"via\" tag will display a via in the from part of the message. For example, it will show Kendra.Gruber@gruber12.onmicrosoft.com via sendpulse.me","data":{}},{"entityRanges":[{"offset":0,"length":1,"key":17}],"type":"atomic","depth":0,"inlineStyleRanges":[],"data":{},"key":"cf2kq","text":" "},{"depth":0,"text":"\n","data":{},"entityRanges":[],"type":"unstyled","inlineStyleRanges":[],"key":"aqegr"}]},"datePublished":"2022/5/26","images":["https://i.ibb.co/56sH69m/Anti-Phishing-settings.png","https://i.ibb.co/Y2Krcjb/phishing-email-threshold.png","https://i.ibb.co/1sSkMdP/impersonated-senders.png","https://i.ibb.co/Pz8CrW9/add-trusted-senders.png","https://i.ibb.co/wpdbkQT/mailbox-intelligence.png","https://i.ibb.co/yBfSvs8/intelligence-for-impersonation-protection.png","https://i.ibb.co/b6NhKGS/spoof-intelligence.png","https://i.ibb.co/xgR2tcd/tenant-allow-block-spoofing-link.png","https://i.ibb.co/st5Z8tq/allow-spoofing.png","https://i.ibb.co/jWYyVNS/edit-antiphishing-actions.png","https://i.ibb.co/0JyDW5R/spoofing-via.png","https://i.ibb.co/PCHLNdd/question-mark-image.png","https://i.ibb.co/567WyrD/appears-similiar-warning-message.png","https://i.ibb.co/r27V974/first-contant-warning.png","https://i.ibb.co/GCjZHWg/edit-actions.png","https://i.ibb.co/GCjZHWg/edit-actions.png"],"featuredImage":"https://i.ibb.co/GCjZHWg/edit-actions.png","description":"Blocking phishing attacks is a multi-part defense. Let's dig right into the settings and options to set up a defense."},
      articles: [{"id":"cpchjBLkC","sectionId":"qwJW5VrBW","slug":"Whats-in-this-course-cpchjBLkC","title":"What's in this course?","featuredImage":"https://i.ibb.co/zFs9Vfb/microsoft365-security-administrator-associate-600x600.png"},{"id":"KKkBOVuS4","sectionId":"qwJW5VrBW","slug":"Creating-a-free-Microsoft-365-tenant-for-practice-KKkBOVuS4","title":"Creating a free Microsoft 365 tenant for practice","featuredImage":"https://i.ibb.co/F07sjQJ/microsoft-365-e5-trial.png"},{"id":"bzotoOjEe","sectionId":"qwJW5VrBW","slug":"Managing-the-Microsoft-365-tenant-Introduction-to-the-admin-centers-bzotoOjEe","title":"Managing the Microsoft 365 tenant - Introduction to the admin centers","featuredImage":"https://i.ibb.co/f1cr4zt/Microsoft-365-admin-centers.png"},{"id":"cg_vxOX9L","sectionId":"qwJW5VrBW","slug":"Managing-Microsoft-365-through-PowerShell-cg_vxOX9L","title":"Managing Microsoft 365 through PowerShell","featuredImage":"https://i.ibb.co/HV13YF6/install-microsoft-365-powershell-modules.png"},{"id":"uYCIPbnMC","sectionId":"AFV_acckJ","slug":"How-to-create-users-in-Microsoft-365-Cloud-Only-uYCIPbnMC","title":"How to create users in Microsoft 365 Cloud Only","featuredImage":"https://i.ibb.co/Wnt5Q43/View-Microsoft-365-Users.png"},{"id":"7CpqFkPZU","sectionId":"AFV_acckJ","slug":"Creating-and-managing-admins-through-roles-7CpqFkPZU","title":"Creating and managing admins through roles","featuredImage":"https://i.ibb.co/kySL4HQ/Roles-and-administrators.png"},{"id":"rZzausKJ1","sectionId":"AFV_acckJ","slug":"Time-limited-admin-roles-in-Microsoft-365-rZzausKJ1","title":"Time limited admin roles in Microsoft 365","featuredImage":"https://i.ibb.co/nDvjyPD/select-member-to-add-to-PIM-role.png"},{"id":"ky5W0Lz5P","sectionId":"AFV_acckJ","slug":"Whats-AD-Connect-ky5W0Lz5P","title":"What's AD Connect","featuredImage":"https://i.ibb.co/7nDqr9x/Whats-AD-Connect.png"},{"id":"i9pJIjTNH","sectionId":"AFV_acckJ","slug":"Protecting-Passwords-in-Microsoft-365-i9pJIjTNH","title":"Protecting Passwords in Microsoft 365","featuredImage":"https://i.ibb.co/DLD4G4q/access-smart-lockout-settings.png"},{"id":"S1hQgFOMV","sectionId":"AFV_acckJ","slug":"Creating-and-managing-users-through-groups-S1hQgFOMV","title":"Creating and managing users through groups","featuredImage":"https://i.ibb.co/nmmC28M/add-a-group-microsoft-365.png"},{"id":"2QfoI2HxY","sectionId":"AFV_acckJ","slug":"Securing-and-implementing-enterprise-applications-2QfoI2HxY","title":"Securing and implementing enterprise applications","featuredImage":"https://i.ibb.co/C2mp69m/disable-user-consent.png"},{"id":"V1en9Iugh","sectionId":"AFV_acckJ","slug":"Whats-a-conditional-access-policy-V1en9Iugh","title":"What's a conditional access policy?","featuredImage":"https://i.ibb.co/DQm1sY0/Create-conditional-access-policy.png"},{"id":"nAAIvNbtk","sectionId":"AFV_acckJ","slug":"The-many-ways-to-implement-multi-factor-authentication-MFA-in-Microsoft-365-nAAIvNbtk","title":"The many ways to implement multi-factor authentication (MFA) in Microsoft 365","featuredImage":"https://i.ibb.co/P1P0wNY/microsoft-365-manage-security-defaults.png"},{"id":"2S9jn0aLr","sectionId":"AFV_acckJ","slug":"Implement-Self-service-password-reset-in-Microsoft-365-2S9jn0aLr","title":"Implement Self-service password reset in Microsoft 365","featuredImage":"https://i.ibb.co/58y9JVg/write-back-passwords-to-on-premises-directory.png"},{"id":"FldNualGC","sectionId":"AFV_acckJ","slug":"Locking-down-your-Microsoft-365-tenant-from-Microsoft-engineers-FldNualGC","title":"Locking down your Microsoft 365 tenant from Microsoft engineers","featuredImage":"https://i.ibb.co/DCmpnT9/Enable-Customer-Lockbox.png"},{"id":"NFQ6rYFeQ","sectionId":"AFV_acckJ","slug":"Implementing-intelligent-security-using-risk-policies-in-Microsoft-365-NFQ6rYFeQ","title":"Implementing intelligent security using risk policies in Microsoft 365","featuredImage":"https://i.ibb.co/0cyQJ7j/Risk-Detections.png"},{"id":"rK48f6iM2","sectionId":"AFV_acckJ","slug":"Automating-Access-Review-in-Microsoft-365-rK48f6iM2","title":"Automating Access Review in Microsoft 365","featuredImage":"https://i.ibb.co/Xsxvz6Z/new-access-review.png"},{"id":"RHW1API2s","sectionId":"AFV_acckJ","slug":"Just-in-time-approval-and-notification-for-admin-roles-in-Microsoft-365-RHW1API2s","title":"Just in time, approval and notification for admin roles in Microsoft 365","featuredImage":"https://i.ibb.co/dcb6XFN/Activate-a-Role.png"},{"id":"z8EMM9Eu_","sectionId":"QScYfSu74","slug":"Whats-Microsoft-365-Defender-z8EMM9Eu_","title":"What's Microsoft 365 Defender?","featuredImage":"https://i.ibb.co/MDMyDQt/Microsoft-Defender.png"},{"id":"Kye_yNLxA","sectionId":"QScYfSu74","slug":"Whats-Microsoft-Defender-for-identity-Kye_yNLxA","title":"What's Microsoft Defender for identity?","featuredImage":"https://i.ibb.co/bQDBh0Y/Defender-for-Identity-Timeline.png"},{"id":"EnPyp7ukN","sectionId":"QScYfSu74","slug":"Whats-Microsoft-Defender-for-Office-365-EnPyp7ukN","title":"What's Microsoft Defender for Office 365?","featuredImage":"https://i.ibb.co/WcwKY2G/Microsoft-365-incidents-and-alerts.png"},{"id":"6HUOr7qbL","sectionId":"QScYfSu74","slug":"Protect-your-email-environment-from-malicious-actors-6HUOr7qbL","title":"Protect your email and Office environment from malicious actors","featuredImage":"https://i.ibb.co/Df0KQVp/Reports.png"},{"id":"GCOOUsSBT","sectionId":"QScYfSu74","slug":"Protecting-email-against-phishing-attacks-GCOOUsSBT","title":"Protecting email against phishing attacks","featuredImage":"https://i.ibb.co/GCjZHWg/edit-actions.png"},{"id":"GG4cMY8pK","sectionId":"QScYfSu74","slug":"Simulating-attacks-with-Microsoft-365-GG4cMY8pK","title":"Simulating attacks with Microsoft 365","featuredImage":"https://i.ibb.co/NyvnbMK/simulation-overview-view-users-circled.png"},{"id":"z0qPG6v4T","sectionId":"QScYfSu74","slug":"Protecting-Windows-10-and-other-devices-with-Microsoft-Defender-for-Endpoint-z0qPG6v4T","title":"Protecting Windows 10 and other devices with Microsoft Defender for Endpoint","featuredImage":"https://i.ibb.co/T47Xhyh/enable-endpoint-connections.png"},{"id":"LEyZMWBSt","sectionId":"QScYfSu74","slug":"Collect-detect-investigate-and-respond-to-security-threats-using-Microsoft-Sentinel-LEyZMWBSt","title":"Collect, detect, investigate, and respond to security threats using Microsoft Sentinel","featuredImage":"https://i.ibb.co/qN9XsKj/Add-Workbook.png"},{"id":"7MQ3wE4wP","sectionId":"QScYfSu74","slug":"Implement-and-manage-Microsoft-Defender-for-Cloud-Apps-7MQ3wE4wP","title":"Implement and manage Microsoft Defender for Cloud Apps","featuredImage":"https://i.ibb.co/7g7LvFg/office-365-cloud-apps-settings.png"},{"id":"sH_Ee1DW1","sectionId":"QScYfSu74","slug":"Auditing-sign-ins-and-other-actions-in-Microsoft-365-sH_Ee1DW1","title":"Auditing sign-ins and other actions in Microsoft 365","featuredImage":"https://i.ibb.co/BqMw3jZ/Start-recording-user-and-admin-activity.png"},{"id":"vLweLmxZf","sectionId":"YhftdGIRX","slug":"How-to-classify-data-using-labels-in-Microsoft-365-vLweLmxZf","title":"How to classify data using labels in Microsoft 365","featuredImage":"https://i.ibb.co/k9nhWS5/Choose-protection-settings-for-files-and-emails.png"},{"id":"NsF7No40f","sectionId":"YhftdGIRX","slug":"Creating-and-managing-data-retention-to-conform-to-compliance-NsF7No40f","title":"Creating and managing data retention to conform to compliance","featuredImage":"https://i.ibb.co/yqC0ZdY/New-Retention-Policy.png"},{"id":"IsPGsme8w","sectionId":"YhftdGIRX","slug":"Preventing-accidental-and-malicious-data-loss-with-DLP-policies-IsPGsme8w","title":"Preventing accidental and malicious data loss with DLP policies","featuredImage":"https://i.ibb.co/n8WcqKM/Create-a-DLP-policy.png"},{"id":"wv2PbXnhI","sectionId":"YhftdGIRX","slug":"Everything-you-need-to-know-about-securing-SharePoint-Online-for-the-MS-500-wv2PbXnhI","title":"Everything you need to know about securing SharePoint Online for the MS-500","featuredImage":"https://i.ibb.co/Gk9NjSH/Share-Point-Online-Warning.png"},{"id":"7gR3L122b","sectionId":"l0DxUuonW","slug":"Introduction-to-Intune-7gR3L122b","title":"Introduction to Intune","featuredImage":"https://i.ibb.co/Fq3N8BX/Endpoint-Manager-Admin-Center.png"},{"id":"ZyKX3Idjs","sectionId":"l0DxUuonW","slug":"Setting-up-Android-Devices-ZyKX3Idjs","title":"Setting up Android Devices","featuredImage":"https://i.ibb.co/m0BYhL2/Connect-Intune-to-Google-Play.png"},{"id":"MAjW0a2_p","sectionId":"l0DxUuonW","slug":"Setting-up-Apple--iOS-devices-in-Intune-MAjW0a2_p","title":"Setting up Apple / iOS devices in Intune","featuredImage":"https://i.ibb.co/X7Ffb2B/Setup-Apple-Enrollment-in-Intune.png"},{"id":"XFXu2zIS9","sectionId":"l0DxUuonW","slug":"Setting-up-Windows-10-devices-in-Intune-XFXu2zIS9","title":"Setting up Windows 10 devices in Intune","featuredImage":"https://i.ibb.co/WDXKVjW/configure-device-options.png"},{"id":"_LL9VqGZO","sectionId":"l0DxUuonW","slug":"How-to-manage-devices-using-Intune-_LL9VqGZO","title":"How to manage devices using Intune","featuredImage":"https://i.ibb.co/HPQ2m8t/Create-an-endpoint-protection-profile.png"},{"id":"qDRA4jjoN","sectionId":"l0DxUuonW","slug":"Understanding-compliance-policies-qDRA4jjoN","title":"Understanding compliance policies","featuredImage":"https://i.ibb.co/N3Qk57v/Create-a-compliance-policy.png"},{"id":"62t_7oiZx","sectionId":"l0DxUuonW","slug":"Restricting-and-managing-apps-on-user-devices-62t_7oiZx","title":"Restricting and managing apps on user devices","featuredImage":"https://i.ibb.co/PCVRKDf/Add-an-Android-app-to-Intune.png"}],
      articleHtml: `<p>Phishing is "A technique for attempting to acquire sensitive data, such as bank account numbers, through a fraudulent solicitation in email or on a website, in which the perpetrator masquerades as a legitimate business or reputable person." - <a href="https://csrc.nist.gov/glossary/term/phishing" target="_blank">Computer Security Resource Center</a></p>
<p>Blocking phishing attacks is a multi-part defense. Let's dig right into the settings and options to set up a defense.</p>
<h2>Finding the Anti-phishing settings</h2>
<p>1. Open Microsoft 365 Defender &gt; Policies &amp; rules &gt; Threat policies &gt; <a href="https://security.microsoft.com/antiphishing" target="_blank">Anti-phishing</a>.</p>
<p>2. Click the Office365 AntiPhish Default (Default) policy.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/56sH69m/Anti-Phishing-settings.png" alt="Anti-phishing email settings" style="height: auto;width: auto"/></div>
<p>3. Click <strong>Edit protection settings</strong>.</p>
<p>From here you'll see the anti-phishing settings for your environment.</p>
<h3>Phishing email threshold</h3>
<div style="text-align:none;"><img src="https://i.ibb.co/Y2Krcjb/phishing-email-threshold.png" alt="Phishing email threshold" style="height: auto;width: auto"/></div>
<p>The phishing email threshold controls the sensitivity for applying machine learning to messages to determine what is considered phishing. The standard level is the least restrictive which will block the least amount of phishing emails. Most aggressive will block the most phishing emails but may catch some good emails too.</p>
<h3>Enable users to protect</h3>
<div style="text-align:none;"><img src="https://i.ibb.co/1sSkMdP/impersonated-senders.png" alt="Blocking users from being impersonated" style="height: auto;width: auto"/></div>
<p>This iswebsitewebsite where you can enable anti-impersonation. In short, if your CEO's name is Ben Franklin and email is ben.franklin@gitbit.org you can add both of those to the "Enable users to protect" field, and then any emails from Ben.Franklin@gmail.com would be blocked from coming into your organization.</p>
<h3>Add trusted senders and domains</h3>
<div style="text-align:none;"><img src="https://i.ibb.co/Pz8CrW9/add-trusted-senders.png" alt="Add trusted senders" style="height: auto;width: auto"/></div>
<p><span style="color: rgb(33,37,41);background-color: rgb(255,255,255);font-size: 16px;font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;">So now you've set up a few users to stop impersonation attacks but now the CEO (Ben Franklin) is attempting to send emails to himself using his Gmail account (Ben.F*******@gmail.com) but he's getting blocked because Microsoft believes it's an impersonation attempt. Not to worry. We can whitelist the email using the Add trusted senders and domains section.</span></p>
<h3>Mailbox Intelligence</h3>
<div style="text-align:none;"><img src="https://i.ibb.co/wpdbkQT/mailbox-intelligence.png" alt="Mailbox intelligence setting" style="height: auto;width: auto"/></div>
<p>Mailbox intelligence will also help catch acceptable impersonated users. In short, it will scan the user's mailbox to see if the user has sent or received from the user before. If they have then it won't flag the email as impersonation.</p>
<p><em>Note: The mailbox has to be located in Microsoft 365 for Mailbox Intelligence to work. So if you have on-premises mailboxes and you want to enable mailbox intelligence for those mailboxes they'll need to be migrated to Microsoft 365's Exchange Online.</em></p>
<h4><em>Intelligence for impersonation protection</em></h4>
<div style="text-align:none;"><img src="https://i.ibb.co/yBfSvs8/intelligence-for-impersonation-protection.png" alt="Intelligence for impersonation protection" style="height: auto;width: auto"/></div>
<p>By enabling this setting you're allowing mailbox intelligence to take action on emails it deems are impersonated emails. It's recommended to enable this setting. I'll show you where to set the actions in the section below labeled "Setting actions to take on phishing emails"</p>
<h3>Spoof Intelligence</h3>
<div style="text-align:none;"><img src="https://i.ibb.co/b6NhKGS/spoof-intelligence.png" alt="Spoof Intelligence" style="height: auto;width: auto"/></div>
<p>Spoofing is the creation of an email with an incorrect sender / from address. For example, if you're mailbox is set up in Microsoft 365 and you send an email from Microsoft 365 as yourself that isn't spoofing. But if someone sends an email pretending to be you but isn't from your authorized sending environment then those emails would be considered spoofed. Enable the spoof intelligence to block emails that aren't sent from the authorized email environment.</p>
<h4>Allowed spoofing</h4>
<p>Sometimes, spoofing is acceptable. For example, you may receive a newsletter that comes from another email environment but isn't authorized as the sender's email server. They are actually from the sender but they aren't from their approved email environment. To allow someone to spoof perform the following:</p>
<p>1. Click Tenant Allow/Block List Spoofing page.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/xgR2tcd/tenant-allow-block-spoofing-link.png" alt="Tenant allow/block list spoofing page" style="height: auto;width: auto"/></div>
<p>2. Click <strong>Add</strong>. Add the <strong>spoofed user</strong> and <strong>sending infrastructure</strong> to the list. Set the <strong>spoof type</strong> and click <strong>Allow / Block</strong>. Click <strong>Add</strong>.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/st5Z8tq/allow-spoofing.png" alt="Allow spoofing" style="height: auto;width: auto"/></div>
<h2>Settings the antiphishing actions</h2>
<p>To set what happens when a phishing attempt is found perform the following:</p>
<p style="text-align:left;"><span style="color: rgb(33,37,41);background-color: rgb(255,255,255);font-size: 16px;font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;">1. Open Microsoft 365 Defender &gt; Policies &amp; rules &gt; Threat policies &gt; </span><a href="https://security.microsoft.com/antiphishing" target="_blank"><span style="color: rgb(13,110,253);background-color: rgb(255,255,255);font-size: 16px;font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;"><ins>Anti-phishing</ins></span></a><span style="color: rgb(33,37,41);background-color: rgb(255,255,255);font-size: 16px;font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;">.</span></p>
<p style="text-align:left;"><span style="color: rgb(33,37,41);background-color: rgb(255,255,255);font-size: 16px;font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;">2. Click the Office365 AntiPhish Default (Default) policy.</span></p>
<p><span style="color: rgb(33,37,41);background-color: rgb(255,255,255);font-size: 16px;font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;">3. Scroll down and click <strong>Edit actions</strong>.</span></p>
<div style="text-align:none;"><img src="https://i.ibb.co/jWYyVNS/edit-antiphishing-actions.png" alt="Edit antiphishing actions" style="height: auto;width: auto"/></div>
<p></p>
<div style="text-align:none;"><img src="https://i.ibb.co/GCjZHWg/edit-actions.png" alt="Edit antiphishing actions" style="height: auto;width: auto"/></div>
<p><strong>If message is detected as an impersonated user</strong>: This is where you can set what happens when a message is sent from an impersonated user.</p>
<p><strong>If message is detected as an impersonated domain</strong>: This is where you can set what happens when a message is sent from an impersonated domain.</p>
<p><strong>If Mailbox Intelligence detects an impersonated user</strong>: This is where you can set what happens when mailbox intelligence detects a phishing attempt.&nbsp;</p>
<p><strong>If message is detected as spoof</strong>: This setting allows you to handle messages that are seen as spoofs.</p>
<p>The Safety tips &amp; indicators section shows a message in Outlook stating there may be something not safe about the emails.</p>
<p><strong>Show first contact safety tip (Recommended)</strong> setting will show a message when you receive an email the first time from a user.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/r27V974/first-contant-warning.png" alt="First contact antiphishing email warning" style="height: auto;width: auto"/></div>
<p><strong>Show user impersonation safety tip</strong> checkbox will show you a message when the name of the person you received an email from is similar to someone else you've received an email from. The message will read "This sender appears to be similar to someone who previously sent you email, but may not be that person."</p>
<div style="text-align:none;"><img src="https://i.ibb.co/567WyrD/appears-similiar-warning-message.png" alt="appears similar to someone who previously send you email" style="height: auto;width: auto"/></div>
<p>The <strong>Show domain impersonation safety tip</strong> will show a message when you receive an email from an external domain that is similar to one of your own domains. The message will read "This sender might be impersonating a domain that's associated with your organization"</p>
<p>The <strong>Show user impersonation unusual characters safety tip</strong> message will appear when there are unusual characters in the sender's email address. The message will read <br>The email address John.Gruber@Gitb1t.org includes unexpected letters or numbers. We recommend you don't interact with this message."</p>
<p>The <strong>Show (?) for unauthenticated senders for spoof</strong> checkbox will add a question mark (?) to the sender's picture if the sender doesn't pass SPF or DKIM and the message fails to pass DMARC checks.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/PCHLNdd/question-mark-image.png" alt="Show (?) for unauthenticated senders for spoof" style="height: auto;width: auto"/></div>
<p>The <strong>Show "via" tag</strong> will display a via in the from part of the message. For example, it will show Kendra.Gruber@gruber12.onmicrosoft.com via sendpulse.me</p>
<div style="text-align:none;"><img src="https://i.ibb.co/0JyDW5R/spoofing-via.png" alt="Spoofing Via" style="height: auto;width: auto"/></div>
<p><br></p>
`,
      nextContentSlug: 'Simulating-attacks-with-Microsoft-365-GG4cMY8pK',
      previousContentSlug: 'Protect-your-email-environment-from-malicious-actors-6HUOr7qbL',
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
