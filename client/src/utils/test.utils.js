export const create= () => {
  return { name: ''};
};

export const compare = (t1, t2) => {
  return t1.name !== t2.name;
} 