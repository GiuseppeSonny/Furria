"use client";
import { useParams, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import Travel from "@/app/components/travel/travel";
import ModaleTodo from "@/app/components/modaleTodo/modaleTodo";

const Trip = () => {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const date = searchParams.get("date");
  const [todos, setTodos] = useState([]);
  const [cityDate, setCityDate] = useState(date ? new Date(date) : new Date());
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch(`/api/todo?cityId=${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch todos");
        }
        const data = await response.json();

        const sortedTodos = data.data.sort((a, b) => {
          const dateTimeA = new Date(`${a.date}T${a.time}`);
          const dateTimeB = new Date(`${b.date}T${b.time}`);
          return dateTimeA - dateTimeB;
        });

        setTodos(sortedTodos);

        if (sortedTodos.length > 0) {
          setCityDate(new Date(sortedTodos[0].date));
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (id) {
      fetchTodos();
    }
  }, [id]);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <Travel
        cityName={name}
        cityDate={cityDate}
        todos={todos}
        onAddTodo={handleOpenModal}
      />
      {showModal && <ModaleTodo cityId={id} onClose={handleCloseModal} />}
    </div>
  );
};

export default Trip;
