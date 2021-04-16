Steps to reproduce:

1. Clone the repo, install the dependencies and run `npm install`.
2. Click on the `Create Payment Profile` button to open the dialog.
3. Fill Credit Card Number Field with `4556761029983886`.
4. Fill MM/YY with `12/33` and CVV with `123`.
5. Check the `I agree to the Terms` checkbox to validate the form and click `Submit`.

Actual result:
`Chargebee` doesn't trigger 3DS authorization. There's an error: `Invalid Card Number`.

Expected result:
`Chargebee` should trigger 3DS authorization of the Credit Card.

Additional notes:
Should have a valid `paymentIntent` object.
