import express from 'express'
import morgan from 'morgan'
import 'colors'
import 'dotenv/config'
import index from './routes/index.route'
import user from './routes/users.route'

const app = express()
const PORT = process.env.PORT || 3000
app.use(express.json())
app.use(morgan('dev'))

app.use(index)
app.use('/api/v1', user)

app.use((req, res, next)=>{
  res.status(404).send('404 Not Found')
  next()
})

app.listen((PORT), ()=>{
  console.log(`Server on Port ${PORT}`.bgBlue)
})