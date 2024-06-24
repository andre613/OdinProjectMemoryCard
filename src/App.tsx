import { useState } from 'react';
import './App.css';
import GameInitializer from './components/GameInitializer';
import { Col, Container, Row } from 'react-bootstrap';
import GameSettings, { Difficulty } from './models/GameSettings';

const App: React.FC = () => {
  const [gameSettings, setGameSettings] = useState<GameSettings>({difficulty: Difficulty.Normal});

  return (
    <>
      <Container fluid>
        <Row>
          <Col>
            <h2>{Difficulty[gameSettings.difficulty]} game</h2>
          </Col>
        </Row>
        <GameInitializer gameSettings={gameSettings} setGameSettings={setGameSettings}/>
      </Container>
    </>
  );
};

export default App;