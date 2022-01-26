export type CommonCode = {
  code: number;
  message: string;
};

export type LogInfo = {
  memberName: string;
  date: string;
  enterDt: string;
  leaveDt: string;
  memberType: string;
};

export type LectureProps = {
  [T: string]: {
    lectureName: string;
    startTime: string;
    endTime: string;
  };
};

export type AdInquire = CommonCode & {
  results: {
    spaceId: number;
    memberId: number;
    memberName: string;
    isMember: string;
    enterDt: string;
    leaveDt: string | null;
  }[];
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

export type PresentInquire = CommonCode & {
  presents: {
    presentId: number;
    lectureId: number;
    memberId: number;
    presentDate: string;
    present: string;
    isMember: string;
  }[];
};

export type UserProps = {
  [T: string]: {
    memberId: number;
    memberName: string;
  };
};

export type ConcatType = {
  [key: string]: {
    lectureId: number;
    spaceId: number;
    lectureName: string;
    startTime: string;
    endTime: string;
    person: {
      presentId: number;
      lectureId: number;
      memberName: string;
      memberId: number;
      presentDate: string;
      present: string;
      isMember: string;
    }[];
  };
};
