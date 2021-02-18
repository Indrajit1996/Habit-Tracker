import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import { withStyles } from '@material-ui/core/styles';

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 40,
    borderRadius: 5,
    marginTop: 16
  },
  colorPrimary: {
    backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: '#1a90ff',
  },
}))(LinearProgress);

export default function ProgressReport({ total, completed }) {
  
  let progress = parseFloat((completed.length/(total.length + completed.length)) * 100).toFixed(2);
  console.log(progress);
  return (
    <div style={{flexGrow: '1', textAlign: 'center', position: 'absolute', bottom: '10%', width: '83%'}}>
      <h3>Progress Report</h3>
      <BorderLinearProgress variant="determinate" value={progress} />
      <div style={{marginTop: '16px' ,fontSize: '24px', fontWeight: '600'}}>{progress}%</div>
    </div>
  )
}
