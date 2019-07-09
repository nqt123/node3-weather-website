const fs = require('fs');
const chalk = require('chalk');
const getNote = ()=> {
    return "This is a Node";
}
const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateNotes= notes.filter((note)=>note.title === title);
    debugger
    if(duplicateNotes.length === 0){
        notes.push({
            title: title,
            body: body
        });
        console.log(chalk.green("Note added"));
        saveNotes(notes); 
    }
    else{
        console.log(chalk.red("Note not added"));
    }
}
const removeNote = (title)=>{
    const notes = loadNotes();
    const keepingNode = notes.filter((note)=>note.title !== title);
    if(keepingNode.length < notes.length){
        console.log(chalk.green("Removed"));
        saveNotes(keepingNode);
    }
    else{
        console.log(chalk.red("Not removed"));
    }
}
const listNotes = ()=>{
    const notes = loadNotes();
    notes.forEach(element => {
        console.log(chalk.bold.underline.green(element.title));
        console.log(element.body);
    });
}
const readNote=(title)=>{
    const notes = loadNotes();
    const note = notes.find((note) => note.title === title)
    if(note){
        console.log(chalk.bold.underline.green(note.title));
        console.log(note.body);
    }
    else{
        console.log("No note found");
    }
}
const saveNotes = (notes)=>{
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json',dataJSON);
}
const loadNotes = ()=> {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    }
    catch{
        return [];
    }
}
module.exports = { getNote, addNote,removeNote,listNotes,readNote };