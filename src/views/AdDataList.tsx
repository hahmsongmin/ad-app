import React, { Dispatch, useCallback, useEffect, useRef, useState } from "react";
import { DataGrid, GridEditRowsModel, GridRowParams } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import { AdColumns, DataListBox, FromControl, GRID_DEFAULT_LOCALE_TEXT } from "../config";
import QuickSearchToolbar from "../components/QuickSearchToolbar";
import CustomPagination from "../components/CustomPagination";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DatePicker";
import { ConcatType, postPresentModification } from "../service/api";
import NativeSelect from "@mui/material/NativeSelect";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";

export type RowsProps = {
  id: number;
  수업명: string;
  닉네임: string;
  날짜: string;
  타입: string;
  출결: string;
};

const PRESENT = {
  currentValue: "",
};

function AdDataList({
  concatData,
  lectureId,
  isConcatDataOK,
  startDate,
  setStartDate,
  endDate,
  setEndtDate,
  searchDate,
}: {
  concatData: ConcatType;
  lectureId: string[];
  isConcatDataOK: Boolean;
  startDate: string;
  setStartDate: Dispatch<string>;
  endDate: string;
  setEndtDate: Dispatch<string>;
  searchDate: () => void;
}) {
  const [userAdData, setUserAdData] = useState<RowsProps[]>([]);
  const [howManyData, setHowManyData] = useState<string>("");
  const [lectureName, setLectureName] = useState<string>("");
  const selectedLectureRef = useRef<string>("");

  const handleEditRowsChange = useCallback((changedProps: GridEditRowsModel) => {
    const [presentId] = Object.keys(changedProps);
    const tempObj = changedProps[String(presentId)];
    if (tempObj != null) {
      const changedValue = tempObj["출결"].value;
      if (PRESENT.currentValue !== changedValue && changedValue != null) {
        let present = "";
        switch (changedValue) {
          case "출석":
            present = "present";
            break;
          case "미출석":
            present = "absent";
            break;
          default:
            present = "absent";
            break;
        }
        postPresentModification(Number(presentId), present as string);
        PRESENT.currentValue = "";
      }
    }
  }, []);

  const handleRowsDoubleClick = useCallback((params: GridRowParams) => {
    if (params != null) {
      PRESENT.currentValue = params.row["출결"];
    }
  }, []);

  const handleChange = (event: SelectChangeEvent) => {
    setHowManyData(event.target.value);
  };

  const selectOnchange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId: string = (selectedLectureRef.current = Object.values(event.target?.selectedOptions)[0]?.id);
    adDataInfo(selectedId);
  };

  const adDataInfo = useCallback(
    (lectureId: string) => {
      const data = concatData[lectureId];
      if (data?.person != null) {
        const newData = data?.person?.map((info) => {
          return {
            id: info.presentId,
            수업명: data.lectureName,
            닉네임: info.memberName,
            날짜: info.presentDate,
            타입: info.isMember,
            출결: info.present,
          };
        });
        setLectureName(concatData[lectureId].lectureName);
        setUserAdData(newData);
      }
    },
    [concatData]
  );

  useEffect(() => {
    if (isConcatDataOK) {
      selectedLectureRef.current = lectureId[0];
      setLectureName(concatData[String(selectedLectureRef.current)]?.lectureName);
      adDataInfo(String(concatData[lectureId[0]]?.lectureId));
    }
  }, [adDataInfo, concatData, isConcatDataOK, lectureId]);

  const LectureSelect = () => {
    return (
      <Box sx={{ minWidth: 120, position: "absolute", top: 70, left: 75 }}>
        <FormControl fullWidth>
          {selectedLectureRef.current && (
            <NativeSelect defaultValue={lectureName} onChange={selectOnchange}>
              {lectureId.sort().map((id) => (
                <option key={id} id={id}>
                  {concatData[id]?.lectureName}
                </option>
              ))}
            </NativeSelect>
          )}
        </FormControl>
      </Box>
    );
  };

  const SearchCalendar = () => {
    return (
      <ButtonGroup
        disableElevation
        variant="contained"
        sx={{ display: "flex", position: "absolute", top: 70, right: 70 }}
      >
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DesktopDatePicker
            value={startDate}
            onChange={(newValue) => {
              const date: string[] = newValue?.toLocaleString().split(".")!;
              const year = date[0];
              const month = date[1];
              const day = date[2];
              setStartDate(`${year.trim()}.${month.trim().padStart(2, "0")}.${day.trim().padStart(2, "0")}`);
            }}
            renderInput={({ inputRef, inputProps, InputProps }) => (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <span style={{ marginRight: "-20px" }}>시작일</span>
                <input ref={inputRef} {...inputProps} style={{ width: 0, opacity: 0 }} />
                {InputProps?.endAdornment}
              </Box>
            )}
          />
          <DesktopDatePicker
            value={endDate}
            onChange={(newValue) => {
              const date: string[] = newValue?.toLocaleString().split(".")!;
              const year = date[0];
              const month = date[1];
              const day = date[2];
              setEndtDate(`${year.trim()}.${month.trim().padStart(2, "0")}.${day.trim().padStart(2, "0")}`);
            }}
            renderInput={({ inputRef, inputProps, InputProps }) => (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <span style={{ margin: "0 -20px 0 10px" }}>종료일</span>
                <input ref={inputRef} {...inputProps} style={{ width: 0, opacity: 0 }} />
                {InputProps?.endAdornment}
              </Box>
            )}
          />
        </LocalizationProvider>
        <Button sx={{ marginLeft: 1 }} onClick={searchDate}>
          검색
        </Button>
      </ButtonGroup>
    );
  };

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
      {isConcatDataOK && <LectureSelect />}
      <SearchCalendar />
    </Box>
  );
}

export default AdDataList;
