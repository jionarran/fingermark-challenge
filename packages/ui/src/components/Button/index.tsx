import { Button } from '@mui/material';
import 'react';

export function CButton(props: Record<string,any>) {

 var styles = {
    backgroundColor: '#0385FD',
    fontWeight: '500',
    color: '#FFFFFF',
    ...props.style
 }

  return (
    <Button  {...props} style={styles}>{props.children}</Button>
  )
}
