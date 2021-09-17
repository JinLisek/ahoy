import Link from "react-router-dom/Link";

import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import UserInformation from "./UserInformation";
import SearchInput from "./SearchInput";

const TopBar = (props) => (
  <Container>
    <Row>
      <Col>
        <Link to="">
          <Image width={150} height={150} src={process.env.PUBLIC_URL + "/ahoy-logo.png"} />
        </Link>
      </Col>
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
