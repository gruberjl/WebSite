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
      course: {"contentOrder":["cpchjBLkC","KKkBOVuS4","bzotoOjEe","cg_vxOX9L","uYCIPbnMC","7CpqFkPZU","rZzausKJ1","ky5W0Lz5P","i9pJIjTNH","S1hQgFOMV","2QfoI2HxY","V1en9Iugh","nAAIvNbtk","2S9jn0aLr","FldNualGC","NFQ6rYFeQ","rK48f6iM2","RHW1API2s","z8EMM9Eu_","Kye_yNLxA","EnPyp7ukN","6HUOr7qbL","GCOOUsSBT","GG4cMY8pK","z0qPG6v4T","LEyZMWBSt","7MQ3wE4wP","sH_Ee1DW1","vLweLmxZf","NsF7No40f","IsPGsme8w","wv2PbXnhI","7gR3L122b","ZyKX3Idjs","MAjW0a2_p","XFXu2zIS9","_LL9VqGZO","qDRA4jjoN","62t_7oiZx"],"audience":"Anyone who wants to learn about securing Microsoft 365","description":"Learn, prepare and training for the Microsoft Microsoft Office 365 Exam MS-500: Microsoft 365 Security Administration MS-500 exam","title":"Training for MS-500: Microsoft Office 365 Security Admin","sections":[{"id":"qwJW5VrBW","title":"Introduction","order":0},{"order":1,"id":"AFV_acckJ","title":"Securing identity and access to Microsoft 365"},{"title":"Securing Microsoft 365, clouds, and on-premises environments","order":2,"id":"QScYfSu74"},{"title":"Protecting your environment from accidental and malicious data loss","id":"YhftdGIRX","order":3},{"title":"Protecting User devices using Intune","order":4,"id":"l0DxUuonW"}],"id":"MS-500"},
      article: {"sectionId":"QScYfSu74","type":"article","article":{"blocks":[{"key":"bjqbc","data":{},"depth":0,"inlineStyleRanges":[],"type":"unstyled","text":"Phishing attacks are one of the most common ways an organization is attacked. According to the FBI, there were 241,342 complaints, with adjusted losses of over $54 million in 2020 alone. So the question is, is your organization ready?","entityRanges":[]},{"key":"4bn4f","depth":0,"entityRanges":[],"type":"header-two","text":"What’s a phishing attack?","inlineStyleRanges":[],"data":{}},{"key":"7l5ug","entityRanges":[],"type":"unstyled","inlineStyleRanges":[],"depth":0,"data":{},"text":"Phishing attacks are a type of social engineering attack used to steal data, typically credit card or login credentials. In short, the malicious person would send an email pretending to be from someone else and ask the victim to either go to a website enter their credentials or send them a credit card or a money transfer. For the victim, either your organization or the user the attack can be devastating. You can lose financially, or the attacker may use the credentials to send malicious emails to your partners, as well as the world discrediting you and your business."},{"text":"Phishing attack techniques","inlineStyleRanges":[],"depth":0,"data":{},"key":"5q6hb","entityRanges":[],"type":"header-three"},{"type":"unstyled","depth":0,"data":{},"key":"fq7d5","inlineStyleRanges":[],"entityRanges":[],"text":"There are several techniques used in a phishing attack and the number continues to grow but for now, we’ll focus on 5 different phishing attack techniques."},{"entityRanges":[],"key":"307vu","inlineStyleRanges":[],"text":"Credential harvest","depth":0,"data":{},"type":"header-four"},{"text":"In credential harvesting attacks the malicious person is attempting to get your user’s credentials. The malicious user will typically send an email with a URL to a bogus site to trick your users into entering their credentials.","key":"d9u3g","data":{},"entityRanges":[],"depth":0,"type":"unstyled","inlineStyleRanges":[]},{"entityRanges":[],"depth":0,"text":"Malware attachment","type":"header-four","key":"dknie","data":{},"inlineStyleRanges":[]},{"text":"In malware attachment attacks a malicious person will send an email to your users with a malicious attachment. A lot of times the attachment will look like a simple Word or Excel document but the attachment will have malicious code baked into it.","depth":0,"key":"jd58","type":"unstyled","entityRanges":[],"data":{},"inlineStyleRanges":[]},{"key":"12vnj","inlineStyleRanges":[],"text":"Link in attachment","depth":0,"type":"header-four","entityRanges":[],"data":{}},{"text":"With Link in attachment attacks, the malicious user will be attacking your users using the credential harvest technique. The only difference being the malicious user will put the link inside an attachment.","key":"pdiu","inlineStyleRanges":[],"depth":0,"entityRanges":[],"type":"unstyled","data":{}},{"data":{},"text":"Link to malware","key":"57bvf","type":"header-four","entityRanges":[],"depth":0,"inlineStyleRanges":[]},{"depth":0,"data":{},"inlineStyleRanges":[],"text":"Link to malware attacks will send an email to your users with a link where the user needs to go to a website and download the malicious file. Like the malware attachment attack technique, the file will contain code that is run on your user's computer. Often the malicious person will host the malicious code on common sites like Dropbox, SharePoint, or Google Drive.","type":"unstyled","entityRanges":[],"key":"44usg"},{"data":{},"inlineStyleRanges":[],"text":"Drive-by URL","key":"eulsv","entityRanges":[],"type":"header-four","depth":0},{"depth":0,"text":"Drive-by URL also known as the watering hole technique is an attack sequence where the malicious user sends an email with a URL inside. The URL will point to a website with malicious code running it to get information from your users. Typically the website will be a good site that has been hacked or a clone of a good site so the user doesn’t even realize it’s happening.","data":{},"type":"unstyled","key":"3g8d7","entityRanges":[],"inlineStyleRanges":[]},{"text":"How to stop phishing attacks?","type":"header-two","inlineStyleRanges":[],"entityRanges":[],"key":"e99f6","depth":0,"data":{}},{"key":"fgcdv","depth":0,"type":"unstyled","entityRanges":[],"inlineStyleRanges":[],"data":{},"text":"One of the best ways to prevent phishing attacks is user training. Training your users to detect malicious emails can prevent your organization from losing financially or credibility. In short, we’ll set up a simulated phishing email and send it to your users. Then we’ll track who opened the links and you can work with those specific users to help them learn to avoid getting tricked again."},{"inlineStyleRanges":[],"depth":0,"key":"fm5le","data":{},"entityRanges":[],"type":"header-two","text":"What’s an attack simulation?"},{"entityRanges":[],"key":"f2cet","text":"An attack simulation is a way for you to send an email to your users that is a fake phishing attack. In short, Microsoft has created several sample emails that you can use to send to your users. The sample emails will direct the user to go to a fake malicious site or download a fake malicious attachment. When the user opens the site or attachment they are informed that this was a simulation. Microsoft’s attack simulation will also report on who opened the malicious URLs or attachments so you can provide them with more training.","type":"unstyled","depth":0,"inlineStyleRanges":[],"data":{}},{"depth":0,"data":{},"type":"header-two","entityRanges":[],"key":"7bq9p","inlineStyleRanges":[],"text":"What licenses are required?"},{"depth":0,"key":"dabt4","entityRanges":[],"text":"To use the attack simulation training built into Microsoft 365 you’ll need Microsoft 365 E5 or Microsoft Defender for Office 365 Plan 2 licenses.","inlineStyleRanges":[],"type":"unstyled","data":{}},{"depth":0,"key":"52l44","text":"What roles are required?","type":"header-two","entityRanges":[],"data":{},"inlineStyleRanges":[]},{"inlineStyleRanges":[],"text":"You need to be a member of one of the following roles to set up the attack simulation training:","type":"unstyled","key":"c3akv","entityRanges":[],"data":{},"depth":0},{"key":"colng","data":{},"entityRanges":[],"inlineStyleRanges":[],"type":"unordered-list-item","text":"Organization Management","depth":0},{"text":"Security Administrator","type":"unordered-list-item","data":{},"entityRanges":[],"key":"5srjs","depth":0,"inlineStyleRanges":[]},{"depth":0,"data":{},"entityRanges":[],"text":"Attack Simulation Administrators can create and manage all aspects of attack simulation campaigns.","inlineStyleRanges":[],"type":"unordered-list-item","key":"9lnp7"},{"entityRanges":[],"key":"pm7p","inlineStyleRanges":[],"type":"unordered-list-item","data":{},"depth":0,"text":"Attack Payload Author can create attack payloads that an admin can initiate later."},{"key":"al20s","type":"header-two","entityRanges":[],"inlineStyleRanges":[],"depth":0,"data":{},"text":"How to configure an attack simulation"},{"entityRanges":[{"offset":70,"length":11,"key":0}],"inlineStyleRanges":[{"style":"BOLD","length":25,"offset":13},{"length":26,"offset":41,"style":"BOLD"},{"length":11,"offset":70,"style":"BOLD"},{"length":19,"offset":89,"style":"BOLD"}],"key":"eoj72","type":"unstyled","text":"1. Go to the Microsoft Defender portal > Attack simulation training > Simulations. Click Launch a simulation.","data":{},"depth":0},{"key":"fj9f5","inlineStyleRanges":[],"type":"atomic","data":{},"text":" ","depth":0,"entityRanges":[{"offset":0,"key":1,"length":1}]},{"text":"2. Select the technique you want to use. In this scenario, we’ll leave Credential Harvest checked and click Next.","data":{},"type":"unstyled","key":"cj0hk","entityRanges":[],"depth":0,"inlineStyleRanges":[{"offset":71,"style":"BOLD","length":18},{"offset":108,"style":"BOLD","length":4}]},{"type":"atomic","text":" ","depth":0,"key":"38am9","inlineStyleRanges":[],"entityRanges":[{"key":2,"length":1,"offset":0}],"data":{}},{"text":"3. Enter the simulation name of Test Simulation in the space provided. Click Next.","data":{},"type":"unstyled","depth":0,"entityRanges":[],"inlineStyleRanges":[{"offset":32,"style":"BOLD","length":15},{"offset":77,"style":"BOLD","length":4}],"key":"594ak"},{"key":"6qlpe","depth":0,"data":{},"inlineStyleRanges":[],"entityRanges":[{"offset":0,"length":1,"key":3}],"text":" ","type":"atomic"},{"entityRanges":[],"type":"unstyled","text":"4. Select the 2 Failed Messages payload. Click Next.","key":"7p6pm","depth":0,"inlineStyleRanges":[{"length":17,"style":"BOLD","offset":14},{"length":4,"style":"BOLD","offset":47}],"data":{}},{"entityRanges":[{"key":4,"length":1,"offset":0}],"key":"a4d00","type":"atomic","data":{},"text":" ","depth":0,"inlineStyleRanges":[]},{"type":"unstyled","data":{},"inlineStyleRanges":[{"length":37,"style":"BOLD","offset":105},{"offset":222,"length":4,"style":"BOLD"}],"text":"5. On the Target Users page you can either select the users you want to test the deployment with or click Include all users in my organization. Set up the users you want to send the attack simulation training to and click Next.","key":"fpckk","depth":0,"entityRanges":[]},{"key":"a57dh","text":" ","data":{},"depth":0,"entityRanges":[{"offset":0,"key":5,"length":1}],"inlineStyleRanges":[],"type":"atomic"},{"text":"6. On the Assign Training page leave the defaults and click Next.","key":"1sama","type":"unstyled","inlineStyleRanges":[],"depth":0,"data":{},"entityRanges":[]},{"depth":0,"text":"7. On the landing page window leave the defaults and click Next.","entityRanges":[],"data":{},"inlineStyleRanges":[],"key":"dosge","type":"unstyled"},{"type":"unstyled","entityRanges":[],"key":"961n4","inlineStyleRanges":[{"style":"BOLD","length":44,"offset":50},{"offset":107,"style":"BOLD","length":20},{"length":23,"offset":130,"style":"BOLD"},{"length":4,"style":"BOLD","offset":161}],"text":"8. On the select end-user notification page click Microsoft default notification (recommended). Then click Delivery preferences > Deliver during campaign. Click Next.","data":{},"depth":0},{"data":{},"text":" ","entityRanges":[{"offset":0,"key":6,"length":1}],"depth":0,"inlineStyleRanges":[],"key":"56mvv","type":"atomic"},{"text":"9. On the Launch details page click Next.","key":"cp136","inlineStyleRanges":[{"length":4,"style":"BOLD","offset":36}],"depth":0,"data":{},"entityRanges":[],"type":"unstyled"},{"entityRanges":[],"text":"10. Click Submit. Click Done.","type":"unstyled","inlineStyleRanges":[{"length":6,"style":"BOLD","offset":10},{"offset":24,"length":4,"style":"BOLD"}],"depth":0,"key":"1i5ce","data":{}},{"data":{},"key":"fl4ag","inlineStyleRanges":[],"text":"What will users experience?","entityRanges":[],"depth":0,"type":"header-two"},{"key":"4fgar","data":{},"type":"unstyled","text":"","inlineStyleRanges":[],"entityRanges":[],"depth":0},{"inlineStyleRanges":[],"key":"7e7p2","text":" ","type":"atomic","entityRanges":[{"key":7,"offset":0,"length":1}],"depth":0,"data":{}},{"type":"unstyled","entityRanges":[],"key":"573te","depth":0,"data":{},"inlineStyleRanges":[],"text":"Each user you selected to receive the phishing simulation will receive the same email. The email will contain a link to a website that appears to be from Microsoft. When the user enters their credentials they’ll receive a page informing them that they were duped. Once on the page, Microsoft will explain a couple of things that they review to know if the email is a phishing scam or not. Under the quick guide will be a link to training that the user can attend to learn more."},{"key":"fvsoj","entityRanges":[{"length":1,"key":8,"offset":0}],"inlineStyleRanges":[],"data":{},"text":" ","depth":0,"type":"atomic"},{"depth":0,"data":{},"type":"header-two","inlineStyleRanges":[],"entityRanges":[],"key":"epoav","text":"How to view the report on who clicked the link?"},{"type":"unstyled","entityRanges":[],"data":{},"text":"So now, we have some data. We’ve sent the email to some users in our organization but how do we check on who clicked the link / completed the training? It’s easy!","inlineStyleRanges":[],"depth":0,"key":"3d4k2"},{"depth":0,"type":"unstyled","key":"9t9rv","entityRanges":[{"offset":70,"length":11,"key":9}],"data":{},"inlineStyleRanges":[{"length":26,"style":"BOLD","offset":41},{"offset":70,"style":"BOLD","length":11},{"offset":89,"style":"BOLD","length":15}],"text":"1. Go to the Microsoft Defender portal > Attack simulation training > Simulations. Click Test Simulation."},{"data":{},"key":"8dia0","inlineStyleRanges":[],"text":" ","entityRanges":[{"key":10,"offset":0,"length":1}],"type":"atomic","depth":0},{"text":"From this page, you have a quick overview of the simulation. You can see how many users reported the email as phishing, clicked the link, and who entered their credentials.","depth":0,"data":{},"key":"kdn3","inlineStyleRanges":[],"entityRanges":[],"type":"unstyled"},{"entityRanges":[],"key":"94s5f","data":{},"depth":0,"inlineStyleRanges":[{"length":10,"offset":9,"style":"BOLD"}],"type":"unstyled","text":"2. Click View users to see where your users landed in the simulation."},{"text":" ","type":"atomic","inlineStyleRanges":[],"depth":0,"data":{},"entityRanges":[{"length":1,"key":11,"offset":0}],"key":"e0mf5"},{"depth":0,"entityRanges":[],"key":"57jbj","text":"From this page, you can see which users were compromised and which users completed the training.","type":"unstyled","data":{},"inlineStyleRanges":[]},{"type":"header-two","key":"96pkp","entityRanges":[],"data":{},"depth":0,"text":"How do we automatically schedule simulations?","inlineStyleRanges":[]},{"inlineStyleRanges":[],"data":{},"type":"unstyled","entityRanges":[],"depth":0,"text":"So now you’ve evaluated the simulation and maybe even sent the simulation to some of your end-users. The next question is, how do we make the simulations reoccur? Let’s take a look.","key":"16u9q"},{"depth":0,"key":"c2lam","type":"unstyled","entityRanges":[{"key":12,"length":22,"offset":70}],"data":{},"inlineStyleRanges":[{"style":"BOLD","length":26,"offset":41},{"style":"BOLD","length":22,"offset":70},{"offset":100,"style":"BOLD","length":17}],"text":"1. Go to Microsoft 365 Defender Portal > Attack simulation training > Simulation automations. Click Create automation."},{"data":{},"type":"atomic","entityRanges":[{"length":1,"offset":0,"key":13}],"inlineStyleRanges":[],"text":" ","depth":0,"key":"dnqbm"},{"text":"2. Set the name to Simulation Automation. Click Next.","type":"unstyled","inlineStyleRanges":[{"offset":19,"style":"BOLD","length":21},{"offset":48,"style":"BOLD","length":4}],"entityRanges":[],"key":"cltvc","data":{},"depth":0},{"type":"atomic","entityRanges":[{"length":1,"key":14,"offset":0}],"text":" ","key":"3ue11","inlineStyleRanges":[],"depth":0,"data":{}},{"data":{},"depth":0,"type":"unstyled","entityRanges":[],"inlineStyleRanges":[{"offset":9,"length":18,"style":"BOLD"},{"style":"BOLD","length":4,"offset":35}],"key":"bj8ei","text":"3. Click Credential Harvest. Click Next."},{"key":"bsrr8","inlineStyleRanges":[],"depth":0,"entityRanges":[{"offset":0,"length":1,"key":15}],"type":"atomic","data":{},"text":" "},{"data":{},"depth":0,"type":"unstyled","key":"bs0vq","inlineStyleRanges":[{"style":"BOLD","offset":9,"length":9},{"length":4,"style":"BOLD","offset":26}],"text":"4. Click Randomize. Click Next.","entityRanges":[]},{"data":{},"depth":0,"key":"2kv91","type":"atomic","text":" ","entityRanges":[{"offset":0,"key":16,"length":1}],"inlineStyleRanges":[]},{"type":"unstyled","entityRanges":[],"key":"3f0af","inlineStyleRanges":[{"style":"BOLD","offset":144,"length":36},{"offset":188,"style":"BOLD","length":4}],"depth":0,"text":"5. Select the users you want to be tested. As a start, you may want to select a couple of users. Then later you may want to come back and click Include all users in my organization. Click Next.","data":{}},{"key":"e066k","inlineStyleRanges":[],"type":"atomic","text":" ","entityRanges":[{"length":1,"offset":0,"key":17}],"data":{},"depth":0},{"entityRanges":[],"key":"ffuni","text":"6. On the assign training page, click Next.","data":{},"inlineStyleRanges":[{"style":"BOLD","length":4,"offset":38}],"type":"unstyled","depth":0},{"text":"7. On the Landing page window, click Next.","entityRanges":[],"type":"unstyled","inlineStyleRanges":[{"length":4,"offset":37,"style":"BOLD"}],"key":"bl0la","depth":0,"data":{}},{"key":"9dddn","data":{},"entityRanges":[],"text":"8. On the Select end user notification page click Microsoft default notification (recommended). Set Delivery preferences to Deliver during campaign. Click Next.","type":"unstyled","inlineStyleRanges":[{"length":44,"style":"BOLD","offset":50},{"style":"BOLD","length":20,"offset":100},{"length":23,"style":"BOLD","offset":124},{"length":4,"style":"BOLD","offset":155}],"depth":0},{"depth":0,"inlineStyleRanges":[],"key":"4194b","type":"atomic","text":" ","data":{},"entityRanges":[{"key":18,"length":1,"offset":0}]},{"text":"9. On the Simulation schedule page click Next.","type":"unstyled","entityRanges":[],"inlineStyleRanges":[{"style":"BOLD","offset":41,"length":4}],"key":"8ekcm","data":{},"depth":0},{"entityRanges":[],"text":"10. Set the simulation recurrence. Then click Next.","type":"unstyled","depth":0,"inlineStyleRanges":[{"style":"BOLD","length":21,"offset":12},{"style":"BOLD","offset":46,"length":4}],"key":"17h4m","data":{}},{"text":" ","entityRanges":[{"key":19,"offset":0,"length":1}],"inlineStyleRanges":[],"data":{},"key":"a7aau","depth":0,"type":"atomic"},{"text":"11. On the launch details page click Next.","data":{},"key":"a4ojt","entityRanges":[],"type":"unstyled","depth":0,"inlineStyleRanges":[{"length":4,"style":"BOLD","offset":37}]},{"depth":0,"key":"2bcct","type":"unstyled","text":"12. Click Submit. Click Done.","entityRanges":[],"data":{},"inlineStyleRanges":[{"length":6,"style":"BOLD","offset":10},{"style":"BOLD","offset":24,"length":4}]},{"data":{},"entityRanges":[],"inlineStyleRanges":[],"type":"unstyled","text":"","key":"4tn71","depth":0}],"entityMap":{"0":{"mutability":"MUTABLE","type":"LINK","data":{"targetOption":"_blank","url":"https://security.microsoft.com/attacksimulator?viewid=simulations"}},"1":{"data":{"height":"auto","alignment":"none","width":"auto","src":"https://i.ibb.co/HxvgcYk/launch-a-simulation.png","alt":"Launch a phishing attack simulation","targetOption":"_blank","url":"https://security.microsoft.com/attacksimulator?viewid=simulations"},"type":"IMAGE","mutability":"MUTABLE"},"2":{"type":"IMAGE","mutability":"MUTABLE","data":{"alignment":"none","src":"https://i.ibb.co/YTvnDry/select-a-technique.png","width":"auto","alt":"Select a Technique","height":"auto","targetOption":"_blank","url":"https://security.microsoft.com/attacksimulator?viewid=simulations"}},"3":{"data":{"url":"https://security.microsoft.com/attacksimulator?viewid=simulations","src":"https://i.ibb.co/JtdZw5W/name-your-simulation.png","alignment":"none","targetOption":"_blank","alt":"Name your simulation then click Next","height":"auto","width":"auto"},"type":"IMAGE","mutability":"MUTABLE"},"4":{"mutability":"MUTABLE","data":{"alignment":"none","width":"auto","targetOption":"_blank","src":"https://i.ibb.co/6BPbMjC/select-a-payload.png","url":"https://security.microsoft.com/attacksimulator?viewid=simulations","height":"auto","alt":"Select the 2 failed messages payload. Then click Next"},"type":"IMAGE"},"5":{"type":"IMAGE","data":{"height":"auto","width":"auto","alt":"Select the users to target. Then click Next","targetOption":"_blank","url":"https://security.microsoft.com/attacksimulator?viewid=simulations","alignment":"none","src":"https://i.ibb.co/hdj5mcc/target-users.png"},"mutability":"MUTABLE"},"6":{"data":{"src":"https://i.ibb.co/SQTjGBD/select-end-user-notification.png","height":"auto","width":"auto","alignment":"none","url":"https://security.microsoft.com/attacksimulator?viewid=simulations","targetOption":"_blank","alt":"Select end user notifications"},"type":"IMAGE","mutability":"MUTABLE"},"7":{"type":"IMAGE","mutability":"MUTABLE","data":{"targetOption":"_blank","src":"https://i.ibb.co/nkq9MsK/fake-phishing-email.png","alignment":"none","height":"auto","alt":"Fake phishing email","width":"auto","url":"https://security.microsoft.com/attacksimulator?viewid=simulations"}},"8":{"type":"IMAGE","mutability":"MUTABLE","data":{"src":"https://i.ibb.co/PYx0XxT/fake-phishing-landing-page.png","width":"auto","height":"auto","targetOption":"_blank","alt":"Fake phishing landing page","url":"https://security.microsoft.com/attacksimulator?viewid=simulations","alignment":"none"}},"9":{"data":{"url":"https://security.microsoft.com/attacksimulator?viewid=simulations","targetOption":"_blank"},"mutability":"MUTABLE","type":"LINK"},"10":{"type":"IMAGE","mutability":"MUTABLE","data":{"alt":"View phishing simulation","src":"https://i.ibb.co/Sdkb0n4/view-phishing-simulation.png","alignment":"none","width":"auto","height":"auto"}},"11":{"mutability":"MUTABLE","type":"IMAGE","data":{"height":"auto","alt":"Simulation overview view users circled","width":"auto","src":"https://i.ibb.co/NyvnbMK/simulation-overview-view-users-circled.png","alignment":"none"}},"12":{"type":"LINK","data":{"url":"https://security.microsoft.com/attacksimulator?viewid=simulationautomation","targetOption":"_blank"},"mutability":"MUTABLE"},"13":{"type":"IMAGE","data":{"width":"auto","src":"https://i.ibb.co/x3gkQK4/create-phishing-simulation-automation.png","alt":"Create phishing simulation automation","alignment":"none","height":"auto"},"mutability":"MUTABLE"},"14":{"type":"IMAGE","data":{"width":"auto","src":"https://i.ibb.co/X3ztyC5/name-your-automation.png","alignment":"none","height":"auto","alt":"Name your automation. Click next"},"mutability":"MUTABLE"},"15":{"data":{"height":"auto","alt":"Select social engineering technique","alignment":"none","src":"https://i.ibb.co/D9Vp9q5/Select-social-engineering-technique.png","width":"auto"},"type":"IMAGE","mutability":"MUTABLE"},"16":{"data":{"alt":"Set payloads to randomize. Click Next","height":"auto","width":"auto","src":"https://i.ibb.co/4N4906n/select-payloads.png","alignment":"none"},"type":"IMAGE","mutability":"MUTABLE"},"17":{"data":{"width":"auto","src":"https://i.ibb.co/RywpK18/select-the-target-users.png","height":"auto","alignment":"none","alt":"Select the target users."},"mutability":"MUTABLE","type":"IMAGE"},"18":{"type":"IMAGE","mutability":"MUTABLE","data":{"height":"auto","alignment":"none","alt":"Select end user notifications","src":"https://i.ibb.co/wgKfQNX/select-end-user-notifications-page.png","width":"auto"}},"19":{"data":{"alignment":"none","height":"auto","alt":"Schedule details","width":"auto","src":"https://i.ibb.co/2yBQcj2/schedule-details.png"},"type":"IMAGE","mutability":"MUTABLE"}}},"description":"Phishing attacks are one of the most common ways an organization is attacked. According to the FBI, there were 241,342 complaints, with adjusted losses of over $54 million in 2020 alone. So the question is, is your organization ready?","slug":"Simulating-attacks-with-Microsoft-365-GG4cMY8pK","datePublished":"2022/5/26","featuredImage":"https://i.ibb.co/NyvnbMK/simulation-overview-view-users-circled.png","title":"Simulating attacks with Microsoft 365","id":"GG4cMY8pK","images":["https://i.ibb.co/HxvgcYk/launch-a-simulation.png","https://i.ibb.co/b6c9c4W/select-a-technique.png","https://i.ibb.co/YTvnDry/select-a-technique.png","https://i.ibb.co/JtdZw5W/name-your-simulation.png","https://i.ibb.co/6BPbMjC/select-a-payload.png","https://i.ibb.co/hdj5mcc/target-users.png","https://i.ibb.co/SQTjGBD/select-end-user-notification.png","https://i.ibb.co/nkq9MsK/fake-phishing-email.png","https://i.ibb.co/PYx0XxT/fake-phishing-landing-page.png","https://i.ibb.co/Sdkb0n4/view-phishing-simulation.png","https://i.ibb.co/NyvnbMK/simulation-overview-view-users-circled.png","https://i.ibb.co/x3gkQK4/create-phishing-simulation-automation.png","https://i.ibb.co/X3ztyC5/name-your-automation.png","https://i.ibb.co/D9Vp9q5/Select-social-engineering-technique.png","https://i.ibb.co/4N4906n/select-payloads.png","https://i.ibb.co/RywpK18/select-the-target-users.png","https://i.ibb.co/wgKfQNX/select-end-user-notifications-page.png","https://i.ibb.co/2yBQcj2/schedule-details.png"],"publish":true},
      articles: [{"id":"cpchjBLkC","sectionId":"qwJW5VrBW","slug":"Whats-in-this-course-cpchjBLkC","title":"What's in this course?","featuredImage":"https://i.ibb.co/zFs9Vfb/microsoft365-security-administrator-associate-600x600.png"},{"id":"KKkBOVuS4","sectionId":"qwJW5VrBW","slug":"Creating-a-free-Microsoft-365-tenant-for-practice-KKkBOVuS4","title":"Creating a free Microsoft 365 tenant for practice","featuredImage":"https://i.ibb.co/F07sjQJ/microsoft-365-e5-trial.png"},{"id":"bzotoOjEe","sectionId":"qwJW5VrBW","slug":"Managing-the-Microsoft-365-tenant-Introduction-to-the-admin-centers-bzotoOjEe","title":"Managing the Microsoft 365 tenant - Introduction to the admin centers","featuredImage":"https://i.ibb.co/f1cr4zt/Microsoft-365-admin-centers.png"},{"id":"cg_vxOX9L","sectionId":"qwJW5VrBW","slug":"Managing-Microsoft-365-through-PowerShell-cg_vxOX9L","title":"Managing Microsoft 365 through PowerShell","featuredImage":"https://i.ibb.co/HV13YF6/install-microsoft-365-powershell-modules.png"},{"id":"uYCIPbnMC","sectionId":"AFV_acckJ","slug":"How-to-create-users-in-Microsoft-365-Cloud-Only-uYCIPbnMC","title":"How to create users in Microsoft 365 Cloud Only","featuredImage":"https://i.ibb.co/Wnt5Q43/View-Microsoft-365-Users.png"},{"id":"7CpqFkPZU","sectionId":"AFV_acckJ","slug":"Creating-and-managing-admins-through-roles-7CpqFkPZU","title":"Creating and managing admins through roles","featuredImage":"https://i.ibb.co/kySL4HQ/Roles-and-administrators.png"},{"id":"rZzausKJ1","sectionId":"AFV_acckJ","slug":"Time-limited-admin-roles-in-Microsoft-365-rZzausKJ1","title":"Time limited admin roles in Microsoft 365","featuredImage":"https://i.ibb.co/nDvjyPD/select-member-to-add-to-PIM-role.png"},{"id":"ky5W0Lz5P","sectionId":"AFV_acckJ","slug":"Whats-AD-Connect-ky5W0Lz5P","title":"What's AD Connect","featuredImage":"https://i.ibb.co/7nDqr9x/Whats-AD-Connect.png"},{"id":"i9pJIjTNH","sectionId":"AFV_acckJ","slug":"Protecting-Passwords-in-Microsoft-365-i9pJIjTNH","title":"Protecting Passwords in Microsoft 365","featuredImage":"https://i.ibb.co/DLD4G4q/access-smart-lockout-settings.png"},{"id":"S1hQgFOMV","sectionId":"AFV_acckJ","slug":"Creating-and-managing-users-through-groups-S1hQgFOMV","title":"Creating and managing users through groups","featuredImage":"https://i.ibb.co/nmmC28M/add-a-group-microsoft-365.png"},{"id":"2QfoI2HxY","sectionId":"AFV_acckJ","slug":"Securing-and-implementing-enterprise-applications-2QfoI2HxY","title":"Securing and implementing enterprise applications","featuredImage":"https://i.ibb.co/C2mp69m/disable-user-consent.png"},{"id":"V1en9Iugh","sectionId":"AFV_acckJ","slug":"Whats-a-conditional-access-policy-V1en9Iugh","title":"What's a conditional access policy?","featuredImage":"https://i.ibb.co/DQm1sY0/Create-conditional-access-policy.png"},{"id":"nAAIvNbtk","sectionId":"AFV_acckJ","slug":"The-many-ways-to-implement-multi-factor-authentication-MFA-in-Microsoft-365-nAAIvNbtk","title":"The many ways to implement multi-factor authentication (MFA) in Microsoft 365","featuredImage":"https://i.ibb.co/P1P0wNY/microsoft-365-manage-security-defaults.png"},{"id":"2S9jn0aLr","sectionId":"AFV_acckJ","slug":"Implement-Self-service-password-reset-in-Microsoft-365-2S9jn0aLr","title":"Implement Self-service password reset in Microsoft 365","featuredImage":"https://i.ibb.co/58y9JVg/write-back-passwords-to-on-premises-directory.png"},{"id":"FldNualGC","sectionId":"AFV_acckJ","slug":"Locking-down-your-Microsoft-365-tenant-from-Microsoft-engineers-FldNualGC","title":"Locking down your Microsoft 365 tenant from Microsoft engineers","featuredImage":"https://i.ibb.co/DCmpnT9/Enable-Customer-Lockbox.png"},{"id":"NFQ6rYFeQ","sectionId":"AFV_acckJ","slug":"Implementing-intelligent-security-using-risk-policies-in-Microsoft-365-NFQ6rYFeQ","title":"Implementing intelligent security using risk policies in Microsoft 365","featuredImage":"https://i.ibb.co/0cyQJ7j/Risk-Detections.png"},{"id":"rK48f6iM2","sectionId":"AFV_acckJ","slug":"Automating-Access-Review-in-Microsoft-365-rK48f6iM2","title":"Automating Access Review in Microsoft 365","featuredImage":"https://i.ibb.co/Xsxvz6Z/new-access-review.png"},{"id":"RHW1API2s","sectionId":"AFV_acckJ","slug":"Just-in-time-approval-and-notification-for-admin-roles-in-Microsoft-365-RHW1API2s","title":"Just in time, approval and notification for admin roles in Microsoft 365","featuredImage":"https://i.ibb.co/dcb6XFN/Activate-a-Role.png"},{"id":"z8EMM9Eu_","sectionId":"QScYfSu74","slug":"Whats-Microsoft-365-Defender-z8EMM9Eu_","title":"What's Microsoft 365 Defender?","featuredImage":"https://i.ibb.co/MDMyDQt/Microsoft-Defender.png"},{"id":"Kye_yNLxA","sectionId":"QScYfSu74","slug":"Whats-Microsoft-Defender-for-identity-Kye_yNLxA","title":"What's Microsoft Defender for identity?","featuredImage":"https://i.ibb.co/bQDBh0Y/Defender-for-Identity-Timeline.png"},{"id":"EnPyp7ukN","sectionId":"QScYfSu74","slug":"Whats-Microsoft-Defender-for-Office-365-EnPyp7ukN","title":"What's Microsoft Defender for Office 365?","featuredImage":"https://i.ibb.co/WcwKY2G/Microsoft-365-incidents-and-alerts.png"},{"id":"6HUOr7qbL","sectionId":"QScYfSu74","slug":"Protect-your-email-environment-from-malicious-actors-6HUOr7qbL","title":"Protect your email and Office environment from malicious actors","featuredImage":"https://i.ibb.co/Df0KQVp/Reports.png"},{"id":"GCOOUsSBT","sectionId":"QScYfSu74","slug":"Protecting-email-against-phishing-attacks-GCOOUsSBT","title":"Protecting email against phishing attacks","featuredImage":"https://i.ibb.co/GCjZHWg/edit-actions.png"},{"id":"GG4cMY8pK","sectionId":"QScYfSu74","slug":"Simulating-attacks-with-Microsoft-365-GG4cMY8pK","title":"Simulating attacks with Microsoft 365","featuredImage":"https://i.ibb.co/NyvnbMK/simulation-overview-view-users-circled.png"},{"id":"z0qPG6v4T","sectionId":"QScYfSu74","slug":"Protecting-Windows-10-and-other-devices-with-Microsoft-Defender-for-Endpoint-z0qPG6v4T","title":"Protecting Windows 10 and other devices with Microsoft Defender for Endpoint","featuredImage":"https://i.ibb.co/T47Xhyh/enable-endpoint-connections.png"},{"id":"LEyZMWBSt","sectionId":"QScYfSu74","slug":"Collect-detect-investigate-and-respond-to-security-threats-using-Microsoft-Sentinel-LEyZMWBSt","title":"Collect, detect, investigate, and respond to security threats using Microsoft Sentinel","featuredImage":"https://i.ibb.co/qN9XsKj/Add-Workbook.png"},{"id":"7MQ3wE4wP","sectionId":"QScYfSu74","slug":"Implement-and-manage-Microsoft-Defender-for-Cloud-Apps-7MQ3wE4wP","title":"Implement and manage Microsoft Defender for Cloud Apps","featuredImage":"https://i.ibb.co/7g7LvFg/office-365-cloud-apps-settings.png"},{"id":"sH_Ee1DW1","sectionId":"QScYfSu74","slug":"Auditing-sign-ins-and-other-actions-in-Microsoft-365-sH_Ee1DW1","title":"Auditing sign-ins and other actions in Microsoft 365","featuredImage":"https://i.ibb.co/BqMw3jZ/Start-recording-user-and-admin-activity.png"},{"id":"vLweLmxZf","sectionId":"YhftdGIRX","slug":"How-to-classify-data-using-labels-in-Microsoft-365-vLweLmxZf","title":"How to classify data using labels in Microsoft 365","featuredImage":"https://i.ibb.co/k9nhWS5/Choose-protection-settings-for-files-and-emails.png"},{"id":"NsF7No40f","sectionId":"YhftdGIRX","slug":"Creating-and-managing-data-retention-to-conform-to-compliance-NsF7No40f","title":"Creating and managing data retention to conform to compliance","featuredImage":"https://i.ibb.co/yqC0ZdY/New-Retention-Policy.png"},{"id":"IsPGsme8w","sectionId":"YhftdGIRX","slug":"Preventing-accidental-and-malicious-data-loss-with-DLP-policies-IsPGsme8w","title":"Preventing accidental and malicious data loss with DLP policies","featuredImage":"https://i.ibb.co/n8WcqKM/Create-a-DLP-policy.png"},{"id":"wv2PbXnhI","sectionId":"YhftdGIRX","slug":"Everything-you-need-to-know-about-securing-SharePoint-Online-for-the-MS-500-wv2PbXnhI","title":"Everything you need to know about securing SharePoint Online for the MS-500","featuredImage":"https://i.ibb.co/Gk9NjSH/Share-Point-Online-Warning.png"},{"id":"7gR3L122b","sectionId":"l0DxUuonW","slug":"Introduction-to-Intune-7gR3L122b","title":"Introduction to Intune","featuredImage":"https://i.ibb.co/Fq3N8BX/Endpoint-Manager-Admin-Center.png"},{"id":"ZyKX3Idjs","sectionId":"l0DxUuonW","slug":"Setting-up-Android-Devices-ZyKX3Idjs","title":"Setting up Android Devices","featuredImage":"https://i.ibb.co/m0BYhL2/Connect-Intune-to-Google-Play.png"},{"id":"MAjW0a2_p","sectionId":"l0DxUuonW","slug":"Setting-up-Apple--iOS-devices-in-Intune-MAjW0a2_p","title":"Setting up Apple / iOS devices in Intune","featuredImage":"https://i.ibb.co/X7Ffb2B/Setup-Apple-Enrollment-in-Intune.png"},{"id":"XFXu2zIS9","sectionId":"l0DxUuonW","slug":"Setting-up-Windows-10-devices-in-Intune-XFXu2zIS9","title":"Setting up Windows 10 devices in Intune","featuredImage":"https://i.ibb.co/WDXKVjW/configure-device-options.png"},{"id":"_LL9VqGZO","sectionId":"l0DxUuonW","slug":"How-to-manage-devices-using-Intune-_LL9VqGZO","title":"How to manage devices using Intune","featuredImage":"https://i.ibb.co/HPQ2m8t/Create-an-endpoint-protection-profile.png"},{"id":"qDRA4jjoN","sectionId":"l0DxUuonW","slug":"Understanding-compliance-policies-qDRA4jjoN","title":"Understanding compliance policies","featuredImage":"https://i.ibb.co/N3Qk57v/Create-a-compliance-policy.png"},{"id":"62t_7oiZx","sectionId":"l0DxUuonW","slug":"Restricting-and-managing-apps-on-user-devices-62t_7oiZx","title":"Restricting and managing apps on user devices","featuredImage":"https://i.ibb.co/PCVRKDf/Add-an-Android-app-to-Intune.png"}],
      articleHtml: `<p>Phishing attacks are one of the most common ways an organization is attacked. According to the FBI, there were 241,342 complaints, with adjusted losses of over $54 million in 2020 alone. So the question is, is your organization ready?</p>
<h2>What’s a phishing attack?</h2>
<p>Phishing attacks are a type of social engineering attack used to steal data, typically credit card or login credentials. In short, the malicious person would send an email pretending to be from someone else and ask the victim to either go to a website enter their credentials or send them a credit card or a money transfer. For the victim, either your organization or the user the attack can be devastating. You can lose financially, or the attacker may use the credentials to send malicious emails to your partners, as well as the world discrediting you and your business.</p>
<h3>Phishing attack techniques</h3>
<p>There are several techniques used in a phishing attack and the number continues to grow but for now, we’ll focus on 5 different phishing attack techniques.</p>
<h4>Credential harvest</h4>
<p>In credential harvesting attacks the malicious person is attempting to get your user’s credentials. The malicious user will typically send an email with a URL to a bogus site to trick your users into entering their credentials.</p>
<h4>Malware attachment</h4>
<p>In malware attachment attacks a malicious person will send an email to your users with a malicious attachment. A lot of times the attachment will look like a simple Word or Excel document but the attachment will have malicious code baked into it.</p>
<h4>Link in attachment</h4>
<p>With Link in attachment attacks, the malicious user will be attacking your users using the credential harvest technique. The only difference being the malicious user will put the link inside an attachment.</p>
<h4>Link to malware</h4>
<p>Link to malware attacks will send an email to your users with a link where the user needs to go to a website and download the malicious file. Like the malware attachment attack technique, the file will contain code that is run on your user's computer. Often the malicious person will host the malicious code on common sites like Dropbox, SharePoint, or Google Drive.</p>
<h4>Drive-by URL</h4>
<p>Drive-by URL also known as the watering hole technique is an attack sequence where the malicious user sends an email with a URL inside. The URL will point to a website with malicious code running it to get information from your users. Typically the website will be a good site that has been hacked or a clone of a good site so the user doesn’t even realize it’s happening.</p>
<h2>How to stop phishing attacks?</h2>
<p>One of the best ways to prevent phishing attacks is user training. Training your users to detect malicious emails can prevent your organization from losing financially or credibility. In short, we’ll set up a simulated phishing email and send it to your users. Then we’ll track who opened the links and you can work with those specific users to help them learn to avoid getting tricked again.</p>
<h2>What’s an attack simulation?</h2>
<p>An attack simulation is a way for you to send an email to your users that is a fake phishing attack. In short, Microsoft has created several sample emails that you can use to send to your users. The sample emails will direct the user to go to a fake malicious site or download a fake malicious attachment. When the user opens the site or attachment they are informed that this was a simulation. Microsoft’s attack simulation will also report on who opened the malicious URLs or attachments so you can provide them with more training.</p>
<h2>What licenses are required?</h2>
<p>To use the attack simulation training built into Microsoft 365 you’ll need Microsoft 365 E5 or Microsoft Defender for Office 365 Plan 2 licenses.</p>
<h2>What roles are required?</h2>
<p>You need to be a member of one of the following roles to set up the attack simulation training:</p>
<ul>
<li>Organization Management</li>
<li>Security Administrator</li>
<li>Attack Simulation Administrators can create and manage all aspects of attack simulation campaigns.</li>
<li>Attack Payload Author can create attack payloads that an admin can initiate later.</li>
</ul>
<h2>How to configure an attack simulation</h2>
<p>1. Go to the <strong>Microsoft Defender portal</strong> &gt; <strong>Attack simulation training</strong> &gt; <a href="https://security.microsoft.com/attacksimulator?viewid=simulations" target="_blank"><strong>Simulations</strong></a>. Click <strong>Launch a simulation</strong>.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/HxvgcYk/launch-a-simulation.png" alt="Launch a phishing attack simulation" style="height: auto;width: auto"/></div>
<p>2. Select the technique you want to use. In this scenario, we’ll leave <strong>Credential Harvest</strong> checked and click <strong>Next</strong>.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/YTvnDry/select-a-technique.png" alt="Select a Technique" style="height: auto;width: auto"/></div>
<p>3. Enter the simulation name of <strong>Test Simulation</strong> in the space provided. Click <strong>Next</strong>.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/JtdZw5W/name-your-simulation.png" alt="Name your simulation then click Next" style="height: auto;width: auto"/></div>
<p>4. Select the <strong>2 Failed Messages</strong> payload. Click <strong>Next</strong>.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/6BPbMjC/select-a-payload.png" alt="Select the 2 failed messages payload. Then click Next" style="height: auto;width: auto"/></div>
<p>5. On the Target Users page you can either select the users you want to test the deployment with or click<strong> Include all users in my organization</strong>. Set up the users you want to send the attack simulation training to and click <strong>Next</strong>.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/hdj5mcc/target-users.png" alt="Select the users to target. Then click Next" style="height: auto;width: auto"/></div>
<p>6. On the Assign Training page leave the defaults and click Next.</p>
<p>7. On the landing page window leave the defaults and click Next.</p>
<p>8. On the select end-user notification page click <strong>Microsoft default notification (recommended)</strong>. Then click <strong>Delivery preferences</strong> &gt; <strong>Deliver during campaign</strong>. Click <strong>Next</strong>.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/SQTjGBD/select-end-user-notification.png" alt="Select end user notifications" style="height: auto;width: auto"/></div>
<p>9. On the Launch details page click <strong>Next</strong>.</p>
<p>10. Click <strong>Submit</strong>. Click <strong>Done</strong>.</p>
<h2>What will users experience?</h2>
<p></p>
<div style="text-align:none;"><img src="https://i.ibb.co/nkq9MsK/fake-phishing-email.png" alt="Fake phishing email" style="height: auto;width: auto"/></div>
<p>Each user you selected to receive the phishing simulation will receive the same email. The email will contain a link to a website that appears to be from Microsoft. When the user enters their credentials they’ll receive a page informing them that they were duped. Once on the page, Microsoft will explain a couple of things that they review to know if the email is a phishing scam or not. Under the quick guide will be a link to training that the user can attend to learn more.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/PYx0XxT/fake-phishing-landing-page.png" alt="Fake phishing landing page" style="height: auto;width: auto"/></div>
<h2>How to view the report on who clicked the link?</h2>
<p>So now, we have some data. We’ve sent the email to some users in our organization but how do we check on who clicked the link / completed the training? It’s easy!</p>
<p>1. Go to the Microsoft Defender portal &gt; <strong>Attack simulation training</strong> &gt; <a href="https://security.microsoft.com/attacksimulator?viewid=simulations" target="_blank"><strong>Simulations</strong></a>. Click <strong>Test Simulation</strong>.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/Sdkb0n4/view-phishing-simulation.png" alt="View phishing simulation" style="height: auto;width: auto"/></div>
<p>From this page, you have a quick overview of the simulation. You can see how many users reported the email as phishing, clicked the link, and who entered their credentials.</p>
<p>2. Click <strong>View users</strong> to see where your users landed in the simulation.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/NyvnbMK/simulation-overview-view-users-circled.png" alt="Simulation overview view users circled" style="height: auto;width: auto"/></div>
<p>From this page, you can see which users were compromised and which users completed the training.</p>
<h2>How do we automatically schedule simulations?</h2>
<p>So now you’ve evaluated the simulation and maybe even sent the simulation to some of your end-users. The next question is, how do we make the simulations reoccur? Let’s take a look.</p>
<p>1. Go to Microsoft 365 Defender Portal &gt; <strong>Attack simulation training</strong> &gt; <a href="https://security.microsoft.com/attacksimulator?viewid=simulationautomation" target="_blank"><strong>Simulation automations</strong></a>. Click <strong>Create automation</strong>.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/x3gkQK4/create-phishing-simulation-automation.png" alt="Create phishing simulation automation" style="height: auto;width: auto"/></div>
<p>2. Set the name to <strong>Simulation Automation</strong>. Click <strong>Next</strong>.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/X3ztyC5/name-your-automation.png" alt="Name your automation. Click next" style="height: auto;width: auto"/></div>
<p>3. Click <strong>Credential Harvest</strong>. Click <strong>Next</strong>.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/D9Vp9q5/Select-social-engineering-technique.png" alt="Select social engineering technique" style="height: auto;width: auto"/></div>
<p>4. Click <strong>Randomize</strong>. Click <strong>Next</strong>.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/4N4906n/select-payloads.png" alt="Set payloads to randomize. Click Next" style="height: auto;width: auto"/></div>
<p>5. Select the users you want to be tested. As a start, you may want to select a couple of users. Then later you may want to come back and click <strong>Include all users in my organization</strong>. Click <strong>Next</strong>.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/RywpK18/select-the-target-users.png" alt="Select the target users." style="height: auto;width: auto"/></div>
<p>6. On the assign training page, click <strong>Next</strong>.</p>
<p>7. On the Landing page window, click <strong>Next</strong>.</p>
<p>8. On the Select end user notification page click <strong>Microsoft default notification (recommended)</strong>. Set <strong>Delivery preferences</strong> to <strong>Deliver during campaign</strong>. Click <strong>Next</strong>.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/wgKfQNX/select-end-user-notifications-page.png" alt="Select end user notifications" style="height: auto;width: auto"/></div>
<p>9. On the Simulation schedule page click <strong>Next</strong>.</p>
<p>10. Set the <strong>simulation recurrence</strong>. Then click <strong>Next</strong>.</p>
<div style="text-align:none;"><img src="https://i.ibb.co/2yBQcj2/schedule-details.png" alt="Schedule details" style="height: auto;width: auto"/></div>
<p>11. On the launch details page click <strong>Next</strong>.</p>
<p>12. Click <strong>Submit</strong>. Click <strong>Done</strong>.</p>
<p></p>
`,
      nextContentSlug: 'Protecting-Windows-10-and-other-devices-with-Microsoft-Defender-for-Endpoint-z0qPG6v4T',
      previousContentSlug: 'Protecting-email-against-phishing-attacks-GCOOUsSBT',
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
