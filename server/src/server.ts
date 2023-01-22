import Fastify from 'fastify'
import cors from '@fastify/cors'
import { appRoutes } from './routes'


const app = Fastify()

app.register(cors)
app.register(appRoutes)

app.listen({
    port: 8000,
    host: '0.0.0.0'
}).then(()=>{
    console.log('Server running at port: localhost:8000/')
})