import pack from '@package'

export default async () => {
    let result = { 'version': pack.version }

    return ({ success: true, data: result, error: null })
}