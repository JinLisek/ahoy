import Container from "react-bootstrap/Container";

import LinksToUsers from "components/LinksToUsers";

const UserSearchView = (props) => {
  return (
    <Container>
      <h1>Search results:</h1>
      <LinksToUsers users={props.users} />
    </Container>
  );
};

export default UserSearchView;
