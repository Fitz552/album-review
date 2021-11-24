

function Form(props) {
    let placeholder = ""
    let formId = "newReview"
    if (props.type === "new") {
        placeholder= "Leave a New Review"
    }
    else {
        placeholder = props.placeholder
        formId = `form-${props.reviewId}`
    }

    
    return(
    <form onSubmit={props.onSubmit} id = {formId} className="row d-flex">
        <div>
            <label htmlFor="grade">Rating</label>
            <select className="m-2 col-1" id="grade" name="grade" onChange={props.onChange} required>
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
                <option value='4'>4</option>
                <option value='5'>5</option>
            </select>
        </div>
        <textarea className = "m-2 form-control"  name="review" placeholder={placeholder} onChange={props.onChange} required></textarea>
        <div className="m-2 col d-flex justify-content-center">
            <button className="btn btn-light btn-sm">Submit Review</button>
        </div>
    </form>
    )
}

export default Form