import { parse } from 'lua-json'

const host = 'http://mineos.buttex.ru/MineOSAPI/2.04/'
const agent =
    'Mozilla/5.0 (Macintosh Intel Mac OS X 10_13_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.119 Safari/537.36'

enum PublicationCategory {
    Applications = 1,
    Libraries,
    Scripts,
    Wallpapers
}

enum PublicationLanguage {
    English = 18,
    Russian = 71
}

enum FileType {
    Main = 1,
    Resource,
    Icon,
    Localization,
    Preview
}

enum License {
    MIT = 1,
    GnuGplv3,
    GnuAgplv3,
    GnuLgplv3,
    ApacheLicense2,
    MozillaPublicLicense2,
    TheUnlicense
}

enum OrderBy {
    Popularity = 'popularity',
    Rating = 'rating',
    Name = 'name',
    Date = 'date'
}

enum OrderDirection {
    Ascending = 'asc',
    Descending = 'desc'
}

class APIError extends Error {
    constructor(message: string) {
        super(message)
        this.name = 'APIError'
    }
}

function snakeToCamelCase(str: string): string {
    return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase())
}

function convertKeysToCamel(obj: any): any {
    if (Array.isArray(obj)) {
        return obj.map(convertKeysToCamel)
    } else if (obj !== null && typeof obj === 'object') {
        return Object.entries(obj).reduce(
            (acc: Record<string, any>, [key, value]) => {
                const camelKey = snakeToCamelCase(key)
                acc[camelKey] = convertKeysToCamel(value)
                return acc
            },
            {}
        )
    }
    return obj
}

function recordToArray<T>(record: Record<string, T>): T[] {
    return Object.values(record)
}

async function apiRequest<T>(
    script: string,
    options?: Record<string, any>
): Promise<T> {
    const response = await fetch(host + script + '.php', {
        method: 'POST',
        headers: {
            'User-Agent': agent,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams(options)
    })

    if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    const text = await response.text()

    let parsed
    try {
        parsed = convertKeysToCamel(parse('return ' + text))
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(
                `Failed to parse Lua response: ${error.message}. Raw response: ${text}`
            )
        }
    }

    if (parsed.success === false) {
        throw new APIError(parsed.reason || 'Unknown API error')
    }

    if (parsed.success === true && !parsed.result) {
        return parsed as T
    }

    return parsed.result as T
}

interface SuccessResponse {
    /** Indicates if the operation was successful */
    success: true
    /** Optional result data from the operation */
    result?: any
}

interface Statistics {
    /** Total number of registered users */
    usersCount: number
    /** Total number of published items */
    publicationsCount: number
    /** Total number of reviews posted */
    reviewsCount: number
    /** Total number of messages sent */
    messagesCount: number
    /** Username of the most recently registered user */
    lastRegisteredUser: string
    /** Username of the most popular user */
    mostPopularUser: string
}

/**
 * Get market's statistics.
 *
 * @example await getStatistics()
 *
 * @returns {Promise<Statistics>} Market statistics data.
 * */
export async function getStatistics(): Promise<Statistics> {
    return await apiRequest<Statistics>('statistics')
}

interface ChangePasswordParams {
    /** User's email address */
    email: string
    /** User's current password */
    currentPassword: string
    /** New password to set */
    newPassword: string
}

/**
 * Change user's password.
 *
 * @param {ChangePasswordParams} params Object with required fields.
 * @param {string} params.email User's email address.
 * @param {string} params.currentPassword User's current password.
 * @param {string} params.newPassword New password to set.
 *
 * @example
 * await changePassword({
 *     email: 'user@example.com',
 *     currentPassword: 'oldpass1488',
 *     newPassword: 'prettynewpassword'
 * })
 *
 * @returns {Promise<SuccessResponse>} Successful response.
 * */
export async function changePassword({
    email,
    currentPassword,
    newPassword
}: ChangePasswordParams): Promise<SuccessResponse> {
    return await apiRequest<SuccessResponse>('change_password', {
        email,
        current_password: currentPassword,
        new_password: newPassword
    })
}

interface LoginData {
    /** User's unique identifier */
    id: number
    /** Authentication token for API requests */
    token: string
    /** User's display name */
    name: string
    /** User's email address */
    email: string
    /** Whether the user's email is verified */
    isVerified: boolean
    /** Timestamp of the login */
    timestamp: number
}

interface LoginParams {
    /** User's username */
    name?: string
    /** User's e-mail */
    email?: string
    /** User's password */
    password: string
}

/**
 * Get user's credentials, including token.
 * Either email or name required.
 *
 * @param {LoginParams} params Object with required fields.
 * @param {string} [params.name] User's username.
 * @param {string} [params.email] User's e-mail.
 * @param {string} params.password User's password.
 *
 * @example await login({ email: 'user@example.com', password: 'prettynewpassword' })
 *
 * @returns {Promise<LoginData>} User's credentials.
 * */
export async function login({
    name,
    email,
    password
}: LoginParams): Promise<LoginData> {
    const options: LoginParams = { password }

    if (email) options.email = email
    if (name) options.name = name

    return await apiRequest<LoginData>('login', options)
}

interface RegisterParams {
    /** User's username */
    name: string
    /** User's e-mail */
    email: string
    /** User's password */
    password: string
}

/**
 * Register a new user.
 *
 * @param {LoginParams} params Object with required fields.
 * @param {string} params.name User's username.
 * @param {string} params.email User's e-mail.
 * @param {string} params.password User's password.
 *
 * @example await register({ name: 'ECS', email: 'user@example.com', password: 'prettynewpassword' })
 *
 * @returns {Promise<SuccessResponse>}
 * */

export async function register({
    name,
    email,
    password
}: RegisterParams): Promise<SuccessResponse> {
    return await apiRequest<SuccessResponse>('register', {
        name,
        email,
        password
    })
}

interface PreviewPublication {
    /** Publication's unique file identifier */
    fileId: number
    /** Name of the publication */
    publicationName: string
    /** Username of the publication's author */
    userName: string
    /** Current version number of the publication */
    version: number
    /** Category identifier of the publication */
    categoryId: number
    /** Total number of reviews for this publication */
    reviewsCount: number
    /** Total number of downloads */
    downloads: number
    /** URL to the publication's icon image */
    iconUrl: string
    /** Average rating score from reviews */
    averageRating: number
    /** Popularity score of the publication */
    popularity: number
}

interface GetPublicationsParams {
    /** Publications category filter */
    category?: PublicationCategory
    /** Field to order by */
    orderBy?: OrderBy
    /** Direction of ordering (e.g., ascending or descending) */
    orderDirection?: OrderDirection
    /** Number of publications to skip (for pagination) */
    offset?: number
    /** Number of publications to return */
    count?: number
    /** Search query string */
    search?: string
    /** Filter publications by specific file IDs */
    fileIds?: number[]
}

/**
 * Get store's publications.
 *
 * @param {GetPublicationsParams} [params={}] Object with optional parameters.
 * @param {PublicationCategory} [params.category] Publications category filter.
 * @param {OrderBy} [params.orderBy] Field to order by.
 * @param {OrderDirection} [params.orderDirection] Direction of ordering (e.g., ascending or descending).
 * @param {number} [params.offset] Number of publications to skip (for pagination).
 * @param {number} [params.count = 100] Number of publications to return.
 * @param {string} [params.search] Search query string.
 * @param {number[]} [params.fileIds] Filter publications by specific file IDs.
 *
 * @example
 * await getPublications({
 *     category: PublicationCategory.Wallpapers,
 *     search: 'boobs'
 * })
 *
 * @returns {Promise<PreviewPublication[]>} List of filtered publications.
 */
export async function getPublications({
    category,
    orderBy,
    orderDirection,
    offset,
    count = 100,
    search,
    fileIds
}: GetPublicationsParams = {}): Promise<PreviewPublication[]> {
    const options: Record<string, string | number | number[]> = { count }

    if (category) options.category_id = category
    if (orderBy) options.order_by = orderBy
    if (orderDirection) options.order_direction = orderDirection
    if (offset) options.offset = offset
    if (search) options.search = search
    if (fileIds) options.file_ids = fileIds

    return recordToArray(
        await apiRequest<Record<string, PreviewPublication>>(
            'publications',
            options
        )
    )
}

interface Dependency {
    /** URL to the source code repository */
    sourceUrl: string
    /** Path to the main file or entry point */
    path: string
    /** Version number of the dependency */
    version: number
    /** File type identifier */
    typeId: FileType
    /** Name of the dependency publication */
    publicationName?: string
    /** Category identifier of the dependency */
    categoryId?: number
}

interface Publication {
    /** Publication's unique file identifier */
    fileId: number
    /** Name of the publication */
    publicationName: string
    /** Username of the publication's author */
    userName: string
    /** Current version number of the publication */
    version: number
    /** Category identifier of the publication */
    categoryId: number

    /** URL to the source code repository */
    sourceUrl: string
    /** Path to the main file or entry point */
    path: string
    /** License identifier associated with the publication */
    licenseId: number
    /** Publication creation timestamp */
    timestamp: number
    /** Original description text */
    initialDescription: string
    /** Translated description text */
    translatedDescription: string
    /** Map of dependency data indexed by dependency ID */
    dependenciesData: Record<number, Dependency>

    /** List of direct dependency file IDs */
    dependencies?: number[]
    /** List of all dependency file IDs (including transitive) */
    allDependencies?: number[]

    /** URL to the publication's icon image */
    iconUrl?: string

    /** Average rating score from reviews */
    averageRating: number
    /** Description of recent changes */
    whatsNew?: string
    /** Version number when whatsNew was last updated */
    whatsNewVersion?: number
    /** Total number of downloads */
    downloads: number
}

interface GetPublicationParams {
    /** Publication's file id */
    id: number
    /** Publication's translation language */
    language?: PublicationLanguage
}

/**
 * Get publication.
 *
 * @param {GetPublicationParams} params Object with required fields.
 * @param {number} params.id Publication's file id.
 * @param {PublicationLanguage} [params.language = PublicationLanguage.English] Publication's translation language.
 *
 * @example await getPublication({ id: 1488 })
 *
 * @returns {Promise<Publication>} Requested publication.
 * */
export async function getPublication({
    id,
    language = PublicationLanguage.English
}: GetPublicationParams): Promise<Publication> {
    return await apiRequest<Publication>('publication', {
        file_id: id,
        language_id: language
    })
}

interface UploadPublicationParams {
    /** Authentication token of the user */
    token: string
    /** Name of the publication */
    name: string
    /** URL to the source code repository */
    sourceUrl: string
    /** Path to the main file or entry point */
    path: string
    /** Description of the publication */
    description: string
    /** ID of the license associated with the publication */
    license: License
    /** Category identifier of the publication */
    category: PublicationCategory
    /** List of file IDs the publication depends on */
    dependencies?: number[]
    /** Description of recent changes (e.g., changelog) */
    whatsNew?: string
}

/**
 * Upload new publication.
 *
 * @param {UploadPublicationParams} params Object with required fields.
 * @param {string} params.token Authentication token of the user.
 * @param {string} params.name Name of the publication.
 * @param {string} params.sourceUrl URL to the source code repository.
 * @param {string} params.path Path to the main file or entry point.
 * @param {string} params.description Description of the publication.
 * @param {License} params.license ID of the license associated with the publication.
 * @param {PublicationCategory} params.category Category identifier of the publication.
 * @param {number[]} [params.dependencies=[]] List of file IDs the publication depends on.
 * @param {string} [params.whatsNew] Description of recent changes (e.g., changelog).
 *
 * @example
 * await uploadPublication({
 *   token: 'veryrealistictoken',
 *   name: 'Cool App',
 *   sourceUrl: 'https://github.com/example/repo',
 *   path: 'main.lua',
 *   description: 'My new app',
 *   license: License.MIT,
 *   category: PublicationCategory.Applications,
 *   dependencies: [123, 456],
 * })
 *
 * @returns {Promise<SuccessResponse>} Successful response.
 */
export async function uploadPublication({
    token,
    name,
    sourceUrl,
    path,
    description,
    license,
    category,
    dependencies = [],
    whatsNew
}: UploadPublicationParams): Promise<SuccessResponse> {
    const options: Record<string, string | number | number[]> = {
        token: token,
        name: name,
        source_url: sourceUrl,
        path: path,
        description: description,
        license_id: license,
        category_id: category,
        dependencies: dependencies
    }

    if (whatsNew) {
        options.whats_new = whatsNew
    }

    return await apiRequest<SuccessResponse>('upload', options)
}

interface UpdatePublicationParams {
    /** Authentication token of the user */
    token: string
    /** ID of the publication to update */
    fileId: number
    /** Name of the publication */
    name: string
    /** URL to the source code repository */
    sourceUrl: string
    /** Path to the main file or entry point */
    path: string
    /** Description of the publication */
    description: string
    /** ID of the license associated with the publication */
    license: License
    /** Category identifier of the publication */
    category: PublicationCategory
    /** List of file IDs the publication depends on */
    dependencies?: number[]
    /** Description of recent changes (e.g., changelog) */
    whatsNew?: string
}

/**
 * Update an existing publication.
 *
 * @param {UpdatePublicationParams} params Object with required fields.
 * @param {string} params.token Authentication token of the user.
 * @param {number} params.fileId ID of the publication to update.
 * @param {string} params.name Name of the publication.
 * @param {string} params.sourceUrl URL to the source code repository.
 * @param {string} params.path Path to the main file or entry point.
 * @param {string} params.description Description of the publication.
 * @param {License} params.license ID of the license associated with the publication.
 * @param {PublicationCategory} params.category Category identifier of the publication.
 * @param {number[]} [params.dependencies=[]] List of file IDs the publication depends on.
 * @param {string} [params.whatsNew] Description of recent changes (e.g., changelog).
 *
 * @example
 * await updatePublication({
 *   token: 'veryrealistictoken',
 *   fileId: 1488,
 *   name: 'Cool App',
 *   sourceUrl: 'https://github.com/example/repo',
 *   path: 'main.lua',
 *   description: 'My updated app',
 *   license: License.MIT,
 *   category: PublicationCategory.Applications,
 *   dependencies: [123, 456],
 *   whatsNew: 'Bug fixes and improvements'
 * })
 *
 * @returns {Promise<SuccessResponse>} Successful response.
 */
export async function updatePublication({
    token,
    fileId,
    name,
    sourceUrl,
    path,
    description,
    license,
    category,
    dependencies = [],
    whatsNew
}: UpdatePublicationParams): Promise<SuccessResponse> {
    const options: Record<string, any> = {
        token: token,
        file_id: fileId,
        name: name,
        source_url: sourceUrl,
        path: path,
        description: description,
        license_id: license,
        category_id: category,
        dependencies: dependencies
    }

    if (whatsNew) {
        options.whats_new = whatsNew
    }

    return await apiRequest<SuccessResponse>('update', options)
}

interface DeletePublicationParams {
    /** Authentication token of the user */
    token: string
    /** ID of the publication to delete */
    fileId: number
}

/**
 * Delete existing publication.
 *
 * @param {DeletePublicationParams} params Object with required fields.
 * @param {string} params.token Authentication token of the user.
 * @param {number} params.fileId ID of the publication to delete.
 *
 * @example await deletePublication({ token: 'veryrealistictoken', fileId: 1488 })
 *
 * @returns {Promise<SuccessResponse>} Successful response.
 * */
export async function deletePublication({
    token,
    fileId
}: DeletePublicationParams): Promise<SuccessResponse> {
    return await apiRequest<SuccessResponse>('delete', {
        token: token,
        file_id: fileId
    })
}

interface Dialog {
    /** Username of the dialog participant */
    dialogUserName: string
    /** Timestamp of the last message */
    timestamp: number
    /** Text content of the last message */
    text: string
    /** Whether the last message has been read */
    lastMessageIsRead: boolean
    /** Username of who sent the last message */
    lastMessageUserName: string
    /** User ID of who sent the last message */
    lastMessageUserId: number
}

interface GetDialogsParams {
    /** Authentication token of the user */
    token: string
}

/**
 * Get user's dialogs.
 *
 * @param {GetDialogsParams} params Object with required fields.
 * @param {string} params.token Authentication token of the user.
 *
 * @example await getDialogs({ token: 'veryrealistictoken' })
 *
 * @returns {Promise<Dialog[]>} List of user's dialogs.
 * */
export async function getDialogs({
    token
}: GetDialogsParams): Promise<Dialog[]> {
    return recordToArray(
        await apiRequest<Record<string, Dialog>>('dialogs', { token })
    )
}

interface Message {
    /** Message text content */
    text: string
    /** Username of the message sender */
    userName: string
    /** Timestamp when the message was sent */
    timestamp: number
}

interface GetDialogParams {
    /** Authentication token of the user */
    token: string
    /** Target user */
    userName: string
}

/**
 * Get messages from dialog with user.
 *
 * @param {GetDialogParams} params Object with required fields.
 * @param {string} params.token Authentication token of the user.
 * @param {string} params.userName Target user.
 *
 * @example await getDialog({token: 'veryrealistictoken', userName: 'ECS'})
 *
 * @returns {Promise<Message[]>} List of dialog's messages.
 * */

export async function getDialog({
    token,
    userName
}: GetDialogParams): Promise<Message[]> {
    return recordToArray(
        await apiRequest<Record<string, Message>>('messages', {
            token: token,
            user_name: userName
        })
    )
}

interface SendMessageParams {
    /** Authentication token of the user */
    token: string
    /** Receiver's username */
    userName: string
    /** Message text content */
    text: string
}

/**
 * Send a message.
 *
 * @param {SendMessageParams} params Object with required fields.
 * @param {string} params.token Authentication token of the user.
 * @param {string} params.userName Receiver's username.
 * @param {string} params.text Message text content.
 *
 * @example
 * await sendMessage({
 *     token: 'veryrealistictoken',
 *     userName: 'ECS',
 *     text: 'Holy guacamole'
 * })
 *
 * @returns {Promise<SuccessResponse>} Successful response.
 *  */
export async function sendMessage({
    token,
    userName,
    text
}: SendMessageParams): Promise<SuccessResponse> {
    return await apiRequest<SuccessResponse>('message', {
        token: token,
        user_name: userName,
        text: text
    })
}

interface ReviewVotes {
    /** Total number of votes on the review */
    total: number
    /** Number of positive votes */
    positive: number
}

interface Review {
    /** Unique review identifier */
    id: number
    /** Username of the review author */
    userName: string
    /** Rating score given in the review */
    rating: number
    /** Text content of the review */
    comment: string
    /** Timestamp when the review was posted */
    timestamp: number
    /** Vote counts for this review */
    votes: ReviewVotes
}

interface GetReviewsParams {
    /** Target publication's file ID */
    publicationFileId: number
    /** Number of reviews to skip (for pagination) */
    offset?: number
    /** Number of reviews to return */
    count?: number
}

/**
 * Get publication's reviews.
 *
 * @param {GetReviewsParams} params Object with required fields.
 * @param {number} params.publicationFileId Target publication's file ID.
 * @param {number} [params.offset = 0]  Number of reviews to skip (for pagination).
 * @param {number} [params.count] Number of reviews to return.
 *
 * @example await getReviews({ publicationFileId: 1488, count: 3 })
 *
 * @returns {Promise<Review[]>} List of reviews.
 * */
export async function getReviews({
    publicationFileId,
    offset = 0,
    count
}: GetReviewsParams): Promise<Review[]> {
    const options: Record<string, any> = { file_id: publicationFileId }

    if (offset) options.offset = offset
    if (count) options.count = count

    const raw = await apiRequest<Review[]>('reviews', options)

    return Object.values(raw)
}

interface VoteReviewParams {
    /** Authentication token of the user */
    token: string
    /** Review's ID */
    reviewId: number
    /** Is review helpful */
    helpful: boolean
}

/**
 * Vote either review is helpful or not.
 *
 * @param {GetReviewsParams} params Object with required fields.
 * @param {string} params.token Authentication token of the user.
 * @param {number} params.reviewId Review's ID.
 * @param {boolean} params.helpful Is review helpful.
 *
 * @example
 * await voteReview({
 *     token: 'veryrealistictoken',
 *     reviewId: 161,
 *     helpful: false
 * })
 *
 * @returns {Promise<SuccessResponse>} Successful response.
 * */
export async function voteReview({
    token,
    reviewId,
    helpful
}: VoteReviewParams): Promise<SuccessResponse> {
    return await apiRequest<SuccessResponse>('review_vote', {
        token: token,
        review_id: reviewId,
        rating: helpful
    })
}

interface PostReviewParams {
    /** Authentication token of the user */
    token: string
    /** Publication's file ID */
    fileId: number
    /** Rating value */
    rating: number
    /** Review's text content */
    comment: string
}

/**
 * Post a review to a publication.
 *
 * @param {GetReviewsParams} params Object with required fields.
 * @param {string} params.token Authentication token of the user.
 * @param {number} params.fileId Publication's file ID.
 * @param {number} params.rating Rating value.
 * @param {number} params.comment Review's text content.
 *
 * @example
 * await postReview({
 *     token: 'veryrealistictoken'
 *     fileId: 1488,
 *     rating: 4,
 *     comment: 'Beautiful application, my grandma loved it',
 * })
 *
 * @returns {Promise<SuccessResponse>} Successful response.
 * */
export async function postReview({
    token,
    fileId,
    rating,
    comment
}: PostReviewParams): Promise<SuccessResponse> {
    return await apiRequest<SuccessResponse>('review', {
        token: token,
        file_id: fileId,
        rating: rating,
        comment: comment
    })
}

interface MarkDownloadedParams {
    /** Authentication token of the user */
    token: string
    /** Publication's ID */
    fileId: number
}

/**
 * Mark publication as downloaded.
 *
 * @param {GetReviewsParams} params Object with required fields.
 * @param {string} params.token Authentication token of the user.
 * @param {number} params.fileId Publication's ID.
 *
 * @example await markDownloaded({ token: 'veryrealistictoken', fileId: 1488 })
 *
 * @returns {Promise<SuccessResponse>} Successful response.
 * */
export async function markDownloaded({
    token,
    fileId
}: MarkDownloadedParams): Promise<SuccessResponse> {
    return await apiRequest<SuccessResponse>('download', {
        token: token,
        file_id: fileId
    })
}
