import { SetStateAction, useEffect, useState } from 'react';
import HighScore from '../models/HighScore';
import { Button, Form, InputGroup, Modal } from 'react-bootstrap';
import { GiCheckMark } from 'react-icons/gi';


interface HighScoreBoardProps {
  isGameOver: boolean;
  latestGameScore: number;
  setIsGameInitializing: React.Dispatch<SetStateAction<boolean>>;
}

const HighScoreBoard: React.FC<HighScoreBoardProps> = ({isGameOver, latestGameScore, setIsGameInitializing}) => {

  const [highScores, setHighScores] = useState<HighScore[]>([]);
  const [isEnteringHighScore, setIsEnteringHighScore] = useState<boolean>(false);

  const currentScoreIsHighScore = latestGameScore > Math.min(... highScores.map(hs => hs.score)) ||
    highScores.length < 10;

  const handleSaveHighScore = (): void =>{
    if(highScores.length < 10){
      console.log('foo');
    }
  };

  useEffect(() =>{
    const serializedHighScores = localStorage.getItem('highScores');

    if(serializedHighScores !== null) {
      setHighScores(JSON.parse(serializedHighScores));
    }

    if(currentScoreIsHighScore) {
      setIsEnteringHighScore(true);
    }

  }, [currentScoreIsHighScore]);

  return(
    <>
      <Modal show={isGameOver} backdrop="static" keyboard={false}>
        <Modal.Header>
          <Modal.Title>Game Over!</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {isEnteringHighScore &&
            <>
              <p>Congratulations on making the High-Score list!</p>
              <Form>
                <InputGroup>
                  <Form.Control type="text" placeholder="Enter your name for Glory!" autoFocus />&nbsp;
                  <Button variant="outline-primary" size="sm" onClick={handleSaveHighScore}><GiCheckMark /></Button>
                </InputGroup>
              </Form>
            </>
          }
        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary" onClick={() => setIsGameInitializing(true)}>
            Start a new game
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default HighScoreBoard;