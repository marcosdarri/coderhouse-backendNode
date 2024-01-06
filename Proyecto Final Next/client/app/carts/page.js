import React from "react";

const page = () => {
  return (
    <>
      <h2>
        Please insert a cart id in the URL to target a specific cart. Thank you.
      </h2>
      <p>
        Try this for example:
        <a href="http://localhost:3000/carts/656b9d6cf7b4bdbb5efa7ea5">
          http://localhost:3000/carts/656b9d6cf7b4bdbb5efa7ea5
        </a>
      </p>
    </>
  );
};

export default page;
