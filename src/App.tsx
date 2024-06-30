import { useCallback, useEffect, useState } from 'react';
import './App.css';
import GameInitializer from './components/GameInitializer';
import { Col, Container, Row } from 'react-bootstrap';
import { Photo, Photos, createClient } from 'pexels';

import GameSettings, { Difficulty } from './models/GameSettings';
import Board from './components/Board';
import HelpWidget from './components/HelpWidget';
import HighScoreBoard from './components/HighScoreBoard';


const App: React.FC = () => {
  const [gameSettings, setGameSettings] = useState<GameSettings>({difficulty: null});
  const [clickedPhotoIds, setClickedPhotoIds] = useState<number[]>([]);
  const [score, setScore] = useState<number>(0);
  const [isGameInitializing, setIsGameInitializing] = useState<boolean>(false);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
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

  const handleOnInit = (gameSettings: GameSettings): void => {
    setIsGameOver(false);
    setGameSettings(gameSettings);
    setClickedPhotoIds([]);
    setScore(0);
  };

  const handleCardClick = (photoId: number): void => {
    if(clickedPhotoIds.indexOf(photoId) === -1) {
      setClickedPhotoIds([...clickedPhotoIds, photoId]);
      setScore((prev) => prev + 1);
    }
    else {
      setIsGameOver(true);
    }
  };

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
            <GameInitializer
              gameSettings={gameSettings}
              onInit={handleOnInit}
              isInitializing={isGameInitializing}
              setIsInitializing={setIsGameInitializing}
            />&nbsp;

            <HelpWidget isNewGame={difficulty === null} setIsInitializing={setIsGameInitializing} />

            <HighScoreBoard
              isGameOver={isGameOver}
              latestGameScore={score}
              setIsGameInitializing={setIsGameInitializing}
            />
          </Col>


        </Row>
        
        <Container fluid style={{paddingTop: '1em'}}>
          { difficulty !== null && photos?.length > 0 &&
            <Board numRows={numRows} numColumns={4} photos={photos} onCardClick={handleCardClick} currentScore={score}/>
          }
        </Container>
      </Container>
    </>
  );
};

export default App;