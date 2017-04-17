import React from 'react';
import { Button } from 'reactstrap';
import './CollapseButton.css';

const CollapseButton = ({ children, onClick, isLoading }) => {
    if (isLoading) {
        return (
            <Button
                type="button"
                onClick={onClick}
                className="btn-go"
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
                className="btn-go"
            >
                {children}
            </Button>
        );
    }
}

export default CollapseButton;