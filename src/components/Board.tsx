import { Row } from 'react-bootstrap';
import Card from './Card';
import { Photo } from 'pexels';

interface BoardProps {
  numRows: number,
  numColumns: number,
  photos: Photo[]
}

const Board: React.FC<BoardProps> = ({numRows, numColumns, photos}) => {

  function* nextPhotoGenerator() {
    for (let i = 0; i < photos.length; i++) {
      yield photos[i];
    }
  }

  const photoIterator = nextPhotoGenerator();
  const rows = [];
  
  for(let i = 0; i < numRows; i++) {
    const columns = [];

    for(let j = 0; j < numColumns; j++) {
      const currentPhoto = photoIterator.next().value as Photo;
      columns.push(<Card key={currentPhoto.id} imageUrl={currentPhoto.src.medium} imageId={currentPhoto.id} />);
    }

    rows.push(<Row style={{paddingBottom: '1em'}} key={i}>{columns}</Row>);
  }

  return(rows);
}

export default Board;