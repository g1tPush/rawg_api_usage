import { useState } from 'react'
import { platform } from '../../../features/orginizer/counterSlice'
import { useAppDispatch } from '../../../app/hooks'
import OptionTemplate from '../OptionTemplate'
import { IOptions } from '../../../types/types'

const date = [
    { id: 0, name: 'All' },
    { id: 1, name: 'PC' },
    { id: 2, name: 'PlayStation' },
    { id: 7, name: 'Nintendo' },
    { id: 8, name: 'Android' },
    { id: 4, name: 'iOS' },
    { id: 3, name: 'Xbox' },
    { id: 6, name: 'Linux' },
    { id: 5, name: 'Apple Macintosh' }
]

const FiltersForm = () => {
    const [selected, setSelected] = useState(date[0])
    const dispatch = useAppDispatch()
    const text = 'Choose Platform'

    const clickHandler = (e: IOptions) => {
        if (selected.id !== e.id) {
            setSelected(e)
            dispatch(platform(e.id))
        }
    }

    return (
        <div className='w-40 mr-10'>
            <OptionTemplate text={text} selected={selected} clickHandler={clickHandler} date={date} />
        </div>
    )
}

export default FiltersForm