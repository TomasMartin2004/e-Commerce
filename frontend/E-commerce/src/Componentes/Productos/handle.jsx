export const handleDeleteOption = (setSelectedOption) => {
  setSelectedOption('');
};

export const handleDeleteTag = (setSelectedTags) => {
  setSelectedTags({
    minimo: '',
    maximo: '',
  });
};

export const handleGeneral = (event, setValue) => {
  setValue(event.target.value);
};

export const handleTag = (setSelectedTags, minimo, maximo) => {
  setSelectedTags({
    minimo: minimo,
    maximo: maximo,
  });}