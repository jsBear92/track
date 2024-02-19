import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
} from "@nextui-org/react";
import { useLocation } from "react-router-dom";

const NavBar = ({ title }) => {
  const navList = [
    { name: "Home", url: "/" },
    { name: "Category", url: "/category" },
    { name: "Privacy", url: "/privacy" },
  ]
  let location = useLocation();
  return (
  <Navbar className="bg-gray-200">
    {/* Brand */}
    <NavbarBrand>
      <p className="font-blod text-inherit">{title}</p>
    </NavbarBrand>
    {/* Other navigation items */}
    <NavbarContent className="hidden sm:flex gap-4" justify="center">
      {navList.map((item, index) => (
        <NavbarItem key={index} isActive={item.url===location.pathname ? true : false}>
          <Link
            href={item.url}
            color={item.url===location.pathname ? "primary" : "foreground"}
          >
            {item.name}
          </Link>
        </NavbarItem>
      ))}
    </NavbarContent>
  </Navbar>
)};

export default NavBar;
