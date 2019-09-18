import actionCreatorFactory from "typescript-fsa";

const actionCreator = actionCreatorFactory();

// NOTE  actionCreator()で型指定しながらActionをつくる。 string型のpayload (データ) を伴ってこのActionが発行されるよう定義する。
export const addTodo = actionCreator<string>("ADD_TODO");

// NOTE 削除
export const deleteTodo = actionCreator<number>(`DELETE_TODO`);

// NOTE update
export const updateDoneTodo = actionCreator<number>("UPDATE_DONE_TODO");
