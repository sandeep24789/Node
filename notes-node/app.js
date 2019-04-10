console.log('Starting app.js');

const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');
const argv = yargs.argv;

var command = argv._[0];
console.log('command:',command);
/* console.log('Process:',process.argv); */
console.log('Yargs',argv); 

notes.addNote(argv.title, argv.body);

if(command === 'add') {
    var note = notes.addNote(argv.title, argv.body);
    if(note) {
        console.log('note created');
        notes.logNote(note);
    } else {
        console.log('note title taken already');
    }
} else if(command === 'list') {
    notes.getAll();
} else if(command === 'read'){
    var note = notes.getNote(argv.title);
    if(note){
        notes.logNote(note);
    } else {
        console.log('note title not found');
    }
} else if(command === 'remove') {
    notes.removeNote(argv.title);
} else {
    console.log('Command not recognised');
}
