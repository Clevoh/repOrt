import './Blur.css'

function Blur(props) {
    return (
        <div className={`${props.pblur ? 'blur-active' : ''}`}>
        </div>
    )
}

export default Blur;