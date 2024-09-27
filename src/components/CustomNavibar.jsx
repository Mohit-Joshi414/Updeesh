import React, { useEffect, useState } from "react";
import { Link, NavLink as ReactLink, useNavigate } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { doLogout, getCurrentUser, isLoggedIn } from "../auth/authentication";
import { toast } from "react-toastify";
import { loadAllCategories } from "../services/category-service";
import CategoryWiseView from "./CategoryWiseView";
const CustomNavibar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [login, setLogin] = useState(false);
  const [user, setUser] = useState(undefined);
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    setLogin(isLoggedIn());
    setUser(getCurrentUser());
  }, [login]);
  useEffect(() => {
    loadAllCategories()
      .then((data) => {
        setCategories(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  useEffect(() => {
    loadAllCategories()
      .then((data) => {
        setCategories(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const logout = () => {
    doLogout(() => {
      setLogin(false);
      navigate("/");
      toast.success("User logout successfully!");
    });
  };

  const toggle = () => setIsOpen(!isOpen);
  return (
    <div>
      <Navbar color="dark" dark expand="sm" fixed="true">
        <NavbarBrand tag={ReactLink} to="/">
          <img
            alt="logo"
            src={require("../updesh_logo-removebg-preview.png")}
            style={{
              height: 40,
              width: 100,
            }}
          />
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink tag={ReactLink} to="/">
                Home
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink tag={ReactLink} to="/about">
                About
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={ReactLink} to="/contact">
                Contact
              </NavLink>
            </NavItem>

            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                More
              </DropdownToggle>
              <DropdownMenu end>
                {categories?.map((category, index) => (
                  <DropdownItem
                    tag={Link}
                    to={`/categoryWise/${category.id}`}
                    onChange={(e) => {
                      return <CategoryWiseView />;
                    }}
                    key={index}
                  >
                    {category.title}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          {/* {window.location.href.includes("admin") && ( */}
          <Nav navbar>
            {login && (
              <>
                <NavItem>
                  <NavLink tag={ReactLink} to="/user-admin/dashboard">
                    {user.email}
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    tag={ReactLink}
                    to={`/user-admin/profile-info/${user.id}`}
                  >
                    Profile
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink onClick={logout}>Logout</NavLink>
                </NavItem>
              </>
            )}
            {!login && window.location.href.includes("admin") && (
              <>
                <NavItem>
                  <NavLink tag={ReactLink} to="/admin/login">
                    Login
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={ReactLink} to="/admin/signup">
                    Signup
                  </NavLink>
                </NavItem>
              </>
            )}
          </Nav>
          {/* )} */}
          {/* <NavbarText>Simple Text</NavbarText> */}
        </Collapse>
      </Navbar>
    </div>
  );
};

export default CustomNavibar;
