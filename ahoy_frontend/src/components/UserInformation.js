import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const UserInformation = (props) => {
  return (
    <Container>
      <Row>
        <Col>
          <Image width={50} height={50} src={process.env.PUBLIC_URL + "/ahoy-default-avatar.png"} />
        </Col>
        <Col>
          <p className="text-right">{props.username}</p>
        </Col>
      </Row>
    </Container>
  );
};

export default UserInformation;
