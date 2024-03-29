import * as React from "react"
import Page from '../../components/page'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
 
class BlogArticle extends React.Component {
  render() {
    const title = "Connect PowerShell to Exchange Online"
    const jsonLd = {
      headline: title,
      datePublished: '10-19-2018',
      keywords: [
        "Microsoft",
        "Microsoft Exchange Online",
        "Microsoft 365",
        "Office 365",
        "PowerShell"
      ],
      "author": {
        "@type": "Person",
        "name": "John Gruber",
        url: 'https://medium.com/@gruberjl'
      }
    }

    return (
      <Page jsonLdType={'BlogPosting'} jsonLd={jsonLd} image={'https://miro.medium.com/max/700/1*CLmyTy4bL13Rd2fZ12529Q.png'} canonical={'https://medium.com/gitbit/connect-powershell-to-exchange-online-8e2defe23ce0'} title={title} description={"Office 365 is a suite of clouds and services bundled into one package. Connecting to Exchange Online’s PowerShell will allow you to manage the email portion of your Office 365 tenant."}>
        <main>
          <div>
            <Container className="blog-article">
              <Row>
                <Col>
                <h1>Connect PowerShell to Exchange Online</h1>
                <figure>
                 <div><img alt="Connect to Exchange Online via PowerShell" src="https://miro.medium.com/max/700/1*CLmyTy4bL13Rd2fZ12529Q.png" width="700" height="325" role="presentation"/></div>
                 <figcaption>Connect to Exchange Online via PowerShell</figcaption>
                </figure>
                <h2>What’s Exchange Online?</h2>
                <p>Exchange Online is Microsoft’s hosted email for businesses. It’s the industry-leading cloud solution adopted by small businesses and fortune 500 companies. Microsoft Exchange Online provides the benefits of a cloud-based email service with the robust capabilities of an on-premises server deployment. Simply put, Microsoft will store, manage, and secure your businesses email for a low monthly cost. If you don’t find Exchange Online <a href="https://microsoft-us.evyy.net/c/1313195/190407/3327" rel="noopener">click here to view the Office 365 plans</a>.</p>
                <h2>What’s PowerShell?</h2>
                <p>“Windows PowerShell is a Windows command-line shell designed especially for system administrators. Windows PowerShell includes an interactive prompt and a scripting environment that can be used independently or in combination.</p>
                <p>Unlike most shells, which accept and return text, Windows PowerShell is built on top of the .NET Framework common language runtime (CLR) and the .NET Framework, and accepts and returns .NET Framework objects. This fundamental change in the environment brings entirely new tools and methods to the management and configuration of Windows.”</p>
                <p>PowerShell can be accessed on most modern Windows computers by using the taskbar and searching for <strong>PowerShell</strong>.</p>
                <h2>What’s Exchange Online’s PowerShell?</h2>
                <p>Office 365 is a suite of clouds and services bundled into one package. Connecting to Exchange Online’s PowerShell will allow you to manage the email portion of your Office 365 tenant. You’ll need to connect to a different cloud service to access other portions of your Office 365 tenant.</p>
                <h2>One-Time Setup</h2>
                <ol>
                   <li>To require all PowerShell scripts that you download from the internet are signed by a trusted publisher, run the following command in an elevated Windows PowerShell window (a Windows PowerShell window you open by selecting Run as administrator):</li>
                </ol>
                <pre><span>Set-ExecutionPolicy RemoteSigned</span></pre>
                <p>2. Download the following script: <a href="https://gitbit-my.sharepoint.com/:u:/g/personal/john_gruber_gitbit_org/EbNkh3EwZIZItiJ7PgPboK8B5qjvhoUuulBhhmDS8QCP8Q?e=J6as9F" rel="noopener">Connect-ExchangeOnline</a>.</p>
                <p>3. Unblock the script by right-clicking and clicking <strong>Unblock &gt; Apply</strong>.</p>
                <figure>
                   <div>
                      <div>
                         <div>
                            <div></div>
                            <img alt="Connect-ExchangeOnline Powershell Properties" width="363" height="509" role="presentation" src="https://miro.medium.com/max/363/1*lf2JaqeicYeLxqFLzRZFcQ.png" sizes="363px" srcSet="https://miro.medium.com/max/276/1*lf2JaqeicYeLxqFLzRZFcQ.png 276w, https://miro.medium.com/max/363/1*lf2JaqeicYeLxqFLzRZFcQ.png 363w"/>
                         </div>
                      </div>
                   </div>
                </figure>
                <h2>How to Connect to Exchange Online PowerShell</h2>
                <p>The script can be ran two different ways. You can run the script with the username and password directly inline or run the script without parameters and the PowerShell script will prompt for username and password.</p>
                <h3>Option 1: Run script with username and password inline</h3>
                <pre><span>.\Connect-ExchangeOnline.ps1 <a href="mailto:AdminUser@domain.com" rel="noopener">AdminUser@domain.com</a> AdminPassword123</span></pre>
                <h3>Option 2: Run script with username and password prompt</h3>
                <pre><span>.\Connect-ExchangeOnline.ps1</span></pre>
                <figure>
                   <div role="button" tabIndex="0">
                      <div>
                         <div>
                            <div>
                               <div></div>
                               <img alt="connecting to exchange online via PowerShell" width="700" height="326" role="presentation" src="https://miro.medium.com/max/700/1*CLmyTy4bL13Rd2fZ12529Q.png" sizes="700px" srcSet="https://miro.medium.com/max/276/1*CLmyTy4bL13Rd2fZ12529Q.png 276w, https://miro.medium.com/max/552/1*CLmyTy4bL13Rd2fZ12529Q.png 552w, https://miro.medium.com/max/640/1*CLmyTy4bL13Rd2fZ12529Q.png 640w, https://miro.medium.com/max/700/1*CLmyTy4bL13Rd2fZ12529Q.png 700w"/>
                            </div>
                         </div>
                      </div>
                   </div>
                </figure>
                <h2>How to Disconnect from Exchange Online PowerShell</h2>
                <p>To disconnect the session you can close the PowerShell window and the session will expire or run the script with the disconnect switch.</p>
                <pre><span>.\Connect-ExchangeOnline.ps1 -disconnect</span></pre>
                <figure>
                   <div role="button" tabIndex="0">
                      <div>
                         <div>
                            <div>
                               <div></div>
                               <img alt="disconnecting from Exchange Online PowerShell" width="700" height="326" role="presentation" src="https://miro.medium.com/max/700/1*UGbJYC0m10cBLDSu76cidg.png" sizes="700px" srcSet="https://miro.medium.com/max/276/1*UGbJYC0m10cBLDSu76cidg.png 276w, https://miro.medium.com/max/552/1*UGbJYC0m10cBLDSu76cidg.png 552w, https://miro.medium.com/max/640/1*UGbJYC0m10cBLDSu76cidg.png 640w, https://miro.medium.com/max/700/1*UGbJYC0m10cBLDSu76cidg.png 700w"/>
                            </div>
                         </div>
                      </div>
                   </div>
                </figure>
                <div role="separator"><span></span><span></span><span></span></div>
                <section>
                   <div>
                      <div>
                         <p>You’re now connected and can manage Exchange Online using PowerShell. The script will import the commands you can run. <a href="https://docs.microsoft.com/en-us/powershell/module/exchange/mailboxes/get-mailbox?view=exchange-ps" rel="noopener">Microsoft has great documentation for each command</a>. The easiest way to find the commands is Google.</p>
                         <p>For example, to get the mailboxes you run the following:</p>
                         <pre><span>Get-Mailbox</span></pre>
                         <p>Follow me on Medium for more Office 365 information.</p>
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
