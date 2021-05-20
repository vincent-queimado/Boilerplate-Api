import pack from '@package'

export default async () => {
    let result = { 'name': pack.name, 'description': pack.description, 'version': pack.version }

    return ({ success: true, data: result, error: null })
}