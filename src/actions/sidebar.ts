export type openType = () => object;
export type closeType = () => object;
export type toggleType = (isOpen: boolean) => object;

export const open: openType = () => ({ type: "OPEN" });

export const close: closeType = () => ({ type: "CLOSE" });

export const toggle: toggleType = isOpen => ({
  type: isOpen ? "OPEN" : "CLOSE"
});
