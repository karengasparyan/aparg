export const LIST_REQUEST = 'LIST_REQUEST';
export const LIST_SUCCESS = 'LIST_SUCCESS';

export function watchList(data) {
    return {
        type: LIST_REQUEST, payload: {data}
    }
}
