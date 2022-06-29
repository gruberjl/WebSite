import * as React from "react"
import Page from '../../components/page'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
 
class BlogArticle extends React.Component {
  render() {
    const title = "Reset Passwords in Office 365. How to reset passwords in Office 365"
    const jsonLd = {
      headline: title,
      datePublished: '12-13-2018',
      keywords: [
        "Microsoft",
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
      <Page jsonLdType={'BlogPosting'} jsonLd={jsonLd} image={'https://miro.medium.com/max/588/1*N58qbHvqifsYw3wm4Fv_6A.png'} canonical={'https://medium.com/gitbit/reset-passwords-in-office-365-e46ea75ee88'} title={title} description={"Like most IT services and applications Office 365 is secured with passwords. People will occasionally forget their password and a reset will be required. Since every organization has different needs…"}>
        <main>
          <div>
            <Container className="blog-article">
              <Row>
                <Col>
                  <h1>Reset Passwords in Office 365</h1>
                  <figure>
                   <div><img alt="Reset Passwords in Office 365" src="https://miro.medium.com/max/588/1*N58qbHvqifsYw3wm4Fv_6A.png" width="588" height="546" role="presentation"/></div>
                  </figure>
                  <p>Like most IT services and applications Office 365 is secured with passwords. People will occasionally forget their password and a reset will be required. Since every organization has different needs and requirements Microsoft has provided us with a number of options for resetting passwords.</p>
                  <p>1. You can enable self-service password reset and your employees can reset their own password.</p>
                  <p>2. An Office 365 administrator can open the Microsoft 365 portal and reset a user’s password.</p>
                  <p>3. A password can be reset in your on-premise Active Directory and then synced to Office 365.</p>
                  <p>4. An administrator can create a password reset PowerShell script to make password resets fast and easy for their entire IT staff.</p>
                  <p><em>Depending on your organization’s configuration your options may be limited.</em></p>
                  <h2>Self-Service Password Reset</h2>
                  <p><mark>Office 365 global administrators can enable self-service password reset for their organization.</mark> Unfortunately, if your organization is syncing users from your on-premise Active Directory you will have to purchase a paid subscription to Azure AD premium. Azure AD Premium is not required for cloud only users and there is no additional cost.</p>
                  <h2>How to Enable Self-Service Password Reset for your Organization</h2>
                  <p>Self-service password reset has a couple of advantages. First, it reduces the number of help desk tickets your IT staff will receive because users become more self-sufficient. Secondly, while a user is waiting for IT to reset their password, they may be unable to complete their duties decreasing productivity. Finally, most people prefer being self-sufficient.</p>
                  <p>Before you can start using self-service password reset a global admin will need to enable it for your Office 365 tenant:</p>
                  <p>1. Log on to <a href="https://aad.portal.azure.com" rel="noopener">https://aad.portal.azure.com</a></p>
                  <p>2. Click <strong>Azure Active Directory</strong> in the left navigation pane.</p>
                  <p>3. Click <strong>Password Reset</strong> in the secondary navigation pane.</p>
                  <p>4. Click <strong>All</strong> then click <strong>Save</strong>.</p>
                  <h2>Adding Contact Information per User</h2>
                  <p>Once the self-service password reset is enabled across your organization users will need to provide Microsoft with additional contact information. After a user logs on to <a href="https://portal.office.com" rel="noopener">https://portal.office.com</a> they will be prompted add and verify a phone number, as well as, an email address.</p>
                  <p>Below is a pre-written email you can send to your users to inform them of the change.</p>
                  <div role="separator"><span></span><span></span><span></span></div>
                  <section>
                   <div>
                      <div>
                         <p>Hello, we have enabled self-service password reset for Office 365. Before you can reset your password, you’ll need to provide an additional email and mobile phone. Your contact information will be kept secure and used for resetting your password.</p>
                         <p>To enable self-service password reset follow the instructions below:</p>
                         <p>1. Go to <a href="https://portal.office.com/" rel="noopener">https://portal.office.com/</a> and log on with your Office 365 credentials.</p>
                         <p>2. When prompted for “More information required” click <strong>Next</strong>.</p>
                         <figure>
                            <div><img alt="Microsoft 365 More information required" src="https://miro.medium.com/max/376/1*MIATfgCPfgsEhYWtLdeR1A.png" width="376" height="306" role="presentation"/></div>
                         </figure>
                         <p>3. Click <strong>Set it up now</strong> next to Authentication Phone.</p>
                         <figure>
                            <div>
                               <div>
                                  <div>
                                     <div></div>
                                     <img alt="Microsoft 365 don't lose access to your account" width="431" height="265" role="presentation" src="https://miro.medium.com/max/431/1*QCG3iyKWAnqK7iz5ixaffg.png" sizes="431px" srcSet="https://miro.medium.com/max/276/1*QCG3iyKWAnqK7iz5ixaffg.png 276w, https://miro.medium.com/max/431/1*QCG3iyKWAnqK7iz5ixaffg.png 431w"/>
                                  </div>
                               </div>
                            </div>
                         </figure>
                         <p>4. Select your country, type your mobile phone number, then click text me.</p>
                         <figure>
                            <div>
                               <div>
                                  <div>
                                     <div></div>
                                     <img alt="Microsoft 365 MFA setup text messages" width="415" height="287" role="presentation" src="https://miro.medium.com/max/415/1*Y0Zcdyt8MZe_cq2I0Mzgkw.png" sizes="415px" srcSet="https://miro.medium.com/max/276/1*Y0Zcdyt8MZe_cq2I0Mzgkw.png 276w, https://miro.medium.com/max/415/1*Y0Zcdyt8MZe_cq2I0Mzgkw.png 415w"/>
                                  </div>
                               </div>
                            </div>
                         </figure>
                         <p>5. Wait for the text message then enter the verification number in the provided text box. Click <strong>Verify</strong>.</p>
                         <figure>
                            <div>
                               <div>
                                  <div>
                                     <div></div>
                                     <img alt="Microsoft 365 MFA setup text message verify phone" width="495" height="363" role="presentation" src="https://miro.medium.com/max/495/1*KI-pOuralnTpszgpTswj5g.png" sizes="495px" srcSet="https://miro.medium.com/max/276/1*KI-pOuralnTpszgpTswj5g.png 276w, https://miro.medium.com/max/495/1*KI-pOuralnTpszgpTswj5g.png 495w"/>
                                  </div>
                               </div>
                            </div>
                         </figure>
                         <p>6. Perform steps 3–5 for your email address.</p>
                         <p>7. Once your phone number and email address are verified click Finish.</p>
                         <figure>
                            <div>
                               <div>
                                  <div>
                                     <div></div>
                                     <img alt="Once you’ve completed the configuration you can reset your password" width="624" height="225" role="presentation" src="https://miro.medium.com/max/624/1*Nfsam6-BNJersbMKIYswcQ.png" sizes="624px" srcSet="https://miro.medium.com/max/276/1*Nfsam6-BNJersbMKIYswcQ.png 276w, https://miro.medium.com/max/552/1*Nfsam6-BNJersbMKIYswcQ.png 552w, https://miro.medium.com/max/624/1*Nfsam6-BNJersbMKIYswcQ.png 624w"/>
                                  </div>
                               </div>
                            </div>
                         </figure>
                         <p>Once you’ve completed the configuration you can reset your password by going to <a href="https://passwordreset.microsoftonline.com/" rel="noopener">https://passwordreset.microsoftonline.com/</a></p>
                      </div>
                   </div>
                  </section>
                  <div role="separator"><span></span><span></span><span></span></div>
                  <section>
                   <div>
                      <div>
                         <p>Memos and emails are often missed by all of us. Train your IT staff to help the user configure self-service password reset every time they receive a password reset ticket.</p>
                         <h2>Reporting on Users who Configured Password Reset</h2>
                         <p>An Office 365 admin can review Azure AD’s audit logs to verify users are adding contact information and enabling self-service password reset.</p>
                         <p>1. Login to <a href="https://aad.portal.azure.com" rel="noopener">https://aad.portal.azure.com</a></p>
                         <p>2. Click <strong>Azure Active Directory</strong> in the left navigation pane.</p>
                         <p>3. Click <strong>Audit Logs</strong> in the secondary navigation pane.</p>
                         <p>4. In the Activity filter type <strong>User completed security info registration for self-service password reset</strong>.</p>
                         <p>5. Click <strong>Apply</strong>.</p>
                         <p>From the audit log, you will have a complete list of everyone who completed the self-service password reset. You can download and export the data for easier management.</p>
                         <h2>How Administrators can Reset a User’s Password</h2>
                         <p>Administrators can reset a password on behalf of the user.</p>
                         <p>If you’re syncing the user from on-premise Active Directory an administrator can open Active Directory Users and Computers and perform a standard password reset. AD Connect syncs passwords every 2 minutes but there may be additional delays depending on your Active Directory’s site configuration.</p>
                         <p>If the user is not being synced from on-premise Active Directory, an admin can log in to <a href="https://admin.microsoft.com" rel="noopener">https://admin.microsoft.com</a> &gt; Users &gt; Active Users &gt; find and select the user &gt; Click Reset Password.</p>
                         <figure>
                            <div>
                               <div>
                                  <div>
                                     <div></div>
                                     <img alt="Microsoft 365 screenshot" width="624" height="338" role="presentation" src="https://miro.medium.com/max/624/1*qQaT-qrGZEbIBRUQqT1ctA.png" sizes="624px" srcSet="https://miro.medium.com/max/276/1*qQaT-qrGZEbIBRUQqT1ctA.png 276w, https://miro.medium.com/max/552/1*qQaT-qrGZEbIBRUQqT1ctA.png 552w, https://miro.medium.com/max/624/1*qQaT-qrGZEbIBRUQqT1ctA.png 624w"/>
                                  </div>
                               </div>
                            </div>
                         </figure>
                         <h2>Password Reset PowerShell Script</h2>
                         <p>If you’re acting staff is comfortable with power shell you can run the below script to quickly reset passwords.</p>
                         <pre><span>Param(</span><span>  [Parameter(Mandatory=$True, Position=1)]<br/>  [string]$AdminUsername,</span><span>  [Parameter(Mandatory=$True, Position=2)]<br/>  [string]$AdminPassword,</span><span>  [Parameter(Mandatory=$True, Position=3)]<br/>  [string]$User,</span><span>  [switch]$ForceChangePassword<br/>)</span><span>Write-Host “Connecting to Office 365” -ForegroundColor Cyan</span><span>$encryptedPassword = ConvertTo-SecureString -AsPlainText -Force -String $AdminPassword</span><span>$cred = New-Object -typename System.Management.Automation.PSCredential -argumentlist $AdminUsername, $encryptedPassword</span><span>Connect-MSOLService -Credential $cred -WarningAction SilentlyContinue -InformationAction SilentlyContinue</span><span>Write-Host “Restting $User’s Password to” -ForegroundColor Cyan<br/>$Assembly = Add-Type -AssemblyName System.Web<br/>$NewPassword = [System.Web.Security.Membership]::GeneratePassword(10,0)</span><span>Set-MsolUserPassword -UserPrincipalName $User -NewPassword $NewPassword -ForceChangePassword $ForceChangePassword.IsPresent</span></pre>
                         <figure>
                            <div>
                               <div>
                                  <div>
                                     <div></div>
                                     <img alt="Microsoft 365 Reset password PowerShell script" width="624" height="76" role="presentation" src="https://miro.medium.com/max/624/1*eCOcB8zo3c12h6LwwOO4gQ.png" sizes="624px" srcSet="https://miro.medium.com/max/276/1*eCOcB8zo3c12h6LwwOO4gQ.png 276w, https://miro.medium.com/max/552/1*eCOcB8zo3c12h6LwwOO4gQ.png 552w, https://miro.medium.com/max/624/1*eCOcB8zo3c12h6LwwOO4gQ.png 624w"/>
                                  </div>
                               </div>
                            </div>
                         </figure>
                         <p>The script has 4 parameters. The first and second are the administrator's username and password which is required to authenticate to Office 365. The third parameter is the user's primary email address. The fourth parameter is optional and can be used if you want to require the user to reset the password after their first login.</p>
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
