import { ThemeProvider } from "@emotion/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Create from "./pages/Create";
import Edit from "./pages/Edit";
import EditProfile from "./pages/EditProfile";
import Groups from "./pages/Groups";
import Home from "./pages/Home";
import PostDetail from "./pages/PostDetail";
import Profile from "./pages/Profile";
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
            <Route path="create" element={<Create />} />
            <Route path="edit/:id" element={<Edit />} />
            <Route path="post/:id" element={<PostDetail />} />
            <Route path="profile">
              <Route path="edit" element={<EditProfile />} />
              <Route path=":id" element={<Profile />} />
            </Route>
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
