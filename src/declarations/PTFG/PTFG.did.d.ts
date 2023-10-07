import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface _SERVICE {
  'sendTransactionData' : ActorMethod<
    [string, number, string, string, string],
    undefined
  >,
  'showTransactions' : ActorMethod<[], string>,
}
