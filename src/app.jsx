import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import axios from 'axios';
import ReactDOM from 'react-dom';

const GlobalStyles = createGlobalStyle`
body {
    & h1 {
        font-family: system-ui;
        font-size: 32px;
    }
    & p {
        font-family: system-ui;
        font-size; 18px;
    }
    & input[type="text"] {
        font-family: system-ui;
        font-size: 18px;
        height: 36px;
        text-align: center;
        border-radius: 4px;
    }
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
background-color: LightSeaGreen;
color: #EEECED;
font-family: system-ui;
height: 28px;
font-size: 14px;
border-radius: 6px;
`;

const App = () => {
    const [feet, setFeet] = useState('');
    const [meters, setMeters] = useState('');
    const [print, setPrint] = useState('');
    
    function getFeet(e) {
        setFeet(e.target.value);
    }
    function convert() {
        let send = {
            number: feet,
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
            <Button onClick={convert}>Convert</Button>
            <p>{print}</p>
            <p>{meters}</p>
        </Container>
    )
}

export default App;