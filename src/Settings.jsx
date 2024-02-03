import { useState } from 'react'

const Settings = () => {

  const [ onSwitch, setOnSwitch ] = useState(false)

  return (
    <section>
        <h1>Settings</h1>
        <button className={onSwitch ?  'w-[50px]  h-[20px] rounded-full bg-blue-200 duration-300' : 'w-[50px] h-[20px] bg-gray-300 rounded-full  duration-300' } onClick={() => setOnSwitch(!onSwitch)}>
            <p className={onSwitch ?  "w-[20px] h-full rounded-full text-transparent translate-x-8 duration-300 bg-blue-300" : "w-[20px] h-full rounded-full text-transparent translate-x-0 duration-300 bg-gray-700"}>.</p>
        </button>
    </section>
  )
}

export default Settings