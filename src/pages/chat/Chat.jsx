import React from 'react'
import { Link } from 'react-router-dom'

function Chat() {
  return (
    <div className="relative flex w-full h-screen overflow-hidden antialiased bg-gray-200">
      <div className="relative flex flex-col hidden h-full bg-white border-r border-gray-300 shadow-xl md:block transform transition-all duration-500 ease-in-out" style={{ width: '24rem' }}>
        <div className="flex justify-between px-3 pt-1 text-white">
          <div className="flex items-center w-full py-2">
            <button aria-haspopup="true" className="p-2 text-gray-700 rounded-full focus:outline-none hover:text-gray-600 hover:bg-gray-200">
              {/* <svg className="w-6 h-6 text-gray-600 fill-current" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path fillRule="nonzero" d="M4,16 L20,16 C20.5522847,16 21,16.4477153 21,17 C21,17.5128358 20.6139598,17.9355072 20.1166211,17.9932723 L20,18 L4,18 C3.44771525,18 3,17.5522847 3,17 C3,16.4871642 3.38604019,16.0644928 3.88337887,16.0067277 L4,16 L20,16 L4,16 Z M4,11 L20,11 C20.5522847,11 21,11.4477153 21,12 C21,12.5128358 20.6139598,12.9355072 20.1166211,12.9932723 L20,13 L4,13 C3.44771525,13 3,12.5522847 3,12 C3,11.4871642 3.38604019,11.0644928 3.88337887,11.0067277 L4,11 Z M4,6 L20,6 C20.5522847,6 21,6.44771525 21,7 C21,7.51283584 20.6139598,7.93550716 20.1166211,7.99327227 L20,8 L4,8 C3.44771525,8 3,7.55228475 3,7 C3,6.48716416 3.38604019,6.06449284 3.88337887,6.00672773 L4,6 Z"/>
              </svg> */}
              <Link to={"/"}>
                <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5"/>
                </svg>
              </Link>

            </button>
            <div className="relative flex items-center w-full pl-2 overflow-hidden text-gray-600 focus-within:text-gray-400">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4">
                <button type="submit" className="p-1 focus:outline-none focus:shadow-none">
                  <svg className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path fillRule="nonzero" d="M9.5,3 C13.0898509,3 16,5.91014913 16,9.5 C16,10.9337106 15.5358211,12.2590065 14.7495478,13.3338028 L19.7071068,18.2928932 C20.0976311,18.6834175 20.0976311,19.3165825 19.7071068,19.7071068 C19.3466228,20.0675907 18.7793918,20.0953203 18.3871006,19.7902954 L18.2928932,19.7071068 L13.3338028,14.7495478 C12.2590065,15.5358211 10.9337106,16 9.5,16 C5.91014913,16 3,13.0898509 3,9.5 C3,5.91014913 5.91014913,3 9.5,3 Z M9.5,5 C7.01471863,5 5,7.01471863 5,9.5 C5,11.9852814 7.01471863,14 9.5,14 C11.9852814,14 14,11.9852814 14,9.5 C14,7.01471863 11.9852814,5 9.5,5 Z"/>
                  </svg>
                </button>
              </span>
              <input type="search" name="q"
                     className="w-full py-2 pl-12 text-sm text-white bg-gray-200 border border-transparent appearance-none rounded-tg focus:bg-white focus:outline-none focus:border-blue-500 focus:text-gray-900 focus:shadow-outline-blue" style={{ borderRadius: '25px' }}
                     placeholder="Search..." autoComplete="off" />
            </div>
          </div>
        </div>
        <div className="border-b shadow-b">
          <ul className="flex flex-row items-center inline-block px-2 list-none select-none">
            <li className="flex-auto px-1 mx-1 -mb-px text-center rounded-t-lg cursor-pointer last:mr-0 hover:bg-gray-200">
              <a className="flex items-center justify-center block py-2 text-xs font-semibold leading-normal tracking-wide border-b-2 border-blue-500">
                All
              </a>
            </li>
            <li className="flex-auto px-1 mx-1 -mb-px text-center rounded-t-lg cursor-pointer last:mr-0 hover:bg-gray-200">
              <a className="flex items-center justify-center block py-2 text-xs font-semibold leading-normal tracking-wide border-b-2 border-transparent">
                Work
              </a>
            </li>
            <li className="flex-auto px-1 mx-1 -mb-px text-center rounded-t-lg cursor-pointer last:mr-0 hover:bg-gray-200">
              <a className="flex items-center justify-center block py-2 text-xs font-semibold leading-normal tracking-wide border-b-2 border-transparent">
                Private
                <span className="flex items-center justify-center w-5 h-5 ml-1 text-xs text-white bg-blue-500 rounded-full">2</span>
              </a>
            </li>
            <li className="flex-auto px-1 mx-1 -mb-px text-center rounded-t-lg cursor-pointer last:mr-0 hover:bg-gray-200">
              <a className="flex items-center justify-center block py-2 text-xs font-semibold leading-normal tracking-wide border-b-2 border-transparent">
                Groups
              </a>
            </li>
            <li className="flex-auto px-1 mx-1 -mb-px text-center rounded-t-lg cursor-pointer last:mr-0 hover:bg-gray-200">
              <a className="flex items-center justify-center block py-2 text-xs font-semibold leading-normal tracking-wide border-b-2 border-transparent">
                Channels
              </a>
            </li>
          </ul>
        </div>
        <div className="relative mt-2 mb-4 overflow-x-hidden overflow-y-auto scrolling-touch lg:max-h-sm scrollbar-w-2 scrollbar-track-gray-lighter scrollbar-thumb-rounded scrollbar-thumb-gray">
          <ul className="flex flex-col inline-block w-full h-screen px-2 select-none">
            <li className="flex flex-no-wrap items-center pr-3 text-black rounded-lg cursor-pointer mt-200 py-65 hover:bg-gray-200" style={{ paddingTop: '0.65rem', paddingBottom: '0.65rem' }}>
              <div className="flex justify-between w-full focus:outline-none">
                <div className="flex justify-between w-full">
                  <div className="relative flex items-center justify-center w-12 h-12 ml-2 mr-3 text-xl font-semibold text-white bg-blue-500 rounded-full flex-no-shrink">
                    <img className="object-cover w-12 h-12 rounded-full" src="https://images.unsplash.com/photo-1433588616917-dcbcc63429f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=" alt=""/>
                    <div className="absolute bottom-0 right-0 flex items-center justify-center bg-white rounded-full" style={{ width: '0.80rem', height: '0.80rem' }}>
                      <div className="bg-green-500 rounded-full" style={{ width: '0.6rem', height: '0.6rem' }}></div>
                    </div>
                  </div>
                  <div className="items-center flex-1 min-w-0">
                    <div className="flex justify-between mb-1">
                      <h2 className="text-sm font-semibold text-black">Lauri Edmon</h2>
                      <div className="flex">
                        <svg className="w-4 h-4 text-green-500 fill-current" xmlns="http://www.w3.org/2000/svg" width="19" height="14" viewBox="0 0 19 14">
                          <path fillRule="nonzero" d="M4.96833846,10.0490996 L11.5108251,2.571972 C11.7472185,2.30180819 12.1578642,2.27443181 12.428028,2.51082515 C12.6711754,2.72357915 12.717665,3.07747757 12.5522007,3.34307913 L12.4891749,3.428028 L5.48917485,11.428028 C5.2663359,11.6827011 4.89144111,11.7199091 4.62486888,11.5309823 L4.54038059,11.4596194 L1.54038059,8.45961941 C1.2865398,8.20577862 1.2865398,7.79422138 1.54038059,7.54038059 C1.7688373,7.31192388 2.12504434,7.28907821 2.37905111,7.47184358 L2.45961941,7.54038059 L4.96833846,10.0490996 L11.5108251,2.571972 L4.96833846,10.0490996 Z M9.96833846,10.0490996 L16.5108251,2.571972 C16.7472185,2.30180819 17.1578642,2.27443181 17.428028,2.51082515 C17.6711754,2.72357915 17.717665,3.07747757 17.5522007,3.34307913 L17.4891749,3.428028 L10.4891749,11.428028 C10.2663359,11.6827011 9.89144111,11.7199091 9.62486888,11.5309823 L9.54038059,11.4596194 L8.54038059,10.4596194 C8.2865398,10.2057786 8.2865398,9.79422138 8.54038059,9.54038059 C8.7688373,9.31192388 9.12504434,9.28907821 9.37905111,9.47184358 L9.45961941,9.54038059 L9.96833846,10.0490996 L16.5108251,2.571972 L9.96833846,10.0490996 Z"/>
                        </svg>
                        <svg className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" width="19" height="14" viewBox="0 0 19 14" style={{ color: 'transparent' }}>
                          <path fillRule="nonzero" d="M7.96833846,10.0490996 L14.5108251,2.571972 C14.7472185,2.30180819 15.1578642,2.27443181 15.428028,2.51082515 C15.6711754,2.72357915 15.717665,3.07747757 15.5522007,3.34307913 L15.4891749,3.428028 L8.48917485,11.428028 C8.2663359,11.6827011 7.89144111,11.7199091 7.62486888,11.5309823 L7.54038059,11.4596194 L4.54038059,8.45961941 C4.2865398,8.20577862 4.2865398,7.79422138 4.54038059,7.54038059 C4.7688373,7.31192388 5.12504434,7.28907821 5.37905111,7.47184358 L5.45961941,7.54038059 L7.96833846,10.0490996 L14.5108251,2.571972 L7.96833846,10.0490996 Z"/>
                        </svg>
                        <span className="ml-1 text-xs font-medium text-gray-600">12.52</span>
                      </div>
                    </div>
                    <div className="flex justify-between text-sm leading-none truncate">
                      <span>Writing...</span>
                      <span className="flex items-center justify-center w-5 h-5 text-xs text-right text-white bg-green-500 rounded-full">2</span>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li className="flex flex-no-wrap items-center pr-3 text-black rounded-lg cursor-pointer mt-200 py-65 hover:bg-gray-200" style={{ paddingTop: '0.65rem', paddingBottom: '0.65rem' }}>
              <div className="flex justify-between w-full focus:outline-none">
                <div className="flex justify-between w-full">
                  <div className="relative flex items-center justify-center w-12 h-12 ml-2 mr-3 text-xl font-semibold text-white bg-blue-500 rounded-full flex-no-shrink">
                    <img className="object-cover w-12 h-12 rounded-full" src="https://images.unsplash.com/photo-1589349133269-183a6c90fbfc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=100" alt=""/>
                    <div className="absolute bottom-0 right-0 flex items-center justify-center bg-white rounded-full" style={{ width: '0.80rem', height: '0.80rem' }}>
                      <div className="bg-green-500 rounded-full" style={{ width: '0.6rem', height: '0.6rem' }}></div>
                    </div>
                  </div>
                  <div className="items-center flex-1 min-w-0">
                    <div className="flex justify-between mb-1">
                      <h2 className="text-sm font-semibold text-black">Julian Gruber</h2>
                      <div className="flex">
                        <svg className="w-4 h-4 text-green-500 fill-current" xmlns="http://www.w3.org/2000/svg" width="19" height="14" viewBox="0 0 19 14">
                          <path fillRule="nonzero" d="M4.96833846,10.0490996 L11.5108251,2.571972 C11.7472185,2.30180819 12.1578642,2.27443181 12.428028,2.51082515 C12.6711754,2.72357915 12.717665,3.07747757 12.5522007,3.34307913 L12.4891749,3.428028 L5.48917485,11.428028 C5.2663359,11.6827011 4.89144111,11.7199091 4.62486888,11.5309823 L4.54038059,11.4596194 L1.54038059,8.45961941 C1.2865398,8.20577862 1.2865398,7.79422138 1.54038059,7.54038059 C1.7688373,7.31192388 2.12504434,7.28907821 2.37905111,7.47184358 L2.45961941,7.54038059 L4.96833846,10.0490996 L11.5108251,2.571972 L4.96833846,10.0490996 Z M9.96833846,10.0490996 L16.5108251,2.571972 C16.7472185,2.30180819 17.1578642,2.27443181 17.428028,2.51082515 C17.6711754,2.72357915 17.717665,3.07747757 17.5522007,3.34307913 L17.4891749,3.428028 L10.4891749,11.428028 C10.2663359,11.6827011 9.89144111,11.7199091 9.62486888,11.5309823 L9.54038059,11.4596194 L8.54038059,10.4596194 C8.2865398,10.2057786 8.2865398,9.79422138 8.54038059,9.54038059 C8.7688373,9.31192388 9.12504434,9.28907821 9.37905111,9.47184358 L9.45961941,9.54038059 L9.96833846,10.0490996 L16.5108251,2.571972 L9.96833846,10.0490996 Z"/>
                        </svg>
                        <svg className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" width="19" height="14" viewBox="0 0 19 14" style={{ color: 'transparent' }}>
                          <path fillRule="nonzero" d="M7.96833846,10.0490996 L14.5108251,2.571972 C14.7472185,2.30180819 15.1578642,2.27443181 15.428028,2.51082515 C15.6711754,2.72357915 15.717665,3.07747757 15.5522007,3.34307913 L15.4891749,3.428028 L8.48917485,11.428028 C8.2663359,11.6827011 7.89144111,11.7199091 7.62486888,11.5309823 L7.54038059,11.4596194 L4.54038059,8.45961941 C4.2865398,8.20577862 4.2865398,7.79422138 4.54038059,7.54038059 C4.7688373,7.31192388 5.12504434,7.28907821 5.37905111,7.47184358 L5.45961941,7.54038059 L7.96833846,10.0490996 L14.5108251,2.571972 L7.96833846,10.0490996 Z"/>
                        </svg>
                        <span className="ml-1 text-xs font-medium text-gray-600">20.25</span>
                      </div>
                    </div>
                    <div className="flex justify-between text-sm leading-none truncate">
                      <span>Send audio...</span>
                      <span className="flex items-center justify-center w-5 h-5 text-xs text-right text-white bg-green-500 rounded-full">2</span>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div className="fixed absolute bottom-0 right-0 z-40 mb-6 mr-4">
          <button className="flex items-center justify-center w-12 h-12 mr-3 text-xl font-semibold text-white bg-blue-500 rounded-full focus:outline-none flex-no-shrink">
            <svg className="w-6 h-6 text-white fill-current" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path fillRule="nonzero" d="M3,17.46 L3,20.5 C3,20.78 3.22,21 3.5,21 L6.54,21 C6.67,21 6.8,20.95 6.89,20.85 L17.4562847,10.2933914 C17.6300744,10.1200486 17.6494989,9.85064903 17.514594,9.65572084 L17.4564466,9.58644661 L17.4564466,9.58644661 L14.4135534,6.54355339 C14.2182912,6.34829124 13.9017088,6.34829124 13.7064466,6.54355339 L3.15,17.1 C3.05,17.2 3,17.32 3,17.46 Z M20.71,7.04 C21.1,6.65 21.1,6.02 20.71,5.63 L18.37,3.29 C17.98,2.9 17.35,2.9 16.96,3.29 L15.4835534,4.76644661 C15.2882912,4.96170876 15.2882912,5.27829124 15.4835534,5.47355339 L18.5264466,8.51644661 C18.7217088,8.71170876 19.0382912,8.71170876 19.2335534,8.51644661 L20.71,7.04 Z"/>
            </svg>
          </button>
        </div>
      </div>

      {/* center */}
      <div className="relative flex flex-col flex-1">
        <div className="z-20 flex flex-grow-0 flex-shrink-0 w-full pr-3 bg-white border-b">
          <div className="w-12 h-12 mx-4 my-2 bg-blue-500 bg-center bg-no-repeat bg-cover rounded-full cursor-pointer"
            style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=200&q=50)' }}>
          </div>
          <div className="flex flex-col justify-center flex-1 overflow-hidden cursor-pointer">
            <div className="overflow-hidden text-base font-medium leading-tight text-gray-600 whitespace-no-wrap">Karen</div>
            <div className="overflow-hidden text-sm font-medium leading-tight text-gray-600 whitespace-no-wrap">Online</div>
          </div>
          <div className="relative hidden w-48 pl-2 my-3 border-l-2 border-blue-500 cursor-pointer lg:block">
            <div className="text-base font-medium text-blue-500">Pinned message</div>
            <div className="text-sm font-normal text-gray-800">Today star contest</div>
          </div>
          <button className="flex self-center p-2 ml-2 text-gray-500 rounded-full focus:outline-none hover:text-gray-600 hover:bg-gray-300">
            <svg className="w-6 h-6 text-gray-600 fill-current" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path fillRule="nonzero" d="M11,20 L13,20 C13.5522847,20 14,20.4477153 14,21 C14,21.5128358 13.6139598,21.9355072 13.1166211,21.9932723 L13,22 L11,22 C10.4477153,22 10,21.5522847 10,21 C10,20.4871642 10.3860402,20.0644928 10.8833789,20.0067277 L11,20 L13,20 L11,20 Z M3.30352462,2.28241931 C3.6693482,1.92735525 4.23692991,1.908094 4.62462533,2.21893936 L4.71758069,2.30352462 L21.2175807,19.3035246 C21.6022334,19.6998335 21.5927842,20.332928 21.1964754,20.7175807 C20.8306518,21.0726447 20.2630701,21.091906 19.8753747,20.7810606 L19.7824193,20.6964754 L18.127874,18.9919007 L18,18.9999993 L4,18.9999993 C3.23933773,18.9999993 2.77101468,18.1926118 3.11084891,17.5416503 L3.16794971,17.4452998 L5,14.6972244 L5,8.9999993 C5,7.98873702 5.21529462,7.00715088 5.62359521,6.10821117 L3.28241931,3.69647538 C2.89776658,3.3001665 2.90721575,2.66707204 3.30352462,2.28241931 Z M7.00817933,8.71121787 L7,9 L7,14.6972244 C7,15.0356672 6.91413188,15.3676193 6.75167088,15.6624466 L6.66410059,15.8066248 L5.86851709,17 L16.1953186,17 L7.16961011,7.7028948 C7.08210009,8.02986218 7.02771758,8.36725335 7.00817933,8.71121787 Z M12,2 C15.7854517,2 18.8690987,5.00478338 18.995941,8.75935025 L19,9 L19,12 C19,12.5522847 18.5522847,13 18,13 C17.4871642,13 17.0644928,12.6139598 17.0067277,12.1166211 L17,12 L17,9 C17,6.23857625 14.7614237,4 12,4 C11.3902636,4 10.7970241,4.10872043 10.239851,4.31831953 C9.72293204,4.51277572 9.14624852,4.25136798 8.95179232,3.734449 C8.75733613,3.21753002 9.01874387,2.6408465 9.53566285,2.4463903 C10.3171048,2.15242503 11.1488212,2 12,2 Z"/>
            </svg>
          </button>
          <button className="flex self-center p-2 ml-2 text-gray-500 rounded-full focus:outline-none hover:text-gray-600 hover:bg-gray-300">
            <svg className="w-6 h-6 text-gray-600 fill-current" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path fillRule="nonzero" d="M9.5,3 C13.0898509,3 16,5.91014913 16,9.5 C16,10.9337106 15.5358211,12.2590065 14.7495478,13.3338028 L19.7071068,18.2928932 C20.0976311,18.6834175 20.0976311,19.3165825 19.7071068,19.7071068 C19.3466228,20.0675907 18.7793918,20.0953203 18.3871006,19.7902954 L18.2928932,19.7071068 L13.3338028,14.7495478 C12.2590065,15.5358211 10.9337106,16 9.5,16 C5.91014913,16 3,13.0898509 3,9.5 C3,5.91014913 5.91014913,3 9.5,3 Z M9.5,5 C7.01471863,5 5,7.01471863 5,9.5 C5,11.9852814 7.01471863,14 9.5,14 C11.9852814,14 14,11.9852814 14,9.5 C14,7.01471863 11.9852814,5 9.5,5 Z"/>
            </svg>
          </button>
          <button type="button" className="flex self-center hidden p-2 ml-2 text-gray-500 rounded-full md:block focus:outline-none hover:text-gray-600 hover:bg-gray-300">
            <svg className="w-6 h-6 text-gray-600 fill-current" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path fillRule="nonzero" d="M12,16 C13.1045695,16 14,16.8954305 14,18 C14,19.1045695 13.1045695,20 12,20 C10.8954305,20 10,19.1045695 10,18 C10,16.8954305 10.8954305,16 12,16 Z M12,10 C13.1045695,10 14,10.8954305 14,12 C14,13.1045695 13.1045695,14 12,14 C10.8954305,14 10,13.1045695 10,12 C10,10.8954305 10.8954305,10 12,10 Z M12,4 C13.1045695,4 14,4.8954305 14,6 C14,7.1045695 13.1045695,8 12,8 C10.8954305,8 10,7.1045695 10,6 C10,4.8954305 10.8954305,4 12,4 Z"/>
            </svg>
          </button>
          <button className="p-2 text-gray-700 flex self-center rounded-full md:hidden focus:outline-none hover:text-gray-600 hover:bg-gray-200">
            <svg className="w-6 h-6 text-gray-600 fill-current" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path fillRule="nonzero" d="M4,16 L20,16 C20.5522847,16 21,16.4477153 21,17 C21,17.5128358 20.6139598,17.9355072 20.1166211,17.9932723 L20,18 L4,18 C3.44771525,18 3,17.5522847 3,17 C3,16.4871642 3.38604019,16.0644928 3.88337887,16.0067277 L4,16 L20,16 L4,16 Z M4,11 L20,11 C20.5522847,11 21,11.4477153 21,12 C21,12.5128358 20.6139598,12.9355072 20.1166211,12.9932723 L20,13 L4,13 C3.44771525,13 3,12.5522847 3,12 C3,11.4871642 3.38604019,11.0644928 3.88337887,11.0067277 L4,11 Z M4,6 L20,6 C20.5522847,6 21,6.44771525 21,7 C21,7.51283584 20.6139598,7.93550716 20.1166211,7.99327227 L20,8 L4,8 C3.44771525,8 3,7.55228475 3,7 C3,6.48716416 3.38604019,6.06449284 3.88337887,6.00672773 L4,6 Z"/>
            </svg>
          </button>
        </div>
        <div className="top-0 bottom-0 left-0 right-0 flex flex-col flex-1 overflow-hidden bg-transparent bg-bottom bg-cover">
          <div className="self-center flex-1 w-full max-w-xl">
            <div className="relative flex flex-col px-3 py-1 m-auto">
              <div className="self-center px-2 py-1 mx-0 my-1 text-sm text-white text-gray-700 bg-white border border-gray-200 rounded-full shadow rounded-tg">Channel was created</div>
              <div className="self-center px-2 py-1 mx-0 my-1 text-sm text-white text-gray-700 bg-white border border-gray-200 rounded-full shadow rounded-tg">May 6</div>
              <div className="self-start w-3/4 my-2">
                <div className="p-4 text-sm bg-white rounded-t-lg rounded-r-lg shadow">
                  Don't forget to check on all responsive sizes.
                </div>
              </div>
              <div className="self-end w-3/4 my-2">
                <div className="p-4 text-sm bg-white rounded-t-lg rounded-l-lg shadow">
                  Use the buttons above the editor to test on them
                </div>
              </div>
            </div>
          </div>
          <div className="relative flex items-center self-center w-full max-w-xl p-4 overflow-hidden text-gray-600 focus-within:text-gray-400">
            <div className="w-full">
              <span className="absolute inset-y-0 left-0 flex items-center pl-6">
                <button type="submit" className="p-1 focus:outline-none focus:shadow-none">
                  <svg className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path fillRule="nonzero" d="M9.5,3 C13.0898509,3 16,5.91014913 16,9.5 C16,10.9337106 15.5358211,12.2590065 14.7495478,13.3338028 L19.7071068,18.2928932 C20.0976311,18.6834175 20.0976311,19.3165825 19.7071068,19.7071068 C19.3466228,20.0675907 18.7793918,20.0953203 18.3871006,19.7902954 L18.2928932,19.7071068 L13.3338028,14.7495478 C12.2590065,15.5358211 10.9337106,16 9.5,16 C5.91014913,16 3,13.0898509 3,9.5 C3,5.91014913 5.91014913,3 9.5,3 Z M9.5,5 C7.01471863,5 5,7.01471863 5,9.5 C5,11.9852814 7.01471863,14 9.5,14 C11.9852814,14 14,11.9852814 14,9.5 C14,7.01471863 11.9852814,5 9.5,5 Z"/>
                  </svg>
                </button>
              </span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-6">
                <button type="submit" className="p-1 focus:outline-none focus:shadow-none hover:text-blue-500">
                  <svg className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path fillRule="nonzero" d="M6.43800037,12.0002892 L6.13580063,11.9537056 C5.24777712,11.8168182 4.5354688,11.1477159 4.34335422,10.2699825 L2.98281085,4.05392998 C2.89811796,3.66698496 2.94471512,3.2628533 3.11524595,2.90533607 C3.53909521,2.01673772 4.60304421,1.63998415 5.49164255,2.06383341 L22.9496381,10.3910586 C23.3182476,10.5668802 23.6153089,10.8639388 23.7911339,11.2325467 C24.2149912,12.1211412 23.8382472,13.1850936 22.9496527,13.6089509 L5.49168111,21.9363579 C5.13415437,22.1068972 4.73000953,22.1534955 4.34305349,22.0687957 C3.38131558,21.8582835 2.77232686,20.907987 2.9828391,19.946249 L4.34336621,13.7305987 C4.53547362,12.8529444 5.24768451,12.1838819 6.1356181,12.0469283 L6.43800037,12.0002892 Z M5.03153725,4.06023585 L6.29710294,9.84235424 C6.31247211,9.91257291 6.36945677,9.96610109 6.44049865,9.97705209 L11.8982869,10.8183616 C12.5509191,10.9189638 12.9984278,11.5295809 12.8978255,12.182213 C12.818361,12.6977198 12.4138909,13.1022256 11.8983911,13.1817356 L6.44049037,14.0235549 C6.36945568,14.0345112 6.31247881,14.0880362 6.29711022,14.1582485 L5.03153725,19.9399547 L21.6772443,12.0000105 L5.03153725,4.06023585 Z"/>
                  </svg>
                </button>
              </span>
              <input type="search"
                     className="w-full py-2 pl-10 text-sm bg-white border border-transparent appearance-none rounded-tg placeholder-gray-800 focus:bg-white focus:outline-none focus:border-blue-500 focus:text-gray-900 focus:shadow-outline-blue" style={{ borderRadius: '25px' }}
                     placeholder="Message..." autoComplete="off"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chat