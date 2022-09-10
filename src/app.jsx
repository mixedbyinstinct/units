import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import axios from 'axios';
import ReactDOM from 'react-dom';

const GlobalStyles = createGlobalStyle`
body {
    background-color: #d0faf9;
    & h1 {
        font-family: system-ui;
        font-size: 32px;
        color: #151919;
    }
    & p {
        font-family: system-ui;
        font-size; 18px;
        color: #151919;
    }
    & input[type="text"] {
        background-color: # d9fbfa;
        font-family: system-ui;
        font-size: 18px;
        height: 36px;
        text-align: center;
        border-radius: 4px;
        color: #151919;
    }
}
`;

const Display = styled.header`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: column nowrap;
    beight: 200px;
    width: 40vw;
    background-color: #bdf6d9;
    & h1 {
        font-family: system-ui;
        font-size: 40px;
        color: #3e5a65;

    }
`;

const Container = styled.div`
display: flex;
flex-flow: column nowrap;
justify-content: center;
align-items: center;
flex-grow: 1;
`;

const Button = styled.button`
background-color: #bae6fc;
color: #151919;
font-family: system-ui;
height: 28px;
font-size: 14px;
border-radius: 6px;
`;

const App = () => {
    const [script, setScript] = useState('');
    const [feet, setFeet] = useState('');
    const [meters, setMeters] = useState('');
    const [print, setPrint] = useState('');
    
    function getFeet(e) {
        setFeet(e.target.value);
    }
    function getScript(e) {
        setScript(e.target.value);
    }
    function convert() {
        let send = {
            number: feet,
            script: script,
        }
        axios.post("/convert", send).then(({data}) => {
            setPrint(data.message);
            setMeters(data.data);
        })
    }

    return (
        <Container>
            <GlobalStyles />
            <h1>Convert meters to feet</h1>
            <label>meters</label>
            <input type="text" onChange={getFeet} value={feet}/>
            <br /><label>script</label>
            <input type="text" onChange={getScript} value={script}/>
            <Button onClick={convert}>Convert</Button>
            <Display>
            <h1>{print}</h1>
            <p>{meters}</p>
            </Display>
        </Container>
    )
}

export default App;