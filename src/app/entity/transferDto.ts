import {Journal} from './journal';

export class TransferDto {
  journal: Journal;
  fromBalance: string;
  toBalance: string;
}
