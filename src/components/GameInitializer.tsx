import React, {Dispatch, SetStateAction} from 'react';
import { useState } from 'react';
import { Button, Col, Form, Modal, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import { MdRestartAlt } from "react-icons/md";
import GameSettings, { Difficulty } from '../models/GameSettings';

interface GameInitializerProps {
  gameSettings: GameSettings;
  setGameSettings: Dispatch<SetStateAction<GameSettings>>;
}

const GameInitializer: React.FC<GameInitializerProps> = ({setGameSettings}) => {

  const [isInitializing, setIsInitializing] = useState<boolean>(true);
  const [newDifficulty, setNewDifficulty] = useState<Difficulty>(Difficulty.Normal);

  const handleClose = (): void => {
    setIsInitializing(false);
  };

  const handleShow = (): void => { 
    setIsInitializing(true);
  };

  const handleDifficultyChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setNewDifficulty(Difficulty[(e.target.value as keyof typeof Difficulty)]);
  }

  const handleStartNewGame = (): void => {
    setGameSettings({difficulty: newDifficulty});
    setIsInitializing(false);
  };

  return (
    <>
      <Row>
        <Col style={{textAlign: 'right', paddingTop: '1em'}}>
          <OverlayTrigger placement="left" overlay={<Tooltip id="restartButtonTooltip">Restart Game</Tooltip>}>
            <Button variant="primary" onClick={handleShow}><MdRestartAlt /></Button>
          </OverlayTrigger>
        </Col>
      </Row>

      <Modal show={isInitializing} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Start a new game</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <h2>Game Difficulty</h2>

          <Form>
            <div key="selectGameDifficulty" className="mb-3">
              { 
                Object.keys(Difficulty).filter((v) => isNaN(Number(v))).map((key) => 
                  <Form.Check 
                    inline 
                    value={key} 
                    label={key} 
                    name="difficultyGroup" 
                    type="radio" 
                    id={`difficulty${key}`}
                    onChange={handleDifficultyChange}
                  />)    
              }
            </div>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary" onClick={handleStartNewGame}>Start New Game</Button>
        </Modal.Footer>
      </Modal>

    </>
  );
};

export default GameInitializer;