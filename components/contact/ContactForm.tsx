const SERVICES = [
  "Bridal Makeup",
  "Beard Treatments",
  "Hair Coloring",
  "Aromatherapy ",
];

/** Source: contact.html:509-564
 *  The form posts to mail.php, which does not exist under Next.js — see the
 *  note in the port summary. Kept verbatim so the markup matches the template;
 *  wiring a real endpoint is a separate task. */
export default function ContactForm() {
  return (
    <section
      className="contact-sec space overflow-hidden"
      data-bg-src="/assets/img/bg/contact_bg_1.jpg"
      id="contact-sec"
    >
      <div className="container th-container4">
        <div className="contact-area">
          <div className="row gy-40 gx-100 align-items-end">
            <div className="col-xl-8">
              <form action="mail.php" method="POST" className="contact-form ajax-contact">
                <h3 className="title">Ready to Discuss your Project with us?</h3>
                <div className="row">
                  <div className="form-group col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      id="name"
                      placeholder="Full Name"
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      id="email"
                      placeholder="Email"
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <input
                      type="tel"
                      className="form-control"
                      name="number"
                      id="number"
                      placeholder="Phone Number"
                    />
                  </div>
                  <div className="form-group col-md-6">
                    {/* React forbids `selected` on <option>; the equivalent is
                        defaultValue on the <select>. */}
                    <select
                      name="subject"
                      id="subject"
                      className="form-select nice-select"
                      defaultValue=""
                    >
                      <option value="" disabled hidden>
                        Select Service
                      </option>
                      {SERVICES.map((s) => (
                        <option value={s.trim()} key={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group col-12">
                    <textarea
                      name="message"
                      id="message"
                      cols={30}
                      rows={3}
                      className="form-control"
                      placeholder="Your Message"
                    ></textarea>
                  </div>
                  <div className="form-btn col-12">
                    <p className="box-text">
                      By sending this form I confirm that I have read and accept the Privacy Policy
                    </p>
                    <button className="th-btn">
                      Send Message{" "}
                      <span className="icon">
                        <img src="/assets/img/icon/arrow-right.svg" alt="" />
                      </span>
                    </button>
                  </div>
                </div>
                <p className="form-messages mb-0 mt-3"></p>
              </form>
            </div>
            <div className="col-xl-4">
              <div className="contact-review">
                <div className="box-profile">
                  <div className="box-author">
                    <img src="/assets/img/normal/author.png" alt="Avater" />
                  </div>
                  <div className="box-quote">
                    <img src="/assets/img/icon/quote3.svg" alt="" />
                  </div>
                </div>
                <p className="box-text">
                  The collaborative approach they took was refreshing and effective
                </p>
                <div className="box-info">
                  <h3 className="box-title">Jems Colin</h3>
                  <span className="box-desig">CTO, Ailitic</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
