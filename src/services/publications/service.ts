import { BaseService } from '../base'

import { z } from 'zod'

import { PublicationLanguage } from '../../shared'

import {
    GetPublicationsParams,
    GetPublicationParams,
    MarkDownloadedParams,
    PublicationDependency,
    FileDependency,
    UploadPublicationParams,
    UpdatePublicationParams,
    DeletePublicationParams
} from './parameters'
import { Dependency, PreviewPublication, Publication } from './responses'

import { PreviewPublicationSchema, PublicationSchema } from './responses'

function buildDependencies(
    iconUrl?: `${string}/${string}.pic`,
    previews?: `${string}/${string}.pic`[],
    localizations?: `${string}/${string}.lang`[],
    dependencies?: (PublicationDependency | FileDependency)[]
) {
    return [
        ...(iconUrl
            ? [
                  {
                      source_url: iconUrl,
                      path: 'Icon.pic'
                  }
              ]
            : []),

        ...(previews?.map((previewUrl) => ({
            source_url: previewUrl,
            path: previewUrl.split('/').pop(),
            preview: 1
        })) ?? []),

        ...(localizations?.map((localeUrl) => ({
            source_url: localeUrl,
            path: `Localizations/${localeUrl.split('/').pop()}`
        })) ?? []),

        ...(dependencies?.map((d) => ({
            publication_name: d.publicationName,
            source_url: d.sourceUrl,
            path: d.path
        })) ?? [])
    ]
}

/** @group Services */
export interface Publications {
    /**
     * Get store's publications.
     *
     * @param {GetPublicationsParams} [params = {}] Object with required fields.
     *
     * @example
     * await client.publications.getPublications({
     *     category: PublicationCategory.Wallpapers,
     *     search: 'boobs'
     * })
     *
     * @returns {Promise<PreviewPublication[]>} List of filtered publications.
     */
    getPublications(
        params?: GetPublicationsParams
    ): Promise<PreviewPublication[]>

    /**
     * Get publication.
     *
     * @param {GetPublicationParams} params Object with required fields.
     *
     * @example await client.publications.getPublication({ fileId: 1488 })
     *
     * @returns {Promise<Publication>} Requested publication.
     * */
    getPublication(params: GetPublicationParams): Promise<Publication>

    /**
     * Mark publication as downloaded.
     *
     * @param {GetReviewsParams} params Object with required fields.
     *
     * @example await client.publications.markDownloaded({ fileId: 1488 })
     * */
    markDownloaded(params: MarkDownloadedParams): Promise<void>

    /**
     * Upload new publication.
     *
     * @param {UploadPublicationParams} params Object with required fields.
     *
     * @example
     * await client.publications.uploadPublication({
     *   name: 'Cool App',
     *   description: 'My new app',
     *   category: PublicationCategory.Applications,
     *   license: License.MIT,
     *   sourceUrl: 'https://github.com/user/repo/raw/refs/heads/main/Main.lua',
     *   dependencies: [{
     *       sourceUrl: 'https://github.com/user/repo/raw/refs/heads/main/Background.pic',
     *       path: 'Assets/Background.pic'
     *   }]
     * })
     */
    uploadPublication(params: UploadPublicationParams): Promise<void>

    /**
     * Update an existing publication.
     *
     * @param {UpdatePublicationParams} params Object with required fields.
     *
     * @example
     * await client.publications.updatePublication({
     *   fileId: 1488,
     *   whatsNew: 'Bug fixes and improvements',
     *   name: 'Cool App',
     *   description: 'My new app',
     *   category: PublicationCategory.Applications,
     *   license: License.MIT,
     *   sourceUrl: 'https://github.com/user/repo/raw/refs/heads/main/Main.lua',
     *   dependencies: [{
     *       sourceUrl: 'https://github.com/user/repo/raw/refs/heads/main/Background.pic',
     *       path: 'Assets/Background.pic'
     *   }]
     * })
     */
    updatePublication(params: UpdatePublicationParams): Promise<void>

    /**
     * Delete existing publication.
     *
     * @param {DeletePublicationParams} params Object with required fields.
     *
     * @example await client.publications.deletePublication({ fileId: 1488 })
     * */
    deletePublication(params: DeletePublicationParams): Promise<void>
}

export class PublicationsService extends BaseService implements Publications {
    async getPublications(
        params: GetPublicationsParams = {}
    ): Promise<PreviewPublication[]> {
        return Object.values(
            await this.core.request(
                'publications',
                {
                    category_id: params.category,
                    order_by: params.orderBy,
                    order_direction: params.orderDirection,
                    offset: params.offset,
                    count: params.count,
                    search: params.search,
                    user_name: params.userName,
                    file_ids: params.fileIds
                },
                false,
                z.array(PreviewPublicationSchema)
            )
        )
    }

    async getPublication(params: GetPublicationParams): Promise<Publication> {
        const data = await this.core.request(
            'publication',
            {
                file_id: params.fileId,
                language_id: params.language || PublicationLanguage.English
            },
            false,
            PublicationSchema
        )

        const dependenciesData = Object.fromEntries(
            Object.entries(data.dependenciesData).filter(
                (entry): entry is [string, Dependency] => entry[1] !== undefined
            )
        )

        return {
            ...data,
            dependenciesData: dependenciesData ? dependenciesData : {}
        }
    }

    async markDownloaded(params: MarkDownloadedParams): Promise<void> {
        return await this.core.request(
            'download',
            {
                file_id: params.fileId
            },
            true
        )
    }

    async uploadPublication(params: UploadPublicationParams): Promise<void> {
        await this.core.request(
            'upload',
            {
                name: params.name,
                description: params.description,
                category_id: params.category,
                license_id: params.license,
                source_url: params.sourceUrl,
                path: params.path || 'Main.lua',
                dependencies: buildDependencies(
                    params.iconUrl,
                    params.previews,
                    params.localizations,
                    params.dependencies
                )
            },
            true
        )
    }

    async updatePublication(params: UpdatePublicationParams): Promise<void> {
        await this.core.request(
            'update',
            {
                file_id: params.fileId,
                whats_new: params.whatsNew,
                name: params.name,
                description: params.description,
                category_id: params.category,
                license_id: params.license,
                source_url: params.sourceUrl,
                path: params.path || 'Main.lua',
                dependencies: buildDependencies(
                    params.iconUrl,
                    params.previews,
                    params.localizations,
                    params.dependencies
                )
            },
            true
        )
    }

    async deletePublication(params: DeletePublicationParams): Promise<void> {
        await this.core.request(
            'delete',
            {
                file_id: params.fileId
            },
            true
        )
    }
}
