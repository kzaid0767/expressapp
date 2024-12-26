import express from 'express'
const app = express()
const port = 8081
app.use(express.json())

const books = [
    {id:1,author:'kassim'},
    {id:2,author:'buheti'},
    {id:3,author:'zaid'},
]

app.get('/',(req,res)=>{
    res.json({
        status: 'ok',
        message: 'reached home page'
    })
})



app.get('/books',(req,res)=>{
    res.json({
        status: 'ok',
        message: 'reached the books route',
        data: books
    })
})

app.get('/books/:id',(req,res)=>{
    const id = Number(req.params.id)
    const requestedBook = books.filter(book => book.id === id)[0]
    if(!requestedBook){
        return res.json({
            status: 'ok',
            message: 'not matching book was found try another id'
        })
    }
    res.json({
        status: 'ok',
        message: 'book was found',
        data: requestedBook
    })
})

app.post('/books',(req,res)=>{
    const bookToUpload = req.body
    if(bookToUpload&& bookToUpload.id&&bookToUpload.author){
        books.push(bookToUpload)
        res.json({
            status: 'ok',
            message: 'book was added with success',
        })
    } else {

        return res.json({
            status: 'not ok',
            message: 'book was missing some values',
        })
    }
})

app.delete('/books/:id',(req,res)=>{
    const id = Number(req.params.id)
    if(id){
        const idx = books.findIndex(item=>item.id === id)
            if(idx !== -1){
                books.splice(idx,1)
                res.json({
                    status: 'ok',
                    message: 'book was deleted'
                })
            } else {
                return res.json({
                    status: 'not',
                    message: 'book was not found'
                })
            }
    } else {
        return res.json({
            status: 'not ok',
            message: 'id value is missing'
        })
    }
})


app.listen(port, ()=>{
    console.log(`running on ${port}`)
})