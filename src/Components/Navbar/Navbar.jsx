import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Badge from 'react-bootstrap/Badge';
import { useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

function StoreNavbar() {
  const [searchText, setSearchText] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

  // 🔁 Read cart count from localStorage
  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem("cartItems")) || [];
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(count);
  };

  useEffect(() => {
    updateCartCount();

    // 👂 Listen for cart changes (from other pages)
    window.addEventListener("storage", updateCartCount);

    return () => {
      window.removeEventListener("storage", updateCartCount);
    };
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchText.trim()) {
      navigate(`/?search=${searchText}`);
    }
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">My Store</Navbar.Brand>

        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>

            <Nav.Link as={Link} to="/MyCart">
              Cart{" "}
              <Badge bg="danger" pill>
                {cartCount}
              </Badge>
            </Nav.Link>
          </Nav>

          <Form className="d-flex" onSubmit={handleSearch}>
            <Form.Control
              type="search"
              placeholder="Search product..."
              className="me-2"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <Button type="submit" variant="outline-success">
              Search
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default StoreNavbar;
