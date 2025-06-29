import {
    PublicationCategory,
    OrderBy,
    OrderDirection,
    PublicationLanguage,
    License
} from '../../shared/enums.js'

export interface GetPublicationsParams {
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

export interface GetPublicationParams {
    /** Publication's file id */
    id: number
    /** Publication's translation language */
    language?: PublicationLanguage
}

export interface UploadPublicationParams {
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

export interface UpdatePublicationParams {
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

export interface DeletePublicationParams {
    /** Authentication token of the user */
    token: string
    /** ID of the publication to delete */
    fileId: number
}
