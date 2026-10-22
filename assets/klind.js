/* Skórka wg wzoru: menu w pigułce, karuzele usług i opinii. */
(function () {
  var b = document.querySelector('.kh-burger');
  var m = document.querySelector('.kmenu');
  if (b && m) {
    function set(open) {
      document.body.classList.toggle('menu-open', open);
      b.setAttribute('aria-expanded', open ? 'true' : 'false');
      m.setAttribute('aria-hidden', open ? 'false' : 'true');
    }
    b.addEventListener('click', function () { set(!document.body.classList.contains('menu-open')); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') set(false); });
    m.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { set(false); }); });
  }

  // karuzela usług: strzałki + pasek postępu
  document.querySelectorAll('[data-kx-slider]').forEach(function (box) {
    var tr = box.querySelector('.kx-track');
    var bar = box.querySelector('.kx-prog i');
    var prev = box.querySelector('[data-prev]');
    var next = box.querySelector('[data-next]');
    if (!tr) return;
    function step() { var c = tr.querySelector('.kx-card'); return c ? c.getBoundingClientRect().width + 40 : 300; }
    function upd() {
      if (!bar) return;
      var max = tr.scrollWidth - tr.clientWidth;
      var vis = tr.clientWidth / tr.scrollWidth;
      bar.style.width = (vis * 100) + '%';
      bar.style.left = (max > 0 ? (tr.scrollLeft / max) * (100 - vis * 100) : 0) + '%';
    }
    if (prev) prev.addEventListener('click', function () { tr.scrollBy({ left: -step(), behavior: 'smooth' }); });
    if (next) next.addEventListener('click', function () { tr.scrollBy({ left: step(), behavior: 'smooth' }); });
    tr.addEventListener('scroll', upd, { passive: true });
    window.addEventListener('resize', upd);
    upd();
  });

  // opinie: przełączanie cytatów
  var qs = document.querySelectorAll('.kx-q');
  if (qs.length > 1) {
    var i = 0;
    function show(n) { qs[i].classList.remove('on'); i = (n + qs.length) % qs.length; qs[i].classList.add('on'); }
    var p = document.querySelector('[data-qprev]'), n = document.querySelector('[data-qnext]');
    if (p) p.addEventListener('click', function () { show(i - 1); });
    if (n) n.addEventListener('click', function () { show(i + 1); });
  }
})();
