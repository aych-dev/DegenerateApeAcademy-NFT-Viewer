import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AcademyImage from './Images/DegenerateApeAcademyLogo.png';
import styled from 'styled-components';
import { Card, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  const [apeData, setApeData] = useState([]);
  const [apeId, setApeId] = useState('TAP TO BEGIN');
  const [apeImage, setApeImage] = useState(AcademyImage);

  useEffect(() => {
    const getMetadata = async () => {
      const { data } = await axios.get('https://aychserver.herokuapp.com/api');
      setApeData(data);
    };
    getMetadata();
  }, []);

  // Selects random index of the apeData array
  const randomIndex = () => {
    return Math.floor(Math.random() * apeData.length);
  };

  // Generates random ape image and ape ID
  const handleClick = () => {
    const randomApe = apeData[randomIndex()];
    setApeImage(randomApe.offChainData.image);
    setApeId(randomApe.offChainData.name);
  };

  return (
    <MainContainer>
      <Container>
        <MainCard text='white' bg='dark'>
          <CardImg
            onClick={handleClick}
            src={apeImage}
            alt='Degenerate Ape Academy'
          />
          <Card.Body>
            <Card.Title className='text-center' as='h2'>
              {apeId}
            </Card.Title>
          </Card.Body>
        </MainCard>
      </Container>
    </MainContainer>
  );
}

const MainContainer = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #28282b;
`;

const CardImg = styled(Card.Img)`
  height: 500px;
  weight: 500px;
  border-radius: 30px;
  cursor: pointer;
  padding: 10px;

  @media only screen and (device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) {
    height: 385px;
    width: 385px;
  }

  @media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) {
    height: 360px;
    width: 360px;
  }
`;

const MainCard = styled(Card)`
  border-radius: 20px;
  font-family: 'Bangers', 'cursive';

  @media only screen and (device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) {
    display: grid;
    justify-content: center;
    align-items: center;
    margin: auto;
    width: 390;
  }
`;
