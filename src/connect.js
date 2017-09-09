import { CONNECTED } from './symbols'
export default Class => class Connected extends Class { [CONNECTED] = true }
