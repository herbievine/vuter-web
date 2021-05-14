import React from 'react'
import Link from 'next/link'
import { Menu, Transition } from '@headlessui/react'
import { useRouter } from 'next/router'

interface NavigationProps {}

const Navigation: React.FC<NavigationProps> = ({}) => {
  const router = useRouter()
  const categories = [
    'React',
    'Next',
    'Nuxt',
    'Vue',
    'Node',
    'TypeScript',
    'JavaScript',
    'SSR',
    'Server',
    'Strapi',
    'TailwindCSS',
    'GraphQL',
    'Apollo',
  ]

  return (
    <div className="h-12 px-4 flex items-center justify-between sticky top-0 z-50">
      <div className="text-sm uppercase font-bold text-gray-700">
        <Link href={'/'}>Blog</Link>
      </div>
      <div className="flex items-center justify-end">
        <div className="mr-4 flex items-center">
          {[...categories].map((category, index) =>
            index < 6 ? (
              <div
                key={index}
                className={`text-sm uppercase font-bold text-gray-700 ${
                  index !== 5 ? 'mr-6' : null
                }`}
              >
                <Link href={`/search?category=${category.toLowerCase()}`}>
                  {category}
                </Link>
              </div>
            ) : null
          )}
        </div>
        <div className="relative inline-block text-left mr-4">
          <Menu>
            {({ open }) => (
              <>
                <Menu.Button className="inline-flex justify-center w-full px-3 py-1 leading-5 transition duration-150 ease-in-out focus:outline-none">
                  <span className="text-sm uppercase font-bold text-gray-700">
                    More
                  </span>
                  <svg
                    className="w-5 h-5 ml-2 -mr-1 text-gray-700"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Menu.Button>

                <Transition
                  show={open}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items
                    static
                    className="absolute right-0 w-56 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none"
                  >
                    <div className="py-1">
                      {[...categories].map((category, index) =>
                        index > 6 ? (
                          <Menu.Item
                            key={index}
                            onClick={() =>
                              router.push(
                                `/search?category=${category.toLowerCase()}`
                              )
                            }
                          >
                            {({ active }) => (
                              <div
                                className={`${
                                  active
                                    ? 'bg-gray-100 text-gray-900'
                                    : 'text-gray-700'
                                } flex justify-between w-full px-4 py-2 text-sm uppercase font-bold leading-5 text-left cursor-pointer`}
                              >
                                <p>{category}</p>
                              </div>
                            )}
                          </Menu.Item>
                        ) : null
                      )}
                    </div>
                  </Menu.Items>
                </Transition>
              </>
            )}
          </Menu>
        </div>
        <div>
          <input
            className="w-44 py-1 px-3 bg-gray-200 rounded-md text-sm font-medium focus:outline-none"
            type="text"
            placeholder="Search..."
            onChange={(e) =>
              router.replace(`/search?post=${e.target.value.toLowerCase()}`)
            }
          />
        </div>
      </div>
    </div>
  )
}

export default Navigation
