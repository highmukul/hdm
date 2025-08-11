import { useState } from 'react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import * as FiIcons from 'react-icons/fi';
import { format } from 'date-fns';

const DateRangePicker = ({ onDateChange }) => {
    const [showPicker, setShowPicker] = useState(false);
    const [dateRange, setDateRange] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);

    const handleSelect = (ranges) => {
        setDateRange([ranges.selection]);
        onDateChange({
            startDate: ranges.selection.startDate,
            endDate: ranges.selection.endDate
        });
        setShowPicker(false);
    };

    return (
        <div className="relative">
            <button
                onClick={() => setShowPicker(!showPicker)}
                className="btn-secondary flex items-center space-x-2"
            >
                <FiIcons.FiCalendar />
                <span>{`${format(dateRange[0].startDate, 'MMM d, yyyy')} - ${format(dateRange[0].endDate, 'MMM d, yyyy')}`}</span>
                <FiIcons.FiChevronDown />
            </button>
            {showPicker && (
                <div className="absolute top-full right-0 z-10 mt-2">
                    <DateRange
                        editableDateInputs={true}
                        onChange={handleSelect}
                        moveRangeOnFirstSelection={false}
                        ranges={dateRange}
                    />
                </div>
            )}
        </div>
    );
};

export default DateRangePicker;
