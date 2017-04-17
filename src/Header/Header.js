import React from 'react';
import { Row, Col } from 'reactstrap';
import './Header.css';

import SearchBar from './SearchBar/SearchBar';

const Header = ({ setCompanyName }) => {
    return (
        <Row className="header-top">
            <Col xs="6" sm="4">
                <SearchBar
                    change={(item) => setCompanyName(item)}
                />
            </Col>
            <Col xs="6" sm="4">
            </Col>
        </Row>
    );
}

export default Header;