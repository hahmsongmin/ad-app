import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import LogDataList from "./views/LogDataList";
import "./views/DataList.css";
import IconButton from "@mui/material/IconButton";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import RefreshIcon from "@mui/icons-material/Refresh";
import TabsUnstyled from "@mui/base/TabsUnstyled";
import TabsListUnstyled from "@mui/base/TabsListUnstyled";
import TabPanelUnstyled from "@mui/base/TabPanelUnstyled";
import { buttonUnstyledClasses } from "@mui/base/ButtonUnstyled";
import TabUnstyled, { tabUnstyledClasses } from "@mui/base/TabUnstyled";
import { AdInquire, AdInquireObj, ConcatType, LectureInquire, LectureProps, LogInfo } from "./types";
import AdDataList from "./views/AdDataList";
import Admin from "./views/Admin";
import { GRID_DEFAULT_LOCALE_TEXT } from "./config";
import CustomAlert from "./components/CustomAlert";
import IMCLASS from "./service/api";
import { LogTest } from "./TestData";

function App({ apiCaller }: { apiCaller: IMCLASS }) {
  const [logDataInfo, setLogDataInfo] = useState<LogInfo[]>([]);
  const [concatData, setConcatData] = useState<ConcatType>({});
  const [adminData, setAdminData] = useState<LectureInquire["lectures"]>([]);
  const [isLectureDataOK, setIsLectureDataOK] = useState<Boolean>(false);
  const [lectureId, setLectureId] = useState<string[]>([]);
  const [filteredLecture, setFilteredLecture] = useState<LectureProps>({});
  const [visible, setVisible] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [adJoinBtnVisible, setAdJoinBtnVisible] = useState<boolean>(false);
  const [selectedLectureId, setSelectedLectureId] = useState<string>("0");
  const [alertErrorVisible, setAlertErrorVisible] = useState<boolean>(false);
  const [alertNoteVisible, setAlertNoteVisible] = useState<boolean>(false);
  const [alertSuccessVisible, setAlertSuccessVisible] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndtDate] = useState<string>("");

  const spaceIdRef = useRef<number>(0);

  useEffect(() => {
    const commonDt = (Dt: string): string => {
      return new Date(new Date(Dt).getTime() + 540 * 60 * 1000).toLocaleString("ko-KR");
    };

    const transferDate = (_enterDt: string): string => {
      const dateTemp = commonDt(_enterDt).slice(2, 13).replaceAll(" ", "");
      const date = [
        dateTemp.split(".")[0],
        dateTemp.split(".")[1].padStart(2, "0"),
        dateTemp.split(".")[2].padStart(2, "0"),
      ]
        .join()
        .replaceAll(",", ".");
      return date;
    };

    const transferTime = (_enterDt: string, _leaveDt: string = ""): [string, string] => {
      const dtTemp = commonDt(_enterDt).split(" ")[commonDt(_enterDt).split(" ").length - 1].split(":");
      const enterDt = [String(dtTemp[0]).padStart(2, "0"), String(dtTemp[1]).padStart(2, "0")].join(":");
      let leaveDt = _leaveDt;
      if (_leaveDt === "") {
        leaveDt = _leaveDt;
      } else {
        const dtTemp = commonDt(_leaveDt).split(" ")[commonDt(_leaveDt).split(" ").length - 1].split(":");
        leaveDt = [String(dtTemp[0]).padStart(2, "0"), String(dtTemp[1]).padStart(2, "0")].join(":");
      }
      return [enterDt, leaveDt];
    };

    const transferLogDataInfo = (_result: AdInquire["results"]) => {
      const infoArray: LogInfo[] = [];
      const newData = [..._result];
      const removeDuplicatedMemberId = newData.reverse().reduce((acc: AdInquireObj[], curr: AdInquireObj) => {
        if (acc.findIndex(({ memberId }) => memberId === curr.memberId) === -1) {
          acc.push(curr);
        }
        return acc;
      }, []);
      removeDuplicatedMemberId.reverse().forEach((info) => {
        const logData: LogInfo = {
          memberId: info.memberId,
          memberName: info.memberName,
          date: transferDate(info.enterDt),
          enterDt: transferTime(info.enterDt)[0],
          leaveDt: info.leaveDt === null ? "" : transferTime(info.enterDt, info.leaveDt)[1],
          memberType: info.isMember ?? "",
        };
        infoArray.push(logData);
      });
      if (infoArray.length > 0) {
        setLogDataInfo(() => {
          return infoArray.map((info) => info);
        });
      }
    };

    const getTodate = (): string => {
      const date: string[] = new Date().toLocaleString().split(".")!;
      const year = date[0];
      const month = date[1];
      const day = date[2];
      return `${year.trim()}.${month.trim().padStart(2, "0")}.${day.trim().padStart(2, "0")}`;
    };

    const handleFilterLecture = (lectureResults: LectureInquire["lectures"]) => {
      let filterResults: LectureProps = {};
      lectureResults.forEach((lecture) => {
        filterResults = {
          ...filterResults,
          [String(lecture.lectureId)]: {
            lectureName: lecture.lectureName,
            startTime: lecture.startTime,
            endTime: lecture.endTime,
          },
        };
      });
      setFilteredLecture(filterResults);
    };

    const getInitHandler = async () => {
      console.log("✅ 데이터 조회");
      try {
        const adResults: AdInquire["results"] = await apiCaller.getAdInquire();
        const lectureResults: LectureInquire["lectures"] | undefined = await apiCaller.getLectureInquire();

        transferLogDataInfo(LogTest.results); //  adResults 출석로그 출력

        if (lectureResults != null) {
          let _startDate = startDate;
          let _endDate = endDate;
          if (_startDate === "" && _endDate === "") {
            _startDate = getTodate();
            _endDate = getTodate();
          } else if (_endDate === "") {
            _endDate = _startDate;
          }
          setAdminData(lectureResults);
          setIsLectureDataOK(Object.keys(lectureResults).length > 0 ? true : false);
          setLectureId(lectureResults.map((lecture) => String(lecture.lectureId)));
          handleFilterLecture(lectureResults);
          // => 출결정보 추가 (유저가 ? ) 참가 ? 참여 ?
          if (LogTest.results.length > 0) {
            // adResults.length > 0
            const concatResults: ConcatType | void = await apiCaller.getPresentInquire(
              lectureResults,
              _startDate,
              _endDate
            );
            if (concatResults != null) {
              setConcatData(concatResults);
            }
          }
        }
      } catch {
      } finally {
        setVisible(true);
      }
    };

    if (refresh) {
      getInitHandler();
      setRefresh((curr: boolean) => !curr);
    }

    // 스페이스 진입 => 클라(memberId, spaceId 로 api 출석 추가)
    // 스페이스 나갈시 => 클라(memberId, spaceId 로 api 퇴실 추가)
    // 출석부 클릭 시 spaceId로 api 출석 조회 화면에 출력 ⭐(spaceId, memberId 넘겨주세요)

    const adBtn = document.querySelector(".ad")!;
    // 이벤트 정의 하세요(클라-출석부) =>
    const spaceId: number = 345;
    const memberId: number = 5085;
    adBtn.addEventListener("click", () => {
      spaceIdRef.current = spaceId;
      apiCaller.setSpaceAndMemberId(spaceId, memberId);
      getInitHandler();
    });
  }, [apiCaller, refresh, concatData, startDate, endDate]);

  const childrenRefreshAuto = () => {
    setRefresh(true);
  };

  const isClickJoinBtn = async () => {
    console.log(selectedLectureId);
    if (selectedLectureId === "0") {
      setAlertNoteVisible(true);
      setTimeout(() => {
        setAlertNoteVisible(false);
      }, 3000);
    } else {
      const reponse = await apiCaller.putPresent(Number(selectedLectureId));
      if (reponse.code === 1000) {
        setSelectedLectureId("");
      }
    }
  };

  const tabClickCheck = (isEdit: boolean, isAd: boolean) => {
    GRID_DEFAULT_LOCALE_TEXT.isClickEdit = isEdit;
    GRID_DEFAULT_LOCALE_TEXT.isClickAd = isAd;
    if (isAd) {
      setAdJoinBtnVisible(true);
    } else {
      setAdJoinBtnVisible(false);
    }
  };

  return (
    <AppContainer className="App" visible={visible}>
      <Title>출결관리</Title>
      {alertErrorVisible && <CustomAlert errorMsg="시작시간 또는 종료시간이 잘못되었습니다." />}
      {alertNoteVisible && <CustomAlert errorMsg="상단의 참여하실 시간 설정을 선택해주세요." />}
      {alertSuccessVisible && <CustomAlert successMsg="수정이 완료되었습니다." />}
      <CloseBtn className="close" onClick={() => setVisible(false)}>
        <IconButton color="inherit">
          <CloseIcon sx={{ fontSize: 30, color: "white" }} />
        </IconButton>
      </CloseBtn>
      <TabsUnstyled defaultValue={0}>
        <TabsList>
          <Tab onClick={() => tabClickCheck(false, false)}>출석 로그</Tab>
          <Tab onClick={() => tabClickCheck(false, true)}>출석부</Tab>
          <Tab onClick={() => tabClickCheck(true, false)}>시간 설정</Tab>
        </TabsList>
        <TabPanel value={0}>
          <LogDataList logDataInfo={logDataInfo} />
        </TabPanel>
        <TabPanel value={1}>
          <AdDataList
            apiCaller={apiCaller}
            concatData={concatData}
            lectureId={lectureId}
            isLectureDataOK={isLectureDataOK}
            filteredLecture={filteredLecture}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndtDate={setEndtDate}
            childrenRefreshAuto={childrenRefreshAuto}
            setSelectedLectureId={setSelectedLectureId}
          />
        </TabPanel>
        <TabPanel value={2}>
          <Admin
            apiCaller={apiCaller}
            adminData={adminData}
            childrenRefreshAuto={childrenRefreshAuto}
            setAlertErrorVisible={setAlertErrorVisible}
            setAlertSuccessVisible={setAlertSuccessVisible}
          />
        </TabPanel>
      </TabsUnstyled>
      <ReFresh>
        <Button
          onClick={() => setRefresh(true)}
          variant="contained"
          endIcon={<RefreshIcon />}
          color="inherit"
          sx={{ width: 110, fontSize: 12, height: 30 }}
        >
          새로고침
        </Button>
        {adJoinBtnVisible && (
          <Button
            variant="contained"
            color="error"
            endIcon={<DoneOutlineIcon />}
            sx={{ width: 90, marginLeft: 2, fontSize: 12, height: 35, fontWeight: "bold" }}
            onClick={isClickJoinBtn}
          >
            참여
          </Button>
        )}
      </ReFresh>
    </AppContainer>
  );
}

export default App;

const AppContainer = styled.div<{ visible: boolean }>`
  display: ${(props) => (props.visible === true ? "flex" : "none")};
  position: relative;
  max-width: 790px;
  height: 600px;
  flex-direction: column;
  padding: 60px;
  padding-bottom: 50px;
  margin: 0 auto;
  background-color: #00a29a;
  border-radius: 15px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.35);
  -webkit-box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.35);
  -moz-box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.35);
`;

const ReFresh = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  bottom: 10px;
  right: 60px;
`;

const Title = styled.h1`
  color: white;
  text-align: center;
  margin-bottom: 20px;
  font-size: 35px;
  transform: translateY(-40%);
`;

const CloseBtn = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  text-align: end;
`;

const Tab = styled(TabUnstyled)`
  font-family: IBM Plex Sans, sans-serif;
  color: white;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: bold;
  background-color: transparent;
  padding: 12px 16px;
  margin: 6px 6px;
  border: none;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  border: 2px solid white;

  &:hover {
    background-color: white;
    color: #00a29a;
  }

  &:focus {
    color: white;
    border-radius: 3px;
    outline: 2px solid #00a29a;
    outline-offset: 2px;
  }

  &.${tabUnstyledClasses.selected} {
    background-color: white;
    color: #00a29a;
  }

  &.${buttonUnstyledClasses.disabled} {
    border: 2px solid white;
  }
`;

const TabPanel = styled(TabPanelUnstyled)`
  width: 100%;
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.7rem;
`;

const TabsList = styled(TabsListUnstyled)`
  z-index: 10;
  position: absolute;
  left: 385px;
  top: 92px;
  min-width: 370px;
  border-radius: 8px;
  margin-top: 16px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: space-between;
  button {
    display: flex;
    align-items: center;
    width: 100px;
    height: 40px;
    box-shadow: 2px 3px 3px 0px rgba(0, 0, 0, 0.25);
    -webkit-box-shadow: 2px 3px 3px 0px rgba(0, 0, 0, 0.25);
    -moz-box-shadow: 2px 3px 3px 0px rgba(0, 0, 0, 0.25);
  }
`;
