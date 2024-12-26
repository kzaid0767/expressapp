import express from 'express';

/* 2. create an instant */
const app = express()

/* 3. create port */
const port = 8082
//for incoming data
app.use(express.json())

const books =[
    {id:1,author:'Kassim',title:'Life and times'},
    {id:2,author:'Buheti',title:'Life and days'},
    {id:3,author:'Zaid',title:'Life and ways'}
]

/* 4. define handler */
//home route
app.get('/',(req, res)=>{
    res.json({
        statu: 'success',
        message: 'Welcome to my book api'
    })
})

app.get('/books',(req,res)=>{
    res.json({
        status: 'success',
        message: 'all books retrieved',
        data: books
    })
})

app.get('/books/:bookId',(req,res)=>{
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

/* post a new book */
app.post('/books',(req,res)=>{
    const newBook = req.body
    books.push(newBook)
    res.json({
        status: 'success',
        message: 'Book was added to list'
    })
})
app.get('/about',(req,res)=>{
    res.send('This is old about page')
})

app.get('/authors', (req,res)=>{
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

app.listen(port, ()=>{
    console.log(`The server is running on port ${port}`)
})