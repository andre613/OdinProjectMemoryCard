import { useState } from 'react';
import { Button, Modal, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { MdHelp } from 'react-icons/md';
import { BsGithub } from 'react-icons/bs';

interface HelpWidgetProps {
  isNewGame: boolean;
  setIsInitializing: React.Dispatch<React.SetStateAction<boolean>>;
}

const HelpWidget: React.FC<HelpWidgetProps> = ({isNewGame, setIsInitializing}) => {
  const [isVisible, setIsVisible] = useState<boolean>(true);

  const handleOpen: () => void = () => {
    setIsVisible(true);
  };

  const handleClose: () => void = () => {
    if(isNewGame){
      setIsInitializing(true);
    }

    setIsVisible(false);
  };

  return(
    <>
      <OverlayTrigger placement="left" overlay={<Tooltip id="helpButtonTooltip">help</Tooltip>}>
        <Button variant="secondary" onClick={handleOpen}><MdHelp /></Button>
      </OverlayTrigger>

      <Modal show={isVisible} onHide={handleClose} backdrop="static" keyboard={true} centered>
        <Modal.Header closeButton>
          <Modal.Title>Welcome to Memory Card!</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>
            In this simple game, you just have to click every unique card only once! Clicking on a card more than once
            causes you to lose the game! It sounds deceptively simple... That's because it is!
          </p>

          <p>
            After every click, the cards will shuffle. Just to further add to the challenge, the pool of cards is
            actually larger that what's shown in the play area, so you might see new ones pop up as you play. If you
            wind up where the play area shows only cards you think you've already clicked, hit the shuffle button to
            refresh.
          </p>

          <p>The score widget will display how many uniques you've clicked on versus how many are left to find</p>

          <p>Changing the difficulty will increase the number of cards in the play area, as well as the pool size</p>

          <p>So you think you got what it takes? Make the High Scorer's list! Challenge your friends!</p>
        </Modal.Body>

        <Modal.Footer>
          <OverlayTrigger placement="left" overlay={<Tooltip id="githubRepoButtonTooltip">GitHub Repo</Tooltip>}>
            <Button variant="info" href="https://github.com/andre613/OdinProjectMemoryCard"><BsGithub /></Button>
          </OverlayTrigger>

          <Button variant="primary" onClick={handleClose}>{isNewGame? 'Start new game' : 'Close'}</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default HelpWidget;