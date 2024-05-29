import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import './Top-performer.css'

function TopPerformer () {

    // student with the highest score in rack column that will be updated every end of term
    // the rank will trigger the right value to fill other column
    return (
        <div className="container-fluid">
            <div className="performer-col">
                <p>Top Performer</p>
                <FontAwesomeIcon className='ellipses-icon' icon={faEllipsis} />
            </div>
            <div className="date">
                <p>Week</p>
                <p>Month</p>
                <p>Year</p>
            </div>
            <div className=" row performer-details">
                <div className="phot-col col">
                    <p>Photo</p>
                    <div className="photo-1">
                        <img src="" alt="" />
                    </div>
                </div>
                <div className="name-col">
                    <p>Name</p>
                    <div className="name1">
                        <p></p>
                    </div>
                </div>
                <div className="id-col">
                    <p>ID Number</p>
                    <div className="id1">
                        <p></p>
                    </div>
                </div>
                <div className="class-col">
                    <p>Class</p>
                    <div className="class1">
                        <p></p>
                    </div>
                </div>
                <div className="Rank-col">
                    <p>Rank</p>
                    <div className="rank1">
                        <p></p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default TopPerformer;