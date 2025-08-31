import React from "react";
import { FaPlus } from "react-icons/fa";
import Notes from "../components/Notes";
import AddNote from "../components/AddNote";
import FloatingButton from "../components/FloatingButton";

const Home = () => {
  return (
    <div className="min-h-screen transition-colors pt-6">
      {/*------------- Add Note Input --------------------*/}
      <AddNote/>

      {/* -----------Added Notes-------------- */}
      <Notes/>


      {/*-------------- Floating Add Button -------------------- */}
      <FloatingButton/>
    </div>
  );
};

export default Home;
