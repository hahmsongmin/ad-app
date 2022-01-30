import React, { Dispatch, useCallback, useEffect, useRef, useState } from 'react';
import { DataGrid, GridEditRowsModel, GridRowParams } from '@mui/x-data-grid';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import {
  AdColumns,
  DataListBox,
  FormControlStyle,
  GRID_DEFAULT_LOCALE_TEXT,
  InputLabelStyle,
  SelectStyle,
} from '../config';
import QuickSearchToolbar from '../components/QuickSearchToolbar';
import CustomPagination from '../components/CustomPagination';
import NativeSelect from '@mui/material/NativeSelect';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import { ConcatType, LectureProps } from '../types';
import IMCLASS from '../service/api';
import SearchCalendar from '../components/SearchCalendar';

type RowsProps = {
  id: number;
  시간설정: string;
  닉네임: string;
  날짜: string;
  타입: string;
  출결: string;
};

const PRESENT = {
  currentValue: '',
};

function AdDataList({
  concatData,
  lectureId,
  isLectureDataOK,
  filteredLecture,
  setStartDate,
  setEndtDate,
  childrenRefreshAuto,
  setSelectedLectureId,
  apiCaller,
}: {
  concatData: ConcatType;
  lectureId: string[];
  isLectureDataOK: Boolean;
  filteredLecture: LectureProps;
  setStartDate: Dispatch<string>;
  setEndtDate: Dispatch<string>;
  setSelectedLectureId: Dispatch<string>;
  apiCaller: IMCLASS;
  childrenRefreshAuto: () => void;
}) {
  const [userAdData, setUserAdData] = useState<RowsProps[]>([]);
  const [howManyData, setHowManyData] = useState<string>('');
  const [selectLectureName, setSelectLectureName] = useState<string>('');
  const [calendarDateVisible, setCalendarDateVisible] = useState<boolean>(false);
  const selectedLectureRef = useRef<string>('');

  const handleEditRowsChange = useCallback(
    (changedProps: GridEditRowsModel) => {
      const [presentId] = Object.keys(changedProps);
      const tempObj = changedProps[String(presentId)];
      if (tempObj != null) {
        const changedValue = tempObj['출결'].value;
        if (PRESENT.currentValue !== changedValue && changedValue != null) {
          let present = '';
          switch (changedValue) {
            case '출석':
              present = 'present';
              break;
            case '미출석':
              present = 'absent';
              break;
            default:
              present = 'absent';
              break;
          }
          apiCaller.postPresent(Number(presentId), present as string);
          PRESENT.currentValue = '';
        }
      }
    },
    [apiCaller]
  );

  const handleRowsDoubleClick = useCallback((params: GridRowParams) => {
    if (params != null) {
      PRESENT.currentValue = params.row['출결'];
    }
  }, []);

  const handleChange = (event: SelectChangeEvent) => {
    setHowManyData(event.target.value);
  };

  const selectOnchange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectLectureName(event.target.value);
    const selectedLectureId: string = (selectedLectureRef.current = Object.values(
      event.target?.selectedOptions
    )[0]?.id);
    setSelectedLectureId(selectedLectureId);
    adDataInfo(selectedLectureId);
  };

  const transferDate = (presentDate: string): string => {
    const date = presentDate.slice(2).replaceAll('-', '.');
    return date;
  };

  const clickSearchBtn = () => {
    setCalendarDateVisible(true);
  };

  const closeCalendarBtn = () => {
    setCalendarDateVisible(false);
  };

  const adDataInfo = useCallback(
    (lectureId: string) => {
      const data = concatData[lectureId];
      if (data?.person != null) {
        const newData = data?.person?.map((info) => {
          return {
            id: info.presentId,
            시간설정: data.lectureName,
            닉네임: info.memberName,
            날짜: transferDate(info.presentDate),
            타입: info.isMember === 'Y' ? '멤버' : '게스트',
            출결: info.present === 'absent' ? '미출석' : '출석',
          };
        });
        setSelectLectureName(concatData[lectureId].lectureName);
        setUserAdData(newData);
      }
    },
    [concatData]
  );

  useEffect(() => {
    if (isLectureDataOK) {
      selectedLectureRef.current = lectureId[0];
      setSelectLectureName(concatData[String(selectedLectureRef.current)]?.lectureName);
      adDataInfo(String(concatData[lectureId[0]]?.lectureId));
    }
  }, [adDataInfo, concatData, isLectureDataOK, lectureId]);

  const LectureSelect = () => {
    return (
      <LectureSelectBox>
        <FormControl fullWidth>
          {selectedLectureRef.current && (
            <NativeSelect onChange={selectOnchange} value={selectLectureName}>
              <option value="참여시간설정" id="0">
                참여시간설정
              </option>
              {lectureId.sort().map((id) => (
                <option key={id} id={id} value={filteredLecture[id]?.lectureName}>
                  {filteredLecture[id]?.lectureName}
                </option>
              ))}
            </NativeSelect>
          )}
        </FormControl>
      </LectureSelectBox>
    );
  };

  return (
    <Box sx={DataListBox}>
      <ButtonGroup>
        <SearchBtn onClick={clickSearchBtn}>날짜 검색</SearchBtn>
      </ButtonGroup>
      <FormControl sx={FormControlStyle}>
        <InputLabel id="demo-simple-select-disabled-label" sx={InputLabelStyle}>
          모아보기
        </InputLabel>
        <Select sx={SelectStyle} variant="outlined" onChange={handleChange} value={howManyData} label="모아보기">
          <MenuItem value="25">25개씩</MenuItem>
          <MenuItem value="50">50개씩</MenuItem>
          <MenuItem value="100">100개씩</MenuItem>
        </Select>
      </FormControl>
      <DataGrid
        pageSize={howManyData ? Number(howManyData) : 15}
        rowsPerPageOptions={[]}
        pagination
        rows={userAdData}
        onEditRowsModelChange={handleEditRowsChange}
        onRowDoubleClick={handleRowsDoubleClick}
        columns={AdColumns}
        checkboxSelection
        components={{
          Toolbar: QuickSearchToolbar,
          Pagination: CustomPagination,
        }}
        localeText={GRID_DEFAULT_LOCALE_TEXT}
      />
      {isLectureDataOK && <LectureSelect />}
      {calendarDateVisible && (
        <SearchCalendar
          closeCalendarBtn={closeCalendarBtn}
          childrenRefreshAuto={childrenRefreshAuto}
          setStartDate={setStartDate}
          setEndtDate={setEndtDate}
        />
      )}
    </Box>
  );
}

export default AdDataList;

const LectureSelectBox = styled(Box)`
  max-width: 200px;
  position: absolute;
  transform: translate(5px, -50px);
`;

const SearchBtn = styled(Button)`
  color: white;
  position: absolute;
  background-color: inherit;
  border: 2px solid white;
  border-radius: 5;
  width: 100px;
  height: 43px;
  right: 65px;
  top: 60px;
  font-size: 0.875rem;
  font-weight: bold;
  &:hover {
    color: #00a29a;
    background-color: white !important;
    border: 2px solid white;
  }
`;
