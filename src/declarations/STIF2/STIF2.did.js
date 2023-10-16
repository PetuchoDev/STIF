export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'sendTransactionData' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Text, IDL.Vec(IDL.Nat8)],
        [
          IDL.Record({
            'doc' : IDL.Vec(IDL.Nat8),
            'concept' : IDL.Text,
            'whoMadeIt' : IDL.Principal,
            'date' : IDL.Text,
            'amount' : IDL.Text,
          }),
        ],
        [],
      ),
    'showTransactions' : IDL.Func(
        [],
        [
          IDL.Vec(
            IDL.Record({
              'doc' : IDL.Vec(IDL.Nat8),
              'concept' : IDL.Text,
              'whoMadeIt' : IDL.Principal,
              'date' : IDL.Text,
              'amount' : IDL.Text,
            })
          ),
        ],
        ['query'],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
