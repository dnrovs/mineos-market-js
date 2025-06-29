import { apiRequest } from '../core.js'
import {
    GetPublicationsParams,
    GetPublicationParams,
    UploadPublicationParams,
    UpdatePublicationParams,
    DeletePublicationParams
} from './parameters.js'
import { PreviewPublication, Publication } from './responses.js'
import { PublicationLanguage } from '../../shared/enums.js'
import { SuccessResponse } from '../../shared/types.js'
import { recordToArray } from '../../utils/transform.js'

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
    const options: Record<string, string | number | number[]> = {
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
