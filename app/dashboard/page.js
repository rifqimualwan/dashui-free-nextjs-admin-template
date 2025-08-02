// app/products/page.jsx
"use client";

import { useState, useEffect } from "react";
import { Row, Col, Card, Table, Alert } from "react-bootstrap";
import Link from "next/link";
import Image from "next/image";

// Import hooks
import useMounted from "hooks/useMounted";

const ProductsTable = () => {
  const hasMounted = useMounted();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        setError(
          "An error occurred while fetching products. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <Row className="align-items-center justify-content-center g-0 min-vh-100 bg-light">
      <Col xxl={8} lg={10} md={12} xs={12} className="py-8 py-xl-0">
        {/* Card */}
        <Card className="smooth-shadow-md">
          {/* Card body */}
          <Card.Body className="p-6">
            <div className="mb-4">
              <h2 className="mb-6">Product List</h2>
            </div>
            {/* Error Alert */}
            {error && (
              <Alert
                variant="danger"
                onClose={() => setError(null)}
                dismissible
              >
                {error}
              </Alert>
            )}
            {/* Table */}
            {hasMounted && (
              <>
                {loading ? (
                  <p>Loading products...</p>
                ) : (
                  <Table striped bordered hover responsive>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Product Name</th>
                        <th>Product Brand</th>
                        <th>Product Owner</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.length > 0 ? (
                        products.map((product) => (
                          <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.product_name}</td>
                            <td>{product.product_brand}</td>
                            <td>{product.product_owner || "N/A"}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="4" className="text-center">
                            No products found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                )}
              </>
            )}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default ProductsTable;
