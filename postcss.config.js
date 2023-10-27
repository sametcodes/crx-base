/** @type {import('postcss-load-config').Config} */
const config = {
    plugins: [
        require('autoprefixer'),
        require('postcss-scope')(".root_extension"),
    ]
}

module.exports = config