import React from 'react';
import DatePicker from "react-datepicker";

const Calendar = ({ start_date, end_date, handleChangeStart, handleChangeEnd }) => {
    return (
        <div>
            <DatePicker
                selected={start_date}
                selectsStart startDate={start_date}
                endDate={end_date}
                onChange={handleChangeStart}
            />
            <DatePicker
                selected={end_date}
                selectsEnd startDate={start_date}
                endDate={end_date}
                onChange={handleChangeEnd}
            />
        </div>
    );
}

export default Calendar; 