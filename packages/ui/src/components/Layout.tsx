import { Box } from '@mui/material'
import React from 'react'

export function Layout({ children }: {children: React.ReactNode}) {
  return (
    <Box>
      <div>
          {children}
      </div>
    </Box>
  )
}