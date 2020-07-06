// const { remote } = require("electron");
const w = remote.getCurrentWindow();
// Content
const homeContent = document.querySelector(".home-content");
const listContent = document.querySelector(".list-content");
const historyContent = document.querySelector(".history-content");

// Header button / header action button
const closeBtn = document.querySelector(".btn-close");
const minimizeBtn = document.querySelector(".btn-minimize");
closeBtn.addEventListener("click", () => {
  console.log("close button");
  w.close();
  // document.querySelector(".content").style.backgroundImage =
  //   "url('./assets/img/wp3.jpg')";
});

minimizeBtn.addEventListener("click", () => {
  console.log("minimize button");
  w.minimize();
  // document.querySelector(".content").style.backgroundImage =
  //   "url('./assets/img/wp.jpg')";
});

// Main content
const lastWatched = document.querySelector(".last-watched");
const lastAdded = document.querySelector(".last-added");
lastWatched.addEventListener("click", () => {
  console.log("last watched clicked!");
});

lastAdded.addEventListener("click", () => {
  console.log("last added clicked!");
});

// Dock action button
const btnList = document.querySelector(".btn-list");
const btnHome = document.querySelector(".btn-home");
const btnHistory = document.querySelector(".btn-history");

btnList.addEventListener("click", () => {
  pageRouter("list");
});

btnHome.addEventListener("click", () => {
  pageRouter("home");
});

btnHistory.addEventListener("click", () => {
  pageRouter("history");
});

const pageRouter = (btnName) => {
  switch (btnName) {
    case "home":
      // Button toggle
      btnList.classList.remove("active");
      btnHistory.classList.remove("active");
      btnHome.classList.add("active");

      // Page toggle
      homeContent.style.opacity = 1;
      homeContent.style.pointerEvents = "all";
      historyContent.style.opacity = 0;
      historyContent.style.pointerEvents = "none";
      listContent.style.opacity = 0;
      listContent.style.pointerEvents = "none";
      break;
    case "list":
      // Button toggle
      btnHome.classList.remove("active");
      btnHistory.classList.remove("active");
      btnList.classList.add("active");
      // Page toggle
      homeContent.style.opacity = 0;
      homeContent.style.pointerEvents = "none";
      historyContent.style.opacity = 0;
      historyContent.style.pointerEvents = "none";
      listContent.style.opacity = 1;
      listContent.style.pointerEvents = "all";

      break;
    case "history":
      // Button toggle
      btnHome.classList.remove("active");
      btnList.classList.remove("active");
      btnHistory.classList.add("active");
      // Page toggle
      homeContent.style.opacity = 0;
      homeContent.style.pointerEvents = "none";
      historyContent.style.opacity = 1;
      historyContent.style.pointerEvents = "all";
      listContent.style.opacity = 0;
      listContent.style.pointerEvents = "none";
      break;

    default:
      break;
  }
};

// Etc

// Creating dummy object
const appData = {
  animeData: [
    {
      title: "aowkoawk1",
      directory: "dir1",
      thumbnail: "thumb1",
    },
    {
      title: "aowkoawk2",
      directory: "dir2",
      thumbnail: "thumb2",
    },
    {
      title: "aowkoawk3",
      directory: "dir3",
      thumbnail: "thumb3",
    },
    {
      title: "aowkoawk4",
      directory: "dir4",
      thumbnail: "thumb4",
    },
    {
      title: "aowkoawk5",
      directory: "dir5",
      thumbnail: "thumb5",
    },
    {
      title: "aowkoawk6",
      directory: "dir6",
      thumbnail: "thumb6",
    },
    ,
  ],
  wallpaperData: "",
};

// Looping anime list DOM onClick
const animeLists = document.querySelectorAll(".anime-list");
const fetchAnimeList = () => {
  animeLists.forEach((animeList) => {
    animeList.addEventListener("click", () => {
      const dataDirectory = animeList.getAttribute("data-directory");
      console.log("fetchAnimeList loop : ", dataDirectory);
    });
  });
};

// fetchAnimeList();

// Creating dynamic DOM
const createAnimeList = () => {
  const listContainer = document.querySelector(".list-container ul");
  appData.animeData.forEach((anime) => {
    const domAnimeList = document.createElement("li");
    domAnimeList.setAttribute("data-directory", anime.directory);
    domAnimeList.innerText = anime.title;
    // domAnimeList.innerHTML = `<li class="" data-directory="${anime.directory}">mantap</li>`;
    listContainer.appendChild(domAnimeList);
    console.log("anime foreach loop : ", anime.directory);
  });
};

// createAnimeList();
// fetchAnimeList();

// Change Wallpaper Script
// document.querySelector(".content").style.backgroundImage =
// "url('./assets/img/wp2.jpeg')";
