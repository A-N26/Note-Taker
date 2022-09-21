const fs = require('fs');
const path = require('path');
const util = require('util');

function newNotes(body, contentArray) {
    const note_body = content;
    contentArray.push(note_body);
    fs.writeFileSync(path.join(__dirname, '../db/db.json'),
    JSON.stringify({
        notes: contentArray
    },
        null, 2
    )
    )
    return note_body;
}

function deleteCreatedNotes(contentArray, id) {
    let noteID_delete = parseInt(id);
    contentArray.splice(noteID_delete, 1);

    for (let i = noteID_delete; i < contentArray.length; i++) {
        contentArray[i].id = i.toString();
    }

    fs.writeFileSync(path.join(__dirname, '../db/db.json'),
    JSON.stringify({
        notes: contentArray
    },
        null, 2
    )
    )
}

module.exports = { newNotes, deleteCreatedNotes }
