

export class TicketController {

    // Inyección de dependencia - WssService
    constructor(){}



    public getTickets = async ( req: Request, res: Response ) => {
        res.json('getTickets');
    }

    public getLastTicketNumber = async ( req: Request, res: Response ) => {
        res.json('getLastTicketNumber');
    }


    public pendingTickets = async ( req: Request, res: Response ) => {
        res.json('pendingTickets');
    }


    public createTicket = async ( req: Request, res: Response ) => {
        res.json('createTicket');
    }

    public drawTicket = async ( req: Request, res: Response ) => {
        res.json('drawTicket');
    }

    public ticketFinished = async ( req: Request, res: Response ) => {
        res.json('ticketFinished');
    }


    public workingOn = async ( req: Request, res: Response ) => {
        res.json('workingOn');
    }
}