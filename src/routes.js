const { postNoteHandler, getNotesHandler, editNotesByIdHandler, deleteNoteByIdHandler } = require("./handler");

const routes = [
  {
    method: 'POST',
    path: '/notes',
    handler: postNoteHandler,
  },
  {
    method: 'GET',
    path: '/notes',
    handler: getNotesHandler,
  },
  {
    method: 'PUT',
    path: '/notes/{id}',
    handler: editNotesByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/notes/{id}',
    handler: deleteNoteByIdHandler,
  }
]

module.exports = routes;