import React from 'react';
import DatePicker from "react-datepicker";

import './Calendar.css';

import { Row, Col } from 'reactstrap';


const Calendar = ({ start_date, end_date, handleChangeStart, handleChangeEnd }) => {
    return (
        <Row className="cals">
            <Col
                sm={{ size: 4, offset: 1 }}
                xs={{ size: 5, offset: 1 }}
                className="text-center"
            >
            Start: <DatePicker
                selected={start_date}
                selectsStart startDate={start_date}
                endDate={end_date}
                onChange={handleChangeStart}
            />
            </Col>
            <Col
                className="text-center"
            >
            End: <DatePicker
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