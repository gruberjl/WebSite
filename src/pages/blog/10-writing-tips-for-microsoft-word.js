import * as React from "react"
import Page from '../../components/page'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Link } from "gatsby"
 
class BlogArticle extends React.Component {
  render() {
    const title = "10 Writing Tips for Microsoft Word"
    const jsonLd = {
      headline: title,
      datePublished: '10-13-2018',
      keywords: [
        "Microsoft",
        "Microsoft Word",
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
      <Page jsonLdType={'BlogPosting'} jsonLd={jsonLd} image={'https://miro.medium.com/max/700/1*soXE-MymVVp4327bzccbpA.jpeg'} canonical={'https://medium.com/gitbit/10-writing-tips-for-microsoft-word-60ed6e645515'} title={title} description={"10 tips to save you time and stay organized. Microsoft Word 2016 is built for maximum productivity. Quickly produce professional documents using the rich authoring features."}>
        <main>
          <div>
            <Container className="blog-article">
              <Row>
                <Col>
                  <h1>10 Writing Tips for Microsoft Word</h1>
                  <figure>
                   <div role="button" tabIndex="0">
                      <div><img alt="white laptop background aesthetic" src="https://miro.medium.com/max/700/1*soXE-MymVVp4327bzccbpA.jpeg" width="700" height="467" role="presentation"/></div>
                   </div>
                   <figcaption>Source: <Link to="https://pixabay.com/en/gray-computer-mobile-2158653/" rel="noopener">pixabay.com</Link></figcaption>
                  </figure>
                  <p>While working for Microsoft, Charles Simonyi and Richard Brodie developed the first version of Microsoft Word. The two developers chipped away at Xerox Bravo, the principal WYSIWYG (What You See Is What You Get) word processor. Word 1.0 launched in October 1983 with versions for Xenix and MS-DOS. The first Windows adaptation launched in 1989, with an enhanced interface. <mark>The completion of Windows 3.0 in 1990 turned Word into an enormous business achievement.</mark> As of late, Microsoft’s major improvements to this old software have gone unnoticed. Microsoft has added some excellent features to help improve your writing and productivity using Microsoft Word.</p>
                  <p>I have purposefully ignored some of Microsoft Words best features. Microsoft has enhanced document sharing, reviewing, and co-authoring in the most recent versions. <mark>My intention is to shed some insight on how Microsoft Word can improve your writing and productivity.</mark> Sharing, editing, and workflows are out of this articles scope.</p>
                  <h2>1. Text to Speech with Dictate</h2>
                  <figure>
                   <div>
                      <div>
                         <div>
                            <div></div>
                            <img alt="Microsoft Word Dictation Ribbon" width="609" height="135" role="presentation" src="https://miro.medium.com/max/609/1*VZHhCsYMqlXTpQCb-BPGnw.png" sizes="609px" srcSet="https://miro.medium.com/max/276/1*VZHhCsYMqlXTpQCb-BPGnw.png 276w, https://miro.medium.com/max/552/1*VZHhCsYMqlXTpQCb-BPGnw.png 552w, https://miro.medium.com/max/609/1*VZHhCsYMqlXTpQCb-BPGnw.png 609w"/>
                         </div>
                      </div>
                   </div>
                   <figcaption>Source: </figcaption>
                  </figure>
                  <p>You type all day long to get things done. Responding to email, writing documents, and creating presentations to communicate your ideas. Sometimes, this gets tiring. Your fingers get sore, your wrists hurt. Do you ever wish you could just talk to your computer and have it write for you? Research shows you can speak much faster than you can type. What if you could type with your voice? <mark>Meet Dictate, a Microsoft Garage project. Dictate is an Office add-in for Windows Outlook, Word, and PowerPoint that converts speech to text using the ultramodern speech recognition behind Cortana and Microsoft Translator.</mark> You can download Dictate from Microsoft’s Garage website: <Link to="https://www.microsoft.com/en-us/garage/profiles/dictate" rel="noopener">https://www.microsoft.com/en-us/garage/profiles/dictate</Link>. Once installed, you’ll find a new ribbon menu, <strong>Dictation</strong>.</p>
                  <h2>2. Keyboard Shortcuts</h2>
                  <figure>
                   <div>
                      <div>
                         <div>
                            <div></div>
                            <img alt="Microsoft Word Hot Keys" width="288" height="363" role="presentation" src="https://miro.medium.com/max/288/1*v0IHSA0uR3ItPpekupQfew.png" sizes="288px" srcSet="https://miro.medium.com/max/276/1*v0IHSA0uR3ItPpekupQfew.png 276w, https://miro.medium.com/max/288/1*v0IHSA0uR3ItPpekupQfew.png 288w"/>
                         </div>
                      </div>
                   </div>
                   <figcaption>Source: </figcaption>
                  </figure>
                  <p>While not groundbreaking, keyboard shortcuts remain one of the unsurpassed ways to improve productivity. This table shows the most often used shortcuts in Microsoft Word. Visit <Link to="https://support.office.com/en-us/article/keyboard-shortcuts-for-microsoft-word-on-windows-95ef89dd-7142-4b50-afb2-f762f663ceb2" rel="noopener">Microsoft Office Support</Link> for a complete list.</p>
                  <h2>3. Synonyms Lookup</h2>
                  <figure>
                   <div>
                      <div>
                         <div>
                            <div></div>
                            <img alt="Microsoft Word right click menu" width="275" height="323" role="presentation" src="https://miro.medium.com/max/275/1*FaxEm3rZAzI3513nSZG_UA.png" sizes="275px" srcSet=""/>
                         </div>
                      </div>
                   </div>
                   <figcaption>Source: </figcaption>
                  </figure>
                  <p>Microsoft has added the ability to look up synonyms to the right-click menu in Microsoft Word. Highlight a word and right click to open the drop-down menu. Select <strong>Synonyms</strong> and choose an innovative word.</p>
                  <h2>4. Enhanced Proofreading</h2>
                  <figure>
                   <div role="button" tabIndex="0">
                      <div>
                         <div>
                            <div>
                               <div></div>
                               <img alt="Microsoft Word Proofing Options" width="700" height="542" role="presentation" src="https://miro.medium.com/max/700/1*22p6T_V_p62fPOP_yojkIA.png" sizes="700px" srcSet="https://miro.medium.com/max/276/1*22p6T_V_p62fPOP_yojkIA.png 276w, https://miro.medium.com/max/552/1*22p6T_V_p62fPOP_yojkIA.png 552w, https://miro.medium.com/max/640/1*22p6T_V_p62fPOP_yojkIA.png 640w, https://miro.medium.com/max/700/1*22p6T_V_p62fPOP_yojkIA.png 700w"/>
                            </div>
                         </div>
                      </div>
                   </div>
                   <figcaption>Source: </figcaption>
                  </figure>
                  <p>Word has found spelling and grammar mistakes for years but spelling and grammar are no longer enough to deliver high-quality content. Open the <strong>File</strong> menu and select <strong>Options</strong>. Click the <strong>Proofing</strong> tab and review the latest enhancements. Don’t miss the additional settings located under the <strong>Settings</strong> button.</p>
                  <h2>5. Research from Word</h2>
                  <figure>
                   <div>
                      <div>
                         <div>
                            <div></div>
                            <img alt="Microsoft Word Research" width="368" height="304" role="presentation" src="https://miro.medium.com/max/368/1*BLnhx52DnyctfKsmN8fvOQ.png" sizes="368px" srcSet="https://miro.medium.com/max/276/1*BLnhx52DnyctfKsmN8fvOQ.png 276w, https://miro.medium.com/max/368/1*BLnhx52DnyctfKsmN8fvOQ.png 368w"/>
                         </div>
                      </div>
                   </div>
                   <figcaption>Source: </figcaption>
                  </figure>
                  <p>Microsoft has included a new <strong>Researcher </strong>toolset. If you’re like most of us, you perform Google searches to help you write. Not only is Researcher faster because it’s built right into Word, but it also filters for higher quality content. A quick search of Sun Tzu won’t bring up the best fictional movie about this legendary man, it will show credible sources with valuable information.</p>
                  <h2>6. Word Count</h2>
                  <figure>
                   <div>
                      <div>
                         <div>
                            <div></div>
                            <img alt="Microsoft Word screenshot showing word count" width="407" height="246" role="presentation" src="https://miro.medium.com/max/407/1*-zjDOONQ3ceHVRBD7peMMw.png" sizes="407px" srcSet="https://miro.medium.com/max/276/1*-zjDOONQ3ceHVRBD7peMMw.png 276w, https://miro.medium.com/max/407/1*-zjDOONQ3ceHVRBD7peMMw.png 407w"/>
                         </div>
                      </div>
                   </div>
                   <figcaption>Source: </figcaption>
                  </figure>
                  <p>Word count is one of the most important pieces of information in delivering high-quality content. Bloomberg recommends 800–1000 words in reader-submitted content. Medium converts the word count to the ‘median time to read’ and recommends around 7 minutes. Too long, and no one will read it. Too short and you won’t provide value to your audience. Word count has been available in Microsoft Word for some time, but Microsoft has moved this critical piece of information to the bottom left corner.</p>
                  <h2>7. Review with Read Aloud</h2>
                  <div>
                   <div>
                      <div>
                         <figure>
                            <div role="button" tabIndex="0">
                               <div><img alt="Microsoft Word Ribbon with Read Aloud circled" src="https://miro.medium.com/max/1000/1*Hf0pVPJrnFSkuPTDpcmk5g.png" width="1000" height="125" role="presentation"/></div>
                            </div>
                            <figcaption>Source: </figcaption>
                         </figure>
                      </div>
                   </div>
                  </div>
                  <div>
                   <div>
                      <p>It doesn’t matter how many times I re-read my articles, I always overlook mistakes. Microsoft has included a new feature called <strong>Read Aloud</strong>. As the name implies, you can use this new tool to hear the text read aloud. By using Read Aloud you can find more errors and create a more natural flowing article.</p>
                      <p>To start using this unique feature, click the Read Aloud button found under the <strong>Review</strong> ribbon. Once you start Read Aloud, a menu will open in the top right corner directly under the ribbon. From the Read Aloud menu you can change the voice selector to another reader. The default reader, Microsoft David, sounds computerized and choppy. Microsoft Zira has a more natural flow.</p>
                      <h2>8. Icons to Draw Attention</h2>
                      <figure>
                         <div role="button" tabIndex="0">
                            <div><img alt="Microsoft Word Icons" src="https://miro.medium.com/max/700/1*RO2PiRKF_IkK1VzZVd1CwA.png" width="700" height="289" role="presentation"/></div>
                         </div>
                         <figcaption>Source: </figcaption>
                      </figure>
                      <p>Let’s face it, the average person has a lot to read in a day. Many people are only looking at headings and images. Microsoft has been working hard to help users deliver more artistic value in their content. One of my favorite additions are the sleek new <strong>Icons</strong>. Clean and simple to add they can draw the readers attention to important pieces of information without adding clutter. Microsoft’s icons are professional and stylish.</p>
                      <p>Find the <strong>Icons</strong> button in the <strong>Insert</strong> ribbon.</p>
                      <h2>9. Plagiarism Checker</h2>
                      <p>A few years back I was tasked with creating some branding content for a business. Standard mission statement, vision, and goals. I spent a week researching to understand how and why people create these critical pieces of content. In that time, I looked at other successful companies to see what type of material they were delivering. Finally, I composed our own unique brand, or so I thought. As a colleague pointed out, I copied Google’s mission statement. It was a complete accident, I’m sure I looked at Google, but I didn’t intentionally copy it. It must have resonated with me and without realizing, I re-wrote it. Now I use a plagiarism checker from Copyleaks.com.</p>
                      <p><mark>Getting started is simple, from the </mark><mark><strong>Insert</strong></mark><mark> ribbon, select </mark><mark><strong>Store</strong></mark><mark>. </mark><mark>After a quick search for </mark><mark><strong>CopyLeaks</strong></mark><mark>,</mark><mark><strong> </strong></mark><mark>you can add the add-in to Microsoft Word.</mark><mark> Once installed, register for a free account.</mark></p>
                      <h2>10. Linked Notes</h2>
                   </div>
                  </div>
                  <div>
                   <div>
                      <div>
                         <figure>
                            <div role="button" tabIndex="0">
                               <div><img alt="Microsoft Word Notes" src="https://miro.medium.com/max/1000/1*-m1fvRmTDYZIS_TJlZhzVA.png" width="1000" height="228" role="presentation"/></div>
                            </div>
                            <figcaption>Source: </figcaption>
                         </figure>
                      </div>
                   </div>
                  </div>
                  <div>
                   <div>
                      <p>Motivation is pleasant, however, it’s very little fun facing a deadline when you can’t find inspiration to compose an article. Arrange your way around this issue by getting thoughts out of your head and keeping them in OneNote.</p>
                      <p>You can compose your thoughts, quotes, and sources in OneNote and keep your article spotless and sorted out. Microsoft has introduced another path to improve your experience with OneNote and Word, Linked Notes.</p>
                      <p>Linked Notes let you dock OneNote to the side of your PC screen, you can compose your article in Word, and take notes in OneNote concurrently. Linked Notes will help you stay focused and organized.</p>
                      <p>To link notes to your document, click the <strong>Linked Notes</strong> button under the <strong>Review</strong> ribbon. OneNote will open asking where to save the notes. Once you choose a notebook and section, OneNote will open on the right-hand side of your screen.</p>
                   </div>
                  </div>
                  <div role="separator"><span></span><span></span><span></span></div>
                  <section>
                   <div>
                      <div>
                         <figure>
                            <Link to="https://writingcooperative.com/">
                               <div><img alt="Microsoft Word Screenshot" src="https://miro.medium.com/max/700/1*eLY7z6NuxjwFyI1T-dwXcQ.png" width="700" height="89" role="presentation"/></div>
                            </Link>
                            <figcaption>Helping each other write better.</figcaption>
                         </figure>
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
