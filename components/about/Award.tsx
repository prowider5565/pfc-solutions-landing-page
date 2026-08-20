const AWARDS = [
  { n: "1.", title: "Awards Jury", year: "2009" },
  { n: "2.", title: "Studio of the year", year: "2010" },
  { n: "3.", title: "D&AD Awards", year: "2011" },
  { n: "4.", title: "Best Innovation", year: "2012" },
];

/** Source: about.html:811-848 */
export default function Award() {
  return (
    <section
      className="award-area overflow-hidden space overflow-hidden"
      data-bg-src="/assets/img/bg/dots_bg_1.png"
    >
      <div className="title-area text-center">
        <span className="sub-title style3 text-anime-style-2">[ Awards ]</span>
        <h2 className="sec-title style2 text-anime-style-3">Awards Recognition</h2>
      </div>
      <div className="container">
        <div className="award-wrapp">
          {AWARDS.map((award) => (
            <div className="award-item" key={award.n}>
              <h3 className="box-title">
                <span className="number">{award.n}</span>
                {award.title}
              </h3>
              <div className="box-content">
                <span className="year">{award.year}</span>
                <div className="box-img">
                  {" "}
                  <img src="/assets/img/icon/awards.png" alt="" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div
        className="shape-mockup jumpAni d-none d-lg-block"
        data-top="20%"
        data-left="5%"
      >
        <img src="/assets/img/shape/element-5.png" alt="" />
      </div>
    </section>
  );
}
