import { useEffect, useState, useMemo } from "react";
import { Col, Row } from "react-bootstrap";
import { StoreItem } from "../components/StoreItem";
import { search } from "../context/candyApi";
import { Root } from "../types/candyShop.types";
import "./Store.css";
import loadGif from "../assets/image.png";

const Store = () => {
  const [searchResult, setSearchResult] = useState<Root | null>(null);

  useEffect(() => {
    console.log("Effect: Fetching data from API...");
    const fetchDataFromApi = async () => {
      try {
        const result = await search();
        console.log("Data fetched: ", result);
        setSearchResult(result);
      } catch (err) {
        console.error("Error fetching data: ", err);
      }
    };

    fetchDataFromApi();
  }, []);
  /* useMemo for optimizing performance and not recalculate every render Item */
  const renderedItems = useMemo(() => {
    return searchResult?.data.map((item) => (
      <Col key={item.id}>
        <StoreItem {...item} />
      </Col>
    ));
  }, [searchResult]);

  /* loading Icon */
  if (!searchResult) {
    return (
      <div className="loading-container">
        <img src={loadGif} alt="Loading..." />
      </div>
    );
  }

  return (
    <>
      <h1 className="m-3 mb-5">Store</h1>
      <Row sm={1} md={2} xl={3} lg={3} className="g-3">
        {renderedItems}
      </Row>
    </>
  );
};

export default Store;
