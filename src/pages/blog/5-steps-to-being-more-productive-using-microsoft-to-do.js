import * as React from "react"
import Page from '../../components/page'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
 
class BlogArticle extends React.Component {
  render() {
    const title = "5 Steps to Being More Productive Using Microsoft To-Do"
    const jsonLd = {
      headline: title,
      datePublished: '1-27-2018',
      keywords: [
        "Microsoft",
        "Microsoft ToDo",
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
      <Page jsonLdType={'BlogPosting'} jsonLd={jsonLd} image={'https://miro.medium.com/max/505/1*e2eAae92fZFoVRa8lcLaYw.png'} canonical={'https://medium.com/gitbit/5-steps-to-being-more-productive-using-microsoft-to-do-9a147a1fa3f9'} title={title} description={"Microsoft To-Do is one of the latest apps to be included in Office 365. It’s a simple to-do list that makes it easy to plan your day. Whether it’s for work, school or home, To-Do will help you…"}>
        <main>
          <div>
            <Container className="blog-article">
              <Row>
                <Col>
                  <h1>5 Steps to Being More Productive Using Microsoft To-Do</h1>
                  <figure>
                   <div><img alt="Microsoft To-Do My Day Page" src="https://miro.medium.com/max/505/1*e2eAae92fZFoVRa8lcLaYw.png" width="505" height="343" role="presentation"/></div>
                   <figcaption>Screenshot of Microsoft To-Do’s My Day View</figcaption>
                  </figure>
                  <p>Microsoft To-Do is one of the latest apps to be <strong>included in Office 365</strong>. It’s a simple to-do list that makes it easy to plan your day. Whether it’s for work, school or home, To-Do will help you <strong>increase your productivity</strong> and decrease your stress levels. To-Do has a unique way to organize your tasks into lists, then combining those lists into a <strong>My Day </strong>view to clear the clutter and keep you organized.</p>
                  <blockquote>
                   <p><mark>The list is the origin of culture. It’s part of the history of art and literature. What does culture want? To make infinity comprehensible. It also wants to create order — not always, but often. And how, as a human being, does one face infinity? How does one attempt to grasp the incomprehensible? Through lists — Umberto Eco</mark></p>
                  </blockquote>
                  <p>To-Do syncs with your phone and computer, so you can access your to-dos from anywhere in the world. You can quickly add, organize and schedule your to-dos while you’re on the go.</p>
                  <figure>
                   <div role="button" tabIndex="0">
                      <div>
                         <div>
                            <div>
                               <div></div>
                               <img alt="Microsoft To-Do Reviews" width="700" height="358" role="presentation" src="https://miro.medium.com/max/700/1*ldaXNaFgmq7OMQamiflYwg.png" sizes="700px" srcSet="https://miro.medium.com/max/276/1*ldaXNaFgmq7OMQamiflYwg.png 276w, https://miro.medium.com/max/552/1*ldaXNaFgmq7OMQamiflYwg.png 552w, https://miro.medium.com/max/640/1*ldaXNaFgmq7OMQamiflYwg.png 640w, https://miro.medium.com/max/700/1*ldaXNaFgmq7OMQamiflYwg.png 700w"/>
                            </div>
                         </div>
                      </div>
                   </div>
                  </figure>
                  <div role="separator"><span></span><span></span><span></span></div>
                  <section>
                   <div>
                      <div>
                         <p>Unfortunately, this latest addition to Office 365 is still in its infancy lacking many features we can expect shortly. <strong>Microsoft has stated To-Do will replace Wunderlist</strong> once To-Do has all the features of Wunderlist. For more information, take a look at my <a href="https://hackernoon.com/interview-with-simon-chan-on-the-future-of-microsoft-to-do-aee3a460610" rel="noopener">interview with Senior Product Manager of Microsoft To-Do, Simon Chan.</a></p>
                         <figure>
                            <div role="button" tabIndex="0">
                               <div><img alt="Microsoft To-Do Reviews showing 4.2" src="https://miro.medium.com/max/654/1*e_jzJPos3far_9t1qqpf1w.png" width="654" height="200" role="presentation"/></div>
                            </div>
                            <figcaption>Microsoft To-Do in the Windows Store</figcaption>
                         </figure>
                         <h2>1. Create Lists and To-Dos for Everything</h2>
                         <blockquote>
                            <p>Your mind is for having ideas, not holding them — David Allen</p>
                         </blockquote>
                         <figure>
                            <div>
                               <div>
                                  <div>
                                     <div></div>
                                     <img alt="Microsoft To-Do navigation pane" width="276" height="361" role="presentation" src="https://miro.medium.com/max/276/1*-chjokMEHkKXrW1V-gJUpQ.png" sizes="276px" srcSet=""/>
                                  </div>
                               </div>
                            </div>
                            <figcaption>List of lists in Microsoft To-Do</figcaption>
                         </figure>
                         <p>David Allen is the master of to-do lists and has dedicated his life to helping people apply order to chaos and get more done. Every to-do app has two goals: improve productivity and relieve stress. Microsoft To-Do has a flexible design. <mark>Create lists for longer tasks that need multiple steps and dump the rest into the ‘To-Do’ list.</mark></p>
                      </div>
                   </div>
                  </section>
                  <div role="separator"><span></span><span></span><span></span></div>
                  <section>
                   <div>
                      <div>
                         <h3>2. Prioritize Daily</h3>
                         <blockquote>
                            <p><mark>Start by doing what’s necessary; then do what’s possible, and suddenly you are doing the impossible. — Francis of Assisi</mark></p>
                         </blockquote>
                         <p>Microsoft To-Do has a unique design based on <strong>My Day</strong>. <mark>The My Day view is used to clear the clutter from your list of today’s actionable items.</mark> Start every day by reviewing your lists and moving priority tasks to the My Day list. <mark>The </mark><mark><strong>My Day list is the heart of Microsoft To-Do and what makes it truly unique</strong></mark>. It’s designed around clearing the clutter and prioritizing what’s important for the day.</p>
                         <figure>
                            <div>
                               <div>
                                  <div>
                                     <div></div>
                                     <img alt="Details View of a Task Containing an Add to My Day Button" width="358" height="402" role="presentation" src="https://miro.medium.com/max/358/1*KBKDH2UjAas2ndtlIPd1Iw.png" sizes="358px" srcSet="https://miro.medium.com/max/276/1*KBKDH2UjAas2ndtlIPd1Iw.png 276w, https://miro.medium.com/max/358/1*KBKDH2UjAas2ndtlIPd1Iw.png 358w"/>
                                  </div>
                               </div>
                            </div>
                            <figcaption>Details View of a Task Containing an Add to My Day Button</figcaption>
                         </figure>
                         <h2>3. Ask for Help</h2>
                         <blockquote>
                            <p><em>Get the master of arithmetic to show you how to square a triangle. — </em>Leonardo Da Vinci</p>
                         </blockquote>
                         <figure>
                            <div>
                               <div>
                                  <div>
                                     <div></div>
                                     <img alt="leonardo da vinci notatki" width="560" height="769" role="presentation" src="https://miro.medium.com/max/560/1*HL9DMrZ4Rb88g9bMulr7xQ.png" sizes="560px" srcSet="https://miro.medium.com/max/276/1*HL9DMrZ4Rb88g9bMulr7xQ.png 276w, https://miro.medium.com/max/552/1*HL9DMrZ4Rb88g9bMulr7xQ.png 552w, https://miro.medium.com/max/560/1*HL9DMrZ4Rb88g9bMulr7xQ.png 560w"/>
                                  </div>
                               </div>
                            </div>
                            <figcaption>Page from Leonardo Da Vinci’s Journal</figcaption>
                         </figure>
                         <p>In Leonardo Da Vinci’s 500-year-old to-do list there were a ton of to-do items where he planned to ask others how things work. Leonardo’s relentless pursuit of knowledge is a lesson for us all. Unfortunately, Microsoft To-Do doesn’t have the ability to share tasks. Microsoft is pitching To-Do as the latest evolution of Wunderlist, as such, they have promised to add all of the features of Wunderlist. Sharing tasks with others is coming soon!</p>
                         <h2>4. Stay Secure &amp; Compliant</h2>
                         <p><strong>Security &amp; Compliance is where Microsoft To-Do stands apart</strong>. Under Satya’s leadership, <mark>Microsoft</mark> has been focused on the enterprise and that means security and compliance everywhere. Microsoft To-Do integrates directly into  tasks so the security and compliance features of your <a href="https://hackernoon.com/19-reasons-exchange-online-is-winning-195f2188150d" rel="noopener">Exchange Online</a> mailbox are built right into the new app.</p>
                         <h2>5. Create a Bucket List</h2>
                         <blockquote>
                            <p><mark>My mission in life is not merely to survive, but to thrive; and to do so with some passion, some compassion, some humor, and some style. — Maya Angelou</mark></p>
                         </blockquote>
                         <figure>
                            <div>
                               <div>
                                  <div>
                                     <div></div>
                                     <img alt="Bucket List" width="617" height="360" role="presentation" src="https://miro.medium.com/max/617/1*5KUsEh04SV-5H5B5bcnI-g.png" sizes="617px" srcSet="https://miro.medium.com/max/276/1*5KUsEh04SV-5H5B5bcnI-g.png 276w, https://miro.medium.com/max/552/1*5KUsEh04SV-5H5B5bcnI-g.png 552w, https://miro.medium.com/max/617/1*5KUsEh04SV-5H5B5bcnI-g.png 617w"/>
                                  </div>
                               </div>
                            </div>
                         </figure>
                         <p>We all have life goals. From getting more organized to finding more time to annoy our wives. Put all of these long-term goals in a list and review them daily, weekly, or monthly. When possible, create a to-do item to get yourself closer to your dreams. <strong>With the To-do app, you can create reoccurring reminders to help remind you to take small steps to making your life goals a reality.</strong></p>
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
