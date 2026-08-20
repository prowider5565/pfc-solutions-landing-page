const ANSWER =
  "Aior is a task management platform designed for startups and growing teams. It helps you organize projects.. They are devoted to delivering customized support and can provide you with an extensive estimate tailored to your unique ";

// The second item ships pre-expanded in the template (source lines 1068-1086).
const ITEMS = [
  { question: "1. How long does it take to set up Zipchat?", delay: ".1s", open: false },
  { question: "2. How does it work?", delay: ".3s", open: true },
  { question: "3. does it work on any site/CMS?", delay: ".5s", open: false },
  { question: "4. What languages does it speak?", delay: ".7s", open: false },
  { question: "5. can you integrate with CRM and support platform?", delay: ".8s", open: false },
];

export default function Faq() {
  return (
    <div
      className="faq-area3 position-relative overflow-hidden space overflow-hidden"
      id="faq-sec"
    >
      <div className="container th-container5">
        <div className="row gy-4 justify-content-center">
          <div className="col-xl-6">
            <div className="title-area mb-40 text-center">
              <span className="sub-title style3 text-anime-style-2">[ FAQ ]</span>
              <h2 className="sec-title h3 text-anime-style-3">Frequently Ask Questions</h2>
            </div>
            <div className="btn-group wow fadeInUp justify-content-center mb-60 text-center">
              <a href="/contact" className="th-btn2 btn-gradient extra style1">
                View All
              </a>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="accordion-area accordion" id="faqAccordion">
              {ITEMS.map((item, i) => {
                const n = i + 1;
                return (
                  <div
                    className={`accordion-card style3 ${item.open ? "active" : ""} wow fadeInUp`}
                    data-wow-delay={item.delay}
                    key={n}
                  >
                    <h3 className="accordion-header" id={`heading-${n}`}>
                      <button
                        className={`accordion-button ${item.open ? "" : "collapsed"}`}
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#collapse-${n}`}
                        aria-expanded={item.open}
                        aria-controls={`collapse-${n}`}
                      >
                        {item.question}{" "}
                      </button>
                    </h3>

                    <div
                      id={`collapse-${n}`}
                      className={`accordion-collapse collapse ${item.open ? "show" : ""}`}
                      aria-labelledby={`heading-${n}`}
                      data-bs-parent="#faqAccordion"
                      role="region"
                    >
                      <div className="accordion-body">
                        <p className="faq-text">{ANSWER}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
