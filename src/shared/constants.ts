import type { Config } from './types'

export const keysToForceString: string[] = [
    'userName',
    'dialogUserName',
    'lastMessageUserName',
    'lastRegisteredUser',
    'mostPopularUser',
    'name',
    'publicationName',
    'initialDescription',
    'translatedDescription',
    'whatsNew',
    'comment',
    'text'
]

export const defaultConfig: Config = {
    hostUrl: 'http://mineos.buttex.ru/MineOSAPI/2.04/',
    userAgent:
        'Mozilla/5.0 (Macintosh Intel Mac OS X 10_13_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.119 Safari/537.36',
    headers: undefined,
    proxyUrl: undefined
}
