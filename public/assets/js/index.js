// Declarations
var $noteHeading = $(".noteHeading");
var $noteBody = $(".noteBody");
var $addNoteBtn = $(".addNote");
var $newNoteBtn = $(".newNote");
var $noteInv = $(".invContainer .invGroup");

var Note_current = {};

// ↓Ajax function to get notes stored in the database json file.
const getNotes = function () {
    return $.ajax({
        url: 'api/notes.json',
        method: 'GET',
    });
};

//↓Ajax function to save notes to the database json file.
const saveNotes = function (note) {
    return $.ajax({
        url: 'api/notes.json',
        data: note,
        method: 'POST',
    });
};

// ↓Ajax function to delete notes from the database json file.
const deleteNotes = function (id) {
    return $.ajax({
        url: 'api/notes.json' + id,
        method: 'DELETE',
    });
};

// ↓To display the current note.
const displayCurrentNote = function () {
    $addNoteBtn.hide();
    if (Note_current.id) {
        $noteHeading.attr("readonly", true);
        $noteBody.attr("readonly", true);
        $noteHeading.val(Note_current.Heading);
        $noteBody.val(Note_current.Body);
    } else {
        $noteHeading.attr("readonly", false);
        $noteBody.attr("readonly", false);
        $noteHeading.val('');
        $noteBody.val('');
    };
};

// ↓To get the contents of the notes and save to the database.
const ManageNoteInv = () => {
    const newNote = {
        title: $noteHeading.val(),
        text: $noteBody.val(),
    };
    addNote(newNote).then(() => {
        getDisplayedNotes();
        displayCurrentNote();
    });
};

// ↓ To delete the note.
const ManageInv_delete = (event) => {
    event.stopCall();
    const note = $(this).parent(".invNoteContent").data();
    if (Note_current.id === note.id) {
        Note_current = {};
    }
    deleteNotes(note.id).then(() => {
        getDisplayedNotes();
        displayCurrentNote();
    });
};

// ↓Displaying currently active note.
const ManageNoteDisplay = () => {
    Note_current = $(this).data();
    displayCurrentNote();
};

// ↓for user to be able to input a new note by setting currently active note as empty object.
const ManageNotesDisplay = () => {
    Note_current = {};
    displayCurrentNote();
};

// ↓To hide or show the save button.
const ManageAddBtn_display = () => {
    if (!$noteHeading.val().trim() || !$noteBody.val().trim()) {
        $addNoteBtn.hide();
    } else {
        $addNoteBtn.show();
    }
};

// ↓Display a list of notes.
const displayListNotes = (notes) => {
    $noteInv.empty();
    const ListedNotes = [];

    const create$li = (text, withDeleteButton = true) => {
        const $li = $("<li class ='.invNoteContent'></li>")
        const $span = $('<span></span>').text(text);
        $li.append($span);
        if (withDeleteButton) {
            const $delBtn = $(
                "<li class = 'fas fa-trash-alt float-right text-danger delete-note'></li>"
            );
            $li.append($delBtn);
        }
        return $li;
    };
    if (notes.length === 0) {
        ListedNotes.push(create$li("No saved notes found.", false));
    }
    notes.forEach((notes) => {
        const $li = create$li(notes.Heading).data(note);
        ListedNotes.push($li);
    });
    $noteInv.append(ListedNotes);
};

// ↓To show notes from db in the list sidebar.
const getDisplayedNotes = () => {
    return getNotes().then(function (data) {
        displayListNotes(data);
    });
};

$addNoteBtn.on("click", ManageNoteInv);
$noteInv.on("click", ".invNoteContent", ManageNoteDisplay);
$newNoteBtn.on("click", ManageNotesDisplay);
$noteInv.on("click", ".delete-note", ManageInv_delete);
$noteHeading.on("keyup", ManageAddBtn_display);
$noteBody.on("keyup", ManageAddBtn_display);

getDisplayedNotes();
