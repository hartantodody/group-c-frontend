
import React from 'react';
import ProgressBar from "@ramonak/react-progress-bar";

interface ProgressBarProps {
  now: number;
}

const ProgressBarComponent: React.FC<ProgressBarProps> = ({ now }) => {
  return <ProgressBar completed={now} height='12px' bgColor='#53CDE2' animateOnRender/>
};

export default ProgressBarComponent;
