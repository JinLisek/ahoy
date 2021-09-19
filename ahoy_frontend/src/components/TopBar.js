import { Link } from "react-router-dom";

import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import UserInformation from "./UserInformation";
import SearchInput from "./SearchInput";
import Notifications from "./Notifications";

const TopBar = (props) => (
  <Navbar>
    <Container>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Item>
            <Nav.Link as={Link} to="">
              <Image width={150} height={150} src={process.env.PUBLIC_URL + "/ahoy-logo.png"} />
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <SearchInput history={props.history} />
          </Nav.Item>
          <Nav.Item>
            <UserInformation />
          </Nav.Item>
          <Nav.Item>
            <Notifications />
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);

export default TopBar;
