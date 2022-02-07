export type CommonCode = {
  code: number;
  message: string;
};

export type LogInfo = {
  memberId: number;
  memberName: string;
  date: string;
  enterDt: string;
  leaveDt: string;
  memberType: string;
};

export type LectureProps = {
  [T: string]: {
    lectureName: string;
    startTime?: string;
    endTime?: string;
  };
};

export type AdInquireObj = {
  spaceName: string;
  spaceId: number;
  memberId: number;
  memberName: string;
  isMember: string;
  enterDt: string;
  leaveDt: string | null;
};

export type AdInquire = CommonCode & {
  results: AdInquireObj[];
};

export type LectureInquire = CommonCode & {
  lectures: {
    lectureId: number;
    spaceId: number;
    lectureName: string;
    startTime: string;
    endTime: string;
  }[];
};

export type PresentInquireObj = {
  presentId: number;
  lectureId: number;
  memberId: number;
  presentDate: string;
  present: string;
  isMember: string;
};

export type PresentInquire = CommonCode & {
  presents: PresentInquireObj[];
};

export type UserProps = {
  [T: string]: {
    memberId: number;
    memberName: string;
  };
};

type PersonProps = PresentInquireObj & {
  memberName: string;
};

export type ConcatType = {
  [key: string]: {
    lectureId: number;
    spaceId: number;
    lectureName: string;
    startTime: string;
    endTime: string;
    person?: PersonProps[];
  };
};
