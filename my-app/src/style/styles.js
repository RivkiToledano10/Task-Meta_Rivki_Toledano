import { createTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

const theme = createTheme();

const useStyles = makeStyles({
    input: {
        marginBottom: theme.spacing(2),
        padding: theme.spacing(1),
        borderRadius: theme.shape.borderRadius,
        border: `1px solid ${theme.palette.divider}`,
    },
    table: {
        width: '100%',
    },
    tableHeader: {
        backgroundColor: theme.palette.grey[200],
    },
    tableCell: {
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    paper:{
        textAlign:'center'
    }
});

export default useStyles;