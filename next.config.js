/** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
// }
// module.exports = nextConfig

const withTM = require("next-transpile-modules")(["simple-keyboard-layouts"])
module.exports = withTM({})
