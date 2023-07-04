import request from '../utils/request';

export const getData = async () => {
    let { data } = await request('METHOD', 'PATH');
    let result = data.result.data;

    return result;
};

export default {};
