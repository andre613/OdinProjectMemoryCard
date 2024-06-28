import { Col, Image } from 'react-bootstrap';

export interface CardProps {
  imageId: number;
  imageUrl: string;
}

const Card: React.FC<CardProps>  = ({imageUrl})  => {

  return(
    <Col>
      <Image src={imageUrl} height={200} width={150} rounded/>
    </Col>
  );
};

export default Card