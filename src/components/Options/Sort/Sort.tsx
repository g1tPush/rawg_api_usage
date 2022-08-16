import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { order } from '../../../features/orginizer/counterSlice'
import OptionTemplate from '../OptionTemplate'
import { IOptions } from '../../../types/types'

const date = [
    { id: 1, name: 'Default' },
    { id: 2, name: 'Rating' },
    { id: 3, name: 'Released' },
]

const SortForm = () => {
    const platformName = useAppSelector((state) => state.orginizer.orderBy)
    const selected = date.filter((el) => el.name.toLowerCase() === platformName.toLowerCase())[0]
    const dispatch = useAppDispatch()
    const text = 'Order By'

    const clickHandler = (e: IOptions) => {
        if (selected.id !== e.id) {
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