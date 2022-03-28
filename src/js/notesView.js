export default class NotesView {
  constructor(doc, handlers) {
    this.doc = doc;
    const { onNoteAdd, onNoteEdit, onNoteSelect, onNoteDelete } = handlers;
    this.onNoteAdd = onNoteAdd;
    this.onNoteEdit = onNoteEdit;
    this.onNoteSelect = onNoteSelect;
    this.onNoteDelete = onNoteDelete;

    this.doc.innerHTML = `
    <section class="home">
      <div class="home__header">
        <h1 class="home__title">Notes</h1>
        <img class="home__searchIcon" src="./icon/search.svg">
      </div>
      <ul class="home__noteList"></ul>
      <p class= "home__emptyText">There is not any notes yet!</p>
      <img class="home__add" src="./icon/plus.svg" >
    </section>
    <section class="edit">
      <div class="edit__header">
        <div class="edit__exitBtn">
          <img class="edit__exitIcon" src="./icon/left-arrow.svg">
          <h3 class="edit__exitText">Notes</h3>
        </div>
        <h3 class="edit__saveBtn">Done</h3>
      </div>
      <div class="edit__title">
        <input class="edit__title" type="text" placeholder="Title">
        <p class="edit__date">Mar 18, 2022, 22:36, Thu</p>
      </div>
      <textarea class="edit__body" placeholder="note"></textarea>
    </section>`;

    const addBtn = this.doc.querySelector(".home__add");
    const saveBtn = this.doc.querySelector(".edit__saveBtn");
    const closeEditBtn = this.doc.querySelector(".edit__exitBtn");
    const inputTitle = this.doc.querySelector("input.edit__title");
    const inputBody = this.doc.querySelector(".edit__body");
    this.editSection = this.doc.querySelector("section.edit");
    this.homeSection = this.doc.querySelector("section.home");

    addBtn.addEventListener("click", () => {
      inputTitle.value = "";
      inputBody.value = "";
      this.onNoteAdd();
      this.editOpen();
    });
    saveBtn.addEventListener("click", () => {
      const trimmedTitle = inputTitle.value.trim();
      const trimmedBody = inputBody.value.trim();
      this.onNoteEdit(trimmedTitle, trimmedBody);
      this.closeEdit();
    });
    closeEditBtn.addEventListener("click", () => {
      this.closeEdit();
    });
  }
  _createListHTML(id, title, body, date) {
    const maxBodyLength = 50;
    return `
    <li class="home__noteItem" data-id="${id}">
      <h3 class="home__noteTitle">${title}</h4>
      <p class="home__noteBody">${
        body.length < maxBodyLength ? body : `${body.substring(0, 50)}...`
      }</p>
      <div class="home__noteFooter">
        <p class="home__noteDate">${new Date(date)
          .toLocaleDateString("en", { dateStyle: "medium" })
          .substring(0, 6)
          .replace(",", "")}</p>
        <img class="home__noteTrash" src="./icon/trash.svg" data-id="${id}">
      </div>
    </li>
    `;
  }
  updateNoteList(notes) {
    const domNoteList = this.doc.querySelector(".home__noteList");
    domNoteList.innerHTML = "";
    let noteList = "";
    for (const note of notes) {
      const { id, title, body, date } = note;
      const html = this._createListHTML(id, title, body, date);
      noteList += html;
    }
    domNoteList.innerHTML = noteList;
    domNoteList.querySelectorAll(".home__noteItem").forEach((item) => {
      item.addEventListener("click", () => {
        this.onNoteSelect(item.dataset.id);
      });
    });
    domNoteList.querySelectorAll(".home__noteTrash").forEach((item) => {
      item.addEventListener("click", (e) => {
        this.onNoteDelete(item.dataset.id);
        e.stopPropagation();
      });
    });
  }
  updateActiveNote(noteData) {
    const editDate = this.doc.querySelector(".edit__date");
    const dateStyle = { dateStyle: "long", timeStyle: "short", hour12: false };
    const { title, body, date } = noteData;
    this.doc.querySelector("input.edit__title").value = title;
    this.doc.querySelector(".edit__body").value = body;
    editDate.innerHTML = new Date(date).toLocaleString("en", dateStyle);
    this.editOpen();
  }
  editOpen() {
    this.homeSection.style.display = "none";
    this.editSection.style.display = "block";
    setTimeout(() => {
      this.editSection.style.left = "0";
    }, 1);
  }
  closeEdit() {
    this.homeSection.style.display = "block";
    this.editSection.style.left = "100vw";
    setTimeout(() => {
      this.editSection.style.display = "none";
    }, 300);
  }
  emptyNoteDisplay(con) {
    this.doc.querySelector(".home__emptyText").style.display = con
      ? "block"
      : "none";
  }
}
