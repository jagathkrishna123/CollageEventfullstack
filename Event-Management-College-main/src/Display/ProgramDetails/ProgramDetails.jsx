import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { EVENTDATAS, Items, } from "../../Constants/ProgramData";

const ProgramDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showDetail, setShowDetail] = useState(null);

  useEffect(() => {
    const selectedItem = Items.find((item) => item.id === Number(id));
    setShowDetail(selectedItem);
  }, [id]);

  return showDetail ? (
    <div className="min-h-screen  bg-[#03050F] text-white p-8">
      <div className="max-w-7xl mx-auto w-full items-center justify-center flex flex-col gap-5">
        <div className="max-w-xs w-full border border-[#2F53E0] rounded-4xl p-2 text-center">
          <p className="font-semibold text-[16px]">
            {showDetail.programDate} : {showDetail.programTime}
          </p>
        </div>
        <p className="text-[60px] font-bold bg-gradient-to-r from-[#2F53E0] to-[#FCFCFC] bg-clip-text text-transparent">
          {showDetail.Name}
        </p>
        <p className="text-[16px] text-center font-medium font-out max-w-lg">
          {showDetail.Title}
        </p>

        <div className="flex flex-row gap-4">
          <button className="bg-[#365EFF] text-[#FCFCFC] text-[11px] md:text-[14px] items-center px-3 py-2 rounded-xl font-semibold">
            Register Yor Team
          </button>
          <button className="border border-[#FCFCFC] text-[#365EFF] text-[11px] md:text-[14px] px-3 py-2 rounded-xl font-semibold">
            Download Brochure
          </button>
        </div>

        {/* features */}
        <div className="w-full flex justify-center mt-8">
          <div className="flex flex-row flex-wrap justify-center gap-6">
            {showDetail.features.map((feature, index) => (
              <div
                key={index}
                className="group flex flex-col items-center text-center 
                   p-4 rounded-2xl bg-white/5 backdrop-blur-md 
                   border border-white/10 shadow-md 
                   hover:shadow-[0_0_15px_rgba(63,131,248,0.4)] 
                   transition-all duration-300 cursor-pointer"
              >
                {/* Icon Box */}
                <div
                  className="flex items-center justify-center
                     w-14 h-14 rounded-xl 
                     bg-gradient-to-br from-[#1a2cff33] to-[#1a2cff11]
                     border border-[#2F53E0]/40
                     group-hover:scale-110 group-hover:border-[#2F53E0]
                     transition-all duration-300"
                >
                  <feature.icon className="text-white text-2xl drop-shadow" />
                </div>

                {/* Feature Name */}
                <p className="text-white text-sm font-medium mt-3 leading-tight">
                  {feature.name}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* descriptionand image.::::::::::::::::: */}
        {/* Description + Image Section */}
        <div className="flex flex-col md:flex-row w-full mt-10 max-w-6xl items-start gap-10">
          {/* LEFT: DESCRIPTION */}
          <div className="flex-1 pr-6">
            <p className="bg-gradient-to-r from-[#2F53E0] to-[#FCFCFC] bg-clip-text text-transparent text-[40px] font-bold">
              About the {showDetail.Name}
            </p>
            <p className="text-white text-md leading-relaxed">
              {showDetail.Description}
            </p>
          </div>

          {/* RIGHT: IMAGE */}
          <div className="flex-[0.8] flex justify-end">
            <img
              src={showDetail.image}
              alt={showDetail.Name}
              className="w-[400px] h-auto rounded-xl object-cover"
            />
          </div>
        </div>

      </div>
     {/* events related */}
     {/* Filter related events */}
{EVENTDATAS.filter(e => e.programName === showDetail.Name).length > 0 && (
  <div className="w-full mt-16">
    <h2 className="text-[35px] font-bold mb-6">
      Events under {showDetail.Name}
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {EVENTDATAS.filter(e => e.programName === showDetail.Name).map(event => (
        <div
          key={event.id}
          className="bg-white/5 p-5 border border-[#00A9E8] rounded-2xl backdrop-blur-lg hover:shadow-lg transition"
        >
          <img
            src={event.image}
            alt={event.name}
            className="w-full h-40 object-cover rounded-xl mb-4"
          />

          <h3 className="text-xl font-semibold">{event.eventName}</h3>
          <p className="text-gray-300 text-[14px]">{event.department}</p>
          <p className="text-gray-300 text-[12px]">{event.description}</p>
          

          {/* <p className="text-gray-400 mt-2">
            <strong>Venue:</strong> {event.venue}
          </p>
          <p className="text-gray-400">
            <strong>Prize:</strong> {event.prize}
          </p>
          <p className="text-gray-400">
            <strong>Registered:</strong> {event.registered}
          </p> */}
        </div>
      ))}
    </div>
  </div>
)}

    </div>
  ) : (
    <div className="min-h-screen flex justify-center items-center">
      <p className="text-gray-500 animate-pulse">Loading...</p>
    </div>
  );
};

export default ProgramDetails;
