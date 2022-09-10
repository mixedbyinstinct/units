import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import axios from 'axios';
import ReactDOM from 'react-dom';

const GlobalStyles = createGlobalStyle`
body {
    background-color: #ff7700;
    & h1 {
        font-family: system-ui;
        font-size: 32px;
        color: #171c26;
    }
    & p {
        font-family: system-ui;
        font-size: 18px;
        color: #171c26;
    }
    & input[type="text"] {
        background-color: #ffffff;
        font-family: system-ui;
        font-size: 18px;
        height: 36px;
        text-align: center;
        border-radius: 4px;
        color: #171c26;
        filter: drop-shadow(0 2px 4px #0c0e13);
    }
    & label {
        font-family: system-ui;
        color: #171c26;
        font-size: 18px;
        margin-bottom: 2vh;
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
background-color: #00aaff;
display: flex;
align-items: center;
justify-content: center;
padding: 10px;
margin-bottom: 20vh;
& h1 {
    color: #001119;
}
`;

const Display = styled.header`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: column nowrap;
    beight: 400px;
    width: 85vw;
    background-color: #171c26;
    padding: 8px;
    border-radius: 10px;
    margin-top: 5vh;
    border: 0.5px inset #803c00;
    & h1 {
        font-family: system-ui;
        font-size: 30px;
        color: #ffffff;

    }
    & p {
        color: #ffffff;
    }
`;

const Container = styled.div`
display: flex;
flex-flow: column nowrap;
justify-content: center;
align-items: center;
margin-top: 15vh;
padding: 10px;
flex-grow: 1;
`;

const Button = styled.button`
background-color: #171c26;
color: #ffffff;
font-family: system-ui;
margin-top: 5vh;
margin-bottom: 5vh;
height: 40px;
font-size: 16px;
border-radius: 6px;
border: none;
filter: drop-shadow(0 1px 4px #0c0e13);
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