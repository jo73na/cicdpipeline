import React from "react";

import { Sparklines, SparklinesLine, SparklinesSpots } from "react-sparklines";

const sampleData = [27, 31, 35, 28, 45, 52, 24, 4, 50, 11, 54, 49, 72, 59, 75];

function GoalCard({chartdata=[]}) {
  return (
    <Sparklines data={chartdata} height={50}>
      <SparklinesLine color="#2258bf" style={{ fill: "#2258bf" }} />
      <SparklinesSpots />
    </Sparklines>
  );
}

export default GoalCard;
