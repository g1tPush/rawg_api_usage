import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { API_KEY } from '../../utils/const'
import { GameApi, OrginizerState } from '../../types/types'

export const fetchGames = createAsyncThunk('organizer/fetchGames', async (props: { page: number, orderBy: string, statePlatform: number | null, searchText: string }) => {
    const { page, orderBy, statePlatform, searchText } = props
    let order
    let parentPlatforms
    let searchParameter
    let query

    if (orderBy !== 'default') {
        order = `&ordering=-${orderBy.toLowerCase()}`
    }
    else {
        order = ''
    }

    if (statePlatform) {
        parentPlatforms = `&parent_platforms=${statePlatform}`
    }
    else {
        parentPlatforms = ``
    }

    if (searchText) {
        searchParameter = `&search=${searchText}&search_precise=true`
    } else {
        searchParameter = ''
    }

    query = `https://api.rawg.io/api/games?key=${API_KEY}&page=${page}${order}${parentPlatforms}${searchParameter}`

    const response = await fetch(query)
        .then((res) => {
            return res.json()
        })
        .then((res) => {
            return res
        })

    return response
})

const parseImgSrc = (imgSrc: string | null) => {
    if (imgSrc) {
        let cropSize
        if (imgSrc.includes('screenshots')) {
            cropSize = `https://media.rawg.io/media/crop/600/400/screenshots/`
        }
        else {
            cropSize = `https://media.rawg.io/media/crop/600/400/games/`
        }
        const endSrc = imgSrc.slice(cropSize.length - 'crop/600/400/'.length)
        const cropImgSrc = cropSize + endSrc

        return cropImgSrc
    }

    return 'https://images.wallpaperscraft.ru/image/single/seryj_tsvet_fon_145047_300x168.jpg'
}

const parse = (res: GameApi) => {
    const parent_platforms = res.parent_platforms ? res.parent_platforms.map((el: { [platform: string]: { id: number, name: string, slug: string } }) => el.platform.name) : undefined 

    return {
        id: res.id,
        title: res.name,
        slug: res.slug,
        metacritic: res.metacritic,
        rating: res.rating,
        parentPlatforms: parent_platforms,
        imgSrc: parseImgSrc(res.background_image),
        imgSrcFullSize: res.background_image,
        released: res.released
    }
}

const initialState: OrginizerState = {
    orderBy: 'default',
    platform: null,
    status: false,
    entities: [],
    next: null,
    page: 1,
    searchText: ''
}

const orginizerSlice = createSlice({
    name: 'organizer',
    initialState,
    reducers: {
        order(state, action: PayloadAction<string>) {
            state.orderBy = action.payload
            state.status = false
            state.entities = []
            state.next = null
            state.page = 1
        },
        platform(state, action: PayloadAction<number>) {
            state.platform = action.payload
            state.status = false
            state.entities = []
            state.next = null
            state.page = 1
        },
        search(state, action: PayloadAction<string>) {
            state.searchText = action.payload
            state.status = false
            state.entities = []
            state.next = null
            state.page = 1
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchGames.pending, (state, action) => {
                state.status = false
            })
            .addCase(fetchGames.fulfilled, (state, action) => {
                action.payload.results.forEach((game: GameApi) => {
                    return state.entities.push(parse(game))
                })
                state.status = true
                state.next = action.payload.next
                state.page += 1
            })
    }
})

export const { order, platform, search } = orginizerSlice.actions
export default orginizerSlice.reducer