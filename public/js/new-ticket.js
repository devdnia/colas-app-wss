
const currentTicketLable    = document.querySelector( 'span' );
const createTicketBtn       = document.querySelector( 'button' );

const getLastTicket = async() =>{

    const lastTicket = await fetch( '/api/ticket/last');
    const resp = await lastTicket.json();
    currentTicketLable.innerText = resp;

}

const createTicket = async() => {

    const newTicket = await fetch( '/api/ticket' ,{
        method: 'POST',
    });

    const resp = await newTicket.json()

    currentTicketLable.innerText = resp.number;

}

createTicketBtn.addEventListener( 'click' , createTicket )



getLastTicket();