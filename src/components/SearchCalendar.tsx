import React, { useState } from "react";
import { DateRange, Preview, Range, RangeKeyDict } from "react-date-range";
import styled from "styled-components";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const SearchCalendar = () => {
  const [selectedState, setSelectedState] = useState<Range[]>([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const handleChange = (rangesByKey: RangeKeyDict) => {
    setSelectedState([rangesByKey.selection]);
    console.log(rangesByKey);
  };

  return (
    <Container>
      <DateRange
        editableDateInputs={true}
        onChange={handleChange}
        moveRangeOnFirstSelection={false}
        ranges={selectedState}
      />
    </Container>
  );
};

export default SearchCalendar;

const Container = styled.div`
  text-align: center;
  position: absolute;
`;
