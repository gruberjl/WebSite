import * as React from "react"
import Page from '../../components/page'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Link } from "gatsby"
 
class BlogArticle extends React.Component {
  render() {
    const title = "11 Tips for Improving Productivity using OneNote"
    const jsonLd = {
      headline: title,
      datePublished: '1-12-2018',
      keywords: [
        "OneNote",
        "Microsoft",
        "Productivity",
        "Office 365",
        "Microsoft 365"
      ],
      "author": {
        "@type": "Person",
        "name": "John Gruber",
        url: 'https://medium.com/@gruberjl'
      }
    }

    return (
      <Page jsonLdType={'BlogPosting'} jsonLd={jsonLd} image={'https://miro.medium.com/max/1603/1*pFl-NA9QZkRgzrudAfuUWA.jpeg'} canonical={'https://betterhumans.pub/10-tips-to-improve-productivity-using-onenote-85dee4a32cf2'} title={title} description={"OneNote is a digital notebook that automatically backs up to Microsoft’s Office 365 cloud. Microsoft has developed apps for every device including Windows PC, Mac,iPhone, Android. OneNote notebooks…"}>
        <main>
          <div>
            <Container className="blog-article">
              <Row>
                <Col>
                  <h1>11 Tips for Improving Productivity using OneNote</h1>
                  <div>
                   <figure><img alt="OneNote screenshot with explainations" src="https://miro.medium.com/max/1603/1*pFl-NA9QZkRgzrudAfuUWA.jpeg" width="1603" height="856" role="presentation"/></figure>
                  </div>
                  <div>
                   <div>
                      <h2><mark>What’s OneNote?</mark></h2>
                      <p><span><span><span></span></span></span></p>
                      <div></div>
                      <mark>OneNote is a digital notebook that automatically backs up to Microsoft’s</mark><mark> Office 365 cloud.</mark> Microsoft has developed apps for every device including Windows PC, Mac,iPhone, Android. <mark>OneNote notebooks can be shared with colleagues for real-time collaboration</mark>.
                      <h2><mark>Why OneNote?</mark></h2>
                      <p><mark>OneNote allows you to capture just about anything.</mark><mark> </mark><mark>Type notes, r</mark><mark><span><span>e</span></span></mark><mark>cord audio, create a quick sketch, add pictures, videos, and any other document.</mark><mark> Then organize everything into notebooks, sections, and pages.</mark><mark> OneNote can be as</mark><mark> structured or as unstructured </mark><mark>as you want it to be. </mark><mark>And because all your notes are in the cloud, OneNote lets you switch devices and pick up right where you left off.</mark></p>
                      <p><span><span><span></span></span></span></p>
                      <div></div>
                      <mark>Last but certainly not least, </mark><mark>integration!</mark><mark> </mark><mark>You can take note in OneNote while on a phone call, quickly add check-boxes turning the notes into a to-do list.</mark><mark> Then, add an Outlook flag to remind you to follow up later.</mark><mark> </mark><mark>Or link an Outlook calendar appointment to a OneNote page and share the notes to everyone in the meeting.</mark><mark> </mark><mark>The possibilities are endless.</mark>
                      <h2>1<mark>.</mark><mark> </mark><mark>Create a Quick Note</mark></h2>
                      <p><mark>How often does this happen? You’re out to lunch and remember you need to call a customer and follow up on your last meeting. </mark><mark>Quick notes are perfect for capturing a thought on one device, such as your phone then retrieving it from another device, such as your computer when you’re in the office.</mark></p>
                      <p><span><span><span></span></span></span></p>
                      <div></div>
                      <mark>Use Quick Notes to </mark><mark>jot down</mark><mark> any thoughts and ideas, just like sticky notes. Each Quick Note is instantly saved as a page in the </mark><mark><strong>Unfiled Notes</strong></mark><mark> section of the </mark><mark><strong>Quick Notes</strong></mark><mark> notebook.</mark>
                      <p><mark>Quick Notes are the electronic equivalent of little yellow sticky notes. When you create a Quick Note, it’s saved immediately as a section in </mark><mark><em>&lt;your name&gt; Notebook</em></mark><mark>. OneNote uses both the Quick Notes and </mark><mark><em>&lt;your name&gt; Notebook</em></mark><mark> to sync your notes to OneDrive. </mark><mark>For this reason, don’t rename the </mark><mark><em>&lt;your name&gt; Notebook </em></mark><mark>or the Quick Notes section.</mark></p>
                      <h3><mark>How to create a quick note on </mark><mark>smartphones</mark></h3>
                      <p><em>The following instructions are for an Android smartphone but are similar on the iPhone. If you have any difficulty with your iPhone please let me know if the comments and I’ll write up instructions.</em></p>
                      <p><mark>Once you download the </mark><mark><Link to="https://play.google.com/store/apps/details?id=com.microsoft.office.onenote&amp;hl=en" rel="noopener">OneNote Android app</Link></mark><mark> and log in to your Office 365 account you can begin using OneNote on your smartphone anytime, anywhere. OneNote for Android has </mark><mark><strong>widgets </strong></mark><mark>for creating a new </mark><mark><strong>text </strong></mark><mark>note, </mark><mark><strong>audio </strong></mark><mark>note, and </mark><mark><strong>picture </strong></mark><mark>note.</mark><mark> </mark>To use any of these widgets, simply tap and drag them to your phone’s home screen.</p>
                      <p>From your Android home screen, tap and hold until the management view appears. Click <strong>WIDGETS</strong>.</p>
                      <figure>
                         <div>
                            <div>
                               <div>
                                  <div></div>
                                  <img alt="Android app screen" width="534" height="949" role="presentation" src="https://miro.medium.com/max/534/1*Fa3jVzxVE7hno-5h5DjM9w.png" sizes="534px" srcSet="https://miro.medium.com/max/276/1*Fa3jVzxVE7hno-5h5DjM9w.png 276w, https://miro.medium.com/max/534/1*Fa3jVzxVE7hno-5h5DjM9w.png 534w"/>
                               </div>
                            </div>
                         </div>
                      </figure>
                      <p>Scroll down until you find the <strong>OneNote</strong> app. Scroll through the different widgets and add them to your home screen!</p>
                      <figure>
                         <div>
                            <div>
                               <div>
                                  <div></div>
                                  <img alt="Android showing Widgets" width="506" height="900" role="presentation" src="https://miro.medium.com/max/506/1*QzalBWydb6RfP0OWKbtMcA.png" sizes="506px" srcSet="https://miro.medium.com/max/276/1*QzalBWydb6RfP0OWKbtMcA.png 276w, https://miro.medium.com/max/506/1*QzalBWydb6RfP0OWKbtMcA.png 506w"/>
                               </div>
                            </div>
                         </div>
                      </figure>
                      <figure>
                         <div>
                            <div>
                               <div>
                                  <div></div>
                                  <img alt="Android home screen with OneNote widget" width="506" height="900" role="presentation" src="https://miro.medium.com/max/506/1*Xt494SFSHKfGvcxb8EyHbA.png" sizes="506px" srcSet="https://miro.medium.com/max/276/1*Xt494SFSHKfGvcxb8EyHbA.png 276w, https://miro.medium.com/max/506/1*Xt494SFSHKfGvcxb8EyHbA.png 506w"/>
                               </div>
                            </div>
                         </div>
                      </figure>
                      <h3><mark>How to create a quick note from Windows 10</mark></h3>
                      <p><mark>Quick notes are located in the bottom right corner. The icon will look like the OneNote symbol plus scissors.</mark></p>
                      <figure>
                         <div>
                            <div>
                               <div>
                                  <div></div>
                                  <img alt="Windows 10 task bar with quick note selected" width="316" height="214" role="presentation" src="https://miro.medium.com/max/316/1*YccJCbFlAhPEiUY1c1Ch0g.png" sizes="316px" srcSet="https://miro.medium.com/max/276/1*YccJCbFlAhPEiUY1c1Ch0g.png 276w, https://miro.medium.com/max/316/1*YccJCbFlAhPEiUY1c1Ch0g.png 316w"/>
                               </div>
                            </div>
                         </div>
                      </figure>
                      <h3>How to access your quick notes</h3>
                      <ol>
                         <li>Open OneNote and click <strong>Quick Notes</strong>.</li>
                      </ol>
                      <figure>
                         <div>
                            <div>
                               <div>
                                  <div></div>
                                  <img alt="OneNote notebooks" width="447" height="528" role="presentation" src="https://miro.medium.com/max/447/1*YyDeBUYLP05oswCAJ4bXwQ.png" sizes="447px" srcSet="https://miro.medium.com/max/276/1*YyDeBUYLP05oswCAJ4bXwQ.png 276w, https://miro.medium.com/max/447/1*YyDeBUYLP05oswCAJ4bXwQ.png 447w"/>
                               </div>
                            </div>
                         </div>
                      </figure>
                      <h2>2. <mark>Search across all of your notes</mark></h2>
                      <p>The more you use OneNote the more content you’ll store. It can quickly become your go-to place for everything and anything. The structure of OneNote has unlimited options. If you’re like me, you’ll quickly forget where you stored things! Luckily the built-in search is fantastic.</p>
                      <figure>
                         <div>
                            <div>
                               <div>
                                  <div></div>
                                  <img alt="OneNote search" width="542" height="651" role="presentation" src="https://miro.medium.com/max/542/1*buULiMsnaoGbOpN5GIcJqw.png" sizes="542px" srcSet="https://miro.medium.com/max/276/1*buULiMsnaoGbOpN5GIcJqw.png 276w, https://miro.medium.com/max/542/1*buULiMsnaoGbOpN5GIcJqw.png 542w"/>
                               </div>
                            </div>
                         </div>
                      </figure>
                      <p><mark>OneNote can help you find notes no matter where they are.</mark><mark> To find notes, select the magnifying glass or press Ctrl+F</mark> and type a search word or phrase. OneNote searches typed text, handwritten notes, and even words shown in pictures. If you want to narrow the search, select the drop-down arrow and choose an option. And OneNote highlights the search words in pictures and in notes. When you’re done, select the X to close the search results.</p>
                      <p>With OneNote, find your notes wherever they are.</p>
                      <h2>3. <mark>Share your notebook and collaborate in real-time</mark></h2>
                      <p>OneNote’s possibilities don’t end with shopping lists and personal to-do lists. In today’s day in age, teams need to collaborate in real-time, from anywhere. OneNote notebooks can be used to keep projects organized, share notes about clients with your team, share the highlights and action items from meetings, and provide an internal Wiki to store processes.</p>
                      <p><mark>You can invite people to see your notebook with an email message generated by OneNote. </mark>Only people who are invited will be able to open your notebook.</p>
                      <ol>
                         <li>Choose <strong>File</strong> &gt; <strong>Share</strong>.</li>
                      </ol>
                      <figure>
                         <div>
                            <div>
                               <div>
                                  <div></div>
                                  <img alt="OneNote share with people" width="345" height="358" role="presentation" src="https://miro.medium.com/max/345/0*cMl7-4JWpywd9cnP.png" sizes="345px" srcSet="https://miro.medium.com/max/276/0*cMl7-4JWpywd9cnP.png 276w, https://miro.medium.com/max/345/0*cMl7-4JWpywd9cnP.png 345w"/>
                               </div>
                            </div>
                         </div>
                      </figure>
                      <p>2. <mark>Under </mark><mark><strong>Share with People</strong></mark><mark>, type the names or email addresses of people you’d like to share your notebook with.</mark></p>
                      <figure>
                         <div role="button" tabIndex="0">
                            <div>
                               <div>
                                  <div>
                                     <div></div>
                                     <img alt="OneNote sharing permissions" width="345" height="363" role="presentation" src="https://miro.medium.com/max/345/0*7TtktpnP7GzkVt4k.png" sizes="345px" srcSet="https://miro.medium.com/max/276/0*7TtktpnP7GzkVt4k.png 276w, https://miro.medium.com/max/345/0*7TtktpnP7GzkVt4k.png 345w"/>
                                  </div>
                               </div>
                            </div>
                         </div>
                      </figure>
                      <p><mark>3. In the drop-down box on the right, choose whether each person can edit or just view your notebook.</mark></p>
                      <p>4. Add a personal note, if you’d like, and choose <strong>Share</strong>.<br/>The people you’ve selected will get an email invitation to open your notebook.</p>
                      <h2>4. Draw and hand write notes for clarity</h2>
                      <p><mark>Sometimes computers can get in the way.</mark><mark> </mark><mark>Until I started using OneNote I kept a pen and paper on my desk at all times. It was easy to jot quick notes from a phone call, make a quick drawing to capture a complex idea or circle important things. </mark><mark>In OneNote, you can type notes, write notes, convert handwritten notes to text, and even draw directly on the page.</mark></p>
                      <p><mark>From any OneNote page select the </mark><mark><strong>Draw </strong></mark><mark>tab in the ribbon and click your desired pen.</mark></p>
                      <h2>5. <mark>Use tags to categorize and prioritize notes</mark></h2>
                      <p><mark>Tags are a way to categorize and prioritize notes in OneNote 2016.</mark><mark> With tags, you </mark><mark>can</mark><mark> quickly return to important items, remind yourself about action items, or filter on notes you’d like to share with others. You can tag anything from a single line of text to an entire paragraph.</mark></p>
                      <figure>
                         <div>
                            <div>
                               <div>
                                  <div></div>
                                  <img alt="OneNote ribbon tags" width="351" height="169" role="presentation" src="https://miro.medium.com/max/351/1*z4mep7nAZ1f3JCzfYHU4Ew.png" sizes="351px" srcSet="https://miro.medium.com/max/276/1*z4mep7nAZ1f3JCzfYHU4Ew.png 276w, https://miro.medium.com/max/351/1*z4mep7nAZ1f3JCzfYHU4Ew.png 351w"/>
                               </div>
                            </div>
                         </div>
                         <figcaption>OneNote Ribbon — Home tab — Tags</figcaption>
                      </figure>
                      <p><mark><em>Tips: When you’re done with a tagged note, you can remove the tag so it doesn’t show up in tagged notes search results.</em></mark></p>
                      <ul>
                         <li><em>To remove a single tag, right-click it, and click Remove Tag.</em></li>
                         <li><em>To remove multiple tags, select all of the text containing the tags you want to remove, and then press CTRL+0 (ZERO).</em></li>
                      </ul>
                      <figure>
                         <div>
                            <div>
                               <div>
                                  <div></div>
                                  <img alt="OneNote tags" width="286" height="510" role="presentation" src="https://miro.medium.com/max/286/1*BHR7pRaXteIcZNUADThlog.png" sizes="286px" srcSet="https://miro.medium.com/max/276/1*BHR7pRaXteIcZNUADThlog.png 276w, https://miro.medium.com/max/286/1*BHR7pRaXteIcZNUADThlog.png 286w"/>
                               </div>
                            </div>
                         </div>
                         <figcaption>OneNote 2016 Tags</figcaption>
                      </figure>
                      <p>If you’ve previously added tags to any of your notes, you can search for the tags by using tag keywords. In OneNote 2016, the results appear in an easy-to-read summary. If you want to view the tag search results as a notes page, click the “Create Summary Page” button at the bottom of the Tags Summary task pane.</p>
                      <figure>
                         <div>
                            <div>
                               <div>
                                  <div></div>
                                  <img alt="OneNote tags summary" width="375" height="613" role="presentation" src="https://miro.medium.com/max/375/1*NYQa5o_aPpuwRg8xpA3Q2w.png" sizes="375px" srcSet="https://miro.medium.com/max/276/1*NYQa5o_aPpuwRg8xpA3Q2w.png 276w, https://miro.medium.com/max/375/1*NYQa5o_aPpuwRg8xpA3Q2w.png 375w"/>
                               </div>
                            </div>
                         </div>
                         <figcaption>OneNote 2016 Find Tags listing Ideas</figcaption>
                      </figure>
                      <h2><mark>6. </mark><mark>Integrate OneNote with Outlook Flags</mark></h2>
                      <p><mark>Now, we’re getting to OneNote’s true potential! As you take notes and plan projects in OneNote, you might wonder how to manage deadlines and remember the things on your to-do list. One way is to create Outlook tasks. Then you can view and track those tasks in Outlook and even get reminders.</mark></p>
                      <figure>
                         <div>
                            <div>
                               <div>
                                  <div></div>
                                  <img alt="OneNote flags" width="358" height="272" role="presentation" src="https://miro.medium.com/max/358/1*qqLJs5zxy8Ez9-A1N1rjbQ.png" sizes="358px" srcSet="https://miro.medium.com/max/276/1*qqLJs5zxy8Ez9-A1N1rjbQ.png 276w, https://miro.medium.com/max/358/1*qqLJs5zxy8Ez9-A1N1rjbQ.png 358w"/>
                               </div>
                            </div>
                         </div>
                         <figcaption>OneNote Ribbon — Home tab — Outlook Tasks</figcaption>
                      </figure>
                      <p>You can also:</p>
                      <ul>
                         <li><mark>Find a task in OneNote.</mark></li>
                         <li><mark>Mark a task as complete.</mark></li>
                         <li><mark>Delete a task.</mark></li>
                      </ul>
                      <p>OneNote and Outlook work together in other ways too. For example, you can manage meeting details and send notes in an email message.</p>
                      <h2><mark>7. </mark><mark>Password-Protect your Notes</mark></h2>
                      <p><mark>Password protection in OneNote is designed to help keep your notes safe from prying eyes.</mark><mark> Whether you use OneNote for class notes at school, meeting notes at work, a personal diary or blog at home or personal information about yourself or your friends and family, </mark><mark>passwords play a crucial part in controlling access</mark><mark> to those notes.</mark></p>
                      <p><mark>You can help keep your private notes safe</mark><mark> from prying eyes by protecting a OneNote notebook section with a password. When a section is password-protected, all of its pages are locked until you enter the correct password.</mark></p>
                      <figure>
                         <div>
                            <div>
                               <div>
                                  <div></div>
                                  <img alt="OneNote password protect this section" width="353" height="299" role="presentation" src="https://miro.medium.com/max/353/1*cHMYt-si1g-tHoMSZ0qn6Q.png" sizes="353px" srcSet="https://miro.medium.com/max/276/1*cHMYt-si1g-tHoMSZ0qn6Q.png 276w, https://miro.medium.com/max/353/1*cHMYt-si1g-tHoMSZ0qn6Q.png 353w"/>
                               </div>
                            </div>
                         </div>
                         <figcaption>OneNote Ribbon — Home tab — Outlook Tasks</figcaption>
                      </figure>
                      <p><strong>Note</strong>: Choose your password carefully. If you forget your password, no one will be able to unlock your notes for you (not even Microsoft Technical Support).</p>
                      <p>You can also:</p>
                      <ul>
                         <li>Lock the protected sections in your notebook.</li>
                         <li>Change the password for a protected section.</li>
                         <li>Remove the password from a protected section.</li>
                         <li>Set various password protection options.</li>
                         <li>See OneNote 2016 Help (F1).</li>
                      </ul>
                      <h2><mark>8. </mark><mark>Create &amp; Use Page Templates</mark></h2>
                      <p><mark>In OneNote, a template is a page design that you can apply to new pages in your notebook to give them an appealing background, a more uniform appearance, or a consistent layout.</mark></p>
                      <figure>
                         <div>
                            <div>
                               <div>
                                  <div></div>
                                  <img alt="OneNote page templates" width="353" height="162" role="presentation" src="https://miro.medium.com/max/353/1*H69pjxThhKWVgtYPMV8xDw.png" sizes="353px" srcSet="https://miro.medium.com/max/276/1*H69pjxThhKWVgtYPMV8xDw.png 276w, https://miro.medium.com/max/353/1*H69pjxThhKWVgtYPMV8xDw.png 353w"/>
                               </div>
                            </div>
                         </div>
                         <figcaption>OneNote Ribbon — Insert tab — Page Templates</figcaption>
                      </figure>
                      <p><mark>OneNote comes with several built-in page templates that you can choose from, </mark><mark>including decorative page backgrounds, planners, and To Do lists. If you’d like, you can also create your own page template or customize an existing one.</mark></p>
                      <p>Note: Many template designs include content that appears in specific places on the page. For this reason, templates in OneNote can only be applied to new pages that don’t already contain any notes. If you want to apply a template to a page that already contains notes, first create a new page from the template you want, and then copy your existing notes over to it.</p>
                      <h2><mark>9. </mark><mark>Organize Pages with Subpages</mark></h2>
                      <p>Subpages are a good way to group and organize notes. For example, if you have annual and monthly meeting notes, the annual meeting notes can be the main page and you can demote the monthly meeting notes so they become subpages.</p>
                      <figure>
                         <div>
                            <div>
                               <div>
                                  <div></div>
                                  <img alt="OneNote pages list" width="321" height="520" role="presentation" src="https://miro.medium.com/max/321/1*8y5C6YR-iRXXlqmDxR5SQQ.png" sizes="321px" srcSet="https://miro.medium.com/max/276/1*8y5C6YR-iRXXlqmDxR5SQQ.png 276w, https://miro.medium.com/max/321/1*8y5C6YR-iRXXlqmDxR5SQQ.png 321w"/>
                               </div>
                            </div>
                         </div>
                         <figcaption>OneNote Ribbon — Home tab — Page List</figcaption>
                      </figure>
                      <p>If you have a lot of notebooks and pages and notice that it’s getting harder to find what you’re looking for, you can search notes and navigate results. <mark>Another way to stay efficient is by organizing your notebooks, sections, and pages.</mark></p>
                      <p>When you move a page that has subpages, the group moves together if the subpages are collapsed. If you want to move a single subpage, promote it to a page by dragging it to the left, and then click and drag the page up or down to the location you want.</p>
                      <h2><mark>10. </mark><mark>Use OneNote as a Team Wiki</mark></h2>
                      <p><mark>If you’d like to share your notebook with other people, make sure you create your OneNote 2016 notebook on OneDrive so others can get to it.</mark> If you’ve already created a notebook on your computer, first move it to OneDrive. Just because your notebook is on OneDrive doesn’t mean people can automatically see it. It’s available to you on all your devices. You’ll have to deliberately share it with others before anyone else can see it.</p>
                      <figure>
                         <div>
                            <div>
                               <div>
                                  <div></div>
                                  <img alt="OneNote sharing" width="561" height="358" role="presentation" src="https://miro.medium.com/max/561/1*f1uBcDmQcybCtAYzRGc9vA.png" sizes="561px" srcSet="https://miro.medium.com/max/276/1*f1uBcDmQcybCtAYzRGc9vA.png 276w, https://miro.medium.com/max/552/1*f1uBcDmQcybCtAYzRGc9vA.png 552w, https://miro.medium.com/max/561/1*f1uBcDmQcybCtAYzRGc9vA.png 561w"/>
                               </div>
                            </div>
                         </div>
                         <figcaption>OneNote Ribbon — File Tab — Share</figcaption>
                      </figure>
                      <ul>
                         <li>You can generate a link to your notebook so others can view or edit it (File tab &gt; Share &gt; Get a Sharing Link). If someone forwards the link to another person, they will also be able to see your notebook.</li>
                         <li>If you ever change your mind, you can change permissions or stop sharing your notebook. It will still be on OneDrive so you can get to it on all your devices.</li>
                      </ul>
                      <p><mark>Thanks to OneNote tags, and search capability it becomes a great place to use as a team wiki. When shared from OneDrive or SharePoint it becomes available offline too. I recommend a SharePoint Online site for teams of ten or more.</mark></p>
                      <h3>Tips:</h3>
                      <ul>
                         <li><mark>Follow a specific structure.</mark><mark> </mark><mark>Your first OneNote page should tell users how to use and update the OneNote.</mark></li>
                         <li><mark>Use Tags properly.</mark><mark> They make it easy to find to-do lists, etc.</mark></li>
                         <li><mark>Chose an organization structure.</mark> At TierPoint, we group our notes by application/technology. Make OneNote work for you, not the other way around.</li>
                      </ul>
                      <h2><mark>11. </mark><mark>Manage Projects Through OneNote</mark></h2>
                      <p>I manage a lot of projects through OneNote. I keep specific structures, templates, and notes for quick reuse. Here’s my structure:</p>
                      <p><mark>Create a section for every ongoing project. Name the section with the project name. Create a section group called </mark><mark><strong>Closed</strong></mark><mark>. When a project is completed, move it to the closed section.</mark></p>
                      <figure>
                         <div>
                            <div>
                               <div>
                                  <div></div>
                                  <img alt="OneNote empty section for a new project" width="479" height="423" role="presentation" src="https://miro.medium.com/max/479/1*7t5JGtkX8J8RCkP2iw9GIg.png" sizes="479px" srcSet="https://miro.medium.com/max/276/1*7t5JGtkX8J8RCkP2iw9GIg.png 276w, https://miro.medium.com/max/479/1*7t5JGtkX8J8RCkP2iw9GIg.png 479w"/>
                               </div>
                            </div>
                         </div>
                         <figcaption>Empty section for a new Project</figcaption>
                      </figure>
                      <p>The first page is always named the <mark>project name. It’s a summary and where to keep important information I have to refer to often. Flag the title of the page so the project will show up in your Outlook To-do list.</mark></p>
                      <figure>
                         <div>
                            <div>
                               <div>
                                  <div></div>
                                  <img alt="The summary page of a project" width="540" height="413" role="presentation" src="https://miro.medium.com/max/540/1*GFnT3FQX4dkK3IiU1bjJlA.png" sizes="540px" srcSet="https://miro.medium.com/max/276/1*GFnT3FQX4dkK3IiU1bjJlA.png 276w, https://miro.medium.com/max/540/1*GFnT3FQX4dkK3IiU1bjJlA.png 540w"/>
                               </div>
                            </div>
                         </div>
                         <figcaption>The summary page of a project</figcaption>
                      </figure>
                      <p>Then I create a page for <mark><strong>Tasks</strong></mark>. This list will typically be a list of things I have to do for every project like this. <mark>I’ll create subpages with additional tasks.</mark> These are special things I need to complete for this particular project. I also create a meeting notes section. <mark>Every meeting I create a subpage with the notes from the meeting.</mark> <mark>Lastly, </mark><mark>I’ll create a </mark><mark><strong>Communications</strong></mark><mark> section where I dump important memos and emails that I’ll need to reference later.</mark></p>
                      <figure>
                         <div>
                            <div>
                               <div>
                                  <div></div>
                                  <img alt="Project Outline" width="536" height="684" role="presentation" src="https://miro.medium.com/max/536/1*N1MdHXBiG-zCCGy-IB2SJA.png" sizes="536px" srcSet="https://miro.medium.com/max/276/1*N1MdHXBiG-zCCGy-IB2SJA.png 276w, https://miro.medium.com/max/536/1*N1MdHXBiG-zCCGy-IB2SJA.png 536w"/>
                               </div>
                            </div>
                         </div>
                         <figcaption>Project Outline</figcaption>
                      </figure>
                      <p>That’s about it. I utilize Outlook integration heavily.</p>
                   </div>
                  </div>
                  <div role="separator"><span></span><span></span><span></span></div>
                  <section>
                   <div>
                      <div>
                         <p>Thank you for taking the time to read my article. I hope you found it beneficial. If you have any questions or feedback, please don’t hesitate to reach out.</p>
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
