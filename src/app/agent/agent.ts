import { Person } from '../person';

export interface Agent extends Person {
    
    aid: string;
    farmer_id: string;
    deliveryAddress: string;

}