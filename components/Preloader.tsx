export default function Preloader() {
  return (
    <>
      <div className="mouseCursor cursor-outer"></div>
      <div className="mouseCursor cursor-inner"></div>

      <div id="preloader">
        <div className="preloader-bg preloader-bg-one"></div>
        <div className="preloader-bg preloader-bg-two"></div>
        <div className="loader-wrapper">
          <span className="loader-letter">A</span>
          <span className="loader-letter">I</span>
          <span className="loader-letter">O</span>
          <span className="loader-letter">R</span>
          <div className="loader"></div>
        </div>
      </div>
    </>
  );
}
