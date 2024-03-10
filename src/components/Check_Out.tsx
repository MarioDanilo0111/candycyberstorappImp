import { useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { CartItem } from "./CartItem";
import {
  Item,
  RootResponseDeliveryType,
} from "../types/ResponseDelivery.types";
import { formatCurrency } from "../utilities/formatCurrency";
import { SubmitHandler, useForm } from "react-hook-form";
import { postShop } from "../context/candyApi";
import { AxiosError } from "axios";
import { OrderData } from "../types/OrderData.types";
import { FormData } from "../types/FormData.types";
import { useSEO } from "../hooks/useSEO";

export const CheckOutComponent: React.FC = () => {
  const { cartItems } = useShoppingCart();
  const [popupVisible, setPopupVisible] = useState(false);

  /* use useSEO */
  useSEO({
    title: `Kassa - Godis Butiken Borta Kväll`,
    description: `Borta Kväll`,
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [result, setResult] = useState<RootResponseDeliveryType | null>(null);
  const onSubmit: SubmitHandler<FormData> = async (formData) => {
    let total: number = 0;

    cartItems.forEach((item) => (total = total + item.price * item.quantity));

    const orderData: OrderData = {
      customer_first_name: formData.customer_first_name,
      customer_last_name: formData.customer_last_name,
      customer_email: formData.customer_email,
      customer_phone: formData.customer_phone,
      customer_city: formData.customer_city,
      customer_postcode: formData.customer_postcode,
      customer_address: formData.customer_address,
      order_total: total,
      order_items: cartItems.map((item) => ({
        product_id: item.id,
        qty: item.quantity,
        item_price: item.price,
        item_total: item.price * item.quantity,
        order_id: item.order_id,
      })),
    };
    try {
      const result: RootResponseDeliveryType = await postShop(orderData);
      if (result && result.status && result.status === "success") {
        setResult(result);
        setPopupVisible(true);
      }
    } catch (err) {
      handleFetchError(err);
      console.error(err);
    }
  };

  interface OrderConfirmationProps {
    result: RootResponseDeliveryType | null;
  }

  const OrderConfirmation: React.FC<OrderConfirmationProps> = ({ result }) => {
    return (
      <div className="popup d-flex align-items-center flex-column m-5">
        <h3>
          {result?.data.customer_first_name} {result?.data.customer_last_name}
        </h3>
        <h4>Vi har tagit emot din bestälning: {result?.data.order_date}</h4>
        {result?.data.items.map((item: Item, index) => (
          <div className="m-3" key={index}>
            {/* Access specific properties of each item */}
            <h5>Id produkt: {item.product_id}</h5>
            <h5>Kvantitet: {item.qty}</h5>
            <h5>Pris per styck: {item.item_price} SEK</h5>
            <h5>Total: {item.item_total} SEK</h5>
            <h5>Id orden: {item.order_id}</h5>
          </div>
        ))}
      </div>
    );
  };
  /* Why two error handlers? */
  const renderErrorFeedback = (name: keyof FormData) => {
    if (errors[name]) {
      return (
        <Form.Control.Feedback type="invalid">
          {name.charAt(0).toUpperCase() + name.slice(1)} is{" "}
          {errors[name]?.type === "required" ? "required" : "invalid"}.
        </Form.Control.Feedback>
      );
    }
    return null;
  };

  return (
    <div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="m-5">Checkout</h1>
        <Col md={6} xl={3} lg={4} className="g-3">
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              {...register("customer_first_name", {
                required: true,
                minLength: 3,
                maxLength: 255,
              })}
              isInvalid={!!errors.customer_first_name}
            />
            {renderErrorFeedback("customer_first_name")}
          </Form.Group>

          <Form.Group controlId="customer_last_name">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              {...register("customer_last_name", {
                required: true,
                minLength: 3,
                maxLength: 255,
              })}
              isInvalid={!!errors.customer_last_name}
            />
            {renderErrorFeedback("customer_last_name")}
          </Form.Group>

          <Form.Group controlId="custumer_email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              {...register("customer_email", {
                required: true,
                minLength: 3,
                maxLength: 255,
              })}
              isInvalid={!!errors.customer_email}
            />
            {renderErrorFeedback("customer_email")}
          </Form.Group>
          <Form.Group controlId="customer_phone">
            <Form.Label>Phone number</Form.Label>
            <Form.Control
              type="text"
              {...register("customer_phone", {
                required: false,
                minLength: 3,
                maxLength: 255,
              })}
              isInvalid={!!errors.customer_phone}
            />
            {renderErrorFeedback("customer_phone")}
          </Form.Group>
          <Form.Group controlId="customer_address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              {...register("customer_address", {
                required: true,
                minLength: 3,
                maxLength: 255,
              })}
              isInvalid={!!errors.customer_address}
            />
            {renderErrorFeedback("customer_address")}
          </Form.Group>
          <Form.Group controlId="customer_postcode">
            <Form.Label>Post Code</Form.Label>
            <Form.Control
              type="text"
              {...register("customer_postcode", {
                required: true,
                minLength: 3,
                maxLength: 6,
              })}
              isInvalid={!!errors.customer_postcode}
            />
            {renderErrorFeedback("customer_postcode")}
          </Form.Group>
          <Form.Group controlId="customer_city">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              {...register("customer_city", {
                required: true,
                minLength: 3,
                maxLength: 255,
              })}
              isInvalid={!!errors.customer_city}
            />
            {renderErrorFeedback("customer_city")}
          </Form.Group>
          <Form.Group className="m-3">
            {cartItems.map((item) => {
              return <CartItem key={item.id} {...item} />;
            })}
            <div className=" m-3 ms-auto fw-bold fs-5">
              {formatCurrency(
                cartItems.reduce((total, cartItem) => {
                  total = total + cartItem.price * cartItem.quantity;
                  return total ? total : 0.0;
                }, 0)
              )}
            </div>
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Col>
      </Form>
      {popupVisible && <OrderConfirmation result={result} />}
    </div>
  );

  /* if Error occur */
  function handleFetchError(err: unknown) {
    if (err instanceof AxiosError) {
      console.log("Axios error: ", err.message, err.response);
      alert("the isAxiosError");
    } else if (err instanceof Error) {
      console.log("General error:", err.message);
      alert("The instance of error ocurred" + err.message);
    } else {
      console.log("Unexpected error:", err);
      alert("This should never happen.");
    }
  }
};
