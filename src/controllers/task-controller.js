import { randomUUID } from 'node:crypto'
import { getInvalidParameterErrors } from '../utils/get-invalid-parameter-errors.js'
import { Database } from '../persistance/database.js'

const database = new Database()

class TaskController {
    index(request, response) {
        const tasks = database.select('tasks', null)

        return response
            .writeHead(200)
            .end(JSON.stringify(tasks))
    }

    create(request, response) {
        return response.writeHead(201).end()
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

        database.insert('tasks', task)

        return response.writeHead(201).end()
    }

    update(request, response) {

    }

    delete(request, response) {

    }

    complete(request, response) {

    }
}

export default new TaskController()