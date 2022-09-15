import { StatusCode } from "../utils";

interface ServiceResponse {
    success: boolean,
    status: StatusCode,
    data?: unknown,
    message?: string
}

export class Service {
    getHowOld = (date: string): ServiceResponse => {

        const formatDate = parseInt(date)

        const getDate = new Date(isNaN(formatDate) ? date : formatDate)
        const today = new Date()
        const timestamp = getDate.getTime()

        if (isNaN(timestamp)) {
            return {
                success: false,
                status: StatusCode.BAD_REQUEST,
                message: 'invalid date format'
            }
        }

        const diff = (new Date(today.getTime() - getDate.getTime())).getFullYear() - 1970

        console.log(diff)

        return {
            success: true,
            status: StatusCode.OK,
            data: { age: diff }
        }
    }
}
