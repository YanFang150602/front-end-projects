import React from 'react';
import AppRouter from './AppRouter';
// import './globalStyle.less'

const App: React.FC = () => {
    return (
        <div className='app'>
            <AppRouter />
        </div>
    );
}

export default App;
