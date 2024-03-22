// const nextConfig = {
//   reactStrictMode: true,
// }
// module.exports = nextConfig

const withTM = require("next-transpile-modules")(["simple-keyboard-layouts"])

/** @type {import('next').NextConfig} */
module.exports = withTM({
  reactStrictMode: true,
})
