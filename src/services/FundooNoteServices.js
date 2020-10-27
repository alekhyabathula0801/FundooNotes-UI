import HttpServices from "./HttpServices";
let baseUrl = process.env.REACT_APP_API_URL;
let token = JSON.parse(localStorage.getItem("fundoo-notes")).data.id;
class FundooNoteService {
  addNote(data) {
    return HttpServices.postApiRequest(data, `${baseUrl}api/notes/addNotes`,token);
  }

  getAllNotes() {
    return HttpServices.getApiRequest(`${baseUrl}api/notes/getNotesList`,token);
  }
}

export default new FundooNoteService();
