import React from 'react'

const Circle = ({color, percentage, size, strokeWidth}) => {
  const radius = size / 2 - 10;
  const circ = 2 * Math.PI * radius - 20;
  const strokePct = ((100 - Math.round(percentage)) * circ) / 100;

  return (
    <circle 
      r={radius}
      cx="50%"
      cy="50%"
      fill="transparent"
      stroke={strokePct !== circ ? color : ""}
      strokeWidth={strokeWidth}
      strokeDasharray={circ}
      strokeDashoffset={percentage ? strokePct : 0}
      strokeLinecap='round'
    ></circle>
  );
}

function ProgressCircle(props) {
  return (
    <div className='progress-circle flex'>
      <svg width={props.size} height={props.size}>
        <g>
          <Circle strokeWidth={"0.4rem"} color="#3B4F73" size={props.size} />
          <Circle strokeWidth={"0.6rem"} color={props.color} percentage={props.percentage} size={props.size}/>
        </g>
        <defs>
          <clipPath id="myCircle">
            <circle cx="50%" cy="50%" r={(props.size/2) - 30} fill='#FFFFFF' />
          </clipPath>
          <clipPath id="myInnerCircle">
            <circle cx="50%" cy="50%" r={(props.size/2) - 80} fill='#FFFFFF' />
          </clipPath>
        </defs>
        <image className={props.isPlaying ? "active" : ""} x={30} y={30} width={2*((props.size/2) - 30)} height={2*((props.size/2) - 30)} href="https://pngimg.com/d/vinyl_PNG63.png" clipPath="url(#myCircle)"/>
        <image className={props.isPlaying ? "active" : ""} x={80} y={80} width={2*((props.size/2) - 80)} height={2*((props.size/2) - 80)} href={props.image} clipPath="url(#myInnerCircle)"/>

      </svg>
    </div>
  )
}

export default ProgressCircle;