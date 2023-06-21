import React from 'react'
import { Spinner } from 'react-bootstrap'

const Loader = () => {
  return (
    <div className="d-flex justify-content-center p-3 column-gap-2">
      <span className="visually-hidden">Loading...</span>
      <Spinner animation="grow" role="status" variant="primary" size="sm" />
      <Spinner animation="grow" role="status" variant="primary" size="sm" />
      <Spinner animation="grow" role="status" variant="primary" size="sm" />
      <Spinner animation="grow" role="status" variant="primary" size="sm" />
    </div>
  );
}

export default Loader;