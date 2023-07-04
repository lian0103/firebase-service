export const phoneRegex = /^09[0-9]{8}$/;

export const varigyMsgRegex = /[0-9]{4}/;

export const varigyGtNumber = /[0-9]{5}/;

export const nameRegex = /^[\u4e00-\u9fa5]{2,4}$/;

export const emailRegex = /^(([.](?=[^.]|^))|[\w_%{|}#$~`+!?-])+@(?:[\w-]+\.)+[a-zA-Z.]{2,63}$/;

export const phoneFormat = (numbers) => {
    // console.log('numbers', numbers);
    if (numbers?.length === 10 && phoneRegex.test(numbers)) {
        let arr = numbers.split('');
        arr.splice(4, 0, '-');
        arr.splice(8, 0, '-');
        let formatStr = arr.join('');
        return formatStr;
    }
    // console.log('手機資料不正確');
    return numbers;
};

export const checkTwID = (id) => {
    //建立字母分數陣列(A~Z)
    var city = new Array(
        1,
        10,
        19,
        28,
        37,
        46,
        55,
        64,
        39,
        73,
        82,
        2,
        11,
        20,
        48,
        29,
        38,
        47,
        56,
        65,
        74,
        83,
        21,
        3,
        12,
        30
    );
    id = id.toUpperCase();
    //使用「正規表達式」檢驗格式
    if (id.search(/^[A-Z](1|2)\d{8}$/i) == -1) {
        return false;
    } else {
        //將字串分割為陣列(IE必需這麼做才不會出錯)
        id = id.split('');
        //計算總分
        var total = city[id[0].charCodeAt(0) - 65];
        for (var i = 1; i <= 8; i++) {
            total += eval(id[i]) * (9 - i);
        }
        //補上檢查碼(最後一碼)
        total += eval(id[9]);
        //檢查比對碼(餘數應為0);
        return total % 10 == 0;
    }
};

// 居留證驗證規則來源 https://gist.github.com/joanneccwang/fa3ee5ae23757ef2887d8a7c31c252d4
const countyCode = {
    A: '10', // 台北市
    B: '11', // 台中市
    C: '12', // 基隆市
    D: '13', // 台南市
    E: '14', // 高雄市
    F: '15', // 新北市
    G: '16', // 宜蘭縣
    H: '17', // 桃園市
    I: '34', // 嘉義市 (省轄)
    J: '18', // 新竹縣
    K: '19', // 苗栗縣
    L: '20', // 台中縣 (停發)
    M: '21', // 南投縣
    N: '22', // 彰化縣
    O: '35', // 新竹市 (省轄)
    P: '23', // 雲林縣
    Q: '24', // 嘉義縣
    R: '25', // 台南縣 (停發)
    S: '26', // 高雄縣 (停發)
    T: '27', // 屏東縣
    U: '28', // 花蓮縣
    V: '29', // 台東縣
    W: '32', // 金門縣
    X: '30', // 澎湖縣
    Y: '31', // 陽明山 (停發)
    Z: '33', // 連江縣
};

function isNewResidenceCertificateNumberValid(id) {
    const regex = /^([A-Z])[8,9]\d{8}$/;
    if (typeof id !== 'string') return false;
    if (!regex.test(id)) return false;

    const county = id.match(regex)[1];
    const code = id.replace(county, countyCode[county]);

    const codeArr = code.split('').map((c) => parseInt(c, 10));
    const evaluationValue = codeArr.splice(-1, 1)[0];
    const multiplier = [1, 9, 8, 7, 6, 5, 4, 3, 2, 1];
    const base = codeArr.reduce((prev, curr, idx) => prev + ((curr * multiplier[idx]) % 10), 0);
    const evaluationCode = base % 10 === 0 ? 0 : 10 - (base % 10);

    const isValid = evaluationCode === evaluationValue;
    return isValid;
}

function isOldResidenceCertificateNumberValid(id) {
    const regex = /^([A-Z])([A,B,C,D])\d{8}$/;
    if (typeof id !== 'string') return false;
    if (!regex.test(id)) return false;

    const county = id.match(regex)[1];
    const sex = id.match(regex)[2];
    const code = id.replace(`${county}${sex}`, `${countyCode[county]}${parseInt(countyCode[sex], 10) % 10}`);

    const multiplier = [1, 9, 8, 7, 6, 5, 4, 3, 2, 1, 1];
    const evaluateValue = code.split('').reduce((prev, curr, idx) => prev + curr * multiplier[idx], 0);

    const isValid = evaluateValue % 10 === 0;
    return isValid;
}

export const checkForeignID = (id) => {
    return isNewResidenceCertificateNumberValid(id) || isOldResidenceCertificateNumberValid(id);
};

export const base64ImgtoFile = (dataurl, fileName = 'file') => {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const suffix = mime.split('/')[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    var u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], `${fileName}.${suffix}`, { type: mime });
};

export const replaceAllDash = (str) => {
    return str.replaceAll('-', '');
};

export default {};
