import { UuidAdapter } from "../../config/uuuid.adapter";
import { Ticket } from "../../interfaces/ticket";
import { WssService } from "./wss.service";


export class TicketService {

    constructor(
        private readonly wssService = WssService.instance
    ){

    }

    public readonly tickets: Ticket[] = [
        {id: UuidAdapter.v4(), number: 1, createdAt: new Date(), done: false },
        {id: UuidAdapter.v4(), number: 2, createdAt: new Date(), done: false },
        {id: UuidAdapter.v4(), number: 3, createdAt: new Date(), done: false },
        {id: UuidAdapter.v4(), number: 4, createdAt: new Date(), done: false },
        {id: UuidAdapter.v4(), number: 5, createdAt: new Date(), done: false },
        {id: UuidAdapter.v4(), number: 6, createdAt: new Date(), done: false },
    ];

    
    private readonly workinOnTickets: Ticket[] = [];
    
    
    public get pendingTickets(){
        return this.tickets.filter( ticket => !ticket.handleAtDesk );
    }

    public get lastWorkingOnTickets(): Ticket[] {
        return this.workinOnTickets.splice(0,4);
    }

    public get lastTickNumber(): number {
        return this.tickets.length > 0 ? this.tickets.at( -1 )!.number : 0;
    }

    public createTicket(){

        const ticket:Ticket = {
            id: UuidAdapter.v4(),
            number: this.lastTickNumber + 1,
            createdAt: new Date(),
            done: false
        }

        this.tickets.push( ticket );

        //*WSS
        this.wssService.sendMessage( 'newTicket', ticket );
        this.onTicketNumberChanged();

        return ticket;
    }


    public desk( desk:string ) {
        const ticket = this.tickets.find( t => !t.handleAtDesk);
    
        if( !ticket ) return { status: 'error', message: 'No hay tickets pendients' };


        ticket.handleAtDesk = desk;
        ticket.handleAt = new Date();


        this.workinOnTickets.unshift({ ...ticket });

        //TODO: WSS
        return { status:'ok', ticket }
    }

    // public drawTicket( desk:string ){
        
    //     const ticket = this.tickets.find( t => !t.handleAtDesk);
    
    //     if( !ticket ) return { status: 'error', message: 'No hay tickets pendients' };


    //     ticket.handleAtDesk = desk;
    //     ticket.handleAt = new Date();


    //     this.workinOnTickets.unshift({ ...ticket });

    //     // //TODO: WSS

    //     return { status: 'ok' }
    // }

    public onFinishedTicket( id: string ) {
        const ticket = this.tickets.find( t => t.id === id );
        if( !ticket ) return { status: 'error', message: 'Ticket no encontrado'};

        this.tickets.map( ticket => {
  
            if( ticket.id === id ){
                ticket.done = true;

            }
            return ticket
        });

        return { status: 'ok'}
    }

    private onTicketNumberChanged (){
        this.wssService.sendMessage( 'on-ticket-count-changed', this.pendingTickets.length )
    }

    

}




