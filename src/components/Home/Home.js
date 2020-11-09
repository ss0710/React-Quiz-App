import React, { Fragment } from 'react';
import {Helmet} from 'react-helmet';
import './Home.css';
import Quiz from '../../assets/quiz.png';
import Laptop from '../../assets/laptop.png';
import { Link } from 'react-router-dom';
import buttonSound from '../../assets/audio/button-sound.mp3';

const Home = () => {

    const start = (e) => {
        console.log('start funstion clicked');
        document.getElementById('button-sound').play();
    }

    return(
        <Fragment>
            <Helmet><title>Quiz-App/Home</title></Helmet>
            <Fragment>
            <audio id="button-sound" src={buttonSound}></audio>
            </Fragment>
            <div className="Home-outerDiv">
                <div className="Home-innerDiv">
                <i className="questionmark" className="fa fa-question"></i>
                <br/>
                <img className="quiz-img" src={Quiz} /><br/>
                <img className="laptop-img" src={Laptop} /><br/>
                
                <Link onClick={start} to="/play/instructions"><button>START</button></Link>
                </div>
            </div>     
        </Fragment>
    );
}

export default Home;