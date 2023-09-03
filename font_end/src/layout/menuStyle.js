export const darkModeMenuAdmin = (isDarkMode) => {
  if (!isDarkMode) {
    colorBaseAdmin.colorText = { color: "#d2d2e8" };
    colorBaseAdmin.colorBg = { backgroundColor: "#151A2A" };
    colorBaseAdmin.colorBgNav = { backgroundColor: "#1F263C" };
    chageImage.src = require("../assets/image/logoweb2.png");
  } else {
    colorBaseAdmin.colorText = { color: "#333333 " };
    colorBaseAdmin.colorBg = { backgroundColor: "#F6F9FC" };
    colorBaseAdmin.colorBgNav = { backgroundColor: "#FFFFFF" };
    chageImage.src = require("../assets/image/logoweb.png");
  }
};

export const colorBaseAdmin = {
  colorText: { color: "#333333" },
  colorBg: { backgroundColor: "#F6F9FC" },
  colorBgNav: { backgroundColor: "#FFFFFF" },
};

export const chageImage = {
  src: require("../assets/image/logoweb.png"),
};

export const customFont = {
  fontWeight: "bold",
  whiteSpace: "nowrap",
  overflow: "hidden",
};

export const customListItem = {
  borderRadius: "10px",
  m: 1,
};
