import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";

import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import { LogInfo } from "../App";
import { DataListBox, FromControl, GRID_DEFAULT_LOCALE_TEXT, LogColumns } from "../config";
import QuickSearchToolbar from "../components/QuickSearchToolbar";
import CustomPagination from "../components/CustomPagination";

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
  const [howManyData, setHowManyData] = useState<string>("");
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
        타입: info.memberType === "Y" ? "멤버" : "게스트",
      };
    });
    setUserLogData(data);
  }, [_logDataInfo]);

  return (
    <Box sx={DataListBox}>
      <FormControl sx={FromControl}>
        <InputLabel id="demo-simple-select-disabled-label" sx={{ color: "white", fontSize: 14 }}>
          모아보기
        </InputLabel>
        <Select sx={{ height: 50 }} variant="outlined" onChange={handleChange} value={howManyData} label="모아보기">
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
