import {api} from "./api";

class Stories {
    static list(data) {
      const {languages = [], order = "", next_page_token, next} = data;
      if (!next) delete data.next_page_token;
      delete data.next;
        return api.get(`/stories`,
            {
                params: {
                    languages: languages && languages?.join(),
                    order,
                    next_page_token: next ? next_page_token : "",
                }
            });
    }
}

export default Stories;
