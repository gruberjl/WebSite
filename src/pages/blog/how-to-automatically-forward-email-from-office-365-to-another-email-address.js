import * as React from "react"
import Page from '../../components/page'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
 
class BlogArticle extends React.Component {
  render() {
    const title = "How to Automatically Forward Email from Office 365 to another Email Address"
    const jsonLd = {
      headline: title,
      datePublished: '01-11-2018',
      keywords: [
        "email",
        "Productivity",
        "Outlook",
        "Office 365"
      ],
      "author": {
        "@type": "Person",
        "name": "John Gruber",
        url: 'https://medium.com/@gruberjl'
      }
    }

    return (
      <Page jsonLdType={'BlogPosting'} jsonLd={jsonLd} image={'https://miro.medium.com/max/700/1*hb1dnishAsWeJQHytvH7Cg.png'} canonical={'https://medium.com/gitbit/how-to-automatically-forward-email-from-office-365-to-another-email-address-9ba6de6ea3a9'} title={title} description={"Email forwarding refers to manually or automatically re-sending an email message delivered to one email address to one or more other addresses. Email forwarding is an ambiguous term that references…"}>
        <main>
          <div>
            <Container className="blog-article">
              <Row>
                <Col>
                  <h1>How to Automatically Forward Email from Office 365 to another Email Address</h1>
                  <p>Email forwarding refers to manually or automatically re-sending an email message delivered to one email address to one or more other addresses. Email forwarding is an ambiguous term that references <strong>server-based</strong> and <strong>client-based</strong> forwarding.</p>
                  <p>IT administrators can configure <strong>Server based forwarding</strong> from the server or the back-end. This grants administrators the ability to forward email sent to anyone within the company even though the administrator doesn’t have access to the mailbox. Server based forwarding can also be used to forward email from multiple email addresses at the same time. For example, the user sally can forward her email but cannot forward her colleague Bob’s email. An administrator can use server-based forwarding to forward emails sent to Sally and Bob to another mailbox.</p>
                  <p>User’s can configure their own<strong> Client-based forwarding</strong> rules through OWA or Outlook. User’s have the ability to configure client based forwarding for their own mailboxes. Office 365 allows a user to create ‘Outlook Rules’ which allow automated actions based on explicit criteria. If leaving on vacation for a couple of weeks a user may want to forward all emails to a colleague. That colleague can then setup their own rule to automatically put all your forwarded emails into the trash ;)! Using criteria, or filters, a user can limit the amount of email messages the receipt receives. Filters are a great way to forward emails only from a specific client or only emails relating to a specific project. Rules are a powerful way to help manage your inbox and collaborate without wasting time.</p>
                  <h2>How to automatically forward all incoming emails using Outlook 2016</h2>
                  <p>Open your <strong>Outlook Inbox</strong>. From the <strong>Home </strong>ribbon click <strong>Rules </strong>-&gt; <strong>Create Rule…</strong></p>
                  <figure>
                   <div role="button" tabIndex="0">
                      <div>
                         <div>
                            <div>
                               <div></div>
                               <img alt="Outlook rules" width="700" height="189" role="presentation" src="https://miro.medium.com/max/700/1*hb1dnishAsWeJQHytvH7Cg.png" sizes="700px" srcSet="https://miro.medium.com/max/276/1*hb1dnishAsWeJQHytvH7Cg.png 276w, https://miro.medium.com/max/552/1*hb1dnishAsWeJQHytvH7Cg.png 552w, https://miro.medium.com/max/640/1*hb1dnishAsWeJQHytvH7Cg.png 640w, https://miro.medium.com/max/700/1*hb1dnishAsWeJQHytvH7Cg.png 700w"/>
                            </div>
                         </div>
                      </div>
                   </div>
                  </figure>
                  <p>From the Create Rule pop-up, click <strong>Advanced Options…</strong></p>
                  <figure>
                   <div>
                      <div>
                         <div>
                            <div></div>
                            <img alt="Outlook rules advanced options" width="368" height="238" role="presentation" src="https://miro.medium.com/max/368/1*3mdoVihTUS4F_E2CkroQ9g.png" sizes="368px" srcSet="https://miro.medium.com/max/276/1*3mdoVihTUS4F_E2CkroQ9g.png 276w, https://miro.medium.com/max/368/1*3mdoVihTUS4F_E2CkroQ9g.png 368w"/>
                         </div>
                      </div>
                   </div>
                  </figure>
                  <p>From the Rules Wizard page labeled ‘Which conditions do you want to check?’ you can <em>set your criteria for the forwarding rules</em>. If you only wanted to forward some messages, use this page to configure the filters. If you want to forward all emails, leave this page blank and click <strong>Next</strong>.</p>
                  <figure>
                   <div>
                      <div>
                         <div>
                            <div></div>
                            <img alt="Outlook rules wizard conditions" width="374" height="462" role="presentation" src="https://miro.medium.com/max/374/1*9T0tHPxPbQ-sHmjbVbt-hA.png" sizes="374px" srcSet="https://miro.medium.com/max/276/1*9T0tHPxPbQ-sHmjbVbt-hA.png 276w, https://miro.medium.com/max/374/1*9T0tHPxPbQ-sHmjbVbt-hA.png 374w"/>
                         </div>
                      </div>
                   </div>
                  </figure>
                  <p>From the ‘What do you want to do with the message?’ page: click the check next to <strong>forward it to people or public group</strong>. Then click <strong>people or public group</strong> and select the person you’d like to forward the email too. Click <strong>Next</strong>.</p>
                  <figure>
                   <div>
                      <div>
                         <div>
                            <div></div>
                            <img alt="Outlook rules wizard forward mail to" width="501" height="618" role="presentation" src="https://miro.medium.com/max/501/1*fuy2-ZbGph4CnF_RcP6HcA.png" sizes="501px" srcSet="https://miro.medium.com/max/276/1*fuy2-ZbGph4CnF_RcP6HcA.png 276w, https://miro.medium.com/max/501/1*fuy2-ZbGph4CnF_RcP6HcA.png 501w"/>
                         </div>
                      </div>
                   </div>
                  </figure>
                  <p>From the ‘Are there any exceptions?’ page you can create filters to make exclusions to the rule. This is a great place to exclude your mom’s emails, and Jeff’s daily cat videos. If you don’t have any exceptions click <strong>Next</strong>.</p>
                  <figure>
                   <div>
                      <div>
                         <div>
                            <div></div>
                            <img alt="Outlook rules wizard exceptions" width="503" height="622" role="presentation" src="https://miro.medium.com/max/503/1*DgFln4iNSmfOfoQqF3j8_w.png" sizes="503px" srcSet="https://miro.medium.com/max/276/1*DgFln4iNSmfOfoQqF3j8_w.png 276w, https://miro.medium.com/max/503/1*DgFln4iNSmfOfoQqF3j8_w.png 503w"/>
                         </div>
                      </div>
                   </div>
                  </figure>
                  <p>On the last step you can give the new rule a new and click <strong>Finish</strong>.</p>
                  <figure>
                   <div>
                      <div>
                         <div>
                            <div></div>
                            <img alt="Outlook rules wizard finish setup" width="506" height="623" role="presentation" src="https://miro.medium.com/max/506/1*8olBJAW_xfdVByYJx9eGtQ.png" sizes="506px" srcSet="https://miro.medium.com/max/276/1*8olBJAW_xfdVByYJx9eGtQ.png 276w, https://miro.medium.com/max/506/1*8olBJAW_xfdVByYJx9eGtQ.png 506w"/>
                         </div>
                      </div>
                   </div>
                  </figure>
                  <h2>How to delete a forward rule in Outlook</h2>
                  <p>Once your back in action, you’ll need to delete your new rule.</p>
                  <p>Open your Outlook inbox. Using the <strong>Home </strong>ribbon click <strong>Rules</strong> -&gt; <strong>Manage Rules &amp; Alerts…</strong></p>
                  <figure>
                   <div role="button" tabIndex="0">
                      <div>
                         <div>
                            <div>
                               <div></div>
                               <img alt="Outlook manage rules" width="700" height="282" role="presentation" src="https://miro.medium.com/max/700/1*daPl6CkFlDBx65JniXYM7A.png" sizes="700px" srcSet="https://miro.medium.com/max/276/1*daPl6CkFlDBx65JniXYM7A.png 276w, https://miro.medium.com/max/552/1*daPl6CkFlDBx65JniXYM7A.png 552w, https://miro.medium.com/max/640/1*daPl6CkFlDBx65JniXYM7A.png 640w, https://miro.medium.com/max/700/1*daPl6CkFlDBx65JniXYM7A.png 700w"/>
                            </div>
                         </div>
                      </div>
                   </div>
                  </figure>
                  <p>Highlight the rule you want to delete and click <strong>Delete</strong>. Once you confirm you want to delete the rule, click<strong> OK.</strong></p>
                  <figure>
                   <div>
                      <div>
                         <div>
                            <div></div>
                            <img alt="Outlook rules > Delete" width="563" height="480" role="presentation" src="https://miro.medium.com/max/563/1*n_BQTwbA5cLSnvAOHKaC7g.png" sizes="563px" srcSet="https://miro.medium.com/max/276/1*n_BQTwbA5cLSnvAOHKaC7g.png 276w, https://miro.medium.com/max/552/1*n_BQTwbA5cLSnvAOHKaC7g.png 552w, https://miro.medium.com/max/563/1*n_BQTwbA5cLSnvAOHKaC7g.png 563w"/>
                         </div>
                      </div>
                   </div>
                  </figure>
                  <p>You’re back in action!</p>
                  <h2>How to automatically forward all incoming emails using Office 365’s OWA</h2>
                  <p>If you don’t use Outlook you’ll need to use OWA to create the mail rules.</p>
                  <p>Go to mail.office365.com and sign in.</p>
                  <p>Click the <strong>Gear </strong>in the top right to open your settings. Type <strong>rules </strong>in the search and click <strong>Inbox rules</strong>.</p>
                  <figure>
                   <div>
                      <div>
                         <div>
                            <div></div>
                            <img alt="Microsoft 365 OWA Inbox Rules" width="387" height="309" role="presentation" src="https://miro.medium.com/max/387/1*_wdrfyvWCzL9kdtArAodJg.png" sizes="387px" srcSet="https://miro.medium.com/max/276/1*_wdrfyvWCzL9kdtArAodJg.png 276w, https://miro.medium.com/max/387/1*_wdrfyvWCzL9kdtArAodJg.png 387w"/>
                         </div>
                      </div>
                   </div>
                  </figure>
                  <p>Click the <strong>plus sign </strong>to create a new rule.</p>
                  <figure>
                   <div>
                      <div>
                         <div>
                            <div></div>
                            <img alt="Microsoft 365 OWA Inbox Rules create rule" width="430" height="378" role="presentation" src="https://miro.medium.com/max/430/1*D5jFngq78I3NqdpM2VTcww.png" sizes="430px" srcSet="https://miro.medium.com/max/276/1*D5jFngq78I3NqdpM2VTcww.png 276w, https://miro.medium.com/max/430/1*D5jFngq78I3NqdpM2VTcww.png 430w"/>
                         </div>
                      </div>
                   </div>
                  </figure>
                  <p>Give your new rule a new and select <strong>Forward the message to..</strong> in the <strong>Do all of the following</strong> drop down box.</p>
                  <figure>
                   <div>
                      <div>
                         <div>
                            <div></div>
                            <img alt="Microsoft 365 OWA Inbox Rules forward the message to" width="497" height="601" role="presentation" src="https://miro.medium.com/max/497/1*28up6UtzHnXwBgPDFRiUTQ.png" sizes="497px" srcSet="https://miro.medium.com/max/276/1*28up6UtzHnXwBgPDFRiUTQ.png 276w, https://miro.medium.com/max/497/1*28up6UtzHnXwBgPDFRiUTQ.png 497w"/>
                         </div>
                      </div>
                   </div>
                  </figure>
                  <p>Select a person from your contacts. and save your new rule.</p>
                  <h2>How to delete a forward rule in OWA</h2>
                  <p>Go to mail.office365.com and sign in.</p>
                  <p>Click the <strong>Gear </strong>in the top right to open your settings. Type <strong>rules </strong>in the search and click <strong>Inbox rules</strong>.</p>
                  <figure>
                   <div>
                      <div>
                         <div>
                            <div></div>
                            <img alt="Microsoft 365 OWA Inbox Rules" width="387" height="309" role="presentation" src="https://miro.medium.com/max/387/1*_wdrfyvWCzL9kdtArAodJg.png" sizes="387px" srcSet="https://miro.medium.com/max/276/1*_wdrfyvWCzL9kdtArAodJg.png 276w, https://miro.medium.com/max/387/1*_wdrfyvWCzL9kdtArAodJg.png 387w"/>
                         </div>
                      </div>
                   </div>
                  </figure>
                  <p>Highlight the rule you want to delete and click the trash can. Easy as pie!</p>
                  <h2>More Rule Tips</h2>
                  <p>There are a ton of options to automate your inbox with rules. Below is a quick list of the most common:</p>
                  <ol>
                   <li>Automatically move newsletters to a sub folder to be read later.</li>
                   <li>Play a special sound when you receive an email from your boss or an important client.</li>
                   <li>Display an alert when a message is marked high priority.</li>
                   <li>Have the server automatically reply with a a drafted email.</li>
                   <li>Automatically archive emails that are standard notifications.</li>
                  </ol>
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
