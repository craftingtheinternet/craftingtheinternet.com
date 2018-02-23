import * as t from "io-ts";

export const educationSchema = t.type({
  additionalNotes: t.string,
  degree: t.string,
  placeOfStudy: t.string
});

export const workEligibilitySchema = t.type({
  title: t.string,
  value: t.string
});

export const workHistorySchema = t.type({
  company: t.string,
  description: t.string,
  from: t.string,
  position: t.string,
  to: t.string
});

export const schema = t.partial({
  abstract: t.string,
  education: educationSchema,
  id: t.string,
  title: t.string,
  workEligibility: t.array(workEligibilitySchema),
  workHistory: t.array(workHistorySchema)
});

export type WorkEligibilityType = t.TypeOf<typeof workEligibilitySchema>;
export type WorkHistoryType = t.TypeOf<typeof workHistorySchema>;
export type StateType = t.TypeOf<typeof schema>;

export type ActionType = {
  type: string;
  payload: StateType;
};

const initialState: StateType = {
  abstract: undefined,
  education: {
    additionalNotes: undefined,
    degree: undefined,
    placeOfStudy: undefined
  },
  id: undefined,
  title: undefined,
  workEligibility: [],
  workHistory: []
};

export default (state = initialState, action: ActionType) => {
  switch (action.type) {
    case "SAVE_RESUME_CONTENT":
      return action.payload;
    default:
      return state;
  }
};
