import { AdInquire, LectureInquire, ConcatType } from "./types";

export const LogTest: AdInquire = {
  code: 1000,
  message: "ok",
  results: [
    {
      spaceId: 345,
      spaceName: "비빔면",
      memberId: 5085,
      memberName: "소고기",
      isMember: "Y",
      enterDt: "2022-01-19 03:02:41",
      leaveDt: null,
    },
    {
      spaceId: 345,
      spaceName: "비빔면",
      memberId: 3791,
      memberName: "짜파게티",
      isMember: "N",
      enterDt: "2022-01-27 00:59:49",
      leaveDt: null,
    },
    {
      spaceId: 345,
      spaceName: "비빔면",
      memberId: 5917,
      memberName: "차돌떡볶이",
      isMember: "N",
      enterDt: "2022-01-27 00:59:59",
      leaveDt: null,
    },
    {
      spaceId: 345,
      spaceName: "비빔면",
      memberId: 5885,
      memberName: "푸라닭치킨",
      isMember: "N",
      enterDt: "2022-01-27 00:59:59",
      leaveDt: null,
    },
  ],
};

export const AdTest: LectureInquire = {
  code: 1000,
  message: "ok",
  lectures: [
    {
      lectureId: 32,
      spaceId: 345,
      lectureName: "09:00 ~ 09:50 1교시",
      startTime: "09:00",
      endTime: "09:50",
    },
    {
      lectureId: 105,
      spaceId: 345,
      lectureName: "10:00 ~ 10:50 2교시",
      startTime: "10:00",
      endTime: "10:50",
    },
  ],
};

export const AdTest1: ConcatType = {
  "32": {
    lectureId: 32,
    spaceId: 345,
    lectureName: "09:00 ~ 09:50 1교시",
    startTime: "09:00",
    endTime: "09:50",
    person: [
      {
        presentId: 1,
        lectureId: 32,
        memberId: 5085,
        presentDate: "2022-01-26",
        present: "absent",
        isMember: "Y",
        memberName: "짜파게티",
      },
      {
        presentId: 2,
        lectureId: 32,
        memberId: 5971,
        presentDate: "2022-01-26",
        present: "absent",
        isMember: "Y",
        memberName: "차돌떡볶이",
      },
    ],
  },
  "105": {
    lectureId: 105,
    spaceId: 345,
    lectureName: "10:00 ~ 10:50 2교시",
    startTime: "10:00",
    endTime: "10:50",
    person: [
      {
        presentId: 1,
        lectureId: 32,
        memberId: 5885,
        presentDate: "2022-01-27",
        present: "absent",
        isMember: "Y",
        memberName: "소고기",
      },
      {
        presentId: 2,
        lectureId: 32,
        memberId: 3791,
        presentDate: "2022-01-27",
        present: "absent",
        isMember: "Y",
        memberName: "푸라닭치킨",
      },
    ],
  },
};
