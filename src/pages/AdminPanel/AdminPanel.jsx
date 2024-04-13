import React, { useState } from "react";
import style from "./index.module.scss";
import { Link, NavLink, Outlet } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import AdminTable from "../../components/AdminPanelComponents/AdminTable";
import { removeCookieAll } from "../../helpers/cookie";
import { MainContext } from "../../contexts/mainContextProvider";
function AdminPanel() {
  const { setUser } = useContext(MainContext);
  const [toggle, setToggle] = useState(false);
  const Logout = () => {
    removeCookieAll();
    setUser(null);
    navigate("/login");
  };
  return (
    <>
      <Helmet>
        <title>Admin Panel </title>
      </Helmet>
      <div className={style.admin_panel}>
        <div className={`${style.sidebar} ${toggle && style.active}`}>
          <div className={style.header}>
            <i
              className="fa-solid fa-arrow-left"
              onClick={() => setToggle(!toggle)}
            ></i>
            <Link to={"/"} className={style.heading}>
              IT STREET
            </Link>
          </div>

          <ul>
            <NavLink to="/">Products</NavLink>
            <NavLink to="/adminpanel/users">Users</NavLink>
            <NavLink to="/adminpanel/orders">Orders</NavLink>
            <NavLink to="/adminpanel/category">Category</NavLink>
            <NavLink to="/adminpanel/brands">Brands</NavLink>
            <NavLink to="/adminpanel/keywords">Keywords</NavLink>
            <NavLink to="/adminpanel/sliders">Sliders</NavLink>
            <NavLink to="/adminpanel/buildPc">BuildPc</NavLink>
            <NavLink to="/adminpanel/settings">Settings</NavLink>
            <NavLink onClick={Logout}>{t("Logout")}</NavLink>
          </ul>
        </div>
        <div className={style.main}>
          <div className={style.navbar}>
            <div className={style.toggle} onClick={() => setToggle(!toggle)}>
              <i className="fa-solid fa-bars"></i>
            </div>
            <div className={style.profile}>
              <Link>
                <i className="fa-solid fa-user"></i>
              </Link>
            </div>
          </div>
          <div className={style.aaa}></div>

          <div className={style.content}>
            <Outlet></Outlet>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminPanel;
