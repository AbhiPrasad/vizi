import React from 'react';
import { Button } from 'reactstrap';

const CompanyButton = ({ onClick, children }) => {
  return (
    <Button
      type="button"
      onClick={onClick}
      color="primary"
    >
      {children}
    </Button>
  );
}

export default CompanyButton;