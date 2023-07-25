import React from "react";
import ListGroup from "react-bootstrap/ListGroup";

const TodoList = ({ todos, setTodos }) => {
  console.log(
    "Todos state i güncellendi. Main yeniden render oldu. Todos stateinin güncel hali bana geldi.",
    todos
  );

  const deleteTodo = (id) => {
    console.log(id);
    const newTodos = todos.filter(todo => todo.id !== id); //* silinmek istenenin id bilgisini yakaladık o id bilgisine göre filtreleme işlemini gerçekleştirdik. filter metodu, yakaladığımız id ile eşleşmeyen todolardan oluşan yeni bir dizi (newTodos) oluşturdu.
    //! todo silmeyle birlikte hem statei hem de locali güncellemiş oluyoruz.
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  }

  const toggleTodo = (id) => {
    const newTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ); //* güncellenmesi istenenin id bilgisini yakaladık o id bilgisine göre güncelleme işlemini gerçekleştirdik. Eğer todonun id değeri sağlanan id ile eşleşiyorsa, completed özelliğini tersine çevirerek (toggle) güncelledik. Eşleşme sağlanmıyorsa, todoyu değiştirmeden aynı şekilde todoyu return ettik ve map metodu işlemin sonucunda buna uygun yeni bir dizi oluşturdu.
    //! todo güncellemeyle birlikte hem statei hem de locali güncellemiş oluyoruz.
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  }

  return (
    <div>
      <h2 className="text-center text-secondary">Todos</h2>
      <ListGroup className="w-50 mx-auto" as="ol" numbered>
        {todos.map(todo => (
          <ListGroup.Item
            variant={todo.completed ? "success" : "danger"}
            // onDoubleClick={()=> console.log("deneme")}
            as="li"
            className="mb-2 text-capitalize rounded-5 d-flex justify-content-between">
            <div
              className={
                todo.completed
                  ? "ms-2 me-auto text-decoration-line-through"
                  : "ms-2 me-auto"
              }
              role="button"
              onClick={() => toggleTodo(todo.id)}>
              {todo.text}
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              fill="red"
              onClick={() => deleteTodo(todo.id)}
              role="button"
              className="bi bi-trash-fill"
              viewBox="0 0 16 16">
              <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
            </svg>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default TodoList;
