/**
 * BetMatch — Shared Navigation
 * ─────────────────────────────
 * Drop <script src="nav.js"></script> into <head> on any page.
 * The nav injects itself automatically and marks the current page active.
 *
 * To add a page:  add an entry to PAGES below.
 * To change the CTA: update CTA_LABEL / CTA_HREF.
 * To restyle: edit NAV_CSS.
 */

(function () {

  /* ── Config ─────────────────────────────────────────────────────── */

  var PAGES = [
    { label: 'Home',             href: 'index.html' },
    { label: 'Operator Finder',  href: 'operator-finder.html' },
    { label: 'Fun Quiz',         href: 'which-betting-operator-are-you.html' },
  ];

  var CTA_LABEL = 'Find My Operator &rarr;';
  var CTA_HREF  = 'operator-finder.html';

  /* ── CSS ─────────────────────────────────────────────────────────── */

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
    '  display: flex; align-items: center; gap: 26px;',
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
    '@media (max-width: 600px) {',
    '  #bmn { padding: 0 18px; }',
    '  #bmn .bmn-link { display: none; }',
    '}',
  ].join('\n');

  /* ── Helpers ─────────────────────────────────────────────────────── */

  function currentPage() {
    var path = window.location.pathname;
    var file = path.split('/').pop();
    // Treat empty string or just '/' as the homepage
    return file === '' ? 'index.html' : file;
  }

  function injectCSS() {
    var style = document.createElement('style');
    style.id  = 'bmn-styles';
    style.textContent = NAV_CSS;
    document.head.appendChild(style);
  }

  function injectNav() {
    var active = currentPage();

    // Build page links
    var linksHtml = PAGES.map(function (page) {
      var isActive = active === page.href ? ' bmn-active' : '';
      return '<a href="' + page.href + '" class="bmn-link' + isActive + '">' + page.label + '</a>';
    }).join('');

    // Build nav element
    var nav = document.createElement('nav');
    nav.id = 'bmn';
    nav.setAttribute('aria-label', 'Main navigation');
    nav.innerHTML =
      '<a href="index.html" class="bmn-logo">BetMatch</a>' +
      '<div class="bmn-links">' +
        linksHtml +
        '<a href="' + CTA_HREF + '" class="bmn-cta">' + CTA_LABEL + '</a>' +
      '</div>';

    // Prepend to body
    document.body.insertBefore(nav, document.body.firstChild);
  }

  /* ── Init ─────────────────────────────────────────────────────────── */

  injectCSS();

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectNav);
  } else {
    // DOM already ready (script loaded with defer or at bottom of body)
    injectNav();
  }

})();
