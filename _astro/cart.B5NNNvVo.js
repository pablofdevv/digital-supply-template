import{a as e,i as t,o as n,r,t as i}from"./api.DXnUQ9ak.js";import{t as a}from"./catalog-loader.DZ4h1zP_.js";import{t as o}from"./events.DpnzKzQI.js";import{i as s,o as c}from"./catalog.CGex1v_0.js";var l=()=>n.currentLang;function u(t){Array.isArray(t)&&t!==n.cart&&n.cart.splice(0,n.cart.length,...t),e()}function d(e){let t=n.cart.find(t=>t.id===e.id);return t?t.quantity=(parseInt(t.quantity,10)||1)+(parseInt(e.quantity,10)||1):n.cart.push({quantity:1,...e}),u(),n.cart}var f=``,p=`ALL`;function m(e){let t=(e.category||``).trim();if(t)return t;let n=(e.name||``).toLowerCase();return/(vpn|cyberghost|expressvpn|nord|surfshark|ipvanish|mullvad|proton)/.test(n)?`VPN`:/(chatgpt|claude|gemini|gpt|perplexity|midjourney|copilot|openai|cursor|ai|ia)/.test(n)?`IA`:/(spotify|netflix|disney|hbo|max|prime|youtube|crunchyroll|dazn|apple tv|tidal|paramount)/.test(n)?`Streaming`:/(canva|adobe|photoshop|figma|capcut|office|windows|notion)/.test(n)?`Software`:/(steam|xbox|playstation|psn|valorant|fortnite|minecraft|roblox|game|gaming)/.test(n)?`Gaming`:`Digital`}function h(e){let t=e.stock??e.variants?.[0]?.stock,n=e.fulfillment_available!==!1&&(t==null||Number(t)>0);return{hasStock:n,label:n?t?`${t} uds.`:`En stock`:`Agotado`}}function g(e=``){let t=e.indexOf(` - `);if(t>0)return{title:e.slice(0,t).trim(),variant:e.slice(t+3).trim()};let n=e.indexOf(` · `);return n>0?{title:e.slice(0,n).trim(),variant:e.slice(n+3).trim()}:{title:e,variant:``}}function _(){let e=n.cart,a=n.products,o=n.currency,d=r(`#ic-available-products`),y=r(`#ic-cart-items`),b=r(`#ic-cart-count-pill`),x=r(`#ic-total-amount`),C=r(`#ic-subtotal-amount`),w=r(`#ic-subtotal-label`),T=r(`#ic-customer-email`),E=r(`#ic-email-error`),D=r(`#cart-customer-email`),O=r(`#ic-pay-btn`),k=r(`#ic-search-input`),A=r(`#ic-cat-chips`);if(D&&T&&!T.value&&D.value&&(T.value=D.value),T&&!T.value&&i().then(e=>{e&&e.email&&T&&!T.value&&(T.value=e.email)}).catch(()=>{}),T&&!T.dataset.icBound&&(T.dataset.icBound=`1`,T.addEventListener(`input`,()=>{T.classList.remove(`ic-email-input--error`),E&&(E.hidden=!0,E.textContent=``)})),k&&!k.dataset.icBound&&(k.dataset.icBound=`1`,k.value=f,k.addEventListener(`input`,()=>{f=k.value.trim().toLowerCase(),_()})),A&&a&&a.length){let e=[`ALL`,...Array.from(new Set(a.filter(e=>e.fulfillment_available!==!1).map(e=>m(e)))).slice(0,6)];e.includes(p)||(p=`ALL`),A.innerHTML=``,e.length>2?(A.hidden=!1,e.forEach(e=>{let t=document.createElement(`button`);t.type=`button`,t.className=`ic-cat-chip${p===e?` is-active`:``}`,t.textContent=e===`ALL`?`Todos`:e,t.onclick=()=>{p=e,_()},A.append(t)})):A.hidden=!0}if(d){if(!a||!a.length)d.innerHTML=`<div class="ic-empty-list">Cargando catálogo en vivo...</div>`;else{d.innerHTML=``;let n=a.filter(e=>e.fulfillment_available!==!1).filter(e=>p===`ALL`||m(e)===p).filter(e=>!f||`${e.name||``} ${m(e)}`.toLowerCase().includes(f)).sort((e,t)=>Number(h(t).hasStock)-Number(h(e).hasStock)).slice(0,3);n.length||(d.innerHTML=`<div class="ic-empty-list">No hay suministros que coincidan con tu búsqueda.</div>`),n.forEach(n=>{let r=c(n),i=parseFloat(n.sell_price||n.variants?.[0]?.sell_price||0),a=document.createElement(`div`);a.className=`ic-product-card`;let{hasStock:f,label:p}=h(n),m=(n.name||`KS`).trim().slice(0,2).toUpperCase(),g=n.variants?.[0],_=g?.id||n.id,v=e.reduce((e,t)=>t.id===_||t.product_id===n.id?e+(parseInt(t.quantity,10)||1):e,0);a.innerHTML=`
          <div class="ic-prod-left">
            <div class="ic-prod-thumb">
              ${r?`<img src="${r}" alt="${n.name}" loading="lazy" decoding="async" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';" /><span class="ic-thumb-fallback" style="display:none">${m}</span>`:`<span class="ic-thumb-fallback">${m}</span>`}
            </div>
            <div class="ic-prod-info">
              <div class="ic-prod-title-row">
                <h3 class="ic-prod-name">${s(n.name,l())}</h3>
              </div>
              <div class="ic-prod-meta">
                <span class="ic-prod-price-tag">${t(i,o)}</span>
                <span class="ic-prod-stock ${f?`ic-prod-stock--ok`:`ic-prod-stock--out`}"><span class="ic-stock-dot" aria-hidden="true"></span>${p}</span>
              </div>
            </div>
          </div>
          <button type="button" class="ic-add-btn${v>0?` ic-add-btn--added`:``}" ${f?``:`disabled`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            <span>${v>0?`Añadir otro`:`Añadir`}</span>
          </button>
        `,a.querySelector(`.ic-add-btn`).onclick=()=>{let t=parseFloat(g?.sell_price||n.sell_price||0),i=g?.id||n.id,a=g?`${n.name} - ${g.name}`:n.name,o=e.find(e=>e.id===i);o?o.quantity=(o.quantity||1)+1:e.push({id:i,product_id:n.id,variant_id:g?.id||null,name:a,price:t,image:r,quantity:1}),u()},d.append(a)})}}let j=0,M=0;y&&(e.length?(y.innerHTML=``,e.forEach((n,r)=>{let i=parseFloat(n.price)||0,a=parseInt(n.quantity,10)||1;j+=i*a,M+=a;let s=document.createElement(`div`);s.className=`ic-item-row`;let c=n.image||``,{title:l,variant:d}=g(n.name||``),f=(l||`KS`).trim().slice(0,2).toUpperCase();s.innerHTML=`
          <div class="ic-item-thumb">
            ${c?`<img src="${c}" alt="" loading="lazy" decoding="async" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';" /><span class="ic-thumb-fallback" style="display:none">${f}</span>`:`<span class="ic-thumb-fallback">${f}</span>`}
          </div>
          <div class="ic-item-info">
            <div class="ic-item-top">
              <div class="ic-item-titles">
                <span class="ic-item-name" title="${n.name}">${l}</span>
                ${d?`<span class="ic-item-variant">${d}</span>`:``}
              </div>
              <button type="button" class="ic-item-del-btn" title="Eliminar" aria-label="Eliminar ${l}">
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div class="ic-item-bottom">
              <div class="ic-qty-group">
                <button type="button" class="ic-qty-btn minus" aria-label="Reducir cantidad">−</button>
                <span class="ic-qty-val">${a}</span>
                <button type="button" class="ic-qty-btn plus" aria-label="Aumentar cantidad">+</button>
              </div>
              <div class="ic-item-pricing">
                ${a>1?`<span class="ic-item-unit">${a} × ${t(i,o)}</span>`:``}
                <span class="ic-item-price">${t(i*a,o)}</span>
              </div>
            </div>
          </div>
        `,s.querySelector(`.ic-qty-btn.minus`).onclick=()=>{n.quantity>1?n.quantity--:e.splice(r,1),u()},s.querySelector(`.ic-qty-btn.plus`).onclick=()=>{n.quantity=(n.quantity||1)+1,u()},s.querySelector(`.ic-item-del-btn`).onclick=()=>{e.splice(r,1),u()},y.append(s)})):y.innerHTML=`
        <div class="ic-cart-empty">
          <p>Tu pedido está vacío. Añade un suministro desde la lista para continuar.</p>
          <a href="/catalogo" data-route="/catalogo" class="ic-add-btn" style="text-decoration:none;display:inline-flex;">Explorar catálogo</a>
        </div>
      `),b&&(b.textContent=M),x&&(x.textContent=t(j,o)),C&&(C.textContent=t(j,o)),w&&(w.textContent=M>0?`Subtotal (${M} ${M===1?`ud.`:`uds.`})`:`Subtotal`),O&&(O.disabled=!e.length,O.onclick=()=>{if(!e.length)return;let t=T?T.value.trim():``;S(),v(t)})}function v(e=``){if(typeof window.openCheckoutFlow==`function`&&r(`#vista-checkout-flow`))window.openCheckoutFlow(!0,e);else{try{e&&sessionStorage.setItem(`krystal_checkout_email`,e)}catch{}location.href=`/checkout`}}function y(){let e=n.cart,i=n.products,a=n.currency,o=document.querySelector(`.cart-footer-box`);o&&(o.style.display=e.length?`flex`:`none`);let s=r(`#cart-items`),d=l()===`en`;s&&(s.innerHTML=e.length?``:`
        <div class="cart-empty-state">
          <svg class="cart-empty-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.25" stroke="currentColor" width="56" height="56" style="margin:0 auto 12px;color:var(--muted);"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" /></svg>
          <p class="cart-empty-title" style="color:var(--foreground);font-size:0.95rem;font-weight:600;margin:0 0 4px 0;">${d?`Your cart is empty`:`Tu carrito está vacío`}</p>
          <p style="color:var(--muted);font-size:0.82rem;margin:0 0 16px 0;">${d?`Explore our instant access premium accounts.`:`Explora nuestras cuentas premium con entrega instantánea.`}</p>
          <button type="button" class="cart-btn-secondary" data-close-cart style="margin:0 auto;padding:8px 18px;font-size:12px;">${d?`Continue Shopping`:`Seguir comprando`}</button>
        </div>
      `);let f=0,p=0;e.forEach((n,r)=>{let o=parseFloat(n.price)||0,l=parseInt(n.quantity,10)||1;if(f+=o*l,p+=l,!s)return;let m=i.find(e=>e.id===n.id||e.variants?.some(e=>e.id===n.id)||e.name&&n.name&&n.name.toLowerCase().startsWith(e.name.toLowerCase())),h=n.image||(m?c(m):null),g=`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.75" stroke="currentColor" width="18" height="18"><path stroke-linecap="round" stroke-linejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" /></svg>`,_=h?`<img src="${h}" alt="${n.name}" loading="lazy" decoding="async">`:g,v=document.createElement(`div`);v.className=`cart-item-card`,v.innerHTML=`
      <div class="cic-left">
        <div class="cic-icon">${_}</div>
        <div class="cic-details">
          <h3 class="cic-title">${n.name}</h3>
          <p class="cic-sub">${t(o,a)} ${d?`each`:`cada uno`}</p>
        </div>
      </div>
      <div class="cic-qty-controls">
        <button type="button" class="cic-qty-btn minus" aria-label="Disminuir cantidad">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" width="12" height="12"><path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14" /></svg>
        </button>
        <span class="cic-qty-num">${l}</span>
        <button type="button" class="cic-qty-btn plus" aria-label="Aumentar cantidad">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" width="12" height="12"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
        </button>
      </div>
      <div class="cic-right">
        <strong class="cic-price">${t(o*l,a)}</strong>
        <button type="button" class="cic-remove-btn" aria-label="Eliminar producto" title="Eliminar">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.75" stroke="currentColor" width="15" height="15"><path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" /></svg>
        </button>
      </div>
    `;let y=v.querySelector(`.cic-icon img`);y&&(y.onerror=()=>{y.parentElement.innerHTML=g}),v.querySelector(`.cic-qty-btn.minus`).onclick=()=>{n.quantity>1?n.quantity--:e.splice(r,1),u()},v.querySelector(`.cic-qty-btn.plus`).onclick=()=>{n.quantity=(n.quantity||1)+1,u()},v.querySelector(`.cic-remove-btn`).onclick=()=>{e.splice(r,1),u()},s.append(v)});let m=r(`#cart-count`);m&&(m.textContent=p);let h=r(`#cart-badge-count`);h&&(h.textContent=p);let g=r(`#cart-subtotal`);g&&(g.textContent=t(f,a));let _=r(`#cart-total`);_&&(_.textContent=t(f,a));let v=r(`#cart-checkout-btn`)||r(`.checkout`);if(v){v.disabled=!e.length;let n=r(`#checkout-btn-text`);n&&(n.textContent=e.length?`Checkout (${t(f,a)})`:`Checkout (0,00 €)`)}}function b(e=!0){if(!r(`#vista-checkout-flow`)){location.href=`/checkout?view=cart`;return}document.documentElement.classList.remove(`ic-modal-open`),document.body.classList.remove(`ic-modal-open`);let t=r(`#vista-checkout-flow`);t&&(t.hidden=!0);let n=r(`#vista-checkout`);n&&(n.classList.remove(`is-popup`),n.hidden=!1),r(`#cart-panel`)?.classList.remove(`open`),document.querySelector(`.overlay`)?.classList.remove(`open`),_(),e&&history.pushState(null,``,`/checkout?view=cart`),window.scrollTo({top:0,behavior:`instant`})}function x(){let e=r(`#vista-checkout`);e?(e.classList.add(`is-popup`),e.hidden=!1,document.documentElement.classList.add(`ic-modal-open`),document.body.classList.add(`ic-modal-open`),_(),a().catch(()=>{})):(r(`#cart-panel`)?.classList.add(`open`),r(`#cart-panel`)?.setAttribute(`aria-hidden`,`false`),document.querySelector(`.overlay`)?.classList.add(`open`))}function S(){let e=r(`#vista-checkout`);e&&e.classList.contains(`is-popup`)&&(e.classList.remove(`is-popup`),e.hidden=!0,document.documentElement.classList.remove(`ic-modal-open`),document.body.classList.remove(`ic-modal-open`)),r(`#cart-panel`)?.classList.remove(`open`),r(`#cart-panel`)?.setAttribute(`aria-hidden`,`true`),document.querySelector(`.overlay`)?.classList.remove(`open`)}o(`openCart`,x),o(`closeCart`,S),o(`drawCart`,y),o(`renderInteractiveCheckout`,_),o(`showInteractiveCheckout`,b);function C(){y();let e=r(`#vista-checkout`);e&&!e.hidden&&_()}window.addEventListener(`cart:change`,C),window.addEventListener(`cart:open`,x),window.addEventListener(`catalog:loaded`,C),document.addEventListener(`krystal:lang`,C),window.addEventListener(`storage`,e=>{if(e.key===`ae4t_cart`){try{n.cart.splice(0,n.cart.length,...JSON.parse(e.newValue||`[]`))}catch{}C()}}),r(`#ic-popup-close`)?.addEventListener(`click`,S);var w=r(`#vista-checkout`);w?.addEventListener(`click`,e=>{w.classList.contains(`is-popup`)&&e.target===w&&S()}),window.addEventListener(`keydown`,e=>{e.key===`Escape`&&r(`#vista-checkout`)?.classList.contains(`is-popup`)&&S()}),document.addEventListener(`click`,e=>{e.target.closest(`[data-open-cart]`)?(e.preventDefault(),x()):e.target.closest(`[data-close-cart]`)&&S()});var T=r(`#cart-checkout-btn`)||r(`.checkout`);T&&(T.onclick=()=>{n.cart.length&&b(!0)}),y();export{b as a,x as i,d as n,S as r,g as t};