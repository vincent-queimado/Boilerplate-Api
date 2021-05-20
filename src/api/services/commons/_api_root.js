import config from '@config/app'

export default async () => {
    const conf = config[process.env.NODE_ENV]
    let result = `/api/v${conf.api.version}/info`

    return ({ success: true, data: result, error: null })
}