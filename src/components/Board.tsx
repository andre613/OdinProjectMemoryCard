import { Button, Col, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import Card from './Card';
import { Photo } from 'pexels';
import { useState } from 'react';
import { GiCardExchange } from 'react-icons/gi';

interface BoardProps {
  numRows: number;
  numColumns: number;
  photos: Photo[];
  onCardClick: (photoId: number) => void;
  currentScore: number;
}

const Board: React.FC<BoardProps> = ({numRows, numColumns, photos, onCardClick, currentScore}) => {

  const shufflePhotos = (photos: Photo[]): Photo[] => {
    return [...photos].sort(() => Math.random() - 0.5);
  };

  const [shuffledPhotos, setShuffledPhotos] = useState<Photo[]>(shufflePhotos(photos));

  const handleShuffleButtonClick = (): void => {
    setShuffledPhotos(shufflePhotos([... shuffledPhotos]));
  };

  const handleCardClick = (photoId: number): void => {
    onCardClick(photoId);
    handleShuffleButtonClick();
  };

  function* nextPhotoGenerator() {
    for (let i = 0; i < shuffledPhotos.length; i++) {
      yield shuffledPhotos[i];
    }
  }

  const photoIterator = nextPhotoGenerator();

  const rows = [];
  
  for(let i = 0; i < numRows; i++) {
    const columns = [];

    for(let j = 0; j < numColumns; j++) {
      const currentPhoto = photoIterator.next().value as Photo;
      columns.push(
        <Card
          key={currentPhoto.id}
          imageUrl={currentPhoto.src.medium}
          imageId={currentPhoto.id}
          onClick={handleCardClick}
        />
      );
    }

    rows.push(<Row style={{paddingBottom: '0.5em'}} key={i}>{columns}</Row>);
  }

  return(
    <>
      <Row style={{paddingBottom: '1em'}}>
        <Col>
          <OverlayTrigger placement="right" overlay={<Tooltip id="shuffleButtonTooltip">Shuffle Cards</Tooltip>}>
            <Button variant="primary" onClick={handleShuffleButtonClick}><GiCardExchange /></Button>
          </OverlayTrigger>&nbsp;
          Current Score: {currentScore} of {shuffledPhotos.length}
        </Col>
        <Col style={{textAlign: 'left'}}></Col>
      </Row>

      {rows}
    </>
  );
}

export default Board;