(function(){const d=document.createElement("link").relList;if(d&&d.supports&&d.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))g(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const m of r.addedNodes)m.tagName==="LINK"&&m.rel==="modulepreload"&&g(m)}).observe(document,{childList:!0,subtree:!0});function f(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function g(n){if(n.ep)return;n.ep=!0;const r=f(n);fetch(n.href,r)}})();document.addEventListener("DOMContentLoaded",()=>{const h=document.getElementById("nav-toggle"),d=document.getElementById("nav-links"),f=document.getElementById("main-nav");h.addEventListener("click",()=>{const e=d.classList.toggle("open");h.classList.toggle("active"),h.setAttribute("aria-expanded",e),document.body.style.overflow=e?"hidden":""}),d.querySelectorAll("a").forEach(e=>{e.addEventListener("click",()=>{d.classList.remove("open"),h.classList.remove("active"),h.setAttribute("aria-expanded","false"),document.body.style.overflow=""})});const g=()=>{window.scrollY>80?f.classList.add("scrolled"):f.classList.remove("scrolled")};window.addEventListener("scroll",g,{passive:!0}),g();const n=document.querySelectorAll(".section-header, .about-images, .about-content, .apartment-card, .experience-card, .gallery-item, .booking-info, .booking-form-wrap, .direct-booking-hint, .more-activities"),r={root:null,rootMargin:"0px 0px -60px 0px",threshold:.1},m=new IntersectionObserver(e=>{e.forEach((o,t)=>{if(o.isIntersecting){const i=o.target.parentElement.querySelectorAll(".fade-in, .fade-in-left, .fade-in-right");let l=0;i.forEach(a=>{o.target}),setTimeout(()=>{o.target.classList.add("visible")},l),m.unobserve(o.target)}})},r);n.forEach((e,o)=>{e.classList.contains("about-images")?e.classList.add("fade-in-left"):e.classList.contains("about-content")||e.classList.contains("booking-info")?e.classList.add("fade-in-right"):e.classList.add("fade-in");const t=e.parentElement,l=Array.from(t.children).filter(a=>a.classList.contains("fade-in")||a.classList.contains("fade-in-left")||a.classList.contains("fade-in-right")).indexOf(e);l>0&&(e.style.transitionDelay=`${l*.1}s`),m.observe(e)}),document.querySelectorAll(".slider-container").forEach(e=>{const o=e.querySelector(".slider-track"),t=Array.from(o.children),i=e.querySelector(".slider-next"),l=e.querySelector(".slider-prev"),a=e.querySelector(".slider-dots");let s=0;t.forEach((c,x)=>{const w=document.createElement("div");w.classList.add("slider-dot"),x===0&&w.classList.add("active"),w.addEventListener("click",()=>v(x)),a.appendChild(w)});const $=a.querySelectorAll(".slider-dot"),Y=()=>{$.forEach((c,x)=>{c.classList.toggle("active",x===s)})},v=c=>{s=c,o.style.transform=`translateX(-${s*100}%)`,Y()};i.addEventListener("click",c=>{c.stopPropagation(),s=(s+1)%t.length,v(s)}),l.addEventListener("click",c=>{c.stopPropagation(),s=(s-1+t.length)%t.length,v(s)});let A=0,I=0;e.addEventListener("touchstart",c=>{A=c.changedTouches[0].screenX},{passive:!0}),e.addEventListener("touchend",c=>{I=c.changedTouches[0].screenX,P()},{passive:!0});const P=()=>{I<A-50?(s=(s+1)%t.length,v(s)):I>A+50&&(s=(s-1+t.length)%t.length,v(s))}});const O=document.querySelectorAll(".gallery-item"),u=document.createElement("div");u.className="lightbox",u.innerHTML=`
        <div class="lightbox-overlay"></div>
        <div class="lightbox-content">
            <img src="" alt="">
            <button class="lightbox-close" aria-label="Schließen">&times;</button>
        </div>
    `,document.body.appendChild(u);const D=document.createElement("style");D.textContent=`
        .lightbox {
            position: fixed;
            inset: 0;
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.3s ease;
        }
        .lightbox.active {
            opacity: 1;
            pointer-events: all;
        }
        .lightbox-overlay {
            position: absolute;
            inset: 0;
            background: rgba(26, 46, 43, 0.92);
            backdrop-filter: blur(8px);
        }
        .lightbox-content {
            position: relative;
            max-width: 90vw;
            max-height: 90vh;
            z-index: 1;
            transform: scale(0.95);
            transition: transform 0.3s ease;
        }
        .lightbox.active .lightbox-content {
            transform: scale(1);
        }
        .lightbox-content img {
            max-width: 90vw;
            max-height: 85vh;
            object-fit: contain;
            border-radius: 8px;
            box-shadow: 0 24px 80px rgba(0,0,0,0.4);
        }
        .lightbox-close {
            position: absolute;
            top: -48px;
            right: 0;
            background: none;
            border: none;
            color: rgba(255,255,255,0.7);
            font-size: 2rem;
            cursor: pointer;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: color 0.2s;
        }
        .lightbox-close:hover {
            color: white;
        }
    `,document.head.appendChild(D);const q=u.querySelector("img"),T=u.querySelector(".lightbox-close"),B=u.querySelector(".lightbox-overlay");O.forEach(e=>{e.addEventListener("click",()=>{const o=e.querySelector("img");q.src=o.src,q.alt=o.alt,u.classList.add("active"),document.body.style.overflow="hidden"})});const L=()=>{u.classList.remove("active"),document.body.style.overflow=""};T.addEventListener("click",L),B.addEventListener("click",L),document.addEventListener("keydown",e=>{e.key==="Escape"&&L()});const E=document.getElementById("booking-form");E&&E.addEventListener("submit",e=>{e.preventDefault();const o=new FormData(E),t=Object.fromEntries(o.entries());if(!t.name||!t.email||!t.checkin||!t.checkout){k("Bitte füllt alle Pflichtfelder aus.","error");return}const i=new Date(t.checkin);if(new Date(t.checkout)<=i){k("Das Abreisedatum muss nach dem Anreisedatum liegen.","error");return}const a=encodeURIComponent("Buchungsanfrage – Ferienhof Brügga"),s=encodeURIComponent(`Hallo Familie Meyer!

Ich möchte gerne eine unverbindliche Anfrage stellen:

Name: ${t.name}
E-Mail: ${t.email}
Anreise: ${t.checkin}
Abreise: ${t.checkout}
Gäste: ${t.guests}
Wohnung: ${t.apartment||"Keine Präferenz"}
Nachricht: ${t.message||"—"}

Vielen Dank!`);window.location.href=`mailto:meyer.werner@aon.at?subject=${a}&body=${s}`,k("Eure Anfrage wird vorbereitet – euer E-Mail-Programm öffnet sich gleich!","success")});function k(e,o="info"){const t=document.createElement("div");t.className=`notification notification-${o}`,t.textContent=e;const i=`
            position: fixed;
            bottom: 2rem;
            left: 50%;
            transform: translateX(-50%) translateY(20px);
            padding: 1rem 2rem;
            border-radius: 8px;
            font-family: var(--ff-body);
            font-size: 0.9rem;
            z-index: 11000;
            opacity: 0;
            transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
            max-width: 90vw;
            text-align: center;
            box-shadow: 0 8px 32px rgba(0,0,0,0.15);
        `;o==="success"?t.setAttribute("style",i+"background: #2D423F; color: white;"):o==="error"?t.setAttribute("style",i+"background: #A4694A; color: white;"):t.setAttribute("style",i+"background: white; color: #2C2C2C; border: 1px solid #D6D2C4;"),document.body.appendChild(t),requestAnimationFrame(()=>{t.style.opacity="1",t.style.transform="translateX(-50%) translateY(0)"}),setTimeout(()=>{t.style.opacity="0",t.style.transform="translateX(-50%) translateY(20px)",setTimeout(()=>t.remove(),400)},4e3)}document.querySelectorAll('a[href^="#"]').forEach(e=>{e.addEventListener("click",o=>{const t=e.getAttribute("href");if(t==="#"||t==="#impressum"||t==="#datenschutz")return;const i=document.querySelector(t);if(i&&!i.classList.contains("legal-modal")){o.preventDefault();const l=f.offsetHeight,a=i.getBoundingClientRect().top+window.scrollY-l-20;window.scrollTo({top:a,behavior:"smooth"})}})});const C=()=>{const e=window.location.hash;e==="#impressum"||e==="#datenschutz"?document.body.style.overflow="hidden":d.classList.contains("open")||(document.body.style.overflow="")};window.addEventListener("hashchange",C),C();const S=document.querySelector(".hero-image");S&&window.innerWidth>768&&(window.addEventListener("scroll",()=>{const e=window.scrollY;e<window.innerHeight&&(S.style.transform=`translateY(${e*.2}px) scale(1.05)`)},{passive:!0}),S.style.transform="scale(1.05)");const b=document.getElementById("form-checkin"),p=document.getElementById("form-checkout");if(b&&p){const e=new Date().toISOString().split("T")[0];b.setAttribute("min",e),b.addEventListener("change",()=>{const o=new Date(b.value);o.setDate(o.getDate()+1),p.setAttribute("min",o.toISOString().split("T")[0]),p.value&&new Date(p.value)<=new Date(b.value)&&(p.value="")})}const y=document.getElementById("back-to-top");y&&(window.addEventListener("scroll",()=>{window.scrollY>500?y.classList.add("visible"):y.classList.remove("visible")}),y.addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})}))});
