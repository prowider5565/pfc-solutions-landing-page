const STEPS = [
  { number: "STEP - 01", title: "Integrate", text: "Connect with your website or app in minutes.", delay: ".2s" },
  { number: "STEP - 02", title: "Automate", text: "Train your chatbot with FAQs or let AI learn instantly.", delay: ".4s" },
  { number: "STEP - 03", title: "Engage", text: "Start conversations and convert more visitors.", delay: ".6s" },
];

export default function Process() {
  return (
    <section className="space overflow-hidden position-relative space">
      <div className="container th-container5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="title-area text-center">
              <span className="sub-title style3 text-anime-style-2">[ How it works ]</span>
              <h2 className="sec-title h3 text-anime-style-3">Your AI Assistant in 3 Easy Steps</h2>
            </div>
          </div>
        </div>
        <div className="row gy-4 align-items-center">
          <div className="col-xl-6">
            <div className="row gy-4">
              {STEPS.map((step) => (
                <div className="col-12" key={step.number}>
                  <div className="process-card2 wow fadeInUp" data-wow-delay={step.delay}>
                    <span className="number">{step.number}</span>
                    <div className="box-content">
                      <h2 className="box-title">{step.title}</h2>
                      <p className="box-text">{step.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-xl-6">
            <div className="process-image">
              <img src="/assets/img/normal/process-image.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
