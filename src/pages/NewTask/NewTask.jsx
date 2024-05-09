import React, { useContext } from "react";
import { Box, TextField, Button, Autocomplete, Container } from "@mui/material";
import { TaskContext } from "../../context/TaskContext";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import axios from "axios";

const NewTask = () => {
  const { taskData, setTaskData } = useContext(TaskContext);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setTaskData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    console.log(taskData);
    try {
      const response = await axios.post(
        "http://localhost:3000/tasks/add",
        taskData
      );
      console.log(response);
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        maxWidth: 300,
        m: "auto",
      }}
    >
      <h5 style={{ marginBottom: 30 }}>Ingresar una tarea</h5>
      <Box gap={2} display={"flex"} flexDirection={"column"}>
        <Autocomplete
          noOptionsText="Sin resultados"
          id="task-type"
          options={["RQ", "TK", "ERR"]}
          onChange={(event, value) =>
            setTaskData((prevData) => ({ ...prevData, taskType: value }))
          }
          renderInput={(params) => (
            <TextField {...params} label="Tipo de tarea" />
          )}
        />
        {taskData.taskType !== "" && taskData.taskType !== "RQ" && (
          <TextField label="RQ Padre" variant="outlined" fullWidth />
        )}
        <Autocomplete
          noOptionsText="Sin resultados"
          id="task-status"
          options={[
            "En Ejecucion",
            "Pendiente de PR",
            "To Deploy",
            "En Testing",
            "Para Refixing",
            "Ejecutando Refixing",
            "Bloqueada",
            "Completado",
          ]}
          onChange={(event, value) =>
            setTaskData((prevData) => ({ ...prevData, taskStatus: value }))
          }
          renderInput={(params) => <TextField {...params} label="Estado" />}
        />
        <TextField
          label="Titulo"
          variant="outlined"
          fullWidth
          name="titulo"
          value={taskData.titulo}
          onChange={handleChange}
        />
        <TextField
          name="redmine"
          value={taskData.redmine}
          onChange={handleChange}
          label="Redmine"
          variant="outlined"
          fullWidth
        />
        <TextField
          name="jira"
          value={taskData.jira}
          onChange={handleChange}
          label="Jira"
          variant="outlined"
          fullWidth
        />
        <TextField
          label="Detalles de Solicitud"
          variant="outlined"
          fullWidth
          name="descripcion"
          value={taskData.descripcion}
          onChange={handleChange}
          multiline
          rows={4}
        />

        {taskData.taskStatus === "En Ejecucion" && (
          <>
            <div>
              <TextField label="Rama" variant="outlined" fullWidth />
            </div>
            <div>
              <TextField
                label="Archivos involucrados"
                variant="outlined"
                fullWidth
              />
            </div>
          </>
        )}
        {taskData.taskStatus === "Pendiente PR" && (
          <div>
            <TextField
              label="Motivo Pendiente"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
            />
            <TextField
              style={{ marginTop: 16 }}
              label="Detalles del desarrollo"
              variant="outlined"
              fullWidth
            />
          </div>
        )}
        {taskData.taskStatus === "To Deploy" && (
          <div>
            <TextField label="PR" variant="outlined" fullWidth />
            <TextField
              style={{ marginTop: 16 }}
              type="date"
              variant="outlined"
              fullWidth
            />
          </div>
        )}
        {taskData.taskStatus === "En Testing" && (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <TextField
              label="Tester"
              variant="outlined"
              fullWidth
              style={{ marginBottom: 16 }}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker />
            </LocalizationProvider>
          </div>
        )}
        {taskData.taskStatus === "Ejecutando Refixing" && (
          <div>
            <TextField label="Rama" variant="outlined" fullWidth />
            <TextField
              style={{ marginTop: 16 }}
              label="Rama Origen"
              variant="outlined"
              fullWidth
            />
          </div>
        )}
        {taskData.taskStatus === "Bloqueada" && (
          <div>
            <TextField
              label="Motivo del Bloqueo"
              variant="outlined"
              fullWidth
            />
            <TextField
              style={{ marginTop: 16 }}
              type="date"
              variant="outlined"
              fullWidth
            />
          </div>
        )}
        {taskData.taskStatus === "Completado" && (
          <div>
            <TextField label="PR fecha" variant="outlined" fullWidth />
            <TextField
              style={{ marginTop: 16 }}
              type="date"
              variant="outlined"
              fullWidth
            />
            <TextField
              style={{ marginTop: 16 }}
              label="Link Jira"
              variant="outlined"
              fullWidth
            />
            <TextField
              style={{ marginTop: 16 }}
              label="Link Redmine"
              variant="outlined"
              fullWidth
            />
            <TextField
              style={{ marginTop: 16 }}
              label="Resumen del Desarrollo"
              variant="outlined"
              fullWidth
            />
          </div>
        )}
        {taskData.taskStatus === "Para Refixing" && (
          <div>
            <TextField label="Motivo de Refix" variant="outlined" fullWidth />
            <TextField
              style={{ marginTop: 16 }}
              label="¨Posible solución"
              variant="outlined"
              fullWidth
            />
          </div>
        )}
        <Button
          onClick={handleSubmit}
          variant="contained"
          sx={{ mt: 2, mb: 8 }}
        >
          Ingresar Tarea
        </Button>
      </Box>
    </Box>
  );
};

export default NewTask;
