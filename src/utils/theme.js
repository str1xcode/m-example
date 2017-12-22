export function getThemeStyle(styles, name, theme = 'DARK') {
  if (!styles && !name) return null;
  let _name = name+'__'+theme;
  return styles[_name];
}
