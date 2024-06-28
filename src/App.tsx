import { useState } from 'react';
import './App.css';
import GameInitializer from './components/GameInitializer';
import { Col, Container, Row } from 'react-bootstrap';
import GameSettings, { Difficulty } from './models/GameSettings';
import Board from './components/Board';

const App: React.FC = () => {
  const [gameSettings, setGameSettings] = useState<GameSettings>({difficulty: null});
  
  let dimSize: number;

  switch(gameSettings.difficulty) {
    case Difficulty.Easy:
      dimSize = 3;
      break;

    case Difficulty.Normal:
    default:
      dimSize = 5;
      break;

    case Difficulty.Difficult:
      dimSize = 8;
      break;

    case Difficulty.Pro:
      dimSize = 10;
      break;
  }

  return (
    <>
      <Container fluid>
        <Row>
          <Col>
            <h2>{gameSettings.difficulty === null? "New" : Difficulty[gameSettings.difficulty]} game</h2>
          </Col>
        </Row>
        
        <GameInitializer gameSettings={gameSettings} setGameSettings={setGameSettings}/>
        
        <Container fluid>
          <Board numRows={dimSize} numColumns={dimSize}/>
        </Container>
      </Container>
    </>
  );
};

export default App;