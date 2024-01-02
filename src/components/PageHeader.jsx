import { useState, useContext } from "react";
import { NavLink } from "react-router-dom"
import { CiSearch } from "react-icons/ci";
import { GiShoppingCart } from "react-icons/gi";
import { AuthContext } from "../context/AuthContext";

const PageHeader = () => {

  let { handleSearch, booksInCart } = useContext(AuthContext)
 
  const [navbar, setNavbar] = useState(false)
  const [searchBar, setsearchBar] = useState('')
  const [cartView, setCartView] = useState(false)

  console.log(booksInCart.length)

  const handleSearchBar = (e) => {
    
    setsearchBar(e.target.value)
  }

  const handleCartView = () => {
    setCartView(!cartView)
  }

  const handleNavbar = () => {

    if (window.scrollY >= 50){
        setNavbar(true)
    } else {
        setNavbar(false)
    }
  }

  window.addEventListener('scroll', handleNavbar)
  
  return (
    <header className={navbar ? "h-[80px] px-4 bg-white/10 backdrop-blur-md border-gray-400  transition-all" : "px-4 w-full h-[80px] " }>
        <div className="flex items-center justify-between h-full">
            <div className="flex items-center justify-start gap-[4rem] w-[50%] text-lg ">
                <div>
                    <NavLink className={({isActive, isTransitioning}) => 
                        [isActive ?
                        'active-tab-header' :
                        '',
                        isTransitioning ? 
                        'transitioning' :
                        ''
                        ].join(" ")} 
                        to='home'>
                        Home
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
                        ].join(" ")

                    } 
                        to='browse'
                    >
                        Browse 
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
                        to='checkout'
                        >
                        Check Out
                    </NavLink>
                </div>
            </div>
            <div className="flex w-[50%] items-center justify-between">
                <div className="relative">
                    <CiSearch className="absolute top-1 right-1 text-lg"/>
                    <form action="" onSubmit={handleSearch}>
                        <input 
                            type="text" 
                            name="searchbar"
                            placeholder="Search for title, author, genre..." 
                            className="w-[350px] border border-slate-500 rounded-lg" 
                            value={searchBar}
                            onChange={handleSearchBar}
                        />
                    </form>
                    
                </div>
                <div className="relative">
                    <GiShoppingCart className="text-3xl hover:hover:bg-gray-200 rounded-full cursor-pointer" onClick={handleCartView}/>
                    <div className={ `${cartView ? 'block' : 'hidden'} absolute top-7 right-0 h-[250px] w-[360px] bg-gray-300 rounded-xl  `}>
                        
                    {(booksInCart.length > 0) ? 

                        <div>
                            {booksInCart.map((book) => (
                                <p key={book.id}>
                                    {book.title}
                                </p>
                            ))}
                        </div>
                        
                    :
                        <p>
                            0 items in cart
                        </p>
                    }
                        
                        
                        
                    </div>
                </div>
                
            </div>
        </div>
        
    </header>
  )
}

export default PageHeader