import React, { useState } from 'react';
import { DateRange, Range, RangeKeyDict } from 'react-date-range';
import styled from 'styled-components';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

const SearchCalendar = () => {
  const [selectedState, setSelectedState] = useState<Range[]>([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);

  const handleChange = (rangesByKey: RangeKeyDict) => {
    setSelectedState([rangesByKey.selection]);
    const {
      selection: { startDate: _startDate, endDate: _endDate },
    } = rangesByKey;
    const _startTemp = _startDate?.toLocaleDateString().replaceAll(' ', '').split('.')!;
    const _endTemp = _endDate?.toLocaleDateString().replaceAll(' ', '').split('.')!;
    const [startYear, startMonth, startDay] = _startTemp;
    const [endYear, endMonth, endtDay] = _endTemp;
    const startDate = `${startYear.trim()}.${startMonth.trim().padStart(2, '0')}.${startDay.trim().padStart(2, '0')}`;
    const endDate = `${endYear.trim()}.${endMonth.trim().padStart(2, '0')}.${endtDay.trim().padStart(2, '0')}`;
    console.log(startDate, endDate);
  };

  return (
    <Container>
      <DateRange
        editableDateInputs={true}
        onChange={handleChange}
        moveRangeOnFirstSelection={false}
        ranges={selectedState}
        rangeColors={['red', 'blue']}
      />
    </Container>
  );
};

export default SearchCalendar;

const Container = styled.div`
  text-align: center;
  position: absolute;
  right: 60px;
  top: 50px;
  z-index: 20;
  .rdrDay {
    height: 3.5em;
  }
  .rdrMonth {
    border-radius: 10px;
  }
`;
