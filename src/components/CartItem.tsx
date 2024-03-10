import { Button, Stack } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { searchById } from "../context/candyApi";
import { formatCurrency } from "../utilities/formatCurrency";
import { RootId, Data } from "../types/candyShopById.types";
import Spinner from "react-bootstrap/Spinner";

type CartItemProps = {
  id: number;
  quantity: number;
  price: number;
};

/* By Id Request */
export function CartItem({ id, quantity }: CartItemProps) {
  const [searchResult, setSearchResult] = useState<RootId | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchDataFromApi = async () => {
    const result = await searchById(id);
    try {
      setSearchResult(result);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchDataFromApi();
  }, []);

  const { removeFromCart } = useShoppingCart();
  if (!searchResult) return null;

  const item: Data = searchResult.data;
  /* Description */
  /* console.log(item.description); */
  return (
    <>
      {isLoading && <Spinner />}
      <Stack
        direction="horizontal"
        gap={2}
        className="d-flex align-items-center"
      >
        <img
          src={`https://www.bortakvall.se${item.images.thumbnail}`}
          style={{ width: "125px", height: "75px", objectFit: "cover" }}
        />
        <div className="me-auto">
          <div>
            {item.name}
            {/* logic if there aren't any stock left */}
            {quantity > 1 ? (
              quantity > item.stock_quantity ? (
                <p style={{ color: "red", fontSize: ".7rem" }}>
                  to many {<br />}there is only {item.stock_quantity} left
                </p>
              ) : (
                <span className="text-muted" style={{ fontSize: ".96rem" }}>
                  {""} x {quantity}
                </span>
              )
            ) : null}
          </div>
          <div className="text-muted" style={{ fontSize: ".75rem" }}>
            {formatCurrency(item.price)}
          </div>
        </div>
        <div> {formatCurrency(item.price * quantity)}</div>
        <Button
          variant="outline-danger"
          size="sm"
          onClick={() => removeFromCart(id)}
        >
          &times;
        </Button>
      </Stack>
    </>
  );
}
