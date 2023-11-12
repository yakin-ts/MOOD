'use client'
import { ResponsiveContainer, LineChart, Line, XAxis, Tooltip } from 'recharts';
import React from 'react'
import  {Analysis} from '@prisma/client'

interface CustomTooltipProps {
  payload: any[]
  label: any
  active: boolean
}

const CustomTooltip = ({ payload, label, active } : CustomTooltipProps) => {
  const dateLabel = new Date(label).toLocaleString('en-us', {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  })
  console.log('Tool Tip date', dateLabel, payload)
  if (active && payload && payload.length > 0) {
    const analysis = payload[0]?.payload
    return (
      <div className="p-8 custom-tooltip bg-white/5 shadow-md border border-black/10 rounded-lg backdrop-blur-md relative">
        <div
          className="absolute left-2 top-2 w-2 h-2 rounded-full"
          style={{ background: analysis?.color }}
        ></div>
        <p className="label text-sm text-black/30">{dateLabel}</p>
        <p className="intro text-xl uppercase">{analysis?.sentiment}</p>
      </div>
    )
  }

  return null
}

interface HistoryProps {
  data: Analysis[]

}


const HistoryChart = ({ data }: HistoryProps) => {
  return (
    <ResponsiveContainer width="80%" height="80%">
      <LineChart width={300} height={100} data={data}>
        <Line
          type="monotone"
          dataKey="sentimentScore"
          stroke="#8884d8"
          strokeWidth={2}
          activeDot={{ r: 8 }}
          unit={'%'}
        />
        <XAxis dataKey="updatedAt" />
        <Tooltip content={<CustomTooltip payload={data} active={true} label={data[0]?.sentimentScore} />} />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default HistoryChart