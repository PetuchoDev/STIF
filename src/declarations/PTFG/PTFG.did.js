export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'sendTransactionData' : IDL.Func(
        [IDL.Text, IDL.Float64, IDL.Text, IDL.Text, IDL.Text],
        [],
        [],
      ),
    'showTransactions' : IDL.Func([], [IDL.Text], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };
