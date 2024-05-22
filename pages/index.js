// pages/index.js
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "@/services/firebase.config";
import PointsTable from "@/components/PointsTable";
import ConfirmationModal from "@/components/ConfirmationModal";

// Dinamik import
const MapWrapper = dynamic(() => import("../components/MapWrapper"), {
  ssr: false,
});

export default function Home() {
  // const dummyData = [
  //   {
  //     id: 0,
  //     lat: "37.05612",
  //     lng: "29.10999",
  //     datetime: "2021-08-14T06:35:13Z",
  //   },
  //   {
  //     id: 1,
  //     lat: "33.61441",
  //     lng: "32.29111",
  //     datetime: "2021-08-14T07:22:15Z",
  //   },
  // ];
  const [center, setCenter] = useState(); // İstanbul koordinatları
  const [points, setPoints] = useState([]);
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [activeFunction, setActiveFunction] = useState(null);
  const [text, setText] = useState({
    top: "Hoş geldiniz.",
    bottom: "Güncel konumuza gitmek için haritaya tıklayınız.",
    action: "BAŞLAT",
  });

  useEffect(() => {
    setIsOpen(true);
  }, []);

  useEffect(() => {
    const fetchPoints = async () => {
      const querySnapshot = await getDocs(collection(db, "points"));
      const pointsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPoints(pointsList);
    };
    fetchPoints();
  }, [points]);

  const handleSavePoint = async () => {
    if (!center) return;
    const newPoint = {
      lat: center.lat,
      lng: center.lng,
      datetime: new Date().toISOString(),
    };
    const docRef = await addDoc(collection(db, "points"), newPoint);
    setPoints([...points, { id: docRef.id, ...newPoint }]);
  };

  const handleDeletePoint = async () => {
    await deleteDoc(doc(db, "points", selectedPoint.id));
    setPoints(points.filter((point) => point.id !== selectedPoint.id));
  };

  const handleDownloadJson = () => {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(points)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "points.json";
    link.click();
  };

  const handleSaveConfirmation = () => {
    setIsOpen(true);
    setActiveFunction(() => handleSavePoint);
    setText({
      top: `Kaydedeceğiniz noktalar ${center.lat.toFixed(
        5
      )} , ${center.lng.toFixed(5)} bunlardır.`,
      bottom: "Onaylıyor musunuz?",
      action: "KAYDET",
    });
  };

  const handleDownloadConfirmation = () => {
    setIsOpen(true);
    setActiveFunction(() => handleDownloadJson);
    setText({
      top: `Noktalarınızı JSON dosyasına kaydedeceksiniz.İndirme işlemini `,
      bottom: "Onaylıyor musunuz?",
      action: "İNDİR",
    });
  };

  const handleDeleteConfirmation = (id) => {
    setIsOpen(true);
    setActiveFunction(() => handleDeletePoint);
    setText({
      top: `Silmek istediğiniz noktalar ${selectedPoint.lat.toFixed(
        5
      )} , ${selectedPoint.lng.toFixed(5)} bunlardır.`,
      bottom: "Onaylıyor musunuz?",
      action: "SIL",
    });
  };

  return (
    <div className="w-full h-screen flex flex-row justify-center items-center gap-10 border px-2">
      <ConfirmationModal
        text={text}
        isOpen={isOpen}
        handleClose={() => setIsOpen(false)}
        handleSubmit={activeFunction}
      />
      <div className="w-1/2 flex flex-col justify-start items-center gap-5">
        <MapWrapper onCenterChange={setCenter} selectedPoint={selectedPoint} />
        <button
          className="w-auto h-10 flex justify-center items-center border border-white px-4 py-6 rounded-xl"
          onClick={handleSaveConfirmation}
          disabled={!center}
        >
          Noktayı Kaydet
        </button>
      </div>
      <div className="w-1/2 h-full flex flex-col justify-between items-center gap-5 py-16">
        <div className="flex flex-col justify-start items-center">
          <h1 className="border p-2">Nokta Listesi</h1>
          <PointsTable
            points={points}
            onSelectPoint={setSelectedPoint}
            onDeletePoint={handleDeleteConfirmation}
          />
        </div>
        <div className="flex flex-end items-end">
          <button
            className="w-auto h-10 flex justify-center items-center border border-white px-8 py-6 rounded-xl"
            onClick={handleDownloadConfirmation}
          >
            İNDİR
          </button>
        </div>
        {/* <button className="border p-2" onClick={handleDownloadJson}>
          İndir
        </button> */}
      </div>
    </div>
  );
}
