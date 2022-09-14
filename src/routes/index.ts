
import { Router } from 'express';
import controller from '../controller';

const route = Router()

route.use('/howold', controller.getHowOld)

export default route