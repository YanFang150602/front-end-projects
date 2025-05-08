import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigator from './Navigator';
import Home from './pages/home/Home';
import About from './pages/about/About';


const AppRouter: React.FC = () => {
    return (
        <main className='main'>
            <Router>
              <Navigator />
              <div className='container'>
                  <Routes>
                      <Route path="/" element={<Home />} index></Route>
                      <Route path="/about" element={<About />}></Route>
                  </Routes>
              </div>
          </Router>
        </main>
    )
}

export default AppRouter;
