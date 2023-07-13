import { Request, Response } from 'express';
import { UserValidator } from '../Validators/UserValidator';

class AuthController{
    async Login(req: Request, res: Response){
        const {error, value} = UserValidator.validate(req.body)
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
    }
}

export default new AuthController()