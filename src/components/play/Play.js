import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import './play.css';
import questions from '../../questions.json';
import isEmpty from '../../utils/is-Empty';
import  M from 'materialize-css';
import correctNotification from '../../assets/audio/correct-answer.mp3';
import wrongNotification from '../../assets/audio/wrong-answer.mp3';
import buttonSound from '../../assets/audio/button-sound.mp3';
import swal from 'sweetalert';

class Play extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            questions,
            currentQuestion : {},
            nextQuestion : {},
            previousQuestion: {},
            answer: '',
            numberOfQuestions: 0,
            numberOfAnsweredQuestion: 0,
            currentQuestionIndex: 0,
            score: 0,
            correctAnswers: 0,
            wrongAnswers: 0,
            hints: 5,
            previousRandomNumbers: [],
            time:{}
        };

        this.interval = null;

        this.handleOptionClick = this.handleOptionClick.bind(this);
        this.handleButtonClick = this.handleButtonClick.bind(this);
    }

    componentDidMount () {
        this.displayQuestions(this.state.questions, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion)
        this.startTimer();
    }

    componentWillUnmount () {
        clearInterval(this.interval);
    }

    displayQuestions = (questions = this.state.questions, currentQuestion, nextQuestion, previousQuestion) => {
        let { currentQuestionIndex } = this.state;
        if(!isEmpty(this.state.questions)){
            questions = this.state.questions;
            currentQuestion = questions[currentQuestionIndex];
            nextQuestion = questions[currentQuestionIndex + 1];
            previousQuestion = questions[currentQuestionIndex - 1];
            const answer = currentQuestion.answer;
            this.setState({
                    currentQuestion,
                    nextQuestion,
                    previousQuestion,
                    numberOfQuestions: questions.length,
                    answer,
                    previousRandomNumbers: []
            },() => {
                this.showOptions();
            });
        }
    };

    handleOptionClick = (e) => {
        if(e.target.innerHTML.toLowerCase() === this.state.answer.toLowerCase())
        {
            document.getElementById('correct-answer').play();
            this.correctAnswer();
        }else{
            document.getElementById('wrong-answer').play();
            this.wrongAnswer();
        }
    }

    handleButtonClick = () => {
        this.playButtonSound();
        swal({
            title: "Are you sure?",
            text: "Are you sure that you want to leave this page?",
            icon: "warning",
            dangerMode: true,
          })
          .then(willDelete => {
            if (willDelete) {
                this.props.history.push('/');
            }
          });
    }

    playButtonSound = () => {
        document.getElementById('button-sound').play();
    }

    correctAnswer = () => {
        M.toast({
            html: 'Correct Answer',
            classes: 'toast-valid',
            displayLength: 1500
        })
        this.setState(prevState =>({
            score: prevState.score +1,
            correctAnswers: prevState.correctAnswers +1,
            currentQuestionIndex: prevState.currentQuestionIndex +1,
            numberOfAnsweredQuestion: prevState.numberOfAnsweredQuestion +1
        }), () => {
            if(this.state.nextQuestion === undefined){
                this.endGame();
            }else{
                this.displayQuestions(this.state.questions, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion);
            } 
        });
    }

    wrongAnswer = () => {
        navigator.vibrate(300);
        M.toast({
            html: 'Wrong Answer!',
            classes: 'toast-invalid',
            displayLength: 1500
        })
        this.setState(prevState =>({
           wrongAnswers: prevState.wrongAnswers +1,
           currentQuestionIndex: prevState.currentQuestionIndex +1,
           numberOfAnsweredQuestion: prevState.numberOfAnsweredQuestion +1
        }), () => {
            if(this.state.nextQuestion === undefined){
                this.endGame();
            }else{
                this.displayQuestions(this.state.questions, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion);
            }  
        });
    }

    showOptions = () => {
        const options = Array.from(document.querySelectorAll('.option'));

        options.forEach(option => {
            option.style.visibility = 'visible';
        });
    }

    handleHints = () => {

            if(this.state.hints>0){

                const options = Array.from(document.querySelectorAll('.option'));
            let indexOfAnswer;

            options.forEach((option, index) => {
                if(option.innerHTML.toLowerCase() === this.state.answer.toLowerCase()){
                    indexOfAnswer = index;
                }
            });

            while(true){
                const randomNumber = Math.round(Math.random() * 3);
                if(randomNumber !== indexOfAnswer && !this.state.previousRandomNumbers.includes(randomNumber)){
                    options.forEach((option, index) => {
                        if(index === randomNumber){
                            option.style.visibility = 'hidden';
                            this.setState((prevState) => ({
                                hints: prevState.hints -1,
                                previousRandomNumbers: prevState.previousRandomNumbers.concat(randomNumber)
                            }));
                        }     
                    });
                    break;
                }
                if(this.state.previousRandomNumbers.length >= 3){
                    break;
                }
            }

            }
    }

    startTimer = () => {
        const countDownTime = Date.now() + 120000;
        this.interval = setInterval(() => {
            const now = new Date();
            const distance = countDownTime - now;

            const minutes = Math.floor((distance % (1000 *60 *600)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000* 60))/ 1000);

            if(distance<0){
                clearInterval(this.interval);
                this.setState({
                    time : {
                        minutes: 0,
                        seconds: 0
                    }
                }, () => {
                    this.endGame();
                });
            }else{
                this.setState({
                    time : {
                        minutes,
                        seconds
                    }
            })
        }
        },1000);
    }

    endGame = () => {
        swal("quiz has ended","Now you can view your results","success");
        const { state } = this;
        const playerStats = {
            score: state.score,
            numberOfQuestions: state.numberOfQuestions,
            numberOfAnsweredQuestion: state.numberOfAnsweredQuestion,
            correctAnswers: state.correctAnswers,
            wrongAnswers: state.wrongAnswers,
            hintsUsed: 5 - state.hints
        };
        console.log(playerStats); 
        setTimeout(()=>{
            this.props.history.push("/play/quizSummary", playerStats);
        },1000)  
    }

    render() {
        
        const { currentQuestion, currentQuestionIndex, numberOfQuestions, hints, time } = this.state;

        return(
            <Fragment>
                <Helmet><title>Quiz-App/quiz</title></Helmet>
                <Fragment>
                    <audio id="correct-answer" src={correctNotification}></audio>
                    <audio id="wrong-answer" src={wrongNotification}></audio>
                    <audio id="button-sound" src={buttonSound}></audio>
                </Fragment>
                <div className="questions-container">
                <div className="questions">
                    <div className="lifeline-container">
                        <p className="lifeline-hint">
                            <span onClick={this.handleHints}><i className="fa fa-lightbulb-o fa-3x hints-icon" aria-hidden="true"></i></span>{hints}
                        </p>
                        <p className="lifeline-count">
                            {currentQuestionIndex + 1} of {numberOfQuestions}
                        </p>
                    </div>
                    <div className="timer-container">
                    <p><i className="fa fa-clock-o" aria-hidden="true"></i>{time.minutes}:{time.seconds}</p>
                    </div>
                    <div className="question-div">
                    <h5>{currentQuestion.questions}</h5>
                    </div>
                    <div className="options-container">
                        <p onClick={this.handleOptionClick} className="option">{currentQuestion.optionA}</p>
                        <p onClick={this.handleOptionClick} className="option">{currentQuestion.optionB}</p>
                        <p onClick={this.handleOptionClick} className="option">{currentQuestion.optionC}</p>
                        <p onClick={this.handleOptionClick} className="option">{currentQuestion.optionD}</p>
                    </div>
                    <div className="quit-button-container">
                        <button id="quit-button" onClick={this.handleButtonClick}>Quit</button>
                    </div>
                </div>
                </div>
            </Fragment>
        );
    }
}

export default Play;