import { Col } from 'react-bootstrap';

export interface CardProps {
  imageId: number;
  imageUrl: string;
}

const Card: React.FC<CardProps>  = ({imageUrl})  => {

  return(
    <Col>
      {imageUrl}
    </Col>
  );
};

export default Card