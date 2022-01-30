import { Dispatch, useState } from 'react';
import { DateRange, Range, RangeKeyDict } from 'react-date-range';
import styled from 'styled-components';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

const SearchCalendar = ({
  closeCalendarBtn,
  childrenRefreshAuto,
  setStartDate,
  setEndtDate,
}: {
  closeCalendarBtn: () => void;
  childrenRefreshAuto: () => void;
  setStartDate: Dispatch<string>;
  setEndtDate: Dispatch<string>;
}) => {
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
    setStartDate(startDate);
    setEndtDate(endDate);
    childrenRefreshAuto();
  };

  return (
    <MainContainer>
      <DateContainer>
        <DateRange
          editableDateInputs={true}
          onChange={handleChange}
          moveRangeOnFirstSelection={false}
          ranges={selectedState}
          rangeColors={['#00a29a', 'red']}
          direction="horizontal"
        />
        <CloseBtn onClick={closeCalendarBtn}>
          <IconButton color="inherit">
            <CloseIcon sx={{ fontSize: 30, color: '#00a29a' }} />
          </IconButton>
        </CloseBtn>
      </DateContainer>
    </MainContainer>
  );
};

export default SearchCalendar;

const MainContainer = styled.div`
  position: absolute;
  z-index: 19;
  width: 470px;
  height: 575px;
  background-color: whitesmoke;
  border-radius: 15px;
  transform: translate(68%, -10%);
  box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.35);
  -webkit-box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.35);
  -moz-box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.35);
`;

const CloseBtn = styled.div`
  position: absolute;
  top: -30px;
  right: 10px;
  text-align: end;
`;

const DateContainer = styled.div`
  box-sizing: border-box;
  text-align: center;
  display: flex;
  justify-content: center;
  transform: translateY(8%);
  align-items: center;
  z-index: 20;
  .rdrDay {
    height: 4em;
  }
  .rdrMonth {
    border-radius: 5px;
  }
  .rdrInRange {
    background-color: #9e9e9e !important;
  }
  .rdrDayInPreview {
    border-top: 1px solid #9e9e9e;
    border-bottom: 1px solid #9e9e9e;
  }
  .rdrDayStartPreview {
    border: 2px solid #9e9e9e;
  }
`;
