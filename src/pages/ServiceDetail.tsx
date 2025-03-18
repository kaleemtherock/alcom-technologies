import { useParams } from "react-router-dom";
import { servicesData } from "../data/servicesData";
import { motion } from "framer-motion";
import React from "react";

const ServiceDetail = () => {
  const { serviceId } = useParams();
  const serviceIndex = parseInt(serviceId || "0", 10);
  const service = servicesData[serviceIndex];

  if (!service) {
    return (
      <div className="flex justify-center items-center h-screen text-white text-3xl">
        Service Not Found
      </div>
    );
  }

  return (
    <section className="relative w-full min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-lg text-center"
      >
        <service.icon className="text-6xl text-neon-blue mb-4 mx-auto" />
        <h1 className="text-4xl font-bold mb-4">{service.text}</h1>
        <p className="text-lg text-gray-300">{service.paragraph}</p>
      </motion.div>
    </section>
  );
};

export default ServiceDetail;
