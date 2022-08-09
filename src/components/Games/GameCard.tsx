import React, { forwardRef } from 'react'
import { FaWindows, FaPlaystation, FaXbox } from 'react-icons/fa'
import { SiNintendoswitch } from 'react-icons/si'
import { AiFillApple, AiFillAndroid } from 'react-icons/ai'
import { DiLinux } from 'react-icons/di'
import { RiMacLine } from 'react-icons/ri'
import { Ientities } from '../../types/types'
import { LazyLoadImage } from 'react-lazy-load-image-component'

const GameCard = forwardRef<HTMLDivElement, Ientities>(({ id, slug, metacritic, parentPlatforms, imgSrc, title, rating, released }, ref) => {
    return (
        <article ref={ref} className='hover:scale-105 transition duration-300'>
            <div className='w-full min-h-150'>
                <LazyLoadImage src={imgSrc} alt='img' className='rounded-t-lg w-full' />
            </div>
            <div className='p-3 pb-6 bg-zinc-800 rounded-b-lg text-white'>
                <h3 className='text-xl font-bold cursor-pointer'>
                    {title}
                </h3>
                <p className='mt-3 mb-3 font-bold'>
                    Rating: {rating}/5.0
                </p>
                <p className='mt-3 mb-3 font-bold'>
                    Released: {released}
                </p>
                {<div className='flex gap-10s gap-2.5'>
                    {parentPlatforms ? parentPlatforms.map((platform: string) => {
                        return (
                            platform === 'PC' ? <FaWindows key={platform} /> : null ||
                                platform === 'PlayStation' ? <FaPlaystation key={platform} /> : null ||
                                    platform === 'Xbox' ? <FaXbox key={platform} /> : null ||
                                        platform === 'Nintendo' ? <SiNintendoswitch key={platform} /> : null ||
                                            platform === 'iOS' ? <AiFillApple key={platform} /> : null ||
                                                platform === 'Android' ? <AiFillAndroid key={platform} /> : null ||
                                                    platform === 'Apple Macintosh' ? <RiMacLine key={platform} /> : null ||
                                                        platform === 'Linux' ? <DiLinux key={platform} /> : null
                        )
                    }) : ''}
                </div>}
            </div>
        </article>
    )
})

export default GameCard