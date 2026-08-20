const INTEGRATION_ICONS = [1, 2, 3, 4, 5, 6, 7, 8];

export default function CtaTwo() {
  return (
    <div className="space overflow-hidden">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="title-area text-center">
              <span className="sub-title style3 text-anime-style-2">[ Integrations ]</span>
              <h2 className="sec-title h3 text-anime-style-3">
                Connect Aiorbot to The Apps You Love
              </h2>
            </div>
          </div>
        </div>
        <div className="integration-area">
          <div className="integration-wrapp">
            <div>
              <div className="integration-shape">
                <img src="/assets/img/shape/line-shape3.png" alt="" />
              </div>
              <div className="integration-logo">
                <img src="/assets/img/shape/logo2.png" alt="" />
              </div>
            </div>
          </div>
          <div className="box-wrapp">
            {INTEGRATION_ICONS.map((n) => (
              <div className="integration-icon" key={n}>
                <img src={`/assets/img/icon/icon${n}.svg`} alt="" />
              </div>
            ))}
          </div>
          <div className="btn-group mt-80 justify-content-center flex-column">
            <a href="integrations.html" className="th-btn2 btn-gradient">
              Find Your Workflow
            </a>
            <span className="fs-18">and 120+ tools to integrate</span>
          </div>
        </div>
      </div>
    </div>
  );
}
