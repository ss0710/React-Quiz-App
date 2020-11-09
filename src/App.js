import './App.css';
import Home from './components/Home/Home';
import Instructions from './components/Instructions/Instructions';
import Play from './components/play/Play';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import QuizSummary from './components/quizsummary/Quizummary';
import 'materialize-css';


function App() {
  return (
    <Router>
      <Route path='/' exact component={Home} />
      <Route path="/play/instructions" exact component={Instructions} />
      <Route path="/play/quiz" exact component={Play} />
      <Route path="/play/quizSummary" exact component={QuizSummary} />
    </Router>
  );
}

export default App;