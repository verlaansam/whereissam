import VesselTracker from "./VesselTracker";
import Weather from "./Weather";
import Windguru from "./WindGuru";


const Ais = () => {
  
    return (
      <div className="w-screen flex flex-col items-center justify-center border-b border-gray-700 p-5 pt-10 sm:flex-row">
        <VesselTracker/>
        <Weather/>
      </div>
    );
  };
  
  export default Ais;
  