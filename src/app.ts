import express from 'express'
import routes from './routes'
import { StatusCode } from './utils'

export class App {
    public app: express.Application
    port = process.env.PORT || 3000
    constructor() {
        this.app = express()
        this.initializeMiddleware()
        this.initializeRoutes()
        this.startServer()
    }

    public startServer() {
        this.app.listen(this.port, () => {
            console.log(`App listening on port ${this.port} ${process.env.NODE_ENV}`);
        });
    }

    public getServer() {
        return this.app;
    }

    private initializeMiddleware() {
        this.app.set('trust proxy', true);
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.json());
    }

    private initializeRoutes() {
        this.app.use('/api/v1/', routes);

        this.app.all('*', (req, res) => {
            return res.status(StatusCode.NOT_FOUND).json({
                status: false,
                error: 'route not found',
                path: req.url,
                data: {}
            });
        });
    }

}