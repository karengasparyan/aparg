import {fork, all} from 'redux-saga/effects';
import histories from './stories';

export default function* watchers() {
    yield all([
        histories,
    ].map(fork));
}
