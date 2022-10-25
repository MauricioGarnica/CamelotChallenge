import axios from "axios";

const url = "https://p9i3ym1dk0.execute-api.us-west-2.amazonaws.com/v0/merlin/query/pub/prueba"

class Prueba {
    answer(params){
        return axios.post(url, params);
    }
}

export default new Prueba();