import Login from "components/auth/Login";
import { Route, Routes } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import Dashboard from "components/dashboard/Dashboard";
import MainLayout from "./MainLayout";
import { PrivateRoute } from "./PrivateRoute";
import { GuestRoute } from "./GuestRoute";
import PlcApp from "components/plcs/PlcApp";
import PlcDetail from "components/plcs/PlcDetail";


const Layout = () => {


  return (
    <>
      <Routes>

        {/* <Route element={<PrivateRoute />}> */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/plcs" element={<PlcApp />} />
            <Route path="/plcs/:pid/" element={<PlcDetail />} />
          {/* </Route> */}
        </Route>
        <Route element={<GuestRoute />}>
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

    </>
  );
};

export default Layout;