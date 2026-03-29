import React from 'react'
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../utils/firebase';
import axios from 'axios'
import { serverUrl } from '../App';

const features = [
  {
    icon: "🎁",
    title: "50 Free Credits",
    des: "Start with 50 credits to generate notes without paying.",
    bg: "bg-yellow-500",
  },
  {
    icon: "📘",
    title: "Exam Notes",
    des: "High-yield, revision-ready exam-oriented notes.",
    bg: "bg-blue-500",
  },
  {
    icon: "📁",
    title: "Project Notes",
    des: "Well-structured documentation for assignments & projects.",
    bg: "bg-yellow-400",
  },
  {
    icon: "📊",
    title: "Charts & Graphs",
    des: "Auto-generated diagrams, charts and flow graphs.",
    bg: "bg-pink-500",
  },
  {
    icon: "⬇️",
    title: "Free PDF Download",
    des: "Download clean, printable PDFs instantly.",
    bg: "bg-blue-400",
  },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

function FeatureCard({ icon, title, des, bg }) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 250, damping: 20 }}
      className="bg-[#2a2a2a] rounded-2xl p-4 cursor-pointer h-full"
    >
      <div className={`w-10 h-10 ${bg} rounded-xl flex items-center justify-center text-xl mb-3`}>
        {icon}
      </div>
      <h3 className="text-white font-semibold text-sm mb-1">{title}</h3>
      <p className="text-gray-400 text-xs leading-relaxed">{des}</p>
    </motion.div>
  );
}

// Google Verification
const Auth = () => {
  const handleGooleAuth = async()=>{
    try {
      const responce = await signInWithPopup(auth, provider)
      const user= responce.user
      const name = user.displayName
      const email = user.email

      const result = await axios.post(serverUrl + "/api/auth/google", {name, email},{
        withCredentials:true
      })
      console.log(responce.data);
      
    } catch (error) {
      console.error('Google sign-in failed:', error);
    }
  }
  return (
    <div className="min-h-screen bg-white font-sans">

      {/* Header */}
      <motion.header
        className="bg-[#2d2d2d] rounded-2xl mx-3 mt-3 px-5 py-3"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-white font-bold text-sm tracking-tight">ExamNotes AI</h1>
        <p className="text-gray-400 text-xs mt-0.5">AI-powered exam-oriented notes & revision</p>
      </motion.header>

      {/* Main Layout */}
      <main className="flex flex-col md:flex-row items-start gap-8 px-4 md:px-10 pt-10 pb-10 max-w-6xl mx-auto">

        {/* LEFT */}
        <motion.div
          className="w-full md:w-[320px] shrink-0"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h1 className="text-5xl md:text-6xl font-black text-gray-900 leading-[1.05] tracking-tight mb-6">
            Unlock Smart<br />AI Notes
          </h1>

          <motion.button 
            className="flex items-center gap-2 bg-[#2d2d2d] text-white text-sm font-semibold px-5 py-2.5 rounded-full shadow-md mb-5 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 250, damping: 18 }} onClick={handleGooleAuth}
          >
            <FcGoogle className="text-lg bg-white rounded-full p-0.5" />
            Continue with Google
          </motion.button>

          <motion.p
            className="text-sm text-gray-700 leading-relaxed mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            You get <span className="font-bold text-black">50 FREE credits</span> to create exam notes, project notes, charts,
            graphs and download clean PDFs — instantly using AI.
          </motion.p>

          <motion.p
            className="text-xs text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            Start with 50 free credits • Upgrade anytime for more credits • Instant access
          </motion.p>
        </motion.div>

        {/* RIGHT — Feature Cards Grid */}
        <motion.div
          className="w-full grid grid-cols-2 gap-3"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {features.map((f, i) => (
            <div key={i} className={i === 4 ? "col-span-1" : "col-span-1"}>
              <FeatureCard {...f} />
            </div>
          ))}
        </motion.div>

      </main>
    </div>
  );
};

export default Auth;