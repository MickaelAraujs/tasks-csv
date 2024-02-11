import { randomUUID } from 'node:crypto'
import { getInvalidParameterErrors } from '../utils/get-invalid-parameter-errors.js'
import { Database } from '../persistance/database.js'
import { getNow } from '../utils/get-now.js'

const database = new Database()

class TaskController {
    index(request, response) {
        const {
            title,
            description,
        } = request.query

        let queries = {}

        if (title) queries.title = title
        if (description) queries.description = description

        const tasks = database.select('tasks', queries)

        return response
            .writeHead(200)
            .end(JSON.stringify(tasks))
    }

    create(request, response) {
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

        const now = getNow()

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
        const {
            title,
            description,
        } = request.body

        if (!title && !description) return response.writeHead(400).end(JSON.stringify({
            error: true,
            message: 'Title and Description params are required',
        }))

        const { id } = request.params

        const task = database.selectBy('tasks', id)

        if (!task) return response.writeHead(404).end(JSON.stringify({
            error: true,
            message: 'Task was not found',
        }))

        task.title = title ?? task.title
        task.description = description ?? task.description
        task.updated_at = getNow()

        database.update('tasks', id, task)
        
        return response.writeHead(204).end()
    }

    delete(request, response) {
        const { id } = request.params

        const task = database.selectBy('tasks', id)

        if (!task) return response.writeHead(404).end(JSON.stringify({
            error: true,
            message: 'Task was not found',
        }))

        database.delete('tasks', id)

        return response.writeHead(204).end()
    }

    complete(request, response) {

    }
}

export default new TaskController()