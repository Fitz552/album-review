import Navbar from "./Navbar"
import {useState, useEffect} from "react"
import axios from "axios"
import {Link} from "react-router-dom"

function AlbumList() {
    const [albuns, setAlbuns] = useState([])
    const [search, setSearch] = useState("")
    const [filteredAlbuns, setFilteredAlbuns] = useState([])


    useEffect(()=>{
        axios.get("https://ironrest.herokuapp.com/albuns")
        .then((response)=> {
            console.log(response.data)
            setAlbuns(response.data)
            setFilteredAlbuns(response.data)
        })   
        .then( () => {
        let aux = [...albuns]
        if (search !=="") {
            aux = aux.filter(album => {
                let name = album.name.toLowerCase()
                let artist = album.artists[0].name.toLowerCase()
                return (name.includes(search.toLowerCase()) || artist.includes(search.toLowerCase()))
            })
            setFilteredAlbuns(aux)
        }
        })
        .catch(error => console.log(error))

    },[search])

    function onChange(event) {
        setSearch(event.target.value)

    }

    return(
        <div>
            <Navbar/>
            <input type="text" placeholder= "Search by album or artist" onChange={onChange}/>
            <div className="row m-2 d-flex justify-content-start">
                { 
                    filteredAlbuns.map((album)=> {
                        return(
                            <div className = "m-2 pt-1 col-md-3 col-sm-6 border border-dark rounded d-flex justify-content-center bg-light" key={album._id}>
                                <Link to= {`/albuns/${album._id}`} className="clean">
                                    <img src={album.images[0].url} alt={album.name} className="album-image"/>
                                    <div className="row d-flex justify-content-between">
                                        <p className="col text-muted">Album</p>
                                        <p className="col h5 text-left text-dark">{album.name}</p>
                                    </div>
                                    <div className="row d-flex justify-content-between">
                                        <p className="col text-muted">Artist</p>
                                        <p className="col h5 text-right text-dark">{album.artists[0].name}</p>
                                    </div>
                                </Link>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default AlbumList