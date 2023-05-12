import "./App.css";
import { Box, Layout, Routes, Route, Typography } from "ui";
import { connect } from "socket.io-client";
import Home from "./feature/Kiosk/HomePage";
import { FormPage } from "./pages/FormPage";
import { useAppDispatch } from "./app/hooks";
import { openOrClose } from "./feature/Kiosk/KioskSlice";
import { ToastContainer } from "react-toastify";

function App() {
  const socket = connect("http://localhost:3333");
  const dispatch = useAppDispatch();

  socket.on("refresh", (socket) => {
    dispatch(openOrClose(socket));
  });

  return (
    
    <Box className="height 100vh" component='main'>
      <ToastContainer/>
      <Layout>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/create' element={<FormPage/>}/>
          <Route path='*' element={
            <Box sx={{ color: 'white'}}>
              <Typography variant='h1'>404</Typography>
              <Typography variant='h2'>Page not found!</Typography>
            </Box>
          } />
        </Routes>
      </Layout>
    </Box>
  );
}

export default App;
