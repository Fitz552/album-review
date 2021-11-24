import {Link} from "react-router-dom"

function Navbar() {
    return (
        <div className = "row brand d-flex justify-content-between p-1">
            <div className="col align-self-center">
                <Link to="/" className="clean">
                    <p className="h4 text-light logo"><strong>ReviewIt</strong></p>
                </Link>
            </div>
            <div className="col d-flex justify-content-end align-self-center">
                <div className="row ">
                    <Link to="/albuns" className="col clean">
                        <p className="text-light">Albuns</p>
                    </Link>
                    <Link to="/" className="col clean">
                        <p className="text-light">Home</p>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Navbar