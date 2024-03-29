import * as React from "react"
import Page from '../../components/page'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
 
class BlogArticle extends React.Component {
  render() {
    const title = "Office 365 + AD Connect: Manage Groups"
    const jsonLd = {
      headline: title,
      datePublished: '12-11-2018',
      keywords: [
        "Microsoft",
        "Groups",
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
      <Page jsonLdType={'BlogPosting'} jsonLd={jsonLd} image={'https://miro.medium.com/max/413/1*IBbrUL22opQi9V33U0hCYQ.png'} canonical={'https://medium.com/gitbit/office-365-ad-connect-manage-groups-afe539ca017f'} title={title} description={"If you are using Office 365 with AD Connect your groups are probably in your on-premise Active Directory. If your groups are being synced from your own premises Active Directory, you won’t be able to…"}>
        <main>
          <div>
            <Container className="blog-article">
              <Row>
                <Col>
                  <h1>Office 365 + AD Connect: Manage Groups</h1>
                  <p><mark>If you are using Office 365 with AD Connect</mark> y<mark>our groups are probably in your on-premise Active Directory.</mark> If your groups are being synced from your own premises Active Directory, you won’t be able to manage them from the office 365.</p>
                  <p>You may run into the following error:</p>
                  <blockquote>
                   <p>The action ‘Set-DistributionGroup’, can’t be performed on the object because the object is being synchronized from your on-premises organization. This action should be performed on the object in your on-premises organization.</p>
                  </blockquote>
                  <p>This error occurs because Office 365 objects have a <strong>source of authority</strong>. in short, If Microsoft allows you to edit the attributes in Office 365, they would be quickly overwritten during the next AD connect sync. Instead of using the Office 365 administrative centers will need to edit the attributes in Active Directory.</p>
                  <p>Below is a list of Active Directory attributes that are synced to Office 365. use this list to help find the attributes that need to be edited.</p>
                  <figure>
                   <div>
                      <div><iframe title='Chart of AD attributes and description' src="https://medium.com/media/ef94e525f5e671e27b5eaabf4d58be15" allowfullscreen="" frameborder="0" height="1525" width="680" scrolling="auto"></iframe></div>
                   </div>
                  </figure>
                  <h2>Finding Attributes in Active Directory Users &amp; Computers</h2>
                  <p>If you don’t have exchange on-premise but you using AD Connect you’ll need to edit the Active Directory attributes directly. the easiest way is to enable <strong>Advanced Features</strong> in Active Directory users and computers then use the attribute editor in the group properties.</p>
                  <ol>
                   <li>Open Active Directory Users &amp; Computers</li>
                   <li>View &gt; Advanced Features</li>
                  </ol>
                  <figure>
                   <div>
                      <div>
                         <div>
                            <div></div>
                            <img alt="How to enable Advanced Features in Active Directory Users &amp; Computers" width="464" height="263" role="presentation" src="https://miro.medium.com/max/464/1*fKR1HpjWQG2jwIye6D9C-w.png" sizes="464px" srcSet="https://miro.medium.com/max/276/1*fKR1HpjWQG2jwIye6D9C-w.png 276w, https://miro.medium.com/max/464/1*fKR1HpjWQG2jwIye6D9C-w.png 464w"/>
                         </div>
                      </div>
                   </div>
                   <figcaption>How to enable Advanced Features in Active Directory Users &amp; Computers</figcaption>
                  </figure>
                  <p>Once Advanced Features is enabled you’ll see an Attribute Editor tab in the group properties.</p>
                  <figure>
                   <div>
                      <div>
                         <div>
                            <div></div>
                            <img alt="Active Directory Users &amp; Computers attribute editor tab" width="413" height="479" role="presentation" src="https://miro.medium.com/max/413/1*IBbrUL22opQi9V33U0hCYQ.png" sizes="413px" srcSet="https://miro.medium.com/max/276/1*IBbrUL22opQi9V33U0hCYQ.png 276w, https://miro.medium.com/max/413/1*IBbrUL22opQi9V33U0hCYQ.png 413w"/>
                         </div>
                      </div>
                   </div>
                   <figcaption>Active Directory Users &amp; Computers attribute editor tab</figcaption>
                  </figure>
                  <h2>Attribute Information</h2>
                  <p>The following sections details restrictions put on the different attributes</p>
                  <h3>Display Name</h3>
                  <p>The display name should be a short and concise name for the group using an ASCII string<strong>.</strong></p>
                  <p><strong>How to edit the Display Name for cloud only groups</strong></p>
                  <p>Exchange Admin Center (EAC) &gt; recipients &gt; groups &gt; Double-click the group to edit &gt; general &gt; Display Name</p>
                  <figure>
                   <div role="button" tabIndex="0">
                      <div>
                         <div>
                            <div>
                               <div></div>
                               <img alt="Exchange Online display name highlighted" width="700" height="631" role="presentation" src="https://miro.medium.com/max/700/1*vnQl6oW3O8X_2EyEmEe1oA.png" sizes="700px" srcSet="https://miro.medium.com/max/276/1*vnQl6oW3O8X_2EyEmEe1oA.png 276w, https://miro.medium.com/max/552/1*vnQl6oW3O8X_2EyEmEe1oA.png 552w, https://miro.medium.com/max/640/1*vnQl6oW3O8X_2EyEmEe1oA.png 640w, https://miro.medium.com/max/700/1*vnQl6oW3O8X_2EyEmEe1oA.png 700w"/>
                            </div>
                         </div>
                      </div>
                   </div>
                  </figure>
                  <p><strong>How to edit the Display Name for groups synced from AD without Exchange on-premise</strong></p>
                  <p>Active Directory User &amp; Computers (ADUC) &gt; open the group properties &gt; Attribute Editor &gt; displayName</p>
                  <p><strong>How to edit the Display Name for groups synced from AD with Exchange on-premise</strong></p>
                  <p>Using the Exchange Management Shell</p>
                  <pre><span>Set-DistributionGroup -Identity GroupName -DisplayName ""</span></pre>
                  <h3>Alias</h3>
                  <p>The alias is used heavily behind the scenes for searches. Use a-z, periods, dashes, and underscores. No spaces. It must be unique across your organization.</p>
                  <p><strong>How to edit the Alias for cloud only groups</strong></p>
                  <p>Exchange Admin Center (EAC) &gt; recipients &gt; groups &gt; Double-click the group to edit &gt; general &gt; Alias</p>
                  <figure>
                   <div role="button" tabIndex="0">
                      <div>
                         <div>
                            <div>
                               <div></div>
                               <img alt="Exchange Online alias highlighted" width="700" height="631" role="presentation" src="https://miro.medium.com/max/700/1*Mxdx1Be8thNfAIOYALfayQ.png" sizes="700px" srcSet="https://miro.medium.com/max/276/1*Mxdx1Be8thNfAIOYALfayQ.png 276w, https://miro.medium.com/max/552/1*Mxdx1Be8thNfAIOYALfayQ.png 552w, https://miro.medium.com/max/640/1*Mxdx1Be8thNfAIOYALfayQ.png 640w, https://miro.medium.com/max/700/1*Mxdx1Be8thNfAIOYALfayQ.png 700w"/>
                            </div>
                         </div>
                      </div>
                   </div>
                  </figure>
                  <p><strong>How to edit the Alias for groups synced from AD without Exchange on-premise</strong></p>
                  <p>Active Directory User &amp; Computers (ADUC) &gt; open the group properties &gt; Attribute Editor &gt;mailNickname</p>
                  <p><strong>How to edit the Alias for groups synced from AD with Exchange on-premise</strong></p>
                  <p>Using the Exchange Management Shell</p>
                  <pre><span>Set-DistributionGroup -Identity GroupName -Alias ""</span></pre>
                  <h3>Primary Email address</h3>
                  <p><strong>How to edit the Primary Email Address for cloud only groups</strong></p>
                  <p>Exchange Admin Center (EAC) &gt; recipients &gt; groups &gt; Double-click the group to edit &gt; general &gt; Email Address</p>
                  <figure>
                   <div role="button" tabIndex="0">
                      <div>
                         <div>
                            <div>
                               <div></div>
                               <img alt="Exchange Online email address highlighted" width="700" height="631" role="presentation" src="https://miro.medium.com/max/700/1*9Sh5j0BXGIqdFKFVLUGA-g.png" sizes="700px" srcSet="https://miro.medium.com/max/276/1*9Sh5j0BXGIqdFKFVLUGA-g.png 276w, https://miro.medium.com/max/552/1*9Sh5j0BXGIqdFKFVLUGA-g.png 552w, https://miro.medium.com/max/640/1*9Sh5j0BXGIqdFKFVLUGA-g.png 640w, https://miro.medium.com/max/700/1*9Sh5j0BXGIqdFKFVLUGA-g.png 700w"/>
                            </div>
                         </div>
                      </div>
                   </div>
                  </figure>
                  <p><strong>How to edit the Primary Email Address for groups synced from AD without Exchange on-premise</strong></p>
                  <p>I recommend updating two fields at the same time:</p>
                  <p>Active Directory User &amp; Computers (ADUC) &gt; open the group properties &gt; Attribute Editor &gt; mail</p>
                  <p>Active Directory User &amp; Computers (ADUC) &gt; open the group properties &gt; Attribute Editor &gt; proxyAddresses</p>
                  <p>To set the proxyAddresses field append “SMTP:” to the beginning of the email address. the proxyAddresses may only have one email address that “SMTP:”</p>
                  <p><strong>How to edit the Primary Email Address for groups synced from AD with Exchange on-premise</strong></p>
                  <p>Use the Exchange Management Console for your on-premise server.</p>
                  <h3>Notes</h3>
                  <p><strong>How to edit the Notes for cloud only groups</strong></p>
                  <p>Exchange Admin Center (EAC) &gt; recipients &gt; groups &gt; Double-click the group to edit &gt; general &gt; Notes</p>
                  <figure>
                   <div role="button" tabIndex="0">
                      <div>
                         <div>
                            <div>
                               <div></div>
                               <img alt="Exchange Online email notes highlighted" width="700" height="631" role="presentation" src="https://miro.medium.com/max/700/1*-c9mLM_KZao3QjSGpHil6g.png" sizes="700px" srcSet="https://miro.medium.com/max/276/1*-c9mLM_KZao3QjSGpHil6g.png 276w, https://miro.medium.com/max/552/1*-c9mLM_KZao3QjSGpHil6g.png 552w, https://miro.medium.com/max/640/1*-c9mLM_KZao3QjSGpHil6g.png 640w, https://miro.medium.com/max/700/1*-c9mLM_KZao3QjSGpHil6g.png 700w"/>
                            </div>
                         </div>
                      </div>
                   </div>
                  </figure>
                  <p><strong>How to edit the Notes for groups synced from AD without Exchange on-premise</strong></p>
                  <p>Active Directory User &amp; Computers (ADUC) &gt; open the group properties &gt; Attribute Editor &gt; description</p>
                  <p><strong>How to edit the Notes for groups synced from AD with Exchange on-premise</strong></p>
                  <p>Use the Exchange Management Console for your on-premise server.</p>
                  <h3>Hide this group from address lists</h3>
                  <p><strong>How to edit the “Hide this group from address lists” for cloud only groups</strong></p>
                  <p>Exchange Admin Center (EAC) &gt; recipients &gt; groups &gt; Double-click the group to edit &gt; general &gt; Hide this group from address lists</p>
                  <figure>
                   <div role="button" tabIndex="0">
                      <div>
                         <div>
                            <div>
                               <div></div>
                               <img alt="Hide this group from address lists" width="700" height="631" role="presentation" src="https://miro.medium.com/max/700/1*_3qNm-0hByowaa9rRNYRxg.png" sizes="700px" srcSet="https://miro.medium.com/max/276/1*_3qNm-0hByowaa9rRNYRxg.png 276w, https://miro.medium.com/max/552/1*_3qNm-0hByowaa9rRNYRxg.png 552w, https://miro.medium.com/max/640/1*_3qNm-0hByowaa9rRNYRxg.png 640w, https://miro.medium.com/max/700/1*_3qNm-0hByowaa9rRNYRxg.png 700w"/>
                            </div>
                         </div>
                      </div>
                   </div>
                  </figure>
                  <p><strong>How to edit the “Hide this group from address lists” for groups synced from AD without Exchange on-premise</strong></p>
                  <p>Active Directory User &amp; Computers (ADUC) &gt; open the group properties &gt; Attribute Editor &gt; msExchHideFromAddressLists</p>
                  <p><strong>How to edit the “Hide this group from address lists” for groups synced from AD with Exchange on-premise</strong></p>
                  <p>Using the Exchange Management Shell</p>
                  <pre><span>Set-DistributionGroup -Identity GroupName -HiddenFromAddressListsEnabled &lt;$true | $false&gt;</span></pre>
                  <h3>Owners</h3>
                  <p><strong>How to edit the Owners for cloud only groups</strong></p>
                  <p>Exchange Admin Center (EAC) &gt; recipients &gt; groups &gt; Double-click the group to edit &gt; ownership &gt; Owners</p>
                  <figure>
                   <div role="button" tabIndex="0">
                      <div>
                         <div>
                            <div>
                               <div></div>
                               <img alt="How to edit the Owners for groups synced from AD without Exchange on-premise" width="700" height="631" role="presentation" src="https://miro.medium.com/max/700/1*yfmQnRNs5Z3ZBu9Et0sK6g.png" sizes="700px" srcSet="https://miro.medium.com/max/276/1*yfmQnRNs5Z3ZBu9Et0sK6g.png 276w, https://miro.medium.com/max/552/1*yfmQnRNs5Z3ZBu9Et0sK6g.png 552w, https://miro.medium.com/max/640/1*yfmQnRNs5Z3ZBu9Et0sK6g.png 640w, https://miro.medium.com/max/700/1*yfmQnRNs5Z3ZBu9Et0sK6g.png 700w"/>
                            </div>
                         </div>
                      </div>
                   </div>
                  </figure>
                  <p><strong>How to edit the Owners for groups synced from AD without Exchange on-premise</strong></p>
                  <p>The managedBy attribute is a user’s DN attribute. The DN attribute can be found in the user’s properties under the attribute editor tab.</p>
                  <p>Active Directory User &amp; Computers (ADUC) &gt; open the group properties &gt; Attribute Editor &gt; managedBy</p>
                  <p><strong>How to edit the Owners for groups synced from AD with Exchange on-premise</strong></p>
                  <p>Use the Exchange Management Console for your on-premise server.</p>
                  <h3>Members</h3>
                  <p><strong>How to edit the Members for cloud only groups</strong></p>
                  <p>Exchange Admin Center (EAC) &gt; recipients &gt; groups &gt; Double-click the group to edit &gt; membership &gt; members</p>
                  <figure>
                   <div role="button" tabIndex="0">
                      <div>
                         <div>
                            <div>
                               <div></div>
                               <img alt="How to edit the Members for groups synced from AD without Exchange on-premise" width="700" height="631" role="presentation" src="https://miro.medium.com/max/700/1*xiOfus7F_ZBxByjfBWs0vw.png" sizes="700px" srcSet="https://miro.medium.com/max/276/1*xiOfus7F_ZBxByjfBWs0vw.png 276w, https://miro.medium.com/max/552/1*xiOfus7F_ZBxByjfBWs0vw.png 552w, https://miro.medium.com/max/640/1*xiOfus7F_ZBxByjfBWs0vw.png 640w, https://miro.medium.com/max/700/1*xiOfus7F_ZBxByjfBWs0vw.png 700w"/>
                            </div>
                         </div>
                      </div>
                   </div>
                  </figure>
                  <p><strong>How to edit the Members for groups synced from AD without Exchange on-premise</strong></p>
                  <p>Active Directory User &amp; Computers (ADUC) &gt; open the group properties &gt; Members &gt; Add</p>
                  <p><strong>How to edit the Members for groups synced from AD with Exchange on-premise</strong></p>
                  <p>Use the Exchange Management Console for your on-premise server.</p>
                  <h3>Group Membership Permissions</h3>
                  <p><strong>How to edit the Group Membership Permissions for cloud only groups</strong></p>
                  <p>Exchange Admin Center (EAC) &gt; recipients &gt; groups &gt; Double-click the group to edit &gt; Membership approval &gt; choose whether owner approval is required to join the group</p>
                  <figure>
                   <div role="button" tabIndex="0">
                      <div>
                         <div>
                            <div>
                               <div></div>
                               <img alt="How to edit the Group Membership Permissions for groups synced from AD without Exchange on-premise" width="700" height="631" role="presentation" src="https://miro.medium.com/max/700/1*dQ9rMsxumMnD8W6YYSKyWw.png" sizes="700px" srcSet="https://miro.medium.com/max/276/1*dQ9rMsxumMnD8W6YYSKyWw.png 276w, https://miro.medium.com/max/552/1*dQ9rMsxumMnD8W6YYSKyWw.png 552w, https://miro.medium.com/max/640/1*dQ9rMsxumMnD8W6YYSKyWw.png 640w, https://miro.medium.com/max/700/1*dQ9rMsxumMnD8W6YYSKyWw.png 700w"/>
                            </div>
                         </div>
                      </div>
                   </div>
                  </figure>
                  <p><strong>How to edit the Group Membership Permissions for groups synced from AD without Exchange on-premise</strong></p>
                  <p>The msExchGroupJoinRestriction must be one of the following numbers:</p>
                  <ul>
                   <li>0: Closed: Members can be added only by the group owners. All requests to join will be rejected automatically.</li>
                   <li>1: Open: Anyone can join this group without being approved by the group owners.</li>
                   <li>2: Owner approval: All requests are approved or rejected by the group owners.</li>
                  </ul>
                  <p>Active Directory User &amp; Computers (ADUC) &gt; open the group properties &gt; Attribute Editor &gt; msExchGroupJoinRestriction</p>
                  <p><strong>How to edit the Group Membership Permissions for groups synced from AD with Exchange on-premise</strong></p>
                  <p>Using the Exchange Management Shell</p>
                  <pre><span>Set-DistributionGroup -Identity GroupName -MemberJoinRestriction &lt;Closed | Open | ApprovalRequired&gt;</span></pre>
                  <h3>Group Leave Permissions</h3>
                  <p><strong>How to edit the Group Leave Permissions for cloud only groups</strong></p>
                  <p>Exchange Admin Center (EAC) &gt; recipients &gt; groups &gt; Double-click the group to edit &gt; Membership approval &gt; Choose whether the group is open to leave</p>
                  <figure>
                   <div role="button" tabIndex="0">
                      <div>
                         <div>
                            <div>
                               <div></div>
                               <img alt="How to edit the Group Leave Permissions for groups synced from AD without Exchange on-premise" width="700" height="631" role="presentation" src="https://miro.medium.com/max/700/1*3O5qzCYaZCOg_RZO-acYFw.png" sizes="700px" srcSet="https://miro.medium.com/max/276/1*3O5qzCYaZCOg_RZO-acYFw.png 276w, https://miro.medium.com/max/552/1*3O5qzCYaZCOg_RZO-acYFw.png 552w, https://miro.medium.com/max/640/1*3O5qzCYaZCOg_RZO-acYFw.png 640w, https://miro.medium.com/max/700/1*3O5qzCYaZCOg_RZO-acYFw.png 700w"/>
                            </div>
                         </div>
                      </div>
                   </div>
                  </figure>
                  <p><strong>How to edit the Group Leave Permissions for groups synced from AD without Exchange on-premise</strong></p>
                  <p>The msExchGroupDepartRestriction must be one of the following numbers:</p>
                  <ul>
                   <li>0: Closed: Members can be removed only by the group owners. All requests to leave will be rejected automatically.</li>
                   <li>1: Open: Anyone can leave this group without being approved by the group owners.</li>
                  </ul>
                  <p>Active Directory User &amp; Computers (ADUC) &gt; open the group properties &gt; Attribute Editor &gt; msExchGroupDepartRestriction</p>
                  <p><strong>How to edit the Group Leave Permissions for groups synced from AD with Exchange on-premise</strong></p>
                  <p>Using the Exchange Management Shell</p>
                  <pre><span>Set-DistributionGroup -Identity GroupName -MemberDepartRestriction &lt;Closed | Open | ApprovalRequired&gt;</span></pre>
                  <h3>External Sender Permissions</h3>
                  <p><strong>How to edit the External Sender Permissions for cloud only groups</strong></p>
                  <p>Exchange Admin Center (EAC) &gt; recipients &gt; groups &gt; Double-click the group to edit &gt; delivery management &gt; Only senders inside my organization</p>
                  <figure>
                   <div role="button" tabIndex="0">
                      <div>
                         <div>
                            <div>
                               <div></div>
                               <img alt="How to edit the External Sender Permissions for groups synced from AD without Exchange on-premise" width="700" height="631" role="presentation" src="https://miro.medium.com/max/700/1*TwyAFnJyOtwxJUxwTi6IDw.png" sizes="700px" srcSet="https://miro.medium.com/max/276/1*TwyAFnJyOtwxJUxwTi6IDw.png 276w, https://miro.medium.com/max/552/1*TwyAFnJyOtwxJUxwTi6IDw.png 552w, https://miro.medium.com/max/640/1*TwyAFnJyOtwxJUxwTi6IDw.png 640w, https://miro.medium.com/max/700/1*TwyAFnJyOtwxJUxwTi6IDw.png 700w"/>
                            </div>
                         </div>
                      </div>
                   </div>
                  </figure>
                  <p><strong>How to edit the External Sender Permissions for groups synced from AD without Exchange on-premise</strong></p>
                  <p>Active Directory User &amp; Computers (ADUC) &gt; open the group properties &gt; Attribute Editor &gt; msExchRequireAuthToSendTo</p>
                  <p><strong>How to edit the External Sender Permissions for groups synced from AD with Exchange on-premise</strong></p>
                  <p>Using the Exchange Management Shell</p>
                  <pre><span>Set-DistributionGroup -Identity GroupName -RequireSenderAuthenticationEnabled &lt;$true | $false&gt;</span></pre>
                  <h3>Send To Permissions</h3>
                  <p><strong>How to edit the Send To Permissions for cloud only groups</strong></p>
                  <p>Exchange Admin Center (EAC) &gt; recipients &gt; groups &gt; Double-click the group to edit &gt; delivery management &gt; If you want to restrict who can send messages to the group</p>
                  <figure>
                   <div role="button" tabIndex="0">
                      <div>
                         <div>
                            <div>
                               <div></div>
                               <img alt="How to edit the Send To Permissions for groups synced from AD without Exchange on-premise" width="700" height="631" role="presentation" src="https://miro.medium.com/max/700/1*idwx8TM0eBwGsqrTkcNuFw.png" sizes="700px" srcSet="https://miro.medium.com/max/276/1*idwx8TM0eBwGsqrTkcNuFw.png 276w, https://miro.medium.com/max/552/1*idwx8TM0eBwGsqrTkcNuFw.png 552w, https://miro.medium.com/max/640/1*idwx8TM0eBwGsqrTkcNuFw.png 640w, https://miro.medium.com/max/700/1*idwx8TM0eBwGsqrTkcNuFw.png 700w"/>
                            </div>
                         </div>
                      </div>
                   </div>
                  </figure>
                  <p><strong>How to edit the Send To Permissions for groups synced from AD without Exchange on-premise</strong></p>
                  <p>The authOrig attribute is a list of users DN attribute. The DN attribute can be found in the user’s properties under the attribute editor tab.</p>
                  <p>Active Directory User &amp; Computers (ADUC) &gt; open the group properties &gt; Attribute Editor &gt; authOrig</p>
                  <p>If you cannot edit the authOrig attribute in ADUC you can use the following PowerShell script:</p>
                  <pre><span>$Group = DN of the Group<br/>$UserDN = DN of the user<br/>Import-module activedirectory</span><span>{'if ($UserDN) {<br/>     Set-ADGroup -Identity $Group -Add @{authOrig=@($UserDN)}<br/>} else {<br/>write-host "Couldn\'t find User" -ForegroundColor Red<br/>}'}</span></pre>
                  <p><strong>How to edit the Send To Permissions for groups synced from AD with Exchange on-premise</strong></p>
                  <p>Use the Exchange Management Console for your on-premise server.</p>
                  <h3>Moderator Approval</h3>
                  <p><strong>How to edit the Moderator Approval for cloud only groups</strong></p>
                  <p>Exchange Admin Center (EAC) &gt; recipients &gt; groups &gt; Double-click the group to edit &gt; message approval &gt; Messages sent to this group have to be approved by a moderator</p>
                  <figure>
                   <div role="button" tabIndex="0">
                      <div>
                         <div>
                            <div>
                               <div></div>
                               <img alt="How to edit the Moderator Approval for groups synced from AD without Exchange on-premise" width="700" height="631" role="presentation" src="https://miro.medium.com/max/700/1*g5txfNz7lpTaWTUp7nkHSQ.png" sizes="700px" srcSet="https://miro.medium.com/max/276/1*g5txfNz7lpTaWTUp7nkHSQ.png 276w, https://miro.medium.com/max/552/1*g5txfNz7lpTaWTUp7nkHSQ.png 552w, https://miro.medium.com/max/640/1*g5txfNz7lpTaWTUp7nkHSQ.png 640w, https://miro.medium.com/max/700/1*g5txfNz7lpTaWTUp7nkHSQ.png 700w"/>
                            </div>
                         </div>
                      </div>
                   </div>
                  </figure>
                  <p><strong>How to edit the Moderator Approval for groups synced from AD without Exchange on-premise</strong></p>
                  <p>Active Directory User &amp; Computers (ADUC) &gt; open the group properties &gt; Attribute Editor &gt; msExchEnableModeration</p>
                  <p><strong>How to edit the Moderator Approval for groups synced from AD with Exchange on-premise</strong></p>
                  <p>Using the Exchange Management Shell</p>
                  <pre><span>Set-DistributionGroup -Identity GroupName -ModerationEnabled &lt;$true | $false&gt;</span></pre>
                  <h3>Moderators</h3>
                  <p><strong>How to edit the Moderators for cloud only groups</strong></p>
                  <p>Exchange Admin Center (EAC) &gt; recipients &gt; groups &gt; Double-click the group to edit &gt; message approval &gt; Group moderators</p>
                  <figure>
                   <div role="button" tabIndex="0">
                      <div>
                         <div>
                            <div>
                               <div></div>
                               <img alt="How to edit the Moderators for groups synced from AD without Exchange on-premise" width="700" height="631" role="presentation" src="https://miro.medium.com/max/700/1*-A_DL1p8B9KW0-E76Dj2yA.png" sizes="700px" srcSet="https://miro.medium.com/max/276/1*-A_DL1p8B9KW0-E76Dj2yA.png 276w, https://miro.medium.com/max/552/1*-A_DL1p8B9KW0-E76Dj2yA.png 552w, https://miro.medium.com/max/640/1*-A_DL1p8B9KW0-E76Dj2yA.png 640w, https://miro.medium.com/max/700/1*-A_DL1p8B9KW0-E76Dj2yA.png 700w"/>
                            </div>
                         </div>
                      </div>
                   </div>
                  </figure>
                  <p><strong>How to edit the Moderators for groups synced from AD without Exchange on-premise</strong></p>
                  <p>The msExchModeratedByLink attribute is a list of users DN attribute. The DN attribute can be found in the user’s properties under the attribute editor tab.</p>
                  <p>Active Directory User &amp; Computers (ADUC) &gt; open the group properties &gt; Attribute Editor &gt; msExchModeratedByLink</p>
                  <p><strong>How to edit the Moderators for groups synced from AD with Exchange on-premise</strong></p>
                  <p>Use the Exchange Management Console for your on-premise server.</p>
                  <h3>Skip Approval</h3>
                  <p><strong>How to edit the “Skip Approval” for cloud only groups</strong></p>
                  <p>Exchange Admin Center (EAC) &gt; recipients &gt; groups &gt; Double-click the group to edit &gt; message approval &gt; Senders who don’t require message approval</p>
                  <figure>
                   <div role="button" tabIndex="0">
                      <div>
                         <div>
                            <div>
                               <div></div>
                               <img alt="How to edit the “Skip Approval” for groups synced from AD without Exchange on-premise" width="700" height="797" role="presentation" src="https://miro.medium.com/max/700/1*SSESsYV3fXDNFyETrCOJMQ.png" sizes="700px" srcSet="https://miro.medium.com/max/276/1*SSESsYV3fXDNFyETrCOJMQ.png 276w, https://miro.medium.com/max/552/1*SSESsYV3fXDNFyETrCOJMQ.png 552w, https://miro.medium.com/max/640/1*SSESsYV3fXDNFyETrCOJMQ.png 640w, https://miro.medium.com/max/700/1*SSESsYV3fXDNFyETrCOJMQ.png 700w"/>
                            </div>
                         </div>
                      </div>
                   </div>
                  </figure>
                  <p><strong>How to edit the “Skip Approval” for groups synced from AD without Exchange on-premise</strong></p>
                  <p>The msExchBypassModerationLink attribute is a list of users DN attribute. The DN attribute can be found in the user’s properties under the attribute editor tab.</p>
                  <p>Active Directory User &amp; Computers (ADUC) &gt; open the group properties &gt; Attribute Editor &gt; msExchBypassModerationLink</p>
                  <p><strong>How to edit the “Skip Approval” for groups synced from AD with Exchange on-premise</strong></p>
                  <p>Use the Exchange Management Console for your on-premise server.</p>
                  <h3>Sender Notification</h3>
                  <p><strong>How to edit the Sender Notification for cloud only groups</strong></p>
                  <p>Exchange Admin Center (EAC) &gt; recipients &gt; groups &gt; Double-click the group to edit &gt; message approval &gt; Select moderation notifications</p>
                  <figure>
                   <div role="button" tabIndex="0">
                      <div>
                         <div>
                            <div>
                               <div></div>
                               <img alt="How to edit the Sender Notification for groups synced from AD without Exchange on-premise" width="700" height="797" role="presentation" src="https://miro.medium.com/max/700/1*xpti1JaWF1Fww-By0b5p1A.png" sizes="700px" srcSet="https://miro.medium.com/max/276/1*xpti1JaWF1Fww-By0b5p1A.png 276w, https://miro.medium.com/max/552/1*xpti1JaWF1Fww-By0b5p1A.png 552w, https://miro.medium.com/max/640/1*xpti1JaWF1Fww-By0b5p1A.png 640w, https://miro.medium.com/max/700/1*xpti1JaWF1Fww-By0b5p1A.png 700w"/>
                            </div>
                         </div>
                      </div>
                   </div>
                  </figure>
                  <p><strong>How to edit the Sender Notification for groups synced from AD without Exchange on-premise</strong></p>
                  <p>The msExchModerationFlags must be one of the following numbers:</p>
                  <ul>
                   <li>6: Notify all senders when their messages aren’t approved.</li>
                   <li>2: Notify senders in your organization when their messages aren’t approved.</li>
                   <li>0: Don’t notify anyone when a message isn’t approved.</li>
                  </ul>
                  <p>Active Directory User &amp; Computers (ADUC) &gt; open the group properties &gt; Attribute Editor &gt; msExchModerationFlags</p>
                  <p><strong>How to edit the Sender Notification for groups synced from AD with Exchange on-premise</strong></p>
                  <p>Using the Exchange Management Shell</p>
                  <pre><span>Set-DistributionGroup -Identity GroupName -SendModerationNotifications &lt;Never | Internal | Always&gt;</span></pre>
                  <h3>Email Addresses</h3>
                  <p><strong>How to edit the Email Addresses for cloud only groups</strong></p>
                  <p>Exchange Admin Center (EAC) &gt; recipients &gt; groups &gt; Double-click the group to edit &gt; Email options &gt; email address</p>
                  <figure>
                   <div role="button" tabIndex="0">
                      <div>
                         <div>
                            <div>
                               <div></div>
                               <img alt="How to edit the Email Addresses for groups synced from AD without Exchange on-premise" width="700" height="797" role="presentation" src="https://miro.medium.com/max/700/1*fqY-0Q-xs7jl3W3ZOSJlMg.png" sizes="700px" srcSet="https://miro.medium.com/max/276/1*fqY-0Q-xs7jl3W3ZOSJlMg.png 276w, https://miro.medium.com/max/552/1*fqY-0Q-xs7jl3W3ZOSJlMg.png 552w, https://miro.medium.com/max/640/1*fqY-0Q-xs7jl3W3ZOSJlMg.png 640w, https://miro.medium.com/max/700/1*fqY-0Q-xs7jl3W3ZOSJlMg.png 700w"/>
                            </div>
                         </div>
                      </div>
                   </div>
                  </figure>
                  <p><strong>How to edit the Email Addresses for groups synced from AD without Exchange on-premise</strong></p>
                  <p>The proxyAddresses field must start with “smtp:” for all email aliases followed by the email address. The primary email address must start with “SMTP:”.</p>
                  <p>Active Directory User &amp; Computers (ADUC) &gt; open the group properties &gt; Attribute Editor &gt; proxyAddresses</p>
                  <p><strong>How to edit the Email Addresses for groups synced from AD with Exchange on-premise</strong></p>
                  <p>Use the Exchange Management Console for your on-premise server.</p>
                  <h3>Mail Tip</h3>
                  <p><strong>How to edit the Mail Tip for cloud only groups</strong></p>
                  <p>Exchange Admin Center (EAC) &gt; recipients &gt; groups &gt; Double-click the group to edit &gt; MailTip</p>
                  <figure>
                   <div role="button" tabIndex="0">
                      <div>
                         <div>
                            <div>
                               <div></div>
                               <img alt="How to edit the Mail Tip for groups synced from AD without Exchange on-premise" width="700" height="505" role="presentation" src="https://miro.medium.com/max/700/1*4njP0iLHuIIvh2ESa3Alsg.png" sizes="700px" srcSet="https://miro.medium.com/max/276/1*4njP0iLHuIIvh2ESa3Alsg.png 276w, https://miro.medium.com/max/552/1*4njP0iLHuIIvh2ESa3Alsg.png 552w, https://miro.medium.com/max/640/1*4njP0iLHuIIvh2ESa3Alsg.png 640w, https://miro.medium.com/max/700/1*4njP0iLHuIIvh2ESa3Alsg.png 700w"/>
                            </div>
                         </div>
                      </div>
                   </div>
                  </figure>
                  <p><strong>How to edit the Mail Tip for groups synced from AD without Exchange on-premise</strong></p>
                  <p>The string you want to display must be set in msExchSenderHintTranslations and wrapped with</p>
                  <pre><span>default:&lt;html&gt;&lt;body&gt;text to be displayed&lt;/body&gt;&lt;/html&gt;</span></pre>
                  <p>Active Directory User &amp; Computers (ADUC) &gt; open the group properties &gt; Attribute Editor &gt; msExchSenderHintTranslations</p>
                  <p><strong>How to edit the Mail Tip for groups synced from AD with Exchange on-premise</strong></p>
                  <p>Use the Exchange Management Console for your on-premise server.</p>
                  <h3>Send As</h3>
                  <p><strong>How to edit the Send As Permissions for cloud only groups</strong></p>
                  <p>Exchange Admin Center (EAC) &gt; recipients &gt; groups &gt; Double-click the group to edit &gt; Group delegation &gt; Send As</p>
                  <figure>
                   <div role="button" tabIndex="0">
                      <div>
                         <div>
                            <div>
                               <div></div>
                               <img alt="How to edit the Send As Permissions for groups synced from AD without Exchange on-premise" width="700" height="725" role="presentation" src="https://miro.medium.com/max/700/1*lnCTJl87VSupjTb5wMoPgg.png" sizes="700px" srcSet="https://miro.medium.com/max/276/1*lnCTJl87VSupjTb5wMoPgg.png 276w, https://miro.medium.com/max/552/1*lnCTJl87VSupjTb5wMoPgg.png 552w, https://miro.medium.com/max/640/1*lnCTJl87VSupjTb5wMoPgg.png 640w, https://miro.medium.com/max/700/1*lnCTJl87VSupjTb5wMoPgg.png 700w"/>
                            </div>
                         </div>
                      </div>
                   </div>
                  </figure>
                  <p><strong>How to edit the Send As Permissions for groups synced from AD without Exchange on-premise</strong></p>
                  <p>Use the Exchange Admin Center as you would for cloud only groups. (see above)</p>
                  <p><strong>How to edit the Send As Permissions for groups synced from AD with Exchange on-premise</strong></p>
                  <p>Use the Exchange Management Console for your on-premise server.</p>
                  <h3>Send On Behalf of</h3>
                  <p><strong>How to edit the Send On Behalf of Permissions</strong> <strong>for cloud only groups</strong></p>
                  <p>Exchange Admin Center (EAC) &gt; recipients &gt; groups &gt; Double-click the group to edit &gt; Group delegation &gt; Send on Behalf</p>
                  <figure>
                   <div role="button" tabIndex="0">
                      <div>
                         <div>
                            <div>
                               <div></div>
                               <img alt="How to edit the Send On Behalf of Permissions for groups synced from AD without Exchange on-premise" width="700" height="725" role="presentation" src="https://miro.medium.com/max/700/1*c6ytSUxtP3uPBzDBfAs8Sw.png" sizes="700px" srcSet="https://miro.medium.com/max/276/1*c6ytSUxtP3uPBzDBfAs8Sw.png 276w, https://miro.medium.com/max/552/1*c6ytSUxtP3uPBzDBfAs8Sw.png 552w, https://miro.medium.com/max/640/1*c6ytSUxtP3uPBzDBfAs8Sw.png 640w, https://miro.medium.com/max/700/1*c6ytSUxtP3uPBzDBfAs8Sw.png 700w"/>
                            </div>
                         </div>
                      </div>
                   </div>
                  </figure>
                  <p><strong>How to edit the Send On Behalf of Permissions for groups synced from AD without Exchange on-premise</strong></p>
                  <p>The publicDelegates attribute is a list of users DN attribute. The DN attribute can be found in the user’s properties under the attribute editor tab.</p>
                  <p>Active Directory User &amp; Computers (ADUC) &gt; open the group properties &gt; Attribute Editor &gt; publicDelegates</p>
                  <p><strong>How to edit the Send On Behalf of Permissions for groups synced from AD with Exchange on-premise</strong></p>
                  <p>Use the Exchange Management Console for your on-premise server.</p>
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
