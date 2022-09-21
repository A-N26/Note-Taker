const fs = require('fs');
const path = require('path');

function newNotes(body, contentArray) {
    const note = body;
    contentArray.push(note);
    fs.writeFileSync(path.join(__dirname, '../db/db.json'),
    JSON.stringify({
        notes: contentArray
    },
        null, 2
    )
    )
    return note;
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
