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
import { Typography, MenuItem, Select } from "@mui/material";
import useStyles from '../style/styles.js';

export default function Branches() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchTerms, setSearchTerms] = useState({});
    const [sortDirection, setSortDirection] = useState('asc');
    const [sortColumn, setSortColumn] = useState(null);
    const [filteredBranches, setFilteredBranches] = useState([]);
    const [selectedRegion, setSelectedRegion] = useState('');
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState('');
    const classes = useStyles();
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

    useEffect(() => {
        // Filter cities based on selected region
        if (selectedRegion) {
            const filteredCities = branches
                .filter(branch => branch.store_region === selectedRegion)
                .map(branch => branch.city);
            setCities([...new Set(filteredCities)]); 
            setCities([]);
        }
    }, [branches, selectedRegion]);

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

    const handleRegionChange = (event) => {
        const region = event.target.value;
        setSelectedRegion(region);
        setSelectedCity('');
        
        const filteredCities = branches
            .filter(branch => branch.store_region === region)
            .map(branch => branch.city);
        setCities([...new Set(filteredCities)]); 
    };

    const handleCityChange = (event) => {
        setSelectedCity(event.target.value);
    };

    return (
        <Paper className={classes.paper}>
            <Typography variant="h5" className={classes.title}>Company Branches</Typography>
            <InputBase
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Select
                value={selectedRegion}
                onChange={handleRegionChange}
                displayEmpty
                id="region_select"
                className={classes.select}
            >
                <MenuItem key="" value="" disabled>Select Region</MenuItem>
                {[...new Set(branches.map(branch => branch.store_region))].map((region, index) => (
                    <MenuItem key={index} value={region}>{region}</MenuItem>
                ))}
            </Select>
            <Select
                value={selectedCity}
                onChange={handleCityChange}
                displayEmpty
                className={classes.select}
                id="city-dropdown"
            >
                <MenuItem key="" value="" disabled>Select City</MenuItem>
                {cities.map((city, index) => (
                    <MenuItem key={index} value={city}>{city}</MenuItem>
                ))}
            </Select>
            <TableContainer>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow className={classes.tableHeader}>
                            <TableCell className={classes.tableCell} onClick={() => handleSort('store_id')}>Store ID</TableCell>
                            <TableCell className={classes.tableCell} onClick={() => handleSort('store_title')}>Store Title</TableCell>
                            <TableCell className={classes.tableCell} onClick={() => handleSort('store_address')}>Store Address</TableCell>
                            <TableCell className={classes.tableCell} onClick={() => handleSort('store_region')}>Store Region</TableCell>
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
                        {filteredBranches
                            .filter(branch => selectedCity ? branch.city === selectedCity : true)
                            .map(branch => (
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
