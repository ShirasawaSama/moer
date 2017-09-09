export class Element {
  constructor (props?: object)
  props: object
  render (elements: Types): Function
}
export default function moer ({}: {
  node: Element,
  root?: HTMLElement|string,
  data?: object|Array<any>,
  models?: Array<string>|Function
}): any
export var connect: (Class: Function) => any
export type Types = {
  html (props?: object): void
  base (props?: object): void
  head (props?: object): void
  link (props?: object): void
  meta (props?: object): void
  script (props?: object): void
  style (props?: object): void
  title (props?: object): void
  address (props?: object): void
  article (props?: object): void
  body (props?: object): void
  aside (props?: object): void
  footer (props?: object): void
  header (props?: object): void
  hgroup (props?: object): void
  nav (props?: object): void
  section (props?: object): void
  h1 (props?: object): void
  h2 (props?: object): void
  h3 (props?: object): void
  h3 (props?: object): void
  h4 (props?: object): void
  h5 (props?: object): void
  h6 (props?: object): void
  blockquote (props?: object): void
  cite (props?: object): void
  dd (props?: object): void
  dl (props?: object): void
  dt (props?: object): void
  div (props?: object): void
  figcaption (props?: object): void
  figure (props?: object): void
  hr (props?: object): void
  li (props?: object): void
  ol (props?: object): void
  ul (props?: object): void
  menu (props?: object): void
  main (props?: object): void
  p (props?: object): void
  pre (props?: object): void
  a (props?: object): void
  abbr (props?: object): void
  b (props?: object): void
  bdi (props?: object): void
  bdo (props?: object): void
  br (props?: object): void
  code (props?: object): void
  data (props?: object): void
  time (props?: object): void
  dfn (props?: object): void
  em (props?: object): void
  i (props?: object): void
  kbd (props?: object): void
  mark (props?: object): void
  q (props?: object): void
  rp (props?: object): void
  ruby (props?: object): void
  rt (props?: object): void
  rtc (props?: object): void
  rb (props?: object): void
  s (props?: object): void
  del (props?: object): void
  ins (props?: object): void
  samp (props?: object): void
  small (props?: object): void
  span (props?: object): void
  strong (props?: object): void
  sub (props?: object): void
  sup (props?: object): void
  u (props?: object): void
  var (props?: object): void
  wbr (props?: object): void
  area (props?: object): void
  audio (props?: object): void
  source (props?: object): void
  img (props?: object): void
  map (props?: object): void
  track (props?: object): void
  video (props?: object): void
  embed (props?: object): void
  object (props?: object): void
  param (props?: object): void
  picture (props?: object): void
  canvas (props?: object): void
  noscript (props?: object): void
  caption (props?: object): void
  table (props?: object): void
  col (props?: object): void
  colgroup (props?: object): void
  tbody (props?: object): void
  td (props?: object): void
  tfoot (props?: object): void
  th (props?: object): void
  thead (props?: object): void
  tr (props?: object): void
  button (props?: object): void
  datalist (props?: object): void
  option (props?: object): void
  fieldset (props?: object): void
  form (props?: object): void
  input (props?: object): void
  label (props?: object): void
  legend (props?: object): void
  meter (props?: object): void
  optgroup (props?: object): void
  select (props?: object): void
  output (props?: object): void
  progress (props?: object): void
  textarea (props?: object): void
}