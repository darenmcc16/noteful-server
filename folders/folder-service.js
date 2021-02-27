const FolderService = {
    getAllFolders(knex) {
      return knex.select('*').from('noteful_folders')
    },
    insertArticle(knex, newFolder) {
      return knex
        .insert(newFolder)
        .into('noteful_folders')
        .returning('*')
        .then(rows => {
          return rows[0]
        })
    },
    getById(knex, id) {
      return knex.select('*').from('noteful_folders').where('id', id).first()
    },
    deleteArticle(knex, id) {
      return knex('noteful_folders')
        .where({ id })
        .delete()
    },
    updateArticle(knex, id, newFolderFields) {
      return knex('noteful_folders')
        .where({ id })
        .update(newFolderFields)
    },
  }
  
  module.exports = FolderService