import fetch from 'isomorphic-fetch';

export default async (dispatch, getState) => {
  if (!getState().about.id) {
    const data = await fetch(`${process.env.CRAFTING_CONTENT}about/en-US.json`);
    const payload = await data.json();
    dispatch({ type: 'SAVE_ABOUT_CONTENT', payload });
  }
};
