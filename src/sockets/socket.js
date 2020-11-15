const { io } = require('../../index');
const Bands = require('../models/bands');
const Band = require('../models/band');

const bands = new Bands();

bands.addBand( new Band('Queen') );
bands.addBand( new Band('Bon Jovi') );
bands.addBand( new Band('Metallica') );
bands.addBand( new Band('Heroes del Silencio') );
bands.addBand( new Band('Las pastillas del abuelo') );


//Sockets Messages
io.on('connection', client => {
    console.log("Client Connected")

    client.emit('active-bands', bands.getBands());

    client.on('disconnect', ()=>{
        console.log("Client Disconnected");
    });

    client.on('vote-band', payload => { 
        bands.voteBand(payload.bandId);
        io.emit('active-bands', bands.getBands());
    });

    client.on('add-band', payload => {
        bands.addBand(new Band(payload.bandName));
        io.emit('active-bands', bands.getBands());
    });

    client.on('delete-band', payload => { 
        bands.deleteBand(payload.bandId);
        io.emit('active-bands', bands.getBands());
    });

});
