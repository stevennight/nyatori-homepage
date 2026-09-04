import { TypingLines } from './typing-lines';

export default function Home() {
  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="brand" href="#top" aria-label="返回首页">
          <span aria-hidden="true" className="brand-mark">N</span>
          <span>nyatori.com</span>
        </a>
        <span className="availability">
          <span aria-hidden="true" className="status-dot" />
          ONLINE
        </span>
      </header>

      <main id="top" className="hero">
        <section className="intro" aria-labelledby="page-title">
          <p className="eyebrow">
            <span aria-hidden="true">01</span>
            PERSONAL INDEX
          </p>
          <h1 id="page-title">Nyatori</h1>
          <div className="role-row">
            <span className="prompt" aria-hidden="true">&gt;</span>
            <TypingLines />
          </div>
          <p className="statement">把想法写进现实。</p>
        </section>

        <aside className="portrait" aria-label="Nyatori 像素头像">
          <div className="portrait-frame">
            <span className="corner-label corner-label-top">AVATAR_01</span>
            <img
              src="/nyatori-avatar.png"
              alt="一只戴着耳机、使用笔记本电脑的黑色像素猫"
              width="1024"
              height="1024"
            />
            <span className="corner-label corner-label-bottom">1024 PX</span>
          </div>
        </aside>

        <div className="system-line" aria-hidden="true">
          <span>HELLO, WORLD.</span>
          <span className="system-rule" />
          <span>NYATORI.COM</span>
        </div>
      </main>

      <footer className="site-footer">
        <span>&copy; {new Date().getFullYear()} NYATORI</span>
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
