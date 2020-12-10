import { Person } from '../person';

export interface Agent extends Person {
    
    aid: string;
    deliveryAddress: string;

}