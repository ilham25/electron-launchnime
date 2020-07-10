// All Variables

// Import Section
const { remote, app } = require("electron");
const path = require("path");
const fs = require("fs");
const ls = require("local-storage");
const fileUrl = require("file-url");
const { set } = require("local-storage");
const { dir } = require("console");

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

// Input anime
const inputAnimeModal = document.querySelector(".input-anime-modal");
const inputAnimeTitle = document.querySelector(".anime-form-title");
const inputAnimeDirectory = document.querySelector(".form-directory");
const textDirectory = document.querySelector(".anime-form-directory");
const inputAnimeThumbnail = document.querySelector(".form-thumbnail");
const textThumbnail = document.querySelector(".anime-form-thumbnail");
const inputBtn = document.querySelector(".form-input-btn");

// All Function

// lol
// {
//   title: "Plastic Memories",
//   directory:
//     "loremaowkoakwokawoekaowkeaiwjeaweapweokawpeokawepawokeapwoekapweokawpeokawpeokawpeokawepk",
//   thumbnail: `E:\\Ilham\\Wallpapers\\SoGa.jpg`,
// },

// Creating dummy object
//
// const appData = { animeData: [] };
//
// const appData = {
//   animeData: [
//     {
//       title: "Bungou Stray Dogs",
//       directory: `E:\\Ilham\\Wallpapers\\`,
//       thumbnail: `E:\\Ilham\\Wallpapers\\Noerulb-Nakajima-Atsushi.png`,
//     },
//     {
//       title: "Re Zero",
//       directory: `E:\\Ilham\\Wallpapers\\`,
//       thumbnail: `E:\\Ilham\\Wallpapers\\REM PC -CSMS.jpg`,
//     },
//     {
//       title: "Saenai Heroine no Sodatekata",
//       directory: "dir4",
//       thumbnail: `E:\\Ilham\\Wallpapers\\SAEKANO PC -CSMS.jpg`,
//     },
//     {
//       title: "Nisekoi",
//       directory: "dir5",
//       thumbnail: `E:\\Ilham\\Wallpapers\\TEAMCHITOGE PC.jpg`,
//     },
//     {
//       title: "Kyoukai no Kanata Movie : I'll be Here aowoawkoawkoawk",
//       directory: "dir6",
//       thumbnail:
//         "E:\\Ilham\\Wallpapers\\[KORIGENGI-FAKHRI] Mirai - I'll Be Here.png",
//     },
//   ],
// };

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
    // dirData = fileUrl(value.filePaths[0]);
    dirData = value.filePaths[0];
    textDirectory.innerText = dirData;
    // Get all files from selected directory
    // fs.readdir(value.filePaths[0], (err, files) => {
    // console.log(value.filePaths[0]);
    // files from selected directory in array
    // console.log(files);

    // Loop the entire files array in selectedDirectory

    //   files.forEach((file) => {
    //     console.log(file);
    //   });
    // });
  });
};

const listAniFile = (value, param) => {
  fs.readdir(value, (err, files) => {
    // fileList = files;
    switch (param) {
      case "list":
        console.log(files);

        break;
      case "sum":
        // fileSumData = files.length;
        break;
      default:
        break;
    }
    // console.log(files);
  });
  // return fileList;
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
        console.log("platform windows change wp ");
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
          lastAddedOverlay.style.backgroundColor = "rgba(0,0,0,0.5)";
        });
        lastAddedOverlay.addEventListener("mouseleave", () => {
          lastAddedOverlay.style.backgroundColor = "rgba(0,0,0,0.8)";
        });
        lastAddedOverlay.style.backgroundColor = "rgba(0,0,0,0.8)";
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
    default:
      break;
  }
};

const lastAddedCheck = () => {
  const { animeData } = appData;
  console.log(animeData);
  if (animeData.length == 0) {
    console.log("animeData kosong");
    componentDisplay("lastAddedOverlay", false);
    lastTitle.innerText = "No anime available";
    lastTotalEpisode.innerText = "-";
  } else {
    console.log("animeData terisi");
    componentDisplay("lastAddedOverlay", true);
    const lastIndex = animeData.length - 1;
    console.log(lastIndex);
    lastPict.src = animeData[lastIndex].thumbnail;
    lastTitle.innerText = animeData[lastIndex].title;
    fs.readdir(animeData[lastIndex].directory, (err, files) => {
      lastTotalEpisode.innerText = `Total Episode : ${files.length}`;
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
    console.log("listEmpty");
    componentDisplay("emptyContainer", true);
  } else {
    componentDisplay("emptyContainer", false);
    listWpContainer.setAttribute("data-directory", animeData[0].directory);
    listWpContainer.setAttribute("data-thumbnail", animeData[0].thumbnail);
    // console.log("cok", fileUrl(animeData[0].thumbnail));

    wpContainer.style.backgroundImage = `url("${fileUrl(
      animeData[0].thumbnail
    )}")`;
    listWpThumbnail.src = animeData[0].thumbnail;
    listWpTitle.innerText = animeData[0].title;
    fs.readdir(animeData[0].directory, (err, files) => {
      listWpEpisode.innerText = `Total Episode : ${files.length}`;
    });
  }
  appData.animeData.forEach((anime, index) => {
    const domAnimeList = document.createElement("div");
    domAnimeList.classList.add("anime-list-container");
    domAnimeList.setAttribute("data-directory", anime.directory);
    listAniFile(anime.directory, "sum");
    fs.readdir(anime.directory, (err, files) => {
      domAnimeList.innerHTML = ` 
      <div class="anime-title-container">
        <!-- <div class="title-child"> -->
          <p>${anime.title}</p>
          <small>Total Episode : ${files.length}</small>
        <!-- </div> -->
      </div>`;
    });

    domAnimeList.addEventListener("click", () => {
      console.log(index);
      listWpContainer.setAttribute("data-directory", anime.directory);
      listWpContainer.setAttribute("data-thumbnail", anime.thumbnail);
      listWpContainer.style.opacity = 0;
      wpContainer.style.backgroundImage = `url("${fileUrl(anime.thumbnail)}")`;
      setTimeout(() => {
        listWpThumbnail.src = anime.thumbnail;
        listWpTitle.innerText = anime.title;
        fs.readdir(anime.directory, (err, files) => {
          listWpEpisode.innerText = `Total Episode : ${files.length}`;
        });
        listWpContainer.style.opacity = 1;
      }, 300);
    });
    domAnimeList.addEventListener("contextmenu", () => {
      console.log("click kanan animelist : ", anime.title);
      deleteDialog.setAttribute("data-index", index);
      settingsModal.classList.toggle("active");
      componentDisplay("deleteDialog", true);
      deleteMessage.innerText = `Are you sure want to delete '${anime.title}'?`;
    });

    listContainer.appendChild(domAnimeList);
    // console.log("anime foreach loop : ", anime.directory);
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
  console.log(appData);
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
    console.log("data kosong");
    const dummyData = { animeData: [] };
    ls.set("appData", dummyData);
    appData = ls.get("appData");
    console.log("data masuk", appData);
  }
};
const startUp = () => {
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
  animeData.splice(deleteIndex, 1);
  ls.set("appData", appData);
  createAnimeList();
  settingsModal.classList.toggle("active");
  componentDisplay("deleteDialog", false);
});
deleteNo.addEventListener("click", () => {
  console.log("delete no");
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
  const thumbnail = listWpContainer.getAttribute("data-thumbnail");
  const directory = listWpContainer.getAttribute("data-directory");
  wpContainer.style.backgroundImage = `url("${fileUrl(thumbnail)}")`;
  listAniFile(directory, "list");
});

closeBtn.addEventListener("click", () => {
  console.log("close button");
  w.close();
});

minimizeBtn.addEventListener("click", () => {
  console.log("minimize button");
  w.minimize();
});

lastWatched.addEventListener("click", () => {
  console.log("last watched clicked!");
  resetData();
});

lastAdded.addEventListener("click", () => {
  console.log("last added clicked!");
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

// Key Event
document.body.addEventListener("keydown", (e) => {
  if (e.key == "Escape") {
    settingsModal.classList.remove("active");
  }
});

// Etc

// Run startup function
startUp();

// Debugging only
