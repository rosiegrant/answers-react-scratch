/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { CreditCardIcon, OfficeBuildingIcon, UserIcon, UsersIcon } from '@heroicons/react/solid'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";



// < Link to = "/professionals" > Professionals</Link> | { " "}
//     < Link to = "/" > Home</Link >

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


export interface NavigationProps {
    tabs: {
        name: string,
        href: string,
        icon: string,
        current: boolean
    }[]
}
export default function Navigation(props: NavigationProps) {
    return (
        <div>
            <div className="sm:hidden">
                <label htmlFor="tabs" className="sr-only">
                    Select a tab
                </label>
                {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
                <select
                    id="tabs"
                    name="tabs"
                    className="block w-full focus:ring-neutral-800 focus:border-neutral-800 border-gray-300 rounded-md"
                    defaultValue={props.tabs.find((tab) => tab.current).name}
                >
                    {props.tabs.map((tab) => (
                        <Link to={tab.href}>{tab.name}</Link>
                    ))}
                </select>
            </div>
            <div className="hidden sm:block">
                <div className="border-b border-gray-200">
                    <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                        {props.tabs.map((tab) => (
                            <a
                                key={tab.name}
                                href={tab.href}
                                className={classNames(
                                    tab.current
                                        ? 'border-primary-600 text-primary-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                                    'group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm'
                                )}
                                aria-current={tab.current ? 'page' : undefined}
                            >
                                <tab.icon
                                    className={classNames(
                                        tab.current ? 'text-primary-600' : 'text-gray-400 group-hover:text-gray-500',
                                        '-ml-0.5 mr-2 h-5 w-5'
                                    )}
                                    aria-hidden="true"
                                />
                                <span>{tab.name}</span>
                            </a>
                        ))}
                    </nav>
                </div>
            </div>
        </div>
    )
}

