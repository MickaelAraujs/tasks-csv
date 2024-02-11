import http from 'node:http'
import { json } from './middlewares/json.js'
import { setHeaders } from './middlewares/set-headers.js'
import { setParamsAndQueries } from './middlewares/set-params-and-queries.js'
import { routes } from './routes/routes.js'


const server = http.createServer(async (request, response) => {
    await json(request, response)
    setHeaders(request, response)

    const { method, url } = request
    
    const route = routes.find(route => route.method === method && route.path.test(url))

    if (!route) return response.writeHead(404).end(JSON.stringify({
        error: true,
        message: 'Resource not found',
    }))

    setParamsAndQueries(request, response, route.path)
    
    return route.handler(request, response)
})

server.listen(3000, () => console.log('Server listening on port 3000 🔥'))