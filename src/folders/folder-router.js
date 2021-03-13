const path = require('path')
const express = require('express')
const xss = require('xss')
const FolderService = require('./folder-service')

const folderRouter = express.Router()
const jsonParser = express.json()

const serializeFolder = folder => ({
  id: folder.id,
  title: xss(folder.title),
})

folderRouter
  .route('/')
  .get((req, res, next) => {
    console.log("hello folder")
    const knexInstance = req.app.get('db')
    FolderService.getAllFolders(knexInstance)
      .then(folders => 
        res.json(folders.map(serializeFolder))
      )
      .catch(next)
  })
  .post(jsonParser, (req, res, next) => {
    const { title } = req.body
    const newFolder = { title }
    const db = req.app.get('db')

    if(!title){
      return res.status(400).json({error: {message: 'folder name is required'}})
    }
        FolderService.insertFolder(db,newFolder)
      .then(folder => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${folder.id}`))
          .json(serializeFolder(folder))
      })
      .catch(next)
  })

folderRouter
  .route('/:folder_id')
  .all((req, res, next) => {
      const db = req.app.get('db')
      const id = req.params.folder_id
    FolderService.getById(db, id)
      .then(folder => {
        if (!folder) {
          return res.status(404).json({
            error: { message: `Folder doesn't exist` }
          })
        }
        res.folder = folder
        next()
      })
      .catch(next)
  })
  .get((req, res, next) => {
    res.status(200).json(serializeFolder(res.folder))
  })
  .delete((req, res, next) => {
      const db = req.app.get('db')
      const id = req.params.folder_id
    FolderService.deleteFolder(db,id)
      .then(numRowsAffected => {
        res.status(204).end()
      })
      .catch(next)
  })
  .patch(jsonParser, (req, res, next) => {
    const { title } = req.body
    const folderToUpdate = { title }
    const db = req.app.get('db')
    const id = req.params.folder_id

    const numberOfValues = Object.values(folderToUpdate).filter(Boolean).length
    if (numberOfValues === 0)
      return res.status(400).json({
        error: {
          message: `Request body must content either 'title', or 'content'`
        }
      })

    FolderService.updateFolder(db, id, folderToUpdate)
      .then(numRowsAffected => {
        res.status(204).end()
      })
      .catch(next)
  })

module.exports = folderRouter