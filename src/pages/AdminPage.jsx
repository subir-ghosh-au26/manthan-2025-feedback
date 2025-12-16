import React, { useEffect, useState } from 'react';
import { 
  Container, Grid, Paper, Typography, Button, Table, 
  TableBody, TableCell, TableHead, TableRow, Box, Chip 
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import { collection, getDocs, orderBy, query } from "firebase/firestore"; 
import { db } from '../firebase/config';
import Navbar from '../components/Navbar';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
import * as XLSX from 'xlsx';
import { questions } from '../data/questions'; // <--- IMPORT THIS

ChartJS.register(...registerables);

const AdminPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(collection(db, "feedback"), orderBy("submittedAt", "desc"));
        const snapshot = await getDocs(q);
        const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setData(docs);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

    // --- UPDATED EXPORT FUNCTION ---
  const exportExcel = () => {
    // 1. Format the data for Excel
    const formattedData = data.map(item => {
      // Convert Firebase Timestamp to Readable Date
      const dateStr = item.submittedAt?.seconds 
        ? new Date(item.submittedAt.seconds * 1000).toLocaleString() 
        : 'N/A';

      // Create a copy of the item so we can modify it
      const cleanItem = { ...item };

      // --- THE FIX ---
      // Loop through all answers. If an answer is an Array (like Q5 checkboxes),
      // join it into a single string separated by commas.
      Object.keys(cleanItem).forEach(key => {
        if (Array.isArray(cleanItem[key])) {
          cleanItem[key] = cleanItem[key].join(", ");
        }
      });
      // ----------------

      // Create the final row object
      const row = {
        SubmissionTime: dateStr,
        ...cleanItem
      };
      
      return row;
    });

    // 2. Define the exact column sequence based on questions.js
    const questionIDs = questions.map(q => q.id); 
    
    // Final Header List: Date first, then Q1, Q2...
    const headerOrder = ['SubmissionTime', ...questionIDs];

    // 3. Create Sheet with forced header order
    const ws = XLSX.utils.json_to_sheet(formattedData, { 
      header: headerOrder,
      skipHeader: false
    });

    // 4. Save File
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Feedback_Data");
    XLSX.writeFile(wb, "Manthan_Feedback.xlsx");
  };

  // Helper: Calculate Average for Likert Scale
  const getAvg = (key) => {
    const valid = data.filter(d => d[key]);
    if (valid.length === 0) return 0;
    const sum = valid.reduce((acc, curr) => acc + Number(curr[key]), 0);
    return (sum / valid.length).toFixed(1);
  };

  const barChartData = {
    labels: ['Q7 (Rules)', 'Q8 (Public Interest)', 'Q11 (Discretion)', 'Q19 (Respect)'],
    datasets: [{
      label: 'Average Score (1-5)',
      data: [getAvg('q7'), getAvg('q8'), getAvg('q11'), getAvg('q19')],
      backgroundColor: '#1e3a8a',
    }]
  };

  // Count Roles for Pie Chart
  const roleCounts = {};
  data.forEach(item => {
    const role = item.q3 || 'Unknown';
    roleCounts[role] = (roleCounts[role] || 0) + 1;
  });

  return (
    <>
      <Navbar />
      <Container maxWidth="xl" sx={{ mt: 5, mb: 5 }}>
        
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4, alignItems: 'center' }}>
          <Box>
            <Typography variant="h4" fontWeight="bold" color="#1e3a8a">Admin Dashboard</Typography>
            <Typography color="text.secondary">Real-time analysis of incoming feedback</Typography>
          </Box>
          <Button 
            variant="contained" 
            color="success" 
            size="large"
            startIcon={<DownloadIcon />} 
            onClick={exportExcel}
            sx={{ px: 4, bgcolor: '#166534' }}
          >
            Export Excel
          </Button>
        </Box>

        {/* Charts Section */}
        <Grid container spacing={4} sx={{ mb: 6 }}>
          <Grid item xs={12} md={8}>
            <Paper elevation={3} sx={{ p: 3, height: 400, borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom fontWeight="bold">Perception Analysis (Likert Averages)</Typography>
              <Box sx={{ height: 320 }}>
                <Bar data={barChartData} options={{ maintainAspectRatio: false }} />
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3, height: 400, borderRadius: 2, display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h6" gutterBottom fontWeight="bold">Respondent Roles</Typography>
              <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Pie 
                  data={{
                    labels: Object.keys(roleCounts),
                    datasets: [{
                      data: Object.values(roleCounts),
                      backgroundColor: ['#1e3a8a', '#ea580c', '#14b8a6', '#f59e0b', '#64748b'],
                    }]
                  }} 
                />
              </Box>
            </Paper>
          </Grid>
        </Grid>

        {/* Data Table */}
        <Paper elevation={3} sx={{ overflow: 'hidden', borderRadius: 2 }}>
          <Box sx={{ p: 2, bgcolor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
            <Typography variant="h6" fontWeight="bold">Recent Submissions ({data.length})</Typography>
          </Box>
          <Box sx={{ overflowX: 'auto' }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold', bgcolor: '#f1f5f9' }}>Time</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', bgcolor: '#f1f5f9' }}>Posting</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', bgcolor: '#f1f5f9' }}>Role</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', bgcolor: '#f1f5f9' }}>Q7 (Rules)</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', bgcolor: '#f1f5f9' }}>Q44 (Qualitative)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.slice(0, 20).map((row) => (
                  <TableRow key={row.id} hover>
                    <TableCell sx={{ whiteSpace: 'nowrap', color: 'text.secondary' }}>
                      {row.submittedAt?.seconds ? new Date(row.submittedAt.seconds * 1000).toLocaleDateString() : 'N/A'}
                    </TableCell>
                    <TableCell>{row.q1}</TableCell>
                    <TableCell>
                      <Chip label={row.q3} size="small" color="primary" variant="outlined" />
                    </TableCell>
                    <TableCell>{row.q7}</TableCell>
                    <TableCell sx={{ maxWidth: 300, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {row.q44}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </Paper>

      </Container>
    </>
  );
};

export default AdminPage;