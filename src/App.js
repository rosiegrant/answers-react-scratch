import './App.css';
import { AnswersHeadlessProvider } from '@yext/answers-headless-react';
import Professionals from './pages/Professionals.tsx';
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Universal from './pages/Universal.tsx';

function App() {
  return (
    <div className="App">
      <Router>
        <AnswersHeadlessProvider
          apiKey='8feb7a0cdb9e035db0f5db3ab0cb048c'
          experienceKey='women-in-tech'
          locale='en'
        >
          <Routes>
            <Route path="/professionals" element={<Professionals />} />
            <Route path="/" element={<Universal />} />
          </Routes>
        </AnswersHeadlessProvider>
      </Router>
    </div>
  );
}

export default App;
