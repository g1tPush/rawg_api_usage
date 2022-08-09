import { Fragment, useEffect } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import { IOptions } from '../../types/types'

const classNames = (...classes: string[]) => {
    return classes.filter(Boolean).join(' ')
}

const OptionTemplate = (props: {selected: IOptions, date: IOptions[], clickHandler: (e: IOptions) => void}) => {
    const {selected, clickHandler, date} = props
    
    return (
        <Listbox value={selected} onChange={clickHandler}>
            {({ open }) => (
                <>
                    <Listbox.Label className="block text-sm font-medium text-white">Chose Platform</Listbox.Label>
                    <div className="mt-1 relative">
                        <Listbox.Button className="bg-zinc-800 relative w-full rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-zing-900 focus:border-zing-900 sm:text-sm">
                            <span className="block truncate text-white">{selected.name}</span>
                            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                <SelectorIcon className="h-5 w-5 text-white" aria-hidden="true" />
                            </span>
                        </Listbox.Button>

                        <Transition
                            show={open}
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Listbox.Options className="absolute z-10 mt-1 w-full bg-zinc-800 shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                {date.map((item) => (
                                    <Listbox.Option
                                        key={item.id}
                                        className={({ active }) =>
                                            classNames(
                                                active ? 'text-white bg-indigo-600' : 'text-white',
                                                'cursor-default select-none relative py-2 pl-3 pr-9'
                                            )
                                        }
                                        value={item}
                                    >
                                        {({ selected, active }) => (
                                            <>
                                                <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                                    {item.name}
                                                </span>

                                                {selected ? (
                                                    <span
                                                        className={classNames(
                                                            active ? 'text-white' : 'text-white',
                                                            'absolute inset-y-0 right-0 flex items-center pr-4'
                                                        )}
                                                    >
                                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                    </span>
                                                ) : null}
                                            </>
                                        )}
                                    </Listbox.Option>
                                ))}
                            </Listbox.Options>
                        </Transition>
                    </div>
                </>
            )}
        </Listbox>
    )
}


export default OptionTemplate