const {Type} = require('@sinclair/typebox')
const Ajv = require('ajv')
const addFormats = require('ajv-formats')
const addErrors = require('ajv-errors')

const ajv = new Ajv({allErrors: true})
addFormats(ajv, ["email"])
addErrors(ajv)


const LoginDTOSchema = Type.Object(
    {
        email: Type.String({
            format: 'email',
            errorMessage: {
                type: 'El tipo de Mail debe ser de tipo texto',
                format: 'Debe contener un email valido'
            }
        }),
        password: Type.String({
            minLength: 6,
            errorMessage: {
                type: 'Debe ser de tipo texto.',
                minLength: 'La contraseña no debe ser de menos de 6 caracteres.'
            }
        })
    },
    {
        additionalProperties: false
    }
)

const validate = ajv.compile(LoginDTOSchema)

const validateLoginDTO= (req, res, next) => {
    const isValid = validate(req.body)
    if (!isValid) res.status(400).send(ajv.errorsText(validate.errors, {separator: "\n"}))
    next()
}

module.exports = {
    validateLoginDTO
}