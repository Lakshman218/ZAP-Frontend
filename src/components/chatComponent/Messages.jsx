import React, { useEffect, useState } from 'react'
import { addMessage } from '../../services/user/apiMethods';
import { toast } from 'sonner';

function Messages({
  user, currentChat, messages, setMessages
}) {
  console.log("currentChat in message", currentChat);
  const [person, setPerson] = useState(null)
  useEffect(() => {
    const currentPerson = currentChat?.members.find((m) => m._id != user._id)
    setPerson(currentPerson)
  }, [currentChat])

  const handleSubmit = () => {
    addMessage(formData)
      .then((response) => {
        toast.info("message has been send")
      })
  }

  return (
    // <div className="relative flex flex-col flex-1">
    //   <div className="z-20 flex flex-grow-0 flex-shrink-0 w-full pr-3 bg-white border-b">
    //     <div className="w-12 h-12 mx-4 my-2 bg-blue-500 bg-center bg-no-repeat bg-cover rounded-full cursor-pointer">
    //       {person && (
    //         <img
    //           className="rounded-full object-cover w-full h-full"
    //           src={person?.profileImg}
    //           alt=""
    //         />
    //       )}
    //     </div>
    //     <div className="flex flex-col justify-center flex-1 overflow-hidden cursor-pointer">
    //       <div className="overflow-hidden text-base font-medium leading-tight text-gray-600 whitespace-no-wrap">
    //         {person ? person.userName : 'Loading...'}
    //       </div>
    //       <div className="overflow-hidden text-sm font-medium leading-tight text-gray-600 whitespace-no-wrap">Online</div>
    //     </div>
    //     <button className="flex self-center p-2 ml-2 text-gray-500 rounded-full focus:outline-none hover:text-gray-600 hover:bg-gray-300">
    //       <svg
    //         className="w-6 h-6 text-gray-600 fill-current"
    //         xmlns="http://www.w3.org/2000/svg"
    //         width="24"
    //         height="24"
    //         viewBox="0 0 24 24"
    //       >
    //         <path
    //           fillRule="nonzero"
    //           d="M11,20 L13,20 C13.5522847,20 14,20.4477153 14,21 C14,21.5128358 13.6139598,21.9355072 13.1166211,21.9932723 L13,22 L11,22 C10.4477153,22 10,21.5522847 10,21 C10,20.4871642 10.3860402,20.0644928 10.8833789,20.0067277 L11,20 L13,20 L11,20 Z M3.30352462,2.28241931 C3.6693482,1.92735525 4.23692991,1.908094 4.62462533,2.21893936 L4.71758069,2.30352462 L21.2175807,19.3035246 C21.6022334,19.6998335 21.5927842,20.332928 21.1964754,20.7175807 C20.8306518,21.0726447 20.2630701,21.091906 19.8753747,20.7810606 L19.7824193,20.6964754 L18.127874,18.9919007 L18,18.9999993 L4,18.9999993 C3.23933773,18.9999993 2.77101468,18.1926118 3.11084891,17.5416503 L3.16794971,17.4452998 L5,14.6972244 L5,8.9999993 C5,7.98873702 5.21529462,7.00715088 5.62359521,6.10821117 L3.28241931,3.69647538 C2.89776658,3.3001665 2.90721575,2.66707204 3.30352462,2.28241931 Z M7.00817933,8.71121787 L7,9 L7,14.6972244 C7,15.0356672 6.91413188,15.3676193 6.75167088,15.6624466 L6.66410059,15.8066248 L5.86851709,17 L16.1953186,17 L7.16961011,7.7028948 C7.08210009,8.02986218 7.02771758,8.36725335 7.00817933,8.71121787 Z M12,2 C15.7854517,2 18.8690987,5.00478338 18.995941,8.75935025 L19,9 L19,12 C19,12.5522847 18.5522847,13 18,13 C17.4871642,13 17.0644928,12.6139598 17.0067277,12.1166211 L17,12 L17,9 C17,6.23857625 14.7614237,4 12,4 C11.3902636,4 10.7970241,4.10872043 10.239851,4.31831953 C9.72293204,4.51277572 9.14624852,4.25136798 8.95179232,3.734449 C8.75733613,3.21753002 9.01874387,2.6408465 9.53566285,2.4463903 C10.3171048,2.15242503 11.1488212,2 12,2 Z"
    //         />
    //       </svg>
    //     </button>
    //     <button className="flex self-center p-2 ml-2 text-gray-500 rounded-full focus:outline-none hover:text-gray-600 hover:bg-gray-300">
    //       <svg
    //         className="w-6 h-6 text-gray-600 fill-current"
    //         xmlns="http://www.w3.org/2000/svg"
    //         width="24"
    //         height="24"
    //         viewBox="0 0 24 24"
    //       >
    //         <path
    //           fillRule="nonzero"
    //           d="M9.5,3 C13.0898509,3 16,5.91014913 16,9.5 C16,10.9337106 15.5358211,12.2590065 14.7495478,13.3338028 L19.7071068,18.2928932 C20.0976311,18.6834175 20.0976311,19.3165825 19.7071068,19.7071068 C19.3466228,20.0675907 18.7793918,20.0953203 18.3871006,19.7902954 L18.2928932,19.7071068 L13.3338028,14.7495478 C12.2590065,15.5358211 10.9337106,16 9.5,16 C5.91014913,16 3,13.0898509 3,9.5 C3,5.91014913 5.91014913,3 9.5,3 Z M9.5,5 C7.01471863,5 5,7.01471863 5,9.5 C5,11.9852814 7.01471863,14 9.5,14 C11.9852814,14 14,11.9852814 14,9.5 C14,7.01471863 11.9852814,5 9.5,5 Z"
    //         />
    //       </svg>
    //     </button>
    //     <button
    //       type="button"
    //       className="flex self-center hidden p-2 ml-2 text-gray-500 rounded-full md:block focus:outline-none hover:text-gray-600 hover:bg-gray-300"
    //     >
    //       <svg
    //         className="w-6 h-6 text-gray-600 fill-current"
    //         xmlns="http://www.w3.org/2000/svg"
    //         width="24"
    //         height="24"
    //         viewBox="0 0 24 24"
    //       >
    //         <path
    //           fillRule="nonzero"
    //           d="M12,16 C13.1045695,16 14,16.8954305 14,18 C14,19.1045695 13.1045695,20 12,20 C10.8954305,20 10,19.1045695 10,18 C10,16.8954305 10.8954305,16 12,16 Z M12,10 C13.1045695,10 14,10.8954305 14,12 C14,13.1045695 13.1045695,14 12,14 C10.8954305,14 10,13.1045695 10,12 C10,10.8954305 10.8954305,10 12,10 Z M12,4 C13.1045695,4 14,4.8954305 14,6 C14,7.1045695 13.1045695,8 12,8 C10.8954305,8 10,7.1045695 10,6 C10,4.8954305 10.8954305,4 12,4 Z"
    //         />
    //       </svg>
    //     </button>
    //   </div>
    //   <div className="flex flex-col flex-1 pt-4 overflow-hidden bg-white rounded-t-xl">
    //     <div className="relative flex flex-col flex-1 px-4 overflow-x-hidden overflow-y-auto bg-white scrollbar">
    //       <div className="flex justify-center w-full py-2">
    //         <button className="flex self-center text-xs text-gray-500 focus:outline-none hover:underline">
    //           See all messages
    //         </button>
    //       </div>
    //       <div className="flex flex-col">
    //         {/* Render message list */}
    //         {messages.map((msg, index) => (
    //           <div
    //             key={index}
    //             className={`mb-2 flex ${msg.isSender ? "justify-end" : "justify-start"}`}
    //           >
    //             <div
    //               className={`relative max-w-xl px-4 py-2 text-gray-700 rounded shadow ${
    //                 msg.isSender ? "bg-blue-100" : "bg-gray-200"
    //               }`}
    //             >
    //               <span className="block">{msg.text}</span>
    //             </div>
    //           </div>
    //         ))}
    //       </div>
    //     </div>
    //   </div>
    //   <div className="flex-shrink-0 w-full py-2 bg-gray-100">
    //     <div className="relative flex flex-row items-center h-10 w-full">
    //       <div className="flex-grow pl-4">
    //         <div className="relative w-full">
    //           <input
    //             type="text"
    //             className="flex w-full border rounded focus:outline-none focus:ring-1 focus:ring-blue-400 border-gray-300 px-4"
    //             placeholder="Type your message..."
    //             // value={messageInput}
    //             // onChange={handleInputChange}
    //             // onKeyDown={handleKeyDown}
    //           />
    //         </div>
    //       </div>
    //       <div className="flex-shrink-0 pr-2 ml-2">
    //         <button
    //           type="button"
    //           className="flex items-center justify-center w-10 h-10 text-white bg-blue-500 rounded-full hover:bg-blue-400 focus:outline-none"
    //           // onClick={handleSendMessage}
    //         >
    //           <svg
    //             className="w-5 h-5"
    //             xmlns="http://www.w3.org/2000/svg"
    //             viewBox="0 0 24 24"
    //             fill="currentColor"
    //           >
    //             <path
    //               fillRule="evenodd"
    //               d="M2.964 0.36c0.098-0.098 0.23-0.17 0.374-0.198l21.26-3.85c0.273-0.049 0.551 0.034 0.75 0.22 0.2 0.186 0.313 0.45 0.313 0.725 0 0.003-0.003 0.007-0.003 0.01L20.82 20.37c-0.087 0.536-0.636 0.907-1.178 0.82L11.993 19.76 8.24 22.086c-0.246 0.16-0.554 0.208-0.834 0.13-0.28-0.078-0.517-0.264-0.668-0.512-0.17-0.285-0.18-0.635-0.025-0.93L8.875 16.9 2.64 2.458c-0.113-0.29-0.056-0.62 0.145-0.84zm2.5 4.278L9.575 13.88c0.083 0.202 0.241 0.366 0.445 0.45L13.36 16.54l5.088 0.912-4.452-12.98-9.116 9.116zm1.89-1.89L16.54 3.36l-8.614 8.614-0.572-5.334zm1.67 1.67l-4.86 4.86 0.692 1.1 2.97-2.97 1.198-2.99z"
    //             />
    //           </svg>
    //         </button>
    //       </div>
    //     </div>
    //   </div>
    // </div>

    <div className="relative flex flex-col flex-1">
        <div className="z-20 flex flex-grow-0 flex-shrink-0 w-full pr-3 bg-white border-b">
          <div className="w-12 h-12 mx-4 my-2 bg-blue-500 bg-center bg-no-repeat bg-cover rounded-full cursor-pointer">
            {person && (
              <img
              className="rounded-full object-cover w-full h-full"
              src={person?.profileImg}
              alt=""/>
            )}
          </div>
          <div className="flex flex-col justify-center flex-1 overflow-hidden cursor-pointer">
            <div className="overflow-hidden text-base font-medium leading-tight text-gray-600 whitespace-no-wrap">
            {person ? person.userName : 'Loading...'}
            </div>
            <div className="overflow-hidden text-sm font-medium leading-tight text-gray-600 whitespace-no-wrap">Online</div>
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
              <input 
                className="w-full py-2 pl-10 text-sm bg-white border border-transparent appearance-none rounded-tg placeholder-gray-800 focus:bg-white focus:outline-none focus:border-blue-500 focus:text-gray-900 focus:shadow-outline-blue" style={{ borderRadius: '25px' }}
                type="search"
                placeholder="Message..." 
                autoComplete="off"
              />
            </div>
          </div>
        </div>
      </div>
  )
}

export default Messages