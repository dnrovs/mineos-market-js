export enum PublicationCategory {
    Applications = 1,
    Libraries,
    Scripts,
    Wallpapers
}

export enum PublicationLanguage {
    English = 18,
    Russian = 71
}

export enum FileType {
    Main = 1,
    Resource,
    Icon,
    Localization,
    Preview
}

export enum License {
    MIT = 1,
    GPL3,
    AGPL3,
    LGPL3,
    ApacheLicense2,
    MPL2,
    TheUnlicense
}

export enum OrderBy {
    Popularity = 'popularity',
    Rating = 'rating',
    Name = 'name',
    Date = 'date'
}

export enum OrderDirection {
    Ascending = 'asc',
    Descending = 'desc'
}

export enum VerificationStatus {
    Unverified,
    Verified
}

export enum MessageStatus {
    Unread,
    Read
}
