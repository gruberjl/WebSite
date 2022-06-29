import * as React from "react"
import Page from '../../components/page'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Link } from "gatsby"
 
class BlogArticle extends React.Component {
  render() {
    const title = "10 Tips for Improving Productivity using Word"
    const jsonLd = {
      headline: title,
      datePublished: '10-18-2019',
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
      <Page jsonLdType={'BlogPosting'} jsonLd={jsonLd} image={'https://miro.medium.com/max/1609/1*Rg_5e2z8nlnKnRvEKHHOrQ.png'} canonical={'https://medium.com/gitbit/10-new-microsoft-word-features-you-need-to-use-now-2a38e7722ec0'} title={title} description={"While working for Microsoft, Charles Simonyi and Richard Brodie developed the first version of Microsoft Word. The two developers chipped away at Xerox Bravo, the principal WYSIWYG (What You See Is…"}>
        <main>
          <div>
            <Container className="blog-article">
              <Row>
                <Col>
                  <h1>10 Tips for Improving Productivity using Word</h1>
                  <div>
                   <figure><img alt="Microsoft Word screenshot with labels" src="https://miro.medium.com/max/1609/1*Rg_5e2z8nlnKnRvEKHHOrQ.png" width="1609" height="868" role="presentation"/></figure>
                  </div>
                  <div>
                   <div>
                      <p><span><span><span></span></span></span></p>
                      <div></div>
                      While working for Microsoft, Charles Simonyi and Richard Brodie developed the first version of Microsoft Word. The two developers chipped away at Xerox Bravo, the principal WYSIWYG (What You See Is What You Get) word processor. Word 1.0 launched in October 1983 with versions for Xenix and MS-DOS. The first Windows adaptation launched in 1989, with an enhanced interface. The completion of Windows 3.0 in 1990 turned Word into an enormous business achievement. As of late, Microsoft’s major improvements to this old software have gone unnoticed. Microsoft has added some excellent features to help improve your writing and productivity using Microsoft Word.
                      <p><span><span><span></span></span></span></p>
                      <div></div>
                      I have purposefully ignored some of Microsoft Words best features. Microsoft has enhanced document sharing, reviewing, and co-authoring in the most recent versions. I intend to shed some insight into how Microsoft Word can improve your writing and productivity. Sharing, editing, and workflows are out of the scope of this article.
                      <h2>1. <mark>Text to Speech with Dictate</mark></h2>
                      <figure>
                         <div><img alt="Microsoft Word Dictation Ribbon" src="https://miro.medium.com/max/609/0*xfmvtTUJGRe47Jz7.png" width="609" height="135" role="presentation"/></div>
                         <figcaption>Source: </figcaption>
                      </figure>
                      <p>You type all day long to get things done. Responding to email, writing documents, and creating presentations to communicate your ideas. Sometimes, this gets tiring. <mark>Your fingers get sore, your wrists hurt. Do you ever wish you could just talk to your computer and have it write for you?</mark> Research shows you can speak much faster than you can type. <mark>What if you could type with your voice? Meet Dictate, a Microsoft Garage project. Dictate is an Office add-in for Windows Outlook, Word, and PowerPoint that converts speech to text using the ultramodern speech recognition behind Cortana and Microsoft Translator.</mark> <mark>You </mark><mark>can download Dictate from Microsoft’s Garage website: </mark><mark><Link to="https://www.microsoft.com/en-us/garage/profiles/dictate" rel="noopener">https://www.microsoft.com/en-us/garage/profiles/dictate</Link></mark><mark>.</mark><mark> Once installed, you’ll find a new ribbon menu, </mark><mark><strong>Dictation</strong></mark><mark>.</mark></p>
                      <h2>2. <mark>Keyboard Shortcuts</mark></h2>
                      <figure>
                         <div>
                            <div>
                               <div>
                                  <div></div>
                                  <img alt="Microsoft Word Hot Keys" width="288" height="363" role="presentation" src="https://miro.medium.com/max/288/0*x8QZQltBgYPeqkre.png" sizes="288px" srcSet="https://miro.medium.com/max/276/0*x8QZQltBgYPeqkre.png 276w, https://miro.medium.com/max/288/0*x8QZQltBgYPeqkre.png 288w"/>
                               </div>
                            </div>
                         </div>
                         <figcaption>Source: </figcaption>
                      </figure>
                      <p>While not groundbreaking, keyboard shortcuts remain one of the unsurpassed ways to improve productivity. This table shows the most often used shortcuts in Microsoft Word. Visit <Link to="https://support.office.com/en-us/article/keyboard-shortcuts-for-microsoft-word-on-windows-95ef89dd-7142-4b50-afb2-f762f663ceb2" rel="noopener">Microsoft Office Support</Link> for a complete list.</p>
                      <h2>3. <mark>Synonyms Lookup</mark></h2>
                      <figure>
                         <div>
                            <div>
                               <div>
                                  <div></div>
                                  <img alt="Microsoft Word right click menu" width="275" height="323" role="presentation" src="https://miro.medium.com/max/275/0*SbuOe8IEQtdKSFl4.png" sizes="275px" srcSet=""/>
                               </div>
                            </div>
                         </div>
                         <figcaption>Source: </figcaption>
                      </figure>
                      <p><mark>Microsoft has added the ability to look up synonyms to the right-click menu in Microsoft Word.</mark><mark> Highlight a word and right-click to open the drop-down menu. Select </mark><mark><strong>Synonyms</strong></mark><mark> and choose an innovative word.</mark></p>
                      <h2>4. <mark>Enhanced Proofreading</mark></h2>
                      <figure>
                         <div>
                            <div>
                               <div>
                                  <div></div>
                                  <img alt="Microsoft Word Proofing Options" width="700" height="541" role="presentation" src="https://miro.medium.com/max/700/0*6_0po7l9-IVlGKqa.png" sizes="700px" srcSet="https://miro.medium.com/max/276/0*6_0po7l9-IVlGKqa.png 276w, https://miro.medium.com/max/552/0*6_0po7l9-IVlGKqa.png 552w, https://miro.medium.com/max/640/0*6_0po7l9-IVlGKqa.png 640w, https://miro.medium.com/max/700/0*6_0po7l9-IVlGKqa.png 700w"/>
                               </div>
                            </div>
                         </div>
                         <figcaption>Source: </figcaption>
                      </figure>
                      <p>Word has found spelling and grammar mistakes for years but spelling and grammar are no longer enough to deliver high-quality content. Open the <strong>File</strong> menu and select <strong>Options</strong>.<mark> Click the </mark><mark><strong>Proofing</strong></mark><mark> tab and review the latest enhancements.</mark> Don’t miss the additional settings located under the <strong>Settings</strong> button.</p>
                      <h2>5. <mark>Research from Word</mark></h2>
                      <figure>
                         <div>
                            <div>
                               <div>
                                  <div></div>
                                  <img alt="Microsoft Word Research" width="368" height="304" role="presentation" src="https://miro.medium.com/max/368/0*SUibGKQX5P9KXLBb.png" sizes="368px" srcSet="https://miro.medium.com/max/276/0*SUibGKQX5P9KXLBb.png 276w, https://miro.medium.com/max/368/0*SUibGKQX5P9KXLBb.png 368w"/>
                               </div>
                            </div>
                         </div>
                         <figcaption>Source: </figcaption>
                      </figure>
                      <p>Microsoft has included a new <strong>Researcher </strong>toolset. If you’re like most of us, you perform Google searches to help you write. <mark>Not only is the Researcher faster because it’s built right into Word, but it also filters for higher quality content.</mark> A quick search of Sun Tzu won’t bring up the best fictional movie about this legendary man, it will show credible sources with valuable information.</p>
                      <h2>6. <mark>Word Count</mark></h2>
                      <figure>
                         <div>
                            <div>
                               <div>
                                  <div></div>
                                  <img alt="Microsoft Word screenshot showing word count" width="407" height="246" role="presentation" src="https://miro.medium.com/max/407/0*_LJks2hOpgqBKFsz.png" sizes="407px" srcSet="https://miro.medium.com/max/276/0*_LJks2hOpgqBKFsz.png 276w, https://miro.medium.com/max/407/0*_LJks2hOpgqBKFsz.png 407w"/>
                               </div>
                            </div>
                         </div>
                         <figcaption>Source: </figcaption>
                      </figure>
                      <p>Word count is one of the most important pieces of information in delivering high-quality content. Bloomberg recommends 800–1000 words in reader-submitted content. Medium converts the word count to the ‘median time to read’ and recommends around 7 minutes. <mark>Too long, and no one will read it. Too short and you won’t provide value to your audience.</mark> Word count has been available in Microsoft Word for some time, but Microsoft has moved this critical piece of information to the bottom left corner.</p>
                      <h2>7. <mark>Review with Read Aloud</mark></h2>
                      <figure>
                         <div role="button" tabIndex="0">
                            <div>
                               <div>
                                  <div>
                                     <div></div>
                                     <img alt="Microsoft Word Ribbon with Read Aloud circled" width="700" height="88" role="presentation" src="https://miro.medium.com/max/700/0*YvisWxMLZSdsufcB.png" sizes="700px" srcSet="https://miro.medium.com/max/276/0*YvisWxMLZSdsufcB.png 276w, https://miro.medium.com/max/552/0*YvisWxMLZSdsufcB.png 552w, https://miro.medium.com/max/640/0*YvisWxMLZSdsufcB.png 640w, https://miro.medium.com/max/700/0*YvisWxMLZSdsufcB.png 700w"/>
                                  </div>
                               </div>
                            </div>
                         </div>
                         <figcaption>Source: </figcaption>
                      </figure>
                      <p><mark>It doesn’t matter how many times I re-read my articles, I always overlook mistakes.</mark><mark> Microsoft has included a new feature called </mark><mark><strong>Read Aloud</strong></mark><mark>. As the name implies, you can use this new tool to hear the text read aloud. By using Read Aloud you can find more errors and create a more natural flowing article.</mark></p>
                      <p>To start using this unique feature, click the Read Aloud button found under the <strong>Review</strong> ribbon. Once you start Read Aloud, a menu will open in the top right corner directly under the ribbon. From the Read Aloud menu, you can change the voice selector to another reader. The default reader, Microsoft David, sounds computerized and choppy. Microsoft Zira has a more natural flow.</p>
                      <h2>8. <mark>Icons to Draw Attention</mark></h2>
                      <figure>
                         <div>
                            <div>
                               <div>
                                  <div></div>
                                  <img alt="Microsoft Word Icons" width="700" height="288" role="presentation" src="https://miro.medium.com/max/700/0*8L1pa-TSkfnORtFg.png" sizes="700px" srcSet="https://miro.medium.com/max/276/0*8L1pa-TSkfnORtFg.png 276w, https://miro.medium.com/max/552/0*8L1pa-TSkfnORtFg.png 552w, https://miro.medium.com/max/640/0*8L1pa-TSkfnORtFg.png 640w, https://miro.medium.com/max/700/0*8L1pa-TSkfnORtFg.png 700w"/>
                               </div>
                            </div>
                         </div>
                         <figcaption>Source: </figcaption>
                      </figure>
                      <p><mark>Let’s face it, the average person has a lot to read in a day.</mark> <mark>Many people are only looking at headings and images.</mark> Microsoft has been working hard to help users deliver more artistic value in their content. One of my favorite additions is the sleek new <strong>Icons</strong>. Clean and simple to add they can draw the readers attention to important pieces of information without adding clutter. Microsoft’s icons are professional and stylish.</p>
                      <p>Find the <strong>Icons</strong> button in the <strong>Insert</strong> ribbon.</p>
                      <h2>9.<mark> </mark><mark>Plagiarism Checker</mark></h2>
                      <p>A few years back I was tasked with creating some branding content for a business. Standard mission statement, vision, and goals. I spent a week researching to understand how and why people create these critical pieces of content. In that time, I looked at other successful companies to see what type of material they were delivering. Finally, I composed our own unique brand, or so I thought. As a colleague pointed out, I copied Google’s mission statement. It was a complete accident, I’m sure I looked at Google, but I didn’t intentionally copy it. It must have resonated with me and without realizing, I re-wrote it.<mark> </mark><mark>Now I use a plagiarism checker from Copyleaks.com.</mark></p>
                      <p><mark>Getting started is simple, from the </mark><mark><strong>Insert</strong></mark><mark> ribbon, select </mark><mark><strong>Store</strong></mark><mark>. After a quick search for </mark><mark><strong>CopyLeaks</strong></mark><mark>,</mark><mark><strong> </strong></mark><mark>you can add the add-in to Microsoft Word. Once installed, register for a free account.</mark></p>
                      <h2>10. <mark>Linked Notes</mark></h2>
                      <figure>
                         <div role="button" tabIndex="0">
                            <div>
                               <div>
                                  <div>
                                     <div></div>
                                     <img alt="Microsoft Word Notes" width="700" height="159" role="presentation" src="https://miro.medium.com/max/700/0*WuYAKUgI5_H1Offt.png" sizes="700px" srcSet="https://miro.medium.com/max/276/0*WuYAKUgI5_H1Offt.png 276w, https://miro.medium.com/max/552/0*WuYAKUgI5_H1Offt.png 552w, https://miro.medium.com/max/640/0*WuYAKUgI5_H1Offt.png 640w, https://miro.medium.com/max/700/0*WuYAKUgI5_H1Offt.png 700w"/>
                                  </div>
                               </div>
                            </div>
                         </div>
                         <figcaption>Source: </figcaption>
                      </figure>
                      <p>Motivation is pleasant, however, it’s very little fun facing a deadline when you can’t find inspiration to compose an article. Arrange your way around this issue by getting thoughts out of your head and keeping them in OneNote.</p>
                      <p><mark>You can compose your thoughts, quotes, and sources in OneNote and keep your article spotless and sorted out. Microsoft has introduced another path to improving your experience with OneNote and Word, Linked Notes</mark>.</p>
                      <p>Linked Notes let you dock OneNote to the side of your PC screen, you can compose your article in Word, and take notes in OneNote concurrently. Linked Notes will help you stay focused and organized.</p>
                      <p><mark>To link notes to your document, click the </mark><mark><strong>Linked Notes</strong></mark><mark> button under the </mark><mark><strong>Review</strong></mark><mark> ribbon. OneNote will open asking where to save the notes. Once you choose a notebook and section, OneNote will open on the right-hand side of your screen.</mark></p>
                      <figure>
                         <div>
                            <div>
                               <div>
                                  <div></div>
                                  <img alt="Microsoft Word Screenshot" width="436" height="246" role="presentation" src="https://miro.medium.com/max/436/1*bmtiGLNx1d44U3OrfnBEsw.png" sizes="436px" srcSet="https://miro.medium.com/max/276/1*bmtiGLNx1d44U3OrfnBEsw.png 276w, https://miro.medium.com/max/436/1*bmtiGLNx1d44U3OrfnBEsw.png 436w"/>
                               </div>
                            </div>
                         </div>
                      </figure>
                   </div>
                  </div>
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
