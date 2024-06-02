import {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import './Noticeboard.css'


//creates a notice and display a created notice
// input + button
// we want to input an image, a text, select the date and have an ellipses for delete
//let the value for time hold today's dat
function Noticeboard (props) {
    const date = new Date();
    let monthTitle = ['Jan', 'Feb', 'Mar', 'Apr', 'June',
                            'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'
        ]

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let currentDate = `${year}-${"0" + month}-${day}`;
    const [image, setImage] = useState("");
    const [textValue, setTextValue] = useState("");
    const [dateValue, setDateValue] = useState("");
    const [submitPost, setSubmitPost] = useState("not-active");

    // handles image upload
    const handleImage = (e) => {
        console.log(e.target.files[0]);
        let reader = new FileReader();
        reader.onload = () => {
            console.log(reader.result)
            setImage(reader.result);
        }
        if (e.target.files[0]) {
           reader.readAsDataURL(e.target.files[0]);
        }
    }

    // handles text upload
    const handleText = (e) => {
        setTextValue(e.target.value)
    }
    // handles date upload
    const handleDateUpload = (e) => {
        setDateValue(e.target.value);
    }
    // handle submit and also check how to add new post without erasing old post and handle delete also
    const handleSubmit = () => {
        setSubmitPost("post-active")
    }
    return (
        <div className="container-fluid notice-board">
            <div className="notice-col">
                <div className="notice-text">
                    <p>Notice Board</p>
                    <button className='ellipses' onClick={props.ptoggle}><FontAwesomeIcon className='ellipses-icon' icon={faEllipsis} /></button>
                </div>
                <p>Create a notice of find a message for you!</p>
                <div className={`notice-con ${submitPost}`}>
                    <div className="notice-container">
                        <div className="post-image"><img src={image} /></div>
                        <div className='post-text'><p>{textValue}</p></div> 
                        <p className="post-date">{dateValue}</p>
                    </div>
                </div>
                <div style={props.pdisplay} className="input-notice">
                    <form className='notice-form' action="" method="post">
                        <div className="file">
                            <label htmlFor="story-image">Select an image</label>
                            <input type="file" accept='image/*' onChange={handleImage} name="story-image" id="story-image" />
                        </div>
                        <input type="text" name="text" id="text" onChange={handleText} placeholder='write your article' />
                        <input type="date" onChange={handleDateUpload} value={`${currentDate}`} name="date" id="date" />
                        <input type='button' onClick={handleSubmit} value="Post" />
                    </form>
                </div>
                
            </div>
        </div>
        
    )
}

export default Noticeboard

// Main colours
// F56314 - orange
// 002A22 - darkgreen
// Accent colours
// F5F8DE