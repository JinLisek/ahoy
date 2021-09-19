import { connect } from "react-redux";

import Container from "react-bootstrap/Container";

const UserInformation = (props) => {
  return (
    <Container>
      <p>Logged as: {props.userInfo.username}</p>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return { userInfo: state.userInfo };
};
export default connect(mapStateToProps)(UserInformation);
