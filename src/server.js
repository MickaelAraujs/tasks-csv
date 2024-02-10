import http from 'node:http'
import { json } from './middlewares/json.js'
import { setHeaders } from './middlewares/set-headers.js'
import { routes } from './routes/routes.js'

const server = http.createServer(async (request, response) => {
    await json(request, response)
    setHeaders(request, response)
    
    const route = routes.find(route => route.method === request.method && route.path === request.url)

    if (!route) return response.writeHead(404).end(JSON.stringify({
        error: true,
        message: 'Resource not found',
    }))

    return route.handler(request, response)
})

server.listen(3000, () => console.log('Server listening on port 3000 🔥'))