import { Router } from 'express';
import { TicketController } from './controller';


export class TicketRoutes {

    static get routes(){

        const router = Router();
        const ticketController = new TicketController();

        router.get('/')
        router.get('/last')
        router.get('/pending')


        router.post('/')

        router.get('draw/:desk')
        router.put('/done/:ticketId')

        router.get('/working-on')


        return router;

    }



}