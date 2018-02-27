export type ActionType = {
  type: string;
};
export type ActionCreatorType = () => ActionType;

export const unsetSubmitted: ActionCreatorType = () => ({
  type: "CONTACT_HAS_NOT_SUBMITTED"
});

export const setSubmitted: ActionCreatorType = () => ({
  type: "CONTACT_HAS_SUBMITTED"
});
