const validateInput = (data, type) => async(req, res, next) => {
    try {
        const getType = {
            body: req.body,
            params: req.params,
            query: req.query,
            headers: req.headers
        }

        const options = { language: { key: '{{key}} ' } }
        const result = getType[type]
       
        const isValid = await data.schema.validate(result, options)

        if (!isValid.error) {
            req[type] = isValid.value
            return next()
        }
        
        const { message } = isValid.error.details[0]

        res.status(400).json({
            status: 'Bad request',
            message: message.replace(/[\"]/gi, ''),
            errors: data.message,
        })
    }
    catch (err) {
        next(err)
    }
}

module.exports = validateInput