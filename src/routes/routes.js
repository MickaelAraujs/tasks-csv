import { buildRoutePath } from '../utils/build-route-path.js'
import taskController from "../controllers/task-controller.js"

export const routes = [
    {
        method: 'GET',
        path: buildRoutePath('/tasks/:id'),
        handler: (request, response) => taskController.index(request, response),
    },
    {
        method: 'POST',
        path: buildRoutePath('/tasks/:id'),
        handler: (request, response) => taskController.create(request, response),
    },
    
]