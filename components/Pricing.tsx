const FEATURES = [
  "50 Message credits/moth",
  "500,000 characters/chatbot",
  "1 Chatbot",
  "Embed on unlimited websites",
  "Upload multiple files",
  "24/7 Support",
];

type Plan = {
  name: string;
  price: string;
  subtitle: string;
  popular?: boolean;
};

const MONTHLY: Plan[] = [
  { name: "Free", price: "0", subtitle: "150 credits" },
  { name: "pro", price: "199", subtitle: "25,000 credits", popular: true },
  { name: "business", price: "599", subtitle: "95,000 credits" },
];

const YEARLY: Plan[] = [
  { name: "Free", price: "99", subtitle: "150 credits" },
  { name: "pro", price: "399", subtitle: "25,000 credits", popular: true },
  { name: "business", price: "699", subtitle: "95,000 credits" },
];

function PlanCard({ plan }: { plan: Plan }) {
  return (
    <div className="col-xl-4 col-md-6">
      <div className={`price-card style2 extra th-ani ${plan.popular ? "active" : ""}`}>
        <span className="offer-tag">
          {plan.popular ? (
            <>
              {" "}
              <img src="/assets/img/icon/star7.svg" alt="" /> Most Popular
            </>
          ) : null}
        </span>
        <div className="box-content">
          <h3 className="box-title">{plan.name}</h3>
          <h4 className="box-price">
            <span className="dollar">$</span>
            {plan.price}
            <span className="duration">/month</span>
          </h4>
          <p className="subtitle">{plan.subtitle}</p>
        </div>
        <div className="available-list">
          <ul>
            {FEATURES.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </div>
        <div className="btn-group">
          {" "}
          <a href="contact.html" className="th-btn2 btn-gradient fw-btn">
            Get Started
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Pricing() {
  return (
    <section className="position-relative space-extra2-top space-bottom overflow-hidden">
      <div className="container th-container5">
        <div className="row justify-content-center align-items-center">
          <div className="col-lg-8 col-xxl-6">
            <div className="title-area mb-20 text-center">
              <span className="sub-title style3 text-anime-style-2">[ Pricing ]</span>
              <h2 className="sec-title h3 text-anime-style-3">Pricing Plan</h2>
            </div>
            <div className="sec-btn">
              <div className="pricing-tabs style8 mt-20">
                <div className="switch-area justify-content-center">
                  <label className="toggler toggler--is-active ms-0" id="filt-monthly">
                    Monthly
                  </label>
                  <div className="toggle">
                    <input type="checkbox" id="switcher" className="check" defaultChecked={false} />
                    <b className="b switch"></b>
                  </div>
                  <label className="toggler" id="filt-yearly">
                    Yearly
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="monthly" className="wrapper-full">
          <div className="row gy-4 justify-content-center">
            {MONTHLY.map((plan) => (
              <PlanCard plan={plan} key={plan.name} />
            ))}
          </div>
        </div>
        <div id="yearly" className="wrapper-full hide">
          <div className="row gy-4 justify-content-center">
            {YEARLY.map((plan) => (
              <PlanCard plan={plan} key={plan.name} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
