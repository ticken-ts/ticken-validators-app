import {createDraftSafeSelector} from '@reduxjs/toolkit';
import {RootState} from '../store';

export const selectCredentials = createDraftSafeSelector((st: RootState) => st.securePersisted.openID, st => st);
