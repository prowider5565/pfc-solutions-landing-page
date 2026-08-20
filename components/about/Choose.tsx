import type { ReactNode } from "react";

const ITEMS: { subtitle: string; number: ReactNode; text: string }[] = [
  {
    subtitle: "Trustworthy",
    number: (
      <>
        <span className="counter-number">109</span>%
      </>
    ),
    text: "Higher Than GPT 4 Turbo in Proofwriter",
  },
  {
    subtitle: "Accrurate",
    number: (
      <>
        No.0 <span className="counter-number">1</span>
      </>
    ),
    text: "Ranking in Aior Benchmark",
  },
  {
    subtitle: "Scalable",
    number: (
      <>
        <span className="counter-number">109</span>%
      </>
    ),
    text: "From and efficient 5B to Powerful 185B",
  },
  {
    subtitle: "Reliable",
    number: (
      <>
        <span className="counter-number">99.9</span>%
      </>
    ),
    text: "SLA Availability",
  },
];

/** Source: about.html:852-899 */
export default function Choose() {
  return (
    <div className="choose-area position-relative overflow-hidden space-top">
      <div className="container th-container5">
        <div className="row gy-4 justify-content-center">
          <div className="col-lg-6">
            <div className="choose-img-box">
              <div className="img1">
                <img src="/assets/img/normal/choose-img-1.jpg" alt="" />
              </div>
              <div className="title-area mb-0">
                <span className="sub-title style3 text-white text-anime-style-2">
                  [ Why Choose Us ]
                </span>
                <h2 className="sec-title h3 mb-0 text-white text-anime-style-3">
                  The Optimal Blend of Tech, Products, Expertise, and Capital
                </h2>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="choose-wrapper">
              {ITEMS.map((item) => (
                <div className="choose-item" key={item.subtitle}>
                  <div className="choose-content">
                    <span className="box-subtitle">{item.subtitle}</span>
                    <h3 className="box-number">{item.number}</h3>
                    <p className="box-text">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
