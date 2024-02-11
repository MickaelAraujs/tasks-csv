import { extractQueryParams } from '../utils/extract-query-params.js'

export function setParamsAndQueries(request, response, path) {
    const pathParams = { ...request.url.match(path) }
    const { query, ...params } = { ...pathParams.groups }
    request.params = params
    request.query = query ? extractQueryParams(query) : {}
}