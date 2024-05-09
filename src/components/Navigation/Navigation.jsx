import * as React from "react";
import { Link, NavLink } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Link to="/">
            <Button sx={{ mr: 3 }} color="secondary" variant="contained">
              Inicio
            </Button>
          </Link>
          <Link to="/newTask">
            <Button sx={{ mr: 2 }} color="secondary" variant="text">
              Nueva Tarea
            </Button>
          </Link>
          <Link to="/seeTasks">
            <Button color="secondary" variant="text">
              Ver Tareas
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
