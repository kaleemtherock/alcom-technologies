import { useLocation } from "react-router-dom";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <div className={`${!isHomePage ? "pt-32" : ""}`}>
      {children}
    </div>
  );
};

export default Layout;