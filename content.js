/* =====================================================================
   内容文件 —— 以后只需要改这个文件
   ---------------------------------------------------------------------
   正文写法：
     · 段落之间空一行
     · 需要划线并挂批注的句子写成：{{句子内容|批注id}}
     · **加粗**   *斜体*
     · 以 "## " 开头的一行是小标题
   批注写法（在下面 ANNOTATIONS 里按 id 添加）：
     1. 纯文字   { type: 'note',  text: '...' }
     2. 引言     { type: 'quote', text: '引言文字', source: '作者，文献', link: 'pdf或网址' }
                 （text 若自带引号，如 '“a” / “b”'，就不会再自动加引号）
     3. 图片/视频 { type: 'media', image: 'images/xx.jpg', caption: '文字', link: '网址或图片' }
     任何带 link 的批注加 newTab: true → 点击直接在新标签页打开（网站不允许嵌入时用）
   ===================================================================== */

window.ESSAY_TITLE = 'What Makes\na Moment Funny?';   // \n = 换行
window.ESSAY_SUBTITLE = 'How does an ordinary event become funny to someone? — Text Precedents Essay';

/* 首页标题下的小字 */
window.HERO_LINE = '“What do you think?”';

/* 正文结尾的邀请（便利贴样式）；留空则不显示 */
window.CLOSING_NOTE = 'You have been on the receiving end of this essay all along. Select any line, and leave what it became for you.';

window.ESSAY = `
How does an ordinary event become funny to someone? I am drawn to the moment when a person finds an unexpected way to describe what happened. While looking through online posts, I saw someone describe a parking ticket as if it were a product worth reviewing. But the first speaker is not always the person who finds the humor. {{I also came across an exchange in which an experienced chicken keeper answered a question about a chicken's death by discussing its management rather than expressing grief.|m-chicken}} The keeper may have been entirely serious; the person who heard the answer found the contrast with the expected emotional response funny. **My position is that the receiver is a decisive variable in everyday humor. The person a speaker expects to address can shape which connection occurs to them and how they express it; the person who actually receives it can recognize, miss, reject, or extend that connection.** Humor therefore has no fixed status inside the original event or the words alone. It takes shape through an imagined or actual relationship between people.

{{Luigi Pirandello's attention to “ordinary incidents, common facts” helped me move away from treating humor as a special kind of subject matter.|q-pir58}} A parking ticket is an annoyance, and a death on a farm is a loss or a practical concern. Neither arrives with a label saying that it is funny. {{Pirandello also writes, “Each yes splits itself into a no.”|q-pir47}} I read this split as a way of holding incompatible attitudes toward the same occurrence: a ticket can remain a penalty while being spoken of as an unexpectedly desirable purchase. Yet a split visible to me may not be visible to another person. Someone who reads the product-review phrasing without knowing it refers to a ticket may understand the words perfectly and miss the joke. This leads me to ask whose two readings are meeting. Describing an incongruity in the finished expression is only the beginning; somebody has to perceive it, and somebody else may perceive something different.

{{Rod Martin gives the psychological account a sharper vocabulary when he calls one component of humor “the perception of incongruity” and describes “two or more incompatible interpretations of a situation.”|q-mar502a}} The word *perception* changes what I attend to. Incongruity is often described as though it could be located and measured in a sentence. I can certainly point to the two frames in the ticket example: a fine and a customer review. But their coexistence on a page does not guarantee that a reader will hold them together playfully. A recipient may find the premise forced, may lack the reference, or may take the complaint at face value. {{Martin himself includes an “emotional component” and a “social or interpersonal aspect” alongside cognition.|q-mar502b}} I therefore want to extend his account from identifying the conflicting frames to observing the moment in which someone accepts their collision as an invitation to play.

I have felt this difference during an ordinary game with friends. {{When a teammate failed to use a spider ability we needed, I described the spider as too shy to come out.|m-spider}} I was frustrated, but my friends knew the game well enough to hear the remark as playful rather than as a literal explanation. With someone unfamiliar with the ability, I would have needed to explain why a spider was involved at all. Remembering their laughter helps me understand what the remark did in that conversation, but it cannot prove that the wording alone produced the effect. The chicken keeper exchange presents the opposite possibility: the speaker did not necessarily make a joke deliberately, while the listener noticed and enjoyed a contrast the speaker may not have intended. In both moments, the receiver changes the story I can tell about where the humor began.

{{Chris Duffy argues that people with a strong sense of humor may be more “willing to accept and notice their honest reactions.”|q-duf3}} His emphasis on openness matters to me because I recognize the difference between a phrase that suddenly occurs to me and one I strain to make funny. Still, I resist locating the explanation entirely inside the speaker. {{When Duffy says “there is no shortage of material out there,” I want to add that noticing material does not tell us who can recognize an offered connection.|q-duf4}} Duffy's own story of claiming to be LinkedIn's CEO gives a useful complication. {{The platform sent a congratulatory email about his invented job; he calls that email “a better joke than anything I could ever write.”|q-duf6}} He initiated the premise, but a system he did not control gave it an unexpected next step, and he recognized that step as funnier than his initial act. This is close to what interests me in online humor: an idea can be set in motion by one person and altered by its encounter with another participant or system.

I notice a similar change when watching short videos online. Sometimes the footage draws only a small smile from me, but a caption or someone's comment makes me see an earlier moment differently. My reaction develops as I move through the post; I do not encounter one complete, unchanging object called “the joke.” {{Kenneth Goldsmith observes young people making and sharing images with “a public response in mind.”|q-gold-a}} {{He calls this activity “as much about creativity as it is about communication.”|q-gold-b}} His phrase points to a receiver who matters *before* publication, not only afterward. A speaker may reach for a product-review voice because the people they are addressing will recognize its familiar rhythm and know how to reply. Without that anticipated audience, a different description of the same ticket might come to mind. After it is posted, each review-like comment confirms the premise and adds another detail. The actual receiver can then become the next maker, taking the expression somewhere its first speaker did not plan.

The audience can also shape the first flash of an idea. After I bought a disappointing meal in the United States, a friend said she had eaten something similarly bad in the United Kingdom. {{In that conversation, I came up with the line that I could experience “American education and British cuisine” at once.|m-cuisine}} The connection between the two countries did not occur in isolation: my friend had brought the United Kingdom into our exchange, and I could count on her understanding why these were familiar study destinations to us. If I were telling the same event to someone without that context, I might describe the bad meal directly or reach for an entirely different comparison. I cannot prove exactly which thought would have occurred, but the possible listener changes which associations feel available and worth saying. This is more than an audience judging a completed joke. Even when the line feels sudden to me, it forms in a conversation with someone particular in mind. I still do not know whether it works for a person outside that setting; their response might make it playful, confusing, or simply flat.

The research of Hyelim Shin and colleagues complicates my suspicion that trying to produce humor necessarily makes it awkward. In an experiment, participants asked to finish joke prompts saw funny examples, unfunny examples, or no examples. {{The authors found that “Seeing any examples, good or bad, caused significantly funnier responses.”|q-shin}} They assessed funniness through ratings by other people, which makes reception part of the study's measure, while the examples influenced what the creators produced. This does not establish that a spontaneous comment among friends works like a laboratory prompt. It does challenge my temptation to romanticize inspiration as untouched by previous material. The person composing a remark has already been a receiver of other remarks. What has been seen, rejected, or remembered can enter the next apparently sudden connection. I can keep my interest in the felt flash of an idea while questioning the assumption that it began from nothing.

A different precedent comes from Jingyi Li's study of template-based design tools. {{Li reports a positive association between template use and “perceived creative freedom,” while the relationship with perceived originality was “weak and unstable.”|q-li}} This is a study of visual creation, not of whether an audience laughs, and its survey cannot establish what templates cause. It nevertheless gives me language for a question in my humor examples: a familiar format can help someone begin without deciding in advance what the result will mean to others. Calling a parking ticket a product review borrows a recognizable form. That form lets readers enter the premise quickly and gives them a way to contribute. The same format may feel inventive to one person and overused to another. If I call reuse simply unoriginal, I miss what a recipient can do with it; if I call every adaptation creative, I miss the possibility of fatigue. The difference becomes visible in how people respond.

{{Ashleigh Axios writes, in a different discussion of design and speculative fiction, that “the ability to recognize patterns of harm, however, is unevenly distributed.”|q-axios}} I would not equate recognizing harm with getting a joke. Her point matters here because it stops me from imagining an interchangeable, context-free audience. Experience shapes what someone notices and how much weight they give it. A person who has been fined may find the ticket review painfully apt; another may hear only a repeated internet format. An audience member's interpretation is not merely a final quality check performed after the creator's work is over. It can reveal meanings the creator anticipated poorly or did not anticipate at all. This is particularly important when a supposedly playful remark is experienced as hurtful: calling it “just a joke” does not settle what happened between the people involved.

I began with a fascination for the first person who thinks of a connection I would never have made. That moment still fascinates me, but I now see that its conditions may include a particular person waiting on the other side of the conversation. My friend helped make the “British cuisine” association possible before I spoke; the chicken keeper's practical answer became funny in another person's hearing; the parking-ticket review grew through the replies of people willing to share its premise. {{Martin distinguishes “performance humor” from “conversational humor,” and I want to take *conversation* seriously as part of how humor is made.|q-mar507}} **The receiver can shape both the connection a speaker produces and the meaning it acquires afterward.** This does not erase the first person's invention. It places that invention inside a relationship, where one event can prompt different expressions for different people, and even a carefully chosen expression can become something else when it is heard.
`;

/* 文末引用列表（小字号，支持 *斜体*） */
window.EXCERPTS_TITLE = 'Sources and materials cited';
window.EXCERPTS = [
  'Axios, Ashleigh. “Innovation Needs a Darker Imagination.” *Design Observer*, 2026, PDF p. 2.',
  'Duffy, Chris. “How to Find Laughter Anywhere.” TED transcript, PDF pp. 3–4, 6.',
  "Goldsmith, Kenneth. *Wasting Time on the Internet*, “Let's Get Lost,” p. 11.",
  'Li, Jingyi. “The Impact of Template-Based Design Tools on Gen Z Creators’ Sense of Creative Freedom and Perception of Originality.” *Journal of New Media and Economics*, vol. 3, no. 3, 2026, pp. 10–14.',
  "Martin, Rod, interviewed by Nick Kuiper. “Three Decades Investigating Humor and Laughter.” *Europe's Journal of Psychology*, vol. 12, no. 3, 2016, pp. 498–512.",
  'Pirandello, Luigi. *On Humor*, pp. 47, 58. [Complete edition and translation details for the final bibliography.]',
  'Shin, Hyelim, Katherine N. Cotter, Alexander P. Christensen, and Paul J. Silvia. “Creative Fixation Is No Laughing Matter: The Effects of Funny and Unfunny Examples on Humor Production.” Author manuscript, 2018, PDF p. 7.',
];

/* 批注。link 填 PDF 路径（可加 #page=N 直接跳页）或网址 */
window.ANNOTATIONS = {
  /* ---------- 图片 media ---------- */
  'm-chicken': { type: 'media', image: 'images/chicken-keeper.png', link: 'images/chicken-keeper.png',
    caption: '“How would you feel if one of the chickens you raised died?” — “I’d feel like I hadn’t managed them properly.” The keeper answered in earnest; the laughter came from the person who heard it.' },
  'm-spider': { type: 'media', image: 'images/shy-spider.png', link: 'images/shy-spider.png',
    caption: '“The big spider was too shy to come out.” It only worked because my friends already knew which ability I meant.' },
  'm-cuisine': { type: 'media', image: 'images/british-cuisine.png', link: 'images/british-cuisine.png',
    caption: 'A bad meal, a friend who had just mentioned the UK, and a line that needed her on the other end of the chat.' },

  /* ---------- 引言 quote ---------- */
  'q-pir58': { type: 'quote', text: 'ordinary incidents, common facts',
    source: 'Luigi Pirandello, On Humor, p. 58', link: 'pdfs/pirandello-on-humor.pdf#page=14' },
  'q-pir47': { type: 'quote', text: 'Each yes splits itself into a no',
    source: 'Luigi Pirandello, On Humor, p. 47', link: 'pdfs/pirandello-on-humor.pdf#page=3' },
  'q-mar502a': { type: 'quote', text: '“the perception of incongruity” / “two or more incompatible interpretations of a situation”',
    source: 'Rod Martin, Three Decades Investigating Humor and Laughter, p. 502', link: 'pdfs/martin-three-decades.pdf#page=5' },
  'q-mar502b': { type: 'quote', text: '“emotional component” / “social or interpersonal aspect”',
    source: 'Rod Martin, Three Decades Investigating Humor and Laughter, p. 502', link: 'pdfs/martin-three-decades.pdf#page=5' },
  'q-duf3': { type: 'quote', text: 'willing to accept and notice their honest reactions',
    source: 'Chris Duffy, How to Find Laughter Anywhere, transcript, PDF p. 3', link: 'pdfs/duffy-laughter-anywhere.pdf#page=3' },
  'q-duf4': { type: 'quote', text: 'there is no shortage of material out there',
    source: 'Chris Duffy, How to Find Laughter Anywhere, transcript, PDF p. 4', link: 'pdfs/duffy-laughter-anywhere.pdf#page=4' },
  'q-duf6': { type: 'quote', text: 'a better joke than anything I could ever write',
    source: 'Chris Duffy, How to Find Laughter Anywhere, transcript, PDF p. 6', link: 'pdfs/duffy-laughter-anywhere.pdf#page=6' },
  'q-gold-a': { type: 'quote', text: 'a public response in mind',
    source: 'Kenneth Goldsmith, Wasting Time on the Internet, “Let’s Get Lost,” p. 11', link: 'pdfs/goldsmith-wasting-time.pdf#page=8' },
  'q-gold-b': { type: 'quote', text: 'as much about creativity as it is about communication',
    source: 'Kenneth Goldsmith, Wasting Time on the Internet, “Let’s Get Lost,” p. 11', link: 'pdfs/goldsmith-wasting-time.pdf#page=8' },
  'q-shin': { type: 'quote', text: 'Seeing any examples, good or bad, caused significantly funnier responses',
    source: 'Hyelim Shin et al., Creative Fixation Is No Laughing Matter, PDF p. 7', link: 'pdfs/shin-creative-fixation.pdf#page=7' },
  'q-li': { type: 'quote', text: '“perceived creative freedom” / “weak and unstable”',
    source: 'Jingyi Li, The Impact of Template-Based Design Tools…, pp. 13–14', link: 'pdfs/li-template-tools.pdf#page=4' },
  'q-axios': { type: 'quote', text: 'the ability to recognize patterns of harm, however, is unevenly distributed',
    source: 'Ashleigh Axios, Innovation Needs a Darker Imagination, Design Observer', link: 'https://designobserver.com/innovation-needs-a-darker-imagination/', newTab: true },
  'q-mar507': { type: 'quote', text: '“performance humor” / “conversational humor”',
    source: 'Rod Martin, Three Decades Investigating Humor and Laughter, p. 507', link: 'pdfs/martin-three-decades.pdf#page=10' },

  /* ---------- 纯文字 note（模板）----------
  'n-example': { type: 'note', text: '一句辅助说明。' },
  ------------------------------------------ */
};
