import React from "react";
import { FaPlus } from "react-icons/fa";
import Notes from "../components/Notes";
import AddNote from "../components/AddNote";
import FloatingButton from "../components/FloatingButton";
import PinnedNotes from "../components/PinnedNotes";

const Home = () => {
  return (
    <div className="min-h-screen transition-colors pt-6">
      {/*------------- Add Note Input --------------------*/}
      <AddNote/>

      {/* -----------Pinned Notes-------------- */}
      <PinnedNotes/>

      {/* -----------Added Notes-------------- */}
      <Notes/>

      {/*-------------- Floating Add Button -------------------- */}
      <FloatingButton/>
    </div>
  );
};

export default Home;
