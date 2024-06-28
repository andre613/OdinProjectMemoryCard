import { useCallback, useEffect, useState } from 'react';
import './App.css';
import GameInitializer from './components/GameInitializer';
import { Col, Container, Row } from 'react-bootstrap';
import { Photo, Photos, createClient } from 'pexels';

import GameSettings, { Difficulty } from './models/GameSettings';
import Board from './components/Board';
import HelpWidget from './components/HelpWidget';


const App: React.FC = () => {
  const [gameSettings, setGameSettings] = useState<GameSettings>({difficulty: null});
  const [photos, setPhotos] = useState<Photo[]>([]);
  const {difficulty} = gameSettings;

  let numRows: number;
  let numPhotos: number;

    switch(gameSettings.difficulty) {
      case Difficulty.Easy:
        numRows = 1;
        numPhotos = 10;
        break;

      case Difficulty.Normal:
      default:
        numRows = 2;
        numPhotos = 20;
        break;

      case Difficulty.Difficult:
        numRows = 3;
        numPhotos = 40;
        break;

      case Difficulty.Pro:
        numRows = 4;
        numPhotos = 80;
        break;
    }

  const getPhotos = useCallback((numPhotos: number) => {
    const pexelsClient = createClient(import.meta.env.VITE_PEXELS_API_KEY);

    pexelsClient.photos.curated({per_page: (numPhotos)})
    .then((result) => setPhotos((result as Photos).photos))
    .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    getPhotos(numPhotos);
  }, [numPhotos, getPhotos]);

  return (
    <>
      <Container fluid>
        <Row>
          <Col>
            <h2>{difficulty === null? "New" : Difficulty[difficulty]} game</h2>
          </Col>

          <Col style={{textAlign: 'right', paddingTop: '1em'}}>
            <GameInitializer gameSettings={gameSettings} setGameSettings={setGameSettings}/>&nbsp;
            <HelpWidget />
          </Col>


        </Row>
        
        <Container fluid style={{paddingTop: '1em'}}>
          { difficulty !== null && photos?.length > 0 &&
            <Board numRows={numRows} numColumns={4} photos={photos} />
          }
        </Container>
      </Container>
    </>
  );
};

export default App;