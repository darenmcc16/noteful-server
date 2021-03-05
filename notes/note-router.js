const path = require('path')
const express = require('express')
const xss = require('xss')
const NoteService = require('./note-service')

const noteRouter = express.Router()
const jsonParser = express.json()

const serializeNote = note => ({
  id: note.id,
  title: xss(note.title),
  content: xss(note.content),
  date_published: note.date_published,
  folder_id: note.folder_id
})

noteRouter
  .route('/')
  .get((req, res, next) => {
    console.log("hello")
    const knexInstance = req.app.get('db')
    NoteService.getAllNotes(knexInstance)
    console.log("hello 2")
      //.then(notes => res.status(200).json(notes.map(serializeNote)))
      .then(notes => {
        console.log(notes, "this is the notes")
        res.status(200).json(notes)
      })
      .catch(next)
  })
  .post(jsonParser, (req, res, next) => {
    const { title, content, folder_id } = req.body
    const newNote = { title, content, folder_id }
    const db = req.app.get('db')

    if(!title) {
      return res.status(400).json( {error: {message: 'Title is required'}} )
    }
    if(!content) {
      return res.status(400).json( {error: {message: 'Content is required'}} )
    }
    if(!folder_id) {
      return res.status(400).json( {error: {message: 'Folder is required'}} )
    }
    NoteService.insertNote(db,newNote)
      .then(note => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${note.id}`))
          .json(serializeNote(note))
      })
      .catch(next)
  })

noteRouter
  .route('/:note_id')
  .all((req, res, next) => {
    const db = req.app.get('db')
    const id = req.params.note_id
    NoteService.getById(db, id)
      .then(note => {
        if (!note) {
          return res.status(404).json({
            error: { message: `Note doesn't exist` }
          })
        }
        res.note = note
        next()
      })
      .catch(next)
  })
  .get((req, res, next) => {
    res.json(serializeNote(res.note))
    console.log("hello 3")
  })
  .delete((req, res, next) => {
      const db = req.app.get('db')
      const id = req.params.note_id
    NoteService.deleteNote(db,id)
      .then(numRowsAffected => {
        res.status(204).end()
      })
      .catch(next)
  })
  .patch(jsonParser, (req, res, next) => {
    const { title, date_published } = req.body
    const noteToUpdate = { title, date_published }

    const numberOfValues = Object.values(noteToUpdate).filter(Boolean).length
    if (numberOfValues === 0)
      return res.status(400).json({
        error: {
          message: `Request body must content either 'title', or 'content'`
        }
      })

      const db = req.app.get('db')
      const id = req.params.note_id
      NoteService.updateNote(db, id, noteToUpdate)
      .then(numRowsAffected => {
        res.status(204).end()
      })
      .catch(next)
  })

module.exports = noteRouter