import "core-js/stable";
import "regenerator-runtime/runtime";

import { createStore, combineReducers, applyMiddleware } from "redux";
import createSagaMiddleware from 'redux-saga'
import { select, race,
  throttle, debounce,
  all, call, put, delay,take, takeEvery, takeLatest, takeMaybe, takeLeading } from 'redux-saga/effects'

const initStore = {
  todos: ["hhhh"]
  ,formUiState: {stat:"idle"}
};

function todos(state = [], action) {
  const { type, payload } = action; 
  switch (type) {
    case 'ADD_TODO':
      console.log(">>>HIT REDUCER");
      return state.concat([action.text])

    default:
      return state
  }
}

function formUiState(state = {stat: "idle"},action) {
  const { type, payload } = action; 
  switch (type) {
    case 'READY':
      return {...status, stat: "idle"}

    case 'WORKING':
      return {...status, stat: "spinning"}

    case 'ERROR':
      return {...status, stat: "red error"}

    default:
      return state
  }
}

const rootReducer = combineReducers({
  todos
  ,formUiState
});


function* testSaga11 (count) {
  try {
    yield console.log("saga 1",count)
    yield delay(1000)
    yield console.log("saga 2",count)
    yield console.log("saga 3",count)

  } catch {
    yield console.log("hello testxx")

  }
}

function* testSaga1() {
  let count = 0
  while(true) {
    yield call(testSaga11,count++);
  }
}
function* testSaga2 () {
  try {
    yield console.log("hello saga2")
    yield console.log("hello saga2")
    yield console.log("hello saga2")

  } catch {
    yield console.log("hello test2")

  }
}



function* logSub (action) {
  console.log("from logsub",action)
  for (let i = 0; i < 3; i++) {
    console.log("sub start",i)
    //const action = yield take('ADD_TODO')
    //const action = yield take('ADD_TODO')
    const outcome = yield race({
      response: delay(2000)
      , cancel: take("ADD_TODO")
    })
    yield put({type:"ERROR"})

    console.log("sub end",i,outcome)
  }
  yield put({type:"WORKING"})
  const action2 = yield take("ADD_TODO")
  console.log("sub EXIT------------");
}

function ttt(action) {
  console.log("throttled",action)
}

function* log(action) {
  console.log("from log", action)
  for (let i = 0; i < 3; i++) {
    console.log("start",i)
    const action = yield logSub(action)
    console.log("end",i)
  }
  console.log("EXIT------------")

  //yield throttle(1000, 'ADD_TODO', ttt);
  //yield debounce(500, 'ADD_TODO', ttt);

  //yield put({type: 'SHOW_CONGRATULATION'})

  // console.log("test0")

  // while(true) {
  //   console.log("test1")

  //   console.log("test2",action);
  //   const action = yield take("*");
  //   console.log("test3",action);

  //   const state = yield select(); 
  //   console.log("test4",state)

  //   console.log("test5 ------------------")
  // }
}

function* watchLogger (action) {
  //console.log("from watcher", arguments)
  yield takeEvery("*",log(action));
}


function* rootSaga () {
  //console.log("root", action);
  yield all([
    //testSaga(action)
    //,testSaga2()
    //watchLogger(action)
    //takeLeading("*",function* watchLogger (action) {
    //  console.log("from watcher", arguments)
    //  yield log(action);
    //})
   takeLeading("*",
     function* watchLogger (action) {
       console.log("from watcher", arguments)
       //yield log(action);
     }
   )
   ,takeLeading("*",
     function* watchLogger (action) {
       console.log("from watcher", arguments)
       //yield log(action);
     }
   )
  ])


  // yield takeLatest("*",
  //   function* watchLogger (action) {
  //     console.log("from watcher", arguments)
  //     yield log(action);
  //   }
  // )

  // yield takeLatest("*",
  //   function* watch (action) {
  //     console.log("inside", arguments)
  //     if(action.type !== "LOCK") {
  //       console.log(action)
  //     } 
  //   }
  // )

  //yield takeLatest("ADD_TODO", watchAndLog);
  //yield takeLatest("ADD_TODO", testSaga2);

  //console.log("test")
  //yield takeLeading("ADD_TODO",watchAndLog)
  //yield takeEvery("ADD_TODO",watchAndLog)
  //yield takeLatest("ADD_TODO",watchAndLog)
}

export const appCreateStore = (store0 = initStore) => {
  const sagaMiddleware = createSagaMiddleware();
  const appStore = createStore(
    rootReducer
    ,store0
    ,applyMiddleware(sagaMiddleware)
  );
  sagaMiddleware.run(rootSaga);

  return appStore;
}


