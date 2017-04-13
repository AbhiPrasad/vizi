import React from 'react';
import { Button } from 'reactstrap';

const CollapseButton = ({ children, onClick, isLoading }) => {
    if (isLoading) {
        return (
            <Button
                type="button"
                onClick={onClick}
                color="primary"
                disabled
            >
                {children}
            </Button>
        );
    } else {
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
}

export default CollapseButton;