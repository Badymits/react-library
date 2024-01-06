import { useState, useContext } from "react";
import { NavLink } from "react-router-dom"
import { CiSearch } from "react-icons/ci";
import { GiShoppingCart } from "react-icons/gi";
import { AuthContext } from "../context/AuthContext";

import { useNavigate } from "react-router-dom";

import {  IoIosRemoveCircleOutline  } from "react-icons/io";

const PageHeader = () => {

  let { handleSearch, booksInCart, setBooksInCart } = useContext(AuthContext)

  const navigate = useNavigate()

  // upon user scroll, will set the css classes for navbar
  const [navbar, setNavbar] = useState(false)

  // controlled input search bar
  const [searchBar, setsearchBar] = useState('')

  // cart display block, by default, it is closed
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

  const handleRemoveItem = (book) => {
    alert(`'${book.title}' removed!!!`)
    let filteredArray = booksInCart.filter(item => item !== book)
    setBooksInCart(filteredArray)
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
                    <p className="absolute -top-3 -right-1 text-red-400 font-bold text-xl">{booksInCart.length}</p>
                    <div className={ `${cartView ? 'block' : 'hidden'} absolute top-8 right-0 h-[400px] w-[450px] bg-gray-300 rounded-xl border-blue-300 border-2`}>
                        
                    {(booksInCart.length > 0) ? 

                        <div className="relative h-full w-full overflow-y-auto scrollbar">
                            <div>
                                {booksInCart.map((book) => (
                                    <div key={book.id} className="flex items-center justify-between py-2 px-3 h-[130px]">
                                        <img src={book.book_image} alt={book.title} className="object-contain max-h-[100px] max-w-[100px]"/>
                                        <div className="px-6">
                                            <p>{book.title}</p>
                                            <p>{book.author.name}</p>
                                        </div>
                                        
                                        <IoIosRemoveCircleOutline className="text-red-600 cursor-pointer text-lg" onClick={() => handleRemoveItem(book)}/>
                                    </div>
                                ))}
                            </div>
                            
                            
                            <button onClick={() => navigate('checkout')} className="bg-white w-full mt-auto">Proceed to Checkout</button>
                        </div>
                        
                        
                    :
                        <p className="text-center text-2xl ">
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