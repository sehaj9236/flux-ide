import exrpess from 'express'
import { handleRegisterWebhook, handleUpdateWebhook, handleDeleteWebhook} from '../controller/webHookController.js';


const webhookRoutes=exrpess.Router();

webhookRoutes.post('/register',exrpess.raw({type:'application/json'}),handleRegisterWebhook)
webhookRoutes.post('/update',exrpess.raw({type:'application/json'}),handleUpdateWebhook)
webhookRoutes.post('/delete',exrpess.raw({type:'application/json'}),handleDeleteWebhook)

export default webhookRoutes;