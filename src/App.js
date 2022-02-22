import logo from './logo.svg';
import './App.css';
import { AnswersHeadlessProvider } from '@yext/answers-headless-react';
import { SearchBar } from '@yext/answers-react-components';

function App() {
  return (
    <div className="App">
      <div>hello</div>
      <AnswersHeadlessProvider
        apiKey='06812f79aa06d16a1c6b83d76b5b4350'
        experienceKey='national-parks'
        locale='en'
      >

        <SearchBar></SearchBar>
      </AnswersHeadlessProvider>
    </div>
  );
}

export default App;
