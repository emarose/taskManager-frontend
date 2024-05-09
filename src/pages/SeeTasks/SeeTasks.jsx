import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  List,
  ListItem,
  ListItemText,
  Typography,
  Card,
  CardContent,
} from "@mui/material";

const SeeTasks = () => {
  const [allTasksData, setAllTasksData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/tasks");
        setAllTasksData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const renderContentBasedOnState = (task) => {
    console.log(task);
    if (task.estado === "enEjecucion") {
      return (
        <>
          <Typography variant="body2" color="secondary">
            Rama: {task.enEjecucion.tema}
          </Typography>
          <Typography variant="body2" color="secondary">
            Detalles: {task.enEjecucion.titulo}
          </Typography>
          <Typography variant="body2" color="secondary">
            Archivos:
          </Typography>
          {task.enEjecucion.archivos.map((archivo, index) => (
            <Typography key={index} variant="body2" color="secondary">
              {archivo}
            </Typography>
          ))}
        </>
      );
    } else if (task.estado === "pendientePR") {
      return (
        <Typography variant="body2" color="secondary">
          Motivo Pendiente: {task.pendientePR.motivoPendiente}
        </Typography>
      );
    } else {
      return null;
    }
  };

  return (
    <Container>
      <h3>Ver tareas</h3>
      <Card elevation={3}>
        <CardContent>
          <List>
            {allTasksData.map((task, index) => (
              <ListItem key={index} alignItems="flex-start">
                <ListItemText
                  primary={task.titulo}
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {task.descripcion}
                      </Typography>
                      {` — ${task.estado}`}
                      {renderContentBasedOnState(task)}
                    </React.Fragment>
                  }
                />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    </Container>
  );
};

export default SeeTasks;
