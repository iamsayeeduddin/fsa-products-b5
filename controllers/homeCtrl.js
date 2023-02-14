const get = (req, res) => {
    res.status(200)
    res.send("Products API")
}

const health = (req, res) => {
    res.status(200)
    res.json({status:"up"})
}

module.exports = {get, health}