import React from 'react';
import './instructions.css';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const Instructions = () => {
    return(
        <React.Fragment>
            <Helmet><title>Quiz-App/Instructions</title></Helmet>
            <div className="inst_outerDiv">
                <div className="inst_innerdiv">
                    <div className="inst_headings">
                    <h1>Instructions</h1>
                    <h3>Read all the instructions carefully</h3>
                    </div>
                    <div className="inst_list">
                        <ul>
                            <li className="list_li">
                                <p>You will get 5 minutes to complete the Quizz.</p>
                            </li>
                            <li className="list_li">
                                <p>The Quiz consist of 15 questions.</p>
                            </li>
                            <li className="list_li">
                                <p>Each questions consist 4 options.</p>
                            </li>
                            <li className="list_li">
                                <p>Be carefull while marking answers, Once you select the answer then you cannot change it.</p>
                            </li>
                            <li className="list_li">
                                <p>You will get three hints for each game</p>
                            </li>
                            <li className="list_li">
                                <p>Using hint will remove one wrong answer.</p>
                            </li>
                        </ul>
                    </div>
                    <div className="inst_buttons">
                            <Link to="/play/quiz"><button>START THE QUIZZ</button><br/></Link>
                            <Link to="/"><button>HOME PAGE</button></Link>
                    </div>
                </div>
            </div>
            
        </React.Fragment>
    );
}

export default Instructions;