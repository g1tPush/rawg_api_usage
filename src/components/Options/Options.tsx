import React from 'react'
import SortForm from './Sort/Sort'
import FiltersForm from './Filters/FiltersForm'


const OptionBar = () => {
    return (
        <div className='flex item-end'>
            <SortForm />
            <FiltersForm />
        </div>
    )
}



export default OptionBar