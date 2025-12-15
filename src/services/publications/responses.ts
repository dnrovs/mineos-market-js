import { z } from 'zod'
import { FileType, License, PublicationCategory } from '../../shared'

/**
 * Preview information for a publication including basic metadata and statistics
 *
 * @category Responses
 */
export type PreviewPublication = {
    /** Publication's unique file identifier */
    fileId: number
    /** Name of the publication */
    publicationName: string
    /** Username of the publication's author */
    userName: string
    /** Current version number of the publication */
    version: number
    /** Category identifier of the publication */
    categoryId: PublicationCategory
    /** Total number of reviews for this publication */
    reviewsCount: number
    /** Total number of downloads */
    downloads: number
    /** URL to the publication's icon image */
    iconUrl?: string
    /** Average rating score from reviews */
    averageRating?: number
    /** Popularity score of the publication */
    popularity?: number
}

export const PreviewPublicationSchema: z.ZodType<PreviewPublication> = z.object(
    {
        fileId: z.number(),
        publicationName: z.string(),
        userName: z.string(),
        version: z.number(),
        categoryId: z.enum(PublicationCategory),
        reviewsCount: z.number(),
        downloads: z.number(),
        iconUrl: z.string().optional(),
        averageRating: z.number().optional(),
        popularity: z.number().optional()
    }
)

/**
 * Dependency information containing source location and version details
 *
 * @category Responses
 */
export type Dependency = {
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
    categoryId?: PublicationCategory
}

export const DependencySchema: z.ZodType<Dependency> = z.object({
    sourceUrl: z.string(),
    path: z.string(),
    version: z.number(),
    typeId: z.enum(FileType),
    publicationName: z.string().optional(),
    categoryId: z.enum(PublicationCategory).optional()
})

/**
 * Complete publication details including metadata, dependencies, and statistics
 *
 * @category Responses
 */
export type Publication = {
    /** Publication's unique file identifier */
    fileId: number
    /** Name of the publication */
    publicationName: string
    /** Username of the publication's author */
    userName: string
    /** Current version number of the publication */
    version: number
    /** Category identifier of the publication */
    categoryId: PublicationCategory
    /** URL to the source code repository */
    sourceUrl: string
    /** Path to the main file or entry point */
    path: string
    /** License identifier associated with the publication */
    licenseId: License
    /** Publication creation timestamp */
    timestamp: number
    /** Original description text */
    initialDescription: string
    /** Translated description text */
    translatedDescription: string
    /** Map of dependency data indexed by dependency ID */
    dependenciesData?: Record<string, Dependency>
    /** List of direct dependency file IDs */
    dependencies?: number[]
    /** List of all dependency file IDs (including transitive) */
    allDependencies?: number[]
    /** URL to the publication's icon image */
    iconUrl?: string
    /** Average rating score from reviews */
    averageRating?: number
    /** Description of recent changes */
    whatsNew?: string
    /** Version number when whatsNew was last updated */
    whatsNewVersion?: number
    /** Total number of downloads */
    downloads: number
}

export const PublicationSchema /*: z.ZodType<Publication>*/ = z.object({
    fileId: z.number(),
    publicationName: z.string(),
    userName: z.string(),
    version: z.number(),
    categoryId: z.enum(PublicationCategory),
    sourceUrl: z.string(),
    path: z.string(),
    licenseId: z.enum(License),
    timestamp: z.number(),
    initialDescription: z.string(),
    translatedDescription: z.string(),
    dependenciesData: z.array(z.union([DependencySchema, z.undefined()])),
    dependencies: z.array(z.number()).optional(),
    allDependencies: z.array(z.number()).optional(),
    iconUrl: z.string().optional(),
    averageRating: z.number().optional(),
    whatsNew: z.string().optional(),
    whatsNewVersion: z.number().optional(),
    downloads: z.number()
})
