const errorHandler = (err, req, res, next) => {
    console.log("res: ", res)
    console.error(err.stack)
    res.status(500).send('Something broke!')
}

module.epxorts = {
    errorHandler
}