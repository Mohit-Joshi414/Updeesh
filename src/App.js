import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import About from "./components/About";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserDashboard from "./components/user-routes/UserDashboard";
import PrivateRouters from "./services/PrivateRouters";
import ProfileInfo from "./components/user-routes/ProfileInfo";
import PostPage from "./components/PostPage";
import UserProvider from "./context/UserProvider";
import UpdatePost from "./components/UpdatePost";
import UpdateCategory from "./components/UpdateCategory";
import AddPost from "./components/AddPost";
import DisplayUserPosts from "./components/DisplayUserPosts";
import AddCategory from "./components/AddCategory";
import DisplayCategory from "./components/DisplayCategory";
import CategoryWiseView from "./components/CategoryWiseView";
import CategoryProvider from "./context/CategoryProvider";
import ContactUs from "./components/ContactUs";
import DisplayContactUsList from "./components/DisplayContactUsList";
import CategoryListProvider from "./context/CategoryListProvider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function App() {
  return (
    <CategoryProvider>
      <CategoryListProvider>
        <UserProvider>
          <BrowserRouter>
            <ToastContainer position="bottom-center" theme="dark" />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/post/:postDetail" element={<PostPage />} />
              <Route
                path="/category/:categoryDetail"
                element={<CategoryWiseView />}
              />
              <Route path="/admin">
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<Signup />} />
              </Route>
              <Route path="/user-admin" element={<PrivateRouters />}>
                <Route path="dashboard" element={<UserDashboard />} />
                <Route path="profile-info/:userId" element={<ProfileInfo />} />
                <Route path="updatePost/:postId" element={<UpdatePost />} />
                <Route
                  path="displayContactUs"
                  element={<DisplayContactUsList />}
                />
                <Route path="addPost" element={<AddPost />} />
                <Route path="displayUserPosts" element={<DisplayUserPosts />} />
                <Route path="addCategory" element={<AddCategory />} />
                <Route path="displayCategory" element={<DisplayCategory />} />
                <Route
                  path="updateCategory/:categoryId"
                  element={<UpdateCategory />}
                />
              </Route>
            </Routes>
          </BrowserRouter>
        </UserProvider>
      </CategoryListProvider>
      <ReactQueryDevtools />
    </CategoryProvider>
  );
}

export default App;
