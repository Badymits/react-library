import { useState } from "react";
import { NavLink } from "react-router-dom"
import { CiSearch } from "react-icons/ci";
import { GiShoppingCart } from "react-icons/gi";

const PageHeader = () => {

  const [navbar, setNavbar] = useState(false)

  const handleNavbar = () => {
    console.log(window.scrollY)
    if (window.scrollY >= 100){
        setNavbar(true)
    } else {
        setNavbar(false)
    }
  }

  window.addEventListener('scroll', handleNavbar)
    

  return (
    <header className={navbar ? "w-[878px] h-[80px] bg-white/10 backdrop-blur-md border-b-2 border-gray-400  transition-all" : "bg-red-100 w-full h-[80px] " }>
        <div className="flex items-center justify-between h-full">
            <div className="flex items-center justify-start gap-[6rem] w-[50%]">
                <div>
                    <NavLink className={({isActive, isTransitioning}) => 
                        [isActive ?
                        'active-tab-header' :
                        '',
                        isTransitioning ? 
                        'transitioning' :
                        ''
                        ].join(" ")} 
                        to='my-library'
                    >
                        My Library 
                    </NavLink>
                </div>
                <div>
                    <NavLink className={({isActive, isTransitioning}) => 
                        [isActive ?
                        'active-tab-header' :
                        '',
                        isTransitioning ? 
                        'transitioning' :
                        ''
                        ].join(" ")} 
                        to='checkout'>
                        Check Out
                    </NavLink>  
                </div>
                <div>
                    <NavLink>
                        Business
                    </NavLink>
                </div>
            </div>
            <div className="flex w-[50%] items-center justify-between mx-2">
                <div className="relative">
                    <CiSearch className="absolute top-1 right-1 text-lg"/>
                    <input type="text" placeholder="Search for title, author, genre..." className="w-[350px] border border-slate-500 rounded-lg" />
                </div>
                <GiShoppingCart className="text-3xl hover:hover:bg-gray-200 rounded-full cursor-pointer"/>
            </div>
        </div>
        
    </header>
  )
}

export default PageHeader