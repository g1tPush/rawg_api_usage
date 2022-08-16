export interface Ientities {
    id: number,
    title: string,
    slug: string,
    metacritic: number,
    parentPlatforms: Array<string> | undefined,
    imgSrc: string,
    imgSrcFullSize: string | null,
    rating: number,
    released: string
}

export interface OrginizerState {
    orderBy: string,
    platform: number,
    status: boolean,
    entities: Ientities[],
    next: string | null,
    page: number,
    searchText: string
}

export interface GameApi {
    added: number,
    added_by_status: { yet: number, owned: number, beaten: number, toplay: number, dropped: number },
    background_image: string | null,
    clip: null,
    dominant_color: string,
    esrb_rating: { id: number, name: string, slug: string },
    genres: [],
    id: number,
    metacritic: number,
    name: string,
    parent_platforms: { [key: number]: { id: number, name: string, slug: string, games_count: number } }[],
    platforms: [],
    playtime: number,
    rating: number,
    rating_top: number,
    ratings: [],
    ratings_count: number,
    released: string,
    reviews_count: number,
    reviews_text_count: number,
    saturated_color: string,
    short_screenshots: [],
    slug: string,
    stores: [],
    suggestions_count: number,
    tags: [],
    tba: false,
    updated: string,
    user_game: null
}

export interface IOptions {
    id: number,
    name: string
}