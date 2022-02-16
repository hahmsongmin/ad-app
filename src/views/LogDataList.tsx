import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import { DataListBox, FormControlStyle, GRID_DEFAULT_LOCALE_TEXT, InputLabelStyle, LogColumns, SelectStyle } from '../config';
import QuickSearchToolbar from '../components/QuickSearchToolbar';
import CustomPagination from '../components/CustomPagination';
import { LogInfo } from '../types';

type RowsProps = {
  id: number;
  닉네임: string;
  날짜: string;
  입장: string;
  퇴장: string;
  타입: string;
};

function LogDataList({ logDataInfo: _logDataInfo }: { logDataInfo: Array<LogInfo> }) {
  const [userLogData, setUserLogData] = useState<RowsProps[]>([]);
  const [howManyData, setHowManyData] = useState<string>('');
  const handleChange = (event: SelectChangeEvent) => {
    setHowManyData(event.target.value);
  };

  useEffect(() => {
    const data = _logDataInfo.map((info, index) => {
      return {
        id: index + 1,
        닉네임: info.memberName,
        날짜: info.date,
        입장: info.enterDt,
        퇴장: info.leaveDt,
        타입: info.memberType === 'Y' ? '멤버' : '게스트',
      };
    });
    setUserLogData(data);
  }, [_logDataInfo]);

  return (
    <Box sx={DataListBox}>
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
        rows={userLogData}
        columns={LogColumns}
        checkboxSelection
        components={{
          Toolbar: QuickSearchToolbar,
          Pagination: CustomPagination,
        }}
        localeText={GRID_DEFAULT_LOCALE_TEXT}
      />
    </Box>
  );
}

export default LogDataList;
