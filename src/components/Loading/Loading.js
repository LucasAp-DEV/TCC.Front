import loader from '../Loading/loader.svg'
import './Loading.css'


function Loading() {
    return (
        <div className="loader_container">
            <img className="loader" src={loader} alt="Loading"/>
        </div>
    )
}

export default Loading;