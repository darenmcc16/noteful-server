const NoteService = {
    getAllNotes(knex) {
      return knex.select('*').from('noteful_notes')
    },
    insertArticle(knex, newNote) {
      return knex
        .insert(newNote)
        .into('noteful_notes')
        .returning('*')
        .then(rows => {
          return rows[0]
        })
    },
    getById(knex, id) {
      return knex.select('*').from('noteful_notes').where('id', id).first()
    },
    deleteArticle(knex, id) {
      return knex('noteful_notes')
        .where({ id })
        .delete()
    },
    updateArticle(knex, id, newNoteFields) {
      return knex('noteful_notes')
        .where({ id })
        .update(newNoteFields)
    },
  }
  
  module.exports = NoteService