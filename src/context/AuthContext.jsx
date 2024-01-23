/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import { jwtDecode  } from 'jwt-decode';
import axios from 'axios';
import { useNavigate, createSearchParams } from "react-router-dom";

import getBookList from '../axios/getBookList';

// this context variable/component can be used by any other component that needs the data
export const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const [formState, setFormState] = useState({
        email: '',
        first_name: '',
        last_name: '',
        username: '',
        password: '',
        password2: '',
      })
    

    // state to hold the list of books
    const [books, setBooks] = useState([])
    

    // state to hold the book id which is to be used in the bookdetailview and get request api call
    const [bookId, setBookId] = useState([])
    

    // searchResults contain the list of books related to the input value
    const [searchResults, setSearchResults] = useState([])


    // keyword will be used for filtering
    const [keyword, setKeyword] = useState('')
    
    // this state will be used in the checkout context since pageheader.jsx is not a child of the checkoutcontext provider
    const [removedItemArray, setRemovedItemArray] = useState(false)
    
    // for the items to retain in the state when user refreshes page
    const [booksInCart, setBooksInCart] = useState(() => 
        localStorage.getItem('cart_books') ? JSON.parse(localStorage.getItem('cart_books')) : []
    )

    // for both states, we check the local storage for it. 
    // check first if it is present, else just set to null
    const [authTokens, setAuthTokens] = useState( () =>
        localStorage.getItem('auth_token') ? JSON.parse(localStorage.getItem('auth_token')) : null
    )


    // make it a callback function so it doesnt have to send a request everytime the page refreshes
    const [user, setUser] = useState( () =>
        localStorage.getItem('auth_token') ? jwtDecode(localStorage.getItem('auth_token')) : null
    )

    // to be used for tailwind class, if true, use css classes for a loggedin user else use classes for log in and register page
    const [loggedIn, setLoggedIn] = useState(
      localStorage.getItem('auth_token') ? true : false
    )
    
    // data coming from backend, set to state to be accessed by library
    useEffect(() => {
      getBookList().then(res => {
        setBooks(res)
      })
    }, [])

    // will be used to redirect user depending if they are logged in or not
    const navigate = useNavigate()

    console.log(books)

    let handleSearch = async (e) => {
      e.preventDefault();

      // since we are targeting an input value from another component, we need to access it by the input name (i.e. searchbar)
      const param = e.target.searchbar.value

      // will only run when param is not blank, so user must have input for search bar to send a req to backend
      if (param !== ''){
        setKeyword(param)
        await axios({
          method: 'GET',
          url: `http://127.0.0.1:8000/get-search-results/<str:key>/`, // although confusing at first but always copy the full url of the endpoint, if there are any params, just add them below
          headers: {
            'Content-Type': 'Application/json'
          },
          params: {
            key: param
          }
        })
          .then((res) => {
            console.log(res)
            setSearchResults(res.data.search_results)
            console.log('navigating...')
            sessionStorage.setItem('books', JSON.stringify(res.data.search_results))
            sessionStorage.setItem('keyword', param)
            navigate({
              pathname: '/library/browse/search-result', 
              search: createSearchParams({
              params: param}).toString()
            })
          }).catch((err) => {
            console.error(err)
          })
      } 
    } 


    let registerUser = async (e) => {
        e.preventDefault();

        if(validate(e)){
      
            await axios({
              method: 'POST',
              url: 'http://127.0.0.1:8000/auth/register/',
              headers: {
                  'Content-Type': 'application/json'
              },
              data:JSON.stringify({
                'email': e.target.email.value,
                'first_name': e.target.first_name.value,
                'last_name': e.target.last_name.value,
                'username': e.target.username.value,
                'password': e.target.password.value,
              }) 
            }).then(res => {
              // alert('form submitted')
              // console.log(res.data)
              // console.log(JSON.stringify(jwtDecode(res.data.user_token.access)))

              setAuthTokens(res.data.user_token)
              setUser(jwtDecode(res.data.user_token.access)) // utilizing jwtdecode package to access the user token claims set in the backend
              setLoggedIn(true)

              localStorage.setItem('auth_token', JSON.stringify(res.data.user_token))
              navigate('/')

            }).catch((error) => {
              console.error(error)
            })
      
          }
    }

    const validate = (e) => {
        let isValid = true
        if (formState.password === formState.password2){
          console.log('match')
          return isValid
        } else {
          alert('Password does not match')
          isValid = false
          return isValid
        }
      }

    let loginUser = async (e) => {
        e.preventDefault();

        console.log('Form Submitted')
        await axios({
            method: 'POST',
            url: 'http://127.0.0.1:8000/api/token/',
            headers: {
                'Content-Type': 'application/json'
            },
            // when using axios, remember to use the 'data' keyword not 'body'
            // body is used for fetch API
            data:JSON.stringify({'email': e.target.email.value, 'password': e.target.password.value})
        }).then(res => {
            console.log('response: ', res)
            console.log(res.data)
            setAuthTokens(res.data)
            setUser(jwtDecode(res.data.access)) // utilizing jwtdecode package to access the user token claims set in the backend
            setLoggedIn(true)

            localStorage.setItem('auth_token', JSON.stringify(res.data))
            navigate('/')
        }).catch(err => {
            console.error(err)
        })
        
    }

    let logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        setLoggedIn(false)
        localStorage.removeItem('auth_token')
        navigate('/auth/login')
    }

    // these are the information that can be accessed  by any components wrapped in a provider
    let contextData = {
        user:user,
        loginUser: loginUser,
        logoutUser: logoutUser,
        registerUser: registerUser,
        loggedIn: loggedIn,
        books: books,
        bookId: bookId,
        setBookId: setBookId,
        handleSearch: handleSearch,
        searchResults: searchResults,
        keyword: keyword,
        setKeyword: setKeyword,
        setBooksInCart: setBooksInCart,
        booksInCart: booksInCart,
        removedItemArray: removedItemArray,
        setRemovedItemArray: setRemovedItemArray,
    }


    return(
        <AuthContext.Provider value={contextData}>
            {/* all the components that were wrapped around this provider (e.g. in App.jsx) will have access to the contextData values */}
            {children}
        </AuthContext.Provider>
    )
}
