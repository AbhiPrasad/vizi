import React from 'react';
import { Button } from 'reactstrap';

const CollapseButton = ({children, onClick}) => {
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

export default CollapseButton;