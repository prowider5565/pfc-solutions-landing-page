const RECENT_POSTS = [
  {
    img: "recent-post-1-1.jpg",
    date: "january 02, 2026",
    title: "Developing AI systems that scale efficiently as data.",
  },
  {
    img: "recent-post-1-2.jpg",
    date: "january 25, 2026",
    title: "Addressing issues related to AI fairness, transparency",
  },
  {
    img: "recent-post-1-3.jpg",
    date: "26 january, 2026",
    title: "AI chatbot integration refers to embedding.",
  },
];

/** Off-canvas side menu, opened by .sideMenuToggler in HeaderLayout1.
 *  Source: about.html:87-149 (identical in contact.html). */
export default function Sidemenu() {
  return (
    <div className="sidemenu-wrapper ">
      <div className="sidemenu-content">
        <button className="closeButton sideMenuCls">
          <i className="far fa-times"></i>
        </button>
        <div className="widget footer-widget mb-0">
          <div className="th-widget-about">
            <div className="about-logo">
              <a href="index.html">
                <img src="/assets/img/logo.svg" alt="Aior " />
              </a>
            </div>
            <p className="about-text">
              Aior is a Canada-based startup design agency specializing in modern, user-centric
              digital experiences. We help brands grow through strategic design, branding, and
              creative innovation.
            </p>
            <div className="th-social mb-40">
              <a href="https://www.facebook.com/">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://www.twitter.com/">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://www.youtube.com/">
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a href="https://www.linkedin.com/">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="https://www.youtube.com/">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="widget footer-widget">
          <h3 className="widget_title">Recent Posts</h3>
          <div className="recent-post-wrap">
            {RECENT_POSTS.map((post) => (
              <div className="recent-post" key={post.img}>
                <div className="media-img">
                  <a href="blog-details.html">
                    <img src={`/assets/img/blog/${post.img}`} alt="Blog Image" />
                  </a>
                </div>
                <div className="media-body">
                  <div className="recent-post-meta">
                    <a href="blog.html">
                      <i className="fa-sharp fa-solid fa-calendar-days"></i>
                      {post.date}
                    </a>
                  </div>
                  <h4 className="post-title">
                    <a className="text-inherit" href="blog-details.html">
                      {post.title}
                    </a>
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
