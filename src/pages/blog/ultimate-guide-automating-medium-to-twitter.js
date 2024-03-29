import * as React from "react"
import Page from '../../components/page'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
 
class BlogArticle extends React.Component {
  render() {
    const title = "Ultimate Guide: Automating Medium to Twitter"
    const jsonLd = {
      headline: title,
      datePublished: '6-26-2019',
      keywords: [
        "Microsoft",
        "Microsoft Flow",
        "Medium.com",
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
      <Page jsonLdType={'BlogPosting'} jsonLd={jsonLd} image={'https://miro.medium.com/max/1284/1*0Cl30s78fnG98LRd8t0dwA.png'} canonical={'https://betterprogramming.pub/ultimate-guide-automating-medium-to-twitter-360f01c6e5ac'} title={title} description={"But why should marketing take half your time? Get it off your plate so you can focus on the more creative processes. I know what you’re thinking… Automatically posting a tweet when you publish a…"}>
        <main>
          <div>
            <Container className="blog-article">
              <Row>
                <Col>
                  <h1>Ultimate Guide: Automating Medium to Twitter</h1>
                  <figure>
                   <div><img alt="Microsoft Flow" src="https://miro.medium.com/max/1284/1*0Cl30s78fnG98LRd8t0dwA.png" width="642" height="397" role="presentation"/></div>
                  </figure>
                  <p><span><span><span></span></span></span></p>
                  <div></div>
                  Top writers always give the same advice that goes something like this:
                  <blockquote>
                   <p><mark>Half the time you should be writing; the other half is marketing.</mark></p>
                  </blockquote>
                  <p><mark>No one is going to magically find your content. You need to go where people are.</mark></p>
                  <p>But why should marketing take half your time? Get it off your plate so you can focus on the more creative processes. I know what you’re thinking…</p>
                  <p>“It takes two minutes to post a Tweet. Why automate it?”</p>
                  <p><mark><strong>Automatically posting a tweet when you publish a story is a gateway drug.</strong></mark><mark> Once you get the hang of it, you can do a ton! </mark>Here’s a short list of my favorites:</p>
                  <ol>
                   <li><mark>Post to Twitter, LinkedIn, Facebook, Tumblr, Instagram, Pinterest, Reddit, etc.</mark></li>
                   <li>Automatically create tasks in<mark> Microsoft To-Do, Todoist, OneNote, Asana, Basecamp, etc.</mark></li>
                   <li>Automatically chart your social media growth to Excel spreadsheets.</li>
                   <li>Track your post-click-through rate by adding <mark>Bitly.</mark></li>
                   <li><mark>Automatically gather top influencers in your niche from social media.</mark></li>
                  </ol>
                  <p>The list goes on and on and on. In short, you can get more data, cut time to market, and be more productive.</p>
                  <p>By using Microsoft Flow, we can automate posts from Medium (or any RSS feed) to be shared across multiple social media platforms leaving you more time to write. Why Microsoft Flow?</p>
                  <p><mark>Microsoft Flow is the most powerful (and FREE) codeless automation toolset on the market. </mark>With complex workflows, you can make powerful apps to streamline your social media process. But there’s a cost to this power.</p>
                  <p>This power comes with one major drawback: It’s complex. Getting started with Microsoft Flow isn’t as easy as <a href="#174c" rel="noopener">IFTTT</a> or <a href="#174c" rel="noopener">Zapier</a>. To truly harness Flow’s full potential we’ll need to tap into some core programming concepts. But don’t worry, we’ll walk through everything you need to automate the process.</p>
                  <h2>How to Get Microsoft Flow</h2>
                  <p><mark>Microsoft has a free option; you can go to </mark><mark><a href="https://flow.microsoft.com/" rel="noopener">https://flow.microsoft.com</a></mark><mark> and sign up to get started. Go and sign up now.</mark></p>
                  <p><mark>For everyone using Microsoft Office 365, you probably already have Flow; it’s integrated directly into Office 365. Go to </mark><mark><a href="https://flow.microsoft.com/" rel="noopener">https://flow.microsoft.com</a></mark><mark> and log in with your Office 365 credentials.</mark></p>
                  <h2>Navigating Microsoft Flow</h2>
                  <figure>
                   <div role="button" tabIndex="0">
                      <div>
                         <div>
                            <div>
                               <div></div>
                               <img alt="Microsoft Flow Navigation" width="700" height="583" role="presentation" src="https://miro.medium.com/max/700/1*ip25nlqeTgKffO5m68eQ-w.png" sizes="700px" srcSet="https://miro.medium.com/max/276/1*ip25nlqeTgKffO5m68eQ-w.png 276w, https://miro.medium.com/max/552/1*ip25nlqeTgKffO5m68eQ-w.png 552w, https://miro.medium.com/max/640/1*ip25nlqeTgKffO5m68eQ-w.png 640w, https://miro.medium.com/max/700/1*ip25nlqeTgKffO5m68eQ-w.png 700w"/>
                            </div>
                         </div>
                      </div>
                   </div>
                   <figcaption>Microsoft Flow Navigation</figcaption>
                  </figure>
                  <p>Microsoft updated Flow’s interface recently. They’ve put most of the navigation down the left-hand side to make it easier to navigate the app.</p>
                  <ul>
                   <li><strong>Home</strong>: Explore a diverse set of templates and learn about the key features for Microsoft Flow. You can get a quick sense of what’s possible and how Microsoft Flow could help your business and your life.</li>
                   <li><strong>Approvals</strong>: Manage the approval of documents or processes across several services, including SharePoint, Dynamics CRM, Salesforce, OneDrive for Business, Zendesk, or WordPress.</li>
                   <li><strong>My Flows</strong>: Create a flow that performs one or more tasks automatically after it’s triggered by an event. For example, create a flow that posts to LinkedIn after an article is published on Medium.</li>
                   <li><strong>Templates</strong>: Microsoft and other third parties have created commonly used flows. You can select a template and create a workflow in minutes.</li>
                   <li><strong>Connectors</strong>: Apps that you have connected and given Microsoft Flow access to. Example: a connector to your account on Twitter.</li>
                  </ul>
                  <h2>Posting a Medium Article to Twitter</h2>
                  <p>First, we’re going to make a simple workflow that will automatically post a message to Twitter when there’s a new post by a Medium author. Before we dive into the step-by-step guide, let’s take a bird’s eye view of the entire process.</p>
                  <p>The first thing to note: websites are designed for you and me. They aren’t easy for computers to understand. What you may not know is every time an article is published on Medium, the document is also shared using a global standard, a standard that computers can read: <strong>RSS</strong>. In short, RSS uses a more computer-friendly version of the article. Don’t worry. What we’ll do is simple.</p>
                  <ol>
                   <li>We’ll create a workflow that will automatically run every time you publish an article.</li>
                   <li>Then, we’ll take some information from the article to compose a tweet.</li>
                   <li>Finally, we’ll post the message to Twitter.</li>
                  </ol>
                  <p>Let’s jump in and make it happen.</p>
                  <h3>Create a New Flow</h3>
                  <p>The first thing we need to do is create our workflow. The workflow contains all the logic we need in a nice little container.</p>
                  <ol>
                   <li>Log on to <a href="https://flow.microsoft.com/" rel="noopener">https://flow.microsoft.com</a>.</li>
                   <li>Click <strong>My flows</strong> in the left navigation.</li>
                   <li>Click <strong>New </strong>in the command bar.</li>
                   <li>Click <strong>Automated-from blank </strong>in the drop down.</li>
                   <li>Set the Flow name to <strong>Medium to Social Media</strong></li>
                   <li>Type <strong>RSS </strong>in the <em>Choose your flow’s trigger.</em></li>
                   <li>Click <strong>When a feed item is published</strong>.</li>
                   <li>Click <strong>Create</strong>.</li>
                  </ol>
                  <figure>
                   <div>
                      <div>
                         <div>
                            <div></div>
                            <img alt="Microsoft Flow new flow from Blank" width="445" height="517" role="presentation" src="https://miro.medium.com/max/445/1*OtK2gr2uZ1Yjf1nCxxjogQ.png" sizes="445px" srcSet="https://miro.medium.com/max/276/1*OtK2gr2uZ1Yjf1nCxxjogQ.png 276w, https://miro.medium.com/max/445/1*OtK2gr2uZ1Yjf1nCxxjogQ.png 445w"/>
                         </div>
                      </div>
                   </div>
                  </figure>
                  <figure>
                   <div role="button" tabIndex="0">
                      <div>
                         <div>
                            <div>
                               <div></div>
                               <img alt="Microsoft Flow name your new flow" width="700" height="443" role="presentation" src="https://miro.medium.com/max/700/1*P8flp3HXwArBYpntzWuJ0Q.png" sizes="700px" srcSet="https://miro.medium.com/max/276/1*P8flp3HXwArBYpntzWuJ0Q.png 276w, https://miro.medium.com/max/552/1*P8flp3HXwArBYpntzWuJ0Q.png 552w, https://miro.medium.com/max/640/1*P8flp3HXwArBYpntzWuJ0Q.png 640w, https://miro.medium.com/max/700/1*P8flp3HXwArBYpntzWuJ0Q.png 700w"/>
                            </div>
                         </div>
                      </div>
                   </div>
                  </figure>
                  <p>In short, we’ve just created a workflow that will run every time a new article is published. Once complete, Microsoft will automatically take you to the workflow management page. Stick it out. You’re basically halfway there.</p>
                  <h3>Tell Flow What to Watch</h3>
                  <p>At this point, your workflow knows to start when a new article is published, but it doesn’t know what RSS feed to watch. So we’ll need to tell your workflow where your RSS feed is. Don’t worry, it’s simple.</p>
                  <p>Each Medium user has its own RSS feed with a URL similar to</p>
                  <pre><span>https://medium.com/feed/@gruberjl</span></pre>
                  <p>To get your RSS feed URL, replace ‘gruberjl’ with your Medium username.</p>
                  <p>Enter your URL into the text box labeled <strong>The RSS feed URL</strong>.</p>
                  <figure>
                   <div>
                      <div>
                         <div>
                            <div></div>
                            <img alt="Microsoft Flow > When a feed item is published" width="609" height="108" role="presentation" src="https://miro.medium.com/max/609/1*w76egJohtg88mkEdgbAfKQ.png" sizes="609px" srcSet="https://miro.medium.com/max/276/1*w76egJohtg88mkEdgbAfKQ.png 276w, https://miro.medium.com/max/552/1*w76egJohtg88mkEdgbAfKQ.png 552w, https://miro.medium.com/max/609/1*w76egJohtg88mkEdgbAfKQ.png 609w"/>
                         </div>
                      </div>
                   </div>
                  </figure>
                  <p>Boom. Your workflow now knows where to find you.</p>
                  <h3>Add an Action to Your Workflow</h3>
                  <p>At this point, we’ve configured a Flow that will run every time you post a new article to Medium. But a Flow with only a trigger doesn’t actually do anything.</p>
                  <p>We’ll need to add an action. Essentially, we’re telling Microsoft Flow what to do when you write a new article on Medium.</p>
                  <ol>
                   <li>Click <strong>New step</strong>.</li>
                   <li>In the <strong>Search connectors and actions</strong> text box, enter <strong>Twitter</strong>.</li>
                   <li>Click <strong>Post a tweet</strong>.</li>
                  </ol>
                  <figure>
                   <div>
                      <div>
                         <div>
                            <div></div>
                            <img alt="Microsoft Flow New step" width="615" height="187" role="presentation" src="https://miro.medium.com/max/615/1*4yUt8BBbnuW7MQKGnu-jWA.png" sizes="615px" srcSet="https://miro.medium.com/max/276/1*4yUt8BBbnuW7MQKGnu-jWA.png 276w, https://miro.medium.com/max/552/1*4yUt8BBbnuW7MQKGnu-jWA.png 552w, https://miro.medium.com/max/615/1*4yUt8BBbnuW7MQKGnu-jWA.png 615w"/>
                         </div>
                      </div>
                   </div>
                  </figure>
                  <figure>
                   <div>
                      <div>
                         <div>
                            <div></div>
                            <img alt="Microsoft Flow Post a tweet" width="606" height="783" role="presentation" src="https://miro.medium.com/max/606/1*jtBVCSd1zDjyCZ9Zmbbm1g.png" sizes="606px" srcSet="https://miro.medium.com/max/276/1*jtBVCSd1zDjyCZ9Zmbbm1g.png 276w, https://miro.medium.com/max/552/1*jtBVCSd1zDjyCZ9Zmbbm1g.png 552w, https://miro.medium.com/max/606/1*jtBVCSd1zDjyCZ9Zmbbm1g.png 606w"/>
                         </div>
                      </div>
                   </div>
                  </figure>
                  <h3><mark>Connect Your Twitter Account to Your Workflow</mark></h3>
                  <p>After you add the Twitter action, you’ll see a big <strong>Sign In</strong> button. At this point, your workflow knows you want to post a message to Twitter after you publish an article, but it doesn’t know what account to publish it under.</p>
                  <ol>
                   <li>Click <strong>Sign in</strong>. A new browser window will open.</li>
                   <li>Enter your Twitter login information and click <strong>Authorize app</strong>.</li>
                  </ol>
                  <figure>
                   <div>
                      <div>
                         <div>
                            <div></div>
                            <img alt="Microsoft Flow sign in to Twitter" width="609" height="281" role="presentation" src="https://miro.medium.com/max/609/1*wWM7F1qQUKWiAW488jMdbg.png" sizes="609px" srcSet="https://miro.medium.com/max/276/1*wWM7F1qQUKWiAW488jMdbg.png 276w, https://miro.medium.com/max/552/1*wWM7F1qQUKWiAW488jMdbg.png 552w, https://miro.medium.com/max/609/1*wWM7F1qQUKWiAW488jMdbg.png 609w"/>
                         </div>
                      </div>
                   </div>
                  </figure>
                  <figure>
                   <div>
                      <div>
                         <div>
                            <div></div>
                            <img alt="Microsoft Flow sign in to Twitter and authorize app" width="502" height="921" role="presentation" src="https://miro.medium.com/max/502/1*Hr3R3ML-uKdt9FR81qR6gQ.png" sizes="502px" srcSet="https://miro.medium.com/max/276/1*Hr3R3ML-uKdt9FR81qR6gQ.png 276w, https://miro.medium.com/max/502/1*Hr3R3ML-uKdt9FR81qR6gQ.png 502w"/>
                         </div>
                      </div>
                   </div>
                  </figure>
                  <p>Once the sign in is complete, the new window will close, and your workflow will know what Twitter account you’re using.</p>
                  <h3>Configure the Twitter Action</h3>
                  <p>Now our Flow needs to know what the Twitter post should say.</p>
                  <p>At this point, you may be wondering how we’ll get the URL and other information automatically each time we post an article. Fortunately, the initial trigger we created “When a feed item is published” does two things.</p>
                  <p>First, it starts the Flow.</p>
                  <p>Second, it gathers information about the article and delivers the information to the Flow. Instead of manually entering a URL in the Content URL field, we’ll use the information that your Flow is already aware of.</p>
                  <ol>
                   <li>Click the <strong>Tweet text </strong>text box.</li>
                   <li>Click <strong>Feed title</strong>, then press <strong>enter</strong>.</li>
                   <li>Click <strong>Feed links Item</strong>, then press <strong>enter</strong>.</li>
                  </ol>
                  <p>You’ll notice Microsoft Flow will automatically add “Apply to each” to your workflow. That’s normal. In short, Microsoft Flow is automatically setting up your workflow for you!</p>
                  <figure>
                   <div role="button" tabIndex="0">
                      <div>
                         <div>
                            <div>
                               <div></div>
                               <img alt="Microsoft Flow Post a tweet from RSS" width="700" height="481" role="presentation" src="https://miro.medium.com/max/700/1*pxcAPKtZII6kFLYK-oxzXw.png" sizes="700px" srcSet="https://miro.medium.com/max/276/1*pxcAPKtZII6kFLYK-oxzXw.png 276w, https://miro.medium.com/max/552/1*pxcAPKtZII6kFLYK-oxzXw.png 552w, https://miro.medium.com/max/640/1*pxcAPKtZII6kFLYK-oxzXw.png 640w, https://miro.medium.com/max/700/1*pxcAPKtZII6kFLYK-oxzXw.png 700w"/>
                            </div>
                         </div>
                      </div>
                   </div>
                  </figure>
                  <p>Now we’re going to add tags which is the hardest part. Don’t worry; you got this!</p>
                  <h3><mark>Add Tags to Your Post</mark></h3>
                  <p>The tags will be imported from Medium into our Flow, but they come in as a list of strings. We need to convert our list to hashtags.</p>
                  <p>To visualize this point, we need to take the Medium tags that look like this:</p>
                  <ul>
                   <li>Office 365</li>
                   <li>Email</li>
                   <li>Security</li>
                  </ul>
                  <p>And convert it to “#Office365 #Email #Security”.</p>
                  <p>To do this, we’ll need to add an action directly under the <strong>When a feed item is published</strong> trigger. This is a special action that doesn’t interact with the outside world. We’ll create a variable, which, in our case, is the hashtag text that we can use later in our workflow.</p>
                  <p>To add an action in between two existing steps</p>
                  <ol>
                   <li><strong>Hover the mouse</strong> on the down arrow</li>
                   <li>Click the <strong>plus sign +</strong></li>
                   <li>Click <strong>Add an action</strong>.</li>
                  </ol>
                  <figure>
                   <div>
                      <div>
                         <div>
                            <div></div>
                            <img alt="Microsoft Flow Apply to each" width="680" height="613" role="presentation" src="https://miro.medium.com/max/680/1*OdxPG5TtCkFo0qr7MnWZvg.png" sizes="680px" srcSet="https://miro.medium.com/max/276/1*OdxPG5TtCkFo0qr7MnWZvg.png 276w, https://miro.medium.com/max/552/1*OdxPG5TtCkFo0qr7MnWZvg.png 552w, https://miro.medium.com/max/640/1*OdxPG5TtCkFo0qr7MnWZvg.png 640w, https://miro.medium.com/max/680/1*OdxPG5TtCkFo0qr7MnWZvg.png 680w"/>
                         </div>
                      </div>
                   </div>
                  </figure>
                  <figure>
                   <div>
                      <div>
                         <div>
                            <div></div>
                            <img alt="Microsoft Flow add an action" width="192" height="92" role="presentation" src="https://miro.medium.com/max/192/1*VBr3UpVshUGspRA7ZqjPlg.png" sizes="192px" srcSet=""/>
                         </div>
                      </div>
                   </div>
                  </figure>
                  <p>Just like before, your workflow needs to be told what you’re adding.</p>
                  <ol>
                   <li>Type <strong>initialize variable</strong> into the Search connectors and actions text box.</li>
                   <li>Click <strong>Initialize variable.</strong></li>
                  </ol>
                  <figure>
                   <div>
                      <div>
                         <div>
                            <div></div>
                            <img alt="Microsoft Flow initialize variable" width="606" height="677" role="presentation" src="https://miro.medium.com/max/606/1*vdliUL-0sBLCDg6wNPwJ2w.png" sizes="606px" srcSet="https://miro.medium.com/max/276/1*vdliUL-0sBLCDg6wNPwJ2w.png 276w, https://miro.medium.com/max/552/1*vdliUL-0sBLCDg6wNPwJ2w.png 552w, https://miro.medium.com/max/606/1*vdliUL-0sBLCDg6wNPwJ2w.png 606w"/>
                         </div>
                      </div>
                   </div>
                  </figure>
                  <ol>
                   <li>Enter <strong>Hashtags</strong> in the Name field.</li>
                   <li>Select <strong>String</strong> in the Type field.</li>
                   <li>Left mouse click the <strong>Value </strong>text box, giving it the focus.</li>
                   <li>Click <strong>Expression</strong>.</li>
                   <li>Copy and paste the following text in the <strong>Fx </strong>box and click <strong>OK</strong>.</li>
                  </ol>
                  <pre><span><span><span><span><div></div></span></span></span>replace(replace(join(triggerBody()?['categories'], '~#'), ' ', ''), '~', ' ')</span></pre>
                  <figure>
                   <div role="button" tabIndex="0">
                      <div>
                         <div>
                            <div>
                               <div></div>
                               <img alt="Microsoft Flow initialize variable expression" width="700" height="418" role="presentation" src="https://miro.medium.com/max/700/1*WDEpI187wlMegIU_IsTi8g.png" sizes="700px" srcSet="https://miro.medium.com/max/276/1*WDEpI187wlMegIU_IsTi8g.png 276w, https://miro.medium.com/max/552/1*WDEpI187wlMegIU_IsTi8g.png 552w, https://miro.medium.com/max/640/1*WDEpI187wlMegIU_IsTi8g.png 640w, https://miro.medium.com/max/700/1*WDEpI187wlMegIU_IsTi8g.png 700w"/>
                            </div>
                         </div>
                      </div>
                   </div>
                  </figure>
                  <p>Now we have our hashtags, sort of. We have a string that will look something like this “Office 365 #Email #Security.” We’re missing the first hashtag, and we need to tell the workflow to add the hashtags to our tweet.</p>
                  <ol>
                   <li>Click <strong>Apply to each</strong> to open the action.</li>
                   <li>Click the <em>empty line</em> in your<strong> tweet text</strong> text box.</li>
                   <li>Type <strong>#</strong>.</li>
                   <li>Click <strong>Hashtags.</strong></li>
                  </ol>
                  <figure>
                   <div role="button" tabIndex="0">
                      <div>
                         <div>
                            <div>
                               <div></div>
                               <img alt="Microsoft Flow Post a tweet dynamic content" width="700" height="452" role="presentation" src="https://miro.medium.com/max/700/1*Qn4757g4winbzNNOH9KN1w.png" sizes="700px" srcSet="https://miro.medium.com/max/276/1*Qn4757g4winbzNNOH9KN1w.png 276w, https://miro.medium.com/max/552/1*Qn4757g4winbzNNOH9KN1w.png 552w, https://miro.medium.com/max/640/1*Qn4757g4winbzNNOH9KN1w.png 640w, https://miro.medium.com/max/700/1*Qn4757g4winbzNNOH9KN1w.png 700w"/>
                            </div>
                         </div>
                      </div>
                   </div>
                  </figure>
                  <p>Bam! You’re done. All we need to do now is save and test.</p>
                  <h3>Save and Test</h3>
                  <ol>
                   <li>Click <strong>Save </strong>in the top right corner so you don’t lose your work.</li>
                  </ol>
                  <p>Write an article on Medium, and be sure to give it a title, featured image, and tags.</p>
                  <p>The flow will run within 15 minutes and post to Twitter!</p>
                  <figure>
                   <div>
                      <div>
                         <div>
                            <div></div>
                            <img alt="Microsoft Flow Tweet posted" width="598" height="534" role="presentation" src="https://miro.medium.com/max/598/1*iAW3UVaMD6PwjrTY2mfQMA.png" sizes="598px" srcSet="https://miro.medium.com/max/276/1*iAW3UVaMD6PwjrTY2mfQMA.png 276w, https://miro.medium.com/max/552/1*iAW3UVaMD6PwjrTY2mfQMA.png 552w, https://miro.medium.com/max/598/1*iAW3UVaMD6PwjrTY2mfQMA.png 598w"/>
                         </div>
                      </div>
                   </div>
                  </figure>
                  <p>After you verify it’s working, delete the Tweet and the Medium article!</p>
                  <p>Congrats, you’re a codeless programmer! See if you can add LinkedIn or Facebook to your workflow on your own.</p>
                  <p>Any questions, please post in the comments below. I’d be happy to assist.</p>
                  <h2 id="174c">References</h2>
                  <ol>
                   <li><a href="https://flow.microsoft.com/en-us/" rel="noopener">Microsoft Flow Sign up</a>.</li>
                   <li><a href="https://ifttt.com/" rel="noopener">IFTTT</a></li>
                   <li><mark><a href="https://zapier.com/" rel="noopener">Zapier</a></mark></li>
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
