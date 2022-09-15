import { Request, Response } from 'express'
import { StatusCode } from '../utils';
import { Service } from '../services';

class Controller {
    private service: Service
    constructor() {
        this.service = new Service()
    }
    getHowOld = (req: Request, res: Response) => {
        const path = req.url
        try {
            const response = this.service.getHowOld(req.query.dob as string)
            return res.status(response.status).json({
                status: response.success,
                message: response.message,
                path,
                data: response.data || undefined
            })
        } catch (error) {
            console.log(error)
            return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
                status: false,
                message: 'An Error Occurred 😱😱😱😱',
                path
            });
        }
    }
}

export default new Controller()