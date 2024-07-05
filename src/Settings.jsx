import { useState } from 'react'

import { IoIosArrowDown } from "react-icons/io";

const Settings = () => {

  const [ onSwitch, setOnSwitch ] = useState(false)
  const [ divDisplay, setDivDisplay ] = useState(false)
  const [ block, setBlock ] = useState(0)


  const dropDownBlock = (id) => {
    // let blk = document.getElementById(`block-${id}`)
    // console.log(blk)
    if (block === id) {
      setBlock(0)
      setDivDisplay(false)
    } else {
      setBlock(id)
      setDivDisplay(true)
    }
   
  }

  return (
    <section >
        <h1 className='p-5 text-3xl font-thin'>Settings</h1>
        <hr className='border-b-[1px] border-black'/>
        <div className='border-b-2 pb-2 my-5' id='block-1'>
          
          <div className='flex justify-between items-center mx-2'>
            <h1 className='text-xl'>Account & Privacy</h1>
            <IoIosArrowDown className={divDisplay && block === 1 ?
            'rotate-180 duration-300 text-3xl hover:bg-gray-200 rounded-full cursor-pointer':
            'rotate-0 duration-300 text-3xl hover:bg-gray-200 rounded-full cursor-pointer'
            }
             
             
             onClick={() => dropDownBlock(1)}
             />
            
          </div>

          <div className={divDisplay && block === 1 ? 
            'translate-y-0 duration-300' : 
            '-translate-y-[200px] duration-300 hidden'
            }>
            <div className='mx-4 py-2 flex justify-between  items-center  h-full'>
              <h1>Night mode</h1>
              <button className={onSwitch ?  'w-[50px]  h-[20px] rounded-full bg-blue-200 duration-300' : 'w-[50px] h-[20px] bg-gray-300 rounded-full  duration-300' } onClick={() => setOnSwitch(!onSwitch)}>
                  <p className={onSwitch ?  "w-[20px] h-full rounded-full text-transparent translate-x-8 duration-300 bg-blue-300" : "w-[20px] h-full rounded-full text-transparent translate-x-0 duration-300 bg-gray-700"}> </p>
              </button>
            </div>
            
          </div>

          
        </div>
        <div className='border-b-2 pb-2 my-5' id='block-2'>
          
          <div className='flex justify-between items-center mx-2'>
            <h1 className='text-xl'>Illegal but not totally illegal things</h1>
            <IoIosArrowDown className={divDisplay && block === 2 ?
            'rotate-180 duration-300 text-3xl hover:bg-gray-200 rounded-full cursor-pointer':
            'rotate-0 duration-300 text-3xl hover:bg-gray-200 rounded-full cursor-pointer'
            }
             
             
             onClick={() => dropDownBlock(2)}
             />
            
          </div>

          <div className={divDisplay && block === 2 ? 
            'translate-y-0 duration-300' : 
            '-translate-y-[200px] duration-300 hidden'
            }>
            <div className='mx-4 py-2 flex justify-between  items-center  h-full'>
              <h1>Night mode</h1>
              <button className={onSwitch ?  'w-[50px]  h-[20px] rounded-full bg-blue-200 duration-300' : 'w-[50px] h-[20px] bg-gray-300 rounded-full  duration-300' } onClick={() => setOnSwitch(!onSwitch)}>
                  <p className={onSwitch ?  "w-[20px] h-full rounded-full text-transparent translate-x-8 duration-300 bg-blue-300" : "w-[20px] h-full rounded-full text-transparent translate-x-0 duration-300 bg-gray-700"}> </p>
              </button>
            </div>
            
          </div>

          
        </div>
        <div className='border-b-2 pb-2 my-5' id='block-3'>
          
          <div className='flex justify-between items-center mx-2'>
            <h1 className='text-xl'>Something Secure</h1>
            <IoIosArrowDown className={divDisplay && block === 3 ?
            'rotate-180 duration-300 text-3xl hover:bg-gray-200 rounded-full cursor-pointer':
            'rotate-0 duration-300 text-3xl hover:bg-gray-200 rounded-full cursor-pointer'
            }
             
             
             onClick={() => dropDownBlock(3)}
             />
            
          </div>

          <div className={divDisplay && block === 3 ? 
            'translate-y-0 duration-300' : 
            '-translate-y-[200px] duration-300 hidden'
            }>
            <div className='mx-4 py-2 flex justify-between  items-center  h-full'>
              <h1>Night mode</h1>
              <button className={onSwitch ?  'w-[50px]  h-[20px] rounded-full bg-blue-200 duration-300' : 'w-[50px] h-[20px] bg-gray-300 rounded-full  duration-300' } onClick={() => setOnSwitch(!onSwitch)}>
                  <p className={onSwitch ?  "w-[20px] h-full rounded-full text-transparent translate-x-8 duration-300 bg-blue-300" : "w-[20px] h-full rounded-full text-transparent translate-x-0 duration-300 bg-gray-700"}> </p>
              </button>
            </div>
            <div className='mx-4 py-2 flex justify-between  items-center  h-full'>
              <h1>Night mode</h1>
              <button className={onSwitch ?  'w-[50px]  h-[20px] rounded-full bg-blue-200 duration-300' : 'w-[50px] h-[20px] bg-gray-300 rounded-full  duration-300' } onClick={() => setOnSwitch(!onSwitch)}>
                  <p className={onSwitch ?  "w-[20px] h-full rounded-full text-transparent translate-x-8 duration-300 bg-blue-300" : "w-[20px] h-full rounded-full text-transparent translate-x-0 duration-300 bg-gray-700"}> </p>
              </button>
            </div>
            
          </div>

          
        </div>
        <div className='border-b-2 pb-2 my-5' id='block-4'>
          
          <div className='flex justify-between items-center mx-2'>
            <h1 className='text-xl'>Legal Things</h1>
            <IoIosArrowDown className={divDisplay && block === 4 ?
            'rotate-180 duration-300 text-3xl hover:bg-gray-200 rounded-full cursor-pointer':
            'rotate-0 duration-300 text-3xl hover:bg-gray-200 rounded-full cursor-pointer'
            }
             
             
             onClick={() => dropDownBlock(4)}
             />
            
          </div>

          <div className={divDisplay && block === 4 ? 
            'translate-y-0 duration-300' : 
            '-translate-y-[200px] duration-300 hidden'
            }>
            <div className='mx-4 py-2 flex justify-between  items-center  h-full'>
              <h1>Night mode</h1>
              <button className={onSwitch ?  'w-[50px]  h-[20px] rounded-full bg-blue-200 duration-300' : 'w-[50px] h-[20px] bg-gray-300 rounded-full  duration-300' } onClick={() => setOnSwitch(!onSwitch)}>
                  <p className={onSwitch ?  "w-[20px] h-full rounded-full text-transparent translate-x-8 duration-300 bg-blue-300" : "w-[20px] h-full rounded-full text-transparent translate-x-0 duration-300 bg-gray-700"}> </p>
              </button>
            </div>
            <div className='mx-4 py-2 flex justify-between  items-center  h-full'>
              <h1>Night mode</h1>
              <button className={onSwitch ?  'w-[50px]  h-[20px] rounded-full bg-blue-200 duration-300' : 'w-[50px] h-[20px] bg-gray-300 rounded-full  duration-300' } onClick={() => setOnSwitch(!onSwitch)}>
                  <p className={onSwitch ?  "w-[20px] h-full rounded-full text-transparent translate-x-8 duration-300 bg-blue-300" : "w-[20px] h-full rounded-full text-transparent translate-x-0 duration-300 bg-gray-700"}> </p>
              </button>
            </div>
            
          </div>

          
        </div>
        
        
    </section>
  )
}

export default Settings