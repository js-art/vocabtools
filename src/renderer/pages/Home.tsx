import React from 'react';
import TableLightener from '../components/elements/TableLightner';
import Sidebar from '../components/layouts/Sidebar';
import Footer from '../components/layouts/Footer';

// import {AcmeLogo} from "./AcmeLogo.jsx";

export default function Home() {
  return (
    <div className="mx-auto flex h-full flex-col justify-around  gap-3 px-8 pt-5">
      {/* <Sidebar /> */}
      <TableLightener />
      <Footer />
    </div>
  );
}
