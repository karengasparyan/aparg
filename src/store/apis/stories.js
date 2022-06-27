import {api} from "./api";

class Stories {
    static list({languages = [], order = ""}) {
        return api.get(`/stories`,
            {
                params: {
                    languages: languages && languages?.join(),
                    order,
                }
            });
    }
}

export default Stories;