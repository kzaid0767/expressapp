import express from "express"
const booksRouter = express.Router()
import { books } from "../data.js"

booksRouter.route('/')
.get((req,res)=>{
    res.json({
        status: 'success',
        message: 'all books retrieved',
        data: books
    })
})
/* post a new book */
.post((req,res)=>{
    const newBook = req.body
    books.push(newBook)
    res.json({
        status: 'success',
        message: 'Book was added to list'
    })
})

booksRouter.route('/authors')
.get((req,res)=>{
    const authors =[]
    for(let item in books){
        authors.push(books[item].author)
    }
    res.json({
        status:'success',
        message:'authors retrieved',
        data: authors
    })
})

booksRouter.route('/:bookId')
.get((req,res)=>{
    const id = Number(req.params.bookId)
    const book = books.find(item => item.id === id)

    if(!book){
        return res.json({
            status: 'failed to fetch',
            message: 'No book with matching id was found'
        })
    }

    res.json({
        status: 'success',
        message: 'got desired book',
        data: book
    })
})








export default booksRouter