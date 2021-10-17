import './App.css';
import { useState } from 'react'
import axios from 'axios';
import arrayShuffle from 'array-shuffle';
import FadeIn from 'react-fade-in';


function App() {

  const [currentQuestion, next] = useState(0)
  const [answer, newAnswer] = useState()
  const [wrong1, newWrong1] = useState()
  const [wrong2, newWrong2] = useState()
  const [wrong3, newWrong3] = useState()
  const [score, newScore] = useState(0)


  const [order, newOrder] = useState([''])


  function checkAnswer(name) {

    if (document.getElementById(name).innerText === answer) {
      newScore(score + 1)
      newGame()


    } else {
      document.getElementById('askidng').style.display = 'grid'
      document.getElementById('asking').style.display = 'none'
      document.getElementById('menu').style.display = 'none'
      newScore(0)
    }
  }



  function newGame() {
    var liszzz = [answer, wrong1, wrong2, wrong3]
    liszzz = ''
    console.log(liszzz)
    console.log(document.getElementById('questionTypeSelect').value)
    const link = 'https://opentdb.com/api.php?amount=1&category=' + document.getElementById('questionTypeSelect').value + '&type=multiple'
    axios.get(link).then(
      function (response) {
        next(((response.data.results[0].question).replace(/&quot;/g, '"')).replace(/&#039;/g, ''))
        newAnswer(((response.data.results[0].correct_answer).replace(/&quot;/g, '"')).replace(/&#039;/g, ''))
        newWrong1(((response.data.results[0].incorrect_answers[0]).replace(/&quot;/g, '"')).replace(/&#039;/g, ''))
        newWrong2(((response.data.results[0].incorrect_answers[1]).replace(/&quot;/g, '"')).replace(/&#039;/g, ''))
        newWrong3(((response.data.results[0].incorrect_answers[2]).replace(/&quot;/g, '"')).replace(/&#039;/g, ''))


        const good = [
          (((response.data.results[0].correct_answer).replace(/&quot;/g, '"')).replace(/&#039;/g, '')),
          (((response.data.results[0].incorrect_answers[0]).replace(/&quot;/g, '"')).replace(/&#039;/g, '')),
          (((response.data.results[0].incorrect_answers[1]).replace(/&quot;/g, '"')).replace(/&#039;/g, '')),
          (((response.data.results[0].incorrect_answers[2]).replace(/&quot;/g, '"')).replace(/&#039;/g, ''))
        ]

        newOrder(arrayShuffle(good))

      }

    ).catch(console.error(

    ));
    reviewAnswer()
  }


  function reviewAnswer() {
    document.getElementById('asking').style.display = 'block'
    document.getElementById('menu').style.display = 'none'
    document.getElementById('askidng').style.display = 'none'

  }


  return (
    <div className="App">
      <div id='menu' className='main'>
        <div className='form'>
          <div id='questionType'>
            <h1> Category: </h1>
            <select id='questionTypeSelect'>
              <option value="9">General Knowledge</option>
              <option value="10">Entertainment: Books</option>
              <option value="11">Entertainment: Film</option>
              <option value="12">Entertainment: Music</option>
              <option value="13">Entertainment: Musicals</option>
              <option value="14">Entertainment: Television</option>
              <option value="15">Entertainment: Video Games</option>
              <option value="16">Entertainment: Board Games</option>
              <option value="17">Science  Nature</option>
              <option value="18">Science: Computers</option>
              <option value="19">Science: Mathematics</option>
              <option value="20">Mythology</option>
              <option value="21">Sports</option>
              <option value="22">Geography</option>
              <option value="23">History</option>
              <option value="24">Politics</option>
              <option value="25">Art</option>
              <option value="26">Celebrities</option>
              <option value="27">Animals</option>
              <option value="28">Vehicles</option>
              <option value="29">Entertainment: Comics</option>
              <option value="30">Science: Gadgets</option>
              <option value="31">Entertainment: Japanese Anime</option>
              <option value="32">Entertainment: Cartoon; Animations</option>
            </select>
            <button onClick={() => newGame()} id='submit'>Continue</button>
          </div>

        </div>

      </div>
      <div id="asking" className='main'>
        <div id='score'>Score : {score}</div>
        <FadeIn>
          <div id='travia' className='travia'>
            <div id='traviaQuestion'><mark id='nice'>{currentQuestion}</mark></div>
            <div id='traviaMultipleChoice'>
              <button id="1" onClick={() => checkAnswer('1')}>
                <p>{order[0]}</p>
              </button >
              <button id="2" onClick={() => checkAnswer('2')}>
                <p>{order[1]}</p>
              </button>
              <button id="3" onClick={() => checkAnswer('3')}>
                <p>{order[2]}</p>
              </button>
              <button id="4" onClick={() => checkAnswer('4')}>
                <p>{order[3]}</p>
              </button>
            </div>
          </div>
        </FadeIn>

      </div>
      <div id="askidng" className='main'>
        <h1 id='gameover'>
          Game over
          <p> The correct answer was  {answer}</p></h1>
        <button onClick={() => newGame()} className='newSub' id='submit'>Continue</button>


      </div>
    </div>
  );
}

export default App;
