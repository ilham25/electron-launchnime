// All Variables

// Import Section
const { remote } = require("electron");
const path = require("path");
const fs = require("fs");
const ls = require("local-storage");
const fileUrl = require("file-url");

// Etc Variables
let dirData;
dialog = remote.dialog;
const w = remote.getCurrentWindow();

// Content
const homeContent = document.querySelector(".home-content");
const listContent = document.querySelector(".list-content");
const historyContent = document.querySelector(".history-content");

// Header button / header action button

const closeBtn = document.querySelector(".btn-close");
const minimizeBtn = document.querySelector(".btn-minimize");
const settingsBtn = document.querySelector(".btn-settings");

// Main content

const lastWatched = document.querySelector(".last-watched");
const lastAdded = document.querySelector(".last-added");

// List Content
const animeLists = document.querySelectorAll(".anime-list");

// Dock action button

const btnList = document.querySelector(".btn-list");
const btnHome = document.querySelector(".btn-home");
const btnHistory = document.querySelector(".btn-history");

// Settings
const settingsModal = document.querySelector(".settings-modal");
const wpChangeBtn = document.querySelector(".settings-wp-browse");
// Component

const wpContainer = document.querySelector(".content");

// All Function

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

// Get Anime Directory
const getAnimeDirectory = () => {
  let options = {
    properties: ["openDirectory"],
  };

  let folderPath = dialog.showOpenDialog(options);
  //   console.log("folderConsole", folderPath);

  folderPath.then((value) => {
    //   Get the selected directory
    console.log("selectedDirectory : ", value.filePaths[0]);
    dirData = value.filePaths[0];

    // Get all files from selected directory
    // fs.readdir(value.filePaths[0], (err, files) => {
    //   // files from selected directory in array
    //   console.log(files);

    //   // Loop the entire files array in selectedDirectory

    //   //   files.forEach((file) => {
    //   //     console.log(file);
    //   //   });
    // });
  });
};

// Check custom wallpaper
const wpCheck = () => {
  if (ls.get("wpData") == null) {
    wpContainer.style.backgroundImage = `url("./assets/img/wp.jpg")`;
  } else {
    try {
      wpContainer.style.backgroundImage = `url("${fileUrl(ls.get("wpData"))}")`;
    } catch (error) {
      console.log(error);
      resetWp();
    }
  }
};

// Reset Wallpaper (Debugging Only)
const resetWp = () => {
  ls.remove("wpData");
  wpContainer.style.backgroundImage = `url("./assets/img/wp.jpg")`;
  // wpContainer.style.backgroundImage = `url("${encodeURI(
  //   "E:IlhamWallpapers\10-13.jpg"
  // )}")`;
};

const wpDebug = () => {
  wpContainer.style.backgroundImage = `url("file:///${path.normalize(
    "D:\68041c3351e8eb088c671c7dcbd41295.jpg"
  )}")`;
};
// Change Wallpaper Function
const changeWallpaper = () => {
  let options = {
    properties: ["openFile"],
    title: "Change Wallpaper",
    filters: [{ name: "Images", extensions: ["jpg", "png", "gif", "bmp"] }],
  };
  let filePath = dialog.showOpenDialog(options);
  filePath.then((value) => {
    if (value.filePaths[0] == undefined) {
      wpCheck();
      return value.filePaths[0];
    } else {
      console.log("platform windows change wp ");
      ls.set("wpData", value.filePaths[0]);
      wpContainer.style.backgroundImage = `url('${fileUrl(ls.get("wpData"))}')`;
    }
  });
};

// Routing Home, List, History page
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

// Looping anime list DOM onClick
const fetchAnimeList = () => {
  animeLists.forEach((animeList) => {
    animeList.addEventListener("click", () => {
      const dataDirectory = animeList.getAttribute("data-directory");
      console.log("fetchAnimeList loop : ", dataDirectory);
    });
  });
};

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

// ------------
// ------------

settingsBtn.addEventListener("click", () => {
  settingsModal.classList.toggle("active");
  // console.log(settingsModal);
});

settingsModal.addEventListener("click", (e) => {
  e.target.classList.forEach((element) => {
    if (element === "active") {
      settingsModal.classList.toggle("active");
    }
  });
});

wpChangeBtn.addEventListener("click", () => {
  changeWallpaper();
  settingsModal.classList.toggle("active");
});
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

lastWatched.addEventListener("click", () => {
  console.log("last watched clicked!");
  getAnimeDirectory();
});

lastAdded.addEventListener("click", () => {
  console.log("last added clicked!");
  console.log(`directory : `, dirData);
});

btnList.addEventListener("click", () => {
  pageRouter("list");
});

btnHome.addEventListener("click", () => {
  pageRouter("home");
});

btnHistory.addEventListener("click", () => {
  pageRouter("history");
});

// Etc

// Run startup function
wpCheck();

// Debugging only

// fetchAnimeList();
// createAnimeList();
// fetchAnimeList();

// Change Wallpaper Script
// document.querySelector(".content").style.backgroundImage =
// "url('./assets/img/wp2.jpeg')";
