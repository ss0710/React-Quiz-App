import React from 'react';
import './quizSummary.css';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

class QuizSummary extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            score: 0,
            numberOfQuestions: 0,
            numberOfAnsweredQuestions: 0,
            correctAnswers: 0,
            wrongAnswers: 0,
            usedHints: 0
        };
    }

    componentDidMount () {
        const { state } = this.props.location;
        if(state.score !== undefined)
        {
            this.setState({
                score: (state.score / state.numberOfQuestions) * 100,
                numberOfQuestions: state.numberOfQuestions,
                numberOfAnsweredQuestions: state.numberOfAnsweredQuestion,
                correctAnswers: state.correctAnswers,
                wrongAnswers: state.wrongAnswers,
                usedHints: state.hintsUsed
            });
        }  
    }

    

    render(){
        return (
            <React.Fragment>
                <Helmet><title>QuizSummary</title></Helmet>
                <div className="summary-outer-div">
                    <div className="summary-inner-div">
                        <div className="result-icon">
                        <i className="fas fa-trophy fa-4x trophy"></i><i className="fas fa-poll-h fa-5x result"></i>
                        </div>
                        <div className="result-heading">
                            <h3>RESULTS</h3>
                        </div>
                        <div className="score-div">
                            <h2>SCORE: {Math.round(this.state.score)}</h2>
                        </div>
                        <div className="summary-details">
                            <ul>
                                <li>TOTAL QUESTIONS: {this.state.numberOfQuestions}</li>
                                <li>NO OF ANSWERED QUESTIONS: {this.state.numberOfAnsweredQuestions}</li>
                                <li>CORRECT ANSWERS: {this.state.correctAnswers}</li>
                                <li>WRONG ANSWERS: {this.state.wrongAnswers}</li>
                                <li>HINTS USED: {this.state.usedHints}</li>
                            </ul>
                        </div>
                        <div className="summary-buttons">
                            <Link to="/"><button>Home</button></Link>
                            <Link to="/play/instructions"><button>Try Again</button></Link>
                        </div>
                    </div>
                </div>     
            </React.Fragment>
        );
    }
}

export default QuizSummary;