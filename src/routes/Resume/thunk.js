import fetch from 'isomorphic-fetch';

export default async (dispatch, getState) => {
  if (!getState().resume.id) {
    const data = await fetch(`${process.env.CRAFTING_CONTENT}resume/en-US.json`);
    const payload = await data.json();
    dispatch({ type: 'SAVE_RESUME_CONTENT', payload });
  }
};
