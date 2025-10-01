const state = {
  sliderIndex: 0,
  sliderCount: 0,
  sliderInterval: null,
};

// --------- Slider (Hero) ---------
function initSlider() {
  const slider = document.getElementById("mainSlider");
  const slidesWrap = slider.querySelector(".slides");
  const slides = slidesWrap.children;
  state.sliderCount = slides.length;

  const dotsContainer = document.getElementById("sliderDots");
  for (let i = 0; i < state.sliderCount; i++) {
    const dot = document.createElement("div");
    dot.className = "dot" + (i === 0 ? " active" : "");
    dot.dataset.index = i;
    dot.addEventListener("click", () => {
      goToSlide(i);
      resetSliderTimer();
    });
    dotsContainer.appendChild(dot);
  }

  function update() {
    slidesWrap.style.transform = `translateX(-${state.sliderIndex * 100}%)`;
    Array.from(dotsContainer.children).forEach((d, idx) =>
      d.classList.toggle("active", idx === state.sliderIndex)
    );
  }

  function next() {
    state.sliderIndex = (state.sliderIndex + 1) % state.sliderCount;
    update();
  }
  function prev() {
    state.sliderIndex =
      (state.sliderIndex - 1 + state.sliderCount) % state.sliderCount;
    update();
  }

  window.goToSlide = function (i) {
    state.sliderIndex = i % state.sliderCount;
    update();
  };

  function autoPlay() {
    state.sliderInterval = setInterval(next, 4500);
  }
  function resetSliderTimer() {
    clearInterval(state.sliderInterval);
    autoPlay();
  }

  autoPlay();
}

const demoProducts = [
  // --- FRUITS ---
  {
    name: "Red Apples",
    price: "₹129/kg",
    img: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=600&q=60",
    rating: 4.6,
    category: "Fruits",
  },

  // --- DAIRY ---
  {
    name: "Organic Milk",
    price: "₹49/L",
    img: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=60",
    rating: 4.8,
    category: "Dairy",
  },

  // --- SNACKS ---
  {
    name: "Potato Chips",
    price: "₹39/pack",
    img: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=600&q=60",
    rating: 4.2,
    category: "Snacks",
  },

  // --- BEVERAGES ---
  {
    name: "Orange Juice",
    price: "₹89/pack",
    img: "https://images.unsplash.com/photo-1577680716097-9a565ddc2007?auto=format&fit=crop&w=600&q=60",
    rating: 4.3,
    category: "Beverages",
  },
];

function renderProducts() {
  const grid = document.getElementById("productsGrid");
  demoProducts.forEach((p) => {
    const card = document.createElement("div");
    card.className = "product";
    card.innerHTML = `
          <img src="${p.img}" alt="${p.name}">
          <div class="meta"><div>
            <div style="font-weight:700">${p.name}</div>
            <div class="muted" style="font-size:13px">Fresh & quality checked</div>
          </div><div class="price">${p.price}</div></div>
          <div style="display:flex;align-items:center;justify-content:space-between;gap:10px">
            <div class="rating">${"★".repeat(
              Math.round(p.rating)
            )} <span style="font-size:13px;color:var(--muted);margin-left:6px">${
      p.rating
    }</span></div>
            <button class="add" onclick="addToCart('${p.name.replace(
              /'/g,
              ""
            )}')">Add</button>
          </div>
        `;
    grid.appendChild(card);
  });
}

function addToCart(name) {
  // lightweight UI feedback
  const btn = document.createElement("div");
  btn.textContent = `${name} added to cart`;
  btn.style.position = "fixed";
  btn.style.right = "22px";
  btn.style.bottom = "22px";
  btn.style.background = "linear-gradient(90deg,var(--primary),#49c96b)";
  btn.style.color = "white";
  btn.style.padding = "12px 16px";
  btn.style.borderRadius = "10px";
  btn.style.boxShadow = "0 12px 30px rgba(17,34,17,0.12)";
  btn.style.zIndex = 9999;
  document.body.appendChild(btn);
  setTimeout(() => (btn.style.transform = "translateY(-8px)"), 20);
  setTimeout(() => btn.remove(), 1800);
}

// --------- Countdown timer ---------
function initCountdown(endDate) {
  function update() {
    const now = new Date();
    const diff = endDate - now;
    if (diff <= 0) {
      document.getElementById("d").innerText = "00";
      document.getElementById("h").innerText = "00";
      document.getElementById("m").innerText = "00";
      document.getElementById("s").innerText = "00";
      clearInterval(timer);
      return;
    }
    const d = Math.floor(diff / 1000 / 60 / 60 / 24);
    const h = Math.floor((diff / 1000 / 60 / 60) % 24);
    const m = Math.floor((diff / 1000 / 60) % 60);
    const s = Math.floor((diff / 1000) % 60);
    document.getElementById("d").innerText = String(d).padStart(2, "0");
    document.getElementById("h").innerText = String(h).padStart(2, "0");
    document.getElementById("m").innerText = String(m).padStart(2, "0");
    document.getElementById("s").innerText = String(s).padStart(2, "0");
  }
  update();
  const timer = setInterval(update, 1000);
}

// --------- Responsive nav toggle ---------
function initNavToggle() {
  const ham = document.getElementById("hamburger");
  ham.addEventListener("click", () => {
    const menu = document.querySelector("nav .nav-left");
    menu.classList.toggle("open-mobile");
    if (menu.classList.contains("open-mobile")) {
      menu.style.position = "fixed";
      menu.style.left = "12px";
      menu.style.top = "72px";
      menu.style.background = "white";
      menu.style.padding = "12px";
      menu.style.borderRadius = "12px";
      menu.style.boxShadow = "0 20px 50px rgba(0,0,0,0.08)";
      menu.style.zIndex = 1500;
      menu.style.width = "calc(100% - 24px)";
    } else {
      menu.style = "";
    }
  });
}

// --------- Newsletter subscription lightweight ---------
function subscribe() {
  const e = document.getElementById("newsletterEmail");
  const email = e.value;
  if (!email) return;
  e.value = "";
  alert("Thanks for subscribing — " + email);
}

// --------- Misc init on DOM ready ---------
document.addEventListener("DOMContentLoaded", () => {
  initSlider();
  renderProducts();
  // countdown: set to coming Sunday 23:59:59 local
  const now = new Date();
  const daysUntilSunday = (7 - now.getDay()) % 7 || 7; // next sunday
  const nextSunday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + daysUntilSunday,
    23,
    59,
    59
  );
  initCountdown(nextSunday);
  initNavToggle();
  document.getElementById("year").innerText = new Date().getFullYear();

  // small UX: clicking anchor close mobile menu
  document.querySelectorAll('a[href^="#"]').forEach((a) =>
    a.addEventListener("click", () => {
      const menu = document.querySelector("nav .nav-left");
      if (menu.classList.contains("open-mobile"))
        menu.classList.remove("open-mobile");
      menu.style = "";
    })
  );
});

// small helper for smooth scroll to top when clicking logo
document.querySelector(".logo").addEventListener("click", (e) => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: "smooth" });
});

const categoryCards = document.querySelectorAll(".category-card");
const productsGrid = document.getElementById("productsGrid");

// Toggle category dropdown
const catBtn = document.getElementById("catBtn");
const catMenu = document.getElementById("catMenu");

catBtn.addEventListener("click", () => {
  const visible = catMenu.style.display === "block";
  catMenu.style.display = visible ? "none" : "block";
});

// Close dropdown if clicked outside
document.addEventListener("click", (e) => {
  if (!catBtn.contains(e.target) && !catMenu.contains(e.target)) {
    catMenu.style.display = "none";
  }
});

// Filter products on category click
const catItems = document.querySelectorAll(".cat-item");
catItems.forEach((item) => {
  item.addEventListener("click", () => {
    const selectedCategory = item.getAttribute("data-cat");
    filterProducts(selectedCategory);
    catMenu.style.display = "none"; // close dropdown
  });
});

// Example filter function
function filterProducts(category) {
  const grid = document.getElementById("productsGrid");
  grid.innerHTML = ""; // clear previous
  demoProducts
    .filter((p) => p.category === category)
    .forEach((p) => {
      const card = document.createElement("div");
      card.className = "product";
      card.innerHTML = `
        <img src="${p.img}" alt="${p.name}">
        <div class="meta">
          <div>
            <div style="font-weight:700">${p.name}</div>
            <div class="muted" style="font-size:13px">Fresh & quality checked</div>
          </div>
          <div class="price">${p.price}</div>
        </div>
        <div style="display:flex;align-items:center;justify-content:space-between;gap:10px">
          <div class="rating">${"★".repeat(Math.round(p.rating))}
            <span style="font-size:13px;color:var(--muted);margin-left:6px">${
              p.rating
            }</span>
          </div>
          <button class="add" onclick="addToCart('${p.name.replace(
            /'/g,
            ""
          )}')">Add</button>
        </div>
      `;
      grid.appendChild(card);
    });
}
document.addEventListener("DOMContentLoaded", function () {
  const cards = document.querySelectorAll(".testimonial-card");
  const leftBtn = document.querySelector(".left");
  const rightBtn = document.querySelector(".right");
  const indicators = document.querySelectorAll(".indicator");
  let currentIndex = 0;
  let autoInterval;

  function showCard(index) {
    cards.forEach((card, i) => {
      card.classList.toggle("active", i === index);
    });
    indicators.forEach((ind, i) => {
      ind.classList.toggle("active", i === index);
    });
  }

  function nextCard() {
    currentIndex = (currentIndex + 1) % cards.length;
    showCard(currentIndex);
  }

  function prevCard() {
    currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    showCard(currentIndex);
  }

  rightBtn.addEventListener("click", nextCard);
  leftBtn.addEventListener("click", prevCard);

  indicators.forEach((ind, i) => {
    ind.addEventListener("click", () => {
      currentIndex = i;
      showCard(currentIndex);
    });
  });

  // Auto-advance every 4 seconds
  function startAuto() {
    autoInterval = setInterval(nextCard, 4000);
  }

  function stopAuto() {
    clearInterval(autoInterval);
  }

  // Pause on hover
  const section = document.querySelector(".unique-testimonials");
  section.addEventListener("mouseenter", stopAuto);
  section.addEventListener("mouseleave", startAuto);

  startAuto();
});
