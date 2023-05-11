import { Box } from '@mui/material';
import { Header } from 'ui/src/components/Header';

export function Page({ children }: any) {
  return (
    <Box sx={{ flexGrow: 1, backgroundColor: "#f5f5f5", height: '100vh' }}>
      <Header></Header>
      {children}
    </Box>
  )
}