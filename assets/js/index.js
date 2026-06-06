// ================= PICTURE OF THE DAY APOD =================

const apiKey = "mIxBXppJWSOpoqU79Lm84VANxgDP0p3QZ5SJKicm";

async function getApod(dateString = "") {
  try {
    let url = dateString
      ? `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${dateString}`
      : `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;

    const contaniner = document.getElementById("apod-image-container");

    contaniner.innerHTML = `
                <div id="apod-loading" class="text-center">
                  <i
                    class="fas fa-spinner fa-spin text-4xl text-blue-400 mb-4"
                  ></i>
                  <p class="text-slate-400">Loading today's image...</p>
                </div>`;

    let response = await fetch(url);
    let data = await response.json();
    console.log(data);
    displayTodayPic(data);
  } catch (error) {
    console.log("picture error");
  }
}
getApod();

function displayTodayPic(data) {
  const dateFormate = new Date(data.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const dateFormateShort = new Date(data.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  document.getElementById("apod-date").innerText =
    `Astronomy Picture of the Day - ${dateFormate}`;
  document.getElementById("apod-image-container").innerHTML = `<img
                  id="apod-image"
                  class="w-full h-full object-cover"
                  src="${data.hdurl}"
                  alt="Astronomy Picture of the Day"
                />`;
  document.getElementById("apod-title").innerHTML = `${data.title}`;
  document.getElementById("apod-date-detail").innerHTML = `<i class="far fa-calendar mr-2"></i>${dateFormate}`;
  document.getElementById("apod-explanation").innerHTML = `${data.explanation}`;
  document.getElementById("apod-date-info").innerHTML = `${dateFormate}`;
  document.getElementById("apod-media-type").innerHTML = `${data.media_type}`;
  document.getElementById("todayDate").innerHTML = `${dateFormateShort}`;
}


// ================= DATE PICKER =================

const dateInput = document.getElementById("apod-date-input");
const loadDateBtn = document.getElementById("load-date-btn");
const todayBtn = document.getElementById("today-apod-btn");

loadDateBtn.addEventListener("click", () => {
  const selectedDate = dateInput.value;
  getApod(selectedDate);
});

todayBtn.addEventListener("click", () => {
  getApod();
});

dateInput.addEventListener("change", () => {
  const dateFormate = new Date(dateInput.value).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  document.getElementById("todayDate").textContent = dateFormate;
});



// ================= SIDEBAR & NAVIGATION =================



// ================= SIDEBAR =================

const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("sidebar-overlay");
const sidebarToggle = document.getElementById("sidebar-toggle");

function openSidebar() {
  sidebar.classList.add("sidebar-open");
  overlay.classList.remove("hidden");
}

function closeSidebar() {
  sidebar.classList.remove("sidebar-open");
  overlay.classList.add("hidden");
}

sidebarToggle.addEventListener("click", () => {
  openSidebar();
});

overlay.addEventListener("click", closeSidebar);

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeSidebar();
});

window.addEventListener("resize", () => {
  if (window.innerWidth >= 1024) {
    overlay.classList.add("hidden");
  }
});


// ================= NAVIGATION =================

const navLinks = document.querySelectorAll(".nav-link");
const allSections = document.querySelectorAll(".app-section");

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.forEach((btn) => {
      btn.classList.remove("bg-blue-500/10", "text-blue-400");
      btn.classList.add("text-slate-300", "hover:bg-slate-800");
    });

    link.classList.add("bg-blue-500/10", "text-blue-400");
    link.classList.remove("text-slate-300", "hover:bg-slate-800");

    allSections.forEach((section) => {
      section.classList.add("hidden");
    });
    const sectionName = link.getAttribute("data-section");
    const selectedSection = document.getElementById(`${sectionName}`);

    selectedSection.classList.remove("hidden");
    closeSidebar()
  });
});



// ================= LAUNCHES =================

async function getLaunches() {
  try {
    const response = await fetch(
      `https://lldev.thespacedevs.com/2.3.0/launches/upcoming/?limit=10`,
    );
    const data = await response.json();
    const launches = data.results;
    console.log(launches);

    displayFeaturedLaunch(launches);
    displayLaunches(launches);
  } catch (error) {
    console.log("launches errorrr");
  }
}
getLaunches()


function displayFeaturedLaunch(launches) {

  document.getElementById("featured-launch").innerHTML = `<div
              class="relative bg-slate-800/30 border border-slate-700 rounded-3xl overflow-hidden group hover:border-blue-500/50 transition-all"
            >
              <div
                class="absolute inset-0 bg-linear-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity"
              ></div>
              <div class="relative grid grid-cols-1 lg:grid-cols-2 gap-6 p-8">
                <div class="flex flex-col justify-between">
                  <div>
                    <div class="flex items-center gap-3 mb-4">
                      <span
                        class="px-4 py-1.5 bg-blue-500/20 text-blue-400 rounded-full text-sm font-semibold flex items-center gap-2"
                      >
                        <i class="fas fa-star"></i>
                        Featured Launch
                      </span>
                      <span
                        class="px-4 py-1.5 bg-green-500/20 text-green-400 rounded-full text-sm font-semibold"
                      >
                        ${launches[0].status.abbrev}
                      </span>
                    </div>
                    <h3 class="text-3xl font-bold mb-3 leading-tight">
                      ${launches[0].name}
                    </h3>
                    <div
                      class="flex flex-col xl:flex-row xl:items-center gap-4 mb-6 text-slate-400"
                    >
                      <div class="flex items-center gap-2">
                        <i class="fas fa-building"></i>
                        <span>${launches[0].launch_service_provider.name}</span>
                      </div>
                      <div class="flex items-center gap-2">
                        <i class="fas fa-rocket"></i>
                        <span>${launches[0].rocket.configuration.full_name}</span>
                      </div>
                    </div>
                    <div
                      class="inline-flex items-center gap-3 px-6 py-3 bg-linear-to-r from-blue-500/20 to-purple-500/20 rounded-xl mb-6"
                    >
                      <i class="fas fa-clock text-2xl text-blue-400"></i>
                      <div>
                        <p class="text-2xl font-bold text-blue-400">2</p>
                        <p class="text-xs text-slate-400">Days Until Launch</p>
                      </div>
                    </div>
                    <div class="grid xl:grid-cols-2 gap-4 mb-6">
                      <div class="bg-slate-900/50 rounded-xl p-4">
                        <p
                          class="text-xs text-slate-400 mb-1 flex items-center gap-2"
                        >
                          <i class="fas fa-calendar"></i>
                          Launch Date
                        </p>
                        <p class="font-semibold">${new Date(
                          launches[0].net,
                        ).toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}</p>
                      </div>
                      <div class="bg-slate-900/50 rounded-xl p-4">
                        <p
                          class="text-xs text-slate-400 mb-1 flex items-center gap-2"
                        >
                          <i class="fas fa-clock"></i>
                          Launch Time
                        </p>
                        <p class="font-semibold">${new Date(
                          launches[0].net,
                        ).toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })} UTC</p>
                      </div>
                      <div class="bg-slate-900/50 rounded-xl p-4">
                        <p
                          class="text-xs text-slate-400 mb-1 flex items-center gap-2"
                        >
                          <i class="fas fa-map-marker-alt"></i>
                          Location
                        </p>
                        <p class="font-semibold text-sm">${launches[0].pad.location.name}</p>
                      </div>
                      <div class="bg-slate-900/50 rounded-xl p-4">
                        <p
                          class="text-xs text-slate-400 mb-1 flex items-center gap-2"
                        >
                          <i class="fas fa-globe"></i>
                          Country
                        </p>
                        <p class="font-semibold">${launches[0].pad.country.name}</p>
                      </div>
                    </div>
                    <p class="text-slate-300 leading-relaxed mb-6">
                      ${launches[0].mission.description}
                    </p>
                  </div>
                  <div class="flex flex-col md:flex-row gap-3">
                    <button
                      class="flex-1 self-start md:self-center px-6 py-3 bg-blue-500 rounded-xl hover:bg-blue-600 transition-colors font-semibold flex items-center justify-center gap-2"
                    >
                      <i class="fas fa-info-circle"></i>
                      View Full Details
                    </button>
                    <div class="icons self-end md:self-center">
                      <button
                        class="px-4 py-3 bg-slate-700 rounded-xl hover:bg-slate-600 transition-colors"
                      >
                        <i class="far fa-heart"></i>
                      </button>
                      <button
                        class="px-4 py-3 bg-slate-700 rounded-xl hover:bg-slate-600 transition-colors"
                      >
                        <i class="fas fa-bell"></i>
                      </button>
                    </div>
                  </div>
                </div>
                <div class="relative">
                  <div
                    class="relative h-full min-h-[400px] rounded-2xl overflow-hidden bg-slate-900/50"
                  >
                    
                    <div
                      class="flex items-center justify-center h-full min-h-[400px] bg-slate-800"
                    >
                <img class="h-full w-full" src="${launches[0].image.image_url}" alt="${launches[0].launch_service_provider.name}"  onerror="this.src='./assets/images/launch-placeholder.png'">

                    </div>
                    <div
                      class="absolute inset-0 bg-linear-to-t from-slate-900 via-transparent to-transparent"
                    ></div>
                  </div>
                </div>
              </div>
            </div>`;
}


function displayLaunches(launches){
  let cartona = ""

  for (let i = 1; i < launches.length; i++) {
    cartona+= `<div
              class="bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all group cursor-pointer"
            >
              <div
                class="relative h-48 bg-slate-900/50 flex items-center justify-center"
              >
                <img class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" src="${launches[i].image?.image_url}" alt="${launches[i].launch_service_provider.name}"  onerror="this.src='./assets/images/launch-placeholder.png'">
                <div class="absolute top-3 right-3">
                  <span
                    class="px-3 py-1 bg-green-500/90 text-white backdrop-blur-sm rounded-full text-xs font-semibold"
                  >
                    ${launches[i].status.abbrev}
                  </span>
                </div>
              </div>
              <div class="p-5">
                <div class="mb-3">
                <h4
                    class="font-bold text-lg mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors"
                  >
                    ${launches[i].name}
                  </h4>
                  <p class="text-sm text-slate-400 flex items-center gap-2">
                    <i class="fas fa-building text-xs"></i>
                    ${launches[i].launch_service_provider.name}
                  </p>
                </div>
                <div class="space-y-2 mb-4">
                  <div class="flex items-center gap-2 text-sm">
                    <i class="fas fa-calendar text-slate-500 w-4"></i>
                    <span class="text-slate-300">${new Date(
                          launches[i].net,
                        ).toLocaleDateString("en-US", {
                          
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}</span>
                  </div>
                  <div class="flex items-center gap-2 text-sm">
                    <i class="fas fa-clock text-slate-500 w-4"></i>
                    <span class="text-slate-300">${new Date(
                          launches[i].net,
                        ).toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })}  UTC</span>
                  </div>
                  <div class="flex items-center gap-2 text-sm">
                    <i class="fas fa-rocket text-slate-500 w-4"></i>
                    <span class="text-slate-300">${launches[i].rocket.configuration.full_name}</span>
                  </div>
                  <div class="flex items-center gap-2 text-sm">
                    <i class="fas fa-map-marker-alt text-slate-500 w-4"></i>
                    <span class="text-slate-300 line-clamp-1">${launches[i].pad.location.name}</span>
                  </div>
                </div>
                <div
                  class="flex items-center gap-2 pt-4 border-t border-slate-700"
                >
                  <button
                    class="flex-1 px-4 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors text-sm font-semibold"
                  >
                    Details
                  </button>
                  <button
                    class="px-3 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors"
                  >
                    <i class="far fa-heart"></i>
                  </button>
                </div>
              </div>
            </div>`
    
  }
  document.getElementById("launches-grid").innerHTML = cartona
}


// ================= PLANETS =================

let planets = [];

async function getPlanets() {
  try {
    const response = await fetch(`https://solar-system-opendata-proxy.vercel.app/api/planets`);
    const data = await response.json();
    planets = data.bodies;
    console.log(planets);

    displayPlanet("terre");
    
  } catch (error) {
    console.log("planets errorrr", error);
  }
}

getPlanets();



const allPlanets = document.querySelectorAll(".planet-card");

allPlanets.forEach((card) => {
  card.addEventListener("click", () => {
    const planetId = card.getAttribute("data-planet-id");
      displayPlanet(planetId);
  });
});



function displayPlanet(planetId) {

  const planet = planets.find(p => p.id.toLowerCase() === planetId.toLowerCase());

  if (!planet) return;

  document.getElementById("planetDetails").innerHTML  = `
    <div class="xl:col-span-2 bg-slate-800/50 border border-slate-700 rounded-xl md:rounded-2xl p-4 md:p-6 lg:p-8">
      <div class="flex flex-col xl:flex-row xl:items-start space-y-4 xl:space-y-0">
        <div class="relative h-48 w-48 md:h-64 md:w-64 shrink-0 mx-auto xl:mr-6">
          <img id="planet-detail-image" class="w-full h-full object-contain" src="./assets/images/${planetId}.png" alt="${planet.englishName}" />
        </div>
        <div class="flex-1">
          <div class="flex items-center justify-between mb-3 md:mb-4">
            <h3 id="planet-detail-name" class="text-2xl md:text-3xl font-space font-bold">${planet.englishName}</h3>
            <button class="w-10 h-10 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors">
              <i class="far fa-heart"></i>
            </button>
          </div>
          <p id="planet-detail-description" class="text-slate-300 mb-4 md:mb-6 leading-relaxed text-sm md:text-base">
            ${planet.description}
          </p>
        </div>
      </div>
      <div class="grid grid-cols-2 gap-2 md:gap-4 mt-4">
        <div class="bg-slate-900/50 rounded-lg p-3 md:p-4">
          <p class="text-xs text-slate-400 mb-1 flex items-center gap-1"><i class="fas fa-ruler text-xs"></i> Semimajor Axis</p>
          <p id="planet-distance" class="text-sm md:text-lg font-semibold">${(planet.semimajorAxis / 1000000).toFixed(1)}M km</p>
        </div>
        <div class="bg-slate-900/50 rounded-lg p-4">
          <p class="text-xs text-slate-400 mb-1 flex items-center gap-1"><i class="fas fa-circle"></i> Mean Radius</p>
          <p id="planet-radius" class="text-lg font-semibold">${Math.round(planet.meanRadius)} km</p>
        </div>
        <div class="bg-slate-900/50 rounded-lg p-4">
          <p class="text-xs text-slate-400 mb-1 flex items-center gap-1"><i class="fas fa-weight"></i> Mass</p>
          <p id="planet-mass" class="text-lg font-semibold">${planet.mass.massValue} × 10<sup>${planet.mass.massExponent}</sup> kg</p>
        </div>
        <div class="bg-slate-900/50 rounded-lg p-4">
          <p class="text-xs text-slate-400 mb-1 flex items-center gap-1"><i class="fas fa-compress"></i> Density</p>
          <p id="planet-density" class="text-lg font-semibold">${planet.density.toFixed(2)} g/cm³</p>
        </div>
        <div class="bg-slate-900/50 rounded-lg p-4">
          <p class="text-xs text-slate-400 mb-1 flex items-center gap-1"><i class="fas fa-sync-alt"></i> Orbital Period</p>
          <p id="planet-orbital-period" class="text-lg font-semibold">${planet.sideralOrbit.toFixed(2)} days</p>
        </div>
        <div class="bg-slate-900/50 rounded-lg p-4">
          <p class="text-xs text-slate-400 mb-1 flex items-center gap-1"><i class="fas fa-redo"></i> Rotation Period</p>
          <p id="planet-rotation" class="text-lg font-semibold">${planet.sideralRotation.toFixed(2)} hours</p>
        </div>
        <div class="bg-slate-900/50 rounded-lg p-4">
          <p class="text-xs text-slate-400 mb-1 flex items-center gap-1"><i class="fas fa-moon"></i> Moons</p>
          <p id="planet-moons" class="text-lg font-semibold">${planet.moons?.length || 0}</p>
        </div>
        <div class="bg-slate-900/50 rounded-lg p-4">
          <p class="text-xs text-slate-400 mb-1 flex items-center gap-1"><i class="fas fa-arrows-alt-v"></i> Gravity</p>
          <p id="planet-gravity" class="text-lg font-semibold">${planet.gravity} m/s²</p>
        </div>
      </div>
    </div>
    
    <div class="space-y-6">
      <div class="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
        <h4 class="font-semibold mb-4 flex items-center"><i class="fas fa-user-astronaut text-purple-400 mr-2"></i> Discovery Info</h4>
        <div class="space-y-3 text-sm">
          <div class="flex justify-between items-center py-2 border-b border-slate-700"><span class="text-slate-400">Discovered By</span><span id="planet-discoverer" class="font-semibold text-right">${planet.discoveredBy || 'Known since antiquity'}</span></div>
          <div class="flex justify-between items-center py-2 border-b border-slate-700"><span class="text-slate-400">Discovery Date</span><span id="planet-discovery-date" class="font-semibold">${planet.discoveryDate || 'Ancient times'}</span></div>
          <div class="flex justify-between items-center py-2 border-b border-slate-700"><span class="text-slate-400">Body Type</span><span id="planet-body-type" class="font-semibold">${planet.bodyType}</span></div>
          <div class="flex justify-between items-center py-2"><span class="text-slate-400">Volume</span><span id="planet-volume" class="font-semibold">${planet.vol.volValue} × 10<sup>${planet.vol.volExponent}</sup> km³</span></div>
        </div>
      </div>

      <div
                class="bg-slate-800/50 border border-slate-700 rounded-2xl p-6"
              >
                <h4 class="font-semibold mb-4 flex items-center">
                  <i class="fas fa-lightbulb text-yellow-400 mr-2"></i>
                  Quick Facts
                </h4>
                <ul id="planet-facts" class="space-y-3 text-sm">
                  <li class="flex items-start">
                    <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
                    <span class="text-slate-300"
                      >Mass : ${planet.mass.massValue} × 10<sup>${planet.mass.massExponent}</sup> kg</span
                    >
                  </li>
                  <li class="flex items-start">
                    <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
                    <span class="text-slate-300"
                      >Surface gravity: ${planet.gravity} m/s²</span
                    >
                  </li>
                  <li class="flex items-start">
                    <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
                    <span class="text-slate-300"
                      >Density: ${planet.density} g/cm³ </span
                    >
                  </li>
                  <li class="flex items-start">
                    <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
                    <span class="text-slate-300"
                      >Axial tilt: ${planet.axialTilt}°</span
                    >
                  </li>
                </ul>
              </div>
      
      <div class="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
        <h4 class="font-semibold mb-4 flex items-center"><i class="fas fa-satellite text-blue-400 mr-2"></i> Orbital Characteristics</h4>
        <div class="space-y-3 text-sm">
          <div class="flex justify-between items-center py-2 border-b border-slate-700"><span class="text-slate-400">Perihelion</span><span id="planet-perihelion" class="font-semibold">${(planet.perihelion / 1000000).toFixed(1)}M km</span></div>
          <div class="flex justify-between items-center py-2 border-b border-slate-700"><span class="text-slate-400">Aphelion</span><span id="planet-aphelion" class="font-semibold">${(planet.aphelion / 1000000).toFixed(1)}M km</span></div>
          <div class="flex justify-between items-center py-2 border-b border-slate-700"><span class="text-slate-400">Eccentricity</span><span id="planet-eccentricity" class="font-semibold">${planet.eccentricity.toFixed(5)}</span></div>
          <div class="flex justify-between items-center py-2 border-b border-slate-700"><span class="text-slate-400">Inclination</span><span id="planet-inclination" class="font-semibold">${planet.inclination.toFixed(2)}°</span></div>
          <div class="flex justify-between items-center py-2 border-b border-slate-700"><span class="text-slate-400">Axial Tilt</span><span id="slate-400" class="font-semibold">${planet.axialTilt.toFixed(2)}°</span></div>
          <div class="flex justify-between items-center py-2 border-b border-slate-700"><span class="text-slate-400">Avg Temperature</span><span id="planet-temp" class="font-semibold">${Math.round(planet.avgTemp)}°C</span></div>
          <div class="flex justify-between items-center py-2"><span class="text-slate-400">Escape Velocity</span><span id="planet-escape" class="font-semibold">${(planet.escape / 1000).toFixed(2)} km/s</span></div>
        </div>
      </div>
    </div>`;

   
}
