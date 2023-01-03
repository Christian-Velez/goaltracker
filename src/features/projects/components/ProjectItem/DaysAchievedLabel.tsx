import { Tag } from '@chakra-ui/react'

export const DaysAchievedLabel = ({
   color,
   daysAchieved,
}: {
   color: string
   daysAchieved: number
}) => {
   return (
      <Tag colorScheme={color}>
         {daysAchieved} {daysAchieved === 1 ? 'day' : 'days'} achieved
      </Tag>
   )
}
