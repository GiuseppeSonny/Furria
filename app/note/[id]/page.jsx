"use client";
import NoteModal from "@/app/components/noteModal/NoteModal";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ButtonAddNote from "@/app/components/buttonAddNote/buttonAddNote";
import NoteWrapper from "@/app/components/noteWrapper/NoteWrapper";

const Notes = () => {
  const { id } = useParams();
  const [note, setNote] = useState([]);
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const [showModal, setShowModal] = useState(false);
  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    fetch(`/api/note?cityId=${id}`)
      .then((res) => res.json())
      .then((data) => setNote(data.data));
  }, []);
  return (
    <div>
      <NoteWrapper cityName={name} list={note} />
      <ButtonAddNote onClick={handleOpenModal} />
      {showModal && <NoteModal cityId={id} onClose={handleCloseModal} />}
    </div>
  );
};

export default Notes;
