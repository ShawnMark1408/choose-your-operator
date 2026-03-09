/**
 * BetMatch — Shared Navigation, Footer & Cookie Banner
 * ─────────────────────────────────────────────────────
 * Drop <script src="nav.js"></script> into <head> on any page.
 * Automatically injects: navbar, footer, cookie consent banner.
 *
 * To add a nav page:  add an entry to PAGES below.
 * To add a footer link: edit injectFooter() HTML string.
 * To change the CTA: update CTA_LABEL / CTA_HREF.
 */

(function () {

  /* ── Config ─────────────────────────────────────────────────────── */

  var PAGES = [
    { label: 'Home',             href: 'index.html' },
    { label: 'Operator Finder',  href: 'operator-finder.html' },
    { label: 'Fun Quiz',         href: 'which-betting-operator-are-you.html' },
    { label: 'Blog',             href: 'blog.html' },
    { label: 'About',            href: 'about.html' },
  ];

  var CTA_LABEL = 'Find My Operator &rarr;';
  var CTA_HREF  = 'operator-finder.html';

  var COOKIE_KEY = 'bm_cookie_ok';

  /* ── Nav CSS ─────────────────────────────────────────────────────── */

  var NAV_CSS = [
    '#bmn {',
    '  position: fixed; top: 0; left: 0; right: 0; z-index: 1000;',
    '  height: 62px; padding: 0 32px;',
    '  display: flex; align-items: center; justify-content: space-between;',
    '  background: rgba(7,7,26,0.75);',
    '  backdrop-filter: blur(18px); -webkit-backdrop-filter: blur(18px);',
    '  border-bottom: 1px solid rgba(255,255,255,0.07);',
    '  font-family: "Inter", sans-serif;',
    '}',
    '#bmn .bmn-logo {',
    '  font-family: "Bebas Neue", sans-serif;',
    '  font-size: 1.5rem; letter-spacing: 0.06em;',
    '  background: linear-gradient(135deg, #ff2d78, #00f5ff);',
    '  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;',
    '  text-decoration: none; flex-shrink: 0;',
    '}',
    '#bmn .bmn-links {',
    '  display: flex; align-items: center; gap: 22px;',
    '}',
    '#bmn .bmn-link {',
    '  font-size: 0.84rem; font-weight: 500;',
    '  color: #777799; text-decoration: none;',
    '  transition: color 0.2s;',
    '  white-space: nowrap;',
    '}',
    '#bmn .bmn-link:hover { color: #fff; }',
    '#bmn .bmn-link.bmn-active { color: #fff; }',
    '#bmn .bmn-cta {',
    '  background: linear-gradient(135deg, #00f5ff, #0099cc);',
    '  border: none; border-radius: 9px;',
    '  padding: 8px 18px;',
    '  color: #07071a; font-family: "Inter", sans-serif;',
    '  font-size: 0.83rem; font-weight: 700; letter-spacing: 0.05em;',
    '  cursor: pointer; text-decoration: none; white-space: nowrap;',
    '  transition: transform 0.2s, box-shadow 0.2s;',
    '  box-shadow: 0 0 20px rgba(0,245,255,0.25);',
    '}',
    '#bmn .bmn-cta:hover {',
    '  transform: translateY(-2px);',
    '  box-shadow: 0 0 36px rgba(0,245,255,0.45);',
    '}',
    /* Mobile: hide text links, keep logo + CTA */
    '@media (max-width: 700px) {',
    '  #bmn { padding: 0 18px; }',
    '  #bmn .bmn-link { display: none; }',
    '}',
  ].join('\n');

  /* ── Footer CSS ──────────────────────────────────────────────────── */

  var FOOTER_CSS = [
    '#bmf {',
    '  position: relative; z-index: 1;',
    '  border-top: 1px solid rgba(255,255,255,0.07);',
    '  background: #07071a;',
    '  font-family: "Inter", sans-serif;',
    '}',
    '.bmf-inner {',
    '  max-width: 1080px; margin: 0 auto;',
    '  padding: 40px 24px 52px;',
    '}',
    '.bmf-top {',
    '  display: grid;',
    '  grid-template-columns: auto 1fr auto;',
    '  gap: 24px; align-items: start;',
    '  margin-bottom: 28px;',
    '}',
    '.bmf-logo {',
    '  font-family: "Bebas Neue", sans-serif;',
    '  font-size: 1.4rem; letter-spacing: 0.06em;',
    '  background: linear-gradient(135deg, #ff2d78, #00f5ff);',
    '  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;',
    '  text-decoration: none;',
    '}',
    '.bmf-disc {',
    '  text-align: center; font-size: 0.74rem;',
    '  color: rgba(255,255,255,0.22); line-height: 1.65;',
    '}',
    '.bmf-disc a { color: rgba(255,255,255,0.38); text-decoration: none; }',
    '.bmf-disc a:hover { color: rgba(255,255,255,0.65); text-decoration: underline; }',
    '.bmf-links {',
    '  display: flex; flex-direction: column; align-items: flex-end; gap: 8px;',
    '}',
    '.bmf-links a {',
    '  font-size: 0.8rem; color: #777799; text-decoration: none;',
    '  transition: color 0.2s;',
    '}',
    '.bmf-links a:hover { color: #fff; }',
    '.bmf-bottom {',
    '  border-top: 1px solid rgba(255,255,255,0.05);',
    '  padding-top: 20px;',
    '  display: flex; flex-wrap: wrap; justify-content: space-between; gap: 8px;',
    '  font-size: 0.74rem; color: rgba(255,255,255,0.18);',
    '}',
    '.bmf-email { color: rgba(255,255,255,0.35); text-decoration: none; transition: color 0.2s; }',
    '.bmf-email:hover { color: #00f5ff; }',
    '@media (max-width: 640px) {',
    '  .bmf-top { grid-template-columns: 1fr; text-align: center; }',
    '  .bmf-links { align-items: center; flex-direction: row; flex-wrap: wrap; justify-content: center; }',
    '  .bmf-bottom { flex-direction: column; align-items: center; text-align: center; }',
    '}',
  ].join('\n');

  /* ── Cookie banner CSS ───────────────────────────────────────────── */

  var COOKIE_CSS = [
    '#bm-cookie {',
    '  position: fixed; bottom: 0; left: 0; right: 0; z-index: 999;',
    '  background: rgba(13,13,43,0.97);',
    '  backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);',
    '  border-top: 1px solid rgba(255,255,255,0.09);',
    '  padding: 14px 28px;',
    '  display: flex; align-items: center; justify-content: center;',
    '  gap: 18px; flex-wrap: wrap;',
    '  font-family: "Inter", sans-serif; font-size: 0.83rem;',
    '  color: rgba(255,255,255,0.5);',
    '  transition: transform 0.35s ease;',
    '}',
    '#bm-cookie a { color: #00f5ff; text-decoration: none; }',
    '#bm-cookie a:hover { text-decoration: underline; }',
    '#bm-cookie-btn {',
    '  background: rgba(0,245,255,0.12);',
    '  border: 1px solid rgba(0,245,255,0.35);',
    '  border-radius: 8px;',
    '  padding: 7px 20px;',
    '  color: #00f5ff;',
    '  font-family: "Inter", sans-serif; font-size: 0.82rem; font-weight: 700;',
    '  cursor: pointer; white-space: nowrap;',
    '  transition: background 0.2s;',
    '}',
    '#bm-cookie-btn:hover { background: rgba(0,245,255,0.22); }',
  ].join('\n');

  /* ── Helpers ─────────────────────────────────────────────────────── */

  function currentPage() {
    var path = window.location.pathname;
    var file = path.split('/').pop();
    return file === '' ? 'index.html' : file;
  }

  /* ── CSS injection ───────────────────────────────────────────────── */

  function injectCSS() {
    var style = document.createElement('style');
    style.id   = 'bmn-styles';
    style.textContent = NAV_CSS + '\n' + FOOTER_CSS + '\n' + COOKIE_CSS;
    document.head.appendChild(style);
  }

  /* ── Nav injection ───────────────────────────────────────────────── */

  function injectNav() {
    var active = currentPage();

    var linksHtml = PAGES.map(function (page) {
      var isActive = active === page.href ? ' bmn-active' : '';
      return '<a href="' + page.href + '" class="bmn-link' + isActive + '">' + page.label + '</a>';
    }).join('');

    var nav = document.createElement('nav');
    nav.id = 'bmn';
    nav.setAttribute('aria-label', 'Main navigation');
    nav.innerHTML =
      '<a href="index.html" class="bmn-logo">BetMatch</a>' +
      '<div class="bmn-links">' +
        linksHtml +
        '<a href="' + CTA_HREF + '" class="bmn-cta">' + CTA_LABEL + '</a>' +
      '</div>';

    document.body.insertBefore(nav, document.body.firstChild);
  }

  /* ── Footer injection ────────────────────────────────────────────── */

  function injectFooter() {
    var footer = document.createElement('footer');
    footer.id = 'bmf';
    footer.innerHTML =
      '<div class="bmf-inner">' +
        '<div class="bmf-top">' +
          '<a href="index.html" class="bmf-logo">BetMatch</a>' +
          '<div class="bmf-disc">' +
            'For entertainment purposes only. Please gamble responsibly.<br>' +
            'If gambling is affecting you, visit ' +
            '<a href="https://www.begambleaware.org" target="_blank" rel="noopener noreferrer">begambleaware.org</a>' +
            ' or call <strong>0808 8020 133</strong> (free, 24/7).<br>' +
            '<a href="https://www.gamstop.co.uk" target="_blank" rel="noopener noreferrer">GamStop</a>' +
            ' &middot; ' +
            '<a href="https://www.gamblingtherapy.org" target="_blank" rel="noopener noreferrer">Gambling Therapy</a>' +
          '</div>' +
          '<nav class="bmf-links" aria-label="Footer navigation">' +
            '<a href="about.html">About</a>' +
            '<a href="responsible-gambling.html">Responsible Gambling</a>' +
            '<a href="blog.html">Blog</a>' +
            '<a href="privacy.html">Privacy Policy</a>' +
          '</nav>' +
        '</div>' +
        '<div class="bmf-bottom">' +
          '<span>&copy; 2026 BetMatch. All rights reserved.</span>' +
          '<a href="mailto:hello@bet-match.us" class="bmf-email">hello@bet-match.us</a>' +
          '<span>18+ &middot; Not affiliated with any licensed operator</span>' +
        '</div>' +
      '</div>';

    document.body.appendChild(footer);
  }

  /* ── Cookie banner injection ─────────────────────────────────────── */

  function injectCookieBanner() {
    try { if (localStorage.getItem(COOKIE_KEY)) return; } catch (e) { return; }

    var div = document.createElement('div');
    div.id = 'bm-cookie';
    div.setAttribute('role', 'dialog');
    div.setAttribute('aria-label', 'Cookie notice');
    div.innerHTML =
      '<span>BetMatch uses cookies to remember quiz progress and your preferences. ' +
      'See our <a href="privacy.html">Privacy Policy</a>.</span>' +
      '<button id="bm-cookie-btn">Got it</button>';

    document.body.appendChild(div);

    document.getElementById('bm-cookie-btn').addEventListener('click', function () {
      try { localStorage.setItem(COOKIE_KEY, '1'); } catch (e) {}
      var el = document.getElementById('bm-cookie');
      if (el) {
        el.style.transform = 'translateY(110%)';
        setTimeout(function () { el.remove(); }, 380);
      }
    });
  }

  /* ── Init ────────────────────────────────────────────────────────── */

  injectCSS();

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      injectNav();
      injectFooter();
      injectCookieBanner();
    });
  } else {
    injectNav();
    injectFooter();
    injectCookieBanner();
  }

})();
