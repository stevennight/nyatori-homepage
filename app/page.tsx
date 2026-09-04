import { BUILD_DATE, BUILD_REVISION } from './build-info';
import { InteractiveHero } from './interactive-hero';

export default function Home() {
  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="brand" href="#top" aria-label="返回首页">
          <span aria-hidden="true" className="brand-mark">
            N
          </span>
          <span>nyatori.com</span>
        </a>
        <span className="availability">
          <span aria-hidden="true" className="status-dot" />
          ONLINE
        </span>
      </header>

      <InteractiveHero />

      <footer className="site-footer">
        <span>&copy; {new Date().getFullYear()} NYATORI</span>
        <span
          className="build-info"
          aria-label={`构建日期 ${BUILD_DATE}，版本 ${BUILD_REVISION}`}
        >
          <span>BUILD {BUILD_DATE}</span>
          <span aria-hidden="true">·</span>
          <span>REV {BUILD_REVISION}</span>
        </span>
        <a
          href="https://beian.miit.gov.cn/"
          target="_blank"
          rel="noopener noreferrer"
        >
          粤ICP备20029522号-1
        </a>
      </footer>
    </div>
  );
}
