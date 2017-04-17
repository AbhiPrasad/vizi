import React from 'react';
import DatePicker from "react-datepicker";

import './Calendar.css';

import { Row, Col } from 'reactstrap';


const Calendar = ({ start_date, end_date, handleChangeStart, handleChangeEnd }) => {
    return (
        <Row className="cals">
            <Col
                sm={{ size: 8, offset: 2 }}
                className="text-center"
            >
            Start: <DatePicker
                selected={start_date}
                selectsStart startDate={start_date}
                endDate={end_date}
                onChange={handleChangeStart}
            />
            <span className="endstuff">End:</span> <DatePicker
                selected={end_date}
                selectsEnd startDate={start_date}
                endDate={end_date}
                onChange={handleChangeEnd}
            />
            </Col>
        </Row>
    );
}

export default Calendar; 