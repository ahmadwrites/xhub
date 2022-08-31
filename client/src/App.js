import { ThemeProvider } from "@emotion/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Groups from "./pages/Groups";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import theme from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/">
            <Route index element={<Home type="home" />} />
            <Route path="trending" element={<Home type="trending" />} />
            <Route path="signup" element={<Signup />} />
            <Route path="groups">
              <Route index element={<Groups />} />
              <Route path=":id" element={<Home type="group" />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
