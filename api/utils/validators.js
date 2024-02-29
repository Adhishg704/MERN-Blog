import {body, validationResult} from "express-validator";

export const validate = (validations) => {
    return async (req, res, next) => {
        for(let validation of validations) {
            const result = await validation.run(req);
            if(!result.isEmpty()) {
                break;
            }
        }
        const errors = validationResult(req);
        if(errors.isEmpty()) {
            return next();
        }
        res.status(422).json({errors: errors.array()});
    }
}


export const loginValidator = [
    body("email").trim().notEmpty().isEmail().withMessage("Email is required"),
    body("password").trim().isLength({min: 6}).withMessage("Password should have minimum 6 characters"),
];

export const signupValidator = [
    body("username").trim().notEmpty().withMessage("Username required"),
    body("username").trim().isLength({min: 3, max: 20}).withMessage("Username must be between 3 and 20 characters"),
    ...loginValidator,
]