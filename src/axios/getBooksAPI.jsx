import axios from "axios";

async function getBooksFromAPI(){
    try {
        const { data } = await axios.get('https://www.googleapis.com/books/v1/volumes?q=search+terms')
        return data
    } catch (error) {
        console.log(error)
    }
}


export default getBooksFromAPI;

