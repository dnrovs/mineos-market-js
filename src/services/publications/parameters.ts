import {
    License,
    OrderBy,
    OrderDirection,
    PublicationCategory,
    PublicationLanguage
} from '../../shared'

/**
 * Parameters for retrieving a list of publications with optional filtering and pagination.
 *
 * @category Parameters
 */
export type GetPublicationsParams = {
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
    /** Search publications by publisher's username */
    userName?: string
    /** Filter publications by specific file IDs */
    fileIds?: number[]
}

/**
 * Parameters for retrieving a specific publication by its file ID and optional language.
 *
 * @category Parameters
 */
export type GetPublicationParams = {
    /** Publication's file ID */
    fileId: number
    /**
     * Publication's translation language
     * @default PublicationLanguage.English
     * */
    language?: PublicationLanguage
}

/**
 * Parameters for marking a specific file as downloaded in the system.
 *
 * @category Parameters
 */
export type MarkDownloadedParams = {
    /** ID of the file to mark as downloaded */
    fileId: number
}

/**
 * A dependency on an existing publication.
 *
 * @example
 * { publicationName: "GUI" }
 *
 * @category Parameters
 */
export type PublicationDependency = {
    /** Name of the referenced publication */
    publicationName: string
    sourceUrl?: never
    path?: never
}

/**
 * A dependency on a file from a source URL.
 *
 * @see {@link UploadPublicationParams.iconUrl} if you want to set an icon
 * @see {@link UploadPublicationParams.previews} if you want to include preview images
 * @see {@link UploadPublicationParams.localizations} if you want to add localization files
 *
 * @category Parameters
 */
export type FileDependency = {
    publicationName?: never
    /** URL to the raw file */
    sourceUrl: string
    /**
     * Destination path within the package.
     *
     * - `Assets/Biden.pic`: Relative path, a file will be located in `<root>/Applications/<Your Application>/Assets`
     * - `/Libraries/Utils.lua`: Absolute path, a file will be located in `<root>/Libraries`
     *
     * @remarks Using relative paths for libraries/scripts will fail the installation.
     */
    path: `${string}.${string}` | 'Main.lua'
}

/**
 * Parameters for uploading a new publication.
 *
 * @category Parameters
 */
export type UploadPublicationParams = {
    /** Name of the publication */
    name: string
    /** Description of the publication */
    description: string
    /**
     * URL to the icon file (.pic format required)
     *
     * @remarks Only applicable for applications and wallpapers.
     * Including this for libraries/scripts causes installation failures due to incorrect package structure.
     */
    iconUrl?: `${string}/${string}.pic`
    /** URLs to preview images  */
    previews?: `${string}/${string}.pic`[]
    /** Category of the publication */
    category: PublicationCategory
    /** License identifier */
    license: License
    /** URL to the raw Lua source code */
    sourceUrl: string
    /**
     * Destination path for the main source file, including the filename
     *
     * - Applications or wallpapers: Always `Main.lua` in the package directory
     * - Libraries: Relative path in the `<root>/Libraries` folder
     * - Scripts: Absolute path from the root
     *
     * @default Main.lua
     */
    path?: `${string}.lua`
    /**
     * URLs to localization files
     *
     * Files will be placed in the `Localizations/` folder automatically.
     *
     * @remarks Only applicable for applications and wallpapers.
     * Including this for libraries/scripts causes installation failures due to incorrect package structure.
     */
    localizations?: `${string}/${string}.lang`[]
    /** Additional dependencies required by this publication */
    dependencies?: (PublicationDependency | FileDependency)[]
}

/**
 * Parameters for updating an existing publication's metadata and properties.
 *
 * @category Parameters
 */
export type UpdatePublicationParams = {
    /** ID of the publication to update */
    fileId: number
    /** Description of recent changes (e.g., changelog) */
    whatsNew?: string
} & UploadPublicationParams

/**
 * Parameters for deleting a specific publication by its file ID.
 *
 * @category Parameters
 */
export type DeletePublicationParams = {
    /** ID of the publication to delete */
    fileId: number
}
