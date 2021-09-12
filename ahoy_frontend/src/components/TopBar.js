import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import UserInformation from "./UserInformation";
import SearchInput from "./SearchInput";

const TopBar = (props) => (
  <Container>
    <Row>
      <Col>
        <UserInformation />
      </Col>
      <Col>
        <SearchInput history={props.history} />
      </Col>
    </Row>
  </Container>
);

export default TopBar;
