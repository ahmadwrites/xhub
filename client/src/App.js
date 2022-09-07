import { ThemeProvider } from "@emotion/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Create from "./pages/Create";
import Edit from "./pages/Edit";
import Groups from "./pages/Groups";
import Home from "./pages/Home";
import PostDetail from "./pages/PostDetail";
import Signup from "./pages/Signup";
import { logout } from "./redux/userSlice";
import theme from "./theme";

function getCookie(name) {
  // Split cookie string and get all individual name=value pairs in an array
  var cookieArr = document.cookie.split(";");
  // Loop through the array elements
  for (var i = 0; i < cookieArr.length; i++) {
    var cookiePair = cookieArr[i].split("=");
    /* Removing whitespace at the beginning of the cookie name
      and compare it with the given string */
    if (name === cookiePair[0].trim()) {
      // Decode the cookie value and return
      return decodeURIComponent(cookiePair[1]);
    }
  }
  // Return null if not found
  return null;
}

function App() {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUser !== null && getCookie("cookie_exists") === null) {
      setTimeout(dispatch(logout()), 10000);
      console.log(getCookie("cookie_exists") + " from app");
    }
  });

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
