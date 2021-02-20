import React from 'react';
import { BorderLinearProgress } from '../core/LinearProgress';
import '../css/progress-report.css';

export default function ProgressReport({ total, completed }) {
  
  let progress = parseFloat((completed.length/(total.length + completed.length)) * 100).toFixed(2);
  return (
    <div className="progress-report">
      <h3>Progress Report</h3>
      <BorderLinearProgress variant="determinate" value={progress} />
      <div className="progress-value">{progress}%</div>
    </div>
  )
}
