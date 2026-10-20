/* deck-presenter.js — Northline deck-builder presenter mode
 *
 * Opens same-origin /deck-builder/presenter.html (not about:blank + document.write).
 *
 * Keys: S = open presenter · #/N deep-link
 * Notes: <aside class="notes"> inside each .slide (hidden from audience).
 */
(function () {
  'use strict';

  var BOOT_KEY = 'northline-deck-presenter-boot';
  var PRESENTER_PATH = '/deck-builder/presenter.html';

  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  function getPreviewIdx() {
    var m = /[?&]preview=(\d+)/.exec(location.search || '');
    return m ? parseInt(m[1], 10) - 1 : -1;
  }

  function getSlides() {
    return Array.from(document.querySelectorAll('.slide'));
  }

  function noteHTML(slide) {
    var n = slide.querySelector('aside.notes, .notes, .speaker-notes');
    return n ? n.innerHTML : '';
  }

  function slideTitle(slide, i) {
    return (
      slide.getAttribute('data-title') ||
      (slide.querySelector('h1,h2,h3') || {}).textContent ||
      'Slide ' + (i + 1)
    ).trim().replace(/\s+/g, ' ').slice(0, 80);
  }

  ready(function () {
    var slides = getSlides();
    if (!slides.length) return;

    var previewIdx = getPreviewIdx();
    var isPreview = previewIdx >= 0 && previewIdx < slides.length;

    if (isPreview) {
      function showPreview(i) {
        slides.forEach(function (s, j) {
          var on = j === i;
          s.classList.toggle('active', on);
          s.style.display = on ? '' : 'none';
        });
      }
      showPreview(previewIdx);
      document.documentElement.setAttribute('data-preview', '1');
      document.body.setAttribute('data-preview', '1');
      document.querySelectorAll(
        '.nav, .shortcuts-bar, .picker-overlay, aside.notes, .notes, .speaker-notes, .overview-num'
      ).forEach(function (el) { el.style.display = 'none'; });
      var stage = document.querySelector('.stage');
      if (stage) stage.style.gap = '0';
      window.addEventListener('message', function (e) {
        if (!e.data) return;
        if (e.data.type === 'preview-goto') {
          var n = parseInt(e.data.idx, 10);
          if (n >= 0 && n < slides.length) showPreview(n);
        }
      });
      try {
        window.parent && window.parent.postMessage({ type: 'preview-ready' }, '*');
      } catch (err) {}
      return;
    }

    var CHANNEL = 'northline-deck-presenter-' + location.pathname;
    var bc = null;
    try { bc = new BroadcastChannel(CHANNEL); } catch (e) {}

    var presenterWin = null;
    var cur = 0;
    slides.forEach(function (s, i) { if (s.classList.contains('active')) cur = i; });

    var hashM = /^#\/(\d+)/.exec(location.hash || '');
    if (hashM) {
      var hn = parseInt(hashM[1], 10) - 1;
      if (hn >= 0 && hn < slides.length && typeof window.show === 'function') {
        window.show(hn);
        cur = hn;
      }
    }

    var _show = window.show;
    if (typeof _show === 'function') {
      window.show = function (n, fromRemote) {
        _show(n);
        cur = ((n % slides.length) + slides.length) % slides.length;
        var hashTarget = '#/' + (cur + 1);
        if (location.hash !== hashTarget) history.replaceState(null, '', hashTarget);
        if (!fromRemote && bc) bc.postMessage({ type: 'go', idx: cur });
      };
    }

    if (bc) {
      bc.onmessage = function (e) {
        if (!e.data || e.data.type !== 'go' || typeof e.data.idx !== 'number') return;
        if (typeof window.show === 'function') window.show(e.data.idx, true);
        cur = e.data.idx;
      };
    }

    function bootPayload() {
      return {
        deckUrl: location.protocol + '//' + location.host + location.pathname,
        pathname: location.pathname,
        channel: CHANNEL,
        startIdx: cur,
        total: slides.length,
        slideMeta: slides.map(function (s, i) {
          return { title: slideTitle(s, i), notes: noteHTML(s) };
        }),
      };
    }

    function openPresenter() {
      try {
        localStorage.setItem(BOOT_KEY, JSON.stringify(bootPayload()));
      } catch (err) {
        alert('Could not store presenter data (localStorage blocked).');
        return;
      }
      var url = PRESENTER_PATH + '?t=' + Date.now();
      if (presenterWin && !presenterWin.closed) {
        try {
          presenterWin.location.href = url;
          presenterWin.focus();
          return;
        } catch (e) {
          presenterWin = null;
        }
      }
      presenterWin = window.open(url, 'northline-deck-presenter', 'width=1280,height=820,menubar=no,toolbar=no');
      if (!presenterWin) {
        alert('Allow pop-ups for this site, then press S again.');
        return;
      }
    }

    window.openDeckPresenter = openPresenter;

    document.addEventListener('keydown', function (e) {
      if (e.target && /input|textarea|select/i.test(e.target.tagName)) return;
      if (e.key === 's' || e.key === 'S') {
        if (document.getElementById('picker-overlay') && document.getElementById('picker-overlay').classList.contains('open')) return;
        e.preventDefault();
        openPresenter();
      }
    });
  });
})();
