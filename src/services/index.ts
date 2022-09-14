import { StatusCode } from "../utils";

interface ServiceResponse {
    success: boolean,
    status: StatusCode,
    data: unknown,
    message?: string
}

class Service {
    getHowOld = (date: string): ServiceResponse => {
        return {
            success: true,
            status: StatusCode.OK,
            data: 3
        }
    }
}

export default new Service()