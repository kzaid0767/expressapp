import express from 'express';
import isAllowed from './middleWare/isAllowed.js';
import booksRouter from './routes/booksRouter.js';
/* 2. create an instant */
const app = express()

/* 3. create port */
const port = 8082

//Using middle for incoming data and checks
app.use(isAllowed)
app.use(express.json())
/* 
server static files
app.use(express.static())

parsing incoming data
app.use(express.json())
app.use(expres.urlencode())
*/


/* 4. define handler */
//home route
app.get('/',(req, res)=>{
    res.json({
        statu: 'success',
        message: 'Welcome to my book api'
    })
})

app.use('/books',booksRouter)


app.get('/about',(req,res)=>{
    res.send('This is the old about page')
})



app.listen(port, ()=>{
    console.log(`The server is running on port ${port}`)
})