import { Row } from 'react-bootstrap';
import Card from './Card';

interface BoardProps {
  numRows: number,
  numColumns: number
}

const Board: React.FC<BoardProps> = ({numRows, numColumns}) => {

  const rows = [];
  
  for(let i = 0; i < numRows; i++) {
    const columns = [];

    for(let j = 0; j < numColumns; j++) {
      columns.push(<Card key={`${i}${j}`} imageUrl={`Row: ${i + 1} Column: ${j+1}`} imageId={parseInt(`${i}${j}`)} />);
    }

    rows.push(<Row key={i}>{columns}</Row>);
  }

  return(rows);
}

export default Board;