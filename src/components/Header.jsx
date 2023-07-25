import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { v4 as uuidv4 } from "uuid";

const Header = ({ todos, setTodos }) => {
  // const [todos, setTodos] = useState([]); // statei burada oluşturursak todoliste aktaramayız. Kardeşler arasında veri akışı yok. O nedenle Lifting State Up yöntemini kullanarak stateimizi ortak parenta kaldırıyoruz.

  const [task, setTask] = useState("");
  // console.log("Compoennt render")

  const addTodo = (e) => {
    e.preventDefault(); // formun özelliklerini deactive ediyoruz.
    if(!task.trim()) {
        alert("Lütfen veri giriniz");
        setTask("");
        // disabled özelliğini kullanmazsak bu şekilde de kontrol mekanizması kurabiliriz.
        return;
    }
    const newTodo = {
      //   id: new Date().getTime(),
      id: uuidv4(), // uuidv4() metodu her çağırıldığında farklı, unique karakter dizisi dönüyor.
      text: task,
      completed: false,
    };
    // console.log(newTodo)

    const newTodos = [...todos, newTodo]; // ...todos diyerek todos statei içerisindeki önceki verileri yeni arraye aktarıp, newTodo yu da eklemiş olduk.
    // console.log(newTodos);
    //! todo eklemeyle birlikte hem statei hem de locali güncellemiş oluyoruz.
    setTodos(newTodos); // setter asenkron çalışır.
    localStorage.setItem("todos", JSON.stringify(newTodos));
    //! inputu boşaltma
    setTask(""); // todo ekleme işlemi bittikten sonra inputu boş hale getirmek için stateimize boş string ataması yaptık.
  }

  console.log("İnputa veri giriliyor, state güncelledniği için header yeniden render oluyor.")

  return (
    <div>
      <h1 className="text-center text-danger m-5">Todo App</h1>
      <form onSubmit={addTodo}>
        <InputGroup className="mb-3 w-50 mx-auto">
          <Form.Control
            placeholder="Enter new todo..."
            value={task} //inputun içini yönetebilmek için value attributeını kullanıyoruz. Statei  güncellediğimizde inputun içi de statein değerini almış oluyor.
            onChange={e => setTask(e.target.value)}
            required
            autoFocus
          />
          {/* <Button
            className="bg-success text-white"
            onClick={addTodo}
            disabled={!task.trim()} // task statei boşken kullanıcı ekleme yapamamasın diye button elementinin disabled özelliğini kullanıyoruz. disabled true dersek kullanıcı butona tıklayamaz. default değeri false. task stateinin başlangıç değeri boş string olduğu için boolean olarak falsy değere sahip. ama biz boş string olduğunda disabled özelliğinin çalışmasını istediğimiz için ! operatörünü kullanıyoruz. trim() metodu da hem baştan hem sondan boşluk karakterlerini kaldırdığında elde bir veri kalmıyorsa yine butonu deactive et demiş oluyoruz.
          >
            Add Todo
          </Button> */}
          <Button
            className="bg-success text-white"
            type="submit"
          >
            Add Todo
          </Button>
        </InputGroup>
      </form>
    </div>
  );
};

export default Header;
