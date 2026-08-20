/** Source: contact.html:464-505 */
export default function ContactInfo() {
  return (
    <div className="space overflow-hidden">
      <div className="container">
        <div className="row gy-4">
          <div className="col-xl-4 col-md-6">
            <div className="contact-media">
              <div className="icon-btn">
                <i className="fa-sharp fa-solid fa-location-dot"></i>
              </div>
              <div className="media-body">
                <h2 className="box-title">Location</h2>
                <p className="box-text">300 SW 1st Ave, Suite 155, Fort Lauderdale, FL 33301</p>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-md-6">
            <div className="contact-media">
              <div className="icon-btn">
                <i className="fa-sharp fa-solid fa-envelope"></i>
              </div>
              <div className="media-body">
                <h2 className="box-title">Email</h2>
                <p className="box-text">
                  <a href="mailto:team@example.com">team@example.com</a>
                  <a href="mailto:aiors@example.com">aiors@example.com</a>
                </p>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-md-6">
            <div className="contact-media">
              <div className="icon-btn">
                <i className="fa-sharp fa-solid fa-phone"></i>
              </div>
              <div className="media-body">
                <h2 className="box-title">Phone Number</h2>
                <a href="tel:+00123456789">+(00) 12 - 345 6789</a>
                <a href="tel:+00109876543">+(00) 10 - 9876 543</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
