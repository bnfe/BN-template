// require.context获取目录下组件
const comp = require.context("./", true, /\.vue$/);

const components = {
  install(Vue) {
    comp.keys().forEach(key => {
      // console.log(key);
      // TODO 突然冒出的问题，先暂时这样解决
      if (key.indexOf("components") == -1) {
        const name = key.replace(/(\.\/|\.vue|\/index)/g, "");
        Vue.component(name, comp(key).default);
      }
    });
  }
};
export default components;
