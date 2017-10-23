export class Element<Props> {
  constructor (props?: Props)
  props: Props
  render (elements: Types): Function
  preRender (): void
  postRender (): void
}
export default function moer ({}: {
  node: Element<any>,
  root?: any,
  data?: any,
  models?: any,
  plugins?: any,
  document?: object
}): any
export var connect: (Class: Function) => any
export var noBind: (Function: Function) => any

interface SVGAttributes extends HTMLAttributes {
  accentHeight?: number | string
  accumulate?: 'none' | 'sum'
  additive?: 'replace' | 'sum'
  alignmentBaseline?: 'auto' | 'baseline' | 'before-edge' | 'text-before-edge' | 'middle' | 'central' | 'after-edge' | 'text-after-edge' | 'ideographic' | 'alphabetic' | 'hanging' | 'mathematical' | 'inherit'
  allowReorder?: 'no' | 'yes'
  alphabetic?: number | string
  amplitude?: number | string
  arabicForm?: 'initial' | 'medial' | 'terminal' | 'isolated'
  ascent?: number | string
  attributeName?: string
  attributeType?: string
  autoReverse?: number | string
  azimuth?: number | string
  baseFrequency?: number | string
  baselineShift?: number | string
  baseProfile?: number | string
  bbox?: number | string
  begin?: number | string
  bias?: number | string
  by?: number | string
  calcMode?: number | string
  capHeight?: number | string
  clip?: number | string
  clipPath?: string
  clipPathUnits?: number | string
  clipRule?: number | string
  colorInterpolation?: number | string
  colorInterpolationFilters?: 'auto' | 'sRGB' | 'linearRGB' | 'inherit'
  colorProfile?: number | string
  colorRendering?: number | string
  contentScriptType?: number | string
  contentStyleType?: number | string
  cursor?: number | string
  cx?: number | string
  cy?: number | string
  d?: string
  decelerate?: number | string
  descent?: number | string
  diffuseConstant?: number | string
  direction?: number | string
  display?: number | string
  divisor?: number | string
  dominantBaseline?: number | string
  dur?: number | string
  dx?: number | string
  dy?: number | string
  edgeMode?: number | string
  elevation?: number | string
  enableBackground?: number | string
  end?: number | string
  exponent?: number | string
  externalResourcesRequired?: number | string
  fill?: string
  fillOpacity?: number | string
  fillRule?: 'nonzero' | 'evenodd' | 'inherit'
  filter?: string
  filterRes?: number | string
  filterUnits?: number | string
  floodColor?: number | string
  floodOpacity?: number | string
  focusable?: number | string
  fontFamily?: string
  fontSize?: number | string
  fontSizeAdjust?: number | string
  fontStretch?: number | string
  fontStyle?: number | string
  fontVariant?: number | string
  fontWeight?: number | string
  format?: number | string
  from?: number | string
  fx?: number | string
  fy?: number | string
  g1?: number | string
  g2?: number | string
  glyphName?: number | string
  glyphOrientationHorizontal?: number | string
  glyphOrientationVertical?: number | string
  glyphRef?: number | string
  gradientTransform?: string
  gradientUnits?: string
  hanging?: number | string
  horizAdvX?: number | string
  horizOriginX?: number | string
  ideographic?: number | string
  imageRendering?: number | string
  in2?: number | string
  in?: string
  intercept?: number | string
  k1?: number | string
  k2?: number | string
  k3?: number | string
  k4?: number | string
  k?: number | string
  kernelMatrix?: number | string
  kernelUnitLength?: number | string
  kerning?: number | string
  keyPoints?: number | string
  keySplines?: number | string
  keyTimes?: number | string
  lengthAdjust?: number | string
  letterSpacing?: number | string
  lightingColor?: number | string
  limitingConeAngle?: number | string
  local?: number | string
  markerEnd?: string
  markerHeight?: number | string
  markerMid?: string
  markerStart?: string
  markerUnits?: number | string
  markerWidth?: number | string
  mask?: string
  maskContentUnits?: number | string
  maskUnits?: number | string
  mathematical?: number | string
  mode?: number | string
  numOctaves?: number | string
  offset?: number | string
  opacity?: number | string
  operator?: number | string
  order?: number | string
  orient?: number | string
  orientation?: number | string
  origin?: number | string
  overflow?: number | string
  overlinePosition?: number | string
  overlineThickness?: number | string
  paintOrder?: number | string
  panose1?: number | string
  pathLength?: number | string
  patternContentUnits?: string
  patternTransform?: number | string
  patternUnits?: string
  pointerEvents?: number | string
  points?: string
  pointsAtX?: number | string
  pointsAtY?: number | string
  pointsAtZ?: number | string
  preserveAlpha?: number | string
  preserveAspectRatio?: string
  primitiveUnits?: number | string
  r?: number | string
  radius?: number | string
  refX?: number | string
  refY?: number | string
  renderingIntent?: number | string
  repeatCount?: number | string
  repeatDur?: number | string
  requiredExtensions?: number | string
  requiredFeatures?: number | string
  restart?: number | string
  result?: string
  rotate?: number | string
  rx?: number | string
  ry?: number | string
  scale?: number | string
  seed?: number | string
  shapeRendering?: number | string
  slope?: number | string
  spacing?: number | string
  specularConstant?: number | string
  specularExponent?: number | string
  speed?: number | string
  spreadMethod?: string
  startOffset?: number | string
  stdDeviation?: number | string
  stemh?: number | string
  stemv?: number | string
  stitchTiles?: number | string
  stopColor?: string
  stopOpacity?: number | string
  strikethroughPosition?: number | string
  strikethroughThickness?: number | string
  string?: number | string
  stroke?: string
  strokeDasharray?: string | number
  strokeDashoffset?: string | number
  strokeLinecap?: 'butt' | 'round' | 'square' | 'inherit'
  strokeLinejoin?: 'miter' | 'round' | 'bevel' | 'inherit'
  strokeMiterlimit?: string
  strokeOpacity?: number | string
  strokeWidth?: number | string
  surfaceScale?: number | string
  systemLanguage?: number | string
  tableValues?: number | string
  targetX?: number | string
  targetY?: number | string
  textAnchor?: string
  textDecoration?: number | string
  textLength?: number | string
  textRendering?: number | string
  to?: number | string
  transform?: string
  u1?: number | string
  u2?: number | string
  underlinePosition?: number | string
  underlineThickness?: number | string
  unicode?: number | string
  unicodeBidi?: number | string
  unicodeRange?: number | string
  unitsPerEm?: number | string
  vAlphabetic?: number | string
  values?: string
  vectorEffect?: number | string
  version?: string
  vertAdvY?: number | string
  vertOriginX?: number | string
  vertOriginY?: number | string
  vHanging?: number | string
  vIdeographic?: number | string
  viewBox?: string
  viewTarget?: number | string
  visibility?: number | string
  vMathematical?: number | string
  widths?: number | string
  wordSpacing?: number | string
  writingMode?: number | string
  x1?: number | string
  x2?: number | string
  x?: number | string
  xChannelSelector?: string
  xHeight?: number | string
  xlinkActuate?: string
  xlinkArcrole?: string
  xlinkHref?: string
  xlinkRole?: string
  xlinkShow?: string
  xlinkTitle?: string
  xlinkType?: string
  xmlBase?: string
  xmlLang?: string
  xmlns?: string
  xmlnsXlink?: string
  xmlSpace?: string
  y1?: number | string
  y2?: number | string
  y?: number | string
  yChannelSelector?: string
  z?: number | string
  zoomAndPan?: string
}

interface PathAttributes {
  d: string
}

interface EventHandler<E extends Event> {
  (event: E): void
}

type ClipboardEventHandler = EventHandler<ClipboardEvent>
type CompositionEventHandler = EventHandler<CompositionEvent>
type DragEventHandler = EventHandler<DragEvent>
type FocusEventHandler = EventHandler<FocusEvent>
type KeyboardEventHandler = EventHandler<KeyboardEvent>
type MouseEventHandler = EventHandler<MouseEvent>
type TouchEventHandler = EventHandler<TouchEvent>
type UIEventHandler = EventHandler<UIEvent>
type WheelEventHandler = EventHandler<WheelEvent>
type AnimationEventHandler = EventHandler<AnimationEvent>
type TransitionEventHandler = EventHandler<TransitionEvent>
type GenericEventHandler = EventHandler<Event>

interface DOMAttributes {
  // Image Events
  onLoad?: GenericEventHandler

  // Clipboard Events
  onCopy?: ClipboardEventHandler
  onCut?: ClipboardEventHandler
  onPaste?: ClipboardEventHandler

  // Composition Events
  onCompositionEnd?: CompositionEventHandler
  onCompositionStart?: CompositionEventHandler
  onCompositionUpdate?: CompositionEventHandler

  // Focus Events
  onFocus?: FocusEventHandler
  onBlur?: FocusEventHandler

  // Form Events
  onChange?: GenericEventHandler
  onInput?: GenericEventHandler
  onSearch?: GenericEventHandler
  onSubmit?: GenericEventHandler

  // Keyboard Events
  onKeyDown?: KeyboardEventHandler
  onKeyPress?: KeyboardEventHandler
  onKeyUp?: KeyboardEventHandler

  // Media Events
  onAbort?: GenericEventHandler
  onCanPlay?: GenericEventHandler
  onCanPlayThrough?: GenericEventHandler
  onDurationChange?: GenericEventHandler
  onEmptied?: GenericEventHandler
  onEncrypted?: GenericEventHandler
  onEnded?: GenericEventHandler
  onLoadedData?: GenericEventHandler
  onLoadedMetadata?: GenericEventHandler
  onLoadStart?: GenericEventHandler
  onPause?: GenericEventHandler
  onPlay?: GenericEventHandler
  onPlaying?: GenericEventHandler
  onProgress?: GenericEventHandler
  onRateChange?: GenericEventHandler
  onSeeked?: GenericEventHandler
  onSeeking?: GenericEventHandler
  onStalled?: GenericEventHandler
  onSuspend?: GenericEventHandler
  onTimeUpdate?: GenericEventHandler
  onVolumeChange?: GenericEventHandler
  onWaiting?: GenericEventHandler

  // MouseEvents
  onClick?: MouseEventHandler
  onContextMenu?: MouseEventHandler
  onDblClick?: MouseEventHandler
  onDrag?: DragEventHandler
  onDragEnd?: DragEventHandler
  onDragEnter?: DragEventHandler
  onDragExit?: DragEventHandler
  onDragLeave?: DragEventHandler
  onDragOver?: DragEventHandler
  onDragStart?: DragEventHandler
  onDrop?: DragEventHandler
  onMouseDown?: MouseEventHandler
  onMouseEnter?: MouseEventHandler
  onMouseLeave?: MouseEventHandler
  onMouseMove?: MouseEventHandler
  onMouseOut?: MouseEventHandler
  onMouseOver?: MouseEventHandler
  onMouseUp?: MouseEventHandler

  // Selection Events
  onSelect?: GenericEventHandler

  // Touch Events
  onTouchCancel?: TouchEventHandler
  onTouchEnd?: TouchEventHandler
  onTouchMove?: TouchEventHandler
  onTouchStart?: TouchEventHandler

  // UI Events
  onScroll?: UIEventHandler

  // Wheel Events
  onWheel?: WheelEventHandler

  // Animation Events
  onAnimationStart?: AnimationEventHandler
  onAnimationEnd?: AnimationEventHandler
  onAnimationIteration?: AnimationEventHandler

  // Transition Events
  onTransitionEnd?: TransitionEventHandler
}

interface HTMLAttributes extends DOMAttributes {
  key?: string | number
  once?: boolean
  // Standard HTML Attributes
  accept?: string
  acceptCharset?: string
  accessKey?: string
  action?: string
  allowFullScreen?: boolean
  allowTransparency?: boolean
  alt?: string
  async?: boolean
  autocomplete?: string
  autofocus?: boolean
  autoPlay?: boolean
  capture?: boolean
  cellPadding?: number | string
  cellSpacing?: number | string
  charSet?: string
  challenge?: string
  checked?: boolean
  className?: string | { [key: string]: boolean } | string[]
  cols?: number
  colSpan?: number
  content?: string
  contentEditable?: boolean
  contextMenu?: string
  controls?: boolean
  coords?: string
  crossOrigin?: string
  data?: string
  dateTime?: string
  default?: boolean
  defer?: boolean
  dir?: string
  disabled?: boolean
  download?: any
  draggable?: boolean
  encType?: string
  form?: string
  formAction?: string
  formEncType?: string
  formMethod?: string
  formNoValidate?: boolean
  formTarget?: string
  frameBorder?: number | string
  headers?: string
  height?: number | string
  hidden?: boolean
  high?: number
  href?: string
  hrefLang?: string
  for?: string
  httpEquiv?: string
  icon?: string
  id?: string
  inputMode?: string
  integrity?: string
  is?: string
  keyParams?: string
  keyType?: string
  kind?: string
  label?: string
  lang?: string
  list?: string
  loop?: boolean
  low?: number
  manifest?: string
  marginHeight?: number
  marginWidth?: number
  max?: number | string
  maxLength?: number
  media?: string
  mediaGroup?: string
  method?: string
  min?: number | string
  minLength?: number
  multiple?: boolean
  muted?: boolean
  name?: string
  noValidate?: boolean
  open?: boolean
  optimum?: number
  pattern?: string
  placeholder?: string
  poster?: string
  preload?: string
  radioGroup?: string
  readOnly?: boolean
  rel?: string
  required?: boolean
  role?: string
  rows?: number
  rowSpan?: number
  sandbox?: string
  scope?: string
  scoped?: boolean
  scrolling?: string
  seamless?: boolean
  selected?: boolean
  shape?: string
  size?: number
  sizes?: string
  slot?: string
  span?: number
  spellCheck?: boolean
  src?: string
  srcset?: string
  srcDoc?: string
  srcLang?: string
  srcSet?: string
  start?: number
  step?: number | string
  style?: any
  summary?: string
  tabIndex?: number
  target?: string
  title?: string
  type?: string
  useMap?: string
  value?: string | string[]
  width?: number | string
  wmode?: string
  wrap?: string

  // RDFa Attributes
  about?: string
  datatype?: string
  inlist?: any
  prefix?: string
  property?: string
  resource?: string
  typeof?: string
  vocab?: string
}

interface TypedElement {
  (props?: HTMLAttributes): void
}
interface TypedSvgElement {
  (props?: SVGAttributes): void
}

export interface Types {
  // HTML
  a: TypedElement
  abbr: TypedElement
  address: TypedElement
  area: TypedElement
  article: TypedElement
  aside: TypedElement
  audio: TypedElement
  b: TypedElement
  base: TypedElement
  bdi: TypedElement
  bdo: TypedElement
  big: TypedElement
  blockquote: TypedElement
  body: TypedElement
  br: TypedElement
  button: TypedElement
  canvas: TypedElement
  caption: TypedElement
  cite: TypedElement
  code: TypedElement
  col: TypedElement
  colgroup: TypedElement
  data: TypedElement
  datalist: TypedElement
  dd: TypedElement
  del: TypedElement
  details: TypedElement
  dfn: TypedElement
  dialog: TypedElement
  div: TypedElement
  dl: TypedElement
  dt: TypedElement
  em: TypedElement
  embed: TypedElement
  fieldset: TypedElement
  figcaption: TypedElement
  figure: TypedElement
  footer: TypedElement
  form: TypedElement
  h1: TypedElement
  h2: TypedElement
  h3: TypedElement
  h4: TypedElement
  h5: TypedElement
  h6: TypedElement
  head: TypedElement
  header: TypedElement
  hr: TypedElement
  html: TypedElement
  i: TypedElement
  iframe: TypedElement
  img: TypedElement
  input: TypedElement
  ins: TypedElement
  kbd: TypedElement
  keygen: TypedElement
  label: TypedElement
  legend: TypedElement
  li: TypedElement
  link: TypedElement
  main: TypedElement
  map: TypedElement
  mark: TypedElement
  menu: TypedElement
  menuitem: TypedElement
  meta: TypedElement
  meter: TypedElement
  nav: TypedElement
  noscript: TypedElement
  object: TypedElement
  ol: TypedElement
  optgroup: TypedElement
  option: TypedElement
  output: TypedElement
  p: TypedElement
  param: TypedElement
  picture: TypedElement
  pre: TypedElement
  progress: TypedElement
  q: TypedElement
  rp: TypedElement
  rt: TypedElement
  ruby: TypedElement
  s: TypedElement
  samp: TypedElement
  script: TypedElement
  section: TypedElement
  select: TypedElement
  slot: TypedElement
  small: TypedElement
  source: TypedElement
  span: TypedElement
  strong: TypedElement
  style: TypedElement
  sub: TypedElement
  summary: TypedElement
  sup: TypedElement
  table: TypedElement
  tbody: TypedElement
  td: TypedElement
  textarea: TypedElement
  tfoot: TypedElement
  th: TypedElement
  thead: TypedElement
  time: TypedElement
  title: TypedElement
  tr: TypedElement
  track: TypedElement
  u: TypedElement
  ul: TypedElement
  'var': TypedElement
  video: TypedElement
  wbr: TypedElement

  //SVG
  svg: TypedSvgElement
  animate: TypedSvgElement
  circle: TypedSvgElement
  clipPath: TypedSvgElement
  defs: TypedSvgElement
  ellipse: TypedSvgElement
  feBlend: TypedSvgElement
  feColorMatrix: TypedSvgElement
  feComponentTransfer: TypedSvgElement
  feComposite: TypedSvgElement
  feConvolveMatrix: TypedSvgElement
  feDiffuseLighting: TypedSvgElement
  feDisplacementMap: TypedSvgElement
  feFlood: TypedSvgElement
  feGaussianBlur: TypedSvgElement
  feImage: TypedSvgElement
  feMerge: TypedSvgElement
  feMergeNode: TypedSvgElement
  feMorphology: TypedSvgElement
  feOffset: TypedSvgElement
  feSpecularLighting: TypedSvgElement
  feTile: TypedSvgElement
  feTurbulence: TypedSvgElement
  filter: TypedSvgElement
  foreignObject: TypedSvgElement
  g: TypedSvgElement
  image: TypedSvgElement
  line: TypedSvgElement
  linearGradient: TypedSvgElement
  marker: TypedSvgElement
  mask: TypedSvgElement
  path: TypedSvgElement
  pattern: TypedSvgElement
  polygon: TypedSvgElement
  polyline: TypedSvgElement
  radialGradient: TypedSvgElement
  rect: TypedSvgElement
  stop: TypedSvgElement
  symbol: TypedSvgElement
  text: TypedSvgElement
  tspan: TypedSvgElement
  use: TypedSvgElement
}
