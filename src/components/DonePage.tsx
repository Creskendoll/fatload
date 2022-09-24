import React from 'react';
import '../styles/donePage.css';
import { motion } from 'framer-motion';

const EndPage = () => {
    const DELAY = 0.65
    const DURATION = 0.65;
    
    return (
        <div id="donepage">
            <motion.img
                animate={{ opacity: [0, 1] }}
                transition={{ delay: DELAY, duration: 0.25 }}
                id="correctLogo"
                src="/end_correct.png"
                alt="correctLogo"
            />
            <span id="correctLogo_bg"></span>
            <motion.img
                animate={{ opacity: [0, 1], x: [-100, -55] }}
                transition={{ delay: DELAY, duration: DURATION }}
                id="bikeLogo"
                src="/bike.png"
                alt="bikeLogo" />
            <motion.div
                id="confirmation_message"
                animate={{ y: [-100, 15, 0] }}
                transition={{ duration: DURATION }}
            >
                Your Package Delivered!
            </motion.div>
        </div>
    )
}

export default EndPage;

