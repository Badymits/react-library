import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import SwiperComponent from "../../components/SwiperComponent"


// This page contains the books that the user liked/bookmarked and will provide a list of recommendations
const MyLibrary = () => {

    let { books } = useContext(AuthContext)

    // let this variable contain the search parameters (to be implemented and optimized later)
    const bookGenre = ['Computer Science', 'Fiction']
    const bookGenreFic = [ 'Fiction']
    
    // filtering nested arrays since books can have multiple genres
    // will be modified later so it can filter by multiple queries (title, author, and genre)
    const resultCom = books.filter(book => book.genre.every(b => bookGenre.includes(b.name)))
    const resultFic = books.filter(book => book.genre.every(b => bookGenreFic.includes(b.name)))

  return (
    <div>
        <div className='relative pt-10 mb-[10em]'>
        <SwiperComponent 
          resultComSci={resultCom}
          genre={'ComputerScience'}
          title='Computer Science'
        />  
      </div>
    </div>
  )
}

export default MyLibrary