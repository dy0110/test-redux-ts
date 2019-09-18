import { reducerWithInitialState } from "typescript-fsa-reducers";
import * as actions from "./action";

// NOTE tasks[] 配列に格納するオブジェクトの型を定義する
interface ITask {
  id: number;
  text: string;
  done: boolean;
}

// NOTE  Storeの型を定義する。
export interface ITodoState {
  tasks: ITask[];
}

// NOTE 初期状態のStoreのデータを定義する
export const initialReduceTodoState: ITodoState = {
  tasks: [
    {
      done: false,
      id: 1,
      text: "initial task"
    }
  ]
};
let idCounter: number = 1;

// NOTE Taskを作成する。ITaskという指定された型を返す。
const buildTask = (text: string): ITask => ({
  done: false,
  id: ++idCounter,
  text
});

// NOTE id からタスク情報を選択する
const updateDone = (tasks: ITask[], taskId: number): ITask[] =>
  tasks.map(task => {
    if (task.id === taskId) {
      task.done = true;
    }
    return task;
  });

// = NOTE ===========================================================
// addTodoというActionを待ち受けるとともに初期状態のStoreをセットする。
// addTodoが飛んできた場合には、新しいTaskをStoreに格納して、Storeを更新する。
// ==================================================================
export default reducerWithInitialState(initialReduceTodoState)
  .case(actions.addTodo, (state: ITodoState, paylosd) => ({
    ...state,
    tasks: state.tasks.concat(buildTask(paylosd))
  }))
  .case(actions.deleteTodo, (state: ITodoState, paylosd) => ({
    ...state,
    tasks: state.tasks.filter(task => task.id !== paylosd)
  }))
  .case(actions.updateDoneTodo, (state: ITodoState, payload) => ({
    ...state,
    tasks: updateDone(state.tasks, payload)
  }))
  .build();
