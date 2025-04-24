import axios from 'axios';

const baseUrl = "http://localhost:8080";

class HotelService {
    addHotel(data){
        return axios.post(`${baseUrl}/addhotels`,data);
    }

    getHotelById(hotelId){
        return axios.get(`${baseUrl}/searchHotelById${hotelId}`);
    }
}

const hotelService = new HotelService();
export default hotelService;