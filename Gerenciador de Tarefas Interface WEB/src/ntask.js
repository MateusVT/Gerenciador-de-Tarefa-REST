import TinyEmitter from "tiny-emitter";
import Request from "browser-request";

class NTask extends TinyEmitter	{
    constructor() {
        

        super();
        this.request = Request;
        this.URL = "http://127.0.0.1:3000";
    }
}
module.exports = NTask;