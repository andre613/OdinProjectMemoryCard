import { useEffect, useState } from 'react';
import HighScore from '../models/HighScore';
import { Button, Col, Container, Form, InputGroup, Modal, Row } from 'react-bootstrap';
import { GiCheckMark } from 'react-icons/gi';


interface HighScoreBoardProps {
  isGameOver: boolean;
  latestGameScore: number;
  onStartNewGameButtonClick: () => void;
}

const HighScoreBoard: React.FC<HighScoreBoardProps> = ({isGameOver, latestGameScore, onStartNewGameButtonClick}) => {
  const [isVisible, setIsVisible] = useState(isGameOver);
  const [highScores, setHighScores] = useState<HighScore[]>([]);
  const [isEnteringHighScore, setIsEnteringHighScore] = useState<boolean>(false);
  const [playerName, setPlayerName] = useState<string>('');

  const currentScoreIsHighScore = latestGameScore > Math.min(... highScores.map(hs => hs.score)) ||
    highScores.length < 10;

  const sortedHighScores = highScores.sort((left, right) => {

    if(left.score > right.score) {
      return -1;
    }

    if(left.score < right.score) {
      return 1;
    }

    return 0;
  });

  const handlePlayerNameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPlayerName(e.target.value);
  };

  const handleSaveHighScore = (): void =>{
    const newHighScore: HighScore = {playerName: playerName, score: latestGameScore};
    let newHighScores: HighScore[];

    if(highScores.length < 10){
      newHighScores = [...highScores, newHighScore]
    }
    else{
      newHighScores = [...sortedHighScores];
      newHighScores.splice(sortedHighScores.length -1, 1, newHighScore);
    }

    setHighScores(newHighScores);
    localStorage.setItem('highScores', JSON.stringify(newHighScores));
    setIsEnteringHighScore(false);
  };

  const handleStartNewGameButtonClick = (): void => {
    onStartNewGameButtonClick();
    setIsVisible(false);
  };

  useEffect(() => {
    const serializedHighScores = localStorage.getItem('highScores');

    if(serializedHighScores !== null) {
      setHighScores(JSON.parse(serializedHighScores));
    }

    if(currentScoreIsHighScore) {
      setIsEnteringHighScore(true);
    }
  }, [currentScoreIsHighScore]);

  useEffect(() => {
    setIsVisible(isGameOver);
  }, [isGameOver]);

  return(
    <>
      <Modal show={isVisible} backdrop="static" keyboard={false}>
        <Modal.Header>
          <Modal.Title>Game Over!</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {isEnteringHighScore &&
            <>
              <p>Congratulations on making the High-Score list!</p>
              <Form>
                <InputGroup>
                  <Form.Control
                    type="text"
                    placeholder="Enter your name for Glory!"
                    autoFocus
                    onChange={handlePlayerNameChange}
                  />&nbsp;

                  <Button variant="outline-primary" size="sm" onClick={handleSaveHighScore}><GiCheckMark /></Button>
                </InputGroup>
              </Form>
            </>
          }
          {!isEnteringHighScore &&
            <>
              <Container style={{textAlign: 'center'}}>
                <Row>
                  <Col>
                    <h5>High Scores</h5>
                  </Col>
                </Row>

                {sortedHighScores.map((hs: HighScore, index: number) => (
                  <Row key={`highScore_${index}`}>
                    <Col>
                      {hs.playerName}
                    </Col>

                    <Col>
                      {hs.score}
                    </Col>
                  </Row>
                ))}
              </Container>
            </>
          }
        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary" onClick={handleStartNewGameButtonClick} disabled={isEnteringHighScore}>
            Start a new game
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default HighScoreBoard;