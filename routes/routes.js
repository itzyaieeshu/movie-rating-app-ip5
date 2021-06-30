const index = require('./handlers/index')

module.exports = (app) => {
    app.get('/', index.indexPage)
}