import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import NewTask from "./pages/NewTask/NewTask";
import SeeTasks from "./pages/SeeTasks/SeeTasks";
import Navigation from "./components/Navigation/Navigation";
import { Container } from "@mui/material";
import { TaskProvider } from "./context/TaskContext";

function App() {
  return (
    <>
      <Navigation />
      <TaskProvider>
        <Container sx={{ mt: 5 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/newTask" element={<NewTask />} />
            <Route path="/seeTasks" element={<SeeTasks />} />
          </Routes>
        </Container>
      </TaskProvider>
    </>
  );
}

export default App;
