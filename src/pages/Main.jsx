import React, { useState } from 'react'
import Container from "react-bootstrap/Container"
import Header from '../components/Header'
import TodoList from '../components/TodoList'

const Main = () => {
    const [todos, setTodos] = useState(JSON.parse(localStorage.getItem("todos")) || []); // Lifting State Up
    console.log("Todos state i güncellendi. Main yeniden render oldu.")
//   setTodos(JSON.parse(localStorage.getItem("todos"))) bu şekilde çağırırsak çok falz rendera yol açarak sonsuz döngüye girebilir.
    return (
    <Container>
      <Header todos={todos} setTodos={setTodos} />
      <TodoList todos={todos} setTodos={setTodos} />
    </Container>
  );
}

export default Main

//! Lifting State Up
// Eğer birden fazla alt bileşen, aynı veriye ihtiyaç duyuyorsa ve bu veriyi her alt bileşenin kendi durumunda saklamak yerine, bu veriyi ortak bir üst düzey bileşenin durumunda tutmak daha uygun olabilir. Bu durumda, veri "kaldırılır" ve üst düzey bileşende saklanır.

// Üst düzey bileşen, alt bileşenlere ihtiyaç duydukları verileri "props" adı verilen özellikler aracılığıyla aktarır. Bu şekilde, alt bileşenler aynı veriyi paylaşabilir ve güncellemeleri de üst düzey bileşende yapabilirler.

// Ters veri akışı : Reactta props yöntemi ile veri akışı tek yönlüdür. Yani yukarıdan aşağıya doğru bir veri akışı vardır. Lifting State Up mantığı ile Alt bileşenler, veriyi değiştirmek istediklerinde, bu isteği üst düzey bileşene iletirler. Üst düzey bileşen, durumu günceller ve güncellenmiş durumu alt bileşenlere yeniden aktarır. 

//? Örneğimizde todo ekleme işlemini header componentinde yapıyoruz ama listeleme işlemini todolist componentinde yapıyoruz. todos stateini header da oluşturursam verileri todoliste aktaramam o nedenle todos stateini header ve todolist componentlerinin ortak parentına kaldırarak todos stateini ve setter metodunu buradan header componentine göndererek ekleme işlemini gerçekleştirmiş oluyoruz ve yine todos stateini de todolist componentine göndererek todolarımı sergilemiş oluyorum. header componentinde ekleme işlemi yaptığımda todos statei güncelleneceği için main componenti yeniden render olacak ve todolist componenti güncel veriyi ekrana sergilemiş olacak.