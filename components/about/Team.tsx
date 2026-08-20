const MEMBERS = [
  { img: "team_1_1.png", name: "Jems Olive", role: "Manager" },
  { img: "team_1_2.png", name: "Anya Smith", role: "Designer" },
  { img: "team_1_3.png", name: "Carlos Johnson", role: "Developer" },
];

const SOCIALS = [
  { href: "https://facebook.com/", icon: "fab fa-facebook-f" },
  { href: "https://twitter.com/", icon: "fab fa-twitter" },
  { href: "https://instagram.com/", icon: "fab fa-instagram" },
  { href: "https://linkedin.com/", icon: "fab fa-linkedin-in" },
];

/** Source: about.html:903-984 */
export default function Team() {
  return (
    <section className="team-sec space-top overflow-hidden">
      <div className="container z-index-common">
        <div className="row justify-content-center">
          <div className="col-xl-9">
            <div className="title-area text-center pe-xl-5 ps-xl-5">
              <span className="sub-title style3 text-anime-style-2">[ Team Members ]</span>
              <h2 className="sec-title style2 text-anime-style-3">
                Meet the Innovators Behind Aior&apos;s AI and Robotics Team
              </h2>
            </div>
          </div>
        </div>
        <div className="row gy-3">
          {MEMBERS.map((member) => (
            <div className="col-md-6 col-xl-4" key={member.img}>
              <div className="th-team team-card">
                <div className="box-img">
                  <img src={`/assets/img/team/${member.img}`} alt="Team" />
                  <div className="box-shape">
                    <img src="/assets/img/team/team-shape.png" alt="" />
                  </div>
                </div>
                <div className="box-content">
                  <div>
                    <h3 className="box-title">
                      <a href="team-details.html">{member.name}</a>
                    </h3>
                    <span className="team-desig">{member.role}</span>
                  </div>
                  <div className="th-social">
                    {SOCIALS.map((social) => (
                      <a target="_blank" href={social.href} key={social.href}>
                        <i className={social.icon}></i>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
