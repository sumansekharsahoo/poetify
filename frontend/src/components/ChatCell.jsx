import React from 'react'

const ChatCell = ({id,prompt,date,modalOpener}) => {
  return (
    <div className='flex flex-col align-baseline border-[1px] border-[#9d9c9c] bg-[#ddbe58] w-[190px] h-[120px] rounded-[8px] justify-evenly px-[10px] py-[5px] cursor-pointer text-stone-800 hover:bg-[#c7a535] transition duration-300' onClick={() => modalOpener({id})}>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256" className="text-accent-secondary-100"><path d="M232.07,186.76a80,80,0,0,0-62.5-114.17A80,80,0,1,0,23.93,138.76l-7.27,24.71a16,16,0,0,0,19.87,19.87l24.71-7.27a80.39,80.39,0,0,0,25.18,7.35,80,80,0,0,0,108.34,40.65l24.71,7.27a16,16,0,0,0,19.87-19.86ZM62,159.5a8.28,8.28,0,0,0-2.26.32L32,168l8.17-27.76a8,8,0,0,0-.63-6,64,64,0,1,1,26.26,26.26A8,8,0,0,0,62,159.5Zm153.79,28.73L224,216l-27.76-8.17a8,8,0,0,0-6,.63,64.05,64.05,0,0,1-85.87-24.88A79.93,79.93,0,0,0,174.7,89.71a64,64,0,0,1,41.75,92.48A8,8,0,0,0,215.82,188.23Z"></path></svg>
      <div className='h-[48px] text-ellipsis overflow-hidden'>
        {prompt}
      </div>
      <div>
        {date}
      </div>
    </div>
  )
}

export default ChatCell