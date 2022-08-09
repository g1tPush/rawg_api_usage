import React from 'react'
import GameCard from './GameCard'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { fetchGames } from '../../features/orginizer/counterSlice'
import { useEffect } from 'react'
import { useRef, useCallback } from 'react'
import { memo } from 'react'

const Games = () => {
    const dispatch = useAppDispatch()
    const gamesState = useAppSelector((state) => state.orginizer)
    const page = gamesState.page
    const orderBy = gamesState.orderBy
    const statePlatform = gamesState.platform
    const searchText = gamesState.searchText

    const observer = useRef<IntersectionObserver | null>(null)

    const lastGameElementRef = useCallback((node: HTMLDivElement) => {
        if (!gamesState.status) return null
        if (observer.current) {
            observer.current.disconnect()
        }
        observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && gamesState.next != null) {
                dispatch(fetchGames({ page, orderBy, statePlatform, searchText }))
            }
        })
        if (node) {
            observer.current.observe(node)
        }
    }, [page, gamesState.status, gamesState.next, dispatch, orderBy, statePlatform, searchText])

    useEffect(() => {
        dispatch(fetchGames({ page, orderBy, statePlatform, searchText }))
    }, [orderBy, statePlatform, searchText])

    return (
        <>
            <div className='grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8'>
                {
                    gamesState.entities.map((game, index) => {
                        if (gamesState.entities.length === index + 1) {
                            return <GameCard ref={lastGameElementRef} key={game.id} {...game} />
                        }
                        return <GameCard ref={null} key={game.id} {...game} />
                    })
                }
            </div>
            <div className='text-center text-3xl font-bold mt-5 mb-5 text-white'>{gamesState.entities && gamesState.status ? 'Nothing Found' : null}</div>

            <div className='text-center text-3xl font-bold mt-5 mb-5 text-white'>{!gamesState.status ? 'Loading...' : null}</div>
        </>
    )
}


export default memo(Games)