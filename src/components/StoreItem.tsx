import { useEffect, useState } from "react";
import { Card, Button, Modal } from "react-bootstrap";
import { InfoCircle } from "react-bootstrap-icons";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { searchById } from "../context/candyApi";
import { formatCurrency } from "../utilities/formatCurrency";
import { Root } from "../types/candyShop.types";
import Spinner from "react-bootstrap/Spinner";

import { useSEO } from "../hooks/useSEO";
import { RootId } from "../types/candyShopById.types";
/* remove Html-Tags on candy information */
const removeHTMLTags = (input: string): string => {
  return input.replace(/<[^>]*>/g, "");
};
export function StoreItem({
  id,
  name,
  price,
  images,
  stock_quantity,
}: Root["data"][0]) {
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useShoppingCart();

  const [isLoading, setIsLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<RootId | null>(null);

  /* use useSEO */
  useSEO({
    title: `Store - Godis Butiken Borta Kväll `,
    description: `Borta Kväll`,
  });

  const fetchDataFromApiRequest = async (itemId: number) => {
    const result = await searchById(itemId);
    setIsLoading(false);
    setSelectedItem(result);
  };
  useEffect(() => {
    setIsLoading(false);
  }, []);

  const [isPopupOpen, setPopupOpen] = useState(false);

  const openPopup = (itemId: number) => {
    /* setPopupOpen(!isPopupOpen); */
    setPopupOpen(true);

    if (!selectedItem) {
      setIsLoading(true);
      /* fetchDataFromApiRequest(id); */
      fetchDataFromApiRequest(itemId);
    }
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  const quantity = getItemQuantity(id);
  const imageThumbnail: string = images ? images.thumbnail : "";
  /* for disabeling the add more button */
  const isButtonDisabled = quantity + 1 > stock_quantity;

  return (
    <>
      {isLoading && <Spinner />}
      <Card className="h-100">
        <div className="position-relative" onClick={() => openPopup(id)}>
          <Card.Img
            variant="top"
            src={`https://www.bortakvall.se${imageThumbnail}`}
            height="200px"
            style={{ objectFit: "cover" }}
          />
          <InfoCircle className="bi bi-info-circle position-absolute top-0 start-0 m-3 rounded-top-circle" />
        </div>
        <Card.Body className="d-flex flex-column">
          <Card.Title className="d-flex justify-content-between align-items-baseline mb-5">
            <span className="fs-3">{name}</span>
            <span className="ms-2 text-muted">{formatCurrency(price)}</span>
          </Card.Title>
          <div className="popup d-flex align-items-center flex-column">
            {/* Using a Bootstrap modal to display the product info.*/}
            <Modal show={isPopupOpen} onHide={closePopup}>
              {/* Modal content */}
              <Modal.Header closeButton>
                <Modal.Title>{name}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {selectedItem && (
                  <p>{removeHTMLTags(selectedItem.data.description)}</p>
                )}
              </Modal.Body>
              <Modal.Footer>
                <span className="ms-2 text-muted">
                  Pris: {formatCurrency(price)}
                </span>
                <Button variant="secondary" onClick={closePopup}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
          <div className="mt-auto">
            {quantity === 0 ? (
              <Button
                className="w-100"
                onClick={() => increaseCartQuantity(id, price)}
              >
                + Add To Cart
              </Button>
            ) : (
              <div
                className="d-flex align-items-center flex-column"
                style={{ gap: ".5rem" }}
              >
                <div
                  className="d-flex align-items-center justify-content-center"
                  style={{ gap: ".5rem" }}
                >
                  <Button onClick={() => decreaseCartQuantity(id)}>-</Button>
                  {/* logic if there aren't any stock left */}
                  {quantity === stock_quantity ? (
                    <p
                      className="m-1"
                      style={{ color: "tomato", fontSize: ".7em" }}
                    >
                      We only have {stock_quantity} left
                    </p>
                  ) : (
                    <div>
                      <span className="fs-3">{quantity} in cart</span>
                    </div>
                  )}
                  <Button
                    onClick={() => increaseCartQuantity(id, price)}
                    disabled={isButtonDisabled}
                  >
                    +
                  </Button>
                </div>
                <Button
                  onClick={() => removeFromCart(id)}
                  variant="danger"
                  size="sm"
                >
                  Remove
                </Button>
              </div>
            )}
          </div>
        </Card.Body>
      </Card>
    </>
  );
}
