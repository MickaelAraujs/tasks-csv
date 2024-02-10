import { randomUUID } from 'node:crypto'
import { getInvalidParameterErrors } from '../utils/get-invalid-parameter-errors.js'

export const routes = [
    {
        method: 'POST',
        path: '/tasks',
        handler: (request, response) => {
            const errors = getInvalidParameterErrors({
                title: request.body?.title, 
                description: request.body?.description,
            })

            if (errors.length) return response.writeHead(400).end(JSON.stringify({
                error: true,
                errors,
            }))

            const {
                title,
                description,
            } = request.body

            const now = new Date().toISOString()

            const task = {
                id: randomUUID(),
                title,
                description,
                created_at: now,
                updated_at: now,
                completed_at: null,
            }

            console.log(task)

            return response.writeHead(201)
                .end()
        },
    }
]