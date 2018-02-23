export type ActionType = {
  type: string;
};
export type ActionCreatorType = () => ActionType;
export type ToggleType = (isOpen: boolean) => ActionType;

export const open: ActionCreatorType = () => ({ type: "OPEN" });

export const close: ActionCreatorType = () => ({ type: "CLOSE" });

export const toggle: ToggleType = isOpen => ({
  type: isOpen ? "OPEN" : "CLOSE"
});
