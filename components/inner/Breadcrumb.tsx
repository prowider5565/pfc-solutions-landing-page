/** Inner-page title banner. Source: about.html:451-460 — identical across inner
 *  pages except for the title, which appears twice (heading + trailing crumb).
 *  Note the template's own misspelling "breadcumb" is preserved, because
 *  style.css targets those class names. */
export default function Breadcrumb({ title }: { title: string }) {
  return (
    <div className="breadcumb-wrapper " data-bg-src="/assets/img/bg/breadcumb-bg.jpg">
      <div className="container">
        <div className="breadcumb-content">
          <h1 className="breadcumb-title text-anime-style-3">{title}</h1>
          <ul className="breadcumb-menu wow fadeInUp">
            <li>
              <a href="home-ai-startup.html">Home</a>
            </li>
            <li>{title}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
