import {bSYNC_UPDATE} from "./const"
export default {
    [bSYNC_UPDATE](state, Bookshelf){
        state.Bookshelf =  Bookshelf
    }
}