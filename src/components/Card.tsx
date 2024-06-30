import { Col, Image } from 'react-bootstrap';

export interface CardProps {
  imageId: number;
  imageUrl: string;
  onClick: (photoId: number) => void;
}

const Card: React.FC<CardProps>  = ({imageId, imageUrl, onClick})  => {

  return(
    <Col>
      <Image src={imageUrl} height={200} width={150} rounded onClick={() => onClick(imageId)}/>
    </Col>
  );
};

export default Card