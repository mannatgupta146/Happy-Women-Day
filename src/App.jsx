import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import './App.css';
import womenDayImage from './assets/image.png';

const FrontDesign = () => {
  return (
    <motion.div 
      className="front"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="card-image-container">
        <img 
          src={womenDayImage} 
          alt="Women's Day Celebration" 
          className="main-image"
        />
        <div className="image-overlay"></div>
      </div>

      <div className="main-content">
        <motion.div
          className="title-container"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="main-title">Happy</h1>
          <div className="text-container">
            <span className="women-text">Women's</span>
            <span className="day-text">Day</span>
          </div>
        </motion.div>

        <div className="floral-elements">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="floral-petal"></div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};


const CardContent = ({ isFlipped }) => {
  return (
    <div className="card-content">
      <AnimatePresence>
        {!isFlipped ? (
          <FrontDesign />
        ) : (
          <motion.div
            key="back"
            initial={{ opacity: 0, rotateY: 180 }}
            animate={{ opacity: 1, rotateY: 0 }}
            exit={{ opacity: 0 }}
            className="back"
          >
            <div className="message">
              <h2>To the Incredible Women of the World</h2>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                You are the architects of love, the engineers of compassion, and the artists of life.
              </motion.p>
              <motion.div 
                className="quote"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
              >
                “Here's to strong women: May we know them, may we be them, may we raise them.”
              </motion.div>
              <motion.button
                className="confetti-btn"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 },
                    colors: ['#ff69b4', '#ff1493', '#ff85c2']
                  })
                }}
              >
                🎉 Celebrate!
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

function App() {
  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = useRef(null);

  return (
    <div className="container">
      <motion.div
        ref={cardRef}
        className={`card ${isFlipped ? 'flipped' : ''}`}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        onClick={() => setIsFlipped(!isFlipped)}
        whileHover={{ scale: 1.05 }}
      >
        <CardContent isFlipped={isFlipped} />
      </motion.div>
    </div>
  );
}

export default App;