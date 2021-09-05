import { connect } from "react-redux";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Logout from "./Logout";

const UserInformation = (props) => {
  return (
    <Container fluid={false}>
      <Row>
        <Col>
          <p>Logged as: {props.userInfo.username}</p>
        </Col>
        <Col>
          <Logout />
        </Col>
      </Row>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return { userInfo: state.userInfo };
};
export default connect(mapStateToProps)(UserInformation);
