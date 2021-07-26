import api from "./api";
import { googlePlacesKey } from "./utils/keys";
import axios, { AxiosResponse } from 'axios';
import { Places } from "../models/PlacesInterface";
import { PlaceDetailResponse } from "../models/PlacesDetail";

var baseUrl = 'https://maps.googleapis.com/maps/api/place/autocomplete/json?'

var baseUrlDetail = 'https://maps.googleapis.com/maps/api/place/details/json?'


const searchPlaces = async (text : string): Promise<AxiosResponse<Places>> =>{

    return await axios.get<Places>(baseUrl + formatParams(text));    
}

const getPlaceDetail = async (placeId : string): Promise<AxiosResponse<PlaceDetailResponse>> =>{
    return await axios.get<PlaceDetailResponse>(baseUrlDetail + formatDetailParams(placeId));    
}

const formatParams = (text : string ) =>{
    return `input=${text}&inputtype=textquery&fields=formatted_address,name,geometry&types=(cities)&rankby=distance&key=${googlePlacesKey}&language=pt-br`;

}

const formatDetailParams = (placeId : string ) =>{
    return `place_id=${placeId}&fields=geometry,name,place_id&key=${googlePlacesKey}&language=pt-br`;
}


export default {
    searchPlaces : searchPlaces,
    getPlaceDetail: getPlaceDetail
}