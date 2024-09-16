

const lblPending = document.querySelector( '#lbl-pending' );
const deskHeader = document.querySelector( 'h1' );


const searchParams = new URLSearchParams( window.location.search );

 if( !searchParams.has( 'escritorio' )){
     window.location = 'index.html';
     throw new Error( 'Escritorio es requerido')
 }

 const deskNumber = searchParams.get('escritorio');
 deskHeader.innerText = deskNumber.toUpperCase();

const loadInitialCount = async () =>{

    const resp = await fetch( '/api/ticket/pending' );
    const pending = await resp.json();
    lblPending.innerHTML = pending.length || 0;

}


function connectToWebSockets() {

    const socket = new WebSocket( 'ws://localhost:3000/ws' );
  
    socket.onmessage = ( event ) => {
    //   console.log( event.data ); // on-ticket-count-changed
        const { type, payload } = JSON.parse( event.data );
        if( type != 'on-ticket-count-changed') return;
        lblPending.innerHTML = payload;

    };
  
    socket.onclose = ( event ) => {
      console.log( 'Connection closed' );
      setTimeout( () => {
        console.log( 'retrying to connect' );
        connectToWebSockets();
      }, 1500 );
  
    };
  
    socket.onopen = ( event ) => {
      console.log( 'Connected' );
    };
  
  }
  
  
  loadInitialCount();
  connectToWebSockets();