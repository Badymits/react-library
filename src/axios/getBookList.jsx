import axios from "axios"

async function getBookList(){
    try {
        const { data } = await axios.get('http://127.0.0.1:8000/get-book-list/')

        return data
    } catch (error){
        console.log(error)
    }
}

export default getBookList