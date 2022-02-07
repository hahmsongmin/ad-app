import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { DataGrid, GridRenderCellParams, GridEditCellPropsParams, GridCellParams, MuiEvent } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";
import { DataListBox, FormControlStyle, GRID_DEFAULT_LOCALE_TEXT, InputLabelStyle, SelectStyle } from "../config";
import React, { useCallback, useEffect, useRef, useState } from "react";
import CustomPagination from "../components/CustomPagination";
import QuickSearchToolbar from "../components/QuickSearchToolbar";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import IMCLASS from "../service/api";
import { LectureInquire } from "../types";

type AdminProps = {
  id: number;
  NO: number; // lectureId 1 부터
  시간설정: string;
  시작시간: string;
  종료시간: string;
};

const regTimeRef = /^[0-9]{2}[:]{1}[0-9]{2}$/;

function Admin({
  apiCaller,
  adminData: _adminData,
  childrenRefreshAuto,
  setAlertErrorVisible,
  setAlertSuccessVisible,
  setSelectedLectureId,
}: {
  apiCaller: IMCLASS;
  adminData: LectureInquire["lectures"];
  childrenRefreshAuto: () => void;
  setAlertErrorVisible: React.Dispatch<boolean>;
  setAlertSuccessVisible: React.Dispatch<boolean>;
  setSelectedLectureId: React.Dispatch<string>;
}) {
  const [addVisible, setAddVisible] = useState(false);
  const [howManyData, setHowManyData] = useState<string>("");
  const [adminData, setAdminData] = useState<AdminProps[]>([]);
  const [isDelModalVisible, setIsDelModalVisible] = useState<boolean>(false);
  const classNameRef: React.RefObject<HTMLInputElement> = useRef(null);
  const startTimeRef: React.RefObject<HTMLInputElement> = useRef(null);
  const endTimeRef: React.RefObject<HTMLInputElement> = useRef(null);
  let row = 0;
  let deleteRef = useRef(Array.from({ length: row }));

  useEffect(() => {
    const data = _adminData.map((info, index) => {
      return {
        id: info.lectureId,
        NO: index + 1,
        시간설정: info.lectureName,
        시작시간: info.startTime,
        종료시간: info.endTime,
      };
    });
    setAdminData(data);
  }, [_adminData]);

  const handleClickOpen = () => {
    setAddVisible(true);
  };

  const handleClose = () => {
    setAddVisible(false);
  };

  const handleChange = (event: SelectChangeEvent) => {
    setHowManyData(event.target.value);
  };

  const clickEditRowsBtn = useCallback(
    async (params: GridRenderCellParams) => {
      const { id, 시간설정, 시작시간, 종료시간 } = params.row;
      if (시간설정 != null && 시작시간 != null && 종료시간 != null) {
        if (regTimeRef.test(시작시간) && regTimeRef.test(종료시간)) {
          const data = await apiCaller.postLecture(id, 시간설정, 시작시간, 종료시간);
          if (data.code === 1000) {
            setAlertSuccessVisible(true);
            setTimeout(() => {
              setAlertSuccessVisible(false);
            }, 3000);
          }
        } else {
          setAlertErrorVisible(true);
          setTimeout(() => {
            setAlertErrorVisible(false);
          }, 3000);
        }
      }
    },
    [apiCaller, setAlertErrorVisible, setAlertSuccessVisible]
  );

  const clickSaveBtn = async () => {
    const lectureName = classNameRef.current?.value;
    const startTime = startTimeRef.current?.value;
    const endTime = endTimeRef.current?.value;
    if (lectureName != null && startTime != null && endTime != null) {
      if (regTimeRef.test(startTime) && regTimeRef.test(endTime)) {
        const data = await apiCaller.putLecture(lectureName, startTime, endTime);
        if (data.code === 1000) childrenRefreshAuto();
        setAddVisible(false);
      } else {
        if (lectureName === "") {
          classNameRef.current?.focus();
        } else if (startTime === "" || !regTimeRef.test(startTime)) {
          startTimeRef.current?.focus();
        } else if (endTime === "" || !regTimeRef.test(endTime)) {
          endTimeRef.current?.focus();
        }
      }
    }
  };

  const selectedIdForDelete = (selectedId: Set<number | string>) => {
    const arr: Array<number | string> = Array.from(selectedId.values());
    deleteRef.current = [...arr];
  };

  const AddTextFields = () => {
    return (
      <Dialog open={addVisible} onClose={handleClose}>
        <DialogTitle>추가</DialogTitle>
        <DialogContent>
          <TextField
            inputRef={classNameRef}
            placeholder="시간을 입력해주세요."
            autoFocus
            margin="dense"
            id="name"
            label="시간설정"
            fullWidth
            type="text"
            variant="standard"
            color="primary"
          />
          <TextField
            inputRef={startTimeRef}
            placeholder="시작시간을 입력해주세요. 예시(09:00)"
            margin="dense"
            id="name"
            label="시작시간"
            type="text"
            fullWidth
            variant="standard"
            color="primary"
          />
          <TextField
            inputRef={endTimeRef}
            placeholder="종료시간을 입력해주세요. 예시(10:00)"
            margin="dense"
            id="name"
            label="종료시간"
            type="text"
            fullWidth
            variant="standard"
            color="primary"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>뒤로가기</Button>
          <Button onClick={clickSaveBtn}>저장하기</Button>
        </DialogActions>
      </Dialog>
    );
  };

  const deleteHandleClick = useCallback(() => {
    if (deleteRef.current.length === 0) return;
    const newAdminData = [...adminData];
    deleteRef.current.forEach((id) => {
      newAdminData.forEach((info, index) => {
        if (id === info.id) {
          newAdminData.splice(index, 1);
          apiCaller.deleteLecture(info.id);
          setSelectedLectureId("0");
          setIsDelModalVisible(false);
        }
      });
    });
    setTimeout(() => {
      setAdminData(newAdminData);
    }, 0);
    deleteRef.current = [];
  }, [adminData, apiCaller, setSelectedLectureId]);

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    borderRadius: 5,
    border: "2px solid #00a29a",
    boxShadow: 24,
    p: 4,
  };

  const DeleteInfoModal = () => {
    return (
      <div>
        <Modal
          open={isDelModalVisible}
          onClose={() => setIsDelModalVisible(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          hideBackdrop={false} // backBg => hidden : true
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              정말로 삭제하시겠습니까?
            </Typography>
            <Box sx={{ textAlign: "end" }}>
              <Button onClick={deleteHandleClick}>예</Button>
              <Button onClick={() => setIsDelModalVisible(false)}>아니오</Button>
            </Box>
          </Box>
        </Modal>
      </div>
    );
  };

  const BtnAddDeleteGroup = () => {
    return (
      <AddDeleteBtn>
        <Button color="inherit" startIcon={<AddIcon />} onClick={handleClickOpen}>
          추가
        </Button>
        <Button
          color="inherit"
          startIcon={<DeleteIcon />}
          onClick={() => {
            deleteRef.current.length > 0 && setIsDelModalVisible(true);
          }}
        >
          삭제
        </Button>
      </AddDeleteBtn>
    );
  };

  const AddDeleteBtn = styled(Box)({
    position: "absolute",
    color: "white",
    top: 165,
    right: 75,
  });

  const handleEditCell = (params: GridEditCellPropsParams) => {
    const array = adminData.map((curr) => {
      if (curr.id === params.id) {
        return { ...curr, [params.field]: params.props.value };
      } else {
        return { ...curr };
      }
    });
    setAdminData(array);
  };

  return (
    <>
      <Box sx={DataListBox}>
        {isDelModalVisible && <DeleteInfoModal />}
        <FormControl sx={{ ...FormControlStyle, left: 0 }}>
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
          rows={adminData}
          onCellKeyDown={(params: GridCellParams, event: MuiEvent<React.KeyboardEvent>) => {
            if (event.key === "Enter") {
              setTimeout(() => {
                document.querySelector("h1")?.click();
              }, 500);
              event.stopPropagation(); // Bubbling
            }
          }}
          onEditCellPropsChange={handleEditCell}
          pageSize={howManyData ? Number(howManyData) : 15}
          rowsPerPageOptions={[]}
          checkboxSelection
          onSelectionModelChange={(item) => {
            const selectedIDs = new Set(item);
            row = item.length;
            selectedIdForDelete(selectedIDs);
          }}
          pagination
          columns={[
            { field: "NO", type: "number", width: 100 },
            {
              field: "시간설정",
              type: "string",
              width: 200,
              editable: true,
            },
            { field: "시작시간", type: "string", width: 140, editable: true },
            { field: "종료시간", type: "string", width: 140, editable: true },
            {
              field: "actions",
              type: "actions",
              width: 155,
              renderCell: (params: GridRenderCellParams) => {
                const onClickModification = () => {
                  clickEditRowsBtn(params);
                };
                return (
                  <Button
                    variant="contained"
                    color="inherit"
                    size="small"
                    style={{ borderRadius: 5 }}
                    startIcon={<EditIcon />}
                    onClick={onClickModification}
                  >
                    저장
                  </Button>
                );
              },
            },
          ]}
          editMode="row"
          components={{
            Toolbar: QuickSearchToolbar,
            Pagination: CustomPagination,
          }}
          localeText={GRID_DEFAULT_LOCALE_TEXT}
        />
      </Box>
      <AddTextFields />
      <BtnAddDeleteGroup />
    </>
  );
}

export default Admin;
