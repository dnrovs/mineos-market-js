import { FileType } from '../../shared/enums.js'

export interface PreviewPublication {
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

export interface Dependency {
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

export interface Publication {
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
