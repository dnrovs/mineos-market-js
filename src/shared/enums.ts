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
    GnuGplv3,
    GnuAgplv3,
    GnuLgplv3,
    ApacheLicense2,
    MozillaPublicLicense2,
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
