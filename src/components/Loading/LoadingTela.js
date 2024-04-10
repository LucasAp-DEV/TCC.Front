import loader from '../Loading/loader.svg'
import './LoadingTela.css'


function LoadingTela() {
    return (
        <div className="loaderTela_container">
            <img className="loaderTela" src={loader} alt="Loading"/>
        </div>
    )
}

export default LoadingTela;