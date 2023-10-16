import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface _SERVICE {
  'sendTransactionData' : ActorMethod<
    [string, string, string, Uint8Array | number[]],
    {
      'doc' : Uint8Array | number[],
      'concept' : string,
      'whoMadeIt' : Principal,
      'date' : string,
      'amount' : string,
    }
  >,
  'showTransactions' : ActorMethod<
    [],
    Array<
      {
        'doc' : Uint8Array | number[],
        'concept' : string,
        'whoMadeIt' : Principal,
        'date' : string,
        'amount' : string,
      }
    >
  >,
}
