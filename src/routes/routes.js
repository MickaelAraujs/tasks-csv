import taskController from "../controllers/task-controller.js"

export const routes = [
    {
        method: 'POST',
        path: '/tasks',
        handler: (request, response) => taskController.create(request, response),
    }
]