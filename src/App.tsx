import React from "react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import MainRouter from "./routers/MainRouter";
import { BrowserRouter } from "react-router-dom";
import Navigation from "./components/navigation/Navigation";
import { Box, Container, CssBaseline } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <Navigation />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              height: "100vh",
              overflow: "auto",
            }}
          >
            <Toolbar />
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
              <MainRouter />
            </Container>
          </Box>
        </Box>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
