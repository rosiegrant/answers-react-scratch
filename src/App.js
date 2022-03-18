import './App.css';
import { AnswersHeadlessProvider } from '@yext/answers-headless-react';
import WomenInTech from './pages/women.tsx';
function App() {
  return (
    <div className="App">

      <AnswersHeadlessProvider
        apiKey='8feb7a0cdb9e035db0f5db3ab0cb048c'
        experienceKey='women-in-tech'
        locale='en'
        verticalKey='professionals'
      >

        <WomenInTech />

      </AnswersHeadlessProvider>
    </div>
  );
}

export default App;
