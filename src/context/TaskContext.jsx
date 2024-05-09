// TaskContext.js
import React, { createContext, useState } from "react";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [taskData, setTaskData] = useState({
    titulo: "",
    descripcion: "",
    numeroJira: "",
    numeroRedmine: "",
    linkJira: "",
    linkRedmine: "",
    fechaEntregaEstimada: "",
    tipoTarea: "",
    estado: "",
    tema: "",
    enEjecucion: {
      archivos: [],
      rama: {
        nombre: "",
        detalles: "",
      },
    },
    pendientePR: {
      motivoPendiente: "",
    },
    toDeploy: {
      PR: "",
      fecha: "",
    },
    enTesting: {
      fecha: "",
      tester: "",
    },
    paraRefixing: {
      motivoRefix: "",
      posibleSolucion: "",
    },
    ejecutandoRefixing: {
      rama: {
        nombre: "",
        detalles: "",
      },
    },
    bloqueada: {
      fecha: "",
      motivo: "",
    },
    completado: {
      fecha: "",
      prLink: "",
      resumenDesarrollo: "",
    },
  });

  return (
    <TaskContext.Provider value={{ taskData, setTaskData }}>
      {children}
    </TaskContext.Provider>
  );
};
