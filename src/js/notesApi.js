export default class NotesApi {
  static getAllNotes() {
    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    return notes.sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });
  }
  static saveNote(noteToSave) {
    const notes = NotesApi.getAllNotes();
    const existed = notes.find((note) => note.id == noteToSave.id);
    if (existed) {
      existed.title = noteToSave.title;
      existed.body = noteToSave.body;
      existed.date = new Date().toISOString();
    } else {
      notes.push({
        id: `${new Date().getTime()}`.substring(0, 10),
        title: noteToSave.title,
        body: noteToSave.body,
        date: new Date().toISOString(),
      });
    }
    localStorage.setItem("notes", JSON.stringify(notes));
  }
  static deleteNote(id) {
    const notes = NotesApi.getAllNotes();
    const filtered = notes.filter((n) => n.id != id);
    localStorage.setItem("notes", JSON.stringify(filtered));
  }
}
