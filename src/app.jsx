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
    & label {
        font-family: system-ui;
        color: #101619;
        font-size: 14px;
    }
}
`;

const Jumbotron = styled.header`
height: 10vh;
width: 100%;
position: absolute;
top: 0;
left: 0;
border-bottom-left-radius: 10px;
border-bottom-right-radius: 10px;
z-index: 6;
filter: drop-shadow(0 3px 4px #171c26);
background-color: #9ce0fc;
display: flex;
align-items: center;
justify-content: center;
padding: 10px;
margin-bottom: 20vh;
& h1 {
    color: #171c26;
}
`;

const Display = styled.header`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: column nowrap;
    beight: 200px;
    width: 85vw;
    background-color: #bdf6d9;
    padding: 8px;
    & h1 {
        font-family: system-ui;
        font-size: 30px;
        color: #2a3232;

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
            scriptChoice: script,
        }
        axios.post("/convert", send).then(({data}) => {
            setPrint(data.message);
            setMeters(data.data);
        })
    }

    return (
        <>
        <GlobalStyles />
        <Jumbotron>
            <h1>Unit Converter</h1>
        </Jumbotron>
        <Container>
            <label>Amount</label>
            <input type="text" onChange={getFeet} value={feet}/>
            <br /><label>Units</label>
            <input type="text" onChange={getScript} value={script}/>
            <Button onClick={convert}>Convert</Button>
            <Display>
            <h1>{print}</h1>
            <p>{meters}</p>
            </Display>
        </Container>
        </>
    )
}

export default App;