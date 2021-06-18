import Header from '../components/Header';
import GetMenu from '../components/GetMenu';
import Cart from '../components/Cart';
import Footer from '../components/Footer';
 

function Menu() {

    return (
      <main className="menu-view">
        <Header>
        </Header>
        <Cart></Cart>
        <GetMenu></GetMenu>
        <Footer></Footer>
      </main>
    );
  }

export default Menu;