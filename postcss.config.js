// const postcssJitProps = require("postcss-jit-props");
// const OpenProps = require("open-props");

module.exports = {
  plugins: [
    require("postcss-scrollbar"),
    require("postcss-import"),
    require("postcss-nested"),
    require("postcss-preset-env"),
    require("autoprefixer"),
    // postcssJitProps(OpenProps),
  ],
};
