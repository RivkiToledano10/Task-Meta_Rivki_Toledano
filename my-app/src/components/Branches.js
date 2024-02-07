import React, { useEffect, useState } from "react";
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useDispatch, useSelector } from 'react-redux';
import { getBranches } from '../api/BranchesService.js';
import { updateBranches } from '../features/BranchesSlice.js';
import useStyles from '../style/styles.js';
import { Typography } from "@mui/material";

export default function Branches() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchTerms, setSearchTerms] = useState({});
    const [sortDirection, setSortDirection] = useState('asc');
    const [sortColumn, setSortColumn] = useState(null);
    const [filteredBranches, setFilteredBranches] = useState([]);
    const classes = useStyles(); // לא נזכיר כאן את ה-theme
    const dispatch = useDispatch();
    const branches = useSelector((state) => state.branches.branches);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getBranches();
                dispatch(updateBranches(data));
            } catch (error) {
                console.error('Error fetching branches:', error.message);
            }
        };

        fetchData();
    }, [dispatch]);

    useEffect(() => {
        if (branches && branches.length > 0) {
            const filteredData = branches.filter(branch =>
                Object.entries(searchTerms).every(([column, term]) =>
                    branch[column] && branch[column].toString().toLowerCase().includes(term.toLowerCase())
                ) &&
                Object.values(branch).some(value =>
                    value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
            setFilteredBranches(filteredData);
        }
    }, [searchTerms, branches, searchTerm]);

    const handleSort = (column) => {
        const direction = column === sortColumn && sortDirection === 'asc' ? 'desc' : 'asc';
        const sortedData = [...filteredBranches].sort((a, b) => {
            if (direction === 'asc') {
                return a[column] < b[column] ? -1 : 1;
            } else {
                return a[column] > b[column] ? -1 : 1;
            }
        });
        setFilteredBranches(sortedData);
        setSortColumn(column);
        setSortDirection(direction);
    };

    const handleSearch = (column, value) => {
        setSearchTerms(prevSearchTerms => ({
            ...prevSearchTerms,
            [column]: value
        }));
    };

    return (
        <Paper className={classes.paper}>
            <br></br>
            <Typography variant="h5" className={classes.title}>Company Branches</Typography>
            <br></br>
            <InputBase
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={classes.input}
            />
            <TableContainer>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow className={classes.tableHeader}>
                            <TableCell className={classes.tableCell} onClick={() => handleSort('store_id')}>Store ID</TableCell>
                            <TableCell className={classes.tableCell} onClick={() => handleSort('store_title')}>Store Title</TableCell>
                            <TableCell className={classes.tableCell} onClick={() => handleSort('store_address')}>Store Address</TableCell>
                            <TableCell className={classes.tableCell} onClick={() => handleSort('store_region')}>Employee Contact</TableCell>
                            <TableCell className={classes.tableCell} onClick={() => handleSort('city')}>City</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell><InputBase placeholder="Search..." onChange={(e) => handleSearch('store_id', e.target.value)} /></TableCell>
                            <TableCell><InputBase placeholder="Search..." onChange={(e) => handleSearch('store_title', e.target.value)} /></TableCell>
                            <TableCell><InputBase placeholder="Search..." onChange={(e) => handleSearch('store_address', e.target.value)} /></TableCell>
                            <TableCell><InputBase placeholder="Search..." onChange={(e) => handleSearch('store_region', e.target.value)} /></TableCell>
                            <TableCell><InputBase placeholder="Search..." onChange={(e) => handleSearch('city', e.target.value)} /></TableCell>
                        </TableRow>
                        {filteredBranches.map(branch => (
                            <TableRow key={branch.store_id}>
                                <TableCell className={classes.tableCell}>{branch.store_id}</TableCell>
                                <TableCell className={classes.tableCell}>{branch.store_title}</TableCell>
                                <TableCell className={classes.tableCell}>{branch.store_address}</TableCell>
                                <TableCell className={classes.tableCell}>{branch.store_region}</TableCell>
                                <TableCell className={classes.tableCell}>{branch.city}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}
