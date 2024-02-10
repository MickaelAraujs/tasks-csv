export function getInvalidParameterErrors(parameters) {
    return Object.entries(parameters).reduce((invalidParameters, parameter) => {
        const [key, value] = parameter

        if (!value) {
            invalidParameters.push({ message: `Parameter ${key} is required` })
        }

        return invalidParameters
    }, [])
}