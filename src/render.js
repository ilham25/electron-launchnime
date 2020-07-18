// All Variables

// Import Section
const { remote } = require("electron");
const path = require("path");
const fs = require("fs");
const ls = require("local-storage");
const fileUrl = require("file-url");
const { set } = require("local-storage");
const { dir } = require("console");
const { title } = require("process");

// Etc Variables
let dirData;
let thumbData;
dialog = remote.dialog;
const w = remote.getCurrentWindow();
let appData = ls.get("appData");

// Content
const homeContent = document.querySelector(".home-content");
const listContent = document.querySelector(".list-content");
const historyContent = document.querySelector(".history-content");

// Header button / header action button

const closeBtn = document.querySelector(".btn-close");
const minimizeBtn = document.querySelector(".btn-minimize");
const settingsBtn = document.querySelector(".btn-settings");

// Main content

// Last Watched Content
const lastWatched = document.querySelector(".last-watched");

// Last Added Content
const lastAddedContainer = document.querySelector(
  ".home-content-thumbnail .last-added"
);
const lastAdded = document.querySelector(".last-added");
const lastPict = document.querySelector(".last-added img");
const lastTitle = document.querySelector(".last-added-title");
const lastTotalEpisode = document.querySelector(".last-added-episodes");
const lastAddedOverlay = document.querySelector(
  ".last-added .home-content-overlay"
);

// List Content
const listWpContainer = document.querySelector(".list-content-thumbnail");
const listWpThumbnail = document.querySelector(".list-content-thumbnail img");
const listWpTitle = document.querySelector(
  ".list-content-thumbnail .list-content-thumbnail-overlay .overlay-description h1"
);
const listWpEpisode = document.querySelector(
  ".list-content-thumbnail .list-content-thumbnail-overlay .overlay-description h3"
);
const listContainer = document.querySelector(".ani-container");
const containerList = document.querySelector(".list-container");
const emptyContainer = document.querySelector(".empty-anime-insert");
const emptyContainerBtn = document.querySelector(".empty-anime-container");
const aniInputContainer = document.querySelector(".ani-input-container");

// Dock action button

const btnList = document.querySelector(".btn-list");
const btnHome = document.querySelector(".btn-home");
const btnHistory = document.querySelector(".btn-history");

// Settings
const settingsModal = document.querySelector(".settings-modal");
const settingsDialog = document.querySelector(".settings-dialog");
const deleteDialog = document.querySelector(".delete-dialog");
const wpChangeBtn = document.querySelector(".settings-wp-browse");
const wpDefault = document.querySelector(".settings-wp-default");
const deleteMessage = document.querySelector(".message");
const deleteYes = document.querySelector(".confirm-yes");
const deleteNo = document.querySelector(".confirm-no");

// Component
const wpContainer = document.querySelector(".content");

// Custom notification
const notifContainer = document.querySelector(".notification-container");
const notifMessage = document.querySelector(
  ".notification-container .notification-message"
);
// Input anime
const inputAnimeModal = document.querySelector(".input-anime-modal");
const inputAnimeTitle = document.querySelector(".anime-form-title");
const inputAnimeDirectory = document.querySelector(".form-directory");
const textDirectory = document.querySelector(".anime-form-directory");
const inputAnimeThumbnail = document.querySelector(".form-thumbnail");
const textThumbnail = document.querySelector(".anime-form-thumbnail");
const inputBtn = document.querySelector(".form-input-btn");

// Play Anime
const playAnimeWp = document.querySelector(".play-anime");
const playBackBtn = document.querySelector(".play-back-btn");

const playListContainer = document.querySelector(".series-episode");
const videoPlayer = document.querySelector("#my-video");
const videoContainer = document.querySelector(".episode-player");

const episodeText = document.querySelector(".episode-description h1");
const episodeTitle = document.querySelector(".episode-description p");

const aniTitle = document.querySelector(".series-header h2");
const aniEpisode = document.querySelector(".series-header h4");

// Get Anime Directory
const getAnimeDirectory = () => {
  let options = {
    properties: ["openDirectory"],
  };

  let folderPath = dialog.showOpenDialog(options);
  folderPath.then((value) => {
    //   Get the selected directory
    dirData = value.filePaths[0];
    textDirectory.innerText = dirData;
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
};

// Get Episode Length
const getAnimeEpisode = (dir, param, callback) => {
  const filterFile = [];
  fs.readdir(dir, (err, files) => {
    files.forEach((file) => {
      const fileExtensions = file.split(".").pop();
      if (
        fileExtensions == "mp4" ||
        fileExtensions == "mkv" ||
        fileExtensions == "flv" ||
        fileExtensions == "3gp" ||
        fileExtensions == "mov" ||
        fileExtensions == "wmv" ||
        fileExtensions == "avi"
      ) {
        filterFile.push(file);
      }
    });
    switch (param) {
      case "length":
        callback(filterFile.length);
        break;
      case "firstItem":
        callback(filterFile[0]);
        break;
      case "allItem":
        callback(filterFile);
        break;

      default:
        break;
    }
  });
};

// Custom notification control

const custNotif = (title, flag) => {
  notifContainer.style.opacity = 1;
  notifContainer.style.pointerEvents = "all";
  switch (flag) {
    case "insert":
      notifMessage.innerText = `'${title}' added successfully!`;
      break;
    case "delete":
      notifMessage.innerText = `'${title}' deleted successfully!`;
      break;
    default:
      break;
  }
  setTimeout(() => {
    notifContainer.style.opacity = 0;
    notifContainer.style.pointerEvents = "none";
    notifMessage.innerText = "-";
  }, 3000);
};
// Change Wallpaper Function
const changeWallpaper = (picParam) => {
  let options = {
    properties: ["openFile"],
    title: "Pick Image",
    filters: [{ name: "Images", extensions: ["jpg", "png", "gif", "bmp"] }],
  };
  let filePath = dialog.showOpenDialog(options);
  filePath.then((value) => {
    if (value.filePaths[0] == undefined) {
      wpCheck();
      return value.filePaths[0];
    } else {
      if (picParam === "change") {
        ls.set("wpData", value.filePaths[0]);
        wpContainer.style.backgroundImage = `url('${fileUrl(
          ls.get("wpData")
        )}')`;
      } else if (picParam === "browse") {
        thumbData = value.filePaths[0];
        textThumbnail.innerText = value.filePaths[0];
      }
    }
  });
};

const componentDisplay = (flag, display) => {
  switch (flag) {
    case "emptyContainer":
      if (display == true) {
        listWpContainer.style.opacity = 0;
        listWpContainer.style.pointerEvents = "none";
        containerList.style.opacity = 0;
        containerList.style.pointerEvents = "none";
        emptyContainer.style.opacity = 1;
        emptyContainer.style.pointerEvents = "all";
      } else {
        emptyContainer.style.opacity = 0;
        emptyContainer.style.pointerEvents = "none";
        listWpContainer.style.opacity = 1;
        listWpContainer.style.pointerEvents = "all";
        containerList.style.opacity = 1;
        containerList.style.pointerEvents = "all";
      }
      break;
    case "settingsDialog":
      if (display == true) {
        settingsDialog.style.pointerEvents = "all";
        settingsDialog.style.opacity = 1;
        deleteDialog.style.opacity = 0;
        deleteDialog.style.pointerEvents = "none";
      } else {
        deleteDialog.style.pointerEvents = "none";
        settingsDialog.style.pointerEvents = "none";
      }
      break;
    case "deleteDialog":
      if (display == true) {
        settingsDialog.style.opacity = 0;
        settingsDialog.style.pointerEvents = "none";
        deleteDialog.style.opacity = 1;
        deleteDialog.style.pointerEvents = "all";
      } else {
        deleteDialog.style.pointerEvents = "none";
        settingsDialog.style.pointerEvents = "none";
      }
      break;
    case "home":
      if (display == true) {
        homeContent.style.opacity = 1;
        homeContent.style.pointerEvents = "all";
      } else {
        homeContent.style.opacity = 0;
        homeContent.style.pointerEvents = "none";
      }
      break;
    case "list":
      if (display == true) {
        listContent.style.opacity = 1;
        listContent.style.pointerEvents = "all";
      } else {
        listContent.style.opacity = 0;
        listContent.style.pointerEvents = "none";
        listWpContainer.style.pointerEvents = "none";
        containerList.style.opacity = 0;
        containerList.style.pointerEvents = "none";
        emptyContainer.style.opacity = 0;
        emptyContainer.style.pointerEvents = "none";
      }
      break;
    case "history":
      if (display == true) {
        historyContent.style.opacity = 1;
        historyContent.style.pointerEvents = "all";
      } else {
        historyContent.style.opacity = 0;
        historyContent.style.pointerEvents = "none";
      }
      break;
    case "dockHome":
      if (display == true) {
        btnList.classList.remove("active");
        btnHistory.classList.remove("active");
        btnHome.classList.add("active");
      }
      break;
    case "dockList":
      if (display == true) {
        btnHome.classList.remove("active");
        btnHistory.classList.remove("active");
        btnList.classList.add("active");
      }
      break;
    case "dockHistory":
      if (display == true) {
        btnHome.classList.remove("active");
        btnList.classList.remove("active");
        btnHistory.classList.add("active");
      }
      break;
    case "lastAddedOverlay":
      if (display == true) {
        lastAddedOverlay.addEventListener("mouseenter", (e) => {
          lastAddedOverlay.style.backgroundColor = "rgba(0,0,0,0.2)";
        });
        lastAddedOverlay.addEventListener("mouseleave", () => {
          lastAddedOverlay.style.backgroundColor = "rgba(0,0,0,0.5)";
        });
        lastAddedOverlay.style.backgroundColor = "rgba(0,0,0,0.5)";
        lastPict.style.opacity = 1;
      } else {
        lastAddedOverlay.addEventListener("mouseenter", (e) => {
          lastAddedOverlay.style.backgroundColor = "rgba(0,0,0,0.0)";
        });
        lastAddedOverlay.addEventListener("mouseleave", () => {
          lastAddedOverlay.style.backgroundColor = "rgba(0,0,0,0.0)";
        });
        // lastAddedContainer.style.boxShadow = 0;
        lastAddedOverlay.style.backgroundColor = "rgba(0,0,0,0)";
        lastPict.style.opacity = 0;
      }
      break;
    case "playAnimeWp":
      if (display == true) {
        playAnimeWp.style.opacity = 1;
        playAnimeWp.style.pointerEvents = "all";
      } else {
        playAnimeWp.style.opacity = 0;
        playAnimeWp.style.pointerEvents = "none";
      }
      break;
    default:
      break;
  }
};

const lastAddedCheck = () => {
  const { animeData } = appData;
  if (animeData.length == 0) {
    componentDisplay("lastAddedOverlay", false);
    lastAdded.removeAttribute("data-directory");
    lastAdded.removeAttribute("data-title");
    lastAdded.removeAttribute("data-thumbnail");
    lastTitle.innerText = "No anime available";
    lastTotalEpisode.innerText = "-";
  } else {
    componentDisplay("lastAddedOverlay", true);
    const lastIndex = animeData.length - 1;
    lastPict.src = animeData[lastIndex].thumbnail;
    lastTitle.innerText = animeData[lastIndex].title;
    lastAdded.setAttribute("data-directory", animeData[lastIndex].directory);
    lastAdded.setAttribute("data-title", animeData[lastIndex].title);
    lastAdded.setAttribute("data-thumbnail", animeData[lastIndex].thumbnail);
    getAnimeEpisode(animeData[lastIndex].directory, "length", (value) => {
      lastTotalEpisode.innerText = `Total Episode : ${value}`;
    });
  }
};
// Routing Home, List, History page
const pageRouter = (btnName) => {
  wpCheck();
  switch (btnName) {
    case "home":
      // Button toggle
      componentDisplay("dockHome", true);
      // Page toggle
      componentDisplay("home", true);
      componentDisplay("list", false);
      componentDisplay("history", false);
      // etc
      lastAddedCheck();
      break;
    case "list":
      // Button toggle
      componentDisplay("dockList", true);
      // Page toggle
      componentDisplay("home", false);
      componentDisplay("history", false);
      componentDisplay("list", true);
      break;
    case "history":
      // Button toggle
      componentDisplay("dockHistory", true);
      // Page toggle
      componentDisplay("home", false);
      componentDisplay("list", false);
      componentDisplay("history", true);
      break;

    default:
      break;
  }
};

// Creating dynamic DOM
const createAnimeList = () => {
  listContainer.innerHTML = "";
  const { animeData } = appData;
  if (appData.animeData.length == 0) {
    wpCheck();
    componentDisplay("emptyContainer", true);
  } else {
    componentDisplay("emptyContainer", false);
    listWpContainer.setAttribute("data-directory", animeData[0].directory);
    listWpContainer.setAttribute("data-thumbnail", animeData[0].thumbnail);
    listWpContainer.setAttribute("data-title", animeData[0].title);
    wpContainer.style.backgroundImage = `url("${fileUrl(
      animeData[0].thumbnail
    )}")`;
    listWpThumbnail.src = animeData[0].thumbnail;
    listWpTitle.innerText = animeData[0].title;
    getAnimeEpisode(animeData[0].directory, "length", (value) => {
      listWpEpisode.innerText = `Total Episode : ${value}`;
    });
  }
  animeData.forEach((anime, index) => {
    const domAnimeList = document.createElement("div");
    domAnimeList.classList.add("anime-list-container");
    domAnimeList.setAttribute("data-directory", anime.directory);
    domAnimeList.setAttribute("title", anime.title);

    getAnimeEpisode(anime.directory, "length", (value) => {
      domAnimeList.innerHTML = ` 
        <div class="anime-title-container">
          <!-- <div class="title-child"> -->
            <p>${anime.title}</p>
            <small>Total Episode : ${value}</small>
          <!-- </div> -->
        </div>`;
    });
    domAnimeList.addEventListener("click", () => {
      listWpContainer.setAttribute("data-title", anime.title);
      listWpContainer.setAttribute("data-directory", anime.directory);
      listWpContainer.setAttribute("data-thumbnail", anime.thumbnail);
      listWpContainer.style.opacity = 0;
      wpContainer.style.backgroundImage = `url("${fileUrl(anime.thumbnail)}")`;
      setTimeout(() => {
        listWpThumbnail.src = anime.thumbnail;
        listWpTitle.innerText = anime.title;
        getAnimeEpisode(anime.directory, "length", (value) => {
          listWpEpisode.innerText = `Total Episode : ${value}`;
        });
        listWpContainer.style.opacity = 1;
      }, 300);
    });

    domAnimeList.addEventListener("contextmenu", () => {
      deleteDialog.setAttribute("data-index", index);
      settingsModal.classList.toggle("active");
      componentDisplay("deleteDialog", true);
      deleteMessage.innerText = `Are you sure want to delete '${anime.title}'?`;
    });

    listContainer.appendChild(domAnimeList);
  });
};

const createEpisodeList = (dir, title) => {
  playListContainer.innerHTML = "";
  aniTitle.innerText = title;
  getAnimeEpisode(dir, "firstItem", (value) => {
    videoPlayer.src = fileUrl(`${dir}\\${value}`);
  });
  episodeText.innerText = `Episode 1`;
  getAnimeEpisode(dir, "length", (value) => {
    aniEpisode.innerText = `Total Episode : ${value}`;
  });
  getAnimeEpisode(dir, "allItem", (value) => {
    value.forEach((file, index) => {
      const domEpisodeList = document.createElement("div");
      domEpisodeList.classList.add("eps");
      domEpisodeList.setAttribute("title", file);
      domEpisodeList.setAttribute("data-title", `Episode ${index + 1}`);
      domEpisodeList.setAttribute("data-file", `${dir}\\${file}`);
      domEpisodeList.innerHTML = `
          <div class="eps-title">
            <p>Episode ${index + 1}</p>
            <small>${title}</small>
          </div>`;
      episodeTitle.innerText = title;
      domEpisodeList.addEventListener("click", () => {
        const fileDir = domEpisodeList.getAttribute("data-file");
        videoPlayer.src = fileUrl(fileDir);
        episodeText.innerText = `Episode ${index + 1}`;
      });
      playListContainer.appendChild(domEpisodeList);
    });
  });
};
const resetData = () => {
  const { animeData } = appData;
  animeData.splice(0, animeData.length);
  // console.log(animeData);
  createAnimeList();
  emptyContainer.style.pointerEvents = "none";
};

const insertAnime = (title, directory, thumbnail) => {
  const { animeData } = appData;
  const newAnimeData = {
    title: title,
    directory: directory,
    thumbnail: thumbnail,
  };
  animeData.push(newAnimeData);
  ls.set("appData", appData);
};

const clearInputForm = () => {
  thumbData = undefined;
  dirData = undefined;
  inputAnimeTitle.value = "";
  textDirectory.innerText = "-";
  textThumbnail.innerText = "-";
};

const dataCheck = () => {
  if (appData == null) {
    const dummyData = { animeData: [] };
    ls.set("appData", dummyData);
    appData = ls.get("appData");
  }
};
const startUp = () => {
  videoPlayer.setAttribute("width", videoContainer.clientWidth);
  videoPlayer.setAttribute("heigh", videoContainer.clientHeight);
  dataCheck();
  lastAddedCheck();
  wpCheck();
};

// ------------
// ------------

settingsBtn.addEventListener("click", () => {
  settingsModal.classList.toggle("active");
  componentDisplay("settingsDialog", true);
});

settingsModal.addEventListener("click", (e) => {
  e.target.classList.forEach((element) => {
    if (element === "active") {
      settingsModal.classList.toggle("active");
      componentDisplay("settingsDialog", false);
    }
  });
});

deleteYes.addEventListener("click", () => {
  const { animeData } = appData;
  const deleteIndex = deleteDialog.getAttribute("data-index");
  const deleteTitle = animeData[deleteIndex].title;
  animeData.splice(deleteIndex, 1);
  ls.set("appData", appData);
  createAnimeList();
  settingsModal.classList.toggle("active");
  custNotif(deleteTitle, "delete");
  lastAddedCheck();
  componentDisplay("deleteDialog", false);
});
deleteNo.addEventListener("click", () => {
  settingsModal.classList.toggle("active");
  componentDisplay("deleteDialog", false);
});
emptyContainerBtn.addEventListener("click", () => {
  inputAnimeModal.classList.toggle("active");
});

aniInputContainer.addEventListener("click", () => {
  inputAnimeModal.classList.toggle("active");
});
inputAnimeModal.addEventListener("click", (e) => {
  e.target.classList.forEach((element) => {
    if (element === "active") {
      clearInputForm();
      inputAnimeModal.classList.toggle("active");
    }
  });
});

inputAnimeDirectory.addEventListener("click", () => {
  getAnimeDirectory();
  textDirectory.style.color = "#4d94ff";
});
inputAnimeThumbnail.addEventListener("click", () => {
  changeWallpaper("browse");
  textThumbnail.style.color = "#4d94ff";
});
inputBtn.addEventListener("click", () => {
  if (inputAnimeTitle.value == "") {
    alert("Insert title first");
  } else if (dirData == undefined) {
    textDirectory.style.color = "red";
    textDirectory.innerText = "Insert directory";
  } else if (thumbData == undefined) {
    textThumbnail.style.color = "red";
    textThumbnail.innerText = "Insert thumbnail image";
  } else {
    const title = inputAnimeTitle.value;
    insertAnime(title, dirData, thumbData);
    inputAnimeModal.classList.toggle("active");
    createAnimeList();
    clearInputForm();
    custNotif(title, "insert");
  }
});

wpChangeBtn.addEventListener("click", () => {
  changeWallpaper("change");
  settingsDialog.style.pointerEvents = "none";
  settingsModal.classList.toggle("active");
});
wpDefault.addEventListener("click", () => {
  resetWp();
});

listWpContainer.addEventListener("click", () => {
  const title = listWpContainer.getAttribute("data-title");
  const thumbnail = listWpContainer.getAttribute("data-thumbnail");
  const directory = listWpContainer.getAttribute("data-directory");
  wpContainer.style.backgroundImage = `url("${fileUrl(thumbnail)}")`;
  playAnimeWp.style.backgroundImage = `url("${fileUrl(thumbnail)}")`;
  createEpisodeList(directory, title);
  componentDisplay("playAnimeWp", true);
});

closeBtn.addEventListener("click", () => {
  w.close();
});

minimizeBtn.addEventListener("click", () => {
  w.minimize();
});

lastWatched.addEventListener("click", () => {});

lastAdded.addEventListener("click", () => {
  const title = lastAdded.getAttribute("data-title");
  const thumbnail = lastAdded.getAttribute("data-thumbnail");
  const directory = lastAdded.getAttribute("data-directory");

  if (title !== null || thumbnail !== null || directory !== null) {
    playAnimeWp.style.backgroundImage = `url("${fileUrl(thumbnail)}")`;
    componentDisplay("playAnimeWp", true);
    createEpisodeList(directory, title);
  }
});

btnList.addEventListener("click", () => {
  pageRouter("list");
  createAnimeList();
});

btnHome.addEventListener("click", () => {
  pageRouter("home");
});

btnHistory.addEventListener("click", () => {
  pageRouter("history");
});

notifContainer.addEventListener("click", () => {
  notifContainer.style.opacity = 0;
  notifContainer.style.pointerEvents = "none";
  notifMessage.innerText = "-";
});

playBackBtn.addEventListener("click", () => {
  componentDisplay("playAnimeWp", false);
  playListContainer.innerHTML = ``;
  aniTitle.innerText = "";
  aniEpisode.innerText = "";
  episodeTitle.innerText = "";
  episodeText.innerText = "";
  videoPlayer.src = "./assets/videojs/dummy.mp4";
});

// Key Event
document.body.addEventListener("keydown", (e) => {
  if (e.key == "Escape") {
    settingsModal.classList.remove("active");
    componentDisplay("settingsDialog", false);
  }
  if (e.key == "F11") {
  }
});

// Etc

// Run startup function
startUp();

// Debugging only
