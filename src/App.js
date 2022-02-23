import logo from './logo.svg';
import './App.css';
import { AnswersHeadlessProvider } from '@yext/answers-headless-react';
import ParksPage from './pages/ParksPage.tsx';
function App() {
  return (
    <div className="App">
      <div>hello</div>
      <AnswersHeadlessProvider
        apiKey='06812f79aa06d16a1c6b83d76b5b4350'
        experienceKey='national-parks'
        locale='en'
        verticalKey='locations'
      >

        <ParksPage/>
        
      </AnswersHeadlessProvider>
    </div>
  );
}

export default App;
