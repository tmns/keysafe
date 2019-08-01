# KeySafe

A simple safe for storing all your passwords / keys. Not associated with the Android app. Under heavy construction!

So far, the backend server / REST API has been implemented. You can:

- Register a user
- Update a user
- Delete a user
- Create a group (ie, category of keys)
- Edit a group
- Delete a group
- Create a key
- Edit a key
- Delete a key

Almost all of the functionality of the frontend has been completed. So far you can:

- Register a user
- Create a group
- Edit a group
- Delete a group
- Create a key
- Edit a key
- Delete a key

## Encryption

All data (group and key details) is encrypted client-side with symmetric keys (AES) before being stored in the database. The data is then decrypted client-side whenever it is retrieved. This is done with the help of `bcryptjs` and `crypto-js`. Further, the server is never sent your encryption / decryption key and as such cannot decrypt your data server-side (assuming the application code has not been maliciously altered). 

This is achieved by creating a unique salt for each user upon registration, which is stored on the server. Then, upon each successful login, the salt is retrieved by the client and the encrypt / decrypt key is generated by hasing the user's salt combined with the user's password. This key is thereafter stored in the user's local storage until deauthentication. 

Relevant files to take a look at for inspecting the encryption scheme include: 

- `./client/src/util/crypto.js` 
- `./client/src/components/auth/Register.js` 
- `client/src/actions/authActions.js`
- `client/src/components/dashboard/Table.js`
- `client/src/components/dashboard/KeyModal.js`
- `client/src/components/dashboard/EditGroupModal.js`