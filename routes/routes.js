module.exports = (app) => {
    app.get('/', (req, res) => {
        res.send('Welcome to our movie rating app')
    })
}