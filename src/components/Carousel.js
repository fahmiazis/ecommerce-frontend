import React from 'react'
import {Container} from 'reactstrap'
import a2 from '../img/a2.png'
import a3 from '../img/a3.png'

class Slider extends React.Component{
    render(){
        return(
            <>
                <Container>
                    <div id="slide" className="carousel slide" data-ride="carousel">
                        <ol className="carousel-indicators">
                            <li data-target="#slide" data-slide-to="0" className="active"></li>
                            <li data-target="#slide" data-slide-to="1" ></li>
                            <li data-target="#slide" data-slide-to="2" ></li>
                        </ol>
                        <div className="carousel-inner flex-row">
                            <div className="carousel-item active">
                                <img src={a2} className="d-block width-100%" alt="a2"/>
                            </div>
                            <div className="carousel-item">
                                <img src={a3} className="d-block" alt="a3"/>
                            </div>
                            <div className="carousel-item">
                                <img src={a2} className="d-block" alt="a2"/>
                            </div>
                        </div>
                        <a className="carousel-control-prev" href="#slide" role="button" data-slide="prev">
                            <span className="corousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="sr-only">Previous</span>
                        </a>
                        <a className="carousel-control-next" href="#slide" role="button" data-slide="next">
                            <span className="corousel-control-next-icon" aria-hidden="true"></span>
                            <span className="sr-only">Next</span>
                        </a>
                    </div>
                </Container>
            </>
        )
    }
}



 export default Slider