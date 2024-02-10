export function getInvalidParameterErrors(parameters) {
    const invalidParameters = []

    Object.entries(parameters).forEach(([key, value]) => {
        if (!value) invalidParameters.push({ key, value })
    })

    return invalidParameters.map(invalidParameter => ({
        message: `Parameter ${invalidParameter.key} is required`
    }))
}