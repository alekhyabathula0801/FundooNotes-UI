import HttpServices from "./HttpServices";
let baseUrl = process.env.REACT_APP_API_URL;
let token = JSON.parse(localStorage.getItem("fundoo-notes")).data.id;
class NoteService {
  addNote(data) {
    return HttpServices.postApiRequest(
      data,
      `${baseUrl}api/notes/addNotes`,
      token
    );
  }

  updateNote(data) {
    return HttpServices.postApiRequest(
      data,
      `${baseUrl}api/notes/updateNotes`,
      token
    );
  }

  updateNoteColor(data) {
    return HttpServices.postApiRequest(
      data,
      `${baseUrl}api/notes/changesColorNotes`,
      token
    );
  }

  tooglePinNote(data) {
    return HttpServices.postApiRequest(
      data,
      `${baseUrl}api/notes/pinUnpinNotes`,
      token
    );
  }

  toogleArchiveNote(data) {
    return HttpServices.postApiRequest(
      data,
      `${baseUrl}api/notes/archiveNotes`,
      token
    );
  }

  restoreNote(data) {
    return HttpServices.postApiRequest(
      data,
      `${baseUrl}api/notes/trashNotes`,
      token
    );
  }

  deleteNoteForever(data) {
    return HttpServices.postApiRequest(
      data,
      `${baseUrl}api/notes/deleteForeverNotes`,
      token
    );
  }

  getAllNotes() {
    return HttpServices.getApiRequest(
      `${baseUrl}api/notes/getNotesList`,
      token
    );
  }

  getAllArchiveNotes() {
    return HttpServices.getApiRequest(
      `${baseUrl}api/notes/getArchiveNotesList`,
      token
    );
  }

  getAllDeletedNotes() {
    return HttpServices.getApiRequest(
      `${baseUrl}api/notes/getTrashNotesList`,
      token
    );
  }
}

export default new NoteService();
