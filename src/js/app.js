import NotesApi from "./notesApi.js";
import NotesView from "./notesView.js";

export default class app {
  constructor(doc) {
    this.notes = [];
    this.activeNote = null;
    this.view = new NotesView(doc, this._handlers());
    this._refreshNotes();
  }
  _refreshNotes() {
    const notes = NotesApi.getAllNotes();
    this._setNotes(notes);
  }
  _setNotes(notes) {
    this.notes = notes;
    this.view.updateNoteList(notes);
    this.view.emptyNoteDisplay(notes.length < 1);
  }
  _setActiveNotes(note) {
    this.activeNote = note.id;
    this.view.updateActiveNote(note);
  }
  _handlers() {
    return {
      onNoteAdd: () => {
        this._setActiveNotes({
          id: `${new Date().getTime()}`.substring(0, 10),
          title: "",
          body: "",
          date: new Date(),
        });
        this.activeNote = `${new Date().getTime()}`.substring(0, 10);
        this._refreshNotes();
      },
      onNoteEdit: (title, body) => {
        NotesApi.saveNote({ title, body, id: this.activeNote });
        this._refreshNotes();
      },
      onNoteSelect: (noteId) => {
        const foundedNote = this.notes.find((item) => {
          return item.id == noteId;
        });
        this._setActiveNotes(foundedNote);
      },
      onNoteDelete: (noteId) => {
        NotesApi.deleteNote(noteId);
        this._refreshNotes();
      },
    };
  }
}
