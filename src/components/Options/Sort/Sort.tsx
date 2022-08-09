import { useState } from 'react'
import { useAppDispatch } from '../../../app/hooks'
import { order } from '../../../features/orginizer/counterSlice'
import OptionTemplate from '../OptionTemplate'
import { IOptions } from '../../../types/types'

const date = [
    { id: 1, name: 'Default' },
    { id: 2, name: 'Rating' },
    { id: 3, name: 'Released' },
]

const SortForm = () => {
    const [selected, setSelected] = useState(date[0])
    const dispatch = useAppDispatch()
    const text = 'Order By'

    const clickHandler = (e: IOptions) => {
        if (selected.id !== e.id) {
            setSelected(e)
            dispatch(order(e.name))
        }
    }

    return (
        <div className='w-36 mr-10'>
            <OptionTemplate text={text} selected={selected} clickHandler={clickHandler} date={date} />
        </div>
    )
}

export default SortForm