export const open = () => ({ type: 'OPEN' });
export const close = () => ({ type: 'CLOSE' });
export const toggle = (isOpen: boolean) => ({ type: isOpen ? 'OPEN' : 'CLOSE' });
