import NavBar from './NavBar';
import Main from './Main';
import Footer from './Footer';

const Layout = ({ title, children }) => {
  return (
    <div className="flex flex-col min-w-full justify-between">
      <NavBar title={title} />
      <Main>{children}</Main>
      <Footer />
    </div>
  );
};

export default Layout;