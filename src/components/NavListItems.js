import React from "react";
import { withRouter } from "react-router";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const NavListItems = props => {
  const { history } = props;
  return (
    <div>
      <ListItem button onClick={() => history.push("/fixtures")}>
        <ListItemText primary="Partidos" />
      </ListItem>
      <ListItem button onClick={() => history.push("/teams")}>
        <ListItemText primary="Equipos" />
      </ListItem>
      <ListItem button onClick={() => history.push("/stadiums")}>
        <ListItemText primary="Estadios" />
      </ListItem>
      <ListItem button onClick={() => history.push("/statistics")}>
        <ListItemText primary="Resultados" />
      </ListItem>
    </div>
  );
};

export default withRouter(NavListItems);
