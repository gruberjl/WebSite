import * as React from "react"
import Page from '../../components/page'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Link } from "gatsby"
 
class BlogArticle extends React.Component {
  render() {
    const title = "10 Reasons SharePoint Online Destroys File Shares"
    const jsonLd = {
      headline: title,
      datePublished: '2-1-2018',
      keywords: [
        "Microsoft",
        "SharePoint Online",
        "Microsoft 365",
        "Office 365",
        "Productivity"
      ],
      "author": {
        "@type": "Person",
        "name": "John Gruber",
        url: 'https://medium.com/@gruberjl'
      }
    }

    return (
      <Page jsonLdType={'BlogPosting'} jsonLd={jsonLd} image={'https://miro.medium.com/max/1306/1*px7gQaOUIJmLN2LhwNgyFQ.jpeg'} canonical={'https://medium.com/gitbit/10-reasons-sharepoint-online-destroys-file-shares-7c2c2680f1e9'} title={title} description={"The IT department of the future leads the business driving innovation. We streamline the day to day, improve customer experience, and help the sales team close more deals!"}>
        <main>
          <div>
            <Container className="blog-article">
              <Row>
                <Col>
                  <h1>10 Reasons SharePoint Online Destroys File Shares</h1>
                  <figure>
                   <div><img alt="Microsoft SharePoint" src="https://miro.medium.com/max/1306/1*px7gQaOUIJmLN2LhwNgyFQ.jpeg" width="866" height="487" role="presentation"/></div>
                  </figure>
                  <p>Ever since I was little I dreamed of being in IT. Hiding in a windowless office, where users would request access and equipment to empower them to do their jobs. Working on cool technology and generally tinkering with the latest gear. When I was in high school, that’s what IT looked like… <strong>The world has changed</strong>. <mark>IT is no longer expected to support the business, </mark><mark><strong>we’re innovating to drive growt</strong></mark><strong>h</strong>. <strong>It’s</strong> <strong>our job to transform the older outdated practices into a mobile, agile business</strong>. Migrating to SharePoint Online is the best way to transform an organization.</p>
                  <h2>1. Maintenance</h2>
                  <blockquote>
                   <p><mark>With</mark><mark> a cloud-based portal, updates happen automatically, and the IT team spends less time on maintenance tasks. “Now that we’re in the cloud, we no longer have to worry about maintenance weekends, patching, or the system going down,” says Graeme Cuthbertson, IT Manager at Thermo Fisher.</mark></p>
                  </blockquote>
                  <p><strong>When I originally heard about the cloud, my first thought wasn’t what value it could provide to the business. My first instinct was survival.</strong> My day to day job was managing backups, monitoring disk space, and replacing servers. What would I do if everything I managed become someone else’s responsibility? I’ve been a cloud engineer for over 5 years, half my career. I’m busier and better paid than ever. <mark><strong>I’m no longer seen as an expense on the business. I drive value and innovation</strong></mark><strong>.</strong> Even in this article, I hope clients read it and decide to move their workloads to Office 365. But enough about me.</p>
                  <p>SharePoint Online has a lot of capabilities that can be changed and configured to meet a TON of needs. From lists, Yammer, and internal websites the workload for SharePoint Online admins can be extensive. But that’s not what we’re discussing today. <strong>If you’re only using SharePoint Online as a file store, there’s generally no maintenance</strong>. Even group permissions can be delegated to the teams. Surprisingly, people love being able to manage their own team. They don’t want to bother the IT staff and wait for our response. They want to grant the new user all the access themselves. If you want IT staff to retain control, it’s fast and easy.</p>
                  <p>I won’t go into a lot of detail about file shares. Group Policy can automate some tasks, backups can run on a schedule, etc. But, group policy fails, users drives don’t connect. Backups fail. It happens with on-premise file shares. <mark>In summary, </mark><mark><strong>SharePoint Online requires less maintenance.</strong></mark></p>
                  <h2>2. Cost</h2>
                  <blockquote>
                   <p>Putting a race together requires the same coordinated teamwork you see in the pit, and with SharePoint Online, we’re driving productivity into a new era of time- and cost-savings. That’s great news for NASCAR. — Stephen Byrd</p>
                  </blockquote>
                  <p>If you’re already on Office 365, <strong>SharePoint Online is included and using it wouldn’t cost you anything</strong>. If you’re not in Office 365, SharePoint Online has a user based monthly fee. You can squash the CAPEX for a low OPEX. I’d expect the hardware, software, VPN, and the backup solution would end up costing your organization more but you’ll have to run the numbers for yourself. Including the maintenance of file shares, <strong>I’ve never seen on-premise storage being cheaper than SharePoint Online</strong>. But who cares about cost!? <em>If you learn one thing from this article, let it be this</em>: <mark><strong>The IT department of the future delivers innovation to help lead the business. We streamline the day to day, improve customer experience, and help the sales team close more deals!</strong></mark></p>
                  <h2>3. Security</h2>
                  <blockquote>
                   <p>We’re achieving our vision of accessing our business content and communicating across the globe — anywhere, anytime, on any device, in a more secure way.</p>
                  </blockquote>
                  <p>Answer honestly, if I tried to gain physical access to your data center could I? If I ran a dictionary attack against an admin account would I be stopped? <strong>If I purchased a hack that takes advantage of the latest vulnerability would you update before I gained access</strong>? If you can honestly answer yes, you are worth a lot more than you’re being paid and you will never receive the recognition you deserve. Your job is to prevent attacks from happening. Who will give you an attaboy because you stopped something before it started? If you fail once, you’ll pay for it…</p>
                  <p>I know you’ve heard it, we all have. The cloud isn’t secure. This is something that makes big headlines and attracts readers. I’m here to tell you, this simply isn’t true. <strong>These stories remind me of the notorious hacker Kevin Mitnick. They wouldn’t allow him to use a telephone from jail because they thought he could shoot off nukes with a phone call</strong>. The fact is, the media and a lot of other smart people don’t understand technology. They don’t know how it works, but security threats make headlines.</p>
                  <p><mark>SharePoint Online is always up-to-date. It has a team of resources dedicated to hardening and protecting the data. If someone finds a breach, Microsoft will pay for the tip! Lastly, SharePoint Online can be hardened with MFA. Depending on your Office 365 package it may be included!</mark></p>
                  <p><em>Quick shout out to current </em><Link to="https://goo.gl/GPEvM2" rel="noopener"><em>TierPoint </em></Link><em>customers, if your interested in MFA give me shout. Microsoft has a charge if you’re using a sync or hybrid package. Cloud only customers get it for free and my time is included in your package.</em></p>
                  <h2>4. Compliance</h2>
                  <blockquote>
                   <p>Assurant achieves (a high) level of mobility while still complying with industry regulations</p>
                   <p>there’s never a good quote on compliance — John Gruber</p>
                  </blockquote>
                  <p>My favorite topic. I talk about it all the time. It’s so unbelievably boring, but it can mean life or death for an organization or millions of dollars in fines. SharePoint Online can be configured for a long list of different industry standards including HIPAA. I want you to finish reading the article so I’m not going into more detail, but remember, <strong>SharePoint Online can be compliant but isn’t out of the box</strong>.</p>
                  <h2>5. Search &amp; Discovery</h2>
                  <p>I won’t go into huge detail here because honestly, I think highly of file share’s search capability. SharePoint Online’s search is amazing. Everything’s indexed and searchable. A bit easier and more robust thanks to the web portal and more advanced features with metadata but I never found search lacking in file shares. If you found search and discovery a problem with file shares, you’ll love SharePoint Online.</p>
                  <h2>6. Remote Workforce</h2>
                  <blockquote>
                   <p><mark>Mobile access to content on OneDrive for Business and SharePoint Online is key for our productivity.</mark> And it helps to have the option to share a link rather than attach documents in email. I also consider the security features in OneDrive for Business and SharePoint reassuringly comprehensive. — Shire Case Study</p>
                  </blockquote>
                  <p>The workforce is becoming more remote. People are working from home, their cars, and while sitting in their doctor’s waiting room. By design, file shares are a local-only resource. We’ve overcome this limitation with a VPN. The increase in maintenance and complexity of a VPN can add to your maintenance and costs but works well over high-speed internet. SharePoint Online can be accessed from anywhere, without the headaches. Users can sync their data to their local computers too. Lastly, SharePoint Online can be accessed from any device. Managers can review and sign off on the latest sales order from their phone while they don’t have internet access. Once they have access again, their approval will be automatically synced to SharePoint Online.</p>
                  <h2>7. Teamwork Makes the Dream Work</h2>
                  <blockquote>
                   <p>With SharePoint, McMillan and his sales team have one place to send and share files and collaborate with version-control support. “When teams work together in SharePoint Online, everybody always has access to the latest information,” says McMillan. “We’re in a different universe now in terms of document control.”</p>
                  </blockquote>
                  <p><mark>T</mark><mark>w</mark><mark>o people can’t open the same document on a file share. It can’t be done. How many times have you had to track someone down or force a terminal session closed because someone left a file open? Luckily, it never happens in SharePoint Online. SharePoint Online has a feature called Co-Author which allows multiple people to edit the document at the same time.</mark></p>
                  <h2>8. Customer Engagement Through External Sharing</h2>
                  <blockquote>
                   <p>Previously, business units had their own shared drive and employees emailed documents back and forth, while the attendant redundancies and version control issues impeded progress. “We use Office 365 as an enterprise collaboration platform that connects business units, so for the first time, we can work together to purchase aircraft as a single team,” says Pizzey. <mark>“We’re reducing duplication of effort and getting things done more efficiently.”</mark></p>
                  </blockquote>
                  <p><strong>Typically, if a file is kept on a share, there’s only one option for external sharing, email.</strong> What your users don’t tell you, if it doesn’t fit in an email, they use their personal OneDrive, DropBox, or Google Drive. It’s important to grant users access to tools they require to do their job in a secure way.</p>
                  <p>SharePoint Online has secure file sharing. External users can collaborate in real-time with your team and be required to have a username and password. The best part? You don’t have to set up the account! Your users can create a document and share a link via email to key external users. Those users can then create an account (using the specified email address and link) and gain access to the documents.</p>
                  <p>I can’t drive this point home enough, if you don’t provide the technology that your users need, they will bypass you and do what they want because their boss doesn’t care about your compliance and security concerns. Their boss cares about their employees getting their jobs done and if that means bypassing the internal IT then so be it. <strong>Empower and train your users to do things right and they will.</strong></p>
                  <h2>9. Web Portal</h2>
                  <figure>
                   <div>
                      <div>
                         <div>
                            <div></div>
                            <img alt="SharePoint Online screenshot with documents" width="351" height="611" role="presentation" src="https://miro.medium.com/max/351/1*6qMH63R0tNbpS-F7jRqOuA.png" sizes="351px" srcSet="https://miro.medium.com/max/276/1*6qMH63R0tNbpS-F7jRqOuA.png 276w, https://miro.medium.com/max/351/1*6qMH63R0tNbpS-F7jRqOuA.png 351w"/>
                         </div>
                      </div>
                   </div>
                   <figcaption>SharePoint Online from a SmartPhone</figcaption>
                  </figure>
                  <p><mark>Web portals empower users.</mark> Secret right-click menus are confusing to regular users. They have their own jobs to worry about, they don’t want to waste time trying to figure out the VPN and shared drive nonsense. Through the SharePoint Online web portal, you can search, open, share, etc. It’s easy. I won’t go into detail because I’m sure you’ve seen the web portal for some other cloud storage. SharePoint Online can be as simple as Google Drive but customized to meet your organization’s needs.</p>
                  <h2>10. Workflows and Automation</h2>
                  <blockquote>
                   <p>Hershey created SharePoint Online teams to build workflows that save the company time and money. <mark>One team created two collaboration sites and a workflow to streamline audits, reducing internal audit time and trimming 1,250 hours out of the audit management process annually.</mark> Another team improved collaboration with one of the company’s leading suppliers of cocoa, Barry Callebaut, by giving the supplier access to a highly secure portal on The Conche. Hershey and Barry Callebaut employees use (SharePoint Online) to share files on joint projects and coauthor documents, <mark>saving the Barry Callebaut team at Hershey 70 hours a week.</mark></p>
                  </blockquote>
                  <p>SharePoint Online has workflow and automation capabilities built-in. We can make workflows that pass documents around to get them signed, team input, or whatever else you may need. Want someone to review and approve a document before pushing it to the client? No problem with SharePoint Online!</p>
                  <p><strong>Pro Tip:</strong> I have law firms set up special little areas for their customers. Then I have the paralegal create the document and put it in the client’s section. SharePoint automatically holds the document until the lawyer approves it. Then the document is showcased to the client.</p>
                  <h2>Summary</h2>
                  <p>In conclusion, SharePoint Online is one of the most powerful and innovative products in the Office 365 suite but doesn’t get the recognition it deserves. If you’re a current Office 365 customer you already have access. Make a site and perform some testing. Jump to the <Link to="https://support.office.com/en-us/sharepoint" rel="noopener">SharePoint Online Training Site</Link> to learn more. If you’re a <Link to="https://goo.gl/GPEvM2" rel="noopener">TierPoint </Link>customer and would like more information, please don’t hesitate to contact me. We’ll schedule a time where we can help you get started or migrate your data. If you’re not a current customer, drop me an email on my personal account: john.gruber@gitbit.org. I‘ll do my best to help in any way I can.</p>
                  <div role="separator"><span></span><span></span><span></span></div>
                  <section>
                   <div>
                      <div>
                         <p>Thank you for reading my article, I hope you found it beneficial. In the coming weeks I plan to create more guides to help you get started using SharePoint Online. Follow me to stay in touch.</p>
                         <p>— <Link to="https://goo.gl/HALQd2" rel="noopener">John Gruber </Link>— <Link to="https://goo.gl/GPEvM2" rel="noopener">TierPoint Collaboration Engineer</Link></p>
                      </div>
                   </div>
                  </section>
                  <div role="separator"><span></span><span></span><span></span></div>
                  <section>
                   <div>
                      <div>
                         <p><strong>This story is published in </strong><Link to="http://blog.usejournal.com" rel="noopener"><strong>Noteworthy</strong></Link><strong>, where 10,000+ readers come every day to learn about the people &amp; ideas shaping the products we love.</strong></p>
                         <p><Link to="http://blog.usejournal.com" rel="noopener"><strong>Follow our publication</strong></Link><strong> to see more product &amp; design stories featured by the </strong><Link to="https://usejournal.com/?/utm_source=usejournal.com&amp;utm_medium=blog&amp;utm_campaign=guest_post&amp;utm_content=john_gruber" rel="noopener"><strong>Journal</strong></Link><strong> team.</strong></p>
                      </div>
                   </div>
                  </section>
                </Col>
              </Row>
            </Container>
          </div>
        </main>
      </Page>
    )
  }
}

export default BlogArticle
