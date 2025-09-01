// store/store.js
const files = require.context("./modules", false, /\.(js|ts)$/);
const modules = {};

files.keys().forEach((key) => {
  // console.log(key);
  if (key.indexOf("modules") == -1) {
    const filename = key.replace(/(\.\/|\.(js|ts))/g, "");
    modules[filename] = files(key).default;
  }
});

export default modules;
