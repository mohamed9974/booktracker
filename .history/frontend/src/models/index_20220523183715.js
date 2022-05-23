
import {Realm, createRealmContext } from '@realm/react';
import {bookstoreOM} from './bookstoreOM';


const appRealmContext = Realm.App({ id: 'booktracker-nmprl' });
const credentials = Realm.Credentials.anonymous();
try {
  appRealmContext.logIn(credentials);
}
catch (error) {
    console.log(error);
}

export const {
    Provider: BookstoreProvider,
    Consumer: BookstoreConsumer,
    useRealm: useBookstore,
} = createRealmContext(appRealmContext, bookstoreOM); 