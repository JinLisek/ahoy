import { Link } from "react-router-dom";
import { connect } from "react-redux";

import Image from "react-bootstrap/Image";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import UserInformation from "components/UserInformation";
import SearchForm from "components/SearchForm";
import Notifications from "components/Notifications";
import Logout from "components/Logout";

const TopBar = (props) => (
  <Navbar expand="md">
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse className="align-items-start">
      <Nav className="me-auto">
        <Nav.Item>
          <Nav.Link as={Link} to="">
            <Image width={120} height={120} src={process.env.PUBLIC_URL + "/ahoy-logo.png"} />
          </Nav.Link>
        </Nav.Item>
        <Nav.Item className="m-3">
          <SearchForm history={props.history} />
        </Nav.Item>
      </Nav>
      <Nav className="ms-auto ">
        <Nav.Item>
          <Nav.Link as={Link} to={"/user/" + props.userInfo.username}>
            <UserInformation username={props.userInfo.username} />
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Notifications />
        </Nav.Item>
        <Nav.Item>
          <Logout />
        </Nav.Item>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

const mapStateToProps = ({ authentication }) => {
  return { userInfo: authentication.userInfo };
};
export default connect(mapStateToProps)(TopBar);
