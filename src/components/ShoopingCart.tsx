import { Offcanvas, Stack, Button } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { CartItem } from "./CartItem";
import { Link } from "react-router-dom";
import { formatCurrency } from "../utilities/formatCurrency";

type ShoppingCartProps = {
  isOpen: boolean;
};

export function ShoppingCart({ isOpen }: ShoppingCartProps) {
  const { closeCart, cartItems } = useShoppingCart();

  return (
    <Offcanvas show={isOpen} onHide={closeCart} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {cartItems.map((item) => {
            return <CartItem key={item.id} {...item} />;
          })}
          <div className="ms-auto fw-bold fs-5">
            {formatCurrency(
              cartItems.reduce((total, cartItem) => {
                total = total + cartItem.price * cartItem.quantity;
                return total ? total : 0.0;
              }, 0)
            )}
          </div>
        </Stack>
        <Link to="/checkOut">
          <Button>To Checkout</Button>
        </Link>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
