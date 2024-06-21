const { nanoid } = require('nanoid');
const notes = require('./notes');

const postNoteHandler = (request, h) => {
  const { title, tags, body } = request.payload;
  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newNote = {id, title, tags, body, createdAt, updatedAt};
  notes.push(newNote);

  const isSuccess = notes.filter((note) => note.id == id).length > 0;

  if(isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil ditambahkan',
      data: {
        noteId: id,
      }
    });
    
    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal ditambahkan',
  });

  response.code(500);
  return response;
};

const getNotesHandler = () => ({
  status: 'success',
  data: {
    notes
  },
})

const editNotesByIdHandler = (request, h) => {
  const { id } = request.params;
  const { title, tags, body } = request.payload;

  const index = notes.findIndex((note) => note.id == id);
  const updatedAt = new Date().toISOString();

  if (index != -1) {
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updatedAt,
    }

    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil diperbarui',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui catatan. Id tidak ditemukan',
  });
  response.code(404);
  return response;
}

const deleteNoteByIdHandler = (request, h) => {
  const { id } = request.params;
  
  const index = notes.findIndex((note) => note.id == id);

  if (index !== -1) {
    notes.splice(index, 1);

    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil dihapus',
    });

    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal dihapus, id tidak ditemukan',
  });
  
  response.code(404);

  return response;
}

module.exports = { postNoteHandler, getNotesHandler, editNotesByIdHandler, deleteNoteByIdHandler };