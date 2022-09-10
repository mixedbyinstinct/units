import React from 'react';
import ReactDOM from 'react-dom';
import App from './app.jsx';

const Out = () => {
    return (
        <>
        <App />
        </>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Out />); 