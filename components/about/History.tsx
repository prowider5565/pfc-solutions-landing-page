const YEARS = ["2009", "2012", "2014", "2016", "2018", "2022", "2024", "2026"];

// Every one of the eight tab panes contains the identical five images in the
// source (about.html:570-801), so one panel body is reused for all of them.
const HISTORY_IMAGES = [1, 2, 3, 4, 5];

function HistoryPanel() {
  return (
    <div className="history-list-area">
      {HISTORY_IMAGES.map((n, i) => (
        <div className={`history-list-wrap${i === 0 ? " active" : ""}`} key={n}>
          <div
            className="history-list"
            data-bg-src={`/assets/img/normal/history_1_${n}.jpg`}
          >
            <span className="icon-btn">
              <i className="fa-sharp fa-regular fa-plus"></i>
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

/** Source: about.html:533-807 */
export default function History() {
  return (
    <section className="space overflow-hidden position-relative space-top">
      <div className="container th-container5">
        <div className="title-area text-center">
          <span className="sub-title style3 text-anime-style-2">[ Timeline ]</span>
          <h2 className="sec-title style2 text-anime-style-3">Highlights Over The Years</h2>
        </div>
        <div className="row gy-4 flex-row-reverse">
          <div className="col-xl-2">
            <ul className="nav timing-tab" id="historyTab" role="tablist">
              {YEARS.map((year, i) => {
                const n = i + 1;
                return (
                  <li className="nav-item" role="presentation" key={year}>
                    <a
                      className={`nav-link${i === 0 ? " active" : ""}`}
                      id={`year${n}-tab`}
                      data-bs-toggle="tab"
                      href={`#year${n}`}
                      role="tab"
                      aria-controls={`year${n}`}
                      aria-selected="false"
                    >
                      {year}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="col-xl-10">
            <div className="tab-content" id="historyTabContent">
              {YEARS.map((year, i) => {
                const n = i + 1;
                return (
                  <div
                    className={`tab-pane fade${i === 0 ? " show active" : ""}`}
                    id={`year${n}`}
                    role="tabpanel"
                    aria-labelledby={`year${n}-tab`}
                    key={year}
                  >
                    <HistoryPanel />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div
        className="shape-mockup d-none d-xl-block movingX"
        data-top="20%"
        data-left="5%"
      >
        <img src="/assets/img/shape/element-6.png" alt="" />
      </div>
    </section>
  );
}
