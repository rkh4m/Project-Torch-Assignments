import logo from '../logo.svg';
import { useState, useEffect, useRef, useMemo } from 'react';
import '../App.css';
import '../css/landing_page.css';

function LandingPage() {
  const sentences = useMemo(() => [
    'Hello Everyone!',
    'My name is Rumi Khamidov.',
    'Welcome to my Personal Website!',
  ], []);
  const [sentenceInd, setSentenceInd] = useState(0);
  const sentenceIndRef = useRef(sentenceInd);

  useEffect(() => {
    sentenceIndRef.current = sentenceInd;
  }, [sentenceInd]);

  const [text, setText] = useState(sentences[sentenceInd]);

  useEffect(() => {
    const timer = setTimeout(() => {
      let newSentenceInd = sentenceIndRef.current + 1;
      if(newSentenceInd >= sentences.length) return;
      if(newSentenceInd === sentences.length - 1){
        restartAnimation(true);
      } else {
        restartAnimation(false);
      }
      setSentenceInd(newSentenceInd);
    }, 9000); // Adjust the delay as needed

    return () => clearTimeout(timer); // Clean up the timer
  }, [sentenceInd, sentences.length]); // Re-run the effect when `sentenceInd` changes

  useEffect(() => {
    setText(sentences[sentenceInd]); // Update the text when `sentenceInd` changes
  }, [sentenceInd, sentences]);

  const restartAnimation = (last_sentence) => {
      const sentence = document.querySelector('.sentence');
      if (sentence) {
        sentence.classList.remove("sentence");
        void sentence.offsetWidth;
        if(last_sentence){
          sentence.classList.add("last-sentence");
        } else {
          sentence.classList.add("sentence");
        }
      }
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div class="typewriter">
            <h1 className='sentence'>{text}</h1>
        </div>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default LandingPage;