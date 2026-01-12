const categories = [
  "Animals","Space","Wallpapers","Birds","Food","Cars",
  "Nature","City","Tech","Art","Travel","Ocean","Abstract"
];

const gallery = document.getElementById("gallery");
const nav = document.getElementById("categories");
const search = document.getElementById("search");

let images = [];

/* Generate images (13 slots × 30 images) */
categories.forEach((cat, cIndex) => {
  for (let i = 1; i <= 30; i++) {
    images.push({
      category: cat,
      src: `https://picsum.photos/seed/${cat}${i}/600/400`,
      rating: Math.floor(Math.random() * 5) + 1
    });
  }
});

/* Create category buttons */
nav.innerHTML = `<button class="active" onclick="filterImages('All')">All</button>`;
categories.forEach(cat => {
  nav.innerHTML += `<button onclick="filterImages('${cat}')">${cat}</button>`;
});

/* Render images */
function render(data) {
  gallery.innerHTML = "";
  data.forEach(img => {
    gallery.innerHTML += `
      <div class="card" tabindex="0" aria-label="${img.category} image">
        <img src="${img.src}">
        <div class="overlay">
          <div>${img.category}</div>
          <div class="stars">${"★".repeat(img.rating)}</div>
          <button class="explore">Explore</button>
        </div>
      </div>`;
  });
}

/* Filter */
function filterImages(cat) {
  document.querySelectorAll("nav button").forEach(b=>b.classList.remove("active"));
  event.target.classList.add("active");
  if (cat === "All") render(images);
  else render(images.filter(img => img.category === cat));
}

/* Search */
search.addEventListener("input", e => {
  const val = e.target.value.toLowerCase();
  render(images.filter(img =>
    img.category.toLowerCase().includes(val)
  ));
});

/* Initial load */
render(images);
