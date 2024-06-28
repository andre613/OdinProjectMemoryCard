import React, {Dispatch, SetStateAction} from 'react';
import { useState } from 'react';
import { Button, Form, Modal, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { MdRestartAlt } from "react-icons/md";
import GameSettings, { Difficulty } from '../models/GameSettings';

interface GameInitializerProps {
  gameSettings: GameSettings;
  setGameSettings: Dispatch<SetStateAction<GameSettings>>;
}

const GameInitializer: React.FC<GameInitializerProps> = ({gameSettings, setGameSettings}) => {

  const [isInitializing, setIsInitializing] = useState<boolean>(false);
  const [newDifficulty, setNewDifficulty] = useState<Difficulty | null>(gameSettings.difficulty ?? Difficulty.Normal);

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

  const renderDifficultyDescription = () => {
    switch(newDifficulty) {
      case Difficulty.Easy:
        return (
          <>
            <h6>Ya wuss!</h6>
            <p>10 unique cards to find, 1 row</p>
          </>
        );

      case Difficulty.Normal:
      default:
        return (
          <>
            <h6>Hey n00b!</h6>
            <p>20 unique cards to find, 2 rows</p>
          </>
        );

      case Difficulty.Difficult:
        return (
          <>
            <h6>Look at you, rockstar!</h6>
            <p>40 unique cards to find, 3 rows</p>
          </>
        );

      case Difficulty.Pro:
        return (
          <>
            <h6>OK! now we're talkin'!</h6>
            <p>80 unique cards to find, 4 rows!</p>
          </>
        );
    }
  }

  return (
    <>
        {!isInitializing &&
          <OverlayTrigger placement="left" overlay={<Tooltip id="startNewButtonTooltip">Start A New Game</Tooltip>}>
            <Button variant="primary" onClick={handleShow}>
              {newDifficulty === null?
                'Click here to start new game':
                <MdRestartAlt />
              }
            </Button>
          </OverlayTrigger>
        }

      <Modal show={isInitializing} onHide={handleClose} backdrop="static" keyboard={false} centered>
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
                    key={key}
                    value={key}
                    checked={newDifficulty === Difficulty[key as keyof typeof Difficulty]}
                    label={key}
                    name="difficultyGroup"
                    type="radio"
                    id={`difficulty${key}`}
                    onChange={handleDifficultyChange}
                  />)    
              }
            </div>
          </Form>

          <div>{renderDifficultyDescription()}</div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary" onClick={handleStartNewGame}>Start New Game</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default GameInitializer;