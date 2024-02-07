import axios from 'axios';

const url=`http://localhost:5000/api/branches`;

export const getBranches = async()=> {
   return await axios.get(url).then(res => res.data);
}