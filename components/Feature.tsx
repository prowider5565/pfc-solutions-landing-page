const DEFAULT_TEXT =
  "Brand owners can now create a powerful AI chatbot without any coding skills, streamlining your operations and focusing on what you do best. Use your own data seamlessly to make the chatbot unique to your brand.";

const CARDS = [
  { icon: "feature_4_1.svg", title: "AI Chatbot powered by ChatGPT", text: DEFAULT_TEXT },
  {
    icon: "feature_4_2.svg",
    title: "Customize look and feel",
    text: "Whether you're an influencer, musician, or local business owner, Arsturn allows you to train chatbots on diverse types of information. Save time by having a chatbot handle FAQs, event details, and fan engagement.",
  },
  { icon: "feature_4_3.svg", title: "Share your AI chatbot", text: DEFAULT_TEXT },
  { icon: "feature_4_4.svg", title: "Multi-Channel Integration easily", text: DEFAULT_TEXT },
  { icon: "feature_4_5.svg", title: "Powered by ChatGPT & Gemini AI", text: DEFAULT_TEXT },
  { icon: "feature_4_6.svg", title: "A Multilingual chatbot support", text: DEFAULT_TEXT },
];

export default function Feature() {
  return (
    <section className="feature-area2 space" id="features-sec">
      <div className="container th-container5">
        <div className="row justify-content-center">
          <div className="col-lg-9">
            <div className="title-area text-center">
              <span className="sub-title style3 text-anime-style-2">[ Key Features ]</span>
              <h2 className="sec-title h3 text-anime-style-3">
                An AI chatbot bot trained to answer questions about EmbedAI.
              </h2>
            </div>
          </div>
        </div>
        <div className="row gy-4">
          {CARDS.map((card) => (
            <div className="col-md-6 col-xl-4" key={card.icon}>
              <div className="feature-grid4">
                <div className="shape"></div>
                <div className="box-icon">
                  <img src={`/assets/img/icon/${card.icon}`} alt="icon" />
                </div>
                <div>
                  <h3 className="box-title">{card.title}</h3>
                  <p className="box-text">{card.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
