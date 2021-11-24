import Navbar from "./Navbar"
import {useState, useEffect} from "react"
import axios from "axios"
import {useParams} from "react-router-dom"
import Form from "./Form" 


function AlbumPage() {
    const [album, setAlbum] = useState({})
    const [loaded, setLoaded] = useState(false)
    const [reviews, setReviews] = useState([])
    const [newReview, setNewReview] = useState({grade: 1})
    const [update, setUpdate] = useState([])
    const [updatedReview, setUpdatedReview] = useState({})


    const {id} = useParams()


    useEffect(()=>{
        axios.get(`https://ironrest.herokuapp.com/albuns/${id}`)
        .then((response)=> {
            setAlbum(response.data)
        })
        .then( () => {
            setLoaded(true)
        }
        )
        .catch(error => console.log(error))
        
        axios.get(`https://ironrest.herokuapp.com/reviews?albumID=${id}`)
        .then((response) => {
            let filteredRes = response.data.filter(review => {
                return review.albumId === id
            })
            setReviews(filteredRes)
        })
        .then(() => {
        })
        .catch(error => console.log(error))    
    }
    
    ,[id])

    function onDelete(event) {
        console.log(event.target)
        axios.delete(`https://ironrest.herokuapp.com/reviews/${event.target.id}`)
        .then( () => {
            return axios.get("https://ironrest.herokuapp.com/reviews")
        })
        .then(response => {
            let filteredRes = response.data.filter(review => {
                console.log(review)
                return review.albumId === id
            })
            setReviews(filteredRes)
        })
        .catch(error => console.log(error))
    }

    function onSubmit(event) {
        event.preventDefault()
        axios.post("https://ironrest.herokuapp.com/reviews", newReview)
        .then (() => {
            return axios.get("https://ironrest.herokuapp.com/reviews")
        })
        .then (response => {
            let filteredRes = response.data.filter(review => {
                console.log(review)
                return review.albumId === id
            })
            setReviews(filteredRes)
        })
        .catch(error => console.log(error))
        //.then (()=>setEditing())
    }

    function onChange(event) {
        let aux = {...newReview}
        aux.albumId = id
        aux[event.target.name] = event.target.value
        setNewReview(aux)
    }

    function onEdit(event) {
        setUpdate(event.target.id.slice(5))

        let aux = {...updatedReview}
        aux.grade = 1;
        aux.review="";
        setUpdatedReview(aux)

    }

    function onEditChange(event) {
        let aux = {...updatedReview};
        aux.albumId = id;
        aux[event.target.name] = event.target.value
        setUpdatedReview(aux)
    }

    function onEditSubmit(event){
        event.preventDefault();
        console.log(event.target)
        let reviewId = event.target.id.slice(5)
        axios.put(`https://ironrest.herokuapp.com/reviews/${reviewId}`, updatedReview)
        .then (() => {
            let aux = [...update]
            let filtered = aux.filter(value => {
                return (value !== reviewId)
            })
            console.log(filtered)
            setUpdate(filtered)
            
        }).then (() => {
            console.log(update)
            return axios.get("https://ironrest.herokuapp.com/reviews")
        })
        .then (response => {
            let filteredRes = response.data.filter(review => {
                return review.albumId === id
            })
            setReviews(filteredRes)
        })
        .catch(error => console.log(error))

    }


    return(
        <div>
            <Navbar/>
            <div className="row m-2 d-flex justify-content-center">
                <h1>This is AlbumPage</h1>
                { 
                    loaded &&
                    <div className = "m-2 pt-1 row border border-dark  bg-light">
                        <div className = "col-3 justify-content-center">
                            <div className="row d-flex justify-content-center">
                                <img src={album.images[0].url} alt={album.name} className="album-image"/>
                            </div>
                            <div className="row">
                                <p className="col text-muted">Album</p>
                                <p className="col h5 text-left text-dark">{album.name}</p>
                            </div>
                            <div className="row d-flex justify-content-between">
                                <p className="col text-muted">Artist</p>
                                <p className="col h5 text-right text-dark">{album.artists[0].name}</p>
                            </div>
                        </div>
                    </div>
                }

                <div className="row d-flex justify-content-center">
                    {
                        reviews.map( review => {
                            if (!update.includes(review._id)) {
                                return (
                                    <div className = "col-10 " key={review._id}>
                                        <div className="row d-flex p-2">
                                            <div className="col-1 d-flex justify-content-between">
                                                <p className="text-muted">Rating </p>
                                                <p>{review.grade}</p>
                                            </div>
                                            <div className="border border-light p-2">
                                                <p className="text-muted">Review</p>
                                                <p>{review.review}</p>
                                            </div>
                                            <div className = "">
                                                <button className="btn btn-light btn-sm m-2" id={`edit-${review._id}`} onClick={onEdit}>Edit</button>
                                                <button className="btn btn-light btn-sm m-2" id={review._id} onClick={onDelete}>Delete</button>
                                            </div>
                                            <hr/>
                                        </div>
                                    </div>
                                )
                            }
                            else {
                                return (
                                    <div className = "col-10 " key={review._id}>
                                        <Form type="edit" placeholder={review.review} onChange={onEditChange} onSubmit={onEditSubmit} reviewId = {review._id}/>
                                    </div>
                                )
                            }
                        })
                    }
                </div>

                <div className="col-10">
                    <Form onSubmit={onSubmit} onChange={onChange} type="new"/>
                </div>
            </div>
        </div>
    )
}

export default AlbumPage