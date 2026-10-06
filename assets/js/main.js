/* Try Istria – site behaviour (no dependencies) */
(function () {
'use strict';
var cfg = { wa: '385915577230', email: 'info@tryistria.com', form: {} };
try {
var cfgEl = document.getElementById('vi-i18n');
if (cfgEl) { cfg = JSON.parse(cfgEl.textContent); }
} catch (err) { /* keep defaults */ }
var WA_NUMBER = cfg.wa;
var EMAIL = cfg.email;
var L = cfg.form || {};
document.addEventListener('error', function (e) {
var t = e.target;
if (t && t.tagName === 'IMG') { t.classList.add('img-missing'); }
}, true);
var toggle = document.querySelector('.nav-toggle');
var nav = document.getElementById('site-nav');
if (toggle && nav) {
toggle.addEventListener('click', function () {
var open = nav.classList.toggle('open');
toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
});
}
document.querySelectorAll('.nav .dd > button').forEach(function (btn) {
btn.addEventListener('click', function (e) {
e.stopPropagation();
var dd = btn.parentElement;
var open = dd.classList.toggle('open');
btn.setAttribute('aria-expanded', open ? 'true' : 'false');
document.querySelectorAll('.nav .dd').forEach(function (other) {
if (other !== dd) {
other.classList.remove('open');
other.firstElementChild.setAttribute('aria-expanded', 'false');
}
});
});
});
document.addEventListener('click', function (e) {
document.querySelectorAll('details.lang-dd[open]').forEach(function (d) { if (!d.contains(e.target)) d.removeAttribute('open'); });
});
document.addEventListener('keydown', function (e) {
if (e.key === 'Escape') document.querySelectorAll('details.lang-dd[open]').forEach(function (d) { d.removeAttribute('open'); d.querySelector('summary').focus(); });
});
document.addEventListener('click', function () {
document.querySelectorAll('.nav .dd.open').forEach(function (dd) {
dd.classList.remove('open');
dd.firstElementChild.setAttribute('aria-expanded', 'false');
});
});
document.addEventListener('keydown', function (e) {
if (e.key === 'Escape') {
document.querySelectorAll('.nav .dd.open').forEach(function (dd) {
dd.classList.remove('open');
dd.firstElementChild.setAttribute('aria-expanded', 'false');
});
if (nav && nav.classList.contains('open')) {
nav.classList.remove('open');
if (toggle) { toggle.setAttribute('aria-expanded', 'false'); toggle.focus(); }
}
}
});
document.querySelectorAll('[data-yt]').forEach(function (el) {
el.addEventListener('click', function () {
var id = el.getAttribute('data-yt');
var iframe = document.createElement('iframe');
iframe.src = 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(id) + '?autoplay=1&rel=0';
iframe.title = el.getAttribute('data-title') || 'Video';
iframe.allow = 'autoplay; encrypted-media; picture-in-picture';
iframe.allowFullscreen = true;
el.innerHTML = '';
el.appendChild(iframe);
}, { once: true });
});
document.querySelectorAll('[data-map]').forEach(function (el) {
el.addEventListener('click', function () {
var q = el.getAttribute('data-map');
var iframe = document.createElement('iframe');
iframe.src = 'https://www.google.com/maps?q=' + encodeURIComponent(q) + '&z=17&output=embed';
iframe.title = el.getAttribute('data-title') || 'Map';
iframe.loading = 'lazy';
iframe.referrerPolicy = 'no-referrer-when-downgrade';
el.innerHTML = '';
el.appendChild(iframe);
}, { once: true });
});
var form = document.getElementById('enquiry-form');
if (form) {
var status = document.getElementById('form-status');
var build = function () {
var f = form.elements;
var opt = f.service.options[f.service.selectedIndex];
var lines = [
L.msgHello,
L.msgService + ': ' + (opt ? opt.text : f.service.value),
f.date.value ? L.msgDate + ': ' + f.date.value : '',
L.msgAdults + ': ' + (f.adults.value || '1'),
L.msgKids + ': ' + (f.kids.value.trim() || '0'),
f.message.value ? L.msgMessage + ': ' + f.message.value : '',
L.msgName + ': ' + f.name.value,
f.contact.value ? L.msgContact + ': ' + f.contact.value : ''
].filter(Boolean);
return lines.join('\n');
};
var validate = function () {
if (!form.checkValidity()) { form.reportValidity(); return false; }
return true;
};
form.addEventListener('submit', function (e) {
e.preventDefault();
if (!validate()) { return; }
var url = 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(build());
window.open(url, '_blank', 'noopener');
if (status) { status.textContent = L.statusWhatsapp || ''; }
});
var mailBtn = document.getElementById('send-email');
if (mailBtn) {
mailBtn.addEventListener('click', function () {
if (!validate()) { return; }
var so = form.elements.service.options[form.elements.service.selectedIndex];
var subject = (L.emailSubject || 'Enquiry') + ': ' + (so ? so.text : '');
window.location.href = 'mailto:' + EMAIL + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(build());
if (status) { status.textContent = L.statusEmail || ''; }
});
}
try {
var p = new URLSearchParams(window.location.search).get('service');
if (p) {
Array.prototype.forEach.call(form.elements.service.options, function (o) {
if (o.value === p) { form.elements.service.value = p; }
});
}
} catch (err) { /* older browsers: ignore */ }
}
var gb = document.getElementById('guestbook-form');
if (gb) {
gb.addEventListener('submit', function (e) {
e.preventDefault();
if (!gb.checkValidity()) { gb.reportValidity(); return; }
var f = gb.elements;
var so2 = f.service.options[f.service.selectedIndex];
var body = (L.msgName || 'Name') + ': ' + f.name.value + '\n' + (L.guestServiceLabel || 'Service') + ': ' + (so2 ? so2.text : '') + '\n\n' + f.message.value;
window.location.href = 'mailto:' + EMAIL + '?subject=' + encodeURIComponent(L.guestSubject || 'Guest feedback') + '&body=' + encodeURIComponent(body);
});
}
(function () {
var T = { en: ['Close', 'Previous photo', 'Next photo'], de: ['Schließen', 'Vorheriges Foto', 'Nächstes Foto'], it: ['Chiudi', 'Foto precedente', 'Foto successiva'], fr: ['Fermer', 'Photo précédente', 'Photo suivante'], hu: ['Bezárás', 'Előző fotó', 'Következő fotó'], cs: ['Zavřít', 'Předchozí fotografie', 'Další fotografie'], pl: ['Zamknij', 'Poprzednie zdjęcie', 'Następne zdjęcie'], hr: ['Zatvori', 'Prethodna fotografija', 'Sljedeća fotografija'] };
var t = T[(document.documentElement.lang || 'en').slice(0, 2)] || T.en;
var imgs = Array.prototype.filter.call(document.querySelectorAll('main img, .page-hero img, .gallery img'), function (im) {
return !im.closest('a') && !im.closest('button') && !im.classList.contains('img-missing') && im.offsetParent !== null;
});
imgs = imgs.filter(function (im, i) { return imgs.indexOf(im) === i; });
if (!imgs.length) { return; }
var box = document.createElement('div');
box.className = 'lb'; box.hidden = true; box.setAttribute('role', 'dialog'); box.setAttribute('aria-modal', 'true');
box.innerHTML = '<button type="button" class="lb-x" aria-label="' + t[0] + '">&times;</button>' +
'<button type="button" class="lb-nav lb-prev" aria-label="' + t[1] + '">&#8249;</button>' +
'<figure><img alt=""><figcaption></figcaption></figure>' +
'<button type="button" class="lb-nav lb-next" aria-label="' + t[2] + '">&#8250;</button>';
document.body.appendChild(box);
var big = box.querySelector('img'), cap = box.querySelector('figcaption'), cur = 0, last = null;
function show(i) {
cur = (i + imgs.length) % imgs.length;
var im = imgs[cur];
big.src = im.currentSrc || im.src; big.alt = im.alt || '';
cap.textContent = im.alt || '';
box.querySelector('.lb-prev').hidden = box.querySelector('.lb-next').hidden = imgs.length < 2;
}
function open(i) { last = document.activeElement; show(i); box.hidden = false; document.documentElement.classList.add('lb-open'); box.querySelector('.lb-x').focus(); }
function close() { box.hidden = true; document.documentElement.classList.remove('lb-open'); big.removeAttribute('src'); if (last && last.focus) { last.focus(); } }
imgs.forEach(function (im, i) {
im.classList.add('zoomable'); im.setAttribute('tabindex', '0');
im.addEventListener('click', function () { open(i); });
im.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(i); } });
});
box.addEventListener('click', function (e) {
if (e.target.closest('.lb-prev')) { show(cur - 1); }
else if (e.target.closest('.lb-next')) { show(cur + 1); }
else if (e.target.closest('.lb-x') || !e.target.closest('figure img')) { close(); }
});
document.addEventListener('keydown', function (e) {
if (box.hidden) { return; }
if (e.key === 'Escape') { close(); }
else if (e.key === 'ArrowLeft') { show(cur - 1); }
else if (e.key === 'ArrowRight') { show(cur + 1); }
});
var sx = null;
box.addEventListener('touchstart', function (e) { sx = e.touches[0].clientX; }, { passive: true });
box.addEventListener('touchend', function (e) {
if (sx === null) { return; }
var dx = e.changedTouches[0].clientX - sx; sx = null;
if (Math.abs(dx) > 50) { show(cur + (dx < 0 ? 1 : -1)); }
});
})();
var y = document.getElementById('year');
if (y) { y.textContent = new Date().getFullYear(); }
})();