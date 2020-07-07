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
const listWpContainer = document.querySelector(".list-content-thumbnail");
const listWpThumbnail = document.querySelector(".list-content-thumbnail img");
const listWpTitle = document.querySelector(
  ".list-content-thumbnail .list-content-thumbnail-overlay .overlay-description h1"
);
const listWpEpisode = document.querySelector(
  ".list-content-thumbnail .list-content-thumbnail-overlay .overlay-description h3"
);

// Dock action button

const btnList = document.querySelector(".btn-list");
const btnHome = document.querySelector(".btn-home");
const btnHistory = document.querySelector(".btn-history");

// Settings
const settingsModal = document.querySelector(".settings-modal");
const wpChangeBtn = document.querySelector(".settings-wp-browse");
const wpDefault = document.querySelector(".settings-wp-default");
// Component

const wpContainer = document.querySelector(".content");

// All Function

// Creating dummy object

const appData = {
  animeData: [
    {
      title: "Plastic Memories",
      directory: "",
      thumbnail: `E:\\Ilham\\Wallpapers\\SoGa.jpg`,
    },
    {
      title: "Bungou Stray Dogs",
      directory: "dir2",
      thumbnail: `E:\\Ilham\\Wallpapers\\Noerulb-Nakajima-Atsushi.png`,
    },
    {
      title: "Re Zero",
      directory: "dir3",
      thumbnail: `E:\\Ilham\\Wallpapers\\REM PC -CSMS.jpg`,
    },
    {
      title: "Saenai Heroine no Sodatekata",
      directory: "dir4",
      thumbnail: `E:\\Ilham\\Wallpapers\\SAEKANO PC -CSMS.jpg`,
    },
    {
      title: "Nisekoi",
      directory: "dir5",
      thumbnail: `E:\\Ilham\\Wallpapers\\TEAMCHITOGE PC.jpg`,
    },
    {
      title: "Kyoukai no Kanata Movie : I'll be Here",
      directory: "dir6",
      thumbnail:
        "E:\\Ilham\\Wallpapers\\[KORIGENGI-FAKHRI] Mirai - I'll Be Here.png",
    },
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
    console.log("selectedDirectory : ", fileUrl(value.filePaths[0]));
    dirData = fileUrl(value.filePaths[0]);

    // Get all files from selected directory
    fs.readdir(value.filePaths[0], (err, files) => {
      console.log(value.filePaths[0]);
      // files from selected directory in array
      console.log(files);

      // Loop the entire files array in selectedDirectory

      //   files.forEach((file) => {
      //     console.log(file);
      //   });
    });
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

// Creating dynamic DOM
const createAnimeList = () => {
  const listContainer = document.querySelector(".ani-container");
  appData.animeData.forEach((anime) => {
    const domAnimeList = document.createElement("div");
    domAnimeList.classList.add("anime-list-container");
    domAnimeList.setAttribute("data-directory", anime.directory);
    // domAnimeList.innerText = anime.title;
    // domAnimeList.innerHTML = `<li class="" data-directory="${anime.directory}">mantap</li>`;
    domAnimeList.innerHTML = `<p>${anime.title}</p><small>Directory : ${anime.directory}</small>`;
    // Looping click event
    domAnimeList.addEventListener("click", () => {
      // console.log(domAnimeList.getAttribute("data-directory"));
      // console.log(fileUrl(anime.thumbnail));
      // console.log(listWpThumbnail);
      // console.log(listWpTitle);
      // console.log(listWpEpisode);
      listWpContainer.style.opacity = 0;
      setTimeout(() => {
        listWpThumbnail.src = fileUrl(anime.thumbnail);
        listWpTitle.innerText = anime.title;
        listWpContainer.style.opacity = 1;
      }, 300);
    });
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
wpDefault.addEventListener("click", () => {
  resetWp();
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

// Key Event
document.body.addEventListener("keydown", (e) => {
  if (e.key == "Escape") {
    settingsModal.classList.remove("active");
  }
});

// Etc

// Run startup function
wpCheck();

// Debugging only

// fetchAnimeList();
createAnimeList();
// fetchAnimeList();

// Change Wallpaper Script
// document.querySelector(".content").style.backgroundImage =
// "url('./assets/img/wp2.jpeg')";
