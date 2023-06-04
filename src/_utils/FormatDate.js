export const format = (date) => {
  if (!date) return;

  //Valeur renvoyé depuis la bdd
  if (typeof date === "string") return date;

  //Valeur sélectionné par le user
  const nDate = new Date(date);
  return nDate?.toISOString().substring(0, 10);
};
