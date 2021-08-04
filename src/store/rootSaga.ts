import {SagaIterator} from 'redux-saga';
import {
  take,
  takeEvery,
  put,
  call,
  fork,
  spawn,
  join,
  select,
} from 'redux-saga/effects';
import {Simulate} from 'react-dom/test-utils';

const swapiGet = async (query: string) => {
  const request = await fetch(`http://swapi.dev/api/${query}`);
  const data = await request.json();

  return data;
};

export function* loadPeople(): SagaIterator {
  const people = yield call(swapiGet, 'people');

  yield put({type: 'SET_PEOPLE', payload: people.results});
}

export function* loadPlanets(): SagaIterator {
  const planets = yield call(swapiGet, 'planets');
  // вызовет функцию с промисом и подождет, блокирующий эффект

  yield put({type: 'SET_PLANETS', payload: planets.results});
  // отправит данные в store
}

export function* workerSaga(): SagaIterator {
  // @ts-ignore
  yield fork(loadPeople);
  yield fork(loadPlanets);
  // не блокирует вызовы
  // следит за дочерними эффектами и их ошибками
  // привязан к родителю и зависит друг от друга

  // yield spawn(loadPlanets);
  // yield spawn(loadPlanets);
  // не блокирующий эффект
  // не привязан к родителю и не зависит друг от друга
  // при вызове ошибке переключит выполнение на другой эффект

  // join - блокирует и заставляет дождаться не блокирующий эффект

  const store = yield select((s) => s.app);
  console.log(store);
}

export function* watchClickSaga(): SagaIterator {
  // yield take('CLICK');// выполнится один раз
  // @ts-ignore
  yield takeEvery('LOAD_PEOPLE', workerSaga);
  // блокирующий эффект ждет пока выполнится
}

export function* rootSaga(): SagaIterator {
  // @ts-ignore
  yield fork(watchClickSaga);
}
