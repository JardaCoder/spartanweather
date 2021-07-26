import { StringChain } from "lodash";


const roundDegrees = (number: number, degree = 'C') : string =>{
    if(number){
        return  number.toFixed() + (degree == 'C' ? 'º' : 'ºF');
    }
    return '';
}

export default {
    roundDegrees: roundDegrees
}